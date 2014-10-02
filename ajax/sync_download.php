<?php

	session_start();
	
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;

	//username required to identify the database
	$domain=$_POST['domain'];
	$re_access=$_POST['re'];
	$username=$_POST['username'];
	$last_sync_time=$_POST['last_sync_time'];
	
	//$username='ashish';
	
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['re']==$re_access)
		{
			//connecting to the correct database
			$conn=new db_connect("re_user_".$domain);
			
			//names of the tables to be rendered
			$db_schema_xml=new DOMDocument();
			$db_schema_xml->load("../db/db_schema.xml");
			$db_schema=$db_schema_xml->documentElement;
			//setting up the response xml string
			$xmlresponse="<re_xml>";
		
			//action to be performed on each table
			foreach($db_schema->childNodes as $table)
			{
				$table_name=$table->nodeName;
				if($table_name!="#text")
				{
					$xmlresponse.="<$table_name>";
					//echo $table_name;
					try{	
						$struct=$conn->conn->prepare("select distinct column_name from information_schema.columns where table_name=? order by ordinal_position;");
						$struct->execute(array($table_name));
						$struct_res=$struct->fetchAll(PDO::FETCH_NUM);	
					}catch(PDOException $ex)
					{
						echo "Could not read table $table_name: " .$ex->getMessage() ."</br>";
					}
							
					$stmt[$table_name]=$conn->conn->prepare("select * from $table_name where last_updated>?;");
					$stmt[$table_name]->execute(array($last_sync_time));
					$stmt_res=$stmt[$table_name]->fetchAll(PDO::FETCH_NUM);
					
					for($i=0;$i<count($stmt_res);$i++)
					{
						$xmlresponse.="<row>";
						
						for($j=0;$j<count($struct_res);$j++)
						{
							$xmlresponse.="<".$struct_res[$j][0].">";
								$xmlresponse.=$stmt_res[$i][$j];
							$xmlresponse.="</".$struct_res[$j][0].">";
						}
						
						$xmlresponse.="</row>";
					}
					
					$xmlresponse.="</$table_name>";
				}
			}
			
				
			$xmlresponse.="</re_xml>";
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