<div id='form38' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form38_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form38_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form38_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form38_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form38_upload' onclick=modal23_action(form38_import_template,form38_import,form38_import_validate);><i class='fa fa-upload'></i> Import</a>
                    </li>
                </ul>
            </div>
      </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form38_header'></form>
						<th><input type='text' placeholder="Item" class='floatlabel' name='item_name' form='form38_header'></th>
						<th><input type='text' placeholder="Batch" class='floatlabel' name='batch' form='form38_header'></th>
						<th><input type='text' placeholder="Storage" class='floatlabel' name='store' form='form38_header'></th>
						<th><input type='text' placeholder="Quantity" readonly="readonly" name='quantity' form='form38_header'></th>
						<th><input type='submit' form='form38_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form38_body'>
			</tbody>
		</table>
	</div>

    <script>

        function form38_header_ini()
        {
            var filter_fields=document.getElementById('form38_header');
            var name_filter=filter_fields.elements['item_name'];
            var batch_filter=filter_fields.elements['batch'];
            var area_filter=filter_fields.elements['store'];

            var products_data={data_store:'product_master',return_column:'name'};
            var batch_data={data_store:'product_instances',return_column:'batch'};
            var area_data={data_store:'store_areas',return_column:'name'};

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form38_ini();
            });

            set_my_filter_json(products_data,name_filter);
            set_my_filter_json(batch_data,batch_filter);
            set_my_filter_json(area_data,area_filter);
        };

        function form38_ini()
        {
            show_loader();
            var fid=$("#form38_link").attr('data_id');
            if(fid==null)
                fid="";	

            $('#form38_body').html("");

            var filter_fields=document.getElementById('form38_header');
            var fname=filter_fields.elements['item_name'].value;
            var fbatch=filter_fields.elements['batch'].value;
            var farea=filter_fields.elements['store'].value;

            var paginator=$('#form38_body').paginator();
			
			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='area_utilization';
                    columns.access={data_store:'store_areas',
                                    match_result:'yes',
                                    match_condition:'1',
                                    match_columns:[{col_order:1,result_column:'name',data_column:'name'}]};
					columns.indexes=[{index:'id',value:fid},
									{index:'item_name',value:fname},
									{index:'batch',value:fbatch},
									{index:'name',value:farea}];
			
            read_json_rows('form38',columns,function(results)
            {	
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form38_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Item Name'>";
                                rowsHTML+="<a onclick=\"show_object('product_master','"+result.item_name+"');\"><input type='text' readonly='readonly' form='form38_"+result.id+"' value='"+result.item_name+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Batch'>";
                                rowsHTML+="<a><input type='text' readonly='readonly' form='form38_"+result.id+"' value='"+result.batch+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Storage'>";
                                rowsHTML+="<a onclick=\"show_object('store_areas','"+result.name+"');\"><input type='text' readonly='readonly' form='form38_"+result.id+"' value='"+result.name+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Quantity'>";
                                rowsHTML+="<input type='number' readonly='readonly' form='form38_"+result.id+"' value=''>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form38_"+result.id+"' value='"+result.id+"'>";
                                rowsHTML+="<button type='button' class='btn red' form='form38_"+result.id+"' title='Delete' name='delete' onclick='form38_delete_item($(this));'><i class='fa fa-trash'></i></button>";	
                            rowsHTML+="</td>";			
                    rowsHTML+="</tr>";

                    $('#form38_body').append(rowsHTML);
                    var fields=document.getElementById("form38_"+result.id);
                    var batch=fields.elements[1];
                    var quantity=fields.elements[3];
                    var delete_button=fields.elements['delete'];
                    
                    var batch_object={product:result.item_name,batch:result.batch};
                    $(batch).parent().on('click',function()
                    {
                        show_object('product_instances',batch_object);
                    });

                    get_store_inventory(result.name,result.item_name,result.batch,function(inventory)
                    {
                        quantity.value=inventory;
                        if(parseFloat(inventory)!=0)
                        {
                            $(delete_button).hide();
                        }
                    });
                });

                $('#form38').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(columns,'Store Placement','form38',function (item){});
				hide_loader();
            });
        };

        function form38_add_item()
        {
            if(is_create_access('form38'))
            {
                var id=get_new_key();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form38_"+id+"' autocomplete='off'></form>";
                    rowsHTML+="<td data-th='Item Name'>";
                        rowsHTML+="<input type='text' form='form38_"+id+"' value=''>";
                        rowsHTML+="<a title='Add new item' class='btn btn-circle btn-icon-only grey-cascade' id='form38_add_product_"+id+"'><i class='fa fa-plus'></i></a>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Batch'>";
                        rowsHTML+="<input type='text' form='form38_"+id+"' value=''>";
                        rowsHTML+="<a title='Add new batch' class='btn btn-circle btn-icon-only grey-cascade' id='form38_add_batch_"+id+"'><i class='fa fa-plus'></i></a>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Storage'>";
                        rowsHTML+="<input type='text' form='form38_"+id+"' value=''>";
                        rowsHTML+="<a title='Add new storage' class='btn btn-circle btn-icon-only grey-cascade' id='form38_add_storage_"+id+"'><i class='fa fa-plus'></i></a>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Quantity'>";
                        rowsHTML+="<input type='number' readonly='readonly' form='form38_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form38_"+id+"' value='"+id+"'>";
                        rowsHTML+="<button type='submit' class='btn green' name='save' title='Save' form='form38_"+id+"' ><i class='fa fa-save'></i></button>";
                        rowsHTML+="<button type='button' class='btn red' form='form38_"+id+"' onclick='$(this).parent().parent().remove();' name='delete' title='Delete'><i class='fa fa-trash'></i></button>";	
                    rowsHTML+="</td>";			
                rowsHTML+="</tr>";

                $('#form38_body').prepend(rowsHTML);

                var fields=document.getElementById("form38_"+id);
                var product_filter=fields.elements[0];
                var batch_filter=fields.elements[1];
                var area_filter=fields.elements[2];

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form38_create_item(fields);
                });		

                var products_data={data_store:'product_master',return_column:'name'};
                set_my_value_list_json(products_data,product_filter,function () 
                {
                    $(product_filter).focus();
                });

                var add_product=document.getElementById('form38_add_product_'+id);
                $(add_product).on('click',function()
                {
                    modal14_action(function()
                    {	
                        var product_data={data_store:'product_master',return_column:'name'};
                        set_my_value_list_json(products_data,product_filter,function () 
                        {
                            $(product_filter).focus();
                        });
                    });
                });

                var add_batch=document.getElementById('form38_add_batch_'+id);
                $(add_batch).on('click',function()
                {
                    modal22_action(function()
                    {	
                        var batch_data={data_store:'product_instances',return_column:'batch',
                                        indexes:[{index:'product_name',exact:product_filter.value}]};
                        set_my_value_list_json(batch_data,batch_filter);
                    });
                });

                var add_storage=document.getElementById('form38_add_storage_'+id);
                $(add_storage).on('click',function()
                {
                    modal35_action(function()
                    {	
                        var area_data={data_store:'store_areas',return_column:'name'};
                        set_my_value_list_json(area_data,area_filter);
                    });
                });

                $(product_filter).on('blur',function(event)
                {
                    var batch_data={data_store:'product_instances',return_column:'batch',
                                   indexes:[{index:'product_name',exact:product_filter.value}]};
                    set_my_value_list_json(batch_data,batch_filter);
                });

                var area_data={data_store:'store_areas',return_column:'name'};
                set_my_value_list_json(area_data,area_filter);
                
                $('#form38').formcontrol();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form38_create_item(form)
        {
            if(is_create_access('form38'))
            {
                var product_name=form.elements[0].value;
                var batch=form.elements[1].value;
                var name=form.elements[2].value;
                var data_id=form.elements[4].value;
                var last_updated=get_my_time();
                var data_json={data_store:'area_utilization',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'item_name',value:product_name,uniqueWith:["batch","name"]},
	 					{index:'batch',value:batch},
	 					{index:'name',value:name},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Item '+product_name+' to storage '+name,link_to:'form38'}};
 				
                create_json(data_json);
                	
                $(form).readonly();
                
                var save_button=form.elements['save'];
                $(save_button).hide();
                var del_button=form.elements['delete'];
                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form38_delete_item(del_button);
                });

                $(form).off('submit');
                $(form).on('submit',function(event)
                {
                    event.preventDefault();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form38_delete_item(button)
        {
            if(is_delete_access('form38'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var product_name=form.elements[0].value;
                    var name=form.elements[2].value;
                    var data_id=form.elements[4].value;
                    var last_updated=get_my_time();
                    
                    var data_json={data_store:'area_utilization',
	 				log:'yes',
	 				data:[{index:'id',value:data_id}],
	 				log_data:{title:'Removed',notes:'Item '+product_name+' from storage '+name,link_to:'form38'}};

                    delete_json(data_json);
                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form38_import_template()
        {
            var data_array=['id','item_name','batch','storage'];
            my_array_to_csv(data_array);
        };

        function form87_import_validate(data_array)
        {
            var validate_template_array=[{column:'item_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z@#\$&! _.,()-]+$')},
                                    {column:'batch',requried:'yes',regex:new RegExp('^[0-9a-zA-Z_.,@\' ()-]+$')},
                                    {column:'storage',required:'yes',regex:new RegExp('^[0-9a-zA-Z _., \'+@!$()-]+$')}];

            var error_array=vImport.validate(data_array,validate_template_array);
            return error_array;					
        }

        function form38_import(data_array,import_type)
        {
            var data_json={data_store:'area_utilization',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Added items to storage areas',link_to:'form38'}};

			var counter=1;
			var last_updated=get_my_time();
		
			data_array.forEach(function(row)
			{
				counter+=1;
				if(import_type=='create_new')
				{
					row.id=last_updated+counter;
				}
				
				var data_json_array=[{index:'id',value:row.id},
	 					{index:'name',value:row.storage},
	 					{index:'item_name',value:row.item_name},
	 					{index:'batch',value:row.batch},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
			});
			
			if(import_type=='create_new')
			{
				create_batch_json(data_json);
			}
			else
			{
				update_batch_json(data_json);
			}            
        };

    </script>
</div>