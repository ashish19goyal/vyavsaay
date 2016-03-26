<?php

namespace RetailingEssentials;
include_once "../Classes/db.php";
require_once '../Classes/mandrill/src/Mandrill.php';
use RetailingEssentials\db_connect;
use \PDO;
use \Mandrill;

class send_mailer_json
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
	public function direct_send($subject,$message,$message_attachment,$receivers,$from,$from_name)
	{
		$merge_vars=array();
	    $to=array();    
		$receivers_array=json_decode($receivers,true);

		$global_merge_vars=array(
				array(
					'name' => 'business_title',
					'content' => $from_name
			)
		);

		foreach($receivers_array as $r_item)
		{
			$vars_array=array();
			foreach($r_item as $key => $value)
			{
				$var_item=array(
						'name' => $key,
						'content' => $value
				);
				$vars_array[]=$var_item;
			}
			$merge_var=array(
		       		'rcpt' => $r_item['email'],
		            'vars' => $vars_array
		        );

	    	$to_var=array(
		        	'email' => $r_item['email'],
		            'name' => $r_item['name'],
		            'type' => 'to'
		        );
	
			$merge_vars[]= $merge_var;
			$to[]= $to_var;
		}		
		
		//$merge_vars_string=json_encode($merge_vars);
		//echo $merge_vars_string;
		
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
	        'global_merge_vars' => $global_merge_vars,
	        'merge_vars' => $merge_vars
	    );
	    
	    if($message_attachment!="")
	    {
	    	$new_attachment=preg_replace('/data:image\/jpeg;base64,/',"",$message_attachment,1);
	    	$attachment=array(
	            array(
	                'type' => 'image/jpeg',
	                'name' => "$subject".".jpeg",
	                'content' => $new_attachment
	            )
	        );
	        
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
		        'global_merge_vars' => $global_merge_vars,
	        	'merge_vars' => $merge_vars,
		        'images' => $attachment
		    );
	    }
	    
	    $result = $this->mandrill->messages->send($final_message);
	    //print_r($result);
	}


	//send mailer
	public function direct_send_csv($subject,$message,$message_attachment,$receivers,$from,$from_name)
	{
		$merge_vars=array();
	    $to=array();    
		$receivers_array=json_decode($receivers,true);

		$global_merge_vars=array(
				0 => array(
					'name'=> 'business_title',
					'content'=> $from_name
			)
		);

		foreach($receivers_array as $r_item)
		{
			$vars_array=array();
			foreach($r_item as $key => $value)
			{
				$var_item=array(
						'name' => $key,
						'content' => $value
				);
				$vars_array[]=$var_item;
			}
			$merge_var=array(
		       		'rcpt' => $r_item['email'],
		            'vars' => $vars_array
		        );

	    	$to_var=array(
		        	'email' => $r_item['email'],
		            'name' => $r_item['name'],
		            'type' => 'to'
		        );
	
			$merge_vars[]= $merge_var;
			$to[]= $to_var;
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
	        'global_merge_vars' => $global_merge_vars,
	        'merge_vars' => $merge_vars
	    );
	    
	    if($message_attachment!="")
	    {
	    	$new_attachment=base64_encode($message_attachment);
	    	$attachment=array(
	            array(
	                'type' => 'text/csv',
	                'name' => 'file.csv',
	                'content' => $new_attachment
	            )
	        );
	        
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
		        'global_merge_vars' => $global_merge_vars,
	        	'merge_vars' => $merge_vars,
		        'attachments' => $attachment
		    );
	    }
	    
	    $result = $this->mandrill->messages->send($final_message);
	    //print_r($result);
	}

    public function direct_send_pdf($subject,$message,$message_attachment,$receivers,$from,$from_name)
	{
		$merge_vars=array();
	    $to=array();    
		$receivers_array=json_decode($receivers,true);

		$global_merge_vars=array(
				0 => array(
					'name'=> 'business_title',
					'content'=> $from_name
			)
		);

		foreach($receivers_array as $r_item)
		{
			$vars_array=array();
			foreach($r_item as $key => $value)
			{
				$var_item=array(
						'name' => $key,
						'content' => $value
				);
				$vars_array[]=$var_item;
			}
			$merge_var=array(
		       		'rcpt' => $r_item['email'],
		            'vars' => $vars_array
		        );

	    	$to_var=array(
		        	'email' => $r_item['email'],
		            'name' => $r_item['name'],
		            'type' => 'to'
		        );
	
			$merge_vars[]= $merge_var;
			$to[]= $to_var;
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
	        'global_merge_vars' => $global_merge_vars,
	        'merge_vars' => $merge_vars
	    );
	    
	    if($message_attachment!="")
	    {
	    	$new_attachment=base64_encode($message_attachment);
	    	$attachment=array(
	            array(
	                'type' => 'application/pdf',
	                'name' => 'file.pdf',
	                'content' => $new_attachment
	            )
	        );
	        
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
		        'global_merge_vars' => $global_merge_vars,
	        	'merge_vars' => $merge_vars,
		        'attachments' => $attachment
		    );
	    }
	    
	    $result = $this->mandrill->messages->send($final_message);
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
			if($result[$i]['attachment_type']=='csv')
			{
				$this->direct_send_csv($result[$i]['subject'],$result[$i]['message'],$result[$i]['message_attachment'],$result[$i]['receivers'],$result[$i]['sender'],$result[$i]['sender_name']);
			}
			else if($result[$i]['attachment_type']=='pdf')
			{
				$this->direct_send_pdf($result[$i]['subject'],$result[$i]['message'],$result[$i]['message_attachment'],$result[$i]['receivers'],$result[$i]['sender'],$result[$i]['sender_name']);
			}
			else 
			{
				$this->direct_send($result[$i]['subject'],$result[$i]['message'],$result[$i]['message_attachment'],$result[$i]['receivers'],$result[$i]['sender'],$result[$i]['sender_name']);
			}			
			$update_stmt->execute(array('sent',$result[$i]['id']));
		}
	}
	
	public function store_pending_mailer($domain,$subject,$message,$to,$from,$from_name)
	{
		$conn=new db_connect('re_user_'.$domain);
		
		$create_query="insert into emails (subject,message,message_attachment,receivers,sender,sender_name,status,last_updated) values(?,?,?,?,?,?,?)";		
		$create_stmt=$conn->conn->prepare($create_query);
		$create_stmt->execute(array($subject,$message,$message_attachment,$to,$from,$from_name,'pending',1000*time()));	
	}

	public function log_mailer($domain,$subject,$message,$message_attachment,$to,$from,$from_name)
	{
		$conn=new db_connect('re_user_'.$domain);
		
		$create_query="insert into emails (subject,message,message_attachment,receivers,sender,sender_name,status,last_updated) values(?,?,?,?,?,?,?,?)";
		$create_stmt=$conn->conn->prepare($create_query);
		$create_stmt->execute(array($subject,$message,$message_attachment,$to,$from,$from_name,'sent',1000*time()));		
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