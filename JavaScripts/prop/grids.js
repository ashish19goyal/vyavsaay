/**
 * @item Last Sale Bill Id
 * @itemNo 1
 */
function set_grid_item_1()
{
	var columns="<bills count='1'>" +
		"<id></id>" +
		"<last_updated sort='desc'></last_updated>" +
		"</bills>";
	
	get_single_column_data(function(results)
	{
		if(results.length>0)
		{
			var grid_item=document.getElementById('grid_item_1');
			grid_item.innerHTML=results[0];
		}
	},columns);
	
	setTimeout(set_grid_item_1,100000);
};

/**
 * @item # Sale bills today
 * @itemNo 2
 */
function set_grid_item_2()
{
	var columns="<bills>" +
		"<id></id>" +
		"<bill_date compare='more than'>"+(get_raw_time(get_my_date())-1000)+"</bill_date>" +
		"<bill_date compare='less than'>"+(get_raw_time(get_my_date())+1000)+"</bill_date>" +
		"</bills>";
	
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_2').innerHTML=results.length;
	},columns);

	setTimeout(set_grid_item_2,100000);
};

/**
 * @item # Last bill No
 * @itemNo 3
 */
function set_grid_item_3()
{
	var columns="<supplier_bills count='1'>" +
			"<id></id>" +
			"<bill_id></bill_id>" +
			"<last_updated sort='desc'></last_updated>" +
			"</supplier_bills>";

	fetch_requested_data('',columns,function(results)
	{
		if(results.length>0)
		{
			var grid_item=document.getElementById('grid_item_3');
			$(grid_item).off('click');
			$(grid_item).on('click',function(ev)
			{
				element_display(results[0].id,'form53');
			});
			grid_item.innerHTML=results[0].bill_id;
		}
	});

	setTimeout(set_grid_item_3,100000);
};

/**
 * @item # bills entered today
 * @itemNo 4
 */
function set_grid_item_4()
{
	var columns="<supplier_bills>" +
		"<id></id>" +
		"<entry_date compare='more than'>"+(get_raw_time(get_my_date())-1000)+"</entry_date>" +
		"<entry_date compare='less than'>"+(get_raw_time(get_my_date())+1000)+"</entry_date>" +
		"</supplier_bills>";
	
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_4').innerHTML=results.length;
	},columns);
	setTimeout(set_grid_item_4,100000);

};


/**
 * @item Today's Income
 * @itemNo 5
 */
function set_grid_item_5()
{
	var columns="<payments>" +
		"<total_amount></total_amount>" +
		"<date compare='more than'>"+(get_raw_time(get_my_date())-1000)+"</date>" +
		"<date compare='less than'>"+(get_raw_time(get_my_date())+1000)+"</date>" +
		"<status array='yes'>--pending--closed--</status>" +
		"<type>received</type>" +
		"</payments>";
	get_single_column_data(function(results)
	{
		var income=0;
		for (var i in results)
		{
			income+=parseFloat(results[i]);
		}
		document.getElementById('grid_item_5').innerHTML="Rs. "+income;
	},columns);
	setTimeout(set_grid_item_5,100000);

};

/**
 * @item Today's Expenses
 * @itemNo 6
 */
function set_grid_item_6()
{
	var columns="<payments>" +
		"<total_amount></total_amount>" +
		"<date compare='more than'>"+(get_raw_time(get_my_date())-1000)+"</date>" +
		"<date compare='less than'>"+(get_raw_time(get_my_date())+1000)+"</date>" +
		"<status array='yes'>--pending--closed--</status>" +
		"<type>paid</type>" +
		"</payments>";
	get_single_column_data(function(results)
	{
		var expenses=0;
		for (var i in results)
		{
			expenses+=parseFloat(results[i]);
		}
		document.getElementById('grid_item_6').innerHTML="Rs. "+expenses;
	},columns);
	setTimeout(set_grid_item_6,100000);

};

/**
 * @item # Products offered 
 * @itemNo 7
 */
function set_grid_item_7()
{
	var columns="<product_master>" +
		"<name></name>" +
		"</product_master>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_7').innerHTML=results.length;
	},columns);
	setTimeout(set_grid_item_7,100000);

};

/**
 * @item Today's Best selling product
 * @itemNo 8
 */
function set_grid_item_8()
{
	var columns="<bill_items>" +
			"<id></id>" +
			"<item_name></item_name>" +
			"<total></total>" +
			"<last_updated compare='more than'>"+(get_raw_time(get_my_date())-1000)+"</last_updated>" +
			"<last_updated compare='less than'>"+(get_raw_time(get_my_date())+86400000)+"</last_updated>" +
			"</bill_items>";
	fetch_requested_data('',columns,function(results)
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
			document.getElementById('grid_item_8').innerHTML=results[0].item_name;
		}
	});
	setTimeout(set_grid_item_8,100000);

};


/**
 * @item # Services offered 
 * @itemNo 9
 */
function set_grid_item_9()
{
	var columns="<services>" +
		"<name></name>" +
		"</services>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_9').innerHTML=results.length;
	},columns);
	setTimeout(set_grid_item_9,100000);

};


/**
 * @item Most expensive product
 * @itemNo 11
 */
function set_grid_item_11()
{
	var columns="<product_instances count='1'>" +
		"<id></id>" +
		"<product_name></product_name>" +
		"<sale_price sort='desc'></sale_price>" +
		"</product_instances>";
	fetch_requested_data('',columns,function(results)
	{
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
	setTimeout(set_grid_item_11,100000);

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
				results[k].margin=(parseFloat(results[k].sale_price)/parseFloat(results[k].cost_price));
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
	setTimeout(set_grid_item_12,100000);

};

/**
 * @item Today's unique customers 
 * @itemNo 13
 */
function set_grid_item_13()
{
	var columns="<bills>" +
		"<customer_name></customer_name>" +
		"<bill_date compare='more than'>"+(get_raw_time(get_my_date())-1000)+"</bill_date>" +
		"<bill_date compare='less than'>"+(get_raw_time(get_my_date())+1000)+"</bill_date>" +
		"</bills>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_13').innerHTML=results.length;
	},columns);
	setTimeout(set_grid_item_13,100000);

};

/**
 * @item Last customer
 * @itemNo 14
 */
function set_grid_item_14()
{
	var columns="<bills count='1'>" +
		"<customer_name></customer_name>" +
		"<last_updated sort='desc'></last_updated>" +
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
		"<last_updated sort='desc'></last_updated>" +
		"</supplier_bills>";
	get_single_column_data(function(results)
	{
		if(results.length>0)
		{
			document.getElementById('grid_item_15').innerHTML=results[0];
		}
	},columns);
	setTimeout(set_grid_item_15,100000);

};

/**
 * @item Payments due to suppliers
 * @itemNo 16
 */
function set_grid_item_16()
{
	var columns="<payments>" +
		"<total_amount></total_amount>" +
		"<due_date compare='less than'>"+get_my_time()+"</due_date>" +
		"<status array='yes'>pending</status>" +
		"<type>paid</type>" +
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
	setTimeout(set_grid_item_16,100000);

};

/**
 * @item # staff present
 * @itemNo 17
 */
function set_grid_item_17()
{
	var columns="<attendance>" +
		"<id></id>" +
		"<date compare='more than'>"+(get_raw_time(get_my_date())-1000)+"</date>" +
		"<date compare='less than'>"+(get_raw_time(get_my_date())+1000)+"</date>" +
		"<presence>present</presence>" +
		"</attendance>";
	
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_17').innerHTML=results.length;
	},columns);
	setTimeout(set_grid_item_17,100000);

};

/**
 * @item # pending tasks
 * @itemNo 18
 */
function set_grid_item_18()
{
	var columns="<task_instances>" +
		"<id></id>" +
		"<status>pending</status>" +
		"</task_instances>";
	
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_18').innerHTML=results.length;
	},columns);
	setTimeout(set_grid_item_18,100000);

};

/**
 * @item # storage areas
 * @itemNo 19
 */
function set_grid_item_19()
{
	var columns="<store_areas>" +
		"<id></id>" +
		"<area_type>storage</area_type>" +
		"</store_areas>";
	
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_19').innerHTML=results.length;
	},columns);
	setTimeout(set_grid_item_19,100000);

};

/**
 * @item # pending orders
 * @itemNo 20
 */
function set_grid_item_20()
{
	var columns="<sale_orders>" +
		"<id></id>" +
		"<status>pending</status>" +
		"</sale_orders>";
	
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_20').innerHTML=results.length;
	},columns);
	setTimeout(set_grid_item_20,100000);

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
		"<last_updated sort='desc'></last_updated>" +
		"</offers>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_22').innerHTML=results[0];
	},columns);
	setTimeout(set_grid_item_22,100000);
};

/**
 * @item # active offers
 * @itemNo 23
 */
function set_grid_item_23()
{
	var columns="<offers>" +
		"<id></id>" +
		"<status array='yes'>--active--extended--</status>" +
		"</offers>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_23').innerHTML=results.length;
	},columns);
	setTimeout(set_grid_item_23,100000);

};

/**
 * @item # Verified customer addresses
 * @itemNo 24
 */
function set_grid_item_24()
{
	var columns="<customers>" +
		"<id></id>" +
		"<address_status>confirmed</address_status>" +
		"</customers>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_24').innerHTML=results.length;
	},columns);
	setTimeout(set_grid_item_24,100000);

};

/**
 * @item # Verified supplier addresses
 * @itemNo 25
 */
function set_grid_item_25()
{
	var columns="<suppliers>" +
		"<id></id>" +
		"<address_status>confirmed</address_status>" +
		"</suppliers>";
	get_single_column_data(function(results)
	{
		document.getElementById('grid_item_25').innerHTML=results.length;
	},columns);
	setTimeout(set_grid_item_25,100000);

};

/**
 * @item Today's total sale
 * @itemNo 26
 */
function set_grid_item_26()
{
	var columns="<bills>" +
		"<total></total>" +
		"<bill_date compare='more than'>"+(get_raw_time(get_my_date())-1000)+"</bill_date>" +
		"<bill_date compare='less than'>"+(get_raw_time(get_my_date())+1000)+"</bill_date>" +
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
	setTimeout(set_grid_item_26,100000);

};
