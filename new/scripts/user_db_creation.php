<?php

	include_once "../Classes/setup.php";
	use RetailingEssentials\user_setup;
	
	$username=$_POST['userid'];
	$user_db_setup=new user_setup($username);
	
?>