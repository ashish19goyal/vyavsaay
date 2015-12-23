<?php
/*	input data format: 
 * 			{
 				database:'',
 				data_store:'',
 				indexes:
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
	$columns_array=(array)$input_object['indexes'];

	$response_object=[];	
		
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['domain']=='vyavsaay' && $_SESSION['username']==$username && $_SESSION['cr']==$cr_access)
		{
			$conn=new db_connect($database);
			$data_array=array();

			$id='';
			
			$unique=0;
			$unique_column_value=array();

			$query4="select count(*) from $table where ";
			
			foreach($columns_array as $col)
			{
				if(isset($col['unique']))
				{
					$query4.=$col['index']."= ? or ";
					$unique_column_value[]=$col['value'];
					if($col['index']=='id')
					{
						$id=$col['value'];
					}					
				}
			}

			$query4=rtrim($query4,"or ");
			
			if(count($unique_column_value)>0)
			{
				$stmt4=$conn->conn->prepare($query4);
				$stmt4->execute($unique_column_value);
				$unique=$stmt4->fetchAll(PDO::FETCH_NUM)[0][0];	
			}
				
			if($unique===0 || $unique=="0")
			{		
				$query2="insert into $table(";
				
				foreach($columns_array as $col)
				{
					$query2.=$col['index'].",";
					$data_array[]=$col['value'];
				}

				$query2=rtrim($query2,",");
				$query2.=") values(";
				
				foreach($columns_array as $col)
				{
					$query2.="?,";
				}
				
				$query2=rtrim($query2,",");
				$query2.=");";
				$act_type='create';
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