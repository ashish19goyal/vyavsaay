<div id='report34' class='tab-pane'>
	<form id='report34_header' autocomplete="off">
		<fieldset>
			<label>Start date</br><input type='text' required title='Period start date for determination of effective margin'></label>
			<label>End date</br><input type='text' required title='Period end date for determination of effective margin'></label>
			<label>Effective Margin</br><input type="text" id="report34_margin" readonly='readonly'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	</br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report34_legend" style='display: block;'></div></div>
		<canvas id="report34_canvas" class='report_sizing'></canvas>
	</div>
	
	<script>
	function report34_header_ini()
{	
	var form=document.getElementById('report34_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report34_ini();
	});
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-86400000));
	end_date.value=vTime.date();
}

function report34_ini()
{
	show_loader();
	var form=document.getElementById('report34_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	
	var canvas_parent=$("#report34_canvas").parent();
	$("#report34_canvas").remove();
	$(canvas_parent).append("<canvas id='report34_canvas' class='report_sizing'></canvas>");
	var ctx = document.getElementById("report34_canvas").getContext("2d");
	
	var payments_data="<payments>" +
			"<total_amount></total_amount>" +
			"<paid_amount></paid_amount>" +
			"<date lowerbound='yes'>"+get_raw_time(start_date)+"</date>" +
			"<date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</date>" +
			"<type></type>" +
			"<status array='yes'>--pending--closed--</status>" +
			"</payments>";

	fetch_requested_data('report34',payments_data,function(payments)
	{
		///optimize this query
		var tax_data="<transactions>" +
				"<tax></tax>" +
				"<trans_date lowerbound='yes'>"+get_raw_time(start_date)+"</trans_date>" +
				"<trans_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</trans_date>" +
				"</transactions>";
		get_single_column_data(function(taxes)
		{
			var bills_data="<bills>" +
					"<id></id>" +
					"<bill_date lowerbound='yes'>"+get_raw_time(start_date)+"</bill_date>" +
					"<bill_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</bill_date>" +
					"</bills>";
			get_single_column_data(function(bills)
			{
				//console.log(bills);
				var bill_id_string="--";
				for(var i in bills)
				{
					bill_id_string+=bills[i]+"--";
				}
			
				var supplier_bills_data="<supplier_bills>" +
						"<id></id>" +
						"<bill_date lowerbound='yes'>"+get_raw_time(start_date)+"</bill_date>" +
						"<bill_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</bill_date>" +
						"</supplier_bills>";
				get_single_column_data(function(supplier_bills)
				{
					//console.log(supplier_bills);
					var sup_bill_id_string="--";
					for(var i in supplier_bills)
					{
						sup_bill_id_string+=supplier_bills[i]+"--";
					}
				
					var bill_items_data="<bill_items>" +
							"<item_name></item_name>" +
							"<batch></batch>" +
							"<quantity></quantity>" +
							"<bill_id array='yes'>"+bill_id_string+"</bill_id>" +
							"<last_updated lowerbound='yes'>"+get_raw_time(start_date)+"</last_updated>" +
							"<last_updated upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</last_updated>" +
							"</bill_items>";
					fetch_requested_data('report34',bill_items_data,function(bill_ids)
					{
						//console.log(bill_ids);
						var bill_item_string="--";
						for(var i in bill_ids)
						{
							bill_item_string+=bill_ids[i].item_name+"--";
						}
						
						var sup_bill_items_data="<supplier_bill_items>" +
								"<product_name></product_name>" +
								"<batch></batch>" +
								"<quantity></quantity>" +
								"<bill_id array='yes'>"+sup_bill_id_string+"</bill_id>" +
								"<last_updated lowerbound='yes'>"+get_raw_time(start_date)+"</last_updated>" +
								"<last_updated upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</last_updated>" +
								"</supplier_bill_items>";
						fetch_requested_data('report34',sup_bill_items_data,function(sup_bill_ids)
						{
							var sup_bill_item_string="--";
							for(var i in sup_bill_ids)
							{
								sup_bill_item_string+=sup_bill_ids[i].item_name+"--";
							}
							
							var products_data="<product_instances>" +
									"<product_name array='yes'>"+bill_item_string+sup_bill_item_string+"</product_name>" +
									"<cost_price></cost_price>" +
									"</product_instances>";
							
							fetch_requested_data('report34',products_data,function(products)
							{
								products.sort(function(a,b)
								{
									if(parseFloat(a.cost_price)<parseFloat(b.cost_price))
									{	return 1;}
									else 
									{	return -1;}
								});
								
								for(var j=0; j<products.length;j++)
								{
									for(var k=j+1; k<products.length;k++)
									{
										if(products[j].product_name===products[k].product_name)
										{
											products.splice(k,1);
											k-=1;
										}
									}
								}
								
								/////setting inventory amount///
								var inventory_amount=0;
								
								
								for(var a in bill_ids)
								{
									for(var b in products)
									{
										if(bill_ids[a].item_name==products[b].product_name)
										{
											inventory_amount-=(parseFloat(bill_ids[a].quantity)*parseFloat(products[b].cost_price));
											break;
										}
									}
								}
								
								//console.log(sup_bill_ids);
								//console.log(products);
								for(var a in sup_bill_ids)
								{
									for(var b in products)
									{
										if(sup_bill_ids[a].product_name==products[b].product_name)
										{
											inventory_amount+=(parseFloat(sup_bill_ids[a].quantity)*parseFloat(products[b].cost_price));
											break;
										}
									}
								}
								//console.log(inventory_amount);
								/////setting tax value//////////
								var tax_amount=0;
								for (var i in taxes)
								{
									tax_amount+=parseFloat(taxes[i]);
								}
								
								/////setting income and expense value//////
								var expenses_amount=0;
								var received_amount=0;
								for(var j in payments)
								{
									if(payments[j].type=='paid')
									{
										if(payments[j].status=='closed')
										{
											expenses_amount+=parseFloat(payments[j].paid_amount);
										}
										else
										{
											expenses_amount+=parseFloat(payments[j].total_amount);
										}
									}
									else
									{
										if(payments[j].status=='closed')
										{
											received_amount+=parseFloat(payments[j].paid_amount);
										}
										else
										{
											received_amount+=parseFloat(payments[j].total_amount);
										}
									}
								}
								
								/////////chart preparation/////////
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
								
								result.labels.push('Income');
								result.datasets[0].data.push(received_amount);
								result.labels.push('Expenses');
								result.datasets[0].data.push(expenses_amount);
								result.labels.push('Tax');
								result.datasets[0].data.push(tax_amount);
								
								//////final settings////////////
								if(inventory_amount>=0)
								{
									result.labels.push('Inventory Increase');
						  		   	result.datasets[0].data.push(inventory_amount);
								}
								else
								{
									result.labels.push('Inventory Decrease');
						  		   	result.datasets[0].data.push((-inventory_amount));
								}	
					  		   	var mybarchart = new Chart(ctx).Bar(result,{});
					  		   	document.getElementById("report34_legend").innerHTML=mybarchart.generateLegend();
					  		   	var margin=Math.round(((received_amount-expenses_amount-tax_amount+inventory_amount)/received_amount)*10000)/100;
					  		   	document.getElementById("report34_margin").value=margin+"%";
					  		   	
					  		    var print_button=form.elements[5];
					  		    print_graphical_report('report34','Effective Margin',print_button,mybarchart);
					  		   	hide_loader();
							  	
							});
						});
					});
				},supplier_bills_data);
			},bills_data);
		},tax_data);
	});
};

	</script>
</div>