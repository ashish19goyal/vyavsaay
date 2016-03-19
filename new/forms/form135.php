<div id='form135' class='tab-pane'>
	<form id='form135_master' autocomplete="off">
		<fieldset>
			<label>Project Name<br><input type='text'></label>
			<label>Description<br><textarea readonly="readonly"></textarea></label>
			<label>Status<br><input type='text' readonly="readonly"></label>
			<label>	<input type='hidden' name='id'>	</label>
			<label>	<input type='button' title='Save' class='save_icon'></label>
			<label>	<input type='button' title='Add project phase' class='add_icon'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>

	<br>
	<b>Tasks</b>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form135_task_header'></form>
					<th>Phase</th>
					<th>Task</th>
					<th>Assignee </th>
					<th>Due By </th>
					<th>Status </th>
					<th><input type='button' class='add_icon' form='form135_task_header' title='Add task' onclick='form135_add_task();'></th>
			</tr>
		</thead>
		<tbody id='form135_task_body'>
		</tbody>
	</table>
	
	<br>
	<b>Documents</b>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form135_document_header'></form>
					<th>Document Name</th>
					<th>File </th>
					<th><input type='button' class='add_icon' form='form135_document_header' title='Add document' onclick='form135_add_document();'></th>			
			</tr>
		</thead>
		<tbody id='form135_document_body'>
		</tbody>
	</table>

	<br>
	<b>Team</b>	
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form135_team_header'></form>
					<th>Member</th>
					<th>Role</th>
					<th>Notes</th>
					<th>Status</th>
					<th><input type='button' class='add_icon' form='form135_team_header' title='Add member' onclick='form135_add_team();'></th>
			</tr>
		</thead>
		<tbody id='form135_team_body'>
		</tbody>
	</table>

	<br>
	<b>Schedule</b>
	<div id='form135_gantt' style="height:400px;"></div>

    <script>
    function form135_header_ini()
{
	var fields=document.getElementById('form135_master');
	var project_id=$("#form135_link").attr('data_id');
	
	var name_filter=fields.elements[1];
	var description_filter=fields.elements[2];
	var status_filter=fields.elements[3];
	var id_filter=fields.elements[4];
	var save_button=fields.elements[5];
	var add_button=fields.elements[6];
	id_filter.value=project_id;

	$(fields).off('submit');
	$(fields).on('submit',function (event) 
	{
		event.preventDefault();
		form135_ini();
	});	
	
	$(add_button).off('click');
	$(add_button).on('click',function()
	{
		console.log(id_filter.value);
		modal105_action(id_filter.value);
	});	
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form135_update_form();
	});
		
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});
	
	name_filter.value='';
	description_filter.value='';
	status_filter.value='';
	set_static_value_list('projects','status',status_filter);	

	var project_data="<projects>"+
					"<name></name>"+
					"</projects>";
	set_my_value_list(project_data,name_filter);
	
	my_datalist_change(name_filter,function () 
	{
		var project_id_data="<projects>"+
							"<id></id>"+
							"<name exact='yes'>"+name_filter.value+"</name>"+
							"</projects>";
		set_my_value(project_id_data,id_filter);
	});
}

function form135_ini()
{
	var filter_fields=document.getElementById('form135_master');
	var project_id=filter_fields.elements[4].value;	
	
	$('#form135_team_body').html("");
	$('#form135_document_body').html("");
	$('#form135_task_body').html("");
	$('#form135_asset_body').html("");
	
	if(project_id!="")
	{
		show_loader();
		var project_columns="<projects count='1'>" +
				"<id>"+project_id+"</id>" +
				"<name></name>"+
				"<details></details>" +
				"<start_date></start_date>" +
				"<status></status>" +
				"</projects>";
	
		fetch_requested_data('form135',project_columns,function(project_results)
		{
			var filter_fields=document.getElementById('form135_master');
			
			if(project_results.length>0)
			{
				filter_fields.elements[1].value=project_results[0].name;
				filter_fields.elements[2].value=project_results[0].details;
				filter_fields.elements[3].value=project_results[0].status;
			}

			///////////project schedule//////////////////////
			var phase_columns="<project_phases>" +
					"<id></id>" +
					"<project_id exact='yes'>"+project_id+"</project_id>" +
					"<phase_name></phase_name>" +
					"<details></details>" +
					"<start_date></start_date>" +
					"<due_date></due_date>"+
					"<percent_complete></percent_complete>"+
					"<status></status>" +
					"</project_phases>";
		
			fetch_requested_data('',phase_columns,function(results)
			{
				var source_array=[];
				
				results.sort(function(a,b)
				{
					if(parseFloat(a.start_date)>parseFloat(b.start_date))
					{	return 1;}
					else 
					{	return -1;}
				});	
					
				results.forEach(function(result)
				{
					var from_time = "/Date(" + result.start_date + ")/";
					var to_time = "/Date(" + result.due_date + ")/";
											
					var source_item=new Object();
					source_item.name=result.phase_name;
					source_item.desc="";						
					var value_item=new Object();
					value_item.from=from_time;
					value_item.to=to_time;
					value_item.label=result.details;
					value_item.desc=result.details;
					value_item.dataObj=result.id;						
					value_item.customClass="ganttRed";
					if(result.status=='completed')
						value_item.customClass="ganttGreen";
					else if(result.status=='active')
						value_item.customClass="ganttYellow";
											
					var values_array=[];
					values_array.push(value_item);
					source_item.values=values_array;
					source_array.push(source_item);
				
				});
								
				$("#form135_gantt").gantt({
					source: source_array,
					scale: "days",
					minScale: "hours",
					maxScale:"months",
					navigate: "scroll",
					onItemClick: function(data) 
					{
						modal107_action(data);
					},
				});	
				$('textarea').autosize();				
			});		
		
			/////////////project team////////////////////////
			var team_data="<project_team>"+
									"<id></id>"+
									"<project_id exact='yes'>"+project_id+"</project_id>"+
									"<member></member>"+
									"<role></role>"+
									"<notes></notes>"+
									"<status></status>"+
									"</project_team>";
			fetch_requested_data('',team_data,function(team_results)
			{				
				team_results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form135_team_"+id+"'></form>";
						rowsHTML+="<td data-th='Member'>";
							rowsHTML+="<textarea readonly='readonly' form='form135_team_"+id+"'>"+result.member+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Role'>";
							rowsHTML+="<textarea readonly='readonly' form='form135_team_"+id+"'>"+result.role+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Notes'>";
							rowsHTML+="<textarea readonly='readonly' form='form135_team_"+id+"'>"+result.notes+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form135_team_"+id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form135_team_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form135_team_"+id+"' >";
							rowsHTML+="<input type='button' class='delete_icon' form='form135_team_"+id+"' id='delete_form135_team_"+id+"' onclick='form135_delete_team($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";				
					$('#form135_team_body').append(rowsHTML);
					var fields=document.getElementById("form135_team_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form135_update_team(fields);
					});
				});
				$('textarea').autosize();
				longPressEditable($('.dblclick_editable'));
			});
			
			/////////////service request document////////////////////
			var document_data="<documents>"+
								"<id></id>"+
								"<doc_type exact='yes'>project</doc_type>"+
								"<target_id exact='yes'>"+project_id+"</target_id>"+
								"<doc_name></doc_name>"+
								"<url></url>"+
								"</documents>";
			fetch_requested_data('',document_data,function(document_results)
			{				
				document_results.forEach(function(result)
				{
					var id=result.id;
					var updated_url=result.url.replace(/ /g,"+");
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form135_document_"+id+"'></form>";
						rowsHTML+="<td data-th='Document Name'>";
							rowsHTML+="<textarea readonly='readonly' form='form135_document_"+id+"'>"+result.doc_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='File'>";
							rowsHTML+="<a href='"+updated_url+"' download='"+result.doc_name+"'><u>link</u></a>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form135_document_"+id+"'>";
							rowsHTML+="<input type='hidden' form='form135_document_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form135_document_"+id+"' id='delete_form135_document_"+id+"' onclick='form135_delete_document($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";				
					$('#form135_document_body').append(rowsHTML);
				});		
				$('textarea').autosize();		
			});

			/////////////project tasks////////////////////
			var task_data="<task_instances>"+
								"<id></id>"+
								"<source exact='yes'>project</source>"+
								"<source_id exact='yes'>"+project_id+"</source_id>"+
								"<name></name>"+
								"<assignee></assignee>"+
								"<status></status>"+
								"<t_due></t_due>"+
								"<description></description>"+
								"</task_instances>";
			fetch_requested_data('',task_data,function(task_results)
			{				
				task_results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form135_task_"+id+"'></form>";
						rowsHTML+="<td data-th='Task'>";
							rowsHTML+="<textarea readonly='readonly' form='form135_task_"+id+"'>"+result.name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Description'>";
							rowsHTML+="<textarea readonly='readonly' form='form135_task_"+id+"'>"+result.description+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Assignee'>";
							rowsHTML+="<textarea readonly='readonly' form='form135_task_"+id+"'>"+result.assignee+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Due By'>";
							rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form135_task_"+id+"' value='"+get_my_datetime(result.t_due)+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form135_task_"+id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form135_task_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form135_task_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form135_task_"+id+"' id='delete_form135_task_"+id+"' onclick='form135_delete_task($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";				
					$('#form135_task_body').append(rowsHTML);
					var fields=document.getElementById("form135_task_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form135_update_task(fields);
					});
				});	
				$('textarea').autosize();
				longPressEditable($('.dblclick_editable'));
			});
			
			hide_loader();
		});
	}
}
    
function form135_add_task()
{
	if(is_create_access('form135'))
	{
		var fields=document.getElementById('form135_master');
		var project_id=fields.elements[4].value;

		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form135_task_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Phase'>";
				rowsHTML+="<input type='text' form='form135_task_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Task'>";
				rowsHTML+="<textarea form='form135_task_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Assignee'>";
				rowsHTML+="<input type='text' form='form135_task_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Due By'>";
				rowsHTML+="<input type='text' form='form135_task_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form135_task_"+id+"' value='pending'>";
			rowsHTML+="</td>";			
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form135_task_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form135_task_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form135_task_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form135_task_body').prepend(rowsHTML);
		var fields=document.getElementById("form135_task_"+id);
		var name_filter=fields.elements[0];
		var assignee_filter=fields.elements[2];
		var due_filter=fields.elements[3];
		var status_filter=fields.elements[4];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form135_create_task(fields);
		});
		
		var phase_data="<project_phases>"+
						"<phase_name></phase_name>"+
						"<project_id exact='yes'>"+project_id+"</project_id>"+
						"</project_phases>";
		set_my_value_list_func(phase_data,name_filter,function () 
		{
			$(name_filter).focus();
		});
							
		var assignee_data="<staff>"+
						"<acc_name></acc_name>"+							
						"<status exact='yes'>active</status>"+						
						"</staff>";		
		set_my_value_list(assignee_data,assignee_filter);
		set_static_value_list('task_instances','status',status_filter);
		$(due_filter).datepicker();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Project Dashboard - document
 * @formNo 135
 */
function form135_add_document()
{
	if(is_create_access('form135'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form135_document_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Document Name'>";
				rowsHTML+="<input type='text' form='form135_document_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='File'>";
				rowsHTML+="<a id='form135_document_url_"+id+"'><u>link</u></a><input type='file' form='form135_document_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form135_document_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form135_document_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form135_document_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form135_document_body').prepend(rowsHTML);
		var fields=document.getElementById("form135_document_"+id);
		var name_filter=fields.elements[0];
		var docInfo=document.getElementById('form135_document_url_'+id);
		var fpicture=fields.elements[1];
					
		fpicture.addEventListener('change',function(evt)
		{
			select_document(evt,function(dataURL)
			{
				docInfo.setAttribute('href',dataURL);
			});
		},false);

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form135_create_document(fields);
		});
		
		$(name_filter).focus();
	}
	else
	{
		$("#modal2_link").click();
	}
}


function form135_add_team()
{
	if(is_create_access('form135'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form135_team_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Member'>";
				rowsHTML+="<input type='text' form='form135_team_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Role'>";
				rowsHTML+="<textarea form='form135_team_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Notes'>";
				rowsHTML+="<textarea form='form135_team_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form135_team_"+id+"' required value='active'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form135_team_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form135_team_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form135_team_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form135_team_body').prepend(rowsHTML);
		var fields=document.getElementById("form135_team_"+id);
		var member_filter=fields.elements[0];
		var status_filter=fields.elements[3];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form135_create_team(fields);
		});
		
		var member_data="<staff>"+
							"<acc_name></acc_name>"+							
							"</staff>";		
		set_my_value_list_func(member_data,member_filter,function () 
		{
			$(member_filter).focus();
		});
		set_static_value_list('project_team','status',status_filter);
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form135_create_task(form)
{
	if(is_create_access('form135'))
	{
		var master_fields=document.getElementById('form135_master');
		var project_name=master_fields.elements[1].value;
		var project_id=master_fields.elements[4].value;

		var task=form.elements[0].value;
		var description=form.elements[1].value;
		var assignee=form.elements[2].value;
		var due_by=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;				
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		
		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<source_id>"+project_id+"</source_id>"+
					"<source>project</source>"+
					"<assignee>"+assignee+"</assignee>" +
					"<name>"+task+"</name>" +
					"<description>"+description+"</description>" +
					"<t_initiated>"+last_updated+"</t_initiated>"+
					"<t_due>"+due_by+"</t_due>"+
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_instances>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>task_instances</tablename>" +
					"<link_to>form135</link_to>" +
					"<title>Added</title>" +
					"<notes>Task "+task+" to project "+project_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form135_delete_task(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form135_update_task(form);
		});	
	}
	else
	{
		$("#modal2_link").click();
	}
};


/**
 * formNo 135
 * form Project dashboard - document
 * @param button
 */
function form135_create_document(form)
{
	if(is_create_access('form135'))
	{
		var master_fields=document.getElementById('form135_master');
		var project_name=master_fields.elements[1].value;
		var project_id=master_fields.elements[4].value;

		var doc_name=form.elements[0].value;
		var data_id=form.elements[2].value;
		var url_id="form135_document_url_"+data_id;
		var docInfo=document.getElementById(url_id);
		var url=$(docInfo).attr('href');
		var last_updated=get_my_time();
		
		var data_xml="<documents>" +
					"<id>"+data_id+"</id>" +
					"<target_id>"+project_id+"</target_id>"+
					"<url>"+url+"</url>"+
					"<doc_name>"+doc_name+"</doc_name>" +
					"<doc_type>project</doc_type>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</documents>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>documents</tablename>" +
					"<link_to>form135</link_to>" +
					"<title>Added</title>" +
					"<notes>Document "+doc_name+" for project "+project_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<2;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[4];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form135_delete_document(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});	
	}
	else
	{
		$("#modal2_link").click();
	}
};



function form135_create_team(form)
{
	if(is_create_access('form135'))
	{
		var master_fields=document.getElementById('form135_master');
		var project_name=master_fields.elements[1].value;
		var project_id=master_fields.elements[4].value;

		var member=form.elements[0].value;
		var role=form.elements[1].value;
		var notes=form.elements[2].value;
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		
		var data_xml="<project_team>" +
					"<id>"+data_id+"</id>" +
					"<project_id>"+project_id+"</project_id>"+
					"<member>"+member+"</member>" +
					"<role>"+role+"</role>" +
					"<notes>"+notes+"</notes>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</project_team>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>project_team</tablename>" +
					"<link_to>form135</link_to>" +
					"<title>Added</title>" +
					"<notes>Member "+member+" to project team of "+project_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var access_xml="<data_access>" +
					"<id>"+get_new_key()+"</id>" +
					"<tablename>projects</tablename>" +
					"<record_id>"+project_id+"</record_id>" +
					"<access_type>read</access_type>" +
					"<user>"+member+"</user>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</data_access>";

		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
			server_create_simple(access_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(access_xml);
		}
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form135_delete_team(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form135_update_team(form);
		});	
	}
	else
	{
		$("#modal2_link").click();
	}
};

function form135_update_team(form)
{
	if(is_update_access('form135'))
	{
		var member=form.elements[0].value;
		var role=form.elements[1].value;
		var notes=form.elements[2].value;
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		
		var data_xml="<project_team>" +
					"<id>"+data_id+"</id>" +
					"<member>"+member+"</member>" +
					"<role>"+role+"</role>" +
					"<notes>"+notes+"</notes>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</project_team>";
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
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

/**
 * @form Project Dashboard - Task
 * @formNo 135
 * @param button
 */
function form135_update_task(form)
{
	if(is_update_access('form135'))
	{
		var task=form.elements[0].value;
		var description=form.elements[1].value;
		var assignee=form.elements[2].value;
		var due_by=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;				
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
				
		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<assignee>"+assignee+"</assignee>" +
					"<name>"+task+"</name>" +
					"<description>"+description+"</description>" +
					"<t_due>"+due_by+"</t_due>"+
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_instances>";	
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
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

function form135_delete_team(button)
{
	if(is_delete_access('form135'))
	{
		modal115_action(function()
		{
			var master_fields=document.getElementById('form135_master');
			var project_name=master_fields.elements[1].value;
			var project_id=master_fields.elements[4].value;
	
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);		
			var member=form.elements[0].value;
			var data_id=form.elements[4].value;
			var data_xml="<project_team>" +
						"<id>"+data_id+"</id>" +
						"</project_team>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>project_team</tablename>" +
						"<link_to>form135</link_to>" +
						"<title>Removed</title>" +
						"<notes>"+member+" from project team of "+project_name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var access_xml="<data_access>" +
						"<record_id>"+project_id+"</record_id>" +
						"<tablename>projects</tablename>" +
						"<user>"+member+"</user>" +
						"</data_access>";
	
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
				server_delete_simple(access_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
				local_delete_simple(access_xml);
			}	
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 135
 * form Project Dashboard - document
 * @param button
 */
function form135_delete_document(button)
{
	if(is_delete_access('form135'))
	{
		modal115_action(function()
		{
			var master_fields=document.getElementById('form135_master');
			var project_name=master_fields.elements[1].value;
			var project_id=master_fields.elements[4].value;
	
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);		
			var data_id=form.elements[2].value;
			var data_xml="<documents>" +
						"<id>"+data_id+"</id>" +
						"<target_id>"+project_id+"</target_id>"+
						"</documents>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>documents</tablename>" +
						"<link_to>form135</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Document for project "+project_name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}	
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 135
 * form Project Dashboard - Task
 * @param button
 */
function form135_delete_task(button)
{
	if(is_delete_access('form135'))
	{
		modal115_action(function()
		{
			var master_fields=document.getElementById('form135_master');
			var project_name=master_fields.elements[1].value;
			var project_id=master_fields.elements[4].value;
	
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);		
			var data_id=form.elements[5].value;
			var data_xml="<task_instances>" +
						"<id>"+data_id+"</id>" +
						"</task_instances>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>task_instances</tablename>" +
						"<link_to>form135</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Task for project "+project_name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}	
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}
    </script>
</div>