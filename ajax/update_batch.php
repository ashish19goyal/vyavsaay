<?php
/*
*	input data format:
* 			<table_name>
*				<row>
	*				<column1>value1</column1>
	*				<column2>value2</column2>
	*				<column3>value3</column3>
	*				<column(n)>value(n)</column(n)>
*				<row>
*				<row>
	*				<column1>value1</column1>
	*				<column2>value2</column2>
	*				<column3>value3</column3>
	*				<column(n)>value(n)</column(n)>
*				<row>
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
			$table=$data_input->nodeName;
			
			$update_query="update $table set ";
			
			foreach($data_input->childNodes->item(0)->childNodes as $data)
			{
				$update_query.=$data->nodeName."=?,";
			}
			$update_query=rtrim($update_query,",");
			$update_query.=" where id=?;";
			//echo $update_query;
			$update_stmt=$conn->conn->prepare($update_query);
			
			foreach($data_input->childNodes as $row)
			{
				$data_array=array();
				$id=$row->getElementsByTagName('id')->item(0)->nodeValue;
				
				foreach($row->childNodes as $data)
				{
					$data_array[]=$data->nodeValue;
				}
				
				$data_array[]=$id;
				$update_stmt->execute($data_array);
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