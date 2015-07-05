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
		window.location.assign("index.html");
	}
	
	localdb_open_requests=0;
	number_active_ajax=0;
	loaderTimer=0;
	count_notif_timer=0;
	show_notif_timer=0;
	progress_value=0;
	modal_forms_ini();

	if(is_set_session())
	{
		add_questionnaires(function()
		{
			responsive_tabs();
			set_menu_shortcuts();
			date_formating();
			//print_setup();
			set_footer_message();
			add_grid_metrics();
			my_sortable_tables();
						
			Chart.defaults.global.responsive = true;
			Chart.defaults.global.scaleFontSize= 10;
			Chart.defaults.global.scaleFontColor="#000";
			Chart.defaults.global.maintainAspectRatio=false;
			$('textarea').autosize();
			i18n_setup();
			home_display();
			setTimeout(function()
			{
				start_workers();
			},get_worker_delay());
			deferred_execute(function()
			{
				activities_lane_ini();
			});
			document.getElementById('master_title').innerHTML=get_session_var('title');			
			hide_loader();					
		});
	}
	else
	{
		hide_loader();
	}
}


function show_progress()
{
	$("#progress_ind").show();
	$("#progress_bar").val(progress_value);
	$('#progress_value').html(parseInt(progress_value) + '%');
	progress_runner=setTimeout(show_progress,500);
}

function hide_progress()
{
	clearInterval(progress_runner);
	$("#progress_ind").hide();
	$("#progress_bar").val(0);
	$('#progress_value').html('0 %');
	progress_value=0;
}

function add_questionnaires(func)
{
	var struct_data="<ques_struct>"+
					"<id></id>"+
					"<name></name>"+
					"<display_name></display_name>"+
					"<func></func>"+
					"<status exact='yes'>active</status>"+										
					"</ques_struct>";
	fetch_requested_data('',struct_data,function(structs)
	{
		structs.forEach(function(struct)
		{
			var link="<li><a id='"+struct.name+"_link' href='#"+struct.name+"' onclick=\"initialize_questionnaires('"+struct.id+"','"+struct.name+"')\">"+struct.display_name+"</a></li>";	
			var content="<div id='"+struct.name+"' class='function_detail'></div>";
			var func_element=$("#"+struct.func+"_main");
			//console.log(func_element);			
			$("#"+struct.func+"_main").append(content);			
			$("#"+struct.func+"_main").find('ul').first().append(link);
		});
		func();
	});
}

function add_grid_metrics(func)
{
	var grid_xml="<system_grid_metrics>"+
				"<id></id>"+
				"<metric_id></metric_id>"+
				"<display_name></display_name>"+
				"<grid></grid>"+
				"<function_name></function_name>"+
				"<function_def></function_def>"+
				"<status exact='yes'>active</status>"+
				"</system_grid_metrics>";
				
	fetch_requested_data('',grid_xml,function(metrics)
	{
		//console.log(metrics);
		$('#script_grid_metrics').html("");
	
		var metric_by_grid=[];
		var script_content="";
		var function_names="";
		metrics.forEach(function(metric)
		{
			var new_grid=true;
			script_content+=revert_htmlentities(metric.function_def);
			function_names+=revert_htmlentities(metric.function_name);
			
			for(var i in metric_by_grid)
			{
				if(metric_by_grid[i].grid==metric.grid)
				{
					metric_by_grid[i].html=metric_by_grid[i].html+"<li>"+metric.display_name+": <a class='grid_item' id='"+metric.metric_id+"'></a></li>";
					new_grid=false;
					break;
				}
			}
			
			if(new_grid)
			{
				var new_object=new Object();
				new_object.grid=metric.grid;
				new_object.html="<li>"+metric.display_name+": <a class='grid_item' id='"+metric.metric_id+"'></a></li>";
				metric_by_grid.push(new_object);
			}
		});

		metric_by_grid.forEach(function(grid)
		{
			$('#'+grid.grid+'_link').find('ul').html(grid.html);
		});

		//to start auto-executing of all these functions		
		script_content+="(function () {deferred_execute(function(){"+function_names+"});}());";

		$('#script_grid_metrics').html(script_content);
	});
}

function deferred_execute(func)
{
	if(localdb_open_requests===0 && number_active_ajax===0)
	{
		func();
	}
	else
	{
		setTimeout(function()
		{
			deferred_execute(func);
		},5000);
	}
}

function start_workers()
{	
	deferred_execute(function()
	{notifications1_add();});
	
	deferred_execute(function()
	{notifications2_add();});
	
	deferred_execute(function()
	{notifications3_add();});
	
	deferred_execute(function()
	{notifications4_add();});
					
	deferred_execute(function()
	{notifications5_add();});
	
	deferred_execute(function()
	{notifications6_add();});
					
	deferred_execute(function()
	{notifications7_add();});

	deferred_execute(function()
	{notifications8_add();});
			
	deferred_execute(function()
	{sale_leads_add();});
	
	deferred_execute(function()
	{generate_attendance_records();});
	
	deferred_execute(function()
	{manufactured_products_outofstock();});
	
	deferred_execute(function()
	{loans_interest_processing();});
	
	deferred_execute(function()
	{loans_instalment_processing();});
	
	deferred_execute(function()
	{show_notif();});
}

function my_sortable_tables()
{
	jQuery(function($)
	{
		$('table.sortable>tbody').sortable(
		{
			axis: "y",
			stop: function(event, ui) 
			{
				ui.item.effect('highlight');
			},
			update: function(event, ui) 
			{
				var tbody_elem=ui.item.parent();
				var event=new Event('table_sort');				
				tbody_elem[0].dispatchEvent(event);

				//ui.item.parent().find('tr').each(function(index)
				//{
				//	$(this).find('td:nth-child(2)>input').attr('value',index+1);
				//});
			}
		});
	});
}


function show_function(function_id)
{
	hide_all();
	$(function_id).show();
}

function modal_forms_ini()
{
	var width=300;
	if($(document).width<=550)
	{
		width=400;
	}
	
	for(var i=1;i<8;i++)
	{
		var dialog=$("#modal"+i).dialog({
	   		autoOpen: false,
	   		modal: true,
	   		width: width,
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
	for(var i=8;i<50;i++)
	{
		var j=i;
		$("#modal"+i).dialog({
	   		autoOpen: false,
	   		width: width,
	   		modal: true,
	   		show: "slide",
	   		closeOnEscape: true,
	   		close:function(event,ui)
	   		{
	   			var form_id="modal"+j+"_form";
	   			document.getElementById(form_id).reset();
	   			//$("#modal"+j+"_form").trigger('reset');
	   		}
		});
	}
	for(var i=50;i<62;i++)
	{
		var dialog=$("#modal"+i).dialog({
	   		autoOpen: false,
	   		modal: true,
	   		width: width,
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
	for(var i=101;i<124;i++)
	{
		var j=i;
		$("#modal"+i).dialog({
	   		autoOpen: false,
	   		width: width,
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
}

function home_display()
{
	$(document).off('keydown');
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

function hide_unreadable_elements()
{
	var forms_array=[];
	var reports_array=[];
	for (var i=1;i<200;i++)
	{
		forms_array.push("form"+i);
		reports_array.push("report"+i);
	}
	forms_array.forEach(function(element)
	{
		$("#"+element+"_link").parent().hide();
		if(is_read_access(element))
		{
			$("#"+element+"_link").parent().show();
		}
	});
	reports_array.forEach(function(element)
	{
		$("#"+element+"_link").parent().hide();
		
		if(is_read_access(element))
		{
			$("#"+element+"_link").parent().show();
		}
	});
}


function grid_click(func)
{
	show_function("#"+func+"_main");

	if($(window).width()>550)
	{
		$("#"+func+"_main").find('ul').find('li:visible').find('a').first().click();
	}	
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
	var loc=get_session_var('capture_location');
	if(loc=='no')
		$('#location_icon').hide();
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
	//$("#inventory_main").hide();
	$("#finances_main").hide();
	$("#ecommerce_main").hide();
	$("#people_main").hide();
	//$("#customers_main").hide();
	$("#customer_service_main").hide();
	$("#projects_main").hide();
	//$("#suppliers_main").hide();
	//$("#staff_main").hide();
	$("#store_main").hide();
	$("#offers_main").hide();
	$("#maps_main").hide();
	$("#manufacturing_main").hide();
	$("#sale_reports_main").hide();
	$("#admin_main").hide();
	hide_menu_items();
	
	$("#home_grid").hide();
	$('.filter').hide();
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

function element_display(fid,element_name,elements)
{
	if(is_form_access(element_name))
	{
		var element_link="#"+element_name+"_link";
		var function_link=$(element_link).parent().parent().parent().attr('id');
		show_function("#"+function_link);
		$(element_link).attr('data_id',fid);
		$(element_link).click();
		$(element_link).attr('data_id','');
	}
	else if(elements)
	{
		for(var i=0;i<elements.length;i++)
		{
			if(is_form_access(elements[i]))
			{
				var element_link="#"+elements[i]+"_link";
				var function_link=$(element_link).parent().parent().parent().attr('id');
				show_function("#"+function_link);
				$(element_link).attr('data_id',fid);
				$(element_link).click();
				$(element_link).attr('data_id','');
				break;
			}
		}
	}
}

function access_display(tablename,record_id)
{
	var element_link="#form105_link";
	var function_link=$(element_link).parent().parent().parent().attr('id');
	show_function("#"+function_link);
	
	var fields=document.getElementById('form105_master');
	var table_filter=fields.elements[1];
	var record_filter=fields.elements[2];
	table_filter.value=tablename;
	record_filter.value=record_id;
	
	$(element_link).click();
	
	table_filter.setAttribute('readonly','readonly');
	record_filter.setAttribute('readonly','readonly');
}


function set_menu_shortcuts()
{
	var shortcuts_data="<user_preferences>" +
			"<id></id>" +
			"<name></name>" +
			"<shortcut></shortcut>" +
			"<value exact='yes'>checked</value>" +
			"<type array='yes'>--form--report--</type>" +
			"</user_preferences>";

	fetch_requested_data('',shortcuts_data,function(results)
	{
		results.forEach(function(result)
		{
			if(result.shortcut!="" && result.shortcut!="undefined")
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
	$("#settings_main").find('ul').find('li').find('a').first().click();
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
	$(element).parent().find('.filter').toggle();
	$(element).parent().find('.filter').focus();
}

function date_formating()
{
	$.datepicker.setDefaults({
		dateFormat:"dd/mm/yy"
	});
}

function import_data(form_name)
{
	switch(form_name)
	{
		case 'form1':modal23_action(form1_import_template,form1_import);
		break;
		case 'form2':modal23_action(form2_import_template,form2_import);
		break;
		case 'form5':modal23_action(form5_import_template,form5_import);
		break;
		case 'form7':modal23_action(form7_import_template,form7_import);
		break;
		case 'form8':modal23_action(form8_import_template,form8_import);
		break;
		case 'form10':modal23_action(form10_import_template,form10_import);
		break;
		case 'form11':modal23_action(form11_import_template,form11_import);
		break;
		case 'form12':modal23_action(form12_import_template,form12_import);
		break;
		case 'form14':modal23_action(form14_import_template,form14_import);
		break;
		case 'form15':modal23_action(form15_import_template,form15_import);
		break;
		case 'form16':modal23_action(form16_import_template,form16_import);
		break;
		case 'form17':modal23_action(form17_import_template,form17_import);
		break;
		case 'form19':modal23_action(form19_import_template,form19_import);
		break;
		case 'form21':modal23_action(form21_import_template,form21_import);
		break;
		case 'form24':modal23_action(form24_import_template,form24_import);
		break;
		case 'form30':modal23_action(form30_import_template,form30_import);
		break;
		case 'form35':modal23_action(form35_import_template,form35_import);
		break;
		case 'form38':modal23_action(form38_import_template,form38_import);
		break;
		case 'form39':modal23_action(form39_import_template,form39_import);
		break;
		case 'form40':modal23_action(form40_import_template,form40_import);
		break;
		case 'form41':modal23_action(form41_import_template,form41_import);
		break;
		case 'form42':modal23_action(form42_import_template,form42_import);
		break;
		case 'form43':modal23_action(form43_import_template,form43_import);
		break;
		case 'form44':modal23_action(form44_import_template,form44_import);
		break;
		case 'form46':modal23_action(form46_import_template,form46_import);
		break;
		case 'form47':modal23_action(form47_import_template,form47_import);
		break;
		case 'form48':modal23_action(form48_import_template,form48_import);
		break;
		case 'form49':modal23_action(form49_import_template,form49_import);
		break;
		case 'form50':modal23_action(form50_import_template,form50_import);
		break;
		case 'form51':modal23_action(form51_import_template,form51_import);
		break;
		case 'form53':modal23_action(form53_import_template,form53_import);
		break;
		case 'form54':modal23_action(form54_import_template,form54_import);
		break;
		case 'form56':modal23_action(form56_import_template,form56_import);
		break;
		case 'form57':modal23_action(form57_import_template,form57_import);
		break;
		case 'form58':modal23_action(form58_import_template,form58_import);
		break;
		case 'form59':modal23_action(form59_import_template,form59_import);
		break;
		case 'form60':modal23_action(form60_import_template,form60_import);
		break;
		case 'form61':modal23_action(form61_import_template,form61_import);
		break;
		case 'form62':modal23_action(form62_import_template,form62_import);
		break;
		case 'form63':modal23_action(form63_import_template,form63_import);
		break;
		case 'form64':modal23_action(form64_import_template,form64_import);
		break;
		case 'form66':modal23_action(form66_import_template,form66_import);
		break;
		case 'form69':modal23_action(form69_import_template,form69_import);
		break;
		case 'form70':modal23_action(form70_import_template,form70_import);
		break;
		case 'form71':modal23_action(form71_import_template,form71_import);
		break;
		case 'form72':modal23_action(form72_import_template,form72_import);
		break;
		case 'form74':modal23_action(form74_import_template,form74_import);
		break;
		case 'form75':modal23_action(form75_import_template,form75_import);
		break;
		case 'form76':modal23_action(form76_import_template,form76_import);
		break;
		case 'form77':modal23_action(form77_import_template,form77_import);
		break;
		case 'form78':modal23_action(form78_import_template,form78_import);
		break;
		case 'form79':modal23_action(form79_import_template,form79_import);
		break;
		case 'form80':modal23_action(form80_import_template,form80_import);
		break;
		case 'form81':modal23_action(form81_import_template,form81_import);
		break;
		case 'form82':modal23_action(form82_import_template,form82_import);
		break;
		case 'form83':modal23_action(form83_import_template,form83_import);
		break;
		case 'form84':modal23_action(form84_import_template,form84_import);
		break;
		case 'form85':modal23_action(form85_import_template,form85_import);
		break;
		case 'form86':modal23_action(form86_import_template,form86_import);
		break;
		case 'form87':modal23_action(form87_import_template,form87_import);
		break;
		case 'form88':modal23_action(form88_import_template,form88_import);
		break;
		case 'form89':modal23_action(form89_import_template,form89_import);
		break;
		case 'form90':modal23_action(form90_import_template,form90_import);
		break;
		case 'form91':modal23_action(form91_import_template,form91_import);
		break;
		case 'form92':modal23_action(form92_import_template,form92_import);
		break;
		case 'form93':modal23_action(form93_import_template,form93_import);
		break;
		case 'form94':modal23_action(form94_import_template,form94_import);
		break;
		case 'form96':modal23_action(form96_import_template,form96_import);
		break;
		case 'form97':modal23_action(form97_import_template,form97_import);
		break;
		case 'form98':modal23_action(form98_import_template,form98_import);
		break;
		case 'form101':modal23_action(form101_import_template,form101_import);
		break;
		case 'form102':modal23_action(form102_import_template,form102_import);
		break;
		case 'form103':modal23_action(form103_import_template,form103_import);
		break;
		case 'form104':modal23_action(form104_import_template,form104_import);
		break;
		case 'form108':modal23_action(form108_import_template,form108_import);
		break;
		case 'form109':modal23_action(form109_import_template,form109_import);
		break;
		case 'form112':modal23_action(form112_import_template,form112_import);
		break;
		case 'form113':modal23_action(form113_import_template,form113_import);
		break;
		case 'form114':modal23_action(form114_import_template,form114_import);
		break;
		case 'form115':modal23_action(form115_import_template,form115_import);
		break;
		case 'form118':modal23_action(form118_import_template,form118_import);
		break;
		case 'form119':modal23_action(form119_import_template,form119_import);
		break;
		case 'form120':modal23_action(form120_import_template,form120_import);
		break;
		case 'form121':modal23_action(form121_import_template,form121_import);
		break;
		case 'form122':modal23_action(form122_import_template,form122_import);
		break;
		case 'form123':modal23_action(form123_import_template,form123_import);
		break;
		case 'form124':modal23_action(form124_import_template,form124_import);
		break;
		case 'form125':modal23_action(form125_import_template,form125_import);
		break;
		case 'form136':modal23_action(form136_import_template,form136_import);
		break;
		case 'form137':modal23_action(form137_import_template,form137_import);
		break;
		case 'form139':modal23_action(form139_import_template,form139_import);
		break;
		case 'form140':modal23_action(form140_import_template,form140_import);
		break;
		case 'form142':modal23_action(form142_import_template,form142_import);
		break;
		case 'form143':modal23_action(form143_import_template,form143_import);
		break;
		case 'form146':modal23_action(form146_import_template,form146_import);
		break;
		case 'form147':modal23_action(form147_import_template,form147_import);
		break;
		case 'form149':modal23_action(form149_import_template,form149_import);
		break;
		case 'form154':modal23_action(form154_import_template,form154_import);
		break;
		case 'form155':modal23_action(form155_import_template,form155_import);
		break;
		case 'form156':modal23_action(form156_import_template,form156_import);
		break;
		case 'form157':modal23_action(form157_import_template,form157_import);
		break;
		case 'form158':modal23_action(form158_import_template,form158_import);
		break;
		case 'form159':modal23_action(form159_import_template,form159_import);
		break;
		case 'form160':modal23_action(form160_import_template,form160_import);
		break;
		case 'form161':modal23_action(form161_import_template,form161_import);
		break;
		case 'form162':modal23_action(form162_import_template,form162_import);
		break;
		case 'form163':modal23_action(form163_import_template,form163_import);
		break;
		case 'form164':modal23_action(form164_import_template,form164_import);
		break;
		case 'form165':modal23_action(form165_import_template,form165_import);
		break;
		case 'form166':modal23_action(form166_import_template,form166_import);
		break;
		case 'form167':modal23_action(form167_import_template,form167_import);
		break;
		case 'form168':modal23_action(form168_import_template,form168_import);
		break;
		case 'form169':modal23_action(form169_import_template,form169_import);
		break;
		case 'form170':modal23_action(form170_import_template,form170_import);
		break;
		case 'form171':modal23_action(form171_import_template,form171_import);
		break;
		case 'form172':modal23_action(form172_import_template,form172_import);
		break;
		case 'form173':modal23_action(form173_import_template,form173_import);
		break;
		case 'form174':modal23_action(form174_import_template,form174_import);
		break;
		case 'form175':modal23_action(form175_import_template,form175_import);
		break;
		case 'form176':modal23_action(form176_import_template,form176_import);
		break;
		case 'form177':modal23_action(form177_import_template,form177_import);
		break;
		case 'form184':modal23_action(form184_import_template,form184_import);
		break;
		case 'form187':modal23_action(form187_import_template,form187_import);
		break;
		case 'form190':modal23_action(form190_import_template,form190_import);
		break;
		case 'form191':modal23_action(form191_import_template,form191_import);
		break;
		case 'form195':modal23_action(form195_import_template,form195_import);
		break;
	}
}


function set_footer_message()
{
	var message=get_session_var('footer_message');
	if(message!="" && message!=null && message!='undefined')
		document.getElementById('footer_message').innerHTML=get_session_var('footer_message');
}