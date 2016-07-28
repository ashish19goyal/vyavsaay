<?php

	require_once '../Classes/api.php';
	use RetailingEssentials\api;

	$api = api::getInstance($_GET,$_POST);

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
