/**
 * @form Update Inventory
 * @param button
 */
function form1_update_item(form)
{
	if(is_update_access('form1'))
	{
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var cost_price=form.elements[2].value;
		var expiry=get_raw_time(form.elements[4].value);
		var system_quantity=form.elements[5].value;
		var actual_quantity=form.elements[6].value;
		var quantity=parseFloat(actual_quantity)-parseFloat(system_quantity);
		var data_id=form.elements[7].value;
		var last_updated=get_my_time();
		var data_xml="<product_instances>" +
					"<id>"+data_id+"</id>" +
					"<product_name>"+name+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<expiry>"+expiry+"</expiry>" +
					"<cost_price>"+cost_price+"</cost_price>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</product_instances>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>product_instances</tablename>" +
					"<link_to>form1</link_to>" +
					"<title>Updated</title>" +
					"<notes>Inventory for batch number "+batch+" of "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var adjust_xml="<inventory_adjust>" +
					"<id>"+get_new_key()+"</id>" +
					"<product_name>"+name+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<quantity>"+quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</inventory_adjust>";	
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
			if(quantity!==0)
			{
				server_create_simple(adjust_xml);
			}
		}
		else
		{
			local_update_row(data_xml,activity_xml);
			if(quantity!==0)
			{
				local_create_simple(adjust_xml);
			}
		}
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form2_update_form()
{
	if(is_update_access('form2'))
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
					"<title>Updated</title>" +
					"<notes>Pamphlet "+p_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
	
		$("[id^='save_form2_']").click();
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
function form5_update_item(form)
{
	if(is_update_access('form5'))
	{
		var name=form.elements[0].value;
		var type=form.elements[1].value;
		var description=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<assets>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<type>"+type+"</type>" +
					"<description>"+description+"</description>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</assets>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>assets</tablename>" +
					"<link_to>form5</link_to>" +
					"<title>Updated</title>" +
					"<notes>Asset "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form7_update_item(form)
{
	if(is_update_access('form7'))
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
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attendance</tablename>" +
					"<link_to>form7</link_to>" +
					"<title>Updated</title>" +
					"<notes>Attendance for "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

function form7_update_form()
{
	if(is_update_access('form7'))
	{
		$("[id^='save_form7_']").click();
		form7_header_ini();
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
function form8_update_item(form)
{
	if(is_update_access('form8'))
	{
		var name=form.elements[0].value;
		var phone=form.elements[1].value;
		var email=form.elements[2].value;
		var status=form.elements[5].value;
		var data_id=form.elements[6].value;
		var address=form.elements[9].value;
		var pincode=form.elements[10].value;
		var city=form.elements[11].value;
		var state=form.elements[12].value;
		var country=form.elements[13].value;
		var add_status=form.elements[14].value;
		var joining_date=form.elements[15].value;
		var qual=form.elements[16].value;
		var skills=form.elements[17].value;
		var fixed_comp=form.elements[18].value;
		var var_comp=form.elements[19].value;
		var pto=form.elements[20].value;
		var hours=form.elements[21].value;
		var last_updated=get_my_time();
		var data_xml="<staff>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<phone>"+phone+"</phone>" +
					"<email>"+email+"</email>" +
					"<acc_name>"+name+" ("+phone+")</acc_name>" +
					"<status>"+status+"</status>" +
					"<joining_date>"+joining_date+"</joining_date>" +
					"<qualification>"+qual+"</qualification>" +
					"<skills>"+skills+"</skills>" +
					"<monthly_hours>"+hours+"</monthly_hours>" +
					"<fixed_comp>"+fixed_comp+"</fixed_comp>" +
					"<variable_comp_rate>"+var_comp+"</variable_comp_rate>" +
					"<allowed_pto>"+pto+"</allowed_pto>" +
					"<address>"+address+"</address>" +
					"<pincode>"+pincode+"</pincode>" +
					"<city>"+city+"</city>" +
					"<state>"+state+"</state>" +
					"<country>"+country+"</country>" +
					"<address_status>"+add_status+"</address_status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</staff>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>staff</tablename>" +
					"<link_to>form8</link_to>" +
					"<title>Updated</title>" +
					"<notes>Staff profile of "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var account_xml="<accounts>" +
					"<id>"+data_id+"</id>" +
					"<acc_name>"+name+" ("+phone+")</acc_name>" +
					"<type>staff</type>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</accounts>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
			server_update_simple(account_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
			server_update_simple(account_xml);
		}	
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form10_update_form()
{
	if(is_update_access('form10'))
	{
		var form=document.getElementById("form10_master");
		
		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		
		var message_string="Bill from: "+get_session_var('title')+"\nAddress: "+get_session_var('address');
		
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form10_']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
			
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Price: "+subform.elements[3].value;
		});

		
		var data_id=form.elements[3].value;
		var transaction_id=form.elements[5].value;
		var last_updated=get_my_time();
		var offer_detail="";	
				
		/////deleting existing free services
		////optimise this query....it will not delete the desired records
		////deleting these records may be problematic
		var items_data="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<staff></staff>" +
				"<notes></notes>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"<free_with>bill</free_with>" +
				"<last_updated upperbound='yes'>"+last_updated+"</last_updated>" +
				"</bill_items>";
		
		if(is_online())
		{
			server_delete_simple(items_data);
		}
		else
		{
			local_delete_simple(items_data);
		}
		///////////////////////////////////
		
		var offer_data="<offers>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount upperbound='yes'>"+(amount-discount)+"</criteria_amount>" +
				"<offer_type exact='yes'>bill</offer_type>" +
				"<result_type></result_type>" +
				"<discount_percent></discount_percent>" +
				"<discount_amount></discount_amount>" +
				"<free_service_name></free_service_name>" +
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
						"<type>service</type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form42</link_to>" +
						"<title>Updated</title>" +
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
			
			message_string+="\nAmount: "+amount;
			message_string+="\ndiscount: "+discount;
			message_string+="\nTax: "+tax;
			message_string+="\nTotal: "+total;
			
			var subject="Bill from "+get_session_var('title');
			$('#form10_share').show();
			$('#form10_share').click(function()
			{
				modal44_action(customer,subject,message_string);
			});

			var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
						"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+discount+"</br>" +
						"Rs. "+tax+"</br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
			$('#form10_foot').html(total_row);

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
					if(is_online())
					{
						server_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y]);
						});
					}
					else
					{
						local_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y]);
						});
					}
					break;
				}
			},payment_data);
			
		});
		$("[id^='save_form10_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Payments
 * @param button
 */
function form11_update_item(form)
{
	if(is_update_access('form11'))
	{
		var type=form.elements[0].value;
		var acc_name=form.elements[1].value;
		var total_amount=form.elements[2].value;
		var paid_amount=form.elements[3].value;
		var status=form.elements[4].value;
		var data_id=form.elements[6].value;
		var mode=form.elements[7].value;
		var date=form.elements[8].value;
		if(status=='closed' && date=="")
		{
			date=get_my_time();
		}
		var due_date=form.elements[9].value;
		var notes=form.elements[11].value;
		var share_message=form.elements[13];
		var last_updated=get_my_time();
		var data_xml="<payments>" +
					"<id>"+data_id+"</id>" +
					"<acc_name>"+acc_name+"</acc_name>" +
					"<total_amount>"+total_amount+"</total_amount>" +
					"<paid_amount>"+paid_amount+"</paid_amount>" +
					"<due_date>"+due_date+"</due_date>" +
					"<status>"+status+"</status>" +
					"<notes>"+notes+"</notes>" +
					"<mode>"+mode+"</mode>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</payments>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>payments</tablename>" +
					"<link_to>form11</link_to>" +
					"<title>Updated</title>";
		var message_string="";
		if(type=='paid')
		{
			activity_xml+="<notes>Payment of amount Rs. "+total_amount+" paid to "+acc_name+"</notes>";
			message_string="Payment of Rs: "+paid_amount+" paid on "+get_my_past_date(date)+".\n The status of this payment is "+status;
		}
		else
		{
			activity_xml+="<notes>Payment of amount Rs. "+total_amount+" received from "+acc_name+"</notes>";
			message_string="Payment of Rs: "+paid_amount+" received on "+get_my_past_date(date)+".\n The status of this payment is "+status;
		}
		activity_xml+="<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		share_message.value=message_string;
		
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form12_update_form()
{
	if(is_update_access('form12'))
	{
		var form=document.getElementById("form12_master");
		
		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		
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

		
		var data_id=form.elements[3].value;
		var transaction_id=form.elements[5].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		/////deleting existing free products
		var items_data="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<batch></batch>" +
				"<quantity></quantity>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"<free_with>bill</free_with>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";

		if(is_online())
		{
			server_delete_simple(items_data);
		}
		else
		{
			local_delete_simple(items_data);
		}
		///////////////////////////////////
		
		var offer_data="<offers>" +
				"<offer_type exact='yes'>bill</offer_type>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount upperbound='yes'>"+(amount-discount)+"</criteria_amount>" +
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
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='"+free_product_quantity+"'>";
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
				                                rowsHTML+="<input type='submit' class='save_icon' form='form12_"+id+"' id='save_form12_"+id+"' >";
				                                rowsHTML+="<input type='button' class='delete_icon' form='form12_"+id+"' id='delete_form12_"+id+"' onclick='form12_delete_item($(this));'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
				                        rowsHTML+="</td>";
				                rowsHTML+="</tr>";

				                $('#form12_body').prepend(rowsHTML);
				                
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
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>product</type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form42</link_to>" +
						"<title>Updated</title>" +
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
					if(is_online())
					{
						server_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y]);
						});
					}
					else
					{
						local_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y]);
						});
					}
					break;
				}
			},payment_data);
			
		});
		$("[id^='save_form12_']").click();
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
function form14_update_item(form)
{
	if(is_update_access('form14'))
	{
		var name=form.elements[0].value;
		var assignee=form.elements[1].value;
		var t_due=get_raw_time(form.elements[2].value);
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<assignee>"+assignee+"</assignee>" +
					"<t_due>"+t_due+"</t_due>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_instances>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>task_instances</tablename>" +
					"<link_to>form14</link_to>" +
					"<title>Updated</title>" +
					"<notes>Task "+name+" assigned to "+assignee+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		
		var message_string="Due time: "+form.elements[2].value+"\nTask: "+name+"\nAssignee:"+assignee;
		message_string=encodeURIComponent(message_string);
		$("#form14_whatsapp_"+data_id).attr('href',"whatsapp://send?text="+message_string);
		$("#form14_whatsapp_"+data_id).show();

		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form15_update_form()
{
	if(is_create_access('form15'))
	{
		var form=document.getElementById("form15_master");
		
		var customer=form.elements[1].value;
		var return_date=get_raw_time(form.elements[2].value);
				
		var message_string="Returns Bill from:"+get_session_var('title')+"\nAddress: "+get_session_var('address');
		
		var tax=0;
		var total=0;
		
		$("[id^='save_form15_']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Quantity: "+subform.elements[3].value;
			
			if(subform.elements[5].value=='refund')
			{	
				total+=parseFloat(subform.elements[6].value);
				message_string+=" Refund Rs: "+subform.elements[6].value;
			}
			else
			{
				message_string+=" Exchanged";
			}
			tax+=parseFloat(subform.elements[7].value);
			
		});
		
		message_string+="\nTotal: "+total;
		
		var subject="Returns Bill from: "+get_session_var('title');
		$('#form15_share').show();
		$('#form15_share').click(function()
		{
			modal44_action(customer,subject,message_string);
		});
		
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Refund:</td>" +
					"<td>Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		$('#form15_foot').html(total_row);

		var data_id=form.elements[3].value;
		var transaction_id=form.elements[4].value;
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
					"<title>Updated</title>" +
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
						modal28_action(payments[y]);
					});
				}
				else
				{
					local_update_simple_func(payment_xml,function()
					{
						modal28_action(payments[y]);
					});
				}
				break;
			}
		},payment_data);
		$("[id^='save_form15_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form manage Supplier returns
 * @param button
 */
function form19_update_form()
{
	if(is_create_access('form19'))
	{
		var form=document.getElementById("form19_master");
		
		var supplier=form.elements[1].value;
		var return_date=get_raw_time(form.elements[2].value);
				
		var message_string="Returns from:"+get_session_var('title')+"\nAddress: "+get_session_var('address');
		
		var total=0;
		var tax=0;
		
		$("[id^='save_form19_']").each(function(index)
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
					"<title>Updated</title>" +
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
							"<type>received</type>" +
							"<total_amount>"+total+"</total_amount>" +
							"<acc_name>"+supplier+"</acc_name>" +
							"<transaction_id>"+payments[y]+"</transaction_id>" +
							"<bill_id>"+data_id+"</bill_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</payments>";
				var pt_xml="<transactions>" +
							"<id>"+payments[y]+"</id>" +
							"<amount>"+total+"</amount>" +
							"<receiver>master</receiver>" +
							"<giver>"+supplier+"</giver>" +
							"<tax>0</tax>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</transactions>";
				if(is_online())
				{
					server_update_simple_func(payment_xml,function()
					{
						modal26_action(payments[y]);
					});
				}
				else
				{
					local_update_simple_func(payment_xml,function()
					{
						modal26_action(payments[y]);
					});
				}
				break;
			}
		},payment_data);
		$("[id^='save_form19_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form New Supplier Bill
 * @param button
 */
function form21_update_form()
{
	if(is_update_access('form21'))
	{
		var form=document.getElementById("form21_master");
		
		var supplier=form.elements[1].value;
		var bill_id=form.elements[2].value;
		var bill_date=get_raw_time(form.elements[3].value);
		var entry_date=get_raw_time(form.elements[4].value);
		
		var total=0;
		var tax=0;
		var amount=0;
		
		$("[id^='save_form21']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[3].value);
			tax+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
		});

		var discount=0;
		total=total-discount;
		
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+discount+"</br>" +
				"Rs. "+tax+"</br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form21_foot').html(total_row);

		var notes=form.elements[5].value;
		var data_id=form.elements[6].value;
		var transaction_id=form.elements[7].value;
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
					"<notes>"+notes+"</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>supplier_bills</tablename>" +
					"<link_to>form53</link_to>" +
					"<title>Updated</title>" +
					"<notes>Supplier Bill no "+data_id+"</notes>" +
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
							"<acc_name>"+supplier+"</acc_name>" +
							"<transaction_id>"+payments[y]+"</transaction_id>" +
							"<bill_id>"+data_id+"</bill_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</payments>";
				var pt_xml="<transactions>" +
							"<id>"+payments[y]+"</id>" +
							"<amount>"+total+"</amount>" +
							"<receiver>"+supplier+"</receiver>" +
							"<giver>master</giver>" +
							"<tax>0</tax>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</transactions>";
				if(is_online())
				{
					server_update_simple_func(payment_xml,function()
					{
						modal28_action(payments[y]);
					});
				}
				else
				{
					local_update_simple_func(payment_xml,function()
					{
						modal28_action(payments[y]);
					});
				}
				break;
			}
		},payment_data);
			
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
function form24_update_form()
{
	if(is_update_access('form24'))
	{
		var form=document.getElementById("form24_master");
		
		var supplier=form.elements[1].value;
		var order_date=get_raw_time(form.elements[2].value);		
		var notes=form.elements[3].value;		
		var status=form.elements[4].value;		
		var data_id=form.elements[5].value;
		
		var message_string="Order from:"+get_session_var('title')+"\nAddress: "+get_session_var('address');

		$("[id^='save_form24_']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			message_string+="\nProduct: "+subform.elements[0].value;
			message_string+="Quantity: "+subform.elements[1].value;
		});
		
		message_string+="\nOrder Date: "+form.elements[2].value;
		message_string+="\nNotes: "+form.elements[3].value;
		
		var subject="Purchase Order "+get_session_var('title');
		$('#form24_share').show();
		$('#form24_share').click(function()
		{
			modal44_action(customer,subject,message_string);
		});
				
		var last_updated=get_my_time();
		
		var data_xml="<purchase_orders>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<order_date>"+order_date+"</order_date>" +
					"<status>"+status+"</status>" +
					"<notes>"+notes+"</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</purchase_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>purchase_orders</tablename>" +
					"<link_to>form43</link_to>" +
					"<title>Updated</title>" +
					"<notes>Purchase order no "+data_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			$("[id^='save_form24_']").click();
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			$("[id^='save_form24_']").click();
			local_update_row(data_xml,activity_xml);
		}
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
function form30_update_item(form)
{
	if(is_update_access('form30'))
	{
		var name=form.elements[0].value;
		var phone=form.elements[1].value;
		var email=form.elements[2].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var address=form.elements[8].value;
		var pincode=form.elements[9].value;
		var city=form.elements[10].value;
		var state=form.elements[11].value;
		var country=form.elements[12].value;
		var address_status=form.elements[13].value;
		var last_updated=get_my_time();
		var data_xml="<customers>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<phone>"+phone+"</phone>" +
					"<email>"+email+"</email>" +
					"<acc_name>"+name+" ("+phone+")</acc_name>" +
					"<status>"+status+"</status>" +
					"<address>"+address+"</address>" +
					"<pincode>"+pincode+"</pincode>" +
					"<city>"+city+"</city>" +
					"<state>"+state+"</state>" +
					"<country>"+country+"</country>" +
					"<address_status>"+address_status+"</address_status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</customers>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>customers</tablename>" +
					"<link_to>form30</link_to>" +
					"<title>Updated</title>" +
					"<notes>Customer profile "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var account_xml="<accounts>" +
					"<id>"+data_id+"</id>" +
					"<acc_name>"+name+" ("+phone+")</acc_name>" +
					"<type>customer</type>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</accounts>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
			server_update_simple(account_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
			local_update_simple(account_xml);
		}
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form35_update_item(form)
{
	if(is_update_access('form35'))
	{
		var offer_name=form.elements[0].value;
		var offer_type=form.elements[1].value;
		var end_date=get_raw_time(form.elements[2].value);
		var offer_detail=form.elements[3].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<offers>" +
					"<id>"+data_id+"</id>" +
					"<offer_name>"+offer_name+"</offer_name>" +
					"<offer_type>"+offer_type+"</offer_type>" +
					"<end_date>"+end_date+"</end_date>" +
					"<offer_detail>"+offer_detail+"</offer_detail>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</offers>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>offers</tablename>" +
					"<link_to>form35</link_to>" +
					"<title>Saved</title>" +
					"<notes>Offer "+offer_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form38_update_item(form)
{
	if(is_update_access('form38'))
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
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form39_update_item(form)
{
	if(is_update_access('form39'))
	{
		var name=form.elements[0].value;
		var make=form.elements[1].value;
		var description=form.elements[2].value;
		var tax=form.elements[5].value;
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var pic_id=$("#img_form39_"+data_id).parent().attr('name');
		var url=$("#img_form39_"+data_id).attr('src');
		
		var data_xml="<product_master>" +
					"<id>"+data_id+"</id>" +
					"<make>"+make+"</make>" +
					"<name>"+name+"</name>" +
					"<description>"+description+"</description>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</product_master>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>product_master</tablename>" +
					"<link_to>form39</link_to>" +
					"<title>Updated</title>" +
					"<notes>Product "+name+" from inventory</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var pic_xml="<documents>" +
					"<id>"+pic_id+"</id>" +
					"<url>"+url+"</url>" +
					"<doc_type>product_master</doc_type>" +
					"<target_id>"+data_id+"</target_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</documents>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
			server_update_simple(pic_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
			local_update_simple(pic_xml);
		}	
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Suppliers
 * @param button
 */
function form40_update_item(form)
{
	if(is_update_access('form40'))
	{
		var name=form.elements[0].value;
		var phone=form.elements[1].value;
		var email=form.elements[2].value;
		var address=form.elements[3].value;
		var notes=form.elements[4].value;
		var data_id=form.elements[5].value;
		var address=form.elements[8].value;
		var pincode=form.elements[9].value;
		var city=form.elements[10].value;
		var state=form.elements[11].value;
		var country=form.elements[12].value;
		var address_status=form.elements[13].value;
		var last_updated=get_my_time();
		var data_xml="<suppliers>" +
				"<id>"+data_id+"</id>" +
				"<name>"+name+"</name>" +
				"<address>"+address+"</address>" +
				"<phone>"+phone+"</phone>" +
				"<notes>"+notes+"</notes>" +
				"<acc_name>"+name+" ("+phone+")</acc_name>" +
				"<email>"+email+"</email>" +
				"<address>"+address+"</address>" +
				"<pincode>"+pincode+"</pincode>" +
				"<city>"+city+"</city>" +
				"<state>"+state+"</state>" +
				"<country>"+country+"</country>" +
				"<address_status>"+address_status+"</address_status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</suppliers>";	
		var activity_xml="<activity>" +
				"<data_id>"+data_id+"</data_id>" +
				"<tablename>suppliers</tablename>" +
				"<link_to>form40</link_to>" +
				"<title>Updated</title>" +
				"<notes>Supplier profile "+name+"</notes>" +
				"<updated_by>"+get_name()+"</updated_by>" +
				"</activity>";
		var account_xml="<accounts>" +
				"<id>"+data_id+"</id>" +
				"<acc_name>"+name+" ("+phone+")</acc_name>" +
				"<type>supplier</type>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</accounts>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
			server_update_simple(account_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
			local_update_simple(account_xml);
		}	
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Verify Customer Geo-location
 * @param button
 */
function form41_update_item(form)
{
	if(is_update_access('form41'))
	{
		var name=form.elements[0].value;
		var lat=form.elements[1].value;
		var lng=form.elements[2].value;
		var data_id=form.elements[3].value;
		var button=form.elements[4];
		$(button).hide();		

		var last_updated=get_my_time();
		var data_xml="<customers>" +
					"<id>"+data_id+"</id>" +
					"<lat>"+lat+"</lat>" +
					"<lng>"+lng+"</lng>" +
					"<address_status>confirmed</address_status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</customers>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>customers</tablename>" +
					"<link_to>form41</link_to>" +
					"<title>Updated</title>" +
					"<notes>Geo-location of customer "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Verify Customer Geo-location
 * @param button
 */
function form41_update_master(form)
{
	if(is_update_access('form41'))
	{
		var lat_lng_data="<user_preferences>" +
				"<id></id>" +
				"<name array='yes'>--lat--lng--</name>" +
				"</user_preferences>";
		
		fetch_requested_data('',lat_lng_data,function(lat_lng)
		{
			var lat=form.elements[1].value;
			var lng=form.elements[2].value;
			var button=form.elements[3];
			$(button).hide();		
			
			lat_lng.forEach(function(ll)
			{
				var value=lng;
				if(ll.name==='lat')
				{
					value=lat;
				}
				var last_updated=get_my_time();
				var data_xml="<user_preferences>" +
							"<id>"+ll.id+"</id>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</user_preferences>";
				var activity_xml="<activity>" +
							"<data_id>"+ll.id+"</data_id>" +
							"<tablename>user_preferences</tablename>" +
							"<link_to>form46</link_to>" +
							"<title>Updated</title>" +
							"<notes>Geo-location of business</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				if(is_online())
				{
					server_update_row(data_xml,activity_xml);
				}
				else
				{
					local_update_row(data_xml,activity_xml);
				}
				set_session_var(ll.name,value);
			});
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Manage Purchase orders
 * @param button
 */
function form43_update_item(form)
{
	if(is_update_access('form43'))
	{
		var data_id=form.elements[0].value;
		var supplier_name=form.elements[1].value;
		var order_date=get_raw_time(form.elements[2].value);
		var notes=form.elements[3].value;
		var status=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<purchase_orders>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier_name+"</supplier>" +
					"<order_date>"+order_date+"</order_date>" +
					"<status>"+status+"</status>" +
					"<notes>"+notes+"</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</purchase_orders>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>purchase_orders</tablename>" +
					"<link_to>form43</link_to>" +
					"<title>Updated</title>" +
					"<notes>Purchase Order no "+data_id+" for supplier "+supplier_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form set defaults
 * @param button
 */
function form46_update_item(form)
{
	if(is_update_access('form46'))
	{
		var name=form.elements[0].getAttribute('data-i18n');
		name=name.substr(name.indexOf('.')+1);
		var value=form.elements[1].value;
		var data_id=form.elements[2].value;
		var element_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<user_preferences>" +
					"<id>"+data_id+"</id>" +
					"<name>"+element_id+"</name>" +
					"<display_name>"+name+"</display_name>" +
					"<value>"+value+"</value>" +
					"<type>other</type>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</user_preferences>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>user_preferences</tablename>" +
					"<link_to>form46</link_to>" +
					"<title>Updated</title>" +
					"<notes>System setting for "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		set_session_var(element_id,value);
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form set defaults
 */
function form46_update_form()
{	
	if(is_update_access('form46'))
	{
		$("[id^='save_form46_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Change Password
 */
function form47_update_form()
{
	show_loader();
	var form=document.getElementById('form47_master');
	var domain=get_domain();
	var username=get_username();
	var current_pass=form.elements[1].value;
	var new_pass=form.elements[2].value;
	var last_updated=get_my_time();
	
	var user_data="<accounts count='1'>" +
			"<id></id>" +
			"<username exact='yes'>"+username+"</username>" +
			"<password></password>" +
			"</accounts>";
	fetch_requested_data('',user_data,function(results)
	{
		for(var i in results)
		{
			var salt='$2a$10$'+domain+'1234567891234567891234';
			var salt_22=salt.substring(0, 29);
			
			var bcrypt = new bCrypt();
			bcrypt.hashpw(current_pass, salt_22, function(currenthash)
			{
				if(currenthash.substring(3)===results[i].password.substring(3))
				{
					console.log(newhash);
					var bcrypt = new bCrypt();
					bcrypt.hashpw(new_pass, salt_22, function(newhash)
					{
						var data_xml="<accounts>" +
									"<id>"+results[i].id+"</id>" +
									"<password>"+newhash+"</password>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</accounts>";
						if(is_online())
						{
							server_update_simple(data_xml);
						}
						else
						{
							local_update_simple(data_xml);
						}
						$(form).find('.form47_verify').html('Password updated.');
						form.elements[1].value="";
						form.elements[2].value="";
						form.elements[3].value="";
						hide_loader();
					}, function() {});
				}
				else
				{
					$(form).find('.form47_verify').html('Incorrect password. Try again!');
					form.elements[1].value="";
					form.elements[2].value="";
					form.elements[3].value="";
					hide_loader();
				}
			}, function() {});
			break;
		}
	});
}

/**
 * @form Select Reports
 * @param button
 */
function form48_update_item(form)
{
	if(is_update_access('form48'))
	{
		var name=form.elements[0].getAttribute('data-i18n');
		name=name.substr(name.indexOf('.')+1);
		var value='unchecked';
		if(form.elements[1].checked)
			value='checked';
		var data_id=form.elements[2].value;
		var element_id=form.elements[3].value;
		var last_updated=get_my_time();
		var table='user_preferences';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+element_id+"</name>" +
					"<display_name>"+name+"</display_name>" +
					"<value>"+value+"</value>" +
					"<type>report</type>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form48</link_to>" +
					"<title>Updated</title>" +
					"<notes>Selected "+name+" report for display</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Select Reports
 */
function form48_update_form()
{	
	if(is_update_access('form48'))
	{
		$("[id^='save_form48_']").click();
		//$("#modal3").dialog("open");
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Select Forms
 * @param button
 */
function form49_update_item(form)
{
	if(is_update_access('form49'))
	{
		var name=form.elements[0].getAttribute('data-i18n');
		name=name.substr(name.indexOf('.')+1);
		var value='unchecked';
		if(form.elements[1].checked)
			value='checked';
		var data_id=form.elements[2].value;
		var element_id=form.elements[3].value;
		var last_updated=get_my_time();
		var table='user_preferences';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+element_id+"</name>" +
					"<display_name>"+name+"</display_name>" +
					"<value>"+value+"</value>" +
					"<type>form</type>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form49</link_to>" +
					"<title>Updated</title>" +
					"<notes>Selected "+name+" form</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Select Forms
 */
function form49_update_form()
{	
	if(is_update_access('form49'))
	{
		$("[id^='save_form49_']").click();
		//$("#modal3").dialog("open");
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Set Accounting Defaults
 * @param button
 */
function form50_update_item(form)
{
	if(is_update_access('form50'))
	{
		var name=form.elements[0].value;
		var value=form.elements[1].value;;
		var data_id=form.elements[2].value;
		var element_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<user_preferences>" +
					"<id>"+data_id+"</id>" +
					"<name>"+element_id+"</name>" +
					"<display_name>"+name+"</display_name>" +
					"<value>"+value+"</value>" +
					"<type>accounting</type>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</user_preferences>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>user_preferences</tablename>" +
					"<link_to>form50</link_to>" +
					"<title>Updated</title>" +
					"<notes>"+name+" accounting property</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		set_session_var(element_id,value);
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Select Accounting Principles
 */
function form50_update_form()
{
	if(is_update_access('form50'))
	{
		$("[id^='save_form50_']").click();
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
function form51_update_item(form)
{
	if(is_update_access('form51'))
	{
		var master_form=document.getElementById('form51_master');
		var username=master_form.elements[1].value;
			
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
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}	
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 51
 * form Access Control
 * @param button
 */
function form51_update_form()
{
	if(is_update_access('form51'))
	{
		var form=document.getElementById("form51_master");
		
		var username=form.elements[1].value;
		var password=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		if(password=="")
		{
			var data_xml="<accounts>" +
						"<id>"+data_id+"</id>" +
						"<username>"+username+"</username>" +
						"<status>active</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</accounts>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>accounts</tablename>" +
						"<link_to>form51</link_to>" +
						"<title>Updated</title>" +
						"<notes>Access for "+username+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_update_row(data_xml,activity_xml);
			}
			else
			{
				local_update_row(data_xml,activity_xml);
			}
			
			$("[id^='save_form51_']").click();
		}
		else
		{
			var salt='$2a$10$'+get_domain()+'1234567891234567891234';
			var salt_22=salt.substring(0, 29);
			
			var bcrypt = new bCrypt();
			bcrypt.hashpw(password, salt_22, function(newhash)
			{
				var data_xml="<accounts>" +
							"<id>"+data_id+"</id>" +
							"<username>"+username+"</username>" +
							"<password>"+newhash+"</password>" +
							"<status>active</status>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</accounts>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>accounts</tablename>" +
							"<link_to>form51</link_to>" +
							"<title>Updated</title>" +
							"<notes>Access for "+username+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				if(is_online())
				{
					server_update_row(data_xml,activity_xml);
				}
				else
				{
					local_update_row(data_xml,activity_xml);
				}
				
				$("[id^='save_form51_']").click();
			}, function() {});
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Select print templates
 * @param button
 */
function form54_update_item(form)
{
	if(is_update_access('form54'))
	{
		var name=form.elements[0].getAttribute('data-i18n');
		name=name.substr(name.indexOf('.')+1);
		var value=form.elements[1].value;
		var data_id=form.elements[2].value;
		var element_id=form.elements[3].value;
		var last_updated=get_my_time();
		var table='user_preferences';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+element_id+"</name>" +
					"<display_name>"+name+"</display_name>" +
					"<value>"+value+"</value>" +
					"<type>template</type>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form50</link_to>" +
					"<title>Updated</title>" +
					"<notes>Selected "+value+" template for "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Select Print templates
 * @param button
 */
function form54_update_form(button)
{
	if(is_update_access('form54'))
	{
		$("[id^='save_form54_']").click();
		//$("#modal3").dialog("open");
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
function form56_update_item(form)
{
	if(is_update_access('form56'))
	{
		var account=form.elements[0].value;
		var type=form.elements[1].value;
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
					"<title>Updated</title>" +
					"<notes>Cash record of amount "+amount+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 57
 * form Manage Services
 * @param button
 */
function form57_update_item(form)
{
	if(is_update_access('form57'))
	{
		var service=form.elements[0].value;
		var description=form.elements[1].value;
		var price=form.elements[2].value;
		var tax=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<services>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+service+"</name>" +
					"<description>"+description+"</description>" +
					"<price>"+price+"</price>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</services>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>services</tablename>" +
					"<link_to>form57</link_to>" +
					"<title>Updated</title>" +
					"<notes>Service "+service+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form58_update_item(form)
{
	if(is_update_access('form58'))
	{
		var service=form.elements[0].value;
		var type=form.elements[1].value;
		var requisite=form.elements[2].value;
		var quantity=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='pre_requisites';
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
					"<title>Updated</title>" +
					"<notes>Pre-requisite for service "+service+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form59_update_item(form)
{
	if(is_update_access('form59'))
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
					"<title>Updated</title>" +
					"<notes>Pre-requisite for product "+product+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form60_update_item(form)
{
	if(is_update_access('form60'))
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
					"<title>Updated</title>" +
					"<notes>Attribute "+attribute+" for product "+product+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 61
 * form Service Attributes
 * @param button
 */
function form61_update_item(form)
{
	if(is_update_access('form61'))
	{
		var service=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attribute>" +
					"<id>"+data_id+"</id>" +
					"<name>"+service+"</name>" +
					"<type>service</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form61</link_to>" +
					"<title>Updated</title>" +
					"<notes>Attribute "+attribute+" for service "+service+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form62_update_item(form)
{
	if(is_update_access('form62'))
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
					"<title>Updated</title>" +
					"<notes>Review for product "+product+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form63_update_item(form)
{
	if(is_update_access('form63'))
	{
		var service=form.elements[0].value;
		var reviewer=form.elements[1].value;
		var detail=form.elements[2].value;
		var rating=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
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
					"<title>Updated</title>" +
					"<notes>Review for service "+service+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form64_update_item(form)
{
	if(is_update_access('form64'))
	{
		var service=form.elements[0].value;
		var cross_type=form.elements[1].value;
		var cross_name=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var table='cross_sells';
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
					"<title>updated</title>" +
					"<notes>Cross selling of "+cross_name+" with service "+service+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form66_update_item(form)
{
	if(is_update_access('form66'))
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
					"<title>Updated</title>" +
					"<notes>Cross selling of "+cross_name+" to product "+product+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form New Sale orders
 * @param button
 */
function form69_update_item(form)
{
	if(is_update_access('form69'))
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
					"<notes>"+notes+"</notes>" +
					"<order_id>"+order_id+"</order_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_order_items>";	
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form69_update_form()
{
	if(is_update_access('form69'))
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
					"<title>Updated</title>" +
					"<notes>Bill no "+data_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			$("[id^='save_form69_']").click();
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			$("[id^='save_form69_']").click();
			local_update_row(data_xml,activity_xml);
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Sale orders
 * @param button
 */
function form70_update_item(form)
{
	if(is_update_access('form70'))
	{
		var data_id=form.elements[0].value;
		var customer_name=form.elements[1].value;
		var order_date=get_raw_time(form.elements[2].value);
		var status=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<sale_orders>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer_name+"</customer_name>" +
					"<order_date>"+order_date+"</order_date>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_orders>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_orders</tablename>" +
					"<link_to>form70</link_to>" +
					"<title>Updated</title>" +
					"<notes>Order no "+data_id+" for customer "+customer_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Manage accounts
 * @param button
 */
function form71_update_item(form)
{
	if(is_update_access('form71'))
	{
		var name=form.elements[0].value;
		var type=form.elements[1].value;
		var description=form.elements[2].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<accounts>" +
					"<id>"+data_id+"</id>" +
					"<acc_name>"+name+"</acc_name>" +
					"<description>"+description+"</description>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</accounts>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>accounts</tablename>" +
					"<link_to>form71</link_to>" +
					"<title>Updated</title>" +
					"<notes>Account "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form72_update_form()
{
	if(is_create_access('form72'))
	{
		var form=document.getElementById("form72_master");
		
		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		
		var message_string="Bill from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');
		var mail_string="Bill from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');
		
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
			
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Price: "+subform.elements[3].value;
			message_string+=" Total: "+subform.elements[4].value;
		});

		var data_id=form.elements[3].value;
		var transaction_id=form.elements[5].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		/////deleting existing free services
		var items_data="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<staff></staff>" +
				"<notes></notes>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"<free_with>bill</free_with>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";
		
		if(is_online())
		{
			server_delete_simple(items_data);
		}
		else
		{
			local_delete_simple(items_data);
		}
		///////////////////////////////////
		
		/////deleting existing free products
		var items_data="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<batch></batch>" +
				"<quantity></quantity>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"<free_with>bill</free_with>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";
		if(is_online())
		{
			server_delete_simple(items_data);
		}
		else
		{
			local_delete_simple(items_data);
		}
		
		
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
									rowsHTML+="<form id='form72_"+id+"'></form>";
					                	rowsHTML+="<td>";
					                    	rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+free_product_name+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='text' required form='form72_"+id+"' value='"+free_batch+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='"+free_product_quantity+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                        	rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form72_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form72_"+id+"' value='free on the bill amount'>";
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
						"<type>product</type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form42</link_to>" +
						"<title>Updated</title>" +
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
			
			message_string+="\nAmount: "+amount;
			message_string+="\ndiscount: "+discount;
			message_string+="\nTax: "+tax;
			message_string+="\nTotal: "+total;
			
			var subject="Bill from "+get_session_var('title');
			$('#form72_share').show();
			$('#form72_share').click(function()
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
			$('#form72_foot').html(total_row);

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
					if(is_online())
					{
						server_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y]);
						});
					}
					else
					{
						local_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y]);
						});
					}
					break;
				}
			},payment_data);
		
		});
		$("[id^='save_form72_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Set shortcut keys
 * @param button
 */
function form77_update_item(form)
{
	if(is_update_access('form77'))
	{
		var display_name=form.elements[0].getAttribute('data-i18n');
		display_name=display_name.substr(display_name.indexOf('.')+1);
		var shortcut=form.elements[1].value;
		var data_id=form.elements[2].value;
		var name=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<user_preferences>" +
					"<id>"+data_id+"</id>" +
					"<display_name>"+display_name+"</display_name>" +
					"<name>"+name+"</name>" +
					"<shortcut unique='yes'>"+shortcut+"</shortcut>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</user_preferences>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>user_preferences</tablename>" +
					"<link_to>form77</link_to>" +
					"<title>Saved</title>" +
					"<notes>"+shortcut+" as shortcut for "+display_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Set Shortcut keys
 * @param button
 */
function form77_update_form(button)
{
	if(is_update_access('form77'))
	{
		$("[id^='save_form77_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form manage task types
 * @param button
 */
function form79_update_item(form)
{
	if(is_update_access('form79'))
	{
		var name=form.elements[0].value;
		var desc=form.elements[1].value;
		var est_hours=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<task_type>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<description>"+desc+"</description>" +
					"<est_hours>"+est_hours+"</est_hours>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_type>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>task_type</tablename>" +
					"<link_to>form79</link_to>" +
					"<title>Updated</title>" +
					"<notes>Task type "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form80_update_form(button)
{
	if(is_update_access('form80'))
	{
		$("[id^='save_form80_']").click();
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
function form81_update_item(form)
{
	if(is_update_access('form81'))
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
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_leads>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_leads</tablename>" +
					"<link_to>form81</link_to>" +
					"<title>Updated</title>" +
					"<notes>Sale lead for customer "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}



/**
 * @form Notifications
 * @param data_id
 * @param status
 */
function notifications_update(button,data_id,status)
{
	if(is_update_access('notif'))
	{
		var last_updated=get_my_time();
		var data_xml="<notifications>" +
					"<id>"+data_id+"</id>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</notifications>";
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}
		if(status=='closed')
		{
			$(button).parent().parent().hide();
		}
		if(status=='reviewed')
		{
			$(button).hide();
		}
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
function form84_update_item(form)
{
	if(is_update_access('form84'))
	{
		var customer=form.elements[0].value;
		var service=form.elements[1].value;
		var status=form.elements[2].value;
		var notes=form.elements[3].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<service_subscriptions>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<service>"+service+"</service>" +
					"<status>"+status+"</status>" +
					"<notes>"+notes+"</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_subscriptions>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>service_subscriptions</tablename>" +
					"<link_to>form84</link_to>" +
					"<title>Updated</title>" +
					"<notes>Service "+service+" subscription for customer "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Verify Supplier Geo-location
 * @param button
 */
function form85_update_item(form)
{
	if(is_update_access('form85'))
	{
		var name=form.elements[0].value;
		var lat=form.elements[1].value;
		var lng=form.elements[2].value;
		var data_id=form.elements[3].value;
		var button=form.elements[4];
		$(button).hide();		

		var last_updated=get_my_time();
		var data_xml="<suppliers>" +
					"<id>"+data_id+"</id>" +
					"<lat>"+lat+"</lat>" +
					"<lng>"+lng+"</lng>" +
					"<address_status>confirmed</address_status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</suppliers>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>suppliers</tablename>" +
					"<link_to>form85</link_to>" +
					"<title>Updated</title>" +
					"<notes>Geo-location of supplier "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Verify Supplier Geo-location
 * @param button
 */
function form85_update_master(form)
{
	if(is_update_access('form85'))
	{
		var lat_lng_data="<user_preferences>" +
				"<id></id>" +
				"<name array='yes'>--lat--lng--</name>" +
				"</user_preferences>";
		
		fetch_requested_data('',lat_lng_data,function(lat_lng)
		{
			var lat=form.elements[1].value;
			var lng=form.elements[2].value;
			var button=form.elements[3];
			$(button).hide();		
			
			lat_lng.forEach(function(ll)
			{
				var value=lng;
				if(ll.name==='lat')
				{
					value=lat;
				}
				var last_updated=get_my_time();
				var data_xml="<user_preferences>" +
							"<id>"+ll.id+"</id>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</user_preferences>";
				var activity_xml="<activity>" +
							"<data_id>"+ll.id+"</data_id>" +
							"<tablename>user_preferences</tablename>" +
							"<link_to>form46</link_to>" +
							"<title>Updated</title>" +
							"<notes>Geo-location of business</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				if(is_online())
				{
					server_update_row(data_xml,activity_xml);
				}
				else
				{
					local_update_row(data_xml,activity_xml);
				}
				set_session_var(ll.name,value);
			});
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Verify Staff Geo-location
 * @param button
 */
function form86_update_item(form)
{
	if(is_update_access('form86'))
	{
		var name=form.elements[0].value;
		var lat=form.elements[1].value;
		var lng=form.elements[2].value;
		var data_id=form.elements[3].value;
		var button=form.elements[4];
		$(button).hide();		

		var last_updated=get_my_time();
		var data_xml="<staff>" +
					"<id>"+data_id+"</id>" +
					"<lat>"+lat+"</lat>" +
					"<lng>"+lng+"</lng>" +
					"<address_status>confirmed</address_status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</staff>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>staff</tablename>" +
					"<link_to>form86</link_to>" +
					"<title>Updated</title>" +
					"<notes>Geo-location of staff "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Verify Staff Geo-location
 * @param button
 */
function form86_update_master(form)
{
	if(is_update_access('form86'))
	{
		var lat_lng_data="<user_preferences>" +
				"<id></id>" +
				"<name array='yes'>--lat--lng--</name>" +
				"</user_preferences>";
		
		fetch_requested_data('',lat_lng_data,function(lat_lng)
		{
			var lat=form.elements[1].value;
			var lng=form.elements[2].value;
			var button=form.elements[3];
			$(button).hide();		
			
			lat_lng.forEach(function(ll)
			{
				var value=lng;
				if(ll.name==='lat')
				{
					value=lat;
				}
				var last_updated=get_my_time();
				var data_xml="<user_preferences>" +
							"<id>"+ll.id+"</id>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</user_preferences>";
				var activity_xml="<activity>" +
							"<data_id>"+ll.id+"</data_id>" +
							"<tablename>user_preferences</tablename>" +
							"<link_to>form46</link_to>" +
							"<title>Updated</title>" +
							"<notes>Geo-location of business</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				if(is_online())
				{
					server_update_row(data_xml,activity_xml);
				}
				else
				{
					local_update_row(data_xml,activity_xml);
				}
				set_session_var(ll.name,value);
			});
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
function form87_update_item(form)
{
	if(is_update_access('form87'))
	{
		var name=form.elements[0].value;
		var make=form.elements[1].value;
		var description=form.elements[2].value;
		var tax=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		
		var data_xml="<product_master>" +
					"<id>"+data_id+"</id>" +
					"<make>"+make+"</make>" +
					"<name>"+name+"</name>" +
					"<description>"+description+"</description>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</product_master>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>product_master</tablename>" +
					"<link_to>form39</link_to>" +
					"<title>Updated</title>" +
					"<notes>Product "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manufacturing Schedule
 * @formNo 88
 * @param button
 */
function form88_update_item(form)
{
	if(is_update_access('form88'))
	{
		var product=form.elements[0].value;
		var process=form.elements[1].value;
		var status=form.elements[2].value;
		var schedule=get_raw_time(form.elements[3].value);
		var iteration=form.elements[4].value;
		var data_id=form.elements[5].value;
		var old_status=form.elements[8].value;
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
					"<title>Updated</title>" +
					"<notes>Manufacturing schedule for product "+product+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		
		if(status=='scheduled' && old_status!='scheduled')
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

	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Appointments
 * @param button
 */
function form89_update_item(form)
{
	if(is_update_access('form89'))
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
					"<notes>"+notes+"</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</appointments>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>appointments</tablename>" +
					"<link_to>form89</link_to>" +
					"<title>Updated</title>" +
					"<notes>Appointment with "+name+" assigned to "+assignee+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		
		var message_string=name+" appointment with "+assignee+" @"+form.elements[2].value+"\nNotes:"+result.notes;
		message_string=encodeURIComponent(message_string);
		$("#form89_whatsapp_"+data_id).attr('href',"whatsapp://send?text="+message_string);
		$("#form89_whatsapp_"+data_id).show();

		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Billing types
 * @formNo 90
 * @param button
 */
function form90_update_item(form)
{
	if(is_update_access('form90'))
	{
		var name=form.elements[0].value;
		var notes=form.elements[1].value;
		var data_id=form.elements[2].value;
		var last_updated=get_my_time();
		var data_xml="<bill_types>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<notes>"+notes+"</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bill_types>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bill_types</tablename>" +
					"<link_to>form90</link_to>" +
					"<title>Updated</title>" +
					"<notes>Billing type "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		
		for(var i=0;i<2;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form91_update_form()
{
	if(is_update_access('form91'))
	{
		var form=document.getElementById("form91_master");
		
		var customer=form.elements[1].value;
		var bill_type=form.elements[2].value;
		var bill_date=get_raw_time(form.elements[3].value);
		
		var message_string="Bill from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');
		
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form91']").each(function(index)
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
		
		/////deleting existing free products
		var items_data="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<batch></batch>" +
				"<quantity></quantity>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"<free_with>bill</free_with>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";

		if(is_online())
		{
			server_delete_simple(items_data);
		}
		else
		{
			local_delete_simple(items_data);
		}
		///////////////////////////////////
		
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
									rowsHTML+="<form id='form91_"+id+"'></form>";
					                	rowsHTML+="<td data-th='Item'>";
					                    	rowsHTML+="<input type='text' readonly='readonly' form='form91_"+id+"' value='"+free_product_name+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Batch'>";
				                                rowsHTML+="<input type='text' required form='form91_"+id+"' value='"+free_batch+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Quantity'>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form91_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Unit Price'>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form91_"+id+"' value='"+free_product_quantity+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Total'>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form91_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Action'>";
				                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value='free on the bill amount'>";
				                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value='"+id+"'>";
				                                rowsHTML+="<input type='submit' class='save_icon' form='form91_"+id+"' id='save_form91_"+id+"' >";
				                                rowsHTML+="<input type='button' class='delete_icon' form='form91_"+id+"' id='delete_form91_"+id+"' onclick='form91_delete_item($(this));'>";
				                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form91_"+id+"' value=''>";
				                        rowsHTML+="</td>";
				                rowsHTML+="</tr>";

				                $('#form91_body').prepend(rowsHTML);
				                
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
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>product</type>" +
						"<billing_type>"+bill_type+"</billing_type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form92</link_to>" +
						"<title>Updated</title>" +
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
			
			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
						"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+discount+"</br>" +
						"Rs. "+tax+"</br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
			$('#form91_foot').html(total_row);

			message_string+="\nAmount: "+amount;
			message_string+="\ndiscount: "+discount;
			message_string+="\nTax: "+tax;
			message_string+="\nTotal: "+total;

			var subject="Bill from "+get_session_var('title');
			$('#form91_share').show();
			$('#form91_share').off('click');
			$('#form91_share').on('click',function()
			{
				modal44_action(customer,subject,message_string);
			});

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
					if(is_online())
					{
						server_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y]);
						});
					}
					else
					{
						local_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y]);
						});
					}
					break;
				}
			},payment_data);
			
		});
		$("[id^='save_form91_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Loans
 * @formNo 93
 * @param button
 */
function form93_update_item(form)
{
	if(is_update_access('form93'))
	{
		var account=form.elements[0].value;
		var type=form.elements[1].value;
		var amount=form.elements[2].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var repayment_method=form.elements[6].value;
		var emi=form.elements[7].value;
		var pending_emis=form.elements[8].value;
		var repayment_amount=amount;
		if(repayment_method=='instalments')
		{
			repayment_amount=parseFloat(pending_emis)*parseFloat(emi);
		}
		var adjective="to";
		var receiver="loan";
		var giver=account;
		var ptype='received';
		var due_time=get_debit_period();
		if(type=='taken')
		{
			adjective="from";
			giver="loan";
			receiver=account;
			ptype='paid';
		}		
		var last_updated=get_my_time();
		var data_xml="<loans>" +
				"<id>"+data_id+"</id>" +
				"<status>closed</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</loans>";	
		var activity_xml="<activity>" +
				"<data_id>"+data_id+"</data_id>" +
				"<tablename>loans</tablename>" +
				"<link_to>form93</link_to>" +
				"<title>Closed</title>" +
				"<notes>Loan of amount Rs. "+amount+" "+type+" "+adjective+" "+account+"</notes>" +
				"<updated_by>"+get_name()+"</updated_by>" +
				"</activity>";
		var payment_id=get_new_key();
		var transaction2_xml="<transactions>" +
				"<id>"+payment_id+"</id>" +
				"<trans_date>"+get_my_time()+"</trans_date>" +
				"<amount>"+repayment_amount+"</amount>" +
				"<receiver>"+receiver+"</receiver>" +
				"<giver>"+giver+"</giver>" +
				"<tax>0</tax>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</transactions>";
		var payment_xml="<payments>" +
				"<id>"+payment_id+"</id>" +
				"<acc_name>"+account+"</acc_name>" +
				"<type>"+ptype+"</type>" +
				"<total_amount>"+repayment_amount+"</total_amount>" +
				"<paid_amount>0</paid_amount>" +
				"<status>pending</status>" +
				"<date>"+get_my_time()+"</date>" +
				"<due_date>"+get_my_time()+"</due_date>" +
				"<mode>"+get_payment_mode()+"</mode>" +
				"<transaction_id>"+payment_id+"</transaction_id>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</payments>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
			server_create_simple(transaction2_xml);
			server_create_simple_func(payment_xml,function()
			{
				if(type=='taken')
					modal28_action(payment_id);
				else
					modal26_action(payment_id);
			});
		}
		else
		{
			local_update_row(data_xml,activity_xml);
			local_create_simple(transaction2_xml);
			local_create_simple_func(payment_xml,function()
			{
				if(type=='taken')
					modal28_action(payment_id);
				else
					modal26_action(payment_id);
			});
		}
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
function form96_update_item(form)
{
	if(is_update_access('form96'))
	{
		var customer=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attribute>" +
					"<id>"+data_id+"</id>" +
					"<name>"+customer+"</name>" +
					"<type>customer</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form96</link_to>" +
					"<title>Updated</title>" +
					"<notes>Attribute "+attribute+" for customer "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 97
 * form supplier Attributes
 * @param button
 */
function form97_update_item(form)
{
	if(is_update_access('form97'))
	{
		var supplier=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attribute>" +
					"<id>"+data_id+"</id>" +
					"<name>"+supplier+"</name>" +
					"<type>supplier</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form97</link_to>" +
					"<title>Updated</title>" +
					"<notes>Attribute "+attribute+" for supplier "+supplier+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form98_update_item(form)
{
	if(is_update_access('form98'))
	{
		var staff=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attribute>" +
					"<id>"+data_id+"</id>" +
					"<name>"+staff+"</name>" +
					"<type>staff</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form98</link_to>" +
					"<title>Updated</title>" +
					"<notes>Attribute "+attribute+" for staff "+staff+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Selective Sync
 * @param button
 */
function form100_update_item(form)
{
	if(is_update_access('form100'))
	{
		var name=form.elements[0].getAttribute('data-i18n');
		name=name.substr(name.indexOf('.')+1);
		var value='unchecked';
		if(form.elements[1].checked)
			value='checked';
		var data_id=form.elements[2].value;
		var element_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<user_preferences>" +
					"<id>"+data_id+"</id>" +
					"<name>"+element_id+"</name>" +
					"<display_name>"+name+"</display_name>" +
					"<sync>"+value+"</sync>" +
					"<type>form</type>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</user_preferences>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>user_preferences</tablename>" +
					"<link_to>form100</link_to>" +
					"<title>Updated</title>" +
					"<notes>Sync for "+name+" form</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Selective sync
 */
function form100_update_form()
{	
	if(is_update_access('form100'))
	{
		$("[id^='save_form100_']").click();
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
function form101_update_item(form)
{
	if(is_update_access('form101'))
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
					"<title>Updated</title>" +
					"<notes>Project "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form102_update_item(form)
{
	if(is_update_access('form102'))
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
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project Phases
 * @formNo 103
 * @param button
 */
function form103_update_item(form)
{
	if(is_update_access('form103'))
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
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}	
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project Tasks
 * @formNo 104
 * @param button
 */
function form104_update_item(form)
{
	if(is_update_access('form104'))
	{
		var project_id=document.getElementById('form104_master').elements[2].value;
		var task=form.elements[0].value;
		var assignee=form.elements[1].value;
		var start_time=get_raw_time(form.elements[2].value);
		var due_time=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<source_id>"+project_id+"</source_id>" +
					"<name>"+task+"</name>" +
					"<assignee>"+assignee+"</assignee>" +
					"<t_initiated>"+start_time+"</t_initiated>" +
					"<t_due>"+due_time+"</t_due>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_instances>";
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}	
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Sale orders (multi-register)
 * @param button
 */
function form108_update_item(form)
{
	if(is_update_access('form108'))
	{
		var data_id=form.elements[0].value;
		var customer_name=form.elements[1].value;
		var order_date=get_raw_time(form.elements[2].value);
		var status=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<sale_orders>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer_name+"</customer_name>" +
					"<order_date>"+order_date+"</order_date>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_orders>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_orders</tablename>" +
					"<link_to>form108</link_to>" +
					"<title>Updated</title>" +
					"<notes>Order no "+data_id+" for customer "+customer_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 109
 * form Asset Attributes
 * @param button
 */
function form109_update_item(form)
{
	if(is_update_access('form60'))
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
					"<title>Updated</title>" +
					"<notes>Attribute "+attribute+" for asset "+asset+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form111_update_form()
{
	if(is_update_access('form111'))
	{
		var form=document.getElementById("form111_master");

		var name=form.elements[1].value;
		var description=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<reports>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<description>"+description+"</description>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</reports>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>reports</tablename>" +
					"<link_to>form111</link_to>" +
					"<title>Updated</title>" +
					"<notes>Report "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
	
		$("[id^='save_form111_']").click();
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
function form118_update_form()
{
	if(is_update_access('form118'))
	{
		var form=document.getElementById("form118_master");
		
		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		
		var message_string="Bill from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');
		
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
		
		var data_id=form.elements[3].value;
		var transaction_id=form.elements[5].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		/////deleting existing free products
		var items_data="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<batch></batch>" +
				"<quantity></quantity>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"<free_with>bill</free_with>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";

		if(is_online())
		{
			server_delete_simple(items_data);
		}
		else
		{
			local_delete_simple(items_data);
		}
		///////////////////////////////////
		
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
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form118_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Unit Price'>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form118_"+id+"' value='"+free_product_quantity+"'>";
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
				                                rowsHTML+="<input type='submit' class='save_icon' form='form118_"+id+"' id='save_form118_"+id+"' >";
				                                rowsHTML+="<input type='button' class='delete_icon' form='form118_"+id+"' id='delete_form118_"+id+"' onclick='form118_delete_item($(this));'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value=''>";
				                        rowsHTML+="</td>";
				                rowsHTML+="</tr>";

				                $('#form118_body').prepend(rowsHTML);
				                
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
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>product</type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form42</link_to>" +
						"<title>Updated</title>" +
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
			$('#form118_share').on('click',function()
			{
				modal44_action(customer,subject,message_string);
			});

			var loyalty_points_data="<loyalty_points>"+
									"<id></id>"+
									"<points_addition>"+program.points_addition+"</points_addition>"+
									"<source exact='yes'></source>"+
									"<source_id exact='yes'>"+data_id+"</source_id>"+
									"</loyalty_points>";
			fetch_requested_data('',loyalty_points_data,function(programs)
			{
				var new_programs=array_unique(programs);
				new_programs.forEach(function(program)
				{
					var points=parseFloat(program.points_addition)*parseFloat(total);
					var loyalty_points_xml="<loyalty_points>"+
						"<id></id>"+
						"<points>"+points+"</points>"+
						"<date>"+get_my_date()+"</date>"+
						"<last_updated>"+last_updated+"</last_updated>"+
						"</loyalty_points>";
					if(is_online())
					{
						server_update_simple(loyalty_points_xml);
					}
					else
					{
						local_update_simple(loyalty_points_xml);
					}	
				});
			});

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
					if(is_online())
					{
						server_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y]);
						});
					}
					else
					{
						local_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y]);
						});
					}
					break;
				}
			},payment_data);
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
function form119_update_form()
{
	if(is_update_access('form119'))
	{
		var form=document.getElementById("form119_master");
		
		var customer=form.elements[1].value;
		var bill_type=form.elements[2].value;
		var bill_date=get_raw_time(form.elements[3].value);
		
		var message_string="Bill from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');
		
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form119_']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			amount+=parseFloat(subform.elements[6].value);
			discount+=parseFloat(subform.elements[7].value);
			tax+=parseFloat(subform.elements[8].value);
			total+=parseFloat(subform.elements[9].value);
			
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Quantity: "+subform.elements[2].value;
			message_string+=" Total: "+subform.elements[4].value;
		});
		
		var data_id=form.elements[5].value;
		var transaction_id=form.elements[7].value;
		var last_updated=get_my_time();
		var offer_detail="";
		
		/////deleting existing free products
		var items_data="<bill_items>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"<free_with>bill</free_with>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";

		if(is_online())
		{
			server_delete_simple(items_data);
		}
		else
		{
			local_delete_simple(items_data);
		}
		///////////////////////////////////
		
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
								var rowsHTML="<tr>";
								rowsHTML+="<form id='form119_"+id+"'></form>";
									rowsHTML+="<td data-th='Product Name'>";
										rowsHTML+="<label id='form119_product_make_"+id+"'></label>";
										rowsHTML+="<br><textarea required form='form119_"+id+"' readonly='readonly'>"+free_product_name+"</textarea>";
										rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' onclick='modal14_action();'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Batch'>";
										rowsHTML+="<input type='text' required form='form119_"+id+"' value='"+free_batch+"'>";
										rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' onclick='modal22_action();'>";
										rowsHTML+="<br><v1>Expiry: </v1><label id='form119_exp_"+id+"'></label>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Quantity'>";
										rowsHTML+="<v1>Bought: </v1><input type='number' min='0' readonly='readonly' required form='form119_"+id+"' step='any' value='0'>";
										rowsHTML+="<br><v1>Free: </v1><input type='number' min='0' value='0' readonly='readonly' required form='form119_"+id+"' step='any' value='"+free_product_quantity+"'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Price'>";
										rowsHTML+="<v1>Sale: </v1>Rs. <input type='number' required min='0' readonly='readonly' form='form119_"+id+"' step='any'>";
										rowsHTML+="<br><v1>MRP: </v1>Rs. <input type='number' min='0' readonly='readonly' form='form119_"+id+"' step='any'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Total'>";
										rowsHTML+="<v1>Amount: </v1>Rs. <input type='number' required min='0' form='form119_"+id+"' readonly='readonly' step='any' value='0'>";
										rowsHTML+="<input type='hidden' value='0' form='form119_"+id+"' readonly='readonly'>";
										rowsHTML+="<br><v1>Tax: </v1>Rs. <input type='number' required min='0' value='0' form='form119_"+id+"' readonly='readonly' step='any' value='0'>";
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
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>product</type>" +
						"<billing_type>"+bill_type+"</billing_type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form92</link_to>" +
						"<title>Updated</title>" +
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
			$('#form119_share').on('click',function()
			{
				modal44_action(customer,subject,message_string);
			});

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
					if(is_online())
					{
						server_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y],function(mode,paid_amount)
							{
								document.getElementById('form119_payment_info').innerHTML="Payment: "+mode+"<br>Paid: Rs."+paid_amount;
							});
						});
					}
					else
					{
						local_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y],function(mode,paid_amount)
							{
								document.getElementById('form119_payment_info').innerHTML="Payment: "+mode+"<br>Paid: Rs."+paid_amount;
							});
						});
					}
					break;
				}
			},payment_data);
		});
		$("[id^='save_form119_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form New Supplier Bill (unbilled item)
 * @param button
 */
function form122_update_form()
{
	if(is_update_access('form122'))
	{
		var form=document.getElementById("form122_master");
		
		var supplier=form.elements[1].value;
		var bill_id=form.elements[2].value;
		var bill_date=get_raw_time(form.elements[3].value);
		var entry_date=get_raw_time(form.elements[4].value);
		
		var total=0;
		var tax=0;
		var amount=0;
		
		$("[id^='save_form122']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[3].value);
			tax+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
		});

		var discount=0;
		total=total-discount;
		
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
				"<td>Rs. "+bill_results[i].amount+"</br>" +
				"Rs. "+bill_results[i].discount+"</br>" +
				"Rs. "+bill_results[i].tax+"</br>" +
				"Rs. "+bill_results[i].total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form122_foot').html(total_row);

		var notes=form.elements[5].value;
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
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<notes>"+notes+"</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>supplier_bills</tablename>" +
					"<link_to>form53</link_to>" +
					"<title>Updated</title>" +
					"<notes>Supplier Bill no "+data_id+"</notes>" +
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
							"<acc_name>"+supplier+"</acc_name>" +
							"<transaction_id>"+payments[y]+"</transaction_id>" +
							"<bill_id>"+data_id+"</bill_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</payments>";
				var pt_xml="<transactions>" +
							"<id>"+payments[y]+"</id>" +
							"<amount>"+total+"</amount>" +
							"<receiver>"+supplier+"</receiver>" +
							"<giver>master</giver>" +
							"<tax>0</tax>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</transactions>";
				if(is_online())
				{
					server_update_simple_func(payment_xml,function()
					{
						modal28_action(payments[y]);
					});
				}
				else
				{
					local_update_simple_func(payment_xml,function()
					{
						modal28_action(payments[y]);
					});
				}
				break;
			}
		},payment_data);
			
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
function form123_update_item(form)
{
	if(is_update_access('form123'))
	{
		var object=form.elements[0].value;
		var attribute=form.elements[1].value;
		var status=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<mandatory_attributes>" +
					"<id>"+data_id+"</id>" +
					"<object>"+object+"</object>" +
					"<attribute>"+attribute+"</attribute>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</mandatory_attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>mandatory_attributes</tablename>" +
					"<link_to>form123</link_to>" +
					"<title>Updated</title>" +
					"<notes>Mandatory attribute "+attribute+" for "+object+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}	
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
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
function form125_update_item(form)
{
	if(is_update_access('form125'))
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
							"<status>"+status+"</status>" +
							"<password>"+newhash+"</password>"+					
							"<last_updated>"+last_updated+"</last_updated>" +
							"</accounts>";	
			if(password=='null' || password=='undefined' || password=="")
			{
				data_xml="<accounts>" +
							"<id>"+data_id+"</id>" +
							"<status>"+status+"</status>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</accounts>";	
			}			
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>accounts</tablename>" +
						"<link_to>form125</link_to>" +
						"<title>Updated</title>" +
						"<notes>Account for username "+username+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_update_row(data_xml,activity_xml);
			}
			else
			{
				local_update_row(data_xml,activity_xml);
			}	
			for(var i=0;i<5;i++)
			{
				$(form.elements[i]).attr('readonly','readonly');
			}
		});
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
function form130_update_form()
{
	if(is_create_access('form130'))
	{
		var form=document.getElementById("form130_master");
		
		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		
		var message_string="Bill from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');
		var mail_string="Bill from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');
		
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
		
		/////deleting existing free services
		var items_data="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<staff></staff>" +
				"<notes></notes>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"<free_with>bill</free_with>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";
		
		if(is_online())
		{
			server_delete_simple(items_data);
		}
		else
		{
			local_delete_simple(items_data);
		}
		///////////////////////////////////
		
		/////deleting existing free products
		var items_data="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<batch></batch>" +
				"<quantity></quantity>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"<free_with>bill</free_with>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</bill_items>";
		if(is_online())
		{
			server_delete_simple(items_data);
		}
		else
		{
			local_delete_simple(items_data);
		}
		
		
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
	                                rowsHTML+="<input type='submit' class='save_icon' form='form130_"+id+"' id='save_form130_"+id+"' >";
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
						"<type>product</type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form42</link_to>" +
						"<title>Updated</title>" +
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
					if(is_online())
					{
						server_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y]);
						});
					}
					else
					{
						local_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y]);
						});
					}
					break;
				}
			},payment_data);
		});
		$("[id^='save_form130_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}
