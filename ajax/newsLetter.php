<?php
	$email_to = "info@vyavsaay.com";
	$email = $_POST["input-email"];
	echo $email;
	$text = "Email: $email";
	$headers = "MIME-Version: 1.0" . "\r\n"; 
	$headers .= "Content-type:text/html; charset=utf-8" . "\r\n"; 
	$headers .= "From: <$email>" . "\r\n";
	$mail_status=mail($email_to, "Vyavsaay NewsLetter", $text, $headers);
	echo $mail_status;
?>