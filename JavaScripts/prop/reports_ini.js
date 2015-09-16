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
										rowsHTML+="<td data-th='Item'>";
											rowsHTML+=bill_ids[k].item_name;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Brand'>";
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
											rowsHTML+="<td data-th='Item'>";
												rowsHTML+=bill_return_ids[k].item_name;
											rowsHTML+="</td>";
											rowsHTML+="<td data-th='Brand'>";
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
	var customer=form.elements[1].value;
	var start_date=form.elements[2].value;
	var end_date=form.elements[3].value;
	
	$('#report42_body').html("");
	var rowsHTML="";
	
	var feedback_data="<feedback>" +
			"<provider>"+customer+"</provider>" +
			"<order_num></order_num>"+			
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
				rowsHTML+="<td data-th='Customer'>";
					rowsHTML+=feedback.provider;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Order #'>";
					rowsHTML+=feedback.order_num+"<br>Date: "+get_my_past_date(feedback.date);
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Rating'>";
					rowsHTML+=feedback.rating;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Comments'>";
					rowsHTML+=feedback.detail;
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
	
	ajax_with_custom_func("./ajax/ecommerce_products.php",{keywords:product_name,max_results:10},function(e)
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
			"<len></len>" +
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
						product_string+=return_ids[k].item_name+"--";
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
										rowsHTML+="<td data-th='Brand'>";
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
										rowsHTML+="<td data-th='Brand'>";
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
 * @report Subscription Status
 */
function report57_ini()
{
	var form=document.getElementById('report57_header');
	var customer=form.elements[1].value;
	var subscription=form.elements[2].value;
	
	show_loader();
	$('#report57_body').html('');
	
	var warranty_data="<service_subscriptions>" +
			"<id></id>"+
			"<customer>"+customer+"</customer>" +
			"<service>"+subscription+"</service>" +
			"<next_due_date></next_due_date>"+
			"</service_subscriptions>";
	
	fetch_requested_data('report57',warranty_data,function(warranties)
	{
		for(var i=0;i<warranties.length;i++)
		{
			var rowsHTML="<tr>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+=warranties[i].customer;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+=warranties[i].service;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='End Date'>";
				rowsHTML+=get_my_past_date(warranties[i].next_due_date);
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
					
			$('#report57_body').append(rowsHTML);
		}
		hide_loader();
	});
	
	var print_button=form.elements[4];
	print_tabular_report('report57','Subscription Report',print_button);
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
		var receipts_data="<receipts_payment_mapping>"+
							"<id></id>"+
							"<receipt_id></receipt_id>"+
							"<payment_id></payment_id>"+
							"<type></type>"+
							"<amount></amount>"+
							"<date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</date>" +
							"<acc_name exact='yes'>"+account+"</acc_name>"+							
							"</receipts_payment_mapping>";
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

/**
 * @reportNo 63
 * @report Item picklist
 */
function report63_ini()
{
	//console.log('report63');
	var form=document.getElementById('report63_header');
	var sku=form.elements['sku'].value;
	var item=form.elements['item_name'].value;

	show_loader();
	
	$('#report63_body').html('');
	
	var items_data="<bill_items>" +
		"<id></id>"+
		"<item_name>"+sku+"</item_name>" +
		"<item_desc>"+item+"</item_desc>"+
		"<batch></batch>" +
		"<quantity></quantity>"+
		"<picked_quantity></picked_quantity>"+
		"<storage></storage>"+
		"<bill_id></bill_id>"+
		"<picked_status exact='yes'>pending</picked_status>"+
		"</bill_items>";

	fetch_requested_data('report63',items_data,function(items)
	{	
		items.forEach(function(item)
		{
			item.table_type='bill_items';
		});
		
		var num_items=items.length+1;

		for(var i=0;i<items.length;i++)
		{
			if(typeof items[i].item_count=='undefined')
			{
				items[i].item_count=1;			
			}

			for(var j=i+1;j<items.length;j++)
			{
				if(typeof items[j].item_count=='undefined')
				{
					items[j].item_count=1;			
				}
				
				if(items[i].bill_id==items[j].bill_id)
				{
					items[i].item_count+=1;
					items[j].item_count+=1;
				}
			}
		}
		
		for(var i=0;i<items.length;i++)
		{
			if(items[i].item_count>1)
			{
				items.splice(i,1);
				i--;
			}
		}		
		
		for(var i=0;i<items.length;i++)
		{
			var data_object_array=[];
			
			if(items[i].picked_quantity=='null' || items[i].picked_quantity=='' || isNaN(items[i].picked_quantity))
			{
				items[i].picked_quantity=0;
			}
			var data_object=new Object();
			data_object.id=items[i].id;
			data_object.quantity=items[i].quantity;
			data_object.picked=items[i].picked_quantity;
			data_object_array.push(data_object);
			
			for(var j=i+1;j<items.length;j++)
			{
				if(items[j].picked_quantity=='null' || items[j].picked_quantity=='' || isNaN(items[j].picked_quantity))
					items[j].picked_quantity=0;

				if(items[i].item_name==items[j].item_name && items[i].batch==items[j].batch && items[i].storage==items[j].storage && items[i].table_type==items[j].table_type)
				{
					items[i].quantity=parseFloat(items[i].quantity)+parseFloat(items[j].quantity);
					items[i].picked_quantity=parseFloat(items[i].picked_quantity)+parseFloat(items[j].picked_quantity);
					
					var data_object=new Object();
					data_object.id=items[j].id;
					data_object.quantity=items[j].quantity;
					data_object.picked=items[j].picked_quantity;
					data_object_array.push(data_object);

					items.splice(j,1);
					j--;
				}
			}
			items[i].id=JSON.stringify(data_object_array);
		}

		items.forEach(function(item)
		{
			var rowsHTML="<tr>";
			rowsHTML+="<form id='row_report63_"+item.id+"'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' readonly='readonly' form='row_report63_"+item.id+"' value='"+item.item_name+"'>";
				rowsHTML+="<br><textarea readonly='readonly' form='row_report63_"+item.id+"'>"+item.item_desc+"</textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' readonly='readonly' form='row_report63_"+item.id+"' value='"+item.batch+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="To Pick: <input type='number' readonly='readonly' form='row_report63_"+item.id+"' value='"+item.quantity+"'>";
				rowsHTML+="<br>Picked: <input readonly='readonly' type='number' form='row_report63_"+item.id+"' value='"+item.picked_quantity+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Storage'>";
				rowsHTML+="<input type='text' readonly='readonly' style='width:150px;' required form='row_report63_"+item.id+"' value='"+item.storage+"'>";
				rowsHTML+="<img src='./images/edit.png' class='edit_icon' title='Edit Location' id='report63_edit_location_"+item.id+"'>";
				if(item.storage=='')
					rowsHTML+="<img src='./images/refresh.png' class='refresh_icon' title='Refresh Location Calculation' id='report63_refresh_location_"+item.id+"'>";
				rowsHTML+="<input type='hidden' form='row_report63_"+item.id+"' value='"+item.id+"'>";
				rowsHTML+="<input type='hidden' form='row_report63_"+item.id+"' value='"+item.table_type+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='row_report63_"+item.id+"'>";
				rowsHTML+="<input type='hidden' form='row_report63_"+item.id+"' value='"+item.storage+"'>";
				rowsHTML+="<input type='hidden' form='row_report63_"+item.id+"' value='"+item.picked_quantity+"'>";									
				rowsHTML+="<input type='hidden' form='row_report63_"+item.id+"' value='"+item.id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
					
			$('#report63_body').append(rowsHTML);
			var report63_form=document.getElementById('row_report63_'+item.id);
			var storage_filter=report63_form.elements[5];
			
			var storage_data="<store_areas>"+
							"<name></name>"+
							//"<area_type exact='yes'>"+get_session_var('storage_level')+"</area_type>"+
							"<area_type></area_type>"+
							"</store_areas>";
			set_my_value_list(storage_data,storage_filter);
				
			$(storage_filter).on('click',function()
			{
				this.select();
			});
			
			var edit_button=document.getElementById("report63_edit_location_"+item.id);
			$(edit_button).on('click',function ()
			{
				storage_filter.removeAttribute('readonly');
			});

			var refresh_button=document.getElementById("report63_refresh_location_"+item.id);
			$(refresh_button).on('click',function ()
			{
				var storage_xml="<area_utilization>"+
								"<name></name>"+
								"<item_name exact='yes'>"+item.item_name+"</item_name>"+
								"<batch exact='yes'>"+item.batch+"</batch>"+
								"</area_utilization>";											
				get_single_column_data(function (storages) 
				{										
					var storage_result_array=[];
					get_available_storage(item.item_name,item.batch,storages,item.quantity,storage_result_array,function () 
					{
						if(storage_result_array.length>0)
						{
							storage_filter.value=storage_result_array[0].storage;
							report63_update(report63_form);
						}
					});
				},storage_xml);
			});

			$(report63_form).on('submit',function (event) 
			{
				event.preventDefault();
				report63_update(report63_form);
			});
		});
		$('textarea').autosize();
		hide_loader();
	});

	var print_button=form.elements['print'];
	print_tabular_report('report63','Item Picklist',print_button);
};

/**
 * @reportNo 64
 * @report Packing Instructions
 */
function report64_ini()
{
	var master_form=document.getElementById('report64_header');
	var item_filter=master_form.elements[1];
	
	var form=document.getElementById('report64_form');
	var reject_button=form.elements['reject'];
	var accept_button=form.elements['accept'];
	var print_button=form.elements['print'];
	
	$('#report64_invoice').html('');

	show_loader();

	var report64_count=0;
	
	var columns="<product_master count='1'>" +
			"<id></id>" +
			"<name></name>"+
			"<bar_code exact='yes'>"+item_filter.value+"</bar_code>" +
			"<packing></packing>"+
			"</product_master>";
	fetch_requested_data('',columns,function (products) 
	{
		if(products.length>0)
		{
			report64_count+=1;
			/////////get product image////////////
			var picture_column="<documents>" +
					"<id></id>" +
					"<url></url>" +
					"<doc_type exact='yes'>product_master</doc_type>" +
					"<target_id exact='yes'>"+products[0].id+"</target_id>" +
					"</documents>";
			fetch_requested_data('',picture_column,function(pic_results)
			{
				var pic_results_url="";
				var pic_results_id="";
				if(pic_results.length>0)
				{
					pic_results_id=pic_results[0].id;
					pic_results_url=pic_results[0].url;
				}
				updated_url=pic_results_url.replace(/ /g,"+");
				var imgHTML="<img style='width:98%;height:auto;' src='"+updated_url+"'>";
				
				$('#report64_image').html(imgHTML);	
				
				$('#report64_form').show();			
				
				$(accept_button).show();			
				$(reject_button).show();			
				report64_count-=1;
			});
			
			report64_count+=1;
			//////////provide a preview of the invoice//////////////////////
			var bill_items="<bill_items count='1'>"+
					"<id></id>"+
					"<bill_id></bill_id>"+		
					"<item_name exact='yes'>"+products[0].name+"</item_name>"+
					"<item_desc></item_desc>"+
					"<quantity></quantity>"+
					"<total></total>"+
					"<mrp></mrp>"+
					"<batch></batch>"+
					"<picked_status exact='yes'>picked</picked_status>"+
					"<packing_status exact='yes'>pending</packing_status>"+
					"</bill_items>";
			fetch_requested_data('',bill_items,function (items) 
			{
				report64_count-=1;
			
				if(items.length>0)
				{
					report64_count+=1;
							
					var bills_xml="<bills>"+
								"<id>"+items[0].bill_id+"</id>"+
								"<customer_name></customer_name>"+
	                        	"<bill_num></bill_num>"+
	                       		"<order_num></order_num>"+
	                       		"<order_id></order_id>"+
	                        	"<bill_date></bill_date>"+
	                        	"</bills>";
	                fetch_requested_data('',bills_xml,function (bills) 
					{
						report64_count-=1;
			
						//console.log(bills);
						$(print_button).off('click'); 
						$(print_button).on('click',function () 
						{
							print_product_barcode(bills[0].order_id,"Order # "+bills[0].order_num,"Invoice # "+bills[0].bill_num);
						});
						
        				$(print_button).show();

							////////////setting up containers///////////////////////	
						var container=document.getElementById('report64_invoice');
												
						var invoice_line=document.createElement('div');
						var table_container=document.createElement('div');
						var packing_box=document.createElement('div');
						
						////////////setting styles for containers/////////////////////////
					
						invoice_line.setAttribute('style','padding:10px;font-size:1em;width:100%;min-height:50px;background-color:#bbbbbb;font-weight:600;');
						packing_box.setAttribute('style','border:1px solid #000;margin:10px;width:100%;min-height:50px;font-weight:600;');
					
						///////////////getting the content////////////////////////////////////////
						var date=get_my_past_date(bills[0].bill_date);				
						var invoice_no=bills[0].bill_num;
						var order_no=bills[0].order_num;
						
						invoice_line.innerHTML="<div style='float:left;width:50%;text-align:left'>Invoice #: "+invoice_no+"<br>Order #: "+order_no+"</div><div style='float:right;text-align:right;width:50%'>Invoice Date: "+date+"</div>";
												
								////////populate packing instructions and invoice template///////
						if(products[0].packing!='undefined')
						{
							packing_box.innerHTML="Packing Instructions:<br><b>"+products[0].packing+"</b>";
						}			
						else 
						{
							packing_box.innerHTML="Packing Instructions not available";
						}

						var table_copy=document.createElement('table');
						
						table_copy.setAttribute('width','100%');
						//table_copy.setAttribute('height','100px');
						$(table_copy).append("<tr><th>SKU</th><th>Item</th><th>Batch</th><th>Quantity</th><th>MRP</th><th>Total</th></tr>");
		
						items.forEach(function (item) 
						{
							$(table_copy).append("<tr><th>"+item.item_name+"</th><th>"+item.item_desc+"</th><th>"+item.batch+"</th><th>"+item.quantity+"</th><th>"+item.mrp+	"</th><th>"+item.total+"</th></tr>");	
						});

						$(table_copy).find('th').attr('style',"border:2px solid black;text-align:left;font-size:1em");
						$(table_copy).find('td').attr('style',"border-right:2px solid black;border-left:2px solid black;text-align:left;font-size:1em");
						$(table_copy).find("tr").attr('style','flex:1;height:30px');
											
						container.appendChild(invoice_line);
						
						container.appendChild(table_copy);
						container.appendChild(packing_box);
						
					});
				}
				else 
				{
					var container=document.getElementById('report64_invoice');
					container.innerHTML='<b>This item is not pending for packing. Put it back in the warehouse.<b>';	
				}
			});
			
			var report64_complete=setInterval(function()
			{
		  	   if(report64_count===0)
		  	   {
					clearInterval(report64_complete);
					$('textarea').autosize();
					hide_loader();   
		  	   }
			},200);
			////////////////////////////////////////////////////////////////
		}
		else 
		{
			var container=document.getElementById('report64_invoice');
			container.innerHTML='<b>Incorrect Barcode.<b>';	
			hide_loader();
		}		
	});		
};

/**
 * @reportNo 65
 * @report Pricing Update Timestamps
 */
function report65_ini()
{
	var form=document.getElementById('report65_header');
	var channel_filter=form.elements[1].value;
	var item_filter=form.elements[2].value;
	
	show_loader();
	$('#report65_body').html('');
		
	var prices_data="<channel_prices>" +
			"<id></id>"+
			"<channel>"+channel_filter+"</channel>"+
			"<item>"+item_filter+"</item>" +
			"<sale_price></sale_price>"+
			"<freight></freight>"+
			"<discount_customer></discount_customer>"+
			"<profit_mrp></profit_mrp>"+
			"<profit_sp></profit_sp>"+
			"<profit></profit>"+
			"<gateway_charges></gateway_charges>"+
			"<storage_charges></storage_charges>"+
			"<total_charges></total_charges>"+
			"<service_tax></service_tax>"+
			"<total_payable></total_payable>"+
			"<total_receivable></total_receivable>"+
			"<from_time></from_time>"+
			"</channel_prices>";

	fetch_requested_data('report65',prices_data,function(prices)
	{
		prices.forEach(function(price)
		{
			var rowsHTML="<tr>";
			rowsHTML+="<td data-th='Channel'>";
				rowsHTML+=price.channel;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+=price.item;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Price'>";
				rowsHTML+="Discount: Rs."+price.discount_customer;
				rowsHTML+="<br>SP: Rs."+price.sale_price;
				rowsHTML+="<br>Freight: Rs."+price.freight;
				rowsHTML+="<br>To channel: Rs."+my_round((parseFloat(price.total_charges)+parseFloat(price.service_tax)),2);
				rowsHTML+="<br>Profit: Rs."+price.profit;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Time'>";
				rowsHTML+="From: "+get_my_datetime(price.from_time);
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
			$('#report65_body').append(rowsHTML);
		});
		hide_loader();				
	});
			
	var print_button=form.elements['print'];
	print_tabular_report('report65','Pricing Timestamps',print_button);
};

/**
 * @reportNo 66
 * @report Inventory level (by store)
 */
function report66_ini()
{
	var form=document.getElementById('report66_header');
	var type_filter=form.elements[1].value;
	var storage_filter=form.elements[2].value;
	
	show_loader();
	
	var total_calls=0;
	$('#report66_body').html('');
		
	var area_data="<store_areas>" +
			"<id></id>"+
			"<name exact='yes'>"+storage_filter+"</name>"+
			"<area_type exact='yes'>"+type_filter+"</area_type>" +
			"</store_areas>";
	total_calls+=1;
	fetch_requested_data('report66',area_data,function(areas)
	{
		//console.log(areas);
		total_calls-=1;
		areas.forEach(function(area)
		{	
			var storage_array=[];
			storage_array.push(area.name);
			storage_count_tracker=0;
			get_all_child_storage(area.name,storage_array);			

			total_calls+=1;
			
			var areas_complete=setInterval(function()
			{
				if(storage_count_tracker===0)
				{
					//console.log(storage_array);
					clearInterval(areas_complete);

					total_calls-=1;
					var storage_string="--";
					for(var i in storage_array)
					{
						storage_string+=storage_array[i]+"--";
					}
	
					var item_data="<area_utilization>"+
								"<name array='yes'>"+storage_string+"</name>"+
								"<item_name></item_name>"+
								"<batch></batch>"+
								"</area_utilization>";	
					total_calls+=1;				
					fetch_requested_data('',item_data,function(items)
					{
						//console.log(items);
						total_calls-=1;
						for(var i=0;i<items.length;i++)
						{
							for(var j=i+1;j<items.length;j++)
							{
								if(items[i].item_name==items[j].item_name && items[i].batch==items[j].batch && items[i].name==items[j].name)
								{
									items.splice(j,1);
									j--;
								}
							}
						}
						
						items.forEach(function(item)
						{
							total_calls+=1;
							get_store_inventory(item.name,item.item_name,item.batch,function(quantity)
							{
								item.quantity=parseFloat(quantity);
								total_calls-=1;
							});
						});
						
						var inventory_complete=setInterval(function()
						{
							if(total_calls===0)
							{
					  	   		clearInterval(inventory_complete);
								var rowsHTML="";									
								items.forEach(function (item) 
								{
									rowsHTML+="<tr>";
									rowsHTML+="<td data-th='Storage'>";
										rowsHTML+=item.name;
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Item'>";
										rowsHTML+=item.item_name;
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Batch'>";
										rowsHTML+=item.batch;
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Quantity'>";
										rowsHTML+=item.quantity;
									rowsHTML+="</td>";
									rowsHTML+="</tr>";
								});	
								$('#report66_body').html(rowsHTML);
								hide_loader();
								
								var csv_button=form.elements['csv'];
								$(csv_button).off("click");
								$(csv_button).on("click", function(event)
								{
									var new_products=[];
									items.forEach(function(product)
									{
										var new_product=new Object();
										new_product.Storage=product.name;
										new_product.Item=product.item_name;
										new_product.Batch=product.batch;
										new_product.Quantity=product.quantity;
										new_products.push(new_product);
									});
									csv_download_report(new_products,'inventory_level_by_store');
								});
							}
					     },50);					
					});
				}
			},50);
		});		
	});
	
	var print_button=form.elements[4];
	print_tabular_report('report66','Inventory Level (by store)',print_button);
};

/**
 * @reportNo 67
 * @report Channel Collections
 */
function report67_ini()
{
	var form=document.getElementById('report67_header');
	var channel_filter=form.elements[1].value;
	var status_filter=form.elements[2].value;
	var from_filter=get_raw_time(form.elements[3].value);
	var to_filter=get_raw_time(form.elements[4].value);
	
	show_loader();
	$('#report67_body').html('');
		
	var prices_data="<bills>" +
			"<id></id>"+
			"<channel>"+channel_filter+"</channel>"+
			"<customer_name></customer_name>" +
			"<bill_date lowerbound='yes'>"+from_filter+"</bill_date>" +
			"<bill_date upperbound='yes'>"+(to_filter+86400000)+"</bill_date>" +
			"<channel_charges></channel_charges>"+
			"<channel_tax></channel_tax>"+
			"<channel_payable></channel_payable>"+
			"<collection_status>"+status_filter+"</collection_status>"+
			"<total></total>"+
			"</bills>";

	fetch_requested_data('report67',prices_data,function(prices)
	{
		prices.forEach(function(price)
		{
			var to_string=get_my_datetime(price.to_time);
			if(price.to_time=='0' || price.to_time=="")
			{
				to_string=get_my_datetime();				
			}
			var rowsHTML="<tr>";
			rowsHTML+="<td data-th='Channel'>";
				rowsHTML+=price.channel;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+=price.customer_name;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Total'>";
				rowsHTML+="Bill Total: Rs."+price.total;
				rowsHTML+="<br>Channel Charges: Rs."+price.channel_charges;
				rowsHTML+="<br>S.Tax: Rs."+price.channel_tax;
				rowsHTML+="<br>Payable to Channel: Rs."+price.channel_payable;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Date'>";
				rowsHTML+=get_my_past_date(price.bill_date);
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status' id='report67_status_"+price.id+"'>";
				rowsHTML+=price.collection_status;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				if(price.collection_status=='pending')
					rowsHTML+="<input type='button' id='report67_collected_"+price.id+"' class='generic_icon' value='Collected'>";	
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
			
			$('#report67_body').append(rowsHTML);
			
			var report67_button=document.getElementById('report67_collected_'+price.id);
				
			$(report67_button).on('click',function(event)
			{
				event.preventDefault();
				report67_update(price.id);
				$(report67_button).hide();
				document.getElementById('report67_status_'+price.id).innerHTML='received';
			});
		});
		hide_loader();				
	});

	var print_button=form.elements[4];
	print_tabular_report('report67','Channel Collections',print_button);
};

/**
 * @reportNo 69
 * @report Project Expenses
 */
function report69_ini()
{
	var form=document.getElementById('report69_header');
	var id_filter=form.elements['project_id'].value;
	var staff_filter=form.elements['staff'].value;
	var from_filter=form.elements['from'].value;
	var to_filter=form.elements['to'].value;
	var key_filter=form.elements['key'].value;

	show_loader();
	$('#report69_body').html('');	
	
	////indexing///
	var index_element=document.getElementById('report69_index');
	var prev_element=document.getElementById('report69_prev');
	var next_element=document.getElementById('report69_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var expense_data="<expenses count='25' start_index='"+start_index+"'>" +
		"<id></id>"+
		"<person>"+staff_filter+"</person>" +
		"<amount></amount>"+
		"<status></status>"+
		"<detail>"+key_filter+"</detail>"+
		"<source exact='yes'>project</source>"+
		"<source_id>"+id_filter+"</source_id>"+
		"<expense_date lowerbound='yes'>"+get_raw_time(from_filter)+"</expense_date>" +
		"<expense_date upperbound='yes'>"+(get_raw_time(to_filter)+86400000)+"</expense_date>" +			
		"</expenses>";
	//console.log(expense_data);
	fetch_requested_data('report69',expense_data,function(items)
	{
		//console.log(items);
		var rowsHTML="";
		items.forEach(function(item)
		{
			rowsHTML+="<tr>";
			rowsHTML+="<form id='report69_"+item.id+"'></form>";
			rowsHTML+="<td data-th='Staff'>";
				rowsHTML+=item.person;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Detail'>";
				rowsHTML+=item.detail;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+=item.amount;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Date'>";
				rowsHTML+=get_my_past_date(item.expense_date);
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+=item.status;
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
					
		});
		$('#report69_body').html(rowsHTML);
		
		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(items.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		hide_loader();
	});
	
	var print_button=form.elements['print'];
	print_tabular_report('report69','Project Expenses',print_button);
};

/**
 * @reportNo 72
 * @report Pickup and Deliveries
 */
function report72_ini()
{
	var form=document.getElementById('report72_header');
	var customer=form.elements[1].value;
	var address=form.elements[2].value;
	var status=form.elements[3].value;
	
	show_loader();
	$('#report72_body').html('');	
	
		////indexing///
	var index_element=document.getElementById('report72_index');
	var prev_element=document.getElementById('report72_prev');
	var next_element=document.getElementById('report72_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var orders_data="<sale_orders count='25' start_index='"+start_index+"'>" +
		"<id></id>"+
		"<customer_name>"+customer+"</customer_name>" +
		"<address>"+address+"</address>"+
		"<notes></notes>"+
		"<order_num></order_num>"+
		"<order_date></order_date>"+
		"<type></type>"+
		"<pickup_assignee></pickup_assignee>"+
		"<delivery_assignee></delivery_assignee>"+
		"<amount></amount>" +
		"<tax></tax>"+
		"<total></total>"+
		"<status>"+status+"</status>"+
		"</sale_orders>";

	fetch_requested_data('report72',orders_data,function(items)
	{	
		var button_value="Pick";
		items.forEach(function(item)
		{
			var assignee="";
			if(item.status=='pending')
			{
				button_value="Pick";
			}
			else if(item.status=='picking')
			{
				assignee="Pickup by: "+item.pickup_assignee;
				button_value="Picked";
			}
			else if(item.status=='picked')
			{
				assignee="Pickup by: "+item.pickup_assignee;
				button_value="Process";
			}
			else if(item.status=='processing')
			{
				assignee="Pickup by: "+item.pickup_assignee;
				button_value="Processed";
			}
			else if(item.status=='ready for delivery')
			{
				assignee="Pickup by: "+item.pickup_assignee;
				button_value="Deliver";
			}
			else if(item.status=='out for delivery')
			{
				assignee="Pickup by: "+item.pickup_assignee+"<br>Delivery by: "+item.delivery_assignee;
				button_value="Delivered";
			}
			else if(item.status=='delivered')
			{
				assignee="Pickup by: "+item.pickup_assignee+"<br>Delivery by: "+item.delivery_assignee;
			}
			
			var rowsHTML="<tr>";
			rowsHTML+="<form id='report72_"+item.id+"'></form>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+=item.customer_name;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="Order #"+item.order_num+"<br>"+assignee;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount' title='Amount: Rs. "+item.amount+"\nTax: Rs. "+item.tax+"'>";
				rowsHTML+="Rs. "+item.total;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Address'>";
				rowsHTML+=item.address;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='report72_"+item.id+"' readonly='readonly' value='"+item.status+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='report72_"+item.id+"' value='"+item.id+"'>";
			if(item.status!='delivered')
			{
				rowsHTML+="<input type='button' form='report72_"+item.id+"' class='generic_icon' value='"+button_value+"'>";
			}
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
					
			$('#report72_body').append(rowsHTML);

			if(item.status!='delivered')
			{			
				var report72_form=document.getElementById('report72_'+item.id);				
				var update_button=report72_form.elements[2];
				$(update_button).on('click',function(event)
				{
					event.preventDefault();
					report72_update(report72_form);
				});
			}
		});
		
		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(items.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		hide_loader();
	});
	
	var print_button=form.elements[5];
	print_tabular_report('report72','Orders',print_button);
};

/**
 * @reportNo 73
 * @report Stock of laundry
 */
function report73_ini()
{
	var form=document.getElementById('report73_header');
	var customer=form.elements['customer'].value;
	var item=form.elements['item_name'].value;
	var status=form.elements['status'].value;

	show_loader();
	$('#report73_body').html('');
	
	var total_quantity=0;
	var report_count=1;
	
	var sale_order_data="<sale_orders>"+
					"<bill_id></bill_id>"+
					"<customer_name>"+customer+"</customer_name>"+
					"<status>"+status+"</status>"+
					"</sale_orders>";
	fetch_requested_data('report73',sale_order_data,function(sale_orders)
	{
		report_count+=sale_orders.length;
		report_count-=1;
		sale_orders.forEach(function(sale_order)
		{
			var bills_data="<bill_items>" +
					"<bill_id exact='yes'>"+sale_order.bill_id+"</bill_id>" +
					"<item_name></item_name>" +
					"<quantity></quantity>" +
					"</bill_items>";	
			fetch_requested_data('report73',bills_data,function(bill_items)
			{
				bill_items.forEach(function(bill_item)
				{
					var rowsHTML="<tr>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+=sale_order.customer_name;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+=bill_item.item_name;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+=bill_item.quantity;
					rowsHTML+="</td>";
					rowsHTML+="</tr>";
							
					$('#report73_body').append(rowsHTML);
					if(!isNaN(bill_item.quantity))
					{
						total_quantity+=parseFloat(bill_item.quantity);
					}
				});
				report_count-=1;
			});
		});
	});	
	
	var report_complete=setInterval(function()
	{
	   if(report_count===0)
	   {
		   var total_row="<tr><td colspan='2' data-th='Total'>Total Quantity</td><td data-th='Quantity'>"+total_quantity+"</td></tr>";
		   $('#report73_foot').html(total_row);
	
		   clearInterval(report_complete);
		   hide_loader();
	   }
	},1000);

	var print_button=form.elements[5];
	print_tabular_report('report73','Stock of laundry',print_button);
};

/**
 * @reportNo 74
 * @report Feedback
 */
function report74_ini()
{
	show_loader();
	
	var form=document.getElementById('report74_header');
	var customer=form.elements[1].value;
	var start_date=form.elements[2].value;
	var end_date=form.elements[3].value;
	
	$('#report74_body').html("");
	var rowsHTML="";
	
	var feedback_data="<feedback>" +
			"<provider>"+customer+"</provider>" +
			"<order_num></order_num>"+			
			"<detail></detail>" +
			"<rating></rating>" +
			"<date lowerbound='yes'>"+get_raw_time(start_date)+"</date>" +
			"<date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</date>" +
			"</feedback>";

	fetch_requested_data('report74',feedback_data,function(feedbacks)
	{
		feedbacks.forEach(function(feedback)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<td data-th='Customer'>";
					rowsHTML+=feedback.provider;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Order #'>";
					rowsHTML+=feedback.order_num+"<br>Date: "+get_my_past_date(feedback.date);
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Rating'>";
					rowsHTML+=feedback.rating;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Comments'>";
					rowsHTML+=feedback.detail;
				rowsHTML+="</td>";
			rowsHTML+="</tr>";
		});
		$('#report74_body').html(rowsHTML);
		
		var print_button=form.elements[5];
		print_tabular_report('report74','Feedback',print_button);
		
		hide_loader();
	});	
};

/**
 * @reportNo 75
 * @report Supplier Score Report
 */
function report75_ini()
{
	show_loader();
	
	var form=document.getElementById('report75_header');
	var supplier=form.elements['supplier'].value;
	
	$('#report75_body').html("");
	$('#report75_foot').html("");
	
	var struct_data="<ques_struct>" +
			"<id></id>"+			
			"<name exact='yes'>ques2</name>"+			
			"</ques_struct>";

	fetch_requested_data('report75',struct_data,function(structs)
	{
		if(structs.length>0)
		{
			var fields_data="<ques_fields>"+
						"<id></id>"+
						"<ques_id exact='yes'>"+structs[0].id+"</ques_id>"+
						"<name></name>"+
						"<display_name></display_name>"+
						"<description></description>"+
						"<weight></weight>"+
						"<forder></forder>"+
						"</ques_fields>";
			fetch_requested_data('report75',fields_data,function (fields) 
			{
				fields.sort(function(a,b)
				{
					if(parseInt(a.forder)>parseInt(b.forder))
					{	return 1;}
					else 
					{	return -1;}
				});
				
				var matching_ques=[];
				var fields_timer_count=0;
				
				fields.forEach(function (field) 
				{
					var report_timer=setInterval(function()
					{
				  	   if(fields_timer_count===0)
				  	   {
				  	   		fields_timer_count+=1;
				  			clearInterval(report_timer);
				  		   
							var rowsHTML="<tr>";
								rowsHTML+="<td data-th='Parameter'>";
									rowsHTML+=field.display_name;
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Weight'>";
									rowsHTML+=field.weight;
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Score (out of 100)' id='report75_score_"+field.id+"'>";
								rowsHTML+="</td>";
							rowsHTML+="</tr>";
							
							$('#report75_body').append(rowsHTML);
				
							var field_value_data="<ques_fields_data>"+
												"<ques_id></ques_id>"+
												"<field_value></field_value>"+
												"<field_id exact='yes'>"+field.id+"</field_id>"+
												"</ques_fields_data>";
							fetch_requested_data('',field_value_data,function (field_values) 
							{
								if(matching_ques.length==0)
								{
									for(var i=0;i<field_values.length;i++)
									{
										if(field_values[i].field_value==supplier)
										{
											matching_ques.push(field_values[i].ques_id);
										}
									}
									document.getElementById("report75_score_"+field.id).innerHTML=supplier;							
								}
								else
								{
									var total_value=0;
									var total_count=0;
									for(var j=0;j<field_values.length;j++)
									{
										if(matching_ques.indexOf(field_values[j].ques_id)>-1)
										{
											total_value+=parseFloat(field_values[j].field_value);
											total_count+=1;
										}
									}
									var field_score=Math.round(total_value/total_count);
									document.getElementById("report75_score_"+field.id).innerHTML=field_score;
								}
								fields_timer_count-=1;

								var total_score=0;
								var total_weight=0;								
								fields.forEach(function (total_field)
								{
									var score_td=document.getElementById("report75_score_"+total_field.id);
									if(!isNaN(parseFloat(score_td.innerHTML)))
									{									
										total_score+=(parseFloat(score_td.innerHTML)*parseFloat(total_field.weight));
										total_weight+=parseFloat(total_field.weight);
									}
								});
								var weighted_score=Math.round(total_score/total_weight);
								var footHTML="<tr><td colspan='2'>Total Score</td><td>"+weighted_score+"</td></tr>";
								$('#report75_foot').html(footHTML);
				
							});
					   }
				    },100);
						
				});
				
				var print_button=form.elements[5];
				print_tabular_report('report75','Feedback',print_button);
				
				hide_loader();
			});			
		}
		else 
		{
			hide_loader();
		}		
	});	
};

/**
 * @reportNo 76
 * @report Logistics Order Status
 */
function report76_ini()
{
	var form=document.getElementById('report76_header');
	var awb_filter=form.elements[1].value;
	var delivery_filter=form.elements[2].value;
	var status_filter=form.elements[3].value;
	var start_filter=get_raw_time(form.elements[4].value);
	var end_filter=get_raw_time(form.elements[5].value);
	
	show_loader();
	$('#report76_body').html('');	
	
	////indexing///
	var index_element=document.getElementById('report76_index');
	var prev_element=document.getElementById('report76_prev');
	var next_element=document.getElementById('report76_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var orders_data="<logistics_orders count='25' start_index='"+start_index+"'>" +
		"<id></id>"+
		"<awb_num>"+awb_filter+"</awb_num>" +
		"<import_date lowerbound='yes'>"+start_filter+"</import_date>"+
		"<import_date upperbound='yes'>"+end_filter+"</import_date>"+
		"<delivery_person>"+delivery_filter+"</delivery_person>"+
		"<status>"+status_filter+"</status>"+
		"</logistics_orders>";
	//console.log(orders_data);
	
	fetch_requested_data('report76',orders_data,function(items)
	{
		var rowsHTML="";
		items.forEach(function(item)
		{
			rowsHTML+="<tr>";
			rowsHTML+="<form id='report76_"+item.id+"'></form>";
			rowsHTML+="<td data-th='AWB #' onclick=\"element_display('"+item.id+"','form198')\">";
				rowsHTML+=item.awb_num;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Delivery Person'>";
				rowsHTML+=item.delivery_person;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Date'>";
				rowsHTML+=get_my_past_date(item.import_date);
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+=item.status;
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
					
		});
		$('#report76_body').append(rowsHTML);
		
		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(items.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		hide_loader();
	});
	
	var print_button=form.elements[7];
	print_tabular_report('report76','Orders',print_button);
};

/**
 * @reportNo 77
 * @report Inventory Storage (by item)
 */
function report77_ini()
{
	var form=document.getElementById('report77_header');
	var item_filter=form.elements[1].value;
	var batch_filter=form.elements[2].value;
	
	show_loader();
	
	var total_calls=0;
	$('#report77_body').html('');
		
	var item_data="<area_utilization>"+
			"<name></name>"+
			"<item_name exact='yes'>"+item_filter+"</item_name>"+
			"<batch>"+batch_filter+"</batch>"+
			"</area_utilization>";	
						
	fetch_requested_data('report77',item_data,function(items)
	{
		for(var i=0;i<items.length;i++)
		{
			for(var j=i+1;j<items.length;j++)
			{
				if(items[i].item_name==items[j].item_name && items[i].batch==items[j].batch && items[i].name==items[j].name)
				{
					items.splice(j,1);
					j--;
				}
			}
		}
		
		var total_calls=0;			
		items.forEach(function(item)
		{
			total_calls+=1;
			get_store_inventory(item.name,item.item_name,item.batch,function(quantity)
			{
				item.quantity=parseFloat(quantity);
				total_calls-=1;
			});
		});					
							
		var inventory_complete=setInterval(function()
		{
			if(total_calls===0)
			{
	  	   		clearInterval(inventory_complete);
	  	   		var rowsHTML="";
					
				items.forEach(function (item) 
				{
					rowsHTML+="<tr>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+=item.item_name;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+=item.batch;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+=item.quantity;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Storage'>";
						rowsHTML+=item.name;
					rowsHTML+="</td>";
					rowsHTML+="</tr>";					
				});
				$('#report77_body').html(rowsHTML);
				
				var csv_button=form.elements['csv'];
				$(csv_button).off("click");
				$(csv_button).on("click", function(event)
				{
					var new_products=[];
					items.forEach(function(product)
					{
						var new_product=new Object();
						new_product.Storage=product.name;
						new_product.Item=product.item_name;
						new_product.Batch=product.batch;
						new_product.Quantity=product.quantity;
						new_products.push(new_product);
					});
					csv_download_report(new_products,'inventory_storage_by_item');
				});
				hide_loader();
			}
	     },50);		
	});	
	
	var print_button=form.elements[4];
	print_tabular_report('report77','Inventory Storage (by item)',print_button);
};


/**
 * @reportNo 78
 * @report Followup Report
 */
function report78_ini()
{
	var form=document.getElementById('report78_header');
	var customer_filter=form.elements['customer'].value;
	var date_filter=form.elements['date'].value;
	
	show_loader();
	
	$('#report78_body').html('');
		
	var follow_up_data="<followups>"+
			"<customer exact='yes'>"+customer_filter+"</customer>"+
			"<date>"+date_filter+"</date>"+
			"<response></response>"+
			"<detail></detail>"+
			"<next_date></next_date>"+
			"<source_id></source_id>"+
			"</followups>";	
						
	fetch_requested_data('report78',follow_up_data,function(followups)
	{
		var rowsHTML="";
		followups.forEach(function (followup) 
		{
			rowsHTML+="<tr>";
			rowsHTML+="<td data-th='Date'>";
				rowsHTML+=get_my_past_date(followup.date);
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Reponse'>";
				rowsHTML+=followup.response;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+=followup.detail;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Next follow-up'>";
				rowsHTML+=get_my_past_date(followup.next_date);
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Lead'>";
				rowsHTML+="<input type='button' class='generic_icon' value='Go to Lead' onclick=\"element_display('"+followup.source_id+"','form213');\">";
			rowsHTML+="</td>";
			rowsHTML+="</tr>";			
		});
		$('#report78_body').html(rowsHTML);
		hide_loader();
	});	
	
	var print_button=form.elements[4];
	print_tabular_report('report78','Sale Followups',print_button);
};

/**
 * @reportNo 79
 * @report Pending Purchase order items
 */
function report79_ini()
{
	var form=document.getElementById('report79_header');
	var order_filter=form.elements[1].value;
	
	show_loader();
	$('#report79_body').html('');	
	
	var order_data="<purchase_orders>"+
				"<id></id>"+
				"<order_num>"+order_filter+"</order_num>"+
				"<status array='yes'>--order placed--partially received--</status>"+
				"<bill_id></bill_id>"+
				"</purchase_orders>";
	
	fetch_requested_data('report79',order_data,function(pos)
	{
		var bill_id_string='--';
		var po_id_string='--';
		for(var i in pos)
		{
			bill_id_string+=pos[i].bill_id+"--";
			po_id_string+=pos[i].id+"--";
		}		

		var bill_items_xml="<supplier_bill_items>"+
					"<bill_id array='yes'>"+bill_id_string+"</bill_id>"+
					"<product_name></product_name>"+
					"<item_desc></item_desc>"+
					"<quantity></quantity>"+
					"<qc exact='yes'>accepted</qc>"+
					"</supplier_bill_items>";
					
		var po_items_xml="<purchase_order_items>"+
					"<order_id array='yes'>"+po_id_string+"</order_id>"+
					"<item_name></item_name>"+
					"<item_desc></item_desc>"+
					"<quantity></quantity>"+
					"</purchase_order_items>";
		fetch_requested_data('',po_items_xml,function (po_items) 
		{
			fetch_requested_data('',bill_items_xml,function (bill_items) 
			{
				for(var j=0;j<po_items.length;j++)
				{
					po_items[j].order_quantity=po_items[j].quantity;
				}
				
				for(var k=0;k<po_items.length;k++)
				{
					for(var l=0;l<bill_items.length;l++)
					{
						if(po_items[k].item_name==bill_items[l].product_name)
						{
							if(parseFloat(po_items[k].quantity)>parseFloat(bill_items[l].quantity))
							{
								po_items[k].quantity=parseFloat(po_items[k].quantity)-parseFloat(bill_items[l].quantity);
								bill_items.splice(l,1);
								l--;
							}
							else if(parseFloat(po_items[k].quantity)<parseFloat(bill_items[l].quantity))
							{
								bill_items[l].quantity=parseFloat(bill_items[l].quantity)-parseFloat(po_items[k].quantity);
								po_items.splice(k,1);
								k--;
								break;
							}
							else 
							{
								bill_items.splice(l,1);
								po_items.splice(k,1);
								k--;
								break;
							}
						}
					}
				}
				
				var rowsHTML="";
				po_items.forEach(function(item)
				{
					rowsHTML+="<tr>";
					rowsHTML+="<td data-th='PO #'>";
						rowsHTML+="<a onclick=\"element_display('"+item.order_id+"','form24');\">"+item.order_id+"<\a>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='SKU'>";
						rowsHTML+=item.item_name;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Item Name'>";
						rowsHTML+=item.item_desc;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Order Qty'>";
						rowsHTML+=item.order_quantity;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Pending Qty'>";
						rowsHTML+=item.quantity;
					rowsHTML+="</td>";
					rowsHTML+="</tr>";
				});
				$('#report79_body').html(rowsHTML);
				
				hide_loader();
			});
		});
	});
	
	var print_button=form.elements[3];
	print_tabular_report('report79','Pending Purchase Order Items',print_button);
};

/**
 * @reportNo 80
 * @report Total Sales
 */
function report80_ini()
{
	var form=document.getElementById('report80_header');
	var start_filter=form.elements[1].value;
	var end_filter=form.elements[2].value;
	
	show_loader();
	$('#report80_body').html('');	
		
	var columns="<bills>" +
		"<total></total>" +
		"<bill_num></bill_num>"+
		"<order_num></order_num>"+		
		"<bill_date lowerbound='yes'>"+(get_raw_time(start_filter)-1000)+"</bill_date>" +
		"<bill_date upperbound='yes'>"+(get_raw_time(end_filter)+86400000)+"</bill_date>" +
		"</bills>";

	fetch_requested_data('report80',columns,function(items)
	{
		var rowsHTML="";
		var bill_total=0;
		items.forEach(function(item)
		{
			rowsHTML+="<tr>";
			rowsHTML+="<td data-th='Bill Date'>";
				rowsHTML+=get_my_past_date(item.bill_date);
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Bill #'>";
				rowsHTML+=item.bill_num;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Order #'>";
				rowsHTML+=item.order_num;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Bill Total'>";
				rowsHTML+="Rs. "+item.total;
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
			
			bill_total+=parseFloat(item.total);
		});
		
		var footHTML="<tr><td colspan='3'><b>Total Sales<b></td><td><b>Rs. "+bill_total+"</b></td></tr>";

		$('#report80_body').html(rowsHTML);
		$('#report80_foot').html(footHTML);
		/////////////

		hide_loader();
	});
	
	var print_button=form.elements[4];
	print_tabular_report('report80','Total Sales',print_button);
};

/**
 * @reportNo 81
 * @report Sale leads report
 */
function report81_ini()
{
	var form=document.getElementById('report81_header');
	var staff_filter=form.elements[1].value;
	
	show_loader();
	$('#report81_body').html('');	
	
	////indexing///
	var index_element=document.getElementById('report81_index');
	var prev_element=document.getElementById('report81_prev');
	var next_element=document.getElementById('report81_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var leads_data="<sale_leads count='25' start_index='"+start_index+"'>" +
		"<id></id>"+
		"<customer></customer>" +
		"<detail></detail>"+
		"<due_date></due_date>"+
		"<identified_by>"+staff_filter+"</identified_by>"+
		"</sale_leads>";
	//console.log(orders_data);
	
	fetch_requested_data('report81',leads_data,function(items)
	{
		items.forEach(function(item)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
			rowsHTML+="<form id='report81_"+item.id+"'></form>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+=item.customer;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Requirement'>";
				rowsHTML+=item.detail;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Follow-ups' id='report81_followup_"+item.id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Next Follow-up'>";
				rowsHTML+=get_my_past_date(item.due_date);
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
		
			$('#report81_body').append(rowsHTML);
			
			var followup_xml="<followups>"+
							"<response></response>"+
							"<detail></detail>"+
							"<date></date>"+
							"<source_id exact='yes'>"+item.id+"</source_id>"+
							"</followups>";
			fetch_requested_data('',followup_xml,function (followups) 
			{
				var follow_up_td=document.getElementById('report81_followup_'+item.id);
				var followup_data="";
				for(var i in followups)
				{
					followup_data+="<p title='Response: "+followups[i].response+"\nDetail: "+followups[i].detail+"'>"+get_my_past_date(followups[i].date)+"</p>";
				}
				follow_up_td.innerHTML=followup_data;
			});				
		});		
		
		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(items.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		hide_loader();
	});
	
	var print_button=form.elements[3];
	print_tabular_report('report81','Sale Leads managed by '+staff_filter,print_button);
};


/**
 * @reportNo 82
 * @report Inventory report
 */
function report82_ini()
{
	var form=document.getElementById('report82_header');
	var item_filter=form.elements[1].value;

	show_loader();
	$('#report82_body').html('');	

	////indexing///
	var index_element=document.getElementById('report82_index');
	var prev_element=document.getElementById('report82_prev');
	var next_element=document.getElementById('report82_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var items_data="<product_master count='25' start_index='"+start_index+"'>" +
		"<id></id>"+
		"<name>"+item_filter+"</name>" +
		"</product_master>";
	//console.log(orders_data);
	
	fetch_requested_data('report82',items_data,function(items)
	{
		items.forEach(function(item)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
			rowsHTML+="<form id='report82_"+item.id+"'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+=item.name;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Total Inventory'>";
				rowsHTML+="<p id='report82_total_"+item.id+"'></p>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Pending Order'>";
				rowsHTML+="<p id='report82_ordered_"+item.id+"'></p>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Available Inventory'>";
				rowsHTML+="<p id='report82_available_"+item.id+"'></p>";
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
		
			$('#report82_body').append(rowsHTML);
			
			get_inventory(item.name,'',function (inventory) 
			{
				document.getElementById("report82_total_"+item.id).innerHTML=inventory;
				var sale_item_xml="<sale_order_items sum='yes'>"+
								"<quantity></quantity>"+								
								"<bill_status exact='yes'>pending</bill_status>"+
								"<item_name exact='yes'>"+item.name+"</item_name>"+
								"</sale_order_items>";
				get_single_column_data(function (sale_items) 
				{
						
					if(sale_items.length>0)
					{
						var av_inventory=parseFloat(inventory)-parseFloat(sale_items[0]);
						document.getElementById("report82_ordered_"+item.id).innerHTML=sale_items[0];
						document.getElementById("report82_available_"+item.id).innerHTML=av_inventory;
					}
					else
					{
						document.getElementById("report82_ordered_"+item.id).innerHTML='0';
						document.getElementById("report82_available_"+item.id).innerHTML=inventory;
					}
				},sale_item_xml);				
				
			});				
		});		
		
		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(items.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		hide_loader();
	});
	
	var print_button=form.elements[3];
	print_tabular_report('report82','Inventory Report',print_button);
};

/**
 * @reportNo 83
 * @report Testing Results
 */
function report83_ini()
{
	var form=document.getElementById('report83_header');
	var test_filter=form.elements['test'].value;
	var item_filter=form.elements['name'].value;
	var result_filter=form.elements['result'].value;
	
	show_loader();
	
	$('#report83_body').html('');
	
	////indexing///
	var index_element=document.getElementById('report83_index');
	var prev_element=document.getElementById('report83_prev');
	var next_element=document.getElementById('report83_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
		
	var testing_data="<testing_results count='25' start_index='"+start_index+"'>"+
			"<item>"+item_filter+"</item>"+
			"<test_id>"+test_filter+"</test_id>"+
			"<date></date>"+
			"<response>"+result_filter+"</response>"+
			"<details></details>"+
			"<next_date></next_date>"+
			"</testing_results>";	
						
	fetch_requested_data('report83',testing_data,function(tests)
	{
		tests.forEach(function(test_item) 
		{
			var rowsHTML="<tr>";
			rowsHTML+="<td data-th='Test Id'>";
				rowsHTML+=test_item.test_id;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+=test_item.item;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Result'>";
				rowsHTML+=get_my_past_date(test_item.date)+": "+test_item.response;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+=test_item.details;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Document' id='report83_document_"+test_item.id+"'>";			
			rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#report83_body').append(rowsHTML);
			
			var doc_column="<documents>" +
							"<id></id>" +
							"<url></url>" +
							"<doc_name></doc_name>"+
							"<doc_type exact='yes'>testing_results</doc_type>" +
							"<target_id exact='yes'>"+test_item.id+"</target_id>" +
							"</documents>";
			fetch_requested_data('report83',doc_column,function(doc_results)
			{
				var docHTML="";
				for (var j in doc_results)
				{
					var updated_url=doc_results[j].url.replace(/ /g,"+");
					docHTML+="<a href='"+updated_url+"' download='"+doc_results[j].doc_name+"'><u>"+doc_results[j].doc_name+"</u></a><br>";							
				}
				document.getElementById('report83_document_'+test_item.id).innerHTML=docHTML;
			});
		});
		
		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(tests.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		hide_loader();
	});	
	
	var print_button=form.elements[5];
	print_tabular_report('report83','Testing Results',print_button);
};


/**
 * @reportNo 84
 * @report # Deliveries
 */
function report84_ini()
{
	show_loader();
	var form=document.getElementById('report84_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	
	var canvas_parent=$("#report84_canvas").parent();
	$("#report84_canvas").remove();
	$(canvas_parent).append("<canvas id='report84_canvas' class='report_sizing'></canvas>");
	
	var ctx = document.getElementById("report84_canvas").getContext("2d");
	
	var orders_data="<logistics_orders>" +
			"<id></id>" +
			"<delivery_person></delivery_person>" +
			"<import_date lowerbound='yes'>"+get_raw_time(start_date)+"</import_date>" +
			"<import_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</import_date>" +
			"</logistics_orders>";
	fetch_requested_data('report84',orders_data,function(orders)
	{
		for(var i=0;i<orders.length;i++)
		{
			orders[i].deliveries=1;
			for(var j=i+1;j<orders.length;j++)
			{
				if(orders[i].delivery_person==orders[j].delivery_person)
				{
					orders[i].deliveries+=1;
					orders.splice(j,1);
					j-=1;
				}
			}
		}

		for(var i=0;i<orders.length;i++)
		{
			if(orders[i].delivery_person=="")
			{
				orders[i].delivery_person="Unknown";
				break;
			}
		}

		var result=transform_to_bar_sum(orders,'# Deliveries','deliveries','delivery_person');
		var mybarchart = new Chart(ctx).Bar(result,{});
		document.getElementById("report84_legend").innerHTML=mybarchart.generateLegend();

		var print_button=form.elements[4];
		print_graphical_report('report84','# Deliveries',print_button,mybarchart);
		hide_loader();
	});
};

/**
 * @reportNo 85
 * @report # DRS
 */
function report85_ini()
{
	show_loader();
	var form=document.getElementById('report85_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	
	var canvas_parent=$("#report85_canvas").parent();
	$("#report85_canvas").remove();
	$(canvas_parent).append("<canvas id='report85_canvas' class='report_sizing'></canvas>");
	
	var ctx = document.getElementById("report85_canvas").getContext("2d");
	
	var drs_data="<drs>" +
			"<id></id>" +
			"<drs_num></drs_num>" +
			"<drs_time lowerbound='yes'>"+(get_raw_time(start_date)-1)+"</drs_time>" +
			"<drs_time upperbound='yes'>"+(get_raw_time(end_date)+86399999)+"</drs_time>" +
			"</drs>";
	fetch_requested_data('report85',drs_data,function(orders)
	{
		var drs_num_array="--";
		for(var i=0;i<orders.length;i++)
		{
			drs_num_array+=orders[i].drs_num+"--";
		}

		for(var i=0;i<orders.length;i++)
		{
			orders[i].drs_count=1;
			for(var j=i+1;j<orders.length;j++)
			{
				if(orders[i].drs_time==orders[j].drs_time)
				{
					orders[i].drs_count+=1;
					orders.splice(j,1);
					j-=1;
				}
			}
		}

		orders.sort(function(a,b)
		{
			if(parseFloat(a.drs_time)<parseFloat(b.drs_time))
				return -1;
			else
				return 1;
		});

		for(var i=0;i<orders.length;i++)
		{
			orders[i].drs_time=get_my_past_date(orders[i].drs_time);
		}

		var result=transform_to_bar_sum(orders,'# DRS','drs_count','drs_time');
		var mybarchart = new Chart(ctx).Bar(result,{});
		document.getElementById("report85_legend").innerHTML=mybarchart.generateLegend();

		var print_button=form.elements[4];
		print_graphical_report('report85','# DRS',print_button,mybarchart);
		
		var csv_button=form.elements[5];
		$(csv_button).off("click");
		$(csv_button).on("click", function(event)
		{
			var columns="<logistics_orders>"+
						"<id></id>"+
						"<awb_num></awb_num>"+
                        "<type></type>"+
                        "<order_num></order_num>"+
                        "<manifest_id></manifest_id>"+
                        "<merchant_name></merchant_name>"+
                        "<ship_to></ship_to>"+
                        "<address1></address1>"+
                        "<address2></address2>"+
                        "<city></city>"+
                        "<state></state>"+
                        "<pincode></pincode>"+
                        "<phone></phone>"+
                        "<telephone></telephone>"+
                        "<weight></weight>"+
                        "<declared_value></declared_value>"+
                        "<collectable_value></collectable_value>"+
                        "<vendor_code></vendor_code>"+
                        "<shipper_name></shipper_name>"+
                        "<return_address1></return_address1>"+
                        "<return_address2></return_address2>"+
                        "<return_address3></return_address3>"+
                        "<return_pincode></return_pincode>"+
                        "<len></len>"+
                        "<breadth></breadth>"+
                        "<height></height>"+
                        "<pieces></pieces>"+
                        "<carrier_account></carrier_account>"+
                        "<carrier_name></carrier_name>"+
                        "<manifest_type></manifest_type>"+
                        "<dispatch_date></dispatch_date>"+
                        "<import_date></import_date>"+
                        "<notes></notes>"+
                        "<pickup_location></pickup_location>"+
                        "<pickup_by></pickup_by>"+
                        "<sku></sku>"+
                        "<product_name></product_name>"+
                        "<status></status>"+
                        "<current_location></current_location>"+
                        "<delivery_person></delivery_person>"+
                        "<order_history></order_history>"+
                        "<comments></comments>"+
                        "<drs_time></drs_time>" +
                        "<drs_num array='yes'>"+drs_num_array+"</drs_num>"+
						"</logistics_orders>";
			get_export_data_restructured(columns,'drs_details',function(new_results)
			{
				var sorted_array=[];
				new_results.forEach(function(new_result)
				{
					var sorted_element=new Object();
					sorted_element['DRS No']=new_result.drs_num;
					if(new_result.drs_time!="" && new_result.drs_time!="NULL")
					{	
						sorted_element['DRS Date']=get_my_datetime(new_result.drs_time);
					}
					else 
					{
						sorted_element['DRS Date']="";
					}					
					sorted_element['Order Id']=new_result.order_num;
					sorted_element['AWB No']=new_result.awb_num;
					sorted_element['Wt']=new_result.weight;
					sorted_element['Pcs']=new_result.pieces;
					sorted_element['status']=new_result.status;
					sorted_element['Delivery Boy']=new_result.delivery_person;
					sorted_element['AWB Type']=new_result.manifest_type;
					sorted_element['Merchant']=new_result.merchant_name;
					sorted_element['Merchant Address']=new_result.return_address1+", "+new_result.return_address2+", "+new_result.return_address3;
					sorted_element['Mobile No']=new_result.phone;
					sorted_element['Product Name']=new_result.sku;
					
					if(new_result.drs_num!="")
					{
						sorted_array.push(sorted_element);
					}
				});
				return sorted_array;
			});
		});
		hide_loader();		
	});
};

/**
 * @reportNo 86
 * @report Sales Report (Modern)
 */
function report86_ini()
{
	var form=document.getElementById('report86_header');
	var item_filter=form.elements[1].value;
	var start_date=form.elements[2].value;
	var end_date=form.elements[3].value;
	
	show_loader();
	$('#report86_body').html('');	
	
	////indexing///
	var index_element=document.getElementById('report86_index');
	var prev_element=document.getElementById('report86_prev');
	var next_element=document.getElementById('report86_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var sales_data="<bill_items count='25' start_index='"+start_index+"'>" +
		"<id></id>"+
		"<item_name>"+item_filter+"</item_name>" +
		"<customer></customer>"+
		"<quantity></quantity>"+
		"<issue_type exact='yes'>out</issue_type>"+
		"<hiring_type exact='yes'>sale</hiring_type>"+		
		"<issue_date lowerbound='yes'>"+get_raw_time(start_date)+"</issue_date>" +
		"<issue_date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</issue_date>" +
		"</bill_items>";
	//console.log(orders_data);
	
	fetch_requested_data('report86',sales_data,function(items)
	{
		var rowsHTML="";
		items.forEach(function(item)
		{
			rowsHTML+="<tr>";
			rowsHTML+="<form id='report86_"+item.id+"'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+=item.item_name;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Date'>";
				rowsHTML+=get_my_past_date(item.issue_date);
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+=-parseFloat(item.quantity);
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+=item.customer;
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
		});
		$('#report86_body').append(rowsHTML);
		
		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(items.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		hide_loader();
	});
	
	var print_button=form.elements[5];
	print_tabular_report('report86','Sales',print_button);
};

/**
 * @reportNo 87
 * @report Delivery Run Report
 */
function report87_ini()
{
	show_loader();
	var form=document.getElementById('report87_header');
	var person=form.elements['person'].value;
	var start=get_raw_time(form.elements['start'].value);
	var end=get_raw_time(form.elements['end'].value);
	
	$('#report87_body').html('');
	$('#report87_foot').html('');

	var delivery_data="<delivery_run>" +
			"<person>"+person+"</person>" +
			"<total_run></total_run>" +
			"<date lowerbound='yes'>"+start+"</date>"+
			"<date upperbound='yes'>"+end+"</date>"+
			"</delivery_run>";
	
	fetch_requested_data('report87',delivery_data,function(deliveries)
	{
		var total_kms=0;
		deliveries.forEach(function(result)
		{	
			total_kms+=parseFloat(result.total_run);
			var rowsHTML="<tr>";
				rowsHTML+="<td data-th='Person'>";
					rowsHTML+=result.person;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Date'>";
					rowsHTML+=get_my_past_date(result.date);
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Kms'>";
					rowsHTML+=result.total_run+" kms";
				rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#report87_body').append(rowsHTML);
		});
		
		var total_row="<tr><td data-th='Total' colspan='2'>Total</td><td data-th='Total Kms'>"+total_kms+"Kms</td></tr>";
		$('#report87_foot').html(total_row);
		
		var print_button=form.elements[5];
		print_tabular_report('report87','Delivery Run Report',print_button);
		hide_loader();
	});
};

/**
 * @reportNo 88
 * @report Search Inventory
 */
function report88_ini()
{
	show_loader();
	var form=document.getElementById('report88_header');
	var keyword=form.elements['key'].value;
	var item=form.elements['name'].value;
	
	$('#report88_body').html('');

	var attribute_data="<attributes>" +
			"<name>"+item+"</name>" +
			"<type exact='yes'>product</type>" +
			"<value>"+keyword+"</value>"+
			"<attribute></attribute>"+
			"</attributes>";
	
	fetch_requested_data('report88',attribute_data,function(attributes)
	{
		for (var i=0;i<attributes.length;i++)
		{
			attributes[i].attribute_content=attributes[i].attribute+": "+attributes[i].value+"<br>";
			for(var j=i+1;j<attributes.length;j++)
			{
				if(attributes[i].name==attributes[j].name)
				{
					attributes[i].attribute_content+=attributes[j].attribute+": "+attributes[j].value+"<br>";
					attributes.splice(j,1);
					j-=1;
				}
			}
		}

		attributes.forEach(function(result)
		{
			var rowsHTML="<tr>";
				rowsHTML+="<td data-th='Item'>";
					rowsHTML+=result.name;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Details'>";
					rowsHTML+=result.attribute_content;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Inventory' id='report88_inventory_"+result.id+"'>";
				rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#report88_body').append(rowsHTML);
			
			get_inventory(result.name,'',function(inventory)
			{
				document.getElementById('report88_inventory_'+result.id).innerHTML=-parseFloat(inventory);
			});
		});
		
		var print_button=form.elements[4];
		print_tabular_report('report88','Inventory Report',print_button);
		hide_loader();
	});
};

/**
 * @reportNo 89
 * @report Deliveries by person
 */
function report89_ini()
{
	show_loader();
	var form=document.getElementById('report89_header');
	var person=form.elements['person'].value;
	var start_date=get_raw_time(form.elements['start'].value);
	var end_date=get_raw_time(form.elements['end'].value);
	
	$('#report89_body').html('');

	var deliveries_data="<logistics_orders>" +
			"<awb_num></awb_num>" +
			"<delivery_person></delivery_person>" +
			"<import_date lowerbound='yes'>"+start_date+"</import_date>"+
			"<import_date upperbound='yes'>"+end_date+"</import_date>"+
			"<order_history></order_history>"+
			"</logistics_orders>";
	
	fetch_requested_data('report89',deliveries_data,function(deliveries)
	{
		deliveries.forEach(function(result)
		{
			var order_history_object=JSON.parse(result.order_history);
			for(var i in order_history_object)
			{
				if(order_history_object[i].status=='delivered')
				{
					result.delivery_date=order_history_object[i].timeStamp;
					break;
				}
			}
			
			if(typeof result.delivery_date!='undefined')
			{
				var rowsHTML="<tr>";
					rowsHTML+="<td data-th='Person'>";
						rowsHTML+=result.delivery_person;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='AWB #'>";
						rowsHTML+=result.awb_num;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+=get_my_past_date(result.import_date);
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Delivery Date'>";
						rowsHTML+=get_my_past_date(result.delivery_date);
					rowsHTML+="</td>";
				rowsHTML+="</tr>";
			}

			$('#report89_body').append(rowsHTML);			
		});
		
		var print_button=form.elements[5];
		print_tabular_report('report89','Deliveries by person',print_button);
		hide_loader();
	});
};

/**
 * @reportNo 90
 * @report Order picklist
 */
function report90_ini()
{
	var form=document.getElementById('report90_header');
	var order_num=form.elements['order'].value;

	show_loader();
	
	$('#report90_body').html('');
	
	var items_data="<bill_items>" +
			"<id></id>"+
			"<item_name></item_name>" +
			"<item_desc></item_desc>"+
			"<batch></batch>" +
			"<quantity></quantity>"+
			"<picked_quantity></picked_quantity>"+
			"<storage></storage>"+
			"<picked_status exact='yes'>pending</picked_status>"+
			"<bill_id></bill_id>"+
			"</bill_items>";
	
	fetch_requested_data('report90',items_data,function(items)
	{
		var inventory_xml="<inventory_adjust>" +
					"<id></id>" +
					"<batch></batch>" +
					"<product_name></product_name>" +
					"<quantity></quantity>"+
					"<picked_quantity></picked_quantity>"+
					"<storage></storage>"+
					"<source_id></source_id>"+
					"<source exact='yes'>picking</source>"+
					"<picked_status exact='yes'>pending</picked_status>"+
					"</inventory_adjust>";
		
		fetch_requested_data('report90',inventory_xml,function(adjust_results)
		{
			items.forEach(function(item)
			{
				item.table_type='bill_items';
			});
		
			for(var z in adjust_results)
			{
				var adjust_item=new Object();
				adjust_item.item_name=adjust_results[z].product_name;
				adjust_item.batch=adjust_results[z].batch;
				adjust_item.quantity=-(parseFloat(adjust_results[z].quantity));
				adjust_item.storage=adjust_results[z].storage;
				adjust_item.id=adjust_results[z].id;
				adjust_item.table_type='inventory_adjust';
				adjust_item.picked_quantity=adjust_results[z].picked_quantity;
				adjust_item.bill_id=adjust_results[z].source_id;
				items.push(adjust_item);
			}
	
			var report90_count=0;
			
			items.forEach(function(item)
			{
				var picked_quantity=item.picked_quantity;
				if(item.picked_quantity=='null' || item.picked_quantity=='' || isNaN(item.picked_quantity))
				{
					picked_quantity=0;
				}
				
				report90_count+=1;
				
				var bills_data="<bills count='1'>"+
					"<id>"+item.bill_id+"</id>"+
					"<bill_num></bill_num>"+
					"<order_num></order_num>"+
					"<billing_type></billing_type>"+
					"<channel></channel>"+
					"</bills>";
				fetch_requested_data('',bills_data,function(bills)
				{
					report90_count-=1;
					if(bills.length>0)
					{
						if(bills[0].order_num==order_num || order_num=="")
						{
							var rowsHTML="<tr>";
								rowsHTML+="<form id='row_report90_"+item.id+"'></form>";
								rowsHTML+="<td data-th='Order' id='report90_order_"+item.id+"'>";
									rowsHTML+=bills[0].channel+" Order #: "+bills[0].order_num+"<br>"+bills[0].billing_type+" Invoice #: "+bills[0].bill_num;
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Item'>";
									rowsHTML+="<input type='text' readonly='readonly' form='row_report90_"+item.id+"' value='"+item.item_name+"'>";
									rowsHTML+="<br><textarea readonly='readonly' form='row_report90_"+item.id+"'>"+item.item_desc+"</textarea>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Batch'>";
									rowsHTML+="<input type='text' readonly='readonly' form='row_report90_"+item.id+"' value='"+item.batch+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Quantity'>";
									rowsHTML+="To Pick: <input type='number' readonly='readonly' form='row_report90_"+item.id+"' value='"+item.quantity+"'>";
									rowsHTML+="<br>Picked: <input readonly='readonly' type='number' form='row_report90_"+item.id+"' value='"+picked_quantity+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Storage'>";
									rowsHTML+="<input type='text' readonly='readonly' style='width:150px;' form='row_report90_"+item.id+"' value='"+item.storage+"'>";
									rowsHTML+="<img src='./images/edit.png' class='edit_icon' title='Edit Location' id='report90_edit_location_"+item.id+"'>";
									if(item.storage=='')
										rowsHTML+="<img src='./images/refresh.png' class='refresh_icon' title='Refresh Location Calculation' id='report90_refresh_location_"+item.id+"'>";
									rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' value='"+item.id+"'>";
									rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' value='"+item.table_type+"'>";
									rowsHTML+="<input type='submit' class='submit_hidden' form='row_report90_"+item.id+"'>";
									rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' name='order_num' value='"+bills[0].order_num+"'>";
									rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' name='bill_id' value='"+item.bill_id+"'>";
									rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' value='"+item.storage+"'>";
									rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' value='"+picked_quantity+"'>";									
									rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' value='"+item.id+"'>";
									rowsHTML+="</td>";
								rowsHTML+="</tr>";

							$('#report90_body').append(rowsHTML);
						
							
							var report90_form=document.getElementById('row_report90_'+item.id);
							var storage_filter=report90_form.elements[5];
			
							var edit_button=document.getElementById("report90_edit_location_"+item.id);
							$(edit_button).on('click',function ()
							{
								storage_filter.removeAttribute('readonly');
							});
			
							var refresh_button=document.getElementById("report90_refresh_location_"+item.id);
							$(refresh_button).on('click',function ()
							{
								var storage_xml="<area_utilization>"+
												"<name></name>"+
												"<item_name exact='yes'>"+item.item_name+"</item_name>"+
												"<batch exact='yes'>"+item.batch+"</batch>"+
												"</area_utilization>";											
								get_single_column_data(function (storages) 
								{										
									var storage_result_array=[];
									get_available_storage(item.item_name,item.batch,storages,item.quantity,storage_result_array,function () 
									{
										if(storage_result_array.length>0)
										{
											storage_filter.value=storage_result_array[0].storage;
											report90_update(report90_form);
										}
									});
								},storage_xml);
							});

							$(report90_form).on('submit',function (event) 
							{
								event.preventDefault();
								report90_update(report90_form);
							});
			
							var storage_data="<store_areas>"+
										"<name></name>"+
										//"<area_type exact='yes'>"+get_session_var('storage_level')+"</area_type>"+
										"<area_type></area_type>"+
										"</store_areas>";
							set_my_value_list(storage_data,storage_filter);
								
							$(storage_filter).on('click',function()
							{
								this.select();
							});
							}
					}
				});
			});

			var report90_complete=setInterval(function()
			{
		  	   if(report90_count===0)
		  	   {
					clearInterval(report90_complete);
					$('textarea').autosize();
					hide_loader();   
		  	   }
			},500);
		});		    
	});

	var print_button=form.elements['print'];
	print_tabular_report('report90','Order Picklist',print_button);
};

/**
 * @reportNo 91
 * @report Inventory (by brand)
 */
function report91_ini()
{
	show_loader();
	var form=document.getElementById('report91_header');
	var brand=form.elements['brand'].value;
	
	$('#report91_body').html('');

	var master_data="<product_master>" +
			"<name></name>" +
			"<description></description>"+
			"<make exact='yes'>"+brand+"</make>" +
			"</product_master>";
	
	fetch_requested_data('report91',master_data,function(products)
	{
		var report91_count=products.length;
		products.forEach(function(result)
		{
			var rowsHTML="<tr>";
				rowsHTML+="<td data-th='SKU'>";
					rowsHTML+=result.name;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Item Name'>";
					rowsHTML+=result.description;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Brand'>";
					rowsHTML+=result.make;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Inventory' id='report91_inventory_"+result.id+"'>";
				rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#report91_body').append(rowsHTML);
			
			get_inventory(result.name,'',function(inventory)
			{
				document.getElementById('report91_inventory_'+result.id).innerHTML=inventory;
				result.inventory=inventory;
				report91_count-=1;
			});
		});
		
		var report91_complete=setInterval(function()
		{
	  	   if(report91_count===0)
	  	   {
				clearInterval(report91_complete);
				hide_loader();	  		   
	  	   }
	     },1000);
	     
	    var print_button=form.elements['print'];
		print_tabular_report('report91','Inventory Report by Brand',print_button);

		var csv_button=form.elements['csv'];
		$(csv_button).off("click");
		$(csv_button).on("click", function(event)
		{
			var new_products=[];
			products.forEach(function(product)
			{
				var new_product=new Object();
				new_product.sku=product.name;
				new_product.description=product.description;
				new_product.make=product.make;
				new_product.inventory=product.inventory;
				new_products.push(new_product);
			});
			csv_download_report(new_products,'Brand_wise_inventory');
		});
	});
	
};