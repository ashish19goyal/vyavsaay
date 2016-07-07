<?php

/**
*	t=yyyy-mm-dd
*	p=vya
*/

	include_once "../../Classes/S3.php";
	include_once '../../Classes/config.php';
	use RetailingEssentials\config;

	$time=$_GET['t'];
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
			$matchedFiles[$name] = explode('_',$name)[0];
		}
		asort($matchedFiles);

		$deleteTime = strtotime($time);
		foreach($matchedFiles as $name => $ftime)
		{
			if($ftime <= $deleteTime)
			{
				$s3->deleteObject($bucketName,$name);
				echo "deleting $name<br>";
			}
			else {
				break;
			}
		}

		echo "cleaned backups before time ".$time;
	}
	else{
		echo "You are not allowed to perform this operation";
	}
?>
