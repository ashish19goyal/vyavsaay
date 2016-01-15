<?php
/*
 * input data format: 
 *	[
 		{
 			id='',		
			table_name='',
			type='',
			data_id='',
			data_xml='',
			last_updated='',
			link_to='',
			user_display='',
			title='',
			notes='',
			updated_by=''
 		},
 		{
 			id='',		
			table_name='',
			type='',
			data_id='',
			data_xml='',
			last_updated='',
			link_to='',
			user_display='',
			title='',
			notes='',
			updated_by=''
 		}
 	]	
 *		
 * output data format: 
 *	[
 		0:'',
 		1:'',
 		2:'',
 	]	
 *		

*/

	session_start();

	include_once "../Classes/sms.php";
	include_once "../Classes/mailer.php";	
	include_once "../Classes/db.php";
	include_once "../Classes/s3_objects.php";

	use RetailingEssentials\send_mailer;
	use RetailingEssentials\db_connect;
	use RetailingEssentials\send_sms;
	use RetailingEssentials\s3_object;
	
	//username required to identify the database
	$domain=$_POST['domain'];
	$del_access=$_POST['del'];
	$username=$_POST['username'];
	$up_access=$_POST['up'];
	$cr_access=$_POST['cr'];
	$run_daemons=$_POST['run_daemons'];
	$last_sync=$_POST['last_sync'];
	
	$post_data=$_POST['data'];
	$post_data=preg_replace('/[^\x{0009}\x{000a}\x{000d}\x{0020}-\x{D7FF}\x{E000}-\x{FFFD}]+/u',' ',$post_data);
	//echo $post_data;
	
	if(isset($_SESSION['session']))
	{
		if($_SESSION['session']=='yes' && $_SESSION['domain']==$domain && $_SESSION['username']==$username && $_SESSION['cr']==$cr_access && $_SESSION['up']==$up_access && $_SESSION['del']==$del_access)
		{
			$conn=new db_connect("re_user_".$domain);
			$ids_for_update=[];
			
			$json_input=json_decode($post_data,true);
			
			$sync_time=1000*time();
			$q_string="insert into activities (id,tablename,type,data_id,data_xml,last_updated,status,link_to,user_display,title,notes,updated_by,last_sync_time) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
			$stmt=$conn->conn->prepare($q_string);
				
			foreach($json_input as $row)
			{
				try
				{
					$id='';		
					$table_name='';
					$type='';
					$data_id='';
					$data_xml='';
					$last_updated='';
					$link_to='';
					$user_display='';
					$title='';
					$notes='';
					$updated_by='';
					
					if(isset($row['id']))
					{
						$id=$row['id'];
					}
					if(isset($row['tablename']))
					{
						$table_name=$row['tablename'];
					}
					if(isset($row['type']))
					{
						$type=$row['type'];
					}
					if(isset($row['data_id']))
					{
						$data_id=$row['data_id'];
					}
					if(isset($row['last_updated']))
					{
						$last_updated=$row['last_updated'];
					}
					if(isset($row['link_to']))
					{
						$link_to=$row['link_to'];
					}
					if(isset($row['user_display']))
					{
						$user_display=$row['user_display'];
					}
					if(isset($row['title']))
					{
						$title=$row['title'];
					}
					if(isset($row['notes']))
					{
						$notes=$row['notes'];
					}
					if(isset($row['updated_by']))
					{
						$notes=$row['updated_by'];
					}
					if(isset($row['data_xml']))
					{
						$data_xml=$row['data_xml'];
					}
					
					try{
						if($user_display=='yes')
							$stmt->execute(array($id,$table_name,$type,$data_id,$data_xml,$last_updated,'synced',$link_to,$user_display,$title,$notes,$updated_by,$sync_time));
					}
					catch(PDOException $e)
					{
					/*	echo $e;
						echo "activity id=".$id."\n";
					*/
					}		
					if($table_name!="")
					{		
						$q_string1="select last_updated from $table_name where id=?;";
						$stmt1=$conn->conn->prepare($q_string1);
						$stmt1->execute(array($data_id));
						
						$result1=$stmt1->fetch(PDO::FETCH_ASSOC);
						$server_last_update=$result1['last_updated'];
						
						$xmlresponse_xml=new DOMDocument();
						$xmlresponse_xml->loadXML($data_xml);
						$data=$xmlresponse_xml->documentElement;
									
						if($data->hasChildNodes()) 
						{
							if($server_last_update<$last_updated || !($server_last_update))
							{
								$q_string2="";
								
								switch($type)
								{
									case 'create': 
										$data_array=array();
										$q_string2="insert into $table_name (";
										foreach($data->childNodes as $column)
										{
											if($column->nodeName!='#text')
												$q_string2.=$column->nodeName.",";
										}
										//$q_string2=rtrim($q_string2,",");
										$q_string2.="last_sync_time) values(";
																			
										foreach($data->childNodes as $column)
										{
											if($column->nodeName!='#text')
											{
												$q_string2.="?,";
												$data_array[]=$column->nodeValue;
												//echo $column->nodeValue;
											}
										}
										//$q_string2=rtrim($q_string2,",");
										$q_string2.="?);";
										$data_array[]=$sync_time;
										
										//echo $q_string2;								
										$stmt2=$conn->conn->prepare($q_string2);
										
										try{
											$stmt2->execute($data_array);
										}
										catch(PDOException $e)
										{
											
										}
										break;
									case 'update': 
										$q_string2="update $table_name set ";
										$data_array=array();
										foreach($data->childNodes as $column)
										{
											if($column->nodeName!='#text')
											{
												$q_string2.=$column->nodeName."=?,";
												$data_array[]=$column->nodeValue;
											}
										}
										//$q_string2=rtrim($q_string2,",");
										$q_string2.="last_sync_time=? where id=?";
										$data_array[]=$sync_time;
										
										$data_array[]=$data_id;
										$stmt2=$conn->conn->prepare($q_string2);
										try{
											$stmt2->execute($data_array);
										}
										catch(PDOException $e)
										{
										}
										break;
									case 'delete': $q_string2="delete from $table_name where id=?";
										$stmt2=$conn->conn->prepare($q_string2);
										$stmt2->execute(array($data_id));
										break;
								}	
							}
							$ids_for_update[]=$id;
						}
					}
				}
				catch(Exception $x)
				{
				}
			}	
			if($run_daemons=='yes')
			{				
				$sms_instance=new send_sms();
				
				$sms_string="select value from user_preferences where name=?;";
				$sms_stmt=$conn->conn->prepare($sms_string);
				$sms_stmt->execute(array('sms_sender_id'));
				$sms_result=$sms_stmt->fetch(PDO::FETCH_ASSOC);
				$sender_id=$sms_result['value'];
								
				if($sender_id!="")
					$sms_instance->sender_id($sender_id);
				$sms_instance->send_stored_sms($domain);
				
				$email_instance=new send_mailer();
				$email_instance->send_stored_mailer($domain);

				$s3_instance=new s3_object();
				$s3_instance->transfer_stored_objects($domain);
			}
			
			$return_data=json_encode($ids_for_update);
			header("Content-Type:application/json");
			echo $return_data;
		}
		else
		{
			echo "Invalid session";
		}
	}
	else
	{
		echo "Invalid session";
	}
?>