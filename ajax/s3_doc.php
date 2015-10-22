<?php

	include_once "../Classes/s3_objects.php";
	use RetailingEssentials\s3_object;

	session_start();

	if(isset($_POST["blob"]) && !empty($_POST["blob"]) )
	{
		$blob=$_POST['blob'];
		$name=$_POST['name'];	
		$content_type=$_POST['content_type'];

		$s3=new s3_object();
		$s3->direct_transfer($blob,$name,$content_type);
	}
?>