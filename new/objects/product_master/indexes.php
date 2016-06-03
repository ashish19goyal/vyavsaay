<div>
    <input type='hidden' id='object_product_master_indexes_product_id'>
    <button type='button' onclick=object_product_master_indexes_add(); class='btn btn-circle grey-cascade' title='Add Index'>Add <i class='fa fa-plus'></i></button>
    <button type='button' onclick=object_product_master_indexes_update(); class='btn btn-circle grey-cascade' title='Save All Indexes'>Save <i class='fa fa-save'></i></button>
    <div class='scroller' style='height:250px;' data-rail-visible1="1" id='object_product_master_indexes'></div>
	<script>
		function initialize_object_product_master_indexes(obj_name,obj_id)
		{
            var container=document.getElementById('object_product_master_indexes');
            container.innerHTML="";
			var index_data={data_store:'product_master',count:1,
                           indexes:[{index:'id'},{index:'indexes'},{index:'name',value:obj_name}]};
            read_json_rows('',index_data,function(indexes)
            {
                document.getElementById('object_product_master_indexes_product_id').value=indexes[0].id;
                if(indexes[0].indexes!="" && indexes[0].indexes!=null)
                {
                    var index_array=vUtil.jsonParse(indexes[0].indexes);
                    index_array.forEach(function(index)
                    {
                        var index_element="<div class='row'><div class='col-xs-10'><input type='text' value='"+index+"' readonly='readonly'></div><div class='col-xs-2'><a class='btn btn-icon-only default' style='margin-right:10px;' onclick=$(this).parent().parent().remove();><i class='fa fa-2x fa-trash'></i></a></div></div>";
                        $(container).append(index_element);
                    });
                }
            });
		}

        function object_product_master_indexes_update()
        {
            var product_id=document.getElementById('object_product_master_indexes_product_id').value;
            var indexes=[];
            var container=document.getElementById('object_product_master_indexes');
            $(container).find('input').each(function()
            {
                var index=$(this).val();
                if(index!="")
                {
                    indexes.push(index);
                    $(this).attr('readonly','readonly');
                }
            });
            var index_string=JSON.stringify(indexes);
            var data_json={data_store:'product_master',
	 				data:[{index:'id',value:product_id},
	 					{index:'indexes',value:index_string},
	 					{index:'last_updated',value:get_my_time()}]};
 			update_json(data_json);
        }

        function object_product_master_indexes_add()
        {
            var container=document.getElementById('object_product_master_indexes');
            var index_element="<div class='row'><div class='col-xs-10'><input type='text'></div><div class='col-xs-2'><a onclick=$(this).parent().parent().remove(); class='btn btn-icon-only default'><i class='fa fa-2x fa-trash' style='margin-right:10px;'></i></a></div></div>";
            $(container).prepend(index_element);
        }
	</script>
</div>
