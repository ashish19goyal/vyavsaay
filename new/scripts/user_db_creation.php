<?php

	include_once "../Classes/setup.php";
	use RetailingEssentials\user_setup;

	$username=$_POST['userid'];
	$user_db_setup=new user_setup($username);

	$jsonresponse=json_encode(array("status" => "success"));
	header ("Content-Type:application/json");
	echo $jsonresponse;

?>
