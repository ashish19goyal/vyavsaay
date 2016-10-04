<?php
/*	input data format: 
 * 			{
 				data_store:'',
 				log:'yes/no',
 				data:
 				[
 					{
 						index:'column1',
 						value:'value1'
 					},
 					{
 						index:'column2',
 						value:'value2',
 					}
 				]
 			}

 *	output data format: 
 *			{
 				data_store:'',
 				status:'',
 				log:'yes/no'
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
	$columns_array=(array)$input_object['data'];

	$response_object=[];	
		
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['up']==$up_access)
		{
			$database="re_user_".$domain;
			$conn=new db_connect($database);
			$data_array=array();

			$id='';
			
			$query2="update $table set ";
			
			foreach($columns_array as $col)
			{
				$query2.=$col['index']."=?,";
				$data_array[]=$col['value'];
				if($col['index']=='id')
				{
					$id=$col['value'];
				}
			}

			$query2=rtrim($query2,",");
			$query2.=" where id=?;";
			$data_array[]=$id;
			
			$stmt2=$conn->conn->prepare($query2);
			$stmt2->execute($data_array);
			
			if(isset($input_object['log']) && $input_object['log']=='yes')
			{
				$log_array=$input_object['log_data'];
				$act_title=$log_array['title'];
				$act_notes=$log_array['notes'];
				$link_to=$log_array['link_to'];
				
				$act_data=array($act_title,$act_notes,$link_to,'json',$_SESSION['name'],'yes',$table,$id,json_encode($columns_array),'online',1000*time(),'update');
				$query3="insert into activities (title,notes,link_to,data_type,updated_by,user_display,tablename,data_id,data_xml,status,last_updated,type) values(?,?,?,?,?,?,?,?,?,?,?,?)";
				$stmt3=$conn->conn->prepare($query3);
				$stmt3->execute($act_data);	
				
				$response_object['log']='yes';
			}
			else 
			{
				$act_data=array('no',$table,$id,json_encode($columns_array),'json','online',1000*time(),'update',$_SESSION['name']);
				$query3="insert into activities (user_display,tablename,data_id,data_xml,data_type,status,last_updated,type,updated_by) values(?,?,?,?,?,?,?,?,?)";
				$stmt3=$conn->conn->prepare($query3);
				$stmt3->execute($act_data);
			}

			$response_object['data_store']=$table;
			$response_object['status']='data updated';
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