/**
 * handles default page redirection for active session
 */
function default_load()
{
	show_loader();
    var location=window.location.pathname;
	if(((location.indexOf("index")>-1) || (location.indexOf(".php")==-1)) && is_set_session())
	{
		var domain=get_session_var('domain');
		window.location.assign("main.php?dn="+domain);
	}
	else if(!is_set_session() && (location.indexOf("main")>-1))
	{
		window.location.assign("index.html");
	}
	
	declaring_global_variables();
	
	modal_forms_ini();
	if(is_set_session())
	{
		//responsive_tabs();
		hide_unreadable_elements();
        setup_grid_display_tabs();
        date_formating();
        set_footer_message();
        my_sortable_tables();
		set_user_name();
        home_display();
        if(typeof calculate_grid_metrics!='undefined')
		{		
			calculate_grid_metrics();
		}
		if(typeof start_workers!='undefined')
		{
			start_workers();
		}
		
		float_labels();
		
		document.getElementById('master_title').innerHTML=get_session_var('title');
		hide_loader();
	}
	else
	{
		hide_loader();
	}
}

function declaring_global_variables()
{
	localdb_open_requests=0;
	number_active_ajax=0;
	loaderTimer=0;
	show_notif_timer=0;
	progress_value=0;
	vyavsaay_active_tab="";
	storage_count_tracker=0;
	total_export_requests=0;	
 	newsletter_element_4_deletion = [];
 	status_label_colors={'pending':'label-warning',
 			            'converted':'label-success',
 						'completed':'label-success',
 						'active':'label-success',
 						'inactive':'label-danger',
 						'cold':'label-danger',
 						'warm':'label-success',
                        'submitted':'label-info',
                        'approved':'label-success',
                        'rejected':'label-warning'};
}

function float_labels()
{
	$('.floatlabel').floatlabel();
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

function timed_execute(func,initial_delay,repeat_delay)
{
	var start_at=1000*parseInt(initial_delay);
	var repeat_at=1000*parseInt(repeat_delay);
	setTimeout(function()
	{
		if(localdb_open_requests===0 && number_active_ajax===0)
		{
			func();
			setTimeout(function()
			{
				timed_execute(func,initial_delay,repeat_delay);
			},repeat_at);
		}
		else
		{
			setTimeout(function()
			{
				timed_execute(func,initial_delay,repeat_delay);
			},5000);
		}
	},start_at);
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
			}
		});
	});
}

function setup_grid_display_tabs()
{
	system_grids_array.forEach(function(func)
	{
		var function_main=$("#"+func+"_main").find('ul').find('li').length;
		var hidden_function_main=$("#"+func+"_main").find('ul').find('li:hidden').length;
		if(function_main===0 || function_main===hidden_function_main)
		{
			$("#"+func+"_link").parent().hide();
			$("#nav-"+func).hide();
		}
	});
}

function show_function(function_id)
{
	hide_all();
	$("#"+function_id).show();
}

function modal_forms_ini()
{    
    $(".draggable-modal").draggable(
    {
    	handle: ".modal-header"
    });

	var width=300;
	if($(document).width<=550)
	{
		width=400;
	}
	
	var static_modal_array=[1,50,51,53,54,57,83,84];
	static_modal_array.forEach(function(i)
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
	});
	
	var dynamic_modal_array=[];
	for(var i=8;i<=10;i++)
	{
		dynamic_modal_array.push(i);
	}
	dynamic_modal_array.push(15);
	for(var i=17;i<=21;i++)
	{
		dynamic_modal_array.push(i);
	}
    dynamic_modal_array.push(24);
    dynamic_modal_array.push(25);
	for(var i=27;i<=30;i++)
	{
		dynamic_modal_array.push(i);
	}
    dynamic_modal_array.push(32);
    dynamic_modal_array.push(33);
    dynamic_modal_array.push(34);
    for(var i=36;i<=49;i++)
	{
		dynamic_modal_array.push(i);
	}
	for(var i=102;i<=105;i++)
	{
		dynamic_modal_array.push(i);
	}
    for(var i=107;i<=111;i++)
	{
		dynamic_modal_array.push(i);
	}
    dynamic_modal_array.push(113);
    dynamic_modal_array.push(114);
	for(var i=116;i<=133;i++)
	{
		dynamic_modal_array.push(i);
	}
	for(var i=137;i<=143;i++)
	{
		dynamic_modal_array.push(i);
	}
    for(var i=145;i<=152;i++)
	{
		dynamic_modal_array.push(i);
	}
    dynamic_modal_array.push(154);
	for(var i=156;i<=163;i++)
	{
		dynamic_modal_array.push(i);
	}
	for(var i=166;i<=168;i++)
	{
		dynamic_modal_array.push(i);
	}
	dynamic_modal_array.push(170);
	dynamic_modal_array.push(171);
	dynamic_modal_array.push(173);
	dynamic_modal_array.push(174);
	dynamic_modal_array.push(177);
	
	dynamic_modal_array.forEach(function(i)
	{
		$("#modal"+i).dialog({
	   		autoOpen: false,
	   		width: width,
	   		modal: true,
	   		show: "slide",
	   		closeOnEscape: true,
	   		close:function(event,ui)
	   		{
	   			var form_id="modal"+i+"_form";
	   			document.getElementById(form_id).reset();
	   		}
		});
	});	
}

function home_display()
{
	$(document).off('keydown');
	hide_all();
	$('#home_grid').show();	
}

function lock_screen(func)
{
	localStorage.removeItem('session');
	localStorage.removeItem('re');
	localStorage.removeItem('cr');
	localStorage.removeItem('up');
	localStorage.removeItem('del');
	
	if(typeof func!='undefined')
	{
		$('#lock_form').off('submit'); 
		$('#lock_form').on('submit',function (e) 
		{
			e.preventDefault();
			hide_lock_screen();
			func();
		});
	}
	else 
	{
		$('#lock_form').off('submit');
		$('#lock_form').on('submit',function (e) 
		{
			e.preventDefault();
			var domain=get_session_var('domain');
			var username=get_session_var('username');
			var pass=document.getElementById("lock_form").elements['password'].value;

			login_action(domain,username,pass,hide_lock_screen);
		});
	}

	show_lock_screen();
}

function show_lock_screen()
{
	$('.page-container').hide();
	$('.page-header').hide();
	$('.page-footer').hide();

	document.getElementById("lock_form").elements['password'].value="";
	$('#lock_screen_page').show();	
}

function hide_lock_screen()
{
	$('.page-container').show();
	$('.page-header').show();
	$('.page-footer').show();
	
	$('#lock_screen_page').hide();
	hide_loader();
}

function set_user_name()
{
	var name=get_session_var('name');
	$('.username').html(name);
}


function hide_menu_items()
{
	//console.log("hiding menu items");
	var loc=get_session_var('capture_location');
	$('#location_icon').hide();
	if(loc=='yes')
		$('#location_icon').show();
	
	var api_sync=get_session_var('api_sync');
	$('#api_sync_icon').hide();
	if(api_sync=='yes')
		$('#api_sync_icon').show();
		
	var offline=get_session_var('offline');
	if(offline=="online")
	{
		$('#online_icon').hide();
		$('#sync_icon').hide();
		$('#offline_icon').show();
	}
	else
	{
		$('#offline_icon').hide();
		$('#online_icon').show();
		$('#sync_icon').show();
	}
}

/**
 * this function hides all the elements on the main page
 */
function hide_all()
{
	$("#r_preferences").hide();
	$("#search_results_box").hide();
	$("#activities_box").hide();
	$("#notifications_box").hide();
	$(".vyavsaay_objects").hide();
	
	hide_all_grids();

	hide_menu_items();
	
	if(typeof worker_12!='undefined')
	{
		worker_12();
	}
		
	if(typeof form301_cancel_capture!='undefined')
	{
		form301_cancel_capture();
	}
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


function grid_click(func)
{
	show_function(func+"_main");

	$("#"+func+"_main").find('ul').find('li:visible').find('a').first().click();	
}


function element_display(fid,element_name,elements)
{
	if(is_read_access(element_name))
	{
		var element_link="#"+element_name+"_link";
		var function_link=$(element_link).parent().parent().parent().attr('id');
		show_function(function_link);
		$(element_link).attr('data_id',fid);
		$(element_link).click();
		$(element_link).attr('data_id','');		
	}
	else if(elements)
	{
		for(var i=0;i<elements.length;i++)
		{
			if(is_read_access(elements[i]))
			{
				var element_link="#"+elements[i]+"_link";
				var function_link=$(element_link).parent().parent().parent().attr('id');
				show_function(function_link);
				$(element_link).attr('data_id',fid);
				$(element_link).click();
				$(element_link).attr('data_id','');
				break;
			}
		}
	}
}

function show_object(object_type,obj_name,obj_id) 
{
	if(is_read_object(object_type))
	{
		if_data_access_object(object_type,obj_name,function () 
		{
			initialize_object(object_type,obj_name,obj_id);
			$("#object_"+object_type).click();
		},function () 
		{
            console.log('no data access');
			$('#modal2_link').click();
		});
	}
	else
	{
        console.log('no system access');
		$('#modal2_link').click();
	}
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
		case 'form8':modal23_action(form8_import_template,form8_import,form8_import_validate);
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
		case 'form30':modal23_action(form30_import_template,form30_import,form30_import_validate);
		break;
		case 'form35':modal23_action(form35_import_template,form35_import);
		break;
		case 'form38':modal23_action(form38_import_template,form38_import,form38_import_validate);
		break;
		case 'form39':modal23_action(form39_import_template,form39_import,form39_import_validate);
		break;
		case 'form40':modal23_action(form40_import_template,form40_import,form40_import_validate);
		break;
		case 'form41':modal23_action(form41_import_template,form41_import);
		break;
		case 'form42':modal23_action(form42_import_template,form42_import);
		break;
		case 'form43':modal23_action(form43_import_template,form43_import);
		break;
		case 'form53':modal23_action(form53_import_template,form53_import);
		break;
		case 'form54':modal23_action(form54_import_template,form54_import);
		break;
		case 'form56':modal23_action(form56_import_template,form56_import,form56_import_validate);
		break;
		case 'form57':modal23_action(form57_import_template,form57_import);
		break;
		case 'form58':modal23_action(form58_import_template,form58_import);
		break;
		case 'form59':modal23_action(form59_import_template,form59_import);
		break;
		case 'form60':modal23_action(form60_import_template,form60_import,form60_import_validate);
		break;
		case 'form61':modal23_action(form61_import_template,form61_import,form61_import_validate);
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
		case 'form71':modal23_action(form71_import_template,form71_import,form71_import_validate);
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
		case 'form83':modal23_action(form83_import_template,form83_import,form83_import_validate);
		break;
		case 'form84':modal23_action(form84_import_template,form84_import);
		break;
		case 'form85':modal23_action(form85_import_template,form85_import);
		break;
		case 'form86':modal23_action(form86_import_template,form86_import);
		break;
		case 'form87':modal23_action(form87_import_template,form87_import,form87_import_validate);
		break;
		case 'form88':modal23_action(form88_import_template,form88_import);
		break;
		case 'form89':modal23_action(form89_import_template,form89_import);
		break;
		case 'form91':modal23_action(form91_import_template,form91_import);
		break;
		case 'form93':modal23_action(form93_import_template,form93_import);
		break;
		case 'form94':modal23_action(form94_import_template,form94_import);
		break;
		case 'form96':modal23_action(form96_import_template,form96_import,form96_import_validate);
		break;
		case 'form97':modal23_action(form97_import_template,form97_import,form97_import_validate);
		break;
		case 'form98':modal23_action(form98_import_template,form98_import,form98_import_validate);
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
		case 'form109':modal23_action(form109_import_template,form109_import,form109_import_validate);
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
		case 'form123':modal23_action(form123_import_template,form123_import,form123_import_validate);
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
		case 'form145':modal23_action(form145_import_template,form145_import,form145_import_validate);
		break;
		case 'form146':modal23_action(form146_import_template,form146_import);
		break;
		case 'form147':modal23_action(form147_import_template,form147_import,form147_import_validate);
		break;
		case 'form149':modal23_action(form149_import_template,form149_import,form149_import_validate);
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
		case 'form169':modal23_action(form169_import_template,form169_import,form169_import_validate);
		break;
		case 'form170':modal23_action(form170_import_template,form170_import,form170_import_validate);
		break;
		case 'form171':modal23_action(form171_import_template,form171_import);
		break;
		case 'form172':modal23_action(form172_import_template,form172_import);
		break;
		case 'form173':modal23_action(form173_import_template,form173_import,form173_import_validate);
		break;
		case 'form174':modal23_action(form174_import_template,form174_import);
		break;
		case 'form175':modal23_action(form175_import_template,form175_import);
		break;
		case 'form176':modal23_action(form176_import_template,form176_import);
		break;
		case 'form177':modal23_action(form177_import_template,form177_import);
		break;
		case 'form178':modal23_action(form178_import_template,form178_import);
		break;
		case 'form179':modal23_action(form179_import_template,form179_import);
		break;
		case 'form184':modal23_action(form184_import_template,form184_import);
		break;
		case 'form187':modal23_action(form187_import_template,form187_import);
		break;
		case 'form190':modal23_action(form190_import_template,form190_import);
		break;
		case 'form191':modal23_action(form191_import_template,form191_import,form191_import_validate);
		break;
		case 'form193':modal23_action(form193_import_template,form193_import);
		break;
		case 'form195':modal23_action(form195_import_template,form195_import);
		break;
		case 'form197':modal23_action(form197_import_template,form197_import);
		break;
		case 'form203':modal23_action(form203_import_template,form203_import);
		break;
		case 'form213':modal23_action(form213_import_template,form213_import);
		break;
		case 'form217':modal23_action(form217_import_template,form217_import,form217_import_validate);
		break;
		case 'form220':modal23_action(form220_import_template,form220_import);
		break;
		case 'form221':modal23_action(form221_import_template,form221_import);
		break;
		case 'form226':modal23_action(form226_import_template,form226_import);
		break;
		case 'form230':modal23_action(form230_import_template,form230_import);
		break;
		case 'form234':modal23_action(form234_import_template,form234_import,form234_import_validate);
		break;
		case 'form245':modal23_action(form245_import_template,form245_import,form245_import_validate);
		break;
		case 'form246':modal23_action(form246_import_template,form246_import);
		break;
		case 'form247':modal23_action(form247_import_template,form247_import);
		break;
		case 'form260':modal23_action(form260_import_template,form260_import,form260_import_validate);
		break;
		case 'form261':modal23_action(form261_import_template,form261_import,form261_import_validate);
		break;
		case 'form264':modal23_action(form264_import_template,form264_import,form264_import_validate);
		break;
		case 'form271':modal23_action(form271_import_template,form271_import,form271_import_validate);
		break;
		case 'form273':modal23_action(form273_import_template,form273_import,form273_import_validate);
		break;
		case 'form274':modal23_action(form274_import_template,form274_import,form274_import_validate);
		break;
		case 'form275':modal23_action(form275_import_template,form275_import,form275_import_validate);
		break;
		case 'form277':modal23_action(form277_import_template,form277_import,form277_import_validate);
		break;
		case 'form281':modal23_action(form281_import_template,form281_import,form281_import_validate);
		break;
		case 'form285':modal23_action(form285_import_template,form285_import,form285_import_validate);
		break;
		case 'form288':modal23_action(form288_import_template,form288_import,form288_import_validate);
		break;
		case 'form289':modal23_action(form289_import_template,form289_import,form289_import_validate);
		break;
		case 'form290':modal23_action(form290_import_template,form290_import,form290_import_validate);
		break;
		case 'form298':modal23_action(form298_import_template,form298_import,form298_import_validate);
		break;
		case 'form300':modal23_action(form300_import_template,form300_import,form300_import_validate);
		break;
        case 'form326':modal23_action(form326_import_template,form326_import,form326_import_validate);
		break;
        case 'form327':modal23_action(form327_import_template,form327_import,form327_import_validate);
		break;    
	}
}

function set_footer_message()
{
	var message=get_session_var('footer_message');
	if(message!="" && message!=null && message!='undefined')
		document.getElementById('footer_message').innerHTML=get_session_var('footer_message');
}