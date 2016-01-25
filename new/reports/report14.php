<div id='report14' class='tab-pane'>
	<form id='report14_header' autocomplete="off">
		<fieldset>
			<label>Start date</br><input type='text' required></label>
			<label>End date</br><input type='text' required></label>
			<label>Select Account</br><input type='text' title='If this field is left blank, all applicable accounts will be shown'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	</br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report14_legend" style='display: block;'></div></div>
		<canvas id="report14_canvas" class='report_sizing'></canvas>
	</div>
	
	<script>
	
	function report14_header_ini()
{	
	var form=document.getElementById('report14_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];
	var account_filter=form.elements[3];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report14_ini();
	});

	var accounts_data="<accounts>" +
			"<acc_name></acc_name>" +
			"<type exact='yes'>financial</type>" +
			"</accounts>";
	set_my_filter(accounts_data,account_filter);
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-86400000));
	end_date.value=get_my_date();
}

function report14_ini()
{
	show_loader();
	var form=document.getElementById('report14_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	var account_name=form.elements[3].value;
	
	var canvas_parent=$("#report14_canvas").parent();
	$("#report14_canvas").remove();
	$(canvas_parent).append("<canvas id='report14_canvas' class='report_sizing'></canvas>");
	
	var ctx = document.getElementById("report14_canvas").getContext("2d");

	var accounts_data="<accounts>" +
			"<acc_name>"+account_name+"</acc_name>" +
			"<type exact='yes'>financial</type>" +
			"</accounts>";
	
	get_single_column_data(function(accounts)
	{
		var suppliers_data="<suppliers>" +
				"<acc_name></acc_name>" +
				"</suppliers>";
		get_single_column_data(function(suppliers)
		{
			var accounts_string="--";
			var suppliers_string="--";
			for (var k in accounts)
			{
				accounts_string+=accounts[k]+"--";
			}
			for (var l in suppliers)
			{
				suppliers_string+=suppliers[l]+"--";
			}
			
			var payments_data="<payments>" +
					"<acc_name array='yes'>"+accounts_string+suppliers_string+"</acc_name>" +
					"<total_amount></total_amount>" +
					"<status array='yes'>--pending--closed--</status>" +
					"<type exact='yes'>paid</type>" +
					"<date lowerbound='yes'>"+get_raw_time(start_date)+"</date>" +
					"<date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</date>" +
					"</payments>";
		
			fetch_requested_data('report14',payments_data,function(payments)
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
				
				for(var i=0;i<accounts.length;i++)
				{
					var label=accounts[i];
					var value=0;

					for(var j=0;j<payments.length;j++)
					{
						if(payments[j].acc_name===label)
						{
							value+=parseFloat(payments[j].total_amount);
							payments.splice(j,1);
							j-=1;
						}
					}
					result.labels.push(label);
					result.datasets[0].data.push(value);
				}
				
				result.labels.push('Inventory purchase');
				var value=0
				for(var j=0;j<payments.length;j++)
				{
					if(suppliers_string.search("-"+payments[j].acc_name+"-"))
					{
						value+=parseFloat(payments[j].total_amount);
					}
				}
				result.datasets[0].data.push(value);
			
				var mybarchart = new Chart(ctx).Bar(result,{});
				document.getElementById("report14_legend").innerHTML=mybarchart.generateLegend();
				
				var print_button=form.elements[5];
				print_graphical_report('report14','Expenses by Period',print_button,mybarchart);
				
				hide_loader();
			});
		},suppliers_data);
	},accounts_data);
};

	</script>
</div>