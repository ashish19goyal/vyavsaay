<div id='search_results_box'>
	<h3 class="page-title">Search Results</h3>
	<div class="row">
		<div class="col-md-12">
			<div class="tabbable-line tabbable-full-width">
				<ul class="nav nav-tabs">

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
		
		$search_tab_links="";
		$search_tab_content="";
		$search_ini="";
		$main_search="";		
		for($i=0;$i<count($struct_res);$i++)
		{
			$search_tab_links.="<li><a data-toggle='tab' href='#search_tab_".$struct_res[$i]['table_name']."'>".$struct_res[$i]['search_only_text']."</a></li>";

			$search_tab_content.="<div id='search_tab_".$struct_res[$i]['table_name']."' class='tab-pane'><div class='row search-form-default'>".
					"<div class='col-md-12'><form id='search_form_".$struct_res[$i]['table_name']."'>".
					"<div class='input-group'><div class='input-cont'>".
					"<input type='text' placeholder='Search...' name='search_box' required class='form-control'/>".
					"</div><span class='input-group-btn'><button type='submit' class='btn green-haze'>".
					"Search &nbsp; <i class='m-icon-swapright m-icon-white'></i></button></span></div></form></div></div>".
					"<div id='search_results_".$struct_res[$i]['table_name']."'></div></div>";
					
			$search_ini.="$('#search_form_".$struct_res[$i]['table_name']."').on('submit',function(e)".
							"{e.preventDefault();".
							"search_".$struct_res[$i]['table_name']."_ini();});";
			
			if($i==0)
			{
				$main_search.="function show_search_results(){".
									"hide_all();".
									"$('#search_results_box').show();".
									"search_".$struct_res[$i]['table_name']."_ini();}";
			}
			
			$search_ini.="function search_".$struct_res[$i]['table_name']."_ini(){".
							"var searchForm=document.getElementById('search_form_".$struct_res[$i]['table_name']."');".	
							"var searchStr=searchForm.elements['search_box'].value;".	
							"var new_search_array=searchStr.split(' ');".			
							"var search_array=[searchStr];".
							"new_search_array.forEach(function(new_search_string)".
							"{".
								"if(new_search_string.length>=3)".
									"search_array.push(new_search_string);";			
								
			$search_ini.="var tablename='".$struct_res[$i]['table_name']."';".
								"var search".$i."_columns=new Object();".
								"search".$i."_columns.count=".$struct_res[$i]['result_count'].";".
								"search".$i."_columns.start_index=0;".
								"search".$i."_columns.data_store='".$struct_res[$i]['table_name']."';".		
								"search".$i."_columns.indexes=[{index:'id'},";
			$search_ini.="{index:'".$struct_res[$i]['search_column']."','approx_array':search_array},";
			$return_columns=json_decode($struct_res[$i]['return_columns'],true);
			for($x=0;$x<count($return_columns);$x++)
			{
				$search_ini.="{index:'".$return_columns[$x]['column']."'},";
			}
			$search_ini=rtrim($search_ini,",");
			$search_ini.="];";

			$search_ini.="read_json_rows('',search".$i."_columns,function(results){".
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
						"results.forEach(function(result){".
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
								$search_ini.="result_html+=\"<div class='search-classic'><h4><a onclick=element_display('\"+result.data_id+\"','\"+result.link_to+\"');>".$struct_res[$i]['result_title']."</a></h4><p>\"+record_detail+\"</p></div>\";";		
							}
							else
							{
								$search_ini.="result_html+=\"<div class='search-classic'><h4><a onclick=element_display('\"+result.id+\"','".$struct_res[$i]['result_form']."');>".$struct_res[$i]['result_title']."</a></h4><p>\"+record_detail+\"</p></div>\";";		
							}
			$search_ini.="}});$('#search_results_".$struct_res[$i]['table_name']."').html(result_html);});});};";		
		}

		echo $search_tab_links;		
		echo "</ul><div class='tab-content'>";
		echo $search_tab_content;
		echo "<script type='text/javascript'>";
		echo $main_search;
		echo $search_ini;
	}
?>
					</script>
				</div>
			</div>
		</div>
	</div>
</div>	