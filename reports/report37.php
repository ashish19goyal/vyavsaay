<div id='report37' class='tab-pane'>
	<form id='report37_header' autocomplete="off">
		<fieldset>
			<label>Due date</br><input type='text' required></label>
			<label>Supplier</br><input type='text' title='If this field is left blank, top 10 suppliers will be shown'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	</br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report37_legend" style='display: block;'></div></div>
		<canvas id="report37_canvas" class='report_sizing'></canvas>
	</div>
	
	<script>
	function report37_header_ini()
{	
	var form=document.getElementById('report37_header');
	var due_date=form.elements[1];
	var supplier_filter=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report37_ini();
	});

	var supplier_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	set_my_filter(supplier_data,supplier_filter);
	
	$(due_date).datepicker();
	due_date.value=vTime.date();
}

function report37_ini()
{
	show_loader();
	var form=document.getElementById('report37_header');
	var due_date=form.elements[1].value;
	var supplier_name=form.elements[2].value;
	
	var canvas_parent=$("#report37_canvas").parent();
	$("#report37_canvas").remove();
	$(canvas_parent).append("<canvas id='report37_canvas' class='report_sizing'></canvas>");
	
	var ctx = document.getElementById("report37_canvas").getContext("2d");

	var supplier_data="<suppliers>" +
			"<acc_name>"+supplier_name+"</acc_name>" +
			"</suppliers>";
	get_single_column_data(function(suppliers)
	{
		var suppliers_string="--";
		for (var k in suppliers)
		{
			suppliers_string+=suppliers[k]+"--";
		}
		var payments_data="<payments>" +
				"<acc_name array='yes'>"+suppliers_string+"</acc_name>" +
				"<total_amount></total_amount>" +
				"<paid_amount></paid_amount>" +
				"<due_date upperbound='yes'>"+(get_raw_time(due_date)+86400000)+"</due_date>" +
				"<status exact='yes'>pending</status>" +
				"<type></type>" +
				"</payments>";
	
		fetch_requested_data('report6',payments_data,function(payments)
		{
			payments.sort(function(a,b)
			{
				if(parseFloat(a.total_amount)<parseFloat(b.total_amount))
				{	return 1;}
				else 
				{	return -1;}
			});
					
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
			
			for(var i=0; i<payments.length;i++)
			{
				var label=payments[i].acc_name;
				var value=0;
				if(payments[i].type=='received')
				{
					value=parseFloat(payments[i].paid_amount)-parseFloat(payments[i].total_amount);
				}
				else
				{
					value=parseFloat(payments[i].total_amount)-parseFloat(payments[i].paid_amount);
				}
				for(var j=i+1;j<payments.length;j++)
				{
					if(payments[j].acc_name===label)
					{
						if(payments[j].type=='received')
						{
							value+=parseFloat(payments[j].paid_amount)-parseFloat(payments[j].total_amount);
						}
						else
						{
							value+=parseFloat(payments[j].total_amount)-parseFloat(payments[j].paid_amount);
						}
						payments.splice(j,1);
						j-=1;
					}
				}
				if(result.labels.length<11)
				{
					result.labels.push(label);
					result.datasets[0].data.push(Math.round(value));
				}
			}
	
			var mybarchart = new Chart(ctx).Bar(result,{});
			document.getElementById("report37_legend").innerHTML=mybarchart.generateLegend();
			
			var print_button=form.elements[4];
			print_graphical_report('report37','Payments due to Suppliers',print_button,mybarchart);
			
			hide_loader();
		});
	},supplier_data);
};

	</script>
</div>