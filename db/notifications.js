/*name*:*notification1
*@*description*:*Overdue payments
*@*function_name*:*notifications_1();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*60
*@*repeat_delay*:*3600
*@*function_def*:*
*/
function notifications_1()
{
	var last_updated=get_my_time();

	var payments_data=new Object();
		payments_data.data_store='payments';
		payments_data.indexes=[{index:'id'},
							{index:'acc_name'},
							{index:'type'},
							{index:'total_amount'},
							{index:'paid_amount'},
							{index:'due_date',upperbound:last_updated},
							{index:'status',exact:'pending'}];

	read_json_rows('',payments_data,function(payments)
	{
		var data_json={data_store:'notifications',loader:'no',log:'no',data:[]};

		var counter=1;
		var id=parseFloat(get_new_key());
		payments.forEach(function(payment)
		{
			counter+=1;
			var notes="Payment of Rs. "+payment.total_amount+" from "+
					payment.acc_name+" is overdue. So far only Rs. "+payment.paid_amount+" has been received";
			if(payment.type=='paid')
			{
				notes="Payment of Rs. "+payment.total_amount+" to "+
				payment.acc_name+" is overdue. So far only Rs. "+payment.paid_amount+" has been paid";
			}

			var data_json_array=[{index:'id',value:(id+counter)},
						{index:'t_generated',value:get_my_time()},
						{index:'data_id',value:payment.id,unique:'yes'},
						{index:'title',value:'Rs. '+payment.total_amount+' payment overdue'},
						{index:'notes',value:notes},
						{index:'link_to',value:'form11'},
						{index:'status',value:'pending'},
						{index:'target_user',value:payment.acc_name},
						{index:'last_updated',value:last_updated}];
			data_json.data.push(data_json_array);

		});

		create_batch_json(data_json);
	});
}

/***function limiter***/

/*name*:*notification2
*@*description*:*Overdue tasks
*@*function_name*:*notifications_2();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*60
*@*repeat_delay*:*3600
*@*function_def*:*
*/
function notifications_2()
{
	var last_updated=get_my_time();
	var task_due_time=parseFloat(get_my_time())+86400000;

	var tasks_data=new Object();
		tasks_data.data_store='task_instances';
		tasks_data.indexes=[{index:'id'},
							{index:'name'},
							{index:'assignee'},
							{index:'task_hours'},
							{index:'t_due',upperbound:task_due_time},
							{index:'status',exact:'pending'}];

	read_json_rows('',tasks_data,function(tasks)
	{
		var data_json={data_store:'notifications',loader:'no',log:'no',data:[]};

		var counter=1;
		var id=parseFloat(get_new_key());
		tasks.forEach(function(task)
		{
			counter+=1;

			var due_time=parseFloat(get_my_time())+(3600000*task.task_hours);
			if(task.t_due<due_time)
			{
				var notes="Task "+task.name+" assigned to "+
						task.assignee+" is pending. It is due by "+get_my_datetime(task.t_due);
				var data_json_array=[{index:'id',value:(id+counter)},
						{index:'t_generated',value:get_my_time()},
						{index:'data_id',value:task.id,unique:'yes'},
						{index:'title',value:'Pending Task '+task.name},
						{index:'notes',value:notes},
						{index:'link_to',value:'form14'},
						{index:'status',value:'pending'},
						{index:'target_user',value:task.assignee},
						{index:'last_updated',value:last_updated}];
				data_json.data.push(data_json_array);
			}
		});

		create_batch_json(data_json);
	});
}

/***function limiter***/

/*name*:*notification3
*@*description*:*Sale Leads
*@*function_name*:*notifications_3();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*60
*@*repeat_delay*:*3600
*@*function_def*:*
*/
function notifications_3()
{
	var last_updated=get_my_time();

	var lead_due_time=parseFloat(get_my_time())+86400000;
	var lead_past_time=parseFloat(get_my_time())-86400000;

	var leads_data=new Object();
		leads_data.data_store='sale_leads';
		leads_data.indexes=[{index:'id'},
							{index:'customer'},
							{index:'detail'},
							{index:'identified_by'},
							{index:'due_date',upperbound:lead_due_time,lowerbound:lead_past_time},
							{index:'status',exact:'open'},
							{index:'last_updated'}];

	read_json_rows('',leads_data,function(leads)
	{
		var counter=1;
		var id=parseFloat(get_new_key());
		var data_json={data_store:'notifications',loader:'no',log:'no',data:[]};

		leads.forEach(function(lead)
		{
			counter+=1;
			var addon_id=lead.last_updated.substr(10,3);
			var notes="A sale opportunity with customer "+lead.customer+" is coming up."+
					"The details are as follows.\n"+lead.detail;
			var data_json_array=[{index:'id',value:(id+counter)},
						{index:'t_generated',value:get_my_time()},
						{index:'data_id',value:lead.id+addon_id,unique:'yes'},
						{index:'title',value:'Followup with '+lead.customer},
						{index:'notes',value:notes},
						{index:'link_to',value:'form213'},
						{index:'status',value:'pending'},
						{index:'target_user',value:lead.customer+"--"+lead.identified_by},
						{index:'last_updated',value:last_updated}];
			data_json.data.push(data_json_array);
		});
		create_batch_json(data_json);
	});
}

/***function limiter***/

/*name*:*notification4
*@*description*:*Insufficient stock for sale orders
*@*function_name*:*notifications_4();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*60
*@*repeat_delay*:*3600
*@*function_def*:*
*/
function notifications_4()
{
	var last_updated=get_my_time();

	var sale_order_data=new Object();
		sale_order_data.data_store='sale_orders';
		sale_order_data.indexes=[{index:'id'},
							{index:'status',exact:'pending'}];

	read_json_rows('',sale_order_data,function(sale_orders)
	{
		sale_orders.forEach(function(sale_order)
		{
			var sale_order_items_data=new Object();
				sale_order_items_data.data_store='sale_order_items';
				sale_order_items_data.indexes=[{index:'id'},{index:'order_id',exact:sale_order.id},
							{index:'item_name'},{index:'quantity'}];

			read_json_rows('',sale_order_items_data,function(sale_order_items)
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

							var data_json={data_store:'notifications',
						 				log:'no',
						 				warning:'no',
						 				data:[{index:'id',value:id},
						 					{index:'t_generated',value:last_updated},
						 					{index:'data_id',unique:'yes',value:sale_order_item.id},
						 					{index:'title',value:"Inventory short for "+sale_order_item.item_name},
						 					{index:'notes',value:notes},
						 					{index:'link_to',value:'form1'},
						 					{index:'status',value:'pending'},
						 					{index:'last_updated',value:last_updated}]};

							create_json(data_json);
						}
					});
				});
			});
		});
	});
}

/***function limiter***/

/*name*:*notification5
*@*description*:*Out of stock manufactured products, schedule manufacturing
*@*function_name*:*notifications_5();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*60
*@*repeat_delay*:*3600
*@*function_def*:*
*/
function notifications_5()
{
	var last_updated=get_my_time();

	var manu_data=new Object();
		manu_data.data_store='manufacturing_schedule';
		manu_data.return_column='id';
		manu_data.indexes=[{index:'id'},{index:'product'},
							{index:'status',exact:'out of stock'}];

	read_json_count(manu_data,function(count_manu)
	{
		if(count_manu>0)
		{
			var id=get_new_key();
			var notes=count_manu+" manufactured products are out of stock. Please schedule their manufacturing.";
			var data_json={data_store:'notifications',loader:'no',log:'no',
						data:[{index:'id',value:(id+counter)},
						{index:'t_generated',value:last_updated},
						{index:'data_id',value:last_updated,unique:'yes'},
						{index:'title',value:'Schedule Manufacturing'},
						{index:'notes',value:notes},
						{index:'link_to',value:'form88'},
						{index:'status',value:'pending'},
						{index:'target_user',value:''},
						{index:'last_updated',value:last_updated}]};

			create_json(data_json);
		}
	});
}

/***function limiter***/

/*name*:*notification6
*@*description*:*Scheduled Manufacturing is due
*@*function_name*:*notifications_6();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*60
*@*repeat_delay*:*3600
*@*function_def*:*
*/
function notifications_6()
{
	var last_updated=get_my_time();

	var schedule_data=new Object();
		schedule_data.data_store='manufacturing_schedule';
		schedule_data.indexes=[{index:'id'},{index:'product'},{index:'schedule',upperbound:last_updated},
							{index:'status',exact:'scheduled'},{index:'last_updated'}];

	read_json_rows('',schedule_data,function(schedules)
	{
		var data_json={data_store:'notifications',loader:'no',log:'no',data:[]};

		var counter=1;
		var id=parseFloat(get_new_key());
		schedules.forEach(function(schedule)
		{
			counter+=1;
			var notes="Manufacturing for product "+schedule.product+" is due. Please start the process.";

			var data_json_array=[{index:'id',value:(id+counter)},
						{index:'t_generated',value:last_updated},
						{index:'data_id',value:schedule.last_updated.id,unique:'yes'},
						{index:'title',value:'Start manufacturing of '+schedule.product},
						{index:'notes',value:notes},
						{index:'link_to',value:'form88'},
						{index:'status',value:'pending'},
						{index:'target_user',value:''},
						{index:'last_updated',value:last_updated}];
			data_json.data.push(data_json_array);
		});
		create_batch_json(data_json);
	});
}

/***function limiter***/

/*name*:*notification7
*@*description*:*Appointments due
*@*function_name*:*notifications_7();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*60
*@*repeat_delay*:*3600
*@*function_def*:*
*/
function notifications_7()
{
	var last_updated=get_my_time();
	var app_time=parseFloat(get_my_time())+3600000;

	var apps_data=new Object();
		apps_data.data_store='appointments';
		apps_data.indexes=[{index:'id'},{index:'customer'},{index:'schedule',upperbound:app_time},
							{index:'status',exact:'pending'},{index:'assignee'}];

	read_json_rows('',apps_data,function(apps)
	{
		var data_json={data_store:'notifications',loader:'no',log:'no',data:[]};
		var counter=1;
		var id=parseFloat(get_new_key());
		apps.forEach(function(app)
		{
			counter+=1;

			var notes="Appointment with "+app.customer+" is due at "+get_my_datetime(app.schedule);
			var data_json_array=[{index:'id',value:(id+counter)},
						{index:'t_generated',value:last_updated},
						{index:'data_id',value:app.id,unique:'yes'},
						{index:'title',value:'Appointment due at '+get_my_datetime(app.schedule)},
						{index:'notes',value:notes},
						{index:'link_to',value:'form89'},
						{index:'status',value:'pending'},
						{index:'target_user',value:app.customer+"--"+app.assignee},
						{index:'last_updated',value:last_updated}];
			data_json.data.push(data_json_array);
		});
		create_batch_json(data_json);
	});
}

/***function limiter***/

/*name*:*notification8
*@*description*:*Store Movement
*@*function_name*:*notifications_8();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*60
*@*repeat_delay*:*3600
*@*function_def*:*
*/
function notifications_8()
{
	var last_updated=get_my_time();

	var dispatch_data=new Object();
		dispatch_data.data_store='store_movement';
		dispatch_data.indexes=[{index:'id'},{index:'item_name'},{index:'batch'},{index:'quantity'},{index:'target'},
							{index:'source'},{index:'receiver'},{index:'status',exact:'dispatched'}];

	read_json_rows('',dispatch_data,function(dispatches)
	{
		var counter=1;
		var id=parseFloat(get_new_key());
		var data_json={data_store:'notifications',loader:'no',log:'no',data:[]};
		dispatches.forEach(function(dispatch)
		{
			counter+=1;
			var link_to='form145';
			if(is_read_access('form157'))
			{
				link_to='form157';
			}

			var notes=dispatch.quantity+" units of "+dispatch.item_name+" have been dispatched from store "+dispatch.source+" for store "+dispatch.target;
			var data_json_array=[{index:'id',value:(id+counter)},
						{index:'t_generated',value:last_updated},
						{index:'data_id',value:dispatch.id,unique:'yes'},
						{index:'title',value:'Move '+dispatch.item_name},
						{index:'notes',value:notes},
						{index:'link_to',value:link_to},
						{index:'status',value:'pending'},
						{index:'target_user',value:dispatch.receiver},
						{index:'last_updated',value:last_updated}];
			data_json.data.push(data_json_array);
		});
		create_batch_json(data_json);
	});
}

/***function limiter***/

/*name*:*notification9
*@*description*:*Expenses approved or rejected
*@*function_name*:*notifications_9();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*60
*@*repeat_delay*:*3600
*@*function_def*:*
*/
function notifications_9()
{
	var last_updated=get_my_time();

	var expense_data=new Object();
		expense_data.data_store='expenses';
		expense_data.indexes=[{index:'id'},{index:'person'},{index:'amount'},{index:'detail'},{index:'expense_date'},
							{index:'last_updated',lowerbound:(parseFloat(get_my_time())-86400000)},
							{index:'status',array:['approved','rejected']}];

	read_json_rows('',expense_data,function(expenses)
	{
		var data_json={data_store:'notifications',loader:'no',log:'no',data:[]};
		var counter=1;
		var id=parseFloat(get_new_key());

		expenses.forEach(function(expense)
		{
			counter+=1;
			var notes="Expense of Rs. "+expense.amount+" from "+
					expense.person+" was "+expense.status;

			var data_json_array=[{index:'id',value:(id+counter)},
						{index:'t_generated',value:last_updated},
						{index:'data_id',value:expense.id,unique:'yes'},
						{index:'title',value:'Expense '+expense.status},
						{index:'notes',value:notes},
						{index:'link_to',value:'form137'},
						{index:'status',value:'pending'},
						{index:'target_user',value:expense.person},
						{index:'last_updated',value:last_updated}];
			data_json.data.push(data_json_array);
		});
		create_batch_json(data_json);
	});
}

/***function limiter***/

/*name*:*notification10
*@*description*:*Overdue demo/hire
*@*function_name*:*notifications_10();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*60
*@*repeat_delay*:*3600
*@*function_def*:*
*/
function notifications_10()
{
	var item_data=new Object();
		item_data.data_store='bill_items';
		item_data.indexes=[{index:'id'},{index:'item_name'},{index:'quantity'},{index:'customer'},
							{index:'hiring_type'},{index:'issue_type',exact:'out'},
							{index:'issue_date',upperbound:(parseFloat(get_my_time())-(14*86400000)),lowerbound:(parseFloat(get_my_time())-(20*86400000))}];
	read_json_rows('',item_data,function(items)
	{
		items.forEach(function(item)
		{
			var return_item_data=new Object();
				return_item_data.data_store='bill_items';
				return_item_data.indexes=[{index:'id'},{index:'item_name'},{index:'quantity'},{index:'customer'},
									{index:'hiring_type'},{index:'issue_type',exact:'in'},
									{index:'issue_date'},{index:'issue_id',exact:item.id}];

			read_json_rows('',return_item_data,function(return_items)
			{
				var returned_quantity=0;
				for (var j in return_items)
				{
					returned_quantity+=parseFloat(return_items[j].quantity);
				}
				if(returned_quantity!=parseFloat(item.quantity))
				{
					var id=get_new_key();
					var	title="Return overdue for "+item.item_name;
					var	form_id='form228';
					var	notes=""+(-parseFloat(item.quantity))+" pieces of "+item.item_name+" were sent for "+
								item.hiring_type+" on "+get_my_past_date(item.issue_date)+". Please follow up.";
					if(item.hiring_type=='hire')
					{
						form_id='form229';
					}

					var data_json={data_store:'notifications',
	 					log:'no',
	 					warning:'no',
	 					data:[{index:'id',value:id},
	 					{index:'t_generated',value:get_my_time()},
	 					{index:'data_id',unique:'yes',value:item.id},
	 					{index:'title',value:title},
	 					{index:'notes',value:notes},
	 					{index:'link_to',value:form_id},
	 					{index:'status',value:'pending'},
	 					{index:'target_user',value:''},
	 					{index:'last_updated',value:get_my_time}]};

					create_json(data_json);
				}
			});
		});
	});
}

/***function limiter***/

/*name*:*notification11
*@*description*:*Insufficient stock for sale orders
*@*function_name*:*notifications_11();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*60
*@*repeat_delay*:*3600
*@*function_def*:*
*/
function notifications_11()
{
	var last_updated=get_my_time();

	var sale_order_data=new Object();
		sale_order_data.data_store='sale_orders';
		sale_order_data.indexes=[{index:'id'},{index:'channel'},{index:'order_num'},
							{index:'order_date',lowerbound:(get_my_time()-7*86400000)},
							{index:'status',array:['pending','billed','picked','packed','dispatched']}];

	read_json_rows('',sale_order_data,function(sale_orders)
	{
		sale_orders.forEach(function(sale_order)
		{
			var channel=sale_order.channel;
			var channel_limit=48*3600000;
			if(get_session_var(channel+"_order_time_limit")!='undefined')
				channel_limit=parseFloat(3600000*get_session_var(channel+"_order_time_limit"));
			var timestamp_limit=get_my_time()-channel_limit;
			if(parseFloat(sale_order.order_date)>timestamp_limit)
			{
				var id=get_new_key();
				var	title="Sale Order time breached for "+sale_order.channel;
				var	form_id='form108';
				var	notes="Sale order # "+sale_order.order_num+" has not been closed. It has breached the time limits of "+sale_order.channel+". Please follow up.";

				var data_json={data_store:'notifications',
	 					log:'no',
	 					warning:'no',
	 					data:[{index:'id',value:id},
	 					{index:'t_generated',value:get_my_time()},
	 					{index:'data_id',unique:'yes',value:sale_order.id},
	 					{index:'title',value:title},
	 					{index:'notes',value:notes},
	 					{index:'link_to',value:form_id},
	 					{index:'status',value:'pending'},
	 					{index:'target_user',value:''},
	 					{index:'last_updated',value:get_my_time}]};

				create_json(data_json);
			}
		});
	});
}

/***function limiter***/

/*name*:*worker1
*@*description*:*Recurrent Sale lead generation
*@*function_name*:*worker_1();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*120
*@*repeat_delay*:*7200
*@*function_def*:*
*/
function worker_1()
{
	var lead_past_time=parseFloat(get_my_time())-86400000;

	var attributes_data=new Object();
		attributes_data.data_store='attributes';
		attributes_data.indexes=[{index:'id'},{index:'name'},{index:'value'},
							{index:'attribute',exact:'recurrent sale'},
							{index:'type',array:['product','service']}];

	read_json_rows('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			var bill_items_data=new Object();
				bill_items_data.data_store='bill_items';
				bill_items_data.indexes=[{index:'id'},{index:'bill_id'},
								{index:'last_updated',lowerbound:lead_past_time},
								{index:'type',exact:'bought'},
								{index:'item_name',exact:attribute.item_name}];

			read_json_rows('',bill_items_data,function(bill_items)
			{
				var bills_string=[];
				for (var j in bill_items)
				{
					bills_string.push(bill_items[j].bill_id);
				}

				var bills_data=new Object();
				bills_data.data_store='bills';
				bills_data.indexes=[{index:'id',array:bills_string},{index:'customer_name'},
								{index:'last_updated',lowerbound:lead_past_time},
								{index:'bill_date'}];

				read_json_rows('',bills_data,function(bills)
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

								var data_json={data_store:'sale_leads',
					 					log:'no',
					 					warning:'no',
					 					data:[{index:'id',value:id},
					 					{index:'customer',value:bill.customer_name},
					 					{index:'source_id',unique:'yes',value:bill_items[k].id},
					 					{index:'detail',value:detail},
					 					{index:'due_date',value:due_date},
					 					{index:'identified_by',value:'auto'},
					 					{index:'last_updated',value:get_my_time}]};

								create_json(data_json);
								break;
							}
						}
					});
				});
			});
		});
	});
}

/***function limiter***/

/*name*:*worker2
*@*description*:*check stock of manufactured products
*@*function_name*:*worker_2();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*120
*@*repeat_delay*:*7200
*@*function_def*:*
*/
function worker_2()
{
	var schedule_data=new Object();
		schedule_data.data_store='manufacturing_schedule';
		schedule_data.indexes=[{index:'id'},{index:'product'},
								{index:'status',exact:'in stock'},
								{index:'schedule',upperbound:get_my_time()}];

	read_json_rows('',schedule_data,function(schedules)
	{
		schedules.forEach(function(schedule)
		{
			get_inventory(schedule.product,'',function(quantity)
			{
				if(quantity<=0)
				{
					var data_json={data_store:'manufacturing_schedule',
			 					log:'no',
			 					warning:'no',
			 					data:[{index:'id',value:schedule.id},
			 					{index:'product',value:schedule.product},
			 					{index:'status',value:'out of stock'},
			 					{index:'schedule',value:''},
			 					{index:'last_updated',value:get_my_time()}]};

					update_json(data_json);
				}
			});
		});
	});
}

/***function limiter***/

/*name*:*worker3
*@*description*:*Loan Interest processing
*@*function_name*:*worker_3();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*120
*@*repeat_delay*:*7200
*@*function_def*:*
*/
function worker_3()
{
	var interest_due_time=parseFloat(get_my_time())+86400000;

	var loans_data=new Object();
		loans_data.data_store='loans';
		loans_data.indexes=[{index:'id'},{index:'type'},{index:'account'},{index:'loan_amount'},
						{index:'repayment_method',exact:'lump sum'},{index:'interest_paid'},
						{index:'interest_rate'},{index:'interest_period'},{index:'interest_type'},
						{index:'next_interest_date',upperbound:interest_due_time},{index:'status',exact:'open'}];

	read_json_rows('',loans_data,function(loans)
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

				var loan_json={data_store:'loans',
			 					log:'no',
			 					warning:'no',
			 					data:[{index:'id',value:loan.id},
			 					{index:'next_interest_date',value:next_interest_date},
			 					{index:'interest_paid',value:interest_paid},
			 					{index:'last_updated',value:get_my_time()}]};

				var payment_json={data_store:'payments',
			 					log:'no',
			 					warning:'no',
			 					data:[{index:'id',value:pt_tran_id},
			 					{index:'status',value:'pending'},
			 					{index:'type',value:payment_type},
			 					{index:'date',value:get_my_time()},
			 					{index:'total_amount',value:interest_amount},
			 					{index:'paid_amount',value:'0'},
			 					{index:'acc_name',value:loan.account},
			 					{index:'due_date',value:loan.next_interest_date},
			 					{index:'mode',value:get_payment_mode()},
			 					{index:'transaction_id',value:pt_tran_id},
			 					{index:'bill_id',value:loan.id},
			 					{index:'last_updated',value:get_my_time()}]};

				var pt_json={data_store:'transactions',
			 					log:'no',
			 					warning:'no',
			 					data:[{index:'id',value:pt_tran_id},
			 					{index:'trans_date',value:get_my_time()},
			 					{index:'amount',value:interest_amount},
			 					{index:'receiver',value:receiver},
			 					{index:'giver',value:giver},
			 					{index:'tax',value:'0'},
			 					{index:'last_updated',value:get_my_time()}]};
				update_json(loan_json);
				create_json(payment_json);
				create_json(pt_json);
			}
			else
			{
				var loan_amount=parseFloat(loan.loan_amount)+interest_amount;
				var loan_json={data_store:'loans',
			 					log:'no',
			 					warning:'no',
			 					data:[{index:'id',value:loan.id},
			 					{index:'next_interest_date',value:next_interest_date},
			 					{index:'loan_amount',value:loan_amount},
			 					{index:'last_updated',value:get_my_time()}]};
				update_json(loan_json);
			}
		});
	});
}

/***function limiter***/

/*name*:*worker4
*@*description*:*Loan instalment processing
*@*function_name*:*worker_4();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*120
*@*repeat_delay*:*7200
*@*function_def*:*
*/
function worker_4()
{
	var instalment_due_time=parseFloat(get_my_time())+86400000;

	var loans_data=new Object();
		loans_data.data_store='loans';
		loans_data.indexes=[{index:'id'},{index:'type'},{index:'account'},{index:'loan_amount'},
						{index:'repayment_method',exact:'instalments'},{index:'emi'},{index:'emi_period'},
						{index:'pending_emi',lowerbound:'1'},
						{index:'next_emi_date',upperbound:instalment_due_time},{index:'status',exact:'open'}];

	read_json_rows('',loans_data,function(loans)
	{
		loans.forEach(function(loan)
		{
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

			var loan_json={data_store:'loans',
		 					log:'no',
		 					warning:'no',
		 					data:[{index:'id',value:loan.id},
		 					{index:'next_emi_date',value:next_emi_date},
		 					{index:'pending_emi',value:pending_emi},
		 					{index:'last_updated',value:get_my_time()}]};

			var payment_json={data_store:'payments',
		 					log:'no',
		 					warning:'no',
		 					data:[{index:'id',value:pt_tran_id},
		 					{index:'status',value:'pending'},
		 					{index:'type',value:payment_type},
		 					{index:'date',value:get_my_time()},
		 					{index:'total_amount',value:loan.emi},
		 					{index:'paid_amount',value:'0'},
		 					{index:'acc_name',value:loan.account},
		 					{index:'due_date',value:loan.next_emi_date},
		 					{index:'mode',value:get_payment_mode()},
		 					{index:'transaction_id',value:pt_tran_id},
		 					{index:'bill_id',value:loan.id},
		 					{index:'last_updated',value:get_my_time()}]};

			var pt_json={data_store:'transactions',
		 					log:'no',
		 					warning:'no',
		 					data:[{index:'id',value:pt_tran_id},
		 					{index:'trans_date',value:get_my_time()},
		 					{index:'amount',value:loan.emi},
		 					{index:'receiver',value:receiver},
		 					{index:'giver',value:giver},
		 					{index:'tax',value:'0'},
		 					{index:'last_updated',value:get_my_time()}]};

			update_json(loan_json);
			create_json(payment_json);
			create_json(pt_json);
		});
	});
}

/***function limiter***/

/*name*:*worker5
*@*description*:*Generate Attendance Records
*@*function_name*:*worker_5();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*120
*@*repeat_delay*:*7200
*@*function_def*:*
*/
function worker_5()
{
	var today=get_raw_time(vTime.date());

	var columns=new Object();
		columns.data_store='attendance';
		columns.indexes=[{index:'id'},{index:'acc_name'},{index:'presence'},{index:'hours_worked'},
						{index:'date',exact:today}];

	read_json_rows('',columns,function(results)
	{
		if(results.length===0)
		{
			var staff_columns=new Object();
			staff_columns.data_store='staff';
			staff_columns.indexes=[{index:'id'},{index:'acc_name'},{index:'status',exact:'active'}];

			read_json_rows('',staff_columns,function(staff_names)
			{
				staff_names.forEach(function(staff_name)
				{
					var id=parseFloat(staff_name.id)+today;
					var data_json={data_store:'attendance',
		 					log:'no',
		 					warning:'no',
		 					data:[{index:'id',value:id},
		 					{index:'acc_name',value:staff_name.acc_name},
		 					{index:'presence',value:'present'},
		 					{index:'date',value:today},
		 					{index:'hours_worked',value:'8'},
		 					{index:'last_updated',value:get_my_time()}]};
					create_json(data_json);
				});
			});
		}
	});
}

/***function limiter***/

/*name*:*worker6
*@*description*:*Balance out payments
*@*function_name*:*worker_6();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*60
*@*repeat_delay*:*3600
*@*function_def*:*
*/
function worker_6()
{
	if(is_update_access('form11'))
	{
		var payments_data=new Object();
			payments_data.data_store='payments';
			payments_data.indexes=[{index:'id'},{index:'acc_name'},{index:'type'},{index:'total_amount'},
						{index:'paid_amount'},{index:'status',exact:'pending'}];

		read_json_rows('',payments_data,function(payments)
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

			payments.forEach(function(payment)
			{
				var accounts_data=new Object();
					accounts_data.data_store='payments';
					accounts_data.indexes=[{index:'id'},{index:'type'},{index:'date'},
					{index:'total_amount'},{index:'paid_amount'},{index:'notes'},
					{index:'status',exact:'pending'},{index:'acc_name',exact:payment.acc_name}];

				read_json_rows('',accounts_data,function(accounts)
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
								var received_json={data_store:'payments',
					 					log:'no',
					 					warning:'no',
					 					data:[{index:'id',value:account.id},
					 					{index:'paid_amount',value:account.total_amount},
					 					{index:'status',value:'closed'},
					 					{index:'notes',value:notes},
					 					{index:'last_updated',value:get_my_time()}]};
								update_json(received_json);
							}
							else
							{
								var pending_amount=parseFloat(account.total_amount)-parseFloat(account.paid_amount);
								if(pending_amount<=payment.total_received)
								{
									var notes=account.notes+"\nClosed by balancing other receivables";
									var paid_json={data_store:'payments',
					 					log:'no',
					 					warning:'no',
					 					data:[{index:'id',value:account.id},
					 					{index:'paid_amount',value:account.total_amount},
					 					{index:'status',value:'closed'},
					 					{index:'notes',value:notes},
					 					{index:'last_updated',value:get_my_time()}]};
									update_json(paid_json);

									payment.total_received-=pending_amount;
									payment.total_paid-=pending_amount;
								}
								else
								{
									var paid_amount=parseFloat(account.paid_amount)+payment.total_received;
									var notes=account.notes+"\n Rs."+payment.total_received+" balanced against other receivables";

									var paid_json={data_store:'payments',
					 					log:'no',
					 					warning:'no',
					 					data:[{index:'id',value:account.id},
					 					{index:'paid_amount',value:paid_amount},
					 					{index:'status',value:'pending'},
					 					{index:'notes',value:notes},
					 					{index:'last_updated',value:get_my_time()}]};
									update_json(paid_json);

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
								var paid_json={data_store:'payments',
					 					log:'no',
					 					warning:'no',
					 					data:[{index:'id',value:account.id},
					 					{index:'paid_amount',value:account.total_amount},
					 					{index:'status',value:'closed'},
					 					{index:'notes',value:notes},
					 					{index:'last_updated',value:get_my_time()}]};
								update_json(paid_json);
							}
							else
							{
								var pending_amount=parseFloat(account.total_amount)-parseFloat(account.paid_amount);

								if(pending_amount<=payment.total_paid)
								{
									var notes=account.notes+"\n Closed by balancing other payables";
									var received_json={data_store:'payments',
					 					log:'no',
					 					warning:'no',
					 					data:[{index:'id',value:account.id},
					 					{index:'paid_amount',value:account.total_amount},
					 					{index:'status',value:'closed'},
					 					{index:'notes',value:notes},
					 					{index:'last_updated',value:get_my_time()}]};
									update_json(received_json);

									payment.total_received-=pending_amount;
									payment.total_paid-=pending_amount;
								}
								else
								{
									var paid_amount=parseFloat(account.paid_amount)+payment.total_paid;
									var notes=account.notes+"\n Rs."+payment.total_paid+" balanced against other payables";

									var received_json={data_store:'payments',
					 					log:'no',
					 					warning:'no',
					 					data:[{index:'id',value:account.id},
					 					{index:'paid_amount',value:paid_amount},
					 					{index:'status',value:'pending'},
					 					{index:'notes',value:notes},
					 					{index:'last_updated',value:get_my_time()}]};
									update_json(received_json);

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
}

/***function limiter***/

/*name*:*worker7
*@*description*:*Activate Loyalty programs
*@*function_name*:*worker_7();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*120
*@*repeat_delay*:*7200
*@*function_def*:*
*/
function worker_7()
{
	var tier_data=new Object();
		tier_data.data_store='loyalty_programs';
		tier_data.indexes=[{index:'id'},{index:'name'},{index:'tier'},
			{index:'tier_criteria_lower'},{index:'tier_criteria_upper'},
			{index:'status',exact:'active'}];

	read_json_rows('',tier_data,function(tiers)
	{
		var customers_data=new Object();
			customers_data.data_store='loyalty_customers';
			customers_data.return_column='customer';
			customers_data.indexes=[{index:'id'}];

		read_json_single_column(customers_data,function(customers)
		{
			customers.forEach(function(customer)
			{
				var points_data=new Object();
					points_data.data_store='loyalty_points';
					points_data.indexes=[{index:'id'},{index:'program_name'},{index:'points'},{index:'customer',exact:customer}];

				read_json_rows('',points_data,function(points)
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

					var loyalty_data=new Object();
						loyalty_data.data_store='loyalty_customers';
						loyalty_data.indexes=[{index:'id'},{index:'program_name'},{index:'tier'},{index:'customer',exact:customer}];

					read_json_rows('',loyalty_data,function(loyalties)
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
												var loyalty_json={data_store:'loyalty_customers',
								 					log:'no',
								 					warning:'no',
								 					data:[{index:'id',value:loyalty.id},
								 					{index:'status',value:'active'},
								 					{index:'last_updated',value:get_my_time()}]};
												update_json(loyalty_json);
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
		});
	});
}

/***function limiter***/

/*name*:*worker8
*@*description*:*Update Sale Order Status
*@*function_name*:*worker_8();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*120
*@*repeat_delay*:*7200
*@*function_def*:*
*/
function worker_8()
{
	if(is_update_access('form108'))
	{
		var orders_data=new Object();
			orders_data.data_store='sale_orders';
			orders_data.indexes=[{index:'id'},{index:'bill_id'},
			{index:'status',array:['billed','picked','packed','partially billed','partially picked','partially packed']}];

		read_json_rows('',orders_data,function (orders)
		{
			var bill_id_string=[];
			for(var i in orders)
			{
				bill_id_string.push(orders[i].bill_id);

				var bill_id_array=vUtil.jsonParse(orders[i].bill_id);
				for(var x in bill_id_array)
				{
					bill_id_string.push(bill_id_array[x].bill_id);
				}
			}

			var picked_pending_data=new Object();
				picked_pending_data.data_store='bill_items';
				picked_pending_data.return_column='bill_id';
				picked_pending_data.indexes=[{index:'id'},{index:'bill_id',array:bill_id_string},
											{index:'picked_status',exact:'pending'}];

			read_json_single_column(picked_pending_data,function (pick_items)
			{
				var picked_pending_adjust_data=new Object();
					picked_pending_adjust_data.data_store='inventory_adjust';
					picked_pending_adjust_data.return_column='source_id';
					picked_pending_adjust_data.indexes=[{index:'id'},{index:'source_id',array:bill_id_string},
											{index:'picked_status',exact:'pending'}];

				read_json_single_column(picked_pending_adjust_data,function (pick_adjust_items)
				{
					pick_adjust_items.forEach(function(pick_adjust)
					{
						pick_items.push(pick_adjust);
					});

					var packed_pending_data=new Object();
						packed_pending_data.data_store='bill_items';
						packed_pending_data.return_column='bill_id';
						packed_pending_data.indexes=[{index:'id'},{index:'bill_id',array:bill_id_string},
												{index:'packing_status',exact:'pending'}];

					read_json_single_column(packed_pending_data,function (pack_items)
					{
						var packed_pending_adjust_data=new Object();
						packed_pending_adjust_data.data_store='inventory_adjust';
						packed_pending_adjust_data.return_column='source_id';
						packed_pending_adjust_data.indexes=[{index:'id'},{index:'source_id',array:bill_id_string},
												{index:'packing_status',exact:'pending'}];

						read_json_single_column(packed_pending_adjust_data,function (pack_adjust_items)
						{
							pack_adjust_items.forEach(function(pack_adjust)
							{
								pack_items.push(pack_adjust);
							});

							var data_json={data_store:'sale_orders',loader:'no',log:'no',data:[]};

							var counter=1;
							var last_updated=get_my_time();

							orders.forEach(function(row)
							{
								var bill_id_array=vUtil.jsonParse(row.bill_id);
								var picked=true;
								var packed=true;

								var partially="";

								if(row.status.indexOf('partially')>-1)
								{
									partially="partially ";
								}
								for(var y in bill_id_array)
								{
									for(var x in pick_items)
									{
										if(pick_items[x]==bill_id_array[y].bill_id)
										{
											picked=false;
											break;
										}
									}
								}

								for(var y in bill_id_array)
								{
									for(var x in pack_items)
									{
										if(pack_items[x]==bill_id_array[y].bill_id)
										{
											packed=false;
											break;
										}
									}
								}

								if(picked && packed)
								{
									row.status='packed';
								}
								else if(picked)
								{
									row.status='picked';
								}

								if(row.status!='billed' && row.status!='partially billed')
								{
									if((counter%500)===0)
									{
										data_xml+="</sale_orders><separator></separator><sale_orders>";
									}

									counter+=1;
									var data_json_array=[{index:'id',value:row.id},
										{index:'status',value:partially+row.status},
										{index:'last_updated',value:last_updated}];
									data_json.data.push(data_json_array);
								}
							});
							update_batch_json(data_json);
						});
					});
				});
			});
		});
	}
}

/***function limiter***/

/*name*:*worker9
*@*description*:*Seasonal Sale lead generation
*@*function_name*:*worker_9();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*120
*@*repeat_delay*:*7200
*@*function_def*:*
*/
function worker_9()
{
	var lead_past_time=parseFloat(get_my_time())-86400000;

	var seasonal_attributes_data=new Object();
			seasonal_attributes_data.data_store='attributes';
			seasonal_attributes_data.indexes=[{index:'id'},{index:'name'},{index:'value'},
			{index:'attribute',value:'season'},
			{index:'type',array:['product','service']}];

	read_json_rows('',seasonal_attributes_data,function(seasonal_attributes)
	{
		var items_string=[];
		for(var i in seasonal_attributes)
		{
			items_string.push(seasonal_attributes[i].item_name);
		}

		var bill_items_data=new Object();
			bill_items_data.data_store='bill_items';
			bill_items_data.indexes=[{index:'id'},{index:'bill_id'},{index:'item_name',array:items_string},
									{index:'last_updated',lowerbound:lead_past_time}];

		read_json_rows('',bill_items_data,function(bill_items)
		{
			var bills_string=[];
			for (var j in bill_items)
			{
				bills_string.push(bill_items[j].bill_id);
			}

			var bills_data=new Object();
			bills_data.data_store='bills';
			bills_data.indexes=[{index:'id',array:bills_string},{index:'customer_name'},
								{index:'bill_date'},
								{index:'last_updated',lowerbound:lead_past_time}];

			read_json_rows('',bills_data,function(bills)
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

										var sale_lead_json={data_store:'sale_leads',
								 					log:'no',
								 					warning:'no',
								 					data:[{index:'id',value:id},
								 					{index:'customer',value:bill.customer_name},
								 					{index:'source_id',unique:'yes',value:bill_items[k].id},
								 					{index:'detail',value:detail},
								 					{index:'due_date',value:due_date},
								 					{index:'identified_by',value:'auto'},
								 					{index:'last_updated',value:get_my_time()}]};
										create_json(sale_lead_json);
									}
								}
							}
						}
					}

				});
			});
		});
	});
}

/***function limiter***/

/*name*:*worker10
*@*description*:*Show pending notification count
*@*function_name*:*worker_10();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*5
*@*repeat_delay*:*1200
*@*function_def*:*
*/
function worker_10()
{
	var notif_data={data_store:'notifications',
					access:'yes',
					indexes:[{index:'id'},
							{index:'target_user'},
							{index:'status',exact:'pending'}]};

	read_json_rows('',notif_data,function(notifs)
	{
		var num_res=notifs.length;
		if(num_res===0)
		{
			$('#notif_count').html("");
			$('#notif_count2').html("0");
			$('#notif_count').hide();
		}
		else
		{
			$('#notif_count').html(num_res);
			$('#notif_count2').html(num_res);
			$('#notif_count').show();
		}
	});
}

/***function limiter***/

/*name*:*worker11
*@*description*:*Show pending notifications summary
*@*function_name*:*worker_11();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*10
*@*repeat_delay*:*1200
*@*function_def*:*
*/
function worker_11()
{
	var columns={data_store:'notifications',
				count:10,
				 access:'yes',
				indexes:[{index:'id'},
						{index:'title'},
						{index:'link_to'},
						{index:'data_id'},
						{index:'notes'},
						{index:'t_generated'},
						{index:'status',exact:'pending'},
						{index:'target_user'},
						{index:'last_updated'}]};

	read_json_rows('',columns,function(notifs)
	{
		var result_html="";
		notifs.forEach(function(notif)
		{
			result_html+="<li><a onclick=\"element_display('"+notif.data_id+"','"+notif.link_to+"');\">"+
						"<span class='time'>"+get_only_time(notif.t_generated)+"</span>"+
						"<span class='details'><span class='label label-sm label-icon label-info'><i class='fa fa-bullhorn'></i></span>"+notif.title+"</span></a></li>";

		});
		$("#topbar_notifications").html(result_html);
	});
}

/***function limiter***/

/*name*:*worker12
*@*description*:*Show pending sync count
*@*function_name*:*worker_12();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*5
*@*repeat_delay*:*1200
*@*function_def*:*
*/
function worker_12()
{
	var sync_data={data_store:'activities',
					return_column:'id',
					indexes:[{index:'status',exact:'unsynced'}]};

	read_json_count(sync_data,function(sync_count)
	{
		if(sync_count==0)
		{
			$('#log_count').html("");
			$('#log_count2').html("0");
			$('#log_count').hide();
		}
		else
		{
			$('#log_count').html(sync_count);
			$('#log_count2').html(sync_count);
			$('#log_count').show();
		}
	});
}

/***function limiter***/

/*name*:*worker13
*@*description*:*Show activities summary
*@*function_name*:*worker_13();
*@*status*:*active
*@*last_updated*:*1
*@*initial_delay*:*5
*@*repeat_delay*:*1200
*@*function_def*:*
*/
function worker_13()
{
	var columns={data_store:'activities',
				count:10,
				indexes:[{index:'id'},
						{index:'title'},
						{index:'notes'},
						{index:'link_to'},
						{index:'data_id'},
						{index:'user_display',exact:'yes'},
						{index:'last_updated'}]};

	read_json_rows('',columns,function(activities)
	{
		var result_html="";
		activities.forEach(function(activity)
		{
			var icon="fa-bullhorn";
			var btn_color='label-info';
			switch(activity.title)
			{
				case 'Added':icon="fa-plus";
							btn_color="label-success";
							break;
				case 'Created':icon="fa-plus";
							btn_color="label-success";
							break;
				case 'Generated':icon="fa-plus";
							btn_color="label-success";
							break;
				case 'Deleted':icon="fa-trash-o";
							btn_color="label-danger";
							break;
				case 'Updated':icon="fa-save";
							btn_color="label-primary";
							break;
				case 'Saved':icon="fa-save";
							btn_color="label-primary";
							break;
				case 'Exported':icon="fa-share";
							btn_color="label-primary";
							break;
				case 'Imported':icon="fa-upload";
							btn_color="label-danger";
							break;
				case 'Data Import':icon="fa-upload";
							btn_color="label-danger";
							break;
			};
			result_html+="<li><a onclick=element_display('"+activity.data_id+"','"+activity.link_to+"');>"+
                        "<span class='time'>"+get_only_time(activity.last_updated)+"</span>"+
                        "<span class='details'><span class='label label-sm label-icon "+btn_color+"'><i class='fa "+icon+"' title='"+activity.title+"'></i></span>"+activity.notes+"</span></a></li>";

		});
		$("#topbar_logs").html(result_html);
	});
}
