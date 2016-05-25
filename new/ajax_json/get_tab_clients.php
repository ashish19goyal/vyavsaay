<?php
/*
 *	output data format: 
 *			{
 				status:'',
 				clients:
 				[
 					0:'value1',
 					1:'value2',
 					2:'value3'
 				]
 			}
*/

	session_start();
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	
	$tab_name=$_POST['data'];
	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$read_access=$_POST['re'];	

	$response_object=[];
			
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['domain']=='vyavsaay' && $_SESSION['username']==$username && $_SESSION['re']==$read_access)
		{
			///formulating the query
			$conn=new db_connect(0);
			$select_query="select username from user_profile where status=?";
			$select_stmt=$conn->conn->prepare($select_query);

			$select_stmt->execute(array('active'));
			$result=$select_stmt->fetchAll(PDO::FETCH_ASSOC);
			
			$tab_query="select count(id) from user_preferences where name=? and value=? and type in (?,?);";
			
			$response_object['status']='success';
			$response_rows=[];
	
			for($i=0;$i<count($result);$i++)
			{
				$database="re_user_".$result[$i]['username'];
				$conn=new db_connect($database);
				$stmt=$conn->conn->prepare($tab_query);
				$values_array=array($tab_name,'checked','form','report');
				$stmt->execute($values_array);
				$struct_res=$stmt->fetch(PDO::FETCH_NUM);
			
				if($struct_res[0]>0)
				{
					$response_rows[]=$result[$i]['username'];
				}
			}
			
			$response_object['clients']=$response_rows;
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