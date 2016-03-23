<div id='form185' class='tab-pane'>
<input type='button' value='Switch view' class='generic_icon' onclick='form185_switch_view();'>
	<div id="form185_calendar" style="max-width: 900px;margin:20px auto;"></div>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form185_header'></form>
					<th>Task <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form185_header'></th>
					<th>Details</th>
					<th>Assignee <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form185_header'></th>
					<th>Time</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form185_header'></th>
					<th>
						<input type='button' class='add_icon' form='form185_header' title='Add task' onclick="modal117_action('production');">
						<input type='submit' form='form185_header' style='visibility: hidden;'>				
					</th>
			</tr>
		</thead>
		<tbody id='form185_body'>
		</tbody>
	</table>
	<div id='form185_nav' class='form_nav'>
		<img src='./images/previous.png' id='form185_prev' class='prev_icon' data-index='-25' onclick="$('#form185_index').attr('data-index',$(this).attr('data-index')); form185_ini();">
		<div style='display:hidden;' id='form185_index' data-index='0'></div>
		<img src='./images/next.png' id='form185_next' class='next_icon' data-index='25' onclick="$('#form185_index').attr('data-index',$(this).attr('data-index')); form185_ini();">
	</div>
    
    <script>
function form185_header_ini()
{
	var filter_fields=document.getElementById('form185_header');
	var task_filter=filter_fields.elements[0];
	var assignee_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var name_data="<business_processes>" +
			"<name></name>" +
			"</business_processes>";
	
	set_my_filter(name_data,task_filter);
	
	var assignee_data="<staff>"+
					"<acc_name></acc_name>"+
					"</staff>";
	set_my_filter(assignee_data,assignee_filter);
	
	set_static_filter('task_instances','status',status_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form185_ini();
	});

	$("#form185_body").parent().hide();
	$("#form185_nav").hide();
	$("#form185_calendar").show();
}

function form185_switch_view()
{
	$("#form185_body").parent().toggle();
	$("#form185_nav").toggle();
	$("#form185_calendar").toggle();
}
    
function form185_ini()
{
	var task_id=$("#form185_link").attr('data_id');

	$('#form185_body').html("");
	
	$('#form185_calendar').fullCalendar('destroy');
	$('#form185_calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		height:400,
		fixedWeekCount:false,
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		events: function(start, end, timezone, callback) {
	        var start_time=parseFloat(start.unix())*1000;
	        var end_time=parseFloat(end.unix())*1000;
	        var tasks_data="<task_instances>" +
	        		"<id></id>" +
	        		"<name></name>" +
	        		"<description></description>" +
	        		"<t_initiated lowerbound='yes'>"+start_time+"</t_initiated>" +
	        		"<t_initiated upperbound='yes'>"+end_time+"</t_initiated>" +
	        		"<t_due></t_due>" +
	        		"<status></status>" +
	        		"<assignee></assignee>" +
	        		"<task_hours></task_hours>" +
	        		"<source exact='yes'>business process</source>" +
	        		"</task_instances>";

	        if_data_read_access('task_instances',function(accessible_data)
	        {
		        fetch_requested_data('form185',tasks_data,function(tasks)
		        {
		        	var events=[];
		        	tasks.forEach(function(task)
		        	{
						var read=false;
						var update=false;
						var del=false;
						var access=false;
						for(var x in accessible_data)
						{
							if(accessible_data[x].record_id===task.id || accessible_data[x].record_id=='all')
							{
								if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || task[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
								{
									if(accessible_data[x].access_type=='all')
									{
										read=true;
										update=true;
										del=true;
										access=true;
										break;
									}
									else if(accessible_data[x].access_type=='read')
									{
										read=true;
									}
									else if(accessible_data[x].access_type=='delete')
									{
										del=true;
									}
									else if(accessible_data[x].access_type=='update')
									{
										update=true;
									}
								}
							}
						}
						
						if(read)
						{
							//console.log('task found');
		        			var color="yellow";
		        			if(task.status=='cancelled')
		        			{
		        				color="aaaaaa";
		        			}
		        			else if(task.status=='pending' && parseFloat(task.t_due)<get_my_time())
		        			{
		        				color='#ff0000';
		        			}
		        			else if(task.status=='completed')
		        			{
		        				color='#00ff00';
		        			}
			        		events.push({
			        			title: task.name+"\nAssigned to: "+task.assignee,
			        			start:get_iso_time(task.t_initiated),
			        			end:get_iso_time(parseFloat(task.t_initiated)+(3600000)),
			        			color: color,
			        			textColor:"#333",
			        			id: task.id,
			        			editable:update
			        		});
						}
		        	});
		        	callback(events);
		        });
	        });
	    },
	    dayClick: function(date,jsEvent,view){
	    	modal117_action(get_my_date_from_iso(date.format()));
	    },
	    eventClick: function(calEvent,jsEvent,view){
	    	modal33_action(calEvent.id);
	    },
	    eventDrop: function(event,delta,revertFunc)
	    {
	    	var t_initiated=(parseFloat(event.start.unix())*1000);
	    	var data_xml="<task_instances>" +
						"<id>"+event.id+"</id>" +
						"<t_initiated>"+t_initiated+"</t_initiated>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</task_instances>";
			var prod_xml="<production_plan_items>" +
						"<id>"+event.id+"</id>" +
						"<from_time>"+t_initiated+"</from_time>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</production_plan_items>";
						
			update_simple(data_xml);
			update_simple(prod_xml);
			
			var store_movement_xml="<store_movement>"+
							"<id></id>"+
							"<record_source exact='yes'>production_plan_item</record_source>"+
							"<source_id exact='yes'>"+event.id+"</source_id>"+
							"</store_movement>";
			fetch_requested_data('',store_movement_xml,function (movs) 
			{
				movs.forEach(function (mov) 
				{
					var mov_xml="<store_movement>"+
						"<id>"+mov.id+"</id>"+
						"<applicable_from>"+t_initiated+"</applicable_from>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</store_movement>";
					update_simple(mov_xml);	
				});
			});		
	    },
	    eventResize: function(event, delta, revertFunc){
	    	var task_hours=parseFloat((parseFloat(event.end.unix())-parseFloat(event.start.unix()))/3600);
	    	var data_xml="<task_instances>" +
						"<id>"+event.id+"</id>" +
						"<task_hours>"+task_hours+"</task_hours>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</task_instances>";
			update_simple(data_xml);
		}
	});

	var filter_fields=document.getElementById('form185_header');
	
	var fname=filter_fields.elements[0].value;
	var fassignee=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	
	////indexing///
	var index_element=document.getElementById('form185_index');
	var prev_element=document.getElementById('form185_prev');
	var next_element=document.getElementById('form185_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<task_instances count='25' start_index='"+start_index+"'>" +
			"<id></id>" +
			"<name>"+fname+"</name>" +
			"<description></description>" +
			"<assignee>"+fassignee+"</assignee>" +
			"<t_due></t_due>" +
			"<t_initiated></t_initiated>" +
			"<task_hours></task_hours>" +
			"<status>"+fstatus+"</status>" +
			"<source exact='yes'>business process</source>" +
			"<last_updated></last_updated>" +
			"</task_instances>";
	
	if_data_read_access('task_instances',function(accessible_data)
	{
		fetch_requested_data('form185',columns,function(results)
		{
			results.forEach(function(result)
			{
				var read=false;
				var update=false;
				var del=false;
				var access=false;
				for(var x in accessible_data)
				{
					if(accessible_data[x].record_id===result.id || accessible_data[x].record_id=='all')
					{
						if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || result[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
						{
							if(accessible_data[x].access_type=='all')
							{
								read=true;
								update=true;
								del=true;
								access=true;
								break;
							}
							else if(accessible_data[x].access_type=='read')
							{
								read=true;
							}
							else if(accessible_data[x].access_type=='delete')
							{
								del=true;
							}
							else if(accessible_data[x].access_type=='update')
							{
								update=true;
							}
						}
					}
				}

				if(read)
				{
					result.t_due=get_my_datetime(result.t_due);
					result.t_initiated=get_my_datetime(result.t_initiated);
					var rowsHTML="";
					rowsHTML+="<tr>";
						rowsHTML+="<form id='form185_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Task'>";
								rowsHTML+="<textarea readonly='readonly' form='form185_"+result.id+"'>"+result.name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form185_"+result.id+"'>"+result.description+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Assignee'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form185_"+result.id+"' class='dblclick_editable' value='"+result.assignee+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Time'>";
								rowsHTML+="Start: <input type='text' readonly='readonly' form='form185_"+result.id+"' class='dblclick_editable' value='"+result.t_initiated+"'>";
								rowsHTML+="<br>Due by: <input type='text' readonly='readonly' form='form185_"+result.id+"' class='dblclick_editable' value='"+result.t_due+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form185_"+result.id+"' class='dblclick_editable' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' readonly='readonly' form='form185_"+result.id+"' value='"+result.id+"'>";
							if(update)	
								rowsHTML+="<input type='submit' class='save_icon' form='form185_"+result.id+"' title='Save'>";
							if(del)
								rowsHTML+="<input type='button' class='delete_icon' form='form185_"+result.id+"' title='Delete' onclick='form185_delete_item($(this));'>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form185_body').append(rowsHTML);
					var fields=document.getElementById("form185_"+result.id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form185_update_item(fields);
					});
					
					var name_filter=fields.elements[0];
					var assignee_filter=fields.elements[2];
					var from_filter=fields.elements[3];
					var due_filter=fields.elements[4];
					var status_filter=fields.elements[5];
								
					var staff_data="<staff>" +
							"<acc_name></acc_name>" +
							"</staff>";
					set_my_value_list(staff_data,assignee_filter);
					
					set_static_value_list('task_instances','status',status_filter);
					$(due_filter).vdatetimepicker();
					$(from_filter).vdatetimepicker();
				}
			});
			
			////indexing///
			////indexing///
			var next_index=parseInt(start_index)+25;
			var prev_index=parseInt(start_index)-25;
			next_element.setAttribute('data-index',next_index);
			prev_element.setAttribute('data-index',prev_index);
			index_element.setAttribute('data-index','0');
			if(results.length<25)
			{
				$(next_element).hide();
			}
			else
			{
				$(next_element).show();
			}
			if(prev_index<0)
			{
				$(prev_element).hide();
			}
			else
			{
				$(prev_element).show();
			}
			/////////////
	
			longPressEditable($('.dblclick_editable'));
			$('textarea').autosize();
			
			hide_loader();
		});
	});	
}
    
function form185_delete_item(button)
{
	if(is_delete_access('form185'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var name=form.elements[0].value;
			var data_id=form.elements[6].value;
			var last_updated=get_my_time();
			var data_xml="<task_instances>" +
						"<id>"+data_id+"</id>" +
						"</task_instances>";	
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>task_instances</tablename>" +
						"<link_to>form185</link_to>" +
						"<title>Deleted</title>" +
						"<notes>"+name+" task</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			delete_row(data_xml,activity_xml);
				
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form185_update_item(form)
{
	if(is_update_access('form185'))
	{
		var name=fields.elements[0].value;
		var details=fields.elements[1].value;
		var assignee=fields.elements[2].value;
		var from=get_raw_time(fields.elements[3].value);
		var due=get_raw_time(fields.elements[4].value);
		var status=fields.elements[5].value;
		var data_id=form.elements[7].value;
		var last_updated=get_my_time();
		
		var data_xml="<task_instances>"+
					"<id>"+data_id+"</id>"+
					"<name>"+name+"</name>" +
					"<description>"+details+"</description>" +
					"<assignee>"+assignee+"</assignee>" +
					"<t_due>"+due+"</t_due>" +
					"<t_initiated>"+from+"</t_initiated>" +
					"<status>"+status+"</status>" +
					"<source>business process</source>" +
					"<source_id>"+data_id+"</source_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_instances>";
				
		var prod_xml="<production_plan_items>" +
				"<id>"+data_id+"</id>" +
				"<order_no>"+order+"</order_no>" +
				"<item>"+item+"</item>" +
				"<brand>"+brand+"</brand>" +
				"<quantity>"+quantity+"</quantity>" +
				"<from_time>"+from+"</from_time>" +
				"<to_time>"+to+"</to_time>" +
				"<status>"+status+"</status>" +
				"<plan_id>"+plan_id+"</plan_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</production_plan_items>";
		update_simple(data_xml);
		update_simple(prod_xml);
		
		var store_movement_xml="<store_movement>"+
							"<id></id>"+
							"<record_source exact='yes'>production_plan_item</record_source>"+
							"<source_id exact='yes'>"+data_id+"</source_id>"+
							"</store_movement>";
		fetch_requested_data('',store_movement_xml,function (movs) 
		{
			movs.forEach(function (mov) 
			{
				var mov_xml="<store_movement>"+
					"<id>"+mov.id+"</id>"+
					"<applicable_from>"+from+"</applicable_from>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</store_movement>";
				update_simple(mov_xml);	
			});
		});					
				
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}		
	}
	else
	{
		$("#modal2_link").click();
	}
}
    </script>
</div>