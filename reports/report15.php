<div id='report15' class='tab-pane'>
	<form id='report15_header' autocomplete="off">
		<fieldset>
			<label>Start date</br><input type='text' required></label>
			<label>End date</br><input type='text' required></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	</br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report15_legend" style='display: block;'></div></div>
		<canvas id="report15_canvas" class='report_sizing'></canvas>
	</div>
	
	<script>
function report15_header_ini()
{	
	var form=document.getElementById('report15_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report15_ini();
	});
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-86400000));
	end_date.value=vTime.date();
}

function report15_ini()
{
	show_loader();
	
	var form=document.getElementById('report15_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	
	var canvas_parent=$("#report15_canvas").parent();
	$("#report15_canvas").remove();
	$(canvas_parent).append("<canvas id='report15_canvas' class='report_sizing'></canvas>");
	var ctx = document.getElementById("report15_canvas").getContext("2d");
	
	var payments_data="<payments>" +
			"<total_amount></total_amount>" +
			"<paid_amount></paid_amount>" +
			"<status array='yes'>--pending--closed--</status>" +
			"<date lowerbound='yes'>"+get_raw_time(start_date)+"</date>" +
			"<date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</date>" +
			"<type></type>" +
			"</payments>";
	/////optimize this query
	var tax_data="<transactions>" +
			"<tax></tax>" +
			"<trans_date lowerbound='yes'>"+get_raw_time(start_date)+"</trans_date>" +
			"<trans_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</trans_date>" +
			"</transactions>";
	var loans_data="<loans>" +
			"<type></type>" +
			"<loan_amount></loan_amount>" +
			"<repayment_method></repayment_method>" +
			"<emi></emi>" +
			"<pending_emi></pending_emi>" +
			"<status exact='yes'>open</status>" +
			"</loans>";
			
	fetch_requested_data('report15',payments_data,function(payments)
	{
		var result=new Object();
		result.datasets=new Array();
		result.datasets[0]=new Object();
		result.datasets[0].label="Amount";
		result.datasets[0].fillColor=getRandomColor();
		result.datasets[0].strokeColor=result.datasets[0].fillColor;
		result.datasets[0].highlightFill=getLighterColor(result.datasets[0].fillColor);
		result.datasets[0].highlightStroke=getLighterColor(result.datasets[0].fillColor);
		result.datasets[0].data=new Array();
		result.labels=new Array();
		
		for(var i=0;i<payments.length;i++)
		{
			for(var j=i+1;j<payments.length;j++)
			{
				if(payments[i].status==payments[j].status && payments[i].type==payments[j].type)
				{
					payments[i].total_amount=parseFloat(payments[i].total_amount)+parseFloat(payments[j].total_amount);
					payments[i].paid_amount=parseFloat(payments[i].paid_amount)+parseFloat(payments[j].paid_amount);
					payments.splice(j,1);
					j-=1;
				}
			}
		}

		var capital_amount=0;
		var debit_amount=0;
		var credit_amount=0;

		for(var x=0;x<payments.length;x++)
		{
			if(payments[x].type=='paid' && payments[x].status=='pending')	
			{
				debit_amount+=parseFloat(payments[x].total_amount)-parseFloat(payments[x].paid_amount);
			}
			else if(payments[x].type=='received' && payments[x].status=='pending')	
			{
				credit_amount+=parseFloat(payments[x].total_amount)-parseFloat(payments[x].paid_amount);
			}
			else if(payments[x].status=='closed')	
			{
				if(payments[x].type=='paid')
				{
					capital_amount+=parseFloat(payments[x].paid_amount);
				}
				else
				{
					capital_amount+=parseFloat(payments[x].paid_amount);
				}
			}
		}
		
		result.labels.push('Debits');
		result.datasets[0].data.push(debit_amount);
		result.labels.push('Credits');
		result.datasets[0].data.push(credit_amount);
		result.labels.push('Working Capital');
		result.datasets[0].data.push(capital_amount);
		
		get_single_column_data(function(taxes)
		{
			var tax_value=0;
			for(var k in taxes)
			{
				tax_value+=parseFloat(taxes[k]);
			}
			result.labels.push('Tax');
			result.datasets[0].data.push(tax_value);
			
			
			fetch_requested_data('report15',loans_data,function(loans)
			{
				var loan_label='Loans given';
				var emi_label='Pending EMIs (receivables)';
				var loan_amount=0;
				var pending_emi_amount=0;
				for(var l=0;l<loans.length;l++)
				{
					if(loans[l].repayment_method=='lump sum')
					{
						if(loans[l].type=='given')
						{
							loan_amount+=parseFloat(loans[l].loan_amount);
						}
						else
						{
							loan_amount-=parseFloat(loans[l].loan_amount);
						}
					}
					else
					{
						if(loans[l].type=='given')
						{
							pending_emi_amount+=(parseFloat(loans[l].pending_emi)*parseFloat(loans[l].emi));
						}
						else
						{
							pending_emi_amount-=(parseFloat(loans[l].pending_emi)*parseFloat(loans[l].emi));
						}
					}
				}
				
				if(loan_amount<0)
				{
					loan_label='Loans taken';
					loan_amount=0-loan_amount;
				}
				if(pending_emi_amount<0)
				{
					emi_label='Pending EMIs (payable)';
					pending_emi_amount=0-pending_emi_amount;
				}
				
				result.labels.push(loan_label);
				result.datasets[0].data.push(loan_amount);
				result.labels.push(emi_label);
				result.datasets[0].data.push(pending_emi_amount);
			
				var mybarchart = new Chart(ctx).Bar(result,{});
				document.getElementById("report15_legend").innerHTML=mybarchart.generateLegend();
				
				var print_button=form.elements[4];
				print_graphical_report('report15','Financial Summary',print_button,mybarchart);
				
				hide_loader();
			});
		},tax_data);
	});
};
	
	</script>
</div>