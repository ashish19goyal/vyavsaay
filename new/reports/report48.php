<div id='report48' class='tab-pane'>
	<form id='report48_header' autocomplete="off">
		<fieldset>
			<label>Product <input type='text' title='If this field is blank, all applicable products will be shown'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Product </th>
				<th>Cost Estimate </th>
				<th>Time Estimate </th>
			</tr>
		</thead>
		<tbody id='report48_body'>
		</tbody>
		<tfoot id='report48_foot'>
		</tfoot>
	</table>
	
	<script>

function report48_header_ini()
{	
	var form=document.getElementById('report48_header');
	var product_filter=form.elements[1];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report48_ini();
	});

	var product_data="<manufacturing_schedule>" +
			"<product></product>" +
			"</manufacturing_schedule>";
	set_my_filter(product_data,product_filter);
}

function report48_ini()
{
	show_loader();
	var form=document.getElementById('report48_header');
	var product=form.elements[1].value;
	
	$('#report48_body').html('');

	var manu_data="<manufacturing_schedule>" +
		"<product>"+product+"</product>" +
		"</manufacturing_schedule>";
	
	get_single_column_data(function(manus)
	{
		var manus_string="--";
		for(var i in manus)
		{
			manus_string+=manus[i]+"--";
		}
		
		var requisite_data="<pre_requisites>" +
				"<id></id>" +
				"<name array='yes'>"+manus_string+"</name>" +
				"<type exact='yes'>product</type>" +
				"<requisite_type array='yes'>--product--task--</requisite_type>" +
				"<requisite_name></requisite_name>" +
				"<quantity></quantity>" +
				"</pre_requisites>";
		
		fetch_requested_data('report48',requisite_data,function(requisites)
		{
			var requisites_string="--";
			for(var j in requisites)
			{
				if(requisites[j].requisite_type=='product')
					requisites_string+=requisites[j].requisite_name+"--";
			}
		
			var cost_data="<product_instances>" +
					"<product_name array='yes'>"+requisites_string+"</product_name>" +
					"<cost_price></cost_price>" +
					"</product_instances>";
			
			fetch_requested_data('report48',cost_data,function(costs)
			{
				var total_cost=0;
				var total_time=0;
				
				manus.forEach(function(manu)
				{	
					var time=0;
					var cost=0;

					for(var k in requisites)
					{
						if(requisites[k].name==manu)
						{	
							if(requisites[k].requisite_type=='task')
							{
								time+=parseFloat(requisites[k].quantity);
							}
							else if(requisites[k].requisite_type=='product')
							{
								var product_cost=0;
								for(var l in costs)
								{
									if(costs[l].product_name==requisites[k].requisite_name)
									{
										product_cost=parseFloat(costs[l].cost_price);
										break;
									}
								}
								cost+=(parseFloat(requisites[k].quantity)*product_cost);
							}
						}
					}
					
					total_cost+=cost;
					total_time+=time;
											
					var rowsHTML="<tr>";
						rowsHTML+="<td data-th='Product'>";
							rowsHTML+=manu;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Cost Estimate'>";
							rowsHTML+="Rs. "+cost;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Time Estimate'>";
							rowsHTML+=time+" hours";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
					
					$('#report48_body').append(rowsHTML);
				});
				
				var total_row="<tr><td data-th='Total'>Total</td><td data-th='Cost'>"+total_cost+"</td><td data-th='Time'>"+total_time+"</td></tr>";
				$('#report48_foot').html(total_row);
		
				var print_button=form.elements[3];
				print_tabular_report('report48','Resource Analysis',print_button);
				hide_loader();
			});
		});
	},manu_data);
};
	
	
	</script>
</div>