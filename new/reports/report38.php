<div id='report38' class='tab-pane'>
	<form id='report38_header' autocomplete="off">
		<fieldset>
			<label>Start date</br><input type='text' required></label>
			<label>End date</br><input type='text' required></label>
			<label>Select Product</br><input type='text' title='If this field is left blank, top 10 products will be selected'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	</br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report38_legend" style='display: block;'></div></div>
		<canvas id="report38_canvas" class='report_sizing'></canvas>
	</div>
	
	<script>
function report38_header_ini()
{	
	var form=document.getElementById('report38_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];
	var product_filter=form.elements[3];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report38_ini();
	});

	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_filter(product_data,product_filter);
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-86400000));
	end_date.value=get_my_date();
}
function report38_ini()
{
	show_loader();
	var form=document.getElementById('report38_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	var product=form.elements[3].value;
	
	var canvas_parent=$("#report38_canvas").parent();
	$("#report38_canvas").remove();
	$(canvas_parent).append("<canvas id='report38_canvas' class='report_sizing'></canvas>");
	
	var ctx = document.getElementById("report38_canvas").getContext("2d");
	var bills_data="<bills>" +
			"<id></id>" +
			"<bill_date lowerbound='yes'>"+get_raw_time(start_date)+"</bill_date>" +
			"<bill_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</bill_date>" +
			"</bills>";

	get_single_column_data(function(bill_ids)
	{
		var products_data="<product_master>" +
				"<name>"+product+"</name>" +
				"</product_master>";

		get_single_column_data(function(products)
		{
			var products_array="--";
			for(var i in products)
			{
				products_array+=products[i]+"--";
			}
			
			var bill_id_array="--";
			for(var y in bill_ids)
			{
				bill_id_array+=bill_ids[y]+"--";
			}
			
			var products_data="<bill_items>" +
					"<bill_id array='yes'>"+bill_id_array+"</bill_id>" +
					"<amount></amount>" +
					"<item_name array='yes'>"+products_array+"</item_name>" +
					"<last_updated lowerbound='yes'>"+get_raw_time(start_date)+"</last_updated>" +
					"<last_updated upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</last_updated>" +
					"</bill_items>";
			fetch_requested_data('report38',products_data,function(product_array)
			{
				var result=transform_to_bar_sum(product_array,'Total Amount','amount','item_name');
				var mybarchart = new Chart(ctx).Bar(result,{});
				document.getElementById("report38_legend").innerHTML=mybarchart.generateLegend();
				
				var print_button=form.elements[5];
				print_graphical_report('report38','Sales by Products',print_button,mybarchart);
				
				hide_loader();
			});
		},products_data);
	},bills_data);
};
	
	</script>
</div>