<?php
session_start();

include_once "../Classes/db.php";
use RetailingEssentials\db_connect;


	$status="failed_auth";
	$domain=$_POST['domain'];
	$pass=$_POST['pass'];
	$user=$_POST['user'];
	
	try 
	{
		$conn=new db_connect("re_user_".$domain);
		$stmt=$conn->conn->prepare("select password from accounts where username=?");
		$stmt->execute(array($user));
		
		if(!$stmt || $stmt->rowCount()!=1)
		{
			$status="failed_auth";
		}
		else
		{
			$row=$stmt->fetch(PDO::FETCH_ASSOC);
			$pass_hash=$row['password'];
			if(!password_verify($pass,$pass_hash))
			{
				$status="failed_auth";
			}
			else	
			{
				$status="successful";
			
				$_SESSION['session']='yes';
				$_SESSION['domain']=$domain;
				$_SESSION['username']=$user;
				
				$session_var="<session>";
				
				$stmt=$conn->conn->prepare("select name,value from user_preferences where type in (?,?,?,?) and status=?");
				$stmt->execute(array('template','other','accounting','hidden','active'));
				while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
				{
					$session_var.="<".$row['name'].">";
					$session_var.=$row['value'];
					$session_var.="</".$row['name'].">";
				}
				
				/////setting forms and reports session variables for selective display
				$forms="";
				$stmt1=$conn->conn->prepare("select name from user_preferences where type=? and value=? and status=?");
				$stmt1->execute(array('form','checked','active'));
				while ($row=$stmt1->fetch(PDO::FETCH_ASSOC))
				{
					$forms.=$row['name']."-";
				}
				$session_var.="<forms>";
				$session_var.=$forms;
				$session_var.="</forms>";
				
				$reports="";
				$stmt1=$conn->conn->prepare("select name from user_preferences where type=? and value=? and status=?");
				$stmt1->execute(array('report','checked','active'));
				while ($row=$stmt1->fetch(PDO::FETCH_ASSOC))
				{
					$reports.=$row['name']."-";
				}
				$session_var.="<reports>";
				$session_var.=$reports;
				$session_var.="</reports>";
				
				$_SESSION['forms']=$forms;
				$_SESSION['reports']=$reports;
				
				//////////////////////////////////////////////////////
				
				/////////setting access control session variables
				$read_access="";
				$stmt1=$conn->conn->prepare("select c.element_id from access_control c where c.username=? and c.re=? and c.status=? union select b.element_id from user_role_mapping a, access_control b where b.username=a.role_name and a.username=? and b.re=? and b.status=?");
				$stmt1->execute(array($user,'checked','active',$user,'checked','active'));
				while ($row=$stmt1->fetch(PDO::FETCH_ASSOC))
				{
					$read_access.=$row['element_id']."-";
				}
				$session_var.="<re>";
				$session_var.=$read_access;
				$session_var.="</re>";
				
				$create_access="";
				$stmt1=$conn->conn->prepare("select c.element_id from access_control c where c.username=? and c.cr=? and c.status=? union select b.element_id from user_role_mapping a, access_control b where b.username=a.role_name and a.username=? and b.cr=? and b.status=?");
				$stmt1->execute(array($user,'checked','active',$user,'checked','active'));
				while ($row=$stmt1->fetch(PDO::FETCH_ASSOC))
				{
					$create_access.=$row['element_id']."-";
				}
				$session_var.="<cr>";
				$session_var.=$create_access;
				$session_var.="</cr>";
				
				$update_access="";
				$stmt1=$conn->conn->prepare("select c.element_id from access_control c where c.username=? and c.up=? and c.status=? union select b.element_id from user_role_mapping a, access_control b where b.username=a.role_name and a.username=? and b.up=? and b.status=?");
				$stmt1->execute(array($user,'checked','active',$user,'checked','active'));
				while ($row=$stmt1->fetch(PDO::FETCH_ASSOC))
				{
					$update_access.=$row['element_id']."-";
				}
				$session_var.="<up>";
				$session_var.=$update_access;
				$session_var.="</up>";
				
				$del_access="";
				$stmt1=$conn->conn->prepare("select c.element_id from access_control c where c.username=? and c.del=? and c.status=? union select b.element_id from user_role_mapping a,access_control b where b.username=a.role_name and a.username=? and b.del=? and b.status=?");
				$stmt1->execute(array($user,'checked','active',$user,'checked','active'));
				while ($row=$stmt1->fetch(PDO::FETCH_ASSOC))
				{
					$del_access.=$row['element_id']."-";
				}
				$session_var.="<del>";
				$session_var.=$del_access;
				$session_var.="</del>";
				
				$_SESSION['re']=$read_access;
				$_SESSION['cr']=$create_access;
				$_SESSION['up']=$update_access;
				$_SESSION['del']=$del_access;
				
				//////setting username and name
				$stmt2=$conn->conn->prepare("select staff.name,staff.acc_name from staff,accounts where accounts.username=? and staff.acc_name=accounts.acc_name union select customers.name,customers.acc_name from customers,accounts where accounts.username=? and customers.acc_name=accounts.acc_name union select suppliers.name,suppliers.acc_name from suppliers,accounts where accounts.username=? and suppliers.acc_name=accounts.acc_name");
				$stmt2->execute(array($user,$user,$user));
				$row2=$stmt2->fetch(PDO::FETCH_ASSOC);
				$session_var.="<username>";
				$session_var.=$user;
				$session_var.="</username>";
				$session_var.="<name>";
				$session_var.=$row2['name'];
				$session_var.="</name>";
				$session_var.="<acc_name>";
				$session_var.=$row2['acc_name'];
				$session_var.="</acc_name>";

				$session_var.="</session>";
				$status=$session_var;
				$_SESSION['name']=$row2['name'];
			}
		}
	}
	catch(PDOException $ex)
	{
		$status="failed_auth";
	}
	if($status!="failed_auth")
	{
		header ("Content-Type:text/xml");
	}
	echo $status;

?>