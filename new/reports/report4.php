<div id='report4' class='tab-pane'>
	<form id='report4_header' autocomplete="off">
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
	<div style='width:90%;height:300px'>
		<div><b>Legend</b><div id="report4_legend" style='display: block;'></div></div>
		<canvas id="report4_canvas" class='report_sizing'></canvas>
	</div>
	
	<script>

function report4_header_ini()
{	
	var form=document.getElementById('report4_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report4_ini();
	});

	$(start_date).datepicker();
	$(start_date).val(get_my_past_date((get_my_time()-86400000)));

	$(end_date).datepicker();
	$(end_date).val(vTime.date());
}

function report4_ini()
{
	show_loader();
	var form=document.getElementById('report4_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	
	var canvas_parent=$("#report4_canvas").parent();
	$("#report4_canvas").remove();
	$(canvas_parent).append("<canvas id='report4_canvas' class='report_sizing'></canvas>");
	
	var ctx = document.getElementById("report4_canvas").getContext("2d");
	var modes_data="<payments>" +
			"<mode></mode>" +
			"<paid_amount></paid_amount>" +
			"<status exact='yes'>closed</status>" +
			"<type exact='yes'>received</type>" +
			"<date lowerbound='yes'>"+get_raw_time(start_date)+"</date>" +
			"<date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</date>" +
			"</payments>";

	fetch_requested_data('report4',modes_data,function(modes)
	{
		var result=transform_to_pie_sum(modes,'paid_amount','mode');
		var mydoughchart = new Chart(ctx).Doughnut(result,{});
		document.getElementById("report4_legend").innerHTML=mydoughchart.generateLegend();
		
		var print_button=form.elements[4];
		print_graphical_report('report4','Modes of Payment',print_button,mydoughchart);
		hide_loader();
	});
};
	
	</script>
</div>