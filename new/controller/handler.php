<?php

	session_start();

	require_once '../Classes/vUtil.php';
	require_once '../Classes/handler.php';
	use RetailingEssentials\vUtil;
	use RetailingEssentials\handler;

	$input_data=json_decode($_POST['data'],true);
	$domain=$_POST['domain'];
	$response_object=[];

	$getArray = explode('/',$_GET['url']);
	$requestType = isset($getArray[0]) ? $getArray[0] : null;

	if(vUtil::validateSession($_POST))
	{
		$handler = handler::getInstance($domain);

		switch($requestType)
		{
			case 'create': 	$response_object = $handler::create($input_data);
							break;
			case 'read_rows': 	$response_object = $handler::read_rows($input_data);
							break;
		}
	}
	else
	{
		$response_object['status']='Invalid session';
	}

	$jsonresponse=json_encode($response_object);
	header ("Content-Type:application/json");
	echo $jsonresponse;

 ?>
