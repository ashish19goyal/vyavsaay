<div id='form144' class='tab-pane'>
	<form id='form144_master' autocomplete="off">
		<fieldset>
			<label>Project Name<br><input type='text' name='project' required></label>
			<label>Budget Estimate<br>Rs. <input type='number' name='estimate' readonly='readonly'></label>
			<label>Budget Actuals<br>Rs. <input type='number' name='actual' readonly='readonly'></label>
			<label>Hours Spent<br><input type='number' name='hours' readonly='readonly'></label>
			<label>	<input type='button' title='Save' name='save' class='save_icon'></label>
			<label>
				<input type='hidden' name='project_id'>	
				<input type='submit' class='submit_hidden'>	
			</label>	
		</fieldset>
	</form>

	<br>
	<b>Cost of Tasks</b>	
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form144_task_header'></form>
					<th>Phase </th>
					<th>Task </th>
					<th>Amount </th>
					<th>Status </th>
					<th></th>
			</tr>
		</thead>
		<tbody id='form144_task_body'>
		</tbody>
	</table>
	
	<br>
	<b>Expenses</b>	
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form144_expense_header'></form>
					<th>Person </th>
					<th>Amount </th>
					<th>Detail </th>
					<th>Status </th>
					<th><input type='button' class='add_icon' form='form144_expense_header' title='Add expense' onclick='form144_add_expense();'></th>
			</tr>
		</thead>
		<tbody id='form144_expense_body'>
		</tbody>
	</table>
    
    <script>
    function form144_header_ini()
{
	var fields=document.getElementById('form144_master');
	var project_id=$("#form144_link").attr('data_id');
	
	var name_filter=fields.elements['project'];
	var total_estimate_filter=fields.elements['estimate'];
	var total_budget_filter=fields.elements['actual'];
	var hours_filter=fields.elements['hours'];
	var project_id_filter=fields.elements['project_id'];
	var save_button=fields.elements['save'];

	project_id_filter.value=project_id;
	
	$(fields).off('submit');
	$(fields).on('submit',function (event) 
	{
		event.preventDefault();
		form144_ini();
	});	

	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form144_update_form();
	});
		
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});
	
	name_filter.value='';
	total_estimate_filter.value='';
	total_budget_filter.value='';
	
	var project_data="<projects>"+
					"<name></name>"+
					"</projects>";	
	set_my_value_list(project_data,name_filter);
	
	my_datalist_change(name_filter,function () 
	{
		console.log('project selected');
		var project_id_data="<projects>"+
							"<id></id>"+
							"<name exact='yes'>"+name_filter.value+"</name>"+
							"</projects>";
		set_my_value(project_id_data,project_id_filter);
		
		var timesheet_data="<timesheet>"+
							"<hours_worked></hours_worked>"+
							"<source exact='yes'>project</source>"+
							"<source_name exact='yes'>"+name_filter.value+"</source_name>"+
							"</timesheet>";
		fetch_requested_data('',timesheet_data,function(times)
		{
			var total_hours=0;
			for(var i in times)
			{
				total_hours+=parseFloat(times[i].hours_worked);
			}
			hours_filter.value=total_hours;
		});					
	});
}

function form144_ini()
{
	var filter_fields=document.getElementById('form144_master');
	var project_id=filter_fields.elements['project_id'].value;
	
	$('#form144_task_body').html("");
	$('#form144_expense_body').html("");
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
		
		fetch_requested_data('form144',project_columns,function(project_results)
		{
			if(project_results.length>0)
			{
				filter_fields.elements['project'].value=project_results[0].name;
				//filter_fields.elements[2].value=project_results[0].details;
				//filter_fields.elements[3].value=project_results[0].status;
				var hours_filter=filter_fields.elements['hours'];
			
				var timesheet_data="<timesheet>"+
							"<hours_worked></hours_worked>"+
							"<source exact='yes'>project</source>"+
							"<source_name exact='yes'>"+project_results[0].name+"</source_name>"+
							"</timesheet>";
				fetch_requested_data('',timesheet_data,function(times)
				{
					var total_hours=0;
					for(var i in times)
					{
						total_hours+=parseFloat(times[i].hours_worked);
					}
					hours_filter.value=total_hours;
				});								
			}
			/////////////project tasks////////////////////
			
			var budget_estimate_filter=filter_fields.elements['estimate'];
			var budget_actual_filter=filter_fields.elements['actual'];
			budget_actual_filter.value=0;
			
			var task_data="<task_instances>"+
						"<id></id>"+
						"<source exact='yes'>project</source>"+
						"<source_id exact='yes'>"+project_id+"</source_id>"+
						"<name></name>"+
						"<assignee></assignee>"+
						"<status></status>"+
						"<t_due></t_due>"+
						"<est_expense></est_expense>"+
						"<expense></expense>"+
						"<description></description>"+
						"</task_instances>";
			fetch_requested_data('',task_data,function(task_results)
			{		
				var budget_estimate_value=0;
				var	budget_actual_value=0;		
				task_results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form144_task_"+id+"'></form>";
						rowsHTML+="<td data-th='Phase'>";
							rowsHTML+="<textarea readonly='readonly' form='form144_task_"+id+"'>"+result.name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Task'>";
							rowsHTML+="<textarea readonly='readonly' form='form144_task_"+id+"'>"+result.description+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="Estimated: Rs. <input type='number' readonly='readonly' class='dblclick_editable' form='form144_task_"+id+"' value='"+result.est_expense+"'>";
							rowsHTML+="<br>Actual: Rs. <input type='number' readonly='readonly' class='dblclick_editable' form='form144_task_"+id+"' value='"+result.expense+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form144_task_"+id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form144_task_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form144_task_"+id+"' >";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";				
					$('#form144_task_body').append(rowsHTML);
					
					var fields=document.getElementById("form144_task_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form144_update_task(fields);
					});
					budget_estimate_value+=parseFloat(result.est_expense);
					budget_actual_value+=parseFloat(result.expense);
				});
				budget_estimate_filter.value=vUtil.round(budget_estimate_value,2);
				budget_actual_filter.value=parseFloat(budget_actual_filter.value)+vUtil.round(budget_actual_value,2);
				longPressEditable($('.dblclick_editable'));
			});
	
			/////////////project expenses////////////////////
			var expense_data="<expenses>"+
								"<id></id>"+
								"<source exact='yes'>project</source>"+
								"<source_id exact='yes'>"+project_id+"</source_id>"+
								"<person></person>"+
								"<amount></amount>"+
								"<status></status>"+
								"<detail></detail>"+
								"</expenses>";
			fetch_requested_data('',expense_data,function(expense_results)
			{		
				var budget_actual_value=0;		
				expense_results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form144_expense_"+id+"'></form>";
						rowsHTML+="<td data-th='Person'>";
							rowsHTML+="<textarea readonly='readonly' form='form144_expense_"+id+"'>"+result.person+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="Rs. <input type='number' readonly='readonly' form='form144_expense_"+id+"' value='"+result.amount+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Detail'>";
							rowsHTML+="<textarea readonly='readonly' form='form144_expense_"+id+"'>"+result.detail+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form144_expense_"+id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form144_expense_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form144_expense_"+id+"' >";
							rowsHTML+="<input type='button' class='delete_icon' form='form144_expense_"+id+"' id='delete_form144_expense_"+id+"' onclick='form144_delete_expense($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";				
					$('#form144_expense_body').append(rowsHTML);
					
					var fields=document.getElementById("form144_expense_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form144_update_expense(fields);
					});
					budget_actual_value+=parseFloat(result.amount);
				});		
				budget_actual_filter.value=parseFloat(budget_actual_filter.value)+vUtil.round(budget_actual_value,2);		
			});

			hide_loader();
		});
	}
}
        
function form144_add_expense()
{
	if(is_create_access('form144'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form144_expense_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Person'>";
				rowsHTML+="<input type='text' form='form144_expense_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Rs. <input type='number' form='form144_expense_"+id+"' min='0' step='any' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Detail'>";
				rowsHTML+="<textarea form='form144_expense_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form144_expense_"+id+"' value='submitted'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form144_expense_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form144_expense_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form144_expense_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form144_expense_body').prepend(rowsHTML);
		var fields=document.getElementById("form144_expense_"+id);
		var person_filter=fields.elements[0];
		var status_filter=fields.elements[3];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form144_create_expense(fields);
		});
		
		var person_data="<staff>"+
						"<acc_name></acc_name>"+
						"</staff>";
		set_my_value_list_func(person_data,person_filter,function () 
		{
			$(person_filter).focus();
		});

		set_static_value_list('expenses','status',status_filter);
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form144_create_expense(form)
{
	if(is_create_access('form144'))
	{
		var master_fields=document.getElementById('form144_master');
		var project_name=master_fields.elements['project'].value;
		var project_id=master_fields.elements['project_id'].value;

		var person=form.elements[0].value;
		var amount=form.elements[1].value;
		var detail=form.elements[2].value;
		var status=form.elements[3].value;				
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		
		var data_xml="<expenses>" +
					"<id>"+data_id+"</id>" +
					"<source_id>"+project_id+"</source_id>"+
					"<source>project</source>"+
					"<person>"+person+"</person>"+
					"<amount>"+amount+"</amount>"+
					"<detail>"+detail+"</detail>" +
					"<status>"+status+"</status>"+
					"<expense_date>"+last_updated+"</expense_date>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</expenses>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>expenses</tablename>" +
					"<link_to>form144</link_to>" +
					"<title>Added</title>" +
					"<notes>Expense of Rs. "+amount+" for project "+project_name+"</notes>" +
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
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form144_delete_expense(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form144_update_expense(form);
		});	
	}
	else
	{
		$("#modal2_link").click();
	}
};
        
function form144_update_task(form)
{
	if(is_update_access('form144'))
	{
		var project_id=document.getElementById('form144_master').elements['project_id'].value;
		var task=form.elements[0].value;
		var description=form.elements[1].value;
		var estimate=form.elements[2].value;
		var actual=form.elements[3].value;		
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<status>"+status+"</status>" +
					"<name>"+task+"</name>" +
					"<est_expense>"+estimate+"</est_expense>" +
					"<expense>"+actual+"</expense>" +
					"<description>"+description+"</description>"+
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


/**
 * @form Project Budgeting - Expenses
 * @formNo 144
 * @param button
 */
function form144_update_expense(form)
{
	if(is_update_access('form144'))
	{
		var project_id=document.getElementById('form144_master').elements['project_id'].value;
		var person=form.elements[0].value;
		var amount=form.elements[1].value;
		var details=form.elements[2].value;
		var status=form.elements[3].value;		
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<expenses>" +
					"<id>"+data_id+"</id>" +
					"<source_id>"+project_id+"</source_id>" +
					"<source>project</source>"+
					"<status>"+status+"</status>" +
					"<person>"+person+"</person>" +
					"<amount>"+amount+"</amount>" +
					"<detail>"+details+"</detail>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</expenses>";
		update_simple(data_xml);
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form144_delete_expense(button)
{
	if(is_delete_access('form144'))
	{
		modal115_action(function()
		{
			var master_fields=document.getElementById('form144_master');
			var project_name=master_fields.elements['project'].value;
			var project_id=master_fields.elements['project_id'].value;
	
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);		
			var data_id=form.elements[4].value;
			var data_xml="<expenses>" +
						"<id>"+data_id+"</id>" +
						"</expenses>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>expenses</tablename>" +
						"<link_to>form144</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Expense for project "+project_name+"</notes>" +
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