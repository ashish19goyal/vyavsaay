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
	
	number_active_ajax=0;
	loaderTimer=0;
	
	if(is_set_session())
	{
		set_menu_shortcuts();
		setup_elements_display();
		date_formating();
		modal_forms_ini();
		print_setup();
		Chart.defaults.global.responsive = true;
		$('textarea').autosize();
		i18n_setup();
		home_display();
		setTimeout(function()
		{
			activities_lane_ini();
		},10000);
		setTimeout(function()
		{
			notifications_add();
		},50000);
	}
	hide_loader();
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
	for(var i=8;i<34;i++)
	{
		$("#modal"+i).dialog({
	   		autoOpen: false,
	   		width: 300,
	   		modal: true,
	   		show: "slide",
	   		closeOnEscape: true,
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
	$('#home_grid').show();
}

function set_menu_username()
{
	var name=sessionStorage.getItem('name');
	var hello=i18n.t("general.hello");
	$('#menu_username').html(hello+" "+name);
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
	$("#all_activities_box").hide();
	$("#notifications_box").hide();
	$("#opportunities_box").hide();
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
	//$(".forms").show();
}

/**
 * This function displays the laoder icon on the screen
 */
function show_loader()
{
	loaderTimer=window.setTimeout(function()
	{
		$("#loading_icon").show();
		$("#transparent_layer").show();
	},100);
	
}

/**
 * This function hides the loader icon
 */
function hide_loader()
{
	clearTimeout(loaderTimer);
	$("#loading_icon").hide();
	$("#transparent_layer").hide();
}

function resize_input()
{
/*
	$('input[type="text"]').keyup(function()
	{  
		$(this).attr({size: $(this).val().length});
	});
	$('input[type="number"]').keyup(function()
	{  
		//console.log($(this).val().length);
		$(this).attr({size: $(this).val().length});
	});
*/	
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
	var shortcuts_data="<shortcuts>" +
			"<id></id>" +
			"<element_id></element_id>" +
			"<element_name></element_name>" +
			"<shortcut></shortcut>" +
			"<status>active</status>" +
			"</shortcuts>";

	fetch_requested_data('',shortcuts_data,function(results)
	{
		results.forEach(function(result)
		{
			if(result.shortcut!="")
			{	
				//var shortcut=result.shortcut.replace(" ","+");
				Mousetrap.bind(result.shortcut, function(e)
				{
					console.log('shortcut used'+result.shortcut);
			    	element_display('',result.element_id);
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

