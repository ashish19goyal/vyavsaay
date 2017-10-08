#!/usr/bin/php

<?php
	include_once "../Classes/vS3.php";
	include_once '../Classes/config.php';
	include_once "../Classes/vLog.php";
	include_once "../Classes/vElastic.php";
	include_once "../Classes/vUtil.php";

	use RetailingEssentials\config;
	use RetailingEssentials\vLog;
	use RetailingEssentials\vS3;
	use RetailingEssentials\vElastic;
	use RetailingEssentials\vUtil;

	date_default_timezone_set('Asia/Kolkata');

//backup logs from Elastic search, that are older than one month

/**
 * Method for displaying the help and default variables.
 **/
function displayUsage()
{
    echo "\n";
    echo "Daemon for taking backup of application logs to s3\n";
    echo "\n";
    echo "Usage:";
    echo "\cron8.php [options]\n";
    echo "\n";
    echo "\toptions:\n";
    echo "\t\t--help display this help message\n";
    echo "\n";
}//end displayUsage()

function cron8()
{
	$log = vLog::getInstance();
	try
	{
		$config = config::getInstance();
		$domains = vUtil::getAllDomains();

		$mime = "application/json";

		$time = time();
		$monthTimeStamp = ($time - 3600*24*30)*1000;

		$s3Settings = array(
			'awsKey' => $config->get("logAwsKey"),
			'awsSecret' => $config->get("logAwsSecret"),
			'region' => 'ap-south-1',
			'bucket' => 'vyavsaay-activitylog'
		);

		$s3 = new vS3($s3Settings);

		$log::info("deleting application logs older than $monthTimeStamp");

		$filterQuery = array(
			'query' => [
				'range' => [
	                'at' => [
						'lt' => $monthTimeStamp
					]
	            ]
			]
		);

		foreach ($domains as $domain)
		{
			try{
				$logFile = $domain.".json";
				$vElastic = vElastic::getInstance($domain);
				$content = $vElastic->getLog($filterQuery);

				print_r($content);

				if(count($content)>0)
				{
					$objectInfo = array(
						'name' => $time."_".$logFile,
						'content' => json_encode($content),
						'mime' => $mime
					);

					if($s3->putObject($objectInfo))
					{
						$vElastic->deleteLog($filterQuery);
						$log::info("backed up logs for $domain");
					}
				}
				else{
					$log::info("no activities backed up for $domain");
				}
			}
			catch(Exception $e1)
			{
				$log::err($e1);
			}
		}
	}
	catch(Exception $ex)
	{
		$log::err($e);
		$log::err("application logs from elastic could not be Backed up");
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
		if($chour==3)
		{
			cron8();
		}
		sleep(3550);
    }
}

?>
