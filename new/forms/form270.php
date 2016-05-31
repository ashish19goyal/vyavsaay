<div id='form270' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form270_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form270_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form270_print' onclick=form270_print_form();><i class='fa fa-print'></i> Print</a>
      </div>
	</div>

	<div class="portlet-body">
        <form id='form270_master' autocomplete="off">
            <fieldset>
                <label><div class='btn-overlap'><input type='text' required name='supplier' placeholder='Supplier' class='floatlabel'><button type='button' title='Add new supplier' class='btn btn-icon-only default right-overlap' id='form270_add_supplier'><i class='fa fa-plus'></i></button></div></label>
                <label><input type='text' required name='bill_num' class='floatlabel' placeholder='Bill Number'></label>
                <label><input type='text' name='date' required class='floatlabel' placeholder='Bill Date'></label>
                <input type='hidden' name='bill_id'>
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
					<th>Amount</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form270_body'>
			</tbody>
            <tfoot id='form270_foot'>
            </tfoot>
		</table>
    </div>

    <script>
function form270_header_ini()
{
	var fields=document.getElementById('form270_master');
	var supplier_filter=fields.elements['supplier'];
	supplier_filter.value='';

	fields.elements['bill_num'].value="";
	var bill_date=fields.elements['date'];

	fields.elements['bill_id'].value=get_new_key();
	var save_button=document.getElementById('form270_save');

	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form270_create_form();
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
		form270_add_item();
	});

	var suppliers_data={data_store:'suppliers',return_column:'acc_name'};
	set_my_value_list_json(suppliers_data,supplier_filter,function ()
	{
		$(supplier_filter).focus();
	});

	var add_supplier=document.getElementById('form270_add_supplier');
	$(add_supplier).off('click');
	$(add_supplier).on('click',function()
	{
		modal13_action(function()
		{
			set_my_value_list_json(suppliers_data,supplier_filter);
		});
	});

	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());

    $('#form270').formcontrol();
}

function form270_ini()
{
	var bill_id=$("#form270_link").attr('data_id');
	if(bill_id==null)
		bill_id="";

	$('#form270_body').html("");
	$('#form270_foot').html("");

	if(bill_id!="")
	{
		show_loader();
		var bill_columns={data_store:'supplier_bills',count:1,
                         indexes:[{index:'id',exact:bill_id},
                                 {index:'bill_id'},
                                 {index:'supplier'},
                                 {index:'total'},
                                 {index:'amount'},
                                 {index:'discount'},
                                 {index:'tax'},
                                 {index:'tax_rate'},
                                 {index:'cartage'},
                                 {index:'bill_date'},
                                 {index:'entry_date'},
                                 {index:'notes'}]};
		var filter_fields=document.getElementById('form270_master');

		read_json_rows('form270',bill_columns,function(bill_results)
		{
			if (bill_results.length>0)
			{
				filter_fields.elements['supplier'].value=bill_results[0].supplier;
				filter_fields.elements['bill_num'].value=bill_results[0].bill_id;
				filter_fields.elements['date'].value=get_my_past_date(bill_results[0].bill_date);
				filter_fields.elements['bill_id'].value=bill_id;
				var save_button=document.getElementById('form270_save');

				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form270_update_form();
				});

				var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
							"<td>Amount:<br>Tax:<br>Cartage: <br>Total: </td>" +
							"<td>Rs. "+bill_results[0].amount+"</br>" +
							"Rs. "+bill_results[0].tax+" <br>" +
							"Rs. <input type='number' placeholder='Cartage' value='"+bill_results[0].cartage+"' step='any' id='form270_cartage' class='dblclick_editable' style='width: 80%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>" +
							"Rs. "+bill_results[0].total+"</td>" +
							"<td></td>" +
							"</tr>";

				$('#form270_foot').html(total_row);
				$('#from270').formcontrol();
			}

			var bill_items_column={data_store:'supplier_bill_items',
                                  indexes:[{index:'id'},
                                          {index:'bill_id'},
                                          {index:'product_name'},
                                          {index:'amount'},
                                          {index:'tax'},
                                          {index:'total'},
                                          {index:'unit_price'},
                                          {index:'quantity'},
                                          {index:'unit'},
                                          {index:'bill_id',exact:bill_id}]};
			read_json_rows('form270',bill_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form270_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<a onclick=\"show_object('product_master','"+result.product_name+"');\"><textarea readonly='readonly' form='form270_"+id+"'>"+result.product_name+"</textarea></a>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' placeholder='"+result.unit+"' class='floatlabel_right' readonly='readonly' form='form270_"+id+"' value='"+result.quantity+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Rate'>";
							rowsHTML+="<input type='number' placeholder='Price' readonly='readonly' form='form270_"+id+"' value='"+result.unit_price+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="<input type='number' placeholder='Amount' readonly='readonly' form='form270_"+id+"' class='floatlabel' value='"+result.amount+"' step='any'>";
							rowsHTML+="<input type='number' placeholder='Tax' class='floatlabel' readonly='readonly' form='form270_"+id+"' value='"+result.tax+"' step='any'>";
							rowsHTML+="<input type='number' placeholder='Tax' class='floatlabel' readonly='readonly' form='form270_"+id+"' value='"+result.total+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form270_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form270_"+id+"' id='save_form270_"+id+"' name='save'>";
							rowsHTML+="<button type='button' class='btn red' form='form270_"+id+"' id='delete_form270_"+id+"' name='delete' title='Delete' onclick='form270_delete_item($(this)); form270_get_totals();'><i class='fa fa-trash'></i></button>";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form270_body').append(rowsHTML);

				});
				form270_get_totals();
                $('#form270').formcontrol();
				hide_loader();
			});
		});
	}
}

function form270_add_item()
{
	if(is_create_access('form270'))
	{
		var filter_fields=document.getElementById('form270_master');

		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form270_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'><div class='btn-overlap'>";
				rowsHTML+="<input type='text' placeholder='Item' required id='form270_item_"+id+"' form='form270_"+id+"'>";
				rowsHTML+="<button class='btn btn-icon-only default right-overlap' onclick=\"modal194_action('#form270_item_"+id+"');\"><i class='fa fa-search'></i></button></div>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' step='any' placeholder='Quantity' required form='form270_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Rate'>";
				rowsHTML+="<input type='number' placeholder='Price' form='form270_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="<input type='number' placeholder='Amount' class='floatlabel' step='any' form='form270_"+id+"' readonly='readonly'>";
				rowsHTML+="<input type='number' placeholder='Tax' class='floatlabel' form='form270_"+id+"' step='any'>";
				rowsHTML+="<input type='number' placeholder='Total' class='floatlabel' form='form270_"+id+"' step='any' readonly='readonly'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form270_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' name='save' form='form270_"+id+"' id='save_form270_"+id+"' >";
				rowsHTML+="<button type='button' class='btn red' form='form270_"+id+"' id='delete_form270_"+id+"' onclick='$(this).parent().parent().remove();form270_get_totals();' name='delete' title='Delete'><i class='fa fa-trash'></i></button>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form270_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form270_"+id+"' name='tax_unit'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form270_body').append(rowsHTML);

		var fields=document.getElementById("form270_"+id);
		var name_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var price_filter=fields.elements[2];
		var amount_filter=fields.elements[3];
		var tax_filter=fields.elements[4];
		var total_filter=fields.elements[5];
		var id_filter=fields.elements[6];
		var save_button=fields.elements[7];
		var tax_unit_filter=fields.elements[10];

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form270_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form270_add_item();
		});

		var product_data={data_store:'product_master',return_column:'name'};
		set_my_value_list_json(product_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		$(name_filter).on('blur',function(event)
		{
			var unit_data={data_store:'attributes',count:1,return_column:'value',
                          indexes:[{index:'attribute',exact:'unit'},
                                  {index:'name',exact:name_filter.value}]};
			read_json_single_column(unit_data,function(units)
			{
				if(units.length>0)
                {
                    quantity_filter.placeholder=units[0];
                    $(quantity_filter).floatlabel_right();
                }
			});

			var price_data={data_store:'supplier_bill_items',return_column:'unit_price',
                           indexes:[{index:'product_name',exact:name_filter.value}]};
			set_my_value_json(price_data,price_filter);

			var tax_data={data_store:'product_master',return_column:'tax',
                         indexes:[{index:'name',exact:name_filter.value}]};
			set_my_value_json(tax_data,tax_unit_filter);
		});

		$(quantity_filter).add(price_filter).on('change blur',function(event)
		{
			amount_filter.value=my_round((parseFloat(price_filter.value)*parseFloat(quantity_filter.value)),2);
			tax_filter.value=my_round((parseFloat(tax_unit_filter.value)*parseFloat(amount_filter.value)),2);
			$(amount_filter).trigger('change');
		});

		$(amount_filter).add(tax_filter).on('change blur',function(event)
		{
			total_filter.value=my_round((parseFloat(amount_filter.value)+parseFloat(tax_filter.value)),0);
		});

		form270_get_totals();
        $('#form270').formcontrol();
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form270_create_item(form)
{
	if(is_create_access('form270'))
	{
		var master_form=document.getElementById("form270_master");
		var bill_id=master_form.elements['bill_id'].value;

		var name=form.elements[0].value;
		var quantity=form.elements[1].value;
		var price=form.elements[2].value;
		var amount=form.elements[3].value;
		var tax=form.elements[4].value;
		var total=form.elements[5].value;
		var data_id=form.elements[6].value;
		var save_button=form.elements['save'];
		var del_button=form.elements['delete'];
		var last_updated=get_my_time();
		var unit=form.elements[1].placeholder;

        var data_json={data_store:'supplier_bill_items',
	 				data:[{index:'id',value:data_id},
	 					{index:'product_name',value:name},
	 					{index:'quantity',value:quantity},
                        {index:'unit',value:unit},
                        {index:'unit_price',value:price},
                        {index:'amount',value:amount},
                        {index:'total',value:total},
                        {index:'tax',value:tax},
                        {index:'bill_id',value:bill_id},
	 					{index:'last_updated',value:last_updated}]};
        create_json(data_json);

		$(form).readonly();

		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form270_delete_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2_link").click();
	}
}


function form270_create_form()
{
	if(is_create_access('form270'))
	{
		var form=document.getElementById("form270_master");

		var supplier=form.elements['supplier'].value;
		var bill_id=form.elements['bill_num'].value;
		var bill_date=get_raw_time(form.elements['date'].value);

		var amount=0;
		var tax=0;
		var total=0;
		var total_quantity=0;

		$("[id^='save_form270']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);

			if(!isNaN(parseFloat(subform.elements[1].value)))
				total_quantity+=parseFloat(subform.elements[1].value);
			if(!isNaN(parseFloat(subform.elements[3].value)))
				amount+=parseFloat(subform.elements[3].value);
			if(!isNaN(parseFloat(subform.elements[4].value)))
				tax+=parseFloat(subform.elements[4].value);
			if(!isNaN(parseFloat(subform.elements[5].value)))
				total+=parseFloat(subform.elements[5].value);
		});

		var cartage=0;

		if(document.getElementById('form270_cartage'))
		{
			cartage=parseFloat(document.getElementById('form270_cartage').value);
		}

		var amount=my_round(amount,2);
		var tax=my_round(tax,2);
		var total=my_round((total+cartage),0);

		var total_row="<tr><td colspan='2' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
							"<td>Amount:<br>Tax:<br>Cartage: <br>Total: </td>" +
							"<td>Rs. "+amount+"</br>" +
							"Rs. "+tax+" <br>" +
							"Rs. <input type='number' placeholder='Cartage' value='"+my_round(cartage,2)+"' step='any' id='form270_cartage' class='dblclick_editable' style='width: 80%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>" +
							"Rs. "+total+"</td>" +
							"<td></td>" +
							"</tr>";

		$('#form270_foot').html(total_row);
		$('#form270_').formcontrol();

		var data_id=form.elements['bill_id'].value;
		var save_button=document.getElementById('form270_save');
		var last_updated=get_my_time();

        var data_json={data_store:'supplier_bills',
	 				data:[{index:'id',value:data_id},
	 					{index:'bill_id',value:bill_id},
	 					{index:'supplier',value:supplier},
                        {index:'bill_date',value:bill_date},
                        {index:'amount',value:amount},
                        {index:'total',value:total},
                        {index:'tax',value:tax},
                        {index:'cartage',value:cartage},
                        {index:'transaction_id',value:data_id},
	 					{index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Saved',notes:'Purchase Bill #'+bill_id,link_to:'form53'}};

        var transaction_json={data_store:'transactions',
	 				data:[{index:'id',value:data_id},
	 					{index:'trans_date',value:last_updated},
	 					{index:'amount',value:total},
                        {index:'receiver',value:'master'},
                        {index:'giver',value:supplier},
                        {index:'tax',value:(-tax)},
                        {index:'last_updated',value:last_updated}]};

        var pt_tran_id=get_new_key();

        var payment_json={data_store:'payments',
	 				data:[{index:'id',value:pt_tran_id},
	 					{index:'status',value:'pending'},
	 					{index:'type',value:'paid'},
                        {index:'date',value:last_updated},
                        {index:'total_amount',value:total},
                        {index:'paid_amount',value:0},
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
                        {index:'tax',value:0},
	 					{index:'last_updated',value:last_updated}]};

		create_json(data_json);
		create_json(transaction_json);
		create_json(pt_json);
		create_json(payment_json,function()
		{
			modal28_action(pt_tran_id);
		});

		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form270_update_form();
		});

		$("[id^='save_form270_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form270_update_form()
{
	if(is_update_access('form270'))
	{
		var form=document.getElementById("form270_master");

		var supplier=form.elements['supplier'].value;
		var bill_id=form.elements['bill_num'].value;
		var bill_date=get_raw_time(form.elements['date'].value);

		var amount=0;
		var tax=0;
		var total=0;
		var total_quantity=0;

		$("[id^='save_form270']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);

			if(!isNaN(parseFloat(subform.elements[1].value)))
				total_quantity+=parseFloat(subform.elements[1].value);
			if(!isNaN(parseFloat(subform.elements[3].value)))
				amount+=parseFloat(subform.elements[3].value);
			if(!isNaN(parseFloat(subform.elements[4].value)))
				tax+=parseFloat(subform.elements[4].value);
			if(!isNaN(parseFloat(subform.elements[5].value)))
				total+=parseFloat(subform.elements[5].value);
		});

		var cartage=0;

		if(document.getElementById('form270_cartage'))
		{
			cartage=parseFloat(document.getElementById('form270_cartage').value);
		}

		var amount=my_round(amount,2);
		var tax=my_round(tax,2);
		var total=my_round((total+cartage),0);

		var total_row="<tr><td colspan='2' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
							"<td>Amount:<br>Tax:<br>Cartage: <br>Total: </td>" +
							"<td>Rs. "+amount+"</br>" +
							"Rs. "+tax+" <br>" +
							"Rs. <input type='number' placeholder='Cartage' value='"+my_round(cartage,2)+"' step='any' id='form270_cartage' class='dblclick_editable' style='width: 80%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>" +
							"Rs. "+total+"</td>" +
							"<td></td>" +
							"</tr>";

		$('#form270_foot').html(total_row);
		$('#form270').formcontrol();

		var data_id=form.elements['bill_id'].value;
		var last_updated=get_my_time();

        var data_json={data_store:'supplier_bills',
	 				data:[{index:'id',value:data_id},
	 					{index:'bill_id',value:bill_id},
	 					{index:'supplier',value:supplier},
                        {index:'bill_date',value:bill_date},
                        {index:'amount',value:amount},
                        {index:'total',value:total},
                        {index:'tax',value:tax},
                        {index:'cartage',value:cartage},
                        {index:'transaction_id',value:data_id},
	 					{index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Updated',notes:'Purchase Bill #'+bill_id,link_to:'form53'}};

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

		var payment_data={data_store:'payments',count:1,return_column:'id',indexes:[{index:'bill_id',exact:data_id}]};
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
                        {index:'tax',value:0},
	 					{index:'last_updated',value:last_updated}]};

                update_json(pt_json);
                update_json(payment_json,function()
				{
					modal28_action(payments[0]);
				});
			}
		});

		$("[id^='save_form270_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form270_delete_item(button)
{
	if(is_delete_access('form270'))
	{
		modal115_action(function()
		{
			var master_form=document.getElementById("form270_master");
			var bill_id=master_form.elements['bill_id'].value;

			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[6].value;

            var data_json={data_store:'supplier_bill_items',
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

function form270_get_totals()
{
	var amount=0;
	var tax=0;
	var total=0;
	var total_quantity=0;

	$("[id^='save_form270']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);

		if(!isNaN(parseFloat(subform.elements[1].value)))
			total_quantity+=parseFloat(subform.elements[1].value);
		if(!isNaN(parseFloat(subform.elements[3].value)))
			amount+=parseFloat(subform.elements[3].value);
		if(!isNaN(parseFloat(subform.elements[4].value)))
			tax+=parseFloat(subform.elements[4].value);
		if(!isNaN(parseFloat(subform.elements[5].value)))
			total+=parseFloat(subform.elements[5].value);
	});

	var cartage=0;

	if(document.getElementById('form270_cartage'))
	{
		cartage=parseFloat(document.getElementById('form270_cartage').value);
	}

	var amount=my_round(amount,2);
	var tax=my_round(tax,2);
	var total=my_round((total+cartage),0);

	var total_row="<tr><td colspan='2' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
						"<td>Amount:<br>Tax:<br>Cartage: <br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+tax+" <br>" +
						"Rs. <input type='number' placeholder='Cartage' value='"+my_round(cartage,2)+"' step='any' id='form270_cartage' class='dblclick_editable' style='width: 80%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";

	$('#form270_foot').html(total_row);
	$('#form270').formcontrol();
}

function form270_print_form()
{
	print_form270(function(container)
	{
		$.print(container);
		container.innerHTML="";
	});
}

function print_form270(func)
{
	var form_id='form270';

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

////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;min-height:60px;text-align:center');
		logo.setAttribute('style','width:100%;text-align:center;font-weight:600;font-size:32px;line-height:40px;');
		business_intro.setAttribute('style','width:100%;text-align:center');
		business_contact.setAttribute('style','width:100%;text-align:left');
	info_section.setAttribute('style','width:100%;min-height:100px');
		customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:48%;height:100px;border: 1px solid #00f;border-radius:5px;');
		business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:48%;height:100px;border: 1px solid #00f;border-radius:5px;');

///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var logo_image=get_session_var('logo');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');

	var master_form=document.getElementById(form_id+'_master');
	var supplier_name=master_form.elements['supplier'].value;
	var date=master_form.elements['date'].value;
	var bill_no=master_form.elements['bill_num'].value;
	var tin_no=get_session_var('tin');
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML=bt;
	business_contact.innerHTML="<hr style='border: 1px solid #00f;'>Billing Address: "+business_address+"<br>Contact Nos.: "+business_phone+"<br>E-Mail: "+business_email+"<hr style='border: 1px solid #00f;'>";

	invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>Purchase Bill #: "+bill_no+"</b></div><hr style='border: 1px solid #00f;'>";

	customer_info.innerHTML="<b>Supplier: </b><br>"+supplier_name;
	business_info.innerHTML="<b>Buyer</b><br>TIN #: "+tin_no+"<br>Bill Date: "+date+"<br>Bill No: "+bill_no;

	var table_element=document.getElementById(form_id+'_body');

	/////////////adding new table //////////////////////////////////////////////////////
	var new_table=document.createElement('table');
	new_table.setAttribute('style','width:100%;font-size:13px;border:1px solid black;text-align:left;');
	new_table.setAttribute('class','plain_table');
	var table_header="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;width:8%;'>S.No.</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:25%;'>Item Name</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:15%'>Qty</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:15%'>Price</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:15%'>Tax</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:17%;'>Total(inc taxes)</td></tr>";

	var table_rows=table_header;
	var counter=0;

	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		var item_name=form.elements[0].value;
		var quantity=""+form.elements[1].value;
		var price=form.elements[2].value;
		var amount=form.elements[3].value;
		var tax=form.elements[4].value;
		var total=form.elements[5].value;
		var unit=form.elements[1].placeholder;
		table_rows+="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+counter+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+item_name+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+quantity+" "+unit+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+price+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+tax+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+total+"</td></tr>";
	});

	var row_count=$(table_element).find('tbody>tr').length;
	var rows_to_add=9-row_count;
	for(var i=0;i<rows_to_add;i++)
	{
		table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	}

	var table_foot=document.getElementById(form_id+'_foot');
	var total_quantity=$(table_foot).find('tr>td:first')[0].innerHTML;
	var total_text=$(table_foot).find('tr>td:nth-child(2)')[0].innerHTML;
	var total_amount_elem=$(table_foot).find('tr>td:nth-child(3)')[0]

    $(total_amount_elem).find('input').each(function()
    {
        $(this).replaceWith($(this).val());
    });

    var total_amount=total_amount_elem.innerHTML;

	var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
				"<td colspan='2' style='border: 1px solid #000;text-align:left;'>"+total_quantity+"</td>"+
				"<td colspan='2' style='border: 1px solid #000;text-align:left;'>"+total_text+"</td>"+
				"<td colspan='2' style='border: 1px solid #000;text-align:left;'>"+total_amount+"</td></tr>";

	table_rows+=table_foot_row;
	new_table.innerHTML=table_rows;

	/////////////placing the containers //////////////////////////////////////////////////////

	container.appendChild(header);
	container.appendChild(invoice_line);
	container.appendChild(info_section);

	container.appendChild(new_table);
	container.appendChild(business_contact);

	header.appendChild(logo);

	info_section.appendChild(customer_info);
	info_section.appendChild(business_info);

	func(container);
}
    </script>
</div>
