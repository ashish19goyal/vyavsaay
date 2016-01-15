<?php

	session_start();
	$domain=$_POST['domain'];
	$del_access=$_POST['del'];
	$username=$_POST['username'];
	$up_access=$_POST['up'];
	$cr_access=$_POST['cr'];
	$re_access=$_POST['re'];
	
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['cr']==$cr_access && $_SESSION['up']==$up_access && $_SESSION['del']==$del_access && $_SESSION['re']==$re_access)
		{
			echo "connected";
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
	
?>