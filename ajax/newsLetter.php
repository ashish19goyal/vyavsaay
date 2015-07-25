<?php

	include_once "../Classes/mailer.php";
	use RetailingEssentials\send_mailer;
	
	//ini_set('display_errors',1);
	$to = "Ashish:info@vyavsaay.com";
	$email = $_POST["input-email"];

	$from= "vyavsaayindia@gmail.com";
	$from_name="Vyavsaay";
	
	$subject="New customer for newsletter";
	$message="Email: $email";
	$email_instance=new send_mailer();
	$email_instance->direct_send($subject,$message,'',$to,$from,$from_name);
	echo "mail success";
	
?>