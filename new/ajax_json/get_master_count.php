<?php
/*	input data format: 
 * 			{
 				database:'',
 				data_store:'',
 				count:'',
 				start_index:'',
 				indexes:
 				[
 					{
 						index:'column1',
 						value:'value1',
 						exact:'value'
 						upperbound:'value',
 						lowerbound:'value'
 						array:array,
 						unequal:'value',
 						isnull:'yes/no'
 						approx_array:array,
 					},
 					{
 						index:'column2',
 						value:'value2',
 						exact:'value',
 						upperbound:'value',
 						lowerbound:'value'
 						array:array,
 						unequal:'value',
 						approx_array:array,
 					}
 				]
 			}

 *	output data format: 
 *			{
 				database:'',
 				data_store:'',
 				count:'',
 				end_index:'',
 				status:''
 			}
*/

	session_start();
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	
	$input_data=$_POST['data'];
	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$read_access=$_POST['re'];
	
	$input_object=json_decode($input_data,true);

	$table=$input_object['data_store'];
	$database=$input_object['database'];
	
	$response_object=[];
			
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['re']==$read_access)
		{
			///setting the number of return results
			$limit_count=0;
			if(isset($input_object['count']))
			{
				$limit_count=$input_object['count'];
			}

			///setting the starting index
			$limit_start_index=0;
			if(isset($input_object['start_index']))
			{
				$limit_start_index=$input_object['start_index'];
			}

			///seting the indexes to be returned
			$columns_to_display="";
			$values_array=array();
			
			///formulating the query
			$query="select count(id) from $table where ";
			$limit=" limit ?,?";
			
			//parsing the indexes for filtering of results
			if(isset($input_object['indexes']))
			{			
				$columns_array=(array)$input_object['indexes'];
				foreach($columns_array as $col)
				{
					if(isset($col['upperbound']))
					{
						$query.=$col['index']." <= ? and ";
						$values_array[]=$col['upperbound'];
					}
					
					if(isset($col['lowerbound']))
					{
						$query.=$col['index']." >= ? and ";
						$values_array[]=$col['lowerbound'];
					}
					
					if(isset($col['unequal']))
					{
						$query.="(".$col['index']." <> ? or isNull(".$col['index'].")) and ";
						$values_array[]=$col['unequal'];
					}
					
					if(isset($col['isnull']))
					{
						if($col['isnull']=='yes')
						{
							$query.="isNull(".$col['index'].") and ";
						}
						else 
						{
							$query.="!isNull(".$col['index'].") and ";
						}
					}
					
					if(isset($col['array']))
					{
						$query.=$col['index']." in (";
						$exploded_values=(array)$col['array'];
						foreach($exploded_values as $value)
						{
							$query.="?,";
							$values_array[]=$value;
						}
						if(count($exploded_values)==0)
						{
							$query.="?,";
							$values_array[]="--";						
						}
						
						$query=rtrim($query,",");
						$query.=") and ";
					}
					
					if(isset($col['approx_array']))
					{
						$approx_array=(array)$col['approx_array'];
						$exploded_values=[];
						foreach ($approx_array as $val) 
						{
						    $exploded_values[] = "%".$val."%";
						}
						$query.="(";
						foreach($exploded_values as $value)
						{
							$query.=$col['index']." like ? or ";
							$values_array[]=$value;
						}
						if(count($exploded_values)==0)
						{
							$query.="?,";
							$values_array[]="--";						
						}
						
						$query=rtrim($query,", or ");
						$query.=") and ";
					}
					
					if(isset($col['value']))
					{
						if($col['value']!="")
						{
							if($col['index']=='id')
							{
								$query.=$col['index']." = ? and ";
								$values_array[]=$col['value'];
							}
							else
							{	
								$query.=$col['index']." like ? and ";
								$values_array[]="%".$col['value']."%";
							}
						}
					}
					
					if(isset($col['exact']))
					{
						$query.=$col['index']." = ? and ";
						$values_array[]=$col['exact'];
					}				
				}
			}
			
			$query=rtrim($query,"and ");
			
			if(count($values_array)===0)
			{
				$query="select count(id) from $table";
			}
			
			if($limit_count!=0)
			{
				$query.=$limit;
				$values_array[]=$limit_start_index;
				$values_array[]=$limit_count;
			}
			
			$conn=new db_connect($database);
			$stmt=$conn->conn->prepare($query);
			$stmt->execute($values_array);
			$struct_res=$stmt->fetch(PDO::FETCH_NUM);
			
			$response_object['status']='success';
			$response_object['database']=$database;
			$response_object['data_store']=$table;
			$response_object['count']=$struct_res[0];
			$response_object['end_index']=$limit_start_index+$struct_res[0];		
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