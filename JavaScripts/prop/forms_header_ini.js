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
 * @form Create Pamphlets
 * @formNo 2
 */
function form2_header_ini()
{
	var fields=document.getElementById('form2_master');
	fields.elements[1].value="";
	fields.elements[2].value=get_new_key();
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form2_create_form();
	});
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
	var phone_filter=filter_fields.elements[1];
	var email_filter=filter_fields.elements[2];
	var status_filter=filter_fields.elements[3];
	
	var name_data="<staff>" +
		"<name></name>" +
		"</staff>";
	var phone_data="<staff>" +
		"<phone></phone>" +
		"</staff>";
	var email_data="<staff>" +
		"<email></email>" +
		"</staff>";

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form8_ini();
	});

	set_my_filter(name_data,name_filter);	
	set_my_filter(phone_data,phone_filter);	
	set_my_filter(email_data,email_filter);
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
	var bill_date=fields.elements[2];
	fields.elements[3].value=get_new_key();
	fields.elements[4].value="";
	fields.elements[5].value=fields.elements[3].value;
	var save_button=fields.elements[6];
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form10_create_form();
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
		form10_add_item();
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
	fields.elements[3].value=get_new_key();
	fields.elements[4].value="";
	fields.elements[5].value=get_new_key();
	var save_button=fields.elements[6];
	
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
	fields.elements[3].value="";
	var status_filter=fields.elements[4];
	fields.elements[5].value=get_new_key();
	
	var save_button=fields.elements[6];
	
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
	var contact_filter=filter_fields.elements[1];
	var email_filter=filter_fields.elements[2];
	var status_filter=filter_fields.elements[3];

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form30_ini();
	});

	var name_data="<customers>" +
			"<name></name>" +
			"</customers>";
	var contact_data="<customers>" +
			"<phone></phone>" +
			"</customers>";
	var email_data="<customers>" +
			"<email></email>" +
			"</customers>";
	
	set_my_filter(name_data,name_filter);
	set_my_filter(contact_data,contact_filter);
	set_my_filter(email_data,email_filter);
	set_static_filter('customers','status',status_filter);
	
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
	var phone_filter=filter_fields.elements[1];
	var email_filter=filter_fields.elements[2];
	
	var name_data="<suppliers>" +
			"<name></name>" +
			"</suppliers>";
	var phone_data="<suppliers>" +
			"<phone></phone>" +
			"</suppliers>";
	var email_data="<suppliers>" +
			"<email></email>" +
			"</suppliers>";

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form40_ini();
	});

	set_my_filter(name_data,name_filter);
	set_my_filter(phone_data,phone_filter);
	set_my_filter(email_data,email_filter);
	
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
			"<id></id>" +
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
			"<id></id>" +
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
 * @form Manage Pamphlets
 * @formNo 44
 */
function form44_header_ini()
{
	var filter_fields=document.getElementById('form44_header');
	var name_filter=filter_fields.elements[0];
	
	var name_data="<pamphlets>" +
			"<name></name>" +
			"</pamphlets>";
	
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
	
	var username_data="<staff>" +
			"<username></username>" +
			"</staff>";
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
	fields.elements[3].value=get_new_key();
	fields.elements[4].value="";
	fields.elements[5].value=get_new_key();
	
	var save_button=fields.elements[6];
	
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
		form72_add_item();
	});
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_filter(customers_data,customers_filter);
	
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
	name_filter.value="";
	fields.elements[2].value="";
	
	var name_data="<pamphlets>" +
			"<name></name>" +
			"</pamphlets>";
	set_my_value_list(name_data,name_filter);
	
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form78_ini();
	});
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
	fields.elements[3].value=get_new_key();
	fields.elements[5].value=fields.elements[3].value;
	fields.elements[4].value="";
	var save_button=fields.elements[6];
	
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
	
	var area_data="<store_areas>" +
			"<name></name>" +
			"</store_areas>";
	
	set_my_filter(area_data,name_filter);
	
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
	fields.elements[4].value=get_new_key();
	fields.elements[5].value="";
	fields.elements[6].value=fields.elements[4].value;
	var save_button=fields.elements[7];
	
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

	var type_data="<bill_types>" +
		"<name></name>" +
		"<status exact='yes'>active</status>" +
		"</bill_types>";
	set_my_value_list(type_data,bill_type);
	set_my_value(type_data,bill_type);
	
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
			"<id></id>" +
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
	fields.elements[1].value="";
	fields.elements[2].value=get_new_key();
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form102_create_form();
	});
}

/**
 * @form Create project phases
 * @formNo 103
 */
function form103_header_ini()
{
	var fields=document.getElementById('form103_master');
	fields.elements[1].value="";
	fields.elements[2].value=get_new_key();
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form103_create_form();
	});
}

/**
 * @form Assign project tasks
 * @formNo 104
 */
function form104_header_ini()
{
	var project_id=$("#form104_link").attr('data_id');
	if(project_id==null)
		project_id="";	
	
	$("#form104_body").parent().show();
	$("#form104_calendar").hide();
	
	if(project_id!="")
	{
		var project_columns="<projects>" +
				"<id exact='yes'>"+project_id+"</id>" +
				"<name></name>" +
				"</projects>";
		
		fetch_requested_data('',project_columns,function(project_results)
		{
			for (var i in project_results)
			{
				var filter_fields=document.getElementById('form104_master');
				filter_fields.elements[1].value=project_results[i].name;
				filter_fields.elements[2].value=project_results[i].id;
				
				$(filter_fields).off('submit');
				$(filter_fields).on("submit", function(event)
				{
					event.preventDefault();
					form104_create_form();
				});
				break;
			}
		});
	
			
		$("#form104_body").parent().hide();
		$("#form104_calendar").show();
		///initializing calendar
	}
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
	set_my_value_list(tables_data,table);
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
	var batch_filter=filter_fields.elements[1];
	
	var item_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var batch_data="<product_instances>" +
			"<batch></batch>" +
			"</product_instances>";
	var cust_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form113_ini();
	});

	set_my_filter(cust_data,customer_filter);
	set_my_filter(item_data,item_filter);
	set_my_filter(batch_data,batch_filter);
};

/**
 * @form Add Unbilled Purchase Items
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
 * @form Manage Unbilled purchase Items
 * @formNo 115
 */
function form115_header_ini()
{
	var filter_fields=document.getElementById('form115_header');
	var supplier_filter=filter_fields.elements[0];
	var item_filter=filter_fields.elements[1];
	var batch_filter=filter_fields.elements[1];
	
	var item_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var batch_data="<product_instances>" +
			"<batch></batch>" +
			"</product_instances>";
	var supplier_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form113_ini();
	});

	set_my_filter(supplier_data,supplier_filter);
	set_my_filter(item_data,item_filter);
	set_my_filter(batch_data,batch_filter);
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
 * @form Create Bill(multiple registers, unbilled items)
 * @formNo 119
 */
function form119_header_ini()
{
	var fields=document.getElementById('form119_master');
	
	var customers_filter=fields.elements[1];
	var bill_type=fields.elements[2];
	var bill_date=fields.elements[3];
	fields.elements[4].value=0;
	fields.elements[5].value=get_new_key();
	fields.elements[6].value="";
	fields.elements[7].value=fields.elements[5].value;
	var unbilled_button=fields.elements[8];
	var save_button=fields.elements[9];
	
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

	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter);

	var type_data="<bill_types>" +
		"<name></name>" +
		"<status exact='yes'>active</status>" +
		"</bill_types>";
	set_my_value_list(type_data,bill_type);
	set_my_value(type_data,bill_type);
	
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
			fields.elements[4].value=customers.length;
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
							rowsHTML+="<br><input type='text' required readonly='readonly' form='form119_"+id+"' value='"+ub_item.item_name+"' name='product_name'>";
							rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' onclick='modal14_action();'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' required form='form119_"+id+"' readonly='readonly' name='batch' value='"+ub_item.batch+"'>";
							rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' onclick='modal22_action();'>";
							rowsHTML+="<br><v1>Expiry: </v1><label id='form119_exp_"+id+"'></label>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<v1>Bought: </v1><input type='number' min='0' required form='form119_"+id+"' step='any' name='squantity' value='"+ub_item.quantity+"'>";
							rowsHTML+="<br><v1>Free: </v1><input type='number' min='0' value='0' required form='form119_"+id+"' step='any' name='fquantity'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="<v1>Sale: </v1>Rs. <input type='number' required min='0' readonly='readonly' form='form119_"+id+"' step='any' name='unit_price'>";
							rowsHTML+="<br><v1>MRP: </v1>Rs. <input type='number' min='0' readonly='readonly' form='form119_"+id+"' step='any' name='mrp'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Total'>";
							rowsHTML+="<v1>Amount: </v1>Rs. <input type='number' required min='0' form='form119_"+id+"' readonly='readonly' step='any' name='amount'>";
							rowsHTML+="<input type='hidden' value='0' form='form119_"+id+"' readonly='readonly' name='discount'>";
							rowsHTML+="<br><v1>Tax: </v1>Rs. <input type='number' required min='0' value='0' form='form119_"+id+"' readonly='readonly' step='any' name='tax'>";
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
