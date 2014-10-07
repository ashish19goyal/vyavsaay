/**
 * @modalNo 8
 * @modal Offer details
 * @param button
 */
function modal8_action(button)
{
	var form=document.getElementById('modal8_form');
	
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);
	
	var offer_type=form.elements[1];
	offer_type.value=father_form.elements[1].value;

	var product_name=form.elements[2];
	var batch=form.elements[3];
	var service=form.elements[4];
	var multiplicity=form.elements[5];
	var criteria_type=form.elements[6];
	var criteria_amount=form.elements[7];
	var criteria_quantity=form.elements[8];
	var result_type=form.elements[9];
	var discount_percent=form.elements[10];
	var discount_amount=form.elements[11];
	var quantity_percent=form.elements[12];
	var quantity_amount=form.elements[13];
	var free_product_name=form.elements[14];
	var free_quantity=form.elements[15];
	var save_button=form.elements[16];
	
	set_static_value_list('offers','offer_type',offer_type);
	
	$(offer_type).on('blur',function(event)
	{
		$(product_name).parent().hide();
		$(batch).parent().hide();
		$(service).parent().hide();
		$(multiplicity).parent().hide();
		$(criteria_type).parent().hide();
		$(criteria_amount).parent().hide();
		$(criteria_quantity).parent().hide();
		
		if(offer_type.value=='product')
		{
			var product_data="<product_master>" +
					"<name></name>" +
					"</product_master>";
			set_my_value_list(product_data,product_name);
			
			$(product_name).on('blur',function(event)
			{
				var batch_data="<product_master>" +
						"<batch></batch>" +
						"</product_master>";
				set_my_value_list(batch_data,batch);
			});
			
			set_my_value_list(product_data,free_product_name);
			
			$(product_name).parent().show();
			$(batch).parent().show();
			$(multiplicity).parent().show();
			$(criteria_type).parent().show();
		}
		else if(offer_type.value=='service')
		{
			var service_data="<services>" +
					"<name></name>" +
					"</services>";
			set_my_value_list(service_data,service);
			
			$(service).parent().show();
			$(multiplicity).parent().show();
			$(criteria_type).parent().show();
		}
		else if(offer_type.value=='bill')
		{
			$(multiplicity).parent().show();
			criteria_type.value='min amount crossed';
			$(criteria_amount).parent().show();
		}
	});
	
	$(criteria_type).on('blur',function(event)
	{
		$(criteria_amount).parent().hide();
		$(criteria_quantity).parent().hide();
		if(criteria_type.value=='min amount crossed')
		{
			$(criteria_amount).parent().show();
		}
		else if(criteria_type.value=='min quantity crossed')
		{
			$(criteria_quantity).parent().show();
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
		if(result_type.value=='discount')
		{
			$(discount_percent).parent().show();
			$(discount_amount).parent().show();
		}
		else if(result_type.value=='quantity addition')
		{
			$(quantity_percent).parent().show();
			$(quantity_amount).parent().show();
		}
		else if(result_type.value=='product free')
		{
			$(free_product_name).parent().show();
			$(free_quantity).parent().show();
		}
	});
	
	$(save_button).on("click",function(event)
	{
		if(is_create_access('form35') || is_update_access('form35'))
		{
			var offer_name=father_form.elements[0].value;
			var type_value=offer_type.value;
			var product_value=product_name.value;
			var batch_value=batch.value;
			var service_value=service.value;
			var multiplicity_value=multiplicity.value;
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
			var end_date_value=get_raw_time(father_form.elements[2].value);	
			var status_value=father_form.elements[4].value;
			var data_id=father_form.elements[5].value;
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
			
			father_form.elements[3].value=offer_detail_value;
			
			var table='offers';
			var data_xml="<"+table+">" +
						"<id>"+data_id+"</id>" +
						"<offer_name>"+offer_name+"</offer_name>" +
						"<offer_type>"+type_value+"</offer_type>" +
						"<product_name>"+product_value+"</product_name>" +
						"<batch>"+batch_value+"</batch>" +
						"<service>"+service_value+"</service>" +
						"<multiplicity>"+multiplicity_value+"</multiplicity>" +
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
						"<end_date>"+end_date_value+"</end_date>" +
						"<offer_detail>"+offer_detail_value+"</offer_detail>" +
						"<status>"+status_value+"</status>" +
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
			for(var i=0;i<5;i++)
			{
				$(father_form.elements[i]).attr('readonly','readonly');
			}
		}
		else
		{
			$("#modal2").dialog("open");
		}
		$("#modal8").dialog("close");
	});
	
	set_static_value_list('offers','multiplicity',multiplicity);
	set_static_value_list('offers','criteria_type',criteria_type);
	set_static_value_list('offers','result_type',result_type);
	
	$("#modal8").dialog("open");
	
	$(product_name).parent().hide();
	$(batch).parent().hide();
	$(service).parent().hide();
	$(multiplicity).parent().hide();
	$(criteria_type).parent().hide();
	$(criteria_amount).parent().hide();
	$(criteria_quantity).parent().hide();
	$(discount_percent).parent().hide();
	$(discount_amount).parent().hide();
	$(quantity_percent).parent().hide();
	$(quantity_amount).parent().hide();
	$(free_product_name).parent().hide();
	$(free_quantity).parent().hide();
	$(offer_type).blur();
}

/**
 * @modalNo 9
 * @modal Add asset valuations
 * @param button
 */
function modal9_action(button)
{
	
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
	var fdata_id=get_new_key();
	var save_button=form.elements[10];
		
	$(save_button).on("click",function(event)
	{
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
			var table='customers';
			var data_xml="<"+table+">" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"<phone>"+phone+"</phone>" +
						"<email>"+email+"</email>" +
						"<notes>"+notes+"</notes>" +
						"<acc_name>"+name+" ("+phone+")</acc_name>" +
						"<status>active</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</"+table+">";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>"+table+"</tablename>" +
						"<link_to>form30</link_to>" +
						"<title>Saved</title>" +
						"<notes>Added customer "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var address_xml="<address>" +
						"<id>"+address_id+"</id>" +
						"<address>"+address+"</address>" +
						"<street>"+street+"</street>" +
						"<city>"+city+"</city>" +
						"<state>"+state+"</state>" +
						"<country>"+country+"</country>" +
						"<status>pending analysis</status>" +
						"<acc_type>customer</acc_type>" +
						"<acc_name>"+name+" ("+phone+")</acc_name>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</address>";
			var add_activity_xml="<activity>" +
						"<data_id>"+address_id+"</data_id>" +
						"<tablename>address</tablename>" +
						"<link_to>form30</link_to>" +
						"<title>Saved</title>" +
						"<notes>Saved address for customer "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_write_row(data_xml,activity_xml);
				server_write_row(address_xml,add_activity_xml);
			}
			else
			{
				local_write_row(data_xml,activity_xml);
				local_write_row(address_xml,add_activity_xml);
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
	var ftype=form.elements[2];
	var fdescription=form.elements[3];
	var fdata_id=get_new_key();
	var save_button=form.elements[4];
		
	$(save_button).on("click",function(event)
	{
		var name=fname.value;
		var type=ftype.value;
		var description=fdescription.value;
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var table='accounts';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<acc_name>"+name+"</acc_name>" +
					"<type>"+type+"</type>" +
					"<description>"+description+"</description>" +
					"<balance>0</balance>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to></link_to>" +
					"<title>Saved</title>" +
					"<notes>Added new account "+name+"</notes>" +
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
	var fdata_id=get_new_key();
	var save_button=form.elements[10];
		
	$(save_button).on("click",function(event)
	{
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
			var table='suppliers';
			var data_xml="<"+table+">" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"<phone>"+phone+"</phone>" +
						"<email>"+email+"</email>" +
						"<notes>"+notes+"</notes>" +
						"<acc_name>"+name+" ("+phone+")</acc_name>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</"+table+">";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>"+table+"</tablename>" +
						"<link_to>form40</link_to>" +
						"<title>Saved</title>" +
						"<notes>Added supplier "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var address_xml="<address>" +
						"<id>"+address_id+"</id>" +
						"<address>"+address+"</address>" +
						"<street>"+street+"</street>" +
						"<city>"+city+"</city>" +
						"<state>"+state+"</state>" +
						"<country>"+country+"</country>" +
						"<status>pending analysis</status>" +
						"<acc_type>supplier</acc_type>" +
						"<acc_name>"+name+" ("+phone+")</acc_name>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</address>";
			var add_activity_xml="<activity>" +
						"<data_id>"+address_id+"</data_id>" +
						"<tablename>address</tablename>" +
						"<link_to>form40</link_to>" +
						"<title>Saved</title>" +
						"<notes>Saved address for supplier "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_write_row(data_xml,activity_xml);
				server_write_row(address_xml,add_activity_xml);
			}
			else
			{
				local_write_row(data_xml,activity_xml);
				local_write_row(address_xml,add_activity_xml);
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
	
	var ftype=form.elements[1];
	var fmake=form.elements[2];
	var fname=form.elements[3];
	var fpictureinfo=form.elements[4];
	var fpicture=form.elements[5];
	var fprice=form.elements[6];
	var fdescription=form.elements[7];
	var fdata_id=get_new_key();
	var save_button=form.elements[8];
	
	var type_data="<product_master>" +
		"<product_type></product_type>" +
		"</product_master>";
	var make_data="<product_master>" +
		"<make></make>" +
		"</product_master>";
	
	set_my_value_list(type_data,ftype);
	set_my_value_list(make_data,fmake);
	
	fpicture.addEventListener('change',function(evt)
	{
		select_picture(evt,fpictureinfo,function(dataURL)
		{
			fpictureinfo.innerHTML="<div class='figure'><img src='"+dataURL+"'/></div>";			
		});
	},false);
	
	$(save_button).on("click",function(event)
	{
		if(is_create_access('form35') || is_update_access('form35'))
		{
			var product_type=ftype.value;
			var make=fmake.value;
			var name=fname.value;
			var data_id=fdata_id;
			var pic_id=get_new_key();
			var url=$(fpictureinfo).find('div').find('img').attr('src');
			var est_price=fprice.value;
			var description=fdescription.value;
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
	var save_button=form.elements[6];
	
	var accounts_data="<accounts>" +
		"<acc_name></acc_name>" +
		"</accounts>";
	
	set_my_value_list(accounts_data,fprovider);
	set_static_value_list('feedback','type',ftype);
	set_static_value_list('feedback','rating',frating);
	$(fdate).datepicker();
	$(fdate).val(get_my_date());
		
	$(save_button).on("click",function(event)
	{
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
					"<title>Saved</title>" +
					"<notes>Added feedback from "+provider+"</notes>" +
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
		
		$("#modal15").dialog("close");
	});
	
	$("#modal15").dialog("open");
}

/**
 * @modalNo 16
 * @modal Edit address
 * @param button
 */
function modal16_action(button,acc_type,address_id)
{
	var form=document.getElementById('modal16_form');
	
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);
	var fname=father_form.elements[0];
	var fphone=father_form.elements[1];
	var faddress_detail=father_form.elements[3];
	
	var faddress=form.elements[1];
	var fstreet=form.elements[2];
	var fcity=form.elements[3];
	var fstate=form.elements[4];
	var fcountry=form.elements[5];
	var save_button=form.elements[6];
		
	$(save_button).on("click",function(event)
	{
		var name=fname.value;
		var phone=fphone.value;
		var address=faddress.value;
		var street=fstreet.value;
		var city=fcity.value;
		var state=fstate.value;
		var country=fcountry.value;
		
		var address_detail=address+", "+street+", "+city+", "+state+", "+country;
		faddress_detail.value=address_detail;
		var last_updated=get_my_time();
		var data_xml="<address>" +
					"<id>"+address_id+"</id>" +
					"<address>"+address+"</address>" +
					"<street>"+street+"</street>" +
					"<city>"+city+"</city>" +
					"<state>"+state+"</state>" +
					"<country>"+country+"</country>" +
					"<status>pending analysis</status>" +
					"<acc_type>"+acc_type+"</acc_type>" +
					"<acc_name>"+name+" ("+phone+")</acc_name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</address>";
		var activity_xml="<activity>" +
					"<data_id>"+address_id+"</data_id>" +
					"<tablename>address</tablename>" +
					"<link_to></link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved address for "+name+"</notes>" +
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
	
		$("#modal16").dialog("close");
	});
	
	$("#modal16").dialog("open");
}

/**
 * @modalNo 17
 * @modal Add staff details
 * @param button
 */
function modal17_action(button)
{
	var form=document.getElementById('modal17_form');
	
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);
	var fdetail=father_form.elements[4];
	var fdata_id=father_form.elements[6];
	
	var fdate=form.elements[1];
	var fqual=form.elements[2];
	var fskill=form.elements[3];
	var fcomp=form.elements[4];
	var frate=form.elements[5];
	var fhours=form.elements[6];
	var fpto=form.elements[7];
	var save_button=form.elements[8];
		
	$(save_button).on("click",function(event)
	{
		var data_id=fdata_id.value;
		var date=fdate.value;
		var qual=fqual.value;
		var skill=fskill.value;
		var comp=fcomp.value;
		var rate=frate.value;
		var hours=fhours.value;
		var pto=fpto.value;
		
		var detail="";
		fdetail.value=detail;
		var last_updated=get_my_time();
		var data_xml="<staff>" +
					"<id>"+data_id+"</id>" +
					"<joining_date>"+date+"</joining_date>" +
					"<qualification>"+qual+"</qualification>" +
					"<skills>"+skill+"</skills>" +
					"<fixed_comp>"+comp+"</fixed_comp>" +
					"<variable_comp_rate>"+rate+"</variable_comp_rate>" +
					"<allowed_pto>"+pto+"</allowed_pto>" +
					"<monthly_hours>"+hours+"</monthly_hours>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</staff>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>staff</tablename>" +
					"<link_to>form8</link_to>" +
					"<title>Saved</title>" +
					"<notes>Saved details for staff "+name+"</notes>" +
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
	
		$("#modal17").dialog("close");
	});
	
	$("#modal17").dialog("open");
}
