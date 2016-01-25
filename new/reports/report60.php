<div id='report60' class='tab-pane'>
	<form id='report60_header' autocomplete="off">
		<fieldset>
			<label>Start Date<br><input type='text' required></label>
			<label>End Date<br><input type='text' required></label>
			<label>	
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Add ledger entry' class='generic_icon' value='Add Ledger Entry' onclick='modal106_action();'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Account</th>
				<th>Particulars</th>
				<th>Debit</th>
				<th>Credit</th>
				<th>Balance</th>
			</tr>
		</thead>
		<tbody id='report60_body'>
		</tbody>
	</table>
	
	<script>

function report60_header_ini()
{	
	var form=document.getElementById('report60_header');
	var start_filter=form.elements[1];
	var end_filter=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report60_ini();
	});
		
	$(start_filter).datepicker();
	$(start_filter).val(get_my_past_date((get_my_time()-86400000)));
	$(end_filter).datepicker();
	$(end_filter).val(get_my_date());
}

function report60_ini()
{
	var form=document.getElementById('report60_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	
	show_loader();
	$('#report60_body').html('');
		
	var payments_data="<payments>" +
			"<id></id>"+
			"<type></type>" +
			"<total_amount></total_amount>" +
			"<paid_amount></paid_amount>"+
			"<mode></mode>"+			
			"<status array='yes'>--pending--closed--</status>"+
			"<bill_id></bill_id>"+			
			"<date></date>"+			
			"<date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</date>" +
			"<acc_name></acc_name>" +
			"</payments>";
	
	fetch_requested_data('report60',payments_data,function(payments)
	{	
		var receipts_data="<receipts_payment_mapping>"+
							"<id></id>"+
							"<receipt_id></receipt_id>"+
							"<payment_id></payment_id>"+
							"<type></type>"+
							"<amount></amount>"+
							"<date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</date>" +
							"<acc_name></acc_name>"+							
							"</receipts_payment_mapping>";
							
		fetch_requested_data('report60',receipts_data,function(receipts)
		{	
			for(var k in receipts)
			{
				var receipt_to_pay=new Object();
				receipt_to_pay.acc_name=receipts[k].acc_name;
				receipt_to_pay.type="received";
				if(receipts[k].type=='received')
				{
					receipt_to_pay.type="paid";
				}
				receipt_to_pay.mode='credit';
				receipt_to_pay.total_amount=receipts[k].amount;
				receipt_to_pay.paid_amount=0;
				receipt_to_pay.date=receipts[k].date;
				receipt_to_pay.bill_id=receipts[k].receipt_id;
				receipt_to_pay.id=receipts[k].payment_id;
				receipt_to_pay.status='from receipt';
				for(var j in payments)
				{
					if(payments[j].id==receipt_to_pay.id)
					{
						payments[j].paid_amount=parseFloat(payments[j].paid_amount)-parseFloat(receipt_to_pay.total_amount);
					}
				}				
				
				payments.push(receipt_to_pay);
			}
			
			payments.sort(function(a,b)
			{
				if(parseFloat(a.date)>parseFloat(b.date))
				{	return 1;}
				else 
				{	return -1;}
			});

			var balance=0;
			
			for(var p=0;p<payments.length;p++)
			{
				if(payments[p].date<get_raw_time(start_date))
				{
					if(payments[p].type=='received')
					{
						balance+=parseFloat(payments[p].total_amount);
					}
					else 
					{
						balance-=parseFloat(payments[p].total_amount);
					}
					
					if(parseFloat(payments[p].paid_amount)>0 && payments[p].paid_amount!='')
					{
						if(payments[p].type=='received')
						{
							balance-=parseFloat(payments[p].paid_amount);						
						}
						else 
						{
							balance+=parseFloat(payments[p].paid_amount);
						}
					}
					
					payments.splice(p,1);					
					p--;				
				}
			}									
			
			for(var i=0;i<payments.length;i++)
			{
				var debit="-";
				var credit="-";
				var particulars="";
				
				if(payments[i].type=='received')
				{
					balance+=parseFloat(payments[i].total_amount);
					credit="Rs. "+payments[i].total_amount;
					particulars="To "+payments[i].acc_name+" for bill id: "+payments[i].bill_id;
					if(payments[i].status=='from receipt')
					{
						particulars="To "+payments[i].acc_name+" through receipt id: "+payments[i].bill_id+" on "+get_my_past_date(payments[i].date);
					}
				}
				else 
				{
					balance-=parseFloat(payments[i].total_amount);
					debit="Rs. "+payments[i].total_amount;
					particulars="From "+payments[i].acc_name+" for bill id: "+payments[i].bill_id;
					if(payments[i].status=='from receipt')
					{
						particulars="From "+payments[i].acc_name+" through receipt id: "+payments[i].bill_id+" on "+get_my_past_date(payments[i].date);
					}
				}
								
				var rowsHTML="<tr>";
				rowsHTML+="<td data-th='Account'>";
					rowsHTML+=payments[i].acc_name;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Particulars'>";
					rowsHTML+=particulars;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Debit'>";
					rowsHTML+=debit;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Credit'>";
					rowsHTML+=credit;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Balance'>";
					rowsHTML+="Rs. "+my_round(balance,2);
				rowsHTML+="</td>";
				rowsHTML+="</tr>";
						
				$('#report60_body').append(rowsHTML);
				
				if(parseFloat(payments[i].paid_amount)>0 && payments[i].paid_amount!='')
				{
					debit="-";
					credit="-";
					particulars="";
					
					if(payments[i].type=='received')
					{
						balance-=parseFloat(payments[i].paid_amount);						
						debit="Rs. "+payments[i].paid_amount;
						particulars="From "+payments[i].acc_name+" by payment id "+payments[i].id+" on "+get_my_past_date(payments[i].date);
					}
					else 
					{
						balance+=parseFloat(payments[i].paid_amount);
						credit="Rs. "+payments[i].paid_amount;
						particulars="To "+payments[i].acc_name+" by payment id "+payments[i].id+" on "+get_my_past_date(payments[i].date);
					}
									
					var rowsHTML="<tr>";
					rowsHTML+="<td data-th='Account'>";
						rowsHTML+=payments[i].acc_name;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Particulars'>";
						rowsHTML+=particulars;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Debit'>";
						rowsHTML+=debit;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Credit'>";
						rowsHTML+=credit;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Balance'>";
						rowsHTML+="Rs. "+my_round(balance,2);
					rowsHTML+="</td>";
					rowsHTML+="</tr>";
							
					$('#report60_body').append(rowsHTML);
				}
			}
			hide_loader();
		});
	});
	
	var print_button=form.elements[5];
	print_tabular_report('report60','Trial Balance',print_button);
};
	
	</script>
</div>