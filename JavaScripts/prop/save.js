/**
 * @form Update Inventory
 * @param button
 */
function form1_save_item(button)
{
	if(is_create_access('form1') || is_update_access('form1'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form Create Pamphlets
 * @param button
 */
function form2_save_item(button)
{
	if(is_create_access('form2') || is_update_access('form2'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form Create Pamphlets
 * @param button
 */
function form2_save_form()
{
	if(is_create_access('form2') || is_update_access('form2'))
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
		}
	
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
function form5_save_item(button)
{
	if(is_create_access('form5') || is_update_access('form5'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @formNo 7
 * @form Attendance
 * @param button
 */
function form7_save_item(button)
{
	if(is_create_access('form7') || is_update_access('form7'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form Manage Staff
 * @param button
 */
function form8_save_item(button)
{
	if(is_create_access('form8') || is_update_access('form8'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form Cash Register
 * @param button
 */
function form9_save_item(button)
{
	if(is_create_access('form9') || is_update_access('form9'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
function form10_save_item(button)
{
	if(is_create_access('form10') || is_update_access('form10'))
	{
		var bill_id=document.getElementById("form10_master").elements[4].value;
		
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form Service Reciept
 * @param button
 */
function form10_save_form(button)
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
		}
	
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
function form11_save_item(button)
{
	if(is_create_access('form11') || is_update_access('form11'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form New Bill
 * @param button
 */
function form12_save_item(button)
{
	if(is_create_access('form12') || is_update_access('form12'))
	{
		var bill_id=document.getElementById("form12_master").elements[4].value;
		
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var price=form.elements[2].value;
		var quantity=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='bill_items';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<product_name>"+name+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<price>"+price+"</price>" +
					"<quantity>"+quantity+"</quantity>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form12</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved product "+name+" from bill no. "+bill_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form New Bill
 * @param button
 */
function form12_save_form(button)
{
	if(is_create_access('form12') || is_update_access('form12'))
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
		}
	
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
function form14_save_item(button)
{
	if(is_create_access('form14') || is_update_access('form14'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form Accept Returns
 * @param button
 */
function form15_save_item(button)
{
	if(is_create_access('form15') || is_update_access('form15'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form Manage Returns
 * @param button
 */
function form19_save_item(button)
{
	if(is_create_access('form19') || is_update_access('form19'))
	{
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form Goods Received
 * @param button
 */
function form21_save_item(button)
{
	if(is_create_access('form21') || is_update_access('form21'))
	{
		var bill_id=document.getElementById("form21_master").elements[2].value;
		
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form Goods Received
 * @param button
 */
function form21_save_form(button)
{
	if(is_create_access('form21') || is_update_access('form21'))
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
		}
	
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
function form22_save_item(button)
{
	if(is_create_access('form22') || is_update_access('form22'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form Purchase Orders
 * @param button
 */
function form24_save_item(button)
{
	if(is_create_access('form24') || is_update_access('form24'))
	{
		var order_id=document.getElementById('form24_master').elements[4].value;
		
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form Purchase Orders
 * @param button
 */
function form24_save_form(button)
{
	if(is_create_access('form24') || is_update_access('form24'))
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
		}
	
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
function form30_save_item(button)
{
	if(is_create_access('form30') || is_update_access('form30'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
function form35_save_item(button)
{
	if(is_create_access('form35') || is_update_access('form35'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
function form38_save_item(button)
{
	if(is_create_access('form38') || is_update_access('form38'))
	{
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
function form39_save_item(button)
{
	if(is_create_access('form39') || is_update_access('form39'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
		var product_type=form.elements[0].value;
		var make=form.elements[1].value;
		var name=form.elements[2].value;
		var data_id=form.elements[7].value;
		var pic_id=$("#img_form39_"+data_id).parent().attr('name');
		var url=$("#img_form39_"+data_id).attr('src');
		var est_price=form.elements[5].value;
		var description=form.elements[6].value;
		var last_updated=get_my_time();
		var table='product_master';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<product_type>"+product_type+"</product_type>" +
					"<make>"+make+"</make>" +
					"<name unique='yes'>"+name+"</name>" +
					"<est_price>"+est_price+"</est_price>" +
					"<description>"+description+"</description>" +
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
			server_write_row(data_xml,activity_xml);
			server_write_row(pic_xml,pic_activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
			local_write_row(pic_xml,pic_activity_xml);
		}	
		for(var i=0;i<8;i++)
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
 * @form Manage Vendors
 * @param button
 */
function form40_save_item(button)
{
	if(is_create_access('form40') || is_update_access('form40'))
	{
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form Verify addresses
 * @param button
 */
function form41_save_item(button)
{
	if(is_create_access('form41') || is_update_access('form41'))
	{
		$(button).hide();
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
		var acc_name=form.elements[0].value;
		var lat=form.elements[1].value;
		var lng=form.elements[2].value;
		var data_id=form.elements[3].value;
		var status=form.elements[4].value;
		var address=form.elements[5].value;
		var acc_type=form.elements[6].value;
		var last_updated=get_my_time();
		var table='address';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<acc_name unique='yes'>"+acc_name+"</acc_name>" +
					"<lat>"+lat+"</lat>" +
					"<lng>"+lng+"</lng>" +
					"<status>confirmed</status>" +
					"<acc_type>"+acc_type+"</acc_type>" +
					"<address>"+address+"</address>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form41</link_to>" +
					"<title>Updated</title>" +
					"<notes>Updated location of customer "+acc_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form Manage Bills
 * @param button
 */
function form42_save_item(button)
{
	if(is_create_access('form42') || is_update_access('form42'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
		var data_id=form.elements[0].value;
		var customer_name=form.elements[1].value;
		var date_created=get_raw_time(form.elements[2].value);
		var amount=form.elements[3].value;
		var last_updated=get_my_time();
		var table='bills';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer_name+"</customer_name>" +
					"<date_created>"+date_created+"</date_created>" +
					"<amount>"+amount+"</amount>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form42</link_to>" +
					"<title>Saved</title>" +
					"<notes>Updated bill no "+data_id+" for customer "+customer_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form Manage Purchase Orders
 * @param button
 */
function form43_save_item(button)
{
	if(is_create_access('form43') || is_update_access('form43'))
	{
		var form=document.getElementById(form_id);
		
		var data_id=form.elements[0].value;
		var supplier=form.elements[1].value;
		var order_date=get_raw_time(form.elements[2].value);
		var est_amount=form.elements[3].value;
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
					"<link_to>form43</link_to>" +
					"<title>Saved</title>" +
					"<notes>Updated purchase order no "+data_id+" for supplier "+supplier+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form Manage Pamphlets
 * @param button
 */
function form44_save_item(button)
{
	if(is_create_access('form44') || is_update_access('form44'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
		var name=form.elements[0].value;
		var count_items=form.elements[1].value;
		var data_id=form.elements[2].value;
		var last_updated=get_my_time();
		var table='pamphlets';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"</name>" +
					"<count_items>"+count_items+"</count_items>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form44</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved pamphlet "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form Manage Service Receipts
 * @param button
 */
function form45_save_item(button)
{
	if(is_create_access('form45') || is_update_access('form45'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
		var data_id=form.elements[0].value;
		var customer_name=form.elements[1].value;
		var date_created=get_raw_time(form.elements[2].value);
		var amount=form.elements[3].value;
		var last_updated=get_my_time();
		var table='bills';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer_name+"</customer_name>" +
					"<date_created>"+date_created+"</date_created>" +
					"<amount>"+amount+"</amount>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form45</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved bill no "+data_id+" for customer "+customer_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form set defaults
 * @param button
 */
function form46_save_item(button)
{
	if(is_create_access('form46') || is_update_access('form46'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
		var name=form.elements[0].value;
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
					"<type>other</type>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form46</link_to>" +
					"<title>Updated</title>" +
					"<notes>Updated "+name+" setting</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form set defaults
 */
function form46_save_form()
{	
	if(is_create_access('form46') || is_update_access('form46'))
	{
		$("[id^='save_form46']").click();
		//$("#modal3").dialog("open");
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Change Password
 */
function form47_save_form()
{
	if(is_create_access('form47') || is_update_access('form47'))
	{
		var form=document.getElementById('form47_master');
		var domain=get_domain();
		var current_pass=form.elements[1].value;
		var new_pass=form.elements[2].value;
		var last_updated=get_my_time();
		var table='user_profiles';
		
		var user_data="<user_profiles>" +
				"<id></id>" +
				"<username>master</username>" +
				"<name></name>" +
				"<password></password>" +
				"</user_profiles>";
		fetch_requested_data('form47',user_data,function(results)
		{
			for(var i in results)
			{
				var salt='$2a$10$'+domain+'1234567891234567891234';
				var salt_22=salt.substring(0, 29);
				//console.log("salt: "+salt_22);
				
				var bcrypt = new bCrypt();
				bcrypt.hashpw(current_pass, salt_22, function(currenthash)
				{
					console.log("user provided: "+currenthash);
					console.log("system provided: "+results[i].password);
					if(currenthash.substring(3)===results[i].password.substring(3))
					{
						var bcrypt = new bCrypt();
						bcrypt.hashpw(new_pass, salt_22, function(newhash)
						{
							var data_xml="<"+table+">" +
										"<id>"+results[i].id+"</id>" +
										"<username unique='yes'>master</username>" +
										"<password>"+newhash+"</password>" +
										"<name>"+results[i].name+"</name>" +
										"<status>active</status>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</"+table+">";	
							var activity_xml="<activity>" +
										"<data_id>"+results[i].id+"</data_id>" +
										"<tablename>"+table+"</tablename>" +
										"<link_to>form47</link_to>" +
										"<title>Updated</title>" +
										"<notes>Updated password for "+results[i].name+"</notes>" +
										"<updated_by>"+get_name()+"</updated_by>" +
										"</activity>";
							if(is_online())
							{
								server_write_row(data_xml,activity_xml);
							}
							else
							{
								local_write_row(data_xml,activity_xml);
							}
							$(form).find('.form47_verify').html('Password updated.');
							//$("#modal3").dialog("open");
						}, function() {});
					}
					else
					{
						$(form).find('.form47_verify').html('Incorrect password. Try again!');
					}
				}, function() {});
				
				break;
			}
	
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Select Reports
 * @param button
 */
function form48_save_item(button)
{
	if(is_create_access('form48') || is_update_access('form48'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
		var name=form.elements[0].value;
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
			server_write_row(data_xml,activity_xml);
		}
		elsea
		{
			local_write_row(data_xml,activity_xml);
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
function form48_save_form()
{	
	if(is_create_access('form48') || is_update_access('form48'))
	{
		$("[id^='save_form48']").click();
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
function form49_save_item(button)
{
	if(is_create_access('form49') || is_update_access('form49'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
		var name=form.elements[0].value;
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
			server_write_row(data_xml,activity_xml);
		}
		elsea
		{
			local_write_row(data_xml,activity_xml);
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
function form49_save_form()
{	
	if(is_create_access('form49') || is_update_access('form49'))
	{
		$("[id^='save_form49']").click();
		//$("#modal3").dialog("open");
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Select Accounting principles
 * @param button
 */
function form50_save_item(button)
{
	if(is_create_access('form50') || is_update_access('form50'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
		var name=form.elements[0].value;
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
					"<type>accounting</type>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form50</link_to>" +
					"<title>Updated</title>" +
					"<notes>Selected "+name+" accounting principle</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_write_row(data_xml,activity_xml);
		}
		elsea
		{
			local_write_row(data_xml,activity_xml);
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
 * @form Select Accounting Principles
 */
function form50_save_form()
{
	if(is_create_access('form50') || is_update_access('form50'))
	{
		$("[id^='save_form50']").click();
		//$("#modal3").dialog("open");
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
function form51_save_item(button)
{
	if(is_create_access('form51') || is_update_access('form51'))
	{
		var master_form=document.getElementById('form51_master');
		var username=master_form.elements[3].value;
		var name=master_form.elements[4].value;
			
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
		var element_name=form.elements[0].value;
		var re='unchecked';
		if(form.elements[1].checked)
			var re='checked';
		var cr='unchecked';
		if(form.elements[2].checked)
			var cr='checked';
		var up='unchecked';
		if(form.elements[3].checked)
			var up='checked';
		var del='unchecked';
		if(form.elements[4].checked)
			var del='checked';
		var data_id=form.elements[5].value;
		var element_id=form.elements[6].value;
		var last_updated=get_my_time();
		var table='access_control';
		var data_xml="<"+table+">" +
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
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form51</link_to>" +
					"<title>Saved</title>" +
					"<notes>Updated access for "+element_name+" for "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
function form51_save_form()
{
	if(is_create_access('form51') || is_update_access('form51'))
	{
		var form=document.getElementById("form51_master");
		
		var username=form.elements[3].value;
		var name=form.elements[4].value;
		var password=form.elements[5].value;
		var data_id=form.elements[6].value;
		var pass_hash=form.elements[7].value;
		var last_updated=get_my_time();
		var table='user_profiles';
		if(password=="")
		{
			var data_xml="<"+table+">" +
						"<id>"+data_id+"</id>" +
						"<username>"+username+"</username>" +
						"<name>"+name+"</name>" +
						"<password>"+pass_hash+"</password>" +
						"<status>active</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</"+table+">";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>"+table+"</tablename>" +
						"<link_to>form51</link_to>" +
						"<title>Saved</title>" +
						"<notes>Updated user account for "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_write_row(data_xml,activity_xml);
			}
			else
			{
				local_write_row(data_xml,activity_xml);
			}
			
			$("[id^='save_form51']").click();
			//$("#modal3").dialog("open");
		}
		else
		{
			var salt='$2a$10$'+get_domain()+'1234567891234567891234';
			var salt_22=salt.substring(0, 29);
			//console.log("salt: "+salt_22);
			
			var bcrypt = new bCrypt();
			bcrypt.hashpw(password, salt_22, function(newhash)
			{
				var data_xml="<"+table+">" +
							"<id>"+data_id+"</id>" +
							"<username>"+username+"</username>" +
							"<name>"+name+"</name>" +
							"<password>"+newhash+"</password>" +
							"<status>active</status>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</"+table+">";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>"+table+"</tablename>" +
							"<link_to>form51</link_to>" +
							"<title>Saved</title>" +
							"<notes>Updated user account for "+name+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				if(is_online())
				{
					server_write_row(data_xml,activity_xml);
				}
				else
				{
					local_write_row(data_xml,activity_xml);
				}
				
				$("[id^='save_form51']").click();
			}, function() {});
		}
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
function form52_save_item(button)
{
	if(is_create_access('form52') || is_update_access('form52'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
		var element_name=form.elements[0].value;
		var shortcut=form.elements[1].value;
		var data_id=form.elements[2].value;
		var element_id=form.elements[3].value;
		var last_updated=get_my_time();
		var table='shortcuts';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<element_name>"+element_name+"</element_name>" +
					"<element_id>"+element_id+"</element_id>" +
					"<shortcut unique='yes'>"+shortcut+"</shortcut>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form45</link_to>" +
					"<title>Saved</title>" +
					"<notes>Updated shortcut for "+element_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
function form52_save_form(button)
{
	if(is_create_access('form52') || is_update_access('form52'))
	{
		$("[id^='save_form52']").click();
		//$("#modal3").dialog("open");
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * formNo 53
 * form Manage Supplier Bills
 * @param button
 */
function form53_save_item(button)
{
	if(is_create_access('form53') || is_update_access('form53'))
	{
		var form=document.getElementById(form_id);
		
		var bill_id=form.elements[0].value;
		var supplier_name=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		var entry_date=get_raw_time(form.elements[3].value);
		var amount=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var table='supplier_bills';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<supplier_name>"+supplier_name+"</supplier_name>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<entry_date>"+entry_date+"</entry_date>" +
					"<amount>"+amount+"</amount>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form53</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved supplier bill no "+bill_id+" for supplier "+supplier_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * @form Select print templates
 * @param button
 */
function form54_save_item(button)
{
	if(is_create_access('form54') || is_update_access('form54'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
		var name=form.elements[0].value;
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
			server_write_row(data_xml,activity_xml);
		}
		elsea
		{
			local_write_row(data_xml,activity_xml);
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
function form54_save_form(button)
{
	if(is_create_access('form54') || is_update_access('form54'))
	{
		$("[id^='save_form54']").click();
		//$("#modal3").dialog("open");
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
function form56_save_item(button)
{
	if(is_create_access('form56') || is_update_access('form56'))
	{
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
function form57_save_item(button)
{
	if(is_create_access('form57') || is_update_access('form57'))
	{
		var form=document.getElementById(form_id);
		
		var service=form.elements[0].value;
		var description=form.elements[1].value;
		var estimated_cost=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var table='services';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+service+"</name>" +
					"<description>"+description+"</description>" +
					"<estimated_cost>"+estimated_cost+"</estimated_cost>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form57</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved service "+service+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
 * formNo 58
 * form Manage Service pre-requisites
 * @param button
 */
function form58_save_item(button)
{
	if(is_create_access('form58') || is_update_access('form58'))
	{
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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
function form59_save_item(button)
{
	if(is_create_access('form59') || is_update_access('form59'))
	{
		var form=document.getElementById(form_id);
		
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
			server_write_row(data_xml,activity_xml);
		}
		else
		{
			local_write_row(data_xml,activity_xml);
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