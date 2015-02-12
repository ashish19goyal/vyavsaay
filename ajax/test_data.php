<?php 

namespace RetailingEssentials;
include_once "../Classes/db.php";
use RetailingEssentials\db_connect;

	$conn=new db_connect("re_user_ashish");
	$table_name="bill_items";
				
	for($i=1000000; $i<1100000;$i++)
	{
		$data_array=Array();
		$q_string="insert into $table_name (id,quantity,unit_price,amount,total,discount,offer,type,bill_id,product_name,batch,tax,free_with,last_updated) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
		$data_array[]=$i;
		$data_array[]=$i+2;
		$data_array[]=$i+3;
		$data_array[]=$i+4;
		$data_array[]=$i+5;
		$data_array[]=$i+6;
		$data_array[]="testing capacity";
		$data_array[]='product';
		$data_array[]=$i+8;
		$data_array[]='any product';
		$data_array[]='any batch';
		$data_array[]=$i+9;
		$data_array[]='everything';
		$data_array[]=$i+10;
				
		$stmt=$conn->conn->prepare($q_string);
		$stmt->execute($data_array);
	}
	
	echo "all data inserted";
?>