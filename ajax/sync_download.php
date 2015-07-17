<?php
/*
 * output data format: 
 *	<re_xml>	
 *		<data>
 *			<tablename>
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
 *			</tablename>
 *		</data>
 *		<data>	
 *			<end_table>tablename</end_table>
 *			<end_offset>integrer value</end_offset>
 *		</data>
 *	</re_xml>	
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
	
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['re']==$re_access)
		{
			$conn=new db_connect("re_user_".$domain);
			
			$db_schema_xml=new DOMDocument();
			$db_schema_xml->load("../db/db_schema.xml");
			$db_schema=$db_schema_xml->documentElement;
			
			$xmlresponse="<re_xml><data>";

			$first_iteration=true;
			$num_records=500;
			$end_table='end_syncing';
			
			$tables_query=$conn->conn->prepare("select tables from user_preferences where value=? and sync=?");
			$tables_query->execute(array('checked','checked'));
			$tables_res=$tables_query->fetchAll(PDO::FETCH_NUM);
			$selected_tables='';

			foreach ($tables_res as $table_value)
			{
				$selected_tables.=$table_value[0];
			}

			foreach($db_schema->childNodes as $table)
			{	
				$table_name=$table->nodeName;
				
				if($table_name!=$start_table && $first_iteration && $start_table!="")
				{
					continue;
				}
				$first_iteration=false;
				
				$found=strpos($selected_tables, "--".$table_name."--");
				
				
				if($table_name!="#text" && ($found!==false))
				{
					$xmlresponse.="<$table_name>";
					$stmt[$table_name]=$conn->conn->prepare("select * from $table_name where last_updated>? limit ?,?;");
					$stmt[$table_name]->execute(array($last_sync_time,$start_offset,$num_records));
					$stmt_res=$stmt[$table_name]->fetchAll(PDO::FETCH_ASSOC);
					
					for($i=0;$i<count($stmt_res);$i++)
					{
						if($table_name==='activities')
						{
							$found_activity=strpos($selected_tables, "--".$stmt_res[$i]['tablename']."--");
							if($found_activity==false)
							{
								continue;
							}
						}
						
						$xmlresponse.="<row>";
						
						foreach ($stmt_res[$i] as $key => $value)
						{
							$xmlresponse.="<".$key.">";
							$xmlresponse.=htmlentities($value);
							$xmlresponse.="</".$key.">";
						}
						$xmlresponse.="</row>";
					}
					
					$xmlresponse.="</$table_name>";
					
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
				
			$xmlresponse.="</data>";
			$xmlresponse.="<data>";
			$xmlresponse.="<end_table>$end_table</end_table>";
			$xmlresponse.="<end_offset>$start_offset</end_offset>";
			$xmlresponse.="</data></re_xml>";
			header("Content-Type:text/xml");
			echo $xmlresponse;
		}
		else
		{
			echo "Invalid session";
		}
	}
	else
	{
		echo "Invalid session";
	}
?>