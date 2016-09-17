<?php

/**
*	Executed from the master account
*/

	session_start();

	include_once '../Classes/config.php';
	include_once '../Classes/vUtil.php';
	use RetailingEssentials\config;
	use RetailingEssentials\vUtil;

	$domain=$_POST['domain'];

	if(vUtil::validateSession($_POST))
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
?>
