<?php

	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;

	$domain=$_POST['domain'];
	$name=$_POST['name'];
	$phone=$_POST['phone'];
	$company=$_POST['company'];
	$email=$_POST['email'];
	$address=$_POST['address'];
	$city=$_POST['city'];
	$requirement=$_POST['requirement'];
	
	$db_name="re_user_".$domain;
	$conn=new db_connect($db_name);

	$acc_name=$name." (".$phone.")";
	$due_time=1000*(time()+3*86400);
	$sl_query="insert into sale_leads (customer,detail,due_date,last_updated) values(?,?,?,?);";
	$c_query="insert into customers (name,phone,email,acc_name,status,address,city,last_updated) values(?,?,?,?,?,?,?,?);";
	$sl_stmt=$conn->conn->prepare($sl_query);
	$c_stmt=$conn->conn->prepare($c_query);
	
	$c_stmt->execute(array($name,$phone,$email,$acc_name,'active',$address,$city,(1000*time())));
	$sl_stmt->execute(array($acc_name,$requirement,$due_time,(1000*time())));
					
	echo "contact saved";

?>