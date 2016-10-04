<?php
/*
 * output data format: 
 *	{
 		end_table:"",
 		end_offset:"",
 		data:
 		{
 			tablename:
 			[
 				{
 					column1:value,
 					column2:value
 				},
 				{
 					column1:value,
 					column2:value
 				}
 			]
 		}
 	}
*/
	session_start();
	
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;

	$domain=$_POST['domain'];
	$re_access=$_POST['re'];
	$username=$_POST['username'];
	$last_sync_time=$_POST['last_sync_time'];
	$start_table=$_POST['start_table'];
	$start_offset=intval($_POST['start_offset']);
	$jsonresponse=[];			
			
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['re']==$re_access)
		{
			$info_conn=new db_connect('information_schema');
			$get_array=array();			
			$get_query="select table_name from information_schema.tables where table_schema=?";
			$get_array[]="re_user_".$domain;
			$get_stmt=$info_conn->conn->prepare($get_query);
			$get_stmt->execute($get_array);
			$get_res=$get_stmt->fetchAll(PDO::FETCH_ASSOC);
			
			$conn=new db_connect("re_user_".$domain);
			
			$jsoneresponse['data']=[];
			
			$first_iteration=true;
			$num_records=500;
			$end_table='end_syncing';
			
			//$tables_query=$conn->conn->prepare("select tables from user_preferences where value=? and sync=?");
			//$tables_query->execute(array('checked','checked'));
			$tables_query=$conn->conn->prepare("select tables from user_preferences");
			$tables_query->execute(array());
			$tables_res=$tables_query->fetchAll(PDO::FETCH_NUM);
			$selected_tables='';

			foreach ($tables_res as $table_value)
			{
				$selected_tables.=$table_value[0];
			}
			//echo $selected_tables;
			
			foreach($get_res as $table)
			{	
				$table_name=$table['table_name'];
				if($table_name!=$start_table && $first_iteration && $start_table!="")
				{
					continue;
				}
				$first_iteration=false;
				
				$found=strpos($selected_tables, "--".$table_name."--");
				
				
				if($found!==false)
				{
					$jsonresponse['data'][$table_name]=[];
					
					$stmt[$table_name]=$conn->conn->prepare("select * from $table_name where last_updated>? or last_sync_time>? limit ?,?;");
					$stmt[$table_name]->execute(array($last_sync_time,$last_sync_time,$start_offset,$num_records));
					$stmt_res=$stmt[$table_name]->fetchAll(PDO::FETCH_ASSOC);
					
					for($i=0;$i<count($stmt_res);$i++)
					{
						if($table_name=='activities')
						{
							$found_activity=strpos($selected_tables, "--".$stmt_res[$i]['tablename']."--");
							if($found_activity===false)
							{
								continue;
							}
						}

						$response_row=[];
						foreach($stmt_res[$i] as $key => $value)
						{
							$response_row[$key]=$value;
						}
						$response_row['id']="".$response_row['id'];
						$response_row['last_updated']="".$response_row['last_updated'];
						$jsonresponse['data'][$table_name][]=$response_row;						
					}
					
					if(count($stmt_res)<$num_records)
					{
						$start_offset=0;
					}
					else
					{
						$start_offset=$start_offset+$num_records;
					}
					$num_records=$num_records-count($stmt_res);
					if($num_records===0)
					{
						$end_table=$table_name;
						break;
					}
				}
			}
			
			$jsonresponse['status']='success';			
			$jsonresponse['end_table']=$end_table;			
			$jsonresponse['end_offset']=$start_offset;
		}
		else
		{
			$jsonresponse['status']='Invalid session';
		}
	}
	else
	{
		$jsonresponse['status']='Invalid session';
	}

	$jsonresponse_string=json_encode($jsonresponse);			
	header("Content-Type:application/json");
	echo $jsonresponse_string;

?>