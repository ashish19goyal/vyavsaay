<?php
/*
 * output data format: 
 *	{
 		status:"success/invalid session",
 		types:
 		{
 			delivered:{
 					count:'',
 					status:'success/failed'
 					},
 			RTO delivered:{
 					count:'',
 					status:'success/failed'
 					},
 			RTO picked:{
 				count:'',
 				status:'success/failed'
 			}
 		}
 	}
*/
	session_start();
	
	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;

	$domain=$_POST['domain'];
	$re_access=$_POST['re'];
	$username=$_POST['username'];
	
	$jsonresponse=[];			
	$new_time=time()*1000;
			
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['re']==$re_access)
		{
			$conn=new db_connect("re_user_".$domain);


			//getting last_sync_time			
			$last_delivered_sync_time=0;
			$last_rto_delivered_sync_time=0;
			$last_rto_picked_sync_time=0;
			
			$stmt1=$conn->conn->prepare("select name,value from user_preferences where name in (?,?,?)");
			$stmt1->execute(array('paytm_delivered_sync_time','paytm_rto_delivered_sync_time','paytm_rto_picked_sync_time'));
			$row2=$stmt1->fetch(PDO::FETCH_ASSOC);
			$last_sync_time=$row2['value'];
			
			while ($row=$stmt1->fetch(PDO::FETCH_ASSOC))
			{
				if($row['name']=='paytm_delivered_sync_time')
				{
					$last_delivered_sync_time=$row['value'];
				}
				if($row['name']=='paytm_rto_delivered_sync_time')
				{
					$last_rto_delivered_sync_time=$row['value'];
				}
				if($row['name']=='paytm_rto_picked_sync_time')
				{
					$last_rto_picked_sync_time=$row['value'];
				}
			}
			//////////////////////
			
			
			$stmt=$conn->conn->prepare("select awb_num,order_history from logistics_orders where last_updated>? or last_sync_time>? and channel_name=? and status=?;");
			$stmt->execute(array($last_delivered_sync_time,$last_delivered_sync_time,'PayTm','delivered'));
			$stmt_res=$stmt->fetchAll(PDO::FETCH_ASSOC);

			$delivered_object=[];
			$delivered_object['status_code']="DL";
			$delivered_object['status_description']="SHIPMENT DELIVERED";
			$delivered_object['shipments']=[];
			
			for($i=0;$i<count($stmt_res);$i++)
			{
				$shipment_obj=[];
				$shipment_obj['tracking_number']=$stmt_res[$i]['awb_num'];
				$shipment_obj['delivered_at']=$stmt_res[$i]['order_history'];
				$delivered_object['shipments'][]=$shipment_obj;
			}
			
			//////////////write code for curl calls here///////////
			//////use classes to handle here///////////////////
			
			//////////////////////////////////////////
			
			$delivered_response="{200}";
			$delivered_response_object=json_decode($delivered_response,true);

			$jsonresponse['types']=[];
			if($delivered_response_object[0]=='200' && $delivered_response_object[1]=='Updated Successfully')
			{
				$jsonresponse['types']['delivered']['status']='success';
				$jsonresponse['types']['delivered']['count']=count($stmt_res);
				
				$update_query1="update user_preferences set value=? where name=?";
				$update_stmt=$conn->conn->prepare($update_query1);
				$update_stmt->execute(array($new_time,'paytm_delivered_sync_time'));				
			}
			else
			{
				$jsonresponse['types']['delivered']['status']='failed';
				$jsonresponse['types']['delivered']['response']=$delivered_response_object;				
			}
			
			$jsonresponse['status']='success';				
		}
		else
		{
			$jsonresponse['status']="Invalid session";
		}
	}
	else
	{
		$jsonresponse['status']="Invalid session";
	}
	
	$jsonresponse_string=json_encode($jsonresponse);			
	header("Content-Type:application/json");
	echo $jsonresponse_string;

?>