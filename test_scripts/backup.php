<?php

include_once '../Classes/file_reader.php';
use RetailingEssentials\file_reader;
		//Edit By Ashutosh
	$domain='inventory';
	$username='master';
			
			$fr=new file_reader("../Config/config.prop");
			$dbhost=$fr->attributes["host"];
			$dbname="re_user_".$domain;
			$dbuser = $fr->attributes["user"];
			$dbpass = $fr->attributes["password"];
			
			$backup_file = "./".$domain . date("Y-m-d-H-i-s") . '.sql';
			$command = "mysqldump --opt -h $dbhost -u $dbuser -p$dbpass $dbname";
			
			$mime = "application/x-gzip";

			header( "Content-Type: " . $mime );
			header( 'Content-Disposition: attachment; filename="' . $filename . '"' );			
			
			passthru($command);	
			exit(0);			
?>