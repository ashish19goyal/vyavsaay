<?php
/*
session_start();

$domain=$_POST['domain'];
$url=$_POST['url'];
//$img=$_POST['blob'];
$doc_type=$_POST['doc_type'];
$target_id=$_POST['target_id'];

if(isset($_SESSION['session']))
{
	if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain)
	{

			define('UPLOAD_DIR', 'uploads/');
			$url = str_replace('data:image/jpeg;base64,', '', $url);
			$url = str_replace(' ', '+', $url);
			$data = base64_decode($url);
			$success = file_put_contents("./documents/".$domain."/".$doc_type."-".$target_id+".jpeg", $data);
			//print $success ? $file : 'Unable to save the file.';
	}
	else
	{
		echo "Invalid session";
	}
}
else
{
	echo "Invalid session";
}

*/