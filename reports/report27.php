<div id='report27' class='tab-pane'>
	<form id='report27_header' autocomplete="off">
		<fieldset>
			<label>Expiry by</br><input type='text' required></label>
			<label>Select Product</br><input type='text' title='If this field is left blank, top 10 products will be selected'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	</br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report27_legend" style='display: block;'></div></div>
		<canvas id="report27_canvas" class='report_sizing'></canvas>
	</div>
	
	<script>
	function report27_header_ini()
{	
	var form=document.getElementById('report27_header');
	var expiry_date=form.elements[1];
	var product_filter=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report27_ini();
	});

	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_filter(product_data,product_filter);
	
	$(expiry_date).datepicker();
	expiry_date.value=vTime.date();
}

function report27_ini()
{
	show_loader();
	var form=document.getElementById('report27_header');
	var expiry_date=form.elements[1].value;
	var product_name=form.elements[2].value;
	
	var canvas_parent=$("#report27_canvas").parent();
	$("#report27_canvas").remove();
	$(canvas_parent).append("<canvas id='report27_canvas' class='report_sizing'></canvas>");
	var ctx = document.getElementById("report27_canvas").getContext("2d");
	
	var product_data="<product_instances>" +
			"<product_name>"+product_name+"</product_name>" +
			"<batch></batch>" +
			"<expiry upperbound='yes'>"+get_raw_time(expiry_date)+"</expiry>" +
			"</product_instances>";

	fetch_requested_data('report27',product_data,function(products)
	{
		var products_count=products.length;
		products.forEach(function(data1)
		{
			get_inventory(data1.product_name,data1.batch,function(value0)
			{
				data1.quantity=value0;
				products_count-=1;
			});
		});

		var report_timer=setInterval(function()
		{
	  	   if(products_count===0)
	  	   {
	  		   clearInterval(report_timer);
	  		   var result=transform_to_bar_sum(products,'Quantity','quantity','product_name');
	  		   var mybarchart = new Chart(ctx).Bar(result,{});
	  		   document.getElementById("report27_legend").innerHTML=mybarchart.generateLegend();
	  		   
	  		   var print_button=form.elements[4];
	  		   print_graphical_report('report27','Expiring Inventory',print_button,mybarchart);
	  		   
	  		   hide_loader();
	  	   }
	    },100);
		
	});
};

	</script>
</div>