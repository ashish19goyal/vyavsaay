function responsive_tabs()
{
	$(window).resize(function(e)
	{
		if($(window).width()<=550)
		{
			tabsToAccordions();
			hide_unreadable_elements();
		}
		else 
		{
			//console.log('resized');
			accordionsToTabs();
			hide_unreadable_elements();
		}
	});
	if($(window).width()<=550)
	{
		tabsToAccordions();
		hide_unreadable_elements();
		setup_grid_display_accordion();
	}
	else{
		accordionsToTabs();
		hide_unreadable_elements();
		setup_grid_display_tabs();
	}
}

function setup_grid_display_tabs()
{
	var system_grids_array=['sale_bills','logistics','orders','drs','transit','purchase','finances','products','services','customer_service','treatment','projects','people','store','ecommerce','offers','manufacturing','maps','sale_reports','admin'];
	system_grids_array.forEach(function(func)
	{
		var function_main=$("#"+func+"_main").find('ul').find('li').length;
		var hidden_function_main=$("#"+func+"_main").find('ul').find('li:hidden').length;
		if(function_main===0 || function_main===hidden_function_main)
		{
			$("#"+func+"_link").hide();
		}
	});
}

function setup_grid_display_accordion()
{
	var system_grids_array=['sale_bills','logistics','orders','drs','transit','purchase','finances','products','services','customer_service','treatment','projects','people','store','ecommerce','offers','manufacturing','maps','sale_reports','admin'];
	system_grids_array.forEach(function(func)
	{
		var function_main=$("#"+func+"_main").find('h3').length;
		var hidden_function_main=$("#"+func+"_main").find('h3:hidden').length;
		if(function_main===0 || function_main===hidden_function_main)
		{
			$("#"+func+"_link").hide();
		}
	});
}

function tabsToAccordions()
{
	$(".vy_tabs").each(function(){
		var e=$("<div class='vy_accordion function_main' id='"+$(this).attr('id')+"' style='width:480px;'>");
		var t=new Array;
		$(this).find(">ul>li").each(function()
		{
			//console.log($(this).find("a").attr('onclick'));
			var a_tag=$(this).find('a');
			var onclick=$(a_tag).attr('onclick');
			$(a_tag).attr('onclick',"");			
			t.push("<h3 onclick='"+onclick+"'>"+$(this).html()+"</h3>");
		});
		var n=new Array;
		$(this).find(">div").each(function()
		{
			n.push("<div id='"+$(this).attr('id')+"' class='function_detail'>"+$(this).html()+"</div>");
		});
		for(var r=0;r<t.length;r++)
		{
			e.append(t[r]).append(n[r]);
		}
		$(this).before(e);
		$(this).remove();
	});
	init_functions_accordion();
}

function accordionsToTabs()
{
	$(".vy_accordion").each(function()
	{
		var e=$("<div class='vy_tabs function_main' id='"+$(this).attr('id')+"'>");
		var n=$("<ul>");
		$(this).find(">h3").each(function()
		{
			var a_tag=$(this).find('a');
			var onclick=$(this).attr('onclick');
			$(a_tag).attr('onclick',onclick);			
			n.append("<li>"+$(this).html()+"</li>");
		});
		var r=$("");
		$(this).find(">div").each(function()
		{
			r=r.add("<div id='"+$(this).attr('id')+"' class='function_detail'>"+$(this).html()+"</div>");
		});
		e.append(n).append(r);
		$(this).before(e);
		$(this).remove();
		$('.ui-accordion-header-icon').remove();
	});
	init_functions_tabs();
}

function init_functions_tabs()
{
	var system_grids_array=['sale_bills','logistics','orders','drs','transit','purchase','finances','products','services','customer_service','treatment','projects','people','store','ecommerce','offers','manufacturing','maps','sale_reports','admin','settings'];
	system_grids_array.forEach(function(func)
	{
		var function_main=$("#"+func+"_main");
		$(function_main).tabs(
		{
			show:"slide",
			activate:function(e, ui) 
		    {
		    	e.currentTarget.blur();
				if(func=='customers')
				{				
					if(typeof map41 != 'undefined')
					{
					  	map41.invalidateSize(false);
					}
				}
				else if(func=='customer_service')
				{
					$('#form131_calendar').fullCalendar('render');
		    		$('#form132_calendar').fullCalendar('render');
					if(typeof map129 != 'undefined')		    	
			    		map129.invalidateSize(false);
				}
				else if(func=='projects')
				{
					$('#form104_calendar').fullCalendar('render');
				}
				else if(func=='sale_bills')
				{
					$('#form89_calendar').fullCalendar('render');
				}
				else if(func=='staff')
				{
					if(typeof map86 != 'undefined')		    	
		    		{	
		    			map86.invalidateSize(false);
		    		}
		    		$('#form7_calendar').fullCalendar('render');
		    		$('#form14_calendar').fullCalendar('render');
				}
				else if(func=='suppliers')
				{
					if(typeof map85 != 'undefined')		    	
		    			map85.invalidateSize(false);
				}
				vyavsaay_active_tab=ui.newPanel.attr('id');
		    },
		    beforeActivate:function(event,ui)
		    {
		    	$(document).off('keydown');
			}
		}).css(
		{
			'min-height': '570px',
			'overflow': 'auto'
		});
	});
}

function init_functions_accordion()
{
	var system_grids_array=['sale_bills','logistics','orders','drs','transit','purchase','finances','products','services','customer_service','treatment','projects','people','store','ecommerce','offers','manufacturing','maps','sale_reports','admin','settings'];
	system_grids_array.forEach(function(func)
	{
		var function_main=$("#"+func+"_main");
		$(function_main).accordion(
		{
			collapsible:false,
			animate:500,
			active:false,
			activate:function(e, ui) 
		    {
		    	//e.currentTarget.blur();
				if(func=='customers')
				{				
					if(typeof map41 != 'undefined')
					{
					  	map41.invalidateSize(false);
					}
				}
				else if(func=='customer_service')
				{
					$('#form131_calendar').fullCalendar('render');
		    		$('#form132_calendar').fullCalendar('render');
					if(typeof map129 != 'undefined')		    	
			    		map129.invalidateSize(false);
				}
				else if(func=='projects')
				{
					$('#form104_calendar').fullCalendar('render');
				}
				else if(func=='sale_bills')
				{
					$('#form89_calendar').fullCalendar('render');
				}
				else if(func=='staff')
				{
					if(typeof map86 != 'undefined')		    	
		    			map86.invalidateSize(false);
		    		$('#form7_calendar').fullCalendar('render');
		    		$('#form14_calendar').fullCalendar('render');
				}
				else if(func=='suppliers')
				{
					if(typeof map85 != 'undefined')		    	
		    			map85.invalidateSize(false);
				}
				vyavsaay_active_tab=ui.newPanel.attr('id');
		    },
		    beforeActivate:function(event,ui)
		    {
		    	$(document).off('keydown');
			}
		}).css(
		{
			'min-height': '500px'
			//'overflow': 'auto'
		});
	});
}
