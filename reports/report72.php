<div id='report72' class='tab-pane'>
	<form id='report72_header' autocomplete="off">
		<fieldset>
			<label>Customer<br><input type='text'></label>
			<label>Address<br><input type='text'></label>
			<label>Status<br><input type='text'></label>
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
				<th>Details</th>
				<th>Amount</th>
				<th>Address</th>
				<th>Status</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody id='report72_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='report72_prev' class='prev_icon' data-index='-25' onclick="$('#report72_index').attr('data-index',$(this).attr('data-index')); report72_ini();">
		<div style='display:hidden;' id='report72_index' data-index='0'></div>
		<img src='./images/next.png' id='report72_next' class='next_icon' data-index='25' onclick="$('#report72_index').attr('data-index',$(this).attr('data-index')); report72_ini();">
	</div>
	
	<script>
function report72_header_ini()
{	
	var form=document.getElementById('report72_header');
	var customer_filter=form.elements[1];
	var addess_filter=form.elements[2];
	var status_filter=form.elements[3];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report72_ini();
	});
	
	var customer_data="<customers>"+
				"<acc_name></acc_name>"+
				"</customers>";
	set_my_filter(customer_data,customer_filter);
	
	set_static_filter('sale_orders','status',status_filter);	
}

function report72_ini()
{
	var form=document.getElementById('report72_header');
	var customer=form.elements[1].value;
	var address=form.elements[2].value;
	var status=form.elements[3].value;
	
	show_loader();
	$('#report72_body').html('');	
	
		////indexing///
	var index_element=document.getElementById('report72_index');
	var prev_element=document.getElementById('report72_prev');
	var next_element=document.getElementById('report72_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var orders_data="<sale_orders count='25' start_index='"+start_index+"'>" +
		"<id></id>"+
		"<customer_name>"+customer+"</customer_name>" +
		"<address>"+address+"</address>"+
		"<notes></notes>"+
		"<order_num></order_num>"+
		"<order_date></order_date>"+
		"<type></type>"+
		"<pickup_assignee></pickup_assignee>"+
		"<delivery_assignee></delivery_assignee>"+
		"<amount></amount>" +
		"<tax></tax>"+
		"<total></total>"+
		"<status>"+status+"</status>"+
		"</sale_orders>";

	fetch_requested_data('report72',orders_data,function(items)
	{	
		var button_value="Pick";
		items.forEach(function(item)
		{
			var assignee="";
			if(item.status=='pending')
			{
				button_value="Pick";
			}
			else if(item.status=='picking')
			{
				assignee="Pickup by: "+item.pickup_assignee;
				button_value="Picked";
			}
			else if(item.status=='picked')
			{
				assignee="Pickup by: "+item.pickup_assignee;
				button_value="Process";
			}
			else if(item.status=='processing')
			{
				assignee="Pickup by: "+item.pickup_assignee;
				button_value="Processed";
			}
			else if(item.status=='ready for delivery')
			{
				assignee="Pickup by: "+item.pickup_assignee;
				button_value="Deliver";
			}
			else if(item.status=='out for delivery')
			{
				assignee="Pickup by: "+item.pickup_assignee+"<br>Delivery by: "+item.delivery_assignee;
				button_value="Delivered";
			}
			else if(item.status=='delivered')
			{
				assignee="Pickup by: "+item.pickup_assignee+"<br>Delivery by: "+item.delivery_assignee;
			}
			
			var rowsHTML="<tr>";
			rowsHTML+="<form id='report72_"+item.id+"'></form>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+=item.customer_name;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="Order #"+item.order_num+"<br>"+assignee;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount' title='Amount: Rs. "+item.amount+"\nTax: Rs. "+item.tax+"'>";
				rowsHTML+="Rs. "+item.total;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Address'>";
				rowsHTML+=item.address;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='report72_"+item.id+"' readonly='readonly' value='"+item.status+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='report72_"+item.id+"' value='"+item.id+"'>";
				rowsHTML+="<input type='hidden' form='report72_"+item.id+"' value='"+item.customer_name+"'>";
				rowsHTML+="<input type='hidden' form='report72_"+item.id+"' value='"+item.order_num+"'>";
				rowsHTML+="<input type='hidden' form='report72_"+item.id+"' value='"+item.total+"'>";
			if(item.status!='delivered')
			{
				rowsHTML+="<input type='button' form='report72_"+item.id+"' class='generic_icon' value='"+button_value+"'>";
			}
			rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#report72_body').append(rowsHTML);

			if(item.status!='delivered')
			{			
				var report72_form=document.getElementById('report72_'+item.id);				
				var update_button=report72_form.elements[5];
				$(update_button).on('click',function(event)
				{
					event.preventDefault();
					report72_update(report72_form);
				});
			}
		});
		
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
	print_tabular_report('report72','Orders',print_button);
};
	
	</script>
</div>