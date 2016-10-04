<div id='report46' class='tab-pane'>
	<form id='report46_header' autocomplete="off">
		<fieldset>
			<label>Min balance amount </br><input type='number' value='0' required title='Suppliers with balance more than this amount will be shown'></label>
			<label>Supplier </br><input type='text' title='If this field is blank, all applicable suppliers will be shown'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Supplier </th>
				<th>Account Balance </th>
				<th>Bill Ids </th>
			</tr>
		</thead>
		<tbody id='report46_body'>
		</tbody>
		<tfoot id='report46_foot'>
		</tfoot>
	</table>
	
	<script>

function report46_header_ini()
{	
	var form=document.getElementById('report46_header');
	var balance=form.elements[1];
	var supplier_filter=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report46_ini();
	});

	var supplier_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	set_my_filter(supplier_data,supplier_filter);
}

function report46_ini()
{
	show_loader();
	var form=document.getElementById('report46_header');
	var balance=form.elements[1].value;
	var supplier=form.elements[2].value;
	
	$('#report46_body').html('');

	var account_data="<accounts>" +
		"<acc_name>"+supplier+"</acc_name>" +
		"<type exact='yes'>supplier</type>" +
		"</accounts>";
	
	fetch_requested_data('report46',account_data,function(accounts)
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
		fetch_requested_data('report46',payments_data,function(payments)
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
						bill_ids_string+="<u title='Amount Rs:"+payment.total_amount+"' onclick=\"element_display('"+payment.bill_id+"','form21',['form122','form136','form158','form192']);\">"+payment.bill_id+"</u>"+", ";
						if(payment.type=='received')
						{
							balance_amount-=parseFloat(payment.total_amount);
							balance_amount+=parseFloat(payment.paid_amount);
						}
						else if(payment.type=='paid')
						{
							balance_amount+=parseFloat(payment.total_amount);
							balance_amount-=parseFloat(payment.paid_amount);
						}
					}
				});
				
				if(balance_amount>=balance)
				{
					total_balance+=balance_amount;
					
					bill_ids_string=bill_ids_string.substr(0,(bill_ids_string.length-2));
					
					var rowsHTML="<tr>";
						rowsHTML+="<td data-th='Supplier'>";
							rowsHTML+=result.acc_name;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Account Balance'>";
							rowsHTML+=Math.round(balance_amount);
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Bill Ids'>";
							rowsHTML+=bill_ids_string;
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
					
					$('#report46_body').append(rowsHTML);
				}
			});
			
			var total_row="<tr><td data-th='Total'>Total</td><td colspan='2' data-th='Balance'>"+total_balance+"</td></tr>";
			$('#report46_foot').html(total_row);
			
			var print_button=form.elements[4];
			print_tabular_report('report46','Supplier Account Balance',print_button);
			hide_loader();
		});
	});
};
	
	</script>
</div>