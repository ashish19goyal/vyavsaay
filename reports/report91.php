<div id='report91' class='tab-pane'>
	<form id='report91_header' autocomplete="off">
		<fieldset>
			<label>Brand<br><input type='text' name='brand' required></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' name='print' class='print_icon'>
				<input type='button' title='Download CSV' class='csv_icon' name='csv'>
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>SKU</th>
				<th>Item Name</th>
				<th>Brand</th>
				<th>Quantity</th>
			</tr>
		</thead>
		<tbody id='report91_body'>
		</tbody>
	</table>
	
	<script>

function report91_header_ini()
{	
	var form=document.getElementById('report91_header');
	var brand_filter=form.elements['brand'];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report91_ini();
	});

/*	var company_data="<product_master>"+
				"<make></make>"+
				"</product_master>";
	set_my_filter(company_data,company_filter);
*/
	var brand_data="<product_master>"+
				"<make></make>"+
				"</product_master>";
	set_my_value_list(brand_data,brand_filter);
}

function report91_ini()
{
	show_loader();
	var form=document.getElementById('report91_header');
	var brand=form.elements['brand'].value;
	
	$('#report91_body').html('');

	var master_data="<product_master>" +
			"<id></id>" +
			"<name></name>" +
			"<description></description>"+
			"<make exact='yes'>"+brand+"</make>" +
			"</product_master>";
	
	fetch_requested_data('report91',master_data,function(products)
	{
		var report91_count=products.length;
		products.forEach(function(result)
		{
			var rowsHTML="<tr>";
				rowsHTML+="<td data-th='SKU'>";
					rowsHTML+=result.name;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Item Name'>";
					rowsHTML+=result.description;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Brand'>";
					rowsHTML+=result.make;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Inventory' id='report91_inventory_"+result.id+"'>";
				rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#report91_body').append(rowsHTML);
			
			get_inventory(result.name,'',function(inventory)
			{
				document.getElementById('report91_inventory_'+result.id).innerHTML=inventory;
				result.inventory=inventory;
				report91_count-=1;
			});
		});
		
		var report91_complete=setInterval(function()
		{
	  	   if(report91_count===0)
	  	   {
				clearInterval(report91_complete);
				hide_loader();	  		   
	  	   }
	     },1000);
	     
	    var print_button=form.elements['print'];
		print_tabular_report('report91','Inventory Report by Brand',print_button);

		var csv_button=form.elements['csv'];
		$(csv_button).off("click");
		$(csv_button).on("click", function(event)
		{
			var new_products=[];
			products.forEach(function(product)
			{
				var new_product=new Object();
				new_product.sku=product.name;
				new_product.description=product.description;
				new_product.make=product.make;
				new_product.inventory=product.inventory;
				new_products.push(new_product);
			});
			csv_download_report(new_products,'Brand_wise_inventory');
		});
	});
};
	
	</script>
</div>