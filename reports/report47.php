<div id='report47' class='tab-pane'>
	<form id='report47_header' autocomplete="off">
		<fieldset>
			<label>Product</br><input type='text' title='If this field is left blank, top 10 products will be shown'></label>
			<label>Show total inventory</br><input type='checkbox' title='Tick this to show sum total of all products in inventory'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	</br>
	<div style="min-height:365px;">
			<div><b>Legend</b><div id="report47_legend" style='display: block;'></div></div>
		<canvas id="report47_canvas" class='report_sizing'></canvas>
	</div>
	
	<script>

function report47_header_ini()
{	
	var form=document.getElementById('report47_header');
	var product_filter=form.elements[1];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report47_ini();
	});

	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_filter(product_data,product_filter);
}

function report47_ini()
{
	show_loader();
	var form=document.getElementById('report47_header');
	var product_name=form.elements[1].value;
	var select_all=form.elements[2];
	
	var canvas_parent=$("#report47_canvas").parent();
	$("#report47_canvas").remove();
	$(canvas_parent).append("<canvas id='report47_canvas' class='report_sizing'></canvas>");
	var ctx = document.getElementById("report47_canvas").getContext("2d");
	
	var products_data="<product_instances>" +
			"<product_name>"+product_name+"</product_name>" +
			"<batch></batch>" +
			"<cost_price></cost_price>" +
			"<sale_price></sale_price>" +
			"</product_instances>";
	fetch_requested_data('report47',products_data,function(products)
	{
		/////setting inventory value//////
		var products_inventory_count=products.length;
		var inventory_cost_price=0;
		var inventory_sale_price=0;
		products.forEach(function(product)
		{
			get_inventory(product.product_name,product.batch,function(quantity)
			{
				product.cost=parseFloat(quantity)*parseFloat(product.cost_price);
				product.sale=parseFloat(quantity)*parseFloat(product.sale_price);
				inventory_cost_price+=product.cost;
				inventory_sale_price+=product.sale;
				products_inventory_count-=1;
			});
		});
				
		/////////chart preparation/////////
		var result=new Object();
		result.datasets=new Array();
		result.datasets[0]=new Object();
		result.datasets[0].label="Sale Value";
		result.datasets[0].fillColor=getRandomColor();
		result.datasets[0].strokeColor=result.datasets[0].fillColor;
		result.datasets[0].highlightFill=getLighterColor(result.datasets[0].fillColor);
		result.datasets[0].highlightStroke=getLighterColor(result.datasets[0].fillColor);
		result.datasets[0].data=new Array();
		result.datasets[1]=new Object();
		result.datasets[1].label='Purchase Value';
		result.datasets[1].fillColor=getRandomColor();
		result.datasets[1].strokeColor=result.datasets[1].fillColor;
		result.datasets[1].highlightFill=getLighterColor(result.datasets[1].fillColor);
		result.datasets[1].highlightStroke=getLighterColor(result.datasets[1].fillColor);
		result.datasets[1].data=new Array();
		
		result.labels=new Array();
		
		//////final settings////////////
		var report_timer=setInterval(function()
		{
	  	   if(products_inventory_count===0)
	  	   {
	  		   clearInterval(report_timer);
	  		   if(select_all.checked)
	  		   {
		  		   result.labels.push('Total Inventory');
		  		   result.datasets[0].data.push(Math.round(inventory_sale_price));
		  		   result.datasets[1].data.push(Math.round(inventory_cost_price));
	  		   }
	  		   else
	  		   {
	  			   for(var i=0;i<products.length;i++)
	  			   {
	  				   for(var j=i+1; j<products.length;j++)
	  				   {
	  					   if(products[i].product_name==products[j].product_name)
	  					   {
	  						 products[i].cost+=products[j].cost;
	  						 products[i].sale+=products[j].sale;
	  						 products.splice(j,1);
		  					 j-=1;
	  					   }
	  				   }
	  				   if(result.labels.length<11)
	  				   {
		  				   result.labels.push(products[i].product_name);
				  		   result.datasets[0].data.push(Math.round(products[i].sale));
				  		   result.datasets[1].data.push(Math.round(products[i].cost));
	  				   }
	  				   else
	  				   {
	  					   break;
	  				   }
	  			   }
	  		   }
	  		   var mybarchart=new Chart(ctx).Bar(result,{});
	  		   document.getElementById("report47_legend").innerHTML=mybarchart.generateLegend();

	  		   var print_button=form.elements[4];
	  		   print_graphical_report('report47','Inventory Value',print_button,mybarchart);
				
	  		   hide_loader();
	  	   }
	    },100);
	});
};
	
	</script>
</div>