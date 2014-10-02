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
		var result=transform_to_bar_sum(payments,'amount','acc_name');
		console.log(result);
		var mybarchart = new Chart(ctx).Bar(result,{});
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
		var result=transform_to_bar_sum(expenses,'amount','to_acc');
		var mybarchart = new Chart(ctx).Bar(result,{});
	});
};


/**
 * @reportNo 15
 * @report Finances summary
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
		result.labels.push('Credits');
		result.labels.push('Debits');
		if(credit_debit[0].label=='delivered')	
		{
			result.datasets[0].data.push(credit_debit[1].value);
			result.datasets[0].data.push(credit_debit[0].value);
		}
		else
		{
			result.datasets[0].data.push(credit_debit[0].value);
			result.datasets[0].data.push(credit_debit[1].value);
		}
		
		fetch_requested_data('report15',capital_data,function(capital)
		{
			var cap=transform_to_sum(capital,'amount','type');
			result.labels.push('Working Capital');
			if(cap[0].label=='delivered')
				result.datasets[0].data.push(cap[1].value-cap[0].value);
			else
				result.datasets[0].data.push(cap[0].value-cap[1].value);
			
			fetch_requested_data('report15',tax_data,function(taxes)
			{
				var tax=transform_to_sum(taxes,'amount','status');
				result.labels.push('Tax');
				result.datasets[0].data.push(tax[0].value);
				
				var mybarchart = new Chart(ctx).Bar(result,{});
			});
		});
	});
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
	
	console.log("amounts-"+min_amount+"- "+max_amount);
	
	if(typeof map31 != 'undefined')
		map31.remove();

	var coordinates_data="<address>" +
			"<acc_type>master</acc_type>" +
			"<lat></lat>" +
			"<lng></lng>" +
			"</address>";
	fetch_requested_data('report31',coordinates_data,function(coords)
	{
		map31 = L.map('report31_map',{
			center: [coords[0].lat,coords[0].lng], 
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
				console.log("customers "+customers_array);
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
					console.log("addresses "+addresses);
					for(var i in addresses)
					{
						var latlng=L.latLng(addresses[i].lat,addresses[i].lng);
						//console.log("adding marker at-"+latlng+"--"+addresses[i].acc_name+customers[x].acc_name);
						var marker=L.marker(latlng).addTo(map31).bindPopup("Name: "+addresses[i].acc_name);	
					}
				});
			}
		},accounts_data);
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
	
	if(typeof map32 != 'undefined')
		map32.remove();

	var coordinates_data="<address>" +
			"<acc_type>master</acc_type>" +
			"<lat></lat>" +
			"<lng></lng>" +
			"</address>";
	fetch_requested_data('report32',coordinates_data,function(coords)
	{
		map32 = L.map('report32_map',{
			center: [coords[0].lat,coords[0].lng], 
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
	
	if(typeof map33 != 'undefined')
		map33.remove();

	var coordinates_data="<address>" +
			"<acc_type>master</acc_type>" +
			"<lat></lat>" +
			"<lng></lng>" +
			"</address>";
	fetch_requested_data('report33',coordinates_data,function(coords)
	{
		map33 = L.map('report33_map',{
			center: [coords[0].lat,coords[0].lng], 
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
	});
}


/**
 * @report Customer Maps by products consumed
 * @reportNo 35
 */
function report35_ini()
{	
	var form=document.getElementById('report35_header');
	var product_name=form.elements[1].value;
	
	if(typeof map35 != 'undefined')
		map35.remove();

	var coordinates_data="<address>" +
			"<acc_type>master</acc_type>" +
			"<lat></lat>" +
			"<lng></lng>" +
			"</address>";
	fetch_requested_data('report35',coordinates_data,function(coords)
	{
		map35 = L.map('report35_map',{
			center: [coords[0].lat,coords[0].lng], 
			zoom: 10
		});

		L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
	        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	        subdomains:'1234'
	      }).addTo(map35);
		
		var product_data="<bill_items>" +
				"<bill_id></bill_id>" +
				"<product_name>"+product_name+"</product_name>" +
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
	
	if(typeof map36 != 'undefined')
		map36.remove();

	var coordinates_data="<address>" +
			"<acc_type>master</acc_type>" +
			"<lat></lat>" +
			"<lng></lng>" +
			"</address>";
	fetch_requested_data('report36',coordinates_data,function(coords)
	{
		map36 = L.map('report36_map',{
			center: [coords[0].lat,coords[0].lng], 
			zoom: 10
		});

		L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
	        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	        subdomains:'1234'
	      }).addTo(map36);
		
		var product_data="<goods_received>" +
				"<sup_bill_id></sup_bill_id>" +
				"<product_name>"+product_name+"</product_name>" +
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
						"<id array='yes'>"+bill_id_array+"</id>" +
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
		var result=transform_to_bar_sum(payments,'amount','acc_name');
		var mybarchart = new Chart(ctx).Bar(result,{});
	});
};
