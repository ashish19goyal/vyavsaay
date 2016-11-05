<div id='form334' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<div class='btn-group' id='form334_store' data-toggle='buttons'>
                <label class='btn green-jungle my active' onclick=form334_ini('my');><input name='my' type='radio' class='toggle'>My Store</label>
                <label class='btn green-jungle all' onclick=form334_ini('all');><input type='radio' name='all' class='toggle'>All Stores</label>
            </div>
            <a class='btn btn-circle grey btn-outline btn-sm' onclick='form334_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form334_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form334_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form334_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form334_header'></form>
						<th><input type='text' placeholder="Item" class='floatlabel' name='name' form='form334_header'></th>
						<th><input type='text' placeholder="Batch" class='floatlabel' name='batch' form='form334_header'></th>
						<th><input type='text' placeholder="Quantity" readonly='readonly' form='form334_header'></th>
                        <th><input type='text' placeholder="Date" readonly='readonly' form='form334_header'></th>
						<th><input type='submit' form='form334_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form334_body'>
			</tbody>
		</table>
	</div>

    <script>
        function form334_header_ini()
        {
            var filter_fields=document.getElementById('form334_header');
            var names_filter=filter_fields.elements['name'];
            var batches_filter=filter_fields.elements['batch'];

            //setting autocompletes
            var products_data={data_store:'product_master',return_column:'name'};
            var batch_data={data_store:'product_instances',return_column:'batch'};

            set_my_filter_json(products_data,names_filter);
            set_my_filter_json(batch_data,batches_filter);

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form334_ini();
            });
        };

        function form334_ini(store_type)
        {
            show_loader();
            var fid=$("#form334_link").attr('data_id');
            if(fid==null)
                fid="";

            var store=get_session_var('user_setting_Store');
            if(typeof store_type!='undefined' && store_type=='all')
            {
                store='';
                $('#form334_store').find('label.all').addClass('active');
                $('#form334_store').find('label.my').removeClass('active');
            }
            else
            {
                $('#form334_store').find('label.my').addClass('active');
                $('#form334_store').find('label.all').removeClass('active');
            }

            var filter_fields=document.getElementById('form334_header');
            var fname=filter_fields.elements['name'].value;
            var fbatch=filter_fields.elements['batch'].value;

            var paginator=$('#form334_body').paginator();
			var columns={data_store:'discarded',
					       count:paginator.page_size(),
					       start_index:paginator.get_index(),
                           indexes:[{index:'id',value:fid},
                                    {index:'product_name',value:fname},
                                    {index:'batch',value:fbatch},
                                    {index:'quantity'},
                                    {index:'date'},
                                    {index:'storage',value:store}]};

            $('#form334_body').html("");

            read_json_rows('form334',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form334_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Item'>";
                                rowsHTML+="<a onclick=\"show_object('product_master','"+result.product_name+"');\"><textarea readonly='readonly' form='form334_"+result.id+"'>"+result.product_name+"</textarea></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Batch'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form334_"+result.id+"' value='"+result.batch+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Quantity'>";
                                rowsHTML+="<input type='number' step='any' readonly='readonly' form='form334_"+result.id+"' value='"+result.quantity+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Date'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form334_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form334_"+result.id+"' value='"+result.id+"'>";
                                rowsHTML+="<button type='button' class='btn red' title='Delete' name='delete' form='form334_"+result.id+"' onclick='form335_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form334_body').append(rowsHTML);
                });

                $('#form334').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:columns,file:'Discarded Inventory',report_id:'form334',feach:function (item)
				{
                    item.date=get_my_past_date(item.date);
                }});

                hide_loader();
            });
        };

        function form334_add_item()
        {
            if(is_create_access('form334'))
			{
                var store=get_session_var('user_setting_Store');
                var id=vUtil.newKey();
                var rowsHTML="<tr>";
                    rowsHTML+="<form id='form334_"+id+"'></form>";
                        rowsHTML+="<td data-th='Item'>";
                            rowsHTML+="<input type='text' form='form334_"+id+"' required>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Batch'>";
                            rowsHTML+="<input type='text' required form='form334_"+id+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Quantity'>";
                            rowsHTML+="<input type='number' step='any' form='form334_"+id+"' required>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Date'>";
                            rowsHTML+="<input type='text' form='form334_"+id+"' value='"+vTime.date()+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' form='form334_"+id+"' value='"+id+"'>";
                            rowsHTML+="<button type='submit' class='btn green' name='save' title='Save' form='form334_"+id+"'><i class='fa fa-save'></i></button>";
                            rowsHTML+="<button type='button' class='btn red' title='Delete' name='delete' form='form334_"+id+"' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
                        rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form334_body').prepend(rowsHTML);

                var fields=document.getElementById("form334_"+id);
                var name_filter=fields.elements[0];
                var batch_filter=fields.elements[1];
                var date_filter=fields.elements[3];

                $(date_filter).datepicker();

                var product_data={data_store:'product_master',return_column:'name'};
                set_my_value_list_json(product_data,name_filter,function()
                {
                    $(name_filter).focus();
                });

                $(name_filter).on('blur',function()
                {
                    var batch_data={data_store:'product_instances',return_column:'batch',
                                   indexes:[{index:'product_name',exact:name_filter.value}]};
                    set_my_value_list_json(batch_data,batch_filter);
                });

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form334_create_item(fields);
                });

                $('#form334').formcontrol();
            }
			else
			{
				$("#modal2_link").click();
			}
        };

        function form334_create_item(form)
        {
            if(is_update_access('form334'))
            {
                var item_name=form.elements[0].value;
                var batch=form.elements[1].value;
                var quantity=form.elements[2].value;
                var date=get_raw_time(form.elements[3].value);
                var data_id=form.elements[4].value;
                var storage=get_session_var('user_setting_Store');
                var last_updated=get_my_time();

                var data_json={data_store:'discarded',
                        data:[{index:'id',value:data_id},
                             {index:'product_name',value:item_name},
                             {index:'batch',value:batch},
                             {index:'quantity',value:quantity},
                             {index:'storage',value:storage},
                             {index:'date',value:last_updated},
                             {index:'last_updated',value:last_updated}],
                        log:'yes',
                        log_data:{title:'Discarded',notes:'Inventory for '+item_name,link_to:'form334'}};

                create_json(data_json);
                $(form).readonly();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form334_delete_item(button)
        {
            if(is_update_access('form334'))
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);
                var item_name=form.elements[0].value;
                var data_id=form.elements[4].value;
                var last_updated=get_my_time();

                var data_json={data_store:'discarded',
                        data:[{index:'id',value:data_id}],
                        log:'yes',
                        log_data:{title:'Re-accepted',notes:'Inventory for '+item_name,link_to:'form334'}};

                delete_json(data_json);
                $(button).parent().parent().remove();
            }
            else
            {
                $("#modal2_link").click();
            }
        }
    </script>
</div>
