/**
 * @reportNo 1
 * @report Signage Changes
 */
function report1_ini()
{
	var form=document.getElementById('report1_header');
	var date_since=form.elements[1].value;
	var product_filter=form.elements[2].value;

	$('#report1_body').html('');

	/////appending new arrivals details
	var product_data="<supplier_bill_items>" +
			"<product_name>"+product_filter+"</product_name>" +
			"<bill_id></bill_id>" +
			"<last_updated compare='more than'>"+get_raw_time(date_since)+"</last_updated>" +
			"</supplier_bill_items>";
	
	get_single_column_data(function(products)
	{
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
				
				var sup_bill_data="<supplier_bills>" +
						"<bill_id array='yes'>"+sup_bill_id_array+"</bill_id>" +
						"<entry_date compare='less than'>"+get_raw_time(date_since)+"</entry_date>" +
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
							var areas_string="--";
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
			"<last_updated compare='more than'>"+get_raw_time(date_since)+"</last_updated>" +
			"</offers>";
	
	fetch_requested_data('report1',offer_data,function(offers)
	{
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

			});
		});
	});
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
	$(canvas_parent).append("<canvas id='report4_canvas' class='report_sizing'><canvas>");
	
	var ctx = document.getElementById("report4_canvas").getContext("2d");
	var modes_data="<payments>" +
			"<mode></mode>" +
			"<paid_amount></paid_amount>" +
			"<date compare='more than'>"+get_raw_time(start_date)+"</date>" +
			"<date compare='less than'>"+get_raw_time(end_date)+"</date>" +
			"<status>closed</status>" +
			"<type>received</type>" +
			"</payments>";

	fetch_requested_data('report4',modes_data,function(modes)
	{
		var result=transform_to_pie_sum(modes,'paid_amount','mode');
		var mydoughchart = new Chart(ctx).Doughnut(result,{});
		document.getElementById("report4_legend").innerHTML=mydoughchart.generateLegend();
		
	   var print_button=form.elements[4];
	   $(print_button).off('click');
	   $(print_button).on('click',function(event)
	   {
		   var container=document.createElement('div');
		   var title=document.createElement('div');
		   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Modes of Payment</b></div>";
		   var legend=document.createElement('div');
		   legend.innerHTML="<b>Legend<div style='display: block;'>"+mydoughchart.generateLegend();+"</div></b>";
		   var report_image=document.createElement('img');
		   report_image.setAttribute('src',mydoughchart.toBase64Image());

		   container.appendChild(title);
		   container.appendChild(legend);
		   container.appendChild(report_image);
		   $.print(container);
	   });

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
		"<type>customer</type>" +
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
				"<status>pending</status>" +
				"</payments>";
		fetch_requested_data('report5',payments_data,function(payments)
		{
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
					bill_ids_string=bill_ids_string.substr(0,(bill_ids_string.length-2));
					
					var rowsHTML="<tr>";
						rowsHTML+="<td data-th='Customer'>";
							rowsHTML+=result.acc_name;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Account Balance'>";
							rowsHTML+=balance_amount;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Bill Ids'>";
							rowsHTML+=bill_ids_string;
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
					
					$('#report5_body').append(rowsHTML);
				}
			});
			
			var print_button=form.elements[4];
			$(print_button).off('click');
			$(print_button).on('click',function(event)
			{
			   var container=document.createElement('div');
			   var title=document.createElement('div');
			   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Customer Account Balance</b></div>";
			   var table_element=document.getElementById('report5_body').parentNode;
			   var table_copy=table_element.cloneNode(true);
			   container.appendChild(title);
			   container.appendChild(table_copy);
			   $.print(container);
			});
			
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
	$(canvas_parent).append("<canvas id='report6_canvas' class='report_sizing'><canvas>");
	
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
				"<due_date compare='less than'>"+get_raw_time(due_date)+"</due_date>" +
				"<status>pending</status>" +
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
			$(print_button).off('click');
			$(print_button).on('click',function(event)
			{
  			   var container=document.createElement('div');
  			   var title=document.createElement('div');
  			   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Payments Due from Customers</b></div>";
  			   var legend=document.createElement('div');
  			   legend.innerHTML="<b>Legend<div style='display: block;'>"+mybarchart.generateLegend();+"</div></b>";
  			   var report_image=document.createElement('img');
  			   report_image.setAttribute('src',mybarchart.toBase64Image());

  			   container.appendChild(title);
  			   container.appendChild(legend);
  			   container.appendChild(report_image);
  			   $.print(container);
			});

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
	var date=form.elements[4].value;
	
	show_loader();
	$('#report9_body').html('');
	var rowsHTML="";
	
	var bills_data="<bills>" +
			"<id></id>" +
			"<customer_name>"+customer+"</customer_name>" +
			"<bill_date compare='more than'>"+get_raw_time(date)+"</bill_date>" +
			"</bills>";
	
	fetch_requested_data('report9',bills_data,function(bills)
	{
		var bills_string="--";
		for(var i in bills)
		{
			bills_string+=bills[i].id+"--";
		}
		
		var bill_items_data="<bill_items>" +
				"<bill_id array='yes'>"+bills_string+"</bill_id>" +
				"<item_name>"+name+"</item_name>" +
				"<quantity></quantity>" +
				"<amount></amount>" +
				"</bill_items>";
		
		fetch_requested_data('report9',bill_items_data,function(bill_ids)
		{
			var product_string="--";
			for(var j in bill_ids)
			{
				product_string+=bill_ids[j].item_name+"--";
			}
			var make_data="<product_master>" +
					"<name array='yes'>"+product_string+"</name>" +
					"<make>"+make+"</make>" +
					"</product_master>";

			fetch_requested_data('report9',make_data,function(makes)
			{
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
									rowsHTML+=bill_ids[k].amount;
								rowsHTML+="</td>";
							rowsHTML+="</tr>";
							break;
						}
					}
				}
				$('#report9_body').html(rowsHTML);
				
				var print_button=form.elements[6];
				$(print_button).off('click');
				$(print_button).on('click',function(event)
				{
				   var container=document.createElement('div');
				   var title=document.createElement('div');
				   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Product Sales report</b></div>";
				   var table_element=document.getElementById('report9_body').parentNode;
				   var table_copy=table_element.cloneNode(true);
				   container.appendChild(title);
				   container.appendChild(table_copy);
				   $.print(container);
				});
				
				hide_loader();
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
	$(canvas_parent).append("<canvas id='report14_canvas' class='report_sizing'><canvas>");
	
	var ctx = document.getElementById("report14_canvas").getContext("2d");

	var accounts_data="<accounts>" +
			"<acc_name>"+account_name+"</acc_name>" +
			"<type>financial</type>" +
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
					"<date compare='more than'>"+get_raw_time(start_date)+"</date>" +
					"<date compare='less than'>"+get_raw_time(end_date)+"</date>" +
					"<status array='yes'>--pending--closed--</status>" +
					"<type>paid</type>" +
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
				$(print_button).off('click');
				$(print_button).on('click',function(event)
				{
		  			   var container=document.createElement('div');
		  			   var title=document.createElement('div');
		  			   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Expenses by Period</b></div>";
		  			   var legend=document.createElement('div');
		  			   legend.innerHTML="<b>Legend<div style='display: block;'>"+mybarchart.generateLegend();+"</div></b>";
		  			   var report_image=document.createElement('img');
		  			   report_image.setAttribute('src',mybarchart.toBase64Image());

		  			   container.appendChild(title);
		  			   container.appendChild(legend);
		  			   container.appendChild(report_image);
		  			   $.print(container);
				});

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
	$(canvas_parent).append("<canvas id='report15_canvas' class='report_sizing'><canvas>");
	var ctx = document.getElementById("report15_canvas").getContext("2d");
	
	var payments_data="<payments>" +
			"<total_amount></total_amount>" +
			"<paid_amount></paid_amount>" +
			"<status array='yes'>--pending--closed--</status>" +
			"<date compare='more than'>"+get_raw_time(start_date)+"</date>" +
			"<date compare='less than'>"+get_raw_time(end_date)+"</date>" +
			"<type></type>" +
			"</payments>";
	var tax_data="<transactions>" +
			"<tax></tax>" +
			"<trans_date compare='more than'>"+get_raw_time(start_date)+"</trans_date>" +
			"<trans_date compare='less than'>"+get_raw_time(end_date)+"</trans_date>" +
			"</transactions>";
			
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
			var mybarchart = new Chart(ctx).Bar(result,{});
			document.getElementById("report15_legend").innerHTML=mybarchart.generateLegend();
			
			var print_button=form.elements[4];
			$(print_button).off('click');
			$(print_button).on('click',function(event)
			{
	  			   var container=document.createElement('div');
	  			   var title=document.createElement('div');
	  			   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Financial Summary</b></div>";
	  			   var legend=document.createElement('div');
	  			   legend.innerHTML="<b>Legend<div style='display: block;'>"+mybarchart.generateLegend();+"</div></b>";
	  			   var report_image=document.createElement('img');
	  			   report_image.setAttribute('src',mybarchart.toBase64Image());

	  			   container.appendChild(title);
	  			   container.appendChild(legend);
	  			   container.appendChild(report_image);
	  			   $.print(container);
			});

			hide_loader();
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
			"<status>active</status>" +
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
				"<date compare='more than'>"+(get_raw_time(from_date)-10000)+"</date>" +
				"<date compare='less than'>"+(get_raw_time(to_date)+10000)+"</date>" +
				"</attendance>";
		
		fetch_requested_data('report17',attendance_data,function(attendances)
		{
			var task_instances_data="<task_instances>" +
						"<assignee array='yes'>"+employees_string+"</assignee>" +
						"<last_updated compare='more than'>"+(get_raw_time(from_date)-10000)+"</last_updated>" +
						"<last_updated compare='less than'>"+(get_raw_time(to_date)+10000)+"</last_updated>" +
						"<task_hours></task_hours>" +
						"<status>completed</status>" +
						"</task_instances>";
			fetch_requested_data('report17',task_instances_data,function(tasks)
			{
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
				
					rowsHTML+="<tr>";
						rowsHTML+="<td data-th='Staff Name'>";
							rowsHTML+=acc_name;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Number of Tasks'>";
							rowsHTML+=num_tasks;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Number of Task Hours'>";
							rowsHTML+=task_hours;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Number of Absence'>";
							rowsHTML+=absents;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Number of hours worked'>";
							rowsHTML+=hours;
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
				});
				$('#report17_body').html(rowsHTML);
				
				var print_button=form.elements[5];
				$(print_button).off('click');
				$(print_button).on('click',function(event)
				{
				   var container=document.createElement('div');
				   var title=document.createElement('div');
				   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Staff Performance</b></div>";
				   var table_element=document.getElementById('report17_body').parentNode;
				   var table_copy=table_element.cloneNode(true);
				   container.appendChild(title);
				   container.appendChild(table_copy);
				   $.print(container);
				});
				
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
	$(canvas_parent).append("<canvas id='report26_canvas' class='report_sizing'><canvas>");
	
	var ctx = document.getElementById("report26_canvas").getContext("2d");
	var sales_data="<bills>" +
			"<total sort='desc'></total>" +
			"<customer_name>"+customer+"</customer_name>" +
			"<bill_date compare='more than'>"+get_raw_time(start_date)+"</bill_date>" +
			"<bill_date compare='less than'>"+get_raw_time(end_date)+"</bill_date>" +
			"</bills>";

	fetch_requested_data('report26',sales_data,function(sales)
	{
		var result=transform_to_bar_sum(sales,'Bill Total','total','customer_name');
		var mybarchart = new Chart(ctx).Bar(result,{});
		document.getElementById("report26_legend").innerHTML=mybarchart.generateLegend();
		
		var print_button=form.elements[5];
		$(print_button).off('click');
		$(print_button).on('click',function(event)
		{
  			   var container=document.createElement('div');
  			   var title=document.createElement('div');
  			   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Sales by Customers</b></div>";
  			   var legend=document.createElement('div');
  			   legend.innerHTML="<b>Legend<div style='display: block;'>"+mybarchart.generateLegend();+"</div></b>";
  			   var report_image=document.createElement('img');
  			   report_image.setAttribute('src',mybarchart.toBase64Image());

  			   container.appendChild(title);
  			   container.appendChild(legend);
  			   container.appendChild(report_image);
  			   $.print(container);
		});

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
	$(canvas_parent).append("<canvas id='report27_canvas' class='report_sizing'><canvas>");
	var ctx = document.getElementById("report27_canvas").getContext("2d");
	
	var product_data="<product_instances>" +
			"<product_name>"+product_name+"</product_name>" +
			"<batch></batch>" +
			"<expiry compare='less than'>"+get_raw_time(expiry_date)+"</expiry>" +
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
	  		   $(print_button).off('click');
	  		   $(print_button).on('click',function(event)
	  			{
	  			   var container=document.createElement('div');
	  			   var title=document.createElement('div');
	  			   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Expiring Inventory</b></div>";
	  			   var legend=document.createElement('div');
	  			   legend.innerHTML="<b>Legend<div style='display: block;'>"+mybarchart.generateLegend();+"</div></b>";
	  			   var report_image=document.createElement('img');
	  			   report_image.setAttribute('src',mybarchart.toBase64Image());

	  			   container.appendChild(title);
	  			   container.appendChild(legend);
	  			   container.appendChild(report_image);
	  			   $.print(container);
				});

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
	show_loader();
	var form=document.getElementById('report28_header');
	var num_days=parseInt(form.elements[1].value);
	var product=form.elements[2].value;
	var raw_time=get_my_time()-(num_days*86400000);
	
	var canvas_parent=$("#report28_canvas").parent();
	$("#report28_canvas").remove();
	$(canvas_parent).append("<canvas id='report28_canvas' class='report_sizing'><canvas>");
	var ctx = document.getElementById("report28_canvas").getContext("2d");
	//ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
	
	var bills_data="<bills>" +
			"<id></id>" +
			"<bill_date compare='more than'>"+raw_time+"</bill_date>" +
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
				"<item_name></item_name>" +
				"</bill_items>";
		fetch_requested_data('report28',sales_data,function(sales_array)
		{
			var sales_array_result=new Array();
			for(var k=0; k<sales_array.length;k++)
			{
				var new_obj=new Object();
				new_obj.item_name=sales_array[k].item_name;
				new_obj.quantity=parseInt(sales_array[k].quantity);
				for(var j=k+1;j<sales_array.length;j++)
				{
					if(sales_array[j].item_name==new_obj.item_name)
					{
						new_obj.quantity+=parseInt(sales_array[j].quantity);
						sales_array.splice(j,1);
						j-=1;
					}
				}
				sales_array_result.push(new_obj);
			}
			
			///modify sales_array_result as per search criteria
			if(product!="")
			{
				var this_product_sales=new Object;
				this_product_sales.item_name=product;
				this_product_sales.quantity=0;
				for (var l in sales_array_result)
				{
					if(sales_array_result[l].item_name===product)
					{
						this_product_sales.quantity=sales_array_result[l].quantity;
						break;
					}
				}
				sales_array_result=[this_product_sales];
			}
			else
			{
				sales_array_result.sort(function(a,b)
				{
					if(a.quantity<b.quantity)
					{	return 1;}
					else 
					{	return -1;}
				});
			}
			
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
			result.datasets[1].strokeColor=result.datasets[0].fillColor;
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
					if((value0<=value1 && result.labels.length<11) || product!="")
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
		  		   document.getElementById("report28_legend").innerHTML=mybarchart.generateLegend();
		  		   
		  		   var print_button=form.elements[4];
					$(print_button).off('click');
					$(print_button).on('click',function(event)
					{
			  			   var container=document.createElement('div');
			  			   var title=document.createElement('div');
			  			   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Short Inventory</b></div>";
			  			   var legend=document.createElement('div');
			  			   legend.innerHTML="<b>Legend<div style='display: block;'>"+mybarchart.generateLegend();+"</div></b>";
			  			   var report_image=document.createElement('img');
			  			   report_image.setAttribute('src',mybarchart.toBase64Image());

			  			   container.appendChild(title);
			  			   container.appendChild(legend);
			  			   container.appendChild(report_image);
			  			   $.print(container);
					});

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
				"<type>product</type>" +
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
			$(print_button).off('click');
			$(print_button).on('click',function(event)
			{
			   var container=document.createElement('div');
			   var title=document.createElement('div');
			   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Pre-requisites for products</b></div>";
			   var table_element=document.getElementById('report29_body').parentNode;
			   var table_copy=table_element.cloneNode(true);
			   container.appendChild(title);
			   container.appendChild(table_copy);
			   $.print(container);
			});
			
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
	$(canvas_parent).append("<canvas id='report30_canvas' class='report_sizing'><canvas>");
	
	var ctx = document.getElementById("report30_canvas").getContext("2d");
	var task_data="<task_instances>" +
			"<assignee></assignee>" +
			"<last_updated compare='more than'>"+get_raw_time(start_date)+"</last_updated>" +
			"<last_updated compare='less than'>"+get_raw_time(end_date)+"</last_updated>" +
			"<status>completed</status>" +
			"</task_instances>";

	fetch_requested_data('report30',task_data,function(tasks)
	{
		var result=transform_to_pie_count(tasks,'assignee');
		var mydoughchart = new Chart(ctx).Doughnut(result,{});
		document.getElementById("report30_legend").innerHTML=mydoughchart.generateLegend();
		
		var print_button=form.elements[4];
		$(print_button).off('click');
		$(print_button).on('click',function(event)
		{
  			   var container=document.createElement('div');
  			   var title=document.createElement('div');
  			   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Tasks performed by Staff</b></div>";
  			   var legend=document.createElement('div');
  			   legend.innerHTML="<b>Legend<div style='display: block;'>"+mybarchart.generateLegend();+"</div></b>";
  			   var report_image=document.createElement('img');
  			   report_image.setAttribute('src',mybarchart.toBase64Image());

  			   container.appendChild(title);
  			   container.appendChild(legend);
  			   container.appendChild(report_image);
  			   $.print(container);
		});

		hide_loader();
	});
};


/**
 * @report Customer Maps by credit
 * @reportNo 31
 */
function report31_ini()
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
			"<street></street>" +
			"<city></city>" +
			"<state></state>" +
			"<country></country>" +
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
				"<status>pending</status>" +
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

/**
 * @report Staff Maps
 * @reportNo 32
 */
function report32_ini()
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
			"<street></street>" +
			"<city></city>" +
			"<state></state>" +
			"<country></country>" +
			"<status>active</status>" +
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


/**
 * @report Supplier Maps by debit
 * @reportNo 33
 */
function report33_ini()
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
			"<street></street>" +
			"<city></city>" +
			"<state></state>" +
			"<country></country>" +
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
				"<status>pending</status>" +
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
	$(canvas_parent).append("<canvas id='report34_canvas' class='report_sizing'><canvas>");
	var ctx = document.getElementById("report34_canvas").getContext("2d");
	
	var payments_data="<payments>" +
			"<total_amount></total_amount>" +
			"<paid_amount></paid_amount>" +
			"<date compare='more than'>"+get_raw_time(start_date)+"</date>" +
			"<date compare='less than'>"+get_my_time(end_date)+"</date>" +
			"<type></type>" +
			"<status array='yes'>--pending--closed--</status>" +
			"</payments>";

	fetch_requested_data('report34',payments_data,function(payments)
	{
		var tax_data="<transactions>" +
				"<tax></tax>" +
				"<trans_date compare='more than'>"+get_raw_time(start_date)+"</trans_date>" +
				"<trans_date compare='less than'>"+get_my_time(end_date)+"</trans_date>" +
				"</transactions>";
		get_single_column_data(function(taxes)
		{
			var bills_data="<bills>" +
					"<id></id>" +
					"<bill_date compare='more than'>"+get_raw_time(start_date)+"</bill_date>" +
					"<bill_date compare='less than'>"+get_raw_time(end_date)+"</bill_date>" +
					"</bills>";
			get_single_column_data(function(bills)
			{
				console.log(bills);
				var bill_id_string="--";
				for(var i in bills)
				{
					bill_id_string+=bills[i]+"--";
				}
			
				var supplier_bills_data="<supplier_bills>" +
						"<id></id>" +
						"<bill_date compare='more than'>"+get_raw_time(start_date)+"</bill_date>" +
						"<bill_date compare='less than'>"+get_raw_time(end_date)+"</bill_date>" +
						"</supplier_bills>";
				get_single_column_data(function(supplier_bills)
				{
					console.log(supplier_bills);
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
							"</bill_items>";
					fetch_requested_data('report34',bill_items_data,function(bill_ids)
					{
						console.log(bill_ids);
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
									"<cost_price sort='desc'></cost_price>" +
									"</product_instances>";
							
							fetch_requested_data('report34',products_data,function(products)
							{
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
											inventory_amount-=parseFloat(bill_ids[a].quantity)*parseFloat(products[b].cost_price);
											break;
										}
									}
								}
								
								for(var a in sup_bill_ids)
								{
									for(var b in products)
									{
										if(sup_bill_ids[a].item_name==products[b].product_name)
										{
											inventory_amount+=parseFloat(sup_bill_ids[a].quantity)*parseFloat(products[b].cost_price);
											break;
										}
									}
								}
								console.log(inventory_amount);
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
					  		   	var margin=((received_amount-expenses_amount-tax_amount+inventory_amount)/received_amount)*100;
					  		   	document.getElementById("report34_margin").value=margin+"%";
					  		   	
					  		    var print_button=form.elements[5];
								$(print_button).off('click');
								$(print_button).on('click',function(event)
								{
						  			   var container=document.createElement('div');
						  			   var title=document.createElement('div');
						  			   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Effective Margin = "+margin+"%</b></div>";
						  			   var legend=document.createElement('div');
						  			   legend.innerHTML="<b>Legend<div style='display: block;'>"+mybarchart.generateLegend();+"</div></b>";
						  			   var report_image=document.createElement('img');
						  			   report_image.setAttribute('src',mybarchart.toBase64Image());

						  			   container.appendChild(title);
						  			   container.appendChild(legend);
						  			   container.appendChild(report_image);
						  			   $.print(container);
								});

					  		   	
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
			"<item_name>"+product_name+"</item_name>" +
			"</bill_items>";
	
	get_single_column_data(function(bill_ids)
	{
		var bill_id_array="--";
		for(var y in bill_ids)
		{
			bill_id_array+=bill_ids[y]+"--";
		}
		
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
					"<street></street>" +
					"<city></city>" +
					"<state></state>" +
					"<country></country>" +
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


/**
 * @report Supplier Maps by products supplied
 * @reportNo 36
 */
function report36_ini()
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
			"<product_name>"+product_name+"</product_name>" +
			"</supplier_bill_items>";
	
	get_single_column_data(function(bill_ids)
	{
		var bill_id_array="--";
		for(var y in bill_ids)
		{
			bill_id_array+=bill_ids[y]+"--";
		}
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
					"<street></street>" +
					"<city></city>" +
					"<state></state>" +
					"<country></country>" +
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
	$(canvas_parent).append("<canvas id='report37_canvas' class='report_sizing'><canvas>");
	
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
				"<due_date compare='less than'>"+get_raw_time(due_date)+"</due_date>" +
				"<status>pending</status>" +
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
					result.datasets[0].data.push(value);
				}
			}
	
			var mybarchart = new Chart(ctx).Bar(result,{});
			document.getElementById("report37_legend").innerHTML=mybarchart.generateLegend();
			
			var print_button=form.elements[4];
			$(print_button).off('click');
			$(print_button).on('click',function(event)
			{
	  			   var container=document.createElement('div');
	  			   var title=document.createElement('div');
	  			   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Payments Due to Suppliers</b></div>";
	  			   var legend=document.createElement('div');
	  			   legend.innerHTML="<b>Legend<div style='display: block;'>"+mybarchart.generateLegend();+"</div></b>";
	  			   var report_image=document.createElement('img');
	  			   report_image.setAttribute('src',mybarchart.toBase64Image());

	  			   container.appendChild(title);
	  			   container.appendChild(legend);
	  			   container.appendChild(report_image);
	  			   $.print(container);
			});

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
	$(canvas_parent).append("<canvas id='report38_canvas' class='report_sizing'><canvas>");
	
	var ctx = document.getElementById("report38_canvas").getContext("2d");
	var bills_data="<bills>" +
			"<id></id>" +
			"<bill_date compare='more than'>"+get_raw_time(start_date)+"</bill_date>" +
			"<bill_date compare='less than'>"+get_raw_time(end_date)+"</bill_date>" +
			"</bills>";

	get_single_column_data(function(bill_ids)
	{
		var products_data="<product_master>" +
				"<name></name>" +
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
					"<total></total>" +
					"<item_name array='yes'>"+products_array+"</item_name>" +
					"<last_updated sort='desc'></last_updated>" +
					"</bill_items>";
			fetch_requested_data('report38',products_data,function(product_array)
			{
				var result=transform_to_bar_sum(product_array,'Total Amount','total','item_name');
				var mybarchart = new Chart(ctx).Bar(result,{});
				document.getElementById("report38_legend").innerHTML=mybarchart.generateLegend();
				
				var print_button=form.elements[5];
				$(print_button).off('click');
				$(print_button).on('click',function(event)
				{
		  			   var container=document.createElement('div');
		  			   var title=document.createElement('div');
		  			   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Sales by Products</b></div>";
		  			   var legend=document.createElement('div');
		  			   legend.innerHTML="<b>Legend<div style='display: block;'>"+mybarchart.generateLegend();+"</div></b>";
		  			   var report_image=document.createElement('img');
		  			   report_image.setAttribute('src',mybarchart.toBase64Image());

		  			   container.appendChild(title);
		  			   container.appendChild(legend);
		  			   container.appendChild(report_image);
		  			   $.print(container);
				});

				
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
	$(canvas_parent).append("<canvas id='report39_canvas' class='report_sizing'><canvas>");
	
	var ctx = document.getElementById("report39_canvas").getContext("2d");
	
	var bills_data="<bills>" +
			"<id></id>" +
			"<bill_date compare='more than'>"+get_raw_time(start_date)+"</bill_date>" +
			"<bill_date compare='less than'>"+get_raw_time(end_date)+"</bill_date>" +
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
					"<total sort='desc'></total>" +
					"<item_name array='yes'>"+services_array+"</item_name>" +
					"</bill_items>";
			fetch_requested_data('report39',services_data,function(service_array)
			{
				var result=transform_to_bar_sum(service_array,'Total Amount','total','item_name');
				var mybarchart = new Chart(ctx).Bar(result,{});
				document.getElementById("report39_legend").innerHTML=mybarchart.generateLegend();
				
				var print_button=form.elements[5];
				$(print_button).off('click');
				$(print_button).on('click',function(event)
				{
		  			   var container=document.createElement('div');
		  			   var title=document.createElement('div');
		  			   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Sales by Services</b></div>";
		  			   var legend=document.createElement('div');
		  			   legend.innerHTML="<b>Legend<div style='display: block;'>"+mybarchart.generateLegend();+"</div></b>";
		  			   var report_image=document.createElement('img');
		  			   report_image.setAttribute('src',mybarchart.toBase64Image());

		  			   container.appendChild(title);
		  			   container.appendChild(legend);
		  			   container.appendChild(report_image);
		  			   $.print(container);
				});

				
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
	$(canvas_parent).append("<canvas id='report40_canvas' class='report_sizing'><canvas>");
	var ctx = document.getElementById("report40_canvas").getContext("2d");
	
	var bills_data="<bills>" +
			"<id></id>" +
			"<bill_date compare='more than'>"+raw_time+"</bill_date>" +
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
				"<item_name></item_name>" +
				"</bill_items>";
		fetch_requested_data('report40',sales_data,function(sales_array)
		{
			var sales_array_result=new Array();
			for(var k=0; k<sales_array.length;k++)
			{
				var new_obj=new Object();
				new_obj.item_name=sales_array[k].item_name;
				new_obj.quantity=parseInt(sales_array[k].quantity);
				for(var j=k+1;j<sales_array.length;j++)
				{
					if(sales_array[j].item_name==new_obj.item_name)
					{
						new_obj.quantity+=parseInt(sales_array[j].quantity);
						sales_array.splice(j,1);
						j-=1;
					}
				}
				sales_array_result.push(new_obj);
			}
			
			///modify sales_array_result as per search criteria
			if(product!="")
			{
				var this_product_sales=new Object;
				this_product_sales.item_name=product;
				this_product_sales.quantity=0;
				for (var l in sales_array_result)
				{
					if(sales_array_result[l].item_name===product)
					{
						this_product_sales.quantity=sales_array_result[l].quantity;
						break;
					}
				}
				sales_array_result=[this_product_sales];
			}
			else
			{
				sales_array_result.sort(function(a,b)
				{
					if(a.quantity<b.quantity)
					{	return 1;}
					else 
					{	return -1;}
				});
			}
			
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
			result.datasets[1].strokeColor=result.datasets[0].fillColor;
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
					if((value0>=value1 && result.labels.length<11) || product!="")
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
					$(print_button).off('click');
					$(print_button).on('click',function(event)
					{
			  			   var container=document.createElement('div');
			  			   var title=document.createElement('div');
			  			   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Surplus Inventory</b></div>";
			  			   var legend=document.createElement('div');
			  			   legend.innerHTML="<b>Legend<div style='display: block;'>"+mybarchart.generateLegend();+"</div></b>";
			  			   var report_image=document.createElement('img');
			  			   report_image.setAttribute('src',mybarchart.toBase64Image());

			  			   container.appendChild(title);
			  			   container.appendChild(legend);
			  			   container.appendChild(report_image);
			  			   $.print(container);
					});

		  		   
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
				"<type>service</type>" +
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
			$(print_button).off('click');
			$(print_button).on('click',function(event)
			{
			   var container=document.createElement('div');
			   var title=document.createElement('div');
			   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Pre-requisites for Services</b></div>";
			   var table_element=document.getElementById('report41_body').parentNode;
			   var table_copy=table_element.cloneNode(true);
			   container.appendChild(title);
			   container.appendChild(table_copy);
			   $.print(container);
			});
			
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
			"<date compare='more than'>"+get_raw_time(start_date)+"</date>" +
			"<date compare='less than'>"+get_raw_time(end_date)+"</date>" +
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
		$(print_button).off('click');
		$(print_button).on('click',function(event)
		{
		   var container=document.createElement('div');
		   var title=document.createElement('div');
		   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Feedback</b></div>";
		   var table_element=document.getElementById('report42_body').parentNode;
		   var table_copy=table_element.cloneNode(true);
		   container.appendChild(title);
		   container.appendChild(table_copy);
		   $.print(container);
		});
		
		hide_loader();
	});	
};

/**
 * @reportNo 43
 * @report Change in customer behavior
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
	$(canvas_parent).append("<canvas id='report43_canvas' class='report_sizing'><canvas>");
	var ctx = document.getElementById("report43_canvas").getContext("2d");
	
	var p1_bills_data="<bills>" +
			"<id></id>" +
			"<customer_name>"+customer+"</customer_name>" +
			"<total></total>" +
			"<bill_date compare='more than'>"+get_raw_time(p1_start_date)+"</bill_date>" +
			"<bill_date compare='less than'>"+get_raw_time(p1_end_date)+"</bill_date>" +
			"</bills>";
	fetch_requested_data('report43',p1_bills_data,function(p1_bills)
	{
		var p2_bills_data="<bills>" +
				"<id></id>" +
				"<customer_name>"+customer+"</customer_name>" +
				"<total></total>" +
				"<bill_date compare='more than'>"+get_raw_time(p2_start_date)+"</bill_date>" +
				"<bill_date compare='less than'>"+get_raw_time(p2_end_date)+"</bill_date>" +
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
			result.datasets[1].strokeColor=result.datasets[0].fillColor;
			result.datasets[1].highlightFill=getLighterColor(result.datasets[1].fillColor);
			result.datasets[1].highlightStroke=getLighterColor(result.datasets[1].fillColor);
			result.datasets[1].data=new Array();
			
			result.labels=new Array();
	
			for(var i=0; i<p1_bills.length;i++)
			{
				for(var j=i+1; j<p1_bills.length;j++)
				{
					if(p1_bills[i].customer_name==p1_bills[j].customer_name)
					{
						p1_bills[i].total=parseFloat(p1_bills[i].total)+parseFloat(p1_bills[j].total);
						p1_bills.splice(j,1);
					}
				}
			}
			
			for(var i=0; i<p2_bills.length;i++)
			{
				for(var j=i+1; j<p2_bills.length;j++)
				{
					if(p2_bills[i].customer_name==p2_bills[j].customer_name)
					{
						p2_bills[i].total=parseFloat(p2_bills[i].total)+parseFloat(p2_bills[j].total);
						p2_bills.splice(j,1);
					}
				}
			}

			p1_bills.sort(function(a,b)
			{
				if(parseFlaot(a.total)<parseFloat(b.total))
				{	return 1;}
				else 
				{	return -1;}
			});
			
			p2_bills.sort(function(a,b)
			{
				if(parseFlaot(a.total)<parseFloat(b.total))
				{	return 1;}
				else 
				{	return -1;}
			});

			for(var k=0; k<p1_bills.length;k++)
			{
				if(result.labels.length<11)
				{
					result.labels.push(p1_bills[k].customer_name);
					result.datasets[0].data.push(p1_bills[k].total);
					var p2_sale=0;
					for(var l=0;l<p2_bills.length;l++)
					{
						if(p1_bills[k].customer_name===p2_bills[l].customer_name)
						{
							p2_sale=p2_bills[l].total;
							p2_bills.splice(l,1);
							break;
						}
					}
					result.datasets[1].data.push(p2_sale);
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
					result.datasets[1].data.push(p2_bills[m].total);
				}
				else
				{
					break;
				}
			}

  		   var mybarchart = new Chart(ctx).Bar(result,{});
  		   document.getElementById("report43_legend").innerHTML=mybarchart.generateLegend();
  		   
  		   var print_button=form.elements[7];
			$(print_button).off('click');
			$(print_button).on('click',function(event)
			{
	  			   var container=document.createElement('div');
	  			   var title=document.createElement('div');
	  			   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Change in Customer Purchasing</b></div>";
	  			   var legend=document.createElement('div');
	  			   legend.innerHTML="<b>Legend<div style='display: block;'>"+mybarchart.generateLegend();+"</div></b>";
	  			   var report_image=document.createElement('img');
	  			   report_image.setAttribute('src',mybarchart.toBase64Image());

	  			   container.appendChild(title);
	  			   container.appendChild(legend);
	  			   container.appendChild(report_image);
	  			   $.print(container);
			});

  		   
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
							rowsHTML+=data[1].innerHTML;
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
		$(print_button).off('click');
		$(print_button).on('click',function(event)
		{
		   var container=document.createElement('div');
		   var title=document.createElement('div');
		   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Compare product prices</b></div>";
		   var table_element=document.getElementById('report44_body').parentNode;
		   var table_copy=table_element.cloneNode(true);
		   container.appendChild(title);
		   container.appendChild(table_copy);
		   $.print(container);
		});
		
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
			"<area_type>storage</area_type>" +
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
		"<type>supplier</type>" +
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
				"<status>pending</status>" +
				"</payments>";
		fetch_requested_data('report46',payments_data,function(payments)
		{
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
					bill_ids_string=bill_ids_string.substr(0,(bill_ids_string.length-2));
					
					var rowsHTML="<tr>";
						rowsHTML+="<td data-th='Supplier'>";
							rowsHTML+=result.acc_name;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Account Balance'>";
							rowsHTML+=balance_amount;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Bill Ids'>";
							rowsHTML+=bill_ids_string;
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
					
					$('#report46_body').append(rowsHTML);
				}
			});
			var print_button=form.elements[4];
			$(print_button).off('click');
			$(print_button).on('click',function(event)
			{
			   var container=document.createElement('div');
			   var title=document.createElement('div');
			   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Supplier Account Balance</b></div>";
			   var table_element=document.getElementById('report46_body').parentNode;
			   var table_copy=table_element.cloneNode(true);
			   container.appendChild(title);
			   container.appendChild(table_copy);
			   $.print(container);
			});
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
	$(canvas_parent).append("<canvas id='report47_canvas' class='report_sizing'><canvas>");
	var ctx = document.getElementById("report47_canvas").getContext("2d");
	
	var products_data="<product_instances>" +
			"<product_name>"+product_name+"</product_name>" +
			"<batch></batch>" +
			"<cost_price sort='desc'></cost_price>" +
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
		result.datasets[1].strokeColor=result.datasets[0].fillColor;
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
		  		   result.datasets[0].data.push(inventory_sale_price);
		  		   result.datasets[1].data.push(inventory_cost_price);
	  		   }
	  		   else
	  		   {
	  			   for(var i=0;i<products.length;i++)
	  			   {
	  				   for(var j=i+1; j<products.length;j++)
	  				   {
	  					   if(products[i].product_name==products[j].name)
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
				  		   result.datasets[0].data.push(products[i].sale);
				  		   result.datasets[1].data.push(products[i].cost);
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
	  		   $(print_button).off('click');
	  		   $(print_button).on('click',function(event)
	  		   {
	  			   var container=document.createElement('div');
	  			   var title=document.createElement('div');
	  			   title.innerHTML="<div style='text-align:center;display: block;width:100%'><b>Inventory Value</b></div>";
	  			   var legend=document.createElement('div');
	  			   legend.innerHTML="<b>Legend<div style='display: block;'>"+mybarchart.generateLegend();+"</div></b>";
	  			   var report_image=document.createElement('img');
	  			   report_image.setAttribute('src',mybarchart.toBase64Image());

	  			   container.appendChild(title);
	  			   container.appendChild(legend);
	  			   container.appendChild(report_image);
	  			   $.print(container);
	  		   });

	  		   hide_loader();
	  	   }
	    },100);
	});
};

