<?php
	
	ini_set('display_errors',1);
	$email_to = "info@vyavsaay.com";
	$email = $_POST["input-email"];
	echo $email;
	$text = "Email: $email";

	$headers = "From: contact@vyavsaay.com \r\n";
	$headers .= "Reply-To: $email \r\n";
	$headers .= "Return-Path: contact@vyavsaay.com \r\n";
	$headers .= "MIME-Version: 1.0" . "\r\n"; 
	$headers .= "Content-type:text/html; charset=utf-8" . "\r\n"; 
	$headers .= "X-Mailer: PHP \r\n";


//	$headers .= "From: <contact@vyavsaay.com>" . "\r\n";
//	$headers .= "Reply-To: $email";
	$mail_status=mail($email_to, "Vyavsaay NewsLetter", $text, $headers);
	if($mail_status)
	{
		echo "mail success";
	}
	else{
		echo "mail failed";
	}
?>