<?php
/*
*	input data format:
* 			<table_name>
*				<column1>value1</column1>
*				<column2>value2</column2>
*				<column3>value3</column3>
*				<column(n)>value(n)</column(n)>
*			</table_name>
*	
*/
	session_start();
	
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	
	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$up_access=$_POST['up'];
	$data_xml=$_POST['data_xml'];
	$data_xml=preg_replace('/[^\x{0009}\x{000a}\x{000d}\x{0020}-\x{D7FF}\x{E000}-\x{FFFD}]+/u',' ',$data_xml);
	
	$input_xml=new DOMDocument();
	$input_xml->loadXML($data_xml);
	$data_input=$input_xml->documentElement;
		
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['up']==$up_access)
		{
			$db_name="re_user_".$domain;
			$conn=new db_connect($db_name);
			$data_array=array();

			$table=$data_input->nodeName;
			$id=$data_input->getElementsByTagName('id')->item(0)->nodeValue;
			
			$query2="update $table set ";
			
			foreach($data_input->childNodes as $data)
			{
				$data_array[]=$data->nodeValue;
				$query2.=$data->nodeName."=?,";
			}
			
			$query2=rtrim($query2,",");
			$query2.=" where id=?;";
			$data_array[]=$id;
			$act_type='update';

			$stmt2=$conn->conn->prepare($query2);
			$stmt2->execute($data_array);
			
			
			$act_data=array('no',$table,$id,$data_xml,'online',1000*time(),$act_type,$_SESSION['name']);
			$query3="insert into activities (user_display,tablename,data_id,data_xml,status,last_updated,type,updated_by) values(?,?,?,?,?,?,?,?)";
			$stmt3=$conn->conn->prepare($query3);
			$stmt3->execute($act_data);
			
			echo "data saved";
			
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