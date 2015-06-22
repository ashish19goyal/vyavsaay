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
 * @form Manage Staff
 * @formNo 8
 */
function form8_header_ini()
{
	var filter_fields=document.getElementById('form8_header');
	var name_filter=filter_fields.elements[0];
	var status_filter=filter_fields.elements[1];
	
	var name_data="<staff>" +
		"<name></name>" +
		"</staff>";

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form8_ini();
	});

	set_my_filter(name_data,name_filter);	
	set_static_filter('staff','status',status_filter);	
};


/**
 * @form Create Service Bills
 * @formNo 10
 */
function form10_header_ini()
{
	var fields=document.getElementById('form10_master');
	
	var customers_filter=fields.elements[1];
	var order_num=fields.elements[2];
	var bill_num=fields.elements[3];
	var bill_date=fields.elements[4];
	fields.elements[5].value=get_new_key();
	var order_id_filter=fields.elements[6];
	order_id_filter.value="";
	fields.elements[7].value=fields.elements[5].value;
	var save_button=fields.elements[8];
	
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
	set_my_value_list(customers_data,customers_filter);
	
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
	$(bill_date).val(get_my_date());
	customers_filter.value='';
	order_num.value="";
		
	$(customers_filter).focus();
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
 * @form Enter Returns
 * @formNo 15
 */
function form15_header_ini()
{
	var fields=document.getElementById('form15_master');
	
	var customers_filter=fields.elements[1];
	var return_date=fields.elements[2];
	fields.elements[3].value=get_new_key();
	fields.elements[4].value=get_new_key();
	var save_button=fields.elements[5];
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form15_create_form();
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
		form15_add_item();
	});
	
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter);

	var add_customer=document.getElementById('form15_add_customer');
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
		
	$(return_date).datepicker();
	return_date.value=get_my_date();
	customers_filter.value='';
	$(customers_filter).focus();
}


/**
 * @form Manage Customer Returns
 * @formNo 16
 */
function form16_header_ini()
{
	var filter_fields=document.getElementById('form16_header');
	var return_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form16_ini();
	});

	var return_data="<customer_returns>" +
			"<id></id>" +
			"</customer_returns>";
	var cust_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(cust_data,name_filter);
	set_my_filter(return_data,return_filter);
};

/**
 * @form Manage supplier Returns
 * @formNo 17
 */
function form17_header_ini()
{
	var filter_fields=document.getElementById('form17_header');
	var return_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form17_ini();
	});

	var return_data="<supplier_returns>" +
			"<id></id>" +
			"</supplier_returns>";
	var sup_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	
	set_my_filter(sup_data,name_filter);
	set_my_filter(return_data,return_filter);
};


/**
 * @form Enter Supplier Returns
 * @formNo 19
 */
function form19_header_ini()
{
	var fields=document.getElementById('form19_master');
	
	var supplier_filter=fields.elements[1];
	var return_date=fields.elements[2];
	fields.elements[3].value=get_new_key();
	fields.elements[4].value=get_new_key();
	var save_button=fields.elements[5];
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form19_create_form();
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
		form19_add_item();
	});
	var suppliers_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	set_my_value_list(suppliers_data,supplier_filter);

	var add_supplier=document.getElementById('form19_add_supplier');
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
	
	$(return_date).datepicker();
	return_date.value=get_my_date();
	supplier_filter.value='';
	$(supplier_filter).focus();
}



/**
 * @form Create Supplier bills
 * @formNo 21
 */
function form21_header_ini()
{
	var fields=document.getElementById('form21_master');
	
	var supplier_filter=fields.elements[1];
	fields.elements[2].value="";
	var bill_date=fields.elements[3];
	var entry_date=fields.elements[4];
	fields.elements[5].value="";
	fields.elements[6].value=get_new_key();
	fields.elements[7].value=fields.elements[6].value;
	var save_button=fields.elements[8];
	
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
	
	set_my_value_list(suppliers_data,supplier_filter);

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

	supplier_filter.value='';
	$(supplier_filter).focus();
}


/**
 * @form New Purchase Order
 * @formNo 24
 */
function form24_header_ini()
{
	var fields=document.getElementById('form24_master');
	
	var supplier_filter=fields.elements[1];
	var order_date=fields.elements[2];
	var order_num=fields.elements[3];
	var status_filter=fields.elements[4];
	fields.elements[5].value=get_new_key();
	var save_button=fields.elements[6];
	var share_button=fields.elements[7];	
	
	$(share_button).hide();
	
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
	set_my_value_list(supplier_data,supplier_filter);
	
	$(order_date).datepicker();
	order_date.value=get_my_date();
	set_static_filter('purchase_orders','status',status_filter);
	status_filter.value='draft';
	supplier_filter.value='';
}


/**
 * @form Manage Customers
 * @formNo 30
 */
function form30_header_ini()
{
	var filter_fields=document.getElementById('form30_header');
	var name_filter=filter_fields.elements[0];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form30_ini();
	});

	var name_data="<customers>" +
			"<name></name>" +
			"</customers>";
	
	set_my_filter(name_data,name_filter);
};

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
 * @form Store Placement
 * @formNo 38
 */
function form38_header_ini()
{
	var filter_fields=document.getElementById('form38_header');
	var name_filter=filter_fields.elements[0];
	var batch_filter=filter_fields.elements[1];
	var area_filter=filter_fields.elements[2];
	
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var batch_data="<product_instances>" +
			"<batch></batch>" +
			"</product_instances>";
	var area_data="<store_areas>" +
			"<name></name>" +
			"</store_areas>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form38_ini();
	});

	set_my_filter(products_data,name_filter);
	set_my_filter(batch_data,batch_filter);
	set_my_filter(area_data,area_filter);
	
};


/**
 * @form Manage Products
 * @formNo 39
 */
function form39_header_ini()
{
	var filter_fields=document.getElementById('form39_header');
	var name_filter=filter_fields.elements[0];
	var make_filter=filter_fields.elements[1];
	var add_button=filter_fields.elements[2];

	$(add_button).off('click');
	$(add_button).on('click',function()
	{
		if(is_read_access('form1'))
		{
			modal14_action();
		}
		else 
		{
			modal112_action();
		}
	});
	
	var make_data="<product_master>" +
			"<make></make>" +
			"</product_master>";
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form39_ini();
	});

	set_my_filter(make_data,make_filter);
	set_my_filter(products_data,name_filter);
	
};


/**
 * @form Manage Suppliers
 * @formNo 40
 */
function form40_header_ini()
{
	var filter_fields=document.getElementById('form40_header');
	var name_filter=filter_fields.elements[0];
	
	var name_data="<suppliers>" +
			"<name></name>" +
			"</suppliers>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form40_ini();
	});

	set_my_filter(name_data,name_filter);
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
 * @form Manage Newsletter
 * @formNo 44
 */
function form44_header_ini()
{
	var filter_fields=document.getElementById('form44_header');
	var name_filter=filter_fields.elements[0];
	
	var name_data="<newsletter>" +
			"<name></name>" +
			"</newsletter>";
	
	set_my_filter(name_data,name_filter);

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form44_ini();
	});

};

/**
 * @form Set defaults
 * @formNo 46
 */
function form46_header_ini()
{
	var filter_fields=document.getElementById('form46_header');
	var other_element=filter_fields.elements[0];
	var save_element=filter_fields.elements[1];
	
	$(save_element).off('click');
	$(save_element).on('click',function(e)
	{
		form46_update_form();
	});
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form46_ini();
	});
	
	var other_data="<user_preferences>" +
			"<display_name></display_name>" +
			"<type exact='yes'>other</type>" +
			"</user_preferences>";
	
	set_my_filter(other_data,other_element);
	
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
 * @form Select Reports
 * @formNo 48
 */
function form48_header_ini()
{
	var filter_fields=document.getElementById('form48_header');
	var report_filter=filter_fields.elements[0];
	var save_element=filter_fields.elements[1];
	
	$(save_element).off('click');
	$(save_element).on('click',function(e)
	{
		form48_update_form();
	});
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form48_ini();
	});
	
	var reports_data="<user_preferences>" +
			"<display_name></display_name>" +
			"<type exact='yes'>report</type>" +
			"</user_preferences>";

	set_my_filter(reports_data,report_filter);

};


/**
 * @form Select Forms
 * @formNo 49
 */
function form49_header_ini()
{
	var filter_fields=document.getElementById('form49_header');
	var form_filter=filter_fields.elements[0];
	var save_element=filter_fields.elements[1];
	
	$(save_element).off('click');
	$(save_element).on('click',function(e)
	{
		form49_update_form();
	});
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form49_ini();
	});
	
	var forms_data="<user_preferences>" +
			"<display_name></display_name>" +
			"<type exact='yes'>form</type>" +
			"</user_preferences>";

	set_my_filter(forms_data,form_filter);

};

/**
 * @form Set Accounting Defaults
 * @formNo 50
 */
function form50_header_ini()
{
	var filter_fields=document.getElementById('form50_header');
	var accounts_filter=filter_fields.elements[0];
	var save_element=filter_fields.elements[1];
	
	$(save_element).off('click');
	$(save_element).on('click',function(e)
	{
		form50_update_form();
	});
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form50_ini();
	});
	var accounts_data="<user_preferences>" +
			"<display_name></display_name>" +
			"<type exact='yes'>accounting</type>" +
			"</user_preferences>";

	set_my_filter(accounts_data,accounts_filter);

};

/**
 * @form Set Access Control
 * @formNo 51
 */
function form51_header_ini()
{
	var fields=document.getElementById('form51_master');
	var users_filter=fields.elements[1];
	var save_button=fields.elements[5];
	
	var username_data="<accounts>" +
			"<username></username>" +
			"</accounts>";
	set_my_value_list(username_data,users_filter);

	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form51_ini();
	});
	
	$(save_button).off('click');
	$(save_button).on('click',function(event)
	{
		event.preventDefault();
		form51_update_form();
	});
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

};

/**
 * @form Manage Supplier Bills
 * @formNo 53
 */
function form53_header_ini()
{
	var filter_fields=document.getElementById('form53_header');
	var bill_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form53_ini();
	});

	var bill_data="<supplier_bills>" +
			"<bill_id></bill_id>" +
			"</supplier_bills>";
	var sup_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	
	set_my_filter(bill_data,bill_filter);
	set_my_filter(sup_data,name_filter);
};

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
 * @form Cash register
 * @formNo 56
 */
function form56_header_ini()
{
	var filter_fields=document.getElementById('form56_header');
	var account_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	
	var account_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	
	set_my_filter(account_data,account_filter);
	set_static_filter('cash_register','type',type_filter);	
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form56_ini();
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
 * @form Product Attributes
 * @formNo 60
 */
function form60_header_ini()
{
	var filter_fields=document.getElementById('form60_header');
	var product_filter=filter_fields.elements[0];
	var attribute_filter=filter_fields.elements[1];
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var attribute_data="<attributes>" +
			"<attribute></attribute>" +
			"<type exact='yes'>product</type>" +
			"</attributes>";
	
	set_my_filter(product_data,product_filter);
	set_my_filter(attribute_data,attribute_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form60_ini();
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
	
	var customers_filter=fields.elements[1];
	var order_date=fields.elements[2];
	var status_filter=fields.elements[3];
	fields.elements[4].value=get_new_key();
	
	var save_button=fields.elements[5];
	
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
 * @form Manage Accounts
 * @formNo 71
 */
function form71_header_ini()
{
	var filter_fields=document.getElementById('form71_header');
	var name_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	
	var name_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";

	set_my_filter(name_data,name_filter);
	set_static_filter('accounts','type',type_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form71_ini();
	});

};


/**
 * @form Create Bills
 * @formNo 72
 */
function form72_header_ini()
{
	var fields=document.getElementById('form72_master');
	
	var customers_filter=fields.elements[1];
	var bill_date=fields.elements[2];
	var bill_num=fields.elements[3];
	fields.elements[4].value=get_new_key();
	fields.elements[5].value="";
	fields.elements[6].value=fields.elements[4].value;
	var save_button=fields.elements[7];

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
	set_my_filter(customers_data,customers_filter);

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
	
	$(customers_filter).focus();
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
	var merge_button=fields.elements[7];
		
	object_filter.value='';
	table_filter.value='';
	column_filter.value='';
	refs_filter.value='';
	ref_ids_filter.value='';
	
	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form80_update_form();
	});
	
	var object_data="<de_duplication_ref>" +
			"<object></object>" +
			"</de_duplication_ref>";
	set_my_value_list(object_data,object_filter);
	
	$(object_filter).on('blur',function(event)
	{
		$(merge_button).off('click');
		$(merge_button).on('click',function(event)
		{
			modal51_action(object_filter.value);
		});
		
		var table_data="<de_duplication_ref>" +
				"<tablename></tablename>" +
				"<object exact='yes'>"+object_filter.value+"</object>" +
				"</de_duplication_ref>";
		set_my_value(table_data,table_filter);
		var column_data="<de_duplication_ref>" +
				"<keycolumn></keycolumn>" +
				"<object exact='yes'>"+object_filter.value+"</object>" +
				"</de_duplication_ref>";
		set_my_value(column_data,column_filter);
		var refs_data="<de_duplication_ref>" +
				"<references_value></references_value>" +
				"<object exact='yes'>"+object_filter.value+"</object>" +
				"</de_duplication_ref>";
		set_my_value(refs_data,refs_filter);
		var ref_ids_data="<de_duplication_ref>" +
				"<references_id></references_id>" +
				"<object exact='yes'>"+object_filter.value+"</object>" +
				"</de_duplication_ref>";
		set_my_value(ref_ids_data,ref_ids_filter);
		
		form80_ini();
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
 * @form Storage Areas
 * @formNo 83
 */
function form83_header_ini()
{
	var filter_fields=document.getElementById('form83_header');
	var name_filter=filter_fields.elements[0];
	var owner_filter=filter_fields.elements[1];
	var type_filter=filter_fields.elements[2];
	
	var area_data="<store_areas>" +
			"<name></name>" +
			"</store_areas>";	
	set_my_filter(area_data,name_filter);
	
	var owner_data="<staff>"+
					"<acc_name></acc_name>"+
					"</staff>";
	set_my_filter(owner_data,owner_filter);
	set_static_filter('store_areas','type',type_filter);					
				
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form83_ini();
	});

};

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
	
	///initializing calendar
	
	$('#form89_calendar').fullCalendar({
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
	        var app_data="<appointments>" +
	        		"<id></id>" +
	        		"<customer></customer>" +
	        		"<schedule lowerbound='yes'>"+start_time+"</schedule>" +
	        		"<schedule upperbound='yes'>"+end_time+"</schedule>" +
	        		"<status></status>" +
	        		"<assignee></assignee>" +
	        		"<hours></hours>" +
	        		"<notes></notes>" +
	        		"</appointments>";
	        
	        fetch_requested_data('form89',app_data,function(apps)
	        {
	        	var events=[];
	        	
	        	apps.forEach(function(app)
	        	{
        			var color="yellow";
        			if(app.status=='cancelled')
        			{
        				color="aaaaaa";
        			}
        			else if(app.status=='closed')
        			{
        				color='#00ff00';
        			}
	        		events.push({
	        			title: "\n"+app.assignee+"\nappointment with: "+app.customer,
	        			start:get_iso_time(app.schedule),
	        			end:get_iso_time(parseFloat(app.schedule)+(parseFloat(app.hours)*3600000)),
	        			color: color,
	        			textColor:"#333",
	        			id: app.id
	        		});	        		
	        	});
	        	callback(events);
	        });
	    },
	    dayClick: function(date,jsEvent,view){
	    	modal36_action(get_my_date_from_iso(date.format()));
	    },
	    eventClick: function(calEvent,jsEvent,view){
	    	modal37_action(calEvent.id);
	    },
	    eventDrop: function(event,delta,revertFunc){
	    	var schedule=(parseFloat(event.start.unix())*1000);
	    	var data_xml="<appointments>" +
						"<id>"+event.id+"</id>" +
						"<schedule>"+schedule+"</schedule>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</appointments>";
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
	    	var hours=parseFloat((parseFloat(event.end.unix())-parseFloat(event.start.unix()))/3600);
	    	var data_xml="<appointments>" +
						"<id>"+event.id+"</id>" +
						"<hours>"+hours+"</hours>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</appointments>";
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

	$(next_element).hide();
	$(prev_element).hide();	
};

/**
 * @form Appointments
 * @formNo 89
 */
function form89_switch_view()
{
	form89_ini();
	$("#form89_body").parent().toggle();
	$("#form89_calendar").toggle();
}

/**
 * @form Billing types
 * @formNo 90
 */
function form90_header_ini()
{
	var filter_fields=document.getElementById('form90_header');
	var name_filter=filter_fields.elements[0];
	
	var name_data="<bill_types>" +
			"<name></name>" +
			"</bill_types>";
	
	set_my_filter(name_data,name_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form90_ini();
	});

};

/**
 * @form Create Bill(multiple registers)
 * @formNo 91
 */
function form91_header_ini()
{
	var fields=document.getElementById('form91_master');
	
	var customers_filter=fields.elements[1];
	var bill_type=fields.elements[2];
	var bill_date=fields.elements[3];
	var bill_num=fields.elements[4];	
	fields.elements[5].value=get_new_key();
	fields.elements[6].value="";
	fields.elements[7].value=fields.elements[5].value;
	var save_button=fields.elements[8];
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form91_create_form();
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
		form91_add_item();
	});
	
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter);

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
	});

	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	customers_filter.value='';
	$(customers_filter).focus();
}


/**
 * @form Manage Bills(multiple registers)
 * @formNo 92
 */
function form92_header_ini()
{
	var filter_fields=document.getElementById('form92_header');
	var bill_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var name_filter=filter_fields.elements[2];
	
	var bill_data="<bills>" +
			"<bill_num></bill_num>" +
			"</bills>";
	var type_data="<bill_types>" +
			"<name></name>" +
			"</bill_types>";
	var cust_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(bill_data,bill_filter);
	set_my_filter(type_data,type_filter);
	set_my_filter(cust_data,name_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form92_ini();
	});

};

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
 * @form Discard Items
 * @formNo 94
 */
function form94_header_ini()
{
	var filter_fields=document.getElementById('form94_header');	
	var names_filter=filter_fields.elements[0];
	var batches_filter=filter_fields.elements[1];
	
	//setting autocompletes 
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	var batch_data="<product_instances>" +
			"<batch></batch>" +
			"</product_instances>";

	set_my_filter(products_data,names_filter);
	set_my_filter(batch_data,batches_filter);
	
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form94_ini();
	});
};

/**
 * @form Data Import
 * @formNo 95
 */
function form95_header_ini()
{
	var filter_fields=document.getElementById('form95_header');	
	var number_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	
	//setting autocompletes 
	var number_data="<user_preferences>" +
			"<name></name>" +
			"<type exact='yes'>form</type>" +
			"<value exact='yes'>checked</value>" +
			"</user_preferences>";
	
	var name_data="<user_preferences>" +
			"<display_name></display_name>" +
			"<type exact='yes'>form</type>" +
			"<value exact='yes'>checked</value>" +
			"</user_preferences>";

	set_my_filter(number_data,number_filter);
	set_my_filter(name_data,name_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form95_ini();
	});

};

/**
 * @form Customer Attributes
 * @formNo 96
 */
function form96_header_ini()
{
	var filter_fields=document.getElementById('form96_header');
	var customer_filter=filter_fields.elements[0];
	var attribute_filter=filter_fields.elements[1];
	
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	var attribute_data="<attributes>" +
			"<attribute></attribute>" +
			"<type exact='yes'>customer</type>" +
			"</attributes>";
	
	set_my_filter(customer_data,customer_filter);
	set_my_filter(attribute_data,attribute_filter);
	
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form96_ini();
	});

};

/**
 * @form Supplier Attributes
 * @formNo 97
 */
function form97_header_ini()
{
	var filter_fields=document.getElementById('form97_header');
	var supplier_filter=filter_fields.elements[0];
	var attribute_filter=filter_fields.elements[1];
	
	var supplier_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	var attribute_data="<attributes>" +
			"<attribute></attribute>" +
			"<type exact='yes'>supplier</type>" +
			"</attributes>";
	
	set_my_filter(supplier_data,supplier_filter);
	set_my_filter(attribute_data,attribute_filter);
	
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form97_ini();
	});

};

/**
 * @form Staff Attributes
 * @formNo 98
 */
function form98_header_ini()
{
	var filter_fields=document.getElementById('form98_header');
	var staff_filter=filter_fields.elements[0];
	var attribute_filter=filter_fields.elements[1];
	
	var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	var attribute_data="<attributes>" +
			"<attribute></attribute>" +
			"<type exact='yes'>staff</type>" +
			"</attributes>";
	
	set_my_filter(staff_data,staff_filter);
	set_my_filter(attribute_data,attribute_filter);
	
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form98_ini();
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
 * @form Assign project tasks
 * @formNo 104
 */
function form104_header_ini()
{
	var fields=document.getElementById('form104_master');

	var code_filter=fields.elements[1];
	var id_filter=fields.elements[2];
	
	var name_data="<projects>" +
			"<name></name>" +
			"</projects>";
	
	set_my_value_list(name_data,code_filter);

	$(fields).off('submit');
	$(fields).on('submit',function (event) 
	{
		event.preventDefault();
		form104_ini();
	});
	
	id_filter.value="";
	code_filter.value="";
	
	my_datalist_change(code_filter,function () 
	{
		var id_data="<projects>"+
					"<id></id>"+
					"<name exact='yes'>"+code_filter.value+"</name>"+					
					"</projects>";
		set_my_value(id_data,id_filter);
	});
	
	$("#form104_body").parent().hide();
	$("#form104_calendar").show();
}

function form104_switch_view()
{
	$("#form104_body").parent().toggle();
	$("#form104_calendar").toggle();
}

/**
 * @form Manage Data access
 * @formNo 105
 */
function form105_header_ini()
{
	var fields=document.getElementById('form105_master');
	var table=fields.elements[1];
	var record=fields.elements[2];
	table.removeAttribute('readonly');
	record.removeAttribute('readonly');
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form105_ini();
	});
	
	var tables_data="<data_access>" +
			"<tablename></tablename>" +
			"</data_access>";
	set_my_filter(tables_data,table);
}


/**
 * @form Manage Sale Orders (multi-register)
 * @formNo 108
 */
function form108_header_ini()
{
	var filter_fields=document.getElementById('form108_header');
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
		form108_ini();
	});

	set_my_filter(order_data,order_filter);
	set_my_filter(cust_data,name_filter);
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
 * @form manage Reprots
 * @formNo 110
 */
function form110_header_ini()
{
	var filter_fields=document.getElementById('form110_header');
	var name_filter=filter_fields.elements[0];
	
	var name_data="<reports>" +
			"<name></name>" +
			"</reports>";
	
	set_my_filter(name_data,name_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form110_ini();
	});

};

/**
 * @form Create Reports
 * @formNo 111
 */
function form111_header_ini()
{
	var fields=document.getElementById('form111_master');
	fields.elements[1].value="";
	fields.elements[2].value="";
	fields.elements[3].value=get_new_key();
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form111_create_form();
	});
}

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
	set_my_value_list(supplier_data,supplier_filter);
	
	$(purchase_date).datepicker();
	$(purchase_date).val(get_my_date());
	supplier_filter.value='';
	
	$(supplier_filter).focus();
	
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
				$("#modal2").dialog("open");
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
	
	var supplier_filter=fields.elements[1];
	fields.elements[2].value="";
	var bill_date=fields.elements[3];
	var entry_date=fields.elements[4];
	fields.elements[5].value="";
	fields.elements[7].value=get_new_key();
	fields.elements[8].value=fields.elements[7].value;
	var unbilled_button=fields.elements[9];
	var save_button=fields.elements[10];
	
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
				"<supplier exact='yes'>"+supplier_filter.value+"</supplier>" +
				"</unbilled_purchase_items>";
		get_single_column_data(function(suppliers)
		{
			fields.elements[6].value=suppliers.length;
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
				"<batch></batch>" +
				"<quantity></quantity>" +
				"<supplier exact='yes'>"+supplier_filter.value+"</supplier>" +
				"</unbilled_purchase_items>";
		fetch_requested_data('form122',unbilled_data,function(unbilled_items)
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
					if(unbilled_items[j].item_name==new_obj.item_name && unbilled_items[j].batch==new_obj.batch)
					{
						new_obj.quantity+=parseFloat(unbilled_items[j].quantity);
						unbilled_items.splice(j,1);
						j-=1;
					}
				}
				ub_items.push(new_obj);
			}
			
			ub_items.forEach(function(ub_item)
			{
				///////////////////////////////////////////////////////////
				if(is_create_access('form122'))
				{
					var rowsHTML="";
					var id=get_new_key();
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form122_"+id+"'></form>";
						rowsHTML+="<td data-th='Product Name'>";
							rowsHTML+="<input type='text' readonly='readonly' required form='form122_"+id+"' value='"+ub_item.item_name+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="Bought: <input type='number' step='any' required form='form122_"+id+"' value='"+ub_item.quantity+"'>";
							rowsHTML+="</br>Free: <input type='number' step='any' required form='form122_"+id+"' value='0'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="Total: <input type='number' required form='form122_"+id+"' step='any'></br>";
							rowsHTML+="</br>Tax: <input type='number' form='form122_"+id+"' value='' step='any'></br>";
							rowsHTML+="</br>Amount: <input type='number' readonly='readonly' form='form122_"+id+"' value='' step='any'></br>";
							rowsHTML+="</br>Unit Price: <input type='number' readonly='readonly' form='form122_"+id+"' step='any'>";
							rowsHTML+="</br>Previous Price: <input type='number' readonly='readonly' form='form122_"+id+"' value='' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' required readonly='readonly' form='form122_"+id+"' value='"+ub_item.batch+"'></br>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Storage Area'>";
							rowsHTML+="<input type='text' form='form122_"+id+"'>";
							rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new storage' onclick='modal35_action();'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form122_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form122_"+id+"' id='save_form122_"+id+"' >";
							rowsHTML+="<input type='button' class='delete_icon' form='form122_"+id+"' id='delete_form122_"+id+"' onclick='$(this).parent().parent().remove();'>";
							rowsHTML+="<input type='hidden' form='form122_"+id+"' name='unbilled' value='yes'>";
							rowsHTML+="<input type='submit' class='submit_hidden' form='form122_"+id+"'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form122_body').prepend(rowsHTML);
					
					var fields=document.getElementById("form122_"+id);
					var name_filter=fields.elements[0];
					var pquantity_filter=fields.elements[1];
					var fquantity_filter=fields.elements[2];
					var total_filter=fields.elements[3];
					var tax_filter=fields.elements[4];
					var amount_filter=fields.elements[5];
					var price_filter=fields.elements[6];
					var previous_price_filter=fields.elements[7];
					var batch_filter=fields.elements[8];
					var storage_filter=fields.elements[9];
					var id_filter=fields.elements[10];
					var save_button=fields.elements[11];
					
					$(name_filter).focus();
					
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form122_add_item();
					});
					
					$(save_button).on("click", function(event)
					{
						event.preventDefault();
						form122_create_item(fields);
					});
							
					var storage_data="<store_areas>" +
								"<name></name>" +
								"<area_type exact='yes'>storage</area_type>" +
								"</store_areas>";
					set_my_value_list(storage_data,storage_filter);

					var price_data="<supplier_bill_items count='1'>" +
							"<unit_price></unit_price>" +
							"<product_name>"+name_filter.value+"</product_name>" +
							"</supplier_bill_items>";
					set_my_value(price_data,previous_price_filter);
					
					$(pquantity_filter).on('blur',function(event)
					{
						var price=parseFloat(amount_filter.value)/parseFloat(pquantity_filter.value);
						price_filter.value=Math.round(price*100)/100;
					});
					$(total_filter).on('blur',function(event)
					{
						var amount=parseFloat(total_filter.value)-parseFloat(tax_filter.value);
						amount_filter.value=amount;
						var price=parseFloat(amount_filter.value)/parseFloat(pquantity_filter.value);
						price_filter.value=Math.round(price*100)/100;
						
					});
					$(tax_filter).on('blur',function(event)
					{
						var amount=parseFloat(total_filter.value)-parseFloat(tax_filter.value);
						amount_filter.value=amount;
						var price=parseFloat(amount_filter.value)/parseFloat(pquantity_filter.value);
						price_filter.value=Math.round(price*100)/100;
					});
				}
				else
				{
					$("#modal2").dialog("open");
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
 * @form Mandatory Attributes
 * @formNo 123
 */
function form123_header_ini()
{
	var filter_fields=document.getElementById('form123_header');
	var object_filter=filter_fields.elements[0];
	var attr_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var attr_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"</mandatory_attributes>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form123_ini();
	});

	set_my_filter(attr_data,attr_filter);
	set_static_filter('mandatory_attributes','object',object_filter);
	set_static_filter('mandatory_attributes','status',status_filter);
};

/**
 * @form Receipts
 * @formNo 124
 */
function form124_header_ini()
{
	var filter_fields=document.getElementById('form124_header');
	var id_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var account_filter=filter_fields.elements[2];
	var pid_filter=filter_fields.elements[3];
	
	var id_data="<receipts>" +
			"<receipt_id></receipt_id>" +
			"</receipts>";
	var account_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	var pid_data="<receipts>" +
			"<payment_id></payment_id>" +
			"</receipts>";

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form124_ini();
	});

	set_my_filter(id_data,id_filter);
	set_my_filter(pid_data,pid_filter);
	set_my_filter(account_data,account_filter);
	set_static_filter('receipts','type',type_filter);
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
 * @form Project Dashboard
 * @formNo 135
 */
function form135_header_ini()
{
	var fields=document.getElementById('form135_master');
	var project_id=$("#form135_link").attr('data_id');
	
	var name_filter=fields.elements[1];
	var description_filter=fields.elements[2];
	var status_filter=fields.elements[3];
	var id_filter=fields.elements[4];
	var save_button=fields.elements[5];
	var add_button=fields.elements[6];
	id_filter.value=project_id;

	$(fields).off('submit');
	$(fields).on('submit',function (event) 
	{
		event.preventDefault();
		form135_ini();
	});	
	
	$(add_button).off('click');
	$(add_button).on('click',function()
	{
		console.log(id_filter.value);
		modal105_action(id_filter.value);
	});	
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form135_update_form();
	});
		
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});
	
	name_filter.value='';
	description_filter.value='';
	status_filter.value='';
	set_static_value_list('projects','status',status_filter);	

	var project_data="<projects>"+
					"<name></name>"+
					"</projects>";
	set_my_value_list(project_data,name_filter);
	
	my_datalist_change(name_filter,function () 
	{
		var project_id_data="<projects>"+
							"<id></id>"+
							"<name exact='yes'>"+name_filter.value+"</name>"+
							"</projects>";
		set_my_value(project_id_data,id_filter);
	});
}

/**
 * @form Enter Supplier bills(wholesale)
 * @formNo 136
 */
function form136_header_ini()
{
	var fields=document.getElementById('form136_master');
	
	var supplier_filter=fields.elements[1];
	fields.elements[2].value="";
	var bill_date=fields.elements[3];
	var entry_date=fields.elements[4];
	fields.elements[5].value="";
	fields.elements[6].value=get_new_key();
	fields.elements[7].value=fields.elements[6].value;
	var save_button=fields.elements[8];
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form136_create_form();
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
		form136_add_item();
	});
	
	var suppliers_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	
	set_my_value_list(suppliers_data,supplier_filter);
	
	var add_supplier=document.getElementById('form136_add_supplier');
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
 * @form Project Expenses
 * @formNo 137
 */
function form137_header_ini()
{
	var fields=document.getElementById('form137_master');

	var code_filter=fields.elements[1];
	var id_filter=fields.elements[2];
	
	var name_data="<projects>" +
			"<name></name>" +
			"</projects>";
	
	set_my_value_list(name_data,code_filter);

	id_filter.value="";
	code_filter.value="";
	
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form137_ini();
	});
		

	my_datalist_change(code_filter,function () 
	{
		var id_data="<projects>"+
					"<id></id>"+
					"<name exact='yes'>"+code_filter.value+"</name>"+					
					"</projects>";
		set_my_value(id_data,id_filter);
	});	
};

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
 * @form Create Questionnaires
 * @formNo 142
 */
function form142_header_ini()
{
	var fields=document.getElementById('form142_master');
	
	var name_filter=fields.elements[1];
	var display_filter=fields.elements[2];
	var grid_filter=fields.elements[3];
	var status_filter=fields.elements[4];
	fields.elements[5].value=get_new_key();
	var save_button=fields.elements[6];
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form142_create_form();
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
		form142_add_item();
	});
		
	name_filter.value='';
	display_filter.value='';
	grid_filter.value='';
	status_filter.value='active';
	set_static_value_list('ques_struct','status',status_filter);
	$(name_filter).focus();
}


/**
 * @form Manage Questionnaire
 * @formNo 143
 */
function form143_header_ini()
{
	var filter_fields=document.getElementById('form143_header');
	var id_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	var display_filter=filter_fields.elements[2];
	var status_filter=filter_fields.elements[3];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form143_ini();
	});

	var id_data="<ques_struct>" +
			"<id></id>" +
			"</ques_struct>";
	var name_data="<ques_struct>" +
			"<name></name>" +
			"</ques_struct>";
	var display_data="<ques_struct>" +
			"<display_name></display_name>" +
			"</ques_struct>";
	
	set_my_filter(id_data,id_filter);
	set_my_filter(name_data,name_filter);
	set_my_filter(display_data,display_filter);
	set_static_filter('ques_data','status',status_filter);
};


/**
 * @form Project Budgeting
 * @formNo 144
 */
function form144_header_ini()
{
	var fields=document.getElementById('form144_master');
	var project_id=$("#form144_link").attr('data_id');
	
	var name_filter=fields.elements[1];
	var expense_estimate_filter=fields.elements[2];
	var total_estimate_filter=fields.elements[3];
	var total_budget_filter=fields.elements[4];
	var project_id_filter=fields.elements[5];
	var save_button=fields.elements[6];

	project_id_filter.value=project_id;
	
	$(fields).off('submit');
	$(fields).on('submit',function (event) 
	{
		event.preventDefault();
		form144_ini();
	});	
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form144_update_form();
	});
		
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});
	
	name_filter.value='';
	expense_estimate_filter.value='';
	total_estimate_filter.value='';
	total_budget_filter.value='';
	
	var project_data="<projects>"+
					"<name></name>"+
					"</projects>";	
	set_my_value_list(project_data,name_filter);
	
	my_datalist_change(name_filter,function () 
	{
		var project_id_data="<projects>"+
							"<id></id>"+
							"<name exact='yes'>"+name_filter.value+"</name>"+
							"</projects>";
		set_my_value(project_id_data,project_id_filter);
	});
}


/**
 * @form Store Movement
 * @formNo 145
 */
function form145_header_ini()
{
	var filter_fields=document.getElementById('form145_header');
	var product_filter=filter_fields.elements[0];
	var batch_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var batch_data="<product_instances>" +
			"<batch></batch>" +
			"</product_instances>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form145_ini();
	});

	set_my_filter(products_data,product_filter);
	set_my_filter(batch_data,batch_filter);
	set_static_filter('store_movement','status',status_filter);
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
 * @form Manage Roles
 * @formNo 147
 */
function form147_header_ini()
{
	var filter_fields=document.getElementById('form147_header');
	var role_filter=filter_fields.elements[0];
	var status_filter=filter_fields.elements[1];
	
	var role_data="<roles>" +
			"<role_name></role_name>" +
			"</roles>";	
	set_my_filter(role_data,role_filter);	
	set_static_filter('roles','status',status_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form147_ini();
	});
};


/**
 * @form Create Roles
 * @formNo 148
 */
function form148_header_ini()
{
	var fields=document.getElementById('form148_master');
	var role_filter=fields.elements[1];
	var save_button=fields.elements[3];
	
	var role_data="<roles>" +
			"<role_name></role_name>" +
			"</roles>";
	set_my_value_list(role_data,role_filter);
	
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form148_ini();
	});
	
	$(save_button).off('click');
	$(save_button).on('click',function(event)
	{
		event.preventDefault();
		form148_update_form();
	});
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if(event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});
};

/**
 * @form Assign Roles
 * @formNo 149
 */
function form149_header_ini()
{
	var filter_fields=document.getElementById('form149_header');
	var role_filter=filter_fields.elements[0];
	var username_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var role_data="<roles>" +
			"<role_name></role_name>" +
			"</roles>";	
	set_my_filter(role_data,role_filter);

	var user_data="<user_role_mapping>"+
				"<username></username>"+
				"</user_role_mapping>";
	set_my_filter(user_data,username_filter);					
		
	set_static_filter('roles','status',status_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form149_ini();
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
	var id_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var customer_filter=filter_fields.elements[2];
	
	var id_data="<quotation>" +
			"<id></id>" +
			"</quotation>";
	var type_data="<bill_types>" +
			"<name></name>" +
			"</bill_types>";
	var cust_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(id_data,id_filter);
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
	
	var customers_filter=fields.elements[1];
	var quot_type=fields.elements[2];
	var date=fields.elements[3];
	fields.elements[5].value=get_new_key();
	fields.elements[6].value="";
	var save_button=fields.elements[7];
	var print_button=fields.elements[8];
	
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
	
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter);

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
	$(date).val(get_my_date());
	customers_filter.value='';
	$(customers_filter).focus();
}

/**
 * @form Create Bill (DLM)
 * @formNo 154
 */
function form154_header_ini()
{
	var fields=document.getElementById('form154_master');
	
	var customers_filter=fields.elements[1];
	var bill_type=fields.elements[2];
	var store_filter=fields.elements[3];	
	var bill_date=fields.elements[4];
	var narration=fields.elements[5];
	var a1_job=document.getElementById('form154_1job');
	var bill_num=fields.elements[7];
	fields.elements[8].value=get_new_key();
	fields.elements[9].value=fields.elements[8].value;
	var save_button=fields.elements[10];
	var cst_filter=fields.elements[13];
	var tin_filter=fields.elements[14];
	
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

	$(bill_type).off('blur');
	$(bill_type).on('blur',function (e) 
	{
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
	
	var supplier_filter=fields.elements[1];
	fields.elements[2].value="";
	var bill_date=fields.elements[3];
	var entry_date=fields.elements[4];
	fields.elements[5].checked=false;
	fields.elements[6].value=get_new_key();
	fields.elements[7].value=fields.elements[6].value;
	var save_button=fields.elements[8];
	
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
	
	$(entry_date).datepicker();
	$(entry_date).val(get_my_date());

	supplier_filter.value='';
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
	var filter_fields=document.getElementById('form165_header');
	var product_filter=filter_fields.elements[0];
	var batch_filter=filter_fields.elements[1];
	var storage_filter=filter_fields.elements[2];
	var storage_level=get_session_var('storage_level');
	
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var batch_data="<product_instances>" +
			"<batch></batch>" +
			"</product_instances>";
	var storage_data="<store_areas>"+
			"<name></name>"+
			"<area_type exact='yes'>"+storage_level+"</area_type>"+
			"</store_areas>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form165_ini();
	});

	set_my_filter(products_data,product_filter);
	set_my_filter(batch_data,batch_filter);
	set_my_filter(storage_data,storage_filter);
};


/**
 * @form Manage sale prices
 * @formNo 166
 */
function form166_header_ini()
{
	var filter_fields=document.getElementById('form166_header');	
	var names_filter=filter_fields.elements[0];
	var batches_filter=filter_fields.elements[1];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form166_ini();
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
			"<channel_sysmte_sku></channel_sysmte_sku>" +
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
	var status_filter=filter_fields.elements[1];
	
	var name_data="<business_processes>" +
			"<name></name>" +
			"<type exact='yes'>production</type>"+
			"</business_processes>";
	
	set_my_filter(name_data,name_filter);
	set_static_filter('business_processes','status',status_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form184_ini();
	});
};

/**
 * @form Track Manufacturing
 * @formNo 185
 */
function form185_header_ini()
{
	$("#form185_body").parent().hide();
	$("#form185_nav").hide();
	$("#form185_calendar").show();
}

function form185_switch_view()
{
	$("#form185_body").parent().toggle();
	$("#form185_nav").toggle();
	$("#form185_calendar").toggle();
}

/**
 * @form Create Production Plan
 * @formNo 186
 */
function form186_header_ini()
{
	var fields=document.getElementById('form186_master');
	
	var plan_filter=fields.elements[1];
	var from_filter=fields.elements[2];
	var to_filter=fields.elements[3];
	var status_filter=fields.elements[4];
	fields.elements[5].value=get_new_key();
	var save_button=fields.elements[6];
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form186_create_form();
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
		form186_add_item();
	});
	
	$(from_filter).datepicker();
	$(from_filter).val(get_my_date());
	
	$(to_filter).datepicker();
	$(to_filter).val(get_my_date());

	plan_filter.value="";
	$(plan_filter).focus();
}

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
 * @form Manage Production Plans
 * @formNo 189
 */
function form189_header_ini()
{
	var filter_fields=document.getElementById('form189_header');
	var name_filter=filter_fields.elements[0];
	var status_filter=filter_fields.elements[1];
	
	var name_data="<production_plan>" +
			"<name></name>" +
			"</production_plan>";
	
	set_my_filter(name_data,name_filter);
	set_static_filter('production_plan','status',status_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form189_ini();
	});
};

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
 * @form Manage Values lists
 * @formNo 191
 */
function form191_header_ini()
{
	var filter_fields=document.getElementById('form191_header');
	var table_filter=filter_fields.elements[0];
	var list_filter=filter_fields.elements[1];
	var value_filter=filter_fields.elements[2];
	var status_filter=filter_fields.elements[3];
	
	var table_data="<values_list>" +
			"<tablename></tablename>" +
			"</values_list>";
	set_my_filter(table_data,table_filter);
	
	var list_data="<values_list>" +
			"<listname></listname>" +
			"</values_list>";
	set_my_filter(list_data,list_filter);
	
	var value_data="<values_list>" +
			"<name></name>" +
			"</values_list>";
	set_my_filter(value_data,value_filter);

	set_static_filter('values_list','status',status_filter);
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form191_ini();
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
