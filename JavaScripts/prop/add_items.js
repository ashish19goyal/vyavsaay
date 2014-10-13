/**
 * @form Update Inventory
 * @formNo 1
 */
function form1_add_item()
{
	if(is_create_access('form1'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form1_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form1_"+id+"' value=''>";
				rowsHTML+="<img class='add_icon' value='Add new product' onclick='modal14_action();'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form1_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form1_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form1_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form1_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form1_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form1_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form1_"+id+"' value='new' onclick='form1_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form1_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form1_"+id);
		var names_filter=fields.elements[0];
		var batches_filter=fields.elements[1];
		var expiry_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var quantity_filter=fields.elements[4];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form1_create_item(fields);
		});
				
		$(names_filter).on('focus',function(event)
		{
			var products_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
	
			set_my_value_list(products_data,names_filter);
		});
		
		$(names_filter).focus();
		
		$(expiry_filter).datepicker();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create Pamphlets
 * @formNo 2
 */
function form2_add_item()
{
	if(is_create_access('form2'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form2_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form2_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form2_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' readonly='readonly' form='form2_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form2_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form2_"+id+"' id='save_form2_"+id+"' value='new'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form2_"+id+"' id='delete_form2_"+id+"' value='new' onclick='form2_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form2_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form2_"+id);
		var names_filter=fields.elements[0];
		var offer_filter=fields.elements[1];
		var offer_details=fields.elements[2];
		var save_button=fields.elements[4];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form2_create_item(fields);
		});
					
		
		$(names_filter).focus();
		
		var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
		set_my_value_list(products_data,names_filter);
		
		$(names_filter).on('blur',function(event)
		{
			var offer_data="<offers>" +
				"<offer_name></offer_name>" +
				"<product_name>"+names_filter.value+"</product_name>" +
				"<status>active</status>" +
				"</offers>";
				
			set_my_value_list(offer_data,offer_filter);
		});
		
		$(offer_filter).on('blur',function(event)
		{
			var offer_detail_data="<offers>" +
				"<offer_detail></offer_detail>" +
				"<offer_name>"+offer_filter.value+"</offer_name>" +
				"</offers>";
			
			set_my_value(offer_detail_data,offer_details);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Manage Assets
 * @formNo 5
 */
function form5_add_item()
{
	if(is_create_access('form5'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form5_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form5_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form5_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form5_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form5_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' readonly='readonly' form='form5_"+id+"' value=''>";
				rowsHTML+="<img class='edit_icon' form='form5_"+id+"' value='new' onclick='modal9_action($(this));'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='textarea' readonly='readonly' form='form5_"+id+"' value=''>";
				rowsHTML+="<img class='edit_icon' form='form5_"+id+"' value='new' onclick='modal10_action($(this));'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form5_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form5_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form5_"+id+"' value='new' onclick='form5_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form5_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form5_"+id);
		var task_filter=fields.elements[0];
		var date_filter=fields.elements[1];
		var owner_filter=fields.elements[2];
		var type_filter=fields.elements[3];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form5_create_item(fields);
		});
				
		
		$(task_filter).focus();
		
		var staff_data="<staff>" +
				"<acc_name></acc_name>" +
				"<status>active</status>" +
				"</staff>";
		set_my_value_list(staff_data,owner_filter);
		
		$(date_filter).datepicker();
		$(date_filter).val(get_my_date());
		
		set_static_value_list('assets','type',type_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Staff
 * @formNo 8
 */
function form8_add_item()
{
	if(is_create_access('form8'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form8_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form8_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form8_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form8_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form8_"+id+"' value=''>";
				rowsHTML+="<img class='edit_icon' form='form8_"+id+"' onclick=\"modal16_action($(this),'staff',"+get_new_key()+");\">";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form8_"+id+"' value=''>";
				rowsHTML+="<img class='edit_icon' form='form8_"+id+"' onclick='modal17_action($(this);'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form8_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form8_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form8_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form8_"+id+"' value='new' onclick='form8_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form8_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form8_"+id);
		var name_filter=fields.elements[0];
		var status_filter=fields.elements[5];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form8_create_item(fields);
		});
		
		$(name_filter).focus();
		set_static_value_list('staff','status',status_filter);
		status_filter.value="active";
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}

/**
 * @form Cash Register
 * @formNo 9
 */
function form9_add_item()
{
	if(is_create_access('form9'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form9_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form9_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form9_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form9_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form9_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form9_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form9_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form9_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form9_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form9_"+id+"' value='new' onclick='form9_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form9_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form9_"+id);
		var type_filter=fields.elements[0];
		var date_filter=fields.elements[1];
		var from_filter=fields.elements[2];
		var to_filter=fields.elements[3];
		var system_filter=fields.elements[5];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form9_create_item(fields);
		});
				
		
		$(type_filter).focus();
	
		var accounts_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
		
		set_static_value_list("transactions",'type',type_filter);
		set_static_value_list("transactions",'system_generated',system_filter);
		
		set_my_value_list(accounts_data,from_filter);
		set_my_value_list(accounts_data,to_filter);
		
		$(date_filter).datepicker();
		$(date_filter).val(get_my_date());
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}


/**
 * @form Create Service Receipt
 * @formNo 10
 */
function form10_add_item()
{
	if(is_create_access('form10'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form10_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form10_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form10_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form10_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form10_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form10_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form10_"+id+"' id='save_form10_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form10_"+id+"' id='delete_form10_"+id+"' value='new' onclick='form10_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form10_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form10_"+id);
		var service_filter=fields.elements[0];
		var assignee_filter=fields.elements[4];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form10_create_item(fields);
		});
				
		
		$(service_filter).focus();
	
		var service_data="<services>" +
				"<name></name>" +
				"</services>";
		
		var assignee_data="<staff>" +
				"<acc_name></acc_name>" +
				"<status>active</status>" +
				"</staff>";
		
		set_my_value_list(service_data,service_filter);
		set_my_value_list(assignee_data,assignee_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}

/**
 * @form Schedule Payments
 * @formNo 11
 */
function form11_add_item()
{
	if(is_create_access('form11'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form11_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form11_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form11_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form11_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form11_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form11_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form11_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form11_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form11_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form11_"+id+"' value='new' onclick='form11_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form11_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form11_"+id);
		var trans_filter=fields.elements[0];
		var account_filter=fields.elements[1];
		var amount_filter=fields.elements[2];
		var due_filter=fields.elements[3];
		var status_filter=fields.elements[4];
		var date_filter=fields.elements[5];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form11_create_item(fields);
		});
		
		
		$(trans_filter).focus();
		$(due_filter).datepicker();
		$(date_filter).datepicker();
		$(date_filter).val(get_my_date());
		
		set_static_value_list('payments','status',status_filter);
		
		var trans_data="<transactions>" +
				"<id></id>" +
				"</transactions>";
		
		set_my_value_list(trans_data,trans_filter);
		
		$(trans_filter).on('blur',function(event)
		{
			var account_data="<transactions>" +
				"<acc_name></acc_name>" +
				"<id>"+trans_filter.value+"</id>" +
				"</transactions>";
			
			set_my_value_list(account_data,account_filter);
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form New Bill
 * @formNo 12
 */
function form12_add_item()
{
	if(is_create_access('form12'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form12_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form12_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form12_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form12_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' form='form12_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form12_"+id+"' value=''>";
				rowsHTML+="<img class='filter_icon' src='./images/details.jpeg' form='form12_"+id+"' value='Details' onclick='modal7_action($(this));'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form12_"+id+"' id='save_form12_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form12_"+id+"' id='delete_form12_"+id+"' value='new' onclick='form12_delete_item($(this));'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form12_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form12_"+id);
		var name_filter=fields.elements[0];
		var batch_filter=fields.elements[1];
		var price_filter=fields.elements[2];
		var quantity_filter=fields.elements[3];
		var total_filter=fields.elements[4];
		var amount_filter=fields.elements[5];
		var discount_filter=fields.elements[6];
		var tax_filter=fields.elements[7];
		var offer_filter=fields.elements[8];
		var id_filter=fields.elements[9];
		var save_button=fields.elements[10];
		var free_product_filter=fields.elements[12];
		var free_product_quantity=fields.elements[13];
			
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			console.log("form submit action");
			form12_save_item(fields);
		});
		
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		
		set_my_value_list(product_data,name_filter);
		
		//$(name_filter).focus();
		
		$(name_filter).on('blur',function(event){
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
			batch_filter.value="";
			quantity_filter.value=0;
			price_filter.value=0;
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			offer_filter.value="";
		});
		
		$(batch_filter).on('blur',function(event){
			var price_data="<product_instances>" +
					"<price></price>" +
					"<batch>"+batch_filter.value+"</batch>" +
					"<product_name>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value(price_data,price_filter);
			
			var max_data="<product_instances>" +
					"<quantity></quantity>" +
					"<batch>"+batch_filter.value+"</batch>" +
					"<product_name>"+name_filter.value+"</product_name>" +
					"</product_instances>";
					
			set_my_max_value(max_data,quantity_filter);
			
			quantity_filter.value=0;
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			offer_filter.value="";
		});
		
		$(quantity_filter).on('blur',function(event)
		{
			var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			amount_filter.value=amount;
			var offer_data="<offers>" +
					"<offer_type>product</offer_type>" +
					"<product_name>"+name_filter.value+"</product_name>" +
					"<batch>"+batch_filter.value+"</batch>" +
					"<criteria_type></criteria_type>" +
					"<criteria_amount></criteria_amount>" +
					"<criteria_quantity></criteria_quantity>" +
					"<result_type></result_type>" +
					"<discount_percent></discount_percent>" +
					"<discount_amount></discount_amount>" +
					"<quantity_add_percent></quantity_add_percent>" +
					"<quantity_add_amount></quantity_add_amount>" +
					"<free_product_name></free_product_name>" +
					"<free_product_quantity></free_product_quantity>" +
					"<offer_detail></offer_detail>" +
					"<status array='yes'>active--extended</status>" +
					"</offers>";
			fetch_requested_data('',offer_data,function(offers)
			{
				offers.forEach(function(offer)
				{
					offer_filter.value=offer.offer_detail;
					if(offer.criteria_type=='min quantity crossed' && parseFloat(offer.criteria_quantity)<=parseFloat(quantity_filter.value))
					{
						if(offer.result_type=='discount')
						{
							if(offer.discount_percent!="" && offer.discount_percent!=0 && offer.discount_percent!="0")
							{
								discount_filter.value=parseFloat((amount*parseInt(offer.discount_percent))/100);
							}
							else 
							{
								discount_filter.value=parseFloat(offer.discount_amount)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offer.criteria_quantity)));
							}
						}
						else if(offer.result_type=='quantity addition')
						{
							if(offer.quantity_add_percent!="" && offer.quantity_add_percent!=0 && offer.quantity_add_percent!="0")
							{
								quantity_filter.value=parseFloat(quantity_filter.value)*(1+(parseFloat(offer.discount_percent)/100));
							}
							else 
							{
								quantity_filter.value=parseFloat(quantity_filter.value)+(parseFloat(offer.quantity_add_amount)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offer.criteria_quantity))));
							}
						}
						else if(offer.result_type=='product free')
						{
							free_product_filter.value=offer.free_product_name;
							free_product_quantity.value=parseFloat(offer.free_product_quantity)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offer.criteria_quantity)));
						}
					}
					else if(offer.criteria_type=='min amount crossed' && offer.criteria_amount<=amount)
					{
						if(offer.result_type=='discount')
						{
							if(offer.discount_percent!="" && offer.discount_percent!=0 && offer.discount_percent!="0")
							{
								discount_filter.value=parseFloat((amount*parseInt(offer.discount_percent))/100);
							}
							else 
							{
								discount_filter.value=parseFloat(offer.discount_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offer.criteria_amount)));
							}
						}
						else if(offer.result_type=='quantity addition')
						{
							if(offer.quantity_add_percent!="" && offer.quantity_add_percent!=0 && offer.quantity_add_percent!="0")
							{
								quantity_filter.value=parseFloat(quantity_filter.value)*(1+(parseFloat(offer.discount_percent)/100));
							}
							else 
							{
								quantity_filter.value=parseFloat(quantity_filter.value)+(parseFloat(offer.quantity_add_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offer.criteria_amount))));
							}
						}
						else if(offer.result_type=='product free')
						{
							free_product_filter.value=offer.free_product_name;
							free_product_quantity.value=parseFloat(offer.free_product_quantity)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offer.criteria_amount)));
						}
					}
				});
				
				var tax_data="<product_master>" +
						"<name>"+name_filter.value+"</name>" +
						"<taxable>yes</taxable>" +
						"<tax></tax>" +
						"</product_master>";
				fetch_requested_data('',tax_data,function(taxes)
				{
					taxes.forEach(function(tax)
					{
						tax_filter.value=parseFloat((parseFloat(tax.tax)*(amount-parseFloat(discount_filter.value)))/100);
					});
					
					total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);
				});
				
			});
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Manage Tasks
 * @formNo 14
 */
function form14_add_item()
{
	if(is_create_access('form14'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form14_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form14_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form14_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form14_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form14_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form14_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form14_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form14_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form14_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form14_"+id+"' value='new' onclick='form14_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form14_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form14_"+id);
		var name_filter=fields.elements[0];
		var desc_filter=fields.elements[1];
		var assignee_filter=fields.elements[2];
		var due_filter=fields.elements[3];
		var status_filter=fields.elements[5];
		var exec_filter=fields.elements[4];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form14_create_item(fields);
		});
				
		
		$(name_filter).focus();
	
		var tasks_data="<task_type>" +
				"<name></name>" +
				"</task_type>";
		set_my_value_list(tasks_data,name_filter);
		
		$(name_filter).on('blur',function(event)
		{
			var desc_data="<task_type>" +
				"<description></description>" +
				"<name>"+name_filter.value+"</name>" +
				"</task_type>";
			set_my_value_list(desc_data,desc_filter);
		});
		
		var staff_data="<staff>" +
				"<acc_name></acc_name>" +
				"</staff>";
		set_my_value_list(staff_data,assignee_filter);
		
		set_static_value_list('task_instances','status',status_filter);
		$(due_filter).datepicker();
		$(due_filter).val(get_my_date());
		$(exec_filter).datepicker();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * this function adds a new row to the accept returns form
 * @form Accept Returns
 * @formNo 15
 */
function form15_add_item()
{
	if(is_create_access('form15'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form15_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form15_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form15_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form15_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form15_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' readonly='readonly' form='form15_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form15_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form15_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form15_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form15_"+id+"' value='new' onclick='form15_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form15_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form15_"+id);
		var customer_filter=fields.elements[0];
		var bill_filter=fields.elements[1];
		var product_filter=fields.elements[2];
		var batch_filter=fields.elements[3];
		var amount_filter=fields.elements[4];
		var quantity_fitler=fields.elements[5];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form15_create_item(fields);
		});
				
		$(customer_filter).focus();
		
		var customers_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
		set_my_value_list(customers_data,customer_filter);
		
		$(customer_filter).on('blur',function(event)
		{
			var bill_data="<bills>" +
				"<id></id>" +
				"<customer_name>"+customer_filter.value+"</customer_name>" +
				"</bills>";
			set_my_value_list(bill_data,bill_filter);
		});
		
		$(bill_filter).on('blur',function(event)
		{
			var product_data="<bill_items>" +
				"<product_name></product_name>" +
				"<bill_id>"+bill_filter.value+"</bill_id>" +
				"</bill_items>";
			set_my_value_list(product_data,product_filter);
		});
				
		$(product_filter).on('blur',function(event)
		{
			var batch_data="<bill_items>" +
				"<batch></batch>" +
				"<product_name>"+product_filter.value+"</product_name>" +
				"<bill_id>"+bill_filter.value+"</bill_id>" +
				"</bill_items>";
			set_my_value_list(batch_data,batch_filter);
		});
		
		$(batch_filter).on('blur',function(event)
		{
			var amount_data="<bill_items>" +
				"<price></price>" +
				"<batch>"+batch_filter.value+"</batch>" +
				"<product_name>"+product_filter.value+"</product_name>" +
				"<bill_id>"+bill_filter.value+"</bill_id>" +
				"</bill_items>";
			set_my_value_list(amount_data,amount_filter);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
};

/**
 * @form Manage Returns
 * @formNo 19
 */
function form19_add_item()
{
	if(is_create_access('form19'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form19_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form19_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form19_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form19_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form19_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form19_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form19_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form19_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form19_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form19_"+id+"' value='new' onclick='form19_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form19_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form19_"+id);
		var product_filter=fields.elements[0];
		var batch_filter=fields.elements[1];
		var bill_filter=fields.elements[2];
		var supplier_filter=fields.elements[3];
		var reason_filter=fields.elements[4];
		var quantity_filter=fields.elements[5];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form19_create_item(fields);
		});
				
		$(product_filter).focus();
	
		var products_data="<goods_received>" +
			"<product_name></product_name>" +
			"</goods_received>";
		set_my_value_list(products_data,product_filter);
		
		$(product_filter).on('blur',function(event)
		{
			var batch_data="<goods_received>" +
				"<batch></batch>" +
				"<product_name>"+product_filter.value+"</product_name>" +
				"</goods_received>";
			set_my_value_list(batch_data,batch_filter);
		});
		
		$(batch_filter).on('blur',function(event)
		{
			var bill_data="<goods_received>" +
				"<sup_bill_id></sup_bill_id>" +
				"<batch>"+batch_filter.value+"</batch>" +
				"<product_name>"+product_filter.value+"</product_name>" +
				"</goods_received>";
			set_my_value_list(bill_data,bill_filter);
		});
		
		$(bill_filter).on('blur',function(event)
		{
			var supplier_data="<supplier_bills>" +
				"<supplier_name></supplier_name>" +
				"<bill_id>"+bill_filter.value+"</bill_id>" +
				"</supplier_bills>";
			set_my_value_list(supplier_data,supplier_filter);
		});
			
		set_static_value_list('supplier_returns','reason',reason_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Goods Received
 * @formNo 21
 */
function form21_add_item()
{
	if(is_create_access('form21'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form21_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form21_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form21_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form21_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form21_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form21_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form21_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form21_"+id+"' id='save_form21_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form21_"+id+"' id='delete_form21_"+id+"' value='new' onclick='form21_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form21_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form21_"+id);
		var product_filter=fields.elements[0];
		var batch_filter=fields.elements[1];
		var expiry_filter=fields.elements[2];
		var cost_filter=fields.elements[3];
		var quantity_filter=fields.elements[4];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form21_create_item(fields);
		});
				
		$(product_filter).focus();
	
		var products_data="<product_master>" +
				"<product_name></product_name>" +
				"<product_master>";
		set_my_value_list(products_data,product_filter);
		
		$(expiry_filter).datepicker();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Dispose Items
 * @formNo 22
 */
function form22_add_item()
{
	if(is_create_access('form22'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form22_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form22_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form22_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form2_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form22_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form15_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form22_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form22_"+id+"' value='new' onclick='form22_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form22_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form22_"+id);
		var product_filter=fields.elements[0];
		var batch_filter=fields.elements[1];
		var method_filter=fields.elements[2];
		var date_filter=fields.elements[4];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form22_create_item(fields);
		});
				
		$(product_filter).focus();
	
		var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
		set_my_value_list(products_data,product_filter);
		
		$(product_filter).on('blur',function(event)
		{
			var batch_data="<product_instances>" +
				"<batch></batch>" +
				"<name>"+product_filter.value+"</name>" +
				"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
		});
		
		set_static_value_list('disposals','method',method_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}


/**
 * @form Create Purchase Orders
 * @formNo 24
 */
function form24_add_item()
{
	if(is_create_access('form24'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form24_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form24_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form24_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form24_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form24_"+id+"' id='save_form24_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form24_"+id+"' id='delete_form24_"+id+"' value='new' onclick='form24_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form24_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form24_"+id);
		var name_filter=fields.elements[0];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form24_create_item(fields);
		});
				
		
		$(name_filter).focus();
	
		var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
		set_my_value_list(products_data,name_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Manage Customers
 * @formNo 30
 */
function form30_add_item()
{
	if(is_create_access('form30'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form30_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form30_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form30_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form30_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form30_"+id+"' value=''>";
				rowsHTML+="<img class='edit_icon' form='form30_"+id+"' onclick=\"modal16_action($(this),'customer','"+get_new_key()+"')\">";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form30_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form30_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form30_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form30_"+id+"' value='new' onclick='form30_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form30_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form30_"+id);
		var name_filter=fields.elements[0];
		var status_filter=fields.elements[4];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form30_create_item(fields);
		});
				
		$(name_filter).focus();
	
		set_static_value_list('customers','status',status_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Offers
 * @formNo 35
 */
function form35_add_item()
{
	if(is_create_access('form35'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form35_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form35_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form35_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form35_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' readonly='readonly' form='form35_"+id+"' value=''>";
				rowsHTML+="<img class='edit_icon' form='form35_"+id+"' onclick='modal8_action($(this))'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form35_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form35_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form35_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form35_"+id+"' value='new' onclick='form35_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form35_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form35_"+id);
		var name_filter=fields.elements[0];
		var type_filter=fields.elements[1];
		var date_filter=fields.elements[2];
		var status_filter=fields.elements[4];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form35_create_item(fields);
		});
				
		$(name_filter).focus();
		$(date_filter).datepicker();
		set_static_value_list('offers','status',status_filter);
		set_static_value_list('offers','offer_type',type_filter);
		status_filter.value='active';
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Store Placement
 * @formNo 38
 */
function form38_add_item()
{
	if(is_create_access('form38'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form38_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form38_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form38_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form38_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form38_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form38_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form38_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form38_"+id+"' value='new' onclick='form38_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form38_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form38_"+id);
		var product_filter=fields.elements[0];
		var batch_filter=fields.elements[1];
		var area_filter=fields.elements[2];
		var quantity_filter=fields.elements[3];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form38_create_item(fields);
		});		
		
		$(product_filter).focus();
	
		var products_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(products_data,product_filter);
		
		$(product_filter).on('blur',function(event){
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
		});
		
		var area_data="<store_areas>" +
				"<name></name>" +
				"<area_type>storage</area_type>" +
				"</store_areas>";
		
		set_my_value_list(area_data,area_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Manage Vendors
 * @formNo 40
 */
function form40_add_item()
{
	if(is_create_access('form40'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form40_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form40_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form40_"+id+"' value=''>";		
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form40_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form40_"+id+"' value=''>";
				rowsHTML+="<img class='edit_icon' form='form40_"+id+"' onclick=\"modal16_action($(this),'supplier','"+get_new_key()+"');\">";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form40_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form40_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form40_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form40_"+id+"' value='new' onclick='form40_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form40_body').prepend(rowsHTML);
		var fields=document.getElementById("form40_"+id);
		var name_filter=fields.elements[0];
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form40_create_item(fields);
		});
				
		$(name_filter).focus();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Expense Register
 * @formNo 56
 */
function form56_add_item()
{
	if(is_create_access('form56'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form56_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form56_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form56_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form56_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form56_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form56_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form56_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form56_"+id+"' value='new' onclick='form56_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form56_body').prepend(rowsHTML);
		var fields=document.getElementById("form56_"+id);
		var date_filter=fields.elements[0];
		var account_filter=fields.elements[1];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form56_create_item(fields);
		});
				
		var account_data="<accounts>" +
				"<acc_name></acc_name>" +
				"</accounts>";
		set_my_value_list(type_data,account_filter);
		
		$(date_filter).datepicker();
		$(date_filter).val(get_my_date());
		$(date_filter).focus();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Service pre-requisites
 * @formNo 58
 */
function form58_add_item()
{
	if(is_create_access('form58'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form58_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form58_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form58_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form58_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' form='form58_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form58_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form58_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form58_"+id+"' value='new' onclick='form58_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form58_body').prepend(rowsHTML);
		var fields=document.getElementById("form58_"+id);
		var service_filter=fields.elements[0];
		var type_filter=fields.elements[1];
		var requisite_filter=fields.elements[2];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form58_create_item(fields);
		});		
		
		var service_data="<services>" +
				"<name></name>" +
				"</services>";
		set_my_value_list(service_data,service_filter);
		set_static_value_list('pre_requisites','requisite_type',type_filter);
		
		$(type_filter).on('blur',function(event)
		{
			var requisite_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		
			if(type_filter.value=='service')
			{
				var requisite_data="<services>" +
					"<name></name>" +
					"</services>";
			}
			else if(type_filter.value=='task')
			{
				var requisite_data="<task_type>" +
					"<name></name>" +
					"</task_type>";
			}
			else if(type_filter.value=='asset')
			{
				var requisite_data="<assets>" +
					"<name></name>" +
					"</assets>";
			}
			set_my_value_list(requisite_data,requisite_filter);
		});
		
		$(service_filter).focus();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Manage product pre-requisites
 * @formNo 59
 */
function form59_add_item()
{
	if(is_create_access('form59'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form59_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form59_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form59_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form59_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form59_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form59_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form59_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form59_"+id+"' value='new' onclick='form59_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form59_body').prepend(rowsHTML);
		var fields=document.getElementById("form59_"+id);
		var product_filter=fields.elements[0];
		var type_filter=fields.elements[1];
		var requisite_filter=fields.elements[2];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form59_create_item(fields);
		});
				
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,product_filter);
		set_static_value_list('pre_requisites','requisite_type',type_filter);
		
		$(type_filter).on('blur',function(event)
		{
			var requisite_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		
			if(type_filter.value=='service')
			{
				var requisite_data="<services>" +
					"<name></name>" +
					"</services>";
			}
			else if(type_filter.value=='task')
			{
				var requisite_data="<task_type>" +
					"<name></name>" +
					"</task_type>";
			}
			set_my_value_list(requisite_data,requisite_filter);
		});
		
		$(product_filter).focus();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Product Categories
 * @formNo 60
 */
function form60_add_item()
{
	if(is_create_access('form60'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form60_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form60_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form60_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form60_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form60_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form60_"+id+"' value='new' onclick='form60_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form60_body').prepend(rowsHTML);
		var fields=document.getElementById("form60_"+id);
		var product_filter=fields.elements[0];
		var category_filter=fields.elements[1];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form60_create_item(fields);
		});
				
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,product_filter);
		
		var category_data="<categories>" +
				"<category></category>" +
				"</categories>";
		set_my_filter(category_data,category_filter);

		$(product_filter).focus();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Service Categories
 * @formNo 61
 */
function form61_add_item()
{
	if(is_create_access('form61'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form61_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form61_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form61_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form61_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form61_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form61_"+id+"' value='new' onclick='form61_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form61_body').prepend(rowsHTML);
		var fields=document.getElementById("form61_"+id);
		var service_filter=fields.elements[0];
		var category_filter=fields.elements[1];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form61_create_item(fields);
		});
				
		var service_data="<services>" +
				"<name></name>" +
				"</services>";
		set_my_value_list(service_data,service_filter);
		
		var category_data="<categories>" +
				"<category></category>" +
				"</categories>";
		set_my_filter(category_data,category_filter);

		$(service_filter).focus();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Product reviews
 * @formNo 62
 */
function form62_add_item()
{
	if(is_create_access('form62'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form62_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form62_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form62_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form62_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' form='form62_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form62_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form62_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form62_"+id+"' value='new' onclick='form62_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form62_body').prepend(rowsHTML);
		var fields=document.getElementById("form62_"+id);
		var product_filter=fields.elements[0];
		var reviewer_filter=fields.elements[1];
		var rating_filter=fields.elements[1];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form62_create_item(fields);
		});
				
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,product_filter);
		
		var reviewer_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";
		set_my_filter(reviewer_data,reviewer_filter);
		
		$(product_filter).focus();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Service reviews
 * @formNo 63
 */
function form63_add_item()
{
	if(is_create_access('form63'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form63_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form63_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form63_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form63_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' form='form63_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form63_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form63_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form63_"+id+"' value='new' onclick='form63_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form63_body').prepend(rowsHTML);
		var fields=document.getElementById("form63_"+id);
		var service_filter=fields.elements[0];
		var reviewer_filter=fields.elements[1];
		var rating_filter=fields.elements[1];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form63_create_item(fields);
		});
				
		var service_data="<services>" +
				"<name></name>" +
				"</services>";
		set_my_value_list(service_data,service_filter);
		
		var reviewer_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";
		set_my_filter(reviewer_data,reviewer_filter);
		
		$(service_filter).focus();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Service Cross sells
 * @formNo 64
 */
function form64_add_item()
{
	if(is_create_access('form64'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form64_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form64_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form64_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form64_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form64_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form64_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form64_"+id+"' value='new' onclick='form64_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form64_body').prepend(rowsHTML);
		var fields=document.getElementById("form64_"+id);
		var service_filter=fields.elements[0];
		var type_filter=fields.elements[1];
		var cross_filter=fields.elements[2];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form64_create_item(fields);
		});
				
		var service_data="<services>" +
				"<name></name>" +
				"</services>";
		set_my_value_list(service_data,service_filter);
		set_static_value_list('cross_sells','type',type_filter);
		
		$(type_filter).on('blur',function(event)
		{
			var cross_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		
			if(type_filter.value=='service')
			{
				var cross_data="<services>" +
					"<name></name>" +
					"</services>";
			}
			set_my_value_list(cross_data,cross_filter);
		});
		
		$(service_filter).focus();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Cross sells
 * @formNo 66
 */
function form66_add_item()
{
	if(is_create_access('form66'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form66_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form66_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form66_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form66_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form66_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form66_"+id+"' value='new'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form66_"+id+"' value='new' onclick='form66_delete_item($(this));'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form66_body').prepend(rowsHTML);
		var fields=document.getElementById("form66_"+id);
		var product_filter=fields.elements[0];
		var type_filter=fields.elements[1];
		var cross_filter=fields.elements[2];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form66_create_item(fields);
		});
				
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,product_filter);
		set_static_value_list('cross_sells','type',type_filter);
		
		$(type_filter).on('blur',function(event)
		{
			var cross_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		
			if(type_filter.value=='service')
			{
				var cross_data="<services>" +
					"<name></name>" +
					"</services>";
			}
			set_my_value_list(cross_data,cross_filter);
		});
		
		$(product_filter).focus();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}
