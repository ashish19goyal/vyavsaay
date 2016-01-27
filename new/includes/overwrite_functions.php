	<?php
	
		include_once "./Classes/db.php";
		use RetailingEssentials\db_connect;
	
		$domain="";
		
		if(isset($_GET['dn']))
		{
			$domain=$_GET['dn'];
		}

		$ow_func="<script>";

		if(isset($_SESSION['domain']) || $domain!="")
		{
			if($domain=="")
			{$domain=$_SESSION['domain'];}

			$db_name="re_user_".$domain;
			$conn=new db_connect($db_name);
			$query="select function_def from system_overwrite_func where status=?";

			$stmt=$conn->conn->prepare($query);
			$stmt->execute(array('active'));
			$struct_res=$stmt->fetchAll(PDO::FETCH_ASSOC);

			foreach($struct_res as $res)
			{
				$ow_func.=$res['function_def'];
			}
		}
		$ow_func.="</script>";

		echo $ow_func;
	?>