<?php
/*	input data format: 
 * 			{
 				data_store:'',
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
	$columns_array=(array)$input_object['data'];

	$response_object=[];	
		
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['domain']=='vyavsaay' && $_SESSION['username']==$username && $_SESSION['up']==$up_access)
		{
			$info_conn=new db_connect('information_schema');
			$get_query="select distinct table_schema from information_schema.columns where table_schema like ?";
			$get_stmt=$info_conn->conn->prepare($get_query);
			$get_stmt->execute(array('%re_user%'));
			$get_res=$get_stmt->fetchAll(PDO::FETCH_ASSOC);

			$query2="update $table set ";
			$data_array=array();
	
			foreach($columns_array as $col)
			{
				$query2.=$col['index']."=?,";
				$data_array[]=$col['value'];
			}

			$query2=rtrim($query2,",");
			$query2.=" where ";
			
			foreach($columns_array as $col)
			{
				if((isset($col['unique']) && $col['unique']=='yes') || $col['index']=='id')
				{
					$query2.=$col['index']."=?,";
					$data_array[]=$col['value'];
				}
			}

			$query2=rtrim($query2,",");

			$act_type='update';

			for($i=0;$i<count($get_res);$i++)
			{
				$database=$get_res[$i]['table_schema'];
				$conn=new db_connect($database);
				
				$stmt2=$conn->conn->prepare($query2);
				$stmt2->execute($data_array);
				//$data_ids=$stmt2->fetchAll(PDO::FETCH_ASSOC);
				//foreach($data_ids as $id)
				//{	
					$act_data=array('no',$table,'',$input_data,'json','online',1000*time(),$act_type,$_SESSION['name']);
					$query3="insert into activities (user_display,tablename,data_id,data_xml,data_type,status,last_updated,type,updated_by) values(?,?,?,?,?,?,?,?,?)";
					$stmt3=$conn->conn->prepare($query3);
					$stmt3->execute($act_data);
					$stmt3=null;
				//}
				$conn->conn=null;
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