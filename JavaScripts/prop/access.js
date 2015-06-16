function is_form_access(form_id)
{
	var form=get_session_var('forms');
	var found=form.search(form_id+"-");
	if(found===-1)
	{
		return false;
	}
	else
		return true;
}


function is_read_access(form_id)
{
	var re=get_session_var('re');
	var forms=get_session_var('forms');
	var reports=get_session_var('reports');
	var found=re.search(form_id+"-");
	var found_form=forms.search(form_id+"-");
	var found_report=reports.search(form_id+"-");
	if(found==-1 || (found_form==-1 && found_report==-1))
	{
		return false;
	}
	else
		return true;
}

function is_create_access(form_id)
{
	var cr=get_session_var('cr');
	var found=cr.search(form_id+"-");
	if(found===-1)
	{
		return false;
	}
	else
		return true;
}

function is_update_access(form_id)
{
	var up=get_session_var('up');
	var found=up.search(form_id+"-");
	if(found===-1)
	{
		return false;
	}
	else
		return true;
}

function is_delete_access(form_id)
{
	var del=get_session_var('del');
	var found=del.search(form_id+"-");
	if(found===-1)
	{
		return false;
	}
	else
		return true;
}


function if_data_read_access(tablename,func)
{
	var acc_name=get_account_name();
	
	var access_data="<data_access>" +
			"<record_id></record_id>" +
			"<criteria_field></criteria_field>" +
			"<criteria_value></criteria_value>" +
			"<access_type></access_type>" +
			"<user_type></user_type>"+
			"<user></user>" +
			"<user_field></user_field>"+
			"<tablename exact='yes'>"+tablename+"</tablename>" +
			"</data_access>";
	fetch_requested_data('',access_data,function(datas)
	{
		var user_fields_array=[];
		var final_array=[];
		datas.forEach(function(data)
		{
			if(data.user_type=='field')
			{
				user_fields_array.push(data);
			}
			
			if(data.user_type=='user' && data.user==acc_name)
			{
				final_array.push(data);
			}
		});

		var count=user_fields_array.length;
		user_fields_array.forEach(function (obj)
		{
			var access2_data="<"+tablename+">"+
				"<id></id>"+
				"<"+obj.user_field+">"+acc_name+"</"+obj.user_field+">"+
				"</"+tablename+">";
			fetch_requested_data('',access2_data,function (datas2) 
			{
				//console.log(datas2);
				datas2.forEach(function(data2)
				{
					if(obj.record_id=='all')
					{
						var newObject = jQuery.extend({}, obj);
						newObject.record_id=data2.id;
						
						for (var key in data2) 
						{
			        		newObject[key] = data2[key];
				    	}
				    	
						final_array.push(newObject);
					}
					else if(obj.record_id==data2.id)
					{
						for (var key in data2) 
						{
			        		obj[key] = data2[key];
				    	}
						final_array.push(obj);
					}					
				});
				count-=1;
			});
		});

		var final_array_timer=setInterval(function()
		{
			if(count==0)
			{
  		   		clearInterval(final_array_timer);
				func(final_array);
			}
    	},100);				
	});
}

function if_data_update_access(tablename,func)
{		
	var access_data="<data_access>" +
			"<record_id></record_id>" +
			"<criteria_field></criteria_field>" +
			"<criteria_value></criteria_value>" +
			"<access_type array='yes'>--all--update--</access_type>" +
			"<user_type></user_type>"+
			"<user></user>" +
			"<user_field></user_field>"+
			"<tablename exact='yes'>"+tablename+"</tablename>" +
			"</data_access>";
	fetch_requested_data('',access_data,function(datas)
	{
		var user_fields_array=[];
		var final_array=[];
		datas.forEach(function(data)
		{
			if(data.user_type=='field')
			{
				user_fields_array.push(data);
			}
			else if(data.user_type=='user' && data.user==acc_name)
			{
				final_array.push(data);
			}
		});

		var count=user_fields_array.length;
		user_fields_array.forEach(function (obj)
		{
			var access2_data="<"+tablename+">"+
				"<id></id>"+
				"<"+obj.user_field+">"+acc_name+"</"+obj.user_field+">"+
				"</"+tablename+">";
			fetch_requested_data('',access2_data,function (datas2) 
			{
				datas2.forEach(function(data2)
				{
					if(obj.record_id=='all')
					{
						var newObject = jQuery.extend({}, obj);
						newObject.record_id=data2.id;
						final_array.push(newObject);
					}
					else if(obj.record_id==data2.id)
					{
						final_array.push(obj);
					}					
				});
				count-=1;
			});			
		});
		
		var final_array_timer=setInterval(function()
		{
			if(count==0)
			{
  		   		clearInterval(final_array_timer);
				func(final_array);
  	   		}
    	},100);				
	});
}

function if_data_delete_access(tablename,func)
{
	var acc_name=get_account_name();
	
	var access_data="<data_access>" +
			"<record_id></record_id>" +
			"<criteria_field></criteria_field>" +
			"<criteria_value></criteria_value>" +
			"<access_type array='yes'>--all--delete--</access_type>" +
			"<user_type></user_type>"+
			"<user></user>" +
			"<user_field></user_field>"+
			"<tablename exact='yes'>"+tablename+"</tablename>" +
			"</data_access>";
	fetch_requested_data('',access_data,function(datas)
	{
		var user_fields_array=[];
		var final_array=[];
		datas.forEach(function(data)
		{
			if(data.user_type=='field')
			{
				user_fields_array.push(data);
			}
			else if(data.user_type=='user' && data.user==acc_name)
			{
				final_array.push(data);
			}
		});

		var count=user_fields_array.length;
		user_fields_array.forEach(function (obj)
		{
			var access2_data="<"+tablename+">"+
				"<id></id>"+
				"<"+obj.user_field+">"+acc_name+"</"+obj.user_field+">"+
				"</"+tablename+">";
			fetch_requested_data('',access2_data,function (datas2) 
			{
				datas2.forEach(function(data2)
				{
					if(obj.record_id=='all')
					{
						var newObject = jQuery.extend({}, obj);
						newObject.record_id=data2.id;
						final_array.push(newObject);
					}
					else if(obj.record_id==data2.id)
					{
						final_array.push(obj);
					}					
				});
				count-=1;
			});			
		});
		
		var final_array_timer=setInterval(function()
		{
			if(count==0)
			{
  		   		clearInterval(final_array_timer);
				func(final_array);
  	   		}
    	},100);				
	});
}

function if_data_all_access(tablename,record_id,func)
{
	var acc_name=get_account_name();
		
	var access_data="<data_access>" +
			"<record_id array='yes'>--"+record_id+"--all--</record_id>" +
			"<criteria_field></criteria_field>" +
			"<criteria_value></criteria_value>" +
			"<access_type array='yes'>--all--delete--</access_type>" +
			"<user_type></user_type>"+
			"<user></user>" +
			"<user_field></user_field>"+
			"<tablename exact='yes'>"+tablename+"</tablename>" +
			"</data_access>";
	fetch_requested_data('',access_data,function(datas)
	{
		var user_fields_array=[];
		var final_array=[];
		datas.forEach(function(data)
		{
			if(data.user_type=='field')
			{
				user_fields_array.push(data);
			}
			else if(data.user_type=='user' && data.user==acc_name)
			{
				final_array.push(data);
			}
		});

		var count=user_fields_array.length;
		user_fields_array.forEach(function (obj)
		{
			var access2_data="<"+tablename+">"+
				"<id></id>"+
				"<"+obj.user_field+">"+acc_name+"</"+obj.user_field+">"+
				"</"+tablename+">";
			fetch_requested_data('',access2_data,function (datas2) 
			{
				datas2.forEach(function(data2)
				{
					if(obj.record_id=='all')
					{
						var newObject = jQuery.extend({}, obj);
						newObject.record_id=data2.id;
						final_array.push(newObject);
					}
					else if(obj.record_id==data2.id)
					{
						final_array.push(obj);
					}					
				});
				count-=1;
			});			
		});
		
		var final_array_timer=setInterval(function()
		{
			if(count==0)
			{
  		   		clearInterval(final_array_timer);
				func(final_array);
  	   		}
    	},100);				
	});
}