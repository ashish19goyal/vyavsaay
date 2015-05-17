<?php

	session_start();

	$domain=$_POST['domain'];
	$user=$_POST['username'];
	$read_access=$_POST['re'];
	$to=$_POST['to'];
	$from=$_POST['from'];
	$message=$_POST['message'];
	$type=$_POST['type'];
	$subject=$_POST['subject'];
	
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$user && $_SESSION['re']==$read_access)
		{
			$headers= "From: " . strip_tags('info@vyavsaay.com') . "\r\n";
			$headers .= "Reply-To: ". strip_tags($from) . "\r\n";
			$headers .= "MIME-Version: 1.0\r\n";
			$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

			if(mail($to,$subject,$message,$headers))
			{
				echo "mail accepted";
			}
		}
		else
		{
			echo "Invalid session";
		}
	}
	else
	{
		echo "Invalid session";
	}
?>	