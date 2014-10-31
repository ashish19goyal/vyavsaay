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
				rowsHTML+="<input type='submit' class='save_icon' form='form2_"+id+"' id='save_form2_"+id+"' >";	
				rowsHTML+="<input type='button' class='delete_icon' form='form2_"+id+"' id='delete_form2_"+id+"' onclick='$(this).parent().parent().remove();'>";	
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
				rowsHTML+="<input type='submit' class='save_icon' form='form9_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form9_"+id+"' onclick='$(this).parent().parent().remove();'>";	
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
 * @form Create Service Bill
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
				rowsHTML+="<input type='text' required form='form10_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form10_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<textarea required form='form10_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' required form='form10_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form10_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form10_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form10_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form10_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form10_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form10_"+id+"' id='save_form10_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form10_"+id+"' id='delete_form10_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form10_"+id+"'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form10_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form10_"+id);
		var name_filter=fields.elements[0];
		var staff_filter=fields.elements[1];
		var notes_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var total_filter=fields.elements[4];
		var amount_filter=fields.elements[5];
		var discount_filter=fields.elements[6];
		var tax_filter=fields.elements[7];
		var offer_filter=fields.elements[8];
		var id_filter=fields.elements[9];
		var free_service_filter=fields.elements[12];
		
		$(name_filter).focus();
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form10_create_item(fields);
		});
		
		var service_data="<services>" +
				"<name></name>" +
				"</services>";
		set_my_value_list(service_data,name_filter);
		
		var staff_data="<staff>" +
				"<acc_name></acc_name>" +
				"<status>active</status>" +
				"</staff>";
		set_my_value_list(staff_data,staff_filter);
		
		$(name_filter).on('blur',function(event){
			notes_filter.value="";
			price_filter.value=0;
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			offer_filter.value="";
			free_service_filter.value="";
			
			var price_data="<services>" +
					"<price></price>" +
					"<tax></tax>" +
					"<name>"+name_filter.value+"</name>" +
					"</services>";
			
			fetch_requested_data('',price_data,function(prices)
			{
				for(var a in prices)
				{
					price_filter.value=prices[a].price;
					var amount=parseFloat(prices[a].price);
					amount_filter.value=amount;
					var offer_data="<offers>" +
							"<offer_type>service</offer_type>" +
							"<service>"+name_filter.value+"</service>" +
							"<criteria_type>min amount crossed</criteria_type>" +
							"<criteria_amount compare='less than'>"+amount+"</criteria_amount>" +
							"<result_type></result_type>" +
							"<discount_percent></discount_percent>" +
							"<discount_amount></discount_amount>" +
							"<offer_detail></offer_detail>" +
							"<free_service_name></free_service_name>" +
							"<status array='yes'>active--extended</status>" +
							"</offers>";
					fetch_requested_data('',offer_data,function(offers)
					{
						////sorting offers based on criteria amount and criteria quantity
						offers.sort(function(a,b)
						{
							if(a.criteria_amount<b.criteria_amount)
							{	return 1;}
							else 
							{	return -1;}
						});
								
						for(var i in offers)
						{
							offer_filter.value=offers[i].offer_detail;	
							if(offers[i].result_type=='discount')
							{
								if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
								{
									discount_filter.value=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
								}
								else 
								{
									discount_filter.value=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount)));
								}
							}
							else if(offers[i].result_type=='service free')
							{
								free_service_filter.value=offers[i].free_service_name;
							}		
							break;
						}
					});

					tax_filter.value=parseFloat((parseFloat(prices[a].tax)*(amount-parseFloat(discount_filter.value)))/100);
					break;
				}
				total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);
			});					
		});
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
				rowsHTML+="<input type='submit' class='save_icon' form='form11_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form11_"+id+"' onclick='$(this).parent().parent().remove();'>";	
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
				rowsHTML+="<input type='text' required form='form12_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' required form='form12_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' required form='form12_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' required form='form12_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' required form='form12_"+id+"' step='any'>";
				rowsHTML+="<img class='filter_icon' src='./images/details.jpeg' form='form12_"+id+"' value='Details' onclick='modal6_action($(this));'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form12_"+id+"' id='save_form12_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form12_"+id+"' id='delete_form12_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form12_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form12_"+id);
		var name_filter=fields.elements[0];
		var batch_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var total_filter=fields.elements[4];
		var amount_filter=fields.elements[5];
		var discount_filter=fields.elements[6];
		var tax_filter=fields.elements[7];
		var offer_filter=fields.elements[8];
		var id_filter=fields.elements[9];
		var free_product_filter=fields.elements[12];
		var free_product_quantity=fields.elements[13];
		
		$(name_filter).focus();
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form12_create_item(fields);
		});
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter);
		
		
		$(name_filter).on('blur',function(event){
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name>"+name_filter.value+"</product_name>" +
					"<quantity compare='more than'>0</quantity>" +
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
			free_product_filter.value="";
			free_product_quantity.value="";
		});
		
		$(batch_filter).on('blur',function(event){
			var price_data="<product_instances>" +
					"<sale_price></sale_price>" +
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
			free_product_filter.value="";
			free_product_quantity.value="";
		});
		
		$(quantity_filter).on('blur',function(event)
		{
			var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			amount_filter.value=amount;
			var offer_data="<offers>" +
					"<offer_type>product</offer_type>" +
					"<product_name>"+name_filter.value+"</product_name>" +
					"<batch array='yes'>"+batch_filter.value+"--all</batch>" +
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
				////sorting offers based on criteria amount and criteria quantity
				offers.sort(function(a,b)
				{
					if(a.criteria_amount<b.criteria_amount)
					{	return 1;}
					else if(a.criteria_quantity<b.criteria_quantity)
					{	return 1;}
					else 
					{	return -1;}
				});
						
				for(var i in offers)
				{
					offer_filter.value=offers[i].offer_detail;
					if(offers[i].criteria_type=='min quantity crossed' && parseFloat(offers[i].criteria_quantity)<=parseFloat(quantity_filter.value))
					{
						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								discount_filter.value=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
							}
							else 
							{
								discount_filter.value=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offers[i].criteria_quantity)));
							}
						}
						else if(offers[i].result_type=='quantity addition')
						{
							if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
							{
								quantity_filter.value=parseFloat(quantity_filter.value)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
							}
							else 
							{
								quantity_filter.value=parseFloat(quantity_filter.value)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offers[i].criteria_quantity))));
							}
						}
						else if(offers[i].result_type=='product free')
						{
							free_product_filter.value=offers[i].free_product_name;
							free_product_quantity.value=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offers[i].criteria_quantity)));
						}
						break;
					}
					else if(offers[i].criteria_type=='min amount crossed' && offers[i].criteria_amount<=amount)
					{
						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								discount_filter.value=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
							}
							else 
							{
								discount_filter.value=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount)));
							}
						}
						else if(offers[i].result_type=='quantity addition')
						{
							if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
							{
								quantity_filter.value=parseFloat(quantity_filter.value)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
							}
							else 
							{
								quantity_filter.value=parseFloat(quantity_filter.value)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount))));
							}
						}
						else if(offers[i].result_type=='product free')
						{
							free_product_filter.value=offers[i].free_product_name;
							free_product_quantity.value=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount)));
						}
						break;
					}
				}
				
				var tax_data="<product_master>" +
						"<name>"+name_filter.value+"</name>" +
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
				rowsHTML+="<input type='submit' class='save_icon' form='form14_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form14_"+id+"' onclick='$(this).parent().parent().remove();'>";	
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
				rowsHTML+="<input type='submit' class='save_icon' form='form15_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form15_"+id+"' onclick='$(this).parent().parent().remove();'>";	
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
				rowsHTML+="<input type='submit' class='save_icon' form='form19_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form19_"+id+"' onclick='$(this).parent().parent().remove();'>";	
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
 * @form New Supplier Bill
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
				rowsHTML+="<input type='text' required form='form21_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' step='any' required form='form21_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' required form='form21_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' required form='form21_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' required form='form21_"+id+"'>";
				rowsHTML+="<img class='add_icon' form='form21_"+id+"' title='Add new batch' onclick='modal22_action();'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form21_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form21_"+id+"' id='save_form21_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form21_"+id+"' id='delete_form21_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form21_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form21_"+id);
		var name_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var amount_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var batch_filter=fields.elements[4];
		var id_filter=fields.elements[5];
		
		$(name_filter).focus();
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form21_create_item(fields);
		});
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter);
		
		
		$(name_filter).on('blur',function(event){
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
			batch_filter.value="";
			quantity_filter.value=0;
			price_filter.value=0;
			amount_filter.value=0;
		});
		
		$(quantity_filter).on('blur',function(event)
		{
			var price=parseFloat(amount_filter.value)/parseFloat(quantity_filter.value);
			price_filter.value=price;
		});
		$(amount_filter).on('blur',function(event)
		{
			var price=parseFloat(amount_filter.value)/parseFloat(quantity_filter.value);
			price_filter.value=price;
		});
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
				rowsHTML+="<input type='submit' class='save_icon' form='form22_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form22_"+id+"' onclick='$(this).parent().parent().remove();'>";	
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
 * @form New Purchase Order
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
				rowsHTML+="<input type='text' required form='form24_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' required form='form24_"+id+"' value='' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form24_"+id+"' value='' readonly='readonly'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' required form='form24_"+id+"' value='' step='any' readonly='readonly'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form24_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form24_"+id+"' id='save_form24_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form24_"+id+"' id='delete_form24_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form24_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form24_"+id);
		var name_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var make_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var id_filter=fields.elements[4];
		
		$(name_filter).focus();
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form24_create_item(fields);
		});
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter);
				
		$(name_filter).on('blur',function(event)
		{
			var make_data="<product_master>" +
					"<make></make>" +
					"<name>"+name_filter.value+"</name>" +
					"</product_master>";
			set_my_value(make_data,make_filter);
			
			var price_data="<product_instances>" +
						"<cost_price></cost_price>" +
						"<product_name>"+name_filter.value+"</product_name>" +
						"</product_instances>";
			get_single_column_data(function(prices)
			{
				var min_value=Math.min.apply(null,prices);
				price_filter.value=min_value;
			},price_data);
			
			quantity_filter.value="";
		});
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
				rowsHTML+="<input type='submit' class='save_icon' form='form38_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form38_"+id+"' onclick='$(this).parent().parent().remove();'>";	
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
				rowsHTML+="<input type='submit' class='save_icon' form='form56_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form56_"+id+"' onclick='$(this).parent().parent().remove();'>";	
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
				rowsHTML+="<input type='submit' class='save_icon' form='form58_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form58_"+id+"' onclick='$(this).parent().parent().remove();'>";	
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
				rowsHTML+="<input type='submit' class='save_icon' form='form59_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form59_"+id+"' onclick='$(this).parent().parent().remove();'>";	
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
 * @form Product Attributes
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
				rowsHTML+="<input type='text' form='form60_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form60_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form60_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form60_"+id+"' onclick='$(this).parent().parent().remove();'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form60_body').prepend(rowsHTML);
		var fields=document.getElementById("form60_"+id);
		var product_filter=fields.elements[0];
		var attribute_filter=fields.elements[1];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form60_create_item(fields);
		});
				
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,product_filter);
		
		var attribute_data="<attributes>" +
				"<attribute></attribute>" +
				"<type>product</type>" +
				"</attributes>";
		set_my_filter(attribute_data,attribute_filter);

		$(product_filter).focus();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Service Attributes
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
				rowsHTML+="<input type='text' form='form61_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form61_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form61_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form61_"+id+"' onclick='$(this).parent().parent().remove();'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form61_body').prepend(rowsHTML);
		var fields=document.getElementById("form61_"+id);
		var service_filter=fields.elements[0];
		var attribute_filter=fields.elements[1];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form61_create_item(fields);
		});
				
		var service_data="<services>" +
				"<name></name>" +
				"</services>";
		set_my_value_list(service_data,service_filter);
		
		var category_data="<attributes>" +
				"<attribute></attribute>" +
				"<type>service</type>" +
				"</attributes>";
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
				rowsHTML+="<input type='submit' class='save_icon' form='form62_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form62_"+id+"' onclick='$(this).parent().parent().remove();'>";	
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
				rowsHTML+="<input type='submit' class='save_icon' form='form63_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form63_"+id+"' onclick='$(this).parent().parent().remove();'>";	
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
				rowsHTML+="<input type='submit' class='save_icon' form='form64_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form64_"+id+"' onclick='$(this).parent().parent().remove();'>";	
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
				rowsHTML+="<input type='submit' class='save_icon' form='form66_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form66_"+id+"' onclick='$(this).parent().parent().remove();'>";	
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

/**
 * @form New Sale Order
 * @formNo 69
 */
function form69_add_item()
{
	if(is_create_access('form69'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form69_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' required form='form69_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' required form='form69_"+id+"' value='' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<textarea form='form69_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form69_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form69_"+id+"' id='save_form69_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form69_"+id+"' id='delete_form69_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form69_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form69_"+id);
		var name_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var notes_filter=fields.elements[2];
		var id_filter=fields.elements[3];
		
		$(name_filter).focus();
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form69_create_item(fields);
		});
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		
		set_my_value_list(product_data,name_filter);
				
		$(name_filter).on('blur',function(event)
		{
			var quantity_data="<product_instances>" +
						"<quantity></quantity>" +
						"<product_name>"+name_filter.value+"</product_name>" +
						"</product_instances>";
			get_single_column_data(function(quantities)
			{
				var total_quantity=0;
				for(var k=0;k<quantities.length;k++)
				{
					total_quantity+=parseFloat(quantities[k]);
				}
				notes_filter.value=notes_filter.value+"\n Total availability: "+total_quantity;
			},quantity_data);
			
			var price_data="<product_instances>" +
						"<sale_price></sale_price>" +
						"<product_name>"+name_filter.value+"</product_name>" +
						"</product_instances>";
			get_single_column_data(function(prices)
			{
				var max_value=Math.max.apply(null,prices);
				var min_value=Math.min.apply(null,prices);
				notes_filter.value=notes_filter.value+"\n Minimum price: "+min_value+"\n Maximum price: "+max_value;
			},price_data);
			
			var offer_data="<offers>" +
					"<offer_detail></offer_detail>" +
					"<offer_type>product</offer_type>" +
					"<product_name>"+name_filter.value+"</product_name>" +
					"<status array='yes'>active--extended</status>" +
					"</offers>";
			get_single_column_data(function(offers)
			{
				for(var j=0;j<offers.length;j++)
				{
					notes_filter.value=notes_filter.value+"\n Offer("+(j+1)+"): "+offers[j];
				}
			},offer_data);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form New Bill
 * @formNo 72
 */
function form72_add_product()
{
	if(is_create_access('form72'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form72_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' required form='form72_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' required form='form72_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' required form='form72_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' required form='form72_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' required form='form72_"+id+"' step='any'>";
				rowsHTML+="<img class='filter_icon' src='./images/details.jpeg' form='form72_"+id+"' value='Details' onclick='modal6_action($(this));'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form72_"+id+"' id='save_form72_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form72_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form72_"+id);
		var name_filter=fields.elements[0];
		var batch_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var total_filter=fields.elements[4];
		var amount_filter=fields.elements[5];
		var discount_filter=fields.elements[6];
		var tax_filter=fields.elements[7];
		var offer_filter=fields.elements[8];
		var id_filter=fields.elements[9];
		var free_product_filter=fields.elements[12];
		var free_product_quantity=fields.elements[13];
		var free_service_filter=fields.elements[14];
		
		$(name_filter).focus();
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form72_create_item(fields);
		});
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter);
		
		$(name_filter).on('blur',function(event){
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name>"+name_filter.value+"</product_name>" +
					"<quantity compare='more than'>0</quantity>" +
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
			free_product_filter.value="";
			free_product_quantity.value="";
			free_service_filter.value="";
		});
		
		$(batch_filter).on('blur',function(event){
			var price_data="<product_instances>" +
					"<sale_price></sale_price>" +
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
			free_product_filter.value="";
			free_product_quantity.value="";
			free_service_filter.value="";
		});
		
		$(quantity_filter).on('blur',function(event)
		{
			var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			amount_filter.value=amount;
			var offer_data="<offers>" +
					"<offer_type>product</offer_type>" +
					"<product_name>"+name_filter.value+"</product_name>" +
					"<batch array='yes'>"+batch_filter.value+"--all</batch>" +
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
					"<free_service_name></free_service_name>" +
					"<offer_detail></offer_detail>" +
					"<status array='yes'>active--extended</status>" +
					"</offers>";
			fetch_requested_data('',offer_data,function(offers)
			{
				////sorting offers based on criteria amount and criteria quantity
				offers.sort(function(a,b)
				{
					if(a.criteria_amount<b.criteria_amount)
					{	return 1;}
					else if(a.criteria_quantity<b.criteria_quantity)
					{	return 1;}
					else 
					{	return -1;}
				});
						
				for(var i in offers)
				{
					offer_filter.value=offers[i].offer_detail;
					if(offers[i].criteria_type=='min quantity crossed' && parseFloat(offers[i].criteria_quantity)<=parseFloat(quantity_filter.value))
					{
						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								discount_filter.value=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
							}
							else 
							{
								discount_filter.value=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offers[i].criteria_quantity)));
							}
						}
						else if(offers[i].result_type=='quantity addition')
						{
							if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
							{
								quantity_filter.value=parseFloat(quantity_filter.value)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
							}
							else 
							{
								quantity_filter.value=parseFloat(quantity_filter.value)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offers[i].criteria_quantity))));
							}
						}
						else if(offers[i].result_type=='product free')
						{
							free_product_filter.value=offers[i].free_product_name;
							free_product_quantity.value=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offers[i].criteria_quantity)));
						}
						else if(offers[i].result_type=='service free')
						{
							free_service_filter.value=offers[i].free_service_name;
						}
						break;
					}
					else if(offers[i].criteria_type=='min amount crossed' && offers[i].criteria_amount<=amount)
					{
						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								discount_filter.value=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
							}
							else 
							{
								discount_filter.value=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount)));
							}
						}
						else if(offers[i].result_type=='quantity addition')
						{
							if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
							{
								quantity_filter.value=parseFloat(quantity_filter.value)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
							}
							else 
							{
								quantity_filter.value=parseFloat(quantity_filter.value)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount))));
							}
						}
						else if(offers[i].result_type=='product free')
						{
							free_product_filter.value=offers[i].free_product_name;
							free_product_quantity.value=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount)));
						}
						else if(offers[i].result_type=='service free')
						{
							free_service_filter.value=offers[i].free_service_name;
						}

						break;
					}
				}
				
				var tax_data="<product_master>" +
						"<name>"+name_filter.value+"</name>" +
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
 * @form Create Bill
 * @formNo 72
 */
function form72_add_service()
{
	if(is_create_access('form72'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form72_"+id+"'></form>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' required form='form72_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='text' form='form72_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<textarea form='form72_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' required form='form72_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='number' required form='form72_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form72_"+id+"' id='save_form72_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form72_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form72_"+id);
		var name_filter=fields.elements[0];
		var staff_filter=fields.elements[1];
		var notes_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var total_filter=fields.elements[4];
		var amount_filter=fields.elements[5];
		var discount_filter=fields.elements[6];
		var tax_filter=fields.elements[7];
		var offer_filter=fields.elements[8];
		var id_filter=fields.elements[9];
		var free_product_filter=fields.elements[12];
		var free_product_quantity=fields.elements[13];
		var free_service_filter=fields.elements[14];
		
		$(name_filter).focus();
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form72_create_item(fields);
		});
		
		var service_data="<services>" +
				"<name></name>" +
				"</services>";
		set_my_value_list(service_data,name_filter);
		
		var staff_data="<staff>" +
				"<acc_name></acc_name>" +
				"<status>active</status>" +
				"</staff>";
		set_my_value_list(staff_data,staff_filter);
		
		$(name_filter).on('blur',function(event){
			notes_filter.value="";
			price_filter.value=0;
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			offer_filter.value="";
			free_product_filter.value="";
			free_product_quantity.value="";
			free_service_filter.value="";
			
			var price_data="<services>" +
					"<price></price>" +
					"<tax></tax>" +
					"<name>"+name_filter.value+"</name>" +
					"</services>";
			
			fetch_requested_data('',price_data,function(prices)
			{
				for(var a in prices)
				{
					price_filter.value=prices[a].price;
					var amount=parseFloat(prices[a].price);
					amount_filter.value=amount;
					var offer_data="<offers>" +
							"<offer_type>service</offer_type>" +
							"<service>"+name_filter.value+"</service>" +
							"<criteria_type>min amount crossed</criteria_type>" +
							"<criteria_amount compare='less than'>"+amount+"</criteria_amount>" +
							"<result_type></result_type>" +
							"<discount_percent></discount_percent>" +
							"<discount_amount></discount_amount>" +
							"<offer_detail></offer_detail>" +
							"<free_product_name></free_product_name>" +
							"<free_product_quantity></free_product_quantity>" +
							"<free_service_name></free_service_name>" +
							"<status array='yes'>active--extended</status>" +
							"</offers>";
					fetch_requested_data('',offer_data,function(offers)
					{
						////sorting offers based on criteria amount and criteria quantity
						offers.sort(function(a,b)
						{
							if(a.criteria_amount<b.criteria_amount)
							{	return 1;}
							else 
							{	return -1;}
						});
								
						for(var i in offers)
						{
							offer_filter.value=offers[i].offer_detail;	
							if(offers[i].result_type=='discount')
							{
								if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
								{
									discount_filter.value=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
								}
								else 
								{
									discount_filter.value=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount)));
								}
							}
							else if(offers[i].result_type=='product free')
							{
								free_product_filter.value=offers[i].free_product_name;
								free_product_quantity.value=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offers[i].criteria_quantity)));
							}		
							else if(offers[i].result_type=='service free')
							{
								free_service_filter.value=offers[i].free_service_name;
							}		
							break;
						}
					});

					tax_filter.value=parseFloat((parseFloat(prices[a].tax)*(amount-parseFloat(discount_filter.value)))/100);
					break;
				}
				total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);
			});					
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

