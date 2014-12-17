/**
 * @form Update Inventory
 * @formNo 1
 */
function form1_header_ini()
{
	var filter_fields=document.getElementById('form1_header');	
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
	
	var import_button=filter_fields.elements[5];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form1_import_template,form1_import);
	});
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
	
	var assets_data="<assets>" +
		"<name></name>" +
		"</assets>";
	
	set_my_filter(assets_data,asset_filter);
	set_static_filter('assets','type',type_filter);
	
	var import_button=filter_fields.elements[4];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form5_import_template,form5_import);
	});
};



/**
 * @form Attendance
 * @formNo 7
 */
function form7_header_ini()
{
	var fields=document.getElementById('form7_master');
	var date_filter=fields.elements[1];
	
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form7_update_form();
	});
	
	var filter_fields=document.getElementById('form7_header');
	var staff_filter=filter_fields.elements[0];
	var attendance_filter=filter_fields.elements[1];
	
	var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	
	set_my_filter(staff_data,staff_filter);
	set_static_filter('attendance','presence',attendance_filter);

	$(date_filter).datepicker();
	date_filter.value=get_my_date();
	$("#form7_master").hide();
	$("#form7_body").parent().hide();
	$("#attendance_calendar").show();
	///initializing calendar
	
	$('#attendance_calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title'
		//	right: 'month,agendaWeek,agendaDay'
		},
		height:400,
		fixedWeekCount:false,
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		events: function(start, end, timezone, callback)
		{
	        var start_time=(parseFloat(start.unix())-1000)*1000;
	        var end_time=parseFloat(end.unix())*1000;
	        console.log(start_time);
	        console.log(end_time);
	        var attendance_data="<attendance>" +
	        		"<presence></presence>" +
	        		"<hours_worked></hours_worked>" +
	        		"<date compare='more than'>"+start_time+"</date>" +
	        		"<date compare='less than'>"+end_time+"</date>" +
	        		"</attendance>";
	        fetch_requested_data('form7',attendance_data,function(attendances)
	        {
	        	console.log(attendances);
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
	        			textColor:'#fff'
	        		});
	        	}
	        	
	        	callback(events);
	        });
	    },
	    dayClick: function(date,jsEvent,view){
	    	//console.log(date.format());
	    	var my_date=get_my_date_from_iso(date.format());
	    	date_filter.value=my_date;
	    	form7_ini();
	    	$("#form7_master").show();
	    	$("#form7_body").parent().show();
	    	$("#attendance_calendar").hide();
	    }
	});
	
	//$('#attendance_calendar').fullCalendar('today');
	///calendar set
	
};



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

	set_my_filter(name_data,name_filter);	
	set_my_filter(phone_data,phone_filter);	
	set_my_filter(email_data,email_filter);
	set_static_filter('staff','status',status_filter);
	
	var import_button=filter_fields.elements[6];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form8_import_template,form8_import);
	});
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
	fields.elements[3].value=0;
	fields.elements[4].value=0;
	fields.elements[5].value=0;
	fields.elements[6].value=0;
	fields.elements[7].value=get_new_key();
	fields.elements[8].value="";
	fields.elements[9].value=get_new_key();
	var email_filter=fields.elements[13];
	var phone_filter=fields.elements[14];
		
	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form10_create_form();
	});
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter);
	
	$(customers_filter).off('blur');
	$(customers_filter).on('blur', function(event)
	{
		var email_data="<customers>" +
				"<email></email>" +
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		set_my_value(email_data,email_filter);
		
		var phone_data="<customers>" +
				"<phone></phone>" +
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		set_my_value(phone_data,phone_filter);
	});
	
	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	customers_filter.value='';
	
	$(customers_filter).focus();
}

/**
 * This function clears the form10 for new bill
 */
function form10_new_form()
{
	form10_header_ini();
	$("#form10_body").find("tr").remove();
	$("#form10_whatsapp").hide();
	$("#form10_gmail").hide();
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
	
	set_my_filter(accounts_data,account_filter);
	set_static_filter('payments','type',type_filter);
	set_static_filter('payments','status',status_filter);
	
	var import_button=filter_fields.elements[4];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form11_import_template,form11_import);
	});
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
	fields.elements[3].value=0;
	fields.elements[4].value=0;
	fields.elements[5].value=0;
	fields.elements[6].value=0;
	fields.elements[7].value=get_new_key();
	fields.elements[8].value="";
	fields.elements[9].value=get_new_key();
	var email_filter=fields.elements[13];
	var phone_filter=fields.elements[14];
	
	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form12_create_form();
	});
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter);
	
	$(customers_filter).off('blur');
	$(customers_filter).on('blur', function(event)
	{
		var email_data="<customers>" +
				"<email></email>" +
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		set_my_value(email_data,email_filter);
		
		var phone_data="<customers>" +
				"<phone></phone>" +
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		set_my_value(phone_data,phone_filter);
	});
	
	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	customers_filter.value='';
	$(customers_filter).focus();
}

/**
 * This function clears the form12 for new bill
 */
function form12_new_form()
{
	form12_header_ini();
	$("#form12_body").find("tr").remove();
	$("#form12_whatsapp").hide();
	$("#form12_gmail").hide();
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
	        		"<t_initiated compare='more than'>"+start_time+"</t_initiated>" +
	        		"<t_initiated compare='less than'>"+end_time+"</t_initiated>" +
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
	
	var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	var task_data="<task_type>" +
			"<name></name>" +
			"</task_type>";
	
	set_my_filter(task_data,task_filter);	
	set_my_filter(staff_data,assignee_filter);
	set_static_filter('task_instances','status',status_filter);
	
	var import_button=filter_fields.elements[5];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form14_import_template,form14_import);
	});
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
	fields.elements[3].value=0;
	fields.elements[4].value=get_new_key();
	fields.elements[5].value=get_new_key();
	fields.elements[6].value=0;
	var email_filter=fields.elements[10];
	var phone_filter=fields.elements[11];
	
	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form15_create_form();
	});
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter);
	
	$(customers_filter).off('blur');
	$(customers_filter).on('blur', function(event)
	{
		var email_data="<customers>" +
				"<email></email>" +
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		set_my_value(email_data,email_filter);
		
		var phone_data="<customers>" +
				"<phone></phone>" +
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		set_my_value(phone_data,phone_filter);
	});
	
	$(return_date).datepicker();
	return_date.value=get_my_date();
	customers_filter.value='';
	$(customers_filter).focus();
}

/**
 * This function clears the form15 for new return
 */
function form15_new_form()
{
	form15_header_ini();
	$("#form15_body").find("tr").remove();
	$("#form15_whatsapp").hide();
	$("#form15_gmail").hide();
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
	fields.elements[3].value=0;
	fields.elements[4].value=get_new_key();
	fields.elements[5].value=get_new_key();
	fields.elements[6].value=0;
	var email_filter=fields.elements[10];
	var phone_filter=fields.elements[11];
	
	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form19_create_form();
	});
	var suppliers_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	set_my_value_list(suppliers_data,supplier_filter);
	
	$(supplier_filter).off('blur');
	$(supplier_filter).on('blur', function(event)
	{
		var email_data="<suppliers>" +
				"<email></email>" +
				"<acc_name exact='yes'>"+supplier_filter.value+"</acc_name>" +
				"</suppliers>";
		set_my_value(email_data,email_filter);
		
		var phone_data="<suppliers>" +
				"<phone></phone>" +
				"<acc_name exact='yes'>"+supplier_filter.value+"</acc_name>" +
				"</suppliers>";
		set_my_value(phone_data,phone_filter);
	});
	
	$(return_date).datepicker();
	return_date.value=get_my_date();
	supplier_filter.value='';
	$(supplier_filter).focus();
}

/**
 * This function clears the form19 for new return
 */
function form19_new_form()
{
	form19_header_ini();
	$("#form19_body").find("tr").remove();
	$("#form19_whatsapp").hide();
	$("#form19_gmail").hide();
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
	fields.elements[5].value=0;
	var discount_filter=fields.elements[6];
	discount_filter.value=0;
	fields.elements[7].value=0;
	fields.elements[8].value=0;
	fields.elements[9].value="";
	fields.elements[10].value=get_new_key();
	fields.elements[11].value=fields.elements[10].value;
	
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form21_create_form();
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
 * This function clears the form21 for new bill
 */
function form21_new_form()
{
	form21_header_ini();
	$("#form21_body").find("tr").remove();
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
	var email_filter=fields.elements[8];
	var phone_filter=fields.elements[9];
	
	fields.elements[5].value=get_new_key();
	
	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form24_create_form();
	});
	var supplier_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	
	$(supplier_filter).off('blur');
	$(supplier_filter).on('blur', function(event)
	{
		var email_data="<suppliers>" +
				"<email></email>" +
				"<acc_name exact='yes'>"+supplier_filter.value+"</acc_name>" +
				"</suppliers>";
		set_my_value(email_data,email_filter);
		
		var phone_data="<suppliers>" +
				"<phone></phone>" +
				"<acc_name exact='yes'>"+supplier_filter.value+"</acc_name>" +
				"</suppliers>";
		set_my_value(phone_data,phone_filter);
	});
	
	set_my_value_list(supplier_data,supplier_filter);
	$(order_date).datepicker();
	order_date.value=get_my_date();
	set_static_filter('purchase_orders','status',status_filter);
	status_filter.value='draft';
	supplier_filter.value='';
}

/**
 * @form New Purchase Order
 * This function clears the form24 for new order
 */
function form24_new_form()
{
	form24_header_ini();
	$("#form24_body").find("tr").remove();
	$("#form24_whatsapp").hide();
	$("#form24_gmail").hide();
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
	
	var import_button=filter_fields.elements[6];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form30_import_template,form30_import);
	});
	
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
	
	set_my_filter(offer_data,name_filter);
	set_static_filter('offers','offer_type',type_filter);
	set_static_filter('offers','status',status_filter);
	
	var import_button=filter_fields.elements[5];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form35_import_template,form35_import);
	});
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
	
	set_my_filter(products_data,name_filter);
	set_my_filter(batch_data,batch_filter);
	set_my_filter(area_data,area_filter);
	
	var import_button=filter_fields.elements[5];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form38_import_template,form38_import);
	});
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
	
	set_my_filter(make_data,make_filter);
	set_my_filter(products_data,name_filter);
	
	var import_button=filter_fields.elements[4];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form39_import_template,form39_import);
	});
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

	set_my_filter(name_data,name_filter);
	set_my_filter(phone_data,phone_filter);
	set_my_filter(email_data,email_filter);
	
	var import_button=filter_fields.elements[5];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form40_import_template,form40_import);
	});

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
};

/**
 * @form Set defaults
 * @formNo 46
 */
function form46_header_ini()
{
	var filter_fields=document.getElementById('form46_header');
	var other_element=filter_fields.elements[0];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form46_update_form();
	});
	
	var other_data="<user_preferences>" +
			"<display_name></display_name>" +
			"<type>other</type>" +
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
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form48_update_form();
	});
	
	var reports_data="<user_preferences>" +
			"<display_name></display_name>" +
			"<type>report</type>" +
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
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form49_update_form();
	});
	
	var forms_data="<user_preferences>" +
			"<display_name></display_name>" +
			"<type>form</type>" +
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
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form50_update_form();
	});
	var accounts_data="<user_preferences>" +
			"<display_name></display_name>" +
			"<type>accounting</type>" +
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
		
	var username_data="<user_profiles>" +
			"<username></username>" +
			"</user_profiles>";
	set_my_value_list(username_data,users_filter);

	$(users_filter).on('select',function(event)
	{
		form51_ini();
	});
		
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form51_update_form();
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
	
	var templates_data="<user_preferences>" +
			"<display_name></display_name>" +
			"<type>template</type>" +
			"</user_preferences>";

	set_my_filter(templates_data,templates_filter);
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form54_update_form();
	});

};


/**
 * @form Cash register
 * @formNo 56
 */
function form56_header_ini()
{
	var filter_fields=document.getElementById('form56_header');
	var type_filter=filter_fields.elements[0];
	var account_filter=filter_fields.elements[1];
	
	var account_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	
	set_my_filter(account_data,account_filter);
	set_static_filter('cash_register','type',type_filter);	
	
	var import_button=filter_fields.elements[4];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form56_import_template,form56_import);
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
	
	var import_button=filter_fields.elements[3];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form57_import_template,form57_import);
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
			"<type>service</type>" +
			"</pre_requisites>";
	
	set_my_filter(service_data,service_filter);
	set_static_filter('pre_requisites','requisite_type',type_filter);
	set_my_filter(requisite_data,requisite_filter);
	
	var import_button=filter_fields.elements[5];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form58_import_template,form58_import);
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
			"<type>product</type>" +
			"</pre_requisites>";
	
	set_my_filter(product_data,product_filter);
	set_static_filter('pre_requisites','requisite_type',type_filter);
	set_my_filter(requisite_data,requisite_filter);
	
	var import_button=filter_fields.elements[5];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form59_import_template,form59_import);
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
	
	var import_button=filter_fields.elements[4];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form60_import_template,form60_import);
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
	
	var import_button=filter_fields.elements[4];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form61_import_template,form61_import);
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
	
	var import_button=filter_fields.elements[5];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form62_import_template,form62_import);
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
	
	var import_button=filter_fields.elements[5];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form63_import_template,form63_import);
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
	
	var import_button=filter_fields.elements[5];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form64_import_template,form64_import);
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
	
	var import_button=filter_fields.elements[5];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form66_import_template,form66_import);
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
	
	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form69_create_form();
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
 * @form New Sale Order
 * This function clears the form69 for new bill
 */
function form69_new_form()
{
	form69_header_ini();
	$("#form69_body").find("tr").remove();
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
	var type_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	
	var name_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";

	set_my_filter(name_data,name_filter);
	set_static_filter('accounts','type',type_filter);
	
	var import_button=filter_fields.elements[4];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form71_import_template,form71_import);
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
	fields.elements[3].value=0;
	fields.elements[4].value=0;
	fields.elements[5].value=0;
	fields.elements[6].value=0;
	fields.elements[7].value=get_new_key();
	fields.elements[8].value="";
	fields.elements[9].value=get_new_key();
	var email_filter=fields.elements[13];
	var phone_filter=fields.elements[14];
	
	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form72_create_form();
	});
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_filter(customers_data,customers_filter);
	
	$(customers_filter).off('blur');
	$(customers_filter).on('blur', function(event)
	{
		var email_data="<customers>" +
				"<email></email>" +
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		set_my_value(email_data,email_filter);
		
		var phone_data="<customers>" +
				"<phone></phone>" +
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		set_my_value(phone_data,phone_filter);
	});
	
	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	customers_filter.value='';
	
	$(customers_filter).focus();
}

/**
 * @form Create bills
 */
function form72_new_form()
{
	form72_header_ini();
	$("#form72_body").find("tr").remove();
	$("#form72_whatsapp").hide();
	$("#form72_gmail").hide();
}

/**
 * @form Set Shortcuts
 * @formNo 77
 */
function form77_header_ini()
{
	var filter_fields=document.getElementById('form77_header');
	var element_filter=filter_fields.elements[0];
	
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form77_update_form();
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
	
	$(name_filter).on('blur',function(event)
	{
		form78_ini();
	});
	
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		modal50_action();
	});
}

/**
 * @form Manage task types
 * @formNo 79
 */
function form79_header_ini()
{

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
	
	var import_button=filter_fields.elements[3];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form81_import_template,form81_import);
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
	fields.elements[3].value=0;
	fields.elements[4].value=0;
	fields.elements[5].value=0;
	fields.elements[6].value=0;
	fields.elements[7].value=get_new_key();
	var email_filter=fields.elements[11];
	var phone_filter=fields.elements[12];
	
	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form82_bill();
	});
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter);
	
	$(customers_filter).off('blur');
	$(customers_filter).on('blur', function(event)
	{
		var email_data="<customers>" +
				"<email></email>" +
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		set_my_value(email_data,email_filter);
		
		var phone_data="<customers>" +
				"<phone></phone>" +
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		set_my_value(phone_data,phone_filter);
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
	
	var area_data="<store_areas>" +
			"<name></name>" +
			"</store_areas>";
	
	set_my_filter(area_data,name_filter);
	
	var import_button=filter_fields.elements[3];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form83_import_template,form83_import);
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

	var import_button=filter_fields.elements[5];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form84_import_template,form84_import);
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
	
	var import_button=filter_fields.elements[4];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form87_import_template,form87_import);
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
	
	var import_button=filter_fields.elements[4];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form88_import_template,form88_import);
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
	        		"<schedule compare='more than'>"+start_time+"</schedule>" +
	        		"<schedule compare='less than'>"+end_time+"</schedule>" +
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
	
	var import_button=filter_fields.elements[5];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form89_import_template,form89_import);
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
	
	var import_button=filter_fields.elements[3];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form90_import_template,form90_import);
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
	fields.elements[4].value=0;
	fields.elements[5].value=0;
	fields.elements[6].value=0;
	fields.elements[7].value=0;
	fields.elements[8].value=get_new_key();
	fields.elements[9].value="";
	fields.elements[10].value=get_new_key();
	var email_filter=fields.elements[14];
	var phone_filter=fields.elements[15];
	
	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form91_create_form();
	});
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter);

	var type_data="<bill_types>" +
		"<name></name>" +
		"<status>active</status>" +
		"</bill_types>";
	set_my_value_list(type_data,bill_type);
	set_my_value(type_data,bill_type);
	
	$(customers_filter).off('blur');
	$(customers_filter).on('blur', function(event)
	{
		var email_data="<customers>" +
				"<email></email>" +
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		set_my_value(email_data,email_filter);
		
		var phone_data="<customers>" +
				"<phone></phone>" +
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		set_my_value(phone_data,phone_filter);
	});
	
	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	customers_filter.value='';
	$(customers_filter).focus();
}

/**
 * This function clears the form91 for new bill
 */
function form91_new_form()
{
	form91_header_ini();
	$("#form91_body").find("tr").remove();
	$("#form91_whatsapp").hide();
	$("#form91_gmail").hide();
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
};

/**
 * @form Manage Loans
 * @formNo 93
 */
function form93_header_ini()
{
	var filter_fields=document.getElementById('form93_header');
	var type_filter=filter_fields.elements[0];
	var account_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
	
	var account_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	
	set_my_filter(account_data,account_filter);
	set_static_filter('loans','type',type_filter);
	set_static_filter('loans','status',status_filter);
	
	var import_button=filter_fields.elements[5];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form93_import_template,form93_import);
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
	
	var import_button=filter_fields.elements[4];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form94_import_template,form94_import);
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
	
	var import_button=filter_fields.elements[4];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form96_import_template,form96_import);
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
	
	var import_button=filter_fields.elements[4];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form97_import_template,form97_import);
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
	
	var import_button=filter_fields.elements[4];
	$(import_button).off("click");
	$(import_button).on("click", function(event)
	{
		modal23_action(form98_import_template,form98_import);
	});
};
