<div id='report5' class='tab-pane'>
	<form id='report5_header' autocomplete="off">
		<fieldset>
			<label>Min balance amount</br><input type='number' value='0' required title='Customers with balance more than this amount will be shown'></label>
			<label>Customer</br><input type='text' title='If this field is blank, all applicable customers will be shown'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Customer </th>
				<th>Account Balance </th>
				<th>Bill Ids </th>
			</tr>
		</thead>
		<tbody id='report5_body'>
		</tbody>
		<tfoot id='report5_foot'>
		</tfoot>
	</table>
	
	<script>

function report5_header_ini()
{	
	var form=document.getElementById('report5_header');
	var balance=form.elements[1];
	var customer_filter=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report5_ini();
	});

	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(customer_data,customer_filter);
}

function report5_ini()
{
	show_loader();
	var form=document.getElementById('report5_header');
	var balance=form.elements[1].value;
	var customer=form.elements[2].value;
	
	$('#report5_body').html('');

	var account_data="<accounts>" +
		"<acc_name>"+customer+"</acc_name>" +
		"<type exact='yes'>customer</type>" +
		"</accounts>";
	
	fetch_requested_data('report5',account_data,function(accounts)
	{
		var payments_data="<payments>" +
				"<id></id>" +
				"<acc_name></acc_name>" +
				"<type></type>" +
				"<total_amount></total_amount>" +
				"<paid_amount></paid_amount>" +
				"<bill_id></bill_id>" +
				"<status exact='yes'>pending</status>" +
				"</payments>";
		fetch_requested_data('report5',payments_data,function(payments)
		{
			var total_balance=0;
			accounts.forEach(function(result)
			{	
				var balance_amount=0;
				var bill_ids_string="";
				
				payments.forEach(function(payment)
				{
					if(payment.acc_name==result.acc_name)
					{
						bill_ids_string+="<u title='Amount Rs:"+payment.total_amount+"'>"+payment.bill_id+"</u>"+", ";
						if(payment.type=='received')
						{
							balance_amount+=parseFloat(payment.total_amount);
							balance_amount-=parseFloat(payment.paid_amount);
						}
						else if(payment.type=='paid')
						{
							balance_amount-=parseFloat(payment.total_amount);
							balance_amount+=parseFloat(payment.paid_amount);
						}
					}
				});
				
				if(balance_amount>=balance)
				{
					total_balance+=balance_amount;
					bill_ids_string=bill_ids_string.substr(0,(bill_ids_string.length-2));
					var rowsHTML="<tr>";
						rowsHTML+="<td data-th='Customer'>";
							rowsHTML+=result.acc_name;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Account Balance'>";
							rowsHTML+="Rs. "+balance_amount;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Bill Ids'>";
							rowsHTML+=bill_ids_string;
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
					
					$('#report5_body').append(rowsHTML);
				}
			});
			
			var total_row="<tr><td data-th='Total'>Total</td><td colspan='2' data-th='Total Balance'>Rs. "+total_balance+"</td></tr>";
			$('#report5_foot').html(total_row);
			
			var print_button=form.elements[4];
			print_tabular_report('report5','Customer Account Balance',print_button);
			hide_loader();
		});
	});
};
	
	</script>
</div>