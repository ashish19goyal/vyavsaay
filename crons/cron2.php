#!/usr/bin/php

<?php

	include_once "../Classes/vDB.php";
	include_once "../Classes/vUtil.php";
	include_once "../Classes/config.php";
	include_once "../Classes/vLog.php";

	use RetailingEssentials\vDB;
	use RetailingEssentials\vUtil;
	use RetailingEssentials\config;
	use RetailingEssentials\vLog;

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
	try{
		$log = vLog::getInstance(array('domain' => 'beacon'));
		// $get_url="http://sandbox.shopclues.com/oauth/loginToken.php";
		$get_url = "https://auth.shopclues.com/loginToken.php";
		$ch=curl_init();

		$body=[];
		//sandbox environment
		// $body['username']="12@sc.com";
		// $body['password']="e10adc3949ba59abbe56e057f20f883e";
		// $body['client_id']="V507FO2X63JIDWLRI04COYQ402TYQMKBI";
		// $body['client_secret']="_TU!AP2O17(&HI3ALA67";

		$config = config::getInstance();

		$body['username'] = $config->get('shopcluesUsername');
		$body['password'] = $config->get('shopcluesPassword');
		$body['client_id'] = $config->get('shopcluesClientId');
		$body['client_secret'] = $config->get('shopcluesClientSecret');
		$body['grant_type']="password";
		$data = json_encode($body);

		$headers = array(
			"Content-type: application/json"
		);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_URL, $get_url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);

		$result = curl_exec($ch);
		$log::info($result);
		curl_close($ch);
		$tokenObject = json_decode($result,true);

		if(isset($tokenObject['access_token']))
		{
			return $tokenObject['access_token'];
		}
		else
		{
			return false;
		}
	}
	catch(Exception $e){
		$log::err("token failed");
		return false;
	}
}

function postOrder($order,$token,$channel){
	try{
		$log = vLog::getInstance(array('domain' => 'beacon'));
		// $get_url="http://sandbox.shopclues.com/api/v1/Pushordertrack";
		// $ch=curl_init();
		$get_url = "http://developer.shopclues.com/api/v1/Pushordertrack";

		$history = json_decode($order['order_history'],true);
		$latest = end($history);
		$time = new DateTime();
		$time->setTimestamp(round($latest['timeStamp']/1000));

		$body=[];
		$body['awbno']=$order['awb_num'];
		$body['status']=$order['status'];
		$body['status_code']=$order['status'];
		$body['status_description']=$order['status'];
		$body['statusUpdateDate']=$time->format("Y-m-d");//"2016-12-28";
		$body['statusUpdateTime']=$time->format("H:i:s");//"00:03:00";
		$body['current_location']=(!isset($latest['location']) || vUtil::isBlank($latest['location']))? "Branch" : $latest['location'];
		$body['from_location']="";
		$body['to_location']="";
		$body['comments']=(!isset($latest['details']) || vUtil::isBlank($latest['details'])) ? $order['status'] : $latest['details'];
		$body['reason_code']=(strpos($order['status'],"undelivered") === false && strpos($order['status'],"RTO") === false ) ? "" : ($order['reason_code'] == null || $order['reason_code'] == "null") ? "" : $order['reason_code'];
		$body['rto_awbno']=(strpos($order['status'],"RTO") === false ) ? "" : $order['awb_num'];
		$body['received_by']=(strpos($order['status'],"RTO delivered") !== false ) ? $order['merchant_name'] : (strpos($order['status'],"delivered") !== false )? $order['ship_to'] : "";
		$body['payment_type']= ($order['type'] == "COD") ? strtolower($order['type']) : "prepaid";
		$body['collectable_amount']=$order['collectable_value'];
		$body['delivery_agent_number']=$order['delivery_agent_number'];

		// print_r($body);
		// return false;
		$data = json_encode($body);

		$headers = array(
			"Content-type: application/json",
			"Authorization: Bearer $token"
		);
		curl_setopt($channel, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($channel, CURLOPT_POSTFIELDS, $data);
		curl_setopt($channel, CURLOPT_URL, $get_url);
		curl_setopt($channel, CURLOPT_RETURNTRANSFER,true);
		curl_setopt($channel, CURLOPT_TIMEOUT,2);

		try{
			$result = curl_exec($channel);
			$resultObject = json_decode($result,true);
			if($resultObject['status']=="403" || $resultObject['status']==403)
			{
				$log::err($result);
				return array(false,'token expired');
			}
			else if(!(
				isset($resultObject['data']['message']['success']) ||
				$resultObject['data']['message']['description']=="Record Already Entered In System" ||
				$resultObject['data']['message']['description']=="No order associated with the requested awbno" ||
				$resultObject['data']['message']['description']=="INVALID AWB NO."))
			{
				$log::err($result);
				return array(false,$result);
			}
		}
		catch(Exception $e2)
		{
			$log::err($e2);
			return array(false,'An error occurerd on network');
		}
	}
	catch(Exception $e)
	{
		$log::err($e);
		return array(false,'An error occurred in request');
	}
	return array(true);
}

function updateSuccess($vDB,$id)
{
	// $log = vLog::getInstance(array('domain' => 'beacon'));
	// $log::err('updating success');
	$updateQuery = "update logistics_orders set sync_order=?, sync_status=?, sync_log=? where id = ?;";
	$result = $vDB->dbExecute($updateQuery,array(0,0,'',$id));
	// $log::err($result);
}

function updateError($vDB,$id,$orderPushStatus)
{
	$updateQuery = "update logistics_orders set sync_order=?, sync_log=? where id = ?;";
	$result = $vDB->dbExecute($updateQuery,array(1,$orderPushStatus,$id));
}

function cron2()
{
	$log = vLog::getInstance(array('domain' => 'beacon'));
	$domain = "beacon";
	$vDB=new vDB('re_user_beacon');
	$updateCount = 100;
	$token = getToken();
	if(!$token){
		return;
	}

	while($updateCount == 100)
	{
		$orders_query = "select l.id,l.awb_num,l.status,l.order_history,l.reason_code,l.ship_to,l.merchant_name,l.type,l.collectable_value from logistics_orders l left join staff s on l.delivery_person = s.acc_name where l.sync_status=? and l.channel_name=? order by l.sync_order,l.last_updated limit 0,$updateCount;";
		$orders=$vDB->dbSelect($orders_query,array(1,"Shopclues"));
		print_r($orders);

		$updateCount = count($orders);
		$updatedIds = array(0);
		$dummyCount = array();
		$ch=curl_init();
		$counter = 0;

		$vDB->setTable('logistics_orders');

		foreach($orders as &$order)
		{
			$counter++;

			try{
				$orderStatus = postOrder($order,$token,$ch);
				// foreach($orderStatus as $os){
				// 	$log::err("status result: ". $os);
				// }

				if($orderStatus[0]){
					updateSuccess($vDB,$order['id']);
					$log::info($order['awb_num']);
					continue;
				}

				if($orderStatus[1]=='token expired'){
					$token = getToken();
				}
				updateError($vDB,$order['id'],$orderStatus[1]);
				// $log::err('error saved');
			}
			catch(Exception $e){}
		}
		curl_close($ch);
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
		sleep(900);
    }
}

?>
