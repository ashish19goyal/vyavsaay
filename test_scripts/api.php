<?php

	$awb_num=$_POST['awb_num'];
	$data_object=[];
	$data_object['api_key']="12345";
	$data_object['username']="vyavsaay";
	$data_object['data_store']="logistics_orders";
	$data_object['count']="1";
	$data_object['start_index']="0";
	$data_object['indexes']=[];
	$data_object['indexes'][0]=[];
	$data_object['indexes'][0]['index']='awb_num';
	$data_object['indexes'][0]['value']=$awb_num;
	$data_object['indexes'][0]['exact']='yes';
		
    $data_string="data=".json_encode($data_object);
	
	$url="localhost/api/get_data.php";
	//$url="https://vyavsaay.com/api/get_data.php";

	$ch=curl_init();
	curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_POST,1);
    curl_setopt($ch,CURLOPT_POSTFIELDS,$data_string);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch,CURLOPT_VERBOSE,true);
	curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,0);
	//$verbose = fopen('php://temp', 'w+');
	//curl_setopt($ch, CURLOPT_STDERR, $verbose);
	$result = curl_exec($ch);
	curl_close($ch);
	
	if($result===false) 
	{
	  	die("Curl failed");
	}
	else 
	{
		header ("Content-Type:application/json");
		echo $result;
	}

	//rewind($verbose);
	//$verboseLog = stream_get_contents($verbose);

	//echo "Verbose information:\n<pre>", htmlspecialchars($verboseLog), "</pre>\n";	

	//header ("Content-Type:text/plain");
	//echo "<HTML><BODY>".$result."</BODY></HTML>";
?>