<?php

include_once '../Classes/file_reader.php';
use RetailingEssentials\file_reader;

	session_start();
		
	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$cr_access=$_POST['cr'];
			
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['cr']==$cr_access)
		{
			$fr=new file_reader($_SERVER['DOCUMENT_ROOT']."/../Config/config.prop");
			$dbhost=$fr->attributes["host"];
			$dbname="re_user_".$domain;
			$dbuser = $fr->attributes["user"];
			$dbpass = $fr->attributes["password"];
			
			$backup_file = $domain;
			$command = "mysqldump --opt -h $dbhost -u $dbuser -p$dbpass $dbname";
						
			$mime = "application/octet-stream";
			header( "Content-Type: " . $mime );
			header( 'Content-Disposition: attachment; filename="' . $backup_file . '"' );			

			passthru($command);		

			exit(0);		
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