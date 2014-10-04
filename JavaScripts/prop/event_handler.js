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
		default_hide();
	}
	hide_loader();
}

function modal_forms_ini()
{
	for(var i=1;i<5;i++)
	{
		var dialog=$("#modal"+i).dialog({
	   		autoOpen: false,
	   		modal: true,
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
	for(var i=5;i<15;i++)
	{
		var dialog=$("#modal"+i).dialog({
	   		autoOpen: false,
	   		modal: true,
	   		show: "bounce",
	   		closeOnEscape: true,
		});
	}

}

function print_setup()
{
	sale_bill_print_setup();
}

function home_display()
{
	count_notif();
	count_oppor();
	default_hide();
}

function set_menu_username()
{
	var name=sessionStorage.getItem('name');
	$('#menu_username').html("Hello "+name);
}

/**
 * hides and shows default sections in the content box on page load 
 */
function default_hide()
{
	hide_all();
	show_report_grid();
	hide_menu_items();
	hide_loader();
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

/**
 * this function shows the reports grid based on the selected user preferences
 */
function show_report_grid()
{
	$("#report_grid").show();
	if(!is_set_bills())
		$('#bills_grid').hide();
	
	if(!is_set_accounts())
		$('#accounts_grid').hide();
	
	if(!is_set_tasks())
		$('#tasks_grid').hide();
	
	if(!is_set_stocks())
		$('#stocks_grid').hide();
	
	if(!is_set_customers())
		$('#people_grid').hide();
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
	$("#hide_reports_icon").hide();
	$("#display_reports_icon").show();
}

/**
 * this function hides all the elements on the main page
 */
function hide_all()
{
	$("#accounts_main").hide();
	$("#bills_main").hide();
	$("#stocks_main").hide();
	$("#tasks_main").hide();
	$("#people_main").hide();
	$("#settings_main").hide();
	$("#r_preferences").hide();
	$("#search_results_box").hide();
	$("#notifications_box").hide();
	$("#opportunities_box").hide();
	$("#report_grid").hide();
	//$(".forms").show();
}

/**
 * sets the accounts main page to be displayed
 */
function accounts_grid_click()
{
	hide_all();
	$("#accounts_main").show();
}

/**
 * sets the bills main page to be displayed
 */
function bills_grid_click()
{
	hide_all();
	$("#bills_main").show();
}

/**
 * sets the stocks main page to be displayed
 */
function stocks_grid_click()
{
	hide_all();
	$("#stocks_main").show();
}

/**
 * sets the tasks main page to be displayed
 */
function tasks_grid_click()
{
	hide_all();
	$("#tasks_main").show();
}

/**
 * sets the customers main page to be displayed
 */
function people_grid_click()
{
	hide_all();
	$("#people_main").show();
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

