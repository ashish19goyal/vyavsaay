/**
 * jPaginator
 * Author: Ashish Goyal
 * Copyright: Copyright 2016 | Vyavsaay ERP
 */

(function ($) {
	var Paginator = function (element,options)
	{
		var elem = $(element);
		var binding_id=$(element).attr('id');

		var defaults={page_size:25,
                      binding_id:binding_id,
                      func:binding_id.replace(/body/g,"ini();"),
                      container:$(element).parent().parent(),
                      visible:true,
					 };

		var settings = $.extend(defaults, options || {});

		this.configure_indexes = function()
		{
	        var hide="";
	        if(!settings.visible)
	        {
	            hide="style='display:none'";
	        }

			var html_content="<div "+hide+" class='pagination-panel'>"+
									"<a class='btn btn-sm grey-mint prev disabled' id='"+settings.binding_id+"_prev' data-index='-"+settings.page_size+"'><i class='fa fa-angle-left'></i></a>"+
									"<input type='text' id='"+settings.binding_id+"_index' value='1' data-index='0' class='pagination-panel-input form-control input-sm input-inline input-mini' maxlength='5' style='text-align:center;margin:0 5px;' onkeydown=\"if(event.keyCode==13){$('#"+settings.binding_id+"_index').attr('data-index',($(this).val()-1)*"+settings.page_size+"); "+settings.func+"return false;}\">"+
									"<a class='btn btn-sm grey-mint next' id='"+settings.binding_id+"_next' data-index='"+settings.page_size+"'><i class='fa fa-angle-right'></i></a>"+
								"</div>";

			// $(settings.container).find('.pagination-panel').remove();
			$(settings.container).append(html_content);

			var elements={index_element:document.getElementById(settings.binding_id+'_index'),
						   prev_element:document.getElementById(settings.binding_id+'_prev'),
						   next_element:document.getElementById(settings.binding_id+'_next')};

			settings = $.extend(settings, elements );
		};

		this.index_onclick =function()
		{
			var prev = document.getElementById(settings.binding_id+'_prev');
			prev.removeAttribute("onclick");
			prev.setAttribute("onclick","$('#"+settings.binding_id+"_index').attr('data-index',$(this).attr('data-index'));"+settings.func);

			var next = document.getElementById(settings.binding_id+'_next');
			next.removeAttribute("onclick");
			next.setAttribute("onclick","$('#"+settings.binding_id+"_index').attr('data-index',$(this).attr('data-index'));"+settings.func);
			// console.log('index_updated');
		}

		this.configure_indexes();
		this.index_onclick();

		this.update_settings = function(options)
		{
			settings = $.extend(settings, options || {});
		}

		this.page_size = function()
		{
			return settings.page_size;
		};

		this.get_index = function()
		{
			var index=parseInt($(settings.index_element).attr('data-index'));
			settings.index_element.value=(index/settings.page_size)+1;
			return index;
		};

        this.set_index = function(new_index)
		{
			$(settings.index_element).attr('data-index',new_index);
			settings.index_element.value=(new_index/settings.page_size)+1;

            var next_index=this.get_index()+this.page_size();
			var prev_index=this.get_index()-(this.page_size());
			$(settings.next_element).attr('data-index',next_index);
			$(settings.prev_element).attr('data-index',prev_index);

			if(new_index<this.page_size())
			{
				$(settings.next_element).addClass('disabled');
			}
			else
			{
				$(settings.next_element).removeClass('disabled');
			}
			if(prev_index<0)
			{
				$(settings.prev_element).addClass('disabled');
			}
			else
			{
				$(settings.prev_element).removeClass('disabled');
			}
		};

		this.update_index=function(result_count)
		{
			var next_index=this.get_index()+this.page_size();
			var prev_index=this.get_index()-(this.page_size());
			$(settings.next_element).attr('data-index',next_index);
			$(settings.prev_element).attr('data-index',prev_index);
			$(settings.index_element).attr('data-index',0);

			if(result_count<this.page_size())
			{
				$(settings.next_element).addClass('disabled');
			}
			else
			{
				$(settings.next_element).removeClass('disabled');
			}
			if(prev_index<0)
			{
				$(settings.prev_element).addClass('disabled');
			}
			else
			{
				$(settings.prev_element).removeClass('disabled');
			}
       };

        this.log_history=function()
        {
            var element_name=$(element).closest('.tab-pane').attr('id');
            var history_id=$("#"+element_name+"_link").attr('data_id');
            if(history_id=='undefined' || history_id==null || history_id=="null")
            {
                history_id="";
            }

            var history_page=parseInt(this.get_index()/this.page_size());
            var history_obj={form:element_name,id:history_id,page:history_page,element_id:settings.binding_id};

            var url=server_root+"/main.php";

			if(element_name=='undefined' || element_name==undefined || element_name==null)
			{
				element_name='home';
				history_obj={form:'home',id:'',page:'',element_id:settings.binding_id};
				this.index_onclick();
			}

            if(element_name!="home")
            {
                url+="/"+element_name;

                if(history_page!=="")
                {
                    url+="/"+history_page;

                    if(history_id!=="")
                    {
                        url+="/"+history_id;
                    }
                }
            }

			// console.log(history_obj);
			// console.log(url);
            if(url!==window.location.pathname)
            {
                history.pushState(history_obj,element_name,url);
            }
        };
	};

	$.fn.paginator=function(options)
	{
		var element = $(this);
		if (element.data('paginator'))
        {
            var paginator= element.data('paginator');
			paginator.update_settings(options);
            paginator.log_history();
            return paginator;
        }
		var paginator = new Paginator(this,options);
		element.data('paginator', paginator);
        $(element).attr('isPaged','yes');
        paginator.log_history();
		return paginator;
	};

}(jQuery));
