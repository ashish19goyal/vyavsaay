<?php

namespace RetailingEssentials;
include_once "../Classes/db.php";
use RetailingEssentials\db_connect;
use \DOMDocument;

	$db_name=$_GET['db_name'];
	
	function insert_grid_metric_records($dbname)
	{
		$conn=new db_connect($dbname);

		$db_schema_xml=new \DOMDocument();
		
		$db_schema_xml->load("../db/grid_metrics.xml");
		$db_schema=$db_schema_xml->documentElement;
		
		foreach($db_schema->childNodes as $table)
		{
			$table_name=$table->nodeName;
			if($table_name!='#text')
			{
				foreach($table->childNodes as $row)
				{
					$data_array=Array();
					$q_string="insert into $table_name(";
					
					if($row->nodeName!='#text')
					{		
						foreach($row->childNodes as $column)
						{
							if($column->nodeName!='#text' && $column->nodeName!='#comment')
							{
								$q_string.=$column->nodeName.",";
							}
						}
							
						$q_string=rtrim($q_string,",");
						$q_string.=") values(";
						foreach($row->childNodes as $column)
						{
							if($column->nodeName!='#text' && $column->nodeName!='#comment')
							{
								$q_string.="?,";
								$data_array[]=$column->nodeValue;
							}
						}
						$q_string=rtrim($q_string,",");
						$q_string.=");";
			
						try{
							$stmt=$conn->conn->prepare($q_string);
							$stmt->execute($data_array);
						}catch(PDOException $ex)
						{
							echo "Could not setup table $table_name: " .$ex->getMessage() ."</br>";
						}
						//echo "data added to master table";
					}
				}
			}
		}
	}	
	
	function insert_grid_metric_records_json($dbname)
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

	insert_grid_metric_records_json($db_name);	
?>