<div id='form225' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form225_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form225_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form225_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form225_print' onclick=form225_print_form();><i class='fa fa-print'></i> Print</a>
        <a class='btn btn-default btn-sm' id='form225_email'><i class='fa fa-envelope'></i> Email</a>    
      </div>
	</div>
	
	<div class="portlet-body">
        <form id='form225_master' autocomplete="off">
            <fieldset>
                <a class='btn btn-circle btn-icon-only green' title='Add new customer' id='form225_add_customer'><i class='fa fa-plus'></i></a>
                <input type='text' required name='customer' placeholder='Customer' class='floatlabel'>
                <input type='text' name='date' required class='floatlabel' placeholder='Bill Date'>
                <input type='text' name='bill_num' readonly="readonly" class='floatlabel' placeholder='Bill #'>
                <input type='text' required name='bill_type' class='floatlabel' name='Bill Type'>
                <input type='hidden' name='bill_id'>
                <input type='hidden' name='address'>
                <input type='hidden' name='tin'>
                <input type='hidden' name='cst'>
                <input type='submit' class='submit_hidden'>
            </fieldset>
        </form>
        
        <br>
		
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
                    <th>Item</th>
					<th>Batch</th>
					<th>Quantity</th>
					<th>Rate</th>
					<th>Amount</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form225_body'>
			</tbody>
            <tfoot id='form225_foot'>
            </tfoot>
		</table>
    </div>
    
    <script>
        function form225_header_ini()
        {
            var fields=document.getElementById('form225_master');

            var customers_filter=fields.elements['customer'];
            var bill_date=fields.elements['date'];
            var bill_num=fields.elements['bill_num'];
            var bill_id_filter=fields.elements['bill_id'];
            var bill_type=fields.elements['bill_type'];
            var address=fields.elements['address'];
            var tin=fields.elements['tin'];
            var cst=fields.elements['cst'];
            var save_button=document.getElementById('form225_save');
            
            customers_filter.value='';
            bill_id_filter.value=get_new_key();
            address.value="";
            tin.value="";
            cst.value="";
            $(bill_date).datepicker();
            $(bill_date).val(get_my_date());
            
            var type_data={data_store:'bill_types',return_column:'name',
                          indexes:[{index:'status',exact:'active'}]};
            set_my_value_list_json(type_data,bill_type);

            var bill_id=$("#form225_link").attr('data_id');
            if(bill_id==null || bill_id=='')
            {	
                get_single_column_data(function (bill_types) 
                {
                    if(bill_types.length>0)
                    {
                        bill_type.value=bill_types[0];
                        var bill_num_data={data_store:'user_preferences',count:1,return_column:'value',
                                  indexes:[{index:'name',exact:bill_type.value}]};
                        set_my_value_json(bill_num_data,bill_num);	
                    }
                    else 
                    {
                        var bill_num_data={data_store:'user_preferences',count:1,return_column:'value',
                                  indexes:[{index:'name',exact:'bill_num'}]};
                        set_my_value_json(bill_num_data,bill_num);	
                    }
                },type_data);
            }

            $(bill_type).off('blur');
            $(bill_type).on('blur',function (e) 
            {
                var bill_num_data={data_store:'user_preferences',count:1,return_column:'value',
                                  indexes:[{index:'name',exact:bill_type.value}]};
                set_my_value_json(bill_num_data,bill_num);	
            });	

            $(save_button).off('click');
            $(save_button).on("click", function(event)
            {
                event.preventDefault();
                form225_create_form();
            });

            $(fields).off('submit');
            $(fields).on("submit", function(event)
            {
                event.preventDefault();
                form225_add_item();
            });

            var customers_data={data_store:'customers',return_column:'acc_name'};
            set_my_value_list_json(customers_data,customers_filter,function () 
            {
                $(customers_filter).focus();
            });

            var add_customer=document.getElementById('form225_add_customer');
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
                var tin_data={data_store:'attributes',return_column:'value',count:1,
                             indexes:[{index:'attribute',exact:'TIN'},
                                     {index:'name',exact:customers_filter.value}]};
                set_my_value_json(tin_data,tin);

                var cst_data={data_store:'attributes',return_column:'value',count:1,
                             indexes:[{index:'attribute',exact:'CST'},
                                     {index:'name',exact:customers_filter.value}]};
                set_my_value_json(cst_data,cst);
                
                var address_data={data_store:'customers',return_column:'address',count:1,
                             indexes:[{index:'acc_name',exact:customers_filter.value}]};
                set_my_value_json(address_data,address);
            });
        }

        function form225_ini()
        {
            var bill_id=$("#form225_link").attr('data_id');
            if(bill_id==null)
                bill_id="";	

            $('#form225_body').html("");
            $('#form225_foot').html("");

            if(bill_id!="")
            {
                show_loader();
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
                
                read_json_rows('form225',bill_columns,function(bill_results)
                {
                    var filter_fields=document.getElementById('form225_master');

                    if (bill_results.length>0)
                    {
                        filter_fields.elements['customer'].value=bill_results[0].customer_name;
                        filter_fields.elements['date'].value=get_my_past_date(bill_results[0].bill_date);
                        filter_fields.elements['bill_num'].value=bill_results[0].bill_num;
                        filter_fields.elements['bill_id'].value=bill_id;
                        filter_fields.elements['bill_type'].value=bill_results[0].billing_type;
                        var address=filter_fields.elements['address'];
                        var tin=filter_fields.elements['tin'];
                        var cst=filter_fields.elements['cst'];
                        var save_button=document.getElementById('form225_save');
                        
                        var tin_data={data_store:'attributes',return_column:'value',count:1,
                             indexes:[{index:'attribute',exact:'TIN'},
                                     {index:'name',exact:bill_results[0].customer_name}]};
                        set_my_value_json(tin_data,tin);

                        var cst_data={data_store:'attributes',return_column:'value',count:1,
                                     indexes:[{index:'attribute',exact:'CST'},
                                             {index:'name',exact:bill_results[0].customer_name}]};
                        set_my_value_json(cst_data,cst);

                        var address_data={data_store:'customers',return_column:'address',count:1,
                                     indexes:[{index:'acc_name',exact:bill_results[0].customer_name}]};
                        set_my_value_json(address_data,address);

                        $(save_button).off('click');
                        $(save_button).on("click", function(event)
                        {
                            event.preventDefault();
                            form225_update_form();
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
                read_json_rows('form225',bill_items_column,function(results)
                {
                    results.forEach(function(result)
                    {
                        var id=result.id;
                        var rowsHTML="<tr>";
                        rowsHTML+="<form id='form225_"+id+"'></form>";
                            rowsHTML+="<td data-th='Item'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form225_"+id+"' value='"+result.item_name+"'>";
                                rowsHTML+="<br><textarea readonly='readonly' form='form225_"+id+"'>"+result.item_desc+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Batch'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form225_"+id+"' value='"+result.batch+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Quantity'>";
                                rowsHTML+="<input type='number' readonly='readonly' form='form225_"+id+"' value='"+result.quantity+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Rate'>";
                                rowsHTML+="<input type='number' readonly='readonly' form='form225_"+id+"' value='"+result.unit_price+"' step='any'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Amount'>";
                                rowsHTML+="Amount: <input type='number' readonly='readonly' form='form225_"+id+"' step='any' value='"+result.amount+"'>";
                                rowsHTML+="<br>Discount: <input type='number' readonly='readonly' form='form225_"+id+"' step='any' value='"+result.discount+"'>";
                                rowsHTML+="<br>Tax: <input type='number' readonly='readonly' form='form225_"+id+"' step='any' value='"+result.tax+"'>";
                                rowsHTML+="<br>Total: <input type='number' readonly='readonly' form='form225_"+id+"' step='any' value='"+result.total+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form225_"+id+"' value='"+id+"'>";
                                rowsHTML+="<input type='button' class='submit_hidden' form='form225_"+id+"' id='save_form225_"+id+"'>";
                                rowsHTML+="<input type='button' class='delete_icon' form='form225_"+id+"' id='delete_form225_"+id+"' onclick='form225_delete_item($(this));'>";
                            rowsHTML+="</td>";			
                        rowsHTML+="</tr>";

                        $('#form225_body').append(rowsHTML);
                    });

                    var bt=get_session_var('title');
                    $('#form225_share').show();
                    $('#form225_share').click(function()
                    {
                        modal101_action(bt+' - Invoice# '+filter_fields.elements['bill_num'].value,filter_fields.elements['customer'].value,'customer',function (func) 
                        {
                            print_form225(func);
                        });
                    });
                    form225_get_totals();
                    
                    $('#form225').formcontrol();
                    hide_loader();
                });
            }
        }

        function form225_add_item()
        {
            if(is_create_access('form225'))
            {
                var rowsHTML="";
                var id=get_new_key();
                rowsHTML+="<tr>";
                rowsHTML+="<form id='form225_"+id+"' autocomplete='off'></form>";
                    rowsHTML+="<td data-th='Item'>";
                        rowsHTML+="<input type='text' placeholder='Item' required form='form225_"+id+"'>";
                        rowsHTML+="<br><textarea placeholder='Name' required form='form225_"+id+"'></textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Batch'>";
                        rowsHTML+="<input type='text' required form='form225_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Quantity'>";
                        rowsHTML+="<input type='number' required form='form225_"+id+"' step='any'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Rate'>";
                        rowsHTML+="<input type='number' required form='form225_"+id+"' step='any'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Amount'>";
                        rowsHTML+="Amount: <input type='number' readonly='readonly' required form='form225_"+id+"' step='any'>";
                        rowsHTML+="<br>Discount: <input type='number' form='form225_"+id+"' step='any' value='0'>";
                        rowsHTML+="<br>Tax: <input type='number' required readonly='readonly' form='form225_"+id+"' step='any'>";
                        rowsHTML+="<br>Total: <input type='number' required readonly='readonly' required form='form225_"+id+"' step='any'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form225_"+id+"' value='"+id+"'>";
                        rowsHTML+="<input type='button' class='submit_hidden' form='form225_"+id+"' id='save_form225_"+id+"' >";
                        rowsHTML+="<input type='button' class='delete_icon' form='form225_"+id+"' id='delete_form225_"+id+"' onclick='$(this).parent().parent().remove(); form225_get_totals();'>";
                        rowsHTML+="<input type='submit' class='submit_hidden' form='form225_"+id+"'>";
                        rowsHTML+="<input type='hidden' form='form225_"+id+"' name='tax_rate'>";
                    rowsHTML+="</td>";			
                rowsHTML+="</tr>";

                $('#form225_body').prepend(rowsHTML);

                var filter_fields=document.getElementById('form225_master');
                var bill_type=filter_fields.elements['bill_type'].value;

                var fields=document.getElementById("form225_"+id);
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
                    form225_create_item(fields);
                });

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form225_add_item();
                });

                var product_data="<attributes>" +
                        "<name></name>" +
                        "<type exact='yes'>product</type>"+
                        "<value exact='yes'>yes</value>"+
                        "<attribute exact='yes'>manufactured</attribute>"+
                        "</attributes>";			
                set_my_value_list(product_data,name_filter,function () 
                {
                    $(name_filter).focus();
                }); 

                $(name_filter).on('blur',function(event)
                {
                    var batch_data="<product_instances>"+
                                    "<batch></batch>"+
                                    "<product_name exact='yes'>"+name_filter.value+"</product_name>"+
                                    "</product_instances>";
                    set_my_value_list(batch_data,batch_filter);

                    var master_data="<product_master>" +
                                "<description></description>"+
                                "<name exact='yes'>"+name_filter.value+"</name>" +
                                "<tax></tax>" +
                                "</product_master>";
                    fetch_requested_data('',master_data,function (products) 
                    {
                        if(products.length>0)
                        {
                            if(bill_type=='Retail-CST')
                            {
                                tax_rate_filter.value=get_session_var('cst_rate');
                            }
                            else
                            {
                                tax_rate_filter.value=products[0].tax;
                            }
                            desc_filter.value=products[0].description;
                        }
                    });

                    var last_batch_data="<bill_items count='1'>"+
                                        "<batch></batch>"+
                                        "<item_name exact='yes'>"+name_filter.value+"</item_name>"+
                                        "</bill_items>";
                    set_my_value(last_batch_data,batch_filter,function () 
                    {					
                        var price_data="<product_instances count='1'>" +
                                "<sale_price></sale_price>" +
                                "<product_name exact='yes'>"+name_filter.value+"</product_name>" +
                                "</product_instances>";
                        set_my_value(price_data,price_filter);

                        get_inventory(name_filter.value,'',function(quantity)
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
                });

                $(batch_filter).on('blur',function(event)
                {
                    var price_data="<product_instances count='1'>" +
                            "<sale_price></sale_price>" +
                            "<product_name exact='yes'>"+name_filter.value+"</product_name>" +
                            "</product_instances>";
                    set_my_value(price_data,price_filter);

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

                form225_get_totals();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form225_create_item(form)
        {
            if(is_create_access('form225'))
            {
                var bill_id=document.getElementById("form225_master").elements['bill_id'].value;
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
                var save_button=form.elements[10];
                var del_button=form.elements[11];

                var data_xml="<bill_items>" +
                        "<id>"+data_id+"</id>" +
                        "<item_name>"+name+"</item_name>" +
                        "<item_desc>"+desc+"</item_desc>" +
                        "<batch>"+batch+"</batch>" +
                        "<quantity>"+quantity+"</quantity>" +
                        "<unit_price>"+price+"</unit_price>" +
                        "<amount>"+amount+"</amount>" +
                        "<total>"+total+"</total>" +
                        "<discount>"+discount+"</discount>" +
                        "<tax>"+tax+"</tax>" +
                        "<bill_id>"+bill_id+"</bill_id>" +
                        "<last_updated>"+last_updated+"</last_updated>" +
                        "</bill_items>";		
                create_simple(data_xml);

                for(var i=0;i<9;i++)
                {
                    $(form.elements[i]).attr('readonly','readonly');
                }

                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form225_delete_item(del_button);
                });

                $(save_button).off('click');
            }
            else
            {
                $("#modal2_link").click();
            }
        }


        /**
         * @form Create Bill (CPS)
         * @param button
         */
        function form225_create_form()
        {
            if(is_create_access('form225'))
            {
                var form=document.getElementById("form225_master");

                var customer=form.elements['customer'].value;
                var bill_date=get_raw_time(form.elements['date'].value);
                var bill_num=form.elements['bill_num'].value;
                var bill_type=form.elements['bill_type'].value;

                var data_id=form.elements['bill_id'].value;
                var transaction_id=form.elements['t_id'].value;
                var save_button=form.elements['save'];

                var bt=get_session_var('title');
                $('#form225_share').show();
                $('#form225_share').click(function()
                {
                    modal101_action(bt+' - Invoice# '+bill_num,customer,'customer',function (func) 
                    {
                        print_form225(func);
                    });
                });

                var amount=0;
                var discount=0;
                var tax=0;
                var total=0;
                var total_quantity=0;

                $("[id^='save_form225']").each(function(index)
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

                var data_xml="<bills>" +
                            "<id>"+data_id+"</id>" +
                            "<customer_name>"+customer+"</customer_name>" +
                            "<bill_num>"+bill_num+"</bill_num>"+
                            "<billing_type>"+bill_type+"</billing_type>"+
                            "<bill_date>"+bill_date+"</bill_date>" +
                            "<amount>"+amount+"</amount>" +
                            "<total>"+total+"</total>" +
                            "<discount>"+discount+"</discount>" +
                            "<tax>"+tax+"</tax>" +
                            "<transaction_id>"+transaction_id+"</transaction_id>" +
                            "<last_updated>"+last_updated+"</last_updated>" +
                            "</bills>";
                var activity_xml="<activity>" +
                            "<data_id>"+data_id+"</data_id>" +
                            "<tablename>bills</tablename>" +
                            "<link_to>form42</link_to>" +
                            "<title>Saved</title>" +
                            "<notes>Bill no "+bill_num+"</notes>" +
                            "<updated_by>"+get_name()+"</updated_by>" +
                            "</activity>";
                var transaction_xml="<transactions>" +
                            "<id>"+transaction_id+"</id>" +
                            "<trans_date>"+get_my_time()+"</trans_date>" +
                            "<amount>"+total+"</amount>" +
                            "<receiver>"+customer+"</receiver>" +
                            "<giver>master</giver>" +
                            "<tax>"+tax+"</tax>" +
                            "<last_updated>"+last_updated+"</last_updated>" +
                            "</transactions>";
                var pt_tran_id=get_new_key();
                var payment_xml="<payments>" +
                            "<id>"+pt_tran_id+"</id>" +
                            "<status>closed</status>" +
                            "<type>received</type>" +
                            "<date>"+get_my_time()+"</date>" +
                            "<total_amount>"+total+"</total_amount>" +
                            "<paid_amount>"+total+"</paid_amount>" +
                            "<acc_name>"+customer+"</acc_name>" +
                            "<due_date>"+get_credit_period()+"</due_date>" +
                            "<mode>"+get_payment_mode()+"</mode>" +
                            "<transaction_id>"+pt_tran_id+"</transaction_id>" +
                            "<source_id>"+data_id+"</source_id>" +
                            "<source>sale bill</source>" +
                            "<source_info>"+bill_num+"</source_info>"+
                            "<last_updated>"+last_updated+"</last_updated>" +
                            "</payments>";
                var pt_xml="<transactions>" +
                            "<id>"+pt_tran_id+"</id>" +
                            "<trans_date>"+get_my_time()+"</trans_date>" +
                            "<amount>"+total+"</amount>" +
                            "<receiver>master</receiver>" +
                            "<giver>"+customer+"</giver>" +
                            "<tax>0</tax>" +
                            "<last_updated>"+last_updated+"</last_updated>" +
                            "</transactions>";
                var num_data="<user_preferences>"+
                            "<id></id>"+						
                            "<name exact='yes'>"+bill_type+"_bill_num</name>"+												
                            "</user_preferences>";
                get_single_column_data(function (bill_num_ids)
                {
                    if(bill_num_ids.length>0)
                    {
                        var num_xml="<user_preferences>"+
                                        "<id>"+bill_num_ids[0]+"</id>"+
                                        "<value>"+(parseInt(bill_num)+1)+"</value>"+
                                        "<last_updated>"+last_updated+"</last_updated>"+
                                        "</user_preferences>";
                        update_simple(num_xml);

                    }
                },num_data);
                create_row(data_xml,activity_xml);
                create_simple(transaction_xml);
                create_simple(pt_xml);
                create_simple_func(payment_xml,function()
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
                $('#form225_foot').html(total_row);

                $(save_button).off('click');
                $(save_button).on('click',function(event)
                {
                    event.preventDefault();
                    form225_update_form();
                });

                $("[id^='save_form225_']").click();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form225_update_form()
        {
            if(is_create_access('form225'))
            {
                var form=document.getElementById("form225_master");

                var customer=form.elements['customer'].value;
                var bill_date=get_raw_time(form.elements['date'].value);
                var bill_num=form.elements['bill_num'].value;
                var bill_type=form.elements['bill_type'].value;
                var data_id=form.elements['bill_id'].value;
                var transaction_id=form.elements['t_id'].value;

                var bt=get_session_var('title');
                $('#form225_share').show();
                $('#form225_share').click(function()
                {
                    modal101_action(bt+' - Invoice# '+bill_num,customer,'customer',function (func) 
                    {
                        print_form225(func);
                    });
                });

                var amount=0;
                var discount=0;
                var tax=0;
                var total=0;

                var total_quantity=0;

                $("[id^='save_form225']").each(function(index)
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

                var data_xml="<bills>" +
                            "<id>"+data_id+"</id>" +
                            "<customer_name>"+customer+"</customer_name>" +
                            "<bill_date>"+bill_date+"</bill_date>" +
                            "<amount>"+amount+"</amount>" +
                            "<total>"+total+"</total>" +
                            "<discount>"+discount+"</discount>" +
                            "<tax>"+tax+"</tax>" +
                            "<last_updated>"+last_updated+"</last_updated>" +
                            "<transaction_id>"+transaction_id+"</transaction_id>" +
                            "</bills>";
                var activity_xml="<activity>" +
                            "<data_id>"+data_id+"</data_id>" +
                            "<tablename>bills</tablename>" +
                            "<link_to>form42</link_to>" +
                            "<title>Updated</title>" +
                            "<notes>Bill no "+bill_num+"</notes>" +
                            "<updated_by>"+get_name()+"</updated_by>" +
                            "</activity>";
                var transaction_xml="<transactions>" +
                            "<id>"+transaction_id+"</id>" +
                            "<trans_date>"+get_my_time()+"</trans_date>" +
                            "<amount>"+total+"</amount>" +
                            "<receiver>"+customer+"</receiver>" +
                            "<giver>master</giver>" +
                            "<tax>"+tax+"</tax>" +
                            "<last_updated>"+last_updated+"</last_updated>" +
                            "</transactions>";
                update_row(data_xml,activity_xml);
                update_simple(transaction_xml);

                var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
                        "<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
                        "<td>Rs. "+amount+"</br>" +
                        "Rs. "+discount+"</br>" +
                        "Rs. "+tax+"</br>" +
                        "Rs. "+total+"</td>" +
                        "<td></td>" +
                        "</tr>";
                $('#form225_foot').html(total_row);

                var payment_data="<payments>" +
                        "<id></id>" +
                        "<bill_id exact='yes'>"+data_id+"</bill_id>" +
                        "</payments>";
                get_single_column_data(function(payments)
                {
                    for(var y in payments)
                    {
                        var payment_xml="<payments>" +
                                    "<id>"+payments[y]+"</id>" +
                                    "<type>received</type>" +
                                    "<total_amount>"+total+"</total_amount>" +
                                    "<acc_name>"+customer+"</acc_name>" +
                                    "<transaction_id>"+payments[y]+"</transaction_id>" +
                                    "<bill_id>"+data_id+"</bill_id>" +
                                    "<last_updated>"+last_updated+"</last_updated>" +
                                    "</payments>";
                        var pt_xml="<transactions>" +
                                    "<id>"+payments[y]+"</id>" +
                                    "<amount>"+total+"</amount>" +
                                    "<receiver>master</receiver>" +
                                    "<giver>"+customer+"</giver>" +
                                    "<tax>0</tax>" +
                                    "<last_updated>"+last_updated+"</last_updated>" +
                                    "</transactions>";
                        update_simple_func(payment_xml,function()
                        {
                            modal26_action(payments[y]);
                        });
                        break;
                    }
                },payment_data);

                $("[id^='save_form225_']").click();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form225_delete_item(button)
        {
            if(is_delete_access('form225'))
            {
                modal115_action(function()
                {
                    var bill_id=document.getElementById("form225_master").elements['bill_id'].value;

                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);
                    var data_id=form.elements[9].value;

                    var data_xml="<bill_items>" +
                            "<id>"+data_id+"</id>" +
                            "<bill_id>"+bill_id+"</bill_id>" +
                            "</bill_items>";	
                    delete_simple(data_xml);
                    $(button).parent().parent().remove();
                    form225_get_totals();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form225_get_totals()
        {
            var amount=0;
            var tax=0;
            var discount=0;	
            var total=0;
            var total_quantity=0;

            $("[id^='save_form225']").each(function(index)
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

            var form=document.getElementById("form225_master");

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

            $('#form225_foot').html(total_row);
        }

        function form225_print_form()
        {	
            print_form225(function(container)
            {
                $.print(container);
                container.innerHTML="";	
            });	
        }

        /**
        * This function prepares the printing template for the documents like bills and purchase orders
        */
        function print_form225(func)
        {
            var form_id='form225';
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
            info_section.setAttribute('style','width:100%;min-height:80px');
                customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
                business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
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

            var master_form=document.getElementById(form_id+'_master');
            var customer_name=master_form.elements['customer'].value;
            var date=master_form.elements['date'].value;	
            var bill_num=master_form.elements['bill_num'].value;
            var bill_type=master_form.elements['bill_type'].value;
            var vat_no=get_session_var('vat');

            var tandc_text=get_session_var('bill_message');
            var signature_text="<br>"+bt+"<br><br><br>Auth. Signatory<br>";

            ////////////////filling in the content into the containers//////////////////////////

            logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
            //business_intro.innerHTML="<hr style='border: 1px solid #000;'>"+business_intro_text;
            business_contact.innerHTML="<hr style='border: 1px solid #00f;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email;

            invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>Invoice</b></div><hr style='border: 1px solid #00f;'>";

            customer_info.innerHTML="<b>To</b><br>"+customer_name+"<br>Bill Type: "+bill_type;
            business_info.innerHTML="VAT #: "+vat_no+"<br>Date: "+date+"<br>Invoice No: "+bill_num;

            tandc.innerHTML="<br><b>Terms and Conditions</b><br>"+tandc_text;
            signature.innerHTML=signature_text;

            var table_element=document.getElementById(form_id+'_body');

            /////////////adding new table //////////////////////////////////////////////////////	
            var new_table=document.createElement('table');
            new_table.setAttribute('style','width:100%;font-size:11px;border:1px solid black;text-align:left;');
            var table_header="<tr style='border-top: 1px solid #000000;border-bottom: 1px solid #000000;'>"+
                        "<td style='text-align:left;width:13%;'>Item</td>"+
                        "<td style='text-align:left;width:20%;'>Description</td>"+
                        //"<td style='text-align:left;width:13%;'>Batch</td>"+
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
                        //"<td style='text-align:left;word-wrap: break-word'>"+batch+"</td>"+
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
                table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            }

            var table_foot=document.getElementById(form_id+'_foot');
            var total_text1=$(table_foot).find('tr>td:first')[0].innerHTML;
            var total_text2=$(table_foot).find('tr>td:nth-child(2)')[0].innerHTML;
            var total_amount=$(table_foot).find('tr>td:nth-child(3)')[0].innerHTML;
            //console.log(total_amount);
            var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
                        "<td colspan='3' style='text-align:left;'>"+total_text1+"</td>"+
                        "<td colspan='3' style='text-align:left;'>"+total_text2+"</td>"+
                        "<td colspan='2' style='text-align:left;'>"+total_amount+"</td></tr>";
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

            footer.appendChild(tandc);
            footer.appendChild(signature);

            func(container);
        }


    </script>
</div>