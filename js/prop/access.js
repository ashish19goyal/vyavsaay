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

	if(vUtil.isBlank(re))
	{	return false; }

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
        case 'logistics_orders':index_name='awb_num';
                        break;
		case 'policies':index_name='policy_num';
                        break;
	}

	var obj_data={data_store:obj_type,
					access:'yes',
					count:1,
					indexes:[{index:index_name,exact:obj_name}]};
	read_json_rows('',obj_data,function (objects)
	{
        //console.log(obj_data);
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
///end of file
