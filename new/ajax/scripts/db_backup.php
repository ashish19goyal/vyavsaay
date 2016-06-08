<?php

	include_once "../../Classes/S3.php";
	include_once '../../Classes/config.php';
	include_once "../../Classes/db.php";
	use RetailingEssentials\db_connect;
	use RetailingEssentials\config;

	$dbname="re_user_".$_GET['db'];

	$config = config::getInstance();
	$dbhost = $config->get("host");
	$dbuser = $config->get("user");
	$dbpass = $config->get("password");
	$awsAccessKey=$config->get("backupAwsAccessKey");
	$awsSecretKey=$config->get("backupAwsSecretKey");

	$bucketName="vyavsaay-backup";
	$mime = "application/octet-stream";

	$s3 = new S3($awsAccessKey, $awsSecretKey);

	$command = "mysqldump --opt -h $dbhost -u $dbuser -p$dbpass $dbname";

	$result_output=shell_exec($command);

	if($s3->putObject($result_output,$bucketName,time()."_".$dbname,S3::ACL_PUBLIC_READ,array(),array('Content-Type' => $mime)))
	{
		echo 'success for '.$dbname;
	}
	else
	{
		echo 'failed for '.$dbname;
	}
?>
