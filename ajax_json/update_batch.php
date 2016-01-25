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
 					},
 					{
 						index:'column2',
 						value:'value2',
 					}],
 					[{
 						index:'column1',
 						value:'value1',
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
 				log:'yes/no',
 				status:''
 			}
*/
	session_start();
	
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	
	$input_data=$_POST['data'];
	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$up_access=$_POST['up'];
	
	$input_object=json_decode($input_data,true);

	$table=$input_object['data_store'];
	$data_columns_array=(array)$input_object['data'];
	
	$response_object=[];	
		
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['up']==$up_access)
		{
			if(count($data_columns_array)>0)
			{
				$success_count=0;
				$db_name="re_user_".$domain;
				$conn=new db_connect($db_name);
				
				$update_query="update $table set ";
				
				foreach($data_columns_array[0] as $data)
				{
					$update_query.=$data['index']."=?,";
				}
				$update_query=rtrim($update_query,",");
				$update_query.=" where id=?;";
				
				$update_stmt=$conn->conn->prepare($update_query);
				
				foreach($data_columns_array as $row)
				{
					$data_array=array();
					$id=$row[0]['value'];
					
					foreach($row as $data)
					{
						$data_array[]=$data['value'];
					}
					
					$data_array[]=$id;
					$update_result=$update_stmt->execute($data_array);
					if($update_result)
					{
						$success_count+=1;
					}
				}
			
				
				if(isset($input_object['log']) && $input_object['log']=='yes')
				{
					$log_array=$input_object['log_data'];
					$act_title=$log_array['title'];
					$link_to=$log_array['link_to'];					
					$notes="Updated ".$success_count." records for ".$act_title;
					
					$act_data=array('Data import','yes',$notes,$table,json_encode($data_columns_array),'online',1000*time(),'update',$_SESSION['name'],'json',$link_to);
					$query3="insert into activities (title,user_display,notes,tablename,data_xml,status,last_updated,type,updated_by,data_type,link_to) values(?,?,?,?,?,?,?,?,?,?,?)";
					$stmt3=$conn->conn->prepare($query3);
					$stmt3->execute($act_data);
	
					$response_object['log']='yes';
				}
				else 
				{
					$act_data=array('no',$table,json_encode($data_columns_array),'json','online',1000*time(),'update',$_SESSION['name']);
					$query3="insert into activities (user_display,tablename,data_xml,data_type,status,last_updated,type,updated_by) values(?,?,?,?,?,?,?,?)";
					$stmt3=$conn->conn->prepare($query3);
					$stmt3->execute($act_data);
				}
				
				$response_object['data_store']=$table;
				$response_object['status']="records updated";
			}
			else 
			{
				$response_object['data_store']=$table;
				$response_object['status']="records updated";
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