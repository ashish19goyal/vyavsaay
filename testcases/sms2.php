<?php

	$message_string=urlencode("Hi, thanks for registering with Vyavsaay!!");
	$to='9818005232';
	$username='sendervyavsaay';
	$password='DveI9O';
	$sender_id='VYAVSY';

	$url='http://sms99.co.in/pushsms.php';

	$fields_string='password='.$password.'&username='.$username.'&sender='.$sender_id.'&message='.$message_string.'&numbers='.$to;

	$ch=curl_init();
	$get_url=$url."?".$fields_string;
	
	curl_setopt($ch,CURLOPT_URL, $get_url);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
	
	$result = curl_exec($ch);
	curl_close($ch);
	
	//echo "<b>".$result."</b>";

?>