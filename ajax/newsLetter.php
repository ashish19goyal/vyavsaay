<?php
	
	ini_set('display_errors',1);
	$email_to = "vyavsaayindia@gmail.com";
	$email = $_POST["input-email"];
	echo $email;
	$text = "Email: $email";

	$headers = "From: info@vyavsaay.com \r\n";
	$headers .= "Reply-To: $email \r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

	$mail_status=mail($email_to, "Vyavsaay Inquiry", $text, $headers);
	if($mail_status)
	{
		echo "mail success";
	}
	else{
		echo "mail failed";
	}
?>