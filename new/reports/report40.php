<div id='report40' class='tab-pane'>
	<form id='report40_header' autocomplete="off">
		<fieldset>
			<label>Number of days</br><input type='number' required title='Inventory is compared to sales over these many number of days'></label>
			<label>Select Product</br><input type='text' title='If no product is selected, only top 10 products are shown'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
</br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report40_legend" style='display: block;'></div></div>
		<canvas id="report40_canvas" class='report_sizing'></canvas>
	</div>
	
	<script>
function report40_header_ini()
{	
	var form=document.getElementById('report40_header');
	var nun_days=form.elements[1];
	var product_filter=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report40_ini();
	});

	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_filter(product_data,product_filter);
	
}

function report40_ini()
{
	show_loader();
	var form=document.getElementById('report40_header');
	var num_days=parseInt(form.elements[1].value);
	var product=form.elements[2].value;
	var raw_time=get_my_time()-(num_days*86400000);
	
	var canvas_parent=$("#report40_canvas").parent();
	$("#report40_canvas").remove();
	$(canvas_parent).append("<canvas id='report40_canvas' class='report_sizing'></canvas>");
	var ctx = document.getElementById("report40_canvas").getContext("2d");
	
	var bills_data="<bills>" +
			"<id></id>" +
			"<bill_date lowerbound='yes'>"+raw_time+"</bill_date>" +
			"<type array='yes'>--product--both--</type>" +
			"</bills>";
	get_single_column_data(function(bill_ids)
	{
		var bill_id_array="--";
		for(var i in bill_ids)
		{
			bill_id_array+=bill_ids[i]+"--";
		}
		var sales_data="<bill_items>" +
				"<bill_id array='yes'>"+bill_id_array+"</bill_id>" +
				"<quantity></quantity>" +
				"<item_name>"+product+"</item_name>" +
				"<last_updated lowerbound='yes'>"+raw_time+"</last_updated>" +
				"</bill_items>";
		fetch_requested_data('report40',sales_data,function(sales_array)
		{
			var sales_array_result=new Array();
			for(var k=0; k<sales_array.length;k++)
			{
				var new_obj=new Object();
				new_obj.item_name=sales_array[k].item_name;
				new_obj.quantity=parseFloat(sales_array[k].quantity);
				for(var j=k+1;j<sales_array.length;j++)
				{
					if(sales_array[j].item_name==new_obj.item_name)
					{
						new_obj.quantity+=parseFloat(sales_array[j].quantity);
						sales_array.splice(j,1);
						j-=1;
					}
				}
				sales_array_result.push(new_obj);
			}
			
			///modify sales_array_result as per search criteria
			
			sales_array_result.sort(function(a,b)
			{
				if(a.quantity<b.quantity)
				{	return 1;}
				else 
				{	return -1;}
			});
			
			var result=new Object();
			result.datasets=new Array();
			result.datasets[0]=new Object();
			result.datasets[0].label="Current Inventory";
			result.datasets[0].fillColor=getRandomColor();
			result.datasets[0].strokeColor=result.datasets[0].fillColor;
			result.datasets[0].highlightFill=getLighterColor(result.datasets[0].fillColor);
			result.datasets[0].highlightStroke=getLighterColor(result.datasets[0].fillColor);
			result.datasets[0].data=new Array();
			result.datasets[1]=new Object();
			result.datasets[1].label='Sold Quantity';
			result.datasets[1].fillColor=getRandomColor();
			result.datasets[1].strokeColor=result.datasets[1].fillColor;
			result.datasets[1].highlightFill=getLighterColor(result.datasets[1].fillColor);
			result.datasets[1].highlightStroke=getLighterColor(result.datasets[1].fillColor);
			result.datasets[1].data=new Array();
			
			result.labels=new Array();
			
			var sales_array_count=sales_array_result.length;
			
			sales_array_result.forEach(function(data1)
			{
				var label=data1.item_name;
				get_inventory(label,'',function(value0)
				{
					var value1=data1.quantity;
					if((value0>=value1 && result.labels.length<11))
					{
						result.labels.push(label);
						result.datasets[0].data.push(value0);
						result.datasets[1].data.push(value1);
					}
					sales_array_count-=1;
				});
			});

			var report_timer=setInterval(function()
			{
		  	   if(sales_array_count===0)
		  	   {
		  		   clearInterval(report_timer);
		  		   var mybarchart = new Chart(ctx).Bar(result,{});
		  		   document.getElementById("report40_legend").innerHTML=mybarchart.generateLegend();
		  		   
		  		   var print_button=form.elements[4];
		  		   print_graphical_report('report40','Surplus Inventory',print_button,mybarchart);
					
		  		   hide_loader();
		  	   }
		    },100);
		});
	},bills_data);
};
	
	</script>
</div>