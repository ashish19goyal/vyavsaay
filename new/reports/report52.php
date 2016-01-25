<div id='report52' class='tab-pane'>
	<form id='report52_header' autocomplete="off">
		<fieldset>
			<label>Product Name<br><input type='text'></label>
			<label>Make<br><input type='text'></label>
			<label>Supplier<br><input type='text'></label>
			<label>Date Since<br><input type='text' required></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Product Name</th>
				<th>Brand</th>
				<th>Supplier</th>
				<th>Quantity</th>
				<th>Amount</th>
			</tr>
		</thead>
		<tbody id='report52_body'>
		</tbody>
		<tfoot id='report52_foot'>
		</tfoot>
	</table>
	
	<script>

function report52_header_ini()
{	
	var form=document.getElementById('report52_header');
	var name_filter=form.elements[1];
	var make_filter=form.elements[2];
	var supplier_filter=form.elements[3];
	var date_filter=form.elements[4];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report52_ini();
	});

	var name_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var make_data="<product_master>" +
			"<make></make>" +
			"</product_master>";
	var supplier_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	
	set_my_filter(name_data,name_filter);
	set_my_filter(make_data,make_filter);
	set_my_filter(supplier_data,supplier_filter);
	
	$(date_filter).datepicker();
	$(date_filter).val(get_my_past_date((get_my_time()-86400000)));
}

function report52_ini()
{
	var form=document.getElementById('report52_header');
	var name=form.elements[1].value;
	var make=form.elements[2].value;
	var supplier=form.elements[3].value;
	var date=form.elements[4].value;
	
	show_loader();
	$('#report52_body').html('');
	var rowsHTML="";
	
	var bills_data="<supplier_bills>" +
			"<id></id>" +
			"<supplier>"+supplier+"</supplier>" +
			"<entry_date lowerbound='yes'>"+get_raw_time(date)+"</entry_date>" +
			"</supplier_bills>";
	var returns_data="<supplier_returns>"+
					"<id></id>"+
					"<return_date lowerbound='yes'>"+get_raw_time(date)+"</return_date>" +
					"</supplier_returns>";
	fetch_requested_data('report52',bills_data,function(bills)
	{
		fetch_requested_data('report52',returns_data,function(returns)
		{
			var bills_string="--";
			for(var i in bills)
			{
				bills_string+=bills[i].id+"--";
			}
			var returns_string="--";
			for(var j in returns)
			{
				returns_string+=returns[j].id+"--";
			}
			
			var bill_items_data="<supplier_bill_items>" +
					"<bill_id array='yes'>"+bills_string+"</bill_id>" +
					"<product_name>"+name+"</product_name>" +
					"<quantity></quantity>" +
					"<amount></amount>" +
					"<last_updated lowerbound='yes'>"+get_raw_time(date)+"</last_updated>" +
					"</supplier_bill_items>";
			var return_items_data="<supplier_return_items>" +
					"<return_id array='yes'>"+returns_string+"</return_id>" +
					"<item_name>"+name+"</item_name>" +
					"<quantity></quantity>" +
					"<refund_amount></refund_amount>" +
					"<last_updated lowerbound='yes'>"+get_raw_time(date)+"</last_updated>" +
					"</supplier_return_items>";
			
			fetch_requested_data('report52',bill_items_data,function(bill_ids)
			{
				fetch_requested_data('report52',return_items_data,function(return_ids)
				{
					var product_string="--";
					for(var j in bill_ids)
					{
						product_string+=bill_ids[j].product_name+"--";
					}
					for(var k in return_ids)
					{
						product_string+=return_ids[k].item_name+"--";
					}
					
					var make_data="<product_master>" +
							"<name array='yes'>"+product_string+"</name>" +
							"<make>"+make+"</make>" +
							"</product_master>";
		
					fetch_requested_data('report52',make_data,function(makes)
					{
						var total_amount=0;
						for(var k in bill_ids)
						{
							for(var z in makes)
							{
								if(bill_ids[k].product_name==makes[z].name)
								{
									var supplier_name="";
									for(var m in bills)
									{
										if(bills[m].id==bill_ids[k].bill_id)
										{
											supplier_name=bills[m].supplier;
											break;
										}
									}
									
									total_amount+=parseFloat(bill_ids[k].amount);
										
									rowsHTML+="<tr>";
										rowsHTML+="<td data-th='Product Name'>";
											rowsHTML+=bill_ids[k].product_name;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Brand'>";
											rowsHTML+=makes[z].make;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Supplier'>";
											rowsHTML+=supplier_name;
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
						for(var k in return_ids)
						{
							for(var z in makes)
							{
								if(return_ids[k].item_name==makes[z].name)
								{
									var supplier_name="";
									for(var m in returns)
									{
										if(returns[m].id==return_ids[k].return_id)
										{
											supplier_name=bills[m].supplier;
											break;
										}
									}
									
									total_amount-=parseFloat(return_ids[k].refund_amount);
										
									rowsHTML+="<tr>";
										rowsHTML+="<td data-th='Product Name'>";
											rowsHTML+=return_ids[k].item_name;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Brand'>";
											rowsHTML+=makes[z].make;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Supplier'>";
											rowsHTML+=supplier_name;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Quantity'>";
											rowsHTML+="-"+return_ids[k].quantity;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Amount'>";
											rowsHTML+="Rs. -"+return_ids[k].refund_amount;
										rowsHTML+="</td>";
									rowsHTML+="</tr>";
									break;
								}
							}
						}
						$('#report52_body').html(rowsHTML);
						
						var total_row="<tr><td colspan='4' data-th='Total'>Total</td><td data-th='Amount'>Rs. "+total_amount+"</td></tr>";
						$('#report52_foot').html(total_row);
						
						var print_button=form.elements[6];
						print_tabular_report('report52','Product Compare Report',print_button);
						
						hide_loader();
					});
				});
			});
		});
	});
};
	
	</script>
</div>