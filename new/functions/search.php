<?php
	
	include_once "./Classes/db.php";
	use RetailingEssentials\db_connect;

	if(isset($_SESSION['domain']))
	{	
		$domain=$_SESSION['domain'];
		$db_name="re_user_".$domain;
		$conn=new db_connect($db_name);
		$query="select * from system_search where status=? order by id desc;";
		$stmt=$conn->conn->prepare($query);
		$stmt->execute(array('active'));
		$struct_res=$stmt->fetchAll(PDO::FETCH_ASSOC);
		
		$search_ini="<script type='text/javascript'>";
		$search_ini.="function search_ini(tablename){var searchStr=document.getElementById('search_box').value;".	
					"$('#search_results_top').html('');".
					"$('#search_results').html('');".
					"var length=searchStr.length;".
					"if(length>=3){";
		$search_ini.="var new_search_array=searchStr.split(' ');";			

		$search_ini.="var search_array=[searchStr];";
		$search_ini.="new_search_array.forEach(function(new_search_string)".
					"{".
						"if(new_search_string.length>=3)".
							"search_array.push(new_search_string)".
					"});";			
		
		for($i=0;$i<count($struct_res);$i++)
		{
			$search_ini.="if(typeof tablename=='undefined' || tablename=='".$struct_res[$i]['table_name']."'){".
								"var search".$i."_columns=new Object();".
								"search".$i."_columns.count=".$struct_res[$i]['result_count'].";".
								"search".$i."_columns.start_index=0;".
								"search".$i."_columns.data_store='".$struct_res[$i]['table_name']."';".		
								"search".$i."_columns.indexes=[{index:'id'},";
			$search_ini.="{index:'".$struct_res[$i]['search_column']."','approx_array':search_array},";
			//$search_ini.="{index:'".$struct_res[$i]['search_column']."'},";						
			$return_columns=json_decode($struct_res[$i]['return_columns'],true);
			for($x=0;$x<count($return_columns);$x++)
			{
				$search_ini.="{index:'".$return_columns[$x]['column']."'},";
			}
			$search_ini=rtrim($search_ini,",");
			$search_ini.="];";
			
			$search_ini.="read_json_rows('',search".$i."_columns,function(results){".
						"var top_result_html='';".
						"var result_html='';".
						"results.forEach(function(result)".
						"{".
							"result.search_priority=100;".
							"for(var i in search_array)".
							"{".
								"if(result['".$struct_res[$i]['search_column']."'].indexOf(search_array[i])>-1)".
								"{".
									"result.search_priority=i;".
									"break;".
								"}".
							"}".
						"});".
						"results.sort(function(a,b)".
						"{".
							"if(parseInt(a.search_priority)>parseInt(b.search_priority))".
							"{	return 1;}".
							"else". 
							"{	return -1;}".
						"});".
						"var result_counter=0;".
						"results.forEach(function(result){".
							"result_counter++;".
							"var record_detail='".$struct_res[$i]['result_detail']."';";
							for($x=0;$x<count($return_columns);$x++)
							{
								$search_ini.="if(result.".$return_columns[$x]['column']."!='' && result.".$return_columns[$x]['column']."!=null)".
								"{record_detail=record_detail.replace(/".$return_columns[$x]['key']."/g,result.".$return_columns[$x]['column'].");}".
								"else".								
								"{record_detail=record_detail.replace(/".$return_columns[$x]['key']."/g,'');}";
							}							
							$search_ini.="if(record_detail!='' && record_detail!=null && record_detail!='null'){";
							if($struct_res[$i]['table_name']=='activities')
							{
								$search_ini.="if(result_counter==1)".
										"{top_result_html+=\"<div class='search_detail'><b>".$struct_res[$i]['result_title']."</b></br><a onclick=element_display('\"+result.data_id+\"','\"+result.link_to+\"');>\"+record_detail+\"</a><input type='button' class='doc_search_icon' title='".$struct_res[$i]['search_only_text']."' onclick=search_ini('".$struct_res[$i]['table_name']."');></div>\";}".
										"else".
										"{result_html+=\"<div class='search_detail'><b>".$struct_res[$i]['result_title']."</b></br><a onclick=element_display('\"+result.data_id+\"','\"+result.link_to+\"');>\"+record_detail+\"</a><input type='button' class='doc_search_icon' title='".$struct_res[$i]['search_only_text']."' onclick=search_ini('".$struct_res[$i]['table_name']."');></div>\";}".
										"}";
							}
							else
							{
								$search_ini.="if(result_counter==1)".
									"{top_result_html+=\"<div class='search_detail'><b>".$struct_res[$i]['result_title']."</b></br><a onclick=element_display('\"+result.id+\"','".$struct_res[$i]['result_form']."');>\"+record_detail+\"</a><input type='button' class='doc_search_icon' title='".$struct_res[$i]['search_only_text']."' onclick=search_ini('".$struct_res[$i]['table_name']."');></div>\";}".
									"else".
									"{result_html+=\"<div class='search_detail'><b>".$struct_res[$i]['result_title']."</b></br><a onclick=element_display('\"+result.id+\"','".$struct_res[$i]['result_form']."');>\"+record_detail+\"</a><input type='button' class='doc_search_icon' title='".$struct_res[$i]['search_only_text']."' onclick=search_ini('".$struct_res[$i]['table_name']."');></div>\";}".
									"}";									
							}
						$search_ini.="});".
						"$('#search_results_top').append(top_result_html);});}";
						"$('#search_results').append(result_html);});}";
		}

		$search_ini.="}else{".
					"$('#search_results').html('Type atleast 3 letters to find any results');}};";
		$search_ini.="</script>";
		echo $search_ini;
	}
?>

<div id='search_results_box'>
	<div style='margin:auto;text-align:center;'>Search Results</div>
	<div id="search_results_top"></div>
	<div id="search_results"></div>
</div>