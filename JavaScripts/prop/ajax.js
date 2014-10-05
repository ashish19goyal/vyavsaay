/**
 * This function executes a custom function on ajax call
 * @param url - url of the php file to be called
 * @param kvp - parameters passed to php file as key value pairs string
 * @param func - function to be executed on successful result from server
 */
function ajax_with_custom_func(url,kvp,func)
{
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
	
	//console.log("ajax with custom function call is being made");
	xmlhttp.onreadystatechange=function()
	{
		if(xmlhttp.readyState===4 && xmlhttp.status===200)
		{
			//console.log("ajax call executed successfully");
			if(xmlhttp.responseText=="Invalid session")
			{
				hide_loader();
//				console.log("3. checking if session is set");
				var user=get_username();
				var domain=get_domain();
				$("#modal1").dialog({
					close:function(e,ui)
					{
						show_loader();
						var pass=document.getElementById("modal1_pass").value;
						console.log(pass+user);
						xmlhttp2.open("POST","./ajax/login.php",true);
						xmlhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						xmlhttp2.send("user="+user+"&pass="+pass+"&domain="+domain);
						
						xmlhttp2.onreadystatechange=function()
						{
							console.log(xmlhttp2.responseText);
							if(xmlhttp2.readyState===4 && xmlhttp2.status===200)
							{
								if(xmlhttp2.responseText=="failed_auth")
								{
									alert("Password is incorrect. Aborting opertion. Please try agian.");
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
				//var pass=prompt("Please enter the password again","");
			}
			else
			{
				func(xmlhttp);
			}
		}			
	};
	
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	try
	{
		xmlhttp.send(kvp);
	}catch(e)
	{
		console.log("Network connection is not working. Please check your net connection and try again.");
		hide_loader();
	}			
};


/**
 * This function refreshes the current page after the ajax call
 * @param url url of the php file to be called
 * @param kvp parameters passed to php file as key value pairs string
 */
function ajax_with_refresh(url,kvp)
{
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
	
	console.log("ajax with refresh call is being made");
	xmlhttp.onreadystatechange=function()
	{
		if(xmlhttp.readyState===4 && xmlhttp.status===200)
		{
			if(xmlhttp.responseText=="Invalid session")
			{
				hide_loader();
				console.log("3. checking if session is set");
				var user=get_username();
				var domain=get_domain();
				$("#modal1").dialog({
					close:function(e,ui)
					{
						show_loader();
						var pass=document.getElementById("modal1_pass").value;
						console.log(pass+user);
						xmlhttp2.open("POST","./ajax/login.php",true);
						xmlhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						xmlhttp2.send("user="+user+"&pass="+pass+"&domain="+domain);
						
						xmlhttp2.onreadystatechange=function()
						{
							if(xmlhttp2.readyState===4 && xmlhttp2.status===200)
							{
								console.log(xmlhttp2.responseText);
								if(xmlhttp2.responseText=="failed_auth")
								{
									alert("Password is incorrect. Aborting opertion. Please try agian.");
									delete_session();
									hide_loader();
								}
								else
								{	
									ajax_with_refresh(url,kvp);		
								}
								
							}
						};
					}
				});	
				$("#modal1").dialog("open");
			}
			else
			{
				location.reload(true);
				hide_loader();			
			}
		}
	};
	xmlhttp.open("POST",url,true);	
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	try
	{
		xmlhttp.send(kvp);
	}catch(e)
	{
		console.log("Network connection is not working. Please check your net connection and try again.");
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
	ajax_with_custom_func("./ajax/get_rows.php","domain="+domain+"&username="+username+"&re="+re_access+"&columns="+column,function(e)
	{
		//console.log(column);
		console.log(e.responseText);
		var row=e.responseXML.childNodes[0].childNodes;
		for(var i=0; i<row.length; i++)
		{
			if(row[i].nodeName!="" && row[i].nodeName!="#text")
			{
				var data=row[i].childNodes;
				results.push(data[0].innerHTML);
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
		console.log(e.responseText);
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
 * @param table
 * @param data_xml
 * @param id
 * @param formname
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
 * @param table
 * @param data_xml
 * @param id
 * @param formname
 */
function server_delete_simple(data_xml)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var del_access=get_session_var('del');
	ajax_with_custom_func("./ajax/delete_row.php","domain="+domain+"&username="+username+"&del="+del_access+"&data_xml="+data_xml,function(e)
	{
		console.log(e.responseText);
		hide_loader();
	});
}


/**
 * This function store a row of data on the server
 * @param table The table in which data is to be stored
 * @param data Data to be stored in the table
 */
function server_write_row(data_xml,activity_xml)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var cr_access=get_session_var('cr');
	var up_access=get_session_var('up');
	ajax_with_custom_func("./ajax/save_row.php","domain="+domain+"&username="+username+"&cr="+cr_access+"&up="+up_access+"&data_xml="+data_xml+"&activity_xml="+activity_xml,function(e)
	{
		console.log(e.responseText);
		hide_loader();
	});
}


