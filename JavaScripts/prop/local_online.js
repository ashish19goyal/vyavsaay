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
		$("#modal2").dialog("open");
	}
}

/**
 * @returns {Array}
 */
function generate_report(report_id)
{	
	var results=new Array();

	if(is_online())
	{
		server_generate_report(report_id,results,function()
		{
			my_obj_array_to_csv(results,'report');
		});
	}
	else
	{
		local_generate_report(report_id,results,function()
		{
			my_obj_array_to_csv(results,'report');
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
		$("#modal2").dialog("open");
	}
}
