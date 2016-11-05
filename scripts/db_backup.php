<?php

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
		$dbname="re_user_".$domain;

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
?>
