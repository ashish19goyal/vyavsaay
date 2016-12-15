#!/usr/bin/php

<?php

	include_once "../Classes/vDB.php";
	include_once "../Classes/vUtil.php";
	use RetailingEssentials\vDB;
	use RetailingEssentials\vUtil;

	date_default_timezone_set('Asia/Kolkata');
/**
 * Method for displaying the help and default variables.
 **/
function displayUsage()
{
    echo "\n";
    echo "Daemon for shopclues status update for Beacon Logistics\n";
    echo "\n";
    echo "Usage:";
    echo "\cron2.php [options]\n";
    echo "\n";
    echo "\toptions:\n";
    echo "\t\t--help display this help message\n";
    echo "\n";
}//end displayUsage()

function getToken(){

}

function postOrder($order,$token){
	return true;
}

function cron2()
{
	$domain = "beacon";
	$vDB=new vDB('re_user_beacon');
	$updateCount = 100;
	while($updateCount == 100)
	{
		$orders_query="select * from logistics_orders where sync_status=? limit 0,$updateCount;";
		$orders=$vDB->dbSelect($orders_query,array(0));

		$updateCount = count($orders);
		$updatedIds = array(1);
		$dummyCount = array();
		foreach($orders as &$order)
		{
			if(postOrder($order))
			{
				$updatedIds[]=$order['id'];
				$dummyCount[]="?";
			}else{
				return;
			}
		}

		$vDB->setTable('logistics_orders');
		$dummyFiller = join(",",$dummyCount);
		$updateQuery = "update logistics_orders set sync_status=? where id in ($dummyFiller);";
		$result = $vDB->dbExecute($updateQuery,$updatedIds);
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
		cron2();
		sleep(1800);
    }
}

?>
