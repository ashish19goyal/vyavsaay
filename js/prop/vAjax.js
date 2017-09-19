/**
 * vAjax
 * Author: Ashish Goyal
 * Copyright: Copyright 2016 | Vyavsaay ERP
 * Description: this library is a wrapper class for ajax calls
 */

var vAjax = function (options)
{
	var defaults={};
	var settings = $.extend(defaults, options || {});

	this.ajax = function(url,kvp){
		var promise = new Promise(function(resolve,reject)
		{
			if(typeof number_active_ajax=='undefined')
		 	{
		 		number_active_ajax=1;
		 	}
		 	else
		 	{
		 		number_active_ajax+=1;
		 	}

		 	$.ajax(
		 	{
		 		type: "POST",
		 		url: url,
		 		data: kvp,
		 		error:function(xhr, ajaxOptions, thrownError)
		 		{
		 			number_active_ajax-=1;
		 			hide_loader();
		 			console.log(kvp);
		            console.log(xhr.responseText);
					reject(xhr.responseText);
		 		},
		 		success: function(return_data,return_status,e)
		 		{
		 			var response_object={status:'error',rows:[],count:0};
		 			try
		 			{
		 			  response_object=JSON.parse(e.responseText);
		 			} catch (ee)
		 			{
		 			  console.log(kvp);
		 			  console.log(e.responseText);
					  hide_loader();
		 			  reject(e.responseText);
		 			}

		 			if(response_object.status=="Invalid session")
		 			{
		 				number_active_ajax-=1;
		 				hide_loader();
		 				var user=get_username();
		 				var domain=get_domain();

		 				vIni.lockScreen(function()
		 				{
		 					show_loader();
		 					var pass=document.getElementById("lock_form").elements['password'].value;

		 					var user_kvp={domain:domain,user:user,pass:pass,os:navigator.platform,browser:navigator.userAgent};
		 					ajax_promise(server_root+"/ajax/login.php",user_kvp).then(function(response_object)
							{
								if(response_object.status=="Failed Authentication")
		 						{
		 							alert("Password is incorrect. Aborting operation.");
		 							delete_session();
		 							hide_loader();
		 						}
		 						else if(response_object.status=="Account Inactive")
		 						{
		 							alert("This account has been deactivated.");
		 							delete_session();
		 							hide_loader();
		 						}
		 						else
		 						{
		 							var session_vars=response_object.data;

		 							var offline=get_session_var('offline');
		 							for(var field in session_vars)
		 							{
		 								localStorage.setItem(field,session_vars[field]);
		 							}
		 							set_session_var('offline',offline);

		 							kvp.re_old=kvp.re;
		 							kvp.cr_old=kvp.cr;
		 							kvp.del_old=kvp.del;
		 							kvp.up_old=kvp.up;
		 							kvp.cr=session_vars['cr'];
		 							kvp.up=session_vars['up'];
		 							kvp.del=session_vars['del'];
		 							kvp.re=session_vars['re'];

		 							hide_loader();
		 							ajax_promise(url,kvp).then(function(response_object){
										resolve(response_object);
									});
		 						}
							});
		 				});
		 			}
		 			else
		 			{
		 				//console.log('here');
		 				number_active_ajax-=1;
		 				resolve(response_object);
		 			}
		 		}
		 	});
		});

		return promise;
	};
};

vAjax = new vAjax();
