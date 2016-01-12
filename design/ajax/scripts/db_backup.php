<?php

	include_once "../../Classes/S3.php";
	include_once '../../Classes/file_reader.php';
	include_once "../../Classes/db.php";
	use RetailingEssentials\db_connect;
	use RetailingEssentials\file_reader;

	$dbname="re_user_".$_GET['db'];

		$fr=new file_reader("../../../Config/config.prop");
		$dbhost=$fr->attributes["host"];
		$dbuser = $fr->attributes["user"];
		$dbpass = $fr->attributes["password"];
		
		$bucketName="vyavsaay-backup";	    
		$awsAccessKey='AKIAIJ2EZR63UZXDGB7A';
		$awsSecretKey='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';
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