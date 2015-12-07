/**
 * @item Last Sale Bill Id
 * @itemNo 1
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
	
	setTimeout(set_grid_item_1,600000);
};

/**
 * @item # Sale bills today
 * @itemNo 2
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

	setTimeout(set_grid_item_2,600000);
};

/**
 * @item # Last Purchase Bill No
 * @itemNo 3
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
	
	setTimeout(set_grid_item_3,3600000);
};

/**
 * @item # bills entered today
 * @itemNo 4
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
	
	setTimeout(set_grid_item_4,3600000);
};


/**
 * @item Today's Income
 * @itemNo 5
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
							{index:'status',array:{'pending','closed'}}];

	read_json_single_column(new_columns,function(results)
	{
		if(results.length>0)
		{
			var grid_item=document.getElementById('grid_item_5');
			$(grid_item).html("Rs. "+results[0]);
		}
	});
	
	setTimeout(set_grid_item_5,3600000);
};

/**
 * @item Today's Expenses
 * @itemNo 6
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
							{index:'status',array:{'pending','closed'}}];

	read_json_single_column(new_columns,function(results)
	{
		if(results.length>0)
		{
			var grid_item=document.getElementById('grid_item_6');
			$(grid_item).html("Rs. "+results[0]);
		}
	});

	setTimeout(set_grid_item_6,3600000);
};

/**
 * @item # Products offered 
 * @itemNo 7
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

/**
 * @item Today's Best selling product
 * @itemNo 8
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

	read_json_rows('',columns,function(results)
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
	setTimeout(set_grid_item_8,3600000);
};


/**
 * @item # Services offered 
 * @itemNo 9
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


/**
 * @item Most expensive product
 * @itemNo 11
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

/**
 * @item Highest Margin product
 * @itemNo 12
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

/**
 * @item Today's unique customers 
 * @itemNo 13
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
	setTimeout(set_grid_item_13,600000);
};

/**
 * @item Last customer
 * @itemNo 14
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
	setTimeout(set_grid_item_14,100000);
};

/**
 * @item Last supplier
 * @itemNo 15
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
	setTimeout(set_grid_item_15,3600000);

};

/**
 * @item Payments due to suppliers
 * @itemNo 16
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
	setTimeout(set_grid_item_16,3600000);

};

/**
 * @item # staff present
 * @itemNo 17
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

/**
 * @item # pending tasks
 * @itemNo 18
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
	setTimeout(set_grid_item_18,600000);
};

/**
 * @item # storage areas
 * @itemNo 19
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

/**
 * @item # pending orders
 * @itemNo 20
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
	setTimeout(set_grid_item_20,600000);
};

/**
 * @item Latest offer
 * @itemNo 22
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

/**
 * @item # Sale leads
 * @itemNo 23
 */
function set_grid_item_23()
{
	var columns="<sale_leads>" +
		"<id></id>" +
		"</sale_leads>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_23').innerHTML=results.length;
	},columns);
};

/**
 * @item # Verified customer addresses
 * @itemNo 24
 */
function set_grid_item_24()
{
	var columns="<customers>" +
		"<id></id>" +
		"<address_status exact='yes'>confirmed</address_status>" +
		"</customers>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_24').innerHTML=results.length;
	},columns);
};

/**
 * @item # Verified supplier addresses
 * @itemNo 25
 */
function set_grid_item_25()
{
	var columns="<suppliers>" +
		"<id></id>" +
		"<address_status exact='yes'>confirmed</address_status>" +
		"</suppliers>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_25').innerHTML=results.length;
	},columns);
};

/**
 * @item Today's total sale
 * @itemNo 26
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
	setTimeout(set_grid_item_26,600000);
};

/**
 * @item # Active projects
 * @itemNo 27
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

/**
 * @item # Completed projects
 * @itemNo 28
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

/**
 * @item # Customer reports
 * @itemNo 29
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


/**
 * @item # Active Tabs
 * @itemNo 30
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

/**
 * @item # Open service requests
 * @itemNo 31
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

/**
 * @item Service requests closed today
 * @itemNo 32
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

/**
 * @item Today's # logisitcs orders
 * @itemNo 36
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

/**
 * @item Today's # undelivered orders
 * @itemNo 37
 */
function set_grid_item_37()
{
	var columns="<logistics_orders>" +
		"<id></id>" +
		"<status exact='yes'>undelivered</status>"+
		"<import_date exact='yes'>"+get_raw_time(get_my_date())+"</import_date>"+
		"</logistics_orders>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_37').innerHTML=results.length;
	},columns);
};

/**
 * @item Today's # pending orders
 * @itemNo 38
 */
function set_grid_item_38()
{
	var columns="<logistics_orders>" +
		"<id></id>" +
		"<status exact='yes'>pending</status>"+
		"<import_date exact='yes'>"+get_raw_time(get_my_date())+"</import_date>"+
		"</logistics_orders>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_38').innerHTML=results.length;
	},columns);
};

/**
 * @item Today's # pending branch orders
 * @itemNo 39
 */
function set_grid_item_39()
{
	var new_columns=new Object();
		new_columns.count=0;
		new_columns.start_index=0;
		new_columns.data_store='logistics_orders';
		new_columns.indexes=[{index:'status',array:{'pending','undelivered','received','out for delivery'}},
							{index:'import_date',exact:get_raw_time(get_my_date())}];

	read_json_count(new_columns,function(item_count)
	{
		var grid_item=document.getElementById('grid_item_39');
		$(grid_item).html(item_count);
	});
};

/**
 * @item # active treatments
 * @itemNo 40
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

/**
 * @item unbilled sms credits
 * @itemNo 41
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

/**
 * @item # DRS (today)
 * @itemNo 42
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

/**
 * @item # RTO (today)
 * @itemNo 43
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

/**
 * @item # Quotations (last 30 days)
 * @itemNo 44
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

/**
 * @item # Different Spare Parts
 * @itemNo 45
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