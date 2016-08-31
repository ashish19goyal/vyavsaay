<div id='report65' class='tab-pane'>
	<form id='report65_header' autocomplete="off">
		<fieldset>
			<label>Channel<br><input type='text'></label>
			<label>Item<br><input type='text'></label>
			<label>	
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' name='print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Channel</th>
				<th>Item</th>
				<th>Price</th>
				<th>Time</th>
			</tr>
		</thead>
		<tbody id='report65_body'>
		</tbody>
	</table>
	
	<script>

function report65_header_ini()
{	
	var form=document.getElementById('report65_header');
	var channel_filter=form.elements[1];
	var item_filter=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report65_ini();
	});

	var item_data="<product_master>"+
				"<name></name>"+
				"</product_master>";
	set_my_filter(item_data,item_filter);

	var channel_data="<sale_channels>"+
				"<name></name>"+
				"</sale_channels>";
	set_my_filter(channel_data,channel_filter);
	
}

function report65_ini()
{
	var form=document.getElementById('report65_header');
	var channel_filter=form.elements[1].value;
	var item_filter=form.elements[2].value;
	
	show_loader();
	$('#report65_body').html('');
		
	var prices_data="<channel_prices>" +
			"<id></id>"+
			"<channel>"+channel_filter+"</channel>"+
			"<item>"+item_filter+"</item>" +
			"<sale_price></sale_price>"+
			"<freight></freight>"+
			"<discount_customer></discount_customer>"+
			"<profit_mrp></profit_mrp>"+
			"<profit_sp></profit_sp>"+
			"<profit></profit>"+
			"<gateway_charges></gateway_charges>"+
			"<storage_charges></storage_charges>"+
			"<total_charges></total_charges>"+
			"<service_tax></service_tax>"+
			"<total_payable></total_payable>"+
			"<total_receivable></total_receivable>"+
			"<from_time></from_time>"+
			"</channel_prices>";

	fetch_requested_data('report65',prices_data,function(prices)
	{
		prices.forEach(function(price)
		{
			var rowsHTML="<tr>";
			rowsHTML+="<td data-th='Channel'>";
				rowsHTML+=price.channel;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+=price.item;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Price'>";
				rowsHTML+="Discount: Rs."+price.discount_customer;
				rowsHTML+="<br>SP: Rs."+price.sale_price;
				rowsHTML+="<br>Freight: Rs."+price.freight;
				rowsHTML+="<br>To channel: Rs."+vUtil.round((parseFloat(price.total_charges)+parseFloat(price.service_tax)),2);
				rowsHTML+="<br>Profit: Rs."+price.profit;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Time'>";
				rowsHTML+="From: "+get_my_datetime(price.from_time);
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
			$('#report65_body').append(rowsHTML);
		});
		hide_loader();				
	});
			
	var print_button=form.elements['print'];
	print_tabular_report('report65','Pricing Timestamps',print_button);
};
	
	</script>
</div>