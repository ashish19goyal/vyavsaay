<?php

	include_once "../Classes/S3.php";
	//use RetailingEssentials\S3;

	session_start();

	if(isset($_POST["blob"]) && !empty($_POST["blob"]) )
	{
		$bucketName="vyavsaay-newsletter";	    
	    $blob=$_POST['blob'];
		$name=$_POST['name'];	
		$content_type=$_POST['content_type'];

		$awsAccessKey='AKIAIUMY6WOBUJW3JR4A';
		$awsSecretKey='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';
    
	    // remove the prefix
	    $uri=substr($blob,strpos($blob,",")+1);
		$code_uri=base64_decode($uri);

		$s3 = new S3($awsAccessKey, $awsSecretKey);		
		
		if($s3->putObject($code_uri,$bucketName,$name,S3::ACL_PUBLIC_READ,array(),array('Content-Type' => $content_type)))
		{
			echo 'successful';
		}
		else 
		{
			echo 'failed';
		}
	}
?>