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
			$('#grid_item_1').html(results[0]);
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
		$('#grid_item_2').html(bill_count);
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
			$('#grid_item_3').html(results[0]);
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
		$('#grid_item_4').html(bill_count);
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
			$('#grid_item_5').html("Rs. "+results[0]);
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
			$('#grid_item_6').html("Rs. "+results[0]);
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
		$('#grid_item_7').html(item_count);
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
			$('#grid_item_8').html(results[0].item_name);
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
		$('#grid_item_9').html(item_count);
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
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='product_instances';
		new_columns.indexes=[{index:'id'},{index:'product_name'},{index:'sale_price'}];

	read_json_rows('',new_columns,function(results)
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
			$('#grid_item_11').html(results[0].product_name);
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
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='product_instances';
		new_columns.indexes=[{index:'id'},{index:'product_name'},{index:'sale_price'},{index:'cost_price'}];

	read_json_rows('',new_columns,function(results)
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
			
			$('#grid_item_12').html(results[0].product_name);
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
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='bills';
		new_columns.return_column='customer_name';
		new_columns.indexes=[{index:'bill_date',lowerbound:(get_raw_time(get_my_date())-1000),upperbound:(get_raw_time(get_my_date())+86399000)}];

	read_json_single_column(new_columns,function(results)
	{	
		$('#grid_item_13').html(results.length);
	});
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
	var new_columns=new Object();
		new_columns.count=1;
		new_columns.start_index=0;
		new_columns.data_store='bills';
		new_columns.return_column='customer_name';
		new_columns.indexes=[{index:'customer_name'}];

	read_json_single_column(new_columns,function(results)
	{
		if(results.length>0)
		{
			$('#grid_item_14').html(results[0]);
		}
	});
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
	var new_columns=new Object();
		new_columns.count=1;
		new_columns.start_index=0;
		new_columns.data_store='supplier_bills';
		new_columns.return_column='supplier';
		new_columns.indexes=[{index:'supplier'}];
	
	read_json_single_column(new_columns,function(results)
	{
		if(results.length>0)
		{
			$('#grid_item_15').html(results[0]);
		}
	});
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
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='payments';
		new_columns.return_column='total_amount';
		new_columns.indexes=[{index:'due_date',upperbound:get_my_time()},
							{index:'type',exact:'paid'},
							{index:'status',exact:'pending'}];
	
	read_json_single_column(new_columns,function(results)
	{
		var payments=0;
		for (var i in results)
		{
			payments+=parseFloat(results[i]);
		}
		$('#grid_item_16').html("Rs. "+payments);
	});
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
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='attendance';
		new_columns.indexes=[{index:'presence',exact:'present'},
							{index:'date',lowerbound:(get_raw_time(get_my_date())-1000),upperbound:(get_raw_time(get_my_date())+86399000)}];
	
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_17').html(item_count);	
	});
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
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='task_instances';
		new_columns.indexes=[{index:'status',exact:'pending'}];
	
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_18').html(item_count);	
	});
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
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='store_areas';
		new_columns.indexes=[{index:'area_type',exact:'storage'}];
	
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_19').html(item_count);	
	});
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
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='sale_orders';
		new_columns.indexes=[{index:'status',exact:'pending'}];
	
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_20').html(item_count);	
	});	
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
	var new_columns=new Object();
		new_columns.count=1;
		new_columns.start_index=0;
		new_columns.data_store='offers';
		new_columns.return_column='offer_name';
		new_columns.indexes=[{index:'status',array:['active','extended']}];
	
	read_json_single_column(new_columns,function(results)
	{
		$('#grid_item_22').html(results[0]);
	});	
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
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='sale_leads';
		new_columns.indexes=[{index:'status',exact:'open'}];
	
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_23').html(item_count);	
	});	
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
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='bills';
		new_columns.return_column='total';
		
		new_columns.indexes=[{index:'bill_date',lowerbound:(get_raw_time(get_my_date())-1000),upperbound:(get_raw_time(get_my_date())+86399000)}];
	
	read_json_single_column(new_columns,function(results)
	{
		var sale=0;
		for (var i in results)
		{
			sale+=parseFloat(results[i]);
		}
		$('#grid_item_26').html("Rs. "+sale);
	});
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
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='projects';
		new_columns.indexes=[{index:'status',exact:'active'}];
	
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_27').html(item_count);	
	});
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
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='projects';
		new_columns.indexes=[{index:'status',exact:'completed'}];
	
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_28').html(item_count);	
	});
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
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='reports';
		new_columns.indexes=[{index:'id'}];
	
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_29').html(item_count);	
	});	
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
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='user_preferences';
		new_columns.indexes=[{index:'type',array:['form','report']},
							{index:'value',exact:'checked'}];
	
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_30').html(item_count);	
	});	
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
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='service_requests';
		new_columns.indexes=[{index:'status',exact:'open'}];
	
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_31').html(item_count);	
	});	
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
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='service_requests';
		new_columns.indexes=[{index:'status',exact:'closed'},
							{index:'last_updated',lowerbound:(get_raw_time(get_my_date())-1000)}];
	
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_32').html(item_count);	
	});
};

/***function limiter***/

/*metric_id*:*grid_item_33
*@*display_name*:*Active Production Plans
*@*grid*:*manufacturing
*@*function_name*:*set_grid_item_33();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_33()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='production_plan';
		new_columns.indexes=[{index:'status',array:['approved','overdue']}];
	
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_33').html(item_count);	
	});
};

/***function limiter***/

/*metric_id*:*grid_item_34
*@*display_name*:*# Pending Tasks (today)
*@*grid*:*manufacturing
*@*function_name*:*set_grid_item_34();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_34()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='task_instances';
		new_columns.indexes=[{index:'t_due',upperbound:(get_raw_time(get_my_date())+86399000)}];
	
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_34').html(item_count);	
	});
};

/***function limiter***/

/*metric_id*:*grid_item_35
*@*display_name*:*# Items under production
*@*grid*:*manufacturing
*@*function_name*:*set_grid_item_35();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_35()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='production_plan_items';
		new_columns.indexes=[{index:'from_time',upperbound:get_my_time()},
							{index:'to_time',lowerbound:get_my_time()}];
	
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_35').html(item_count);	
	});
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
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='logistics_orders';
		new_columns.indexes=[{index:'import_date',exact:get_raw_time(get_my_date())}];
	
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_36').html(item_count);	
	});
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
		$('#grid_item_39').html(item_count);
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
		$('#grid_item_40').html(item_count);
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
		$('#grid_item_41').html(total_credits);
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
		$('#grid_item_42').html(item_count);
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
		$('#grid_item_43').html(item_count);
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
		$('#grid_item_44').html(item_count);
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
		$('#grid_item_45').html(item_count);
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
		$('#grid_item_46').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_47
*@*display_name*:*Active User Accounts
*@*grid*:*admin
*@*function_name*:*set_grid_item_47();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_47()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='accounts';		
			
		new_columns.indexes=[{index:'username',unequal:""},
							{index:'type',array:['master','staff']},
							{index:'status',value:'active'}];
	
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_47').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_48
*@*display_name*:*# Customer Profiles
*@*grid*:*admin
*@*function_name*:*set_grid_item_48();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_48()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='customers';		
			
		new_columns.indexes=[{index:'id'}];
	
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_48').html(item_count);
	});
};