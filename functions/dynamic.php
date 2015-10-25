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
			//echo $struct_res[$i]['elements'];			
			$elements_array=json_decode($struct_res[$i]['elements'],true);
			//echo count($elements_array);
				for($x=0;$x<count($elements_array);$x++)
				{
					echo "<li><a id='".$elements_array[$x]['name']."_link' href='#".$elements_array[$x]['name']."' onclick='".$elements_array[$x]['onclick']."'>".$elements_array[$x]['display_name']."</a></li>";
				}
			echo "</ul>";
			
				for($x=0;$x<count($elements_array);$x++)
				{
					include $elements_array[$x]['type']."/".$elements_array[$x]['name'].".php";
				}
			echo "</div>";	
		}		

?>