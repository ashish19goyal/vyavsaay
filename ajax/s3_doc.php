<?php

	include_once "../Classes/vS3.php";
	use RetailingEssentials\vS3;

	session_start();

	if(isset($_POST["blob"]) && !empty($_POST["blob"]) )
	{
		$blob=$_POST['blob'];
		$name=$_POST['name'];
		$content_type=$_POST['content_type'];

		$s3=new vS3(array(
				'bucket' => 'vyavsaay-newsletter'
		));
		$s3->putObject(array(
			'name' => $name,
			'content' => $blob,
			'mime' => $content_type
		));
	}
?>
