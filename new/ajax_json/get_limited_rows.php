<?php
/*	input data format: 
 * 			{
 				data_store:'',
 				count:'',
 				start_index:'',
 				all_indexes:'yes',
 				access:
 				{
 			        data_store:'ds1',
 					match_record_id:'no',
 					match_criteria:'no',
 					match_result:'yes',
 					match_condition:1 and 2,
 					match_columns:
 					[
 						{col_order:1,result_column:'',data_column:''},
 						{col_order:2,result_column:'',data_column:''}
 					]
 				},
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
 						isnull:'yes/no',
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
 						isnull:'yes/no',
 						approx_array:array,
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
	$columns_array=(array)$input_object['indexes'];

	$response_object=[];
			
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['re']==$read_access)
		{
			$db_name="re_user_".$domain;
			$conn=new db_connect($db_name);
			
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

			///formulating the query components
			$columns_to_display="";
			$values_array=array();
			$order_by=" ORDER BY ".$table.".last_updated DESC, ".$table.".id DESC";
			$limit="";
			$where_conditions=" where ";
			$access_condition_connector="";
			$access_conditions="";
			$other_tables="";
			$access_values_array=array();
			/////adding logic for access control

			if(isset($input_object['access']))
			{
				$access_condition_connector=" and";
				
				$access_object=(array)$input_object['access'];
				$other_tables.=",object_access";
				$access_store=$table;
				if(isset($access_object['data_store']))
				{
					$access_store=$access_object['data_store'];
					$other_tables.=",".$access_store;
				}
				
				$match_record_id=true;
				if(isset($access_object['match_record_id']) && $access_object['match_record_id']=='no')
				{
					$match_record_id=false;					
				}

				$match_criteria=true;
				if(isset($access_object['match_criteria']) && $access_object['match_criteria']=='no')
				{
					$match_criteria=false;					
				}
				
				$match_result=false;
				if(isset($access_object['match_result']) && $access_object['match_result']=='yes')
				{
					$match_result=true;					
				}
				
				$access_conditions=" (";
				
				$user_roles=$_SESSION['user_roles'];
				$user_roles_array=explode("--",$user_roles);
				
				if($match_record_id)
				{
					$access_conditions.="((object_access.tablename=? and (object_access.user like ?";
					$access_values_array[]=$access_store;
					$access_values_array[]="%".$_SESSION['acc_name']."%";
					
					foreach($user_roles_array as $role)
					{
						if($role!="")
						{
							$access_conditions.=" or object_access.user like ?";
							$access_values_array[]="%".$role."%";
						}
					}
					$access_conditions.=" ) and object_access.record_id=".$access_store.".id) or (not exists (select * from object_access where tablename=? and record_id=".$access_store.".id)";
					$access_values_array[]=$access_store;
				}
				
				if($match_criteria)
				{
					$condition_query="select * from access_conditions where tablename=? and ((user like ?";
					$condition_values=array($access_store,"%".$_SESSION['acc_name']."%");
					foreach($user_roles_array as $role)
					{
						if($role!="")
						{
							$condition_query.=" or user like ?";
							$condition_values[]="%".$role."%";
						}
					}
					$condition_query.=") or user_type=?)";
					$condition_values[]='field';
//					echo $condition_query;
//                    var_dump($condition_values);

                    $condition_stmt=$conn->conn->prepare($condition_query);
					$condition_stmt->execute($condition_values);
					$condition_res=$condition_stmt->fetchAll(PDO::FETCH_ASSOC);
					//var_dump($condition_res);
					if(count($condition_res)>0)
					{
						if($match_record_id)
						{
							$access_conditions.=" and (";
						}
						else 
						{
							$access_conditions.=" (";
						}
													
						foreach($condition_res as $condition)
						{
							$sub_access_conditions="(";
							if($condition['user_type']=='field')
							{
								$sub_access_conditions.=$table.".".$condition['user']." like ? and ";
								$access_values_array[]="%".$_SESSION['acc_name']."%";
							}

							if($condition['criteria_field']!="")
							{
								$sub_access_conditions.=$table.".".$condition['criteria_field']."=?";
								$access_values_array[]=$condition['criteria_value'];
							}
							$sub_access_conditions=rtrim($sub_access_conditions,' and ');
							$sub_access_conditions.=")";
							
							if($sub_access_conditions=="()")
							{
								$access_conditions.="(true) or ";
							}
							else 
							{
								$access_conditions.=$sub_access_conditions." or ";
							}
							//echo $sub_access_conditions;
						}
						$access_conditions=rtrim($access_conditions,'or ');
						$access_conditions.=") and ";						
					}
                    else
                    {
                        $access_conditions.=" and (false) and ";
                    }
				}

				if($match_result)
				{
					$match_condition=$access_object['match_condition'];
					$match_columns=(array)$access_object['match_columns'];
					foreach($match_columns as $col)
					{
						$mc=$table.".".$col['result_column']."=".$access_store.".".$col['data_column'];
						$match_condition=str_replace($col['col_order'],$mc,$match_condition);
					}
					$access_conditions.=$match_condition;
				}
				$access_conditions=rtrim($access_conditions,' and ');
				$access_conditions.=")))";
				
				if($access_conditions==" ()")
				{
					$access_conditions=" (true)";
				}
				//echo $access_conditions;
 			}
			//////////////////////////////////////
						
			//parsing the indexes for filtering of results
			foreach($columns_array as $col)
			{
				$columns_to_display.=$table.".".$col['index'].",";
				
				if(isset($col['upperbound']))
				{
					$where_conditions.=$table.".".$col['index']." <= ? and ";
					$values_array[]=$col['upperbound'];
				}
				
				if(isset($col['lowerbound']))
				{
					$where_conditions.=$table.".".$col['index']." >= ? and ";
					$values_array[]=$col['lowerbound'];
				}
				
				if(isset($col['unequal']))
				{
					$where_conditions.="(".$table.".".$col['index']." <> ? or isNull(".$table.".".$col['index'].")) and ";
					$values_array[]=$col['unequal'];
				}
				
				if(isset($col['isnull']))
				{
					if($col['isnull']=='yes')
					{
						$where_conditions.="isNull(".$table.".".$col['index'].") and ";
					}
					else 
					{
						$where_conditions.="!isNull(".$table.".".$col['index'].") and ";
					}
				}
				
				if(isset($col['array']))
				{
					$where_conditions.=$table.".".$col['index']." in (";
					$exploded_values=(array)$col['array'];
					foreach($exploded_values as $value)
					{
						$where_conditions.="?,";
						$values_array[]=$value;
					}
					if(count($exploded_values)==0)
					{
						$where_conditions.="?,";
						$values_array[]="--";						
					}
					
					$where_conditions=rtrim($where_conditions,",");
					$where_conditions.=") and ";
				}
				
				if(isset($col['approx_array']))
				{
					$approx_array=(array)$col['approx_array'];
					$exploded_values=[];
					foreach ($approx_array as $val) 
					{
					    $exploded_values[] = "%".$val."%";
					}
					$where_conditions.="(";
					foreach($exploded_values as $value)
					{
						$where_conditions.=$table.".".$col['index']." like ? or ";
						$values_array[]=$value;
					}
					if(count($exploded_values)==0)
					{
						$where_conditions.="?,";
						$values_array[]="--";						
					}
					
					$where_conditions=rtrim($where_conditions,", or ");
					$where_conditions.=") and ";
				}
				
				if(isset($col['value']))
				{
					if($col['value']!="")
					{
						if($col['index']=='id')
						{
							$where_conditions.=$table.".".$col['index']." = ? and ";
							$values_array[]=$col['value'];
						}
						else
						{	
							$where_conditions.=$table.".".$col['index']." like ? and ";
							$values_array[]="%".$col['value']."%";
						}
					}
				}
				
				if(isset($col['exact']))
				{
					$where_conditions.=$table.".".$col['index']." = ? and ";
					$values_array[]=$col['exact'];
				}
			}

			$where_conditions=rtrim($where_conditions,"and ");
			$columns_to_display=rtrim($columns_to_display,",");

			if(count($values_array)===0)
			{
				$where_conditions="";

				if($access_conditions!="")				
				{
					$access_condition_connector=" where";
				}
				else
				{
					$access_condition_connector="";
				}
			}

			$values_array=array_merge($values_array,$access_values_array);
			if($limit_count!=0)
			{
				$limit=" limit ?,?";
				$values_array[]=$limit_start_index;
				$values_array[]=$limit_count;
			}			
						
			$query="select distinct $columns_to_display from ".$table.$other_tables.$where_conditions.$access_condition_connector.$access_conditions.$order_by.$limit;
			//echo $query;
			//var_dump($values_array);

			$stmt=$conn->conn->prepare($query);
			$stmt->execute($values_array);
			$struct_res=$stmt->fetchAll(PDO::FETCH_ASSOC);
			
			$response_object['status']='success';
			$response_object['data_store']=$table;
			$response_object['count']=count($struct_res);
			$response_object['end_index']=$limit_start_index+count($struct_res);
			
			$response_rows=[];
	
			for($i=0;$i<count($struct_res);$i++)
			{
				$response_rows[$i]=[];
				foreach($struct_res[$i] as $key => $value)
				{
					$response_rows[$i][$key]=$value;
				}
				if(isset($response_rows[$i]['id']))
				{			
					$response_rows[$i]['id']="".$response_rows[$i]['id'];
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