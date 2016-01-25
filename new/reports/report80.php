<div id='report80' class='tab-pane'>
	<form id='report80_header' autocomplete="off">
		<fieldset>
			<label>Start Date<br><input type='text' name='start' required></label>
			<label>End Date<br><input type='text' name='end' required></label>
			<label>	
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Bill Date</th>
				<th>Bill #</th>
				<th>Order #</th>
				<th>Bill Total</th>
			</tr>
		</thead>
		<tbody id='report80_body'>
		</tbody>
		<tbody id='report80_foot'>
		</tbody>
	</table>
	
	<script>
function report80_header_ini()
{	
	var form=document.getElementById('report80_header');
	var start_filter=form.elements[1];
	var end_filter=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report80_ini();
	});
	
	$(start_filter).datepicker();
	$(end_filter).datepicker();	
}

function report80_ini()
{
	var form=document.getElementById('report80_header');
	var start_filter=form.elements[1].value;
	var end_filter=form.elements[2].value;
	
	show_loader();
	$('#report80_body').html('');	
		
	var columns="<bills>" +
		"<total></total>" +
		"<bill_num></bill_num>"+
		"<order_num></order_num>"+		
		"<bill_date lowerbound='yes'>"+(get_raw_time(start_filter)-1000)+"</bill_date>" +
		"<bill_date upperbound='yes'>"+(get_raw_time(end_filter)+86400000)+"</bill_date>" +
		"</bills>";

	fetch_requested_data('report80',columns,function(items)
	{
		var rowsHTML="";
		var bill_total=0;
		items.forEach(function(item)
		{
			rowsHTML+="<tr>";
			rowsHTML+="<td data-th='Bill Date'>";
				rowsHTML+=get_my_past_date(item.bill_date);
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Bill #'>";
				rowsHTML+=item.bill_num;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Order #'>";
				rowsHTML+=item.order_num;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Bill Total'>";
				rowsHTML+="Rs. "+item.total;
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
			
			bill_total+=parseFloat(item.total);
		});
		
		var footHTML="<tr><td colspan='3'><b>Total Sales<b></td><td><b>Rs. "+bill_total+"</b></td></tr>";

		$('#report80_body').html(rowsHTML);
		$('#report80_foot').html(footHTML);
		/////////////

		hide_loader();
	});
	
	var print_button=form.elements[4];
	print_tabular_report('report80','Total Sales',print_button);
};
	
	</script>
</div>