<?php

	session_start();

	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;

	$domain=$_POST['domain'];
	$user=$_POST['username'];
	$read_access=$_POST['re'];
	$to=$_POST['to'];
	$from=$_POST['from'];
	$message=$_POST['message'];
	$type=$_POST['type'];
	$subject=$_POST['subject'];
	$business_title=$_POST['title'];
	
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$user && $_SESSION['re']==$read_access)
		{
			$headers= "From:"+business_title+"<info@vyavsaay.com> \r\n";
			$headers .= "Reply-To: ". strip_tags($from) . "\r\n";
			$headers .= "MIME-Version: 1.0\r\n";
			$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
			$headers .= 'Bcc: '.strip_tags($to) . "\r\n";
			
			if(mail($from,$subject,$message,$headers))
			{
				echo "mail accepted";
				$db_name="re_user_".$domain;
				$conn=new db_connect($db_name);
				
				$query2="insert into emails(receivers,sender,subject,message,status,type,last_updated) values(?,?,?,?,?,?,?)";
								
				$stmt2=$conn->conn->prepare($query2);
				$data_array=array($to,$from,$subject,$message,'sent',$type,1000*time());
				$stmt2->execute($data_array);
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