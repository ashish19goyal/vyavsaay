<div id='form180' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form180_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form180_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form180_print' onclick=form180_print_form();><i class='fa fa-print'></i> Print</a>
        <a class='btn btn-default btn-sm' id='form180_share'><i class='fa fa-envelope'></i> Email</a>
      </div>
	</div>

	<div class="portlet-body">
        <form id='form180_master' autocomplete="off">
            <fieldset>
                <label><div class='btn-overlap'><input type='text' required name='customer' placeholder='Customer' class='floatlabel'><button type='button' title='Add new customer' class='btn btn-icon-only default right-overlap' id='form180_add_customer'><i class='fa fa-plus'></i></button></div></label>
                <label><input type='text' required name='bill_type' class='floatlabel' placeholder='Order Type'></label>
                <label><input type='text' name='order_date' required class='floatlabel' placeholder='Order Date'></label>
                <label><input type='text' name='order_num' readonly="readonly" class='floatlabel' placeholder='Order #'></label>
                <label><input type='text' name='status' class='floatlabel' placeholder='Status'></label>
                <input type='hidden' name='order_id'>
                <input type='submit' class='submit_hidden'>
            </fieldset>
        </form>
        <br>
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr style='color:#9a9a9a;'>
          <th>Item</th>
					<th>Quantity</th>
					<th>Rate</th>
          <th>Total</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form180_body'>
			</tbody>
      <tfoot id='form180_foot'>
      </tfoot>
		</table>
    </div>


	<script>
	  function form180_header_ini()
        {
            var fields=document.getElementById('form180_master');

            var customers_filter=fields.elements['customer'];
            var order_date=fields.elements['order_date'];
            var status_filter=fields.elements['status'];
            var order_num_filter=fields.elements['order_num'];
            var type_filter=fields.elements['bill_type'];

            fields.elements['order_id'].value=vUtil.newKey();
            order_num_filter.value="";

            var save_button=document.getElementById('form180_save');

            $(save_button).off('click');
            $(save_button).on("click", function(event)
            {
                event.preventDefault();
                form180_create_form();
            });

            var billing_type_data={data_store:'bill_types',return_column:'name'};
            set_my_value_list_json(billing_type_data,type_filter);

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
                form180_add_item();
            });

            var customers_data={data_store:'customers',return_column:'acc_name'};
            set_my_value_list_json(customers_data,customers_filter,function ()
            {
                $(customers_filter).focus();
            });

            var add_customer=document.getElementById('form180_add_customer');
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

						var order_id=$("#form180_link").attr('data_id');
						if(vUtil.isBlank(order_id))
						{
							var order_num_data={data_store:'user_preferences',count:1,return_column:'value',
                               indexes:[{index:'name',exact:'so_num'}]};
							read_json_single_column(order_num_data,function(so_nums)
 							{
 									if(so_nums.length>0)
 									{
 											order_num_filter.value=get_session_var('so_prefix')+"-"+so_nums[0];
 									}
 									else
 									{
 											order_num_filter.value="";
 									}
 							});
						}

            $(order_date).datepicker();
            order_date.value=vTime.date();
            set_static_filter_json('sale_orders','status',status_filter);
            status_filter.value='pending';
            customers_filter.value='';

						var paginator=$('#form180_body').paginator({visible:false});
            $('#form180').formcontrol();
        }

        function form180_ini()
        {
            var order_id=$("#form180_link").attr('data_id');
            if(order_id==null)
                order_id="";

            $('#form180_body').html("");
            $('#form180_foot').html("");

            if(order_id!="")
            {
                show_loader();
                var order_columns={data_store:'sale_orders',
                                  indexes:[{index:'id',value:order_id},
                                          {index:'customer_name'},
                                          {index:'order_num'},
                                          {index:'order_date'},
                                          {index:'amount'},
                                          {index:'tax'},
                                          {index:'total'},
                                          {index:'billing_type'},
                                          {index:'status'}]};
                var order_items_column={data_store:'sale_order_items',
                                   indexes:[{index:'id'},
                                           {index:'item_name'},
                                           {index:'item_desc'},
                                           {index:'quantity'},
                                           {index:'mrp'},
                                           {index:'amount'},
                                           {index:'tax'},
                                           {index:'total'},
                                           {index:'unit_price'},
                                           {index:'order_id',exact:order_id}]}

                ////separate fetch function to get order details like customer name, total etc.
                read_json_rows('form180',order_columns,function(order_results)
                {
                    if(order_results.length>0)
                    {
                        var filter_fields=document.getElementById('form180_master');
                        filter_fields.elements['customer'].value=order_results[0].customer_name;
                        filter_fields.elements['order_date'].value=get_my_past_date(order_results[0].order_date);
                        filter_fields.elements['status'].value=order_results[0].status;
                        filter_fields.elements['order_id'].value=order_id;
                        filter_fields.elements['order_num'].value=order_results[0].order_num;
                        filter_fields.elements['bill_type'].value=order_results[0].billing_type;

                        var save_button=document.getElementById('form180_save');

                        $(save_button).off('click');
                        $(save_button).on("click", function(event)
                        {
                            event.preventDefault();
                            form180_update_form();
                        });
                    }
                    $('#form180').formcontrol();
                });
                /////////////////////////////////////////////////////////////////////////

                read_json_rows('form180',order_items_column,function(results)
                {
                    results.forEach(function(result)
                    {
                        var id=result.id;
                        var rowsHTML="<tr>";
                        rowsHTML+="<form id='form180_"+id+"'></form>";
                            rowsHTML+="<td data-th='Item'>";
                                rowsHTML+="<a onclick=\"show_object('product_master','"+result.item_name+"');\"><input type='text' class='wideinput' readonly='readonly' class='floatlabel' placeholder='Item' required form='form180_"+id+"' value='"+result.item_name+"'></a>";
                                rowsHTML+="<textarea  class='floatlabel' placeholder='Name' readonly='readonly' form='form180_"+id+"'>"+result.item_desc+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Quantity'>";
                                rowsHTML+="<input type='number' readonly='readonly' required form='form180_"+id+"' value='"+result.quantity+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Rate'>";
                                rowsHTML+="<input type='number'  class='floatlabel' placeholder='Price' readonly='readonly' form='form180_"+id+"' value='"+result.unit_price+"' step='any'>";
                                rowsHTML+="<input type='number'  class='floatlabel' placeholder='MRP' readonly='readonly' form='form180_"+id+"' value='"+result.mrp+"' step='any'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Total'>";
                                rowsHTML+="<input type='number' readonly='readonly' class='floatlabel' placeholder='Amount' form='form180_"+id+"' value='"+result.amount+"' step='any'>";
                                rowsHTML+="<input type='number'  class='floatlabel' placeholder='Tax' readonly='readonly' form='form180_"+id+"' value='"+result.tax+"' step='any'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form180_"+id+"' value='"+result.total+"'>";
                                rowsHTML+="<input type='hidden' form='form180_"+id+"' value='"+id+"'>";
                                rowsHTML+="<input type='button' class='submit_hidden' form='form180_"+id+"' id='save_form180_"+id+"'>";
                                rowsHTML+="<button type='button' class='btn red' name='delete' title='Delete' form='form180_"+id+"' id='delete_form180_"+id+"' onclick='form180_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
                        rowsHTML+="</tr>";

                        $('#form180_body').append(rowsHTML);
                    });
                    form180_get_totals();
                    $('#form180').formcontrol();
                    hide_loader();
                });
            }
        }

        function form180_add_item()
        {
            if(is_create_access('form180'))
            {
                var id=vUtil.newKey();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form180_"+id+"' autocomplete='off'></form>";
										rowsHTML+="<td data-th='Item'><div class='btn-overlap'>";
												rowsHTML+="<input type='text' placeholder='Item' class='floatlabel' required form='form180_"+id+"' id='form180_item_"+id+"'>";
												rowsHTML+="<button class='btn btn-icon-only default right-overlap' onclick=\"modal194_action('#form180_item_"+id+"');\"><i class='fa fa-search'></i></button></div>";
												rowsHTML+="<textarea placeholder='Description' class='floatlabel' form='form180_"+id+"'></textarea>";
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Quantity'>";
                        rowsHTML+="<input type='number' placeholder='Quantity' required form='form180_"+id+"' value='' step='any'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Rate'>";
                        rowsHTML+="<input type='number' class='floatlabel dblclick_editable' form='form180_"+id+"' step='any' placeholder='Price'>";
                        rowsHTML+="<input type='number' class='floatlabel dblclick_editable' form='form180_"+id+"' step='any' placeholder='MRP'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Total'>";
                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' form='form180_"+id+"' step='any'>";
                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Tax' form='form180_"+id+"' step='any'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form180_"+id+"' name='total'>";
                        rowsHTML+="<input type='hidden' form='form180_"+id+"' value='"+id+"'>";
                        rowsHTML+="<input type='button' class='submit_hidden' form='form180_"+id+"' id='save_form180_"+id+"' >";
                        rowsHTML+="<button type='button' class='btn red' form='form180_"+id+"' id='delete_form180_"+id+"' onclick='$(this).parent().parent().remove(); form180_get_totals();' name='delete' title='Delete'><i class='fa fa-trash'></i></button>";
                        rowsHTML+="<input type='submit' class='submit_hidden' form='form180_"+id+"'>";
                        rowsHTML+="<input type='hidden' form='form180_"+id+"' name='tax_rate'>";
                    rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form180_body').prepend(rowsHTML);

                var filter_fields=document.getElementById('form180_master');
                var bill_type=filter_fields.elements['bill_type'].value;

                var fields=document.getElementById("form180_"+id);
                var name_filter=fields.elements[0];
                var desc_filter=fields.elements[1];
                var quantity_filter=fields.elements[2];
                var price_filter=fields.elements[3];
                var mrp_filter=fields.elements[4];
                var amount_filter=fields.elements[5];
                var tax_filter=fields.elements[6];
                var total_filter=fields.elements[7];
                var id_filter=fields.elements[8];
                var save_button=fields.elements[9];
                var tax_unit_filter=fields.elements[12];

                $(save_button).on("click", function(event)
                {
                    event.preventDefault();
                    form180_create_item(fields);
                });

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form180_add_item();
                });

                var product_data={data_store:'attributes',return_column:'name',
                                 indexes:[{index:'type',exact:'product'},
                                         {index:'value',exact:'yes'},
                                         {index:'attribute',exact:'manufactured'}]};
                set_my_value_list_json(product_data,name_filter,function ()
                {
                    $(name_filter).focus();
                });

                $(name_filter).on('blur',function(event)
                {
                    if(name_filter.value!="")
                    {
                        var master_data={data_store:'product_master',
                                        indexes:[{index:'description'},
                                                 {index:'tax'},
                                                {index:'name',exact:name_filter.value}]};
                        read_json_rows('',master_data,function (products)
                        {
                            if(products.length>0)
                            {
                                tax_unit_filter.value=products[0].tax;
                                desc_filter.value=products[0].description;
                            }
                        });

                        var price_data={data_store:'product_instances',
                                       indexes:[{index:'mrp'},
                                               {index:'sale_price'},
                                               {index:'product_name',exact:name_filter.value}]};
                        read_json_rows('',price_data,function(prices)
                        {
                            if(prices.length>0)
                            {
                                price_filter.value=prices[0].sale_price;
                                mrp_filter.value=prices[0].mrp;
                            }
                        });
                    }
                });

                $(quantity_filter).add(price_filter).on('blur',function(event)
                {
                    amount_filter.value=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
                    tax_filter.value=vUtil.round(((parseFloat(tax_unit_filter.value)*(parseFloat(amount_filter.value)))/100),2);
                    if(isNaN(parseFloat(tax_filter.value)))
                        tax_filter.value=0;
                    total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
                });

                form180_get_totals();
                $('#form180').formcontrol();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form180_create_item(form)
        {
            if(is_create_access('form180'))
            {
                var order_id=document.getElementById("form180_master").elements['order_id'].value;
                var order_status=document.getElementById("form180_master").elements['status'].value;

                var name=form.elements[0].value;
                var desc=form.elements[1].value;
                var quantity=form.elements[2].value;
                var price=form.elements[3].value;
                var mrp=form.elements[4].value;
                var amount=form.elements[5].value;
                var tax=form.elements[6].value;
                var total=form.elements[7].value;
                var data_id=form.elements[8].value;
                var save_button=form.elements[9];
                var del_button=form.elements[10];
                var last_updated=get_my_time();

                var data_json={data_store:'sale_order_items',
	 				data:[{index:'id',value:data_id},
	 					{index:'item_name',value:name},
	 					{index:'item_desc',value:desc},
	 					{index:'quantity',value:quantity},
                        {index:'unit_price',value:price},
                        {index:'mrp',value:mrp},
                        {index:'amount',value:amount},
                        {index:'total',value:total},
                        {index:'tax',value:tax},
                        {index:'order_id',value:order_id},
                        {index:'bill_status',value:order_status},
	 					{index:'last_updated',value:last_updated}]};

                create_json(data_json);

                $(form).readonly();

                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form180_delete_item(del_button);
                });

                $(save_button).off('click');
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form180_create_form()
        {
            if(is_create_access('form180'))
            {
                var form=document.getElementById("form180_master");

                var customer=form.elements['customer'].value;
                var order_date=get_raw_time(form.elements['order_date'].value);
                var status=form.elements['status'].value;
                var data_id=form.elements['order_id'].value;
                var order_num=form.elements['order_num'].value;
                var bill_type=form.elements['bill_type'].value;
                var save_button=document.getElementById('form180_save');

                var amount=0;
                var tax=0;
                var total=0;
                var total_quantity=0;

                $("[id^='save_form180']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);
                    if(!isNaN(parseFloat(subform.elements[5].value)))
                        amount+=parseFloat(subform.elements[5].value);
                    if(!isNaN(parseFloat(subform.elements[6].value)))
                        tax+=parseFloat(subform.elements[6].value);
                    if(!isNaN(parseFloat(subform.elements[7].value)))
                        total+=parseFloat(subform.elements[7].value);
                    if(!isNaN(parseFloat(subform.elements[2].value)))
                        total_quantity+=parseFloat(subform.elements[2].value);
                });

                var total_row="<tr><td colspan='1' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
                                    "<td>Amount:<br>Tax: <br>Total: </td>" +
                                    "<td>Rs. "+amount+"<br>" +
                                    "Rs. "+tax+"<br> " +
                                    "Rs. "+total+"</td>" +
                                    "<td></td>" +
                                    "</tr>";
                $('#form180_foot').html(total_row);

                var last_updated=get_my_time();
                var data_json={data_store:'sale_orders',
							 				data:[{index:'id',value:data_id},
							 					{index:'customer_name',value:customer},
							 					{index:'order_date',value:order_date},
							 					{index:'order_num',value:order_num},
                        {index:'status',value:status},
                        {index:'amount',value:amount},
                        {index:'billing_type',value:bill_type},
                        {index:'tax',value:tax},
                        {index:'total',value:total},
                        {index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Created',notes:'Sale order # '+order_num,link_to:'form181'}};

                create_json(data_json);

                var num_data={data_store:'user_preferences',return_column:'id',indexes:[{index:'name',exact:'so_num'}]};
                read_json_single_column(num_data,function (num_ids)
                {
                    if(num_ids.length>0)
                    {
											var num_array=order_num.split('-');
											var num_json={data_store:'user_preferences',
											data:[{index:'id',value:num_ids[0]},
													{index:'value',value:(parseInt(num_array[1])+1)},
													{index:'last_updated',value:last_updated}]};

                        update_json(num_json);
                    }
                },num_data);

                $(save_button).off('click');
                $(save_button).on('click',function(event)
                {
                    event.preventDefault();
                    form180_update_form();
                });

                $("[id^='save_form180_']").click();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form180_update_form()
        {
            if(is_update_access('form180'))
            {
                var form=document.getElementById("form180_master");

                var customer=form.elements['customer'].value;
                var order_date=get_raw_time(form.elements['order_date'].value);
                var status=form.elements['status'].value;
                var data_id=form.elements['order_id'].value;
                var order_num=form.elements['order_num'].value;
                var save_button=document.getElementById('form180_save');
                var last_updated=get_my_time();

                var amount=0;
                var tax=0;
                var total=0;
                var total_quantity=0;

                $("[id^='save_form180']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);
                    var row_id=subform.elements[8].value;
                    if(!isNaN(parseFloat(subform.elements[5].value)))
                        amount+=parseFloat(subform.elements[5].value);
                    if(!isNaN(parseFloat(subform.elements[6].value)))
                        tax+=parseFloat(subform.elements[6].value);
                    if(!isNaN(parseFloat(subform.elements[7].value)))
                        total+=parseFloat(subform.elements[7].value);
                    if(!isNaN(parseFloat(subform.elements[2].value)))
                        total_quantity+=parseFloat(subform.elements[2].value);

                    var data_json={data_store:'sale_order_items',
                        data:[{index:'id',value:row_id},
                            {index:'bill_status',value:status},
                            {index:'last_updated',value:last_updated}]};

                    var row_update_xml="<sale_order_items>"+
                                    "<id>"+row_id+"</id>"+
                                    "<bill_status>"+status+"</bill_status>"+
                                    "<last_updated>"+last_updated+"</last_updated>"+
                                    "</sale_order_items>";
                    update_simple(row_update_xml);
                });

                var total_row="<tr><td colspan='1' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
                                    "<td>Amount:<br>Tax: <br>Total: </td>" +
                                    "<td>Rs. "+amount+"<br>" +
                                    "Rs. "+tax+"<br> " +
                                    "Rs. "+total+"</td>" +
                                    "<td></td>" +
                                    "</tr>";

                $('#form180_foot').html(total_row);

                var data_json={data_store:'sale_orders',
							 				data:[{index:'id',value:data_id},
							 					{index:'customer_name',value:customer},
							 					{index:'order_date',value:order_date},
							 					{index:'order_num',value:order_num},
                        {index:'status',value:status},
                        {index:'amount',value:amount},
                        {index:'tax',value:tax},
                        {index:'total',value:total},
                        {index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Updated',notes:'Sale order # '+order_num,link_to:'form181'}};

                update_json(data_json);

                $("[id^='save_form180_']").click();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form180_delete_item(button)
        {
            if(is_delete_access('form180'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var data_id=form.elements[8].value;
                    var last_updated=get_my_time();
                    var data_json={data_store:'sale_order_items',
	 											data:[{index:'id',value:data_id}]};

                    delete_json(data_json);
                    $(button).parent().parent().remove();

                    form180_get_totals();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form180_print_form()
        {
            print_form180(function(container)
            {
                $.print(container);
                container.innerHTML="";
            });
        }

        function print_form180(func)
        {
            var form_id='form180';
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

            header.setAttribute('style','width:100%;min-height:70px;text-align:center');
            info_section.setAttribute('style','width:100%;min-height:80px');
                customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:48%;height:120px;border: 1px solid #000;border-radius:5px;');
                business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:48%;height:120px;border: 1px solid #000;border-radius:5px;');
            footer.setAttribute('style','width:100%;min-height:100px');
                tandc.setAttribute('style','float:left;width:60%;min-height:50px');
                signature.setAttribute('style','float:right;width:30%;min-height:60px');
								clearance.setAttribute('style','clear:both;');
								business_contact.setAttribute('style','width:100%;text-align:center;height:40px;font-size:12px;');
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
            var date=master_form.elements['order_date'].value;
            var bill_num=master_form.elements['order_num'].value;
            var bill_type=master_form.elements['bill_type'].value;
            var vat_no=get_session_var('vat');

            var tandc_text=get_session_var('bill_message');
            var signature_text="<br>"+bt+"<br><br><br>Auth. Signatory<br>";

            ////////////////filling in the content into the containers//////////////////////////

            logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
            //business_intro.innerHTML="<hr style='border: 1px solid #000;'>"+business_intro_text;
            business_contact.innerHTML="<hr style='border: 1px solid #000;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email;

            invoice_line.innerHTML="<hr style='border: 1px solid #000;'><div style='text-align:center;'><b style='text-size:1.2em'>Sale Order # "+bill_num+"</b></div><hr style='border: 1px solid #000;'>";

            customer_info.innerHTML="<b>Buyer</b><br>"+customer_name+"<br>Type: "+bill_type;
            business_info.innerHTML="<b>Seller</b><br>"+bt+"<br>VAT #: "+vat_no+"<br>Date: "+date+"<br>Order No: "+bill_num;

            tandc.innerHTML="<br><b>Terms and Conditions</b><br>"+tandc_text;
            signature.innerHTML=signature_text;

            var table_element=document.getElementById(form_id+'_body');

            /////////////adding new table //////////////////////////////////////////////////////
            var new_table=document.createElement('table');
            new_table.setAttribute('style','width:100%;font-size:15px;border:1px solid black;text-align:left;');
            var table_header="<tr style='border-top: 1px solid #000000;border-bottom: 1px solid #000000;'>"+
                        "<td style='text-align:left;width:18%;font-weight:600;padding:3px;'>Item</td>"+
                        "<td style='text-align:left;width:22%;font-weight:600;padding:3px;'>Description</td>"+
                        "<td style='text-align:left;width:12%;font-weight:600;padding:3px;'>Qty</td>"+
                        "<td style='text-align:left;width:12%;font-weight:600;padding:3px;'>Rate</td>"+
                        "<td style='text-align:left;width:12%;font-weight:600;padding:3px;'>Amount</td>"+
                        "<td style='text-align:left;width:12%;font-weight:600;padding:3px;'>Tax</td>"+
                        "<td style='text-align:left;width:12%;font-weight:600;padding:3px;'>Total</td></tr>";

            var table_rows=table_header;
            var counter=0;

            $(table_element).find('form').each(function(index)
            {
                counter+=1;
                var form=$(this)[0];
                var item_name=form.elements[0].value;
                var item_desc=form.elements[1].value;
                var quantity=""+form.elements[2].value;
                var price=form.elements[3].value;
                var amount=form.elements[5].value;
                var tax=form.elements[6].value;
                var total=form.elements[7].value;

                table_rows+="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;'>"+
                        "<td style='text-align:left;word-wrap: break-word;padding:3px;'>"+item_name+"</td>"+
                        "<td style='text-align:left;word-wrap: break-word;padding:3px;'>"+item_desc+"</td>"+
                        "<td style='text-align:left;word-wrap: break-word;padding:3px;'>"+quantity+"</td>"+
                        "<td style='text-align:left;word-wrap: break-word;padding:3px;'>"+price+"</td>"+
                        "<td style='text-align:left;word-wrap: break-word;padding:3px;'>"+amount+"</td>"+
                        "<td style='text-align:left;word-wrap: break-word;padding:3px;'>"+tax+"</td>"+
                        "<td style='text-align:left;word-wrap: break-word;padding:3px;'>"+total+"</td></tr>";
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
                        "<td colspan='2' style='text-align:left;padding:3px;'>"+total_text1+"</td>"+
                        "<td colspan='3' style='text-align:left;padding:3px;'>"+total_text2+"</td>"+
                        "<td colspan='2' style='text-align:left;padding:3px;font-weight:600;'>"+total_amount+"</td></tr>";
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

            info_section.appendChild(customer_info);
            info_section.appendChild(business_info);

            footer.appendChild(tandc);
            footer.appendChild(signature);
						footer.appendChild(clearance);
						footer.appendChild(business_contact);

            func(container);
        }

        function form180_get_totals()
        {
            var amount=0;
            var tax=0;
            var total=0;
            var total_quantity=0;


            $("[id^='save_form180']").each(function(index)
            {
                var subform_id=$(this).attr('form');
                var subform=document.getElementById(subform_id);

                if(!isNaN(parseFloat(subform.elements[5].value)))
                {
                    amount+=parseFloat(subform.elements[5].value);
                    tax+=parseFloat(subform.elements[6].value);
                    total+=parseFloat(subform.elements[7].value);
                }
                if(!isNaN(parseFloat(subform.elements[2].value)))
                    total_quantity+=parseFloat(subform.elements[2].value);
            });

            var form=document.getElementById("form180_master");

            amount=vUtil.round(amount,2);
            tax=vUtil.round(tax,2);
            total=vUtil.round(total,2);

            var total_row="<tr><td colspan='2' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
                                    "<td>Amount:<br>Tax: <br>Total: </td>" +
                                    "<td>Rs. "+amount+"<br>" +
                                    "Rs. "+tax+"<br> " +
                                    "Rs. "+total+"</td>" +
                                    "<td></td>" +
                                    "</tr>";

            $('#form180_foot').html(total_row);
        }

	</script>
</div>
