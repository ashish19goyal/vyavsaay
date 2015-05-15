<?php

	$message_string="hi this is a test message from vyavsaay";
	$to='9818005232';
	$username='trvyavsaay';
	$password='69sKkr';
	$sender_id='VYAVSY';

//	$username='demo7788';
//	$password='demo7788';
//	$sender_id='GANESH';
	$url='https://sms99.co.in/pushsms.php';
	
	$r = new HttpRequest($url, HttpRequest::METH_POST);
	$r->addPostFields(array('username' => $username, 'password' => $password,'sender'=>$sender_id,'message'=>$message_string,'numbers'=>$to));
	try {
	    echo $r->send()->getBody();
	} catch (HttpException $ex) {
	    echo $ex;
	}	

?>