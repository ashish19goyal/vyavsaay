<?php

namespace RetailingEssentials;
use \PDO;
use RetailingEssentials\db_connect;

class send_sms
{
	public $username=null;
	public $password=null;
	public $sender_id=null;
	public $url=null;
		
	public function __construct()
	{
		$this->username=urlencode('ashish18goyal');
		$this->password=urlencode('FKXHD6');
		$this->sender_id=urlencode('VYAVSY');
		$this->url='http://sms99.co.in/pushsms.php';
	}
	
	public function direct_send($message,$to)
	{
		$message=urlencode($message);			
		$fields_string='password='.$this->password.'&username='.$this->username.'&sender='.$this->sender_id.'&message='.$message.'&numbers='.$to;
		$get_url=$this->url."?".$fields_string;
	
		$ch=curl_init();	
		curl_setopt($ch,CURLOPT_URL, $get_url);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		$result = curl_exec($ch);
		curl_close($ch);
	
		echo "message sent";
	}
	
	public function send_stored_sms($domain)
	{
		$conn=new db_connect('re_user_'+$domain);
		$select_query="select * from sms where status=?";
		$select_stmt=$conn->conn->prepare($select_query);
		$update_query="update sms set status=? where id=?;"
		$update_stmt=$conn->conn->prepare($update_query);
		
		$select_stmt->execute(array('pending'));
		$result=$select_stmt->fetchAll(PDO::FETCH_ASSOC);
		
		for($i=0;$i<count($result);$i++)
		{
			direct_send($result[$i]['message'],$result[$i]['to']);
			$update_stmt->execute(array('sent',$result[$i]['id']));
		}
	}
}

?>