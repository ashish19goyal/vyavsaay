	<?php

	include_once "../Classes/mailer_json.php";
	use RetailingEssentials\send_mailer_json;

	session_start();

	$domain=$_POST['domain'];
	$user=$_POST['username'];
	$read_access=$_POST['re'];
	$input_data=$_POST['email_data'];
	$input_object=json_decode($input_data,true);

	$subject=$input_object['subject'];
	$message=$input_object['message'];
	$message_attachment=$input_object['message_attachment'];
	$attachment_type=$input_object['attachment_type'];
	$to=$input_object['to'];
	$from=$input_object['from'];
	$from_name=$input_object['from_name'];
	
	$response_object=[];
	
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$user && $_SESSION['re']==$read_access)
		{
			$email_instance=new send_mailer_json();
			if($attachment_type=='csv')
			{
				$email_instance->direct_send_csv($subject,$message,$message_attachment,$to,$from,$from_name);
                $response_object['status']='mailed as csv';
			}
            else if($attachment_type=='pdf')
			{
				$email_instance->direct_send_pdf($subject,$message,$message_attachment,$to,$from,$from_name);
                $response_object['status']='mailed as pdf';
			}
			else 
			{
				$email_instance->direct_send($subject,$message,$message_attachment,$to,$from,$from_name);
                $response_object['status']='mailed';
			}
			$email_instance->log_mailer($domain,$subject,$message,$message_attachment,$to,$from,$from_name);
		}
		else
		{
			$response_object['status']='Invalid session';
		}
	}
	else
	{
		$response_object['status']='Invalid session';
	}
	
	$jsonresponse=json_encode($response_object);		
	header ("Content-Type:application/json");
	echo $jsonresponse;

?>