<?php
		
	include_once "../Classes/sms.php";
	use RetailingEssentials\send_sms;

	session_start();

	$message=$_POST['message'];
	$domain=$_POST['domain'];
	$user=$_POST['username'];
	$type=$_POST['type'];
	$read_access=$_POST['re'];
	$to=$_POST['to'];
	
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$user && $_SESSION['re']==$read_access)
		{
			$sms_instance=new send_sms();
			$sms_instance->direct_send($message,$to,$type);
			$sms_instance->log_sms($domain,$message,$to,$type);
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