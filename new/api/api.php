<?php

	require_once '../Classes/api.php';
	// require_once '../Classes/vDB.php';
	use RetailingEssentials\api;

	$post = json_decode(file_get_contents("php://input"),true);
	$api = api::getInstance($_GET,$post);

	// $vDB=new vDB(0);

	$authentication = $api->authenticateRequest();

	$response_object = $authentication;

	if($response_object['status']=='success')
	{
		$response_object = $api->executeRequest($response_object['dbname']);
	}

	$jsonresponse=json_encode($response_object);
	header ("Content-Type:application/json");
	echo $jsonresponse;

 ?>
