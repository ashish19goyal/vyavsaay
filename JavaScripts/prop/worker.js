/**
* This function updates the status of orders to picked and packed etc
*/
function worker_update_orders_status()
{
	if(is_update_access('form108'))
	{
		show_loader();
		
		///////////handling orders where status is picking///////		
		var orders_xml="<sale_orders>"+
						"<id></id>"+
						"<bill_id></bill_id>"+
						"<status exact='yes'>billed</status>"+
						"</sale_orders>";
		fetch_requested_data('',orders_xml,function (orders) 
		{
			var bill_id_string="--";
			for(var i in orders)
			{
				bill_id_string+=orders[i].bill_id+"--";
			}
			var picked_pending_xml="<bill_items>"+
								"<bill_id array='yes'>"+bill_id_string+"</bill_id>"+
								"<picked_status exact='yes'>pending</picked_status>"+
								"</bill_items>";
			get_single_column_data(function (pick_items) 
			{
				var packed_pending_xml="<bill_items>"+
								"<bill_id array='yes'>"+bill_id_string+"</bill_id>"+
								"<packing_status exact='yes'>pending</packing_status>"+
								"</bill_items>";
				get_single_column_data(function (pack_items) 
				{
					var data_xml="<sale_orders>";
					var counter=1;
					var last_updated=get_my_time();
				
					orders.forEach(function(row)
					{
						var picked=pick_items.indexOf(row.bill_id);
						var packed=pack_items.indexOf(row.bill_id);
						
						if(picked==-1 && packed==-1)
						{
							row.status='packed';
						}
						else if(picked==-1)
						{
							row.status='picked';
						}

						if(row.status!='billed')
						{
							if((counter%500)===0)
							{
								data_xml+="</sale_orders><separator></separator><sale_orders>";
							}

							counter+=1;						
							data_xml+="<row>" +
								"<id>"+row.id+"</id>" +
								"<status>"+row.status+"</status>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</row>";
						}
					});
					data_xml+="</sale_orders>";
					
					//console.log(data_xml);
					if(is_online())
					{
						server_update_batch(data_xml);
					}
					else
					{
						local_update_batch(data_xml);
					}
					hide_loader();
				},packed_pending_xml);				
			},picked_pending_xml);	
		});
		//////////////////////////////////////////////////////
		
	}
	else 
	{
		$("#modal2").dialog("open");
	}
}

/**
 * This function displays updated activities in the side lane
 */
function activities_lane_ini()
{
	if(is_read_access('activities'))
	{
		var columns="<activities count='10'>" +
			"<title></title>" +
			"<link_to></link_to>" +
			"<data_id></data_id>" +
			"<notes></notes>" +
			"<updated_by></updated_by>" +
			"<user_display exact='yes'>yes</user_display>" +
			"<last_updated></last_updated>" +
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
		});
		setTimeout(activities_lane_ini,100000);
	}
}

/**
 * This function keeps counting the generated notifications and shows the number on icon
 */
function count_notif()
{
	//var notifs=fetch_notifications();	
	var notif_data="<notifications>" +
			"<id></id>" +
			"<status exact='yes'>pending</status>" +
			"<target_user></target_user>"+			
			"</notifications>";

	if_data_read_access('notifications',function(accessible_data)
	{
		fetch_requested_data('',notif_data,function(notifs)
		{
			for(var i=0;i<notifs.length;i++)			
			{
				var read=false;
				for(var x in accessible_data)
				{
					if(accessible_data[x].record_id==notifs[i].id || accessible_data[x].record_id=='all')
					{
						if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || notifs[i][accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
						{
							if(accessible_data[x].access_type=='all' || accessible_data[x].access_type=='read')
							{
								read=true;
								break;
							}							
						}
					}
				}
				
				var found=notifs[i].target_user.indexOf(get_account_name());
				if(!(read || found>=0))
				{
					notifs.splice(i,1);
					i--;
				}
			}

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
		});
	});	
	clearInterval(count_notif_timer);
	count_notif_timer=setTimeout(count_notif,get_worker_repeat());
}

/**
 * This function keeps counting the pending data records for sync and shows the number on icon
 */
function count_sync()
{
	//var notifs=fetch_notifications();	
	var sync_data="<activities>" +
			"<id></id>" +
			"<status exact='yes'>unsynced</status>" +
			"</activities>";

		fetch_requested_data('',sync_data,function(syncs)
		{
			var num_res=syncs.length;
			
			if(num_res===0)
			{	
				$('#count_sync').html("");
				$('#count_sync').hide();
			}
			else
			{	
				$('#count_sync').html(num_res);
				$('#count_sync').show(); 
			}
		});
	clearInterval(count_sync_timer);
	count_sync_timer=setTimeout(count_sync,get_worker_repeat());
}

/**
 * This function counts the unseen notifications and shows a desktop notification
 */
function show_notif()
{
	//var notifs=fetch_notifications();	
	var notif_data="<notifications>" +
			"<id></id>" +
			"<status exact='yes'>pending</status>" +
			"<target_user></target_user>"+			
			"</notifications>";

	if_data_read_access('notifications',function(accessible_data)
	{
		fetch_requested_data('',notif_data,function(notifs)
		{
			for(var i=0;i<notifs.length;i++)			
			{
				var read=false;
				for(var x in accessible_data)
				{
					if(accessible_data[x].record_id==notifs[i].id || accessible_data[x].record_id=='all')
					{
						if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || notifs[i][accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
						{
							if(accessible_data[x].access_type=='all' || accessible_data[x].access_type=='read')
							{
								read=true;
								break;
							}							
						}
					}
				}
				
				var found=notifs[i].target_user.indexOf(get_account_name());
				if(!(read || found>=0))
				{
					notifs.splice(i,1);
					i--;
				}
			}

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
		});
	});	
	clearInterval(show_notif_timer);
	show_notif_timer=setTimeout(count_notif,get_worker_repeat());
}

/**
 * Overdue payments
 */
function notifications1_add()
{
	var last_updated=get_my_time();
	////////overdue payments/////////////
	var payments_data="<payments>" +
			"<id></id>" +
			"<acc_name></acc_name>" +
			"<type></type>" +
			"<total_amount></total_amount>" +
			"<paid_amount></paid_amount>" +
			"<due_date upperbound='yes'>"+get_my_time()+"</due_date>" +
			"<status exact='yes'>pending</status>" +
			"</payments>";
	fetch_requested_data('',payments_data,function(payments)
	{
		var not_pay_xml="<notifications>";
		var counter=1;
		var id=parseFloat(get_new_key());
		payments.forEach(function(payment)
		{
			if((counter%500)===0)
			{
				not_pay_xml+="</notifications><separator></separator><notifications>";
			}
			counter+=1;
			var notes="Payment of Rs. "+payment.total_amount+" from "+
					payment.acc_name+" is overdue. So far only Rs. "+payment.paid_amount+" has been received";
			if(payment.type=='paid')
			{
				notes="Payment of Rs. "+payment.total_amount+" to "+
				payment.acc_name+" is overdue. So far only Rs. "+payment.paid_amount+" has been paid";
			}
			not_pay_xml+="<row>" +
					"<id>"+(id+counter)+"</id>" +
					"<t_generated>"+get_my_time()+"</t_generated>" +
					"<data_id unique='yes'>"+payment.id+"</data_id>" +
					"<title>Payment overdue</title>" +
					"<notes>"+notes+"</notes>" +
					"<link_to>form11</link_to>" +
					"<status>pending</status>" +
					"<target_user>"+payment.acc_name+"</target_user>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</row>";
		});
		not_pay_xml+="</notifications>";
		
		if(is_online())
		{
			server_create_batch_noloader(not_pay_xml);
		}
		else
		{
			local_create_batch_noloader(not_pay_xml);
		}
	});
	//////////overdue payments end//////
	
	setTimeout(notifications1_add,get_worker_repeat());
}

/**
 * Overdue tasks
 */
function notifications2_add()
{
	var last_updated=get_my_time();
	
	/////overdue tasks//////////
	var task_due_time=parseFloat(get_my_time())+86400000;
	
	var tasks_data="<task_instances>" +
			"<id></id>" +
			"<name></name>" +
			"<t_due upperbound='yes'>"+task_due_time+"</t_due>" +
			"<status exact='yes'>pending</status>" +
			"<assignee></assignee>" +
			"<task_hours></task_hours>" +
			"</task_instances>";
	
	fetch_requested_data('',tasks_data,function(tasks)
	{
		var task_xml="<notifications>";
		var counter=1;
		var id=parseFloat(get_new_key());
		
		tasks.forEach(function(task)
		{
			if((counter%500)===0)
			{
				task_xml+="</notifications><separator></separator><notifications>";
			}
			counter+=1;
		
			var due_time=parseFloat(get_my_time())+(3600000*task.task_hours);
			if(task.t_due<due_time)
			{
				var notes="Task "+task.name+" assigned to "+
						task.assignee+" is pending. It is due by "+get_my_datetime(task.t_due);
				task_xml+="<row>" +
						"<id>"+(id+counter)+"</id>" +
						"<t_generated>"+get_my_time()+"</t_generated>" +
						"<data_id unique='yes'>"+task.id+"</data_id>" +
						"<title>Pending Task</title>" +
						"<notes>"+notes+"</notes>" +
						"<link_to>form14</link_to>" +
						"<target_user>"+task.assignee+"</target_user>"+
						"<status>pending</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</row>";
			}
		});
		
		task_xml+="</notifications>";
		
		if(is_online())
		{
			server_create_batch_noloader(task_xml);
		}
		else
		{
			local_create_batch_noloader(task_xml);
		}
	});
	
	///////////overdue tasks end//////////

	setTimeout(notifications2_add,get_worker_repeat());
}


/**
 * Overdue sale leads
 */
function notifications3_add()
{
	var last_updated=get_my_time();
	
	/////overdue sale leads//////////
	var lead_due_time=parseFloat(get_my_time())+86400000;
	var lead_past_time=parseFloat(get_my_time())-86400000;
	
	var leads_data="<sale_leads>" +
			"<id></id>" +
			"<customer></customer>" +
			"<due_date upperbound='yes'>"+lead_due_time+"</due_date>" +
			"<due_date lowerbound='yes'>"+lead_past_time+"</due_date>" +
			"<detail></detail>" +
			"<identified_by></identified_by>" +
			"</sale_leads>";
	
	fetch_requested_data('',leads_data,function(leads)
	{
		var leads_xml="<notifications>";
		var counter=1;
		var id=parseFloat(get_new_key());
		
		leads.forEach(function(lead)
		{
			if((counter%500)===0)
			{
				leads_xml+="</notifications><separator></separator><notifications>";
			}
			counter+=1;
		
			var notes="A sale opportunity with customer "+lead.customer+" is coming up."+
					"The details are as follows.\n"+lead.detail;
			leads_xml+="<row>" +
					"<id>"+(id+counter)+"</id>" +
					"<t_generated>"+get_my_time()+"</t_generated>" +
					"<data_id unique='yes'>"+lead.id+"</data_id>" +
					"<title>Sale Opportunity</title>" +
					"<notes>"+notes+"</notes>" +
					"<link_to>form81</link_to>" +
					"<target_user>"+lead.customer+"--"+lead.identified_by+"</target_user>"+
					"<status>pending</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</row>";
		});
		leads_xml+="</notifications>";
		if(is_online())
		{
			server_create_batch_noloader(leads_xml);
		}
		else
		{
			local_create_batch_noloader(leads_xml);
		}
	});
	
	///////////overdue sale leads end//////////
	setTimeout(notifications3_add,get_worker_repeat());
}


/**
 * Insufficient stock for sale orders
 */
function notifications4_add()
{
	var last_updated=get_my_time();
	
	/////sale orders //////////
	
	var sale_order_data="<sale_orders>" +
			"<id></id>" +
			"<type exact='yes'>product</type>" +
			"<status exact='yes'>pending</status>" +
			"</sale_orders>";
	
	fetch_requested_data('',sale_order_data,function(sale_orders)
	{
		sale_orders.forEach(function(sale_order)
		{
			var sale_order_items_data="<sale_order_items>" +
					"<order_id exact='yes'>"+sale_order.id+"</order_id>" +
					"<item_name></item_name>" +
					"<quantity></quantity>" +
					"</sale_order_items>";
			fetch_requested_data('',sale_order_items_data,function(sale_order_items)
			{	
				for(var j=0;j<sale_order_items.length;j++)
				{
					for(var k=j+1;k<sale_order_items.length;k++)
					{
						if(sale_order_items[j].item_name==sale_order_items[k].item_name)
						{
							sale_order_items[j].quantity=parseFloat(sale_order_items[j].quantity)+parseFloat(sale_order_items[k].quantity);
							sale_order_items.splice(k,1);
							k-=1;
						}
					}
				}
				
				sale_order_items.forEach(function(sale_order_item)
				{
					get_inventory(sale_order_item.item_name,'',function(item_quantity)
					{
						if(parseFloat(item_quantity)<parseFloat(sale_order_item.quantity))
						{
							var id=get_new_key();
						
							var notes="Product "+sale_order_item.item_name+" has insufficient inventory to meet all sale orders.";
									
							var product_xml="<notifications>" +
									"<id>"+id+"</id>" +
									"<t_generated>"+last_updated+"</t_generated>" +
									"<data_id unique='yes'></data_id>" +
									"<title>Short inventory</title>" +
									"<notes>"+notes+"</notes>" +
									"<link_to>form1</link_to>" +
									"<status>pending</status>" +
									"<last_updated>"+last_updated+"</last_updated>" +
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
					});
				});
			});
		});
	});
	
	///////////sale orders end//////////
	
	setTimeout(notifications4_add,get_worker_repeat());
}



/**
 * Out of stock manufactured products, schedule manufacturing
 */
function notifications5_add()
{
	var last_updated=get_my_time();
		
	/////out of stock manufactured products//////////
	var manu_data="<manufacturing_schedule>" +
			"<id></id>" +
			"<product></product>" +
			"<status exact='yes'>out of stock</status>" +
			"</manufacturing_schedule>";
	
	fetch_requested_data('',manu_data,function(manus)
	{
		var count_manu=manus.length;
		if(count_manu>0)
		{
			var id=get_new_key();
			var notes=count_manu+" manufactured products are out of stock. Please schedule their manufacturing.";
			var task_xml="<notifications>" +
					"<id>"+id+"</id>" +
					"<t_generated>"+get_my_time()+"</t_generated>" +
					"<data_id unique='yes'>"+get_my_time()+"</data_id>" +
					"<title>Schedule Manufacturing</title>" +
					"<notes>"+notes+"</notes>" +
					"<link_to>form88</link_to>" +
					"<status>pending</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
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

	setTimeout(notifications5_add,get_worker_repeat());
}



/**
 * Scheduled manufacturing is due
 */
function notifications6_add()
{
	var last_updated=get_my_time();
	
	/////manufacturing due//////////
	var schedule_data="<manufacturing_schedule>" +
			"<id></id>" +
			"<product></product>" +
			"<schedule upperbound='yes'>"+get_my_time()+"</schedule>" +
			"<status exact='yes'>scheduled</status>" +
			"<last_updated></last_updated>" +
			"</manufacturing_schedule>";
	
	fetch_requested_data('',schedule_data,function(schedules)
	{
		var schedule_xml="<notifications>";
		var counter=1;
		var id=parseFloat(get_new_key());
		
		schedules.forEach(function(schedule)
		{
			if((counter%500)===0)
			{
				schedule_xml+="</notifications><separator></separator><notifications>";
			}
			counter+=1;
		
			var notes="Manufacturing for product "+schedule.product+" is due. Please start the process.";
			schedule_xml+="<row>" +
					"<id>"+(id+counter)+"</id>" +
					"<t_generated>"+last_updated+"</t_generated>" +
					"<data_id unique='yes'>"+schedule.last_updated+"</data_id>" +
					"<title>Schedule Manufacturing</title>" +
					"<notes>"+notes+"</notes>" +
					"<link_to>form88</link_to>" +
					"<status>pending</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</row>";
		});
		schedule_xml+="</notifications>";
		if(is_online())
		{
			server_create_batch_noloader(schedule_xml);
		}
		else
		{
			local_create_batch_noloader(schedule_xml);
		}
	});
	
	///////////manufacturing end//////////
	
	setTimeout(notifications6_add,get_worker_repeat());
}

/**
 * Appointments due
 */
function notifications7_add()
{
	var last_updated=get_my_time();
	/////appointments//////////
	var app_time=parseFloat(get_my_time())+3600000;
	
	var apps_data="<appointments>" +
			"<id></id>" +
			"<customer></customer>" +
			"<schedule upperbound='yes'>"+app_time+"</schedule>" +
			"<status exact='yes'>pending</status>" +
			"<assignee></assignee>" +
			"</appointments>";
	
	fetch_requested_data('',apps_data,function(apps)
	{
		var app_xml="<notifications>";
		var counter=1;
		var id=parseFloat(get_new_key());
		apps.forEach(function(app)
		{
			if((counter%500)===0)
			{
				app_xml+="</notifications><separator></separator><notifications>";
			}
			counter+=1;
		
			var notes="Appointment with "+app.customer+" assigned to "+app.assignee+" @"+get_my_datetime(app.schedule);
			app_xml+="<row>" +
					"<id>"+(id+counter)+"</id>" +
					"<t_generated>"+last_updated+"</t_generated>" +
					"<data_id unique='yes'>"+app.id+"</data_id>" +
					"<title>Appointment</title>" +
					"<notes>"+notes+"</notes>" +
					"<link_to>form89</link_to>" +
					"<status>pending</status>" +
					"<target_user>"+app.customer+"--"+app.assignee+"</target_user>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</row>";
		});

		app_xml+="</notifications>";
		if(is_online())
		{
			server_create_batch_noloader(app_xml);
		}
		else
		{
			local_create_batch_noloader(app_xml);
		}
	});
	
	///////////due appointments//////////

	setTimeout(notifications7_add,get_worker_repeat());
}


/**
 * Store movement
 */
function notifications8_add()
{
	var last_updated=get_my_time();
		
	var dispatch_data="<store_movement>" +
			"<id></id>" +
			"<item_name></item_name>" +
			"<batch></batch>" +
			"<quantity></quantity>"+
			"<target></target>"+
			"<source></source>"+
			"<receiver></receiver>"+
			"<status exact='yes'>dispatched</status>" +
			"</store_movement>";
	
	fetch_requested_data('',dispatch_data,function(dispatches)
	{
		var dispatch_xml="<notifications>";
		var counter=1;
		var id=parseFloat(get_new_key());
		dispatches.forEach(function(dispatch)
		{
			if((counter%500)===0)
			{
				dispatch_xml+="</notifications><separator></separator><notifications>";
			}
			counter+=1;

			var link_to='form145';
			if(is_read_access('form157'))
			{
				link_to='form157';
			}
			
			var notes=dispatch.quantity+" units of "+dispatch.item_name+" have been dispatched from store "+dispatch.source+" for store "+dispatch.target;
			dispatch_xml+="<row>" +
					"<id>"+(id+counter)+"</id>" +
					"<t_generated>"+last_updated+"</t_generated>" +
					"<data_id unique='yes'>"+dispatch.id+"</data_id>" +
					"<title>Store Movement</title>" +
					"<notes>"+notes+"</notes>" +
					"<link_to>"+link_to+"</link_to>" +
					"<status>pending</status>" +
					"<target_user>"+dispatch.receiver+"</target_user>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</row>";
		});

		dispatch_xml+="</notifications>";
		if(is_online())
		{
			server_create_batch_noloader(dispatch_xml);
		}
		else
		{
			local_create_batch_noloader(dispatch_xml);
		}
	});
	
	setTimeout(notifications8_add,get_worker_repeat());
}

/**
 * Overdue payments
 */
function notifications9_add()
{
	var last_updated=get_my_time();

	////////overdue payments/////////////
	var expense_data="<expenses>" +
			"<id></id>" +
			"<person></person>" +
			"<amount></amount>" +
			"<detail></detail>" +
			"<expense_date></expense_date>" +
			"<status array='yes'>--approved--rejected--</status>" +
			"<last_updated lowerbound='yes'>"+(parseFloat(get_my_time())-86400000)+"</last_updated>"+
			"</expenses>";
	fetch_requested_data('',expense_data,function(expenses)
	{
		//console.log(expenses);
		var expense_xml="<notifications>";
		var counter=1;
		var id=parseFloat(get_new_key());
		expenses.forEach(function(expense)
		{
			if((counter%500)===0)
			{
				expense_xml+="</notifications><separator></separator><notifications>";
			}
			counter+=1;
			var notes="Expense of Rs. "+expense.amount+" from "+
					expense.person+" was "+expense.status;
			
			expense_xml+="<row>" +
					"<id>"+(id+counter)+"</id>" +
					"<t_generated>"+get_my_time()+"</t_generated>" +
					"<data_id unique='yes'>"+expense.id+"</data_id>" +
					"<title>Expense "+expense.status+"</title>" +
					"<notes>"+notes+"</notes>" +
					"<link_to>form137</link_to>" +
					"<status>pending</status>" +
					"<target_user>"+expense.person+"</target_user>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</row>";
		});
		expense_xml+="</notifications>";
		
		if(is_online())
		{
			server_create_batch_noloader(expense_xml);
		}
		else
		{
			local_create_batch_noloader(expense_xml);
		}
	});
	//////////overdue payments end//////
	
	setTimeout(notifications9_add,get_worker_repeat());
}


/**
 * This function checks for favourable scenarios to generate sale leads in the background
 */
function sale_leads_add()
{
	////////recurrent sales////////////
	
	var lead_past_time=parseFloat(get_my_time())-86400000;
	
	var attributes_data="<attributes>" +
			"<name></name>" +
			"<attribute exact='yes'>recurrent sale</attribute>" +
			"<type array='yes'>--product--service--</type>" +
			"<value></value>" +
			"</attributes>";
	
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			var bill_items_data="<bill_items>" +
					"<id></id>" +
					"<bill_id></bill_id>" +
					"<type exact='yes'>bought</type>" +
					"<last_updated lowerbound='yes'>"+lead_past_time+"</last_updated>" +
					"<item_name exact='yes'>"+attribute.item_name+"</item_name>" +
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
						"<last_updated lowerbound='yes'>"+lead_past_time+"</last_updated>" +
						"</bills>";
				fetch_requested_data('',bills_data,function(bills)
				{
					bills.forEach(function(bill)
					{
						var start_date=bill.bill_date;
						for(var k in bill_items)
						{
							if(bill.id==bill_items[k].bill_id)
							{
								var id=get_new_key();
								var detail="Bought "+attribute.item_name+" that is expected to be bought again in " +
										attribute.value+" days.\n";
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
								break;
							}
						}
					});
				});
			});
		});
	});
	//////////recurrent sales end//////

	
////////seasonal sales////////////
		
	var seasonal_attributes_data="<attributes>" +
			"<name></name>" +
			"<attribute exact='yes'>season</attribute>" +
			"<type array='yes'>--product--service--</type>" +
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
				"<type exact='yes'>bought</type>" +
				"<last_updated lowerbound='yes'>"+lead_past_time+"</last_updated>" +
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
					"<last_updated lowerbound='yes'>"+lead_past_time+"</last_updated>" +
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
										var id=get_new_key();
										
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
}


/**
 * This function checks for out of stock manufactured products
 */
function manufactured_products_outofstock()
{
	var schedule_data="<manufacturing_schedule>" +
			"<product></product>" +
			"<status exact='yes'>in stock</status>" +
			"<schedule upperbound='yes'>"+get_my_time()+"</schedule>" +
			"</manufacturing_schedule>";
	
	fetch_requested_data('',schedule_data,function(schedules)
	{
		schedules.forEach(function(schedule)
		{
			get_inventory(schedule.product,'',function(quantity)
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
	
	setTimeout(manufactured_products_outofstock,get_worker_repeat());
}

/**
 * This function processes interest for active loans
 */
function loans_interest_processing()
{
	var interest_due_time=parseFloat(get_my_time())+86400000;
	
	var loans_data="<loans>" +
			"<id></id>" +
			"<type></type>" +
			"<account></account>" +
			"<loan_amount></loan_amount>" +
			"<repayment_method exact='yes'>lump sum</repayment_method>" +
			"<interest_paid></interest_paid>" +
			"<interest_rate></interest_rate>" +
			"<interest_period></interest_period>" +
			"<next_interest_date upperbound='yes'>"+interest_due_time+"</next_interest_date>" +
			"<interest_type></interest_type>" +
			"<status exact='yes'>open</status>" +
			"</loans>";
	
	fetch_requested_data('',loans_data,function(loans)
	{
		loans.forEach(function(loan)
		{
			var interest_amount=parseFloat(loan.loan_amount)*(parseFloat(loan.interest_rate)/100);
			var next_interest_date=parseFloat(loan.next_interest_date)+(parseFloat(loan.interest_period)*86400000);
			if(loan.interest_type=='paid' && interest_amount>0)
			{
				var interest_paid=parseFloat(loan.interest_paid)+interest_amount;
				var receiver="interest";
				var giver=loan.account;
				var payment_type='received';
				if(loan.type=='taken')
				{
					receiver=loan.account;
					giver="interest";
					payment_type='paid';
				}
				var pt_tran_id=get_new_key();
				var loan_xml="<loans>" +
							"<id>"+loan.id+"</id>" +
							"<next_interest_date>"+next_interest_date+"</next_interest_date>" +
							"<interest_paid>"+interest_paid+"</interest_paid>" +
							"<last_updated>"+get_my_time()+"</last_updated>" +
							"</loans>";
				var payment_xml="<payments>" +
							"<id>"+pt_tran_id+"</id>" +
							"<status>pending</status>" +
							"<type>"+payment_type+"</type>" +
							"<date>"+get_my_time()+"</date>" +
							"<total_amount>"+interest_amount+"</total_amount>" +
							"<paid_amount>0</paid_amount>" +
							"<acc_name>"+loan.account+"</acc_name>" +
							"<due_date>"+loan.next_interest_date+"</due_date>" +
							"<mode>"+get_payment_mode()+"</mode>" +
							"<transaction_id>"+pt_tran_id+"</transaction_id>" +
							"<bill_id>"+loan.id+"</bill_id>" +
							"<last_updated>"+get_my_time()+"</last_updated>" +
							"</payments>";
				var pt_xml="<transactions>" +
							"<id>"+pt_tran_id+"</id>" +
							"<trans_date>"+get_my_time()+"</trans_date>" +
							"<amount>"+interest_amount+"</amount>" +
							"<receiver>"+receiver+"</receiver>" +
							"<giver>"+giver+"</giver>" +
							"<tax>0</tax>" +
							"<last_updated>"+get_my_time()+"</last_updated>" +
							"</transactions>";
				if(is_online())
				{
					server_update_simple(loan_xml);
					server_create_simple(payment_xml);
					server_create_simple(pt_xml);
				}
				else
				{
					local_update_simple(loan_xml);
					local_create_simple(payment_xml);
					local_create_simple(pt_xml);
				}
			}
			else
			{
				var loan_amount=parseFloat(loan.loan_amount)+interest_amount;
				var loan_xml="<loans>" +
							"<id>"+loan.id+"</id>" +
							"<next_interest_date>"+next_interest_date+"</next_interest_date>" +
							"<loan_amount>"+loan_amount+"</loan_amount>" +
							"<last_updated>"+get_my_time()+"</last_updated>" +
							"</loans>";
				if(is_online())
				{
					server_update_simple(loan_xml);
				}
				else
				{
					local_update_simple(loan_xml);
				}
			}
		});
	});
	
	setTimeout(loans_interest_processing,get_worker_repeat());
}


/**
 * This function processes instalments for active loans
 */
function loans_instalment_processing()
{
	var instalment_due_time=parseFloat(get_my_time())+86400000;
	
	var loans_data="<loans>" +
			"<id></id>" +
			"<type></type>" +
			"<account></account>" +
			"<loan_amount></loan_amount>" +
			"<repayment_method exact='yes'>instalments</repayment_method>" +
			"<emi></emi>" +
			"<emi_period></emi_period>" +
			"<pending_emi lowerbound='yes'>1</pending_emi>" +
			"<next_emi_date upperbound='yes'>"+instalment_due_time+"</next_emi_date>" +
			"<status exact='yes'>open</status>" +
			"</loans>";
	
	fetch_requested_data('',loans_data,function(loans)
	{
		loans.forEach(function(loan)
		{
			//var interest_amount=parseFloat(loan.loan_amount)*(parseFloat(loan.interest_rate)/100);
			var next_emi_date=parseFloat(loan.next_emi_date)+(parseFloat(loan.emi_period)*86400000);
			var pending_emi=parseFloat(loan.pending_emi)-1;
			var receiver="emi";
			var giver=loan.account;
			var payment_type='received';
			if(loan.type=='taken')
			{
				receiver=loan.account;
				giver="emi";
				payment_type='paid';
			}
			var pt_tran_id=get_new_key();
			var loan_xml="<loans>" +
						"<id>"+loan.id+"</id>" +
						"<next_emi_date>"+next_emi_date+"</next_emi_date>" +
						"<pending_emi>"+pending_emi+"</pending_emi>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</loans>";
			var payment_xml="<payments>" +
						"<id>"+pt_tran_id+"</id>" +
						"<status>pending</status>" +
						"<type>"+payment_type+"</type>" +
						"<date>"+get_my_time()+"</date>" +
						"<total_amount>"+loan.emi+"</total_amount>" +
						"<paid_amount>0</paid_amount>" +
						"<acc_name>"+loan.account+"</acc_name>" +
						"<due_date>"+loan.next_emi_date+"</due_date>" +
						"<mode>"+get_payment_mode()+"</mode>" +
						"<transaction_id>"+pt_tran_id+"</transaction_id>" +
						"<bill_id>"+loan.id+"</bill_id>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</payments>";
			var pt_xml="<transactions>" +
						"<id>"+pt_tran_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+loan.emi+"</amount>" +
						"<receiver>"+receiver+"</receiver>" +
						"<giver>"+giver+"</giver>" +
						"<tax>0</tax>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</transactions>";
			if(is_online())
			{
				server_update_simple(loan_xml);
				server_create_simple(payment_xml);
				server_create_simple(pt_xml);
			}
			else
			{
				local_update_simple(loan_xml);
				local_create_simple(payment_xml);
				local_create_simple(pt_xml);
			}
		});
	});
	
	setTimeout(loans_instalment_processing,get_worker_repeat());
}


/**
 * This function processes instalments for active loans
 */
function generate_attendance_records()
{
	//console.log('creating attendance records');
	var today=get_raw_time(get_my_date());
	var columns="<attendance>" +
		"<id></id>" +
		"<date exact='yes'>"+today+"</date>" +
		"<acc_name></acc_name>" +
		"<presence></presence>" +
		"<hours_worked></hours_worked>" +
		"</attendance>";
	
	fetch_requested_data('',columns,function(results)
	{
		//console.log(results.length);
		if(results.length===0)
		{
			var staff_columns="<staff>" +
					"<acc_name></acc_name>" +
					"<status exact='yes'>active</status>" +
					"</staff>";
			fetch_requested_data('',staff_columns,function(staff_names)
			{
				staff_names.forEach(function(staff_name)
				{
					//console.log('creating attendance record for'+staff_name.acc_name);
					var id=get_new_key();
					var data_xml="<attendance>" +
								"<id>"+id+"</id>" +
								"<acc_name>"+staff_name.acc_name+"</acc_name>" +
								"<presence>present</presence>" +
								"<date>"+today+"</date>" +
								"<hours_worked>8</hours_worked>" +
								"<last_updated>"+get_my_time()+"</last_updated>" +
								"</attendance>";
					if(is_online())
					{
						server_create_simple(data_xml);
					}
					else
					{
						local_create_simple(data_xml);
					}
				});
			});
		}
	});
}


/**
 * This function balances out pending payments for all accounts
 */
function balance_out_payments()
{
	if(is_update_access('form11'))
	{
		var payments_data="<payments>" +
				"<acc_name></acc_name>" +
				"<type></type>" +
				"<total_amount></total_amount>" +
				"<paid_amount></paid_amount>" +
				"<status exact='yes'>pending</status>" +
				"</payments>";
		fetch_requested_data('',payments_data,function(payments)
		{
			for(var i=0;i<payments.length;i++)
			{
				payments[i].total_received=0;
				payments[i].total_paid=0;
				
				if(payments[i].type=='paid')
				{
					payments[i].total_paid=parseFloat(payments[i].total_amount)-parseFloat(payments[i].paid_amount);
				}
				else
				{
					payments[i].total_received=parseFloat(payments[i].total_amount)-parseFloat(payments[i].paid_amount);
				}
				
				for(var j=i+1;j<payments.length;j++)
				{
					if(payments[i].acc_name==payments[j].acc_name)
					{
						if(payments[j].type=='paid')
						{
							payments[i].total_paid+=parseFloat(payments[j].total_amount)-parseFloat(payments[j].paid_amount);
						}
						else
						{
							payments[i].total_received+=parseFloat(payments[j].total_amount)-parseFloat(payments[j].paid_amount);
						}
						payments.splice(j,1);
						j-=1;
					}
				}
				if(payments[i].total_received===0 || payments[i].total_paid===0)
				{
					payments.splice(i,1);
					i-=1;
				}
			}
			
			//console.log(payments);
			payments.forEach(function(payment)
			{
				var accounts_data="<payments>" +
						"<id></id>" +
						"<type></type>" +
						"<date></date>" +
						"<total_amount></total_amount>" +
						"<paid_amount></paid_amount>" +
						"<notes></notes>" +
						"<status exact='yes'>pending</status>" +
						"<acc_name exact='yes'>"+payment.acc_name+"</acc_name>" +
						"</payments>";
				fetch_requested_data('',accounts_data,function(accounts)
				{
					accounts.sort(function(a,b)
					{
						if(a.date>b.date)
						{	return 1;}
						else 
						{	return -1;}
					});
					
					accounts.forEach(function(account)
					{
						if(payment.total_received<payment.total_paid)
						{
							if(account.type=='received')
							{
								var notes=account.notes+"\nClosed by balancing other payables";
								var received_xml="<payments>" +
									"<id>"+account.id+"</id>" +
									"<paid_amount>"+account.total_amount+"</paid_amount>" +
									"<status>closed</status>" +
									"<notes>"+notes+"</notes>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</payments>";
								if(is_online())
								{
									server_update_simple(received_xml);
								}
								else
								{
									local_update_simple(received_xml);
								}
							}
							else
							{
								var pending_amount=parseFloat(account.total_amount)-parseFloat(account.paid_amount);
								if(pending_amount<=payment.total_received)
								{
									var notes=account.notes+"\nClosed by balancing other receivables";
									var paid_xml="<payments>" +
										"<id>"+account.id+"</id>" +
										"<paid_amount>"+account.total_amount+"</paid_amount>" +
										"<status>closed</status>" +
										"<notes>"+notes+"</notes>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</payments>";
									if(is_online())
									{
										server_update_simple(paid_xml);
									}
									else
									{
										local_update_simple(paid_xml);
									}
	
									payment.total_received-=pending_amount;
									payment.total_paid-=pending_amount;
								}
								else
								{
									var paid_amount=parseFloat(account.paid_amount)+payment.total_received;
									var notes=account.notes+"\n Rs."+payment.total_received+" balanced against other receivables";
									var paid_xml="<payments>" +
										"<id>"+account.id+"</id>" +
										"<paid_amount>"+paid_amount+"</paid_amount>" +
										"<status>pending</status>" +
										"<notes>"+notes+"</notes>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</payments>";
									if(is_online())
									{
										server_update_simple(paid_xml);
									}
									else
									{
										local_update_simple(paid_xml);
									}
	
									payment.total_received=0;
									payment.total_paid=0;
								}
							}
						}
						else
						{
							if(account.type=='paid')
							{
								var notes=account.notes+"\nClosed by balancing other receivables";
								var paid_xml="<payments>" +
									"<id>"+account.id+"</id>" +
									"<paid_amount>"+account.total_amount+"</paid_amount>" +
									"<status>closed</status>" +
									"<notes>"+notes+"</notes>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</payments>";
								if(is_online())
								{
									server_update_simple(paid_xml);
								}
								else
								{
									local_update_simple(paid_xml);
								}
							}
							else
							{
								var pending_amount=parseFloat(account.total_amount)-parseFloat(account.paid_amount);
								
								if(pending_amount<=payment.total_paid)
								{
									var notes=account.notes+"\n Closed by balancing other payables";
									var received_xml="<payments>" +
										"<id>"+account.id+"</id>" +
										"<paid_amount>"+account.total_amount+"</paid_amount>" +
										"<status>closed</status>" +
										"<notes>"+notes+"</notes>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</payments>";
									if(is_online())
									{
										server_update_simple(received_xml);
									}
									else
									{
										local_update_simple(received_xml);
									}
									
									payment.total_received-=pending_amount;
									payment.total_paid-=pending_amount;
								}
								else
								{
									var paid_amount=parseFloat(account.paid_amount)+payment.total_paid;
									var notes=account.notes+"\n Rs."+payment.total_paid+" balanced against other payables";
									var received_xml="<payments>" +
										"<id>"+account.id+"</id>" +
										"<paid_amount>"+paid_amount+"</paid_amount>" +
										"<status>pending</status>" +
										"<notes>"+notes+"</notes>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</payments>";
									if(is_online())
									{
										server_update_simple(received_xml);
									}
									else
									{
										local_update_simple(received_xml);
									}
									payment.total_received=0;
									payment.total_paid=0;
								}
							}
						}
					});
				});
			});
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


function activate_loyalty_programs()
{
	var tier_data="<loyalty_programs>"+
			"<name></name>"+
			"<tier></tier>"+
			"<tier_criteria_lower></tier_criteria_lower>"+
			"<tier_criteria_upper></tier_criteria_upper>"+
			"<status exact='yes'>active</status>"+
			"</loyalty_programs>";
	fetch_requested_data('',tier_data,function(tiers)
	{
		var customers_data="<loyalty_customers>"+
					"<customer></customer>"+
					"</loyalty_customers>";
		get_single_column_data(function(customers)
		{
			customers.forEach(function(customer)
			{
				var points_data="<loyalty_points>"+
								"<program_name></program_name>"+
								"<customer exact='yes'>"+customer+"</customer>"+
								"<points></points>"+
								"</loyalty_points>";
				fetch_requested_data('',points_data,function(points)
				{
					for(var i=0;i<points.length;i++)
					{
						for(var j=i+1;j<points.length;j++)
						{
							if(points[i].program_name==points[j].program_name)
							{
								points[i].points=parseFloat(points[i].points)+parseFloat(points[j].points);
								points.splice(j,1);
								j-=1;
							}
						}
					}
					
					var loyalty_data="<loyalty_customers>"+
									"<id></id>"+
									"<customer exact='yes'>"+customer+"</customer>"+
									"<program_name></program_name>"+
									"<tier></tier>"+
									"</loyalty_customers>";
					fetch_requested_data('',loyalty_data,function(loyalties)
					{
						loyalties.forEach(function(loyalty)
						{
							for(var x in tiers)
							{
								if(tiers[x].name==loyalty.program_name && tiers[x].tier==loyalty.tier)
								{
									for(var y in points)
									{
										if(loyalty.program_name==points[y].program_name)
										{
											if(parseFloat(tiers[x].tier_criteria_lower)>parseFloat(points[y].points) || parseFloat(tiers[x].tier_criteria_upper)<parseFloat(points[y].points))
											{	
												break;
											}
											else
											{
												var loyalty_xml="<loyalty_customers>"+
														"<id>"+loyalty.id+"</id>"+
														"<status>active</status>"+
														"<last_updated>"+get_my_time()+"</last_updated>"+
														"</loyalty_customers>";
												if(is_online())
												{
													server_update_simple(loyalty_xml);
												}
												else
												{
													local_update_simple(loyalty_xml);
												}
												break;
											}
										}
									}
									break;
								}
							}
						});
					});
				});
			});
		},customers_data);
	});
}
