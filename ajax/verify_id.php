<?php

include_once "../Classes/db.php";
use RetailingEssentials\db_connect;

if(isset($_POST['userid']))
{
	$userid=$_POST['userid'];
	$conn=new db_connect(0);
	$stmt=$conn->conn->prepare("select * from user_profile where username=?");
	$stmt->execute(array($userid));
	
	if($stmt->rowCount()===1)
	{
		echo "match";
	}
	else
	{
		echo "unmatched";
	}
		
}
else if(isset($_POST['email']))
{
	$email=$_POST['email'];
	$conn=new db_connect(0);
	$stmt=$conn->conn->prepare("select * from user_profile where email=?");
	$stmt->execute(array($email));
	
	if($stmt->rowCount()===1)
	{
		echo "match";
	}
	else
	{
		echo "unmatched";
	}
	
}

?>