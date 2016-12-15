<?php

	include_once "../Classes/mailer_json.php";
	use RetailingEssentials\send_mailer_json;

	//ini_set('display_errors',1);
	$key=$_POST['key'];
	$domain=$_POST['user'];
	$response_object = array( "status" => "fail");

	if($key=='vyavsaay-mailservice-20161110'){
		$message=$_POST['message'];

		$to_array=array(
					array("email" => $message['to'],
						"name" => $message['to_name']
					)
				);
		$to = json_encode($to_array);
		$email = $_POST["input-email"];

		$from= $message['from_email'];
		$from_name=$message['from_name'];

		$subject=$message['subject'];
		$message=$message['html'];
		$email_instance=new send_mailer_json($domain);
		$email_instance->direct_send($subject,$message,'',$to,$from,$from_name);

		$response_object = array( "status" => "success");
	}
	$jsonresponse=json_encode($response_object);
	header ("Content-Type:application/json");
	echo $jsonresponse;
?>
