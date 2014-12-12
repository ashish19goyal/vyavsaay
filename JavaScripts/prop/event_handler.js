/**
 * handles default page redirection for active session
 */
function default_load()
{
	var location=window.location.pathname;
	if(((location.indexOf("index")>-1) || (location.indexOf(".php")==-1)) && is_set_session())
	{
		window.location.assign("main.php");
	}
	else if(!is_set_session() && (location.indexOf("main")>-1))
	{
		window.location.assign("index.php");
	}
	
	localdb_open_requests=0;
	number_active_ajax=0;
	loaderTimer=0;
	count_notif_timer=0;
	show_notif_timer=0;
	
	if(is_set_session())
	{
		set_menu_shortcuts();
		//setup_elements_display();
		setup_grid_display();
		date_formating();
		modal_forms_ini();
		print_setup();
		Chart.defaults.global.responsive = true;
		$('textarea').autosize();
		i18n_setup();
		home_display();
		start_workers();
	}
	hide_loader();
}

function start_workers()
{
	setTimeout(function()
	{
		set_grid_item_1();
		set_grid_item_2();
		set_grid_item_3();
		set_grid_item_4();
		set_grid_item_5();
		set_grid_item_6();
		set_grid_item_7();
		set_grid_item_8();
		set_grid_item_9();
		set_grid_item_11();
		set_grid_item_12();
		set_grid_item_13();
		set_grid_item_14();
		set_grid_item_15();
		set_grid_item_16();
		set_grid_item_17();
		set_grid_item_18();
		set_grid_item_19();
		set_grid_item_20();
		set_grid_item_22();
		set_grid_item_23();
		set_grid_item_24();
		set_grid_item_25();
		set_grid_item_26();
	},2000);
	setTimeout(function()
	{
		activities_lane_ini();
	},10000);
	setTimeout(function()
	{
		notifications_add();
	},20000);
	setTimeout(function()
	{
		notifications_add();
	},25000);
	setTimeout(function()
	{
		generate_attendance_records();
	},30000);
	setTimeout(function()
	{
		manufactured_products_outofstock();
	},40000);
	setTimeout(function()
	{
		loans_interest_processing();
	},50000);
	setTimeout(function()
	{
		loans_instalment_processing();
	},60000);
	setTimeout(function()
	{
		show_notif();
	},70000);
			
}

function show_function(function_id)
{
	hide_all();
	$(function_id).show();
}

function modal_forms_ini()
{
	for(var i=1;i<8;i++)
	{
		var dialog=$("#modal"+i).dialog({
	   		autoOpen: false,
	   		modal: true,
	   		width: 300,
	   		show: "slide",
	   		closeOnEscape: true,
	       	buttons:{ OK:function(){$(this).dialog("close");}}
		});
		dialog.find("form").on("submit", function(event)
		{
			event.preventDefault();
			$(this).parent().dialog("close");
		});
	}
	for(var i=8;i<40;i++)
	{
		var j=i;
		$("#modal"+i).dialog({
	   		autoOpen: false,
	   		width: 300,
	   		modal: true,
	   		show: "slide",
	   		closeOnEscape: true,
	   		close:function(event,ui)
	   		{
	   			var form_id="modal"+j+"_form";
	   			document.getElementById(form_id).reset();
	   		}
		});
	}
	for(var i=50;i<53;i++)
	{
		var dialog=$("#modal"+i).dialog({
	   		autoOpen: false,
	   		modal: true,
	   		width: 300,
	   		show: "slide",
	   		closeOnEscape: true,
	       	buttons:{ OK:function(){$(this).dialog("close");}}
		});
		dialog.find("form").on("submit", function(event)
		{
			event.preventDefault();
			$(this).parent().dialog("close");
		});
	}
}

function print_setup()
{
//	print_template_setup('sale_bill');
	print_css_setup('sale_bill');
	print_css_setup('purchase_order');
	print_css_setup('payment_receipt');
	print_css_setup('credit_note');
	print_css_setup('pamphlet');
	print_css_setup('service_bill');
	print_css_setup('product_bill');
	print_css_setup('return_receipt');
	print_css_setup('supplier_return');
}

function print_css_setup(name)
{
	var template_name=get_session_var(name);
	var link = document.createElement('link');
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("type", "text/css");
		link.setAttribute("href", "./templates/"+name+"/"+template_name+".css");
	document.head.appendChild(link);
}

function home_display()
{
	count_notif();
	hide_all();
	$('#home_grid').show();
}

function set_menu_username()
{
	var name=get_session_var('name');
	var hello=i18n.t("general.hello");
	$('#menu_username').html(hello+" "+name);
}

function setup_grid_display()
{
	var functions_array=['sale_bills','purchase','finances','products','services','inventory','customers','suppliers','staff','store','ecommerce','offers','maps','sale_reports'];
	functions_array.forEach(function(func)
	{
		var function_main=$("#"+func+"_main").find('ul').find('li').length;
		if(function_main===0)
		{
			$("#"+func+"_link").parent().hide();
		}
	});
}

function grid_click(func)
{
	show_function("#"+func+"_main");
	$("#"+func+"_main").find('ul').find('li').find('a').first().click();
}

function i18n_setup()
{
	var language=get_session_var('locale');
	var lan=language.substring(0,2);
	i18n.init({
		lng:lan,
		debug: true,
	    fallbackLng: false,
	    load:'unspecific',
	    resGetPath: "locales/__ns__-__lng__.json",
	    ns: {
	        namespaces: ['translation'],
	        defaultNs: 'translation'
	    }
	},function(t)
	{
		$('title').i18n();
		$("#content_box").find('div').i18n();
		$("#content_box").find('a').i18n();
		$(".side_lane").find('div').i18n();
		set_menu_username();
	});
}

function hide_menu_items()
{
	//console.log("hiding menu items");
	var offline=get_session_var('offline');
	if(offline=="online")
	{
		$('#offline_icon').hide();
		$('#sync_icon').hide();
		$('#online_icon').show();
	}
	else
	{
		$('#online_icon').hide();
		$('#offline_icon').show();
		$('#sync_icon').show();
	}
}

/**
 * this function hides all the elements on the main page
 */
function hide_all()
{
	$("#settings_main").hide();
	$("#r_preferences").hide();
	$("#search_results_box").hide();
	$("#all_activities_box").hide();
	$("#notifications_box").hide();
	
	//hide all functions
	$("#sale_bills_main").hide();
	$("#products_main").hide();
	$("#purchase_main").hide();
	$("#services_main").hide();
	$("#inventory_main").hide();
	$("#finances_main").hide();
	$("#ecommerce_main").hide();
	$("#customers_main").hide();
	$("#suppliers_main").hide();
	$("#staff_main").hide();
	$("#store_main").hide();
	$("#offers_main").hide();
	$("#sale_reports_main").hide();
	$("#maps_main").hide();
	hide_menu_items();
	
	$("#home_grid").hide();
	hide_loader();
}

/**
 * This function displays the laoder icon on the screen
 */
function show_loader()
{
		$("#loading_icon").show();
		$("#transparent_layer").show();
}

/**
 * This function hides the loader icon
 */
function hide_loader()
{
	$("#loading_icon").hide();
	$("#transparent_layer").hide();
}


function load_tooltips()
{
	$(".icon").tooltip();
}

/**
 * this function displays the fetched results in the search_results_box
 */
function show_search_results() 
{
	hide_all();
	$("#search_results_box").show();
	search_ini();
}

function show_all_activities() 
{
	hide_all();
	$("#all_activities_box").show();
	activities_ini();
}

function element_display(fid,element_name)
{
	var element_link="#"+element_name+"_link";
	var function_link=$(element_link).parent().parent().parent().attr('id');
	show_function("#"+function_link);
	$(element_link).attr('data_id',fid);
	$(element_link).click();
	$(element_link).attr('data_id','');
}

function set_menu_shortcuts()
{
	var shortcuts_data="<user_preferences>" +
			"<id></id>" +
			"<name></name>" +
			"<shortcut></shortcut>" +
			"<value>checked</value>" +
			"<type array='yes'>--form--report--</type>" +
			"</user_preferences>";

	fetch_requested_data('',shortcuts_data,function(results)
	{
		results.forEach(function(result)
		{
			if(result.shortcut!="")
			{	
				Mousetrap.bind(result.shortcut,function(e)
				{
			    	element_display('',result.name);
				});
			}
		});
	});
}


/**
 * this function displays the notifications in the main content box
 */
function show_notifications()
{
	hide_all();
	$("#notifications_box").show();
	notifications_ini();
}


/**
 * this function shows the settigns screen
 */
function show_settings()
{	
	hide_all();
	$("#settings_main").show();
}

function longPressEditable(element)
{
	$(element).each(function()
	{
		var pressTimer;
		$(this).on('touchend',function()
		{
			clearTimeout(pressTimer);
		}).on('touchstart',function()
		{
			var input_box=this;
			pressTimer = window.setTimeout(function()
			{
				$(input_box).removeAttr('readonly');
				$(input_box).focus();
			},500); 
		});
		
		$(this).dblclick(function()
		{
			$(this).removeAttr('readonly');
		});
	});
}

/**
 * set the text value to be editable
 * @param element
 */
function set_editable(element)
{
	$(element).removeAttr('readonly');
}

/**
 * set the text value to be non-editable
 * @param element
 */
function set_non_editable(element)
{
	$(element).attr('readonly','readonly');
}

/**
 * show filter as a text-box below the heading
 * @param element
 */
function show_filter(element)
{
	$(element).parent().find('.filter').css('visibility','visible');
	$(element).parent().find('.filter').css('opacity','1');
	$(element).parent().find('.filter').css('background-color','#ffffff');
	$(element).parent().find('.filter').css('color','#545453');
	$(element).parent().find('.filter').focus();
}

function date_formating()
{
	$.datepicker.setDefaults({
		dateFormat:"dd/mm/yy"
	});
}

