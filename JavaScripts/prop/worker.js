function activities_lane_ini()
{
	var columns="<activities>" +
		"<title></title>" +
		"<link_to></link_to>" +
		"<data_id></data_id>" +
		"<notes></notes>" +
		"<updated_by></updated_by>" +
		"<user_display>yes</user_display>" +
		"<last_updated compare='more than'>"+get_raw_time_24h()+"</last_updated>" +
		"</activities>";
	
	fetch_requested_data('',columns,function(activities)
	{
		var result_html="";
		for(var i in activities)
		{
			result_html+="<div class='activity_detail'>" +
						activities[i].title +
						"</br><a onclick=\"" +
						"element_display('"+activities[i].data_id +
						"','"+activities[i].link_to+
						"');\">"+activities[i].notes+"</a>" +
						"<div class='activity_log'>By:" +
						activities[i].updated_by +
						" @ " +
						get_formatted_time(activities[i].last_updated) +
						"</div>" +
						"</div>";
		}
		$("#activity_lane").html(result_html);
		//postMessage(result_html);
	});
	setTimeout(activities_lane_ini,100000);	
}

/**
 * This function keeps counting the opportunities and shows the number on the icon
 */
function count_oppor()
{
	var oppor_data="<opportunities>" +
			"<id></id>" +
			"<status>pending</status>" +
			"</opportunities>";

	get_single_column_data(function(oppors)
	{
		var num_res=oppors.length;
	
		if(num_res===0)
		{	
			$('#count_oppor').html("");
		}
		else
		{	
			$('#count_oppor').html(num_res);
			$('#count_oppor').css('backgroundColor','#dddd00'); 
		}
	},oppor_data);
	setTimeout(count_oppor,100000);
}

/**
 * This function keeps counting the generated notifications and shows the number on icon
 */
function count_notif()
{
	//var notifs=fetch_notifications();	
	var notif_data="<notifications>" +
			"<id></id>" +
			"<status>pending</status>" +
			"</notifications>";

	get_single_column_data(function(notifs)
	{
		var num_res=notifs.length;
		
		if(num_res===0)
		{	
			$('#count_notif').html(""); 
		}
		else
		{	
			$('#count_notif').html(num_res);
			$('#count_notif').css('backgroundColor','#dddd00'); 
		}
	},notif_data);
	setTimeout(count_notif,100000);
}

/**
 * This function checks for favourable scenarios to generate notifications in the background
 */
function notifications_add()
{
	////////overdue payments
	var payments_data="<payments>" +
			"<id></id>" +
			"<acc_name></acc_name>" +
			"<type></type>" +
			"<total_amount></total_amount>" +
			"<paid_amount></paid_amount>" +
			"<status>pending</status>" +
			"<due_date compare='less than'>"+get_my_time()+"</due_date>" +
			"</payments>";
	fetch_requested_data('',payments_data,function(payments)
	{
		payments.forEach(function(payment)
		{
			var id=get_new_key()+""+(Math.random()*1000);
			var notes="Payment of Rs. "+payment.total_amount+" from "+
					payment.acc_name+" is overdue. So far only Rs. "+payment.paid_amount+" has been received";
			if(payment.type=='paid')
			{
				notes="Payment of Rs. "+payment.total_amount+" to "+
				payment.acc_name+" is overdue. So far only Rs. "+payment.paid_amount+" has been paid";
			}
			var not_pay_xml="<notifications>" +
					"<id>"+id+"</id>" +
					"<t_generated>"+get_my_time()+"</t_generated>" +
					"<data_id unique='yes'>"+payment.id+"</data_id>" +
					"<title>Payment overdue</title>" +
					"<notes>"+notes+"</notes>" +
					"<link_to>form11</link_to>" +
					"<status>pending</status>" +
					"</notifications>";
			if(is_online())
			{
				server_create_simple_no_warning(not_pay_xml);
			}
			else
			{
				server_create_simple_no_warning(not_pay_xml);
			}
		});
	});
	//////////overdue payments end//////
	
	/////overdue tasks//////////
	var task_due_time=parseFloat(get_my_time())+86400000;
	
	var tasks_data="<task_instances>" +
			"<id></id>" +
			"<name></name>" +
			"<t_due compare='less than'>"+task_due_time+"</t_due>" +
			"<status>pending</status>" +
			"<assignee></assignee>" +
			"<task_hours></task_hours>" +
			"</task_instances>";
	
	fetch_requested_data('',tasks_data,function(tasks)
	{
		tasks.forEach(function(task)
		{
			var due_time=parseFloat(get_my_time())+(3600000*task.task_hours);
			if(task.t_due<due_time)
			{
				var id=get_new_key()+""+(Math.random()*1000);
				var notes="Task "+task.name+" assigned to "+
						task.assignee+" is pending. It is due by "+get_my_datetime(task.t_due);
				var task_xml="<notifications>" +
						"<id>"+id+"</id>" +
						"<t_generated>"+get_my_time()+"</t_generated>" +
						"<data_id unique='yes'>"+task.id+"</data_id>" +
						"<title>Pending Task</title>" +
						"<notes>"+notes+"</notes>" +
						"<link_to>form14</link_to>" +
						"<status>pending</status>" +
						"</notifications>";
				if(is_online())
				{
					server_create_simple_no_warning(task_xml);
				}
				else
				{
					local_create_simple_no_warning(task_xml);
				}
			}
		});
	});
	
	///////////overdue tasks end//////////

	/////sale orders //////////
	
	var sale_order_data="<sale_orders>" +
			"<id></id>" +
			"<type>product</type>" +
			"<status>pending</status>" +
			"</sale_orders>";
	
	fetch_requested_data('',sale_order_data,function(sale_orders)
	{
		var sale_orders_string="--";
		for(var i in sale_orders)
		{
			sale_orders_string+=sale_orders[i].id+"--";
		}
		var sale_order_items_data="<sale_order_items>" +
				"<order_id array='yes'>"+sale_orders_string+"</order_id>" +
				"<item_name></item_name>" +
				"<quantity></quantity>" +
				"</sale_order_items>";
		fetch_requested_data('',sale_order_items_data,function(sale_order_items)
		{	
			var items_string="--";
			for(var j in sale_order_items)
			{
				items_string+=sale_order_items[j].item_name+"--";
			}
			
			var product_data="<product_instances>" +
					"<id></id>" +
					"<product_name array='yes'>"+items_string+"</product_name>" +
					"<quantity></quantity>" +
					"</product_instances>";
			
			fetch_requested_data('',product_data,function(products)
			{
				var sum_products=transform_to_sum(products,'quantity','product_name');
				var sum_sale_items=transform_to_sum(sale_order_items,'quantity','item_name');
				sum_sale_items.forEach(function(sale_item)
				{
					for (var k in sum_products)
					{
						if(sale_item.label==sum_products[k].label)
						{
							if(parseFloat(sale_item.value)>parseFloat(sum_products[k].value))
							{
								var id=get_new_key()+""+(Math.random()*1000);
								var notes="Product "+sale_item.label+" has insufficient inventory to meet all sale orders.";
										
								var product_xml="<notifications>" +
										"<id>"+id+"</id>" +
										"<t_generated>"+get_my_time()+"</t_generated>" +
										"<data_id unique='yes'></data_id>" +
										"<title>Short inventory</title>" +
										"<notes>"+notes+"</notes>" +
										"<link_to>form1</link_to>" +
										"<status>pending</status>" +
										"</notifications>";
								if(is_online())
								{
									server_create_simple_no_warning(product_xml);
								}
								else
								{
									local_create_simple_no_warning(product_xml);
								}
							}
							break;
						}
					}
				});

			});
		});
	});
	
	///////////overdue tasks end//////////
	
	setTimeout(notifications_add,300000);
}
