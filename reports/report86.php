<div id='report86' class='tab-pane'>
	<form id='report86_header' autocomplete="off">
		<fieldset>
			<label>Item<br><input type='text' name='product'></label>
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
				<th>Item</th>
				<th>Date</th>
				<th>Quantity</th>
				<th>Customer</th>
			</tr>
		</thead>
		<tbody id='report86_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='report86_prev' class='prev_icon' data-index='-25' onclick="$('#report86_index').attr('data-index',$(this).attr('data-index')); report86_ini();">
		<div style='display:hidden;' id='report86_index' data-index='0'></div>
		<img src='./images/next.png' id='report86_next' class='next_icon' data-index='25' onclick="$('#report86_index').attr('data-index',$(this).attr('data-index')); report86_ini();">
	</div>
	
	<script>

function report86_header_ini()
{	
	var form=document.getElementById('report86_header');
	var item_filter=form.elements[1];
	var start_date=form.elements[2];
	var end_date=form.elements[3];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report86_ini();
	});

	var item_data="<product_master>"+
				"<name></name>"+
				"</product_master>";
	set_my_filter(item_data,item_filter);
				
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-(7*86400000)));
	end_date.value=vTime.date();
}

function report86_ini()
{
	var form=document.getElementById('report86_header');
	var item_filter=form.elements[1].value;
	var start_date=form.elements[2].value;
	var end_date=form.elements[3].value;
	
	show_loader();
	$('#report86_body').html('');	
	
	////indexing///
	var index_element=document.getElementById('report86_index');
	var prev_element=document.getElementById('report86_prev');
	var next_element=document.getElementById('report86_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var sales_data="<bill_items count='25' start_index='"+start_index+"'>" +
		"<id></id>"+
		"<item_name>"+item_filter+"</item_name>" +
		"<customer></customer>"+
		"<quantity></quantity>"+
		"<issue_type exact='yes'>out</issue_type>"+
		"<hiring_type exact='yes'>sale</hiring_type>"+		
		"<issue_date lowerbound='yes'>"+get_raw_time(start_date)+"</issue_date>" +
		"<issue_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</issue_date>" +
		"</bill_items>";
	//console.log(orders_data);
	
	fetch_requested_data('report86',sales_data,function(items)
	{
		var rowsHTML="";
		items.forEach(function(item)
		{
			rowsHTML+="<tr>";
			rowsHTML+="<form id='report86_"+item.id+"'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+=item.item_name;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Date'>";
				rowsHTML+=get_my_past_date(item.issue_date);
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+=-parseFloat(item.quantity);
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+=item.customer;
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
		});
		$('#report86_body').append(rowsHTML);
		
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
	
	var print_button=form.elements[5];
	print_tabular_report('report86','Sales',print_button);
};
	
	</script>
</div>