<div id='report87' class='tab-pane'>
	<form id='report87_header' autocomplete="off">
		<fieldset>
			<label>Person<br><input type='text' name='person'></label>
			<label>Start Date<br><input type='text' name='start' required></label>
			<label>End Date<br><input type='text' name='end' required></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
				<input type='button' title='Download CSV' class='csv_icon' name='csv'>			
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Person</th>
				<th>Date</th>
				<th>Kms</th>
			</tr>
		</thead>
		<tbody id='report87_body'>
		</tbody>
		<tbody id='report87_foot'>
		</tbody>
	</table>
	
	<script>

function report87_header_ini()
{	
	var form=document.getElementById('report87_header');
	var person_filter=form.elements[1];
	var start_date=form.elements[2];
	var end_date=form.elements[3];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report87_ini();
	});

	var person_data="<staff>"+
				"<acc_name></acc_name>"+
				"</staff>";
	set_my_filter(person_data,person_filter);
				
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-(7*87400000)));
	end_date.value=get_my_date();
}

function report87_ini()
{
	show_loader();
	var form=document.getElementById('report87_header');
	var person=form.elements['person'].value;
	var start=get_raw_time(form.elements['start'].value);
	var end=get_raw_time(form.elements['end'].value)+86399999;
	
	$('#report87_body').html('');
	$('#report87_foot').html('');

	var columns=new Object();
	columns.count=0;
	columns.start_index=0;
	columns.data_store='delivery_run';		
	
	columns.indexes=[{index:'id'},
					{index:'person',value:person},
					{index:'date',lowerbound:start,upperbound:end},
					{index:'total_run'}];

	read_json_rows('report87',columns,function(deliveries)
	{	
		var total_kms=0;
		deliveries.forEach(function(result)
		{	
			total_kms+=parseFloat(result.total_run);
			var rowsHTML="<tr>";
				rowsHTML+="<td data-th='Person'>";
					rowsHTML+=result.person;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Date'>";
					rowsHTML+=get_my_past_date(result.date);
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Kms'>";
					rowsHTML+=result.total_run+" kms";
				rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#report87_body').append(rowsHTML);
		});
		
		var total_row="<tr><td data-th='Total' colspan='2'>Total</td><td data-th='Total Kms'>"+total_kms+"Kms</td></tr>";
		$('#report87_foot').html(total_row);
		
		var print_button=form.elements[5];
		print_tabular_report('report87','Delivery Run Report',print_button);
		
		var csv_button=form.elements['csv'];
		$(csv_button).off("click");
		$(csv_button).on("click", function(event)
		{
			var sorted_array=[];
			deliveries.forEach(function(new_result)
			{
				var sorted_element=new Object();
				sorted_element['Person']=new_result.person;
				sorted_element['Date']=get_my_past_date(new_result.date);
				sorted_element['Kms']=new_result.total_run+" kms";
				
				sorted_array.push(sorted_element);
			});
			csv_download_report(sorted_array,'Delivery Run Report');
		});
		
		hide_loader();
	});
};
	
	</script>
</div>