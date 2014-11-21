<?php

	session_start();
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	
		$domain=$_POST['domain'];
		$username=$_POST['username'];
		$read_access=$_POST['re'];
		$product=$_POST['product'];
		$batch=$_POST['batch'];
		
		//echo $columns;
		if(isset($_SESSION['session']))
		{
			if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['re']==$read_access)
			{
				$values=array($product,$batch);
				$query1="select sum(quantity) from bill_items where item_name=? and batch=?";
				$query2="select sum(quantity) from supplier_bill_items where product_name=? and batch=?";
				$query3="select sum(quantity) from customer_return_items where item_name=? and batch=?";
				$query4="select sum(quantity) from supplier_return_items where item_name=? and batch=?";
				$query5="select sum(quantity) from customer_return_items where item_name=? and exchange_batch=?";
				$query6="select sum(quantity) from inventory_adjust where product_name=? and batch=?";
				
				$db_name="re_user_".$domain;
				
				$conn=new db_connect($db_name);
				
				$stmt1=$conn->conn->prepare($query1);
				$stmt1->execute($values);
				$res1=$stmt1->fetch(PDO::FETCH_NUM);
				$bill_items=$res1[0];
				
				$stmt2=$conn->conn->prepare($query2);
				$stmt2->execute($values);
				$res2=$stmt2->fetch(PDO::FETCH_NUM);
				$supplier_bill_items=$res2[0];
				
				$stmt3=$conn->conn->prepare($query3);
				$stmt3->execute($values);
				$res3=$stmt3->fetch(PDO::FETCH_NUM);
				$customer_return_items=$res3[0];
				
				$stmt4=$conn->conn->prepare($query4);
				$stmt4->execute($values);
				$res4=$stmt4->fetch(PDO::FETCH_NUM);
				$supplier_return_items=$res4[0];
				
				$stmt5=$conn->conn->prepare($query5);
				$stmt5->execute($values);
				$res5=$stmt5->fetch(PDO::FETCH_NUM);
				$customer_exchange_items=$res5[0];
				
				$stmt6=$conn->conn->prepare($query6);
				$stmt6->execute($values);
				$res6=$stmt6->fetch(PDO::FETCH_NUM);
				$inventory_adjust=$res6[0];
				
				$response=$supplier_bill_items+$customer_return_items+$inventory_adjust-$bill_items-$supplier_return_items-$customer_exchange_items;
				
				echo $response;
			}
			else
			{
				echo "Invalid session";
			}
		}
		else
		{
			echo "Invalid session";
		}

?>