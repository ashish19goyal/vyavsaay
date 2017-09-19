<div id='form178' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form178_add_item();'>Add <i class='fa fa-plus'></i></a>
      <a class='btn btn-circle grey btn-outline btn-sm' id='form178_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form178_print' onclick=form178_print_form();><i class='fa fa-print'></i> Print</a>
        <a class='btn btn-default btn-sm' id='form178_share'><i class='fa fa-envelope'></i> Email</a>
      </div>
	</div>

	<div class="portlet-body">
      <form id='form178_master' autocomplete="off">
          <fieldset>
              <label><div class='btn-overlap'><input type='text' name='supplier' placeholder='Supplier' class='floatlabel'><button type='button' title='Add new supplier' class='btn btn-icon-only default right-overlap' id='form178_add_supplier'><i class='fa fa-plus'></i></button></div></label>
              <label><input type='text' required name='status' class='floatlabel' placeholder='Status'></label>
              <label><input type='text' name='date' required class='floatlabel' placeholder='Order Date'></label>
				<label><input type='text' name='ship_to' class='floatlabel' placeholder='Ship To'></label>
              <label><input type='text' name='order_num' readonly="readonly" class='floatlabel' placeholder='Order #'></label>
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
					<th>Make</th>
					<th>Rate</th>
					<th>Amount</th>
					<th>Delivery Schedule</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form178_body'>
			</tbody>
      <tfoot id='form178_foot'>
      </tfoot>
		</table>
		<textarea id='form178_terms' class='floatlabel' placeholder='Terms & Conditions' style='width:100%'></textarea>
    </div>

    <script>
        function form178_header_ini()
        {
            var fields=document.getElementById('form178_master');

            var supplier_filter=fields.elements['supplier'];
            var order_date=fields.elements['date'];
            var order_num=fields.elements['order_num'];
			var ship_to=fields.elements['ship_to'];
            var status_filter=fields.elements['status'];
            fields.elements['order_id'].value=vUtil.newKey();
            var save_button=document.getElementById('form178_save');
			var tAndC=document.getElementById('form178_terms');

            status_filter.value='draft';
            supplier_filter.value='';
			ship_to.value='';
            order_date.value=vTime.date();
			tAndC.value=get_session_var('po_message');

			var staff_data={data_store:'staff',return_column:'acc_name'};
			set_my_value_list_json(staff_data,ship_to);

            var po_id=$("#form178_link").attr('data_id');
            if(po_id==null || po_id=='')
            {
                var po_num_data={data_store:'user_preferences',return_column:'value',
                                 indexes:[{index:'name',exact:'po_num'}]};
                read_json_single_column(po_num_data,function(po_nums)
                {
                    if(po_nums.length>0)
                    {
                        order_num.value=get_session_var('po_prefix')+"-"+po_nums[0];
                    }
                    else
                    {
                        order_num.value="";
                    }
                });
            }

            $(save_button).off('click');
            $(save_button).on("click", function(event)
            {
                event.preventDefault();
                form178_create_form();
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
                form178_add_item();
            });

            var supplier_data={data_store:'suppliers',return_column:'acc_name'};
            set_my_value_list_json(supplier_data,supplier_filter);

            $(supplier_filter).parent().parent().hide();
            $(order_date).datepicker();

            set_static_filter_json('purchase_orders','status',status_filter);

			$('#form178_body').paginator({visible:false});
            $('#form178').formcontrol();
        }

        function form178_ini()
        {
            var order_id=$("#form178_link").attr('data_id');
            if(order_id==null)
                order_id="";

            $('#form178_body').html("");
            $('#form178_foot').html("");

            var filter_fields=document.getElementById('form178_master');

            if(order_id!="")
            {
                show_loader();
                var order_columns={data_store:'purchase_orders',count:1,
                                  indexes:[{index:'id',value:order_id},
                                          {index:'order_num'},
                                          {index:'supplier'},
                                          {index:'order_date'},
                                          {index:'amount'},
                                          {index:'tax'},
                                          {index:'total'},
                                          {index:'status'},
										{index:'terms'},
										{index:'ship_to'}]};

                var order_items_column={data_store:'purchase_order_items',
                                  indexes:[{index:'id'},
                                          {index:'item_name'},
                                          {index:'quantity'},
                                          {index:'order_id',exact:order_id},
                                          {index:'make'},
                                          {index:'mrp'},
                                          {index:'price'},
                                          {index:'amount'},
										  {index:'delivery_schedule'},
                                          {index:'tax'},
                                          {index:'total'}]};

                read_json_rows('form178',order_columns,function(order_results)
                {
                    if(order_results.length>0)
                    {
                        var supplier_filter=filter_fields.elements['supplier'];
                        supplier_filter.value=order_results[0].supplier;
                        filter_fields.elements['date'].value=get_my_past_date(order_results[0].order_date);
                        filter_fields.elements['order_num'].value=order_results[0].order_num;
                        filter_fields.elements['status'].value=order_results[0].status;
                        filter_fields.elements['order_id'].value=order_id;
						filter_fields.elements['ship_to'].value=order_results[0].ship_to;
                        var save_button=document.getElementById('form178_save');

						document.getElementById('form178_terms').value=order_results[0].terms;

                        if(order_results[0].status=='order placed' || order_results[0].status=='closed' || order_results[0].status=='supplier finalized' || order_results[0].status=='partially received' || order_results[0].status=='received')
                        {
                            $(supplier_filter).parent().parent().show();
                        }

                        var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
                                    "<td>Amount:<br>Tax: <br>Total: </td>" +
                                    "<td colspan='2'>Rs. "+order_results[0].amount+"<br>" +
                                    "Rs. "+order_results[0].tax+"<br> " +
                                    "Rs. "+order_results[0].total+"</td>" +
                                    "<td></td>" +
                                    "</tr>";

                        $('#form178_foot').html(total_row);

                        $(save_button).off('click');
                        $(save_button).on("click", function(event)
                        {
                            event.preventDefault();
                            form178_update_form();
                        });
                        $('#form178').formcontrol();
                    }
                });

                read_json_rows('form178',order_items_column,function(results)
                {
                    results.forEach(function(result)
                    {
                        var rowsHTML="";
                        var id=result.id;
                        rowsHTML+="<tr>";
                        rowsHTML+="<form id='form178_"+id+"'></form>";
                            rowsHTML+="<td data-th='Item'>";
                                rowsHTML+="<a onclick=\"show_object('product_master','"+result.item_name+"');\"><textarea readonly='readonly' required form='form178_"+id+"'>"+result.item_name+"</textarea></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Quantity'>";
                                rowsHTML+="<input type='number' readonly='readonly' required form='form178_"+id+"' value='"+result.quantity+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Make'>";
                                rowsHTML+="<textarea readonly='readonly' required form='form178_"+id+"'>"+result.make+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Rate'>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='MRP' readonly='readonly' required form='form178_"+id+"' value='"+result.mrp+"' step='any'>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Price' readonly='readonly' required form='form178_"+id+"' value='"+result.price+"' step='any'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Amount'>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' readonly='readonly' required form='form178_"+id+"' value='"+result.amount+"' step='any'>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Tax' readonly='readonly' required form='form178_"+id+"' value='"+result.tax+"' step='any'>";
                            rowsHTML+="</td>";
							rowsHTML+="<td data-th='Delivery Schedule'>";
                                rowsHTML+="<input type='text' placeholder='Date' readonly='readonly' required form='form178_"+id+"' value='"+vTime.date({time:result.delivery_schedule})+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form178_"+id+"' value='"+result.total+"'>";
                                rowsHTML+="<input type='hidden' form='form178_"+id+"' value='"+id+"' name='id'>";
                                rowsHTML+="<input type='button' class='submit_hidden' form='form178_"+id+"' id='save_form178_"+id+"'>";
                                rowsHTML+="<button type='button' class='btn red' form='form178_"+id+"' id='delete_form178_"+id+"' title='Delete' name='delete' onclick='form178_delete_item($(this)); form178_get_totals();'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
                        rowsHTML+="</tr>";

                        $('#form178_body').append(rowsHTML);
                    });

                    $('#form178_share').show();
					$('#form178_share').off('click');
					$('#form178_share').click(function()
                    {
						var bt=get_session_var('title');
                        modal101_action(bt+' - PO # '+filter_fields.elements['order_num'].value,filter_fields.elements['supplier'].value,'supplier',function (func)
                        {
                            var order_num=filter_fields.elements['order_num'].value;
							var status=filter_fields.elements['status'].value;

							if(status=='supplier finalized')
							{
								var data_json={data_store:'purchase_orders',
										loader:'no',
										log:'yes',
										data:[{index:'id',value:order_id},
											{index:'order_placed_time',value:vTime.unix()},
											{index:'status',value:'order placed'},
											{index:'last_updated',value:vTime.unix()}],
										log_data:{title:'Placed',notes:'Purchase order # '+order_num,link_to:'form179'}};

								update_json(data_json);
							}
							print_form178(func);
                        });
                    });
                    $('#form178').formcontrol();
                    hide_loader();
                });
            }
        }

        function form178_add_item()
        {
            if(is_create_access('form178'))
            {
                var id=vUtil.newKey();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form178_"+id+"' autocomplete='off'></form>";
                    rowsHTML+="<td data-th='Item'><div class='btn-overlap'>";
                        rowsHTML+="<input type='text' placeholder='Item' class='floatlabel' required form='form178_"+id+"' id='form178_item_"+id+"'>";
                        rowsHTML+="<button class='btn btn-icon-only default right-overlap' onclick=\"modal194_action('#form178_item_"+id+"');\"><i class='fa fa-search'></i></button></div>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Quantity'>";
                        rowsHTML+="<input type='number' required form='form178_"+id+"' value='' step='any'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Make'>";
                        rowsHTML+="<textarea form='form178_"+id+"' readonly='readonly'></textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Rate'>";
                        rowsHTML+="<input type='number' class='floatlabel' placeholder='MRP' required form='form178_"+id+"' step='any' readonly='readonly'>";
                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Price' required form='form178_"+id+"' step='any'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Amount'>";
                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' required form='form178_"+id+"' step='any' readonly='readonly'>";
                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Tax' required form='form178_"+id+"' step='any' readonly='readonly'>";
                    rowsHTML+="</td>";
					rowsHTML+="<td data-th='Delivery Schedule'>";
                        rowsHTML+="<input type='text' placeholder='Date' required form='form178_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form178_"+id+"' name='total'>";
                        rowsHTML+="<input type='hidden' form='form178_"+id+"' value='"+id+"' name='id'>";
                        rowsHTML+="<input type='button' class='submit_hidden' form='form178_"+id+"' id='save_form178_"+id+"' >";
                        rowsHTML+="<button type='button' class='btn red' form='form178_"+id+"' id='delete_form178_"+id+"' onclick='$(this).parent().parent().remove(); form178_get_totals();' name='delete' title='Delete'><i class='fa fa-trash'></i></button>";
                        rowsHTML+="<input type='submit' class='submit_hidden' form='form178_"+id+"'>";
                        rowsHTML+="<input type='hidden' form='form178_"+id+"' name='tax_rate'>";
                    rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form178_body').prepend(rowsHTML);

                var master_form=document.getElementById("form178_master");
                var supplier_name=master_form.elements[1].value;

                var fields=document.getElementById("form178_"+id);
                var name_filter=fields.elements[0];
                var quantity_filter=fields.elements[1];
                var make_filter=fields.elements[2];
                var mrp_filter=fields.elements[3];
                var price_filter=fields.elements[4];
                var amount_filter=fields.elements[5];
                var tax_filter=fields.elements[6];
				var schedule_filter=fields.elements[7];
                var total_filter=fields.elements[8];
                var id_filter=fields.elements[9];
                var save_button=fields.elements[10];
                var tax_rate_filter=fields.elements[13];

				$(schedule_filter).datepicker();

                $(save_button).on("click", function(event)
                {
                    event.preventDefault();
                    form178_create_item(fields);
                });

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form178_add_item();
                });

                var product_data={data_store:'attributes',return_column:'name',
                                 indexes:[{index:'type',exact:'product'},
                                         {index:'value',exact:'yes'},
                                         {index:'attribute',exact:'raw material'}]};
                set_my_value_list_json(product_data,name_filter,function ()
                {
                    $(name_filter).focus();
                });

                $(name_filter).on('blur',function(event)
                {
                    var make_data={data_store:'product_master',
                                  indexes:[{index:'make'},
                                          {index:'tax'},
                                          {index:'name',exact:name_filter.value}]};
                    read_json_rows('',make_data,function(products)
                    {
                        if(products.length>0)
                        {
                            make_filter.value=products[0].make;
                            tax_rate_filter.value=products[0].tax;
                        }
                    });

                    var mrp_data={data_store:'product_instances',return_column:'mrp',
                                 indexes:[{index:'product_name',exact:name_filter.value}]};
                    set_my_value_json(mrp_data,mrp_filter);

                    var price_data={data_store:'supplier_bill_items',count:1,return_column:'unit_price',
                                    indexes:[{index:'product_name',exact:name_filter.value}]};
                    set_my_value_json(price_data,price_filter);

                    quantity_filter.value=0;
                    amount_filter.value=0;
                    tax_filter.value=0;
                    total_filter.value=0;
                });

                $(quantity_filter).add(price_filter).on('blur',function(event)
                {
                    amount_filter.value=Math.round(parseFloat(quantity_filter.value)*parseFloat(price_filter.value));
                    tax_filter.value=Math.round(parseFloat(amount_filter.value)*(parseFloat(tax_rate_filter.value)/100));
                    total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
                });
                form178_get_totals();
                $('#form178').formcontrol();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form178_create_item(form)
        {
            if(is_create_access('form178'))
            {
                var order_id=document.getElementById("form178_master").elements['order_id'].value;

                var name=form.elements[0].value;
                var quantity=form.elements[1].value;
                var make=form.elements[2].value;
                var mrp=form.elements[3].value;
                var price=form.elements[4].value;
                var amount=form.elements[5].value;
                var tax=form.elements[6].value;
				var schedule=vTime.unix({date:form.elements[7].value});
                var total=form.elements[8].value;
                var data_id=form.elements[9].value;
                var save_button=form.elements[10];
                var del_button=form.elements[11];
                var last_updated=get_my_time();

                var data_json={data_store:'purchase_order_items',
	 				data:[{index:'id',value:data_id},
	 					{index:'item_name',value:name},
	 					{index:'quantity',value:quantity},
	 					{index:'order_id',value:order_id},
                        {index:'make',value:make},
                        {index:'amount',value:amount},
                        {index:'total',value:total},
                        {index:'mrp',value:mrp},
                        {index:'tax',value:tax},
						{index:'delivery_schedule',value:schedule},
                        {index:'price',value:price},
	 					{index:'last_updated',value:last_updated}]};

                create_json(data_json);

                $(form).readonly();

                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form178_delete_item(del_button);
                });

                $(save_button).off('click');
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form178_create_form()
        {
            if(is_create_access('form178'))
            {
                var form=document.getElementById("form178_master");
                var supplier=form.elements['supplier'].value;
                var order_date=get_raw_time(form.elements['date'].value);
                var order_num=form.elements['order_num'].value;
                var status=form.elements['status'].value;
				var ship_to=form.elements['ship_to'].value;
				var tAndC=document.getElementById('form178_terms').value;
                var data_id=form.elements['order_id'].value;
                var save_button=document.getElementById('form178_save');

                $('#form178_share').show();
				$('#form178_share').off('click');
				$('#form178_share').click(function()
                {
					var bt=get_session_var('title');
                    modal101_action(bt+' - PO # '+order_num,supplier,'supplier',function (func)
                    {
                        print_form178(func);

						if(status=='supplier finalized')
						{
							var data_json={data_store:'purchase_orders',
					 				log:'yes',
					 				data:[{index:'id',value:data_id},
					 					{index:'order_placed_time',value:vTime.unix()},
					 					{index:'status',value:'order placed'},
					 					{index:'last_updated',value:vTime.unix()}],
					 				log_data:{title:'Placed',notes:'Purchase order # '+order_num,link_to:'form179'}};

							update_json(data_json);
						}
					});
                });

                var amount=0;
                var tax=0;
                var total=0;
				var total_quantity=0;
                $("[id^='save_form178']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    if(!isNaN(parseFloat(subform.elements[5].value)))
                    {
						total_quantity+=parseFloat(subform.elements[1].value);
                        amount+=parseFloat(subform.elements[5].value);
                        tax+=parseFloat(subform.elements[6].value);
                        total+=parseFloat(subform.elements[8].value);
                    }
                });

                var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
                            "<td>Amount:<br>Tax: <br>Total: </td>" +
                            "<td colspan='2'>Rs. "+amount+"<br>" +
                            "Rs. "+tax+"<br> " +
                            "Rs. "+total+"</td>" +
                            "<td></td>" +
                            "</tr>";

                $('#form178_foot').html(total_row);

                var last_updated=get_my_time();

                var data_json={data_store:'purchase_orders',
	 				data:[{index:'id',value:data_id},
	 					{index:'supplier',value:supplier},
	 					{index:'order_date',value:order_date},
	 					{index:'status',value:status},
                        {index:'priority',value:'0'},
                        {index:'amount',value:amount},
                        {index:'total',value:total},
                        {index:'order_num',value:order_num},
                        {index:'tax',value:tax},
						{index:'ship_to',value:ship_to},
						{index:'terms',value:tAndC},
						{index:'total_quantity',value:total_quantity},
                        {index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Created',notes:'Purchase order # '+order_num,link_to:'form179'}};

                create_json(data_json);

                var num_data={data_store:'user_preferences',return_column:'id',count:1,
                             indexes:[{index:'name',exact:'po_num'}]};
                read_json_single_column(num_data,function (bill_num_ids)
                {
                    if(bill_num_ids.length>0)
                    {
                        var num_array=order_num.split('-');
                        var num_json={data_store:'user_preferences',
                        data:[{index:'id',value:bill_num_ids[0]},
                            {index:'value',value:(parseInt(num_array[1])+1)},
                            {index:'last_updated',value:last_updated}]};
                        update_json(num_json);
                    }
                });

                $(save_button).off('click');
                $(save_button).on('click',function(event)
                {
                    event.preventDefault();
                    form178_update_form();
                });

                $("[id^='save_form178_']").click();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form178_update_form()
        {
            if(is_update_access('form178'))
            {
                var form=document.getElementById("form178_master");
                var supplier=form.elements['supplier'].value;
                var order_date=get_raw_time(form.elements['date'].value);
                var order_num=form.elements['order_num'].value;
                var status=form.elements['status'].value;
				var ship_to=form.elements['ship_to'].value;
				var tAndC=document.getElementById('form178_terms').value;
                var data_id=form.elements['order_id'].value;
                var save_button=document.getElementById('form178_save');

                $('#form178_share').show();
				$('#form178_share').off('click');
				$('#form178_share').click(function()
                {
					var bt=get_session_var('title');
					modal101_action(bt+' - PO # '+order_num,supplier,'supplier',function (func)
				  	{
                        print_form178(func);

						if(status=='supplier finalized')
						{
							var data_json={data_store:'purchase_orders',
									log:'yes',
									data:[{index:'id',value:data_id},
										{index:'order_placed_time',value:vTime.unix()},
										{index:'status',value:'order placed'},
										{index:'last_updated',value:vTime.unix()}],
									log_data:{title:'Placed',notes:'Purchase order # '+order_num,link_to:'form179'}};

							update_json(data_json);
						}
					});
                });

                var amount=0;
                var tax=0;
                var total=0;
				var total_quantity=0;

                $("[id^='save_form178']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    if(!isNaN(parseFloat(subform.elements[5].value)))
                    {
						total_quantity+=parseFloat(subform.elements[1].value);
                        amount+=parseFloat(subform.elements[5].value);
                        tax+=parseFloat(subform.elements[6].value);
                        total+=parseFloat(subform.elements[8].value);
                    }
                });

                var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
                                        "<td>Amount:<br>Tax: <br>Total: </td>" +
                                        "<td colspan='2'>Rs. "+amount+"<br>" +
                                        "Rs. "+tax+"<br> " +
                                        "Rs. "+total+"</td>" +
                                        "<td></td>" +
                                        "</tr>";

                $('#form178_foot').html(total_row);

                var last_updated=get_my_time();

                var data_json={data_store:'purchase_orders',
	 				data:[{index:'id',value:data_id},
	 					{index:'supplier',value:supplier},
	 					{index:'order_date',value:order_date},
						{index:'status',value:status},
                        {index:'amount',value:amount},
                        {index:'total',value:total},
                        {index:'order_num',value:order_num},
                        {index:'tax',value:tax},
						{index:'ship_to',value:ship_to},
						{index:'terms',value:tAndC},
						{index:'total_quantity',value:total_quantity},
						{index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Updated',notes:'Purchase order # '+order_num,link_to:'form179'}};

                update_json(data_json);

                $("[id^='save_form178_']").click();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form178_delete_item(button)
        {
            if(is_delete_access('form178'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var data_id=form.elements['id'].value;

                    var data_json={data_store:'purchase_order_items',
	 										data:[{index:'id',value:data_id}]};

                    delete_json(data_json);
                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form178_get_totals()
        {
            var amount=0;
            var tax=0;
            var total=0;

            $("[id^='save_form178']").each(function(index)
            {
                var subform_id=$(this).attr('form');
                var subform=document.getElementById(subform_id);

                if(!isNaN(parseFloat(subform.elements[5].value)))
                {
                    amount+=parseFloat(subform.elements[5].value);
                    tax+=parseFloat(subform.elements[6].value);
                    total+=parseFloat(subform.elements[8].value);
                }
            });

            var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
                                    "<td>Amount:<br>Tax: <br>Total: </td>" +
                                    "<td colspan='2'>Rs. "+amount+"<br>" +
                                    "Rs. "+tax+"<br> " +
                                    "Rs. "+total+"</td>" +
                                    "<td></td>" +
                                    "</tr>";

            $('#form178_foot').html(total_row);
        }

        function form178_print_form(id)
        {
            print_form178(function(container)
            {
                $.print(container);
                container.innerHTML="";
            });
        }

        function print_form178(func)
        {
            var form_id='form178';
            ////////////setting up containers///////////////////////
            var container=document.createElement('div');
            var header=document.createElement('div');
            var logo=document.createElement('div');
                // var business_intro=document.createElement('div');

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
                // business_intro.setAttribute('style','width:100%;text-align:center');

            info_section.setAttribute('style','width:100%;min-height:100px');
                customer_info.setAttribute('style','padding:1%;margin-top:5px;margin-bottom:5px;margin-right:1px;float:left;width:47%;height:120px;border: 1px solid #000;border-radius:5px;');
                business_info.setAttribute('style','padding:1%;margin-top:5px;margin-bottom:5px;margin-left:1px;float:right;width:47%;height:120px;border: 1px solid #000;border-radius:5px;');
            footer.setAttribute('style','width:100%;min-height:100px');
                tandc.setAttribute('style','float:left;width:60%;min-height:50px');
                signature.setAttribute('style','float:right;width:30%;min-height:60px');
				clearance.setAttribute('style','clear:both;');
				business_contact.setAttribute('style','width:100%;text-align:center;height:40px;font-size:12px;');
        ///////////////getting the content////////////////////////////////////////

            var bt=get_session_var('title');
            var font_size=get_session_var('print_size');
            var logo_image=get_session_var('logo');
            var business_address=get_session_var('address');
            var business_phone=get_session_var('phone');
            var business_email=get_session_var('email');

            var master_form=document.getElementById(form_id+'_master');
            var supplier_name=master_form.elements['supplier'].value;
            var date=master_form.elements['date'].value;
            var order_no=master_form.elements['order_num'].value;
						var ship_to=master_form.elements['ship_to'].value;
            var vat_no=get_session_var('vat');

            var tandc_text=document.getElementById('form178_terms').value;
            var signature_text="<br>"+bt+"<br><br><br>Auth. Signatory<br>";

            ////////////////filling in the content into the containers//////////////////////////

            logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
            //business_intro.innerHTML="<hr style='border: 1px solid #000;'>"+business_intro_text;
            business_contact.innerHTML="<hr style='border: 1px solid #000;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email;

            invoice_line.innerHTML="<hr style='border: 1px solid #000;'><div style='text-align:center;'><b style='text-size:1.2em'>Purchase Order # "+order_no+"</b></div><hr style='border: 1px solid #000;'>";

            customer_info.innerHTML="<b>To</b><br>"+supplier_name;
            business_info.innerHTML="VAT #: "+vat_no+"<br>Date: "+date+"<br>Order No: "+order_no+"<br>Ship To: "+ship_to;

            tandc.innerHTML="<br><b>Terms and Conditions</b><br>"+tandc_text;
            signature.innerHTML=signature_text;

            var table_element=document.getElementById(form_id+'_body');

            /////////////adding new table //////////////////////////////////////////////////////
            var new_table=document.createElement('table');
            new_table.setAttribute('style','width:100%;font-size:16px;border:1px solid black;text-align:left;');
            var table_header="<tr style='border-top: 1px solid #000000;border-bottom: 1px solid #000000;'>"+
                        "<td style='text-align:left;width:20%;font-weight:600;padding:3px;'>Item</td>"+
						"<td style='text-align:left;width:12%;font-weight:600;padding:3px;'>Make</td>"+
                        "<td style='text-align:left;width:12%;font-weight:600;padding:3px;'>Quantity</td>"+
                        "<td style='text-align:left;width:12%;font-weight:600;padding:3px;'>Rate</td>"+
                        "<td style='text-align:left;width:12%;font-weight:600;padding:3px;'>Amount</td>"+
                        "<td style='text-align:left;width:12%;font-weight:600;padding:3px;'>Tax</td>"+
                        "<td style='text-align:left;width:12%;font-weight:600;padding:3px;'>Total</td>"+
						"<td style='text-align:left;width:12%;font-weight:600;padding:3px;'>Delivery Schedule</td>"+
						"</tr>";

            var table_rows=table_header;
            var counter=0;

			var rows_array = [];
            $(table_element).find('form').each(function(index)
            {
                counter+=1;
				var form=$(this)[0];
				var row_obj = {};
                row_obj.item_name=form.elements[0].value;
                row_obj.quantity=""+form.elements[1].value;
                row_obj.make=form.elements[2].value;
                row_obj.price=form.elements[4].value;
                row_obj.amount=form.elements[5].value;
                row_obj.tax=form.elements[6].value;
                row_obj.schedule=form.elements[7].value;
				row_obj.total=form.elements[8].value;
				row_obj.schedule_t = vTime.unix({date:form.elements[7].value});
				rows_array.push(row_obj);
            });

			rows_array.sort(function(a,b)
			{
				if(parseInt(a.schedule_t)>parseInt(b.schedule_t))
				{	return 1;}
				else
				{	return -1;}
			});

			rows_array.forEach(function(row)
			{
				table_rows+="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;'>"+
                        "<td style='text-align:left;padding:3px;word-wrap: break-word;'>"+row.item_name+"</td>"+
						"<td style='text-align:left;padding:3px;word-wrap: break-word;'>"+row.make+"</td>"+
                        "<td style='text-align:left;padding:3px;'>"+row.quantity+"</td>"+
                        "<td style='text-align:left;padding:3px;'>"+row.price+"</td>"+
                        "<td style='text-align:left;padding:3px;'>"+row.amount+"</td>"+
                        "<td style='text-align:left;padding:3px;'>"+row.tax+"</td>"+
						"<td style='text-align:left;padding:3px;'>"+row.total+"</td>"+
                        "<td style='text-align:left;padding:3px;'>"+row.schedule+"</td></tr>";
			});

            var row_count=$(table_element).find('tbody>tr').length;
            var rows_to_add=15-row_count;
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
                        "<td colspan='2' style='text-align:left;padding:3px;'>"+total_text1+"</td>"+
                        "<td colspan='3' style='text-align:left;padding:3px;'>"+total_text2+"</td>"+
                        "<td colspan='3' style='text-align:left;padding:3px;font-weight:600;'>"+total_amount+"</td></tr>";
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
            // header.appendChild(business_contact);

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
