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
	number_active_ajax+=1;
	
	var xmlhttp,xmlhttp2;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
		xmlhttp2=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp= new ActiveXObject("Microsoft.XMLHTTP");
		xmlhttp2= new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange=function()
	{
		if(xmlhttp.readyState===4)
		{
			if(xmlhttp.status===200)
			{
				if(xmlhttp.responseText=="Invalid session")
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
							//console.log(pass+user);
							xmlhttp2.open("POST","./ajax/login.php",true);
							xmlhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp2.send("user="+user+"&pass="+pass+"&domain="+domain);
							
							xmlhttp2.onreadystatechange=function()
							{
								//console.log(xmlhttp2.responseText);
								if(xmlhttp2.readyState===4 && xmlhttp2.status===200)
								{
									if(xmlhttp2.responseText=="failed_auth")
									{
										alert("Password is incorrect. Aborting opertion. Please try again.");
										delete_session();
										hide_loader();
									}
									else
									{
										ajax_with_custom_func(url,kvp,func);
									}
								}
							};
						}
					});	
					$("#modal1").dialog("open");
				}
				else
				{
					func(xmlhttp);
				}
			}
			number_active_ajax-=1;
		}
	};
	
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	try
	{
		xmlhttp.send(kvp);
	}catch(e)
	{
		//console.log("Network connection is not working. Please check your net connection and try again.");
		hide_loader();
	}			
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
	ajax_with_custom_func("./ajax/get_single_column.php","domain="+domain+"&username="+username+"&re="+re_access+"&columns="+column,function(e)
	{
		//console.log(column);
		//console.log(e.responseText);
		var row=e.responseXML.childNodes[0].childNodes;
		for(var i=0; i<row.length; i++)
		{
			if(row[i].nodeName!="" && row[i].nodeName!="#text")
			{
				results.push(row[i].innerHTML);
			}
		}
		callback(results);
	});
}


function server_read_multiple_column(columns,callback,results)
{
	var domain=get_domain();
	var username=get_username();
	var re_access=get_session_var('re');
	ajax_with_custom_func("./ajax/get_rows.php","domain="+domain+"&username="+username+"&re="+re_access+"&columns="+columns,function(e)
	{
		//console.log(columns);
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
					row_data[data[j].nodeName]=data[j].innerHTML;
				}
				results.push(row_data);
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
	ajax_with_custom_func("./ajax/delete_row.php","domain="+domain+"&username="+username+"&del="+del_access+"&data_xml="+data_xml+"&activity_xml="+activity_xml,function(e)
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
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var del_access=get_session_var('del');
	ajax_with_custom_func("./ajax/delete_simple.php","domain="+domain+"&username="+username+"&del="+del_access+"&data_xml="+data_xml,function(e)
	{
		console.log(e.responseText);
		hide_loader();
	});
}

/**
 * @param data_xml
 */
function server_delete_simple_func(data_xml,func)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var del_access=get_session_var('del');
	ajax_with_custom_func("./ajax/delete_simple.php","domain="+domain+"&username="+username+"&del="+del_access+"&data_xml="+data_xml,function(e)
	{
		console.log(e.responseText);
		func();
		hide_loader();
	});
}


function server_create_row(data_xml,activity_xml)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var cr_access=get_session_var('cr');
	ajax_with_custom_func("./ajax/create_row.php","domain="+domain+"&username="+username+"&cr="+cr_access+"&data_xml="+data_xml+"&activity_xml="+activity_xml,function(e)
	{
		console.log(e.responseText);
		hide_loader();
		if(e.responseText=='duplicate record')
		{
			$("#modal5").dialog("open");
		}
	});
}


function server_create_simple(data_xml)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var cr_access=get_session_var('cr');
	ajax_with_custom_func("./ajax/create_simple.php","domain="+domain+"&username="+username+"&cr="+cr_access+"&data_xml="+data_xml,function(e)
	{
		console.log(e.responseText);
		hide_loader();
		if(e.responseText=='duplicate record')
		{
			$("#modal5").dialog("open");
		}
	});
}

function server_create_simple_func(data_xml,func)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var cr_access=get_session_var('cr');
	ajax_with_custom_func("./ajax/create_simple.php","domain="+domain+"&username="+username+"&cr="+cr_access+"&data_xml="+data_xml,function(e)
	{
		console.log(e.responseText);
		hide_loader();
		if(e.responseText=='duplicate record')
		{
			$("#modal5").dialog("open");
		}
		else
		{
			func();
		}
	});
}

function server_create_batch(data_xml)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var cr_access=get_session_var('cr');
	
	//console.log('got last sync time');
	var data_xml_array=data_xml.split("<separator></separator>");
	data_xml_array.forEach(function(data_chunk)
	{
		ajax_with_custom_func("./ajax/create_batch.php","domain="+domain+"&username="+username+"&cr="+cr_access+"&data_xml="+data_chunk,function(e)
		{
			console.log(e.responseText);
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


function server_create_simple_no_warning(data_xml)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var cr_access=get_session_var('cr');
	ajax_with_custom_func("./ajax/create_simple.php","domain="+domain+"&username="+username+"&cr="+cr_access+"&data_xml="+data_xml,function(e)
	{
		console.log(e.responseText);
		hide_loader();
	});
}


function server_update_row(data_xml,activity_xml)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var up_access=get_session_var('up');
	data_xml=data_xml.replace(/\+/g,'%2B');
	ajax_with_custom_func("./ajax/update_row.php","domain="+domain+"&username="+username+"&up="+up_access+"&data_xml="+data_xml+"&activity_xml="+activity_xml,function(e)
	{
		console.log(e.responseText);
		hide_loader();
	});
}


function server_update_simple(data_xml)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var up_access=get_session_var('up');
	data_xml=data_xml.replace(/\+/g,'%2B');
	ajax_with_custom_func("./ajax/update_simple.php","domain="+domain+"&username="+username+"&up="+up_access+"&data_xml="+data_xml,function(e)
	{
		console.log(e.responseText);
		hide_loader();
	});
}

function server_update_simple_func(data_xml,func)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var up_access=get_session_var('up');
	data_xml=data_xml.replace(/\+/g,'%2B');
	
	ajax_with_custom_func("./ajax/update_simple.php","domain="+domain+"&username="+username+"&up="+up_access+"&data_xml="+data_xml,function(e)
	{
		//console.log(e.responseText);
		func();
		hide_loader();
	});
}

function server_update_batch(data_xml)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var up_access=get_session_var('up');
	data_xml=data_xml.replace(/\+/g,'%2B');
	
	//console.log('got last sync time');
	var data_xml_array=data_xml.split("<separator></separator>");
	data_xml_array.forEach(function(data_chunk)
	{
		ajax_with_custom_func("./ajax/update_batch.php","domain="+domain+"&username="+username+"&up="+up_access+"&data_xml="+data_chunk,function(e)
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
	ajax_with_custom_func("./ajax/get_inventory.php","domain="+domain+"&username="+username+"&re="+re_access+"&product="+product+"&batch="+batch,function(e)
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
