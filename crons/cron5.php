#!/usr/bin/php

<?php

	include_once "../Classes/S3.php";
	include_once "../Classes/config.php";
	include_once "../Classes/vDB.php";
	include_once "../Classes/vLog.php";

	use RetailingEssentials\vDB;
	use RetailingEssentials\config;
	use RetailingEssentials\vLog;

	date_default_timezone_set('Asia/Kolkata');
/**
 * Method for displaying the help and default variables.
 **/
function displayUsage()
{
    echo "\n";
    echo "Daemon for taking backup for all Databases\n";
    echo "\n";
    echo "Usage:";
    echo "\cron5.php [options]\n";
    echo "\n";
    echo "\toptions:\n";
    echo "\t\t--help display this help message\n";
    echo "\n";
}//end displayUsage()

function cron5()
{
	$log = vLog::getInstance();
	// $log::info("taking db backups");
	try
	{
		$config = config::getInstance();
		$dbhost = $config->get("host");
		$dbuser = $config->get("user");
		$dbpass = $config->get("password");
		$awsAccessKey=$config->get("backupAwsAccessKey");
		$awsSecretKey=$config->get("backupAwsSecretKey");

		$info_conn=new vDB('information_schema');
		$get_query="select distinct table_schema from information_schema.columns where table_schema like ?";
		$get_res=$info_conn->dbSelect($get_query,array('%re_user%'));

		$tempDir = "../crons/dummy";

		$bucketName="vyavsaay-backup";
		$mime = "application/octet-stream";

		$s3 = new S3($awsAccessKey, $awsSecretKey);
		$time = time();

		for($i=0;$i<count($get_res);$i++)
		{
			$dbname=$get_res[$i]['table_schema'];
			// $log::info("starting backup for $dbname");
			try
			{
				$command = "mysqldump --opt -h $dbhost -u $dbuser -p$dbpass $dbname";

				$backup_command = "mysqldump --opt -h $dbhost -u $dbuser -p$dbpass $dbname > $tempDir/$dbname.sql";
				exec($backup_command);

				// $log::info("dumoed $dbname");

				$split_command = "split -d -b 10m $tempDir/$dbname.sql $tempDir/$dbname";
				exec($split_command);

				// $log::info("split $dbname");

				$delete_command = "rm $tempDir/$dbname.sql";
				exec($delete_command);

				// $log::info("deleted sql for $dbname");

				$files=scandir($tempDir);
				foreach($files as $file)
				{
					if(preg_match("/".$dbname."/",$file))
					{
						$file_data = file_get_contents("$tempDir/".$file);
						if($s3->putObject($file_data,$bucketName,$time."_".$file,S3::ACL_PUBLIC_READ,array(),array('Content-Type' => $mime)))
						{
							$log::info("backed up $time $file");
							$file_delete_command = "rm $tempDir/$file";
							exec($file_delete_command);
						}
					}
				}
			}
			catch(Exception $e)
			{
				$log::err($e);
				$log::err("backup failed for $dbname");
			}
		}
	}
	catch(Exception $ex)
	{
		$log::err($e);
		$log::err("Backup script failed for all DBs");
	}
}

//configure command line arguments
if($argc > 0)
{
    foreach($argv as $arg)
    {
       $args = explode('=',$arg);
       switch($args[0])
       {
			case '--help':
                return displayUsage();
                break;
        }
    }
}

//fork the process to work in a daemonized environment
$pid = pcntl_fork();

if($pid == -1)
{
	return 1; //error
}
else if($pid)
{
	return 0; //success
}
else
{
    //the main process
	$log = vLog::getInstance();

	while(true)
    {
		$ctime=localtime(time(),true);
		$chour=$ctime['tm_hour'];
		// $log::info($chour);
		if($chour==2)
		{
			cron5();
		}
		sleep(3550);
    }
}

?>
