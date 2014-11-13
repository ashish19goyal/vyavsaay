/**
 * @form Create Pamphlets
 * @param button
 */
function form2_create_item(form)
{
	if(is_create_access('form2'))
	{
		var pamphlet_id=document.getElementById('form2_master').elements[2].value;
		var name=form.elements[0].value;
		var offer_name=form.elements[1].value;
		var offer_detail=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<pamphlet_items>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+name+"</item_name>" +
					"<offer_name>"+offer_name+"</offer_name>" +
					"<offer>"+offer_detail+"</offer>" +
					"<pamphlet_id>"+pamphlet_id+"</pamphlet_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</pamphlet_items>";
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
		var del_button=form.elements[5];
		$(del_button).off('click');
		$(del_button).on('click',function(event)
		{
			form2_delete_item(del_button);
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
 * @form Create Pamphlets
 * @param button
 */
function form2_create_form()
{
	if(is_create_access('form2'))
	{
		var form=document.getElementById("form2_master");

		var p_name=form.elements[1].value;
		var data_id=form.elements[2].value;
		var last_updated=get_my_time();
		var data_xml="<pamphlets>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+p_name+"</name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</pamphlets>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>pamphlets</tablename>" +
					"<link_to>form2</link_to>" +
					"<title>Created</title>" +
					"<notes>Pamphlet "+p_name+"</notes>" +
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
	
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form2_update_form();
		});
		
		$("[id^='save_form2']").click();
		//$("#modal3").dialog("open");
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
		var bill_id=document.getElementById("form10_master").elements[7].value;
		
		var name=form.elements[0].value;
		var staff=form.elements[1].value;
		var notes=form.elements[2].value;
		var price=form.elements[3].value;
		var total=form.elements[4].value;
		var amount=form.elements[5].value;
		var discount=form.elements[6].value;
		var tax=form.elements[7].value;
		var offer=form.elements[8].value;
		var data_id=form.elements[9].value;
		var last_updated=get_my_time();
		
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
		
		
	//////adding free service to the bill if applicable
		if(free_service_name!="" && free_service_name!=null)
		{
			var id=get_new_key();
			rowsHTML="<tr>";
				rowsHTML+="<form id='form10_"+id+"'></form>";
                	rowsHTML+="<td>";
                    	rowsHTML+="<input type='text' readonly='readonly' form='form10_"+id+"' value='"+free_service_name+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='text' readonly='readonly' required form='form10_"+id+"' value='"+staff+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<textarea readonly='readonly' required form='form10_"+id+">free with "+name+"</textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='number' readonly='readonly' required form='form10_"+id+"' value='0'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='number' readonly='readonly' required form='form10_"+id+"' value='0'>";
                            rowsHTML+="<img class='filter_icon' src='./images/details.jpeg' form='form10_"+id+"' title='Offer details' onclick='modal6_action($(this));'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='hidden' form='form10_"+id+"' value='0'>";
                            rowsHTML+="<input type='hidden' form='form10_"+id+"' value='0'>";
                            rowsHTML+="<input type='hidden' form='form10_"+id+"' value='0'>";
                            rowsHTML+="<input type='hidden' form='form10_"+id+"' value='free with "+name+"'>";
                            rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+id+"'>";
                            rowsHTML+="<input type='button' class='save_icon' form='form10_"+id+"' id='save_form10_"+id+"' >";
                            rowsHTML+="<input type='button' class='delete_icon' form='form10_"+id+"' id='delete_form10_"+id+"' onclick='form10_delete_item($(this));'>";
                            rowsHTML+="<input type='hidden' form='form10_"+id+"' value=''>";
                    rowsHTML+="</td>";
            rowsHTML+="</tr>";

            $('#form10_body').prepend(rowsHTML);

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
		}
		///////////added free service///////////
		
		for(var i=0;i<10;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[11];
		$(del_button).off('click');
		$(del_button).on('click',function(event)
		{
			form10_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on("submit", function(event)
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
 * @form Service Reciept
 * @param button
 */
function form10_create_form()
{
	if(is_create_access('form10'))
	{
		var form=document.getElementById("form10_master");
		
		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form10']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
		});

		form.elements[3].value=amount;
		form.elements[4].value=discount;
		form.elements[5].value=tax;
		form.elements[6].value=total;
		
		var data_id=form.elements[7].value;
		var transaction_id=form.elements[9].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		var offer_data="<offers>" +
				"<offer_type>bill</offer_type>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount compare='less than'>"+(amount-discount)+"</criteria_amount>" +
				"<result_type></result_type>" +
				"<discount_percent></discount_percent>" +
				"<discount_amount></discount_amount>" +
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
					form.elements[3].value=amount;
					form.elements[4].value=discount;
					form.elements[5].value=tax;
					form.elements[6].value=total;
				}
				else if(offers[i].result_type=='service free')
				{
					var free_service_name=offers[i].free_service_name;	
					var id=get_new_key();
					rowsHTML="<tr>";
						rowsHTML+="<form id='form10_"+id+"'></form>";
		                	rowsHTML+="<td>";
		                    	rowsHTML+="<input type='text' readonly='readonly' form='form10_"+id+"' value='"+free_service_name+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='text' readonly='readonly' required form='form10_"+id+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<textarea readonly='readonly' required form='form10_"+id+"'>free service</textarea>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                        	rowsHTML+="<input type='number' readonly='readonly' required form='form10_"+id+"' value='0'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='number' readonly='readonly' required form='form10_"+id+"' value='0'>";
	                                rowsHTML+="<img class='filter_icon' src='./images/details.jpeg' form='form10_"+id+"' title='Offer details' onclick='modal6_action($(this));'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='hidden' form='form10_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form10_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form10_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form10_"+id+"' value='free on the bill amount'>";
	                                rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+id+"'>";
	                                rowsHTML+="<input type='submit' class='save_icon' form='form10_"+id+"' id='save_form10_"+id+"' >";
	                                rowsHTML+="<input type='button' class='delete_icon' form='form10_"+id+"' id='delete_form10_"+id+"' onclick='form10_delete_item($(this));'>";
	                                rowsHTML+="<input type='hidden' form='form10_"+id+"' value=''>";
	                                rowsHTML+="<input type='hidden' form='form10_"+id+"' value=''>";
	                        rowsHTML+="</td>";
	                rowsHTML+="</tr>";

	                $('#form10_body').prepend(rowsHTML);

	                var free_xml="<bill_items>" +
								"<id>"+id+"</id>" +
								"<item_name>"+free_product_name+"</item_name>" +
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
						"<type>service</type>" +
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
						"<due_date>"+get_my_time()+"</due_date>" +
						"<mode>cash</mode>" +
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
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form10_update_form();
		});
		$("[id^='save_form10']").click();
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
		var bill_id=document.getElementById("form12_master").elements[7].value;
		
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
		var quantity_data="<product_instances>" +
					"<id></id>" +
					"<product_name>"+name+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<quantity></quantity>" +
					"</product_instances>";
		
		//////updating product quantity in inventory
		fetch_requested_data('',quantity_data,function(quantities)
		{
			for (var i in quantities)
			{
				var q=parseFloat(quantities[i].quantity)-parseFloat(quantity);
				var quantity_xml="<product_instances>" +
						"<id>"+quantities[i].id+"</id>" +
						"<quantity>"+q+"</quantity>" +
						"</product_instances>";
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
					server_update_simple(quantity_xml);
				}
				else
				{
					local_create_simple(data_xml);
					local_update_simple(quantity_xml);
				}
				break;
			}
		});
		
		//////adding free product to the bill if applicable
		if(free_product_name!="" && free_product_name!=null)
		{
			var free_quantity_data="<product_instances>" +
						"<id></id>" +
						"<product_name>"+free_product_name+"</product_name>" +
						"<batch></batch>" +
						"<quantity></quantity>" +
						"</product_instances>";	
			
			//////updating product quantity in inventory
			fetch_requested_data('',free_quantity_data,function(free_quantities)
			{
				free_quantities.sort(function(a,b)
				{
					if(a.quantity>b.quantity)
					{	return 1;}
					else 
					{	return -1;}
				});
				var offer_invalid=true;
				for (var j in free_quantities)
				{
					var q=parseFloat(free_quantities[j].quantity)-parseFloat(free_product_quantity);
					
					if(q>0)
					{
						var id=get_new_key();
						rowsHTML="<tr>";
							rowsHTML+="<form id='form12_"+id+"'></form>";
			                	rowsHTML+="<td>";
			                    	rowsHTML+="<input type='text' readonly='readonly' form='form12_"+id+"' value='"+free_product_name+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='text' readonly='readonly' required form='form12_"+id+"' value='"+free_quantities[j].batch+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='"+free_product_quantity+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='0'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='0'>";
		                                rowsHTML+="<img class='filter_icon' src='./images/details.jpeg' form='form12_"+id+"' title='Offer details' onclick='modal6_action($(this));'>";
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

						var free_quantity_xml="<product_instances>" +
									"<id>"+free_quantities[j].id+"</id>" +
									"<quantity>"+q+"</quantity>" +
									"</product_instances>";
						var free_xml="<bill_items>" +
									"<id>"+id+"</id>" +
									"<item_name>"+free_product_name+"</item_name>" +
									"<batch>"+free_quantities[j].batch+"</batch>" +
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
							server_update_simple(free_quantity_xml);
						}
						else
						{
							local_create_simple(free_xml);
							local_update_simple(free_quantity_xml);
						}
						offer_invalid=false;
						break;
					}
				}
				if(offer_invalid)
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
		$(del_button).off('click');
		$(del_button).on('click',function(event)
		{
			form12_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on("submit", function(event)
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
		});

		form.elements[3].value=amount;
		form.elements[4].value=discount;
		form.elements[5].value=tax;
		form.elements[6].value=total;
		
		var data_id=form.elements[7].value;
		var transaction_id=form.elements[9].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		var offer_data="<offers>" +
				"<offer_type>bill</offer_type>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount compare='less than'>"+(amount-discount)+"</criteria_amount>" +
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
					form.elements[3].value=amount;
					form.elements[4].value=discount;
					form.elements[5].value=tax;
					form.elements[6].value=total;
				}
				else if(offers[i].result_type=='product free')
				{
					var free_product_name=offers[i].free_product_name;
					var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount-discount)/parseFloat(offers[i].criteria_amount)));
					
					var free_quantity_data="<product_instances>" +
								"<id></id>" +
								"<product_name>"+free_product_name+"</product_name>" +
								"<batch></batch>" +
								"<quantity></quantity>" +
								"</product_instances>";	
					
					//////updating product quantity in inventory
					fetch_requested_data('',free_quantity_data,function(free_quantities)
					{
						var offer_invalid=true;
						for (var j in free_quantities)
						{
							var q=parseFloat(free_quantities[j].quantity)-parseFloat(free_product_quantity);
							if(q>0)
							{
								var id=get_new_key();
								rowsHTML="<tr>";
									rowsHTML+="<form id='form12_"+id+"'></form>";
					                	rowsHTML+="<td>";
					                    	rowsHTML+="<input type='text' readonly='readonly' form='form12_"+id+"' value='"+free_product_name+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='text' readonly='readonly' required form='form12_"+id+"' value='"+free_quantities[j].batch+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='"+free_product_quantity+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                        	rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='0'>";
				                                rowsHTML+="<img class='filter_icon' src='./images/details.jpeg' form='form12_"+id+"' title='Offer details' onclick='modal6_action($(this));'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='free on the bill amount'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+id+"'>";
				                                rowsHTML+="<input type='submit' class='save_icon' form='form12_"+id+"' id='save_form12_"+id+"' >";
				                                rowsHTML+="<input type='button' class='delete_icon' form='form12_"+id+"' id='delete_form12_"+id+"' onclick='form12_delete_item($(this));'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
				                        rowsHTML+="</td>";
				                rowsHTML+="</tr>";

				                $('#form12_body').prepend(rowsHTML);

				                var free_quantity_xml="<product_instances>" +
											"<id>"+free_quantities[j].id+"</id>" +
											"<quantity>"+q+"</quantity>" +
											"</product_instances>";
								var free_xml="<bill_items>" +
											"<id>"+id+"</id>" +
											"<item_name>"+free_product_name+"</item_name>" +
											"<batch>"+free_quantities[j].batch+"</batch>" +
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
									server_update_simple(free_quantity_xml);
								}
								else
								{
									local_create_simple(free_xml);
									local_update_simple(free_quantity_xml);
								}
								offer_invalid=false;
								break;
							}
						}
						if(offer_invalid)
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
						"<due_date>"+get_my_time()+"</due_date>" +
						"<mode>cash</mode>" +
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
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form12_update_form();
		});
		$("[id^='save_form12']").click();
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
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		$(del_button).off('click');
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
		var return_id=document.getElementById("form15_master").elements[4].value;
		
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var notes=form.elements[2].value;
		var quantity=form.elements[3].value;
		var type=form.elements[4].value;
		var total_batch=form.elements[5].value;
		var tax=form.elements[6].value;
		var data_id=form.elements[7].value;
		
		var last_updated=get_my_time();
		var quantity_data="<product_instances>" +
					"<id></id>" +
					"<product_name>"+name+"</product_name>" +
					"<batch array='yes'>"+batch+"--"+total_batch+"</batch>" +
					"<quantity></quantity>" +
					"</product_instances>";
		
		//////updating product quantity in inventory
		fetch_requested_data('',quantity_data,function(quantities)
		{
			var returned_quantity=0;
			var exchanged_quantity=0;
			var returned_id=1;
			var exchanged_id=1;

			for (var i in quantities)
			{
				if(quantities[i].batch==batch)
				{
					returned_id=quantities[i].id;
					returned_quantity=parseFloat(quantities[i].quantity)+parseFloat(quantity);
				}
				else if(quantities[i].batch==total_batch)
				{	
					exchanged_id=quantities[i].id;
					exchanged_quantity=parseFloat(quantities[i].quantity)-parseFloat(quantity);
				}
			}
			
			var returned_xml="<product_instances>" +
					"<id>"+returned_id+"</id>" +
					"<quantity>"+returned_quantity+"</quantity>" +
					"<last_update>"+last_updated+"</last_updated>"+
					"</product_instances>";
			var exchanged_xml="<product_instances>" +
					"<id>"+exchanged_id+"</id>" +
					"<quantity>"+exchanged_quantity+"</quantity>" +
					"<last_update>"+last_updated+"</last_updated>"+
					"</product_instances>";
			var data_xml="<customer_return_items>" +
					"<id>"+data_id+"</id>" +
					"<return_id>"+return_id+"</return_id>" +
					"<item_name>"+name+"</item_name>" +
					"<batch>"+batch+"</batch>" +
					"<quantity>"+quantity+"</quantity>" +
					"<type>"+type+"</type>";
			if(type=='refund')
			{
				data_xml+="<refund_amount>"+total_batch+"</refund_amount>";
			}
			else
			{
				data_xml+="<exchange_batch>"+total_batch+"</exchange_batch>";
			}
			data_xml+="<total>"+total+"</total>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</customer_return_items>";	
		
			if(is_online())
			{
				server_create_simple(data_xml);
				server_update_simple(returned_xml);
				if(type=='exchange')
					server_update_simple(exchanged_xml);
			}
			else
			{
				local_create_simple(data_xml);
				local_update_simple(returned_xml);
				if(type=='exchange')
					local_update_simple(exchanged_xml);
			}
		});
		
				
		for(var i=0;i<8;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[9];
		$(del_button).off('click');
		$(del_button).on('click',function(event)
		{
			form15_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on("submit", function(event)
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
 * @form manage customer returns
 * @param button
 */
function form15_create_form()
{
	if(is_create_access('form15'))
	{
		var form=document.getElementById("form15_master");
		
		var customer=form.elements[1].value;
		var return_date=get_raw_time(form.elements[2].value);
		
		var tax=0;
		var total=0;
		
		$("[id^='save_form15']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			if(subform.elements[4].value=='refund')
			{	
				total+=parseFloat(subform.elements[5].value);
			}
			tax+=parseFloat(subform.elements[6].value);
		});

		form.elements[3].value=total;
		form.elements[6].value=tax;
		
		var data_id=form.elements[4].value;
		var transaction_id=form.elements[5].value;
		var last_updated=get_my_time();
		
		var data_xml="<customer_returns>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<return_date>"+return_date+"</return_date>" +
					"<total>"+total+"</total>" +
					"<type>product</type>" +
					"<tax>"+tax+"</tax>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</customer_returns>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>customer_returns</tablename>" +
					"<link_to>form16</link_to>" +
					"<title>Saved</title>" +
					"<notes>Returns from customer "+customer+"</notes>" +
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
					"<due_date>"+get_my_time()+"</due_date>" +
					"<mode></mode>" +
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
				modal28_action(pt_tran_id);
			});
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(transaction_xml);
			local_create_simple(pt_xml);
			local_create_simple_func(payment_xml,function()
			{
				modal28_action(pt_tran_id);
			});
		}
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form15_update_form();
		});
		$("[id^='save_form15']").click();
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
		var return_id=document.getElementById("form19_master").elements[4].value;
		
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var notes=form.elements[2].value;
		var quantity=form.elements[3].value;
		var total=form.elements[4].value;
		var data_id=form.elements[5].value;
		
		var last_updated=get_my_time();
		var quantity_data="<product_instances>" +
					"<id></id>" +
					"<product_name>"+name+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<quantity></quantity>" +
					"</product_instances>";
		
		//////updating product quantity in inventory
		fetch_requested_data('',quantity_data,function(quantities)
		{
			var returned_id="1";
			var returned_quantity="0";
			for (var i in quantities)
			{
				returned_id=quantities[i].id;
				returned_quantity=parseFloat(quantities[i].quantity)-parseFloat(quantity);
				break;
			}
			
			var returned_xml="<product_instances>" +
					"<id>"+returned_id+"</id>" +
					"<quantity>"+returned_quantity+"</quantity>" +
					"<last_update>"+last_updated+"</last_updated>"+
					"</product_instances>";
			var data_xml="<supplier_return_items>" +
					"<id>"+data_id+"</id>" +
					"<return_id>"+return_id+"</return_id>" +
					"<item_name>"+name+"</item_name>" +
					"<batch>"+batch+"</batch>" +
					"<quantity>"+quantity+"</quantity>" +
					"<refund_amount>"+total+"</refund_amount>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_return_items>";	
		
			if(is_online())
			{
				server_create_simple(data_xml);
				server_update_simple(returned_xml);
			}
			else
			{
				local_create_simple(data_xml);
				local_update_simple(returned_xml);
			}
		});
		
				
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[7];
		$(del_button).off('click');
		$(del_button).on('click',function(event)
		{
			form19_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on("submit", function(event)
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
		
		var total=0;
		
		$("[id^='save_form19']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);	
			total+=parseFloat(subform.elements[4].value);
		});

		form.elements[3].value=total;
		
		var data_id=form.elements[4].value;
		var transaction_id=form.elements[5].value;
		var last_updated=get_my_time();
		
		var data_xml="<supplier_returns>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<return_date>"+return_date+"</return_date>" +
					"<total>"+total+"</total>" +
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
					"<tax>0</tax>" +
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
					"<due_date>"+get_my_time()+"</due_date>" +
					"<mode></mode>" +
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
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form19_update_form();
		});
		$("[id^='save_form19']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}



/**
 * @form New Purchase Bill
 * @param button
 */
function form21_create_item(form)
{
	if(is_create_access('form21'))
	{
		var bill_id=document.getElementById("form21_master").elements[7].value;
		
		var name=form.elements[0].value;
		var quantity=form.elements[1].value;
		var amount=form.elements[2].value;
		var price=form.elements[3].value;
		var batch=form.elements[4].value;
		var data_id=form.elements[5].value;
		
		var last_updated=get_my_time();
		var quantity_data="<product_instances>" +
					"<id></id>" +
					"<product_name>"+name+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<quantity></quantity>" +
					"</product_instances>";
		
		//////updating product quantity in inventory
		fetch_requested_data('',quantity_data,function(quantities)
		{
			for (var i in quantities)
			{
				var q=parseFloat(quantities[i].quantity)+parseFloat(quantity);
				var quantity_xml="<product_instances>" +
						"<id>"+quantities[i].id+"</id>" +
						"<quantity>"+q+"</quantity>" +
						"</product_instances>";
				var data_xml="<supplier_bill_items>" +
						"<id>"+data_id+"</id>" +
						"<product_name>"+name+"</product_name>" +
						"<batch>"+batch+"</batch>" +
						"<unit_price>"+price+"</unit_price>" +
						"<quantity>"+quantity+"</quantity>" +
						"<amount>"+amount+"</amount>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</supplier_bill_items>";	
			
				if(is_online())
				{
					server_create_simple(data_xml);
					server_update_simple(quantity_xml);
				}
				else
				{
					local_create_simple(data_xml);
					local_update_simple(quantity_xml);
				}
				break;
			}
		});
		
				
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[7];
		$(del_button).off('click');
		$(del_button).on('click',function(event)
		{
			form21_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on("submit", function(event)
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
 * @form New supplier Bill
 * @param button
 */
function form21_create_form()
{
	if(is_create_access('form21'))
	{
		var form=document.getElementById("form21_master");
		
		var supplier=form.elements[1].value;
		var bill_id=form.elements[2].value;
		var bill_date=get_raw_time(form.elements[3].value);
		var entry_date=get_raw_time(form.elements[4].value);
		
		var total=0;
		
		$("[id^='save_form21']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[2].value);
		});

		var discount=form.elements[5].value;
		form.elements[6].value=parseFloat(total)-parseFloat(discount);
		
		var data_id=form.elements[7].value;
		var transaction_id=form.elements[8].value;
		var last_updated=get_my_time();
		
		var data_xml="<supplier_bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<entry_date>"+entry_date+"</entry_date>" +
					"<total>"+total+"</total>" +
					"<discount>"+discount+"</discount>" +
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
					"<tax>0</tax>" +
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
					"<due_date>"+get_my_time()+"</due_date>" +
					"<mode></mode>" +
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
				modal28_action(pt_tran_id);
			});
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(transaction_xml);
			local_create_simple(pt_xml);
			local_create_simple_func(payment_xml,function()
			{
				modal28_action(pt_tran_id);
			});
		}

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form21_update_form();
		});
		$("[id^='save_form21']").click();
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
		var order_id=document.getElementById("form24_master").elements[4].value;
		
		var name=form.elements[0].value;
		var quantity=form.elements[1].value;
		var make=form.elements[2].value;
		var price=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<purchase_order_items>" +
				"<id>"+data_id+"</id>" +
				"<product_name>"+name+"</product_name>" +
				"<quantity>"+quantity+"</quantity>" +
				"<order_id>"+order_id+"</order_id>" +
				"<make>"+make+"</make>" +
				"<price>"+price+"</price>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</purchase_order_items>";	
	
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
		
		var del_button=form.elements[6];
		$(del_button).off('click');
		$(del_button).on('click',function(event)
		{
			form24_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on("submit", function(event)
		{
			event.preventDefault();
			form24_update_item(form);
		});
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
		
		var supplier=form.elements[1].value;
		var order_date=get_raw_time(form.elements[2].value);		
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();		
		var data_xml="<purchase_orders>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<order_date>"+order_date+"</order_date>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</purchase_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>purchase_orders</tablename>" +
					"<link_to>form43</link_to>" +
					"<title>Created</title>" +
					"<notes>Purchase order no "+data_id+"</notes>" +
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

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form24_update_form();
		});
		$("[id^='save_form24']").click();
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
		var quantity=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='area_utilization';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<product_name>"+product_name+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<name>"+name+"</name>" +
					"<quantity>"+quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form38</link_to>" +
					"<title>Saved</title>" +
					"<notes>Placed product "+product_name+" at storage "+name+"</notes>" +
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
		$(del_button).off('click');
		$(del_button).on('click',function(event)
		{
			form38_delete_item(del_button);
		});
		$(form).off('submit');

		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form38_update_item(form);
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
		var type=form.elements[0].value;
		var account=form.elements[1].value;
		var amount=form.elements[2].value;
		var notes=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var receiver=account;
		var giver="master";
		if(type=='received')
		{
			giver=account;
			receiver="master";
		}
		var data_xml="<cash_register>" +
					"<id>"+data_id+"</id>" +
					"<type>"+type+"</type>" +
					"<acc_name>"+account+"</acc_name>" +
					"<notes>"+notes+"</notes>" +
					"<amount>"+amount+"</amount>" +
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
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+amount+"</amount>" +
					"<receiver>"+giver+"</receiver>" +
					"<giver>"+receiver+"</giver>" +
					"<tax>0</tax>" +
					"<last_updated>"+get_my_time()+"</last_updated>" +
					"</transactions>";
		var payment_id=get_my_time();
		var transaction2_xml="<transactions>" +
					"<id>"+payment_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
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
					"<date>"+get_my_time()+"</date>" +
					"<due_date>"+get_my_time()+"</due_date>" +
					"<mode>cash</mode>" +
					"<transaction_id>"+payment_id+"</transaction_id>" +
					"<bill_id>"+data_id+"</bill_id>" +
					"<last_updated>"+get_my_time()+"</last_updated>" +
					"</payments>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
			server_create_simple(transaction_xml);
			server_create_simple(transaction2_xml);
			server_create_simple(payment_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_simple(transaction_xml);
			local_create_simple(transaction2_xml);
			local_create_simple(payment_xml);
		}
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		var del_button=form.elements[6];
		$(del_button).off('click');
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
		$(del_button).off('click');
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
		$(del_button).off('click');
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
		var data_xml="<attribute>" +
					"<id>"+data_id+"</id>" +
					"<name>"+product+"</name>" +
					"<type>product</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attribute>";	
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
		$(del_button).off('click');
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
					"<notes>Attribute "+category+" for service "+service+"</notes>" +
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
		$(del_button).off('click');
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
		$(del_button).off('click');
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
		$(del_button).off('click');
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
		$(del_button).off('click');
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
		$(del_button).off('click');
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
		var order_id=document.getElementById("form69_master").elements[4].value;
		
		var name=form.elements[0].value;
		var quantity=form.elements[1].value;
		var notes=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<sale_order_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<quantity>"+quantity+"</quantity>" +
				"<order_id>"+order_id+"</order_id>" +
				"<notes>"+notes+"</notes>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</sale_order_items>";	
	
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
		
		var del_button=form.elements[5];
		$(del_button).off('click');
		$(del_button).on('click',function(event)
		{
			form69_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on("submit", function(event)
		{
			event.preventDefault();
			form69_update_item(form);
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
function form69_create_form()
{
	if(is_create_access('form69'))
	{
		var form=document.getElementById("form69_master");
		
		var customer=form.elements[1].value;
		var order_date=get_raw_time(form.elements[2].value);		
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();		
		var data_xml="<sale_orders>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer+"</customer_name>" +
					"<order_date>"+order_date+"</order_date>" +
					"<type>product</type>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_orders</tablename>" +
					"<link_to>form70</link_to>" +
					"<title>Created</title>" +
					"<notes>Sale order no "+data_id+"</notes>" +
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

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form69_update_form();
		});
		$("[id^='save_form69']").click();
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
		var bill_id=document.getElementById("form72_master").elements[7].value;
		
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
		}
		else
		{
			var quantity_data="<product_instances>" +
						"<id></id>" +
						"<product_name>"+name+"</product_name>" +
						"<batch>"+batch+"</batch>" +
						"<quantity></quantity>" +
						"</product_instances>";
			
			//////updating product quantity in inventory
			fetch_requested_data('',quantity_data,function(quantities)
			{
				for (var i in quantities)
				{
					var q=parseFloat(quantities[i].quantity)-parseFloat(quantity);
					var quantity_xml="<product_instances>" +
							"<id>"+quantities[i].id+"</id>" +
							"<quantity>"+q+"</quantity>" +
							"</product_instances>";
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
						server_update_simple(quantity_xml);
					}
					else
					{
						local_create_simple(data_xml);
						local_update_simple(quantity_xml);
					}
					break;
				}
			});
		}
		////adding free service
		if(free_service_name!="" && free_service_name!=null)
		{
			var id=get_new_key();
			rowsHTML="<tr>";
				rowsHTML+="<form id='form72_"+id+"'></form>";
                	rowsHTML+="<td>";
                    	rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+free_service_name+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='text' readonly='readonly' required form='form72_"+id+"' value='"+staff+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<textarea readonly='readonly' required form='form72_"+id+">free with "+name+"</textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='0'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='0'>";
                            rowsHTML+="<img class='filter_icon' src='./images/details.jpeg' form='form72_"+id+"' title='Offer details' onclick='modal6_action($(this));'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td>";
                            rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
                            rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
                            rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
                            rowsHTML+="<input type='hidden' form='form72_"+id+"' value='free with "+name+"'>";
                            rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
                            rowsHTML+="<input type='button' class='save_icon' form='form72_"+id+"' id='save_form72_"+id+"' >";
                            rowsHTML+="<input type='button' class='delete_icon' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='form72_delete_item($(this));'>";
                            rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
                            rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
                            rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
                    rowsHTML+="</td>";
            rowsHTML+="</tr>";

            $('#form72_body').prepend(rowsHTML);

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
			var free_quantity_data="<product_instances>" +
						"<id></id>" +
						"<product_name>"+free_product_name+"</product_name>" +
						"<batch></batch>" +
						"<quantity></quantity>" +
						"</product_instances>";	
			
			//////updating product quantity in inventory
			fetch_requested_data('',free_quantity_data,function(free_quantities)
			{
				free_quantities.sort(function(a,b)
				{
					if(a.quantity>b.quantity)
					{	return 1;}
					else 
					{	return -1;}
				});
				var offer_invalid=true;
				for (var j in free_quantities)
				{
					var q=parseFloat(free_quantities[j].quantity)-parseFloat(free_product_quantity);
					
					if(q>0)
					{
						var id=get_new_key();
						rowsHTML="<tr>";
							rowsHTML+="<form id='form72_"+id+"'></form>";
			                	rowsHTML+="<td>";
			                    	rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+free_product_name+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='text' readonly='readonly' required form='form72_"+id+"' value='"+free_quantities[j].batch+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='"+free_product_quantity+"'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='0'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='0'>";
		                                rowsHTML+="<img class='filter_icon' src='./images/details.jpeg' form='form72_"+id+"' title='Offer details' onclick='modal6_action($(this));'>";
		                        rowsHTML+="</td>";
		                        rowsHTML+="<td>";
		                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
		                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
		                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
		                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='free with "+name+"'>";
		                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
		                                rowsHTML+="<input type='button' class='save_icon' form='form72_"+id+"' id='save_form72_"+id+"' >";
		                                rowsHTML+="<input type='button' class='delete_icon' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='form72_delete_item($(this));'>";
		                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
		                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
		                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
		                        rowsHTML+="</td>";
		                rowsHTML+="</tr>";

		                $('#form72_body').prepend(rowsHTML);

						var free_quantity_xml="<product_instances>" +
									"<id>"+free_quantities[j].id+"</id>" +
									"<quantity>"+q+"</quantity>" +
									"</product_instances>";
						var free_xml="<bill_items>" +
									"<id>"+id+"</id>" +
									"<item_name>"+free_product_name+"</item_name>" +
									"<batch>"+free_quantities[j].batch+"</batch>" +
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
							server_update_simple(free_quantity_xml);
						}
						else
						{
							local_create_simple(free_xml);
							local_update_simple(free_quantity_xml);
						}
						offer_invalid=false;
						break;
					}
				}
				if(offer_invalid)
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
		$(del_button).off('click');
		$(del_button).on('click',function(event)
		{
			form72_delete_item(del_button);
		});

		$(form).off('submit');
		$(form).on("submit", function(event)
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
 * @form New Bill
 * @param button
 */
function form72_create_form()
{
	if(is_create_access('form72'))
	{
		var form=document.getElementById("form72_master");
		
		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form72']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
		});

		form.elements[3].value=amount;
		form.elements[4].value=discount;
		form.elements[5].value=tax;
		form.elements[6].value=total;
		
		var data_id=form.elements[7].value;
		var transaction_id=form.elements[9].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		var offer_data="<offers>" +
				"<offer_type>bill</offer_type>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount compare='less than'>"+(amount-discount)+"</criteria_amount>" +
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
					form.elements[3].value=amount;
					form.elements[4].value=discount;
					form.elements[5].value=tax;
					form.elements[6].value=total;
				}
				else if(offers[i].result_type=='product free')
				{
					var free_product_name=offers[i].free_product_name;
					var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount-discount)/parseFloat(offers[i].criteria_amount)));
					
					var free_quantity_data="<product_instances>" +
								"<id></id>" +
								"<product_name>"+free_product_name+"</product_name>" +
								"<batch></batch>" +
								"<quantity></quantity>" +
								"</product_instances>";	
					
					//////updating product quantity in inventory
					fetch_requested_data('',free_quantity_data,function(free_quantities)
					{
						var offer_invalid=true;
						for (var j in free_quantities)
						{
							var q=parseFloat(free_quantities[j].quantity)-parseFloat(free_product_quantity);
							if(q>0)
							{
								var id=get_new_key();
								rowsHTML="<tr>";
									rowsHTML+="<form id='form72_"+id+"'></form>";
					                	rowsHTML+="<td>";
					                    	rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+free_product_name+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='text' readonly='readonly' required form='form72_"+id+"' value='"+free_quantities[j].batch+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='"+free_product_quantity+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                        	rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='0'>";
				                                rowsHTML+="<img class='filter_icon' src='./images/details.jpeg' form='form72_"+id+"' title='Offer details' onclick='modal6_action($(this));'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='free on the bill amount'>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
				                                rowsHTML+="<input type='submit' class='save_icon' form='form72_"+id+"' id='save_form72_"+id+"' >";
				                                rowsHTML+="<input type='button' class='delete_icon' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='form72_delete_item($(this));'>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
				                        rowsHTML+="</td>";
				                rowsHTML+="</tr>";

				                $('#form72_body').prepend(rowsHTML);

				                var free_quantity_xml="<product_instances>" +
											"<id>"+free_quantities[j].id+"</id>" +
											"<quantity>"+q+"</quantity>" +
											"</product_instances>";
								var free_xml="<bill_items>" +
											"<id>"+id+"</id>" +
											"<item_name>"+free_product_name+"</item_name>" +
											"<batch>"+free_quantities[j].batch+"</batch>" +
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
									server_update_simple(free_quantity_xml);
								}
								else
								{
									local_create_simple(free_xml);
									local_update_simple(free_quantity_xml);
								}
								offer_invalid=false;
								break;
							}
						}
						if(offer_invalid)
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
						rowsHTML+="<form id='form72_"+id+"'></form>";
		                	rowsHTML+="<td>";
		                    	rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+free_service_name+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='text' readonly='readonly' required form='form72_"+id+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<textarea readonly='readonly' required form='form72_"+id+"'>free service</textarea>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                        	rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='0'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='0'>";
	                                rowsHTML+="<img class='filter_icon' src='./images/details.jpeg' form='form72_"+id+"' title='Offer details' onclick='modal6_action($(this));'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='free on the bill amount'>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
	                                rowsHTML+="<input type='submit' class='save_icon' form='form72_"+id+"' id='save_form72_"+id+"' >";
	                                rowsHTML+="<input type='button' class='delete_icon' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='form72_delete_item($(this));'>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
	                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value=''>";
	                        rowsHTML+="</td>";
	                rowsHTML+="</tr>";

	                $('#form72_body').prepend(rowsHTML);

	                var free_xml="<bill_items>" +
								"<id>"+id+"</id>" +
								"<item_name>"+free_product_name+"</item_name>" +
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
						"<due_date>"+get_my_time()+"</due_date>" +
						"<mode>cash</mode>" +
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
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form72_update_form();
		});
		$("[id^='save_form72']").click();
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
function create_bill_from_order(order_id)
{
	if(is_create_access('form12'))
	{
		var bill_type='product';
		var bill_amount=0;
		var bill_total=0;
		var bill_offer="";
		var bill_discount=0;
		var bill_tax=0;
		var pending_items_count=0;
		///////selecting all ordered items////
		var order_item_data="<sale_order_items>" +
				"<id></id>" +
				"<order_id>"+order_id+"</order_id>" +
				"<item_name></item_name>" +
				"<quantity></quantity>" +
				"<notes></notes>" +
				"</sale_order_items>";
		fetch_requested_data('',order_item_data,function(order_items)
		{
			pending_items_count=order_items.length;
			order_items.forEach(function(order_item)
			{
				var item_amount=0;
				var item_total=0;
				var item_offer="";
				var item_discount=0;
				var item_tax=0;
				
				var quantity_data="<product_instances>" +
							"<id></id>" +
							"<product_name>"+order_item.item_name+"</product_name>" +
							"<batch></batch>" +
							"<quantity></quantity>" +
							"<sale_price></sale_price>" +
							"</product_instances>";
				fetch_requested_data('',quantity_data,function(quantities)
				{
					quantities.sort(function(a,b)
					{
						if(a.quantity>b.quantity)
						{	return 1;}
						else 
						{	return -1;}
					});
					
					for (var l in quantities)
					{
						var q=parseFloat(quantities[l].quantity)-parseFloat(order_item.quantity);
						if(q>0)
						{
							//////adding offer details
							item_amount=parseFloat(order_item.quantity)*parseFloat(quantities[l].sale_price);
							var offer_data="<offers>" +
									"<offer_type>product</offer_type>" +
									"<product_name>"+order_item.item_name+"</product_name>" +
									"<batch array='yes'>"+quantities[l].batch+"--all</batch>" +
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
									console.log("found atleast one offer");
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
											console.log("adding free product as per offer");

											var free_product_name=offers[i].free_product_name;
											var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(order_item.quantity)/parseFloat(offers[i].criteria_quantity)));
											
											var free_quantity_data="<product_instances>" +
														"<id></id>" +
														"<product_name>"+free_product_name+"</product_name>" +
														"<batch></batch>" +
														"<quantity></quantity>" +
														"</product_instances>";	
											
											//////updating product quantity in inventory
											fetch_requested_data('',free_quantity_data,function(free_quantities)
											{
												for (var j in free_quantities)
												{
													var q=parseFloat(free_quantities[j].quantity)-parseFloat(free_product_quantity);
													if(q>0)
													{
										                var free_quantity_xml="<product_instances>" +
																	"<id>"+free_quantities[j].id+"</id>" +
																	"<quantity>"+q+"</quantity>" +
																	"</product_instances>";
														var free_xml="<bill_items>" +
																	"<id>"+get_new_key()+"</id>" +
																	"<item_name>"+free_product_name+"</item_name>" +
																	"<batch>"+free_quantities[j].batch+"</batch>" +
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
																	"<last_updated>"+get_my_time()+"</last_updated>" +
																	"</bill_items>";	
														
														if(is_online())
														{
															server_create_simple(free_xml);
															server_update_simple(free_quantity_xml);
														}
														else
														{
															local_create_simple(free_xml);
															local_update_simple(free_quantity_xml);
														}
														break;
													}
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
												item_discount=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
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
											
											var free_quantity_data="<product_instances>" +
														"<id></id>" +
														"<product_name>"+free_product_name+"</product_name>" +
														"<batch></batch>" +
														"<quantity></quantity>" +
														"</product_instances>";	
											
											//////updating product quantity in inventory
											fetch_requested_data('',free_quantity_data,function(free_quantities)
											{
												for (var j in free_quantities)
												{
													var q=parseFloat(free_quantities[j].quantity)-parseFloat(free_product_quantity);
													if(q>0)
													{
										                var free_quantity_xml="<product_instances>" +
																	"<id>"+free_quantities[j].id+"</id>" +
																	"<quantity>"+q+"</quantity>" +
																	"</product_instances>";
														var free_xml="<bill_items>" +
																	"<id>"+id+"</id>" +
																	"<item_name>"+free_product_name+"</item_name>" +
																	"<batch>"+free_quantities[j].batch+"</batch>" +
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
																	"<last_updated>"+last_updated+"</last_updated>" +
																	"</bill_items>";	
														
														if(is_online())
														{
															server_create_simple(free_xml);
															server_update_simple(free_quantity_xml);
														}
														else
														{
															local_create_simple(free_xml);
															local_update_simple(free_quantity_xml);
														}
														break;
													}
												}
											});
										}
										break;
									}
								}
								
								var tax_data="<product_master>" +
										"<name>"+order_item.item_name+"</name>" +
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
									var quantity_xml="<product_instances>" +
											"<id>"+quantities[l].id+"</id>" +
											"<quantity>"+q+"</quantity>" +
											"</product_instances>";
									var data_xml="<bill_items>" +
											"<id>"+get_new_key()+"</id>" +
											"<item_name>"+order_item.item_name+"</item_name>" +
											"<batch>"+quantities[l].batch+"</batch>" +
											"<unit_price>"+quantities[l].sale_price+"</unit_price>" +
											"<quantity>"+order_item.quantity+"</quantity>" +
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
									bill_amount+=item_amount;
									bill_total+=item_total;
									bill_discount+=item_discount;
									bill_tax+=item_tax;
									pending_items_count-=1;
									if(is_online())
									{
										server_create_simple(data_xml);
										server_update_simple(quantity_xml);
									}
									else
									{
										local_create_simple(data_xml);
										local_update_simple(quantity_xml);
									}
								});
								
							});
							
							break;	
						}
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
	  		   			"<status>pending</status>" +
	  		   			"</sale_orders>";
	  		   	fetch_requested_data('',order_data,function(sale_orders)
	  		   	{
	  		   		///////////////////////////////////////////////////////////
	  		   		var offer_data="<offers>" +
							"<offer_type>bill</offer_type>" +
							"<criteria_type>min amount crossed</criteria_type>" +
							"<criteria_amount compare='less than'>"+(bill_amount-bill_discount)+"</criteria_amount>" +
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
								
								var free_quantity_data="<product_instances>" +
											"<id></id>" +
											"<product_name>"+free_product_name+"</product_name>" +
											"<batch></batch>" +
											"<quantity></quantity>" +
											"</product_instances>";	
								
								//////updating product quantity in inventory
								fetch_requested_data('',free_quantity_data,function(free_quantities)
								{
									for (var j in free_quantities)
									{
										var q=parseFloat(free_quantities[j].quantity)-parseFloat(free_product_quantity);
										if(q>0)
										{
							                var free_quantity_xml="<product_instances>" +
														"<id>"+free_quantities[j].id+"</id>" +
														"<quantity>"+q+"</quantity>" +
														"</product_instances>";
											var free_xml="<bill_items>" +
														"<id>"+id+"</id>" +
														"<item_name>"+free_product_name+"</item_name>" +
														"<batch>"+free_quantities[j].batch+"</batch>" +
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
														"<last_updated>"+last_updated+"</last_updated>" +
														"</bill_items>";	
											
											if(is_online())
											{
												server_create_simple(free_xml);
												server_update_simple(free_quantity_xml);
											}
											else
											{
												local_create_simple(free_xml);
												local_update_simple(free_quantity_xml);
											}
											break;
										}
									}
								});
							}
							bill_offer=offers[i].offer_detail;
							break;
						}
						
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
										"<due_date>"+get_my_time()+"</due_date>" +
										"<mode></mode>" +
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