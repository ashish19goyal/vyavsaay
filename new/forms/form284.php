<div id='form284' class='tab-pane'>
	<form id='form284_master' autocomplete="off">
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' id='form284_add_customer'><br>
				<input type='text' required name='customer'></label>
			<label>Type<br><input type='text' name='bill_type' required></label>
			<label>Date<br><input type='text' name='date' required></label>
			<br>
			<label>Narration<br><textarea style='width:200px;' name='narration'></textarea></label>
			<label>Invoice #<br><input type='text' name='bill_num' readonly="readonly"></label>
			<label>	<input type='button' title='Save Bill' name='save' class='save_icon'></label>
			<label>	<input type='button' title='Print Bill' class='print_icon' name='print' onclick='form284_print_form();'></label>
			<label>	<input type='button' title='Share Bill' class='share_icon' name='share'></label>
			<label>	<input type='submit' class='submit_hidden'>
					<input type='hidden' name='customer_info'>
					<input type='hidden' name='bill_id'>
					<input type='hidden' name='cst'>
					<input type='hidden' name='tin'>
					<input type='hidden' name='email'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead id='form284_head'>
			<tr>
				<form id='form284_header'></form>
				<th style='width:50px'>S.No</th>
				<th style='min-width:200px'>Item</th>
				<th>Details</th>
				<th>Quantity</th>
				<th>Amount</th>
				<th><input type='button' title='Add Item' class='add_icon' onclick='form284_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form284_body'>
		</tbody>
		<tfoot id='form284_foot'>
		</tfoot>
	</table>
    
    <script>
    function form284_header_ini()
{
	var fields=document.getElementById('form284_master');
	
	var customers_filter=fields.elements['customer'];
	var bill_type=fields.elements['bill_type'];
	var bill_date=fields.elements['date'];
	var narration=fields.elements['narration'];
	var bill_num=fields.elements['bill_num'];
	fields.elements['bill_id'].value=get_new_key();
	var save_button=fields.elements['save'];
	var cst_filter=fields.elements['cst'];
	var tin_filter=fields.elements['tin'];
	var customer_info=fields.elements['customer_info'];
	var email_filter=fields.elements['email'];
	var share_button=fields.elements['share'];

	$(share_button).off('click');
	
	narration.value="";
	bill_type.removeAttribute('readonly');
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form284_create_form();
	});
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) 
	{
		if( event.keyCode == 83 && event.ctrlKey) 
		{
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form284_add_item();
	});
	
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter,function () 
	{
		$(customers_filter).focus();
	});

	var add_customer=document.getElementById('form284_add_customer');
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

	var type_data="<bill_types>" +
		"<name></name>" +
		"<status exact='yes'>active</status>" +
		"</bill_types>";
	set_my_value_list(type_data,bill_type);
	
	var bill_id=$("#form284_link").attr('data_id');
	if(bill_id==null || bill_id=='')
	{	
		get_single_column_data(function (bill_types) 
		{
			if(bill_types.length>0)
			{
				bill_type.value=bill_types[0];
				var bill_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>"+bill_type.value+"_bill_num</name>"+
							"</user_preferences>";
				get_single_column_data(function(nums)
				{
					if(nums.length>0)
					{
						bill_num.value=get_session_var('invoice_number_prefix')+"-"+nums[0];
					}
				},bill_num_data);
			}
			else 
			{
				var bill_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>bill_num</name>"+
							"</user_preferences>";
				get_single_column_data(function(nums)
				{
					if(nums.length>0)
					{
						bill_num.value=get_session_var('invoice_number_prefix')+"-"+nums[0];
					}
				},bill_num_data);
			}
		},type_data);
	}

	$(bill_type).off('blur');
	$(bill_type).on('blur',function (e) 
	{
		var bill_num_data="<user_preferences count='1'>"+
						"<value></value>"+
						"<name exact='yes'>"+bill_type.value+"_bill_num</name>"+
						"</user_preferences>";
		get_single_column_data(function(nums)
		{
			if(nums.length>0)
			{
				bill_num.value=get_session_var('invoice_number_prefix')+"-"+nums[0];
			}
		},bill_num_data);	
	});	
	
	$(customers_filter).off('blur');
	$(customers_filter).on('blur',function(e)
	{
		var address_data="<customers>" +
				"<address></address>" +
				"<city></city>" +
				"<email></email>"+	
				"<acc_name exact='yes'>"+customers_filter.value+"</acc_name>" +
				"</customers>";
		fetch_requested_data('',address_data,function(addresses)
		{
			if(addresses.length>0)
			{
				customer_info.value="Address\n"+addresses[0].address+", "+addresses[0].city;
				email_filter.value=addresses[0].email;
			}
			else
			{
				customer_info.value="";
				email_filter.value="";
			}
		});
		
		var tin_data="<attributes>"+
					"<value></value>"+
					"<type exact='yes'>customer</type>"+
					"<attribute exact='yes'>TIN</attribute>"+
					"<name exact='yes'>"+customers_filter.value+"</name>"+
					"</attributes>";
		set_my_value(tin_data,tin_filter);
	});

	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	customers_filter.value='';
}

function form284_ini()
{
	var bill_id=$("#form284_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form284_body').html("");
	$('#form284_foot').html("");
	
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
				"<cartage></cartage>"+
				"<tax></tax>" +
				"<tax_rate></tax_rate>"+
				"<billing_type></billing_type>" +
				"<tax_type></tax_type>"+
				"<type></type>" +
				"<storage></storage>"+
				"<notes></notes>"+
				"</bills>";
		var bill_items_column="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<item_desc></item_desc>"+
				"<unit_price></unit_price>" +
				"<quantity></quantity>" +
				"<unit></unit>"+				
				"<amount></amount>" +
				"<total></total>" +
				"<discount></discount>" +
				"<type></type>" +
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
				"<tax></tax>" +
				"<from_date></from_date>"+
				"<to_date></to_date>"+
				"</bill_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			var filter_fields=document.getElementById('form284_master');
			if(bill_results.length>0)
			{
				filter_fields.elements['customer'].value=bill_results[0].customer_name;
				filter_fields.elements['bill_type'].value=bill_results[0].billing_type;
				filter_fields.elements['date'].value=get_my_past_date(bill_results[0].bill_date);
				filter_fields.elements['narration'].value=bill_results[0].notes;
				filter_fields.elements['bill_num'].value=bill_results[0].bill_num;
				filter_fields.elements['bill_id'].value=bill_id;				
				var save_button=filter_fields.elements['save'];
				var customer_info=filter_fields.elements['customer_info'];
				filter_fields.elements['bill_type'].setAttribute('readonly','readonly');
				var cst_filter=filter_fields.elements['cst'];
				var tin_filter=filter_fields.elements['tin'];

				if(filter_fields.elements['bill_type'].value=='Retail' || filter_fields.elements['bill_type'].value=='Tax')
				{
					var tin_data="<attributes>"+
								"<value></value>"+
								"<type exact='yes'>customer</type>"+
								"<attribute exact='yes'>TIN</attribute>"+
								"<name exact='yes'>"+bill_results[0].customer_name+"</name>"+
								"</attributes>";
					set_my_value(tin_data,tin_filter);
				}
								
				var address_data="<customers>" +
						"<address></address>" +
						"<city></city>" +
						"<acc_name exact='yes'>"+bill_results[0].customer_name+"</acc_name>" +
						"</customers>";
				fetch_requested_data('',address_data,function(addresses)
				{
					var address_string="";
					if(addresses.length>0)
					{
						address_string+=addresses[0].address+", "+addresses[0].city;
					}
					customer_info.value="Address<br>"+address_string;
				});
								
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form284_update_form();
				});

				var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Amount:<br>Tax:@ <input type='number' value='"+bill_results[0].tax_rate+"' step='any' id='form284_tax' class='dblclick_editable'>%<br>Cartage: <br>Total: </td>" +
							"<td>Rs. "+bill_results[0].amount+"</br>" +
							"Rs. "+bill_results[0].tax+" <br>" +
							"Rs. <input type='number' value='"+bill_results[0].cartage+"' step='any' id='form284_cartage' class='dblclick_editable'><br>" +
							"Rs. <vtotal>"+bill_results[0].total+"</vtotal></td>" +
							"<td></td>" +
							"</tr>";
				
				$('#form284_foot').html(total_row);
				longPressEditable($('.dblclick_editable'));
			}
		
			fetch_requested_data('',bill_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form284_"+id+"'></form>";
						rowsHTML+="<td data-th='S.No.'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<textarea readonly='readonly' form='form284_"+id+"'>"+result.item_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Details'>";
							rowsHTML+="<textarea readonly='readonly' form='form284_"+id+"'>"+result.item_desc+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form284_"+id+"' value='"+result.quantity+"' step='any'> <b>"+result.unit+"</b>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
								rowsHTML+="<b>Rate</b>:<input type='number' readonly='readonly' form='form284_"+id+"' value='"+result.unit_price+"'>";
								rowsHTML+="<br><b>Amount</b>:<input type='number' readonly='readonly' form='form284_"+id+"' value='"+result.amount+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form284_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form284_"+id+"' id='save_form284_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form284_"+id+"' id='delete_form284_"+id+"' onclick='form284_delete_item($(this)); form284_get_totals();'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form284_body').prepend(rowsHTML);	
				});

				form284_update_serial_numbers();
				var bt=get_session_var('title');
				var share_button=filter_fields.elements['share'];
				$(share_button).show();
				$(share_button).click(function()
				{
					modal101_action('Invoice from - '+bt,filter_fields.elements['customer'].value,'customer',function (func) 
					{
						print_form284(func);
					});
				});
				
				$('textarea').autosize();
				hide_loader();
			});
		});
	}
}
    
function form284_add_item()
{
	var filter_fields=document.getElementById('form284_master');
	var bill_type=filter_fields.elements['bill_type'].value;
	var customer_name=filter_fields.elements['customer'].value;
	
	if(is_create_access('form284'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form284_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='S.No.'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' class='wideinput' required form='form284_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<textarea form='form284_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' min='0' required form='form284_"+id+"' step='any'> <b id='form284_unit_"+id+"'></b>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="<b>Rate</b>:<input type='number' required form='form284_"+id+"' step='any'>";
				rowsHTML+="<br><b>Amount</b>:<input type='number' required readonly='readonly' form='form284_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form284_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form284_"+id+"' id='save_form284_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form284_"+id+"' id='delete_form284_"+id+"' onclick='$(this).parent().parent().remove();form284_update_serial_numbers(); form284_get_totals();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form284_"+id+"'>";
				//rowsHTML+="<input type='hidden' form='form284_"+id+"' name='tax_unit'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form284_body').append(rowsHTML);
		
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();

		var fields=document.getElementById("form284_"+id);
		var name_filter=fields.elements[0];
		var detail_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var amount_filter=fields.elements[4];
		//var tax_filter=fields.elements[5];
		//var total_filter=fields.elements[6];
		var id_filter=fields.elements[5];
		var save_button=fields.elements[6];
		//var tax_unit_filter=fields.elements[11];
		
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form284_create_item(fields);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form284_add_item();
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
			var desc_data="<product_master>" +
				"<description></description>"+
				"<name exact='yes'>"+name_filter.value+"</name>" +
				"</product_master>";		
			set_my_value(desc_data,detail_filter);
/*
			var tax_data="<product_master>" +
				"<tax></tax>"+
				"<name exact='yes'>"+name_filter.value+"</name>" +
				"</product_master>";		
			set_my_value(tax_data,tax_unit_filter);
	*/		
			var unit_data="<attributes count='1'>"+
						"<value></value>"+
						"<attribute exact='yes'>Unit</attribute>"+
						"<name exact='yes'>"+name_filter.value+"</name>"+
						"</attributes>";
			get_single_column_data(function(units)
			{
				if(units.length>0)
					$('#form284_unit_'+id).html(units[0]);
			},unit_data);			
		});

		$(price_filter).add(quantity_filter).on('blur',function(event)
		{
			amount_filter.value=my_round((parseFloat(quantity_filter.value)*parseFloat(price_filter.value)),2);
			//tax_filter.value=my_round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);
			//total_filter.value=my_round((amount_filter.value+tax_filter.value),2);				
		});

/*
		$(tax_filter).on('blur',function(event)
		{
			total_filter.value=my_round((amount_filter.value+tax_filter.value),2);				
		});
*/
		form284_update_serial_numbers();
		form284_get_totals();
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form284_create_item(form)
{
	if(is_create_access('form284'))
	{
		var bill_id=document.getElementById("form284_master").elements['bill_id'].value;
		
		var name=form.elements[0].value;
		var details=form.elements[1].value;
		var quantity=form.elements[2].value;
		var price=form.elements[3].value;
		var amount=form.elements[4].value;
		//var tax=form.elements[5].value;
		//var total=form.elements[6].value;
		var data_id=form.elements[5].value;
		var save_button=form.elements[6];
		var del_button=form.elements[7];
		
		var unit=$('#form284_unit_'+data_id).html();
		var last_updated=get_my_time();
		
		var data_xml="<bill_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<item_desc>"+details+"</item_desc>" +
				"<batch>"+name+"</batch>" +
				"<unit_price>"+price+"</unit_price>" +
				"<quantity>"+quantity+"</quantity>" +
				"<unit>"+unit+"</unit>"+				
				"<amount>"+amount+"</amount>" +
				//"<total>"+total+"</total>" +
				//"<tax>"+tax+"</tax>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";
		var adjust_xml="<inventory_adjust>" +
				"<id>"+data_id+"</id>" +
				"<product_name>"+name+"</product_name>" +
				"<batch>"+name+"</batch>" +
				"<quantity>"+quantity+"</quantity>" +
				"<source>sale</source>" +
				"<source_id>"+bill_id+"</source_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</inventory_adjust>";	
	
		create_simple(data_xml);
		create_simple(adjust_xml);
		
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form284_delete_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create Performa Invoice
 * @formNo 284
 * @param button
 */
function form284_create_form()
{
	if(is_create_access('form284'))
	{
		var form=document.getElementById("form284_master");
		
		var customer=form.elements['customer'].value;
		var bill_type=form.elements['bill_type'].value;
		var bill_date=get_raw_time(form.elements['date'].value);
		var narration=form.elements['narration'].value;		
		var bill_num=form.elements['bill_num'].value;
		var share_button=form.elements['share'].value;

		var bt=get_session_var('title');
		$(share_button).off('click');
		$(share_button).on('click',function()
		{
			modal101_action('Invoice from :'+bt,customer,'customer',function (func) 
			{
				print_form284(func);
			});
		});

		var amount=0;
		var tax_rate=0;
		var cartage=0;
		
		if(document.getElementById('form284_cartage'))
		{
			tax_rate=parseFloat(document.getElementById('form284_tax').value);
			cartage=parseFloat(document.getElementById('form284_cartage').value);
		}
		
		$("[id^='save_form284']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			if(!isNaN(parseFloat(subform.elements[4].value)))
				amount+=parseFloat(subform.elements[4].value);
		});

		amount=my_round(amount,2);		
		var tax=my_round((tax_rate*((amount)/100)),2);		
		var total=my_round(amount+tax+cartage,0);
	
		var data_id=form.elements['bill_id'].value;
		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var data_xml="<bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_num>"+bill_num+"</bill_num>"+
					"<customer_name>"+customer+"</customer_name>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<billing_type>"+bill_type+"</billing_type>" +
					"<cartage>"+cartage+"</cartage>" +
					"<tax>"+tax+"</tax>" +
					"<tax_rate>"+tax_rate+"</tax_rate>"+
					"<transaction_id>"+data_id+"</transaction_id>" +
					"<notes>"+narration+"</notes>"+
					"<performa>yes</performa>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bills</tablename>" +
					"<link_to>form283</link_to>" +
					"<title>Saved</title>" +
					"<notes>Invoice #"+bill_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+data_id+"</id>" +
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
					"<status>pending</status>" +
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
					"<name exact='yes'>"+bill_type+"_bill_num</name>"+												
					"</user_preferences>";
		get_single_column_data(function (bill_num_ids)
		{
			if(bill_num_ids.length>0)
			{
				var bill_num_array=bill_num.split("-");
				var num_xml="<user_preferences>"+
							"<id>"+bill_num_ids[0]+"</id>"+
							"<value>"+(parseInt(bill_num_array[1])+1)+"</value>"+
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
			//modal26_action(pt_tran_id);
		});
		
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Amount:<br>Tax:@ <input type='number' value='"+tax_rate+"' step='any' readonly='readonly' id='form284_tax' class='dblclick_editable'>%<br>Cartage: <br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. "+tax+"<br>" +
					"Rs. <input type='number' value='"+cartage+"' step='any' id='form284_cartage' readonly='readonly' class='dblclick_editable'></br>" +
					"Rs. <vtotal>"+total+"</vtotal></td>" +
					"<td></td>" +
					"</tr>";
		
		$('#form284_foot').html(total_row);
		longPressEditable($('.dblclick_editable'));

		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form284_update_form();
		});
		
		$("[id^='save_form284_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}
    
function form284_update_form()
{
	if(is_update_access('form284'))
	{
		var form=document.getElementById("form284_master");
		
		var customer=form.elements['customer'].value;
		var bill_type=form.elements['bill_type'].value;
		var bill_date=get_raw_time(form.elements['date'].value);
		var narration=form.elements['narration'].value;		
		var bill_num=form.elements['bill_num'].value;
				
		var amount=0;
		var tax_rate=0;
		var cartage=0;
		
		if(document.getElementById('form284_cartage'))
		{
			tax_rate=parseFloat(document.getElementById('form284_tax').value);
			cartage=parseFloat(document.getElementById('form284_cartage').value);
		}
		
		$("[id^='save_form284']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			if(!isNaN(parseFloat(subform.elements[4].value)))
				amount+=parseFloat(subform.elements[4].value);
		});

		amount=my_round(amount,2);
		var tax=my_round((tax_rate*((amount)/100)),2);		
		var total=my_round(amount+tax+cartage,0);
		var data_id=form.elements['bill_id'].value;
		var last_updated=get_my_time();		
		
		var data_xml="<bills>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer+"</customer_name>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<billing_type>"+bill_type+"</billing_type>" +
					"<bill_num>"+bill_num+"</bill_num>" +
					"<cartage>"+cartage+"</cartage>" +
					"<tax>"+tax+"</tax>" +
					"<tax_rate>"+tax_rate+"</tax_rate>"+
					"<transaction_id>"+data_id+"</transaction_id>" +
					"<notes>"+narration+"</notes>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bills</tablename>" +
					"<link_to>form283</link_to>" +
					"<title>Updated</title>" +
					"<notes>Invoice # "+bill_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+data_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>"+customer+"</receiver>" +
					"<giver>master</giver>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		update_row(data_xml,activity_xml);
		update_simple(transaction_xml);
		
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Amount:<br>Tax:@ <input type='number' readonly='readonly' value='"+tax_rate+"' step='any' id='form284_tax' class='dblclick_editable'>% <br>Cartage: <br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. "+tax+" <br>" +
					"Rs. <input type='number' value='"+cartage+"' readonly='readonly' step='any' id='form284_cartage' class='dblclick_editable'></br>" +
					"Rs. <vtotal>"+total+"</vtotal></td>" +
					"<td></td>" +
					"</tr>";
		
		$('#form284_foot').html(total_row);
		longPressEditable($('.dblclick_editable'));

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
					//modal26_action(payments[y]);
				});
				break;
			}
		},payment_data);
	
		$("[id^='save_form284_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form284_delete_item(button)
{
	if(is_delete_access('form284'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[5].value;
					
			var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"</bill_items>";	
			var adjust_xml="<inventory_adjust>" +
						"<id>"+data_id+"</id>" +
						"</inventory_adjust>";	
			delete_simple(data_xml);
			delete_simple(adjust_xml);
					
			$(button).parent().parent().remove();
			form284_update_serial_numbers();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}
    
function form284_update_serial_numbers()
{
	$('#form284_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});
}

function form284_get_totals()
{
	var form=document.getElementById("form284_master");
		
	var bill_type=form.elements['bill_type'].value;
	
	var amount=0;
	var cartage=0;
	var tax_rate=0;
	
	if(document.getElementById('form284_cartage'))
	{
		tax_rate=parseFloat(document.getElementById('form284_tax').value);
		cartage=parseFloat(document.getElementById('form284_cartage').value);
	}
	
	$("[id^='save_form284']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		if(!isNaN(parseFloat(subform.elements[4].value)))
				amount+=parseFloat(subform.elements[4].value);
	});

	amount=my_round(amount,2);		
	var tax=my_round((tax_rate*((amount)/100)),2);		
	var total=my_round(amount+tax+cartage,0);
	
	var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:<br>Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form284_tax' class='dblclick_editable'>% <br>Cartage: <br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+tax+" <br>" +
				"Rs. <input type='number' value='"+cartage+"' step='any' id='form284_cartage' class='dblclick_editable'></br>" +
				"Rs. <vtotal>"+total+"</vtotal></td>" +
				"<td></td>" +
				"</tr>";
	$('#form284_foot').html(total_row);
	longPressEditable($('.dblclick_editable'));
}
        
function form284_print_form()
{
	print_form284(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
* This function prepares the printing template for the documents like bills and purchase orders
*/
function print_form284(func)
{
	var form_id='form284';
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
		var signature=document.createElement('div');
		var jurisdiction=document.createElement('div');
		var business_contact=document.createElement('div');
	
////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;text-align:center');
		logo.setAttribute('style','width:100%;text-align:center;');
	
	info_section.setAttribute('style','width:100%;height:85px;font-size:11px;');
		customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
		business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
	
	footer.setAttribute('style','width:98%;min-height:100px;');
		signature.setAttribute('style','width:98%;min-height:50px;font-size:11px;');
		jurisdiction.setAttribute('style','margin:10px;width:98%;min-height:20px;text-align:left;font-size:11px;');
		business_contact.setAttribute('style','margin:0px;padding:0px;width:98%;text-align:center;page-break-inside:avoid;font-size:11px;');

///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var logo_image=get_session_var('logo');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');

	var master_form=document.getElementById(form_id+'_master');
	var customer_name=master_form.elements['customer'].value;
	var address=master_form.elements['customer_info'].value;
	var date=master_form.elements['date'].value;
	var bill_no=master_form.elements['bill_num'].value;
	var invoice_type=master_form.elements['bill_type'].value;
	var narration=master_form.elements['narration'].value;
	var cin=get_session_var('cin');
	var pan=get_session_var('pan');
	var customer_email=master_form.elements['email'].value;
	var customer_tin=master_form.elements['tin'].value;
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	
	invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>"+invoice_type+" Invoice</b></div><hr style='border: 1px solid #00f;'>";
	
	customer_info.innerHTML="<b>Customer: </b><br>"+customer_name+"<br>"+address+"<br>Email: "+customer_email+"<br>TIN: "+customer_tin;
	business_info.innerHTML="<b>Seller</b><br>Bill #: "+bill_no+"<br>Date: "+date+"<br>Remarks: "+narration;

	jurisdiction.innerHTML="All disputes subjected to Delhi jurisdiction.<br>This is a computer generated invoice.";
	signature.innerHTML="<div style='float:left;text-align:left;width:50%;'>Customer's Seal & Sign.<br><br><br></div><div style='float:right;width:50%;text-align:right;'>For "+bt+"<br><br>Auth. Signatory<br></div>";
	business_contact.innerHTML="<hr style='border: 1px solid #00f;margin:5px;'>Address: "+business_address+"<br>Phone: "+business_phone+", E-Mail: "+business_email+"<br>CIN: "+cin+", PAN: "+pan+"<hr style='border: 1px solid #00f;margin:5px;'>";

	var table_element=document.getElementById(form_id+'_body');

	/////////////adding new table //////////////////////////////////////////////////////	
	var new_table=document.createElement('table');
	new_table.setAttribute('style','width:100%;font-size:12px;border:1px solid black;text-align:left;');
	new_table.setAttribute('class','plain_table');
	var table_header="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;width:8%;'>S.No.</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:25%;'>Item Name</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:25%'>Details</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:13%'>Quantity</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:13%'>Rate</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:13%'>Amount</td></tr>";

	var table_rows=table_header;
	var counter=0;

	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		var item_name=form.elements[0].value;
		var details=form.elements[1].value;
		var quantity=""+form.elements[2].value;
		var rate=form.elements[3].value;
		var amount=form.elements[4].value;
		
		table_rows+="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+counter+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+item_name+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+details+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+quantity+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+rate+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+amount+"</td></tr>";
	});
	
	var row_count=$(table_element).find('tbody>tr').length;
	var rows_to_add=10-row_count;
	for(var i=0;i<rows_to_add;i++)
	{
		table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	}

	var table_foot=document.getElementById(form_id+'_foot');
	var total_quantity=$(table_foot).find('tr>td:first')[0].innerHTML;
	
	var total_text_element=$(table_foot).find('tr>td:nth-child(2)');
	var total_amount_element=$(table_foot).find('tr>td:nth-child(3)');
	
	var total_amount_number=$(total_amount_element).find('vtotal').html();
	var wording_total=number2text(total_amount_number);
	
	$(total_amount_element).add(total_text_element).find("input").each(function(index)
	{
		$(this).replaceWith($(this).val());
	});

	var total_text=$(total_text_element)[0].innerHTML;
	var total_amount=$(total_amount_element)[0].innerHTML;
	
	var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
				"<td colspan='2' style='border: 1px solid #000;text-align:left;'>Total (in words): "+wording_total+"</td>"+
				"<td colspan='2' style='border: 1px solid #000;text-align:left;'>"+total_text+"</td>"+
				"<td colspan='2' style='border: 1px solid #000;text-align:left;font-size:1.2em;font-weight:bold;'>"+total_amount+"</td></tr>";
		
	table_rows+=table_foot_row;
	new_table.innerHTML=table_rows;
	
	/////////////placing the containers //////////////////////////////////////////////////////	
	
	container.appendChild(header);
	container.appendChild(invoice_line);
	container.appendChild(info_section);
	
	container.appendChild(new_table);
	container.appendChild(footer);
	
	header.appendChild(logo);
	header.appendChild(business_contact);
	
	info_section.appendChild(customer_info);
	info_section.appendChild(business_info);
	
	footer.appendChild(jurisdiction);
	footer.appendChild(signature);
	footer.appendChild(business_contact);
	
	func(container);
}
    </script>
</div>