<div id='report39' class='tab-pane'>
	<form id='report39_header' autocomplete="off">
		<fieldset>
			<label>Start date</br><input type='text' required></label>
			<label>End date</br><input type='text' required></label>
			<label>Select Service</br><input type='text' title='If this field is left blank, top 10 services will be selected'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	</br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report39_legend" style='display: block;'></div></div>
		<canvas id="report39_canvas" class='report_sizing'></canvas>
	</div>
	
	<script>
function report39_header_ini()
{	
	var form=document.getElementById('report39_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];
	var service_filter=form.elements[3];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report39_ini();
	});

	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	set_my_filter(service_data,service_filter);
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-86400000));
	end_date.value=vTime.date();
}
function report39_ini()
{
	show_loader();
	var form=document.getElementById('report39_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	var service=form.elements[3].value;
	
	var canvas_parent=$("#report39_canvas").parent();
	$("#report39_canvas").remove();
	$(canvas_parent).append("<canvas id='report39_canvas' class='report_sizing'></canvas>");
	
	var ctx = document.getElementById("report39_canvas").getContext("2d");
	
	var bills_data="<bills>" +
			"<id></id>" +
			"<bill_date lowerbound='yes'>"+get_raw_time(start_date)+"</bill_date>" +
			"<bill_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</bill_date>" +
			"</bills>";
	get_single_column_data(function(bill_ids)
	{
		var services_data="<services>" +
				"<name>"+service+"</name>" +
				"</services>";
		get_single_column_data(function(services)
		{
			var services_array="--";
			for(var i in bill_ids)
			{
				services_array+=services[i]+"--";
			}
			
			var bill_id_array="--";
			for(var j in bill_ids)
			{
				bill_id_array+=bill_ids[j]+"--";
			}
			var services_data="<bill_items>" +
					"<bill_id array='yes'>"+bill_id_array+"</bill_id>" +
					"<amount></amount>" +
					"<item_name array='yes'>"+services_array+"</item_name>" +
					"<last_updated lowerbound='yes'>"+get_raw_time(start_date)+"</last_updated>" +
					"<last_updated upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</last_updated>" +
					"</bill_items>";
			fetch_requested_data('report39',services_data,function(service_array)
			{
				service_array.sort(function(a,b)
				{
					if(parseFloat(a.amount)<parseFloat(b.amount))
					{	return 1;}
					else 
					{	return -1;}
				});
						
				var result=transform_to_bar_sum(service_array,'Total Amount','amount','item_name');
				var mybarchart = new Chart(ctx).Bar(result,{});
				document.getElementById("report39_legend").innerHTML=mybarchart.generateLegend();
				
				var print_button=form.elements[5];
				print_graphical_report('report39','Sales by Services',print_button,mybarchart);
								
				hide_loader();
			});
		},services_data);
	},bills_data);
};
	
	</script>
</div>