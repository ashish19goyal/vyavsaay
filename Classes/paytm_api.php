<?php

namespace RetailingEssentials;
include_once "../Classes/db.php";
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
		$this->client_id='shipper-seven-horses';
		$this->secret = '3ebc0cf1af9835acd61a43fcfb37ea06e4d34540';
		$this->username = 'rishi@sevenhorses.in';
		$this->password = 'sevenhorses123';
		$this->domain = $domain;
		$this->conn=new db_connect("re_user_".$this->domain);
		$this->new_time = time()*1000;
	}

	public function sync_api()
	{
		$code_string=$this->generate_code();
		$code_array=json_decode($code_string,true);

		if(isset($code_array['code']))
		{		
			$code=$code_array['code'];
			//echo $code."line37";
			$token_string=$this->get_token($code);
			//echo $token_string."line39";
			$token_array=json_decode($token_string,true);
			
			if(isset($token_array['access_token']))
			{
				$token=$token_array['access_token'];
				//echo $token;				
				$shipments_array=$this->get_delivered();
				if(count($shipments_array)>0)
				{
					$delivered_string=$this->update_delivered_status($token,$shipments_array);
					echo $delivered_string;					
					if($delivered_string=='{200,"Updated Successfully"}' || $delivered_string=='{200, "Updated Successfully"}')
					{
						$this->update_delivered_time();
						return true;
					}
					else 
					{
						return false;
					}
				}
				else
				{
					$this->update_delivered_time();
					return true;
				}
			}
			else
			{
				return false;
			}
		}
		else 
		{
			return false;
		}
	}
	
	private function update_delivered_status($token,$shipments_array)
	{
		$get_url="http://track.paytm.com/v2/shipper/track/shipment/update?token=".$token;
		$ch=curl_init();
		curl_setopt($ch,CURLOPT_URL, $get_url);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		$shipments_string=json_encode($shipments_array);
		$body = array(
            "status_code:DL",
            "status_description:SHIPMENT DELIVERED",
            "shipments:$shipments_string",
        );
		curl_setopt($ch,CURLOPT_POST, count($body));
        curl_setopt($ch, CURLOPT_POSTFIELDS,$body);

		$headers = array(
            "Content-type: application/x-www-form-urlencoded"
        );
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
				
		$result = curl_exec($ch);
		//echo $result;
		curl_close($ch);
		return $result;
	}
	
	private function update_rto_delivered_status($token,$shipments_array)
	{
		$get_url="http://track.paytm.com/v2/shipper/track/shipment/update?token=".$token;
		$ch=curl_init();
		curl_setopt($ch,CURLOPT_URL, $get_url);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		
		$body = array(
            "status_code:RT",
            "status_description:RETURNED DELIVERED",
            "shipments:$shipments_array",
        );
        curl_setopt($ch,CURLOPT_POST, count($body));
        curl_setopt($ch, CURLOPT_POSTFIELDS,$body);

		$headers = array(
            "Content-type: application/x-www-form-urlencoded"
        );
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
				
		$result = curl_exec($ch);
		//echo $result;curl_close($ch);
		return $result;		
	}

	private function update_rto_picked_status($token,$shipments_array)
	{
		$get_url="http://track.paytm.com/v2/shipper/track/shipment/update?token=".$token;
		$ch=curl_init();
		curl_setopt($ch,CURLOPT_URL, $get_url);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		
		$body = array(
            "status_code:RP",
            "status_description:RETURN PICKED",
            "shipments:$shipments_array",
        );
        curl_setopt($ch,CURLOPT_POST, count($body));
        curl_setopt($ch, CURLOPT_POSTFIELDS,$body);

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
		//echo $result;
		return $result;
	}

	///send all pending mailer stored in the db
	private function get_delivered()
	{
		//getting last_sync_time			
		$last_delivered_sync_time=0;
		$last_rto_delivered_sync_time=0;
		$last_rto_picked_sync_time=0;
		
		$stmt1=$this->conn->conn->prepare("select name,value from user_preferences where name=?");
		$stmt1->execute(array('paytm_delivered_sync_time'));
		$row1=$stmt1->fetch(PDO::FETCH_ASSOC);
		$last_sync_time=$row1['value'];	
		$last_delivered_sync_time=$row1['value'];
		//////////////////////
		
		$stmt=$this->conn->conn->prepare("select awb_num,delivery_time from logistics_orders where last_updated>? or last_sync_time>? and channel_name=? and status=?;");
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