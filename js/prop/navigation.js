function log_navigation_history(options)
{
    var url=server_root+"/main.php";
    if(options.form!="home")
    {
        url+="/"+options.form;

        if(options.page!=="")
        {
            url+="/"+options.page;

            if(options.id!=="")
            {
                url+="/"+options.id;
            }
        }
    }
    //console.log('old url- '+window.location.pathname);
    //console.log('new url- '+url);
    if(url!==window.location.pathname)
    {
        history.pushState(options, options.form,url);
        //console.log('logged');
    }
}

function navigate_history()
{
    var obj=history.state;
    if(obj)
    {
        if(obj.form=='home')
        {
            home_display();
        }
        else
        {
            var element_link="#"+obj.form+"_link";
            var function_link=$(element_link).parent().parent().parent().attr('id');
            show_function(function_link);
            $(element_link).attr('data_id',obj.id);

            // var paginator=$('#'+obj.form).find("[isPaged='yes']").data('paginator');
            var paginator= !vUtil.isBlank(obj.element_id) ?  $("#"+obj.element_id).data('paginator') : null;

            if(paginator)
            {
                var page_index=parseInt(paginator.page_size())*parseInt(obj.page);
                if(isNaN(page_index))
                {
                    page_index=0;
                }
                paginator.set_index(page_index);
            }
            //console.log('page index - '+paginator.get_index());
            $(element_link).click();
            $(element_link).attr('data_id','');
        }
    }
    else{
        home_display();
    }
}

function navigate_history_url(url)
{
    var obj={form:'home',page:'',id:''};
    url=url.replace(server_root,'');

    var url_object=url.split("/");

    if(!vUtil.isBlank(url_object[2]))
    {
        obj.form=url_object[2];

        if(!vUtil.isBlank(url_object[3]))
        {
            obj.page=url_object[3];

            if(!vUtil.isBlank(url_object[4]))
            {
                obj.id=url_object[4];
            }
        }
    }

    if(obj.form=='home')
    {
        home_display();
    }
    else
    {
        var element_link="#"+obj.form+"_link";
        var function_link=$(element_link).parent().parent().parent().attr('id');
        show_function(function_link);
        $(element_link).attr('data_id',obj.id);

        // var paginator=$('#'+obj.form).find("tbody[isPaged='yes']").data('paginator');
        var paginator= !vUtil.isBlank(obj.element_id) ?  $("#"+obj.element_id).data('paginator') : null;

        var page_index=0;
        if(paginator)
        {
            page_index=parseInt(paginator.page_size())*parseInt(obj.page);
            paginator.set_index(page_index);
        }
        if(isNaN(page_index))
        {
            page_index=0;
        }
        //console.log('page index - '+paginator.get_index());
        $(element_link).click();
        $(element_link).attr('data_id','');
    }
}

function home_display()
{
	$(document).off('keydown');
	hide_all();
	$('#home_grid').show();

    var history_obj={form:'home',id:'',page:''};
    log_navigation_history(history_obj);
}

function show_function(function_id)
{
	hide_all();
	$("#"+function_id).show();
}

function grid_click(func)
{
	show_function(func+"_main");

    var element = $("#"+func+"_main>ul>li:visible>a").first();
    $(element).click();

    var element_name=$(element).attr('href').replace(/#/g,'');
    var history_obj={form:element_name,id:'',page:0};
    log_navigation_history(history_obj);
}

function element_display(fid,element_name,elements)
{
    if(is_read_access(element_name))
	{
		var element_link="#"+element_name+"_link";
		var function_link=$(element_link).parent().parent().parent().attr('id');
		show_function(function_link);
		$(element_link).attr('data_id',fid);
		$(element_link).click();
		$(element_link).attr('data_id','');

        var history_obj={form:element_name,id:fid,page:0};
        log_navigation_history(history_obj);
	}
	else if(elements)
	{
		for(var i=0;i<elements.length;i++)
		{
			if(is_read_access(elements[i]))
			{
				var element_link="#"+elements[i]+"_link";
				var function_link=$(element_link).parent().parent().parent().attr('id');
				show_function(function_link);
				$(element_link).attr('data_id',fid);
				$(element_link).click();
				$(element_link).attr('data_id','');

                var history_obj={'form':elements[i],'id':fid,page:0};
                log_navigation_history(history_obj);
				break;
			}
		}
	}
}

function show_object(object_type,obj_name,obj_id)
{
	if(is_read_object(object_type))
	{
		if_data_access_object(object_type,obj_name,function ()
		{
			initialize_object(object_type,obj_name,obj_id);
			$("#object_"+object_type).click();
		},function ()
		{
            console.log('no data access');
			$('#modal2_link').click();
		});
	}
	else
	{
        console.log('no system access');
		$('#modal2_link').click();
	}
}
