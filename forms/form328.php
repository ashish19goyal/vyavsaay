<div id='form328' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form328_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form328_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form328_print' onclick=form328_print_form();><i class='fa fa-print'></i> Print</a>
        <a class='btn btn-default btn-sm' id='form328_share'><i class='fa fa-envelope'></i> Email</a>
      </div>
	</div>

	<div class="portlet-body">
        <form id='form328_master' autocomplete="off">
            <fieldset>
                <label><div class='btn-overlap'><input type='text' required name='customer' placeholder='Customer' class='floatlabel'><button type='button' title='Add new customer' class='btn btn-icon-only default right-overlap' id='form328_add_customer'><i class='fa fa-plus'></i></button></div></label>
                <label><input type='text' name='return_num' readonly='readonly' class='floatlabel' placeholder='Return #'></label>
                <label><input type='text' class='floatlabel' requried placeholder='Return Date' name='date'></label>
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
          			<th>Details</th>
					<th>Reason</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form328_body'>
			</tbody>
      <tfoot id='form328_foot'>
      </tfoot>
		</table>
    </div>

    <script>
        function form328_header_ini()
        {
            var fields=document.getElementById('form328_master');

            var customer_filter=fields.elements['customer'];
            var return_date=fields.elements['date'];
			var return_num_filter=fields.elements['return_num'];
            var id_filter=fields.elements['id'];
            id_filter.value=vUtil.newKey();
            var save_button=document.getElementById('form328_save');

			var return_id=$("#form19_link").attr('data_id');
            if(vUtil.isBlank(return_id))
            {
                var return_num_data={data_store:'user_preferences',return_column:'value',
                                 indexes:[{index:'name',exact:'sale_return_number'}]};
                read_json_single_column(return_num_data,function(return_nums)
                {
                    if(return_nums.length>0)
                    {
                        return_num_filter.value=get_session_var('sale_return_prefix')+"-"+return_nums[0];
                    }
                    else
                    {
                        return_num_filter.value="";
                    }
                });
            }

            $(save_button).off('click');
            $(save_button).on("click", function(event)
            {
                event.preventDefault();
                form328_create_form();
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
                form328_add_item();
            });

            var customers_data={data_store:'customers',return_column:'acc_name'};
            set_my_value_list_json(customers_data,customer_filter,function()
            {
                $(customer_filter).focus();
            });

            var add_customer=document.getElementById('form328_add_customer');
            $(add_customer).off('click');
            $(add_customer).on('click',function()
            {
                modal13_action(function()
                {
                    var customers_data={data_store:'customers',return_column:'acc_name'};
                    set_my_value_list_json(customers_data,customer_filter,function()
                    {
                        $(customer_filter).focus();
                    });
                });
            });

            $(return_date).datepicker();
            return_date.value=vTime.date();
            customer_filter.value='';

			$('#form328_body').paginator({visible:false});
            setTimeout(function(){$('#form328').formcontrol();},300);
        }

        function form328_ini()
        {
            var data_id=$("#form328_link").attr('data_id');
            if(data_id==null)
                data_id="";

            $('#form328_body').html("");
            $('#form328_foot').html("");

            if(data_id!="")
            {
                show_loader();
                var filter_fields=document.getElementById('form328_master');

                var return_columns={data_store:'customer_returns',count:1,
                                   indexes:[{index:'id',value:data_id},
                                           {index:'customer'},
                                           {index:'total'},
                                           {index:'tax'},
                                        	{index:'amount'},
											{index:'return_num'},
                                           {index:'return_date'}]};
                var return_items_column={data_store:'customer_return_items',
                                        indexes:[{index:'id'},
                                                {index:'return_id',exact:data_id},
                                                {index:'item_name'},
                                                {index:'batch'},
                                                {index:'storage'},
                                                {index:'exchange_storage'},
                                                {index:'notes'},
                                                {index:'quantity'},
                                                {index:'refund_amount'},
                                                {index:'tax'},
                                                {index:'saleable'},
                                                {index:'type'},
                                                {index:'exchange_batch'}]};

                read_json_rows('form328',return_columns,function(return_results)
                {
                    if(return_results.length>0)
                    {
						filter_fields.elements['return_num'].value=return_results[0].return_num;
						filter_fields.elements['customer'].value=return_results[0].customer;
                        filter_fields.elements['date'].value=get_my_past_date(return_results[0].return_date);
                        filter_fields.elements['id'].value=data_id;
                        var save_button=document.getElementById('form328_save');

                        $(save_button).off('click');
                        $(save_button).on("click", function(event)
                        {
                            event.preventDefault();
                            form328_update_form();
                        });

                        var total_row="<tr><td colspan='3' data-th='Total'>Amount<br>Tax<br>Total</td>" +
                                    "<td colspan='2'>Rs. "+return_results[0].amount+
                                    "<br>Rs. "+return_results[0].tax+
                                    "<br>Rs. "+return_results[0].total+"</td>" +
                                    "<td></td>" +
                                    "</tr>";
                        $('#form328_foot').html(total_row);
                    }

                });

                read_json_rows('form328',return_items_column,function(results)
                {
                    results.forEach(function(result)
                    {
                        var id=result.id;
                        var rowsHTML="<tr>";
                        rowsHTML+="<form id='form328_"+id+"'></form>";
                            rowsHTML+="<td data-th='Item'>";
                                rowsHTML+="<a onclick=\"show_object('product_master','"+result.item_name+"');\"><input type='text' readonly='readonly' form='form328_"+id+"' value='"+result.item_name+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Batch'>";
                                rowsHTML+="<a><input type='text' class='floatlabel' placeholder='Batch' readonly='readonly' form='form328_"+id+"' value='"+result.batch+"'></a>";
                                rowsHTML+="<input type='text' class='floatlabel' placeholder='To Storage' readonly='readonly' form='form328_"+id+"' value='"+result.storage+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Quantity'>";
                                rowsHTML+="<input type='number' placeholder='Quantity' readonly='readonly' form='form328_"+id+"' value='"+result.quantity+"' step='any'>";
								rowsHTML+="Saleable: <input type='checkbox' readonly='readonly' form='form328_"+id+"' "+result.saleable+">";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<input type='text' class='floatlabel' placeholder='Action' readonly='readonly' form='form328_"+id+"' value='"+result.type+"'>";
							    rowsHTML+="<input type='number' readonly='readonly' class='floatlabel' placeholder='Amount' step='any' form='form328_"+id+"' value='"+result.refund_amount+"'>";
                                rowsHTML+="<input type='number' step='any' readonly='readonly' class='floatlabel' placeholder='Tax' form='form328_"+id+"' value='"+result.tax+"'>";
                                rowsHTML+="<a><input type='text' readonly='readonly' class='floatlabel' placeholder='Exchange Batch' form='form328_"+id+"' value='"+result.exchange_batch+"'></a>";
                                rowsHTML+="<input type='text' readonly='readonly' class='floatlabel' placeholder='From Storage' form='form328_"+id+"' value='"+result.exchange_storage+"'>";
                            rowsHTML+="</td>";
							rowsHTML+="<td data-th='Reason'>";
								rowsHTML+="<textarea placeholder='Reason' readonly='readonly' form='form328_"+id+"'>"+result.notes+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form328_"+id+"' value='"+id+"'>";
                                rowsHTML+="<input type='button' class='submit_hidden' form='form328_"+id+"' id='save_form328_"+id+"'>";
                                rowsHTML+="<button type='button' class='btn red' form='form328_"+id+"' id='delete_form328_"+id+"' onclick='form328_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
                        rowsHTML+="</tr>";

                        $('#form328_body').append(rowsHTML);
                        var form328=document.getElementById('form328_'+id);
                        var batch=form328.elements[1];
                        var amount_filter=form328.elements[6];
                        var tax_filter=form328.elements[7];
                        var new_batch_filter=form328.elements[8];
                        var new_tax_filter=form328.elements[9];

                        var batch_object={product:result.item_name,batch:result.batch};
                        $(batch).parent().on('click',function()
                        {
                            show_object('product_instances',batch_object);
                        });

						var exchange_batch_object={product:result.item_name,batch:result.exchange_batch};
						$(new_batch_filter).parent().on('click',function()
						{
							show_object('product_instances',exchange_batch_object);
						});

                        if(result.type=='exchange')
                        {
                            $(amount_filter).hide();
                            $(tax_filter).hide();
                        }
                        else
                        {
                            $(new_batch_filter).hide();
                            $(new_tax_filter).hide();
                        }
                    });

                    $('#form328').formcontrol();

                    var bt=get_session_var('title');
                    $('#form328_share').show();
                    $('#form328_share').click(function()
                    {
                        modal101_action(bt+' - Sale Return # '+filter_fields.elements['return_num'].value,filter_fields.elements['customer'].value,'customer',function (func)
                        {
                            print_form328(func);
                        });
                    });

                    hide_loader();
                });
            }
        }

        function form328_add_item()
        {
            if(is_create_access('form328'))
            {
                var id=vUtil.newKey();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form328_"+id+"' autocomplete='off'></form>";
					rowsHTML+="<td data-th='Item'><div class='btn-overlap'>";
							rowsHTML+="<input type='text' placeholder='Item' class='floatlabel' required form='form328_"+id+"' id='form328_item_"+id+"'>";
							rowsHTML+="<button class='btn btn-icon-only default right-overlap' onclick=\"modal194_action('#form328_item_"+id+"');\"><i class='fa fa-search'></i></button></div>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
                        rowsHTML+="<input type='text' class='floatlabel' placeholder='Batch' required form='form328_"+id+"'>";
                        rowsHTML+="<input type='text' class='floatlabel' placeholder='To Storage' required form='form328_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Quantity'>";
                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Quantity' required form='form328_"+id+"' step='any'>";
						rowsHTML+="Saleable: <input type='checkbox' form='form328_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Details'>";
						rowsHTML+="<input type='text' class='floatlabel' placeholder='Action' required form='form328_"+id+"'>";
					    rowsHTML+="<input type='number' required class='floatlabel' placeholder='Amount' form='form328_"+id+"' step='any'>";
                        rowsHTML+="<input type='number' required class='floatlabel' placeholder='Tax' form='form328_"+id+"' step='any'>";
                        rowsHTML+="<input type='text' required class='floatlabel' placeholder='Exchange Batch' form='form328_"+id+"'>";
                        rowsHTML+="<input type='text' required class='floatlabel' placeholder='From Storage' form='form328_"+id+"'>";
                    rowsHTML+="</td>";
					rowsHTML+="<td data-th='Reason'>";
						rowsHTML+="<textarea placeholder='Reason' form='form328_"+id+"'></textarea>";
					rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form328_"+id+"' value='"+id+"'>";
                        rowsHTML+="<input type='hidden' form='form328_"+id+"'>";
                        rowsHTML+="<input type='hidden' form='form328_"+id+"'>";
                        rowsHTML+="<input type='button' class='submit_hidden' form='form328_"+id+"' id='save_form328_"+id+"' >";
                        rowsHTML+="<button type='button' class='btn red' form='form328_"+id+"' id='delete_form328_"+id+"' onclick='$(this).parent().parent().remove();' title='Delete' name='delete'><i class='fa fa-trash'></i></button>";
                        rowsHTML+="<input type='submit' class='submit_hidden' form='form328_"+id+"'>";
                    rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form328_body').prepend(rowsHTML);

                var fields=document.getElementById("form328_"+id);
                var name_filter=fields.elements[0];
                var batch_filter=fields.elements[1];
                var storage_filter=fields.elements[2];
                var quantity_filter=fields.elements[3];
                var type_filter=fields.elements[5];
                var amount_filter=fields.elements[6];
                var tax_filter=fields.elements[7];
                var new_batch_filter=fields.elements[8];
                var new_storage_filter=fields.elements[9];
                var id_filter=fields.elements[11];
                var total_unit_filter=fields.elements[12];
                var tax_unit_filter=fields.elements[13];
                var save_button=fields.elements[14];

                $(new_batch_filter).hide();
                $(new_storage_filter).hide();

                $(save_button).on("click", function(event)
                {
                    event.preventDefault();
                    form328_create_item(fields);
                });

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form328_add_item();
                });

                var product_data={data_store:'product_master',return_column:'name'};
                set_my_value_list_json(product_data,name_filter,function()
                {
                    $(name_filter).focus();
                });

                var storage_data={data_store:'store_areas',return_column:'name'};
                set_my_value_list_json(storage_data,storage_filter);
                set_my_value_list_json(storage_data,new_storage_filter);

                $(name_filter).on('blur',function(event)
                {
                    var batch_data={data_store:'product_instances',return_column:'batch',
                                   indexes:[{index:'product_name',exact:name_filter.value}]};
                    set_my_value_list_json(batch_data,batch_filter);
                    set_my_value_list_json(batch_data,new_batch_filter);

                    batch_filter.value="";
                    quantity_filter.value=0;
                    type_filter.value="";
                    amount_filter.value=0;
                    tax_filter.value=0;
                    total_unit_filter.value=0;
                    tax_unit_filter.value=0;
                    new_batch_filter.value="";
                    new_storage_filter.value="";
                });

                $(batch_filter).on('blur',function(event)
                {
                    var customer_name=document.getElementById("form328_master").elements['customer'].value;
                    var bill_data={data_store:'bills',return_column:'id',
                                  indexes:[{index:'customer_name',exact:'customer_name'}]};
                    read_json_single_column(bill_data,function(bills)
                    {
                        var bill_items_data={data_store:'bill_items',count:1,
                                            indexes:[{index:'bill_id',array:bills},
                                                    {index:'item_name',exact:name_filter.value},
                                                    {index:'batch',exact:batch_filter.value},
                                                    {index:'quantity'},
                                                    {index:'amount'},
                                                    {index:'tax'}]};
                        read_json_rows('',bill_items_data,function(bill_items)
                        {
                            if(bill_items.length>0)
                            {
                                total_unit_filter.value=parseFloat(bill_items[0].amount)/parseFloat(bill_items[0].quantity);
                                tax_unit_filter.value=parseFloat(bill_items[0].tax)/parseFloat(bill_items[0].quantity);
                            }
                            else
                            {
                                total_unit_filter.value=0;
                                tax_unit_filter.value=0;
                            }
                        });
                    });

                    amount_filter.value=0;
                    tax_filter.value=0;
                    new_batch_filter.value="";
                    new_storage_filter.value="";
                    type_filter.value="";
                    quantity_filter.value=0;
                });

                set_static_value_list_json('customer_return_items','type',type_filter);

                $(type_filter).on('blur',function(event)
                {
                    if(type_filter.value=='refund')
                    {
                        amount_filter.value=parseFloat(total_unit_filter.value)*parseFloat(quantity_filter.value);
                        tax_filter.value=parseFloat(tax_unit_filter.value)*parseFloat(quantity_filter.value);
                        $(new_batch_filter).hide();
                        $(new_storage_filter).hide();
                        $(amount_filter).show();
                        $(tax_filter).show();
						new_batch_filter.value="";
                        new_storage_filter.value="";
                    }
                    else
                    {
                        $(new_batch_filter).show();
                        $(new_storage_filter).show();
                        $(amount_filter).hide();
                        $(tax_filter).hide();
                        amount_filter.value=0;
                        tax_filter.value=0;
                    }
                });

                $(quantity_filter).on('blur',function(event)
                {
                    if(type_filter.value=='refund')
                    {
                        amount_filter.value=parseFloat(total_unit_filter.value)*parseFloat(quantity_filter.value);
                        tax_filter.value=parseFloat(tax_unit_filter.value)*parseFloat(quantity_filter.value);
                    }
                });

                $('#form328').formcontrol();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form328_create_item(form)
        {
            if(is_create_access('form328'))
            {
                var return_id=document.getElementById("form328_master").elements['id'].value;
                var name=form.elements[0].value;
                var batch=form.elements[1].value;
                var storage=form.elements[2].value;
                var quantity=form.elements[3].value;
                var saleable='unchecked';
                if(form.elements[4].checked)
                    saleable='checked';
                var type=form.elements[5].value;
                var amount=form.elements[6].value;
                var tax=form.elements[7].value;
                var new_batch=form.elements[8].value;
                var new_storage=form.elements[9].value;
				var reason=form.elements[10].value;
                var data_id=form.elements[11].value;
                var save_button=form.elements[14];
                var del_button=form.elements[15];
                var last_updated=get_my_time();

                var data_json={data_store:'customer_return_items',
	 				data:[{index:'id',value:data_id},
	 					{index:'return_id',value:return_id},
	 					{index:'item_name',value:name},
	 					{index:'batch',value:batch},
                        {index:'type',value:type},
                        {index:'quantity',value:quantity},
                        {index:'saleable',value:saleable},
                        {index:'refund_amount',value:amount},
                        {index:'tax',value:tax},
                        {index:'storage',value:storage},
	 					{index:'exchange_storage',value:new_storage},
	 					{index:'exchange_batch',value:new_batch},
						{index:'notes',value:reason},
	 					{index:'last_updated',value:last_updated}]};

                create_json(data_json);

                if(saleable!="checked")
                {
                    var discard_json={data_store:'discarded',
	 				data:[{index:'id',value:data_id},
	 					{index:'source_id',value:return_id},
	 					{index:'product_name',value:name},
	 					{index:'batch',value:batch},
                        {index:'quantity',value:quantity},
                        {index:'source',value:'sale return'},
                        {index:'source_link',value:'form328'},
                        {index:'storage',value:storage},
                        {index:'last_updated',value:last_updated}]};

                    create_json(discard_json);
                }

                var storage_data={data_store:'area_utilization',
                                 indexes:[{index:'id'},
                                         {index:'name',exact:storage},
                                         {index:'item_name',exact:name},
                                         {index:'batch',exact:batch}]};
                read_json_rows('',storage_data,function(placements)
                {
                    if(placements.length===0)
                    {
                        var storage_json={data_store:'area_utilization',
                            data:[{index:'id',value:vUtil.newKey()},
                                {index:'name',value:storage},
                                {index:'batch',value:batch},
                                {index:'item_name',value:name},
                                {index:'last_updated',value:last_updated}]};

                        create_json(storage_json);
                    }
                });

                $(form).readonly();

                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form328_delete_item(del_button);
                });

                $(save_button).off('click');
            }
            else
            {
                $("#modal2_link").click();
            }
        }


        function form328_create_form()
        {
            if(is_create_access('form328'))
            {
                var form=document.getElementById("form328_master");

				var return_num=form.elements['return_num'].value;
				var customer=form.elements['customer'].value;
                var return_date=get_raw_time(form.elements['date'].value);
                var data_id=form.elements['id'].value;

                var amount=0;
                var tax=0;

                var bt=get_session_var('title');
                $('#form328_share').show();
                $('#form328_share').click(function()
                {
                    modal101_action(bt+' - Sale Return # '+return_num,customer,'customer',function (func)
                    {
                        print_form328(func);
                    });
                });


                $("[id^='save_form328']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);
                    if(!isNaN(subform.elements[6].value))
                        amount+=parseFloat(subform.elements[6].value);
                    if(!isNaN(subform.elements[7].value))
                        tax+=parseFloat(subform.elements[7].value);
                });

                var total=vUtil.round(amount+tax,0);
                var total_row="<tr><td colspan='3' data-th='Total'>Amount<br>Tax<br>Total</td>" +
                        "<td colspan='2'>Rs. "+amount+
                        "<br>Rs. "+tax+
                        "<br>Rs. "+total+"</td>" +
                        "<td></td>" +
                        "</tr>";
                $('#form328_foot').html(total_row);

                var last_updated=get_my_time();

                var data_json={data_store:'customer_returns',
	 				data:[{index:'id',value:data_id},
						{index:'return_num',value:return_num},
						{index:'customer',value:customer},
	 					{index:'return_date',value:return_date},
                        {index:'amount',value:amount},
                        {index:'total',value:total},
                        {index:'tax',value:tax},
                        {index:'transaction_id',value:data_id},
	 					{index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Created',notes:'Sale return # '+return_num,link_to:'form329'}};

				var transaction_json={data_store:'transactions',
							data:[{index:'id',value:data_id},
								{index:'acc_name',value:customer},
								{index:'type',value:'received'},
								{index:'amount',value:total},
								{index:'tax',value:tax},
								{index:'source_id',value:data_id},
								{index:'source_info',value:return_num},
								{index:'source',value:'sale return'},
								{index:'source_link',value:'form329'},
								{index:'trans_date',value:last_updated},
								{index:'notes',value:''},
								{index:'last_updated',value:last_updated}]};

                create_json(data_json);
                create_json(transaction_json);

				var num_data={data_store:'user_preferences',return_column:'id',count:1,
                             indexes:[{index:'name',exact:'sale_return_number'}]};
                read_json_single_column(num_data,function (bill_num_ids)
                {
                    if(bill_num_ids.length>0)
                    {
                        var num_array=return_num.split('-');
                        var num_json={data_store:'user_preferences',
                        data:[{index:'id',value:bill_num_ids[0]},
                            {index:'value',value:(parseInt(num_array[1])+1)},
                            {index:'last_updated',value:last_updated}]};
                        update_json(num_json);
                    }
                });

                var save_button=document.getElementById('form328_save');
                $(save_button).off('click');
                $(save_button).on('click',function(event)
                {
                    event.preventDefault();
                    form328_update_form();
                });
                $("[id^='save_form328_']").click();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form328_update_form()
        {
            if(is_create_access('form328'))
            {
                var form=document.getElementById("form328_master");

				var return_num=form.elements['return_num'].value;
                var customer=form.elements['customer'].value;
                var return_date=get_raw_time(form.elements['date'].value);
                var data_id=form.elements['id'].value;

                var amount=0;
                var tax=0;

                $("[id^='save_form328_']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);
                    if(!isNaN(subform.elements[6].value))
                        amount+=parseFloat(subform.elements[6].value);
                    if(!isNaN(subform.elements[7].value))
                        tax+=parseFloat(subform.elements[7].value);
                });

                var total=vUtil.round(amount+tax,0);
                var total_row="<tr><td colspan='3' data-th='Total'>Amount<br>Tax<br>Total</td>" +
                        "<td colspan='2'>Rs. "+amount+
                        "<br>Rs. "+tax+
                        "<br>Rs. "+total+"</td>" +
                        "<td></td>" +
                        "</tr>";
                $('#form328_foot').html(total_row);

                var last_updated=get_my_time();

                var data_json={data_store:'customer_returns',
	 				data:[{index:'id',value:data_id},
	 					{index:'customer',value:customer},
	 					{index:'return_date',value:return_date},
                        {index:'amount',value:amount},
                        {index:'total',value:total},
                        {index:'tax',value:tax},
                        {index:'transaction_id',value:data_id},
	 					{index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Updated',notes:'Sale return # '+return_num,link_to:'form329'}};

				var transaction_json={data_store:'transactions',
							data:[{index:'id',value:data_id},
								{index:'acc_name',value:customer},
								{index:'type',value:'received'},
								{index:'amount',value:total},
								{index:'tax',value:tax},
								{index:'source_id',value:data_id},
								{index:'source_info',value:return_num},
								{index:'source',value:'sale return'},
								{index:'source_link',value:'form329'},
								{index:'notes',value:''},
								{index:'last_updated',value:last_updated}]};

                update_json(data_json);
                update_json(transaction_json);

                $("[id^='save_form328_']").click();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form328_delete_item(button)
        {
            if(is_delete_access('form328'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var data_id=form.elements[10].value;

                    var data_json={data_store:'customer_return_items',
	 				      				data:[{index:'id',value:data_id}]};
                    var discard_json={data_store:'discarded',
	 				      				data:[{index:'id',value:data_id}]};

                    delete_json(data_json);
                    delete_json(discard_json);

                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form328_print_form()
        {
            print_form328(function(container)
            {
                $.print(container);
                container.innerHTML="";
            });
        }

        function print_form328(func)
        {
            var container=document.createElement('div');
            var header=document.createElement('div');
                var logo=document.createElement('div');

            var invoice_line=document.createElement('div');

            var info_section=document.createElement('div');
                var customer_info=document.createElement('div');
                var business_info=document.createElement('div');

            var table_container=document.createElement('div');

            var footer=document.createElement('div');
                var tandc=document.createElement('div');
                var signature=document.createElement('div');
                var business_contact=document.createElement('div');
								var clearance=document.createElement('div');

        ////////////setting styles for containers/////////////////////////

            header.setAttribute('style','width:100%;min-height:70px;text-align:center');
            info_section.setAttribute('style','width:100%;min-height:80px');
                customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:48%;height:120px;border: 1px solid #000;border-radius:5px;');
                business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:48%;height:120px;border: 1px solid #000;border-radius:5px;');
            footer.setAttribute('style','width:100%;min-height:100px');
                tandc.setAttribute('style','float:left;width:60%;min-height:50px');
                signature.setAttribute('style','float:right;width:30%;min-height:60px');
								clearance.setAttribute('style','clear:both;');
								business_contact.setAttribute('style','display:inline-block;width:100%;text-align:center');

        ///////////////getting the content////////////////////////////////////////

            var bt=get_session_var('title');
            var logo_image=get_session_var('logo');
            //var business_intro_text=get_session_var('business_intro');
            var business_address=get_session_var('address');
            var business_phone=get_session_var('phone');
            var business_email=get_session_var('email');
            //var business_website=get_session_var('website');

            var master_form=document.getElementById('form328_master');
            var customer_name=master_form.elements['customer'].value;
            var date=master_form.elements['date'].value;
						var return_num=master_form.elements['return_num'].value;
            var return_id=master_form.elements['id'].value;
            var vat_no=get_session_var('vat');

            var signature_text="<br>"+bt+"<br><br><br>Auth. Signatory<br>";

            ////////////////filling in the content into the containers//////////////////////////

            logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
            //business_intro.innerHTML="<hr style='border: 1px solid #000;'>"+business_intro_text;
            business_contact.innerHTML="<hr style='border: 1px solid #000;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email;

            invoice_line.innerHTML="<hr style='border: 1px solid #000;'><div style='text-align:center;'><b style='text-size:1.2em'>Sale Return # "+return_num+"</b></div><hr style='border: 1px solid #000;'>";

            customer_info.innerHTML="<b>Buyer</b><br>"+customer_name;
            business_info.innerHTML="<b>Seller</b><br>"+bt+"<br>TIN: "+vat_no+"<br>Return Date: "+date+"<br>Return #: "+return_num;

            signature.innerHTML=signature_text;

            var table_element=document.getElementById('form328_body');

            /////////////adding new table //////////////////////////////////////////////////////
            var new_table=document.createElement('table');
            new_table.setAttribute('style','width:100%;font-size:15px;border:1px solid black;text-align:left;');
            var table_header="<tr style='border-top: 1px solid #000000;border-bottom: 1px solid #000000;'>"+
                        "<td style='text-align:left;width:30%;padding:3px;font-weight:600;'>Item</td>"+
                        "<td style='text-align:left;width:15%;padding:3px;font-weight:600;'>Qty</td>"+
                        "<td style='text-align:left;width:15%;padding:3px;font-weight:600;'>Amount</td>"+
                        "<td style='text-align:left;width:15%;padding:3px;font-weight:600;'>Tax</td>"+
                        "<td style='text-align:left;width:15%;padding:3px;font-weight:600;'>Total</td></tr>";

            var table_rows=table_header;
            var counter=0;

            $(table_element).find('form').each(function(index)
            {
                counter+=1;
                var form=$(this)[0];
                var item_name=form.elements[0].value;
                var quantity=""+form.elements[3].value;
                var amount=form.elements[6].value;
                var tax=form.elements[7].value;
                var total=parseFloat(amount)+parseFloat(tax);

                table_rows+="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;'>"+
                        "<td style='text-align:left;word-wrap: break-word;padding:3px;'>"+item_name+"</td>"+
                        "<td style='text-align:left;word-wrap: break-word;padding:3px;'>"+quantity+"</td>"+
                        "<td style='text-align:left;word-wrap: break-word;padding:3px;'>"+amount+"</td>"+
                        "<td style='text-align:left;word-wrap: break-word;padding:3px;'>"+tax+"</td>"+
                        "<td style='text-align:left;word-wrap: break-word;padding:3px;'>"+total+"</td></tr>";
            });

            var row_count=$(table_element).find('tbody>tr').length;
            var rows_to_add=15-row_count;
            for(var i=0;i<rows_to_add;i++)
            {
                table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td><td></td></tr>";
            }

            var table_foot=document.getElementById('form328_foot');
            var total_text1=$(table_foot).find('tr>td:first')[0].innerHTML;
            var total_text2=$(table_foot).find('tr>td:nth-child(2)')[0].innerHTML;
            var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
                        "<td colspan='3' style='text-align:left;padding:3px;'>"+total_text1+"</td>"+
                        "<td colspan='2' style='text-align:left;padding:3px;font-weight:600;'>"+total_text2+"</td></tr>";
            table_rows+=table_foot_row;
            new_table.innerHTML=table_rows;

            /////////////placing the containers //////////////////////////////////////////////////////

            container.appendChild(header);
            container.appendChild(invoice_line);
            container.appendChild(info_section);

            container.appendChild(new_table);
            container.appendChild(footer);

            header.appendChild(logo);

            info_section.appendChild(customer_info);
            info_section.appendChild(business_info);

            footer.appendChild(tandc);
            footer.appendChild(signature);
			footer.appendChild(clearance);
            footer.appendChild(business_contact);

            func(container);
        }

    </script>
</div>
