/**
 * json attributes for read queries
 * comapre: lowerbound,upperbound
 * array: yes
 * exact: yes
 * count: <integer>
 * batch_size: <integer>
 */


/**
 * This function executes a custom function on ajax call
 * @param url - url of the php file to be called
 * @param kvp - parameters passed to php file as key value pairs string
 * @param func - function to be executed on successful result from server
 */
function ajax_json(url,kvp,func)
{
	number_active_ajax+=1;
		
	$.ajax(
	{
		type: "POST",
		url: url,
		data: kvp,
		error:function(xhr, ajaxOptions, thrownError) 
		{
			number_active_ajax-=1;
			hide_loader();
			$("#modal74").dialog("open");
	        console.log(xhr.status);
    	    console.log(xhr.responseText);
		},
		success: function(return_data,return_status,e)
		{
			//console.log(e.responseText);
			var response_object=JSON.parse(e.responseText);
				
			if(response_object.status=="Invalid session")
			{
				number_active_ajax-=1;
				hide_loader();
				var user=get_username();
				var domain=get_domain();
				
				$("#modal1").dialog(
				{
					close:function(e,ui)
					{
						show_loader();
						var pass=document.getElementById("modal1_pass").value;
						var user_kvp={domain:domain,user:user,pass:pass};
						ajax_json("./ajax_json/login.php",user_kvp,function(response_object)
						{
							if(response_object.status=="Failed Authentication")
							{
								alert("Password is incorrect. Aborting operation.");
								delete_session();
								hide_loader();
							}
							else
							{
								var	session_vars=response_object.data;
								
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
								ajax_json(url,kvp,func);
							}
						});
					}
				});
				$("#modal1").dialog("open");
			}
			else
			{
				//console.log('here');
				number_active_ajax-=1;
				func(response_object);
			}
		}
	});		
};

function server_read_json_rows(columns,callback,results)
{
	var domain=get_domain();
	var username=get_username();
	var re_access=get_session_var('re');
	
	if(typeof columns.batch_size!='undefined')
	{
		columns.count=columns.batch_size;
	}

	var string_columns=JSON.stringify(columns);
	ajax_json("./ajax_json/get_limited_rows.php",{domain:domain,username:username,re:re_access,data:string_columns},function(response_object)
	{
		//console.log('server_read_json_rows returned');
		results=results.concat(response_object.rows);
		if(response_object.count<columns.count || (typeof columns.batch_size=='undefined'))
		{
			callback(results);
		}
		else 
		{
			columns.start_index=columns.start_index+columns.count;
			server_read_json_rows(columns,callback,results);
		}
	});
}

function server_read_json_column(columns,callback,results)
{
	var domain=get_domain();
	var username=get_username();
	var re_access=get_session_var('re');
	var string_columns=JSON.stringify(columns);
	
	ajax_json("./ajax_json/get_single_column.php",{domain:domain,username:username,re:re_access,data:string_columns},function(response_object)
	{
		results=response_object.rows;
		callback(results);
	});
}


function server_generate_report_json(report_id,callback)
{
	var domain=get_domain();
	var username=get_username();
	var re_access=get_session_var('re');
	ajax_json("./ajax_json/generate_report.php",{domain:domain,username:username,re:re_access,report_id:report_id},function(response_object)
	{
		//console.log(response_object);
		//console.log(response_object.rows);
		var results=response_object.rows;		
		callback(results);
	});
}
