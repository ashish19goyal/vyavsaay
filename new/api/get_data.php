<?php
/*	input data format: 
 * 			{
 				api_key:'',
 				username:'',
 				data_store:'',
 				count:'',
 				start_index:'',
 				indexes:
 				[
 					{
 						index:'column1',
 						value:'value1',
 						exact:'yes/no'
 						upperbound:'yes/no',
 						lowerbound:'yes'/no'
 						array:'yes/no'
 					},
 					{
 						index:'column2',
 						value:'value2',
 						exact:'yes/no',
 						upperbound:'yes/no',
 						lowerbound:'yes'/no'
 						array:'yes/no'
 					}
 				]
 			}

 *	output data format: 
 *			{
 				status:'success/error',
 				data_store:'',
 				length:'',
 				end_index:'',
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

	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;

	$input_data=$_POST['data'];
	$input_object=json_decode($input_data,true);

	$api_key=$input_object['api_key'];
	$username=$input_object['username'];
	$table=$input_object['data_store'];
	$start_index=$input_object['start_index'];
	$columns_array=(array)$input_object['indexes'];

	$api_query="select dbname,data_stores from api_key_mapping where api_key=? and username=? and status=?";
	$master_conn=new db_connect(0);
	$api_stmt=$master_conn->conn->prepare($api_query);
	$api_array=array($api_key,$username,'active');
	$api_stmt->execute($api_array);
	$api_struct_res=$api_stmt->fetchAll(PDO::FETCH_ASSOC);
	
	//echo $api_struct_res[0]['dbname'];
	$jsonresponse="";
	if(count($api_struct_res)>0)
	{
		$db_name=$api_struct_res[0]['dbname'];
		$data_stores=$api_struct_res[0]['data_stores'];
		if(strpos($data_stores,$table)!==false)
		{
			$query="select * from $table where ";
			$order_by=" ORDER BY last_updated DESC, ";
			$limit=" limit ?,?";
			$limit_count=0;

			if(isset($input_object['count']))
			{
				$limit_count=$input_object['count'];
			}

			$limit_start_index=0;
			if(isset($start_index))
			{
				$limit_start_index=$start_index;
			}

			///////
			foreach($columns_array as $col)
			{
				if(isset($col['upperbound']))
				{
					$query.=$col['index']." <= ? and ";
					$values_array[]=$col['value'];
				}
				
				if(isset($col['lowerbound']))
				{
					$query.=$col['index']." >= ? and ";
					$values_array[]=$col['value'];
				}
				
				if(isset($col['array']))
				{
					$query.=$col['index']." in (";
					$string=$col['value'];
					$exploded_values=explode(",",$string);
					foreach($exploded_values as $value)
					{
						$query.="?,";
						$values_array[]=$value;
					}
					$query=rtrim($query,",");
					$query.=") and ";
				}
				else if(!isset($col['array']) && !isset($col['lowerbound']) && !isset($col['upperbound']) && !isset($col['exact']) && isset($col['value']))
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
					$values_array[]=$col['value'];
				}
			}
			
			////////////////				
			$query=rtrim($query,"and ");
			
			if(count($values_array)===0)
			{
				$query="select * from $table";
			}
			$query.=$order_by."id DESC";

			//echo $query;
	
			if($limit_count!==0)
			{
				$query.=$limit;
				$values_array[]=$limit_start_index;
				$values_array[]=$limit_count;
			}
			
			$conn2=new db_connect($db_name);
			$stmt=$conn2->conn->prepare($query);
			$stmt->execute($values_array);
			$struct_res=$stmt->fetchAll(PDO::FETCH_ASSOC);
			
			$response_object=[];
			$response_object['status']='success';
			$response_object['data_store']=$table;
			$response_object['length']=count($struct_res);
			$response_object['end_index']=$start_index+count($struct_res);
	
			$response_rows=[];
	
			for($i=0;$i<count($struct_res);$i++)
			{
				//echo "new row<br>";
				$response_rows[$i]=[];
				foreach($struct_res[$i] as $key => $value)
				{
					if(json_decode($value,true))
					{
						$response_rows[$i][$key]=json_decode($value,true);
					}
					else {
						$response_rows[$i][$key]=$value;
					}
					//echo $value."<br>";
				}
			}

			$response_object['rows']=$response_rows;
			$jsonresponse=json_encode($response_object);
		}
		else 
		{
			$jsonresponse="{'status':'error'}";
		}
	}
	else 
	{
		$jsonresponse="{'status':'error'}";
	}	

	//header ("Content-Type:text/plain");
	header ("Content-Type:application/json");
	echo $jsonresponse;

?>