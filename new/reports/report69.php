<div id='report69' class='tab-pane'>
	<form id='report69_header' autocomplete="off">
		<fieldset>
			<label>Project<br><input type='text' name='project'></label>
			<label>Staff<br><input type='text' name='staff'></label>
			<label>Keywords<br><input type='text' name='key'></label>
			<label>From Date<br><input type='text' name='from' required></label>
			<label>To Date<br><input type='text' name='to' required></label>
			<label>
				<input type='hidden' name='project_id'>
				<input type='submit' value='Refresh' name='refresh' class='generic_icon'>
				<input type='button' title='Print' name='print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Staff</th>
				<th>Detail</th>
				<th>Amount</th>
				<th>Date</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody id='report69_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='report69_prev' class='prev_icon' data-index='-25' onclick="$('#report69_index').attr('data-index',$(this).attr('data-index')); report69_ini();">
		<div style='display:hidden;' id='report69_index' data-index='0'></div>
		<img src='./images/next.png' id='report69_next' class='next_icon' data-index='25' onclick="$('#report69_index').attr('data-index',$(this).attr('data-index')); report69_ini();">
	</div>
	
	<script>

function report69_header_ini()
{	
	var form=document.getElementById('report69_header');
	var project_filter=form.elements['project'];
	var staff_filter=form.elements['staff'];
	var from_filter=form.elements['from'];
	var to_filter=form.elements['to'];
	var id_filter=form.elements['project_id'];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report69_ini();
	});
	
	var project_data="<projects>"+
				"<name></name>"+
				"</projects>";
	set_my_value_list(project_data,project_filter);

	my_datalist_change(project_filter,function () 
	{
		var id_data="<projects>"+
					"<id></id>"+
					"<name exact='yes'>"+project_filter.value+"</name>"+					
					"</projects>";
		set_my_value(id_data,id_filter);
	});

	var staff_data="<staff>"+
				"<acc_name></acc_name>"+
				"</staff>";
	set_my_filter(staff_data,staff_filter);

	$(from_filter).datepicker();
	$(to_filter).datepicker();
}

function report69_ini()
{
	var form=document.getElementById('report69_header');
	var id_filter=form.elements['project_id'].value;
	var staff_filter=form.elements['staff'].value;
	var from_filter=form.elements['from'].value;
	var to_filter=form.elements['to'].value;
	var key_filter=form.elements['key'].value;

	show_loader();
	$('#report69_body').html('');	
	
	////indexing///
	var index_element=document.getElementById('report69_index');
	var prev_element=document.getElementById('report69_prev');
	var next_element=document.getElementById('report69_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var expense_data="<expenses count='25' start_index='"+start_index+"'>" +
		"<id></id>"+
		"<person>"+staff_filter+"</person>" +
		"<amount></amount>"+
		"<status></status>"+
		"<detail>"+key_filter+"</detail>"+
		"<source exact='yes'>project</source>"+
		"<source_id>"+id_filter+"</source_id>"+
		"<expense_date lowerbound='yes'>"+get_raw_time(from_filter)+"</expense_date>" +
		"<expense_date upperbound='yes'>"+(get_raw_time(to_filter)+86400000)+"</expense_date>" +			
		"</expenses>";
	//console.log(expense_data);
	fetch_requested_data('report69',expense_data,function(items)
	{
		//console.log(items);
		var rowsHTML="";
		items.forEach(function(item)
		{
			rowsHTML+="<tr>";
			rowsHTML+="<form id='report69_"+item.id+"'></form>";
			rowsHTML+="<td data-th='Staff'>";
				rowsHTML+=item.person;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Detail'>";
				rowsHTML+=item.detail;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+=item.amount;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Date'>";
				rowsHTML+=get_my_past_date(item.expense_date);
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+=item.status;
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
					
		});
		$('#report69_body').html(rowsHTML);
		
		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(items.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		hide_loader();
	});
	
	var print_button=form.elements['print'];
	print_tabular_report('report69','Project Expenses',print_button);
};
	
	</script>
</div>