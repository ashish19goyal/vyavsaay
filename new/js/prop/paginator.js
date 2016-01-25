function add_paginator(parent_id,page_size)
{
	var html_content="<div class='pagination-panel'>"+
								"<a class='btn btn-sm default prev disabled' id='"+parent_id+"_prev' data-index='-"+page_size+"' onclick=\"document.getElementById('"+parent_id+"_index').value=(parseInt($(this).attr('data-index'))/"+page_size+")+1;"+parent_id+"_ini();\"><i class='fa fa-angle-left'></i></a>"+
								"<input type='text' id='"+parent_id+"_index' value='1' class='pagination-panel-input form-control input-sm input-inline input-mini' maxlength='5' style='text-align:center;margin:0 5px;' onkeydown=\"if(event.keyCode==13){ "+parent_id+"_ini();return false;}\">"+			
								"<a class='btn btn-sm default next' id='"+parent_id+"_next' data-index='"+page_size+"' onclick=\"document.getElementById('"+parent_id+"_index').value=(parseInt($(this).attr('data-index'))/"+page_size+")+1;"+parent_id+"_ini();\"><i class='fa fa-angle-right'></i></a>"+
							"</div>";
	var index_element=document.getElementById(parent_id+'_index');
	
	if(index_element=='null' || index_element==null)
	{						
		$('#'+parent_id).find(".portlet-body").append(html_content);
	}
	else
	{
		index_element.value=1;
	}
}

function get_page_index(parent_id,page_size)
{
	var index_value=parseInt(document.getElementById(parent_id+'_index').value)-1;
	if(isNaN(index_value))
	{
		return 0;
	}
	else
	{	
		return index_value*page_size;
	}
}

function update_page_index(parent_id,page_size,result_count)
{
	var index_element=document.getElementById(parent_id+'_index');
	var prev_element=document.getElementById(parent_id+'_prev');
	var next_element=document.getElementById(parent_id+'_next');
			
	var next_index=get_page_index(parent_id,page_size)+page_size;
	var prev_index=get_page_index(parent_id,page_size)-page_size;
	next_element.setAttribute('data-index',next_index);
	prev_element.setAttribute('data-index',prev_index);

	if(result_count<page_size)
	{
		$(next_element).addClass('disabled');
	}
	else
	{
		$(next_element).removeClass('disabled');
	}
	if(prev_index<0)
	{
		$(prev_element).addClass('disabled');
	}
	else
	{
		$(prev_element).removeClass('disabled');
	}				
}