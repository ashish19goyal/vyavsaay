<?php
	session_start();
		
	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$cr_access=$_POST['cr'];
			
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['cr']==$cr_access)
		{
			$fr=new file_reader("../Config/config.prop");
			$dbhost="localhost";
			$dbname="re_user_".$domain;
			$dbuser = $fr->attributes["user"];
			$dbpass = $fr->attributes["password"];
			
			$backup_file = $dbname . date("Y-m-d-H-i-s") . '.gz';
			$command = "mysqldump --opt -h $dbhost -u $dbuser -p $dbpass $dbname | gzip > $backup_file";
			system($command,$retval);
			if($retval!=false)
			{
				echo "success";
			}
			else 
			{
				echo "failed";
			}
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