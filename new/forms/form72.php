<div id='form72' class='tab-pane'>
	<form id='form72_master' autocomplete="off">
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' title='Add new customer' id='form72_add_customer'><br>
			<input type='text' required name='customer'></label>
			<label>Bill Date<br><input type='text' name='date' required></label>
			<label>Bill #<br><input type='text' name='bill_num' readonly="readonly"></label>
			<label>Show Sub-totals: <input type='checkbox' checked name='sub_totals'></label>
			<label>
				<input type='hidden' name='bill_id'>
				<input type='hidden' name='t_id'>
			</label>
			<label>	<input type='button' title='Save Bill' name='save' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' name='print' class='print_icon' onclick='form72_print_form();'></label>
			<label>	<input type='button' id='form72_share' name='share' class='share_icon' style='display:none;'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form72_header'></form>
					<th>Item</th>
					<th>Batch</th>
					<th>Quantity</th>
					<th>Rate</th>
					<th>Amount</th>
					<th><input type='button' form='form72_header' title='Add product' class='add_icon' onclick='form72_add_product();'>
						<input type='button' form='form72_header' title='Add Service' class='add_red_icon' onclick='form72_add_service();'></th>
			</tr>
		</thead>
		<tbody id='form72_body'>
		</tbody>
		<tfoot id='form72_foot'>
		</tfoot>
	</table>

	<script>
	function form72_header_ini()
	{
		var fields=document.getElementById('form72_master');

		var customers_filter=fields.elements['customer'];
		var bill_date=fields.elements['date'];
		var bill_num=fields.elements['bill_num'];
		fields.elements['bill_id'].value=get_new_key();
		fields.elements['t_id'].value=fields.elements['bill_id'].value;
		var save_button=fields.elements['save'];

		var bill_id=$("#form72_link").attr('data_id');
		if(bill_id==null || bill_id=='')
		{
			var bill_num_data="<user_preferences count='1'>"+
								"<value></value>"+
								"<name exact='yes'>bill_num</name>"+
								"</user_preferences>";
			set_my_value(bill_num_data,bill_num);
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
			form72_add_product();
		});

		var customers_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
		set_my_value_list(customers_data,customers_filter,function ()
		{
			$(customers_filter).focus();
		});

		var add_customer=document.getElementById('form72_add_customer');
		$(add_customer).off('click');
		$(add_customer).on('click',function()
		{
			modal11_action(function()
			{
				var customers_data="<customers>" +
					"<acc_name></acc_name>" +
					"</customers>";
				set_my_value_list(customers_data,customers_filter);
			});
		});

		$(bill_date).datepicker();
		$(bill_date).val(vTime.date());
		customers_filter.value='';
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
			var bill_columns="<bills>" +
					"<id>"+bill_id+"</id>" +
					"<bill_num></bill_num>"+
					"<customer_name></customer_name>" +
					"<total></total>" +
					"<bill_date></bill_date>" +
					"<amount></amount>" +
					"<discount></discount>" +
					"<tax></tax>" +
					"<transaction_id></transaction_id>" +
					"</bills>";
			var bill_items_column="<bill_items>" +
					"<id></id>" +
					"<item_name></item_name>" +
					"<batch></batch>" +
					"<staff></staff>" +
					"<quantity></quantity>" +
					"<unit_price></unit_price>" +
					"<amount></amount>" +
					"<total></total>" +
					"<discount></discount>" +
					"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
					"<tax></tax>" +
					"</bill_items>";

			////separate fetch function to get bill details like customer name, total etc.
			fetch_requested_data('',bill_columns,function(bill_results)
			{
				var filter_fields=document.getElementById('form72_master');

				if(bill_results.length>0)
				{
					filter_fields.elements['customer'].value=bill_results[0].customer_name;
					filter_fields.elements['date'].value=get_my_past_date(bill_results[0].bill_date);
					filter_fields.elements['bill_num'].value=bill_results[0].bill_num;
					filter_fields.elements['bill_id'].value=bill_id;
					filter_fields.elements['t_id'].value=bill_results[0].transaction_id;
					var save_button=filter_fields.elements['save'];

					$(save_button).off('click');
					$(save_button).on("click", function(event)
					{
						event.preventDefault();
						form72_update_form();
					});
				}

				fetch_requested_data('',bill_items_column,function(results)
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
								rowsHTML+="Amount: <input type='number' readonly='readonly' form='form72_"+id+"' step='any' value='"+result.amount+"'>";
								rowsHTML+="<br>Discount: <input type='number' readonly='readonly' form='form72_"+id+"' step='any' value='"+result.discount+"'>";
								rowsHTML+="<br>Tax: <input type='number' readonly='readonly' form='form72_"+id+"' step='any' value='"+result.tax+"'>";
								rowsHTML+="<br>Total: <input type='number' readonly='readonly' form='form72_"+id+"' step='any' value='"+result.total+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
								rowsHTML+="<input type='button' class='submit_hidden' form='form72_"+id+"' id='save_form72_"+id+"'>";
								rowsHTML+="<input type='button' class='delete_icon' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='form72_delete_item($(this));'>";
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
					hide_loader();
				});
			});
		}
	}

	function form72_add_product()
	{
		if(is_create_access('form72'))
		{
			var rowsHTML="";
			var id=get_new_key();
			rowsHTML+="<tr>";
			rowsHTML+="<form id='form72_"+id+"' autocomplete='off'></form>";
				rowsHTML+="<td data-th='Item'>";
					rowsHTML+="Barcode: <input type='text' form='form72_"+id+"'>";
					rowsHTML+="<br>Item: <input type='text' required form='form72_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Batch'>";
					rowsHTML+="<input type='text' required form='form72_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Quantity'>";
					rowsHTML+="<input type='number' required form='form72_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Rate'>";
					rowsHTML+="<input type='number' required form='form72_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Amount'>";
					rowsHTML+="Amount: <input type='number' readonly='readonly' required form='form72_"+id+"' step='any'>";
					rowsHTML+="<br>Discount: <input type='number' form='form72_"+id+"' step='any' value='0'>";
					rowsHTML+="<br>Tax: <input type='number' required readonly='readonly' form='form72_"+id+"' step='any'>";
					rowsHTML+="<br>Total: <input type='number' required readonly='readonly' required form='form72_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
					rowsHTML+="<input type='button' class='submit_hidden' form='form72_"+id+"' id='save_form72_"+id+"' >";
					rowsHTML+="<input type='button' class='delete_icon' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='$(this).parent().parent().remove(); form72_get_totals();'>";
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

			var product_data="<product_master>" +
					"<name></name>" +
					"</product_master>";
			set_my_value_list_func(product_data,name_filter);

			$(barcode_filter).focus();

			$(barcode_filter).on('blur',function()
			{
				var item_data="<product_master>"+
							"<name></name>"+
							"<bar_code exact='yes'>"+barcode_filter.value+"</bar_code>"+
							"</product_master>";
				set_my_value(item_data,name_filter,function ()
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
				var tax_data="<product_master count='1'>" +
						"<tax></tax>" +
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"</product_master>";
				set_my_value(tax_data,tax_rate_filter);

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

			form72_get_totals();
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
			var rowsHTML="";
			var id=get_new_key();
			rowsHTML+="<tr>";
			rowsHTML+="<form id='form72_"+id+"' autocomplete='off'></form>";
				rowsHTML+="<td data-th='Item'>";
					rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
					rowsHTML+="<input type='text' required form='form72_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Batch'>";
					rowsHTML+="<input type='text' readonly='readonly' value='NA' required form='form72_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Quantity'>";
					rowsHTML+="<input type='number' required form='form72_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Rate'>";
					rowsHTML+="<input type='number' required form='form72_"+id+"' value='1'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Amount'>";
					rowsHTML+="Amount: <input type='number' readonly='readonly' required form='form72_"+id+"' step='any'>";
					rowsHTML+="<br>Discount: <input type='number' form='form72_"+id+"' step='any' value='0'>";
					rowsHTML+="<br>Tax: <input type='number' readonly='readonly' form='form72_"+id+"' step='any'>";
					rowsHTML+="<br>Total: <input type='number' readonly='readonly' required form='form72_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
					rowsHTML+="<input type='button' class='submit_hidden' form='form72_"+id+"' id='save_form72_"+id+"' >";
					rowsHTML+="<input type='button' class='delete_icon' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='$(this).parent().parent().remove(); form72_get_totals();'>";
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

			var service_data="<services>" +
					"<name></name>" +
					"</services>";
			set_my_value_list_func(service_data,name_filter);

			$(name_filter).on('blur',function(event)
			{
				var tax_data="<services count='1'>" +
						"<tax></tax>" +
						"<price></price>"+
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"</services>";
				fetch_requested_data('',tax_data,function(taxes)
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

			var data_xml="<bill_items>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+name+"</item_name>" +
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
				form72_delete_item(del_button);
			});

			$(save_button).off('click');
		}
		else
		{
			$("#modal2_link").click();
		}
	}


	/**
	 * @form New Bill
	 * @param button
	 */
	function form72_create_form()
	{
		if(is_create_access('form72'))
		{
			var form=document.getElementById("form72_master");

			var customer=form.elements['customer'].value;
			var bill_date=get_raw_time(form.elements['date'].value);
			var bill_num=form.elements['bill_num'].value;

			var data_id=form.elements['bill_id'].value;
			var transaction_id=form.elements['t_id'].value;
			var save_button=form.elements['save'];

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

			var data_xml="<bills>" +
						"<id>"+data_id+"</id>" +
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_num>"+bill_num+"</bill_num>"+
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
						"<name exact='yes'>bill_num</name>"+
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
			var transaction_id=form.elements['t_id'].value;

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

			var payment_data="<payments>" +
					"<id></id>" +
					"<source_id exact='yes'>"+data_id+"</source_id>" +
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
				var bill_id=document.getElementById("form72_master").elements['bill_id'].value;

				var form_id=$(button).attr('form');
				var form=document.getElementById(form_id);
				var data_id=form.elements[9].value;

				var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"</bill_items>";
				delete_simple(data_xml);
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

	/**
	* This function prepares the printing template for the documents like bills and purchase orders
	*/
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
