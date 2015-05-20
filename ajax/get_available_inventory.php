<?php
/*	input data format: 
 * 			<table_name type='add/sub'>
 *				<column1>value1</column1>
 *				<column2>value2</column2>
 *				<column3></column3>
 *				<column(n)>value(n)</column(n)>
 *			</table_name>
*/

	session_start();
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	
		$domain=$_POST['domain'];
		$username=$_POST['username'];
		$read_access=$_POST['re'];
		$product=$_POST['product'];
		$batch=$_POST['batch'];
		$columns=$_POST['data_array'];
		$input_xml=new DOMDocument();
		$input_xml->loadXML($columns);
		$input=$input_xml->documentElement;
		
		//echo $columns;
		if(isset($_SESSION['session']))
		{
			if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['re']==$read_access)
			{
				$table=$input->nodeName;
				$columns_array=array();
				$values_array=array();
				$query="select sum(quantity) from $table where ";
				
				$add_sub_type='';
				if($input->hasAttribute('type'))
				{
					$add_sub_type=$input->getAttribute('type');
				}

				foreach($input->childNodes as $col)
				{
					$columns_array[]=$col->nodeName;
					
					if($col->nodeValue!="")
					{
						if($col->hasAttribute('upperbound'))
						{
							$query.=$col->nodeName." <= ? and ";
							$values_array[]=$col->nodeValue;
						}
						
						if($col->hasAttribute('lowerbound'))
						{
							$query.=$col->nodeName." >= ? and ";
							$values_array[]=$col->nodeValue;
						}
						
						if($col->hasAttribute('array'))
						{
							$query.=$col->nodeName." in (";
							$string=rtrim($col->nodeValue,"-");
							$exploded_values=explode("--",$string);
							foreach($exploded_values as $value)
							{
								$query.="?,";
								$values_array[]=$value;
							}
							$query=rtrim($query,",");
							$query.=") and ";
						}
						else if(!($col->hasAttributes()))
						{
							if($col->nodeName=='id')
							{
								$query.=$col->nodeName." = ? and ";
								$values_array[]=$col->nodeValue;
							}
							else 
							{	
								$query.=$col->nodeName." like ? and ";
								$values_array[]="%".$col->nodeValue."%";
							}
						}
					}
					if($col->hasAttribute('exact'))
					{
						$query.=$col->nodeName." = ? and ";
						$values_array[]=$col->nodeValue;
					}
				}
				$query=rtrim($query,"and ");
				
				if(count($values_array)===0)
				{
					$query="select sum(quantity) from $table";
				}
				
				
				//////////////////////////////////////////////////
				$values=array($product,$batch);
				$query1_values=array($product,$batch,'yes');
				$query1="select sum(quantity) from bill_items where item_name=? and batch=? and hired!=?";
				$query2="select sum(quantity) from supplier_bill_items where product_name=? and batch=?";
				$query3="select sum(quantity) from customer_return_items where item_name=? and batch=?";
				$query4="select sum(quantity) from supplier_return_items where item_name=? and batch=?";
				$query5="select sum(quantity) from customer_return_items where item_name=? and exchange_batch=?";
				$query6="select sum(quantity) from inventory_adjust where product_name=? and batch=?";
				$query7="select sum(quantity) from discarded where product_name=? and batch=?";
				$query8="select sum(quantity) from unbilled_sale_items where item_name=? and batch=?";
				$query9="select sum(quantity) from unbilled_purchase_items where item_name=? and batch=?";
				
				if($batch=="")
				{
					$values=array($product);
					$query1_values=array($product,'yes');
					$query1="select sum(quantity) from bill_items where item_name=? and hired!=?";
					$query2="select sum(quantity) from supplier_bill_items where product_name=?";
					$query3="select sum(quantity) from customer_return_items where item_name=? and type=?";
					$query4="select sum(quantity) from supplier_return_items where item_name=?";
					//$query5="select sum(quantity) from customer_return_items where item_name=? and type=?";
					$query6="select sum(quantity) from inventory_adjust where product_name=?";
					$query7="select sum(quantity) from discarded where product_name=?";
					$query8="select sum(quantity) from unbilled_sale_items where item_name=?";
					$query9="select sum(quantity) from unbilled_purchase_items where item_name=?";
				}
				
				$db_name="re_user_".$domain;
				$conn=new db_connect($db_name);
				
				$stmt=$conn->conn->prepare($query);
				$stmt->execute($values_array);
				$res=$stmt->fetch(PDO::FETCH_NUM);
				$custom_items=$res[0];				
				if($add_sub_type=='sub')
					$custom_items=-$custom_items;			
				
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
					$stmt3->execute(array($product,'refund'));
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
				$stmt6->execute($values);
				$res6=$stmt6->fetch(PDO::FETCH_NUM);
				$inventory_adjust=$res6[0];
				
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
				
				$response=$custom_items+$supplier_bill_items+$customer_return_items+$inventory_adjust-$bill_items-$supplier_return_items-$customer_exchange_items-$discarded-$ub_sale+$ub_purchase;
				
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