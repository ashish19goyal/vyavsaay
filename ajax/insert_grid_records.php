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
	
	insert_grid_metric_records($db_name);	
?>