<?php

	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	
	$status="failed_registration";
	
	$username=$_POST['userid'];
	$email=$_POST['email'];
	$name=$_POST['name'];
	$phone=$_POST['phone'];
	
	$conn=new db_connect(0);
	
	$stmt=$conn->conn->prepare("insert into reseller_profile (username,email,name,phone,status) values(?,?,?,?,?)");
	$stmt->execute(array($username,$email,$name,$phone,'active'));	
	$id_user=$conn->conn->lastInsertId();
	
	$status="successful";
	echo $status;

?>