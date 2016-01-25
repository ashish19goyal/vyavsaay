<div id='report51' class='tab-pane'>
	<form id='report51_header' autocomplete="off">
		<fieldset>
			<label>Product</br><input type='text' title='If this field is blank, all applicable suppliers will be shown'></label>
			<label>Date since</br><input type='text' title='Date since the items are dead'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Product</th>
				<th>Inventory</th>
				<th></th>
			</tr>
		</thead>
		<tbody id='report51_body'>
		</tbody>
	</table>
	
	<script>

function report51_header_ini()
{	
	var form=document.getElementById('report51_header');
	var product_filter=form.elements[1];
	var date_filter=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report51_ini();
	});

	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_filter(product_data,product_filter);

	$(date_filter).datepicker();
}

function report51_ini()
{
	show_loader();
	var form=document.getElementById('report51_header');
	var product_name=form.elements[1].value;
	var date_since=get_raw_time(form.elements[2].value);
	
	$('#report51_body').html('');

	var product_data="<product_master>" +
			"<name>"+product_name+"</name>" +
			"</product_master>";
	
	get_single_column_data(function(products)
	{
		var product_string="--";
		for(var i in products)
		{
			product_string+=products[i]+"--";
		}
		
		var bill_data="<bill_items>" +
				"<item_name array='yes'>"+product_string+"</item_name>" +
				"<last_updated lowerbound='yes'>"+date_since+"</last_updated>" +
				"</bill_items>";
		
		get_single_column_data(function(bill_items)
		{			
			var report_count=products.length;
			
			products.forEach(function(product)
			{
				var sold=false;
				for(var i in bill_items)
				{
					if(bill_items[i]==product)
					{
						sold=true;
						break;
					}
				}
				if(!sold)
				{
					get_inventory(product,'',function(quantity)
					{
						var rowsHTML="<tr>";
							rowsHTML+="<td data-th='Product'>";
								rowsHTML+=product;
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Inventory'>";
								rowsHTML+=quantity;
							rowsHTML+="</td>";
						rowsHTML+="</tr>";
						
						$('#report51_body').append(rowsHTML);
						report_count-=1;
					});
				}
				else
				{
					report_count-=1;
				}
			});

			var report_complete=setInterval(function()
			{
			   if(report_count===0)
			   {
				   clearInterval(report_complete);
				   hide_loader();
			   }
			},1000);
		},bill_data);
	},product_data);
	
	var print_button=form.elements[4];
	print_tabular_report('report51','Dead Items',print_button);

};
	
	</script>
</div>