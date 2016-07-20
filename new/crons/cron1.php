#!/usr/bin/php

<?php

	include_once "../Classes/vDB.php";
	include_once "../Classes/mailer_json.php";
	include_once "../Classes/vUtil.php";
	use RetailingEssentials\vDB;
	use RetailingEssentials\send_mailer_json;
	use RetailingEssentials\vUtil;

	date_default_timezone_set('Asia/Kolkata');
/**
 * Method for displaying the help and default variables.
 **/
function displayUsage()
{
    echo "\n";
    echo "Daemon for sending daily status reports for Beacon Logistics\n";
    echo "\n";
    echo "Usage:";
    echo "\cron1.php [options]\n";
    echo "\n";
    echo "\toptions:\n";
    echo "\t\t--help display this help message\n";
    echo "\n";
}//end displayUsage()

function cron1()
{
	$domain = "beacon";
	$vDB=new vDB('re_user_beacon');
	$branches_query="select name from store_areas;";
	$branches=$vDB->dbSelect($branches_query,array());
	$branches_array = array();

	foreach($branches as &$branch)
	{
		$branches_array[]=$branch['name'];
		$branch['total']=0;
		$branch['transit']=0;
		$branch['received']=0;
		$branch['ofd']=0;
		$branch['pending']=0;
		$branch['rto']=0;
		$branch['delivered']=0;
		$branch['total_cod']=0;
		$branch['cod_collected']=0;
		$branch['cod_pending']=0;
	}

	//print_r($branches);die;
	//print_r($branches_array);die;

	$todate=date('d-m-Y',time());
	$today=strtotime($todate)*1000;

	$order_indexes = array(
			array('index' => 'id'),
			array('index' => 'branch', 'array' => $branches_array),
			array('index' => 'manifest_date', 'exact' => $today),
			array('index' => 'status'),
			array('index' => 'collectable_value')
		);
	$vDB->setTable('logistics_orders');
	$orders = $vDB->vRead($order_indexes);
	$orders = $orders['rows'];

	foreach($orders as $order)
	{
		if($order['branch']!="")
		{
			foreach($branches as &$branch)
			{
				if($order['branch']==$branch['name'])
				{
					switch($order['status'])
					{
						case 'in-transit': $branch['transit']+=1;
										$branch['total_cod']+=floatval($order['collectable_value']);
										$branch['total']+=1;
										break;
						case 'pending':
						case 'received':
						case 'undelivered':$branch['pending']+=1;
										$branch['total_cod']+=floatval($order['collectable_value']);
										$branch['total']+=1;
										break;
						case 'out for delivery':$branch['ofd']+=1;
										$branch['total_cod']+=floatval($order['collectable_value']);
										$branch['total']+=1;
										break;
						case 'delivered':$branch['delivered']+=1;
										$branch['cod_collected']+=floatval($order['collectable_value']);
										$branch['total_cod']+=floatval($order['collectable_value']);
										$branch['total']+=1;
										break;
						case 'RTO Delivered':
						case 'RTO pending':
						case 'RTO out for delivery':$branch['rto']+=1;
										$branch['total']+=1;
										break;
						default: $branch['total']+=1;
								$branch['total_cod']+=floatval($order['collectable_value']);
					}
				}
			}
		}
	}
	//print_r($branches);

	$vUtil = vUtil::getInstance('beacon');
	$userPreferences = $vUtil::getUserPreferences(array('title','email','email_report'));
	$bt= $userPreferences['title'];
	$bemail = $userPreferences['email'];
	$email = $userPreferences['email_report'];

	$rowsHTML="<table style='width:100%;font-size:14px;border:1px solid black;text-align:left;' class='plain_table'>".
				"<tr>".
					"<th><b>Branch</b></th>".
					"<th><b>Total Assigned</b></th>".
					"<th><b>Received</b></th>".
					"<th><b>Out for Delivery</b></th>".
					"<th><b>Pending</b></th>".
					"<th><b>RTO</b></th>".
					"<th><b>Delivered</b></th>".
					"<th><b>COD Collected</b></th>".
					"<th><b>COD Pending</b></th>".
				"</tr>";

	foreach($branches as $b)
	{
		$b['received']=$b['total']-$b['transit'];
		$b['cod_pending']=$b['total_cod']-$b['cod_collected'];
		$rowsHTML.="<tr>".
		  			"<td>".$b['name']."</td>".
		  			"<td>".$b['total']."</td>".
		  			"<td>".$b['received']."</td>".
		  			"<td>".$b['ofd']."</td>".
		 			"<td>".$b['pending']."</td>".
		  			"<td>".$b['rto']."</td>".
		  			"<td>".$b['delivered']."</td>".
		  			"<td>Rs. ".$b['cod_collected']."</td>".
		  			"<td>Rs. ".$b['cod_pending']."</td>".
		  		"</tr>";
	}
	$rowsHTML.="</table>";

	$formated_time=date('d-m-Y h:i A',time());
	$reportTitle=$bt.' - Branch Status Report - '.$formated_time;

	$email_message = $vUtil::getFormattedEmail($reportTitle,$rowsHTML);

	//sending email
	if($email!="" && $email!=null)
	{
		$emails_array=explode(",",$email);
		$r_array=array();

		foreach($emails_array as $em)
		{
			$receiver=array('name'=>$bt,'email'=>$em);
			$r_array[]=$receiver;
		}
		$receivers=json_encode($r_array);

		$email_instance=new send_mailer_json($domain);
		$email_instance->direct_send($reportTitle,$email_message,'',$receivers,$bemail,$bt);
		$email_instance->log_mailer($domain,$reportTitle,$email_message,'',$receivers,$bemail,$bt);
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
		if($chour==20)
		{
			cron1();
		}
		sleep(3550);
    }
}

?>
