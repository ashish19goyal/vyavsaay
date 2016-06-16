<div id='form136' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form136_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form136_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form136_print' onclick=form136_print_form();><i class='fa fa-print'></i> Print</a>
      </div>
	</div>

	<div class="portlet-body">
        <form id='form136_master' autocomplete="off">
            <fieldset>
                <label><div class='btn-overlap'><input type='text' required name='supplier' placeholder='Supplier' class='floatlabel'><button type='button' title='Add new supplier' class='btn btn-icon-only default right-overlap' id='form136_add_supplier'><i class='fa fa-plus'></i></button></div></label>
                <label><input type='text' name='bill_num' class='floatlabel' placeholder='Bill #'></label>
                <label><input type='text' name='po_num' required readonly='readonly' class='floatlabel' placeholder='PO #'></label>
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
			<tbody id='form136_body'>
			</tbody>
            <tfoot id='form136_foot'>
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
            bill_date.value=vTime.date();

            $(entry_date).datepicker();
            entry_date.value=vTime.date();

            supplier_filter.value='';
						$('#form136_body').paginator({visible:false});
            $('#form136').formcontrol();
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
                var filter_fields=document.getElementById('form136_master');

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
											  {index:'po_quantity'},
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
                                rowsHTML+="<a onclick=\"show_object('product_master','"+result.product_name+"');\"><textarea readonly='readonly' placeholder='Item' form='form136_"+id+"'>"+result.product_name+"</textarea></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Batch'><div class='btn-overlap'>";
                                rowsHTML+="<a><input type='text' class='floatlabel' placeholder='Batch' readonly='readonly' form='form136_"+id+"' value='"+result.batch+"'></a>";
                                rowsHTML+="<button class='btn btn-icon-only default right-overlap' title='Print Barcode' onclick=\"print_product_barcode('"+id+"','"+result.product_name+"','"+result.batch+"');\"><i class='fa fa-barcode'></i></button></div>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Bill Price'>";
								rowsHTML+="<input type='number' class='floatlabel' placeholder='Quantity' readonly='readonly' form='form136_"+id+"' value='"+result.quantity+"' step='any'>";
							    rowsHTML+="<input type='number' class='floatlabel' placeholder='Unit Price' readonly='readonly' form='form136_"+id+"' value='"+result.unit_price+"' step='any'>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' readonly='readonly' form='form136_"+id+"' value='"+result.amount+"' step='any'>";
                                rowsHTML+="<input type='number' readonly='readonly' class='floatlabel' placeholder='Tax' form='form136_"+id+"' value='"+result.tax+"' step='any'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='PO Price'>";
								rowsHTML+="<input type='number' class='floatlabel' placeholder='Quantity' readonly='readonly' form='form136_"+id+"' value='"+result.po_quantity+"' step='any'>";
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
                                    rowsHTML+=" <i id='form136_check_image_"+id+"' class='fa fa-2x fa-check' title='Accepted' data-accepted='accepted'></i>";
                                }
                                else
                                {
                                    rowsHTML+=" <i id='form136_check_image_"+id+"' class='fa fa-2x fa-close' title='Rejected' data-accepted='rejected'></i>";
                                }
                                rowsHTML+="<input type='hidden' form='form136_"+id+"' value='"+id+"'>";
                                rowsHTML+="<input type='submit' class='submit_hidden' form='form136_"+id+"' id='save_form136_"+id+"'>";
                                rowsHTML+="<button type='button' class='btn red' form='form136_"+id+"' id='delete_form136_"+id+"' onclick='form136_delete_item($(this));'><i class='fa fa-trash' title='Delete' name='delete'></i></button>";
                            rowsHTML+="</td>";
                        rowsHTML+="</tr>";

                        $('#form136_body').append(rowsHTML);

						var fields=document.getElementById("form136_"+id);
						var batch=fields.elements[1];
						var batch_object={product:result.product_name,batch:result.batch};
                        $(batch).parent().on('click',function()
                        {
                            show_object('product_instances',batch_object);
                        });

						$(fields).on("submit", function(event)
                        {
                            event.preventDefault();
                        });
                    });
                    form136_get_totals();

                    $('#form136').formcontrol();
                    hide_loader();
                });
            }
        }

        function form136_add_item()
        {
            if(is_create_access('form136'))
            {
				var po_order_id=document.getElementById('form136_master').elements['order_id'].value;
                if(!vUtil.isBlank(po_order_id))
				{
	                var master_form=document.getElementById('form136_master');
	                var supplier_name=master_form.elements['supplier'].value;
	                var order_id=master_form.elements['order_id'].value;
	                var bill_id=master_form.elements['id'].value;

	                var id=get_new_key();
	                var rowsHTML="<tr>";
	                rowsHTML+="<form id='form136_"+id+"' autocomplete='off'></form>";
	                    rowsHTML+="<td data-th='Item'>";
	                        rowsHTML+="<input type='text' placeholder='Item' required form='form136_"+id+"'>";
	                    rowsHTML+="</td>";
	                    rowsHTML+="<td data-th='Batch'><div class='btn-overlap'>";
	                        rowsHTML+="<input type='text' class='floatlabel' placeholder='Batch' readonly='readonly' form='form136_"+id+"'>";
	                        rowsHTML+="<button class='btn btn-icon-only default right-overlap' title='Print Barcode' id='form136_barcode_"+id+"'><i class='fa fa-barcode'></i></button></div>";
	                    rowsHTML+="</td>";
	                    rowsHTML+="<td data-th='Bill Price'>";
							rowsHTML+="<input type='number' class='floatlabel' placeholder='Quantity' form='form136_"+id+"' step='any'>";
							rowsHTML+="<input class='floatlabel' placeholder='Unit Price' type='number' form='form136_"+id+"' step='any'>";
	                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' readonly='readonly' form='form136_"+id+"' value='' step='any'>";
	                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Tax' required form='form136_"+id+"' step='any'>";
	                    rowsHTML+="</td>";
	                    rowsHTML+="<td data-th='PO Price'>";
							rowsHTML+="<input type='number' class='floatlabel' placeholder='Quantity' readonly='readonly' form='form136_"+id+"' step='any'>";
							rowsHTML+="<input type='number' class='floatlabel' placeholder='Unit Price' readonly='readonly' form='form136_"+id+"' step='any'>";
	                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' readonly='readonly' form='form136_"+id+"' value='' step='any'>";
	                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Tax' readonly='readonly' required form='form136_"+id+"' step='any'>";
	                    rowsHTML+="</td>";
	                    rowsHTML+="<td data-th='Storage'>";
	                        rowsHTML+="<input type='text' form='form136_"+id+"'>";
	                    rowsHTML+="</td>";
	                    rowsHTML+="<td data-th='Action'>";
	                        rowsHTML+=" <i id='form136_check_image_"+id+"' class='fa fa-2x fa-check link' title='Accepted' data-accepted='accepted'></i>";
	                        rowsHTML+="<input type='hidden' form='form136_"+id+"' value='"+id+"'>";
	                        rowsHTML+="<input type='button' class='submit_hidden' form='form136_"+id+"' id='save_form136_"+id+"' >";
	                        rowsHTML+="<button type='button' class='btn red' form='form136_"+id+"' name='delete' title='Delete' id='delete_form136_"+id+"' onclick='$(this).parent().parent().remove(); form136_get_totals();'><i class='fa fa-trash'></i></button>";
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

					var po_quantity_filter=fields.elements[6];
	                var po_unit_filter=fields.elements[7];
	                var po_amount_filter=fields.elements[8];
	                var po_tax_filter=fields.elements[9];

	                var storage_filter=fields.elements[10];
	                var id_filter=fields.elements[11];
	                var save_button=fields.elements[12];
	                var tax_unit_filter=fields.elements[14];
	                var po_tax_rate_filter=fields.elements[15];

	                batch_filter.value=String(bill_id).substr(1,8);

	                function update_qc_icon(icon_elem)
	                {
	                    var new_qc_icon="<i id='form136_check_image_"+id+"' class='fa fa-2x fa-close link' title='Rejected' data-accepted='rejected'></i>";
	                    if(icon_elem.getAttribute('data-accepted')=='rejected')
	                    {
	                        new_qc_icon="<i id='form136_check_image_"+id+"' class='fa fa-2x fa-check link' title='Accepted' data-accepted='accepted'></i>";
	                    }
	                    $('#form136_check_image_'+id).replaceWith(new_qc_icon);
	                    $('#form136_check_image_'+id).on('click',function()
	                    {
	                        update_qc_icon($(this)[0]);
	                    })
	                }

	                $('#form136_check_image_'+id).on('click',function()
	                {
	                    update_qc_icon($(this)[0]);
	                })

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

	                var product_data={data_store:'purchase_order_items',return_column:'item_name',
	                                 indexes:[{index:'order_id',exact:po_order_id}]};
	                set_my_value_list_json(product_data,name_filter,function ()
	                {
	                    $(name_filter).focus();
	                });

	                var storage_data={data_store:'store_areas',return_column:'name'};
	                set_my_value_list_json(storage_data,storage_filter);

	                $(name_filter).on('blur',function(event)
	                {
	                    var po_item_data={data_store:'purchase_order_items',
	                                     indexes:[{index:'item_name',exact:name_filter.value},
	                                             {index:'quantity'},
	                                             {index:'price'},
	                                             {index:'amount'},
	                                             {index:'tax'},
	                                             {index:'tax_rate'},
	                                             {index:'order_id',exact:order_id}]};
	                    read_json_rows('',po_item_data,function(po_items)
	                    {
	                        if(po_items.length>0)
	                        {
								po_quantity_filter.value=po_items[0].quantity;
								po_unit_filter.value=po_items[0].price;
	                            po_amount_filter.value=po_items[0].price;
	                            po_tax_rate_filter.value=po_items[0].tax_rate;
	                            po_tax_filter.value=parseFloat(po_items[0].tax_rate)*parseFloat(po_items[0].price)/100;
	                        }
	                        else
	                        {
								po_quantity_filter.value="";
	                            po_unit_filter.value="";
	                            po_amount_filter.value="";
	                            po_tax_rate_filter.value="";
	                            po_tax_filter.value="";
	                        }
	                    });

	                    var tax_unit_data={data_store:'product_master',return_column:'tax',
	                                      indexes:[{index:'name',exact:name_filter.value}]};
	                    set_my_value_json(tax_unit_data,tax_unit_filter);

	                });

	                $(quantity_filter).on('blur',function(event)
	                {
	                    amount_filter.value=vUtil.round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
	                    tax_filter.value=vUtil.round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);

	                    po_amount_filter.value=parseFloat(po_unit_filter.value)*parseFloat(quantity_filter.value);
	                    po_tax_filter.value=parseFloat(po_tax_rate_filter.value)*parseFloat(po_amount_filter.value)/100;
	                });

	                ////////////////////////////////////

	                $(unit_filter).on('blur',function ()
	                {
	                    amount_filter.value=vUtil.round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
	                    tax_filter.value=vUtil.round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);

	                });

	                form136_get_totals();
	                $('#form136').formcontrol();
				}
				else
				{
					$("#modal97_link").click();
				}
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

				var po_quantity=form.elements[6].value;
                var po_unit=form.elements[7].value;
                var po_amount=form.elements[8].value;
                var po_tax=form.elements[9].value;

                var storage=form.elements[10].value;
                var data_id=form.elements[11].value;
                var save_button=form.elements[12];
                var del_button=form.elements[13];

                var qc=document.getElementById('form136_check_image_'+data_id).getAttribute('data-accepted');
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
						{index:'po_quantity',value:po_quantity},
                        {index:'po_tax',value:po_tax},
                        {index:'po_amount',value:po_amount},
                        {index:'po_price',value:po_unit},
                        {index:'bill_id',value:bill_id},
                        {index:'storage',value:storage},
                        {index:'qc',value:qc},
						{index:'last_updated',value:last_updated}]};

				var batch_json={data_store:'product_instances',
	 				data:[{index:'id',value:data_id},
			 					{index:'product_name',value:name},
			 					{index:'batch',value:batch},
			 					{index:'manufacture_date',value:''},
								{index:'cost_price',value:price},
			 					{index:'last_updated',value:last_updated}]};

                create_json(batch_json);
                create_json(data_json);

                if(qc=='rejected')
                {
                    var return_json={data_store:'supplier_returns',
						warning:'no',
                    	data:[{index:'id',value:bill_id},
		 					{index:'supplier',value:supplier},
		 					{index:'return_date',value:entry_date},
	                        {index:'total',value:'0'},
	                        {index:'tax',value:'0'},
		 					{index:'last_updated',value:last_updated}]};

                    var return_item_json={data_store:'supplier_return_items',
	 							data:[{index:'id',value:data_id},
                        			{index:'return_id',value:bill_id},
				 					{index:'item_name',value:name},
				 					{index:'batch',value:batch},
			                        {index:'tax',value:'0'},
			                        {index:'refund_amount',value:'0'},
			                        {index:'quantity',value:quantity},
			                        {index:'storage',value:storage},
	 								{index:'last_updated',value:last_updated}]};

                    create_json(return_item_json);
                    create_json(return_json);
                }

                $(form).readonly();

                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form136_delete_item(del_button);
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
                            data:[{index:'id',value:get_new_key()},
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
				if(!vUtil.isBlank(order_id))
				{
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

	                    var qc_id=subform.elements[11].value;
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

	                amount=vUtil.round(amount,2);
	                tax=vUtil.round(tax,2);
	                total=amount+tax;
	                total=vUtil.round(total);

	                var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
	                        "<td>Amount:</br>Tax: </br>Total: </td>" +
	                        "<td>Rs. "+amount+"</br>" +
	                        "Rs. "+tax+"</br>" +
	                        "Rs. "+total+"</td>" +
	                        "<td></td>" +
	                        "</tr>";
	                $('#form136_foot').html(total_row);

	                var data_json={data_store:'supplier_bills',
		 				log:'yes',
		 				data:[{index:'id',value:data_id},
	                        {index:'bill_id',value:bill_id},
	                        {index:'order_id',value:order_id},
	                        {index:'order_num',value:order_num},
	                        {index:'supplier',value:supplier},
	                        {index:'bill_date',value:bill_date},
		 					{index:'entry_date',value:entry_date},
		 					{index:'total',value:total},
		 					{index:'amount',value:amount},
	                        {index:'tax',value:tax},
	                        {index:'transaction_id',value:data_id},
		 					{index:'last_updated',value:last_updated}],
		 				log_data:{title:'Saved',notes:'Purchase Bill # '+bill_id,link_to:'form53'}};

	                var po_data={data_store:'purchase_orders',
	                            indexes:[{index:'id',value:order_id},
	                                    {index:'bill_id'},
	                                    {index:'total_quantity'},
	                                    {index:'quantity_received'}]};
	                read_json_rows('',po_data,function (porders)
	                {
	                    if(porders.length>0)
	                    {
	                        var id_object_array=vUtil.jsonParse(porders[0].bill_id);

	                        var id_object={bill_num:bill_id,
	                        			bill_id:data_id,
	                        			total_received:total_quantity};

							var found=false;
							for(var i in id_object_array)
							{
								if(id_object_array[i].bill_id==data_id)
								{
									id_object_array[i]=id_object;
									found=true;
									break;
								}
							}
							if(!found)
							{
								id_object_array.push(id_object);
							}

							var total_received_quantity=0;
							for(var i in id_object_array)
							{
								total_received_quantity+=parseFloat(id_object_array[i].total_received);
							}

							var status='partially received';

	                        if(parseFloat(porders[0].total_quantity)<=total_received_quantity)
	                        {
	                            status='received';
	                        }

	                        var new_bill_id=JSON.stringify(id_object_array);
	                        var po_json={data_store:'purchase_orders',
	                            data:[{index:'id',value:order_id},
	                                {index:'bill_id',value:new_bill_id},
	                                {index:'quantity_received',value:total_quantity},
	                                {index:'status',value:status},
	                                {index:'last_updated',value:last_updated}]};

	                        update_json(po_json);
	                    }
	                });

					var transaction_json={data_store:'transactions',
							data:[{index:'id',value:data_id},
								{index:'acc_name',value:supplier},
								{index:'type',value:'received'},
								{index:'amount',value:total},
								{index:'tax',value:tax},
								{index:'source_id',value:data_id},
								{index:'source_info',value:bill_id},
								{index:'source',value:'purchase bill'},
								{index:'source_link',value:'form53'},
								{index:'trans_date',value:last_updated},
								{index:'notes',value:''},
								{index:'last_updated',value:last_updated}]};

	                create_json(data_json);
	                create_json(transaction_json);

	                var save_button=document.getElementById('form136_save');
	                $(save_button).off('click');
	                $(save_button).on('click',function(event)
	                {
	                    event.preventDefault();
	                    form136_update_form();
	                });

	                $("[id^='save_form136_']").click();
				}
				else {
					$("#modal97_link").click();
				}
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

                    var qc_id=subform.elements[11].value;
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

                amount=vUtil.round(amount,2);
                tax=vUtil.round(tax,2);

                total=amount+tax;
                total=vUtil.round(total);

                var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
                        "<td>Amount:</br>Tax: </br>Total: </td>" +
                        "<td>Rs. "+amount+"</br>" +
                        "Rs. "+tax+"</br>" +
                        "Rs. "+total+"</td>" +
                        "<td></td>" +
                        "</tr>";
                $('#form136_foot').html(total_row);

                var data_json={data_store:'supplier_bills',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
                        {index:'bill_id',value:bill_id},
                        {index:'order_id',value:order_id},
                        {index:'order_num',value:order_num},
                        {index:'supplier',value:supplier},
                        {index:'bill_date',value:bill_date},
	 					{index:'entry_date',value:entry_date},
	 					{index:'total',value:total},
	 					{index:'amount',value:amount},
                        {index:'tax',value:tax},
                        {index:'transaction_id',value:data_id},
	 					{index:'last_updated',value:last_updated}],
				log_data:{title:'Updated',notes:'Purchase Bill # '+bill_id,link_to:'form53'}};

				var po_data={data_store:'purchase_orders',
							indexes:[{index:'id',value:order_id},
									{index:'bill_id'},
									{index:'total_quantity'},
									{index:'quantity_received'}]};
				read_json_rows('',po_data,function (porders)
				{
					if(porders.length>0)
					{
						var id_object_array=vUtil.jsonParse(porders[0].bill_id);

						var id_object={bill_num:bill_id,
									bill_id:data_id,
									total_received:total_quantity};

						var found=false;
						for(var i in id_object_array)
						{
							if(id_object_array[i].bill_id==data_id)
							{
								id_object_array[i]=id_object;
								found=true;
								break;
							}
						}
						if(!found)
						{
							id_object_array.push(id_object);
						}

						var total_received_quantity=0;
						for(var i in id_object_array)
						{
							total_received_quantity+=parseFloat(id_object_array[i].total_received);
						}

						var status='partially received';

						if(parseFloat(porders[0].total_quantity)<=total_received_quantity)
						{
							status='received';
						}

						var new_bill_id=JSON.stringify(id_object_array);
						var po_json={data_store:'purchase_orders',
							data:[{index:'id',value:order_id},
								{index:'bill_id',value:new_bill_id},
								{index:'quantity_received',value:total_quantity},
								{index:'status',value:status},
								{index:'last_updated',value:last_updated}]};

						update_json(po_json);
					}
				});

				var transaction_json={data_store:'transactions',
						data:[{index:'id',value:data_id},
							{index:'acc_name',value:supplier},
							{index:'type',value:'received'},
							{index:'amount',value:total},
							{index:'tax',value:tax},
							{index:'source_id',value:data_id},
							{index:'source_info',value:bill_id},
							{index:'source',value:'purchase bill'},
							{index:'source_link',value:'form53'},
							{index:'notes',value:''},
							{index:'last_updated',value:last_updated}]};

                update_json(data_json);
                update_json(transaction_json);

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

                var qc_id=subform.elements[11].value;
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

            amount=vUtil.round(amount,2);
            tax=vUtil.round(tax,2);
            total=amount+tax;
						total=vUtil.round(total);

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

            var invoice_line=document.createElement('div');

            var info_section=document.createElement('div');
                var customer_info=document.createElement('div');
                var business_info=document.createElement('div');

            var table_container=document.createElement('div');

            var footer=document.createElement('div');
                var tandc=document.createElement('div');
                var signature=document.createElement('div');
				var clearance=document.createElement('div');
				var business_contact=document.createElement('div');

        ////////////setting styles for containers/////////////////////////

            header.setAttribute('style','width:100%;min-height:100px;text-align:center');
            info_section.setAttribute('style','width:100%;min-height:100px');
                customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:48%;height:120px;border: 1px solid #000;border-radius:5px;');
                business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:48%;height:120px;border: 1px solid #000;border-radius:5px;');
            footer.setAttribute('style','width:100%;min-height:100px');
                tandc.setAttribute('style','float:left;width:60%;min-height:50px');
                signature.setAttribute('style','float:right;width:30%;min-height:60px');
				clearance.setAttribute('style','clear:both;');
				business_contact.setAttribute('style','width:100%;text-align:center');

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

            var tandc_text="";
            var signature_text="<br>"+bt+"<br><br><br>Auth. Signatory<br>";

            ////////////////filling in the content into the containers//////////////////////////

            logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
            //business_intro.innerHTML="<hr style='border: 1px solid #000;'>"+business_intro_text;
            business_contact.innerHTML="<hr style='border: 1px solid #000;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email;

            invoice_line.innerHTML="<hr style='border: 1px solid #000;'><div style='text-align:center;'><b style='text-size:1.2em'>Purchase Bill # "+bill_no+"</b></div><hr style='border: 1px solid #000;'>";

            business_info.innerHTML="<b>Buyer</b><br>"+bt+"<br>VAT #: "+vat_no+"<br>PO #: "+order_no;
            customer_info.innerHTML="<b>Supplier</b><br>"+supplier_name+"<br>Date: "+date+"<br>Bill #: "+bill_no;

            tandc.innerHTML="<br><b>Terms and Conditions</b><br>"+tandc_text;
            signature.innerHTML=signature_text;

            var table_element=document.getElementById(form_id+'_body');

            /////////////adding new table //////////////////////////////////////////////////////
            var new_table=document.createElement('table');
            new_table.setAttribute('style','width:100%;font-size:16px;border:1px solid black;text-align:left;');
            var table_header="<tr style='border-top: 1px solid #000000;border-bottom: 1px solid #000000;'>"+
                        "<td style='text-align:left;width:25%;padding:3px;font-weight:600;'>Item</td>"+
                        "<td style='text-align:left;width:15%;padding:3px;font-weight:600;'>Batch</td>"+
                        "<td style='text-align:left;width:12%;padding:3px;font-weight:600;'>Quantity</td>"+
                        "<td style='text-align:left;width:12%;padding:3px;font-weight:600;'>Rate</td>"+
                        "<td style='text-align:left;width:12%;padding:3px;font-weight:600;'>Amount</td>"+
                        "<td style='text-align:left;width:12%;padding:3px;font-weight:600;'>Tax</td>"+
                        "<td style='text-align:left;width:12%;padding:3px;font-weight:600;'>Total</td></tr>";

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
                        "<td style='text-align:left;padding:3px;word-wrap: break-word;'>"+item_name+"</td>"+
                        "<td style='text-align:left;padding:3px;'>"+batch+"</td>"+
                        "<td style='text-align:left;padding:3px;'>"+quantity+"</td>"+
                        "<td style='text-align:left;padding:3px;'>"+price+"</td>"+
                        "<td style='text-align:left;padding:3px;'>"+amount+"</td>"+
                        "<td style='text-align:left;padding:3px;'>"+tax+"</td>"+
                        "<td style='text-align:left;padding:3px;'>"+total+"</td></tr>";
            });

            var row_count=$(table_element).find('tbody>tr').length;
            var rows_to_add=15-row_count;
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
	                      "<td colspan='2' style='text-align:left;padding:3px;'>"+total_text1+"</td>"+
	                      "<td colspan='3' style='text-align:left;padding:3px;'>"+total_text2+"</td>"+
                        "<td colspan='2' style='text-align:left;padding:3px;font-weight:600;'>"+total_amount+"</td></tr>";
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
