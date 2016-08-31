<div id='report73' class='tab-pane'>
	<form id='report73_header' autocomplete="off">
		<fieldset>
			<label>Customer<br><input type='text' name='customer'></label>
			<label>Item<br><input type='text' name='item_name'></label>
			<label>Status<br><input type='text' name='status'></label>
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
				<th>Item</th>
				<th>Quantity</th>
			</tr>
		</thead>
		<tbody id='report73_body'>
		</tbody>
		<tfoot id='report73_foot'>
		</tfoot>
	</table>
	
	<script>
function report73_header_ini()
{	
	var form=document.getElementById('report73_header');
	var customer_filter=form.elements['customer'];
	var item_filter=form.elements['item_name'];
	var status_filter=form.elements['status'];	
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report73_ini();
	});

	set_static_filter('sale_orders','status',status_filter);
	
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(customer_data,customer_filter);
	
	var item_data="<bill_items>" +
			"<item_name></item_name>" +
			"</bill_items>";
	set_my_filter(item_data,item_filter);
}

function report73_ini()
{
	var form=document.getElementById('report73_header');
	var customer=form.elements['customer'].value;
	var item=form.elements['item_name'].value;
	var status=form.elements['status'].value;

	show_loader();
	$('#report73_body').html('');
	
	var total_quantity=0;
	var report_count=1;
	
	var sale_order_data="<sale_orders>"+
					"<bill_id></bill_id>"+
					"<customer_name>"+customer+"</customer_name>"+
					"<status>"+status+"</status>"+
					"</sale_orders>";
	fetch_requested_data('report73',sale_order_data,function(sale_orders)
	{
		report_count+=sale_orders.length;
		report_count-=1;
		sale_orders.forEach(function(sale_order)
		{
			var bills_data="<bill_items>" +
					"<bill_id exact='yes'>"+sale_order.bill_id+"</bill_id>" +
					"<item_name></item_name>" +
					"<quantity></quantity>" +
					"</bill_items>";	
			fetch_requested_data('report73',bills_data,function(bill_items)
			{
				bill_items.forEach(function(bill_item)
				{
					var rowsHTML="<tr>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+=sale_order.customer_name;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+=bill_item.item_name;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+=bill_item.quantity;
					rowsHTML+="</td>";
					rowsHTML+="</tr>";
							
					$('#report73_body').append(rowsHTML);
					if(!isNaN(bill_item.quantity))
					{
						total_quantity+=parseFloat(bill_item.quantity);
					}
				});
				report_count-=1;
			});
		});
	});	
	
	var report_complete=setInterval(function()
	{
	   if(report_count===0)
	   {
		   var total_row="<tr><td colspan='2' data-th='Total'>Total Quantity</td><td data-th='Quantity'>"+total_quantity+"</td></tr>";
		   $('#report73_foot').html(total_row);
	
		   clearInterval(report_complete);
		   hide_loader();
	   }
	},1000);

	var print_button=form.elements[5];
	print_tabular_report('report73','Stock of laundry',print_button);
};
	
	</script>
</div>