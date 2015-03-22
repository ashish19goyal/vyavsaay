<?php

	$message_string=urlencode("tu uth kar phone utha!!");
	$to='8800241141';
//	$username=urlencode('ashish18goyal');
//	$password=urlencode('FKXHD6');
//	$sender_id=urlencode('VYAVSY');

	$username='demo7788';
	$password='demo7788';
	$sender_id='GANESH';
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