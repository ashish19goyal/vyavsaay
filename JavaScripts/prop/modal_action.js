/**
 * @modalNo 8
 * @modal Add new Offer
 * @param button
 */
function modal8_action()
{
	var form=document.getElementById('modal8_form');
		
	var offer_name=form.elements[1];
	var end_date=form.elements[2];
	var offer_type=form.elements[3];
	var product_name=form.elements[4];
	var batch=form.elements[5];
	var all_batch=form.elements[6];
	var service=form.elements[7];
	var criteria_type=form.elements[8];
	var criteria_amount=form.elements[9];
	var criteria_quantity=form.elements[10];
	var result_type=form.elements[11];
	var discount_percent=form.elements[12];
	var discount_amount=form.elements[13];
	var quantity_percent=form.elements[14];
	var quantity_amount=form.elements[15];
	var free_product_name=form.elements[16];
	var free_quantity=form.elements[17];
	var free_service_name=form.elements[18];
	
	var product_data="<product_master>" +
		"<name></name>" +
		"</product_master>";
	set_my_value_list(product_data,product_name);
	set_my_value_list(product_data,free_product_name);
	var service_data="<services>" +
		"<name></name>" +
		"</services>";
	set_my_value_list(service_data,service);
	set_my_value_list(service_data,free_service_name);
	
	$(all_batch).on('click',function(event)
	{
		if(all_batch.checked)
		{
			batch.value='all';
			$(batch).attr('readonly','readonly');
		}
		else
		{
			batch.value='';
			$(batch).removeAttr('readonly');
		}
	});
	
	$(offer_type).on('blur',function(event)
	{
		$(product_name).parent().hide();
		$(batch).parent().hide();
		$(all_batch).parent().hide();
		$(service).parent().hide();
		$(criteria_type).parent().hide();
		$(criteria_amount).parent().hide();
		$(criteria_quantity).parent().hide();
		
		if(offer_type.value=='product')
		{
			$(product_name).on('blur',function(event)
			{
				var batch_data="<product_instances>" +
						"<batch></batch>" +
						"<product_name>"+product_name.value+"</product_name>" +
						"</product_instances>";
				set_my_value_list(batch_data,batch);
			});
						
			$(product_name).parent().show();
			$(batch).parent().show();
			$(all_batch).parent().show();
			$(criteria_type).parent().show();
			$(product_name).focus();
		}
		else if(offer_type.value=='service')
		{			
			$(service).parent().show();
			$(criteria_type).parent().show();
			$(service).focus();
		}
		else if(offer_type.value=='bill')
		{
			criteria_type.value='min amount crossed';
			$(criteria_amount).parent().show();
			$(criteria_amount).focus();
		}
	});
	
	$(criteria_type).on('blur',function(event)
	{
		$(criteria_amount).parent().hide();
		$(criteria_quantity).parent().hide();
		if(criteria_type.value=='min amount crossed')
		{
			$(criteria_amount).parent().show();
			$(criteria_amount).focus();
		}
		else if(criteria_type.value=='min quantity crossed')
		{
			$(criteria_quantity).parent().show();
			$(criteria_quantity).focus();
		}
	});
	
	$(result_type).on('blur',function(event)
	{
		$(discount_percent).parent().hide();
		$(discount_amount).parent().hide();
		$(quantity_percent).parent().hide();
		$(quantity_amount).parent().hide();
		$(free_product_name).parent().hide();
		$(free_quantity).parent().hide();
		$(free_service_name).parent().hide();
		
		if(result_type.value=='discount')
		{
			$(discount_percent).parent().show();
			$(discount_amount).parent().show();
			$(discount_percent).focus();
		}
		else if(result_type.value=='quantity addition')
		{
			$(quantity_percent).parent().show();
			$(quantity_amount).parent().show();
			$(quantity_percent).focus();
		}
		else if(result_type.value=='product free')
		{
			$(free_product_name).parent().show();
			$(free_quantity).parent().show();
			$(free_product_name).focus();
		}
		else if(result_type.value=='service free')
		{
			$(free_service_name).parent().show();
			$(free_service_name).focus();
		}
	});
	
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form35'))
		{
			var offer_name_value=offer_name.value;
			var end_date_value=get_raw_time(end_date.value);
			var type_value=offer_type.value;
			var product_value=product_name.value;
			var batch_value=batch.value;
			var service_value=service.value;
			var criteria_type_value=criteria_type.value;
			var criteria_amount_value=criteria_amount.value;
			var criteria_quantity_value=criteria_quantity.value;
			var result_type_value=result_type.value;
			var discount_percent_value=discount_percent.value;
			var discount_amount_value=discount_amount.value;
			var quantity_percent_value=quantity_percent.value;
			var quantity_amount_value=quantity_amount.value;
			var free_product_name_value=free_product_name.value;
			var free_quantity_value=free_quantity.value;
			var free_service_name_value=free_service_name.value;
			var status_value='active';
			var data_id=get_new_key();
			var last_updated=get_my_time();
			
			var offer_detail_value="Get ";
			if(result_type_value=='discount')
			{
				if(discount_percent_value=="")
					offer_detail_value+="a discount of Rs: "+discount_amount_value;
				else
					offer_detail_value+="a discount of "+discount_percent_value+"%";
			}
			else if(result_type_value=='quantity addition')
			{
				if(quantity_percent_value=="")
					offer_detail_value+="additional "+quantity_amount_value+" free pieces";
				else
					offer_detail_value+="additional "+quantity_percent_value+"% free";
			}	
			else if(result_type_value=='free product')
			{
				offer_detail_value+=free_quantity_value+" pieces of "+free_product_name_value;
			}
			else if(result_type_value=='free service')
			{
				offer_detail_value+="free service "+free_service_name_value;
			}
			
			if(type_value=='bill')
			{
				offer_detail_value+=" on bill amount of more than Rs: "+criteria_amount_value;
			}
			else if(type_value=='product')
			{
				offer_detail_value+=" on purchase of ";
				if(criteria_type_value=="min amount crossed")
					offer_detail_value+="worth Rs: "+criteria_amount_value+" or more";
				else if(criteria_type_value=="min quantity crossed")
					offer_detail_value+=+criteria_quantity_value+" piece or more";
				offer_detail_value+=" of "+product_value;
			}	
			else if(type_value=='service')
			{
				offer_detail_value+=" on availing "+service_value+ " service ";
				if(criteria_type_value=="min amount crossed")
					offer_detail_value+="worth Rs: "+criteria_amount_value+" or more";
				else if(criteria_type_value=="min quantity crossed")
					offer_detail_value+=+criteria_quantity_value+" times or more";
			}
			
			var data_xml="<offers>" +
						"<id>"+data_id+"</id>" +
						"<offer_name unique='yes'>"+offer_name_value+"</offer_name>" +
						"<offer_type>"+type_value+"</offer_type>" +
						"<product_name>"+product_value+"</product_name>" +
						"<batch>"+batch_value+"</batch>" +
						"<service>"+service_value+"</service>" +
						"<criteria_type>"+criteria_type_value+"</criteria_type>" +
						"<criteria_amount>"+criteria_amount_value+"</criteria_amount>" +
						"<criteria_quantity>"+criteria_quantity_value+"</criteria_quantity>" +
						"<result_type>"+result_type_value+"</result_type>" +
						"<discount_percent>"+discount_percent_value+"</discount_percent>" +
						"<discount_amount>"+discount_amount_value+"</discount_amount>" +
						"<quantity_add_percent>"+quantity_percent_value+"</quantity_add_percent>" +
						"<quantity_add_amount>"+quantity_amount_value+"</quantity_add_amount>" +
						"<free_product_name>"+free_product_name_value+"</free_product_name>" +
						"<free_product_quantity>"+free_quantity_value+"</free_product_quantity>" +
						"<free_service_name>"+free_service_name_value+"</free_service_name>" +
						"<end_date>"+end_date_value+"</end_date>" +
						"<offer_detail>"+offer_detail_value+"</offer_detail>" +
						"<status>"+status_value+"</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</offers>";	
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>offers</tablename>" +
						"<link_to>form35</link_to>" +
						"<title>Saved</title>" +
						"<notes>Offer "+offer_name_value+"</notes>" +
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
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal8").dialog("close");
	});
	
	set_static_value_list('offers','criteria_type',criteria_type);
	set_static_value_list('offers','result_type',result_type);
	set_static_value_list('offers','offer_type',offer_type);
	$(end_date).datepicker();
	
	$(product_name).parent().hide();
	$(batch).parent().hide();
	$(all_batch).parent().hide();
	$(service).parent().hide();
	$(criteria_type).parent().hide();
	$(criteria_amount).parent().hide();
	$(criteria_quantity).parent().hide();
	$(discount_percent).parent().hide();
	$(discount_amount).parent().hide();
	$(quantity_percent).parent().hide();
	$(quantity_amount).parent().hide();
	$(free_product_name).parent().hide();
	$(free_quantity).parent().hide();
	$(free_service_name).parent().hide();
	
	$("#modal8").dialog("open");
	
}

/**
 * @modalNo 9
 * @modal Add asset valuations
 * @param button
 */
function modal9_action(button)
{
	var form=document.getElementById('modal9_form');
	
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);
	var fname=father_form.elements[0];
	var ftype=father_form.elements[1];
	var fdescription=father_form.elements[2];
	var fdate_inc=father_form.elements[6];
	var fownership_type=father_form.elements[7];
	var fownership_contract=father_form.elements[8];
	var fmake=father_form.elements[9];
	var fmaintained_by=father_form.elements[10];
	var fmaintenance_contract=father_form.elements[11];
	var fmaintenance_contact=father_form.elements[12];
	var fmaintenance_activities=father_form.elements[13];
	var finitial_value=father_form.elements[14];
	var fcurrent_value=father_form.elements[15];
	var fasset_location=father_form.elements[16];
	
	form.elements[1].value=fname.value;
	form.elements[2].value=ftype.value;
	form.elements[3].value=fdescription.value;
	form.elements[4].value=fdate_inc.value;
	form.elements[5].value=fmake.value;
	form.elements[6].value=fownership_type.value;
	form.elements[7].value=fownership_contract.value;
	form.elements[8].value=fmaintained_by.value;
	form.elements[9].value=fmaintenance_contract.value;
	form.elements[10].value=fmaintenance_contact.value;
	form.elements[11].value=fmaintenance_activities.value;
	form.elements[12].value=finitial_value.value;
	form.elements[13].value=fcurrent_value.value;
	form.elements[14].value=fasset_location.value;
	
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		fname.value=form.elements[1].value;
		ftype.value=form.elements[2].value;
		fdescription.value=form.elements[3].value;
		fdate_inc.value=form.elements[4].value;
		fmake.value=form.elements[5].value;
		fownership_type.value=form.elements[6].value;
		fownership_contract.value=form.elements[7].value;
		fmaintained_by.value=form.elements[8].value;
		fmaintenance_contract.value=form.elements[9].value;
		fmaintenance_contact.value=form.elements[10].value;
		fmaintenance_activities.value=form.elements[11].value;
		finitial_value.value=form.elements[12].value;
		fcurrent_value.value=form.elements[13].value;
		fasset_location.value=form.elements[14].value;		
	
		$("#modal9").dialog("close");
	});
	
	$("#modal9").dialog("open");
}

/**
 * @modalNo 10
 * @modal Add new asset
 * @param button
 */
function modal10_action()
{
	var form=document.getElementById('modal10_form');
	var fname=form.elements[1];
	var ftype=form.elements[2];
	var fdescription=form.elements[3];
	var fdate=form.elements[4];
	var fmake=form.elements[5];
	var fown_type=form.elements[6];
	var fown_contract=form.elements[7];
	var fmaintained_by=form.elements[8];
	var fmain_contract=form.elements[9];
	var fmain_contact=form.elements[10];
	var fmain_activities=form.elements[11];
	var finitial_value=form.elements[12];
	var fcurrent_value=form.elements[13];
	var fasset_location=form.elements[14];
	
	set_static_value_list('assets','type',ftype);
	
	$(fdate).datepicker();
	fdate.value=get_my_date();
	
	set_static_value_list('assets','ownership_type',fown_type);
	set_static_value_list('assets','maintained_by',fmaintained_by);
	
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var name=fname.value;
		var type=ftype.value;
		var description=fdescription.value;
		var data_id=get_new_key();
		var date_inc=get_raw_time(fdate.value);
		var ownership_type=fown_type.value;
		var ownership_contract=fown_contract.value;
		var make=fmake.value;
		var maintained_by=fmaintained_by.value;
		var maintenance_contract=fmain_contract.value;
		var maintenance_contact=fmain_contact.value;
		var maintenance_activities=fmain_activities.value;
		var initial_value=finitial_value.value;
		var current_value=fcurrent_value.value;
		var asset_location=fasset_location.value;
		var last_updated=get_my_time();
		var data_xml="<assets>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"</name>" +
					"<date_inc>"+date_inc+"</date_inc>" +
					"<type>"+type+"</type>" +
					"<description>"+description+"</description>" +
					"<ownership_type>"+ownership_type+"</ownership_type>" +
					"<ownership_contract>"+ownership_contract+"</ownership_contract>" +
					"<make>"+make+"</make>" +
					"<maintained_by>"+maintained_by+"</maintained_by>" +
					"<maintenance_contract>"+maintenance_contract+"</maintenance_contract>" +
					"<maintenance_contact>"+maintenance_contact+"</maintenance_contact>" +
					"<maintenance_activities>"+maintenance_activities+"</maintenance_activities>" +
					"<initial_value>"+initial_value+"</initial_value>" +
					"<current_value>"+current_value+"</current_value>" +
					"<asset_location>"+asset_location+"</asset_location>" +
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
			server_create_row(data_xml,activity_xml);
		}
		else
		{
			local_create_row(data_xml,activity_xml);
		}	
		$("#modal10").dialog("close");
	});
	
	$("#modal10").dialog("open");
}


/**
 * @modalNo 11
 * @modal Add new customer
 * @param button
 */
function modal11_action()
{
	var form=document.getElementById('modal11_form');
	
	var fname=form.elements[1];
	var fphone=form.elements[2];
	var femail=form.elements[3];
	var faddress=form.elements[4];
	var fstreet=form.elements[5];
	var fcity=form.elements[6];
	var fstate=form.elements[7];
	var fcountry=form.elements[8];
	var fnotes=form.elements[9];
		
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form30'))
		{
			var name=fname.value;
			var phone=fphone.value;
			var email=femail.value;
			var address=faddress.value;
			var street=fstreet.value;
			var city=fcity.value;
			var state=fstate.value;
			var country=fcountry.value;
			var notes=fnotes.value;
			var data_id=get_new_key();
			var address_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<customers>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"<phone>"+phone+"</phone>" +
						"<email>"+email+"</email>" +
						"<notes>"+notes+"</notes>" +
						"<acc_name unique='yes'>"+name+" ("+phone+")</acc_name>" +
						"<status>active</status>" +
						"<address>"+address+"</address>" +
						"<street>"+street+"</street>" +
						"<city>"+city+"</city>" +
						"<state>"+state+"</state>" +
						"<country>"+country+"</country>" +
						"<address_status>pending analysis</address_status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</customers>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>customers</tablename>" +
						"<link_to>form30</link_to>" +
						"<title>Added</title>" +
						"<notes>New customer "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var account_xml="<accounts>" +
						"<id>"+data_id+"</id>" +
						"<description>"+notes+"</description>" +
						"<acc_name unique='yes'>"+name+" ("+phone+")</acc_name>" +
						"<type>customer</type>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</accounts>";
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
				server_create_simple(account_xml);
			}
			else
			{
				local_create_row(data_xml,activity_xml);
				local_create_simple(account_xml);
			}	
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal11").dialog("close");
	});
	
	$("#modal11").dialog("open");
}


/**
 * @modalNo 12
 * @modal Add new account
 * @param button
 */
function modal12_action()
{
	var form=document.getElementById('modal12_form');
	
	var fname=form.elements[1];
	var fdescription=form.elements[2];
	var fdata_id=get_new_key();
		
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var name=fname.value;
		var type='financial';
		var description=fdescription.value;
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var data_xml="<accounts>" +
					"<id>"+data_id+"</id>" +
					"<acc_name unique='yes'>"+name+"</acc_name>" +
					"<type>"+type+"</type>" +
					"<description>"+description+"</description>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</accounts>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>accounts</tablename>" +
					"<link_to></link_to>" +
					"<title>Added</title>" +
					"<notes>New account "+name+"</notes>" +
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
		$("#modal12").dialog("close");
	});
	
	$("#modal12").dialog("open");
}

/**
 * @modalNo 13
 * @modal Add new supplier
 * @param button
 */
function modal13_action()
{
	var form=document.getElementById('modal13_form');
	
	var fname=form.elements[1];
	var fphone=form.elements[2];
	var femail=form.elements[3];
	var faddress=form.elements[4];
	var fstreet=form.elements[5];
	var fcity=form.elements[6];
	var fstate=form.elements[7];
	var fcountry=form.elements[8];
	var fnotes=form.elements[9];
		
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form40'))
		{
			var name=fname.value;
			var phone=fphone.value;
			var email=femail.value;
			var address=faddress.value;
			var street=fstreet.value;
			var city=fcity.value;
			var state=fstate.value;
			var country=fcountry.value;
			var notes=fnotes.value;
			var data_id=get_new_key();
			var address_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<suppliers>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"<phone>"+phone+"</phone>" +
						"<email>"+email+"</email>" +
						"<notes>"+notes+"</notes>" +
						"<acc_name unique='yes'>"+name+" ("+phone+")</acc_name>" +
						"<address>"+address+"</address>" +
						"<street>"+street+"</street>" +
						"<city>"+city+"</city>" +
						"<state>"+state+"</state>" +
						"<country>"+country+"</country>" +
						"<address_status>pending analysis</address_status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</suppliers>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>suppliers</tablename>" +
						"<link_to>form40</link_to>" +
						"<title>Added</title>" +
						"<notes>Supplier "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var account_xml="<accounts>" +
						"<id>"+data_id+"</id>" +
						"<description>"+notes+"</description>" +
						"<acc_name unique='yes'>"+name+" ("+phone+")</acc_name>" +
						"<type>supplier</type>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</accounts>";
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
				server_create_simple(account_xml);
			}
			else
			{
				local_create_row(data_xml,activity_xml);
				local_create_simple(account_xml);
			}	
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal13").dialog("close");
	});
	
	$("#modal13").dialog("open");
}


/**
 * @modalNo 14
 * @modal Add new product
 * @param button
 */
function modal14_action()
{
	var form=document.getElementById('modal14_form');
	
	var fname=form.elements[1];
	var fmake=form.elements[2];
	var fdescription=form.elements[3];
	var fpictureinfo=form.elements[4];
	var fpicture=form.elements[5];
	
	var make_data="<product_master>" +
		"<make></make>" +
		"</product_master>";
	set_my_filter(make_data,fmake);
	
	fpicture.addEventListener('change',function(evt)
	{
		select_picture(evt,fpictureinfo,function(dataURL)
		{
			fpictureinfo.innerHTML="<div class='figure'><img src='"+dataURL+"'/></div>";			
		});
	},false);
	
	$(form).on("submit",function(event)
	{
		if(is_create_access('form39'))
		{
			var name=form.elements[1].value;
			var make=form.elements[2].value;
			var description=form.elements[3].value;
			var tax=form.elements[6].value;
			var data_id=get_new_key();
			var pic_id=get_new_key();
			var url=$(fpictureinfo).find('div').find('img').attr('src');
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
						"<title>Added</title>" +
						"<notes>Product "+name+" to inventory</notes>" +
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

			if(url!="")
			{
				var pic_xml="<documents>" +
							"<id>"+pic_id+"</id>" +
							"<url>"+url+"</url>" +
							"<doc_type>product_master</doc_type>" +
							"<target_id>"+data_id+"</target_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</documents>";
				if(is_online())
				{
					server_create_simple(pic_xml);
				}
				else
				{
					local_create_simple(pic_xml);
				}	
			}
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal14").dialog("close");
	});
	
	$("#modal14").dialog("open");
}


/**
 * @modalNo 15
 * @modal Add Feedback
 * @param button
 */
function modal15_action()
{
	var form=document.getElementById('modal15_form');
	
	var fprovider=form.elements[1];
	var fdetail=form.elements[2];
	var ftype=form.elements[3];
	var frating=form.elements[4];
	var fdate=form.elements[5];
	var fdata_id=get_new_key();
	
	var accounts_data="<accounts>" +
		"<acc_name></acc_name>" +
		"</accounts>";
	
	set_my_value_list(accounts_data,fprovider);
	set_static_value_list('feedback','type',ftype);
	set_static_value_list('feedback','rating',frating);
	$(fdate).datepicker();
	$(fdate).val(get_my_date());
		
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var provider=fprovider.value;
		var detail=fdetail.value;
		var type=ftype.value;
		var rating=frating.value;
		var date=get_raw_time(fdate.value);
		var data_id=fdata_id;
		var last_updated=get_my_time();
		var table='feedback';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<provider>"+provider+"</provider>" +
					"<type>"+type+"</type>" +
					"<detail>"+detail+"</detail>" +
					"<rating>"+rating+"</rating>" +
					"<date>"+date+"</date>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>report42</link_to>" +
					"<title>Added</title>" +
					"<notes>Feedback from "+provider+"</notes>" +
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
		
		$("#modal15").dialog("close");
	});
	
	$("#modal15").dialog("open");
}


/**
 * @modalNo 16
 * @modal Add new staff
 * @param button
 */
function modal16_action()
{
	var form=document.getElementById('modal16_form');
	
	var fname=form.elements[1];
	var fphone=form.elements[2];
	var femail=form.elements[3];
	var faddress=form.elements[4];
	var fstreet=form.elements[5];
	var fcity=form.elements[6];
	var fstate=form.elements[7];
	var fcountry=form.elements[8];
	var fjoining=form.elements[9];
	var fqual=form.elements[10];
	var fskills=form.elements[11];
	var ffixed_comp=form.elements[12];
	var fvar_comp=form.elements[13];
	var fhours=form.elements[14];
	var fpto=form.elements[15];
	var fdata_id=get_new_key();
		
	$(fjoining).datepicker();
	$(fjoining).val(get_my_date());
	
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form8'))
		{
			var name=fname.value;
			var phone=fphone.value;
			var email=femail.value;
			var address=faddress.value;
			var street=fstreet.value;
			var city=fcity.value;
			var state=fstate.value;
			var country=fcountry.value;
			var joining=get_raw_time(fjoining.value);
			var qual=fqual.value;
			var skills=fskills.value;
			var fixed_comp=ffixed_comp.value;
			var var_comp=fvar_comp.value;
			var hours=fhours.value;
			var pto=fpto.value;
			var data_id=get_new_key();
			var address_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<staff>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"<phone>"+phone+"</phone>" +
						"<email>"+email+"</email>" +
						"<acc_name unique='yes'>"+name+" ("+phone+")</acc_name>" +
						"<address>"+address+"</address>" +
						"<street>"+street+"</street>" +
						"<city>"+city+"</city>" +
						"<state>"+state+"</state>" +
						"<country>"+country+"</country>" +
						"<address_status>pending analysis</address_status>" +
						"<joining_date>"+joining+"</joining_date>" +
						"<qualification>"+qual+"</qualification>" +
						"<skills>"+skills+"</skills>" +
						"<fixed_comp>"+fixed_comp+"</fixed_comp>" +
						"<variable_comp_rate>"+var_comp+"</variable_comp_rate>" +
						"<monthly_hours>"+hours+"</monthly_hours>" +
						"<allowed_pto>"+pto+"</allowed_pto>" +
						"<status>active</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</staff>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>staff</tablename>" +
						"<link_to>form8</link_to>" +
						"<title>Added</title>" +
						"<notes>Staff "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var account_xml="<accounts>" +
						"<id>"+data_id+"</id>" +
						"<description>"+skills+"</description>" +
						"<acc_name unique='yes'>"+name+" ("+phone+")</acc_name>" +
						"<type>staff</type>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</accounts>";
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
				server_create_simple(account_xml);
			}
			else
			{
				local_create_row(data_xml,activity_xml);
				local_create_simple(account_xml);
			}	
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal16").dialog("close");
	});
	
	$("#modal16").dialog("open");
}


/**
 * @modalNo 17
 * @modal Update staff details
 * @param button
 */
function modal17_action(button)
{
	var form=document.getElementById('modal17_form');
	
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);
	var fdetail=father_form.elements[4];
	var fdata_id=father_form.elements[6];
	
	var faddress_detail=father_form.elements[3];
	var fstaff_detail=father_form.elements[4];
	
	var faddress=father_form.elements[9];
	var fstreet=father_form.elements[10];
	var fcity=father_form.elements[11];
	var fstate=father_form.elements[12];
	var fcountry=father_form.elements[13];
	var faddress_status=father_form.elements[14];
	var fjoining=father_form.elements[15];
	var fqual=father_form.elements[16];
	var fskills=father_form.elements[17];
	var ffixed_comp=father_form.elements[18];
	var fvar_comp=father_form.elements[19];
	var fpto=father_form.elements[20];	
	var fhours=father_form.elements[21];
	
	var joining_date=form.elements[6];
	$(joining_date).datepicker();
	form.elements[1].value=faddress.value;
	form.elements[2].value=fstreet.value;
	form.elements[3].value=fcity.value;
	form.elements[4].value=fstate.value;
	form.elements[5].value=fcountry.value;
	form.elements[6].value=fjoining.value;
	form.elements[7].value=fqual.value;
	form.elements[8].value=fskills.value;
	form.elements[9].value=ffixed_comp.value;
	form.elements[10].value=fvar_comp.value;
	form.elements[11].value=fhours.value;
	form.elements[12].value=fpto.value;
	
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var address=form.elements[1].value;
		var street=form.elements[2].value;
		var city=form.elements[3].value;
		var state=form.elements[4].value;
		var country=form.elements[5].value;
		var date=form.elements[6].value;
		var qual=form.elements[7].value;
		var skill=form.elements[8].value;
		var comp=form.elements[9].value;
		var rate=form.elements[10].value;
		var hours=form.elements[11].value;
		var pto=form.elements[12].value;
		
		faddress_detail.value=address+", "+street+", "+city+", "+state+", "+country;
		fstaff_detail.value="Joined on "+date+", Qualification: "+qual+", Skills: "+skill+", Salary: Rs."+comp+"+ Rs."+rate+"/hour. Allowed "+pto+" per month.";
		faddress.value=address;
		fstreet.value=street;
		fcity.value=city;
		fstate.value=state;
		fcountry.value=country;
		faddress_status.value='pending analysis';
		fjoining.value=date;
		fqual.value=qual;
		fskills.value=skill;
		ffixed_comp.value=comp;
		fvar_comp.value=rate;
		fpto.value=pto;	
		fhours.value=hours;	
		
		$("#modal17").dialog("close");
	});
	
	$("#modal17").dialog("open");
}


/**
 * @modalNo 19
 * @modal Copy product
 * @param button
 */
function modal19_action(button)
{
	var form=document.getElementById('modal19_form');
	
	var fname=form.elements[1];
	var fmake=form.elements[2];
	var fdescription=form.elements[3];
	var fpictureinfo=form.elements[4];
	var fpicture=form.elements[5];
	var ftax=form.elements[6];
		
	/////---------initializing all the values-------///////////
	var form_id=$(button).attr('form');
	var copy_form=document.getElementById(form_id);
	var copy_name=copy_form.elements[0].value;
	
	var copy_master_data="<product_master>" +
			"<id></id>" +
			"<name>"+copy_name+"</name>" +
			"<description></description>" +
			"<make></make>" +
			"<tax></tax>" +
			"</product_master>";
	
	fetch_requested_data('form39',copy_master_data,function(results)
	{
		results.forEach(function(result)
		{
			fmake.value=result.make;
			ftax.value=result.tax;
			fdescription.value=result.description;
			
			var picture_column="<documents>" +
					"<id></id>" +
					"<url></url>" +
					"<doc_type>product_master</doc_type>" +
					"<target_id>"+result.id+"</target_id>" +
					"</documents>";
			fetch_requested_data('form39',picture_column,function(pic_results)
			{
				var pic_results_url="";
				for (var j in pic_results)
				{
					pic_results_url=pic_results[j].url;
				}
				updated_url=pic_results_url.replace(/ /g,"+");
				fpictureinfo.innerHTML="<div class='figure'><img src='"+updated_url+"'/></div>";
			});
		});
	});
		
	////---------initialization complete------///////////////
	
	
	////-----setting editable dropdowns etc----------/////////////
	var make_data="<product_master>" +
		"<make></make>" +
		"</product_master>";
	set_my_filter(make_data,fmake);
	
	fpicture.addEventListener('change',function(evt)
	{
		select_picture(evt,fpictureinfo,function(dataURL)
		{
			fpictureinfo.innerHTML="<div class='figure'><img src='"+dataURL+"'/></div>";			
		});
	},false);
	
	///////-------------set editable finished-------/////////////

	
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form39'))
		{
			var name=form.elements[1].value;
			var make=form.elements[2].value;
			var description=form.elements[3].value;
			var tax=form.elements[6].value;
			var data_id=get_new_key();
			var pic_id=get_new_key();
			var url=$(fpictureinfo).find('div').find('img').attr('src');
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
						"<title>Added</title>" +
						"<notes>Product "+name+" to inventory</notes>" +
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

			if(url!="")
			{
				var pic_xml="<documents>" +
							"<id>"+pic_id+"</id>" +
							"<url>"+url+"</url>" +
							"<doc_type>product_master</doc_type>" +
							"<target_id>"+data_id+"</target_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</documents>";
				if(is_online())
				{
					server_create_simple(pic_xml,pic_activity_xml);
				}
				else
				{
					local_create_simple(pic_xml,pic_activity_xml);
				}	
			}

			var copy_attributes_data="<attributes>" +
					"<name>"+copy_name+"</name>" +
					"<type>product</type>" +
					"<attribute></attribute>" +
					"<value></value>" +
					"</attributes>";
			fetch_requested_data('form39',copy_attributes_data,function(attributes)
			{
				attributes.forEach(function(attribute)
				{
					if(attribute!="")
					{
						var data_xml="<attributes>" +
								"<id>"+get_new_key()+"</id>" +
								"<name>"+name+"</name>" +
								"<type>product</type>" +
								"<attribute>"+attribute.attribute+"</attribute>" +
								"<value>"+attribute.value+"</value>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</attributes>";
						if(is_online())
						{
							server_create_simple(data_xml);
						}
						else
						{
							local_create_simple(data_xml);
						}
					}
				});
			});
			
			var copy_requisite_data="<pre_requisites>" +
					"<name>"+copy_name+"</name>" +
					"<type>product</type>" +
					"<requisite_type></requisite_type>" +
					"<requisite_name></requisite_name>" +
					"<quantity></quantity>" +
					"</pre_requisites>";
			fetch_requested_data('',copy_requisite_data,function(requisites)
			{
				requisites.forEach(function(requisite)
				{
					if(requisite!="")
					{
						var data_xml="<pre_requisites>" +
								"<id>"+get_new_key()+"</id>" +
								"<name>"+name+"</name>" +
								"<type>product</type>" +
								"<requisite_type>"+requisite.requisite_type+"</requisite_type>" +
								"<requisite_name>"+requisite.requisite_name+"</requisite_name>" +
								"<quantity>"+requisite.quantity+"</quantity>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</pre_requisites>";
						if(is_online())
						{
							server_create_simple(data_xml);
						}
						else
						{
							local_create_simple(data_xml);
						}
					}
				});
			});
			
			var copy_cross_data="<cross_sells>" +
					"<name>"+copy_name+"</name>" +
					"<type>product</type>" +
					"<cross_type></cross_type>" +
					"<cross_name></cross_name>" +
					"</cross_sells>";
			fetch_requested_data('',copy_cross_data,function(cross_sells)
			{
				cross_sells.forEach(function(cross_sell)
				{
					if(cross_sell!="")
					{
						var data_xml="<cross_sells>" +
							"<id>"+get_new_key()+"</id>" +
							"<name>"+name+"</name>" +
							"<type>product</type>" +
							"<cross_type>"+cross_sell.cross_type+"</cross_type>" +
							"<cross_name>"+cross_sell.cross_type+"</cross_name>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</cross_sells>";
				
						if(is_online())
						{
							server_create_simple(data_xml);
						}
						else
						{
							local_create_simple(data_xml);
						}
					}
				});
			});	
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal19").dialog("close");
	});
	
	$("#modal19").dialog("open");
}

/**
 * @modalNo 20
 * @modal Add new service
 * @param button
 */
function modal20_action()
{
	var form=document.getElementById('modal20_form');
	
	var fname=form.elements[1];
	var fdescription=form.elements[2];
			
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form57') || is_update_access('form57'))
		{
			var name=form.elements[1].value;					
			var description=form.elements[2].value;
			var tax=form.elements[3].value;
			var price=form.elements[4].value;
			var duration=form.elements[5].value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<services>" +
						"<id>"+data_id+"</id>" +
						"<name unique='yes'>"+name+"</name>" +
						"<price>"+price+"</price>" +
						"<description>"+description+"</description>" +
						"<tax>"+tax+"</tax>" +
						"<duration>"+duration+"</duration>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</services>";	
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>services</tablename>" +
						"<link_to>form57</link_to>" +
						"<title>Added</title>" +
						"<notes>New service "+name+"</notes>" +
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
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal20").dialog("close");
	});
	
	$("#modal20").dialog("open");
}


/**
 * @modalNo 21
 * @modal Copy service
 * @param button
 */
function modal21_action()
{
	var form=document.getElementById('modal21_form');
	
	var fname=form.elements[1];
	var fdescription=form.elements[2];
	
	//////////----initializing form----------////////////
	
	var form_id=$(button).attr('form');
	var copy_form=document.getElementById(form_id);
	var copy_name=copy_form.elements[0].value;
	
	var copy_master_data="<services>" +
			"<id></id>" +
			"<name>"+copy_name+"</name>" +
			"<description></description>" +
			"<price></price>" +
			"<taxable></taxable>" +
			"<tax></tax>" +
			"<duration></duration>" +
			"</services>";
	fetch_requested_data('form57',copy_master_data,function(results)
	{
		results.forEach(function(result)
		{
			form.elements[2].value=result.description;
			form.elements[3].value=result.tax;
			form.elements[4].value=result.price;
			form.elements[5].value=result.duration;
		});
	});
	
	////////------end of initialization-----------///////////
	
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form57'))
		{
			var name=form.elements[1].value;
			var description=form.elements[2].value;
			var tax=form.elements[3].value;
			var price=form.elements[4].value;
			var duration=form.elements[5].value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<services>" +
						"<id>"+data_id+"</id>" +
						"<name unique='yes'>"+name+"</name>" +
						"<price>"+price+"</price>" +
						"<description>"+description+"</description>" +
						"<taxable>"+taxable+"</taxable>" +
						"<tax>"+tax+"</tax>" +
						"<duration>"+duration+"</duration>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</services>";	
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>services</tablename>" +
						"<link_to>form57</link_to>" +
						"<title>Added</title>" +
						"<notes>New service "+name+"</notes>" +
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

			var copy_attributes_data="<attributes>" +
					"<name>"+copy_name+"</name>" +
					"<type>service</type>" +
					"<attribute></attribute>" +
					"<value></value>" +
					"</attributes>";
			fetch_requested_data('',copy_attributes_data,function(attributes)
			{
				attributes.forEach(function(attribute)
				{
					if(attribute!="")
					{
						var data_xml="<attributes>" +
								"<id>"+get_new_key()+"</id>" +
								"<name>"+name+"</name>" +
								"<type>service</type>" +
								"<attribute>"+attribute.attribute+"</attribute>" +
								"<value>"+attribute.value+"</value>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</attributes>";
						if(is_online())
						{
							server_create_simple(data_xml);
						}
						else
						{
							local_create_simple(data_xml);
						}
					}
				});
			});

			var copy_requisite_data="<pre_requisites>" +
					"<name>"+copy_name+"</name>" +
					"<type>service</type>" +
					"<requisite_type></requisite_type>" +
					"<requisite_name></requisite_name>" +
					"<quantity></quantity>" +
					"</pre_requisites>";
			fetch_requested_data('',copy_requisite_data,function(requisites)
			{
				requisites.forEach(function(requisite)
				{
					if(requisite!="")
					{
						var data_xml="<pre_requisites>" +
								"<id>"+get_new_key()+"</id>" +
								"<name>"+name+"</name>" +
								"<type>service</type>" +
								"<requisite_type>"+requisite.requisite_type+"</requisite_type>" +
								"<requisite_name>"+requisite.requisite_name+"</requisite_name>" +
								"<quantity>"+requisite.quantity+"</quantity>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</pre_requisites>";
						if(is_online())
						{
							server_create_simple(data_xml);
						}
						else
						{
							local_create_simple(data_xml);
						}
					}
				});
			});
			
			var copy_cross_data="<cross_sells>" +
					"<name>"+copy_name+"</name>" +
					"<type>service</type>" +
					"<cross_type></cross_type>" +
					"<cross_name></cross_name>" +
					"</cross_sells>";
			fetch_requested_data('',copy_cross_data,function(cross_sells)
			{
				cross_sells.forEach(function(cross_sell)
				{
					if(cross_sell!="")
					{
						var data_xml="<cross_sells>" +
							"<id>"+get_new_key()+"</id>" +
							"<name>"+name+"</name>" +
							"<type>service</type>" +
							"<cross_type>"+cross_sell.cross_type+"</cross_type>" +
							"<cross_name>"+cross_sell.cross_type+"</cross_name>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</cross_sells>";
				
						if(is_online())
						{
							server_create_simple(data_xml);
						}
						else
						{
							local_create_simple(data_xml);
						}
					}
				});
			});			
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal21").dialog("close");
	});
	$("#modal21").dialog("open");
}

/**
 * @modalNo 22
 * @modal Add new batch
 */
function modal22_action()
{
	var form=document.getElementById('modal22_form');
	
	var fname=form.elements[1];
	var fbatch=form.elements[2];
	var fcost=form.elements[3];
	var fsale_price=form.elements[4];
	var fexpiry=form.elements[5];
	
	$(fexpiry).datepicker();
	
	var name_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_value_list(name_data,fname);
	
	$(fname).on('blur',function(event)
	{
		var batch_data="<product_instances>" +
				"<batch></batch>" +
				"<product_name>"+fname.value+"</product_name>" +
				"</product_instances>";
		get_single_column_data(function(batches)
		{
			$(fbatch).off('blur');
			$(fbatch).on('blur',function(event)
			{
				var found = $.inArray($(this).val(), batches) > -1;
				if(found)
				{
		            $(this).val('');
		        }
			});
		},batch_data);
	});		
	
	
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form1'))
		{
			var name=fname.value;
			var batch=fbatch.value;
			var cost=fcost.value;
			var sale_price=fsale_price.value;
			var expiry=get_raw_time(fexpiry.value);
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<product_instances>" +
						"<id>"+data_id+"</id>" +
						"<product_name>"+name+"</product_name>" +
						"<batch>"+batch+"</batch>" +
						"<cost_price>"+cost+"</cost_price>" +
						"<sale_price>"+sale_price+"</sale_price>" +
						"<expiry>"+expiry+"</expiry>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</product_instances>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>product_instances</tablename>" +
						"<link_to>form1</link_to>" +
						"<title>Added</title>" +
						"<notes>New batch "+batch+" for product "+name+"</notes>" +
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
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal22").dialog("close");
	});
	
	$("#modal22").dialog("open");
}


/**
 * @modal Data import
 * @param t_func function to generate import template
 * @param i_func function to import the generated data_array
 */
function modal23_action(t_func,i_func)
{
	var form=document.getElementById('modal23_form');
	
	var template_button=form.elements[1];
	var new_records=form.elements[2];
	var update_records=form.elements[3];
	var select_file=form.elements[4];
	var selected_file=form.elements[5];
	var import_button=form.elements[6];
	
	$(template_button).on("click",function(event)
	{
		t_func();
	});
	
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		var file=select_file.files[0];
        var fileType = /csv/gi;

        //if(file.type.match(fileType)!=null)
        //{
            selected_file.value = "Uploading!! Please don't refresh";
        	var reader = new FileReader();
            reader.onload = function(e)
            {
               var content=reader.result;
               var data_array=csv_string_to_obj_array(content);

               if(new_records.checked)
            	   i_func(data_array,'create_new');
               else if(update_records.checked)
            	   i_func(data_array,'update_records');
               
               var ajax_complete=setInterval(function(){
            	   if(number_active_ajax===0)
            	   {
            		   selected_file.value = "Upload complete";
            		   $(select_file).val('');
            		   $("#modal23").dialog("close");
            		   clearInterval(ajax_complete);
            	   }
               },10000);
            }
            reader.readAsText(file);    
 /*       }
        else
        {
            selected_file.value = "File not supported!";
        }
*/	
    });
	
	$("#modal23").dialog("open");
}

/**
 * @modal Update customer address
 * @param button
 */
function modal24_action(button)
{
	var form=document.getElementById('modal24_form');
	
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);
	var faddress_detail=father_form.elements[3];
	var faddress=father_form.elements[8];
	var fstreet=father_form.elements[9];
	var fcity=father_form.elements[10];
	var fstate=father_form.elements[11];
	var fcountry=father_form.elements[12];
	var faddress_status=father_form.elements[13];
		
	form.elements[1].value=faddress.value;
	form.elements[2].value=fstreet.value;
	form.elements[3].value=fcity.value;
	form.elements[4].value=fstate.value;
	form.elements[5].value=fcountry.value;
	
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var address=form.elements[1].value;
		var street=form.elements[2].value;
		var city=form.elements[3].value;
		var state=form.elements[4].value;
		var country=form.elements[5].value;
		
		var address_detail=address+", "+street+", "+city+", "+state+", "+country;
		faddress_detail.value=address_detail;
		faddress.value=address;
		fstreet.value=street;
		fcity.value=city;
		fstate.value=state;
		fcountry.value=country;
		faddress_status.value="pending analysis";
		
	
		$("#modal24").dialog("close");
	});
	
	$("#modal24").dialog("open");
}


/**
 * @modal Update supplier address
 * @param button
 */
function modal25_action(button)
{
	var form=document.getElementById('modal25_form');
	
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);
	var faddress_detail=father_form.elements[3];
	var faddress=father_form.elements[8];
	var fstreet=father_form.elements[9];
	var fcity=father_form.elements[10];
	var fstate=father_form.elements[11];
	var fcountry=father_form.elements[12];
	var faddress_status=father_form.elements[13];
	
	form.elements[1].value=faddress.value;
	form.elements[2].value=fstreet.value;
	form.elements[3].value=fcity.value;
	form.elements[4].value=fstate.value;
	form.elements[5].value=fcountry.value;
	
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var address=form.elements[1].value;
		var street=form.elements[2].value;
		var city=form.elements[3].value;
		var state=form.elements[4].value;
		var country=form.elements[5].value;
		
		var address_detail=address+", "+street+", "+city+", "+state+", "+country;
		faddress_detail.value=address_detail;
		faddress.value=address;
		fstreet.value=street;
		fcity.value=city;
		fstate.value=state;
		fcountry.value=country;
		faddress_status.value="pending analysis";
		
	
		$("#modal25").dialog("close");
	});
	
	$("#modal25").dialog("open");
}

/**
 * @modalNo 26
 * @modal Payment Details
 */
function modal26_action(payment_id)
{
	var form=document.getElementById('modal26_form');
	
	var fcustomer=form.elements[1];
	var ftotal=form.elements[2];
	var fpaid=form.elements[3];
	var fdue_date=form.elements[4];
	var fmode=form.elements[5];
	var fstatus=form.elements[6];
	
	$(fdue_date).datepicker();
	
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_value_list(customer_data,fcustomer);
	set_static_value_list('payments','status',fstatus);
	set_static_value_list('payments','mode',fmode);
	
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form42'))
		{
			var customer=fcustomer.value;
			var total=ftotal.value;
			var paid=fpaid.value;
			var due_date=get_raw_time(fdue_date.value);
			var mode=fmode.value;
			var status=fstatus.value;
			var last_updated=get_my_time();
			var data_xml="<payments>" +
						"<id>"+payment_id+"</id>" +
						"<acc_name>"+customer+"</acc_name>" +
						"<type>received</type>" +
						"<total_amount>"+total+"</total_amount>" +
						"<paid_amount>"+paid+"</paid_amount>" +
						"<status>"+status+"</status>" +
						"<date>"+get_my_time()+"</date>" +
						"<due_date>"+due_date+"</due_date>" +
						"<mode>"+mode+"</mode>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</payments>";
			var activity_xml="<activity>" +
						"<data_id>"+payment_id+"</data_id>" +
						"<tablename>payments</tablename>" +
						"<link_to>form11</link_to>" +
						"<title>Updated</title>" +
						"<notes>Payment of "+paid+" from "+customer+"</notes>" +
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
		$("#modal26").dialog("close");
	});
	
	var payments_data="<payments>" +
			"<id>"+payment_id+"</id>" +
			"<acc_name></acc_name>" +
			"<type>received</type>" +
			"<total_amount></total_amount>" +
			"<paid_amount></paid_amount>" +
			"<status></status>" +
			"<due_date></due_date>" +
			"<mode></mode>" +
			"</payments>";
	fetch_requested_data('',payments_data,function(payments)
	{
		for(var k in payments)
		{
			fcustomer.value=payments[k].acc_name;
			ftotal.value=payments[k].total_amount;
			fpaid.value=payments[k].paid_amount;
			fdue_date.value=get_my_past_date(payments[k].due_date);
			fmode.value=payments[k].mode;
			fstatus.value=payments[k].status;
			break;
		}
		$("#modal26").dialog("open");
	});		
	
}


/**
 * @modalNo 27
 * @modal Order product
 * @param button
 */
function modal27_action(product_name)
{
	var form=document.getElementById('modal27_form');
	
	var fname=form.elements[1];
	var fmake=form.elements[2];
	var fprice=form.elements[3];
	var fquantity=form.elements[4];
	var fsupplier=form.elements[5];
	var data_id=get_new_key();
	
	fname.value=product_name;
	var supplier_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	set_my_value_list(supplier_data,fsupplier);

/// logic for last supplier
	var last_purchase_data="<purchase_order_items>" +
			"<id></id>" +
			"<make></make>" +
			"<price></price>" +
			"<quantity></quantity>" +
			"<order_id></order_id>" +
			"<product_name>"+product_name+"</product_name>" +
			"<last_updated></last_updated>" +
			"</purchase_order_items>";
	fetch_requested_data('',last_purchase_data,function(last_purchases)
	{
		last_purchases.sort(function(a,b)
		{
			if(a.last_updated<b.last_updated)
				return 1;
			else 
				return -1;
		});
		var order_id="";
		for(var k in last_purchases)
		{
			order_id=last_purchases[k].order_id;
			
			var last_order_data="<purchase_orders>" +
					"<supplier></supplier>" +
					"<id>"+order_id+"</id>" +
					"<status></status>" +
					"</purchase_orders>";
			fetch_requested_data('',last_order_data,function(last_orders)
			{
				for(var j in last_orders)
				{
					if(last_orders[j].status=='draft')
					{
						fmake.value=last_purchases[k].make;
						fprice.value=last_purchases[k].price;
						fquantity.value=last_purchases[k].quantity;
						
						$(form).on("submit",function(event)
						{
							event.preventDefault();
							if(is_create_access('form43'))
							{
								var name=fname.value;
								var make=fmake.value;
								var price=fprice.value;
								var quantity=fquantity.value;
								var supplier=fsupplier.value;
								var data_id=last_purchases[k].id;
								var last_updated=get_my_time();

								var data_xml="<purchase_order_items>" +
											"<id>"+data_id+"</id>" +
											"<product_name>"+name+"</product_name>" +
											"<make>"+make+"</make>" +
											"<price>"+price+"</price>" +
											"<quantity>"+quantity+"</quantity>" +
											"<order_id>"+order_id+"</order_id>" +
											"<last_updated>"+last_updated+"</last_updated>" +
											"</purchase_order_items>";
								var activity_xml="<activity>" +
											"<data_id>"+data_id+"</data_id>" +
											"<tablename>purchase_order_items</tablename>" +
											"<link_to>form43</link_to>" +
											"<title>Updated</title>" +
											"<notes>Ordererd product "+name+" for purchase</notes>" +
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
							$("#modal27").dialog("close");
						});
					}
					else
					{
						var make_data="<product_master>" +
								"<make></make>" +
								"<name>"+product_name+"</name>" +
								"</product_master>";
						set_my_value(make_data,fmake);
						
						var price_data="<product_instances>" +
								"<cost_price></cost_price>" +
								"<product_name>"+product_name+"</product_name>" +
								"</product_instances>";
						set_my_value(price_data,fprice);
						

						$(form).on("submit",function(event)
						{
							event.preventDefault();
							if(is_create_access('form43'))
							{
								var name=fname.value;
								var make=fmake.value;
								var price=fprice.value;
								var quantity=fquantity.value;
								var supplier=fsupplier.value;
								var data_id=get_new_key();
								var last_updated=get_my_time();

								var purchase_order_data="<purchase_orders>" +
										"<id></id>" +
										"<supplier>"+supplier+"</supplier>" +
										"<status>draft</status>" +
										"</purchase_orders>";
								fetch_requested_data('',purchase_order_data,function(purchase_orders)
								{
									var order_id="";
									for(var i in purchase_orders)
									{
										order_id=purchase_orders[i].id;
										break;
									}
									if(purchase_orders.length===0)
									{
										order_id=get_new_key();
										var data_xml="<purchase_orders>" +
													"<id>"+order_id+"</id>" +
													"<order_date>"+get_my_time()+"</order_date>" +
													"<supplier>"+supplier+"</supplier>" +
													"<status>draft</status>" +
													"<last_updated>"+last_updated+"</last_updated>" +
													"</purchase_orders>";
										var activity_xml="<activity>" +
													"<data_id>"+order_id+"</data_id>" +
													"<tablename>purchase_orders</tablename>" +
													"<link_to>form43</link_to>" +
													"<title>Created</title>" +
													"<notes>Purchase order for supplier "+supplier+" for purchase</notes>" +
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
									}
									var data_xml="<purchase_order_items>" +
												"<id>"+data_id+"</id>" +
												"<product_name>"+name+"</product_name>" +
												"<make>"+make+"</make>" +
												"<price>"+price+"</price>" +
												"<quantity>"+quantity+"</quantity>" +
												"<order_id>"+order_id+"</order_id>" +
												"<last_updated>"+last_updated+"</last_updated>" +
												"</purchase_order_items>";
									var activity_xml="<activity>" +
												"<data_id>"+data_id+"</data_id>" +
												"<tablename>purchase_order_items</tablename>" +
												"<link_to>form43</link_to>" +
												"<title>Ordered</title>" +
												"<notes>Product "+name+" for purchase</notes>" +
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
								
							}
							else
							{
								$("#modal2").dialog("open");
							}
							$("#modal27").dialog("close");
						});
				
					}
					fsupplier.value=last_orders[j].supplier;
					break;
				}
			});
			break;
		}
	});
	
	$("#modal27").dialog("open");
}

/**
 * @modalNo 28
 * @modal Payment Details
 */
function modal28_action(payment_id)
{
	var form=document.getElementById('modal28_form');
	
	var fsupplier=form.elements[1];
	var ftotal=form.elements[2];
	var fpaid=form.elements[3];
	var fdue_date=form.elements[4];
	var fmode=form.elements[5];
	var fstatus=form.elements[6];
	
	$(fdue_date).datepicker();
	
	set_static_value_list('payments','status',fstatus);
	set_static_value_list('payments','mode',fmode);
	
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form53'))
		{
			var supplier=fsupplier.value;
			var total=ftotal.value;
			var paid=fpaid.value;
			var due_date=get_raw_time(fdue_date.value);
			var mode=fmode.value;
			var status=fstatus.value;
			var last_updated=get_my_time();
			var data_xml="<payments>" +
						"<id>"+payment_id+"</id>" +
						"<acc_name>"+supplier+"</acc_name>" +
						"<type>paid</type>" +
						"<total_amount>"+total+"</total_amount>" +
						"<paid_amount>"+paid+"</paid_amount>" +
						"<status>"+status+"</status>" +
						"<date>"+get_my_time()+"</date>" +
						"<due_date>"+due_date+"</due_date>" +
						"<mode>"+mode+"</mode>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</payments>";
			var activity_xml="<activity>" +
						"<data_id>"+payment_id+"</data_id>" +
						"<tablename>payments</tablename>" +
						"<link_to>form11</link_to>" +
						"<title>Updated</title>" +
						"<notes>Payment of "+paid+" to "+supplier+"</notes>" +
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
		$("#modal28").dialog("close");
	});
	
	var payments_data="<payments>" +
			"<id>"+payment_id+"</id>" +
			"<acc_name></acc_name>" +
			"<type>paid</type>" +
			"<total_amount></total_amount>" +
			"<paid_amount></paid_amount>" +
			"<status></status>" +
			"<due_date></due_date>" +
			"<mode></mode>" +
			"</payments>";
	fetch_requested_data('',payments_data,function(payments)
	{
		for(var k in payments)
		{
			fsupplier.value=payments[k].acc_name;
			ftotal.value=payments[k].total_amount;
			fpaid.value=payments[k].paid_amount;
			fdue_date.value=get_my_past_date(payments[k].due_date);
			fmode.value=payments[k].mode;
			fstatus.value=payments[k].status;
			break;
		}
		$("#modal28").dialog("open");
	});		
	
}

/**
 * @modal Update secondary payment details
 * @param button
 */
function modal29_action(button)
{
	var form=document.getElementById('modal29_form');
	
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);
	var fdetail=father_form.elements[5];
	var fmode=father_form.elements[7];
	var fdate=father_form.elements[8];
	var fdue_date=father_form.elements[9];
	var fbill_id=father_form.elements[10];
		
	form.elements[1].value=fbill_id.value;
	form.elements[2].value=get_my_past_date(fdate.value);
	form.elements[3].value=fmode.value;
	form.elements[4].value=get_my_past_date(fdue_date.value);
	
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var detail_string="Bill Id: " +form.elements[1].value+
				"\nMode of payment: " +form.elements[3].value+
				"\nDue Date: "+form.elements[4].value+
				"\nDate closed: "+form.elements[2].value;

		fdetail.value=detail_string;
		fmode.value=form.elements[3].value;
		fdate.value=get_raw_time(form.elements[2].value);
		fdue_date.value=get_raw_time(form.elements[4].value);
		fbill_id.value=form.elements[1].value;	
	
		$("#modal29").dialog("close");
	});
	
	$("#modal29").dialog("open");
}


function modal31_action()
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
