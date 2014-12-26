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
	var last_updated=get_my_time();
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
					"<last_updated>"+last_updated+"</last_updated>" +
					"</row>";
		});
		not_pay_xml+="</notifications>";
		
		if(is_online())
		{
			server_create_batch(not_pay_xml);
		}
		else
		{
			local_create_batch(not_pay_xml);
		}
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
						"<status>pending</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</row>";
			}
		});
		
		task_xml+="</notifications>";
		
		if(is_online())
		{
			server_create_batch(task_xml);
		}
		else
		{
			local_create_batch(task_xml);
		}
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
					"<status>pending</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</row>";
		});
		leads_xml+="</notifications>";
		if(is_online())
		{
			server_create_batch(leads_xml);
		}
		else
		{
			local_create_batch(leads_xml);
		}
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
			server_create_batch(schedule_xml);
		}
		else
		{
			local_create_batch(schedule_xml);
		}
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
					"<last_updated>"+last_updated+"</last_updated>" +
					"</row>";
		});

		app_xml+="</notifications>";
		if(is_online())
		{
			server_create_batch(app_xml);
		}
		else
		{
			local_create_batch(app_xml);
		}
	});
	
	///////////due appointments//////////

	setTimeout(notifications_add,1800000);
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
			"<attribute>recurrent sale</attribute>" +
			"<type array='yes'>--product--service--</type>" +
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
									var id=get_new_key();
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
			"<name></name>" +
			"<attribute>season</attribute>" +
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
	
	setTimeout(manufactured_products_outofstock,1800000);
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
			"<repayment_method>lump sum</repayment_method>" +
			"<interest_paid></interest_paid>" +
			"<interest_rate></interest_rate>" +
			"<interest_period></interest_period>" +
			"<next_interest_date compare='less than'>"+interest_due_time+"</next_interest_date>" +
			"<interest_type></interest_type>" +
			"<status>open</status>" +
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
							"<mode></mode>" +
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
	
	setTimeout(loans_interest_processing,1800000);
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
			"<repayment_method>instalments</repayment_method>" +
			"<emi></emi>" +
			"<emi_period></emi_period>" +
			"<pending_emi compare='more than'>0</pending_emi>" +
			"<next_emi_date compare='less than'>"+instalment_due_time+"</next_emi_date>" +
			"<status>open</status>" +
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
						"<mode></mode>" +
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
	
	setTimeout(loans_instalment_processing,1800000);
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
		"<date>"+today+"</date>" +
		"<acc_name></acc_name>" +
		"<presence></presence>" +
		"<hours_worked></hours_worked>" +
		"</attendance>";
	
	fetch_requested_data('form7',columns,function(results)
	{
		//console.log(results.length);
		if(results.length===0)
		{
			var staff_columns="<staff>" +
					"<acc_name></acc_name>" +
					"<status>active</status>" +
					"</staff>";
			fetch_requested_data('form7',staff_columns,function(staff_names)
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

	setTimeout(generate_attendance_records,86400000);
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
				"<status>pending</status>" +
				"</payments>";
		fetch_requested_data('',payments_data,function(payments)
		{
			//console.log(payments);
			for(var i=0;i<payments.length;i++)
			{
				//console.log(payments[i]);
				payments[i].total_received=0;
				payments[i].total_paid=0;
				
				if(payments[i].type=='paid')
				{
					payments[i].total_paid=parseFloat(payments[i].total_amount)-parseFloat(payments[i].paid_amount);
					//console.log('paid type of payment'+payments[i].total_paid);
				}
				else
				{
					payments[i].total_received=parseFloat(payments[i].total_amount)-parseFloat(payments[i].paid_amount);
					//console.log('received type of payment'+payments[i].total_received);
				}
				
				for(var j=i+1;j<payments.length;j++)
				{
					if(payments[i].acc_name==payments[j].acc_name)
					{
						if(payments[j].type=='paid')
						{
							payments[i].total_paid+=parseFloat(payments[j].total_amount)-parseFloat(payments[j].paid_amount);
							//console.log('paid type of payment'+payments[i].total_paid);
						}
						else
						{
							payments[i].total_received+=parseFloat(payments[j].total_amount)-parseFloat(payments[j].paid_amount);
							//console.log('received type of payment'+payments[i].total_received);
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
						"<acc_name exact='yes'>"+payment.acc_name+"</acc_name>" +
						"<type></type>" +
						"<date sort='asc'></date>" +
						"<total_amount></total_amount>" +
						"<paid_amount></paid_amount>" +
						"<notes></notes>" +
						"<status>pending</status>" +
						"</payments>";
				//console.log(accounts_data);
				fetch_requested_data('',accounts_data,function(accounts)
				{
					//console.log(accounts);
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
