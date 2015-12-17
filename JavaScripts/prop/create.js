/**
 * @form Create Newsletter
 * @param button
 */
function form2_create_item(form)
{
	if(is_create_access('form2'))
	{
		if(is_online())
		{
			var nl_id=document.getElementById('form2_master').elements[3].value;
			var type=form.elements[0].value;
			var name=form.elements[1].value;
			var detail=form.elements[2].value;
			var url=form.elements[3].value;
			var column_size=form.elements[6].value;
			var data_id=form.elements[7].value;
			var blob=$("#img_form2_"+data_id).attr('src');
			var blob_name="client_images/"+data_id+".jpeg";
			var del_button=form.elements[9];
			var last_updated=get_my_time();
			var data_xml="<newsletter_items>" +
						"<id>"+data_id+"</id>" +
						"<item_name>"+name+"</item_name>" +
						"<item_type>"+type+"</item_type>" +
						"<item_detail>"+detail+"</item_detail>" +
						"<nl_id>"+nl_id+"</nl_id>" +
						"<url>"+url+"</url>"+
						"<data_blob>"+blob+"</data_blob>"+
						"<pic_url>"+blob_name+"</pic_url>"+
						"<column_size>"+column_size+"</column_size>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</newsletter_items>";			
			$.ajax(
			{
				type: "POST",
				url: "./ajax/save_image.php",
				data: 
				{
					blob: blob,
					name:blob_name
				}
			});
		
			console.log(data_xml);
			server_create_simple(data_xml);
			
			for(var i=0;i<7;i++)
			{
				$(form.elements[i]).attr('readonly','readonly');
			}
			del_button.removeAttribute("onclick");
			$(del_button).on('click',function(event)
			{
				form2_delete_item(del_button);
			});
			
			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form2_update_item(form);
			});
		}
		else
		{
			$("#modal6").dialog("open");		
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create NewsLetter
 * @param button
 */
function form2_create_form()
{
	if(is_create_access('form2'))
	{
		var form=document.getElementById("form2_master");

		var name=form.elements[1].value;
		var description=form.elements[2].value;
		var data_id=form.elements[3].value;
		var save_button=form.elements[4];	

		var last_updated=get_my_time();
		var data_xml="<newsletter>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"</name>" +
					"<description>"+description+"</description>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</newsletter>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>newsletter</tablename>" +
					"<link_to>form2</link_to>" +
					"<title>Created</title>" +
					"<notes>NewsLetter "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}
	
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form2_update_form();
		});
		
		$("[id^='save_form2_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}


/**
 * @form Attendance
 * @param button
 */
function form7_create_item(form)
{
	if(is_create_access('form1'))
	{
		var name=form.elements[0].value;
		var presence=form.elements[1].value;
		var hours=form.elements[2].value;
		var data_id=form.elements[3].value;
		var date=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<attendance>" +
					"<id>"+data_id+"</id>" +
					"<acc_name>"+name+"</acc_name>" +
					"<presence>"+presence+"</presence>" +
					"<date>"+date+"</date>" +
					"<hours_worked>"+hours+"</hours_worked>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attendance>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
				
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form7_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
	
}


/**
 * @form Service bill
 * @param button
 */
function form10_create_item(form)
{
	if(is_create_access('form10'))
	{
		var bill_id=document.getElementById("form10_master").elements['bill_id'].value;
		
		var name=form.elements[0].value;
		var notes=form.elements[1].value;
		var quantity=form.elements[2].value;
		var price=form.elements[3].value;
		var amount=form.elements[4].value;
		var discount=form.elements[5].value;
		var tax=form.elements[6].value;
		var total=form.elements[7].value;
		var data_id=form.elements[8].value;
		var save_button=form.elements[9];
		var del_button=form.elements[10];
		var last_updated=get_my_time();
		
		var data_xml="<bill_items>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+name+"</item_name>" +
					"<unit_price>"+price+"</unit_price>" +
					"<notes>"+notes+"</notes>" +
					"<quantity>"+quantity+"</quantity>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<discount>"+discount+"</discount>" +
					"<type>bought</type>" +
					"<tax>"+tax+"</tax>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bill_items>";	
		create_simple(data_xml);
		
		for(var i=0;i<8;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form10_delete_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Service Reciept
 * @param button
 */
function form10_create_form()
{
	if(is_create_access('form10'))
	{
		var form=document.getElementById("form10_master");
		
		var customer=form.elements['customer'].value;
		var order_num=form.elements['order_num'].value;
		var bill_num=form.elements['bill_num'].value;
		var bill_date=get_raw_time(form.elements['bill_date'].value);
		var due_date=get_raw_time(form.elements['due_date'].value);
		var payment_filter=form.elements['payment'];
		
		$('#form10_share').show();
		$('#form10_share').click(function()
		{
			modal101_action('Sale Bill',customer,'customer',function (func) 
			{
				print_form10(func);
			});
		});

		var quantity=0;
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form10_']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			
			if(!isNaN(parseFloat(subform.elements[2].value)))
			{
				quantity+=parseFloat(subform.elements[2].value);
			}	
			if(!isNaN(parseFloat(subform.elements[4].value)))
			{
				amount+=parseFloat(subform.elements[4].value);
			}	
			if(!isNaN(parseFloat(subform.elements[5].value)))
			{
				discount+=parseFloat(subform.elements[5].value);
			}	
			if(!isNaN(parseFloat(subform.elements[6].value)))
			{
				tax+=parseFloat(subform.elements[6].value);
			}	
			if(!isNaN(parseFloat(subform.elements[7].value)))
			{
				total+=parseFloat(subform.elements[7].value);
			}
		});

		var data_id=form.elements['bill_id'].value;
		var order_id=form.elements['order_id'].value;
		var transaction_id=form.elements['t_id'].value;
		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var data_xml="<bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_num>"+bill_num+"</bill_num>"+
					"<order_id>"+order_id+"</order_id>"+
					"<order_num>"+order_num+"</order_num>"+
					"<customer_name>"+customer+"</customer_name>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<due_date>"+due_date+"</due_date>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<total_quantity>"+quantity+"</total_quantity>" +					
					"<type>service</type>" +
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
		var sale_order_xml="<sale_orders>" +
					"<id>"+order_id+"</id>" +
					"<bill_id>"+data_id+"</bill_id>"+
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_orders>";
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
					"<status>pending</status>" +
					"<type>received</type>" +
					"<date>"+get_my_time()+"</date>" +
					"<total_amount>"+total+"</total_amount>" +
					"<paid_amount>0</paid_amount>" +
					"<acc_name>"+customer+"</acc_name>" +
					"<due_date>"+get_credit_period()+"</due_date>" +
					"<mode>"+get_payment_mode()+"</mode>" +
					"<transaction_id>"+pt_tran_id+"</transaction_id>" +
					"<bill_id>"+data_id+"</bill_id>" +
					"<source_info>for sale bill #"+bill_num+"</source_info>"+
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
		update_simple(sale_order_xml);
		create_simple(pt_xml);
		create_simple_func(payment_xml,function()
		{
			modal26_action(pt_tran_id,function (mode,paid) 
			{
				if(parseFloat(paid)==0)
					payment_filter.value="Unpaid<br>Balance: Rs. "+total;
				else if(parseFloat(paid)==parseFloat(total))
					payment_filter.value="Paid<br>Balance: Rs. 0";	
				else 
					payment_filter.value="Partially paid<br>Balance: Rs. "+(parseFloat(total)-parseFloat(paid));	
				
				modal127_action();
			});
		});

		
		var total_row="<tr><td colspan='2' data-th='Total'>Total<br>PCS: "+quantity+"</td>" +
					"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. "+discount+"</br>" +
					"Rs. "+tax+"</br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		$('#form10_foot').html(total_row);
	
		var sms="We have got your clothes for drycleaning (total "+quantity+" pcs). It will be processed and delivered back to you soon.";
		var phone_xml="<customers>"+
					"<phone></phone>"+
					"<name></name>"+
					"<acc_name exact='yes'>"+customer+"</acc_name>"+
					"</customers>";
		fetch_requested_data('',phone_xml,function(phones)
		{
			var to=phones[0].phone;
			var customer_name=phones[0].name;
			var sms_content=sms.replace(/customer_name/g,customer_name);		
			send_sms(to,sms_content,'transaction');
					
			//hide_loader();			
		});
		
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form10_update_form();
		});
		
		$("[id^='save_form10_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form New Bill
 * @param button
 */
function form12_create_item(form)
{
	if(is_create_access('form12'))
	{
		var bill_id=document.getElementById("form12_master").elements[4].value;
		
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var quantity=form.elements[2].value;
		var price=form.elements[3].value;
		var total=form.elements[4].value;
		var amount=form.elements[5].value;
		var discount=form.elements[6].value;
		var tax=form.elements[7].value;
		var offer=form.elements[8].value;
		var data_id=form.elements[9].value;
		var free_product_name=form.elements[12].value;
		var free_product_quantity=form.elements[13].value;

		var storage=get_session_var('sales_store');		
		
		var last_updated=get_my_time();
		
		var data_xml="<bill_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<batch>"+batch+"</batch>" +
				"<unit_price>"+price+"</unit_price>" +
				"<quantity>"+quantity+"</quantity>" +
				"<amount>"+amount+"</amount>" +
				"<total>"+total+"</total>" +
				"<discount>"+discount+"</discount>" +
				"<offer>"+offer+"</offer>" +
				"<type>bought</type>" +
				"<tax>"+tax+"</tax>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<free_with></free_with>" +
				"<storage>"+storage+"</storage>"+				
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}

		//////adding free product to the bill if applicable
		if(free_product_name!="" && free_product_name!=null)
		{
			get_inventory(free_product_name,'',function(free_quantities)
			{
				if(free_quantities>=free_product_quantity)
				{
					var free_batch_data="<bill_items count='1'>" +
							"<batch></batch>" +
							"<item_name exact='yes'>"+free_product_name+"</item_name>" +
							"</bill_items>";
					get_single_column_data(function(data)
					{
						var free_batch="";
						if(data.length>0)
						{
							free_batch=data[0];	
						}
						
						var id=get_new_key();
						rowsHTML="<tr>";
							rowsHTML+="<form id='form12_"+id+"'></form>";
			                	rowsHTML+="<td>";
			                    	rowsHTML+="<input type='text' readonly='readonly' form='form12_"+id+"' value='"+free_product_name+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='text' required form='form12_"+id+"' value='"+free_batch+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='"+free_product_quantity+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='0'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='0'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='0'>";
		                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='0'>";
		                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='0'>";
		                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='free with "+name+"'>";
		                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+id+"'>";
		                                rowsHTML+="<input type='button' class='save_icon' form='form12_"+id+"' id='save_form12_"+id+"' >";
		                                rowsHTML+="<input type='button' class='delete_icon' form='form12_"+id+"' id='delete_form12_"+id+"' onclick='form12_delete_item($(this));'>";
		                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
		                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
		                        rowsHTML+="</td>";
		                rowsHTML+="</tr>";
	
		                $('#form12_body').prepend(rowsHTML);
	
						var free_xml="<bill_items>" +
									"<id>"+id+"</id>" +
									"<item_name>"+free_product_name+"</item_name>" +
									"<batch>"+free_batch+"</batch>" +
									"<unit_price>0</unit_price>" +
									"<quantity>"+free_product_quantity+"</quantity>" +
									"<amount>0</amount>" +
									"<total>0</total>" +
									"<discount>0</discount>" +
									"<offer></offer>" +
									"<type>free</type>" +
									"<tax>0</tax>" +
									"<bill_id>"+bill_id+"</bill_id>" +
									"<free_with>"+name+"</free_with>" +
									"<storage>"+storage+"</storage>"+				
									"<last_updated>"+last_updated+"</last_updated>" +
									"</bill_items>";	
						if(is_online())
						{
							server_create_simple(free_xml);
						}
						else
						{
							local_create_simple(free_xml);
						}
					},free_batch_data);
				}
				else
				{
					$("#modal7").dialog("open");
				}
			});
		}
		
		for(var i=0;i<10;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[11];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form12_delete_item(del_button);
		});

		var save_button=form.elements[10];
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form New Bill
 * @param button
 */
function form12_create_form()
{
	if(is_create_access('form12'))
	{
		var form=document.getElementById("form12_master");
		
		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		var bill_num=form.elements[3].value;
		var storage=get_session_var('sales_store');		
		
		var message_string="Bill from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');
		
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form12']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
			
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Quantity: "+subform.elements[2].value;
			message_string+=" Total: "+subform.elements[4].value;
		});

		var data_id=form.elements[4].value;
		var transaction_id=form.elements[6].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		var offer_data="<offers>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount upperbound='yes'>"+(amount-discount)+"</criteria_amount>" +
				"<offer_type exact='yes'>bill</offer_type>" +
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
				else 
				{	return -1;}
			});
			
			for(var i in offers)
			{
				if(offers[i].result_type=='discount')
				{
					if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
					{
						var dis=parseFloat(((amount-discount)*parseInt(offers[i].discount_percent))/100);
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
					else 
					{
						var dis=parseFloat(offers[i].discount_amount)*(Math.floor((amount-discount)/parseFloat(offers[i].criteria_amount)));
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
				}
				else if(offers[i].result_type=='product free')
				{
					var free_product_name=offers[i].free_product_name;
					var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount-discount)/parseFloat(offers[i].criteria_amount)));
					
					get_inventory(free_product_name,'',function(free_quantities)
					{
						if(free_quantities>=free_product_quantity)
						{
							var free_batch_data="<bill_items count='1'>" +
									"<batch></batch>" +
									"<item_name exact='yes'>"+free_product_name+"</item_name>" +
									"</bill_items>";
							get_single_column_data(function(data)
							{
								var free_batch="";
								if(data.length>0)
								{
									free_batch=data[0];	
								}

								var id=get_new_key();
								rowsHTML="<tr>";
									rowsHTML+="<form id='form12_"+id+"'></form>";
					                	rowsHTML+="<td>";
					                    	rowsHTML+="<input type='text' readonly='readonly' form='form12_"+id+"' value='"+free_product_name+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='text' required form='form12_"+id+"' value='"+free_batch+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='"+free_product_quantity+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                        	rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='free on the bill amount'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+id+"'>";
				                                rowsHTML+="<input type='button' class='save_icon' form='form12_"+id+"' id='save_form12_"+id+"' >";
				                                rowsHTML+="<input type='button' class='delete_icon' form='form12_"+id+"' id='delete_form12_"+id+"' onclick='form12_delete_item($(this));'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
				                        rowsHTML+="</td>";
				                rowsHTML+="</tr>";

				                $('#form12_body').prepend(rowsHTML);

				                var free_xml="<bill_items>" +
											"<id>"+id+"</id>" +
											"<item_name>"+free_product_name+"</item_name>" +
											"<batch>"+free_batch+"</batch>" +
											"<unit_price>0</unit_price>" +
											"<quantity>"+free_product_quantity+"</quantity>" +
											"<amount>0</amount>" +
											"<total>0</total>" +
											"<discount>0</discount>" +
											"<offer></offer>" +
											"<type>free</type>" +
											"<tax>0</tax>" +
											"<bill_id>"+data_id+"</bill_id>" +
											"<free_with>bill</free_with>" +
											"<storage>"+storage+"</storage>"+				
											"<last_updated>"+last_updated+"</last_updated>" +
											"</bill_items>";	
								
								if(is_online())
								{
									server_create_simple(free_xml);
								}
								else
								{
									local_create_simple(free_xml);
								}
							},free_batch_data);
						}
						else
						{
							$("#modal7").dialog("open");
						}
					});
				}
				offer_detail=offers[i].offer_detail;
				break;
			}
			
			var data_xml="<bills>" +
						"<id>"+data_id+"</id>" +
						"<bill_num></bill_num>"+
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>product</type>" +
						"<offer>"+offer_detail+"</offer>" +
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
						"<bill_id>"+data_id+"</bill_id>" +
						"<source_info>for sale bill #"+bill_num+"</source_info>"+
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
					if(is_online())
					{
						server_update_simple(num_xml);
					}
					else 
					{
						local_update_simple(num_xml);
					}
				}
			},num_data);
						
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
				server_create_simple(transaction_xml);
				server_create_simple(pt_xml);
				server_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id);
				});
			}
			else
			{
				local_create_row(data_xml,activity_xml);
				local_create_simple(transaction_xml);
				local_create_simple(pt_xml);
				local_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id);
				});
			}
			
			message_string+="\nAmount: "+amount;
			message_string+="\ndiscount: "+discount;
			message_string+="\nTax: "+tax;
			message_string+="\nTotal: "+total;
			
			var subject="Bill from "+get_session_var('title');
			$('#form12_share').show();
			$('#form12_share').click(function()
			{
				modal44_action(customer,subject,message_string);
			});
			
			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
						"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+discount+"</br>" +
						"Rs. "+tax+"</br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
			$('#form12_foot').html(total_row);
		});

		var save_button=form.elements[7];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form12_update_form();
		});
		
		$("[id^='save_form12_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Manage Tasks
 * @param button
 */
function form14_create_item(form)
{
	if(is_create_access('form14'))
	{
		var name=form.elements[0].value;
		var assignee=form.elements[1].value;
		var t_due=get_raw_time(form.elements[2].value);
		var status=form.elements[3].value;
		var hours=form.elements[7].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<assignee>"+assignee+"</assignee>" +
					"<t_initiated>"+get_my_time()+"</t_initiated>" +
					"<t_due>"+t_due+"</t_due>" +
					"<status>"+status+"</status>" +
					"<task_hours>"+hours+"</task_hours>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_instances>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>task_instances</tablename>" +
					"<link_to>form14</link_to>" +
					"<title>Added</title>" +
					"<notes>Task "+name+" assigned to "+assignee+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		var message_string="Due time: "+form.elements[2].value+"\nTask: "+name+"\nAssignee:"+assignee;
		message_string=encodeURIComponent(message_string);
		$("#form14_whatsapp_"+data_id).attr('href',"whatsapp://send?text="+message_string);
		$("#form14_whatsapp_"+data_id).show();
		
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form14_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form14_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Enter customer returns 
 * @param button
 */
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
			var discard_id=get_new_key();
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
						"<id>"+get_new_key()+"</id>" +
						"<name>"+storage+"</name>" +
						"<item_name>"+name+"</item_name>" +
						"<batch>"+batch+"</batch>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				if(is_online())
				{
					server_create_simple(storage_xml);
				}
				else
				{
					local_create_simple(storage_xml);
				}
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
		$("#modal2").dialog("open");
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
		var pt_tran_id=get_new_key();
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
					"<bill_id>"+data_id+"</bill_id>" +
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Enter supplier returns 
 * @param button
 */
function form19_create_item(form)
{
	if(is_create_access('form19'))
	{
		var return_id=document.getElementById("form19_master").elements[3].value;
		var storage=get_session_var('purchase_return_store');
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var notes=form.elements[2].value;
		var quantity=form.elements[3].value;
		var saleable='unchecked';
		if(form.elements[4].checked)
			saleable='checked';
		var total=form.elements[5].value;
		var tax=form.elements[6].value;
		var data_id=form.elements[7].value;
		
		var last_updated=get_my_time();
			
		var data_xml="<supplier_return_items>" +
				"<id>"+data_id+"</id>" +
				"<return_id>"+return_id+"</return_id>" +
				"<item_name>"+name+"</item_name>" +
				"<batch>"+batch+"</batch>" +
				"<quantity>"+quantity+"</quantity>" +
				"<saleable>"+saleable+"</saleable>" +
				"<refund_amount>"+total+"</refund_amount>" +
				"<tax>"+tax+"</tax>" +
				"<storage>"+storage+"</storage>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</supplier_return_items>";	
	
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
			var discard_id=get_new_key();
			var discard_xml="<discarded>" +
					"<id>"+discard_id+"</id>" +
					"<product_name>"+name+"</product_name>" +
					"<source_id>"+return_id+"</source_id>" +
					"<batch>"+batch+"</batch>" +
					"<source>purchase return</source>" +
					"<source_link>form19</source_link>" +
					"<quantity>"+(-quantity)+"</quantity>" +
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
		
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[11];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form19_delete_item(del_button);
		});

		var save_button=form.elements[10];
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form enter supplier returns
 * @param button
 */
function form19_create_form()
{
	if(is_create_access('form19'))
	{
		var form=document.getElementById("form19_master");
		
		var supplier=form.elements[1].value;
		var return_date=get_raw_time(form.elements[2].value);
		
		var message_string="Returns from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');
		
		var total=0;
		var tax=0;
		
		$("[id^='save_form19']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);	
			total+=parseFloat(subform.elements[5].value);
			tax+=parseFloat(subform.elements[6].value);
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Quantity: "+subform.elements[3].value;
			message_string+=" Amount: "+subform.elements[5].value;
		});

		message_string+="\nTotal Refund Rs : "+total;
		
		var subject="Returns from "+get_session_var('title');
		$('#form19_share').show();
		$('#form19_share').click(function()
		{
			modal44_action(supplier,subject,message_string);
		});
		
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Refund:</td>" +
				"<td>Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form19_foot').html(total_row);

		var data_id=form.elements[3].value;
		var transaction_id=form.elements[4].value;
		var last_updated=get_my_time();
		
		var data_xml="<supplier_returns>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<return_date>"+return_date+"</return_date>" +
					"<total>"+total+"</total>" +
					"<tax>"+tax+"</tax>" +
					"<type>product</type>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_returns>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>supplier_returns</tablename>" +
					"<link_to>form17</link_to>" +
					"<title>Saved</title>" +
					"<notes>Returns to supplier "+supplier+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>"+supplier+"</receiver>" +
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
					"<paid_amount>0</paid_amount>" +
					"<acc_name>"+supplier+"</acc_name>" +
					"<due_date>"+get_credit_period()+"</due_date>" +
					"<mode>"+get_payment_mode()+"</mode>" +
					"<transaction_id>"+pt_tran_id+"</transaction_id>" +
					"<bill_id>"+data_id+"</bill_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</payments>";
		var pt_xml="<transactions>" +
					"<id>"+pt_tran_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>master</receiver>" +
					"<giver>"+supplier+"</giver>" +
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
				modal26_action(pt_tran_id);
			});
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(transaction_xml);
			local_create_simple(pt_xml);
			local_create_simple_func(payment_xml,function()
			{
				modal26_action(pt_tran_id);
			});
		}
		
		var save_button=form.elements[5];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form19_update_form();
		});
		$("[id^='save_form19_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form New Purchase Bill (aurilion)
 * @formNo 21
 * @param button
 */
function form21_create_item(form)
{
	if(is_create_access('form21'))
	{
		var bill_id=document.getElementById("form21_master").elements[6].value;
		var name=form.elements[1].value;
		var batch=form.elements[2].value;
		var quantity=form.elements[3].value;
		var price=form.elements[4].value;
		var amount=form.elements[5].value;
		var discount=form.elements[6].value;
		var tax=form.elements[7].value;
		var total=form.elements[8].value;
		var data_id=form.elements[9].value;
		var save_button=form.elements[10];
		var del_button=form.elements[11];
		
		var last_updated=get_my_time();

		var data_xml="<supplier_bill_items>" +
				"<id>"+data_id+"</id>" +
				"<product_name>"+name+"</product_name>" +
				"<batch>"+batch+"</batch>" +
				"<quantity>"+quantity+"</quantity>" +
				"<total>"+total+"</total>" +
				"<tax>"+tax+"</tax>" +
				"<amount>"+amount+"</amount>" +
				"<discount>"+discount+"</discount>" +
				"<unit_price>"+price+"</unit_price>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</supplier_bill_items>";	
	
		create_simple(data_xml);
			
		for(var i=0;i<9;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form21_delete_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form New supplier Bill
 * @param button
 */
function form21_create_form()
{
	if(is_create_access('form21'))
	{
		var form=document.getElementById("form21_master");
		
		var supplier=form.elements['supplier'].value;
		var bill_id=form.elements['bill_num'].value;
		var bill_date=get_raw_time(form.elements['date'].value);
		var entry_date=get_raw_time(form.elements['edate'].value);
		var data_id=form.elements['bill_id'].value;
		var transaction_id=form.elements['t_id'].value;
		var save_button=form.elements['save'];
		
		var total=0;
		var tax=0;
		var discount=0;
		var amount=0;
		
		$("[id^='save_form21']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
			total+=parseFloat(subform.elements[8].value);
		});

		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+discount+"</br>" +
				"Rs. "+tax+"</br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form21_foot').html(total_row);

		var last_updated=get_my_time();
		
		var data_xml="<supplier_bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<entry_date>"+entry_date+"</entry_date>" +
					"<total>"+total+"</total>" +
					"<discount>"+discount+"</discount>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>supplier_bills</tablename>" +
					"<link_to>form53</link_to>" +
					"<title>Saved</title>" +
					"<notes>Purchase Bill no "+bill_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
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
					"<bill_id>"+data_id+"</bill_id>" +
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
			form21_update_form();
		});
		
		$("[id^='save_form21_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form New Purchase Order
 * @param button
 */
function form24_create_item(form)
{
	if(is_create_access('form24'))
	{
		var order_id=document.getElementById("form24_master").elements['order_id'].value;
		
		var name=form.elements[0].value;
		var desc=form.elements[1].value;
		var quantity=form.elements[2].value;
		var make=form.elements[3].value;
		var supplier_sku=form.elements[4].value;
		var mrp=form.elements[5].value;
		var price=form.elements[6].value;
		var amount=form.elements[7].value;
		var tax_rate=form.elements[8].value;
		var tax=form.elements[9].value;
		var total=form.elements[10].value;
		var data_id=form.elements[11].value;
		var save_button=form.elements[12];
		var del_button=form.elements[13];
		var last_updated=get_my_time();
		var data_xml="<purchase_order_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<item_desc>"+desc+"</item_desc>" +
				"<quantity>"+quantity+"</quantity>" +
				"<order_id>"+order_id+"</order_id>" +
				"<make>"+make+"</make>" +
				"<supplier_sku>"+supplier_sku+"</supplier_sku>" +
				"<mrp>"+mrp+"</mrp>" +
				"<price>"+price+"</price>" +
				"<amount>"+amount+"</amount>" +
				"<tax>"+tax+"</tax>" +
				"<tax_rate>"+tax_rate+"</tax_rate>" +
				"<total>"+total+"</total>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</purchase_order_items>";	
	
		create_simple(data_xml);
		
		for(var i=0;i<11;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form24_delete_item(del_button);
		});
		
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form New Purchase Order
 * @param button
 */
function form24_create_form()
{
	if(is_create_access('form24'))
	{
		var form=document.getElementById("form24_master");
		var supplier=form.elements['supplier'].value;
		var order_date=get_raw_time(form.elements['date'].value);		
		var order_num=form.elements['order_num'].value;
		var status=form.elements['status'].value;
		var data_id=form.elements['order_id'].value;
		var save_button=form.elements['save'];
		
		var cst='no'
		if(form.elements['cst'].checked)
		{
			cst='yes';
		}
		var payment_mode=form.elements['mode'].value;
		
		var bt=get_session_var('title');
		$('#form24_share').show();
		$('#form24_share').click(function()
		{
			modal101_action(bt+' - PO# '+order_num+' - '+supplier,supplier,'supplier',function (func) 
			{
				print_form24(func);
			},'csv','Test,text,here');
		});
		
		var amount=0;
		var tax=0;
		var total=0;
		var total_quantity=0;
		
		$("[id^='save_form24']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			
			if(!isNaN(parseFloat(subform.elements[7].value)))
			{
				amount+=parseFloat(subform.elements[7].value);
				tax+=parseFloat(subform.elements[9].value);
				total+=parseFloat(subform.elements[10].value);
			}
			if(!isNaN(parseFloat(subform.elements[2].value)))			
				total_quantity+=parseFloat(subform.elements[2].value);						
		
		});
		
		
		if(form.elements['cst'].checked)
		{
			cst='yes';
			//tax+=.02*amount;
			//total+=.02*amount;
		}

		amount=my_round(amount,2);
		tax=my_round(tax,2);
		total=my_round(total,2);
			
		var total_row="<tr><td colspan='2' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
								"<td>Amount:<br>Tax: <br>Total: </td>" +
								"<td>Rs. "+amount+"<br>" +
								"Rs. "+tax+"<br> " +
								"Rs. "+total+"</td>" +
								"<td></td>" +
								"</tr>";
						
		$('#form24_foot').html(total_row);		

		var last_updated=get_my_time();		
		var data_xml="<purchase_orders>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<order_date>"+order_date+"</order_date>" +
					"<status>"+status+"</status>" +
					"<order_num>"+order_num+"</order_num>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<total>"+total+"</total>" +
					"<total_quantity>"+total_quantity+"</total_quantity>" +
					"<quantity_received>0</quantity_received>" +
					"<quantity_accepted>0</quantity_accepted>" +
					"<quantity_qc_pending>0</quantity_qc_pending>" +
					"<cst>"+cst+"</cst>"+
					"<payment_mode>"+payment_mode+"</payment_mode>"+					
					"<last_updated>"+last_updated+"</last_updated>" +
					"</purchase_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>purchase_orders</tablename>" +
					"<link_to>form43</link_to>" +
					"<title>Created</title>" +
					"<notes>Purchase order # "+order_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var	notification_xml="<notifications>" +
					"<id>"+get_new_key()+"</id>" +
					"<t_generated>"+get_my_time()+"</t_generated>" +
					"<data_id unique='yes'>"+data_id+"</data_id>" +
					"<title>Purchase Order created</title>" +
					"<notes>Purchase order # "+order_num+" has been created. Please review and place order.</notes>" +
					"<link_to>form43</link_to>" +
					"<status>pending</status>" +
					"<target_user></target_user>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</notifications>";
					
		
		create_row(data_xml,activity_xml);
		create_simple(notification_xml);
		
		var num_data="<user_preferences>"+
					"<id></id>"+						
					"<name exact='yes'>po_num</name>"+												
					"</user_preferences>";
		get_single_column_data(function (bill_num_ids)
		{
			if(bill_num_ids.length>0)
			{
				var num_xml="<user_preferences>"+
							"<id>"+bill_num_ids[0]+"</id>"+
							"<value>"+(parseInt(order_num)+1)+"</value>"+
							"<last_updated>"+last_updated+"</last_updated>"+
							"</user_preferences>";
				if(is_online())
				{
					server_update_simple(num_xml);
				}
				else 
				{
					local_update_simple(num_xml);
				}
			}
		},num_data);
			
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form24_update_form();
		});
		
		$("[id^='save_form24_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Store Placement
 * @param button
 */
function form38_create_item(form)
{
	if(is_create_access('form38'))
	{
		var product_name=form.elements[0].value;
		var batch=form.elements[1].value;
		var name=form.elements[2].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<area_utilization>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+product_name+"</item_name>" +
					"<batch>"+batch+"</batch>" +
					"<name>"+name+"</name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</area_utilization>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>area_utilization</tablename>" +
					"<link_to>form38</link_to>" +
					"<title>Added</title>" +
					"<notes>Item "+product_name+" to storage area "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var save_button=form.elements[5];
		$(save_button).hide();
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form38_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Access Control
 * @param button
 */
function form51_create_item(form)
{
	if(is_create_access('form51'))
	{
		var master_form=document.getElementById('form51_master');
		var username=master_form.elements[1].value;
		var name=master_form.elements[2].value;
			
		var element_name=form.elements[0].getAttribute('data-i18n');
		element_name=element_name.substr(element_name.indexOf('.')+1);
		var re='unchecked';
		if(form.elements[1].checked)
			re='checked';
		var cr='unchecked';
		if(form.elements[2].checked)
			cr='checked';
		var up='unchecked';
		if(form.elements[3].checked)
			up='checked';
		var del='unchecked';
		if(form.elements[4].checked)
			del='checked';
		var data_id=form.elements[5].value;
		var element_id=form.elements[6].value;
		var last_updated=get_my_time();
		var data_xml="<access_control>" +
					"<id>"+data_id+"</id>" +
					"<username>"+username+"</username>" +
					"<element_id>"+element_id+"</element_id>" +
					"<element_name>"+element_name+"</element_name>" +
					"<re>"+re+"</re>" +
					"<cr>"+cr+"</cr>" +
					"<up>"+up+"</up>" +
					"<del>"+del+"</del>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</access_control>";	
		create_simple(data_xml);
			
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form51_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * formNo 56
 * form Cash Register
 * @param button
 */
function form56_create_item(form)
{
	if(is_create_access('form56'))
	{
		var account=form.elements[0].value;
		var type=form.elements[1].value;
		var amount=form.elements[2].value;
		var date=get_raw_time(form.elements[3].value);
		var notes=form.elements[4].value;
		var data_id=form.elements[5].value;
		var del_button=form.elements[7];
		var last_updated=get_my_time();
		var receiver=account;
		var giver="master";
		
		var period=localStorage.getItem('debit_period');

		if(type=='received')
		{
			period=localStorage.getItem('credit_period');
			giver=account;
			receiver="master";
		}

		if(period==null || period=='')
		{
			period=0;
		}
		var due_time=date+(parseFloat(period)*86400000);

		var data_xml="<cash_register>" +
					"<id>"+data_id+"</id>" +
					"<type>"+type+"</type>" +
					"<acc_name>"+account+"</acc_name>" +
					"<notes>"+notes+"</notes>" +
					"<amount>"+amount+"</amount>" +
					"<date>"+date+"</date>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</cash_register>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>cash_register</tablename>" +
					"<link_to>form56</link_to>" +
					"<title>Added</title>" +
					"<notes>Cash record of amount "+amount+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+data_id+"</id>" +
					"<trans_date>"+date+"</trans_date>" +
					"<amount>"+amount+"</amount>" +
					"<receiver>"+giver+"</receiver>" +
					"<giver>"+receiver+"</giver>" +
					"<tax>0</tax>" +
					"<last_updated>"+get_my_time()+"</last_updated>" +
					"</transactions>";
		var payment_id=get_my_time();
		var transaction2_xml="<transactions>" +
					"<id>"+payment_id+"</id>" +
					"<trans_date>"+date+"</trans_date>" +
					"<amount>"+amount+"</amount>" +
					"<receiver>"+receiver+"</receiver>" +
					"<giver>"+giver+"</giver>" +
					"<tax>0</tax>" +
					"<last_updated>"+get_my_time()+"</last_updated>" +
					"</transactions>";
		var payment_xml="<payments>" +
					"<id>"+payment_id+"</id>" +
					"<acc_name>"+account+"</acc_name>" +
					"<type>"+type+"</type>" +
					"<total_amount>"+amount+"</total_amount>" +
					"<paid_amount>"+amount+"</paid_amount>" +
					"<status>closed</status>" +
					"<date>"+date+"</date>" +
					"<due_date>"+due_time+"</due_date>" +
					"<mode>cash</mode>" +
					"<transaction_id>"+payment_id+"</transaction_id>" +
					"<bill_id>"+data_id+"</bill_id>" +
					"<last_updated>"+get_my_time()+"</last_updated>" +
					"</payments>";
			
		create_row(data_xml,activity_xml);
		create_simple(transaction_xml);
		create_simple(transaction2_xml);
		create_simple(payment_xml);
		
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form56_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form56_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * formNo 58
 * form Manage Service pre-requisites
 * @param button
 */
function form58_create_item(form)
{
	if(is_create_access('form58'))
	{
		var service=form.elements[0].value;
		var type=form.elements[1].value;
		var requisite=form.elements[2].value;
		var quantity=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<pre_requisites>" +
					"<id>"+data_id+"</id>" +
					"<name>"+service+"</name>" +
					"<type>service</type>" +
					"<requisite_type>"+type+"</requisite_type>" +
					"<requisite_name>"+requisite+"</requisite_name>" +
					"<quantity>"+quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</pre_requisites>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>pre_requisites</tablename>" +
					"<link_to>form58</link_to>" +
					"<title>Added</title>" +
					"<notes>Pre-requisite for service "+service+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form58_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form58_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 59
 * form Manage product pre-requisites
 * @param button
 */
function form59_create_item(form)
{
	if(is_create_access('form59'))
	{		
		var product=form.elements[0].value;
		var type=form.elements[1].value;
		var requisite=form.elements[2].value;
		var quantity=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='pre_requisites';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+product+"</name>" +
					"<type>product</type>" +
					"<requisite_type>"+type+"</requisite_type>" +
					"<requisite_name>"+requisite+"</requisite_name>" +
					"<quantity>"+quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form59</link_to>" +
					"<title>Added</title>" +
					"<notes>Pre-requisite for product "+product+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form59_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form59_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 60
 * form Product Attributes
 * @param button
 */
function form60_create_item(form)
{
	if(is_create_access('form60'))
	{
		var product=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attributes>" +
					"<id>"+data_id+"</id>" +
					"<name>"+product+"</name>" +
					"<type>product</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form60</link_to>" +
					"<title>Added</title>" +
					"<notes>Attribute "+attribute+" for product "+product+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form60_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form60_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 61
 * form service Attributes
 * @param button
 */
function form61_create_item(form)
{
	if(is_create_access('form61'))
	{
		var service=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attributes>" +
					"<id>"+data_id+"</id>" +
					"<name>"+service+"</name>" +
					"<type>service</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form61</link_to>" +
					"<title>Added</title>" +
					"<notes>Attribute "+attribute+" for service "+service+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form61_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form61_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 62
 * form Product reviews
 * @param button
 */
function form62_create_item(form)
{
	if(is_create_access('form62'))
	{
		var product=form.elements[0].value;
		var reviewer=form.elements[1].value;
		var detail=form.elements[2].value;
		var rating=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='reviews';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+product+"</name>" +
					"<type>product</type>" +
					"<reviewer>"+reviewer+"</reviewer>" +
					"<detail>"+detail+"</detail>" +
					"<rating>"+rating+"</rating>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form62</link_to>" +
					"<title>Added</title>" +
					"<notes>Review for product "+product+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form62_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form62_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 63
 * form service reviews
 * @param button
 */
function form63_create_item(form)
{
	if(is_create_access('form63'))
	{
		var service=form.elements[0].value;
		var reviewer=form.elements[1].value;
		var detail=form.elements[2].value;
		var rating=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='reviews';
		var data_xml="<reviews>" +
					"<id>"+data_id+"</id>" +
					"<name>"+service+"</name>" +
					"<type>service</type>" +
					"<reviewer>"+reviewer+"</reviewer>" +
					"<detail>"+detail+"</detail>" +
					"<rating>"+rating+"</rating>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</reviews>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>reviews</tablename>" +
					"<link_to>form63</link_to>" +
					"<title>Added</title>" +
					"<notes>Review for service "+service+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form63_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form63_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 64
 * form Service Cross sells
 * @param button
 */
function form64_create_item(form)
{
	if(is_create_access('form64'))
	{
		var service=form.elements[0].value;
		var cross_type=form.elements[1].value;
		var cross_name=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<cross_sells>" +
					"<id>"+data_id+"</id>" +
					"<name>"+service+"</name>" +
					"<type>service</type>" +
					"<cross_type>"+cross_type+"</cross_type>" +
					"<cross_name>"+cross_name+"</cross_name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</cross_sells>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>cross_sells</tablename>" +
					"<link_to>form64</link_to>" +
					"<title>Added</title>" +
					"<notes>Cross selling of "+cross_name+" to service "+service+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form64_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form64_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * formNo 66
 * form Cross sells
 * @param button
 */
function form66_create_item(form)
{
	if(is_create_access('form66'))
	{
		var product=form.elements[0].value;
		var cross_type=form.elements[1].value;
		var cross_name=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var table='cross_sells';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+product+"</name>" +
					"<type>product</type>" +
					"<cross_type>"+cross_type+"</cross_type>" +
					"<cross_name>"+cross_name+"</cross_name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form66</link_to>" +
					"<title>Added</title>" +
					"<notes>Cross selling of "+cross_name+" to product "+product+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form66_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form66_update_item(form);
		});
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
function form69_create_item(form)
{
	if(is_create_access('form69'))
	{
		var order_id=document.getElementById("form69_master").elements['order_id'].value;
		
		var name=form.elements[2].value;
		var desc=form.elements[3].value;
		var quantity=form.elements[4].value;
		var sp=form.elements[5].value;
		var freight=form.elements[6].value;
		var mrp=form.elements[7].value;
		var amount=form.elements[8].value;
		var tax=form.elements[9].value;
		var total=form.elements[10].value;
		var data_id=form.elements[11].value;
		var save_button=form.elements[12];
		var del_button=form.elements[13];
		var tax_rate=form.elements[15].value;
		var price=form.elements[17].value;
		var last_updated=get_my_time();
		var data_xml="<sale_order_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<item_desc>"+desc+"</item_desc>" +
				"<quantity>"+quantity+"</quantity>" +
				"<unit_price>"+price+"</unit_price>" +
				"<selling_price>"+sp+"</selling_price>" +
				"<mrp>"+mrp+"</mrp>" +
				"<amount>"+amount+"</amount>" +
				"<tax>"+tax+"</tax>" +
				"<tax_rate>"+tax_rate+"</tax_rate>" +
				"<freight>"+freight+"</freight>" +
				"<total>"+total+"</total>" +
				"<order_id>"+order_id+"</order_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</sale_order_items>";	
	
		create_simple(data_xml);
		
		for(var i=0;i<11;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form69_delete_item(del_button);
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
function form69_create_form()
{
	if(is_create_access('form69'))
	{
		var form=document.getElementById("form69_master");
		
		var customer=form.elements['customer'].value;
		var order_date=get_raw_time(form.elements['order_date'].value);		
		var status=form.elements['status'].value;
		var data_id=form.elements['order_id'].value;
		var order_num=form.elements['order_num'].value;
		var channel=form.elements['channel'].value;
		var bill_type=form.elements['bill_type'].value;
		var save_button=form.elements['save'];
		
		var amount=0;
		var freight=0;
		var tax=0;
		var total=0;
		var total_quantity=0;

		$("[id^='save_form69']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			if(!isNaN(parseFloat(subform.elements[8].value)))
				amount+=parseFloat(subform.elements[8].value);
			if(!isNaN(parseFloat(subform.elements[9].value)))			
				tax+=parseFloat(subform.elements[9].value);
			if(!isNaN(parseFloat(subform.elements[6].value)))			
				freight+=parseFloat(subform.elements[6].value);
			if(!isNaN(parseFloat(subform.elements[10].value)))			
				total+=parseFloat(subform.elements[10].value);
			if(!isNaN(parseFloat(subform.elements[4].value)))
				total_quantity+=parseFloat(subform.elements[4].value);							
		});

		amount=my_round(amount,2);
		tax=my_round(tax,2);
		total=my_round(total,2);
		freight=my_round(freight,2);
		
		var total_row="<tr><td colspan='1' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
							"<td>Amount:</br>Tax: <br>Freight: </br>Total: </td>" +
							"<td>Rs. "+amount+"</br>" +
							"Rs. "+tax+"</br>" +
							"Rs. "+freight+"</br>" +
							"Rs. "+total+"</td>" +
							"<td></td>" +
							"</tr>";
		$('#form69_foot').html(total_row);

		var last_updated=get_my_time();		
		var data_xml="<sale_orders>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer+"</customer_name>" +
					"<order_date>"+order_date+"</order_date>" +
					"<order_num>"+order_num+"</order_num>" +
					"<channel>"+channel+"</channel>" +
					"<status>"+status+"</status>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<freight>"+freight+"</freight>" +
					"<total>"+total+"</total>" +
					"<total_quantity>"+total_quantity+"</total_quantity>" +
					"<billing_type>"+bill_type+"</billing_type>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_orders</tablename>" +
					"<link_to>form70</link_to>" +
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
			form69_update_form();
		});
		
		$("[id^='save_form69_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * This function transforms a sale order into a bill
 * It is applicable for product bills only
 * @form 70
 * @param order_id
 */
function form70_bill(order_id)
{
	if(is_create_access('form70'))
	{
		show_loader();
		var bill_type='product';
		var bill_amount=0;
		var bill_total=0;
		var bill_offer="";
		var bill_discount=0;
		var bill_tax=0;
		var pending_items_count=0;
		var storage=get_session_var('sales_store');		
		///////selecting all ordered items////
		var order_item_data="<sale_order_items>" +
				"<id></id>" +
				"<order_id exact='yes'>"+order_id+"</order_id>" +
				"<item_name></item_name>" +
				"<quantity></quantity>" +
				"<notes></notes>" +
				"</sale_order_items>";
		fetch_requested_data('',order_item_data,function(order_items)
		{
			console.log(order_items);
			pending_items_count=order_items.length;
			order_items.forEach(function(order_item)
			{
				var item_amount=0;
				var item_total=0;
				var item_offer="";
				var item_discount=0;
				var item_tax=0;
				
				get_inventory(order_item.item_name,'',function(quantity)
				{
					console.log(quantity);
					if(parseFloat(quantity)>=parseFloat(order_item.quantity))
					{
						var batch_data="<product_instances count='1'>" +
								"<batch></batch>" +
								"<sale_price></sale_price>" +
								"<product_name exact='yes'>"+order_item.item_name+"</product_name>" +
								"</product_instances>";
						fetch_requested_data('',batch_data,function(batches)
						{
							console.log(batches);
							var batch="";
							var sale_price=0;
							if(batches.length>0)
							{
								batch=batches[0].batch;
								sale_price=batches[0].sale_price;
							}
				
							//////adding offer details
							item_amount=parseFloat(order_item.quantity)*parseFloat(sale_price);
							var offer_data="<offers>" +
									"<offer_type>product</offer_type>" +
									"<product_name exact='yes'>"+order_item.item_name+"</product_name>" +
									"<batch array='yes'>"+batch+"--all</batch>" +
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
									if(parseFloat(a.criteria_amount)<parseFloat(b.criteria_amount))
									{	return 1;}
									else if(parseFloat(a.criteria_quantity)<parseFloat(b.criteria_quantity))
									{	return 1;}
									else 
									{	return -1;}
								});
										
								for(var i in offers)
								{
									//console.log("found atleast one offer");
									item_offer=offers[i].offer_detail;
									if(offers[i].criteria_type=='min quantity crossed' && parseFloat(offers[i].criteria_quantity)<=parseFloat(order_item.quantity))
									{
										console.log("offer criteria met");

										if(offers[i].result_type=='discount')
										{
											if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
											{
												item_discount=parseFloat((item_amount*parseInt(offers[i].discount_percent))/100);
											}
											else 
											{
												item_discount=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(order_item.quantity)/parseFloat(offers[i].criteria_quantity)));
											}
										}
										else if(offers[i].result_type=='quantity addition')
										{
											if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
											{
												order_item.quantity=parseFloat(order_item.quantity)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
											}
											else 
											{
												order_items.quantity=parseFloat(order_item.quantity)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(order_items.quantity)/parseFloat(offers[i].criteria_quantity))));
											}
										}
										else if(offers[i].result_type=='product free')
										{
											//console.log("adding free product as per offer");

											var free_product_name=offers[i].free_product_name;
											var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(order_item.quantity)/parseFloat(offers[i].criteria_quantity)));
											
											get_inventory(free_product_name,'',function(free_quantities)
											{
												if(parseFloat(free_quantities)>=free_product_quantity)
												{
													var free_batch_data="<bill_items count='1'>" +
															"<batch></batch>" +
															"<item_name exact='yes'>"+free_product_name+"</item_name>" +
															"</bill_items>";
													get_single_column_data(function(data)
													{
														var free_batch="";
														if(data.length>0)
														{
															free_batch=data[0];	
														}
														
														var bill_item_id=get_new_key();
										                var free_xml="<bill_items>" +
																	"<id>"+bill_item_id+"</id>" +
																	"<item_name>"+free_product_name+"</item_name>" +
																	"<batch>"+free_batch+"</batch>" +
																	"<unit_price>0</unit_price>" +
																	"<quantity>"+free_product_quantity+"</quantity>" +
																	"<amount>0</amount>" +
																	"<total>0</total>" +
																	"<discount>0</discount>" +
																	"<offer></offer>" +
																	"<type>free</type>" +
																	"<tax>0</tax>" +
																	"<bill_id>"+order_id+"</bill_id>" +
																	"<free_with>"+order_item.item_name+"</free_with>" +
																	"<storage>"+storage+"</storage>"+
																	"<last_updated>"+get_my_time()+"</last_updated>" +
																	"</bill_items>";	
														
														if(is_online())
														{
															server_create_simple(free_xml);
														}
														else
														{
															local_create_simple(free_xml);
														}
													},free_batch_data);
												}
											});
										}
										break;
									}
									else if(offers[i].criteria_type=='min amount crossed' && offers[i].criteria_amount<=item_amount)
									{
										if(offers[i].result_type=='discount')
										{
											if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
											{
												item_discount=parseFloat((item_amount*parseInt(offers[i].discount_percent))/100);
											}
											else 
											{
												item_discount=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(item_amount)/parseFloat(offers[i].criteria_amount)));
											}
										}
										else if(offers[i].result_type=='quantity addition')
										{
											if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
											{
												order_item.quantity=parseFloat(order_item.quantity)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
											}
											else 
											{
												order_item.quantity=parseFloat(order_item.quantity)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(item_amount)/parseFloat(offers[i].criteria_amount))));
											}
										}
										else if(offers[i].result_type=='product free')
										{
											var free_product_name=offers[i].free_product_name;
											var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(bill_amount-bill_discount)/parseFloat(offers[i].criteria_amount)));
																						
											//////updating product quantity in inventory
											get_inventory(free_product_name,'',function(free_quantities)
											{
												if(free_quantities>=free_product_quantity)
												{
													var free_batch_data="<bill_items count='1'>" +
															"<batch></batch>" +
															"<item_name exact='yes'>"+free_product_name+"</item_name>" +
															"</bill_items>";
													get_single_column_data(function(data)
													{
														var free_batch="";
														if(data.length>0)
														{
															free_batch=data[0];	
														}
														var bill_item_id=get_new_key();
										                var free_xml="<bill_items>" +
																	"<id>"+bill_item_id+"</id>" +
																	"<item_name>"+free_product_name+"</item_name>" +
																	"<batch>"+free_batch+"</batch>" +
																	"<unit_price>0</unit_price>" +
																	"<quantity>"+free_product_quantity+"</quantity>" +
																	"<amount>0</amount>" +
																	"<total>0</total>" +
																	"<discount>0</discount>" +
																	"<offer></offer>" +
																	"<type>free</type>" +
																	"<tax>0</tax>" +
																	"<bill_id>"+order_id+"</bill_id>" +
																	"<free_with>"+order_item.item_name+"</free_with>" +
																	"<storage>"+storage+"</storage>"+
																	"<last_updated>"+last_updated+"</last_updated>" +
																	"</bill_items>";	
														
														if(is_online())
														{
															server_create_simple(free_xml);
														}
														else
														{
															local_create_simple(free_xml);
														}
													},free_batch_data);
												}
											});
										}
										break;
									}
								}
								
								var tax_data="<product_master>" +
										"<name exact='yes'>"+order_item.item_name+"</name>" +
										"<tax></tax>" +
										"</product_master>";
								fetch_requested_data('',tax_data,function(taxes)
								{
									console.log(taxes);

									taxes.forEach(function(tax)
									{
										item_tax=parseFloat((parseFloat(tax.tax)*(item_amount-parseFloat(item_discount)))/100);
									});
									
									item_total=parseFloat(item_amount)+parseFloat(item_tax)-parseFloat(item_discount);
									
									/////saving to bill item
									var bill_item_id=get_new_key();
					                var data_xml="<bill_items>" +
											"<id>"+bill_item_id+"</id>" +
											"<item_name>"+order_item.item_name+"</item_name>" +
											"<batch>"+batch+"</batch>" +
											"<unit_price>"+sale_price+"</unit_price>" +
											"<quantity>"+order_item.quantity+"</quantity>" +
											"<amount>"+item_amount+"</amount>" +
											"<total>"+item_total+"</total>" +
											"<discount>"+item_discount+"</discount>" +
											"<offer>"+item_offer+"</offer>" +
											"<type>bought</type>" +
											"<tax>"+item_tax+"</tax>" +
											"<bill_id>"+order_id+"</bill_id>" +
											"<free_with></free_with>" +
											"<storage>"+storage+"</storage>"+
											"<last_updated>"+get_my_time()+"</last_updated>" +
											"</bill_items>";	
									bill_amount+=item_amount;
									bill_total+=item_total;
									bill_discount+=item_discount;
									bill_tax+=item_tax;
									pending_items_count-=1;
									
									console.log(data_xml);

									if(is_online())
									{
										server_create_simple(data_xml);
									}
									else
									{
										local_create_simple(data_xml);
									}
								});
								
							});
							
						});
					}
					else
					{
						pending_items_count-=1;
					}
				});
			});
		});
		
		
		/////saving bill details
		var bill_items_complete=setInterval(function()
		{
	  	   if(pending_items_count===0)
	  	   {
	  		   	clearInterval(bill_items_complete);
	  		   	
	  		   	var order_data="<sale_orders>" +
	  		   			"<id>"+order_id+"</id>" +
	  		   			"<customer_name></customer_name>" +
	  		   			"<order_date></order_date>" +
	  		   			"<type>product</type>" +
	  		   			"<status exact='yes'>pending</status>" +
	  		   			"</sale_orders>";
	  		   	fetch_requested_data('',order_data,function(sale_orders)
	  		   	{
	  		   		console.log(sale_orders);
	  		   		///////////////////////////////////////////////////////////
	  		   		var offer_data="<offers>" +
							"<criteria_type exact='yes'>min amount crossed</criteria_type>" +
							"<criteria_amount upperbound='yes'>"+(bill_amount-bill_discount)+"</criteria_amount>" +
							"<offer_type exact='yes'>bill</offer_type>" +
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
							if(parseFloat(a.criteria_amount)<parseFloat(b.criteria_amount))
							{	return 1;}
							else 
							{	return -1;}
						});
						
						for(var i in offers)
						{
							if(offers[i].result_type=='discount')
							{
								if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
								{
									var dis=parseFloat(((bill_amount-bill_discount)*parseInt(offers[i].discount_percent))/100);
									bill_tax-=(bill_tax*(dis/(bill_amount-bill_discount)));
									bill_discount+=dis;
									bill_total=bill_amount-bill_discount+bill_tax;
								}
								else 
								{
									var dis=parseFloat(offers[i].discount_amount)*(Math.floor((bill_amount-bill_discount)/parseFloat(offers[i].criteria_amount)));
									bill_tax-=(bill_tax*(dis/(bill_amount-bill_discount)));
									bill_discount+=dis;
									bill_total=bill_amount-bill_discount+bill_tax;
								}
							}
							else if(offers[i].result_type=='product free')
							{
								var free_product_name=offers[i].free_product_name;
								var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(bill_amount-bill_discount)/parseFloat(offers[i].criteria_amount)));
								
								get_inventory(free_product_name,'',function(free_quantities)
								{
									if(free_quantities>=free_product_quantity)
									{
										var free_batch_data="<bill_items count='1'>" +
												"<batch></batch>" +
												"<item_name exact='yes'>"+free_product_name+"</item_name>" +
												"</bill_items>";
										get_single_column_data(function(data)
										{
											var free_batch="";
											if(data.length>0)
											{
												free_batch=data[0];	
											}
											var bill_item_id=get_new_key();
							                var free_xml="<bill_items>" +
														"<id>"+bill_item_id+"</id>" +
														"<item_name>"+free_product_name+"</item_name>" +
														"<batch>"+free_batch+"</batch>" +
														"<unit_price>0</unit_price>" +
														"<quantity>"+free_product_quantity+"</quantity>" +
														"<amount>0</amount>" +
														"<total>0</total>" +
														"<discount>0</discount>" +
														"<offer></offer>" +
														"<type>free</type>" +
														"<tax>0</tax>" +
														"<bill_id>"+order_id+"</bill_id>" +
														"<free_with>bill</free_with>" +
														"<storage></storage>"+
														"<last_updated>"+last_updated+"</last_updated>" +
														"</bill_items>";	
											
											if(is_online())
											{
												server_create_simple(free_xml);
											}
											else
											{
												local_create_simple(free_xml);
											}
											
										},free_batch_data);
									}
								});
							}
							bill_offer=offers[i].offer_detail;
							break;
						}
						
						console.log(sale_orders);
						for(var z in sale_orders)
						{
							var sale_order_xml="<sale_orders>" +
										"<id>"+order_id+"</id>" +
										"<status>billed</status>" +
										"</sale_orders>";
							var bill_xml="<bills>" +
										"<id>"+order_id+"</id>" +
										"<customer_name>"+sale_orders[z].customer_name+"</customer_name>" +
										"<bill_date>"+get_my_time()+"</bill_date>" +
										"<amount>"+bill_amount+"</amount>" +
										"<total>"+bill_total+"</total>" +
										"<type>product</type>" +
										"<offer>"+bill_offer+"</offer>" +
										"<discount>"+bill_discount+"</discount>" +
										"<tax>"+bill_tax+"</tax>" +
										"<transaction_id>"+order_id+"</transaction_id>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</bills>";
							var activity_xml="<activity>" +
										"<data_id>"+order_id+"</data_id>" +
										"<tablename>bills</tablename>" +
										"<link_to>form42</link_to>" +
										"<title>Saved</title>" +
										"<notes>Bill no "+order_id+"</notes>" +
										"<updated_by>"+get_name()+"</updated_by>" +
										"</activity>";
							var transaction_xml="<transactions>" +
										"<id>"+order_id+"</id>" +
										"<trans_date>"+get_my_time()+"</trans_date>" +
										"<amount>"+bill_total+"</amount>" +
										"<receiver>"+sale_orders[z].customer_name+"</receiver>" +
										"<giver>master</giver>" +
										"<tax>"+bill_tax+"</tax>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</transactions>";
							var pt_tran_id=get_new_key();
							var payment_xml="<payments>" +
										"<id>"+pt_tran_id+"</id>" +
										"<status>pending</status>" +
										"<type>received</type>" +
										"<date>"+get_my_time()+"</date>" +
										"<total_amount>"+bill_total+"</total_amount>" +
										"<paid_amount>0</paid_amount>" +
										"<acc_name>"+sale_orders[z].customer_name+"</acc_name>" +
										"<due_date>"+get_credit_period()+"</due_date>" +
										"<mode>"+get_payment_mode()+"</mode>" +
										"<transaction_id>"+pt_tran_id+"</transaction_id>" +
										"<bill_id>"+order_id+"</bill_id>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</payments>";
							var pt_xml="<transactions>" +
										"<id>"+pt_tran_id+"</id>" +
										"<trans_date>"+get_my_time()+"</trans_date>" +
										"<amount>"+bill_total+"</amount>" +
										"<receiver>master</receiver>" +
										"<giver>"+sale_orders[z].customer_name+"</giver>" +
										"<tax>0</tax>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</transactions>";
							if(is_online())
							{
								server_update_simple(sale_order_xml);
								server_create_row(bill_xml,activity_xml);
								server_create_simple(transaction_xml);
								server_create_simple(pt_xml);
								server_create_simple(payment_xml);
							}
							else
							{
								local_update_simple(sale_order_xml);
								local_create_row(bill_xml,activity_xml);
								local_create_simple(transaction_xml);
								local_create_simple(pt_xml);
								local_create_simple(payment_xml);
							}
						}
						hide_loader();
					});
	  		   		///////////////////////////////////////////////////////////
	  		   	});
	  	   }
	    },100);
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}

/**
 * @form New Bill
 * @param button
 */
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
		$("#modal2").dialog("open");
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
		
		service_tax=my_round(service_tax,2);
		vat=my_round(vat,2);
		amount=my_round(amount,2);
		discount=my_round(discount,2);
		total=my_round(total,0);
		
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
					"<bill_id>"+data_id+"</bill_id>" +
					"<source_info>from sale bill #"+bill_num+"</source_info>"+
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
		$("#modal2").dialog("open");
	}
}


/**
 * @form De-duplication mapping
 * @param button
 */
function form80_create_item(form)
{
	if(is_create_access('form80'))
	{
		var master_form=document.getElementById('form80_master');
		var object=master_form.elements[1].value;
		var table=master_form.elements[2].value;
		var column=master_form.elements[3].value;
		var refs=master_form.elements[4].value;
		var ref_ids=master_form.elements[5].value;
		
		var slave_value=form.elements[0].value;
		var slave_id=form.elements[1].value;
		var master_value=form.elements[2].value;
		var master_id=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<de_duplication>" +
					"<id>"+data_id+"</id>" +
					"<object>"+object+"</object>" +
					"<tablename>"+table+"</tablename>" +
					"<keycolumn>"+column+"</keycolumn>" +
					"<references_value>"+refs+"</references_value>" +
					"<references_id>"+ref_ids+"</references_id>" +
					"<slave_id>"+slave_id+"</slave_id>" +
					"<slave_value>"+slave_value+"</slave_value>" +
					"<master_id>"+master_id+"</master_id>" +
					"<master_value>"+master_value+"</master_value>" +
					"<status>pending</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</de_duplication>";
		create_simple(data_xml);
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form80_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Sale leads
 * @param button
 */
function form81_create_item(form)
{
	if(is_create_access('form81'))
	{
		var customer=form.elements[0].value;
		var detail=form.elements[1].value;
		var due_date=get_raw_time(form.elements[2].value);
		var identified_by=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<sale_leads>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<detail>"+detail+"</detail>" +
					"<due_date>"+due_date+"</due_date>" +
					"<identified_by>"+identified_by+"</identified_by>" +
					"<status>open</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_leads>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_leads</tablename>" +
					"<link_to>form81</link_to>" +
					"<title>Added</title>" +
					"<notes>Sale lead for customer "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var customer_data="<customers>"+
						"<name></name>"+
						"<phone></phone>"+
						"<email></email>"+
						"<acc_name exact='yes'>"+customer+"</acc_name>"+
						"</customers>";
		fetch_requested_data('',customer_data,function(customers)
		{
			var customer_name=customers[0].name;
			var customer_phone=customers[0].phone;
			var business_title=get_session_var('title');
			var sms_content=get_session_var('sms_content');			
			var message=sms_content.replace(/customer_name/g,customer_name);
			message=message.replace(/business_title/g,business_title);
			
			send_sms(customer_phone,message,'transaction');
			///////////////////////////////////////////////////////////////////////////////

			var nl_name=get_session_var('default_newsletter');
			var nl_id_xml="<newsletter>"+
						"<id></id>"+
						"<name exact='yes'>"+nl_name+"</name>"+
						"</newsletter>";
			get_single_column_data(function(nls)
			{
				var subject=nl_name;
				var nl_id=nls[0];	
				print_newsletter(nl_name,nl_id,'mail',function(container)
				{
					var message=container.innerHTML;
					var to=customer_name+":"+customers[0].email;
					var from=get_session_var('email');
					send_email(to,from,business_title,subject,message,function(){});
				});
			},nl_id_xml);
		});

		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form81_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form81_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * This function transforms scanned items into a bill
 * @form 82
 */
function form82_bill()
{
	if(is_create_access('form82'))
	{
		var master_form=document.getElementById('form82_master');
		var storage=get_session_var('sales_store');   	
		var bill_type='product';
		var bill_amount=0;
		var bill_total=0;
		var bill_offer="";
		var bill_discount=0;
		var bill_tax=0;
		var pending_items_count=0;
		var order_id=master_form.elements[4].value;
		///////selecting all scanned items////
		var order_items=new Array();
		
		var message_string="Bill from:"+get_session_var('title')+"\nAddress: "+get_session_var('address');
		
		$("[id^='delete_form82']").each(function(index)
		{
			var form_id=$(this).attr('form');
			var form=document.getElementById(form_id);
			var order_item=new Object();
			order_item.item_name=form.elements[1].value;
			order_item.batch=form.elements[2].value;
			order_item.quantity=1;
			order_item.sale_price=parseFloat(form.elements[3].value);
			order_items.push(order_item);
			
			message_string+="\nItem: "+form.elements[1].value;
			message_string+=" Price: "+form.elements[3].value;
		});
		
		var scanned_items=new Array();
		for(var i=0; i<order_items.length;i++)
		{
			var new_obj=new Object();
			new_obj.item_name=order_items[i].item_name;
			new_obj.batch=order_items[i].batch;
			new_obj.sale_price=order_items[i].sale_price;
			new_obj.quantity=parseFloat(order_items[i].quantity);
			for(var j=i+1;j<order_items.length;j++)
			{
				if(order_items[j].item_name==new_obj.item_name && order_items[j].batch==new_obj.batch)
				{
					new_obj.quantity+=parseFloat(order_items[j].quantity);
					order_items.splice(j,1);
					j-=1;
				}
			}
			scanned_items.push(new_obj);
		}
		
		pending_items_count=scanned_items.length;
		
		scanned_items.forEach(function(order_item)
		{
			var item_amount=0;
			var item_total=0;
			var item_offer="";
			var item_discount=0;
			var item_tax=0;
			
			var batch=order_item.batch;
			var sale_price=order_item.sale_price;
			
			//////adding offer details
			item_amount=parseFloat(order_item.quantity)*parseFloat(sale_price);
			var offer_data="<offers>" +
					"<offer_type>product</offer_type>" +
					"<product_name exact='yes'>"+order_item.item_name+"</product_name>" +
					"<batch array='yes'>"+batch+"--all</batch>" +
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
					//console.log("found atleast one offer");
					item_offer=offers[i].offer_detail;
					if(offers[i].criteria_type=='min quantity crossed' && parseFloat(offers[i].criteria_quantity)<=parseFloat(order_item.quantity))
					{
						//console.log("offer criteria met");

						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								item_discount=parseFloat((item_amount*parseInt(offers[i].discount_percent))/100);
							}
							else 
							{
								item_discount=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(order_item.quantity)/parseFloat(offers[i].criteria_quantity)));
							}
						}
						else if(offers[i].result_type=='quantity addition')
						{
							if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
							{
								order_item.quantity=parseFloat(order_item.quantity)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
							}
							else 
							{
								order_items.quantity=parseFloat(order_item.quantity)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(order_items.quantity)/parseFloat(offers[i].criteria_quantity))));
							}
						}
						else if(offers[i].result_type=='product free')
						{
							//console.log("adding free product as per offer");

							var free_product_name=offers[i].free_product_name;
							var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(order_item.quantity)/parseFloat(offers[i].criteria_quantity)));
							
							get_inventory(free_product_name,'',function(free_quantities)
							{
								if(free_quantities>=free_product_quantity)
								{
									var free_batch_data="<bill_items count='1'>" +
											"<batch></batch>" +
											"<item_name exact='yes'>"+free_product_name+"</item_name>" +
											"</bill_items>";
									get_single_column_data(function(data)
									{
										var free_batch="";
										if(data.length>0)
										{
											free_batch=data[0];	
										}
										var bill_item_id=get_new_key();
						                var free_xml="<bill_items>" +
													"<id>"+bill_item_id+"</id>" +
													"<item_name>"+free_product_name+"</item_name>" +
													"<batch>"+free_batch+"</batch>" +
													"<unit_price>0</unit_price>" +
													"<quantity>"+free_product_quantity+"</quantity>" +
													"<amount>0</amount>" +
													"<total>0</total>" +
													"<discount>0</discount>" +
													"<offer></offer>" +
													"<type>free</type>" +
													"<tax>0</tax>" +
													"<bill_id>"+order_id+"</bill_id>" +
													"<free_with>"+order_item.item_name+"</free_with>" +
													"<storage>"+storage+"</storage>"+													
													"<last_updated>"+get_my_time()+"</last_updated>" +
													"</bill_items>";	
										
										if(is_online())
										{
											server_create_simple(free_xml);
										}
										else
										{
											local_create_simple(free_xml);
										}
									},free_batch_data);
								}
							});
						}
						break;
					}
					else if(offers[i].criteria_type=='min amount crossed' && offers[i].criteria_amount<=item_amount)
					{
						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								item_discount=parseFloat((item_amount*parseInt(offers[i].discount_percent))/100);
							}
							else 
							{
								item_discount=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(item_amount)/parseFloat(offers[i].criteria_amount)));
							}
						}
						else if(offers[i].result_type=='quantity addition')
						{
							if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
							{
								order_item.quantity=parseFloat(order_item.quantity)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
							}
							else 
							{
								order_item.quantity=parseFloat(order_item.quantity)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(item_amount)/parseFloat(offers[i].criteria_amount))));
							}
						}
						else if(offers[i].result_type=='product free')
						{
							var free_product_name=offers[i].free_product_name;
							var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(bill_amount-bill_discount)/parseFloat(offers[i].criteria_amount)));
																		
							//////updating product quantity in inventory
							get_inventory(free_product_name,'',function(free_quantities)
							{
								if(free_quantities>=free_product_quantity)
								{
									var free_batch_data="<bill_items count='1'>" +
											"<batch></batch>" +
											"<item_name exact='yes'>"+free_product_name+"</item_name>" +
											"</bill_items>";
									get_single_column_data(function(data)
									{
										var free_batch="";
										if(data.length>0)
										{
											free_batch=data[0];	
										}
									
										var bill_item_id=get_new_key();
										var free_xml="<bill_items>" +
													"<id>"+bill_item_id+"</id>" +
													"<item_name>"+free_product_name+"</item_name>" +
													"<batch>"+free_batch+"</batch>" +
													"<unit_price>0</unit_price>" +
													"<quantity>"+free_product_quantity+"</quantity>" +
													"<amount>0</amount>" +
													"<total>0</total>" +
													"<discount>0</discount>" +
													"<offer></offer>" +
													"<type>free</type>" +
													"<tax>0</tax>" +
													"<bill_id>"+order_id+"</bill_id>" +
													"<free_with>"+order_item.item_name+"</free_with>" +
													"<storage>"+storage+"</storage>"+
													"<last_updated>"+last_updated+"</last_updated>" +
													"</bill_items>";	
										
										if(is_online())
										{
											server_create_simple(free_xml);
										}
										else
										{
											local_create_simple(free_xml);
										}
									},free_batch_data);
								}
							});
						}
						break;
					}
				}
				
				var tax_data="<product_master>" +
						"<name exact='yes'>"+order_item.item_name+"</name>" +
						"<tax></tax>" +
						"</product_master>";
				fetch_requested_data('',tax_data,function(taxes)
				{
					taxes.forEach(function(tax)
					{
						item_tax=parseFloat((parseFloat(tax.tax)*(item_amount-parseFloat(item_discount)))/100);
					});
					
					item_total=parseFloat(item_amount)+parseFloat(item_tax)-parseFloat(item_discount);
					
					/////saving to bill item
					var bill_item_id=get_new_key();
					var data_xml="<bill_items>" +
							"<id>"+bill_item_id+"</id>" +
							"<item_name>"+order_item.item_name+"</item_name>" +
							"<batch>"+batch+"</batch>" +
							"<unit_price>"+sale_price+"</unit_price>" +
							"<quantity>"+order_item.quantity+"</quantity>" +
							"<amount>"+item_amount+"</amount>" +
							"<total>"+item_total+"</total>" +
							"<discount>"+item_discount+"</discount>" +
							"<offer>"+item_offer+"</offer>" +
							"<type>bought</type>" +
							"<tax>"+item_tax+"</tax>" +
							"<bill_id>"+order_id+"</bill_id>" +
							"<free_with></free_with>" +
							"<storage>"+storage+"</storage>"+
							"<last_updated>"+get_my_time()+"</last_updated>" +
							"</bill_items>";	
					bill_amount+=item_amount;
					bill_total+=item_total;
					bill_discount+=item_discount;
					bill_tax+=item_tax;
					pending_items_count-=1;
					if(is_online())
					{
						server_create_simple(data_xml);
					}
					else
					{
						local_create_simple(data_xml);
					}
				});
			});
		});
		
		/////saving bill details
		var bill_items_complete=setInterval(function()
		{
	  	   if(pending_items_count===0)
	  	   {
	  		   	clearInterval(bill_items_complete);
	  		   	
	  		   	var customer=master_form.elements[1].value;
	  		   	var bill_date=master_form.elements[2].value;
					var bill_num=master_form.elements[3].value;		  		
	  		   		///////////////////////////////////////////////////////////
  		   		var offer_data="<offers>" +
						"<criteria_type>min amount crossed</criteria_type>" +
						"<criteria_amount upperbound='yes'>"+(bill_amount-bill_discount)+"</criteria_amount>" +
						"<offer_type exact='yes'>bill</offer_type>" +
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
						if(parseFloat(a.criteria_amount)<parseFloat(b.criteria_amount))
						{	return 1;}
						else 
						{	return -1;}
					});
					
					for(var i in offers)
					{
						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								var dis=parseFloat(((bill_amount-bill_discount)*parseInt(offers[i].discount_percent))/100);
								bill_tax-=(bill_tax*(dis/(bill_amount-bill_discount)));
								bill_discount+=dis;
								bill_total=bill_amount-bill_discount+bill_tax;
							}
							else 
							{
								var dis=parseFloat(offers[i].discount_amount)*(Math.floor((bill_amount-bill_discount)/parseFloat(offers[i].criteria_amount)));
								bill_tax-=(bill_tax*(dis/(bill_amount-bill_discount)));
								bill_discount+=dis;
								bill_total=bill_amount-bill_discount+bill_tax;
							}
						}
						else if(offers[i].result_type=='product free')
						{
							var free_product_name=offers[i].free_product_name;
							var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(bill_amount-bill_discount)/parseFloat(offers[i].criteria_amount)));
							
							get_inventory(free_product_name,'',function(free_quantities)
							{
								if(free_quantities>=free_product_quantity)
								{
									var free_batch_data="<bill_items count='1'>" +
											"<batch></batch>" +
											"<item_name exact='yes'>"+free_product_name+"</item_name>" +
											"</bill_items>";
									get_single_column_data(function(data)
									{
										var free_batch="";
										if(data.length>0)
										{
											free_batch=data[0];	
										}
										var bill_item_id=get_new_key();
										var free_xml="<bill_items>" +
													"<id>"+bill_item_id+"</id>" +
													"<item_name>"+free_product_name+"</item_name>" +
													"<batch>"+free_batch+"</batch>" +
													"<unit_price>0</unit_price>" +
													"<quantity>"+free_product_quantity+"</quantity>" +
													"<amount>0</amount>" +
													"<total>0</total>" +
													"<discount>0</discount>" +
													"<offer></offer>" +
													"<type>free</type>" +
													"<tax>0</tax>" +
													"<bill_id>"+order_id+"</bill_id>" +
													"<free_with>bill</free_with>" +
													"<storage>"+storage+"</storage>"+
													"<last_updated>"+last_updated+"</last_updated>" +
													"</bill_items>";	
										
										if(is_online())
										{
											server_create_simple(free_xml);
										}
										else
										{
											local_create_simple(free_xml);
										}
										
									},free_batch_data);
								}
							});
						}
						bill_offer=offers[i].offer_detail;
						break;
					}
			  		
			  		var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
							"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
							"<td>Rs. "+bill_amount+"</br>" +
							"Rs. "+bill_discount+"</br>" +
							"Rs. "+bill_tax+"</br>" +
							"Rs. "+bill_total+"</td>" +
							"<td></td>" +
							"</tr>";
					$('#form82_foot').html(total_row);

			  		var save_button=master_form.elements[7];
					$(save_button).off('click');
					$(save_button).on('click',function(event)
					{
						event.preventDefault();
					});
								  		
			  		message_string+="\nAmount: "+bill_amount;
					message_string+="\ndiscount: "+bill_discount;
					message_string+="\nTax: "+bill_tax;
					message_string+="\nTotal: "+bill_total;
					
					var subject="Bill from "+get_session_var('title');
					$('#form82_share').show();
					$('#form82_share').click(function()
					{
						modal44_action(customer,subject,message_string);
					});
					
			  		var bill_xml="<bills>" +
								"<id>"+order_id+"</id>" +
								"<bill_num>"+bill_num+"</bill_num>"+
								"<customer_name>"+customer+"</customer_name>" +
								"<bill_date>"+get_raw_time(bill_date)+"</bill_date>" +
								"<amount>"+bill_amount+"</amount>" +
								"<total>"+bill_total+"</total>" +
								"<type>product</type>" +
								"<offer>"+bill_offer+"</offer>" +
								"<discount>"+bill_discount+"</discount>" +
								"<tax>"+bill_tax+"</tax>" +
								"<transaction_id>"+order_id+"</transaction_id>" +
								"<last_updated>"+get_my_time()+"</last_updated>" +
								"</bills>";
					var activity_xml="<activity>" +
								"<data_id>"+order_id+"</data_id>" +
								"<tablename>bills</tablename>" +
								"<link_to>form42</link_to>" +
								"<title>Saved</title>" +
								"<notes>Bill no "+bill_num+"</notes>" +
								"<updated_by>"+get_name()+"</updated_by>" +
								"</activity>";
					var transaction_xml="<transactions>" +
								"<id>"+order_id+"</id>" +
								"<trans_date>"+get_my_time()+"</trans_date>" +
								"<amount>"+bill_total+"</amount>" +
								"<receiver>"+customer+"</receiver>" +
								"<giver>master</giver>" +
								"<tax>"+bill_tax+"</tax>" +
								"<last_updated>"+get_my_time()+"</last_updated>" +
								"</transactions>";
					var pt_tran_id=get_new_key();
					var payment_xml="<payments>" +
								"<id>"+pt_tran_id+"</id>" +
								"<status>closed</status>" +
								"<type>received</type>" +
								"<date>"+get_my_time()+"</date>" +
								"<total_amount>"+bill_total+"</total_amount>" +
								"<paid_amount>"+bill_total+"</paid_amount>" +
								"<acc_name>"+customer+"</acc_name>" +
								"<due_date>"+get_credit_period()+"</due_date>" +
								"<mode>"+get_payment_mode()+"</mode>" +
								"<transaction_id>"+pt_tran_id+"</transaction_id>" +
								"<bill_id>"+order_id+"</bill_id>" +
								"<source_info>for sale bill #"+bill_num+"</source_info>"+
								"<last_updated>"+get_my_time()+"</last_updated>" +
								"</payments>";
					var pt_xml="<transactions>" +
								"<id>"+pt_tran_id+"</id>" +
								"<trans_date>"+get_my_time()+"</trans_date>" +
								"<amount>"+bill_total+"</amount>" +
								"<receiver>master</receiver>" +
								"<giver>"+customer+"</giver>" +
								"<tax>0</tax>" +
								"<last_updated>"+get_my_time()+"</last_updated>" +
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
											"<last_updated>"+get_my_time()+"</last_updated>"+
											"</user_preferences>";
							if(is_online())
							{
								server_update_simple(num_xml);
							}
							else 
							{
								local_update_simple(num_xml);
							}
						}
					},num_data);
					
					if(is_online())
					{
						server_create_row(bill_xml,activity_xml);
						server_create_simple(transaction_xml);
						server_create_simple(pt_xml);
						server_create_simple_func(payment_xml,function()
						{
							modal26_action(pt_tran_id);
						});

					}
					else
					{
						local_create_row(bill_xml,activity_xml);
						local_create_simple(transaction_xml);
						local_create_simple(pt_xml);
						local_create_simple_func(payment_xml,function()
						{
							modal26_action(pt_tran_id);
						});
					}
				});
	  	   }
	    },100);
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}

/**
 * @form Manage Subscriptions
 * @param button
 */
function form84_create_item(form)
{
	if(is_create_access('form84'))
	{
		var customer=form.elements[0].value;
		var service=form.elements[1].value;
		var status=form.elements[2].value;
		var notes=form.elements[3].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var next_due_date=get_my_time();
		var data_xml="<service_subscriptions>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<service>"+service+"</service>" +
					"<status>"+status+"</status>" +
					"<notes>"+notes+"</notes>" +
					"<next_due_date>"+next_due_date+"</next_due_date>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_subscriptions>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>service_subscriptions</tablename>" +
					"<link_to>form84</link_to>" +
					"<title>Added</title>" +
					"<notes>Customer "+customer+" for subscription to "+service+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form84_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form84_update_item(form);
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
function form84_bills()
{
	var due_lead_time=parseFloat(get_my_time())+86400000;
	
	var subscriptions_data="<service_subscriptions>" +
			"<id></id>" +
			"<customer></customer>" +
			"<service></service>" +
			"<status exact='yes'>active</status>" +
			"<notes></notes>" +
			"<next_due_date upperbound='yes'>"+due_lead_time+"</next_due_date>" +
			"</service_subscriptions>";
	
	fetch_requested_data('',subscriptions_data,function(subscriptions)
	{
		subscriptions.forEach(function(subscription)
		{
			var bill_type='service';
			var order_id=get_new_key();
			var item_amount=0;
			var item_total=0;
			var item_offer="";
			var item_discount=0;
			var item_tax=0;
				
			var service_data="<services count='1'>" +
					"<name exact='yes'>"+subscription.service+"</name>" +
					"<price></price>" +
					"<tax></tax>" +
					"</services>";
			fetch_requested_data('',service_data,function(services)
			{
				item_amount=parseFloat(services[0].price);
				var offer_data="<offers>" +
						"<offer_type>service</offer_type>" +
						"<service exact='yes'>"+subscriptions.service+"</service>" +
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
						else 
						{	return -1;}
					});
							
					for(var i in offers)
					{
						item_offer=offers[i].offer_detail;
						if(offers[i].criteria_type=='min quantity crossed' && parseFloat(offers[i].criteria_quantity)<=1)
						{
							if(offers[i].result_type=='discount')
							{
								if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
								{
									item_discount=parseFloat((item_amount*parseInt(offers[i].discount_percent))/100);
								}
								else 
								{
									item_discount=parseFloat(offers[i].discount_amount)*(Math.floor(1/parseFloat(offers[i].criteria_quantity)));
								}
							}
							else if(offers[i].result_type=='service free')
							{
								var free_service_name=offers[i].free_service_name;	
								var id=get_new_key();
				        		var free_pre_requisite_data="<pre_requisites>" +
										"<type exact='yes'>service</type>" +
										"<requisite_type exact='yes'>task</requisite_type>" +
										"<name exact='yes'>"+free_service_name+"</name>" +
										"<requisite_name></requisite_name>" +
										"<quantity></quantity>" +
										"</pre_requisites>";
								fetch_requested_data('',free_pre_requisite_data,function(free_pre_requisites)
								{
					                var free_xml="<bill_items>" +
												"<id>"+id+"</id>" +
												"<item_name>"+free_service_name+"</item_name>" +
												"<staff></staff>" +
												"<notes>free service</notes>" +
												"<unit_price>0</unit_price>" +
												"<amount>0</amount>" +
												"<total>0</total>" +
												"<discount>0</discount>" +
												"<offer></offer>" +
												"<type>free</type>" +
												"<tax>0</tax>" +
												"<bill_id>"+order_id+"</bill_id>" +
												"<free_with>"+subscription.service+"</free_with>" +
												"<last_updated>"+last_updated+"</last_updated>" +
												"</bill_items>";	
									if(is_online())
									{
										server_create_simple(free_xml);
									}
									else
									{
										local_create_simple(free_xml);
									}
									
									free_pre_requisites.forEach(function(free_pre_requisite)
									{
										var task_id=get_new_key();
										var task_xml="<task_instances>" +
												"<id>"+task_id+"</id>" +
												"<name>"+free_pre_requisite.name+"</name>" +
												"<assignee></assignee>" +
												"<t_initiated>"+get_my_time()+"</t_initiated>" +
												"<t_due>"+get_task_due_period()+"</t_due>" +
												"<status>pending</status>" +
												"<task_hours>"+free_pre_requisite.quantity+"</task_hours>" +
												"<source>service</source>" +
												"<source_id>"+id+"</source_id>" +
												"<last_updated>"+last_updated+"</last_updated>" +
												"</task_instances>";
										var activity_xml="<activity>" +
												"<data_id>"+task_id+"</data_id>" +
												"<tablename>task_instances</tablename>" +
												"<link_to>form14</link_to>" +
												"<title>Added</title>" +
												"<notes>Task "+free_pre_requisite.name+"</notes>" +
												"<updated_by>"+get_name()+"</updated_by>" +
												"</activity>";
								
										if(is_online())
										{
											server_create_row(task_xml,activity_xml);
										}
										else
										{
											local_create_row(task_xml,activity_xml);
										}		
									});
							
								});
							}
							break;
						}
						else if(offers[i].criteria_type=='min amount crossed' && offers[i].criteria_amount<=item_amount)
						{
							if(offers[i].result_type=='discount')
							{
								if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
								{
									item_discount=parseFloat((item_amount*parseInt(offers[i].discount_percent))/100);
								}
								else 
								{
									item_discount=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(item_amount)/parseFloat(offers[i].criteria_amount)));
								}
							}
							else if(offers[i].result_type=='service free')
							{
								var free_service_name=offers[i].free_service_name;	
								var id=get_new_key();
				        		var free_pre_requisite_data="<pre_requisites>" +
										"<type exact='yes'>service</type>" +
										"<requisite_type exact='yes'>task</requisite_type>" +
										"<name exact='yes'>"+free_service_name+"</name>" +
										"<requisite_name></requisite_name>" +
										"<quantity></quantity>" +
										"</pre_requisites>";
								fetch_requested_data('',free_pre_requisite_data,function(free_pre_requisites)
								{
					                var free_xml="<bill_items>" +
												"<id>"+id+"</id>" +
												"<item_name>"+free_service_name+"</item_name>" +
												"<staff></staff>" +
												"<notes>free service</notes>" +
												"<unit_price>0</unit_price>" +
												"<amount>0</amount>" +
												"<total>0</total>" +
												"<discount>0</discount>" +
												"<offer></offer>" +
												"<type>free</type>" +
												"<tax>0</tax>" +
												"<bill_id>"+order_id+"</bill_id>" +
												"<free_with>"+subscription.service+"</free_with>" +
												"<last_updated>"+last_updated+"</last_updated>" +
												"</bill_items>";	
									if(is_online())
									{
										server_create_simple(free_xml);
									}
									else
									{
										local_create_simple(free_xml);
									}
									
									free_pre_requisites.forEach(function(free_pre_requisite)
									{
										var task_id=get_new_key();
										var task_xml="<task_instances>" +
												"<id>"+task_id+"</id>" +
												"<name>"+free_pre_requisite.name+"</name>" +
												"<assignee></assignee>" +
												"<t_initiated>"+get_my_time()+"</t_initiated>" +
												"<t_due>"+get_task_due_period()+"</t_due>" +
												"<status>pending</status>" +
												"<task_hours>"+free_pre_requisite.quantity+"</task_hours>" +
												"<source>service</source>" +
												"<source_id>"+id+"</source_id>" +
												"<last_updated>"+get_my_time()+"</last_updated>" +
												"</task_instances>";
										var activity_xml="<activity>" +
												"<data_id>"+task_id+"</data_id>" +
												"<tablename>task_instances</tablename>" +
												"<link_to>form14</link_to>" +
												"<title>Added</title>" +
												"<notes>Task "+free_pre_requisite.name+"</notes>" +
												"<updated_by>"+get_name()+"</updated_by>" +
												"</activity>";
								
										if(is_online())
										{
											server_create_row(task_xml,activity_xml);
										}
										else
										{
											local_create_row(task_xml,activity_xml);
										}		
									});
							
								});
							}

							break;
						}
					}
					
					item_tax=parseFloat((parseFloat(services[0].tax)*(item_amount-parseFloat(item_discount)))/100);
					item_total=parseFloat(item_amount)+parseFloat(item_tax)-parseFloat(item_discount);
					
					var bill_num_data="<user_preferences count='1'>"+
							"<value></value>"+
							"<name exact='yes'>bill_num</name>"+
							"</user_preferences>";
					get_single_column_data(function(bill_nums)
					{
						var bill_num=bill_nums[0];
						/////saving to bill item
						var bill_item_id=get_new_key();
		                var data_xml="<bill_items>" +
									"<id>"+bill_item_id+"</id>" +
									"<item_name>"+subscription.service+"</item_name>" +
									"<batch></batch>" +
									"<unit_price>"+services[0].price+"</unit_price>" +
									"<quantity>1</quantity>" +
									"<amount>"+item_amount+"</amount>" +
									"<total>"+item_total+"</total>" +
									"<discount>"+item_discount+"</discount>" +
									"<offer>"+item_offer+"</offer>" +
									"<type>bought</type>" +
									"<tax>"+item_tax+"</tax>" +
									"<bill_id>"+order_id+"</bill_id>" +
									"<free_with></free_with>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</bill_items>";	
		                var bill_xml="<bills>" +
									"<id>"+order_id+"</id>" +
									"<bill_num>"+bill_num+"</bill_num>"+								
									"<customer_name>"+subscription.customer+"</customer_name>" +
									"<bill_date>"+get_my_time()+"</bill_date>" +
									"<amount>"+item_amount+"</amount>" +
									"<total>"+item_total+"</total>" +
									"<type>service</type>" +
									"<offer></offer>" +
									"<discount>"+item_discount+"</discount>" +
									"<tax>"+item_tax+"</tax>" +
									"<transaction_id>"+order_id+"</transaction_id>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</bills>";
						var activity_xml="<activity>" +
									"<data_id>"+order_id+"</data_id>" +
									"<tablename>bills</tablename>" +
									"<link_to>form42</link_to>" +
									"<title>Saved</title>" +
									"<notes>Bill no "+order_id+"</notes>" +
									"<updated_by>"+get_name()+"</updated_by>" +
									"</activity>";
						var transaction_xml="<transactions>" +
									"<id>"+order_id+"</id>" +
									"<trans_date>"+get_my_time()+"</trans_date>" +
									"<amount>"+item_total+"</amount>" +
									"<receiver>"+subscription.customer+"</receiver>" +
									"<giver>master</giver>" +
									"<tax>"+item_tax+"</tax>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</transactions>";
						var pt_tran_id=get_new_key();
						var payment_xml="<payments>" +
									"<id>"+pt_tran_id+"</id>" +
									"<status>pending</status>" +
									"<type>received</type>" +
									"<date>"+get_my_time()+"</date>" +
									"<total_amount>"+item_total+"</total_amount>" +
									"<paid_amount>0</paid_amount>" +
									"<acc_name>"+subscription.customer+"</acc_name>" +
									"<due_date>"+get_credit_period()+"</due_date>" +
									"<mode>"+get_payment_mode()+"</mode>" +
									"<transaction_id>"+pt_tran_id+"</transaction_id>" +
									"<bill_id>"+order_id+"</bill_id>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</payments>";
						var pt_xml="<transactions>" +
									"<id>"+pt_tran_id+"</id>" +
									"<trans_date>"+get_my_time()+"</trans_date>" +
									"<amount>"+item_total+"</amount>" +
									"<receiver>master</receiver>" +
									"<giver>"+subscription.customer+"</giver>" +
									"<tax>0</tax>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</transactions>";
						if(is_online())
						{
							server_create_simple(data_xml);
							server_create_row(bill_xml,activity_xml);
							server_create_simple(transaction_xml);
							server_create_simple(pt_xml);
							server_create_simple(payment_xml);
						}
						else
						{
							local_create_simple(data_xml);
							local_create_row(bill_xml,activity_xml);
							local_create_simple(transaction_xml);
							local_create_simple(pt_xml);
							local_create_simple(payment_xml);
						}
					
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
												"<last_updated>"+get_my_time()+"</last_updated>"+
												"</user_preferences>";
								if(is_online())
								{
									server_update_simple(num_xml);
								}
								else 
								{
									local_update_simple(num_xml);
								}
							}
						},num_data);
						
					},bill_num_data);	
					////adding pre-requisite tasks
					
					var pre_requisite_data="<pre_requisites>" +
							"<type exact='yes'>service</type>" +
							"<requisite_type exact='yes'>task</requisite_type>" +
							"<name exact='yes'>"+subscription.service+"</name>" +
							"<requisite_name></requisite_name>" +
							"<quantity></quantity>" +
							"</pre_requisites>";
					fetch_requested_data('',pre_requisite_data,function(pre_requisites)
					{
						pre_requisites.forEach(function(pre_requisite)
						{
							var task_id=get_new_key();
							var task_xml="<task_instances>" +
									"<id>"+task_id+"</id>" +
									"<name>"+pre_requisite.name+"</name>" +
									"<assignee></assignee>" +
									"<t_initiated>"+get_my_time()+"</t_initiated>" +
									"<t_due>"+get_task_due_period()+"</t_due>" +
									"<status>pending</status>" +
									"<task_hours>"+pre_requisite.quantity+"</task_hours>" +
									"<source>service</source>" +
									"<source_id>"+bill_item_id+"</source_id>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</task_instances>";
							var activity_xml="<activity>" +
									"<data_id>"+task_id+"</data_id>" +
									"<tablename>task_instances</tablename>" +
									"<link_to>form14</link_to>" +
									"<title>Added</title>" +
									"<notes>Task "+pre_requisite.name+" assigned to </notes>" +
									"<updated_by>"+get_name()+"</updated_by>" +
									"</activity>";
					
							if(is_online())
							{
								server_create_row(task_xml,activity_xml);
							}
							else
							{
								local_create_row(task_xml,activity_xml);
							}		
						});
					});

					
					
					////////////updating subscription//////////////
					var subscription_period_data="<attributes>" +
							"<type exact='yes'>service</type>" +
							"<attribute>subscription period</attribute>" +
							"<name exact='yes'>"+subscription.service+"</name>" +
							"<value></value>" +
							"</attributes>";
					fetch_requested_data('',subscription_period_data,function(periods)
					{
						if(periods.length>0)
						{
							var date=new Date(parseFloat(subscription.next_due_date));
							var day=date.getDate();
							var month=date.getMonth();
							var year=date.getFullYear();
							var next_due_date="";
							var period_value=parseInt(periods[0].value.substring(0,2));
							console.log(periods[0].value);							
							console.log(periods[0].value.search('month'));							
							if(periods[0].value.search('month')!=-1)
							{
								month+=period_value;
								year+=parseInt(month/12);
								month=parseInt(month%12);
							}
							else if(periods[0].value.search('day')!=-1)
							{
								day+=period_value;
								month+=parseInt(day/30);
								day=parseInt(day%30);
								year+=parseInt(month/12);
								month=parseInt(month%12);
								
							}
							else if(periods[0].value.search('year')!=-1)
							{
								year+=period_value;
							}
							var new_date=new Date(year,month,day,0,0,0,0);
							next_due_date=new_date.getTime();
							
							var subscription_xml="<service_subscriptions>" +
									"<id>"+subscription.id+"</id>" +
									"<last_bill_id>"+order_id+"</last_bill_id>" +
									"<last_bill_date>"+get_my_time()+"</last_bill_date>" +
									"<next_due_date>"+next_due_date+"</next_due_date>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</service_subscriptions>";
							if(is_online())
							{
								server_update_simple(subscription_xml);
							}
							else
							{
								local_update_simple(subscription_xml);
							}
						}
					});
				});
			});
		});
	});
}

/**
 * @form Manufacturing Schedule
 * @formNo 88
 */
function form88_create_item(form)
{
	if(is_create_access('form88'))
	{
		var product=form.elements[0].value;
		var process=form.elements[1].value;
		var status=form.elements[2].value;
		var schedule=get_raw_time(form.elements[3].value);
		var iteration=form.elements[4].value;
		var data_id=form.elements[5].value;
		form.elements[8].value=status;
		var last_updated=get_my_time();
		var data_xml="<manufacturing_schedule>" +
					"<id>"+data_id+"</id>" +
					"<product>"+product+"</product>" +
					"<process_notes>"+process+"</process_notes>" +
					"<status>"+status+"</status>" +
					"<schedule>"+schedule+"</schedule>" +
					"<iteration_notes>"+iteration+"</iteration_notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</manufacturing_schedule>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>manufacturing_schedule</tablename>" +
					"<link_to>form88</link_to>" +
					"<title>Added</title>" +
					"<notes>Manufacturing schedule for product "+product+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	

		if(status=='scheduled')
		{
			var pre_requisite_data="<pre_requisites>" +
					"<type exact='yes'>product</type>" +
					"<requisite_type exact='yes'>task</requisite_type>" +
					"<name exact='yes'>"+product+"</name>" +
					"<requisite_name></requisite_name>" +
					"<quantity></quantity>" +
					"</pre_requisites>";
			fetch_requested_data('',pre_requisite_data,function(pre_requisites)
			{
				pre_requisites.forEach(function(pre_requisite)
				{
					var task_id=get_new_key();
					var task_xml="<task_instances>" +
							"<id>"+task_id+"</id>" +
							"<name>"+pre_requisite.name+"</name>" +
							"<assignee></assignee>" +
							"<t_initiated>"+get_my_time()+"</t_initiated>" +
							"<t_due>"+get_task_due_time(schedule)+"</t_due>" +
							"<status>pending</status>" +
							"<task_hours>"+pre_requisite.quantity+"</task_hours>" +
							"<source>product</source>" +
							"<source_id>"+data_id+"</source_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</task_instances>";
					var activity_xml="<activity>" +
							"<data_id>"+task_id+"</data_id>" +
							"<tablename>task_instances</tablename>" +
							"<link_to>form14</link_to>" +
							"<title>Added</title>" +
							"<notes>Task "+pre_requisite.name+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
			
					if(is_online())
					{
						server_create_row(task_xml,activity_xml);
					}
					else
					{
						local_create_row(task_xml,activity_xml);
					}		
				});
			});
		}

		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form88_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form88_update_item(form);
		});
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
function form89_create_item(form)
{
	if(is_create_access('form89'))
	{
		var name=form.elements[0].value;
		var assignee=form.elements[1].value;
		var schedule=get_raw_time(form.elements[2].value);
		var notes=form.elements[3].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<appointments>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+name+"</customer>" +
					"<assignee>"+assignee+"</assignee>" +
					"<schedule>"+schedule+"</schedule>" +
					"<status>"+status+"</status>" +
					"<hours>1</hours>" +
					"<notes>"+notes+"</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</appointments>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>appointments</tablename>" +
					"<link_to>form89</link_to>" +
					"<title>Added</title>" +
					"<notes>Appointment with "+name+" assigned to "+assignee+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		var message_string=name+" appointment with "+assignee+" @"+form.elements[2].value+"\nNotes:"+result.notes;
		message_string=encodeURIComponent(message_string);
		$("#form89_whatsapp_"+data_id).attr('href',"whatsapp://send?text="+message_string);
		$("#form89_whatsapp_"+data_id).show();
		
		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form89_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form89_update_item(form);
		});
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
function form90_create_item(form)
{
	if(is_create_access('form90'))
	{
		show_loader();

		var name=form.elements[0].value;
		var notes=form.elements[1].value;
		var status='active';
		var data_id=form.elements[2].value;
		var last_updated=get_my_time();
		var data_xml="<bill_types>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"</name>" +
					"<notes>"+notes+"</notes>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bill_types>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bill_types</tablename>" +
					"<link_to>form90</link_to>" +
					"<title>Added</title>" +
					"<notes>Billing type "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var num_xml="<user_preferences>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"_bill_num</name>" +
					"<display_name>Next "+name+" Bill series number</display_name>"+					
					"<value>1</value>" +
					"<status>active</status>" +
					"<type>accounting</type>"+
					"<shortcut></shortcut>"+
					"<sync>checked</sync>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</user_preferences>";

		create_row(data_xml,activity_xml);
		create_simple(num_xml);
		
		var product_instance_data="<product_instances>" +
					"<id></id>" +
					"<product_name></product_name>" +
					"<batch></batch>" +
					"<sale_price></sale_price>" +
					"</product_instances>";
		fetch_requested_data('',product_instance_data,function(instances)
		{
			var prices_xml="<sale_prices>";
			var id=parseFloat(get_new_key());
			var counter=0;
			instances.forEach(function(instance)
			{
				if(counter==500)
				{
					counter=0;
					prices_xml+="</sale_prices><separator></separator><sale_prices>";
				}
				prices_xml+="<row>" +
						"<id>"+id+"</id>" +
						"<product_name>"+instance.product_name+"</product_name>" +
						"<batch>"+instance.batch+"</batch>" +
						"<sale_price>"+instance.sale_price+"</sale_price>" +
						"<pi_id>"+instance.id+"</pi_id>" +
						"<billing_type>"+name+"</billing_type>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</row>";
				id+=1;
				counter+=1;
			});
			prices_xml+="</sale_prices>";
			create_batch(prices_xml);
		});

		for(var i=0;i<2;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var del_button=form.elements[4];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form90_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form90_update_item(form);
		});
		
		var sales_price_complete=setInterval(function()
		{
  		   if(localdb_open_requests===0 && number_active_ajax===0)
  		   {
  			   clearInterval(sales_price_complete);
	  		   hide_loader();
  		   }
	    },3000);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create Bill(multiple registers)
 * @formNo 91
 * @param button
 */
function form91_create_item(form)
{
	if(is_create_access('form91'))
	{
		var bill_id=document.getElementById("form91_master").elements['bill_id'].value;
		var bill_type=document.getElementById("form91_master").elements['bill_type'].value;
		
		var name=form.elements[0].value;
		var desc=form.elements[1].value;
		var batch=form.elements[2].value;
		var quantity=form.elements[3].value;
		var mrp=form.elements[4].value;
		var price=form.elements[5].value;
		var freight=form.elements[6].value;
		var amount=form.elements[7].value;
		var tax=form.elements[8].value;
		var total=form.elements[9].value;
		var storage=form.elements['storage'].value;
		var tax_rate=form.elements['tax_unit'].value;
		var data_id=form.elements[12].value;
		var save_button=form.elements[13];		
		var del_button=form.elements[14];
		var is_unbilled=form.elements[17].value;
		var last_updated=get_my_time();
		
		var tax_type_string="<cst>0</cst>"+
							"<vat>"+tax+"</vat>";
		if(bill_type=='Retail-CST' || bill_type=='Retail-CST-C')					
		{
			tax_type_string="<cst>"+tax+"</cst>"+
							"<vat>0</vat>";
		}
		
		var picked_status='pending';
		var packed_status='pending';
		if(is_unbilled=='yes')
		{
			picked_status='picked';
			packed_status='packed';
		}
							
		var data_xml="<bill_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<item_desc>"+desc+"</item_desc>" +
				"<batch>"+batch+"</batch>" +
				"<unit_price>"+price+"</unit_price>" +
				"<mrp>"+mrp+"</mrp>" +
				"<quantity>"+quantity+"</quantity>" +
				"<amount>"+amount+"</amount>" +
				"<total>"+total+"</total>" +
				"<freight>"+freight+"</freight>" +
				"<tax>"+tax+"</tax>";
		data_xml+=tax_type_string;		
		data_xml+="<storage>"+storage+"</storage>" +
				"<tax_rate>"+tax_rate+"</tax_rate>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<picked_status>"+picked_status+"</picked_status>"+
				"<packing_status>"+packed_status+"</packing_status>"+																
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";	

		create_simple(data_xml);

		////////////////update status of unbilled item///////////
		if(is_unbilled=='yes')
		{
			var unbilled_xml="<unbilled_sale_items>"+
							"<id>"+data_id+"</id>"+
							"<bill_status>completed</bill_status>"+
							"</unbilled_sale_items>";
			update_simple(unbilled_xml);							
		}		
		
		
		for(var i=0;i<12;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form91_delete_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}



/**
 * @form Create bill(nikki)
 * @formNo 91
 * @param button
 */
function form91_create_form()
{
	if(is_create_access('form91'))
	{
		var form=document.getElementById("form91_master");
		
		var customer=form.elements['customer'].value;
		var bill_type=form.elements['bill_type'].value;
		var bill_date=get_raw_time(form.elements['date'].value);
		var bill_num=form.elements['bill_num'].value;
		
		var amount=0;
		var tax_name="VAT";
		var tax_array=[];
		var freight=0;
		var total=0;
		var total_quantity=0;
		var tax=0;
		
		$("[id^='save_form91']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			
			if(!isNaN(parseFloat(subform.elements[3].value)))
			{
				total_quantity+=parseFloat(subform.elements[3].value);
			}
			if(!isNaN(parseFloat(subform.elements[7].value)))
			{
				amount+=parseFloat(subform.elements[7].value);
			}
			if(!isNaN(parseFloat(subform.elements[8].value)))
			{
				if(typeof tax_array[subform.elements[11].value]=='undefined')
				{
					tax_array[subform.elements[11].value]=0;
				}
				tax_array[subform.elements[11].value]+=parseFloat(subform.elements[8].value);
			}
			if(!isNaN(parseFloat(subform.elements[9].value)))
			{
				total+=parseFloat(subform.elements[9].value);
			}					
		});
		
		var form=document.getElementById("form91_master");
		var tax_type_string="<cst>0</cst>"+
							"<vat>"+tax+"</vat>";

		if(form.elements['bill_type'].value=='Retail-CST' || form.elements['bill_type'].value=='Retail-CST-C')
		{
			tax_name="CST";
			tax_type_string="<cst>"+tax+"</cst>"+
							"<vat>0</vat>";
		}

		var tax_string="";
		var tax_amount_string="";
		
		for(var x in tax_array)
		{
			tax_array[x]=my_round(tax_array[x],2);
			tax_string+=tax_name+" @"+x+"%: <br>";		
			tax_amount_string+="Rs. "+tax_array[x]+": <br>";
		}

		amount=my_round(amount,2);
		freight=my_round(freight,2);
		total=my_round(total,2);

		var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
								"<td>Amount:</br>"+tax_string+"Freight: </br>Total: </td>" +
								"<td>Rs. "+amount+"</br>" +tax_amount_string+
								"Rs. "+freight+"</br>" +
								"Rs. <vyavsaay_p id='form91_final_total'>"+total+"</vyavsaay_p></td>" +
								"<td></td>" +
								"</tr>";
		$('#form91_foot').html(total_row);

		var data_id=form.elements['bill_id'].value;
		var order_id=form.elements['order_id'].value;
		var order_num=form.elements['order_num'].value;
		var channel=form.elements['channel'].value;
		var transaction_id=form.elements['t_id'].value;
		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var data_xml="<bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_num>"+bill_num+"</bill_num>"+
					"<order_num>"+order_num+"</order_num>"+
					"<order_id>"+order_id+"</order_id>"+
					"<channel>"+channel+"</channel>"+
					"<customer_name>"+customer+"</customer_name>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<billing_type>"+bill_type+"</billing_type>" +
					"<freight>"+freight+"</freight>" +
					"<tax>"+tax+"</tax>";
		data_xml+=tax_type_string;
		data_xml+="<transaction_id>"+transaction_id+"</transaction_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bills</tablename>" +
					"<link_to>form92</link_to>" +
					"<title>Saved</title>" +
					"<notes>Bill # "+bill_num+"</notes>" +
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
					"<bill_id>"+data_id+"</bill_id>" +
					"<source_info>for sale bill #"+bill_num+"</source_info>"+
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
			//modal26_action(pt_tran_id);
		});
		
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form91_update_form();
		});
		
		$("[id^='save_form91_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 96
 * form Customer Attributes
 * @param button
 */
function form96_create_item(form)
{
	if(is_create_access('form96'))
	{
		var customer=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attributes>" +
					"<id>"+data_id+"</id>" +
					"<name>"+customer+"</name>" +
					"<type>customer</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form96</link_to>" +
					"<title>Added</title>" +
					"<notes>Attribute "+attribute+" for customer "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form96_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form96_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 97
 * form Supplier Attributes
 * @param button
 */
function form97_create_item(form)
{
	if(is_create_access('form97'))
	{
		var supplier=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attributes>" +
					"<id>"+data_id+"</id>" +
					"<name>"+supplier+"</name>" +
					"<type>supplier</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form97</link_to>" +
					"<title>Added</title>" +
					"<notes>Attribute "+attribute+" for supplier "+supplier+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form97_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form97_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 98
 * form Staff Attributes
 * @param button
 */
function form98_create_item(form)
{
	if(is_create_access('form98'))
	{
		var staff=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attributes>" +
					"<id>"+data_id+"</id>" +
					"<name>"+staff+"</name>" +
					"<type>staff</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form98</link_to>" +
					"<title>Added</title>" +
					"<notes>Attribute "+attribute+" for staff "+staff+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form98_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form98_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * formNo 101
 * form Manage Projects
 * @param button
 */
function form101_create_item(form)
{
	if(is_create_access('form101'))
	{
		var name=form.elements[0].value;
		var details=form.elements[1].value;
		var start_date=get_raw_time(form.elements[2].value);
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<projects>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<details>"+details+"</details>" +
					"<start_date>"+start_date+"</start_date>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</projects>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>projects</tablename>" +
					"<link_to>form101</link_to>" +
					"<title>Added</title>" +
					"<notes>Project "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var access_xml="<data_access>" +
					"<id>"+get_new_key()+"</id>" +
					"<tablename>projects</tablename>" +
					"<record_id>"+data_id+"</record_id>" +
					"<access_type>all</access_type>" +
					"<user_type>user</user_type>" +
					"<user>"+get_account_name()+"</user>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</data_access>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
			server_create_simple(access_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(access_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form101_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form101_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project Team
 * @formNo 102
 * @param button
 */
function form102_create_item(form)
{
	if(is_create_access('form102'))
	{
		var project_id=document.getElementById('form102_master').elements[2].value;
		var member=form.elements[0].value;
		var role=form.elements[1].value;
		var notes=form.elements[2].value;
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<project_team>" +
					"<id>"+data_id+"</id>" +
					"<project_id>"+project_id+"</project_id>" +
					"<member>"+member+"</member>" +
					"<role>"+role+"</role>" +
					"<notes>"+notes+"</notes>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</project_team>";
		var access_xml="<data_access>" +
					"<id>"+get_new_key()+"</id>" +
					"<tablename>project_team</tablename>" +
					"<record_id>"+data_id+"</record_id>" +
					"<access_type>all</access_type>" +
					"<user_type>user</user_type>"+
					"<user>"+get_account_name()+"</user>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</data_access>";
		if(is_online())
		{
			server_create_simple(data_xml);
			server_create_simple(access_xml);
		}
		else
		{
			local_create_simple(data_xml);
			local_create_simple(access_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form102_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form102_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project Team
 * @param button
 */
function form102_create_form()
{
	$("[id^='save_form102_']").click();
}

/**
 * @form Project Phases
 * @formNo 103
 * @param button
 */
function form103_create_item(form)
{
	if(is_create_access('form103'))
	{
		var project_id=document.getElementById('form103_master').elements[2].value;
		var phase=form.elements[0].value;
		var details=form.elements[1].value;
		var start_date=get_raw_time(form.elements[2].value);
		var due_date=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<project_phases>" +
					"<id>"+data_id+"</id>" +
					"<project_id>"+project_id+"</project_id>" +
					"<phase_name>"+phase+"</phase_name>" +
					"<details>"+details+"</details>" +
					"<start_date>"+start_date+"</start_date>" +
					"<due_date>"+due_date+"</due_date>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</project_phases>";
		var access_xml="<data_access>" +
					"<id>"+get_new_key()+"</id>" +
					"<tablename>project_phases</tablename>" +
					"<record_id>"+data_id+"</record_id>" +
					"<access_type>all</access_type>" +
					"<user_type>user</user_type>"+
					"<user>"+get_account_name()+"</user>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</data_access>";
		
		create_simple(data_xml);
		create_simple(access_xml);
		
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form103_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form103_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project Team
 * @param button
 */
function form103_create_form()
{
	$("[id^='save_form103_']").click();
}


/**
 * @form Manage Data Access
 * @formNo 105
 * @param button
 */
function form105_create_item(form)
{
	if(is_create_access('form105'))
	{
		var tablename=document.getElementById('form105_master').elements[1].value;
		var record_id=document.getElementById('form105_master').elements[2].value;
		var access_type=form.elements[0].value;
		var user_type=form.elements[1].value;
		var user=form.elements[2].value;
		var user_field=form.elements[3].value;
		var role=form.elements[4].value;
		var criteria_field=form.elements[5].value;
		var criteria_value=form.elements[6].value;
		var data_id=form.elements[7].value;
		var del_button=form.elements[9];
		
		var last_updated=get_my_time();
		var data_xml="<data_access>" +
					"<id>"+data_id+"</id>" +
					"<tablename>"+tablename+"</tablename>" +
					"<record_id>"+record_id+"</record_id>" +
					"<access_type>"+access_type+"</access_type>" +
					"<user_type>"+user_type+"</user_type>" +
					"<user>"+user+"</user>" +
					"<user_field>"+user_field+"</user_field>" +
					"<role>"+role+"</role>" +
					"<criteria_field>"+criteria_field+"</criteria_field>" +
					"<criteria_value>"+criteria_value+"</criteria_value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</data_access>";
		create_simple(data_xml);
		
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form105_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Data Access
 * @param button
 */
function form105_create_form()
{
	$("[id^='save_form105_']").click();
}


/**
 * This function transforms a sale order into a bill
 * It is applicable for product bills only
 * @form 108
 * @param order_id
 */
function form108_bill(order_id,bill_type,order_num,sale_channel,customer,order_time)
{
	///check following data is adequately updated
	//a. product batches
	//b. channel prices
	//c. pickup charges
	if(is_create_access('form108'))
	{
		show_loader();
		var bill_amount=0;
		var bill_total=0;
		var bill_freight=0;
		var bill_tax=0;
		var bill_channel_charges=0;
		var bill_channel_tax=0;
		var bill_channel_payable=0;
													
		var pending_items_count=0;

		var actual_order_items=[];
		var order_items=[];
		var bill_key=get_new_key();								
								
		$("#modal133_item_table tr").each(function(index)
		{
			var checked=false;
			if($(this).find('td:nth-child(3)>input').length>0)
				checked=$(this).find('td:nth-child(3)>input')[0].checked;
			var order_item=new Object();			
			if(checked)
			{
				//console.log($(this).attr('data-object'));
				order_item=JSON.parse($(this).attr('data-object'));
				order_items.push(order_item);
			}
						
			actual_order_items.push(order_item);
		});

		//console.log(order_items);
		//console.log(actual_order_items);
		
		if(!(order_items.length!=(actual_order_items.length-1) && get_session_var('allow_partial_billing')=='no'))
		{
			if(order_items.length>0)
			{
				pending_items_count=order_items.length;
				//console.log(order_items);
				
				var inventory_adjust_array=[];
				var bill_items_xml_array=[];
				var order_items_xml_array=[];
				
				order_items.forEach(function(order_item)
				{
					var components_data="<pre_requisites>"+
										"<type exact='yes'>product</type>"+
										"<requisite_type exact='yes'>product</requisite_type>"+
										"<requisite_name></requisite_name>"+
										"<requisite_desc></requisite_desc>"+
										"<quantity></quantity>"+
										"<name exact='yes'>"+order_item.item_name+"</name>"+
										"</pre_requisites>";
					fetch_requested_data('',components_data,function(components)
					{
						if(components.length>0)
						{
							//////////////////////////////////////////////////
							var item_amount=order_item.amount;
							var item_total=order_item.total;
							var item_freight=order_item.freight;
							var item_tax=order_item.tax;
							var item_mrp=order_item.mrp;
							var item_channel_charges=0;
							var item_tax_rate=order_item.tax_rate;
											
							var price_data="<channel_prices count='1'>" +
									"<from_time upperbound='yes'>"+order_time+"</from_time>"+
									"<channel exact='yes'>"+sale_channel+"</channel>"+
			                        "<item exact='yes'>"+order_item.item_name+"</item>"+
									"<sale_price></sale_price>"+
									"<freight></freight>"+
									"<mrp></mrp>"+
									"<discount_customer></discount_customer>"+
			        				"<gateway_charges></gateway_charges>"+
			        				"<storage_charges></storage_charges>"+
			        				"<channel_commission></channel_commission>"+
									"<total_charges></total_charges>"+
									"<service_tax></service_tax>"+
									"<total_payable></total_payable>"+
									"<total_receivable></total_receivable>"+
									"</channel_prices>";
							fetch_requested_data('',price_data,function(sale_prices)
							{
								//console.log(sale_prices);

								if(sale_prices.length>0)
								{
									//////adding offer details
									var pickup_data="<pickup_charges>"+
													"<rate></rate>"+
													"<min_charges></min_charges>"+
													"<max_charges></max_charges>"+
													"<pincode exact='yes'>all</pincode>"+
													"<channel exact='yes'>"+sale_channel+"</channel>"+
													"</pickup_charges>";
									fetch_requested_data('',pickup_data,function(pickups)
									{
										//console.log(pickups);
										var pickup_charges=0;
										var item_dead_weight=100;
										if(pickups.length>0)
										{
											pickup_charges=parseFloat(pickups[0].rate)*parseFloat(item_dead_weight);
											if(pickup_charges>parseFloat(pickups[0].max_charges))
											{
												pickup_charges=parseFloat(pickups[0].max_charges);
											}
											else if(pickup_charges<parseFloat(pickups[0].min_charges))
											{
												pickup_charges=parseFloat(pickups[0].min_charges);
											}
										}
										//item_freight=parseFloat(order_item.quantity)*parseFloat(sale_prices[0].freight);
										//item_total=(parseFloat(order_item.quantity)*parseFloat(sale_prices[0].sale_price))+item_freight;
										item_channel_charges=(parseFloat(order_item.quantity)*(parseFloat(sale_prices[0].channel_commission)+pickup_charges));
										item_channel_tax=item_channel_charges*.14;
										item_channel_payable=item_channel_charges*1.14;												
										//item_tax_rate=0;
										
										var tax_data="<product_master count='1'>" +
												"<name exact='yes'>"+order_item.item_name+"</name>" +
												"<description></description>"+
												"<tax></tax>" +
												"</product_master>";
										fetch_requested_data('',tax_data,function(taxes)
										{
											//console.log(taxes);
		
											order_item.item_desc=taxes[0].description;
											/*
											if(bill_type=='Retail-CST-C')
											{
												taxes[0].tax=get_session_var('cst_rate');
											}
											*/
											//item_tax_rate=taxes[0].tax;
											//item_amount=my_round((item_total-item_freight)/(1+(parseFloat(taxes[0].tax)/100)),2);
											//item_tax=my_round((item_total-item_amount-item_freight),2);
		
											var unit_price=item_amount/parseFloat(order_item.quantity);
											
											var item_storage="";
											var bill_item_id=get_new_key();
											var adjust2_data_xml="<inventory_adjust>"+
													"<id>"+bill_item_id+"</id>" +
													"<product_name>"+order_item.item_name+"</product_name>" +
													"<item_desc>"+order_item.item_desc+"</item_desc>" +
													"<batch>NA</batch>" +
													"<picked_status>picked</picked_status>" +
													"<quantity>"+order_item.quantity+"</quantity>" +
													"<picked_quantity>"+order_item.quantity+"</picked_quantity>" +
													"<storage>NA</storage>"+
													"<source>picked</source>"+
													"<source_id>"+bill_key+"</source_id>"+
													"<show_for_packing>dummy</show_for_packing>"+
													"<last_updated>"+get_my_time()+"</last_updated>"+
													"</inventory_adjust>";
												
											inventory_adjust_array.push(adjust2_data_xml);						
										
							                var data_xml="<bill_items>" +
													"<id>"+bill_item_id+"</id>" +
													"<item_name>"+order_item.item_name+"</item_name>" +
													"<item_desc>"+order_item.item_desc+"</item_desc>" +
													"<batch>NA</batch>" +
													"<unit_price>"+unit_price+"</unit_price>" +
													"<mrp>"+item_mrp+"</mrp>" +
													"<quantity>"+order_item.quantity+"</quantity>" +
													"<amount>"+item_amount+"</amount>" +
													"<total>"+item_total+"</total>" +
													"<channel_charges>"+item_channel_charges+"</channel_charges>" +
													"<freight>"+item_freight+"</freight>" +
													"<tax>"+item_tax+"</tax>" +
													"<tax_rate>"+item_tax_rate+"</tax_rate>" +
													"<bill_id>"+bill_key+"</bill_id>" +
													"<storage>NA</storage>"+
													"<picked_status>picked</picked_status>"+
													"<picked_quantity>"+order_item.quantity+"</picked_quantity>"+																	
													"<packed_quantity>"+order_item.quantity+"</packed_quantity>"+																	
													"<packing_status>packed</packing_status>"+
													"<show_for_packing>dummy</show_for_packing>"+
													"<last_updated>"+get_my_time()+"</last_updated>" +
													"</bill_items>";	
													
											bill_items_xml_array.push(data_xml);
											
											bill_amount+=item_amount;
											bill_freight+=item_freight;
											bill_total+=item_total;
											bill_tax+=item_tax;
											bill_channel_charges+=item_channel_charges;
											bill_channel_tax+=item_channel_tax;
											bill_channel_payable+=item_channel_payable;
											
											pending_items_count-=1;
											
											var order_item_xml="<sale_order_items>" +
													"<id>"+order_item.id+"</id>" +
													"<item_name>"+order_item.item_name+"</item_name>" +
													"<item_desc>"+order_item.item_desc+"</item_desc>" +
													"<last_updated>"+get_my_time()+"</last_updated>" +
													"</sale_order_items>";
											order_items_xml_array.push(order_item_xml);
										});
									});
								}
								else 
								{
									pending_items_count-=1;
								}
							});

							pending_items_count+=components.length;
							components.forEach(function(component)
							{
								component.quantity=parseFloat(component.quantity)*parseFloat(order_item.quantity);
								
								var batch_data="<product_instances>" +
										"<batch></batch>" +
										"<expiry></expiry>" +
										"<product_name exact='yes'>"+component.requisite_name+"</product_name>" +
										//"<status exact='yes'>available</status>"+
										"</product_instances>";
								fetch_requested_data('',batch_data,function(batches_array)
								{
									console.log(batches_array);
									//batches.reverse();
									
									batches_array.sort(function(a,b)
									{
										if(parseFloat(a.expiry)>parseFloat(b.expiry) || isNaN(a.expiry) || a.expiry=="" || a.expiry==0)
										{	return 1;}
										else 
										{	return -1;}
									});
									var batches=[];
									batches_array.forEach(function (batches_array_elem) 
									{
										console.log(batches_array_elem);
										batches.push(batches_array_elem.batch);
									});
									
									console.log(batches);
									
									var single_batch=batches[0];
									var batches_result_array=[];
									get_available_batch(component.requisite_name,batches,component.quantity,batches_result_array,function()
									{
										console.log(batches_result_array);
										if(batches_result_array.length===0)
										{
											var single_batch_object=new Object();
											single_batch_object.batch=single_batch;
											single_batch_object.quantity=order_item.quantity;
											
											batches_result_array.push(single_batch_object);
										}
										
										pending_items_count+=batches_result_array.length-1;
										
										batches_result_array.forEach(function(batch_result)
										{
											var storage_xml="<area_utilization>"+
															"<name></name>"+
															"<item_name exact='yes'>"+component.requisite_name+"</item_name>"+
															"<batch exact='yes'>"+batch_result.batch+"</batch>"+
															"</area_utilization>";
																								
											get_single_column_data(function (storages) 
											{
												var storage_result_array=[];
												get_available_storage(component.requisite_name,batch_result.batch,storages,batch_result.quantity,storage_result_array,function () 
												{
													console.log(storage_result_array);

													var item_storage="";
													var bill_item_id=get_new_key();
													var adjust_count=1;	
													
													if(storage_result_array.length>0)
													{
														item_storage=storage_result_array[0].storage;
													}
													else 
													{
														adjust_count+=1;
														var adjust_data_xml="<inventory_adjust>"+
															"<id>"+(bill_item_id+adjust_count)+"</id>" +
															"<product_name>"+component.requisite_name+"</product_name>" +
															"<item_desc>"+component.requisite_desc+"</item_desc>" +
															"<batch>"+batch_result.batch+"</batch>" +
															"<picked_status>pending</picked_status>" +
															"<packing_status>pending</packing_status>" +
															"<quantity>-"+batch_result.quantity+"</quantity>" +
															"<picked_quantity>0</picked_quantity>" +
															"<packed_quantity>0</packed_quantity>" +
															"<storage></storage>"+
															"<source>picking</source>"+
															"<source_id>"+bill_key+"</source_id>"+
															"<show_for_packing>yes</show_for_packing>"+
															"<last_updated>"+get_my_time+"</last_updated>"+
															"</inventory_adjust>";
														inventory_adjust_array.push(adjust_data_xml);																			

													}
													storage_result_array.forEach(function(storage_result)
													{
														adjust_count+=1;
														var adjust_data_xml="<inventory_adjust>"+
															"<id>"+(bill_item_id+adjust_count)+"</id>" +
															"<product_name>"+component.requisite_name+"</product_name>" +
															"<item_desc>"+component.requisite_desc+"</item_desc>" +
															"<batch>"+batch_result.batch+"</batch>" +
															"<picked_status>pending</picked_status>" +
															"<packing_status>pending</packing_status>" +
															"<quantity>-"+storage_result.quantity+"</quantity>" +
															"<picked_quantity>0</picked_quantity>" +
															"<packed_quantity>0</packed_quantity>" +
															"<storage>"+storage_result.storage+"</storage>"+
															"<source>picking</source>"+
															"<source_id>"+bill_key+"</source_id>"+
															"<show_for_packing>yes</show_for_packing>"+
															"<last_updated>"+get_my_time+"</last_updated>"+
															"</inventory_adjust>";
														inventory_adjust_array.push(adjust_data_xml);																			
													});
												
													pending_items_count-=1;
												});
												
											},storage_xml);	
										});
									});	
								});
							});
							//////////////////////////////////////////////////
						}
						else 
						{
							var item_amount=order_item.amount;
							var item_total=order_item.total;
							var item_freight=order_item.freight;
							var item_tax=order_item.tax;
							var item_mrp=order_item.mrp;
							var item_channel_charges=0;
							var item_tax_rate=order_item.tax_rate;
											
							var batch_data="<product_instances>" +
									"<batch></batch>" +
									"<expiry></expiry>" +
									"<product_name exact='yes'>"+order_item.item_name+"</product_name>" +
									//"<status exact='yes'>available</status>"+
									"</product_instances>";
							fetch_requested_data('',batch_data,function(batches_array)
							{
								//console.log(batches_array);
								//batches.reverse();
								
								batches_array.sort(function(a,b)
								{
									if(parseFloat(a.expiry)>parseFloat(b.expiry) || isNaN(a.expiry) || a.expiry=="" || a.expiry==0)
									{	return 1;}
									else 
									{	return -1;}
								});
								var batches=[];
								batches_array.forEach(function (batches_array_elem) 
								{
									//console.log(batches_array_elem);
									batches.push(batches_array_elem.batch);
								});
								
								//console.log(batches);
								
								var single_batch=batches[0];
								var batches_result_array=[];
								get_available_batch(order_item.item_name,batches,order_item.quantity,batches_result_array,function()
								{
									var price_data="<channel_prices count='1'>" +
											"<from_time upperbound='yes'>"+order_time+"</from_time>"+
											"<channel exact='yes'>"+sale_channel+"</channel>"+
					                        "<item exact='yes'>"+order_item.item_name+"</item>"+
											"<sale_price></sale_price>"+
											"<freight></freight>"+
											"<mrp></mrp>"+
											"<discount_customer></discount_customer>"+
					        				"<gateway_charges></gateway_charges>"+
					        				"<storage_charges></storage_charges>"+
					        				"<channel_commission></channel_commission>"+
											"<total_charges></total_charges>"+
											"<service_tax></service_tax>"+
											"<total_payable></total_payable>"+
											"<total_receivable></total_receivable>"+
											"</channel_prices>";
									fetch_requested_data('',price_data,function(sale_prices)
									{
										//console.log(sale_prices);
				
										if(sale_prices.length>0)
										{
											//////adding offer details
											var pickup_data="<pickup_charges>"+
															"<rate></rate>"+
															"<min_charges></min_charges>"+
															"<max_charges></max_charges>"+
															"<pincode exact='yes'>all</pincode>"+
															"<channel exact='yes'>"+sale_channel+"</channel>"+
															"</pickup_charges>";
											fetch_requested_data('',pickup_data,function(pickups)
											{
												//console.log(pickups);
				
												var pickup_charges=0;
												var item_dead_weight=100;
												if(pickups.length>0)
												{
													pickup_charges=parseFloat(pickups[0].rate)*parseFloat(item_dead_weight);
													if(pickup_charges>parseFloat(pickups[0].max_charges))
													{
														pickup_charges=parseFloat(pickups[0].max_charges);
													}
													else if(pickup_charges<parseFloat(pickups[0].min_charges))
													{
														pickup_charges=parseFloat(pickups[0].min_charges);
													}
												}
												//item_freight=parseFloat(order_item.quantity)*parseFloat(sale_prices[0].freight);
												//item_total=(parseFloat(order_item.quantity)*parseFloat(sale_prices[0].sale_price))+item_freight;
												item_channel_charges=(parseFloat(order_item.quantity)*(parseFloat(sale_prices[0].channel_commission)+pickup_charges));
												item_channel_tax=item_channel_charges*.14;
												item_channel_payable=item_channel_charges*1.14;												
												//item_tax_rate=0;
												
												var tax_data="<product_master count='1'>" +
														"<name exact='yes'>"+order_item.item_name+"</name>" +
														"<description></description>"+
														"<tax></tax>" +
														"</product_master>";
												fetch_requested_data('',tax_data,function(taxes)
												{
													//console.log(taxes);
				
													order_item.item_desc=taxes[0].description;
													/*													
													if(bill_type=='Retail-CST-C')
													{
														taxes[0].tax=get_session_var('cst_rate');
													}
													item_tax_rate=taxes[0].tax;
													item_amount=my_round((item_total-item_freight)/(1+(parseFloat(taxes[0].tax)/100)),2);
													item_tax=my_round((item_total-item_amount-item_freight),2);
													*/
													var unit_price=item_amount/parseFloat(order_item.quantity);
													
													//console.log(batches_result_array);
													if(batches_result_array.length===0)
													{
														var single_batch_object=new Object();
														single_batch_object.batch=single_batch;
														single_batch_object.quantity=order_item.quantity;
														
														batches_result_array.push(single_batch_object);
													}
													
													pending_items_count+=batches_result_array.length-1;
													
													batches_result_array.forEach(function(batch_result)
													{
														var storage_xml="<area_utilization>"+
																		"<name></name>"+
																		"<item_name exact='yes'>"+order_item.item_name+"</item_name>"+
																		"<batch exact='yes'>"+batch_result.batch+"</batch>"+
																		"</area_utilization>";
																											
														get_single_column_data(function (storages) 
														{
															var storage_result_array=[];
															get_available_storage(order_item.item_name,batch_result.batch,storages,batch_result.quantity,storage_result_array,function () 
															{
																console.log(storage_result_array);
			
																var item_storage="";
																if(storage_result_array.length>0)
																{
																	item_storage=storage_result_array[0].storage;
																}
																
																var bill_item_picked_status='pending';
																var bill_item_picked_quantity=0;
																var bill_item_amount=my_round((item_amount*batch_result.quantity/order_item.quantity),2);
																var bill_item_total=my_round((item_total*batch_result.quantity/order_item.quantity),2);
																var bill_item_channel_charges=my_round((item_channel_charges*batch_result.quantity/order_item.quantity),2);
																var bill_item_freight=my_round((item_freight*batch_result.quantity/order_item.quantity),2);
																var bill_item_tax=my_round((item_tax*batch_result.quantity/order_item.quantity),2);
																var bill_item_channel_tax=my_round((item_channel_tax*batch_result.quantity/order_item.quantity),2);
																var bill_item_channel_payable=my_round((item_channel_payable*batch_result.quantity/order_item.quantity),2);															
																var bill_item_id=get_new_key();
																
																if(storage_result_array.length>1)
																{
																	bill_item_picked_status='picked';
																	bill_item_picked_quantity=batch_result.quantity;
																	var adjust_count=1;
																	storage_result_array.forEach(function(storage_result)
																	{
																		adjust_count+=1;
																		var adjust_data_xml="<inventory_adjust>"+
																			"<id>"+(bill_item_id+adjust_count)+"</id>" +
																			"<product_name>"+order_item.item_name+"</product_name>" +
																			"<item_desc>"+order_item.item_desc+"</item_desc>" +
																			"<batch>"+batch_result.batch+"</batch>" +
																			"<picked_status>pending</picked_status>" +
																			"<quantity>-"+storage_result.quantity+"</quantity>" +
																			"<picked_quantity>0</picked_quantity>" +
																			"<storage>"+storage_result.storage+"</storage>"+
																			"<source>picking</source>"+
																			"<source_id>"+bill_key+"</source_id>"+
																			"<last_updated>"+get_my_time+"</last_updated>"+
																			"</inventory_adjust>";
																		inventory_adjust_array.push(adjust_data_xml);																			
																	});
																		
																	var adjust2_data_xml="<inventory_adjust>"+
																			"<id>"+bill_item_id+"</id>" +
																			"<product_name>"+order_item.item_name+"</product_name>" +
																			"<item_desc>"+order_item.item_desc+"</item_desc>" +
																			"<batch>"+batch_result.batch+"</batch>" +
																			"<picked_status>picked</picked_status>" +
																			"<quantity>"+batch_result.quantity+"</quantity>" +
																			"<picked_quantity>"+batch_result.quantity+"</picked_quantity>" +
																			"<storage>"+item_storage+"</storage>"+
																			"<source>picked</source>"+
																			"<source_id>"+bill_key+"</source_id>"+
																			"<last_updated>"+get_my_time()+"</last_updated>"+
																			"</inventory_adjust>";
																		
																	inventory_adjust_array.push(adjust2_data_xml);						
																}
																
												                var data_xml="<bill_items>" +
																		"<id>"+bill_item_id+"</id>" +
																		"<item_name>"+order_item.item_name+"</item_name>" +
																		"<item_desc>"+order_item.item_desc+"</item_desc>" +
																		"<batch>"+batch_result.batch+"</batch>" +
																		"<unit_price>"+unit_price+"</unit_price>" +
																		"<mrp>"+item_mrp+"</mrp>" +
																		"<quantity>"+batch_result.quantity+"</quantity>" +
																		"<amount>"+bill_item_amount+"</amount>" +
																		"<total>"+bill_item_total+"</total>" +
																		"<channel_charges>"+bill_item_channel_charges+"</channel_charges>" +
																		"<freight>"+bill_item_freight+"</freight>" +
																		"<tax>"+bill_item_tax+"</tax>" +
																		"<tax_rate>"+item_tax_rate+"</tax_rate>" +
																		"<bill_id>"+bill_key+"</bill_id>" +
																		"<storage>"+item_storage+"</storage>"+
																		"<picked_status>"+bill_item_picked_status+"</picked_status>"+
																		"<picked_quantity>"+bill_item_picked_quantity+"</picked_quantity>"+																	
																		"<packing_status>pending</packing_status>"+
																		"<last_updated>"+get_my_time()+"</last_updated>" +
																		"</bill_items>";	
																		
																bill_items_xml_array.push(data_xml);
																
																bill_amount+=bill_item_amount;
																bill_freight+=bill_item_freight;
																bill_total+=bill_item_total;
																bill_tax+=bill_item_tax;
																bill_channel_charges+=bill_item_channel_charges;
																bill_channel_tax+=bill_item_channel_tax;
																bill_channel_payable+=bill_item_channel_payable;
																
																pending_items_count-=1;
															});
															
														},storage_xml);	
													});
													
													var order_item_xml="<sale_order_items>" +
															"<id>"+order_item.id+"</id>" +
															"<item_name>"+order_item.item_name+"</item_name>" +
															"<item_desc>"+order_item.item_desc+"</item_desc>" +
															"<last_updated>"+get_my_time()+"</last_updated>" +
															"</sale_order_items>";
													order_items_xml_array.push(order_item_xml);
																																
												});
											});
										}
										else 
										{
											pending_items_count-=1;
										}
									});
								});

							});
						}
					});										
				});
			
				/////saving bill details
				var bill_items_complete=setInterval(function()
				{
			  	   if(pending_items_count===0)
			  	   {
			  		   	clearInterval(bill_items_complete);
			  		   	
		  		   		var num_data="<user_preferences>"+
									"<id></id>"+						
									"<value></value>"+										
									"<name exact='yes'>"+bill_type+"_bill_num</name>"+												
									"</user_preferences>";
						fetch_requested_data('',num_data,function (bill_num_ids)
						{
							if(bill_num_ids.length>0)
							{
								//////////////////////////////////////////////
								var sale_order_xml="<sale_orders>"+
											"<id>"+order_id+"</id>" +
											"<bill_id></bill_id>" +
											"<total_quantity></total_quantity>"+
											"</sale_orders>";
								fetch_requested_data('',sale_order_xml,function (sorders) 
								{
									if(sorders.length>0)
									{
										var id_object_array=[];
										if(sorders[0].bill_id!="" && sorders[0].bill_id!=0 && sorders[0].bill_id!="null")
										{
											id_object_array=JSON.parse(sorders[0].bill_id);
										}
										
										var id_object=new Object();
										id_object.bill_num=bill_num_ids[0].value;
										id_object.bill_id=bill_key;
																				
										id_object.quantity=0;
										for(var j in order_items)
										{
											id_object.quantity+=parseFloat(order_items[j].quantity);											
										}
										id_object_array.push(id_object);
						
										var master_total_quantity=0;				
										for(var k in id_object_array)
										{
											master_total_quantity+=parseFloat(id_object_array[k].quantity);
										}
										
										var status='partially billed';				
										if(master_total_quantity==parseFloat(sorders[0].total_quantity))
										{
											status='billed';
										}

										var new_bill_id=JSON.stringify(id_object_array);
										//console.log(new_bill_id);
										var so_xml="<sale_orders>" +
												"<id>"+order_id+"</id>" +
												"<bill_id>"+new_bill_id+"</bill_id>" +
												"<status>"+status+"</status>" +
												"<last_updated>"+get_my_time()+"</last_updated>" +
												"</sale_orders>";
										update_simple_func(so_xml,function () 
										{
											form108_ini();
										});					
									}
								});	
								/////////////////////////////////////////////		  						
		  						var bill_key_string=""+bill_key;	
								var pick_bag_num=bill_key_string.slice(-3);

		  						var num_xml="<user_preferences>"+
										"<id>"+bill_num_ids[0].id+"</id>"+
										"<value>"+(parseInt(bill_num_ids[0].value)+1)+"</value>"+
										"<last_updated>"+get_my_time()+"</last_updated>"+
										"</user_preferences>";
								var bill_xml="<bills>" +
										"<id>"+bill_key+"</id>" +
										"<bill_num>"+bill_num_ids[0].value+"</bill_num>"+										
										"<order_num>"+order_num+"</order_num>"+										
										"<order_id>"+order_id+"</order_id>"+										
										"<customer_name>"+customer+"</customer_name>" +
										"<bill_date>"+get_my_time()+"</bill_date>" +
										"<billing_type>"+bill_type+"</billing_type>" +
										"<amount>"+bill_amount+"</amount>" +
										"<freight>"+bill_freight+"</freight>"+									
										"<total>"+bill_total+"</total>" +
										"<discount>0</discount>" +
										"<channel>"+sale_channel+"</channel>"+									
										"<channel_charges>"+bill_channel_charges+"</channel_charges>"+
										"<channel_tax>"+bill_channel_tax+"</channel_tax>"+
										"<channel_payable>"+bill_channel_payable+"</channel_payable>"+
										"<tax>"+bill_tax+"</tax>" +
										"<transaction_id>"+order_id+"</transaction_id>" +
										"<pick_bag_num>"+pick_bag_num+"</pick_bag_num>"+
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</bills>";			
								var activity_xml="<activity>" +
										"<data_id>"+bill_key+"</data_id>" +
										"<tablename>bills</tablename>" +
										"<link_to>form42</link_to>" +
										"<title>Saved</title>" +
										"<notes>Billed order# "+order_num+"</notes>" +
										"<updated_by>"+get_name()+"</updated_by>" +
										"</activity>";
								var transaction_xml="<transactions>" +
										"<id>"+bill_key+"</id>" +
										"<trans_date>"+get_my_time()+"</trans_date>" +
										"<amount>"+bill_total+"</amount>" +
										"<receiver>"+customer+"</receiver>" +
										"<giver>master</giver>" +
										"<tax>"+bill_tax+"</tax>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</transactions>";
								var pt_tran_id=get_new_key();
								var payment_xml="<payments>" +
										"<id>"+pt_tran_id+"</id>" +
										"<status>pending</status>" +
										"<type>received</type>" +
										"<date>"+get_my_time()+"</date>" +
										"<total_amount>"+bill_total+"</total_amount>" +
										"<paid_amount>0</paid_amount>" +
										"<acc_name>"+customer+"</acc_name>" +
										"<due_date>"+get_credit_period()+"</due_date>" +
										"<mode>"+get_payment_mode()+"</mode>" +
										"<transaction_id>"+pt_tran_id+"</transaction_id>" +
										"<bill_id>"+order_id+"</bill_id>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</payments>";
								var pt_xml="<transactions>" +
										"<id>"+pt_tran_id+"</id>" +
										"<trans_date>"+get_my_time()+"</trans_date>" +
										"<amount>"+bill_total+"</amount>" +
										"<receiver>master</receiver>" +
										"<giver>"+customer+"</giver>" +
										"<tax>0</tax>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</transactions>";
								
								create_simple(transaction_xml);
								create_simple(pt_xml);
								create_simple(payment_xml);
								update_simple(num_xml);
								create_row(bill_xml,activity_xml);
								
								//console.log(bill_items_xml_array);
								//console.log(bill_xml);
		
								bill_items_xml_array.forEach(function (bill_item_xml) 
								{
									create_simple(bill_item_xml);
								});
								
								inventory_adjust_array.forEach(function (adjust_item_xml) 
								{
									create_simple(adjust_item_xml);
								});
								
								order_items_xml_array.forEach(function (order_item_xml) 
								{
									update_simple(order_item_xml);
								});
							}
						});
						hide_loader();
					}
			    },200);		
			}
			else
			{
				hide_loader();
				$("#modal63").dialog("open");
			}
		}
		else
		{
			hide_loader();
			$("#modal64").dialog("open");			
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}

/**
 * This function transforms a sale order into a bill
 * It is applicable for product bills only
 * @form 108
 * @param order_id
 */
/*
function form108_bill(order_id,bill_type,order_num,sale_channel,customer,order_time)
{
	///check following data is adequately updated
	//a. product batches
	//b. channel prices
	//c. pickup charges
	if(is_create_access('form108'))
	{
		show_loader();
		var bill_amount=0;
		var bill_total=0;
		var bill_freight=0;
		var bill_tax=0;
		var bill_channel_charges=0;
		var bill_channel_tax=0;
		var bill_channel_payable=0;
													
		var pending_items_count=0;

		var actual_order_items=[];
		var order_items=[];
		var bill_key=get_new_key();								
								
		$("#modal133_item_table tr").each(function(index)
		{
			var checked=false;
			if($(this).find('td:nth-child(3)>input').length>0)
				checked=$(this).find('td:nth-child(3)>input')[0].checked;
			var order_item=new Object();			
			if(checked)
			{
				order_item.id=$(this).attr('data-id');
				order_item.item_name=$(this).find('td:first').html();
				order_item.quantity=$(this).find('td:nth-child(2)').html();
				//console.log(order_item);
				order_items.push(order_item);
			}
			actual_order_items.push(order_item);
		});

		//console.log(order_items);
		//console.log(actual_order_items);
		
		if(!(order_items.length!=(actual_order_items.length-1) && get_session_var('allow_partial_billing')=='no'))
		{
			if(order_items.length>0)
			{
				pending_items_count=order_items.length;
				//console.log(order_items);
				
				var inventory_adjust_array=[];
				var bill_items_xml_array=[];
				var order_items_xml_array=[];
				
				order_items.forEach(function(order_item)
				{
					var item_amount=0;
					var item_total=0;
					var item_freight=0;
					var item_tax=0;
					var item_channel_charges=0;
					var item_mrp=0;
									
					var batch_data="<product_instances>" +
							"<batch></batch>" +
							"<expiry></expiry>" +
							"<product_name exact='yes'>"+order_item.item_name+"</product_name>" +
							//"<status exact='yes'>available</status>"+
							"</product_instances>";
					fetch_requested_data('',batch_data,function(batches_array)
					{
						//console.log(batches_array);
						//batches.reverse();
						
						batches_array.sort(function(a,b)
						{
							if(parseFloat(a.expiry)>parseFloat(b.expiry) || isNaN(a.expiry) || a.expiry=="" || a.expiry==0)
							{	return 1;}
							else 
							{	return -1;}
						});
						var batches=[];
						batches_array.forEach(function (batches_array_elem) 
						{
							//console.log(batches_array_elem);
							batches.push(batches_array_elem.batch);
						});
						
						console.log(batches);
						
						var single_batch=batches[0];
						var batches_result_array=[];
						get_available_batch(order_item.item_name,batches,order_item.quantity,batches_result_array,function()
						{
							var price_data="<channel_prices count='1'>" +
									"<from_time upperbound='yes'>"+order_time+"</from_time>"+
									"<channel exact='yes'>"+sale_channel+"</channel>"+
			                        "<item exact='yes'>"+order_item.item_name+"</item>"+
									"<sale_price></sale_price>"+
									"<freight></freight>"+
									"<mrp></mrp>"+
									"<discount_customer></discount_customer>"+
			        				"<gateway_charges></gateway_charges>"+
			        				"<storage_charges></storage_charges>"+
			        				"<channel_commission></channel_commission>"+
									"<total_charges></total_charges>"+
									"<service_tax></service_tax>"+
									"<total_payable></total_payable>"+
									"<total_receivable></total_receivable>"+
									"</channel_prices>";
							fetch_requested_data('',price_data,function(sale_prices)
							{
								//console.log(sale_prices);
		
								if(sale_prices.length>0)
								{
									//////adding offer details
									var pickup_data="<pickup_charges>"+
													"<rate></rate>"+
													"<min_charges></min_charges>"+
													"<max_charges></max_charges>"+
													"<pincode exact='yes'>all</pincode>"+
													"<channel exact='yes'>"+sale_channel+"</channel>"+
													"</pickup_charges>";
									fetch_requested_data('',pickup_data,function(pickups)
									{
										//console.log(pickups);
		
										var pickup_charges=0;
										var item_dead_weight=100;
										if(pickups.length>0)
										{
											pickup_charges=parseFloat(pickups[0].rate)*parseFloat(item_dead_weight);
											if(pickup_charges>parseFloat(pickups[0].max_charges))
											{
												pickup_charges=parseFloat(pickups[0].max_charges);
											}
											else if(pickup_charges<parseFloat(pickups[0].min_charges))
											{
												pickup_charges=parseFloat(pickups[0].min_charges);
											}
										}
										
										item_freight=parseFloat(order_item.quantity)*parseFloat(sale_prices[0].freight);
										item_total=(parseFloat(order_item.quantity)*parseFloat(sale_prices[0].sale_price))+item_freight;
										item_channel_charges=(parseFloat(order_item.quantity)*(parseFloat(sale_prices[0].channel_commission)+pickup_charges));
										item_channel_tax=item_channel_charges*.14;
										item_channel_payable=item_channel_charges*1.14;												
										item_mrp=sale_prices[0].mrp;
										item_tax_rate=0;
										var tax_data="<product_master count='1'>" +
												"<name exact='yes'>"+order_item.item_name+"</name>" +
												"<description></description>"+
												"<tax></tax>" +
												"</product_master>";
										fetch_requested_data('',tax_data,function(taxes)
										{
											//console.log(taxes);
		
											order_item.item_desc=taxes[0].description;
											if(taxes.length>0)
											{
												if(bill_type=='Retail-CST-C')
												{
													taxes[0].tax=get_session_var('cst_rate');
												}
												item_tax_rate=taxes[0].tax;
												item_amount=my_round((item_total-item_freight)/(1+(parseFloat(taxes[0].tax)/100)),2);
												item_tax=my_round((item_total-item_amount-item_freight),2);
			
												var unit_price=item_amount/parseFloat(order_item.quantity);
												
												//console.log(batches_result_array);
												if(batches_result_array.length===0)
												{
													var single_batch_object=new Object();
													single_batch_object.batch=single_batch;
													single_batch_object.quantity=order_item.quantity;
													
													batches_result_array.push(single_batch_object);
												}
												
												pending_items_count+=batches_result_array.length-1;
												
												batches_result_array.forEach(function(batch_result)
												{
													var storage_xml="<area_utilization>"+
																	"<name></name>"+
																	"<item_name exact='yes'>"+order_item.item_name+"</item_name>"+
																	"<batch exact='yes'>"+batch_result.batch+"</batch>"+
																	"</area_utilization>";
																										
													get_single_column_data(function (storages) 
													{
														var storage_result_array=[];
														get_available_storage(order_item.item_name,batch_result.batch,storages,batch_result.quantity,storage_result_array,function () 
														{
															console.log(storage_result_array);
		
															var item_storage="";
															if(storage_result_array.length>0)
															{
																item_storage=storage_result_array[0].storage;
															}
															
															var bill_item_picked_status='pending';
															var bill_item_picked_quantity=0;
															var bill_item_amount=my_round((item_amount*batch_result.quantity/order_item.quantity),2);
															var bill_item_total=my_round((item_total*batch_result.quantity/order_item.quantity),2);
															var bill_item_channel_charges=my_round((item_channel_charges*batch_result.quantity/order_item.quantity),2);
															var bill_item_freight=my_round((item_freight*batch_result.quantity/order_item.quantity),2);
															var bill_item_tax=my_round((item_tax*batch_result.quantity/order_item.quantity),2);
															var bill_item_channel_tax=my_round((item_channel_tax*batch_result.quantity/order_item.quantity),2);
															var bill_item_channel_payable=my_round((item_channel_payable*batch_result.quantity/order_item.quantity),2);															
															var bill_item_id=get_new_key();
															
															if(storage_result_array.length>1)
															{
																bill_item_picked_status='picked';
																bill_item_picked_quantity=batch_result.quantity;
																var adjust_count=1;
																storage_result_array.forEach(function(storage_result)
																{
																	adjust_count+=1;
																	var adjust_data_xml="<inventory_adjust>"+
																		"<id>"+(bill_item_id+adjust_count)+"</id>" +
																		"<product_name>"+order_item.item_name+"</product_name>" +
																		"<item_desc>"+order_item.item_desc+"</item_desc>" +
																		"<batch>"+batch_result.batch+"</batch>" +
																		"<picked_status>pending</picked_status>" +
																		"<quantity>-"+storage_result.quantity+"</quantity>" +
																		"<picked_quantity>0</picked_quantity>" +
																		"<storage>"+storage_result.storage+"</storage>"+
																		"<source>picking</source>"+
																		"<source_id>"+bill_key+"</source_id>"+
																		"<last_updated>"+get_my_time+"</last_updated>"+
																		"</inventory_adjust>";
																	inventory_adjust_array.push(adjust_data_xml);																			
																});
																	
																var adjust2_data_xml="<inventory_adjust>"+
																		"<id>"+bill_item_id+"</id>" +
																		"<product_name>"+order_item.item_name+"</product_name>" +
																		"<item_desc>"+order_item.item_desc+"</item_desc>" +
																		"<batch>"+batch_result.batch+"</batch>" +
																		"<picked_status>picked</picked_status>" +
																		"<quantity>"+batch_result.quantity+"</quantity>" +
																		"<picked_quantity>"+batch_result.quantity+"</picked_quantity>" +
																		"<storage>"+item_storage+"</storage>"+
																		"<source>picked</source>"+
																		"<source_id>"+bill_key+"</source_id>"+
																		"<last_updated>"+get_my_time()+"</last_updated>"+
																		"</inventory_adjust>";
																	
																inventory_adjust_array.push(adjust2_data_xml);						
															}
															
											                var data_xml="<bill_items>" +
																	"<id>"+bill_item_id+"</id>" +
																	"<item_name>"+order_item.item_name+"</item_name>" +
																	"<item_desc>"+order_item.item_desc+"</item_desc>" +
																	"<batch>"+batch_result.batch+"</batch>" +
																	"<unit_price>"+unit_price+"</unit_price>" +
																	"<mrp>"+item_mrp+"</mrp>" +
																	"<quantity>"+batch_result.quantity+"</quantity>" +
																	"<amount>"+bill_item_amount+"</amount>" +
																	"<total>"+bill_item_total+"</total>" +
																	"<channel_charges>"+bill_item_channel_charges+"</channel_charges>" +
																	"<freight>"+bill_item_freight+"</freight>" +
																	"<tax>"+bill_item_tax+"</tax>" +
																	"<tax_rate>"+item_tax_rate+"</tax_rate>" +
																	"<bill_id>"+bill_key+"</bill_id>" +
																	"<storage>"+item_storage+"</storage>"+
																	"<picked_status>"+bill_item_picked_status+"</picked_status>"+
																	"<picked_quantity>"+bill_item_picked_quantity+"</picked_quantity>"+																	
																	"<packing_status>pending</packing_status>"+
																	"<last_updated>"+get_my_time()+"</last_updated>" +
																	"</bill_items>";	
																	
															bill_items_xml_array.push(data_xml);
															
															bill_amount+=bill_item_amount;
															bill_freight+=bill_item_freight;
															bill_total+=bill_item_total;
															bill_tax+=bill_item_tax;
															bill_channel_charges+=bill_item_channel_charges;
															bill_channel_tax+=bill_item_channel_tax;
															bill_channel_payable+=bill_item_channel_payable;
															
															pending_items_count-=1;
														});
														
													},storage_xml);	
												});
												
												var order_item_xml="<sale_order_items>" +
														"<id>"+order_item.id+"</id>" +
														"<item_name>"+order_item.item_name+"</item_name>" +
														"<item_desc>"+order_item.item_desc+"</item_desc>" +
														"<last_updated>"+get_my_time()+"</last_updated>" +
														"</sale_order_items>";
												order_items_xml_array.push(order_item_xml);
											}
											else 
											{
												pending_items_count-=1;
											}																				
										});
									});
								}
								else 
								{
									pending_items_count-=1;
								}
							});
						});
						
					});
				});
			
				/////saving bill details
				var bill_items_complete=setInterval(function()
				{
			  	   if(pending_items_count===0)
			  	   {
			  		   	clearInterval(bill_items_complete);
			  		   	
		  		   		var num_data="<user_preferences>"+
									"<id></id>"+						
									"<value></value>"+										
									"<name exact='yes'>"+bill_type+"_bill_num</name>"+												
									"</user_preferences>";
						fetch_requested_data('',num_data,function (bill_num_ids)
						{
							if(bill_num_ids.length>0)
							{
								//////////////////////////////////////////////
								var sale_order_xml="<sale_orders>"+
											"<id>"+order_id+"</id>" +
											"<bill_id></bill_id>" +
											"<total_quantity></total_quantity>"+
											"</sale_orders>";
								fetch_requested_data('',sale_order_xml,function (sorders) 
								{
									if(sorders.length>0)
									{
										var id_object_array=[];
										if(sorders[0].bill_id!="" && sorders[0].bill_id!=0 && sorders[0].bill_id!="null")
										{
											id_object_array=JSON.parse(sorders[0].bill_id);
										}
										
										var id_object=new Object();
										id_object.bill_num=bill_num_ids[0].value;
										id_object.bill_id=bill_key;
																				
										id_object.quantity=0;
										for(var j in order_items)
										{
											id_object.quantity+=parseFloat(order_items[j].quantity);											
										}
										id_object_array.push(id_object);
						
										var master_total_quantity=0;				
										for(var k in id_object_array)
										{
											master_total_quantity+=parseFloat(id_object_array[k].quantity);
										}
										
										var status='partially billed';				
										if(master_total_quantity==parseFloat(sorders[0].total_quantity))
										{
											status='billed';
										}

										var new_bill_id=JSON.stringify(id_object_array);
										//console.log(new_bill_id);
										var so_xml="<sale_orders>" +
												"<id>"+order_id+"</id>" +
												"<bill_id>"+new_bill_id+"</bill_id>" +
												"<status>"+status+"</status>" +
												"<last_updated>"+get_my_time()+"</last_updated>" +
												"</sale_orders>";
										update_simple_func(so_xml,function () 
										{
											form108_ini();
										});					
									}
								});	
								/////////////////////////////////////////////		  						
		  						var bill_key_string=""+bill_key;	
								var pick_bag_num=bill_key_string.slice(-3);

		  						var num_xml="<user_preferences>"+
										"<id>"+bill_num_ids[0].id+"</id>"+
										"<value>"+(parseInt(bill_num_ids[0].value)+1)+"</value>"+
										"<last_updated>"+get_my_time()+"</last_updated>"+
										"</user_preferences>";
								var bill_xml="<bills>" +
										"<id>"+bill_key+"</id>" +
										"<bill_num>"+bill_num_ids[0].value+"</bill_num>"+										
										"<order_num>"+order_num+"</order_num>"+										
										"<order_id>"+order_id+"</order_id>"+										
										"<customer_name>"+customer+"</customer_name>" +
										"<bill_date>"+get_my_time()+"</bill_date>" +
										"<billing_type>"+bill_type+"</billing_type>" +
										"<amount>"+bill_amount+"</amount>" +
										"<freight>"+bill_freight+"</freight>"+									
										"<total>"+bill_total+"</total>" +
										"<discount>0</discount>" +
										"<channel>"+sale_channel+"</channel>"+									
										"<channel_charges>"+bill_channel_charges+"</channel_charges>"+
										"<channel_tax>"+bill_channel_tax+"</channel_tax>"+
										"<channel_payable>"+bill_channel_payable+"</channel_payable>"+
										"<tax>"+bill_tax+"</tax>" +
										"<transaction_id>"+order_id+"</transaction_id>" +
										"<pick_bag_num>"+pick_bag_num+"</pick_bag_num>"+
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</bills>";			
								var activity_xml="<activity>" +
										"<data_id>"+bill_key+"</data_id>" +
										"<tablename>bills</tablename>" +
										"<link_to>form42</link_to>" +
										"<title>Saved</title>" +
										"<notes>Billed order# "+order_num+"</notes>" +
										"<updated_by>"+get_name()+"</updated_by>" +
										"</activity>";
								var transaction_xml="<transactions>" +
										"<id>"+bill_key+"</id>" +
										"<trans_date>"+get_my_time()+"</trans_date>" +
										"<amount>"+bill_total+"</amount>" +
										"<receiver>"+customer+"</receiver>" +
										"<giver>master</giver>" +
										"<tax>"+bill_tax+"</tax>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</transactions>";
								var pt_tran_id=get_new_key();
								var payment_xml="<payments>" +
										"<id>"+pt_tran_id+"</id>" +
										"<status>pending</status>" +
										"<type>received</type>" +
										"<date>"+get_my_time()+"</date>" +
										"<total_amount>"+bill_total+"</total_amount>" +
										"<paid_amount>0</paid_amount>" +
										"<acc_name>"+customer+"</acc_name>" +
										"<due_date>"+get_credit_period()+"</due_date>" +
										"<mode>"+get_payment_mode()+"</mode>" +
										"<transaction_id>"+pt_tran_id+"</transaction_id>" +
										"<bill_id>"+order_id+"</bill_id>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</payments>";
								var pt_xml="<transactions>" +
										"<id>"+pt_tran_id+"</id>" +
										"<trans_date>"+get_my_time()+"</trans_date>" +
										"<amount>"+bill_total+"</amount>" +
										"<receiver>master</receiver>" +
										"<giver>"+customer+"</giver>" +
										"<tax>0</tax>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</transactions>";
								
								create_simple(transaction_xml);
								create_simple(pt_xml);
								create_simple(payment_xml);
								update_simple(num_xml);
								create_row(bill_xml,activity_xml);
								
								//console.log(bill_items_xml_array);
								//console.log(bill_xml);
		
								bill_items_xml_array.forEach(function (bill_item_xml) 
								{
									create_simple(bill_item_xml);
								});
								
								inventory_adjust_array.forEach(function (adjust_item_xml) 
								{
									create_simple(adjust_item_xml);
								});
								
								order_items_xml_array.forEach(function (order_item_xml) 
								{
									update_simple(order_item_xml);
								});
							}
						});
						hide_loader();
					}
			    },200);		
			}
			else
			{
				hide_loader();
				$("#modal63").dialog("open");
			}
		}
		else
		{
			hide_loader();
			$("#modal64").dialog("open");			
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}
*/

/**
 * formNo 109
 * form Asset Attributes
 * @param button
 */
function form109_create_item(form)
{
	if(is_create_access('form109'))
	{
		var asset=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attributes>" +
					"<id>"+data_id+"</id>" +
					"<name>"+asset+"</name>" +
					"<type>asset</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form109</link_to>" +
					"<title>Added</title>" +
					"<notes>Attribute "+attribute+" for asset "+asset+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form109_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form109_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create Reports
 * @param button
 */
function form111_create_item(form)
{
	if(is_create_access('form111'))
	{
		var report_id=document.getElementById('form111_master').elements[3].value;
		var table1=form.elements[0].value;
		var field1=form.elements[1].value;
		var condition=form.elements[2].value;
		var table2=form.elements[3].value;
		var field2=form.elements[4].value;
		var value=form.elements[5].value;
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var data_xml="<report_items>" +
					"<id>"+data_id+"</id>" +
					"<table1>"+table1+"</table1>" +
					"<field1>"+field1+"</field1>" +
					"<condition1>"+condition+"</condition1>" +
					"<table2>"+table2+"</table2>" +
					"<field2>"+field2+"</field2>" +
					"<value>"+value+"</value>" +
					"<report_id>"+report_id+"</report_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</report_items>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}	
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[8];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form111_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create Reports
 */
function form111_create_form()
{
	if(is_create_access('form111'))
	{
		var form=document.getElementById("form111_master");

		var name=form.elements[1].value;
		var description=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<reports>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"</name>" +
					"<description>"+description+"</description>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</reports>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>reports</tablename>" +
					"<link_to>form111</link_to>" +
					"<title>Created</title>" +
					"<notes>Report "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form111_update_form();
		});
		
		$("[id^='save_form111_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}


/**
 * @form Add unbilled sale items
 * @param button
 */
function form112_create_item(form)
{
	if(is_create_access('form112'))
	{
		var customer=document.getElementById('form112_master').elements[1].value;
		var sale_date=get_raw_time(document.getElementById('form112_master').elements[2].value);
		var item_name=form.elements[1].value;
		var item_desc=form.elements[2].value;
		var batch=form.elements[3].value;
		var quantity=form.elements[4].value;
		var unit_price=form.elements[5].value;
		var mrp=form.elements[6].value;
		var amount=form.elements[7].value;
		var tax=form.elements[8].value;
		var total=parseFloat(amount)+parseFloat(tax);
		var storage=form.elements[9].value;
		var data_id=form.elements[10].value;
		var save_button=form.elements[11];
		var del_button=form.elements[12];
		
		var last_updated=get_my_time();
		var data_xml="<unbilled_sale_items>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<item_name>"+item_name+"</item_name>" +
					"<item_desc>"+item_desc+"</item_desc>"+
					"<batch>"+batch+"</batch>" +
					"<quantity>"+quantity+"</quantity>" +
					"<unit_price>"+unit_price+"</unit_price>"+
					"<amount>"+amount+"</amount>"+
					"<mrp>"+mrp+"</mrp>"+
					"<tax>"+tax+"</tax>"+
					"<total>"+total+"</total>"+
					"<storage>"+storage+"</storage>"+
					"<bill_status>pending</bill_status>"+
					"<picked_status>pending</picked_status>"+
					"<sale_date>"+sale_date+"</sale_date>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</unbilled_sale_items>";
		create_simple(data_xml);
		for(var i=0;i<10;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form112_delete_item(del_button);
		});	
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Add unbilled sale items
 * @param button
 */
function form112_create_form()
{
	if(is_create_access('form112'))
	{
		$("[id^='save_form112_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}


/**
 * @form Add unbilled purchase items
 * @param button
 */
function form114_create_item(form)
{
	if(is_create_access('form114'))
	{
		var supplier=document.getElementById('form114_master').elements[1].value;
		var purchase_date=get_raw_time(document.getElementById('form114_master').elements[2].value);
		var item_name=form.elements[1].value;
		var item_desc=form.elements[2].value;
		var batch=form.elements[3].value;
		var quantity=form.elements[4].value;
		var unit_price=form.elements[5].value;
		var amount=form.elements[6].value;
		var tax=form.elements[7].value;
		var total=parseFloat(amount)+parseFloat(tax);
		var storage=form.elements[8].value;
		var data_id=form.elements[9].value;
		var save_button=form.elements[10];
		var del_button=form.elements[11];
		
		var last_updated=get_my_time();
		var data_xml="<unbilled_purchase_items>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<item_name>"+item_name+"</item_name>" +
					"<item_desc>"+item_desc+"</item_desc>"+
					"<batch>"+batch+"</batch>" +
					"<quantity>"+quantity+"</quantity>" +
					"<purchase_date>"+purchase_date+"</purchase_date>" +
					"<unit_price>"+unit_price+"</unit_price>"+
					"<amount>"+amount+"</amount>"+
					"<tax>"+tax+"</tax>"+
					"<total>"+total+"</total>"+
					"<storage>"+storage+"</storage>"+
					"<bill_status>pending</bill_status>"+
					"<put_away_status>pending</put_away_status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</unbilled_purchase_items>";
		create_simple(data_xml);
		for(var i=0;i<9;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form114_delete_item(del_button);
		});
		
		///////////adding store placement////////
		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+storage+"</name>" +
				"<item_name exact='yes'>"+item_name+"</item_name>" +
				"<batch exact='yes'>"+batch+"</batch>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0)
			{
				var storage_xml="<area_utilization>" +
						"<id>"+get_new_key()+"</id>" +
						"<name>"+storage+"</name>" +
						"<item_name>"+item_name+"</item_name>" +
						"<batch>"+batch+"</batch>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				create_simple(storage_xml);
			}
		});		
		
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Add unbilled purchase items
 * @param button
 */
function form114_create_form()
{
	if(is_create_access('form114'))
	{
		$("[id^='save_form114_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}

/**
 * @form Create Bill(loyalty)
 * @formNo 118
 * @param button
 */
function form118_create_item(form)
{
	if(is_create_access('form118'))
	{
		var bill_id=document.getElementById("form118_master").elements[4].value;
		
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var quantity=form.elements[2].value;
		var price=form.elements[3].value;
		var total=form.elements[4].value;
		var amount=form.elements[5].value;
		var discount=form.elements[6].value;
		var tax=form.elements[7].value;
		var offer=form.elements[8].value;
		var data_id=form.elements[9].value;
		var free_product_name=form.elements[12].value;
		var free_product_quantity=form.elements[13].value;
		
		var last_updated=get_my_time();
		
		var data_xml="<bill_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<batch>"+batch+"</batch>" +
				"<unit_price>"+price+"</unit_price>" +
				"<quantity>"+quantity+"</quantity>" +
				"<amount>"+amount+"</amount>" +
				"<total>"+total+"</total>" +
				"<discount>"+discount+"</discount>" +
				"<offer>"+offer+"</offer>" +
				"<type>bought</type>" +
				"<tax>"+tax+"</tax>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<free_with></free_with>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}

		//////adding free product to the bill if applicable
		if(free_product_name!="" && free_product_name!=null)
		{
			get_inventory(free_product_name,'',function(free_quantities)
			{
				if(free_quantities>=free_product_quantity)
				{
					var free_batch_data="<bill_items count='1'>" +
							"<batch></batch>" +
							"<item_name exact='yes'>"+free_product_name+"</item_name>" +
							"</bill_items>";
					get_single_column_data(function(data)
					{
						var free_batch="";
						if(data.length>0)
						{
							free_batch=data[0];	
						}
						
						var id=get_new_key();
						rowsHTML="<tr>";
							rowsHTML+="<form id='form118_"+id+"'></form>";
			                	rowsHTML+="<td data-th='Item'>";
			                    	rowsHTML+="<input type='text' readonly='readonly' form='form118_"+id+"' value='"+free_product_name+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td data-th='Batch'>";
		                                rowsHTML+="<input type='text' required form='form118_"+id+"' value='"+free_batch+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td data-th='Quantity'>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form118_"+id+"' value='"+free_product_quantity+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td data-th='Unit Price'>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form118_"+id+"' value='0'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td data-th='Total'>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form118_"+id+"' value='0'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td data-th='Action'>";
		                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='0'>";
		                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='0'>";
		                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='0'>";
		                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='free with "+name+"'>";
		                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='"+id+"'>";
		                                rowsHTML+="<input type='button' class='save_icon' form='form118_"+id+"' id='save_form118_"+id+"' >";
		                                rowsHTML+="<input type='button' class='delete_icon' form='form118_"+id+"' id='delete_form118_"+id+"' onclick='form118_delete_item($(this));'>";
		                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value=''>";
		                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value=''>";
		                        rowsHTML+="</td>";
		                rowsHTML+="</tr>";
	
		                $('#form118_body').prepend(rowsHTML);
	
						var free_xml="<bill_items>" +
									"<id>"+id+"</id>" +
									"<item_name>"+free_product_name+"</item_name>" +
									"<batch>"+free_batch+"</batch>" +
									"<unit_price>0</unit_price>" +
									"<quantity>"+free_product_quantity+"</quantity>" +
									"<amount>0</amount>" +
									"<total>0</total>" +
									"<discount>0</discount>" +
									"<offer></offer>" +
									"<type>free</type>" +
									"<tax>0</tax>" +
									"<bill_id>"+bill_id+"</bill_id>" +
									"<free_with>"+name+"</free_with>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</bill_items>";	
						create_simple(free_xml);
						
					},free_batch_data);
				}
				else
				{
					$("#modal7").dialog("open");
				}
			});
		}
		
		for(var i=0;i<10;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[11];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form118_delete_item(del_button);
		});
		var save_button=form.elements[10];
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create bill(loyalty)
 * @formNo 118
 * @param button
 */
function form118_create_form()
{
	if(is_create_access('form118'))
	{
		var form=document.getElementById("form118_master");
		
		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		var bill_num=form.elements[3].value;
		
		var message_string="Bill from: "+get_session_var('title')+"\nAddress: "+get_session_var('address');
		
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form118']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
			
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Quantity: "+subform.elements[2].value;
			message_string+=" Total: "+subform.elements[4].value;
		});

		var data_id=form.elements[4].value;
		var transaction_id=form.elements[6].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		var offer_data="<offers>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount upperbound='yes'>"+(amount-discount)+"</criteria_amount>" +
				"<offer_type exact='yes'>bill</offer_type>" +
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
				else 
				{	return -1;}
			});
			
			for(var i in offers)
			{
				if(offers[i].result_type=='discount')
				{
					if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
					{
						var dis=parseFloat(((amount-discount)*parseInt(offers[i].discount_percent))/100);
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
					else 
					{
						var dis=parseFloat(offers[i].discount_amount)*(Math.floor((amount-discount)/parseFloat(offers[i].criteria_amount)));
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
				}
				else if(offers[i].result_type=='product free')
				{
					var free_product_name=offers[i].free_product_name;
					var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount-discount)/parseFloat(offers[i].criteria_amount)));
					
					get_inventory(free_product_name,'',function(free_quantities)
					{
						if(free_quantities>=free_product_quantity)
						{
							var free_batch_data="<bill_items count='1'>" +
									"<batch></batch>" +
									"<item_name exact='yes'>"+free_product_name+"</item_name>" +
									"</bill_items>";
							get_single_column_data(function(data)
							{
								var free_batch="";
								if(data.length>0)
								{
									free_batch=data[0];	
								}

								var id=get_new_key();
								rowsHTML="<tr>";
									rowsHTML+="<form id='form118_"+id+"'></form>";
					                	rowsHTML+="<td data-th='Item'>";
					                    	rowsHTML+="<input type='text' readonly='readonly' form='form118_"+id+"' value='"+free_product_name+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Batch'>";
				                                rowsHTML+="<input type='text' required form='form118_"+id+"' value='"+free_batch+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Quantity'>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form118_"+id+"' value='"+free_product_quantity+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Unit Price'>";
				                        	rowsHTML+="<input type='number' readonly='readonly' required form='form118_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Total'>";
				                        	rowsHTML+="<input type='number' readonly='readonly' required form='form118_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Action'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='free on the bill amount'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='"+id+"'>";
				                                rowsHTML+="<input type='button' class='save_icon' form='form118_"+id+"' id='save_form118_"+id+"' >";
				                                rowsHTML+="<input type='button' class='delete_icon' form='form118_"+id+"' id='delete_form118_"+id+"' onclick='form118_delete_item($(this));'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value=''>";
				                        rowsHTML+="</td>";
				                rowsHTML+="</tr>";

				                $('#form118_body').prepend(rowsHTML);

				                var free_xml="<bill_items>" +
											"<id>"+id+"</id>" +
											"<item_name>"+free_product_name+"</item_name>" +
											"<batch>"+free_batch+"</batch>" +
											"<unit_price>0</unit_price>" +
											"<quantity>"+free_product_quantity+"</quantity>" +
											"<amount>0</amount>" +
											"<total>0</total>" +
											"<discount>0</discount>" +
											"<offer></offer>" +
											"<type>free</type>" +
											"<tax>0</tax>" +
											"<bill_id>"+data_id+"</bill_id>" +
											"<free_with>bill</free_with>" +
											"<last_updated>"+last_updated+"</last_updated>" +
											"</bill_items>";	
								
								if(is_online())
								{
									server_create_simple(free_xml);
								}
								else
								{
									local_create_simple(free_xml);
								}
							},free_batch_data);
						}
						else
						{
							$("#modal7").dialog("open");
						}
					});
				}
				offer_detail=offers[i].offer_detail;
				break;
			}
			
			var data_xml="<bills>" +
						"<id>"+data_id+"</id>" +
						"<bill_num>"+bill_num+"</bill_num>"+
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>product</type>" +
						"<offer>"+offer_detail+"</offer>" +
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
						"<bill_id>"+data_id+"</bill_id>" +
						"<source_info>for sale bill #"+bill_num+"</source_info>"+
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
					if(is_online())
					{
						server_update_simple(num_xml);
					}
					else 
					{
						local_update_simple(num_xml);
					}
				}
			},num_data);

			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
				server_create_simple(transaction_xml);
				server_create_simple(pt_xml);
				server_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id);
				});
			}
			else
			{
				local_create_row(data_xml,activity_xml);
				local_create_simple(transaction_xml);
				local_create_simple(pt_xml);
				local_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id);
				});
			}
			
			var loyalty_program_data="<loyalty_programs>"+
									"<name></name>"+
									"<points_addition></points_addition>"+
									"<status exact='yes'>active</status>"+
									"</loyalty_programs>";
			fetch_requested_data('',loyalty_program_data,function(programs)
			{
				array_unique(programs);
				programs.forEach(function(program)
				{
					var points=parseFloat(program.points_addition)*parseFloat(total);
					var loyalty_points_xml="<loyalty_points>"+
						"<id>"+get_new_key()+"</id>"+
						"<program_name>"+program.name+"</program_name>"+
						"<customer>"+customer+"</customer>"+
						"<points_addition>"+program.points_addition+"</points_addition>"+
						"<points>"+points+"</points>"+
						"<date>"+get_my_date()+"</date>"+
						"<source>sale</source>"+
						"<source_id>"+data_id+"</source_id>"+
						"<last_updated>"+last_updated+"</last_updated>"+
						"</loyalty_points>";
					if(is_online())
					{
						server_create_simple(loyalty_points_xml);
					}
					else
					{
						local_create_simple(loyalty_points_xml);
					}	
				});
			});
			
			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
						"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+discount+"</br>" +
						"Rs. "+tax+"</br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
			$('#form118_foot').html(total_row);

			message_string+="\nAmount: "+amount;
			message_string+="\ndiscount: "+discount;
			message_string+="\nTax: "+tax;
			message_string+="\nTotal: "+total;
			
			var subject="Bill from "+get_session_var('title');
			$('#form118_share').show();
			$('#form118_share').off('click');
			$('#form118_share').click(function()
			{
				modal44_action(customer,subject,message_string);
			});
		});
		
		var save_button=form.elements[10];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form118_update_form();
		});
		
		$("[id^='save_form118_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create Bill(multiple registers, unbilled items)
 * @formNo 119
 * @param button
 */
function form119_create_item(form)
{
	if(is_create_access('form119'))
	{
		var bill_id=document.getElementById("form119_master").elements[6].value;
		var customer=document.getElementById("form119_master").elements[1].value;
		
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var squantity=form.elements[2].value;
		var fquantity=form.elements[3].value;
		var quantity=parseFloat(squantity)+parseFloat(fquantity);
		var price=form.elements[4].value;
		var mrp=form.elements[5].value;
		var amount=form.elements[6].value;
		var discount=form.elements[7].value;
		var tax=form.elements[8].value;
		var total=form.elements[9].value;
		var offer=form.elements[10].value;
		var data_id=form.elements[11].value;
		var free_product_name=form.elements[14].value;
		var free_product_quantity=form.elements[15].value;
		var unbilled_item=form.elements[16].value;
		
		var last_updated=get_my_time();
		
		var data_xml="<bill_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<batch>"+batch+"</batch>" +
				"<quantity>"+quantity+"</quantity>" +
				"<p_quantity>"+squantity+"</p_quantity>" +
				"<f_quantity>"+fquantity+"</f_quantity>" +
				"<unit_price>"+price+"</unit_price>" +
				"<mrp>"+mrp+"</mrp>" +
				"<amount>"+amount+"</amount>" +
				"<total>"+total+"</total>" +
				"<discount>"+discount+"</discount>" +
				"<offer>"+offer+"</offer>" +
				"<type>bought</type>" +
				"<tax>"+tax+"</tax>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<free_with></free_with>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";
		var unbilled_xml="<unbilled_sale_items>" +
				"<item_name>"+name+"</item_name>" +
				"<batch>"+batch+"</batch>" +
				"<customer>"+customer+"</customer>" +
				"</unbilled_sale_items>";
		if(is_online())
		{
			server_create_simple(data_xml);
			if(unbilled_item=='yes')
				server_delete_simple(unbilled_xml);
		}
		else
		{
			local_create_simple(data_xml);
			if(unbilled_item=='yes')
				local_delete_simple(unbilled_xml);
		}

		//////adding free product to the bill if applicable
		if(free_product_name!="" && free_product_name!=null)
		{
			get_inventory(free_product_name,'',function(free_quantities)
			{
				if(free_quantities>=free_product_quantity)
				{
					var free_batch_data="<bill_items count='1'>" +
							"<batch></batch>" +
							"<item_name exact='yes'>"+free_product_name+"</item_name>" +
							"</bill_items>";
					get_single_column_data(function(data)
					{
						var free_batch="";
						if(data.length>0)
						{
							free_batch=data[0];	
						}
						
						var id=get_new_key();
						
						var rowsHTML="<tr>";
						rowsHTML+="<form id='form119_"+id+"'></form>";
							rowsHTML+="<td data-th='Product Name'>";
								rowsHTML+="<label id='form119_product_make_"+id+"'></label>";
								rowsHTML+="<br><v2></v2><textarea required form='form119_"+id+"' readonly='readonly'>"+free_product_name+"</textarea>";
								rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' onclick='modal14_action();'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Batch'>";
								rowsHTML+="<input type='text' required form='form119_"+id+"' value='"+free_batch+"'>";
								rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' onclick='modal22_action();'>";
								rowsHTML+="<br><v2>Expiry: </v2><label id='form119_exp_"+id+"'></label>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Quantity'>";
								rowsHTML+="<v1>Bought: </v1><input type='number' min='0' required readonly='readonly' form='form119_"+id+"' step='any' value='0'>";
								rowsHTML+="<br><v2>Free: </v2><input type='number' min='0' value='0' required readonly='readonly' form='form119_"+id+"' step='any' value='"+free_product_quantity+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Price'>";
								rowsHTML+="<v1>Sale: </v1>Rs. <input type='number' required min='0' readonly='readonly' form='form119_"+id+"' step='any'>";
								rowsHTML+="<br><v2>MRP: </v2>Rs. <input type='number' min='0' readonly='readonly' form='form119_"+id+"' step='any'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Total'>";
								rowsHTML+="<v1>Amount: </v1>Rs. <input type='number' required min='0' form='form119_"+id+"' readonly='readonly' step='any' value='0'>";
								rowsHTML+="<input type='hidden' value='0' form='form119_"+id+"' readonly='readonly'>";
								rowsHTML+="<br><v2>Tax: </v2>Rs. <input type='number' required min='0' value='0' form='form119_"+id+"' readonly='readonly' step='any' value='0'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form119_"+id+"' value='0'>";
								rowsHTML+="<input type='hidden' form='form119_"+id+"' value='free with "+name+"'>";
								rowsHTML+="<input type='hidden' form='form119_"+id+"' value='"+id+"'>";
								rowsHTML+="<input type='button' class='submit_hidden' form='form119_"+id+"' id='save_form119_"+id+"' >";
								rowsHTML+="<input type='button' class='delete_icon' form='form119_"+id+"' id='delete_form119_"+id+"' onclick='form119_delete_item($(this));'>";
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
						     
		            $('#form119_body').prepend(rowsHTML);
	
		            var make_data="<product_master>" +
								"<make></make>" +
								"<name exact='yes'>"+free_product_name+"</name>" +
								"</product_master>";
						get_single_column_data(function(data)
						{
							if(data.length>0)
							{
								document.getElementById('form119_product_make_'+id).innerHTML=data[0]+":";
							}
						},make_data);
						
						var exp_data="<product_instances>" +
								"<expiry></expiry>" +
								"<product_name exact='yes'>"+free_product_name+"</product_name>" +
								"<batch exact='yes'>"+free_batch+"</batch>" +
								"</product_instances>";
						get_single_column_data(function(data)
						{
							if(data.length>0)
							{
								document.getElementById('form119_exp_'+id).innerHTML=get_my_past_date(data[0]);
							}
						},exp_data);
		                
						var free_xml="<bill_items>" +
									"<id>"+id+"</id>" +
									"<item_name>"+free_product_name+"</item_name>" +
									"<batch>"+free_batch+"</batch>" +
									"<unit_price>0</unit_price>" +
									"<mrp>0</mrp>" +
									"<p_quantity>0</p_quantity>" +
									"<f_quantity>"+free_product_quantity+"</f_quantity>" +
									"<quantity>"+free_product_quantity+"</quantity>" +
									"<amount>0</amount>" +
									"<total>0</total>" +
									"<discount>0</discount>" +
									"<offer></offer>" +
									"<type>free</type>" +
									"<tax>0</tax>" +
									"<bill_id>"+bill_id+"</bill_id>" +
									"<free_with>"+name+"</free_with>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</bill_items>";	
						if(is_online())
						{
							server_create_simple(free_xml);
						}
						else
						{
							local_create_simple(free_xml);
						}
					},free_batch_data);
				}
				else
				{
					$("#modal7").dialog("open");
				}
			});
		}
		
		for(var i=0;i<10;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		var save_button=form.elements[12];
		$(save_button).off('click');
		
		var del_button=form.elements[13];
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form119_delete_item(del_button);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create bill(multiple registers, unbilled items)
 * @formNo 119
 * @param button
 */
function form119_create_form()
{
	if(is_create_access('form119'))
	{
		var form=document.getElementById("form119_master");
		
		var customer=form.elements[1].value;
		var bill_type=form.elements[2].value;
		var bill_date=get_raw_time(form.elements[3].value);
		var bill_num=form.elements[4].value;
		
		var message_string="Bill from: "+get_session_var('title')+"\nAddress: "+get_session_var('address');
		
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form119']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			amount+=parseFloat(subform.elements[6].value);
			discount+=parseFloat(subform.elements[7].value);
			tax+=parseFloat(subform.elements[8].value);
			total+=parseFloat(subform.elements[9].value);
			
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Quantity: "+parseFloat(subform.elements[2].value)+parseFloat(subform.elements[3].value);
			message_string+=" Total: "+subform.elements[9].value;
		});
		
		var data_id=form.elements[6].value;
		var transaction_id=form.elements[8].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		var offer_data="<offers>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount upperbound='yes'>"+(amount-discount)+"</criteria_amount>" +
				"<offer_type exact='yes'>bill</offer_type>" +
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
				else 
				{	return -1;}
			});
			
			for(var i in offers)
			{
				if(offers[i].result_type=='discount')
				{
					if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
					{
						var dis=parseFloat(((amount-discount)*parseInt(offers[i].discount_percent))/100);
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
					else 
					{
						var dis=parseFloat(offers[i].discount_amount)*(Math.floor((amount-discount)/parseFloat(offers[i].criteria_amount)));
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
				}
				else if(offers[i].result_type=='product free')
				{
					var free_product_name=offers[i].free_product_name;
					var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount-discount)/parseFloat(offers[i].criteria_amount)));
					
					get_inventory(free_product_name,'',function(free_quantities)
					{
						if(free_quantities>=free_product_quantity)
						{
							var free_batch_data="<bill_items count='1'>" +
									"<batch></batch>" +
									"<item_name>"+free_product_name+"</item_name>" +
									"</bill_items>";
							get_single_column_data(function(data)
							{
								var free_batch="";
								if(data.length>0)
								{
									free_batch=data[0];	
								}

								var id=get_new_key();
								
								var rowsHTML="<tr>";
								rowsHTML+="<form id='form119_"+id+"'></form>";
									rowsHTML+="<td data-th='Product Name'>";
										rowsHTML+="<label id='form119_product_make_"+id+"'></label>";
										rowsHTML+="<br><v2></v2><textarea required form='form119_"+id+"' readonly='readonly'>"+free_product_name+"</textarea>";
										rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' onclick='modal14_action();'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Batch'>";
										rowsHTML+="<input type='text' required form='form119_"+id+"' value='"+free_batch+"'>";
										rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' onclick='modal22_action();'>";
										rowsHTML+="<br><v2>Expiry: </v2><label id='form119_exp_"+id+"'></label>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Quantity'>";
										rowsHTML+="<v1>Bought: </v1><input type='number' min='0' required readonly='readonly' form='form119_"+id+"' step='any' value='0'>";
										rowsHTML+="<br><v2>Free: </v2><input type='number' min='0' value='0' required readonly='readonly' form='form119_"+id+"' step='any' value='"+free_product_quantity+"'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Price'>";
										rowsHTML+="<v1>Sale: </v1>Rs. <input type='number' required min='0' readonly='readonly' form='form119_"+id+"' step='any'>";
										rowsHTML+="<br><v2>MRP: </v2>Rs. <input type='number' min='0' readonly='readonly' form='form119_"+id+"' step='any'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Total'>";
										rowsHTML+="<v1>Amount: </v1>Rs. <input type='number' required min='0' form='form119_"+id+"' readonly='readonly' step='any' value='0'>";
										rowsHTML+="<input type='hidden' value='0' form='form119_"+id+"' readonly='readonly'>";
										rowsHTML+="<br><v2>Tax: </v2>Rs. <input type='number' required min='0' value='0' form='form119_"+id+"' readonly='readonly' step='any' value='0'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Action'>";
										rowsHTML+="<input type='hidden' form='form119_"+id+"' value='0'>";
										rowsHTML+="<input type='hidden' form='form119_"+id+"' value='free with "+name+"'>";
										rowsHTML+="<input type='hidden' form='form119_"+id+"' value='"+id+"'>";
										rowsHTML+="<input type='button' class='submit_hidden' form='form119_"+id+"' id='save_form119_"+id+"' >";
										rowsHTML+="<input type='button' class='delete_icon' form='form119_"+id+"' id='delete_form119_"+id+"' onclick='form119_delete_item($(this));'>";
									rowsHTML+="</td>";			
								rowsHTML+="</tr>";
								     
				                $('#form119_body').prepend(rowsHTML);
			
				                var make_data="<product_master>" +
										"<make></make>" +
										"<name exact='yes'>"+free_product_name+"</name>" +
										"</product_master>";
								get_single_column_data(function(data)
								{
									if(data.length>0)
									{
										document.getElementById('form119_product_make_'+id).innerHTML=data[0]+":";
									}
								},make_data);
								
								var exp_data="<product_instances>" +
										"<expiry></expiry>" +
										"<product_name exact='yes'>"+free_product_name+"</product_name>" +
										"<batch exact='yes'>"+free_batch+"</batch>" +
										"</product_instances>";
								get_single_column_data(function(data)
								{
									if(data.length>0)
									{
										document.getElementById('form119_exp_'+id).innerHTML=get_my_past_date(data[0]);
									}
								},exp_data);
				                
								var free_xml="<bill_items>" +
											"<id>"+id+"</id>" +
											"<item_name>"+free_product_name+"</item_name>" +
											"<batch>"+free_batch+"</batch>" +
											"<unit_price>0</unit_price>" +
											"<mrp>0</mrp>" +
											"<p_quantity>0</p_quantity>" +
											"<f_quantity>"+free_product_quantity+"</f_quantity>" +
											"<quantity>"+free_product_quantity+"</quantity>" +
											"<amount>0</amount>" +
											"<total>0</total>" +
											"<discount>0</discount>" +
											"<offer></offer>" +
											"<type>free</type>" +
											"<tax>0</tax>" +
											"<bill_id>"+data_id+"</bill_id>" +
											"<free_with>bill</free_with>" +
											"<last_updated>"+last_updated+"</last_updated>" +
											"</bill_items>";	
								if(is_online())
								{
									server_create_simple(free_xml);
								}
								else
								{
									local_create_simple(free_xml);
								}
							},free_batch_data);
						}
						else
						{
							$("#modal7").dialog("open");
						}
					});
				}
				offer_detail=offers[i].offer_detail;
				break;
			}
			
			var data_xml="<bills>" +
						"<id>"+data_id+"</id>" +
						"<bill_num>"+bill_num+"</bill_num>"+
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>product</type>" +
						"<billing_type>"+bill_type+"</billing_type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form92</link_to>" +
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
			var num_data="<user_preferences>"+
						"<id></id>"+						
						"<name exact='yes'>"+bill_type+"_bill_num</name>"+												
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
					if(is_online())
					{
						server_update_simple(num_xml);
					}
					else 
					{
						local_update_simple(num_xml);
					}
				}
			},num_data);
			
			var pt_tran_id=get_new_key();
			var p_status="closed";
			var p_amount=total;
			if((get_payment_mode())=='credit')
			{
				p_status='pending';
				p_amount=0;
			}
			var payment_xml="<payments>" +
						"<id>"+pt_tran_id+"</id>" +
						"<status>"+p_status+"</status>" +
						"<type>received</type>" +
						"<date>"+get_my_time()+"</date>" +
						"<total_amount>"+total+"</total_amount>" +
						"<paid_amount>"+p_amount+"</paid_amount>" +
						"<acc_name>"+customer+"</acc_name>" +
						"<due_date>"+get_credit_period()+"</due_date>" +
						"<mode>"+get_payment_mode()+"</mode>" +
						"<transaction_id>"+pt_tran_id+"</transaction_id>" +
						"<bill_id>"+data_id+"</bill_id>" +
						"<source_info>for sale bill #"+bill_num+"</source_info>"+
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
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
				server_create_simple(transaction_xml);
				server_create_simple(pt_xml);
				server_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id,function(mode,paid_amount)
					{
						document.getElementById('form119_payment_info').innerHTML="Payment: "+mode+"<br>Paid: Rs."+paid_amount;
					});
				});
			}
			else
			{
				local_create_row(data_xml,activity_xml);
				local_create_simple(transaction_xml);
				local_create_simple(pt_xml);
				local_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id,function(mode,paid_amount)
					{
						document.getElementById('form119_payment_info').innerHTML="Payment: "+mode+"<br>Paid: Rs."+paid_amount;
					});
				});
			}
			
			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
						"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+discount+"</br>" +
						"Rs. "+tax+"</br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
			$('#form119_foot').html(total_row);
			
			message_string+="\nAmount: "+amount;
			message_string+="\ndiscount: "+discount;
			message_string+="\nTax: "+tax;
			message_string+="\nTotal: "+total;
			
			var subject="Bill from "+get_session_var('title');
			$('#form119_share').show();
			$('#form119_share').off('click');
			$('#form119_share').click(function()
			{
				modal44_action(customer,subject,message_string);
			});

		});

		var save_button=form.elements[10];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form119_update_form();
		});
		
		$("[id^='save_form119_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 121
 * form Adjust Loyalty Points
 * @param button
 */
function form121_create_item(form)
{
	if(is_create_access('form121'))
	{
		var program=form.elements[0].value;
		var customer=form.elements[1].value;
		var points=form.elements[2].value;
		var date=form.elements[3].value;
		var source=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<loyalty_points>" +
					"<id>"+data_id+"</id>" +
					"<program_name>"+program+"</program_name>" +
					"<customer>"+customer+"</customer>" +
					"<points>"+points+"</points>" +
					"<date>"+get_raw_time(date)+"</date>" +
					"<source>"+source+"</source>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</loyalty_points>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>loyalty_points</tablename>" +
					"<link_to>form121</link_to>" +
					"<title>Added</title>" +
					"<notes>"+points+" Loyalty points to "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form121_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Enter Supplier Bill(unbilled items)
 * @formNo 122
 * @param button
 */
function form122_create_item(form)
{
	if(is_create_access('form122'))
	{
		var bill_id=document.getElementById('form122_master').elements['bill_id'].value;
		var supplier=document.getElementById('form122_master').elements['supplier'].value;
		var entry_date=get_raw_time(document.getElementById('form122_master').elements['entry_date'].value);
		
		var item_name=form.elements[1].value;
		var item_desc=form.elements[2].value;
		var batch=form.elements[3].value;
		var quantity=form.elements[4].value;
		var mrp=form.elements[5].value;
		var unit_price=form.elements[6].value;
		var amount=form.elements[7].value;
		var tax=form.elements[8].value;
		var po_price=form.elements[9].value;
		var po_amount=form.elements[10].value;
		var po_tax=form.elements[11].value;
		var total=parseFloat(amount)+parseFloat(tax);
		var qc=form.elements[12].value;
		var qc_comments=form.elements[13].value;
		var storage=form.elements[14].value;
		var data_id=form.elements[15].value;
		var save_button=form.elements[16];
		var del_button=form.elements[17];
				
		var is_unbilled=form.elements['unbilled'].value;
		
		var put_away_status='pending';
		if(is_unbilled=='yes' || qc=='rejected')
		{
			put_away_status='completed';
		}
		
		var last_updated=get_my_time();
		var data_xml="<supplier_bill_items>" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>"+					
					"<product_name>"+item_name+"</product_name>" +
					"<item_desc>"+item_desc+"</item_desc>"+
					"<batch>"+batch+"</batch>" +
					"<quantity>"+quantity+"</quantity>" +
					"<mrp>"+mrp+"</mrp>"+
					"<unit_price>"+unit_price+"</unit_price>"+
					"<amount>"+amount+"</amount>"+
					"<tax>"+tax+"</tax>"+
					"<po_price>"+po_price+"</po_price>"+
					"<po_amount>"+po_amount+"</po_amount>"+
					"<po_tax>"+po_tax+"</po_tax>"+
					"<total>"+total+"</total>"+
					"<storage>"+storage+"</storage>"+
					"<qc>"+qc+"</qc>"+
					"<qc_comments>"+qc_comments+"</qc_comments>"+
					"<put_away_status>"+put_away_status+"</put_away_status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_bill_items>";
				
		create_simple(data_xml);
		
		if(qc=='rejected')
		{
			var return_xml="<supplier_returns>" +
					"<id>"+bill_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<return_date>"+entry_date+"</return_date>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_returns>";
		
			var return_data_xml="<supplier_return_items>" +
						"<id>"+data_id+"</id>" +
						"<return_id>"+bill_id+"</return_id>"+					
						"<item_name>"+item_name+"</item_name>" +
						"<item_desc>"+item_desc+"</item_desc>"+
						"<batch>"+batch+"</batch>" +
						"<quantity>"+quantity+"</quantity>" +
						"<storage>"+storage+"</storage>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</supplier_return_items>";
			
			create_simple(return_data_xml);
			create_simple_no_warning(return_xml);
		}
		else 
		{
			var product_instances_xml="<product_instances>"+
								"<id></id>"+								
								"<product_name exact='yes'>"+item_name+"</product_name>"+
								"<batch exact='yes'>"+batch+"</batch>"+
								"</product_instances>";
			fetch_requested_data('',product_instances_xml,function(batches)
			{
				var product_instances_xml="<product_instances>"+
								"<id>"+batches[0].id+"</id>"+
								"<status>available</status>"+								
								"</product_instances>";
				update_simple(product_instances_xml);
			});
		}
				
		for(var i=0;i<15;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form122_delete_item(del_button);
		});
		
		////////////////update status of unbilled item///////////
		if(is_unbilled=='yes')
		{
			var unbilled_id=form.elements['unbilled_id'].value;
			var unbilled_xml="<unbilled_purchase_items>"+
							"<id>"+unbilled_id+"</id>"+
							"<bill_status>completed</bill_status>"+
							"</unbilled_purchase_items>";
			update_simple(unbilled_xml);				
		}		
		
		///////////adding store placement////////
		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+storage+"</name>" +
				"<item_name exact='yes'>"+item_name+"</item_name>" +
				"<batch exact='yes'>"+batch+"</batch>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0)
			{
				var storage_xml="<area_utilization>" +
						"<id>"+get_new_key()+"</id>" +
						"<name>"+storage+"</name>" +
						"<item_name>"+item_name+"</item_name>" +
						"<batch>"+batch+"</batch>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				create_simple(storage_xml);
			}
		});		
		
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form New supplier Bill
 * @param button
 */
function form122_create_form()
{
	if(is_create_access('form122'))
	{
		var form=document.getElementById("form122_master");
		
		var supplier=form.elements['supplier'].value;
		var bill_id=form.elements['bill_num'].value;
		var bill_date=get_raw_time(form.elements['bill_date'].value);
		var entry_date=get_raw_time(form.elements['entry_date'].value);
		var data_id=form.elements['bill_id'].value;
		var transaction_id=form.elements['t_id'].value;
		var last_updated=get_my_time();
		var save_button=form.elements['save'];
		var share_button=form.elements['share'];
		var order_id=form.elements['order_id'].value;
		var order_num=form.elements['po_num'].value;
		
		var cst='no';
		if(form.elements['cst'].checked)
		{
			cst='yes';
		}

		var bt=get_session_var('title');
		$(share_button).show();
		$(share_button).click(function()
		{
			modal101_action(bt+' - Purchase bill # '+bill_id,supplier,'supplier',function (func) 
			{
				print_form122(func);
			});
		});
		
		var total=0;
		var tax=0;
		var amount=0;
		var total_accepted=0;
		var total_quantity=0;
		
		$("[id^='save_form122']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			if(subform.elements[1].value=="")
			{
				$(this).parent().parent().remove();
			}			
			else
			{
				if(subform.elements[12].value=='accepted')
				{
					if(!isNaN(parseFloat(subform.elements[7].value)))
						amount+=parseFloat(subform.elements[7].value);
					if(!isNaN(parseFloat(subform.elements[8].value)))
						tax+=parseFloat(subform.elements[8].value);
					if(!isNaN(parseFloat(subform.elements[4].value)))
						total_accepted+=parseFloat(subform.elements[4].value);			
				}
				if(!isNaN(parseFloat(subform.elements[4].value)))
					total_quantity+=parseFloat(subform.elements[4].value);
			}		
		});
	
		amount=my_round(amount,2);
		tax=my_round(tax,2);
		total=amount+tax;
			
		var total_row="<tr><td colspan='3' data-th='Total'>Total Accepted Quantity: "+total_accepted+"<br>Total Rejected Quantity: "+(total_quantity-total_accepted)+"</td>" +
					"<td>Amount:</br>Tax: </br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. "+tax+"</br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		
		$('#form122_foot').html(total_row);


		var data_xml="<supplier_bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<order_id>"+order_id+"</order_id>" +
					"<order_num>"+order_num+"</order_num>" +
					"<supplier>"+supplier+"</supplier>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<entry_date>"+entry_date+"</entry_date>" +
					"<total>"+total+"</total>" +
					"<discount>0</discount>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<cst>"+cst+"</cst>"+
					"<notes>pending approval</notes>"+
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>supplier_bills</tablename>" +
					"<link_to>form53</link_to>" +
					"<title>Saved</title>" +
					"<notes>Supplier Bill # "+bill_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var po_data="<purchase_orders>"+
					"<id>"+order_id+"</id>" +
					"<bill_id></bill_id>" +
					"<total_quantity></total_quantity>"+
					"<quantity_received></quantity_received>"+
					"<quantity_accepted></quantity_accepted>"+
					"</purchase_orders>";
		fetch_requested_data('',po_data,function (porders) 
		{
			if(porders.length>0)
			{
				var id_object_array=[];
				if(porders[0].bill_id!="" && porders[0].bill_id!=0 && porders[0].bill_id!="null")
				{
					id_object_array=JSON.parse(porders[0].bill_id);
				}
				
				var id_object=new Object();
				id_object.bill_num=bill_id;
				id_object.bill_id=data_id;
				id_object.total_received=total_quantity;
				id_object.total_accepted=total_accepted;
				
				id_object_array.push(id_object);

				var quantity_accepted=0;
				var quantity_received=0;
				var quantity_qc_pending=0;
				
				for(var x in id_object_array)
				{
					quantity_received+=parseFloat(id_object_array[x].total_received);
					quantity_accepted+=parseFloat(id_object_array[x].total_accepted);
				}
				
				if(porders[0].quantity_received=="" || porders[0].quantity_received=='null')
				{
					porders[0].quantity_received=0;
				}
				
				if(parseFloat(porders[0].quantity_received)>quantity_received)
				{
					quantity_qc_pending=parseFloat(porders[0].quantity_received)-quantity_received;
					quantity_received=parseFloat(porders[0].quantity_received);
				}
				
				var status='partially received';				
				if(parseFloat(porders[0].total_quantity)<=quantity_accepted)
				{
					status='completely received';
				}
				
				var new_bill_id=JSON.stringify(id_object_array);
				console.log(new_bill_id);
				var po_xml="<purchase_orders>" +
						"<id>"+order_id+"</id>" +
						"<bill_id>"+new_bill_id+"</bill_id>" +
						"<quantity_received>"+quantity_received+"</quantity_received>"+
						"<quantity_accepted>"+quantity_accepted+"</quantity_accepted>"+
						"<quantity_qc_pending>"+quantity_qc_pending+"</quantity_qc_pending>"+
						"<status>"+status+"</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</purchase_orders>";
				update_simple(po_xml);
			}
		});
		
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
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
					"<bill_id>"+data_id+"</bill_id>" +
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
		var	notification_xml="<notifications>" +
					"<id>"+get_new_key()+"</id>" +
					"<t_generated>"+get_my_time()+"</t_generated>" +
					"<data_id unique='yes'>"+data_id+"</data_id>" +
					"<title>Pending purchase bill approval</title>" +
					"<notes>Purchase bill # "+bill_id+" is pending for approval</notes>" +
					"<link_to>form53</link_to>" +
					"<status>pending</status>" +
					"<target_user>"+get_session_var('purchase_bill_approver')+"</target_user>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</notifications>";
					
			create_row(data_xml,activity_xml);
			create_simple(transaction_xml);
			create_simple(pt_xml);
			create_simple_func(payment_xml,function()
			{
				//modal28_action(pt_tran_id);
			});
			create_simple_no_warning(notification_xml);	
			
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form122_update_form();
		});
		
		$("[id^='save_form122_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 123
 * form Mandatory Attributes
 * @param button
 */
function form123_create_item(form)
{
	if(is_create_access('form123'))
	{
		var object=form.elements[0].value;
		var attribute=form.elements[1].value;
		var values=form.elements[2].value;
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var del_button=form.elements[6];
		var last_updated=get_my_time();
		var data_xml="<mandatory_attributes>" +
					"<id>"+data_id+"</id>" +
					"<object>"+object+"</object>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+values+"</value>"+
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</mandatory_attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>mandatory_attributes</tablename>" +
					"<link_to>form123</link_to>" +
					"<title>Added</title>" +
					"<notes>Mandatory attribute "+attribute+" for "+object+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form123_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form123_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 125
 * form Customer Accounts
 * @param button
 */
function form125_create_item(form)
{
	if(is_create_access('form125'))
	{
		var customer=form.elements[0].value;
		var username=form.elements[1].value;
		var password=form.elements[2].value;
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var domain=get_domain();
	
		var salt='$2a$10$'+domain+'1234567891234567891234';
		var salt_22=salt.substring(0, 29);
		
		var bcrypt = new bCrypt();
		bcrypt.hashpw(password, salt_22, function(newhash)
		{		
			var data_xml="<accounts>" +
						"<id>"+data_id+"</id>" +
						"<acc_name>"+customer+"</acc_name>" +
						"<username unique='yes'>"+username+"</username>" +
						"<status>"+status+"</status>" +
						"<password>"+newhash+"</password>"+					
						"<type>customer</type>"+					
						"<last_updated>"+last_updated+"</last_updated>" +
						"</accounts>";	
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>accounts</tablename>" +
						"<link_to>form125</link_to>" +
						"<title>Added</title>" +
						"<notes>Account for username "+username+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
			}
			else
			{
				local_create_row(data_xml,activity_xml);
			}	
			for(var i=0;i<5;i++)
			{
				$(form.elements[i]).attr('readonly','readonly');
			}
			var del_button=form.elements[6];
			del_button.removeAttribute("onclick");
			$(del_button).on('click',function(event)
			{
				form125_delete_item(del_button);
			});
			
			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form125_update_item(form);
			});
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
};

/**
 * @form Job Order
 * @param button
 */
function form130_create_item(form)
{
	if(is_create_access('form130'))
	{
		var bill_id=document.getElementById("form130_master").elements[3].value;
		
		var name=form.elements[0].value;
		var batch="";
		var staff="";
		var quantity="";
		var notes="";
		if(isNaN(form.elements[2].value))
		{
			staff=form.elements[1].value;
			notes=form.elements[2].value;
		}
		else
		{
			batch=form.elements[1].value;
			quantity=form.elements[2].value;
		}
		var price=form.elements[3].value;
		var total=form.elements[4].value;
		var amount=form.elements[5].value;
		var discount=form.elements[6].value;
		var tax=form.elements[7].value;
		var offer=form.elements[8].value;
		var data_id=form.elements[9].value;
		var free_product_name=form.elements[12].value;
		var free_product_quantity=form.elements[13].value;
		var free_service_name=form.elements[14].value;
		var last_updated=get_my_time();
		
		if(isNaN(form.elements[2].value))
		{
			var pre_requisite_data="<pre_requisites>" +
					"<type exact='yes'>service</type>" +
					"<requisite_type exact='yes'>task</requisite_type>" +
					"<name exact='yes'>"+name+"</name>" +
					"<requisite_name></requisite_name>" +
					"<quantity></quantity>" +
					"</pre_requisites>";
			fetch_requested_data('',pre_requisite_data,function(pre_requisites)
			{
				var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"<item_name>"+name+"</item_name>" +
						"<unit_price>"+price+"</unit_price>" +
						"<notes>"+notes+"</notes>" +
						"<staff>"+staff+"</staff>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<discount>"+discount+"</discount>" +
						"<offer>"+offer+"</offer>" +
						"<type>bought</type>" +
						"<tax>"+tax+"</tax>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</bill_items>";		
				if(is_online())
				{
					server_create_simple(data_xml);
				}
				else
				{
					local_create_simple(data_xml);
				}
		
				pre_requisites.forEach(function(pre_requisite)
				{
					var task_id=get_new_key();
					var task_xml="<task_instances>" +
							"<id>"+task_id+"</id>" +
							"<name>"+pre_requisite.name+"</name>" +
							"<assignee>"+staff+"</assignee>" +
							"<t_initiated>"+get_my_time()+"</t_initiated>" +
							"<t_due>"+get_task_due_period()+"</t_due>" +
							"<status>pending</status>" +
							"<task_hours>"+pre_requisite.quantity+"</task_hours>" +
							"<source>service</source>" +
							"<source_id>"+data_id+"</source_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</task_instances>";
					var activity_xml="<activity>" +
							"<data_id>"+task_id+"</data_id>" +
							"<tablename>task_instances</tablename>" +
							"<link_to>form14</link_to>" +
							"<title>Added</title>" +
							"<notes>Task "+pre_requisite.name+" assigned to "+staff+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
			
					if(is_online())
					{
						server_create_row(task_xml,activity_xml);
					}
					else
					{
						local_create_row(task_xml,activity_xml);
					}		
				});
			});
			
		}
		else
		{
			var data_xml="<bill_items>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+name+"</item_name>" +
					"<batch>"+batch+"</batch>" +
					"<unit_price>"+price+"</unit_price>" +
					"<quantity>"+quantity+"</quantity>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<discount>"+discount+"</discount>" +
					"<offer>"+offer+"</offer>" +
					"<type>bought</type>" +
					"<tax>"+tax+"</tax>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<free_with></free_with>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bill_items>";	
		
			if(is_online())
			{
				server_create_simple(data_xml);
			}
			else
			{
				local_create_simple(data_xml);
			}
		}
		////adding free service
		if(free_service_name!="" && free_service_name!=null)
		{
			var id=get_new_key();
			rowsHTML="<tr>";
				rowsHTML+="<form id='form130_"+id+"'></form>";
                	rowsHTML+="<td>";
                    	rowsHTML+="<input type='text' readonly='readonly' form='form130_"+id+"' value='"+free_service_name+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='text' readonly='readonly' required form='form130_"+id+"' value='"+staff+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<textarea readonly='readonly' required form='form130_"+id+">free with "+name+"</textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
                            rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
                            rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
                            rowsHTML+="<input type='hidden' form='form130_"+id+"' value='free with "+name+"'>";
                            rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+id+"'>";
                            rowsHTML+="<input type='button' class='save_icon' form='form130_"+id+"' id='save_form130_"+id+"' >";
                            rowsHTML+="<input type='button' class='delete_icon' form='form130_"+id+"' id='delete_form130_"+id+"' onclick='form130_delete_item($(this));'>";
                            rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
                            rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
                            rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
                    rowsHTML+="</td>";
            rowsHTML+="</tr>";

            $('#form130_body').prepend(rowsHTML);

			var free_xml="<bill_items>" +
						"<id>"+id+"</id>" +
						"<item_name>"+free_service_name+"</item_name>" +
						"<staff>"+staff+"</staff>" +
						"<notes>free with "+name+"</notes>" +
						"<unit_price>0</unit_price>" +
						"<amount>0</amount>" +
						"<total>0</total>" +
						"<discount>0</discount>" +
						"<offer></offer>" +
						"<type>free</type>" +
						"<tax>0</tax>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"<free_with>"+name+"</free_with>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</bill_items>";
			if(is_online())
			{
				server_create_simple(free_xml);
			}
			else
			{
				local_create_simple(free_xml);
			}
			offer_invalid=false;
		}

		
		//////adding free product to the bill if applicable
		if(free_product_name!="" && free_product_name!=null)
		{
			get_inventory(free_product_name,'',function(free_quantities)
			{
				if(free_quantities>=free_product_quantity)
				{
					var free_batch_data="<bill_items count='1'>" +
							"<batch></batch>" +
							"<item_name exact='yes'>"+free_product_name+"</item_name>" +
							"</bill_items>";
					get_single_column_data(function(data)
					{
						var free_batch="";
						if(data.length>0)
						{
							free_batch=data[0];	
						}
						
						var id=get_new_key();
						rowsHTML="<tr>";
							rowsHTML+="<form id='form130_"+id+"'></form>";
		                	rowsHTML+="<td>";
		                    	rowsHTML+="<input type='text' readonly='readonly' form='form130_"+id+"' value='"+free_product_name+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='text' readonly='readonly' required form='form130_"+id+"' value='"+free_batch+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='"+free_product_quantity+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='free with "+name+"'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+id+"'>";
	                                rowsHTML+="<input type='button' class='save_icon' form='form130_"+id+"' id='save_form130_"+id+"' >";
	                                rowsHTML+="<input type='button' class='delete_icon' form='form130_"+id+"' id='delete_form130_"+id+"' onclick='form130_delete_item($(this));'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
	                        rowsHTML+="</td>";
		                rowsHTML+="</tr>";

		                $('#form130_body').prepend(rowsHTML);

						var free_xml="<bill_items>" +
									"<id>"+id+"</id>" +
									"<item_name>"+free_product_name+"</item_name>" +
									"<batch>"+free_batch+"</batch>" +
									"<unit_price>0</unit_price>" +
									"<quantity>"+free_product_quantity+"</quantity>" +
									"<amount>0</amount>" +
									"<total>0</total>" +
									"<discount>0</discount>" +
									"<offer></offer>" +
									"<type>free</type>" +
									"<tax>0</tax>" +
									"<bill_id>"+bill_id+"</bill_id>" +
									"<free_with>"+name+"</free_with>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</bill_items>";	
						if(is_online())
						{
							server_create_simple(free_xml);
						}
						else
						{
							local_create_simple(free_xml);
						}
					},free_batch_data);
				}
				else
				{
					$("#modal7").dialog("open");
				}
			});
		}
		
		for(var i=0;i<10;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[11];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form130_delete_item(del_button);
		});

		var save_button=form.elements[10];
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Job Order
 * @param button
 */
function form130_create_form()
{
	if(is_create_access('form130'))
	{
		var form=document.getElementById("form130_master");
		
		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		
		var message_string="Bill from:"+get_session_var('title')+"\nAddress: "+get_session_var('address');
		
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form130']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
			
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Price: "+subform.elements[3].value;
			message_string+=" Total: "+subform.elements[4].value;
		});
		
				
		var data_id=form.elements[3].value;
		var transaction_id=form.elements[5].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		var offer_data="<offers>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount upperbound='yes'>"+(amount-discount)+"</criteria_amount>" +
				"<offer_type exact='yes'>bill</offer_type>" +
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
				else 
				{	return -1;}
			});
			
			for(var i in offers)
			{
				if(offers[i].result_type=='discount')
				{
					if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
					{
						var dis=parseFloat(((amount-discount)*parseInt(offers[i].discount_percent))/100);
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
					else 
					{
						var dis=parseFloat(offers[i].discount_amount)*(Math.floor((amount-discount)/parseFloat(offers[i].criteria_amount)));
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
				}
				else if(offers[i].result_type=='product free')
				{
					var free_product_name=offers[i].free_product_name;
					var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount-discount)/parseFloat(offers[i].criteria_amount)));
					
					get_inventory(free_product_name,'',function(free_quantities)
					{
						if(free_quantities>=free_product_quantity)
						{
							var free_batch_data="<bill_items count='1'>" +
									"<batch></batch>" +
									"<item_name exact='yes'>"+free_product_name+"</item_name>" +
									"</bill_items>";
							get_single_column_data(function(data)
							{
								var free_batch="";
								if(data.length>0)
								{
									free_batch=data[0];	
								}
	
								var id=get_new_key();
								rowsHTML="<tr>";
									rowsHTML+="<form id='form130_"+id+"'></form>";
					                	rowsHTML+="<td>";
					                    	rowsHTML+="<input type='text' readonly='readonly' form='form130_"+id+"' value='"+free_product_name+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='text' required form='form130_"+id+"' value='"+free_batch+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='"+free_product_quantity+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                        	rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='free on the bill amount'>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+id+"'>";
				                                rowsHTML+="<input type='button' class='save_icon' form='form130_"+id+"' id='save_form130_"+id+"' >";
				                                rowsHTML+="<input type='button' class='delete_icon' form='form130_"+id+"' id='delete_form130_"+id+"' onclick='form130_delete_item($(this));'>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
				                        rowsHTML+="</td>";
				                rowsHTML+="</tr>";

				                $('#form130_body').prepend(rowsHTML);

				                var free_xml="<bill_items>" +
											"<id>"+id+"</id>" +
											"<item_name>"+free_product_name+"</item_name>" +
											"<batch>"+free_batch+"</batch>" +
											"<unit_price>0</unit_price>" +
											"<quantity>"+free_product_quantity+"</quantity>" +
											"<amount>0</amount>" +
											"<total>0</total>" +
											"<discount>0</discount>" +
											"<offer></offer>" +
											"<type>free</type>" +
											"<tax>0</tax>" +
											"<bill_id>"+data_id+"</bill_id>" +
											"<free_with>bill</free_with>" +
											"<last_updated>"+last_updated+"</last_updated>" +
											"</bill_items>";	
								
								if(is_online())
								{
									server_create_simple(free_xml);
								}
								else
								{
									local_create_simple(free_xml);
								}
								
							},free_batch_data);
						}
						else
						{
							$("#modal7").dialog("open");
						}
					});
				}
				else if(offers[i].result_type=='service free')
				{
					var free_service_name=offers[i].free_service_name;	
					var id=get_new_key();
					rowsHTML="<tr>";
						rowsHTML+="<form id='form130_"+id+"'></form>";
		                	rowsHTML+="<td>";
		                    	rowsHTML+="<input type='text' readonly='readonly' form='form130_"+id+"' value='"+free_service_name+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='text' readonly='readonly' required form='form130_"+id+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<textarea readonly='readonly' required form='form130_"+id+"'>free service</textarea>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                        	rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='free on the bill amount'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+id+"'>";
	                                rowsHTML+="<input type='button' class='save_icon' form='form130_"+id+"' id='save_form130_"+id+"' >";
	                                rowsHTML+="<input type='button' class='delete_icon' form='form130_"+id+"' id='delete_form130_"+id+"' onclick='form130_delete_item($(this));'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
	                        rowsHTML+="</td>";
	                rowsHTML+="</tr>";

	                $('#form130_body').prepend(rowsHTML);

	                var free_pre_requisite_data="<pre_requisites>" +
							"<type exact='yes'>service</type>" +
							"<requisite_type exact='yes'>task</requisite_type>" +
							"<name exact='yes'>"+free_service_name+"</name>" +
							"<requisite_name></requisite_name>" +
							"<quantity></quantity>" +
							"</pre_requisites>";
					fetch_requested_data('',free_pre_requisite_data,function(free_pre_requisites)
					{
		                var free_xml="<bill_items>" +
									"<id>"+id+"</id>" +
									"<item_name>"+free_service_name+"</item_name>" +
									"<staff></staff>" +
									"<notes>free service</notes>" +
									"<unit_price>0</unit_price>" +
									"<amount>0</amount>" +
									"<total>0</total>" +
									"<discount>0</discount>" +
									"<offer></offer>" +
									"<type>free</type>" +
									"<tax>0</tax>" +
									"<bill_id>"+data_id+"</bill_id>" +
									"<free_with>bill</free_with>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</bill_items>";	
						
						if(is_online())
						{
							server_create_simple(free_xml);
						}
						else
						{
							local_create_simple(free_xml);
						}
						
						free_pre_requisites.forEach(function(free_pre_requisite)
						{
							var task_id=get_new_key();
							var task_xml="<task_instances>" +
									"<id>"+task_id+"</id>" +
									"<name>"+free_pre_requisite.name+"</name>" +
									"<assignee></assignee>" +
									"<t_initiated>"+get_my_time()+"</t_initiated>" +
									"<t_due>"+get_task_due_period()+"</t_due>" +
									"<status>pending</status>" +
									"<task_hours>"+free_pre_requisite.quantity+"</task_hours>" +
									"<source>service</source>" +
									"<source_id>"+id+"</source_id>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</task_instances>";
							var activity_xml="<activity>" +
									"<data_id>"+task_id+"</data_id>" +
									"<tablename>task_instances</tablename>" +
									"<link_to>form14</link_to>" +
									"<title>Added</title>" +
									"<notes>Task "+free_pre_requisite.name+"</notes>" +
									"<updated_by>"+get_name()+"</updated_by>" +
									"</activity>";
					
							if(is_online())
							{
								server_create_row(task_xml,activity_xml);
							}
							else
							{
								local_create_row(task_xml,activity_xml);
							}		
						});
				
					});
				}

				offer_detail=offers[i].offer_detail;
				break;
			}
			
			var data_xml="<bills>" +
						"<id>"+data_id+"</id>" +
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>both</type>" +
						"<offer>"+offer_detail+"</offer>" +
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
						"<notes>Bill no "+data_id+"</notes>" +
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
						"<bill_id>"+data_id+"</bill_id>" +
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
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
				server_create_simple(transaction_xml);
				server_create_simple(pt_xml);
				server_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id);
				});
			}
			else
			{
				local_create_row(data_xml,activity_xml);
				local_create_simple(transaction_xml);
				local_create_simple(pt_xml);
				local_create_simple_func(payment_xml,function()
				{
					modal26_action(pt_tran_id);
				});
			}
			
			message_string+="\nAmount: "+amount;
			message_string+="\ndiscount: "+discount;
			message_string+="\nTax: "+tax;
			message_string+="\nTotal: "+total;
			var subject="Bill from "+get_session_var('title');
			$('#form130_share').show();
			$('#form130_share').click(function()
			{
				modal44_action(customer,subject,message_string);
			});

			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. "+discount+"</br>" +
					"Rs. "+tax+"</br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
			$('#form130_foot').html(total_row);
		});
		
		var save_button=form.elements[6];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form130_update_form();
		});
		
		$("[id^='save_form130_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 134
 * form Service dashboard - Add issue
 * @param button
 */
function form134_add_issue(button,problem_type,problem_detail,solution)
{
	if(is_create_access('form126'))
	{
		var issue_xml="<issues>"+
					"<id></id>"+
					"<detail>"+problem_detail+"</detail>"+
					"</issues>";
		get_single_column_data(function(problems)
		{
			var last_updated=get_my_time();
			var data_id=get_new_key();
					
			if(problems.length==0)
			{		
				var data_xml="<issues>" +
							"<id>"+data_id+"</id>" +
							"<short_desc>"+problem_type+"</short_desc>"+
							"<detail>"+problem_detail+"</detail>"+					
							"<status>active</status>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</issues>";	
				var solution_xml="<solutions>" +
							"<id>"+data_id+"</id>" +
							"<issue_id>"+data_id+"</issue_id>"+
							"<detail>"+solution+"</detail>"+					
							"<status>active</status>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</solutions>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>issues</tablename>" +
							"<link_to>form126</link_to>" +
							"<title>Added</title>" +
							"<notes>Issue to repository</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				if(is_online())
				{
					server_create_row(data_xml,activity_xml);
					if(solution!="")					
						server_create_simple(solution_xml);
				}
				else
				{
					local_create_row(data_xml,activity_xml);
					if(solution!="")					
						local_create_simple(solution_xml);
				}
			}
			else if(solution!="")
			{
				var issue_id=problems[0];
				var solution_xml="<solutions>"+
							"<id></id>"+
							"<issue_id exact='yes'>"+issue_id+"</issue_id>"+
							"<detail exact='yes'>"+solution+"</detail>"+
							"</solutions>";
				get_single_column_data(function(solutions)
				{
					if(solutions.length==0)
					{
						var solution_xml="<solutions>" +
						"<id>"+get_new_key()+"</id>" +
						"<issue_id>"+issue_id+"</issue_id>"+
						"<detail>"+solution+"</detail>"+					
						"<status>active</status>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</solutions>";
						
						if(is_online())
						{
							server_create_simple(solution_xml);
						}
						else
						{
							local_create_simple(solution_xml);
						}
					}
				},solution_xml);
			}				
		},issue_xml);

		$(button).attr("onclick",'');
		$(button).attr('value','Added to Repo');	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};


/**
 * formNo 134
 * form Service dashboard - machine
 * @param button
 */
function form134_create_machine(form)
{
	if(is_create_access('form134'))
	{
		var master_fields=document.getElementById('form134_master');
		var request_id=master_fields.elements[1].value;
		var type=form.elements[0].value;
		var machine=form.elements[1].value;
		var problem=form.elements[2].value;
		var closing_notes=form.elements[3].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		
		var data_xml="<service_request_machines>" +
					"<id>"+data_id+"</id>" +
					"<request_id>"+request_id+"</request_id>"+
					"<machine_type>"+type+"</machine_type>" +
					"<machine>"+machine+"</machine>" +
					"<problem>"+problem+"</problem>" +
					"<closing_notes>"+closing_notes+"</closing_notes>"+					
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_request_machines>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>service_request_machines</tablename>" +
					"<link_to>form134</link_to>" +
					"<title>Added</title>" +
					"<notes>Machine "+machine+" to SR# "+request_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form134_delete_machine(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form134_update_machine(form);
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};

/**
 * formNo 134
 * form Service dashboard - team
 * @param button
 */
function form134_create_team(form)
{
	if(is_create_access('form134'))
	{
		var master_fields=document.getElementById('form134_master');
		var request_id=master_fields.elements[1].value;

		var assignee=form.elements[0].value;
		var phone=form.elements[1].value;
		var email=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		
		var data_xml="<service_request_team>" +
					"<id>"+data_id+"</id>" +
					"<request_id>"+request_id+"</request_id>"+
					"<assignee>"+assignee+"</assignee>" +
					"<phone>"+phone+"</phone>" +
					"<email>"+email+"</email>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_request_team>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>service_request_team</tablename>" +
					"<link_to>form134</link_to>" +
					"<title>Added</title>" +
					"<notes>Assignee "+assignee+" to SR# "+request_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var access_xml="<data_access>" +
					"<id>"+get_new_key()+"</id>" +
					"<tablename>service_requests</tablename>" +
					"<record_id>"+request_id+"</record_id>" +
					"<access_type>all</access_type>" +
					"<user>"+assignee+"</user>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</data_access>";

		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
			server_create_simple(access_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(access_xml);
		}
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form134_delete_team(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form134_update_team(form);
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};

/**
 * formNo 134
 * form Service dashboard - document
 * @param button
 */
function form134_create_document(form)
{
	if(is_create_access('form134'))
	{
		var master_fields=document.getElementById('form134_master');
		var request_id=master_fields.elements[1].value;

		var doc_name=form.elements[0].value;
		var data_id=form.elements[2].value;
		var url_id="form134_document_url_"+data_id;
		var docInfo=document.getElementById(url_id);
		var url=$(docInfo).attr('href');
		var last_updated=get_my_time();
		
		var data_xml="<documents>" +
					"<id>"+data_id+"</id>" +
					"<target_id>"+request_id+"</target_id>"+
					"<url>"+url+"</url>"+
					"<doc_name>"+doc_name+"</doc_name>" +
					"<doc_type>service request</doc_type>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</documents>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>documents</tablename>" +
					"<link_to>form134</link_to>" +
					"<title>Added</title>" +
					"<notes>Document "+doc_name+" for SR# "+request_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<2;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[4];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form134_delete_document(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};

/**
 * formNo 134
 * form Service dashboard - task
 * @param button
 */
function form134_create_task(form)
{
	if(is_create_access('form134'))
	{
		var master_fields=document.getElementById('form134_master');
		var request_id=master_fields.elements[1].value;

		var description=form.elements[0].value;
		var assignee=form.elements[1].value;
		var due_by=get_raw_time(form.elements[2].value);
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		
		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<source_id>"+request_id+"</source_id>"+
					"<source>service request</source>"+
					"<assignee>"+assignee+"</assignee>" +
					"<name>SR #"+request_id+"</name>" +
					"<description>"+description+"</description>" +
					"<t_initiated>"+last_updated+"</t_initiated>"+
					"<t_due>"+due_by+"</t_due>"+
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_instances>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>task_instances</tablename>" +
					"<link_to>form134</link_to>" +
					"<title>Added</title>" +
					"<notes>Task for SR# "+request_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form134_delete_task(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form134_update_task(form);
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};


/**
 * formNo 135
 * form Project dashboard - task
 * @param button
 */
function form135_create_task(form)
{
	if(is_create_access('form135'))
	{
		var master_fields=document.getElementById('form135_master');
		var project_name=master_fields.elements[1].value;
		var project_id=master_fields.elements[4].value;

		var task=form.elements[0].value;
		var description=form.elements[1].value;
		var assignee=form.elements[2].value;
		var due_by=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;				
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		
		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<source_id>"+project_id+"</source_id>"+
					"<source>project</source>"+
					"<assignee>"+assignee+"</assignee>" +
					"<name>"+task+"</name>" +
					"<description>"+description+"</description>" +
					"<t_initiated>"+last_updated+"</t_initiated>"+
					"<t_due>"+due_by+"</t_due>"+
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_instances>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>task_instances</tablename>" +
					"<link_to>form135</link_to>" +
					"<title>Added</title>" +
					"<notes>Task "+task+" to project "+project_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form135_delete_task(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form135_update_task(form);
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};


/**
 * formNo 135
 * form Project dashboard - document
 * @param button
 */
function form135_create_document(form)
{
	if(is_create_access('form135'))
	{
		var master_fields=document.getElementById('form135_master');
		var project_name=master_fields.elements[1].value;
		var project_id=master_fields.elements[4].value;

		var doc_name=form.elements[0].value;
		var data_id=form.elements[2].value;
		var url_id="form135_document_url_"+data_id;
		var docInfo=document.getElementById(url_id);
		var url=$(docInfo).attr('href');
		var last_updated=get_my_time();
		
		var data_xml="<documents>" +
					"<id>"+data_id+"</id>" +
					"<target_id>"+project_id+"</target_id>"+
					"<url>"+url+"</url>"+
					"<doc_name>"+doc_name+"</doc_name>" +
					"<doc_type>project</doc_type>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</documents>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>documents</tablename>" +
					"<link_to>form135</link_to>" +
					"<title>Added</title>" +
					"<notes>Document "+doc_name+" for project "+project_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<2;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[4];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form135_delete_document(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};


/**
 * formNo 135
 * form Project dashboard - team
 * @param button
 */
function form135_create_team(form)
{
	if(is_create_access('form135'))
	{
		var master_fields=document.getElementById('form135_master');
		var project_name=master_fields.elements[1].value;
		var project_id=master_fields.elements[4].value;

		var member=form.elements[0].value;
		var role=form.elements[1].value;
		var notes=form.elements[2].value;
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		
		var data_xml="<project_team>" +
					"<id>"+data_id+"</id>" +
					"<project_id>"+project_id+"</project_id>"+
					"<member>"+member+"</member>" +
					"<role>"+role+"</role>" +
					"<notes>"+notes+"</notes>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</project_team>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>project_team</tablename>" +
					"<link_to>form135</link_to>" +
					"<title>Added</title>" +
					"<notes>Member "+member+" to project team of "+project_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var access_xml="<data_access>" +
					"<id>"+get_new_key()+"</id>" +
					"<tablename>projects</tablename>" +
					"<record_id>"+project_id+"</record_id>" +
					"<access_type>read</access_type>" +
					"<user>"+member+"</user>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</data_access>";

		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
			server_create_simple(access_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(access_xml);
		}
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form135_delete_team(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form135_update_team(form);
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};


/**
 * @form Enter Purchase Bill (wholesale)
 * @formNo 136
 * @param button
 */
function form136_create_item(form)
{
	if(is_create_access('form136'))
	{
		var bill_id=document.getElementById("form136_master").elements['id'].value;
		var supplier=document.getElementById("form136_master").elements['supplier'].value;
		var entry_date=get_raw_time(document.getElementById("form136_master").elements['entry_date'].value);
		
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var quantity=form.elements[2].value;
		var price=form.elements[3].value;
		var amount=form.elements[4].value;
		var tax=form.elements[5].value;
		var total=parseFloat(tax)+parseFloat(amount);
		
		var po_unit=form.elements[6].value;
		var po_amount=form.elements[7].value;
		var po_tax=form.elements[8].value;
		
		var storage=form.elements[9].value;
		var data_id=form.elements[10].value;
		var save_button=form.elements[11];
		var del_button=form.elements[12];
		
		var qc=document.getElementById('form136_check_image_'+data_id).getAttribute('data-accepted');
		var last_updated=get_my_time();

		var data_xml="<supplier_bill_items>" +
				"<id>"+data_id+"</id>" +
				"<product_name>"+name+"</product_name>" +
				"<batch>"+batch+"</batch>" +
				"<quantity>"+quantity+"</quantity>" +
				"<total>"+total+"</total>" +
				"<tax>"+tax+"</tax>" +
				"<amount>"+amount+"</amount>" +
				"<unit_price>"+price+"</unit_price>" +
				"<po_tax>"+po_tax+"</po_tax>" +
				"<po_amount>"+po_amount+"</po_amount>" +
				"<po_price>"+po_unit+"</po_price>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<storage>"+storage+"</storage>" +
				"<qc>"+qc+"</qc>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</supplier_bill_items>";	
		var batch_xml="<product_instances>" +
				"<id>"+data_id+"</id>" +
				"<product_name>"+name+"</product_name>" +
				"<batch>"+batch+"</batch>" +
				"<manufacture_date></manufacture_date>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</product_instances>";
		create_simple(batch_xml);
		create_simple(data_xml);
		
		if(qc=='rejected')
		{
			var return_xml="<supplier_returns>" +
					"<id>"+bill_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<return_date>"+entry_date+"</return_date>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_returns>";
		
			var return_data_xml="<supplier_return_items>" +
						"<id>"+data_id+"</id>" +
						"<return_id>"+bill_id+"</return_id>"+					
						"<item_name>"+name+"</item_name>" +
						"<batch>"+batch+"</batch>" +
						"<quantity>"+quantity+"</quantity>" +
						"<storage>"+storage+"</storage>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</supplier_return_items>";
			
			create_simple(return_data_xml);
			create_simple_no_warning(return_xml);
		}
				
		for(var i=0;i<10;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form136_delete_item(del_button);
		});

		$(save_button).off('click');
		
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
						"<id>"+get_new_key()+"</id>" +
						"<name>"+storage+"</name>" +
						"<item_name>"+name+"</item_name>" +
						"<batch>"+batch+"</batch>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				create_simple(storage_xml);
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Enter supplier Bill (wholesale)
 * @param button
 */
function form136_create_form()
{
	if(is_create_access('form136'))
	{
		var form=document.getElementById("form136_master");
		
		var supplier=form.elements['supplier'].value;
		var bill_id=form.elements['bill_num'].value;
		var bill_date=get_raw_time(form.elements['bill_date'].value);
		var entry_date=get_raw_time(form.elements['entry_date'].value);
		var order_id=form.elements['order_id'].value;
		var order_num=form.elements['po_num'].value;
		var data_id=form.elements['id'].value;
		var last_updated=get_my_time();
		
		var total=0;
		var tax=0;
		var amount=0;
		var total_quantity=0;
			
		$("[id^='save_form136']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			
			var qc_id=subform.elements[10].value;
			var qc=document.getElementById('form136_check_image_'+qc_id).getAttribute('data-accepted');
		
			if(qc=='accepted')
			{
				if(!isNaN(parseFloat(subform.elements[4].value)))
					amount+=parseFloat(subform.elements[4].value);
				if(!isNaN(parseFloat(subform.elements[5].value)))
					tax+=parseFloat(subform.elements[5].value);
				if(!isNaN(parseFloat(subform.elements[2].value)))
					total_quantity+=parseFloat(subform.elements[2].value);
			}
		});
		
		amount=my_round(amount,2);
		tax=my_round(tax,2);
		
		total=amount+tax;
		total=my_round(total,0);
				
		var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
				"<td>Amount:</br>Tax: </br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+tax+"</br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form136_foot').html(total_row);

		
		var data_xml="<supplier_bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<order_id>"+order_id+"</order_id>" +
					"<order_num>"+order_num+"</order_num>" +
					"<supplier>"+supplier+"</supplier>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<entry_date>"+entry_date+"</entry_date>" +
					"<total>"+total+"</total>" +
					"<amount>"+amount+"</amount>" +
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
		
		var po_data="<purchase_orders>"+
					"<id>"+order_id+"</id>" +
					"<bill_id></bill_id>" +
					"<total_quantity></total_quantity>"+
					"<quantity_received></quantity_received>"+
					"</purchase_orders>";
		fetch_requested_data('',po_data,function (porders) 
		{
			if(porders.length>0)
			{
				var id_object_array=[];
				if(porders[0].bill_id!="" && porders[0].bill_id!=0 && porders[0].bill_id!="null")
				{
					id_object_array=JSON.parse(porders[0].bill_id);
				}
				
				var id_object=new Object();
				id_object.bill_num=bill_id;
				id_object.bill_id=data_id;
				id_object.total_received=total_quantity;
				
				id_object_array.push(id_object);

				var quantity_received=0;
				
				for(var x in id_object_array)
				{
					quantity_received+=parseFloat(id_object_array[x].total_received);
				}
				
				if(porders[0].quantity_received=="" || porders[0].quantity_received=='null')
				{
					porders[0].quantity_received=0;
				}
				
				if(parseFloat(porders[0].quantity_received)>quantity_received)
				{
					quantity_received=parseFloat(porders[0].quantity_received);
				}
				
				var status='partially received';				
				if(parseFloat(porders[0].total_quantity)<=quantity_received)
				{
					status='completely received';
				}
				
				var new_bill_id=JSON.stringify(id_object_array);
				//console.log(new_bill_id);
				var po_xml="<purchase_orders>" +
						"<id>"+order_id+"</id>" +
						"<bill_id>"+new_bill_id+"</bill_id>" +
						"<quantity_received>"+quantity_received+"</quantity_received>"+
						"<status>"+status+"</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</purchase_orders>";
				update_simple(po_xml);
			}
		});
					
					
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
					"<bill_id>"+data_id+"</bill_id>" +
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
		
		var save_button=form.elements['save'];
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form136_update_form();
		});
		
		$("[id^='save_form136_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Project Expenses
 * @formNo 137
 * @param button
 */
function form137_create_item(form)
{
	if(is_create_access('form137'))
	{
		var project_id=document.getElementById('form137_master').elements['id'].value;
		var person=form.elements[0].value;
		var amount=form.elements[1].value;
		var details=form.elements[2].value;
		var date=get_raw_time(form.elements[3].value);		
		var status=form.elements[4].value;		
		var data_id=form.elements[5].value;
		var del_button=form.elements[7];
		var last_updated=get_my_time();
		var data_xml="<expenses>" +
					"<id>"+data_id+"</id>" +
					"<source_id>"+project_id+"</source_id>" +
					"<source>project</source>"+
					"<status>"+status+"</status>" +
					"<expense_date>"+date+"</expense_date>" +
					"<person>"+person+"</person>" +
					"<amount>"+amount+"</amount>" +
					"<detail>"+details+"</detail>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</expenses>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>expenses</tablename>" +
					"<link_to>form137</link_to>" +
					"<title>Submitted</title>" +
					"<notes>Expenses of Rs. "+amount+" for "+person+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form137_delete_item(del_button);
		});
		form137_get_totals();
		$(form).off('submit');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project Expenses
 * @param button
 */
function form137_create_form()
{
	$("[id^='save_form137_']").click();
}


/**
 * @form Customer Profiling
 * @formNo 139
 * @param button
 */
function form139_create_item(form)
{
	if(is_create_access('form139'))
	{
		var owner=form.elements[0].value;
		var facility=form.elements[1].value;
		var location=form.elements[2].value;
		var area=form.elements[3].value;
		var floors=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<assets>" +
					"<id>"+data_id+"</id>" +
					"<name>"+facility+"</name>" +
					"<type>facility</type>"+
					"<owner>"+owner+"</owner>" +
					"<owner_type>customer</owner_type>" +
					"<location>"+location+"</location>" +
					"<floors>"+floors+"</floors>"+
					"<area>"+area+"</area>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</assets>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form139_delete_item(del_button);
		
		$(form).off('submit');
		});
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form139_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Supplier Profiling
 * @formNo 140
 * @param button
 */
function form140_create_item(form)
{
	if(is_create_access('form140'))
	{
		var supplier=form.elements[0].value;
		var asset_type=form.elements[1].value;
		var desc=form.elements[2].value;
		var location=form.elements[3].value;	
		var notes=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<assets>" +
					"<id>"+data_id+"</id>" +
					"<type>"+asset_type+"</type>"+
					"<description>"+desc+"</description>"+
					"<owner>"+supplier+"</owner>" +
					"<owner_type>supplier</owner_type>" +
					"<location>"+location+"</location>"+
					"<notes>"+notes+"</notes>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</assets>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form140_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form140_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create Questionnaire 
 * @param button
 */
function form142_create_item(form)
{
	if(is_create_access('form142'))
	{
		var ques_id=document.getElementById("form142_master").elements['id'].value;
		var ques_name=document.getElementById("form142_master").elements['name'].value;

		var display_name=form.elements[0].value;
		var description=form.elements[1].value;
		var type=form.elements[2].value;
		var values="";
		var dynamic_values="";		
		if(type=='value list')
			values=form.elements[3].value;
		else if(type=='dynamic value list')
			dynamic_values="vyavsaay"+htmlentities(form.elements[3].value)+"vyavsaay";
			
		var order=form.elements[4].value;
		var weight=form.elements[5].value;
		var name=ques_name+'field'+order;
		var required='unchecked';
		if(form.elements[6].checked)
			required='checked';
		var data_id=form.elements[7].value;
		var save_button=form.elements[8];
		var del_button=form.elements[9];
		var last_updated=get_my_time();
					
		var data_xml="<ques_fields>" +
				"<id>"+data_id+"</id>" +
				"<ques_id>"+ques_id+"</ques_id>" +
				"<name unique='yes'>"+name+"</name>" +
				"<display_name>"+display_name+"</display_name>" +
				"<description>"+description+"</description>" +
				"<type>"+type+"</type>" +
				"<fvalues>"+values+"</fvalues>" +
				"<dynamic_values>"+dynamic_values+"</dynamic_values>"+				
				"<forder>"+order+"</forder>" +
				"<weight>"+weight+"</weight>" +
				"<freq>"+required+"</freq>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</ques_fields>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}
				
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form142_delete_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create questionnaire
 * @param button
 */
function form142_create_form()
{
	if(is_create_access('form142'))
	{
		var master_form=document.getElementById("form142_master");
		var name=master_form.elements[1].value;
		var display_name=master_form.elements[2].value;
		var func=master_form.elements[3].value;
		var status=master_form.elements[4].value;
		var data_id=master_form.elements[5].value;
		var last_updated=get_my_time();
					
		var data_xml="<ques_struct>" +
				"<id>"+data_id+"</id>" +
				"<name>"+name+"</name>" +
				"<display_name>"+display_name+"</display_name>" +
				"<func>"+func+"</func>" +
				"<status>"+status+"</status>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</ques_struct>";	
		var activity_xml="<activity>" +
				"<data_id>"+data_id+"</data_id>" +
				"<tablename>ques_struct</tablename>" +
				"<link_to>form143</link_to>" +
				"<title>Created</title>" +
				"<notes>Questionnaire "+display_name+"</notes>" +
				"<updated_by>"+get_name()+"</updated_by>" +
				"</activity>";

		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}

		var save_button=master_form.elements[6];
		
		$(save_button).off('click');
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form142_update_form();
		});
		
		$("[id^='save_form142_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 144
 * form Project Budgeting - expense
 * @param button
 */
function form144_create_expense(form)
{
	if(is_create_access('form144'))
	{
		var master_fields=document.getElementById('form144_master');
		var project_name=master_fields.elements['project'].value;
		var project_id=master_fields.elements['project_id'].value;

		var person=form.elements[0].value;
		var amount=form.elements[1].value;
		var detail=form.elements[2].value;
		var status=form.elements[3].value;				
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		
		var data_xml="<expenses>" +
					"<id>"+data_id+"</id>" +
					"<source_id>"+project_id+"</source_id>"+
					"<source>project</source>"+
					"<person>"+person+"</person>"+
					"<amount>"+amount+"</amount>"+
					"<detail>"+detail+"</detail>" +
					"<status>"+status+"</status>"+
					"<expense_date>"+last_updated+"</expense_date>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</expenses>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>expenses</tablename>" +
					"<link_to>form144</link_to>" +
					"<title>Added</title>" +
					"<notes>Expense of Rs. "+amount+" for project "+project_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form144_delete_expense(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form144_update_expense(form);
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};



/**
 * @form Store Movement
 * @param button
 */
function form145_create_item(form)
{
	if(is_create_access('form145'))
	{
		var product_name=form.elements[0].value;
		var batch=form.elements[1].value;
		var quantity=form.elements[2].value;
		var source=form.elements[3].value;
		var target=form.elements[4].value;
		var status=form.elements[5].value;
		var schedule=form.elements[6].value;
		var data_id=form.elements[7].value;
		var receiver=form.elements[8].value;
		var save_button=form.elements[9];
		var del_button=form.elements[10];
		var dispatch_button=form.elements[11];
		
		//console.log(receiver);
		var last_updated=get_my_time();
		var data_xml="<store_movement>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+product_name+"</item_name>" +
					"<batch>"+batch+"</batch>" +
					"<quantity>"+quantity+"</quantity>" +
					"<source>"+source+"</source>"+
					"<target>"+target+"</target>"+
					"<status>"+status+"</status>"+
					"<dispatcher>"+get_account_name()+"</dispatcher>"+
					"<receiver>"+receiver+"</receiver>"+
					"<applicable_from>"+get_raw_time(schedule)+"</applicable_from>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</store_movement>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>store_movement</tablename>" +
					"<link_to>form145</link_to>" +
					"<title>New</title>" +
					"<notes>Store movement initiated for item "+product_name+" from storage area "+source+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		$(save_button).hide();
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form145_delete_item(del_button);
		});
		
		$(dispatch_button).show();
		
		///////////adding store placement////////
		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+target+"</name>" +
				"<item_name exact='yes'>"+product_name+"</item_name>" +
				"<batch exact='yes'>"+batch+"</batch>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0 && target!="")
			{
				var storage_xml="<area_utilization>" +
						"<id>"+get_new_key()+"</id>" +
						"<name>"+target+"</name>" +
						"<item_name>"+product_name+"</item_name>" +
						"<batch>"+batch+"</batch>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				create_simple(storage_xml);
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manufacturing Schedule
 * @formNo 146
 */
function form146_create_item(form)
{
	if(is_create_access('form146'))
	{
		var product=form.elements[0].value;
		var batch=form.elements[1].value;
		var quantity=form.elements[2].value;
		var schedule=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;		
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<manufacturing_schedule>" +
					"<id>"+data_id+"</id>" +
					"<product>"+product+"</product>" +
					"<batch>"+batch+"</batch>" +
					"<status>"+status+"</status>" +
					"<schedule>"+schedule+"</schedule>" +
					"<quantity>"+quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</manufacturing_schedule>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>manufacturing_schedule</tablename>" +
					"<link_to>form146</link_to>" +
					"<title>Scheduled</title>" +
					"<notes>Manufacturing of product "+product+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	


		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form146_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form146_update_item(form);
		});
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
function form147_create_item(form)
{
	if(is_create_access('form147'))
	{
		var role=form.elements[0].value;
		var desc=form.elements[1].value;
		var status=form.elements[2].value;		
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<roles>" +
					"<id>"+data_id+"</id>" +
					"<role_name>"+role+"</role_name>" +
					"<description>"+desc+"</description>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</roles>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>roles</tablename>" +
					"<link_to>form147</link_to>" +
					"<title>Created</title>" +
					"<notes>Role "+role+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	


		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form147_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form147_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create Role
 * @param button
 */
function form148_create_item(form)
{
	if(is_create_access('form148'))
	{
		var master_form=document.getElementById('form148_master');
		var role=master_form.elements[1].value;
			
		var element_name=form.elements[0].getAttribute('data-i18n');
		element_name=element_name.substr(element_name.indexOf('.')+1);
		var re='unchecked';
		if(form.elements[1].checked)
			re='checked';
		var cr='unchecked';
		if(form.elements[2].checked)
			cr='checked';
		var up='unchecked';
		if(form.elements[3].checked)
			up='checked';
		var del='unchecked';
		if(form.elements[4].checked)
			del='checked';
		var data_id=form.elements[5].value;
		var element_id=form.elements[6].value;
		var last_updated=get_my_time();
		var data_xml="<access_control>" +
					"<id>"+data_id+"</id>" +
					"<username>"+role+"</username>" +
					"<element_id>"+element_id+"</element_id>" +
					"<element_name>"+element_name+"</element_name>" +
					"<re>"+re+"</re>" +
					"<cr>"+cr+"</cr>" +
					"<up>"+up+"</up>" +
					"<del>"+del+"</del>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</access_control>";	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}	
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form148_update_item(form);
		});
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
function form149_create_item(form)
{
	if(is_create_access('form149'))
	{
		var role=form.elements[0].value;
		var user=form.elements[1].value;
		var status=form.elements[2].value;		
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<user_role_mapping>" +
					"<id>"+data_id+"</id>" +
					"<role_name>"+role+"</role_name>" +
					"<username>"+user+"</username>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</user_role_mapping>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>user_role_mapping</tablename>" +
					"<link_to>form149</link_to>" +
					"<title>Assigned</title>" +
					"<notes>Role "+role+" to user "+user+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	


		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form149_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form149_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

function form150_post_feed()
{
	if(is_create_access('form150'))
	{
		var form=document.getElementById('form150_master');
		var title=form.elements[1].value;
		var detail=form.elements[2].value;
		var project_id=form.elements[3].value;
		var owner=get_account_name();
		var last_updated=get_my_time();
		var data_id=get_new_key();
		var data_xml="<feeds>" +
					"<id>"+data_id+"</id>" +
					"<content_type>text</content_type>"+
					"<content_title>"+title+"</content_title>" +
					"<content_detail>"+detail+"</content_detail>" +
					"<source>project</source>"+
					"<source_id>"+project_id+"</source_id>"+
					"<status>visible</status>" +
					"<owner>"+owner+"</owner>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</feeds>";
		create_simple(data_xml);
		
		form.elements[1].value="";
		form.elements[2].value="";
		form.elements[3].value="";
		
		var feed_content="<div class='feed_item'>"+
						"<br><div class='feed_title'>"+title+
						" <a class='small_cross_icon' onclick=\"delete_feed('"+data_id+"',$(this));\" title='Delete post'>&#10006;</a></div>"+
						"<br><u>"+owner+"</u>: <div class='feed_detail'>"+detail+"</div>"+
						"<br><div id='form150_likes_"+data_id+"' class='feed_likes'>"+
						"<img src='../images/thumbs_up_line.png' class='thumbs_icon' onclick=\"like_feed('"+data_id+"',$(this))\" title='Like this post'> <b id='form150_likes_count_"+data_id+"'>0</b> likes"+
						"</div>"+								
						"<br><div id='form150_comments_"+data_id+"' class='feed_comments'>"+
						"<label><u>"+owner+"</u>: <textarea class='feed_comments' placeholder='comment..'></textarea></label>"+
						"</div>"+
						"</div>";
		$('#form150_body').prepend(feed_content);
		$('#form150_comments_'+data_id).find('label').find('textarea').on('keyup',function(e)
		{
			if (e.keyCode==13) 
			{
				create_feed_comment(data_id,this);
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * formNo 151
 * form Service dashboard - item
 * @param button
 */
function form151_create_item(form)
{
	if(is_create_access('form151'))
	{
		var master_fields=document.getElementById('form151_master');
		var request_id=master_fields.elements[1].value;

		var item=form.elements[0].value;
		var quantity=form.elements[1].value;
		var est_amount=form.elements[2].value;
		var amount=form.elements[3].value;
		var status=form.elements[4].value;				
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		
		var data_xml="<service_request_items>" +
					"<id>"+data_id+"</id>" +
					"<request_id>"+request_id+"</request_id>"+
					"<item_name>"+item+"</item_name>" +
					"<est_amount>"+est_amount+"</est_amount>"+
					"<amount>"+amount+"</amount>"+
					"<quantity>"+quantity+"</quantity>" +
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_request_items>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>service_request_items</tablename>" +
					"<link_to>form151</link_to>" +
					"<title>Requested</title>" +
					"<notes>Item "+item+" for SR# "+request_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[7];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form151_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form151_update_item(form);
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};

/**
 * formNo 151
 * form Service dashboard - expense
 * @param button
 */
function form151_create_expense(form)
{
	if(is_create_access('form151'))
	{
		var master_fields=document.getElementById('form151_master');
		var request_id=master_fields.elements[1].value;

		var person=form.elements[0].value;
		var amount=form.elements[1].value;
		var detail=form.elements[2].value;
		var status=form.elements[3].value;				
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		
		var data_xml="<expenses>" +
					"<id>"+data_id+"</id>" +
					"<source_id>"+request_id+"</source_id>"+
					"<source>service request</source>"+
					"<person>"+person+"</person>"+
					"<amount>"+amount+"</amount>"+
					"<detail>"+detail+"</detail>" +
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</expenses>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>expenses</tablename>" +
					"<link_to>form151</link_to>" +
					"<title>Added</title>" +
					"<notes>Expense of Rs. "+amount+" for SR# "+request_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form151_delete_expense(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form151_update_expense(form);
		});	
	}
	else
	{
		$("#modal2").dialog("open");
	}
};


/**
 * @form Prepare Quotation
 * @formNo 153
 * @param button
 */
function form153_create_item(form)
{
	if(is_create_access('form153'))
	{
		var quot_id=document.getElementById("form153_master").elements[5].value;
		
		var name=form.elements[0].value;
		var description=form.elements[1].value;
		var quantity=form.elements[2].value;
		var unit=form.elements[3].value;
		var price=form.elements[4].value;
		//var tax=form.elements[5].value;
		var amount=form.elements[5].value;
		//var total=form.elements[7].value;
		//var discount=form.elements[8].value;
		var data_id=form.elements[6].value;		
		var save_button=form.elements[7];
		var del_button=form.elements[8];
		var type=form.elements[9];
		var last_updated=get_my_time();
		
		var data_xml="<quotation_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<description>"+description+"</description>"+
				"<unit>"+unit+"</unit>" +
				"<unit_price>"+price+"</unit_price>" +
				"<quantity>"+quantity+"</quantity>" +
				"<amount>"+amount+"</amount>" +
				//"<total>"+total+"</total>" +
				//"<discount>"+discount+"</discount>" +
				"<type>"+type+"</type>" +
				//"<tax>"+tax+"</tax>" +
				"<quotation_id>"+quot_id+"</quotation_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</quotation_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}

		
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form153_delete_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}



/**
 * @form Prepare Quotation
 * @formNo 153
 * @param button
 */
function form153_create_form()
{
	if(is_create_access('form153'))
	{
		var form=document.getElementById("form153_master");
		
		var customer=form.elements[1].value;
		var quot_type=form.elements[2].value;
		var quot_date=get_raw_time(form.elements[3].value);
		var intro_notes=form.elements[4].value;
		var save_button=form.elements[7];
		
		var amount=0;
		var discount=0;
		var tax=0;
		var tax_rate=0;
		
		if(document.getElementById('form153_discount'))
		{
			discount=parseFloat(document.getElementById('form153_discount').value);
			tax_rate=parseFloat(document.getElementById('form153_tax').value);
		}

		$("[id^='save_form153']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			//tax+=parseFloat(subform.elements[5].value);
			amount+=Math.round(parseFloat(subform.elements[5].value));
			//total+=Math.round(parseFloat(subform.elements[7].value));
			//discount+=parseFloat(subform.elements[8].value);
		});
		
		var tax=Math.round((tax_rate*((amount-discount)/100))).toFixed(2);
		var total=Math.round(amount+tax-discount).toFixed(2);

		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
	
		var data_xml="<quotation>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<date>"+quot_date+"</date>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<billing_type>"+quot_type+"</billing_type>" +
					"<discount>"+discount+"</discount>" +
					"<tax>"+tax+"</tax>" +
					"<tax_rate>"+tax_rate+"</tax_rate>" +
					"<status>generated</status>"+
					"<intro_notes>"+intro_notes+"</intro_notes>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</quotation>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>quotation</tablename>" +
					"<link_to>form152</link_to>" +
					"<title>Saved</title>" +
					"<notes>Quotation Id "+data_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";

		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}
		
		var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
					"<td>Amount:</br>Discount: </br>Tax:@ <input type='number' value='"+tax_rate+"' title='specify tax rate' step='any' id='form153_tax' class='dblclick_editable'>%</br>Total: </td>" +
					"<td>Rs. "+amount.toFixed(2)+"</br>" +
					"Rs. <input type='number' value='"+discount.toFixed(2)+"' step='any' id='form153_discount' class='dblclick_editable'></br>" +
					"Rs. "+tax+" <br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		$('#form153_foot').html(total_row);

		longPressEditable($('.dblclick_editable'));

		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form153_update_form();
		});
		
		$("[id^='save_form153_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create Bill(DLM)
 * @formNo 154
 * @param button
 */
function form154_create_product(form)
{
	if(is_create_access('form154'))
	{
		var storage=document.getElementById("form154_master").elements['store'].value;
		var bill_id=document.getElementById("form154_master").elements['bill_id'].value;
		
		var name=form.elements[0].value;
		var quantity=form.elements[1].value;
		var price=form.elements[2].value;
		//var tax=form.elements[3].value;
		var amount=form.elements[3].value;
		//var total=form.elements[5].value;
		//var discount=form.elements[6].value;
		var data_id=form.elements[4].value;
		var save_button=form.elements[5];
		var del_button=form.elements[6];
		
		var unit=$('#form154_unit_'+data_id).html();
		var last_updated=get_my_time();
		
		var data_xml="<bill_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<batch>"+name+"</batch>" +
				"<unit_price>"+price+"</unit_price>" +
				"<quantity>"+quantity+"</quantity>" +
				"<unit>"+unit+"</unit>"+				
				"<amount>"+amount+"</amount>" +
				//"<total>"+total+"</total>" +
				//"<discount>"+discount+"</discount>" +
				"<type>bought</type>" +
				//"<tax>"+tax+"</tax>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<storage>"+storage+"</storage>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";	
	
		create_simple(data_xml);
		
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form154_delete_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create Bill(DLM)
 * @formNo 154
 * @param button
 */
function form154_create_service(form)
{
	if(is_create_access('form154'))
	{
		var storage=document.getElementById("form154_master").elements['store'].value;
		var bill_id=document.getElementById("form154_master").elements['bill_id'].value;
		
		var name=form.elements[0].value;
		var quantity=form.elements[1].value;
		var price=form.elements[2].value;
		//var tax=form.elements[3].value;
		var amount=form.elements[3].value;
		//var total=form.elements[5].value;
		//var discount=form.elements[6].value;
		var data_id=form.elements[4].value;
		var save_button=form.elements[5];
		var del_button=form.elements[6];
		
		var unit=$('#form154_unit_'+data_id).html();

		var last_updated=get_my_time();
		
		var data_xml="<bill_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<item_desc></item_desc>" +
				"<batch>"+name+"</batch>" +
				"<unit_price>"+price+"</unit_price>" +
				"<quantity>"+quantity+"</quantity>" +
				"<unit>"+unit+"</unit>"+				
				"<amount>"+amount+"</amount>" +
				//"<total>"+total+"</total>" +
				//"<discount>"+discount+"</discount>" +
				"<type>bought</type>" +
				//"<tax>"+tax+"</tax>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<storage>"+storage+"</storage>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}

		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form154_delete_service_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create Bill(DLM)
 * @formNo 154
 * @param button
 */
function form154_create_hiring_item(form)
{
	if(is_create_access('form154'))
	{
		var storage=document.getElementById("form154_master").elements['store'].value;
		var bill_id=document.getElementById("form154_master").elements['bill_id'].value;
		
		var name=form.elements[0].value;
		var fresh='no';
		if(form.elements[1].checked)
		{
			fresh='yes';
		}
		var quantity=form.elements[2].value;
		var from_date=get_raw_time(form.elements[3].value);
		var to_date=get_raw_time(form.elements[4].value);
		var price=form.elements[6].value;
		//var tax=form.elements[7].value;
		var amount=form.elements[7].value;
		//var total=form.elements[9].value;
		//var discount=form.elements[10].value;
		var data_id=form.elements[8].value;
		var save_button=form.elements[9];
		var del_button=form.elements[10];

		var unit=$('#form154_unit_'+data_id).html();

		var last_updated=get_my_time();
		
		var data_xml="<bill_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<batch>"+name+"</batch>" +
				"<unit_price>"+price+"</unit_price>" +
				"<quantity>"+quantity+"</quantity>" +
				"<unit>"+unit+"</unit>"+				
				"<amount>"+amount+"</amount>" +
				//"<total>"+total+"</total>" +
				//"<discount>"+discount+"</discount>" +
				//"<tax>"+tax+"</tax>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<storage>"+storage+"</storage>"+
				"<from_date>"+from_date+"</from_date>"+
				"<to_date>"+to_date+"</to_date>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"<hired>yes</hired>"+
				"<fresh>"+fresh+"</fresh>"+
				"</bill_items>";	
	
		create_simple(data_xml);
		
		for(var i=0;i<8;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form154_delete_hiring_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create bill(DLM)
 * @formNo 154
 * @param button
 */
function form154_create_form()
{
	if(is_create_access('form154'))
	{
		var form=document.getElementById("form154_master");
		
		var customer=form.elements['customer'].value;
		var bill_type=form.elements['bill_type'].value;
		var tax_type=form.elements['tax_type'].value;
		var storage=form.elements['store'].value;		
		var bill_date=get_raw_time(form.elements['date'].value);
		var narration=form.elements['narration'].value;		
		var print_1_job='no';
		var cform='no';

		var tax_type=form.elements['tax_type'].value;
		
		var tax_text="VAT";
		if(tax_type=='CST' || tax_type=='Retail Central')
		{
			tax_text="CST";
		}

		if(form.elements['job'].checked)
			print_1_job='yes';
		var bill_num=form.elements['bill_num'].value;

		if(form.elements['cform'].checked)
			cform='yes';
		
		var hiring=false;
		if(bill_type=='Hiring')
			hiring=true;
		
		var amount=0;
		var discount=0;
		var tax_rate=0;
		var cartage=0;
		
		if(document.getElementById('form154_discount'))
		{
			discount=parseFloat(document.getElementById('form154_discount').value);
			tax_rate=parseFloat(document.getElementById('form154_tax').value);
			cartage=parseFloat(document.getElementById('form154_cartage').value);
		}
		
		$("[id^='save_form154']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			if(hiring)
			{
				//tax+=parseFloat(subform.elements[7].value);
				if(isNaN(parseFloat(subform.elements[7].value)))
					amount+=0;
				else
					amount+=Math.round(parseFloat(subform.elements[7].value));
				//total+=Math.round(parseFloat(subform.elements[9].value));
				//discount+=parseFloat(subform.elements[10].value);
			}
			else if(bill_type=='Installation' || bill_type=='Repair')
			{			
				//tax+=parseFloat(subform.elements[3].value);
				if(isNaN(parseFloat(subform.elements[3].value)))
					amount+=0;
				else
					amount+=Math.round(parseFloat(subform.elements[3].value));
				//total+=Math.round(parseFloat(subform.elements[5].value));
				//discount+=parseFloat(subform.elements[6].value);
			}
			else
			{			
				//tax+=parseFloat(subform.elements[3].value);
				if(isNaN(parseFloat(subform.elements[3].value)))
					amount+=0;
				else
					amount+=Math.round(parseFloat(subform.elements[3].value));
				//total+=Math.round(parseFloat(subform.elements[5].value));
				//discount+=parseFloat(subform.elements[6].value);
			}
		});

		var tax=Math.round((tax_rate*((amount-discount)/100)));		
		var total=Math.round(amount+tax-discount+cartage).toFixed(2);
	
		form.elements['bill_total'].value=total;

		var data_id=form.elements['bill_id'].value;
		var transaction_id=form.elements['t_id'].value;
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
					"<tax_type>"+tax_type+"</tax_type>" +
					"<discount>"+discount+"</discount>" +
					"<cartage>0</cartage>" +
					"<tax>"+tax+"</tax>" +
					"<tax_rate>"+tax_rate+"</tax_rate>"+
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<storage>"+storage+"</storage>"+
					"<print_1_job>"+print_1_job+"</print_1_job>"+
					"<cform>"+cform+"</cform>"+
					"<notes>"+narration+"</notes>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bills</tablename>" +
					"<link_to>form92</link_to>" +
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
					"<status>pending</status>" +
					"<type>received</type>" +
					"<date>"+get_my_time()+"</date>" +
					"<total_amount>"+total+"</total_amount>" +
					"<paid_amount>"+total+"</paid_amount>" +
					"<acc_name>"+customer+"</acc_name>" +
					"<due_date>"+get_credit_period()+"</due_date>" +
					"<mode>"+get_payment_mode()+"</mode>" +
					"<transaction_id>"+pt_tran_id+"</transaction_id>" +
					"<bill_id>"+data_id+"</bill_id>" +
					"<source_info>for sale bill #"+bill_num+"</source_info>"+
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
				var num_xml="<user_preferences>"+
							"<id>"+bill_num_ids[0]+"</id>"+
							"<value>"+(parseInt(bill_num)+1)+"</value>"+
							"<last_updated>"+last_updated+"</last_updated>"+
							"</user_preferences>";
				if(is_online())
				{
					server_update_simple(num_xml);
				}
				else 
				{
					local_update_simple(num_xml);
				}
			}
		},num_data);

		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
			server_create_simple(transaction_xml);
			server_create_simple(pt_xml);
			server_create_simple_func(payment_xml,function()
			{
				//modal26_action(pt_tran_id);
			});
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(transaction_xml);
			local_create_simple(pt_xml);
			local_create_simple_func(payment_xml,function()
			{
				//modal26_action(pt_tran_id);
			});
		}
		
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Amount:<disc><br>Discount: </disc><br>"+tax_text+":@ <input type='number' value='"+tax_rate+"' step='any' id='form154_tax' class='dblclick_editable'>%<br>Cartage: <br>Total: </td>" +
					"<td>Rs. "+amount.toFixed(2)+"</br>" +
					"<disc_amount>Rs. <input type='number' value='"+discount.toFixed(2)+"' step='any' id='form154_discount' class='dblclick_editable'></br></disc_amount>" +
					"Rs. "+tax.toFixed(2)+"<br>" +
					"Rs. <input type='number' value='0.00' step='any' id='form154_cartage' class='dblclick_editable'></br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		if(hiring)
		{
			total_row="<tr><td colspan='4' data-th='Total'>Total</td>" +
					"<td>Amount:<disc><br>Discount: </disc><br>Service Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form154_tax' class='dblclick_editable'>% <br>Cartage: <br>Total: </td>" +
					"<td>Rs. "+amount.toFixed(2)+"</br>" +
					"<disc_amount>Rs. <input type='number' value='"+discount.toFixed(2)+"' step='any' id='form154_discount' class='dblclick_editable'><br><disc_amount>" +
					"Rs. "+tax.toFixed(2)+"<br>" +
					"Rs. <input type='number' value='0.00' step='any' id='form154_cartage' class='dblclick_editable'></br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";

		}
		else if(bill_type=='Service')
		{
			total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Amount:<disc><br>Discount: </disc><br>Service Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form154_tax' class='dblclick_editable'>%<br>Cartage: <br>Total: </td>" +
					"<td>Rs. "+amount.toFixed(2)+"</br>" +
					"<disc_amount>Rs. <input type='number' value='"+discount.toFixed(2)+"' step='any' id='form154_discount' class='dblclick_editable'></br></disc_amount>" +
					"Rs. "+tax.toFixed(2)+" <br>" +
					"Rs. <input type='number' value='0.00' step='any' id='form154_cartage' class='dblclick_editable'></br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		}

		$('#form154_foot').html(total_row);
		longPressEditable($('.dblclick_editable'));

		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form154_update_form();
		});
		
		$("[id^='save_form154_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Store Placement (DLM)
 * @param button
 */
function form156_create_item(form)
{
	if(is_create_access('form156'))
	{
		var product_name=form.elements[0].value;
		var name=form.elements[1].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<area_utilization>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+product_name+"</item_name>" +
					"<batch>"+product_name+"</batch>" +
					"<name>"+name+"</name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</area_utilization>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>area_utilization</tablename>" +
					"<link_to>form156</link_to>" +
					"<title>Added</title>" +
					"<notes>Item "+product_name+" to storage area "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var save_button=form.elements[4];
		$(save_button).hide();
		var del_button=form.elements[5];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form156_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Store Movement (DLM)
 * @param button
 */
function form157_create_item(form)
{
	if(is_create_access('form157'))
	{
		var product_name=form.elements[0].value;
		var quantity=form.elements[1].value;
		var source=form.elements[2].value;
		var target=form.elements[3].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var receiver=form.elements[6].value;
		//console.log(receiver);
		var last_updated=get_my_time();
		var data_xml="<store_movement>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+product_name+"</item_name>" +
					"<batch>"+product_name+"</batch>" +
					"<quantity>"+quantity+"</quantity>" +
					"<source>"+source+"</source>"+
					"<target>"+target+"</target>"+
					"<status>"+status+"</status>"+
					"<dispatcher>"+get_account_name()+"</dispatcher>"+
					"<receiver>"+receiver+"</receiver>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</store_movement>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>store_movement</tablename>" +
					"<link_to>form157</link_to>" +
					"<title>New</title>" +
					"<notes>Store movement initiated for item "+product_name+" from storage area "+source+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var save_button=form.elements[7];
		$(save_button).hide();
		var del_button=form.elements[8];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form157_delete_item(del_button);
		});
		
		var dispatch_button=form.elements[9];
		$(dispatch_button).show();
		
		///////////adding store placement////////
		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+target+"</name>" +
				"<item_name exact='yes'>"+product_name+"</item_name>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0 && target!="")
			{
				var storage_xml="<area_utilization>" +
						"<id>"+get_new_key()+"</id>" +
						"<name>"+target+"</name>" +
						"<item_name>"+product_name+"</item_name>" +
						"<batch>"+product_name+"</batch>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				if(is_online())
				{
					server_create_simple(storage_xml);
				}
				else
				{
					local_create_simple(storage_xml);
				}
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Enter Purchase Bill (DLM)
 * @formNo 158
 * @param button
 */
function form158_create_item(form)
{
	if(is_create_access('form158'))
	{
		var master_form=document.getElementById("form158_master");
		
		var imported=master_form.elements['imported'].checked;
		var bill_id=master_form.elements['bill_id'].value;
		
		var name=form.elements[0].value;
		var quantity=form.elements[1].value;
		var price=form.elements[2].value;
		var amount=form.elements[3].value;
		//var amount=total-tax;
		var storage=form.elements[4].value;
		var data_id=form.elements[5].value;
		var save_button=form.elements[6];
		var del_button=form.elements[7];
		var last_updated=get_my_time();
		var unit=$('#form158_unit_'+data_id).html();
	
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
				"<bill_id>"+bill_id+"</bill_id>" +
				"<storage>"+storage+"</storage>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</supplier_bill_items>";	
	
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}
				
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form158_delete_item(del_button);
		});

		$(save_button).off('click');
		
		///////////adding store placement////////
		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+storage+"</name>" +
				"<item_name exact='yes'>"+name+"</item_name>" +
				"<batch exact='yes'>"+name+"</batch>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0)
			{
				var storage_xml="<area_utilization>" +
						"<id>"+get_new_key()+"</id>" +
						"<name>"+storage+"</name>" +
						"<item_name>"+name+"</item_name>" +
						"<batch>"+name+"</batch>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				if(is_online())
				{
					server_create_simple(storage_xml);
				}
				else
				{
					local_create_simple(storage_xml);
				}
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Enter Purchase Bill (DLM)
 * @param button
 */
function form158_create_form()
{
	if(is_create_access('form158'))
	{
		var form=document.getElementById("form158_master");
		
		var supplier=form.elements['supplier'].value;
		var bill_id=form.elements['bill_num'].value;
		var bill_date=get_raw_time(form.elements['date'].value);
		var imported='no';
		var notes='Local Purchase';
		if(form.elements['imported'].checked)
		{
			imported='yes';
			notes='Imported';
		}
		
		var amount=0;
		
		$("[id^='save_form158']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			
			if(isNaN(parseFloat(subform.elements[3].value)))
				amount+=0;
			else	
				amount+=parseFloat(subform.elements[3].value);
		});

		var discount=0;
		var tax_rate=0;
		var cartage=0;
		
		if(document.getElementById('form158_discount'))
		{
			discount=parseFloat(document.getElementById('form158_discount').value);
			tax_rate=parseFloat(document.getElementById('form158_tax').value);
			cartage=parseFloat(document.getElementById('form158_cartage').value);
		}
		
		var tax=Math.round((tax_rate*((amount-discount)/100)));		
		var total=Math.round(amount+tax-discount+cartage);

		var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
							"<td>Amount:<br>Discount: <br>Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form158_tax' class='dblclick_editable'>%<br>Cartage: <br>Total: </td>" +
							"<td>Rs. "+Math.round(amount)+"</br>" +
							"<disc_amount>Rs. <input type='number' value='"+Math.round(discount)+"' step='any' id='form158_discount' class='dblclick_editable'><br></disc_amount>" +
							"Rs. "+tax+" <br>" +
							"Rs. <input type='number' value='"+Math.round(cartage)+"' step='any' id='form158_cartage' class='dblclick_editable'><br>" +
							"Rs. "+Math.round(total)+"</td>" +
							"<td></td>" +
							"</tr>";
					
		$('#form158_foot').html(total_row);
		longPressEditable($('.dblclick_editable'));

		var data_id=form.elements['bill_id'].value;
		var transaction_id=form.elements['t_id'].value;
		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var data_xml="<supplier_bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<total>"+total+"</total>" +
					"<discount>"+discount+"</discount>" +
					"<amount>"+amount+"</amount>" +
					"<cartage>"+cartage+"</cartage>"+
					"<tax>"+tax+"</tax>" +
					"<tax_rate>"+tax_rate+"</tax_rate>"+
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<imported>"+imported+"</imported>" +
					"<notes>"+notes+"</notes>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>supplier_bills</tablename>" +
					"<link_to>form53</link_to>" +
					"<title>Saved</title>" +
					"<notes>Supplier Bill no "+bill_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
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
					"<bill_id>"+data_id+"</bill_id>" +
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
			form158_update_form();
		});
		
		$("[id^='save_form158_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Checklist Items
 * @formNo 161
 * @param button
 */
function form161_create_item(form)
{
	if(is_create_access('form161'))
	{
		var cp=form.elements[0].value;
		var desired_result=form.elements[1].value;
		var status=form.elements[2].value;
		var data_id=form.elements[3].value;
		var save_button=form.elements[4];
		var del_button=form.elements[5];
		var last_updated=get_my_time();
			
		var data_xml="<checklist_items>" +
				"<id>"+data_id+"</id>" +
				"<checkpoint unique='yes'>"+cp+"</checkpoint>" +
				"<desired_result>"+desired_result+"</desired_result>" +
				"<status>"+status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</checklist_items>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>checklist_items</tablename>" +
					"<link_to>form161</link_to>" +
					"<title>Added</title>" +
					"<notes>Item Checkpoint "+cp+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";

		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}
				
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form161_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form161_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Product Checklist
 * @formNo 162
 * @param button
 */
function form162_create_item(form)
{
	if(is_create_access('form162'))
	{
		var item=form.elements[0].value;
		var cp=form.elements[1].value;
		var desired_result=form.elements[2].value;
		var data_id=form.elements[3].value;
		var save_button=form.elements[4];
		var del_button=form.elements[5];
		var last_updated=get_my_time();
			
		var data_xml="<checklist_mapping>" +
				"<id>"+data_id+"</id>" +
				"<item>"+item+"</item>"+
				"<checkpoint>"+cp+"</checkpoint>" +
				"<desired_result>"+desired_result+"</desired_result>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</checklist_mapping>";

		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}
				
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form162_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form162_update_item(form);
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
 * @param button
 */
function form167_create_item(form)
{
	if(is_create_access('form167'))
	{
		var name=form.elements[0].value;
		var parent=form.elements[1].value;
		var length=form.elements[2].value;
		var breadth=form.elements[3].value;
		var height=form.elements[4].value;
		var unit=form.elements[5].value;
		var data_id=form.elements[6].value;
		var save_button=form.elements[7];
		var del_button=form.elements[8];
		var last_updated=get_my_time();
			
		var data_xml="<storage_structure>" +
				"<id>"+data_id+"</id>" +
				"<name>"+name+"</name>" +
				"<parent>"+parent+"</parent>" +
				"<len>"+length+"</len>" +
				"<breadth>"+breadth+"</breadth>" +
				"<height>"+height+"</height>" +
				"<unit>"+unit+"</unit>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</storage_structure>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>storage_structure</tablename>" +
					"<link_to>form167</link_to>" +
					"<title>Added</title>" +
					"<notes>Storage type of "+name+" to structure</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";

		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}
				
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form167_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form167_update_item(form);
		});
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
function form171_create_item(form)
{
	if(is_create_access('form171'))
	{
		show_loader();

		var name=form.elements[0].value;
		var details=form.elements[1].value;
		var dead_weight_factor=form.elements[2].value;
		var data_id=form.elements[3].value;
		var del_button=form.elements[5];
		var last_updated=get_my_time();
		var data_xml="<sale_channels>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"</name>" +
					"<details>"+details+"</details>" +
					"<dead_weight_factor>"+dead_weight_factor+"</dead_weight_factor>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_channels>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_channels</tablename>" +
					"<link_to>form171</link_to>" +
					"<title>Added</title>" +
					"<notes>Sale channel "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var pickup_xml="<pickup_charges>" +
					"<id>"+get_new_key()+"</id>" +
					"<channel>"+name+"</channel>" +
					"<pincode>all</pincode>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</pickup_charges>";
		var time_xml="<user_preferences>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"_order_time_limit</name>" +
					"<display_name>Sale order time limit for "+name+" (in hours)</display_name>"+					
					"<value>48</value>" +
					"<status>active</status>" +
					"<type>accounting</type>"+
					"<shortcut></shortcut>"+
					"<sync>checked</sync>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</user_preferences>";

		create_row(data_xml,activity_xml);
		create_simple(pickup_xml);
		create_simple(time_xml);
		
		var product_data="<product_master>" +
					"<id></id>" +
					"<name></name>" +
					"<description></description>"+
					"</product_master>";
		fetch_requested_data('',product_data,function(items)
		{
			var sku_mapping_xml="<sku_mapping>";
			var cat_sku_mapping_xml="<category_sku_mapping>";
			var channel_price_xml="<channel_prices>";
			var id=parseFloat(get_new_key());
			var counter=0;
			var last_updated=get_my_time();
			items.forEach(function(item)
			{
				if(counter==500)
				{
					counter=0;
					sku_mapping_xml+="</sku_mapping><separator></separator><sku_mapping>";
					cat_sku_mapping_xml+="</category_sku_mapping><separator></separator><category_sku_mapping>";
					channel_price_xml+="</channel_prices><separator></separator><channel_prices>";
				}
				sku_mapping_xml+="<row>" +
						"<id>"+id+"</id>" +
						"<channel>"+name+"</channel>"+
						"<system_sku>"+item.name+"</system_sku>"+
						"<item_desc>"+item.description+"</item_desc>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</row>";
				cat_sku_mapping_xml+="<row>" +
						"<id>"+id+"</id>" +
						"<channel>"+name+"</channel>" +
						"<sku>"+item.name+"</sku>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</row>";
				channel_price_xml+="<row>" +
						"<id>"+id+"</id>" +
						"<channel>"+name+"</channel>" +
						"<item>"+item.name+"</item>" +
						//"<latest>yes</latest>"+
						"<from_time>"+last_updated+"</from_time>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</row>";
				id+=1;
				counter+=1;
			});
			sku_mapping_xml+="</sku_mapping>";
			cat_sku_mapping_xml+="</category_sku_mapping>";
			channel_price_xml+="</channel_prices>";
			
			create_batch(sku_mapping_xml);
			create_batch(cat_sku_mapping_xml);
			create_batch(channel_price_xml);
			
		});

		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form171_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form171_update_item(form);
		});
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
function form172_create_item(fields)
{
	if(is_create_access('form172'))
	{
		var channel=fields.elements[0].value;
		var sku=fields.elements[1].value;
		var from_time=get_raw_time(fields.elements[2].value);
		var mrp=fields.elements[3].value;
		var discount_customer=fields.elements[4].value;
		var sale_price=fields.elements[5].value;
		var freight=fields.elements[6].value;
		var commission_percentage=fields.elements[7].value;
		var commission_charges=fields.elements[8].value;
		var pickup=fields.elements[9].value;
		var others=fields.elements[10].value;
		var service_tax=fields.elements[11].value;
		var total_charges=fields.elements[12].value;
		var cost_price=fields.elements[13].value;
		var profit=fields.elements[14].value;
		var profit_mrp=fields.elements[15].value;
		var profit_sp=fields.elements[16].value;
		var data_id=fields.elements[17].value;
		var del_button=fields.elements[19];
		
		var last_updated=get_my_time();
		var data_xml="<channel_prices>" +
				"<id>"+data_id+"</id>" +
				"<channel>"+channel+"</channel>" +
				"<item>"+sku+"</item>" +
				"<sale_price>"+sale_price+"</sale_price>"+
				"<cost_price>"+cost_price+"</cost_price>"+
				"<mrp>"+mrp+"</mrp>"+
				"<freight>"+freight+"</freight>"+
				"<pickup_charges>"+pickup+"</pickup_charges>"+
				"<discount_customer>"+discount_customer+"</discount_customer>"+
				"<gateway_charges>"+others+"</gateway_charges>"+
				"<channel_commission_percentage>"+commission_percentage+"</channel_commission_percentage>"+
				"<channel_commission>"+commission_charges+"</channel_commission>"+
				"<total_charges>"+total_charges+"</total_charges>"+
				"<service_tax>"+service_tax+"</service_tax>"+
				"<total_payable>"+(parseFloat(total_charges))+"</total_payable>"+
				"<total_receivable>"+(parseFloat(sale_price)+parseFloat(freight)-parseFloat(total_charges))+"</total_receivable>"+
				"<profit_mrp>"+profit_mrp+"</profit_mrp>"+
				"<profit_sp>"+profit_sp+"</profit_sp>"+
				"<profit>"+profit+"</profit>"+
				"<from_time>"+from_time+"</from_time>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</channel_prices>";

		create_simple(data_xml);
		
		for(var i=0;i<15;i++)
		{
			$(fields.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form172_delete_item(del_button);
		});
		
		$(fields).off('submit');
		$(fields).on('submit',function(event)
		{
			event.preventDefault();
		});		
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form SKU mappings
 * @formNo 173
 */
function form173_create_item(form)
{
	if(is_create_access('form173'))
	{
		var channel=form.elements[0].value;
		var channel_sku=form.elements[1].value;
		var vendor_sku=form.elements[2].value;
		var system_sku=form.elements[3].value;
		var description=form.elements[4].value;
		var data_id=form.elements[5].value;
		var del_button=form.elements[7];
		var last_updated=get_my_time();
		var data_xml="<sku_mapping>" +
					"<id>"+data_id+"</id>" +
					"<channel>"+channel+"</channel>" +
					"<item_desc>"+description+"</item_desc>" +
					"<channel_sku>"+channel_sku+"</channel_sku>" +
					"<channel_system_sku>"+vendor_sku+"</channel_system_sku>" +
					"<system_sku>"+system_sku+"</system_sku>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sku_mapping>";
		create_simple(data_xml);

		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form173_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form173_update_item(form);
		});
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
function form174_create_item(form)
{
	if(is_create_access('form174'))
	{
		var channel=form.elements[0].value;
		var pincode=form.elements[1].value;
		var minimum=form.elements[2].value;
		var maximum=form.elements[3].value;
		var rate=form.elements[4].value;
		var data_id=form.elements[5].value;
		var del_button=form.elements[7];
		var last_updated=get_my_time();
		var data_xml="<pickup_charges>" +
					"<id>"+data_id+"</id>" +
					"<channel>"+channel+"</channel>" +
					"<pincode>"+pincode+"</pincode>" +
					"<min_charges>"+minimum+"</min_charges>" +
					"<max_charges>"+maximum+"</max_charges>" +
					"<rate>"+rate+"</rate>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</pickup_charges>";

		create_simple(data_xml);
		
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form174_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form174_update_item(form);
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
function form175_create_item(form)
{
	if(is_create_access('form175'))
	{
		var channel=form.elements[0].value;
		var type=form.elements[1].value;
		var name=form.elements[2].value;
		var parent=form.elements[3].value;
		var commission=form.elements[4].value;
		var data_id=form.elements[5].value;
		var del_button=form.elements[7];
		var last_updated=get_my_time();
		var data_xml="<channel_category>" +
					"<id>"+data_id+"</id>" +
					"<channel>"+channel+"</channel>" +
					"<type>"+type+"</type>" +
					"<name>"+name+"</name>" +
					"<parent>"+parent+"</parent>" +
					"<commission>"+commission+"</commission>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</channel_category>";

		create_simple(data_xml);
		
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form175_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form175_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Category Item mapping
 * @formNo 176
 * @param button
 */
function form176_create_item(form)
{
	if(is_create_access('form176'))
	{
		var channel=form.elements[0].value;
		var type=form.elements[1].value;
		var category=form.elements[2].value;
		var item=form.elements[3].value;
		var desc=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<category_sku_mapping>" +
					"<id>"+data_id+"</id>" +
					"<channel>"+channel+"</channel>" +
					"<cat_type>"+type+"</cat_type>" +
					"<cat_name>"+category+"</cat_name>" +
					"<sku>"+item+"</sku>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</category_sku_mapping>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>category_sku_mapping</tablename>" +
					"<link_to>form176</link_to>" +
					"<title>Mapped</title>" +
					"<notes>Item "+item+" to category "+category+" for channel "+channel+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form176_update_item(form);
		});	
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
function form177_create_item(form)
{
	if(is_create_access('form177'))
	{
		show_loader();

		var type=form.elements[0].value;
		var name=form.elements[1].value;
		var values=form.elements[2].value;
		var threshold=form.elements[3].value;
		var data_id=form.elements[4].value;
		var del_button=form.elements[6];
		var last_updated=get_my_time();
		var data_xml="<prioritization_parameters>" +
					"<id>"+data_id+"</id>" +
					"<type>"+type+"</type>" +
					"<name>"+name+"</name>" +
					"<values>"+values+"</values>" +
					"<threshold>"+threshold+"</threshold>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</prioritization_parameters>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>prioritization_parameters</tablename>" +
					"<link_to>form177</link_to>" +
					"<title>Added</title>" +
					"<notes>"+name+" parameter for prioritization of "+type+"s</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		
		create_row(data_xml,activity_xml);
		
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form177_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form177_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form New Purchase Order (CPS)
 * @param button
 */
function form178_create_item(form)
{
	if(is_create_access('form178'))
	{
		var order_id=document.getElementById("form178_master").elements['order_id'].value;
		
		var name=form.elements[0].value;
		var quantity=form.elements[1].value;
		var make=form.elements[2].value;
		var mrp=form.elements[3].value;
		var price=form.elements[4].value;
		var amount=form.elements[5].value;
		var tax=form.elements[6].value;
		var total=form.elements[7].value;
		var data_id=form.elements[8].value;
		var save_button=form.elements[9];
		var del_button=form.elements[10];
		var last_updated=get_my_time();
		var data_xml="<purchase_order_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<quantity>"+quantity+"</quantity>" +
				"<order_id>"+order_id+"</order_id>" +
				"<make>"+make+"</make>" +
				"<mrp>"+mrp+"</mrp>" +
				"<price>"+price+"</price>" +
				"<amount>"+amount+"</amount>"+
				"<tax>"+tax+"</tax>"+
				"<total>"+total+"</total>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</purchase_order_items>";	
	
		create_simple(data_xml);
		
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form178_delete_item(del_button);
		});
		
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form New Purchase Order (CPS)
 * @param button
 */
function form178_create_form()
{
	if(is_create_access('form178'))
	{
		var form=document.getElementById("form178_master");
		var supplier=form.elements['supplier'].value;
		var order_date=get_raw_time(form.elements['date'].value);		
		var order_num=form.elements['order_num'].value;
		var status=form.elements['status'].value;
		var data_id=form.elements['order_id'].value;
		var save_button=form.elements['save'];
		
		$('#form178_share').show();
		$('#form178_share').click(function()
		{
			modal101_action('Purchase Order',supplier,'supplier',function (func) 
			{
				print_form178(func);
			});
		});
		
		var amount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form178']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			
			if(!isNaN(parseFloat(subform.elements[5].value)))
			{
				amount+=parseFloat(subform.elements[5].value);
				tax+=parseFloat(subform.elements[6].value);
				total+=parseFloat(subform.elements[7].value);
			}
		});
		
		var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
								"<td>Amount:<br>Tax: <br>Total: </td>" +
								"<td>Rs. "+amount+"<br>" +
								"Rs. "+tax+"<br> " +
								"Rs. "+total+"</td>" +
								"<td></td>" +
								"</tr>";
						
		$('#form178_foot').html(total_row);

		var last_updated=get_my_time();		
		var data_xml="<purchase_orders>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<order_date>"+order_date+"</order_date>" +
					"<status>"+status+"</status>" +
					"<priority>0</priority>" +
					"<order_num>"+order_num+"</order_num>" +
					"<amount>"+amount+"</amount>"+
					"<tax>"+tax+"</tax>"+
					"<total>"+total+"</total>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</purchase_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>purchase_orders</tablename>" +
					"<link_to>form179</link_to>" +
					"<title>Created</title>" +
					"<notes>Purchase order # "+order_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		
		var num_data="<user_preferences>"+
						"<id></id>"+						
						"<name exact='yes'>po_num</name>"+												
						"</user_preferences>";
		get_single_column_data(function (bill_num_ids)
		{
			if(bill_num_ids.length>0)
			{
				var num_xml="<user_preferences>"+
							"<id>"+bill_num_ids[0]+"</id>"+
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
			form178_update_form();
		});
		
		$("[id^='save_form178_']").click();
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

/**
 * This function transforms a sale order into a bill
 * It is applicable for product bills only
 * @form 181
 * @param order_id
 */
function form181_bill(order_id,bill_type,order_num,customer)
{
	///check following data is adequately updated
	//a. product batches
	//b. channel prices
	//c. pickup charges
	if(is_create_access('form181'))
	{
		console.log(bill_type);
		show_loader();
		var bill_amount=0;
		var bill_total=0;
		var bill_freight=0;
		var bill_tax=0;
		var bill_channel_charges=0;
		var bill_channel_tax=0;
		var bill_channel_payable=0;
													
		var pending_items_count=0;

		var actual_order_items=[];
		var order_items=[];
		var bill_key=get_new_key();								
								
		$("#modal159_item_table tr").each(function(index)
		{
			var checked=false;
			if($(this).find('td:nth-child(3)>input').length>0)
				checked=$(this).find('td:nth-child(3)>input')[0].checked;
			var order_item=new Object();
							
			if(checked)
			{
				order_item=JSON.parse($(this).attr('data-object'));
				order_items.push(order_item);
			}
			actual_order_items.push(order_item);
		});

		//console.log(order_items);
		//console.log(actual_order_items);
		
		if(!(order_items.length!=(actual_order_items.length-1) && get_session_var('allow_partial_billing')=='no'))
		{
			if(order_items.length>0)
			{
				pending_items_count=order_items.length;
				console.log(order_items);
				
				var bill_items_xml_array=[];
				var order_items_xml_array=[];
				
				order_items.forEach(function(order_item)
				{
					var item_amount=order_item.amount;
					var item_total=order_item.total;
					var item_tax=order_item.tax;
					var item_mrp=order_item.mrp;
					var item_tax_rate=order_item.tax_rate;
									
					var batch_data="<product_instances>" +
							"<batch></batch>" +
							"<product_name exact='yes'>"+order_item.item_name+"</product_name>" +
							"<last_updated></last_updated>" +
							"</product_instances>";
					fetch_requested_data('',batch_data,function(batches_array)
					{
						//console.log(batches_array);
						batches_array.sort(function(a,b)
						{
							if(parseFloat(a.last_updated)>parseFloat(b.last_updated))
							{	return 1;}
							else 
							{	return -1;}
						});
						var batches=[];
						batches_array.forEach(function (batches_array_elem) 
						{
							//console.log(batches_array_elem);
							batches.push(batches_array_elem.batch);
						});
						
						console.log(batches);
						
						var single_batch=batches[0];
						var batches_result_array=[];
						get_available_batch(order_item.item_name,batches,order_item.quantity,batches_result_array,function()
						{
							var unit_price=item_amount/parseFloat(order_item.quantity);
							
							console.log(batches_result_array);
							if(batches_result_array.length===0)
							{
								var single_batch_object=new Object();
								single_batch_object.batch=single_batch;
								single_batch_object.quantity=order_item.quantity;
								
								batches_result_array.push(single_batch_object);
							}
							
							pending_items_count+=batches_result_array.length-1;
							
							batches_result_array.forEach(function(batch_result)
							{
								var storage_xml="<area_utilization>"+
												"<name></name>"+
												"<item_name exact='yes'>"+order_item.item_name+"</item_name>"+
												"<batch exact='yes'>"+batch_result.batch+"</batch>"+
												"</area_utilization>";
																					
								get_single_column_data(function (storages) 
								{
									var storage_result_array=[];
									get_available_storage(order_item.item_name,batch_result.batch,storages,batch_result.quantity,storage_result_array,function () 
									{
										console.log(storage_result_array);
										var item_storage="";
										if(storage_result_array.length>0)
										{
											item_storage=storage_result_array[0].storage;
										}
										/////saving to bill item
										
										var bill_item_amount=my_round((item_amount*batch_result.quantity/order_item.quantity),2);
										var bill_item_total=my_round((item_total*batch_result.quantity/order_item.quantity),2);
										var bill_item_tax=my_round((item_tax*batch_result.quantity/order_item.quantity),2);
										
										var bill_item_id=get_new_key();
						                var data_xml="<bill_items>" +
												"<id>"+bill_item_id+"</id>" +
												"<item_name>"+order_item.item_name+"</item_name>" +
												"<batch>"+batch_result.batch+"</batch>" +
												"<unit_price>"+unit_price+"</unit_price>" +
												"<mrp>"+item_mrp+"</mrp>" +
												"<quantity>"+batch_result.quantity+"</quantity>" +
												"<amount>"+bill_item_amount+"</amount>" +
												"<total>"+bill_item_total+"</total>" +
												"<tax>"+bill_item_tax+"</tax>" +
												"<tax_rate>"+item_tax_rate+"</tax_rate>" +
												"<bill_id>"+bill_key+"</bill_id>" +
												"<storage>"+item_storage+"</storage>"+
												"<last_updated>"+get_my_time()+"</last_updated>" +
												"</bill_items>";	
												
										bill_items_xml_array.push(data_xml);
										
										bill_amount+=bill_item_amount;
										bill_total+=bill_item_total;
										bill_tax+=bill_item_tax;
										
										pending_items_count-=1;
									});
									
								},storage_xml);	
							});					
						});
					});
				});
			
				/////saving bill details
				var bill_items_complete=setInterval(function()
				{
			  	   if(pending_items_count===0)
			  	   {
			  		   	clearInterval(bill_items_complete);
			  		   	
		  		   		var num_data="<user_preferences>"+
									"<id></id>"+						
									"<value></value>"+										
									"<name exact='yes'>"+bill_type+"_bill_num</name>"+												
									"</user_preferences>";
						fetch_requested_data('',num_data,function (bill_num_ids)
						{
							if(bill_num_ids.length>0)
							{
								//////////////////////////////////////////////
								var sale_order_xml="<sale_orders>"+
											"<id>"+order_id+"</id>" +
											"<bill_id></bill_id>" +
											"<total_quantity></total_quantity>"+
											"</sale_orders>";
								fetch_requested_data('',sale_order_xml,function (sorders) 
								{
									if(sorders.length>0)
									{
										var id_object_array=[];
										if(sorders[0].bill_id!="" && sorders[0].bill_id!=0 && sorders[0].bill_id!="null")
										{
											id_object_array=JSON.parse(sorders[0].bill_id);
										}
										
										var id_object=new Object();
										id_object.bill_num=bill_num_ids[0].value;
										id_object.bill_id=bill_key;
																				
										id_object.quantity=0;
										for(var j in order_items)
										{
											id_object.quantity+=parseFloat(order_items[j].quantity);											
										}
										id_object_array.push(id_object);
						
										var master_total_quantity=0;				
										for(var k in id_object_array)
										{
											master_total_quantity+=parseFloat(id_object_array[k].quantity);
										}
										
										var status='partially billed';				
										if(master_total_quantity==parseFloat(sorders[0].total_quantity))
										{
											status='billed';
										}

										var new_bill_id=JSON.stringify(id_object_array);
										//console.log(new_bill_id);
										var so_xml="<sale_orders>" +
												"<id>"+order_id+"</id>" +
												"<bill_id>"+new_bill_id+"</bill_id>" +
												"<status>"+status+"</status>" +
												"<last_updated>"+get_my_time()+"</last_updated>" +
												"</sale_orders>";
										update_simple_func(so_xml,function () 
										{
											form181_ini();
										});					
									}
								});	
								/////////////////////////////////////////////		  						
		  						var bill_key_string=""+bill_key;	

		  						var num_xml="<user_preferences>"+
										"<id>"+bill_num_ids[0].id+"</id>"+
										"<value>"+(parseInt(bill_num_ids[0].value)+1)+"</value>"+
										"<last_updated>"+get_my_time()+"</last_updated>"+
										"</user_preferences>";
								var bill_xml="<bills>" +
										"<id>"+bill_key+"</id>" +
										"<bill_num>"+bill_num_ids[0].value+"</bill_num>"+										
										"<order_num>"+order_num+"</order_num>"+										
										"<order_id>"+order_id+"</order_id>"+										
										"<customer_name>"+customer+"</customer_name>" +
										"<bill_date>"+get_my_time()+"</bill_date>" +
										"<billing_type>"+bill_type+"</billing_type>" +
										"<amount>"+bill_amount+"</amount>" +
										"<total>"+bill_total+"</total>" +
										"<discount>0</discount>" +
										"<tax>"+bill_tax+"</tax>" +
										"<transaction_id>"+order_id+"</transaction_id>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</bills>";			
								var activity_xml="<activity>" +
										"<data_id>"+bill_key+"</data_id>" +
										"<tablename>bills</tablename>" +
										"<link_to>form42</link_to>" +
										"<title>Saved</title>" +
										"<notes>Billed order# "+order_num+"</notes>" +
										"<updated_by>"+get_name()+"</updated_by>" +
										"</activity>";
								var transaction_xml="<transactions>" +
										"<id>"+bill_key+"</id>" +
										"<trans_date>"+get_my_time()+"</trans_date>" +
										"<amount>"+bill_total+"</amount>" +
										"<receiver>"+customer+"</receiver>" +
										"<giver>master</giver>" +
										"<tax>"+bill_tax+"</tax>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</transactions>";
								var pt_tran_id=get_new_key();
								var payment_xml="<payments>" +
										"<id>"+pt_tran_id+"</id>" +
										"<status>pending</status>" +
										"<type>received</type>" +
										"<date>"+get_my_time()+"</date>" +
										"<total_amount>"+bill_total+"</total_amount>" +
										"<paid_amount>0</paid_amount>" +
										"<acc_name>"+customer+"</acc_name>" +
										"<due_date>"+get_credit_period()+"</due_date>" +
										"<mode>"+get_payment_mode()+"</mode>" +
										"<transaction_id>"+pt_tran_id+"</transaction_id>" +
										"<bill_id>"+order_id+"</bill_id>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</payments>";
								var pt_xml="<transactions>" +
										"<id>"+pt_tran_id+"</id>" +
										"<trans_date>"+get_my_time()+"</trans_date>" +
										"<amount>"+bill_total+"</amount>" +
										"<receiver>master</receiver>" +
										"<giver>"+customer+"</giver>" +
										"<tax>0</tax>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</transactions>";
								
								create_simple(transaction_xml);
								create_simple(pt_xml);
								create_simple(payment_xml);
								update_simple(num_xml);
								create_row(bill_xml,activity_xml);
								
								//console.log(bill_items_xml_array);
								//console.log(bill_xml);
		
								bill_items_xml_array.forEach(function (bill_item_xml) 
								{
									create_simple(bill_item_xml);
								});
								order_items_xml_array.forEach(function (order_item_xml) 
								{
									update_simple(order_item_xml);
								});
							}
						});
						hide_loader();
					}
			    },200);		
			}
			else
			{
				hide_loader();
				$("#modal63").dialog("open");
			}
		}
		else
		{
			hide_loader();
			$("#modal64").dialog("open");			
		}
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
function form184_create_item(form)
{
	if(is_create_access('form184'))
	{
		show_loader();
		var order_no=form.elements[0].value;
		var name=form.elements[1].value;
		var time=form.elements[2].value;
		var assignee=form.elements[3].value;
		var details=form.elements[4].value;
		var type=form.elements[5].value;
		var status=form.elements[6].value;
		var data_id=form.elements[7].value;
		var del_button=form.elements[9];
		var last_updated=get_my_time();
		var data_xml="<business_processes>" +
					"<id>"+data_id+"</id>" +
					"<order_no>"+order_no+"</order_no>" +
					"<name>"+name+"</name>" +
					"<details>"+details+"</details>" +
					"<time_estimate>"+time+"</time_estimate>"+
					"<default_assignee>"+assignee+"</default_assignee>"+
					"<type>"+type+"</type>"+
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</business_processes>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>business_processes</tablename>" +
					"<link_to>form184</link_to>" +
					"<title>Added</title>" +
					"<notes>"+name+" to production process steps</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		
		create_row(data_xml,activity_xml);

		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form184_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form184_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create production plan
 * @formNo 186
 * @param button
 */
function form186_create_item(form)
{
	if(is_create_access('form186'))
	{
		var master_form=document.getElementById("form186_master");
		
		var plan_id=master_form.elements[5].value;
		
		var order=form.elements[0].value;
		var item=form.elements[1].value;
		var brand=form.elements[2].value;
		var quantity=form.elements[3].value;
		var from=get_raw_time(form.elements[4].value);
		var to=get_raw_time(form.elements[5].value);
		var status=form.elements[6].value;
		var data_id=form.elements[7].value;
		var save_button=form.elements[8];
		var del_button=form.elements[9];
		var last_updated=get_my_time();
			
		var data_xml="<production_plan_items>" +
				"<id>"+data_id+"</id>" +
				"<order_no>"+order+"</order_no>" +
				"<item>"+item+"</item>" +
				"<brand>"+brand+"</brand>" +
				"<quantity>"+quantity+"</quantity>" +
				"<from_time>"+from+"</from_time>" +
				"<to_time>"+to+"</to_time>" +
				"<status>"+status+"</status>" +
				"<plan_id>"+plan_id+"</plan_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</production_plan_items>";
	
		create_simple(data_xml);
		console.log(data_xml);
		
		var raw_data="<pre_requisites>" +
				"<type exact='yes'>product</type>" +
				"<requisite_type exact='yes'>product</requisite_type>"+
				"<name exact='yes'>"+item+"</name>" +
				"<requisite_name></requisite_name>"+
				"<quantity></quantity>"+
				"</pre_requisites>";
		fetch_requested_data('',raw_data,function(raws)
		{
			raws.forEach(function(raw)
			{
				raw.quantity=parseFloat(raw.quantity)*parseFloat(quantity);			
				var batch_data="<product_instances>"+
								"<batch></batch>"+
								"<product_name exact='yes'>"+raw.requisite_name+"</product_name>"+
								"</product_instances>";
				get_single_column_data(function (batches) 
				{
					var batches_result_array=[];
					get_available_batch(raw.requisite_name,batches,raw.quantity,batches_result_array,function()
					{
						if(parseFloat(raw.quantity)>0)
						{
							var notif_notes=raw.quantity+" more pieces of "+raw.requisite_name+" are requirement for production of "+quantity+" pieces of "+item+". Please procure immediately.";
							var notif_xml="<notifications>" +
									"<id>"+get_new_key()+"</id>" +
									"<t_generated>"+get_my_time()+"</t_generated>" +
									"<data_id>"+data_id+"</data_id>" +
									"<title>Insufficient Inventory</title>" +
									"<notes>"+notif_notes+"</notes>" +
									"<link_to>form238</link_to>" +
									"<target_user></target_user>"+
									"<status>pending</status>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</notifications>";
							create_simple(notif_xml);		
						}
						
						batches_result_array.forEach(function (batch_result) 
						{
							console.log(batch_result);
							var batch_raw_xml="<batch_raw_material>"+
								"<item>"+raw.requisite_name+"</item>"+
								"<batch>"+batch_result.batch+"</batch>"+
								"<quantity>"+batch_result.quantity+"</quantity>"+
								"<production_id>"+data_id+"</production_id>"+
								"<last_updated>"+last_updated+"</last_updated>" +
								"</batch_raw_material>";
							create_simple(batch_raw_xml);
							///////////////////////////////////////////////////////
							var storage_xml="<area_utilization>"+
											"<name></name>"+
											"<item_name exact='yes'>"+raw.requisite_name+"</item_name>"+
											"<batch exact='yes'>"+batch_result.batch+"</batch>"+
											"</area_utilization>";
							console.log(storage);																	
							get_single_column_data(function (storages) 
							{
								get_available_storage(raw.requisite_name,batch_result.batch,storages,batch_result.quantity,storage_result_array,function () 
								{
									console.log(storage_result_array);
	
									var item_storage="";
									var store_item_id=get_new_key();
									var adjust_count=1;	
									var target=get_session_var('production_floor_store');
									if(storage_result_array.length>0)
									{
										item_storage=storage_result_array[0].storage;
									
										adjust_count+=1;
										var data_xml="<store_movement>" +
											"<id>"+store_item_id+"</id>" +
											"<item_name>"+raw.requisite_name+"</item_name>" +
											"<batch>"+batch_result.batch+"</batch>" +
											"<quantity>"+batch_result.quantity+"</quantity>" +
											"<source>"+item_storage+"</source>"+
											"<target>"+target+"</target>"+
											"<status>pending</status>"+
											"<dispatcher>"+get_account_name()+"</dispatcher>"+
											"<receiver></receiver>"+
											"<record_source>production_plan_item</record_source>"+
											"<source_id>"+data_id+"</source_id>"+
											"<applicable_from>"+from+"</applicable_from>" +
											"<last_updated>"+last_updated+"</last_updated>" +
											"</store_movement>";	
										create_simple(data_xml);	
										console.log(data_xml);
									}
									storage_result_array.forEach(function(storage_result)
									{
										adjust_count+=1;
										var data_xml="<store_movement>" +
											"<id>"+(store_item_id+adjust_count)+"</id>" +
											"<item_name>"+raw.requisite_name+"</item_name>" +
											"<batch>"+batch_result.batch+"</batch>" +
											"<quantity>"+storage_result.quantity+"</quantity>" +
											"<source>"+storage_result.storage+"</source>"+
											"<target>"+target+"</target>"+
											"<status>pending</status>"+
											"<dispatcher>"+get_account_name()+"</dispatcher>"+
											"<receiver></receiver>"+
											"<record_source>production_plan_item</record_source>"+
											"<source_id>"+data_id+"</source_id>"+
											"<applicable_from>"+from+"</applicable_from>" +
											"<last_updated>"+last_updated+"</last_updated>" +
											"</store_movement>";
										create_simple(data_xml);
										console.log(data_xml);																			
									});				
								});
							},storage_xml);	
								////////////////////////////////////////////////////////
						});
					});
				},batch_data);	
			});
		});
		
		var steps_xml="<business_processes>"+
					"<name></name>"+
					"<details></details>"+
					"<order_no></order_no>"+
					"<time_estimate></time_estimate>"+
					"<default_assignee></default_assignee>"+
					"<type array='yes'>--production--testing--</type>"+
					"<status array='yes'>--active--required--</status>"+
					"</business_processes>";
		fetch_requested_data('',steps_xml,function (steps) 
		{
			steps.sort(function(a,b)
			{
				if(parseInt(a.order_no)>parseInt(b.order_no))
				{	return 1;}
				else 
				{	return -1;}
			});
			
			var t_initiated=parseFloat(from);
			var steps_string="";
			var task_hours=0;
			steps.forEach(function(step)
			{
				steps_string+=step.name+"\n";
				task_hours=parseFloat(step.time_estimate)*parseFloat(quantity);
			});	
			var t_due=t_initiated+(task_hours*3600000);
								
			var data_xml="<task_instances>"+
					"<id>"+data_id+"</id>"+
					"<name>"+item+"("+quantity+" pieces)"+"</name>" +
					"<description>Perform following steps for production of "+quantity+" pieces of "+item+"\n"+steps_string+"</description>" +
					"<assignee></assignee>" +
					"<t_due>"+t_due+"</t_due>" +
					"<t_initiated>"+t_initiated+"</t_initiated>" +
					"<task_hours>"+task_hours+"</task_hours>" +
					"<status>pending</status>" +
					"<source>business process</source>" +
					"<source_id>"+data_id+"</source_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_instances>";
			create_simple(data_xml);
			
		});
		
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}		
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form186_delete_item(del_button);
		});

		$(save_button).off('click');
		$(save_button).on('click',function (e) 
		{
			e.preventDefault();
			form186_update_item(form);
		});

	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create production plan
 * @param button
 */
function form186_create_form()
{
	if(is_create_access('form186'))
	{
		show_loader();
		var form=document.getElementById("form186_master");
		
		var name=form.elements[1].value;
		var from=get_raw_time(form.elements[2].value);
		var to=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var save_button=form.elements[6];
		var last_updated=get_my_time();
		
		var data_xml="<production_plan>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<from_time>"+from+"</from_time>" +
					"<to_time>"+to+"</to_time>" +
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</production_plan>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>production_plan</tablename>" +
					"<link_to>form189</link_to>" +
					"<title>Saved</title>" +
					"<notes>Production plan "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form186_update_form();
		});
		
		$('#form186_share').show();
		$('#form186_share').click(function()
		{
			modal101_action('Production Plan','','staff',function (func) 
			{
				print_form186(func);
			});
		});

		$("[id^='save_form186_']").click();
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
function form187_create_item(form)
{
	if(is_create_access('form187'))
	{
		show_loader();
		var order_no=form.elements[0].value;
		var name=form.elements[1].value;
		var time=form.elements[2].value;
		var assignee=form.elements[3].value;
		var details=form.elements[4].value;
		var status=form.elements[5].value;
		var data_id=form.elements[6].value;
		var del_button=form.elements[8];
		var last_updated=get_my_time();
		var data_xml="<business_processes>" +
					"<id>"+data_id+"</id>" +
					"<order_no>"+order_no+"</order_no>" +
					"<name>"+name+"</name>" +
					"<details>"+details+"</details>" +
					"<time_estimate>"+time+"</time_estimate>"+
					"<default_assignee>"+assignee+"</default_assignee>"+
					"<type>testing</type>"+
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</business_processes>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>business_processes</tablename>" +
					"<link_to>form187</link_to>" +
					"<title>Added</title>" +
					"<notes>"+name+" to testing process steps</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		
		create_row(data_xml,activity_xml);
		

		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form187_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form187_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage values List
 * @formNo 191
 */
function form191_create_item(form)
{
	if(is_create_access('form191'))
	{
		var table=form.elements[0].value;
		var list=form.elements[1].value;
		var name=form.elements[2].value;
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var del_button=form.elements[6];
		var last_updated=get_my_time();
		var data_xml="<values_list>" +
					"<id>"+data_id+"</id>" +
					"<tablename>"+table+"</tablename>" +
					"<listname>"+list+"</listname>" +
					"<name>"+name+"</name>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</values_list>";
		
		create_simple(data_xml);
		

		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form191_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form191_update_item(form);
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
 * @param button
 */
function form192_create_item(form)
{
	if(is_create_access('form192'))
	{
		var master_form=document.getElementById("form192_master");
		var bill_id=master_form.elements[5].value;
		
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
			
		var data_xml="<supplier_bill_items>" +
				"<id>"+data_id+"</id>" +
				"<product_name>"+name+"</product_name>" +
				"<batch>"+name+"</batch>" +
				"<quantity>"+quantity+"</quantity>" +
				"<total>"+total+"</total>" +
				"<tax>"+tax+"</tax>" +
				"<amount>"+amount+"</amount>" +
				"<unit_price>"+price+"</unit_price>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</supplier_bill_items>";	
	
		create_simple(data_xml);
		
				
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form192_delete_item(del_button);
		});

		$(save_button).off('click');		
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Enter Purchase Bill (Laundry)
 * @param button
 */
function form192_create_form()
{
	if(is_create_access('form192'))
	{
		var form=document.getElementById("form192_master");
		
		var supplier=form.elements[1].value;
		var bill_id=form.elements[2].value;
		var bill_date=get_raw_time(form.elements[3].value);
		var entry_date=get_raw_time(form.elements[4].value);
		var total=0;
		var tax=0;
		var amount=0;
		
		$("[id^='save_form192']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			
			total+=parseFloat(subform.elements[5].value);
			tax+=parseFloat(subform.elements[4].value);
		});
		
		var discount=0;
		amount=total-tax;
		
		var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
				"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+discount+"</br>" +
				"Rs. "+tax+"</br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form192_foot').html(total_row);

		var data_id=form.elements[5].value;
		var transaction_id=form.elements[6].value;
		var save_button=form.elements[7];
		var last_updated=get_my_time();
		
		var data_xml="<supplier_bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<entry_date>"+entry_date+"</entry_date>" +
					"<total>"+total+"</total>" +
					"<discount>"+discount+"</discount>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>supplier_bills</tablename>" +
					"<link_to>form53</link_to>" +
					"<title>Saved</title>" +
					"<notes>Supplier Bill no "+bill_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
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
					"<bill_id>"+data_id+"</bill_id>" +
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
			form192_update_form();
		});
		
		$("[id^='save_form192_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 197
 * form Supplier Item mapping
 * @param button
 */
function form197_create_item(form)
{
	if(is_create_access('form197'))
	{
		var item=form.elements[0].value;
		var supplier=form.elements[1].value;
		var data_id=form.elements[2].value;
		var del_button=form.elements[4];
		var last_updated=get_my_time();
		var data_xml="<supplier_item_mapping>" +
					"<id>"+data_id+"</id>" +
					"<item>"+item+"</item>" +
					"<supplier>"+supplier+"</supplier>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_item_mapping>";
		create_simple(data_xml);
			
		for(var i=0;i<2;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form197_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 200
 * form Create DRS
 * @param button
 */
function form200_create_item(form)
{
	//console.log('form200_create_form');
	if(is_create_access('form200'))
	{
		var drs_num=document.getElementById('form200_master').elements['drs_num'].value;
		var drs_id=document.getElementById('form200_master').elements['id'].value;
		var drs_date=document.getElementById('form200_master').elements['date'].value;
		var delivery_person=document.getElementById('form200_master').elements['employee'].value;
		var data_id=form.elements[9].value;
		var save_button=form.elements[10];
		var del_button=form.elements[11];
		var old_order_history=form.elements[14].value;

		var order_history=[];
		if(old_order_history!="")
			order_history=JSON.parse(old_order_history);
		var history_object=new Object();
		history_object.timeStamp=get_my_time();
		history_object.details="Order Out for delivery";
		history_object.location=get_session_var('address');
		history_object.status="Out for delivery";
		order_history.push(history_object);
		var order_history_string=JSON.stringify(order_history);		
		
		var last_updated=get_my_time();
		var data_xml="<logistics_orders>" +
					"<id>"+data_id+"</id>" +
					"<status>out for delivery</status>" +
					"<drs_num>"+drs_num+"</drs_num>"+
					"<drs_id>"+drs_id+"</drs_id>"+
					"<delivery_person>"+delivery_person+"</delivery_person>"+
					"<order_history>"+order_history_string+"</order_history>"+
					"<drs_time>"+get_raw_time(drs_date)+"</drs_time>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</logistics_orders>";
		update_simple(data_xml);
		
		for(var i=0;i<9;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form200_delete_item(del_button);
		});

		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form200_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create DRS
 * @param button
 */
function form200_create_form(func)
{
	if(is_create_access('form200'))
	{
		var form=document.getElementById("form200_master");
		
		var drs_num=form.elements['drs_num'].value;
		var employee=form.elements['employee'].value;
		var ddate=get_raw_time(form.elements['date'].value);
		var data_id=form.elements['id'].value;
		var branch=form.elements['branch'].value;
		
		$('#form200_share').show();
		$('#form200_share').click(function()
		{
			modal101_action('Delivery Run Sheet',employee,'staff',function (func) 
			{
				print_form200(func);
			});
		});

		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var drs_columns="<drs count='1'>" +
					"<drs_num exact='yes'>"+drs_num+"</drs_num>"+
					"</drs>";		
		get_single_column_data(function(drses)
		{
			//console.log(drses);
			
			if(drses.length==0)
			{	
				var data_xml="<drs>" +
							"<id>"+data_id+"</id>" +
							"<drs_num>"+drs_num+"</drs_num>"+
							"<employee>"+employee+"</employee>"+
							"<drs_time>"+ddate+"</drs_time>"+
							"<type>NONCOD</type>"+
							"<branch>"+branch+"</branch>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</drs>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>drs</tablename>" +
							"<link_to>form201</link_to>" +
							"<title>Generated</title>" +
							"<notes>DRS # "+drs_num+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				var num_data="<user_preferences>"+
							"<id></id>"+						
							"<name exact='yes'>drs_num</name>"+												
							"</user_preferences>";
				get_single_column_data(function (drs_num_ids)
				{
					if(drs_num_ids.length>0)
					{
						var num_xml="<user_preferences>"+
										"<id>"+drs_num_ids[0]+"</id>"+
										"<value>"+(parseInt(drs_num)+1)+"</value>"+
										"<last_updated>"+last_updated+"</last_updated>"+
										"</user_preferences>";
						update_simple(num_xml);
					}
				},num_data);
		
				create_row(data_xml,activity_xml);
				
				$(save_button).show();
				
				if(typeof func!='undefined')
				{
					//console.log('fun');
			
					func();
				}
		/*
				$(save_button).off('click');
				$(save_button).on('click',function(event)
				{
					event.preventDefault();
					form200_update_form();
				});
		*/		
				//$("[id^='save_form200_']").click();
			}
			else 
			{
				$("#modal68").dialog("open");
			}
		},drs_columns);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Treatment plan
 * @formNo 209
 * @param button
 */
function form209_create_item(form)
{
	if(is_create_access('form209'))
	{
		var master_form=document.getElementById("form209_master");
		
		var plan_id=master_form.elements['plan_id'].value;
		
		var order=form.elements[0].value;
		var item=form.elements[1].value;
		var details=form.elements[2].value;
		var from=get_raw_time(form.elements[4].value);
		var to=get_raw_time(form.elements[5].value);
		var status=form.elements[6].value;
		var data_id=form.elements[7].value;
		var save_button=form.elements[8];
		var del_button=form.elements[9];
		var last_updated=get_my_time();
			
		var data_xml="<treatment_plan_items>" +
				"<id>"+data_id+"</id>" +
				"<order_no>"+order+"</order_no>" +
				"<item>"+item+"</item>" +
				"<details>"+details+"</details>" +
				"<from_time>"+from+"</from_time>" +
				"<to_time>"+to+"</to_time>" +
				"<status>"+status+"</status>" +
				"<plan_id>"+plan_id+"</plan_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</treatment_plan_items>";
	
		create_simple(data_xml);
		
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}		

		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form209_delete_item(del_button);
		});

		$(save_button).off('click');
		$(save_button).on('click',function () 
		{
			form209_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create production plan
 * @param button
 */
function form209_create_form()
{
	if(is_create_access('form209'))
	{
		show_loader();
		var form=document.getElementById("form209_master");
		
		var num=form.elements['num'].value;
		var customer=form.elements['customer'].value;
		var start_date=get_raw_time(form.elements['date'].value);
		var status=form.elements['status'].value;
		var data_id=form.elements['plan_id'].value;
		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var data_xml="<treatment_plans>" +
					"<id>"+data_id+"</id>" +
					"<plan_num>"+num+"</plan_num>" +
					"<customer>"+customer+"</customer>" +
					"<start_date>"+start_date+"</start_date>" +
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</treatment_plans>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>treatment_plans</tablename>" +
					"<link_to>form208</link_to>" +
					"<title>Saved</title>" +
					"<notes>Treatment plan "+num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form209_update_form();
		});

		$('#form209_share').show();
		$('#form209_share').click(function()
		{
			modal101_action('Treatment Plan',customer,'customer',function (func) 
			{
				print_form209(func);
			});
		});

		$("[id^='save_form209_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Sale leads
 * @param button
 */
function form213_create_item(form)
{
	if(is_create_access('form213'))
	{
		var customer=form.elements[0].value;
		var detail=form.elements[1].value;
		var due_date=get_raw_time(form.elements[2].value);
		var identified_by=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<sale_leads>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<detail>"+detail+"</detail>" +
					"<due_date>"+due_date+"</due_date>" +
					"<status>open</status>" +
					"<identified_by>"+identified_by+"</identified_by>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_leads>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_leads</tablename>" +
					"<link_to>form213</link_to>" +
					"<title>Added</title>" +
					"<notes>Sale lead for customer "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var customer_data="<customers>"+
						"<name></name>"+
						"<phone></phone>"+
						"<email></email>"+
						"<acc_name exact='yes'>"+customer+"</acc_name>"+
						"</customers>";
		fetch_requested_data('',customer_data,function(customers)
		{
			var customer_name=customers[0].name;
			var customer_phone=customers[0].phone;
			var business_title=get_session_var('title');
			var sms_content=get_session_var('sms_content');			
			var message=sms_content.replace(/customer_name/g,customer_name);
			message=message.replace(/business_title/g,business_title);
			
			send_sms(customer_phone,message,'transaction');
			///////////////////////////////////////////////////////////////////////////////

			var nl_name=get_session_var('default_newsletter');
			var nl_id_xml="<newsletter>"+
						"<id></id>"+
						"<name exact='yes'>"+nl_name+"</name>"+
						"</newsletter>";
			get_single_column_data(function(nls)
			{
				var subject=nl_name;
				var nl_id=nls[0];	
				print_newsletter(nl_name,nl_id,'mail',function(container)
				{
					var message=container.innerHTML;
					var to=customer_name+":"+customers[0].email;
					var from=get_session_var('email');
					send_email(to,from,business_title,subject,message,function(){});
				});
			},nl_id_xml);
		});

		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form213_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form213_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Sale leads (self)
 * @param button
 */
function form214_create_item()
{
	if(is_create_access('form214'))
	{
		var form=document.getElementById("form214_master");
		
		var name=form.elements['name'].value;
		var phone=form.elements['phone'].value;
		var email=form.elements['email'].value;
		var address=form.elements['address'].value;
		var pincode=form.elements['pincode'].value;
		var city=form.elements['city'].value;
		var state=form.elements['state'].value;
		var details=form.elements['details'].value;
		var due_date=form.elements['date'].value;
		var identified_by=form.elements['contact'].value;
		var acc_name=name+" ("+phone+")";
			
		var id=get_new_key();
		var last_updated=get_my_time();
		var customer_xml="<customers>" +
						"<id>"+id+"</id>" +
						"<name>"+name+"</name>" +
						"<phone>"+phone+"</phone>" +
						"<email>"+email+"</email>" +
						"<notes></notes>" +
						"<acc_name unique='yes'>"+acc_name+"</acc_name>" +
						"<status>active</status>" +
						"<address>"+address+"</address>" +
						"<pincode>"+pincode+"</pincode>" +
						"<city>"+city+"</city>" +
						"<state>"+state+"</state>" +
						"<country>India</country>" +
						"<address_status>pending analysis</address_status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</customers>";
		var lead_xml="<sale_leads>" +
				"<id>"+id+"</id>" +
				"<customer>"+acc_name+"</customer>" +
				"<detail>"+details+"</detail>"+
                "<due_date>"+get_raw_time(due_date)+"</due_date>"+
                "<sale_leads>open</sale_leads>"+
                "<identified_by>"+identified_by+"</identified_by>"+
                "<last_updated>"+last_updated+"</last_updated>" +
				"</sale_leads>";
		var activity_xml="<activity>" +
				"<data_id>"+id+"</data_id>" +
				"<tablename>sale_leads</tablename>" +
				"<link_to>form214</link_to>" +
				"<title>Identified</title>" +
				"<notes>Sale opportunity with "+acc_name+"</notes>" +
				"<updated_by>"+get_name()+"</updated_by>" +
				"</activity>";
		
		create_row(lead_xml,activity_xml);
		create_simple_no_warning(customer_xml);
		
		var business_title=get_session_var('title');
		var sms_content=get_session_var('sms_content');			
		var message=sms_content.replace(/customer_name/g,name);
		message=message.replace(/business_title/g,business_title);
		
		send_sms(phone,message,'transaction');
		///////////////////////////////////////////////////////////////////////////////

		var nl_name=get_session_var('default_newsletter');
		var nl_id_xml="<newsletter>"+
					"<id></id>"+
					"<name exact='yes'>"+nl_name+"</name>"+
					"</newsletter>";
		get_single_column_data(function(nls)
		{
			var subject=nl_name;
			var nl_id=nls[0];	
			print_newsletter(nl_name,nl_id,'mail',function(container)
			{
				var message=container.innerHTML;
				var to=name+":"+email;
				var from=get_session_var('email');
				send_email(to,from,business_title,subject,message,function(){});
			});
		},nl_id_xml);
	
		
		$("#form214_attributes").find('input, select').each(function()
		{
			id++;
			var value=$(this).val();
			var attribute=$(this).attr('name');
			if(value!="")
			{
				var attribute_xml="<attributes>" +
						"<id>"+id+"</id>" +
						"<name>"+acc_name+"</name>" +
						"<type>customer</type>" +
						"<attribute>"+attribute+"</attribute>" +
						"<value>"+value+"</value>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</attributes>";
				create_simple(attribute_xml);
				
			}
		});

		$('#modal62').dialog('open');
		form214_ini();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * formNo 200
 * form Create Manifest
 * @param button
 */
function form215_create_item(form)
{
	//console.log('form215_create_form');
	if(is_create_access('form215'))
	{
		var drs_num=document.getElementById('form215_master').elements['man_num'].value;
		var drs_id=document.getElementById('form215_master').elements['id'].value;
		
		var data_id=form.elements[4].value;
		var save_button=form.elements[5];
		var del_button=form.elements[6];
		
		var last_updated=get_my_time();
		var data_xml="<bills>" +
					"<id>"+data_id+"</id>" +
					"<manifest_num>"+drs_num+"</manifest_num>"+
					"<manifest_id>"+drs_id+"</manifest_id>"+
					"<status>dispatched</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bills>";
		update_simple(data_xml);
		
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form215_delete_item(del_button);
		});

		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form215_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create DRS
 * @param button
 */
function form215_create_form(func)
{
	if(is_create_access('form215'))
	{
		var form=document.getElementById("form215_master");
		
		var drs_num=form.elements['man_num'].value;
		var ddate=get_raw_time(form.elements['date'].value);
		var data_id=form.elements['id'].value;
		
		$('#form215_share').show();
		$('#form215_share').click(function()
		{
			modal101_action('Order Manifest','','staff',function (func) 
			{
				print_form215(func);
			});
		});

		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var num_orders=0;
		$("[id^='save_form215']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
	
			if(subform.elements[1].value!="")
			{
				num_orders+=1;			
			}
		});
		
		var drs_columns="<drs count='1'>" +
					"<drs_num exact='yes'>"+drs_num+"</drs_num>"+
					"</drs>";		
		get_single_column_data(function(drses)
		{
			if(drses.length==0)
			{	
				var data_xml="<drs>" +
							"<id>"+data_id+"</id>" +
							"<drs_num>"+drs_num+"</drs_num>"+
							"<drs_time>"+ddate+"</drs_time>"+
							"<num_orders>"+num_orders+"</num_orders>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</drs>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>drs</tablename>" +
							"<link_to>form236</link_to>" +
							"<title>Generated</title>" +
							"<notes>Manifest # "+drs_num+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				var num_data="<user_preferences>"+
							"<id></id>"+						
							"<name exact='yes'>drs_num</name>"+												
							"</user_preferences>";
				get_single_column_data(function (drs_num_ids)
				{
					if(drs_num_ids.length>0)
					{
						var num_xml="<user_preferences>"+
										"<id>"+drs_num_ids[0]+"</id>"+
										"<value>"+(parseInt(drs_num)+1)+"</value>"+
										"<last_updated>"+last_updated+"</last_updated>"+
										"</user_preferences>";
						update_simple(num_xml);
					}
				},num_data);
		
				create_row(data_xml,activity_xml);
				
				$(save_button).show();
				
				if(typeof func!='undefined')
				{
					func();
				}
			}
			else 
			{
				$("#modal68").dialog("open");
			}
		},drs_columns);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 217
 * form SKU mapping (Supplier)
 * @param button
 */
function form217_create_item(form)
{
	if(is_create_access('form217'))
	{
		var supplier=form.elements[0].value;
		var item=form.elements[1].value;
		var desc=form.elements[2].value;
		var sku=form.elements[3].value;
		var margin=form.elements[4].value;
		var data_id=form.elements[5].value;
		var del_button=form.elements[7];
		var last_updated=get_my_time();
		var data_xml="<supplier_item_mapping>" +
					"<id>"+data_id+"</id>" +
					"<item>"+item+"</item>" +
					"<item_desc>"+desc+"</item_desc>" +
					"<supplier>"+supplier+"</supplier>" +
					"<supplier_sku>"+sku+"</supplier_sku>" +
					"<margin>"+margin+"</margin>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_item_mapping>";
		create_simple(data_xml);
			
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form217_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form217_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 219
 * form Create COD DRS
 * @param button
 */
function form219_create_item(form)
{
	if(is_create_access('form219'))
	{
		var drs_num=document.getElementById('form219_master').elements['drs_num'].value;
		var drs_id=document.getElementById('form219_master').elements['id'].value;
		var drs_date=document.getElementById('form219_master').elements['date'].value;
		var delivery_person=document.getElementById('form219_master').elements['employee'].value;
		var data_id=form.elements[10].value;
		var save_button=form.elements[11];
		var del_button=form.elements[12];
		var last_updated=get_my_time();
	
		var old_order_history=form.elements[15].value;

		var order_history=[];
		if(old_order_history!="")
			order_history=JSON.parse(old_order_history);

		var history_object=new Object();
		history_object.timeStamp=get_my_time();
		history_object.details="Order Out for delivery";
		history_object.location=get_session_var('address');
		history_object.status="Out for delivery";
		order_history.push(history_object);
		var order_history_string=JSON.stringify(order_history);		
		
		var data_xml="<logistics_orders>" +
					"<id>"+data_id+"</id>" +
					"<status>out for delivery</status>" +
					"<drs_num>"+drs_num+"</drs_num>"+
					"<drs_id>"+drs_id+"</drs_id>"+
					"<delivery_person>"+delivery_person+"</delivery_person>"+
					"<order_history>"+order_history_string+"</order_history>"+
					"<drs_time>"+get_raw_time(drs_date)+"</drs_time>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</logistics_orders>";
		update_simple(data_xml);
		
		for(var i=0;i<10;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form219_delete_item(del_button);
		});

		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form219_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create COD DRS
 * @param button
 */
function form219_create_form(func)
{
	if(is_create_access('form219'))
	{
		form219_update_serial_numbers();
		var form=document.getElementById("form219_master");
		
		var drs_num=form.elements['drs_num'].value;
		var employee=form.elements['employee'].value;
		var ddate=get_raw_time(form.elements['date'].value);
		var collectable_amount=form.elements['total'].value;
		var collected_amount=form.elements['collected'].value;
		var data_id=form.elements['id'].value;
		var branch=form.elements['branch'].value;
		
		$('#form219_share').show();
		$('#form219_share').click(function()
		{
			modal101_action('Delivery Run Sheet',employee,'staff',function (func) 
			{
				print_form219(func);
			});
		});

		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var drs_columns="<drs count='1'>" +
					"<drs_num exact='yes'>"+drs_num+"</drs_num>"+
					"</drs>";	
					
		console.log(drs_columns);			
		get_single_column_data(function(drses)
		{
			//console.log(drses);
			if(drses.length==0)
			{
				var data_xml="<drs>" +
							"<id>"+data_id+"</id>" +
							"<drs_num>"+drs_num+"</drs_num>"+
							"<employee>"+employee+"</employee>"+
							"<drs_time>"+ddate+"</drs_time>"+
							"<type>COD</type>"+
							"<collectable_amount>"+collectable_amount+"</collectable_amount>"+
							"<collected_amount>"+collected_amount+"</collected_amount>"+
							"<branch>"+branch+"</branch>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</drs>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>drs</tablename>" +
							"<link_to>form201</link_to>" +
							"<title>Generated</title>" +
							"<notes>DRS # "+drs_num+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				var num_data="<user_preferences>"+
							"<id></id>"+						
							"<name exact='yes'>drs_num</name>"+												
							"</user_preferences>";
				get_single_column_data(function (drs_num_ids)
				{
					if(drs_num_ids.length>0)
					{
						var num_xml="<user_preferences>"+
										"<id>"+drs_num_ids[0]+"</id>"+
										"<value>"+(parseInt(drs_num)+1)+"</value>"+
										"<last_updated>"+last_updated+"</last_updated>"+
										"</user_preferences>";
						update_simple(num_xml);
					}
				},num_data);
		
				create_row(data_xml,activity_xml);
				
				$(save_button).show();
				
				if(typeof func!='undefined')
				{
					//console.log('executing func');
					func();
				}

		/*		$(save_button).off('click');
				$(save_button).on('click',function(event)
				{
					event.preventDefault();
					form219_update_form();
				});
				
				$("[id^='save_form219_']").click();
		*/		
			}
			else 
			{
				$("#modal68").dialog("open");
			}
		},drs_columns);	
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 220
 * form Manage Projects (CPS)
 * @param button
 */
function form220_create_item(form)
{
	if(is_create_access('form220'))
	{
		var name=form.elements[0].value;
		var details=form.elements[1].value;
		var priority=form.elements[2].value;
		var start_date=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var del_button=form.elements[7];

		var last_updated=get_my_time();
		var data_xml="<projects>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<details>"+details+"</details>" +
					"<priority>"+priority+"</priority>" +
					"<start_date>"+start_date+"</start_date>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</projects>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>projects</tablename>" +
					"<link_to>form220</link_to>" +
					"<title>Added</title>" +
					"<notes>Project "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var access_xml="<data_access>" +
					"<id>"+get_new_key()+"</id>" +
					"<tablename>projects</tablename>" +
					"<record_id>"+data_id+"</record_id>" +
					"<access_type>all</access_type>" +
					"<user_type>user</user_type>" +
					"<user>"+get_account_name()+"</user>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</data_access>";

		create_row(data_xml,activity_xml);
		create_simple(access_xml);
		
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form220_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form220_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Timesheet
 * @formNo 221
 * @param button
 */
function form221_create_item(form)
{
	if(is_create_access('form221'))
	{
		var person=form.elements[0].value;
		var project=form.elements[1].value;
		var date=get_raw_time(form.elements[2].value);		
		var hours=form.elements[3].value;		
		var data_id=form.elements[4].value;
		var del_button=form.elements[6];
		var last_updated=get_my_time();
		var data_xml="<timesheet>" +
					"<id>"+data_id+"</id>" +
					"<source_name>"+project+"</source_name>" +
					"<source>project</source>"+
					"<date>"+date+"</date>" +
					"<acc_name>"+person+"</acc_name>" +
					"<hours_worked>"+hours+"</hours_worked>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</timesheet>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>timesheet</tablename>" +
					"<link_to>form221</link_to>" +
					"<title>Timesheet</title>" +
					"<notes>Added "+hours+" hours for project "+project+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
			
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form221_delete_item(del_button);
		});
		$(form).off('submit');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form New Purchase Order (Aurilion)
 * @param button
 */
function form222_create_item(form)
{
	if(is_create_access('form222'))
	{
		var order_id=document.getElementById("form222_master").elements['order_id'].value;
		
		var name=form.elements[0].value;
		var quantity=form.elements[1].value;
		var make=form.elements[2].value;
		var mrp=form.elements[3].value;
		var price=form.elements[4].value;
		var amount=form.elements[5].value;
		var tax=form.elements[6].value;
		var total=form.elements[7].value;
		var data_id=form.elements[8].value;
		var save_button=form.elements[9];
		var del_button=form.elements[10];
		var last_updated=get_my_time();
		var data_xml="<purchase_order_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<quantity>"+quantity+"</quantity>" +
				"<order_id>"+order_id+"</order_id>" +
				"<make>"+make+"</make>" +
				"<mrp>"+mrp+"</mrp>" +
				"<price>"+price+"</price>" +
				"<amount>"+amount+"</amount>" +
				"<tax>"+tax+"</tax>" +
				"<total>"+total+"</total>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</purchase_order_items>";	
	
		create_simple(data_xml);
		
		for(var i=0;i<8;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form222_delete_item(del_button);
		});
		
		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}
					

/**
 * @form New Purchase Order
 * @param button
 */
function form222_create_form()
{
	if(is_create_access('form222'))
	{
		var form=document.getElementById("form222_master");
		var supplier=form.elements['supplier'].value;
		var order_date=get_raw_time(form.elements['date'].value);		
		var order_num=form.elements['order_num'].value;
		var status=form.elements['status'].value;
		var data_id=form.elements['order_id'].value;
		var save_button=form.elements['save'];
		
		var bt=get_session_var('title');
		$('#form222_share').show();
		$('#form222_share').click(function()
		{
			modal101_action(bt+' - PO# '+order_num,supplier,'supplier',function (func) 
			{
				print_form222(func);
			});
		});
		
		var amount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form222']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			
			if(!isNaN(parseFloat(subform.elements[5].value)))
			{
				amount+=parseFloat(subform.elements[5].value);
				tax+=parseFloat(subform.elements[6].value);
				total+=parseFloat(subform.elements[7].value);
			}		
		});
		
		var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
								"<td>Amount:<br>Tax: <br>Total: </td>" +
								"<td>Rs. "+amount+"<br>" +
								"Rs. "+tax+"<br> " +
								"Rs. "+total+"</td>" +
								"<td></td>" +
								"</tr>";
						
		$('#form222_foot').html(total_row);		

		var last_updated=get_my_time();		
		var data_xml="<purchase_orders>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<order_date>"+order_date+"</order_date>" +
					"<status>"+status+"</status>" +
					"<order_num>"+order_num+"</order_num>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<total>"+total+"</total>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</purchase_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>purchase_orders</tablename>" +
					"<link_to>form43</link_to>" +
					"<title>Created</title>" +
					"<notes>Purchase order # "+order_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var	notification_xml="<notifications>" +
					"<id>"+get_new_key()+"</id>" +
					"<t_generated>"+get_my_time()+"</t_generated>" +
					"<data_id unique='yes'>"+data_id+"</data_id>" +
					"<title>Purchase Order created</title>" +
					"<notes>Purchase order # "+order_num+" has been created. Please review and place order.</notes>" +
					"<link_to>form43</link_to>" +
					"<status>pending</status>" +
					"<target_user></target_user>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</notifications>";
					
		
		create_row(data_xml,activity_xml);
		create_simple(notification_xml);
		
		var num_data="<user_preferences>"+
					"<id></id>"+						
					"<name exact='yes'>po_num</name>"+												
					"</user_preferences>";
		get_single_column_data(function (bill_num_ids)
		{
			if(bill_num_ids.length>0)
			{
				var num_xml="<user_preferences>"+
							"<id>"+bill_num_ids[0]+"</id>"+
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
			form222_update_form();
		});
		
		$("[id^='save_form222_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Testing
 * @param button
 */
function form224_create_item(form)
{
	if(is_create_access('form224'))
	{
		var test_id=form.elements[0].value;
		var item=form.elements[1].value;
		var details=form.elements[2].value;
		var next_due=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var save_button=form.elements[6];
		var del_button=form.elements[7];
		var last_updated=get_my_time();
		var data_xml="<testing_process>" +
				"<id>"+data_id+"</id>" +
				"<item>"+item+"</item>" +
				"<test_id>"+test_id+"</test_id>" +
				"<details>"+details+"</details>" +
				"<next_due>"+next_due+"</next_due>" +
				"<status>"+status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</testing_process>";	
	
		create_simple(data_xml);
		
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form224_delete_item(del_button);
		});
		
		$(save_button).off('click');
		$(save_button).on('click',function()
		{
			form224_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create Bill (CPS)
 * @param button
 */
function form225_create_item(form)
{
	if(is_create_access('form225'))
	{
		var bill_id=document.getElementById("form225_master").elements['bill_id'].value;
		var name=form.elements[0].value;
		var desc=form.elements[1].value;
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
				"<item_desc>"+desc+"</item_desc>" +
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
			form225_delete_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create Bill (CPS)
 * @param button
 */
function form225_create_form()
{
	if(is_create_access('form225'))
	{
		var form=document.getElementById("form225_master");
		
		var customer=form.elements['customer'].value;
		var bill_date=get_raw_time(form.elements['date'].value);
		var bill_num=form.elements['bill_num'].value;
		var bill_type=form.elements['bill_type'].value;
				
		var data_id=form.elements['bill_id'].value;
		var transaction_id=form.elements['t_id'].value;
		var save_button=form.elements['save'];

		var bt=get_session_var('title');
		$('#form225_share').show();
		$('#form225_share').click(function()
		{
			modal101_action(bt+' - Invoice# '+bill_num,customer,'customer',function (func) 
			{
				print_form225(func);
			});
		});

		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		var total_quantity=0;
		
		$("[id^='save_form225']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			if(!isNaN(parseFloat(subform.elements[5].value)))
				amount+=parseFloat(subform.elements[5].value);
			if(!isNaN(parseFloat(subform.elements[6].value)))
				discount+=parseFloat(subform.elements[6].value);
			if(!isNaN(parseFloat(subform.elements[7].value)))
				tax+=parseFloat(subform.elements[7].value);
			if(!isNaN(parseFloat(subform.elements[8].value)))
				total+=parseFloat(subform.elements[8].value);
			
			if(!isNaN(parseFloat(subform.elements[3].value)))
				total_quantity+=parseFloat(subform.elements[3].value);							
		});

		var last_updated=get_my_time();
		
		var data_xml="<bills>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer+"</customer_name>" +
					"<bill_num>"+bill_num+"</bill_num>"+
					"<billing_type>"+bill_type+"</billing_type>"+
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
					"<bill_id>"+data_id+"</bill_id>" +
					"<source_info>from sale bill #"+bill_num+"</source_info>"+
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
		
		
		var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
				"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+discount+"</br>" +
				"Rs. "+tax+"</br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form225_foot').html(total_row);
	
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form225_update_form();
		});
		
		$("[id^='save_form225_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Delivery Run
 * @param button
 */
function form226_create_item(form)
{
	if(is_create_access('form226'))
	{
		var person=form.elements[0].value;
		var date=get_raw_time(form.elements[1].value);
		var start=form.elements[2].value;
		var end=form.elements[3].value;
		var total=form.elements[4].value;
		var data_id=form.elements[5].value;
		var save_button=form.elements[6];
		var del_button=form.elements[7];
		var last_updated=get_my_time();
		var data_xml="<delivery_run>" +
				"<id>"+data_id+"</id>" +
				"<person>"+person+"</person>" +
				"<date>"+date+"</date>" +
				"<starting_km>"+start+"</starting_km>" +
				"<ending_km>"+end+"</ending_km>" +
				"<total_run>"+total+"</total_run>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</delivery_run>";	
	
		create_simple(data_xml);
		
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form226_delete_item(del_button);
		});
		
		$(save_button).off('click');
		$(save_button).on('click',function()
		{
			form226_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 228
 * form Demo
 * @param button
 */
function form228_create_item(form)
{
	if(is_create_access('form228'))
	{
		var item=form.elements[0].value;
		var quantity=form.elements[1].value;
		var customer=form.elements[3].value;
		var negative="";
		if(parseFloat(quantity)>0)
		{
			negative="-";
		}
		var date=get_raw_time(form.elements[4].value);
		var data_id=form.elements[6].value;
		var del_button=form.elements[8];
		var last_updated=get_my_time();
		var data_xml="<bill_items>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+item+"</item_name>" +
					"<hiring_type>demo</hiring_type>" +
					"<issue_type>out</issue_type>" +
					"<issue_date>"+date+"</issue_date>" +
					"<customer>"+customer+"</customer>" +
					"<quantity>"+negative+quantity+"</quantity>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bill_items>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bill_items</tablename>" +
					"<link_to>form228</link_to>" +
					"<title>Out</title>" +
					"<notes>"+quantity+" pieces of "+item+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form228_delete_item(del_button);
		});
		
		$(form).off('submit');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 229
 * form Hire
 * @param button
 */
function form229_create_item(form)
{
	if(is_create_access('form229'))
	{
		var item=form.elements[0].value;
		var quantity=form.elements[1].value;
		var customer=form.elements[3].value;
		var negative="";
		if(parseFloat(quantity)>0)
		{
			negative="-";
		}
		var date=get_raw_time(form.elements[4].value);
		var data_id=form.elements[6].value;
		var del_button=form.elements[8];
		var last_updated=get_my_time();
		var data_xml="<bill_items>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+item+"</item_name>" +
					"<hiring_type>hire</hiring_type>" +
					"<issue_type>out</issue_type>" +
					"<issue_date>"+date+"</issue_date>" +
					"<customer>"+customer+"</customer>" +
					"<quantity>"+negative+quantity+"</quantity>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bill_items>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bill_items</tablename>" +
					"<link_to>form229</link_to>" +
					"<title>Out</title>" +
					"<notes>"+quantity+" pieces of "+item+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form229_delete_item(del_button);
		});
		
		$(form).off('submit');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 230
 * form In-out
 * @param button
 */
function form230_create_item(form)
{
	if(is_create_access('form230'))
	{
		var item=form.elements[0].value;
		var quantity=form.elements[1].value;
		var issue_type=form.elements[2].value;
		var negative="";		
		if(issue_type=='out' && parseFloat(quantity)>0)
		{
			negative="-";
		}
		var hiring_type=form.elements[3].value;
		var customer=form.elements[4].value;
		var date=get_raw_time(form.elements[5].value);
		var notes=form.elements[6].value;
		var data_id=form.elements[7].value;
		var del_button=form.elements[9];
		var last_updated=get_my_time();
		var data_xml="<bill_items>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+item+"</item_name>" +
					"<hiring_type>"+hiring_type+"</hiring_type>" +
					"<issue_type>"+issue_type+"</issue_type>" +
					"<issue_date>"+date+"</issue_date>" +
					"<customer>"+customer+"</customer>" +
					"<notes>"+notes+"</notes>" +
					"<quantity>"+negative+quantity+"</quantity>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bill_items>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bill_items</tablename>" +
					"<link_to>form230</link_to>" +
					"<title>"+issue_type+"</title>" +
					"<notes>"+quantity+" pieces of "+item+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form230_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form230_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create Prescriptions
 * @formNo 231
 * @param button
 */
function form231_create_item(form)
{
	if(is_create_access('form231'))
	{
		var master_form=document.getElementById("form231_master");
		
		var pres_id=master_form.elements['pres_id'].value;
		var pres_num=master_form.elements['p_num'].value;
		
		var type=form.elements[0].value;
		var item=form.elements[1].value;
		var dosage=form.elements[2].value;
		var frequency=form.elements[3].value;
		var days=form.elements[4].value;
		var data_id=form.elements[5].value;
		var save_button=form.elements[6];
		var del_button=form.elements[7];
		var last_updated=get_my_time();
			
		var data_xml="<prescription_items>" +
				"<id>"+data_id+"</id>" +
				"<p_id>"+pres_id+"</p_id>" +
				"<item>"+item+"</item>" +
				"<type>"+type+"</type>" +
				"<dosage>"+dosage+"</dosage>" +
				"<frequency>"+frequency+"</frequency>" +
				"<num_days>"+days+"</num_days>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</prescription_items>";
	
		create_simple(data_xml);
		
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}		
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form231_delete_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create Prescription
 * @param button
 */
function form231_create_form()
{
	if(is_create_access('form231'))
	{
		show_loader();
		var form=document.getElementById("form231_master");
		
		var data_id=form.elements['pres_id'].value;
		var date=get_raw_time(form.elements['date'].value);
		var next_visit=get_raw_time(form.elements['next'].value);
		var pres_num=form.elements['p_num'].value;
		var patient=form.elements['patient'].value;
		var doctor=form.elements['doctor'].value;
		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var data_xml="<prescriptions>" +
					"<id>"+data_id+"</id>" +
					"<p_num>"+pres_num+"</p_num>" +
					"<date>"+date+"</date>" +
					"<next_date>"+next_visit+"</next_date>" +
					"<patient>"+patient+"</patient>"+
					"<doctor>"+doctor+"</doctor>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</prescriptions>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>prescriptions</tablename>" +
					"<link_to>form232</link_to>" +
					"<title>Saved</title>" +
					"<notes>Prescription # "+pres_num+" for "+patient+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form231_update_form();
		});
		
		var bt=get_session_var('title');
		$('#form231_share').show();
		$('#form231_share').click(function()
		{
			modal101_action('Prescription from '+bt,patient,'customer',function (func) 
			{
				print_form231(func);
			});
		});

		$("[id^='save_form231_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Newsletter Creator
 * @param button
 */
function form233_create_item()
{
	if(is_create_access('form233'))
	{
		show_loader();
		var form=document.getElementById("form233_form");
		
		var data_id=form.elements['id'].value;
		var name=form.elements['name'].value;
		var description=form.elements['description'].value;
		
		var new_key=get_new_key();
		var counter=0;
		
		$("[id^='vyavsaay_image_box_']").each(function(index)
		{
			counter+=1;
			var image_elem=$(this)[0];
			resize_picture(image_elem,image_elem.width);
			
			var data_src=image_elem.getAttribute('data-src');
			console.log(data_src);
			if(data_src=="" || data_src=='undefined' || data_src=='null' || data_src==null)
			{
				var blob=image_elem.src;
				var blob_name=get_new_key()+".jpeg";

				image_elem.setAttribute('data-src',blob_name);			
				if(is_online())
				{				
					$.ajax(
					{
						type: "POST",
						url: "./ajax/s3_doc.php",
						data: 
						{
							blob: blob,
							name:blob_name,
							content_type:'image/jpeg'
						},
						success: function(return_data,return_status,e)
						{
							console.log(e.responseText);
						}
					});
				}
				else
				{
					var s3_xml="<s3_objects>"+
								"<id>"+(new_key+counter)+"</id>"+
								"<data_blob>"+blob+"</data_blob>"+
								"<name>"+blob_name+"</name>"+
								"<type>image/jpeg</type>"+
								"<status>pending</status>"+
								"<last_updated>"+get_my_time()+"</last_updated>"+
								"</s3_objects>";
					create_simple(s3_xml);			
				}
				console.log('image saved');
			}			
		});

		var html_content=htmlentities(document.getElementById('form233_section').innerHTML);
		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		//console.log(html_content);
		var data_xml="<newsletter>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<description>"+description+"</description>" +
					"<html_content>"+html_content+"</html_content>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</newsletter>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>newsletter</tablename>" +
					"<link_to>form2</link_to>" +
					"<title>Added</title>" +
					"<notes>Newsletter "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		//console.log(data_xml);			
		create_row(data_xml,activity_xml);
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form233_update_item();
		});		
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 240
 * form Assign raw material requirements
 * @param button
 */
function form240_create_item(form)
{
	//console.log('form240_create_form');
	if(is_create_access('form240'))
	{
		var item_name=document.getElementById('form240_master').elements['item_name'].value;

		var requisite_name=form.elements[0].value;
		var quantity=form.elements[1].value;
		
		var data_id=form.elements[2].value;
		var save_button=form.elements[3];
		var del_button=form.elements[4];
		
		var last_updated=get_my_time();
		var data_xml="<pre_requisites>" +
					"<id>"+data_id+"</id>" +
					"<name>"+item_name+"</name>" +
					"<type>product</type>"+
					"<quantity>"+quantity+"</quantity>"+
					"<requisite_type>product</requisite_type>"+
					"<requisite_name>"+requisite_name+"</requisite_name>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</pre_requisites>";
		create_simple(data_xml);
		
		for(var i=0;i<2;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form240_delete_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Assign raw material requirements
 * @param button
 */
function form240_create_form(func)
{
	if(is_create_access('form240'))
	{
		var form=document.getElementById("form240_master");
		
		var item_name=form.elements['item_name'].value;
		var num_materials=form.elements['num'].value;
		var data_id=get_new_key();
		
		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var data_xml="<manage_pre_requisites>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+item_name+"</name>"+
					"<num_materials>"+num_materials+"</num_materials>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</manage_pre_requisites>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>drs</tablename>" +
					"<link_to>form240</link_to>" +
					"<title>Assigned</title>" +
					"<notes>Raw material for "+item_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		
		create_row(data_xml,activity_xml);
		
		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form240_update_form();
		});
		
		$("[id^='save_form240_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

function form240_update_serial_numbers()
{
	var num_orders=0;

	$('#form240_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
		num_orders+=1;
	});
		
	var form=document.getElementById("form240_master");
	form.elements['num'].value=num_orders;
}


/**
 * formNo 245
 * form SKU components
 * @param button
 */
function form245_create_item(form)
{
	//console.log('form245_create_form');
	if(is_create_access('form245'))
	{
		var item_name=document.getElementById('form245_master').elements['item_name'].value;

		var requisite_name=form.elements[0].value;
		var requisite_desc=form.elements[1].value;
		var quantity=form.elements[2].value;
		
		var data_id=form.elements[3].value;
		var save_button=form.elements[4];
		var del_button=form.elements[5];
		
		var last_updated=get_my_time();
		var data_xml="<pre_requisites>" +
					"<id>"+data_id+"</id>" +
					"<name>"+item_name+"</name>" +
					"<type>product</type>"+
					"<quantity>"+quantity+"</quantity>"+
					"<requisite_type>product</requisite_type>"+
					"<requisite_name>"+requisite_name+"</requisite_name>"+
					"<requisite_desc>"+requisite_desc+"</requisite_desc>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</pre_requisites>";
		create_simple(data_xml);
		
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form245_delete_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Assign raw material requirements
 * @param button
 */
function form245_create_form(func)
{
	if(is_create_access('form245'))
	{
		$("[id^='save_form245_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

function form245_update_serial_numbers()
{
	$('#form245_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});		
}

/**
 * formNo 246
 * form Transfer Zones
 * @param button
 */
function form246_create_item(form)
{
	//console.log('form246_create_form');
	if(is_create_access('form246'))
	{
		var zone=form.elements[0].value;
		var description=form.elements[1].value;		
		var data_id=form.elements[2].value;
		var save_button=form.elements[3];
		var del_button=form.elements[4];
		
		var last_updated=get_my_time();
		var data_xml="<transfer_zones>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+zone+"</name>" +
					"<description>"+description+"</description>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transfer_zones>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>transfer_zones</tablename>" +
					"<link_to>form246</link_to>" +
					"<title>Added</title>" +
					"<notes>Transfer Zone "+zone+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
					
		create_row(data_xml,activity_xml);
		
		for(var i=0;i<2;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form246_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on('submit',function (e) 
		{
			e.preventDefault();
			form246_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 247
 * form Manage Pincodes
 * @param button
 */
function form247_create_item(form)
{
	if(is_create_access('form247'))
	{
		var pincode=form.elements[0].value;
		var zone=form.elements[1].value;
		var status=form.elements[2].value;		
		var data_id=form.elements[3].value;
		var save_button=form.elements[4];
		var del_button=form.elements[5];
		
		var last_updated=get_my_time();
		var data_xml="<pincodes>" +
					"<id>"+data_id+"</id>" +
					"<pincode unique='yes'>"+pincode+"</pincode>" +
					"<zone>"+zone+"</zone>"+
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</pincodes>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>pincodes</tablename>" +
					"<link_to>form247</link_to>" +
					"<title>Added</title>" +
					"<notes>Pincode "+zone+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
					
		create_row(data_xml,activity_xml);
		
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form247_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on('submit',function (e) 
		{
			e.preventDefault();
			form247_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 248
 * form Create Transit Bag
 * @param button
 */
function form248_create_item(form)
{
	//console.log('form248_create_form');
	if(is_create_access('form248'))
	{
		var master_form=document.getElementById('form248_master');
		var bag_num=master_form.elements['bag_num'].value;
		var bag_id=master_form.elements['id'].value;
		var bag_date=master_form.elements['date'].value;
		var lbh=master_form.elements['lbh'].value;
		var weight=master_form.elements['weight'].value;
		var num_orders=master_form.elements['num_orders'].value;
		var branch=master_form.elements['branch'].value;
				
		var data_id=form.elements[6].value;
		var save_button=form.elements[7];
		var del_button=form.elements[8];
		
		var old_order_history=form.elements[9].value;

		var order_history=[];
		if(old_order_history!="")
			order_history=JSON.parse(old_order_history);
		var history_object=new Object();
		history_object.timeStamp=get_my_time();
		history_object.details="Order in-transit";
		history_object.location=branch;
		history_object.status="in-transit";
		order_history.push(history_object);
		var order_history_string=JSON.stringify(order_history);		
		
		var last_updated=get_my_time();
		var data_xml="<logistics_orders>" +
					"<id>"+data_id+"</id>" +
					"<status>in-transit</status>" +
					"<bag_num>"+bag_num+"</bag_num>"+
					"<bag_id>"+bag_id+"</bag_id>"+
					"<order_history>"+order_history_string+"</order_history>"+
					"<branch>"+branch+"</branch>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</logistics_orders>";
		update_simple(data_xml);
		
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form248_delete_item(del_button);
		});

		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form248_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create bag
 * @param button
 */
function form248_create_form(func)
{
	if(is_create_access('form248'))
	{
		var form=document.getElementById("form248_master");
		
		var bag_num=form.elements['bag_num'].value;
		var lbh=form.elements['lbh'].value;
		var weight=form.elements['weight'].value;
		var date=get_raw_time(form.elements['date'].value);
		var data_id=form.elements['id'].value;
		var num_orders=form.elements['num_orders'].value;
		var branch_filter=form.elements['branch'];
		var branch=branch_filter.value;
		
		branch_filter.setAttribute('readonly','readonly');
		
		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var bag_columns="<transit_bags count='1'>" +
					"<bag_num exact='yes'>"+bag_num+"</bag_num>"+
					"</transit_bags>";		
		get_single_column_data(function(bags)
		{
			if(bags.length==0)
			{	
				var data_xml="<transit_bags>" +
							"<id>"+data_id+"</id>" +
							"<bag_num>"+bag_num+"</bag_num>"+
							"<lbh>"+lbh+"</lbh>"+
							"<date>"+date+"</date>"+
							"<weight>"+weight+"</weight>"+
							"<num_orders>"+num_orders+"</num_orders>"+
							"<status>pending</status>"+
							"<branch>"+branch+"</branch>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</transit_bags>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>transit_bags</tablename>" +
							"<link_to>form249</link_to>" +
							"<title>Create</title>" +
							"<notes>Bag # "+bag_num+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				var num_data="<user_preferences>"+
							"<id></id>"+						
							"<name exact='yes'>bag_num</name>"+												
							"</user_preferences>";
				get_single_column_data(function (bag_num_ids)
				{
					if(bag_num_ids.length>0)
					{
						var num_xml="<user_preferences>"+
										"<id>"+bag_num_ids[0]+"</id>"+
										"<value>"+(parseInt(bag_num)+1)+"</value>"+
										"<last_updated>"+last_updated+"</last_updated>"+
										"</user_preferences>";
						update_simple(num_xml);
					}
				},num_data);
		
				create_row(data_xml,activity_xml);
				
				$(save_button).show();
				
				if(typeof func!='undefined')
				{
					func();
				}
			}
			else 
			{
				$("#modal77").dialog("open");
			}
		},bag_columns);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 250
 * form Create MTS
 * @param button
 */
function form250_create_item(form)
{
	//console.log('form250_create_form');
	if(is_create_access('form250'))
	{
		var master_form=document.getElementById('form250_master');
		var mts_num=master_form.elements['mts_num'].value;
		var mts_id=master_form.elements['id'].value;
		
		var data_id=form.elements[4].value;
		var save_button=form.elements[5];
		var del_button=form.elements[6];
		
		var last_updated=get_my_time();
		var data_xml="<transit_bags>" +
					"<id>"+data_id+"</id>" +
					"<status>in-transit</status>" +
					"<mts>"+mts_num+"</mts>"+
					"<mts_id>"+mts_id+"</mts_id>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transit_bags>";
		update_simple(data_xml);
		
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form250_delete_item(del_button);
		});

		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form250_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create mts
 * @param button
 */
function form250_create_form(func)
{
	if(is_create_access('form250'))
	{
		var master_form=document.getElementById('form250_master');
		var mts_num=master_form.elements['mts_num'].value;
		var data_id=master_form.elements['id'].value;
		var date=get_raw_time(master_form.elements['date'].value);
		var weight=master_form.elements['weight'].value;
		var num_orders=master_form.elements['num_orders'].value;
		var num_bags=master_form.elements['num_bags'].value;
		var branch=master_form.elements['branch'].value;
		
		var save_button=master_form.elements['save'];
		var last_updated=get_my_time();
		
		$('#form250_share').show();
		$('#form250_share').click(function()
		{
			modal101_action('Material Transfer Sheet','','staff',function (func) 
			{
				print_form250(func);
			});
		});

		var mts_columns="<mts count='1'>" +
					"<mts_num exact='yes'>"+mts_num+"</mts_num>"+
					"</mts>";		
		get_single_column_data(function(mtss)
		{
			if(mtss.length==0)
			{	
				var data_xml="<mts>" +
							"<id>"+data_id+"</id>" +
							"<mts_num>"+mts_num+"</mts_num>"+
							"<branch>"+branch+"</branch>"+
							"<date>"+date+"</date>"+
							"<weight>"+weight+"</weight>"+
							"<num_orders>"+num_orders+"</num_orders>"+
							"<num_bags>"+num_bags+"</num_bags>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</mts>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>mts</tablename>" +
							"<link_to>form251</link_to>" +
							"<title>Created</title>" +
							"<notes>MTS # "+mts_num+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				var num_data="<user_preferences>"+
							"<id></id>"+						
							"<name exact='yes'>mts_num</name>"+												
							"</user_preferences>";
				get_single_column_data(function (mts_num_ids)
				{
					if(mts_num_ids.length>0)
					{
						var num_xml="<user_preferences>"+
										"<id>"+mts_num_ids[0]+"</id>"+
										"<value>"+(parseInt(mts_num)+1)+"</value>"+
										"<last_updated>"+last_updated+"</last_updated>"+
										"</user_preferences>";
						update_simple(num_xml);
					}
				},num_data);
		
				create_row(data_xml,activity_xml);
				
				$(save_button).show();
				
				if(typeof func!='undefined')
				{
					func();
				}
			}
			else 
			{
				$("#modal78").dialog("open");
			}
		},mts_columns);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Vendor leads
 * @param button
 */
function form252_create_item(form)
{
	if(is_create_access('form252'))
	{
		var customer=form.elements[0].value;
		var detail=form.elements[1].value;
		var due_date=get_raw_time(form.elements[2].value);
		var identified_by=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<sale_leads>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<detail>"+detail+"</detail>" +
					"<due_date>"+due_date+"</due_date>" +
					"<identified_by>"+identified_by+"</identified_by>" +
					"<status>open</status>"+
					"<type>vendor</type>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_leads>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_leads</tablename>" +
					"<link_to>form252</link_to>" +
					"<title>Added</title>" +
					"<notes>Lead for customer "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var customer_data="<customers>"+
						"<name></name>"+
						"<phone></phone>"+
						"<email></email>"+
						"<acc_name exact='yes'>"+customer+"</acc_name>"+
						"</customers>";
		fetch_requested_data('',customer_data,function(customers)
		{
			var customer_name=customers[0].name;
			var customer_phone=customers[0].phone;
			var business_title=get_session_var('title');
			var sms_content=get_session_var('sms_content');			
			var message=sms_content.replace(/customer_name/g,customer_name);
			message=message.replace(/business_title/g,business_title);
			
			send_sms(customer_phone,message,'transaction');
			///////////////////////////////////////////////////////////////////////////////

			var nl_name=get_session_var('default_newsletter');
			var nl_id_xml="<newsletter>"+
						"<id></id>"+
						"<name exact='yes'>"+nl_name+"</name>"+
						"</newsletter>";
			get_single_column_data(function(nls)
			{
				var subject=nl_name;
				var nl_id=nls[0];	
				print_newsletter(nl_name,nl_id,'mail',function(container)
				{
					var message=container.innerHTML;
					var to=customer_name+":"+customers[0].email;
					var from=get_session_var('email');
					send_email(to,from,business_title,subject,message,function(){});
				});
			},nl_id_xml);
		});

		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form252_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form252_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Customer leads
 * @param button
 */
function form253_create_item(form)
{
	if(is_create_access('form253'))
	{
		var customer=form.elements[0].value;
		var detail=form.elements[1].value;
		var due_date=get_raw_time(form.elements[2].value);
		var identified_by=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<sale_leads>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<detail>"+detail+"</detail>" +
					"<due_date>"+due_date+"</due_date>" +
					"<identified_by>"+identified_by+"</identified_by>" +
					"<status>open</status>"+
					"<type>customer</type>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_leads>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_leads</tablename>" +
					"<link_to>form253</link_to>" +
					"<title>Added</title>" +
					"<notes>Lead for customer "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var customer_data="<customers>"+
						"<name></name>"+
						"<phone></phone>"+
						"<email></email>"+
						"<acc_name exact='yes'>"+customer+"</acc_name>"+
						"</customers>";
		fetch_requested_data('',customer_data,function(customers)
		{
			var customer_name=customers[0].name;
			var customer_phone=customers[0].phone;
			var business_title=get_session_var('title');
			var sms_content=get_session_var('sms_content');			
			var message=sms_content.replace(/customer_name/g,customer_name);
			message=message.replace(/business_title/g,business_title);
			
			send_sms(customer_phone,message,'transaction');
			///////////////////////////////////////////////////////////////////////////////

			var nl_name=get_session_var('default_newsletter');
			var nl_id_xml="<newsletter>"+
						"<id></id>"+
						"<name exact='yes'>"+nl_name+"</name>"+
						"</newsletter>";
			get_single_column_data(function(nls)
			{
				var subject=nl_name;
				var nl_id=nls[0];	
				print_newsletter(nl_name,nl_id,'mail',function(container)
				{
					var message=container.innerHTML;
					var to=customer_name+":"+customers[0].email;
					var from=get_session_var('email');
					send_email(to,from,business_title,subject,message,function(){});
				});
			},nl_id_xml);
		});

		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form253_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form253_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Telecalling leads
 * @param button
 */
function form254_create_item(form)
{
	if(is_create_access('form254'))
	{
		var customer=form.elements[0].value;
		var detail=form.elements[1].value;
		var due_date=get_raw_time(form.elements[2].value);
		var identified_by=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<sale_leads>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<detail>"+detail+"</detail>" +
					"<due_date>"+due_date+"</due_date>" +
					"<identified_by>"+identified_by+"</identified_by>" +
					"<type>telecalling</type>" +
					"<status>open</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_leads>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_leads</tablename>" +
					"<link_to>form254</link_to>" +
					"<title>Added</title>" +
					"<notes>Lead for customer "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var customer_data="<customers>"+
						"<name></name>"+
						"<phone></phone>"+
						"<email></email>"+
						"<acc_name exact='yes'>"+customer+"</acc_name>"+
						"</customers>";
		fetch_requested_data('',customer_data,function(customers)
		{
			var customer_name=customers[0].name;
			var customer_phone=customers[0].phone;
			var business_title=get_session_var('title');
			var sms_content=get_session_var('sms_content');			
			var message=sms_content.replace(/customer_name/g,customer_name);
			message=message.replace(/business_title/g,business_title);
			
			send_sms(customer_phone,message,'transaction');
			///////////////////////////////////////////////////////////////////////////////

			var nl_name=get_session_var('default_newsletter');
			var nl_id_xml="<newsletter>"+
						"<id></id>"+
						"<name exact='yes'>"+nl_name+"</name>"+
						"</newsletter>";
			get_single_column_data(function(nls)
			{
				var subject=nl_name;
				var nl_id=nls[0];	
				print_newsletter(nl_name,nl_id,'mail',function(container)
				{
					var message=container.innerHTML;
					var to=customer_name+":"+customers[0].email;
					var from=get_session_var('email');
					send_email(to,from,business_title,subject,message,function(){});
				});
			},nl_id_xml);
		});

		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form254_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form254_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Marketing leads
 * @param button
 */
function form255_create_item(form)
{
	if(is_create_access('form255'))
	{
		var customer=form.elements[0].value;
		var detail=form.elements[1].value;
		var due_date=get_raw_time(form.elements[2].value);
		var identified_by=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<sale_leads>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<detail>"+detail+"</detail>" +
					"<due_date>"+due_date+"</due_date>" +
					"<identified_by>"+identified_by+"</identified_by>" +
					"<type>marketing</type>" +
					"<status>open</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_leads>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_leads</tablename>" +
					"<link_to>form255</link_to>" +
					"<title>Added</title>" +
					"<notes>Lead for customer "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var customer_data="<customers>"+
						"<name></name>"+
						"<phone></phone>"+
						"<email></email>"+
						"<acc_name exact='yes'>"+customer+"</acc_name>"+
						"</customers>";
		fetch_requested_data('',customer_data,function(customers)
		{
			var customer_name=customers[0].name;
			var customer_phone=customers[0].phone;
			var business_title=get_session_var('title');
			var sms_content=get_session_var('sms_content');			
			var message=sms_content.replace(/customer_name/g,customer_name);
			message=message.replace(/business_title/g,business_title);
			
			send_sms(customer_phone,message,'transaction');
			///////////////////////////////////////////////////////////////////////////////

			var nl_name=get_session_var('default_newsletter');
			var nl_id_xml="<newsletter>"+
						"<id></id>"+
						"<name exact='yes'>"+nl_name+"</name>"+
						"</newsletter>";
			get_single_column_data(function(nls)
			{
				var subject=nl_name;
				var nl_id=nls[0];	
				print_newsletter(nl_name,nl_id,'mail',function(container)
				{
					var message=container.innerHTML;
					var to=customer_name+":"+customers[0].email;
					var from=get_session_var('email');
					send_email(to,from,business_title,subject,message,function(){});
				});
			},nl_id_xml);
		});

		var del_button=form.elements[6];
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form255_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form255_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Batch Info
 * @param button
 */
function form256_create_item(form)
{
	if(is_create_access('form256'))
	{
		var production_id=document.getElementById('form256_master').elements['id'].value;
		var item=form.elements[0].value;
		var batch=form.elements[1].value;
		var quantity=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var del_button=form.elements[5];
		var storage=get_session_var('production_floor_store');
		
		var data_xml="<batch_raw_material>" +
					"<id>"+data_id+"</id>" +
					"<production_id>"+production_id+"</production_id>" +
					"<item>"+item+"</item>" +
					"<batch>"+batch+"</batch>" +
					"<quantity>"+quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</batch_raw_material>";
		var item_subtracted_xml="<inventory_adjust>"+
					"<id>"+data_id+"</id>"+
					"<product_name>"+item+"</product_name>"+
					"<batch>"+batch+"</batch>"+
					"<quantity>-"+quantity+"</quantity>"+
					"<source>manufacturing</source>"+
					"<source_id>"+production_id+"</source_id>"+
					"<storage>"+storage+"</storage>"+
					"<last_updated>"+last_updated+"</last_updated>"+
					"</inventory_adjust>";
		
		create_simple(item_subtracted_xml);			
		create_simple(data_xml);
		
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form256_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form256_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Batch Info
 * @param button
 */
function form256_create_form()
{
	if(is_create_access('form256'))
	{
		var filter_fields=document.getElementById('form256_master');
		var id=filter_fields.elements['id'].value;
		var item=filter_fields.elements['item_name'].value;
		var batch=filter_fields.elements['batch'].value;
		var quantity=filter_fields.elements['quantity'].value;
		var last_updated=get_my_time();
		var storage=get_session_var('production_floor_store');
		var save_button=filter_fields.elements['save'];

		var items_column="<production_plan_items>" +
						"<id>"+id+"</id>" +
						"<batch>"+batch+"</batch>" +
						"<status>inventoried</status>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</production_plan_items>";
		update_simple(items_column);

		///add to inventory
		var item_created_xml="<inventory_adjust>"+
							"<id>"+get_new_key()+"</id>"+
							"<product_name>"+item+"</product_name>"+
							"<batch>"+batch+"</batch>"+
							"<quantity>"+quantity+"</quantity>"+
							"<source>manufacturing</source>"+
							"<source_id>"+id+"</source_id>"+
							"<storage>"+storage+"</storage>"+
							"<last_updated>"+last_updated+"</last_updated>"+
							"</inventory_adjust>";
		create_simple(item_created_xml);
		
		var instance_xml="<product_instances>"+
						"<id>"+get_new_key()+"</id>"+
						"<product_name>"+item+"</product_name>"+
						"<batch exact='yes'>"+batch+"</batch>"+
						"<manufacture_date>"+last_updated+"</manufacture_date>"+
						"<last_updated>"+last_updated+"</last_updated>"+
						"</product_instances>";
		create_simple(instance_xml);				
		
		///add area utilization if not exist
		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+storage+"</name>" +
				"<item_name exact='yes'>"+item+"</item_name>" +
				"<batch exact='yes'>"+batch+"</batch>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0 && storage!="")
			{
				var storage_xml="<area_utilization>" +
						"<id>"+get_new_key()+"</id>" +
						"<name>"+storage+"</name>" +
						"<item_name>"+item+"</item_name>" +
						"<batch>"+batch+"</batch>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</area_utilization>";
				create_simple(storage_xml);
			}
		});		
		
		$(save_button).off('click');
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form256_update_form();
		});

		$("[id^='save_form256_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}	
}

/**
 * @form Prepare Quotation
 * @param button
 */
function form258_create_form()
{
	if(is_create_access('form258'))
	{
		var form=document.getElementById("form258_master");
		
		var customer=form.elements['customer'].value;
		var quot_num=form.elements['quot_num'].value;
		var quot_date=get_raw_time(form.elements['date'].value);
		var valid_upto=get_raw_time(form.elements['valid'].value);
		var type=form.elements['type'].value;
		var status=form.elements['status'].value;
		var issued_by=form.elements['issued'].value;
		var address=form.elements['address'].value;
		var data_id=form.elements['id'].value;
		var save_button=form.elements['save'];
		var share_button=form.elements['share'];
		var last_updated=get_my_time();
		
		var message_attachment="";
		var bt=get_session_var('title');
		
		$(share_button).off('click');
		$(share_button).on('click',function()
		{
			modal101_action('Quotation from - '+bt,customer,'customer',function (func) 
			{
				print_form258(func);
			});
		});
		
		var amount=0;
		var tax=0;
		var total=0;
		var total_quantity=0;
		var tax_rate=0;
		var cartage=0;
		
		$("[id^='save_form258_item_']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
	
			if(!isNaN(parseFloat(subform.elements[2].value)))
				total_quantity+=parseFloat(subform.elements[2].value);
			if(!isNaN(parseFloat(subform.elements[4].value)))
				amount+=parseFloat(subform.elements[4].value);
		/*	if(!isNaN(parseFloat(subform.elements[5].value)))
				tax+=parseFloat(subform.elements[5].value);
			if(!isNaN(parseFloat(subform.elements[6].value)))
				total+=parseFloat(subform.elements[6].value);
		*/
		});
	
		
		if(document.getElementById('form258_cartage'))
		{
			cartage=parseFloat(document.getElementById('form258_cartage').value);
			tax_rate=parseFloat(document.getElementById('form258_tax').value);
		}
		
		var amount=my_round(amount,2);		
		var tax=my_round(tax_rate*(amount/100),2);		
		var total=my_round((tax+amount+cartage),0);
	
		var total_row="<tr><td colspan='4' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
							"<td>Amount:<br>Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form258_tax'><br>Transport Charges: <br>Total: </td>" +
							"<td>Rs. "+amount+"</br>" +
							"Rs. "+tax+" <br>" +
							"Rs. <input type='number' value='"+my_round(cartage,2)+"' step='any' id='form258_cartage' class='dblclick_editable'><br>" +
							"Rs. <vtotal>"+total+"</vtotal></td>" +
							"<td></td>" +
							"</tr>";
		
		$('#form258_item_foot').html(total_row);
		longPressEditable($('.dblclick_editable'));

		var spec_array=[];
		var banks_array=[];
		var spares_array=[];
		var items_array=[];
		var terms_array=[];						
	
		$("[id^='save_form258_item_']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
	
			var item_obj=new Object();
			item_obj.item=subform.elements[0].value;
			item_obj.details=subform.elements[1].value;
			item_obj.quantity=subform.elements[2].value;
			item_obj.price=subform.elements[3].value;
			item_obj.amount=subform.elements[4].value;
			//item_obj.tax=subform.elements[5].value;
			//item_obj.total=subform.elements[6].value;
			items_array.push(item_obj);
			
			for(var i=0;i<5;i++)
			{
				$(subform.elements[i]).attr('readonly','readonly');
			}				
		});

		$("[id^='save_form258_spare_']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
	
			var item_obj=new Object();
			
			item_obj.item=subform.elements[0].value;
			item_obj.description=subform.elements[1].value;
			item_obj.quantity=subform.elements[2].value;
			var id=subform.elements[3].value;
			item_obj.unit=document.getElementById('form258_spare_unit_'+id).innerHTML;
			spares_array.push(item_obj);
			for(var i=0;i<3;i++)
			{
				$(subform.elements[i]).attr('readonly','readonly');
			}
		});

		$("[id^='save_form258_spec_']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
	
			var item_obj=new Object();
			//item_obj.item=subform.elements[0].value;
			item_obj.spec=subform.elements[0].value;
			item_obj.details=subform.elements[1].value;
			spec_array.push(item_obj);	
			for(var i=0;i<2;i++)
			{
				$(subform.elements[i]).attr('readonly','readonly');
			}
		});

		$("[id^='save_form258_bank_']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
	
			var item_obj=new Object();
			item_obj.name=subform.elements[0].value;
			item_obj.bank=subform.elements[1].value;
			item_obj.ifsc=subform.elements[2].value;
			item_obj.account_name=subform.elements[3].value;
			item_obj.account_num=subform.elements[4].value;
			banks_array.push(item_obj);
			for(var i=0;i<5;i++)
			{
				$(subform.elements[i]).attr('readonly','readonly');
			}
		});

		$("[id^='save_form258_tc_']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
	
			var item_obj=new Object();
			item_obj.type=subform.elements[0].value;
			item_obj.tc=subform.elements[1].value;
			terms_array.push(item_obj);	

			for(var i=0;i<2;i++)
			{
				$(subform.elements[i]).attr('readonly','readonly');
			}
		});
		
	
		var specifications=JSON.stringify(spec_array);
		var banks=JSON.stringify(banks_array);
		var spares=JSON.stringify(spares_array);
		var items=JSON.stringify(items_array);
		var terms=JSON.stringify(terms_array);
				
		var data_xml="<quotation>" +
					"<id>"+data_id+"</id>" +
					"<quot_num>"+quot_num+"</quot_num>" +
					"<customer>"+customer+"</customer>" +
					"<date>"+quot_date+"</date>" +
					"<valid_upto>"+valid_upto+"</valid_upto>" +
					"<type>"+type+"</type>" +
					"<status>"+status+"</status>" +
					"<issued_by>"+issued_by+"</issued_by>" +
					"<address>"+address+"</address>" +
					"<amount>"+amount+"</amount>"+
					"<tax>"+tax+"</tax>"+
					"<tax_rate>"+tax_rate+"</tax_rate>"+
					"<cartage>"+cartage+"</cartage>"+
					"<total>"+total+"</total>"+
					"<specifications>"+specifications+"</specifications>"+
					"<spares>"+spares+"</spares>"+
					"<banks>"+banks+"</banks>"+
					"<terms>"+terms+"</terms>"+
					"<items>"+items+"</items>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</quotation>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>quotation</tablename>" +
					"<link_to>form259</link_to>" +
					"<title>Saved</title>" +
					"<notes>Quotation # "+quot_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		
		create_row(data_xml,activity_xml);
		
		var num_data="<user_preferences>"+
					"<id></id>"+						
					"<name exact='yes'>quotation_num</name>"+												
					"</user_preferences>";
		get_single_column_data(function (num_ids)
		{
			if(num_ids.length>0)
			{
				var quot_num_array=quot_num.split("-");
				var num_xml="<user_preferences>"+
								"<id>"+num_ids[0]+"</id>"+
								"<value>"+(parseInt(quot_num_array[1])+1)+"</value>"+
								"<last_updated>"+last_updated+"</last_updated>"+
								"</user_preferences>";
				update_simple(num_xml);
			}
		},num_data);

		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form258_update_form();
		});		
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form User accounts
 * @param button
 */
function form261_create_item(form)
{
	if(is_create_access('form261'))
	{
		var name=form.elements[0].value;
		var bank=form.elements[1].value;
		var branch=form.elements[2].value;
		var ifsc=form.elements[3].value;
		var acc_name=form.elements[4].value;
		var acc_num=form.elements[5].value;
		var status=form.elements[6].value;
		var data_id=form.elements[7].value;
		var del_button=form.elements[9];
		
		var last_updated=get_my_time();
		var data_xml="<bank_accounts>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"</name>" +
					"<bank>"+bank+"</bank>" +
					"<branch>"+branch+"</branch>" +
					"<ifsc>"+ifsc+"</ifsc>" +
					"<account_name>"+acc_name+"</account_name>" +
					"<account_num>"+acc_num+"</account_num>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bank_accounts>";
		create_simple(data_xml);
		
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form261_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form261_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Grids
 * @param button
 */
function form262_create_item(form)
{
	if(is_create_access('form262'))
	{
		var order=form.elements[0].value;
		var name=form.elements[1].value;
		var display_name=form.elements[2].value;
		var head_color=form.elements[3].value;
		var back_color=form.elements[4].value;
		var status=form.elements[5].value;
		var data_id=form.elements[6].value;
		var del_button=form.elements[8];
		
		var last_updated=get_my_time();
		var data_xml="<system_grids>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"</name>" +
					"<display_name>"+display_name+"</display_name>" +
					"<head_color>"+head_color+"</head_color>" +
					"<back_color>"+back_color+"</back_color>" +
					"<grid_order>"+order+"</grid_order>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</system_grids>";
		create_simple(data_xml);
		
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form262_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form262_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form System Grid Metrics
 * @param button
 */
function form264_create_item(form)
{
	if(is_create_access('form264'))
	{
		var metric_id=form.elements[0].value;
		var name=form.elements[1].value;
		var grid=form.elements[2].value;
		var function_name=form.elements[3].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var del_button=form.elements[7];
		
		var last_updated=get_my_time();
		var data_xml="<system_grid_metrics>" +
					"<id>"+data_id+"</id>" +
					"<metric_id unique='yes'>"+metric_id+"</metric_id>" +
					"<display_name>"+name+"</display_name>" +
					"<grid>"+grid+"</grid>" +
					"<function_name>"+function_name+"</function_name>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</system_grid_metrics>";
		create_simple(data_xml);
		
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form264_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form264_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 265
 * form Create RTO
 * @param button
 */
function form265_create_item(form)
{
	if(is_create_access('form265'))
	{
		var rto_num=document.getElementById('form265_master').elements['rto_num'].value;
		var rto_id=document.getElementById('form265_master').elements['id'].value;
		var rto_date=document.getElementById('form265_master').elements['date'].value;
		var delivery_person=document.getElementById('form265_master').elements['employee'].value;
		var data_id=form.elements[9].value;
		var save_button=form.elements[10];
		var del_button=form.elements[11];
		var old_order_history=form.elements[14].value;

		var order_history=[];
		if(old_order_history!="")
			order_history=JSON.parse(old_order_history);
		var history_object=new Object();
		history_object.timeStamp=get_my_time();
		history_object.details="Order Out for Return";
		history_object.location=get_session_var('address');
		history_object.status="RTO Out for delivery";
		order_history.push(history_object);
		var order_history_string=JSON.stringify(order_history);		
		
		var last_updated=get_my_time();
		var data_xml="<logistics_orders>" +
					"<id>"+data_id+"</id>" +
					"<status>out for delivery</status>" +
					"<rto_num>"+rto_num+"</rto_num>"+
					"<rto_id>"+rto_id+"</rto_id>"+
					"<return_person>"+delivery_person+"</return_person>"+
					"<order_history>"+order_history_string+"</order_history>"+
					"<rto_time>"+get_raw_time(rto_date)+"</rto_time>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</logistics_orders>";
		update_simple(data_xml);
		
		for(var i=0;i<9;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form265_delete_item(del_button);
		});

		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form265_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create RTO
 * @param button
 */
function form265_create_form(func)
{
	if(is_create_access('form265'))
	{
		var form=document.getElementById("form265_master");
		
		var rto_num=form.elements['rto_num'].value;
		var employee=form.elements['employee'].value;
		var ddate=get_raw_time(form.elements['date'].value);
		var data_id=form.elements['id'].value;
		var branch=form.elements['branch'].value;
		
		$('#form265_share').show();
		$('#form265_share').click(function()
		{
			modal101_action('RTO Sheet',employee,'staff',function (func) 
			{
				print_form265(func);
			});
		});

		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var rto_columns="<rto count='1'>" +
					"<rto_num exact='yes'>"+rto_num+"</rto_num>"+
					"</rto>";		
		get_single_column_data(function(rtoes)
		{
			//console.log(rtoes);
			
			if(rtoes.length==0)
			{	
				var data_xml="<rto>" +
							"<id>"+data_id+"</id>" +
							"<rto_num>"+rto_num+"</rto_num>"+
							"<employee>"+employee+"</employee>"+
							"<rto_time>"+ddate+"</rto_time>"+
							"<branch>"+branch+"</branch>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</rto>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>rto</tablename>" +
							"<link_to>form266</link_to>" +
							"<title>Generated</title>" +
							"<notes>RTO # "+rto_num+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				var num_data="<user_preferences>"+
							"<id></id>"+						
							"<name exact='yes'>rto_num</name>"+												
							"</user_preferences>";
				get_single_column_data(function (rto_num_ids)
				{
					if(rto_num_ids.length>0)
					{
						var num_xml="<user_preferences>"+
										"<id>"+rto_num_ids[0]+"</id>"+
										"<value>"+(parseInt(rto_num)+1)+"</value>"+
										"<last_updated>"+last_updated+"</last_updated>"+
										"</user_preferences>";
						update_simple(num_xml);
					}
				},num_data);
		
				create_row(data_xml,activity_xml);
				
				$(save_button).show();
				
				if(typeof func!='undefined')
				{
					//console.log('fun');
			
					func();
				}
			}
			else 
			{
				$("#modal68").dialog("open");
			}
		},rto_columns);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Delivery Challan Details
 * @formNo 268
 * @param button
 */
function form268_create_item(form)
{
	if(is_create_access('form268'))
	{
		var master_form=document.getElementById("form268_master");
		var challan_id=master_form.elements['id'].value;
		
		var name=form.elements[0].value;
		var spec=form.elements[1].value;
		var quantity=form.elements[2].value;
		var data_id=form.elements[3].value;
		var save_button=form.elements[4];
		var del_button=form.elements[5];
		var last_updated=get_my_time();
		var unit=$('#form268_unit_'+data_id).html();
	
		var data_xml="<delivery_challan_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<item_desc>"+spec+"</item_desc>" +
				"<quantity>"+quantity+"</quantity>" +
				"<unit>"+unit+"</unit>"+				
				"<challan_id>"+challan_id+"</challan_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</delivery_challan_items>";	
		var inventory_xml="<inventory_adjust>" +
				"<id>"+data_id+"</id>" +
				"<product_name>"+name+"</product_name>" +
				"<batch>"+name+"</batch>" +
				"<item_desc>"+spec+"</item_desc>" +
				"<quantity>-"+quantity+"</quantity>" +
				"<source>delivery challan</source>" +
				"<source_id>"+challan_id+"</source_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</inventory_adjust>";	
	
		create_simple(data_xml);
		create_simple(inventory_xml);
				
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form268_delete_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Delivery challan Details
 * @param button
 */
function form268_create_form()
{
	if(is_create_access('form268'))
	{
		var form=document.getElementById("form268_master");
		
		var customer=form.elements['customer'].value;
		var challan_num=form.elements['challan_num'].value;
		var challan_date=get_raw_time(form.elements['date'].value);
		var awb_num=form.elements['awb_num'].value;
		var vehicle_num=form.elements['vehicle_num'].value;
		var type=form.elements['type'].value;
		//var status=form.elements['status'].value;
		var prepared_by=form.elements['prepared'].value;
		var address=form.elements['address'].value;
		var data_id=form.elements['id'].value;
		var save_button=form.elements['save'];
		var share_button=form.elements['email'];
		var last_updated=get_my_time();
		
		$(share_button).off('click');
		$(share_button).on('click',function()
		{
			modal101_action('Delivery Challan #:'+challan_num,customer,'customer',function (func) 
			{
				print_form268(func);
			});
		});
		
		var total_quantity=0;

		$("[id^='save_form268']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			
			if(!isNaN(parseFloat(subform.elements[2].value)))
				total_quantity+=parseFloat(subform.elements[2].value);
		});
		
		var total_row="<tr><td colspan='4' data-th='Total'>Total Quantity: "+total_quantity+"</td></tr>";
					
		$('#form268_foot').html(total_row);
		longPressEditable($('.dblclick_editable'));

		
		var data_xml="<delivery_challans>" +
					"<id>"+data_id+"</id>" +
					"<challan_num>"+challan_num+"</challan_num>" +
					"<customer>"+customer+"</customer>" +
					"<challan_date>"+challan_date+"</challan_date>" +
					"<awb_num>"+awb_num+"</awb_num>" +
					"<vehicle_num>"+vehicle_num+"</vehicle_num>" +
					"<type>"+type+"</type>" +
					//"<status>"+status+"</status>" +
					"<prepared_by>"+prepared_by+"</prepared_by>" +
					"<address>"+address+"</address>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</delivery_challans>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>delivery_challans</tablename>" +
					"<link_to>form269</link_to>" +
					"<title>Saved</title>" +
					"<notes>Delivery challan # "+challan_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		
		create_row(data_xml,activity_xml);
		
		var num_data="<user_preferences>"+
					"<id></id>"+						
					"<name exact='yes'>delivery_challan_num</name>"+												
					"</user_preferences>";
		get_single_column_data(function (num_ids)
		{
			if(num_ids.length>0)
			{
				var challan_num_array=challan_num.split("-");
				var num_xml="<user_preferences>"+
								"<id>"+num_ids[0]+"</id>"+
								"<value>"+(parseInt(challan_num_array[1])+1)+"</value>"+
								"<last_updated>"+last_updated+"</last_updated>"+
								"</user_preferences>";
				update_simple(num_xml);
			}
		},num_data);

		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form268_update_form();
		});
		
		$("[id^='save_form268_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Enter Purchase Bill (NVS)
 * @formNo 270
 * @param button
 */
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
		$("#modal2").dialog("open");
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
					"<bill_id>"+data_id+"</bill_id>" +
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Enter COD Collections
 * @formNo 271
 * @param button
 */
function form271_create_item(form)
{
	if(is_create_access('form271'))
	{
		var person=form.elements[0].value;
		var date=get_raw_time(form.elements[1].value);
		var amount=form.elements[2].value;
		var data_id=form.elements[3].value;
		var save_button=form.elements[4];
		var del_button=form.elements[5];
		var last_updated=get_my_time();
		
		var data_xml="<cod_collections>" +
				"<id>"+data_id+"</id>" +
				"<acc_name>"+person+"</acc_name>" +
				"<date>"+date+"</date>" +
				"<amount>"+amount+"</amount>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</cod_collections>";	
		
		create_simple(data_xml);
				
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form271_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on('submit',function (e) 
		{
			e.preventDefault();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Purchase leads
 * @param button
 */
function form273_create_item(form)
{
	if(is_create_access('form273'))
	{
		var supplier=form.elements[0].value;
		var item=form.elements[1].value;
		var price=form.elements[2].value;
		var quantity=form.elements[3].value;
		var detail=form.elements[4].value;
		var identified_date=get_raw_time(form.elements[5].value);
		var data_id=form.elements[6].value;
		var del_button=form.elements[8];
		
		var last_updated=get_my_time();
		var data_xml="<purchase_leads>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<item_name>"+item+"</item_name>" +
					"<detail>"+detail+"</detail>" +
					"<price>"+price+"</price>" +
					"<quantity>"+quantity+"</quantity>" +
					"<status>open</status>" +
					"<identified_date>"+identified_date+"</identified_date>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</purchase_leads>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>purchase_leads</tablename>" +
					"<link_to>form273</link_to>" +
					"<title>Added</title>" +
					"<notes>Purchase lead from "+supplier+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form273_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form273_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 275
 * form In-out (poojaelec)
 * @param button
 */
function form275_create_item(form)
{
	if(is_create_access('form275'))
	{
		var item=form.elements[0].value;
		var quantity=form.elements[1].value;
		var issue_type=form.elements[2].value;
		var negative="";		
		if(issue_type=='out' && parseFloat(quantity)>0)
		{
			negative="-";
		}
		var customer=form.elements[3].value;
		var date=get_raw_time(form.elements[4].value);
		var notes=form.elements[5].value;
		var data_id=form.elements[6].value;
		var del_button=form.elements[8];
		var last_updated=get_my_time();
		var data_xml="<bill_items>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+item+"</item_name>" +
					"<issue_type>"+issue_type+"</issue_type>" +
					"<issue_date>"+date+"</issue_date>" +
					"<customer>"+customer+"</customer>" +
					"<notes>"+notes+"</notes>" +
					"<quantity>"+negative+quantity+"</quantity>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bill_items>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bill_items</tablename>" +
					"<link_to>form275</link_to>" +
					"<title>"+issue_type+"</title>" +
					"<notes>"+quantity+" pieces of "+item+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form275_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form275_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Search Queries
 * @param button
 */
function form276_create_item(form)
{
	if(is_create_access('form276'))
	{
		var table_name=form.elements[0].value;
		var search_column=form.elements[1].value;
		var search_only_text=form.elements[2].value;
		var result_title=form.elements[3].value;
		var result_detail=form.elements[4].value;
		var result_form=form.elements[5].value;
		var result_count=form.elements[6].value;
		var data_id=form.elements[7].value;
		var del_button=form.elements[9];
		
		var last_updated=get_my_time();
		var data_xml="<system_search>" +
					"<id>"+data_id+"</id>" +
					"<table_name>"+table_name+"</table_name>" +
					"<search_column>"+search_column+"</search_column>" +
					"<result_title>"+result_title+"</result_title>" +
					"<result_detail>"+result_detail+"</result_detail>" +
					"<result_form>"+result_form+"</result_form>" +
					"<result_count>"+result_count+"</result_count>" +
					"<status>active</status>" +
					"<search_only_text>"+search_only_text+"</search_only_text>" +					
					"<last_updated>"+last_updated+"</last_updated>" +
					"</system_search>";
		create_simple(data_xml);
		
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form276_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create Performa Invoice
 * @formNo 284
 * @param button
 */
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
		$("#modal2").dialog("open");
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
					"<bill_id>"+data_id+"</bill_id>" +
					"<source_info>for sale bill #"+bill_num+"</source_info>"+
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Buyer leads
 * @param button
 */
function form289_create_item(form)
{
	if(is_create_access('form289'))
	{
		var customer=form.elements[0].value;
		var item=form.elements[1].value;
		var price=form.elements[2].value;
		var quantity=form.elements[3].value;
		var detail=form.elements[4].value;
		var due_date=get_raw_time(form.elements[5].value);
		var data_id=form.elements[6].value;
		var del_button=form.elements[8];
		
		var last_updated=get_my_time();
		var data_xml="<sale_leads>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<item_name>"+item+"</item_name>" +
					"<detail>"+detail+"</detail>" +
					"<price>"+price+"</price>" +
					"<quantity>"+quantity+"</quantity>" +
					"<due_date>"+due_date+"</due_date>" +
					"<status>open</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_leads>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_leads</tablename>" +
					"<link_to>form289</link_to>" +
					"<title>Added</title>" +
					"<notes>Sale lead for "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row(data_xml,activity_xml);
		
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form289_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form289_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Cities
 * @param button
 */
function form290_create_item(form)
{
	if(is_create_access('form290'))
	{
		var city=form.elements[0].value;
		var state=form.elements[1].value;
		var country=form.elements[2].value;
		var data_id=form.elements[3].value;
		var del_button=form.elements[5];
		
		var last_updated=get_my_time();
		var data_xml="<cities_data>" +
					"<id>"+data_id+"</id>" +
					"<city>"+city+"</city>" +
					"<state>"+state+"</state>" +
					"<country>"+country+"</country>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</cities_data>";
		create_simple(data_xml);
		
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form290_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}