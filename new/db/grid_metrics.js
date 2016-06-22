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
	var new_columns={data_store:'bills',return_column:'id',
					indexes:[{index:'bill_date',lowerbound:(get_raw_time(vTime.date())-1000),
					upperbound:(get_raw_time(vTime.date())+86399999)}]};

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
	var new_columns={data_store:'supplier_bills',return_column:'id',
					indexes:[{index:'entry_date',lowerbound:(get_raw_time(vTime.date())-1000),upperbound:(get_raw_time(vTime.date())+86399999)}]};

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
	var new_columns={sum:'yes',
					data_store:'payments',
					return_column:'total_amount',
					indexes:[{index:'date',lowerbound:(get_raw_time(vTime.date())-1000),upperbound:(get_raw_time(vTime.date())+86399999)},
							{index:'type',exact:'received'},
							{index:'status',array:['pending','closed']}]};

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
		new_columns.sum='yes';
		new_columns.data_store='payments';
		new_columns.return_column='total_amount';
		new_columns.indexes=[{index:'date',lowerbound:(get_raw_time(vTime.date())-1000),upperbound:(get_raw_time(vTime.date())+86399999)},
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
	var new_columns={data_store:'product_master',return_column:'name'};
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
		new_columns.data_store='bill_items';
		new_columns.indexes=[{index:'item_name'},
							{index:'total'},
							{index:'last_updated',lowerbound:(get_raw_time(vTime.date())-1000)}];

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
	var new_columns={data_store:'services',
					indexes:[{index:'name'}]};

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
	var new_columns={data_store:'product_instances',
					indexes:[{index:'id'},{index:'product_name'},{index:'sale_price'}]};

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
	var new_columns={data_store:'product_instances',
					indexes:[{index:'id'},{index:'product_name'},{index:'sale_price'},{index:'cost_price'}]};

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
	var new_columns={data_store:'bills',
					return_column:'customer_name',
					indexes:[{index:'bill_date',lowerbound:(get_raw_time(vTime.date())-1000),upperbound:(get_raw_time(vTime.date())+86399000)}]};

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
	var new_columns={count:1,
					data_store:'bills',
					return_column:'customer_name',
					indexes:[{index:'customer_name'}]};

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
	var new_columns={data_store:'attendance',
									indexes:[{index:'presence',exact:'present'},
													{index:'date',lowerbound:(get_raw_time(vTime.date())-1000),upperbound:(get_raw_time(vTime.date())+86399000)}]};

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
	var new_columns={data_store:'store_areas',return_column:'id'};
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
	var new_columns={data_store:'sale_leads',
									indexes:[{index:'status',exact:'open'}]};

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
	var new_columns={data_store:'bills',
					return_column:'total',
					indexes:[{index:'bill_date',lowerbound:(get_raw_time(vTime.date())-1000),upperbound:(get_raw_time(vTime.date())+86399000)}]};

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
	var new_columns={data_store:'user_preferences',
					indexes:[{index:'type',array:['form','report']},
							{index:'value',exact:'checked'}]};

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
		new_columns.data_store='service_requests';
		new_columns.indexes=[{index:'status',exact:'closed'},
							{index:'last_updated',lowerbound:(get_raw_time(vTime.date())-1000)}];

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
		new_columns.data_store='task_instances';
		new_columns.indexes=[{index:'t_due',upperbound:(get_raw_time(vTime.date())+86399000)}];

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
		new_columns.data_store='logistics_orders';
		new_columns.indexes=[{index:'import_date',exact:get_raw_time(vTime.date())}];

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
		new_columns.data_store='logistics_orders';
		new_columns.indexes=[{index:'status',array:['pending','undelivered','received','out for delivery']},
							{index:'import_date',exact:get_raw_time(vTime.date())}];

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
		new_columns.data_store='drs';
		new_columns.indexes=[{index:'drs_time',lowebound:(get_raw_time(vTime.date())-1000)}];

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
		new_columns.data_store='rto';
		new_columns.indexes=[{index:'rto_time',lowebound:(get_raw_time(vTime.date())-1000)}];

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
		new_columns.data_store='quotation';
		new_columns.indexes=[{index:'date',lowebound:(get_raw_time(vTime.date())-2592000000)}];

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
		new_columns.data_store='delivery_challans';

		new_columns.indexes=[{index:'challan_date',lowebound:(get_raw_time(vTime.date())-1000)}];

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
	var new_columns={data_store:'accounts',
					indexes:[{index:'username',unequal:"",isnull:'no'},
							{index:'type',array:['master','staff']},
							{index:'status',value:'active'}]};

	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_47').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_48
*@*display_name*:*# Customer Profiles
*@*grid*:*people
*@*function_name*:*set_grid_item_48();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_48()
{
	var new_columns={data_store:'customers',indexes:[{index:'id'}]};
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_48').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_49
*@*display_name*:*# Pending Sale Challans
*@*grid*:*admin
*@*function_name*:*set_grid_item_49();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_49()
{
	var new_columns=new Object();
		new_columns.data_store='unbilled_sale_items';

		new_columns.indexes=[{index:'bill_status',exact:'pending'}];

	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_49').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_50
*@*display_name*:*# Pending Purchase Challans
*@*grid*:*admin
*@*function_name*:*set_grid_item_50();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_50()
{
	var new_columns=new Object();
		new_columns.data_store='unbilled_purchase_items';

		new_columns.indexes=[{index:'bill_status',exact:'pending'}];

	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_50').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_51
*@*display_name*:*# Product Batches
*@*grid*:*inventory
*@*function_name*:*set_grid_item_51();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_51()
{
	var new_columns=new Object();
		new_columns.data_store='product_instances';
		new_columns.indexes=[{index:'batch'}];

	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_51').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_52
*@*display_name*:*Quantity Stocked Today
*@*grid*:*inventory
*@*function_name*:*set_grid_item_52();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_52()
{
	var new_columns=new Object();
		new_columns.data_store='inventory_adjust';
		new_columns.return_column='quantity';
		new_columns.sum='yes';

		new_columns.indexes=[{index:'source',exact:'manual'},
							{index:'last_updated',lowerbound:get_raw_time(vTime.date())}];

	read_json_single_column(new_columns,function(item_count)
	{
		$('#grid_item_52').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_53
*@*display_name*:*Quantity to pick
*@*grid*:*inventory
*@*function_name*:*set_grid_item_53();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_53()
{
	var new_columns=new Object();
		new_columns.data_store='inventory_adjust';

		new_columns.indexes=[{index:'picked_status',exact:'pending'},
							{index:'quantity'},{index:'picked_quantity'}];

	read_json_rows('',new_columns,function(adjusts)
	{
		var adjust_quantity=0;

		for(var a in adjusts)
		{
			if(!isNaN(adjusts[a].picked_quantity) && adjusts[a].picked_quantity!=null)
				adjust_quantity+=parseFloat(adjusts[a].picked_quantity);
			if(!isNaN(adjusts[a].quantity) && adjusts[a].quantity!=null)
				adjust_quantity-=parseFloat(adjusts[a].quantity);
		}
		var new_columns2=new Object();
			new_columns2.count=0;
			new_columns2.start_index=0;
			new_columns2.data_store='bill_items';

			new_columns2.indexes=[{index:'picked_status',exact:'pending'},
								{index:'quantity'},{index:'picked_quantity'}];

		read_json_rows('',new_columns2,function(bill_items)
		{
			for(var b in bill_items)
			{
				if(!isNaN(bill_items[b].quantity) && bill_items[b].quantity!=null)
					adjust_quantity+=parseFloat(bill_items[b].quantity);
				if(!isNaN(adjusts[b].picked_quantity) && adjusts[b].picked_quantity!=null)
					adjust_quantity-=parseFloat(bill_items[b].picked_quantity);
			}
			$('#grid_item_53').html(adjust_quantity);
		});
	});
};

/***function limiter***/

/*metric_id*:*grid_item_54
*@*display_name*:*Quantity to put-away
*@*grid*:*inventory
*@*function_name*:*set_grid_item_54();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_54()
{
	var new_columns=new Object();
		new_columns.data_store='inventory_adjust';

		new_columns.indexes=[{index:'put_away_status',exact:'pending'},
							{index:'quantity'},{index:'placed_quantity'}];

	read_json_rows('',new_columns,function(adjusts)
	{
		var adjust_quantity=0;

		for(var a in adjusts)
		{
			if(!isNaN(adjusts[a].quantity) && adjusts[a].quantity!=null)
				adjust_quantity+=parseFloat(adjusts[a].quantity);
			if(!isNaN(adjusts[a].placed_quantity) && adjusts[a].placed_quantity!=null)
				adjust_quantity-=parseFloat(adjusts[a].placed_quantity);
		}
		var new_columns2=new Object();
			new_columns2.count=0;
			new_columns2.start_index=0;
			new_columns2.data_store='supplier_bill_items';

			new_columns2.indexes=[{index:'put_away_status',exact:'pending'},
							{index:'quantity'},{index:'placed_quantity'}];

		read_json_rows('',new_columns2,function(bill_items)
		{
			for(var b in bill_items)
			{
				if(!isNaN(bill_items[b].quantity) && bill_items[b].quantity!=null)
					adjust_quantity+=parseFloat(bill_items[b].quantity);
				if(!isNaN(bill_items[b].placed_quantity) && bill_items[b].placed_quantity!=null)
					adjust_quantity-=parseFloat(bill_items[b].placed_quantity);
			}
			$('#grid_item_54').html(adjust_quantity);
		});
	});
};

/***function limiter***/

/*metric_id*:*grid_item_55
*@*display_name*:*Pending Reviews
*@*grid*:*inventory
*@*function_name*:*set_grid_item_55();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_55()
{
	var new_columns=new Object();
		new_columns.data_store='discarded';
		new_columns.indexes=[{index:'status',exact:'pending approval'}];

	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_55').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_56
*@*display_name*:*Quantity In (today)
*@*grid*:*inventory
*@*function_name*:*set_grid_item_56();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_56()
{
	var new_columns=new Object();
		new_columns.data_store='bill_items';
		new_columns.sum='yes';
		new_columns.return_column='quantity';
		new_columns.indexes=[{index:'issue_type',exact:'in'},
							{index:'issue_date',exact:get_raw_time(vTime.date())}];

	read_json_single_column(new_columns,function(items)
	{
		$('#grid_item_56').html(items[0]);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_57
*@*display_name*:*Quantity Out (today)
*@*grid*:*inventory
*@*function_name*:*set_grid_item_57();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_57()
{
	var new_columns=new Object();
		new_columns.data_store='bill_items';
		new_columns.sum='yes';
		new_columns.return_column='quantity';
		new_columns.indexes=[{index:'issue_type',exact:'out'},
							{index:'issue_date',exact:get_raw_time(vTime.date())}];

	read_json_single_column(new_columns,function(items)
	{
		$('#grid_item_57').html(-items[0]);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_58
*@*display_name*:*# Sale Entries (today)
*@*grid*:*inventory
*@*function_name*:*set_grid_item_58();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_58()
{
	var new_columns=new Object();
		new_columns.data_store='bill_items';
		new_columns.indexes=[{index:'issue_type',exact:'out'},
							{index:'hiring_type',exact:'sale'},
							{index:'issue_date',exact:get_raw_time(vTime.date())}];

	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_58').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_59
*@*display_name*:*# Purchase Entries (today)
*@*grid*:*inventory
*@*function_name*:*set_grid_item_59();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_59()
{
	var new_columns=new Object();
		new_columns.data_store='bill_items';
		new_columns.indexes=[{index:'issue_type',exact:'in'},
							{index:'hiring_type',exact:'purchase'},
							{index:'issue_date',exact:get_raw_time(vTime.date())}];

	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_59').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_60
*@*display_name*:*# Email Unsubscribes
*@*grid*:*promotion
*@*function_name*:*set_grid_item_60();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_60()
{
	var new_columns=new Object();
		new_columns.data_store='customers';
		new_columns.indexes=[{index:'email_subscription',exact:'no'}];

	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_60').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_61
*@*display_name*:*Total QR Scans
*@*grid*:*qr_scan
*@*function_name*:*set_grid_item_61();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_61()
{
	var new_columns=new Object();
		new_columns.data_store='qr_scans';
		new_columns.indexes=[{index:'id'}];

	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_61').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_62
*@*display_name*:*Pending Conversions
*@*grid*:*qr_scan
*@*function_name*:*set_grid_item_62();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_62()
{
	var new_columns=new Object();
		new_columns.data_store='qr_scans';
		new_columns.indexes=[{index:'status',exact:'pending'}];

	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_62').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_63
*@*display_name*:*# Staff Profiles
*@*grid*:*people
*@*function_name*:*set_grid_item_63();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_63()
{
	var new_columns={data_store:'staff',return_column:'id'};
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_63').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_64
*@*display_name*:*# Open Letters
*@*grid*:*people
*@*function_name*:*set_grid_item_64();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_64()
{
	var new_columns=new Object();
		new_columns.data_store='letters';

		new_columns.indexes=[{index:'status',exact:'open'}];

	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_64').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_65
*@*display_name*:*# Due Letters
*@*grid*:*people
*@*function_name*:*set_grid_item_65();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_65()
{
	var new_columns=new Object();
		new_columns.data_store='letters';

		new_columns.indexes=[{index:'status',exact:'open'},{index:'due_date',upperbound:get_my_time()}];

	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_65').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_66
*@*display_name*:*# Supplier Profiles
*@*grid*:*people
*@*function_name*:*set_grid_item_66();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_66()
{
	var new_columns={data_store:'suppliers',return_column:'id'};
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_66').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_67
*@*display_name*:*# Birthdays
*@*grid*:*people
*@*function_name*:*set_grid_item_67();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_67()
{
	var new_columns={data_store:'attributes',return_column:'value',
                    indexes:[{index:'type',exact:'customer'},
                            {index:'attribute',exact:'Birthday'}]};
	read_json_single_column(new_columns,function(items)
	{
        var item_count=0;
        var d=new Date();
        var month =d.getMonth()+1;
        if (month < 10) {
            month = "0" + month;
        }
        var date = d.getDate();
        if (date < 10) {
            date = "0" + date;
        }
        var time=date+"/"+month;

        for(var i in items)
        {
            if(items[i].indexOf(time)!=-1)
            {
                item_count+=1;
            }
        }
		$('#grid_item_67').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_68
*@*display_name*:*Wastage Today
*@*grid*:*people
*@*function_name*:*set_grid_item_68();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_68()
{
	var new_columns={data_store:'discarded',sum:'yes',return_column:'quantity',
                    indexes:[{index:'date',lowerbound:get_raw_time(vTime.date()),upperbound:get_raw_time(vTime.date())+86399000}]};
	read_json_single_column(new_columns,function(item_count)
	{
		$('#grid_item_68').html(item_count[0]+" pieces");
	});
};

/***function limiter***/

/*metric_id*:*grid_item_69
*@*display_name*:*Pending Receivables
*@*grid*:*finances
*@*function_name*:*set_grid_item_69();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_69()
{
	var new_columns={data_store:'payments',
                     indexes:[{index:'paid_amount'},{index:'total_amount'},
                             {index:'type',exact:'received'},
                             {index:'status',exact:'pending'}]};
	read_json_rows('',new_columns,function(results)
	{
		var amount=0;
		for (var i in results)
		{
			amount+=parseFloat(results[i].total_amount)-parseFloat(results[i].paid_amount);
		}
		$('#grid_item_69').html("Rs. "+amount);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_70
*@*display_name*:*# Documents
*@*grid*:*reports
*@*function_name*:*set_grid_item_70();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_70()
{
	var new_columns={data_store:'s3_objects',return_column:'id'};
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_70').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_71
*@*display_name*:*# Tabs
*@*grid*:*reports
*@*function_name*:*set_grid_item_71();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_71()
{
	var new_columns={data_store:'tabs_list',return_column:'id'};
	read_json_count(new_columns,function(item_count)
	{
		$('#grid_item_71').html(item_count);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_72
*@*display_name*:*# Accounts
*@*grid*:*reports
*@*function_name*:*set_grid_item_72();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_72()
{
	var new_columns={data_store:'user_profile',database:'0',return_column:'id'};
	read_json_single_column_master(new_columns,function(items)
	{
		$('#grid_item_72').html(items.length);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_73
*@*display_name*:*Appointments Today
*@*grid*:*appointments
*@*function_name*:*set_grid_item_73();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_73()
{
	var new_columns={data_store:'appointments',return_column:'id',
									indexes:[{index:'schedule',lowerbound:get_raw_time(vTime.date()),upperbound:(get_raw_time(vTime.date())+86400000)},
													{index:'status',exact:'pending'}]};
	read_json_single_column(new_columns,function(items)
	{
		$('#grid_item_73').html(items.length);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_74
*@*display_name*:*Prescriptions Issued Today
*@*grid*:*prescriptions
*@*function_name*:*set_grid_item_74();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_74()
{
	var new_columns={data_store:'prescriptions',return_column:'id',
									indexes:[{index:'date',lowerbound:get_raw_time(vTime.date())-1,upperbound:(get_raw_time(vTime.date())+86400000-1)}]};
	read_json_single_column(new_columns,function(items)
	{
		$('#grid_item_74').html(items.length);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_75
*@*display_name*:*Active Policies
*@*grid*:*policies
*@*function_name*:*set_grid_item_75();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_75()
{
	var new_columns={data_store:'policies',return_column:'id',
									indexes:[{index:'status',exact:'active'}]};
	read_json_single_column(new_columns,function(items)
	{
		$('#grid_item_75').html(items.length);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_76
*@*display_name*:*Pending Commissions
*@*grid*:*commissions
*@*function_name*:*set_grid_item_76();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_76()
{
	var new_columns={data_store:'policy_commissions',return_column:'id',
									indexes:[{index:'status',exact:'pending'}]};
	read_json_single_column(new_columns,function(items)
	{
		$('#grid_item_76').html(items.length);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_77
*@*display_name*:*Pending Claims
*@*grid*:*commissions
*@*function_name*:*set_grid_item_77();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_77()
{
	var new_columns={data_store:'policy_claims',return_column:'id',
									indexes:[{index:'status',exact:'pending'}]};
	read_json_single_column(new_columns,function(items)
	{
		$('#grid_item_77').html(items.length);
	});
};

/***function limiter***/

/*metric_id*:*grid_item_78
*@*display_name*:*# Transactions Today
*@*grid*:*commissions
*@*function_name*:*set_grid_item_78();
*@*status*:*active
*@*last_updated*:*1
*@*repeat_time*:*3600
*@*function_def*:*
*/
function set_grid_item_78()
{
	var new_columns={data_store:'transactions',return_column:'id',
					indexes:[{index:'trans_date',lowerbound:get_raw_time(vTime.date())-1,upperbound:(get_raw_time(vTime.date())+86400000-1)}]};

	read_json_single_column(new_columns,function(items)
	{
		$('#grid_item_78').html(items.length);
	});
};
