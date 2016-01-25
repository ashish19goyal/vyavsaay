<div id='report55' class='tab-pane'>
	<form id='report55_header' autocomplete="off">
		<fieldset>
			<label>Start date<br><input type='text' required></label>
			<label>End date<br><input type='text' required></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report55_legend" style='display: block;'></div></div>
		<canvas id="report55_canvas" class='report_sizing'></canvas>
	</div>
	
	<script>
	
	function report55_header_ini()
{	
	var form=document.getElementById('report55_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report55_ini();
	});
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-86400000));
	end_date.value=get_my_date();
}

function report55_ini()
{
	show_loader();
	var form=document.getElementById('report55_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	
	var canvas_parent=$("#report55_canvas").parent();
	$("#report55_canvas").remove();
	$(canvas_parent).append("<canvas id='report55_canvas' class='report_sizing'></canvas>");
	
	var ctx = document.getElementById("report55_canvas").getContext("2d");
	
	var bills_data="<bills>" +
			"<id></id>" +
			"<total></total>" +
			"<bill_date lowerbound='yes'>"+get_raw_time(start_date)+"</bill_date>" +
			"<bill_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</bill_date>" +
			"</bills>";
	fetch_requested_data('report55',bills_data,function(bills)
	{
		for(var i=0;i<bills.length;i++)
		{
			for(var j=i+1;j<bills.length;j++)
			{
				if(bills[i].bill_date==bills[j].bill_date)
				{
					bills[i].total=parseFloat(bills[i].total)+parseFloat(bills[j].total);
					bills.splice(j,1);
					j-=1;
				}
			}
		}
		
		bills.sort(function(a,b)
		{
			if(parseFloat(a.total)>parseFloat(b.total))
			{	return 1;}
			else 
			{	return -1;}
		});
		
		bills.splice(10,bills.length);
		bills.forEach(function(bill)
		{
			bill.bill_date=get_my_past_date(bill.bill_date);
		});
		
		var result=transform_to_bar_sum(bills,'Total Sale','total','bill_date');
		var mybarchart = new Chart(ctx).Bar(result,{});
		document.getElementById("report55_legend").innerHTML=mybarchart.generateLegend();
		
		var print_button=form.elements[4];
		print_graphical_report('report55','Worst days (by Sales)',print_button,mybarchart);
		hide_loader();
	});
};

	</script>
</div>