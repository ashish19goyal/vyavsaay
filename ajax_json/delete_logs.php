<?php
/*	input data format: 
 * 			{
 				from_time:'',
 				to_time:'',	
 			}

 *	output data format: 
 *			{
 				from_time:'',
 				to_time:'',
 				status:''
 			}
*/

	session_start();
	
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;
	
	$input_data=$_POST['data'];
	$domain=$_POST['domain'];
	$username=$_POST['username'];
	$del_access=$_POST['del'];
	
	$input_object=json_decode($input_data,true);
    $from_time=0;
    if(isset($input_object['from_time']))
    {
        $from_time=$input_object['from_time'];
    }

    $to_time=time()*1000;
    if(isset($input_object['to_time']))
    {
        $to_time=$input_object['to_time'];
    }

	$response_object=[];
    $response_object['from_time']=$from_time;
    $response_object['to_time']=$to_time;

	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['del']==$del_access)
		{
			$database="re_user_".$domain;
			$conn=new db_connect($database);
			$data_array=array();

			$query="delete from activities where last_updated >=? and last_updated <=?";
            $stmt=$conn->conn->prepare($query);
            $stmt->execute(array($from_time,$to_time));
            	
            $response_object['status']='logs deleted';
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