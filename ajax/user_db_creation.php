<?php

	include_once "../Classes/setup.php";
	use RetailingEssentials\user_setup;
	
	$username=$_POST['userid'];
	$suer_db_setup=new user_setup($username);
	
?>