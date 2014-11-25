/**
 * @reportNo 1
 * @report Signage Changes
 */
function report1_ini()
{
	var form=document.getElementById('report1_header');
	var date_since=form.elements[1].value;
	var product_filter=form.elements[2].value;

	$('#form1_body').html('');

	/////appending new arrivals details
	var product_data="<goods_received>" +
			"<product_name>"+product_filter+"</product_name>" +
			"<sup_bill_id></sup_bill_id>" +
			"<last_updated compare='more than'>"+get_raw_time(date_since)+"</last_updated>" +
			"</goods_received>";
	
	get_single_column_data(function(products)
	{
		var rowsHTML="";
		
		products.forEach(function(product)
		{
			var bill_id_data="<goods_received>" +
					"<product_name exact='yes'>"+product+"</product_name>" +
					"<sup_bill_id></sup_bill_id>" +
					"<batch></batch>" +
					"</goods_received>";
			
			fetch_requested_data('report1',bill_id_data,function(bill_ids)
			{
				var sup_bill_id_array="";
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
								"<product_name exact='yes'>"+product+"</product_name>" +
								"<batch></batch>" +
								"</area_utilization>";
						
						fetch_requested_data('report1',store_data,function(areas)
						{
							var areas_string="";
							for(var x in areas)
							{
								areas_string+=areas[x].name+", ";
							}
							areas_string=rtrim(areas_string,", ");
							rowsHTML+="<tr>";
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
						});
					}
				});
			});
		});
		$('#form1_body').append(rowsHTML);
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
		var rowsHTML="";
		offers.forEach(function(offer)
		{
			var store_data="<area_utilization>" +
					"<name></name>" +
					"<product_name exact='yes'>"+offer.product_name+"</product_name>" +
					"<batch>"+offer.batch+"</batch>" +
					"</area_utilization>";
			
			fetch_requested_data('report1',store_data,function(areas)
			{
				var areas_string="";
				for(var x in areas)
				{
					areas_string+=areas[x].name+", ";
				}
				areas_string=rtrim(areas_string,", ");
				rowsHTML+="<tr>";
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
						rowsHTML+=offer.status;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Detail'>";
						rowsHTML+=offer.offer_detail;
					rowsHTML+="</td>";
				rowsHTML+="</tr>";
			
			});
		});
		$('#form1_body').append(rowsHTML);
	});
};


/**
 * @reportNo 4
 * @report Modes of payment
 */
function report4_ini()
{
	var form=document.getElementById('report4_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	
	var ctx = document.getElementById("report4_canvas").getContext("2d");
	var modes_data="<payments>" +
			"<mode></mode>" +
			"<amount></amount>" +
			"<date compare='more than'>"+get_raw_time(start_date)+"</date>" +
			"<date compare='less than'>"+get_raw_time(end_date)+"</date>" +
			"<status>closed</status>" +
			"<type>received</type>" +
			"</payments>";

	fetch_requested_data('report4',modes_data,function(modes)
	{
		var result=transform_to_pie_sum(modes,'amount','mode');
		var mydoughChart = new Chart(ctx).Doughnut(result,{});
	});
};

/**
 * @reportNo 5
 * @report Customers account balance
 */
function report5_ini()
{
	var form=document.getElementById('report5_header');
	var balance=form.elements[1].value;
	var customer=form.elements[2].value;
	
	var account_data="<accounts>" +
		"<acc_name>"+customer+"</acc_name>" +
		"<balance compare='more than'>"+balance+"</balance>" +
		"</accounts>";
	
	fetch_requested_data('report5',account_data,function(accounts)
	{
		var rowsHTML="";
		accounts.forEach(function(account)
		{
			var bills_data="<bills>" +
				"<id></id>" +
				"<customer_name exact='yes'>"+account.acc_name+"</customer_name>" +
				"<amount></amount>" +
				"</bills>";
		
			fetch_requested_data('report5',bills_data,function(bill_ids)
			{
				var bill_ids_string="";
				for(var x in bills_ids)
				{
					bill_ids_string+="<u title='Amount Rs:"+bill_ids[x].amount+"'>"+bill_ids[x].id+"</u>"+", ";
				}
				bill_ids_string=rtrim(bill_ids_string,", ");
				rowsHTML+="<tr>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+=account.acc_name;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Account Balance'>";
						rowsHTML+=account.balance;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Bill Ids'>";
						rowsHTML+=bill_ids_string;
					rowsHTML+="</td>";
				rowsHTML+="</tr>";
			});
		});
		$('#form5_body').html(rowsHTML);
	});
};


/**
 * @reportNo 6
 * @report Payments Due from customers 
 */
function report6_ini()
{
	var form=document.getElementById('report6_header');
	var due_date=form.elements[1].value;
	var customer_name=form.elements[2].value;
	
	var ctx = document.getElementById("report6_canvas").getContext("2d");

	var payments_data="<payments>" +
			"<acc_name>"+customer_name+"</acc_name>" +
			"<amount></amount>" +
			"<due_date compare='less than'>"+get_raw_time(due_date)+"</due_date>" +
			"<status>pending</status>" +
			"<type>received</type>" +
			"</payments>";

	fetch_requested_data('report6',payments_data,function(payments)
	{
		console.log(payments);
		var result=transform_to_bar_sum(payments,'Amount','amount','acc_name');
		console.log(result);
		var mybarchart = new Chart(ctx).Bar(result,{});
	});
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
	var type=form.elements[3].value;
	var customer=form.elements[4].value;
	var date=form.elements[5].value;
	
	var products_data="<product_master>" +
			"<name>"+name+"</name>" +
			"<make>"+make+"</make>" +
			"<product_type>"+type+"</product_type>" +
			"</product_master>";
	
	fetch_requested_data('report9',account_data,function(products)
	{
		var rowsHTML="";
		products.forEach(function(product)
		{
			var bill_items_data="<bill_items>" +
					"<bill_id></bill_id>" +
					"<product_name exact='yes'>"+product.name+"</product_name>" +
					"</bill_items>";
			fetch_requested_data(bill_items_data,function(bill_ids)
			{
				var bill_ids_string="";
				var quantity=0;
				for(var x in bills_ids)
				{
					bill_ids_string+=bill_ids[x].id+"--";
					quantity+=parseInt(bill_ids[x].quantity);
				}
				var bills_data="<bills>" +
						"<id array='yes'>"+bill_ids_string+"</id>" +
						"<customer_name exact='yes'>"+customer+"</customer_name>" +
						"<date_created compare='more than'>"+get_raw_time(date)+"</date_created>" +
						"</bills>";
			
				fetch_requested_data('report9',bills_data,function(bills)
				{
					for(var j in bills)
					{
						rowsHTML+="<tr>";
							rowsHTML+="<td data-th='Product Name'>";
								rowsHTML+=product.name;
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Make'>";
								rowsHTML+=product.make;
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Type'>";
								rowsHTML+=product.product_type;
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Customer'>";
								rowsHTML+=bills[j].customer_name;
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Amount'>";
								rowsHTML+=quantity;
							rowsHTML+="</td>";
						rowsHTML+="</tr>";
					}
				});
			});
		});
		$('#form9_body').html(rowsHTML);
	});
};

/**
 * @reportNo 14
 * @report Expenses by period
 */
function report14_ini()
{
	var form=document.getElementById('report14_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	var account=form.elements[3].value;
	
	var ctx = document.getElementById("report14_canvas").getContext("2d");
	var expenses_data="<expenses>" +
			"<amount></amount>" +
			"<expense_date compare='more than'>"+get_raw_time(start_date)+"</expense_date>" +
			"<expense_date compare='less than'>"+get_raw_time(end_date)+"</expense_date>" +
			"<to_acc></to_acc>" +
			"</expenses>";

	fetch_requested_data('report14',expenses_data,function(expenses)
	{
		var result=transform_to_bar_sum(expenses,'Amount','amount','to_acc');
		var mybarchart = new Chart(ctx).Bar(result,{});
	});
};


/**
 * @reportNo 15
 * @report Financial summary
 */
function report15_ini()
{
	var ctx = document.getElementById("report15_canvas").getContext("2d");
	
	var payments_data="<payments>" +
			"<amount></amount>" +
			"<status>pending</status>" +
			"<type array='yes'>delivered--received</type>" +
			"</payments>";
	var capital_data="<payments>" +
			"<amount></amount>" +
			"<status>closed</status>" +
			"<type array='yes'>delivered--received</type>" +
			"</payments>";
	var tax_data="<tax>" +
			"<amount></amount>" +
			"<status>current</status>" +
			"</tax>";
			
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
		
		var credit_debit=transform_to_sum(payments,'amount','type');
		for(var i=0;i<credit_debit.length;i++)
		{
			if(credit_debit[i].label=='delivered')	
			{
				result.labels.push('Debits');
				result.datasets[0].data.push(credit_debit[i].value);
			}
			else if(credit_debit[i].label=='received')	
			{
				result.labels.push('Credits');
				result.datasets[0].data.push(credit_debit[i].value);
			}
		}
		
		fetch_requested_data('report15',capital_data,function(capital)
		{
			var cap=transform_to_sum(capital,'amount','type');
			var working_capital=0;
			for(var j=0;j<cap.length;j++)
			{
				if(cap[j].label=='delivered')
					working_capital-=cap[j].value;
				else if(cap[j].label=='received')
					working_capital+=cap[j].value;
			}
			if(cap.length>0)
			{
				result.labels.push('Working Capital');
				result.datasets[0].data.push(working_capital);
			}
			
			fetch_requested_data('report15',tax_data,function(taxes)
			{
				var tax=transform_to_sum(taxes,'amount','status');
				if(tax.length>0)
				{
					result.labels.push('Tax');
					result.datasets[0].data.push(tax[0].value);
				}	
				var mybarchart = new Chart(ctx).Bar(result,{});
			});
		});
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
	
	var staff_data="<staff>" +
			"<acc_name>"+staff+"</acc_name>" +
			"<status>active</status>" +
			"</staff>";
	get_single_column_data(function(employees)
	{	
		var rowsHTML="";
		employees.forEach(function(employee)
		{
			var attendance_data="<attendance>" +
					"<acc_name exact='yes'>"+employee.acc_name+"</acc_name>" +
					"<presence></presence>" +
					"<hours_worked></hours_worked>" +
					"<date compare='more than'>"+get_raw_time(from_date)+"</date>" +
					"<date compare='less than'>"+get_raw_time(to_date)+"</date>" +
					"</attendance>";
			
			fetch_requested_data('report17',attendance_data,function(attendances)
			{
				var absents=0;
				var hours=0;
				var acc_name="";
				for(var i in attendances)
				{
					if(attendances[i].presence=='absent')
						absents+=1;
					hours+=parseInt(attendances[i].hours_worked);
					acc_name=attendances[i].acc_name;
				}
				var task_instances_data="<task_instances>" +
						"<assignee exact='yes'>"+acc_name+"</assignee>" +
						"<t_executed compare='more than'>"+get_raw_time(from_date)+"</t_executed>" +
						"<t_executed compare='less than'>"+get_raw_time(to_date)+"</t_executed>" +
						"<task_hours></task_hours>" +
						"<status>completed</status>" +
						"</task_instances>";
				fetch_requested_data('report17',task_instances_data,function(tasks)
				{
					var num_tasks=0;
					var task_hours=0;
					var assignee="";
					for(var x in tasks)
					{
						task_hours+=parseInt(tasks[x].task_hours);
						num_tasks+=1;
						assignee=tasks[x].assignee;
					}
				
					rowsHTML+="<tr>";
						rowsHTML+="<td data-th='Staff Name'>";
							rowsHTML+=assignee;
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
			});	
		});
		$('#form17_body').html(rowsHTML);
	},staff_data);
	
};

/**
 * @reportNo 26
 * @report Sales by customers
 */
function report26_ini()
{
	var form=document.getElementById('report26_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	var customer=form.elements[3].value;
	
	var ctx = document.getElementById("report26_canvas").getContext("2d");
	var sales_data="<bills>" +
			"<amount></amount>" +
			"<customer_name exact='yes'>"+customer+"</customer_name>" +
			"<date_created compare='more than'>"+get_raw_time(start_date)+"</date_created>" +
			"<date_created compare='less than'>"+get_raw_time(end_date)+"</date_created>" +
			"</bills>";

	fetch_requested_data('report26',sales_data,function(sales)
	{
		var result=transform_to_bar_sum(sales,'Amount','amount','customer_name');
		var mybarchart = new Chart(ctx).Bar(result,{});
	});
};

/**
 * @reportNo 27
 * @report expiring inventory
 */
function report27_ini()
{
	var form=document.getElementById('report27_header');
	var expiry_date=form.elements[1].value;
	var product=form.elements[2].value;
	
	var ctx = document.getElementById("report27_canvas").getContext("2d");
	var product_data="<product_instances>" +
			"<quantity></quantity>" +
			"<product_name>"+product+"</product_name>" +
			"<expiry compare='less than'>"+get_raw_time(expiry_date)+"</expiry>" +
			"</product_instances>";

	fetch_requested_data('report27',product_data,function(products)
	{
		var result=transform_to_bar_sum(products,'Quantity','quantity','product_name');
		var mybarchart = new Chart(ctx).Bar(result,{});
	});
};

/**
 * @reportNo 28
 * @report Short Inventory
 */
function report28_ini()
{
	var form=document.getElementById('report28_header');
	var num_days=form.elements[1].value;
	var product=form.elements[2].value;
	var raw_time=get_my_time()-parseInt(num_days)*86400000;
	
	var ctx = document.getElementById("report28_canvas").getContext("2d");
	var product_data="<product_instances>" +
			"<quantity></quantity>" +
			"<product_name>"+product+"</product_name>" +
			"</product_instances>";

	fetch_requested_data('report28',product_data,function(products)
	{
		var product_array="";
		for(var k in products)
		{
			product_array+=products[k]+"--";
		}
		var bills_data="<bills>" +
				"<id></id>" +
				"<date_created compare='more than'>"+raw_time+"</date_created>" +
				"<type>product</type>" +
				"</bills>";
				
		get_single_column_data(function(bill_ids)
		{
			var bill_id_array="";
			for(var y in bill_ids)
			{
				bill_id_array+=bill_ids[y]+"--";
			}
			var sales_data="<bills_items>" +
					"<bill_id array='yes'>"+bill_id_array+"</bill_id>" +
					"<quantity></quantity>" +
					"<product_name array='yes'>"+product_array+"</product_name>" +
					"</bill_items>";
			fetch_requested_data('report28',sales_data,function(sales_array)
			{
				var result=transform_to_multi_bar_sum(product_array,sales_array,'Current Inventory','Sold Quantity','quantity','product_name');
				var mybarchart = new Chart(ctx).Bar(result,{});
			});
		},bills_data);
	});
};

/**
 * @reportNo 29
 * @report Pre requisites by products
 */
function report29_ini()
{
	var form=document.getElementById('report29_header');
	var name=form.elements[1].value;
	
	var product_data="<product_master>" +
			"<name>"+name+"</name>" +
			"<manufacture>yes</yes>" +
			"</product_master>";
	get_single_column_data(function(products)
	{	
		var rowsHTML="";
		products.forEach(function(product)
		{
			var requisites_data="<pre_requisites>" +
					"<name exact='yes'>"+product.name+"</name>" +
					"<type>product</product>" +
					"<requisite_type></requisite_type>" +
					"<product_name></product_name>" +
					"<service_name></service_name>" +
					"<task_name></task_name>" +
					"<quantity></quantity>" +
					"</pre_requisites>";
			
			fetch_requested_data('report29',requisites_data,function(requisites)
			{
				var product_string='';
				var service_string='';
				var task_string='';
				var requisite_name="";
				for(var i in requisites)
				{
					if(requisites[i].requisite_type=='product')
						product_string+="<u title='"+requisites[i].quantity+"'>"+requisites[i].product_name+"</u>, ";
					else if(requisites[i].requisite_type=='service')
						service_string+="<u title='"+requisites[i].quantity+"'>"+requisites[i].service_name+"</u>, ";
					else if(requisites[i].requisite_type=='task')
						task_string+="<u title='"+requisites[i].quantity+"'>"+requisites[i].task_name+"</u>, ";
					requisite_name=requisites[i].name;
				}
				product_string=rtrim(product_string,", ");
				service_string=rtrim(service_string,", ");
				task_string=rtrim(task_string,", ");
				
				rowsHTML+="<tr>";
					rowsHTML+="<td data-th='Product Name'>";
						rowsHTML+=requisite_name;
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
			});	
		});
		$('#form29_body').html(rowsHTML);
	},product_data);
};


/**
 * @reportNo 30
 * @report Tasks performed by staff
 */
function report30_ini()
{
	var form=document.getElementById('report30_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	
	var ctx = document.getElementById("report30_canvas").getContext("2d");
	var task_data="<task_instances>" +
			"<assignee></assignee>" +
			"<t_executed compare='more than'>"+get_raw_time(start_date)+"</t_executed>" +
			"<t_executed compare='less than'>"+get_raw_time(end_date)+"</t_executed>" +
			"<status>completed</status>" +
			"</task_instances>";

	fetch_requested_data('report30',task_data,function(tasks)
	{
		var result=transform_to_pie_count(tasks,'assignee');
		var mydoughChart = new Chart(ctx).Doughnut(result,{});
	});
};


/**
 * @report Customer Maps by credit
 * @reportNo 31
 */
function report31_ini()
{	
	console.log('running report 31');
	var form=document.getElementById('report31_header');
	var min_amount=$("#form31_slider").slider("values",0);
	var max_amount=$("#form31_slider").slider("values",1);
	
	//console.log("amounts-"+min_amount+"- "+max_amount);
	
	
	var coordinates_data="<address>" +
			"<acc_type>master</acc_type>" +
			"<lat></lat>" +
			"<lng></lng>" +
			"</address>";
	fetch_requested_data('report31',coordinates_data,function(coords)
	{
		for (var z in coords)
		{
			if(typeof map31 != 'undefined')
				map31.remove();
	
			map31 = L.map('report31_map',{
				center: [coords[z].lat,coords[z].lng], 
				zoom: 10
			});
		
			L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
		        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		        subdomains:'1234'
		      }).addTo(map31);
			
			var accounts_data="<accounts>" +
					"<acc_name></acc_name>" +
					"<balance compare='less than'>"+max_amount+"</balance>" +
					"<balance compare='more than'>"+min_amount+"</balance>" +
					"<type>customer</type>" +
					"</accounts>";
			
			get_single_column_data(function(customers)
			{
				var customers_array="";
				for(var x in customers)
				{
					customers_array+=customers[x]+"--";
				}
				if(customers_array!="")
				{
					//console.log("customers "+customers_array);
					var address_data="<address>" +
							"<id></id>" +
							"<acc_type>customer</acc_type>" +
							"<lat></lat>" +
							"<lng></lng>" +
							"<acc_name array='yes'>"+customers_array+"</acc_name>" +
							"<status></status>" +
							"<address></address>" +
							"</address>";
					fetch_requested_data('report31',address_data,function(addresses)
					{
						//console.log("addresses "+addresses);
						for(var i in addresses)
						{
							var latlng=L.latLng(addresses[i].lat,addresses[i].lng);
							//console.log("adding marker at-"+latlng+"--"+addresses[i].acc_name+customers[x].acc_name);
							var marker=L.marker(latlng).addTo(map31).bindPopup("Name: "+addresses[i].acc_name);	
						}
					});
				}
			},accounts_data);
			break;
		}
	});
}

/**
 * @report Staff Maps
 * @reportNo 32
 */
function report32_ini()
{	
	var form=document.getElementById('report32_header');
	var min_amount=$("#form32_slider").slider("values",0);
	var max_amount=$("#form32_slider").slider("values",1);
	
	
	var coordinates_data="<address>" +
			"<acc_type>master</acc_type>" +
			"<lat></lat>" +
			"<lng></lng>" +
			"</address>";
	fetch_requested_data('report32',coordinates_data,function(coords)
	{
		for (var z in coords)
		{
			if(typeof map32 != 'undefined')
				map32.remove();
	
			map32 = L.map('report32_map',{
				center: [coords[z].lat,coords[z].lng], 
				zoom: 10
			});
	
			L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
		        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		        subdomains:'1234'
		      }).addTo(map32);
			
			var salary_data="<staff>" +
					"<acc_name></acc_name>" +
					"<fixed_comp compare='less than'>"+max_amount+"</fixed_comp>" +
					"<fixed_comp compare='more than'>"+min_amount+"</fixed_comp>" +
					"<status>active</status>" +
					"</staff>";
			
			get_single_column_data(function(staff)
			{
				var staff_array="";
				for(var x in staff)
				{
					staff_array+=staff[x]+"--";
				}
				if(staff_array!="")
				{
					var address_data="<address>" +
							"<acc_type>staff</acc_type>" +
							"<lat></lat>" +
							"<lng></lng>" +
							"<acc_name array='yes'>"+staff_array+"</acc_name>" +
							"<status></status>" +
							"<address></address>" +
							"</address>";
					fetch_requested_data('report32',address_data,function(addresses)
					{
						for(var i in addresses)
						{
							var latlng=L.latLng(addresses[i].lat,addresses[i].lng);
							//console.log("adding marker at-"+latlng+"--"+addresses[i].acc_name+customers[x].acc_name);
							var marker=L.marker(latlng).addTo(map32).bindPopup("Name: "+addresses[i].acc_name);	
						}
					});
				}
			},salary_data);
			break;
		}
	});
}


/**
 * @report Supplier Maps by debit
 * @reportNo 33
 */
function report33_ini()
{	
	var form=document.getElementById('report33_header');
	var min_amount=$("#form33_slider").slider("values",0);
	var max_amount=$("#form33_slider").slider("values",1);
	

	var coordinates_data="<address>" +
			"<acc_type>master</acc_type>" +
			"<lat></lat>" +
			"<lng></lng>" +
			"</address>";
	fetch_requested_data('report33',coordinates_data,function(coords)
	{
		for (var z in coords)
		{
			if(typeof map33 != 'undefined')
				map33.remove();
	
			map33 = L.map('report33_map',{
				center: [coords[z].lat,coords[z].lng], 
				zoom: 10
			});
	
			L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
		        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		        subdomains:'1234'
		      }).addTo(map33);
			
			var account_data="<accounts>" +
					"<acc_name></acc_name>" +
					"<balance compare='less than'>"+max_amount+"</balance>" +
					"<balance compare='more than'>"+min_amount+"</balance>" +
					"<type>supplier</type>" +
					"</accounts>";
			
			get_single_column_data(function(suppliers)
			{
				var suppliers_array="";
				for(var x in suppliers)
				{
					suppliers_array+=suppliers[x]+"--";
				}
				if(suppliers_array!="")
				{
					var address_data="<address>" +
							"<id></id>" +
							"<acc_type>supplier</acc_type>" +
							"<lat></lat>" +
							"<lng></lng>" +
							"<acc_name array='yes'>"+suppliers_array+"</acc_name>" +
							"<status></status>" +
							"<address></address>" +
							"</address>";
					fetch_requested_data('report33',address_data,function(addresses)
					{
						for(var i in addresses)
						{
							var latlng=L.latLng(addresses[i].lat,addresses[i].lng);
							//console.log("adding marker at-"+latlng+"--"+addresses[i].acc_name+customers[x].acc_name);
							var marker=L.marker(latlng).addTo(map33).bindPopup("Name: "+addresses[i].acc_name);	
						}
					});
				}
			},account_data);
			break;
		}
	});
}

/**
 * @reportNo 34
 * @report Profit calculator
 */
function report34_ini()
{
	var form=document.getElementById('report34_header');
	var sales_estimate=form.elements[1].value;
	var three_months=get_my_time()-90*86400000;
	
	var ctx = document.getElementById("report34_canvas").getContext("2d");
	
	var bills_data="<bills>" +
			"<id></id>" +
			"<amount></amount>" +
			"<date_created compare='more than'>"+three_months+"</date_created>" +
			"<date_created compare='less than'>"+get_my_time()+"</date_created>" +
			"</bills>";

	fetch_requested_data('report34',bills_data,function(bills)
	{
		var sale_amount=0;
		var bill_ids_array="";
		for(var i in bills)
		{
			sale_amount+=bills[i].amount;
			bill_ids_array+=bills[i].id+"--";
		}
		
		var bill_item_data="<bill_items>" +
				"<product_name></product_name>" +
				"<batch></batch>" +
				"<quantity></quantity>" +
				"<bill_id array='yes'>"+bill_ids_array+"</bill_id>" +
				"</bill_items>";
		
		fetch_requested_data('report34',bill_item_data,function(bill_items)
		{
			var bi_transformed=transform_to_sum_2columns(bill_items,'quantity','product_name','batch');
			var product_names_string="";
			var batches_string="";
			for(var j in bi_transformed)
			{
				product_names_string+=bi_transformed[j].product_name;
				batches_string+=bi_transformed[j].batch;
			}
		
			var goods_received_data="<goods_received>" +
					"<product_name array='yes'>"+product_names_string+"</product_name>" +
					"<batch array='yes'>"+batches_string+"</batch>" +
					"<cost_price></cost_price>" +
					"</goods_received>";
			fetch_requested_data('report34',goods_received_data,function(goods_received)
			{
				var gr_transformed=jQuery.unique(goods_received);
				var cost_amount=0;
				for (var k in gr_transformed)
				{
					for(var l in bi_transformed)
					{
						if(gr_transformed[k].product_name==bi_transformed[l].product_name && gr_transformed[k].batch==bi_transformed[l].batch)
						{
							cost_amount+=parseInt(gr_transformed[k].cost_price)*parseInt(bi_transformed[l].quantity);
							bi_transformed.splice(l,1);
							break;
						}
					}
				}
					
				var disposal_data="<disposals>" +
						"<product_name></product_name>" +
						"<batch></batch>" +
						"<quantity></quantity>" +
						"<date compare='more than'>"+three_months+"</date>" +
						"<date compare='less than'>"+get_my_time()+"</date>" +
						"</disposals>";
				fetch_requested_data('report34',disposal_data,function(disposals)
				{
					var di_transformed=transform_to_sum_2columns(disposals,'quantity','product_name','batch');
					var disposal_amount=0;
					for (var m in gr_transformed)
					{
						for(var n in di_transformed)
						{
							if(gr_transformed[m].product_name==di_transformed[n].product_name && gr_transformed[m].batch==di_transformed[n].batch)
							{
								disposal_amount+=parseInt(gr_transformed[m].cost_price)*parseInt(di_transformed[n].quantity);
								di_transformed.splice(n,1);
								break;
							}
						}
					}
					
					var expense_data="<expenses>" +
							"<expense_date comapre='more than'>"+three_months+"</expense_date>" +
							"<expense_date comapre='less than'>"+get_my_time()+"</expense_date>" +
							"<amount></amount>" +
							"</expenses>";
					fetch_requested_data('report34',expense_data,function(expenses)
					{
						var expense_amount=0;
						for (var o in expenses)
						{
							expense_amount+=parseInt(expenses[o].amount);
						}
						
						var transaction_data="<transactions>" +
								"<id></id>" +
								"<trans_date compare='more than'>"+three_months+"</trans_date>" +
								"<trans_date compare='less than'>"+get_my_time()+"</trans_date>" +
								"</transactions>";
						
						fetch_requested_data('report34',transaction_data,function(transactions)
						{
							var trans_string="";
							for (var p in transactions)
							{
								trans_string+=transactions[p].id+"--";
							}
							
							var tax_data="<tax>" +
									"<transaction_id array='yes'>"+trans_string+"</transaction_id>" +
									"<amount></amount>" +
									"</tax>";
							
							fetch_requested_data('report34',tax_data,function(taxes)
							{
								var tax_amount=0;
								for (var q in taxes)
								{
									tax_amount+=parseInt(taxes[q].amount);
								}
								
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
								
								result.labels.push('Current average monthly sale');
								result.datasets[0].data.push(Math.floor(sale_amount/3));
								result.labels.push('Estimated cost price');
								result.datasets[0].data.push(Math.floor(cost_amount/3));

								result.labels.push('Current average monthly expenses');
								result.datasets[0].data.push(Math.floor(expense_amount/3));
								result.labels.push('Current average monthly wastage');
								result.datasets[0].data.push(Math.floor(disposal_amount/3));
								result.labels.push('Current average monthly taxes');
								result.datasets[0].data.push(Math.floor(tax_amount/3));

								result.labels.push('Current average monthly profit');
								result.datasets[0].data.push(Math.floor((sale_amount-cost_amount-expense_amount-disposal_amount-tax_amount)/3));
								
								result.labels.push('Projected monthly sale');
								result.datasets[0].data.push(sales_estimate);
								
								var project_profit=Math.floor(((sale_amount-cost_amount-disposal_amount-tax_amount)/sale_amount*sales_estimate)-(expense_amount/3));
								result.labels.push('Projected monthly profit');
								result.datasets[0].data.push(project_profit);

								
								var mybarchart = new Chart(ctx).Bar(result,{});
							});
						});
					});
				});
			});
		});
	});
};


/**
 * @report Customer Maps by products consumed
 * @reportNo 35
 */
function report35_ini()
{	
	var form=document.getElementById('report35_header');
	var product_name=form.elements[1].value;
	
	var coordinates_data="<address>" +
			"<acc_type>master</acc_type>" +
			"<lat></lat>" +
			"<lng></lng>" +
			"</address>";
	fetch_requested_data('report35',coordinates_data,function(coords)
	{
		for(var z in coords)
		{
			if(typeof map35 != 'undefined')
				map35.remove();
			map35 = L.map('report35_map',{
				center: [coords[z].lat,coords[z].lng], 
				zoom: 10
			});
	
			L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
		        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		        subdomains:'1234'
		      }).addTo(map35);
			
			var product_data="<bill_items>" +
					"<bill_id></bill_id>" +
					"<product_name exact='yes'>"+product_name+"</product_name>" +
					"</bill_items>";
			
			get_single_column_data(function(bill_ids)
			{
				var bill_id_array="";
				for(var y in bill_ids)
				{
					bill_id_array+=bill_ids[y]+"--";
				}
				if(bill_id_array!="")
				{
					var customer_data="<bills>" +
							"<customer_name></customer_name>" +
							"<id array='yes'>"+bill_id_array+"</id>" +
							"</bills>";
					
					get_single_column_data(function(customers)
					{
						var customers_array="";
						for(var x in customers)
						{
							customers_array+=customers[x]+"--";
						}	
						if(customers_array!="")
						{
							var address_data="<address>" +
									"<id></id>" +
									"<acc_type>customer</acc_type>" +
									"<lat></lat>" +
									"<lng></lng>" +
									"<acc_name array='yes'>"+customers_array+"</acc_name>" +
									"<status></status>" +
									"<address></address>" +
									"</address>";
							fetch_requested_data('report35',address_data,function(addresses)
							{
								for(var i in addresses)
								{
									var latlng=L.latLng(addresses[i].lat,addresses[i].lng);
									//console.log("adding marker at-"+latlng+"--"+addresses[i].acc_name+customers[x].acc_name);
									var marker=L.marker(latlng).addTo(map35).bindPopup("Name: "+addresses[i].acc_name);	
								}
							});
						}
					},customer_data);
				}
			},product_data);
			break;
		}
	});
}


/**
 * @report Supplier Maps by products supplied
 * @reportNo 36
 */
function report36_ini()
{	
	var form=document.getElementById('report36_header');
	var product_name=form.elements[1].value;
	

	var coordinates_data="<address>" +
			"<acc_type>master</acc_type>" +
			"<lat></lat>" +
			"<lng></lng>" +
			"</address>";
	fetch_requested_data('report36',coordinates_data,function(coords)
	{
		for(var z in coords)
		{
			if(typeof map36 != 'undefined')
				map36.remove();
	
			map36 = L.map('report36_map',{
				center: [coords[z].lat,coords[z].lng], 
				zoom: 10
			});
	
			L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
		        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		        subdomains:'1234'
		      }).addTo(map36);
			
			var product_data="<goods_received>" +
					"<sup_bill_id></sup_bill_id>" +
					"<product_name exact='yes'>"+product_name+"</product_name>" +
					"</goods_received>";
			
			get_single_column_data(function(bill_ids)
			{
				var bill_id_array="";
				for(var y in bill_ids)
				{
					bill_id_array+=bill_ids[y]+"--";
				}
				if(bill_id_array!="")
				{
					var supplier_data="<supplier_bills>" +
							"<supplier_name></supplier_name>" +
							"<bill_id array='yes'>"+bill_id_array+"</bill_id>" +
							"</supplier_bills>";
					
					get_single_column_data(function(suppliers)
					{
						var suppliers_array="";
						for(var x in suppliers)
						{
							suppliers_array+=suppliers[x]+"--";
						}	
						if(suppliers_array!="")
						{
							var address_data="<address>" +
									"<id></id>" +
									"<acc_type>supplier</acc_type>" +
									"<lat></lat>" +
									"<lng></lng>" +
									"<acc_name array='yes'>"+suppliers_array+"</acc_name>" +
									"<status></status>" +
									"<address></address>" +
									"</address>";
							fetch_requested_data('report36',address_data,function(addresses)
							{
								for(var i in addresses)
								{
									var latlng=L.latLng(addresses[i].lat,addresses[i].lng);
									//console.log("adding marker at-"+latlng+"--"+addresses[i].acc_name+customers[x].acc_name);
									var marker=L.marker(latlng).addTo(map36).bindPopup("Name: "+addresses[i].acc_name);	
								}
							});
						}
					},supplier_data);
				}
			},product_data);
			break;
		}
	});
}

/**
 * @reportNo 37
 * @report Payments Due to suppliers 
 */
function report37_ini()
{
	var form=document.getElementById('report37_header');
	var due_date=form.elements[1].value;
	var supplier_name=form.elements[2].value;
	
	var ctx = document.getElementById("report37_canvas").getContext("2d");

	var payments_data="<payments>" +
			"<acc_name>"+supplier_name+"</acc_name>" +
			"<amount></amount>" +
			"<due_date compare='less than'>"+get_raw_time(due_date)+"</due_date>" +
			"<status>pending</status>" +
			"<type>delivered</type>" +
			"</payments>";

	fetch_requested_data('report37',payments_data,function(payments)
	{
		var result=transform_to_bar_sum(payments,'Amount','amount','acc_name');
		var mybarchart = new Chart(ctx).Bar(result,{});
	});
};

/**
 * @reportNo 38
 * @report Sales by products
 */
function report38_ini()
{
	var form=document.getElementById('report38_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	var products=form.elements[3].value;
	
	var ctx = document.getElementById("report38_canvas").getContext("2d");
	var bills_data="<bills>" +
			"<id></id>" +
			"<date_created compare='more than'>"+get_raw_time(start_date)+"</date_created>" +
			"<date_created compare='less than'>"+get_raw_time(end_date)+"</date_created>" +
			"<type>product</type>" +
			"</bills>";

	get_single_column_data(function(bill_ids)
	{
		var bill_id_array="";
		for(var y in bill_ids)
		{
			bill_id_array+=bill_ids[y]+"--";
		}
		var products_data="<bills_items>" +
				"<bill_id array='yes'>"+bill_id_array+"</bill_id>" +
				"<quantity></quantity>" +
				"<product_name></product_name>" +
				"</bill_items>";
		fetch_requested_data('report38',products_data,function(product_array)
		{
			var result=transform_to_bar_sum(product_array,'Quantity','quantity','product_name');
			var mybarchart = new Chart(ctx).Bar(result,{});
		});
	},bills_data);
};

/**
 * @reportNo 39
 * @report Sales by services
 */
function report39_ini()
{
	var form=document.getElementById('report39_header');
	var start_date=form.elements[1].value;
	var end_date=form.elements[2].value;
	var services=form.elements[3].value;
	
	var ctx = document.getElementById("report39_canvas").getContext("2d");
	var bills_data="<bills>" +
			"<id></id>" +
			"<date_created compare='more than'>"+get_raw_time(start_date)+"</date_created>" +
			"<date_created compare='less than'>"+get_raw_time(end_date)+"</date_created>" +
			"<type>service</type>" +
			"</bills>";

	get_single_column_data(function(bill_ids)
	{
		var bill_id_array="";
		for(var y in bill_ids)
		{
			bill_id_array+=bill_ids[y]+"--";
		}
		var services_data="<service_instances>" +
				"<bill_id array='yes'>"+bill_id_array+"</bill_id>" +
				"<actual_cost></actual_cost>" +
				"<service_name></service_name>" +
				"</service_instances>";
		fetch_requested_data('report39',services_data,function(service_array)
		{
			var result=transform_to_bar_sum(service_array,'Amount','actual_cost','service_name');
			var mybarchart = new Chart(ctx).Bar(result,{});
		});
	},services_data);
};

/**
 * @reportNo 40
 * @report Surplus Inventory
 */
function report40_ini()
{
	var form=document.getElementById('report40_header');
	var num_days=form.elements[1].value;
	var product=form.elements[2].value;
	var raw_time=get_my_time()-parseInt(num_days)*86400000;
	
	var ctx = document.getElementById("report40_canvas").getContext("2d");
	var product_data="<product_instances>" +
			"<quantity></quantity>" +
			"<product_name>"+product+"</product_name>" +
			"</product_instances>";

	fetch_requested_data('report40',product_data,function(products)
	{
		var products_array="";
		for(var k in products)
		{
			products_array+=products[k]+"--";
		}
		var bills_data="<bills>" +
				"<id></id>" +
				"<date_created compare='more than'>"+raw_time+"</date_created>" +
				"<type>product</type>" +
				"</bills>";
				
		get_single_column_data(function(bill_ids)
		{
			var bill_id_array="";
			for(var y in bill_ids)
			{
				bill_id_array+=bill_ids[y]+"--";
			}
			var sales_data="<bills_items>" +
					"<bill_id array='yes'>"+bill_id_array+"</bill_id>" +
					"<quantity></quantity>" +
					"<product_name array='yes'>"+products_array+"</product_name>" +
					"</bill_items>";
			fetch_requested_data('report40',sales_data,function(sales_array)
			{
				var result=transform_to_multi_bar_sum(sales_array,product_array,'Sold Quantity','Current Inventory','quantity','product_name');
				var mybarchart = new Chart(ctx).Bar(result,{});
			});
		},bills_data);
	});
};

/**
 * @reportNo 41
 * @report Pre requisites by services
 */
function report41_ini()
{
	var form=document.getElementById('report41_header');
	var name=form.elements[1].value;
	
	var service_data="<services>" +
			"<name>"+name+"</name>" +
			"</services>";
	get_single_column_data(function(services)
	{	
		var rowsHTML="";
		services.forEach(function(service)
		{
			var requisites_data="<pre_requisites>" +
					"<name exact='yes'>"+service.name+"</name>" +
					"<type>service</product>" +
					"<requisite_type></requisite_type>" +
					"<product_name></product_name>" +
					"<service_name></service_name>" +
					"<task_name></task_name>" +
					"<quantity></quantity>" +
					"</pre_requisites>";
			
			fetch_requested_data('report41',requisites_data,function(requisites)
			{
				var product_string='';
				var service_string='';
				var task_string='';
				var requisite_name='';
				for(var i in requisites)
				{
					if(requisites[i].requisite_type=='product')
						product_string+="<u title='"+requisites[i].quantity+"'>"+requisites[i].product_name+"</u>, ";
					else if(requisites[i].requisite_type=='service')
						service_string+="<u title='"+requisites[i].quantity+"'>"+requisites[i].service_name+"</u>, ";
					else if(requisites[i].requisite_type=='task')
						task_string+="<u title='"+requisites[i].quantity+"'>"+requisites[i].task_name+"</u>, ";
					
					requisite_name=requisites[i].name;
				}
				product_string=rtrim(product_string,", ");
				service_string=rtrim(service_string,", ");
				task_string=rtrim(task_string,", ");
				
				rowsHTML+="<tr>";
					rowsHTML+="<td data-th='Service Name'>";
						rowsHTML+=requisite_name;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Required Sub-products'>";
						rowsHTML+=product_string;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Required Services'>";
						rowsHTML+=service_string;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Required Tasks'>";
						rowsHTML+=task_string;
					rowsHTML+="</td>";
				rowsHTML+="</tr>";				
			});	
		});
		$('#form41_body').html(rowsHTML);
	},service_data);
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
			"<id>"+fid+"</id>" +
			"<product_name>"+fname+"</product_name>" +
			"<name></name>" +
			"<batch>"+fbatch+"</batch>" +
			"<quantity></quantity>" +
			"</area_utilization>";

	fetch_requested_data('report45',utilization,function(results)
	{
		var canvas = document.getElementById('virtual_store');
		var ctx = canvas.getContext('2d');

		results.forEach(function(result)
		{
			var storages_data="<store_areas>" +
				"<name exact='yes'>"+result.name+"</name>" +
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
				for(var i in area_results)
				{
					draw_star(ctx,area_results[i].locx,area_results[i].locy,10,"#ff0000");
				}
			});
		});
		hide_loader();
	});
}
