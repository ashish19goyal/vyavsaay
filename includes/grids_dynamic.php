<?php

	include_once "./Classes/db.php";
	use RetailingEssentials\db_connect;

		$domain=$_SESSION['domain'];
		$db_name="re_user_".$domain;
		$conn=new db_connect($db_name);
		$query="select name,display_name,head_color,back_color from system_grids where status=? order by grid_order asc;";

		$stmt=$conn->conn->prepare($query);
		$stmt->execute(array('active'));
		$struct_res=$stmt->fetchAll(PDO::FETCH_ASSOC);

		echo "<script id='script_grid_metrics'></script>".
			"<div id='home_grid'>".
			"<ul>";
		$hide_string='';	
		$function_array_string='[';
		for($i=0;$i<count($struct_res);$i++)
		{
			echo "<li id='".$struct_res[$i]['name']."_link' onclick=\"grid_click('".$struct_res[$i]['name']."');\" style='background-color:".$struct_res[$i]['back_color']."'>".
				"<a><div style='background-color:".$struct_res[$i]['head_color']."'><b>".$struct_res[$i]['display_name']."</b></div></a>".
				"<ul></ul>".
				"</li>";
			$hide_string.="$('#".$struct_res[$i]['name']."_main').hide();";
			$function_array_string.="'".$struct_res[$i]['name']."',";
		}
		
		echo "</ul>".
			"</div>";
				
		$function_array_string=rtrim($function_array_string,",");
			
		echo "<script type='text/javascript'>";
		echo "function hide_all_grids(){".$hide_string."};";
		echo "system_grids_array=".$function_array_string."]";
		echo "</script>";

?>
