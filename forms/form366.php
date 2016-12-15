<div id='form366' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form366_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form366_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      </div>
	</div>

	<div class="portlet-body">
        <form id='form366_master' autocomplete="off">
            <fieldset>
                <label><div class='btn-overlap'><input type='text' required name='supplier' placeholder='Supplier' class='floatlabel'><button type='button' title='Add new supplier' class='btn btn-icon-only default right-overlap' id='form366_add_supplier'><i class='fa fa-plus'></i></button></div></label>
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
			<tbody id='form366_body'>
			</tbody>
	      <tfoot id='form366_foot'>
	      </tfoot>
		</table>
    </div>

	<script>
	function form366_header_ini()
	{
		var fields=document.getElementById('form366_master');

		var supplier_filter=fields.elements['supplier'];
		var bill_date=fields.elements['date'];
		fields.elements['bill_id'].value=vUtil.newKey();
		var save_button=document.getElementById('form366_save');
		fields.elements['bill_num'].value="";
		supplier_filter.value='';

		$(save_button).off('click');
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form366_create_form();
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
			form366_add_item();
		});

		var suppliers_data={data_store:'suppliers',return_column:'acc_name'};
		set_my_value_list_json(suppliers_data,supplier_filter,function ()
		{
			$(supplier_filter).focus();
		});

		var add_supplier=document.getElementById('form366_add_supplier');
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
		var paginator=$('#form366_body').paginator({visible:false});
		vUtil.delay(function(){
			$('#form366').formcontrol();
		});
	}

	function form366_ini()
	{
		var bill_id=$("#form366_link").attr('data_id');
		if(bill_id==null)
			bill_id="";

		$('#form366_body').html("");
		$('#form366_foot').html("");

		if(bill_id!="")
		{
			show_loader();
			var filter_fields=document.getElementById('form366_master');

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

			read_json_rows('form366',bill_columns,function(bill_results)
			{
				if (bill_results.length>0)
				{
					filter_fields.elements['supplier'].value=bill_results[0].supplier;
					filter_fields.elements['bill_num'].value=bill_results[0].bill_id;
					filter_fields.elements['date'].value=get_my_past_date(bill_results[0].bill_date);
					filter_fields.elements['bill_id'].value=bill_id;
					var save_button=document.getElementById('form366_save');

					$(save_button).off('click');
					$(save_button).on("click", function(event)
					{
						event.preventDefault();
						form366_update_form();
					});

					var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
								"<td>Amount:<br>Discount: <br>Tax(%):@ <input type='number' value='"+bill_results[0].tax_rate+"' step='any' id='form366_tax' style='width: 60%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>Cartage: <br>Total: </td>" +
								"<td>Rs. "+bill_results[0].amount+"</br>" +
								"Rs. <input type='number' value='"+bill_results[0].discount+"' step='any' id='form366_discount' class='dblclick_editable' style='width: 80%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>" +
								"Rs. "+bill_results[0].tax+"</br>" +
								"Rs. <input type='number' value='"+bill_results[0].cartage+"' step='any' id='form366_cartage' class='dblclick_editable' style='width: 80%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>" +
								"Rs. "+bill_results[0].total+"</td>" +
								"<td></td>" +
								"</tr>";
					$('#form366_foot').html(total_row);
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

			read_json_rows('form366',bill_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form366_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<textarea readonly='readonly' form='form366_"+id+"'>"+result.product_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form366_"+id+"' value='"+result.batch+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form366_"+id+"' value='"+result.quantity+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Rate'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form366_"+id+"' value='"+result.unit_price+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form366_"+id+"' value='"+result.amount+"' step='any'>";
							// rowsHTML+="<input type='number' class='floatlabel' placeholder='Discount' readonly='readonly' form='form366_"+id+"' value='"+result.discount+"' step='any'>";
							// rowsHTML+="<input type='number' class='floatlabel' placeholder='Tax' readonly='readonly' form='form366_"+id+"' value='"+result.tax+"' step='any'>";
							// rowsHTML+="<input type='number' class='floatlabel' placeholder='Total' readonly='readonly' form='form366_"+id+"' value='"+result.total+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form366_"+id+"' value='"+id+"' name='id'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form366_"+id+"' id='save_form366_"+id+"' name='save'>";
							rowsHTML+="<button type='button' class='btn red' form='form366_"+id+"' id='delete_form366_"+id+"' name='delete' title='Delete' onclick='form366_delete_item($(this)); form366_get_totals();'><i class='fa fa-trash'></i></button>";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form366_body').append(rowsHTML);
				});

				form366_get_totals();
                $('#form366').formcontrol();
				hide_loader();
			});
		}
	}

	function form366_add_item()
	{
		if(is_create_access('form366'))
		{
			var id=vUtil.newKey();
			var rowsHTML="<tr>";
			rowsHTML+="<form id='form366_"+id+"' autocomplete='off'></form>";
				rowsHTML+="<td data-th='Item'>";
					rowsHTML+="<div class='btn-overlap'><input type='text' class='floatlabel' placeholder='Item' required form='form366_"+id+"'>";
					rowsHTML+="<button class='btn btn-icon-only default right-overlap' title='Add new product' id='form366_add_product_"+id+"'><i class='fa fa-plus'></i></button></div>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Batch'>";
					rowsHTML+="<input type='text' readonly='readonly' required form='form366_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Quantity'>";
					rowsHTML+="<input type='number' step='any' required form='form366_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Rate'>";
					rowsHTML+="<input type='number' required form='form366_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Amount'>";
					rowsHTML+="<input type='number' placeholder='Amount' required readonly='readonly' form='form366_"+id+"' step='any'>";
					// rowsHTML+="<input type='number' class='floatlabel' placeholder='Discount' form='form366_"+id+"' value='' step='any'>";
					// rowsHTML+="<input type='number' class='floatlabel dblclick_editable' placeholder='Tax' readonly='readonly' form='form366_"+id+"' value='' step='any'>";
					// rowsHTML+="<input type='number' class='floatlabel' placeholder='Total' readonly='readonly' form='form366_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					rowsHTML+="<input type='hidden' form='form366_"+id+"' value='"+id+"' name='id'>";
					rowsHTML+="<input type='button' class='submit_hidden' form='form366_"+id+"' id='save_form366_"+id+"' name='save'>";
					rowsHTML+="<button type='button' class='btn red' form='form366_"+id+"' id='delete_form366_"+id+"' name='delete' title='Delete' onclick='$(this).parent().parent().remove(); form366_get_totals();'><i class='fa fa-trash'></i></button>";
					rowsHTML+="<input type='submit' class='submit_hidden' form='form366_"+id+"'>";
					// rowsHTML+="<input type='hidden' form='form366_"+id+"' name='tax_rate'>";
				rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form366_body').prepend(rowsHTML);

			var fields=document.getElementById("form366_"+id);
			var name_filter=fields.elements[0];
			var batch_filter=fields.elements[1];
			var quantity_filter=fields.elements[2];
			var price_filter=fields.elements[3];
			var amount_filter=fields.elements[4];
			// var discount_filter=fields.elements[5];
			// var tax_filter=fields.elements[6];
			// var total_filter=fields.elements[7];
			var id_filter=fields.elements[5];
			var save_button=fields.elements[6];
			// var tax_rate_filter=fields.elements['tax_rate'];

			$(save_button).on("click", function(event)
			{
				event.preventDefault();
				form366_create_item(fields);
			});
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form366_add_item();
			});

			var product_data={data_store:'product_master',return_column:'name'};
			set_my_value_list_json(product_data,name_filter,function()
			{
				$(name_filter).focus();
			});

			var add_product=document.getElementById('form366_add_product_'+id);
			$(add_product).on('click',function()
			{
				modal228_action(function()
				{
					set_my_value_list_json(product_data,name_filter);
				});
			});

			var month = vTime.monthName().toLowerCase();
			var year = vTime.year();
			batch_filter.value=month+"-"+year;

			$(name_filter).on('blur',function(event)
			{
				// var tax_data={data_store:'product_master',return_column:'tax',
				// 				indexes:[{index:'name',exact:name_filter.value}]};
				// set_my_value_json(tax_data,tax_rate_filter);

				var price_data={data_store:'product_instances',return_column:'cost_price',
								indexes:[{index:'product_name',exact:name_filter.value},
										{index:'batch',exact:batch_filter.value}]};
				set_my_value_json(price_data,price_filter);

				quantity_filter.value="";
				// total_filter.value=0;
				amount_filter.value=0;
				// discount_filter.value=0;
				// tax_filter.value=0;
				// $(quantity_filter).floatlabel();
				// $(total_filter).floatlabel();
				// $(amount_filter).floatlabel();
				// $(discount_filter).floatlabel();
				// $(tax_filter).floatlabel();
			});

			$(price_filter).add(quantity_filter).on('blur',function(event)
			{
				amount_filter.value=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
				// tax_filter.value=parseFloat((parseFloat(tax_rate_filter.value)*(parseFloat(amount_filter.value)-parseFloat(discount_filter.value)))/100);
				// total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);
				// $(total_filter).floatlabel();
				// $(amount_filter).floatlabel();
				// $(tax_filter).floatlabel();
				form366_get_totals();
			});

			$('#form366').formcontrol();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form366_create_item(form)
	{
		if(is_create_access('form366'))
		{
			var bill_id=document.getElementById("form366_master").elements['bill_id'].value;
			var name=form.elements[0].value;
			var batch=form.elements[1].value;
			var quantity=form.elements[2].value;
			var price=form.elements[3].value;
			var amount=form.elements[4].value;
			// var discount=form.elements[5].value;
			// var tax=form.elements[6].value;
			// var total=form.elements[7].value;
			var data_id=form.elements[5].value;
			var save_button=form.elements[6];
			var del_button=form.elements[7];

			var last_updated=get_my_time();

			var data_json={data_store:'supplier_bill_items',
						data:[{index:'id',value:data_id},
							{index:'product_name',value:name},
							{index:'batch',value:batch},
							{index:'quantity',value:quantity},
							{index:'unit_price',value:price},
							{index:'amount',value:amount},
							// {index:'total',value:total},
							// {index:'tax',value:tax},
							// {index:'discount',value:discount},
							{index:'bill_id',value:bill_id},
							{index:'last_updated',value:last_updated}]};
			create_json(data_json);

			var batch_json={data_store:'product_instances',
				warning:'no',
				data:[{index:'id',value:data_id},
							{index:'product_name',value:name,uniqueWith:['batch']},
							{index:'batch',value:batch},
							{index:'cost_price',value:price},
							{index:'last_updated',value:last_updated}]};

			create_json(batch_json);

			$(form).readonly();

			del_button.removeAttribute("onclick");
			$(del_button).on('click',function(event)
			{
				form366_delete_item(del_button);
			});

			$(save_button).off('click');
		}
		else
		{
			$("#modal2_link").click();
		}
	}


	function form366_create_form()
	{
		if(is_create_access('form366'))
		{
			var form=document.getElementById("form366_master");

			var supplier=form.elements['supplier'].value;
			var bill_id=form.elements['bill_num'].value;
			var bill_date=get_raw_time(form.elements['date'].value);
			var data_id=form.elements['bill_id'].value;
			var save_button=document.getElementById('form366_save');

			var total=0;
			var tax=0;
			var discount=0;
			var amount=0;
			var tax_rate = 0;
			var cartage = 0;

			$("[id^='save_form366']").each(function(index)
			{
				var subform_id=$(this).attr('form');
				var subform=document.getElementById(subform_id);
				amount+=parseFloat(subform.elements[4].value);
				// discount+=parseFloat(subform.elements[5].value);
				// tax+=parseFloat(subform.elements[6].value);
				// total+=parseFloat(subform.elements[7].value);
			});

			if(document.getElementById('form366_cartage'))
			{
				cartage=parseFloat(document.getElementById('form366_cartage').value);
				discount=parseFloat(document.getElementById('form366_discount').value);
				tax_rate=parseFloat(document.getElementById('form366_tax').value);
				cartage = isNaN(cartage)? 0 : cartage;
				discount = isNaN(discount)? 0 : discount;
				tax_rate = isNaN(tax_rate)? 0 : tax_rate;
			}

			amount=vUtil.round(amount,2);
			tax=vUtil.round(tax_rate*(amount/100),2);
			total=vUtil.round((tax+amount-discount+cartage),0);

			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
						"<td>Amount:<br>Discount: <br>Tax(%):@ <input type='number' value='"+tax_rate+"' step='any' id='form366_tax' style='width: 60%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>Cartage: <br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. <input type='number' value='"+discount+"' step='any' id='form366_discount' class='dblclick_editable' style='width: 80%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>" +
						"Rs. "+tax+"</br>" +
						"Rs. <input type='number' value='"+cartage+"' step='any' id='form366_cartage' class='dblclick_editable' style='width: 80%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
			$('#form366_foot').html(total_row);

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
							  {index:'tax_rate',value:tax_rate},
							  {index:'cartage',value:cartage},
					          {index:'transaction_id',value:data_id},
							{index:'notes',value:''},
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

			var receipt_id=vUtil.newKey();
			var receipt_num="PB-"+bill_id;
			var receipt_json={data_store:'receipts',
	 				data:[{index:'id',value:receipt_id},
	 					{index:'receipt_id',value:receipt_num},
	 					{index:'type',value:'paid'},
	 					{index:'amount',value:total},
						{index:'heading',value:'For Bill # '+bill_id},
						{index:'narration',value:'For Bill # '+bill_id},
						{index:'acc_name',value:supplier},
	 					{index:'date',value:bill_date},
						{index:'source_id',value:data_id},
	 					{index:'last_updated',value:last_updated}]};

			var rtran_json={data_store:'transactions',
					data:[{index:'id',value:receipt_id},
						{index:'acc_name',value:supplier},
						{index:'type',value:'given'},
						{index:'amount',value:total},
						{index:'tax',value:'0'},
						{index:'source_id',value:receipt_id},
						{index:'source_info',value:receipt_num},
						{index:'source',value:'payable'},
						{index:'source_link',value:'form282'},
						{index:'trans_date',value:bill_date},
						{index:'notes',value:''},
						{index:'receipt_source_id',value:data_id},
						{index:'last_updated',value:last_updated}]};

			create_json(rtran_json);
			create_json(receipt_json,function()
			{
				modal28_action(receipt_id,supplier,total,total,'cash');
			});

			$(save_button).off('click');
			$(save_button).on('click',function(event)
			{
				event.preventDefault();
				form366_update_form();
			});

			$("[id^='save_form366_']").click();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form366_update_form()
	{
		if(is_update_access('form366'))
		{
			var form=document.getElementById("form366_master");

			var supplier=form.elements['supplier'].value;
			var bill_id=form.elements['bill_num'].value;
			var bill_date=get_raw_time(form.elements['date'].value);
			var data_id=form.elements['bill_id'].value;
			var save_button=form.elements['save'];

			var total=0;
			var tax=0;
			var discount=0;
			var amount=0;
			var tax_rate = 0;
			var cartage = 0;

			$("[id^='save_form366']").each(function(index)
			{
				var subform_id=$(this).attr('form');
				var subform=document.getElementById(subform_id);
				amount+=parseFloat(subform.elements[4].value);
				// discount+=parseFloat(subform.elements[5].value);
				// tax+=parseFloat(subform.elements[6].value);
				// total+=parseFloat(subform.elements[7].value);
			});

			if(document.getElementById('form366_cartage'))
			{
				cartage=parseFloat(document.getElementById('form366_cartage').value);
				discount=parseFloat(document.getElementById('form366_discount').value);
				tax_rate=parseFloat(document.getElementById('form366_tax').value);
				cartage = isNaN(cartage)? 0 : cartage;
				discount = isNaN(discount)? 0 : discount;
				tax_rate = isNaN(tax_rate)? 0 : tax_rate;
			}

			amount=vUtil.round(amount,2);
			tax=vUtil.round(tax_rate*(amount/100),2);
			total=vUtil.round((tax+amount-discount+cartage),0);

			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
						"<td>Amount:<br>Discount: <br>Tax(%):@ <input type='number' value='"+tax_rate+"' step='any' id='form366_tax' style='width: 60%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>Cartage: <br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. <input type='number' value='"+discount+"' step='any' id='form366_discount' class='dblclick_editable' style='width: 80%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>" +
						"Rs. "+tax+"</br>" +
						"Rs. <input type='number' value='"+cartage+"' step='any' id='form366_cartage' class='dblclick_editable' style='width: 80%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
			$('#form366_foot').html(total_row);

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
							  {index:'tax_rate',value:tax_rate},
							  {index:'cartage',value:cartage},
					          {index:'transaction_id',value:data_id},
							{index:'notes',value:''},
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

			var payment_data={data_store:'receipts',
							indexes:[{index:'id'},{index:'amount'},{index:'mode_payment'},{index:'source_id',exact:data_id}]};
			read_json_rows('',payment_data,function(payments)
			{
				if(payments.length>0)
				{
					var receipt_num="PB-"+bill_id;
					var receipt_json={data_store:'receipts',
			 				data:[{index:'id',value:payments[0].id},
			 					{index:'receipt_id',value:receipt_num},
			 					{index:'type',value:'paid'},
			 					{index:'amount',value:total},
								{index:'heading',value:'For Bill # '+bill_id},
								{index:'narration',value:'For Bill # '+bill_id},
								{index:'acc_name',value:supplier},
			 					{index:'date',value:bill_date},
			 					{index:'last_updated',value:last_updated}]};

					var rtran_json={data_store:'transactions',
							data:[{index:'id',value:payments[0].id},
								{index:'acc_name',value:supplier},
								{index:'type',value:'given'},
								{index:'amount',value:total},
								{index:'tax',value:'0'},
								{index:'source_info',value:receipt_num},
								{index:'source',value:'payable'},
								{index:'source_link',value:'form282'},
								{index:'trans_date',value:bill_date},
								{index:'notes',value:''},
								{index:'last_updated',value:last_updated}]};

					update_json(rtran_json);
					update_json(receipt_json,function()
					{
						modal28_action(payments[0].id,supplier,total,payments[0].amount,payments[0].mode_payment);
					});
				}
			});

			$("[id^='save_form366_']").click();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form366_delete_item(button)
	{
		if(is_delete_access('form366'))
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

	function form366_get_totals()
	{
		var total=0;
		var tax=0;
		var discount=0;
		var amount=0;
		var tax_rate = 0;
		var cartage = 0;

		$("[id^='save_form366']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			amount+=parseFloat(subform.elements[4].value);
			// discount+=parseFloat(subform.elements[5].value);
			// tax+=parseFloat(subform.elements[6].value);
			// total+=parseFloat(subform.elements[7].value);
		});

		if(document.getElementById('form366_cartage'))
		{
			cartage=parseFloat(document.getElementById('form366_cartage').value);
			discount=parseFloat(document.getElementById('form366_discount').value);
			tax_rate=parseFloat(document.getElementById('form366_tax').value);
			cartage = isNaN(cartage)? 0 : cartage;
			discount = isNaN(discount)? 0 : discount;
			tax_rate = isNaN(tax_rate)? 0 : tax_rate;
		}

		amount=vUtil.round(amount,2);
		tax=vUtil.round(tax_rate*(amount/100),2);
		total=vUtil.round((tax+amount-discount+cartage),0);

		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Amount:<br>Discount: <br>Tax(%):@ <input type='number' value='"+tax_rate+"' step='any' id='form366_tax' style='width: 60%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>Cartage: <br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. <input type='number' value='"+discount+"' step='any' id='form366_discount' class='dblclick_editable' style='width: 80%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>" +
					"Rs. "+tax+"</br>" +
					"Rs. <input type='number' value='"+cartage+"' step='any' id='form366_cartage' class='dblclick_editable' style='width: 80%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		$('#form366_foot').html(total_row);
		$('#form366').formcontrol();
	}

	</script>
</div>
