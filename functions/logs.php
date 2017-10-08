<div id='activities_box' style='display:none;'>
	<h3 class="page-title">Activities</h3>
	<div style='display:inline-block;float:right;'>
		<a title='Export All Logs' class='btn btn-icon-only green' class='export_icon' onclick='export_activities();'><i class='fa fa-send'></i></a>
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
	var searchQuery={
		sort : {
			at : {
				order : "desc"
			}
		}
	};

	server_get_logs(searchQuery,function(activities)
	{
		vExport.csv_download({result:activities,file:'Activities'});
	});
}

function activities_ini()
{
	show_loader();
	var searchQuery={
		query:{
			match:{
				display : "yes"
			}
		},
		sort : {
			at : {
				order : "desc"
			}
		},
		size : 50,
		from : 0
	};

	server_get_logs(searchQuery,function(activities)
	{
		console.log(activities);
		var result_html="";
		activities.forEach(function(activity)
		{
			var dataId = JSON.parse(activity.data).id;

			result_html+="<div class='search-classic'>"+
							"<div class='notification_check'>"+
								"<i class='fa fa-times-circle' onclick=delete_activity($(this),'"+activity.id+"');></i>"+
							"</div>"+
							"<div class='notification_detail'>"+
								"<h4><a onclick=element_display('"+activity.dataId+"','"+activity.link+"');>"+activity.title+"</a></h4>"+
								"<p>"+activity.notes+"</p>"+
								"<p class='activity_by'>By "+activity.by+" @ "+vTime.datetime({time:activity.at})+"</p>"+
							"</div>"+
						"</div>";
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
			var searchQuery={
				query:{
					match:{
						'id':data_id
					}
				}
			};
			server_delete_logs(searchQuery,function(){
				$(div_elem).parent().parent().remove();
			});
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

</script>
