<div id='form330' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<div class='btn-group' id='form330_store' data-toggle='buttons' data-value='my'>
                <label class='btn green-jungle my active' onclick=form330_ini('my');><input name='my' type='radio' class='toggle'>My Store</label>
                <label class='btn green-jungle all' onclick=form330_ini('all');><input type='radio' name='all' class='toggle'>All Stores</label>
            </div>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form330_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form330_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form330_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form330_header'></form>
						<th><input type='text' placeholder="Item" class='floatlabel' name='name' form='form330_header'></th>
						<th><input type='text' placeholder="Manufacturing" readonly='readonly' form='form330_header'></th>
						<th><input type='text' placeholder="Sale Price" readonly='readonly' form='form330_header'></th>
                        <th><input type='text' placeholder="Quantity" readonly='readonly' form='form330_header'></th>
						<th><input type='submit' form='form330_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form330_body'>
			</tbody>
		</table>
	</div>

    <script>

        function form330_header_ini()
        {
            var filter_fields=document.getElementById('form330_header');
            var names_filter=filter_fields.elements['name'];

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form330_ini();
            });

            var item_data={data_store:'attributes',return_column:'name',
                          indexes:[{index:'type',exact:'product'},
                                  {index:'value',exact:'no'},
                                  {index:'attribute',exact:'Batch Applicable'}]};

            set_my_filter_json(item_data,names_filter);
        };

        function form330_ini(store_type)
        {
            show_loader();
            var fid=$("#form330_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form330_body').html('');

            var store=get_session_var('user_setting_Store');
            if(typeof store_type!='undefined' && store_type=='all')
            {
                store='';
				$('#form330_store').data('value','all');
			  	$('#form330_store').find('label.all').addClass('active');
                $('#form330_store').find('label.my').removeClass('active');
            }
            else
            {
				$('#form330_store').data('value','my');
                $('#form330_store').find('label.my').addClass('active');
                $('#form330_store').find('label.all').removeClass('active');
            }

            var filter_fields=document.getElementById('form330_header');
            var fname=filter_fields.elements['name'].value;
            var paginator=$('#form330_body').paginator({func:"form330_ini($('#form330_store').data('value'))"});

            var item_columns={data_store:'attributes',return_column:'name',
                              count:paginator.page_size(),
                              start_index:paginator.get_index(),
                             indexes:[{index:'name',value:fname},
                                     {index:'type',exact:'product'},
                                     {index:'value',value:'no'},
                                     {index:'attribute',value:'Batch Applicable'}]};

            read_json_single_column(item_columns,function (items)
            {
                var columns={data_store:'product_instances',
					       count:paginator.page_size(),
					       start_index:paginator.get_index(),
                           indexes:[{index:'id',value:fid},
                                    {index:'product_name',array:items},
                                    {index:'manufacture_date'},
                                    {index:'sale_price'}]};
                read_json_rows('form330',columns,function(results)
                {
                    results.forEach(function(result)
                    {
                        var rowsHTML="<tr>";
                            rowsHTML+="<form id='form330_"+result.id+"'></form>";
                                rowsHTML+="<td data-th='Item'>";
                                    rowsHTML+="<a onclick=\"show_object('product_master','"+result.product_name+"');\"><textarea readonly='readonly' form='form330_"+result.id+"'>"+result.product_name+"</textarea></a>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Manufacturing'>";
                                    rowsHTML+="<input type='text' class='dblclick_editable' readonly='readonly' form='form330_"+result.id+"' value='"+get_my_past_date(result.manufacture_date)+"'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Sale Price'>";
                                    rowsHTML+="<input type='number' step='any' readonly='readonly' class='dblclick_editable' form='form330_"+result.id+"' value='"+result.sale_price+"'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Quantity'>";
                                    rowsHTML+="<input type='number' step='any' readonly='readonly' form='form330_"+result.id+"' class='dblclick_editable'>";
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Action'>";
                                    rowsHTML+="<input type='hidden' form='form330_"+result.id+"' value='"+result.id+"'>";
                                    rowsHTML+="<input type='hidden' form='form330_"+result.id+"' name='second'>";
                                    rowsHTML+="<input type='hidden' form='form330_"+result.id+"' name='old_price' value='"+result.sale_price+"'>";
                                    rowsHTML+="<button type='submit' class='btn green' name='save' title='Save' form='form330_"+result.id+"'><i class='fa fa-save'></i></button>";
                                rowsHTML+="</td>";
                        rowsHTML+="</tr>";

                        $('#form330_body').append(rowsHTML);
                        var fields=document.getElementById("form330_"+result.id);
                        var manufacturing=fields.elements[1];
                        var sale_price=fields.elements[2];
                        var sys_inventory=fields.elements[3];
                        var second_inventory=fields.elements['second'];

                        $(manufacturing).datepicker();

                        if(store=='')
                        {
                            get_inventory(result.product_name,'',function(inventory)
                            {
                                sys_inventory.value=inventory;
                                second_inventory.value=inventory;
                            });
                        }
                        else
                        {
                            get_store_inventory(store,result.product_name,'',function(inventory)
                            {
                                sys_inventory.value=inventory;
                                second_inventory.value=inventory;
                            });
                            var sale_price_data={data_store:'sale_prices',return_column:'sale_price',
                                                indexes:[{index:'product_name',exact:result.product_name}]};
                            set_my_value_json(sale_price_data,sale_price);
                        }
                        $(fields).on('submit',function(e)
                        {
                            e.preventDefault();
                            form330_update_item(fields);
                        });
                    });

                    $('#form330').formcontrol();
				    paginator.update_index(results.length);
					vExport.export_buttons({action:'dynamic',columns:columns,file:'Inventory (without batch)',report_id:'form330',feach:function (item)
				    {
                        total_export_requests+=1;
                        if(store=='')
                        {
                            get_inventory(item.product_name,'',function(inventory)
                            {
                                item['Quantity']=inventory;
                                total_export_requests-=1;
                            });
                        }
                        else
                        {
                            get_store_inventory(store,item.product_name,'',function(inventory)
                            {
                                item['Quantity']=inventory;
                                total_export_requests-=1;
                            });
                        }
                        item['Manufacture Date']=get_my_past_date(item.manufacture_date);
                        item['Sale Price']=item.sale_price;

                        delete item.manufacture_date;
                        delete item.sale_price;
                    }});
                    hide_loader();
                });
            });
        };

        function form330_update_item(form)
        {
            if(is_update_access('form330'))
            {
                var name=form.elements[0].value;
                var date=get_raw_time(form.elements[1].value);
                var sale=form.elements[2].value;
                var quantity=form.elements[3].value;
                var old_quantity=form.elements['second'].value;
                var old_price=form.elements['old_price'].value;
                var storage=get_session_var('user_setting_Store');
                var data_id=form.elements[4].value;
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
                                         {index:'item_name',exact:item_name}]};
                    read_json_single_column(storage_data,function(placements)
                    {
                        if(placements.length==0)
                        {
                            var adjust_json={data_store:'area_utilization',
                            data:[{index:'id',value:vUtil.newKey()},
                                 {index:'item_name',value:name},
                                 {index:'batch',value:name},
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
    </script>
</div>
