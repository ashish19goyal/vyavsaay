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
	
	$(form).on("submit",function(event)
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
						"<offer_name unique='yes'>"+offer_name+"</offer_name>" +
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
	var form=document.getElementById('modal9_form');
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);
	var fname=father_form.elements[0];
	var father_value=father_form.elements[4];
	var fdate=form.elements[1];
	var fvalue=form.elements[2];
	
	$(fdate).datepicker();
	fdate.value=get_my_date();
	
	$(form).on("submit",function(event)
	{
		var name=fname.value;
		var date=get_raw_time(fdate.value);
		var value=fvalue.value;
		var data_id=get_new_key();
		var last_updated=get_my_time();
		
		father_value.value=value;
		
		var table='asset_valuations';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<asset_name>"+name+"</asset_name>" +
					"<date_valuated>"+date+"</date_valuated>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form5</link_to>" +
					"<title>Saved</title>" +
					"<notes>Update value of asset "+name+"</notes>" +
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
		$("#modal9").dialog("close");
	});
	
	$("#modal9").dialog("open");
}

/**
 * @modalNo 10
 * @modal Update asset maintenace
 * @param button
 */
function modal10_action(button)
{
	var form=document.getElementById('modal10_form');
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);
	var fname=father_form.elements[0];
	var father_activity=father_form.elements[5];
	var fdate=form.elements[1];
	var fmaintenance=form.elements[2];
	
	$(fdate).datepicker();
	fdate.value=get_my_date();
	
	$(form).on("submit",function(event)
	{
		var name=fname.value;
		var date=get_raw_time(fdate.value);
		var maintenance=fmaintenance.value;
		var data_id=get_new_key();
		var last_updated=get_my_time();
		
		father_activity.value=maintenance;
		
		var table='asset_maintenance';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<asset_name>"+name+"</asset_name>" +
					"<date_maintained>"+date+"</date_maintained>" +
					"<activity>"+maintenace+"</activity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form5</link_to>" +
					"<title>Saved</title>" +
					"<notes>Update maintenance activity for asset "+name+"</notes>" +
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
	var ftype=form.elements[2];
	var fdescription=form.elements[3];
	var fdata_id=get_new_key();
		
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var name=fname.value;
		var type=ftype.value;
		var description=fdescription.value;
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var table='accounts';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<acc_name unique='yes'>"+name+"</acc_name>" +
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
						"<tablename>"+table+"</tablename>" +
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
	var ftags=form.elements[3];
	var fcategories_out=form.elements[4];
	var fcategories=form.elements[5];
	var fpictureinfo=form.elements[6];
	var fpicture=form.elements[7];
	var ftaxable=form.elements[8];
	var funit=form.elements[11];
	var fmanufactured=form.elements[17];
	var freq_product_out=form.elements[18];
	var freq_product=form.elements[19];
	var freq_service_out=form.elements[20];
	var freq_service=form.elements[21];
	var freq_task_out=form.elements[22];
	var freq_task=form.elements[23];
	var fcross_product_out=form.elements[24];
	var fcross_product=form.elements[25];
	var fcross_service_out=form.elements[26];
	var fcross_service=form.elements[27];
	
	var make_data="<product_master>" +
		"<make></make>" +
		"</product_master>";
	set_my_filter(make_data,fmake);
	
	var categories_data="<categories>" +
			"<category></category>" +
			"</categories>";
	set_my_multiple_filter(categories_data,fcategories,fcategories_out);
	
	fpicture.addEventListener('change',function(evt)
	{
		select_picture(evt,fpictureinfo,function(dataURL)
		{
			fpictureinfo.innerHTML="<div class='figure'><img src='"+dataURL+"'/></div>";			
		});
	},false);
	
	set_static_value_list('product_master','taxable',ftaxable);
	set_static_value_list('product_master','unit',funit);
	set_static_value_list('product_master','manufactured',fmanufactured);
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_multiple_list(product_data,freq_product,freq_product_out);
	set_my_multiple_list(product_data,fcross_product,fcross_product_out);

	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	set_my_multiple_list(service_data,freq_service,freq_service_out);
	set_my_multiple_list(service_data,fcross_service,fcross_service_out);
	
	var task_data="<task_type>" +
			"<name></name>" +
			"</task_type>";
	set_my_multiple_list(task_data,freq_task,freq_task_out);
	
	$(form).on("submit",function(event)
	{
		if(is_create_access('form39') || is_update_access('form39'))
		{
			var name=form.elements[1].value;
			var name_data="<product_master>" +
					"<name>"+name+"</name>" +
					"</product_master>";
			get_single_column_data(function(unique_product)
			{
				if(unique_product.length===0)
				{
					var make=form.elements[2].value;
					var tags=form.elements[3].value;
					var categories=form.elements[4].value.split(",");
					var taxable=form.elements[8].value;
					var tax=form.elements[9].value;
					var price=form.elements[10].value;
					var unit=form.elements[11].value;
					var weight=form.elements[12].value;
					var length=form.elements[13].value;
					var width=form.elements[14].value;
					var height=form.elements[15].value;
					var description=form.elements[16].value;
					var manufactured=form.elements[17].value;
					var req_products=form.elements[18].value.split(",");
					var req_services=form.elements[20].value.split(",");
					var req_tasks=form.elements[22].value.split(",");
					var cross_products=form.elements[24].value.split(",");
					var cross_services=form.elements[26].value.split(",");
					var data_id=get_new_key();
					var pic_id=get_new_key();
					var url=$(fpictureinfo).find('div').find('img').attr('src');
					var last_updated=get_my_time();
					var table='product_master';
					var data_xml="<"+table+">" +
								"<id>"+data_id+"</id>" +
								"<make>"+make+"</make>" +
								"<name>"+name+"</name>" +
								"<est_price>"+price+"</est_price>" +
								"<description>"+description+"</description>" +
								"<taxable>"+taxable+"</taxable>" +
								"<unit>"+unit+"</unit>" +
								"<tax>"+tax+"</tax>" +
								"<weight>"+weight+"</weight>" +
								"<length>"+length+"</length>" +
								"<width>"+width+"</width>" +
								"<height>"+height+"</height>" +
								"<manufactured>"+manufactured+"</manufactured>" +
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
					if(is_online())
					{
						server_write_row(data_xml,activity_xml);
					}
					else
					{
						local_write_row(data_xml,activity_xml);
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
							server_write_row(pic_xml,pic_activity_xml);
						}
						else
						{
							local_write_row(pic_xml,pic_activity_xml);
						}	
					}
					categories.forEach(function(category)
					{
						if(category!="")
						{
							var data_xml="<categories>" +
									"<id>"+get_new_key()+"</id>" +
									"<name>"+name+"</name>" +
									"<type>product</type>" +
									"<category>"+category+"</category>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</categories>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					req_products.forEach(function(req_product)
					{
						if(req_product!="")
						{
							var data_xml="<pre_requisites>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>product</type>" +
										"<requisite_type>product</requisite_type>" +
										"<requisite_name>"+req_product+"</requisite_name>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</pre_requisites>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					req_services.forEach(function(req_service)
					{
						if(req_service!="")
						{
							var data_xml="<pre_requisites>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>product</type>" +
										"<requisite_type>service</requisite_type>" +
										"<requisite_name>"+req_service+"</requisite_name>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</pre_requisites>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					req_tasks.forEach(function(req_task)
					{
						if(req_task!="")
						{
							var data_xml="<pre_requisites>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>product</type>" +
										"<requisite_type>task</requisite_type>" +
										"<requisite_name>"+req_task+"</requisite_name>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</pre_requisites>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					cross_products.forEach(function(cross_product)
					{
						if(cross_product!="")
						{
							var data_xml="<cross_sells>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>product</type>" +
										"<cross_type>product</cross_type>" +
										"<cross_name>"+cross_product+"</cross_type>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</cross_sells>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					cross_services.forEach(function(cross_service)
					{
						if(cross_service!="")
						{
							var data_xml="<cross_sells>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>product</type>" +
										"<cross_type>service</cross_type>" +
										"<cross_name>"+cross_service+"</cross_type>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</cross_sells>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});

				}
				else
				{
					$("#modal5").dialog("open");
				}
			},name_data);
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
					"<title>Saved</title>" +
					"<notes>Added feedback from "+provider+"</notes>" +
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
						"<tablename>"+table+"</tablename>" +
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
	
	$(fjoining).datepicker();
	
	$(form).on("submit",function(event)
	{
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
		faddress_status.value=address_status;
		fjoining.value=date;
		fqual.value=qual;
		fskills.value=skill;
		ffixed_comp.value=comp;
		fvar_comp.value=rate;
		fpto.value=pto;	
		fhours.value=work_hours;	
		
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
	var ftags=form.elements[3];
	var fcategories_out=form.elements[4];
	var fcategories=form.elements[5];
	var fpictureinfo=form.elements[6];
	var fpicture=form.elements[7];
	var ftaxable=form.elements[8];
	var funit=form.elements[11];
	var fmanufactured=form.elements[17];
	var freq_product_out=form.elements[18];
	var freq_product=form.elements[19];
	var freq_service_out=form.elements[20];
	var freq_service=form.elements[21];
	var freq_task_out=form.elements[22];
	var freq_task=form.elements[23];
	var fcross_product_out=form.elements[24];
	var fcross_product=form.elements[25];
	var fcross_service_out=form.elements[26];
	var fcross_service=form.elements[27];
	
		
	/////---------initializing all the values-------///////////
	var form_id=$(button).attr('form');
	var copy_form=document.getElementById(form_id);
	var copy_name=copy_form.elements[0].value;
	
	var copy_master_data="<product_master>" +
			"<id></id>" +
			"<name>"+copy_name+"</name>" +
			"<description></description>" +
			"<make></make>" +
			"<est_price></est_price>" +
			"<manufactured></manufactured>" +
			"<taxable></taxable>" +
			"<tax></tax>" +
			"<unit></unit>" +
			"<weight></weight>" +
			"<height></height>" +
			"<length></length>" +
			"<width></width>" +
			"<tags></tags>" +
			"</product_master>";
	fetch_requested_data('form39',copy_master_data,function(results)
	{
		results.forEach(function(result)
		{
			//console.log(result);
			form.elements[2].value=result.make;
			form.elements[3].value=result.tags;
			form.elements[8].value=result.taxable;
			form.elements[9].value=result.tax;
			form.elements[10].value=result.est_price;
			form.elements[11].value=result.unit;
			form.elements[12].value=result.weight;
			form.elements[13].value=result.length;
			form.elements[14].value=result.width;
			form.elements[15].value=result.height;
			form.elements[16].value=result.description;
			form.elements[17].value=result.manufactured;
			
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
	
	var copy_categories_data="<categories>" +
			"<name>"+copy_name+"</name>" +
			"<type>product</type>" +
			"<category></category>" +
			"</categories>";
	fetch_requested_data('form39',copy_categories_data,function(results)
	{
		var value="";
		results.forEach(function(result)
		{
			value+=result.category+",";
		});
		form.elements[4].value=value;
	});

	var copy_requisite_data="<pre_requisites>" +
			"<name>"+copy_name+"</name>" +
			"<type>product</type>" +
			"<requisite_type></requisite_type>" +
			"<requisite_name></requisite_name>" +
			"</pre_requisites>";
	fetch_requested_data('form39',copy_requisite_data,function(results)
	{
		var pvalue="";
		var svalue="";
		var tvalue="";
		results.forEach(function(result)
		{
			if(result.requisite_type=="product")
				pvalue+=result.requisite_name+",";
			else if(result.requisite_type=="service")
				svalue+=result.requisite_name+",";
			else if(result.requisite_type=="task")
				tvalue+=result.requisite_name+",";
		});
		form.elements[18].value=pvalue;
		form.elements[20].value=svalue;
		form.elements[22].value=tvalue;
	});

	var copy_cross_data="<cross_sells>" +
		"<name>"+copy_name+"</name>" +
		"<type>product</type>" +
		"<cross_type></cross_type>" +
		"<cross_name></cross_name>" +
		"</cross_sells>";
	fetch_requested_data('form39',copy_cross_data,function(results)
	{
		var pvalue="";
		var svalue="";
		results.forEach(function(result)
		{
			if(result.cross_type=="product")
				pvalue+=result.cross_name+",";
			else if(result.cross_type=="service")
				svalue+=result.cross_name+",";
		});
		form.elements[24].value=pvalue;
		form.elements[26].value=svalue;
	});

	////---------initialization complete------///////////////
	
	
	////-----setting editable dropdowns etc----------/////////////
	var make_data="<product_master>" +
		"<make></make>" +
		"</product_master>";
	set_my_filter(make_data,fmake);
	
	var categories_data="<categories>" +
			"<category></category>" +
			"</categories>";
	set_my_multiple_filter(categories_data,fcategories,fcategories_out);
	
	fpicture.addEventListener('change',function(evt)
	{
		select_picture(evt,fpictureinfo,function(dataURL)
		{
			fpictureinfo.innerHTML="<div class='figure'><img src='"+dataURL+"'/></div>";			
		});
	},false);
	
	set_static_value_list('product_master','taxable',ftaxable);
	set_static_value_list('product_master','unit',funit);
	set_static_value_list('product_master','manufactured',fmanufactured);
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_multiple_list(product_data,freq_product,freq_product_out);
	set_my_multiple_list(product_data,fcross_product,fcross_product_out);
	
	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	set_my_multiple_list(service_data,freq_service,freq_service_out);
	set_my_multiple_list(service_data,fcross_service,fcross_service_out);
	
	var task_data="<task_type>" +
			"<name></name>" +
			"</task_type>";
	set_my_multiple_list(task_data,freq_task,freq_task_out);

///////-------------set editable finished-------/////////////

	
	$(form).on("submit",function(event)
	{
		if(is_create_access('form39') || is_update_access('form39'))
		{
			var name=form.elements[1].value;
			var name_data="<product_master>" +
					"<name>"+name+"</name>" +
					"</product_master>";
			get_single_column_data(function(unique_product)
			{
				if(unique_product.length===0)
				{
					var make=form.elements[2].value;
					var tags=form.elements[3].value;
					var categories=form.elements[4].value.split(",");
					var taxable=form.elements[8].value;
					var tax=form.elements[9].value;
					var price=form.elements[10].value;
					var unit=form.elements[11].value;
					var weight=form.elements[12].value;
					var length=form.elements[13].value;
					var width=form.elements[14].value;
					var height=form.elements[15].value;
					var description=form.elements[16].value;
					var manufactured=form.elements[17].value;
					var req_products=form.elements[18].value.split(",");
					var req_services=form.elements[20].value.split(",");
					var req_tasks=form.elements[22].value.split(",");
					var cross_products=form.elements[24].value.split(",");
					var cross_services=form.elements[26].value.split(",");
					var data_id=get_new_key();
					var pic_id=get_new_key();
					var url=$(fpictureinfo).find('div').find('img').attr('src');
					var last_updated=get_my_time();
					var table='product_master';
					var data_xml="<"+table+">" +
								"<id>"+data_id+"</id>" +
								"<make>"+make+"</make>" +
								"<name>"+name+"</name>" +
								"<est_price>"+price+"</est_price>" +
								"<description>"+description+"</description>" +
								"<taxable>"+taxable+"</taxable>" +
								"<unit>"+unit+"</unit>" +
								"<tax>"+tax+"</tax>" +
								"<weight>"+weight+"</weight>" +
								"<length>"+length+"</length>" +
								"<width>"+width+"</width>" +
								"<height>"+height+"</height>" +
								"<manufactured>"+manufactured+"</manufactured>" +
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
					if(is_online())
					{
						server_write_row(data_xml,activity_xml);
					}
					else
					{
						local_write_row(data_xml,activity_xml);
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
							server_write_row(pic_xml,pic_activity_xml);
						}
						else
						{
							local_write_row(pic_xml,pic_activity_xml);
						}	
					}
					categories.forEach(function(category)
					{
						if(category!="")
						{
							var data_xml="<categories>" +
									"<id>"+get_new_key()+"</id>" +
									"<name>"+name+"</name>" +
									"<type>product</type>" +
									"<category>"+category+"</category>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</categories>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					req_products.forEach(function(req_product)
					{
						if(req_product!="")
						{
							var data_xml="<pre_requisites>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>product</type>" +
										"<requisite_type>product</requisite_type>" +
										"<requisite_name>"+req_product+"</requisite_name>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</pre_requisites>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					req_services.forEach(function(req_service)
					{
						if(req_service!="")
						{
							var data_xml="<pre_requisites>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>product</type>" +
										"<requisite_type>service</requisite_type>" +
										"<requisite_name>"+req_service+"</requisite_name>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</pre_requisites>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					req_tasks.forEach(function(req_task)
					{
						if(req_task!="")
						{
							var data_xml="<pre_requisites>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>product</type>" +
										"<requisite_type>task</requisite_type>" +
										"<requisite_name>"+req_task+"</requisite_name>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</pre_requisites>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					cross_products.forEach(function(cross_product)
					{
						if(cross_product!="")
						{
							var data_xml="<cross_sells>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>product</type>" +
										"<cross_type>product</cross_type>" +
										"<cross_name>"+cross_product+"</cross_type>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</cross_sells>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					cross_services.forEach(function(cross_service)
					{
						if(cross_service!="")
						{
							var data_xml="<cross_sells>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>product</type>" +
										"<cross_type>service</cross_type>" +
										"<cross_name>"+cross_service+"</cross_type>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</cross_sells>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});

				}
				else
				{
					$("#modal5").dialog("open");
				}
			},name_data);
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
	var fwarranty=form.elements[3];
	var ftags=form.elements[4];
	var fcategories_out=form.elements[5];
	var fcategories=form.elements[6];
	var ftaxable=form.elements[7];
	var freq_product_out=form.elements[11];
	var freq_product=form.elements[12];
	var freq_service_out=form.elements[13];
	var freq_service=form.elements[14];
	var freq_task_out=form.elements[15];
	var freq_task=form.elements[16];
	var freq_asset_out=form.elements[17];
	var freq_asset=form.elements[18];
	var fcross_product_out=form.elements[19];
	var fcross_product=form.elements[20];
	var fcross_service_out=form.elements[21];
	var fcross_service=form.elements[22];
	
	var categories_data="<categories>" +
			"<category></category>" +
			"</categories>";
	set_my_multiple_filter(categories_data,fcategories,fcategories_out);
	
	set_static_value_list('services','taxable',ftaxable);
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_multiple_list(product_data,freq_product,freq_product_out);
	set_my_multiple_list(product_data,fcross_product,fcross_product_out);

	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	set_my_multiple_list(service_data,freq_service,freq_service_out);
	set_my_multiple_list(service_data,fcross_service,fcross_service_out);
	
	var task_data="<task_type>" +
			"<name></name>" +
			"</task_type>";
	set_my_multiple_list(task_data,freq_task,freq_task_out);
	
	var asset_data="<assets>" +
		"<name></name>" +
		"</assets>";
	set_my_multiple_list(asset_data,freq_asset,freq_asset_out);

	$(form).on("submit",function(event)
	{
		if(is_create_access('form57') || is_update_access('form57'))
		{
			var name=form.elements[1].value;
			var name_data="<services>" +
					"<name>"+name+"</name>" +
					"</services>";
			get_single_column_data(function(unique_product)
			{
				if(unique_product.length===0)
				{
					
					var description=form.elements[2].value;
					var warranty=form.elements[3].value;
					var tags=form.elements[4].value;
					var categories=form.elements[5].value.split(",");
					var taxable=form.elements[7].value;
					var tax=form.elements[8].value;
					var price=form.elements[9].value;
					var duration=form.elements[10].value;
					var req_products=form.elements[11].value.split(",");
					var req_services=form.elements[13].value.split(",");
					var req_tasks=form.elements[15].value.split(",");
					var req_assets=form.elements[17].value.split(",");
					var cross_products=form.elements[19].value.split(",");
					var cross_services=form.elements[21].value.split(",");
					var data_id=get_new_key();
					var last_updated=get_my_time();
					var table='services';
					var data_xml="<"+table+">" +
								"<id>"+data_id+"</id>" +
								"<name>"+name+"</name>" +
								"<price>"+price+"</price>" +
								"<description>"+description+"</description>" +
								"<taxable>"+taxable+"</taxable>" +
								"<tax>"+tax+"</tax>" +
								"<tags>"+tags+"</tags>" +
								"<duration>"+duration+"</duration>" +
								"<warranty>"+warranty+"</warranty>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</"+table+">";	
					var activity_xml="<activity>" +
								"<data_id>"+data_id+"</data_id>" +
								"<tablename>"+table+"</tablename>" +
								"<link_to>form57</link_to>" +
								"<title>Saved</title>" +
								"<notes>Added new service "+name+"</notes>" +
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

					categories.forEach(function(category)
					{
						if(category!="")
						{
							var data_xml="<categories>" +
									"<id>"+get_new_key()+"</id>" +
									"<name>"+name+"</name>" +
									"<type>service</type>" +
									"<category>"+category+"</category>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</categories>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					req_products.forEach(function(req_product)
					{
						if(req_product!="")
						{
							var data_xml="<pre_requisites>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>service</type>" +
										"<requisite_type>product</requisite_type>" +
										"<requisite_name>"+req_product+"</requisite_name>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</pre_requisites>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					req_services.forEach(function(req_service)
					{
						if(req_service!="")
						{
							var data_xml="<pre_requisites>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>service</type>" +
										"<requisite_type>service</requisite_type>" +
										"<requisite_name>"+req_service+"</requisite_name>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</pre_requisites>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					req_tasks.forEach(function(req_task)
					{
						if(req_task!="")
						{
							var data_xml="<pre_requisites>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>service</type>" +
										"<requisite_type>task</requisite_type>" +
										"<requisite_name>"+req_task+"</requisite_name>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</pre_requisites>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					req_assets.forEach(function(req_asset)
					{
						if(req_asset!="")
						{
							var data_xml="<pre_requisites>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>service</type>" +
										"<requisite_type>asset</requisite_type>" +
										"<requisite_name>"+req_asset+"</requisite_name>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</pre_requisites>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					cross_products.forEach(function(cross_product)
					{
						if(cross_product!="")
						{
							var data_xml="<cross_sells>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>service</type>" +
										"<cross_type>product</cross_type>" +
										"<cross_name>"+cross_product+"</cross_type>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</cross_sells>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					cross_services.forEach(function(cross_service)
					{
						if(cross_service!="")
						{
							var data_xml="<cross_sells>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>service</type>" +
										"<cross_type>service</cross_type>" +
										"<cross_name>"+cross_service+"</cross_type>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</cross_sells>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});

				}
				else
				{
					$("#modal5").dialog("open");
				}
			},name_data);
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
	var fwarranty=form.elements[3];
	var ftags=form.elements[4];
	var fcategories_out=form.elements[5];
	var fcategories=form.elements[6];
	var ftaxable=form.elements[7];
	var freq_product_out=form.elements[11];
	var freq_product=form.elements[12];
	var freq_service_out=form.elements[13];
	var freq_service=form.elements[14];
	var freq_task_out=form.elements[15];
	var freq_task=form.elements[16];
	var freq_asset_out=form.elements[17];
	var freq_asset=form.elements[18];
	var fcross_product_out=form.elements[19];
	var fcross_product=form.elements[20];
	var fcross_service_out=form.elements[21];
	var fcross_service=form.elements[22];
	
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
			"<tags></tags>" +
			"<duration></duration>" +
			"<warranty></warranty>" +
			"</services>";
	fetch_requested_data('form57',copy_master_data,function(results)
	{
		results.forEach(function(result)
		{
			form.elements[2].value=result.description;
			form.elements[3].value=result.warranty;
			form.elements[4].value=result.tags;
			form.elements[7].value=result.taxable;
			form.elements[8].value=result.tax;
			form.elements[9].value=result.price;
			form.elements[10].value=result.duration;
		});
	});
	
	var copy_categories_data="<categories>" +
			"<name>"+copy_name+"</name>" +
			"<type>service</type>" +
			"<category></category>" +
			"</categories>";
	fetch_requested_data('form57',copy_categories_data,function(results)
	{
		var value="";
		results.forEach(function(result)
		{
			value+=result.category+",";
		});
		form.elements[5].value=value;
	});

	var copy_requisite_data="<pre_requisites>" +
			"<name>"+copy_name+"</name>" +
			"<type>service</type>" +
			"<requisite_type></requisite_type>" +
			"<requisite_name></requisite_name>" +
			"</pre_requisites>";
	fetch_requested_data('form57',copy_requisite_data,function(results)
	{
		var pvalue="";
		var svalue="";
		var tvalue="";
		var avalue="";
		
		results.forEach(function(result)
		{
			if(result.requisite_type=="product")
				pvalue+=result.requisite_name+",";
			else if(result.requisite_type=="service")
				svalue+=result.requisite_name+",";
			else if(result.requisite_type=="task")
				tvalue+=result.requisite_name+",";
			else if(result.requisite_type=="asset")
				avalue+=result.requisite_name+",";
		});
		form.elements[11].value=pvalue;
		form.elements[13].value=svalue;
		form.elements[15].value=tvalue;
		form.elements[17].value=avalue;
	});

	var copy_cross_data="<cross_sells>" +
		"<name>"+copy_name+"</name>" +
		"<type>service</type>" +
		"<cross_type></cross_type>" +
		"<cross_name></cross_name>" +
		"</cross_sells>";
	fetch_requested_data('form57',copy_cross_data,function(results)
	{
		var pvalue="";
		var svalue="";
		results.forEach(function(result)
		{
			if(result.cross_type=="product")
				pvalue+=result.cross_name+",";
			else if(result.cross_type=="service")
				svalue+=result.cross_name+",";
		});
		form.elements[19].value=pvalue;
		form.elements[21].value=svalue;
	});

	////////------end of initialization-----------///////////
	
	var categories_data="<categories>" +
			"<category></category>" +
			"</categories>";
	set_my_multiple_filter(categories_data,fcategories,fcategories_out);
	
	set_static_value_list('services','taxable',ftaxable);
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_multiple_list(product_data,freq_product,freq_product_out);
	set_my_multiple_list(product_data,fcross_product,fcross_product_out);

	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	set_my_multiple_list(service_data,freq_service,freq_service_out);
	set_my_multiple_list(service_data,fcross_service,fcross_service_out);
	
	var task_data="<task_type>" +
			"<name></name>" +
			"</task_type>";
	set_my_multiple_list(task_data,freq_task,freq_task_out);
	
	var asset_data="<assets>" +
		"<name></name>" +
		"</assets>";
	set_my_multiple_list(asset_data,freq_asset,freq_asset_out);

	$(form).on("submit",function(event)
	{
		if(is_create_access('form57') || is_update_access('form57'))
		{
			var name=form.elements[1].value;
			var name_data="<services>" +
					"<name>"+name+"</name>" +
					"</services>";
			get_single_column_data(function(unique_product)
			{
				if(unique_product.length===0)
				{
					var description=form.elements[2].value;
					var warranty=form.elements[3].value;
					var tags=form.elements[4].value;
					var categories=form.elements[5].value.split(",");
					var taxable=form.elements[7].value;
					var tax=form.elements[8].value;
					var price=form.elements[9].value;
					var duration=form.elements[10].value;
					var req_products=form.elements[11].value.split(",");
					var req_services=form.elements[13].value.split(",");
					var req_tasks=form.elements[15].value.split(",");
					var req_assets=form.elements[17].value.split(",");
					var cross_products=form.elements[19].value.split(",");
					var cross_services=form.elements[21].value.split(",");
					var data_id=get_new_key();
					var last_updated=get_my_time();
					var table='services';
					var data_xml="<"+table+">" +
								"<id>"+data_id+"</id>" +
								"<name>"+name+"</name>" +
								"<price>"+price+"</price>" +
								"<description>"+description+"</description>" +
								"<taxable>"+taxable+"</taxable>" +
								"<tax>"+tax+"</tax>" +
								"<tags>"+tags+"</tags>" +
								"<duration>"+duration+"</duration>" +
								"<warranty>"+warranty+"</warranty>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</"+table+">";	
					var activity_xml="<activity>" +
								"<data_id>"+data_id+"</data_id>" +
								"<tablename>"+table+"</tablename>" +
								"<link_to>form57</link_to>" +
								"<title>Saved</title>" +
								"<notes>Added new service "+name+"</notes>" +
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

					categories.forEach(function(category)
					{
						if(category!="")
						{
							var data_xml="<categories>" +
									"<id>"+get_new_key()+"</id>" +
									"<name>"+name+"</name>" +
									"<type>service</type>" +
									"<category>"+category+"</category>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</categories>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					req_products.forEach(function(req_product)
					{
						if(req_product!="")
						{
							var data_xml="<pre_requisites>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>service</type>" +
										"<requisite_type>product</requisite_type>" +
										"<requisite_name>"+req_product+"</requisite_name>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</pre_requisites>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					req_services.forEach(function(req_service)
					{
						if(req_service!="")
						{
							var data_xml="<pre_requisites>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>service</type>" +
										"<requisite_type>service</requisite_type>" +
										"<requisite_name>"+req_service+"</requisite_name>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</pre_requisites>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					req_tasks.forEach(function(req_task)
					{
						if(req_task!="")
						{
							var data_xml="<pre_requisites>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>service</type>" +
										"<requisite_type>task</requisite_type>" +
										"<requisite_name>"+req_task+"</requisite_name>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</pre_requisites>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					req_assets.forEach(function(req_asset)
					{
						if(req_asset!="")
						{
							var data_xml="<pre_requisites>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>service</type>" +
										"<requisite_type>asset</requisite_type>" +
										"<requisite_name>"+req_asset+"</requisite_name>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</pre_requisites>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					cross_products.forEach(function(cross_product)
					{
						if(cross_product!="")
						{
							var data_xml="<cross_sells>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>service</type>" +
										"<cross_type>product</cross_type>" +
										"<cross_name>"+cross_product+"</cross_type>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</cross_sells>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});
					cross_services.forEach(function(cross_service)
					{
						if(cross_service!="")
						{
							var data_xml="<cross_sells>" +
										"<id>"+get_new_key()+"</id>" +
										"<name>"+name+"</name>" +
										"<type>service</type>" +
										"<cross_type>service</cross_type>" +
										"<cross_name>"+cross_service+"</cross_type>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</cross_sells>";
							if(is_online())
							{
								server_write_simple(data_xml);
							}
							else
							{
								local_write_simple(data_xml);
							}
						}
					});

				}
				else
				{
					$("#modal5").dialog("open");
				}
			},name_data);
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
        var fileType = /csv/;

        if(file.type.match(fileType)!=null)
        {
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
        }
        else
        {
            selected_file.value = "File not supported!";
        }
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
		
	$(form).on("submit",function(event)
	{
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
		
	$(form).on("submit",function(event)
	{
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

