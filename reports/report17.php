<div id='report17' class='tab-pane'>
	<form id='report17_header' autocomplete="off">
		<fieldset>
			<label>From date</br><input type='text' required></label>
			<label>To date</br><input type='text' required></label>
			<label>Staff Name</br><input type='text' title='If this field is blank, data for all staff would be shown'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Staff Name</th>
				<th>Number of Tasks</th>
				<th>Number of Task Hours</th>
				<th>Number of Absence</th>
				<th>Number of hours worked</th>
			</tr>
		</thead>
		<tbody id='report17_body'>
		</tbody>
		<tfoot id='report17_foot'>
		</tfoot>
	</table>

	<script>
function report17_header_ini()
{
	var form=document.getElementById('report17_header');
	var from_filter=form.elements[1];
	var to_filter=form.elements[2];
	var staff_filter=form.elements[3];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report17_ini();
	});

	var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";

	set_my_filter(staff_data,staff_filter);

	$(from_filter).datepicker();
	$(from_filter).val(vTime.date({time:(get_my_time()-86400000)}));
	$(to_filter).datepicker();
	$(to_filter).val(vTime.date());
}

function report17_ini()
{
	var form=document.getElementById('report17_header');
	var from_date=form.elements[1].value;
	var to_date=form.elements[2].value;
	var staff=form.elements[3].value;

	show_loader();
	$('#report17_body').html("");
	var rowsHTML="";

	var staff_data="<staff>" +
			"<acc_name>"+staff+"</acc_name>" +
			"<status exact='yes'>active</status>" +
			"</staff>";
	get_single_column_data(function(employees)
	{
		var employees_string="--";
		for(var j in employees)
		{
			employees_string+=employees[j]+"--";
		}

		var attendance_data="<attendance>" +
				"<acc_name array='yes'>"+employees_string+"</acc_name>" +
				"<presence></presence>" +
				"<hours_worked></hours_worked>" +
				"<date lowerbound='yes'>"+(get_raw_time(from_date)-10000)+"</date>" +
				"<date upperbound='yes'>"+(get_raw_time(to_date)+86400000)+"</date>" +
				"</attendance>";

		fetch_requested_data('report17',attendance_data,function(attendances)
		{
			var task_instances_data="<task_instances>" +
						"<assignee array='yes'>"+employees_string+"</assignee>" +
						"<status exact='yes'>completed</status>" +
						"<last_updated lowerbound='yes'>"+(get_raw_time(from_date)-10000)+"</last_updated>" +
						"<last_updated upperbound='yes'>"+(get_raw_time(to_date)+86400000)+"</last_updated>" +
						"<task_hours></task_hours>" +
						"</task_instances>";
			fetch_requested_data('report17',task_instances_data,function(tasks)
			{
				var total_tasks=0;
				var total_task_hours=0;
				var total_absence=0;
				var total_hours_worked=0;

				employees.forEach(function(employee)
				{
					var acc_name=employee;

					var absents=0;
					var hours=0;
					for(var i in attendances)
					{
						if(attendances[i].acc_name==acc_name)
						{
							if(attendances[i].presence=='absent')
								absents+=1;
							hours+=parseInt(attendances[i].hours_worked);
						}
					}

					var num_tasks=0;
					var task_hours=0;
					for(var k in tasks)
					{
						if(tasks[k].assignee==acc_name)
						{
							task_hours+=parseInt(tasks[k].task_hours);
							num_tasks+=1;
						}
					}

					total_tasks+=num_tasks;
					total_task_hours+=task_hours;
					total_absence+=absents;
					total_hours_worked+=hours;

					rowsHTML+="<tr>";
						rowsHTML+="<td data-th='Staff Name'>";
							rowsHTML+=acc_name;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='# Tasks'>";
							rowsHTML+=num_tasks;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='# Task Hours'>";
							rowsHTML+=task_hours;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='# Absence'>";
							rowsHTML+=absents;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='# hours worked'>";
							rowsHTML+=hours;
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
				});
				$('#report17_body').html(rowsHTML);

				var total_row="<tr><td data-th='Total'>Total</td><td data-th='# Tasks'>"+total_tasks+"</td><td data-th='# Task Hours'>"+total_task_hours+
						"</td><td data-th='# Absence'>"+total_absence+"</td><td data-th='# Hours worked'>"+total_hours_worked+"</td></tr>";
				$('#report17_foot').html(total_row);

				var print_button=form.elements[5];
				print_tabular_report('report17','Staff Performance',print_button);

				hide_loader();
			});
		});
	},staff_data);
};

	</script>
</div>
