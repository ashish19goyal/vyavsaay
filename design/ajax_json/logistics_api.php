<?php
/*
 * output data format: 
 *	{
 		status:"success/invalid session",
 		data:
 		{
 			delivered:'success/fail',
 			rto delivered:'success/fail',
 			rto picked:'success/fail',
 			token:'fail',
 			code:'fail'
 		}
 	}
*/
	session_start();
	
	include_once "../Classes/paytm_api.php";
	use RetailingEssentials\paytm_api;

	$domain=$_POST['domain'];
	$re_access=$_POST['re'];
	$username=$_POST['username'];
	
	$jsonresponse=[];			
	$new_time=time()*1000;
			
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['re']==$re_access)
		{
			$paytm_api=new paytm_api($domain);
			$result=$paytm_api->sync_api();

			$jsonresponse['status']='success';
			$jsonresponse['data']=$result;
		}
		else
		{
			$jsonresponse['status']="Invalid session";
		}
	}
	else
	{
		$jsonresponse['status']="Invalid session";
	}
	
	$jsonresponse_string=json_encode($jsonresponse);			
	header("Content-Type:application/json");
	echo $jsonresponse_string;

?>