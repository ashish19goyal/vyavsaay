<?php
/*	input data format: 
 * 			{
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
 						array:'value',
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
 				data_store:'',
 				count:'',
 				end_index:'',
 				status:'',
 				rows:
 				[
 					{
 						column1:'value1',
 						column2:'value2',
 						column3:'value3'
 					},
 					{
 						column1:'valuex',
 						column2:'valuey',
 						column3:'valuez'
 					}
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

	$table=$input_object['data_store'];
	$start_index=$input_object['start_index'];
	$columns_array=(array)$input_object['indexes'];

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
			if(isset($start_index))
			{
				$limit_start_index=$start_index;
			}

			///seting the indexes to be returned
			$columns_to_display="";
			$values_array=array();
			
			foreach($columns_array as $col)
			{
				$columns_to_display.=$col['index'].",";			
			}
			
			$columns_to_display=rtrim($columns_to_display,",");
			
			///formulating the query
			$query="select ".$columns_to_display." from $table where ";
			$order_by=" ORDER BY last_updated DESC, ";
			$limit=" limit ?,?";
			
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
					$query.=$col['index']." <> ? and ";
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
				$query="select ".$columns_to_display." from $table";
			}
			$query.=$order_by."id DESC";

			if($limit_count!=0)
			{
				$query.=$limit;
				$values_array[]=$limit_start_index;
				$values_array[]=$limit_count;
			}
			
			$db_name="re_user_".$domain;
			//echo $query;
			$conn=new db_connect($db_name);
			$stmt=$conn->conn->prepare($query);
			$stmt->execute($values_array);
			$struct_res=$stmt->fetchAll(PDO::FETCH_ASSOC);
			
			$response_object['status']='success';
			$response_object['data_store']=$table;
			$response_object['count']=count($struct_res);
			$response_object['end_index']=$start_index+count($struct_res);
			
			$response_rows=[];
	
			for($i=0;$i<count($struct_res);$i++)
			{
				$response_rows[$i]=[];
				foreach($struct_res[$i] as $key => $value)
				{
					/*if(json_decode($value,true))
					{
						$response_rows[$i][$key]=json_decode($value,true);
					}
					else {
					*/	$response_rows[$i][$key]=$value;
					//}
				}
				$response_rows[$i]['id']="".$response_rows[$i]['id'];
			}
			$response_object['rows']=$response_rows;
		}
		else
		{
			$response_object="{'status':'Invalid session'}";
		}
	}
	else
	{
		$response_object="{'status':'Invalid session'}";
	}
	
	$jsonresponse=json_encode($response_object);		
	header ("Content-Type:application/json");
	echo $jsonresponse;

?>