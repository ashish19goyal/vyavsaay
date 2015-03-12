<?php
		
	session_start();
		
	$message_string=$_POST['message_data'];
	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$read_access=$_POST['re'];
	$to=$_POST['to'];

	$username=urlencode('ashish18goyal');
	$password=urlencode('FKXHD6');
	$sender_id=urlencode('VYAVSY');
	$url='http://sms99.co.in/pushsms.php';
	
	//echo $columns;
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['re']==$read_access)
		{
			$fields_string='password='.$password.'&username='.$username.'&sender='.$sender_id.'&message='.$message_string.'&numbers='.$to;
			$get_url=$url."?".$fields_string;
		
			$ch=curl_init();	
			curl_setopt($ch,CURLOPT_URL, $get_url);
			curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
			$result = curl_exec($ch);
			curl_close($ch);
		
			echo "message sent";
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