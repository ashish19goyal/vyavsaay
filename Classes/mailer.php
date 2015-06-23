<?php

namespace RetailingEssentials;
include_once "../Classes/db.php";
require_once '../Classes/mandrill/src/Mandrill.php';
use RetailingEssentials\db_connect;
use \PDO;
use \Mandrill;

class send_mailer
{
	public $username=null;
	public $password=null;
	public $sender_id=null;
	public $url=null;
	
	public function __construct()
	{
		$this->api_key='Ub0h4w5NVLE6GdyXrYFlZw';
		$this->mandrill = new Mandrill($this->api_key);
	}

	//send mailer
	public function direct_send($subject,$message,$receivers,$from,$from_name)
	{
		echo $message;
		$merge_vars=array();
	    $to=array();    
		$receivers_array=explode(';',$receivers);		

		foreach($receivers_array as $r_item)
		{
			echo $r_item;
			$receiver_var=explode(':',$r_item);
			if($r_item!=';' && count($receiver_var)>1)
			{
				$merge_var=array(
		       		'rcpt' => $receiver_var[1],
		            'vars' => array(
		            	array(
		                	'customer_name' => $receiver_var[0],
		                	'business_title'=> $from_name
		            	)
		        	)
		        );
		    	$to_var=array(
		        	'email' => $receiver_var[1],
		            'name' => $receiver_var[0],
		            'type' => 'to'
		        );
	
				array_push($merge_vars, $merge_var);
				array_push($to, $to_var);
			}
		}		

		$attachment=array(
	            array(
	                'type' => 'application/pdf',
	                'name' => $subject.'.pdf',
	                'content' => base64_encode($message)
	            )
	        );
				
		$message = array(
	        'html' => $message,
	        'subject' => $subject,
	        'from_email' => $from,
	        'from_name' => $from_name,
	        'to' => $to,
	        'headers' => array('Reply-To' => $from),
	        'preserve_recipients' => false,
	        'merge' => true,
	        'merge_language' => 'mailchimp',
	        'merge_vars' => $merge_vars, 
	        'attachments' => $attachment
	    );
	    $result = $this->mandrill->messages->send($message);
	    //print_r($result);
	}

	///send all pending mailer stored in the db
	public function send_stored_mailer($domain)
	{
		$conn1=new db_connect('re_user_'.$domain);
		
		$select_query="select * from emails where status=?";
		$select_stmt=$conn1->conn->prepare($select_query);
		$update_query="update emails set status=? where id=?;";
		$update_stmt=$conn1->conn->prepare($update_query);
		
		$select_stmt->execute(array('pending'));
		$result=$select_stmt->fetchAll(PDO::FETCH_ASSOC);
		
		for($i=0;$i<count($result);$i++)
		{
			$this->direct_send($result[$i]['subject'],$result[$i]['message'],$result[$i]['receivers'],$result[$i]['sender'],$result[$i]['sender_name']);			
			$update_stmt->execute(array('sent',$result[$i]['id']));
		}
	}
	
	public function store_pending_mailer($domain,$subject,$message,$to,$from,$from_name)
	{
		$conn=new db_connect('re_user_'.$domain);
		
		$create_query="insert into emails (subject,message,receivers,sender,sender_name,status,last_updated) values(?,?,?,?,?,?,?)";		
		$create_stmt=$conn->conn->prepare($create_query);
		$create_stmt->execute(array($subject,$message,$to,$from,$from_name,'pending',1000*time()));		
	}

	public function log_mailer($domain,$subject,$message,$to,$from,$from_name)
	{
		$conn=new db_connect('re_user_'.$domain);
		
		$create_query="insert into emails (subject,message,receivers,sender,sender_name,status,last_updated) values(?,?,?,?,?,?,?)";
		$create_stmt=$conn->conn->prepare($create_query);
		$create_stmt->execute(array($subject,$message,$to,$from,$from_name,'sent',1000*time()));		
	}
	
	public function send_all_stored_mailer()
	{
		$conn=new db_connect(0);
		$select_query="select username from user_profile where status=?";
		$select_stmt=$conn->conn->prepare($select_query);
		
		$select_stmt->execute(array('active'));
		$result=$select_stmt->fetchAll(PDO::FETCH_ASSOC);
		
		for($i=0;$i<count($result);$i++)
		{
			$this->send_stored_mailer($result[$i]['username']);
		}
	}
}

?>