#!/usr/bin/php

<?php
	include_once "../Classes/vS3.php";
	include_once '../Classes/config.php';
	include_once "../Classes/vLog.php";

	use RetailingEssentials\config;
	use RetailingEssentials\vLog;
	use RetailingEssentials\vS3;

	date_default_timezone_set('Asia/Kolkata');
/**
 * Method for displaying the help and default variables.
 **/
function displayUsage()
{
    echo "\n";
    echo "Daemon for copying application log files to s3\n";
    echo "\n";
    echo "Usage:";
    echo "\cron6.php [options]\n";
    echo "\n";
    echo "\toptions:\n";
    echo "\t\t--help display this help message\n";
    echo "\n";
}//end displayUsage()

function cron6()
{
	$log = vLog::getInstance();
	try
	{
		$config = config::getInstance();
		$mime = "text/plain";

		$s3Settings = array(
			'awsKey' => $config->get("logAwsKey"),
			'awsSecret' => $config->get("logAwsSecret"),
			'region' => 'ap-south-1',
			'bucket' => 'vyavsaay-logs'
		);
		$s3 = new vS3($s3Settings);

		$time = time();
		$logFolder = "/var/log/";
		$infoFile = "vyavsaay.info";
		$errorFile = "vyavsaay.error";

		$objectInfo = array(
			'name' => $time."_".$infoFile,
			'content' => file_get_contents($logFolder.$infoFile),
			'mime' => $mime
		);
		if($s3->putObject($objectInfo))
		{
			$command = "> ".$logFolder.$infoFile;
			exec($command);
			$log::info("backed up $infoFile");
		}

		$objectInfo = array(
			'name' => $time."_".$errorFile,
			'content' => file_get_contents($logFolder.$errorFile),
			'mime' => $mime
		);
		if($s3->putObject($objectInfo))
		{
			$command = "> ".$logFolder.$errorFile;
			exec($command);
			$log::info("backed up $errorFile");
		}
	}
	catch(Exception $ex)
	{
		$log::err($e);
		$log::err("log files could not be Backed up");
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
    while(true)
    {
		$ctime=localtime(time(),true);
		$chour=$ctime['tm_hour'];
		if($chour==2)
		{
			cron6();
		}
		sleep(3550);
    }
}

?>
