<div id='report30' class='tab-pane'>
	<form id='report30_header' autocomplete="off">
		<fieldset>
			<label>Start date</br><input type='text' required></label>
			<label>End date</br><input type='text' required></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	</br>
	<div style='width:90%;height:300px;'>
		<div><b>Legend</b><div id="report30_legend" style='display: block;'></div></div>
		<canvas id="report30_canvas" class='pie_report'></canvas>
	</div>
	
	<script>

function report30_header_ini()
{	
	var form=document.getElementById('report30_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report30_ini();
	});

	$(start_date).datepicker();
	$(start_date).val(get_my_past_date((get_my_time()-86400000)));

	$(end_date).datepicker();
	$(end_date).val(vTime.date());
}
function report30_ini()
{
	show_loader();
	var form=document.getElementById('report30_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	
	var canvas_parent=$("#report30_canvas").parent();
	$("#report30_canvas").remove();
	$(canvas_parent).append("<canvas id='report30_canvas' class='pie_report'></canvas>");
	
	var ctx = document.getElementById("report30_canvas").getContext("2d");
	var task_data="<task_instances>" +
			"<assignee></assignee>" +
			"<status exact='yes'>completed</status>" +
			"<last_updated lowerbound='yes'>"+get_raw_time(start_date)+"</last_updated>" +
			"<last_updated upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</last_updated>" +
			"</task_instances>";

	fetch_requested_data('report30',task_data,function(tasks)
	{
		var result=transform_to_pie_count(tasks,'assignee');
		var mydoughchart = new Chart(ctx).Doughnut(result,{});
		document.getElementById("report30_legend").innerHTML=mydoughchart.generateLegend();
		
		var print_button=form.elements[4];
		print_graphical_report('report30','Tasks performed by Staff',print_button,mydoughchart);
		
		hide_loader();
	});
};
	
	</script>
</div>