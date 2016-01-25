<div id='report97' class='tab-pane'>
	<form id='report97_header' autocomplete="off">
		<fieldset>
			<label>Type<br><input type='text' required name='type'></label>
			<label>City<br><input type='text' name='city'></label>
			<label>Item<br><input type='text' name='item_name'></label>
			<label>Person<br><input type='text' name='customer'></label>
			<input type='submit' class='generic_icon' value='Refresh'>
			<input type='button' class='print_icon' name='print'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th style='width:auto;'>Lead Id</th>
				<th style='width:auto;'>Person</th>
				<th style='width:auto;'>Item</th>
				<th style='width:auto;'>Details</th>
			</tr>
		</thead>
		<tbody id='report97_body'>
		</tbody>
		<tfoot id='report97_foot'>
		</tfoot>
	</table>
	
	<script>
function report97_header_ini()
{	
	var form=document.getElementById('report97_header');
	var type_filter=form.elements['type'];
	var city_filter=form.elements['city'];
	var item_filter=form.elements['item_name'];
	var cust_filter=form.elements['customer'];
	
	$('#report97_body').html('');

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report97_ini();
	});

	var city_data=new Object();
		city_data.data_store='cities_data';
		city_data.indexes=[{index:'city'}];		
		city_data.return_column='city';
	set_my_filter_json(city_data,city_filter);

	var item_data=new Object();
		item_data.data_store='product_master';
		item_data.indexes=[{index:'name'}];		
		item_data.return_column='name';
	set_my_filter_json(item_data,item_filter);

	var cust_data=new Object();
		cust_data.data_store='accounts';
		cust_data.indexes=[{index:'acc_name'}];		
		cust_data.return_column='acc_name';
	set_my_filter_json(cust_data,cust_filter);

	set_static_filter_json('leads_type','type',type_filter,function () 
	{
		$(type_filter).focus();
	});	
}

function report97_ini()
{
	show_loader();
	var form=document.getElementById('report97_header');
	
	var type_filter=form.elements['type'].value;
	var city_filter=form.elements['city'].value;
	var item_filter=form.elements['item_name'].value;
	var customer_filter=form.elements['customer'].value;
	
	$('#report97_body').html('');

	if(type_filter=='buyer')
	{
		var list1_data=new Object();
			list1_data.count=0;
			list1_data.start_index=0;
			list1_data.data_store='customers';		
			list1_data.return_column='acc_name';		
					
			list1_data.indexes=[{index:'id'},
								{index:'acc_name',value:customer_filter},
								{index:'city',value:city_filter}];
	
		read_json_single_column(list1_data,function(customers)
		{
			var list_data=new Object();
				list_data.count=0;
				list_data.start_index=0;
				list_data.data_store='sale_leads';		
						
				list_data.indexes=[{index:'id'},{index:'status'},{index:'price'},{index:'quantity'},{index:'detail'},
								{index:'item_name',value:item_filter},
								{index:'customer',array:customers}];
				
			read_json_rows('report97',list_data,function(leads)
			{
				leads.forEach(function(result)
				{	
					var rowsHTML="<tr>";
						rowsHTML+="<td data-th='Lead Id'>";
							rowsHTML+="<u onclick=\"element_display('"+result.id+"','form289');\">"+result.id+"</u>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Customer'>";
							rowsHTML+=result.customer;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+=result.item_name;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Details'>";
							rowsHTML+="<b>Quantity</b>: "+result.quantity;
							rowsHTML+="<br><b>Price</b>: Rs. "+result.price;
							rowsHTML+="<br><b>Status</b>: "+result.status;
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
					
					$('#report97_body').append(rowsHTML);
				});
				
				var print_button=form.elements['print'];
				print_tabular_report('report97','Leads',print_button);
				hide_loader();
			});
			
		});
	}
	else if(type_filter=='seller')
	{
		var list1_data=new Object();
			list1_data.count=0;
			list1_data.start_index=0;
			list1_data.data_store='suppliers';		
			list1_data.return_column='acc_name';		
					
			list1_data.indexes=[{index:'id'},
								{index:'acc_name',value:customer_filter},
								{index:'city',value:city_filter}];
	
		read_json_single_column(list1_data,function(suppliers)
		{
			var list_data=new Object();
				list_data.count=0;
				list_data.start_index=0;
				list_data.data_store='purchase_leads';		
						
				list_data.indexes=[{index:'id'},{index:'status'},{index:'price'},{index:'quantity'},{index:'detail'},
								{index:'item_name',value:item_filter},
								{index:'supplier',array:suppliers}];
				
			read_json_rows('report97',list_data,function(leads)
			{
				leads.forEach(function(result)
				{	
					var rowsHTML="<tr>";
						rowsHTML+="<td data-th='Lead Id'>";
							rowsHTML+="<u onclick=\"element_display('"+result.id+"','form273');\">"+result.id+"</u>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Supplier'>";
							rowsHTML+=result.supplier;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+=result.item_name;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Details'>";
							rowsHTML+="<b>Quantity</b>: "+result.quantity;
							rowsHTML+="<br><b>Price</b>: Rs. "+result.price;
							rowsHTML+="<br><b>Status</b>: "+result.status;
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
					
					$('#report97_body').append(rowsHTML);
				});
				
				var print_button=form.elements['print'];
				print_tabular_report('report97','Leads',print_button);
				hide_loader();
			});
			
		});
	}
};
	
	</script>	
</div>