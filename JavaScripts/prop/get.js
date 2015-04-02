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


/**
 * this function resizes and sets the preview of the picture
 * @param evt Event that is called when image is selected
 * @param pictureinfo the html element to display the preview of the image
 */
function select_picture(evt,pictureinfo,func)
{
	var file=evt.target.files[0];
	if(file.type.match('image.*'))
	{	
		var reader = new FileReader();
						
		reader.onloadend=function()
		{
		    var tempImg = new Image();
		    tempImg.src = reader.result;
		    tempImg.onload = function()
		    {
		        var MAX_WIDTH = 200;
		        var MAX_HEIGHT = 150;
		        var tempW = tempImg.width;
		        var tempH = tempImg.height;
		        if (tempW > tempH) {
		            if (tempW > MAX_WIDTH) {
		               tempH *= MAX_WIDTH / tempW;
		               tempW = MAX_WIDTH;
		            }
		        } else {
		            if (tempH > MAX_HEIGHT) {
		               tempW *= MAX_HEIGHT / tempH;
		               tempH = MAX_HEIGHT;
		            }
		        }
		 
		        var canvas = document.createElement('canvas');
		        canvas.width = tempW;
		        canvas.height = tempH;
		        var ctx = canvas.getContext("2d");
		        ctx.drawImage(this, 0, 0, tempW, tempH);
		        var dataURL = canvas.toDataURL("image/jpeg");
		        func(dataURL);
		    };
		 
		};
		reader.readAsDataURL(file);
	}
}

/**
 * this function saves the document
 * @param evt Event that is called when document selected
 */
function select_document(evt,func)
{
	var file=evt.target.files[0];
	var reader = new FileReader();
					
	reader.onloadend=function()
	{
        var dataURL = reader.result;
        func(dataURL);
	};
	reader.readAsDataURL(file);
}


function get_new_key()
{
	var d=new Date();
	var seconds=d.getTime();
	seconds=(seconds*1000)+Math.floor(Math.random()*1000);
	return seconds;
}


function set_my_filter(filter_data,filter_element)
{
	get_single_column_data(function(data)
	{
		var form=filter_element.form;
		var datalist=document.createElement('datalist');
		data.forEach(function(d)
		{
			var option=document.createElement('option');
			option.setAttribute('value',d);
			datalist.appendChild(option);
		});
		
		var list_id=filter_element.getAttribute('list');
		if(list_id=='' || list_id==null)
		{
			list_id="list_"+get_new_key();
			filter_element.setAttribute('list',list_id);
		}
		else
		{
			var oldlist=document.getElementById(list_id);
			form.removeChild(oldlist);
		}
		
		form.appendChild(datalist);
		datalist.setAttribute('id',list_id);
		
	},filter_data);		
}


function set_static_filter(table,list,filter_element)
{
	var list_id='datalist-'+table+list;
	filter_element.setAttribute("list",list_id);
	
	var datalist_element=document.getElementById(list_id);
	
	if(datalist_element==null || datalist_element==undefined)
	{
		var list_data="<values_list>" +
			"<name></name>" +
			"<tablename exact='yes'>"+table+"</tablename>" +
			"<listname exact='yes'>"+list+"</listname>" +
			"<status>active</status>" +
			"</values_list>";
		get_single_column_data(function(data)
		{
			var form=document.getElementById('master_datalist_form');
			var datalist=document.createElement('datalist');
			data.forEach(function(d)
			{
				var option=document.createElement('option');
				option.setAttribute('value',d);
				datalist.appendChild(option);
			});
			
			var recheck=document.getElementById(list_id);
			if(recheck==null || recheck==undefined)
			{
				form.appendChild(datalist);
				datalist.setAttribute('id',list_id);
			}
		},list_data);		
	}
}

function set_static_value_list(table,list,filter_element)
{
	var list_id='datalist-'+table+list;
	filter_element.setAttribute("list",list_id);
	
	var datalist_element=document.getElementById(list_id);
	
	if(datalist_element==null || datalist_element==undefined)
	{
		var list_data="<values_list>" +
			"<name></name>" +
			"<tablename exact='yes'>"+table+"</tablename>" +
			"<listname exact='yes'>"+list+"</listname>" +
			"<status>active</status>" +
			"</values_list>";
		get_single_column_data(function(data)
		{
			var form=document.getElementById('master_datalist_form');
			var datalist=document.createElement('datalist');
			data.forEach(function(d)
			{
				var option=document.createElement('option');
				option.setAttribute('value',d);
				datalist.appendChild(option);
			});
					
			var recheck=document.getElementById(list_id);
			if(recheck==null || recheck==undefined)
			{
				form.appendChild(datalist);
				datalist.setAttribute('id',list_id);
			}
		
			$(filter_element).off("change");
			$(filter_element).on("change",function(event)
			{
				var found = $.inArray(filter_element.value, data) > -1;
				if(!found)
				{
		            filter_element.value="";
		        }
			});
		},list_data);
	}
	else
	{
		$(filter_element).off("change");
		$(filter_element).on("change",function(event)
		{
			var options=new Array();
			for(var i=0;i<datalist_element.options.length;i++)
			{
			    options[i]=datalist_element.options[i].value;
			}
			var found = $.inArray(filter_element.value,options) > -1;
			if(!found)
			{
	            filter_element.value="";
	        }
		});
	}
}


function set_my_value_list(filter_data,filter_element)
{	
	get_single_column_data(function(data)
	{
		var form=filter_element.form;
		var datalist=document.createElement('datalist');
		data.forEach(function(d)
		{
			var option=document.createElement('option');
			option.setAttribute('value',d);
			datalist.appendChild(option);
		});
		
		var list_id=filter_element.getAttribute('list');
		if(list_id=='' || list_id==null)
		{
			list_id="list_"+get_new_key();
			filter_element.setAttribute("list",list_id);
		}
		else
		{
			var oldlist=document.getElementById(list_id);
			form.removeChild(oldlist);
		}
		
		form.appendChild(datalist);
		datalist.setAttribute('id',list_id);

		var active_element=document.activeElement;
				
		if(active_element==filter_element)
		{
			$(filter_element).blur();
			$(filter_element).focus();
		}
/*		else 
		{
			$(filter_element).focus();
			$(active_element).focus();
		}		
*/		
		$(filter_element).off("change");
		$(filter_element).on("change",function(event)
		{
			var found = $.inArray($(this).val(), data) > -1;
			if(!found)
			{
	            $(this).val('');
	        }
		});
	},filter_data);
}

function set_my_value_list_func(filter_data,filter_element,func)
{	
	get_single_column_data(function(data)
	{
		var form=filter_element.form;
		var datalist=document.createElement('datalist');
		data.forEach(function(d)
		{
			var option=document.createElement('option');
			option.setAttribute('value',d);
			datalist.appendChild(option);
		});
		
		var list_id=filter_element.getAttribute('list');
		if(list_id=='' || list_id==null)
		{
			list_id="list_"+get_new_key();
			filter_element.setAttribute("list",list_id);
		}
		else
		{
			var oldlist=document.getElementById(list_id);
			form.removeChild(oldlist);
		}
		
		form.appendChild(datalist);
		datalist.setAttribute('id',list_id);

		if(document.activeElement==filter_element)
		{
			$(filter_element).blur();
			$(filter_element).focus();
		}
		
		$(filter_element).off("change");
		$(filter_element).on("change",function(event)
		{
			var found = $.inArray($(this).val(), data) > -1;
			if(!found)
			{
	            $(this).val('');
	        }
		});
		func();
	},filter_data);
}


function set_multiple_value_list(filter_data_array,filter_element)
{	
	var form=filter_element.form;
	var datalist=document.createElement('datalist');
	
	var list_id=filter_element.getAttribute('list');
	if(list_id=='' || list_id==null)
	{
		list_id="list_"+get_new_key();
		filter_element.setAttribute("list",list_id);
	}
	else
	{
		var oldlist=document.getElementById(list_id);
		form.removeChild(oldlist);
	}
	
	form.appendChild(datalist);
	datalist.setAttribute('id',list_id);

	if(document.activeElement==filter_element)
	{
		$(filter_element).blur();
		$(filter_element).focus();
	}

	$(filter_element).off("change");
	$(filter_element).on("change",function(event)
	{
		var found = false;
		var iski_list=this.list;
		
		for(var j = 0; j < iski_list.options.length; j++)
		{
	        if(this.value==iski_list.options[j].value)
	        {
	           found=true;
	            break;
	        }
	    }
		
		if(!found)
		{
            $(this).val('');
        }
	});
	
	filter_data_array.forEach(function(filter_data)
	{
		get_single_column_data(function(data)
		{
			data.forEach(function(d)
			{
				var option=document.createElement('option');
				option.setAttribute('value',d);
				datalist.appendChild(option);
			});

		},filter_data);
	});
}

function set_my_value(filter_data,filter_element)
{
	get_single_column_data(function(data)
	{
		if(data.length>0)
		{
			filter_element.value=data[0];
		}
	},filter_data);
}

function set_my_max_value(filter_data,filter_element)
{
	get_single_column_data(function(data)
	{
		var value=0;
		for(var i=0;i<data.length;i++)
		{
			value+=parseFloat(data[i]);
		}
		$(filter_element).attr('max',value);
		$(filter_element).attr('min',"0");
	},filter_data);
}



/**
 * Converts a two dimensional array to csv file
 * @param data_array
 */
function my_array_to_csv(data_array)
{
	var csvString = data_array.join();
	var a = document.createElement('a');
	a.href = 'data:attachment/csv,' + csvString;
	//a.href = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvString);
	a.target = '_blank';
	a.download = 'import_template.csv';

	document.body.appendChild(a);
	a.click();
}


/**
 * Converts an array of objects into a csv file
 */
function my_obj_array_to_csv(data_array,file_name)
{
	var csvRows = [];

	///for header row
	var header_string="";
	var header_array=[];
	for(var p in data_array[0])
	{
		header_array.push(p);	
		header_string+=p+",";
	}
	
    csvRows.push(header_string);
	
	/////for data rows
	data_array.forEach(function(data_row)
	{
		var data_string="";
		for(var i=0;i<header_array.length;i++)
		{
			if(data_row[header_array[i]].search(","))
			{
				data_row[header_array[i]]="\""+data_row[header_array[i]]+"\"";
			}
			data_string+=data_row[header_array[i]]+",";
		}
	    csvRows.push(data_string);
	});

	var csvString = csvRows.join("%0D%0A");
	var a = document.createElement('a');
	a.href = 'data:attachment/csv,' + csvString;
	//a.href = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvString);
	a.target = '_blank';
	a.download = file_name+'.csv';

	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

/**
 * This function converts a csv string into array of named objects
 * @param csvString CSV String to be converted 
 * @returns {Array} Array of objects
 */
function csv_string_to_obj_array(csvString)
{
	var rows=csvString.split("\n");	
	var results=[];
	var header_cols=rows[0].split(',');
	
	for(var i=1;i<rows.length;i++)
	{
		if(rows[i]!="")
		{
			var columns=rows[i].split(',');
			var col_result=new Object();
			
			for(var j=0;j<columns.length;j++)
			{
				var dquotes=columns[j].match(/"/g);
				if(dquotes!=null && dquotes.length===1)
				{
					for(var k=j+1;k<columns.length;k++)
					{
						columns[j]+=","+columns[k];
						var second_dquotes=columns[k].match(/"/g);
						columns.splice(k,1);
						if(second_dquotes!=null && second_dquotes.length===1)
						{
							break;
						}
					}
					columns[j]=columns[j].replace(/^\"/, "");
					columns[j]=columns[j].replace(/\"$/, "");
					
					//console.log(columns[j]);
				}
				columns[j]=columns[j].replace(/&/g, "and");
				col_result[header_cols[j]]=columns[j];
			}
			results.push(col_result);
		}
	}
	return results;
}

function my_round(any_number,decimal_p)
{
	var multiplier=1;
	for(var i=0;i<decimal_p;i++)
	{
		multiplier*=10;
	}
	var result=(Math.round(any_number*multiplier))/multiplier;
	return result;
}

function array_unique(array)
{
    return array.filter(function(el,index,arr)
    {
        return index===arr.indexOf(el);
    });
}