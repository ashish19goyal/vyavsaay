/**
 * @reportNo 1
 * @report Signage Changes
 */
function report1_ini()
{
	var form=document.getElementById('report1_header');
	var date_since=form.elements[1].value;
	var product_filter=form.elements[2].value;

	show_loader();
	$('#report1_body').html('');
	var report_count=2;
	/////appending new arrivals details
	var product_data="<supplier_bill_items>" +
			"<product_name>"+product_filter+"</product_name>" +
			"<last_updated lowerbound='yes'>"+get_raw_time(date_since)+"</last_updated>" +
			"</supplier_bill_items>";
	
	get_single_column_data(function(products)
	{
		report_count-=1;
		report_count+=products.length;
		
		products.forEach(function(product)
		{
			var bill_id_data="<supplier_bill_items>" +
					"<product_name exact='yes'>"+product+"</product_name>" +
					"<bill_id></bill_id>" +
					"<batch></batch>" +
					"</supplier_bill_items>";
			
			fetch_requested_data('report1',bill_id_data,function(bill_ids)
			{
				var sup_bill_id_array="--";
				for(var j in bill_ids)
				{
					sup_bill_id_array+=bill_ids[j].sup_bill_id+"--";
				}
				
				var sup_bill_data="<supplier_bills count='1'>" +
						"<bill_id array='yes'>"+sup_bill_id_array+"</bill_id>" +
						"<entry_date upperbound='yes'>"+get_raw_time(date_since)+"</entry_date>" +
						"</supplier_bills>";
			
				fetch_requested_data('report1',sup_bill_data,function(bill_entries)
				{
					if(bill_entries.length==0)
					{
						var store_data="<area_utilization>" +
								"<name></name>" +
								"<item_name exact='yes'>"+product+"</item_name>" +
								"<batch></batch>" +
								"</area_utilization>";
						
						fetch_requested_data('report1',store_data,function(areas)
						{
							var areas_string="";
							for(var x in areas)
							{
								areas_string+=areas[x].name+", ";
							}
							areas_string=areas_string.substr(0,(areas_string.length-2));

							var rowsHTML="<tr>";
								rowsHTML+="<td data-th='Product'>";
									rowsHTML+=bill_ids[j].product_name;
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Batch'>";
									rowsHTML+=bill_ids[j].batch;
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Store Area'>";
									rowsHTML+=areas_string;
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Type'>";
									rowsHTML+="New Arrival";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Detail'>";
									rowsHTML+="New product";
								rowsHTML+="</td>";
							rowsHTML+="</tr>";						

							$('#report1_body').append(rowsHTML);
							report_count-=1;
						});
					}
				});
			});
		});
	},product_data);
	
/////appending offer details
	var offer_data="<offers>" +
			"<product_name>"+product_filter+"</product_name>" +
			"<batch></batch>" +
			"<offer_detail></offer_detail>" +
			"<status></status>" +
			"<last_updated lowerbound='yes'>"+get_raw_time(date_since)+"</last_updated>" +
			"</offers>";
	
	fetch_requested_data('report1',offer_data,function(offers)
	{
		report_count-=1;
		report_count+=offers.length;
		offers.forEach(function(offer)
		{
			var store_data="<area_utilization>" +
					"<name></name>" +
					"<item_name exact='yes'>"+offer.product_name+"</item_name>" +
					"<batch>"+offer.batch+"</batch>" +
					"</area_utilization>";
			
			fetch_requested_data('report1',store_data,function(areas)
			{
				var areas_string="";
				for(var x in areas)
				{
					areas_string+=areas[x].name+", ";
				}
				areas_string=areas_string.substr(0,(areas_string.length-2));
				var rowsHTML="<tr>";
					rowsHTML+="<td data-th='Product'>";
						rowsHTML+=offer.product_name;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+=offer.batch;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Store Area'>";
						rowsHTML+=areas_string;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+='Updated Offer';
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Detail'>";
						rowsHTML+=offer.offer_detail;
					rowsHTML+="</td>";
				rowsHTML+="</tr>";
				
				$('#report1_body').append(rowsHTML);
				report_count-=1;
			});
		});
	});
	
	var report_complete=setInterval(function()
	{
	   if(report_count===0)
	   {
		   clearInterval(report_complete);
		   hide_loader();
	   }
	},1000);
	
	var print_button=form.elements[4];
	print_tabular_report('report1','Signage Changes',print_button);

};


/**
 * @reportNo 4
 * @report Modes of payment
 */
function report4_ini()
{
	show_loader();
	var form=document.getElementById('report4_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	
	var canvas_parent=$("#report4_canvas").parent();
	$("#report4_canvas").remove();
	$(canvas_parent).append("<canvas id='report4_canvas' class='report_sizing'></canvas>");
	
	var ctx = document.getElementById("report4_canvas").getContext("2d");
	var modes_data="<payments>" +
			"<mode></mode>" +
			"<paid_amount></paid_amount>" +
			"<status exact='yes'>closed</status>" +
			"<type exact='yes'>received</type>" +
			"<date lowerbound='yes'>"+get_raw_time(start_date)+"</date>" +
			"<date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</date>" +
			"</payments>";

	fetch_requested_data('report4',modes_data,function(modes)
	{
		var result=transform_to_pie_sum(modes,'paid_amount','mode');
		var mydoughchart = new Chart(ctx).Doughnut(result,{});
		document.getElementById("report4_legend").innerHTML=mydoughchart.generateLegend();
		
		var print_button=form.elements[4];
		print_graphical_report('report4','Modes of Payment',print_button,mydoughchart);
		hide_loader();
	});
};

/**
 * @reportNo 5
 * @report Customers account balance
 */
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


/**
 * @reportNo 6
 * @report Payments Due from customers 
 */
function report6_ini()
{
	show_loader();
	var form=document.getElementById('report6_header');
	var due_date=form.elements[1].value;
	var customer_name=form.elements[2].value;
	
	var canvas_parent=$("#report6_canvas").parent();
	$("#report6_canvas").remove();
	$(canvas_parent).append("<canvas id='report6_canvas' class='report_sizing'></canvas>");
	
	var ctx = document.getElementById("report6_canvas").getContext("2d");

	var customer_data="<customers>" +
			"<acc_name>"+customer_name+"</acc_name>" +
			"</customers>";
	get_single_column_data(function(customers)
	{
		var customers_string="--";
		for (var k in customers)
		{
			customers_string+=customers[k]+"--";
		}
		var payments_data="<payments>" +
				"<acc_name array='yes'>"+customers_string+"</acc_name>" +
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
					value=parseFloat(payments[i].total_amount)-parseFloat(payments[i].paid_amount);
				}
				else
				{
					value=parseFloat(payments[i].paid_amount)-parseFloat(payments[i].total_amount);
				}
				for(var j=i+1;j<payments.length;j++)
				{
					if(payments[j].acc_name===label)
					{
						if(payments[j].type=='received')
						{
							value+=parseFloat(payments[j].total_amount)-parseFloat(payments[j].paid_amount);
						}
						else
						{
							value+=parseFloat(payments[j].paid_amount)-parseFloat(payments[j].total_amount);
						}
						payments.splice(j,1);
						j-=1;
					}
				}
				if(result.labels.length<11)
				{
					result.labels.push(label);
					result.datasets[0].data.push(value);
				}
			}
	
			var mybarchart = new Chart(ctx).Bar(result,{});
			document.getElementById("report6_legend").innerHTML=mybarchart.generateLegend();
			
			var print_button=form.elements[4];
			print_graphical_report('report6','Payments Due from Customers',print_button,mybarchart);
			
			hide_loader();
		});
	},customer_data);
};

/**
 * @reportNo 9
 * @report Product sales report
 */
function report9_ini()
{
	var form=document.getElementById('report9_header');
	var name=form.elements[1].value;
	var make=form.elements[2].value;
	var customer=form.elements[3].value;
	var start_date=form.elements[4].value;
	var end_date=form.elements[5].value;
	
	show_loader();
	$('#report9_body').html('');
	var rowsHTML="";
	
	var bills_data="<bills>" +
				"<id></id>" +
				"<customer_name>"+customer+"</customer_name>" +
				"<bill_date lowerbound='yes'>"+get_raw_time(start_date)+"</bill_date>" +
				"<bill_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</bill_date>" +
				"</bills>";
	var bill_return_data="<customer_returns>"+
				"<id></id>"+
				"<customer>"+customer+"</customer>"+
				"<return_date lowerbound='yes'>"+get_raw_time(start_date)+"</return_date>" +
				"<return_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</return_date>" +
				"</customer_returns>";	
	fetch_requested_data('report9',bills_data,function(bills)
	{
		fetch_requested_data('report9',bill_return_data,function(bill_returns)
		{
			var bills_string="--";
			for(var i in bills)
			{
				bills_string+=bills[i].id+"--";
			}
			var returns_string="--";
			for(var j in bill_returns)
			{
				returns_string+=bill_returns[j].id+"--";
			}
			
			var bill_items_data="<bill_items>" +
					"<bill_id array='yes'>"+bills_string+"</bill_id>" +
					"<item_name>"+name+"</item_name>" +
					"<quantity></quantity>" +
					"<amount></amount>" +
					"<last_updated lowerbound='yes'>"+get_raw_time(start_date)+"</last_updated>" +
					"<last_updated upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</last_updated>" +
					"</bill_items>";
			var return_items_data="<customer_return_items>" +
					"<return_id array='yes'>"+returns_string+"</return_id>" +
					"<item_name>"+name+"</item_name>" +
					"<quantity></quantity>" +
					"<refund_amount></refund_amount>" +
					"<exchange_batch></exchange_batch>"+
					"<last_updated lowerbound='yes'>"+get_raw_time(start_date)+"</last_updated>" +
					"<last_updated upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</last_updated>" +
					"</customer_return_items>";
			
			fetch_requested_data('report9',bill_items_data,function(bill_ids)
			{
				fetch_requested_data('report9',return_items_data,function(bill_return_ids)
				{
					var product_string="--";
					for(var j in bill_ids)
					{
						product_string+=bill_ids[j].item_name+"--";
					}
					for(var k in bill_return_ids)
					{
						product_string+=bill_return_ids[j].item_name+"--";
					}
					
					var make_data="<product_master>" +
							"<name array='yes'>"+product_string+"</name>" +
							"<make>"+make+"</make>" +
							"</product_master>";

					fetch_requested_data('report9',make_data,function(makes)
					{
						var total_quantity=0;
						var total_amount=0;
						for(var k in bill_ids)
						{
							for(var z in makes)
							{
								if(bill_ids[k].item_name==makes[z].name)
								{
									var customer_name="";
									for(var m in bills)
									{
										if(bills[m].id==bill_ids[k].bill_id)
										{
											customer_name=bills[m].customer_name;
											break;
										}
									}
									total_quantity+=parseFloat(bill_ids[k].quantity);
									total_amount+=parseFloat(bill_ids[k].amount);
									rowsHTML+="<tr>";
										rowsHTML+="<td data-th='Product Name'>";
											rowsHTML+=bill_ids[k].item_name;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Make'>";
											rowsHTML+=makes[z].make;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Customer'>";
											rowsHTML+=customer_name;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Quantity'>";
											rowsHTML+=bill_ids[k].quantity;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Amount'>";
											rowsHTML+="Rs. "+bill_ids[k].amount;
										rowsHTML+="</td>";
									rowsHTML+="</tr>";
									break;
								}
							}
						}
						for(var k in bill_return_ids)
						{
							if(bill_return_ids[k].exchange_batch=='null' || bill_return_ids[k].exchange_batch=='')
							{
								for(var z in makes)
								{
									if(bill_return_ids[k].item_name==makes[z].name)
									{
										var customer_name="";
										for(var m in bill_returns)
										{
											if(bill_returns[m].id==bill_return_ids[k].return_id)
											{
												customer_name=bill_returns[m].customer;
												break;
											}
										}
										total_quantity-=parseFloat(bill_return_ids[k].quantity);
										total_amount-=parseFloat(bill_return_ids[k].refund_amount);
										rowsHTML+="<tr>";
											rowsHTML+="<td data-th='Product Name'>";
												rowsHTML+=bill_return_ids[k].item_name;
											rowsHTML+="</td>";
											rowsHTML+="<td data-th='Make'>";
												rowsHTML+=makes[z].make;
											rowsHTML+="</td>";
											rowsHTML+="<td data-th='Customer'>";
												rowsHTML+=customer_name;
											rowsHTML+="</td>";
											rowsHTML+="<td data-th='Quantity'>";
												rowsHTML+="-"+bill_return_ids[k].quantity;
											rowsHTML+="</td>";
											rowsHTML+="<td data-th='Amount'>";
												rowsHTML+="Rs. -"+ bill_return_ids[k].refund_amount;
											rowsHTML+="</td>";
										rowsHTML+="</tr>";
										break;
									}
								}
							}
						}
						$('#report9_body').html(rowsHTML);
						
						var total_row="<tr><td colspan='3' data-th='Total'>Total</td><td data-th='Quantity'>"+total_quantity+"</td><td data-th='Amount'>Rs. "+Math.round(total_amount)+"</td></tr>";
						$('#report9_foot').html(total_row);
						
						var print_button=form.elements[7];
						print_tabular_report('report9','Product Sales Report',print_button);
						
						hide_loader();
					});
				});
			});
		});
	});
};

/**
 * @reportNo 14
 * @report Expenses by period
 */
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


/**
 * @reportNo 15
 * @report Financial summary
 */
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

/**
 * @reportNo 17
 * @report Staff performance
 */
function report17_ini()
{
	var form=document.getElementById('report17_header');
	var from_date=form.elements[1].value;
	var to_date=form.elements[2].value;
	var staff=form.elements[3].value;
	
	show_loader();
	$('#report17_body').html("");
	var rowsHTML="";
	
	var staff_data="<staff>" +
			"<acc_name>"+staff+"</acc_name>" +
			"<status exact='yes'>active</status>" +
			"</staff>";
	get_single_column_data(function(employees)
	{	
		var employees_string="--";
		for(var j in employees)
		{
			employees_string+=employees[j]+"--";
		}
		
		var attendance_data="<attendance>" +
				"<acc_name array='yes'>"+employees_string+"</acc_name>" +
				"<presence></presence>" +
				"<hours_worked></hours_worked>" +
				"<date lowerbound='yes'>"+(get_raw_time(from_date)-10000)+"</date>" +
				"<date upperbound='yes'>"+(get_raw_time(to_date)+86400000)+"</date>" +
				"</attendance>";
		
		fetch_requested_data('report17',attendance_data,function(attendances)
		{
			var task_instances_data="<task_instances>" +
						"<assignee array='yes'>"+employees_string+"</assignee>" +
						"<status exact='yes'>completed</status>" +
						"<last_updated lowerbound='yes'>"+(get_raw_time(from_date)-10000)+"</last_updated>" +
						"<last_updated upperbound='yes'>"+(get_raw_time(to_date)+86400000)+"</last_updated>" +
						"<task_hours></task_hours>" +
						"</task_instances>";
			fetch_requested_data('report17',task_instances_data,function(tasks)
			{
				var total_tasks=0;
				var total_task_hours=0;
				var total_absence=0;
				var total_hours_worked=0;
				
				employees.forEach(function(employee)
				{
					var acc_name=employee;

					var absents=0;
					var hours=0;
					for(var i in attendances)
					{
						if(attendances[i].acc_name==acc_name)
						{
							if(attendances[i].presence=='absent')
								absents+=1;
							hours+=parseInt(attendances[i].hours_worked);
						}
					}
	
					var num_tasks=0;
					var task_hours=0;
					for(var k in tasks)
					{
						if(tasks[k].assignee==acc_name)
						{
							task_hours+=parseInt(tasks[k].task_hours);
							num_tasks+=1;
						}
					}
				
					total_tasks+=num_tasks;
					total_task_hours+=task_hours;
					total_absence+=absents;
					total_hours_worked+=hours;
					
					rowsHTML+="<tr>";
						rowsHTML+="<td data-th='Staff Name'>";
							rowsHTML+=acc_name;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='# Tasks'>";
							rowsHTML+=num_tasks;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='# Task Hours'>";
							rowsHTML+=task_hours;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='# Absence'>";
							rowsHTML+=absents;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='# hours worked'>";
							rowsHTML+=hours;
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
				});
				$('#report17_body').html(rowsHTML);
				
				var total_row="<tr><td data-th='Total'>Total</td><td data-th='# Tasks'>"+total_tasks+"</td><td data-th='# Task Hours'>"+total_task_hours+
						"</td><td data-th='# Absence'>"+total_absence+"</td><td data-th='# Hours worked'>"+total_hours_worked+"</td></tr>";
				$('#report17_foot').html(total_row);
				
				var print_button=form.elements[5];
				print_tabular_report('report17','Staff Performance',print_button);
				
				hide_loader();
			});
		});	
	},staff_data);
};

/**
 * @reportNo 26
 * @report Sales by customers
 */
function report26_ini()
{
	show_loader();
	var form=document.getElementById('report26_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	var customer=form.elements[3].value;
	
	var canvas_parent=$("#report26_canvas").parent();
	$("#report26_canvas").remove();
	$(canvas_parent).append("<canvas id='report26_canvas' class='report_sizing'></canvas>");
	
	var ctx = document.getElementById("report26_canvas").getContext("2d");
	var sales_data="<bills>" +
			"<amount></amount>" +
			"<customer_name>"+customer+"</customer_name>" +
			"<bill_date lowerbound='yes'>"+get_raw_time(start_date)+"</bill_date>" +
			"<bill_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</bill_date>" +
			"</bills>";

	fetch_requested_data('report26',sales_data,function(sales)
	{
		sales.sort(function(a,b)
		{
			if(parseFloat(a.amount)<parseFloat(b.amount))
			{	return 1;}
			else 
			{	return -1;}
		});
				
		var result=transform_to_bar_sum(sales,'Bill Amount','amount','customer_name');
		var mybarchart = new Chart(ctx).Bar(result,{});
		document.getElementById("report26_legend").innerHTML=mybarchart.generateLegend();
		
		var print_button=form.elements[5];
		print_graphical_report('report26','Sales by Customers',print_button,mybarchart);
		
		hide_loader();
	});
};

/**
 * @reportNo 27
 * @report expiring inventory
 */
function report27_ini()
{
	show_loader();
	var form=document.getElementById('report27_header');
	var expiry_date=form.elements[1].value;
	var product_name=form.elements[2].value;
	
	var canvas_parent=$("#report27_canvas").parent();
	$("#report27_canvas").remove();
	$(canvas_parent).append("<canvas id='report27_canvas' class='report_sizing'></canvas>");
	var ctx = document.getElementById("report27_canvas").getContext("2d");
	
	var product_data="<product_instances>" +
			"<product_name>"+product_name+"</product_name>" +
			"<batch></batch>" +
			"<expiry upperbound='yes'>"+get_raw_time(expiry_date)+"</expiry>" +
			"</product_instances>";

	fetch_requested_data('report27',product_data,function(products)
	{
		var products_count=products.length;
		products.forEach(function(data1)
		{
			get_inventory(data1.product_name,data1.batch,function(value0)
			{
				data1.quantity=value0;
				products_count-=1;
			});
		});

		var report_timer=setInterval(function()
		{
	  	   if(products_count===0)
	  	   {
	  		   clearInterval(report_timer);
	  		   var result=transform_to_bar_sum(products,'Quantity','quantity','product_name');
	  		   var mybarchart = new Chart(ctx).Bar(result,{});
	  		   document.getElementById("report27_legend").innerHTML=mybarchart.generateLegend();
	  		   
	  		   var print_button=form.elements[4];
	  		   print_graphical_report('report27','Expiring Inventory',print_button,mybarchart);
	  		   
	  		   hide_loader();
	  	   }
	    },100);
		
	});
};

/**
 * @reportNo 28
 * @report Short Inventory
 */
function report28_ini()
{
	console.log('report28');
	show_loader();
	var form=document.getElementById('report28_header');
	var num_days=parseInt(form.elements[1].value);
	var product=form.elements[2].value;
	var raw_time=get_my_time()-(num_days*86400000);
	
	var canvas_parent=$("#report28_canvas").parent();
	$("#report28_canvas").remove();
	$(canvas_parent).append("<canvas id='report28_canvas' class='report_sizing'></canvas>");
	var ctx = document.getElementById("report28_canvas").getContext("2d");
	//ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
	
	var bills_data="<bills>" +
			"<id></id>" +
			"<bill_date lowerbound='yes'>"+raw_time+"</bill_date>" +
			"<type array='yes'>--product--both--</type>" +
			"</bills>";
	get_single_column_data(function(bill_ids)
	{
		console.log('report28-2');
		
		var bill_id_array="--";
		for(var i in bill_ids)
		{
			bill_id_array+=bill_ids[i]+"--";
		}
		var sales_data="<bill_items>" +
				"<bill_id array='yes'>"+bill_id_array+"</bill_id>" +
				"<quantity></quantity>" +
				"<item_name>"+product+"</item_name>" +
				"<last_updated lowerbound='yes'>"+raw_time+"</last_updated>" +
				"</bill_items>";
		fetch_requested_data('report28',sales_data,function(sales_array)
		{
			console.log('report28-3');

			var sales_array_result=new Array();
			for(var k=0; k<sales_array.length;k++)
			{
				var new_obj=new Object();
				new_obj.item_name=sales_array[k].item_name;
				new_obj.quantity=parseFloat(sales_array[k].quantity);
				for(var j=k+1;j<sales_array.length;j++)
				{
					if(sales_array[j].item_name==new_obj.item_name)
					{
						new_obj.quantity+=parseFloat(sales_array[j].quantity);
						sales_array.splice(j,1);
						j-=1;
					}
				}
				sales_array_result.push(new_obj);
			}
			
			///modify sales_array_result as per search criteria
			
			sales_array_result.sort(function(a,b)
			{
				if(a.quantity<b.quantity)
				{	return 1;}
				else 
				{	return -1;}
			});
			
			
			var result=new Object();
			result.datasets=new Array();
			result.datasets[0]=new Object();
			result.datasets[0].label="Current Inventory";
			result.datasets[0].fillColor=getRandomColor();
			result.datasets[0].strokeColor=result.datasets[0].fillColor;
			result.datasets[0].highlightFill=getLighterColor(result.datasets[0].fillColor);
			result.datasets[0].highlightStroke=getLighterColor(result.datasets[0].fillColor);
			result.datasets[0].data=new Array();
			result.datasets[1]=new Object();
			result.datasets[1].label='Sold Quantity';
			result.datasets[1].fillColor=getRandomColor();
			result.datasets[1].strokeColor=result.datasets[1].fillColor;
			result.datasets[1].highlightFill=getLighterColor(result.datasets[1].fillColor);
			result.datasets[1].highlightStroke=getLighterColor(result.datasets[1].fillColor);
			result.datasets[1].data=new Array();
			
			result.labels=new Array();
			
			var sales_array_count=sales_array_result.length;
			
			sales_array_result.forEach(function(data1)
			{
				var label=data1.item_name;
				get_inventory(label,'',function(value0)
				{
					console.log('report28-5');
					var value1=data1.quantity;
					if((value0<=value1 && result.labels.length<11))
					{
						result.labels.push(label);
						result.datasets[0].data.push(value0);
						result.datasets[1].data.push(value1);
					}
					sales_array_count-=1;
				});
			});

			var report_timer=setInterval(function()
			{
		  	   if(sales_array_count===0)
		  	   {
					console.log('report28-4');
		  	   
		  		   clearInterval(report_timer);
		  		   var mybarchart = new Chart(ctx).Bar(result,{});
		  		   document.getElementById("report28_legend").innerHTML=mybarchart.generateLegend();
		  		   
		  		   var print_button=form.elements[4];
		  		   print_graphical_report('report28','Short Inventory',print_button,mybarchart);		  		   
		  		   hide_loader();
		  	   }
		    },100);
		});
	},bills_data);
};

/**
 * @reportNo 29
 * @report Pre requisites by products
 */
function report29_ini()
{
	show_loader();
	var form=document.getElementById('report29_header');
	var name=form.elements[1].value;
	
	$('#report29_body').html("");
	var rowsHTML="";
	
	var product_data="<product_master>" +
			"<name>"+name+"</name>" +
			"</product_master>";

	get_single_column_data(function(products)
	{	
		var products_string="--";
		for(var k in products)
		{
			products_string+=products[k]+"--";
		}
		
		var requisites_data="<pre_requisites>" +
				"<name array='yes'>"+products_string+"</name>" +
				"<type exact='yes'>product</type>" +
				"<requisite_type></requisite_type>" +
				"<requisite_name></requisite_name>" +
				"<quantity></quantity>" +
				"</pre_requisites>";
		
		fetch_requested_data('report29',requisites_data,function(requisites)
		{
			for (var j=0; j<requisites.length;j++)
			{
				var product_string='';
				var service_string='';
				var task_string='';

				if(requisites[j].requisite_type=='product')
					product_string+="<u title='"+requisites[j].quantity+"'>"+requisites[j].requisite_name+"</u>, ";
				else if(requisites[j].requisite_type=='service')
					service_string+="<u title='"+requisites[j].quantity+"'>"+requisites[j].requisite_name+"</u>, ";
				else if(requisites[j].requisite_type=='task')
					task_string+="<u title='"+requisites[j].quantity+"'>"+requisites[j].requisite_name+"</u>, ";

				var item_name=requisites[j].name;
				for(var i=j+1; i<requisites.length;i++)
				{
					if(item_name==requisites[i].name)
					{
						if(requisites[i].requisite_type=='product')
							product_string+="<u title='"+requisites[i].quantity+"'>"+requisites[i].requisite_name+"</u>, ";
						else if(requisites[i].requisite_type=='service')
							service_string+="<u title='"+requisites[i].quantity+"'>"+requisites[i].requisite_name+"</u>, ";
						else if(requisites[i].requisite_type=='task')
							task_string+="<u title='"+requisites[i].quantity+"'>"+requisites[i].requisite_name+"</u>, ";
						
						requisites.splice(i,1);
						j-=1;
					}
				}
				product_string=product_string.substr(0,(product_string.length-2));
				service_string=service_string.substr(0,(service_string.length-2));
				task_string=task_string.substr(0,(task_string.length-2));
				
				rowsHTML+="<tr>";
					rowsHTML+="<td data-th='Product Name'>";
						rowsHTML+=item_name;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Required Sub products'>";
						rowsHTML+=product_string;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Required Services'>";
						rowsHTML+=service_string;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Required Tasks'>";
						rowsHTML+=task_string;
					rowsHTML+="</td>";
				rowsHTML+="</tr>";
			}
			$('#report29_body').html(rowsHTML);
			
			var print_button=form.elements[3];
			print_tabular_report('report29','Pre-requisites for products',print_button);
			
			hide_loader();
		});	
	},product_data);
};


/**
 * @reportNo 30
 * @report Tasks performed by staff
 */
function report30_ini()
{
	show_loader();
	var form=document.getElementById('report30_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	
	var canvas_parent=$("#report30_canvas").parent();
	$("#report30_canvas").remove();
	$(canvas_parent).append("<canvas id='report30_canvas' class='pie_report'></canvas>");
	
	var ctx = document.getElementById("report30_canvas").getContext("2d");
	var task_data="<task_instances>" +
			"<assignee></assignee>" +
			"<status exact='yes'>completed</status>" +
			"<last_updated lowerbound='yes'>"+get_raw_time(start_date)+"</last_updated>" +
			"<last_updated upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</last_updated>" +
			"</task_instances>";

	fetch_requested_data('report30',task_data,function(tasks)
	{
		var result=transform_to_pie_count(tasks,'assignee');
		var mydoughchart = new Chart(ctx).Doughnut(result,{});
		document.getElementById("report30_legend").innerHTML=mydoughchart.generateLegend();
		
		var print_button=form.elements[4];
		print_graphical_report('report30','Tasks performed by Staff',print_button,mydoughchart);
		
		hide_loader();
	});
};


/**
 * @report Customer Maps by credit
 * @reportNo 31
 */
function report31_ini()
{	
	if(is_online())
	{
		show_loader();
		//console.log('running report 31');
		var form=document.getElementById('report31_header');
		var min_amount=parseFloat($("#report31_slider").slider("values",0));
		var max_amount=parseFloat($("#report31_slider").slider("values",1));
		
		/// master coordinate placement////
		var lat=get_session_var('lat');
		var lng=get_session_var('lng');
		var title=get_session_var('title');
		
		if(typeof map31 != 'undefined')
			map31.remove();
	
		map31 = L.map('report31_map',{
			center: [lat,lng], 
			zoom: 10
		});
		
		L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',{
	        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	        subdomains:'1234'
		}).addTo(map31);
		
		var mlatlng=L.latLng(lat,lng);
		var mmarker=L.marker(mlatlng).addTo(map31).bindPopup(title);
		///////////////////////////////////		
		
		var customers_data="<customers>" +
				"<id></id>" +
				"<name></name>" +
				"<lat></lat>" +
				"<lng></lng>" +
				"<acc_name></acc_name>" +
				"<address></address>" +
				"<pincode></pincode>" +
				"<city></city>" +
				"<state></state>" +
				"<country></country>" +
				"<address_status exact='yes'>confirmed</address_status>" +
				"</customers>";
		
		fetch_requested_data('report31',customers_data,function(accounts)
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
			fetch_requested_data('report31',payments_data,function(payments)
			{
				accounts.forEach(function(result)
				{	
					var balance_amount=0;
					
					payments.forEach(function(payment)
					{
						if(payment.acc_name==result.acc_name)
						{
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
					
					if(balance_amount>=min_amount && balance_amount<=max_amount)
					{
						var latlng=L.latLng(result.lat,result.lng);
						var marker=L.marker(latlng).addTo(map31).bindPopup(result.acc_name+"\nBalance: "+balance_amount);	
					}
				});
				
				hide_loader();
			});
		});
	}
	else
	{
		$("#modal6").dialog("open");
	}
}

/**
 * @report Staff Maps
 * @reportNo 32
 */
function report32_ini()
{	
	if(is_online())
	{
		show_loader();
		var form=document.getElementById('report32_header');
		
		/// master coordinate placement////
		var lat=get_session_var('lat');
		var lng=get_session_var('lng');
		var title=get_session_var('title');
		
		if(typeof map32 != 'undefined')
			map32.remove();
	
		map32 = L.map('report32_map',{
			center: [lat,lng], 
			zoom: 10
		});
		
		L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',{
	        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	        subdomains:'1234'
		}).addTo(map32);
		
		var mlatlng=L.latLng(lat,lng);
		var mmarker=L.marker(mlatlng).addTo(map32).bindPopup(title);
		///////////////////////////////////		
		
		var address_data="<staff>" +
				"<id></id>" +
				"<name></name>" +
				"<lat></lat>" +
				"<lng></lng>" +
				"<acc_name></acc_name>" +
				"<address></address>" +
				"<pincode></pincode>" +
				"<city></city>" +
				"<state></state>" +
				"<country></country>" +
				"<status exact='yes'>active</status>" +
				"<address_status exact='yes'>confirmed</address_status>" +
				"</staff>";
		fetch_requested_data('report32',address_data,function(addresses)
		{
			for(var i in addresses)
			{
				var latlng=L.latLng(addresses[i].lat,addresses[i].lng);
				var marker=L.marker(latlng).addTo(map32).bindPopup(addresses[i].acc_name);	
			}
			hide_loader();
		});
	}
	else
	{
		$("#modal6").dialog("open");
	}
}


/**
 * @report Supplier Maps by debit
 * @reportNo 33
 */
function report33_ini()
{	
	if(is_online())
	{
		show_loader();
		//console.log('running report 31');
		var form=document.getElementById('report33_header');
		var min_amount=parseFloat($("#report33_slider").slider("values",0));
		var max_amount=parseFloat($("#report33_slider").slider("values",1));
		
		/// master coordinate placement////
		var lat=get_session_var('lat');
		var lng=get_session_var('lng');
		var title=get_session_var('title');
		
		if(typeof map33 != 'undefined')
			map33.remove();
	
		map33 = L.map('report33_map',{
			center: [lat,lng], 
			zoom: 10
		});
		
		L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',{
	        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	        subdomains:'1234'
		}).addTo(map33);
		
		var mlatlng=L.latLng(lat,lng);
		var mmarker=L.marker(mlatlng).addTo(map33).bindPopup(title);
		///////////////////////////////////		
		
		var suppliers_data="<suppliers>" +
				"<id></id>" +
				"<name></name>" +
				"<lat></lat>" +
				"<lng></lng>" +
				"<acc_name></acc_name>" +
				"<address></address>" +
				"<pincode></pincode>" +
				"<city></city>" +
				"<state></state>" +
				"<country></country>" +
				"<address_status exact='yes'>confirmed</address_status>" +
				"</suppliers>";
		
		fetch_requested_data('report33',suppliers_data,function(accounts)
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
			fetch_requested_data('report33',payments_data,function(payments)
			{
				accounts.forEach(function(result)
				{	
					var balance_amount=0;
					
					payments.forEach(function(payment)
					{
						if(payment.acc_name==result.acc_name)
						{
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
					
					if(balance_amount>=min_amount && balance_amount<=max_amount)
					{
						var latlng=L.latLng(result.lat,result.lng);
						var marker=L.marker(latlng).addTo(map33).bindPopup(result.acc_name+"\nBalance: "+balance_amount);	
					}
				});
				hide_loader();
			});
		});
	}
	else
	{
		$("#modal6").dialog("open");
	}
}

/**
 * @reportNo 34
 * @report Effective Margin
 */
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


/**
 * @report Customer Maps by products consumed
 * @reportNo 35
 */
function report35_ini()
{	
	if(is_online())
	{
		show_loader();
		var form=document.getElementById('report35_header');
		var product_name=form.elements[1].value;
		
	
		/// master coordinate placement////
		var lat=get_session_var('lat');
		var lng=get_session_var('lng');
		var title=get_session_var('title');
		
		if(typeof map35 != 'undefined')
			map35.remove();
	
		map35 = L.map('report35_map',{
			center: [lat,lng], 
			zoom: 10
		});
		
		L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',{
	        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	        subdomains:'1234'
		}).addTo(map35);
		
		var mlatlng=L.latLng(lat,lng);
		var mmarker=L.marker(mlatlng).addTo(map35).bindPopup(title);
		///////////////////////////////////		
	
		var product_data="<bill_items>" +
				"<bill_id></bill_id>" +
				"<item_name exact='yes'>"+product_name+"</item_name>" +
				"</bill_items>";
		
		get_single_column_data(function(bill_ids)
		{
			var bill_id_array="--";
			for(var y in bill_ids)
			{
				bill_id_array+=bill_ids[y]+"--";
			}
			
			//optimise this query
			var customer_data="<bills>" +
					"<customer_name></customer_name>" +
					"<id array='yes'>"+bill_id_array+"</id>" +
					"</bills>";
			
			get_single_column_data(function(customers)
			{
				var customers_array="--";
				for(var x in customers)
				{
					customers_array+=customers[x]+"--";
				}	
				
				var customers_data="<customers>" +
						"<id></id>" +
						"<name></name>" +
						"<lat></lat>" +
						"<lng></lng>" +
						"<acc_name array='yes'>"+customers_array+"</acc_name>" +
						"<address></address>" +
						"<pincode></pincode>" +
						"<city></city>" +
						"<state></state>" +
						"<country></country>" +
						"<address_status exact='yes'>confirmed</address_status>" +
						"</customers>";
				
				fetch_requested_data('report35',customers_data,function(addresses)
				{
					for(var i in addresses)
					{
						var latlng=L.latLng(addresses[i].lat,addresses[i].lng);
						var marker=L.marker(latlng).addTo(map35).bindPopup(addresses[i].acc_name);	
					}
					hide_loader();
				});
			},customer_data);
		},product_data);
	}
	else
	{
		$("#modal6").dialog("open");
	}
}


/**
 * @report Supplier Maps by products supplied
 * @reportNo 36
 */
function report36_ini()
{	
	if(is_online())
	{
		show_loader();
		var form=document.getElementById('report36_header');
		var product_name=form.elements[1].value;
		
		/// master coordinate placement////
		var lat=get_session_var('lat');
		var lng=get_session_var('lng');
		var title=get_session_var('title');
		
		if(typeof map36 != 'undefined')
			map36.remove();
	
		map36 = L.map('report36_map',{
			center: [lat,lng], 
			zoom: 10
		});
		
		L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',{
	        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	        subdomains:'1234'
		}).addTo(map36);
		
		var mlatlng=L.latLng(lat,lng);
		var mmarker=L.marker(mlatlng).addTo(map36).bindPopup(title);
		///////////////////////////////////		
			
		var product_data="<supplier_bill_items>" +
				"<bill_id></bill_id>" +
				"<product_name exact='yes'>"+product_name+"</product_name>" +
				"</supplier_bill_items>";
		
		get_single_column_data(function(bill_ids)
		{
			var bill_id_array="--";
			for(var y in bill_ids)
			{
				bill_id_array+=bill_ids[y]+"--";
			}
			
			//optimise this query
			var supplier_data="<supplier_bills>" +
					"<supplier></supplier>" +
					"<bill_id array='yes'>"+bill_id_array+"</bill_id>" +
					"</supplier_bills>";
			
			get_single_column_data(function(suppliers)
			{
				var suppliers_array="--";
				for(var x in suppliers)
				{
					suppliers_array+=suppliers[x]+"--";
				}	
				var suppliers_data="<suppliers>" +
						"<id></id>" +
						"<name></name>" +
						"<lat></lat>" +
						"<lng></lng>" +
						"<acc_name array='yes'>"+suppliers_array+"</acc_name>" +
						"<address></address>" +
						"<pincode></pincode>" +
						"<city></city>" +
						"<state></state>" +
						"<country></country>" +
						"<address_status exact='yes'>confirmed</address_status>" +
						"</suppliers>";
	
				fetch_requested_data('report36',suppliers_data,function(addresses)
				{
					for(var i in addresses)
					{
						var latlng=L.latLng(addresses[i].lat,addresses[i].lng);
						var marker=L.marker(latlng).addTo(map36).bindPopup(addresses[i].acc_name);	
					}
					hide_loader();
				});
			},supplier_data);
		},product_data);
	}
	else
	{
		$("#modal6").dialog("open");
	}
}

/**
 * @reportNo 37
 * @report Payments Due to suppliers 
 */
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

/**
 * @reportNo 38
 * @report Sales by products
 */
function report38_ini()
{
	show_loader();
	var form=document.getElementById('report38_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	var product=form.elements[3].value;
	
	var canvas_parent=$("#report38_canvas").parent();
	$("#report38_canvas").remove();
	$(canvas_parent).append("<canvas id='report38_canvas' class='report_sizing'></canvas>");
	
	var ctx = document.getElementById("report38_canvas").getContext("2d");
	var bills_data="<bills>" +
			"<id></id>" +
			"<bill_date lowerbound='yes'>"+get_raw_time(start_date)+"</bill_date>" +
			"<bill_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</bill_date>" +
			"</bills>";

	get_single_column_data(function(bill_ids)
	{
		var products_data="<product_master>" +
				"<name>"+product+"</name>" +
				"</product_master>";

		get_single_column_data(function(products)
		{
			var products_array="--";
			for(var i in products)
			{
				products_array+=products[i]+"--";
			}
			
			var bill_id_array="--";
			for(var y in bill_ids)
			{
				bill_id_array+=bill_ids[y]+"--";
			}
			
			var products_data="<bill_items>" +
					"<bill_id array='yes'>"+bill_id_array+"</bill_id>" +
					"<amount></amount>" +
					"<item_name array='yes'>"+products_array+"</item_name>" +
					"<last_updated lowerbound='yes'>"+get_raw_time(start_date)+"</last_updated>" +
					"<last_updated upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</last_updated>" +
					"</bill_items>";
			fetch_requested_data('report38',products_data,function(product_array)
			{
				var result=transform_to_bar_sum(product_array,'Total Amount','amount','item_name');
				var mybarchart = new Chart(ctx).Bar(result,{});
				document.getElementById("report38_legend").innerHTML=mybarchart.generateLegend();
				
				var print_button=form.elements[5];
				print_graphical_report('report38','Sales by Products',print_button,mybarchart);
				
				hide_loader();
			});
		},products_data);
	},bills_data);
};

/**
 * @reportNo 39
 * @report Sales by services
 */
function report39_ini()
{
	show_loader();
	var form=document.getElementById('report39_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	var service=form.elements[3].value;
	
	var canvas_parent=$("#report39_canvas").parent();
	$("#report39_canvas").remove();
	$(canvas_parent).append("<canvas id='report39_canvas' class='report_sizing'></canvas>");
	
	var ctx = document.getElementById("report39_canvas").getContext("2d");
	
	var bills_data="<bills>" +
			"<id></id>" +
			"<bill_date lowerbound='yes'>"+get_raw_time(start_date)+"</bill_date>" +
			"<bill_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</bill_date>" +
			"</bills>";
	get_single_column_data(function(bill_ids)
	{
		var services_data="<services>" +
				"<name>"+service+"</name>" +
				"</services>";
		get_single_column_data(function(services)
		{
			var services_array="--";
			for(var i in bill_ids)
			{
				services_array+=services[i]+"--";
			}
			
			var bill_id_array="--";
			for(var j in bill_ids)
			{
				bill_id_array+=bill_ids[j]+"--";
			}
			var services_data="<bill_items>" +
					"<bill_id array='yes'>"+bill_id_array+"</bill_id>" +
					"<amount></amount>" +
					"<item_name array='yes'>"+services_array+"</item_name>" +
					"<last_updated lowerbound='yes'>"+get_raw_time(start_date)+"</last_updated>" +
					"<last_updated upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</last_updated>" +
					"</bill_items>";
			fetch_requested_data('report39',services_data,function(service_array)
			{
				service_array.sort(function(a,b)
				{
					if(parseFloat(a.amount)<parseFloat(b.amount))
					{	return 1;}
					else 
					{	return -1;}
				});
						
				var result=transform_to_bar_sum(service_array,'Total Amount','amount','item_name');
				var mybarchart = new Chart(ctx).Bar(result,{});
				document.getElementById("report39_legend").innerHTML=mybarchart.generateLegend();
				
				var print_button=form.elements[5];
				print_graphical_report('report39','Sales by Services',print_button,mybarchart);
								
				hide_loader();
			});
		},services_data);
	},bills_data);
};

/**
 * @reportNo 40
 * @report Surplus Inventory
 */
function report40_ini()
{
	show_loader();
	var form=document.getElementById('report40_header');
	var num_days=parseInt(form.elements[1].value);
	var product=form.elements[2].value;
	var raw_time=get_my_time()-(num_days*86400000);
	
	var canvas_parent=$("#report40_canvas").parent();
	$("#report40_canvas").remove();
	$(canvas_parent).append("<canvas id='report40_canvas' class='report_sizing'></canvas>");
	var ctx = document.getElementById("report40_canvas").getContext("2d");
	
	var bills_data="<bills>" +
			"<id></id>" +
			"<bill_date lowerbound='yes'>"+raw_time+"</bill_date>" +
			"<type array='yes'>--product--both--</type>" +
			"</bills>";
	get_single_column_data(function(bill_ids)
	{
		var bill_id_array="--";
		for(var i in bill_ids)
		{
			bill_id_array+=bill_ids[i]+"--";
		}
		var sales_data="<bill_items>" +
				"<bill_id array='yes'>"+bill_id_array+"</bill_id>" +
				"<quantity></quantity>" +
				"<item_name>"+product+"</item_name>" +
				"<last_updated lowerbound='yes'>"+raw_time+"</last_updated>" +
				"</bill_items>";
		fetch_requested_data('report40',sales_data,function(sales_array)
		{
			var sales_array_result=new Array();
			for(var k=0; k<sales_array.length;k++)
			{
				var new_obj=new Object();
				new_obj.item_name=sales_array[k].item_name;
				new_obj.quantity=parseFloat(sales_array[k].quantity);
				for(var j=k+1;j<sales_array.length;j++)
				{
					if(sales_array[j].item_name==new_obj.item_name)
					{
						new_obj.quantity+=parseFloat(sales_array[j].quantity);
						sales_array.splice(j,1);
						j-=1;
					}
				}
				sales_array_result.push(new_obj);
			}
			
			///modify sales_array_result as per search criteria
			
			sales_array_result.sort(function(a,b)
			{
				if(a.quantity<b.quantity)
				{	return 1;}
				else 
				{	return -1;}
			});
			
			var result=new Object();
			result.datasets=new Array();
			result.datasets[0]=new Object();
			result.datasets[0].label="Current Inventory";
			result.datasets[0].fillColor=getRandomColor();
			result.datasets[0].strokeColor=result.datasets[0].fillColor;
			result.datasets[0].highlightFill=getLighterColor(result.datasets[0].fillColor);
			result.datasets[0].highlightStroke=getLighterColor(result.datasets[0].fillColor);
			result.datasets[0].data=new Array();
			result.datasets[1]=new Object();
			result.datasets[1].label='Sold Quantity';
			result.datasets[1].fillColor=getRandomColor();
			result.datasets[1].strokeColor=result.datasets[1].fillColor;
			result.datasets[1].highlightFill=getLighterColor(result.datasets[1].fillColor);
			result.datasets[1].highlightStroke=getLighterColor(result.datasets[1].fillColor);
			result.datasets[1].data=new Array();
			
			result.labels=new Array();
			
			var sales_array_count=sales_array_result.length;
			
			sales_array_result.forEach(function(data1)
			{
				var label=data1.item_name;
				get_inventory(label,'',function(value0)
				{
					var value1=data1.quantity;
					if((value0>=value1 && result.labels.length<11))
					{
						result.labels.push(label);
						result.datasets[0].data.push(value0);
						result.datasets[1].data.push(value1);
					}
					sales_array_count-=1;
				});
			});

			var report_timer=setInterval(function()
			{
		  	   if(sales_array_count===0)
		  	   {
		  		   clearInterval(report_timer);
		  		   var mybarchart = new Chart(ctx).Bar(result,{});
		  		   document.getElementById("report40_legend").innerHTML=mybarchart.generateLegend();
		  		   
		  		   var print_button=form.elements[4];
		  		   print_graphical_report('report40','Surplus Inventory',print_button,mybarchart);
					
		  		   hide_loader();
		  	   }
		    },100);
		});
	},bills_data);
};

/**
 * @reportNo 41
 * @report Pre requisites by services
 */
function report41_ini()
{
	show_loader();
	var form=document.getElementById('report41_header');
	var name=form.elements[1].value;
	
	$('#report41_body').html("");
	var rowsHTML="";
	
	var service_data="<services>" +
			"<name>"+name+"</name>" +
			"</services>";
	get_single_column_data(function(services)
	{	
		var services_string="--";
		for(var k in services)
		{
			services_string+=services[k]+"--";
		}
		
		var requisites_data="<pre_requisites>" +
				"<name array='yes'>"+services_string+"</name>" +
				"<type exact='yes'>service</type>" +
				"<requisite_type></requisite_type>" +
				"<requisite_name></requisite_name>" +
				"<quantity></quantity>" +
				"</pre_requisites>";
		
		fetch_requested_data('report41',requisites_data,function(requisites)
		{
			for (var j=0; j<requisites.length;j++)
			{
				var product_string='';
				var service_string='';
				var task_string='';

				if(requisites[j].requisite_type=='product')
					product_string+="<u title='"+requisites[j].quantity+"'>"+requisites[j].requisite_name+"</u>, ";
				else if(requisites[j].requisite_type=='service')
					service_string+="<u title='"+requisites[j].quantity+"'>"+requisites[j].requisite_name+"</u>, ";
				else if(requisites[j].requisite_type=='task')
					task_string+="<u title='"+requisites[j].quantity+"'>"+requisites[j].requisite_name+"</u>, ";

				var item_name=requisites[j].name;
				for(var i=j+1; i<requisites.length;i++)
				{
					if(item_name==requisites[i].name)
					{
						if(requisites[i].requisite_type=='product')
							product_string+="<u title='"+requisites[i].quantity+"'>"+requisites[i].requisite_name+"</u>, ";
						else if(requisites[i].requisite_type=='service')
							service_string+="<u title='"+requisites[i].quantity+"'>"+requisites[i].requisite_name+"</u>, ";
						else if(requisites[i].requisite_type=='task')
							task_string+="<u title='"+requisites[i].quantity+"'>"+requisites[i].requisite_name+"</u>, ";
						
						requisites.splice(i,1);
						j-=1;
					}
				}
				product_string=product_string.substr(0,(product_string.length-2));
				service_string=service_string.substr(0,(service_string.length-2));
				task_string=task_string.substr(0,(task_string.length-2));
				
				rowsHTML+="<tr>";
					rowsHTML+="<td data-th='Service Name'>";
						rowsHTML+=item_name;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Required Sub products'>";
						rowsHTML+=product_string;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Required Services'>";
						rowsHTML+=service_string;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Required Tasks'>";
						rowsHTML+=task_string;
					rowsHTML+="</td>";
				rowsHTML+="</tr>";
			}
			$('#report41_body').html(rowsHTML);
			
			var print_button=form.elements[3];
			print_tabular_report('report41','Pre-requisites for Services',print_button);
			
			hide_loader();
		});	

	},service_data);
};

/**
 * @reportNo 42
 * @report Feedback
 */
function report42_ini()
{
	show_loader();
	
	var form=document.getElementById('report42_header');
	var type=form.elements[1].value;
	var start_date=form.elements[2].value;
	var end_date=form.elements[3].value;
	
	$('#report42_body').html("");
	var rowsHTML="";
	
	var feedback_data="<feedback>" +
			"<provider></provider>" +
			"<type>"+type+"</type>" +
			"<detail></detail>" +
			"<rating></rating>" +
			"<date lowerbound='yes'>"+get_raw_time(start_date)+"</date>" +
			"<date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</date>" +
			"</feedback>";

	fetch_requested_data('report42',feedback_data,function(feedbacks)
	{
		feedbacks.forEach(function(feedback)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<td data-th='Feedback Provider'>";
					rowsHTML+=feedback.provider;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Type'>";
					rowsHTML+=feedback.type;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Rating'>";
					rowsHTML+=feedback.rating;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Detail'>";
					rowsHTML+=feedback.detail;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Date'>";
					rowsHTML+=get_my_past_date(feedback.date);
				rowsHTML+="</td>";
			rowsHTML+="</tr>";
		});
		$('#report42_body').html(rowsHTML);
		
		var print_button=form.elements[5];
		print_tabular_report('report42','Feedback',print_button);
		
		hide_loader();
	});	
};

/**
 * @reportNo 43
 * @report Changeing customer purchasing
 */
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


/**
 * @report Compare products (ecommerce sites)
 * @reportNo 44
 */
function report44_ini()
{
	var form=document.getElementById('report44_header');
	var product_name=form.elements[1].value;
	
	show_loader();
	$('#report44_body').html("");
	
	ajax_with_custom_func("./ajax/ecommerce_products.php","keywords="+product_name+"&max_results=10",function(e)
	{
		var row=e.responseXML.childNodes[0].childNodes;
		for(var i=0; i<row.length; i++)
		{
			if(row[i].nodeName!="" && row[i].nodeName!="#text")
			{
				var data=row[i].childNodes;
				var rowsHTML="<tr>";
						rowsHTML+="<td data-th='Product Name'>";
							rowsHTML+=data[0].innerHTML;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Description'>";
							rowsHTML+=data[1].innerHTML.substr(0,200);
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Picture'>";
							rowsHTML+="<img src='"+data[2].innerHTML+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="Rs. "+data[3].innerHTML;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Link'>";
							rowsHTML+="<a href='"+data[4].innerHTML+"' target='_blank'>Go to <b>"+data[5].innerHTML+"</b></a>";
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
				
				$('#report44_body').prepend(rowsHTML);			
			}
		}
		
		var print_button=form.elements[3];
		print_tabular_report('report44','Compare Product Prices',print_button);
				
		hide_loader();
	});
};

/**
 * @report Virtual Store
 * @reportNo 45
 */
function report45_ini()
{
	show_loader();
	
	var filter_fields=document.getElementById('report45_header');
	
	var fname=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;
	
	///optimize this query
	var utilization="<area_utilization>" +
			"<id></id>" +
			"<item_name>"+fname+"</item_name>" +
			"<name></name>" +
			"<batch>"+fbatch+"</batch>" +
			"</area_utilization>";

	fetch_requested_data('report45',utilization,function(results)
	{
		var canvas = document.getElementById('report45_canvas');
		var ctx = canvas.getContext('2d');

		var storage_area_string="--";
		for(var i in results)
		{
			storage_area_string+=results[i].name+"--";
		}
		
		var storages_data="<store_areas>" +
			"<name array='yes'>"+storage_area_string+"</name>" +
			"<area_type exact='yes'>storage</area_type>" +
			"<height></height>" +
			"<width></width>" +
			"<length></length>" +
			"<locx></locx>" +
			"<locy></locy>" +
			"<locz></locz>" +
			"<storey></storey>" +
			"</store_areas>";
		
		fetch_requested_data('report45',storages_data,function(area_results)
		{
			for(var j in area_results)
			{
				draw_star(ctx,area_results[j].locx,area_results[j].locy,5,"#00ff00");
			}
		});
		
		hide_loader();
	});
}

/**
 * @reportNo 46
 * @report Suppliers account balance
 */
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
						bill_ids_string+="<u title='Amount Rs:"+payment.total_amount+"'>"+payment.bill_id+"</u>"+", ";
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

/**
 * @reportNo 47
 * @report Inventory Value
 */
function report47_ini()
{
	show_loader();
	var form=document.getElementById('report47_header');
	var product_name=form.elements[1].value;
	var select_all=form.elements[2];
	
	var canvas_parent=$("#report47_canvas").parent();
	$("#report47_canvas").remove();
	$(canvas_parent).append("<canvas id='report47_canvas' class='report_sizing'></canvas>");
	var ctx = document.getElementById("report47_canvas").getContext("2d");
	
	var products_data="<product_instances>" +
			"<product_name>"+product_name+"</product_name>" +
			"<batch></batch>" +
			"<cost_price></cost_price>" +
			"<sale_price></sale_price>" +
			"</product_instances>";
	fetch_requested_data('report47',products_data,function(products)
	{
		/////setting inventory value//////
		var products_inventory_count=products.length;
		var inventory_cost_price=0;
		var inventory_sale_price=0;
		products.forEach(function(product)
		{
			get_inventory(product.product_name,product.batch,function(quantity)
			{
				product.cost=parseFloat(quantity)*parseFloat(product.cost_price);
				product.sale=parseFloat(quantity)*parseFloat(product.sale_price);
				inventory_cost_price+=product.cost;
				inventory_sale_price+=product.sale;
				products_inventory_count-=1;
			});
		});
				
		/////////chart preparation/////////
		var result=new Object();
		result.datasets=new Array();
		result.datasets[0]=new Object();
		result.datasets[0].label="Sale Value";
		result.datasets[0].fillColor=getRandomColor();
		result.datasets[0].strokeColor=result.datasets[0].fillColor;
		result.datasets[0].highlightFill=getLighterColor(result.datasets[0].fillColor);
		result.datasets[0].highlightStroke=getLighterColor(result.datasets[0].fillColor);
		result.datasets[0].data=new Array();
		result.datasets[1]=new Object();
		result.datasets[1].label='Purchase Value';
		result.datasets[1].fillColor=getRandomColor();
		result.datasets[1].strokeColor=result.datasets[1].fillColor;
		result.datasets[1].highlightFill=getLighterColor(result.datasets[1].fillColor);
		result.datasets[1].highlightStroke=getLighterColor(result.datasets[1].fillColor);
		result.datasets[1].data=new Array();
		
		result.labels=new Array();
		
		//////final settings////////////
		var report_timer=setInterval(function()
		{
	  	   if(products_inventory_count===0)
	  	   {
	  		   clearInterval(report_timer);
	  		   if(select_all.checked)
	  		   {
		  		   result.labels.push('Total Inventory');
		  		   result.datasets[0].data.push(Math.round(inventory_sale_price));
		  		   result.datasets[1].data.push(Math.round(inventory_cost_price));
	  		   }
	  		   else
	  		   {
	  			   for(var i=0;i<products.length;i++)
	  			   {
	  				   for(var j=i+1; j<products.length;j++)
	  				   {
	  					   if(products[i].product_name==products[j].product_name)
	  					   {
	  						 products[i].cost+=products[j].cost;
	  						 products[i].sale+=products[j].sale;
	  						 products.splice(j,1);
		  					 j-=1;
	  					   }
	  				   }
	  				   if(result.labels.length<11)
	  				   {
		  				   result.labels.push(products[i].product_name);
				  		   result.datasets[0].data.push(Math.round(products[i].sale));
				  		   result.datasets[1].data.push(Math.round(products[i].cost));
	  				   }
	  				   else
	  				   {
	  					   break;
	  				   }
	  			   }
	  		   }
	  		   var mybarchart=new Chart(ctx).Bar(result,{});
	  		   document.getElementById("report47_legend").innerHTML=mybarchart.generateLegend();

	  		   var print_button=form.elements[4];
	  		   print_graphical_report('report47','Inventory Value',print_button,mybarchart);
				
	  		   hide_loader();
	  	   }
	    },100);
	});
};


/**
 * @reportNo 48
 * @report Resource Analysis
 */
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


/**
 * @reportNo 50
 * @report Margin by products
 */
function report50_ini()
{
	show_loader();
	var form=document.getElementById('report50_header');
	var make=form.elements[1].value;
	var product=form.elements[2].value;
	var margin_start=parseFloat($("#report50_slider").slider("values",0));
	var margin_end=parseFloat($("#report50_slider").slider("values",1));
	
	$('#report50_body').html('');

	var product_data="<product_master>" +
		"<name>"+product+"</name>" +
		"<make>"+make+"</make>" +
		"</product_master>";
	
	get_single_column_data(function(products)
	{
		var product_string="--";
		for(var i in products)
		{
			product_string+=products[i]+"--";
		}
		
		var margin_data="<product_instances>" +
				"<id></id>" +
				"<product_name array='yes'>"+product_string+"</product_name>" +
				"<batch></batch>" +
				"<sale_price></sale_price>" +
				"<cost_price></cost_price>" +
				"</product_instances>";
		
		fetch_requested_data('report50',margin_data,function(product_instances)
		{
			var margins=[];
			for(var j=0;j<product_instances.length;j++)
			{	
				var margin=new Object();
				margin.product=product_instances[j].product_name;
				margin.highest=((parseFloat(product_instances[j].sale_price)/parseFloat(product_instances[j].cost_price))-1)*100;
				margin.lowest=margin.highest;
				
				for(var k=j+1;k<product_instances.length;k++)
				{
					if(product_instances[j].product_name==product_instances[k].product_name)
					{
						var new_margin=((parseFloat(product_instances[k].sale_price)/parseFloat(product_instances[k].cost_price))-1)*100;
						if(new_margin>margin.highest)
						{
							margin.highest=new_margin;
						}
						else if(new_margin<margin.lowest)
						{
							margin.lowest=new_margin;
						}
						product_instances.splice(k,1);
						k-=1;
					}
				}
				
				if(margin.lowest>margin_start && margin.highest<margin_end)
				{
					margin.highest=Math.round(margin.highest*100)/100;
					margin.lowest=Math.round(margin.lowest*100)/100;
					
					margins.push(margin);
				}
			}
			
			margins.forEach(function(margin)
			{
				var rowsHTML="<tr>";
					rowsHTML+="<td data-th='Product'>";
						rowsHTML+=margin.product;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Highest Margin'>";
						rowsHTML+=margin.highest;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Lowest Margin'>";
						rowsHTML+=margin.lowest;
					rowsHTML+="</td>";
				rowsHTML+="</tr>";
				
				$('#report50_body').append(rowsHTML);
			});
			
			var print_button=form.elements[5];
			print_tabular_report('report50','Margin by Products',print_button);
			hide_loader();
		});
	},product_data);
};


/**
 * @reportNo 51
 * @report Dead items
 */
function report51_ini()
{
	show_loader();
	var form=document.getElementById('report51_header');
	var product_name=form.elements[1].value;
	var date_since=get_raw_time(form.elements[2].value);
	
	$('#report51_body').html('');

	var product_data="<product_master>" +
			"<name>"+product_name+"</name>" +
			"</product_master>";
	
	get_single_column_data(function(products)
	{
		var product_string="--";
		for(var i in products)
		{
			product_string+=products[i]+"--";
		}
		
		var bill_data="<bill_items>" +
				"<item_name array='yes'>"+product_string+"</item_name>" +
				"<last_updated lowerbound='yes'>"+date_since+"</last_updated>" +
				"</bill_items>";
		
		get_single_column_data(function(bill_items)
		{			
			var report_count=products.length;
			
			products.forEach(function(product)
			{
				var sold=false;
				for(var i in bill_items)
				{
					if(bill_items[i]==product)
					{
						sold=true;
						break;
					}
				}
				if(!sold)
				{
					get_inventory(product,'',function(quantity)
					{
						var rowsHTML="<tr>";
							rowsHTML+="<td data-th='Product'>";
								rowsHTML+=product;
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Inventory'>";
								rowsHTML+=quantity;
							rowsHTML+="</td>";
						rowsHTML+="</tr>";
						
						$('#report51_body').append(rowsHTML);
						report_count-=1;
					});
				}
				else
				{
					report_count-=1;
				}
			});

			var report_complete=setInterval(function()
			{
			   if(report_count===0)
			   {
				   clearInterval(report_complete);
				   hide_loader();
			   }
			},1000);
		},bill_data);
	},product_data);
	
	var print_button=form.elements[4];
	print_tabular_report('report51','Dead Items',print_button);

};

/**
 * @reportNo 52
 * @report Product purchase report
 */
function report52_ini()
{
	var form=document.getElementById('report52_header');
	var name=form.elements[1].value;
	var make=form.elements[2].value;
	var supplier=form.elements[3].value;
	var date=form.elements[4].value;
	
	show_loader();
	$('#report52_body').html('');
	var rowsHTML="";
	
	var bills_data="<supplier_bills>" +
			"<id></id>" +
			"<supplier>"+supplier+"</supplier>" +
			"<entry_date lowerbound='yes'>"+get_raw_time(date)+"</entry_date>" +
			"</supplier_bills>";
	var returns_data="<supplier_returns>"+
					"<id></id>"+
					"<return_date lowerbound='yes'>"+get_raw_time(date)+"</return_date>" +
					"</supplier_returns>";
	fetch_requested_data('report52',bills_data,function(bills)
	{
		fetch_requested_data('report52',returns_data,function(returns)
		{
			var bills_string="--";
			for(var i in bills)
			{
				bills_string+=bills[i].id+"--";
			}
			var returns_string="--";
			for(var j in returns)
			{
				returns_string+=returns[j].id+"--";
			}
			
			var bill_items_data="<supplier_bill_items>" +
					"<bill_id array='yes'>"+bills_string+"</bill_id>" +
					"<product_name>"+name+"</product_name>" +
					"<quantity></quantity>" +
					"<amount></amount>" +
					"<last_updated lowerbound='yes'>"+get_raw_time(date)+"</last_updated>" +
					"</supplier_bill_items>";
			var return_items_data="<supplier_return_items>" +
					"<return_id array='yes'>"+returns_string+"</return_id>" +
					"<item_name>"+name+"</item_name>" +
					"<quantity></quantity>" +
					"<refund_amount></refund_amount>" +
					"<last_updated lowerbound='yes'>"+get_raw_time(date)+"</last_updated>" +
					"</supplier_return_items>";
			
			fetch_requested_data('report52',bill_items_data,function(bill_ids)
			{
				fetch_requested_data('report52',return_items_data,function(return_ids)
				{
					var product_string="--";
					for(var j in bill_ids)
					{
						product_string+=bill_ids[j].product_name+"--";
					}
					for(var k in return_ids)
					{
						product_string+=return_ids[j].item_name+"--";
					}
					
					var make_data="<product_master>" +
							"<name array='yes'>"+product_string+"</name>" +
							"<make>"+make+"</make>" +
							"</product_master>";
		
					fetch_requested_data('report52',make_data,function(makes)
					{
						var total_amount=0;
						for(var k in bill_ids)
						{
							for(var z in makes)
							{
								if(bill_ids[k].product_name==makes[z].name)
								{
									var supplier_name="";
									for(var m in bills)
									{
										if(bills[m].id==bill_ids[k].bill_id)
										{
											supplier_name=bills[m].supplier;
											break;
										}
									}
									
									total_amount+=parseFloat(bill_ids[k].amount);
										
									rowsHTML+="<tr>";
										rowsHTML+="<td data-th='Product Name'>";
											rowsHTML+=bill_ids[k].product_name;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Make'>";
											rowsHTML+=makes[z].make;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Supplier'>";
											rowsHTML+=supplier_name;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Quantity'>";
											rowsHTML+=bill_ids[k].quantity;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Amount'>";
											rowsHTML+="Rs. "+bill_ids[k].amount;
										rowsHTML+="</td>";
									rowsHTML+="</tr>";
									break;
								}
							}
						}
						for(var k in return_ids)
						{
							for(var z in makes)
							{
								if(return_ids[k].item_name==makes[z].name)
								{
									var supplier_name="";
									for(var m in returns)
									{
										if(returns[m].id==return_ids[k].return_id)
										{
											supplier_name=bills[m].supplier;
											break;
										}
									}
									
									total_amount-=parseFloat(return_ids[k].refund_amount);
										
									rowsHTML+="<tr>";
										rowsHTML+="<td data-th='Product Name'>";
											rowsHTML+=return_ids[k].item_name;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Make'>";
											rowsHTML+=makes[z].make;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Supplier'>";
											rowsHTML+=supplier_name;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Quantity'>";
											rowsHTML+="-"+return_ids[k].quantity;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Amount'>";
											rowsHTML+="Rs. -"+return_ids[k].refund_amount;
										rowsHTML+="</td>";
									rowsHTML+="</tr>";
									break;
								}
							}
						}
						$('#report52_body').html(rowsHTML);
						
						var total_row="<tr><td colspan='4' data-th='Total'>Total</td><td data-th='Amount'>Rs. "+total_amount+"</td></tr>";
						$('#report52_foot').html(total_row);
						
						var print_button=form.elements[6];
						print_tabular_report('report52','Product Compare Report',print_button);
						
						hide_loader();
					});
				});
			});
		});
	});
};


/**
 * @reportNo 53
 * @report Sales tax report
 */
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


/**
 * @reportNo 54
 * @report Best days (by sales)
 */
function report54_ini()
{
	show_loader();
	var form=document.getElementById('report54_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	
	var canvas_parent=$("#report54_canvas").parent();
	$("#report54_canvas").remove();
	$(canvas_parent).append("<canvas id='report54_canvas' class='report_sizing'></canvas>");
	
	var ctx = document.getElementById("report54_canvas").getContext("2d");
	
	var bills_data="<bills>" +
			"<id></id>" +
			"<total></total>" +
			"<bill_date lowerbound='yes'>"+get_raw_time(start_date)+"</bill_date>" +
			"<bill_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</bill_date>" +
			"</bills>";
	fetch_requested_data('report54',bills_data,function(bills)
	{
		for(var i=0;i<bills.length;i++)
		{
			for(var j=i+1;j<bills.length;j++)
			{
				if(bills[i].bill_date==bills[j].bill_date)
				{
					bills[i].total=parseFloat(bills[i].total)+parseFloat(bills[j].total);
					bills.splice(j,1);
					j-=1;
				}
			}
		}
		
		bills.sort(function(a,b)
		{
			if(parseFloat(a.total)<parseFloat(b.total))
			{	return 1;}
			else 
			{	return -1;}
		});
		
		bills.splice(10,bills.length);
		bills.forEach(function(bill)
		{
			bill.bill_date=get_my_past_date(bill.bill_date);
		});
		
		var result=transform_to_bar_sum(bills,'Total Sale','total','bill_date');
		var mybarchart = new Chart(ctx).Bar(result,{});
		document.getElementById("report54_legend").innerHTML=mybarchart.generateLegend();
		
		var print_button=form.elements[4];
		print_graphical_report('report54','Best days (by Sales)',print_button,mybarchart);
		hide_loader();
	});
};


/**
 * @reportNo 55
 * @report Worst days (by sales)
 */
function report55_ini()
{
	show_loader();
	var form=document.getElementById('report55_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	
	var canvas_parent=$("#report55_canvas").parent();
	$("#report55_canvas").remove();
	$(canvas_parent).append("<canvas id='report55_canvas' class='report_sizing'></canvas>");
	
	var ctx = document.getElementById("report55_canvas").getContext("2d");
	
	var bills_data="<bills>" +
			"<id></id>" +
			"<total></total>" +
			"<bill_date lowerbound='yes'>"+get_raw_time(start_date)+"</bill_date>" +
			"<bill_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</bill_date>" +
			"</bills>";
	fetch_requested_data('report55',bills_data,function(bills)
	{
		for(var i=0;i<bills.length;i++)
		{
			for(var j=i+1;j<bills.length;j++)
			{
				if(bills[i].bill_date==bills[j].bill_date)
				{
					bills[i].total=parseFloat(bills[i].total)+parseFloat(bills[j].total);
					bills.splice(j,1);
					j-=1;
				}
			}
		}
		
		bills.sort(function(a,b)
		{
			if(parseFloat(a.total)>parseFloat(b.total))
			{	return 1;}
			else 
			{	return -1;}
		});
		
		bills.splice(10,bills.length);
		bills.forEach(function(bill)
		{
			bill.bill_date=get_my_past_date(bill.bill_date);
		});
		
		var result=transform_to_bar_sum(bills,'Total Sale','total','bill_date');
		var mybarchart = new Chart(ctx).Bar(result,{});
		document.getElementById("report55_legend").innerHTML=mybarchart.generateLegend();
		
		var print_button=form.elements[4];
		print_graphical_report('report55','Worst days (by Sales)',print_button,mybarchart);
		hide_loader();
	});
};

/**
 * @reportNo 56
 * @report Service requests report
 */
function report56_ini()
{
	var form=document.getElementById('report56_header');
	var customer=form.elements[1].value;
	var machine=form.elements[2].value;
	var problem=form.elements[3].value;
	var start_date=form.elements[4].value;
	var end_date=form.elements[5].value;
	
	show_loader();
	$('#report56_body').html('');
	
	var request_data="<service_requests>" +
			"<id></id>"+
			"<customer>"+customer+"</customer>" +
			"<machine_type>"+machine+"</machine_type>" +
			"<problem_type></problem_type>" +
			"<notes>"+problem+"</notes>"+
			"<closing_notes></closing_notes>"+
			"<reported_time lowerbound='yes'>"+get_raw_time(start_date)+"</reported_time>" +
			"<reported_time upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</reported_time>" +
			"</service_requests>";
	
	fetch_requested_data('report56',request_data,function(requests)
	{
		for(var i=0;i<requests.length;i++)
		{
			var rowsHTML="<tr>";
			rowsHTML+="<td data-th='Request Id'>";
				rowsHTML+=requests[i].id;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+=requests[i].customer;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Machine'>";
				rowsHTML+=requests[i].machine_type;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Problem'>";
				rowsHTML+=requests[i].notes;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Solution'>";
				rowsHTML+=requests[i].closing_notes;
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
					
			$('#report56_body').append(rowsHTML);
		}
		hide_loader();
	});
	
	var print_button=form.elements[7];
	print_tabular_report('report56','Service requests Report',print_button);
};

/**
 * @reportNo 57
 * @report Warranty Status
 */
function report57_ini()
{
	var form=document.getElementById('report57_header');
	var customer=form.elements[1].value;
	var status=form.elements[2].value;
	
	show_loader();
	$('#report57_body').html('');
	
	var warranty_data="<warranty>" +
			"<id></id>"+
			"<customer>"+customer+"</customer>" +
			"<status>"+status+"</status>" +
			"<end_time></end_time>"+
			"</warranty>";
	
	fetch_requested_data('report57',warranty_data,function(warranties)
	{
		for(var i=0;i<warranties.length;i++)
		{
			var rowsHTML="<tr>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+=warranties[i].customer;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+=warranties[i].status;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='End Date'>";
				rowsHTML+=get_my_past_date(warranties[i].end_time);
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
					
			$('#report57_body').append(rowsHTML);
		}
		hide_loader();
	});
	
	var print_button=form.elements[4];
	print_tabular_report('report57','Warranty Report',print_button);
};

/**
 * @reportNo 58
 * @report Ledger
 */
function report58_ini()
{
	var form=document.getElementById('report58_header');
	var account=form.elements[1].value;
	var start_date=form.elements[2].value;
	var end_date=form.elements[3].value;
	
	show_loader();
	$('#report58_body').html('');
		
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
			"<acc_name exact='yes'>"+account+"</acc_name>" +
			"</payments>";
//			"<date lowerbound='yes'>"+get_raw_time(start_date)+"</date>" +
	
	fetch_requested_data('report58',payments_data,function(payments)
	{	
		var receipts_data="<receipts>"+
							"<id></id>"+
							"<receipt_id></receipt_id>"+
							"<payment_id></payment_id>"+
							"<type></type>"+
							"<amount></amount>"+
							"<date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</date>" +
							"<acc_name exact='yes'>"+account+"</acc_name>"+							
							"<date></date>"+
							"</receipts>";
//							"<date lowerbound='yes'>"+get_raw_time(start_date)+"</date>" +

		fetch_requested_data('report58',receipts_data,function(receipts)
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
						particulars="To "+payments[i].acc_name+" through receipt id: "+payments[i].bill_id;
					}
				}
				else 
				{
					balance-=parseFloat(payments[i].total_amount);
					debit="Rs. "+payments[i].total_amount;
					particulars="From "+payments[i].acc_name+" for bill id: "+payments[i].bill_id;
					if(payments[i].status=='from receipt')
					{
						particulars="From "+payments[i].acc_name+" through receipt id: "+payments[i].bill_id;
					}
				}
								
				var rowsHTML="<tr>";
				rowsHTML+="<td data-th='Date'>";
					rowsHTML+=get_my_past_date(payments[i].date);
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
						
				$('#report58_body').append(rowsHTML);
				
				if(parseFloat(payments[i].paid_amount)>0 && payments[i].paid_amount!='')
				{
					debit="-";
					credit="-";
					particulars="";
					
					if(payments[i].type=='received')
					{
						balance-=parseFloat(payments[i].paid_amount);						
						debit="Rs. "+payments[i].paid_amount;
						particulars="From "+payments[i].acc_name+" by payment id "+payments[i].id;
					}
					else 
					{
						balance+=parseFloat(payments[i].paid_amount);
						credit="Rs. "+payments[i].paid_amount;
						particulars="To "+payments[i].acc_name+" by payment id "+payments[i].id;
					}
									
					var rowsHTML="<tr>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+=get_my_past_date(payments[i].date);
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
							
					$('#report58_body').append(rowsHTML);
				}
			}
			hide_loader();
		});
	});
	
	var print_button=form.elements[6];
	print_tabular_report('report58','Ledger',print_button);
};


/**
 * @reportNo 60
 * @report Trial Balance
 */
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
		var receipts_data="<receipts>"+
							"<id></id>"+
							"<receipt_id></receipt_id>"+
							"<payment_id></payment_id>"+
							"<type></type>"+
							"<amount></amount>"+
							"<date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</date>" +
							"<acc_name></acc_name>"+							
							"<date></date>"+
							"</receipts>";

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
