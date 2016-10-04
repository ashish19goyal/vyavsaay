<?php
		$client_id='shipper-seven-horses';
		$secret = '3ebc0cf1af9835acd61a43fcfb37ea06e4d34540';
		$username = 'rishi@sevenhorses.in';
		$password = 'sevenhorses123';
		$new_time = time()*1000;

/*
		$get_url="https://persona.paytm.com/oauth2/authorize?username=".$username."&password=".$password."&state=a1b2c3d4&submit=Secure+Sign+In&notredirect=true&client_id=".$client_id."&response_type=code&client_secret=".$secret;
		echo $get_url;		
		$ch=curl_init();
		curl_setopt($ch,CURLOPT_URL, $get_url);
		//curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);

		$result = curl_exec($ch);
		curl_close($ch);
		
//		echo $result;	
		$code_array=json_decode($result,true);
	*/	
		$code_string='{"code":"dupMYZvHQl-aKLRDJyCzGg","state":"a1b2c3d4"}';
		$code_array=json_decode($code_string, true);
		echo $code_array['code'];
?>