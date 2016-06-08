<?php

include_once '../Classes/config.php';
use RetailingEssentials\config;

	session_start();

	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$cr_access=$_POST['cr'];

	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['cr']==$cr_access)
		{
			$config = config::getInstance();
			$dbhost = $config->get('host');
			$dbuser = $config->get('user');
			$dbpass = $config->get('password');
			$config_tables = $config->get('configTables');

			$dbname="re_user_".$domain;
      $tables_array=explode(",",$config_tables);
			$backup_file = $domain."_config";

			$command = "mysqldump --opt -h $dbhost -u $dbuser -p$dbpass --databases $dbname --tables ";
			foreach($tables_array as $t)
      {
          $command.=$t." ";
      }

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
