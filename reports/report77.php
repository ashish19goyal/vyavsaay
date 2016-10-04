<div id='report77' class='tab-pane'>
	<form id='report77_header' autocomplete="off">
		<fieldset>
			<label>Item<br><input type='text' required></label>
			<label>Batch<br><input type='text'></label>
			<label>	
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
				<input type='button' title='Download CSV' class='csv_icon' name='csv'>			
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Item</th>
				<th>Batch</th>
				<th>Quantity</th>
				<th>Storage</th>
			</tr>
		</thead>
		<tbody id='report77_body'>
		</tbody>
	</table>
	
	<script>

function report77_header_ini()
{	
	var form=document.getElementById('report77_header');
	var item_filter=form.elements[1];
	var batch_filter=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report77_ini();
	});

	var item_data="<product_master>"+
				"<name></name>"+
				"</product_master>";
	set_my_filter(item_data,item_filter);
	
	var batch_data="<product_instances>"+
				"<batch></batch>"+
				"</product_instances>";
	set_my_filter(batch_data,batch_filter);				
}

function report77_ini()
{
	var form=document.getElementById('report77_header');
	var item_filter=form.elements[1].value;
	var batch_filter=form.elements[2].value;
	
	show_loader();
	
	var total_calls=0;
	$('#report77_body').html('');
		
	var item_data="<area_utilization>"+
			"<name></name>"+
			"<item_name exact='yes'>"+item_filter+"</item_name>"+
			"<batch>"+batch_filter+"</batch>"+
			"</area_utilization>";	
						
	fetch_requested_data('report77',item_data,function(items)
	{
		for(var i=0;i<items.length;i++)
		{
			for(var j=i+1;j<items.length;j++)
			{
				if(items[i].item_name==items[j].item_name && items[i].batch==items[j].batch && items[i].name==items[j].name)
				{
					items.splice(j,1);
					j--;
				}
			}
		}
		
		var total_calls=0;			
		items.forEach(function(item)
		{
			total_calls+=1;
			get_store_inventory(item.name,item.item_name,item.batch,function(quantity)
			{
				item.quantity=parseFloat(quantity);
				total_calls-=1;
			});
		});					
							
		var inventory_complete=setInterval(function()
		{
			if(total_calls===0)
			{
	  	   		clearInterval(inventory_complete);
	  	   		var rowsHTML="";
					
				items.forEach(function (item) 
				{
					rowsHTML+="<tr>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+=item.item_name;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+=item.batch;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+=item.quantity;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Storage'>";
						rowsHTML+=item.name;
					rowsHTML+="</td>";
					rowsHTML+="</tr>";					
				});
				$('#report77_body').html(rowsHTML);

				var csv_button=form.elements['csv'];
				$(csv_button).off("click");
				$(csv_button).on("click", function(event)
				{
					var new_products=[];
					items.forEach(function(product)
					{
						var new_product=new Object();
						new_product.Storage=product.name;
						new_product.Item=product.item_name;
						new_product.Batch=product.batch;
						new_product.Quantity=product.quantity;
						new_products.push(new_product);
					});
					csv_download_report(new_products,'inventory_storage_by_item');
				});
				hide_loader();
			}
	     },50);		
	});	
	
	var print_button=form.elements[4];
	print_tabular_report('report77','Inventory Storage (by item)',print_button);
};
	
	</script>
</div>