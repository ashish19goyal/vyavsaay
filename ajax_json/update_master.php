<?php
/*	input data format: 
 * 			{
 				database:'',
 				data_store:'',
 				indexes:
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
	$up_access=$_POST['up'];
	
	$input_object=json_decode($input_data,true);

	$database=$input_object['database'];
	$table=$input_object['data_store'];
	$columns_array=(array)$input_object['indexes'];

	$response_object=[];	
		
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['domain']=='vyavsaay' && $_SESSION['username']==$username && $_SESSION['up']==$up_access)
		{
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
			$act_type='update';

			$stmt2=$conn->conn->prepare($query2);
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