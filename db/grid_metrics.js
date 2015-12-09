/*metric_id*:*grid_item_1
*@*display_name*:*Last Sale Bill #
*@*grid*:*sales
*@*function_name*:*set_grid_item_1();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_1()
{
	var new_columns=new Object();
		new_columns.count=1;
		new_columns.start_index=0;
		new_columns.data_store='bills';
		new_columns.indexes=[{index:'bill_num'}];		
		new_columns.return_column='bill_num';

	read_json_single_column(new_columns,function(results)
	{
		if(results.length>0)
		{
			var grid_item=document.getElementById('grid_item_1');
			$(grid_item).html(results[0]);
		}
	});
};

/***function limiter***/

/*metric_id*:*grid_item_2
*@*display_name*:*# Sale Bills today
*@*grid*:*sales
*@*function_name*:*set_grid_item_2();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_2()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='bills';
		new_columns.indexes=[{index:'bill_date',lowerbound:(get_raw_time(get_my_date())-1000),upperbound:(get_raw_time(get_my_date())+86399999)}];		

	read_json_count(new_columns,function(bill_count)
	{
		var grid_item=document.getElementById('grid_item_2');
		$(grid_item).html(bill_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_3
*@*display_name*:*Last Bill #
*@*grid*:*purchase
*@*function_name*:*set_grid_item_3();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_3()
{
	var new_columns=new Object();
		new_columns.count=1;
		new_columns.start_index=0;
		new_columns.data_store='supplier_bills';
		new_columns.indexes=[{index:'bill_id'}];		
		new_columns.return_column='bill_id';

	read_json_single_column(new_columns,function(results)
	{
		if(results.length>0)
		{
			var grid_item=document.getElementById('grid_item_3');
			$(grid_item).html(results[0]);
		}
	});
};

/***function limiter***/

/*metric_id*:*grid_item_4
*@*display_name*:*# Bills entered today
*@*grid*:*purchase
*@*function_name*:*set_grid_item_4();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_4()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='supplier_bills';
		new_columns.indexes=[{index:'entry_date',lowerbound:(get_raw_time(get_my_date())-1000),upperbound:(get_raw_time(get_my_date())+86399999)}];		

	read_json_count(new_columns,function(bill_count)
	{
		var grid_item=document.getElementById('grid_item_4');
		$(grid_item).html(bill_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_5
*@*display_name*:*Income (today)
*@*grid*:*finances
*@*function_name*:*set_grid_item_5();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_5()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.sum='yes';
		new_columns.data_store='payments';
		new_columns.return_column='total_amount';
		new_columns.indexes=[{index:'date',lowerbound:(get_raw_time(get_my_date())-1000),upperbound:(get_raw_time(get_my_date())+86399999)},
							{index:'type',exact:'received'},
							{index:'status',array:['pending','closed']}];

	read_json_single_column(new_columns,function(results)
	{
		if(results.length>0)
		{
			var grid_item=document.getElementById('grid_item_5');
			$(grid_item).html("Rs. "+results[0]);
		}
	});
};

/***function limiter***/

/*metric_id*:*grid_item_6
*@*display_name*:*Expenses (today)
*@*grid*:*finances
*@*function_name*:*set_grid_item_6();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_6()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.sum='yes';
		new_columns.data_store='payments';
		new_columns.return_column='total_amount';
		new_columns.indexes=[{index:'date',lowerbound:(get_raw_time(get_my_date())-1000),upperbound:(get_raw_time(get_my_date())+86399999)},
							{index:'type',exact:'paid'},
							{index:'status',array:['pending','closed']}];

	read_json_single_column(new_columns,function(results)
	{
		if(results.length>0)
		{
			var grid_item=document.getElementById('grid_item_6');
			$(grid_item).html("Rs. "+results[0]);
		}
	});
};

/***function limiter***/

/*metric_id*:*grid_item_7
*@*display_name*:*# Products offered
*@*grid*:*products
*@*function_name*:*set_grid_item_7();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_7()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='product_master';
		new_columns.indexes=[{index:'name'}];

	read_json_count(new_columns,function(item_count)
	{
		var grid_item=document.getElementById('grid_item_7');
		$(grid_item).html(item_count);
	});	
};

/***function limiter***/

/*metric_id*:*grid_item_8
*@*display_name*:*Bestseller (today)
*@*grid*:*products
*@*function_name*:*set_grid_item_8();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_8()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='bill_items';
		new_columns.indexes=[{index:'item_name'},
							{index:'total'},
							{index:'last_updated',lowerbound:(get_raw_time(get_my_date())-1000)}];

	read_json_rows('',new_columns,function(results)
	{
		for(var i=0; i<results.length;i++)
		{
			for(var j=i+1;j<results.length;j++)
			{
				if(results[i].item_name==results[j].item_name)
				{
					results[i].total=parseFloat(results[i].total)+parseFloat(results[j].total);
					results.splice(j,1);
					j-=1;
				}
			}
		}
		
		results.sort(function(a,b)
		{
			if(parseFloat(a.total)<parseFloat(b.total))
			{	return 1;}
			else 
			{	return -1;}
		});
		if(results.length>0)
		{
			var grid_item=document.getElementById('grid_item_8');
			$(grid_item).html(results[0].item_name);
		}
	});
};

/***function limiter***/

/*metric_id*:*grid_item_9
*@*display_name*:*# Services Offered
*@*grid*:*services
*@*function_name*:*set_grid_item_9();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_9()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='services';
		new_columns.indexes=[{index:'name'}];

	read_json_count(new_columns,function(item_count)
	{
		var grid_item=document.getElementById('grid_item_9');
		$(grid_item).html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_11
*@*display_name*:*Most Expensive
*@*grid*:*products
*@*function_name*:*set_grid_item_11();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_11()
{
	var columns="<product_instances>" +
		"<id></id>" +
		"<product_name></product_name>" +
		"<sale_price></sale_price>" +
		"</product_instances>";
	fetch_requested_data('',columns,function(results)
	{
		results.sort(function(a,b)
		{
			if(parseFloat(a.sale_price)<parseFloat(b.sale_price))
			{	return 1;}
			else 
			{	return -1;}
		});
				
		if(results.length>0)
		{
			var grid_item=document.getElementById('grid_item_11');
			$(grid_item).off('click');
			$(grid_item).on('click',function(ev)
			{
				element_display(results[0].id,'form1');
			});
			grid_item.innerHTML=results[0].product_name;
		}
	});
};

/***function limiter***/

/*metric_id*:*grid_item_12
*@*display_name*:*Highest Margin Product
*@*grid*:*products
*@*function_name*:*set_grid_item_12();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_12()
{
	var columns="<product_instances>" +
		"<id></id>" +
		"<product_name></product_name>" +
		"<sale_price></sale_price>" +
		"<cost_price></cost_price>" +
		"</product_instances>";
	fetch_requested_data('',columns,function(results)
	{
		if(results.length>0)
		{
			for(var k in results)
			{
				var cost_price=parseFloat(results[k].cost_price);
				if(cost_price!=0 && cost_price!='NaN')
					results[k].margin=(parseFloat(results[k].sale_price)/cost_price);
			}
			
			results.sort(function(a,b)
			{
				if(parseFloat(a.margin)<parseFloat(b.margin))
				{	return 1;}
				else 
				{	return -1;}
			});
			
			var grid_item=document.getElementById('grid_item_12');
			$(grid_item).off('click');
			$(grid_item).on('click',function(ev)
			{
				element_display(results[0].id,'form1');
			});
			grid_item.innerHTML=results[0].product_name;
		}
	});
};

/***function limiter***/

/*metric_id*:*grid_item_13
*@*display_name*:*# Customers Today
*@*grid*:*people
*@*function_name*:*set_grid_item_13();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_13()
{
	var columns="<bills>" +
		"<customer_name></customer_name>" +
		"<bill_date lowerbound='yes'>"+(get_raw_time(get_my_date())-1000)+"</bill_date>" +
		"<bill_date upperbound='yes'>"+(get_raw_time(get_my_date())+86400000)+"</bill_date>" +
		"</bills>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_13').innerHTML=results.length;
	},columns);
};

/***function limiter***/

/*metric_id*:*grid_item_14
*@*display_name*:*Last Customer
*@*grid*:*people
*@*function_name*:*set_grid_item_14();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_14()
{
	var columns="<bills count='1'>" +
		"<customer_name></customer_name>" +
		"</bills>";
	get_single_column_data(function(results)
	{
		if(results.length>0)
		{
			document.getElementById('grid_item_14').innerHTML=results[0];
		}
	},columns);
};

/***function limiter***/

/*metric_id*:*grid_item_15
*@*display_name*:*Last Supplier
*@*grid*:*people
*@*function_name*:*set_grid_item_15();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_15()
{
	var columns="<supplier_bills count='1'>" +
		"<supplier></supplier>" +
		"</supplier_bills>";
	get_single_column_data(function(results)
	{
		if(results.length>0)
		{
			document.getElementById('grid_item_15').innerHTML=results[0];
		}
	},columns);
};

/***function limiter***/

/*metric_id*:*grid_item_16
*@*display_name*:*Payments due to suppliers
*@*grid*:*finances
*@*function_name*:*set_grid_item_16();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_16()
{
	var columns="<payments>" +
		"<total_amount></total_amount>" +
		"<due_date upperbound='yes'>"+get_my_time()+"</due_date>" +
		"<type exact='yes'>paid</type>" +
		"<status exact='yes'>pending</status>" +
		"</payments>";
	
	get_single_column_data(function(results)
	{
		var payments=0;
		for (var i in results)
		{
			payments+=parseFloat(results[i]);
		}
		document.getElementById('grid_item_16').innerHTML="Rs. "+payments;
	},columns);
};

/***function limiter***/

/*metric_id*:*grid_item_17
*@*display_name*:*# Staff present
*@*grid*:*people
*@*function_name*:*set_grid_item_17();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_17()
{
	var columns="<attendance>" +
		"<id></id>" +
		"<presence exact='yes'>present</presence>" +
		"<date lowerbound='yes'>"+(get_raw_time(get_my_date())-1000)+"</date>" +
		"<date upperbound='yes'>"+(get_raw_time(get_my_date())+86400000)+"</date>" +
		"</attendance>";
	
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_17').innerHTML=results.length;
	},columns);
};

/***function limiter***/

/*metric_id*:*grid_item_18
*@*display_name*:*# Pending Tasks
*@*grid*:*projects
*@*function_name*:*set_grid_item_18();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_18()
{
	var columns="<task_instances>" +
		"<id></id>" +
		"<status exact='yes'>pending</status>" +
		"</task_instances>";
	
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_18').innerHTML=results.length;
	},columns);
};

/***function limiter***/

/*metric_id*:*grid_item_19
*@*display_name*:*# Storage Areas
*@*grid*:*store
*@*function_name*:*set_grid_item_19();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_19()
{
	var columns="<store_areas>" +
		"<id></id>" +
		"<area_type exact='yes'>storage</area_type>" +
		"</store_areas>";
	
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_19').innerHTML=results.length;
	},columns);
};

/***function limiter***/

/*metric_id*:*grid_item_20
*@*display_name*:*# Pending Orders
*@*grid*:*ecommerce
*@*function_name*:*set_grid_item_20();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_20()
{
	var columns="<sale_orders>" +
		"<id></id>" +
		"<status exact='yes'>pending</status>" +
		"</sale_orders>";
	
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_20').innerHTML=results.length;
	},columns);
};

/***function limiter***/

/*metric_id*:*grid_item_22
*@*display_name*:*Latest Offer
*@*grid*:*promotion
*@*function_name*:*set_grid_item_22();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_22()
{
	var columns="<offers count='1'>" +
		"<offer_name></offer_name>" +
		"<status array='yes'>--active--extended--</status>" +
		"</offers>";
	get_single_column_data(function(results)
	{
		if(results.length>0)
		{
			document.getElementById('grid_item_22').innerHTML=results[0];
		}
	},columns);
};

/***function limiter***/

/*metric_id*:*grid_item_23
*@*display_name*:*# Open Sale Leads
*@*grid*:*promotion
*@*function_name*:*set_grid_item_23();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_23()
{
	var columns="<sale_leads>" +
		"<id></id>" +
		"<status exact='yes'>open</status>"+		
		"</sale_leads>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_23').innerHTML=results.length;
	},columns);
};

/***function limiter***/

/*metric_id*:*grid_item_26
*@*display_name*:*Total Sale today
*@*grid*:*reports
*@*function_name*:*set_grid_item_26();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_26()
{
	var columns="<bills>" +
		"<total></total>" +
		"<bill_date lowerbound='yes'>"+(get_raw_time(get_my_date())-1000)+"</bill_date>" +
		"<bill_date upperbound='yes'>"+(get_raw_time(get_my_date())+86400000)+"</bill_date>" +
		"</bills>";
	get_single_column_data(function(results)
	{
		var sale=0;
		for (var i in results)
		{
			sale+=parseFloat(results[i]);
		}
		document.getElementById('grid_item_26').innerHTML="Rs. "+sale;
	},columns);
};

/***function limiter***/

/*metric_id*:*grid_item_27
*@*display_name*:*# Active Projects
*@*grid*:*projects
*@*function_name*:*set_grid_item_27();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_27()
{
	var columns="<projects>" +
		"<id></id>" +
		"<status exact='yes'>active</status>" +
		"</projects>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_27').innerHTML=results.length;
	},columns);
};

/***function limiter***/

/*metric_id*:*grid_item_28
*@*display_name*:*# Completed Projects
*@*grid*:*projects
*@*function_name*:*set_grid_item_28();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_28()
{
	var columns="<projects>" +
		"<id></id>" +
		"<status exact='yes'>completed</status>" +
		"</projects>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_28').innerHTML=results.length;
	},columns);
};

/***function limiter***/

/*metric_id*:*grid_item_29
*@*display_name*:*# Customer Reports
*@*grid*:*admin
*@*function_name*:*set_grid_item_29();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_29()
{
	var columns="<reports>" +
		"<id></id>" +
		"</reports>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_29').innerHTML=results.length;
	},columns);
};

/***function limiter***/

/*metric_id*:*grid_item_30
*@*display_name*:*# Active Tabs
*@*grid*:*admin
*@*function_name*:*set_grid_item_30();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_30()
{
	var columns="<user_preferences>" +
		"<id></id>" +
		"<type array='yes'>--form--report--</type>" +
		"<value exact='yes'>checked</value>" +
		"</user_preferences>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_30').innerHTML=results.length;
	},columns);
};

/***function limiter***/

/*metric_id*:*grid_item_31
*@*display_name*:*# Open Service Requests
*@*grid*:*customer_service
*@*function_name*:*set_grid_item_31();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_31()
{
	var columns="<service_requests>" +
		"<id></id>" +
		"<status exact='yes'>open</status>" +
		"</service_requests>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_31').innerHTML=results.length;
	},columns);
};

/***function limiter***/

/*metric_id*:*grid_item_32
*@*display_name*:*Service requests closed today
*@*grid*:*customer_service
*@*function_name*:*set_grid_item_32();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_32()
{
	var columns="<service_requests>" +
		"<id></id>" +
		"<status exact='yes'>closed</status>" +
		"<last_updated lowerbound='yes'>"+(get_raw_time(get_my_date())-1000)+"</last_updated>"+
		"</service_requests>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_32').innerHTML=results.length;
	},columns);
};

/***function limiter***/

/*metric_id*:*grid_item_36
*@*display_name*:*Orders Imported Today
*@*grid*:*orders
*@*function_name*:*set_grid_item_36();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_36()
{
	var columns="<logistics_orders>" +
		"<id></id>" +
		"<import_date exact='yes'>"+get_raw_time(get_my_date())+"</import_date>"+
		"</logistics_orders>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_36').innerHTML=results.length;
	},columns);
};

/***function limiter***/

/*metric_id*:*grid_item_39
*@*display_name*:*# Pending Orders
*@*grid*:*drs
*@*function_name*:*set_grid_item_39();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_39()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='logistics_orders';
		new_columns.indexes=[{index:'status',array:['pending','undelivered','received','out for delivery']},
							{index:'import_date',exact:get_raw_time(get_my_date())}];

	read_json_count(new_columns,function(item_count)
	{
		var grid_item=document.getElementById('grid_item_39');
		$(grid_item).html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_40
*@*display_name*:*# Active treatments
*@*grid*:*treatment
*@*function_name*:*set_grid_item_40();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_40()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='treatment_plans';
		new_columns.indexes=[{index:'status',exact:'active'}];

	read_json_count(new_columns,function(item_count)
	{
		var grid_item=document.getElementById('grid_item_40');
		$(grid_item).html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_41
*@*display_name*:*Unbilld SMS credits
*@*grid*:*promotion
*@*function_name*:*set_grid_item_41();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_41()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='sms';
		new_columns.indexes=[{index:'message'},
							{index:'receiver'},
							{index:'status',exact:'sent'},
							{index:'billing_status',exact:'pending'}];

	read_json_rows('',new_columns,function(results)
	{
		var sms_char_length=160;
		var total_credits=0;
		results.forEach(function(result)
		{
			result.num_sms=Math.floor(result.message.length/sms_char_length)+1;
			result.num_phone=Math.floor(result.receiver.length/13)+1;
			result.sms_credit=result.num_sms*result.num_phone;
			
			total_credits+=result.sms_credit;
		});
		var grid_item=document.getElementById('grid_item_41');
		$(grid_item).html(total_credits);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_42
*@*display_name*:*# DRS (today)
*@*grid*:*drs
*@*function_name*:*set_grid_item_42();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_42()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='drs';
		new_columns.indexes=[{index:'drs_time',lowebound:(get_raw_time(get_my_date())-1000)}];

	read_json_count(new_columns,function(item_count)
	{
		var grid_item=document.getElementById('grid_item_42');
		$(grid_item).html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_43
*@*display_name*:*# RTO (today)
*@*grid*:*rto
*@*function_name*:*set_grid_item_43();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_43()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='rto';
		new_columns.indexes=[{index:'rto_time',lowebound:(get_raw_time(get_my_date())-1000)}];

	read_json_count(new_columns,function(item_count)
	{
		var grid_item=document.getElementById('grid_item_43');
		$(grid_item).html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_44
*@*display_name*:*# Quotations (last 30 days)
*@*grid*:*quotation
*@*function_name*:*set_grid_item_44();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_44()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='quotation';
		new_columns.indexes=[{index:'date',lowebound:(get_raw_time(get_my_date())-2592000000)}];

	read_json_count(new_columns,function(item_count)
	{
		var grid_item=document.getElementById('grid_item_44');
		$(grid_item).html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_45
*@*display_name*:*# Different Spare Parts
*@*grid*:*inventory
*@*function_name*:*set_grid_item_45();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_45()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='attributes';		
			
		new_columns.indexes=[{index:'type',exact:'product'},
							{index:'value',exact:'yes'},
							{index:'attribute',exact:'Spare Part'}];
	
	read_json_count(new_columns,function(item_count)
	{
		var grid_item=document.getElementById('grid_item_45');
		$(grid_item).html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_46
*@*display_name*:*# Challans today
*@*grid*:*challan
*@*function_name*:*set_grid_item_46();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_46()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='delivery_challans';		
			
		new_columns.indexes=[{index:'challan_date',lowebound:(get_raw_time(get_my_date())-1000)}];
	
	read_json_count(new_columns,function(item_count)
	{
		var grid_item=document.getElementById('grid_item_46');
		$(grid_item).html(item_count);
	});
};