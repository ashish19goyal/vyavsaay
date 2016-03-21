<div id='form145' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form145_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form145_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form145_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form145_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form145_upload' onclick=modal23_action(form145_import_template,form145_import,form145_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form145_header'></form>
						<th><input type='text' placeholder="Item" class='floatlabel' name='item_name' form='form145_header'></th>
						<th><input type='text' placeholder="Batch" class='floatlabel' name='batch' form='form145_header'></th>
						<th><input type='text' placeholder="Quantity" readonly="readonly" name='quantity' form='form145_header'></th>
						<th><input type='text' placeholder="Storage" readonly='readonly' name='store' form='form145_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form145_header'></th>
						<th><input type='submit' form='form145_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form145_body'>
			</tbody>
		</table>
	</div>

    <script>
        
        function form145_header_ini()
        {
            var filter_fields=document.getElementById('form145_header');
            var product_filter=filter_fields.elements['item_name'];
            var batch_filter=filter_fields.elements['batch'];
            var status_filter=filter_fields.elements['status'];

            var products_data={data_store:'product_master',return_column:'name'};
            var batch_data={data_store:'product_instances',return_column:'batch'};
            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form145_ini();
            });

            set_my_filter_json(products_data,product_filter);
            set_my_filter_json(batch_data,batch_filter);
            set_static_filter_json('store_movement','status',status_filter);
        };

        function form145_ini()
        {
            show_loader();
            var fid=$("#form145_link").attr('data_id');
            if(fid==null)
                fid="";	

            var filter_fields=document.getElementById('form145_header');
            var fproduct=filter_fields.elements['item_name'].value;
            var fbatch=filter_fields.elements['batch'].value;
            var fstatus=filter_fields.elements['status'].value;

            $('#form145_body').html("");

            var paginator=$('#form145_body').paginator();
			
			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='store_movement';
                    columns.access={};
					columns.indexes=[{index:'id',value:fid},
									{index:'item_name',value:fproduct},
									{index:'batch',value:fbatch},
									{index:'quantity'},
                                    {index:'source'},
                                    {index:'target'},
                                    {index:'dispatcher'},
                                    {index:'receiver'},
                                    {index:'status',value:fstatus},
                                    {index:'applicable_from'}];
			

            read_json_rows('form145',columns,function(results)
            {	
                results.forEach(function(result)
                {
                    var class_string="";
                    if(result.status=='received' || result.status=='cancelled')
                    {
                        class_string="class='active'";					
                    }
                    else if(result.applicable_from!="" && (result.applicable_from<get_my_time()))
                    {
                        class_string="class='warning'";
                    }
                        var rowsHTML="<tr "+class_string+">";
                            rowsHTML+="<form id='form145_"+result.id+"'></form>";
                                rowsHTML+="<td data-th='Item'>";
                                    rowsHTML+="<a onclick=\"show_object('product_master','"+result.item_name+"');\"><textarea readonly='readonly' form='form145_"+result.id+"'>"+result.item_name+"</textarea></a>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Batch'>";
                                    rowsHTML+="<input type='text' readonly='readonly' form='form145_"+result.id+"' value='"+result.batch+"'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Quantity'>";
                                    rowsHTML+="<input type='number' readonly='readonly' form='form145_"+result.id+"' value='"+result.quantity+"'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Store'>";
                                    rowsHTML+="<input type='text' placeholder='Source' class='floatlabel' readonly='readonly' form='form145_"+result.id+"' value='"+result.source+"'>";
                                    rowsHTML+="<input type='text' placeholder='Target' class='floatlabel' readonly='readonly' form='form145_"+result.id+"' value='"+result.target+"'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Status'>";
                                    rowsHTML+="<input type='text' class='floatlabel' placeholder='Status' readonly='readonly' form='form145_"+result.id+"' value='"+result.status+"'>";
                                    rowsHTML+="<input type='text' class='floatlabel' placeholder='Scheduled for' readonly='readonly' form='form145_"+result.id+"' value='"+get_my_datetime(result.applicable_from)+"'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Action'>";
                                    rowsHTML+="<input type='hidden' form='form145_"+result.id+"' value='"+result.id+"'>";
                                    if(result.status!='received' && result.status!='cancelled')									
                                        rowsHTML+="<button type='button' class='btn red' form='form145_"+result.id+"' onclick='form145_cancel_item($(this));' name='cancel'>Cancel</button>";
                                    if(result.status=='pending')									
                                        rowsHTML+="<button type='button' class='btn green' form='form145_"+result.id+"' onclick='form145_dispatch_item($(this));' name='dispatch'>Dispatch</button>";
                                    if(result.status=='dispatched')
                                        rowsHTML+="<button type='button' class='btn yellow' form='form145_"+result.id+"' name='receive' onclick='form145_receive_item($(this));'>Receive</button>";
                                rowsHTML+="</td>";											
                    rowsHTML+="</tr>";

                    $('#form145_body').append(rowsHTML);
                });

                $('#form145').formcontrol();
                paginator.update_index(results.length);
                initialize_tabular_report_buttons(columns,'Store Movement','form145',function (item){});
                hide_loader();
            });
        }

        function form145_add_item()
        {
            if(is_create_access('form145'))
            {
                var id=get_new_key();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form145_"+id+"' autocomplete='off'></form>";
                    rowsHTML+="<td data-th='Item'>";
                        rowsHTML+="<input type='text' required form='form145_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Batch'>";
                        rowsHTML+="<input type='text' required form='form145_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Quantity'>";
                        rowsHTML+="<input type='number' required form='form145_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Store'>";
                        rowsHTML+="<input type='text' class='floatlabel' placeholder='Source' required form='form145_"+id+"'>";
                        rowsHTML+="<input type='text' class='floatlabel' placeholder='Target' required form='form145_"+id+"'>";				
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Status'>";
                        rowsHTML+="<input type='text' readonly='readonly' class='floatlabel' placeholder='Status' required form='form145_"+id+"' value='pending'>";
                        rowsHTML+="<input type='text' class='floatlabel' placeholder='Scheduled @' form='form145_"+id+"'>";				
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form145_"+id+"' value='"+id+"'>";
                        rowsHTML+="<input type='hidden' form='form145_"+id+"' required name='receiver'>";
                        rowsHTML+="<button type='submit' class='btn green' name='save' form='form145_"+id+"'><i class='fa fa-save'></i></button>";
                        rowsHTML+="<button type='button' class='btn red' name='delete' form='form145_"+id+"' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
                    rowsHTML+="</td>";			
                rowsHTML+="</tr>";

                $('#form145_body').prepend(rowsHTML);
                var fields=document.getElementById("form145_"+id);
                var product_filter=fields.elements[0];
                var batch_filter=fields.elements[1];
                var quantity_filter=fields.elements[2];
                var source_filter=fields.elements[3];
                var target_filter=fields.elements[4];
                var status_filter=fields.elements[5];
                var schedule_filter=fields.elements[6];
                var receiver_filter=fields.elements[8];
                var save_button=fields.elements[9];
                
                $(schedule_filter).vdatetimepicker();

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    var receiver_data={data_store:'store_areas',return_column:'owner',
                                      indexes:[{index:'name',exact:target_filter.value}]};
                    set_my_value_json(receiver_data,receiver_filter,function()
                    {
                       form145_create_item(fields); 
                    });
                });

                var product_data={data_store:'product_master',return_column:'name'};
                set_my_value_list_json(product_data,product_filter,function () 
                {
                    $(product_filter).focus();
                });

                $(product_filter).on('blur',function(event)
                {
                    var batch_data={data_store:'product_instances',return_column:'batch',
                                   indexes:[{index:'product_name',exact:product_filter.value}]};
                    set_my_value_list_json(batch_data,batch_filter);
                });		

                var source_data={data_store:'store_areas',return_column:'name',
                                indexes:[{index:'owner',value:get_account_name()}]};
                set_my_value_list_json(source_data,source_filter);

                $(source_filter).on('blur',function () 
                {
                    get_store_inventory(source_filter.value,product_filter.value,batch_filter.value,function(inventory)
                    {
                        $(quantity_filter).attr('max',inventory);
                    });
                });

                var target_data={data_store:'store_areas',return_column:'name'};
                set_my_value_list_json(target_data,target_filter);

                set_static_value_list_json('store_movement','status',status_filter);
                $('#form145').formcontrol();

            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form145_create_item(form)
        {
            if(is_create_access('form145'))
            {
                var product_name=form.elements[0].value;
                var batch=form.elements[1].value;
                var quantity=form.elements[2].value;
                var source=form.elements[3].value;
                var target=form.elements[4].value;
                var status=form.elements[5].value;
                var schedule=get_raw_time(form.elements[6].value);
                var data_id=form.elements[7].value;
                var receiver=form.elements[8].value;
                var save_button=form.elements['save'];
                var del_button=form.elements['delete'];
                
                var last_updated=get_my_time();
                var data_json={data_store:'store_movement',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'item_name',value:product_name},
	 					{index:'batch',value:batch},
	 					{index:'quantity',value:quantity},
	 					{index:'source',value:source},
	 					{index:'target',value:target},
	 					{index:'status',value:status},
	 					{index:'dispatcher',value:get_account_name()},
	 					{index:'receiver',value:receiver},
	 					{index:'applicable_from',value:schedule},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'New',notes:'Store movement initiated for item '+product_name+' from storage '+source,link_to:'form145'}};
 				
                create_json(data_json);
                $(form).readonly();
                
                $(save_button).hide();
                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form145_delete_item(del_button);
                });

                ///////////adding store placement////////
                var storage_data={data_store:'area_utilization',return_column:'id',
                                 indexes:[{index:'name',exact:target},{index:'item_name',exact:product_name},{index:'batch',exact:batch}]};
                read_json_count(storage_data,function(placements)
                {
                    if(placements==0 && target!="")
                    {
                        var storage_json={data_store:'area_utilization',
                            data:[{index:'id',value:get_new_key()},
	 					         {index:'item_name',value:product_name},
	 					         {index:'batch',value:batch},
	 					         {index:'name',value:target},
	 					         {index:'last_updated',value:get_my_time()}]}; 				
                        create_json(storage_json);
                    }
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form145_delete_item(button)
        {
            if(is_delete_access('form145'))
            {	
                modal115_action(function()
                {	
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var data_id=form.elements[7].value;
                    var data_json={data_store:'store_movement',
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

        function form145_dispatch_item(button)
        {
            if(is_update_access('form145'))
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var product_name=form.elements[0].value;
                var source=form.elements[3].value;
                form.elements[5].value='dispatched';

                var data_id=form.elements[7].value;
                var last_updated=get_my_time();
                var data_json={data_store:'store_movement',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:'dispatched'},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Dispatched',notes:'Product '+product_name+' from storage '+source,link_to:'form145'}};
 				
                update_json(data_json);
                $(form).readonly();                
                $(button).hide();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        /**
         * @form Store Movement
         * @param button
         */
        function form145_receive_item(button)
        {
            if(is_update_access('form145'))
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var product_name=form.elements[0].value;
                var target=form.elements[4].value;
                form.elements[5].value='received';

                var data_id=form.elements[7].value;
                var last_updated=get_my_time();
                var data_json={data_store:'store_movement',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:'received'},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Received',notes:'Product '+product_name+' at storage '+target,link_to:'form145'}};
 				
                update_json(data_json);

                $(form).readonly();
                $(button).hide();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        /**
         * @form Store Movement
         * @param button
         */
        function form145_cancel_item(button)
        {
            if(is_update_access('form145'))
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var product_name=form.elements[0].value;
                var source=form.elements[3].value;
                form.elements[5].value='cancelled';

                var data_id=form.elements[7].value;
                var last_updated=get_my_time();
                var data_json={data_store:'store_movement',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:'cancelled'},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Cancelled',notes:'Movement of Product '+product_name+' from storage '+source,link_to:'form145'}};
 				
                update_json(data_json);

                $(form).readonly();
                $(button).hide();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form145_import_template()
        {
            var data_array=['id','item_name','batch','quantity','source','target',
                            'status','dispatcher','receiver','schedule'];
            my_array_to_csv(data_array);
        };

        function form145_import_validate(data_array)
        {
            var validate_template_array=[{column:'item_name',required:'yes'},
                                    {column:'batch',requried:'yes',regex:new RegExp('^[0-9a-zA-Z_.,@\'()-]+$')},
                                    {column:'quantity',required:'yes',regex:new RegExp('^[0-9.]+$')},
                                    {column:'source',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.,@\'()-]+$')},
                                    {column:'target',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.,@\'()-]+$')},
                                    {column:'status',required:'yes',list:['received','dispatched','cancelled','pending']}];

            var error_array=validate_import_array(data_array,validate_template_array);
            return error_array;					
        }

        function form145_import(data_array,import_type)
        {
            var data_json={data_store:'store_movement',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Scheduled movement of items from storage',link_to:'form145'}};

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
	 					{index:'quantity',value:row.quantity},
	 					{index:'item_name',value:row.item_name},
	 					{index:'batch',value:row.batch},
                        {index:'source',value:row.source},
                        {index:'target',value:row.target},
                        {index:'status',value:row.status},
                        {index:'dispatcher',value:row.dispatcher},
                        {index:'receiver',value:row.receiver},
	 					{index:'applicable_from',value:row.schedule},
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