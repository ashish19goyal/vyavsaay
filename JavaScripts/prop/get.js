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
 * 
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
		$("#modal_access_denied").dialog("open");
	}
}

/**
 * this function resizes and sets the preview of the picture
 * @form Manage Products
 * @formNo 39
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

function get_new_key()
{
	var d=new Date();
	var seconds=d.getTime();
	seconds=""+seconds;
	return seconds;
}


function count_oppor()
{
	var oppor_data="<opportunities>" +
			"<id></id>" +
			"<status>pending</status>" +
			"</opportunities>";

	get_single_column_data(function(oppors)
	{
		var num_res=oppors.length;
	
		if(num_res===0)
		{	
			$('#count_oppor').html("");
		}
		else
		{	
			$('#count_oppor').html(num_res);
			$('#count_oppor').css('backgroundColor','#dddd00'); 
		}
	},oppor_data);
	setTimeout(count_oppor,100000);
}

function count_notif()
{
	//var notifs=fetch_notifications();	
	var notif_data="<notifications>" +
			"<id></id>" +
			"<status>pending</status>" +
			"</notifications>";

	get_single_column_data(function(notifs)
	{
		var num_res=notifs.length;
		
		if(num_res===0)
		{	
			$('#count_notif').html(""); 
		}
		else
		{	
			$('#count_notif').html(num_res);
			$('#count_notif').css('backgroundColor','#dddd00'); 
		}
	},notif_data);
	setTimeout(count_notif,100000);
}


function set_my_filter(filter_data,filter_element)
{
	get_single_column_data(function(data)
	{
		data=jQuery.unique(data);
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
	var list_data="<values_list>" +
			"<name></name>" +
			"<tablename>"+table+"</tablename>" +
			"<listname>"+list+"</listname>" +
			"<status>active</status>" +
			"</values_list>";
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
		
	},list_data);		
}

function set_my_value_list(filter_data,filter_element)
{	
	get_single_column_data(function(data)
	{
		data=jQuery.unique(data);
		
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

function set_my_multiple_filter(filter_data,filter_element,output_element)
{	
	get_single_column_data(function(data)
	{
		data=jQuery.unique(data);

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
		
	},filter_data);
	$(filter_element).on('select',function(event)
	{
		var value=output_element.value;
		var found=value.search(filter_element.value);
		if(found===-1)
		{
			value+=filter_element.value+",";
			output_element.value=value;
		}	
	});
	$(filter_element).on('blur',function(event)
	{
		var value=output_element.value;
		var found=value.search(filter_element.value);
		if(found===-1)
		{
			value+=filter_element.value+",";
			output_element.value=value;
		}	
	});
}

function set_my_multiple_list(filter_data,filter_element,output_element)
{	
	get_single_column_data(function(data)
	{
		data=jQuery.unique(data);
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
		
		$(filter_element).on("change",function(event)
		{
			var found = $.inArray($(this).val(), data) > -1;
			if(!found)
			{
	            $(this).val('');
	        }
		});
	},filter_data);
	$(filter_element).on('select',function(event)
	{
		var value=output_element.value;
		var found=value.search(filter_element.value);
		if(found===-1)
		{
			value+=filter_element.value+",";
			output_element.value=value;
		}	
	});
}

function set_my_value(filter_data,filter_element)
{
	get_single_column_data(function(data)
	{
		filter_element.value=data[0];
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

function set_static_value_list(table,list,filter_element)
{
	var list_data="<values_list>" +
			"<name></name>" +
			"<tablename>"+table+"</tablename>" +
			"<listname>"+list+"</listname>" +
			"<status>active</status>" +
			"</values_list>";
	get_single_column_data(function(data)
	{
		data=jQuery.unique(data);
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
		$(filter_element).on("change",function(event)
		{
			var found = $.inArray($(this).val(), data) > -1;
			if(!found)
			{
	            $(this).val('');
	        }
		});
	},list_data);

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
	for(var i in data_array)
	{
		var header_string="";
		for(var p in data_array[i])
		{
			if(data_array[i].hasOwnProperty(p))
			{
				header_string+=p+",";
			}
		}
	    csvRows.push(header_string);
		break;	   
	}
	
	/////for data rows
	data_array.forEach(function(data_row)
	{
		var data_string="";
		for(var p in data_row)
		{
			if(data_row.hasOwnProperty(p))
			{
				data_string+=data_row[p]+",";
			}
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
				}
				col_result[header_cols[j]]=columns[j];
			}
			results.push(col_result);
		}
	}
	return results;
}

function get_key_from_object(tablename,column,value)
{
}

function get_object_from_key(tablename,column,key)
{
}