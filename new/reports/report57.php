<div id='report57' class='tab-pane'>
	<form id='report57_header' autocomplete="off">
		<fieldset>
			<label>Customer<input type='text'></label>
			<label>Subscription<input type='text'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Customer</th>
				<th>Warranty Status</th>
				<th>End Date</th>
			</tr>
		</thead>
		<tbody id='report57_body'>
		</tbody>
	</table>
	
	<script>

function report57_header_ini()
{	
	var form=document.getElementById('report57_header');
	var customer_filter=form.elements[1];
	var subscription_filter=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report57_ini();
	});

	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(customer_data,customer_filter);
	
	var sub_data="<service_subscriptions>"+
				"<service></service>"+
				"</service_subscriptions>";	
	set_my_filter(sub_data,subscription_filter);
}

function report57_ini()
{
	var form=document.getElementById('report57_header');
	var customer=form.elements[1].value;
	var subscription=form.elements[2].value;
	
	show_loader();
	$('#report57_body').html('');
	
	var warranty_data="<service_subscriptions>" +
			"<id></id>"+
			"<customer>"+customer+"</customer>" +
			"<service>"+subscription+"</service>" +
			"<next_due_date></next_due_date>"+
			"</service_subscriptions>";
	
	fetch_requested_data('report57',warranty_data,function(warranties)
	{
		for(var i=0;i<warranties.length;i++)
		{
			var rowsHTML="<tr>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+=warranties[i].customer;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+=warranties[i].service;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='End Date'>";
				rowsHTML+=get_my_past_date(warranties[i].next_due_date);
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
					
			$('#report57_body').append(rowsHTML);
		}
		hide_loader();
	});
	
	var print_button=form.elements[4];
	print_tabular_report('report57','Subscription Report',print_button);
};
	
	</script>
</div>