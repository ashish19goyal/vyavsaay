<div id='form220' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form220_header'></form>
					<th>Project Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form220_header'></th>
					<th>Details</th>
					<th>Priority</th>
					<th>Start Date</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form220_header'></th>
					<th><input type="button" value='Add new project' class='add_icon' form='form220_header' onclick="form220_add_item();">
						<input type='button' form='form220_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form220_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form220_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form220_prev' class='prev_icon' data-index='-25' onclick="$('#form220_index').attr('data-index',$(this).attr('data-index')); form220_ini();">
		<div style='display:hidden;' id='form220_index' data-index='0'></div>
		<img src='./images/next.png' id='form220_next' class='next_icon' data-index='25' onclick="$('#form220_index').attr('data-index',$(this).attr('data-index')); form220_ini();">
	</div>
	
	<script>
		function form220_header_ini()
{
	var filter_fields=document.getElementById('form220_header');
	var name_filter=filter_fields.elements[0];
	var status_filter=filter_fields.elements[1];
	
	var name_data="<projects>" +
			"<name></name>" +
			"</projects>";
	
	set_my_filter(name_data,name_filter);
	set_static_filter('projects','status',status_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form220_ini();
	});
};


function form220_ini()
{
	show_loader();
	var fid=$("#form220_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form220_header');
	
	//populating form 
	var fname=filter_fields.elements[0].value;
	var fstatus=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form220_index');
	var prev_element=document.getElementById('form220_prev');
	var next_element=document.getElementById('form220_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<projects count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<details></details>" +
			"<start_date></start_date>" +
			"<priority></priority>" +
			"<status>"+fstatus+"</status>" +
			"<last_updated></last_updated>" +
			"</projects>";

	$('#form220_body').html("");

	if_data_read_access('projects',function(accessible_data)
	{
		fetch_requested_data('form220',columns,function(results)
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
					var rowsHTML="";
					rowsHTML+="<tr>";
						rowsHTML+="<form id='form220_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Project Name'>";
								rowsHTML+="<textarea readonly='readonly' form='form220_"+result.id+"'>"+result.name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form220_"+result.id+"'>"+result.details+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Priority'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form220_"+result.id+"' value='"+result.priority+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Start Date'>";
								rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form220_"+result.id+"' value='"+get_my_past_date(result.start_date)+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form220_"+result.id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' readonly='readonly' form='form220_"+result.id+"' value='"+result.id+"'>";
								if(update)
								{
									rowsHTML+="<input type='submit' class='save_icon' form='form220_"+result.id+"' title='Save'>";
								}
								if(del)
								{
									rowsHTML+="<input type='button' class='delete_icon' form='form220_"+result.id+"' title='Delete' onclick='form220_delete_item($(this));'>";
								}
								if(result.status=='active')
								{
									rowsHTML+="<br><input type='button' class='generic_icon' form='form220_"+result.id+"' value='Budget' onclick=\"element_display('"+result.id+"','form144',['form137']);\">";
									rowsHTML+="<br><input type='button' class='generic_icon' form='form220_"+result.id+"' name='schedule' value='Schedule' onclick=\"element_display('"+result.id+"','form135');\">";
								}
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form220_body').append(rowsHTML);
					
					var fields=document.getElementById("form220_"+result.id);
					var status_filter=fields.elements[4];
					var schedule_button=fields.elements['schedule'];					
					
					if(!is_form_access('form135'))
					{
						$(schedule_button).hide();
					}
					
					set_static_value_list('projects','status',status_filter);
					
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form220_update_item(fields);
					});
				}
			});
	
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
			
			longPressEditable($('.dblclick_editable'));
			$('textarea').autosize();
			
			var export_button=filter_fields.elements[3];
			$(export_button).off("click");
			$(export_button).on("click", function(event)
			{
				get_export_data(columns,'projects');
			});
			hide_loader();
		});
	});
};

/**
 * @form Manage Projects (CPS)
 * @formNo 220
 */
function form220_add_item()
{
	if(is_create_access('form220'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form220_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Project Name'>";
				rowsHTML+="<textarea required form='form220_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<textarea form='form220_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Priority'>";
				rowsHTML+="<input type='number' readonly='readonly' value='0' form='form220_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Start Date'>";
				rowsHTML+="<input type='text' required form='form220_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' required form='form220_"+id+"' value='active'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form220_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form220_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form220_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form220_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form220_"+id);
		var name_filter=fields.elements[0];
		var start_filter=fields.elements[3];
		var status_filter=fields.elements[4];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form220_create_item(fields);
		});
				
		$(name_filter).focus();

		set_static_value_list('projects','status',status_filter);
		$(start_filter).datepicker();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 220
 * form Manage Projects (CPS)
 * @param button
 */
function form220_create_item(form)
{
	if(is_create_access('form220'))
	{
		var name=form.elements[0].value;
		var details=form.elements[1].value;
		var priority=form.elements[2].value;
		var start_date=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var del_button=form.elements[7];

		var last_updated=get_my_time();
		var data_xml="<projects>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<details>"+details+"</details>" +
					"<priority>"+priority+"</priority>" +
					"<start_date>"+start_date+"</start_date>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</projects>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>projects</tablename>" +
					"<link_to>form220</link_to>" +
					"<title>Added</title>" +
					"<notes>Project "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var access_xml="<data_access>" +
					"<id>"+get_new_key()+"</id>" +
					"<tablename>projects</tablename>" +
					"<record_id>"+data_id+"</record_id>" +
					"<access_type>all</access_type>" +
					"<user_type>user</user_type>" +
					"<user>"+get_account_name()+"</user>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</data_access>";

		create_row(data_xml,activity_xml);
		create_simple(access_xml);
		
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form220_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form220_update_item(form);
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form220_update_item(form)
{
	if(is_update_access('form220'))
	{
		var name=form.elements[0].value;
		var details=form.elements[1].value;
		var priority=form.elements[2].value;
		var start_date=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<projects>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<priority>"+priority+"</priority>" +
					"<details>"+details+"</details>" +
					"<start_date>"+start_date+"</start_date>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</projects>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>projects</tablename>" +
					"<link_to>form220</link_to>" +
					"<title>Updated</title>" +
					"<notes>Project "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form220_delete_item(button)
{
	if(is_delete_access('form220'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			
			var name=form.elements[0].value;
			var data_id=form.elements[5].value;
			var last_updated=get_my_time();
			var data_xml="<projects>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"</projects>";	
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>projects</tablename>" +
						"<link_to>form220</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Project "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var other_delete="<project_team>" +
					"<project_id>"+data_id+"</project_id>" +
					"</project_team>";
			var other_delete2="<project_phases>" +
					"<project_id>"+data_id+"</project_id>" +
					"</project_phases>";
			var other_delete3="<task_instances>" +
					"<source_id>"+data_id+"</source_id>" +
					"<source>projects</source>" +
					"</task_instances>";
			var access_xml="<data_access>" +
					"<tablename>projects</tablename>" +
					"<record_id>"+data_id+"</record_id>" +
					"</data_access>";
			delete_row(data_xml,activity_xml);
			delete_simple(other_delete);
			delete_simple(other_delete2);
			delete_simple(other_delete3);
			delete_simple(access_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form220_import_template()
{
	var data_array=['id','name','details','priority','start_date','status'];
	my_array_to_csv(data_array);
};


function form220_import(data_array,import_type)
{
	var data_xml="<projects>";
	var counter=1;
	var last_updated=get_my_time();
	
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</projects><separator></separator><projects>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name unique='yes'>"+row.name+"</name>" +
				"<start_date>"+get_raw_time(row.start_date)+"</start_date>" +
				"<status>"+row.status+"</status>" +
				"<details>"+row.details+"</details>" +
				"<priority>"+row.priority+"</priority>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	
	data_xml+="</projects>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
		}
		else
		{
			local_create_batch(data_xml);
		}
	}
	else
	{
		if(is_online())
		{	
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}
	}
};

	</script>
</div>