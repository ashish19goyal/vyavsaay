<?php

	include_once "../Classes/emailSES.php";
	use RetailingEssentials\emailSES;

	//ini_set('display_errors',1);
	$email = $_POST["input-email"];
	$subject="New customer for newsletter";
	$message="$email: wants to subscribe for newsletter";

	$mailer=emailSES::getInstance('vyavsaay');
	$message = array(
		'receivers' => '[{"email":"info@vyavsaay.com"},{"email":"ashish.19goyal@gmail.com"}]',
		'sender' => 'info@vyavsaay.com',
		'subject' => $subject,
		'message' => $message,
		'sender_name' => 'Website',
		'attachment_type' => '',
		'message_attachment' => ''
	);

	$mailer->send($message);

	$response_object = array( "status" => "mail success");
	$jsonresponse=json_encode($response_object);
	header ("Content-Type:application/json");
	echo $jsonresponse;

?>
