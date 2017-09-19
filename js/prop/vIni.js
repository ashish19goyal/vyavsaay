/**
 * vIni
 * Author: Ashish Goyal
 * Description: this library provides operations to initialize the single page web app
 * Copyright: Copyright 2016 | Vyavsaay ERP
 */
var vIni = function()
{
	/**
	 * initializes the application
	 */
	this.initialize= function()
	{
		vIni.gvIni();
		show_loader();
	    var location=window.location.pathname;
		// console.log(location);
		if(((location.indexOf("index")>-1) || (location.indexOf(".php")==-1)) && is_set_session())
		{
			var domain=get_session_var('domain');
			var version=get_session_var('code_version');
			version = (version==null || version == "" || version =="undefined")? "1" : version;
			window.location.assign(server_root+"/main.php?dn="+domain+"&cv="+version);
		}
	    else if(!is_set_session() && (location.indexOf("main")>-1))
		{
			window.location.assign(server_root+logout_page);
		}

		if(is_set_session())
		{
			vIni.formatDate();
			if(typeof hide_unreadable_elements!='undefined')
			{
				hide_unreadable_elements();
			}
		    vIni.gridTabs();
		    vIni.sortableTables();
			vIni.setUsername();
	    	if(typeof calculate_grid_metrics!='undefined')
			{
				calculate_grid_metrics();
			}
			if(typeof start_workers!='undefined')
			{
				start_workers();
			}

			document.getElementById('master_title').innerHTML=get_session_var('title');

			var landing_page = get_session_var('landing_page');
			if(landing_page=='undefined' || landing_page==null || landing_page=="null" || landing_page=="")
			{
				navigate_history_url(location);
			}
			else{
				navigate_history_url(landing_page);
			}

			hide_loader();
			vIni.loadGoogleLib();
		}
		else
		{
			hide_loader();
		}
	};

	this.gvIni = function()
	{
	  	server_root="";
		logout_page=get_session_var('logout_page');
		if(logout_page=='undefined' || logout_page==null || logout_page=="null" || logout_page=="")
		{
			logout_page= "/index.html";
		}
		localdb_open_requests=0;
		number_active_ajax=0;
		loaderTimer=0;
		show_notif_timer=0;
		progress_value=0;
		vyavsaay_active_tab="";
		storage_count_tracker=0;
		total_export_requests=0;
		global_server_read_batch_size=500;
	 	newsletter_element_4_deletion = [];
	 	status_label_colors={'pending':'label-warning',
	    					'converted':'label-success',
	 						'completed':'label-success',
	 						'active':'label-success',
	 						'inactive':'label-danger',
	 						'cold':'label-danger',
	 						'warm':'label-success',
							'hot':'label-success',
	                        'submitted':'label-warning',
	                        'approved':'label-success',
	                        'rejected':'label-danger',
	                        'satisfactory':'label-success',
	                        'unsatisfactory':'label-danger'};
	};

	this.loadGoogleLib=function() {
	    var scriptTag = document.createElement('script');
	    scriptTag.src = "/js/open/googleAPIClient.js"; // set the src attribute
	    scriptTag.async = true; // the HTML5 async attribute
	    var headTag = document.getElementsByTagName('head')[0];
	    headTag.appendChild(scriptTag);
	};


	this.showProgress=function()
	{
		$("#progress_ind").show();
		$("#progress_bar").val(progress_value);
		$('#progress_value').html(parseInt(progress_value) + '%');
		progress_runner=setTimeout(vIni.showProgress,500);
	}

	this.hideProgress =function()
	{
		clearInterval(progress_runner);
		$("#progress_ind").hide();
		$("#progress_bar").val(0);
		$('#progress_value').html('0 %');
		progress_value=0;
	};

	this.sortableTables=function()
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
	};

	this.gridTabs=function()
	{
		system_grids_array.forEach(function(func)
		{
			var function_main=$("#"+func+"_main > ul > li").length;
			var hidden_function_main=$("#"+func+"_main > ul > li[data-select='no']").length;

			if(function_main===0 || function_main===hidden_function_main)
			{
				$("#"+func+"_link").parent().hide();
				$("#nav-"+func).hide();
			}
		});
	};

	this.lockScreen=function(func)
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
				vIni.hideLock();
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

				login_action(domain,username,pass,vIni.hideLock);
			});
		}

		vIni.showLock();
	};

	this.showLock=function()
	{
		$('.page-container').hide();
		$('.page-header').hide();
		$('.page-footer').hide();

		document.getElementById("lock_form").elements['password'].value="";
		$('#lock_screen_page').show();
	};

	this.hideLock=function()
	{
		$('.page-container').show();
		$('.page-header').show();
		$('.page-footer').show();

		$('#lock_screen_page').hide();
		hide_loader();
	};

	this.setUsername=function()
	{
		var name=get_session_var('name');
	    var acc_name=get_session_var('acc_name');
	    var user_id=get_session_var('user_id');

		$('.username').html(name);
	    $('#user_profile_nav').on('click',function()
	    {
	        show_object('staff',acc_name);
	    });

		var docs={data_store:'documents',return_column:'url',
				indexes:[{index:'doc_type',exact:'staff'},{index:'doc_name',exact:'image'},{index:'target_id',exact:user_id}]};
		read_json_single_column(docs,function(pics)
		{
			if(pics.length>0)
			{
				$('.profile-image').attr('src',pics[0]);
			}
		});
	};


	this.hideMenu=function()
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


	    $('#system_delete_logs').hide();
	    var del=get_session_var('del');
		if(del)
	    {
	        var found=del.search('activities-');
	        if(found>-1)
	        {
	            $('#system_delete_logs').show();
	        }
	    }

	    $('#system_config_backup').hide();
	    var re=get_session_var('re');
		if(re)
	    {
	        var found=re.search('db_backup-');
	        if(found>-1)
	        {
	            $('#system_config_backup').show();
	        }
	    }

		var offline=get_session_var('offline');
		var offline_disabled=get_session_var('offline_disabled');

		if(offline_disabled=='yes')
		{
			$('#online_icon').hide();
			$('#sync_icon').hide();
			$('#offline_icon').hide();
			$('#delete_offline_data').hide();
		}
		else if(offline=="online")
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
	};

	/**
	 * this function hides all the elements on the main page
	 */
	this.hideAll=function()
	{
		$("#r_preferences").hide();
		$("#search_results_box").hide();
		$("#activities_box").hide();
		$("#notifications_box").hide();
		$(".vyavsaay_objects").hide();

		hide_all_grids();

		vIni.hideMenu();

		if(typeof worker_12!='undefined')
		{
			worker_12();
		}

		if(typeof form301_cancel_capture!='undefined')
		{
			form301_cancel_capture();
		}
		$("#home_grid").hide();
		hide_loader();
	};

	this.formatDate=function()
	{
		$.datepicker.setDefaults({
			dateFormat:"dd/mm/yy"
		});
	};

	this.footerMessage=function()
	{
		var message=get_session_var('footer_message');
		if(message!="" && message!=null && message!='undefined')
			document.getElementById('footer_message').innerHTML=get_session_var('footer_message');
	};

};

var vIni=new vIni();
