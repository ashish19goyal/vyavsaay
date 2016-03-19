<div>
    <input type='hidden' id='object_projects_documents_project_name'>
    <button type='button' id='object_projects_documents_add' class='btn btn-circle grey-cascade' title='Add member'>Add <i class='fa fa-plus'></i></button>
    
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <div id='object_projects_documents' style='margin:2%;'></div>
    </div>
	
	<script>
		function initialize_object_projects_documents(obj_name,obj_id)
		{
            var container=document.getElementById('object_projects_documents');
            container.innerHTML="";
            
            var paginator=$('#object_projects_documents').paginator(
                        {   page_size:5,
                            func:"initialize_object_projects_documents('"+obj_name+"','"+obj_id+"');"});
            
			$('#object_projects_documents_project_name').value=obj_name;
            $('#object_projects_documents_add').off('click');
            $('#object_projects_documents_add').on('click',function()
            {
                modal206_action('project','',obj_name,function()
                {
                    initialize_object_projects_documents(obj_name,obj_id);
                });
            });
            
            var columns={data_store:'documents',
                         count:paginator.page_size(),
                         start_index:paginator.get_index(),
                         indexes:[{index:'id'},
                                 {index:'doc_type',exact:'project'},
                                 {index:'target_name',value:obj_name}, 
                                 {index:'doc_name'},
                                 {index:'url'}]};

            read_json_rows('',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var d="<div class='row'>"+
                            "<div class='col-xs-10'>"+
                                "<a href='"+result.url+"' download='"+result.doc_name+"'>"+result.doc_name+"</a>"+
                            "</div>"+
                            "<div class='col-xs-2'>"+
                                "<a class='btn btn-icon-only default' style='margin-right:10px;' data-id='"+result.id+"' onclick=object_projects_documents_delete($(this));><i class='fa fa-2x fa-trash'></i></a>"+
                            "</div>"+
                        "</div>";
                    $(container).append(d);
                });
                paginator.update_index(results.length);                
            });
		} 

        function object_projects_documents_delete(button)
        {
            if(is_delete_access('projects'))
            {
                modal115_action(function()
                {
                    var data_id=$(button).attr('data-id');
                    var data_json={data_store:'documents',
 							data:[{index:'id',value:data_id},{index:'doc_type',value:'project'}]};
			
                    delete_json(data_json);
                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

    </script>
</div>