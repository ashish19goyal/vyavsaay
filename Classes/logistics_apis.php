<?php

namespace RetailingEssentials;
include_once "../Classes/db.php";
use RetailingEssentials\db_connect;
use \PDO;

class paytm_api
{
	public $client_id=null;
	public $secret=null;
	public $username=null;
	public $password=null;
	public $url=null;

	public function __construct()
	{
		$this->client_id='shipper-seven-horses';
		$this->secret = '3ebc0cf1af9835acd61a43fcfb37ea06e4d34540';
		$this->username = 'rishi@sevenhorses.in';
		$this->password = 'sevenhorses123';
		$this->url = '';
	}

	//send mailer
	public function direct_sync($subject,$message,$message_attachment,$receivers,$from,$from_name)
	{
		$merge_vars=array();
	    $to=array();    
		$receivers_array=explode(';',$receivers);		

		foreach($receivers_array as $r_item)
		{
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
			else if($r_item!=';' && count($receiver_var)==1)
			{
				$merge_var=array(
		       		'rcpt' => $receiver_var[0],
		            'vars' => array(
		            	array(
		                	'customer_name' => 'Sir',
		                	'business_title'=> $from_name
		            	)
		        	)
		        );
		    	$to_var=array(
		        	'email' => $receiver_var[0],
		            'name' => $receiver_var[0],
		            'type' => 'to'
		        );
	
				array_push($merge_vars, $merge_var);
				array_push($to, $to_var);
			}
		}		
		
		$final_message = array(
	        'html' => $message,
	        'subject' => $subject,
	        'from_email' => $from,
	        'from_name' => $from_name,
	        'to' => $to,
	        'headers' => array('Reply-To' => $from),
	        'preserve_recipients' => false,
	        'merge' => true,
	        'merge_language' => 'mailchimp',
	        'merge_vars' => $merge_vars
	    );
	    
	    
	    $result = $this->mandrill->messages->send($final_message);
	    //print_r($result);
	}
	
	///send all pending mailer stored in the db
	public function get_and_sync($domain)
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
			if($result[$i]['attachment_type']=='csv')
			{
				$this->direct_send_csv($result[$i]['subject'],$result[$i]['message'],$result[$i]['message_attachment'],$result[$i]['receivers'],$result[$i]['sender'],$result[$i]['sender_name']);
			}
			else 
			{
				$this->direct_send($result[$i]['subject'],$result[$i]['message'],$result[$i]['message_attachment'],$result[$i]['receivers'],$result[$i]['sender'],$result[$i]['sender_name']);
			}			
			$update_stmt->execute(array('sent',$result[$i]['id']));
		}
	}
}

?>