<?php

	$awb_num=$_POST['awb_num'];
	$awb_num_array = explode(",",$awb_num);
	$data = array(
	    array("index" => "awb_num","array" => $awb_num_array),
	  );
	  $post = json_encode(
	      array(
	        "key" => "becontent21082017",
	        "username" => "becontent",
	        "indexes" => $data,
	        "options" => array("count" => 500,"allIndexes" => "yes")
	      ));

	$api_url="https://vyavsaay.com/api/logistics_orders/get";
	$headers = array(
	            'Content-Type: application/json'
	        );
	$ch = curl_init($api_url);
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
	curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	// curl_setopt($ch,CURLOPT_VERBOSE,true);
	curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,0);
	$result = curl_exec($ch);

	if($result===false)
	{
	  	die("Curl failed");
	}
	else
	{
		header ("Content-Type:application/json");
		echo $result;
	}
?>
