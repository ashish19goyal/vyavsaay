<?php

namespace RetailingEssentials;
include_once "../Classes/db.php";
include_once '../Classes/file_reader.php';
use RetailingEssentials\file_reader;
use RetailingEssentials\db_connect;
use \DOMDocument;
use \PDO;

	function static_modals_php($dbname,$table_name)
	{
		$conn=new db_connect($dbname);
		
		$js_file=file_get_contents("../db/static_modals.php");
		$grids_array = explode('/***function limiter***/',$js_file);
		
		foreach($grids_array as $i => $grid_string)
	    {
	    	$grid_string=str_replace("\n","",$grid_string);
	    	$grid_string=str_replace("\t","",$grid_string);
	    	$grid_string=str_replace("/*","",$grid_string);
	    	$grid_string=str_replace("*/","",$grid_string);
	    	$grid_object_array=explode('*@*',$grid_string);

			$data_array=Array();
			$q_string="insert into ".$table_name."(";
					
			foreach ($grid_object_array as $x => $col_value)
    		{
    			$col_array=explode('*:*',$col_value);
				$q_string.=$col_array[0].",";
				$data_array[]=$col_array[1];
			}

			$q_string=rtrim($q_string,",");
			$q_string.=") values(";
			foreach ($grid_object_array as $x => $col_value)
    		{
					$q_string.="?,";
			}
			$q_string=rtrim($q_string,",");
			$q_string.=");";

			try{
				$stmt=$conn->conn->prepare($q_string);
				$stmt->execute($data_array);
				echo "added static modal form<br>";
			}catch(PDOException $ex)
			{
				echo "Could not setup table $table_name: " .$ex->getMessage() ."</br>";
			}	
		}
	}	
	
	function static_modals_all()
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
			static_modals_php($dbname,'system_popboxes');
		}
	}

	if(isset($_GET['db_name']))
	{
		$db_name=$_GET['db_name'];
		static_modals_php($db_name,'system_popboxes');
	}
	else if(isset($_GET['all']))
	{
		static_modals_all();
	}
?>