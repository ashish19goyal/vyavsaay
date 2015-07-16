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
		rowsHTML+="<form id='form2_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item Type'>";
				rowsHTML+="Type: <input type='text' form='form2_"+id+"' required value=''>";
				rowsHTML+="<br>Name: <input type='text' form='form2_"+id+"' class='dblclick_editable' required value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Detail'>";
				rowsHTML+="Detail: <textarea class='widebox' form='form2_"+id+"' class='dblclick_editable' required></textarea>";
				rowsHTML+="<br>Link: <textarea class='widebox' form='form2_"+id+"' class='dblclick_editable'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Image'>";
				rowsHTML+="<output form='form2_"+id+"'></output>";
				rowsHTML+="<input type='file' form='form2_"+id+"'>";
				rowsHTML+="<br>Size: <input type='number' value='2' class='dblclick_editable' required form='form2_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form2_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form2_"+id+"' id='save_form2_"+id+"' >";	
				rowsHTML+="<input type='button' class='delete_icon' form='form2_"+id+"' id='delete_form2_"+id+"' onclick='$(this).parent().parent().remove();'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form2_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form2_"+id);
		var type_filter=fields.elements[0];
		var name_filter=fields.elements[1];
		var detail_filter=fields.elements[2];
		var link_filter=fields.elements[3];
		var pictureinfo=fields.elements[4];
		var picture=fields.elements[5];

		picture.addEventListener('change',function(evt)
		{
			select_picture(evt,pictureinfo,function(dataURL)
			{
				pictureinfo.innerHTML="<div class='figure'><img id='img_form2_"+id+"' src='"+dataURL+"'></div>";			
			});
		},false);
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form2_create_item(fields);
		});

		set_static_value_list('newsletter_items','item_type',type_filter,function()
		{
			$(type_filter).focus();
		});
		
		$('textarea').autosize();
		longPressEditable($('.dblclick_editable'));
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
		rowsHTML+="<form id='form10_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' required form='form10_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new service' id='form10_add_service_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Remark'>";
				rowsHTML+="<textarea form='form10_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' step='1' form='form10_"+id+"' value='1'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Price'>";
				rowsHTML+="<input type='number' required form='form10_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form10_"+id+"' name='total'>";
				rowsHTML+="<input type='hidden' form='form10_"+id+"' name='amount'>";
				rowsHTML+="<input type='hidden' form='form10_"+id+"' name='discount'>";
				rowsHTML+="<input type='hidden' form='form10_"+id+"' name='tax'>";
				rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form10_"+id+"' id='save_form10_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form10_"+id+"' id='delete_form10_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form10_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form10_"+id+"' name='tax_unit'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form10_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form10_"+id);
		var name_filter=fields.elements[0];
		var notes_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var total_filter=fields.elements[4];
		var amount_filter=fields.elements[5];
		var discount_filter=fields.elements[6];
		var tax_filter=fields.elements[7];
		var id_filter=fields.elements[8];
		var save_button=fields.elements[9];
		var tax_unit_filter=fields.elements[12];
		
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form10_create_item(fields);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form10_add_item();
		});

		var add_service=document.getElementById('form10_add_service_'+id);
		$(add_service).on('click',function()
		{
			modal20_action(function()
			{	
				var service_data="<services>" +
						"<name></name>" +
						"</services>";
				set_my_value_list_func(service_data,name_filter,function () 
				{
					$(name_filter).focus();
				});
			});
		});
		
		var service_data="<services>" +
				"<name></name>" +
				"</services>";
		set_my_value_list_func(service_data,name_filter,function () 
		{
			$(name_filter).focus();
		});
				
		$(name_filter).on('blur',function(event)
		{
			notes_filter.value="";
			price_filter.value=0;
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			tax_unit_filter.value=0;
			
			var price_data="<services>" +
					"<price></price>" +
					"<tax></tax>" +
					"<name exact='yes'>"+name_filter.value+"</name>" +
					"</services>";
			
			fetch_requested_data('',price_data,function(prices)
			{
				if(prices.length>0)
				{
					price_filter.value=prices[0].price;
					tax_unit_filter.value=prices[0].tax;
					var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
					amount_filter.value=amount;
					tax_filter.value=parseFloat((parseFloat(tax_unit_filter.value)*(amount-parseFloat(discount_filter.value)))/100);
				}
				total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);
			});					
		});
		$(quantity_filter).on('blur',function () 
		{
			var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			amount_filter.value=amount;
			tax_filter.value=parseFloat((parseFloat(tax_unit_filter.value)*(amount-parseFloat(discount_filter.value)))/100);
			total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);			
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create product Bill
 * @formNo 12
 */
function form12_add_item()
{
	if(is_create_access('form12'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form12_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Product Name'>";
				rowsHTML+="<input type='text' required form='form12_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form12_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='form12_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' id='form12_add_batch_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form12_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Unit Price'>";
				rowsHTML+="<input type='number' required form='form12_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Total'>";
				rowsHTML+="<input type='number' required form='form12_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form12_"+id+"' id='save_form12_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form12_"+id+"' id='delete_form12_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form12_"+id+"'>";
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
		var save_button=fields.elements[10];
		var free_product_filter=fields.elements[12];
		var free_product_quantity=fields.elements[13];
				
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form12_create_item(fields);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form12_add_item();
		});

		var add_product=document.getElementById('form12_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(product_data,name_filter,function () 
				{
					$(name_filter).focus();
				});
			});
		});
				
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(product_data,name_filter,function () 
		{
			$(name_filter).focus();
		});

		var add_batch=document.getElementById('form12_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal22_action(function()
			{	
				var batch_data="<product_instances>" +
						"<batch></batch>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			});
		});
		
		$(name_filter).on('blur',function(event)
		{
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
			
			var last_batch_data="<bill_items count='1'>" +
					"<batch></batch>" +
					"<item_name exact='yes'>"+name_filter.value+"</item_name>" +
					"</bill_items>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0];
					
					var price_data="<product_instances count='1'>" +
							"<sale_price></sale_price>" +
							"<batch exact='yes'>"+batch_filter.value+"</batch>" +
							"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
							"</product_instances>";
					set_my_value(price_data,price_filter);
					
					get_inventory(name_filter.value,batch_filter.value,function(quantity)
					{
						//$(quantity_filter).attr('max',quantity);
						$(quantity_filter).attr('min',"0");
						$(quantity_filter).attr('placeholder',quantity);
					});
				}
				
			},last_batch_data);
			
			quantity_filter.value="";
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			offer_filter.value="";
			free_product_filter.value="";
			free_product_quantity.value="";
		});
		
		$(batch_filter).on('blur',function(event){
			var price_data="<product_instances count='1'>" +
					"<sale_price></sale_price>" +
					"<batch exact='yes'>"+batch_filter.value+"</batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value(price_data,price_filter);
			
			get_inventory(name_filter.value,batch_filter.value,function(quantity)
			{
				//$(quantity_filter).attr('max',quantity);
				$(quantity_filter).attr('min',"0");
				$(quantity_filter).attr('placeholder',quantity);
			});
			
			quantity_filter.value="";
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
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
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
						"<name exact='yes'>"+name_filter.value+"</name>" +
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
 * @form Enter Customer return
 * @formNo 15
 */
function form15_add_item()
{
	if(is_create_access('form15'))
	{
		var rowsHTML="";
		var id=get_new_key();
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Enter Supplier return
 * @formNo 19
 */
function form19_add_item()
{
	if(is_create_access('form19'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form19_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Product Name'>";
				rowsHTML+="<input type='text' required form='form19_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form19_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='form19_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' id='form19_add_batch_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Notes'>";
				rowsHTML+="<textarea form='form19_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form19_"+id+"' step='any'>";
				rowsHTML+="</br>Saleable: <input type='checkbox' form='form19_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Return Amount'>";
				rowsHTML+="<input type='number' required form='form19_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form19_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form19_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='hidden' form='form19_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form19_"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form19_"+id+"' id='save_form19_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form19_"+id+"' id='delete_form19_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form19_"+id+"'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form19_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form19_"+id);
		var name_filter=fields.elements[0];
		var batch_filter=fields.elements[1];
		var notes_filter=fields.elements[2];
		var quantity_filter=fields.elements[3];
		var total_filter=fields.elements[5];
		var tax_filter=fields.elements[6];
		var id_filter=fields.elements[7];
		var price_filter=fields.elements[8];
		var tax_unit_filter=fields.elements[9];
		var save_button=fields.elements[10];
		
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form19_create_item(fields);
		});
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form19_add_item();
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(product_data,name_filter,function () 
		{
			$(name_filter).focus();
		});

		var add_product=document.getElementById('form19_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(product_data,name_filter,function () 
				{
					$(name_filter).focus();
				});
			});
		});

		var add_batch=document.getElementById('form19_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal22_action(function()
			{	
				var batch_data="<product_instances>" +
						"<batch></batch>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			});
		});
		
		$(name_filter).on('blur',function(event){
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
			batch_filter.value="";
			notes_filter.value="";
			quantity_filter.value=0;
			total_filter.value=0;
			price_filter.value=0;
			tax_filter.value=0;
			tax_unit_filter.value=0;
		});
		
		$(batch_filter).on('blur',function(event)
		{
			var supplier_name=document.getElementById("form19_master").elements[1].value;
			var bill_data="<supplier_bills>" +
					"<id></id>" +
					"<supplier exact='yes'>"+supplier_name+"</supplier>" +
					"</supplier_bills>";
			get_single_column_data(function(bills)
			{
				var bill_string="";
				bills.forEach(function(bill)
				{
					bill_string+=bill+"--";
				});
				var bill_items_data="<supplier_bill_items>" +
						"<id></id>" +
						"<bill_id array='yes'>"+bill_string+"</bill_id>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"<batch exact='yes'>"+batch_filter.value+"</batch>" +
						"<quantity></quantity>" +
						"<amount></amount>" +
						"<tax></tax>" +
						"<total></total>" +
						"<unit_price></unit_price>" +
						"<last_updated></last_updated>" +
						"</supplier_bill_items>";
				fetch_requested_data('',bill_items_data,function(bill_items)
				{
					var notes_value="";
					bill_items.forEach(function(bill_item)
					{
						notes_value+=bill_item.quantity+
									" quantity bought on "+
									get_my_past_date(bill_item.last_updated)+
									" for Rs."+bill_item.total+
									"\n";
						price_filter.value=parseFloat(bill_item.total)/parseFloat(bill_item.quantity);
						tax_unit_filter.value=parseFloat(bill_item.tax)/parseFloat(bill_item.quantity);
					});
					if(notes_value=="")
					{
						notes_filter.value="No purchase records found";
					}
					else
					{
						notes_filter.value=notes_value;
					}
				});
			},bill_data);
			
			quantity_filter.value=0;
			tax_filter.value=0;
			total_filter.value=0;
		});
						
		$(quantity_filter).on('blur',function(event)
		{		
			total_filter.value=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			tax_filter.value=parseFloat(quantity_filter.value)*parseFloat(tax_unit_filter.value);
		});
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
		rowsHTML+="<form id='form21_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Product Name'>";
				rowsHTML+="<input type='text' required form='form21_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form21_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="Bought: <input type='number' step='any' required form='form21_"+id+"'>";
				rowsHTML+="</br>Free: <input type='number' step='any' required form='form21_"+id+"' value='0'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Total: <input type='number' required form='form21_"+id+"' step='any'>";
				rowsHTML+="</br>Tax: <input type='number' form='form21_"+id+"' value='' step='any'>";
				rowsHTML+="</br>Amount: <input type='number' readonly='readonly' form='form21_"+id+"' value='' step='any'>";
				rowsHTML+="</br>Unit Price: <input type='number' readonly='readonly' form='form21_"+id+"' step='any'>";
				rowsHTML+="</br>Previous Price: <input type='number' readonly='readonly' form='form21_"+id+"' value='' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='form21_"+id+"'></br>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' id='form21_add_batch_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Storage Area'>";
				rowsHTML+="<input type='text' form='form21_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new storage' id='form21_add_storage_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form21_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form21_"+id+"' id='save_form21_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form21_"+id+"' id='delete_form21_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form21_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";
	
		$('#form21_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form21_"+id);
		var name_filter=fields.elements[0];
		var pquantity_filter=fields.elements[1];
		var fquantity_filter=fields.elements[2];
		var total_filter=fields.elements[3];
		var tax_filter=fields.elements[4];
		var amount_filter=fields.elements[5];
		var price_filter=fields.elements[6];
		var previous_price_filter=fields.elements[7];
		var batch_filter=fields.elements[8];
		var storage_filter=fields.elements[9];
		var id_filter=fields.elements[10];
		var save_button=fields.elements[11];
				
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form21_create_item(fields);
		});
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form21_add_item();
		});
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(product_data,name_filter,function () 
		{
			$(name_filter).focus();
		});
		
		var add_product=document.getElementById('form21_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(product_data,name_filter,function () 
				{
					$(name_filter).focus();
				});
			});
		});

		var add_batch=document.getElementById('form21_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal22_action(function()
			{	
				var batch_data="<product_instances>" +
						"<batch></batch>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			});
		});

		var add_storage=document.getElementById('form21_add_storage_'+id);
		$(add_storage).on('click',function()
		{
			modal35_action(function()
			{	
				var storage_data="<store_areas>" +
							"<name></name>" +
							"<area_type exact='yes'>storage</area_type>" +
							"</store_areas>";
				set_my_value_list(storage_data,storage_filter);
			});
		});

		var storage_data="<store_areas>" +
					"<name></name>" +
					"<owner></owner>"+					
					"<area_type exact='yes'>storage</area_type>" +
					"</store_areas>";
		fetch_requested_data('',storage_data,function(storages) 
		{
			var form=fields;
			var datalist=document.createElement('datalist');
			var element_array=[];
			storages.forEach(function(d)
			{
				var option=document.createElement('option');
				option.setAttribute('value',d.name);
				element_array.push(d.name);
				datalist.appendChild(option);
				if(d.owner==get_account_name())
				{
					storage_filter.value=d.name;
				}
			});
			
			var list_id=storage_filter.getAttribute('list');
			if(list_id=='' || list_id==null)
			{
				list_id="list_"+get_new_key();
				storage_filter.setAttribute("list",list_id);
			}
			else
			{
				var oldlist=document.getElementById(list_id);
				form.removeChild(oldlist);
			}
			
			form.appendChild(datalist);
			datalist.setAttribute('id',list_id);
			
			$(storage_filter).off("change");
			$(storage_filter).on("change",function(event)
			{
				var found = $.inArray($(this).val(), element_array) > -1;
				if(!found)
				{
		            $(this).val('');
		        }
			});
		});

		$(name_filter).on('blur',function(event)
		{
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
			
			var price_data="<supplier_bill_items count='1'>" +
					"<unit_price></unit_price>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</supplier_bill_items>";
			set_my_value(price_data,previous_price_filter);
			
			batch_filter.value="";
			pquantity_filter.value=0;
			fquantity_filter.value=0;
			price_filter.value=0;
			amount_filter.value=0;
		});
		
		$(pquantity_filter).on('blur',function(event)
		{
			var price=parseFloat(amount_filter.value)/parseFloat(pquantity_filter.value);
			price_filter.value=Math.round(price*100)/100;
		});
		$(total_filter).on('blur',function(event)
		{
			var amount=parseFloat(total_filter.value)-parseFloat(tax_filter.value);
			amount_filter.value=amount;
			var price=parseFloat(amount_filter.value)/parseFloat(pquantity_filter.value);
			price_filter.value=Math.round(price*100)/100;
			
		});
		$(tax_filter).on('blur',function(event)
		{
			var amount=parseFloat(total_filter.value)-parseFloat(tax_filter.value);
			amount_filter.value=amount;
			var price=parseFloat(amount_filter.value)/parseFloat(pquantity_filter.value);
			price_filter.value=Math.round(price*100)/100;
		});
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
		rowsHTML+="<form id='form24_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item Name'>";
				rowsHTML+="<input type='text' required form='form24_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form24_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form24_"+id+"' value='' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Make'>";
				rowsHTML+="<textarea form='form24_"+id+"' readonly='readonly'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Price'>";
				rowsHTML+="MRP: <input type='number' required form='form24_"+id+"' value='' step='any' readonly='readonly'>";
				rowsHTML+="<br>Price: <input type='number' required form='form24_"+id+"' value='' step='any' readonly='readonly' class='dblclick_editable'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form24_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form24_"+id+"' id='save_form24_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form24_"+id+"' id='delete_form24_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form24_"+id+"'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form24_body').prepend(rowsHTML);

		var master_form=document.getElementById("form24_master");		
		var supplier_name=master_form.elements[1].value;
		
		var fields=document.getElementById("form24_"+id);
		var name_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var make_filter=fields.elements[2];
		var mrp_filter=fields.elements[3];
		var price_filter=fields.elements[4];
		var id_filter=fields.elements[5];
		var save_button=fields.elements[6];
				
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form24_create_item(fields);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form24_add_item();
		});
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(product_data,name_filter,function () 
		{
			$(name_filter).focus();
		});
		
		var add_product=document.getElementById('form24_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(product_data,name_filter,function () 
				{
					$(name_filter).focus();
				});
			});
		});		
				
		$(name_filter).on('blur',function(event)
		{
			var make_data="<product_master>" +
					"<make></make>" +
					"<name exact='yes'>"+name_filter.value+"</name>" +
					"</product_master>";
			set_my_value(make_data,make_filter);
			
			var mrp_data="<product_instances>"+
						"<mrp></mrp>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"</product_instances>";
			get_single_column_data(function(mrps)
			{
				if(mrps.length>0)
				{
					mrp_filter.value=mrps[0];
				}
				else{
					mrp_filter.value=0;
				}
				var margin_data="<attributes>" +
							"<value></value>"+
							"<type exact='yes'>supplier</type>"+
							"<attribute exact='yes'>Margin</attribute>" +
							"<name exact='yes'>"+supplier_name+"</name>" +
							"</attributes>";
				get_single_column_data(function(margins)
				{
					if(margins.length>0)
						price_filter.value=my_round((parseFloat(mrp_filter.value)*(100-parseFloat(margins[0]))/100),2);
				},margin_data);					
			},mrp_data);
		});
		
		longPressEditable($('.dblclick_editable'));		
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
		rowsHTML+="<form id='form38_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item Name'>";
				rowsHTML+="<input type='text' form='form38_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form38_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' form='form38_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' id='form38_add_batch_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Store Area'>";
				rowsHTML+="<input type='text' form='form38_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new storage' id='form38_add_storage_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' readonly='readonly' form='form38_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
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
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form38_create_item(fields);
		});		
			
		var products_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(products_data,product_filter,function () 
		{
			$(product_filter).focus();
		});
		
		var add_product=document.getElementById('form38_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(products_data,product_filter,function () 
				{
					$(product_filter).focus();
				});
			});
		});

		var add_batch=document.getElementById('form38_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal22_action(function()
			{	
				var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+product_filter.value+"</product_name>" +
					"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			});
		});

		var add_storage=document.getElementById('form38_add_storage_'+id);
		$(add_storage).on('click',function()
		{
			modal35_action(function()
			{	
				var area_data="<store_areas>" +
				"<name></name>" +
				"<area_type exact='yes'>storage</area_type>" +
				"</store_areas>";
				set_my_value_list(area_data,area_filter);
			});
		});

		$(product_filter).on('blur',function(event){
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+product_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
		});
		
		var area_data="<store_areas>" +
				"<name></name>" +
				"<area_type exact='yes'>storage</area_type>" +
				"</store_areas>";
		
		set_my_value_list(area_data,area_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Cash Register
 * @formNo 56
 */
function form56_add_item()
{
	if(is_create_access('form56'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form56_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Account'>";
				rowsHTML+="<input type='text' required form='form56_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new account' id='form56_add_account_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Type'>";
				rowsHTML+="<input type='text' required form='form56_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="<input type='number' required step='any' form='form56_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Notes'>";
				rowsHTML+="<textarea form='form56_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form56_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form56_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form56_"+id+"' onclick='$(this).parent().parent().remove();'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form56_body').prepend(rowsHTML);
		var fields=document.getElementById("form56_"+id);
		var account_filter=fields.elements[0];
		var type_filter=fields.elements[1];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form56_create_item(fields);
		});
			
		var add_account=document.getElementById('form56_add_account_'+id);
		$(add_account).on('click',function()
		{
			modal12_action(function()
			{	
				var account_data="<accounts>" +
						"<acc_name></acc_name>" +
						"</accounts>";
				set_my_value_list_func(account_data,account_filter,function () 
				{
					$(account_filter).focus();
				});
			});
		});
				
		var account_data="<accounts>" +
				"<acc_name></acc_name>" +
				"</accounts>";
		set_my_value_list_func(account_data,account_filter,function () 
		{
			$(account_filter).focus();
		});		
		set_static_value_list('cash_register','type',type_filter);

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
		rowsHTML+="<form id='form58_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form58_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new service' id='form58_add_service_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Requisite Type'>";
				rowsHTML+="<input type='text' form='form58_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Requisite Name'>";
				rowsHTML+="<input type='text' form='form58_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' form='form58_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
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
		set_my_value_list_func(service_data,service_filter,function () 
		{
			$(service_filter).focus();
		});
		
		var add_service=document.getElementById('form58_add_service_'+id);
		$(add_service).on('click',function()
		{
			modal20_action(function()
			{	
				var service_data="<services>" +
					"<name></name>" +
					"</services>";
				set_my_value_list_func(service_data,service_filter,function () 
				{
					$(service_filter).focus();
				});		
			});
		});

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
		rowsHTML+="<form id='form59_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form59_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form59_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Requisite Type'>";
				rowsHTML+="<input type='text' form='form59_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Requisite Name'>";
				rowsHTML+="<input type='text' form='form59_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' form='form59_"+id+"' value='' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
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
		set_my_value_list_func(product_data,product_filter,function () 
		{
			$(product_filter).focus();
		});
		
		var add_product=document.getElementById('form59_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(product_data,product_filter,function () 
				{
					$(product_filter).focus();
				});
			});
		});

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
		rowsHTML+="<form id='form60_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' form='form60_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form60_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Attribute'>";
				rowsHTML+="<input type='text' form='form60_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Value'>";
				rowsHTML+="<textarea form='form60_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
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
		set_my_value_list_func(product_data,product_filter,function () 
		{
			$(product_filter).focus();
		});
		
		var add_product=document.getElementById('form60_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(product_data,product_filter,function () 
				{
					$(product_filter).focus();
				});
			});
		});

		var attribute_data="<attributes>" +
				"<attribute></attribute>" +
				"<type exact='yes'>product</type>" +
				"</attributes>";
		set_my_filter(attribute_data,attribute_filter);
		
		$('textarea').autosize();
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
		rowsHTML+="<form id='form61_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form61_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new service' id='form61_add_service_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Attribute'>";
				rowsHTML+="<input type='text' form='form61_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Value'>";
				rowsHTML+="<input type='text' form='form61_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
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
		set_my_value_list_func(service_data,service_filter,function () 
		{
			$(service_filter).focus();
		});

		var add_service=document.getElementById('form61_add_service_'+id);
		$(add_service).on('click',function()
		{
			modal20_action(function()
			{	
				var service_data="<services>" +
						"<name></name>" +
						"</services>";
				set_my_value_list_func(service_data,service_filter,function () 
				{
					$(service_filter).focus();
				});
			});
		});
		
		var attribute_data="<attributes>" +
				"<attribute></attribute>" +
				"<type exact='yes'>service</type>" +
				"</attributes>";
		set_my_filter(attribute_data,attribute_filter);
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
		rowsHTML+="<form id='form62_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form62_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form62_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Reviewer'>";
				rowsHTML+="<input type='text' form='form62_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form62_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Detail'>";
				rowsHTML+="<textarea form='form62_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Rating'>";
				rowsHTML+="<input type='number' form='form62_"+id+"' min='1' max='5' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
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
		set_my_value_list_func(product_data,product_filter,function () 
		{
			$(product_filter).focus();
		});
				
		var reviewer_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";
		set_my_filter(reviewer_data,reviewer_filter);

		var add_product=document.getElementById('form62_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(product_data,product_filter,function () 
				{
					$(product_filter).focus();
				});
			});
		});

		var add_customer=document.getElementById('form62_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal11_action(function()
			{	
				var reviewer_data="<customers>" +
					"<acc_name></acc_name>" +
					"</customers>";
				set_my_filter(reviewer_data,reviewer_filter);
			});
		});
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
		rowsHTML+="<form id='form63_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form63_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new service' id='form63_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Reviewer'>";
				rowsHTML+="<input type='text' form='form63_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form63_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Detail'>";
				rowsHTML+="<textarea form='form63_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Rating'>";
				rowsHTML+="<input type='number' form='form63_"+id+"' min='1' max='5' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
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
		set_my_value_list_func(service_data,service_filter,function () 
		{
			$(service_filter).focus();
		});
		
		var reviewer_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";
		set_my_filter(reviewer_data,reviewer_filter);

		var add_service=document.getElementById('form63_add_service_'+id);
		$(add_service).on('click',function()
		{
			modal20_action(function()
			{	
				var service_data="<services>" +
						"<name></name>" +
						"</services>";
				set_my_value_list_func(service_data,service_filter,function () 
				{
					$(service_filter).focus();
				});
			});
		});

		var add_customer=document.getElementById('form63_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal11_action(function()
			{	
				var reviewer_data="<customers>" +
					"<acc_name></acc_name>" +
					"</customers>";
				set_my_filter(reviewer_data,reviewer_filter);
			});
		});		
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
		rowsHTML+="<form id='form64_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form64_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new service' id='form64_add_service_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Type'>";
				rowsHTML+="<input type='text' form='form64_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Cross-sold Item'>";
				rowsHTML+="<input type='text' form='form64_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
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
		set_my_value_list_func(service_data,service_filter,function () 
		{
			$(service_filter).focus();
		});
		
		var add_service=document.getElementById('form64_add_service_'+id);
		$(add_service).on('click',function()
		{
			modal20_action(function()
			{	
				var service_data="<services>" +
						"<name></name>" +
						"</services>";
				set_my_value_list_func(service_data,service_filter,function () 
				{
					$(service_filter).focus();
				});
			});
		});

		set_static_value_list('cross_sells','type',type_filter);
		
		$(type_filter).on('blur',function(event)
		{
			var cross_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		
			if(type_filter.value=='service')
			{
				cross_data="<services>" +
					"<name></name>" +
					"</services>";
			}
			set_my_value_list(cross_data,cross_filter);
		});		
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Product Cross sells
 * @formNo 66
 */
function form66_add_item()
{
	if(is_create_access('form66'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form66_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form66_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form66_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Type'>";
				rowsHTML+="<input type='text' form='form66_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Cross-sold Item'>";
				rowsHTML+="<input type='text' form='form66_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
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
		set_my_value_list_func(product_data,product_filter,function () 
		{
			$(product_filter).focus();
		});

		var add_product=document.getElementById('form66_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(product_data,product_filter,function () 
				{
					$(product_filter).focus();
				});
			});
		});

		set_static_value_list('cross_sells','type',type_filter);
		
		$(type_filter).on('blur',function(event)
		{
			var cross_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		
			if(type_filter.value=='service')
			{
				cross_data="<services>" +
					"<name></name>" +
					"</services>";
			}
			set_my_value_list(cross_data,cross_filter);
		});		
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
		var channel_name=document.getElementById('form69_master').elements['channel'].value;
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form69_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='hidden' required form='form69_"+id+"' value=''>";
				rowsHTML+="<input type='hidden' required form='form69_"+id+"' value=''>";
				rowsHTML+="System SKU: <input type='text' required form='form69_"+id+"' value=''>";
				rowsHTML+="<br>Name: <textarea required form='form69_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form69_"+id+"' value='' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Notes'>";
				rowsHTML+="<textarea form='form69_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form69_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form69_"+id+"' id='save_form69_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form69_"+id+"' id='delete_form69_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form69_"+id+"'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form69_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form69_"+id);
		var name_filter=fields.elements[2];
		var desc_filter=fields.elements[3];
		var quantity_filter=fields.elements[4];
		var notes_filter=fields.elements[5];
		var id_filter=fields.elements[6];
		var save_button=fields.elements[7];
				
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form69_create_item(fields);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form69_add_item();
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
			notes_filter.value="";
			if(name_filter.value!="")
			{
				get_inventory(name_filter.value,'',function(quantity)
				{
					notes_filter.value=notes_filter.value+"\n Total availability: "+quantity;
				});
				
				var desc_data="<product_master>" +
							"<description></description>" +
							"<name exact='yes'>"+name_filter.value+"</name>" +
							"</product_master>";
				set_my_value(desc_data,desc_filter);

				var price_data="<channel_prices count='1'>"+
								"<sale_price></sale_price>"+
								"<freight></freight>"+
								"<channel exact='yes'>"+channel_name+"</channel>"+
								"<latest exact='yes'>yes</latest>"+
								"<item exact='yes'>"+name_filter.value+"</item>"+
								"</channel_prices>";				
				get_single_column_data(function(prices)
				{
					notes_filter.value=notes_filter.value+"\nSale price: "+prices[0].sale_price+"\nFreight: "+prices[0].freight;
				},price_data);				
			}
		});
		
		$('textarea').autosize();
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
		rowsHTML+="<form id='form72_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item Name'>";
				rowsHTML+="<input type='text' required form='form72_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form72_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='form72_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' id='form72_add_batch_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form72_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Unit Price'>";
				rowsHTML+="<input type='number' required form='form72_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Total'>";
				rowsHTML+="<input type='number' required form='form72_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form72_"+id+"' id='save_form72_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form72_"+id+"'>";
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
		var save_button=fields.elements[10];
		var free_product_filter=fields.elements[12];
		var free_product_quantity=fields.elements[13];
		var free_service_filter=fields.elements[14];
				
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
		set_my_value_list_func(product_data,name_filter,function () 
		{
			$(name_filter).focus();
		});
		
		var add_product=document.getElementById('form72_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(product_data,name_filter,function () 
				{
					$(name_filter).focus();
				});
			});
		});

		var add_batch=document.getElementById('form72_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal22_action(function()
			{	
				var batch_data="<product_instances>" +
						"<batch></batch>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			});
		});

		$(name_filter).on('blur',function(event)
		{
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
			
			var last_batch_data="<bill_items count='1'>" +
					"<batch></batch>" +
					"<item_name exact='yes'>"+name_filter.value+"</item_name>" +
					"</bill_items>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0];
				
				
					var price_data="<product_instances count='1'>" +
							"<sale_price></sale_price>" +
							"<batch exact='yes'>"+batch_filter.value+"</batch>" +
							"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
							"</product_instances>";
					set_my_value(price_data,price_filter);
					
					get_inventory(name_filter.value,batch_filter.value,function(quantity)
					{
						//$(quantity_filter).attr('max',quantity);
						$(quantity_filter).attr('min',"0");
						$(quantity_filter).attr('placeholder',quantity);
					});
				}				
			},last_batch_data);
			
			quantity_filter.value="";
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
			var price_data="<product_instances count='1'>" +
					"<sale_price></sale_price>" +
					"<batch exact='yes'>"+batch_filter.value+"</batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value(price_data,price_filter);
			
			get_inventory(name_filter.value,batch_filter.value,function(quantity)
			{
				//$(quantity_filter).attr('max',quantity);
				$(quantity_filter).attr('min',"0");
				$(quantity_filter).attr('placeholder',quantity);
			});
			
			quantity_filter.value="";
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
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
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
						"<tax></tax>" +
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"</product_master>";
				get_single_column_data(function(taxes)
				{
					taxes.forEach(function(tax)
					{
						tax_filter.value=parseFloat((parseFloat(tax)*(amount-parseFloat(discount_filter.value)))/100);
					});
					total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);
				},tax_data);				
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
		rowsHTML+="<form id='form72_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' required form='form72_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new service' id='form72_add_service_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Person'>";
				rowsHTML+="<input type='text' form='form72_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new staff' id='form72_add_staff_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Notes'>";
				rowsHTML+="<textarea form='form72_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Unit Price'>";
				rowsHTML+="<input type='number' required form='form72_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Total'>";
				rowsHTML+="<input type='number' required form='form72_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form72_"+id+"' id='save_form72_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form72_"+id+"'>";
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
		var save_button=fields.elements[10];
		var free_product_filter=fields.elements[12];
		var free_product_quantity=fields.elements[13];
		var free_service_filter=fields.elements[14];
				
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
				
		var service_data="<services>" +
				"<name></name>" +
				"</services>";
		set_my_value_list_func(service_data,name_filter,function () 
		{
			$(name_filter).focus();
		});
				
		var staff_data="<staff>" +
				"<acc_name></acc_name>" +
				"<status exact='yes'>active</status>" +
				"</staff>";
		set_my_value_list(staff_data,staff_filter);
		
		var add_service=document.getElementById('form72_add_service_'+id);
		$(add_service).on('click',function()
		{
			modal20_action(function()
			{	
				var service_data="<services>" +
						"<name></name>" +
						"</services>";
				set_my_value_list_func(service_data,name_filter,function () 
				{
					$(name_filter).focus();
				});
			});
		});

		var add_staff=document.getElementById('form72_add_staff_'+id);
		$(add_staff).on('click',function()
		{
			modal16_action(function()
			{	
				var staff_data="<staff>" +
						"<acc_name></acc_name>" +
						"<status exact='yes'>active</status>" +
						"</staff>";
				set_my_value_list(staff_data,staff_filter);
			});
		});
		
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
					"<name exact='yes'>"+name_filter.value+"</name>" +
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
							"<criteria_type>min amount crossed</criteria_type>" +
							"<criteria_amount upperbound='yes'>"+amount+"</criteria_amount>" +
							"<service exact='yes'>"+name_filter.value+"</service>" +
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


/**
 * @form De-duplication mapping
 * @formNo 80
 */
function form80_add_item()
{
	if(is_create_access('form80'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form80_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Change'>";
				rowsHTML+="<input type='text' form='form80_"+id+"' required>";
				rowsHTML+="<input type='hidden' form='form80_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='To'>";
				rowsHTML+="<input type='text' form='form80_"+id+"' required>";
				rowsHTML+="<input type='hidden' form='form80_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
			rowsHTML+="<input type='hidden' form='form80_"+id+"' value='"+id+"'>";
			rowsHTML+="<input type='submit' class='save_icon' form='form80_"+id+"' id='save_form_"+id+"'>";
			rowsHTML+="<input type='button' class='delete_icon' form='form80_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";
	
		$('#form80_body').prepend(rowsHTML);
		var fields=document.getElementById("form80_"+id);
		var slave_filter=fields.elements[0];
		var slave_id_filter=fields.elements[1];
		var master_filter=fields.elements[2];
		var master_id_filter=fields.elements[3];
		
		var master_fields=document.getElementById('form80_master');
		var table=master_fields.elements[2].value;
		var column=master_fields.elements[3].value;
		
		var slave_data="<"+table+">" +
				"<"+column+"></"+column+">" +
				"</"+table+">";
		set_my_value_list(slave_data,slave_filter);
		set_my_value_list(slave_data,master_filter);
		
		$(slave_filter).on('blur',function(event)
		{
			var slave_id_data="<"+table+">" +
				"<id></id>" +
				"<"+column+" exact='yes'>"+slave_filter.value+"</"+column+">" +
				"</"+table+">";
			set_my_value(slave_id_data,slave_id_filter);
		});
		$(master_filter).on('blur',function(event)
		{
			var master_id_data="<"+table+">" +
				"<id></id>" +
				"<"+column+" exact='yes'>"+master_filter.value+"</"+column+">" +
				"</"+table+">";
			set_my_value(master_id_data,master_id_filter);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form80_create_item(fields);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Sale Leads
 * @formNo 81
 */
function form81_add_item()
{
	if(is_create_access('form81'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form81_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+="<input type='text' form='form81_"+id+"' required value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form81_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<textarea form='form81_"+id+"' class='dblclick_editable'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Due Date'>";
				rowsHTML+="<input type='text' class='dblclick_editable' form='form81_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Identified By'>";
				rowsHTML+="<input type='text' form='form81_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new staff' id='form81_add_staff_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form81_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form81_"+id+"'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form81_"+id+"' onclick='$(this).parent().parent().remove();'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form81_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));
		
		var fields=document.getElementById("form81_"+id);
		var customer_filter=fields.elements[0];
		var detail_filter=fields.elements[1];
		var due_filter=fields.elements[2];
		var by_filter=fields.elements[3];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form81_create_item(fields);
		});
					
		var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";	
		set_my_value_list_func(customer_data,customer_filter,function () 
		{
			$(customer_filter).focus();
		});
		
		$(due_filter).datepicker();
		due_filter.value=get_my_past_date(parseFloat(get_my_time())+86400000);
		
		var staff_data="<staff>" +
				"<acc_name></acc_name>" +
				"</staff>";
		set_my_value_list(staff_data,by_filter);

		var add_customer=document.getElementById('form81_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal11_action(function()
			{	
				var customer_data="<customers>" +
					"<acc_name></acc_name>" +
					"</customers>";	
				set_my_value_list_func(customer_data,customer_filter,function () 
				{
					$(customer_filter).focus();
				});
			});
		});

		var add_staff=document.getElementById('form81_add_staff_'+id);
		$(add_staff).on('click',function()
		{
			modal16_action(function()
			{	
				var staff_data="<staff>" +
						"<acc_name></acc_name>" +
						"</staff>";
				set_my_value_list(staff_data,by_filter);
			});
		});
		
		$('textarea').autosize();
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Scan Items
 * @formNo 82
 */
function form82_add_item()
{
	if(is_create_access('form82'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='row_form82_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Barcode'>";
				rowsHTML+="<input type='text' required form='row_form82_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Product'>";
				rowsHTML+="<input type='text' required form='row_form82_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='row_form82_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Unit Price'>";
				rowsHTML+="<input type='number' readonly='readonly' required form='row_form82_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='row_form82_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='row_form82_"+id+"' id='delete_form82_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' form='row_form82_"+id+"' value='"+id+"'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form82_body').prepend(rowsHTML);
		
		var fields=document.getElementById("row_form82_"+id);
		var code_filter=fields.elements[0];
		var product_filter=fields.elements[1];
		var batch_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var id_filter=fields.elements[4];
		
		$(code_filter).focus();
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form82_add_item();
		});
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,product_filter);
		
		$(code_filter).on('blur',function(event)
		{
			var product_data="<product_master count='1'>" +
					"<name></name>" +
					"<bar_code exact='yes'>"+code_filter.value+"</bar_code>" +
					"</product_master>";
			get_single_column_data(function(product_name)
			{
				product_filter.value=product_name[0];
				
				var batch_data="<product_instances>" +
						"<batch></batch>" +
						"<product_name exact='yes'>"+product_filter.value+"</product_name>" +
						"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
				
				var last_batch_data="<bill_items count='1'>" +
						"<batch></batch>" +
						"<item_name exact='yes'>"+product_filter.value+"</item_name>" +
						"</bill_items>";
				get_single_column_data(function(data)
				{
					if(data.length>0)
					{
						batch_filter.value=data[0];
						var price_data="<product_instances count='1'>" +
								"<sale_price></sale_price>" +
								"<batch exact='yes'>"+batch_filter.value+"</batch>" +
								"<product_name exact='yes'>"+product_filter.value+"</product_name>" +
								"</product_instances>";
						set_my_value(price_data,price_filter);
					}
				},last_batch_data);
			},product_data);
		});
		
		$(product_filter).on('change',function(event)
		{
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+product_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
			
			var last_batch_data="<bill_items count='1'>" +
					"<batch></batch>" +
					"<item_name exact='yes'>"+product_filter.value+"</item_name>" +
					"</bill_items>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0];
					var price_data="<product_instances count='1'>" +
							"<sale_price></sale_price>" +
							"<batch exact='yes'>"+batch_filter.value+"</batch>" +
							"<product_name exact='yes'>"+product_filter.value+"</product_name>" +
							"</product_instances>";
					set_my_value(price_data,price_filter);
				}
			},last_batch_data);
		});
		
		$(batch_filter).on('blur',function(event){
			var price_data="<product_instances count='1'>" +
					"<sale_price></sale_price>" +
					"<batch exact='yes'>"+batch_filter.value+"</batch>" +
					"<product_name exact='yes'>"+product_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value(price_data,price_filter);			
		});
				
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Subscriptions
 * @formNo 84
 */
function form84_add_item()
{
	if(is_create_access('form84'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form84_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+="<input type='text' form='form84_"+id+"' required value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form84_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Service'>";
				rowsHTML+="<input type='text' form='form84_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new service' id='form84_add_service_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' class='dblclick_editable' form='form84_"+id+"' value='active'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Notes'>";
				rowsHTML+="<textarea form='form84_"+id+"' class='dblclick_editable'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Last Bill'>";
				rowsHTML+="<textarea readonly='readonly' form='form84_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form84_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form84_"+id+"'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form84_"+id+"' onclick='$(this).parent().parent().remove();'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form84_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));
		
		var fields=document.getElementById("form84_"+id);
		var customer_filter=fields.elements[0];
		var service_filter=fields.elements[1];
		var status_filter=fields.elements[2];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form84_create_item(fields);
		});
					
		var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
		set_my_value_list_func(customer_data,customer_filter,function () 
		{
			$(customer_filter).focus();
		});

		var service_data="<services>" +
			"<name></name>" +
			"</services>";
		set_my_value_list(service_data,service_filter);
		
		var add_customer=document.getElementById('form84_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal11_action(function()
			{	
				var customer_data="<customers>" +
					"<acc_name></acc_name>" +
					"</customers>";
				set_my_value_list_func(customer_data,customer_filter,function () 
				{
					$(customer_filter).focus();
				});
			});
		});

		var add_service=document.getElementById('form84_add_service_'+id);
		$(add_service).on('click',function()
		{
			modal20_action(function()
			{	
				var service_data="<services>" +
					"<name></name>" +
					"</services>";
				set_my_value_list(service_data,service_filter);
			});
		});

		set_static_value_list('service_subscriptions','status',status_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}


/**
 * @form Manufacturing Schedule
 * @formNo 88
 */
function form88_add_item()
{
	if(is_create_access('form88'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form88_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Product'>";
				rowsHTML+="<input type='text' form='form88_"+id+"' required value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form88_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Process Notes'>";
				rowsHTML+="<textarea form='form88_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' class='dblclick_editable' required form='form88_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Schedule'>";
				rowsHTML+="<input type='text' form='form88_"+id+"' class='dblclick_editable'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Iteraton Notes'>";
				rowsHTML+="<textarea form='form88_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form88_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form88_"+id+"' title='Save'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form88_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form88_"+id+"'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form88_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));
		
		var fields=document.getElementById("form88_"+id);
		var product_filter=fields.elements[0];
		var status_filter=fields.elements[2];
		var schedule_filter=fields.elements[3];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form88_create_item(fields);
		});
					
		var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
		set_my_value_list_func(product_data,product_filter,function () 
		{
			$(product_filter).focus();
		});

		var add_product=document.getElementById('form88_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{	
				var products_data="<product_master>" +
					"<name></name>" +
					"</product_master>";
				set_my_value_list_func(product_data,product_filter,function () 
				{
					$(product_filter).focus();
				});
			});
		});
		
		set_static_value_list('manufacturing_schedule','status',status_filter);
		$(schedule_filter).datetimepicker();
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Appointments
 * @formNo 89
 */
function form89_add_item()
{
	if(is_create_access('form89'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form89_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+="<input type='text' required form='form89_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form89_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Assignee'>";
				rowsHTML+="<input type='text' form='form89_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new staff' id='form89_add_staff_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Schedule'>";
				rowsHTML+="<input type='text' required form='form89_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Notes'>";
				rowsHTML+="<textarea form='form89_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' required form='form89_"+id+"' value='pending'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form89_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form89_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form89_"+id+"' onclick='$(this).parent().parent().remove();'>";	
				rowsHTML+="<a id='form89_whatsapp_"+id+"' href='' target='_blank'><img style='width:25px;height:25px;' src='./images/whatsapp.jpeg' form='form89_"+id+"' title='Send details through WhatsApp'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form89_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form89_"+id);
		var name_filter=fields.elements[0];
		var assignee_filter=fields.elements[1];
		var schedule_filter=fields.elements[2];
		var status_filter=fields.elements[4];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form89_create_item(fields);
		});
				
		var customer_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";
		set_my_value_list_func(customer_data,name_filter,function () 
		{
			$(name_filter).focus();
		});
						
		var staff_data="<staff>" +
				"<acc_name></acc_name>" +
				"</staff>";
		set_my_value_list(staff_data,assignee_filter);

		var add_customer=document.getElementById('form89_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal11_action(function()
			{	
				var customer_data="<customers>" +
						"<acc_name></acc_name>" +
						"</customers>";
				set_my_value_list_func(customer_data,name_filter,function () 
				{
					$(name_filter).focus();
				});
			});
		});
		
		var add_staff=document.getElementById('form89_add_staff_'+id);
		$(add_staff).on('click',function()
		{
			modal16_action(function()
			{	
				var staff_data="<staff>" +
						"<acc_name></acc_name>" +
						"</staff>";
				set_my_value_list(staff_data,assignee_filter);
			});
		});
		
		set_static_value_list('appointments','status',status_filter);
		$(schedule_filter).datetimepicker();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Billing types
 * @formNo 90
 */
function form90_add_item()
{
	if(is_create_access('form90'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form90_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form90_"+id+"' required value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Notes'>";
				rowsHTML+="<textarea form='form90_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form90_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form90_"+id+"' title='Save'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form90_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form90_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));
		
		var fields=document.getElementById("form90_"+id);
		var name_filter=fields.elements[0];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form90_create_item(fields);
		});
					
		$(name_filter).focus();
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Create Bill(bakery)
 * @formNo 91
 */
function form91_add_item()
{
	var filter_fields=document.getElementById('form91_master');
	var bill_type=filter_fields.elements['bill_type'].value;
	var channel=filter_fields.elements['channel'].value;
	if(is_create_access('form91'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form91_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' required form='form91_"+id+"'>";
				rowsHTML+="<br><textarea form='form91_"+id+"' readonly='readonly' class='dblclick_editable'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='form91_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' min='0' required form='form91_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Price: <input type='number' required readonly='readonly' form='form91_"+id+"' step='any'>";
				rowsHTML+="MRP: <input type='number' required readonly='readonly' form='form91_"+id+"' step='any'>";
				rowsHTML+="Amount: <input type='number' required readonly='readonly' form='form91_"+id+"' step='any'>";
				rowsHTML+="Tax: <input type='number' required readonly='readonly' form='form91_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Storage'>";
				rowsHTML+="<input type='text' form='form91_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form91_"+id+"' name='freight'>";
				rowsHTML+="<input type='hidden' form='form91_"+id+"' name='total'>";
				rowsHTML+="<input type='hidden' form='form91_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form91_"+id+"' id='save_form91_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form91_"+id+"' id='delete_form91_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form91_"+id+"' name='tax_unit'>";
				rowsHTML+="<input type='hidden' form='form91_"+id+"' name='freight_unit'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form91_"+id+"'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form91_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form91_"+id);
		var name_filter=fields.elements[0];
		var desc_filter=fields.elements[1];
		var batch_filter=fields.elements[2];
		var quantity_filter=fields.elements[3];
		var price_filter=fields.elements[4];
		var mrp_filter=fields.elements[5];
		var amount_filter=fields.elements[6];
		var tax_filter=fields.elements[7];
		var storage_filter=fields.elements[8];
		var freight_filter=fields.elements[9];
		var total_filter=fields.elements[10];
		var id_filter=fields.elements[11];
		var save_button=fields.elements[12];
		var tax_unit_filter=fields.elements['tax_unit'];
		var freight_unit_filter=fields.elements['freight_unit'];
		
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form91_create_item(fields);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form91_add_item();
		});
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(product_data,name_filter,function () 
		{
			$(name_filter).focus();
		});

		var storage_data="<store_areas>"+
						"<name></name>"+
						"<area_type exact='yes'>"+get_session_var('storage_level')+"</area_type>"+
						"</store_areas>";
		set_my_value_list(storage_data,storage_filter);

		$(name_filter).on('blur',function(event)
		{
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
			
			var master_data="<product_master>" +
						"<description></description>"+
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"<tax></tax>" +
						"</product_master>";
			fetch_requested_data('',master_data,function (products) 
			{
				if(products.length>0)
				{
					tax_unit_filter.value=products[0].tax;
					desc_filter.value=products[0].description;
				}
			});
			
			var last_batch_data="<bill_items count='1'>" +
					"<batch></batch>" +
					"<mrp></mrp>"+
					"<item_name exact='yes'>"+name_filter.value+"</item_name>" +
					"</bill_items>";
			fetch_requested_data('',last_batch_data,function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0].batch;
					mrp_filter.value=data[0].mrp;
					var price_data="<channel_prices count='1'>" +
								"<sale_price></sale_price>" +
								"<freight></freight>" +
								"<channel exact='yes'>"+channel+"</channel>" +
								"<latest exact='yes'>yes</latest>" +
								"<item exact='yes'>"+name_filter.value+"</item>" +
								"</channel_prices>";
					fetch_requested_data('',price_data,function (prices) 
					{
						if(prices.length>0)
						{
							price_filter.value=prices[0].sale_price;
							freight_unit_filter.value=prices[0].freight;
						}
					});					

					get_inventory(name_filter.value,batch_filter.value,function(quantity)
					{
						$(quantity_filter).attr('placeholder',quantity);
					});
					
					var its_storage_data="<area_utilization>"+
							"<name></name>"+
							"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
							"<batch exact='yes'>"+batch_filter.value+"</batch>"+
							"</area_utilization>";
					set_my_value(its_storage_data,storage_filter);
				}
			});
			
			quantity_filter.value="";
			total_filter.value=0;
			amount_filter.value=0;
			tax_filter.value=0;
		});
		
		$(batch_filter).on('blur',function(event)
		{
			var its_storage_data="<area_utilization count='1'>"+
							"<name></name>"+
							"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
							"<batch exact='yes'>"+batch_filter.value+"</batch>"+
							"</area_utilization>";
			set_my_value(its_storage_data,storage_filter);					

			var mrp_data="<product_instances count='1'>"+
						"<mrp></mrp>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"<batch exact='yes'>"+batch_filter.value+"</batch>"+
						"</product_instances>";
			set_my_value(mrp_data,mrp_filter);						
						
			var price_data="<channel_prices count='1'>" +
						"<sale_price></sale_price>" +
						"<freight></freight>" +
						"<channel exact='yes'>"+channel+"</channel>" +
						"<latest exact='yes'>yes</latest>" +
						"<item exact='yes'>"+name_filter.value+"</item>" +
						"</channel_prices>";
			fetch_requested_data('',price_data,function (prices) 
			{
				if(prices.length>0)
				{
					price_filter.value=prices[0].sale_price;
					freight_filter.value=prices[0].freight;
				}
			});					
			
			get_inventory(name_filter.value,batch_filter.value,function(quantity)
			{
				$(quantity_filter).attr('placeholder',quantity);
			});
			
			quantity_filter.value="";
			total_filter.value=0;
			amount_filter.value=0;
			tax_filter.value=0;
		});
		
		$(quantity_filter).on('blur',function(event)
		{
			var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			amount_filter.value=amount;
			freight_filter.value=my_round((parseFloat(freight_unit_filter.value)*parseFloat(quantity_filter.value)),2);			
			tax_filter.value=my_round(((parseFloat(tax_unit_filter.value)*amount)/100),2);			
			total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)+parseFloat(freight_filter.value));
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Customer Attributes
 * @formNo 96
 */
function form96_add_item()
{
	if(is_create_access('form96'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form96_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form96_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form96_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Attribute'>";
				rowsHTML+="<input type='text' form='form96_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Value'>";
				rowsHTML+="<input type='text' form='form96_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form96_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form96_"+id+"' title='Save'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form96_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form96_body').prepend(rowsHTML);
		var fields=document.getElementById("form96_"+id);
		var customer_filter=fields.elements[0];
		var attribute_filter=fields.elements[1];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form96_create_item(fields);
		});
				
		var customer_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";
		set_my_value_list_func(customer_data,customer_filter,function () 
		{
			$(customer_filter).focus();
		});

		var add_customer=document.getElementById('form96_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal11_action(function()
			{	
				var customer_data="<customers>" +
						"<acc_name></acc_name>" +
						"</customers>";
				set_my_value_list_func(customer_data,customer_filter,function () 
				{
					$(customer_filter).focus();
				});
			});
		});
		
		var attribute_data="<attributes>" +
				"<attribute></attribute>" +
				"<type exact='yes'>customer</type>" +
				"</attributes>";
		set_my_filter(attribute_data,attribute_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Supplier Attributes
 * @formNo 97
 */
function form97_add_item()
{
	if(is_create_access('form97'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form97_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form97_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new supplier' id='form97_add_supplier_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Attribute'>";
				rowsHTML+="<input type='text' form='form97_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Value'>";
				rowsHTML+="<input type='text' form='form97_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form97_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form97_"+id+"' title='Save'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form97_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form97_body').prepend(rowsHTML);
		var fields=document.getElementById("form97_"+id);
		var supplier_filter=fields.elements[0];
		var attribute_filter=fields.elements[1];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form97_create_item(fields);
		});
				
		var supplier_data="<suppliers>" +
				"<acc_name></acc_name>" +
				"</suppliers>";
		set_my_value_list_func(supplier_data,supplier_filter,function () 
		{
			$(supplier_filter).focus();
		});
		
		var add_supplier=document.getElementById('form97_add_supplier_'+id);
		$(add_supplier).on('click',function()
		{
			modal13_action(function()
			{	
				var supplier_data="<suppliers>" +
						"<acc_name></acc_name>" +
						"</suppliers>";
				set_my_value_list_func(supplier_data,supplier_filter,function () 
				{
					$(supplier_filter).focus();
				});
			});
		});

		var attribute_data="<attributes>" +
				"<attribute></attribute>" +
				"<type exact='yes'>supplier</type>" +
				"</attributes>";
		set_my_filter(attribute_data,attribute_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Staff Attributes
 * @formNo 98
 */
function form98_add_item()
{
	if(is_create_access('form98'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form98_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form98_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new staff' id='form98_add_staff_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Attribute'>";
				rowsHTML+="<input type='text' form='form98_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Value'>";
				rowsHTML+="<input type='text' form='form98_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form98_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form98_"+id+"' title='Save'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form98_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form98_body').prepend(rowsHTML);
		var fields=document.getElementById("form98_"+id);
		var staff_filter=fields.elements[0];
		var attribute_filter=fields.elements[1];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form98_create_item(fields);
		});
				
		var staff_data="<staff>" +
				"<acc_name></acc_name>" +
				"</staff>";
		set_my_value_list_func(staff_data,staff_filter,function () 
		{
			$(staff_filter).focus();
		});
		
		var add_staff=document.getElementById('form98_add_staff_'+id);
		$(add_staff).on('click',function()
		{
			modal16_action(function()
			{	
				var staff_data="<staff>" +
						"<acc_name></acc_name>" +
						"</staff>";
				set_my_value_list_func(staff_data,staff_filter,function () 
				{
					$(staff_filter).focus();
				});
			});
		});

		var attribute_data="<attributes>" +
				"<attribute></attribute>" +
				"<type exact='yes'>staff</type>" +
				"</attributes>";
		set_my_filter(attribute_data,attribute_filter);

	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Projects
 * @formNo 101
 */
function form101_add_item()
{
	if(is_create_access('form101'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form101_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Project Name'>";
				rowsHTML+="<textarea required form='form101_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<textarea form='form101_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Start Date'>";
				rowsHTML+="<input type='text' required form='form101_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' required form='form101_"+id+"' value='active'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form101_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form101_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form101_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form101_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form101_"+id);
		var name_filter=fields.elements[0];
		var start_filter=fields.elements[2];
		var status_filter=fields.elements[3];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form101_create_item(fields);
		});
				
		$(name_filter).focus();

		set_static_value_list('projects','status',status_filter);
		$(start_filter).datepicker();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project Team
 * @formNo 102
 */
function form102_add_item()
{
	if(is_create_access('form102'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form102_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Member'>";
				rowsHTML+="<input type='text' form='form102_"+id+"' required value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new staff' id='form102_add_staff_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Role'>";
				rowsHTML+="<textarea form='form102_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Notes'>";
				rowsHTML+="<textarea form='form102_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form102_"+id+"' required value='active'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form102_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form102_"+id+"' id='save_form102_"+id+"' >";	
				rowsHTML+="<input type='button' class='delete_icon' form='form102_"+id+"' id='delete_form102_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form102_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form102_"+id);
		var member_filter=fields.elements[0];
		var status_filter=fields.elements[3];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form102_create_item(fields);
		});
							
		var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
		set_my_value_list_func(staff_data,member_filter,function () 
		{
			$(member_filter).focus();
		});

		var add_staff=document.getElementById('form102_add_staff_'+id);
		$(add_staff).on('click',function()
		{
			modal16_action(function()
			{	
				var staff_data="<staff>" +
					"<acc_name></acc_name>" +
					"</staff>";
				set_my_value_list_func(staff_data,member_filter,function () 
				{
					$(member_filter).focus();
				});
			});
		});

		set_static_value_list('project_team','status',status_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Project Phases
 * @formNo 103
 */
function form103_add_item()
{
	if(is_create_access('form103'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form103_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Phase Name'>";
				rowsHTML+="<textarea form='form103_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<textarea form='form103_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Start Date'>";
				rowsHTML+="<input type='text' form='form103_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Due Date'>";
				rowsHTML+="<input type='text' form='form103_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form103_"+id+"' required value='active'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form103_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form103_"+id+"' id='save_form103_"+id+"' >";	
				rowsHTML+="<input type='button' class='delete_icon' form='form103_"+id+"' id='delete_form103_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form103_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form103_"+id);
		var name_filter=fields.elements[0];
		var start_filter=fields.elements[2];
		var due_filter=fields.elements[3];
		var status_filter=fields.elements[4];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form103_create_item(fields);
		});
					
		$(name_filter).focus();
		
		$(start_filter).datepicker();
		$(due_filter).datepicker();
		set_static_value_list('project_phases','status',status_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Manage Data Access
 * @formNo 105
 */
function form105_add_item()
{
	if(is_create_access('form105'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form105_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Access Type'>";
				rowsHTML+="<input type='text' form='form105_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='User Type'>";
				rowsHTML+="<input type='text' form='form105_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='User'>";
				rowsHTML+="<input type='text' form='form105_"+id+"'>";
				rowsHTML+="<input type='text' form='form105_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Criteria Field'>";
				rowsHTML+="<input type='text' form='form105_"+id+"' title='Leave this blank for unconditional access'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Criteria Value'>";
				rowsHTML+="<textarea form='form105_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form105_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form105_"+id+"' id='save_form105_"+id+"' >";	
				rowsHTML+="<input type='button' class='delete_icon' form='form105_"+id+"' id='delete_form105_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form105_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form105_"+id);
		var type_filter=fields.elements[0];
		var user_type_filter=fields.elements[1];
		var user_filter=fields.elements[2];
		var user_field_filter=fields.elements[3];
		var field_filter=fields.elements[4];
		
		var master_fields=document.getElementById('form105_master');
		var tablename=master_fields.elements[1].value;
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form105_create_item(fields);
		});
		set_static_value_list('data_access','user_type',user_type_filter);
		$(user_field_filter).hide();
		
		$(user_type_filter).off('blur');
		$(user_type_filter).on('blur',function()
		{
			$(user_filter).hide();
			$(user_field_filter).hide();
	
			if(user_type_filter.value=='user')
			{
				$(user_filter).show();
			}
			else if(user_type_filter.value=='field')
			{
				$(user_field_filter).show();
			}
		});


		set_static_value_list('data_access','access_type',type_filter,function()
		{
			$(type_filter).focus();
		});
		
		var user_data="<accounts>" +
				"<acc_name></acc_name>" +
				"</accounts>";
		set_my_value_list(user_data,user_filter);
				
		var field_data="<user_fields_list>"+
					"<field_name></field_name>"+
					"<tablename exact='yes'>"+tablename+"</tablename>"+
					"</user_fields_list>";		
		set_my_value_list(field_data,user_field_filter);
		
		var field_data="<data_access>" +
				"<criteria_field></criteria_field>" +
				"<tablename exact='yes'>"+tablename+"</tablename>" +
				"</data_access>";
		set_my_filter(field_data,field_filter);		
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}


/**
 * @form Asset Attributes
 * @formNo 109
 */
function form109_add_item()
{
	if(is_create_access('form109'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form109_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form109_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new asset' id='form109_add_asset_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Attribute'>";
				rowsHTML+="<input type='text' form='form109_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Value'>";
				rowsHTML+="<input type='text' form='form109_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form109_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form109_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form109_"+id+"' onclick='$(this).parent().parent().remove();'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form109_body').prepend(rowsHTML);
		var fields=document.getElementById("form109_"+id);
		var asset_filter=fields.elements[0];
		var attribute_filter=fields.elements[1];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form109_create_item(fields);
		});
				
		var asset_data="<assets>" +
				"<name></name>" +
				"</assets>";
		set_my_value_list_func(asset_data,asset_filter,function () 
		{
			$(asset_filter).focus();
		});

		var add_asset=document.getElementById('form109_add_asset_'+id);
		$(add_asset).on('click',function()
		{
			modal10_action(function()
			{	
				var asset_data="<assets>" +
						"<name></name>" +
						"</assets>";
				set_my_value_list_func(asset_data,asset_filter,function () 
				{
					$(asset_filter).focus();
				});
			});
		});
		
		var attribute_data="<attributes>" +
				"<attribute></attribute>" +
				"<type exact='yes'>asset</type>" +
				"</attributes>";
		set_my_filter(attribute_data,attribute_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create Reports
 * @formNo 111
 */
function form111_add_item()
{
	if(is_create_access('form111'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form111_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Table'>";
				rowsHTML+="<input type='text' form='form111_"+id+"' required value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Field'>";
				rowsHTML+="<input type='text' form='form111_"+id+"' required value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Condition'>";
				rowsHTML+="<input type='text' form='form111_"+id+"' required value='none'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Condition Match'>";
				rowsHTML+="Table <input type='text' form='form111_"+id+"' value=''>";
				rowsHTML+="</br>Field <input type='text' form='form111_"+id+"' value=''>";
				rowsHTML+="</br>Value <input type='text' form='form111_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form111_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form111_"+id+"' id='save_form111_"+id+"' >";	
				rowsHTML+="<input type='button' class='delete_icon' form='form111_"+id+"' id='delete_form111_"+id+"' onclick='$(this).parent().parent().remove();'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form111_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form111_"+id);
		var table1_filter=fields.elements[0];
		var field1_filter=fields.elements[1];
		var condition_filter=fields.elements[2];
		var table2_filter=fields.elements[3];
		var field2_filter=fields.elements[4];
		var value_filter=fields.elements[5];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form111_create_item(fields);
		});
					
		$(table1_filter).focus();
		
		var tables_data="<report_items>" +
			"<table1></table1>" +
			"</report_items>";
		var fields_data="<report_items>" +
			"<field1></field1>" +
			"</report_items>";
		
		set_my_filter(tables_data,table1_filter);
		set_my_filter(tables_data,table2_filter);
		set_my_filter(fields_data,field1_filter);
		set_my_filter(fields_data,field2_filter);
		set_static_value_list('report_items','condition1',condition_filter);
		
		$(condition_filter).on('blur',function(event)
		{
			if(condition_filter.value.indexOf('field')!=-1)
			{
				value_filter.setAttribute('readonly','readonly');
				table2_filter.removeAttribute('readonly');
				field2_filter.removeAttribute('readonly');
			}
			else
			{
				value_filter.removeAttribute('readonly');
				table2_filter.setAttribute('readonly','readonly');
				field2_filter.setAttribute('readonly','readonly');
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}


/**
 * @form Add sale challan
 * @formNo 112
 */
function form112_add_item()
{
	if(is_create_access('form112'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form112_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' form='form112_"+id+"' required value=''>";
				rowsHTML+="<br>SKU: <input type='text' form='form112_"+id+"' required>";
				rowsHTML+="<br>Name: <input type='text' readonly='readonly' form='form112_"+id+"'>";			
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' form='form112_"+id+"' required value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' form='form112_"+id+"' value='1' required step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Unit Price: Rs. <input type='number' form='form112_"+id+"' required step='any'>";
				rowsHTML+="<br>MRP: Rs. <input type='number' readonly='readonly' form='form112_"+id+"' step='any'>";
				rowsHTML+="<br>Amount: Rs. <input type='number' readonly='readonly' form='form112_"+id+"' required step='any'>";
				rowsHTML+="<br>Tax: Rs. <input type='number' readonly='readonly' form='form112_"+id+"' required step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Storage'>";
				rowsHTML+="<input type='text' form='form112_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form112_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form112_"+id+"' id='save_form112_"+id+"' >";	
				rowsHTML+="<input type='button' class='delete_icon' form='form112_"+id+"' id='delete_form112_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form112_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form112_"+id+"' name='tax_unit'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form112_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form112_"+id);
		var barcode_filter=fields.elements[0];
		var name_filter=fields.elements[1];
		var desc_filter=fields.elements[2];
		var batch_filter=fields.elements[3];
		var quantity_filter=fields.elements[4];
		var unit_filter=fields.elements[5];
		var mrp_filter=fields.elements[6];
		var amount_filter=fields.elements[7];
		var tax_filter=fields.elements[8];
		var storage_filter=fields.elements[9];
		var save_button=fields.elements[11];
		var tax_unit_filter=fields.elements[14];
		
		$(barcode_filter).focus();
		
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form112_create_item(fields);
		});
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form112_add_item();
		});
							
		var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
		set_my_value_list_func(products_data,name_filter); 
		
		var storage_data="<store_areas>"+
						"<name></name>"+
						"<area_type exact='yes'>"+get_session_var('storage_level')+"</area_type>"+
						"</store_areas>";
		set_my_value_list(storage_data,storage_filter);
		
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
			var desc_data="<product_master>" +
				"<description></description>" +
				"<name exact='yes'>"+name_filter.value+"</name>" +
				"</product_master>";
			set_my_value(desc_data,desc_filter);
			
			var batch_data="<product_instances>" +
				"<batch></batch>" +
				"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
				"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
			
			var tax_unit_data="<product_master>"+
							"<tax></tax>"+
							"<name exact='yes'>"+name_filter.value+"</name>"+
							"</product_master>";
			set_my_value(tax_unit_data,tax_unit_filter);
			
			var last_batch_data="<bill_items count='1'>" +
					"<batch></batch>" +
					"<item_name exact='yes'>"+name_filter.value+"</item_name>" +
					"</bill_items>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0];				
			
					var its_storage_data="<area_utilization>"+
							"<name></name>"+
							"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
							"<batch exact='yes'>"+batch_filter.value+"</batch>"+
							"</area_utilization>";
					set_my_value(its_storage_data,storage_filter);					

					get_inventory(name_filter.value,batch_filter.value,function(quantity)
					{
						//$(quantity_filter).attr('max',quantity);
						$(quantity_filter).attr('min',"0");
						$(quantity_filter).attr('placeholder',quantity);
					});

					var mrp_data="<product_instances>"+
						"<mrp></mrp>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"<batch exact='yes'>"+batch_filter.value+"</batch>"+
						"</product_instances>";
					set_my_value(mrp_data,mrp_filter);
										
		
					var sale_price_data="<channel_prices>" +
									"<sale_price></sale_price>"+
									"<latest exact='yes'>yes</latest>" +
									"<channel exact='yes'>Retail</channel>"+
									"<item exact='yes'>"+name_filter.value+"</item>" +
									"</channel_prices>";
					set_my_value(sale_price_data,unit_filter,function () 
					{					
						amount_filter.value=my_round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
						tax_filter.value=my_round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);			
					});
				}				
			},last_batch_data);
			
		});
		
		$(batch_filter).on('blur',function(event)
		{
			var its_storage_data="<area_utilization>"+
							"<name></name>"+
							"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
							"<batch exact='yes'>"+batch_filter.value+"</batch>"+
							"</area_utilization>";
			set_my_value(its_storage_data,storage_filter);					

			var mrp_data="<product_instances>"+
				"<mrp></mrp>"+
				"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
				"<batch exact='yes'>"+batch_filter.value+"</batch>"+
				"</product_instances>";
			set_my_value(mrp_data,mrp_filter);
								

			var sale_price_data="<channel_prices>" +
							"<sale_price></sale_price>"+
							"<latest exact='yes'>yes</latest>" +
							"<channel exact='yes'>Retail</channel>"+
							"<item exact='yes'>"+name_filter.value+"</item>" +
							"</channel_prices>";
			set_my_value(sale_price_data,unit_filter,function () 
			{					
				amount_filter.value=my_round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
				tax_filter.value=my_round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);			
			});			
		});
		
		$(quantity_filter).add(unit_filter).on('blur',function () 
		{
			amount_filter.value=my_round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
			tax_filter.value=my_round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}


/**
 * @form Add purchase challans
 * @formNo 114
 */
function form114_add_item()
{
	if(is_create_access('form114'))
	{
		var supplier_name=document.getElementById('form114_master').elements[1].value;
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form114_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' form='form114_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new item' id='form114_add_product_"+id+"'>";
				rowsHTML+="<br>SKU: <input type='text' form='form114_"+id+"' required>";
				rowsHTML+="<br>Name: <input type='text' readonly='readonly' form='form114_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' form='form114_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add batch' id='form114_add_batch_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' form='form114_"+id+"' value='1' required step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Unit Price: Rs. <input type='number' form='form114_"+id+"' required step='any'>";
				rowsHTML+="<br>Amount: Rs. <input type='number' readonly='readonly' form='form114_"+id+"' required step='any'>";
				rowsHTML+="<br>Tax: Rs. <input type='number' readonly='readonly' form='form114_"+id+"' required step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Storage'>";
				rowsHTML+="<input type='text' form='form114_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form114_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form114_"+id+"' id='save_form114_"+id+"' >";	
				rowsHTML+="<input type='button' class='delete_icon' form='form114_"+id+"' id='delete_form114_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form114_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form114_"+id+"' name='tax_unit'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form114_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form114_"+id);
		var barcode_filter=fields.elements[0];
		var name_filter=fields.elements[1];
		var desc_filter=fields.elements[2];
		var batch_filter=fields.elements[3];
		var quantity_filter=fields.elements[4];
		var unit_filter=fields.elements[5];
		var amount_filter=fields.elements[6];
		var tax_filter=fields.elements[7];
		var storage_filter=fields.elements[8];
		var save_button=fields.elements[10];
		var tax_unit_filter=fields.elements[13];
		
		$(barcode_filter).focus();
		
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form114_create_item(fields);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form114_add_item();
		});

		var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
		set_my_value_list(products_data,name_filter); 
		
		var add_product=document.getElementById('form114_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal114_action(function()
			{	
				var products_data="<product_master>" +
					"<name></name>" +
					"</product_master>";
				set_my_value_list(products_data,name_filter); 
			});
		});

		var add_batch=document.getElementById('form114_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal120_action(function()
			{	
				var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			});	
		});
	
		var storage_data="<store_areas>"+
						"<name></name>"+
						"<area_type exact='yes'>"+get_session_var('storage_level')+"</area_type>"+
						"</store_areas>";
		set_my_value_list(storage_data,storage_filter);
		
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
			var desc_data="<product_master>" +
				"<description></description>" +
				"<name exact='yes'>"+name_filter.value+"</name>" +
				"</product_master>";
			set_my_value(desc_data,desc_filter);
			
			var batch_data="<product_instances>" +
				"<batch></batch>" +
				"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
				"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
			
			var tax_unit_data="<product_master>"+
							"<tax></tax>"+
							"<name exact='yes'>"+name_filter.value+"</name>"+
							"</product_master>";
			set_my_value(tax_unit_data,tax_unit_filter);
			
			var last_batch_data="<supplier_bill_items count='1'>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</supplier_bill_items>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0];				
					
					var its_storage_data="<supplier_bill_items>"+
							"<storage></storage>"+
							"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
							"<batch exact='yes'>"+batch_filter.value+"</batch>"+
							"</supplier_bill_items>";
					set_my_value(its_storage_data,storage_filter);					
					
					var mrp_data="<product_instances>"+
						"<mrp></mrp>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"<batch exact='yes'>"+batch_filter.value+"</batch>"+
						"</product_instances>";
					get_single_column_data(function(mrps)
					{
						var mrp_price=0;
						if(mrps.length>0)
						{
							mrp_price=parseFloat(mrps[0]);
						}
		
						var margin_data="<attributes>" +
									"<value></value>"+
									"<type exact='yes'>supplier</type>"+
									"<attribute exact='yes'>Margin</attribute>" +
									"<name exact='yes'>"+supplier_name+"</name>" +
									"</attributes>";
						get_single_column_data(function(margins)
						{
							if(margins.length>0)
							{
								var tax_factor=(100-parseFloat(tax_unit_filter.value))/100;
								unit_filter.value=my_round(tax_factor*(mrp_price*(100-parseFloat(margins[0]))/100),2);
								amount_filter.value=my_round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
								tax_filter.value=my_round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);			
							}
						},margin_data);					
					},mrp_data);			

				}				
			},last_batch_data);
			
		});
		
		$(batch_filter).on('blur',function(event)
		{
			var its_storage_data="<supplier_bill_items>"+
							"<storage></storage>"+
							"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
							"<batch exact='yes'>"+batch_filter.value+"</batch>"+
							"</supplier_bill_items>";
			set_my_value(its_storage_data,storage_filter);					

			var mrp_data="<product_instances>"+
						"<mrp></mrp>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"<batch exact='yes'>"+batch_filter.value+"</batch>"+
						"</product_instances>";
			get_single_column_data(function(mrps)
			{
				var mrp_price=0;
				if(mrps.length>0)
				{
					mrp_price=parseFloat(mrps[0]);
				}

				var margin_data="<attributes>" +
							"<value></value>"+
							"<type exact='yes'>supplier</type>"+
							"<attribute exact='yes'>Margin</attribute>" +
							"<name exact='yes'>"+supplier_name+"</name>" +
							"</attributes>";
				get_single_column_data(function(margins)
				{
					if(margins.length>0)
					{
						var tax_factor=(100-parseFloat(tax_unit_filter.value))/100;
						unit_filter.value=my_round(tax_factor*(mrp_price*(100-parseFloat(margins[0]))/100),2);
						amount_filter.value=my_round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
						tax_filter.value=my_round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);
					}
				},margin_data);					
			},mrp_data);			
		});
		
		$(quantity_filter).add(unit_filter).on('blur',function () 
		{
			amount_filter.value=my_round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
			tax_filter.value=my_round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Create Bill(loyalty)
 * @formNo 118
 */
function form118_add_item()
{
	var filter_fields=document.getElementById('form118_master');
	if(is_create_access('form118'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form118_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' required form='form118_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form118_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='form118_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' id='form118_add_batch_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' min='0' required form='form118_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Unit Price'>";
				rowsHTML+="<input type='number' required readonly='readonly' form='form118_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Total'>";
				rowsHTML+="<input type='number' required readonly='readonly' form='form118_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form118_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form118_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form118_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form118_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form118_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form118_"+id+"' id='save_form118_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form118_"+id+"' id='delete_form118_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form118_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form118_"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form118_"+id+"'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form118_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form118_"+id);
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
		var save_button=fields.elements[10];
		var free_product_filter=fields.elements[12];
		var free_product_quantity=fields.elements[13];
		
		
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form118_create_item(fields);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form118_add_item();
		});
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(product_data,name_filter,function () 
		{
			$(name_filter).focus();
		});
	
		var add_product=document.getElementById('form118_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(product_data,name_filter,function () 
				{
					$(name_filter).focus();
				});
			});
		});

		var add_batch=document.getElementById('form118_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal22_action(function()
			{	
				var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			});
		});
	
		$(name_filter).on('blur',function(event)
		{
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
			
			var last_batch_data="<bill_items count='1'>" +
					"<batch></batch>" +
					"<item_name exact='yes'>"+name_filter.value+"</item_name>" +
					"</bill_items>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0];
					var price_data="<product_instances count='1'>" +
						"<sale_price></sale_price>" +
						"<batch exact='yes'>"+batch_filter.value+"</batch>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"</product_instances>";
					set_my_value(price_data,price_filter);
						
					get_inventory(name_filter.value,batch_filter.value,function(quantity)
					{
						$(quantity_filter).attr('placeholder',quantity);
					});
				}
			},last_batch_data);
			
			quantity_filter.value="";
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			offer_filter.value="";
			free_product_filter.value="";
			free_product_quantity.value="";
		});
		
		$(batch_filter).on('blur',function(event)
		{
			var price_data="<product_instances count='1'>" +
					"<sale_price></sale_price>" +
					"<batch exact='yes'>"+batch_filter.value+"</batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value(price_data,price_filter);
			
			get_inventory(name_filter.value,batch_filter.value,function(quantity)
			{
				$(quantity_filter).attr('placeholder',quantity);
			});
			
			quantity_filter.value="";
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
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
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
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"<tax></tax>" +
						"</product_master>";
				fetch_requested_data('',tax_data,function(taxes)
				{
					taxes.forEach(function(tax)
					{
						tax_filter.value=parseFloat((parseFloat(tax.tax)*(amount-parseFloat(discount_filter.value)))/100);
					});
					
					total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value));
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
 * @form Create Bill(wholesale)
 * @formNo 119
 */
function form119_add_item()
{
	var filter_fields=document.getElementById('form119_master');
	var bill_type=filter_fields.elements[2].value;
	var customer_name=filter_fields.elements[1].value;
	
	if(is_create_access('form119'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form119_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Product Name'>";
				rowsHTML+="<label id='form119_product_make_"+id+"'></label>";
				rowsHTML+="<br><v2></v2><input type='text' required form='form119_"+id+"' name='product_name'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form119_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='form119_"+id+"' name='batch'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' id='form119_add_batch_"+id+"'>";
				rowsHTML+="<br><v2>Expiry: </v2><label id='form119_exp_"+id+"'></label>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<v1>Bought: </v1><input type='number' min='0' required form='form119_"+id+"' step='any' name='squantity'>";
				rowsHTML+="<br><v2>Free: </v2><input type='number' min='0' value='0' required form='form119_"+id+"' step='any' name='fquantity'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Price'>";
				rowsHTML+="<v1>Sale: </v1>Rs. <input type='number' required min='0' readonly='readonly' form='form119_"+id+"' step='any' name='unit_price'>";
				rowsHTML+="<br><v2>MRP: </v2>Rs. <input type='number' min='0' readonly='readonly' form='form119_"+id+"' step='any' name='mrp'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Total'>";
				rowsHTML+="<v1>Amount: </v1>Rs. <input type='number' required min='0' form='form119_"+id+"' readonly='readonly' step='any' name='amount'>";
				rowsHTML+="<input type='hidden' value='0' form='form119_"+id+"' readonly='readonly' name='discount'>";
				rowsHTML+="<br><v2>Tax: </v2>Rs. <input type='number' required min='0' value='0' form='form119_"+id+"' readonly='readonly' step='any' name='tax'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form119_"+id+"' name='total'>";
				rowsHTML+="<input type='hidden' form='form119_"+id+"' name='offer'>";
				rowsHTML+="<input type='hidden' form='form119_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form119_"+id+"' id='save_form119_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form119_"+id+"' id='delete_form119_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form119_"+id+"' name='free_product'>";
				rowsHTML+="<input type='hidden' form='form119_"+id+"' name='free_product_quantity'>";
				rowsHTML+="<input type='hidden' title='unbilled_item_id' form='form119_"+id+"' value='no'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form119_"+id+"'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form119_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form119_"+id);
		var name_filter=fields.elements[0];
		var batch_filter=fields.elements[1];
		var squantity_filter=fields.elements[2];
		var fquantity_filter=fields.elements[3];
		var price_filter=fields.elements[4];
		var mrp_filter=fields.elements[5];
		var amount_filter=fields.elements[6];
		var discount_filter=fields.elements[7];
		var tax_filter=fields.elements[8];
		var total_filter=fields.elements[9];
		var offer_filter=fields.elements[10];
		var id_filter=fields.elements[11];
		var save_button=fields.elements[12];
		var free_product_filter=fields.elements[14];
		var free_product_quantity=fields.elements[15];

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(product_data,name_filter,function () 
		{
			$(name_filter).focus();
		});

		var add_product=document.getElementById('form119_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(product_data,name_filter,function () 
				{
					$(name_filter).focus();
				});
			});
		});

		var add_batch=document.getElementById('form119_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal22_action(function()
			{	
				var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			});
		});

		$(name_filter).on('keydown',function(e)
		{
			if(e.keyCode==118)
			{
				e.preventDefault();
				modal53_action(name_filter.value,customer_name);
			}
			else if(e.keyCode==117)
			{
				e.preventDefault();
				modal54_action(name_filter.value);
			}
		});
		
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form119_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form119_add_item();
		});

		$(name_filter).on('blur',function(event)
		{
			var make_data="<product_master>" +
					"<make></make>" +
					"<name exact='yes'>"+name_filter.value+"</name>" +
					"</product_master>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					document.getElementById('form119_product_make_'+id).innerHTML=data[0]+":";
				}
			},make_data);
			
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
			
			var last_batch_data="<bill_items count='1'>" +
					"<batch></batch>" +
					"<item_name exact='yes'>"+name_filter.value+"</item_name>" +
					"</bill_items>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0];
					
					if(bill_type=='undefined' || bill_type=='')
					{
						var price_data="<product_instances count='1'>" +
							"<sale_price></sale_price>" +
							"<batch exact='yes'>"+batch_filter.value+"</batch>" +
							"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
							"</product_instances>";
						set_my_value(price_data,price_filter);
					}
					else
					{
						var price_data="<sale_prices count='1'>" +
								"<sale_price></sale_price>" +
								"<billing_type exact='yes'>"+bill_type+"</billing_type>" +
								"<batch exact='yes'>"+batch_filter.value+"</batch>" +
								"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
								"</sale_prices>";
						set_my_value(price_data,price_filter);
					}	
					get_inventory(name_filter.value,batch_filter.value,function(quantity)
					{
						$(squantity_filter).attr('placeholder',quantity);
					});
				
					var mrp_data="<product_instances count='1'>" +
							"<mrp></mrp>" +
							"<batch exact='yes'>"+batch_filter.value+"</batch>" +
							"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
							"</product_instances>";
					set_my_value(mrp_data,mrp_filter);
				}
			},last_batch_data);
			
			squantity_filter.value="";
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			offer_filter.value="";
			free_product_filter.value="";
			free_product_quantity.value="";
		});
		
		$(batch_filter).on('blur',function(event)
		{
			var exp_data="<product_instances>" +
					"<expiry></expiry>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"<batch exact='yes'>"+batch_filter.value+"</batch>" +
					"</product_instances>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					document.getElementById('form119_exp_'+id).innerHTML=get_my_past_date(data[0]);
				}
			},exp_data);
			
			if(bill_type=='undefined' || bill_type=='')
			{
				var price_data="<product_instances count='1'>" +
						"<sale_price></sale_price>" +
						"<batch exact='yes'>"+batch_filter.value+"</batch>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"</product_instances>";
				set_my_value(price_data,price_filter);
			}
			else
			{
				var price_data="<sale_prices count='1'>" +
						"<sale_price></sale_price>" +
						"<batch exact='yes'>"+batch_filter.value+"</batch>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"<billing_type>"+bill_type+"</billing_type>" +
						"</sale_prices>";
				set_my_value(price_data,price_filter);
			}
			
			var mrp_data="<product_instances count='1'>" +
					"<mrp></mrp>" +
					"<batch exact='yes'>"+batch_filter.value+"</batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value(mrp_data,mrp_filter);
			
			get_inventory(name_filter.value,batch_filter.value,function(quantity)
			{
				$(squantity_filter).attr('placeholder',quantity);
			});
			
			squantity_filter.value="";
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			offer_filter.value="";
			free_product_filter.value="";
			free_product_quantity.value="";
		});
		
		$(squantity_filter).on('blur',function(event)
		{
			var amount=my_round(parseFloat(squantity_filter.value)*parseFloat(price_filter.value),2);
			amount_filter.value=amount;
			var offer_data="<offers>" +
					"<offer_type>product</offer_type>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
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
					"<status array='yes'>--active--extended--</status>" +
					"</offers>";
			fetch_requested_data('',offer_data,function(offers)
			{
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
					if(offers[i].criteria_type=='min quantity crossed' && parseFloat(offers[i].criteria_quantity)<=parseFloat(squantity_filter.value))
					{
						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								discount_filter.value=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
							}
							else 
							{
								discount_filter.value=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(squantity_filter.value)/parseFloat(offers[i].criteria_quantity)));
							}
						}
						else if(offers[i].result_type=='quantity addition')
						{
							if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
							{
								fquantity_filter.value=parseFloat(squantity_filter.value)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
							}
							else 
							{
								fquantity_filter.value=parseFloat(squantity_filter.value)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(squantity_filter.value)/parseFloat(offers[i].criteria_quantity))));
							}
						}
						else if(offers[i].result_type=='product free')
						{
							free_product_filter.value=offers[i].free_product_name;
							free_product_quantity.value=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(squantity_filter.value)/parseFloat(offers[i].criteria_quantity)));
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
								fquantity_filter.value=parseFloat(squantity_filter.value)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
							}
							else 
							{
								fquantity_filter.value=parseFloat(squantity_filter.value)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount))));
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
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"<tax></tax>" +
						"</product_master>";
				fetch_requested_data('',tax_data,function(taxes)
				{
					taxes.forEach(function(tax)
					{
						tax_filter.value=my_round(parseFloat((parseFloat(tax.tax)*(amount-parseFloat(discount_filter.value)))/100),2);
					});
					
					total_filter.value=my_round((parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value)),2);
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
 * @form Adjust Loyalty Points
 * @formNo 121
 */
function form121_add_item()
{
	if(is_create_access('form121'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form121_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Program Name'>";
				rowsHTML+="<input type='text' form='form121_"+id+"' required value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+="<input type='text' form='form121_"+id+"' required value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Points'>";
				rowsHTML+="<input type='number' form='form121_"+id+"' required step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Date'>";
				rowsHTML+="<input type='text' form='form121_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Source'>";
				rowsHTML+="<input type='text' form='form121_"+id+"' value='Manual' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form121_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form121_"+id+"' id='save_form121_"+id+"' >";	
				rowsHTML+="<input type='button' class='delete_icon' form='form121_"+id+"' id='delete_form121_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form121_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form121_"+id);
		var name_filter=fields.elements[0];
		var customer_filter=fields.elements[1];
		var date_filter=fields.elements[3];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form121_create_item(fields);
		});
		
		var program_data="<loyalty_programs>" +
				"<name></name>" +
				"</loyalty_programs>";
		set_my_value_list_func(program_data,name_filter,function () 
		{
			$(name_filter).focus();
		});
		
		var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
		set_my_value_list(customer_data,customer_filter);
		$(date_filter).datepicker();
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}


/**
 * @form Enter Supplier Bill(unbilled items)
 * @formNo 122
 */
function form122_add_item()
{
	if(is_create_access('form122'))
	{
		var master_form=document.getElementById('form122_master');
		var supplier_name=master_form.elements['supplier'].value;
		var order_id=master_form.elements['order_id'].value;
		
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form122_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' form='form122_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new item' id='form122_add_product_"+id+"'>";
				rowsHTML+="<br>SKU: <input type='text' form='form122_"+id+"' required>";
				rowsHTML+="<br>Name: <input type='text' readonly='readonly' form='form122_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' form='form122_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add batch' id='form122_add_batch_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' form='form122_"+id+"' value='1' required step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Unit Price: Rs. <input type='number' form='form122_"+id+"' required step='any'>";
				rowsHTML+="<br>Amount: Rs. <input type='number' readonly='readonly' form='form122_"+id+"' required step='any'>";
				rowsHTML+="<br>Tax: Rs. <input type='number' readonly='readonly' form='form122_"+id+"' required step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Storage'>";
				rowsHTML+="<input type='text' form='form122_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form122_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form122_"+id+"' id='save_form122_"+id+"' >";	
				rowsHTML+="<input type='button' class='delete_icon' form='form122_"+id+"' id='delete_form122_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form122_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form122_"+id+"' name='tax_unit'>";
				rowsHTML+="<input type='hidden' form='form122_"+id+"' name='unbilled' value='no'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form122_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form122_"+id);
		var barcode_filter=fields.elements[0];
		var name_filter=fields.elements[1];
		var desc_filter=fields.elements[2];
		var batch_filter=fields.elements[3];
		var quantity_filter=fields.elements[4];
		var unit_filter=fields.elements[5];
		var amount_filter=fields.elements[6];
		var tax_filter=fields.elements[7];
		var storage_filter=fields.elements[8];
		var save_button=fields.elements[10];
		var tax_unit_filter=fields.elements[13];
		
		$(barcode_filter).focus();
		
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form122_create_item(fields);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form122_add_item();
		});

		var add_product=document.getElementById('form122_add_product_'+id);
		
		if(order_id!='' && order_id!='undefined')
		{
			var products_data="<purchase_order_items>" +
				"<item_name></item_name>" +
				"<order_id exact='yes'>"+order_id+"</order_id>"+
				"</purchase_order_items>";
			set_my_value_list(products_data,name_filter);
			
			$(add_product).hide();
		}
		else 
		{
			var products_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
			set_my_value_list(products_data,name_filter); 
		
			$(add_product).on('click',function()
			{
				modal122_action(function()
				{
					var products_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
					set_my_value_list(products_data,name_filter); 
				});
			});
		}
		
		var add_batch=document.getElementById('form122_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal120_action(function()
			{	
				var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			});	
		});
	
		var storage_data="<store_areas>"+
						"<name></name>"+
						"<area_type exact='yes'>"+get_session_var('storage_level')+"</area_type>"+
						"</store_areas>";
		set_my_value_list(storage_data,storage_filter);
		
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
			var desc_data="<product_master>" +
				"<description></description>" +
				"<name exact='yes'>"+name_filter.value+"</name>" +
				"</product_master>";
			set_my_value(desc_data,desc_filter);
			
			var batch_data="<product_instances>" +
				"<batch></batch>" +
				"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
				"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
			
			var tax_unit_data="<product_master>"+
							"<tax></tax>"+
							"<name exact='yes'>"+name_filter.value+"</name>"+
							"</product_master>";
			set_my_value(tax_unit_data,tax_unit_filter);
			
			var last_batch_data="<supplier_bill_items count='1'>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</supplier_bill_items>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0];				
					
					var its_storage_data="<supplier_bill_items>"+
							"<storage></storage>"+
							"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
							"<batch exact='yes'>"+batch_filter.value+"</batch>"+
							"</supplier_bill_items>";
					set_my_value(its_storage_data,storage_filter);					
					
					var mrp_data="<product_instances>"+
						"<mrp></mrp>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"<batch exact='yes'>"+batch_filter.value+"</batch>"+
						"</product_instances>";
					get_single_column_data(function(mrps)
					{
						var mrp_price=0;
						if(mrps.length>0)
						{
							mrp_price=parseFloat(mrps[0]);
						}
		
						var margin_data="<attributes>" +
									"<value></value>"+
									"<type exact='yes'>supplier</type>"+
									"<attribute exact='yes'>Margin</attribute>" +
									"<name exact='yes'>"+supplier_name+"</name>" +
									"</attributes>";
						get_single_column_data(function(margins)
						{
							if(margins.length>0)
							{
								var tax_factor=(100-parseFloat(tax_unit_filter.value))/100;
								unit_filter.value=my_round(tax_factor*(mrp_price*(100-parseFloat(margins[0]))/100),2);
								amount_filter.value=my_round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
								tax_filter.value=my_round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);			
							}
						},margin_data);					
					},mrp_data);			

				}				
			},last_batch_data);
			
		});
		
		$(batch_filter).on('blur',function(event)
		{
			var its_storage_data="<supplier_bill_items>"+
							"<storage></storage>"+
							"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
							"<batch exact='yes'>"+batch_filter.value+"</batch>"+
							"</supplier_bill_items>";
			set_my_value(its_storage_data,storage_filter);					

			var mrp_data="<product_instances>"+
						"<mrp></mrp>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"<batch exact='yes'>"+batch_filter.value+"</batch>"+
						"</product_instances>";
			get_single_column_data(function(mrps)
			{
				var mrp_price=0;
				if(mrps.length>0)
				{
					mrp_price=parseFloat(mrps[0]);
				}

				var margin_data="<attributes>" +
							"<value></value>"+
							"<type exact='yes'>supplier</type>"+
							"<attribute exact='yes'>Margin</attribute>" +
							"<name exact='yes'>"+supplier_name+"</name>" +
							"</attributes>";
				get_single_column_data(function(margins)
				{
					if(margins.length>0)
					{
						var tax_factor=(100-parseFloat(tax_unit_filter.value))/100;
						unit_filter.value=my_round(tax_factor*(mrp_price*(100-parseFloat(margins[0]))/100),2);
						amount_filter.value=my_round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
						tax_filter.value=my_round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);
					}
				},margin_data);					
			},mrp_data);			
		});
		
		$(quantity_filter).add(unit_filter).on('blur',function () 
		{
			amount_filter.value=my_round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
			tax_filter.value=my_round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Mandatory Attributes
 * @formNo 123
 */
function form123_add_item()
{
	if(is_create_access('form123'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form123_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Object'>";
				rowsHTML+="<input type='text' form='form123_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Attribute'>";
				rowsHTML+="<input type='text' form='form123_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Attribute'>";
				rowsHTML+="<textarea form='form123_"+id+"' title='Specify a list separated by semicolon(;). Or leave blank if any text is applicable'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form123_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form123_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form123_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form123_"+id+"' onclick='$(this).parent().parent().remove();'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form123_body').prepend(rowsHTML);
		var fields=document.getElementById("form123_"+id);
		var object_filter=fields.elements[0];
		var attribute_filter=fields.elements[1];
		var status_filter=fields.elements[3];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form123_create_item(fields);
		});
				
		set_static_value_list('mandatory_attributes','object',object_filter,function()
		{
			$(object_filter).focus();		
		});
		set_static_value_list('mandatory_attributes','status',status_filter);
		$('textarea').autosize();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Customer Accounts
 * @formNo 125
 */
function form125_add_item()
{
	if(is_create_access('form125'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form125_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+="<input type='text' form='form125_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Username'>";
				rowsHTML+="<input type='text' form='form125_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Password'>";
				rowsHTML+="<input type='password' form='form125_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form125_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form125_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form125_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form125_"+id+"' onclick='$(this).parent().parent().remove();'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form125_body').prepend(rowsHTML);
		var fields=document.getElementById("form125_"+id);
		var customer_filter=fields.elements[0];
		var username_filter=fields.elements[1];
		var status_filter=fields.elements[3];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form125_create_item(fields);
		});
				
		var customer_data="<customers>"+
								"<acc_name></acc_name>"+
								"</customers>";
		set_my_value_list_func(customer_data,customer_filter,function () 
		{
			$(customer_filter).focus();
		});
		set_static_value_list('accounts','status',status_filter);

	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form New Bill
 * @formNo 130
 */
function form130_add_product()
{
	if(is_create_access('form130'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form130_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item Name'>";
				rowsHTML+="<input type='text' required form='form130_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form130_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='form130_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' id='form130_add_batch_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form130_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Unit Price'>";
				rowsHTML+="<input type='number' required form='form130_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Total'>";
				rowsHTML+="<input type='number' required form='form130_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form130_"+id+"' id='save_form130_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form130_"+id+"' id='delete_form130_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form130_"+id+"'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form130_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form130_"+id);
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
		var save_button=fields.elements[10];
		var free_product_filter=fields.elements[12];
		var free_product_quantity=fields.elements[13];
		var free_service_filter=fields.elements[14];
				
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form130_create_item(fields);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form130_add_product();
		});
				
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(product_data,name_filter,function () 
		{
			$(name_filter).focus();
		});

		var add_product=document.getElementById('form130_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(product_data,name_filter,function () 
				{
					$(name_filter).focus();
				});
			});
		});

		var add_batch=document.getElementById('form130_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal22_action(function()
			{	
				var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			});
		});
		
		$(name_filter).on('blur',function(event)
		{
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
			
			var last_batch_data="<bill_items count='1'>" +
					"<batch></batch>" +
					"<item_name exact='yes'>"+name_filter.value+"</item_name>" +
					"</bill_items>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0];
				
				
					var price_data="<product_instances count='1'>" +
							"<sale_price></sale_price>" +
							"<batch exact='yes'>"+batch_filter.value+"</batch>" +
							"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
							"</product_instances>";
					set_my_value(price_data,price_filter);
					
					get_inventory(name_filter.value,batch_filter.value,function(quantity)
					{
						//$(quantity_filter).attr('max',quantity);
						$(quantity_filter).attr('min',"0");
						$(quantity_filter).attr('placeholder',quantity);
					});
				}				
			},last_batch_data);
			
			quantity_filter.value="";
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
			var price_data="<product_instances count='1'>" +
					"<sale_price></sale_price>" +
					"<batch exact='yes'>"+batch_filter.value+"</batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value(price_data,price_filter);
			
			get_inventory(name_filter.value,batch_filter.value,function(quantity)
			{
				//$(quantity_filter).attr('max',quantity);
				$(quantity_filter).attr('min',"0");
				$(quantity_filter).attr('placeholder',quantity);
			});
			
			quantity_filter.value="";
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
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
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
						"<tax></tax>" +
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"</product_master>";
				get_single_column_data(function(taxes)
				{
					taxes.forEach(function(tax)
					{
						tax_filter.value=parseFloat((parseFloat(tax)*(amount-parseFloat(discount_filter.value)))/100);
					});
					
					total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);
				},tax_data);
				
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
 * @formNo 130
 */
function form130_add_service()
{
	if(is_create_access('form130'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form130_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' required form='form130_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new service' id='form130_add_service_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Person'>";
				rowsHTML+="<input type='text' form='form130_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new staff' id='form130_add_staff_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Notes'>";
				rowsHTML+="<textarea form='form130_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Unit Price'>";
				rowsHTML+="<input type='number' required form='form130_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Total'>";
				rowsHTML+="<input type='number' required form='form130_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form130_"+id+"' id='save_form130_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form130_"+id+"' id='delete_form130_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form130_"+id+"'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form130_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form130_"+id);
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
		var save_button=fields.elements[10];
		var free_product_filter=fields.elements[12];
		var free_product_quantity=fields.elements[13];
		var free_service_filter=fields.elements[14];
				
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form130_create_item(fields);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form130_add_service();
		});
				
		var service_data="<services>" +
				"<name></name>" +
				"</services>";
		set_my_value_list_func(service_data,name_filter,function () 
		{
			$(name_filter).focus();
		});
		
		var staff_data="<staff>" +
				"<acc_name></acc_name>" +
				"<status exact='yes'>active</status>" +
				"</staff>";
		set_my_value_list(staff_data,staff_filter);

		var add_service=document.getElementById('form130_add_service_'+id);
		$(add_service).on('click',function()
		{
			modal20_action(function()
			{	
				var service_data="<services>" +
						"<name></name>" +
						"</services>";
				set_my_value_list_func(service_data,name_filter,function () 
				{
					$(name_filter).focus();
				});
			});
		});

		var add_staff=document.getElementById('form130_add_staff_'+id);
		$(add_staff).on('click',function()
		{
			modal16_action(function()
			{	
				var staff_data="<staff>" +
						"<acc_name></acc_name>" +
						"<status exact='yes'>active</status>" +
						"</staff>";
				set_my_value_list(staff_data,staff_filter);
			});
		});
		
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
					"<name exact='yes'>"+name_filter.value+"</name>" +
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
							"<criteria_type>min amount crossed</criteria_type>" +
							"<criteria_amount upperbound='yes'>"+amount+"</criteria_amount>" +
							"<service exact='yes'>"+name_filter.value+"</service>" +
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

/**
 * @form Service Dashboard - machine
 * @formNo 134
 */
function form134_add_machine()
{
	if(is_create_access('form134'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form134_machine_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Machine Type'>";
				rowsHTML+="<input type='text' form='form134_machine_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Machine'>";
				rowsHTML+="<input type='text' form='form134_machine_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Problem'>";
				rowsHTML+="<textarea form='form134_machine_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Closing Notes'>";
				rowsHTML+="<textarea form='form134_machine_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form134_machine_"+id+"' value='open' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form134_machine_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form134_machine_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form134_machine_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form134_machine_body').prepend(rowsHTML);
		var fields=document.getElementById("form134_machine_"+id);
		var type_filter=fields.elements[0];
		var machine_filter=fields.elements[1];
		var status_filter=fields.elements[4];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form134_create_machine(fields);
		});
				
		set_static_filter('service_request_machines','machine_type',type_filter);
		set_static_filter('service_request_machines','machine',machine_filter);
		set_static_value_list('service_request_machines','status',status_filter);

		$(type_filter).focus();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Service Dashboard - team
 * @formNo 134
 */
function form134_add_team()
{
	if(is_create_access('form134'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form134_team_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Assignee'>";
				rowsHTML+="<input type='text' form='form134_team_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Phone'>";
				rowsHTML+="<input type='text' form='form134_team_"+id+"' readonly='readonly'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Email'>";
				rowsHTML+="<textarea form='form134_team_"+id+"' readonly='readonly'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form134_team_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form134_team_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form134_team_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form134_team_body').prepend(rowsHTML);
		var fields=document.getElementById("form134_team_"+id);
		var assignee_filter=fields.elements[0];
		var phone_filter=fields.elements[1];
		var email_filter=fields.elements[2];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form134_create_team(fields);
		});
		
		var assignee_data="<staff>"+
							"<acc_name></acc_name>"+							
							"</staff>";		
		set_my_value_list_func(assignee_data,assignee_filter,function () 
		{
			$(assignee_filter).focus();
		});

		$(assignee_filter).off('blur');
		$(assignee_filter).on('blur',function ()
		{
			var contact_data="<staff>"+
								"<phone></phone>"+
								"<email></email>"+
								"<acc_name exact='yes'>"+assignee_filter.value+"</acc_name>"+
								"</staff>";
			fetch_requested_data('',contact_data,function(contacts)
			{
				if(contacts.length>0)
				{
					phone_filter.value=contacts[0].phone;
					email_filter.value=contacts[0].email;
				}
			});
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Service Dashboard - document
 * @formNo 134
 */
function form134_add_document()
{
	if(is_create_access('form134'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form134_document_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Document Name'>";
				rowsHTML+="<input type='text' form='form134_document_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='File'>";
				rowsHTML+="<a id='form134_document_url_"+id+"'><u>link</u></a><input type='file' form='form134_document_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form134_document_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form134_document_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form134_document_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form134_document_body').prepend(rowsHTML);
		var fields=document.getElementById("form134_document_"+id);
		var name_filter=fields.elements[0];
		var docInfo=document.getElementById('form134_document_url_'+id);
		var fpicture=fields.elements[1];
					
		fpicture.addEventListener('change',function(evt)
		{
			select_document(evt,function(dataURL)
			{
				docInfo.setAttribute('href',dataURL);
			});
		},false);

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form134_create_document(fields);
		});
		
		$(name_filter).focus();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Service Dashboard - task
 * @formNo 134
 */
function form134_add_task()
{
	if(is_create_access('form134'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form134_task_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Task'>";
				rowsHTML+="<textarea form='form134_task_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Assignee'>";
				rowsHTML+="<input type='text' form='form134_task_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Due By'>";
				rowsHTML+="<input type='text' form='form134_task_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='status'>";
				rowsHTML+="<input type='text' form='form134_task_"+id+"' value='pending'>";
			rowsHTML+="</td>";			
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form134_task_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form134_task_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form134_task_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form134_task_body').prepend(rowsHTML);
		var fields=document.getElementById("form134_task_"+id);
		var desc_filter=fields.elements[0];
		var assignee_filter=fields.elements[1];
		var due_filter=fields.elements[2];
		var status_filter=fields.elements[3];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form134_create_task(fields);
		});
		
		$(desc_filter).focus();
									
		var assignee_data="<staff>"+
							"<acc_name></acc_name>"+							
							"</staff>";		
		set_my_value_list(assignee_data,assignee_filter);
		set_static_value_list('task_instances','status',status_filter);
		$(due_filter).datepicker();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Project Dashboard - task
 * @formNo 135
 */
function form135_add_task()
{
	if(is_create_access('form135'))
	{
		var fields=document.getElementById('form135_master');
		var project_id=fields.elements[4].value;

		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form135_task_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Phase'>";
				rowsHTML+="<input type='text' form='form135_task_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Task'>";
				rowsHTML+="<textarea form='form135_task_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Assignee'>";
				rowsHTML+="<input type='text' form='form135_task_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Due By'>";
				rowsHTML+="<input type='text' form='form135_task_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form135_task_"+id+"' value='pending'>";
			rowsHTML+="</td>";			
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form135_task_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form135_task_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form135_task_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form135_task_body').prepend(rowsHTML);
		var fields=document.getElementById("form135_task_"+id);
		var name_filter=fields.elements[0];
		var assignee_filter=fields.elements[2];
		var due_filter=fields.elements[3];
		var status_filter=fields.elements[4];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form135_create_task(fields);
		});
		
		var phase_data="<project_phases>"+
						"<phase_name></phase_name>"+
						"<project_id exact='yes'>"+project_id+"</project_id>"+
						"</project_phases>";
		set_my_value_list_func(phase_data,name_filter,function () 
		{
			$(name_filter).focus();
		});
							
		var assignee_data="<staff>"+
						"<acc_name></acc_name>"+							
						"<status exact='yes'>active</status>"+						
						"</staff>";		
		set_my_value_list(assignee_data,assignee_filter);
		set_static_value_list('task_instances','status',status_filter);
		$(due_filter).datepicker();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Project Dashboard - document
 * @formNo 135
 */
function form135_add_document()
{
	if(is_create_access('form135'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form135_document_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Document Name'>";
				rowsHTML+="<input type='text' form='form135_document_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='File'>";
				rowsHTML+="<a id='form135_document_url_"+id+"'><u>link</u></a><input type='file' form='form135_document_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form135_document_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form135_document_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form135_document_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form135_document_body').prepend(rowsHTML);
		var fields=document.getElementById("form135_document_"+id);
		var name_filter=fields.elements[0];
		var docInfo=document.getElementById('form135_document_url_'+id);
		var fpicture=fields.elements[1];
					
		fpicture.addEventListener('change',function(evt)
		{
			select_document(evt,function(dataURL)
			{
				docInfo.setAttribute('href',dataURL);
			});
		},false);

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form135_create_document(fields);
		});
		
		$(name_filter).focus();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project Dashboard - team
 * @formNo 135
 */
function form135_add_team()
{
	if(is_create_access('form135'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form135_team_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Member'>";
				rowsHTML+="<input type='text' form='form135_team_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Role'>";
				rowsHTML+="<textarea form='form135_team_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Notes'>";
				rowsHTML+="<textarea form='form135_team_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form135_team_"+id+"' required value='active'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form135_team_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form135_team_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form135_team_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form135_team_body').prepend(rowsHTML);
		var fields=document.getElementById("form135_team_"+id);
		var member_filter=fields.elements[0];
		var status_filter=fields.elements[3];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form135_create_team(fields);
		});
		
		var member_data="<staff>"+
							"<acc_name></acc_name>"+							
							"</staff>";		
		set_my_value_list_func(member_data,member_filter,function () 
		{
			$(member_filter).focus();
		});
		set_static_value_list('project_team','status',status_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Enter Supplier Bill (wholesale)
 * @formNo 136
 */
function form136_add_item()
{
	if(is_create_access('form136'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form136_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Product Name'>";
				rowsHTML+="<input type='text' required form='form136_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form136_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='form136_"+id+"'></br>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' id='form136_add_batch_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="Bought: <input type='number' step='any' required form='form136_"+id+"'>";
				rowsHTML+="<br>Free: <input type='number' step='any' required form='form136_"+id+"' value='0'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Unit Price: <input type='number' form='form136_"+id+"' step='any'>";
				rowsHTML+="<br>Tax: <input type='number' readonly='readonly' form='form136_"+id+"' value='' step='any'>";
				rowsHTML+="<br>Total: <input type='number' readonly='readonly' required form='form136_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Storage Area'>";
				rowsHTML+="<input type='text' form='form136_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new storage' id='form136_add_storage_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form136_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form136_"+id+"' id='save_form136_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form136_"+id+"' id='delete_form136_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form136_"+id+"' step='any'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form136_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";
	
		$('#form136_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form136_"+id);
		var name_filter=fields.elements[0];
		var batch_filter=fields.elements[1];
		var pquantity_filter=fields.elements[2];
		var fquantity_filter=fields.elements[3];
		var price_filter=fields.elements[4];
		var tax_filter=fields.elements[5];
		var total_filter=fields.elements[6];
		var storage_filter=fields.elements[7];
		var id_filter=fields.elements[8];
		var save_button=fields.elements[9];
		var tax_unit_filter=fields.elements[11];
		
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form136_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form136_add_item();
		});
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(product_data,name_filter,function () 
		{
			$(name_filter).focus();
		});

		
		var add_product=document.getElementById('form136_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(product_data,name_filter,function () 
				{
					$(name_filter).focus();
				});
			});
		});

		var add_batch=document.getElementById('form136_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal22_action(function()
			{	
				var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			});
		});

		var add_storage=document.getElementById('form136_add_storage_'+id);
		$(add_storage).on('click',function()
		{
			modal35_action(function()
			{	
				var storage_data="<store_areas>" +
							"<name></name>" +
							"<area_type exact='yes'>storage</area_type>" +
							"</store_areas>";
				set_my_value_list(storage_data,storage_filter);
			});
		});

		var storage_data="<store_areas>" +
					"<name></name>" +
					"<owner></owner>"+					
					"<area_type exact='yes'>storage</area_type>" +
					"</store_areas>";
		fetch_requested_data('',storage_data,function(storages) 
		{
			var form=fields;
			var datalist=document.createElement('datalist');
			var element_array=[];
			storages.forEach(function(d)
			{
				var option=document.createElement('option');
				option.setAttribute('value',d.name);
				element_array.push(d.name);
				datalist.appendChild(option);
				if(d.owner==get_account_name())
				{
					storage_filter.value=d.name;
				}
			});
			
			var list_id=storage_filter.getAttribute('list');
			if(list_id=='' || list_id==null)
			{
				list_id="list_"+get_new_key();
				storage_filter.setAttribute("list",list_id);
			}
			else
			{
				var oldlist=document.getElementById(list_id);
				form.removeChild(oldlist);
			}
			
			form.appendChild(datalist);
			datalist.setAttribute('id',list_id);
			
			$(storage_filter).off("change");
			$(storage_filter).on("change",function(event)
			{
				var found = $.inArray($(this).val(), element_array) > -1;
				if(!found)
				{
		            $(this).val('');
		        }
			});
		});
		
		set_my_value_list_func(storage_data,storage_filter,function()
		{
			var store_value_data="<store_areas count='1'>" +
				"<name></name>" +
				"<owner>"+get_account_name()+"</owner>"+
				"<area_type exact='yes'>storage</area_type>" +
				"</store_areas>";
			set_my_value(store_value_data,storage_filter);
		});

		$(name_filter).on('blur',function(event)
		{
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
			
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
			
			batch_filter.value="";
		});
		
		$(pquantity_filter).on('blur',function(event)
		{
			tax_filter.value=my_round((parseFloat(tax_unit_filter.value)*parseFloat(pquantity_filter.value)*parseFloat(price_filter.value)/100),2);
			var total=(parseFloat(price_filter.value)*parseFloat(pquantity_filter.value))+parseFloat(tax_filter.value);
			total_filter.value=my_round(total,2);
		});
		$(price_filter).on('blur',function(event)
		{
			tax_filter.value=my_round((parseFloat(tax_unit_filter.value)*parseFloat(pquantity_filter.value)*parseFloat(price_filter.value)/100),2);
			var total=(parseFloat(price_filter.value)*parseFloat(pquantity_filter.value))+parseFloat(tax_filter.value);
			total_filter.value=my_round(total,2);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project expenses
 * @formNo 137
 */
function form137_add_item()
{
	if(is_create_access('form137'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form137_rows_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Person'>";
				rowsHTML+="<input type='text' form='form137_rows_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Rs. <input type='number' step='any' form='form137_rows_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<textarea form='form137_rows_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Date'>";
				rowsHTML+="<input type='text' readonly='readonly' form='form137_rows_"+id+"' value='"+get_my_date()+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' readonly='readonly' form='form137_rows_"+id+"' value='submitted'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form137_rows_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form137_rows_"+id+"' id='save_form137_"+id+"' >";	
				rowsHTML+="<input type='button' class='delete_icon' form='form137_rows_"+id+"' onclick='$(this).parent().parent().remove(); form137_get_totals();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form137_body').prepend(rowsHTML);
		var fields=document.getElementById("form137_rows_"+id);
		var person_filter=fields.elements[0];
		var amount_filter=fields.elements[1];
		var date_filter=fields.elements[3];
		var status_filter=fields.elements[4];
		
		$(date_filter).datepicker();
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form137_create_item(fields);
		});
		
		if(is_update_access('form137'))
		{
			var person_data="<staff>"+
							"<acc_name></acc_name>"+
							"</staff>";
			set_my_value_list_func(person_data,person_filter,function () 
			{
				$(person_filter).focus();
			});
		}
		else
		{
			person_filter.value=get_account_name();
			person_filter.setAttribute('readonly','readonly');
			$(amount_filter).focus();
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Customer profiling
 * @formNo 139
 */
function form139_add_item()
{
	if(is_create_access('form139'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form139_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+="<input type='text' form='form139_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Facility'>";
				rowsHTML+="<textarea form='form139_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Location'>";
				rowsHTML+="<textarea form='form139_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Area'>";
				rowsHTML+="<textarea form='form139_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Floors'>";
				rowsHTML+="<input type='number' step='any' form='form139_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form139_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form139_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form139_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form139_body').prepend(rowsHTML);
		var fields=document.getElementById("form139_"+id);
		var customer_filter=fields.elements[0];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form139_create_item(fields);
		});
		
		var person_data="<customers>"+
						"<acc_name></acc_name>"+
						"</customers>";
		set_my_value_list_func(person_data,customer_filter,function () 
		{
			$(customer_filter).focus();
		});

	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Supplier profiling
 * @formNo 140
 */
function form140_add_item()
{
	if(is_create_access('form140'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form140_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Supplier'>";
				rowsHTML+="<input type='text' form='form140_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Asset Type'>";
				rowsHTML+="<input type='text' form='form140_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Description'>";
				rowsHTML+="<textarea form='form140_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Location'>";
				rowsHTML+="<textarea form='form140_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Notes'>";
				rowsHTML+="<textarea form='form140_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form140_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form140_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form140_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form140_body').prepend(rowsHTML);
		var fields=document.getElementById("form140_"+id);
		var supplier_filter=fields.elements[0];
		var type_filter=fields.elements[1];
				
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form140_create_item(fields);
		});
		
		var person_data="<suppliers>"+
						"<acc_name></acc_name>"+
						"</suppliers>";
		set_my_value_list_func(person_data,supplier_filter,function () 
		{
			$(supplier_filter).focus();
		});

		set_static_value_list('assets','type',type_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create Questionnaire
 * @formNo 142
 */
function form142_add_item()
{
	if(is_create_access('form142'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form142_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' required form='form142_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Description'>";
				rowsHTML+="<textarea form='form142_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Type'>";
				rowsHTML+="<input type='text' required form='form142_"+id+"'>";
				rowsHTML+="<br><label>Values: <textarea type='text' title='Add list segregated by semicolon and specify numerical values using colon' form='form142_"+id+"'></textarea></label>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="Order: <input type='number' required form='form142_"+id+"'>";
				rowsHTML+="Weight: <input type='number' step='any' required form='form142_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Required'>";
				rowsHTML+="<input type='checkbox' form='form142_"+id+"'>";			
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form142_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form142_"+id+"' id='save_form142_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form142_"+id+"' id='delete_form142_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form142_"+id+"'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form142_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form142_"+id);
		var name_filter=fields.elements[0];
		var type_filter=fields.elements[2];
		var values_filter=fields.elements[3];
		var save_button=fields.elements[8];

		$(name_filter).focus();
		$(values_filter).parent().hide();		
				
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form142_create_item(fields);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form142_add_item();
		});			
		
		set_static_value_list('ques_fields','type',type_filter);
				
		$(type_filter).on('blur',function(event)
		{
			if(type_filter.value=='value list' || type_filter.value=='dynamic value list')
			{
				$(values_filter).parent().show();
			}
			else
			{
				$(values_filter).parent().hide();
			}
		});		
		$('textarea').autosize();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project Budgeting - expenses
 * @formNo 144
 */
function form144_add_expense()
{
	if(is_create_access('form144'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form144_expense_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Person'>";
				rowsHTML+="<input type='text' form='form144_expense_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Rs. <input type='number' form='form144_expense_"+id+"' min='0' step='any' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Detail'>";
				rowsHTML+="<textarea form='form144_expense_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form144_expense_"+id+"' value='submitted'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form144_expense_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form144_expense_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form144_expense_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form144_expense_body').prepend(rowsHTML);
		var fields=document.getElementById("form144_expense_"+id);
		var person_filter=fields.elements[0];
		var status_filter=fields.elements[3];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form144_create_expense(fields);
		});
		
		var person_data="<staff>"+
						"<acc_name></acc_name>"+
						"</staff>";
		set_my_value_list_func(person_data,person_filter,function () 
		{
			$(person_filter).focus();
		});

		set_static_value_list('expenses','status',status_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Store movement
 * @formNo 145
 */
function form145_add_item()
{
	if(is_create_access('form145'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form145_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' required form='form145_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form145_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' form='form145_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' id='form145_add_batch_"+id+"'>";			
				rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form145_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Store'>";
				rowsHTML+="Source: <input type='text' required form='form145_"+id+"'>";
				rowsHTML+="<br>Target: <input type='text' required form='form145_"+id+"'>";				
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' readonly='readonly' required form='form145_"+id+"' value='pending'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form145_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='hidden' form='form145_"+id+"' required name='receiver'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form145_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form145_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='button' class='generic_icon' form='form145_"+id+"' value='Dispatch' onclick='form145_dispatch_item($(this));'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form145_body').prepend(rowsHTML);
		var fields=document.getElementById("form145_"+id);
		var product_filter=fields.elements[0];
		var batch_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var source_filter=fields.elements[3];
		var target_filter=fields.elements[4];
		var status_filter=fields.elements[5];
		var receiver_filter=fields.elements[7];
		var save_button=fields.elements[8];
		var dispatch_button=fields.elements[10];
		
		$(dispatch_button).hide();
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			var receiver_data="<store_areas>" +
				"<owner></owner>"+				
				"<area_type exact='yes'>storage</area_type>" +
				"<name exact='yes'>"+target_filter.value+"</name>" +
				"</store_areas>";
			//console.log(receiver_data);			
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					receiver_filter.value=data[0];
				}
				form145_create_item(fields);
			},receiver_data);				
		});
				
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(product_data,product_filter,function () 
		{
			$(product_filter).focus();
		});

		var add_product=document.getElementById('form145_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(product_data,product_filter,function () 
				{
					$(product_filter).focus();
				});
			});
		});

		var add_batch=document.getElementById('form145_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal22_action(function()
			{	
				var batch_data="<product_instances>" +
						"<batch></batch>" +
						"<product_name exact='yes'>"+product_filter.value+"</product_name>" +
						"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			});
		});
		
		$(product_filter).on('blur',function(event)
		{
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+product_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);
		});		

		var storage_level=get_session_var('storage_level');
				
		var source_data="<store_areas>" +
				"<name></name>" +
				"<owner>"+get_account_name()+"</owner>"+
				"<area_type exact='yes'>"+storage_level+"</area_type>" +
				"</store_areas>";
		set_my_value_list(source_data,source_filter);

		$(source_filter).on('blur',function () 
		{
			get_store_inventory(source_filter.value,product_filter.value,batch_filter.value,function(inventory)
			{
				$(quantity_filter).attr('max',inventory);
			});
		});

		var target_data="<store_areas>" +
				"<name></name>" +
				"<area_type exact='yes'>"+storage_level+"</area_type>" +
				"</store_areas>";
		set_my_value_list(target_data,target_filter);

		set_static_value_list('store_movement','status',status_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manufacturing
 * @formNo 146
 */
function form146_add_item()
{
	if(is_create_access('form146'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form146_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Product'>";
				rowsHTML+="<input type='text' form='form146_"+id+"' required value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form146_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<textarea form='form146_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' form='form146_"+id+"' step='any' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Schedule'>";
				rowsHTML+="<input type='text' form='form146_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' readonly='readonly' required form='form146_"+id+"' value='scheduled'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form146_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form146_"+id+"' title='Save'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form146_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form146_"+id+"'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";

		$('#form146_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));
		
		var fields=document.getElementById("form146_"+id);
		var product_filter=fields.elements[0];
		var schedule_filter=fields.elements[3];
		var status_filter=fields.elements[4];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form146_create_item(fields);
		});
					
		var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
		set_my_value_list_func(products_data,product_filter,function () 
		{
			$(product_filter).focus();
		});

		var add_product=document.getElementById('form146_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{	
				var products_data="<product_master>" +
					"<name></name>" +
					"</product_master>";
				set_my_value_list_func(product_data,product_filter,function () 
				{
					$(product_filter).focus();
				});
			});
		});
		
		//set_static_value_list('manufacturing_schedule','status',status_filter);
		$(schedule_filter).datepicker();
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Manage Roles
 * @formNo 147
 */
function form147_add_item()
{
	if(is_create_access('form147'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form147_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Role'>";
				rowsHTML+="<input type='text' form='form147_"+id+"' required value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Description'>";
				rowsHTML+="<textarea form='form147_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' required form='form147_"+id+"' value='active'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form147_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form147_"+id+"' title='Save'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form147_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";

		$('#form147_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));
		
		var fields=document.getElementById("form147_"+id);
		var status_filter=fields.elements[2];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form147_create_item(fields);
		});
					
		set_static_value_list('roles','status',status_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Assign Roles
 * @formNo 149
 */
function form149_add_item()
{
	if(is_create_access('form149'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form149_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Role'>";
				rowsHTML+="<input type='text' form='form149_"+id+"' required value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Username'>";
				rowsHTML+="<input type='text' form='form149_"+id+"' required value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' required form='form149_"+id+"' value='active'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form149_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form149_"+id+"' title='Save'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form149_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";

		$('#form149_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));
		
		var fields=document.getElementById("form149_"+id);
		var role_filter=fields.elements[0];
		var user_filter=fields.elements[1];
		var status_filter=fields.elements[2];
		
		var role_data="<roles>"+
						"<role_name></role_name>"+						
						"</roles>";
		set_my_value_list(role_data,role_filter);		
		
		var user_data="<accounts>"+
						"<username></username>"+						
						"</accounts>";
		set_my_value_list(user_data,user_filter);		
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form149_create_item(fields);
		});
					
		set_static_value_list('user_role_mapping','status',status_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}


/**
 * @form Service Request billing - item
 * @formNo 151
 */
function form151_add_item()
{
	if(is_create_access('form151'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form151_item_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item Name'>";
				rowsHTML+="<input type='text' form='form151_item_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' form='form151_item_"+id+"' min='0' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Estimated Rs. <input type='number' form='form151_item_"+id+"' min='0' readonly='readonly'>";
				rowsHTML+="<br>Actual Rs. <input type='number' form='form151_item_"+id+"' min='0'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form151_item_"+id+"' readonly='readonly' value='requested'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form151_item_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form151_item_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form151_item_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form151_item_"+id+"' value='"+id+"' name='price'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form151_item_body').prepend(rowsHTML);
		var fields=document.getElementById("form151_item_"+id);
		var item_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var est_filter=fields.elements[2];
		var amount_filter=fields.elements[3];
		var status_filter=fields.elements[4];
		var price_filter=fields.elements[8];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form151_create_item(fields);
		});
		
		var item_data="<product_master>"+
					"<name></name>"+
					"</product_master>";
		set_my_value_list_func(item_data,item_filter,function () 
		{
			$(item_filter).focus();
		});
		
		$(item_filter).on('blur',function () 
		{
			var price_data="<product_instances>"+
							"<sale_price></sale_price>"+
							"<product_name exact='yes'>"+item_filter.value+"</product_name>"+
							"</product_instances>";
			get_single_column_data(function(prices)
			{
				if(prices.length>0)
				{
					prices.sort(function(a,b)
					{
						if(parseFloat(a)<parseFloat(b))
						{	return 1;}
						else 
						{	return -1;}
					});

					price_filter.value=prices[0];
					est_filter.value=my_round(parseFloat(price_filter.value)*parseFloat(quantity_filter.value),2);
					amount_filter.value=my_round(parseFloat(price_filter.value)*parseFloat(quantity_filter.value),2);
				}
			},price_data);
		});
		
		$(quantity_filter).on('blur',function()
		{
			est_filter.value=my_round(parseFloat(price_filter.value)*parseFloat(quantity_filter.value),2);
			amount_filter.value=my_round(parseFloat(price_filter.value)*parseFloat(quantity_filter.value),2);
		});
							
		//set_static_value_list('service_request_items','status',status_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Service Request billing - expenses
 * @formNo 151
 */
function form151_add_expense()
{
	if(is_create_access('form151'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form151_expense_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Person'>";
				rowsHTML+="<input type='text' form='form151_expense_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Rs. <input type='number' form='form151_expense_"+id+"' min='0' step='any' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Detail'>";
				rowsHTML+="<textarea form='form151_expense_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form151_expense_"+id+"' value='submitted'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form151_expense_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form151_expense_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form151_expense_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form151_expense_body').prepend(rowsHTML);
		var fields=document.getElementById("form151_expense_"+id);
		var person_filter=fields.elements[0];
		var status_filter=fields.elements[3];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form151_create_expense(fields);
		});
		
		var person_data="<staff>"+
					"<acc_name></acc_name>"+
					"</staff>";
		set_my_value_list_func(person_data,person_filter,function () 
		{
			$(person_filter).focus();
		});

		set_static_value_list('expenses','status',status_filter);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Prepare Quotation
 * @formNo 153
 */
function form153_add_product()
{
	var filter_fields=document.getElementById('form153_master');
	var bill_type=filter_fields.elements[2].value;
	var customer_name=filter_fields.elements[1].value;
	
	var hiring=false;
	if(filter_fields.elements[2].value=='Hiring')
	{	hiring=true;  }
				
	if(is_create_access('form153'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form153_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' required form='form153_"+id+"'>";
				rowsHTML+="<br><textarea readonly='readonly' class='dblclick_editable' form='form153_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' min='0' required form='form153_"+id+"' step='any'>";
				rowsHTML+="<input type='text' readonly='readonly' form='form153_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Unit Price'>";
				rowsHTML+="<input type='number' required form='form153_"+id+"' step='any'>";
				if(hiring)
				{	rowsHTML+="/day";  }	
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				//rowsHTML+="Tax: <input type='number' form='form153_"+id+"' step='any' value='0'>";
				rowsHTML+="<input type='number' required readonly='readonly' form='form153_"+id+"' step='any'>";
				if(hiring)
				{	rowsHTML+="/day";  }	
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				//rowsHTML+="<input type='hidden' form='form153_"+id+"' value='0'>";
				//rowsHTML+="<input type='hidden' form='form153_"+id+"' value='0'>";
				rowsHTML+="<input type='hidden' form='form153_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form153_"+id+"' id='save_form153_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form153_"+id+"' id='delete_form153_"+id+"' onclick='$(this).parent().parent().remove(); form153_get_totals();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form153_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form153_"+id+"' value='product'>";
				//rowsHTML+="<input type='hidden' form='form153_"+id+"' name='tax_unit'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form153_body').prepend(rowsHTML);
		
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();

		var fields=document.getElementById("form153_"+id);
		var name_filter=fields.elements[0];
		var desc_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var unit_filter=fields.elements[3];
		var price_filter=fields.elements[4];
		//var tax_filter=fields.elements[5];
		var amount_filter=fields.elements[5];
		//var total_filter=fields.elements[7];
		//var discount_filter=fields.elements[8];
		var id_filter=fields.elements[6];
		var save_button=fields.elements[7];
		//var tax_unit_filter=fields.elements[14];
		
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form153_create_item(fields);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form153_add_product();
		});
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
				
		set_my_value_list_func(product_data,name_filter,function () 
		{
			$(name_filter).focus();
		});

		$(name_filter).on('keydown',function(e)
		{
			if(e.keyCode==118)
			{
				e.preventDefault();
				modal57_action(name_filter.value,customer_name);
			}
		});

		$(name_filter).on('blur',function(event)
		{
			var desc_data="<product_master>"+
						"<description></description>"+
						"<name exact='yes'>"+name_filter.value+"</name>"+
						"</product_master>";
			set_my_value(desc_data,desc_filter);						
			
			var unit_data="<attributes count='1'>" +
						"<value></value>" +
						"<type>product</type>"+
						"<attribute exact='yes'>unit</attribute>"+
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"</attributes>";
			set_my_value(unit_data,unit_filter);						
			
			if(bill_type=='undefined' || bill_type=='')
			{
				var price_data="<product_instances count='1'>" +
					"<sale_price></sale_price>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
				set_my_value(price_data,price_filter);
			}
			else
			{
				var price_data="<sale_prices count='1'>" +
						"<sale_price></sale_price>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"<billing_type>"+bill_type+"</billing_type>" +
						"</sale_prices>";
				set_my_value(price_data,price_filter);
			}
			
			if(bill_type=='Retail' || bill_type=='Tax')
			{
				var hireable_data="<bill_items sum='yes'>"+
								"<quantity></quantity>"+
								"<hired exact='yes'>yes</hired>"+
								"<fresh exact='yes'>yes</fresh>"+
								"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
								"</bill_items>";
				get_single_column_data(function(hireable_inventory)
				{
					var hi=0;
					if(hireable_inventory.length>0)
					{
						hi=hireable_inventory[0];
					}
					get_inventory(name_filter.value,'',function(inventory)
					{
						$(quantity_filter).attr('placeholder',(parseFloat(inventory)-parseFloat(hi)));
					});
				},hireable_data);
			}
			
			get_inventory(name_filter.value,'',function(quantity)
			{
				$(quantity_filter).attr('placeholder',quantity);
			});

/*			if(hiring)
			{
				var tax_data="<attributes>" +
						"<value></value>"+						
						"<attribute exact='yes'>hiring tax rate</attribute>" +
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"</attributes>";
				set_my_value(tax_data,tax_unit_filter);
			}
			else 
			{
				var tax_data="<product_master>" +
					"<tax></tax>" +
					"<name exact='yes'>"+name_filter.value+"</name>" +
					"</product_master>";
				set_my_value(tax_data,tax_unit_filter);
			}
*/
			quantity_filter.value="";
//			total_filter.value=0;
			amount_filter.value=0;
//			discount_filter.value=0;
//			tax_filter.value=0;
		});

		
		$(price_filter).add(quantity_filter).on('blur',function(event)
		{
			var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			amount_filter.value=Math.round(amount).toFixed(2);
			
			//tax_filter.value=parseFloat((parseFloat(tax_unit_filter.value)*(amount-parseFloat(discount_filter.value)))/100);
			//total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value));			
		});
		
/*		
		$(tax_filter).on('blur',function () 
		{
			total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value));
		});
*/		
		form153_get_totals();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Prepare Quotation
 * @formNo 153
 */
function form153_add_service()
{
	var filter_fields=document.getElementById('form153_master');
	var bill_type=filter_fields.elements[2].value;
	var customer_name=filter_fields.elements[1].value;
				
	if(is_create_access('form153'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form153_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' placeholder='Name for the service' 	required form='form153_"+id+"'>";
				rowsHTML+="<br><textarea placeholder='Add description..' class='dblclick_editable' form='form153_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' readonly='readonly' value='1' required form='form153_"+id+"'>";
				rowsHTML+="<input type='text' readonly='readonly' value='job' form='form153_"+id+"'>";			
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Unit Price'>";
				rowsHTML+="<input type='number' required form='form153_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				//rowsHTML+="Tax: <input type='number' form='form153_"+id+"' value='0'>";
				rowsHTML+="<input type='number' required readonly='readonly' form='form153_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				//rowsHTML+="<input type='hidden' form='form153_"+id+"' value='0'>";
				//rowsHTML+="<input type='hidden' form='form153_"+id+"' value='0'>";
				rowsHTML+="<input type='hidden' form='form153_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form153_"+id+"' id='save_form153_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form153_"+id+"' id='delete_form153_"+id+"' onclick='$(this).parent().parent().remove(); form153_get_totals();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form153_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form153_"+id+"' value='service'>";
				//rowsHTML+="<input type='hidden' form='form153_"+id+"' name='tax_unit'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form153_body').prepend(rowsHTML);
		
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();

		var fields=document.getElementById("form153_"+id);
		var name_filter=fields.elements[0];
		var desc_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var price_filter=fields.elements[4];
		//var tax_filter=fields.elements[5];
		var amount_filter=fields.elements[5];
		//var total_filter=fields.elements[7];
		//var discount_filter=fields.elements[8];
		var id_filter=fields.elements[6];
		var save_button=fields.elements[7];
		//var tax_unit_filter=fields.elements[14];
		
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form153_create_item(fields);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form153_add_service();
		});
		
		$(name_filter).focus();
		
		$(name_filter).on('keydown',function(e)
		{
			if(e.keyCode==118)
			{
				e.preventDefault();
				modal57_action(name_filter.value,customer_name);
			}
		});

/*		$(name_filter).on('blur',function(event)
		{
			var desc_data="<services>"+
						"<description></description>"+
						"<name exact='yes'>"+name_filter.value+"</name>"+
						"</services>";
			set_my_value(desc_data,desc_filter);						
			
			var price_data="<services>" +
				"<price></price>" +
				"<tax></tax>"+
				"<name exact='yes'>"+name_filter.value+"</name>" +
				"</services>";
			fetch_requested_data('',price_data,function(prices)
			{
				if(prices.length>0)
				{
					//tax_unit_filter.value=prices[0].tax;
					price_filter.value=prices[0].price;
					amount_filter.value=Math.round(prices[0].price);					
					//tax_filter.value=parseFloat((parseFloat(prices[0].tax)*(prices[0].price))/100);
					//total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
				}	
			});			
		});
*/
		$(price_filter).on('blur',function(event)
		{
			var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			amount_filter.value=Math.round(amount).toFixed(2);
				
			//tax_filter.value=parseFloat((parseFloat(tax_unit_filter.value)*amount)/100);
			//total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
		});
		
		/*
		$(tax_filter).on('blur',function()
		{
			total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
		});
		*/
		form153_get_totals();

	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create bill (DLM)
 * @formNo 154
 */
function form154_add_product()
{
	var filter_fields=document.getElementById('form154_master');
	var bill_type=filter_fields.elements['bill_type'].value;
	var customer_name=filter_fields.elements['customer'].value;
	
	var hiring=false;
	if(bill_type=='Hiring')
	{	hiring=true;  }
				
	if(is_create_access('form154'))
	{
		if(hiring)
		{
			var id=get_new_key();
			var rowsHTML="<tr>";
			rowsHTML+="<form id='form154_"+id+"' autocomplete='off'></form>";
				rowsHTML+="<td data-th='S.No.'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Item'>";
					rowsHTML+="<input type='text' required form='form154_"+id+"'>";
					rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form154_add_product_"+id+"'>";
					rowsHTML+="<fresh><br>Fresh: <input type='checkbox' form='form154_"+id+"'></fresh>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Quantity'>";
					rowsHTML+="<input type='number' min='0' required form='form154_"+id+"' step='any'> <b id='form154_unit_"+id+"'></b>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Date'>";
					rowsHTML+="From: <f1><input type='text' required form='form154_"+id+"'></f1>";
					rowsHTML+="<br>To: <f1><input type='text' required form='form154_"+id+"'></f1>";
					rowsHTML+="<br><f1><input type='number' readonly='readonly' form='form154_"+id+"'> days</f1>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Rate'>";
					rowsHTML+="<input type='number' required form='form154_"+id+"' step='any'>";
					rowsHTML+="/day"; 	
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Amount'>";
					rowsHTML+="<input type='number' required readonly='readonly' form='form154_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					rowsHTML+="<input type='hidden' form='form154_"+id+"' value='"+id+"'>";
					rowsHTML+="<input type='button' class='submit_hidden' form='form154_"+id+"' id='save_form154_"+id+"' >";
					rowsHTML+="<input type='button' class='delete_icon' form='form154_"+id+"' id='delete_form154_"+id+"' onclick='$(this).parent().parent().remove();form154_update_serial_numbers(); form154_get_totals();'>";
					rowsHTML+="<input type='submit' class='submit_hidden' form='form154_"+id+"'>";
					rowsHTML+="<input type='hidden' form='form154_"+id+"' value='product'>"; 
					//rowsHTML+="<input type='hidden' form='form154_"+id+"' name='tax_unit'>";
				rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		
			$('#form154_body').append(rowsHTML);
			
			longPressEditable($('.dblclick_editable'));
			$('textarea').autosize();
	
			var fields=document.getElementById("form154_"+id);
			var name_filter=fields.elements[0];
			var fresh=fields.elements[1];
			var quantity_filter=fields.elements[2];
			var from_filter=fields.elements[3];
			var to_filter=fields.elements[4];
			var days_filter=fields.elements[5];
			var price_filter=fields.elements[6];
			//var tax_filter=fields.elements[7];
			var amount_filter=fields.elements[7];
			//var total_filter=fields.elements[9];
			//var discount_filter=fields.elements[10];
			var id_filter=fields.elements[8];
			var save_button=fields.elements[9];
			//var tax_unit_filter=fields.elements[16];
			
			$(from_filter).datepicker();
			$(to_filter).datepicker();
			
			$(save_button).on("click", function(event)
			{
				event.preventDefault();
				form154_create_hiring_item(fields);
			});
			
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form154_add_product();
			});
			
			var product_data="<product_master>" +
					"<name></name>" +
					"</product_master>";

			set_my_value_list_func(product_data,name_filter,function () 
			{
				$(name_filter).focus();
			});
	
			var add_product=document.getElementById('form154_add_product_'+id);
			$(add_product).on('click',function()
			{
				modal112_action(function()
				{	
					var product_data="<product_master>" +
							"<name></name>" +
							"</product_master>";
					set_my_value_list_func(product_data,name_filter,function () 
					{
						$(name_filter).focus();
					});
				});
			});

			$(name_filter).on('keydown',function(e)
			{
				if(e.keyCode==118)
				{
					e.preventDefault();
					modal57_action(name_filter.value,customer_name);
				}
			});
	
			$(fresh).on('blur',function()
			{
				if(fresh.checked)
				{
					var hireable_data="<bill_items sum='yes'>"+
									"<quantity></quantity>"+
									"<hired exact='yes'>yes</hired>"+
									"<fresh exact='yes'>yes</fresh>"+
									"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
									"</bill_items>";
					get_single_column_data(function(data)
					{
						var hireable_quantity=0;
						if(data.length>0)
						{
							hireable_quantity=parseFloat(data[0]);
						}
						get_inventory(name_filter.value,'',function(inventory)
						{
							$(quantity_filter).attr('placeholder',(parseFloat(inventory)-hireable_quantity));
						});
					},hireable_data);
				}
				else 
				{
					console.log('fresh not checked');
					var hireable_data="<bill_items sum='yes'>"+
									"<quantity></quantity>"+
									"<hired exact='yes'>yes</hired>"+
									"<fresh exact='yes'>yes</fresh>"+
									"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
									"</bill_items>";
					get_single_column_data(function(data)
					{
						console.log(data);
						var hireable_quantity=0;
						if(data.length>0)
						{
							hireable_quantity=parseFloat(data[0]);
						}
						var hired_data="<bill_items sum='yes'>"+
									"<quantity></quantity>"+
									"<hired exact='yes'>yes</hired>"+
									"<from_date upperbound='yes'>"+get_my_time()+"</from_date>"+
									"<to_date lowerbound='yes'>"+(parseFloat(get_my_time())+86400000)+"</to_date>"+
									"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
									"</bill_items>";
						get_single_column_data(function(data2)
						{
							console.log(data2);

							var hired_quantity=0;
							if(data2.length>0)
							{
								hired_quantity=parseFloat(data2[0]);
							}
							$(quantity_filter).attr('placeholder',(hireable_quantity-hired_quantity));
						},hired_data);
					},hireable_data);
				}
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
					//console.log(units);
					if(units.length>0)
						$('#form154_unit_'+id).html(units[0]);
				},unit_data);			
				
				if(bill_type=='undefined' || bill_type=='')
				{
					var price_data="<product_instances count='1'>" +
						"<sale_price></sale_price>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"</product_instances>";
					set_my_value(price_data,price_filter);
				}
				else
				{
					var price_data="<sale_prices count='1'>" +
							"<sale_price></sale_price>" +
							"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
							"<billing_type>"+bill_type+"</billing_type>" +
							"</sale_prices>";
					set_my_value(price_data,price_filter);
				}
				
				if(fresh.checked)
				{
					var hireable_data="<bill_items sum='yes'>"+
									"<quantity></quantity>"+
									"<hired exact='yes'>yes</hired>"+
									"<fresh exact='yes'>yes</fresh>"+
									"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
									"</bill_items>";
					get_single_column_data(function(data)
					{
						var hireable_quantity=0;
						if(data.length>0)
						{
							hireable_quantity=parseFloat(data[0]);
						}
						get_inventory(name_filter.value,'',function(inventory)
						{
							$(quantity_filter).attr('placeholder',(parseFloat(inventory)-hireable_quantity));
						});
					},hireable_data);
				}
				else 
				{
					var hireable_data="<bill_items sum='yes'>"+
									"<quantity></quantity>"+
									"<hired exact='yes'>yes</hired>"+
									"<fresh exact='yes'>yes</fresh>"+
									"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
									"</bill_items>";
					get_single_column_data(function(data)
					{
						var hireable_quantity=0;
						if(data.length>0)
						{
							hireable_quantity=parseFloat(data[0]);
						}
						var hired_data="<bill_items sum='yes'>"+
									"<quantity></quantity>"+
									"<hired exact='yes'>yes</hired>"+
									"<from_date upperbound='yes'>"+get_my_time()+"</from_date>"+
									"<to_date lowerbound='yes'>"+(parseFloat(get_my_time())+86400000)+"</to_date>"+
									"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
									"</bill_items>";
						get_single_column_data(function(data2)
						{
							var hired_quantity=0;
							if(data2.length>0)
							{
								hired_quantity=parseFloat(data[0]);
							}
							$(quantity_filter).attr('placeholder',(hireable_quantity-hired_quantity));
						},hired_data);
					},hireable_data);
				}
				
				/*
				var tax_data="<attributes>" +
						"<value></value>"+						
						"<attribute exact='yes'>hiring tax rate</attribute>" +
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"</attributes>";
				set_my_value(tax_data,tax_unit_filter);
				*/
				quantity_filter.value="";
				//total_filter.value=0;
				amount_filter.value=0;
				//discount_filter.value=0;
				//tax_filter.value=0;
			});

			$(from_filter).add(to_filter).add(price_filter).add(quantity_filter).on('change',function()
			{
				var days=0;
				if(to_filter!="" && from_filter!="" && parseFloat(to_filter.value)>=parseFloat(from_filter.value))
				{
					days=1+my_round(((get_raw_time(to_filter.value)-get_raw_time(from_filter.value))/86400000),0);
				}
				days_filter.value=days;
				
				var amount=my_round(parseFloat(quantity_filter.value)*parseFloat(price_filter.value)*days,2);
				amount_filter.value=Math.round(amount).toFixed(2);
				
				//tax_filter.value=my_round(parseFloat((parseFloat(tax_unit_filter.value)*(amount-parseFloat(discount_filter.value)))/100),2);
					
				//total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value));				
			});	
			
			/*
			$(tax_filter).on('blur',function () 
			{
				total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value));				
			});*/		
		}
		else 
		{
			var id=get_new_key();
			var rowsHTML="<tr>";
			rowsHTML+="<form id='form154_"+id+"' autocomplete='off'></form>";
				rowsHTML+="<td data-th='S.No.'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Item'>";
					rowsHTML+="<input type='text' required form='form154_"+id+"'>";
					rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form154_add_product_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Quantity'>";
					rowsHTML+="<input type='number' min='0' required form='form154_"+id+"' step='any'> <b id='form154_unit_"+id+"'></b>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Rate'>";
					rowsHTML+="<input type='number' required form='form154_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Amount'>";
					rowsHTML+="<input type='number' required readonly='readonly' form='form154_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					//rowsHTML+="<input type='hidden' form='form154_"+id+"' value='0'>";
					//rowsHTML+="<input type='hidden' form='form154_"+id+"' value='0'>";
					rowsHTML+="<input type='hidden' form='form154_"+id+"' value='"+id+"'>";
					rowsHTML+="<input type='button' class='submit_hidden' form='form154_"+id+"' id='save_form154_"+id+"' >";
					rowsHTML+="<input type='button' class='delete_icon' form='form154_"+id+"' id='delete_form154_"+id+"' onclick='$(this).parent().parent().remove();form154_update_serial_numbers(); form154_get_totals();'>";
					rowsHTML+="<input type='submit' class='submit_hidden' form='form154_"+id+"'>";
					rowsHTML+="<input type='hidden' form='form154_"+id+"' value='product'>";
					//rowsHTML+="<input type='hidden' form='form154_"+id+"' name='tax_unit'>";
				rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		
			$('#form154_body').append(rowsHTML);
			
			longPressEditable($('.dblclick_editable'));
			$('textarea').autosize();
	
			var fields=document.getElementById("form154_"+id);
			var name_filter=fields.elements[0];
			var quantity_filter=fields.elements[1];
			var price_filter=fields.elements[2];
			//var tax_filter=fields.elements[3];
			var amount_filter=fields.elements[3];
			//var total_filter=fields.elements[5];
			//var discount_filter=fields.elements[6];
			var id_filter=fields.elements[4];
			var save_button=fields.elements[5];
			//var tax_unit_filter=fields.elements[12];
			
			$(save_button).on("click", function(event)
			{
				event.preventDefault();
				form154_create_product(fields);
			});
			
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form154_add_product();
			});
			
			var add_product=document.getElementById('form154_add_product_'+id);
			$(add_product).on('click',function()
			{
				modal112_action(function()
				{	
					var product_data="<product_master>" +
							"<name></name>" +
							"</product_master>";
					set_my_value_list_func(product_data,name_filter,function () 
					{
						$(name_filter).focus();
					});
				});
			});

			var product_data="<product_master>" +
					"<name></name>" +
					"</product_master>";
					
			set_my_value_list_func(product_data,name_filter,function () 
			{
				$(name_filter).focus();
			});
	
			$(name_filter).on('keydown',function(e)
			{
				if(e.keyCode==118)
				{
					e.preventDefault();
					modal57_action(name_filter.value,customer_name);
				}
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
						$('#form154_unit_'+id).html(units[0]);
				},unit_data);			

				
				if(bill_type=='undefined' || bill_type=='')
				{
					var price_data="<product_instances count='1'>" +
						"<sale_price></sale_price>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"</product_instances>";
					set_my_value(price_data,price_filter);
				}
				else
				{
					var price_data="<sale_prices count='1'>" +
							"<sale_price></sale_price>" +
							"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
							"<billing_type>"+bill_type+"</billing_type>" +
							"</sale_prices>";
					set_my_value(price_data,price_filter);
				}
					
				var hireable_data="<bill_items sum='yes'>"+
								"<quantity></quantity>"+
								"<hired exact='yes'>yes</hired>"+
								"<fresh exact='yes'>yes</fresh>"+
								"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
								"</bill_items>";
				get_single_column_data(function(data)
				{
					var hireable_quantity=0;
					if(data.length>0)
					{
						hireable_quantity=parseFloat(data[0]);
					}
					get_inventory(name_filter.value,'',function(inventory)
					{
						$(quantity_filter).attr('placeholder',(parseFloat(inventory)-hireable_quantity));
					});
				},hireable_data);

/*
				var tax_data="<product_master>" +
						"<tax></tax>" +
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"</product_master>";
				set_my_value(tax_data,tax_unit_filter);
*/				
				quantity_filter.value="";
				//total_filter.value=0;
				amount_filter.value=0;
				//discount_filter.value=0;
				//tax_filter.value=0;
			});
	
			$(price_filter).add(quantity_filter).on('blur',function(event)
			{
				var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
				amount_filter.value=Math.round(amount).toFixed(2);
					
				//tax_filter.value=my_round(parseFloat((parseFloat(tax_unit_filter.value)*(amount-parseFloat(discount_filter.value)))/100),2);
				//total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value));
			});
			/*
			$(tax_filter).on('blur',function()
			{
				total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value));
			});
			*/
		}	
		form154_update_serial_numbers();
		form154_get_totals();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create bill (dlmc)
 * @formNo 154
 */
function form154_add_service()
{
	var filter_fields=document.getElementById('form154_master');
	var bill_type=filter_fields.elements['bill_type'].value;
	var customer_name=filter_fields.elements['customer'].value;
	
	var hiring=false;
				
	if(is_create_access('form154'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form154_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='S.No.'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<textarea form='form154_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' readonly='readonly' value='1' required form='form154_"+id+"'> <b id='form154_unit_"+id+"'>job</b>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Rate'>";
				rowsHTML+="<input type='number' required form='form154_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				//rowsHTML+="<v1>Tax: <input type='number' step='any' form='form154_"+id+"' value='0'>";
				rowsHTML+="<input type='number' required readonly='readonly' form='form154_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				//rowsHTML+="<input type='hidden' form='form154_"+id+"' value='0'>";
				//rowsHTML+="<input type='hidden' form='form154_"+id+"' value='0'>";
				rowsHTML+="<input type='hidden' form='form154_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form154_"+id+"' id='save_form154_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form154_"+id+"' id='delete_form154_"+id+"' onclick='$(this).parent().parent().remove();form154_update_serial_numbers(); form154_get_totals();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form154_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form154_"+id+"' value='service'>";
				rowsHTML+="<input type='hidden' form='form154_"+id+"' name='tax_unit' value='0.14'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form154_body').append(rowsHTML);
		
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();

		var fields=document.getElementById("form154_"+id);
		var name_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var price_filter=fields.elements[2];
		//var tax_filter=fields.elements[3];
		var amount_filter=fields.elements[3];
		//var total_filter=fields.elements[5];
		//var discount_filter=fields.elements[6];
		var id_filter=fields.elements[4];
		var save_button=fields.elements[5];
		//var tax_unit_filter=fields.elements[9];
		
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form154_create_service(fields);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form154_add_service();
		});
		
		$(name_filter).focus();
		
		$(price_filter).on('blur',function(event)
		{
			var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			amount_filter.value=Math.round(amount).toFixed(2);
			//tax_filter.value=my_round(parseFloat((parseFloat(tax_unit_filter.value)*amount)),2);
			//total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
		});
		/*
		$(tax_filter).on('blur',function () 
		{
			total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
		});		
		*/
		form154_update_serial_numbers();
		form154_get_totals();

	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Store Placement (DLM)
 * @formNo 156
 */
function form156_add_item()
{
	if(is_create_access('form156'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form156_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item Name'>";
				rowsHTML+="<input type='text' form='form156_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form156_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Store Area'>";
				rowsHTML+="<input type='text' form='form156_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new storage' id='form156_add_storage_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' readonly='readonly' form='form156_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form156_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form156_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form156_"+id+"' onclick='$(this).parent().parent().remove();'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form156_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form156_"+id);
		var product_filter=fields.elements[0];
		var area_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form156_create_item(fields);
		});		
			
		var products_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(products_data,product_filter,function () 
		{
			$(product_filter).focus();
		});
		
		var add_product=document.getElementById('form156_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal112_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(products_data,product_filter,function () 
				{
					$(product_filter).focus();
				});
			});
		});


		var add_storage=document.getElementById('form156_add_storage_'+id);
		$(add_storage).on('click',function()
		{
			modal35_action(function()
			{	
				var area_data="<store_areas>" +
				"<name></name>" +
				"<area_type exact='yes'>storage</area_type>" +
				"</store_areas>";
				set_my_value_list(area_data,area_filter);
			});
		});
		
		var area_data="<store_areas>" +
				"<name></name>" +
				"<area_type exact='yes'>storage</area_type>" +
				"</store_areas>";
		
		set_my_value_list(area_data,area_filter);

		$(product_filter).on('blur',function () 
		{
			get_store_inventory(area_filter.value,product_filter.value,'',function(inventory)
			{
				$(quantity_filter).attr('max',inventory);
			});
		});
		
		$(area_filter).on('blur',function () 
		{
			get_store_inventory(area_filter.value,product_filter.value,'',function(inventory)
			{
				$(quantity_filter).attr('max',inventory);
			});
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Store movement (DLM)
 * @formNo 157
 */
function form157_add_item()
{
	if(is_create_access('form157'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form157_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Product'>";
				rowsHTML+="<input type='text' required form='form157_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form157_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form157_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Store'>";
				rowsHTML+="Source: <input type='text' required form='form157_"+id+"'>";
				rowsHTML+="<br>Target: <input type='text' required form='form157_"+id+"'>";				
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' readonly='readonly' required form='form157_"+id+"' value='pending'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form157_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='hidden' form='form157_"+id+"' required name='receiver'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form157_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form157_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='button' class='generic_icon' form='form157_"+id+"' value='Dispatch' onclick='form157_dispatch_item($(this));'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form157_body').prepend(rowsHTML);
		var fields=document.getElementById("form157_"+id);
		var product_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var source_filter=fields.elements[2];
		var target_filter=fields.elements[3];
		var status_filter=fields.elements[4];
		var receiver_filter=fields.elements[6];
		var save_button=fields.elements[7];
		var dispatch_button=fields.elements[9];
		
		$(dispatch_button).hide();
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			var receiver_data="<store_areas>" +
				"<owner></owner>"+				
				"<area_type exact='yes'>storage</area_type>" +
				"<name exact='yes'>"+target_filter.value+"</name>" +
				"</store_areas>";
			//console.log(receiver_data);			
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					receiver_filter.value=data[0];
				}
				form157_create_item(fields);
			},receiver_data);				
		});
				
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(product_data,product_filter,function () 
		{
			$(product_filter).focus();
		});

		var add_product=document.getElementById('form157_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal112_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(product_data,product_filter,function () 
				{
					$(product_filter).focus();
				});
			});
		});

		var source_data="<store_areas>" +
				"<name></name>" +
				"<owner>"+get_account_name()+"</owner>"+
				"<area_type exact='yes'>storage</area_type>" +
				"</store_areas>";
		set_my_value_list(source_data,source_filter);

		$(source_filter).on('blur',function () 
		{
			get_store_inventory(source_filter.value,product_filter.value,'',function(inventory)
			{
				$(quantity_filter).attr('max',inventory);
			});
		});

		var target_data="<store_areas>" +
				"<name></name>" +
				"<area_type exact='yes'>storage</area_type>" +
				"</store_areas>";
		set_my_value_list(target_data,target_filter);

		set_static_value_list('store_movement','status',status_filter);	

	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Enter Purchase Bill (DLM)
 * @formNo 158
 */
function form158_add_item()
{
	if(is_create_access('form158'))
	{
		var filter_fields=document.getElementById('form158_master');
		var imported=filter_fields.elements['imported'].checked;
		
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form158_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' required form='form158_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form158_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' step='any' required form='form158_"+id+"'> <b id='form158_unit_"+id+"'></b>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Unit Price: <input type='number' form='form158_"+id+"' step='any'>";
				rowsHTML+="<br>Amount: <input type='number' form='form158_"+id+"' value='' readonly='readonly' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Storage'>";
				rowsHTML+="<input type='text' form='form158_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form158_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form158_"+id+"' id='save_form158_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form158_"+id+"' id='delete_form158_"+id+"' onclick='$(this).parent().parent().remove();form158_get_totals();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form158_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";
	
		$('#form158_body').append(rowsHTML);
		
		var fields=document.getElementById("form158_"+id);
		var name_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var price_filter=fields.elements[2];
		var amount_filter=fields.elements[3];
		var storage_filter=fields.elements[4];
		var id_filter=fields.elements[5];
		var save_button=fields.elements[6];
		//var tax_unit_filter=fields.elements[8];
		
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form158_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form158_add_item();
		});
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(product_data,name_filter,function () 
		{
			$(name_filter).focus();
		});

		var add_product=document.getElementById('form158_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal112_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(product_data,name_filter,function () 
				{
					$(name_filter).focus();
				});
			});
		});

		var storage_data="<store_areas>" +
					"<name></name>" +
					"<owner></owner>"+					
					"<area_type exact='yes'>storage</area_type>" +
					"</store_areas>";
		fetch_requested_data('',storage_data,function(storages) 
		{
			var form=fields;
			var datalist=document.createElement('datalist');
			var element_array=[];
			storages.forEach(function(d)
			{
				var option=document.createElement('option');
				option.setAttribute('value',d.name);
				element_array.push(d.name);
				datalist.appendChild(option);
				if(d.owner==get_account_name())
				{
					storage_filter.value=d.name;
				}
			});
			
			var list_id=storage_filter.getAttribute('list');
			if(list_id=='' || list_id==null)
			{
				list_id="list_"+get_new_key();
				storage_filter.setAttribute("list",list_id);
			}
			else
			{
				var oldlist=document.getElementById(list_id);
				form.removeChild(oldlist);
			}
			
			form.appendChild(datalist);
			datalist.setAttribute('id',list_id);
			
			$(storage_filter).off("change");
			$(storage_filter).on("change",function(event)
			{
				var found = $.inArray($(this).val(), element_array) > -1;
				if(!found)
				{
		            $(this).val('');
		        }
			});
		});
		
		set_my_value_list_func(storage_data,storage_filter,function()
		{
			var store_value_data="<store_areas count='1'>" +
				"<name></name>" +
				"<owner>"+get_account_name()+"</owner>"+
				"<area_type exact='yes'>storage</area_type>" +
				"</store_areas>";
			set_my_value(store_value_data,storage_filter);
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
					$('#form158_unit_'+id).html(units[0]);
			},unit_data);			
							
			var price_data="<supplier_bill_items count='1'>" +
					"<unit_price></unit_price>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</supplier_bill_items>";
			set_my_value(price_data,price_filter);			
		});
		
		$(quantity_filter).add(price_filter).on('blur',function(event)
		{
			//tax_filter.value=my_round((parseFloat(tax_unit_filter.value)*parseFloat(quantity_filter.value)*parseFloat(price_filter.value)/100),2);
			var amount=(parseFloat(price_filter.value)*parseFloat(quantity_filter.value));
			amount_filter.value=Math.round(amount);
		});
		form158_get_totals();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form checklist Items
 * @formNo 161
 */
function form161_add_item()
{
	if(is_create_access('form161'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form161_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Checkpoint'>";
				rowsHTML+="<input type='text' form='form161_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Desired Result'>";
				rowsHTML+="<textarea form='form161_"+id+"' class='dblclick_editable' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form161_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form161_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form161_"+id+"' title='Save'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form161_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form161_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));
		
		var fields=document.getElementById("form161_"+id);
		var cp_filter=fields.elements[0];
		var status_filter=fields.elements[2];
		
		$(cp_filter).focus();
		set_static_value_list('checklist_items','status',status_filter);		
							
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form161_create_item(fields);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Product checklist
 * @formNo 162
 */
function form162_add_item()
{
	if(is_create_access('form162'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form162_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' form='form162_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Checkpoint'>";
				rowsHTML+="<input type='text' form='form162_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Desired Result'>";
				rowsHTML+="<textarea form='form162_"+id+"' class='dblclick_editable' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form162_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form162_"+id+"' title='Save'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form162_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form162_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));
		
		var fields=document.getElementById("form162_"+id);
		var item_filter=fields.elements[0];
		var cp_filter=fields.elements[1];
		var result_filter=fields.elements[2];
		
		var item_data="<product_master>"+
					"<name></name>"+
					"</product_master>";
		set_my_value_list_func(item_data,item_filter,function () 
		{
			$(item_filter).focus();
		});

		var cp_data="<checklist_items>"+
					"<checkpoint></checkpoint>"+
					"</checklist_items>";
		set_my_value_list_func(cp_data,cp_filter); 
							
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form162_create_item(fields);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Storage Structure
 * @formNo 167
 */
function form167_add_item()
{
	if(is_create_access('form167'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form167_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Type'>";
				rowsHTML+="<input type='text' required form='form167_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Parent'>";
				rowsHTML+="<input type='text' form='form167_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Default Dimensions'>";
				rowsHTML+="Length: <input type='number' step='any' form='form167_"+id+"'>";
				rowsHTML+="<br>Breadth: <input type='number' step='any' form='form167_"+id+"'>";
				rowsHTML+="<br>Height: <input type='number' step='any' form='form167_"+id+"'>";				
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Unit'>";
				rowsHTML+="<input type='text' required value='m' form='form167_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form167_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form167_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form167_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form167_body').prepend(rowsHTML);
		var fields=document.getElementById("form167_"+id);
		var type_filter=fields.elements[0];
		var parent_filter=fields.elements[1];
		var length_filter=fields.elements[2];
		var breadth_filter=fields.elements[3];
		var height_filter=fields.elements[4];
		var unit_filter=fields.elements[5];
		var save_button=fields.elements[7];
				
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form167_create_item(fields);
		});
				
		$(type_filter).focus();
		
		var parent_data="<storage_structure>" +
				"<name></name>" +
				"</storage_structure>";
		set_my_value_list(parent_data,parent_filter);

		set_static_value_list('dimensions','unit',unit_filter);	
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Channels
 * @formNo 171
 */
function form171_add_item()
{
	if(is_create_access('form171'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form171_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form171_"+id+"' required value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<textarea form='form171_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Dead Weight Factor'>";
				rowsHTML+="<input type='number' step='any' form='form171_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form171_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form171_"+id+"' title='Save'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form171_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form171_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));
		
		var fields=document.getElementById("form171_"+id);
		var name_filter=fields.elements[0];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form171_create_item(fields);
		});
					
		$(name_filter).focus();
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Pricing Sheet
 * @formNo 172
 */
function form172_add_item()
{
	if(is_create_access('form172'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form172_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Channel'>";
				rowsHTML+="<input type='text' form='form172_"+id+"' required value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='SKU'>";
				rowsHTML+="<textarea form='form172_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Price'>";
				rowsHTML+="<input type='number' step='any' form='form172_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form172_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form172_"+id+"' title='Save'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form172_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form172_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));
		
		var fields=document.getElementById("form172_"+id);
		var name_filter=fields.elements[0];
		var sku_filter=fields.elements[1];
		
		var channel_data="<sale_channels>"+
						"<name></name>"+
						"</sale_channels>";
		set_my_value_list(channel_data,name_filter);
		
		var sku_data="<product_master>"+
					"<name></name>"+
					"</product_master>";
		set_my_value_list(sku_data,sku_filter);
					
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form172_create_item(fields);
		});
					
		$(name_filter).focus();
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Pickup Charges
 * @formNo 174
 */
function form174_add_item()
{
	if(is_create_access('form174'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form174_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Channel'>";
				rowsHTML+="<input type='text' form='form174_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Pincode'>";
				rowsHTML+="<input type='number' form='form174_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Minimum'>";
				rowsHTML+="<input type='number' step='.01' min='0' value='0' form='form174_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Maximum'>";
				rowsHTML+="<input type='number' step='.01' min='0' value='0' form='form174_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Weight Factor'>";
				rowsHTML+="<input type='number' step='.01' form='form174_"+id+"' value='0' required>Rs./gm";
			rowsHTML+="</td>";			
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form174_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form174_"+id+"' title='Save'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form174_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form174_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));
		
		var fields=document.getElementById("form174_"+id);
		var channel_filter=fields.elements[0];
		var pincode_filter=fields.elements[3];
		
		var channel_data="<sale_channels>"+
						"<name></name>"+
						"</sale_channels>";
		set_my_value_list_func(channel_data,channel_filter,function () 
		{
			$(channel_filter).focus();
		});
							
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form174_create_item(fields);
		});

	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Channel Category
 * @formNo 175
 */
function form175_add_item()
{
	if(is_create_access('form175'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form175_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Channel'>";
				rowsHTML+="<input type='text' form='form175_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Type'>";
				rowsHTML+="<input type='text' form='form175_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form175_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Parent'>";
				rowsHTML+="<input type='text' form='form175_"+id+"'>";
			rowsHTML+="</td>";			
			rowsHTML+="<td data-th='Commission'>";
				rowsHTML+="<input type='number' step='.01' form='form175_"+id+"' required>";
			rowsHTML+="</td>";			
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form175_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form175_"+id+"' title='Save'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form175_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form175_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));
		
		var fields=document.getElementById("form175_"+id);
		var channel_filter=fields.elements[0];
		var type_filter=fields.elements[1];
		var name_filter=fields.elements[2];
		var parent_filter=fields.elements[3];
		var commission_filter=fields.elements[4];
		
		var channel_data="<sale_channels>"+
						"<name></name>"+
						"</sale_channels>";
		set_my_value_list(channel_data,channel_filter);
		set_static_value_list('channel_category','type',type_filter);
		
		var parent_data="<channel_category>"+
					"<name></name>"+
					"<type exact='yes'>category</type>"+
					"</channel_category>";
		set_my_value_list(parent_data,parent_filter);

		$(parent_filter).on('blur',function()
		{
			var commission_data="<channel_category>"+
								"<commission></commission>"+
								"<name exact='yes'>"+parent_filter.value+"</name>"+
								"<channel exact='yes'>"+channel_filter.value+"</channel>"+
								"</channel_category>";
			set_my_value(commission_data,commission_filter);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form175_create_item(fields);
		});
					
		$(name_filter).focus();
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Prioritization Parameters
 * @formNo 177
 */
function form177_add_item()
{
	if(is_create_access('form177'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form177_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Type'>";
				rowsHTML+="<input type='text' form='form177_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Parameter'>";
				rowsHTML+="<input type='text' form='form177_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Values'>";
				rowsHTML+="<textarea title='Use ; to differentiate values' form='form177_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Threshold'>";
				rowsHTML+="<input type='number' step='any' form='form177_"+id+"'>";
			rowsHTML+="</td>";	
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form177_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form177_"+id+"' title='Save'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form177_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form177_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));
		
		var fields=document.getElementById("form177_"+id);
		var type_filter=fields.elements[0];
		var name_filter=fields.elements[1];
		
		set_static_value_list('prioritization_parameters','type',type_filter,function () 
		{
			$(type_filter).focus();
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form177_create_item(fields);
		});

	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form New Purchase Order
 * @formNo 178
 */
function form178_add_item()
{
	if(is_create_access('form178'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form178_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' required form='form178_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form178_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form178_"+id+"' value='' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Make'>";
				rowsHTML+="<textarea form='form178_"+id+"' readonly='readonly'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Price'>";
				rowsHTML+="MRP: <input type='number' required form='form178_"+id+"' value='' step='any' readonly='readonly'>";
				rowsHTML+="<br>Price: <input type='number' required form='form178_"+id+"' value='' step='any' class='dblclick_editable'>";
				rowsHTML+="<br>Amount: <input type='number' required form='form178_"+id+"' value='' step='any' readonly='readonly'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form178_"+id+"' name='tax'>";
				rowsHTML+="<input type='hidden' form='form178_"+id+"' name='total'>";
				rowsHTML+="<input type='hidden' form='form178_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form178_"+id+"' id='save_form178_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form178_"+id+"' id='delete_form178_"+id+"' onclick='$(this).parent().parent().remove(); form178_get_totals();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form178_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form178_"+id+"' name='tax_rate'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";
	
		$('#form178_body').prepend(rowsHTML);

		var master_form=document.getElementById("form178_master");		
		var supplier_name=master_form.elements[1].value;
		
		var fields=document.getElementById("form178_"+id);
		var name_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var make_filter=fields.elements[2];
		var mrp_filter=fields.elements[3];
		var price_filter=fields.elements[4];
		var amount_filter=fields.elements[5];
		var tax_filter=fields.elements[6];
		var total_filter=fields.elements[7];
		var id_filter=fields.elements[8];
		var save_button=fields.elements[9];
		var tax_rate_filter=fields.elements[12];
				
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form178_create_item(fields);
		});
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form178_add_item();
		});
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(product_data,name_filter,function () 
		{
			$(name_filter).focus();
		});
		
		var add_product=document.getElementById('form178_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(product_data,name_filter,function () 
				{
					$(name_filter).focus();
				});
			});
		});		
				
		$(name_filter).on('blur',function(event)
		{
			var make_data="<product_master>" +
					"<make></make>" +
					"<tax></tax>"+					
					"<name exact='yes'>"+name_filter.value+"</name>" +
					"</product_master>";
			fetch_requested_data('',make_data,function(products)
			{
				if(products.length>0)
				{
					make_filter.value=products[0].make;
					tax_rate_filter.value=products[0].tax;
				}
			});			
			set_my_value(make_data,make_filter);
			
			var mrp_data="<product_instances>"+
						"<mrp></mrp>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"</product_instances>";
			set_my_value(mrp_data,mrp_filter);
			
			var price_data="<supplier_bill_items count='1'>" +
							"<unit_price></unit_price>"+
							"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
							"</supplier_bill_items>";
			set_my_value(price_data,price_filter);
			
			quantity_filter.value=0;
			amount_filter.value=0;
			tax_filter.value=0;
			total_filter.value=0;
		});
		
		$(quantity_filter).add(price_filter).on('blur',function(event)
		{
			amount_filter.value=Math.round(parseFloat(quantity_filter.value)*parseFloat(price_filter.value));
			tax_filter.value=Math.round(parseFloat(amount_filter.value)*(parseFloat(tax_rate_filter.value)/100));
			total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
		});
		longPressEditable($('.dblclick_editable'));	
		form178_get_totals();	
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Production Steps
 * @formNo 184
 */
function form184_add_item()
{
	if(is_create_access('form184'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form184_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Order'>";
				rowsHTML+="<input type='text' form='form184_"+id+"' required readonly='readonly'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Step'>";
				rowsHTML+="<textarea form='form184_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="Time Estimate: <input type='number' step='any' class='dblclick_editable' title='Estimate of hours spent per piece of item production' form='form184_"+id+"'>";
				rowsHTML+="<br>Default Assignee: <input type='text' class='dblclick_editable'  form='form184_"+id+"'>";
				rowsHTML+="<br>Notes: <textarea class='dblclick_editable' form='form184_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form184_"+id+"' required value='active'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form184_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form184_"+id+"' title='Save' id='save_form184_"+id+"'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form184_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";

		$('#form184_body').append(rowsHTML);
		longPressEditable($('.dblclick_editable'));
		
		var fields=document.getElementById("form184_"+id);
		var step_filter=fields.elements[1];
		var assignee_filter=fields.elements[3];
		var status_filter=fields.elements[5];
			
		var assignee_data="<staff>"+
							"<acc_name></acc_name>"+
							"<status exact='yes'>active</status>"+
							"</staff>";
		set_my_value_list(assignee_data,assignee_filter);
		
		set_static_value_list('business_processes','status',status_filter);
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form184_create_item(fields);
		});
					
		$(step_filter).focus();
		form184_update_serial_numbers();
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Production Plan Items
 * @formNo 186
 */
function form186_add_item()
{
	if(is_create_access('form186'))
	{
		var filter_fields=document.getElementById('form186_master');
		
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form186_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Order'>";
				rowsHTML+="<input type='number' form='form186_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' required form='form186_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form186_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Schedule'>";
				rowsHTML+="From: <input type='text' form='form186_"+id+"'>";
				rowsHTML+="<br>To: <input type='text' form='form186_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form186_"+id+"' required value='pending'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form186_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='save_icon' form='form186_"+id+"' id='save_form186_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form186_"+id+"' id='delete_form186_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form186_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";
	
		$('#form186_body').append(rowsHTML);
		
		var fields=document.getElementById("form186_"+id);
		var order_filter=fields.elements[0];
		var item_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var from_filter=fields.elements[3];
		var to_filter=fields.elements[4];
		var status_filter=fields.elements[5];
		var id_filter=fields.elements[6];
		var save_button=fields.elements[7];
		
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form186_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form186_add_item();
		});
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(product_data,item_filter,function () 
		{
			$(item_filter).focus();
		});
		
		$(from_filter).datepicker();
		$(to_filter).datepicker();
		set_static_value_list('production_plan_items','status',status_filter);
		form186_update_serial_numbers();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Testing Steps
 * @formNo 187
 */
function form187_add_item()
{
	if(is_create_access('form187'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form187_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Order'>";
				rowsHTML+="<input type='text' form='form187_"+id+"' required readonly='readonly'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Step'>";
				rowsHTML+="<textarea form='form187_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="Time Estimate: <input type='number' step='any' class='dblclick_editable' title='Estimate of hours spent per piece of item testing' form='form187_"+id+"'>";
				rowsHTML+="<br>Default Assignee: <input type='text' class='dblclick_editable'  form='form187_"+id+"'>";
				rowsHTML+="<br>Notes: <textarea class='dblclick_editable' form='form187_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form187_"+id+"' required value='active'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form187_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form187_"+id+"' title='Save' id='save_form187_"+id+"'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form187_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";

		$('#form187_body').append(rowsHTML);
		longPressEditable($('.dblclick_editable'));
		
		var fields=document.getElementById("form187_"+id);
		var step_filter=fields.elements[1];
		var assignee_filter=fields.elements[3];
		var status_filter=fields.elements[5];
			
		var assignee_data="<staff>"+
							"<acc_name></acc_name>"+
							"<status exact='yes'>active</status>"+
							"</staff>";
		set_my_value_list(assignee_data,assignee_filter);
			
		set_static_value_list('business_processes','status',status_filter);
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form187_create_item(fields);
		});
					
		$(step_filter).focus();
		form187_update_serial_numbers();
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Manage Values Lists
 * @formNo 191
 */
function form191_add_item()
{
	if(is_create_access('form191'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form191_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Table'>";
				rowsHTML+="<input type='text' form='form191_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='List'>";
				rowsHTML+="<input type='text' form='form191_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Value'>";
				rowsHTML+="<textarea class='dblclick_editable' form='form191_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form191_"+id+"' required value='active'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form191_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form191_"+id+"' title='Save' id='save_form191_"+id+"'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form191_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";

		$('#form191_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));
		
		var fields=document.getElementById("form191_"+id);
		var table_filter=fields.elements[0];
		var list_filter=fields.elements[1];
		var status_filter=fields.elements[3];
			
		var table_data="<values_list>"+
					"<tablename></tablename>"+
					"</values_list>";
		set_my_filter(table_data,table_filter,function () 
		{
			$(table_filter).focus();
		});

		var list_data="<values_list>"+
					"<listname></listname>"+
					"</values_list>";
		set_my_filter(list_data,list_filter);
			
		set_static_value_list('values_list','status',status_filter);
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form191_create_item(fields);
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}		
}

/**
 * @form Enter Purchase Bill (Laundry)
 * @formNo 192
 */
function form192_add_item()
{
	if(is_create_access('form192'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form192_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' required form='form192_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form192_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' step='any' required form='form192_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Price'>";
				rowsHTML+="<input type='number' form='form192_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Amount: <input type='number' readonly='readonly' form='form192_"+id+"' value='' step='any'>";
				rowsHTML+="<br>Tax: <input type='number' readonly='readonly' form='form192_"+id+"' value='' step='any'>";
				rowsHTML+="<br>Total: <input type='number' readonly='readonly' required form='form192_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form192_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form192_"+id+"' id='save_form192_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form192_"+id+"' id='delete_form192_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form192_"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form192_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";
	
		$('#form192_body').append(rowsHTML);
		
		var fields=document.getElementById("form192_"+id);
		var name_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var price_filter=fields.elements[2];
		var amount_filter=fields.elements[3];
		var tax_filter=fields.elements[4];
		var total_filter=fields.elements[5];
		var id_filter=fields.elements[6];
		var save_button=fields.elements[7];
		var tax_unit_filter=fields.elements[9];
		
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form192_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form192_add_item();
		});
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(product_data,name_filter,function () 
		{
			$(name_filter).focus();
		});

		var add_product=document.getElementById('form192_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal112_action(function()
			{	
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list_func(product_data,name_filter,function () 
				{
					$(name_filter).focus();
				});
			});
		});
		
		$(name_filter).on('blur',function(event)
		{			
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
		
		$(quantity_filter).add(price_filter).on('blur',function(event)
		{
			amount_filter.value=my_round((parseFloat(quantity_filter.value)*parseFloat(price_filter.value)),2);
			tax_filter.value=my_round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);
			var total=parseFloat(amount_filter.value)+parseFloat(tax_filter.value);
			total_filter.value=my_round(total,0);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Adjust Inventory
 * @formNo 193
 */
function form193_add_item()
{
	if(is_create_access('form193'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='193form193_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td id='form193_barcode_"+id+"' data-th='Barcode'>";
				rowsHTML+="<input type='text' form='193form193_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="SKU: <input type='text' required form='193form193_"+id+"'>";
				rowsHTML+="<br>Name: <textarea form='193form193_"+id+"' readonly='readonly'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' form='193form193_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="1";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='193form193_"+id+"' id='save_form193_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='193form193_"+id+"' id='delete_form193_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form193_body').prepend(rowsHTML);
		
		var fields=document.getElementById("193form193_"+id);
		var barcode_filter=fields.elements[0];
		var name_filter=fields.elements[1];
		var desc_filter=fields.elements[2];
		var batch_filter=fields.elements[3];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form193_add_item();
		});

		$(barcode_filter).focus();
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter);

		$(name_filter).on('blur',function(event)
		{
			var desc_data="<product_master>"+
						"<description></description>"+
						"<bar_code></bar_code>"+
						"<name exact='yes'>"+name_filter.value+"</name>"+						
						"</product_master>";
			fetch_requested_data('',desc_data,function (descs) 
			{
				if(descs.length>0)
				{
					desc_filter.value=descs[0].description;
					barcode_filter.value=descs[0].bar_code;
					
					if(barcode_filter.value!="")
					{	
						var barcode_td=document.getElementById('form193_barcode_'+id);
						$(barcode_td).append("<img src='./images/barcode.png' class='barcode_icon' title='Print Barcode - "+descs[0].bar_code+"' onclick=\"print_product_barcode('"+descs[0].bar_code+"','"+name_filter.value+"','"+descs[0].description+"');\">");
					}
					else 
					{
						var string=""+get_my_time();
						modal116_action(string,name_filter.value);
						$(barcode_td).append("<img src='./images/barcode.png' class='barcode_icon' title='Print Barcode - "+string+"' onclick=\"print_product_barcode('"+string+"','"+name_filter.value+"','"+descs[0].description+"');\">");
					}
				}
			});

			var batch_data="<product_instances>"+
						"<batch></batch>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+						
						"</product_instances>";
			set_my_value_list(batch_data,batch_filter);

			var rows_length=$('#form193_body').find('tr').length;
			
			$("[id^='193form193_']").each(function (index)
			{
				if((index!=0 || rows_length==1) && this.elements[1].value==name_filter.value)
				{
					batch_filter.value=this.elements[3].value;
					if(batch_filter.value=="")
					{
						batch_filter.value=name_filter.value;						
						$(batch_filter).focus();
						$('#form193_body>tr:first').remove();						
					}
					//	return false;
				}
			});
		});
		
		$(barcode_filter).on('keydown',function (event) 
		{
			if(event.keyCode == 13 ) 
			{
				event.preventDefault();
				var item_data="<product_master count='1'>"+
							"<name></name>"+
							"<description></description>"+
							"<bar_code exact='yes'>"+barcode_filter.value+"</bar_code>"+
							"</product_master>";
				fetch_requested_data('',item_data,function (products) 
				{
					if(products.length>0)
					{
						desc_filter.value=products[0].description;
						name_filter.value=products[0].name;	
		
						var batch_data="<product_instances>"+
									"<batch></batch>"+
									"<product_name exact='yes'>"+name_filter.value+"</product_name>"+						
									"</product_instances>";
						set_my_value_list(batch_data,batch_filter);
						
						var rows_length=$('#form193_body').find('tr').length;
						
						$("[id^='193form193_']").each(function (index)
						{
							if((index!=0 || rows_length==1) && this.elements[1].value==name_filter.value)
							{
								batch_filter.value=this.elements[3].value;
								//return false;
							}
						});
						if(batch_filter.value=="")
						{
							batch_filter.value=name_filter.value;
							$(batch_filter).focus();									
						}
						else
						{
							form193_add_item();				
						}
					}
					else
					{
						modal116_action(barcode_filter.value);
						barcode_filter.value="";
					}
				});
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Supplier Item Mapping
 * @formNo 197
 */
function form197_add_item()
{
	if(is_create_access('form197'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form197_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' form='form197_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Supplier'>";
				rowsHTML+="<input type='text' form='form197_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form197_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form197_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form197_"+id+"' onclick='$(this).parent().parent().remove();'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form197_body').prepend(rowsHTML);
		var fields=document.getElementById("form197_"+id);
		var product_filter=fields.elements[0];
		var supplier_filter=fields.elements[1];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form197_create_item(fields);
		});
				
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(product_data,product_filter,function () 
		{
			$(product_filter).focus();
		});
		
		
		var supplier_data="<suppliers>" +
				"<acc_name></acc_name>" +
				"</suppliers>";
		set_my_filter(supplier_data,supplier_filter);
		
		$('textarea').autosize();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Incoming Items
 * @formNo 199
 */
function form199_add_item()
{
	if(is_create_access('form199'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form199_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='AWB #'>";
				rowsHTML+="<input type='text' required form='form199_"+id+"' oninvalid=\"setCustomValidity('This AWB # is invalid')\">";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Order #'>";
				rowsHTML+="<input type='text' form='form199_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form199_"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form199_"+id+"' id='save_form199_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form199_"+id+"' id='delete_form199_"+id+"' onclick='form199_delete_item($(this));'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form199_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form199_"+id);
		var awb_filter=fields.elements[0];
		var order_filter=fields.elements[1];
		var id_filter=fields.elements[2];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form199_add_item();
		});

		var awb_data="<logistics_orders>"+
					"<awb_num></awb_num>"+
					"<status exact='yes'>picked</status>"+
					"</logistics_orders>";
		set_my_value_list(awb_data,awb_filter,function () 
		{
			$(awb_filter).focus();		
		});

		$(awb_filter).on('keydown',function (event) 
		{
			if(event.keyCode == 13 ) 
			{
//				event.preventDefault();
				var order_data="<logistics_orders count='1'>"+
							"<id></id>"+
							"<order_num></order_num>"+
							"<awb_num exact='yes'>"+awb_filter.value+"</awb_num>"+
							"</logistics_orders>";
				fetch_requested_data('',order_data,function(orders)
				{
					if(orders.length>0)
					{
						order_filter.value=orders[0].order_num;
						id_filter.value=orders[0].id;
						form199_update_item(fields);
					}
				});				
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Pending Logistics Orders
 * @formNo 204
 */
function form204_add_item()
{
	if(is_create_access('form204'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form204_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='AWB #'>";
				rowsHTML+="<input type='text' required form='form204_"+id+"' oninvalid=\"setCustomValidity('This AWB # is invalid')\">";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Order #'>";
				rowsHTML+="<input type='text' form='form204_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form204_"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form204_"+id+"' id='save_form204_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form204_"+id+"' id='delete_form204_"+id+"' onclick='form204_delete_item($(this))'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form204_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form204_"+id);
		var awb_filter=fields.elements[0];
		var order_filter=fields.elements[1];
		var id_filter=fields.elements[2];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form204_add_item();
		});

		var awb_data="<logistics_orders>"+
					"<awb_num></awb_num>"+
					"<status exact='yes'>out for delivery</status>"+
					"</logistics_orders>";
		set_my_value_list(awb_data,awb_filter,function () 
		{
			$(awb_filter).focus();		
		});

		$(awb_filter).on('keydown',function (event) 
		{
			if(event.keyCode == 13 ) 
			{
				var order_data="<logistics_orders count='1'>"+
							"<order_num></order_num>"+
							"<awb_num exact='yes'>"+awb_filter.value+"</awb_num>"+
							"</logistics_orders>";
				fetch_requested_data('',order_data,function(orders)
				{
					if(orders.length>0)
					{
						order_filter.value=orders[0].order_num;
						id_filter.value=orders[0].id;
						form204_update_item(fields);
					}
				});					
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form unDelivered Logistics Orders
 * @formNo 205
 */
function form205_add_item()
{
	if(is_create_access('form205'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form205_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='AWB #'>";
				rowsHTML+="<input type='text' required form='form205_"+id+"' oninvalid=\"setCustomValidity('This AWB # is invalid')\">";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Order #'>";
				rowsHTML+="<input type='text' form='form205_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form205_"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form205_"+id+"' id='save_form205_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form205_"+id+"' id='delete_form205_"+id+"' onclick='form205_delete_item($(this));'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form205_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form205_"+id);
		var awb_filter=fields.elements[0];
		var order_filter=fields.elements[1];
		var id_filter=fields.elements[2];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form205_add_item();
		});

		var awb_data="<logistics_orders>"+
					"<awb_num></awb_num>"+
					"<status exact='yes'>out for delivery</status>"+
					"</logistics_orders>";
		set_my_value_list(awb_data,awb_filter,function () 
		{
			$(awb_filter).focus();		
		});

		$(awb_filter).on('keydown',function (event) 
		{
			if(event.keyCode == 13 ) 
			{
				var order_data="<logistics_orders count='1'>"+
							"<order_num></order_num>"+
							"<awb_num exact='yes'>"+awb_filter.value+"</awb_num>"+
							"</logistics_orders>";
				fetch_requested_data('',order_data,function(orders)
				{
					if(orders.length>0)
					{
						order_filter.value=orders[0].order_num;
						id_filter.value=orders[0].id;
						form205_update_item(fields);
					}
				});				
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form delivered Logistics Orders
 * @formNo 206
 */
function form206_add_item()
{
	if(is_create_access('form206'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form206_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='AWB #'>";
				rowsHTML+="<input type='text' required form='form206_"+id+"' oninvalid=\"setCustomValidity('This AWB # is invalid')\">";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Order #'>";
				rowsHTML+="<input type='text' form='form206_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form206_"+id+"'>";	
				rowsHTML+="<input type='submit' class='save_icon' form='form206_"+id+"' id='save_form206_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form206_"+id+"' id='delete_form206_"+id+"' onclick='form206_delete_item($(this));'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form206_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form206_"+id);
		var awb_filter=fields.elements[0];
		var order_filter=fields.elements[1];
		var id_filter=fields.elements[2];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form206_add_item();
		});

		var awb_data="<logistics_orders>"+
					"<awb_num></awb_num>"+
					"<status exact='yes'>out for delivery</status>"+
					"</logistics_orders>";
		set_my_value_list(awb_data,awb_filter,function () 
		{
			$(awb_filter).focus();		
		});

		$(awb_filter).on('keydown',function (event) 
		{
			if(event.keyCode == 13 ) 
			{
				var order_data="<logistics_orders count='1'>"+
							"<order_num></order_num>"+
							"<awb_num exact='yes'>"+awb_filter.value+"</awb_num>"+
							"</logistics_orders>";
				fetch_requested_data('',order_data,function(orders)
				{
					if(orders.length>0)
					{
						order_filter.value=orders[0].order_num;
						id_filter.value=orders[0].id;
						form206_update_item(fields);
					}
				});					
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}