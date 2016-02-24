<div id='form180' class='tab-pane'>
	<form id='form180_master' autocomplete="off">
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' title='Add new customer' id='form180_add_customer'><br>
			<input type='text' required name='customer'></label>
			<label>Order #<br><input type='text' required name='order_num' readonly="readonly"></label>
			<label>Type<br><input type='text' required name='bill_type'></label>
			<label>Order Date<br><input type='text' required name='order_date'></label>
			<label>Status<br><input type='text' required name='status'></label>
			<label><input type='hidden' name='order_id' name='order_id'></label>
			<label>	<input type='button' title='Save order' class='save_icon' name='save'></label>
			<label>	<input type='button' title='Print Bill' class='print_icon' onclick='form180_print_form();'></label>
			<label>	<input type='submit' class='submit_hidden'>	</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form180_header'></form>
					<th>Item</th>
					<th>Quantity</th>
					<th>Pricing</th>
					<th><input type='button' form='form180_header' title='Add item' class='add_icon' onclick='form180_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form180_body'>
		</tbody>
		<tfoot id='form180_foot'>
		</tfoot>
	</table>
	
	<script>
	  function form180_header_ini()
{
	var fields=document.getElementById('form180_master');
	
	var customers_filter=fields.elements['customer'];
	var order_date=fields.elements['order_date'];
	var status_filter=fields.elements['status'];
	var order_num_filter=fields.elements['order_num'];
	var type_filter=fields.elements['bill_type'];
	
	fields.elements['order_id'].value=get_new_key();
	order_num_filter.value="";
	
	var save_button=fields.elements['save'];

	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form180_create_form();
	});
	
	var billing_type_data="<bill_types>"+
						"<name></name>"+
						"</bill_types>";
	set_my_value_list(billing_type_data,type_filter);
						
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
		form180_add_item();
	});
	
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	set_my_value_list(customers_data,customers_filter,function () 
	{
		$(customers_filter).focus();
	});
	
	var add_customer=document.getElementById('form180_add_customer');
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
	
	var order_num_data="<user_preferences count='1'>"+
				"<value></value>"+
				"<name exact='yes'>so_num</name>"+
				"</user_preferences>";
	set_my_value(order_num_data,order_num_filter);

	$(order_date).datepicker();
	order_date.value=get_my_date();
	set_static_filter('sale_orders','status',status_filter);
	status_filter.value='pending';
	customers_filter.value='';
}

function form180_ini()
{
	var order_id=$("#form180_link").attr('data_id');
	if(order_id==null)
		order_id="";	
	
	$('#form180_body').html("");
	$('#form180_foot').html("");

	if(order_id!="")
	{
		show_loader();
		var order_columns="<sale_orders>" +
				"<id>"+order_id+"</id>" +
				"<customer_name></customer_name>" +
				"<order_num></order_num>"+
				"<order_date></order_date>" +
				"<amount></amount>"+
				"<tax></tax>"+
				"<total></total>"+
				"<billing_type></billing_type>"+
				"<status></status>" +
				"</sale_orders>";
		var order_items_column="<sale_order_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<item_desc></item_desc>" +
				"<quantity></quantity>" +
				"<mrp></mrp>"+
				"<amount></amount>"+
				"<tax></tax>"+
				"<total></total>"+
				"<unit_price></unit_price>"+
				"<order_id exact='yes'>"+order_id+"</order_id>" +
				"<notes></notes>" +
				"</sale_order_items>";
	
		////separate fetch function to get order details like customer name, total etc.
		fetch_requested_data('',order_columns,function(order_results)
		{
			if(order_results.length>0)
			{
				var filter_fields=document.getElementById('form180_master');
				filter_fields.elements['customer'].value=order_results[0].customer_name;
				filter_fields.elements['order_date'].value=get_my_past_date(order_results[0].order_date);
				filter_fields.elements['status'].value=order_results[0].status;
				filter_fields.elements['order_id'].value=order_id;
				filter_fields.elements['order_num'].value=order_results[0].order_num;
				filter_fields.elements['bill_type'].value=order_results[0].billing_type;
				
				var save_button=filter_fields.elements['save'];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form180_update_form();
				});
			}
		/////////////////////////////////////////////////////////////////////////
		
			fetch_requested_data('',order_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form180_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<input type='text' class='wideinput' readonly='readonly' required form='form180_"+id+"' value='"+result.item_name+"'>";
							rowsHTML+="<br><textarea readonly='readonly' form='form180_"+id+"'>"+result.item_desc+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' class='dblclick_editable' readonly='readonly' required form='form180_"+id+"' value='"+result.quantity+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="Price: <input type='number' readonly='readonly' form='form180_"+id+"' value='"+result.unit_price+"' step='any'>";
							rowsHTML+="<br>MRP: <input type='number' readonly='readonly' form='form180_"+id+"' value='"+result.mrp+"' step='any'>";
							rowsHTML+="<br>Amount: <input type='number' readonly='readonly' form='form180_"+id+"' value='"+result.amount+"' step='any'>";
							rowsHTML+="<br>Tax: <input type='number' readonly='readonly' form='form180_"+id+"' value='"+result.tax+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form180_"+id+"' value='"+result.total+"'>";
							rowsHTML+="<input type='hidden' form='form180_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form180_"+id+"' id='save_form180_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form180_"+id+"' id='delete_form180_"+id+"' onclick='form180_delete_item($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form180_body').append(rowsHTML);					
				});
				form180_get_totals();
				$('textarea').autosize();
				hide_loader();
				
			});
		});		
	}
}

function form180_add_item()
{
	if(is_create_access('form180'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form180_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' placeholder='Item' required form='form180_"+id+"' value=''>";
				rowsHTML+="<br><textarea required placeholder='Name' form='form180_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form180_"+id+"' value='' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Notes'>";
				rowsHTML+="Price: <input type='number' readonly='readonly' class='dblclick_editable' form='form180_"+id+"' step='any'>";
				rowsHTML+="<br>MRP: <input type='number' readonly='readonly' class='dblclick_editable' form='form180_"+id+"' step='any'>";
				rowsHTML+="<br>Amount: <input type='number' readonly='readonly' form='form180_"+id+"' step='any'>";
				rowsHTML+="<br>Tax: <input type='number' readonly='readonly' form='form180_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form180_"+id+"' name='total'>";
				rowsHTML+="<input type='hidden' form='form180_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form180_"+id+"' id='save_form180_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form180_"+id+"' id='delete_form180_"+id+"' onclick='$(this).parent().parent().remove(); form180_get_totals();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form180_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form180_"+id+"' name='tax_rate'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form180_body').prepend(rowsHTML);
		
		var filter_fields=document.getElementById('form180_master');
		var bill_type=filter_fields.elements['bill_type'].value;
	
		var fields=document.getElementById("form180_"+id);
		var name_filter=fields.elements[0];
		var desc_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var mrp_filter=fields.elements[4];
		var amount_filter=fields.elements[5];
		var tax_filter=fields.elements[6];
		var total_filter=fields.elements[7];
		var id_filter=fields.elements[8];
		var save_button=fields.elements[9];
		var tax_unit_filter=fields.elements[12];
				
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form180_create_item(fields);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form180_add_item();
		});
				
		var product_data="<attributes>" +
				"<name></name>" +
				"<type exact='yes'>product</type>"+
				"<value exact='yes'>yes</value>"+
				"<attribute exact='yes'>manufactured</attribute>"+
				"</attributes>";			
		set_my_value_list_func(product_data,name_filter,function () 
		{
			$(name_filter).focus();
		});


		$(name_filter).on('blur',function(event)
		{
			if(name_filter.value!="")
			{
				var master_data="<product_master>" +
							"<description></description>"+
							"<name exact='yes'>"+name_filter.value+"</name>" +
							"<tax></tax>" +
							"</product_master>";
				fetch_requested_data('',master_data,function (products) 
				{
					if(products.length>0)
					{
						if(bill_type=='Retail-CST')
						{
							tax_unit_filter.value=get_session_var('cst_rate');
						}
						else
						{
							tax_unit_filter.value=products[0].tax;
						}
						desc_filter.value=products[0].description;
					}
				});
								
				var price_data="<product_instances>" +
							"<mrp></mrp>" +
							"<sale_price></sale_price>"+
							"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
							"</product_instances>";
				fetch_requested_data('',price_data,function(prices)
				{
					if(prices.length>0)
					{
						price_filter.value=prices[0].sale_price;
						mrp_filter.value=prices[0].mrp;
					}
				});
			}
		});
		
		$(quantity_filter).add(price_filter).on('blur',function(event)
		{
			amount_filter.value=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
						
			tax_filter.value=my_round(((parseFloat(tax_unit_filter.value)*(parseFloat(amount_filter.value)))/100),2);			
			if(isNaN(parseFloat(tax_filter.value)))
				tax_filter.value=0;
			total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
		});

		$('textarea').autosize();
		longPressEditable($('.dblclick_editable'));
		form180_get_totals();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

function form180_create_item(form)
{
	if(is_create_access('form180'))
	{
		var order_id=document.getElementById("form180_master").elements['order_id'].value;
		var order_status=document.getElementById("form180_master").elements['status'].value;
		
		var name=form.elements[0].value;
		var desc=form.elements[1].value;
		var quantity=form.elements[2].value;
		var price=form.elements[3].value;
		var mrp=form.elements[4].value;
		var amount=form.elements[5].value;
		var tax=form.elements[6].value;
		var total=form.elements[7].value;
		var data_id=form.elements[8].value;
		var save_button=form.elements[9];
		var del_button=form.elements[10];
		var last_updated=get_my_time();
		var data_xml="<sale_order_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<item_desc>"+desc+"</item_desc>" +
				"<quantity>"+quantity+"</quantity>" +
				"<unit_price>"+price+"</unit_price>" +
				"<mrp>"+mrp+"</mrp>" +
				"<amount>"+amount+"</amount>" +
				"<tax>"+tax+"</tax>" +
				"<total>"+total+"</total>" +
				"<order_id>"+order_id+"</order_id>" +
				"<bill_status>"+order_status+"</bill_status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</sale_order_items>";	
	
		create_simple(data_xml);
		
		for(var i=0;i<8;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form180_delete_item(del_button);
		});
		
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form New Sale Order
 * @param button
 */
function form180_create_form()
{
	if(is_create_access('form180'))
	{
		var form=document.getElementById("form180_master");
		
		var customer=form.elements['customer'].value;
		var order_date=get_raw_time(form.elements['order_date'].value);		
		var status=form.elements['status'].value;
		var data_id=form.elements['order_id'].value;
		var order_num=form.elements['order_num'].value;
		var bill_type=form.elements['bill_type'].value;
		var save_button=form.elements['save'];
		
		var amount=0;
		var tax=0;
		var total=0;
		var total_quantity=0;
		
		$("[id^='save_form180']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			if(!isNaN(parseFloat(subform.elements[5].value)))
				amount+=parseFloat(subform.elements[5].value);
			if(!isNaN(parseFloat(subform.elements[6].value)))			
				tax+=parseFloat(subform.elements[6].value);
			if(!isNaN(parseFloat(subform.elements[7].value)))			
				total+=parseFloat(subform.elements[7].value);						
			if(!isNaN(parseFloat(subform.elements[2].value)))			
				total_quantity+=parseFloat(subform.elements[2].value);		
		});

		var total_row="<tr><td colspan='1' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
							"<td>Amount:<br>Tax: <br>Total: </td>" +
							"<td>Rs. "+amount+"<br>" +
							"Rs. "+tax+"<br> " +
							"Rs. "+total+"</td>" +
							"<td></td>" +
							"</tr>";
		$('#form180_foot').html(total_row);

		var last_updated=get_my_time();		
		var data_xml="<sale_orders>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer+"</customer_name>" +
					"<order_date>"+order_date+"</order_date>" +
					"<order_num>"+order_num+"</order_num>" +
					"<status>"+status+"</status>" +
					"<amount>"+amount+"</amount>" +
					"<billing_type>"+bill_type+"</billing_type>" +
					"<tax>"+tax+"</tax>" +
					"<total>"+total+"</total>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_orders</tablename>" +
					"<link_to>form181</link_to>" +
					"<title>Created</title>" +
					"<notes>Sale order # "+order_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		
		var num_data="<user_preferences>"+
						"<id></id>"+						
						"<name exact='yes'>so_num</name>"+												
						"</user_preferences>";
		get_single_column_data(function (num_ids)
		{
			if(num_ids.length>0)
			{
				var num_xml="<user_preferences>"+
							"<id>"+num_ids[0]+"</id>"+
							"<value>"+(parseInt(order_num)+1)+"</value>"+
							"<last_updated>"+last_updated+"</last_updated>"+
							"</user_preferences>";
				update_simple(num_xml);
				
			}
		},num_data);

		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form180_update_form();
		});
		
		$("[id^='save_form180_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

function form180_update_form()
{
	if(is_update_access('form180'))
	{
		var form=document.getElementById("form180_master");
		
		var customer=form.elements['customer'].value;
		var order_date=get_raw_time(form.elements['order_date'].value);		
		var status=form.elements['status'].value;
		var data_id=form.elements['order_id'].value;
		var order_num=form.elements['order_num'].value;
		var save_button=form.elements['save'];
		var last_updated=get_my_time();	
		
		var amount=0;
		var tax=0;
		var total=0;
		var total_quantity=0;
		
		$("[id^='save_form180']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			var row_id=subform.elements[8].value;
			if(!isNaN(parseFloat(subform.elements[5].value)))
				amount+=parseFloat(subform.elements[5].value);
			if(!isNaN(parseFloat(subform.elements[6].value)))			
				tax+=parseFloat(subform.elements[6].value);
			if(!isNaN(parseFloat(subform.elements[7].value)))			
				total+=parseFloat(subform.elements[7].value);
			if(!isNaN(parseFloat(subform.elements[2].value)))			
				total_quantity+=parseFloat(subform.elements[2].value);		
						
			var row_update_xml="<sale_order_items>"+
							"<id>"+row_id+"</id>"+
							"<bill_status>"+status+"</bill_status>"+
							"<last_updated>"+last_updated+"</last_updated>"+
							"</sale_order_items>";
			update_simple(row_update_xml);
		});
	
		var total_row="<tr><td colspan='1' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
							"<td>Amount:<br>Tax: <br>Total: </td>" +
							"<td>Rs. "+amount+"<br>" +
							"Rs. "+tax+"<br> " +
							"Rs. "+total+"</td>" +
							"<td></td>" +
							"</tr>";
		
		$('#form180_foot').html(total_row);

		var data_xml="<sale_orders>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer+"</customer_name>" +
					"<order_date>"+order_date+"</order_date>" +
					"<order_num>"+order_num+"</order_num>" +
					"<status>"+status+"</status>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<total>"+total+"</total>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_orders</tablename>" +
					"<link_to>form181</link_to>" +
					"<title>Updated</title>" +
					"<notes>Order # "+order_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);

		$("[id^='save_form180_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

function form180_delete_item(button)
{
	if(is_delete_access('form180'))
	{
		modal115_action(function()
		{			
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			
			var data_id=form.elements[8].value;
			var last_updated=get_my_time();
			var data_xml="<sale_order_items>" +
						"<id>"+data_id+"</id>" +
						"</sale_order_items>";	
			delete_simple(data_xml);
			$(button).parent().parent().remove();
			
			form180_get_totals();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

function form180_print_form()
{	
	print_form180(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
* This function prepares the printing template for the documents like bills and purchase orders
*/
function print_form180(func)
{
	var form_id='form180';
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

	var footer=document.createElement('div');
		var tandc=document.createElement('div');
		var signature=document.createElement('div');

////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;min-height:100px;text-align:center');
		business_intro.setAttribute('style','width:100%;text-align:center');
		business_contact.setAttribute('style','width:100%;text-align:center');
	info_section.setAttribute('style','width:100%;min-height:80px');
		customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
		business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
	footer.setAttribute('style','width:100%;min-height:100px');
		tandc.setAttribute('style','float:left;width:60%;min-height:50px');
		signature.setAttribute('style','float:right;width:30%;min-height:60px');

///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	var logo_image=get_session_var('logo');
	//var business_intro_text=get_session_var('business_intro');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');
	//var business_website=get_session_var('website');

	var master_form=document.getElementById(form_id+'_master');
	var customer_name=master_form.elements['customer'].value;
	var date=master_form.elements['order_date'].value;	
	var bill_num=master_form.elements['order_num'].value;
	var bill_type=master_form.elements['bill_type'].value;
	var vat_no=get_session_var('vat');
		
	var tandc_text=get_session_var('bill_message');
	var signature_text="<br>"+bt+"<br><br><br>Auth. Signatory<br>";
	
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	//business_intro.innerHTML="<hr style='border: 1px solid #000;'>"+business_intro_text;
	business_contact.innerHTML="<hr style='border: 1px solid #00f;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email;
	
	invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>Sale Order</b></div><hr style='border: 1px solid #00f;'>";
	
	customer_info.innerHTML="<b>To</b><br>"+customer_name+"<br>Type: "+bill_type;
	business_info.innerHTML="VAT #: "+vat_no+"<br>Date: "+date+"<br>Order No: "+bill_num;
	
	tandc.innerHTML="<br><b>Terms and Conditions</b><br>"+tandc_text;
	signature.innerHTML=signature_text;

	var table_element=document.getElementById(form_id+'_body');
	
	/////////////adding new table //////////////////////////////////////////////////////	
	var new_table=document.createElement('table');
	new_table.setAttribute('style','width:100%;font-size:11px;border:1px solid black;text-align:left;');
	var table_header="<tr style='border-top: 1px solid #000000;border-bottom: 1px solid #000000;'>"+
				"<td style='text-align:left;width:20%;'>Item</td>"+
				"<td style='text-align:left;width:25%;'>Description</td>"+
				"<td style='text-align:left;width:10%'>Qty</td>"+
				"<td style='text-align:left;width:10%'>Rate</td>"+
				"<td style='text-align:left;width:10%'>Amount</td>"+
				"<td style='text-align:left;width:10%'>Tax</td>"+
				"<td style='text-align:left;width:10%'>Total</td></tr>";

	var table_rows=table_header;
	var counter=0;
	
	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		var item_name=form.elements[0].value;
		var item_desc=form.elements[1].value;
		var quantity=""+form.elements[2].value;
		var price=form.elements[3].value;
		var amount=form.elements[5].value;
		var tax=form.elements[6].value;
		var total=form.elements[7].value;

		table_rows+="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;'>"+
				"<td style='text-align:left;word-wrap: break-word;'>"+item_name+"</td>"+
				"<td style='text-align:left;word-wrap: break-word;'>"+item_desc+"</td>"+
				"<td style='text-align:left;word-wrap: break-word;'>"+quantity+"</td>"+
				"<td style='text-align:left;word-wrap: break-word;'>"+price+"</td>"+
				"<td style='text-align:left;word-wrap: break-word;'>"+amount+"</td>"+
				"<td style='text-align:left;word-wrap: break-word;'>"+tax+"</td>"+
				"<td style='text-align:left;word-wrap: break-word;'>"+total+"</td></tr>";
	});
	
	var row_count=$(table_element).find('tbody>tr').length;
	var rows_to_add=12-row_count;
	for(var i=0;i<rows_to_add;i++)
	{
		table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	}

	var table_foot=document.getElementById(form_id+'_foot');
	var total_text1=$(table_foot).find('tr>td:first')[0].innerHTML;
	var total_text2=$(table_foot).find('tr>td:nth-child(2)')[0].innerHTML;
	var total_amount=$(table_foot).find('tr>td:nth-child(3)')[0].innerHTML;
	//console.log(total_amount);
	var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
				"<td colspan='2' style='text-align:left;'>"+total_text1+"</td>"+
				"<td colspan='3' style='text-align:left;'>"+total_text2+"</td>"+
				"<td colspan='2' style='text-align:left;'>"+total_amount+"</td></tr>";
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
	header.appendChild(business_contact);
	
	info_section.appendChild(customer_info);
	info_section.appendChild(business_info);
	
	footer.appendChild(tandc);
	footer.appendChild(signature);
	
	func(container);
}

function form180_get_totals()
{
	var amount=0;
	var tax=0;
	var total=0;
	var total_quantity=0;
	
	
	$("[id^='save_form180']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		
		if(!isNaN(parseFloat(subform.elements[5].value)))
		{
			amount+=parseFloat(subform.elements[5].value);
			tax+=parseFloat(subform.elements[6].value);
			total+=parseFloat(subform.elements[7].value);
		}
		if(!isNaN(parseFloat(subform.elements[2].value)))			
			total_quantity+=parseFloat(subform.elements[2].value);		
	});
	
	var form=document.getElementById("form180_master");
	
	amount=my_round(amount,2);
	tax=my_round(tax,2);
	total=my_round(total,2);
		
	var total_row="<tr><td colspan='1' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
							"<td>Amount:<br>Tax: <br>Total: </td>" +
							"<td>Rs. "+amount+"<br>" +
							"Rs. "+tax+"<br> " +
							"Rs. "+total+"</td>" +
							"<td></td>" +
							"</tr>";
					
	$('#form180_foot').html(total_row);
}

	</script>
</div>