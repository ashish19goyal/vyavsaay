<?php
/*	output data format: 
 *			<report>
 *				<row>
 *					<column1>value1</column1>
 *					<column2>value2</column2>
 *					<column3></column3>
 *					<column(n)>value(n)</column(n)>
 *				</row>
 *				<row>
 *					<column1>value1</column1>
 *					<column2>value2</column2>
 *					<column3></column3>
 *					<column(n)>value(n)</column(n)>
 *				</row>
 *			</report>

*	output data format: 
 *			{
 				count:'',
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
	
	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$read_access=$_POST['re'];
	$report_id=$_POST['report_id'];
	
	$response_object=[];
	
	//echo $columns;
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['re']==$read_access)
		{
			
			$db_name="re_user_".$domain;
			$conn=new db_connect($db_name);
			
			$query="select * from report_items where report_id=?";
			$stmt=$conn->conn->prepare($query);
			$stmt->execute(array($report_id));
			$struct_res=$stmt->fetchAll(PDO::FETCH_ASSOC);
			
			if(count($struct_res))
			{
				$select_fields=[];
				$select_tables=[];
				$select_conditions=[];
				$values_array=[];
								
				for($j=0;$j<count($struct_res);$j++)
				{
					$select_fields[]=$struct_res[$j]['table1'].".".$struct_res[$j]['field1'];
					$select_tables[]=$struct_res[$j]['table1'];
					$cond=$struct_res[$j]['condition1'];
						
					if(strrpos($cond,'field')!==false)
					{
						$select_fields[]=$struct_res[$j]['table2'].".".$struct_res[$j]['field2'];
						$select_tables[]=$struct_res[$j]['table2'];
						
						switch($cond)
						{
							case 'equals field': $select_conditions[]=$struct_res[$j]['table1'].".".$struct_res[$j]['field1']."=".$struct_res[$j]['table2'].".".$struct_res[$j]['field2'];
												break;
							case 'not equals field': $select_conditions[]=$struct_res[$j]['table1'].".".$struct_res[$j]['field1']."<>".$struct_res[$j]['table2'].".".$struct_res[$j]['field2'];
												break;
							case 'less than field': $select_conditions[]=$struct_res[$j]['table1'].".".$struct_res[$j]['field1']."<".$struct_res[$j]['table2'].".".$struct_res[$j]['field2'];
												break;
							case 'greater than field': $select_conditions[]=$struct_res[$j]['table1'].".".$struct_res[$j]['field1'].">".$struct_res[$j]['table2'].".".$struct_res[$j]['field2'];
												break;
						}
					}
					else if(strrpos($cond,'value')!==false)
					{
						switch($cond)
						{
							case 'equals value': $select_conditions[]=$struct_res[$j]['table1'].".".$struct_res[$j]['field1']."=?";
							break;
							case 'not equals value': $select_conditions[]=$struct_res[$j]['table1'].".".$struct_res[$j]['field1']."<>?";
							break;
							case 'less than value': $select_conditions[]=$struct_res[$j]['table1'].".".$struct_res[$j]['field1']."<?";
							break;
							case 'greater than value': $select_conditions[]=$struct_res[$j]['table1'].".".$struct_res[$j]['field1'].">?";
							break;
						}
						$values_array[]=$struct_res[$j]['value'];
					}
				}

				$select_fields_unique=array_unique($select_fields);
				$select_tables_unique=array_unique($select_tables);
				$select_conditions_unique=array_unique($select_conditions);
				
				$select_piece="";
				$from_piece="";
				$where_piece=" where ";

				
				foreach ($select_fields_unique as $field)
				{
					$select_piece.=$field.", ";
				}
				foreach ($select_tables_unique as $table)
				{
					$from_piece.=$table.", ";
				}
				
				if(count($select_conditions_unique)>0)
				{
					foreach ($select_conditions_unique as $cond)
					{
						$where_piece.=$cond." and ";
					}
				}
				else
				{
					$where_piece="";
				}
				
				$select_piece=rtrim($select_piece,", ");
				$from_piece=rtrim($from_piece,", ");
				$where_piece=rtrim($where_piece," ");
				$where_piece=rtrim($where_piece,"and");
				
				
				$final_query="select ".$select_piece." from ".$from_piece.$where_piece.";";
				//echo $final_query;
					
				$final_stmt=$conn->conn->prepare($final_query);
				$final_stmt->execute($values_array);
				$final_struct_res=$final_stmt->fetchAll(PDO::FETCH_ASSOC);
				
				$response_object['status']='success';
				$response_object['count']=count($final_struct_res);
				$response_rows=[];
		
				for($i=0;$i<count($final_struct_res);$i++)
				{
					$response_rows[$i]=[];
					foreach($final_struct_res[$i] as $key => $value)
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