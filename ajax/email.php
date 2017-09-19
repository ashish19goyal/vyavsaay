<?php

	include_once "../Classes/emailSES.php";
	require_once '../Classes/vUtil.php';
	use RetailingEssentials\vUtil;
	use RetailingEssentials\emailSES;

	session_start();

	$domain=$_POST['domain'];
	$input_object=json_decode($_POST['data'],true);
	$response_object=[];

	if(vUtil::validateSession($_POST))
	{
		$mailer=emailSES::getInstance($domain);
		$message = array(
			'receivers' => $input_object['to'],
			'sender' => $input_object['from'],
			'subject' => $input_object['subject'],
			'message' => $input_object['message'],
			'sender_name' => $input_object['from_name'],
			'attachment_type' => $input_object['attachment_type'],
			'message_attachment' => $input_object['message_attachment']
		);
		$response_object['status']='mailed';
		// $response_object['message']=$message;
		// print_r($message);
		$mailer->send($message);
	}
	else
	{
		$response_object['status']='Invalid session';
	}

	$jsonresponse=json_encode($response_object);
	header ("Content-Type:application/json");
	echo $jsonresponse;
?>
