/**
 * jPaginator
 * Author: Ashish Goyal
 * Copyright: Copyright 2016 | Vyavsaay ERP
 */

(function ($) {
	var Paginator = function (element,options) 
	{
		var elem = $(element);
		var parent_id=$(element).attr('id');
		
		var defaults={page_size:25,parent_id:parent_id,func:parent_id.replace(/body/g,"ini();")};
				
		var settings = $.extend(defaults, options || {});
		
		var html_content="<div class='pagination-panel'>"+
								"<a class='btn btn-sm grey-mint prev disabled' id='"+parent_id+"_prev' data-index='-"+settings.page_size+"' onclick=\"$('#"+parent_id+"_index').attr('data-index',$(this).attr('data-index'));;"+settings.func+"\"><i class='fa fa-angle-left'></i></a>"+
								"<input type='text' id='"+parent_id+"_index' value='1' data-index='0' class='pagination-panel-input form-control input-sm input-inline input-mini' maxlength='5' style='text-align:center;margin:0 5px;' onkeydown=\"if(event.keyCode==13){$('#"+parent_id+"_index').attr('data-index',($(this).val()-1)*"+settings.page_size+"); "+settings.func+"return false;}\">"+			
								"<a class='btn btn-sm grey-mint next' id='"+parent_id+"_next' data-index='"+settings.page_size+"' onclick=\"$('#"+parent_id+"_index').attr('data-index',$(this).attr('data-index'));"+settings.func+"\"><i class='fa fa-angle-right'></i></a>"+
							"</div>";
		$(element).parent().parent().append(html_content);

		var elements={index_element:document.getElementById(parent_id+'_index'),
							prev_element:document.getElementById(parent_id+'_prev'),
							next_element:document.getElementById(parent_id+'_next')};
									
		settings = $.extend(settings, elements );
		
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
            //console.log($(settings.index_element).attr('data-index'));
            //console.log(this.get_index());
            var history_page=parseInt(this.get_index()/this.page_size());
            var history_obj={form:element_name,id:history_id,page:history_page};
            //console.log('history_obj');
            //console.log(history_obj);
            log_navigation_history(history_obj);
        };
	};
	
	$.fn.paginator=function(options)
	{
		var element = $(this);
		if (element.data('paginator'))
        { 
            var paginator= element.data('paginator');
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