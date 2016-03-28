<div id='form183' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick="modal156_action('manufactured');">Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form183_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form183_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form183_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form183_upload' onclick=modal23_action(form183_import_template,form183_import);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form183_header'></form>
						<th><input type='text' placeholder="Item" class='floatlabel' name='name' form='form183_header'></th>
						<th><input type='text' placeholder="Batch" class='floatlabel' name='batch' form='form183_header'></th>
						<th><input type='text' placeholder="Manufacturing" readonly='readonly' form='form183_header'></th>
						<th><input type='text' placeholder="Quantity" readonly="readonly" form='form183_header'></th>
						<th><input type='submit' form='form183_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form183_body'>
			</tbody>
		</table>
	</div>
        
    <script>

        function form183_header_ini()
        {
            var filter_fields=document.getElementById('form183_header');	
            var names_filter=filter_fields.elements['name'];
            var batches_filter=filter_fields.elements['batch'];

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form183_ini();
            });

            var item_data={data_store:'attributes',return_column:'name',
                          indexes:[{index:'type',exact:'product'},
                                  {index:'value',exact:'yes'},
                                  {index:'attribute',exact:'manufactured'}]};

            var batch_data={data_store:'product_instances',return_column:'batch'};
            set_my_filter_json(item_data,names_filter);
            set_my_filter_json(batch_data,batches_filter);
        };

        function form183_ini()
        {
            show_loader();
            var fid=$("#form183_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form183_body').html('');
            
            var filter_fields=document.getElementById('form183_header');
            var fname=filter_fields.elements['name'].value;
            var fbatch=filter_fields.elements['batch'].value;


            var item_columns={data_store:'attributes',return_column:'name',
                             indexes:[{index:'name',value:fname},
                                     {index:'type',exact:'product'},
                                     {index:'value',value:'yes'},
                                     {index:'attribute',value:'manufactured'}]};

            read_json_single_column(item_columns,function (items) 
            {
                var paginator=$('#form183_body').paginator();
			
			
                var columns={data_store:'product_instances',                 
					       count:paginator.page_size(),
					       start_index:paginator.get_index(),
                           indexes:[{index:'id',value:fid},
                                    {index:'batch',value:fbatch},
                                    {index:'product_name',array:items},
                                    {index:'manufacture_date'}]};
                read_json_rows('form183',columns,function(results)
                {
                    results.forEach(function(result)
                    {
                        var rowsHTML="<tr>";
                            rowsHTML+="<form id='form183_"+result.id+"'></form>";
                                rowsHTML+="<td data-th='Name'>";
                                    rowsHTML+="<a onclick=\"show_object('product_master','"+result.product_name+"');\"><textarea readonly='readonly' form='form183_"+result.id+"'>"+result.product_name+"</textarea></a>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Batch'>";
                                    rowsHTML+="<a><input type='text' readonly='readonly' form='form183_"+result.id+"' value='"+result.batch+"'></a>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Manufacturing'>";
                                    rowsHTML+="<input type='text' class='dblclick_editable' readonly='readonly' form='form183_"+result.id+"' value='"+get_my_past_date(result.manufacture_date)+"'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Quantity'>";
                                    rowsHTML+="<input type='number' step='any' readonly='readonly' form='form183_"+result.id+"' value=''>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Action'>";
                                    rowsHTML+="<input type='hidden' form='form183_"+result.id+"' value='"+result.id+"'>";
                                    rowsHTML+="<input type='submit' class='submit_hidden' form='form183_"+result.id+"'>";
                                    rowsHTML+="<button type='button' class='btn yellow-saffron' title='Print Barcode' onclick=\"print_product_barcode('"+result.id+"','"+result.product_name+"','"+result.batch+"');\"><i class='fa fa-barcode'></i></button>";
                                    rowsHTML+="<button type='button' class='btn red' title='Delete' name='delete' form='form183_"+result.id+"' onclick='form183_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                                rowsHTML+="</td>";			
                        rowsHTML+="</tr>";

                        $('#form183_body').append(rowsHTML);
                        var fields=document.getElementById("form183_"+result.id);
                        var batch=fields.elements[1];
                        var manufacturing=fields.elements[2];
                        var sys_inventory=fields.elements[3];
                        
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

                    $('#form183').formcontrol();
				    paginator.update_index(results.length);
				    initialize_tabular_report_buttons(columns,'Inventory (finished goods)','form183',function (item)
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
        
        function form183_update_item(form)
        {
            if(is_update_access('form183'))
            {
                var name=form.elements[0].value;
                var batch=form.elements[1].value;
                var date=get_raw_time(form.elements[2].value);
                var data_id=form.elements[4].value;
                var last_updated=get_my_time();

                var data_json={data_store:'product_instances',
                        data:[{index:'id',value:data_id},
                             {index:'manufacture_date',value:date},
                             {index:'last_updated',value:last_updated}]};

                update_json(data_json);

                $(form).readonly();               
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form183_delete_item(button)
        {
            if(is_delete_access('form183'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);
                    var name=form.elements[0].value;
                    var batch=form.elements[1].value;
                    var data_id=form.elements[4].value;
                    var last_updated=get_my_time();
                    
                    var data_json={data_store:'product_instances',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Batch number "+batch+" of "+name,link_to:"form183"}};

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

        function form183_import_template()
        {
            var data_array=['id','product_name','batch','expiry','manufacture_date','actual_quantity','mrp'];
            my_array_to_csv(data_array);
        };

        function form183_import(data_array,import_type)
        {
            var data_json={data_store:'product_instances',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Batches for items',link_to:'form183'}};

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
	 					{index:'product_name',value:row.product_name},
	 					{index:'batch',value:row.batch},
	 					{index:'mrp',value:row.mrp},
	 					{index:'expiry',value:get_raw_time(row.expiry)},
                        {index:'manufacture_date',value:get_raw_time(row.manufacture_date)},             
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
                
                if(row.actual_quantity!="")
                {
                    get_inventory(row.product_name,row.batch,function(quantity)
                    {
                        if(parseFloat(quantity)!==parseFloat(row.actual_quantity))
                        {
                            var new_quantity=parseFloat(row.actual_quantity)-parseFloat(quantity);
                            var adjust_json={data_store:'inventory_adjust',
                                             loader:'no',
                                             warning:'no',
 							                data:[{index:'product_name',value:row.product_name},
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
				create_batch_json(data_json);
			}
			else
			{
				update_batch_json(data_json);
            }
        }


    </script>
</div>