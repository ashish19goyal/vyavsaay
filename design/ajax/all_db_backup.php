<?php

	include_once "../Classes/S3.php";
	include_once '../Classes/file_reader.php';
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	use RetailingEssentials\file_reader;

	$pass=$_GET['p'];
	
	if($pass=='vya')
	{		
		$fr=new file_reader("../../Config/config.prop");
		$dbhost=$fr->attributes["host"];
		$dbuser = $fr->attributes["user"];
		$dbpass = $fr->attributes["password"];
		
		$info_conn=new db_connect('information_schema');
		$get_query="select distinct table_schema from information_schema.columns where table_schema like ?";
		$get_stmt=$info_conn->conn->prepare($get_query);
		$get_stmt->execute(array('%re_user%'));
		$get_res=$get_stmt->fetchAll(PDO::FETCH_ASSOC);
		
		$bucketName="vyavsaay-backup";	    
		$awsAccessKey='AKIAIJ2EZR63UZXDGB7A';
		$awsSecretKey='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';
		$mime = "application/octet-stream";
		
		//$awsAccessKey="AKIAIUMY6WOBUJW3JR4A";
		//$awsSecretKey='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';
		

		$s3 = new S3($awsAccessKey, $awsSecretKey);
		
		for($i=0;$i<count($get_res);$i++)
		{
			$dbname=$get_res[$i]['table_schema'];

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
		}	
	}
	else
	{
		echo "Invalid session";
	}
?>