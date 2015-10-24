<?php
	
	include_once "./Classes/db.php";
	use RetailingEssentials\db_connect;
	
		$domain=$_SESSION['domain'];
		$db_name="re_user_".$domain;
		$conn=new db_connect($db_name);
		$query="select * from system_grids where status=?;";
		$stmt=$conn->conn->prepare($query);
		$stmt->execute(array('active'));
		$struct_res=$stmt->fetchAll(PDO::FETCH_ASSOC);
		
		for($i=0;$i<count($struct_res);$i++)
		{
			echo "<div id='".$struct_res[$i]['name']."_main' class='vy_tabs function_main'>";
			echo "<ul>";
				echo "<li><a id='form171_link' href='#form171' onclick='form171_header_ini(); form171_ini();' data-i18n='form.manage_channels'></a></li>";
			echo "</ul>";
			
				include "forms/form171.php";		
			echo "</div>";	
		}		

?>