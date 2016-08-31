<?php

	include_once "../Classes/S3.php";
	include_once '../Classes/config.php';
	use RetailingEssentials\config;

	$dbname="re_user_".$_GET['db'];

	$config = config::getInstance();
	$dbhost = $config->get("host");
	$dbuser = $config->get("user");
	$dbpass = $config->get("password");
	$awsAccessKey=$config->get("backupAwsAccessKey");
	$awsSecretKey=$config->get("backupAwsSecretKey");

	$bucketName="vyavsaay-backup";
	$mime = "application/octet-stream";
	$s3 = new S3($awsAccessKey, $awsSecretKey);

    $backup_command = "mysqldump --opt -h $dbhost -u $dbuser -p$dbpass $dbname > dummy/$dbname.sql";
	exec($backup_command);

    $split_command = "split -d -b 10m dummy/$dbname.sql dummy/$dbname";
    exec($split_command);

    $delete_command = "rm dummy/$dbname.sql";
    exec($delete_command);

	$time = time();

    $files=scandir('dummy');
    foreach($files as $file)
    {
        if(preg_match("/".$dbname."/",$file))
        {
            $file_data = file_get_contents("dummy/".$file);
            if($s3->putObject($file_data,$bucketName,$time."_".$file,S3::ACL_PUBLIC_READ,array(),array('Content-Type' => $mime)))
            {
                echo "backed up ".$time."_".$file;
            }
            $file_delete_command = "rm dummy/$file";
            exec($file_delete_command);
        }
    }
?>
