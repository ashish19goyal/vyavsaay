<?php

include_once "../Classes/emailSES.php";
use RetailingEssentials\emailSES;

	//ini_set('display_errors',1);
	$key=$_POST['key'];
	$domain=$_POST['user'];
	$response_object = array( "status" => "fail");

	if($key=='vyavsaay-mailservice-20161110'){
		$inputMessage=$_POST['message'];

		$to_array=array(
					array("email" => $inputMessage['to']
						//"name" => $message['to_name']
					)
				);
		$to = json_encode($to_array);
		$email = $_POST["input-email"];

		$from= $inputMessage['from_email'];
		$from_name=$inputMessage['from_name'];

		$subject=$inputMessage['subject'];
		$message=$inputMessage['html'];

		$mailer=emailSES::getInstance($domain);
		$outMessage = array(
			'receivers' => $to,
			'sender' => $from,
			'subject' => $subject,
			'message' => $message,
			'sender_name' => $from_name,
			'attachment_type' => '',
			'message_attachment' => ''
		);
		$mailer->send($outMessage);
		$response_object = array( "status" => "success");
	}

	$jsonresponse=json_encode($response_object);
	header ("Content-Type:application/json");
	echo $jsonresponse;
?>
