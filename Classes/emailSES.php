<?php

namespace RetailingEssentials;
include_once "../Classes/vDB.php";
require_once "../Classes/aws/aws-autoloader.php";
include_once '../Classes/config.php';
include_once '../Classes/vUtil.php';

use RetailingEssentials\vDB;
use \PDO;
use Aws\Ses\SesClient;

class emailSES
{
    private $domain=null;
	private $client=null;
	private $dbConn=null;
	private static $instance;

	private function __construct($domain)
	{
		$this->domain = $domain;
		$config = config::getInstance();

		$this->dbConn = new vDB("re_user_".$domain);
		$this->client = SesClient::factory(array(
		    'version'=> 'latest',
		    'region' => 'eu-west-1',
			'credentials' => array(
		        'key'    => $config->get('sesAwsKey'),
		        'secret' => $config->get('sesAwsSecret'),
	    	)
		));
	}

	public static function getInstance($domain)
	{
		if(!isset(self::$instance))
		{
			self::$instance = new emailSES($domain);
		}
		return self::$instance;
	}

	private function getRequest($message){
		$filename = str_replace(' ','-',$message['subject']);

		$request = array();
		$request['Source'] = $this->domain."@vyavsaay.com";
		$request['Destinations'] = $message['receiverEmails'];

        $messageBoundary = "___Part___";
        $partBoundary = "___PartBody___";

        $rawMessage = 'From:'.$message['sender_name'].'<'.$request['Source'].">\n".
			'Reply-To:'.$message['sender_name'].'<'.$message['sender'].">\n".
			'Subject:'.$message['subject']."\n".
			'MIME-Version: 1.0'."\n".
			'Content-Type: multipart/mixed;'.
			"boundary=$messageBoundary\n".
			"\n--$messageBoundary\n".
			'Content-Type: multipart/alternative;'.
			"boundary=$partBoundary\n".
			"\n--$partBoundary\n".
			"Content-Type: text/plain; charset=utf-8\n".
			"Content-Transfer-Encoding: 7bit\n\n".
			$message['message']."\n".
			"\n--$partBoundary\n".
			"Content-Type: text/html; charset=utf-8\n".
			"Content-Transfer-Encoding: 7bit\n\n".
			$message['message']."\n".
			"\n--$partBoundary--\n";

		if($message['attachment_type']=="pdf"){
            $message_attachment = str_replace("data:application/pdf;base64,","",$message['message_attachment']);
			$rawMessage.="\n--$messageBoundary\n".
			"Content-Transfer-Encoding: base64\n".
			"Content-Type: application/pdf; name=$filename.pdf;\n".
			"Content-Disposition: attachment; filename=$filename.pdf;\n\n".
            $message_attachment."\n\n";
		}else if($message['attachment_type']=="csv"){
            $message_attachment = str_replace("data:text/csv;base64,","",$message['message_attachment']);
			$rawMessage.="\n--$messageBoundary\n".
			"Content-Transfer-Encoding: base64\n".
			"Content-Type: text/csv; name=$filename.csv;\n".
			"Content-Disposition: attachment; filename=$filename.csv;\n\n".
            $message_attachment."\n\n";
		}else if($message['message_attachment']!=""){
            $message_attachment = str_replace("data:image/jpeg;base64,","",$message['message_attachment']);
			$rawMessage.="\n--$messageBoundary\n".
			"Content-Transfer-Encoding: base64\n".
			"Content-Type: image/jpeg; name=$filename.jpeg;\n".
			"Content-Disposition: attachment; filename=$filename.jpeg;\n\n".
            $message_attachment."\n\n";
		}

		$rawMessage.="--$messageBoundary--";
		$request['RawMessage']['Data'] = $rawMessage;
		return $request;
	}

	//send mailer
	public function send($message)
	{
		try{
            $emails = vUtil::get1Dfrom2D(json_decode($message['receivers'],true),'email');
            $filteredEmails = $this->checkHardBounce($emails);
            if(count($filteredEmails)==0)
                return true;

            $emailChunks = array_chunk($filteredEmails,50);
            foreach($emailChunks as $chunk)
            {
                $message['receiverEmails'] = $chunk;
                $message['message'] = $this->mergeVariables($message);

                $request = $this->getRequest($message);
                // print_r($request);
                $result = $this->client->sendRawEmail($request);
                //print_r($result);
                $this->logSent($message);
            }
            return true;
		}catch(Exception $e){
            $this->logPending($message);
            return false;
		}
	}

    private function mergeVariables($message)
    {
        $message['sender_name'] = $message['sender_name'] == null ? "Vyavsaay" : $message['sender_name'];
        $outText = str_replace('*|business_title|*',$message['sender_name'],$message['message']);

        return $outText;
    }

	private function logPending($message)
	{
		$create_query="insert into emails (subject,message,message_attachment,attachment_type,receivers,sender,sender_name,status,last_updated) values(?,?,?,?,?,?,?,?,?)";
		$values = array($message['subject'],$message['message'],$message['message_attachment'],$message['attachment_type'],json_encode($message['receivers']),$message['sender'],$message['sender_name'],'pending',1000*time());
		try{
            $this->dbConn->dbExecute($create_query,$values);
        }
        catch(Exception $ex)
        {}
	}

	private function logSent($message)
	{
		$create_query="insert into emails (subject,message,message_attachment,attachment_type,receivers,sender,sender_name,status,last_updated) values(?,?,?,?,?,?,?,?,?)";
		$values = array($message['subject'],$message['message'],$message['message_attachment'],$message['attachment_type'],json_encode($message['receivers']),$message['sender'],$message['sender_name'],'sent',1000*time());
        try{
            $this->dbConn->dbExecute($create_query,$values);
        }
        catch(Exception $ex)
        {}
	}

	///send all pending mailer stored in the db
	public function sendPending($domain)
	{
		$conn = $this->dbConn;
		if(isset($domain))
		{
			$conn = new vDB("re_user_".$domain);
		}

		$select_query="select * from emails where status=?";
		$result=$conn->dbSelect($select_query,array('pending'));

		$update_query="update emails set status=? where id=?;";

		for($i=0;$i<count($result);$i++)
		{
			if($this->send($result)){
				$conn->dbExecute($update_query,array('sent',$result[$i]['id']));
			}
		}
	}

	public function sendAllPending()
	{
		$conn=new vDB(0);
		$select_query="select username from user_profile where status=?";
		$result=$conn->dbSelect($select_query,array('active'));

		for($i=0;$i<count($result);$i++)
		{
			$this->sendPending($result[$i]['username']);
		}
	}

    private function checkHardBounce($emails){
        $conn=new vDB(0);

        $select_query="select email from hard_bounce where email in (";

        foreach($emails as $e){
            $select_query.="?,";
        }
        $select_query = trim($select_query,",");
        $select_query.=")";

		$result=$conn->dbSelect($select_query,$emails);

        for($i=0;$i<count($result);$i++)
		{
            $key = array_search($result[$i]['email'],$emails);
            if($key!==false){
                unset($emails[$key]);
            }
		}
        return $emails;
    }
}

?>
