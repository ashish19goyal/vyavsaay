<?php
/*	input data format: 
 * 			{
 				database:'',
 				data_store:'',
 				count:'',
 				start_index:'',
 				return_column:'',
 				sum:'yes/no',
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
 						approx_array:array
 					},
 					{
 						index:'column2',
 						value:'value2',
 						exact:'value',
 						upperbound:'value',
 						lowerbound:'value'
 						array:'value',
 						unequal:'value',
 						approx_array:array
 					}
 				]
 			}

 *	output data format: 
 *			{
 				database:'',
 				data_store:'',
 				count:'',
 				end_index:'',
 				status:'',
 				rows:
 				[
 					0:'value1',
 					1:'value2',
 					2:'value3'
 				]
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

	$database=$input_object['database'];
	$table=$input_object['data_store'];
		
	$return_column=$input_object['return_column'];
	
	$columns_array=(array)$input_object['indexes'];

	$response_object=[];
			
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['domain']=='vyavsaay' && $_SESSION['username']==$username && $_SESSION['re']==$read_access)
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
			$values_array=array();
			
			
			///formulating the query
			$query="select ".$return_column." from $table where ";
			$limit=" limit ?,?";
			
			if(isset($input_object['sum']))
			{
				$query="select sum(".$return_column.") from $table where ";
			}
			//parsing the indexes for filtering of results
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
			
			$query=rtrim($query,"and ");
			
			if(count($values_array)===0)
			{
				$query="select ".$return_column." from $table";
				if(isset($input_object['sum']))
				{
					$query="select sum(".$return_column.") from $table";
				}
			}
			$query.=" ORDER BY id DESC";

			if($limit_count!=0)
			{
				$query.=$limit;
				$values_array[]=$limit_start_index;
				$values_array[]=$limit_count;
			}
			
			//echo $query;
			$conn=new db_connect($database);
			$stmt=$conn->conn->prepare($query);
			$stmt->execute($values_array);
			$struct_res=$stmt->fetchAll(PDO::FETCH_NUM);
			
			$response_object['status']='success';
			$response_object['database']=$database;
			$response_object['data_store']=$table;
			$response_object['count']=count($struct_res);
			$response_object['end_index']=$limit_start_index+count($struct_res);
			
			$response_rows=[];
	
			for($i=0;$i<count($struct_res);$i++)
			{
				if($struct_res[$i][0]==null || $struct_res[$i][0]=="null")
				{
					$response_rows[]="0";
				}
				else 
				{
					$response_rows[]=$struct_res[$i][0];
				}
			}
			
			$response_object['rows']=$response_rows;
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