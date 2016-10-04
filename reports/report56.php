<div id='report56' class='tab-pane'>
	<form id='report56_header' autocomplete="off">
		<fieldset>
			<label>Customer<br><input type='text'></label>
			<label>Machine<br><input type='text'></label>
			<label>Problem<br><input type='text'></label>
			<label>Start date<br><input type='text' required></label>
			<label>End date<br><input type='text' required></label>
			<label>			
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Request Id</th>
				<th>Customer</th>
				<th>Machine</th>
				<th>Problem</th>
				<th>Solution</th>
			</tr>
		</thead>
		<tbody id='report56_body'>
		</tbody>
	</table>
	
	<script>

function report56_header_ini()
{	
	var form=document.getElementById('report56_header');
	var customer_filter=form.elements[1];
	var machine_filter=form.elements[2];
	var problem_filter=form.elements[3];
	var start_filter=form.elements[4];
	var end_filter=form.elements[5];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report56_ini();
	});

	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(customer_data,customer_filter);
	
	var machine_data="<service_requests>"+
						"<machine_type></machine_type>"+						
						"</service_requests>";	
	set_my_filter(machine_data,machine_filter);	
	
	$(start_filter).datepicker();
	$(start_filter).val(get_my_past_date((get_my_time()-86400000)));
	$(end_filter).datepicker();
	$(end_filter).val(get_my_past_date(get_my_time()));
}

function report56_ini()
{
	var form=document.getElementById('report56_header');
	var customer=form.elements[1].value;
	var machine=form.elements[2].value;
	var problem=form.elements[3].value;
	var start_date=form.elements[4].value;
	var end_date=form.elements[5].value;
	
	show_loader();
	$('#report56_body').html('');
	
	var request_data="<service_requests>" +
			"<id></id>"+
			"<customer>"+customer+"</customer>" +
			"<machine_type>"+machine+"</machine_type>" +
			"<problem_type></problem_type>" +
			"<notes>"+problem+"</notes>"+
			"<closing_notes></closing_notes>"+
			"<reported_time lowerbound='yes'>"+get_raw_time(start_date)+"</reported_time>" +
			"<reported_time upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</reported_time>" +
			"</service_requests>";
	
	fetch_requested_data('report56',request_data,function(requests)
	{
		for(var i=0;i<requests.length;i++)
		{
			var rowsHTML="<tr>";
			rowsHTML+="<td data-th='Request Id'>";
				rowsHTML+=requests[i].id;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+=requests[i].customer;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Machine'>";
				rowsHTML+=requests[i].machine_type;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Problem'>";
				rowsHTML+=requests[i].notes;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Solution'>";
				rowsHTML+=requests[i].closing_notes;
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
					
			$('#report56_body').append(rowsHTML);
		}
		hide_loader();
	});
	
	var print_button=form.elements[7];
	print_tabular_report('report56','Service requests Report',print_button);
};
	
	</script>
</div>