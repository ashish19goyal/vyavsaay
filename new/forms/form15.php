<div id='form15' class='tab-pane'>
	<form id='form15_master' autocomplete="off">
		<fieldset>
			<label>Customer	<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form15_add_customer'><br>
			<input type='text' required name='customer'></label>
			<label>Order #<br><input type='text' name='order_num' required></label>
			<label>Channel<br><input type='text' name='channel' required></label>
			<label>Return Date<br><input type='text' name='date' required></label>
			<label>
				<input type='hidden' name='order_id'>
				<input type='hidden' name='return_id'>
				<input type='hidden' name='t_id'>
			</label>
			<label>	<input type='button' title='Save Bill' name='save' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' name='print' class='print_icon' onclick='form15_print_form();'></label>
			<label>	<input type='button' id='form15_share' name='share' class='share_icon' style='display:none;'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form15_header'></form>
					<th>Item</th>
					<th>Batch</th>
					<th>Quantity</th>
					<th>Type</th>
					<th>Details</th>
					<th><input type='button' form='form15_header' title='Add item' class='add_icon' onclick='form15_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form15_body'>
		</tbody>
		<tfoot id='form15_foot'>
		</tfoot>
	</table>
    
    <script>
        function form15_header_ini()
{
	var fields=document.getElementById('form15_master');
	
	var customers_filter=fields.elements['customer'];
	var return_date=fields.elements['date'];
	var channel=fields.elements['channel'];
	var order_num=fields.elements['order_num'];
	var order_id=fields.elements['order_id'];
	fields.elements['return_id'].value=vUtil.newKey();
	fields.elements['t_id'].value=vUtil.newKey();
	var save_button=fields.elements['save'];

	customers_filter.value="";
	order_num.value="";
	channel.value="";
	order_id.value="";
		
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form15_create_form();
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
		form15_add_item();
	});
	
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list_func(customers_data,customers_filter,function () 
	{
		$(customers_filter).focus();
	});

	var add_customer=document.getElementById('form15_add_customer');
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
		
	$(return_date).datepicker();
	return_date.value=vTime.date();
}

function form15_ini()
{
	var data_id=$("#form15_link").attr('data_id');
	if(data_id==null)
		data_id="";	
	
	$('#form15_body').html("");
	$('#form15_foot').html("");
	
	if(data_id!="")
	{
		show_loader();
		var return_columns="<customer_returns>" +
				"<id>"+data_id+"</id>" +
				"<customer></customer>" +
				"<total></total>" +
				"<return_date></return_date>" +
				"<tax></tax>" +
				"<order_id></order_id>"+
				"<order_num></order_num>"+
				"<channel></channel>"+
				"<transaction_id></transaction_id>" +
				"<status></status>"+
				"</customer_returns>";
		var return_items_column="<customer_return_items>" +
				"<id></id>" +
				"<return_id exact='yes'>"+data_id+"</return_id>" +
				"<item_name></item_name>" +
				"<item_desc></item_desc>" +
				"<batch></batch>" +
				"<notes></notes>" +
				"<quantity></quantity>" +
				"<type></type>" +
				"<refund_amount></refund_amount>" +
				"<exchange_batch></exchange_batch>" +
				"<saleable></saleable>" +
				"<storage></storage>"+
				"<tax></tax>" +
				"</customer_return_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',return_columns,function(return_results)
		{
			var filter_fields=document.getElementById('form15_master');
			
			for (var i in return_results)
			{
				filter_fields.elements['customer'].value=return_results[i].customer;
				filter_fields.elements['date'].value=get_my_past_date(return_results[i].return_date);
				filter_fields.elements['return_id'].value=data_id;
				filter_fields.elements['t_id'].value=return_results[i].transaction_id;
				filter_fields.elements['order_id'].value=return_results[i].order_id;
				filter_fields.elements['order_num'].value=return_results[i].order_num;
				filter_fields.elements['channel'].value=return_results[i].channel;				
				var save_button=filter_fields.elements['save'];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form15_update_form();
				});
		
				var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Refund:</td>" +
							"<td>Rs. "+return_results[i].total+"</td>" +
							"<td></td>" +
							"</tr>";
				$('#form15_foot').html(total_row);
				
				break;
			}
		
			fetch_requested_data('',return_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form15_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<input type='hidden' form='form15_"+id+"'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form15_"+id+"' value='"+result.item_name+"'>";
							rowsHTML+="<br><textarea readonly='readonly' form='form15_"+id+"'>"+result.item_desc+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form15_"+id+"' value='"+result.batch+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form15_"+id+"' value='"+result.quantity+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Type'>";
							rowsHTML+="Saleable: <input type='checkbox' readonly='readonly' form='form15_"+id+"' "+result.saleable+">";
							rowsHTML+="<br>Type: <input type='text' readonly='readonly' form='form15_"+id+"' value='"+result.type+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Details'>";
							if(result.type=='refund')
							{
								rowsHTML+="Amount <input type='number' readonly='readonly' step='any' form='form15_"+id+"' value='"+result.refund_amount+"'>";
							}
							else
							{
								rowsHTML+="Batch <input type='text' readonly='readonly' form='form15_"+id+"' value='"+result.exchange_batch+"'>";
							}
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form15_"+id+"' value='"+result.tax+"'>";
							rowsHTML+="<input type='hidden' form='form15_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='submit_hidden' form='form15_"+id+"' id='save_form15_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form15_"+id+"' id='delete_form15_"+id+"' onclick='form15_delete_item($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form15_body').append(rowsHTML);
					
					var fields=document.getElementById("form15_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
					});
				});
				hide_loader();
			});
		});
	}
}

function form15_add_item()
{
	if(is_create_access('form15'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form15_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' required form='form15_"+id+"'>";
				rowsHTML+="<br>SKU: <input type='text' required form='form15_"+id+"'>";
				rowsHTML+="<br>Name: <textarea form='form15_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='form15_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form15_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Type'>";
				rowsHTML+="Saleable: <input type='checkbox' form='form15_"+id+"'>";			
				rowsHTML+="<br>Type: <input type='text' required form='form15_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<span class='dynamic_before'><input type='text' required form='form15_"+id+"'></span>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form15_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form15_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='hidden' form='form15_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form15_"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form15_"+id+"' id='save_form15_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form15_"+id+"' id='delete_form15_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form15_"+id+"'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form15_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form15_"+id);
		var barcode_filter=fields.elements[0];
		var name_filter=fields.elements[1];
		var desc_filter=fields.elements[2];
		var batch_filter=fields.elements[3];
		var quantity_filter=fields.elements[4];
		var type_filter=fields.elements[6];
		var total_batch_filter=fields.elements[7];
		var tax_filter=fields.elements[8];
		var id_filter=fields.elements[9];
		var total_unit_filter=fields.elements[10];
		var tax_unit_filter=fields.elements[11];
		var save_button=fields.elements[12];
				
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form15_create_item(fields);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form15_add_item();
		});

		$(barcode_filter).focus();
		
		var product_data="<sale_order_items>" +
				"<item_name></item_name>" +
				"</sale_order_items>";
		set_my_value_list_func(product_data,name_filter);
		
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
			var desc_data="<product_master count='1'>"+
						"<description></description>"+
						"<name exact='yes'>"+name_filter.value+"</name>"+
						"</product_master>";
			set_my_value(desc_data,desc_filter);
						
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
			batch_filter.value="";
			quantity_filter.value=0;
			type_filter.value="";
			total_batch_filter.value=0;
			tax_filter.value=0;
			total_unit_filter.value=0;
			tax_unit_filter.value=0;
		});
		
		$(batch_filter).on('blur',function(event)
		{
			var customer_name=document.getElementById("form15_master").elements['customer'].value;
			var bill_data="<bills>" +
					"<id></id>" +
					"<customer_name exact='yes'>"+customer_name+"</customer_name>" +
					"</bills>";
			get_single_column_data(function(bills)
			{
				var bill_string="";
				bills.forEach(function(bill)
				{
					bill_string+=bill+"--";
				});
				var bill_items_data="<bill_items>" +
						"<id></id>" +
						"<bill_id array='yes'>"+bill_string+"</bill_id>" +
						"<item_name exact='yes'>"+name_filter.value+"</item_name>" +
						"<batch exact='yes'>"+batch_filter.value+"</batch>" +
						"<quantity></quantity>" +
						"<total></total>" +
						"<tax></tax>" +
						"<offer></offer>" +
						"<last_updated></last_updated>" +
						"</bill_items>";
				fetch_requested_data('',bill_items_data,function(bill_items)
				{
					var notes_value="";
					bill_items.forEach(function(bill_item)
					{
						total_unit_filter.value=parseFloat(bill_item.total)/parseFloat(bill_item.quantity);
						tax_unit_filter.value=parseFloat(bill_item.tax)/parseFloat(bill_item.quantity);
					});				
				});
			},bill_data);
			
			type_filter.value="";
			quantity_filter.value=0;
			total_batch_filter.value=0;
			tax_filter.value=0;
		});
		
		set_static_value_list('customer_return_items','type',type_filter);
				
		$(type_filter).on('blur',function(event)
		{
			if(type_filter.value=='refund')
			{
				$(total_batch_filter).parent().attr('data-content','Amount: ');
				$(total_batch_filter).removeAttr('list');
				total_batch_filter.value=parseFloat(total_unit_filter.value)*parseFloat(quantity_filter.value);
				tax_filter.value=parseFloat(tax_unit_filter.value)*parseFloat(quantity_filter.value);
			}
			else
			{
				$(total_batch_filter).parent().attr('data-content','Batch: ');
				var batch_data="<product_instances>" +
						"<batch></batch>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"</product_instances>";
				set_my_value_list(batch_data,total_batch_filter);
				total_batch_filter.value="";
				tax_filter.value=0;
			}
		});
		
		$(quantity_filter).on('blur',function(event)
		{
			if(type_filter.value=='refund')
			{
				$(total_batch_filter).removeAttr('list');
				total_batch_filter.value=parseFloat(total_unit_filter.value)*parseFloat(quantity_filter.value);
				tax_filter.value=parseFloat(tax_unit_filter.value)*parseFloat(quantity_filter.value);
			}
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}
        
function form15_create_item(form)
{
	if(is_create_access('form15'))
	{
		var return_id=document.getElementById("form15_master").elements['return_id'].value;
		
		var name=form.elements[1].value;
		var desc=form.elements[2].value;
		var batch=form.elements[3].value;
		var quantity=form.elements[4].value;
		var saleable='unchecked';
		if(form.elements[5].checked)
			saleable='checked';
		var type=form.elements[6].value;
		var total_batch=form.elements[7].value;
		var tax=form.elements[8].value;
		var data_id=form.elements[9].value;
		var save_button=form.elements[12];
		var del_button=form.elements[13];
		
		var storage=get_session_var('sales_return_store');
		
		var last_updated=get_my_time();
					
		var data_xml="<customer_return_items>" +
				"<id>"+data_id+"</id>" +
				"<return_id>"+return_id+"</return_id>" +
				"<item_name>"+name+"</item_name>" +
				"<item_desc>"+desc+"</item_desc>" +
				"<notes>"+notes+"</notes>" +
				"<batch>"+batch+"</batch>" +
				"<quantity>"+quantity+"</quantity>" +
				"<type>"+type+"</type>" +
				"<saleable>"+saleable+"</saleable>";
		if(type=='refund')
		{
			data_xml+="<refund_amount>"+total_batch+"</refund_amount>";
		}
		else
		{
			data_xml+="<exchange_batch>"+total_batch+"</exchange_batch>";
		}
		data_xml+="<tax>"+tax+"</tax>" +
				"<storage>"+storage+"</storage>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</customer_return_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}
				
		if(saleable!="checked")
		{
			var discard_id=vUtil.newKey();
			var discard_xml="<discarded>" +
					"<id>"+discard_id+"</id>" +
					"<product_name>"+name+"</product_name>" +
					"<source_id>"+return_id+"</source_id>" +
					"<batch>"+batch+"</batch>" +
					"<source>sale return</source>" +
					"<source_link>form15</source_link>" +
					"<quantity>"+quantity+"</quantity>" +
					"<storage>"+storage+"</storage>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</discarded>";
			if(is_online())
			{
				server_create_simple(discard_xml);
			}
			else
			{
				local_create_simple(discard_xml);
			}
		}
		
				///////////adding store placement////////
		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+storage+"</name>" +
				"<item_name exact='yes'>"+name+"</item_name>" +
				"<batch exact='yes'>"+batch+"</batch>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0)
			{
				var storage_xml="<area_utilization>" +
						"<id>"+vUtil.newKey()+"</id>" +
						"<name>"+storage+"</name>" +
						"<item_name>"+name+"</item_name>" +
						"<batch>"+batch+"</batch>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				create_simple(storage_xml);
			}
		});		

		for(var i=0;i<9;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form15_delete_item(del_button);
		});

		$(save_button).off('click');

	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form manage customer returns
 * @param button
 */
function form15_create_form()
{
	if(is_create_access('form15'))
	{
		var form=document.getElementById("form15_master");
		
		var customer=form.elements['customer'].value;
		var return_date=get_raw_time(form.elements['date'].value);
		
		var tax=0;
		var total=0;
		
		$("[id^='save_form15']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
				
			if(subform.elements[5].value=='refund')
			{	
				total+=parseFloat(subform.elements[7].value);
				tax+=parseFloat(subform.elements[8].value);
			}			
		});
						
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
			"<td>Refund:</td>" +
			"<td>Rs. "+total+"</td>" +
			"<td></td>" +
			"</tr>";
		$('#form15_foot').html(total_row);
		
		var data_id=form.elements['return_id'].value;
		var order_id=form.elements['order_id'].value;
		var order_num=form.elements['order_num'].value;
		var channel=form.elements['channel'].value;
		var transaction_id=form.elements['t_id'].value;
		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var data_xml="<customer_returns>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<return_date>"+return_date+"</return_date>" +
					"<total>"+total+"</total>" +
					"<tax>"+tax+"</tax>" +
					"<order_id>"+order_id+"</order_id>" +
					"<order_num>"+order_num+"</order_num>" +
					"<channel>"+channel+"</channel>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</customer_returns>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>customer_returns</tablename>" +
					"<link_to>form16</link_to>" +
					"<title>Saved</title>" +
					"<notes>Returns for order # "+order_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>master</receiver>" +
					"<giver>"+customer+"</giver>" +
					"<tax>"+(-tax)+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		var pt_tran_id=vUtil.newKey();
		var payment_xml="<payments>" +
					"<id>"+pt_tran_id+"</id>" +
					"<status>pending</status>" +
					"<type>paid</type>" +
					"<date>"+get_my_time()+"</date>" +
					"<total_amount>"+total+"</total_amount>" +
					"<paid_amount>0</paid_amount>" +
					"<acc_name>"+customer+"</acc_name>" +
					"<due_date>"+get_debit_period()+"</due_date>" +
					"<mode>"+get_payment_mode()+"</mode>" +
					"<transaction_id>"+pt_tran_id+"</transaction_id>" +
					"<source_id>"+data_id+"</source_id>" +
                    "<source>sale return</source>" +
					"<source_info>"+order_num+"</source_info>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</payments>";
		var pt_xml="<transactions>" +
					"<id>"+pt_tran_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>"+customer+"</receiver>" +
					"<giver>master</giver>" +
					"<tax>0</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
			server_create_simple(transaction_xml);
			server_create_simple(pt_xml);
			server_create_simple_func(payment_xml,function()
			{
				//modal28_action(pt_tran_id);
			});
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(transaction_xml);
			local_create_simple(pt_xml);
			local_create_simple_func(payment_xml,function()
			{
				//modal28_action(pt_tran_id);
			});
		}
		
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form15_update_form();
		});
		$("[id^='save_form15_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form15_update_form()
{
	if(is_create_access('form15'))
	{
		var form=document.getElementById("form15_master");
		
		var customer=form.elements['custoemr'].value;
		var return_date=get_raw_time(form.elements['date'].value);
				
		var tax=0;
		var total=0;
		
		$("[id^='save_form15_']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			
			if(subform.elements[5].value=='refund')
			{	
				total+=parseFloat(subform.elements[7].value);
				tax+=parseFloat(subform.elements[8].value);		
			}
		});
				
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Refund:</td>" +
					"<td>Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		$('#form15_foot').html(total_row);

		var data_id=form.elements['return_id'].value;
		var order_id=form.elements['order_id'].value;
		var order_num=form.elements['order_num'].value;
		var channel=form.elements['channel'].value;
		var transaction_id=form.elements['t_id'].value;
		var last_updated=get_my_time();
		
		var data_xml="<customer_returns>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<return_date>"+return_date+"</return_date>" +
					"<total>"+total+"</total>" +
					"<order_id>"+order_id+"</order_id>" +
					"<order_num>"+order_num+"</order_num>" +
					"<channel>"+channel+"</channel>" +
					"<tax>"+tax+"</tax>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</customer_returns>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>customer_returns</tablename>" +
					"<link_to>form16</link_to>" +
					"<title>Updated</title>" +
					"<notes>Returns for order # "+order_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>master</receiver>" +
					"<giver>"+customer+"</giver>" +
					"<tax>"+(-tax)+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
			server_update_simple(transaction_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
			local_update_simple(transaction_xml);
		}
		var payment_data="<payments>" +
				"<id></id>" +
				"<bill_id exact='yes'>"+data_id+"</bill_id>" +
				"</payments>";
		get_single_column_data(function(payments)
		{
			for(var y in payments)
			{
				var payment_xml="<payments>" +
							"<id>"+payments[y]+"</id>" +
							"<type>paid</type>" +
							"<total_amount>"+total+"</total_amount>" +
							"<acc_name>"+customer+"</acc_name>" +
							"<transaction_id>"+payments[y]+"</transaction_id>" +
							"<bill_id>"+data_id+"</bill_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</payments>";
				var pt_xml="<transactions>" +
							"<id>"+payments[y]+"</id>" +
							"<amount>"+total+"</amount>" +
							"<receiver>"+customer+"</receiver>" +
							"<giver>master</giver>" +
							"<tax>0</tax>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</transactions>";
				if(is_online())
				{
					server_update_simple_func(payment_xml,function()
					{
						//modal28_action(payments[y]);
					});
				}
				else
				{
					local_update_simple_func(payment_xml,function()
					{
						//modal28_action(payments[y]);
					});
				}
				break;
			}
		},payment_data);
		$("[id^='save_form15_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form15_delete_item(button)
{
	if(is_delete_access('form15'))
	{
		modal115_action(function()
		{
			var return_id=document.getElementById("form15_master").elements['return_id'].value;
			
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			
			var name=form.elements[1].value;
			var batch=form.elements[3].value;
			var data_id=form.elements[9].value;
			var last_updated=get_my_time();
				
			var data_xml="<customer_return_items>" +
					"<id>"+data_id+"</id>" +
					"<return_id>"+return_id+"</return_id>" +
					"</customer_return_items>";	
			var discard_xml="<discarded>" +
					"<product_name>"+name+"</product_name>" +
					"<source_id>"+return_id+"</source_id>" +
					"<batch>"+batch+"</batch>" +
					"<source>sale return</source>" +
					"</discarded>";
			delete_simple(data_xml);
			delete_simple(discard_xml);
					
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form15_print_form()
{
	print_tabular_form('form15','Sale Returns');
}
    
    </script>
</div>