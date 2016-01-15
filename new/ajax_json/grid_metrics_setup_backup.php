<?php

namespace RetailingEssentials;
include_once "../Classes/db.php";
include_once '../Classes/file_reader.php';
use RetailingEssentials\file_reader;
use RetailingEssentials\db_connect;
use \DOMDocument;
use \PDO;

	function grid_metrics_json($dbname)
	{
		$conn=new db_connect($dbname);
		
		$json_file=file_get_contents("../db/grid_metrics.json");
		$file = json_decode($json_file,true);
		$parent_json=$file['re_xml'];
		
		foreach($parent_json as $table_name => $table)
	    {
			foreach ($table as $row_num => $row)
		    {
				$data_array=Array();
				$q_string="insert into $table_name(";
				
						
				foreach ($row as $column_name => $col_value)
	    		{
					$q_string.=$column_name.",";
				}
					
				$q_string=rtrim($q_string,",");
				$q_string.=") values(";
				foreach ($row as $column_name => $col_value)
	    		{
						$q_string.="?,";
						$data_array[]=$col_value;
				}
				$q_string=rtrim($q_string,",");
				$q_string.=");";
	
				try{
					$stmt=$conn->conn->prepare($q_string);
					$stmt->execute($data_array);
					echo "added grid metric<br>";
				}catch(PDOException $ex)
				{
					echo "Could not setup table $table_name: " .$ex->getMessage() ."</br>";
				}
			}
		}
	}	
	
	function grid_metrics_all()
	{
		$fr=new file_reader("../../Config/config.prop");
		$dbhost=$fr->attributes["host"];
		$dbuser = $fr->attributes["user"];
		$dbpass = $fr->attributes["password"];
		
		$info_conn=new db_connect('information_schema');
		$get_query="select distinct table_schema from information_schema.columns where table_schema like ?";
		$get_stmt=$info_conn->conn->prepare($get_query);
		$get_stmt->execute(array('%re_user%'));
		$get_res=$get_stmt->fetchAll(PDO::FETCH_ASSOC);
		
		for($i=0;$i<count($get_res);$i++)
		{
			$dbname=$get_res[$i]['table_schema'];
			grid_metrics_json($dbname);
		}
	}

	if(isset($_GET['db_name']))
	{
		$db_name=$_GET['db_name'];
		grid_metrics_json($db_name);
	}
	else if(isset($_GET['all']))
	{
		grid_metrics_all();
	}
?>