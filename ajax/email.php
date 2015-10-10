	<?php

	include_once "../Classes/mailer.php";
	use RetailingEssentials\send_mailer;

	session_start();

	$domain=$_POST['domain'];
	$user=$_POST['username'];
	$read_access=$_POST['re'];

	$subject=$_POST['subject'];
	$message=$_POST['message'];
	$message_attachment=$_POST['message_attachment'];
	$attachment_type=$_POST['atype'];
	$to=$_POST['to'];
	$from=$_POST['from'];
	$from_name=$_POST['from_name'];
	
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$user && $_SESSION['re']==$read_access)
		{
			$email_instance=new send_mailer();
			if($attachment_type=='csv')
			{
				$email_instance->direct_send_csv($subject,$message,$message_attachment,$to,$from,$from_name);				
			}
			else 
			{
				$email_instance->direct_send($subject,$message,$message_attachment,$to,$from,$from_name);
			}			
			$email_instance->log_mailer($domain,$subject,$message,$message_attachment,$to,$from,$from_name);

			echo "mail accepted";
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