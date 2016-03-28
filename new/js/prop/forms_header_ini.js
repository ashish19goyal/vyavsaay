/**
 * @form Update Inventory
 * @formNo 1
 */
function form1_header_ini()
{
	var filter_fields=document.getElementById('form1_header');	
	var names_filter=filter_fields.elements[0];
	var batches_filter=filter_fields.elements[1];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form1_ini();
	});
	//setting autocompletes 
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	var batch_data="<product_instances>" +
			"<batch></batch>" +
			"</product_instances>";

	set_my_filter(products_data,names_filter);
	set_my_filter(batch_data,batches_filter);
};

/**
 * @form Create Newsletter
 * @formNo 2
 */
function form2_header_ini()
{
	var fields=document.getElementById('form2_master');
	var name_filter=fields.elements[1];
	fields.elements[2].value="";
	var id_filter=fields.elements[3];
	id_filter.value=get_new_key();
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form2_add_item();
	});
	
	var save_button=fields.elements[4];	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form2_create_form();
	});
					
	name_filter.value="";	
}


/**
 * this function prepares the table for manage assets form
 * @form Manage Assets
 * @formNo 5
 */
function form5_header_ini()
{
	var filter_fields=document.getElementById('form5_header');
	var asset_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form5_ini();
	});

	var assets_data="<assets>" +
		"<name></name>" +
		"</assets>";
	
	set_my_filter(assets_data,asset_filter);
	set_static_filter('assets','type',type_filter);
	
};



/**
 * @form Attendance
 * @formNo 7
 */
function form7_header_ini()
{
	var fields=document.getElementById('form7_master');
	var date_filter=fields.elements[1];
	
	$(fields).on("submit",function(event)
	{
		event.preventDefault();
		form7_update_form();
	});
	
	var filter_fields=document.getElementById('form7_header');
	var staff_filter=filter_fields.elements[0];
	var attendance_filter=filter_fields.elements[1];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form7_ini();
	});
	
	var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	
	set_my_filter(staff_data,staff_filter);
	set_static_filter('attendance','presence',attendance_filter);

	$(date_filter).datepicker();
	date_filter.value=get_my_date();

	$("#form7_master").hide();
	$("#form7_body").parent().hide();
	$("#form7_calendar").show();
	///initializing calendar
	
	$('#form7_calendar').fullCalendar('destroy');
	$('#form7_calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title'
		},
		height:400,
		fixedWeekCount:false,
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		events: function(start, end, timezone, callback)
		{
	        var start_time=(parseFloat(start.unix())-1000)*1000;
	        var end_time=parseFloat(end.unix())*1000;
	        var attendance_data="<attendance>" +
	        		"<presence></presence>" +
	        		"<hours_worked></hours_worked>" +
	        		"<date lowerbound='yes'>"+start_time+"</date>" +
	        		"<date upperbound='yes'>"+end_time+"</date>" +
	        		"</attendance>";
	        fetch_requested_data('form7',attendance_data,function(attendances)
	        {
	        	var events=[];
	        	
	        	attendances.sort(function(a,b)
	        	{
	        		if(a.date>b.date)
	        			return 1;
	        		else
	        			return -1;
	        	});
	        	
	        	for(var i=0;i<attendances.length;i++)
	        	{
		        	var start_iterator=0;
		        	var presents=0;
		        	var hours_worked=parseFloat(attendances[i].hours_worked);
		        	var absents=0;

		        	if(attendances[i].presence=='present')
        				presents+=1;
        			else
        				absents+=1;
        			
	        		for(var j=i+1;j<attendances.length;j++)
	        		{
		        		if(attendances[i].date===attendances[j].date)
		        		{
		        			hours_worked+=parseFloat(attendances[j].hours_worked);
		        			if(attendances[j].presence=='present')
		        				presents+=1;
		        			else
		        				absents+=1;
		        			
		        			attendances.splice(j,1);
		        			j-=1;
		        		}
	        		}

        			var color="green";
        			if(absents>presents)
        			{
        				color="red";
        			}
	        		events.push({
	        			title:"Total strength:"+presents+"\n Hours Worked:"+hours_worked,
	        			start:get_iso_date(attendances[i].date),
	        			allDay:true,
	        			color:color,
	        			textColor:'#fff',
	        			editable:false
	        		});
	        	}
	        	callback(events);
	        });
	    },
	    dayClick: function(date,jsEvent,view){
	    	var my_date=get_my_date_from_iso(date.format());
	    	date_filter.value=my_date;
	    	form7_ini();
	    	$("#form7_master").show();
	    	$("#form7_body").parent().show();
	    	$("#form7_calendar").hide();
	    },
	    eventClick: function(calEvent,jsEvent,view){
	    	var my_date=get_my_date_from_iso(calEvent.start.format());
	    	date_filter.value=my_date;
	    	form7_ini();
	    	$("#form7_master").show();
	    	$("#form7_body").parent().show();
	    	$("#form7_calendar").hide();
	    }
	});
};

function form7_switch_view()
{
	form7_ini();
	
	$("#form7_master").toggle();
	$("#form7_body").parent().toggle();
	$("#form7_calendar").toggle();
}


/**
 * @form Create Service Bills
 * @formNo 10
 */
function form10_header_ini()
{
	var fields=document.getElementById('form10_master');
	
	var customers_filter=fields.elements['customer'];
	var order_num=fields.elements['order_num'];
	var bill_num=fields.elements['bill_num'];
	var bill_date=fields.elements['bill_date'];
	var due_date=fields.elements['due_date'];
	fields.elements['bill_id'].value=get_new_key();
	var order_id_filter=fields.elements['order_id'];
	order_id_filter.value="";
	fields.elements['t_id'].value=fields.elements['bill_id'].value;
	var save_button=fields.elements['save'];
	var address_filter=fields.elements['customer_address'];
	address_filter.value="";
	order_num.value="";
	customers_filter.value='';
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form10_create_form();
	});

	var bill_id=$("#form10_link").attr('data_id');
	if(bill_id==null || bill_id=='')
	{
		var bill_num_data="<user_preferences count='1'>"+
						"<value></value>"+
						"<name exact='yes'>bill_num</name>"+
						"</user_preferences>";
		set_my_value(bill_num_data,bill_num);	
	}
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form10_add_item();
	});

	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list_func(customers_data,customers_filter,function () 
	{
		$(customers_filter).focus();
	});
	
	var add_customer=document.getElementById('form10_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{	
			var customers_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";
			set_my_value_list(customers_data,customers_filter);
		});
	});

	$(customers_filter).off('blur');
	$(customers_filter).on('blur',function () 
	{
		var address_data="<customers count='1'>"+
						"<address></address>"+
						"<city></city>"+
						"<pincode></pincode>"+
						"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>"+
						"</customers>";
		fetch_requested_data('',address_data,function(addresses)
		{
			if(addresses.length>0)
				address_filter.value=addresses[0].address+', '+addresses[0].city+"-"+addresses[0].pincode;
		});				
	});

	$(order_num).off('blur');
	$(order_num).on('blur',function () 
	{
		var order_data="<sale_orders>"+
			"<id></id>"+
			"<customer_name></customer_name>"+
			"<order_num exact='yes'>"+order_num.value+"</order_num>"+
			"</sale_orders>";
		fetch_requested_data('',order_data,function (orders) 
		{
			if(orders.length>0)
			{
				customers_filter.value=orders[0].customer_name;
				order_id_filter.value=orders[0].id;				
			}
		});		
		set_my_value(order_data,customers_filter);
	});	
	
	$(bill_date).datepicker();
	bill_date.value=get_my_date();
	$(due_date).datepicker();
	due_date.value=get_my_past_date((get_my_time()+(3*86400000)));
}


/**
 * @form Schedule Payments
 * @formNo 11
 */
function form11_header_ini()
{
	var filter_fields=document.getElementById('form11_header');
	var type_filter=filter_fields.elements[0];
	var account_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var accounts_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form11_ini();
	});

	set_my_filter(accounts_data,account_filter);
	set_static_filter('payments','type',type_filter);
	set_static_filter('payments','status',status_filter);
	
};

/**
 * @form New Bill
 * @formNo 12
 */
function form12_header_ini()
{
	var fields=document.getElementById('form12_master');
	
	var customers_filter=fields.elements[1];
	var bill_date=fields.elements[2];
	var bill_num=fields.elements[3];
	fields.elements[4].value=get_new_key();
	fields.elements[5].value="";
	fields.elements[6].value=fields.elements[4].value;
	var save_button=fields.elements[7];
	
	var bill_id=$("#form12_link").attr('data_id');
	if(bill_id==null || bill_id=='')
	{	
		var bill_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>bill_num</name>"+
							"</user_preferences>";
		set_my_value(bill_num_data,bill_num);	
	}

	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form12_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form12_add_item();
	});

	var add_customer=document.getElementById('form12_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{	
			var customers_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";
			set_my_value_list(customers_data,customers_filter);
		});
	});

	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter);
	
	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	customers_filter.value='';
	$(customers_filter).focus();
}


/**
 * @form Manage Tasks
 * @formNo 14
 */
function form14_header_ini()
{
	$("#form14_body").parent().hide();
	$("#form14_calendar").show();
	
	
	///initializing calendar
	$('#form14_calendar').fullCalendar('destroy');
	$('#form14_calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		height:400,
		fixedWeekCount:false,
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		events: function(start, end, timezone, callback) {
	        var start_time=parseFloat(start.unix())*1000;
	        var end_time=parseFloat(end.unix())*1000;
	        var tasks_data="<task_instances>" +
	        		"<id></id>" +
	        		"<name></name>" +
	        		"<description></description>" +
	        		"<t_initiated lowerbound='yes'>"+start_time+"</t_initiated>" +
	        		"<t_initiated upperbound='yes'>"+end_time+"</t_initiated>" +
	        		"<t_due></t_due>" +
	        		"<status></status>" +
	        		"<assignee></assignee>" +
	        		"<task_hours></task_hours>" +
	        		"</task_instances>";
	        
	        fetch_requested_data('form14',tasks_data,function(tasks)
	        {
	        	var events=[];
	        	
	        	tasks.forEach(function(task)
	        	{
        			var color="yellow";
        			if(task.status=='cancelled')
        			{
        				color="aaaaaa";
        			}
        			else if(task.status=='pending' && parseFloat(task.t_due)<get_my_time())
        			{
        				color='#ff0000';
        			}
        			else if(task.status=='completed')
        			{
        				color='#00ff00';
        			}
	        		events.push({
	        			title: "\n"+task.name+"\nAssigned to: "+task.assignee+"\nDue time: "+get_formatted_time(task.t_due),
	        			start:get_iso_time(task.t_initiated),
	        			end:get_iso_time(parseFloat(task.t_initiated)+(parseFloat(task.task_hours)*3600000)),
	        			color: color,
	        			textColor:"#333",
	        			id: task.id
	        		});	        		
	        	});
	        	callback(events);
	        });
	    },
	    dayClick: function(date,jsEvent,view){
	    	modal32_action(get_my_date_from_iso(date.format()));
	    },
	    eventClick: function(calEvent,jsEvent,view){
	    	modal33_action(calEvent.id);
	    },
	    eventDrop: function(event,delta,revertFunc){
	    	var t_initiated=(parseFloat(event.start.unix())*1000);
	    	var data_xml="<task_instances>" +
						"<id>"+event.id+"</id>" +
						"<t_initiated>"+t_initiated+"</t_initiated>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</task_instances>";
			if(is_online())
			{
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
	    },
	    eventResize: function(event, delta, revertFunc){
	    	var task_hours=parseFloat((parseFloat(event.end.unix())-parseFloat(event.start.unix()))/3600);
	    	var data_xml="<task_instances>" +
						"<id>"+event.id+"</id>" +
						"<task_hours>"+task_hours+"</task_hours>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</task_instances>";
			if(is_online())
			{
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
	
	///calendar set
	var filter_fields=document.getElementById('form14_header');
	var task_filter=filter_fields.elements[0];
	var assignee_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form14_ini();
	});

	var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	var task_data="<task_type>" +
			"<name></name>" +
			"</task_type>";
	
	set_my_filter(task_data,task_filter);	
	set_my_filter(staff_data,assignee_filter);
	set_static_filter('task_instances','status',status_filter);
	
};

function form14_switch_view()
{
	form14_ini();
	$("#form14_body").parent().toggle();
	$("#form14_calendar").toggle();
}


/**
 * @form Manage Customer Returns
 * @formNo 16
 */
function form16_header_ini()
{
	var filter_fields=document.getElementById('form16_header');
	var order_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form16_ini();
	});

	var order_data="<sale_orders>" +
			"<order_num></order_num>" +
			"</sale_orders>";

	var cust_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(cust_data,name_filter);
	set_my_filter(order_data,order_filter);
};


/**
 * @form Create Supplier bills
 * @formNo 21
 */
function form21_header_ini()
{
	var fields=document.getElementById('form21_master');
	
	var supplier_filter=fields.elements['supplier'];
	var bill_date=fields.elements['date'];
	var entry_date=fields.elements['edate'];
	fields.elements['bill_id'].value=get_new_key();
	fields.elements['t_id'].value=fields.elements['bill_id'].value;
	var save_button=fields.elements['save'];	
	fields.elements['bill_num'].value="";
	supplier_filter.value='';
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form21_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form21_add_item();
	});
	
	var suppliers_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	
	set_my_value_list(suppliers_data,supplier_filter,function () 
	{
		$(supplier_filter).focus();
	});

	var add_supplier=document.getElementById('form21_add_supplier');
	$(add_supplier).off('click');
	$(add_supplier).on('click',function()
	{
		modal13_action(function()
		{
			var suppliers_data="<suppliers>" +
				"<acc_name></acc_name>" +
				"</suppliers>";
			set_my_value_list(suppliers_data,supplier_filter);
		});
	});
	
	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	
	$(entry_date).datepicker();
	$(entry_date).val(get_my_date());
}


/**
 * @form New Purchase Order
 * @formNo 24
 */
function form24_header_ini()
{
	var fields=document.getElementById('form24_master');
	
	var supplier_filter=fields.elements['supplier'];
	var order_date=fields.elements['date'];
	var order_num=fields.elements['order_num'];
	var status_filter=fields.elements['status'];
	fields.elements['order_id'].value=get_new_key();
	var save_button=fields.elements['save'];
	var share_button=fields.elements['share'];	
	var pmode_filter=fields.elements['mode'];	
	pmode_filter.value="";
	fields.elements['cst'].checked=false;

	$(share_button).hide();

	$(supplier_filter).off('blur');	
	//$(supplier_filter).off('change');	
	$(supplier_filter).on('blur',function () 
	{
		var supplier_address="<suppliers>"+
							"<address></address>"+
							"<pincode></pincode>"+
							"<acc_name exact='yes'>"+supplier_filter.value+"</acc_name>"+
							"</suppliers>";
		fetch_requested_data('',supplier_address,function(addresses)
		{
			if(addresses.length>0)
			{
				fields.elements['address'].value=addresses[0].address+"-"+addresses[0].pincode;
			}
		});					
		var supplier_attributes="<attributes>"+
								"<type exact='yes'>supplier</type>"+
								"<name exact='yes'>"+supplier_filter.value+"</name>"+
								"<attribute></attribute>"+
								"<value></value>"+
								"</attributes>";
		fetch_requested_data('',supplier_attributes,function (attributes) 
		{
			for(var i in attributes)
			{
				if(attributes[i].attribute=='CST')
				{
					if(attributes[i].value=='yes')
					{
						fields.elements['cst'].checked=true;
					}
					else{
						fields.elements['cst'].checked=false;
					}
				}
				else if(attributes[i].attribute=='payment mode')
				{
					pmode_filter.value=attributes[i].value;
				}
				else if(attributes[i].attribute=='TIN#')
				{
					fields.elements['tin'].value=attributes[i].value;
				}
			}
		});						
	});	
	
	set_static_value_list('purchase_orders','payment_mode',pmode_filter);
	
	var po_id=$("#form24_link").attr('data_id');
	if(po_id==null || po_id=='')
	{
		var po_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>po_num</name>"+
							"</user_preferences>";
		set_my_value(po_num_data,order_num);
	}
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form24_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form24_add_item();
	});

	var add_supplier=document.getElementById('form24_add_supplier');
	$(add_supplier).off('click');
	$(add_supplier).on('click',function()
	{
		modal13_action(function()
		{
			var supplier_data="<suppliers>" +
				"<acc_name></acc_name>" +
				"</suppliers>";	
			set_my_value_list(supplier_data,supplier_filter);
		});
	});

	var supplier_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";	
	set_my_value_list(supplier_data,supplier_filter,function () 
	{
		$(supplier_filter).focus();
	});
	
	$(order_date).datepicker();
	order_date.value=get_my_date();
	set_static_filter('purchase_orders','status',status_filter);
	status_filter.value='draft';
	supplier_filter.value='';
}

/**
 * @form Manage Offers
 * @formNo 35
 */
function form35_header_ini()
{
	var filter_fields=document.getElementById('form35_header');
	var name_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var offer_data="<offers>" +
			"<offer_name></offer_name>" +
			"</offers>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form35_ini();
	});

	set_my_filter(offer_data,name_filter);
	set_static_filter('offers','offer_type',type_filter);
	set_static_filter('offers','status',status_filter);
	
};


/**
 * @form Manage Bills
 * @formNo 42
 */
function form42_header_ini()
{
	var filter_fields=document.getElementById('form42_header');
	var bill_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	
	var bill_data="<bills>" +
			"<bill_num></bill_num>" +
			"</bills>";
	var cust_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form42_ini();
	});

	set_my_filter(bill_data,bill_filter);
	set_my_filter(cust_data,name_filter);
};


/**
 * @form Manage Purchase Orders
 * @formNo 43
 */
function form43_header_ini()
{
	var filter_fields=document.getElementById('form43_header');
	var order_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	var import_button=filter_fields.elements['import'];
	
	$(import_button).off('click');	
	$(import_button).on('click',function () 
	{
		modal140_action();
	});
	
	var order_data="<purchase_orders>" +
			"<order_num></order_num>" +
			"</purchase_orders>";
	var name_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form43_ini();
	});

	set_my_filter(order_data,order_filter);
	set_my_filter(name_data,name_filter);
	set_static_filter('purchase_orders','status',status_filter);
};


/**
 * @form change password
 * @formNo 47
 */
function form47_header_ini()
{
	var filter_fields=document.getElementById('form47_master');
	filter_fields.elements[1].value="";
	filter_fields.elements[2].value="";
	filter_fields.elements[3].value="";
}


/**
 * @form Select Templates
 * @formNo 54
 */
function form54_header_ini()
{
	var filter_fields=document.getElementById('form54_header');
	var templates_filter=filter_fields.elements[0];
	var save_element=filter_fields.elements[1];
	
	$(save_element).off('click');
	$(save_element).on('click',function(e)
	{
		form54_update_form();
	});
	
	var templates_data="<user_preferences>" +
			"<display_name></display_name>" +
			"<type exact='yes'>template</type>" +
			"</user_preferences>";

	set_my_filter(templates_data,templates_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form54_ini();
	});

};


/**
 * @form Manage services
 * @formNo 57
 */
function form57_header_ini()
{
	var filter_fields=document.getElementById('form57_header');
	var service_filter=filter_fields.elements[0];
	
	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	
	set_my_filter(service_data,service_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form57_ini();
	});

};

/**
 * @form Service Pre-requisites
 * @formNo 58
 */
function form58_header_ini()
{
	var filter_fields=document.getElementById('form58_header');
	var service_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var requisite_filter=filter_fields.elements[2];
	
	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	var requisite_data="<pre_requisites>" +
			"<requisite_name></requisite_name>" +
			"<type exact='yes'>service</type>" +
			"</pre_requisites>";
	
	set_my_filter(service_data,service_filter);
	set_static_filter('pre_requisites','requisite_type',type_filter);
	set_my_filter(requisite_data,requisite_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form58_ini();
	});

};

/**
 * @form product pre-requisites
 * @formNo 59
 */
function form59_header_ini()
{
	var filter_fields=document.getElementById('form59_header');
	var product_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var requisite_filter=filter_fields.elements[2];
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var requisite_data="<pre_requisites>" +
			"<requisite_name></requisite_name>" +
			"<type exact='yes'>product</type>" +
			"</pre_requisites>";
	
	set_my_filter(product_data,product_filter);
	set_static_filter('pre_requisites','requisite_type',type_filter);
	set_my_filter(requisite_data,requisite_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form59_ini();
	});

};

/**
 * @form Service Attributes
 * @formNo 61
 */
function form61_header_ini()
{
	var filter_fields=document.getElementById('form61_header');
	var service_filter=filter_fields.elements[0];
	var attribute_filter=filter_fields.elements[1];
	
	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	var attribute_data="<attributes>" +
			"<attribute></attribute>" +
			"<type exact='yes'>service</type>" +
			"</attributes>";
	
	set_my_filter(service_data,service_filter);
	set_my_filter(attribute_data,attribute_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form61_ini();
	});

};


/**
 * @form Product reviews
 * @formNo 62
 */
function form62_header_ini()
{
	var filter_fields=document.getElementById('form62_header');
	var product_filter=filter_fields.elements[0];
	var reviewer_filter=filter_fields.elements[1];
	var rating_filter=filter_fields.elements[2];
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var reviewer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(product_data,product_filter);
	set_static_filter('reviews','rating',rating_filter);
	set_my_filter(reviewer_data,reviewer_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form62_ini();
	});

};

/**
 * @form service reviews
 * @formNo 63
 */
function form63_header_ini()
{
	var filter_fields=document.getElementById('form63_header');
	var service_filter=filter_fields.elements[0];
	var reviewer_filter=filter_fields.elements[1];
	var rating_filter=filter_fields.elements[2];
	
	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	var reviewer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(service_data,service_filter);
	set_static_filter('reviews','rating',rating_filter);
	set_my_filter(reviewer_data,reviewer_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form63_ini();
	});

};

/**
 * @form Service Cross sells
 * @formNo 64
 */
function form64_header_ini()
{
	var filter_fields=document.getElementById('form64_header');
	var service_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var cross_filter=filter_fields.elements[2];
	
	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	var cross_data="<cross_sells>" +
			"<cross_name></cross_name>" +
			"</cross_sells>";
	
	set_my_filter(service_data,service_filter);
	set_static_filter('cross_sells','type',type_filter);
	set_my_filter(cross_data,cross_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form64_ini();
	});

};

/**
 * @form Product Cross sells
 * @formNo 66
 */
function form66_header_ini()
{
	var filter_fields=document.getElementById('form66_header');
	var product_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var cross_filter=filter_fields.elements[2];
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var cross_data="<cross_sells>" +
			"<cross_name></cross_name>" +
			"</cross_sells>";
	
	set_my_filter(product_data,product_filter);
	set_static_filter('cross_sells','type',type_filter);
	set_my_filter(cross_data,cross_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form66_ini();
	});

};


/**
 * @form New Sale Order
 * @formNo 69
 */
function form69_header_ini()
{
	var fields=document.getElementById('form69_master');
	
	var customers_filter=fields.elements['customer'];
	var order_date=fields.elements['order_date'];
	var status_filter=fields.elements['status'];
	var order_num_filter=fields.elements['order_num'];
	var channel_filter=fields.elements['channel'];
	var type_filter=fields.elements['bill_type'];

	fields.elements['order_id'].value=get_new_key();
	order_num_filter.value="";
	channel_filter.value="";
	
	var save_button=fields.elements['save'];

	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form69_create_form();
	});
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form69_add_item();
	});
	
	var channel_data="<sale_channels>" +
		"<name></name>" +
		"</sale_channels>";
	set_my_value_list(channel_data,channel_filter);

	var type_data="<bill_types>" +
		"<name></name>" +
		"</bill_types>";
	set_my_value_list(type_data,type_filter);

	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter);
	
	var add_customer=document.getElementById('form69_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{
			var customers_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";			
			set_my_value_list(customers_data,customers_filter);
		});
	});
	
	var order_id=$("#form69_link").attr('data_id');
	if(order_id==null)
		order_id="";	

	if(order_id=="")
	{
		var order_num_data="<user_preferences count='1'>"+
					"<value></value>"+
					"<name exact='yes'>so_num</name>"+
					"</user_preferences>";
		set_my_value(order_num_data,order_num_filter);
	}	

	$(order_date).datepicker();
	order_date.value=get_my_date();
	set_static_filter('sale_orders','status',status_filter);
	status_filter.value='pending';
	customers_filter.value='';
}


/**
 * @form Manage Sale Orders
 * @formNo 70
 */
function form70_header_ini()
{
	var filter_fields=document.getElementById('form70_header');
	var order_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var order_data="<sale_orders>" +
			"<id></id>" +
			"</sale_orders>";
	var cust_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form70_ini();
	});

	set_my_filter(order_data,order_filter);
	set_my_filter(cust_data,name_filter);
	set_static_filter('sale_orders','status',status_filter);
};


/**
 * @form Create Bills (Aurilion)
 * @formNo 72
 */
function form72_header_ini()
{
	var fields=document.getElementById('form72_master');
	
	var customers_filter=fields.elements['customer'];
	var bill_date=fields.elements['date'];
	var bill_num=fields.elements['bill_num'];
	fields.elements['bill_id'].value=get_new_key();
	fields.elements['t_id'].value=fields.elements['bill_id'].value;
	var save_button=fields.elements['save'];

	var bill_id=$("#form72_link").attr('data_id');
	if(bill_id==null || bill_id=='')
	{	
		var bill_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>bill_num</name>"+
							"</user_preferences>";
		set_my_value(bill_num_data,bill_num);		
	}
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form72_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form72_add_product();
	});
	
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter,function () 
	{
		$(customers_filter).focus();
	});

	var add_customer=document.getElementById('form72_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{
			var customers_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";			
			set_my_value_list(customers_data,customers_filter);
		});
	});
	
	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	customers_filter.value='';
}


/**
 * @form Set Shortcuts
 * @formNo 77
 */
function form77_header_ini()
{
	var filter_fields=document.getElementById('form77_header');
	var element_filter=filter_fields.elements[0];
	var save_element=filter_fields.elements[2];
	
	$(save_element).off('click');
	$(save_element).on('click',function(e)
	{
		form77_update_form();
	});
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form77_ini();
	});
	
	var element_data="<user_preferences>" +
			"<display_name></display_name>" +
			"</user_preferences>";

	set_my_filter(element_data,element_filter);

};

/**
 * @form Promotion Emails
 * @formNo 78
 */
function form78_header_ini()
{
	var fields=document.getElementById('form78_master');
	var name_filter=fields.elements[1];
	var sms_filter=fields.elements[2];
	name_filter.value="";
	fields.elements[3].value="";
	
	sms_filter.value=get_session_var('sms_content');
	var name_data="<newsletter>" +
			"<name></name>" +
			"</newsletter>";
	set_my_value_list(name_data,name_filter);
	
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form78_ini();
	});
	
	$('textarea').autosize();
}

/**
 * @form Manage task types
 * @formNo 79
 */
function form79_header_ini()
{
	var filter_fields=document.getElementById('form79_header');
	var task_filter=filter_fields.elements[0];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form79_ini();
	});
	
	var task_data="<task_type>" +
			"<name></name>" +
			"</task_type>";

	set_my_filter(task_data,task_filter);
}

/**
 * @form De-duplication mapping
 * @formNo 80
 */
function form80_header_ini()
{
	var fields=document.getElementById('form80_master');
	
	var object_filter=fields.elements[1];
	var table_filter=fields.elements[2];
	var column_filter=fields.elements[3];
	var refs_filter=fields.elements[4];
	var ref_ids_filter=fields.elements[5];
	var mapping_button=fields.elements['mapping'];
	var merge_button=fields.elements['merging'];

	object_filter.value='';
	table_filter.value='';
	column_filter.value='';
	refs_filter.value='';
	ref_ids_filter.value='';
	
	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form80_ini();
	});
	
	$(mapping_button).off('submit');
	$(mapping_button).on("submit", function(event)
	{
		event.preventDefault();
		form80_update_form();
	});
	
	set_static_value_list('de_duplication_ref','object',object_filter);
	
	$(merge_button).off('click');
	$(merge_button).on('click',function(event)
	{
		modal51_action(object_filter.value);
	});

	$(object_filter).off('blur');
	$(object_filter).off('change');
	$(object_filter).off('select');

	$(object_filter).on('change blur select',function(event)
	{		
		var table_data="<de_duplication_ref>" +
				"<references_id></references_id>" +
				"<tablename></tablename>" +
				"<keycolumn></keycolumn>" +
				"<references_value></references_value>" +
				"<object exact='yes'>"+object_filter.value+"</object>" +
				"</de_duplication_ref>";
		fetch_requested_data('',table_data,function (tables) 
		{
			if(tables.length>0)
			{
				table_filter.value=tables[0].tablename;
				column_filter.value=tables[0].keycolumn;
				refs_filter.value=tables[0].references_value;
				ref_ids_filter.value=tables[0].references_id;
			}
			else
			{
				table_filter.value="";
				column_filter.value="";
				refs_filter.value="";
				ref_ids_filter.value="";
				object_filter.value="";
			}
		});
	});
	
	$(object_filter).focus();
}

/**
 * @form Sale leads
 * @formNo 81
 */
function form81_header_ini()
{
	var filter_fields=document.getElementById('form81_header');	
	var names_filter=filter_fields.elements[0];
	
	//setting autocompletes 
	var names_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";

	set_my_filter(names_data,names_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form81_ini();
	});	
}

/**
 * @form Scan items
 * @formNo 82
 */
function form82_header_ini()
{
	$("#form82_body").find("tr").remove();
	var fields=document.getElementById('form82_master');

	var customers_filter=fields.elements[1];
	var bill_date=fields.elements[2];
	var bill_num=fields.elements[3];	
	fields.elements[4].value=get_new_key();
	fields.elements[5].value="";
	fields.elements[6].value=fields.elements[4].value;
	var save_button=fields.elements[7];

	var bill_id=$("#form82_link").attr('data_id');
	if(bill_id==null || bill_id=='')
	{	
		var bill_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>bill_num</name>"+
							"</user_preferences>";
		set_my_value(bill_num_data,bill_num);	
	}
		
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form82_bill();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form82_add_item();
	});
	
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter);

	var add_customer=document.getElementById('form82_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{
			var customers_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";			
			set_my_value_list(customers_data,customers_filter);
		});
	});	
	
	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	customers_filter.value='';
	$(customers_filter).focus();
}


/**
 * @form Manage Subscriptions
 * @formNo 84
 */
function form84_header_ini()
{
	var filter_fields=document.getElementById('form84_header');
	var customer_filter=filter_fields.elements[0];
	var service_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(customer_data,customer_filter);

	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	set_my_filter(service_data,service_filter);

	set_static_filter('service_subscriptions','status',status_filter);

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form84_ini();
	});

};

/**
 * @form Staff geo tracking
 * @formNo 86
 */
function form86_header_ini()
{
	var filter_fields=document.getElementById('form86_master');
	var date_filter=filter_fields.elements[2];
	var name_filter=filter_fields.elements[1];
	
	var name_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	
	set_my_filter(name_data,name_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form86_ini();
	});
	
	$(date_filter).datepicker();
	date_filter.value=get_my_date();
};

/**
 * @form Manage Products
 * @formNo 87
 */
function form87_header_ini()
{
	var filter_fields=document.getElementById('form87_header');
	var name_filter=filter_fields.elements[0];
	var make_filter=filter_fields.elements[1];
	var add_filter=filter_fields.elements[2];

	$(add_filter).off('click'); 	
	$(add_filter).on('click',function () 
	{
		if(!is_read_access('form1') && !is_read_access('form155') && !is_read_access('form207') && !is_read_access('form183'))
		{
			modal112_action();
		}
		else
		{
			modal14_action();
		}
	});
	
	var make_data="<product_master>" +
			"<make></make>" +
			"</product_master>";
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	set_my_filter(make_data,make_filter);
	set_my_filter(products_data,name_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form87_ini();
	});
};

/**
 * @form Manufacturing Schedule
 * @formNo 88
 */
function form88_header_ini()
{
	var filter_fields=document.getElementById('form88_header');
	var product_filter=filter_fields.elements[0];
	var status_filter=filter_fields.elements[1];
	
	var name_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	set_my_filter(name_data,product_filter);
	set_static_filter('manufacturing_schedule','status',status_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form88_ini();
	});

};

/**
 * @form Appointments
 * @formNo 89
 */
function form89_header_ini()
{
	$("#form89_body").parent().hide();
	$("#form89_calendar").show();
	$('#form89_calendar').fullCalendar('destroy');

	///initializing calendar
	
	///calendar set
	var filter_fields=document.getElementById('form89_header');
	var customer_filter=filter_fields.elements[0];
	var assignee_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	var customer_data="<customers>" +
			"<name></name>" +
			"</customers>";
	
	set_my_filter(customer_data,customer_filter);	
	set_my_filter(staff_data,assignee_filter);
	set_static_filter('appointments','status',status_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form89_ini();
	});

	var prev_element=document.getElementById('form89_prev');
	var next_element=document.getElementById('form89_next');
	
	$(next_element).hide();
	$(prev_element).hide();	
	
};

/**
 * @form Appointments
 * @formNo 89
 */
function form89_switch_view()
{
	//form89_ini();
	$("#form89_body").parent().toggle();
	$("#form89_calendar").toggle();
}

/**
 * @form Create Bill(multiple registers)
 * @formNo 91
 */
function form91_header_ini()
{
	var fields=document.getElementById('form91_master');
	
	var customers_filter=fields.elements['customer'];
	var bill_type=fields.elements['bill_type'];
	var bill_date=fields.elements['date'];
	var bill_num=fields.elements['bill_num'];	
	var order_num=fields.elements['order_num'];
	var order_id=fields.elements['order_id'];
	var channel=fields.elements['channel'];
	var share_button=fields.elements['share'];
	var unbilled_filter=fields.elements['unbilled'];
	customers_filter.value='';	
	channel.value="";
	order_id.value="";
	order_num.value="";	
	fields.elements['bill_id'].value=get_new_key();
	fields.elements['t_id'].value=fields.elements['bill_id'].value;
	var save_button=fields.elements['save'];
	var tin_filter=fields.elements['customer_tin'];
	var unbilled_button=fields.elements['unbilled_button'];
	
	$(share_button).hide();

	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form91_create_form();
	});
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) 
	{
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form91_add_item();
	});
	
	var channel_data="<sale_channels>"+
					"<name></name>"+
					"</sale_channels>";
	set_my_value_list(channel_data,channel);	

	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list_func(customers_data,customers_filter,function()
	{
		$(customers_filter).focus();
	});

	var add_customer=document.getElementById('form91_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{
			var customers_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";			
			set_my_value_list(customers_data,customers_filter);
		});
	});	

	var type_data="<bill_types>" +
		"<name></name>" +
		"<status exact='yes'>active</status>" +
		"</bill_types>";
	set_my_value_list(type_data,bill_type);
	
	var bill_id=$("#form91_link").attr('data_id');
	if(bill_id==null || bill_id=='')
	{	
		get_single_column_data(function (bill_types) 
		{
			if(bill_types.length>0)
			{
				bill_type.value=bill_types[0];
				var bill_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>"+bill_type.value+"_bill_num</name>"+
							"</user_preferences>";
				set_my_value(bill_num_data,bill_num);	
			}
			else 
			{
				var bill_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>bill_num</name>"+
							"</user_preferences>";
				set_my_value(bill_num_data,bill_num);	
			}
		},type_data);
	}

	$(bill_type).off('blur');
	$(bill_type).on('blur',function (e) 
	{
		var bill_num_data="<user_preferences count='1'>"+
						"<value></value>"+
						"<name exact='yes'>"+bill_type.value+"_bill_num</name>"+
						"</user_preferences>";
		set_my_value(bill_num_data,bill_num);	
	});	
	
	$(customers_filter).off('blur');
	$(customers_filter).on('blur',function(e)
	{
		var address_data="<customers>" +
				"<address></address>" +
				"<city></city>" +
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		fetch_requested_data('',address_data,function(addresses)
		{
			var address_string="";
			if(addresses.length>0)
			{
				address_string+=addresses[0].address+", "+addresses[0].city;
				document.getElementById('form91_customer_info').innerHTML="Address<br>"+address_string;
			}
			else
			{
				document.getElementById('form91_customer_info').innerHTML="";
			}
		});
		var tin_data="<attributes>" +
				"<value></value>" +
				"<type exact='yes'>customer</type>"+
				"<attribute array='yes'>--VAT#--CST#--</attribute>"+ 
				"<name exact='yes'>"+customers_filter.value+"</name>" +
				"</attributes>";
		set_my_value(tin_data,tin_filter);
		
		var unbilled_data="<unbilled_sale_items>" +
				"<id></id>" +
				"<bill_status exact='yes'>pending</bill_status>"+
				"<customer exact='yes'>"+customers_filter.value+"</customer>" +
				"</unbilled_sale_items>";
		get_single_column_data(function(unbilleds)
		{
			unbilled_filter.value=unbilleds.length;
			if(unbilleds.length>0)
				$(unbilled_button).show();
		},unbilled_data);
	});


	$(unbilled_button).hide();
	
	
	$(unbilled_button).off('click');
	$(unbilled_button).on('click',function(e)
	{
		var unbilled_data="<unbilled_sale_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<item_desc></item_desc>" +
				"<batch></batch>" +
				"<quantity></quantity>" +
				"<customer exact='yes'>"+customers_filter.value+"</customer>" +
				"<mrp></mrp>"+
				"<unit_price></unit_price>"+
				"<amount></amount>"+
				"<tax></tax>"+
				"<total></total>"+
				"<storage></storage>"+
				"<bill_status exact='yes'>pending</bill_status>"+
				"</unbilled_sale_items>";
				
		fetch_requested_data('form91',unbilled_data,function(ub_items)
		{
			ub_items.forEach(function(ub_item)
			{
				///////////////////////////////////////////////////////////
				if(is_create_access('form91'))
				{
					var rowsHTML="";
					var id=ub_item.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form91_"+id+"' autocomplete='off'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<input type='text' required value='"+ub_item.item_name+"' readonly='readonly' form='form91_"+id+"'>";
							rowsHTML+="<br><textarea form='form91_"+id+"' value='"+ub_item.item_desc+"' readonly='readonly' class='dblclick_editable'></textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' required form='form91_"+id+"' value='"+ub_item.batch+"' readonly='readonly'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' min='0' required readonly='readonly' value='"+ub_item.quantity+"' form='form91_"+id+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Rate'>";
							rowsHTML+="MRP: <input type='number' required readonly='readonly' form='form91_"+id+"' value='"+ub_item.mrp+"' step='any'>";
							rowsHTML+="<br>Price: <input type='number' required readonly='readonly' form='form91_"+id+"' value='"+ub_item.unit_price+"' step='any'>";
							rowsHTML+="<br>Freight: <input type='number' step='any' readonly='readonly' form='form91_"+id+"' value='0'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Total'>";
							rowsHTML+="Amount: <input type='number' required readonly='readonly' form='form91_"+id+"' step='any' value='"+ub_item.amount+"'>";
							rowsHTML+="<br>Tax: <input type='number' required readonly='readonly' form='form91_"+id+"' step='any' value='"+ub_item.tax+"'>";
							rowsHTML+="<br>Total: <input type='number' step='any' readonly='readonly' required form='form91_"+id+"' value='"+ub_item.total+"'>";	
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form91_"+id+"' name='storage' value='"+ub_item.storage+"'>";
							rowsHTML+="<input type='hidden' form='form91_"+id+"' step='.01' name='tax_unit'>";
							rowsHTML+="<input type='hidden' form='form91_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form91_"+id+"' id='save_form91_"+id+"' >";
							rowsHTML+="<input type='button' class='delete_icon' form='form91_"+id+"' id='delete_form91_"+id+"' onclick='$(this).parent().parent().remove();form91_get_totals();'>";
							rowsHTML+="<input type='hidden' form='form91_"+id+"' name='freight_unit' value='0'>";
							rowsHTML+="<input type='submit' class='submit_hidden' form='form91_"+id+"'>";
							rowsHTML+="<input type='hidden' form='form91_"+id+"' name='unbilled' value='yes'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form91_body').prepend(rowsHTML);
					
					var fields=document.getElementById("form91_"+id);
					var save_button=fields.elements[13];
					
					$(save_button).on("click", function(event)
					{
						event.preventDefault();
						form91_create_item(fields);
					});
			
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form91_add_item();
					});

					form91_get_totals();					
				}
				else
				{
					$("#modal2_link").click();
				}
				/////////////////////////////////////////////////////////////
			});
		});
		$(unbilled_button).hide();
	});

	$(bill_date).datepicker();
	bill_date.value=get_my_date();	
}


/**
 * @form Manage Loans
 * @formNo 93
 */
function form93_header_ini()
{
	var filter_fields=document.getElementById('form93_header');
	var account_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var account_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	
	set_my_filter(account_data,account_filter);
	set_static_filter('loans','type',type_filter);
	set_static_filter('loans','status',status_filter);
	
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form93_ini();
	});

};


/**
 * @form Selective Sync
 * @formNo 100
 */
function form100_header_ini()
{
	var filter_fields=document.getElementById('form100_header');
	var name_filter=filter_fields.elements[0];
	var save_element=filter_fields.elements[1];
	
	$(save_element).off('click');
	$(save_element).on('click',function(e)
	{
		form100_update_form();
	});
	
	var name_data="<user_preferences>" +
			"<display_name></display_name>" +
			"<value exact='yes'>checked</value>" +
			"</user_preferences>";
	
	set_my_filter(name_data,name_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form100_ini();
	});

};

/**
 * @form Manage Projects
 * @formNo 101
 */
function form101_header_ini()
{
	var filter_fields=document.getElementById('form101_header');
	var name_filter=filter_fields.elements[0];
	var status_filter=filter_fields.elements[1];
	
	var name_data="<projects>" +
			"<name></name>" +
			"</projects>";
	
	set_my_filter(name_data,name_filter);
	set_static_filter('projects','status',status_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form101_ini();
	});
};

/**
 * @form Assign project team
 * @formNo 102
 */
function form102_header_ini()
{
	var fields=document.getElementById('form102_master');

	var code_filter=fields.elements[1];
	var id_filter=fields.elements[2];
	
	var name_data="<projects>" +
			"<name></name>" +
			"</projects>";
	
	set_my_value_list(name_data,code_filter);

	id_filter.value="";
	code_filter.value="";
	
	$(code_filter).off('blur');
	$(code_filter).on('blur',function () 
	{
		var id_data="<projects>"+
					"<id></id>"+
					"<name exact='yes'>"+code_filter.value+"</name>"+					
					"</projects>";
		set_my_value(id_data,id_filter);
	});
}

/**
 * @form Create project phases
 * @formNo 103
 */
function form103_header_ini()
{
	var fields=document.getElementById('form103_master');

	var code_filter=fields.elements[1];
	var id_filter=fields.elements[2];
	
	var name_data="<projects>" +
			"<name></name>" +
			"</projects>";
	
	set_my_value_list(name_data,code_filter);

	id_filter.value="";
	code_filter.value="";
	
	$(code_filter).off('blur');
	$(code_filter).on('blur',function () 
	{
		var id_data="<projects>"+
					"<id></id>"+
					"<name exact='yes'>"+code_filter.value+"</name>"+					
					"</projects>";
		set_my_value(id_data,id_filter);
	});
}


/**
 * @form Manage Sale Orders (multi-register)
 * @formNo 108
 */
function form108_header_ini()
{
	var filter_fields=document.getElementById('form108_header');
	var channel_filter=filter_fields.elements[0];
	var order_filter=filter_fields.elements[1];
	var name_filter=filter_fields.elements[2];
	var date_filter=filter_fields.elements[3];
	var status_filter=filter_fields.elements[4];
	
	var update_order_button=filter_fields.elements['update_orders'];
	$(update_order_button).off('click');	
	$(update_order_button).on('click',function () 
	{
		//$("#modal61_link").click();
		worker_update_orders_status();
	});

	var import_button=filter_fields.elements['import'];
	$(import_button).off('click');	
	$(import_button).on('click',function () 
	{
		modal138_action();
	});

	var channel_data="<sale_channels>" +
			"<name></name>" +
			"</sale_channels>";
	set_my_filter(channel_data,channel_filter);

	var order_data="<sale_orders>" +
			"<order_num></order_num>" +
			"</sale_orders>";
	set_my_filter(order_data,order_filter);
	
	var cust_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(cust_data,name_filter);

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form108_ini();
	});

	$(date_filter).datepicker();
	set_static_filter('sale_orders','status',status_filter);
};

/**
 * @form Asset Attributes
 * @formNo 109
 */
function form109_header_ini()
{
	var filter_fields=document.getElementById('form109_header');
	var asset_filter=filter_fields.elements[0];
	var attribute_filter=filter_fields.elements[1];
	
	var asset_data="<assets>" +
			"<name></name>" +
			"</assets>";
	var attribute_data="<attributes>" +
			"<attribute></attribute>" +
			"<type exact='yes'>asset</type>" +
			"</attributes>";
	
	set_my_filter(asset_data,asset_filter);
	set_my_filter(attribute_data,attribute_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form109_ini();
	});

};


/**
 * @form Add Unbilled Items
 * @formNo 112
 */
function form112_header_ini()
{
	var fields=document.getElementById('form112_master');
	
	var customers_filter=fields.elements[1];
	var sale_date=fields.elements[2];
	var save_button=fields.elements[3];
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form112_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form112_add_item();
	});

	var add_customer=document.getElementById('form112_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{	
			var customers_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";
			set_my_value_list(customers_data,customers_filter);
		});
	});

	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter);
	
	$(sale_date).datepicker();
	$(sale_date).val(get_my_date());
	customers_filter.value='';
	
	$(customers_filter).focus();
	
	$('#form112_body').html("");
}

/**
 * @form Manage Unbilled Items
 * @formNo 113
 */
function form113_header_ini()
{
	var filter_fields=document.getElementById('form113_header');
	var customer_filter=filter_fields.elements[0];
	var item_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var cust_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	var item_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form113_ini();
	});

	set_my_filter(cust_data,customer_filter);
	set_my_filter(item_data,item_filter);
	set_static_filter('unbilled_sale_items','bill_status',status_filter);
};

/**
 * @form Add Purchase challan
 * @formNo 114
 */
function form114_header_ini()
{
	var fields=document.getElementById('form114_master');
	
	var supplier_filter=fields.elements[1];
	var purchase_date=fields.elements[2];
	var save_button=fields.elements[3];
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form114_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form114_add_item();
	});

	var add_supplier=document.getElementById('form114_add_supplier');
	$(add_supplier).off('click');
	$(add_supplier).on('click',function()
	{
		modal13_action(function()
		{	
			var supplier_data="<suppliers>" +
				"<acc_name></acc_name>" +
				"</suppliers>";
			set_my_value_list(supplier_data,supplier_filter);
		});
	});

	var supplier_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	set_my_value_list(supplier_data,supplier_filter,function () 
	{
		$(supplier_filter).focus();
	});
	
	$(purchase_date).datepicker();
	$(purchase_date).val(get_my_date());
	supplier_filter.value='';
	
	$('#form114_body').html("");
}

/**
 * @form Manage purchase challan
 * @formNo 115
 */
function form115_header_ini()
{
	var filter_fields=document.getElementById('form115_header');
	var supplier_filter=filter_fields.elements[0];
	var item_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var supplier_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	var item_data="<product_master>" +
		"<name></name>" +
		"</product_master>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form113_ini();
	});

	set_my_filter(supplier_data,supplier_filter);
	set_my_filter(item_data,item_filter);
	set_static_filter('unbilled_purchase_items','bill_status',status_filter);
};


/**
 * @form Manage Loyalty Programs
 * @formNo 116
 */
function form116_header_ini()
{
	var filter_fields=document.getElementById('form116_header');
	var name_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var tier_filter=filter_fields.elements[2];
	var status_filter=filter_fields.elements[3];
	
	var name_data="<loyalty_programs>" +
			"<name></name>" +
			"</loyalty_programs>";
	var tier_data="<loyalty_programs>" +
			"<tier></tier>" +
			"</loyalty_programs>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form116_ini();
	});

	set_my_filter(name_data,name_filter);
	set_my_filter(tier_data,tier_filter);
	set_static_filter('loyalty_programs','type',type_filter);
	set_static_filter('loyalty_programs','status',status_filter);
};

/**
 * @form Create Bill(loyalty)
 * @formNo 118
 */
function form118_header_ini()
{
	var fields=document.getElementById('form118_master');
	
	var customers_filter=fields.elements[1];
	var bill_date=fields.elements[2];
	var bill_num=fields.elements[3];
	fields.elements[4].value=get_new_key();
	fields.elements[5].value="";
	fields.elements[6].value=fields.elements[4].value;
	var loyalty_program=fields.elements[7];
	loyalty_program.value='';
	var loyalty_points=fields.elements[8];
	loyalty_program.value='';
	var redeem_check=fields.elements[9];
	var save_button=fields.elements[10];
	
	var bill_id=$("#form118_link").attr('data_id');
	if(bill_id==null || bill_id=='')
	{	
		var bill_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>bill_num</name>"+
							"</user_preferences>";
		set_my_value(bill_num_data,bill_num);	
	}
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form118_create_form();
	});
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});
	
	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form118_add_item();
	});
	
	var loyalty_data="<loyalty_programs>"+
			"<name></name>"+
			"<status exact='yes'>active</status>"+
			"</loyalty_programs>";
	set_my_value_list(loyalty_data,loyalty_program);
	
	$(loyalty_program).off('blur');
	$(loyalty_program).on('blur',function(e)
	{
		var points_data="<loyalty_points>"+
				"<points></points>"+
				"<program_name exact='yes'>"+loyalty_program.value+"</program_name>"+
				"<customer exact='yes'>"+customers_filter.value+"</customer>"+
				"</loyalty_points>";
		get_single_column_data(function(points)
		{
			var points_value=0;
			for(var i=0;i<points.length;i++)
			{
				points_value+=parseFloat(points[i]);
			}
			loyalty_points.value=points_value;	
		},points_data);
	});	

	var add_customer=document.getElementById('form118_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{	
				var customers_data="<customers>" +
						"<acc_name></acc_name>" +
						"</customers>";
				set_my_value_list(customers_data,customers_filter);
		});
	});

	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter);

	$(customers_filter).off('blur');
	$(customers_filter).on('blur',function(e)
	{
		var address_data="<customers>" +
				"<address></address>" +
				"<city></city>" +
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		fetch_requested_data('',address_data,function(addresses)
		{
			var address_string="";
			if(addresses.length>0)
			{
				address_string+=addresses[0].address+", "+addresses[0].city;
				document.getElementById('form118_customer_info').innerHTML="Address<br>"+address_string;
			}
			else
			{
				document.getElementById('form118_customer_info').innerHTML="";
			}
		});
		
		var loyalty_data="<loyalty_programs count='1'>"+
			"<name></name>"+
			"<status exact='yes'>active</status>"+
			"</loyalty_programs>";
		get_single_column_data(function(programs)
		{
			if(programs.length>0)
			{
				loyalty_program.value=programs[0];
				var points_data="<loyalty_points>"+
					"<points></points>"+
					"<program_name exact='yes'>"+loyalty_program.value+"</program_name>"+
					"<customer exact='yes'>"+customers_filter.value+"</customer>"+
					"</loyalty_points>";
				get_single_column_data(function(points)
				{
					var points_value=0;
					for(var i=0;i<points.length;i++)
					{
						points_value+=parseFloat(points[i]);
					}	
					loyalty_points.value=points_value;	
				},points_data);
			}
		},loyalty_data);
	});

	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	customers_filter.value='';
	$(customers_filter).focus();
}


/**
 * @form Create Bill(multiple registers, unbilled items)
 * @formNo 119
 */
function form119_header_ini()
{
	var fields=document.getElementById('form119_master');
	var bill_id=$("#form119_link").attr('data_id');
	
	var customers_filter=fields.elements[1];
	var bill_type=fields.elements[2];
	var bill_date=fields.elements[3];
	var bill_num=fields.elements[4];
	fields.elements[5].value=0;
	fields.elements[6].value=get_new_key();
	fields.elements[7].value="";
	fields.elements[8].value=fields.elements[6].value;
	var unbilled_button=fields.elements[9];
	var save_button=fields.elements[10];
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form119_create_form();
	});
	
	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form119_add_item();
	});

	var add_customer=document.getElementById('form119_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{	
				var customers_data="<customers>" +
						"<acc_name></acc_name>" +
						"</customers>";
				set_my_value_list(customers_data,customers_filter);
		});
	});
	
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter);

	var type_data="<bill_types>" +
		"<name></name>" +
		"<status exact='yes'>active</status>" +
		"</bill_types>";
	set_my_value_list(type_data,bill_type);

	if(bill_id==null || bill_id=='')
	{	
		get_single_column_data(function (bill_types) 
		{
			if(bill_types.length>0)
			{
				bill_type.value=bill_types[0];
				var bill_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>"+bill_type.value+"_bill_num</name>"+
							"</user_preferences>";
				set_my_value(bill_num_data,bill_num);	
			}
			else 
			{
				var bill_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>bill_num</name>"+
							"</user_preferences>";
				set_my_value(bill_num_data,bill_num);	
			}
		},type_data);
	}
	
	$(bill_type).off('blur');
	$(bill_type).on('blur',function (e) 
	{
		var bill_num_data="<user_preferences count='1'>"+
						"<value></value>"+
						"<name exact='yes'>"+bill_type.value+"_bill_num</name>"+
						"</user_preferences>";
		set_my_value(bill_num_data,bill_num);	
	});	
	
	$(unbilled_button).hide();
	
	$(customers_filter).off('blur');
	$(customers_filter).on('blur',function(e)
	{
		var attributes_data="<attributes>" +
				"<value></value>" +
				"<type exact='yes'>customer</type>" +
				"<attribute array='yes'>--DL No--TIN--</attribute>" +
				"<name exact='yes'>"+customers_filter.value+"</name>" +
				"</attributes>";
		fetch_requested_data('',attributes_data,function(attributes)
		{
			var attributes_string="";
			for(var i in attributes)
			{
				attributes_string+=attributes[i].attribute+": "+attributes[i].value+"<br>";
			}
			document.getElementById('form119_customer_info').innerHTML=attributes_string;
		});
		
		var unbilled_data="<unbilled_sale_items>" +
				"<id></id>" +
				"<customer exact='yes'>"+customers_filter.value+"</customer>" +
				"</unbilled_sale_items>";
		get_single_column_data(function(customers)
		{
			fields.elements[5].value=customers.length;
			if(customers.length>0)
				$(unbilled_button).show();
		},unbilled_data);
	});
	
	$(unbilled_button).off('click');
	$(unbilled_button).on('click',function(e)
	{
		var unbilled_data="<unbilled_sale_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<batch></batch>" +
				"<quantity></quantity>" +
				"<customer exact='yes'>"+customers_filter.value+"</customer>" +
				"</unbilled_sale_items>";
		fetch_requested_data('form119',unbilled_data,function(unbilled_items)
		{
			var ub_items=new Array();
			for(var i=0; i<unbilled_items.length;i++)
			{
				var new_obj=new Object();
				new_obj.item_name=unbilled_items[i].item_name;
				new_obj.batch=unbilled_items[i].batch;
				new_obj.quantity=parseFloat(unbilled_items[i].quantity);
				for(var j=i+1;j<unbilled_items.length;j++)
				{
					if(unbilled_items[j].item_name==new_obj.item_name && order_items[j].batch==new_obj.batch)
					{
						new_obj.quantity+=parseFloat(unbilled_items[j].quantity);
						unbilled_items.splice(j,1);
						j-=1;
					}
				}
				ub_items.push(new_obj);
			}
			
			if(is_create_access('form119'))
			{
				var bill_type_value=bill_type.value;
				ub_items.forEach(function(ub_item)
				{
					///////////////////////////////////////////////////////////
					var rowsHTML="";
					var id=get_new_key();
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form119_"+id+"'></form>";
						rowsHTML+="<td data-th='Product Name'>";
							rowsHTML+="<label id='form119_product_make_"+id+"'></label>";
							rowsHTML+="<br><v2></v2><input type='text' required readonly='readonly' form='form119_"+id+"' value='"+ub_item.item_name+"' name='product_name'>";
							rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' onclick='modal14_action();'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' required form='form119_"+id+"' readonly='readonly' name='batch' value='"+ub_item.batch+"'>";
							rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' onclick='modal22_action();'>";
							rowsHTML+="<br><v2>Expiry: </v2><label id='form119_exp_"+id+"'></label>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<v1>Bought: </v1><input type='number' min='0' required form='form119_"+id+"' step='any' name='squantity' value='"+ub_item.quantity+"'>";
							rowsHTML+="<br><v2>Free: </v2><input type='number' min='0' value='0' required form='form119_"+id+"' step='any' name='fquantity'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="<v1>Sale: </v1>Rs. <input type='number' required min='0' readonly='readonly' form='form119_"+id+"' step='any' name='unit_price'>";
							rowsHTML+="<br><v2>MRP: </v2>Rs. <input type='number' min='0' readonly='readonly' form='form119_"+id+"' step='any' name='mrp'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Total'>";
							rowsHTML+="<v1>Amount: </v1>Rs. <input type='number' required min='0' form='form119_"+id+"' readonly='readonly' step='any' name='amount'>";
							rowsHTML+="<input type='hidden' value='0' form='form119_"+id+"' readonly='readonly' name='discount'>";
							rowsHTML+="<br><v2>Tax: </v2>Rs. <input type='number' required min='0' value='0' form='form119_"+id+"' readonly='readonly' step='any' name='tax'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form119_"+id+"' name='total'>";
							rowsHTML+="<input type='hidden' form='form119_"+id+"' name='offer'>";
							rowsHTML+="<input type='hidden' form='form119_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form119_"+id+"' id='save_form119_"+id+"' >";
							rowsHTML+="<input type='button' class='delete_icon' form='form119_"+id+"' id='delete_form119_"+id+"' onclick='$(this).parent().parent().remove();'>";
							rowsHTML+="<input type='hidden' form='form119_"+id+"' name='free_product'>";
							rowsHTML+="<input type='hidden' form='form119_"+id+"' name='free_product_quantity'>";
							rowsHTML+="<input type='hidden' title='unbilled_item_id' form='form119_"+id+"' value='yes'>";
							rowsHTML+="<input type='submit' class='submit_hidden' form='form119_"+id+"'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form119_body').prepend(rowsHTML);
					
					var fields=document.getElementById("form119_"+id);
					var name_filter=fields.elements[0];
					var batch_filter=fields.elements[1];
					var squantity_filter=fields.elements[2];
					var fquantity_filter=fields.elements[3];
					var price_filter=fields.elements[4];
					var mrp_filter=fields.elements[5];
					var amount_filter=fields.elements[6];
					var discount_filter=fields.elements[7];
					var tax_filter=fields.elements[8];
					var total_filter=fields.elements[9];
					var offer_filter=fields.elements[10];
					var id_filter=fields.elements[11];
					var save_button=fields.elements[12];
					var free_product_filter=fields.elements[14];
					var free_product_quantity=fields.elements[15];
					
					$(name_filter).focus();
					
					$(save_button).on("click", function(event)
					{
						event.preventDefault();
						form119_create_item(fields);
					});

					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form119_add_item();
					});

					
					var make_data="<product_master>" +
							"<make></make>" +
							"<name exact='yes'>"+name_filter.value+"</name>" +
							"</product_master>";
					get_single_column_data(function(data)
					{
						if(data.length>0)
						{
							document.getElementById('form119_product_make_'+id).innerHTML=data[0]+":";
						}
					},make_data);
					
					var exp_data="<product_instances>" +
							"<expiry></expiry>" +
							"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
							"<batch exact='yes'>"+batch_filter.value+"</batch>" +
							"</product_instances>";
					get_single_column_data(function(data)
					{
						if(data.length>0)
						{
							document.getElementById('form119_exp_'+id).innerHTML=get_my_past_date(data[0]);
						}
					},exp_data);

					var price_data="";
					if(bill_type_value=='undefined' || bill_type_value=='')
					{
						price_data="<product_instances count='1'>" +
								"<sale_price></sale_price>" +
								"<batch exact='yes'>"+batch_filter.value+"</batch>" +
								"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
								"</product_instances>";
					}
					else
					{
						price_data="<sale_prices count='1'>" +
								"<sale_price></sale_price>" +
								"<batch exact='yes'>"+batch_filter.value+"</batch>" +
								"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
								"<billing_type>"+bill_type_value+"</billing_type>" +
								"</sale_prices>";
					}

					get_single_column_data(function(data)
					{
						if(data.length>0)
						{
							price_filter.value=data[0];
							local_quantity_blur();
						}
					},price_data);

					$(squantity_filter).on('blur',function(event)
					{
						local_quantity_blur();
					});	
					
					var mrp_data="<product_instances count='1'>" +
							"<mrp></mrp>" +
							"<batch exact='yes'>"+batch_filter.value+"</batch>" +
							"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
							"</product_instances>";
					set_my_value(mrp_data,mrp_filter);
					
					get_inventory(name_filter.value,batch_filter.value,function(quantity)
					{
						$(squantity_filter).attr('placeholder',quantity);
					});
					
					function local_quantity_blur()
					{
						var amount=parseFloat(squantity_filter.value)*parseFloat(price_filter.value);
						amount_filter.value=amount;
						var offer_data="<offers>" +
								"<offer_type>product</offer_type>" +
								"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
								"<batch array='yes'>"+batch_filter.value+"--all</batch>" +
								"<criteria_type></criteria_type>" +
								"<criteria_amount></criteria_amount>" +
								"<criteria_quantity></criteria_quantity>" +
								"<result_type></result_type>" +
								"<discount_percent></discount_percent>" +
								"<discount_amount></discount_amount>" +
								"<quantity_add_percent></quantity_add_percent>" +
								"<quantity_add_amount></quantity_add_amount>" +
								"<free_product_name></free_product_name>" +
								"<free_product_quantity></free_product_quantity>" +
								"<offer_detail></offer_detail>" +
								"<status array='yes'>--active--extended--</status>" +
								"</offers>";
						fetch_requested_data('',offer_data,function(offers)
						{
							offers.sort(function(a,b)
							{
								if(a.criteria_amount<b.criteria_amount)
								{	return 1;}
								else if(a.criteria_quantity<b.criteria_quantity)
								{	return 1;}
								else 
								{	return -1;}
							});
									
							for(var i in offers)
							{
								offer_filter.value=offers[i].offer_detail;
								if(offers[i].criteria_type=='min quantity crossed' && parseFloat(offers[i].criteria_quantity)<=parseFloat(squantity_filter.value))
								{
									if(offers[i].result_type=='discount')
									{
										if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
										{
											discount_filter.value=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
										}
										else 
										{
											discount_filter.value=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(squantity_filter.value)/parseFloat(offers[i].criteria_quantity)));
										}
									}
									else if(offers[i].result_type=='quantity addition')
									{
										if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
										{
											fquantity_filter.value=parseFloat(squantity_filter.value)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
										}
										else 
										{
											fquantity_filter.value=parseFloat(squantity_filter.value)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(squantity_filter.value)/parseFloat(offers[i].criteria_quantity))));
										}
									}
									else if(offers[i].result_type=='product free')
									{
										free_product_filter.value=offers[i].free_product_name;
										free_product_quantity.value=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(squantity_filter.value)/parseFloat(offers[i].criteria_quantity)));
									}
									break;
								}
								else if(offers[i].criteria_type=='min amount crossed' && offers[i].criteria_amount<=amount)
								{
									if(offers[i].result_type=='discount')
									{
										if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
										{
											discount_filter.value=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
										}
										else 
										{
											discount_filter.value=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount)));
										}
									}
									else if(offers[i].result_type=='quantity addition')
									{
										if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
										{
											fquantity_filter.value=parseFloat(squantity_filter.value)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
										}
										else 
										{
											fquantity_filter.value=parseFloat(squantity_filter.value)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount))));
										}
									}
									else if(offers[i].result_type=='product free')
									{
										free_product_filter.value=offers[i].free_product_name;
										free_product_quantity.value=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount)));
									}
									break;
								}
							}
							
							var tax_data="<product_master>" +
									"<name exact='yes'>"+name_filter.value+"</name>" +
									"<tax></tax>" +
									"</product_master>";
							fetch_requested_data('',tax_data,function(taxes)
							{
								taxes.forEach(function(tax)
								{
									tax_filter.value=parseFloat((parseFloat(tax.tax)*(amount-parseFloat(discount_filter.value)))/100);
								});
								
								total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value));
							});
						});
					};
				
					/////////////////////////////////////////////////////////////
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		});
		$(unbilled_button).hide();
	});
	
	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	customers_filter.value='';
	$(customers_filter).focus();
}

/**
 * @form Manage Loyalty Customers
 * @formNo 120
 */
function form120_header_ini()
{
	var filter_fields=document.getElementById('form120_header');
	var name_filter=filter_fields.elements[0];
	var customer_filter=filter_fields.elements[1];
	var tier_filter=filter_fields.elements[2];
	
	var name_data="<loyalty_programs>" +
			"<name></name>" +
			"</loyalty_programs>";
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	var tier_data="<loyalty_programs>" +
			"<tier></tier>" +
			"</loyalty_programs>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form120_ini();
	});

	set_my_filter(name_data,name_filter);
	set_my_filter(customer_data,customer_filter);
	set_my_filter(tier_data,tier_filter);
};

/**
 * @form Adjust Loyalty Points
 * @formNo 121
 */
function form121_header_ini()
{
	var filter_fields=document.getElementById('form121_header');
	var name_filter=filter_fields.elements[0];
	var customer_filter=filter_fields.elements[1];
	
	var name_data="<loyalty_programs>" +
			"<name></name>" +
			"</loyalty_programs>";
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form121_ini();
	});

	set_my_filter(name_data,name_filter);
	set_my_filter(customer_data,customer_filter);
};


/**
 * @form Enter Supplier bills(unbilled items)
 * @formNo 122
 */
function form122_header_ini()
{
	var fields=document.getElementById('form122_master');
	
	var supplier_filter=fields.elements['supplier'];
	var order_num_filter=fields.elements['po_num'];
	var bill_num_filter=fields.elements['bill_num'];
	var unbilled_filter=fields.elements['unbilled'];
	var order_id_filter=fields.elements['order_id'];
	var bill_id_filter=fields.elements['bill_id'];
	var t_id_filter=fields.elements['t_id'];
	var bill_date=fields.elements['bill_date'];
	var entry_date=fields.elements['entry_date'];
	var unbilled_button=fields.elements['unbilled_button'];
	var save_button=fields.elements['save'];
	var share_button=fields.elements['share'];
	var cst_filter=fields.elements['cst'];
	bill_num_filter.value="";
	order_num_filter.value="";
	order_id_filter.value="";
	unbilled_filter.value="";
	bill_id_filter.value=get_new_key();
	t_id_filter.value=bill_id_filter.value;
	cst_filter.checked=false;
	
	$(share_button).off('click');
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form122_create_form();
	});
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form122_add_item();
	});
	
	var add_supplier=document.getElementById('form122_add_supplier');
	$(add_supplier).off('click');
	$(add_supplier).on('click',function()
	{
		modal13_action(function()
		{	
			var suppliers_data="<suppliers>" +
				"<acc_name></acc_name>" +
				"</suppliers>";
			set_my_value_list(suppliers_data,supplier_filter);
		});
	});

	var suppliers_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	
	set_my_value_list(suppliers_data,supplier_filter);
	
	$(unbilled_button).hide();
	
	$(supplier_filter).off('blur');
	$(supplier_filter).on('blur',function(e)
	{
		var unbilled_data="<unbilled_purchase_items>" +
				"<id></id>" +
				"<bill_status exact='yes'>pending</bill_status>"+
				"<supplier exact='yes'>"+supplier_filter.value+"</supplier>" +
				"</unbilled_purchase_items>";
		get_single_column_data(function(suppliers)
		{
			unbilled_filter.value=suppliers.length;
			if(suppliers.length>0)
				$(unbilled_button).show();
		},unbilled_data);
	});
	
	$(unbilled_button).off('click');
	$(unbilled_button).on('click',function(e)
	{
		var unbilled_data="<unbilled_purchase_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<item_desc></item_desc>" +
				"<batch></batch>" +
				"<quantity></quantity>" +
				"<supplier exact='yes'>"+supplier_filter.value+"</supplier>" +
				"<mrp></mrp>"+
				"<unit_price></unit_price>"+
				"<amount></amount>"+
				"<tax></tax>"+
				"<total></total>"+
				"<storage></storage>"+
				"<bill_status exact='yes'>pending</bill_status>"+
				"</unbilled_purchase_items>";
				
		fetch_requested_data('form122',unbilled_data,function(ub_items)
		{
			ub_items.forEach(function(ub_item)
			{
				///////////////////////////////////////////////////////////
				if(is_create_access('form122'))
				{
					var id=get_new_key();
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form122_"+id+"' autocomplete='off'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<input type='hidden' form='form122_"+id+"'>";
							rowsHTML+="<b>SKU</b>: <input type='text' form='form122_"+id+"' value='"+ub_item.item_name+"' required readonly='readonly'>";
							rowsHTML+="<br><b>Name</b>: <input type='text' readonly='readonly' form='form122_"+id+"' value='"+ub_item.item_desc+"' readonly='readonly'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' form='form122_"+id+"' value='"+ub_item.batch+"' required readonly='readonly'>";
							rowsHTML+="<br><b>Quantity</b>: <input type='number' form='form122_"+id+"' value='"+ub_item.quantity+"' required step='any' readonly='readonly'>";
							rowsHTML+="<br><b>MRP</b>: <input type='number' form='form122_"+id+"' value='"+ub_item.mrp+"' required step='any' readonly='readonly'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Bill Price'>";
							rowsHTML+="<b>Unit Price</b>: Rs. <input type='number' form='form122_"+id+"' value='"+ub_item.unit_price+"' required step='any' readonly='readonly'>";
							rowsHTML+="<br><b>Amount</b>: Rs. <input type='number' readonly='readonly' form='form122_"+id+"' value='"+ub_item.amount+"' required step='any' readonly='readonly'>";
							rowsHTML+="<br><b>Tax</b>: Rs. <input type='number' readonly='readonly' form='form122_"+id+"' value='"+ub_item.tax+"' required step='any' readonly='readonly'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='PO Price'>";
							rowsHTML+="Unit Price: Rs. <input type='number' form='form122_"+id+"' value='"+ub_item.unit_price+"' required step='any' readonly='readonly'>";
							rowsHTML+="<br>Amount: Rs. <input type='number' readonly='readonly' form='form122_"+id+"' value='"+ub_item.amount+"' required step='any' readonly='readonly'>";
							rowsHTML+="<br>Tax: Rs. <input type='number' readonly='readonly' form='form122_"+id+"' value='"+ub_item.tax+"' required step='any' readonly='readonly'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Check'>";
							rowsHTML+="<input type='text' form='form122_"+id+"' value='accepted' readonly='readonly'> <img src='./images/green_circle.png' class='green_circle'>";
							rowsHTML+="<br><b>Comments</b>: <textarea form='form122_"+id+"' readonly='readonly'>From challan</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form122_"+id+"' value='"+ub_item.storage+"'>";
							rowsHTML+="<input type='hidden' form='form122_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form122_"+id+"' id='save_form122_"+id+"' >";	
							rowsHTML+="<input type='button' class='delete_icon' form='form122_"+id+"' id='delete_form122_"+id+"' onclick='$(this).parent().parent().remove();'>";
							rowsHTML+="<input type='submit' class='submit_hidden' form='form122_"+id+"'>";
							rowsHTML+="<input type='hidden' form='form122_"+id+"' name='tax_unit'>";
							rowsHTML+="<input type='hidden' form='form122_"+id+"' name='unbilled' value='yes'>";
							rowsHTML+="<input type='hidden' form='form122_"+id+"' name='unbilled_id' value='"+ub_item.id+"'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form122_body').prepend(rowsHTML);
					
					var fields=document.getElementById("form122_"+id);
					var save_button=fields.elements[16];
					
					$(save_button).on("click", function(event)
					{
						event.preventDefault();
						form122_create_item(fields);
					});					
				}
				else
				{
					$("#modal2_link").click();
				}
				/////////////////////////////////////////////////////////////
			});
		});
		$(unbilled_button).hide();
	});
	
	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	
	$(entry_date).datepicker();
	$(entry_date).val(get_my_date());

	supplier_filter.value='';
	$(supplier_filter).focus();
}


/**
 * @form Receipts
 * @formNo 124
 */
function form124_header_ini()
{
	var filter_fields=document.getElementById('form124_header');
	var id_filter=filter_fields.elements[0];
	var account_filter=filter_fields.elements[1];
	
	var id_data="<receipts>" +
			"<receipt_id></receipt_id>" +
			"</receipts>";
	var account_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form124_ini();
	});

	set_my_filter(id_data,id_filter);
	set_my_filter(account_data,account_filter);
};

/**
 * @form Customer Accounts
 * @formNo 125
 */
function form125_header_ini()
{
	var filter_fields=document.getElementById('form125_header');
	var customer_filter=filter_fields.elements[0];
	var username_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	var username_data="<accounts>" +
			"<username></username>" +
			"</accounts>";

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form125_ini();
	});

	set_my_filter(customer_data,customer_filter);
	set_my_filter(username_data,username_filter);
	set_static_filter('accounts','status',status_filter);
};


/**
 * @form Issues List
 * @formNo 126
 */
function form126_header_ini()
{
	var filter_fields=document.getElementById('form126_header');
	var id_filter=filter_fields.elements[0];
	var desc_filter=filter_fields.elements[1];
	
	var id_data="<issues>" +
			"<id></id>" +
			"</issues>";
	var desc_data="<issues>" +
			"<short_desc></short_desc>" +
			"</issues>";

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form126_ini();
	});

	set_my_filter(id_data,id_filter);
	set_my_filter(desc_data,desc_filter);
};


/**
 * @form Manage Service Requests
 * @formNo 128
 */
function form128_header_ini()
{
	var filter_fields=document.getElementById('form128_header');
	var id_filter=filter_fields.elements[0];
	var customer_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	var add_button=filter_fields.elements[3];		
	
	var id_data="<service_requests>" +
			"<id></id>" +
			"</service_requests>";
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form128_ini();
	});

	$(add_button).off('click');
	$(add_button).on('click',function(event)
	{
		modal47_action(get_my_date());
	});

	set_my_filter(id_data,id_filter);
	set_my_filter(customer_data,customer_filter);
	set_static_filter('service_requests','status',status_filter);
};


/**
 * @form Job Orders
 * @formNo 130
 */
function form130_header_ini()
{
	var fields=document.getElementById('form130_master');
	
	var customers_filter=fields.elements[1];
	var bill_date=fields.elements[2];
	fields.elements[3].value=get_new_key();
	fields.elements[4].value="";
	fields.elements[5].value=get_new_key();
	
	var save_button=fields.elements[6];
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form130_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form130_add_product();
	});
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_filter(customers_data,customers_filter);
	
	var add_customer=document.getElementById('form130_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{	
			var customers_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";
			set_my_value_list(customers_data,customers_filter);
		});
	});

	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	customers_filter.value='';
	
	$(customers_filter).focus();
}

/**
 * @form Assign Tasks
 * @formNo 131
 */
function form131_header_ini()
{
	$("#form131_body").parent().hide();
	$("#form131_calendar").show();
	
	
	///initializing calendar
	$('#form131_calendar').fullCalendar('destroy');
	$('#form131_calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		height:400,
		fixedWeekCount:false,
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		events: function(start, end, timezone, callback) {
	        var start_time=parseFloat(start.unix())*1000;
	        var end_time=parseFloat(end.unix())*1000;
	        var tasks_data="<task_instances>" +
	        		"<id></id>" +
	        		"<name></name>" +
	        		"<description></description>" +
	        		"<source exact='yes'>service request</source>"+
	        		"<t_initiated lowerbound='yes'>"+start_time+"</t_initiated>" +
	        		"<t_initiated upperbound='yes'>"+end_time+"</t_initiated>" +
	        		"<t_due></t_due>" +
	        		"<status></status>" +
	        		"<assignee></assignee>" +
	        		"<task_hours></task_hours>" +
	        		"</task_instances>";
	        
	        fetch_requested_data('form131',tasks_data,function(tasks)
	        {
	        	var events=[];
	        	
	        	tasks.forEach(function(task)
	        	{
        			var color="yellow";
        			if(task.status=='cancelled')
        			{
        				color="aaaaaa";
        			}
        			else if(task.status=='pending' && parseFloat(task.t_due)<get_my_time())
        			{
        				color='#ff0000';
        			}
        			else if(task.status=='completed')
        			{
        				color='#00ff00';
        			}
	        		events.push({
	        			title: "\n"+task.name+"\nAssigned to: "+task.assignee+"\nDue time: "+get_formatted_time(task.t_due),
	        			start:get_iso_time(task.t_initiated),
	        			end:get_iso_time(parseFloat(task.t_initiated)+(parseFloat(task.task_hours)*3600000)),
	        			color: color,
	        			textColor:"#333",
	        			id: task.id
	        		});	        		
	        	});
	        	callback(events);
	        });
	    },
	    dayClick: function(date,jsEvent,view){
	    	modal32_action(get_my_date_from_iso(date.format()));
	    },
	    eventClick: function(calEvent,jsEvent,view){
	    	modal33_action(calEvent.id);
	    },
	    eventDrop: function(event,delta,revertFunc){
	    	var t_initiated=(parseFloat(event.start.unix())*1000);
	    	var data_xml="<task_instances>" +
						"<id>"+event.id+"</id>" +
						"<t_initiated>"+t_initiated+"</t_initiated>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</task_instances>";
			if(is_online())
			{
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
	    },
	    eventResize: function(event, delta, revertFunc){
	    	var task_hours=parseFloat((parseFloat(event.end.unix())-parseFloat(event.start.unix()))/3600);
	    	var data_xml="<task_instances>" +
						"<id>"+event.id+"</id>" +
						"<task_hours>"+task_hours+"</task_hours>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</task_instances>";
			if(is_online())
			{
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
	
	///calendar set
	var filter_fields=document.getElementById('form131_header');
	var task_filter=filter_fields.elements[0];
	var assignee_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form131_ini();
	});

	var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	var task_data="<task_type>" +
			"<name></name>" +
			"</task_type>";
	
	set_my_filter(task_data,task_filter);	
	set_my_filter(staff_data,assignee_filter);
	set_static_filter('task_instances','status',status_filter);
	
};

function form131_switch_view()
{
	form131_ini();
	$("#form131_body").parent().toggle();
	$("#form131_calendar").toggle();
}

/**
 * @form create Service Request
 * @formNo 132
 */
function form132_header_ini()
{
	///initializing calendar
	$('#form132_calendar').fullCalendar('destroy');
	$('#form132_calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		height:400,
		fixedWeekCount:false,
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		events: function(start, end, timezone, callback) {
	        var start_time=parseFloat(start.unix())*1000;
	        var end_time=parseFloat(end.unix())*1000;
	        var tasks_data="<service_requests>" +
	        		"<id></id>" +
	        		"<customer></customer>" +
	        		"<assignee></assignee>"+
	        		"<notes></notes>" +
	        		"<start_time lowerbound='yes'>"+start_time+"</start_time>" +
	        		"<status exact='yes'>open</status>"+	        		
	        		"</service_requests>";
	        
	        fetch_requested_data('form132',tasks_data,function(tasks)
	        {
	        	var events=[];
	        	var aggregate_tasks=[];
				for(var i=0;i<tasks.length;i++)
				{
					var aggregate_task=new Object();
					aggregate_task.start_time=tasks[i].start_time;
					aggregate_task.count=1;
					for(var k=i+1;k<tasks.length;k++)
					{
						if(tasks[i].start_time==tasks[k].start_time)
						{
							aggregate_task.count+=1;
							tasks.splice(k,1);
							k-=1;
						}
					}
					aggregate_tasks.push(aggregate_task);
				}
				
				var staff_data="<attendance>"+
								"<id></id>"+
								"<presence exact='yes'>present</presence>"+								
								"<date exact='yes'>"+get_raw_time(get_my_date())+"</date>"+
								"</attendance>";
				fetch_requested_data('form132',staff_data,function(staffs)
				{
					var staff_length=staffs.length;
		        	aggregate_tasks.forEach(function(task)
		        	{
	        			var color="aaaaaa";
	        			var title='Click to schedule service call';
	        			if(task.count>=staff_length)
	        			{
	        				color="ff0000";
	        				title='No slots available';
	        			}
		        		events.push({
		        			title: title,
		        			start:get_iso_time(task.start_time),
		        			allDay:true,
		        			color: color,
		        			textColor:"#333",
		        			editable:false
		        		});	        		
		        	});
		        	callback(events);
		        });	
	        });
	    },
	    dayClick: function(date,jsEvent,view){
	    	modal47_action(get_my_date_from_iso(date.format()));
	    }
	});	
};

/**
 * @form Service documents
 * @formNo 133
 */
function form133_header_ini()
{
	var filter_fields=document.getElementById('form133_header');
	var id_filter=filter_fields.elements[0];
	var customer_filter=filter_fields.elements[1];
	
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form133_ini();
	});

	set_my_filter(customer_data,customer_filter);
};

/**
 * @form Service Request Dashboard
 * @formNo 134
 */
function form134_header_ini()
{
	var fields=document.getElementById('form134_master');
	var request_id=$("#form134_link").attr('data_id');
	
	var id_filter=fields.elements[1];
	var customer_filter=fields.elements[2];
	var status_filter=fields.elements[3];
	
	$(fields).off('submit');
	$(fields).on('submit',function (event) 
	{
		event.preventDefault();
		form134_ini();
	});	
		
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});
	
	if(request_id!='undefined')
		id_filter.value=request_id;
	customer_filter.value='';
	status_filter.value='';
	set_static_value_list('service_requests','status',status_filter);	
	
	var id_data="<service_requests>"+
				"<id></id>"+
				"</service_requests>";
	set_my_value_list(id_data,id_filter);
}


/**
 * @form Project Schedule
 * @formNo 138
 */
function form138_header_ini()
{
	var fields=document.getElementById('form138_master');
	var code_filter=fields.elements[1];
	var id_filter=fields.elements[2];
	var add_button=fields.elements[4];
	
	$(add_button).off('click');
	$(add_button).on('click',function()
	{
		modal105_action(id_filter.value);
	});
		
	var name_data="<projects>" +
			"<name></name>" +
			"</projects>";
	
	set_my_value_list(name_data,code_filter);

	id_filter.value="";
	code_filter.value="";
	
	$(code_filter).off('blur');
	$(code_filter).on('blur',function () 
	{
		var id_data="<projects>"+
					"<id></id>"+
					"<name exact='yes'>"+code_filter.value+"</name>"+					
					"</projects>";
		set_my_value(id_data,id_filter);
	});
};


/**
 * @form Customer Profiling
 * @formNo 139
 */
function form139_header_ini()
{
	var filter_fields=document.getElementById('form139_header');
	var name_filter=filter_fields.elements[0];
		
	var name_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(name_data,name_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form139_ini();
	});
};

/**
 * @form Supplier Profiling
 * @formNo 140
 */
function form140_header_ini()
{
	var filter_fields=document.getElementById('form140_header');
	var name_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
		
	var name_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	
	set_my_filter(name_data,name_filter);

	var type_data="<assets>" +
			"<type></type>" +
			"</assets>";
	
	set_my_filter(type_data,type_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form140_ini();
	});
};

/**
 * @form Manage Orders (App)
 * @formNo 141
 */
function form141_header_ini()
{
	var filter_fields=document.getElementById('form141_header');
	var order_filter=filter_fields.elements[0];
	var customer_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	var assignee_filter=filter_fields.elements[3];
	
/*
	var order_data="<sale_orders>" +
			"<id></id>" +
			"</sale_orders>";
	var cust_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(order_data,order_filter);
	set_my_filter(cust_data,name_filter);
*/
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form141_ini();
	});

	set_static_filter('sale_orders','status',status_filter);
};



/**
 * @form Manufacturing
 * @formNo 146
 */
function form146_header_ini()
{
	var filter_fields=document.getElementById('form146_header');
	var product_filter=filter_fields.elements[0];
	var batch_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var name_data="<product_master>" +
			"<name></name>" +
			"</product_master>";	
	set_my_filter(name_data,product_filter);

	var batch_data="<product_instances>" +
			"<batch></batch>" +
			"</product_instances>";	
	set_my_filter(batch_data,batch_filter);
	
	set_static_filter('manufacturing_schedule','status',status_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form146_ini();
	});
};


/**
 * @form Project Feeds
 * @formNo 150
 */
function form150_header_ini()
{
	var fields=document.getElementById('form150_master');
	var project_filter=fields.elements[1];
	var project_id_filter=fields.elements[3];
	
	var project_data="<projects>" +
			"<name></name>" +
			"</projects>";	
	set_my_value_list(project_data,project_filter);
	
	$(project_filter).off('blur');
	$(project_filter).on('blur',function (e)
	{
		var id_data="<projects>"+
					"<id></id>"+
					"<name exact='yes'>"+project_filter.value+"</name>"+
					"</projects>";
		set_my_value(id_data,project_id_filter);
	});
};

/**
 * @form Service Request Billing
 * @formNo 151
 */
function form151_header_ini()
{
	var fields=document.getElementById('form151_master');
	var request_id=$("#form151_link").attr('data_id');
	
	var id_filter=fields.elements[1];
	var customer_filter=fields.elements[2];
	
	$(fields).off('submit');
	$(fields).on('submit',function (event) 
	{
		event.preventDefault();
		form151_ini();
	});	
			
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});
	
	id_filter.value=request_id;
	customer_filter.value='';
	
	var id_data="<service_requests>"+
				"<id></id>"+
				"</service_requests>";
	set_my_value_list(id_data,id_filter);
}

/**
 * @form Manage Quotations
 * @formNo 152
 */
function form152_header_ini()
{
	var filter_fields=document.getElementById('form152_header');
	var num_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var customer_filter=filter_fields.elements[2];
	
	var num_data="<quotation>" +
			"<quot_num></quot_num>" +
			"</quotation>";
	var type_data="<bill_types>" +
			"<name></name>" +
			"</bill_types>";
	var cust_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(num_data,num_filter);
	set_my_filter(type_data,type_filter);
	set_my_filter(cust_data,customer_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form152_ini();
	});
};

/**
 * @form Manage Quotations
 * @formNo 153
 */
function form153_header_ini()
{
	var fields=document.getElementById('form153_master');

	var customers_filter=fields.elements['customer'];
	customers_filter.value='';
		
	var quot_type=fields.elements['type'];
	var date=fields.elements['date'];
	var quot_id_filter=fields.elements['quot_id'];
	var quot_num_filter=fields.elements['quot_num'];
	quot_id_filter.value=get_new_key();
	quot_num_filter.value="";
	var save_button=fields.elements['save'];
	var print_button=fields.elements['print'];
	var share_button=fields.elements['share'];
	
	$(share_button).hide();
	$(share_button).off('click');

	$(print_button).off('click');
	$(print_button).on('click',function()
	{
		form153_print_form();
	});
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form153_create_form();
	});
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form153_add_product();
	});
	
	var quot_id=$("#form153_link").attr('data_id');
	if(quot_id==null || quot_id=='')
	{	
		var quot_num_data="<user_preferences count='1'>"+
						"<value></value>"+
						"<name exact='yes'>quot_num</name>"+
						"</user_preferences>";
		get_single_column_data(function (quot_nums)
		{
			if(quot_nums.length>0)
			{
				quot_num_filter.value=get_session_var('quot_prefix')+"-"+quot_nums[0];
			}
		},quot_num_data);
	}
	else 
	{
		quot_id_filter.value=quot_id;
	}

	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list_func(customers_data,customers_filter,function () 
	{
		$(customers_filter).focus();
	});

	var add_customer=document.getElementById('form153_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{
			var customers_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";			
			set_my_value_list(customers_data,customers_filter);
		});
	});	

	var type_data="<bill_types>" +
		"<name></name>" +
		"<status exact='yes'>active</status>" +
		"</bill_types>";
	set_my_value_list(type_data,quot_type);
	
	var bill_id=$("#form153_link").attr('data_id');
	
	$(customers_filter).off('blur');
	$(customers_filter).on('blur',function(e)
	{
		var address_data="<customers>" +
				"<address></address>" +
				"<city></city>" +
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		fetch_requested_data('',address_data,function(addresses)
		{
			var address_string="";
			if(addresses.length>0)
			{
				address_string+=addresses[0].address+", "+addresses[0].city;
				document.getElementById('form153_customer_info').innerHTML="Address<br>"+address_string;
			}
			else
			{
				document.getElementById('form153_customer_info').innerHTML="";
			}
		});
	});

	$(date).datepicker();
	date.value=get_my_date();
}

/**
 * @form Create Bill (DLM)
 * @formNo 154
 */
function form154_header_ini()
{
	var fields=document.getElementById('form154_master');
	
	var customers_filter=fields.elements['customer'];
	var bill_type=fields.elements['bill_type'];
	var store_filter=fields.elements['store'];	
	var bill_date=fields.elements['date'];
	var tax_type=fields.elements['tax_type'];
	var narration=fields.elements['narration'];
	var a1_job=document.getElementById('form154_1job');
	var bill_num=fields.elements['bill_num'];
	fields.elements['bill_id'].value=get_new_key();
	fields.elements['t_id'].value=fields.elements['bill_id'].value;
	var save_button=fields.elements['save'];
	var cst_filter=fields.elements['cst'];
	var tin_filter=fields.elements['tin'];
	var cform_filter=fields.elements['cform'];
	
	fields.elements['cform'].checked=false;
	
	narration.value="";
	$(a1_job).hide();
	
	bill_type.removeAttribute('readonly');
	store_filter.removeAttribute('readonly');
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form154_create_form();
	});
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) 
	{
		if( event.keyCode == 83 && event.ctrlKey) 
		{
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form154_add_product();
	});
	
	var store_data="<store_areas>"+
				"<name></name>"+
				"</store_areas>";
	set_my_value_list(store_data,store_filter);	
	
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter);

	var add_customer=document.getElementById('form154_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{
			var customers_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";			
			set_my_value_list(customers_data,customers_filter);
		});
	});	

	var type_data="<bill_types>" +
		"<name></name>" +
		"<status exact='yes'>active</status>" +
		"</bill_types>";
	set_my_value_list(type_data,bill_type);
	
	set_static_value_list('bills','tax_type',tax_type);

	var bill_id=$("#form154_link").attr('data_id');
	if(bill_id==null || bill_id=='')
	{	
		get_single_column_data(function (bill_types) 
		{
			if(bill_types.length>0)
			{
				bill_type.value=bill_types[0];
				var bill_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>"+bill_type.value+"_bill_num</name>"+
							"</user_preferences>";
				set_my_value(bill_num_data,bill_num);	
			}
			else 
			{
				var bill_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>bill_num</name>"+
							"</user_preferences>";
				set_my_value(bill_num_data,bill_num);	
			}
		},type_data);
	}

	if(bill_type.value=='Retail')
	{
		$(cform_filter).parent().show();
	}
	else
	{
		$(cform_filter).parent().hide();
	}

	if(bill_type.value=='Retail' || bill_type.value=='Tax')
	{
		$(tax_type).parent().show();
	}
	else
	{
		$(tax_type).parent().hide();
	}

	$(bill_type).off('blur');
	$(bill_type).on('blur',function (e) 
	{
		if(bill_type.value=='Retail')
		{
			$(cform_filter).parent().show();
		}
		else
		{
			$(cform_filter).parent().hide();
		}

		if(bill_type.value=='Retail' || bill_type.value=='Tax')
		{
			$(tax_type).parent().show();
		}
		else
		{
			$(tax_type).parent().hide();
		}
		
		if(bill_type.value=='Retail' || bill_type.value=='Tax')
		{
			var headHTML="<tr><form id='form154_header'></form>"+
					"<th style='width:50px'>S.No.</th>"+
					"<th style='min-width:200px'>Item</th>"+
					"<th>Qty.</th>"+
					"<th>Rate</th>"+
					"<th>Amount</th>"+
					"<th><input type='button' title='Add Product' class='add_icon' onclick='form154_add_product();'></th>"+
					"</tr>";
		}
		else if(bill_type.value=='Hiring')
		{
			headHTML="<tr><form id='form154_header'></form>"+
					"<th style='width:50px'>S.No.</th>"+
					"<th style='min-width:200px'>Item</th>"+
					"<th>Qty.</th>"+
					"<th>Date</th>"+
					"<th>Rate</th>"+
					"<th>Amount</th>"+
					"<th><input type='button' title='Add Product' class='add_icon' onclick='form154_add_product();'>"+
					"</th>"+
					"</tr>";
			$(a1_job).show();		
		}
		else
		{
			headHTML="<tr><form id='form154_header'></form>"+
					"<th style='width:50px'>S.No.</th>"+
					"<th style='min-width:200px'>Item</th>"+
					"<th>Qty.</th>"+
					"<th>Rate</th>"+
					"<th>Amount</th>"+
					"<th><input type='button' title='Add Service' class='add_icon' onclick='form154_add_service();'>"+
					"</th>"+
					"</tr>";
			$(fields).off('submit');
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form154_add_service();
			});
		}
		
		$('#form154_head').html(headHTML);
		
		var bill_num_data="<user_preferences count='1'>"+
						"<value></value>"+
						"<name exact='yes'>"+bill_type.value+"_bill_num</name>"+
						"</user_preferences>";
		set_my_value(bill_num_data,bill_num);	
	});	
	
	$(customers_filter).off('blur');
	$(customers_filter).on('blur',function(e)
	{
		var address_data="<customers>" +
				"<address></address>" +
				"<city></city>" +
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		fetch_requested_data('',address_data,function(addresses)
		{
			var address_string="";
			if(addresses.length>0)
			{
				address_string+=addresses[0].address+", "+addresses[0].city;
				document.getElementById('form154_customer_info').innerHTML="Address<br>"+address_string;
			}
			else
			{
				document.getElementById('form154_customer_info').innerHTML="";
			}
		});
		
		var cst_data="<attributes>"+
					"<value></value>"+
					"<type exact='yes'>customer</type>"+
					"<attribute exact='yes'>CST#</attribute>"+
					"<name exact='yes'>"+customers_filter.value+"</name>"+
					"</attributes>";
		set_my_value(cst_data,cst_filter);

		var tin_data="<attributes>"+
					"<value></value>"+
					"<type exact='yes'>customer</type>"+
					"<attribute exact='yes'>TIN#</attribute>"+
					"<name exact='yes'>"+customers_filter.value+"</name>"+
					"</attributes>";
		set_my_value(tin_data,tin_filter);
	});

	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	customers_filter.value='';
	$(customers_filter).focus();
}

/**
 * @form Update Inventory (DLM)
 * @formNo 155
 */
function form155_header_ini()
{
	var filter_fields=document.getElementById('form155_header');	
	var names_filter=filter_fields.elements[0];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form155_ini();
	});

	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";	
	set_my_filter(products_data,names_filter);
};

/**
 * @form Store Placement (DLM)
 * @formNo 156
 */
function form156_header_ini()
{
	var filter_fields=document.getElementById('form156_header');
	var name_filter=filter_fields.elements[0];
	var area_filter=filter_fields.elements[1];
	
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var area_data="<store_areas>" +
			"<name></name>" +
			"</store_areas>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form156_ini();
	});

	set_my_filter(products_data,name_filter);
	set_my_filter(area_data,area_filter);	
};


/**
 * @form Store Movement (DLM)
 * @formNo 157
 */
function form157_header_ini()
{
	var filter_fields=document.getElementById('form157_header');
	var product_filter=filter_fields.elements[0];
	var status_filter=filter_fields.elements[2];
	
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form157_ini();
	});

	set_my_filter(products_data,product_filter);
	set_static_filter('store_movement','status',status_filter);
};

/**
 * @form Enter Supplier bills(DLM)
 * @formNo 158
 */
function form158_header_ini()
{
	var fields=document.getElementById('form158_master');
	
	var supplier_filter=fields.elements['supplier'];
	supplier_filter.value='';
	
	fields.elements['bill_num'].value="";
	var bill_date=fields.elements['date'];
	
	fields.elements['imported'].checked=false;
	fields.elements['bill_id'].value=get_new_key();
	fields.elements['t_id'].value=fields.elements['bill_id'].value;
	var save_button=fields.elements['save'];
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form158_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form158_add_item();
	});
	
	var suppliers_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	
	set_my_value_list(suppliers_data,supplier_filter);
	
	var add_supplier=document.getElementById('form158_add_supplier');
	$(add_supplier).off('click');
	$(add_supplier).on('click',function()
	{
		modal13_action(function()
		{	
			var suppliers_data="<suppliers>" +
				"<acc_name></acc_name>" +
				"</suppliers>";			
			set_my_value_list(suppliers_data,supplier_filter);
		});
	});

	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());	
	$(supplier_filter).focus();
}

/**
 * @form Checklist Items
 * @formNo 161
 */
function form161_header_ini()
{
	var filter_fields=document.getElementById('form161_header');	
	var cp_filter=filter_fields.elements[0];
	var status_filter=filter_fields.elements[1];
	
	var cp_data="<checklist_items>" +
			"<checkpoint></checkpoint>" +
			"</checklist_items>";
	
	set_my_filter(cp_data,cp_filter);
	set_static_filter('checklist_items','status',status_filter);	
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form161_ini();
	});
};

/**
 * @form Product checklist
 * @formNo 162
 */
function form162_header_ini()
{
	var filter_fields=document.getElementById('form162_header');	
	var item_filter=filter_fields.elements[0];
	var cp_filter=filter_fields.elements[1];
	
	//setting autocompletes 
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";	
	set_my_filter(products_data,item_filter);

	var cp_data="<checklist_items>" +
			"<checkpoint></checkpoint>" +
			"</checklist_items>";
	
	set_my_filter(cp_data,cp_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form162_ini();
	});
};


/**
 * @form Product Dimensions
 * @formNo 163
 */
function form163_header_ini()
{
	var filter_fields=document.getElementById('form163_header');	
	var names_filter=filter_fields.elements[0];
	
	//setting autocompletes 
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	set_my_filter(products_data,names_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form163_ini();
	});
};


/**
 * @form Put-away Suggestions
 * @formNo 165
 */
function form165_header_ini()
{
	var form=document.getElementById('form165_master');
	var sku_filter=form.elements['sku'];
	var batch_filter=form.elements['batch'];
	var rack_filter=form.elements['rack'];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		form165_ini();
	});
		
	$(rack_filter).off('click');
	$(rack_filter).on('click',function()
	{
		this.select();
	});

	var sku_data="<product_master>"+
		"<name></name>"+
		"</product_master>";
	set_my_filter(sku_data,sku_filter);	

	var batch_data="<product_instances>"+
		"<batch></batch>"+
		"</product_instances>";
	set_my_filter(batch_data,batch_filter);					
	
	$(rack_filter).off('keydown');
	$(rack_filter).on('keydown',function (event) 
	{
		if(event.keyCode==13)
		{
			event.preventDefault();
			modal152_action(rack_filter.value);
		}
	});
};


/**
 * @form Storage Structure
 * @formNo 167
 */
function form167_header_ini()
{
	var filter_fields=document.getElementById('form167_header');	
	var type_filter=filter_fields.elements[0];
	var parent_filter=filter_fields.elements[1];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form167_ini();
	});
	//setting autocompletes 
	var type_data="<storage_structure>" +
			"<name></name>" +
			"</storage_structure>";
	
	var parent_data="<storage_structure>" +
			"<parent></parent>" +
			"</storage_structure>";

	set_my_filter(type_data,type_filter);
	set_my_filter(parent_data,parent_filter);
};

/**
 * @form Manage Products (Nikki)
 * @formNo 169
 */
function form169_header_ini()
{
	var filter_fields=document.getElementById('form169_header');
	var name_filter=filter_fields.elements[0];
	var desc_filter=filter_fields.elements[1];
	var make_filter=filter_fields.elements[2];
	var add_button=filter_fields.elements[3];

	$(add_button).off('click');
	$(add_button).on('click',function()
	{
		modal114_action();
	});
	
	var make_data="<product_master>" +
			"<make></make>" +
			"</product_master>";
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var desc_data="<product_master>" +
			"<description></description>" +
			"</product_master>";

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form169_ini();
	});

	set_my_filter(make_data,make_filter);
	set_my_filter(products_data,name_filter);
	set_my_filter(desc_data,desc_filter);
	
};


/**
 * @form Storage Areas (Nikki)
 * @formNo 170
 */
function form170_header_ini()
{
	var filter_fields=document.getElementById('form170_header');
	var name_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var parent_filter=filter_fields.elements[2];
	
	var area_data="<store_areas>" +
			"<name></name>" +
			"</store_areas>";	
	set_my_filter(area_data,name_filter);
	
	var type_data="<storage_structure>"+
					"<name></name>"+
					"</storage_structure>";
	set_my_filter(type_data,type_filter);
	
	var parent_data="<store_areas>"+
			"<parent></parent>"+
			"</store_areas>";
	set_my_filter(parent_data,parent_filter);
			
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form170_ini();
	});
};

/**
 * @form Manage Channels
 * @formNo 171
 */
function form171_header_ini()
{
	var filter_fields=document.getElementById('form171_header');
	var name_filter=filter_fields.elements[0];
	
	var name_data="<sale_channels>" +
			"<name></name>" +
			"</sale_channels>";
	
	set_my_filter(name_data,name_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form171_ini();
	});

};

/**
 * @form Pricing Sheet
 * @formNo 172
 */
function form172_header_ini()
{
	var filter_fields=document.getElementById('form172_header');
	var channel_filter=filter_fields.elements[0];
	var sku_filter=filter_fields.elements[1];
	
	var channel_data="<sale_channels>" +
			"<name></name>" +
			"</sale_channels>";
	var sku_data="<product_master>"+
				"<name></name>"+
				"</product_master>";		
	
	set_my_filter(channel_data,channel_filter);
	set_my_filter(sku_data,sku_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form172_ini();
	});
};

/**
 * @form SKU mapping
 * @formNo 173
 */
function form173_header_ini()
{
	var filter_fields=document.getElementById('form173_header');
	var channel_filter=filter_fields.elements[0];
	var channel_sku_filter=filter_fields.elements[1];
	var business_sku_filter=filter_fields.elements[2];
	var system_sku_filter=filter_fields.elements[3];

	var channel_data="<sale_channels>" +
			"<name></name>" +
			"</sale_channels>";
	var channel_sku_data="<sku_mapping>" +
			"<channel_sku></channel_sku>" +
			"</sku_mapping>";
	var business_sku_data="<sku_mapping>" +
			"<channel_system_sku></channel_system_sku>" +
			"</sku_mapping>";
	var system_sku_data="<sku_mapping>" +
			"<system_sku></system_sku>" +
			"</sku_mapping>";
	
	set_my_filter(channel_data,channel_filter);
	set_my_filter(channel_sku_data,channel_sku_filter);
	set_my_filter(business_sku_data,business_sku_filter);
	set_my_filter(system_sku_data,system_sku_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form173_ini();
	});
};

/**
 * @form Pickup Charges
 * @formNo 174
 */
function form174_header_ini()
{
	var filter_fields=document.getElementById('form174_header');
	var channel_filter=filter_fields.elements[0];
	var pincode_filter=filter_fields.elements[1];
	
	var channel_data="<sale_channels>" +
			"<name></name>" +
			"</sale_channels>";
	var pincode_data="<pickup_charges>" +
			"<pincode></pincode>" +
			"</pickup_charges>";
	
	set_my_filter(channel_data,channel_filter);
	set_my_filter(pincode_data,pincode_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form174_ini();
	});
};

/**
 * @form Channel Category
 * @formNo 175
 */
function form175_header_ini()
{
	var filter_fields=document.getElementById('form175_header');
	var channel_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var name_filter=filter_fields.elements[2];
	var parent_filter=filter_fields.elements[3];
	
	var channel_data="<sale_channels>" +
			"<name></name>" +
			"</sale_channels>";
	var name_data="<channel_category>" +
			"<name></name>" +
			"</channel_category>";
	var parent_data="<channel_category>" +
			"<parent></parent>" +
			"</channel_category>";
	
	set_my_filter(channel_data,channel_filter);
	set_my_filter(name_data,name_filter);
	set_my_filter(parent_data,parent_filter);
	set_static_filter('channel_category','type',type_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form175_ini();
	});
};

/**
 * @form Category item mapping
 * @formNo 176
 */
function form176_header_ini()
{
	var filter_fields=document.getElementById('form176_header');
	var channel_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var category_filter=filter_fields.elements[2];
	var item_filter=filter_fields.elements[3];
	
	var channel_data="<sale_channels>" +
			"<name></name>" +
			"</sale_channels>";
	var name_data="<channel_category>" +
			"<name></name>" +
			"</channel_category>";
	var item_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	set_my_filter(channel_data,channel_filter);
	set_my_filter(name_data,category_filter);
	set_my_filter(item_data,item_filter);
	set_static_filter('category_sku_mapping','cat_type',type_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form176_ini();
	});
};

/**
 * @form Prioritization Parameters
 * @formNo 177
 */
function form177_header_ini()
{
	var filter_fields=document.getElementById('form177_header');
	var type_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	
	var name_data="<prioritization_parameters>" +
			"<name></name>" +
			"</prioritization_parameters>";
	
	set_my_filter(name_data,name_filter);
	set_static_filter('prioritization_parameters','type',type_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form177_ini();
	});
};


/**
 * @form Production Steps
 * @formNo 184
 */
function form184_header_ini()
{
	var filter_fields=document.getElementById('form184_header');
	var name_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var name_data="<business_processes>" +
			"<name></name>" +
			"</business_processes>";
	
	set_my_filter(name_data,name_filter);
	set_static_filter('business_processes','type',type_filter);
	set_static_filter('business_processes','status',status_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form184_ini();
	});

	var body_elem=document.getElementById('form184_body');
	body_elem.addEventListener('table_sort',function(e)
	{
		form184_update_serial_numbers();
		$("[id^='save_form184_']").click();
	},false);
};


/**
 * @form Testing Steps
 * @formNo 187
 */
function form187_header_ini()
{
	var filter_fields=document.getElementById('form187_header');
	var name_filter=filter_fields.elements[0];
	var status_filter=filter_fields.elements[1];
	
	var name_data="<business_processes>" +
			"<name></name>" +
			"<type exact='yes'>testing</type>"+
			"</business_processes>";
	
	set_my_filter(name_data,name_filter);
	set_static_filter('business_processes','status',status_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form187_ini();
	});

	var body_elem=document.getElementById('form187_body');
	body_elem.addEventListener('table_sort',function(e)
	{
		form187_update_serial_numbers();
		$("[id^='save_form187_']").click();
	},false);
};

/**
 * @form Track Testing
 * @formNo 188
 */
function form188_header_ini()
{
	$("#form188_body").parent().hide();
	$("#form188_nav").hide();
	$("#form188_calendar").show();
}

function form188_switch_view()
{
	$("#form188_body").parent().toggle();
	$("#form188_nav").toggle();
	$("#form188_calendar").toggle();
}

/**
 * @form Orders (laundry)
 * @formNo 190
 */
function form190_header_ini()
{
	var filter_fields=document.getElementById('form190_header');
	var name_filter=filter_fields.elements[0];
	var status_filter=filter_fields.elements[1];
	
	var name_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(name_data,name_filter);
	set_static_filter('sale_orders','status',status_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form190_ini();
	});
};

/**
 * @form Enter Supplier bills(Laundry)
 * @formNo 192
 */
function form192_header_ini()
{
	var fields=document.getElementById('form192_master');
	
	var supplier_filter=fields.elements[1];
	fields.elements[2].value="";
	var bill_date=fields.elements[3];
	var entry_date=fields.elements[4];
	fields.elements[5].value=get_new_key();
	fields.elements[6].value=fields.elements[5].value;
	var save_button=fields.elements[7];
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form192_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form192_add_item();
	});
	
	var suppliers_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	
	set_my_value_list(suppliers_data,supplier_filter);
	
	var add_supplier=document.getElementById('form192_add_supplier');
	$(add_supplier).off('click');
	$(add_supplier).on('click',function()
	{
		modal13_action(function()
		{	
			var suppliers_data="<suppliers>" +
				"<acc_name></acc_name>" +
				"</suppliers>";			
			set_my_value_list(suppliers_data,supplier_filter);
		});
	});

	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	
	$(entry_date).datepicker();
	$(entry_date).val(get_my_date());

	supplier_filter.value='';
	$(supplier_filter).focus();
}

/**
 * @form Update stock
 * @formNo 193
 */
function form193_header_ini()
{
	var fields=document.getElementById('form193_master');
	
	var storage_filter=fields.elements['storage'];
	var quantity_filter=fields.elements['q_scanned'];
	var save_button=fields.elements['save'];
	//var barcode_button=fields.elements['barcode'];

	storage_filter.value="";	
	quantity_filter.value=0;
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form193_update_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form193_add_item();
	});
	
	var storage_data="<store_areas>"+
					"<name></name>"+
					"<area_type></area_type>"+
					"</store_areas>";
	set_my_value_list_func(storage_data,storage_filter,function()
	{
		$(storage_filter).focus();
	});

	var head_html="<tr><form id='form193_header'></form>"+
					"<th>Barcode</th>"+
					"<th>Item</th>"+
					"<th>Batch</th>"+					
					"<th>Quantity</th>"+					
					"<th><input type='button' form='form193_header' title='Add item' class='add_icon' onclick='form193_add_item();'></th>"+
					"</tr>";
	$('#form193_head').html(head_html);
	$('#form193_body').html("");
	$('#form193_head').parent().attr('class','rwd-table');

}

/**
 * @form LetterHeads
 * @formNo 195
 */
function form195_header_ini()
{
	var filter_fields=document.getElementById('form195_header');
	var name_filter=filter_fields.elements[0];
	
	var name_data="<letterheads>" +
			"<name></name>" +
			"</letterheads>";
	set_my_filter(name_data,name_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form195_ini();
	});
};

/**
 * @form Promotion Emails
 * @formNo 196
 */
function form196_header_ini()
{
	var fields=document.getElementById('form196_master');
	var name_filter=fields.elements['newsletter'];
	var sms_filter=fields.elements['sms'];
	var list_filter=fields.elements['list'];
	var value_filter=fields.elements['value'];
	var id_filter=fields.elements['nl_id'];
	var send_button=fields.elements['send'];
	var send_all_button=fields.elements['send_all'];
	id_filter.value="";
	name_filter.value="";
	list_filter.value="";
	fields.elements['nl_id'].value="";
	
	$(send_button).off('click');
	$(send_button).on('click',function(event)
	{
		event.preventDefault();
		form196_ini();
	});

	$(send_all_button).off('click');
	$(send_all_button).on('click',function(event)
	{
		event.preventDefault();
		form196_ini_all();
	});

	var list_columns=new Object();
		list_columns.data_store='attributes';
		list_columns.indexes=[{index:'type',exact:'customer'}];		
		list_columns.return_column='attribute';
	set_my_value_list_json(list_columns,list_filter);

	$(list_filter).off('blur');
	$(list_filter).on('blur',function()
	{
		var value_columns=new Object();
			value_columns.data_store='attributes';
			value_columns.indexes=[{index:'type',exact:'customer'},
									{index:'attribute',exact:list_filter.value}];		
			value_columns.return_column='value';
		set_my_value_list_json(value_columns,value_filter);
	});
	
	sms_filter.value=get_session_var('sms_content');

	var name_columns=new Object();
		name_columns.data_store='newsletter';
		name_columns.indexes=[{index:'status',exact:'active'}];		
		name_columns.return_column='name';
	set_my_value_list_json(name_columns,name_filter,function () 
	{
		$(name_filter).focus();		
	});

	$(name_filter).off('blur');
	$(name_filter).on('blur',function()
	{
		var nl_columns=new Object();
			nl_columns.count=1;
			nl_columns.data_store='newsletter';
			nl_columns.indexes=[{index:'name',exact:name_filter.value}];		
			nl_columns.return_column='id';
		set_my_value_json(nl_columns,id_filter);		
	});

	my_datalist_change(name_filter,function () 
	{
		var nl_columns=new Object();
			nl_columns.count=1;
			nl_columns.data_store='newsletter';
			nl_columns.indexes=[{index:'name',exact:name_filter.value}];		
			nl_columns.return_column='id';
		set_my_value_json(nl_columns,id_filter);		
	});
	
	$('textarea').autosize();
}


/**
 * @form Order Details
 * @formNo 198
 */
function form198_header_ini()
{
	var fields=document.getElementById('form198_master');

	var awb_filter=fields.elements['awb_num'];

	awb_filter.value="";	

/*	var awb_data="<logistics_orders>"+
				"<awb_num></awb_num>"+
				"</logistics_orders>";
	set_my_value_list(awb_data,awb_filter,function () 
	{
*/
		$(awb_filter).focus();
//	});

	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form198_ini();
	});

	$('#form198_fieldset').html("");
}

/**
 * @form Incoming Items
 * @formNo 199
 */
function form199_header_ini()
{
	var fields=document.getElementById('form199_master');

	var comments_filter=fields.elements['comments'];

	comments_filter.value="";	
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form199_add_item();
	});

	$('#form199_body').html("");
}

/**
 * @form Create Drs
 * @formNo 200
 */
function form200_header_ini()
{
	var fields=document.getElementById('form200_master');

	var drs_filter=fields.elements['drs_num'];
	var employee=fields.elements['employee'];
	var drs_date=fields.elements['date'];
	var branch=fields.elements['branch'];

	fields.elements['saved'].value='no';
	fields.elements['id'].value=get_new_key();

	var save_button=fields.elements['save'];
	drs_filter.value="";
	employee.value="";

	var drs_id=$("#form200_link").attr('data_id');
	if(drs_id==null)
		drs_id="";	

	if(drs_id=="")
	{
		var drs_num_data="<user_preferences count='1'>"+
						"<value></value>"+
						"<name exact='yes'>drs_num</name>"+
						"</user_preferences>";
		set_my_value(drs_num_data,drs_filter);	
	}
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form200_update_form();
	});

	$(save_button).hide();
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	var acc_name=get_account_name();
	var branch_data="<store_areas count='1'>"+
					"<name></name>"+
					"<owner>"+acc_name+"</owner>"+
					"</store_areas>";
	
	set_my_value(branch_data,branch);
	
	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		//modal129_action();
		form200_add_item();
	});

	var employee_data="<staff>" +
		"<acc_name></acc_name>" +
		"</staff>";
	set_my_value_list(employee_data,employee,function () 
	{
		$(employee).focus();
	});
	
	$(drs_date).datepicker();
	drs_date.value=get_my_date();
	$('#form200_share').hide();
}

/**
 * @form Manage Drs
 * @formNo 201
 */
function form201_header_ini()
{
	var filter_fields=document.getElementById('form201_header');
	var drs_filter=filter_fields.elements[0];
	var employee_filter=filter_fields.elements[1];
	var date_filter=filter_fields.elements[2];
	var type_filter=filter_fields.elements[3];
		
	var drs_data="<drs>" +
			"<drs_num></drs_num>" +
			"</drs>";
	var employee_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form201_ini();
	});

	set_my_filter(drs_data,drs_filter);
	set_my_filter(employee_data,employee_filter);	
	set_static_filter('drs','type',type_filter);

	$(date_filter).datepicker();
};

/**
 * @form Exhanges
 * @formNo 202
 */
function form202_header_ini()
{
	var fields=document.getElementById('form202_master');
	
	var target_filter=fields.elements['target'];

	var target_data="<store_areas>"+
					"<name></name>"+
					"<area_type array='yes'>--store--office--</area_type>"+
					"</store_areas>";
	set_my_value_list(target_data,target_filter,function () 
	{
		$(target_filter).focus();
	});				
	
	target_filter.value="";	
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form202_add_item();
	});

	$('#form202_body').html("");
}


/**
 * @form Pending Logistics Orders
 * @formNo 204
 */
function form204_header_ini()
{
	var fields=document.getElementById('form204_master');
	
	var comments_filter=fields.elements['comments'];

	comments_filter.value="";	
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form204_add_item();
	});

	$('#form204_body').html("");
}

/**
 * @form Delivered Logistics Orders
 * @formNo 205
 */
function form205_header_ini()
{
	var fields=document.getElementById('form205_master');
	
	var comments_filter=fields.elements['comments'];

	comments_filter.value="";	
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form205_add_item();
	});

	$('#form205_body').html("");
}

/**
 * @form Undelivered Logistics Orders
 * @formNo 206
 */
function form206_header_ini()
{
	var fields=document.getElementById('form206_master');
	
	var comments_filter=fields.elements['comments'];

	comments_filter.value="";	
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form206_add_item();
	});

	$('#form206_body').html("");
}

/**
 * @form Update Inventory (Aurilion)
 * @formNo 1
 */
function form207_header_ini()
{
	var filter_fields=document.getElementById('form207_header');	
	var names_filter=filter_fields.elements[0];
	var batches_filter=filter_fields.elements[1];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form207_ini();
	});
	//setting autocompletes 
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	var batch_data="<product_instances>" +
			"<batch></batch>" +
			"</product_instances>";

	set_my_filter(products_data,names_filter);
	set_my_filter(batch_data,batches_filter);
};

/**
 * @form Manage Production Plans
 * @formNo 208
 */
function form208_header_ini()
{
	var filter_fields=document.getElementById('form208_header');
	var num_filter=filter_fields.elements[0];
	var customer_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var num_data="<treatment_plans>" +
			"<plan_num></plan_num>" +
			"</treatment_plans>";
	
	set_my_filter(num_data,num_filter);

	var cust_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(cust_data,customer_filter);

	set_static_filter('treatment_plans','status',status_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form208_ini();
	});
};

/**
 * @form Create Treatment Plan
 * @formNo 209
 */
function form209_header_ini()
{
	var fields=document.getElementById('form209_master');
	
	var num_filter=fields.elements['num'];
	var customer_filter=fields.elements['customer'];
	var date_filter=fields.elements['date'];
	var status_filter=fields.elements['status'];
	fields.elements['plan_id'].value=get_new_key();
	var save_button=fields.elements['save'];
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form209_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	var plan_id=$("#form209_link").attr('data_id');
	if(plan_id=="" || plan_id==null)
	{
		var plan_num_data="<user_preferences count='1'>"+
					"<value></value>"+
					"<name exact='yes'>treatment_plan_num</name>"+
					"</user_preferences>";
		set_my_value(plan_num_data,num_filter);	
	}
	
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form209_add_item();
	});
	
	$(date_filter).datepicker();
	$(date_filter).val(get_my_date());
	
	customer_filter.value="";
	
	var customer_data="<customers>"+
					"<acc_name></acc_name>"+
					"</customers>";	
	set_my_value_list(customer_data,customer_filter,function () 
	{
		$(customer_filter).focus();
	});
	
	set_static_value_list('treatment_plans','status',status_filter);
	
	var body_elem=document.getElementById('form209_body');
	body_elem.addEventListener('table_sort',function(e)
	{
		form209_update_serial_numbers();
		$("[id^='save_form209_']").click();
	},false);
}

/**
 * @formNo 210
 * @report Order Packing
 */
function form210_header_ini()
{	
	var master_form=document.getElementById('form210_master');
	var bag_filter=master_form.elements['bag'];
	var order_filter=master_form.elements['order'];
	var bill_filter=master_form.elements['bill'];

	var print_barcode_button=master_form.elements['print'];
	var print_invoice_button=master_form.elements['print_invoice'];
	var generate_invoice_button=master_form.elements['edit_invoice'];
	
	var accepted_filter=master_form.elements['accepted'];
	var rejected_filter=master_form.elements['rejected'];
	
	$('#form210_image').html('');
	$('#form210_invoice').html('');
	$('#form210_invoice_line').html('');

	$(bag_filter).focus();

	$(master_form).off('submit');
	$(master_form).on('submit',function(event)
	{
		event.preventDefault();
		form210_ini();
	});
	
	$(accepted_filter).off('keydown');
	$(accepted_filter).on('keydown',function (event) 
	{
		if(event.keyCode == 13) 
		{
	    	event.preventDefault();
	    	if(accepted_filter.value!="")
	    	{
		    	form210_accept_item(accepted_filter.value);
		    	accepted_filter.value="";
		    }
	    }
	});
	
	$(rejected_filter).off('keydown');
	$(rejected_filter).on('keydown',function (event) 
	{
		if(event.keyCode == 13) 
		{
	    	event.preventDefault();
	    	if(rejected_filter.value!="")
	    	{
		    	form210_reject_item(rejected_filter.value);
		    	rejected_filter.value="";
		    	$(accepted_filter).focus();
		    }
	    }
	});
	
	var bag_data="<bills>"+
				"<bill_num></bill_num>"+
				"<pick_bag_num></pick_bag_num>"+
				"<status></status>"+				
				"</bills>";
	fetch_requested_data('',bag_data,function(bags)
	{
		if(bags.length>0)
		{
			var form=master_form;
			var filter_element=bag_filter;			
			var datalist=document.createElement('datalist');
			bags.forEach(function(d)
			{
				if(d.status!='dispatched' && d.status!='cancelled')
				{
					var option=document.createElement('option');
					option.setAttribute('value',d.pick_bag_num);
					datalist.appendChild(option);
				}
			});
			
			var list_id=filter_element.getAttribute('list');
			if(list_id=='' || list_id==null)
			{
				list_id="list_"+get_new_key();
				filter_element.setAttribute("list",list_id);
			}
			else
			{
				var oldlist=document.getElementById(list_id);
				form.removeChild(oldlist);
			}
			
			form.appendChild(datalist);
			datalist.setAttribute('id',list_id);
	
			var active_element=document.activeElement;
					
			if(active_element==filter_element)
			{
				$(filter_element).blur();
				$(filter_element).focus();
			}	
			$(bag_filter).focus();
		}
	});

	var order_data="<sale_orders>"+
				"<order_num></order_num>"+
				"</sale_orders>";
	set_my_value_list(order_data,order_filter);					
	
	$(bag_filter).off('blur');
	$(bag_filter).off('change');
	$(bag_filter).off('select');
	$(bag_filter).on('blur change select',function () 
	{
		if(bag_filter.value!="")
		{
			var order_data="<bills count='1'>"+
				"<order_num></order_num>"+
				"<pick_bag_num exact='yes'>"+bag_filter.value+"</pick_bag_num>"+
				"</bills>";
			set_my_value(order_data,order_filter);
			
			var bill_data="<bills count='1'>"+
				"<bill_num></bill_num>"+
				"<pick_bag_num exact='yes'>"+bag_filter.value+"</pick_bag_num>"+
				"</bills>";
			set_my_value(bill_data,bill_filter);
		}
	});
}


/**
 * @form Update Logisitcs Orders
 * @formNo 211
 */
function form211_header_ini()
{
	$('#form211_body').html("");
	
	var fields=document.getElementById('form211_master');
	
	var drs_filter=fields.elements['drs'];
	var status_filter=fields.elements['status'];
	var remark_filter=fields.elements['remark'];
	var awb_filter=fields.elements['awb_num'];
	var save_button=fields.elements['save'];

	drs_filter.value="";
	$(drs_filter).focus();

	set_static_value_list('logistics_orders','status',status_filter);

	$(awb_filter).off('keydown');
	$(awb_filter).on('keydown',function (event) 
	{
		if(event.keyCode == 13) 
		{
	    	event.preventDefault();
	    	var subform=document.getElementById('form211_'+awb_filter.value);
	    	subform.elements[2].value=status_filter.value;
	    	subform.elements[3].value=remark_filter.value;
	    	form211_get_totals();
	    	awb_filter.value="";
	    }
	});
	
	$(drs_filter).off('keydown');
	$(drs_filter).on('keydown',function (event) 
	{
		if(event.keyCode == 13) 
		{
	    	event.preventDefault();
	    	form211_ini();
	    }
	});
/*
	$(status_filter).off('blur');
	$(status_filter).on('blur',function () 
	{
		$("[id^='save_form211']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			subform.elements[2].value=status_filter.value;
		});
	});
	
	$(remark_filter).off('blur');
	$(remark_filter).on('blur',function () 
	{
		$("[id^='save_form211']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			subform.elements[3].value=remark_filter.value;
		});		
	});
*/	
/*
	$(refresh_button).off('click');
	$(refresh_button).on("click", function(event)
	{
		event.preventDefault();
		form211_ini();
	});
*/
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		$("[id^='save_form211_']").click();
	});
}

/**
 * @form Update Logisitcs Orders (branches)
 * @formNo 212
 */
function form212_header_ini()
{
	$('#form212_body').html("");
}


/**
 * @form Create manifest
 * @formNo 215
 */
function form215_header_ini()
{
	var fields=document.getElementById('form215_master');

	var man_filter=fields.elements['man_num'];
	var man_date=fields.elements['date'];

	fields.elements['id'].value=get_new_key();

	var save_button=fields.elements['save'];
	man_filter.value="";
	
	var man_id=$("#form215_link").attr('data_id');
	if(man_id==null)
		man_id="";	

	if(man_id=="")
	{
		var man_num_data="<user_preferences count='1'>"+
						"<value></value>"+
						"<name exact='yes'>drs_num</name>"+
						"</user_preferences>";
		set_my_value(man_num_data,man_filter);	
	}
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form215_update_form();
	});

	$(save_button).hide();
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form215_add_item();
	});
	
	$(man_date).datepicker();
	man_date.value=get_my_date();
	$('#form215_share').hide();
}



/**
 * @form SKU mapping (Supplier)
 * @formNo 217
 */
function form217_header_ini()
{
	var filter_fields=document.getElementById('form217_header');
	var supplier_filter=filter_fields.elements[0];
	var product_filter=filter_fields.elements[1];
	var supplier_sku_filter=filter_fields.elements[2];
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var supplier_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	var supplier_sku_data="<supplier_item_mapping>" +
			"<supplier_sku></supplier_sku>" +
			"</supplier_item_mapping>";
	
	set_my_filter(product_data,product_filter);
	set_my_filter(supplier_data,supplier_filter);
	set_my_filter(supplier_sku_data,supplier_sku_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form217_ini();
	});
	
	var import_button=filter_fields.elements['import'];
	$(import_button).off('click');	
	$(import_button).on('click',function () 
	{
		import_data('form217');
	});
	
};

/**
 * @form Launch contact form
 * @formNo 218
 */
function form218_header_ini()
{
	var domain=get_domain();
	var url="./f/s.html?d="+domain+"&r=y";
	window.open(url,'_blank');
};

/**
 * @form Create COD Drs
 * @formNo 219
 */
function form219_header_ini()
{
	var fields=document.getElementById('form219_master');

	var drs_filter=fields.elements['drs_num'];
	var employee=fields.elements['employee'];
	var drs_date=fields.elements['date'];
	var total_cod=fields.elements['total'];
	var collected_cod=fields.elements['collected'];
	var branch=fields.elements['branch'];
	
	fields.elements['saved'].value='no';
	fields.elements['id'].value=get_new_key();
	
	var save_button=fields.elements['save'];
	drs_filter.value="";
	employee.value="";
	
	var drs_id=$("#form219_link").attr('data_id');
	if(drs_id==null)
		drs_id="";	
		
	if(drs_id=="")
	{	
		var drs_num_data="<user_preferences count='1'>"+
						"<value></value>"+
						"<name exact='yes'>drs_num</name>"+
						"</user_preferences>";
		set_my_value(drs_num_data,drs_filter);	
	}
		
	var acc_name=get_account_name();
	var branch_data="<store_areas count='1'>"+
					"<name></name>"+
					"<owner>"+acc_name+"</owner>"+
					"</store_areas>";
	
	set_my_value(branch_data,branch);
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form219_update_form();
	});

	$(save_button).hide();
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		//modal129_action();
		form219_add_item();
	});

	var employee_data="<staff>" +
		"<acc_name></acc_name>" +
		"</staff>";
	set_my_value_list(employee_data,employee,function () 
	{
		$(employee).focus();
	});
	
	$(drs_date).datepicker();
	drs_date.value=get_my_date();
	$('#form219_share').hide();
}

/**
 * @form New Purchase Order (Aurilion)
 * @formNo 222
 */
function form222_header_ini()
{
	var fields=document.getElementById('form222_master');
	
	var supplier_filter=fields.elements['supplier'];
	var order_date=fields.elements['date'];
	var order_num=fields.elements['order_num'];
	var status_filter=fields.elements['status'];
	fields.elements['order_id'].value=get_new_key();
	var save_button=fields.elements['save'];
	var share_button=fields.elements['share'];	
	
	$(share_button).hide();
	
	var po_id=$("#form222_link").attr('data_id');
	if(po_id==null || po_id=='')
	{
		var po_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>po_num</name>"+
							"</user_preferences>";
		set_my_value(po_num_data,order_num);
	}
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form222_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form222_add_item();
	});

	var add_supplier=document.getElementById('form222_add_supplier');
	$(add_supplier).off('click');
	$(add_supplier).on('click',function()
	{
		modal13_action(function()
		{
			var supplier_data="<suppliers>" +
				"<acc_name></acc_name>" +
				"</suppliers>";	
			set_my_value_list(supplier_data,supplier_filter);
		});
	});

	var supplier_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";	
	set_my_value_list(supplier_data,supplier_filter,function () 
	{
		$(supplier_filter).focus();
	});
	
	$(order_date).datepicker();
	order_date.value=get_my_date();
	set_static_filter('purchase_orders','status',status_filter);
	status_filter.value='draft';
	supplier_filter.value='';
}

/**
 * @form Manage Purchase Orders (aurilion)
 * @formNo 223
 */
function form223_header_ini()
{
	var filter_fields=document.getElementById('form223_header');
	var order_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
		
	var order_data="<purchase_orders>" +
			"<order_num></order_num>" +
			"</purchase_orders>";
	var name_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form223_ini();
	});

	set_my_filter(order_data,order_filter);
	set_my_filter(name_data,name_filter);
	set_static_filter('purchase_orders','status',status_filter);
};



/**
 * @form Delivery Run
 * @formNo 226
 */
function form226_header_ini()
{
	var filter_fields=document.getElementById('form226_header');
	var person_filter=filter_fields.elements[0];
	var date_filter=filter_fields.elements[1];
		
	var person_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form226_ini();
	});

	set_my_filter(person_data,person_filter);
	
	$(date_filter).datepicker();
};

/**
 * @form Inventory Warehouse
 * @formNo 227
 */
function form227_header_ini()
{
	var filter_fields=document.getElementById('form227_header');	
	var item_filter=filter_fields.elements[0];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form227_ini();
	});
	//setting autocompletes 
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	set_my_filter(products_data,item_filter);
};

/**
 * @form Inventory Demo
 * @formNo 228
 */
function form228_header_ini()
{
	var filter_fields=document.getElementById('form228_header');	
	var item_filter=filter_fields.elements[0];
	var customer_filter=filter_fields.elements[1];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form228_ini();
	});
	//setting autocompletes 
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	set_my_filter(products_data,item_filter);

	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(customer_data,customer_filter);
};

/**
 * @form Inventory Hiring
 * @formNo 229
 */
function form229_header_ini()
{
	var filter_fields=document.getElementById('form229_header');	
	var item_filter=filter_fields.elements[0];
	var customer_filter=filter_fields.elements[1];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form229_ini();
	});
	//setting autocompletes 
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	set_my_filter(products_data,item_filter);

	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(customer_data,customer_filter);

};

/**
 * @form In-out
 * @formNo 230
 */
function form230_header_ini()
{
	var filter_fields=document.getElementById('form230_header');	
	var item_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var for_filter=filter_fields.elements[2];
	var customer_filter=filter_fields.elements[3];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form230_ini();
	});
	//setting autocompletes 
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	set_my_filter(products_data,item_filter);	

	set_static_filter('bill_items','issue_type',type_filter);
	set_static_filter('bill_items','hiring_type',for_filter);
	
	var customer_data="<customers>"+
					"<acc_name></acc_name>"+
					"</customers>";
	set_my_filter(customer_data,customer_filter);
};

/**
 * @form Create Prescription
 * @formNo 231
 */
function form231_header_ini()
{
	var fields=document.getElementById('form231_master');
	
	var patient_filter=fields.elements['patient'];
	var doctor_filter=fields.elements['doctor'];
	var num_filter=fields.elements['p_num'];
	var date_filter=fields.elements['date'];
	var next_filter=fields.elements['next'];
	fields.elements['pres_id'].value=get_new_key();
	var save_button=fields.elements['save'];
	var age_filter=fields.elements['age'];
	var sex_filter=fields.elements['sex'];
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form231_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form231_add_item();
	});
	
	var pres_id=$("#form231_link").attr('data_id');
	if(pres_id==null || pres_id=='')
	{
		var pres_num_data="<user_preferences count='1'>"+
						"<value></value>"+
						"<name exact='yes'>pres_num</name>"+
						"</user_preferences>";
		set_my_value(pres_num_data,num_filter);	
	}

	$(date_filter).datepicker();
	$(next_filter).datepicker();
	date_filter.value=get_my_date();
	
	var patient_data="<customers>"+
					"<acc_name></acc_name>"+
					"</customers>";	
	set_my_value_list(patient_data,patient_filter,function () 
	{
		$(patient_filter).focus();
	});
	
	var add_patient=document.getElementById('form231_add_customer');
	$(add_patient).off('click');
	$(add_patient).on('click',function()
	{
		modal11_action(function()
		{	
			var customers_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";
			set_my_value_list(customers_data,patient_filter);
		});
	});

	$(patient_filter).on('blur',function () 
	{
		var age_data="<attributes>"+
					"<value></value>"+
					"<attribute exact='yes'>Age</attribute>"+
					"<type exact='yes'>customer</type>"+
					"<name exact='yes'>"+patient_filter.value+"</name>"+
					"</attributes>";
		set_my_value(age_data,age_filter);							

		var sex_data="<attributes>"+
					"<value></value>"+
					"<attribute exact='yes'>Sex</attribute>"+
					"<type exact='yes'>customer</type>"+
					"<name exact='yes'>"+patient_filter.value+"</name>"+
					"</attributes>";
		set_my_value(sex_data,sex_filter);							
	});
	
	var doctor_data="<staff>"+
					"<acc_name></acc_name>"+
					"</staff>";	
	set_my_value_list(doctor_data,doctor_filter,function () 
	{
		doctor_filter.value=get_account_name();
	});
}

/**
 * @form Manage Prescriptions
 * @formNo 232
 */
function form232_header_ini()
{
	var filter_fields=document.getElementById('form232_header');
	var num_filter=filter_fields.elements[0];
	var doctor_filter=filter_fields.elements[1];
	var patient_filter=filter_fields.elements[2];
	
	var num_data="<prescriptions>" +
			"<p_num></p_num>" +
			"</prescriptions>";
	set_my_filter(num_data,num_filter);
	
	var doctor_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	set_my_filter(doctor_data,doctor_filter);
	
	var patient_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(patient_data,patient_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form232_ini();
	});
};

/**
 * @form Newsletter Creator
 * @formNo 233
 */
function form233_header_ini()
{
	$('#form233_navigation').html("");
	$('#form233_section').html("");
	
	var master_form=document.getElementById('form233_form');
	master_form.elements['name'].value="";
	master_form.elements['description'].value="";
	master_form.elements['id'].value=get_new_key();
	master_form.elements['pic_url'].value="";
	
	$(master_form).off('submit');
	$(master_form).on('submit',function (e) 
	{
		e.preventDefault();
		form233_create_item();
	});
	
	/***************** Add buttons for text formatting ***************************/
    //Button for making text bold
    add_button_4_txt_formatting('form233_navigation','b',    'Make the selected text bold', '<b>B</b>');
    add_button_4_txt_formatting('form233_navigation','i',    'Italicize the selected text', '<i>I</i>');
    add_button_4_txt_formatting('form233_navigation','ins',  'Underline the selected text', '<ins>U</ins>');
    add_button_4_txt_formatting('form233_navigation','mark', 'Highlight  the selected text', '<mark>H</mark>' );
    add_button_4_txt_formatting('form233_navigation','del',  'Strikethrough the selected text', '<del>ABC</del>');
    add_button_4_txt_formatting('form233_navigation','sub',  'Subscript', 'X<sub>2</sub>');
    add_button_4_txt_formatting('form233_navigation','sup',  'Superscript', 'X<sup>2</sup>');
    add_button_4_txt_formatting('form233_navigation','small', 'Reduce font for selected text', '<small>ABC</small>');
    
    add_font_selection_button('form233_navigation'); 
    add_color_selection_button('form233_navigation');
    add_outline_border_selection_button('form233_navigation'); 
    add_outline_color_selection_button('form233_navigation'); 
    add_outline_width_selection_button('form233_navigation'); 

   	/***************** Add buttons for text formatting ***************************/

    /* Call click method for file type input when picture button is clicked */
    $("#form233_image_input").hide();

	$("#form233_image_button").off('click');
    $("#form233_image_button").on('click',function() {
        $("#form233_image_input").trigger('click');		 
    });

    //Handle file selection by file type input. The problem is to make
    $("#form233_image_input").off("change");
    $("#form233_image_input").on("change", function(evt)
    {
    	//console.log(evt);
        select_document(evt,function(dataURL)
        {
			//var unique_id="vyavsaay_picture_box"+Math.round(Math.random()*100);
   
            //var new_div_elem = document.createElement("div");
            //new_div_elem.setAttribute("style", "margin:5px;float:left;width:100px; height:100px;");
	    	//new_div_elem.setAttribute("onclick", "set_html_elem_4_del(this)")
			//new_div_elem.setAttribute("class", "draggable-containment");

            var new_elem = document.createElement("img");
            new_elem.setAttribute("onclick", "set_html_elem_4_del(this);");
			new_elem.setAttribute("id","vyavsaay_image_box_"+Math.round(Math.random()*10000));
            new_elem.setAttribute("src", dataURL);
            new_elem.setAttribute("class", "ui-widget-content");
            new_elem.setAttribute("alt", "Image Not Found");
            new_elem.setAttribute("style", "float:left;margin:5px;width:100px; height:100px;");
			new_elem.setAttribute("class", "resizable-aspect-ratio");

            //$('#form233_section').append(new_div_elem);
	    	//$(new_div_elem).append(new_elem);

			$('#form233_section').append(new_elem);
		    $(new_elem).resizable({aspectRatio:true});
            //$(new_div_elem).draggable({ containment: "window" });
        });
    });
};

/**
 * @form Manage Products (without tax)
 * @formNo 234
 */
function form234_header_ini()
{
	var filter_fields=document.getElementById('form234_header');
	var name_filter=filter_fields.elements[0];
	var make_filter=filter_fields.elements[1];
	var add_filter=filter_fields.elements[2];

	$(add_filter).off('click'); 	
	$(add_filter).on('click',function () 
	{
		modal174_action();
	});
	
	var make_data="<product_master>" +
			"<make></make>" +
			"</product_master>";
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	set_my_filter(make_data,make_filter);
	set_my_filter(products_data,name_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form234_ini();
	});
};


/**
 * @form Manage Products (Grid)
 * @formNo 235
 */
function form235_header_ini()
{
	var filter_fields=document.getElementById('form235_header');
	var name_filter=filter_fields.elements[1];
	var make_filter=filter_fields.elements[2];
	var add_filter=filter_fields.elements[3];

	$(add_filter).off('click'); 	
	$(add_filter).on('click',function () 
	{
		if(!is_read_access('form1') && !is_read_access('form155') && !is_read_access('form207') && !is_read_access('form183'))
		{
			modal112_action();
		}
		else
		{
			modal14_action();
		}
	});
	
	var make_data="<product_master>" +
			"<make></make>" +
			"</product_master>";
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	set_my_filter(make_data,make_filter);
	set_my_filter(products_data,name_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form235_ini();
	});
};

/**
 * @form Manage Manifests
 * @formNo 236
 */
function form236_header_ini()
{
	var filter_fields=document.getElementById('form236_header');
	var man_filter=filter_fields.elements[0];
	var date_filter=filter_fields.elements[1];
		
	var man_data="<drs>" +
			"<drs_num></drs_num>" +
			"</drs>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form236_ini();
	});

	set_my_filter(man_data,man_filter);
	
	$(date_filter).datepicker();
};


/**
 * @form Add stock
 * @formNo 244
 */
function form244_header_ini()
{
	var fields=document.getElementById('form244_master');
	
	var storage_filter=fields.elements['storage'];
	var quantity_filter=fields.elements['q_scanned'];
	var save_button=fields.elements['save'];
	//var barcode_button=fields.elements['barcode'];

	storage_filter.value="";	
	quantity_filter.value=0;	
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form244_update_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form244_add_item();
	});
	
	var storage_data="<store_areas>"+
					"<name></name>"+
					"<area_type></area_type>"+
					"</store_areas>";
	set_my_value_list_func(storage_data,storage_filter,function()
	{
		$(storage_filter).focus();
	});

	var head_html="<tr><form id='form244_header'></form>"+
					"<th>Barcode</th>"+
					"<th>Item</th>"+
					"<th>Batch</th>"+					
					"<th>Quantity</th>"+					
					"<th><input type='button' form='form244_header' title='Add item' class='add_icon' onclick='form244_add_item();'></th>"+
					"</tr>";
	$('#form244_head').html(head_html);
	$('#form244_body').html("");
	$('#form244_head').parent().attr('class','rwd-table');

}

/**
 * @form SKU Components
 * @formNo 245
 */
function form245_header_ini()
{
	var fields=document.getElementById('form245_master');
	
	var item_filter=fields.elements['item_name'];
	var save_button=fields.elements['save'];
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form245_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form245_ini();
	});

	var item_data="<product_master>" +
		"<name></name>" +
		"</product_master>";
	set_my_value_list(item_data,item_filter,function () 
	{
		$(item_filter).focus();
	});
	
	$(item_filter).off('blur');
	$(item_filter).on('blur',function()
	{
		var inv_data="<product_instances>"+
					"<product_name exact='yes'>"+item_filter.value+"</product_name>"+
					"</product_instances>";
		get_single_column_data(function(invs)
		{
			if(invs.length>0)
			{
				$("#modal75_link").click();
			}
		},inv_data);
	});
	item_filter.value='';
	
	$('#form245_body').html("");
}

/**
 * @form Transfer Zones
 * @formNo 246
 */
function form246_header_ini()
{
	var filter_fields=document.getElementById('form246_header');
	var zone_filter=filter_fields.elements[0];
	
	var zone_data="<transfer_zones>" +
			"<name></name>" +
			"</transfer_zones>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form246_ini();
	});

	set_my_filter(zone_data,zone_filter);
};

/**
 * @form Manage pincodes
 * @formNo 247
 */
function form247_header_ini()
{
	var filter_fields=document.getElementById('form247_header');
	var code_filter=filter_fields.elements[0];
	var zone_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var code_data="<pincodes>" +
			"<pincode></pincode>" +
			"</pincodes>";
	var zone_data="<transfer_zones>" +
			"<name></name>" +
			"</transfer_zones>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form247_ini();
	});

	set_my_filter(code_data,code_filter);
	set_my_filter(zone_data,zone_filter);
	
	set_static_filter('pincodes','status',status_filter);
};

/**
 * @form Create Transit bag
 * @formNo 248
 */
function form248_header_ini()
{
	var fields=document.getElementById('form248_master');

	var bag_filter=fields.elements['bag_num'];
	var lbh=fields.elements['lbh'];
	var date=fields.elements['date'];
	var weight=fields.elements['weight'];
	var branch=fields.elements['branch'];
	
	branch.removeAttribute('readonly');	
	
	fields.elements['saved'].value='no';
	fields.elements['id'].value=get_new_key();

	var branch_data="<store_areas><name></name></store_areas>";
	set_my_value_list(branch_data,branch);	
	
	var save_button=fields.elements['save'];
	bag_filter.value="";
	lbh.value="";
	weight.value="";
	$(date).datepicker();
	date.value=get_my_date();

	var bag_id=$("#form248_link").attr('data_id');
	if(bag_id==null)
		bag_id="";	

	if(bag_id=="")
	{
		var bag_num_data="<user_preferences count='1'>"+
						"<value></value>"+
						"<name exact='yes'>bag_num</name>"+
						"</user_preferences>";
		set_my_value(bag_num_data,bag_filter);	
	}
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form248_update_form();
	});

	$(save_button).hide();
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		//modal129_action();
		form248_add_item();
	});

}

/**
 * @form Manage Transit bag
 * @formNo 249
 */
function form249_header_ini()
{
	var filter_fields=document.getElementById('form249_header');
	var bag_filter=filter_fields.elements[0];
	var date_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
		
	var bag_data="<transit_bags>" +
			"<bag_num></bag_num>" +
			"</transit_bags>";
			
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form249_ini();
	});

	set_my_filter(bag_data,bag_filter);
	$(date_filter).datepicker();
		
	set_static_filter('transit_bags','status',status_filter);
};

/**
 * @form Create MTS
 * @formNo 250
 */
function form250_header_ini()
{
	var fields=document.getElementById('form250_master');

	var mts_filter=fields.elements['mts_num'];
	var num_orders=fields.elements['num_orders'];
	var num_bags=fields.elements['num_bags'];
	var date=fields.elements['date'];
	var weight=fields.elements['weight'];
	var branch=fields.elements['branch'];
	
	fields.elements['saved'].value='no';
	fields.elements['id'].value=get_new_key();

	var save_button=fields.elements['save'];
	mts_filter.value="";
	num_orders.value="";
	num_bags.value="";
	branch.value="";
	weight.value="";
	$(date).datepicker();
	date.value=get_my_date();

	var mts_id=$("#form250_link").attr('data_id');
	if(mts_id==null)
		mts_id="";	

	if(mts_id=="")
	{
		var mts_num_data="<user_preferences count='1'>"+
						"<value></value>"+
						"<name exact='yes'>mts_num</name>"+
						"</user_preferences>";
		set_my_value(mts_num_data,mts_filter);	
	}

	var branch_data="<store_areas>"+
					"<name></name>"+
					"</store_areas>";
	set_my_value_list(branch_data,branch);
						
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form250_update_form();
	});

	$(save_button).hide();
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form250_add_item();
	});

	$('#form250_share').hide();
}

/**
 * @form Manage MTS
 * @formNo 251
 */
function form251_header_ini()
{
	var filter_fields=document.getElementById('form251_header');
	var mts_filter=filter_fields.elements[0];
	var date_filter=filter_fields.elements[1];
	var branch_filter=filter_fields.elements[2];
		
	var mts_data="<mts>" +
			"<mts_num></mts_num>" +
			"</mts>";
			
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form251_ini();
	});

	set_my_filter(mts_data,mts_filter);
	$(date_filter).datepicker();

	var branch_data="<store_areas>"+
					"<name></name>"+
					"</store_areas>";
	set_my_filter(branch_data,branch_filter);
};

/**
 * @form Vendor leads
 * @formNo 252
 */
function form252_header_ini()
{
	var filter_fields=document.getElementById('form252_header');	
	var names_filter=filter_fields.elements[0];
	var identified_filter=filter_fields.elements[1];

	//setting autocompletes 
	var names_data="<attributes>" +
			"<name></name>" +
			"<type exact='yes'>customer</type>"+
			"<attribute exact='yes'>Support Type</attribute>"+
			"<value exact='yes'>Vendor</value>"+
			"</attributes>";

	set_my_filter(names_data,names_filter);

	//setting autocompletes 
	var identified_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	set_my_filter(names_data,names_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form252_ini();
	});	
}

/**
 * @form Customer leads
 * @formNo 253
 */
function form253_header_ini()
{
	var filter_fields=document.getElementById('form253_header');	
	var names_filter=filter_fields.elements[0];
	var identified_filter=filter_fields.elements[1];

	//setting autocompletes 
	var names_data="<attributes>" +
			"<name></name>" +
			"<type exact='yes'>customer</type>"+
			"<attribute exact='yes'>Support Type</attribute>"+
			"<value exact='yes'>Customer</value>"+
			"</attributes>";

	set_my_filter(names_data,names_filter);

	//setting autocompletes 
	var identified_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	set_my_filter(names_data,names_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form253_ini();
	});	
}

/**
 * @form Telecalling leads
 * @formNo 254
 */
function form254_header_ini()
{
	var filter_fields=document.getElementById('form254_header');	
	var names_filter=filter_fields.elements[0];
	var identified_filter=filter_fields.elements[1];

	//setting autocompletes 
	var names_data="<attributes>" +
			"<name></name>" +
			"<type exact='yes'>customer</type>"+
			"<attribute exact='yes'>Support Type</attribute>"+
			"<value exact='yes'>Telecalling</value>"+
			"</attributes>";

	set_my_filter(names_data,names_filter);

	//setting autocompletes 
	var identified_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	set_my_filter(names_data,names_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form254_ini();
	});	
}

/**
 * @form Marketing leads
 * @formNo 255
 */
function form255_header_ini()
{
	var filter_fields=document.getElementById('form255_header');	
	var names_filter=filter_fields.elements[0];
	var identified_filter=filter_fields.elements[1];

	//setting autocompletes 
	var names_data="<attributes>" +
			"<name></name>" +
			"<type exact='yes'>customer</type>"+
			"<attribute exact='yes'>Support Type</attribute>"+
			"<value exact='yes'>Marketing</value>"+
			"</attributes>";

	set_my_filter(names_data,names_filter);

	//setting autocompletes 
	var identified_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	set_my_filter(names_data,names_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form255_ini();
	});	
}


/**
 * @form Quotation Details
 * @formNo 258
 */
function form258_header_ini()
{
	var fields=document.getElementById('form258_master');
	
	var customer_filter=fields.elements['customer'];
	var type_filter=fields.elements['type'];
	var quot_num=fields.elements['quot_num'];
	var date_filter=fields.elements['date'];
	var valid_filter=fields.elements['valid'];
	//var tax_filter=fields.elements['tax'];
	var status_filter=fields.elements['status'];
	var issued_filter=fields.elements['issued'];
	var address_filter=fields.elements['address'];
	var email_filter=fields.elements['email'];
	var id_filter=fields.elements['id'];
	var save_button=fields.elements['save'];
	var share_button=fields.elements['share'];

	$(share_button).off('click');

	id_filter.value=get_new_key();
	customer_filter.value='';
	quot_num.value="";
	//tax_filter.value='';
	status_filter.value='draft';
	type_filter.value='';
	issued_filter.value='';
	address_filter.value='';
	
	$(date_filter).datepicker();
	$(valid_filter).datepicker();
	date_filter.value=get_my_date();
	valid_filter.value="";

	set_static_value_list('quotation','type',type_filter);
	set_static_value_list('quotation','status',status_filter);
	
	var staff_data="<staff>"+
					"<acc_name></acc_name>"+
					"</staff>";
	set_my_value_list(staff_data,issued_filter);
	
	$(customer_filter).off('blur');
	$(customer_filter).on('blur',function () 
	{
		var address_data="<customers>"+
						"<address></address>"+
						"<city></city>"+
						"<pincode></pincode>"+
						"<email></email>"+
						"<acc_name exact='yes'>"+customer_filter.value+"</acc_name>"+
						"</customers>";
		fetch_requested_data('',address_data,function (addresses) 
		{
			if(addresses.length>0)
			{
				address_filter.value=addresses[0].address+", "+addresses[0].city+", "+addresses[0].pincode;
				email_filter.value=addresses[0].email;
			}
			else 
			{
				address_filter.value="";
				email_filter.value="";
			}
		});				
	});

	var quot_id=$("#form258_link").attr('data_id');
	if(quot_id==null || quot_id=="")
	{		
		var quot_num_data="<user_preferences count='1'>"+
				"<value></value>"+
				"<name exact='yes'>quotation_num</name>"+
				"</user_preferences>";
		set_my_value(quot_num_data,quot_num,function()
		{
			quot_num.value=get_session_var('quot_num_prefix')+"-"+quot_num.value;
		});
	}
			
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form258_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form258_add_item();
	});
	
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	
	set_my_value_list(customers_data,customer_filter,function () 
	{
		$(customer_filter).focus();
	});
	
	var add_customer=document.getElementById('form258_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{	
			var customer_data="<customer>" +
				"<acc_name></acc_name>" +
				"</customer>";			
			set_my_value_list(customer_data,customer_filter);
		});
	});

	//////////terms and conditions///////////
	var payment_tc=get_session_var('payment_tc');
	var delivery_tc=get_session_var('delivery_tc');
	var warranty_tc=get_session_var('warranty_tc');
	
	var tc_array=[];
	var p_tc_array=payment_tc.split("\n");
	var d_tc_array=delivery_tc.split("\n");
	var w_tc_array=warranty_tc.split("\n");
	
	p_tc_array.forEach(function (p_tc) 
	{
		var p_obj=new Object();
		p_obj.type='Payment';
		p_obj.tc=p_tc;
		tc_array.push(p_obj);
	});

	d_tc_array.forEach(function (d_tc) 
	{
		var p_obj=new Object();
		p_obj.type='Delivery';
		p_obj.tc=d_tc;
		tc_array.push(p_obj);
	});

	w_tc_array.forEach(function (w_tc) 
	{
		var p_obj=new Object();
		p_obj.type='Warranty';
		p_obj.tc=w_tc;
		tc_array.push(p_obj);
	});
	
	var tc_counter=0;
	var tc_id=get_new_key();
	var rowsHTML="";
	tc_array.forEach(function (tc) 
	{
		var id=tc_id+tc_counter;
		tc_counter+=1;
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form258_tc_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='S.No.'>";
			rowsHTML+=tc_counter;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Type'>";
				rowsHTML+="<input type='text' readonly='readonly' form='form258_tc_"+id+"' value='"+tc.type+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='T&C'>";
				rowsHTML+="<textarea required readonly='readonly' form='form258_tc_"+id+"'>"+tc.tc+"</textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form258_tc_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form258_tc_"+id+"' id='save_form258_tc_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form258_tc_"+id+"' id='delete_form258_tc_"+id+"' onclick='$(this).parent().parent().remove(); form258_get_totals();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";
	});
	
	$('#form258_tc_body').html(rowsHTML);

	////////////show hide specifications////////////////////////////////
	var spec_checkbox=document.getElementById('checkbox_form258_spec');
	$(spec_checkbox).off('click');
	$(spec_checkbox).on('click',function () 
	{
		if(spec_checkbox.checked)
		{
			var name_string="--";
			
			$("[id^='save_form258_item_']").each(function(index)
			{
				var subform_id=$(this).attr('form');
				var subform=document.getElementById(subform_id);
		
				name_string+=subform.elements[0].value+"--";
			});
			
			var attributes_data="<attributes>"+
								"<id></id>"+
								"<value></value>"+
								"<name array='yes'>"+name_string+"</name>"+
								"<attribute exact='yes'>Specification</attribute>"+
								"</attributes>";
			fetch_requested_data('',attributes_data,function (attributes) 
			{
				attributes.forEach(function (attribute) 
				{
					var spec_split=attribute.value.split(":");
					var id=attribute.id;
					var	spec_rowsHTML="<tr>";
						spec_rowsHTML+="<form id='form258_spec_"+id+"' autocomplete='off'></form>";
							spec_rowsHTML+="<td data-th='S.No.'>";
							spec_rowsHTML+="</td>";
							//spec_rowsHTML+="<td data-th='Item'>";
							//	spec_rowsHTML+="<input type='text' readonly='readonly' form='form258_spec_"+id+"' value='"+attribute.name+"'>";
							//spec_rowsHTML+="</td>";
							spec_rowsHTML+="<td data-th='Type'>";
								spec_rowsHTML+="<input type='text' readonly='readonly' form='form258_spec_"+id+"' value='"+spec_split[0]+"'>";
							spec_rowsHTML+="</td>";
							spec_rowsHTML+="<td data-th='Specification'>";
								spec_rowsHTML+="<textarea form='form258_spec_"+id+"' readonly='readonly'>"+spec_split[1]+"</textarea>";
							spec_rowsHTML+="</td>";
							spec_rowsHTML+="<td data-th='Action'>";
								spec_rowsHTML+="<input type='hidden' form='form258_spec_"+id+"' value='"+id+"'>";
								spec_rowsHTML+="<input type='button' class='submit_hidden' form='form258_spec_"+id+"' id='save_form258_spec_"+id+"' >";
								spec_rowsHTML+="<input type='button' class='delete_icon' form='form258_spec_"+id+"' id='delete_form258_spec_"+id+"' onclick='$(this).parent().parent().remove();form258_get_totals();'>";
							spec_rowsHTML+="</td>";
						spec_rowsHTML+="</tr>";
					$('#form258_spec_body').append(spec_rowsHTML);
				});
				form258_get_totals();
			});					
		}
		else 
		{
			$('#form258_spec_body').html('');
		}
	});
}


/**
 * @form Manage Quotation (NVS)
 * @formNo 259
 */
function form259_header_ini()
{
	var filter_fields=document.getElementById('form259_header');
	var quot_filter=filter_fields.elements[0];
	var cust_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form259_ini();
	});

	var quot_data="<quotation>" +
			"<quot_num></quot_num>" +
			"</quotation>";
	var cust_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(quot_data,quot_filter);
	set_my_filter(cust_data,cust_filter);
	set_static_filter('quotation','status',status_filter);
};

/**
 * @form Inventory (Spares)
 * @formNo 260
 */
function form260_header_ini()
{
	var filter_fields=document.getElementById('form260_header');	
	var name_filter=filter_fields.elements[0];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form260_ini();
	});

	var item_data="<attributes>" +
		"<name></name>" +
		"<type exact='yes'>product</type>"+
		"<value exact='yes'>yes</value>"+
		"<attribute exact='yes'>Spare Part</attribute>"+
		"</attributes>";	
	set_my_filter(item_data,name_filter);
};

/**
 * @form Bank Accounts
 * @formNo 261
 */
function form261_header_ini()
{
	var filter_fields=document.getElementById('form261_header');	
	var name_filter=filter_fields.elements[0];
	var bank_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	//setting autocompletes 
	var name_data="<bank_accounts>" +
			"<name></name>" +
			"</bank_accounts>";
	set_my_filter(name_data,name_filter);

	var bank_data="<bank_accounts>" +
			"<bank></bank>" +
			"</bank_accounts>";
	set_my_filter(bank_data,bank_filter);
	
	set_static_filter('bank_accounts','status',status_filter);	
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form261_ini();
	});	
}


/**
 * @form Create RTO
 * @formNo 265
 */
function form265_header_ini()
{
	var fields=document.getElementById('form265_master');

	var rto_filter=fields.elements['rto_num'];
	var employee=fields.elements['employee'];
	var rto_date=fields.elements['date'];
	var branch=fields.elements['branch'];

	fields.elements['saved'].value='no';
	fields.elements['id'].value=get_new_key();

	var save_button=fields.elements['save'];
	rto_filter.value="";
	employee.value="";

	var rto_id=$("#form265_link").attr('data_id');
	if(rto_id==null)
		rto_id="";	

	if(rto_id=="")
	{
		var rto_num_data="<user_preferences count='1'>"+
						"<value></value>"+
						"<name exact='yes'>rto_num</name>"+
						"</user_preferences>";
		set_my_value(rto_num_data,rto_filter);	
	}
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form265_update_form();
	});

	$(save_button).hide();
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	var acc_name=get_account_name();
	var branch_data="<store_areas count='1'>"+
					"<name></name>"+
					"<owner>"+acc_name+"</owner>"+
					"</store_areas>";
	
	set_my_value(branch_data,branch);
	
	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		//modal129_action();
		form265_add_item();
	});

	var employee_data="<staff>" +
		"<acc_name></acc_name>" +
		"</staff>";
	set_my_value_list(employee_data,employee,function () 
	{
		$(employee).focus();
	});
	
	$(rto_date).datepicker();
	rto_date.value=get_my_date();
	$('#form265_share').hide();
}

/**
 * @form Manage RTO
 * @formNo 266
 */
function form266_header_ini()
{
	var filter_fields=document.getElementById('form266_header');
	var rto_filter=filter_fields.elements[0];
	var employee_filter=filter_fields.elements[1];
	var date_filter=filter_fields.elements[2];
		
	var rto_data="<rto>" +
			"<rto_num></rto_num>" +
			"</rto>";
	var employee_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form266_ini();
	});

	set_my_filter(rto_data,rto_filter);
	set_my_filter(employee_data,employee_filter);
	$(date_filter).datepicker();
};

/**
 * @form RTO Status
 * @formNo 267
 */
function form267_header_ini()
{
	$('#form267_body').html("");
	
	var fields=document.getElementById('form267_master');
	
	var rto_filter=fields.elements['rto'];
	var status_filter=fields.elements['status'];
	var remark_filter=fields.elements['remark'];
	var awb_filter=fields.elements['awb_num'];
	var save_button=fields.elements['save'];

	rto_filter.value="";
	$(rto_filter).focus();

	set_static_value_list('logistics_orders','status',status_filter);

	$(awb_filter).off('keydown');
	$(awb_filter).on('keydown',function (event) 
	{
		if(event.keyCode == 13) 
		{
	    	event.preventDefault();
	    	var subform=document.getElementById('form267_'+awb_filter.value);
	    	subform.elements[2].value=status_filter.value;
	    	subform.elements[3].value=remark_filter.value;
	    	form267_get_totals();
	    	awb_filter.value="";
	    }
	});
	
	$(rto_filter).off('keydown');
	$(rto_filter).on('keydown',function (event) 
	{
		if(event.keyCode == 13) 
		{
	    	event.preventDefault();
	    	form267_ini();
	    }
	});

	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		$("[id^='save_form267_']").click();
	});
}

/**
 * @form Delivery Challan Details
 * @formNo 268
 */
function form268_header_ini()
{
	var fields=document.getElementById('form268_master');
	
	var customer_filter=fields.elements['customer'];
	var challan_date=fields.elements['date'];
	var challan_num=fields.elements['challan_num'];
	var awb_num=fields.elements['awb_num'];
	var vehicle_num=fields.elements['vehicle_num'];
	var type_filter=fields.elements['type'];
	//var status_filter=fields.elements['status'];
	var prepared_filter=fields.elements['prepared'];
	var address_filter=fields.elements['address'];
	var id_filter=fields.elements['id'];
	var save_button=fields.elements['save'];
	var share_button=fields.elements['share'];

	$(share_button).off('click');
	
	id_filter.value=get_new_key();
	customer_filter.value='';
	challan_num.value="";
	awb_num.value='';
	vehicle_num.value='';
	type_filter.value='';
	prepared_filter.value='';
	address_filter.value='';
	//status_filter.value='draft';
	
	$(challan_date).datepicker();
	challan_date.value=get_my_date();

	set_static_value_list('delivery_challans','type',type_filter);
	//set_static_value_list('delivery_challans','status',status_filter);
	
	var staff_data="<staff>"+
					"<acc_name></acc_name>"+
					"</staff>";
	set_my_value_list(staff_data,prepared_filter);
	
	$(customer_filter).off('blur');
	$(customer_filter).on('blur',function () 
	{
		var address_data="<customers>"+
						"<address></address>"+
						"<city></city>"+
						"<pincode></pincode>"+
						"<acc_name exact='yes'>"+customer_filter.value+"</acc_name>"+
						"</customers>";
		fetch_requested_data('',address_data,function (addresses) 
		{
			if(addresses.length>0)
			{
				address_filter.value=addresses[0].address+", "+addresses[0].city+", "+addresses[0].pincode;
			}
			else 
			{
				address_filter.value="";
			}
		});				
	});

	var challan_id=$("#form268_link").attr('data_id');
	if(challan_id==null || challan_id=="")
	{		
		var challan_num_data="<user_preferences count='1'>"+
				"<value></value>"+
				"<name exact='yes'>delivery_challan_num</name>"+
				"</user_preferences>";
		get_single_column_data(function(nums)
		{
			if(nums.length>0)
			{
				challan_num.value=get_session_var('challan_number_prefix')+"-"+nums[0];
			}
		},challan_num_data);		
	}
			
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form268_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form268_add_item();
	});
	
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	
	set_my_value_list(customers_data,customer_filter,function () 
	{
		$(customer_filter).focus();
	});
	
	var add_customer=document.getElementById('form268_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{	
			var customer_data="<customer>" +
				"<acc_name></acc_name>" +
				"</customer>";			
			set_my_value_list(customer_data,customer_filter);
		});
	});
}


/**
 * @form Manage Delivery Challans
 * @formNo 269
 */
function form269_header_ini()
{
	var filter_fields=document.getElementById('form269_header');
	var challan_filter=filter_fields.elements[0];
	var cust_filter=filter_fields.elements[1];
	//var status_filter=filter_fields.elements[2];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form269_ini();
	});

	var challan_data="<delivery_challans>" +
			"<challan_num></challan_num>" +
			"</delivery_challans>";
	var cust_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(challan_data,challan_filter);
	set_my_filter(cust_data,cust_filter);
	//set_static_filter('delivery_challans','status',status_filter);
};

/**
 * @form Enter Supplier bills(NVS)
 * @formNo 270
 */
function form270_header_ini()
{
	var fields=document.getElementById('form270_master');
	
	var supplier_filter=fields.elements['supplier'];
	supplier_filter.value='';
	
	fields.elements['bill_num'].value="";
	var bill_date=fields.elements['date'];
	
	fields.elements['bill_id'].value=get_new_key();
	var save_button=fields.elements['save'];
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form270_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form270_add_item();
	});
	
	var suppliers_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	
	set_my_value_list(suppliers_data,supplier_filter,function () 
	{
		$(supplier_filter).focus();
	});
	
	var add_supplier=document.getElementById('form270_add_supplier');
	$(add_supplier).off('click');
	$(add_supplier).on('click',function()
	{
		modal13_action(function()
		{	
			var suppliers_data="<suppliers>" +
				"<acc_name></acc_name>" +
				"</suppliers>";			
			set_my_value_list(suppliers_data,supplier_filter);
		});
	});

	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
}

/**
 * @form Enter COD Collection
 * @formNo 271
 */
function form271_header_ini()
{
	var filter_fields=document.getElementById('form271_header');
	var person_filter=filter_fields.elements[0];
	var date_filter=filter_fields.elements[1];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form271_ini();
	});

	var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	
	set_my_filter(staff_data,person_filter);
	$(date_filter).datepicker();
};

/**
 * @form Capture Receiving
 * @formNo 272
 */
function form272_header_ini()
{
	var filter_fields=document.getElementById('form272_master');
	var awb_filter=filter_fields.elements['awb'];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form272_ini();
	});

	var form272_form=document.getElementById('form272_form');
	form272_form.reset();	
	$(form272_form).hide();

	$("#form272_canvas_div").html('');
	$("#form272_canvas_div").jSignature({width:300,height:200,color:"#00F","background-color":"#F5F4A8"}); // inits the jSignature widget.

	var save_button=form272_form.elements['save'];
	$(save_button).off('click'); 
	$(save_button).on('click',function (e) 
	{
		e.preventDefault();
		form272_update_item();
	});

	var reset_button=form272_form.elements['reset_button'];
	$(reset_button).off('click'); 
	$(reset_button).on('click',function () 
	{
		$("#form272_canvas_div").jSignature("reset"); // clears the canvas and rerenders the decor on it.
	});	
	
	$(awb_filter).focus();
};

/**
 * @form Purchase leads
 * @formNo 273
 */
function form273_header_ini()
{
	var filter_fields=document.getElementById('form273_header');	
	var names_filter=filter_fields.elements[0];
	var item_filter=filter_fields.elements[1];
	var comment_filter=filter_fields.elements[2];
	var date_filter=filter_fields.elements[3];
	
	$(date_filter).datepicker();

	var names_data=new Object();
		names_data.count=0;
		names_data.start_index=0;
		names_data.data_store='suppliers';
		names_data.indexes=[{index:'acc_name'}];		
		names_data.return_column='acc_name';
	set_my_filter_json(names_data,names_filter);

	var item_data=new Object();
		item_data.count=0;
		item_data.start_index=0;
		item_data.data_store='product_master';
		item_data.indexes=[{index:'name'}];		
		item_data.return_column='name';
	set_my_filter_json(item_data,item_filter);

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form273_ini();
	});	
}

/**
 * @form Inventory (poojaelec)
 * @formNo 274
 */
function form274_header_ini()
{
	var filter_fields=document.getElementById('form274_header');	
	var item_filter=filter_fields.elements[0];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form274_ini();
	});
	//setting autocompletes 
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	set_my_filter(products_data,item_filter);
};

/**
 * @form In-out (poojaelec)
 * @formNo 275
 */
function form275_header_ini()
{
	var filter_fields=document.getElementById('form275_header');	
	var item_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var customer_filter=filter_fields.elements[2];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form275_ini();
	});

	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	set_my_filter(products_data,item_filter);	

	set_static_filter('bill_items','issue_type',type_filter);
	
	var customer_data="<customers>"+
					"<acc_name></acc_name>"+
					"</customers>";
	set_my_filter(customer_data,customer_filter);
};


/**
 * @form Dispatch Orders
 * @formNo 280
 */
function form280_header_ini()
{
	var filter_fields=document.getElementById('form280_master');	
	var channel_filter=filter_fields.elements['channel'];
	var start_date=filter_fields.elements['start_date'];
	var end_date=filter_fields.elements['end_date'];
	var export_button=filter_fields.elements['export'];
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	
	var channel_data="<sale_channels>"+
					"<name></name>"+
					"</sale_channels>";
	set_my_value_list(channel_data,channel_filter);
					
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function (e) 
	{
		e.preventDefault();
		var columns=new Object();
		columns.count=0;
		columns.start_index=0;
		columns.data_store='bills';		
		
		columns.indexes=[{index:'id'},
						{index:'bill_num'},
						{index:'order_num'},
						{index:'order_id'},
						{index:'status'},
						{index:'awb_num'},
						{index:'channel',value:channel_filter.value},
						{index:'bill_date',lowerbound:get_raw_time(start_date.value),upperbound:get_raw_time(end_date.value)}];		
		//console.log(columns);
		get_export_data_restructured(columns,'Order Status for Dispatch',function(new_results)
		{
			var sorted_array=[];
			new_results.forEach(function(new_result)
			{
				var sorted_element=new Object();
				sorted_element['ID']=new_result.id;
				sorted_element['Order ID']=new_result.order_id;
				sorted_element['Invoice Number']=new_result.bill_num;
				sorted_element['Order Number']=new_result.order_num;
				sorted_element['Channel']=new_result.channel;
				sorted_element['Invoice Date']=get_my_past_date(new_result.bill_date);
				sorted_element['AWB Number']=new_result.awb_num;
				sorted_element['Status']=new_result.status;
				
				sorted_array.push(sorted_element);
			});
			return sorted_array;
		});
	});	
};


/**
 * @form Manage Performa Invoices
 * @formNo 283
 */
function form283_header_ini()
{
	var filter_fields=document.getElementById('form283_header');
	var bill_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	
	var bill_data="<bills>" +
			"<bill_num></bill_num>" +
			"</bills>";
	var cust_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form283_ini();
	});

	set_my_filter(bill_data,bill_filter);
	set_my_filter(cust_data,name_filter);
};

/**
 * @form Create Bill (DLM)
 * @formNo 284
 */
function form284_header_ini()
{
	var fields=document.getElementById('form284_master');
	
	var customers_filter=fields.elements['customer'];
	var bill_type=fields.elements['bill_type'];
	var bill_date=fields.elements['date'];
	var narration=fields.elements['narration'];
	var bill_num=fields.elements['bill_num'];
	fields.elements['bill_id'].value=get_new_key();
	var save_button=fields.elements['save'];
	var cst_filter=fields.elements['cst'];
	var tin_filter=fields.elements['tin'];
	var customer_info=fields.elements['customer_info'];
	var email_filter=fields.elements['email'];
	var share_button=fields.elements['share'];

	$(share_button).off('click');
	
	narration.value="";
	bill_type.removeAttribute('readonly');
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form284_create_form();
	});
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) 
	{
		if( event.keyCode == 83 && event.ctrlKey) 
		{
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form284_add_item();
	});
	
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter,function () 
	{
		$(customers_filter).focus();
	});

	var add_customer=document.getElementById('form284_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{
			var customers_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";			
			set_my_value_list(customers_data,customers_filter);
		});
	});	

	var type_data="<bill_types>" +
		"<name></name>" +
		"<status exact='yes'>active</status>" +
		"</bill_types>";
	set_my_value_list(type_data,bill_type);
	
	var bill_id=$("#form284_link").attr('data_id');
	if(bill_id==null || bill_id=='')
	{	
		get_single_column_data(function (bill_types) 
		{
			if(bill_types.length>0)
			{
				bill_type.value=bill_types[0];
				var bill_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>"+bill_type.value+"_bill_num</name>"+
							"</user_preferences>";
				get_single_column_data(function(nums)
				{
					if(nums.length>0)
					{
						bill_num.value=get_session_var('invoice_number_prefix')+"-"+nums[0];
					}
				},bill_num_data);
			}
			else 
			{
				var bill_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>bill_num</name>"+
							"</user_preferences>";
				get_single_column_data(function(nums)
				{
					if(nums.length>0)
					{
						bill_num.value=get_session_var('invoice_number_prefix')+"-"+nums[0];
					}
				},bill_num_data);
			}
		},type_data);
	}

	$(bill_type).off('blur');
	$(bill_type).on('blur',function (e) 
	{
		var bill_num_data="<user_preferences count='1'>"+
						"<value></value>"+
						"<name exact='yes'>"+bill_type.value+"_bill_num</name>"+
						"</user_preferences>";
		get_single_column_data(function(nums)
		{
			if(nums.length>0)
			{
				bill_num.value=get_session_var('invoice_number_prefix')+"-"+nums[0];
			}
		},bill_num_data);	
	});	
	
	$(customers_filter).off('blur');
	$(customers_filter).on('blur',function(e)
	{
		var address_data="<customers>" +
				"<address></address>" +
				"<city></city>" +
				"<email></email>"+	
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		fetch_requested_data('',address_data,function(addresses)
		{
			if(addresses.length>0)
			{
				customer_info.value="Address\n"+addresses[0].address+", "+addresses[0].city;
				email_filter.value=addresses[0].email;
			}
			else
			{
				customer_info.value="";
				email_filter.value="";
			}
		});
		
		var tin_data="<attributes>"+
					"<value></value>"+
					"<type exact='yes'>customer</type>"+
					"<attribute exact='yes'>TIN</attribute>"+
					"<name exact='yes'>"+customers_filter.value+"</name>"+
					"</attributes>";
		set_my_value(tin_data,tin_filter);
	});

	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	customers_filter.value='';
}

/**
 * @form Inventory (NVS)
 * @formNo 285
 */
function form285_header_ini()
{
	var filter_fields=document.getElementById('form285_header');	
	var name_filter=filter_fields.elements[0];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form285_ini();
	});

	var item_data="<attributes>" +
		"<name></name>" +
		"<type exact='yes'>product</type>"+
		"<value exact='yes'>no</value>"+
		"<attribute exact='yes'>Spare Part</attribute>"+
		"</attributes>";	
	set_my_filter(item_data,name_filter);
};

/**
 * @form Buyer leads
 * @formNo 289
 */
function form289_header_ini()
{
	var filter_fields=document.getElementById('form289_header');	
	var names_filter=filter_fields.elements[0];
	var item_filter=filter_fields.elements[1];
	var poc_filter=filter_fields.elements[2];
	var comment_filter=filter_fields.elements[3];
	var date_filter=filter_fields.elements[4];
	
	$(date_filter).datepicker();

	var names_data=new Object();
		names_data.count=0;
		names_data.start_index=0;
		names_data.data_store='customers';
		names_data.indexes=[{index:'acc_name'}];		
		names_data.return_column='acc_name';
	set_my_filter_json(names_data,names_filter);

	var staff_data=new Object();
		staff_data.count=0;
		staff_data.start_index=0;
		staff_data.data_store='staff';
		staff_data.indexes=[{index:'acc_name'}];		
		staff_data.return_column='acc_name';
	set_my_filter_json(staff_data,poc_filter);

	var item_data=new Object();
		item_data.count=0;
		item_data.start_index=0;
		item_data.data_store='product_master';
		item_data.indexes=[{index:'name'}];		
		item_data.return_column='name';
	set_my_filter_json(item_data,item_filter);

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form289_ini();
	});	
}

/**
 * @form Cities
 * @formNo 290
 */
function form290_header_ini()
{
	var filter_fields=document.getElementById('form290_header');	
	var state_filter=filter_fields.elements[1];
	var country_filter=filter_fields.elements[2];
	
	var names_data=new Object();
		names_data.count=0;
		names_data.start_index=0;
		names_data.data_store='cities_data';
		names_data.indexes=[{index:'state'}];		
		names_data.return_column='state';
	set_my_filter_json(names_data,state_filter);

	var item_data=new Object();
		item_data.count=0;
		item_data.start_index=0;
		item_data.data_store='cities_data';
		item_data.indexes=[{index:'country'}];		
		item_data.return_column='country';
	set_my_filter_json(item_data,country_filter);

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form290_ini();
	});	
}

/**
 * @form Receipts (NVS)
 * @formNo 291
 */
function form291_header_ini()
{
	var filter_fields=document.getElementById('form291_header');
	var id_filter=filter_fields.elements[0];
	var account_filter=filter_fields.elements[1];
	
	var id_data="<receipts>" +
			"<receipt_id></receipt_id>" +
			"</receipts>";
	var account_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form291_ini();
	});

	set_my_filter(id_data,id_filter);
	set_my_filter(account_data,account_filter);
};

/**
 * @form Vyavsaay Billing
 * @formNo 292
 */
function form292_header_ini()
{
	var filter_fields=document.getElementById('form292_header');	
	var name_filter=filter_fields.elements[0];
	var invoice_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var name_data=new Object();
		name_data.count=0;
		name_data.start_index=0;
		name_data.data_store='user_profile';
		name_data.database='0';
		name_data.indexes=[{index:'name'}];		
		name_data.return_column='name';
	set_master_filter_json(name_data,name_filter);

	var invoice_data=new Object();
		invoice_data.count=0;
		invoice_data.start_index=0;
		invoice_data.data_store='bills';
		invoice_data.indexes=[{index:'bill_num'}];		
		invoice_data.return_column='bill_num';
	set_my_filter_json(invoice_data,invoice_filter);

	set_static_filter_json('system_billing','payment_status',status_filter);

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form292_ini();
	});	
}
/**
 * @form Vyavsaay Accounts
 * @formNo 293
 */
function form293_header_ini()
{
	var filter_fields=document.getElementById('form293_header');	
	var user_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	var db_filter=filter_fields.elements[2];
	var status_filter=filter_fields.elements[3];
	
	var user_data=new Object();
		user_data.count=0;
		user_data.start_index=0;
		user_data.database='0';
		user_data.data_store='user_profile';
		user_data.indexes=[{index:'username'}];		
		user_data.return_column='username';
	set_master_filter_json(user_data,user_filter);

	var name_data=new Object();
		name_data.count=0;
		name_data.start_index=0;
		name_data.data_store='user_profile';
		name_data.database='0';
		name_data.indexes=[{index:'name'}];		
		name_data.return_column='name';
	set_master_filter_json(name_data,name_filter);

	var db_data=new Object();
		db_data.count=0;
		db_data.start_index=0;
		db_data.data_store='user_profile';
		db_data.database='0';
		db_data.indexes=[{index:'dbname'}];		
		db_data.return_column='dbname';
	set_master_filter_json(db_data,db_filter);

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form293_ini();
	});	
}

/**
 * @form Create Bill (Sehgal)
 * @formNo 294
 */
function form294_header_ini()
{
	var fields=document.getElementById('form294_master');
	
	var customers_filter=fields.elements['customer'];
	var bill_date=fields.elements['date'];
	var tax_type=fields.elements['tax_type'];
	var bill_num=fields.elements['bill_num'];
	fields.elements['bill_id'].value=get_new_key();
	var save_button=fields.elements['save'];
	var cst_filter=fields.elements['cst'];
	var tin_filter=fields.elements['tin'];

	var share_button=fields.elements['share'];
	
	$(share_button).hide();
	$(share_button).off('click');

	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form294_create_form();
	});
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) 
	{
		if( event.keyCode == 83 && event.ctrlKey) 
		{
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form294_add_item();
	});
	
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter,function () 
	{
		$(customers_filter).focus();
	});

	var add_customer=document.getElementById('form294_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{
			var customers_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";			
			set_my_value_list(customers_data,customers_filter);
		});
	});	

	var type_data="<bill_types>" +
		"<name></name>" +
		"<status exact='yes'>active</status>" +
		"</bill_types>";
	set_my_value_list(type_data,tax_type);
	
	var bill_id=$("#form294_link").attr('data_id');
	if(bill_id==null || bill_id=='')
	{	
		get_single_column_data(function (bill_types) 
		{
			if(bill_types.length>0)
			{
				tax_type.value=bill_types[0];
				var bill_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>"+tax_type.value+"_bill_num</name>"+
							"</user_preferences>";
				set_my_value(bill_num_data,bill_num);	
			}
			else 
			{
				var bill_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>bill_num</name>"+
							"</user_preferences>";
				set_my_value(bill_num_data,bill_num);	
			}
		},type_data);
	}

	$(tax_type).off('blur');
	$(tax_type).on('blur',function (e) 
	{		
		var bill_num_data="<user_preferences count='1'>"+
						"<value></value>"+
						"<name exact='yes'>"+tax_type.value+"_bill_num</name>"+
						"</user_preferences>";
		set_my_value(bill_num_data,bill_num);	
	});	
	
	$(customers_filter).off('blur');
	$(customers_filter).on('blur',function(e)
	{
		var address_data="<customers>" +
				"<address></address>" +
				"<city></city>" +
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		fetch_requested_data('',address_data,function(addresses)
		{
			var address_string="";
			if(addresses.length>0)
			{
				address_string+=addresses[0].address+", "+addresses[0].city;
				document.getElementById('form294_customer_info').innerHTML="Address<br>"+address_string;
			}
			else
			{
				document.getElementById('form294_customer_info').innerHTML="";
			}
		});
		
		var cst_data="<attributes>"+
					"<value></value>"+
					"<type exact='yes'>customer</type>"+
					"<attribute exact='yes'>CST#</attribute>"+
					"<name exact='yes'>"+customers_filter.value+"</name>"+
					"</attributes>";
		set_my_value(cst_data,cst_filter);

		var tin_data="<attributes>"+
					"<value></value>"+
					"<type exact='yes'>customer</type>"+
					"<attribute exact='yes'>TIN#</attribute>"+
					"<name exact='yes'>"+customers_filter.value+"</name>"+
					"</attributes>";
		set_my_value(tin_data,tin_filter);
	});

	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	customers_filter.value='';
}

/**
 * @form Create Purchase Bill (Sehgal)
 * @formNo 295
 */
function form295_header_ini()
{
	var fields=document.getElementById('form295_master');
	
	var supplier_filter=fields.elements['supplier'];
	var bill_date=fields.elements['date'];
	var entry_date=fields.elements['entry_date'];
	var bill_num=fields.elements['bill_num'];
	fields.elements['bill_id'].value=get_new_key();
	fields.elements['notes'].value="";
	var save_button=fields.elements['save'];
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form295_create_form();
	});
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) 
	{
		if( event.keyCode == 83 && event.ctrlKey) 
		{
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form295_add_item();
	});
	
	var supplier_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	set_my_value_list(supplier_data,supplier_filter,function () 
	{
		$(supplier_filter).focus();
	});

	var add_supplier=document.getElementById('form295_add_supplier');
	$(add_supplier).off('click');
	$(add_supplier).on('click',function()
	{
		modal13_action(function()
		{
			var supplier_data="<suppliers>" +
				"<acc_name></acc_name>" +
				"</suppliers>";			
			set_my_value_list(supplier_data,supplier_filter);
		});
	});	

	$(bill_date).datepicker();
	bill_date.value=get_my_date();
	$(entry_date).datepicker();
	entry_date.value=get_my_date();
	
	supplier_filter.value='';
}

/**
 * @form Create Purchase Order (Sehgal)
 * @formNo 296
 */
function form296_header_ini()
{
	var fields=document.getElementById('form296_master');
	
	var supplier_filter=fields.elements['supplier'];
	var order_date=fields.elements['date'];
	var order_num=fields.elements['order_num'];
	var status_filter=fields.elements['status'];
	fields.elements['order_id'].value=get_new_key();
	var save_button=fields.elements['save'];
	var share_button=fields.elements['share'];	
	
	$(share_button).hide();
	$(share_button).off('click');

	$(supplier_filter).off('blur');	
	$(supplier_filter).on('blur',function () 
	{
		var supplier_address="<suppliers>"+
							"<address></address>"+
							"<pincode></pincode>"+
							"<acc_name exact='yes'>"+supplier_filter.value+"</acc_name>"+
							"</suppliers>";
		fetch_requested_data('',supplier_address,function(addresses)
		{
			if(addresses.length>0)
			{
				fields.elements['address'].value=addresses[0].address+"-"+addresses[0].pincode;
			}
		});					
	});	
	
	var po_id=$("#form296_link").attr('data_id');
	if(po_id==null || po_id=='')
	{
		var po_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>po_num</name>"+
							"</user_preferences>";
		set_my_value(po_num_data,order_num);
	}
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form296_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form296_add_item();
	});

	var add_supplier=document.getElementById('form296_add_supplier');
	$(add_supplier).off('click');
	$(add_supplier).on('click',function()
	{
		modal13_action(function()
		{
			var supplier_data="<suppliers>" +
				"<acc_name></acc_name>" +
				"</suppliers>";	
			set_my_value_list(supplier_data,supplier_filter);
		});
	});

	var supplier_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";	
	set_my_value_list(supplier_data,supplier_filter,function () 
	{
		$(supplier_filter).focus();
	});
	
	$(order_date).datepicker();
	order_date.value=get_my_date();
	set_static_filter('purchase_orders','status',status_filter);
	status_filter.value='draft';
	supplier_filter.value='';
}


/**
 * @form Manage Purchase Orders (Sehgal)
 * @formNo 297
 */
function form297_header_ini()
{
	var filter_fields=document.getElementById('form297_header');
	var order_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];	
	
	var order_data="<purchase_orders>" +
			"<order_num></order_num>" +
			"</purchase_orders>";
	var name_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form297_ini();
	});

	set_my_filter(order_data,order_filter);
	set_my_filter(name_data,name_filter);
	set_static_filter('purchase_orders','status',status_filter);
};


/**
 * @form Manage Products (pooja)
 * @formNo 300
 */
function form300_header_ini()
{
	var filter_fields=document.getElementById('form300_header');
	var name_filter=filter_fields.elements[0];
	var make_filter=filter_fields.elements[1];
	var category_filter=filter_fields.elements[2];

	var add_button=filter_fields.elements['add'];

	$(add_button).off('click'); 	
	$(add_button).on('click',function () 
	{
		modal177_action();
	});
	
	var make_data="<product_master>" +
			"<make></make>" +
			"</product_master>";
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var category_data="<product_master>" +
			"<category></category>" +
			"</product_master>";
	
	set_my_filter(make_data,make_filter);
	set_my_filter(products_data,name_filter);
	set_my_filter(category_data,category_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form300_ini();
	});
};

/**
 * @form Convert Scan Data
 * @formNo 302
 */
function form302_header_ini()
{
	var filter_fields=document.getElementById('form302_header');
	var source_filter=filter_fields.elements[0];
	
	var source_data=new Object();
		source_data.data_store='qr_contexts';
		source_data.indexes=[{index:'source'}];		
		source_data.return_column='source';
	set_my_filter_json(source_data,source_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form302_ini();
	});
};
