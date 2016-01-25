<div id='report9' class='tab-pane'>
	<form id='report9_header' autocomplete="off">
		<fieldset>
			<label>Item<br><input type='text'></label>
			<label>Brand<br><input type='text'></label>
			<label>Customer<br><input type='text'></label>
			<label>Start Date<br><input type='text' required></label>
			<label>End Date<br><input type='text' required></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Item</th>
				<th>Brand</th>
				<th>Customer</th>
				<th>Quantity</th>
				<th>Amount</th>
			</tr>
		</thead>
		<tbody id='report9_body'>
		</tbody>
		<tfoot id='report9_foot'>
		</tfoot>
	</table>
	
	<script>

function report9_header_ini()
{	
	var form=document.getElementById('report9_header');
	var name_filter=form.elements[1];
	var make_filter=form.elements[2];
	var customer_filter=form.elements[3];
	var start_date_filter=form.elements[4];
	var end_date_filter=form.elements[5];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report9_ini();
	});

	var name_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var make_data="<product_master>" +
			"<make></make>" +
			"</product_master>";
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(name_data,name_filter);
	set_my_filter(make_data,make_filter);
	set_my_filter(customer_data,customer_filter);
	
	$(start_date_filter).datepicker();
	$(end_date_filter).datepicker();
	$(start_date_filter).val(get_my_past_date((get_my_time()-86400000)));
	$(end_date_filter).val(get_my_date());
}

function report9_ini()
{
	var form=document.getElementById('report9_header');
	var name=form.elements[1].value;
	var make=form.elements[2].value;
	var customer=form.elements[3].value;
	var start_date=form.elements[4].value;
	var end_date=form.elements[5].value;
	
	show_loader();
	$('#report9_body').html('');
	var rowsHTML="";
	
	var bills_data="<bills>" +
				"<id></id>" +
				"<customer_name>"+customer+"</customer_name>" +
				"<bill_date lowerbound='yes'>"+get_raw_time(start_date)+"</bill_date>" +
				"<bill_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</bill_date>" +
				"</bills>";
	var bill_return_data="<customer_returns>"+
				"<id></id>"+
				"<customer>"+customer+"</customer>"+
				"<return_date lowerbound='yes'>"+get_raw_time(start_date)+"</return_date>" +
				"<return_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</return_date>" +
				"</customer_returns>";	
	fetch_requested_data('report9',bills_data,function(bills)
	{
		fetch_requested_data('report9',bill_return_data,function(bill_returns)
		{
			var bills_string="--";
			for(var i in bills)
			{
				bills_string+=bills[i].id+"--";
			}
			var returns_string="--";
			for(var j in bill_returns)
			{
				returns_string+=bill_returns[j].id+"--";
			}
			
			var bill_items_data="<bill_items>" +
					"<bill_id array='yes'>"+bills_string+"</bill_id>" +
					"<item_name>"+name+"</item_name>" +
					"<quantity></quantity>" +
					"<amount></amount>" +
					"<last_updated lowerbound='yes'>"+get_raw_time(start_date)+"</last_updated>" +
					"<last_updated upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</last_updated>" +
					"</bill_items>";
			var return_items_data="<customer_return_items>" +
					"<return_id array='yes'>"+returns_string+"</return_id>" +
					"<item_name>"+name+"</item_name>" +
					"<quantity></quantity>" +
					"<refund_amount></refund_amount>" +
					"<exchange_batch></exchange_batch>"+
					"<last_updated lowerbound='yes'>"+get_raw_time(start_date)+"</last_updated>" +
					"<last_updated upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</last_updated>" +
					"</customer_return_items>";
			
			fetch_requested_data('report9',bill_items_data,function(bill_ids)
			{
				fetch_requested_data('report9',return_items_data,function(bill_return_ids)
				{
					var product_string="--";
					for(var j in bill_ids)
					{
						product_string+=bill_ids[j].item_name+"--";
					}
					for(var k in bill_return_ids)
					{
						product_string+=bill_return_ids[j].item_name+"--";
					}
					
					var make_data="<product_master>" +
							"<name array='yes'>"+product_string+"</name>" +
							"<make>"+make+"</make>" +
							"</product_master>";

					fetch_requested_data('report9',make_data,function(makes)
					{
						var total_quantity=0;
						var total_amount=0;
						for(var k in bill_ids)
						{
							for(var z in makes)
							{
								if(bill_ids[k].item_name==makes[z].name)
								{
									var customer_name="";
									for(var m in bills)
									{
										if(bills[m].id==bill_ids[k].bill_id)
										{
											customer_name=bills[m].customer_name;
											break;
										}
									}
									total_quantity+=parseFloat(bill_ids[k].quantity);
									total_amount+=parseFloat(bill_ids[k].amount);
									rowsHTML+="<tr>";
										rowsHTML+="<td data-th='Item'>";
											rowsHTML+=bill_ids[k].item_name;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Brand'>";
											rowsHTML+=makes[z].make;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Customer'>";
											rowsHTML+=customer_name;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Quantity'>";
											rowsHTML+=bill_ids[k].quantity;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Amount'>";
											rowsHTML+="Rs. "+bill_ids[k].amount;
										rowsHTML+="</td>";
									rowsHTML+="</tr>";
									break;
								}
							}
						}
						for(var k in bill_return_ids)
						{
							if(bill_return_ids[k].exchange_batch=='null' || bill_return_ids[k].exchange_batch=='')
							{
								for(var z in makes)
								{
									if(bill_return_ids[k].item_name==makes[z].name)
									{
										var customer_name="";
										for(var m in bill_returns)
										{
											if(bill_returns[m].id==bill_return_ids[k].return_id)
											{
												customer_name=bill_returns[m].customer;
												break;
											}
										}
										total_quantity-=parseFloat(bill_return_ids[k].quantity);
										total_amount-=parseFloat(bill_return_ids[k].refund_amount);
										rowsHTML+="<tr>";
											rowsHTML+="<td data-th='Item'>";
												rowsHTML+=bill_return_ids[k].item_name;
											rowsHTML+="</td>";
											rowsHTML+="<td data-th='Brand'>";
												rowsHTML+=makes[z].make;
											rowsHTML+="</td>";
											rowsHTML+="<td data-th='Customer'>";
												rowsHTML+=customer_name;
											rowsHTML+="</td>";
											rowsHTML+="<td data-th='Quantity'>";
												rowsHTML+="-"+bill_return_ids[k].quantity;
											rowsHTML+="</td>";
											rowsHTML+="<td data-th='Amount'>";
												rowsHTML+="Rs. -"+ bill_return_ids[k].refund_amount;
											rowsHTML+="</td>";
										rowsHTML+="</tr>";
										break;
									}
								}
							}
						}
						$('#report9_body').html(rowsHTML);
						
						var total_row="<tr><td colspan='3' data-th='Total'>Total</td><td data-th='Quantity'>"+total_quantity+"</td><td data-th='Amount'>Rs. "+Math.round(total_amount)+"</td></tr>";
						$('#report9_foot').html(total_row);
						
						var print_button=form.elements[7];
						print_tabular_report('report9','Product Sales Report',print_button);
						
						hide_loader();
					});
				});
			});
		});
	});
};

	
	</script>
</div>