<div id='report67' class='tab-pane'>
	<form id='report67_header' autocomplete="off">
		<fieldset>
			<label>Channel<br><input type='text'></label>
			<label>Status<br><input type='text'></label>
			<label>From Date<br><input type='text' required></label>
			<label>To Date<br><input type='text' required></label>
			<label>	
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Channel</th>
				<th>Customer</th>
				<th>Total</th>
				<th>Date</th>
				<th>Status</th>
				<th></th>
			</tr>
		</thead>
		<tbody id='report67_body'>
		</tbody>
	</table>
	
	<script>

function report67_header_ini()
{	
	var form=document.getElementById('report67_header');
	var channel_filter=form.elements[1];
	var status_filter=form.elements[2];
	var from_filter=form.elements[3];
	var to_filter=form.elements[4];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report67_ini();
	});
	
/*	var customer_data="<customers>"+
				"<acc_name></acc_name>"+
				"</customers>";
	set_my_filter(customer_data,customer_filter);
*/

	set_static_filter('bills','collection_status',status_filter);	
	var channel_data="<sale_channels>"+
				"<name></name>"+
				"</sale_channels>";
	set_my_filter(channel_data,channel_filter);

	$(from_filter).datepicker();
	$(to_filter).datepicker();
	from_filter.value=get_my_past_date((get_my_time()-86400000));
	to_filter.value=vTime.date();
}

function report67_ini()
{
	var form=document.getElementById('report67_header');
	var channel_filter=form.elements[1].value;
	var status_filter=form.elements[2].value;
	var from_filter=get_raw_time(form.elements[3].value);
	var to_filter=get_raw_time(form.elements[4].value);
	
	show_loader();
	$('#report67_body').html('');
		
	var prices_data="<bills>" +
			"<id></id>"+
			"<channel>"+channel_filter+"</channel>"+
			"<customer_name></customer_name>" +
			"<bill_date lowerbound='yes'>"+from_filter+"</bill_date>" +
			"<bill_date upperbound='yes'>"+(to_filter+86400000)+"</bill_date>" +
			"<channel_charges></channel_charges>"+
			"<channel_tax></channel_tax>"+
			"<channel_payable></channel_payable>"+
			"<collection_status>"+status_filter+"</collection_status>"+
			"<total></total>"+
			"</bills>";

	fetch_requested_data('report67',prices_data,function(prices)
	{
		prices.forEach(function(price)
		{
			var to_string=get_my_datetime(price.to_time);
			if(price.to_time=='0' || price.to_time=="")
			{
				to_string=get_my_datetime();				
			}
			var rowsHTML="<tr>";
			rowsHTML+="<td data-th='Channel'>";
				rowsHTML+=price.channel;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+=price.customer_name;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Total'>";
				rowsHTML+="Bill Total: Rs."+price.total;
				rowsHTML+="<br>Channel Charges: Rs."+price.channel_charges;
				rowsHTML+="<br>S.Tax: Rs."+price.channel_tax;
				rowsHTML+="<br>Payable to Channel: Rs."+price.channel_payable;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Date'>";
				rowsHTML+=get_my_past_date(price.bill_date);
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status' id='report67_status_"+price.id+"'>";
				rowsHTML+=price.collection_status;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				if(price.collection_status=='pending')
					rowsHTML+="<input type='button' id='report67_collected_"+price.id+"' class='generic_icon' value='Collected'>";	
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
			
			$('#report67_body').append(rowsHTML);
			
			var report67_button=document.getElementById('report67_collected_'+price.id);
				
			$(report67_button).on('click',function(event)
			{
				event.preventDefault();
				report67_update(price.id);
				$(report67_button).hide();
				document.getElementById('report67_status_'+price.id).innerHTML='received';
			});
		});
		hide_loader();				
	});

	var print_button=form.elements[4];
	print_tabular_report('report67','Channel Collections',print_button);
};
	
	</script>
</div>