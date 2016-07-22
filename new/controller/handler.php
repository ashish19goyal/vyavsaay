<?php

	session_start();

	require_once '../Classes/vDB.php';
	require_once '../Classes/vUtil.php';
	use RetailingEssentials\vDB;
	use RetailingEssentials\vUtil;

	$input_data=json_decode($_POST['data'],true);
	$domain=$_POST['domain'];
	$response_object=[];

	$getArray = explode('/',$_GET['url']);
	$requestType = isset($getArray[0]) ? $getArray[0] : null;

	if(vUtil::validateSession($_POST))
	{
		$vDB = new vDB("re_user_".$domain);
		$dataStore = $input_data['data_store'];
		$vDB->setTable($dataStore);
		$data = isset($input_data['indexes']) ? $input_data['indexes'] : $input_data['data'];

		switch($requestType)
		{
			case 'create': 	$dbResult = $vDB->vCreate($data);
							if($dbResult['status']=='success')
							{
								$logData = array_merge($input_data,
								 	array(
										'type' => 'create',
										'ids' => array($dbResult['id']),
									));
								$vDB->log($logData);
							}
							$response_object = array_merge($response_object,$dbResult);
							$response_object['data_store']=$dataStore;
							$response_object['warning']= isset($input_data['warning']) ? $input_data['warning'] : 'yes';
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
