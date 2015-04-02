<?php

	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;

	$name=$_POST['name'];
	$contact=$_POST['contact'];
	
	$conn=new db_connect(0);

	$stmt=$conn->conn->prepare("insert into whatsapp (name,contact) values(?,?)");
	$stmt->execute(array($name,$contact));
	
?>