#!/usr/bin/php

<?php

	include_once "../Classes/vDB.php";
	include_once "../Classes/mailer_json.php";
	use RetailingEssentials\vDB;
	use RetailingEssentials\send_mailer_json;

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
	$today = 1468348200000;
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

	$rowsHTML="<table>";

	foreach($branches as $branch)
	{
		$branch['received']=$branch['total']-$branch['transit'];
		$branch['cod_pending']=$branch['total_cod']-$branch['cod_collected'];

	    $rowsHTML.="<tr>".
		  			"<td data-th='Branch'>".
			  			$branch['name'].
			  		"</td>".
		  			"<td data-th='Total Assigned'>".
			  			$branch['total'].
		  			"</td>".
		  			"<td data-th='Received'>".
			  			$branch['received'].
		  			"</td>".
		  			"<td data-th='Out for Delivery'>".
			  			$branch['ofd'].
		  			"</td>".
		 			"<td data-th='Pending'>".
			  			$branch['pending'].
		  			"</td>".
		  			"<td data-th='RTO'>".
			  			$branch['rto'].
		  			"</td>".
		  			"<td data-th='Delivered'>".
			  			$branch['delivered'].
		  			"</td>".
		  			"<td data-th='COD Collected'>".
			  			"Rs. ".$branch['cod_collected'].
		  			"</td>".
		  			"<td data-th='COD Pending'>".
			  			"Rs. ".$branch['cod_pending'].
		  			"</td>".
		  		"</tr>";
	}
	$rowsHTML.="</table>";
	// print_r($rowsHTML);die;
	$email_instance=new send_mailer_json($domain);
	$tselect_query="select name,value from user_preferences where name in (?,?,?,?)";

	$tresult=$vDB->dbSelect($tselect_query,array('title','phone','email','address'));
	$bt="";
	$bphone="";
	$baddress="";
	$bemail="";
	for($k=0;$k<count($tresult);$k++)
	{
		switch($tresult[$k]['name'])
		{
			case 'title': $bt=$tresult[$k]['value'];
							break;
			case 'phone': $bphone=$tresult[$k]['value'];
							break;
			case 'email': $bemail=$tresult[$k]['value'];
							break;
			case 'address': $baddress=$tresult[$k]['value'];
							break;
		}
	}

	$email="info@vyavsaay.com";
	$schedule_format=date('d-m-Y h:i A',time());
	//sending email
	if($email!="" && $email!=null)
	{
		$subject=$bt.' - Branch Status Report - '.$schedule_format;
		$r_array=array(array('name'=>$bt,'email'=>$email));
		$receivers=json_encode($r_array);
		$email_instance->direct_send($subject,$rowsHTML,'',$receivers,$bemail,$bt);
		$email_instance->log_mailer($domain,$subject,$rowsHTML,'',$receivers,$bemail,$bt);
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
    // while(true)
    // {
		// $ctime=localtime(time(),true);
		// $chour=$ctime['tm_hour'];
		// if($chour==20)
		// {
			cron1();
		// }
		// sleep(3550);
    // }
}

?>
