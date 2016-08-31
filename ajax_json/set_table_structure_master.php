<?php

	session_start();
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	
	$tablename=$_POST['table'];
	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$cr_access=$_POST['cr'];
	$up_access=$_POST['up'];
	$del_access=$_POST['del'];
	$action=$_POST['action'];
	
	$columnname="";
	if(isset($_POST['column']))
	{
		$columnname=$_POST['column'];
	}
	
	$columntype="";
	if(isset($_POST['type']))
	{
		$columntype=$_POST['type'];
	}

	$response_object=[];
			
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['domain']=='vyavsaay' && $_SESSION['username']==$username && $_SESSION['cr']==$cr_access && $_SESSION['up']==$up_access && $_SESSION['del']==$del_access)
		{
			$info_conn=new db_connect('information_schema');
			$get_query="select distinct table_schema from information_schema.columns where table_schema like ?";
			$get_stmt=$info_conn->conn->prepare($get_query);
			$get_stmt->execute(array('%re_user%'));
			$get_res=$get_stmt->fetchAll(PDO::FETCH_ASSOC);

			$query="";
			switch($action)
			{
				case 'delete_table':$query="drop table $tablename";
											break;
				case 'delete_column':$query="alter table $tablename drop column $columnname";
											break;
				case 'create_table':$query="create table $tablename (id BIGINT NOT NULL AUTO_INCREMENT, last_updated BIGINT, last_sync_time BIGINT, PRIMARY KEY (id));";
											break;
				case 'create_column':$query="alter table $tablename add $columnname $columntype";
											break;
				case 'update_column':$query="alter table $tablename modify column $columnname $columntype";
											break;
			}
			
			for($i=0;$i<count($get_res);$i++)
			{
				$database=$get_res[$i]['table_schema'];
				$conn=new db_connect($database);
				
				$stmt=$conn->conn->exec($query);
			}
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