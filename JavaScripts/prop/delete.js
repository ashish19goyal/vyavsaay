/**
 * @form Update Inventory
 * @param button
 */
function form1_delete_item(button)
{
	if(is_delete_access('form1'))
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
					"<title>Deleted</title>" +
					"<notes>Deleted inventory for batch number "+batch+" of "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var other_delete="<area_utilization>" +
					"<product_name>"+name+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"</area_utilization>";
		
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
			server_delete_simple(other_delete);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
			local_delete_simple(other_delete);
		}	
		$(button).parent().parent().remove();
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
function form2_delete_item(button)
{
	if(is_delete_access('form2'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
		var pamphlet_id=document.getElementById('form2_master').elements[2].value;
		var name=form.elements[0].value;
		var offer_id=form.elements[1].value;
		var offer_detail=form.elements[2].value;
		var price=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='pamphlet_items';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<product_name>"+name+"</product_name>" +
					"<offer_id>"+offer_id+"</offer_id>" +
					"<offer>"+offer_detail+"</offer>" +
					"<price>"+price+"</price>" +
					"<pamphlet_id>"+pamphlet_id+"</pamphlet_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form2</link_to>" +
					"<title>Deleted</title>" +
					"<notes>Deleted product "+name+" from pamphlet "+pamphlet_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
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
function form2_delete_form()
{
	if(is_delete_access('form2'))
	{
		var form=document.getElementById("form2_master");
		
		var p_name=form.elements[1].value;
		var data_id=form.elements[2].value;
		var last_updated=get_my_time();
		var table='pamphlets';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+p_name+"</name>" +
					"<template>"+get_pamphlet_template()+"</template>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form2</link_to>" +
					"<title>Deleted</title>" +
					"<notes>Deleted pamphlet "+p_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var other_delete="<pamphlet_items>" +
				"<pamphlet_id>"+data_id+"</pamphlet_id>" +
				"</pamphlet_items>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
			server_delete_simple(other_delete);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
			local_delete_simple(other_delete);
		}
	
		$("[id^='delete_form2']").parent().parent().remove();
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
function form5_delete_item(button)
{
	if(is_delete_access('form5'))
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
					"<name>"+name+"</name>" +
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
					"<title>Deleted</title>" +
					"<notes>Deleted asset "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var other_delete1="<asset_valuations>" +
					"<asset_name>"+name+"</asset_name>" +
					"</asset_valuations>";
		var other_delete2="<asset_maintenance>" +
					"<asset_name>"+name+"</asset_name>" +
					"</asset_maintenance>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
			server_delete_simple(other_delete1);
			server_delete_simple(other_delete2);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
			local_delete_simple(other_delete1);
			local_delete_simple(other_delete2);
		}	
		$(button).parent().parent().remove();	
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
function form8_delete_item(button)
{
	if(is_delete_access('form8'))
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
					"<name>"+name+"</name>" +
					"<phone>"+phone+"</phone>" +
					"<email>"+email+"</email>" +
					"<acc_name>"+name+" ("+phone+")</acc_name>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form8</link_to>" +
					"<title>Deleted</title>" +
					"<notes>Deleted staff record of "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
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
function form9_delete_item(button)
{
	if(is_delete_access('form9'))
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
					"<title>Deleted</title>" +
					"<notes>Deleted "+trans_type+" transaction number "+data_id+" of amount "+amount+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
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
function form10_delete_item(button)
{
	if(is_delete_access('form10'))
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
					"<title>Deleted</title>" +
					"<notes>Deleted service "+service+" from receipt no "+bill_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
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
function form10_delete_form(button)
{
	if(is_delete_access('form10'))
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
					"<title>Discarded</title>" +
					"<notes>Discarded Bill no "+data_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var other_delete="<service_instances>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"</service_instances>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
			server_delete_simple(other_delete);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
			local_delete_simple(other_delete);
		}
	
		$("[id^='delete_form10']").parent().parent().remove();
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
function form11_delete_item(button)
{
	if(is_delete_access('form11'))
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
					"<title>Deleted</title>" +
					"<notes>Deleted payment record for transaction no "+trans_id+" of amount "+amount+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
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
function form12_delete_item(button)
{
	if(is_delete_access('form12'))
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
					"<title>Deleted</title>" +
					"<notes>Deleted product "+name+" from bill no. "+bill_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
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
function form12_delete_form(button)
{
	if(is_delete_access('form12'))
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
					"<title>Discarded</title>" +
					"<notes>Discarded Bill no "+data_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var other_delete="<bill_items>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"</bill_items>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
			server_delete_simple(other_delete);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
			local_delete_simple(other_delete);
		}
	
		$("[id^='delete_form12']").parent().parent().remove();
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
function form14_delete_item(button)
{
	if(is_delete_access('form14'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
		var name=form.elements[0].value;
		var description=form.elements[1].value;
		var assignee=form.elements[2].value;
		var t_due=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;
		var t_executed=get_raw_time(form.elements[5].value);
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
					"<title>Deleted</title>" +
					"<notes>Deleted task "+name+" assigned to "+assignee+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
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
function form15_delete_item(button)
{
	if(is_delete_access('form15'))
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
					"<title>Deleted</title>" +
					"<notes>Deleted returned item "+product_name+" from "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
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
function form19_delete_item(button)
{
	if(is_delete_access('form19'))
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
					"<title>Deleted</title>" +
					"<notes>Deleted item "+product_name+" from supplier returns of "+supplier+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
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
function form21_delete_item(button)
{
	if(is_delete_access('form21'))
	{
		var bill_id=document.getElementById("form21_master").elements[5].value;
		
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
					"<title>Deleted</title>" +
					"<notes>Deleted product "+product_name+" from purchase bill no "+bill_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
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
function form21_delete_form(button)
{
	if(is_delete_access('form21'))
	{
		var form=document.getElementById("form21_master");
		
		var supplier=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		var entry_date=get_raw_time(form.elements[3].value);
		var amount=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var table='supplier_bills';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
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
					"<title>Discarded</title>" +
					"<notes>Discarded purchase bill no "+data_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var other_delete="<goods_received>" +
				"<sup_bill_id>"+data_id+"</sup_bill_id>" +
				"</goods_received>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
			server_delete_simple(other_delete);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
			local_delete_simple(other_delete);
		}
	
		$("[id^='delete_form21']").parent().parent().remove();
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
function form22_delete_item(button)
{
	if(is_delete_access('form22'))
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
					"<title>Deleted</title>" +
					"<notes>Deleted product "+name+" from disposed list</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
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
function form24_delete_item(button)
{
	if(is_delete_access('form24'))
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
					"<title>Deleted</title>" +
					"<notes>Deleted product "+product_name+" from purchase order no "+order_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
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
function form24_delete_form(button)
{
	if(is_delete_access('form24'))
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
					"<title>Discarded</title>" +
					"<notes>Discarded purchase order no "+data_id+" from supplier "+supplier+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var other_delete="<purchase_items>" +
				"<purchase_order>"+data_id+"</purchase_order>" +
				"</purchase_items>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
			server_delete_simple(other_delete);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
			local_delete_simple(other_delete);
		}
	
		$("[id^='delete_form24']").parent().parent().remove();
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
function form30_delete_item(button)
{
	if(is_delete_access('form30'))
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
					"<acc_name>"+name+" ("+phone+")</acc_name>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form30</link_to>" +
					"<title>Deleted</title>" +
					"<notes>Deleted record of customer "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
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
function form35_delete_item(button)
{
	if(is_delete_access('form35'))
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
					"<offer_name>"+offer_name+"</offer_name>" +
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
					"<title>Deleted</title>" +
					"<notes>Deleted offer "+offer_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
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
function form38_delete_item(button)
{
	if(is_delete_access('form38'))
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
					"<title>Removed</title>" +
					"<notes>Removed product "+product_name+" from storage "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
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
function form39_delete_item(button)
{
	if(is_delete_access('form39'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
		var product_type=form.elements[0].value;
		var make=form.elements[1].value;
		var name=form.elements[2].value;
		var est_price=form.elements[5].value;
		var description=form.elements[6].value;
		var data_id=form.elements[7].value;
		var last_updated=get_my_time();
		var table='product_master';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<product_type>"+product_type+"</product_type>" +
					"<make>"+make+"</make>" +
					"<name>"+name+"</name>" +
					"<est_price>"+est_price+"</est_price>" +
					"<description>"+description+"</description>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form39</link_to>" +
					"<title>Deleted</title>" +
					"<notes>Deleted product "+name+" from inventory</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var other_delete="<product_instances>" +
				"<product_name>"+name+"</product_name>" +
				"</product_instances>";
		var other_delete2="<documents>" +
				"<doc_type>product</doc_type>" +
				"<target_id>"+data_id+"</target_id>" +
				"</documents>";
	
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
			server_delete_simple(other_delete);
			server_delete_simple(other_delete2);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
			local_delete_simple(other_delete);
			local_delete_simple(other_delete2);
		}	
		$(button).parent().parent().remove();
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
function form40_delete_item(button)
{
	if(is_delete_access('form40'))
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
					"<acc_name>"+name+" ("+phone+")</acc_name>" +
					"<email>"+email+"</email>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form40</link_to>" +
					"<title>Deleted</title>" +
					"<notes>Deleted record for supplier "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
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
function form42_delete_item(button)
{
	if(is_delete_access('form42'))
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
					"<title>Deleted</title>" +
					"<notes>Deleted bill no "+data_id+" for customer "+customer_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var other_delete="<bill_items>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"</bill_items>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
			server_delete_simple(other_delete);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
			local_delete_simple(other_delete);
		}	
		$(button).parent().parent().remove();
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
function form43_delete_item(button)
{
	if(is_delete_access('form43'))
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
					"<title>Deleted</title>" +
					"<notes>Deleted purchase order no "+data_id+" for supplier "+supplier+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var other_delete="<purchase_items>" +
				"<purchase_order>"+data_id+"</purchase_order>" +
				"</purchase_items>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
			server_delete_simple(other_delete);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
			local_delete_simple(other_delete);
		}	
		$(button).parent().parent().remove();
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
function form44_delete_item(button)
{
	if(is_delete_access('form44'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
		var data_id=form.elements[0].value;
		var name=form.elements[1].value;
		var template=form.elements[2].value;
		var count_items=form.elements[3].value;
		var last_updated=get_my_time();
		var table='pamphlets';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<template>"+template+"</template>" +
					"<count_items>"+count_items+"</count_items>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form44</link_to>" +
					"<title>Deleted</title>" +
					"<notes>Deleted pamphlet "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var other_delete="<pamphlet_items>" +
				"<pamphlet_id>"+data_id+"</pamphlet_id>" +
				"</pamphlet_items>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
			server_delete_simple(other_delete);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
			local_delete_simple(other_delete);
		}	
		$(button).parent().parent().remove();
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
function form45_delete_item(button)
{
	if(is_delete_access('form45'))
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
					"<title>Deleted</title>" +
					"<notes>Deleted bill no "+data_id+" for customer "+customer_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var other_delete="<service_instances>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"</service_instances>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
			server_delete_simple(other_delete);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
			local_delete_simple(other_delete);
		}	
		$(button).parent().parent().remove();
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
function form51_delete_form()
{
	if(is_delete_access('form51'))
	{
		var form=document.getElementById("form51_master");
		
		var username=form.elements[1].value;
		var name=form.elements[2].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='user_profiles';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<username>"+username+"</username>" +
					"<name>"+name+"</name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form51</link_to>" +
					"<title>Deleted</title>" +
					"<notes>Deleted user account for "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var other_delete="<access_control>" +
				"<username>"+username+"</username>" +
				"</access_control>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
			server_delete_simple(other_delete);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
			local_delete_simple(other_delete);
		}
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
function form53_delete_item(button)
{
	if(is_delete_access('form53'))
	{
		var form=document.getElementById(form_id);
		
		var data_id=form.elements[0].value;
		var supplier_name=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		var entry_date=get_raw_time(form.elements[3].value);
		var amount=form.elements[4].value;
		var last_updated=get_my_time();
		var table='supplier_bills';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
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
					"<title>Deleted</title>" +
					"<notes>Deleted supplier bill no "+data_id+" from supplier "+supplier_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var other_delete="<goods_received>" +
				"<sup_bill_id>"+data_id+"</sup_bill_id>" +
				"</goods_received>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
			server_delete_simple(other_delete);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
			local_delete_simple(other_delete);
		}	
		$(button).parent().parent().remove();
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
function form56_delete_item(button)
{
	if(is_delete_access('form56'))
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
					"<title>Deleted</title>" +
					"<notes>Deleted expense item no "+data_id+" of amount "+amount+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
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
function form57_delete_item(button)
{
	if(is_delete_access('form57'))
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
					"<name>"+service+"</name>" +
					"<description>"+description+"</description>" +
					"<estimated_cost>"+estimated_cost+"</estimated_cost>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form57</link_to>" +
					"<title>Deleted</title>" +
					"<notes>Deleted service "+service+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var other_delete="<pre_requisites>" +
					"<name>"+service+"</name>" +
					"<type>service</type>" +
					"</pre_requisites>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
			local_delete_simple(other_delete);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
			local_delete_simple(other_delete);
		}	
		$(button).parent().parent().remove();
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
function form58_delete_item(button)
{
	if(is_delete_access('form58'))
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
					"<title>Deleted</title>" +
					"<notes>Deleted pre-requisite for service "+service+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
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
function form59_delete_item(button)
{
	if(is_delete_access('form59'))
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
					"<title>Deleted</title>" +
					"<notes>Deleted pre-requisite for product "+product+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_delete_row(data_xml,activity_xml);
		}
		else
		{
			local_delete_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}
