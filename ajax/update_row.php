<?php
/*
*	input data format:
* 			<table_name>
*				<column1>value1</column1>
*				<column2>value2</column2>
*				<column3>value3</column3>
*				<column(n)>value(n)</column(n)>
*			</table_name>
*	input activity format:
*			<activity>
*				<data_id>value1</column1>
*				<tablename>value2</column2>
*				<link_to></column3>
*				<title>value1</column1>
*				<notes>value2</column2>
*			</activity>
*/
	session_start();
	
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	
	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$up_access=$_POST['up'];
	$data_xml=$_POST['data_xml'];
	$activity_xml=$_POST['activity_xml'];
	
	$input_xml=new DOMDocument();
	$input_xml->loadXML($data_xml);
	$data_input=$input_xml->documentElement;
	
	$input_xml->loadXML($activity_xml);
	$activity_input=$input_xml->documentElement;
		
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
			
			if($activity_input->hasChildNodes())
			{
				$link_to=$activity_input->getElementsByTagName('link_to')->item(0)->nodeValue;
				$title=$activity_input->getElementsByTagName('title')->item(0)->nodeValue;
				$notes=$activity_input->getElementsByTagName('notes')->item(0)->nodeValue;
				$by=$activity_input->getElementsByTagName('updated_by')->item(0)->nodeValue;
				$act_data=array(1000*time()+rand(0,999),$title,$notes,'yes',$table,$id,$data_xml,'online',$link_to,$by,1000*time(),$act_type);
				$query3="insert into activities (id,title,notes,user_display,tablename,data_id,data_xml,status,link_to,updated_by,last_updated,type) values(?,?,?,?,?,?,?,?,?,?,?,?)";
				$stmt3=$conn->conn->prepare($query3);
				$stmt3->execute($act_data);
			}
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