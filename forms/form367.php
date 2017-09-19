<div id='form367' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-sm' onclick='form367_add_product();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-sm' id='form367_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form367_print' onclick=form367_print_form();><i class='fa fa-print'></i> Print</a>
      	<a class='btn btn-default btn-sm' id='form367_share'><i class='fa fa-envelope'></i> Mail</a>
      </div>
	</div>

	<div class="portlet-body">
        <form id='form367_master' autocomplete="off">
            <fieldset>
                <label><div class='btn-overlap'><input type='text' required name='customer' placeholder='Customer' class='floatlabel'><button type='button' title='Add new customer' class='btn btn-icon-only default right-overlap' id='form367_add_customer'><i class='fa fa-plus'></i></button></div></label>
				<label><input type='text' name='date' required class='floatlabel' placeholder='Bill Date'></label>
                <label><input type='text' name='bill_num' readonly='readonly' required class='floatlabel' placeholder='Bill #'></label>
                <label><input type='checkbox' checked name='sub_totals'> Show Sub-Totals</label>
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
			<tbody id='form367_body'>
			</tbody>
		      <tfoot id='form367_foot'>
		      </tfoot>
		</table>
    </div>

	<script>
	function form367_header_ini()
	{
		var fields=document.getElementById('form367_master');

		var customers_filter=fields.elements['customer'];
		var bill_date=fields.elements['date'];
		var bill_num=fields.elements['bill_num'];
		fields.elements['bill_id'].value=vUtil.newKey();
		var save_button=document.getElementById('form367_save');

		var bill_id=$("#form367_link").attr('data_id');
		if(vUtil.isBlank(bill_id))
		{
			var bill_num_data={data_store:'user_preferences',return_column:'value',
								indexes:[{index:'name',exact:'bill_num'}]};
			set_my_value_json(bill_num_data,bill_num);
		}

		$(save_button).off('click');
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form367_create_form();
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
			form367_add_product();
		});

		var customers_data={data_store:'customers',return_column:'acc_name'};
		set_my_value_list_json(customers_data,customers_filter,function ()
		{
			$(customers_filter).focus();
		});

		var add_customer=document.getElementById('form367_add_customer');
		$(add_customer).off('click');
		$(add_customer).on('click',function()
		{
			modal11_action(function()
			{
				set_my_value_list_json(customers_data,customers_filter);
			});
		});

		$(bill_date).datepicker();
		bill_date.value=vTime.date();
		customers_filter.value='';
		var paginator=$('#form367_body').paginator({visible:false});
		vUtil.delay(function(){
			$('#form367').formcontrol();
		});
	}

	function form367_ini()
	{
		var bill_id=$("#form367_link").attr('data_id');
		if(bill_id==null)
			bill_id="";

		$('#form367_body').html("");
		$('#form367_foot').html("");

		if(bill_id!="")
		{
			show_loader();
			var filter_fields=document.getElementById('form367_master');

			var bill_columns={data_store:'bills',count:1,
							 indexes:[{index:'id',value:bill_id},
									 {index:'bill_num'},
									 {index:'customer_name'},
									 {index:'total'},
									 {index:'amount'},
									 {index:'tax'},
									 {index:'discount'},
									 {index:'bill_date'}]};

		 	read_json_rows('form367',bill_columns,function(bill_results)
			{
				if(bill_results.length>0)
				{
					filter_fields.elements['customer'].value=bill_results[0].customer_name;
					filter_fields.elements['date'].value=get_my_past_date(bill_results[0].bill_date);
					filter_fields.elements['bill_num'].value=bill_results[0].bill_num;
					filter_fields.elements['bill_id'].value=bill_id;
					var save_button=document.getElementById('form367_save');

					$(save_button).off('click');
					$(save_button).on("click", function(event)
					{
						event.preventDefault();
						form367_update_form();
					});
				}
			});

			var bill_items_column={data_store:'bill_items',
		 					  indexes:[{index:'id'},
		 							  {index:'item_name'},
									  {index:'item_desc'},
		 							  {index:'staff'},
		 							  {index:'batch'},
		 							  {index:'quantity'},
		 							  {index:'unit_price'},
		 							  {index:'amount'},
		 							  {index:'total'},
		 							  {index:'tax'},
		 							  {index:'discount'},
		 							  {index:'bill_id',exact:bill_id}]};

			read_json_rows('form367',bill_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var id=result.id;
					// console.log(result);
					var discount_percent = (vUtil.isBlank(result.discount) || parseFloat(result.amount)==0) ? 0 : vUtil.round((result.discount/result.amount),2);
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form367_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<input type='text' placeholder='Item' readonly='readonly' class='floatlabel' form='form367_"+id+"' value='"+result.item_name+"'>";
							rowsHTML+="<textarea placeholder='Description' readonly='readonly' class='floatlabel' form='form367_"+id+"'>"+result.item_desc+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form367_"+id+"' value='"+result.batch+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form367_"+id+"' value='"+result.quantity+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Rate'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form367_"+id+"' value='"+result.unit_price+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' readonly='readonly' form='form367_"+id+"' step='any' value='"+result.amount+"'>";
							rowsHTML+="<input type='number' class='floatlabel' placeholder='Discount %' readonly='readonly' form='form367_"+id+"' step='any' value='"+discount_percent+"'>";
							rowsHTML+="<input type='number' class='floatlabel' placeholder='Tax' readonly='readonly' form='form367_"+id+"' step='any' value='"+result.tax+"'>";
							rowsHTML+="<input type='number' class='floatlabel' placeholder='Total' readonly='readonly' form='form367_"+id+"' step='any' value='"+result.total+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form367_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form367_"+id+"' id='save_form367_"+id+"'>";
							rowsHTML+="<button type='button' class='btn red' form='form367_"+id+"' id='delete_form367_"+id+"' onclick='form367_delete_item($(this));' title='Delete' name='delete'><i class='fa fa-trash'></i></button>";
							rowsHTML+="<input type='hidden' form='form367_"+id+"' value='"+result.discount+"' name='discount'>";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form367_body').append(rowsHTML);
				});

				var bt=get_session_var('title');
				$('#form367_share').show();
				$('#form367_share').off('click');
				$('#form367_share').on('click',function()
				{
					modal101_action(bt+' - Invoice# '+filter_fields.elements['bill_num'].value,filter_fields.elements['customer'].value,'customer',function (func)
					{
						print_form367(func);
					});
				});
				form367_get_totals();
				$('#form367').formcontrol();
				hide_loader();
			});
		}
	}

	function form367_add_product()
	{
		if(is_create_access('form367'))
		{
			var id=vUtil.newKey();
			var rowsHTML="<tr>";
			rowsHTML+="<form id='form367_"+id+"' autocomplete='off'></form>";
				rowsHTML+="<td data-th='Item'><div class='btn-overlap'>";
					rowsHTML+="<input type='text' placeholder='Item' class='floatlabel' required form='form367_"+id+"' id='form367_item_"+id+"'>";
					rowsHTML+="<button class='btn btn-icon-only default right-overlap' onclick=\"modal194_action('#form367_item_"+id+"');\"><i class='fa fa-search'></i></button></div>";
					rowsHTML+="<textarea placeholder='Description' class='floatlabel' form='form367_"+id+"' id='form367_item_"+id+"'></textarea>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Batch'>";
					rowsHTML+="<input type='text' placeholder='Batch' required form='form367_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Quantity'>";
					rowsHTML+="<input type='number' placeholder='Quantity' required form='form367_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Rate'>";
					rowsHTML+="<input type='number' placeholder='Rate' equired form='form367_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Amount'>";
					rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' readonly='readonly' required form='form367_"+id+"' step='any'>";
					rowsHTML+="<input type='number' class='floatlabel' placeholder='Discount %' form='form367_"+id+"' step='any' value='0'>";
					rowsHTML+="<input type='number' required class='floatlabel' placeholder='Tax' readonly='readonly' form='form367_"+id+"' step='any'>";
					rowsHTML+="<input type='number' required class='floatlabel' placeholder='Total' readonly='readonly' required form='form367_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					rowsHTML+="<input type='hidden' form='form367_"+id+"' value='"+id+"'>";
					rowsHTML+="<input type='button' class='submit_hidden' form='form367_"+id+"' id='save_form367_"+id+"' >";
					rowsHTML+="<button type='button' class='btn red' form='form367_"+id+"' name='delete' title='Delete' id='delete_form367_"+id+"' onclick='$(this).parent().parent().remove(); form367_get_totals();'><i class='fa fa-trash'></i></button>";
					rowsHTML+="<input type='submit' class='submit_hidden' form='form367_"+id+"'>";
					rowsHTML+="<input type='hidden' form='form367_"+id+"' name='tax_rate'>";
					rowsHTML+="<input type='hidden' form='form367_"+id+"' name='type' value='product'>";
					rowsHTML+="<input type='hidden' form='form367_"+id+"' name='discount'>";
				rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form367_body').prepend(rowsHTML);

			var fields=document.getElementById("form367_"+id);
			var name_filter=fields.elements[0];
			var desc_filter=fields.elements[1];
			var batch_filter=fields.elements[2];
			var quantity_filter=fields.elements[3];
			var price_filter=fields.elements[4];
			var amount_filter=fields.elements[5];
			var discount_percent_filter=fields.elements[6];
			var tax_filter=fields.elements[7];
			var total_filter=fields.elements[8];
			var id_filter=fields.elements[9];
			var save_button=fields.elements[10];
			var tax_rate_filter=fields.elements[13];
			var discount_filter=fields.elements['discount'];

			$(save_button).on("click", function(event)
			{
				event.preventDefault();
				form367_create_item(fields);
			});

			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form367_add_product();
			});

			var product_data={data_store:'product_master',return_column:'name'};
			set_my_value_list_json(product_data,name_filter,function(){
				$(name_filter).focus();
			});

			$(name_filter).on('blur change',function(event)
			{
				var desc_data={data_store:'product_master',return_column:'description',
							indexes:[{index:'name',exact:name_filter.value}]};
				set_my_value_json(desc_data,desc_filter,function()
				{
					$(desc_filter).floatlabel();
				});

				var tax_data={data_store:'product_master',return_column:'tax',
							indexes:[{index:'name',exact:name_filter.value}]};
				set_my_value_json(tax_data,tax_rate_filter);

				var batch_data={data_store:'product_instances',return_column:'batch',
									indexes:[{index:'product_name',exact:name_filter.value}]};
				set_my_value_list_json(batch_data,batch_filter);

				var last_batch_data={data_store:'bill_items',return_column:'batch',
									indexes:[{index:'item_name',exact:name_filter.value}]};
				set_my_value_json(last_batch_data,batch_filter,function ()
				{
					var price_data={data_store:'product_instances',return_column:'sale_price',
									indexes:[{index:'product_name',exact:name_filter.value}]};
					set_my_value_json(price_data,price_filter);

					get_inventory(name_filter.value,'',function(quantity)
					{
						$(quantity_filter).attr('min',"0");
						$(quantity_filter).attr('placeholder',quantity);
					});

					quantity_filter.value="";
					total_filter.value=0;
					amount_filter.value=0;
					discount_filter.value=0;
					discount_percent_filter.value = 0;
					tax_filter.value=0;

					$(total_filter).floatlabel();
					$(amount_filter).floatlabel();
					$(discount_percent_filter).floatlabel();
					$(tax_filter).floatlabel();
				});
			});

			$(batch_filter).on('blur',function(event)
			{
				var price_data={data_store:'product_instances',return_column:'sale_price',
								indexes:[{index:'product_name',exact:name_filter.value}]};
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
				discount_percent_filter.value = 0;
				tax_filter.value=0;

				// $(quantity_filter).floatlabel();
				$(total_filter).floatlabel();
				$(amount_filter).floatlabel();
				$(discount_percent_filter).floatlabel();
				$(tax_filter).floatlabel();
			});

			$(quantity_filter).add(price_filter).add(discount_percent_filter).on('blur',function(event)
			{
				amount_filter.value=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
				discount_filter.value = vUtil.round((parseFloat(discount_percent_filter.value)*parseFloat(amount_filter.value)/100),2);
				tax_filter.value=parseFloat((parseFloat(tax_rate_filter.value)*(parseFloat(amount_filter.value)-parseFloat(discount_filter.value)))/100);
				total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);

				$(total_filter).floatlabel();
				$(amount_filter).floatlabel();
				$(tax_filter).floatlabel();
			});

			form367_get_totals();
			$('#form367').formcontrol();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form367_create_item(form)
	{
		if(is_create_access('form367'))
		{
			var bill_id=document.getElementById("form367_master").elements['bill_id'].value;
			var name=form.elements[0].value;
			var desc=form.elements[1].value;
			var batch=form.elements[2].value;
			var quantity=form.elements[3].value;
			var price=form.elements[4].value;
			var amount=form.elements[5].value;
			var discount=form.elements['discount'].value;
			var tax=form.elements[7].value;
			var total=form.elements[8].value;
			var data_id=form.elements[9].value;
			var last_updated=get_my_time();
			var save_button=form.elements[10];
			var del_button=form.elements[11];

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
				form367_delete_item(del_button);
			});

			$(save_button).off('click');
		}
		else
		{
			$("#modal2_link").click();
		}
	}


	function form367_create_form()
	{
		if(is_create_access('form367'))
		{
			var form=document.getElementById("form367_master");

			var customer=form.elements['customer'].value;
			var bill_date=get_raw_time(form.elements['date'].value);
			var bill_num=form.elements['bill_num'].value;
			var data_id=form.elements['bill_id'].value;
			var save_button=document.getElementById('form367_save');

			var bt=get_session_var('title');
			$('#form367_share').show();
			$('#form367_share').off('click');
			$('#form367_share').on('click',function()
			{
				modal101_action(bt+' - Invoice# '+bill_num,customer,'customer',function (func)
				{
					print_form367(func);
				});
			});

			var amount=0;
			var discount=0;
			var vat=0;
			var total=0;

			$("[id^='save_form367']").each(function(index)
			{
				var subform_id=$(this).attr('form');
				var subform=document.getElementById(subform_id);

				if(!isNaN(parseFloat(subform.elements[5].value)))
				{
					amount+=parseFloat(subform.elements[5].value);
				}
				if(!isNaN(parseFloat(subform.elements['discount'].value)))
				{
					discount+=parseFloat(subform.elements['discount'].value);
				}
				if(!isNaN(parseFloat(subform.elements[7].value)))
				{
					vat+=parseFloat(subform.elements[7].value);
				}if(!isNaN(parseFloat(subform.elements[8].value)))
				{
					total+=parseFloat(subform.elements[8].value);
				}
			});

			vat=vUtil.round(vat,2);
			amount=vUtil.round(amount,2);
			discount=vUtil.round(discount,2);
			total=vUtil.round(total);

			var tax=vat;
			var tax_string="VAT: ";
			var tax_amount_string="Rs. "+vat+"<br>";

			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
						"<td>Amount:<br>Discount: <br>"+tax_string+"<br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+discount+"</br>" +
						tax_amount_string +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
			$('#form367_foot').html(total_row);

			var last_updated=get_my_time();

			var data_json={data_store:'bills',
				data:[{index:'id',value:data_id},
					{index:'customer_name',value:customer},
					{index:'bill_num',value:bill_num},
					{index:'bill_date',value:bill_date},
					{index:'amount',value:amount},
					{index:'total',value:total},
					{index:'discount',value:discount},
					{index:'tax',value:tax},
					{index:'transaction_id',value:data_id},
					{index:'last_updated',value:last_updated}],
				log:'yes',
				log_data:{title:'Created',notes:'Bill # '+bill_num,link_to:'form42'}};

			var transaction_json={data_store:'transactions',
				data:[{index:'id',value:data_id},
					{index:'acc_name',value:customer},
					{index:'type',value:'given'},
					{index:'amount',value:total},
					{index:'tax',value:tax},
					{index:'source_id',value:data_id},
					{index:'source_info',value:bill_num},
					{index:'source',value:'sale bill'},
					{index:'source_link',value:'form42'},
					{index:'trans_date',value:bill_date},
					{index:'notes',value:''},
					{index:'last_updated',value:last_updated}]};

			var receipt_id=vUtil.newKey();
			var receipt_num="B-"+bill_num;
			var receipt_json={data_store:'receipts',
					data:[{index:'id',value:receipt_id},
						{index:'receipt_id',value:receipt_num},
						{index:'type',value:'received'},
						{index:'amount',value:total},
						{index:'heading',value:'For Bill # '+bill_num},
						{index:'narration',value:'For Bill # '+bill_num},
						{index:'acc_name',value:customer},
						{index:'date',value:bill_date},
						{index:'source_id',value:data_id},
						{index:'last_updated',value:last_updated}]};

			var rtran_json={data_store:'transactions',
					data:[{index:'id',value:receipt_id},
						{index:'acc_name',value:customer},
						{index:'type',value:'received'},
						{index:'amount',value:total},
						{index:'tax',value:'0'},
						{index:'source_id',value:receipt_id},
						{index:'source_info',value:receipt_num},
						{index:'source',value:'receipt'},
						{index:'source_link',value:'form291'},
						{index:'trans_date',value:bill_date},
						{index:'notes',value:''},
						{index:'receipt_source_id',value:data_id},
						{index:'last_updated',value:last_updated}]};

			create_json(data_json);
			create_json(transaction_json);

			create_json(rtran_json);
			create_json(receipt_json,function()
			{
				modal26_action(receipt_id,customer,total,total,'cash');
			});

			var num_data={data_store:'user_preferences',
						 indexes:[{index:'id'},{index:'name',exact:"bill_num"},{index:'value'}]};
			read_json_rows('',num_data,function (bill_num_ids)
			{
				if(bill_num_ids.length>0)
				{
					var num_json={data_store:'user_preferences',
					data:[{index:'id',value:bill_num_ids[0].id},
						{index:'last_updated',value:last_updated}]};

					if(isNaN(bill_num))
					{
						num_json.data.push({index:'value',value:(parseFloat(bill_num_ids[0].value)+1)+""});
					}
					else
					{
						num_json.data.push({index:'value',value:(parseFloat(bill_num)+1)+""});
					}
					update_json(num_json);
				}
			});

			$(save_button).off('click');
			$(save_button).on('click',function(event)
			{
				event.preventDefault();
				form367_update_form();
			});

			$("[id^='save_form367_']").click();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form367_update_form()
	{
		if(is_create_access('form367'))
		{
			var form=document.getElementById("form367_master");

			var customer=form.elements['customer'].value;
			var bill_date=get_raw_time(form.elements['date'].value);
			var bill_num=form.elements['bill_num'].value;
			var data_id=form.elements['bill_id'].value;

			var bt=get_session_var('title');
			$('#form367_share').show();
			$('#form367_share').off('click');
			$('#form367_share').on('click',function()
			{
				modal101_action(bt+' - Invoice# '+bill_num,customer,'customer',function (func)
				{
					print_form367(func);
				});
			});

			var amount=0;
			var discount=0;
			var vat=0;
			var total=0;

			$("[id^='save_form367']").each(function(index)
			{
				var subform_id=$(this).attr('form');
				var subform=document.getElementById(subform_id);

				if(!isNaN(parseFloat(subform.elements[5].value)))
				{
					amount+=parseFloat(subform.elements[5].value);
				}
				if(!isNaN(parseFloat(subform.elements['discount'].value)))
				{
					discount+=parseFloat(subform.elements['discount'].value);
				}
				if(!isNaN(parseFloat(subform.elements[8].value)))
				{
					total+=parseFloat(subform.elements[8].value);
				}
				if(!isNaN(parseFloat(subform.elements[7].value)))
				{
					vat+=parseFloat(subform.elements[7].value);
				}
			});

			vat=vUtil.round(vat,2);
			amount=vUtil.round(amount,2);
			discount=vUtil.round(discount,2);
			total=vUtil.round(total,0);

			var tax=vat;
			var tax_string="VAT:";
			var tax_amount_string="Rs. "+vat+"<br>";

			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
						"<td>Amount:<br>Discount: <br>"+tax_string+"<br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+discount+"</br>" +
						tax_amount_string +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
			$('#form367_foot').html(total_row);


			var last_updated=get_my_time();

			var data_json={data_store:'bills',
				data:[{index:'id',value:data_id},
					{index:'customer_name',value:customer},
					{index:'bill_num',value:bill_num},
					{index:'bill_date',value:bill_date},
					{index:'amount',value:amount},
					{index:'total',value:total},
					{index:'discount',value:discount},
					{index:'tax',value:tax},
					{index:'transaction_id',value:data_id},
					{index:'last_updated',value:last_updated}],
				log:'yes',
				log_data:{title:'Updated',notes:'Bill # '+bill_num,link_to:'form42'}};

			var transaction_json={data_store:'transactions',
				data:[{index:'id',value:data_id},
					{index:'acc_name',value:customer},
					{index:'type',value:'given'},
					{index:'amount',value:total},
					{index:'tax',value:tax},
					{index:'source_id',value:data_id},
					{index:'source_info',value:bill_num},
					{index:'source',value:'sale bill'},
					{index:'source_link',value:'form42'},
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
					var receipt_num="B-"+bill_num;
					var receipt_json={data_store:'receipts',
			 				data:[{index:'id',value:payments[0].id},
			 					{index:'receipt_id',value:receipt_num},
			 					{index:'type',value:'received'},
			 					{index:'amount',value:total},
								{index:'heading',value:'For Bill # '+bill_num},
								{index:'narration',value:'For Bill # '+bill_num},
								{index:'acc_name',value:customer},
			 					{index:'date',value:bill_date},
			 					{index:'last_updated',value:last_updated}]};

					var rtran_json={data_store:'transactions',
							data:[{index:'id',value:payments[0].id},
								{index:'acc_name',value:customer},
								{index:'type',value:'received'},
								{index:'amount',value:total},
								{index:'tax',value:'0'},
								{index:'source_info',value:receipt_num},
								{index:'source',value:'receipt'},
								{index:'source_link',value:'form291'},
								{index:'trans_date',value:bill_date},
								{index:'notes',value:''},
								{index:'last_updated',value:last_updated}]};

					update_json(rtran_json);
					update_json(receipt_json,function()
					{
						modal26_action(payments[0].id,customer,total,payments[0].amount,payments[0].mode_payment);
					});
				}
			});

			$("[id^='save_form367_']").click();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form367_delete_item(button)
	{
		if(is_delete_access('form367'))
		{
			modal115_action(function()
			{
				var form_id=$(button).attr('form');
				var form=document.getElementById(form_id);
				var data_id=form.elements[9].value;

				var data_json={data_store:'bill_items',
							data:[{index:'id',value:data_id}]};

				delete_json(data_json);
				$(button).parent().parent().remove();
				form367_get_totals();
			});
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form367_get_totals()
	{
		var amount=0;
		var discount=0;
		var vat=0;
		var total=0;

		$("[id^='save_form367']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);

			if(!isNaN(parseFloat(subform.elements[5].value)))
			{
				amount+=parseFloat(subform.elements[5].value);
			}
			if(!isNaN(parseFloat(subform.elements['discount'].value)))
			{
				discount+=parseFloat(subform.elements['discount'].value);
			}
			if(!isNaN(parseFloat(subform.elements[7].value)))
			{
				vat+=parseFloat(subform.elements[7].value);
			}
			if(!isNaN(parseFloat(subform.elements[8].value)))
			{
				total+=parseFloat(subform.elements[8].value);
			}

		});

		vat=vUtil.round(vat,2);
		amount=vUtil.round(amount,2);
		discount=vUtil.round(discount,2);
		total=vUtil.round(total,0);

		var tax_string="VAT: ";
		var tax_amount_string="Rs. "+vat+"<br>";

		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Amount:<br>Discount: <br>"+tax_string+"<br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. "+discount+"</br>" +
					tax_amount_string +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		$('#form367_foot').html(total_row);
	}

	function form367_print_form()
	{
		print_form367(function(container)
		{
			$.print(container);
			container.innerHTML="";
		});
	}

	function print_form367(func)
	{
		var form_id='form367';
		////////////setting up containers///////////////////////
		var container=document.createElement('div');
		var header=document.createElement('div');
			var logo=document.createElement('div');
			var business_intro=document.createElement('div');
			var clearing=document.createElement('div');
		var business_contact=document.createElement('div');

		var info_section=document.createElement('div');

		var table_container=document.createElement('div');

		var footer=document.createElement('div');

		////////////setting styles for containers/////////////////////////

		header.setAttribute('style','width:100%;min-height:100px;text-align:center');
			logo.setAttribute('style','width:20%;text-align:left;float:left;');
			business_intro.setAttribute('style','width:40%;float:right;text-align:right;');
			clearing.setAttribute('style','clear:both;');
			business_contact.setAttribute('style','width:100%;text-align:center');
		info_section.setAttribute('style','width:100%;min-height:80px;text-align:left;margin:5px;');
		footer.setAttribute('style','width:100%;min-height:100px;text-align:left;margin:10px 5px;');

		///////////////getting the content////////////////////////////////////////

		var bt=get_session_var('title');
		var logo_image=get_session_var('logo');
		var business_address=get_session_var('address');
		var business_phone=get_session_var('phone');
		var business_email=get_session_var('email');

		var master_form=document.getElementById(form_id+'_master');
		var customer_name=master_form.elements['customer'].value;
		var date=master_form.elements['date'].value;
		var bill_num=master_form.elements['bill_num'].value;
		var vat_no=get_session_var('tin');

		var show_sub_totals=master_form.elements['sub_totals'];

		var bill_message=get_session_var('bill_message').replace(/\n/g,"<br>");

		////////////////filling in the content into the containers//////////////////////////

		logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
		business_intro.innerHTML="Tel: "+business_phone+"<br>E-Mail: "+business_email+"<br>TIN #: "+vat_no;
		business_contact.innerHTML="<hr style='border: 1px solid #000;'>"+business_address;

		var info_section_text="<hr style='border: 1px solid #000;'><div style='text-align:center;'><b style='text-size:1.2em'>Invoice No: "+bill_num+"</b></div><hr style='border: 1px solid #000;'>"+
								"<div style='float:left;text-align:left;'><b>For: </b>"+customer_name+"</div>"+
								"<div style='float:right;text-align:right;'><b>Dated</b>: "+date+"</div>"+
								"<div style='clear:both;'></div>";
	/*
		if(show_sub_totals.checked)
		{
			info_section_text+="<br>VAT #: "+vat_no;
		}
	*/
		info_section.innerHTML=info_section_text;
		footer.innerHTML=bill_message;

		var table_element=document.getElementById(form_id+'_body');

		/////////////adding new table //////////////////////////////////////////////////////
		var new_table=document.createElement('table');
		new_table.setAttribute('style','border:none;width:100%;font-size:14px;text-align:left;');

		var table_header_product="<tr style='border-top: 1px solid #000;border-bottom: 1px solid #000;'>"+
					"<td style='text-align:left;width:50px;wrap:break-word'>Code</td>"+
					"<td style='text-align:left;width:115px;wrap:break-word'>Item</td>"+
					"<td style='text-align:left;width:45px'>Qty</td>"+
					"<td style='text-align:left;width:45px'>Total</td></tr>";

		var table_rows_product=table_header_product;
		var counter_product=0;
		var total_items=0;
		var total_amount=0;
		var total_vat=0;
		var total_st=0;
		var master_total=0;

		$(table_element).find('form').each(function(index)
		{
			var form=$(this)[0];
			var item_name=form.elements[0].value;
			var item_desc=form.elements[1].value;
			var batch=form.elements[2].value;
			var quantity=""+form.elements[3].value;
			var price=form.elements[4].value;
			var amount=form.elements[5].value;
			var tax=form.elements[7].value;
			var total=form.elements[8].value;

			counter_product+=1;

			if(!isNaN(parseFloat(form.elements[3].value)))
			{
				total_items+=parseFloat(form.elements[3].value);
			}
			if(!isNaN(parseFloat(form.elements[5].value)))
			{
				total_amount+=parseFloat(form.elements[5].value);
			}
			if(!isNaN(parseFloat(form.elements[7].value)))
			{
				total_vat+=parseFloat(form.elements[7].value);
			}
			if(!isNaN(parseFloat(form.elements[8].value)))
			{
				master_total+=parseFloat(form.elements[8].value);
			}
			table_rows_product+="<tr>"+
					"<td style='text-align:left;'>"+item_name+"</td>"+
					"<td style='text-align:left;'>"+item_desc+"</td>"+
					"<td style='text-align:left;'>"+quantity+"</td>"+
					"<td style='text-align:left;'>"+total+"</td></tr>";


		});

		total_amount=vUtil.round(total_amount,2);
		total_vat=vUtil.round(total_vat,2);
		total_st=vUtil.round(total_st,2);
		master_total=vUtil.round(master_total,0);

		var row_count=$(table_element).find('tbody>tr').length;
		var rows_to_add=5-row_count;
		for(var i=0;i<rows_to_add;i++)
		{
			table_rows_product+="<tr style='flex:2;height:20px;'><td></td><td></td><td></td><td></td></tr>";
		}

		var table_foot=document.getElementById(form_id+'_foot');

		var display_total="Total:";
		var display_total_amount="Rs. "+master_total;

		if(show_sub_totals.checked)
		{
			display_total="Amount:<br>VAT(5.5%): <br>Total:";
			display_total_amount="Rs. "+total_amount+"<br>Rs. "+total_vat+"<br>Rs. "+master_total;
		}

		//console.log(total_amount);
		var table_foot_row="<tr border='1' style='border-top: 1px solid #000;border-bottom: 1px solid #000;'>"+
					"<td colspan='2' style='text-align:left;'>Total bill Items:"+total_items+"</td>"+
					"<td style='text-align:left;'>"+display_total+"</td>"+
					"<td style='text-align:left;'>"+display_total_amount+"</td></tr>";
		//console.log(table_foot_row);
		var table_rows="";
		if(counter_product>0)
		{
			table_rows+=table_rows_product;
		}

		table_rows+=table_foot_row;
		new_table.innerHTML=table_rows;

		/////////////placing the containers //////////////////////////////////////////////////////

		container.appendChild(header);
		container.appendChild(info_section);

		container.appendChild(new_table);

		container.appendChild(footer);

		header.appendChild(logo);
		header.appendChild(business_intro);
		header.appendChild(clearing);
		header.appendChild(business_contact);

		func(container);
	}

	</script>
</div>
