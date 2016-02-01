<?php

	session_start();
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	
	$tablename=$_POST['table'];
	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$read_access=$_POST['re'];
	
	$response_object=[];
			
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['re']==$read_access)
		{
			$info_conn=new db_connect('information_schema');
			$get_array=array();			
			$get_query="select table_name,column_name,column_type from information_schema.columns where table_schema=? order by table_name";
			$get_array[]="re_user_".$domain;
			if($tablename!="")
			{
				$get_query="select table_name,column_name,column_type from information_schema.columns where table_schema=? and table_name like ? order by table_name";
				$get_array[]="%".$tablename."%";
			}
			$get_stmt=$info_conn->conn->prepare($get_query);
			$get_stmt->execute($get_array);
			$get_res=$get_stmt->fetchAll(PDO::FETCH_ASSOC);
			
			$response_object['data']=array();
			$table_obj="";
			$previous_table="";
			
			foreach($get_res as $result)
			{
				if($previous_table!=$result['table_name'])
				{
					if($table_obj!="")
						$response_object['data'][]=$table_obj;
					
					$table_obj=array();
					$table_obj['tablename']=$result['table_name'];
    				$table_obj['columns']=array();
    			}
    			
    			$column_obj=array();
    			$column_obj['colname']=$result['column_name'];
    			$column_obj['coltype']=$result['column_type'];
    			$table_obj['columns'][]=$column_obj;
				$previous_table=$result['table_name'];				
			}
			if($table_obj!="")
				$response_object['data'][]=$table_obj;
			
			$response_object['status']='success';		
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