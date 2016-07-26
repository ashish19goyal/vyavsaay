<?php

	include_once "../Classes/mailer_json.php";
	use RetailingEssentials\send_mailer_json;

	//ini_set('display_errors',1);
	$to_array=array(
				array("email" => "info@vyavsaay.com",
					"name" => "Ashish"
				)
			);
	$to = json_encode($to_array);
	$email = $_POST["input-email"];

	$from= "vyavsaayindia@gmail.com";
	$from_name="Vyavsaay";

	$subject="New customer for newsletter";
	$message="This mail was sent to *|name|*<br>Email: $email";
	$email_instance=new send_mailer_json('vyavsaay');
	$email_instance->direct_send($subject,$message,'',$to,$from,$from_name);

	$response_object = array( "status" => "mail success");
	$jsonresponse=json_encode($response_object);
	header ("Content-Type:application/json");
	echo $jsonresponse;

?>
