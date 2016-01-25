<div id='report26' class='tab-pane'>
	<form id='report26_header' autocomplete="off">
		<fieldset>
			<label>Start date</br><input type='text' required></label>
			<label>End date</br><input type='text' required></label>
			<label>Select Customer</br><input type='text' title='If this field is left blank, top 10 customers will be selected'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	</br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report26_legend" style='display: block;'></div></div>
		<canvas id="report26_canvas" class='report_sizing'></canvas>
	</div>
	
	<script>
	function report26_header_ini()
{	
	var form=document.getElementById('report26_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];
	var customer_filter=form.elements[3];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report26_ini();
	});

	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(customer_data,customer_filter);
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-86400000));
	end_date.value=get_my_date();
}

function report26_ini()
{
	show_loader();
	var form=document.getElementById('report26_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	var customer=form.elements[3].value;
	
	var canvas_parent=$("#report26_canvas").parent();
	$("#report26_canvas").remove();
	$(canvas_parent).append("<canvas id='report26_canvas' class='report_sizing'></canvas>");
	
	var ctx = document.getElementById("report26_canvas").getContext("2d");
	var sales_data="<bills>" +
			"<amount></amount>" +
			"<customer_name>"+customer+"</customer_name>" +
			"<bill_date lowerbound='yes'>"+get_raw_time(start_date)+"</bill_date>" +
			"<bill_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</bill_date>" +
			"</bills>";

	fetch_requested_data('report26',sales_data,function(sales)
	{
		sales.sort(function(a,b)
		{
			if(parseFloat(a.amount)<parseFloat(b.amount))
			{	return 1;}
			else 
			{	return -1;}
		});
				
		var result=transform_to_bar_sum(sales,'Bill Amount','amount','customer_name');
		var mybarchart = new Chart(ctx).Bar(result,{});
		document.getElementById("report26_legend").innerHTML=mybarchart.generateLegend();
		
		var print_button=form.elements[5];
		print_graphical_report('report26','Sales by Customers',print_button,mybarchart);
		
		hide_loader();
	});
};

	</script>
</div>