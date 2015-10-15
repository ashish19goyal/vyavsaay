function set_my_filter_json(filter_data,filter_element,func)
{
	read_json_single_column(filter_data,function(data)
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
	});		
}


function set_static_filter_json(table,list,filter_element)
{
	var list_id='datalist-'+table+list;
	filter_element.setAttribute("list",list_id);
	
	var datalist_element=document.getElementById(list_id);
	
	if(datalist_element==null || datalist_element==undefined)
	{
		var list_data=new Object();
				list_data.count=0;
				list_data.start_index=0;
				list_data.data_store='values_list';		
				list_data.return_column='name';
				
				list_data.indexes=[{index:'tablename',exact:table},
									{index:'status',exact:'active'},
									{index:'listname',exact:list}];
		
		read_json_single_column(list_data,function(data)
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
		});		
	}
}

function set_static_value_list_json(table,list,filter_element,func)
{
	var list_id='datalist-'+table+list;
	filter_element.setAttribute("list",list_id);
	
	var datalist_element=document.getElementById(list_id);
	
	if(datalist_element==null || datalist_element==undefined)
	{
		var list_data=new Object();
				list_data.count=0;
				list_data.start_index=0;
				list_data.data_store='values_list';		
				list_data.return_column='name';
				
				list_data.indexes=[{index:'tablename',exact:table},
									{index:'status',exact:'active'},
									{index:'listname',exact:list}];
	
		read_json_single_column(list_data,function(data)
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
		});
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

function set_my_value_list_json(filter_data,filter_element,func)
{	
	read_json_single_column(filter_data,function(data)
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
	});
}

function set_multiple_value_list_json(filter_data_array,filter_element)
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
		read_json_single_column(filter_data,function(data)
		{
			data.forEach(function(d)
			{
				var option=document.createElement('option');
				option.setAttribute('value',d);
				datalist.appendChild(option);
			});
		});
	});
}

function set_my_value_json(filter_data,filter_element,func)
{
	read_json_single_column(filter_data,function(data)
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
	});
}


function set_my_max_value_json(filter_data,filter_element)
{
	read_json_single_column(filter_data,function(data)
	{
		var value=0;
		for(var i=0;i<data.length;i++)
		{
			value+=parseFloat(data[i]);
		}
		$(filter_element).attr('max',value);
		$(filter_element).attr('min',"0");
	});
}
