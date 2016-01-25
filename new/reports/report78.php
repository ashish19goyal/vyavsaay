<div id='report78' class='tab-pane'>
	<form id='report78_header' autocomplete="off">
		<fieldset>
			<label>Customer<br><input type='text' name='customer' required></label>
			<label>Date<br><input type='text' name='date'></label>
			<label>	
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Date</th>
				<th>Response</th>
				<th>Details</th>
				<th>Next Follow up</th>
				<th>Lead</th>
			</tr>
		</thead>
		<tbody id='report78_body'>
		</tbody>
	</table>
	
	<script>

function report78_header_ini()
{	
	var form=document.getElementById('report78_header');
	var customer_filter=form.elements['customer'];
	var date_filter=form.elements['date'];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report78_ini();
	});
			
	var customer_data="<customers>"+
				"<acc_name></acc_name>"+
				"</customers>";
	set_my_filter(customer_data,customer_filter);
	$(date_filter).datepicker();
}

function report78_ini()
{
	var form=document.getElementById('report78_header');
	var customer_filter=form.elements['customer'].value;
	var date_filter=form.elements['date'].value;
	
	show_loader();
	
	$('#report78_body').html('');
		
	var follow_up_data="<followups>"+
			"<customer exact='yes'>"+customer_filter+"</customer>"+
			"<date>"+date_filter+"</date>"+
			"<response></response>"+
			"<detail></detail>"+
			"<next_date></next_date>"+
			"<source_id></source_id>"+
			"</followups>";	
						
	fetch_requested_data('report78',follow_up_data,function(followups)
	{
		var rowsHTML="";
		followups.forEach(function (followup) 
		{
			rowsHTML+="<tr>";
			rowsHTML+="<td data-th='Date'>";
				rowsHTML+=get_my_past_date(followup.date);
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Reponse'>";
				rowsHTML+=followup.response;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+=followup.detail;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Next follow-up'>";
				rowsHTML+=get_my_past_date(followup.next_date);
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Lead'>";
				rowsHTML+="<input type='button' class='generic_icon' value='Go to Lead' onclick=\"element_display('"+followup.source_id+"','form213');\">";
			rowsHTML+="</td>";
			rowsHTML+="</tr>";			
		});
		$('#report78_body').html(rowsHTML);
		hide_loader();
	});	
	
	var print_button=form.elements[4];
	print_tabular_report('report78','Sale Followups',print_button);
};
	
	</script>
</div>