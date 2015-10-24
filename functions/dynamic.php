<?php
	
	include_once "./Classes/db.php";
	use RetailingEssentials\db_connect;
	
		$domain=$_SESSION['domain'];
		$db_name="re_user_".$domain;
		$conn=new db_connect($db_name);
		$query="select * from user_preferences where value=? and (type=? or type=?)";
		$stmt=$conn->conn->prepare($query);
		$stmt->execute(array('checked','form','report'));
		$struct_res=$stmt->fetchAll(PDO::FETCH_ASSOC);
		
		$master_conn=new db_connect(0);		
		$func_query="select * from grids where status=?";
		$func_stmt=$master_conn->conn->prepare($func_query);
		$func_stmt->execute(array('active'));
		$func_struct_res=$func_stmt->fetchAll(PDO::FETCH_ASSOC);
		
		for($i=0;$i<count($func_struct_res);$i++)
		{
			echo "<div id='".$func_struct_res[$i]['name']."_main' class='vy_tabs function_main'>";
			echo "<ul>";
				echo "<li><a id='form171_link' href='#form171' onclick='form171_header_ini(); form171_ini();' data-i18n='form.manage_channels'></a></li>";
			echo "</ul>";
			
				include "forms/form171.php";		
			echo "</div>";	
		}		

?>