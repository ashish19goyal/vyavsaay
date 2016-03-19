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
		$query="select * from system_objects where status=?;";
		$stmt=$conn->conn->prepare($query);
		$stmt->execute(array('active'));
		$struct_res=$stmt->fetchAll(PDO::FETCH_ASSOC);
		
		echo "<div class='vyavsaay_objects'>";
		$obj_cases="";
		$obj_function="";
		foreach($struct_res as $res)
		{
			$obj_cases.="case '".$res['name']."': initialize_object_".$res['name']."(obj_name,obj_id);break;";
			
			$obj_function.="function initialize_object_".$res['name']."(obj_name,obj_id){";
		
			echo "<div class='portlet box grey-cascade' tabindex='-1' id='vyavsaay_object_".$res['name']."'>".
						"<div class='portlet-title'>".
							"<div class='caption'>".
								//"<i class='fa fa-user'></i>".
                                $res['display_name']. 
							"</div>".
							"<div class='tools'>".
								//"<a onclick=print_object('".$res['name']."');><i class='fa fa-print link' title='Print'></i></a>".
								"<a class='fullscreen' id='object_".$res['name']."'> </a>".
							"</div>".
						"</div>".
						"<div class='portlet-body'>";
			
			$elements_array=json_decode($res['elements'],true);
			
			foreach($elements_array as $element)
			{
				$obj_function.="initialize_object_".$res['name']."_".$element['name']."(obj_name,obj_id);";
		
				echo "<div class=".$element['width'].">".
						"<div class='portlet solid ".$element['color']."'>".
							"<div class='portlet-title'>".
								"<div class='caption'>".
									$element['display_name']. 
								"</div>".
								"<div class='tools'>".
									"<a class='expand'> </a>".
                        "</div>".
							"</div>".
							"<div class='portlet-body ".$element['collapse']."' style='height:".$element['height']."'>";
					
				include "objects/".$res['name']."/".$element['name'].".php";

				echo "</div></div></div>";						
			}
			
			$obj_function.="};";
		
			echo "</div></div>";	
		}

		$function_data="<script>".
								$obj_function.
								"function initialize_object(object_type,obj_name,obj_id)".
									"{switch(object_type){".
										$obj_cases.		
									"}}".
							"</script>";
		echo $function_data;
		echo "</div>";
		
	}
?>