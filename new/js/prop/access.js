/**********Access for tabs*****************/
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
	if(found!=-1 && (found_form!=-1 || found_report!=-1))
	{
		return true;
	}
	else
		return false;
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
/***************/

/*****Access for objects*****/

function is_read_object(obj_name)
{
	var re=get_session_var('re');
	var found=re.search(obj_name+"-");
	if(found==-1)
	{
		return false;
	}
	else
		return true;
}

function is_create_object(obj_name)
{
	var cr=get_session_var('cr');
	var found=cr.search(obj_name+"-");
	if(found===-1)
	{
		return false;
	}
	else
		return true;
}

function is_update_object(obj_name)
{
	var up=get_session_var('up');
	var found=up.search(obj_name+"-");
	if(found===-1)
	{
		return false;
	}
	else
		return true;
}

function is_delete_object(obj_name)
{
	var del=get_session_var('del');
	var found=del.search(obj_name+"-");
	if(found===-1)
	{
		return false;
	}
	else
		return true;
}

/*****************************/
function if_data_access_object(obj_type,obj_name,func_success,func_fail)
{
	var index_name="name";
	switch(obj_type)
	{
		case 'customers':
		case 'suppliers':
		case 'staff': index_name='acc_name';
						break;
        case 'product_instances':index_name='batch';
                        obj_name=obj_name.batch;
                        break;
	}
	
	var obj_data={data_store:obj_type,
					access:{},
					count:1,
					indexes:[{index:index_name,exact:obj_name}]};
	read_json_rows('',obj_data,function (objects) 
	{
		if(objects.length>0)
		{
			func_success();
		}
		else 
		{
			func_fail();
		}
	});				
}

function if_data_read_access(tablename,func)
{
	var acc_name=get_account_name();
	var user_roles=get_session_var('user_roles');
	
	var access_data="<data_access>" +
			"<record_id></record_id>" +
			"<criteria_field></criteria_field>" +
			"<criteria_value></criteria_value>" +
			"<access_type></access_type>" +
			"<user_type></user_type>"+
			"<user></user>" +
			"<user_field></user_field>"+
			"<role></role>" +
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
			
			if(data.user_type=='role')
			{
				var found=user_roles.indexOf(data.role);
				if(found!=-1)
				{
					final_array.push(data);
				}
			}
		});

		var count=user_fields_array.length;
		user_fields_array.forEach(function (obj)
		{
			var access2_data="<"+tablename+" fields='all'>"+
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