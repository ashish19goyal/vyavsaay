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


function set_my_filter(filter_data,filter_element,func)
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
		
		if(typeof func!='undefined')
		{
			func();
		}
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

function set_static_value_list(table,list,filter_element,func)
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
			
			if(typeof func!='undefined')
			{
				func();
			}
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
		if(typeof func!='undefined')
		{
			func();
		}
	}
}

function set_my_value_list(filter_data,filter_element,func)
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

		$(filter_element).off("change");
		$(filter_element).on("change",function(event)
		{
			var found = $.inArray($(this).val(), data) > -1;
			if(!found)
			{
	            $(this).val('');
	        }
		});
		if(typeof func!='undefined')
		{
			func();
		}
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
		if(typeof func!='undefined')
		{
			func();
		}
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

function set_my_value(filter_data,filter_element,func)
{
	get_single_column_data(function(data)
	{
		if(data.length>0)
		{
			filter_element.value=data[0];
		}
		else 
		{
			filter_element.value="";
		}
		if(typeof func!='undefined')
		{
			func();
		}
	},filter_data);
}

function set_my_value_func(filter_data,filter_element,func)
{
	get_single_column_data(function(data)
	{
		if(data.length>0)
		{
			filter_element.value=data[0];
		}
		if(typeof func!='undefined')
		{
			func();
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

/*
* Fetches all records for a specified form and exports them to a csv
*/
function get_export_data(columns,filename)
{
	var new_columns=columns.replace(" count='25'","");
	new_columns=new_columns.replace(" count='100'","");
	new_columns=new_columns.replace("start_index","dont_use_index");
	//console.log(new_columns);
	fetch_requested_data('',new_columns,function(results)
	{
		my_obj_array_to_csv(results,filename);
	});
}

/*
* Fetches all records for a specified form and exports them to a csv
*/
function get_export_data_extended(columns,filename,func)
{
	show_loader();
	var new_columns=columns.replace(" count='25'","");
	new_columns=new_columns.replace(" count='100'","");
	new_columns=new_columns.replace("start_index","dont_use_index");
	//console.log(new_columns);
	fetch_requested_data('',new_columns,function(results)
	{
		//total_export_requests=results.length;
		//console.log(total_export_requests);	
		results.forEach(function(result)
		{
			func(result);
		});

		var export_complete=setInterval(function()
		{
			//console.log(total_export_requests);
			if(total_export_requests===0)
			{
				clearInterval(export_complete);
				//console.log(results);				
				hide_loader();
				my_obj_array_to_csv(results,filename);
			}
		},1000);
	});
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
	//console.log(header_array);
	//console.log(data_array);
	
    csvRows.push(header_string);
	
	/////for data rows
	data_array.forEach(function(data_row)
	{
		//console.log(data_row);
		var data_string="";
		for(var i=0;i<header_array.length;i++)
		{
			//console.log(header_array[i]);
			//console.log(data_row[header_array[i]]);
			if(typeof data_row[header_array[i]]!= 'undefined')
			{
				if(data_row[header_array[i]].search(","))
				{
					data_row[header_array[i]]="\""+data_row[header_array[i]]+"\"";
				}
				data_string+=data_row[header_array[i]]+",";
			}
			else 
			{
				data_string+=",";
			}
		}
		data_string=escape(data_string);
		//console.log(data_string);
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
	csvString = csvString.replace(/[^a-z0-9A-Z<>\s\!\@\$\%\^\&\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
	csvString = csvString.replace(/â/g,'');

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

function my_datalist_change(element,func)
{
	$(element).off('keyup');
	$(element).on('keyup', function()
	{
		var list_id=element.getAttribute('list');
    	var options = $('#'+list_id)[0].options;
    	for (var i=0;i<options.length;i++)
    	{
	       	if (options[i].value == $(this).val()) 
    	    {
    	    	func();
    	    	break;
    	    }
    	}
	});
}


function like_feed(feed_id,element)
{
	var like_xml="<feed_likes>"+
				"<id>"+get_new_key()+"</id>"+	
				"<feed_id exact='yes'>"+feed_id+"</feed_id>"+
				"<person exact='yes'>"+get_account_name()+"</person>"+
				"<last_updated>"+get_my_time()+"</last_updated>"+						
				"</feed_likes>";
	if(is_online())
	{
		server_create_simple(like_xml);
	}
	else
	{
		local_create_simple(like_xml);
	}
	$(element).attr('src','../images/thumbs_up.png');
	$(element).attr('title','Unlike this post');
	$(element).attr("onclick",'');
	$(element).off('click');	
	$(element).on('click',function()
	{
		dislike_feed(feed_id,element);
	});
	var likes_count=parseInt($('#form150_likes_count_'+feed_id).html());
	$('#form150_likes_count_'+feed_id).html(likes_count+1);
}

function dislike_feed(feed_id,element)
{
	var like_xml="<feed_likes>"+
				"<feed_id>"+feed_id+"</feed_id>"+
				"<person>"+get_account_name()+"</person>"+	
				"</feed_likes>";
	if(is_online())
	{
		server_delete_simple(like_xml);
	}
	else
	{
		local_delete_simple(like_xml);
	}
	$(element).attr('src','../images/thumbs_up_line.png');
	$(element).attr('title','Like this post');
	$(element).attr("onclick",'');
	$(element).off('click');	
	$(element).on('click',function()
	{
		like_feed(feed_id,element);
	});
	var likes_count=parseInt($('#form150_likes_count_'+feed_id).html());
	$('#form150_likes_count_'+feed_id).html(likes_count-1);
}

function create_feed_comment(feed_id,element)
{
	var comment_text=element.value;
	var account_name=get_account_name();
	var data_id=get_new_key();
	var comment_xml="<feed_comments>"+
				"<id>"+data_id+"</id>"+	
				"<feed_id exact='yes'>"+feed_id+"</feed_id>"+
				"<person exact='yes'>"+account_name+"</person>"+
				"<comment_text>"+comment_text+"</comment_text>"+
				"<last_updated>"+get_my_time()+"</last_updated>"+						
				"</feed_comments>";
	if(is_online())
	{
		server_create_simple(comment_xml);
	}
	else
	{
		local_create_simple(comment_xml);
	}
	
	
	var comments_content="<label>"+account_name+": "+comment_text;
	comments_content+=" <a class='small_cross_icon' onclick=\"delete_feed_comment('"+data_id+"',$(this));\" title='Delete comment'>&#10006;</a>";
	comments_content+="</label><br>";
	comments_content+="<label>"+account_name+": <textarea class='feed_comments' placeholder='comment..'></textarea></label>";
	$(element).parent().parent().append(comments_content);
	//$('#form150_comments_'+feed_id).append(comments_content);
	$(element).parent().parent().find('label').find('textarea').on('keyup',function(e)
	{
		if (e.keyCode==13) 
		{
			create_feed_comment(feed_id,this);
		}
	});
	$(element).parent().remove();
}


function delete_feed_comment(comment_id,element)
{
	var comment_xml="<feed_comments>"+
					"<id>"+comment_id+"</id>"+
					"</feed_comments>";
	if(is_online())
	{
		server_delete_simple(comment_xml);
	}
	else
	{
		local_delete_simple(comment_xml);
	}
	$(element).parent().remove();
}

function delete_feed(feed_id,element)
{
	var feed_xml="<feeds>"+
					"<id>"+feed_id+"</id>"+
					"</feeds>";
	var like_xml="<feed_likes>"+
					"<feed_id>"+feed_id+"</feed_id>"+
					"</feed_likes>";
	var comment_xml="<feed_comments>"+
					"<feed_id>"+feed_id+"</feed_id>"+
					"</feed_comments>";
	if(is_online())
	{
		server_delete_simple(feed_xml);
		server_delete_simple(like_xml);
		server_delete_simple(comment_xml);
	}
	else
	{
		local_delete_simple(feed_xml);
		local_delete_simple(like_xml);
		local_delete_simple(comment_xml);
	}
	$(element).parent().parent().remove();
}

function send_sms(to,message,type)
{
	var sms_enabled=get_session_var('sms_enabled');
	if(sms_enabled=='yes')
	{
		if(is_online())
		{
			server_send_sms(to,message,type);
		}
		else
		{
			var sms_data="<sms>"+
						"<id>"+get_new_key()+"</id>"+
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
		$("#modal60").dialog("open");
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
	        	var imgData = canvas.toDataURL(
	                'image/png');              
	            //var doc = new jsPDF('p', 'mm');
	            //doc.addImage(imgData, 'PNG', 10, 10);
	            //doc.save('sample-file.pdf');
	           	//message_attachment=doc.output('datauristring');
				message_attachment=canvas.toDataURL("image/png");
				//window.location=message_attachment;
	            //console.log(message_attachment);
				pdf_elem.innerHTML="";
	
				if(is_online())
				{
					server_send_email(to,from,from_name,subject,message,message_attachment,func);
				}
				else
				{
					var email_data="<emails>"+
								"<id>"+get_new_key()+"</id>"+
								"<subject>"+subject+"</subject>"+
								"<message>"+htmlentities(message)+"</message>"+
								"<message_attachment>"+message_attachment+"</message_attachment>"+
								"<receivers>"+to+"</receivers>"+
								"<sender>"+from+"</sender>"+
								"<sender_name>"+from_name+"</sender_name>"+
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
		$("#modal59").dialog("open");
	}
}

function htmlentities(str)
{
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function revert_htmlentities(str)
{
    return String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
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

function get_all_child_storage(store_area,area_array)
{
	var child_data="<store_areas>"+
					"<name></name>"+
					"<parent exact='yes'>"+store_area+"</parent>" +
					"</store_areas>";
	storage_count_tracker+=1;				
	fetch_requested_data('',child_data,function(children)
	{
		if(children.length>0)
		{
			children.forEach(function(child)
			{
				area_array.push(child.name);
				//console.log(storage_count_tracker);
				get_all_child_storage(child.name,area_array);
			});
		}
		storage_count_tracker-=1;
		//console.log(storage_count_tracker);		
	});
}