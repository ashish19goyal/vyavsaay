#!/usr/bin/php

<?php

	include_once '../Classes/config.php';
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
    echo "Daemon for deleting activities older than one month\n";
    echo "\n";
    echo "Usage:";
    echo "\cron7.php [options]\n";
    echo "\n";
    echo "\toptions:\n";
    echo "\t\t--help display this help message\n";
    echo "\n";
}//end displayUsage()

function cron7()
{
	$log = vLog::getInstance();
	try
	{
		$config = config::getInstance();
		$dbhost = $config->get("host");
		$dbuser = $config->get("user");
		$dbpass = $config->get("password");

		$info_conn=new vDB('information_schema');
		$get_query="select distinct table_schema from information_schema.columns where table_schema like ?";
		$get_res=$info_conn->dbSelect($get_query,array('%re_user%'));

		$time = time();
		$monthTimeStamp = ($time - 3600*24*30)*1000;

		$log::info("deleting activities older than $monthTimeStamp");

		for($i=0;$i<count($get_res);$i++)
		{
			$dbname=$get_res[$i]['table_schema'];
			try
			{
				$dbConn = new vDB($dbname);
				$deleteQuery = "delete from activities where last_updated < ?";
				$deletedValues = array($monthTimeStamp);
				if($dbConn->dbExecute($deleteQuery,$deletedValues))
				{
					$log::info("Activities deleted from DB $dbname");
				}
			}
			catch(Exception $e)
			{
				$log::err($e);
				$log::err("activities deletion failed for $dbname");
			}
		}
	}
	catch(Exception $ex)
	{
		$log::err($e);
		$log::err("activities deletion failed for all DBs");
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
			cron7();
		}
		sleep(3550);
    }
}

?>
