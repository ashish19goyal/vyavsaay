<div id='report43' class='tab-pane'>
	<form id='report43_header'  autocomplete="off" style='text-align:left;'>
		<fieldset>
			<label>Customer</br><input type='text' title='If this field is left blank, top 10 customers will be shown'></label>
			<label>Period 1</br>
			<label>Start Date</br><input type='text' required></label></br>
			<label>End Date</br><input type='text' required></label></label>
			<label>Period 2</br>
			<label>Start Date</br><input type='text' required></label></br>
			<label>End Date</br><input type='text' required></label></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>
		</fieldset>
	</form>
</br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report43_legend" style='display: block;'></div></div>
		<canvas id="report43_canvas" class='report_sizing'></canvas>
	</div>
	
	<script>

function report43_header_ini()
{	
	var form=document.getElementById('report43_header');
	var customer_filter=form.elements[1];
	var p1_start_filter=form.elements[2];
	var p1_end_filter=form.elements[3];
	var p2_start_filter=form.elements[4];
	var p2_end_filter=form.elements[5];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report43_ini();
	});
	
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(customer_data,customer_filter);
	
	$(p1_start_filter).datepicker();
	p1_start_filter.value=get_my_past_date((get_my_time()-86400000));
	
	$(p1_end_filter).datepicker();
	p1_end_filter.value=vTime.date();

	$(p2_start_filter).datepicker();
	p2_start_filter.value=get_my_past_date((get_my_time()-86400000));
	
	$(p2_end_filter).datepicker();
	p2_end_filter.value=vTime.date();
}

function report43_ini()
{
	show_loader();
	var form=document.getElementById('report43_header');
	var customer=form.elements[1].value;
	var p1_start_date=form.elements[2].value;
	var p1_end_date=form.elements[3].value;
	var p2_start_date=form.elements[4].value;
	var p2_end_date=form.elements[5].value;
	
	var canvas_parent=$("#report43_canvas").parent();
	$("#report43_canvas").remove();
	$(canvas_parent).append("<canvas id='report43_canvas' class='report_sizing'></canvas>");
	var ctx = document.getElementById("report43_canvas").getContext("2d");
	
	var p1_bills_data="<bills>" +
			"<id></id>" +
			"<customer_name>"+customer+"</customer_name>" +
			"<amount></amount>" +
			"<bill_date lowerbound='yes'>"+get_raw_time(p1_start_date)+"</bill_date>" +
			"<bill_date upperbound='yes'>"+(get_raw_time(p1_end_date)+86400000)+"</bill_date>" +
			"</bills>";
	fetch_requested_data('report43',p1_bills_data,function(p1_bills)
	{
		var p2_bills_data="<bills>" +
				"<id></id>" +
				"<customer_name>"+customer+"</customer_name>" +
				"<amount></amount>" +
				"<bill_date lowerbound='yes'>"+get_raw_time(p2_start_date)+"</bill_date>" +
				"<bill_date upperbound='yes'>"+(get_raw_time(p2_end_date)+86400000)+"</bill_date>" +
				"</bills>";
		fetch_requested_data('report43',p2_bills_data,function(p2_bills)
		{
			var result=new Object();
			result.datasets=new Array();
			result.datasets[0]=new Object();
			result.datasets[0].label="Period 1 sales";
			result.datasets[0].fillColor=getRandomColor();
			result.datasets[0].strokeColor=result.datasets[0].fillColor;
			result.datasets[0].highlightFill=getLighterColor(result.datasets[0].fillColor);
			result.datasets[0].highlightStroke=getLighterColor(result.datasets[0].fillColor);
			result.datasets[0].data=new Array();
			result.datasets[1]=new Object();
			result.datasets[1].label='Period 2 sales';
			result.datasets[1].fillColor=getRandomColor();
			result.datasets[1].strokeColor=result.datasets[1].fillColor;
			result.datasets[1].highlightFill=getLighterColor(result.datasets[1].fillColor);
			result.datasets[1].highlightStroke=getLighterColor(result.datasets[1].fillColor);
			result.datasets[1].data=new Array();
			
			result.labels=new Array();
	
			for(var i=0;i<p1_bills.length;i++)
			{
				for(var j=i+1;j<p1_bills.length;j++)
				{
					if(p1_bills[i].customer_name===p1_bills[j].customer_name)
					{
						p1_bills[i].amount=parseFloat(p1_bills[i].amount)+parseFloat(p1_bills[j].amount);
						p1_bills.splice(j,1);
						j-=1;
					}
				}
			}
			
			for(var i=0; i<p2_bills.length;i++)
			{
				for(var j=i+1; j<p2_bills.length;j++)
				{
					if(p2_bills[i].customer_name===p2_bills[j].customer_name)
					{
						p2_bills[i].amount=parseFloat(p2_bills[i].amount)+parseFloat(p2_bills[j].amount);
						p2_bills.splice(j,1);
						j-=1;
					}
				}
			}

			p1_bills.sort(function(a,b)
			{
				if(parseFloat(a.amount)<parseFloat(b.amount))
				{	return 1;}
				else 
				{	return -1;}
			});
			
			
			p2_bills.sort(function(a,b)
			{
				if(parseFloat(a.amount)<parseFloat(b.amount))
				{	return 1;}
				else 
				{	return -1;}
			});

			for(var k=0; k<p1_bills.length;k++)
			{
				if(result.labels.length<11)
				{
					result.labels.push(p1_bills[k].customer_name);
					result.datasets[0].data.push(Math.round(p1_bills[k].amount));
					var p2_sale=0;
					for(var l=0;l<p2_bills.length;l++)
					{
						if(p1_bills[k].customer_name===p2_bills[l].customer_name)
						{
							p2_sale=p2_bills[l].amount;
							p2_bills.splice(l,1);
							break;
						}
					}
					result.datasets[1].data.push(Math.round(p2_sale));
				}
				else
				{
					break;
				}
			}

			for(var m=0; m<p2_bills.length;m++)
			{
				if(result.labels.length<11)
				{
					result.labels.push(p2_bills[m].customer_name);
					result.datasets[0].data.push(0);
					result.datasets[1].data.push(Math.round(p2_bills[m].amount));
				}
				else
				{
					break;
				}
			}

  		   var mybarchart = new Chart(ctx).Bar(result,{});
  		   document.getElementById("report43_legend").innerHTML=mybarchart.generateLegend();
  		   
  		   var print_button=form.elements[7];
  		   print_graphical_report('report43','Changeing Customer Purchasing',print_button,mybarchart);
						  		   
  		   hide_loader();
		});
	});
};
	
	</script>
</div>
