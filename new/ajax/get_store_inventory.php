<?php

	session_start();
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	
		$domain=$_POST['domain'];
		$username=$_POST['username'];
		$read_access=$_POST['re'];
		$product=$_POST['product'];
		$batch=$_POST['batch'];
		$store=$_POST['store'];
		
		//echo $columns;
		if(isset($_SESSION['session']))
		{
			if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['re']==$read_access)
			{
				$values=array($product,$batch,$store);
				$query1_values=array($product,$batch,$store,'yes');
				$query6_values=array($product,$batch,$store,'received','dispatched');
				$query61_values=array($product,$batch,$store,'received');
				$query1="select sum(quantity) from bill_items where item_name=? and batch=? and storage=? and (hired <> ? or hired is null)";
				$query2="select sum(quantity) from supplier_bill_items where product_name=? and batch=? and storage=?";
				$query3="select sum(quantity) from customer_return_items where item_name=? and batch=? and storage=?";
				$query4="select sum(quantity) from supplier_return_items where item_name=? and batch=? and storage=?";
				$query5="select sum(quantity) from customer_return_items where item_name=? and exchange_batch=? and storage=?";
				$query6="select sum(quantity) from store_movement where item_name=? and batch=? and source=? and (status=? or status=?)";
				$query61="select sum(quantity) from store_movement where item_name=? and batch=? and target=? and status=?";
				$query7="select sum(quantity) from discarded where product_name=? and batch=? and storage=?";
				$query8="select sum(quantity) from unbilled_sale_items where item_name=? and batch=? and storage=?";
				$query9="select sum(quantity) from unbilled_purchase_items where item_name=? and batch=? and storage=?";
				$query10="select sum(quantity) from inventory_adjust where product_name=? and batch=? and storage=?";
				
				if($batch=="")
				{
					$values=array($product,$store);
					$query1_values=array($product,$store,'yes');
					$query6_values=array($product,$store,'received','dispatched');
					$query61_values=array($product,$store,'received');
					$query1="select sum(quantity) from bill_items where item_name=? and storage=? and (hired <> ? or hired is null)";
					$query2="select sum(quantity) from supplier_bill_items where product_name=? and storage=?";
					$query3="select sum(quantity) from customer_return_items where item_name=? and type=? and storage=?";
					$query4="select sum(quantity) from supplier_return_items where item_name=? and storage=?";
					//$query5="select sum(quantity) from customer_return_items where item_name=? and type=?";
					$query6="select sum(quantity) from store_movement where item_name=? and source=? and (status=? or status=?)";
					$query61="select sum(quantity) from store_movement where item_name=? and target=? and status=?";
					$query7="select sum(quantity) from discarded where product_name=? and storage=?";
					$query8="select sum(quantity) from unbilled_sale_items where item_name=? and storage=?";
					$query9="select sum(quantity) from unbilled_purchase_items where item_name=? and storage=?";
					$query10="select sum(quantity) from inventory_adjust where product_name=? and storage=?";
				}
				
				$db_name="re_user_".$domain;
				
				$conn=new db_connect($db_name);
				
				$stmt1=$conn->conn->prepare($query1);
				$stmt1->execute($query1_values);
				$res1=$stmt1->fetch(PDO::FETCH_NUM);
				$bill_items=$res1[0];
				
				$stmt2=$conn->conn->prepare($query2);
				$stmt2->execute($values);
				$res2=$stmt2->fetch(PDO::FETCH_NUM);
				$supplier_bill_items=$res2[0];

				$customer_return_items=0;
				if($batch=="")
				{
					$stmt3=$conn->conn->prepare($query3);
					$stmt3->execute(array($product,$store,'refund'));
					$res3=$stmt3->fetch(PDO::FETCH_NUM);
					$customer_return_items=$res3[0];
				}
				else
				{
					$stmt3=$conn->conn->prepare($query3);
					$stmt3->execute($values);
					$res3=$stmt3->fetch(PDO::FETCH_NUM);
					$customer_return_items=$res3[0];
				}
				
				$stmt4=$conn->conn->prepare($query4);
				$stmt4->execute($values);
				$res4=$stmt4->fetch(PDO::FETCH_NUM);
				$supplier_return_items=$res4[0];

				$customer_exchange_items=0;
				if($batch!="")
				{
					$stmt5=$conn->conn->prepare($query5);
					$stmt5->execute($values);
					$res5=$stmt5->fetch(PDO::FETCH_NUM);
					$customer_exchange_items=$res5[0];
				}
				
				$stmt6=$conn->conn->prepare($query6);
				$stmt6->execute($query6_values);
				$res6=$stmt6->fetch(PDO::FETCH_NUM);
				$store_source=$res6[0];
				
				$stmt61=$conn->conn->prepare($query61);
				$stmt61->execute($query61_values);
				$res61=$stmt61->fetch(PDO::FETCH_NUM);
				$store_target=$res61[0];
				
				$stmt7=$conn->conn->prepare($query7);
				$stmt7->execute($values);
				$res7=$stmt7->fetch(PDO::FETCH_NUM);
				$discarded=$res7[0];
				
				$stmt8=$conn->conn->prepare($query8);
				$stmt8->execute($values);
				$res8=$stmt8->fetch(PDO::FETCH_NUM);
				$ub_sale=$res8[0];
				
				$stmt9=$conn->conn->prepare($query9);
				$stmt9->execute($values);
				$res9=$stmt9->fetch(PDO::FETCH_NUM);
				$ub_purchase=$res9[0];
				
				$stmt10=$conn->conn->prepare($query10);
				$stmt10->execute($values);
				$res10=$stmt10->fetch(PDO::FETCH_NUM);
				$inventory_adjust=$res10[0];
				
				$response=$inventory_adjust+$supplier_bill_items+$customer_return_items+$store_target-$store_source-$bill_items-$supplier_return_items-$customer_exchange_items-$discarded-$ub_sale+$ub_purchase;
				
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