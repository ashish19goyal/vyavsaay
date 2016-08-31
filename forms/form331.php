<div id='form331' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<div class='btn-group' id='form331_store' data-toggle='buttons'>
                <label class='btn green-jungle my active' onclick=form331_ini('my');><input name='my' type='radio' class='toggle'>My Store</label>
                <label class='btn green-jungle all' onclick=form331_ini('all');><input type='radio' name='all' class='toggle'>All Stores</label>
            </div>			
            <a class='btn btn-circle grey btn-outline btn-sm' onclick='modal204_action();'>Add Batch <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form331_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form331_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form331_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form331_upload' onclick=modal23_action(form331_import_template,form331_import,form331_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form331_header'></form>
						<th><input type='text' placeholder="Item" class='floatlabel' name='name' form='form331_header'></th>
						<th><input type='text' placeholder="Batch" class='floatlabel' name='batch' form='form331_header'></th>
						<th><input type='text' placeholder="Manufacturing" readonly='readonly' form='form331_header'></th>
						<th><input type='text' placeholder="Sale Price" readonly='readonly' form='form331_header'></th>
                        <th><input type='text' placeholder="Quantity" readonly='readonly' form='form331_header'></th>
						<th><input type='submit' form='form331_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form331_body'>
			</tbody>
		</table>
	</div>
        
    <script>

        function form331_header_ini()
        {
            var filter_fields=document.getElementById('form331_header');	
            var names_filter=filter_fields.elements['name'];
            var batch_filter=filter_fields.elements['batch'];
            
            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form331_ini();
            });

            var item_data={data_store:'attributes',return_column:'name',
                          indexes:[{index:'type',exact:'product'},
                                  {index:'value',exact:'yes'},
                                  {index:'attribute',exact:'Batch Applicable'}]};

            set_my_filter_json(item_data,names_filter);
            
            var batch_data={data_store:'product_instances',return_column:'batch'};
            set_my_filter_json(batch_data,batch_filter);
        };

        function form331_ini(store_type)
        {
            show_loader();
            var fid=$("#form331_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form331_body').html('');
            
            var store=get_session_var('user_setting_Store');
            if(typeof store_type!='undefined' && store_type=='all')
            {
                store='';
                $('#form331_store').find('label.all').addClass('active');
                $('#form331_store').find('label.my').removeClass('active');
            }
            else
            {
                $('#form331_store').find('label.my').addClass('active');
                $('#form331_store').find('label.all').removeClass('active');
            }

            var filter_fields=document.getElementById('form331_header');
            var fname=filter_fields.elements['name'].value;
            var fbatch=filter_fields.elements['batch'].value;
            
            var paginator=$('#form331_body').paginator();
			    
            var item_columns={data_store:'attributes',return_column:'name',
                             indexes:[{index:'name',value:fname},
                                     {index:'type',exact:'product'},
                                     {index:'value',value:'yes'},
                                     {index:'attribute',value:'Batch Applicable'}]};

            read_json_single_column(item_columns,function (items) 
            {
                var columns={data_store:'product_instances',                 
					       count:paginator.page_size(),
					       start_index:paginator.get_index(),
                           indexes:[{index:'id',value:fid},
                                    {index:'product_name',array:items},
                                    {index:'batch',value:fbatch},
                                    {index:'manufacture_date'},
                                    {index:'sale_price'}]};
                read_json_rows('form331',columns,function(results)
                {
                    results.forEach(function(result)
                    {
                        var rowsHTML="<tr>";
                            rowsHTML+="<form id='form331_"+result.id+"'></form>";
                                rowsHTML+="<td data-th='Item'>";
                                    rowsHTML+="<a onclick=\"show_object('product_master','"+result.product_name+"');\"><textarea readonly='readonly' form='form331_"+result.id+"'>"+result.product_name+"</textarea></a>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Batch'>";
                                    rowsHTML+="<input type='text' readonly='readonly' form='form331_"+result.id+"' value='"+result.batch+"'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Manufacturing'>";
                                    rowsHTML+="<input type='text' class='dblclick_editable' readonly='readonly' form='form331_"+result.id+"' value='"+get_my_past_date(result.manufacture_date)+"'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Sale Price'>";
                                    rowsHTML+="<input type='number' step='any' readonly='readonly' class='dblclick_editable' form='form331_"+result.id+"' value='"+result.sale_price+"'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Quantity'>";
                                    rowsHTML+="<input type='number' step='any' readonly='readonly' form='form331_"+result.id+"' class='dblclick_editable'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Action'>";
                                    rowsHTML+="<input type='hidden' form='form331_"+result.id+"' value='"+result.id+"'>";
                                    rowsHTML+="<input type='hidden' form='form331_"+result.id+"' name='second'>";
                                    rowsHTML+="<input type='hidden' form='form331_"+result.id+"' name='old_price' value='"+result.sale_price+"'>";
                                    rowsHTML+="<button type='submit' class='btn green' name='save' title='Save' form='form331_"+result.id+"'><i class='fa fa-save'></i></button>";
                                    rowsHTML+="<button type='submit' class='btn red' name='delete' title='Delete' form='form331_"+result.id+"' onclick='fsorm331_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                                rowsHTML+="</td>";			
                        rowsHTML+="</tr>";

                        $('#form331_body').append(rowsHTML);
                        var fields=document.getElementById("form331_"+result.id);
                        var manufacturing=fields.elements[2];
                        var sale_price=fields.elements[3];
                        var sys_inventory=fields.elements[4];
                        var second_inventory=fields.elements['second'];
                        
                        $(manufacturing).datepicker();
                        
                        if(store=='')
                        {
                            get_inventory(result.product_name,result.batch,function(inventory)
                            {
                                sys_inventory.value=inventory;
                                second_inventory.value=inventory;
                            });
                        }
                        else
                        {
                            get_store_inventory(store,result.product_name,result.batch,function(inventory)
                            {
                                sys_inventory.value=inventory;
                                second_inventory.value=inventory;
                            });
                            var sale_price_data={data_store:'sale_prices',return_column:'sale_price',
                                                indexes:[{index:'product_name',exact:result.product_name},
                                                        {index:'batch',exact:result.batch}]};
                            set_my_value_json(sale_price_data,sale_price);
                        }
                        $(fields).on('submit',function(e)
                        {
                            e.preventDefault();
                            form331_update_item(fields);
                        });
                    });

                    $('#form331').formcontrol();
				    paginator.update_index(results.length);
				    initialize_tabular_report_buttons(columns,'Inventory (without batch)','form331',function (item)
                    {
                        total_export_requests+=1;
                        if(store=='')
                        {
                            get_inventory(item.product_name,item.batch,function(inventory)
                            {
                                item.quantity=inventory;
                                total_export_requests-=1;
                            });
                        }
                        else
                        {
                            get_store_inventory(store,item.product_name,item.batch,function(inventory)
                            {
                                item.quantity=inventory;
                                total_export_requests-=1;
                            });
                        }
                        item['Manufacture Date']=get_my_past_date(item.manufacture_date);
                        item['Sale Price']=item.sale_price;
                        
                        delete item.manufacture_date;
                        delete item.sale_price;
                    });
                    hide_loader();
                });
            });
        };
        
        function form331_update_item(form)
        {
            if(is_update_access('form331'))
            {
                var name=form.elements[0].value;
                var batch=form.elements[1].value;
                var date=get_raw_time(form.elements[2].value);
                var sale=form.elements[3].value;
                var quantity=form.elements[4].value;
                var old_quantity=form.elements['second'].value;
                var old_price=form.elements['old_price'].value;
                var storage=get_session_var('user_setting_Store');
                var data_id=form.elements[5].value;
                var last_updated=get_my_time();

                var data_json={data_store:'product_instances',
                        data:[{index:'id',value:data_id},
                             {index:'manufacture_date',value:date},
                             {index:'sale_price',value:sale},
                             {index:'last_updated',value:last_updated}]};
                update_json(data_json);

                if(sale!=old_price)
                {
                    var sale_price_data={data_store:'sale_prices',return_column:'id',
                                        indexes:[{index:'product_name',exact:name},
                                                {index:'batch',exact:batch},
                                                {index:'billing_type',exact:get_session_var('user_setting_Store')}]};
                    read_json_single_column(sale_price_data,function(sale_prices)
                    {
                        if(sale_prices.length>0)
                        {
                            var price_json={data_store:'sale_prices',
                            data:[{index:'id',value:sale_prices[0]},
                                 {index:'sale_price',value:sale},
                                 {index:'last_updated',value:last_updated}]};
                            update_json(data_json);
                        }
                    });
                }
                
                if(parseFloat(quantity)!=parseFloat(old_quantity))
                {
                    var adjust_json={data_store:'inventory_adjust',
                        data:[{index:'id',value:vUtil.newKey()},
                             {index:'product_name',value:name},
                             {index:'batch',value:name}, 
                             {index:'storage',value:storage},
                             {index:'quantity',value:parseFloat(quantity)-parseFloat(old_quantity)},
                             {index:'last_updated',value:last_updated}]};
                    create_json(adjust_json);
                
                
                    var storage_data={data_store:'area_utilization',return_column:'id',
                                     indexes:[{index:'name',exact:storage},
                                             {index:'item_name',exact:item_name},
                                             {index:'batch',exact:batch}]};
                    read_json_single_column(storage_data,function(placements)
                    {
                        if(placements.length==0)
                        {
                            var adjust_json={data_store:'area_utilization',
                            data:[{index:'id',value:vUtil.newKey()},
                                 {index:'item_name',value:name},
                                 {index:'batch',value:batch}, 
                                 {index:'name',value:storage},
                                 {index:'last_updated',value:last_updated}]};
                            create_json(adjust_json);                        
                        }
                    });		
                }
                
                $(form).readonly();               
            }
            else
            {
                $("#modal2_link").click();
            }
        }
        
        function form331_delete_item(button)
        {
            if(is_delete_access('form331'))
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
 							log_data:{title:"Deleted",notes:"Batch number "+batch+" of "+name,link_to:"form331"}};

                    var other_json={data_store:'area_utilization',
 							data:[{index:'item_name',value:name},
                                 {index:'batch',value:batch}]};

                    var other2_json={data_store:'sale_prices',
 							data:[{index:'product_name',value:name},
                                 {index:'batch',value:batch}]};

                    delete_json(data_json);
                    delete_json(other_json);
                    delete_json(other2_json);

                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form331_import_template()
        {
            var data_array=['id','item','batch','manufacture date','mrp','sale price','quantity'];
            vUtil.arrayToCSV(data_array);
        };

        function form331_import_validate(data_array)
		{
			var validate_template_array=[{column:'item',required:'yes',regex:new RegExp('^[0-9a-zA-Z _,;:/\'()!@#$%-]+$')},
									{column:'batch',regex:new RegExp('^[0-9a-zA-Z _.,:/\'+@!$()-]+$')},
                                    {column:'manufacture date',required:'yes',regex:new RegExp('^[0-9/-]+$')},
                                    {column:'mrp',regex:new RegExp('^[0-9 .')},     
									{column:'sale price',regex:new RegExp('^[0-9 .')},
                                    {column:'quantity',regex:new RegExp('^[0-9 .')}];
							
			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;					
		}
		
        function form331_import(data_array,import_type)
        {
            var data_json={data_store:'product_instances',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Batches for items',link_to:'form331'}};

			var counter=1;
			var last_updated=get_my_time();
		    var storage=get_session_var('user_setting_Store');
			data_array.forEach(function(row)
			{
				counter+=1;
				if(import_type=='create_new')
				{
					row.id=last_updated+counter;
				}
				
				var data_json_array=[{index:'id',value:row.id},
	 					{index:'product_name',value:row.item},
	 					{index:'batch',value:row.batch},
	 					{index:'mrp',value:row.mrp},
	 					{index:'sale_price',value:row['sale price']},
                        {index:'manufacture_date',value:get_raw_time(row['manufacture date'])},             
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
                
                if(row.quantity!="")
                {
                    get_inventory(row.item,row.batch,function(quantity)
                    {
                        if(parseFloat(quantity)!==parseFloat(row.quantity))
                        {
                            var new_quantity=parseFloat(row.quantity)-parseFloat(quantity);
                            var adjust_json={data_store:'inventory_adjust',
                                             loader:'no',
                                             warning:'no',
 							                data:[{index:'product_name',value:row.item},
                                                    {index:'batch',value:row.batch},
                                                    {index:'quantity',value:new_quantity},
                                                    {index:'storage',value:storage},
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