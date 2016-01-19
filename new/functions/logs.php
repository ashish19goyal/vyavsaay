<div id='activities_box'>
	<h3 class="page-title">Activities</h3>
	<div style='display:inline-block;float:right;'>
		<a title='Export All Logs' class='btn btn-icon-only green' class='export_icon' onclick='export_activities();'><i class='fa fa-send'></i></a>
		<a title='Export Unsynced Data' class='btn btn-icon-only blue' onclick='export_unsynced_activities();'><i class='fa fa-share'></i></a>
		<a title='Import Unsynced Data' class='btn btn-icon-only red' onclick='modal160_action();'><i class='fa fa-upload'></i></a>
	</div>	
	<div class="row">
		<div class="col-md-12">
			<div class="tabbable-line tabbable-full-width">
				<div class="tab-content" id='activities_detail'>
					No activities
				</div>
			</div>
		</div>
	</div>
</div>

<script>

function export_activities()
{
	var new_columns=new Object();
		new_columns.data_store='activities';
		new_columns.indexes=[{index:'title'},
							{index:'notes'},
							{index:'updated_by'},
							{index:'type'},
							{index:'status'},
							{index:'user_display'},
							{index:'last_updated',lowerbound:(get_my_time()-30*86400000)},
							{index:'data_xml'}];
	
	get_limited_export_data(new_columns,'Activities',function(new_result){});
}

function export_unsynced_activities()
{
	var new_columns=new Object();
		new_columns.data_store='activities';
		new_columns.indexes=[{index:'id'},
							{index:'title'},
							{index:'notes'},
							{index:'link_to'},
							{index:'data_id'},
							{index:'tablename'},
							{index:'type'},
							{index:'user_display'},
							{index:'data_xml'},
							{index:'data_type'},
							{index:'updated_by'},
							{index:'status',exact:'unsynced'},
							{index:'last_updated'}];
	get_limited_export_data(new_columns,'Unsynced Data',function(new_result){});
}

function activities_ini()
{
	show_loader();
	var new_columns=new Object();
	new_columns.data_store='activities';
	new_columns.count=50;
	new_columns.indexes=[{index:'id'},
						{index:'title'},
						{index:'notes'},
						{index:'link_to'},
						{index:'data_id'},
						{index:'user_display',exact:'yes'},
						{index:'updated_by'},
						{index:'last_updated'}];

	read_json_rows('',new_columns,function(activities)
	{
		var result_html="";
		activities.forEach(function(activity)
		{
			result_html+="<div class='search-classic'><div class='notification_check'><i class='fa fa-times-circle' onclick=delete_activity($(this),'"+activity.id+"');></i></div><div class='notification_detail'><h4><a onclick=element_display('"+activity.data_id+"','"+activity.link_to+"');>"+
							activity.title+"</a></h4><p>"+activity.notes+"</p><p class='activity_by'>By "+activity.updated_by+" @ "+get_formatted_time(activity.last_updated)+"</p></div></div>";
		});
		$("#activities_detail").html(result_html);
		hide_loader();
	});
}

function delete_activity(div_elem,data_id)
{
	if(is_delete_access('activities'))
	{
		modal115_action(function()
		{
			var data_json={data_store:'activities',data:[{index:'id',value:data_id}],log:'no'};
			delete_json(data_json);						
			$(div_elem).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

</script>