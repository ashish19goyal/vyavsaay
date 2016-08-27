<div id='form238' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick="modal156_action('raw material');">Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form238_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form238_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form238_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form238_upload' onclick=modal23_action(form238_import_template,form238_import);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form238_header'></form>
						<th><input type='text' placeholder="Item" class='floatlabel' name='name' form='form238_header'></th>
						<th><input type='text' placeholder="Batch" class='floatlabel' name='batch' form='form238_header'></th>
						<th><input type='text' placeholder="Manufacturing" readonly='readonly' form='form238_header'></th>
						<th><input type='text' placeholder="Cost Price" readonly='readonly' form='form238_header'></th>
						<th><input type='text' placeholder="Quantity" readonly="readonly" form='form238_header'></th>
						<th><input type='submit' form='form238_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form238_body'>
			</tbody>
		</table>
	</div>

    <script>

        function form238_header_ini()
        {
            var filter_fields=document.getElementById('form238_header');
            var names_filter=filter_fields.elements['name'];
            var batches_filter=filter_fields.elements['batch'];

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form238_ini();
            });

            var item_data={data_store:'attributes',return_column:'name',
                          indexes:[{index:'type',exact:'product'},
                                  {index:'value',exact:'yes'},
                                  {index:'attribute',exact:'raw material'}]};

            var batch_data={data_store:'product_instances',return_column:'batch'};
            set_my_filter_json(item_data,names_filter);
            set_my_filter_json(batch_data,batches_filter);
        };

        function form238_ini()
        {
            show_loader();
            var fid=$("#form238_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form238_body').html('');

            var filter_fields=document.getElementById('form238_header');
            var fname=filter_fields.elements['name'].value;
            var fbatch=filter_fields.elements['batch'].value;


            var item_columns={data_store:'attributes',return_column:'name',
                             indexes:[{index:'name',value:fname},
                                     {index:'type',exact:'product'},
                                     {index:'value',value:'yes'},
                                     {index:'attribute',value:'raw material'}]};

            read_json_single_column(item_columns,function (items)
            {
                var paginator=$('#form238_body').paginator();


                var columns={data_store:'product_instances',
					       count:paginator.page_size(),
					       start_index:paginator.get_index(),
                           indexes:[{index:'id',value:fid},
                                    {index:'batch',value:fbatch},
                                    {index:'product_name',array:items},
																		{index:'cost_price'},
                                    {index:'manufacture_date'}]};
                read_json_rows('form238',columns,function(results)
                {
                    results.forEach(function(result)
                    {
                        var rowsHTML="<tr>";
                            rowsHTML+="<form id='form238_"+result.id+"'></form>";
                                rowsHTML+="<td data-th='Name'>";
                                    rowsHTML+="<a onclick=\"show_object('product_master','"+result.product_name+"');\"><textarea readonly='readonly' form='form238_"+result.id+"'>"+result.product_name+"</textarea></a>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Batch'>";
                                    rowsHTML+="<a><input type='text' readonly='readonly' form='form238_"+result.id+"' value='"+result.batch+"'></a>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Manufacturing'>";
                                    rowsHTML+="<input type='text' class='dblclick_editable' readonly='readonly' form='form238_"+result.id+"' value='"+get_my_past_date(result.manufacture_date)+"'>";
                                rowsHTML+="</td>";
																rowsHTML+="<td data-th='Cost Price'>";
                                    rowsHTML+="<input type='number' step='any' class='dblclick_editable' readonly='readonly' form='form238_"+result.id+"' value='"+result.cost_price+"'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Quantity'>";
                                    rowsHTML+="<input type='number' step='any' readonly='readonly' form='form238_"+result.id+"' value=''>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Action'>";
                                    rowsHTML+="<input type='hidden' form='form238_"+result.id+"' value='"+result.id+"'>";
                                    rowsHTML+="<input type='submit' class='submit_hidden' form='form183_"+result.id+"'>";
                                    rowsHTML+="<button type='button' class='btn yellow-saffron' title='Print Barcode' onclick=\"print_product_barcode('"+result.id+"','"+result.product_name+"','"+result.batch+"');\"><i class='fa fa-barcode'></i></button>";
                                    rowsHTML+="<button type='button' class='btn red' title='Delete' name='delete' form='form238_"+result.id+"' onclick='form238_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                                rowsHTML+="</td>";
                        rowsHTML+="</tr>";

                        $('#form238_body').append(rowsHTML);
                        var fields=document.getElementById("form238_"+result.id);
                        var batch=fields.elements[1];
                        var manufacturing=fields.elements[2];
                        var sys_inventory=fields.elements[4];

                        var batch_object={product:result.product_name,batch:result.batch};
                        $(batch).parent().on('click',function()
                        {
                            show_object('product_instances',batch_object);
                        });

                        get_inventory(result.product_name,result.batch,function(inventory)
                        {
                            sys_inventory.value=inventory;
                        });

                        $(fields).on('submit',function(e)
                        {
                            e.preventDefault();
                            form183_update_item(fields);
                        });
                    });

                    $('#form238').formcontrol();
								    paginator.update_index(results.length);
								    initialize_tabular_report_buttons(columns,'Inventory (finished goods)','form238',function (item)
                    {
                        total_export_requests+=1;
                        get_inventory(item.product_name,item.batch,function(inventory)
                        {
                            item.quantity=inventory;
                            total_export_requests-=1;
                        });
                        item.manufacture_date=get_my_past_date(item.manufacture_date);
                    });
                    hide_loader();
                });
            });
        };

        function form238_update_item(form)
        {
            if(is_update_access('form238'))
            {
                var name=form.elements[0].value;
                var batch=form.elements[1].value;
                var date=get_raw_time(form.elements[2].value);
								var cost_price=form.elements[3].value;
                var data_id=form.elements[5].value;
                var last_updated=get_my_time();

                var data_json={data_store:'product_instances',
                        data:[{index:'id',value:data_id},
                             {index:'manufacture_date',value:date},
														 {index:'cost_price',value:cost_price},
                             {index:'last_updated',value:last_updated}]};

                update_json(data_json);

                $(form).readonly();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form238_delete_item(button)
        {
            if(is_delete_access('form238'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);
                    var name=form.elements[0].value;
                    var batch=form.elements[1].value;
                    var data_id=form.elements[5].value;
                    var last_updated=get_my_time();

                    var data_json={data_store:'product_instances',
						 							data:[{index:'id',value:data_id}],
						 							log:'yes',
						 							log_data:{title:"Deleted",notes:"Batch number "+batch+" of "+name,link_to:"form238"}};

                    var other_json={data_store:'area_utilization',
 													data:[{index:'item_name',value:name},
                                 {index:'batch',value:batch}]};

                    delete_json(data_json);
                    delete_json(other_json);

                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form238_import_template()
        {
            var data_array=['id','item name','batch','manufacture date','actual quantity','cost price'];
            vUtil.arrayToCSV(data_array);
        };

        function form238_import(data_array,import_type)
        {
            var data_json={data_store:'product_instances',
								 					log:'yes',
								 					data:[],
								 					log_data:{title:'Batches for items',link_to:'form238'}};

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
				 					{index:'product_name',value:row['item name']},
				 					{index:'batch',value:row.batch},
				 					{index:'cost_price',value:row['cost price']},
				 					{index:'manufacture_date',value:get_raw_time(row['manufacture date'])},
				 					{index:'last_updated',value:last_updated}];

							data_json.data.push(data_json_array);

              if(row['actual quantity']!="")
              {
                  get_inventory(row['item name'],row.batch,function(quantity)
                  {
                      if(parseFloat(quantity)!==parseFloat(row['actual quantity']))
                      {
                          var new_quantity=parseFloat(row['actual quantity'])-parseFloat(quantity);
                          var adjust_json={data_store:'inventory_adjust',
                                           loader:'no',
                                           warning:'no',
							                data:[{index:'product_name',value:row['item name']},
                                                  {index:'batch',value:row.batch},
                                                  {index:'quantity',value:new_quantity},
                                                  {index:'last_updated',value:last_updated}]};
                          create_json(adjust_json);
                      }
                  });
              }
						});

						if(import_type=='create_new')
						{
							if(is_create_access('form238'))
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
							if(is_update_access('form238'))
							{
								update_batch_json(data_json);
							}
							else
	            {
	              $("#modal2_link").click();
	            }
            }
        }


    </script>
</div>
