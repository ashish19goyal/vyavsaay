<?php

	include_once "../../Classes/S3.php";
	include_once '../../Classes/file_reader.php';
	include_once "../../Classes/db.php";
	use RetailingEssentials\db_connect;
	use RetailingEssentials\file_reader;

	$dbname="re_user_".$_GET['db'];

	$fr=new file_reader($_SERVER['DOCUMENT_ROOT']."/../Config/config.prop");
	$dbhost=$fr->attributes["host"];
	$dbuser = $fr->attributes["user"];
	$dbpass = $fr->attributes["password"];

	$bucketName="vyavsaay-backup";	    
	$awsAccessKey='AKIAIJ2EZR63UZXDGB7A';
	$awsSecretKey='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';
	$mime = "application/octet-stream";
	$s3 = new S3($awsAccessKey, $awsSecretKey);
	
    $backup_command = "mysqldump --opt -h $dbhost -u $dbuser -p$dbpass $dbname > dummy/$dbname.sql";
	exec($backup_command);
    
    $split_command = "split -d -b 10m dummy/$dbname.sql dummy/$dbname";
    exec($split_command);
    
    $delete_command = "rm dummy/$dbname.sql";
    exec($delete_command);
    
    $files=scandir('dummy');
    foreach($files as $file)
    {
        if(preg_match("/".$dbname."/",$file))
        {
            $file_data = file_get_contents("dummy/".$file);            
            if($s3->putObject($file_data,$bucketName,time()."_".$file,S3::ACL_PUBLIC_READ,array(),array('Content-Type' => $mime)))
            {
                echo "backed up ".$file;
            }
            $file_delete_command = "rm dummy/$file";
            exec($file_delete_command);
        }
    }
?>
