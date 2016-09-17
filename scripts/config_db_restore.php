<?php

/**
*	Executed from the master account
*/

	session_start();

	include_once '../Classes/config.php';
	include_once '../Classes/vUtil.php';
	use RetailingEssentials\config;
	use RetailingEssentials\vUtil;

	$domain=$_POST['domain'];
	$input_data=$_POST['data'];

	$response_object=[];

	if(vUtil::validateSession($_POST))
	{
		$input_object=json_decode($input_data,true);
		$dbname=$input_object['db'];
		$sql=preg_replace('/data:application\/sql;base64,/',"",$input_object['sql'],1);
		$decoded_sql=base64_decode($sql,true);

		$config = config::getInstance();
		$dbhost = $config->get('host');
		$dbuser = $config->get('user');
		$dbpass = $config->get('password');

		try
		{
			$filename="dummy/$dbname.sql";
			$file_open = fopen($filename,"w");
			fwrite($file_open,$decoded_sql);
			fclose($file_open);

			$command = "mysql -h $dbhost -u $dbuser -p$dbpass $dbname < $filename";
			exec($command);

			$delete_command = "rm dummy/$dbname.sql";
			exec($delete_command);

			$response_object['status']='config updated';
		}
		catch(Exception $e)
		{
			$response_object['status']='Error occured';
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
