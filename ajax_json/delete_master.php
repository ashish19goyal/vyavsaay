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
 						exact:'value'
 						upperbound:'value',
 						lowerbound:'value'
 						array:array,
 						unequal:'value'
 					},
 					{
 						index:'column2',
 						value:'value2',
 						exact:'value',
 						upperbound:'value',
 						lowerbound:'value'
 						array:'value',
 						unequal:'value'
 					}
 				]
 			}

 *	output data format: 
 *			{
 				database:'',
 				data_store:'',
 				count:'',
 				status:''
 			}
*/

	session_start();
	
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	
	$input_data=$_POST['data'];
	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$del_access=$_POST['del'];
	
	$input_object=json_decode($input_data,true);

	$database=$input_object['database'];
	$table=$input_object['data_store'];
	$columns_array=(array)$input_object['indexes'];

	$response_object=[];
	
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['domain']=='vyavsaay' && $_SESSION['username']==$username && $_SESSION['del']==$del_access)
		{
			$conn=new db_connect($database);
			$data_array=array();

			$query1="select id from $table where ";
			$query="delete from $table where ";
			
			foreach($columns_array as $col)
			{
				if(isset($col['upperbound']))
				{
					$query.=$col['index']." <= ? and ";
					$query1.=$col['index']." <= ? and ";
					$data_array[]=$col['upperbound'];
				}
				
				if(isset($col['lowerbound']))
				{
					$query1.=$col['index']." >= ? and ";
					$query.=$col['index']." >= ? and ";
					$data_array[]=$col['lowerbound'];
				}
				
				if(isset($col['unequal']))
				{
					$query1.=$col['index']." <> ? and ";
					$query.=$col['index']." <> ? and ";
					$data_array[]=$col['unequal'];
				}
				
				if(isset($col['array']))
				{
					$query.=$col['index']." in (";
					$query1.=$col['index']." in (";
					$exploded_values=(array)$col['array'];
					foreach($exploded_values as $value)
					{
						$query.="?,";
						$query1.="?,";
						$data_array[]=$value;
					}
					if(count($exploded_values)==0)
					{
						$query.="?,";
						$query1.="?,";
						$data_array[]="--";						
					}
					
					$query=rtrim($query,",");
					$query.=") and ";

					$query1=rtrim($query1,",");
					$query1.=") and ";
				}
				
				if(isset($col['value']))
				{
					if($col['value']!="")
					{
						$query.=$col['index']." = ? and ";
						$query1.=$col['index']." = ? and ";
						$data_array[]=$col['value'];
					}
				}
				
				if(isset($col['exact']))
				{
					$query.=$col['index']."=? and ";
					$query1.=$col['index']."=? and ";
					$data_array[]=$col['exact'];
				}				
			}
			
			$query1=rtrim($query1,' and ');
			$query=rtrim($query,' and ');
			
			//echo $query1;
			
			if(count($data_array)!=0)
			{
				$stmt1=$conn->conn->prepare($query1);
				$stmt1->execute($data_array);
				$data_ids=$stmt1->fetchAll(PDO::FETCH_ASSOC);
				
				$stmt2=$conn->conn->prepare($query);
				$stmt2->execute($data_array);
				
				if($database!='0' && $database!=0)
				{
					foreach($data_ids as $id)
					{
						//$new_id=(1000*time()+rand(0,999))."".rand(0,999);
						$act_data=array('no',$table,$id['id'],$data_xml,'online',1000*time(),'delete');
						$query3="insert into activities (user_display,tablename,data_id,data_xml,status,last_updated,type) values(?,?,?,?,?,?,?,?)";
						$stmt3=$conn->conn->prepare($query3);
						
						$stmt3->execute($act_data);	
					}
				}
				$response_object['database']=$database;
				$response_object['data_store']=$table;
				$response_object['count']=count($data_ids);			
				$response_object['status']='data deleted';
			}
			else 
			{
				$response_object['status']='invalid request';
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