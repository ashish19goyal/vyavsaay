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
		$query="select * from system_grids where status=?;";
		$query2="select * from ques_struct where status=?;";
		$stmt=$conn->conn->prepare($query);
		$stmt->execute(array('active'));
		$struct_res=$stmt->fetchAll(PDO::FETCH_ASSOC);
		
		$stmt2=$conn->conn->prepare($query2);
		$stmt2->execute(array('active'));
		$struct_res2=$stmt2->fetchAll(PDO::FETCH_ASSOC);
		
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
				
				for($y=0;$y<count($struct_res2);$y++)
				{
					if($struct_res2[$y]['func']==$struct_res[$i]['name'])
					{
						echo "<li><a id='".$struct_res2[$y]['name']."_link' href='#".$struct_res2[$y]['name']."' onclick=initialize_questionnaires('".$struct_res2[$y]['id']."','".$struct_res2[$y]['name']."');>".$struct_res2[$y]['display_name']."</a></li>";
					}
				}
				
			echo "</ul>";
			
				for($x=0;$x<count($elements_array);$x++)
				{
					include $elements_array[$x]['type']."/".$elements_array[$x]['name'].".php";
				}
	
				for($y=0;$y<count($struct_res2);$y++)
				{
					if($struct_res2[$y]['func']==$struct_res[$i]['name'])
					{
						echo "<div id='".$struct_res2[$y]['name']."' class='function_detail'></div>";
					}
				}
			echo "</div>";	
		}		
	}
?>