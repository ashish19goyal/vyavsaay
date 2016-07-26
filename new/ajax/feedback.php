<?php

	include_once "../Classes/db.php";
	use RetailingEssentials\db_connect;

	$domain=$_POST['domain'];
	$data_id=$_POST['id'];
	$rating=$_POST['rating'];
	$comment=$_POST['comment'];

	$db_name="re_user_".$domain;
	$conn=new db_connect($db_name);

	$query="update feedback set rating=?, detail=?, last_updated=? where id=?";
	$stmt=$conn->conn->prepare($query);
	$stmt->execute(array($rating,$comment,(1000*time()),$data_id));

	$response_object = array("status"=>"saved");
	$jsonresponse=json_encode($response_object);
	header ("Content-Type:application/json");
	echo $jsonresponse;
?>
