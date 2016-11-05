<div id='form197' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form197_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form197_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form197_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form197_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form197_upload' onclick=modal23_action(form197_import_template,form197_import,form197_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form197_header'></form>
						<th><input type='text' placeholder="Item" class='floatlabel' name='name' form='form197_header'></th>
						<th><input type='text' placeholder="Supplier" class='floatlabel' name='supplier' form='form197_header'></th>
						<th><input type='text' placeholder="Company" class='floatlabel' name='company' form='form197_header'></th>
						<th><input type='submit' form='form197_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form197_body'>
			</tbody>
		</table>
	</div>

    <script>
        function form197_header_ini()
        {
            var filter_fields=document.getElementById('form197_header');
            var product_filter=filter_fields.elements['name'];
            var supplier_filter=filter_fields.elements['supplier'];
						var company_filter=filter_fields.elements['company'];

            var product_data={data_store:'product_master',return_column:'name'};
            var supplier_data={data_store:'suppliers',return_column:'acc_name'};
						var company_data={data_store:'attributes',return_column:'value',
															indexes:[{index:'type',exact:'supplier'},
																			{index:'attribute',exact:'Company'}]};

						set_my_filter_json(product_data,product_filter);
            set_my_filter_json(supplier_data,supplier_filter);
						set_my_filter_json(company_data,company_filter);

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form197_ini();
            });
        };

        function form197_ini()
        {
            show_loader();
            var fid=$("#form197_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form197_body').html("");
            var filter_fields=document.getElementById('form197_header');
            var fproduct=filter_fields.elements['name'].value;
            var fsupplier=filter_fields.elements['supplier'].value;
						var fcompany=filter_fields.elements['company'].value;

            var paginator=$('#form197_body').paginator();

						var columns={count:paginator.page_size(),
												start_index:paginator.get_index(),
												data_store:'supplier_item_mapping',
												indexes:[{index:'id',value:fid},
																{index:'item',value:fproduct},
																{index:'company',value:fcompany},
																{index:'supplier',value:fsupplier}]};

            read_json_rows('form197',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="";
                    rowsHTML+="<tr>";
                        rowsHTML+="<form id='form197_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Item'>";
                                rowsHTML+="<a onclick=\"show_object('product_master','"+result.item+"');\"><textarea readonly='readonly' form='form197_"+result.id+"'>"+result.item+"</textarea></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Supplier'>";
                                rowsHTML+="<a onclick=\"show_object('suppliers','"+result.supplier+"');\"><textarea readonly='readonly' form='form197_"+result.id+"'>"+result.supplier+"</textarea></a>";
                            rowsHTML+="</td>";
														rowsHTML+="<td data-th='Company'>";
                                rowsHTML+="<textarea readonly='readonly' form='form197_"+result.id+"'>"+result.company+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form197_"+result.id+"' value='"+result.id+"'>";
                                rowsHTML+="<button type='submit' class='btn green' form='form197_"+result.id+"' name='save' title='Save'><i class='fa fa-save'></i></button>";
                                rowsHTML+="<button type='button' class='btn red' form='form197_"+result.id+"' title='Delete' name='delete' onclick='form197_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form197_body').append(rowsHTML);
                });

                $('#form197').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:columns,file:'Supplier Item Mapping',report_id:'form197'});
				hide_loader();
            });
        };

        function form197_add_item()
        {
            if(is_create_access('form197'))
            {
                var id=vUtil.newKey();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form197_"+id+"' autocomplete='off'></form>";
                    rowsHTML+="<td data-th='Item'>";
                        rowsHTML+="<input type='text' form='form197_"+id+"' required>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Supplier'>";
                        rowsHTML+="<input type='text' form='form197_"+id+"' required>";
                    rowsHTML+="</td>";
										rowsHTML+="<td data-th='Company'>";
                        rowsHTML+="<input type='text' form='form197_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form197_"+id+"' value='"+id+"'>";
                        rowsHTML+="<button type='submit' class='btn green' name='save' title='Save' form='form197_"+id+"'><i class='fa fa-save'></i></button>";
                        rowsHTML+="<button type='button' class='btn red' name='delete' title='Delete' form='form197_"+id+"' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
                    rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form197_body').prepend(rowsHTML);
                var fields=document.getElementById("form197_"+id);
                var product_filter=fields.elements[0];
                var supplier_filter=fields.elements[1];
								var company_filter=fields.elements[2];

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form197_create_item(fields);
                });

                var product_data={data_store:'product_master',return_column:'name'};
                set_my_value_list_json(product_data,product_filter,function ()
                {
                    $(product_filter).focus();
                });

                var supplier_data={data_store:'suppliers',return_column:'acc_name'};
                set_my_value_list_json(supplier_data,supplier_filter);

								var company_data={data_store:'attributes',return_column:'value',
																	indexes:[{index:'type',exact:'supplier'},
																					{index:'attribute',exact:'Company'}]};
								set_my_value_list_json(company_data,company_filter);

								vUtil.onChange(supplier_filter,function()
								{
									var company_data={data_store:'attributes',return_column:'value',
																		indexes:[{index:'type',exact:'supplier'},
																						{index:'attribute',exact:'Company'},
																						{index:'name',exact:supplier_filter.value}]};
										set_my_value_json(company_data,company_filter);
								});

								vUtil.onChange(company_filter,function()
								{
									var supplier_data={data_store:'attributes',return_column:'name',
																		indexes:[{index:'type',exact:'supplier'},
																						{index:'attribute',exact:'Company'},
																						{index:'value',exact:company_filter.value}]};
										set_my_value_json(supplier_data,supplier_filter);
								});

								$('#form197').formcontrol();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form197_create_item(form)
        {
            if(is_create_access('form197'))
            {
                var item=form.elements[0].value;
                var supplier=form.elements[1].value;
                var company=form.elements[2].value;
								var data_id=form.elements[3].value;
                var del_button=form.elements[5];
                var last_updated=get_my_time();

                var data_json={data_store:'supplier_item_mapping',
						 				data:[{index:'id',value:data_id},
						 					{index:'item',value:item,uniqueWith:['supplier']},
						 					{index:'supplier',value:supplier},
											{index:'company',value:company},
						 					{index:'last_updated',value:last_updated}]};

                create_json(data_json);

                $(form).readonly();

                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form197_delete_item(del_button);
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

        function form197_delete_item(button)
        {
            if(is_delete_access('form197'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var data_id=form.elements[3].value;
                    var last_updated=get_my_time();

                    var data_json={data_store:'supplier_item_mapping',
	 				      					data:[{index:'id',value:data_id}]};

                    delete_json(data_json);

                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form197_import_template()
        {
            var data_array=['id','item','supplier','company'];
            vUtil.arrayToCSV(data_array);
        };

        function form197_import_validate(data_array)
        {
            var validate_template_array=[{column:'item',required:'yes',regex:new RegExp('^[0-9a-zA-Z_., \'+@!$()-]+$')},
                                    {column:'supplier',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
																		{column:'supplier',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')}];

            var error_array=vImport.validate(data_array,validate_template_array);
            return error_array;
        }

        function form197_import(data_array,import_type)
        {
            var data_json={data_store:'supplier_item_mapping',
				 					log:'yes',
				 					data:[],
				 					log_data:{title:'List of items for each supplier',link_to:'form197'}};

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
				 					{index:'item',value:row.item,uniqueWith:['supplier']},
				 					{index:'supplier',value:row.supplier},
									{index:'company',value:row.company},
				 					{index:'last_updated',value:last_updated}];

							data_json.data.push(data_json_array);
						});

						if(import_type=='create_new')
						{
							if(is_create_access('form197'))
							{
								create_batch_json(data_json);
							}
							else
							{
								$("#modal2_link").click();
							}
						}
						else
						{
							if(is_update_access('form197'))
							{
								update_batch_json(data_json);
							}
							else
							{
								$("#modal2_link").click();
							}
						}
        };


    </script>
</div>
