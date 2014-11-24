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
			$this->details_url="http://www.mapquestapi.com/geocoding/v1/batch?key=".$this->key."&".$this->location."outFormat=json&maxResults=1";
			$this->convert();
			////string for testing
			//http://www.mapquestapi.com/geocoding/v1/batch?key=Fmjtd%7Cluur250a2u%2C2x%3Do5-9w7w50&location=haryana&location=bengal&json=&outFormat=json&maxResults=1
		}

		private function read_addresses()
		{
			$query="select id,address,street,city,state,country from customers where address_status=?";
			$result=$this->conn->conn->prepare($query);
			$result->execute(array('pending analysis'));		
			
			$this->location="";
			while($row=$result->fetch(PDO::FETCH_ASSOC))
			{
				$address_string=str_replace(",","  ",$row['address']).",".$row['street'].",".$row['city'].",".$row['state'].",".$row['country'];
				$address_string=urlencode($address_string);
				$this->location.="location=".$address_string."&";
			}
			//echo $this->location;
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
				$query="update customers set lat=?,lng=?,address_status=? where address=? and street=? and city=? and state=? and country=? and address_status=?";
				$stmt=$this->conn->conn->prepare($query);
				
				$address_string=$response['results'][$i]['providedLocation']['location'];
				//echo "\n".$address_string;
				$address_string=explode(',',$address_string);
				$address=str_replace("  ",",",$address_string[0]);
				$street=$address_string[1];
				$city=$address_string[2];
				$state=$address_string[3];
				$country=$address_string[4];
				
				$locations = $response['results'][$i]['locations'];
				
				$latlng = $locations[0]['latLng'];
				$longitude = $latlng['lng'];
				$latitude = $latlng['lat'];
				$stmt->execute(array($latitude,$longitude,'unconfirmed',$address,$street,$city,$state,$country,'pending analysis'));
			}
		}
	}

?>