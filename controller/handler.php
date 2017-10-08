<?php

	session_start();

	require_once '../Classes/vUtil.php';
	require_once '../Classes/handler.php';
	use RetailingEssentials\vUtil;
	use RetailingEssentials\handler;

	$input_data = isset($_POST['data']) ? json_decode($_POST['data'],true) : array();
	$domain = isset($_POST['domain']) ? $_POST['domain'] : "";
	$response_object=[];

	$getArray = explode('/',$_GET['url']);
	$requestType = isset($getArray[0]) ? $getArray[0] : null;

	if(vUtil::validateSession($_POST))
	{
		$handler = handler::getInstance($domain);

		switch($requestType)
		{
			case 'create': $response_object = $handler::create($input_data);
							break;
			case 'update': $response_object = $handler::update($input_data);
							break;
			case 'delete': $response_object = $handler::delete($input_data);
							break;
			case 'read_rows': $response_object = $handler::read_rows($input_data);
							break;
			case 'read_column': $response_object = $handler::read_column($input_data);
							break;
			case 'get_count': $response_object = $handler::get_count($input_data);
							break;
			case 'cron': $response_object = $handler::manage_cron($input_data);
							break;
			case 'batch': $response_object = $handler::batch($input_data);
							break;
			case 's3': $input_data['domain'] = $domain;
						$response_object = $handler::s3($input_data);
						break;
			case 'search': $response_object = $handler::search($input_data);
							break;
			case 'getLog': $response_object = $handler::getLog($input_data);
							break;
			case 'deleteLog': $response_object = $handler::deleteLog($input_data);
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
