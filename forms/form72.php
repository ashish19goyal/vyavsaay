<div id='form72' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle yellow btn-sm' onclick='form72_add_product();'>Add Product <i class='fa fa-plus'></i></a>
			<a class='btn btn-circle red-sunglo btn-sm' onclick='form72_add_service();'>Add Service <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-sm' id='form72_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form72_print' onclick=form72_print_form();><i class='fa fa-print'></i> Print</a>
      	<a class='btn btn-default btn-sm' id='form72_share'><i class='fa fa-envelope'></i> Mail</a>
      </div>
	</div>

	<div class="portlet-body">
        <form id='form72_master' autocomplete="off">
            <fieldset>
                <label><div class='btn-overlap'><input type='text' required name='customer' placeholder='Customer' class='floatlabel'><button type='button' title='Add new customer' class='btn btn-icon-only default right-overlap' id='form72_add_customer'><i class='fa fa-plus'></i></button></div></label>
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
			<tbody id='form72_body'>
			</tbody>
		      <tfoot id='form72_foot'>
		      </tfoot>
		</table>
    </div>

	<script>
	function form72_header_ini()
	{
		var fields=document.getElementById('form72_master');

		var customers_filter=fields.elements['customer'];
		var bill_date=fields.elements['date'];
		var bill_num=fields.elements['bill_num'];
		fields.elements['bill_id'].value=vUtil.newKey();
		var save_button=document.getElementById('form72_save');

		var bill_id=$("#form72_link").attr('data_id');
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
			form72_create_form();
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
			form72_add_service();
		});

		var customers_data={data_store:'customers',return_column:'acc_name'};
		set_my_value_list_json(customers_data,customers_filter,function ()
		{
			$(customers_filter).focus();
		});

		var add_customer=document.getElementById('form72_add_customer');
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
		var paginator=$('#form72_body').paginator({visible:false});
		$('#form72').formcontrol();
	}

	function form72_ini()
	{
		var bill_id=$("#form72_link").attr('data_id');
		if(bill_id==null)
			bill_id="";

		$('#form72_body').html("");
		$('#form72_foot').html("");

		if(bill_id!="")
		{
			show_loader();
			var filter_fields=document.getElementById('form72_master');

			var bill_columns={data_store:'bills',count:1,
							 indexes:[{index:'id',value:bill_id},
									 {index:'bill_num'},
									 {index:'customer_name'},
									 {index:'total'},
									 {index:'amount'},
									 {index:'tax'},
									 {index:'discount'},
									 {index:'bill_date'}]};

		 	read_json_rows('form72',bill_columns,function(bill_results)
			{
				if(bill_results.length>0)
				{
					filter_fields.elements['customer'].value=bill_results[0].customer_name;
					filter_fields.elements['date'].value=get_my_past_date(bill_results[0].bill_date);
					filter_fields.elements['bill_num'].value=bill_results[0].bill_num;
					filter_fields.elements['bill_id'].value=bill_id;
					var save_button=document.getElementById('form72_save');

					$(save_button).off('click');
					$(save_button).on("click", function(event)
					{
						event.preventDefault();
						form72_update_form();
					});
				}
			});

			var bill_items_column={data_store:'bill_items',
		 					  indexes:[{index:'id'},
		 							  {index:'item_name'},
		 							  {index:'staff'},
		 							  {index:'batch'},
		 							  {index:'quantity'},
		 							  {index:'unit_price'},
		 							  {index:'amount'},
		 							  {index:'total'},
		 							  {index:'tax'},
		 							  {index:'discount'},
		 							  {index:'bill_id',exact:bill_id}]};

			read_json_rows('form72',bill_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form72_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+result.item_name+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+result.batch+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form72_"+id+"' value='"+result.quantity+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Rate'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form72_"+id+"' value='"+result.unit_price+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' readonly='readonly' form='form72_"+id+"' step='any' value='"+result.amount+"'>";
							rowsHTML+="<input type='number' class='floatlabel' placeholder='Discount' readonly='readonly' form='form72_"+id+"' step='any' value='"+result.discount+"'>";
							rowsHTML+="<input type='number' class='floatlabel' placeholder='Tax' readonly='readonly' form='form72_"+id+"' step='any' value='"+result.tax+"'>";
							rowsHTML+="<input type='number' class='floatlabel' placeholder='Total' readonly='readonly' form='form72_"+id+"' step='any' value='"+result.total+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form72_"+id+"' id='save_form72_"+id+"'>";
							rowsHTML+="<button type='button' class='btn red' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='form72_delete_item($(this));' title='Delete' name='delete'><i class='fa fa-trash'></i></button>";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form72_body').append(rowsHTML);
				});

				var bt=get_session_var('title');
				$('#form72_share').show();
				$('#form72_share').click(function()
				{
					modal101_action(bt+' - Invoice# '+filter_fields.elements['bill_num'].value,filter_fields.elements['customer'].value,'customer',function (func)
					{
						print_form72(func);
					});
				});
				form72_get_totals();
				$('#form72').formcontrol();
				hide_loader();
			});
		}
	}

	function form72_add_product()
	{
		if(is_create_access('form72'))
		{
			var id=vUtil.newKey();
			var rowsHTML="<tr>";
			rowsHTML+="<form id='form72_"+id+"' autocomplete='off'></form>";
				rowsHTML+="<td data-th='Item'>";
					rowsHTML+="<input type='text' class='floatlabel' placeholder='Barcode' form='form72_"+id+"'>";
					rowsHTML+="<input type='text' class='floatlabel' placeholder='Item' required form='form72_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Batch'>";
					rowsHTML+="<input type='text' placeholder='Batch' required form='form72_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Quantity'>";
					rowsHTML+="<input type='number' placeholder='Quantity' required form='form72_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Rate'>";
					rowsHTML+="<input type='number' placeholder='Rate' equired form='form72_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Amount'>";
					rowsHTML+="<input type='number' class='floatlabel' placeholder='Amount' readonly='readonly' required form='form72_"+id+"' step='any'>";
					rowsHTML+="<input type='number' class='floatlabel' placeholder='Discount' form='form72_"+id+"' step='any' value='0'>";
					rowsHTML+="<input type='number' required class='floatlabel' placeholder='Tax' readonly='readonly' form='form72_"+id+"' step='any'>";
					rowsHTML+="<input type='number' required class='floatlabel' placeholder='Total' readonly='readonly' required form='form72_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
					rowsHTML+="<input type='button' class='submit_hidden' form='form72_"+id+"' id='save_form72_"+id+"' >";
					rowsHTML+="<button type='button' class='btn red' form='form72_"+id+"' name='delete' title='Delete' id='delete_form72_"+id+"' onclick='$(this).parent().parent().remove(); form72_get_totals();'><i class='fa fa-trash'></i></button>";
					rowsHTML+="<input type='submit' class='submit_hidden' form='form72_"+id+"'>";
					rowsHTML+="<input type='hidden' form='form72_"+id+"' name='tax_rate'>";
					rowsHTML+="<input type='hidden' form='form72_"+id+"' name='type' value='product'>";
				rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form72_body').prepend(rowsHTML);

			var fields=document.getElementById("form72_"+id);
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
				form72_create_item(fields);
			});

			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form72_add_product();
			});

			var product_data={data_store:'product_master',return_column:'name'};
			set_my_value_list_json(product_data,name_filter);

			$(barcode_filter).focus();
			$(barcode_filter).on('blur',function()
			{
				var item_data={data_store:'product_master',return_column:'name',
								indexes:[{index:'bar_code',exact:barcode_filter.value}]};
				set_my_value_json(item_data,name_filter,function ()
				{
					$(name_filter).trigger('blur');
				});
				$(batch_filter).focus();
			});

			$(barcode_filter).on('keydown',function (event)
			{
				if(event.keyCode == 13 )
				{
					event.preventDefault();
					$(barcode_filter).trigger('blur');
				}
			});

			$(name_filter).on('blur',function(event)
			{
				var tax_data={data_store:'product_master',return_column:'tax',
							indexes:[{index:'name',exact:name_filter.value}]};
				set_my_value_json(tax_data,tax_rate_filter);

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
					tax_filter.value=0;
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
				tax_filter.value=0;
			});

			$(quantity_filter).add(price_filter).add(discount_filter).on('blur',function(event)
			{
				amount_filter.value=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
				tax_filter.value=parseFloat((parseFloat(tax_rate_filter.value)*(parseFloat(amount_filter.value)-parseFloat(discount_filter.value)))/100);
				total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);
			});

			form72_get_totals();
			$('#form72').formcontrol();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form72_add_service()
	{
		if(is_create_access('form72'))
		{
			var id=vUtil.newKey();
			var rowsHTML="<tr>";
			rowsHTML+="<form id='form72_"+id+"' autocomplete='off'></form>";
				rowsHTML+="<td data-th='Item'>";
					rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
					rowsHTML+="<input type='text' placeholder='Service Name' required form='form72_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Batch'>";
					rowsHTML+="<input type='text' placeholder='Batch' readonly='readonly' value='NA' required form='form72_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Quantity'>";
					rowsHTML+="<input type='number' placeholder='Quantity' required form='form72_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Rate'>";
					rowsHTML+="<input type='number' placeholder='Rate' required form='form72_"+id+"' value='1'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Amount'>";
					rowsHTML+="<input type='number' placeholder='Amount' class='floatlabel' readonly='readonly' required form='form72_"+id+"' step='any'>";
					rowsHTML+="<input type='number' placeholder='Discount' class='floatlabel' form='form72_"+id+"' step='any' value='0'>";
					rowsHTML+="<input type='number' placeholder='Tax' class='floatlabel' readonly='readonly' form='form72_"+id+"' step='any'>";
					rowsHTML+="<input type='number' placeholder='Total' class='floatlabel' readonly='readonly' required form='form72_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
					rowsHTML+="<input type='button' class='submit_hidden' form='form72_"+id+"' id='save_form72_"+id+"' >";
					rowsHTML+="<button type='button' class='btn red' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='$(this).parent().parent().remove(); form72_get_totals();' title='Delete' name='delete'><i class='fa fa-trash'></i></button>";
					rowsHTML+="<input type='submit' class='submit_hidden' form='form72_"+id+"'>";
					rowsHTML+="<input type='hidden' form='form72_"+id+"' name='tax_rate'>";
				rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form72_body').prepend(rowsHTML);

			var fields=document.getElementById("form72_"+id);
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
				form72_create_item(fields);
			});

			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form72_add_service();
			});

			$(name_filter).focus();

			var service_data={data_store:'services',return_column:'name'};
			set_my_value_list_json(service_data,name_filter);

			$(name_filter).on('blur',function(event)
			{
				var tax_data={data_store:'services',
								indexes:[{index:'tax'},{index:'price'},{index:'name',exact:name_filter.value}]};
				read_json_rows('',tax_data,function(taxes)
				{
					if(taxes.length>0)
					{
						tax_rate_filter.value=taxes[0].tax;
						price_filter.value=taxes[0].price;
						amount_filter.value=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
						tax_filter.value=parseFloat((parseFloat(tax_rate_filter.value)*(parseFloat(amount_filter.value)-parseFloat(discount_filter.value)))/100);
						total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);
					}
					else
					{
						tax_rate_filter.value=0;
						price_filter.value="";
					}
				});
			});

			$(quantity_filter).add(price_filter).add(discount_filter).on('blur',function(event)
			{
				amount_filter.value=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
				tax_filter.value=parseFloat((parseFloat(tax_rate_filter.value)*(parseFloat(amount_filter.value)-parseFloat(discount_filter.value)))/100);
				total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);
			});

			form72_get_totals();
			$('#form72').formcontrol();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form72_create_item(form)
	{
		if(is_create_access('form72'))
		{
			var bill_id=document.getElementById("form72_master").elements['bill_id'].value;
			var name=form.elements[1].value;
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

			var data_json={data_store:'bill_items',
				data:[{index:'id',value:data_id},
					{index:'item_name',value:name},
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
				form72_delete_item(del_button);
			});

			$(save_button).off('click');
		}
		else
		{
			$("#modal2_link").click();
		}
	}


	function form72_create_form()
	{
		if(is_create_access('form72'))
		{
			var form=document.getElementById("form72_master");

			var customer=form.elements['customer'].value;
			var bill_date=get_raw_time(form.elements['date'].value);
			var bill_num=form.elements['bill_num'].value;
			var data_id=form.elements['bill_id'].value;
			var save_button=document.getElementById('form72_save');

			var bt=get_session_var('title');
			$('#form72_share').show();
			$('#form72_share').click(function()
			{
				modal101_action(bt+' - Invoice# '+bill_num,customer,'customer',function (func)
				{
					print_form72(func);
				});
			});

			var amount=0;
			var discount=0;
			var service_tax=0;
			var vat=0;
			var total=0;

			$("[id^='save_form72']").each(function(index)
			{
				var subform_id=$(this).attr('form');
				var subform=document.getElementById(subform_id);

				if(!isNaN(parseFloat(subform.elements[5].value)))
				{
					amount+=parseFloat(subform.elements[5].value);
				}
				if(!isNaN(parseFloat(subform.elements[6].value)))
				{
					discount+=parseFloat(subform.elements[6].value);
				}
				if(!isNaN(parseFloat(subform.elements[8].value)))
				{
					total+=parseFloat(subform.elements[8].value);
				}
				if(!isNaN(parseFloat(subform.elements[7].value)))
				{
					if(subform.elements[2].value=="NA")
					{
						service_tax+=parseFloat(subform.elements[7].value);
					}
					else
					{
						vat+=parseFloat(subform.elements[7].value);
					}
				}

			});

			service_tax=vUtil.round(service_tax,2);
			vat=vUtil.round(vat,2);
			amount=vUtil.round(amount,2);
			discount=vUtil.round(discount,2);
			total=vUtil.round(total);

			var tax=service_tax+vat;
			var tax_string="VAT: <br>S.Tax:";
			var tax_amount_string="Rs. "+vat+"<br>Rs. "+service_tax+"<br>";

			if(vat==0)
			{
				tax_string="S.Tax:";
				tax_amount_string="Rs. "+service_tax+"<br>";
			}

			if(service_tax==0)
			{
				tax_string="VAT:";
				tax_amount_string="Rs. "+vat+"<br>";
			}

			if(service_tax==0 && vat==0)
			{
				tax_string="Tax:";
				tax_amount_string="Rs. 0<br>";
			}

			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
						"<td>Amount:<br>Discount: <br>"+tax_string+"<br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+discount+"</br>" +
						tax_amount_string +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
			$('#form72_foot').html(total_row);

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
						{index:'narration',value:''},
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

			var num_data={data_store:'user_preferences',return_column:'id',
						 indexes:[{index:'name',exact:"bill_num"}]};
			read_json_single_column(num_data,function (bill_num_ids)
			{
				if(bill_num_ids.length>0)
				{
					var num_json={data_store:'user_preferences',
					data:[{index:'id',value:bill_num_ids[0]},
						{index:'value',value:(parseFloat(bill_num)+1)+""},
						{index:'last_updated',value:last_updated}]};

					update_json(num_json);
				}
			});

			$(save_button).off('click');
			$(save_button).on('click',function(event)
			{
				event.preventDefault();
				form72_update_form();
			});

			$("[id^='save_form72_']").click();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form72_update_form()
	{
		if(is_create_access('form72'))
		{
			var form=document.getElementById("form72_master");

			var customer=form.elements['customer'].value;
			var bill_date=get_raw_time(form.elements['date'].value);
			var bill_num=form.elements['bill_num'].value;
			var data_id=form.elements['bill_id'].value;

			var bt=get_session_var('title');
			$('#form72_share').show();
			$('#form72_share').click(function()
			{
				modal101_action(bt+' - Invoice# '+bill_num,customer,'customer',function (func)
				{
					print_form72(func);
				});
			});

			var amount=0;
			var discount=0;
			var service_tax=0;
			var vat=0;
			var total=0;

			$("[id^='save_form72']").each(function(index)
			{
				var subform_id=$(this).attr('form');
				var subform=document.getElementById(subform_id);

				if(!isNaN(parseFloat(subform.elements[5].value)))
				{
					amount+=parseFloat(subform.elements[5].value);
				}
				if(!isNaN(parseFloat(subform.elements[6].value)))
				{
					discount+=parseFloat(subform.elements[6].value);
				}
				if(!isNaN(parseFloat(subform.elements[8].value)))
				{
					total+=parseFloat(subform.elements[8].value);
				}
				if(!isNaN(parseFloat(subform.elements[7].value)))
				{
					if(subform.elements[2].value=="NA")
					{
						service_tax+=parseFloat(subform.elements[7].value);
					}
					else
					{
						vat+=parseFloat(subform.elements[7].value);
					}
				}

			});

			service_tax=vUtil.round(service_tax,2);
			vat=vUtil.round(vat,2);
			amount=vUtil.round(amount,2);
			discount=vUtil.round(discount,2);
			total=vUtil.round(total,0);

			var tax=service_tax+vat;

			var tax_string="VAT: <br>S.Tax:";
			var tax_amount_string="Rs. "+vat+"<br>Rs. "+service_tax+"<br>";

			if(vat==0)
			{
				tax_string="S.Tax:";
				tax_amount_string="Rs. "+service_tax+"<br>";
			}

			if(service_tax==0)
			{
				tax_string="VAT:";
				tax_amount_string="Rs. "+vat+"<br>";
			}

			if(service_tax==0 && vat==0)
			{
				tax_string="Tax:";
				tax_amount_string="Rs. 0<br>";
			}

			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
						"<td>Amount:<br>Discount: <br>"+tax_string+"<br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+discount+"</br>" +
						tax_amount_string +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
			$('#form72_foot').html(total_row);


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
			 					{index:'narration',value:''},
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

			$("[id^='save_form72_']").click();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form72_delete_item(button)
	{
		if(is_delete_access('form72'))
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
				form72_get_totals();
			});
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form72_get_totals()
	{
		var amount=0;
		var discount=0;
		var service_tax=0;
		var vat=0;
		var total=0;

		$("[id^='save_form72']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);

			if(!isNaN(parseFloat(subform.elements[5].value)))
			{
				amount+=parseFloat(subform.elements[5].value);
			}
			if(!isNaN(parseFloat(subform.elements[6].value)))
			{
				discount+=parseFloat(subform.elements[6].value);
			}
			if(!isNaN(parseFloat(subform.elements[8].value)))
			{
				total+=parseFloat(subform.elements[8].value);
			}
			if(!isNaN(parseFloat(subform.elements[7].value)))
			{
				if(subform.elements[2].value=="NA")
				{
					service_tax+=parseFloat(subform.elements[7].value);
				}
				else
				{
					vat+=parseFloat(subform.elements[7].value);
				}
			}

		});

		service_tax=vUtil.round(service_tax,2);
		vat=vUtil.round(vat,2);
		amount=vUtil.round(amount,2);
		discount=vUtil.round(discount,2);
		total=vUtil.round(total,0);

		var tax_string="VAT: <br>S.Tax:";
		var tax_amount_string="Rs. "+vat+"<br>Rs. "+service_tax+"<br>";

		if(vat==0)
		{
			tax_string="S.Tax:";
			tax_amount_string="Rs. "+service_tax+"<br>";
		}

		if(service_tax==0)
		{
			tax_string="VAT:";
			tax_amount_string="Rs. "+vat+"<br>";
		}

		if(service_tax==0 && vat==0)
		{
			tax_string="Tax:";
			tax_amount_string="Rs. 0<br>";
		}

		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Amount:<br>Discount: <br>"+tax_string+"<br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. "+discount+"</br>" +
					tax_amount_string +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		$('#form72_foot').html(total_row);
	}

	function form72_print_form()
	{
		print_form72(function(container)
		{
			$.print(container);
			container.innerHTML="";
		});
	}

	function print_form72(func)
	{
		var form_id='form72';
		////////////setting up containers///////////////////////
		var container=document.createElement('div');
		var header=document.createElement('div');
			var logo=document.createElement('div');
			var business_intro=document.createElement('div');
			var business_contact=document.createElement('div');

		var info_section=document.createElement('div');

		var table_container=document.createElement('div');

		var footer=document.createElement('div');

		////////////setting styles for containers/////////////////////////

		header.setAttribute('style','width:100%;min-height:100px;text-align:center');
		//	business_intro.setAttribute('style','width:100%;text-align:center');
			business_contact.setAttribute('style','width:100%;text-align:center');
		info_section.setAttribute('style','width:100%;min-height:80px;text-align:left;margin:5px;');
		footer.setAttribute('style','width:100%;min-height:100px;text-align:center;margin:10px 5px;');

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
		var vat_no=get_session_var('vat');
		var st_no=get_session_var('service_tax_no');

		var show_sub_totals=master_form.elements['sub_totals'];

		var bill_message=get_session_var('bill_message').replace(/\n/g,"<br>");

		////////////////filling in the content into the containers//////////////////////////

		logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
		//business_intro.innerHTML=get_session_var('business_intro');
		business_contact.innerHTML="<hr style='border: 1px solid #00f;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email+"<br>VAT #: "+vat_no+"S.Tax #: "+st_no;

		var info_section_text="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>Invoice No: "+bill_num+"</b></div><hr style='border: 1px solid #00f;'>"+
								"<b>For: </b>"+customer_name+
								"<br>Date: "+date;
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

		var table_header_service="<tr style='border-top: 1px solid #000000;border-bottom: 1px solid #000000;'>"+
					"<td style='text-align:left;width:130px;wrap:break-word'>Service</td>"+
					"<td style='text-align:left;width:45px'>Qty</td>"+
					"<td style='text-align:left;width:80px'>Total</td></tr>";

		var table_header_product="<tr style='border-top: 1px solid #000000;border-bottom: 1px solid #000000;'>"+
					"<td style='text-align:left;width:130px;wrap:break-word'>Item</td>"+
					"<td style='text-align:left;width:45px'>Qty</td>"+
					"<td style='text-align:left;width:80px'>Total</td></tr>";

		var table_rows_service=table_header_service;
		var table_rows_product=table_header_product;
		var counter_service=0;
		var counter_product=0;
		var total_items=0;
		var total_amount=0;
		var total_vat=0;
		var total_st=0;
		var master_total=0;

		$(table_element).find('form').each(function(index)
		{
			var form=$(this)[0];
			var item_name=form.elements[1].value;
			var batch=form.elements[2].value;
			var quantity=""+form.elements[3].value;
			var price=form.elements[4].value;
			var amount=form.elements[5].value;
			var tax=form.elements[7].value;
			var total=form.elements[8].value;

			if(batch=='NA')
			{
				counter_service+=1;

				total_items+=parseFloat(form.elements[3].value);
				total_amount+=parseFloat(form.elements[5].value);
				total_st+=parseFloat(form.elements[7].value);
				master_total+=parseFloat(form.elements[8].value);

				table_rows_service+="<tr>"+
						"<td style='text-align:left;'>"+item_name+"</td>"+
						"<td style='text-align:left;'>"+quantity+"</td>"+
						"<td style='text-align:left;'>"+total+"</td></tr>";
			}
			else
			{
				counter_product+=1;

				total_items+=parseFloat(form.elements[3].value);
				total_amount+=parseFloat(form.elements[5].value);
				total_vat+=parseFloat(form.elements[7].value);
				master_total+=parseFloat(form.elements[8].value);

				table_rows_product+="<tr>"+
						"<td style='text-align:left;'>"+item_name+"</td>"+
						"<td style='text-align:left;'>"+quantity+"</td>"+
						"<td style='text-align:left;'>"+total+"</td></tr>";

			}
		});

		total_amount=vUtil.round(total_amount,2);
		total_vat=vUtil.round(total_vat,2);
		total_st=vUtil.round(total_st,2);
		master_total=vUtil.round(master_total,0);

		var row_count=$(table_element).find('tbody>tr').length;
		var rows_to_add=5-row_count;
		for(var i=0;i<3;i++)
		{
			table_rows_service+="<tr style='flex:2;height:20px;'><td></td><td></td><td></td></tr>";
		}
		for(var i=0;i<rows_to_add;i++)
		{
			table_rows_product+="<tr style='flex:2;height:20px;'><td></td><td></td><td></td></tr>";
		}

		var table_foot=document.getElementById(form_id+'_foot');

		var display_total="Total:";
		var display_total_amount="Rs. "+master_total;

		if(show_sub_totals.checked)
		{
			display_total="Amount:<br>VAT: <br>S. Tax:<br>Total:";
			display_total_amount="Rs. "+total_amount+"<br>Rs. "+total_vat+"<br>Rs. "+total_st+"<br>Rs. "+master_total;

			if(counter_service==0)
			{
				display_total="Amount:<br>VAT: <br>Total:";
				display_total_amount="Rs. "+total_amount+"<br>Rs. "+total_vat+"<br>Rs. "+master_total;
			}

			if(counter_product==0)
			{
				display_total="Amount:<br>S. Tax:<br>Total:";
				display_total_amount="Rs. "+total_amount+"<br>Rs. "+total_st+"<br>Rs. "+master_total;
			}

			if(counter_service==0 && counter_product==0)
			{
				display_total="Amount:<br>Tax:<br>Total:";
				display_total_amount="Rs. "+total_amount+"<br>Rs. 0<br>Rs. "+master_total;
			}
		}

		//console.log(total_amount);
		var table_foot_row="<tr style='border-top: 1px solid #000000;border-bottom: 1px solid #000000;'>"+
					"<td style='text-align:left;'>Total bill Items:"+total_items+"</td>"+
					"<td style='text-align:left;'>"+display_total+"</td>"+
					"<td style='text-align:left;'>"+display_total_amount+"</td></tr>";
		//console.log(table_foot_row);
		var table_rows="";
		if(counter_service>0)
		{
			table_rows+=table_rows_service;
		}

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
		//header.appendChild(business_intro);
		header.appendChild(business_contact);

		func(container);
	}

	</script>
</div>
