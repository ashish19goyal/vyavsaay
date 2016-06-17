<div id='form256' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form256_add_item();'>Add <i class='fa fa-plus'></i></a>
        	<a class='btn btn-circle grey btn-outline btn-sm' onclick='form256_ini();'>Refresh <i class='fa fa-refresh'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form256_save'><i class='fa fa-save'></i> Save</a>
      </div>
	</div>

	<div class="portlet-body">
        <form id='form256_master' autocomplete="off">
            <fieldset>
                <label><input type='text' required name='item_name' class='floatlabel' placeholder='Item'></label>
                <label><input type='text' required name='batch' class='floatlabel' placeholder='Batch'></label>
                <label><input type='text' name='brand' class='floatlabel' readonly='readonly' placeholder='Brand'></label>
                <label><a><input type='text' name='pplan' class='floatlabel' readonly='readonly' placeholder='Production PLan'></a></label>
                <label><input type='number' name='quantity' readonly="readonly" class='floatlabel' placeholder='Quantity'></label>
				<input type='hidden' name='plan_id'>
                <input type='hidden' name='id'>
                <input type='submit' class='submit_hidden'>
            </fieldset>
        </form>

        <br>

        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr style='color:#9a9a9a;'>
                    <th>Item</th>
					<th>Batch</th>
					<th>Quantity</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form256_body'>
			</tbody>
        </table>
    </div>

    <script>
    function form256_header_ini()
    {
        var fields=document.getElementById('form256_master');

        var item_filter=fields.elements['item_name'];
        var batch_filter=fields.elements['batch'];
        var quantity_filter=fields.elements['quantity'];
        var brand_filter=fields.elements['brand'];
        var plan_filter=fields.elements['pplan'];
        var id_filter=fields.elements['id'];
		var plan_id_filter=fields.elements['plan_id'];
        var save_button=document.getElementById('form256_save');

        $(plan_filter).parent().off('click');

        $(save_button).off('click');
        $(save_button).on("click", function(event)
        {
            event.preventDefault();
            form256_update_form();
        });

        $(document).off('keydown');
        $(document).on('keydown', function(event) {
            if( event.keyCode == 83 && event.ctrlKey) {
                event.preventDefault();
                $(save_button).trigger('click');
            }
        });

        $(fields).off('submit');
        $(fields).on("submit", function(event)
        {
            event.preventDefault();
            form256_ini();
        });

        var item_data={data_store:'attributes',return_column:'name',
                      indexes:[{index:'type',exact:'product'},
                              {index:'value',exact:'yes'},
                              {index:'attribute',exact:'manufactured'}]};
        set_my_value_list_json(item_data,item_filter,function ()
        {
            $(item_filter).focus();
        });

        vUtil.onChange(item_filter,function()
        {
            var batch_data={data_store:'product_instances',return_column:'batch',
                            indexes:[{index:'product_name',exact:item_filter.value}]};
            set_my_filter_json(batch_data,batch_filter,function ()
            {
                $(batch_filter).focus();
            });
        });

        item_filter.value='';
        batch_filter.value="";
        quantity_filter.value="";
        brand_filter.value="";
        plan_filter.value="";
        id_filter.value="";
		plan_id_filter.value="";

        $('#form256_body').html("");
        $('#form256').formcontrol();
    }

    function form256_ini()
    {
        var fid=$("#form256_link").attr('data_id');
        if(fid==null)
            fid="";

        $('#form256_body').html('');

        var master_fields=document.getElementById('form256_master');
        var master_name=master_fields.elements['item_name'].value;
        var batch=master_fields.elements['batch'].value;

        if(fid!="" || master_name!="")
        {
            show_loader();

			var items_column={data_store:'batch_raw_material',
						   indexes:[{index:'id'},
								   {index:'item',exact:master_name},
								   {index:'batch',exact:batch},
								   {index:'quantity'},
								   {index:'ritem'},
								   {index:'rbatch'},
								   {index:'rquantity'},
								   {index:'production_id'},
							   		{index:'production_plan'},
									{index:'production_plan_id'}]};

            read_json_rows('form256',items_column,function(bag_results)
            {
                if(bag_results.length>0)
                {
                    master_fields.elements['id'].value=bag_results[0].id;
                    master_fields.elements['quantity'].value=bag_results[0].quantity;
					master_fields.elements['plan_id'].value=bag_results[0].production_plan_id;
                    var pp_filter=master_fields.elements['pplan'];
					pp_filter.value=bag_results[0].production_plan;

                    $(pp_filter).parent().off('click');
                    $(pp_filter).parent().on('click',function()
                    {
                        element_display(bag_results[0].production_plan_id,'form186');
                    });

                    bag_results.forEach(function(result)
                    {
                        var id=result.id;
                        var rowsHTML="<tr>";
                        rowsHTML+="<form id='form256_"+id+"'></form>";
                            rowsHTML+="<td data-th='Item'>";
                                rowsHTML+="<a onclick=\"show_object('product_master','"+result.ritem+"');\"><input type='text' readonly='readonly' form='form256_"+id+"' value='"+result.ritem+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Batch'>";
                                rowsHTML+="<a><input type='text' readonly='readonly' form='form256_"+id+"' value='"+result.rbatch+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Quantity'>";
                                rowsHTML+="<input type='number' step='any' class='dblclick_editable' readonly='readonly' form='form256_"+id+"' value='"+result.rquantity+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form256_"+id+"' value='"+id+"'>";
                                rowsHTML+="<button type='submit' class='btn green' form='form256_"+id+"' id='save_form256_"+id+"' name='save' title='Update'><i class='fa fa-save'></i></button>";
                                rowsHTML+="<button type='button' class='btn red' form='form256_"+id+"' id='delete_form256_"+id+"' onclick='form256_delete_item($(this));' name='delete' title='Delete'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
                        rowsHTML+="</tr>";

                        $('#form256_body').append(rowsHTML);
                        var form256=document.getElementById('form256_'+id);
                        var batch=form256.elements[1];
                        var batch_object={product:result.ritem,batch:result.rbatch};
                        $(batch).parent().on('click',function()
                        {
                            show_object('product_instances',batch_object);
                        });

                        $(form256).on('submit',function(e)
                        {
                            e.preventDefault();
                            form256_update_item(form256);
                        });
                    });
                }
				$('#form256').formcontrol();
                hide_loader();
            });
        }
    }

    function form256_add_item()
    {
        if(is_create_access('form256'))
        {
            var id=get_new_key();
            var rowsHTML="<tr>";
            rowsHTML+="<form id='form256_"+id+"' autocomplete='off'></form>";
                rowsHTML+="<td data-th='Item'>";
                    rowsHTML+="<input type='text' form='form256_"+id+"' required value=''>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Batch'>";
                    rowsHTML+="<input type='text' required form='form256_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Quantity'>";
                    rowsHTML+="<input type='number' class='dblclick_editable' required step='any' form='form256_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Action'>";
                    rowsHTML+="<input type='hidden' form='form256_"+id+"' value='"+id+"'>";
                    rowsHTML+="<button type='submit' id='save_form256_"+id+"' class='btn green' name='save' title='Save' form='form256_"+id+"'><i class='fa fa-save'></i></button>";
                    rowsHTML+="<button type='button' class='btn red' name='delete' title='Delete' form='form256_"+id+"' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
                rowsHTML+="</td>";
            rowsHTML+="</tr>";

            $('#form256_body').prepend(rowsHTML);

            var fields=document.getElementById("form256_"+id);
            var item_filter=fields.elements[0];
            var batch_filter=fields.elements[1];

            $(fields).on("submit", function(event)
            {
                event.preventDefault();
                form256_create_item(fields);
            });

            var item_data={data_store:'attributes',return_column:'name',
                          indexes:[{index:'type',exact:'product'},
                                  {index:'value',exact:'yes'},
                                  {index:'attribute',exact:'raw material'}]};
            set_my_value_list_json(item_data,item_filter,function ()
            {
                $(item_filter).focus();
            });

            $(item_filter).on('blur',function ()
            {
                var batch_data={data_store:'product_instances',return_column:'batch',
                                indexes:[{index:'product_name',exact:item_filter.value}]};
                set_my_value_list_json(batch_data,batch_filter);
            });
            $('#form256').formcontrol();
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form256_create_item(form)
    {
        if(is_create_access('form256'))
        {
			var master_form=document.getElementById('form256_master');
            var production_id=master_form.elements['id'].value;
			var production_plan=master_form.elements['pplan'].value;
			var production_plan_id=master_form.elements['plan_id'].value;
			var item=master_form.elements['item_name'].value;
			var batch=master_form.elements['batch'].value;
			var quantity=master_form.elements['quantity'].value;
            var ritem=form.elements[0].value;
            var rbatch=form.elements[1].value;
            var rquantity=form.elements[2].value;
            var data_id=form.elements[3].value;
            var last_updated=get_my_time();
            var del_button=form.elements['delete'];
            var storage=get_session_var('production_floor_store');

            var data_json={data_store:'batch_raw_material',
	 				data:[{index:'id',value:data_id},
	 					{index:'production_id',value:production_id},
						{index:'production_plan',value:production_plan},
						{index:'production_plan_id',value:production_plan_id},
						{index:'item',value:item},
	 					{index:'batch',value:batch},
                        {index:'quantity',value:quantity},
                        {index:'ritem',value:ritem},
	 					{index:'rbatch',value:rbatch},
                        {index:'rquantity',value:rquantity},
                        {index:'last_updated',value:last_updated}]};
 			var item_subtracted_json={data_store:'inventory_adjust',
	 				data:[{index:'id',value:data_id},
	 					{index:'product_name',value:ritem},
	 					{index:'batch',value:rbatch},
                        {index:'quantity',value:-(rquantity)},
                        {index:'source',value:'manufacturing'},
                        {index:'source_id',value:production_id},
                        {index:'storage',value:storage},
                        {index:'last_updated',value:last_updated}]};

            create_json(item_subtracted_json);
            create_json(data_json);

            $(form).readonly();

            del_button.removeAttribute("onclick");
            $(del_button).on('click',function(event)
            {
                form256_delete_item(del_button);
            });

            $(form).off('submit');
            $(form).on('submit',function(e)
            {
                e.preventDefault();
                form256_update_item(form);
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form256_update_item(form)
    {
        if(is_update_access('form256'))
        {
            var production_id=document.getElementById('form256_master').elements['id'].value;
            var item=form.elements[0].value;
            var batch=form.elements[1].value;
            var quantity=form.elements[2].value;
            var data_id=form.elements[3].value;
            var last_updated=get_my_time();
            var storage=get_session_var('production_floor_store');

            var data_json={data_store:'batch_raw_material',
	 				data:[{index:'id',value:data_id},
	 					{index:'rquantity',value:quantity},
                        {index:'last_updated',value:last_updated}]};

 			var item_update={data_store:'inventory_adjust',
                    data:[{index:'id',value:data_id},
	 					{index:'quantity',value:-(rquantity)},
                        {index:'last_updated',value:last_updated}]};

            update_json(item_update);
            update_json(data_json);

            $(form).readonly();
        }
        else
        {
            $("#modal2_link").click();
        }
    }


    function form256_update_form()
    {
        if(is_update_access('form256'))
        {
            $("[id^='save_form256_']").click();
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form256_delete_item(button)
    {
        if(is_delete_access('form256'))
        {
            modal115_action(function()
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);
                var item=form.elements[0].value;
                var data_id=form.elements[3].value;

                var data_json={data_store:'batch_raw_material',
	 				data:[{index:'id',value:data_id}]};
                delete_json(data_json);

                var inventory_json={data_store:'inventory_adjust',
	 				data:[{index:'id',value:data_id}]};
	 		    delete_json(inventory_json);

                $(button).parent().parent().remove();
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    </script>
</div>
