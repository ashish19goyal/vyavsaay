/**
 * xml attributes for read queries
 * comapre: more than,less than, not equal, equal
 * array: yes
 * exact: yes
 * sort: asc,desc
 * count: <integrer>
 */


/**
 * This function executes a custom function on ajax call
 * @param url - url of the php file to be called
 * @param kvp - parameters passed to php file as key value pairs string
 * @param func - function to be executed on successful result from server
 */
function ajax_with_custom_func(url,kvp,func)
{
	if(typeof number_active_ajax=='undefined')
	{
		number_active_ajax=1;
	}
	else {
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
			//$("#modal74").dialog("open");
	        //console.log(xhr.status);
		    console.log(xhr.responseText);    	    
    	    console.log(thrownError);
		},
		success: function(return_data,return_status,e)
		{
            //console.log(e.responseText);
			if(e.responseText=="Invalid session")
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
						ajax_with_custom_func("./ajax/login.php",user_kvp,function(e)
						{
							login_status=e.responseText;
							var session_xml=e.responseXML;
							if(login_status=="failed_auth")
							{
								alert("Password is incorrect. Aborting operation.");
								delete_session();
								hide_loader();
							}
							else
							{
								var session_var=session_xml.getElementsByTagName('session');
								var session_vars=new Object();
								var num_svar=session_var[0].childElementCount;

								for(var z=0;z<num_svar;z++)
								{
									session_vars[session_var[0].childNodes[z].nodeName]=session_var[0].childNodes[z].textContent;
								}
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
								ajax_with_custom_func(url,kvp,func);
							}
						});
					}
				});
				$("#modal1").dialog("open");
			}
			else
			{
				number_active_ajax-=1;
				func(e);
			}
		}
	});		
};


/**
 * This function executes a simple read access on server database
 * @param table table name that is to be accessed
 * @param column name of the column to be referenced
 * @param results data to be passed on to the callback function
 * @param callback function to be executed on successful access
 */
function server_read_single_column(column,callback,results)
{
	var domain=get_domain();
	var username=get_username();
	var re_access=get_session_var('re');
	ajax_with_custom_func("./ajax/get_single_column.php",{domain:domain,username:username,re:re_access,columns:column},function(e)
	{
		//console.log(column);
		//console.log(e.responseText);
		var parser=new DOMParser();
		var dom_obj=parser.parseFromString(e.responseText, "text/xml");
		if(dom_obj.documentElement.nodeName != "parsererror")
		{			
			var row=e.responseXML.childNodes[0].childNodes;
			for(var i=0; i<row.length; i++)
			{
				if(row[i].nodeName!="" && row[i].nodeName!="#text")
				{
					results.push(row[i].textContent);
				}
			}
		}
		//console.log(results);
		callback(results);
	});
}


function server_read_multiple_column(columns,callback,results)
{
	var domain=get_domain();
	var username=get_username();
	var re_access=get_session_var('re');
	ajax_with_custom_func("./ajax/get_rows.php",{domain:domain,username:username,re:re_access,columns:columns},function(e)
	{
		//console.log(columns);
		//console.log(e.responseText);
		var parser=new DOMParser();
		var dom_obj=parser.parseFromString(e.responseText, "text/xml");
		if(dom_obj.documentElement.nodeName != "parsererror")
		{
			var row=e.responseXML.childNodes[0].childNodes;
			for(var i=0; i<row.length; i++)
			{
				if(row[i].nodeName!="" && row[i].nodeName!="#text")
				{
					var data=row[i].childNodes;
					var row_data={};
					for(var j=0;j<data.length;j++)
					{
						row_data[data[j].nodeName]=data[j].textContent;
					}
					results.push(row_data);
				}
			}
		}
		callback(results);
	});
}

/**
 * this function delete a row of data from the server database
 * @param data_xml
 * @param activity_xml
 */
function server_delete_row(data_xml,activity_xml)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var del_access=get_session_var('del');
	ajax_with_custom_func("./ajax/delete_row.php",{domain:domain,username:username,del:del_access,data_xml:data_xml,activity_xml:activity_xml},function(e)
	{
		console.log(e.responseText);
		hide_loader();
	});
}

/**
 * this function delete a row of data from the server database
 * @param data_xml
 */
function server_delete_simple(data_xml)
{
	var domain=get_domain();
	var username=get_username();
	var del_access=get_session_var('del');
	ajax_with_custom_func("./ajax/delete_simple.php",{domain:domain,username:username,del:del_access,data_xml:data_xml},function(e)
	{
		console.log(e.responseText);
	});
}

/**
 * @param data_xml
 */
function server_delete_simple_func(data_xml,func)
{
	var domain=get_domain();
	var username=get_username();
	var del_access=get_session_var('del');
	ajax_with_custom_func("./ajax/delete_simple.php",{domain:domain,username:username,del:del_access,data_xml:data_xml},function(e)
	{
		console.log(e.responseText);
		if(typeof func!="undefined")
		{
			func();
		}
	});
}


function server_create_row(data_xml,activity_xml)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var cr_access=get_session_var('cr');
	ajax_with_custom_func("./ajax/create_row.php",{domain:domain,username:username,cr:cr_access,data_xml:data_xml,activity_xml:activity_xml},function(e)
	{
		console.log(e.responseText);
		hide_loader();
		if(e.responseText=='duplicate record')
		{
			$("#modal5").dialog("open");
		}
	});
}

function server_create_row_func(data_xml,activity_xml,func)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var cr_access=get_session_var('cr');
	ajax_with_custom_func("./ajax/create_row.php",{domain:domain,username:username,cr:cr_access,data_xml:data_xml,activity_xml:activity_xml},function(e)
	{
		console.log(e.responseText);
		hide_loader();
		if(e.responseText=='duplicate record')
		{
			$("#modal5").dialog("open");
		}
		else
		{
			if(typeof func!="undefined")
			{
				func();
			}
		}
	});
}

function server_create_simple(data_xml)
{
	var domain=get_domain();
	var username=get_username();
	var cr_access=get_session_var('cr');
	ajax_with_custom_func("./ajax/create_simple.php",{domain:domain,username:username,cr:cr_access,data_xml:data_xml},function(e)
	{
		console.log(e.responseText);
		if(e.responseText=='duplicate record')
		{
			$("#modal5").dialog("open");
		}
	});
}

function server_create_simple_func(data_xml,func)
{
	var domain=get_domain();
	var username=get_username();
	var cr_access=get_session_var('cr');
	ajax_with_custom_func("./ajax/create_simple.php",{domain:domain,username:username,cr:cr_access,data_xml:data_xml},function(e)
	{
		console.log(e.responseText);
		if(e.responseText=='duplicate record')
		{
			$("#modal5").dialog("open");
		}
		else
		{
			if(typeof func!="undefined")
			{
				func();
			}
		}
	});
}

function server_create_batch(data_xml)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var cr_access=get_session_var('cr');
	
	var data_xml_array=data_xml.split("<separator></separator>");
	data_xml_array.forEach(function(data_chunk)
	{
		ajax_with_custom_func("./ajax/create_batch.php",{domain:domain,username:username,cr:cr_access,data_xml:data_chunk,user_display:'yes'},function(e)
		{
			//console.log(e.responseText);
		});
	});
	
	var server_create_complete=setInterval(function()
	{
	   if(number_active_ajax===0)
	   {
		   clearInterval(server_create_complete);
		   hide_loader();
	   }
    },1000);		
}


function server_create_batch_noloader(data_xml)
{
	var domain=get_domain();
	var username=get_username();
	var cr_access=get_session_var('cr');
	
	var data_xml_array=data_xml.split("<separator></separator>");
	data_xml_array.forEach(function(data_chunk)
	{
		ajax_with_custom_func("./ajax/create_batch.php",{domain:domain,username:username,cr:cr_access,data_xml:data_chunk,user_display:'no'},function(e)
		{
			//console.log(e.responseText);
		});
	});	
}


function server_create_simple_no_warning(data_xml)
{
	var domain=get_domain();
	var username=get_username();
	var cr_access=get_session_var('cr');
	ajax_with_custom_func("./ajax/create_simple.php",{domain:domain,username:username,cr:cr_access,data_xml:data_xml},function(e)
	{
		console.log(e.responseText);
	});
}


function server_update_row(data_xml,activity_xml)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var up_access=get_session_var('up');
	//data_xml=data_xml.replace(/\+/g,'%2B');
	ajax_with_custom_func("./ajax/update_row.php",{domain:domain,username:username,up:up_access,data_xml:data_xml,activity_xml:activity_xml},function(e)
	{
		console.log(e.responseText);
		hide_loader();
	});
}


function server_update_simple(data_xml)
{
	var domain=get_domain();
	var username=get_username();
	var up_access=get_session_var('up');
	//data_xml=data_xml.replace(/\+/g,'%2B');
	ajax_with_custom_func("./ajax/update_simple.php",{domain:domain,username:username,up:up_access,data_xml:data_xml},function(e)
	{
		console.log(e.responseText);
	});
}

function server_update_simple_func(data_xml,func)
{
	var domain=get_domain();
	var username=get_username();
	var up_access=get_session_var('up');
	//data_xml=data_xml.replace(/\+/g,'%2B');
	
	ajax_with_custom_func("./ajax/update_simple.php",{domain:domain,username:username,up:up_access,data_xml:data_xml},function(e)
	{
		//console.log(e.responseText);
		if(typeof func!="undefined")
		{
			func();
		}
	});
}

function server_update_batch(data_xml)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var up_access=get_session_var('up');
	//data_xml=data_xml.replace(/\+/g,'%2B');
	
	//console.log('got last sync time');
	var data_xml_array=data_xml.split("<separator></separator>");
	data_xml_array.forEach(function(data_chunk)
	{
		ajax_with_custom_func("./ajax/update_batch.php",{domain:domain,username:username,up:up_access,data_xml:data_chunk},function(e)
		{
			console.log(e.responseText);
		});
	});
	
	var server_update_complete=setInterval(function()
	{
	   if(number_active_ajax===0)
	   {
		   clearInterval(server_update_complete);
		   hide_loader();
	   }
    },1000);		
}


function server_get_inventory(product,batch,callback)
{
	var domain=get_domain();
	var username=get_username();
	var re_access=get_session_var('re');
	ajax_with_custom_func("./ajax/get_inventory.php",{domain:domain,username:username,re:re_access,product:product,batch:batch},function(e)
	{
		//console.log(e.responseText);
		if(isNaN(e.responseText))
		{
			callback(0);
		}
		else
		{
			callback(e.responseText);
		}
	});
}

function server_get_store_inventory(store,product,batch,callback)
{
	var domain=get_domain();
	var username=get_username();
	var re_access=get_session_var('re');
	ajax_with_custom_func("./ajax/get_store_inventory.php",{domain:domain,username:username,re:re_access,store:store,product:product,batch:batch},function(e)
	{
		//console.log(e.responseText);
		if(isNaN(e.responseText))
		{
			callback(0);
		}
		else
		{
			callback(e.responseText);
		}
	});
}


function server_get_available_inventory(product,batch,data_array,callback)
{
	var domain=get_domain();
	var username=get_username();
	var re_access=get_session_var('re');
	ajax_with_custom_func("./ajax/get_available_inventory.php",{domain:domain,username:username,re:re_access,data_array:data_array,product:product,batch:batch},function(e)
	{
		if(isNaN(e.responseText))
		{
			callback(0);
		}
		else
		{
			callback(e.responseText);
		}
	});
}

function server_generate_report(report_id,results,callback)
{
	var domain=get_domain();
	var username=get_username();
	var re_access=get_session_var('re');
	ajax_with_custom_func("./ajax/generate_report.php",{domain:domain,username:username,re:re_access,report_id:report_id},function(e)
	{
		//console.log(e.responseText);
		var row=e.responseXML.childNodes[0].childNodes;
		for(var i=0; i<row.length; i++)
		{
			if(row[i].nodeName!="" && row[i].nodeName!="#text")
			{
				var data=row[i].childNodes;
				var row_data=[];
				for(var j=0;j<data.length;j++)
				{
					row_data[data[j].nodeName]=data[j].textContent;
				}
				results.push(row_data);
			}
		}
		callback(results);
	});
}

function server_send_sms(to,message,type)
{
	var domain=get_domain();
	var username=get_username();
	var read_access=get_session_var('re');
	var sender_id=get_session_var('sms_sender_id');
	ajax_with_custom_func("./ajax/sms.php",{sender_id:sender_id,domain:domain,username:username,re:read_access,message:message,type:type,to:to},function(e)
	{
		console.log(e.responseText);
		hide_loader();
	});
}


function ajax_for_app(url,kvp,func)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{
		xmlhttp=new XMLHttpRequest();
	}

	var mobile_token=get_session_var('mobile_token');
	var mobile_id=get_session_var('mobile_id');
	if(mobile_token=="" || mobile_token==null || mobile_token=='undefined')
	{
		xmlhttp.open("POST",'http://orderchhotu.in:8080/seller/signin',true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.setRequestHeader("Authorization","f881f9b0-d9c1-11e3-8759-4b8591766099");	
	
		xmlhttp.onreadystatechange=function()
		{
			if(xmlhttp.readyState===4)
			{
				if(xmlhttp.status===200)
				{
					number_active_ajax-=1;
					///extract mobile_token and mobile_id and seller_id from the response
					console.log(xmlhttp.responseText);					
					var response_arr=JSON.parse(xmlhttp.responseText);
					console.log(response_arr);
					set_session_var('mobile_token',response_arr['token']);
					set_session_var('mobile_id',response_arr['id']);
					set_session_var('seller_id',response_arr['sellerId']);
					ajax_for_app(url,kvp,func);
				}
				else
				{
					number_active_ajax-=1;
				}
			}
		};
		
		try
		{
			number_active_ajax+=1;
			xmlhttp.send("username=pmladmin&password=pmladmin");
		}catch(e)
		{
			number_active_ajax-=1;
			hide_loader();
		}		
	}
	else 
	{
		xmlhttp.open("POST",url,true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.setRequestHeader("Authorization",get_session_var('mobile_token')+" "+get_session_var('mobile_id')+" f881f9b0-d9c1-11e3-8759-4b8591766099");	
	
		xmlhttp.onreadystatechange=function()
		{
			if(xmlhttp.readyState===4)
			{
				if(xmlhttp.status===200)
				{
					number_active_ajax-=1;
					func(xmlhttp);
				}
				else
				{
					number_active_ajax-=1;
				}
			}
		};
		
		try
		{
			number_active_ajax+=1;
			//kvp+="&sellerid="+get_session_var('selller_id');
			xmlhttp.send(kvp);
		}catch(e)
		{
			number_active_ajax-=1;
			hide_loader();
		}
	}			
};