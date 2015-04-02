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
	$cr_access=$_POST['cr'];
	$data_xml=$_POST['data_xml'];
	$data_xml=preg_replace('/[^\x{0009}\x{000a}\x{000d}\x{0020}-\x{D7FF}\x{E000}-\x{FFFD}]+/u',' ',$data_xml);
	$input_xml=new DOMDocument();
	$input_xml->loadXML($data_xml);
	$data_input=$input_xml->documentElement;
		
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['cr']==$cr_access)
		{
			if($data_input->hasChildNodes())
			{
				$db_name="re_user_".$domain;
				$conn=new db_connect($db_name);
				$table=$data_input->nodeName;
				
				$select_query="select count(*) from $table where ";
			
				foreach($data_input->childNodes->item(0)->childNodes as $data)
				{
					if($data->hasAttribute('unique'))
					{
						$select_query.=$data->nodeName."= ? and ";
					}
				}
			
				$select_query=rtrim($select_query,"and ");
				$select_query=rtrim($select_query,"where ");
					
				$select_stmt=$conn->conn->prepare($select_query);
							
			
				$insert_query="insert into $table(";
				foreach($data_input->childNodes->item(0)->childNodes as $data)
				{
					$insert_query.=$data->nodeName.",";
				}
				$insert_query=rtrim($insert_query,",");
				$insert_query.=") values(";
				foreach($data_input->childNodes->item(0)->childNodes as $data)
				{
					$insert_query.="?,";
				}
					
				$insert_query=rtrim($insert_query,",");
				$insert_query.=");";
				$insert_stmt=$conn->conn->prepare($insert_query);
			
				foreach($data_input->childNodes as $row)
				{
					$id=$row->getElementsByTagName('id')->item(0)->nodeValue;
					$data_array=array();
					
					$unique=0;
					$unique_column_value=array();
					foreach($row->childNodes as $data)
					{
						if($data->hasAttribute('unique'))
						{	
							$unique_column_value[]=$data->nodeValue;
						}
					}
					if(count($unique_column_value)>0)
					{
						$select_stmt->execute($unique_column_value);
						$unique=$select_stmt->fetchAll(PDO::FETCH_NUM)[0][0];	
					}
						
					if($unique===0 || $unique=="0")
					{		
						foreach($row->childNodes as $data)
						{
							$data_array[]=$data->nodeValue;
						}
						try {
							$insert_stmt->execute($data_array);
						}catch(PDOException $e)
						{
							echo $e;
							foreach ($data_array as $data_key => $data_array_value)
							{	
								echo $data_key."=".$data_array_value."\n";
							}
						}
					}
				}
				echo "data saved";
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