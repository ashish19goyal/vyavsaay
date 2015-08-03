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
	$cs_query="select acc_name from customers where acc_name=?";
	$c_query="insert into customers (name,phone,email,acc_name,status,address,city,last_updated) values(?,?,?,?,?,?,?,?);";
	$ca_query="insert into attributes (name,type,attribute,value,last_updated) values(?,?,?,?,?);";
	
	$cs_stmt=$conn->conn->prepare($cs_query);
	
	$cs_result=$cs_stmt->execute(array($acc_name));
	$struct_res=$cs_stmt->fetchAll(PDO::FETCH_NUM);
	if(count($struct_res)==0)
	{		
		$c_stmt=$conn->conn->prepare($c_query);
		$c_stmt->execute(array($name,$phone,$email,$acc_name,'active',$address,$city,(1000*time())));
		$ca_stmt=$conn->conn->prepare($ca_query);
		$ca_stmt->execute(array($acc_name,'customer','Company',$company,(1000*time())));
	}	

	$sl_stmt=$conn->conn->prepare($sl_query);
	$sl_stmt->execute(array($acc_name,$requirement,$due_time,(1000*time())));
					
	echo "contact saved";
?>