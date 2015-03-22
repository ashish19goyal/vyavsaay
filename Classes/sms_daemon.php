#!/usr/bin/php
 
<?php

	include_once "./sms.php";
	use RetailingEssentials\send_sms;
 
	$log = './sms_daemon.log';
 
/**
 * Method for displaying the help and default variables.
 **/
function displayUsage()
{
    global $log;
 
    echo "\n";
    echo "Daemon for sending sms stored in the db\n";
    echo "\n";
    echo "Usage:";
    echo "\sms_daemon.php [options]\n";
    echo "\n";
    echo "\toptions:\n";
    echo "\t\t--help display this help message\n";
    echo "\t\t--log=<filename> The location of the log file (default '$log')\n";
    echo "\n";
}//end displayUsage()
 
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
            case '--log':
                $log = $args[1];
                break;
        }
    }
}
 
//fork the process to work in a daemonized environment
file_put_contents($log, "Status: starting up.n", FILE_APPEND);
$pid = pcntl_fork();

if($pid == -1)
{
	file_put_contents($log, "Error: could not daemonize process.n", FILE_APPEND);
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
		$sms_instance=new send_sms();
		$sms_instance->send_all_stored_sms();		
        sleep(10);
    }
}

?>