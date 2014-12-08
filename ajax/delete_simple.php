<?php
/*
 *	input data format:
* 			<table_name>
*				<column1>value1</column1>
*				<column2>value2</column2>
*				<column3>value3</column3>
*				<column(n)>value(n)</column(n)>
*			</table_name>
*/

	session_start();
	
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	
	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$del_access=$_POST['del'];
	$data_xml=$_POST['data_xml'];
	
	$input_xml=new DOMDocument();
	$input_xml->loadXML($data_xml);
	$data_input=$input_xml->documentElement;
	
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['del']==$del_access)
		{
			$db_name="re_user_".$domain;
			$conn=new db_connect($db_name);
			$data_array=array();

			$table=$data_input->nodeName;
			
			$query1="select id from $table where";
			$query="delete from $table where";
			
			foreach($data_input->childNodes as $col)
			{
				if($col->nodeValue!="")
				{
					$query1.=" ".$col->nodeName."=? and";
					$query.=" ".$col->nodeName."=? and";
					$data_array[]=$col->nodeValue;
				}
			}
			$query1=rtrim($query1,'and');
			$query=rtrim($query,'and');
			
			if(count($data_array)!=0)
			{
				$stmt1=$conn->conn->prepare($query1);
				$stmt1->execute($data_array);
				$data_ids=$stmt1->fetchAll(PDO::FETCH_ASSOC);
				
				$stmt2=$conn->conn->prepare($query);
				$stmt2->execute($data_array);

				foreach($data_ids as $id)
				{
					$act_data=array(1000*time()+rand(0,999),'no',$table,$id['id'],$data_xml,'online',1000*time(),'delete');
					$query3="insert into activities (id,user_display,tablename,data_id,data_xml,status,last_updated,type) values(?,?,?,?,?,?,?,?)";
					$stmt3=$conn->conn->prepare($query3);
					
					$stmt3->execute($act_data);	
				}
				echo "data deleted";
			}
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