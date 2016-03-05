<div id='form225' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form225_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form225_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form225_print' onclick=form225_print_form();><i class='fa fa-print'></i> Print</a>
        <a class='btn btn-default btn-sm' id='form225_share'><i class='fa fa-envelope'></i> Email</a>    
      </div>
	</div>
	
	<div class="portlet-body">
        <form id='form225_master' autocomplete="off">
            <fieldset>
                <label><div class='btn-overlap'><input type='text' required name='supplier' placeholder='Supplier' class='floatlabel'><button type='button' title='Add new supplier' class='btn btn-icon-only default right-overlap' id='form225_add_supplier'><i class='fa fa-plus'></i></button></div></label>
                <label><input type='text' name='bill_num' class='floatlabel' placeholder='Bill #'></label>
                <label><input type='text' name='po_num' readonly='readonly' class='floatlabel' placeholder='PO #'></label>
                <label><input type='text' class='floatlabel' requried placeholder='Bill Date' name='bill_date'></label>
                <label><input type='text' required class='floatlabel' placeholder='Entry Date' name='entry_date'></label>
			    <input type='hidden' name='id'>
                <input type='hidden' name='order_id'>
                <input type='submit' class='submit_hidden'>
            </fieldset>
        </form>
        
        <br>
		
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr style='color:#9a9a9a;'>
                    <th>Item</th>
					<th>Batch</th>
					<th>Bill Details</th>
					<th>PO Details</th>
					<th>Storage</th>
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
        function form136_header_ini()
        {
            var fields=document.getElementById('form136_master');

            var supplier_filter=fields.elements['supplier'];
            fields.elements['bill_num'].value="";
            var bill_date=fields.elements['bill_date'];
            var entry_date=fields.elements['entry_date'];
            fields.elements['po_num'].value="";
            fields.elements['id'].value=get_my_time();
            fields.elements['order_id'].value="";
            var save_button=document.getElementById('form136_save');

            $(save_button).off('click');
            $(save_button).on("click", function(event)
            {
                event.preventDefault();
                form136_create_form();
            });

            $(document).off('keydown');
            $(document).on('keydown', function(event) {
                if( event.keyCode == 83 && event.ctrlKey) {
                    event.preventDefault();
                    $(save_button).trigger('click');
                }
            });

            $(fields).off('submit');
            $(fields).on('submit',function(event)
            {
                event.preventDefault();
                form136_add_item();
            });

            var suppliers_data={data_store:'suppliers',return_column:'acc_name'};
            set_my_value_list_json(suppliers_data,supplier_filter,function () 
            {
                $(supplier_filter).focus();
            });

            var add_supplier=document.getElementById('form136_add_supplier');
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
            $(bill_date).val(get_my_date());

            $(entry_date).datepicker();
            $(entry_date).val(get_my_date());

            supplier_filter.value='';
        }

        function form136_ini()
        {
            var bill_id=$("#form136_link").attr('data_id');
            if(bill_id==null)
                bill_id="";	

            $('#form136_body').html("");
            $('#form136_foot').html("");

            if(bill_id!="")
            {
                show_loader();
                var bill_columns={data_store:'supplier_bills',count:1,
                                 indexes:[{index:'id',value:bill_id},
                                         {index:'bill_id'},
                                         {index:'supplier'},
                                         {index:'total'},
                                         {index:'amount'},
                                         {index:'discount'},
                                         {index:'tax'},
                                         {index:'bill_date'},
                                         {index:'entry_date'},
                                         {index:'order_id'},
                                         {index:'order_num'}]};
                read_json_rows('form136',bill_columns,function(bill_results)
                {
                    if (bill_results.length>0)
                    {
                        var filter_fields=document.getElementById('form136_master');
                        filter_fields.elements['supplier'].value=bill_results[0].supplier;
                        filter_fields.elements['bill_num'].value=bill_results[0].bill_id;
                        filter_fields.elements['bill_date'].value=get_my_past_date(bill_results[0].bill_date);
                        filter_fields.elements['entry_date'].value=get_my_past_date(bill_results[0].entry_date);
                        filter_fields.elements['id'].value=bill_id;
                        filter_fields.elements['order_id'].value=bill_results[0].order_id;
                        filter_fields.elements['po_num'].value=bill_results[0].order_num;
                        var save_button=document.getElementById('form136_save');

                        $(save_button).off('click');
                        $(save_button).on("click", function(event)
                        {
                            event.preventDefault();
                            form136_update_form();
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
                                              {index:'po_price'},
                                              {index:'po_amount'},
                                              {index:'po_tax'},
                                              {index:'quantity'},
                                              {index:'storage'},
                                              {index:'qc'},
                                              {index:'bill_id',exact:bill_id}]};
                        
                read_json_rows('form136',bill_items_column,function(results)
                {
                    results.forEach(function(result)
                    {
                        var id=result.id;
                        var rowsHTML="<tr>";
                        rowsHTML+="<form id='form136_"+id+"'></form>";
                            rowsHTML+="<td data-th='Item'>";
                                rowsHTML+="<a onclick=\"show_object('product_master','"+result.product_name+"');\"><textarea readonly='readonly' form='form136_"+id+"'>"+result.product_name+"</textarea></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Batch'><div class='btn-overlap'>";
                                rowsHTML+="<input type='text' class='floatlabel' placeholder='Batch' readonly='readonly' form='form136_"+id+"' value='"+result.batch+"'>";
                                rowsHTML+="<button class='btn btn-icon-only default right-overlap' title='Print Barcode' onclick=\"print_product_barcode('"+id+"','"+result.product_name+"','"+result.batch+"');\"><i class='fa fa-barcode'></i></button></div>";                    
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Quantity' readonly='readonly' form='form136_"+id+"' value='"+result.quantity+"' step='any'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Bill Price'>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Unit Price' readonly='readonly' form='form136_"+id+"' value='"+result.unit_price+"' step='any'>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' readonly='readonly' form='form136_"+id+"' value='"+result.amount+"' step='any'>";
                                rowsHTML+="<input type='number' readonly='readonly' class='floatlabel' placeholder='Tax' form='form136_"+id+"' value='"+result.tax+"' step='any'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='PO Price'>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Unit Price' readonly='readonly' form='form136_"+id+"' value='"+result.po_price+"' step='any'>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' readonly='readonly' form='form136_"+id+"' value='"+result.po_amount+"' step='any'>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Tax' readonly='readonly' form='form136_"+id+"' value='"+result.po_tax+"' step='any'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Storage Area'>";
                                rowsHTML+="<a onclick=\"show_object('store_areas','"+result.storage+"');\"><input type='text' readonly='readonly' form='form136_"+id+"' value='"+result.storage+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                if(result.qc=='accepted')
                                {						
                                    rowsHTML+=" <i id='form136_check_image_"+id+"' class='fa fa-check' title='Accepted' data-accepted='accepted'></i>";
                                }else {
                                    rowsHTML+=" <i id='form136_check_image_"+id+"' class='fa fa-cross' title='Rejected' data-accepted='rejected'></i>";
                                }
                                rowsHTML+="<input type='hidden' form='form136_"+id+"' value='"+id+"'>";
                                rowsHTML+="<input type='submit' class='submit_hidden' form='form136_"+id+"' id='save_form136_"+id+"'>";
                                rowsHTML+="<button type='button' class='btn red' form='form136_"+id+"' id='delete_form136_"+id+"' onclick='form136_delete_item($(this));'><i class='fa fa-trash' title='Delete' name='delete'></i></button>";
                            rowsHTML+="</td>";			
                        rowsHTML+="</tr>";

                        $('#form136_body').append(rowsHTML);

                        var fields=document.getElementById("form136_"+id);
                        $(fields).on("submit", function(event)
                        {
                            event.preventDefault();
                        });
                    });
                    form136_get_totals();
                    hide_loader();
                });
            }
        }

        function form136_add_item()
        {
            if(is_create_access('form136'))
            {
                var master_form=document.getElementById('form136_master');
                var supplier_name=master_form.elements['supplier'].value;
                var order_id=master_form.elements['order_id'].value;
                var bill_id=master_form.elements['id'].value;

                var id=get_new_key();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form136_"+id+"' autocomplete='off'></form>";
                    rowsHTML+="<td data-th='Item'>";
                        rowsHTML+="<input type='text' required form='form136_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Batch'>";
                        rowsHTML+="<input type='text' readonly='readonly' required form='form136_"+id+"'></br>";
                        rowsHTML+="<img src='./images/barcode.png' class='barcode_icon' title='Print Barcode - "+id+"' id='form136_barcode_"+id+"'>";
                        rowsHTML+="<br><b>Quantity</b>: <input type='number' step='any' required form='form136_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Bill Price'>";
                        rowsHTML+="<input class='floatlabel' placeholder='Unit Price' type='number' form='form136_"+id+"' step='any'>";
                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' readonly='readonly' form='form136_"+id+"' value='' step='any'>";
                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Tax' required form='form136_"+id+"' step='any'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='PO Price'>";
                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Unit Price' readonly='readonly' form='form136_"+id+"' step='any'>";
                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' readonly='readonly' form='form136_"+id+"' value='' step='any'>";
                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Tax' readonly='readonly' required form='form136_"+id+"' step='any'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Storage Area'>";
                        rowsHTML+="<input type='text' form='form136_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+=" <i id='form136_check_image_"+id+"' class='fa fa-check' title='Accepted' data-accepted='accepted'></i>";
                        rowsHTML+="<input type='hidden' form='form136_"+id+"' value='"+id+"'>";
                        rowsHTML+="<input type='button' class='submit_hidden' form='form136_"+id+"' id='save_form136_"+id+"' >";
                        rowsHTML+="<button type='button' class='btn red' form='form136_"+id+"' name='delete' title='Delete' id='delete_form136_"+id+"' onclick='$(this).parent().parent().remove(); form136_get_totals();'><i class='fa fa-trash></i></button>";
                        rowsHTML+="<input type='hidden' form='form136_"+id+"' step='any' name='tax_unit'>";
                        rowsHTML+="<input type='hidden' form='form136_"+id+"' step='any' name='po_tax_unit'>";
                        rowsHTML+="<input type='submit' class='submit_hidden' form='form136_"+id+"'>";
                    rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form136_body').prepend(rowsHTML);

                var fields=document.getElementById("form136_"+id);
                var name_filter=fields.elements[0];
                var batch_filter=fields.elements[1];
                var quantity_filter=fields.elements[2];
                var unit_filter=fields.elements[3];
                var amount_filter=fields.elements[4];
                var tax_filter=fields.elements[5];

                var po_unit_filter=fields.elements[6];
                var po_amount_filter=fields.elements[7];
                var po_tax_filter=fields.elements[8];

                var storage_filter=fields.elements[9];
                var id_filter=fields.elements[10];
                var save_button=fields.elements[11];
                var tax_unit_filter=fields.elements[13];
                var po_tax_rate_filter=fields.elements[14];

                batch_filter.value=String(bill_id).substr(1,8);

                var qc_image=document.getElementById('form136_check_image_'+id);
                $(qc_image).on('click',function(event)
                {
                    if(qc_image.getAttribute('data-accepted')=='rejected')
                    {
                        qc_image.setAttribute('class','fa fa-check');
                        qc_image.setAttribute('data-accepted','accepted');							
                        qc_image.setAttribute('title','Accepted');							
                    }
                    else
                    {
                        qc_image.setAttribute('class','fa fa-cross');			
                        qc_image.setAttribute('data-accepted','rejected');
                        qc_image.setAttribute('title','Rejected');							
                    }
                });

                var barcode_filter=document.getElementById("form136_barcode_"+id);
                $(barcode_filter).on('click',function () 
                {
                    print_product_barcode(String(id),name_filter.value,batch_filter.value);
                });

                $(save_button).on("click", function(event)
                {
                    event.preventDefault();
                    form136_create_item(fields);
                });

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form136_add_item();
                });

                var product_data="<attributes>" +
                            "<name></name>" +
                            "<type exact='yes'>product</type>"+
                            "<value exact='yes'>yes</value>"+
                            "<attribute exact='yes'>raw material</attribute>"+
                            "</attributes>";
                set_my_value_list_func(product_data,name_filter,function () 
                {
                    $(name_filter).focus();
                });

                var storage_data="<store_areas>" +
                            "<name></name>" +
                            "<owner></owner>"+					
                            "<area_type exact='yes'>storage</area_type>" +
                            "</store_areas>";
                fetch_requested_data('',storage_data,function(storages) 
                {
                    var form=fields;
                    var datalist=document.createElement('datalist');
                    var element_array=[];
                    storages.forEach(function(d)
                    {
                        var option=document.createElement('option');
                        option.setAttribute('value',d.name);
                        element_array.push(d.name);
                        datalist.appendChild(option);
                        if(d.owner==get_account_name())
                        {
                            storage_filter.value=d.name;
                        }
                    });

                    var list_id=storage_filter.getAttribute('list');
                    if(list_id=='' || list_id==null)
                    {
                        list_id="list_"+get_new_key();
                        storage_filter.setAttribute("list",list_id);
                    }
                    else
                    {
                        var oldlist=document.getElementById(list_id);
                        form.removeChild(oldlist);
                    }

                    form.appendChild(datalist);
                    datalist.setAttribute('id',list_id);

                    $(storage_filter).off("change");
                    $(storage_filter).on("change",function(event)
                    {
                        var found = $.inArray($(this).val(), element_array) > -1;
                        if(!found)
                        {
                            $(this).val('');
                        }
                    });
                });

                set_my_value_list_func(storage_data,storage_filter,function()
                {
                    var store_value_data="<store_areas count='1'>" +
                        "<name></name>" +
                        "<owner>"+get_account_name()+"</owner>"+
                        "<area_type exact='yes'>storage</area_type>" +
                        "</store_areas>";
                    set_my_value(store_value_data,storage_filter);
                });

                $(name_filter).on('blur',function(event)
                {
                    var po_item_data="<purchase_order_items>"+
                                    "<item_name exact='yes'>"+name_filter.value+"</item_name>"+
                                    "<quantity></quantity>"+
                                    "<price></price>"+
                                    "<amount></amount>"+
                                    "<tax></tax>"+
                                    "<tax_rate></tax_rate>"+
                                    "<order_id exact='yes'>"+order_id+"</order_id>"+
                                    "</purchase_order_items>";
                    fetch_requested_data('',po_item_data,function(po_items)
                    {
                        if(po_items.length>0)
                        {
                            po_unit_filter.value=po_items[0].price;
                            po_amount_filter.value=po_items[0].price;
                            po_tax_rate_filter.value=po_items[0].tax_rate;
                            po_tax_filter.value=parseFloat(po_items[0].tax_rate)*parseFloat(po_items[0].price)/100;					
                        }
                        else 
                        {
                            po_unit_filter.value="";
                            po_amount_filter.value="";
                            po_tax_rate_filter.value="";
                            po_tax_filter.value="";					
                        }
                    });		

                    var tax_unit_data="<product_master>"+
                                    "<tax></tax>"+
                                    "<name exact='yes'>"+name_filter.value+"</name>"+
                                    "</product_master>";
                    set_my_value(tax_unit_data,tax_unit_filter);

                });

                $(quantity_filter).on('blur',function(event)
                {
                    amount_filter.value=my_round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
                    tax_filter.value=my_round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);

                    po_amount_filter.value=parseFloat(po_unit_filter.value)*parseFloat(quantity_filter.value);
                    po_tax_filter.value=parseFloat(po_tax_rate_filter.value)*parseFloat(po_amount_filter.value)/100;				
                });

                ////////////////////////////////////

                $(unit_filter).on('blur',function () 
                {
                    amount_filter.value=my_round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
                    tax_filter.value=my_round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);

                });

                form136_get_totals();
                $('textarea').autosize();

            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form136_create_item(form)
        {
            if(is_create_access('form136'))
            {
                var bill_id=document.getElementById("form136_master").elements['id'].value;
                var supplier=document.getElementById("form136_master").elements['supplier'].value;
                var entry_date=get_raw_time(document.getElementById("form136_master").elements['entry_date'].value);

                var name=form.elements[0].value;
                var batch=form.elements[1].value;
                var quantity=form.elements[2].value;
                var price=form.elements[3].value;
                var amount=form.elements[4].value;
                var tax=form.elements[5].value;
                var total=parseFloat(tax)+parseFloat(amount);

                var po_unit=form.elements[6].value;
                var po_amount=form.elements[7].value;
                var po_tax=form.elements[8].value;

                var storage=form.elements[9].value;
                var data_id=form.elements[10].value;
                var save_button=form.elements[11];
                var del_button=form.elements[12];

                var qc=document.getElementById('form136_check_image_'+data_id).getAttribute('data-accepted');
                var last_updated=get_my_time();

                var data_xml="<supplier_bill_items>" +
                        "<id>"+data_id+"</id>" +
                        "<product_name>"+name+"</product_name>" +
                        "<batch>"+batch+"</batch>" +
                        "<quantity>"+quantity+"</quantity>" +
                        "<total>"+total+"</total>" +
                        "<tax>"+tax+"</tax>" +
                        "<amount>"+amount+"</amount>" +
                        "<unit_price>"+price+"</unit_price>" +
                        "<po_tax>"+po_tax+"</po_tax>" +
                        "<po_amount>"+po_amount+"</po_amount>" +
                        "<po_price>"+po_unit+"</po_price>" +
                        "<bill_id>"+bill_id+"</bill_id>" +
                        "<storage>"+storage+"</storage>" +
                        "<qc>"+qc+"</qc>"+
                        "<last_updated>"+last_updated+"</last_updated>" +
                        "</supplier_bill_items>";	
                var batch_xml="<product_instances>" +
                        "<id>"+data_id+"</id>" +
                        "<product_name>"+name+"</product_name>" +
                        "<batch>"+batch+"</batch>" +
                        "<manufacture_date></manufacture_date>" +
                        "<last_updated>"+last_updated+"</last_updated>" +
                        "</product_instances>";
                create_simple(batch_xml);
                create_simple(data_xml);

                if(qc=='rejected')
                {
                    var return_xml="<supplier_returns>" +
                            "<id>"+bill_id+"</id>" +
                            "<supplier>"+supplier+"</supplier>" +
                            "<return_date>"+entry_date+"</return_date>" +
                            "<last_updated>"+last_updated+"</last_updated>" +
                            "</supplier_returns>";

                    var return_data_xml="<supplier_return_items>" +
                                "<id>"+data_id+"</id>" +
                                "<return_id>"+bill_id+"</return_id>"+					
                                "<item_name>"+name+"</item_name>" +
                                "<batch>"+batch+"</batch>" +
                                "<quantity>"+quantity+"</quantity>" +
                                "<storage>"+storage+"</storage>"+
                                "<last_updated>"+last_updated+"</last_updated>" +
                                "</supplier_return_items>";

                    create_simple(return_data_xml);
                    create_simple_no_warning(return_xml);
                }

                for(var i=0;i<10;i++)
                {
                    $(form.elements[i]).attr('readonly','readonly');
                }

                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form136_delete_item(del_button);
                });

                $(save_button).off('click');

                ///////////adding store placement////////
                var storage_data="<area_utilization>" +
                        "<id></id>" +
                        "<name exact='yes'>"+storage+"</name>" +
                        "<item_name exact='yes'>"+name+"</item_name>" +
                        "<batch exact='yes'>"+batch+"</batch>" +
                        "</area_utilization>";
                fetch_requested_data('',storage_data,function(placements)
                {
                    if(placements.length===0)
                    {
                        var storage_xml="<area_utilization>" +
                                "<id>"+get_new_key()+"</id>" +
                                "<name>"+storage+"</name>" +
                                "<item_name>"+name+"</item_name>" +
                                "<batch>"+batch+"</batch>" +
                                "<last_updated>"+get_my_time()+"</last_updated>" +
                                "</area_utilization>";
                        create_simple(storage_xml);
                    }
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }


        /**
         * @form Enter supplier Bill (wholesale)
         * @param button
         */
        function form136_create_form()
        {
            if(is_create_access('form136'))
            {
                var form=document.getElementById("form136_master");

                var supplier=form.elements['supplier'].value;
                var bill_id=form.elements['bill_num'].value;
                var bill_date=get_raw_time(form.elements['bill_date'].value);
                var entry_date=get_raw_time(form.elements['entry_date'].value);
                var order_id=form.elements['order_id'].value;
                var order_num=form.elements['po_num'].value;
                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();

                var total=0;
                var tax=0;
                var amount=0;
                var total_quantity=0;

                $("[id^='save_form136']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    var qc_id=subform.elements[10].value;
                    var qc=document.getElementById('form136_check_image_'+qc_id).getAttribute('data-accepted');

                    if(qc=='accepted')
                    {
                        if(!isNaN(parseFloat(subform.elements[4].value)))
                            amount+=parseFloat(subform.elements[4].value);
                        if(!isNaN(parseFloat(subform.elements[5].value)))
                            tax+=parseFloat(subform.elements[5].value);
                        if(!isNaN(parseFloat(subform.elements[2].value)))
                            total_quantity+=parseFloat(subform.elements[2].value);
                    }
                });

                amount=my_round(amount,2);
                tax=my_round(tax,2);

                total=amount+tax;
                total=my_round(total,0);

                var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
                        "<td>Amount:</br>Tax: </br>Total: </td>" +
                        "<td>Rs. "+amount+"</br>" +
                        "Rs. "+tax+"</br>" +
                        "Rs. "+total+"</td>" +
                        "<td></td>" +
                        "</tr>";
                $('#form136_foot').html(total_row);


                var data_xml="<supplier_bills>" +
                            "<id>"+data_id+"</id>" +
                            "<bill_id>"+bill_id+"</bill_id>" +
                            "<order_id>"+order_id+"</order_id>" +
                            "<order_num>"+order_num+"</order_num>" +
                            "<supplier>"+supplier+"</supplier>" +
                            "<bill_date>"+bill_date+"</bill_date>" +
                            "<entry_date>"+entry_date+"</entry_date>" +
                            "<total>"+total+"</total>" +
                            "<amount>"+amount+"</amount>" +
                            "<tax>"+tax+"</tax>" +
                            "<transaction_id>"+data_id+"</transaction_id>" +
                            "<last_updated>"+last_updated+"</last_updated>" +
                            "</supplier_bills>";
                var activity_xml="<activity>" +
                            "<data_id>"+data_id+"</data_id>" +
                            "<tablename>supplier_bills</tablename>" +
                            "<link_to>form53</link_to>" +
                            "<title>Saved</title>" +
                            "<notes>Purchase Bill # "+bill_id+"</notes>" +
                            "<updated_by>"+get_name()+"</updated_by>" +
                            "</activity>";

                var po_data="<purchase_orders>"+
                            "<id>"+order_id+"</id>" +
                            "<bill_id></bill_id>" +
                            "<total_quantity></total_quantity>"+
                            "<quantity_received></quantity_received>"+
                            "</purchase_orders>";
                fetch_requested_data('',po_data,function (porders) 
                {
                    if(porders.length>0)
                    {
                        var id_object_array=[];
                        if(porders[0].bill_id!="" && porders[0].bill_id!=0 && porders[0].bill_id!="null")
                        {
                            id_object_array=JSON.parse(porders[0].bill_id);
                        }

                        var id_object=new Object();
                        id_object.bill_num=bill_id;
                        id_object.bill_id=data_id;
                        id_object.total_received=total_quantity;

                        id_object_array.push(id_object);

                        var quantity_received=0;

                        for(var x in id_object_array)
                        {
                            quantity_received+=parseFloat(id_object_array[x].total_received);
                        }

                        if(porders[0].quantity_received=="" || porders[0].quantity_received=='null')
                        {
                            porders[0].quantity_received=0;
                        }

                        if(parseFloat(porders[0].quantity_received)>quantity_received)
                        {
                            quantity_received=parseFloat(porders[0].quantity_received);
                        }

                        var status='partially received';				
                        if(parseFloat(porders[0].total_quantity)<=quantity_received)
                        {
                            status='completely received';
                        }

                        var new_bill_id=JSON.stringify(id_object_array);
                        //console.log(new_bill_id);
                        var po_xml="<purchase_orders>" +
                                "<id>"+order_id+"</id>" +
                                "<bill_id>"+new_bill_id+"</bill_id>" +
                                "<quantity_received>"+quantity_received+"</quantity_received>"+
                                "<status>"+status+"</status>" +
                                "<last_updated>"+last_updated+"</last_updated>" +
                                "</purchase_orders>";
                        update_simple(po_xml);
                    }
                });


                var transaction_xml="<transactions>" +
                            "<id>"+data_id+"</id>" +
                            "<trans_date>"+get_my_time()+"</trans_date>" +
                            "<amount>"+total+"</amount>" +
                            "<receiver>master</receiver>" +
                            "<giver>"+supplier+"</giver>" +
                            "<tax>"+(-tax)+"</tax>" +
                            "<last_updated>"+last_updated+"</last_updated>" +
                            "</transactions>";
                var pt_tran_id=get_new_key();
                var payment_xml="<payments>" +
                            "<id>"+pt_tran_id+"</id>" +
                            "<status>pending</status>" +
                            "<type>paid</type>" +
                            "<date>"+get_my_time()+"</date>" +
                            "<total_amount>"+total+"</total_amount>" +
                            "<paid_amount>0</paid_amount>" +
                            "<acc_name>"+supplier+"</acc_name>" +
                            "<due_date>"+get_debit_period()+"</due_date>" +
                            "<mode>"+get_payment_mode()+"</mode>" +
                            "<transaction_id>"+pt_tran_id+"</transaction_id>" +
                            "<source_id>"+data_id+"</source_id>" +
                            "<source>purchase bill</source>" +
                            "<source_info>"+bill_id+"</source_info>"+
                            "<last_updated>"+last_updated+"</last_updated>" +
                            "</payments>";
                var pt_xml="<transactions>" +
                            "<id>"+pt_tran_id+"</id>" +
                            "<trans_date>"+get_my_time()+"</trans_date>" +
                            "<amount>"+total+"</amount>" +
                            "<receiver>"+supplier+"</receiver>" +
                            "<giver>master</giver>" +
                            "<tax>0</tax>" +
                            "<last_updated>"+last_updated+"</last_updated>" +
                            "</transactions>";
                create_row(data_xml,activity_xml);
                create_simple(transaction_xml);
                create_simple(pt_xml);
                create_simple_func(payment_xml,function()
                {
                    modal28_action(pt_tran_id);
                });

                var save_button=form.elements['save'];
                $(save_button).off('click');
                $(save_button).on('click',function(event)
                {
                    event.preventDefault();
                    form136_update_form();
                });

                $("[id^='save_form136_']").click();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form136_update_form()
        {
            if(is_update_access('form136'))
            {
                var form=document.getElementById("form136_master");

                var supplier=form.elements['supplier'].value;
                var bill_id=form.elements['bill_num'].value;
                var bill_date=get_raw_time(form.elements['bill_date'].value);
                var entry_date=get_raw_time(form.elements['entry_date'].value);
                var order_id=form.elements['order_id'].value;
                var order_num=form.elements['po_num'].value;
                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();

                var total=0;
                var tax=0;
                var amount=0;
                var total_quantity=0;

                $("[id^='save_form136']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    var qc_id=subform.elements[10].value;
                    var qc=document.getElementById('form136_check_image_'+qc_id).getAttribute('data-accepted');

                    if(qc=='accepted')
                    {
                        if(!isNaN(parseFloat(subform.elements[4].value)))
                            amount+=parseFloat(subform.elements[4].value);
                        if(!isNaN(parseFloat(subform.elements[5].value)))
                            tax+=parseFloat(subform.elements[5].value);
                        if(!isNaN(parseFloat(subform.elements[2].value)))
                            total_quantity+=parseFloat(subform.elements[2].value);
                    }	
                });

                amount=my_round(amount,2);
                tax=my_round(tax,2);

                total=amount+tax;
                total=my_round(total,0);

                var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
                        "<td>Amount:</br>Tax: </br>Total: </td>" +
                        "<td>Rs. "+amount+"</br>" +
                        "Rs. "+tax+"</br>" +
                        "Rs. "+total+"</td>" +
                        "<td></td>" +
                        "</tr>";
                $('#form136_foot').html(total_row);

                var data_xml="<supplier_bills>" +
                            "<id>"+data_id+"</id>" +
                            "<bill_id>"+bill_id+"</bill_id>" +
                            "<supplier>"+supplier+"</supplier>" +
                            "<bill_date>"+bill_date+"</bill_date>" +
                            "<entry_date>"+entry_date+"</entry_date>" +
                            "<total>"+total+"</total>" +
                            "<amount>"+amount+"</amount>" +
                            "<tax>"+tax+"</tax>" +
                            "<transaction_id>"+data_id+"</transaction_id>" +
                            "<last_updated>"+last_updated+"</last_updated>" +
                            "</supplier_bills>";
                var activity_xml="<activity>" +
                            "<data_id>"+data_id+"</data_id>" +
                            "<tablename>supplier_bills</tablename>" +
                            "<link_to>form53</link_to>" +
                            "<title>Updated</title>" +
                            "<notes>Purchase Bill # "+data_id+"</notes>" +
                            "<updated_by>"+get_name()+"</updated_by>" +
                            "</activity>";

                var po_data="<purchase_orders>"+
                            "<id>"+order_id+"</id>" +
                            "<bill_id></bill_id>" +
                            "<total_quantity></total_quantity>"+
                            "<quantity_received></quantity_received>"+
                            "</purchase_orders>";
                fetch_requested_data('',po_data,function (porders) 
                {
                    if(porders.length>0)
                    {
                        var id_object_array=[];
                        if(porders[0].bill_id!="" && porders[0].bill_id!=0 && porders[0].bill_id!="null")
                        {
                            id_object_array=JSON.parse(porders[0].bill_id);
                        }

                        for(var k in id_object_array)
                        {
                            if(id_object_array[k].bill_id==data_id)
                            {
                                id_object_array[k].bill_num=bill_id;
                                id_object_array[k].total_received=total_quantity;
                                break;
                            }
                        }

                        var quantity_received=0;

                        for(var x in id_object_array)
                        {
                            quantity_received+=parseFloat(id_object_array[x].total_received);
                        }

                        if(porders[0].quantity_received=="" || porders[0].quantity_received=='null')
                        {
                            porders[0].quantity_received=0;
                        }

                        if(parseFloat(porders[0].quantity_received)>quantity_received)
                        {
                            quantity_received=parseFloat(porders[0].quantity_received);
                        }

                        var status='partially received';				
                        if(parseFloat(porders[0].total_quantity)<=quantity_received)
                        {
                            status='completely received';
                        }

                        var new_bill_id=JSON.stringify(id_object_array);

                        var po_xml="<purchase_orders>" +
                                "<id>"+order_id+"</id>" +
                                "<bill_id>"+new_bill_id+"</bill_id>" +
                                "<quantity_received>"+quantity_received+"</quantity_received>"+
                                "<status>"+status+"</status>" +
                                "<last_updated>"+last_updated+"</last_updated>" +
                                "</purchase_orders>";
                        update_simple(po_xml);
                    }
                });

                var transaction_xml="<transactions>" +
                            "<id>"+data_id+"</id>" +
                            "<trans_date>"+get_my_time()+"</trans_date>" +
                            "<amount>"+total+"</amount>" +
                            "<receiver>master</receiver>" +
                            "<giver>"+supplier+"</giver>" +
                            "<tax>"+(-tax)+"</tax>" +
                            "<last_updated>"+last_updated+"</last_updated>" +
                            "</transactions>";
                update_row(data_xml,activity_xml);
                update_simple(transaction_xml);

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
                                    "<type>paid</type>" +
                                    "<total_amount>"+total+"</total_amount>" +
                                    "<acc_name>"+supplier+"</acc_name>" +
                                    "<transaction_id>"+payments[y]+"</transaction_id>" +
                                    "<bill_id>"+data_id+"</bill_id>" +
                                    "<last_updated>"+last_updated+"</last_updated>" +
                                    "</payments>";
                        var pt_xml="<transactions>" +
                                    "<id>"+payments[y]+"</id>" +
                                    "<amount>"+total+"</amount>" +
                                    "<receiver>"+supplier+"</receiver>" +
                                    "<giver>master</giver>" +
                                    "<tax>0</tax>" +
                                    "<last_updated>"+last_updated+"</last_updated>" +
                                    "</transactions>";
                        update_simple_func(payment_xml,function()
                        {
                            modal28_action(payments[y]);
                        });
                        break;
                    }
                },payment_data);

                $("[id^='save_form136_']").click();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form136_delete_item(button)
        {
            if(is_delete_access('form136'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var data_id=form.elements[10].value;
                    var data_json={data_store:'supplier_bill_items',
                                   data:[{index:'id',value:data_id}]};
                    var batch_json={data_store:'product_instances',
                                   data:[{index:'id',value:data_id}]};
                    var return_json={data_store:'supplier_return_items',
                                   data:[{index:'id',value:data_id}]};

                    delete_json(data_json);
                    delete_json(batch_json);
                    delete_json(return_json);

                    $(button).parent().parent().remove();
                    form136_get_totals();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form136_get_totals()
        {
            var total=0;
            var tax=0;
            var amount=0;
            var total_quantity=0;

            $("[id^='save_form136']").each(function(index)
            {
                var subform_id=$(this).attr('form');
                var subform=document.getElementById(subform_id);

                var qc_id=subform.elements[10].value;
                var qc=document.getElementById('form136_check_image_'+qc_id).getAttribute('data-accepted');

                if(qc=='accepted')
                {
                    if(!isNaN(parseFloat(subform.elements[4].value)))
                        amount+=parseFloat(subform.elements[4].value);
                    if(!isNaN(parseFloat(subform.elements[5].value)))
                        tax+=parseFloat(subform.elements[5].value);
                    if(!isNaN(parseFloat(subform.elements[2].value)))
                        total_quantity+=parseFloat(subform.elements[2].value);
                }
            });

            amount=my_round(amount,2);
            tax=my_round(tax,2);
            total=amount+tax;

            var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
                        "<td>Amount:</br>Tax: </br>Total: </td>" +
                        "<td>Rs. "+amount+"</br>" +
                        "Rs. "+tax+"</br>" +
                        "Rs. "+total+"</td>" +
                        "<td></td>" +
                        "</tr>";

            $('#form136_foot').html(total_row);
        }

        function form136_print_form(id)
        {
            print_form136(function(container)
            {
                $.print(container);
                container.innerHTML="";	
            });	
        }

        function print_form136(func)
        {
            var form_id='form136';
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
            info_section.setAttribute('style','width:100%;min-height:60px');
                customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:46%;height:60px;border: 1px solid #00f;border-radius:5px;');
                business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:46%;height:60px;border: 1px solid #00f;border-radius:5px;');
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
            var order_no=master_form.elements['po_num'].value;
            var bill_no=master_form.elements['bill_num'].value;
            var vat_no=get_session_var('vat');

            var tandc_text=get_session_var('po_message');
            var signature_text="<br>"+bt+"<br><br><br>Auth. Signatory<br>";

            ////////////////filling in the content into the containers//////////////////////////

            logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
            //business_intro.innerHTML="<hr style='border: 1px solid #000;'>"+business_intro_text;
            business_contact.innerHTML="<hr style='border: 1px solid #00f;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email;

            invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>Purchase Bill</b></div><hr style='border: 1px solid #00f;'>";

            business_info.innerHTML="VAT #: "+vat_no;
            customer_info.innerHTML=supplier_name+"<br>Date: "+date+"<br>Bill #: "+bill_no+"<br>PO #: "+order_no;

            tandc.innerHTML="<br><b>Terms and Conditions</b><br>"+tandc_text;
            signature.innerHTML=signature_text;

            var table_element=document.getElementById(form_id+'_body');

            /////////////adding new table //////////////////////////////////////////////////////	
            var new_table=document.createElement('table');
            new_table.setAttribute('style','width:100%;font-size:11px;border:1px solid black;text-align:left;');
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

            footer.appendChild(tandc);
            footer.appendChild(signature);

            func(container);
        }
    </script>
</div>