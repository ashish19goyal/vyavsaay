<div id='form323' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form323_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form323_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	     <a class='btn btn-default btn-sm' id='form323_print' onclick=form323_print_form();><i class='fa fa-print'></i> Print</a>
            <a class='btn btn-default btn-sm' id='form323_share'><i class='fa fa-envelope'></i> Email</a>
      </div>
	</div>

	<div class="portlet-body">
        <form id='form323_master' autocomplete="off">
            <fieldset>
                <label><div class='btn-overlap'><input type='text' required name='customer' placeholder='Customer' class='floatlabel'><button type='button' title='Add new customer' class='btn btn-icon-only default right-overlap' id='form323_add_customer'><i class='fa fa-plus'></i></button></div></label>
                <label><input type='text' name='date' required class='floatlabel' placeholder='Challan Date'></label>
                <label><input type='text' name='challan_num' readonly="readonly" class='floatlabel' placeholder='Challan #'></label>
                <input type='hidden' name='challan_id'>
                <input type='hidden' name='address'>
                <input type='submit' class='submit_hidden'>
            </fieldset>
        </form>

        <br>

        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr style='color:#9a9a9a;'>
                    <th>Item</th>
					<th>Description</th>
					<th>Storage</th>
					<th>Batch</th>
					<th>Quantity</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form323_body'>
			</tbody>
            <tfoot id='form323_foot'>
            </tfoot>
		</table>
    </div>

    <script>
        function form323_header_ini()
        {
            var fields=document.getElementById('form323_master');

            var customers_filter=fields.elements['customer'];
            var challan_date=fields.elements['date'];
            var challan_num=fields.elements['challan_num'];
            var challan_id_filter=fields.elements['challan_id'];
            var address=fields.elements['address'];
            var save_button=document.getElementById('form323_save');

            customers_filter.value='';
            challan_id_filter.value=vUtil.newKey();
            address.value="";
            $(challan_date).datepicker();
            $(challan_date).val(vTime.date());

            var challan_id=$("#form323_link").attr('data_id');
            if(challan_id==null || challan_id=='')
            {
                var challan_num_data={data_store:'user_preferences',return_column:'value',
                                      indexes:[{index:'name',exact:'challan_num'}]};
                read_json_single_column(challan_num_data,function(challan_nums)
                {
                    if(challan_nums.length>0)
                    {
                        challan_num.value=get_session_var('challan_prefix')+"-"+challan_nums[0];
                    }
                    else
                    {
                        challan_num.value="";
                    }
                });
            }

            $(save_button).off('click');
            $(save_button).on("click", function(event)
            {
                event.preventDefault();
                form323_create_form();
            });

            $(fields).off('submit');
            $(fields).on("submit", function(event)
            {
                event.preventDefault();
                form323_add_item();
            });

            var customers_data={data_store:'customers',return_column:'acc_name'};
            set_my_value_list_json(customers_data,customers_filter,function ()
            {
                $(customers_filter).focus();
            });

            var add_customer=document.getElementById('form323_add_customer');
            $(add_customer).off('click');
            $(add_customer).on('click',function()
            {
                modal11_action(function()
                {
                    var customers_data={data_store:'customers',return_column:'acc_name'};
                    set_my_value_list_json(customers_data,customers_filter,function ()
                    {
                        $(customers_filter).focus();
                    });
                });
            });

            $(customers_filter).off('blur');
            $(customers_filter).on('blur',function()
            {
                var address_data={data_store:'customers',return_column:'address',
                             indexes:[{index:'acc_name',exact:customers_filter.value}]};
                set_my_value_json(address_data,address);
            });

						var paginator=$('#form323_body').paginator({visible:false});
            $('#form323').formcontrol();
        }

        function form323_ini()
        {
            var challan_id=$("#form323_link").attr('data_id');
            if(challan_id==null)
                challan_id="";

            $('#form323_body').html("");
            $('#form323_foot').html("");

            if(challan_id!="")
            {
                show_loader();
                var filter_fields=document.getElementById('form323_master');

                var challan_columns={data_store:'delivery_challans',count:1,
                                 indexes:[{index:'id',value:challan_id},
                                         {index:'challan_num'},
                                         {index:'customer'},
                                         {index:'total_quantity'},
                                         {index:'challan_date'}]};

                read_json_rows('form323',challan_columns,function(challan_results)
                {
                    if (challan_results.length>0)
                    {
                        filter_fields.elements['customer'].value=challan_results[0].customer;
                        filter_fields.elements['date'].value=get_my_past_date(challan_results[0].challan_date);
                        filter_fields.elements['challan_num'].value=challan_results[0].challan_num;
                        filter_fields.elements['challan_id'].value=challan_id;
                        var address=filter_fields.elements['address'];
                        var save_button=document.getElementById('form323_save');

                        var address_data={data_store:'customers',return_column:'address',count:1,
                                     indexes:[{index:'acc_name',exact:challan_results[0].customer_name}]};
                        set_my_value_json(address_data,address);

                        $(save_button).off('click');
                        $(save_button).on("click", function(event)
                        {
                            event.preventDefault();
                            form323_update_form();
                        });
                    }
                });

                var challan_items_column={data_store:'delivery_challan_items',
                                      indexes:[{index:'id'},
                                              {index:'item_name'},
                                              {index:'item_desc'},
                                              {index:'batch'},
                                              {index:'quantity'},
                                              {index:'storage'},
                                              {index:'challan_id',exact:challan_id}]};
                read_json_rows('form323',challan_items_column,function(results)
                {
                    results.forEach(function(result)
                    {
                        var id=result.id;
                        var rowsHTML="<tr>";
                        rowsHTML+="<form id='form323_"+id+"'></form>";
                            rowsHTML+="<td data-th='Item'>";
                                rowsHTML+="<a onclick=\"show_object('product_master','"+result.item_name+"');\"><input type='text' placeholder='Item' readonly='readonly' form='form323_"+id+"' value='"+result.item_name+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Description'>";
                                rowsHTML+="<textarea placeholder='Description' readonly='readonly' form='form323_"+id+"'>"+result.item_desc+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Storage'>";
                                rowsHTML+="<a onclick=\"show_object('store_areas','"+result.storage+"');\"><input type='text' readonly='readonly' placeholder='Storage' form='form323_"+id+"' value='"+result.storage+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Batch'>";
                                rowsHTML+="<a><input type='text' readonly='readonly' placeholder='Batch' form='form323_"+id+"' value='"+result.batch+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Quantity'>";
                                rowsHTML+="<input type='number' readonly='readonly' placeholder='Quantity' form='form323_"+id+"' value='"+result.quantity+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form323_"+id+"' value='"+id+"'>";
                                rowsHTML+="<input type='button' class='submit_hidden' form='form323_"+id+"' id='save_form323_"+id+"'>";
                                rowsHTML+="<button type='button' class='btn red' form='form323_"+id+"' id='delete_form323_"+id+"' name='delete' title='Delete' onclick='form323_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
                        rowsHTML+="</tr>";

                        $('#form323_body').append(rowsHTML);
                        var batch=document.getElementById('form323_'+id).elements[3];
                        var batch_object={product:result.item_name,batch:result.batch};
                        $(batch).parent().on('click',function()
                        {
                            show_object('product_instances',batch_object);
                        });
                    });

                    var bt=get_session_var('title');
                    $('#form323_share').show();
                    $('#form323_share').click(function()
                    {
                        modal101_action(bt+' - Delivery Challan # '+filter_fields.elements['challan_num'].value,filter_fields.elements['customer'].value,'customer',function (func)
                        {
                            print_form323(func);
                        });
                    });
                    form323_get_totals();

                    $('#form323').formcontrol();
                    hide_loader();
                });
            }
        }

        function form323_add_item()
        {
            if(is_create_access('form323'))
            {
                var id=vUtil.newKey();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form323_"+id+"' autocomplete='off'></form>";
                    rowsHTML+="<td data-th='Item'><div class='btn-overlap'>";
                        rowsHTML+="<input type='text' placeholder='Item' required form='form323_"+id+"' id='form323_item_"+id+"'>";
                        rowsHTML+="<button class='btn btn-icon-only default right-overlap' onclick=\"modal194_action('#form323_item_"+id+"');\"><i class='fa fa-search'></i></button></div>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Description'>";
                        rowsHTML+="<textarea form='form323_"+id+"' placeholder='Description'></textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Storage'>";
                        rowsHTML+="<input type='text' form='form323_"+id+"' required placeholder='Storage'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Batch'>";
                        rowsHTML+="<input type='text' required form='form323_"+id+"' placeholder='Batch'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Quantity'>";
                        rowsHTML+="<input type='number' required form='form323_"+id+"' step='any' placeholder='Quantity'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form323_"+id+"' value='"+id+"'>";
                        rowsHTML+="<input type='button' class='submit_hidden' form='form323_"+id+"' id='save_form323_"+id+"' name='save'>";
                        rowsHTML+="<button type='button' class='btn red' form='form323_"+id+"' id='delete_form323_"+id+"' onclick='$(this).parent().parent().remove();' name='delete' title='Delete' form323_get_totals();'><i class='fa fa-trash'></i></button>";
                        rowsHTML+="<input type='submit' class='submit_hidden' form='form323_"+id+"'>";
                    rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form323_body').prepend(rowsHTML);

                var filter_fields=document.getElementById('form323_master');

                var fields=document.getElementById("form323_"+id);
                var name_filter=fields.elements[0];
                var desc_filter=fields.elements[1];
                var store_filter=fields.elements[2];
                var batch_filter=fields.elements[3];
                var quantity_filter=fields.elements[4];
                var id_filter=fields.elements[5];
                var save_button=fields.elements['save'];

                $(save_button).on("click", function(event)
                {
                    event.preventDefault();
                    form323_create_item(fields);
                });

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form323_add_item();
                });

                var product_data={data_store:'attributes',return_column:'name',
                                 indexes:[{index:'type',exact:'product'},
                                         {index:'value',exact:'yes'},
                                         {index:'attribute',exact:'manufactured'}]};
                set_my_value_list_json(product_data,name_filter,function ()
                {
                    $(name_filter).focus();
                });

                var store_data={data_store:'store_areas',return_column:'name'};
                set_my_value_list_json(store_data,store_filter);

                $(name_filter).on('blur',function(event)
                {
                    var batch_data={data_store:'product_instances',return_column:'batch',
                                   indexes:[{index:'product_name',exact:name_filter.value}]};
                    set_my_value_list_json(batch_data,batch_filter);

                    var master_data={data_store:'product_master',return_column:'description',
                                    indexes:[{index:'name',exact:name_filter.value}]};
                    set_my_value_json(master_data,desc_filter);

                });

                $(batch_filter).add(store_filter).on('blur',function(event)
                {
                    get_store_inventory(store_filter.value,name_filter.value,batch_filter.value,function(quantity)
                    {
                        $(quantity_filter).attr('min',"0");
                        $(quantity_filter).attr('placeholder',quantity);
                    });

                    quantity_filter.value="";
                });

                form323_get_totals();
                $('#form323').formcontrol();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form323_create_item(form)
        {
            if(is_create_access('form323'))
            {
                var challan_id=document.getElementById("form323_master").elements['challan_id'].value;
                var name=form.elements[0].value;
                var desc=form.elements[1].value;
                var storage=form.elements[2].value;
                var batch=form.elements[3].value;
                var quantity=form.elements[4].value;
                var data_id=form.elements[5].value;
                var last_updated=get_my_time();
                var save_button=form.elements['save'];
                var del_button=form.elements['delete'];

                var data_json={data_store:'delivery_challan_items',
	 				data:[{index:'id',value:data_id},
	 					{index:'item_name',value:name},
	 					{index:'item_desc',value:desc},
	 					{index:'storage',value:storage},
	 					{index:'batch',value:batch},
                        {index:'quantity',value:quantity},
                        {index:'challan_id',value:challan_id},
	 					{index:'last_updated',value:last_updated}]};

                var adjust_json={data_store:'inventory_adjust',
	 				data:[{index:'id',value:data_id},
	 					{index:'product_name',value:name},
	 					{index:'item_desc',value:desc},
	 					{index:'batch',value:batch},
                        {index:'storage',value:storage},
	 					{index:'quantity',value:(-quantity)+""},
                        {index:'source_id',value:challan_id},
                        {index:'source',value:'delivery challan'},
	 					{index:'last_updated',value:last_updated}]};

                create_json(data_json);
                create_json(adjust_json);

                $(form).readonly();

                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form323_delete_item(del_button);
                });

                $(save_button).off('click');
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form323_create_form()
        {
            if(is_create_access('form323'))
            {
                var form=document.getElementById("form323_master");

                var customer=form.elements['customer'].value;
                var challan_date=get_raw_time(form.elements['date'].value);
                var challan_num=form.elements['challan_num'].value;
                var data_id=form.elements['challan_id'].value;
                var save_button=document.getElementById('form323_save');

                var bt=get_session_var('title');
                $('#form323_share').show();
                $('#form323_share').click(function()
                {
                    modal101_action(bt+' - Delivery Challan # '+challan_num,customer,'customer',function (func)
                    {
                        print_form323(func);
                    });
                });

                var total_quantity=0;

                $("[id^='save_form323']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);
                    if(!isNaN(parseFloat(subform.elements[3].value)))
                        total_quantity+=parseFloat(subform.elements[3].value);
                });

                var last_updated=get_my_time();

                var data_json={data_store:'delivery_challans',
	 				data:[{index:'id',value:data_id},
	 					{index:'customer',value:customer},
	 					{index:'challan_num',value:challan_num},
	 					{index:'challan_date',value:challan_date},
                        {index:'total_quantity',value:total_quantity},
                        {index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Created',notes:'Challan # '+challan_num,link_to:'form324'}};

                var num_data={data_store:'user_preferences',return_column:'id',
                             indexes:[{index:'name',exact:'challan_num'}]};
                read_json_single_column(num_data,function (challan_num_ids)
                {
                    if(challan_num_ids.length>0)
                    {
                        var num_array=challan_num.split('-');
                        var num_json={data_store:'user_preferences',
                        data:[{index:'id',value:challan_num_ids[0]},
                            {index:'value',value:(parseInt(num_array[1])+1)+""},
                            {index:'last_updated',value:last_updated}]};

                        update_json(num_json);
                    }
                });

                create_json(data_json);

                var total_row="<tr><td colspan='4' data-th='Total Quantity'>Total Quantity</id><td colspan='2'>"+total_quantity+"</td></tr>";
                $('#form323_foot').html(total_row);

                $(save_button).off('click');
                $(save_button).on('click',function(event)
                {
                    event.preventDefault();
                    form323_update_form();
                });

                $("[id^='save_form323_']").click();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form323_update_form()
        {
            if(is_create_access('form323'))
            {
                var form=document.getElementById("form323_master");

                var customer=form.elements['customer'].value;
                var challan_date=get_raw_time(form.elements['date'].value);
                var challan_num=form.elements['challan_num'].value;
                var data_id=form.elements['challan_id'].value;

                var bt=get_session_var('title');
                $('#form323_share').show();
                $('#form323_share').click(function()
                {
                    modal101_action(bt+' - Delivery Challan # '+challan_num,customer,'customer',function (func)
                    {
                        print_form323(func);
                    });
                });

                var total_quantity=0;

                $("[id^='save_form323']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);
                    if(!isNaN(parseFloat(subform.elements[3].value)))
                        total_quantity+=parseFloat(subform.elements[3].value);
                });

                var last_updated=get_my_time();

                var data_json={data_store:'delivery_challans',
	 				data:[{index:'id',value:data_id},
	 					{index:'customer',value:customer},
                        {index:'challan_date',value:challan_date},
                        {index:'total_quantity',value:total_quantity},
                        {index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Updated',notes:'Delivery Challan # '+challan_num,link_to:'form324'}};

                update_json(data_json);

                var total_row="<tr><td colspan='4' data-th='Total'>Total Quantity</td><td colspan='2'>"+total_quantity+"</td></tr>";
                $('#form323_foot').html(total_row);

                $("[id^='save_form323_']").click();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form323_delete_item(button)
        {
            if(is_delete_access('form323'))
            {
                modal115_action(function()
                {
                    var challan_id=document.getElementById("form323_master").elements['challan_id'].value;

                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);
                    var data_id=form.elements[5].value;

                    var data_json={data_store:'delivery_challan_items',
	 				data:[{index:'id',value:data_id}]};

                    var adjust_json={data_store:'inventory_adjust',
	 				data:[{index:'id',value:data_id}]};

                    delete_json(data_json);
                    delete_json(adjust_json);

                    $(button).parent().parent().remove();
                    form323_get_totals();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form323_get_totals()
        {
            var total_quantity=0;

            $("[id^='save_form323']").each(function(index)
            {
                var subform_id=$(this).attr('form');
                var subform=document.getElementById(subform_id);
                if(!isNaN(parseFloat(subform.elements[4].value)))
                    total_quantity+=parseFloat(subform.elements[4].value);
            });

            var form=document.getElementById("form323_master");

            var total_row="<tr><td colspan='4' data-th='Total'>Total Quantity</td><td colspan='2'>"+total_quantity+"</td></tr>";

            $('#form323_foot').html(total_row);
        }

        function form323_print_form()
        {
            print_form323(function(container)
            {
                $.print(container);
                container.innerHTML="";
            });
        }

        function print_form323(func)
        {
            var container=document.createElement('div');
            var header=document.createElement('div');
                var logo=document.createElement('div');
                var business_intro=document.createElement('div');

            var invoice_line=document.createElement('div');

            var info_section=document.createElement('div');
                var customer_info=document.createElement('div');
                var business_info=document.createElement('div');

            var table_container=document.createElement('div');

            var footer=document.createElement('div');
                var tandc=document.createElement('div');
                var signature=document.createElement('div');
                var business_contact=document.createElement('div');

        ////////////setting styles for containers/////////////////////////

            header.setAttribute('style','width:100%;min-height:70px;text-align:center');
                business_intro.setAttribute('style','width:100%;text-align:center');
                business_contact.setAttribute('style','display:inline-block;width:100%;text-align:center');
            info_section.setAttribute('style','width:100%;min-height:80px');
                customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:48%;height:120px;border: 1px solid #000;border-radius:5px;');
                business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:48%;height:120px;border: 1px solid #000;border-radius:5px;');
            footer.setAttribute('style','width:100%;min-height:100px');
                tandc.setAttribute('style','float:left;width:60%;min-height:50px');
                signature.setAttribute('style','float:right;width:30%;min-height:60px');

        ///////////////getting the content////////////////////////////////////////

            var bt=get_session_var('title');
            var font_size=get_session_var('print_size');
            var logo_image=get_session_var('logo');
            var business_address=get_session_var('address');
            var business_phone=get_session_var('phone');
            var business_email=get_session_var('email');

            var master_form=document.getElementById('form323_master');
            var customer_name=master_form.elements['customer'].value;
            var customer_address=master_form.elements['address'].value;
            var date=master_form.elements['date'].value;
            var challan_num=master_form.elements['challan_num'].value;

            var signature_text="<br>"+bt+"<br><br><br>Auth. Signatory<br>";

            ////////////////filling in the content into the containers//////////////////////////

            logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
            business_contact.innerHTML="<hr style='border: 1px solid #000;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email;

            invoice_line.innerHTML="<hr style='border: 1px solid #000;'><div style='text-align:center;'><b style='text-size:1.2em'>Delivery Challan # "+challan_num+"</b></div><hr style='border: 1px solid #000;'>";

            customer_info.innerHTML="<b>Buyer</b><br>"+customer_name+"<br>Address: "+customer_address;
            business_info.innerHTML="<b>Seller</b><br>"+bt+"<br>Date: "+date+"<br>Challan No: "+challan_num;

            signature.innerHTML=signature_text;

            var table_element=document.getElementById('form323_body');

            /////////////adding new table //////////////////////////////////////////////////////
            var new_table=document.createElement('table');
            new_table.setAttribute('style','width:100%;font-size:15px;border:1px solid black;text-align:left;');
            var table_header="<tr style='border-top:1px solid #000000;border-bottom: 1px solid #000000;'>"+
                        "<td style='text-align:left;width:40%;padding:3px;font-weight:600;'>Item</td>"+
                        "<td style='text-align:left;width:40%;padding:3px;font-weight:600;'>Description</td>"+
                        "<td style='text-align:left;width:20%;padding:3px;font-weight:600;'>Quantity</td></tr>";

            var table_rows=table_header;
            var counter=0;

            $(table_element).find('form').each(function(index)
            {
                counter+=1;
                var form=$(this)[0];
                var item_name=form.elements[0].value;
                var item_desc=form.elements[1].value;
                var batch=form.elements[3].value;
                var quantity=""+form.elements[4].value;

                table_rows+="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;'>"+
                        "<td style='text-align:left;word-wrap: break-word;padding:3px;'>"+item_name+"</td>"+
                        "<td style='text-align:left;word-wrap: break-word;padding:3px;'>"+item_desc+"</td>"+
                        "<td style='text-align:left;word-wrap: break-word;padding:3px;'>"+quantity+"</td></tr>";
            });

            var row_count=$(table_element).find('tbody>tr').length;
            var rows_to_add=18-row_count;
            for(var i=0;i<rows_to_add;i++)
            {
                table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td></tr>";
            }

            var table_foot=document.getElementById('form323_foot');
            var total_text1=$(table_foot).find('tr>td:first')[0].innerHTML;
            var total_text2=$(table_foot).find('tr>td:nth-child(2)')[0].innerHTML;
            var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
                        "<td colspan='2' style='text-align:left;padding:3px;'>"+total_text1+"</td>"+
                        "<td style='text-align:left;padding:3px;font-weight:600;'>"+total_text2+"</td></tr>";
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

            footer.appendChild(business_contact);

            func(container);
        }

    </script>
</div>
