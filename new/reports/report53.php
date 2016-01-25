<div id='report53' class='tab-pane'>
	<form id='report53_header' autocomplete="off">
		<fieldset>
			<label>Product<br><input type='text'></label>
			<label>Start date<br><input type='text' required></label>
			<label>End date<br><input type='text' required></label>
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
				<th>Transaction Type</th>
				<th>Amount</th>
				<th>Tax</th>
			</tr>
		</thead>
		<tbody id='report53_body'>
		</tbody>
		<tfoot id='report53_foot'>
		</tfoot>
	</table>
	
	<script>

function report53_header_ini()
{	
	var form=document.getElementById('report53_header');
	var name_filter=form.elements[1];
	var start_filter=form.elements[2];
	var end_filter=form.elements[3];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report53_ini();
	});

	var name_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	set_my_filter(name_data,name_filter);
	
	$(start_filter).datepicker();
	$(start_filter).val(get_my_past_date((get_my_time()-86400000)));
	$(end_filter).datepicker();
	$(end_filter).val(get_my_past_date(get_my_time()));
}

function report53_ini()
{
	var form=document.getElementById('report53_header');
	var name=form.elements[1].value;
	var start_date=form.elements[2].value;
	var end_date=form.elements[3].value;
	
	show_loader();
	$('#report53_body').html('');
	var report_count=4;
	
	var bills_data="<bill_items>" +
			"<item_name>"+name+"</item_name>" +
			"<amount></amount>" +
			"<tax></tax>" +
			"<last_updated lowerbound='yes'>"+get_raw_time(start_date)+"</last_updated>" +
			"<last_updated upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</last_updated>" +
			"</bill_items>";
	
	var total_amount=0;
	var total_tax=0;
	
	fetch_requested_data('report53',bills_data,function(bills)
	{
		for(var i=0;i<bills.length;i++)
		{
			for(var j=i+1;j<bills.length;j++)
			{
				if(bills[i].item_name==bills[j].item_name)
				{
					bills[i].amount=parseFloat(bills[i].amount)+parseFloat(bills[j].amount);
					bills[i].tax=parseFloat(bills[i].tax)+parseFloat(bills[j].tax);
					bills.splice(j,1);
					j-=1;
				}
			}
			
			total_amount+=parseFloat(bills[i].amount);
			total_tax+=parseFloat(bills[i].tax);

			var rowsHTML="<tr>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+=bills[i].item_name;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Transaction Type'>";
				rowsHTML+='Sale';
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+=bills[i].amount;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Tax'>";
				rowsHTML+=bills[i].tax;
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
					
			$('#report53_body').append(rowsHTML);
		}
		report_count-=1;
	});

	var supplier_bills_data="<supplier_bill_items>" +
			"<product_name>"+name+"</product_name>" +
			"<amount></amount>" +
			"<tax></tax>" +
			"<last_updated lowerbound='yes'>"+get_raw_time(start_date)+"</last_updated>" +
			"<last_updated upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</last_updated>" +
			"</supplier_bill_items>";

	fetch_requested_data('report53',supplier_bills_data,function(supplier_bills)
	{
		//console.log(supplier_bills);
		for(var i=0;i<supplier_bills.length;i++)
		{
			for(var j=i+1;j<supplier_bills.length;j++)
			{
				if(supplier_bills[i].product_name==supplier_bills[j].product_name)
				{
					supplier_bills[i].amount=parseFloat(supplier_bills[i].amount)+parseFloat(supplier_bills[j].amount);
					supplier_bills[i].tax=parseFloat(supplier_bills[i].tax)+parseFloat(supplier_bills[j].tax);
					supplier_bills.splice(j,1);
					j-=1;
				}
			}
			
			total_amount-=parseFloat(supplier_bills[i].amount);
			total_tax-=parseFloat(supplier_bills[i].tax);

			var rowsHTML="<tr>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+=supplier_bills[i].product_name;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Transaction Type'>";
				rowsHTML+='Purchase';
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="-"+supplier_bills[i].amount;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Tax'>";
				rowsHTML+="-"+supplier_bills[i].tax;
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
					
			$('#report53_body').append(rowsHTML);
		}
		report_count-=1;
	});

	var sale_return_data="<customer_return_items>" +
			"<item_name>"+name+"</item_name>" +
			"<refund_amount></refund_amount>" +
			"<tax></tax>" +
			"<last_updated lowerbound='yes'>"+get_raw_time(start_date)+"</last_updated>" +
			"<last_updated upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</last_updated>" +
			"</customer_return_items>";

	fetch_requested_data('report53',sale_return_data,function(sreturns)
	{
		for(var i=0;i<sreturns.length;i++)
		{
			if(sreturns[i].refund_amount=="")
				sreturns[i].refund_amount=0;

			for(var j=i+1;j<sreturns.length;j++)
			{
				if(sreturns[i].item_name==sreturns[j].item_name)
				{
					if(sreturns[j].refund_amount=="")
						sreturns[j].refund_amount=0;
					sreturns[i].refund_amount=parseFloat(sreturns[i].refund_amount)+parseFloat(sreturns[j].refund_amount);
					sreturns[i].tax=parseFloat(sreturns[i].tax)+parseFloat(sreturns[j].tax);
					sreturns.splice(j,1);
					j-=1;
				}
			}
			
			total_amount-=parseFloat(sreturns[i].refund_amount);
			total_tax-=parseFloat(sreturns[i].tax);

			var rowsHTML="<tr>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+=sreturns[i].item_name;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Transaction Type'>";
				rowsHTML+='Sale return';
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="-"+sreturns[i].refund_amount;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Tax'>";
				rowsHTML+="-"+sreturns[i].tax;
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
					
			$('#report53_body').append(rowsHTML);
		}
		report_count-=1;
	});

	var purchase_return_data="<supplier_return_items>" +
			"<item_name>"+name+"</item_name>" +
			"<refund_amount></refund_amount>" +
			"<tax></tax>" +
			"<last_updated lowerbound='yes'>"+get_raw_time(start_date)+"</last_updated>" +
			"<last_updated upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</last_updated>" +
			"</supplier_return_items>";

	fetch_requested_data('report53',purchase_return_data,function(preturns)
	{
		for(var i=0;i<preturns.length;i++)
		{
			for(var j=i+1;j<preturns.length;j++)
			{
				if(preturns[i].item_name==preturns[j].item_name)
				{
					preturns[i].refund_amount=parseFloat(preturns[i].refund_amount)+parseFloat(preturns[j].refund_amount);
					preturns[i].tax=parseFloat(preturns[i].tax)+parseFloat(preturns[j].tax);
					preturns.splice(j,1);
					j-=1;
				}
			}
			
			total_amount+=parseFloat(preturns[i].refund_amount);
			total_tax+=parseFloat(preturns[i].tax);
			
			var rowsHTML="<tr>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+=preturns[i].item_name;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Transaction Type'>";
				rowsHTML+='Purchase return';
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+=preturns[i].refund_amount;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Tax'>";
				rowsHTML+=preturns[i].tax;
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
					
			$('#report53_body').append(rowsHTML);
		}
		report_count-=1;
	});

    var report_complete=setInterval(function()
	{
	   if(report_count===0)
	   {
		   var total_row="<tr><td colspan='2' data-th='Total'>Total</td><td data-th='Amount'>"+total_amount+"</td><td data-th='Tax'>"+total_tax+"</td></tr>";
		   $('#report53_foot').html(total_row);
	
		   clearInterval(report_complete);
		   hide_loader();
	   }
	},1000);
	
	var print_button=form.elements[5];
	print_tabular_report('report53','Sales Tax Report',print_button);
};
	
	</script>
</div>