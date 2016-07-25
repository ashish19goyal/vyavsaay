<?php

	include_once "../Classes/S3.php";
	include_once '../Classes/config.php';
	use RetailingEssentials\config;

	$dbname="re_user_".$_GET['db'];
	$pass=$_GET['p'];

	if($pass=='vya')
	{
		$config = config::getInstance();
		$dbhost = $config->get("host");
		$dbuser = $config->get("user");
		$dbpass = $config->get("password");
		$awsAccessKey=$config->get("backupAwsAccessKey");
		$awsSecretKey=$config->get("backupAwsSecretKey");

		$bucketName="vyavsaay-backup";
		$mime = "application/octet-stream";
		$s3 = new S3($awsAccessKey, $awsSecretKey);

		$filesList = $s3->getBucket($bucketName);
		$matchedFiles = array();

		foreach($filesList as $name => $file)
		{
			if(preg_match("/".$dbname."/",$name))
			{
				$matchedFiles[$name] = explode('_',$name)[0];
			}
		}

		arsort($matchedFiles);

		$filesToGet = array();
		$highestTime = 0;
		foreach($matchedFiles as $name => $time)
		{
			if($time >= $highestTime)
			{
				$order = explode("_",str_replace($dbname,"",$name))[1];
				$filesToGet[$name] = $order;
				$highestTime = $time;
			}
			else {
				break;
			}
		}

		asort($filesToGet);

		$filesString = "";

		foreach($filesToGet as $fileName => $order)
		{
			$saveTo = "dummy/$fileName.sql";
			$filesString.=$saveTo." ";
			$s3Obj=$s3->getObject($bucketName, $fileName, $saveTo);
		}

		$merge_command = "cat $filesString > dummy/$dbname.sql";
	    exec($merge_command);

		$delete_command = "rm $filesString";
	    exec($delete_command);

		$restore_command = "mysql -h $dbhost -u $dbuser -p$dbpass $dbname < dummy/$dbname.sql";
		exec($restore_command);

		$delete_command = "rm dummy/$dbname.sql";
		exec($delete_command);

		echo "restored $dbname";
	}
	else{
		echo "You are not allowed to perform this operation";
	}
?>
