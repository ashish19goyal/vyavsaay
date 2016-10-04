<div id='form333' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form333_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form333_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form333_print' onclick=form333_print_form();><i class='fa fa-print'></i> Print</a>
      </div>
	</div>
	
	<div class="portlet-body">
        <form id='form333_master' autocomplete="off">
            <fieldset>
                <label><div class='btn-overlap'><input type='text' required name='supplier' placeholder='Supplier' class='floatlabel'><button type='button' title='Add new supplier' class='btn btn-icon-only default right-overlap' id='form333_add_supplier'><i class='fa fa-plus'></i></button></div></label>
                <label><input type='text' name='bill_num' class='floatlabel' placeholder='Bill #'></label>
                </label>
                <label><input type='text' class='floatlabel' requried placeholder='Bill Date' name='bill_date'></label>
                <label><input type='text' required class='floatlabel' placeholder='Entry Date' name='entry_date'></label>
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
					<th>Rate</th>
					<th>Amount</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form333_body'>
			</tbody>
            <tfoot id='form333_foot'>
            </tfoot>
		</table>
    </div>
	
    <script>
        function form333_header_ini()
        {
            var fields=document.getElementById('form333_master');

            var supplier_filter=fields.elements['supplier'];
            fields.elements['bill_num'].value="";
            var bill_date=fields.elements['bill_date'];
            var entry_date=fields.elements['entry_date'];
            fields.elements['id'].value=get_my_time();
            var save_button=document.getElementById('form333_save');

            $(save_button).off('click');
            $(save_button).on("click", function(event)
            {
                event.preventDefault();
                form333_create_form();
            });

            $(document).off('keydown');
            $(document).on('keydown', function(event) 
            {
                if( event.keyCode == 83 && event.ctrlKey) 
                {
                    event.preventDefault();
                    $(save_button).trigger('click');
                }
            });

            $(fields).off('submit');
            $(fields).on('submit',function(event)
            {
                event.preventDefault();
                form333_add_item();
            });

            var suppliers_data={data_store:'suppliers',return_column:'acc_name'};
            set_my_value_list_json(suppliers_data,supplier_filter,function () 
            {
                $(supplier_filter).focus();
            });

            var add_supplier=document.getElementById('form333_add_supplier');
            $(add_supplier).off('click');
            $(add_supplier).on('click',function()
            {
                modal13_action(function()
                {	
                    var suppliers_data={data_store:'suppliers',return_column:'acc_name'};
                    set_my_value_list_json(suppliers_data,supplier_filter,function () 
                    {
                        $(supplier_filter).focus();
                    });
                });
            });

            $(bill_date).datepicker();
            bill_date.value=vTime.date();

            $(entry_date).datepicker();
            entry_date.value=vTime.date();

            supplier_filter.value='';
            $('#form333').formcontrol();
        }

        function form333_ini()
        {
            var bill_id=$("#form333_link").attr('data_id');
            if(bill_id==null)
                bill_id="";	

            $('#form333_body').html("");
            $('#form333_foot').html("");

            if(bill_id!="")
            {
                show_loader();
                var filter_fields=document.getElementById('form333_master');
                var bill_columns={data_store:'supplier_bills',count:1,
                                 indexes:[{index:'id',value:bill_id},
                                         {index:'bill_id'},
                                         {index:'supplier'},
                                         {index:'total'},
                                         {index:'amount'},
                                         {index:'discount'},
                                         {index:'tax'},
                                         {index:'bill_date'},
                                         {index:'entry_date'}]};
                read_json_rows('form333',bill_columns,function(bill_results)
                {
                    if (bill_results.length>0)
                    {
                        filter_fields.elements['supplier'].value=bill_results[0].supplier;
                        filter_fields.elements['bill_num'].value=bill_results[0].bill_id;
                        filter_fields.elements['bill_date'].value=get_my_past_date(bill_results[0].bill_date);
                        filter_fields.elements['entry_date'].value=get_my_past_date(bill_results[0].entry_date);
                        filter_fields.elements['id'].value=bill_id;
                        var save_button=document.getElementById('form333_save');

                        $(save_button).off('click');
                        $(save_button).on("click", function(event)
                        {
                            event.preventDefault();
                            form333_update_form();
                        });
                    }
                });

                var bill_items_column={data_store:'supplier_bill_items',
                                      indexes:[{index:'id'},
                                              {index:'product_name'},
                                              {index:'batch'},
                                              {index:'amount'},
                                              {index:'tax'},
                                              {index:'total'},
                                              {index:'unit_price'},
                                              {index:'quantity'},
                                              {index:'storage'},
                                              {index:'bill_id',exact:bill_id}]};
                        
                read_json_rows('form333',bill_items_column,function(results)
                {
                    results.forEach(function(result)
                    {
                        var id=result.id;
                        var rowsHTML="<tr>";
                        rowsHTML+="<form id='form333_"+id+"'></form>";
                            rowsHTML+="<td data-th='Item'>";
                                rowsHTML+="<a onclick=\"show_object('product_master','"+result.product_name+"');\"><textarea readonly='readonly' form='form333_"+id+"'>"+result.product_name+"</textarea></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Batch'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form333_"+id+"' value='"+result.batch+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Quantity'>";
                                rowsHTML+="<input type='number' readonly='readonly' form='form333_"+id+"' value='"+result.quantity+"' step='any'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Rate'>";
                                rowsHTML+="<input type='number' placeholder='Price' readonly='readonly' form='form333_"+id+"' value='"+result.unit_price+"' step='any'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Amount'>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' readonly='readonly' form='form333_"+id+"' value='"+result.amount+"' step='any'>";
                                rowsHTML+="<input type='number' readonly='readonly' class='floatlabel' placeholder='Tax' form='form333_"+id+"' value='"+result.tax+"' step='any'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form333_"+id+"' value='"+id+"'>";
                                rowsHTML+="<input type='submit' class='submit_hidden' form='form333_"+id+"' id='save_form333_"+id+"'>";
                                rowsHTML+="<button type='button' class='btn red' form='form333_"+id+"' id='delete_form333_"+id+"' onclick='form333_delete_item($(this));'><i class='fa fa-trash' title='Delete' name='delete'></i></button>";
                            rowsHTML+="</td>";			
                        rowsHTML+="</tr>";

                        $('#form333_body').append(rowsHTML);

                        var fields=document.getElementById("form333_"+id);
                        $(fields).on("submit", function(event)
                        {
                            event.preventDefault();
                        });
                    });
                    form333_get_totals();
                    
                    $('#form333').formcontrol();
                    hide_loader();
                });
            }
        }

        function form333_add_item()
        {
            if(is_create_access('form333'))
            {
                var master_form=document.getElementById('form333_master');
                var supplier_name=master_form.elements['supplier'].value;
                var bill_id=master_form.elements['id'].value;

                var id=vUtil.newKey();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form333_"+id+"' autocomplete='off'></form>";
                    rowsHTML+="<td data-th='Item'>";
                        rowsHTML+="<input type='text' placeholder='Item' required form='form333_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Batch'><div class='btn-overlap'>";
                        rowsHTML+="<input type='text' placeholder='Batch' form='form333_"+id+"'>";
                        rowsHTML+="<button class='btn btn-icon-only default right-overlap' id='form333_add_batch_"+id+"' title='Add new Batch'><i class='fa fa-plus'></i></button></div>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Quantity'>";
                        rowsHTML+="<input type='number' placeholder='Quantity' form='form333_"+id+"' step='any'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Rate'>";
                        rowsHTML+="<input placeholder='Unit Price' type='number' form='form333_"+id+"' step='any'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Amount'>";
                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' readonly='readonly' form='form333_"+id+"' value='' step='any'>";
                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Tax' required form='form333_"+id+"' step='any'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form333_"+id+"' value='"+id+"'>";
                        rowsHTML+="<input type='button' class='submit_hidden' form='form333_"+id+"' id='save_form333_"+id+"' >";
                        rowsHTML+="<button type='button' class='btn red' form='form333_"+id+"' name='delete' title='Delete' id='delete_form333_"+id+"' onclick='$(this).parent().parent().remove(); form333_get_totals();'><i class='fa fa-trash'></i></button>";
                        rowsHTML+="<input type='hidden' form='form333_"+id+"' step='any' name='tax_unit'>";
                        rowsHTML+="<input type='submit' class='submit_hidden' form='form333_"+id+"'>";
                    rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form333_body').prepend(rowsHTML);

                var fields=document.getElementById("form333_"+id);
                var name_filter=fields.elements[0];
                var batch_filter=fields.elements[1];
                var quantity_filter=fields.elements[2];
                var unit_filter=fields.elements[3];
                var amount_filter=fields.elements[4];
                var tax_filter=fields.elements[5];
                var id_filter=fields.elements[6];
                var save_button=fields.elements[7];
                var tax_unit_filter=fields.elements[9];
                
                $(save_button).on("click", function(event)
                {
                    event.preventDefault();
                    form333_create_item(fields);
                });

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form333_add_item();
                });
                
                var add_batch=document.getElementById('form333_add_batch_'+id);
                $(add_batch).on('click',function()
                {
                    modal204_action(function()
                    {	
                        var batch_data={data_store:'product_instances',return_column:'batch',
                                       indexes:[{index:name_filter.value}]};
                        set_my_value_list_json(batch_data,batch_filter);
                    });
                });
		
                var product_data={data_store:'product_master',return_column:'name'};
                set_my_value_list_json(product_data,name_filter,function () 
                {
                    $(name_filter).focus();
                });

                $(name_filter).on('blur',function(event)
                {
                    var tax_unit_data={data_store:'product_master',return_column:'tax',
                                      indexes:[{index:'name',exact:name_filter.value}]};
                    set_my_value_json(tax_unit_data,tax_unit_filter);
                    
                    var batch_data={data_store:'product_instances',return_column:'batch',
                                   indexes:[{index:'product_name',exact:name_filter.value}]};
                    set_my_value_list_json(batch_data,batch_filter);
                });
                
                $(quantity_filter).on('blur',function(event)
                {
                    amount_filter.value=vUtil.round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
                    tax_filter.value=vUtil.round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);
                });

                ////////////////////////////////////

                $(unit_filter).on('blur',function () 
                {
                    amount_filter.value=vUtil.round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
                    tax_filter.value=vUtil.round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);

                });

                form333_get_totals();
                $('#form333').formcontrol();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form333_create_item(form)
        {
            if(is_create_access('form333'))
            {
                var bill_id=document.getElementById("form333_master").elements['id'].value;
                var supplier=document.getElementById("form333_master").elements['supplier'].value;
                var entry_date=get_raw_time(document.getElementById("form333_master").elements['entry_date'].value);

                var name=form.elements[0].value;
                var batch=form.elements[1].value;
                var quantity=form.elements[2].value;
                var price=form.elements[3].value;
                var amount=form.elements[4].value;
                var tax=form.elements[5].value;
                var total=parseFloat(tax)+parseFloat(amount);

                var storage=get_session_var('user_setting_Store');
                var data_id=form.elements[6].value;
                var save_button=form.elements[7];
                var del_button=form.elements[8];

                var last_updated=get_my_time();

                var data_json={data_store:'supplier_bill_items',
	 				data:[{index:'id',value:data_id},
	 					{index:'product_name',value:name},
	 					{index:'batch',value:batch},
	 					{index:'quantity',value:quantity},
                        {index:'total',value:total},
                        {index:'tax',value:tax},
                        {index:'amount',value:amount},
                        {index:'unit_price',value:price},
                        {index:'bill_id',value:bill_id},
                        {index:'storage',value:storage},
                        {index:'last_updated',value:last_updated}]};
 				create_json(data_json);

                $(form).readonly();
                
                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form333_delete_item(del_button);
                });

                $(save_button).off('click');

                ///////////adding store placement////////
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
                                {index:'item_name',value:name},
                                {index:'batch',value:batch},
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

        function form333_create_form()
        {
            if(is_create_access('form333'))
            {
                var form=document.getElementById("form333_master");

                var supplier=form.elements['supplier'].value;
                var bill_id=form.elements['bill_num'].value;
                var bill_date=get_raw_time(form.elements['bill_date'].value);
                var entry_date=get_raw_time(form.elements['entry_date'].value);
                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();

                var total=0;
                var tax=0;
                var amount=0;
                var total_quantity=0;

                $("[id^='save_form333']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    if(!isNaN(parseFloat(subform.elements[4].value)))
                        amount+=parseFloat(subform.elements[4].value);
                    if(!isNaN(parseFloat(subform.elements[5].value)))
                        tax+=parseFloat(subform.elements[5].value);
                    if(!isNaN(parseFloat(subform.elements[2].value)))
                        total_quantity+=parseFloat(subform.elements[2].value);
                });

                amount=vUtil.round(amount,2);
                tax=vUtil.round(tax,2);
                total=amount+tax;
                total=vUtil.round(total,0);

                var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
                        "<td>Amount:</br>Tax: </br>Total: </td>" +
                        "<td>Rs. "+amount+"</br>" +
                        "Rs. "+tax+"</br>" +
                        "Rs. "+total+"</td>" +
                        "<td></td>" +
                        "</tr>";
                $('#form333_foot').html(total_row);

                var data_json={data_store:'supplier_bills',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
                        {index:'bill_id',value:bill_id},
                        {index:'supplier',value:supplier},
                        {index:'bill_date',value:bill_date},  
	 					{index:'entry_date',value:entry_date},
	 					{index:'total',value:total},
	 					{index:'amount',value:amount},
                        {index:'tax',value:tax},
                        {index:'transaction_id',value:data_id},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Saved',notes:'Purchase Bill # '+bill_id,link_to:'form53'}};

                var transaction_json={data_store:'transactions',
                            data:[{index:'id',value:data_id},
                                {index:'trans_date',value:last_updated},
                                {index:'amount',value:total},
                                {index:'receiver',value:'master'},
                                {index:'giver',value:supplier},
                                {index:'tax',value:(-tax)},
                                {index:'last_updated',value:last_updated}]};
 				
                var pt_tran_id=vUtil.newKey();
                
                var payment_json={data_store:'payments',
                            data:[{index:'id',value:pt_tran_id},
                                {index:'status',value:'pending'},
                                {index:'type',value:'paid'},
                                {index:'date',value:last_updated},
                                {index:'total_amount',value:total},
                                {index:'paid_amount',value:'0'},
                                {index:'acc_name',value:supplier},
                                {index:'due_date',value:get_debit_period()},
                                {index:'mode',value:get_payment_mode()},
                                {index:'transaction_id',value:pt_tran_id},
                                {index:'source_id',value:data_id},
                                {index:'source',value:'purchase bill'},
                                {index:'source_info',value:bill_id},  
                                {index:'last_updated',value:last_updated}]};
 				
                var pt_json={data_store:'transactions',
                            data:[{index:'id',value:pt_tran_id},
                                {index:'trans_date',value:last_updated},
                                {index:'amount',value:total},
                                {index:'giver',value:'master'},
                                {index:'receiver',value:supplier},
                                {index:'tax',value:'0'},
                                {index:'last_updated',value:last_updated}]};
 				
                create_json(data_json);
                create_json(transaction_json);
                create_json(pt_json);
                create_json(payment_json,function()
                {
                    modal28_action(pt_tran_id);
                });

                var save_button=document.getElementById('form333_save');
                $(save_button).off('click');
                $(save_button).on('click',function(event)
                {
                    event.preventDefault();
                    form333_update_form();
                });

                $("[id^='save_form333_']").click();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form333_update_form()
        {
            if(is_update_access('form333'))
            {
                var form=document.getElementById("form333_master");

                var supplier=form.elements['supplier'].value;
                var bill_id=form.elements['bill_num'].value;
                var bill_date=get_raw_time(form.elements['bill_date'].value);
                var entry_date=get_raw_time(form.elements['entry_date'].value);
                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();

                var total=0;
                var tax=0;
                var amount=0;
                var total_quantity=0;

                $("[id^='save_form333']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    if(!isNaN(parseFloat(subform.elements[4].value)))
                        amount+=parseFloat(subform.elements[4].value);
                    if(!isNaN(parseFloat(subform.elements[5].value)))
                        tax+=parseFloat(subform.elements[5].value);
                    if(!isNaN(parseFloat(subform.elements[2].value)))
                        total_quantity+=parseFloat(subform.elements[2].value);
                });

                amount=vUtil.round(amount,2);
                tax=vUtil.round(tax,2);

                total=amount+tax;
                total=vUtil.round(total,0);

                var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
                        "<td>Amount:</br>Tax: </br>Total: </td>" +
                        "<td>Rs. "+amount+"</br>" +
                        "Rs. "+tax+"</br>" +
                        "Rs. "+total+"</td>" +
                        "<td></td>" +
                        "</tr>";
                $('#form333_foot').html(total_row);

                var data_json={data_store:'supplier_bills',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
                        {index:'bill_id',value:bill_id},
                        {index:'supplier',value:supplier},
                        {index:'bill_date',value:bill_date},  
	 					{index:'entry_date',value:entry_date},
	 					{index:'total',value:total},
	 					{index:'amount',value:amount},
                        {index:'tax',value:tax},
                        {index:'transaction_id',value:data_id},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Purchase Bill # '+bill_id,link_to:'form53'}};
 				
                var transaction_json={data_store:'transactions',
                            data:[{index:'id',value:data_id},
                                {index:'trans_date',value:last_updated},
                                {index:'amount',value:total},
                                {index:'receiver',value:'master'},
                                {index:'giver',value:supplier},
                                {index:'tax',value:(-tax)},
                                {index:'last_updated',value:last_updated}]};
 				
                update_json(data_json);
                update_json(transaction_json);

                var payment_data={data_store:'payments',return_column:'id',
                                 indexes:[{index:'source_id',exact:data_id}]};
                read_json_single_column(payment_data,function(payments)
                {
                    if(payments.length>0)
                    {
                        var payment_json={data_store:'payments',
                            data:[{index:'id',value:payments[0]},
                                {index:'type',value:'paid'},
                                {index:'total_amount',value:total},
                                {index:'acc_name',value:supplier},
                                {index:'transaction_id',value:payments[0]},
                                {index:'source_id',value:data_id},
                                {index:'source',value:'purchase bill'},
                                {index:'source_info',value:bill_id},  
                                {index:'last_updated',value:last_updated}]};
 				
                        var pt_json={data_store:'transactions',
                            data:[{index:'id',value:payments[0]},
                                {index:'amount',value:total},
                                {index:'giver',value:'master'},
                                {index:'receiver',value:supplier},
                                {index:'tax',value:'0'},
                                {index:'last_updated',value:last_updated}]};
 				       update_json(pt_json);
                       update_json(payment_json,function()
                       {
                           console.log('opening payment');
                           modal28_action(payments[0]);
                       });
                    }
                });

                $("[id^='save_form333_']").click();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form333_delete_item(button)
        {
            if(is_delete_access('form333'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var data_id=form.elements[6].value;
                    var data_json={data_store:'supplier_bill_items',
                                   data:[{index:'id',value:data_id}]};
                    var return_json={data_store:'supplier_return_items',
                                   data:[{index:'id',value:data_id}]};

                    delete_json(data_json);
                    delete_json(return_json);

                    $(button).parent().parent().remove();
                    form333_get_totals();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form333_get_totals()
        {
            var total=0;
            var tax=0;
            var amount=0;
            var total_quantity=0;

            $("[id^='save_form333']").each(function(index)
            {
                var subform_id=$(this).attr('form');
                var subform=document.getElementById(subform_id);

                if(!isNaN(parseFloat(subform.elements[4].value)))
                    amount+=parseFloat(subform.elements[4].value);
                if(!isNaN(parseFloat(subform.elements[5].value)))
                    tax+=parseFloat(subform.elements[5].value);
                if(!isNaN(parseFloat(subform.elements[2].value)))
                    total_quantity+=parseFloat(subform.elements[2].value);
            });

            amount=vUtil.round(amount,2);
            tax=vUtil.round(tax,2);
            total=amount+tax;

            var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
                        "<td>Amount:</br>Tax: </br>Total: </td>" +
                        "<td>Rs. "+amount+"</br>" +
                        "Rs. "+tax+"</br>" +
                        "Rs. "+total+"</td>" +
                        "<td></td>" +
                        "</tr>";

            $('#form333_foot').html(total_row);
        }

        function form333_print_form(id)
        {
            print_form333(function(container)
            {
                $.print(container);
                container.innerHTML="";	
            });	
        }

        function print_form333(func)
        {
            var form_id='form333';
            ////////////setting up containers///////////////////////	
            var container=document.createElement('div');
            var header=document.createElement('div');
                var logo=document.createElement('div');
                var business_intro=document.createElement('div');
                var business_contact=document.createElement('div');

            var invoice_line=document.createElement('div');

            var info_section=document.createElement('div');	
                var customer_info=document.createElement('div');
                var business_info=document.createElement('div');

            var table_container=document.createElement('div');

            var footer=document.createElement('div');
                var tandc=document.createElement('div');
                var signature=document.createElement('div');

        ////////////setting styles for containers/////////////////////////

            header.setAttribute('style','width:100%;min-height:100px;text-align:center');
                business_intro.setAttribute('style','width:100%;text-align:center');
                business_contact.setAttribute('style','width:100%;text-align:center');
            info_section.setAttribute('style','width:100%;min-height:100px');
                customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:46%;height:100px;border: 1px solid #00f;border-radius:5px;');
                business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:46%;height:100px;border: 1px solid #00f;border-radius:5px;');
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

            var master_form=document.getElementById(form_id+'_master');
            var supplier_name=master_form.elements['supplier'].value;
            var date=master_form.elements['bill_date'].value;	
            var bill_no=master_form.elements['bill_num'].value;
            var vat_no=get_session_var('vat');

            var signature_text="<br>"+bt+"<br><br><br>Auth. Signatory<br>";

            ////////////////filling in the content into the containers//////////////////////////

            logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
            business_contact.innerHTML="<hr style='border: 1px solid #00f;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email;

            invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>Purchase Bill</b></div><hr style='border: 1px solid #00f;'>";

            business_info.innerHTML="VAT #: "+vat_no;
            customer_info.innerHTML=supplier_name+"<br>Date: "+date+"<br>Bill #: "+bill_no;

            signature.innerHTML=signature_text;

            var table_element=document.getElementById(form_id+'_body');

            /////////////adding new table //////////////////////////////////////////////////////	
            var new_table=document.createElement('table');
            new_table.setAttribute('style','width:100%;font-size:13px;border:1px solid black;text-align:left;');
            var table_header="<tr style='border-top: 1px solid #000000;border-bottom: 1px solid #000000;'>"+
                        "<td style='text-align:left;width:25%;'>Item</td>"+
                        "<td style='text-align:left;width:20%;'>Batch</td>"+
                        "<td style='text-align:left;width:10%'>Quantity</td>"+
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
                var batch=form.elements[1].value;
                var quantity=""+form.elements[2].value;
                var price=form.elements[3].value;
                var amount=form.elements[4].value;
                var tax=form.elements[5].value;
                var total=parseFloat(amount)+parseFloat(tax);

                table_rows+="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;'>"+
                        "<td style='text-align:left;'>"+item_name+"</td>"+
                        "<td style='text-align:left;'>"+batch+"</td>"+
                        "<td style='text-align:left;'>"+quantity+"</td>"+
                        "<td style='text-align:left;'>"+price+"</td>"+
                        "<td style='text-align:left;'>"+amount+"</td>"+
                        "<td style='text-align:left;'>"+tax+"</td>"+
                        "<td style='text-align:left;'>"+total+"</td></tr>";
            });

            var row_count=$(table_element).find('tbody>tr').length;
            var rows_to_add=12-row_count;
            for(var i=0;i<rows_to_add;i++)
            {
                table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            }

            var table_foot=document.getElementById(form_id+'_foot');
            var total_text1=$(table_foot).find('tr>td:first')[0].innerHTML;
            var total_text2=$(table_foot).find('tr>td:nth-child(2)')[0].innerHTML;
            var total_amount=$(table_foot).find('tr>td:nth-child(3)')[0].innerHTML;
            //console.log(total_amount);
            var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
                        "<td colspan='2' style='text-align:left;'>"+total_text1+"</td>"+
                        "<td colspan='4' style='text-align:left;'>"+total_text2+"</td>"+
                        "<td colspan='1' style='text-align:left;'>"+total_amount+"</td></tr>";
            //console.log(table_foot_row);
            table_rows+=table_foot_row;
            new_table.innerHTML=table_rows;

            /////////////placing the containers //////////////////////////////////////////////////////	

            container.appendChild(header);
            container.appendChild(invoice_line);
            container.appendChild(info_section);

            container.appendChild(new_table);
            container.appendChild(footer);

            header.appendChild(logo);
            //header.appendChild(business_intro);
            header.appendChild(business_contact);

            info_section.appendChild(customer_info);
            info_section.appendChild(business_info);

            footer.appendChild(signature);

            func(container);
        }
    </script>
</div>