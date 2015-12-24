<?php 

	include('../Classes/ccavenue/Crypto.php');
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;

	error_reporting(0);
	
	$working_key='EA256A49C184883BBB18457997D673F6';
	$encResponse=$_POST["encResp"];			//This is the response sent by the CCAvenue Server
	$rcvdString=decrypt($encResponse,$workingKey);		//Crypto Decryption used as per the specified working key.
	$decryptValues=explode('&', $rcvdString);
	$dataSize=sizeof($decryptValues);
	
	echo $rcvdString;
	$response_array=[];
	
	for($i = 0; $i < $dataSize; $i++) 
	{
		$information=explode('=',$decryptValues[$i]);
		$response_array[$information[0]]=$information[1];
		echo $information[0]."=".$information[1]."<br>";
	}

	if($response_array['order_status']==="Success")
	{
		//update status in vyavsaay and user accounts
		$conn=new db_connect('re_user_vyavsaay');
		$query1="update bills set status=? where bill_num=?";
		$data_array1=array('paid',$response_array['order_id']);
		$stmt1=$conn->conn->prepare($query1);
		$stmt1->execute($data_array1);
			
		$conn2=new db_connect('re_user_'+$response_array['merchant_param1']);
		$query2="update system_billing set payment_status=? where order_id=?";
		$data_array2=array('paid',$response_array['order_id']);
		$stmt2=$conn->conn->prepare($query2);
		$stmt2->execute($data_array2);
			
		echo "Payment was successful. Please refresh you Vyavsaay screen and continue your operations.";
	}
	else if($response_array['order_status']==="Aborted")
	{
		//nothing is to be updated
		echo "The payment was aborted. Please try again.";	
	}
	else if($response_array['order_status']==="Failure")
	{
		echo "The payment was declined. Please try again.";	
	}
	else
	{
		echo "Illegal access was detected. Please try again.";
	}
?>