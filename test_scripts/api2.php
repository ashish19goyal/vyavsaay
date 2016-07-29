<?php

	// $awb_num=$_POST['awb_num'];
	$awb_num='828867';
	$data_object=[];
	$data_object['key']="shopclues26082015";
	$data_object['username']="shopclues";

	//$data_object['count']="1";
	//$data_object['start_index']="0";
	$data_object['indexes']=array(
		array("index" => "awb_num", "exact" => "788832")
	);

	$data_string="indexes=".json_encode($data_object['indexes'])."&key=".$data_object['key']."&username=".$data_object['username'];
	// $data_string = array(
    //       "key" => $data_object['key'],
    //       "username" => $data_object['username'],
    //       "data" => json_encode($data_object['indexes'])
    //     );
	//echo $data_string;
	// $url="localhost/api/get_data.php";
	$url="https://vyavsaay.com/api/logistics_orders/get";

	$headers = array('Content-Type: application/json');
	$ch=curl_init();
	curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_POST,1);
    curl_setopt($ch,CURLOPT_POSTFIELDS,$data_string);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch,CURLOPT_VERBOSE,true);
	curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,0);
	// curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
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
