<?php

$body_data = 'data={"api_key":"shopclues26082015","username":"shopclues","data_store":"logistics_orders","indexes":[{"index":"awb_num","value":"828867"}]}';
	
//$headers = array('Content-Type: application/json');

//$api_url = "../api/get_data.php";
$api_url="https://vyavsaay.com/api/get_data.php";
	

$curl = curl_init();
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
//curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $body_data);
curl_setopt($curl, CURLOPT_URL, $api_url);
curl_setopt($curl, CURLOPT_VERBOSE, 0);
curl_setopt($curl, CURLOPT_HEADER, 1);
curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
$response = curl_exec($curl);
//$response_info = curl_getinfo($curl);

header ("Content-Type:text/html");
echo $response;

?>