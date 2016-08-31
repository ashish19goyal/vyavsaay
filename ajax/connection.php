<?php

	session_start();

	require_once '../Classes/vUtil.php';
	use RetailingEssentials\vUtil;

	$response_object=[];

	if(vUtil::validateSession($_POST))
	{
		$response_object['status']='connected';
	}
	else
	{
		$response_object['status']='Invalid session';
	}

	$jsonresponse=json_encode($response_object);
	header ("Content-Type:application/json");
	echo $jsonresponse;

?>
