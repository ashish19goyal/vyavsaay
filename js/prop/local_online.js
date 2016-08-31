/**
 * @returns {Array}
 */
function get_single_column_data(callback,request_data)
{
	var results=new Array();

	if(is_online())
	{
		server_read_single_column(request_data,callback,results);
	}
	else
	{
		local_read_single_column(request_data,callback,results);
	}
}

/**
 * @returns {Array}
 */
function get_single_column_data_array(request_data_array,callback)
{
	var results=new Array();
	var array_count=request_data_array.length;
	request_data_array.forEach(function(request_data)
	{
		if(is_online())
		{
			server_read_single_column(request_data,function(dummy)
			{
				array_count-=1;
			},results);
		}
		else
		{
			local_read_single_column(request_data,function(dummy)
			{
				array_count-=1;
			},results);
		}
	});

	var get_data_array_timer=setInterval(function()
	{
  	   if(array_count===0)
  	   {
  		   	clearInterval(get_data_array_timer);
  		   	callback(results);
  	   }
    },10);
}


/**
 * @param columns
 * @param callback
 */
function fetch_requested_data(element_id,columns,callback)
{
	if(is_read_access(element_id))
	{
		var results=new Array();
		if(is_online())
		{
			server_read_multiple_column(columns,callback,results);
		}
		else
		{
			local_read_multi_column(columns,callback,results);
		}
	}
	else
	{
		hide_loader();
		console.log("Being called from " + arguments.callee.caller.toString());
		$("#modal2_link").click();
	}
}

/**
 * @returns {Array}
 */
function generate_report(report_id)
{
	if(is_online())
	{
		server_generate_report_json(report_id,function(results)
		{
			//console.log(results);
			results.forEach(function(result)
			{
				//console.log(result);
				if(typeof result.last_updated!='undefined')
				{
					result.last_updated=get_my_datetime(result.last_updated);
				}
			});
			vUtil.objArrayToCSV(results,'report');
		});
	}
	else
	{
		local_generate_report_json(report_id,function(results)
		{
			results.forEach(function(result)
			{
				if(typeof result.last_updated!='undefined')
				{
					result.last_updated=get_my_datetime(result.last_updated);
				}
			});

			vUtil.objArrayToCSV(results,'report');
		});
	}
}

function get_inventory(product,batch,callback)
{
	if(is_online())
	{
		server_get_inventory(product,batch,callback);
	}
	else
	{
		local_get_inventory(product,batch,callback);
	}
}


function get_store_inventory(store,product,batch,callback)
{
	if(is_online())
	{
		server_get_store_inventory(store,product,batch,callback);
	}
	else
	{
		local_get_store_inventory(store,product,batch,callback);
	}
}

function get_available_inventory(product,batch,data_array,callback)
{
	if(is_online())
	{
		server_get_available_inventory(product,batch,data_array,callback);
	}
	else
	{
		local_get_available_inventory(product,batch,data_array,callback);
	}
}


function create_row(data_xml,activity_xml)
{
	if(is_online())
	{
		server_create_row(data_xml,activity_xml);
	}
	else
	{
		local_create_row(data_xml,activity_xml);
	}
}

function create_row_func(data_xml,activity_xml,func)
{
	if(is_online())
	{
		server_create_row_func(data_xml,activity_xml,func);
	}
	else
	{
		local_create_row_func(data_xml,activity_xml,func);
	}
}

function create_simple(data_xml)
{
	if(is_online())
	{
		server_create_simple(data_xml);
	}
	else
	{
		local_create_simple(data_xml);
	}
}

function create_simple_func(data_xml,func)
{
	if(is_online())
	{
		server_create_simple_func(data_xml,func);
	}
	else
	{
		local_create_simple_func(data_xml,func);
	}
}

function create_simple_no_warning(data_xml)
{
	if(is_online())
	{
		server_create_simple_no_warning(data_xml);
	}
	else
	{
		local_create_simple_no_warning(data_xml);
	}
}

function create_batch(data_xml)
{
	if(is_online())
	{
		server_create_batch(data_xml);
	}
	else
	{
		local_create_batch(data_xml);
	}
}

function create_batch_noloader(data_xml)
{
	if(is_online())
	{
		server_create_batch_noloader(data_xml);
	}
	else
	{
		local_create_batch_noloader(data_xml);
	}
}

function delete_row(data_xml,activity_xml)
{
	if(is_online())
	{
		server_delete_row(data_xml,activity_xml);
	}
	else
	{
		local_delete_row(data_xml,activity_xml)
	}
}

function delete_simple(data_xml)
{
	if(is_online())
	{
		server_delete_simple(data_xml);
	}
	else
	{
		local_delete_simple(data_xml);
	}
}

function delete_simple_func(data_xml,func)
{
	if(is_online())
	{
		server_delete_simple_func(data_xml,func);
	}
	else
	{
		local_delete_simple_func(data_xml,func);
	}
}

function update_row(data_xml,activity_xml)
{
	if(is_online())
	{
		server_update_row(data_xml,activity_xml);
	}
	else
	{
		local_update_row(data_xml,activity_xml);
	}
}

function update_simple(data_xml)
{
	if(is_online())
	{
		server_update_simple(data_xml);
	}
	else
	{
		local_update_simple(data_xml);
	}
}

function update_simple_func(data_xml,func)
{
	if(is_online())
	{
		server_update_simple_func(data_xml,func);
	}
	else
	{
		local_update_simple_func(data_xml,func);
	}
}

function update_batch(data_xml)
{
	if(is_online())
	{
		server_update_batch(data_xml);
	}
	else
	{
		local_update_batch(data_xml);
	}
}

/**
 * @param columns
 * @param callback
 */
function read_json_rows(element_id,columns,callback)
{
	if(is_read_access(element_id))
	{
		var results=new Array();
		if(is_online())
		{
			server_read_json_rows(columns,callback,results);
		}
		else
		{
			local_read_json_rows(columns,callback,results);
		}
	}
	else
	{
		hide_loader();
		console.log("Being called from " + arguments.callee.caller.toString());
		if(!vUtil.isBlank(get_session_var('re')))
		{
			$("#modal2_link").click();
		}
	}
}

/**
 * @param columns
 * @param callback
 */
function read_json_single_column(columns,callback)
{
	var results=new Array();
	if(is_online())
	{
		server_read_json_column(columns,callback,results)
	}
	else
	{
		local_read_json_column(columns,callback,results);
	}
}

/**
 * @param columns
 * @param callback
 */
function read_json_count(columns,callback)
{
	var results=new Array();
	if(is_online())
	{
		server_read_json_count(columns,callback)
	}
	else
	{
		local_read_json_count(columns,callback);
	}
}

/**
 * @param columns
 * @param callback
 */
function read_json_single_column_master(columns,callback)
{
	if(is_online())
	{
		server_read_json_column_master(columns,callback)
	}
/*	else
	{
		hide_loader();
		console.log("Being called from " + arguments.callee.caller.toString());
		$("#modal2_link").click();
	}
*/
}

/**
 * @param columns
 * @param callback
 */
function read_json_rows_master(element_id,columns,callback)
{
	if(is_read_access(element_id))
	{
		if(is_online())
		{
			server_read_json_rows_master(columns,callback);
		}
	}
/*	else
	{
		hide_loader();
		console.log("Being called from " + arguments.callee.caller.toString());
		$("#modal2_link").click();
	}
*/
}

function delete_json(data_json,func)
{
	if(is_online())
	{
		server_delete_json(data_json,func);
	}
	else
	{
		local_delete_json(data_json,func);
	}
}

function create_json(data_json,func)
{
	if(is_online())
	{
		server_create_json(data_json,func);
	}
	else
	{
		local_create_json(data_json,func);
	}
}

function create_batch_json(data_json,func)
{
	if(is_online())
	{
		server_create_batch_json(data_json,func);
	}
	else
	{
		local_create_batch_json(data_json,func);
	}
}

function update_json(data_json,func)
{
	if(is_online())
	{
		server_update_json(data_json,func);
	}
	else
	{
		local_update_json(data_json,func);
	}
}

function update_batch_json(data_json,func)
{
	if(is_online())
	{
		server_update_batch_json(data_json,func);
	}
	else
	{
		local_update_batch_json(data_json,func);
	}
}

function send_email(to,from,from_name,subject,message,func)
{
	var email_enabled=get_session_var('email_enabled');
	var message_attachment="";
	var pdf_elem=document.getElementById('pdf_print_div');

	if(email_enabled=='yes')
	{
		pdf_elem.innerHTML=message;

		html2canvas(pdf_elem,
		{
	        onrendered: function(canvas)
	        {
	        	message_attachment=canvas.toDataURL("image/jpeg");
				pdf_elem.innerHTML="";

				var data={"to":to,
							"from":from,
							"from_name":from_name,
							"subject":subject,
							"message":message,
							"message_attachment":"",
							"attachment_type":""};
				var data_string=JSON.stringify(data);
				if(is_online())
				{
					server_send_email(data_string,func);
				}
				else
				{
					var email_data="<emails>"+
								"<id>"+vUtil.newKey()+"</id>"+
								"<subject>"+subject+"</subject>"+
								"<message>"+htmlentities(message)+"</message>"+
								"<message_attachment>"+message_attachment+"</message_attachment>"+
								"<receivers>"+to+"</receivers>"+
								"<sender>"+from+"</sender>"+
								"<sender_name>"+from_name+"</sender_name>"+
								"<attachment_type></attachment_type>"+
								"<status>pending</status>"+
								"<last_updated>"+get_my_time()+"</last_updated>"+
								"</emails>";
					local_create_simple(email_data);
					func();
				}
	        }
	    });
	}
	else
	{
		hide_loader();
		//$("#modal59_link").click();
	}
}

function send_email_attachment(to,from,from_name,subject,message,message_attachment,attachment_type,func)
{
	var email_enabled=get_session_var('email_enabled');
	var pdf_elem=document.getElementById('pdf_print_div');

	if(email_enabled=='yes')
	{
		if(attachment_type=='image')
		{
			pdf_elem.innerHTML=message_attachment;
			html2canvas(pdf_elem,
			{
		        onrendered: function(canvas)
		        {
		        	new_message_attachment=canvas.toDataURL("image/jpeg");
					pdf_elem.innerHTML="";

					var data={"to":to,
								"from":from,
								"from_name":from_name,
								"subject":subject,
								"message":message,
								"message_attachment":new_message_attachment,
								"attachment_type":""};
					var data_string=JSON.stringify(data);

					if(is_online())
					{
						server_send_email(data_string,func);
					}
					else
					{
						var email_data="<emails>"+
									"<id>"+vUtil.newKey()+"</id>"+
									"<subject>"+subject+"</subject>"+
									"<message>"+htmlentities(message)+"</message>"+
									"<message_attachment>"+new_message_attachment+"</message_attachment>"+
									"<receivers>"+to+"</receivers>"+
									"<sender>"+from+"</sender>"+
									"<sender_name>"+from_name+"</sender_name>"+
									"<attachment_type>"+attachment_type+"</attachment_type>"+
									"<status>pending</status>"+
									"<last_updated>"+get_my_time()+"</last_updated>"+
									"</emails>";
						local_create_simple(email_data);
						func();
					}
		        }
		    });
		}
        else if(attachment_type=='pdf')
        {
            var pdfcreator=new htmlToPdf({html:message_attachment});
            pdfcreator.getDataUrl(function(new_message_attachment)
            {
                var data={"to":to,
                            "from":from,
                            "from_name":from_name,
                            "subject":subject,
                            "message":message,
                            "message_attachment":new_message_attachment,
                            "attachment_type":attachment_type};
                var data_string=JSON.stringify(data);

                if(is_online())
                {
                    server_send_email(data_string,func);
                }
                else
                {
                    var email_data="<emails>"+
                                "<id>"+vUtil.newKey()+"</id>"+
                                "<subject>"+subject+"</subject>"+
                                "<message>"+htmlentities(message)+"</message>"+
                                "<message_attachment>"+new_message_attachment+"</message_attachment>"+
                                "<receivers>"+to+"</receivers>"+
                                "<sender>"+from+"</sender>"+
                                "<sender_name>"+from_name+"</sender_name>"+
                                "<attachment_type>"+attachment_type+"</attachment_type>"+
                                "<status>pending</status>"+
                                "<last_updated>"+get_my_time()+"</last_updated>"+
                                "</emails>";
                    local_create_simple(email_data);
                    func();
                }
            });
        }
		else
		{
			var data={"to":to,
						"from":from,
						"from_name":from_name,
						"subject":subject,
						"message":message,
						"message_attachment":message_attachment,
						"attachment_type":attachment_type};
			var data_string=JSON.stringify(data);

			if(is_online())
			{
				server_send_email(data_string,func);
			}
			else
			{
				var email_data="<emails>"+
							"<id>"+vUtil.newKey()+"</id>"+
							"<subject>"+subject+"</subject>"+
							"<message>"+htmlentities(message)+"</message>"+
							"<message_attachment>"+message_attachment+"</message_attachment>"+
							"<receivers>"+to+"</receivers>"+
							"<sender>"+from+"</sender>"+
							"<sender_name>"+from_name+"</sender_name>"+
							"<attachment_type>"+attachment_type+"</attachment_type>"+
							"<status>pending</status>"+
							"<last_updated>"+get_my_time()+"</last_updated>"+
							"</emails>";
				local_create_simple(email_data);
				func();
			}
		}
	}
	else
	{
		hide_loader();
		//$("#modal59_link").click();
	}
}


function send_sms(to,message,type)
{
	var sms_enabled=get_session_var('sms_enabled');
	if(sms_enabled=='yes' && to!="" && to!=0 && to!="0")
	{
		if(is_online())
		{
			server_send_sms(to,message,type);
		}
		else
		{
			var sms_data="<sms>"+
						"<id>"+vUtil.newKey()+"</id>"+
						"<receiver>"+to+"</receiver>"+
						"<message>"+htmlentities(message)+"</message>"+
						"<status>pending</status>"+
						"<billing_status>pending</billing_status>"+
						"<type>"+type+"</type>"+
						"<last_updated>"+get_my_time()+"</last_updated>"+
						"</sms>";
			local_create_simple(sms_data);
			hide_loader();
		}
	}
	else
	{
		hide_loader();
		//$("#modal60_link").click();
	}
}
