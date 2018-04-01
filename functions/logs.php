<div id='activities_box' style='display:none;'>
	<h3 class="page-title">Activity Logs</h3>
	<div style='display:inline-block;float:right;'>
		<a title='Export All Logs' class='btn btn-icon-only green' class='export_icon' onclick='vActivity.exportLog();'><i class='fa fa-send'></i></a>
	</div>
	<div class="row">
		<div class="col-md-12">
			<div class="tabbable-line tabbable-full-width" style="height:100%">
				<div class="tab-content" id='activities_detail' style="overflow-y:scroll">
					No activities
				</div>
			</div>
		</div>
	</div>
</div>

<script>
var vActivity = function(options)
{
	var defaults ={
		pageSize : 20,
		scroll : 'down',
		page: 0,
		container : $("#activities_detail")
	};

	var settings = $.extend(defaults, options || {});

	var bindScrollDown = function()
	{
		$(settings.container).on('scroll', function(event)
		{
		    var e = event.target;
		    if (e.scrollHeight - e.scrollTop === e.clientHeight)
		    {
		        console.log('scrolled');
		    }
		});
	};

	var render = function(activities,option)
	{
		var result_html="<div id='activityLog"+option.page+"' data-page='"+option.page+"'>";
		activities.forEach(function(activity)
		{
			var dataId = JSON.parse(activity.data)[0].value;

			result_html+="<div class='search-classic'>"+
							"<div class='notification_check'>"+
								"<i class='fa fa-times-circle' onclick=vActivity.deleteLog($(this),'"+activity.id+"');></i>"+
							"</div>"+
							"<div class='notification_detail'>"+
								"<h4><a onclick=element_display('"+dataId+"','"+activity.link_to+"');>"+activity.title+"</a></h4>"+
								"<p>"+activity.notes+"</p>"+
								"<p class='activity_by'>By "+activity.by+" @ "+vTime.datetime({time:activity.at})+"</p>"+
							"</div>"+
						"</div>";
		});
		result_html+="</div>";

		if(option.direction == 'down')
		{
			settings.container.append(result_html);
		}
		else {
			settings.container.prepend(result_html);
		}
	}

	var get = function(option)
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
			size : settings.pageSize,
			from : option.page * settings.pageSize
		};

		server_get_logs(searchQuery,function(activities)
		{
			render(activities,option);
			hide_loader();
		});
	};

	this.deleteLog = function(div_elem,data_id)
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
				server_delete_logs(searchQuery,function()
				{
					$(div_elem).parent().parent().remove();
				});
			});
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	this.exportLog = function()
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
	};

	this.show = function()
	{
		vIni.hideAll();
		$("#activities_box").show();
		get({page:0,direction:'down'});
	};
};

vActivity = new vActivity();

</script>
