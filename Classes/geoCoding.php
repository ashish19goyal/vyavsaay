<?php

namespace RetailingEssentials;
include_once "../Classes/db.php";
use RetailingEssentials\db_connect;
use \PDO;

class geoCoding
{
		private $key='Fmjtd%7Cluur250a2u%2C2x%3Do5-9w7w50';
		private $location='';	
		private $details_url='';
	 	private $coordinates='';
	 	private $conn=null;
	 	
		public function __construct($username)
		{
			$this->conn=new db_connect("re_user_".$username);
			$this->read_addresses();
			$this->details_url="http://www.mapquestapi.com/geocoding/v1/batch?key=".$this->key."&".$this->location."outFormat=json";
			$this->convert();
			////string for testing
			//http://www.mapquestapi.com/geocoding/v1/batch?key=Fmjtd%7Cluur250a2u%2C2x%3Do5-9w7w50&location=haryana&location=bengal&json=&outFormat=json
		}

		private function read_addresses()
		{
			$query="select address_1 from address where status=?";
			$result=$this->conn->conn->prepare($query);
			$result->execute(array('unconfirmed'));			
			
			$this->location="";
			while($row=$result->fetch(PDO::FETCH_ASSOC))
			{
				$this->location.="location=".$row['address_1']."&";
			}
			//$this->location=rtrim($this->location,",");
			//$this->location.="}";	
		}
		
		private function convert()
		{
			$ch=curl_init();
			curl_setopt($ch, CURLOPT_URL, $this->details_url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			$response=json_decode(curl_exec($ch), true);
			
			// If Status Code is ZERO_RESULTS, OVER_QUERY_LIMIT, REQUEST_DENIED or INVALID_REQUEST
			if($response['info']['statuscode'] != 0) {
				return null;
			}
			
			$response_length=count($response['results']);
			
			for($i=0;$i<$response_length;$i++)
			{
				$query="update address set lat=?,lng=? where address_1=? and status='unconfirmed'";
				$stmt=$this->conn->conn->prepare($query);
				
				$address=$response['results'][$i]['providedLocation']['location'];
				$locations = $response['results'][$i]['locations'];
				
				for($j=0;$j<count($locations) && $j<3;$j++)
				{
					$latlng = $locations[$j]['latLng'];
					$longitude = $latlng['lng'];
					$latitude = $latlng['lat'];
					$stmt->execute(array($latitude,$longitude,$address));
				}	
			}
		}
}

	$geocoder=new geoCoding("ashish");
	echo "loaded";

?>