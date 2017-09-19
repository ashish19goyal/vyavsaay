<?php

	include_once "../Classes/vDB.php";
	include_once "../Classes/emailSES.php";
	use RetailingEssentials\emailSES;
	use RetailingEssentials\vDB;

	$blockEmail=$_POST['userEmail'];

	$response_object = array();
	try
	{
		$conn=new vDB(0);
		$stmt1=$conn->conn->prepare("insert into from staff,accounts where accounts.username=? and staff.acc_name=accounts.acc_name and staff.email=? union select count(*) from customers,accounts where accounts.username=? and customers.acc_name=accounts.acc_name and customers.email=? union select count(*) from suppliers,accounts where accounts.username=? and suppliers.acc_name=accounts.acc_name  and suppliers.email=?");
		$stmt1->execute(array($username,$userEmail,$username,$userEmail,$username,$userEmail));
		$unique=$stmt1->fetchAll(PDO::FETCH_NUM)[0][0];
		$response_object['status']='success';
	}
	catch(PDOException $ex)
	{
		$response_object['status']='error';
		$response_object['description']=$ex;
	}

	$jsonresponse=json_encode($response_object);
	header ("Content-Type:application/json");
	echo $jsonresponse;
?>
