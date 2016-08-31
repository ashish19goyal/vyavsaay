<div id='form60' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form60_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form60_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form60_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form60_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form60_upload' onclick=modal23_action(form60_import_template,form60_import,form60_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form60_header'></form>
						<th><input type='text' placeholder="Item" class='floatlabel' name='name' form='form60_header'></th>
						<th><input type='text' placeholder="Attribute" class='floatlabel' name='attr' form='form60_header'></th>
						<th><input type='text' placeholder="Value" class='floatlabel' name='val' form='form60_header'></th>
						<th><input type='submit' form='form60_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form60_body'>
			</tbody>
		</table>
	</div>
    
    <script>

        function form60_header_ini()
        {
            var filter_fields=document.getElementById('form60_header');
            var product_filter=filter_fields.elements['name'];
            var attribute_filter=filter_fields.elements['attr'];

            var product_data={data_store:'product_master',return_column:'name'};
            var attribute_data={data_store:'attributes',return_column:'attribute',
                               indexes:[{index:'type',exact:'product'}]};

            set_my_filter_json(product_data,product_filter);
            set_my_filter_json(attribute_data,attribute_filter);

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form60_ini();
            });
        };

        function form60_ini()
        {
            show_loader();
            var fid=$("#form60_link").attr('data_id');
            if(fid==null)
                fid="";	

            $('#form60_body').html("");

            var filter_fields=document.getElementById('form60_header');
            var fproduct=filter_fields.elements['name'].value;
            var fattribute=filter_fields.elements['attr'].value;
            var fvalue=filter_fields.elements['val'].value;

            var paginator=$('#form60_body').paginator();
			
			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='attributes';

					columns.indexes=[{index:'id',value:fid},
									{index:'name',value:fproduct},
									{index:'attribute',value:fattribute},
									{index:'value',value:fvalue},
									{index:'type',exact:'product'}];
			
            read_json_rows('form60',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form60_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Item'>";
                                rowsHTML+="<a onclick=\"show_object('product_master','"+result.name+"');\"><textarea readonly='readonly' form='form60_"+result.id+"'>"+result.name+"</textarea>";
                            rowsHTML+="</a></td>";
                            rowsHTML+="<td data-th='Attribute'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form60_"+result.id+"' value='"+result.attribute+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Value'>";
                                rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form60_"+result.id+"'>"+result.value+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form60_"+result.id+"' value='"+result.id+"'>";
                                rowsHTML+="<button type='submit' class='btn green' form='form60_"+result.id+"' name='save' title='Save'><i class='fa fa-save'></i></button>";
                                rowsHTML+="<button type='button' class='btn red' form='form60_"+result.id+"' name='delete' title='Delete' onclick='form60_delete_item($(this));'><i class='fa fa-trash'></i></button>";	
                            rowsHTML+="</td>";			
                    rowsHTML+="</tr>";

                    $('#form60_body').append(rowsHTML);
                    var fields=document.getElementById("form60_"+result.id);
                    $(fields).on("submit", function(event)
                    {
                        event.preventDefault();
                        form60_update_item(fields);
                    });
                });

                $('#form60').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(columns,'Product Attributes','form60',function (item)
                {
                    delete item.type;
                });
				hide_loader();
            });
        };

        function form60_add_item()
        {
            if(is_create_access('form60'))
            {
                var id=vUtil.newKey();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form60_"+id+"' autocomplete='off'></form>";
                    rowsHTML+="<td data-th='Item'>";
                        rowsHTML+="<input type='text' form='form60_"+id+"' required>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Attribute'>";
                        rowsHTML+="<input type='text' form='form60_"+id+"' required>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Value'>";
                        rowsHTML+="<textarea form='form60_"+id+"' required></textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form60_"+id+"' value='"+id+"'>";
                        rowsHTML+="<button type='submit' class='btn green' form='form60_"+id+"' name='save' title='Save'><i class='fa fa-save'></i></button>";
                        rowsHTML+="<button type='button' class='btn red' form='form60_"+id+"' onclick='$(this).parent().parent().remove();' name='delete' title='Delete'><i class='fa fa-trash'></i></button>";	
                    rowsHTML+="</td>";			
                rowsHTML+="</tr>";

                $('#form60_body').prepend(rowsHTML);
                var fields=document.getElementById("form60_"+id);
                var product_filter=fields.elements[0];
                var attribute_filter=fields.elements[1];

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form60_create_item(fields);
                });

                var product_data={data_store:'product_master',return_column:'name'};
                set_my_value_list_json(product_data,product_filter,function () 
                {
                    $(product_filter).focus();
                });

                var attribute_data={data_store:'attributes',return_column:"attribute",
                                   indexes:[{index:'type',exact:'product'}]};
                set_my_filter_json(attribute_data,attribute_filter);
                
                $('#form60').formcontrol();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form60_create_item(form)
        {
            if(is_create_access('form60'))
            {
                var product=form.elements[0].value;
                var attribute=form.elements[1].value;
                var value=form.elements[2].value;
                var data_id=form.elements[3].value;
                var last_updated=get_my_time();
                
                var data_json={data_store:'attributes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:product,uniqueWith:['attribute']},
	 					{index:'type',value:'product'},
	 					{index:'attribute',value:attribute},
                        {index:'value',value:value},  
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Attribute '+attribute+' for product '+product,link_to:'form60'}};
 				
                create_json(data_json);
                	
                $(form).readonly();

                var del_button=form.elements['delete'];
                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form60_delete_item(del_button);
                });

                $(form).off('submit');
                $(form).on('submit',function(event)
                {
                    event.preventDefault();
                    form60_update_item(form);
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form60_update_item(form)
        {
            if(is_update_access('form60'))
            {
                var product=form.elements[0].value;
                var attribute=form.elements[1].value;
                var value=form.elements[2].value;
                var data_id=form.elements[3].value;
                var last_updated=get_my_time();
                
                var data_json={data_store:'attributes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:product},
	 					{index:'type',value:'product'},
	 					{index:'attribute',value:attribute},
                        {index:'value',value:value},  
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Update',notes:'Attribute '+attribute+' for product '+product,link_to:'form60'}};
 				
                update_json(data_json);
                	
                $(form).readonly();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form60_delete_item(button)
        {
            if(is_delete_access('form60'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var product=form.elements[0].value;
                    var attribute=form.elements[1].value;
                    var data_id=form.elements[3].value;
                    var last_updated=get_my_time();
                    var data_json={data_store:'attributes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id}],
	 				log_data:{title:'Deleted',notes:'Attribute '+attribute+' for product '+product,link_to:'form60'}};
 				
                    delete_json(data_json);
                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form60_import_template()
        {
            var data_array=['id','name','attribute','value'];
            vUtil.arrayToCSV(data_array);
        };

        function form60_import_validate(data_array)
        {
            var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
                                    {column:'attribute',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
                                    {column:'value',regex:new RegExp('^[0-9a-zA-Z \'_.,/:@$*#%^!()-]+$')}];

            var error_array=vImport.validate(data_array,validate_template_array);
            return error_array;					
        }

        function form60_import(data_array,import_type)
        {
            var data_json={data_store:'attributes',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Attributes for products',link_to:'form60'}};

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
	 					{index:'name',value:row.name},
	 					{index:'type',value:'product'},
	 					{index:'attribute',value:row.attribute},
	 					{index:'value',value:row.value},
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