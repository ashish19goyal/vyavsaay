#!/usr/bin/php

<?php

include_once "../Classes/vUtil.php";
include_once "../Classes/emailSES.php";
use RetailingEssentials\emailSES;
use RetailingEssentials\vUtil;

	date_default_timezone_set('Asia/Kolkata');
/**
 * Method for displaying the help and default variables.
 **/
function displayUsage()
{
    echo "\n";
    echo "Daemon to email the status of running crons\n";
    echo "\n";
    echo "Usage:";
    echo "\cron3.php [options]\n";
    echo "\n";
    echo "\toptions:\n";
    echo "\t\t--help display this help message\n";
    echo "\n";
}//end displayUsage()


function getActiveCrons(){
	try{
		$crons = array();
		$command = "ps -ef | grep cron";
	    exec($command,$crons);
		foreach($crons as &$c)
		{
			$c = preg_replace('/\s+/', ' ',$c);
			$c = explode(" ",$c);
		}
		// print_r($crons);
		return $crons;
	}
	catch(Exception $e)
	{
		return array();
	}
}

function cron3()
{
	$domain = "vyavsaay";
	$vUtil = vUtil::getInstance($domain);
	$userPreferences = $vUtil::getUserPreferences(array('title','email'));
	$bemail = $userPreferences['email'];
	$bt = $userPreferences['title'];

	$rowsHTML = "Following crons are running currently.<br><br>";
	$rowsHTML.="<table style='width:100%;font-size:14px;border:1px solid black;text-align:left;' class='plain_table'>".
				"<tr>".
					"<th><b>Cron Name</b></th>".
					"<th><b>Start Time</b></th>".
				"</tr>";

	$crons = getActiveCrons();
	foreach($crons as $c)
	{
		$rowsHTML.="<tr>".
		  			"<td>".$c[8]."</td>".
					"<td>".$c[4]."</td>".
		  		"</tr>";
	}
	$rowsHTML.="</table>";

	$formated_time=date('d-m-Y h:i A',time());
	$reportTitle='Crons Status Report - '.$formated_time;
	$email_message = $vUtil::getFormattedEmail($reportTitle,$rowsHTML);

	//sending email
	if($bemail!="" && $bemail!=null)
	{
		$emails_array=explode(",",$bemail);
		$r_array=array();

		foreach($emails_array as $em)
		{
			$receiver=array('email'=>$em);
			$r_array[]=$receiver;
		}
		$receivers=json_encode($r_array);

		$mailer=emailSES::getInstance($domain);
		$message = array(
			'receivers' => $receivers,
			'sender' => $bemail,
			'subject' => $reportTitle,
			'message' => $email_message,
			'sender_name' => $bt,
			'attachment_type' => '',
			'message_attachment' => ''
		);
		try
		{
			$mailer->send($message);
		}
		catch(Exception $e)
		{
			print_r($e);
		}
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
		cron3();
		sleep(43200);
    }
}

?>
