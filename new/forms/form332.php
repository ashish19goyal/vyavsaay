<div id='form332' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form332_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form332_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form332_print' onclick=form332_print_form();><i class='fa fa-print'></i> Print</a>
        <a class='btn btn-default btn-sm' id='form332_share'><i class='fa fa-envelope'></i> Email</a>    
      </div>
	</div>
	
	<div class="portlet-body">
        <form id='form332_master' autocomplete="off">
            <fieldset>
                <label><div class='btn-overlap'><input type='text' required name='customer' placeholder='Customer' class='floatlabel'><button type='button' title='Add new customer' class='btn btn-icon-only default right-overlap' id='form332_add_customer'><i class='fa fa-plus'></i></button></div></label>
                <label><input type='text' required name='bill_type' class='floatlabel' placeholder='Store' readonly='readonly'></label>
                <label><input type='text' name='date' required class='floatlabel' placeholder='Bill Date'></label>
                <label><input type='text' name='bill_num' readonly="readonly" class='floatlabel' placeholder='Bill #'></label>
                <input type='hidden' name='bill_id'>
                <input type='hidden' name='address'>
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
					<th>Rate</th>
					<th>Total</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form332_body'>
			</tbody>
            <tfoot id='form332_foot'>
            </tfoot>
		</table>
    </div>
    
    <script>
        function form332_header_ini()
        {
            var fields=document.getElementById('form332_master');

            var customers_filter=fields.elements['customer'];
            var bill_date=fields.elements['date'];
            var bill_num=fields.elements['bill_num'];
            var bill_id_filter=fields.elements['bill_id'];
            var bill_type=fields.elements['bill_type'];
            var address=fields.elements['address'];
            var save_button=document.getElementById('form332_save');
            
            customers_filter.value='';
            bill_id_filter.value=get_new_key();
            address.value="";
            $(bill_date).datepicker();
            $(bill_date).val(get_my_date());
            
            bill_type.value=get_session_var('user_setting_Store');
            
            var bill_id=$("#form332_link").attr('data_id');
            if(bill_id==null || bill_id=='')
            {	
                var bill_num_data={data_store:'user_preferences',return_column:'value',
                          indexes:[{index:'name',exact:bill_type.value+"_bill_num"}]};
                set_my_value_json(bill_num_data,bill_num);	
            }

            $(save_button).off('click');
            $(save_button).on("click", function(event)
            {
                event.preventDefault();
                form332_create_form();
            });

            $(fields).off('submit');
            $(fields).on("submit", function(event)
            {
                event.preventDefault();
                form332_add_item();
            });

            var customers_data={data_store:'customers',return_column:'acc_name'};
            set_my_value_list_json(customers_data,customers_filter,function () 
            {
                $(customers_filter).focus();
            });

            var add_customer=document.getElementById('form332_add_customer');
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
            
            $('#form332').formcontrol();
        }

        function form332_ini()
        {
            var bill_id=$("#form332_link").attr('data_id');
            if(bill_id==null)
                bill_id="";	

            $('#form332_body').html("");
            $('#form332_foot').html("");

            if(bill_id!="")
            {
                show_loader();
                var filter_fields=document.getElementById('form332_master');

                var bill_columns={data_store:'bills',count:1,
                                 indexes:[{index:'id',value:bill_id},
                                         {index:'bill_num'},
                                         {index:'customer_name'},
                                         {index:'total'},
                                         {index:'amount'},
                                         {index:'tax'},
                                         {index:'discount'}, 
                                         {index:'bill_date'},
                                         {index:'billing_type'}]};
                
                read_json_rows('form332',bill_columns,function(bill_results)
                {
                    if (bill_results.length>0)
                    {
                        filter_fields.elements['customer'].value=bill_results[0].customer_name;
                        filter_fields.elements['date'].value=get_my_past_date(bill_results[0].bill_date);
                        filter_fields.elements['bill_num'].value=bill_results[0].bill_num;
                        filter_fields.elements['bill_id'].value=bill_id;
                        filter_fields.elements['bill_type'].value=bill_results[0].billing_type;
                        var address=filter_fields.elements['address'];
                        var save_button=document.getElementById('form332_save');
                        
                        var address_data={data_store:'customers',return_column:'address',count:1,
                                     indexes:[{index:'acc_name',exact:bill_results[0].customer_name}]};
                        set_my_value_json(address_data,address);

                        $(save_button).off('click');
                        $(save_button).on("click", function(event)
                        {
                            event.preventDefault();
                            form332_update_form();
                        });
                    }
                });
                
                var bill_items_column={data_store:'bill_items',
                                      indexes:[{index:'id'},
                                              {index:'item_name'},
                                              {index:'item_desc'},
                                              {index:'batch'},
                                              {index:'quantity'},
                                              {index:'unit_price'},
                                              {index:'amount'},
                                              {index:'total'},
                                              {index:'tax'},
                                              {index:'discount'}, 
                                              {index:'bill_id',exact:bill_id}]};
                read_json_rows('form332',bill_items_column,function(results)
                {
                    results.forEach(function(result)
                    {
                        var id=result.id;
                        var rowsHTML="<tr>";
                        rowsHTML+="<form id='form332_"+id+"'></form>";
                            rowsHTML+="<td data-th='Item'>";
                                rowsHTML+="<a onclick=\"show_object('product_master','"+result.item_name+"');\"><input type='text' readonly='readonly' form='form332_"+id+"' value='"+result.item_name+"' class='floatlabel' placeholder='Item'></a>";
                                rowsHTML+="<textarea readonly='readonly' class='floatlabel' placeholder='Description' form='form332_"+id+"'>"+result.item_desc+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Batch'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form332_"+id+"' value='"+result.batch+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Quantity'>";
                                rowsHTML+="<input type='number' readonly='readonly' form='form332_"+id+"' value='"+result.quantity+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Rate'>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Rate' readonly='readonly' form='form332_"+id+"' value='"+result.unit_price+"' step='any'>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' readonly='readonly' form='form332_"+id+"' step='any' value='"+result.amount+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Total'>";
                                rowsHTML+="<input type='number' readonly='readonly' class='floatlabel' placeholder='Discount' form='form332_"+id+"' step='any' value='"+result.discount+"'>";
                                rowsHTML+="<input type='number' readonly='readonly' class='floatlabel' placeholder='Tax' form='form332_"+id+"' step='any' value='"+result.tax+"'>";
                                rowsHTML+="<input type='number' readonly='readonly' class='floatlabel' placeholder='Total' form='form332_"+id+"' step='any' value='"+result.total+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form332_"+id+"' value='"+id+"'>";
                                rowsHTML+="<input type='button' class='submit_hidden' form='form332_"+id+"' id='save_form332_"+id+"'>";
                                rowsHTML+="<button type='button' class='btn red' form='form332_"+id+"' id='delete_form332_"+id+"' name='delete' title='Delete' onclick='form332_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";			
                        rowsHTML+="</tr>";

                        $('#form332_body').append(rowsHTML);
                    });

                    var bt=get_session_var('title');
                    $('#form332_share').show();
                    $('#form332_share').click(function()
                    {
                        modal101_action(bt+' - Invoice# '+filter_fields.elements['bill_num'].value,filter_fields.elements['customer'].value,'customer',function (func) 
                        {
                            print_form332(func);
                        });
                    });
                    form332_get_totals();
                    
                    $('#form332').formcontrol();
                    hide_loader();
                });
            }
        }

        function form332_add_item()
        {
            if(is_create_access('form332'))
            {
                var id=get_new_key();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form332_"+id+"' autocomplete='off'></form>";
                    rowsHTML+="<td data-th='Item'><div class='btn-overlap'>";
                        rowsHTML+="<input type='text' placeholder='Item' class='floatlabel' required form='form332_"+id+"' id='form332_item_"+id+"'>";
                        rowsHTML+="<button class='btn btn-icon-only default right-overlap' onclick=\"modal194_action('#form332_item_"+id+"');\"><i class='fa fa-search'></i></button></div>";
                        rowsHTML+="<textarea placeholder='Description' class='floatlabel' form='form332_"+id+"'></textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Batch'>";
                        rowsHTML+="<input type='text' required form='form332_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Quantity'>";
                        rowsHTML+="<input type='number' required form='form332_"+id+"' step='any'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Rate'>";
                        rowsHTML+="<input type='number' placeholder='Rate' class='floatlabel' required form='form332_"+id+"' step='any'>";
                        rowsHTML+="<input type='number' placeholder='Amount' class='floatlabel' readonly='readonly' required form='form332_"+id+"' step='any'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Total'>";
                        rowsHTML+="<input type='number' placeholder='Discount' class='floatlabel' form='form332_"+id+"' step='any' value='0'>";
                        rowsHTML+="<input type='number' required placeholder='Tax' class='floatlabel' form='form332_"+id+"' step='any'>";
                        rowsHTML+="<input type='number' required placeholder='Total' class='floatlabel' readonly='readonly' required form='form332_"+id+"' step='any'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form332_"+id+"' value='"+id+"'>";
                        rowsHTML+="<input type='button' class='submit_hidden' form='form332_"+id+"' id='save_form332_"+id+"' name='save'>";
                        rowsHTML+="<button type='button' class='btn red' form='form332_"+id+"' id='delete_form332_"+id+"' onclick='$(this).parent().parent().remove();' name='delete' title='Delete' form332_get_totals();'><i class='fa fa-trash'></i></button>";
                        rowsHTML+="<input type='submit' class='submit_hidden' form='form332_"+id+"'>";
                        rowsHTML+="<input type='hidden' form='form332_"+id+"' name='tax_rate'>";
                    rowsHTML+="</td>";			
                rowsHTML+="</tr>";

                $('#form332_body').prepend(rowsHTML);

                var filter_fields=document.getElementById('form332_master');
                var bill_type=filter_fields.elements['bill_type'].value;

                var fields=document.getElementById("form332_"+id);
                var name_filter=fields.elements[0];
                var desc_filter=fields.elements[1];
                var batch_filter=fields.elements[2];
                var quantity_filter=fields.elements[3];
                var price_filter=fields.elements[4];
                var amount_filter=fields.elements[5];
                var discount_filter=fields.elements[6];
                var tax_filter=fields.elements[7];
                var total_filter=fields.elements[8];
                var id_filter=fields.elements[9];
                var save_button=fields.elements[10];
                var tax_rate_filter=fields.elements[13];

                $(save_button).on("click", function(event)
                {
                    event.preventDefault();
                    form332_create_item(fields);
                });

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form332_add_item();
                });

                var product_data={data_store:'product_master',return_column:'name'};
                set_my_value_list_json(product_data,name_filter,function () 
                {
                    $(name_filter).focus();
                }); 

                $(name_filter).on('blur',function(event)
                {
                    var batch_data={data_store:'product_instances',return_column:'batch',
                                   indexes:[{index:'product_name',exact:name_filter.value}]};
                    set_my_value_list_json(batch_data,batch_filter);

                    var master_data={data_store:'product_master',
                                    indexes:[{index:'description'},
                                             {index:'tax'},
                                            {index:'name',exact:name_filter.value}]};
                    read_json_rows('',master_data,function (products) 
                    {
                        if(products.length>0)
                        {
                            tax_rate_filter.value=products[0].tax;
                            desc_filter.value=products[0].description;
                        }
                    });
                });

                $(batch_filter).on('blur',function(event)
                {
                    var price_data={data_store:'sale_prices',return_column:'sale_price',
                                   indexes:[{index:'product_name',exact:name_filter.value},
                                           {index:'batch',exact:batch_filter.value},
                                           {index:'billing_type',exact:get_session_var('user_setting_Store')}]};
                    set_my_value_json(price_data,price_filter);

                    get_inventory(name_filter.value,batch_filter.value,function(quantity)
                    {
                        $(quantity_filter).attr('min',"0");
                        $(quantity_filter).attr('placeholder',quantity);
                    });

                    quantity_filter.value="";
                    total_filter.value=0;
                    amount_filter.value=0;
                    discount_filter.value=0;
                    tax_filter.value=0;
                });

                $(quantity_filter).add(price_filter).add(discount_filter).on('blur',function(event)
                {
                    amount_filter.value=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
                    tax_filter.value=parseFloat((parseFloat(tax_rate_filter.value)*(parseFloat(amount_filter.value)-parseFloat(discount_filter.value)))/100);
                    total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);
                });

                form332_get_totals();
                $('#form332').formcontrol();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form332_create_item(form)
        {
            if(is_create_access('form332'))
            {
                var bill_id=document.getElementById("form332_master").elements['bill_id'].value;
                var name=form.elements[0].value;
                var desc=form.elements[1].value;
                var batch=form.elements[2].value;
                var quantity=form.elements[3].value;
                var price=form.elements[4].value;
                var amount=form.elements[5].value;
                var discount=form.elements[6].value;
                var tax=form.elements[7].value;
                var total=form.elements[8].value;
                var data_id=form.elements[9].value;
                var last_updated=get_my_time();
                var save_button=form.elements['save'];
                var del_button=form.elements['delete'];
                
                var data_json={data_store:'bill_items',
	 				data:[{index:'id',value:data_id},
	 					{index:'item_name',value:name},
	 					{index:'item_desc',value:desc},
	 					{index:'batch',value:batch},
                        {index:'quantity',value:quantity},
                        {index:'unit_price',value:price},
                        {index:'amount',value:amount},
                        {index:'total',value:total},
                        {index:'discount',value:discount},
                        {index:'tax',value:tax},
                        {index:'bill_id',value:bill_id},  
	 					{index:'last_updated',value:last_updated}]};
 				 				
                create_json(data_json);
                
                $(form).readonly();
            
                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form332_delete_item(del_button);
                });

                $(save_button).off('click');
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form332_create_form()
        {
            if(is_create_access('form332'))
            {
                var form=document.getElementById("form332_master");

                var customer=form.elements['customer'].value;
                var bill_date=get_raw_time(form.elements['date'].value);
                var bill_num=form.elements['bill_num'].value;
                var bill_type=form.elements['bill_type'].value;
                var data_id=form.elements['bill_id'].value;
                var save_button=document.getElementById('form332_save');

                var bt=get_session_var('title');
                $('#form332_share').show();
                $('#form332_share').click(function()
                {
                    modal101_action(bt+' - Invoice# '+bill_num,customer,'customer',function (func) 
                    {
                        print_form332(func);
                    });
                });

                var amount=0;
                var discount=0;
                var tax=0;
                var total=0;
                var total_quantity=0;

                $("[id^='save_form332']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);
                    if(!isNaN(parseFloat(subform.elements[5].value)))
                        amount+=parseFloat(subform.elements[5].value);
                    if(!isNaN(parseFloat(subform.elements[6].value)))
                        discount+=parseFloat(subform.elements[6].value);
                    if(!isNaN(parseFloat(subform.elements[7].value)))
                        tax+=parseFloat(subform.elements[7].value);
                    if(!isNaN(parseFloat(subform.elements[8].value)))
                        total+=parseFloat(subform.elements[8].value);

                    if(!isNaN(parseFloat(subform.elements[3].value)))
                        total_quantity+=parseFloat(subform.elements[3].value);							
                });

                var last_updated=get_my_time();
                
                var data_json={data_store:'bills',
	 				data:[{index:'id',value:data_id},
	 					{index:'customer_name',value:customer},
	 					{index:'bill_num',value:bill_num},
	 					{index:'billing_type',value:bill_type},
                        {index:'bill_date',value:bill_date},
                        {index:'amount',value:amount},  
                        {index:'total',value:total},
                        {index:'discount',value:discount},
                        {index:'tax',value:tax},
                        {index:'transaction_id',value:data_id},  
	 					{index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Created',notes:bill_type+' Bill #'+bill_num,link_to:'form92'}};

                var transaction_json={data_store:'transactions',
	 				data:[{index:'id',value:data_id},
	 					{index:'trans_date',value:last_updated},
	 					{index:'amount',value:total},
                        {index:'receiver',value:customer},
                        {index:'giver',value:'master'},  
                        {index:'tax',value:tax},
                        {index:'last_updated',value:last_updated}]};

                var pt_tran_id=get_new_key();
                
                var payment_json={data_store:'payments',
	 				data:[{index:'id',value:pt_tran_id},
                        {index:'status',value:'closed'},
                        {index:'type',value:'received'},  
	 					{index:'date',value:last_updated},
	 					{index:'total_amount',value:total},
                        {index:'paid_amount',value:total},  
                        {index:'acc_name',value:customer},  
                        {index:'due_date',value:get_credit_period()},
                        {index:'mode',value:get_payment_mode()},
                        {index:'transaction_id',value:pt_tran_id},
                        {index:'source_id',value:data_id},
                        {index:'source',value:'sale bill'},  
                        {index:'source_info',value:bill_num},
                        {index:'last_updated',value:last_updated}]};

                var pt_json={data_store:'transactions',
	 				data:[{index:'id',value:pt_tran_id},
	 					{index:'trans_date',value:last_updated},
	 					{index:'amount',value:total},
                        {index:'receiver',value:'master'},
                        {index:'giver',value:customer},  
                        {index:'tax',value:'0'},
                        {index:'last_updated',value:last_updated}]};

                var num_data={data_store:'user_preferences',return_column:'id',
                             indexes:[{index:'name',exact:bill_type+"_bill_num"}]};
                read_json_single_column(num_data,function (bill_num_ids)
                {
                    if(bill_num_ids.length>0)
                    {
                        var num_json={data_store:'user_preferences',
                        data:[{index:'id',value:bill_num_ids[0]},
                            {index:'value',value:(parseFloat(bill_num)+1)+""},
                            {index:'last_updated',value:last_updated}]};

                        update_json(num_json);
                    }
                });
                
                create_json(data_json);
                create_json(transaction_json);
                create_json(pt_json);
                create_json(payment_json,function()
                {
                    modal26_action(pt_tran_id);
                });


                var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
                        "<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
                        "<td>Rs. "+amount+"</br>" +
                        "Rs. "+discount+"</br>" +
                        "Rs. "+tax+"</br>" +
                        "Rs. "+total+"</td>" +
                        "<td></td>" +
                        "</tr>";
                $('#form332_foot').html(total_row);

                $(save_button).off('click');
                $(save_button).on('click',function(event)
                {
                    event.preventDefault();
                    form332_update_form();
                });

                $("[id^='save_form332_']").click();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form332_update_form()
        {
            if(is_create_access('form332'))
            {
                var form=document.getElementById("form332_master");

                var customer=form.elements['customer'].value;
                var bill_date=get_raw_time(form.elements['date'].value);
                var bill_num=form.elements['bill_num'].value;
                var bill_type=form.elements['bill_type'].value;
                var data_id=form.elements['bill_id'].value;
                
                var bt=get_session_var('title');
                $('#form332_share').show();
                $('#form332_share').click(function()
                {
                    modal101_action(bt+' - Invoice# '+bill_num,customer,'customer',function (func) 
                    {
                        print_form332(func);
                    });
                });

                var amount=0;
                var discount=0;
                var tax=0;
                var total=0;

                var total_quantity=0;

                $("[id^='save_form332']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);
                    if(!isNaN(parseFloat(subform.elements[5].value)))
                        amount+=parseFloat(subform.elements[5].value);
                    if(!isNaN(parseFloat(subform.elements[6].value)))
                        discount+=parseFloat(subform.elements[6].value);
                    if(!isNaN(parseFloat(subform.elements[7].value)))
                        tax+=parseFloat(subform.elements[7].value);
                    if(!isNaN(parseFloat(subform.elements[8].value)))
                        total+=parseFloat(subform.elements[8].value);

                    if(!isNaN(parseFloat(subform.elements[3].value)))
                        total_quantity+=parseFloat(subform.elements[3].value);							
                });

                var last_updated=get_my_time();

                var data_json={data_store:'bills',
	 				data:[{index:'id',value:data_id},
	 					{index:'customer_name',value:customer},
                        {index:'bill_date',value:bill_date},
                        {index:'amount',value:amount},  
                        {index:'total',value:total},
                        {index:'discount',value:discount},
                        {index:'tax',value:tax},
	 					{index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Updated',notes:bill_type+' Bill #'+bill_num,link_to:'form92'}};

                var transaction_json={data_store:'transactions',
	 				data:[{index:'id',value:data_id},
	 					{index:'trans_date',value:last_updated},
	 					{index:'amount',value:total},
                        {index:'receiver',value:customer},
                        {index:'giver',value:'master'},  
                        {index:'tax',value:tax},
                        {index:'last_updated',value:last_updated}]};

                var pt_tran_id=get_new_key();
                
                update_json(data_json);
                update_json(transaction_json);

                var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
                        "<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
                        "<td>Rs. "+amount+"</br>" +
                        "Rs. "+discount+"</br>" +
                        "Rs. "+tax+"</br>" +
                        "Rs. "+total+"</td>" +
                        "<td></td>" +
                        "</tr>";
                $('#form332_foot').html(total_row);

                var payment_data={data_store:'payments',return_column:'id',count:1,
                                 indexes:[{index:'source_id',exact:data_id}]};
                read_json_single_column(payment_data,function(payments)
                {
                    if(payments.length>0)
                    {
                         var payment_json={data_store:'payments',
                            data:[{index:'id',value:payments[0]},
                                {index:'type',value:'received'},  
                                {index:'total_amount',value:total},
                                {index:'acc_name',value:customer},  
                                {index:'transaction_id',value:payments[0]},
                                {index:'source_id',value:data_id},
                                {index:'source',value:'sale bill'},  
                                {index:'source_info',value:bill_num},
                                {index:'last_updated',value:last_updated}]};

                        var pt_json={data_store:'transactions',
                            data:[{index:'id',value:payments[0]},
                                {index:'amount',value:total},
                                {index:'giver',value:customer},  
                                {index:'last_updated',value:last_updated}]};

                        update_json(payment_json,function()
                        {
                            modal26_action(payments[0]);
                        });
                        update_json(pt_json);
                    }
                });

                $("[id^='save_form332_']").click();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form332_delete_item(button)
        {
            if(is_delete_access('form332'))
            {
                modal115_action(function()
                {
                    var bill_id=document.getElementById("form332_master").elements['bill_id'].value;

                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);
                    var data_id=form.elements[9].value;
                        
                    var data_json={data_store:'bill_items',
	 				data:[{index:'id',value:data_id}]};

                    var adjust_json={data_store:'inventory_adjust',
	 				data:[{index:'id',value:data_id}]};

                    delete_json(data_json);
                    delete_json(adjust_json);
                    
                    $(button).parent().parent().remove();
                    form332_get_totals();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form332_get_totals()
        {
            var amount=0;
            var tax=0;
            var discount=0;	
            var total=0;
            var total_quantity=0;

            $("[id^='save_form332']").each(function(index)
            {
                var subform_id=$(this).attr('form');
                var subform=document.getElementById(subform_id);
                if(!isNaN(parseFloat(subform.elements[5].value)))
                    amount+=parseFloat(subform.elements[5].value);
                if(!isNaN(parseFloat(subform.elements[6].value)))
                    discount+=parseFloat(subform.elements[6].value);
                if(!isNaN(parseFloat(subform.elements[7].value)))
                    tax+=parseFloat(subform.elements[7].value);
                if(!isNaN(parseFloat(subform.elements[8].value)))
                    total+=parseFloat(subform.elements[8].value);

                if(!isNaN(parseFloat(subform.elements[3].value)))
                    total_quantity+=parseFloat(subform.elements[3].value);							
            });

            var form=document.getElementById("form332_master");

            amount=my_round(amount,2);
            tax=my_round(tax,2);
            discount=my_round(discount,2);	
            total=my_round(total,2);

            var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
                        "<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
                        "<td>Rs. "+amount+"</br>" +
                        "Rs. "+discount+"</br>" +
                        "Rs. "+tax+"</br>" +
                        "Rs. "+total+"</td>" +
                        "<td></td>" +
                        "</tr>";

            $('#form332_foot').html(total_row);
        }

        function form332_print_form()
        {	
            print_form332(function(container)
            {
                $.print(container);
                container.innerHTML="";	
            });	
        }

        function print_form332(func)
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

            header.setAttribute('style','width:100%;min-height:100px;text-align:center');
                business_intro.setAttribute('style','width:100%;text-align:center');
                business_contact.setAttribute('style','display:inline-block;width:100%;text-align:center');
            info_section.setAttribute('style','width:100%;min-height:100px');
                customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:46%;height:120px;border: 1px solid #00f;border-radius:5px;');
                business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:46%;height:120px;border: 1px solid #00f;border-radius:5px;');
            footer.setAttribute('style','width:100%;min-height:100px');
                tandc.setAttribute('style','float:left;width:60%;min-height:50px');
                signature.setAttribute('style','float:right;width:30%;min-height:60px');

        ///////////////getting the content////////////////////////////////////////

            var bt=get_session_var('title');
            var font_size=get_session_var('print_size');
            var logo_image=get_session_var('logo');
            //var business_intro_text=get_session_var('business_intro');
            var business_address=get_session_var('address');
            var business_phone=get_session_var('phone');
            var business_email=get_session_var('email');
            //var business_website=get_session_var('website');

            var master_form=document.getElementById('form332_master');
            var customer_name=master_form.elements['customer'].value;
            var customer_address=master_form.elements['address'].value;
            var date=master_form.elements['date'].value;	
            var bill_num=master_form.elements['bill_num'].value;
            var bill_type=master_form.elements['bill_type'].value;
            
            var tandc_text=get_session_var('bill_message');
            var signature_text="<br>"+bt+"<br><br><br>Auth. Signatory<br>";

            ////////////////filling in the content into the containers//////////////////////////

            logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
            //business_intro.innerHTML="<hr style='border: 1px solid #000;'>"+business_intro_text;
            business_contact.innerHTML="<hr style='border: 1px solid #00f;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email;

            invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>"+bill_type+" Invoice</b></div><hr style='border: 1px solid #00f;'>";

            customer_info.innerHTML="<b>Buyer</b><br>"+customer_name+"<br>Address: "+customer_address;
            business_info.innerHTML="<b>Seller</b><br>"+bt+"<br>Date: "+date+"<br>Invoice No: "+bill_num;

            tandc.innerHTML="<br><b>Terms and Conditions</b><br>"+tandc_text;
            signature.innerHTML=signature_text;

            var table_element=document.getElementById('form332_body');

            /////////////adding new table //////////////////////////////////////////////////////	
            var new_table=document.createElement('table');
            new_table.setAttribute('style','width:100%;font-size:12px;border:1px solid black;text-align:left;padding:2px;');
            var table_header="<tr style='border-top: 1px solid #000000;border-bottom: 1px solid #000000;'>"+
                        "<td style='text-align:left;width:13%;'>Item</td>"+
                        "<td style='text-align:left;width:20%;'>Description</td>"+
                        "<td style='text-align:left;width:10%'>Qty</td>"+
                        "<td style='text-align:left;width:10%'>Rate</td>"+
                        "<td style='text-align:left;width:10%'>Amount</td>"+
                        "<td style='text-align:left;width:10%'>Tax</td>"+
                        "<td style='text-align:left;width:10%'>Total</td></tr>";

            var table_rows=table_header;
            var counter=0;

            $(table_element).find('form').each(function(index)
            {
                counter+=1;
                var form=$(this)[0];
                var item_name=form.elements[0].value;
                var item_desc=form.elements[1].value;
                var batch=form.elements[2].value;
                var quantity=""+form.elements[3].value;
                var price=form.elements[4].value;
                var amount=form.elements[5].value;
                var tax=form.elements[7].value;
                var total=form.elements[8].value;

                table_rows+="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;'>"+
                        "<td style='text-align:left;word-wrap: break-word'>"+item_name+"</td>"+
                        "<td style='text-align:left;word-wrap: break-word'>"+item_desc+"</td>"+
                        "<td style='text-align:left;word-wrap: break-word'>"+quantity+"</td>"+
                        "<td style='text-align:left;word-wrap: break-word'>"+price+"</td>"+
                        "<td style='text-align:left;word-wrap: break-word'>"+amount+"</td>"+
                        "<td style='text-align:left;word-wrap: break-word'>"+tax+"</td>"+
                        "<td style='text-align:left;word-wrap: break-word'>"+total+"</td></tr>";
            });

            var row_count=$(table_element).find('tbody>tr').length;
            var rows_to_add=12-row_count;
            for(var i=0;i<rows_to_add;i++)
            {
                table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            }

            var table_foot=document.getElementById('form332_foot');
            var total_text1=$(table_foot).find('tr>td:first')[0].innerHTML;
            var total_text2=$(table_foot).find('tr>td:nth-child(2)')[0].innerHTML;
            var total_amount=$(table_foot).find('tr>td:nth-child(3)')[0].innerHTML;
            var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
                        "<td colspan='3' style='text-align:left;'>"+total_text1+"</td>"+
                        "<td colspan='2' style='text-align:left;'>"+total_text2+"</td>"+
                        "<td colspan='2' style='text-align:left;'>"+total_amount+"</td></tr>";
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
            footer.appendChild(business_contact);

            func(container);
        }


    </script>
</div>