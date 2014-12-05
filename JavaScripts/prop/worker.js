/**
 * This function displays updated activities in the side lane
 */
function activities_lane_ini()
{
	var columns="<activities count='10'>" +
		"<title></title>" +
		"<link_to></link_to>" +
		"<data_id></data_id>" +
		"<notes></notes>" +
		"<updated_by></updated_by>" +
		"<user_display>yes</user_display>" +
		"<last_updated sort='desc'></last_updated>" +
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
			$('#count_notif').hide();
		}
		else
		{	
			$('#count_notif').html(num_res);
			$('#count_notif').show(); 
		}
	},notif_data);
	
	clearInterval(count_notif_timer);
	count_notif_timer=setTimeout(count_notif,100000);
}

/**
 * This function counts the unseen notifications and shows a desktop notification
 */
function show_notif()
{
	//var notifs=fetch_notifications();	
	var notif_data="<notifications>" +
			"<id></id>" +
			"<status>pending</status>" +
			"</notifications>";

	get_single_column_data(function(notifs)
	{
		var num_res=notifs.length;
				
		if('Notification' in window && num_res>0)
		{		
			if(Notification.permission==='granted')
			{
				//console.log('permission is granted by default');
				var notification=new Notification('Vyavsaay',
				{
					body: "You have "+num_res+" unseen notifications",
					icon: "./images/favicon.png"
				});
			}
			else
			{
				Notification.requestPermission(function(permission)
				{
					if(permission==='granted')
					{
						console.log('permission granted');
						var notification=new Notification('Vyavsaay',
						{
							body: "You have "+num_res+" unseen notifications",
							icon: "./images/favicon.png"
						});							 
					}
		        });
			}
		}
	},notif_data);
	
	clearInterval(show_notif_timer);
	show_notif_timer=setTimeout(count_notif,900000);
}

/**
 * This function checks for favourable scenarios to generate notifications in the background
 */
function notifications_add()
{
	////////overdue payments/////////////
	var payments_data="<payments>" +
			"<id></id>" +
			"<acc_name></acc_name>" +
			"<type></type>" +
			"<total_amount></total_amount>" +
			"<paid_amount></paid_amount>" +
			"<status exact='yes'>pending</status>" +
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
				local_create_simple_no_warning(not_pay_xml);
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
			"<status exact='yes'>pending</status>" +
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

	/////overdue sale leads//////////
	var lead_due_time=parseFloat(get_my_time())+86400000;
	var lead_past_time=parseFloat(get_my_time())-86400000;
	
	var leads_data="<sale_leads>" +
			"<id></id>" +
			"<customer></customer>" +
			"<due_date compare='less than'>"+lead_due_time+"</due_date>" +
			"<due_date compare='more than'>"+lead_past_time+"</due_date>" +
			"<detail></detail>" +
			"<identified_by></identified_by>" +
			"</sale_leads>";
	
	fetch_requested_data('',leads_data,function(leads)
	{
		leads.forEach(function(lead)
		{
			var id=get_new_key()+""+(Math.random()*1000);
			var notes="A sale opportunity with customer "+lead.customer+" is coming up."+
					"The details are as follows.\n"+lead.detail;
			var task_xml="<notifications>" +
					"<id>"+id+"</id>" +
					"<t_generated>"+get_my_time()+"</t_generated>" +
					"<data_id unique='yes'>"+lead.id+"</data_id>" +
					"<title>Sale Opportunity</title>" +
					"<notes>"+notes+"</notes>" +
					"<link_to>form81</link_to>" +
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
			
		});
	});
	
	///////////overdue sale leads end//////////

	
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
	
	///////////sale orders end//////////
	
	/////out of stock manufactured products//////////
	var manu_data="<manufacturing_schedule>" +
			"<id></id>" +
			"<product></product>" +
			"<status>out of stock</status>" +
			"</manufacturing_schedule>";
	
	fetch_requested_data('',manu_data,function(manus)
	{
		var count_manu=manus.length;
		if(count_manu>0)
		{
			var id=get_new_key()+""+(Math.random()*1000);
			var notes=count_manu+" manufactured products are out of stock. Please schedule their manufacturing.";
			var task_xml="<notifications>" +
					"<id>"+id+"</id>" +
					"<t_generated>"+get_my_time()+"</t_generated>" +
					"<data_id unique='yes'>"+get_my_time()+"</data_id>" +
					"<title>Schedule Manufacturing</title>" +
					"<notes>"+notes+"</notes>" +
					"<link_to>form88</link_to>" +
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
	
	///////////manufactured product end//////////


	/////manufacturing due//////////
	var schedule_data="<manufacturing_schedule>" +
			"<id></id>" +
			"<product></product>" +
			"<schedule compare='less than'>"+get_my_time()+"</schedule>" +
			"<status>scheduled</status>" +
			"<last_updated></last_updated>" +
			"</manufacturing_schedule>";
	
	fetch_requested_data('',schedule_data,function(schedules)
	{
		schedules.forEach(function(schedule)
		{
			var id=get_new_key()+""+(Math.random()*1000);
			var notes="Manufacturing for product "+schedule.product+" is due. Please start the process.";
			var schedule_xml="<notifications>" +
					"<id>"+id+"</id>" +
					"<t_generated>"+get_my_time()+"</t_generated>" +
					"<data_id unique='yes'>"+schedule.last_updated+"</data_id>" +
					"<title>Schedule Manufacturing</title>" +
					"<notes>"+notes+"</notes>" +
					"<link_to>form88</link_to>" +
					"<status>pending</status>" +
					"</notifications>";
			if(is_online())
			{
				server_create_simple_no_warning(schedule_xml);
			}
			else
			{
				local_create_simple_no_warning(schedule_xml);
			}
		});
	});
	
	///////////manufacturing end//////////
	
	/////appointments//////////
	var app_time=parseFloat(get_my_time())+3600000;
	
	var apps_data="<appointments>" +
			"<id></id>" +
			"<customer></customer>" +
			"<schedule compare='less than'>"+app_time+"</schedule>" +
			"<status exact='yes'>pending</status>" +
			"<assignee></assignee>" +
			"</appointments>";
	
	fetch_requested_data('',apps_data,function(apps)
	{
		apps.forEach(function(app)
		{
			var id=get_new_key()+""+(Math.random()*1000);
			var notes="Appointment with "+app.customer+" assigned to "+app.assignee+" @"+get_my_datetime(app.schedule);
			var app_xml="<notifications>" +
					"<id>"+id+"</id>" +
					"<t_generated>"+get_my_time()+"</t_generated>" +
					"<data_id unique='yes'>"+app.id+"</data_id>" +
					"<title>Appointment</title>" +
					"<notes>"+notes+"</notes>" +
					"<link_to>form89</link_to>" +
					"<status>pending</status>" +
					"</notifications>";
			if(is_online())
			{
				server_create_simple_no_warning(app_xml);
			}
			else
			{
				local_create_simple_no_warning(app_xml);
			}
		});
	});
	
	///////////due appointments//////////

	setTimeout(notifications_add,900000);
}

/**
 * This function checks for favourable scenarios to generate sale leads in the background
 */
function sale_leads_add()
{
	////////recurrent sales////////////
	
	var lead_past_time=parseFloat(get_my_time())-86400000;
	
	var attributes_data="<attributes>" +
			"<item_name></item_name>" +
			"<attribute>recurrent sale</attribute>" +
			"<value></value>" +
			"</attributes>";
	
	fetch_requested_data('',attributes_data,function(attributes)
	{
		var items_string="--";
		for(var i in attributes)
		{
			items_string+=attributes[i].item_name+"--";
		}
		
		var bill_items_data="<bill_items>" +
				"<id></id>" +
				"<bill_id></bill_id>" +
				"<item_name array='yes'>"+items_string+"</item_name>" +
				"<type>bought</type>" +
				"<last_updated compare='more than'>"+lead_past_time+"</last_updated>" +
				"</bill_items>";

		fetch_requested_data('',bill_items_data,function(bill_items)
		{
			var bills_string="--";
			for (var j in bill_items)
			{
				bills_string+=bill_items[j].bill_id+"--";
			}
			
			var bills_data="<bills>" +
					"<id array='yes'>"+bills_string+"</id>" +
					"<customer_name></customer_name>" +
					"<bill_date></bill_date>" +
					"</bills>";
			fetch_requested_data('',bills_data,function(bills)
			{
				bills.forEach(function(bill)
				{
					var start_date=bill.bill_date;
					for(var k in bill_items)
					{
						if(bill.id===bill_items[k].bill_id)
						{
							for(var l in attributes)
							{
								if(bill_items[k].item_name==attributes[l].item_name)
								{
									var id=get_new_key()+""+(Math.random()*1000);
									var detail="Bought "+attributes[l].item_name+" that is expected to be bought again in " +
											attributes[l].value+" days.\n";
									var due_date=parseFloat(start_date)+(86400000*parseFloat(attributes[l].value));
									
									var sale_lead_xml="<sale_leads>" +
											"<id>"+id+"</id>" +
											"<customer>"+bill.customer_name+"</customer>" +
											"<source_id unique='yes'>"+bill_items[k].id+"</source_id>" +
											"<detail>"+detail+"</detail>" +
											"<due_date>"+due_date+"</due_date>" +
											"<identified_by>auto</identified_by>" +
											"</sale_leads>";
									if(is_online())
									{
										server_create_simple_no_warning(sale_lead_xml);
									}
									else
									{
										local_create_simple_no_warning(sale_lead_xml);
									}
								}
							}
						}
					}
					
				});
			});
		});
	});
	//////////recurrent sales end//////

	
////////seasonal sales////////////
		
	var seasonal_attributes_data="<attributes>" +
			"<item_name></item_name>" +
			"<attribute>season</attribute>" +
			"<value></value>" +
			"</attributes>";
	
	fetch_requested_data('',seasonal_attributes_data,function(seasonal_attributes)
	{
		var items_string="--";
		for(var i in seasonal_attributes)
		{
			items_string+=seasonal_attributes[i].item_name+"--";
		}
		
		var bill_items_data="<bill_items>" +
				"<id></id>" +
				"<bill_id></bill_id>" +
				"<item_name array='yes'>"+items_string+"</item_name>" +
				"<type>bought</type>" +
				"<last_updated compare='more than'>"+lead_past_time+"</last_updated>" +
				"</bill_items>";

		fetch_requested_data('',bill_items_data,function(bill_items)
		{
			var bills_string="--";
			for (var j in bill_items)
			{
				bills_string+=bill_items[j].bill_id+"--";
			}
			
			var bills_data="<bills>" +
					"<id array='yes'>"+bills_string+"</id>" +
					"<customer_name></customer_name>" +
					"<bill_date></bill_date>" +
					"</bills>";
			fetch_requested_data('',bills_data,function(bills)
			{
				bills.forEach(function(bill)
				{
					for(var k in bill_items)
					{
						if(bill.id==bill_items[k].bill_id)
						{
							for(var l in seasonal_attributes)
							{
								if(bill_items[k].item_name==seasonal_attributes[l].item_name)
								{
									if(seasonal_attributes[l].attribute=='season start date')
									{
										var season_start_date=attributes[l].value;
										var id=get_new_key()+""+(Math.random()*1000);
										
										var detail="Bought "+seasonal_attributes[l].item_name+" that is expected to be bought again in season starting from" +
												season_start_date+"\n";
										
										season_start_date=get_time_from_formatted_date(season_start_date);
										var due_date=season_start_date;
										var current_time=get_my_time();
										if(current_time>season_start_date)
										{
											due_date=parseFlaot(season_start_date)+(365*86400000);
										}
										
										var sale_lead_xml="<sale_leads>" +
												"<id>"+id+"</id>" +
												"<customer>"+bill.customer_name+"</customer>" +
												"<source_id unique='yes'>"+bill_items[k].id+"</source_id>" +
												"<detail>"+detail+"</detail>" +
												"<due_date>"+due_date+"</due_date>" +
												"<identified_by>auto</identified_by>" +
												"</sale_leads>";
										if(is_online())
										{
											server_create_simple_no_warning(sale_lead_xml);
										}
										else
										{
											local_create_simple_no_warning(sale_lead_xml);
										}
									}
								}
							}
						}
					}
					
				});
			});
		});
	});
	//////////seasonal sales end//////

	
	setTimeout(sale_leads_add,1800000);
}


/**
 * This function checks for out of stock manufactured products
 */
function manufactured_products_outofstock()
{
	var schedule_data="<manufacturing_schedule>" +
			"<product></product>" +
			"<status>in stock</status>" +
			"<schedule compare='less than'>"+get_my_time()+"</schedule>" +
			"</manufacturing_schedule>";
	
	fetch_requested_data('',schedule_data,function(schedules)
	{
		schedules.forEach(function(schedule)
		{
			var inventory=get_inventory(schedule.product,'',function(quantity)
			{
				if(quantity<=0)
				{
					var schedule_data="<manufacturing_schedule>" +
							"<id>"+schedule.id+"</id>" +
							"<product>"+schedule.product+"</product>" +
							"<status>out of stock</status>" +
							"<schedule></schedule>" +
							"<last_updated>"+get_my_time()+"</last_updated>" +
							"</manufacturing_schedule>";
					if(is_online())
					{
						server_update_simple(schedule_data);
					}
					else
					{
						local_update_simple(schedule_data);
					}
				}
			});
		});
	});
	
	setTimeout(manufactured_products_outofstock,1800000);
}
