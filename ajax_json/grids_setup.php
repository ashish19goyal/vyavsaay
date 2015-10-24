<?php

namespace RetailingEssentials;
include_once "../Classes/db.php";
use RetailingEssentials\db_connect;
use \DOMDocument;

	$db_name=$_GET['db_name'];
	
	function grids_json($dbname)
	{
		$conn=new db_connect($dbname);
		
		$json_file=file_get_contents("../db/grids.json");
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
					echo "added grid<br>";
				}catch(PDOException $ex)
				{
					echo "Could not setup table $table_name: " .$ex->getMessage() ."</br>";
				}
			}
		}
	}	

	grids_json($db_name);	
?>