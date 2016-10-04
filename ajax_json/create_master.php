<?php
/*	input data format: 
 * 			{
 				database:'',
 				data_store:'',
 				data:
 				[
 					{
 						index:'column1',
 						value:'value1',
 						unique:'yes/no',
 					},
 					{
 						index:'column2',
 						value:'value2',
 					}
 				]
 			}

 *	output data format: 
 *			{
 				database:'',
 				data_store:'',
 				status:''
 			}
*/
	session_start();
	
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	
	$input_data=$_POST['data'];
	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$cr_access=$_POST['cr'];
	
	$input_object=json_decode($input_data,true);

	$database=$input_object['database'];
	$table=$input_object['data_store'];
	$columns_array=(array)$input_object['data'];

	$response_object=[];	
		
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['domain']=='vyavsaay' && $_SESSION['username']==$username && $_SESSION['cr']==$cr_access)
		{
			$conn=new db_connect($database);
			$data_array=array();

			$unique=0;
			$unique_column_value=array();

			$select_query="select count(*) from $table where ";
			
			$uniqueWithColumns="";
			foreach($columns_array as $col)
			{
				if(isset($col['unique']) && $col['unique']=='yes')
				{
					$select_query.=$col['index']."= ? or ";
				}
				else if(isset($col['uniqueWith']))
				{
					$uniqueWithColumns=(array)$col['uniqueWith'];
					$subcondition=$col['index']."=? and ";
					foreach($uniqueWithColumns as $uwc)
					{
						$subcondition.=$uwc."=? and ";
					}
					$subcondition=rtrim($subcondition," and ");			
					$select_query.="(".$subcondition.") or ";
				}
				$indexed_columns[$col['index']]=$col['value'];							
			}
			
			foreach($columns_array as $col)
			{
				if(isset($col['unique']) && $col['unique']=='yes')
				{
					$unique_column_value[]=$col['value'];					
				}
				else if(isset($col['uniqueWith']))
				{
					$unique_column_value[]=$col['value'];
					foreach($uniqueWithColumns as $uwc)
					{
						$unique_column_value[]=$indexed_columns[$uwc];
					}
				}	
			}
			
			$id=$indexed_columns['id'];
			
			$select_query=rtrim($select_query,"or ");
			
			if(count($unique_column_value)>0)
			{
				$select_stmt=$conn->conn->prepare($select_query);
				$select_stmt->execute($unique_column_value);
				$unique=$select_stmt->fetchAll(PDO::FETCH_NUM)[0][0];	
			}
				
			if($unique===0 || $unique=="0")
			{		
				$insert_query="insert into $table(";
				
				foreach($columns_array as $col)
				{
					$insert_query.=$col['index'].",";
					$data_array[]=$col['value'];
				}

				$insert_query=rtrim($insert_query,",");
				$insert_query.=") values(";
				
				foreach($columns_array as $col)
				{
					$insert_query.="?,";
				}
				
				$insert_query=rtrim($insert_query,",");
				$insert_query.=");";
				$act_type='create';
				$stmt2=$conn->conn->prepare($insert_query);
				$stmt2->execute($data_array);
				
				if($database!='0' && $database!=0)
				{
					$act_data=array('no',$table,$id,$input_data,'json','online',1000*time(),$act_type,$_SESSION['name']);
					$query3="insert into activities (user_display,tablename,data_id,data_xml,data_type,status,last_updated,type,updated_by) values(?,?,?,?,?,?,?,?,?)";
					$stmt3=$conn->conn->prepare($query3);
					$stmt3->execute($act_data);
				}
				$response_object['database']=$database;
				$response_object['data_store']=$table;
				$response_object['status']="record created";
			}
			else
			{
				$response_object['status']="duplicate record";
			}
		}
		else
		{
			$response_object['status']='Invalid session';
		}
	}
	else
	{
		$response_object['status']='Invalid session';
	}
	
	$jsonresponse=json_encode($response_object);		
	header ("Content-Type:application/json");
	echo $jsonresponse;
	
?>