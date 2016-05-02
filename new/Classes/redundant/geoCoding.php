<?php

	namespace RetailingEssentials;
	include_once '../Classes/db.php';
    include_once '../Classes/file_reader.php';

	use RetailingEssentials\db_connect;
	use \PDO;
	
	class geoCoding
	{		
		private $key='';
		private $location='';	
		private $details_url='';
	 	private $coordinates='';
	 	private $conn=null;
	 	private $table='';
	 	private $results=array();
	 	
		public function __construct($username,$type)
		{
            $fr=new file_reader($_SERVER['DOCUMENT_ROOT']."/../Config/config.prop");
            $this->key=$fr->attributes["geoCodingKey"];

			$this->conn=new db_connect("re_user_".$username);
			$this->table=$type;
			$this->read_addresses();
			$this->write_addresses();
			////string for testing
			//http://www.mapquestapi.com/geocoding/v1/address?key=Fmjtd%7Cluur250a2u%2C2x%3Do5-9w7w50&street=&city=sirsa&state=haryana&postalCode=125055&country=india&inFormat=kvp&outFormat=json&maxResults=1
		}

		private function read_addresses()
		{
			$query="select id,name,address,city,pincode,state,country from ".$this->table." where address_status=? limit 0,50";
			$result=$this->conn->conn->prepare($query);
			$result->execute(array('pending analysis'));		
			
			$this->location="";
			while($row=$result->fetch(PDO::FETCH_ASSOC))
			{
				$address=urlencode($row['address']);
				$city=urlencode($row['city']);
				$pincode=urlencode($row['pincode']);
				$state=urlencode($row['state']);
				$country=urlencode($row['country']);
				$location="street=".$address."&city=".$city."&state=".$state."&postalCode=".$pincode."&country=".$country;
				$this->details_url="http://www.mapquestapi.com/geocoding/v1/address?key=".$this->key."&".$location."&inFormat=kvp&outFormat=json&maxResults=1";
				$this->convert();
				//echo 'converting for'.$row['name'];
				sleep(1);
			}
		}
		
		private function convert()
		{
			$ch=curl_init();
			curl_setopt($ch, CURLOPT_URL, $this->details_url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			$response=json_decode(curl_exec($ch), true);
			
			// If Status Code is ZERO_RESULTS, OVER_QUERY_LIMIT, REQUEST_DENIED or INVALID_REQUEST
			if($response['info']['statuscode'] != 0)
			{
				return null;
			}
			$this->results[]=$response['results'][0];
		}

		private function write_addresses()
		{
			$response_length=count($this->results);
			
			for($i=0;$i<$response_length;$i++)
			{
				$query="update ".$this->table." set lat=?,lng=?,address_status=? where address=? and city=? and pincode=? and state=? and country=? and address_status=?";
				$stmt=$this->conn->conn->prepare($query);
				
				$address_string=$this->results[$i]['providedLocation'];

				$address=$address_string['street'];
				$city=$address_string['city'];
				$pincode=$address_string['postalCode'];
				$state=$address_string['state'];
				$country=$address_string['country'];
				
				$locations = $this->results[$i]['locations'];
				
				$latlng = $locations[0]['latLng'];
				$longitude = $latlng['lng'];
				$latitude = $latlng['lat'];
				$stmt->execute(array($latitude,$longitude,'unconfirmed',$address,$city,$pincode,$state,$country,'pending analysis'));
			}
		}
	}

?>