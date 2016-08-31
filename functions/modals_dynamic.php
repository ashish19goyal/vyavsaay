<?php

	include_once "./Classes/db.php";
	use RetailingEssentials\db_connect;

	$domain="";
	
	if(isset($_GET['dn']))
	{
		$domain=$_GET['dn'];
	}

	if(isset($_SESSION['domain']) || $domain!="")
	{
		if($domain=="")
		{	$domain=$_SESSION['domain'];}
		
		$db_name="re_user_".$domain;
		$conn=new db_connect($db_name);
		$query="select box_content,function_def from system_popboxes where status=?";
		
		$stmt=$conn->conn->prepare($query);
		$stmt->execute(array('active'));
		$struct_res=$stmt->fetchAll(PDO::FETCH_ASSOC);

		$modal_content="";	
		$script_content="<script>";	

		for($i=0;$i<count($struct_res);$i++)
		{
			$modal_content.=$struct_res[$i]['box_content'];	
			$script_content.=$struct_res[$i]['function_def'];
		}

		$script_content.="</script>";
		
		echo "<div class='modal_forms'>";
		echo $modal_content;
		echo $script_content;
		echo "</div>";
	}
?>