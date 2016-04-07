<div id='form270' class='tab-pane'>
	<form id='form270_master' autocomplete="off">
		<fieldset>
			<label>Supplier <img src='./images/add_image.png' class='add_image' id='form270_add_supplier'><br>
			<input type='text' required name='supplier'></label>
			<label>Bill Number<br><input type='text' required name='bill_num'></label>
			<label>Bill Date<br><input type='text' required name='date'></label>
			<label>
				<input type='hidden' name='bill_id'>
			</label>
			<label>	<input type='button' title='Save Bill' class='save_icon' name='save'></label>
			<label>	<input type='button' title='Print' class='print_icon' name='print' onclick='form270_print_form();'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form270_header'></form>
					<th>Item</th>
					<th>Quantity</th>
					<th>Price</th>					
					<th>Amount</th>
					<th><input type='button' form='form270_header' title='Add item' class='add_icon' onclick='form270_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form270_body'>
		</tbody>
		<tfoot id='form270_foot'>
		</tfoot>
	</table>
    
    <script>
    function form270_header_ini()
{
	var fields=document.getElementById('form270_master');
	
	var supplier_filter=fields.elements['supplier'];
	supplier_filter.value='';
	
	fields.elements['bill_num'].value="";
	var bill_date=fields.elements['date'];
	
	fields.elements['bill_id'].value=get_new_key();
	var save_button=fields.elements['save'];
	
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
	
	var suppliers_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	
	set_my_value_list(suppliers_data,supplier_filter,function () 
	{
		$(supplier_filter).focus();
	});
	
	var add_supplier=document.getElementById('form270_add_supplier');
	$(add_supplier).off('click');
	$(add_supplier).on('click',function()
	{
		modal13_action(function()
		{	
			var suppliers_data="<suppliers>" +
				"<acc_name></acc_name>" +
				"</suppliers>";			
			set_my_value_list(suppliers_data,supplier_filter);
		});
	});

	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
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
		var bill_columns="<supplier_bills count='1'>" +
				"<id>"+bill_id+"</id>" +
				"<bill_id></bill_id>" +
				"<supplier></supplier>" +
				"<total></total>" +
				"<amount></amount>" +
				"<discount></discount>" +
				"<tax></tax>" +
				"<tax_rate></tax_rate>"+
				"<cartage></cartage>"+
				"<bill_date></bill_date>" +
				"<entry_date></entry_date>" +
				"<notes></notes>" +
				"<transaction_id></transaction_id>" +
				"</supplier_bills>";
		
		var filter_fields=document.getElementById('form270_master');

		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			if (bill_results.length>0)
			{
				filter_fields.elements['supplier'].value=bill_results[0].supplier;
				filter_fields.elements['bill_num'].value=bill_results[0].bill_id;
				filter_fields.elements['date'].value=get_my_past_date(bill_results[0].bill_date);
				filter_fields.elements['bill_id'].value=bill_id;
				var save_button=filter_fields.elements['save'];
				
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
							"Rs. <input type='number' value='"+bill_results[0].cartage+"' step='any' id='form270_cartage' class='dblclick_editable'><br>" +
							"Rs. "+bill_results[0].total+"</td>" +
							"<td></td>" +
							"</tr>";
						
				$('#form270_foot').html(total_row);
				longPressEditable($('.dblclick_editable'));	
			}
		
			var bill_items_column="<supplier_bill_items>" +
					"<id></id>" +
					"<product_name></product_name>" +
					"<amount></amount>" +
					"<tax></tax>" +
					"<total></total>" +
					"<unit_price></unit_price>" +
					"<quantity></quantity>" +
					"<unit></unit>" +
					"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
					"</supplier_bill_items>";
			
			fetch_requested_data('',bill_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form270_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<textarea readonly='readonly' form='form270_"+id+"'>"+result.product_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form270_"+id+"' value='"+result.quantity+"' step='any'><b>"+result.unit+"</b>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="<input type='number' readonly='readonly' class='dblclick_editable' form='form270_"+id+"' value='"+result.unit_price+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="<b>Amount</b><input type='number' readonly='readonly' form='form270_"+id+"' value='"+result.amount+"' step='any'>";
							rowsHTML+="<br><b>Tax</b>: <input type='number' readonly='readonly' form='form270_"+id+"' value='"+result.tax+"' step='any'>";
							rowsHTML+="<br><b>Total</b>: <input type='number' readonly='readonly' form='form270_"+id+"' value='"+result.total+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form270_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form270_"+id+"' id='save_form270_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form270_"+id+"' id='delete_form270_"+id+"' onclick='form270_delete_item($(this)); form270_get_totals();'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form270_body').append(rowsHTML);
					
				});	
				form270_get_totals();		
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
		
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form270_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' class='wideinput' required form='form270_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' step='any' required form='form270_"+id+"'> <b id='form270_unit_"+id+"'></b>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Price'>";
				rowsHTML+="<input type='number' form='form270_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="<b>Amount</b>:<input type='number' step='any' form='form270_"+id+"' readonly='readonly'>";
				rowsHTML+="<br><b>Tax</b>: <input type='number' form='form270_"+id+"' value='' step='any'>";
				rowsHTML+="<br><b>Total</b>: <input type='number' form='form270_"+id+"' value='' step='any' readonly='readonly'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form270_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form270_"+id+"' id='save_form270_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form270_"+id+"' id='delete_form270_"+id+"' onclick='$(this).parent().parent().remove();form270_get_totals();'>";
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
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(product_data,name_filter,function () 
		{
			$(name_filter).focus();
		});

		$(name_filter).on('blur',function(event)
		{
			var unit_data="<attributes count='1'>"+
							"<value></value>"+
							"<attribute exact='yes'>unit</attribute>"+
							"<name exact='yes'>"+name_filter.value+"</name>"+
							"</attributes>";
			get_single_column_data(function(units)
			{
				if(units.length>0)
					$('#form270_unit_'+id).html(units[0]);
			},unit_data);			
							
			var price_data="<supplier_bill_items count='1'>" +
					"<unit_price></unit_price>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</supplier_bill_items>";
			set_my_value(price_data,price_filter);	
			
			var tax_data="<product_master>"+
						"<tax></tax>"+
						"<name exact='yes'>"+name_filter.value+"</name>"+
						"</product_master>";
			set_my_value(tax_data,tax_unit_filter);			
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
		var save_button=form.elements[7];
		var del_button=form.elements[8];
		var last_updated=get_my_time();
		var unit=$('#form270_unit_'+data_id).html();
	
		var data_xml="<supplier_bill_items>" +
				"<id>"+data_id+"</id>" +
				"<product_name>"+name+"</product_name>" +
				"<batch>"+name+"</batch>" +
				"<quantity>"+quantity+"</quantity>" +
				"<unit>"+unit+"</unit>"+				
				//"<total>"+total+"</total>" +
				//"<tax>"+tax+"</tax>" +
				"<amount>"+amount+"</amount>" +
				"<unit_price>"+price+"</unit_price>" +
				"<tax>"+tax+"</tax>" +
				"<total>"+total+"</total>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</supplier_bill_items>";	
	
		create_simple(data_xml);
				
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
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


/**
 * @form Enter Purchase Bill (DLM)
 * @param button
 */
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
							"Rs. <input type='number' value='"+my_round(cartage,2)+"' step='any' id='form270_cartage' class='dblclick_editable'><br>" +
							"Rs. "+total+"</td>" +
							"<td></td>" +
							"</tr>";
					
		$('#form270_foot').html(total_row);
		longPressEditable($('.dblclick_editable'));

		var data_id=form.elements['bill_id'].value;
		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var data_xml="<supplier_bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<total>"+total+"</total>" +
					"<amount>"+amount+"</amount>" +
					"<cartage>"+cartage+"</cartage>"+
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
							"Rs. <input type='number' value='"+my_round(cartage,2)+"' step='any' id='form270_cartage' class='dblclick_editable'><br>" +
							"Rs. "+total+"</td>" +
							"<td></td>" +
							"</tr>";
						
		$('#form270_foot').html(total_row);
		longPressEditable($('.dblclick_editable'));

		var data_id=form.elements['bill_id'].value;
		var last_updated=get_my_time();
								
		var data_xml="<supplier_bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<total>"+total+"</total>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<cartage>"+cartage+"</cartage>"+
					"<transaction_id>"+data_id+"</transaction_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>supplier_bills</tablename>" +
					"<link_to>form53</link_to>" +
					"<title>Updated</title>" +
					"<notes>Purchase Bill # "+bill_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
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
			if(payments.length>0)
			{
				var payment_xml="<payments>" +
							"<id>"+payments[0]+"</id>" +
							"<type>paid</type>" +
							"<total_amount>"+total+"</total_amount>" +
							"<acc_name>"+supplier+"</acc_name>" +
							"<transaction_id>"+payments[0]+"</transaction_id>" +
							"<bill_id>"+data_id+"</bill_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</payments>";
				var pt_xml="<transactions>" +
							"<id>"+payments[0]+"</id>" +
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
			}
		},payment_data);
			
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
			
			var data_xml="<supplier_bill_items>" +
						"<id>"+data_id+"</id>" +
						"</supplier_bill_items>";	
			delete_simple(data_xml);
					
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
						"Rs. <input type='number' value='"+my_round(cartage,2)+"' step='any' id='form270_cartage' class='dblclick_editable'><br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
					
	$('#form270_foot').html(total_row);
	longPressEditable($('.dblclick_editable'));
}
    
function form270_print_form()
{
	print_form270(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
* This function prepares the printing template for the documents like bills and purchase orders
*/
function print_form270(func)
{
	var form_id='form270';
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

////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;min-height:100px;text-align:center');
		logo.setAttribute('style','width:100%;text-align:center;font-weight:600;font-size:32px;line-height:40px;');
		business_intro.setAttribute('style','width:100%;text-align:center');
		business_contact.setAttribute('style','width:100%;text-align:left');
	info_section.setAttribute('style','width:100%;min-height:80px');
		customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
		business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
	
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
	business_contact.innerHTML="<hr style='border: 1px solid #00f;'>Billing Address: "+business_address+"<br>Contact Nos.: "+business_phone+"<br>E-Mail: "+business_email;
	
	invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>Purchase Bill #: "+bill_no+"</b></div><hr style='border: 1px solid #00f;'>";
	
	customer_info.innerHTML="<b>Supplier: </b><br>"+supplier_name;
	business_info.innerHTML="<b>Buyer</b><br>TIN #: "+tin_no+"<br>Bill Date: "+date+"<br>Bill No: "+bill_no;
	
	var table_element=document.getElementById(form_id+'_body');
	
	/////////////adding new table //////////////////////////////////////////////////////	
	var new_table=document.createElement('table');
	new_table.setAttribute('style','width:100%;font-size:11px;border:1px solid black;text-align:left;');
	new_table.setAttribute('class','plain_table');
	var table_header="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;width:10%;'>S.No.</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:25%;'>Item Name</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:15%'>Qty</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:15%'>Price</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:15%'>Tax</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:15%;font-size:1.2em;font-weight:bold'>Total(inc taxes)</td></tr>";
				
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
		
		table_rows+="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+counter+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+item_name+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+quantity+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+price+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+tax+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;font-size:1.2em;font-weight:bold;'>"+total+"</td></tr>";
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
	var total_amount=$(table_foot).find('tr>td:nth-child(3)')[0].innerHTML;
	
	var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
				"<td colspan='2' style='border: 1px solid #000;text-align:left;'>"+total_quantity+"</td>"+
				"<td colspan='2' style='border: 1px solid #000;text-align:left;'>"+total_text+"</td>"+
				"<td colspan='2' style='border: 1px solid #000;text-align:left;font-size:1.2em;font-weight:bold;'>"+total_amount+"</td></tr>";
		
	table_rows+=table_foot_row;
	new_table.innerHTML=table_rows;
	
	/////////////placing the containers //////////////////////////////////////////////////////	
	
	container.appendChild(header);
	container.appendChild(invoice_line);
	container.appendChild(info_section);
	
	container.appendChild(new_table);
	
	header.appendChild(logo);
	header.appendChild(business_contact);
	
	info_section.appendChild(customer_info);
	info_section.appendChild(business_info);
	
	func(container);
}
    </script>
</div>