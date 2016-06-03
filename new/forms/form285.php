<div id='form285' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form285_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form285_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form285_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form285_upload' onclick=modal23_action(form285_import_template,form285_import,form285_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form285_header'></form>
						<th><input type='text' placeholder="Item" class='floatlabel' name='name' form='form285_header'></th>
						<th><input type='text' placeholder="Quantity" readonly='readonly' form='form285_header'></th>
						<th><input type='submit' form='form285_header' class='submit_hidden'></th>
				</tr>
			</thead>
			<tbody id='form285_body'>
			</tbody>
		</table>
	</div>

    <script>
        function form285_header_ini()
        {
            var filter_fields=document.getElementById('form285_header');
            var name_filter=filter_fields.elements['name'];

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form285_ini();
            });

            var item_data={data_store:'attributes',return_column:'name',
                          indexes:[{index:'type',exact:'product'},
                                  {index:'value',exact:'no'},
                                  {index:'attribute',exact:'Spare Part'}]};
            set_my_filter_json(item_data,name_filter);
        };

        function form285_ini()
        {
            show_loader();
            var fid=$("#form285_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form285_body').html("");
            var filter_fields=document.getElementById('form285_header');
            var fname=filter_fields.elements['name'].value;

            var paginator=$('#form285_body').paginator();

            var new_columns={data_store:'attributes',
					       count:paginator.page_size(),
					       start_index:paginator.get_index(),
                           indexes:[{index:'id',value:fid},
                                    {index:'name',value:fname},
                                    {index:'type',exact:'product'},
                                    {index:'value',exact:'no'},
                                    {index:'attribute',exact:'Spare Part'}]};

            read_json_rows('form285',new_columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form285_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Item'>";
                                rowsHTML+="<a onclick=\"show_object('product_master','"+result.name+"');\"><textarea readonly='readonly' form='form285_"+result.id+"'>"+result.name+"</textarea></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Quantity'>";
                                rowsHTML+="<input type='number' step='any' readonly='readonly' form='form285_"+result.id+"'>";
														rowsHTML+="</td>";
		                        rowsHTML+="<td data-th='Update'>";
		                            rowsHTML+="<input type='hidden' form='form285_"+result.id+"' value='"+result.id+"'>";
																rowsHTML+="<button type='button' class='btn red-sunglo' onclick=\"modal215_action('"+result.name+"');\" form='form285_"+result.id+"'>Update Inventory</button>";
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form285_body').append(rowsHTML);
                    var fields=document.getElementById("form285_"+result.id);
                    var sys_inventory=fields.elements[1];

                    get_inventory(result.name,'',function(inventory)
                    {
                        sys_inventory.value=inventory;
                    });
                });

                $('#form285').formcontrol();
								paginator.update_index(results.length);
								initialize_tabular_report_buttons(new_columns,'Inventory (Cabinets)','form285',function (item)
                {
                    total_export_requests+=1;
                    get_inventory(item.name,'',function(inventory)
                    {
                        item.quantity=inventory;
                        delete item.type;
                        delete item.value;
                        delete item.id;
                        delete item.attribute;
                        total_export_requests-=1;
                    });
                });
			    			hide_loader();
            });
        };

        function form285_import_template()
        {
            var data_array=['id','item','quantity'];
            my_array_to_csv(data_array);
        };

        function form285_import_validate(data_array)
        {
            var validate_template_array=[{column:'quantity',required:'yes',regex:new RegExp('^[0-9 .]+$')},
                                    {column:'item',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$#%\*()-]+$')}];

            var error_array=validate_import_array(data_array,validate_template_array);
            return error_array;
        }

        function form285_import(data_array,import_type)
        {
            var data_json={data_store:'inventory_adjust',
		 					log:'yes',
		 					data:[],
		 					log_data:{title:'Added Inventory',link_to:'form285'}};

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
			 					{index:'product_name',value:row.item},
			 					{index:'batch',value:row.item},
			 					{index:'quantity',value:row.quantity},
			 					{index:'source',value:'imported'},
			 					{index:'last_updated',value:last_updated}];

						data_json.data.push(data_json_array);
					});

					if(import_type=='create_new')
					{
						if(is_create_access('form285'))
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
						if(is_update_access('form285'))
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
