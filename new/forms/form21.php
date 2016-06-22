<div id='form21' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form21_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form21_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      </div>
	</div>

	<div class="portlet-body">
        <form id='form21_master' autocomplete="off">
            <fieldset>
                <label><div class='btn-overlap'><input type='text' required name='supplier' placeholder='Supplier' class='floatlabel'><button type='button' title='Add new supplier' class='btn btn-icon-only default right-overlap' id='form21_add_supplier'><i class='fa fa-plus'></i></button></div></label>
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
					<th>Batch</th>
					<th>Quantity</th>
					<th>Rate</th>
					<th>Amount</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form21_body'>
			</tbody>
	      <tfoot id='form21_foot'>
	      </tfoot>
		</table>
    </div>

	<script>
	function form21_header_ini()
	{
		var fields=document.getElementById('form21_master');

		var supplier_filter=fields.elements['supplier'];
		var bill_date=fields.elements['date'];
		fields.elements['bill_id'].value=get_new_key();
		var save_button=document.getElementById('form21_save');
		fields.elements['bill_num'].value="";
		supplier_filter.value='';

		$(save_button).off('click');
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form21_create_form();
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
			form21_add_item();
		});

		var suppliers_data={data_store:'suppliers',return_column:'acc_name'};
		set_my_value_list_json(suppliers_data,supplier_filter,function ()
		{
			$(supplier_filter).focus();
		});

		var add_supplier=document.getElementById('form21_add_supplier');
		$(add_supplier).off('click');
		$(add_supplier).on('click',function()
		{
			modal13_action(function()
			{
				set_my_value_list_json(suppliers_data,supplier_filter,function ()
				{
					$(supplier_filter).focus();
				});
			});
		});

		$(bill_date).datepicker();
		$(bill_date).val(vTime.date());
		$('#form21').formcontrol();
	}

	function form21_ini()
	{
		var bill_id=$("#form21_link").attr('data_id');
		if(bill_id==null)
			bill_id="";

		$('#form21_body').html("");
		$('#form21_foot').html("");

		if(bill_id!="")
		{
			show_loader();
			var filter_fields=document.getElementById('form21_master');

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
	                                 {index:'notes'}]};

			read_json_rows('form21',bill_columns,function(bill_results)
			{
				if (bill_results.length>0)
				{
					filter_fields.elements['supplier'].value=bill_results[0].supplier;
					filter_fields.elements['bill_num'].value=bill_results[0].bill_id;
					filter_fields.elements['date'].value=get_my_past_date(bill_results[0].bill_date);
					filter_fields.elements['bill_id'].value=bill_id;
					var save_button=document.getElementById('form21_save');

					$(save_button).off('click');
					$(save_button).on("click", function(event)
					{
						event.preventDefault();
						form21_update_form();
					});

					var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
								"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
								"<td>Rs. "+bill_results[0].amount+"</br>" +
								"Rs. "+bill_results[0].discount+"</br>" +
								"Rs. "+bill_results[0].tax+"</br>" +
								"Rs. "+bill_results[0].total+"</td>" +
								"<td></td>" +
								"</tr>";
					$('#form21_foot').html(total_row);
					$('#from21').formcontrol();
				}
			});

			var bill_items_column={data_store:'supplier_bill_items',
                                  indexes:[{index:'id'},
                                          {index:'product_name'},
										  {index:'batch'},
                                          {index:'amount'},
                                          {index:'tax'},
                                          {index:'total'},
										  {index:'discount'},
                                          {index:'unit_price'},
                                          {index:'quantity'},
                                          {index:'bill_id',exact:bill_id}]};

			read_json_rows('form21',bill_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form21_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<input type='hidden' form='form21_"+id+"'>";
							rowsHTML+="<textarea readonly='readonly' form='form21_"+id+"'>"+result.product_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form21_"+id+"' value='"+result.batch+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form21_"+id+"' value='"+result.quantity+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Rate'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form21_"+id+"' value='"+result.unit_price+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' readonly='readonly' form='form21_"+id+"' value='"+result.amount+"' step='any'>";
							rowsHTML+="<input type='number' class='floatlabel' placeholder='Discount' readonly='readonly' form='form21_"+id+"' value='"+result.discount+"' step='any'>";
							rowsHTML+="<input type='number' class='floatlabel' placeholder='Tax' readonly='readonly' form='form21_"+id+"' value='"+result.tax+"' step='any'>";
							rowsHTML+="<input type='number' class='floatlabel' placeholder='Total' readonly='readonly' form='form21_"+id+"' value='"+result.total+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form21_"+id+"' value='"+id+"' name='id'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form21_"+id+"' id='save_form21_"+id+"' name='save'>";
							rowsHTML+="<button type='button' class='btn red' form='form21_"+id+"' id='delete_form21_"+id+"' name='delete' title='Delete' onclick='form21_delete_item($(this)); form21_get_totals();'><i class='fa fa-trash'></i></button>";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form21_body').append(rowsHTML);
				});

				form21_get_totals();
                $('#form21').formcontrol();
				hide_loader();
			});
		}
	}

	function form21_add_item()
	{
		if(is_create_access('form21'))
		{
			var id=get_new_key();
			var rowsHTML="<tr>";
			rowsHTML+="<form id='form21_"+id+"' autocomplete='off'></form>";
				rowsHTML+="<td data-th='Item'>";
					rowsHTML+="<input class='floatlabel' placeholder='Barcode' type='text' form='form21_"+id+"'>";
					rowsHTML+="<div class='btn-overlap'><input type='text' class='floatlabel' placeholder='Item' required form='form21_"+id+"'>";
					rowsHTML+="<button class='btn btn-icon-only default right-overlap' title='Add new product' id='form21_add_product_"+id+"'><i class='fa fa-plus'></i></button></div>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Batch'><div class='btn-overlap'>";
					rowsHTML+="<input type='text' required form='form21_"+id+"'>";
					rowsHTML+="<button class='btn btn-icon-only default right-overlap' title='Add new batch' id='form21_add_batch_"+id+"'><i class='fa fa-plus'></i></button></div>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Quantity'>";
					rowsHTML+="<input type='number' step='any' required form='form21_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Rate'>";
					rowsHTML+="<input type='number' required form='form21_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Amount'>";
					rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' required readonly='readonly' form='form21_"+id+"' step='any'>";
					rowsHTML+="<input type='number' class='floatlabel' placeholder='Discount' form='form21_"+id+"' value='' step='any'>";
					rowsHTML+="<input type='number' class='floatlabel dblclick_editable' placeholder='Tax' readonly='readonly' form='form21_"+id+"' value='' step='any'>";
					rowsHTML+="<input type='number' class='floatlabel' placeholder='Total' readonly='readonly' form='form21_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					rowsHTML+="<input type='hidden' form='form21_"+id+"' value='"+id+"' name='id'>";
					rowsHTML+="<input type='button' class='submit_hidden' form='form21_"+id+"' id='save_form21_"+id+"' name='save'>";
					rowsHTML+="<button type='button' class='btn red' form='form21_"+id+"' id='delete_form21_"+id+"' name='delete' title='Delete' onclick='$(this).parent().parent().remove(); form21_get_totals();'><i class='fa fa-trash'></i></button>";
					rowsHTML+="<input type='submit' class='submit_hidden' form='form21_"+id+"'>";
					rowsHTML+="<input type='hidden' form='form21_"+id+"' name='tax_rate'>";
				rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form21_body').prepend(rowsHTML);

			var fields=document.getElementById("form21_"+id);
			var barcode_filter=fields.elements[0];
			var name_filter=fields.elements[1];
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
				form21_create_item(fields);
			});
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form21_add_item();
			});

			var product_data={data_store:'product_master',return_column:'name'};
			set_my_value_list_json(product_data,name_filter);

			$(barcode_filter).focus();
			$(barcode_filter).on('blur',function()
			{
				if(barcode_filter.value!="")
				{
					var item_data={data_store:'product_master',return_column:'name',
									indexes:[{index:'bar_code',exact:barcode_filter.value}]};
					set_my_value_json(item_data,name_filter,function ()
					{
						$(name_filter).trigger('blur');
					});
					$(batch_filter).focus();
				}
			});

			$(barcode_filter).on('keydown',function (event)
			{
				if(event.keyCode == 13 )
				{
					event.preventDefault();
					$(barcode_filter).trigger('blur');
				}
			});

			var add_product=document.getElementById('form21_add_product_'+id);
			$(add_product).on('click',function()
			{
				modal14_action(function()
				{
					set_my_value_list_json(product_data,name_filter);
				});
			});

			var add_batch=document.getElementById('form21_add_batch_'+id);
			$(add_batch).on('click',function()
			{
				modal142_action(function()
				{
					var batch_data={data_store:'product_instances',return_column:'batch',
									indexes:[{index:'product_name',exact:name_filter.value}]};
					set_my_value_list_json(batch_data,batch_filter);
				});
			});

			$(name_filter).on('blur',function(event)
			{
				var batch_data={data_store:'product_instances',return_column:'batch',
								indexes:[{index:'product_name',exact:name_filter.value}]};
				set_my_value_list_json(batch_data,batch_filter);

				var tax_data={data_store:'product_master',return_column:'tax',
								indexes:[{index:'name',exact:name_filter.value}]};
				set_my_value_json(tax_data,tax_rate_filter);

				var last_batch_data={data_store:'supplier_bill_items',return_column:'batch',
									indexes:[{index:'product_name',exact:name_filter.value}]};
				set_my_value_json(last_batch_data,batch_filter,function()
				{
					var price_data={data_store:'product_instances',return_column:'cost_price',
									indexes:[{index:'product_name',exact:name_filter.value},
											{index:'batch',exact:batch_filter.value}]};
					set_my_value_json(price_data,price_filter);

					quantity_filter.value="";
					total_filter.value=0;
					amount_filter.value=0;
					discount_filter.value=0;
					tax_filter.value=0;
				});
			});

			$(batch_filter).on('blur',function(event)
			{
				var price_data={data_store:'product_instances',return_column:'cost_price',
								indexes:[{index:'product_name',exact:name_filter.value},
										{index:'batch',exact:batch_filter.value}]};
				set_my_value_json(price_data,price_filter);

				quantity_filter.value="";
				total_filter.value=0;
				amount_filter.value=0;
				discount_filter.value=0;
				tax_filter.value=0;
			});

			$(price_filter).add(quantity_filter).add(tax_filter).add(discount_filter).on('blur',function(event)
			{
				amount_filter.value=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
				tax_filter.value=parseFloat((parseFloat(tax_rate_filter.value)*(parseFloat(amount_filter.value)-parseFloat(discount_filter.value)))/100);
				total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);
			});

			$('#form21').formcontrol();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form21_create_item(form)
	{
		if(is_create_access('form21'))
		{
			var bill_id=document.getElementById("form21_master").elements[6].value;
			var name=form.elements[1].value;
			var batch=form.elements[2].value;
			var quantity=form.elements[3].value;
			var price=form.elements[4].value;
			var amount=form.elements[5].value;
			var discount=form.elements[6].value;
			var tax=form.elements[7].value;
			var total=form.elements[8].value;
			var data_id=form.elements[9].value;
			var save_button=form.elements[10];
			var del_button=form.elements[11];

			var last_updated=get_my_time();

			var data_json={data_store:'supplier_bill_items',
						data:[{index:'id',value:data_id},
							{index:'product_name',value:name},
							{index:'batch',value:batch},
							{index:'quantity',value:quantity},
							{index:'unit_price',value:price},
							{index:'amount',value:amount},
							{index:'total',value:total},
							{index:'tax',value:tax},
							{index:'discount',value:discount},
							{index:'bill_id',value:bill_id},
							{index:'last_updated',value:last_updated}]};
			create_json(data_json);

			$(form).readonly();

			del_button.removeAttribute("onclick");
			$(del_button).on('click',function(event)
			{
				form21_delete_item(del_button);
			});

			$(save_button).off('click');
		}
		else
		{
			$("#modal2_link").click();
		}
	}


	function form21_create_form()
	{
		if(is_create_access('form21'))
		{
			var form=document.getElementById("form21_master");

			var supplier=form.elements['supplier'].value;
			var bill_id=form.elements['bill_num'].value;
			var bill_date=get_raw_time(form.elements['date'].value);
			var data_id=form.elements['bill_id'].value;
			var save_button=document.getElementById('form21_save');

			var total=0;
			var tax=0;
			var discount=0;
			var amount=0;

			$("[id^='save_form21']").each(function(index)
			{
				var subform_id=$(this).attr('form');
				var subform=document.getElementById(subform_id);
				amount+=parseFloat(subform.elements[5].value);
				discount+=parseFloat(subform.elements[6].value);
				tax+=parseFloat(subform.elements[7].value);
				total+=parseFloat(subform.elements[8].value);
			});

			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. "+discount+"</br>" +
					"Rs. "+tax+"</br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
			$('#form21_foot').html(total_row);

			var last_updated=get_my_time();

			var data_json={data_store:'supplier_bills',
						data:[{index:'id',value:data_id},
							{index:'bill_id',value:bill_id},
							{index:'supplier',value:supplier},
					          {index:'bill_date',value:bill_date},
					          {index:'amount',value:amount},
					          {index:'total',value:total},
					          {index:'tax',value:tax},
					          {index:'discount',value:discount},
					          {index:'transaction_id',value:data_id},
							{index:'notes',value:notes},
							{index:'last_updated',value:last_updated}],
		      log:'yes',
		      log_data:{title:'Saved',notes:'Purchase Bill #'+bill_id,link_to:'form53'}};

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
						{index:'trans_date',value:bill_date},
						{index:'notes',value:''},
						{index:'last_updated',value:last_updated}]};

			create_json(data_json);
			create_json(transaction_json);

			var rtran_json={data_store:'transactions',
					data:[{index:'id',value:get_new_key()},
						{index:'acc_name',value:supplier},
						{index:'type',value:'given'},
						{index:'amount',value:total},
						{index:'tax',value:'0'},
						{index:'source_id',value:data_id},
						{index:'source_info',value:bill_id},
						{index:'source',value:'payable'},
						{index:'source_link',value:'form53'},
						{index:'trans_date',value:bill_date},
						{index:'notes',value:''},
						{index:'last_updated',value:last_updated}]};

			var receipt_id=get_new_key();
			var receipt_json={data_store:'receipts',
	 				data:[{index:'id',value:receipt_id},
	 					{index:'receipt_id',value:receipt_id},
	 					{index:'type',value:'paid'},
	 					{index:'amount',value:total},
	 					{index:'narration',value:''},
	 					{index:'acc_name',value:supplier},
	 					{index:'date',value:bill_date},
	 					{index:'last_updated',value:last_updated}]};

			var rtran_json={data_store:'transactions',
					data:[{index:'id',value:get_new_key()},
						{index:'acc_name',value:supplier},
						{index:'type',value:'given'},
						{index:'amount',value:total},
						{index:'tax',value:'0'},
						{index:'source_id',value:receipt_id},
						{index:'source_info',value:receipt_id},
						{index:'source',value:'payable'},
						{index:'source_link',value:'form282'},
						{index:'trans_date',value:bill_date},
						{index:'notes',value:''},
						{index:'last_updated',value:last_updated}]};

			create_json(rtran_json,function()
			{
			 	modal28_action(receipt_id);
			});

			$(save_button).off('click');
			$(save_button).on('click',function(event)
			{
				event.preventDefault();
				form21_update_form();
			});

			$("[id^='save_form21_']").click();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form21_update_form()
	{
		if(is_update_access('form21'))
		{
			var form=document.getElementById("form21_master");

			var supplier=form.elements['supplier'].value;
			var bill_id=form.elements['bill_num'].value;
			var bill_date=get_raw_time(form.elements['date'].value);
			var data_id=form.elements['bill_id'].value;
			var transaction_id=form.elements['t_id'].value;
			var save_button=form.elements['save'];

			var total=0;
			var tax=0;
			var discount=0;
			var amount=0;

			$("[id^='save_form21']").each(function(index)
			{
				var subform_id=$(this).attr('form');
				var subform=document.getElementById(subform_id);
				amount+=parseFloat(subform.elements[5].value);
				discount+=parseFloat(subform.elements[6].value);
				tax+=parseFloat(subform.elements[7].value);
				total+=parseFloat(subform.elements[8].value);
			});

			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. "+discount+"</br>" +
					"Rs. "+tax+"</br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
			$('#form21_foot').html(total_row);

			var last_updated=get_my_time();

			var data_json={data_store:'supplier_bills',
						data:[{index:'id',value:data_id},
							{index:'bill_id',value:bill_id},
							{index:'supplier',value:supplier},
					          {index:'bill_date',value:bill_date},
					          {index:'amount',value:amount},
					          {index:'total',value:total},
					          {index:'tax',value:tax},
					          {index:'discount',value:discount},
					          {index:'transaction_id',value:data_id},
							{index:'notes',value:notes},
							{index:'last_updated',value:last_updated}],
		      log:'yes',
		      log_data:{title:'Saved',notes:'Purchase Bill #'+bill_id,link_to:'form53'}};

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
						{index:'trans_date',value:bill_date},
						{index:'notes',value:''},
						{index:'last_updated',value:last_updated}]};

			update_json(data_json);
			update_json(transaction_json);

			$("[id^='save_form21_']").click();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form21_delete_item(button)
	{
		if(is_delete_access('form21'))
		{
			modal115_action(function()
			{
				var form_id=$(button).attr('form');
				var form=document.getElementById(form_id);

				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();

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

	function form21_get_totals()
	{
		var total=0;
		var tax=0;
		var discount=0;
		var amount=0;

		$("[id^='save_form21']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
			total+=parseFloat(subform.elements[8].value);
		});

		var amount=vUtil.round(amount,2);
		var tax=vUtil.round(tax,2);
		var discount=vUtil.round(discount,2);
		var total=vUtil.round(total);

		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+discount+"</br>" +
				"Rs. "+tax+"</br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form21_foot').html(total_row);
		$('#form21').formcontrol();
	}

	</script>
</div>
