<?php

namespace RetailingEssentials;
include_once "../Classes/db.php";
include_once '../Classes/config.php';

use RetailingEssentials\db_connect;
use \PDO;
use \DateTime;

class paytm_api
{
	private $client_id=null;
	private $secret=null;
	private $username=null;
	private $password=null;
	private $domain=null;
	private $conn=null;
	private $new_time=null;

	public function __construct($domain)
	{
		$config = config::getInstance();

  		$this->client_id=$config->get("paytmClientId");
		$this->secret = $config->get("paytmSecret");
		$this->username = $config->get("paytmUsername");
		$this->password = $config->get("paytmPassword");
		$this->domain = $domain;
		$this->conn=new db_connect("re_user_".$this->domain);
		$this->new_time = time()*1000;
	}

	public function sync_api()
	{
		$code_string=$this->generate_code();
		$code_array=json_decode($code_string,true);
		$results_array=[];

		if(isset($code_array['code']))
		{
			$code=$code_array['code'];
			$token_string=$this->get_token($code);
			$token_array=json_decode($token_string,true);

			if(isset($token_array['access_token']))
			{
				$token=$token_array['access_token'];
				$delivered_array=$this->get_delivered();
				if(count($delivered_array)>0)
				{
					$delivered_string=$this->update_delivered_status($token,$delivered_array);
					//echo $delivered_string;
					$delivered_status_array=json_decode($delivered_string,true);
					if(isset($delivered_status_array['response']) && $delivered_status_array['response']=='success')
					{
						$this->update_delivered_time();
						$results_array['delivered']='success';
					}
					else
					{
						$results_array['delivered']=$delivered_status_array;
					}
				}
				else
				{
					$this->update_delivered_time();
					$results_array['delivered']='success';
				}

				////////rto delivered//////////
				$rto_delivered_array=$this->get_rto_delivered();
				if(count($rto_delivered_array)>0)
				{
					$rto_delivered_string=$this->update_rto_delivered_status($token,$rto_delivered_array);
					//echo $rto_delivered_string;
					$rto_delivered_status_array=json_decode($rto_delivered_string,true);
					if(isset($rto_delivered_status_array['response']) && $rto_delivered_status_array['response']=='success')
					{
						$this->update_rto_delivered_time();
						$results_array['rto delivered']='success';
					}
					else
					{
						$results_array['rto delivered']=$rto_delivered_status_array;
					}
				}
				else
				{
					$this->update_rto_delivered_time();
					$results_array['rto delivered']='success';
				}

				////////rto picked//////////
				$rto_picked_array=$this->get_rto_picked();
				if(count($rto_picked_array)>0)
				{
					$rto_picked_string=$this->update_rto_picked_status($token,$rto_picked_array);
					//echo $rto_delivered_string;
					$rto_picked_status_array=json_decode($rto_picked_string,true);
					if(isset($rto_picked_status_array['response']) && $rto_picked_status_array['response']=='success')
					{
						$this->update_rto_picked_time();
						$results_array['rto picked']='success';
					}
					else
					{
						$results_array['rto picked']=$rto_picked_status_array;
					}
				}
				else
				{
					$this->update_rto_picked_time();
					$results_array['rto picked']='success';
				}
			}
			else
			{
				$results_array['delivered']='fail';
				$results_array['rto delivered']='fail';
				$results_array['rto picked']='fail';
				$results_array['token']='fail';
			}
		}
		else
		{
			$results_array['delivered']='fail';
			$results_array['rto delivered']='fail';
			$results_array['rto picked']='fail';
			$results_array['token']='fail';
			$results_array['code']='fail';
		}

		return $results_array;
	}

	private function update_delivered_status($token,$shipments_array)
	{
		$get_url="http://track.paytm.com/v2/shipper/track/shipment/update?token=".$token;
		$ch=curl_init();
		curl_setopt($ch,CURLOPT_URL, $get_url);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);

		$body=[];
        $body['status_code']="DL";
        $body['status_description']="SHIPMENT DELIVERED";
        $body['shipments']=[];
        $body['shipments']=$shipments_array;
        $body_params=http_build_query($body);

		curl_setopt($ch,CURLOPT_POST, count($body));
        curl_setopt($ch, CURLOPT_POSTFIELDS,$body_params);

		$headers = array(
            "Content-type: application/x-www-form-urlencoded"
        );
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

		$result = curl_exec($ch);
		curl_close($ch);
		return $result;
	}

	private function update_rto_delivered_status($token,$shipments_array)
	{
		$get_url="http://track.paytm.com/v2/shipper/track/shipment/update?token=".$token;
		$ch=curl_init();
		curl_setopt($ch,CURLOPT_URL, $get_url);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);

	    $body=[];
        $body['status_code']="RD";
        $body['status_description']="RETURN DELIVERED";
        $body['shipments']=[];
        $body['shipments']=$shipments_array;
        $body_params=http_build_query($body);
		curl_setopt($ch,CURLOPT_POST, count($body));
        curl_setopt($ch, CURLOPT_POSTFIELDS,$body_params);

		$headers = array(
            "Content-type: application/x-www-form-urlencoded"
        );
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

		$result = curl_exec($ch);
		curl_close($ch);
		return $result;
	}

	private function update_rto_picked_status($token,$shipments_array)
	{
		$get_url="http://track.paytm.com/v2/shipper/track/shipment/update?token=".$token;
		$ch=curl_init();
		curl_setopt($ch,CURLOPT_URL, $get_url);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);

	    $body=[];
        $body['status_code']="RP";
        $body['status_description']="RETURN PICKED";
        $body['shipments']=[];
        $body['shipments']=$shipments_array;
        $body_params=http_build_query($body);
		curl_setopt($ch,CURLOPT_POST, count($body));
        curl_setopt($ch, CURLOPT_POSTFIELDS,$body_params);

		$headers = array(
            "Content-type: application/x-www-form-urlencoded"
        );
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

		$result = curl_exec($ch);
		curl_close($ch);
		return $result;
	}

	private function generate_code()
	{
		$get_url="https://persona.paytm.com/oauth2/authorize?username=".$this->username."&password=".$this->password."&state=a1b2c3d4&submit=Secure+Sign+In&notredirect=true&client_id=".$this->client_id."&response_type=code&client_secret=".$this->secret;
		$ch=curl_init();
		curl_setopt($ch,CURLOPT_URL, $get_url);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);

		$result = curl_exec($ch);
		curl_close($ch);
		return $result;
	}

	private function get_token($code)
	{
		$get_url="https://persona.paytm.com/oauth2/token?code=".$code."&client_id=".$this->client_id."&client_secret=".$this->secret."&grant_type=authorization_code&state=a1b2c3d4";
		$ch=curl_init();
		curl_setopt($ch,CURLOPT_URL, $get_url);
		curl_setopt($ch,CURLOPT_ENCODING ,"");
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);

		$headers = array(
            "Content-type: application/x-www-form-urlencoded",
            "Accept: */*",
            "Cache-Control: no-cache",
            "Connection: keep-alive",
            "X-FirePHP-Version: 0.0.6"
        );
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

		$result = curl_exec($ch);
		curl_close($ch);
		return $result;
	}

	///send all pending mailer stored in the db
	private function get_delivered()
	{
		//getting last_sync_time
		$last_delivered_sync_time=0;

		$stmt1=$this->conn->conn->prepare("select name,value from user_preferences where name=?");
		$stmt1->execute(array('paytm_delivered_sync_time'));
		$row1=$stmt1->fetch(PDO::FETCH_ASSOC);
		$last_sync_time=$row1['value'];
		$last_delivered_sync_time=$row1['value'];
		//////////////////////

		$stmt=$this->conn->conn->prepare("select awb_num,delivery_time from logistics_orders where (last_updated>? or last_sync_time>?) and channel_name=? and status=?;");
		$stmt->execute(array($last_delivered_sync_time,$last_delivered_sync_time,'PayTm','delivered'));
		$stmt_res=$stmt->fetchAll(PDO::FETCH_ASSOC);

		$shipments_array=[];

		for($i=0;$i<count($stmt_res);$i++)
		{
			$shipment_obj=[];
			$shipment_obj['tracking_number']=$stmt_res[$i]['awb_num'];

			//$order_history_array=json_decode($stmt_res[$i]['order_history'], true);
			//$timestamp=round($order_history_array[count($order_history_array)-1]['timeStamp']/1000);
			$timestamp=round($stmt_res[$i]['delivery_time']/1000);
			$date = new DateTime("@$timestamp");
			$shipment_obj['delivered_at']=$date->format('Y-m-d H:i:s');

			$shipments_array[]=$shipment_obj;
		}

		return $shipments_array;
	}

	///send all pending mailer stored in the db
	private function get_rto_delivered()
	{
		//getting last_sync_time
		$last_rto_delivered_sync_time=0;

		$stmt1=$this->conn->conn->prepare("select name,value from user_preferences where name=?");
		$stmt1->execute(array('paytm_rto_delivered_sync_time'));
		$row1=$stmt1->fetch(PDO::FETCH_ASSOC);
		$last_sync_time=$row1['value'];
		$last_rto_delivered_sync_time=$row1['value'];
		//////////////////////

		$stmt=$this->conn->conn->prepare("select awb_num,delivery_time from logistics_orders where (last_updated>? or last_sync_time>?) and channel_name=? and status=?;");
		$stmt->execute(array($last_rto_delivered_sync_time,$last_rto_delivered_sync_time,'PayTm','rto delivered'));
		$stmt_res=$stmt->fetchAll(PDO::FETCH_ASSOC);

		$shipments_array=[];

		for($i=0;$i<count($stmt_res);$i++)
		{
			$shipment_obj=[];
			$shipment_obj['tracking_number']=$stmt_res[$i]['awb_num'];
			$shipments_array[]=$shipment_obj;
		}
		return $shipments_array;
	}

	///send all pending mailer stored in the db
	private function get_rto_picked()
	{
		//getting last_sync_time
		$last_rto_picked_sync_time=0;

		$stmt1=$this->conn->conn->prepare("select name,value from user_preferences where name=?");
		$stmt1->execute(array('paytm_rto_picked_sync_time'));
		$row1=$stmt1->fetch(PDO::FETCH_ASSOC);
		$last_sync_time=$row1['value'];
		$last_rto_picked_sync_time=$row1['value'];
		//////////////////////

		$stmt=$this->conn->conn->prepare("select awb_num,delivery_time from logistics_orders where (last_updated>? or last_sync_time>?) and channel_name=? and status=?;");
		$stmt->execute(array($last_rto_picked_sync_time,$last_rto_picked_sync_time,'PayTm','rto picked'));
		$stmt_res=$stmt->fetchAll(PDO::FETCH_ASSOC);

		$shipments_array=[];

		for($i=0;$i<count($stmt_res);$i++)
		{
			$shipment_obj=[];
			$shipment_obj['tracking_number']=$stmt_res[$i]['awb_num'];
			$shipments_array[]=$shipment_obj;
		}

		return $shipments_array;
	}

	///send all pending mailer stored in the db
	private function update_delivered_time()
	{
		$stmt1=$this->conn->conn->prepare("update user_preferences set value=? where name=?");
		$stmt1->execute(array($this->new_time,'paytm_delivered_sync_time'));
	}

	///send all pending mailer stored in the db
	private function update_rto_delivered_time()
	{
		$stmt1=$this->conn->conn->prepare("update user_preferences set value=? where name=?");
		$stmt1->execute(array($this->new_time,'paytm_rto_delivered_sync_time'));
	}

	///send all pending mailer stored in the db
	private function update_rto_picked_time()
	{
		$stmt1=$this->conn->conn->prepare("update user_preferences set value=? where name=?");
		$stmt1->execute(array($this->new_time,'paytm_rto_picked_sync_time'));
	}

}

?>
