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
	$cr_access=$_POST['cr'];
	$data_xml=$_POST['data_xml'];
	
	$input_xml=new DOMDocument();
	$input_xml->loadXML($data_xml);
	$data_input=$input_xml->documentElement;
		
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['cr']==$cr_access && $_SESSION['up']==$up_access)
		{
			$db_name="re_user_".$domain;
			$conn=new db_connect($db_name);
			$data_array=array();

			$table=$data_input->nodeName;
			$id=$data_input->getElementsByTagName('id')->item(0)->nodeValue;
			$query1="select count(*) from $table where id=?";
			$stmt1=$conn->conn->prepare($query1);
			$stmt1->execute(array($id));
			$count=$stmt1->fetchAll(PDO::FETCH_NUM)[0][0];			
			$query2="";
			$act_type="";
			
			$unique=0;
			$unique_column_value=array();
			$query4="select count(*) from $table where ";
			foreach($data_input->childNodes as $data)
			{
				if($data->hasAttribute('unique'))
				{	
					$query4.=$data->nodeName."= ? and ";
					$unique_column_value[]=$data->nodeValue;
				}
			}
			$query4=rtrim($query4,"and ");
			if(count($unique_column_value)>0)
			{
				$stmt4=$conn->conn->prepare($query4);
				$stmt4->execute($unique_column_value);
				$unique=$stmt4->fetchAll(PDO::FETCH_NUM)[0][0];	
			}
				
			if(($count===0 || $count=="0") && ($unique===0 || $unique=="0"))
			{
								
				$query2.="insert into $table(";
				
				foreach($data_input->childNodes as $data)
				{
					$data_array[]=$data->nodeValue;
					$query2.=$data->nodeName.",";	
				}
		
				$query2=rtrim($query2,",");
				$query2.=") values(";
					
				foreach($data_input->childNodes as $data)
				{
					$query2.="?,";
				}
				
				$query2=rtrim($query2,",");
				$query2.=");";
				$act_type='create';
				$stmt2=$conn->conn->prepare($query2);
				$stmt2->execute($data_array);
				
				
				$act_data=array(1000*time()+rand(0,999),'no',$table,$id,$data_xml,'online',1000*time(),$act_type);
				$query3="insert into activities (id,user_display,tablename,data_id,data_xml,status,last_updated,type) values(?,?,?,?,?,?,?,?)";
				$stmt3=$conn->conn->prepare($query3);
				$stmt3->execute($act_data);
				
				echo "data saved";
			}
			else if(($count!=0 && $count!="0"))
			{
				$query2.="update $table set ";
				
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
				
				
				$act_data=array(1000*time()+rand(0,999),'no',$table,$id,$data_xml,'online',1000*time(),$act_type);
				$query3="insert into activities (id,user_display,tablename,data_id,data_xml,status,last_updated,type) values(?,?,?,?,?,?,?,?)";
				$stmt3=$conn->conn->prepare($query3);
				$stmt3->execute($act_data);
				
				echo "data saved";
			}
			else
			{
				echo "duplicate record";
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