<?php
/*	input data format: 
 * 			{
 				data_store:'',
 				log:'yes/no',
 				data:
 				[
 					[{
 						index:'column1',
 						value:'value1',
 						unique:'yes/no',
 						uniqueWith:['col1','col2']
 					},
 					{
 						index:'column2',
 						value:'value2',
 					}],
 					[{
 						index:'column1',
 						value:'value1',
 						unique:'yes/no',
 						uniqueWith:['col1','col2']
 					},
 					{
 						index:'column2',
 						value:'value2',
 					}],
 				],
 				log_data:
 				{
 					title: 'title',
 					link_to: 'formid'
 				}
 			}

 *	output data format: 
 *			{
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

	$table=$input_object['data_store'];
	$data_columns_array=(array)$input_object['data'];
	
	$response_object=[];	
		
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['cr']==$cr_access)
		{
			$success_count=0;
			$db_name="re_user_".$domain;
			$conn=new db_connect($db_name);
			
			$select_query="select count(*) from $table where ";
			$insert_query="insert into $table(";
			
			$uniqueWithColumns="";
			foreach($data_columns_array[0] as $data)
			{
				if(isset($data['unique']) && $data['unique']=='yes')
				{
					$select_query.=$data['index']."= ? or ";
				}
				else if(isset($data['uniqueWith']))
				{
					$uniqueWithColumns=(array)$data['uniqueWith'];
					$subcondition=$data['index']."=? and ";
					foreach($uniqueWithColumns as $uwc)
					{
						$subcondition.=$uwc."=? and ";
					}
					$subcondition=rtrim($subcondition," and ");			
					$select_query.="(".$subcondition.") or ";
				}
				$insert_query.=$data['index'].",";
			}

			$insert_query=rtrim($insert_query,",");
			$insert_query.=") values(";
			
			foreach($data_columns_array[0] as $data)
			{
				$insert_query.="?,";
			}
			
			$select_query=rtrim($select_query,"or ");
			$select_query=rtrim($select_query,"where ");

			$insert_query=rtrim($insert_query,",");
			$insert_query.=");";
				
			$select_stmt=$conn->conn->prepare($select_query);
			$insert_stmt=$conn->conn->prepare($insert_query);
		
			foreach($data_columns_array as $row)
			{
				$data_array=array();
				
				$unique=0;
				$unique_column_value=array();
				$indexed_columns=array();
				
				foreach($row as $data)
				{
					$indexed_columns[$data['index']]=$data['value'];
				}
				
				foreach($row as $data)
				{
					if(isset($data['unique']) && $data['unique']=='yes')
					{	
						$unique_column_value[]=$data['value'];
					}
					else if(isset($data['uniqueWith']))
					{
						$unique_column_value[]=$data['value'];
						foreach($uniqueWithColumns as $uwc)
						{
							$unique_column_value[]=$indexed_columns[$uwc];
						}
					}
				}
				
				$id=$indexed_columns['id'];

				if(count($unique_column_value)>0)
				{
					$select_stmt->execute($unique_column_value);
					$unique=$select_stmt->fetchAll(PDO::FETCH_NUM)[0][0];	
				}
					
				if($unique===0 || $unique=="0")
				{		
					foreach($row as $data)
					{
						$data_array[]=$data['value'];
					}
					try 
					{
						$insert_result=$insert_stmt->execute($data_array);
						if($insert_result)
						{
							$success_count+=1;
						}
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
		
			if(isset($input_object['log']) && $input_object['log']=='yes')
			{
				$log_array=$input_object['log_data'];
				$act_title=$log_array['title'];
				$link_to=$log_array['link_to'];					
				$notes="Added ".$success_count." records for ".$act_title;
				
				$act_data=array('Data import','yes',$notes,$table,json_encode($data_columns_array),'online',1000*time(),'create',$_SESSION['name'],'json',$link_to);
				$query3="insert into activities (title,user_display,notes,tablename,data_xml,status,last_updated,type,updated_by,data_type,link_to) values(?,?,?,?,?,?,?,?,?,?,?)";
				$stmt3=$conn->conn->prepare($query3);
				$stmt3->execute($act_data);

				$response_object['log']='yes';
			}
			else 
			{
				$act_data=array('no',$table,json_encode($data_columns_array),'json','online',1000*time(),'create',$_SESSION['name']);
				$query3="insert into activities (user_display,tablename,data_xml,data_type,status,last_updated,type,updated_by) values(?,?,?,?,?,?,?,?)";
				$stmt3=$conn->conn->prepare($query3);
				$stmt3->execute($act_data);
			}
			
			$response_object['data_store']=$table;
			$response_object['status']="records created";
		
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