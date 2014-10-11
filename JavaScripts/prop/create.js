/**
 * @form Update Inventory
 * @param button
 */
function form1_create_item(form)
{
	if(is_create_access('form1'))
	{
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var expiry=get_raw_time(form.elements[2].value);
		var price=form.elements[3].value;
		var quantity=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var table='product_instances';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<product_name>"+name+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<expiry>"+expiry+"</expiry>" +
					"<quantity>"+quantity+"</quantity>" +
					"<price>"+price+"</price>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form1</link_to>" +
					"<title>Saved</title>" +
					"<notes>Updated inventory for batch number "+batch+" of "+name+"</notes>" +
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
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form1_update_item(form);
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
function form2_create_item(form)
{
	if(is_create_access('form2'))
	{
		var pamphlet_name=document.getElementById('form2_master').elements[1].value;
		var name=form.elements[0].value;
		var offer_id=form.elements[1].value;
		var offer_detail=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var table='pamphlet_items';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<product_name>"+name+"</product_name>" +
					"<offer_name>"+offer_id+"</offer_name>" +
					"<offer>"+offer_detail+"</offer>" +
					"<pamphlet_name>"+pamphlet_name+"</pamphlet_name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form2</link_to>" +
					"<title>Saved</title>" +
					"<notes>Added product "+name+" to pamphlet "+pamphlet_name+"</notes>" +
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
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form2_update_item(form);
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
		var table='pamphlets';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+p_name+"</name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form2</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved pamphlet "+p_name+"</notes>" +
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
 * @form Manage Assets
 * @param button
 */
function form5_create_item(form)
{
	if(is_create_access('form5'))
	{
		var name=form.elements[0].value;
		var date_inc=get_raw_time(form.elements[1].value);
		var owner=form.elements[2].value;
		var type=form.elements[3].value;
		var value=form.elements[4].value;
		var maintenance=form.elements[5].value;
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var table='assets';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"</name>" +
					"<date_inc>"+date_inc+"</date_inc>" +
					"<owner>"+owner+"</owner>" +
					"<type>"+type+"</type>" +
					"<activity>"+maintenance+"</activity>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form5</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved asset "+name+"</notes>" +
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
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form5_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}

}

/**
 * @formNo 7
 * @form Attendance
 * @param button
 */
function form7_create_item(form)
{
	if(is_create_access('form7'))
	{
		var date=get_raw_time(document.getElementById('form7_header').elements[2].value);
		var name=form.elements[0].value;
		var presence=form.elements[1].value;
		var hours_worked=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var table='attendance';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<presence>"+presence+"</presence>" +
					"<hours_worked>"+hours_worked+"</hours_worked>" +
					"<date>"+date+"</date>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form5</link_to>" +
					"<title>Saved</title>" +
					"<notes>Updated attendance for "+name+"</notes>" +
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
 * @form Manage Staff
 * @param button
 */
function form8_create_item(form)
{
	if(is_create_access('form8'))
	{
		var name=form.elements[0].value;
		var phone=form.elements[1].value;
		var email=form.elements[2].value;
		var status=form.elements[5].value;
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var table='staff';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"</name>" +
					"<phone>"+phone+"</phone>" +
					"<email>"+email+"</email>" +
					"<status>"+status+"</status>" +
					"<acc_name>"+name+" ("+phone+")</acc_name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form8</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved staff record of "+name+"</notes>" +
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
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form8_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Cash Register
 * @param button
 */
function form9_create_item(form)
{
	if(is_create_access('form9'))
	{
		var trans_type=form.elements[0].value;
		var trans_date=get_raw_time(form.elements[1].value);
		var amount=form.elements[2].value;
		var debit_acc=form.elements[3].value;
		var credit_acc=form.elements[4].value;
		var system_generated=form.elements[5].value;
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var table='transactions';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<trans_type>"+trans_type+"</trans_type>" +
					"<trans_date>"+trans_date+"</trans_date>" +
					"<amount>"+amount+"</amount>" +
					"<debit_acc>"+debit_acc+"</debit_acc>" +
					"<credit_acc>"+credit_acc+"</credit_acc>" +
					"<system_generated>"+system_generated+"</system_generated>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form9</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved "+trans_type+" transaction number "+data_id+" of amount "+amount+"</notes>" +
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
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form9_update_item(form);
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
function form10_create_item(form)
{
	if(is_create_access('form10'))
	{
		var bill_id=document.getElementById("form10_master").elements[4].value;
		
		var service=form.elements[0].value;
		var estimated_cost=form.elements[1].value;
		var actual_cost=form.elements[2].value;
		var instructions=form.elements[3].value;
		var staff=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var table='service_instances';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<service_name>"+service+"</service_name>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<estimated_cost>"+estimated_cost+"</estimated_cost>" +
					"<actual_cost>"+actual_cost+"</actual_cost>" +
					"<instructions>"+instructions+"</instructions>" +
					"<staff>"+staff+"</staff>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form10</link_to>" +
					"<title>Saved</title>" +
					"<notes>Added service "+service+" to receipt no "+bill_id+"</notes>" +
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
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form10_update_item(form);
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
	if(is_create_access('form10') || is_update_access('form10'))
	{
		var form=document.getElementById("form10_master");
		
		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		var amount=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='bills';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer+"</customer_name>" +
					"<date_created>"+bill_date+"</date_created>" +
					"<amount>"+amount+"</amount>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form10</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved Bill no "+data_id+"</notes>" +
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
			form10_update_form();
		});
		$("[id^='save_form10']").click();
		//$("#modal3").dialog("open");
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Schedule Payments
 * @param button
 */
function form11_create_item(form)
{
	if(is_create_access('form11'))
	{
		var trans_id=form.elements[0].value;
		var acc_name=form.elements[1].value;
		var amount=form.elements[2].value;
		var due_date=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;
		var date=get_raw_time(form.elements[5].value);
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var table='payments';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<transaction_id>"+trans_id+"</transaction_id>" +
					"<acc_name>"+acc_name+"</acc_name>" +
					"<amount>"+amount+"</amount>" +
					"<due_date>"+due_date+"</due_date>" +
					"<status>"+pamphlet_id+"</pamphlet_id>" +
					"<date>"+date+"</date>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form11</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved payment record for transaction no "+trans_id+" of amount "+amount+"</notes>" +
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
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form11_update_item(form);
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
function form12_save_item(form)
{
	if(is_create_access('form12'))
	{
		var bill_id=document.getElementById("form12_master").elements[7].value;
		
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var price=form.elements[2].value;
		var quantity=form.elements[3].value;
		var total=form.elements[4].value;
		var amount=form.elements[5].value;
		var discount=form.elements[6].value;
		var tax=form.elements[7].value;
		var offer=form.elements[8].value;
		var data_id=form.elements[9].value;
		var free_product_name=form.elements[12].value;
		var free_product_quantity=form.elements[13].value;
		
		var last_updated=get_my_time();
		var table='bill_items';
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
				var data_xml="<"+table+">" +
						"<id>"+data_id+"</id>" +
						"<product_name>"+name+"</product_name>" +
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
						"</"+table+">";	
			
				if(is_online())
				{
					server_create_simple(data_xml);
					server_create_simple(quantity_xml);
				}
				else
				{
					local_create_simple(data_xml);
					local_create_simple(quantity_xml);
				}
				break;
			}
		});
		
		//////adding free product to the bill if applicable
		if(free_product_name!="")
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
				var offer_invalid=true;
				for (var j in free_quantities)
				{
					var q=parseFloat(free_quantities[j].quantity)-parseFloat(free_product_quantity);
					var free_quantity_xml="<product_instances>" +
							"<id>"+free_quantities[j].id+"</id>" +
							"<quantity>"+q+"</quantity>" +
							"</product_instances>";
					if(q>0)
					{
						var free_xml="<bill_items>" +
									"<id>"+get_new_key()+"</id>" +
									"<product_name>"+free_product_name+"</product_name>" +
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
							server_create_simple(free_quantity_xml);
						}
						else
						{
							local_create_simple(free_xml);
							local_create_simple(free_quantity_xml);
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
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form12_update_item(form);
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
function form12_save_form()
{
	if(is_create_access('form12') || is_update_access('form12'))
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
			var form_id=$(this).attr('form');
			var subform=document.getElementById(form_id);
			total+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
		});

		form.elements[3].value=amount;
		form.elements[4].value=discount;
		form.elements[5].value=tax;
		form.elements[6].value=total;
		form.elements[10].value="saved";
		form.elements[11].value="saved";
		
		var data_id=form.elements[7].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		var offer_data="<offers>" +
				"<offer_type>bill</offer_type>" +
				"<product_name></product_name>" +
				"<batch></batch>" +
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
			for(var i in offers)
			{
				if(offers[i].criteria_type=='min amount crossed' && offers[i].criteria_amount<=(amount-discount))
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
								var free_quantity_xml="<product_instances>" +
										"<id>"+free_quantities[j].id+"</id>" +
										"<quantity>"+q+"</quantity>" +
										"</product_instances>";
								if(q>0)
								{
									var free_xml="<bill_items>" +
												"<id>"+get_new_key()+"</id>" +
												"<product_name>"+free_product_name+"</product_name>" +
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
										server_create_simple(free_quantity_xml);
									}
									else
									{
										local_create_simple(free_xml);
										local_create_simple(free_quantity_xml);
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
				}
				break;
			}
			var table='bills';
			var data_xml="<"+table+">" +
						"<id>"+data_id+"</id>" +
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>product</type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</"+table+">";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>"+table+"</tablename>" +
						"<link_to>form12</link_to>" +
						"<title>Saved</title>" +
						"<notes>Saved Bill no "+data_id+"</notes>" +
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
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form12_update_form();
		});
		$("[id^='save_form12']").click();
		//$("#modal3").dialog("open");
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
		var description=form.elements[1].value;
		var assignee=form.elements[2].value;
		var t_due=get_raw_time(form.elements[3].value);
		var t_executed=get_raw_time(form.elements[4].value);
		var status=form.elements[5].value;
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var table='task_instances';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<description>"+description+"</description>" +
					"<assignee>"+assignee+"</assignee>" +
					"<t_due>"+t_due+"</t_due>" +
					"<status>"+status+"</status>" +
					"<t_executed>"+t_executed+"</t_executed>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form14</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved task "+name+" assigned to "+assignee+"</notes>" +
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
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
 * @form Accept Returns
 * @param button
 */
function form15_create_item(form)
{
	if(is_create_access('form15'))
	{
		var customer=form.elements[0].value;
		var bill_id=form.elements[1].value;
		var product_name=form.elements[2].value;
		var batch=form.elements[3].value;
		var amount=form.elements[4].value;
		var quantity=form.elements[5].value;
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var table='returns';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<customer>"+customer+"</customer>" +
					"<product_name>"+product_name+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<quantity>"+quantity+"</quantity>" +
					"<amount>"+amount+"</amount>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form15</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved returned item "+product_name+" from "+customer+"</notes>" +
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
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form15_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Returns
 * @param button
 */
function form19_create_item(form)
{
	if(is_create_access('form19'))
	{		
		var product_name=form.elements[0].value;
		var batch=form.elements[1].value;
		var sup_bill_id=form.elements[2].value;
		var supplier=form.elements[3].value;
		var reason=form.elements[4].value;
		var quantity=form.elements[5].value;
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var table='supplier_returns';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<product_name>"+product_name+"</product_name>" +
					"<batch>"+offer_id+"</offer_id>" +
					"<quantity>"+quantity+"</quantity>" +
					"<sub_bill_id>"+sub_bill_id+"</sub_bill_id>" +
					"<reason>"+reason+"</reason>" +
					"<supplier>"+supplier+"</supplier>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form19</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved item "+product_name+" for return to supplier "+supplier+"</notes>" +
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
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form19_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Goods Received
 * @param button
 */
function form21_create_item(form)
{
	if(is_create_access('form21'))
	{
		var bill_id=document.getElementById("form21_master").elements[2].value;
				
		var product_name=form.elements[0].value;
		var batch=form.elements[1].value;
		var expiry=get_raw_time(form.elements[2].value);
		var cost_price=form.elements[3].value;
		var quantity=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var table='goods_received';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<product_name>"+product_name+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<expiry>"+expiry+"</expiry>" +
					"<cost_price>"+cost_price+"</cost_price>" +
					"<quantity>"+quantity+"</quyantity>" +
					"<sup_bill_id>"+bill_id+"</sup_bill_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form21</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved product "+product_name+" to purchase bill no "+bill_id+"</notes>" +
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
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form21_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Goods Received
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
		var entry_date=form.elements[4].value;
		var amount=form.elements[5].value;
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var table='supplier_bills';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<supplier_name>"+supplier+"</supplier_name>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<entry_date>"+entry_date+"</entry_date>" +
					"<amount>"+amount+"</amount>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form21</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved purchase bill no "+bill_id+"</notes>" +
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
			form21_update_form();
		});
		$("[id^='save_form21']").click();
		//$("#modal3").dialog("open");
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Dispose Items
 * @param button
 */
function form22_create_item(form)
{
	if(is_create_access('form22'))
	{
		var product_name=form.elements[0].value;
		var batch=form.elements[1].value;
		var method=form.elements[2].value;
		var quantity=form.elements[3].value;
		var date=get_raw_time(form.elements[4].value);
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var table='disposals';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<product_name>"+name+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<quantity>"+quantity+"</quantity>" +
					"<method>"+method+"</method>" +
					"<date>"+date+"</date>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form22</link_to>" +
					"<title>Saved</title>" +
					"<notes>Selected product "+name+" for disposal</notes>" +
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
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form22_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Purchase Orders
 * @param button
 */
function form24_create_item(form)
{
	if(is_create_access('form24'))
	{
		var order_id=document.getElementById('form24_master').elements[4].value;
				
		var product_name=form.elements[0].value;
		var quantity=form.elements[1].value;
		var data_id=form.elements[2].value;
		var last_updated=get_my_time();
		var table='purchase_items';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<product_name>"+name+"</product_name>" +
					"<quantity>"+quantity+"</quantity>" +
					"<purchase_order>"+order_id+"</purchase_order>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form24</link_to>" +
					"<title>Saved</title>" +
					"<notes>Added product "+product_name+" to purchase order no "+order_id+"</notes>" +
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
		$(form).off('submit');
		$(form).on('submit',function(event)
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
 * @form Purchase Orders
 * @param button
 */
function form24_create_form()
{
	if(is_create_access('form24'))
	{
		var form=document.getElementById("form24_master");
		
		var supplier=form.elements[1].value;
		var order_date=get_raw_time(form.elements[2].value);
		var amount=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='purchase_orders';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<order_date>"+order_date+"</order_date>" +
					"<est_amount>"+est_amount+"</est_amount>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form24</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved purchase order no "+data_id+" from supplier "+supplier+"</notes>" +
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
		//$("#modal3").dialog("open");
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Manage Customers
 * @param button
 */
function form30_create_item(form)
{
	if(is_create_access('form30'))
	{
		var name=form.elements[0].value;
		var phone=form.elements[1].value;
		var email=form.elements[2].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var table='customers';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<phone>"+phone+"</phone>" +
					"<email>"+email+"</email>" +
					"<acc_name unique='yes'>"+name+" ("+phone+")</acc_name>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form30</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved record of customer "+name+"</notes>" +
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
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form30_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Offers
 * @param button
 */
function form35_create_item(form)
{
	if(is_create_access('form35'))
	{
		var offer_name=form.elements[0].value;
		var offer_type=form.elements[1].value;
		var end_date=get_raw_time(form.elements[2].value);
		var offer_detail=form.elements[3].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var table='offers';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<offer_name unique='yes'>"+offer_name+"</offer_name>" +
					"<offer_type>"+offer_type+"</offer_type>" +
					"<end_date>"+end_date+"</end_date>" +
					"<offer_detail>"+offer_detail+"</offer_detail>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form35</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved offer "+offer_name+"</notes>" +
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
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form35_update_item(form);
		});
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
 * @form Manage Products
 * @param button
 */
function form39_create_item(form)
{
	if(is_create_access('form39'))
	{		
		var name=form.elements[0].value;
		var make=form.elements[1].value;
		var description=form.elements[2].value;
		var data_id=form.elements[8].value;
		var pic_id=$("#img_form39_"+data_id).parent().attr('name');
		var url=$("#img_form39_"+data_id).attr('src');
		var manufactured=form.elements[5].value;
		var unit=form.elements[6].value;
		var tags=form.elements[7].value;
		var last_updated=get_my_time();
		var table='product_master';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<make>"+make+"</make>" +
					"<name>"+name+"</name>" +
					"<description>"+description+"</description>" +
					"<manufactured>"+manufactured+"</manufactured>" +
					"<unit>"+unit+"</unit>" +
					"<tags>"+tags+"</tags>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form39</link_to>" +
					"<title>Saved</title>" +
					"<notes>Added product "+name+" to inventory</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var pic_xml="<documents>" +
					"<id>"+pic_id+"</id>" +
					"<url>"+url+"</url>" +
					"<doc_type>product_master</doc_type>" +
					"<target_id>"+data_id+"</target_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</documents>";
		var pic_activity_xml="<activity>" +
					"<data_id>"+pic_id+"</data_id>" +
					"<tablename>documents</tablename>" +
					"<link_to>form39</link_to>" +
					"<title>Saved</title>" +
					"<notes>Updated picture for product "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row(data_xml,activity_xml);
			server_create_row(pic_xml,pic_activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
			local_create_row(pic_xml,pic_activity_xml);
		}	
		for(var i=0;i<9;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form39_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Vendors
 * @param button
 */
function form40_create_item(form)
{
	if(is_create_access('form40'))
	{
		var name=form.elements[0].value;
		var phone=form.elements[1].value;
		var email=form.elements[2].value;
		var address=form.elements[3].value;
		var notes=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var table='suppliers';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<address>"+address+"</address>" +
					"<phone>"+phone+"</phone>" +
					"<notes>"+notes+"</notes>" +
					"<email>"+email+"</email>" +
					"<acc_name unique='yes'>"+name+" ("+phone+")</acc_name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form40</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved record for supplier "+name+"</notes>" +
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
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form40_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * formNo 56
 * form Expense Register
 * @param button
 */
function form56_create_item(form)
{
	if(is_create_access('form56'))
	{
		var expense_date=get_raw_time(form.elements[0].value);
		var to_account=form.elements[1].value;
		var description=form.elements[2].value;
		var amount=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='expenses';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<expense_date>"+expense_date+"</expense_date>" +
					"<to_acc>"+to_account+"</to_acc>" +
					"<description>"+description+"</description>" +
					"<amount>"+amount+"</amount>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form56</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved expense item no "+data_id+" of amount "+amount+"</notes>" +
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
		var table='pre_requisites';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+service+"</name>" +
					"<type>service</type>" +
					"<requisite_type>"+type+"</requisite_type>" +
					"<requisite_name>"+requisite+"</requisite_name>" +
					"<quantity>"+quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form58</link_to>" +
					"<title>Saved</title>" +
					"<notes>Added pre-requisite for service "+service+"</notes>" +
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
					"<title>Saved</title>" +
					"<notes>Added pre-requisite for product "+product+"</notes>" +
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
 * form Product Categories
 * @param button
 */
function form60_create_item(form)
{
	if(is_create_access('form60'))
	{
		var product=form.elements[0].value;
		var category=form.elements[1].value;
		var data_id=form.elements[2].value;
		var last_updated=get_my_time();
		var table='categories';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+product+"</name>" +
					"<type>product</type>" +
					"<category>"+category+"</category>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form60</link_to>" +
					"<title>Saved</title>" +
					"<notes>Added category "+category+" for product "+product+"</notes>" +
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
 * form service Categories
 * @param button
 */
function form61_create_item(form)
{
	if(is_create_access('form61'))
	{
		var service=form.elements[0].value;
		var category=form.elements[1].value;
		var data_id=form.elements[2].value;
		var last_updated=get_my_time();
		var table='categories';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+service+"</name>" +
					"<type>service</type>" +
					"<category>"+category+"</category>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form61</link_to>" +
					"<title>Saved</title>" +
					"<notes>Added category "+category+" for service "+service+"</notes>" +
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
					"<title>Saved</title>" +
					"<notes>Added review for product "+product+"</notes>" +
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
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+service+"</name>" +
					"<type>service</type>" +
					"<reviewer>"+reviewer+"</reviewer>" +
					"<detail>"+detail+"</detail>" +
					"<rating>"+rating+"</rating>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form63</link_to>" +
					"<title>Saved</title>" +
					"<notes>Added review for service "+service+"</notes>" +
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
		var table='cross_sells';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+service+"</name>" +
					"<type>service</type>" +
					"<cross_type>"+cross_type+"</cross_type>" +
					"<cross_name>"+cross_name+"</cross_name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form64</link_to>" +
					"<title>Saved</title>" +
					"<notes>Added cross selling of "+cross_name+" to service "+service+"</notes>" +
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
					"<title>Saved</title>" +
					"<notes>Added cross selling of "+cross_name+" to product "+product+"</notes>" +
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
