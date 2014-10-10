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
	if(is_set_session())
	{
		set_menu_shortcuts();
		set_menu_username();
		setup_elements_display();
		activities_ini();
		date_formating();
		load_tooltips();
		modal_forms_ini();
		count_notif();
		count_oppor();
		print_setup();
		Chart.defaults.global.responsive = true;
		hide_all();
	}
	hide_loader();
}

function show_function(function_id)
{
	hide_all();
	$('#home_grid').hide();
	$(function_id).show();
}

function modal_forms_ini()
{
	for(var i=1;i<7;i++)
	{
		var dialog=$("#modal"+i).dialog({
	   		autoOpen: false,
	   		modal: true,
	   		width: 300,
	   		show: "bounce",
	   		closeOnEscape: true,
	       	buttons:{ OK:function(){$(this).dialog("close");}}
		});
		dialog.find("form").on("submit", function(event)
		{
			event.preventDefault();
			$(this).parent().dialog("close");
		});
	}
	for(var i=7;i<22;i++)
	{
		var dialog=$("#modal"+i).dialog({
	   		autoOpen: false,
	   		width: 300,
	   		modal: true,
	   		show: "bounce",
	   		closeOnEscape: true,
		});
	}
}

function print_setup()
{
//	print_template_setup('sale_bill');
	print_css_setup('pamphlet');
	print_css_setup('credit_note');
	print_css_setup('payment_receipt');
	print_css_setup('purchase_order');
	print_css_setup('return_receipt');
	print_css_setup('sale_bill');
	print_css_setup('service_receipt');
}

function print_css_setup(name)
{
	var template_name=sessionStorage.getItem(name);
	var link = document.createElement('link');
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("type", "text/css");
		link.setAttribute("href", "./templates/"+name+"/"+template_name+".css");
	document.head.appendChild(link);
}

function home_display()
{
	count_notif();
	count_oppor();
	hide_all();
}

function set_menu_username()
{
	var name=sessionStorage.getItem('name');
	$('#menu_username').html("Hello "+name);
}

function setup_elements_display()
{
	$(".function_main").find('ul').find('li').hide();

	var forms_data="<access_control>" +
			"<element_id></element_id>" +
			"<username>"+get_username()+"</username>" +
			"<status>active</status>" +
			"<re>checked</re>" +
			"</access_control>";
	
	get_single_column_data(function(elements)
	{
		for(var i in elements)
		{
			$("#"+elements[i]+"_link").parent().show();
			//$("#"+elements[i]+"_link").click();
		}
	},forms_data);
}


function hide_menu_items()
{
	//console.log("hiding menu items");
	var offline=sessionStorage.getItem('offline');
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
	$("#notifications_box").hide();
	$("#opportunities_box").hide();
	//hide all functions
	$("#sale_bills_main").hide();
	$("#products_main").hide();
	$("#purchase_main").hide();
	$("#services_main").hide();
	$("#inventory_main").hide();
	$("#finances_main").hide();
	$("#customers_main").hide();
	$("#suppliers_main").hide();
	$("#staff_main").hide();
	$("#store_main").hide();
	$("#offers_main").hide();
	$("#sale_reports_main").hide();
	$("#maps_main").hide();
	hide_menu_items();
	
	$("#home_grid").show();
	hide_loader();
	//$(".forms").show();
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
 * this function displays the opportunities in the main content box
 */
function show_opportunities()
{
	hide_all();	
	$("#opportunities_box").show();
	opportunities_ini();
}


/**
 * this function shows the settigns screen
 */
function show_settings()
{	
	hide_all();
	$("#settings_main").show();
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

