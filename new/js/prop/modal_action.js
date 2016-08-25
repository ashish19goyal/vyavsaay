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

	$(all_batch).off('click');
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

	$(offer_type).off('blur');
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
			$(product_name).off('blur');
			$(product_name).on('blur',function(event)
			{
				var batch_data="<product_instances>" +
						"<batch></batch>" +
						"<product_name exact='yes'>"+product_name.value+"</product_name>" +
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

	$(criteria_type).off('blur');
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

	$(result_type).off('blur');
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

	$(form).off("submit");
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
			$("#modal2_link").click();
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
 * @modal Add document
 * @param button
 */
function modal9_action()
{
	var form=document.getElementById('modal9_form');

	var fid=form.elements[1];
	var fname=form.elements[2];
	var docInfo=document.getElementById('modal9_url');
	var fpicture=form.elements[3];

	var id_data="<service_requests>" +
		"<id></id>" +
		"</service_requests>";
	set_my_value_list(id_data,fid);

	fpicture.addEventListener('change',function(evt)
	{
		select_document(evt,function(dataURL)
		{
			docInfo.setAttribute('href',dataURL);
		});
	},false);

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form39'))
		{
			var target_id=fid.value;
			var doc_name=fname.value;
			var data_id=get_my_time();
			var url=$(docInfo).attr('href');
			var last_updated=data_id;

			if(url!="")
			{
				var pic_xml="<documents>" +
							"<id>"+data_id+"</id>" +
							"<url>"+url+"</url>" +
							"<doc_type>service request</doc_type>" +
							"<doc_name>"+doc_name+"</doc_name>"+
							"<target_id>"+target_id+"</target_id>" +
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
			$("#modal2_link").click();
		}
		$("#modal9").dialog("close");
	});

	$("#modal9").dialog("open");
}


/**
 * @modalNo 10
 * @modal Add new asset
 * @param button
 */
function modal10_action(func)
{
	var form=document.getElementById('modal10_form');
	var fname=form.elements[1];
	var ftype=form.elements[2];
	var fdescription=form.elements[3];

	////adding attribute fields/////
	var attribute_label=document.getElementById('modal10_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"<status></status>" +
			"<value></value>"+
			"<object exact='yes'>asset</object>" +
			"</mandatory_attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}
				else
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});

	set_static_value_list('assets','type',ftype);

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var name=fname.value;
		var type=ftype.value;
		var description=fdescription.value;
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var data_xml="<assets>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"</name>" +
					"<type>"+type+"</type>" +
					"<description>"+description+"</description>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</assets>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>assets</tablename>" +
					"<link_to>form5</link_to>" +
					"<title>Added</title>" +
					"<notes>Asset "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		create_row_func(data_xml,activity_xml,func);

		var id=get_new_key();
		$("#modal10_attributes").find('input, select').each(function()
		{
			id++;
			var value=$(this).val();
			var attribute=$(this).attr('name');
			if(value!="")
			{
				var attribute_xml="<attributes>" +
						"<id>"+id+"</id>" +
						"<name>"+name+"</name>" +
						"<type>asset</type>" +
						"<attribute>"+attribute+"</attribute>" +
						"<value>"+value+"</value>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</attributes>";
				create_simple(attribute_xml);
			}
		});

		$("#modal10").dialog("close");
	});

	$("#modal10").dialog("open");
}

/**
 * @modalNo 11
 * @modal Add new customer
 * @param button
 */
function modal11_action(func)
{
	var form=document.getElementById('modal11_form');

	var fname=form.elements['name'];
	var fphone=form.elements['phone'];
	var femail=form.elements['email'];
	var faddress=form.elements['address'];

	///////////////////////////
	fname.value="";
	fphone.value="";
	femail.value="";
	faddress.value="";

	var attribute_label=document.getElementById('modal11_attributes');
	attribute_label.innerHTML="";
	var attributes_data={data_store:'mandatory_attributes',
								indexes:[{index:'attribute'},{index:'status'},{index:'value'},{index:'object',exact:'customer'}]};

	read_json_rows('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required';
				var attr_label=document.createElement('div');
				attr_label.setAttribute('class','row');
				if(attribute.value=="")
				{
					attr_label.innerHTML="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><input type='text' "+required+" name='"+attribute.attribute+"'></div>";
				}
				else
				{
					var values_array=attribute.value.split(";");
					var content="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><select "+required+" name='"+attribute.attribute+"'>";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select></div>";
					attr_label.innerHTML=content;
				}
				attribute_label.appendChild(attr_label);
			}
		});
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form30'))
		{
			var name=fname.value;
			var phone=fphone.value;
			var acc_name=name+" ("+phone+")";
			var email=femail.value;
			var address=faddress.value;

			name = name.replace(/â/g,'');
			name = name.replace(/&/g, "and");

			address = address.replace(/â/g,'');
			address = address.replace(/&/g, "and");

			var data_id=get_new_key();
			var last_updated=get_my_time();

			var data_json={data_store:'customers',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'phone',value:phone},
	 					{index:'email',value:email},
	 					{index:'address',value:address},
	 					{index:'acc_name',value:acc_name,unique:'yes'},
	 					{index:'status',value:'active'},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'New customer '+name,link_to:'form30'}};

			var account_json={data_store:'accounts',
	 				data:[{index:'id',value:data_id},
	 					{index:'type',value:'customer'},
	 					{index:'username',value:''},
	 					{index:'acc_name',value:acc_name,unique:'yes'},
	 					{index:'status',value:'active'},
	 					{index:'last_updated',value:last_updated}]};

			create_json(data_json,func);
			create_json(account_json);

			var id=get_new_key();
			$("#modal11_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				var attribute=$(this).attr('name');
				if(value!="")
				{
					var attribute_json={data_store:'attributes',
	 				data:[{index:'id',value:id},
	 					{index:'name',value:acc_name},
	 					{index:'type',value:'customer'},
	 					{index:'attribute',value:attribute},
	 					{index:'value',value:value},
	 					{index:'last_updated',value:last_updated}]};
					create_json(attribute_json);
				}
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal11_link").click();
}

/**
 * @modalNo 12
 * @modal Add new account
 * @param button
 */
function modal12_action(func)
{
	var form=document.getElementById('modal12_form');

	var fname=form.elements['name'];
	var fdescription=form.elements['desc'];
	var fdata_id=get_new_key();

	////adding attribute fields///////
	var attribute_label=document.getElementById('modal12_attributes');
	attribute_label.innerHTML="";
	var attributes_data={data_store:'mandatory_attributes',
								indexes:[{index:'attribute'},{index:'status'},{index:'value'},{index:'object',exact:'account'}]};
	read_json_rows('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required';
				var attr_label=document.createElement('div');
				attr_label.setAttribute('class','row');
				if(attribute.value=="")
				{
					attr_label.innerHTML="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><input type='text' "+required+" name='"+attribute.attribute+"'></div>";
				}
				else
				{
					var values_array=attribute.value.split(";");
					var content="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><select "+required+" name='"+attribute.attribute+"'>";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select></div>";
					attr_label.innerHTML=content;
				}
				attribute_label.appendChild(attr_label);
			}
		});
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var name=fname.value;
		var type='financial';
		var description=fdescription.value;
		var data_id=get_new_key();
		var last_updated=get_my_time();

		var account_json={data_store:'accounts',
	 				data:[{index:'id',value:data_id},
	 					{index:'type',value:type},
	 					{index:'username',value:''},
	 					{index:'description',value:description},
	 					{index:'acc_name',value:name,unique:'yes'},
	 					{index:'status',value:'active'},
	 					{index:'last_updated',value:last_updated}],
	 				log:'yes',
	 				log_data:{title:'Added',notes:'New account '+name,link_to:'form71'}};

		create_json(account_json,func);

		var id=get_new_key();
		$("#modal12_attributes").find('input, select').each(function()
		{
			id++;
			var value=$(this).val();
			var attribute=$(this).attr('name');
			if(value!="")
			{
				var attribute_json={data_store:'attributes',
	 				data:[{index:'id',value:id},
	 					{index:'name',value:acc_name},
	 					{index:'type',value:'account'},
	 					{index:'attribute',value:attribute},
	 					{index:'value',value:value},
	 					{index:'last_updated',value:last_updated}]};
				create_json(attribute_json);
			}
		});

		$(form).find(".close").click();
	});

	$("#modal12_link").click();
}

/**
 * @modalNo 13
 * @modal Add new supplier
 * @param button
 */
function modal13_action(func)
{
	var form=document.getElementById('modal13_form');

	var fname=form.elements['name'];
	var fphone=form.elements['phone'];
	var femail=form.elements['email'];
	var faddress=form.elements['address'];

	///////////////////////////
	fname.value="";
	fphone.value="";
	femail.value="";
	faddress.value="";

	var attribute_label=document.getElementById('modal13_attributes');
	attribute_label.innerHTML="";
	var attributes_data={data_store:'mandatory_attributes',
								indexes:[{index:'attribute'},{index:'status'},{index:'value'},{index:'object',exact:'supplier'}]};

	read_json_rows('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required';
				var attr_label=document.createElement('div');
				attr_label.setAttribute('class','row');
				if(attribute.value=="")
				{
					attr_label.innerHTML="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><input type='text' "+required+" name='"+attribute.attribute+"'></div>";
				}
				else
				{
					var values_array=attribute.value.split(";");
					var content="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><select "+required+" name='"+attribute.attribute+"'>";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select></div>";
					attr_label.innerHTML=content;
				}
				attribute_label.appendChild(attr_label);
			}
		});
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form30'))
		{
			var name=fname.value;
			var phone=fphone.value;
			var acc_name=name+" ("+phone+")";
			var email=femail.value;
			var address=faddress.value;

			name = name.replace(/â/g,'');
			name = name.replace(/&/g, "and");

			address = address.replace(/â/g,'');
			address = address.replace(/&/g, "and");

			var data_id=get_new_key();
			var last_updated=get_my_time();

			var data_json={data_store:'suppliers',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'phone',value:phone},
	 					{index:'email',value:email},
	 					{index:'address',value:address},
	 					{index:'acc_name',value:acc_name,unique:'yes'},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'New supplier '+name,link_to:'form40'}};

			var account_json={data_store:'accounts',
	 				data:[{index:'id',value:data_id},
	 					{index:'type',value:'supplier'},
	 					{index:'username',value:''},
	 					{index:'acc_name',value:acc_name,unique:'yes'},
	 					{index:'status',value:'active'},
	 					{index:'last_updated',value:last_updated}]};

			create_json(data_json,func);
			create_json(account_json);

			var id=get_new_key();
			$("#modal13_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				var attribute=$(this).attr('name');
				if(value!="")
				{
					var attribute_json={data_store:'attributes',
	 				data:[{index:'id',value:id},
	 					{index:'name',value:acc_name},
	 					{index:'type',value:'supplier'},
	 					{index:'attribute',value:attribute},
	 					{index:'value',value:value},
	 					{index:'last_updated',value:last_updated}]};
					create_json(attribute_json);
				}
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal13_link").click();
}


/**
 * @modalNo 14
 * @modal Add new product
 * @param button
 */
function modal14_action(func)
{
	var form=document.getElementById('modal14_form');

	var fname=form.elements['name'];
	var fmake=form.elements['make'];
	var fdescription=form.elements['desc'];
	var fbarcode=form.elements['barcode'];
	var auto_generate=form.elements['generate'];

	fbarcode.value=get_my_time();
	auto_generate.checked=true;

	$(auto_generate).off('click');
	$(auto_generate).on('click',function(event)
	{
		if(auto_generate.checked)
		{
			fbarcode.value=get_my_time();
		}
		else
		{
			fbarcode.value="";
		}
	});

	var make_data={data_store:'product_master',return_column:'make'};
	set_my_filter_json(make_data,fmake);

	////adding attribute fields///////
	var attribute_label=document.getElementById('modal14_attributes');
	attribute_label.innerHTML="";
	var attributes_data={data_store:'mandatory_attributes',
                        indexes:[{index:'attribute'},{index:'status'},{index:'value'},{index:'object',exact:'product'}]};
	read_json_rows('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
            if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required';
				var attr_label=document.createElement('div');
				attr_label.setAttribute('class','row');
				if(attribute.value=="")
				{
					attr_label.innerHTML="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><input type='text' "+required+" name='"+attribute.attribute+"'></div>";
				}
				else
				{
					var values_array=attribute.value.split(";");
					var content="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><select "+required+" name='"+attribute.attribute+"'>";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select></div>";
					attr_label.innerHTML=content;
				}
				attribute_label.appendChild(attr_label);
			}
		});
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form39'))
		{
			var name=form.elements['name'].value;
			var make=form.elements['make'].value;
			var description=form.elements['desc'].value;

			var indexes=name.split(/[\s,]+/);
			var description_indexes=description.split(/[\s,]+/);
			var make_indexes=make.split(/[\s,]+/);
			var new_indexes=indexes.concat(description_indexes,make_indexes);
			var anew_indexes=vUtil.arrayUnique(new_indexes);
			var index_string=JSON.stringify(anew_indexes);

			var tax=form.elements['tax'].value;
			var data_id=get_new_key();
			var barcode=form.elements['barcode'].value;
			var last_updated=get_my_time();

      var data_json={data_store:'product_master',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'make',value:make},
	 					{index:'description',value:description},
	 					{index:'tax',value:tax},
	 					{index:'bar_code',value:barcode,unique:'yes'},
						{index:'indexes',value:index_string},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Product '+name+' to inventory',link_to:'form39'}};
			create_json(data_json,func);

			var id=get_new_key();
      $("#modal14_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				var attribute=$(this).attr('name');
				if(value!="")
				{
					var attribute_json={data_store:'attributes',
	 				data:[{index:'id',value:id},
	 					{index:'name',value:name},
	 					{index:'type',value:'product'},
	 					{index:'attribute',value:attribute},
	 					{index:'value',value:value},
	 					{index:'last_updated',value:last_updated}]};
					create_json(attribute_json);
				}
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal14_link").click();
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
	fdate.value=vTime.date();

	$(form).off("submit");
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
		create_row(data_xml,activity_xml);

		$("#modal15").dialog("close");
	});

	$("#modal15").dialog("open");
}


/**
 * @modalNo 16
 * @modal Add new staff
 * @param button
 */
function modal16_action(func)
{
	var form=document.getElementById('modal16_form');

	var fname=form.elements['name'];
	var fphone=form.elements['phone'];
	var femail=form.elements['email'];
	var faddress=form.elements['address'];

	///////////////////////////
	fname.value="";
	fphone.value="";
	femail.value="";
	faddress.value="";

	var attribute_label=document.getElementById('modal16_attributes');
	attribute_label.innerHTML="";
	var attributes_data={data_store:'mandatory_attributes',
								indexes:[{index:'attribute'},{index:'status'},{index:'value'},{index:'object',exact:'staff'}]};

	read_json_rows('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required';
				var attr_label=document.createElement('div');
				attr_label.setAttribute('class','row');
				if(attribute.value=="")
				{
					attr_label.innerHTML="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><input type='text' "+required+" name='"+attribute.attribute+"'></div>";
				}
				else
				{
					var values_array=attribute.value.split(";");
					var content="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><select "+required+" name='"+attribute.attribute+"'>";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select></div>";
					attr_label.innerHTML=content;
				}
				attribute_label.appendChild(attr_label);
			}
		});
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form8'))
		{
			var name=fname.value;
			var phone=fphone.value;
			var acc_name=name+" ("+phone+")";
			var email=femail.value;
			var address=faddress.value;

			name = name.replace(/â/g,'');
			name = name.replace(/&/g, "and");

			address = address.replace(/â/g,'');
			address = address.replace(/&/g, "and");

			var data_id=get_new_key();
			var last_updated=get_my_time();

			var data_json={data_store:'staff',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'phone',value:phone},
	 					{index:'email',value:email},
	 					{index:'address',value:address},
	 					{index:'status',value:'active'},
	 					{index:'acc_name',value:acc_name,unique:'yes'},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'New staff '+name,link_to:'form8'}};

			var account_json={data_store:'accounts',
	 				data:[{index:'id',value:data_id},
	 					{index:'type',value:'staff'},
	 					{index:'username',value:''},
	 					{index:'acc_name',value:acc_name,unique:'yes'},
	 					{index:'status',value:'active'},
	 					{index:'last_updated',value:last_updated}]};

			create_json(data_json,func);
			create_json(account_json);

			var id=get_new_key();
			$("#modal16_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				var attribute=$(this).attr('name');
				if(value!="")
				{
					var attribute_json={data_store:'attributes',
	 				data:[{index:'id',value:id},
	 					{index:'name',value:acc_name},
	 					{index:'type',value:'staff'},
	 					{index:'attribute',value:attribute},
	 					{index:'value',value:value},
	 					{index:'last_updated',value:last_updated}]};
					create_json(attribute_json);
				}
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal16_link").click();
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
	var faddress_detail=father_form.elements[3];
	var fdata_id=father_form.elements[5];
	var data_id=father_form.elements[5].value;

	var faddress=father_form.elements[8];
	var fpincode=father_form.elements[9];
	var fcity=father_form.elements[10];
	var fstate=father_form.elements[11];
	var fcountry=father_form.elements[12];
	var faddress_status=father_form.elements[13];

	form.elements[1].value=faddress.value;
	form.elements[2].value=fpincode.value;
	form.elements[3].value=fcity.value;
	form.elements[4].value=fstate.value;
	form.elements[5].value=fcountry.value;

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var address=form.elements[1].value;
		var pincode=form.elements[2].value;
		var city=form.elements[3].value;
		var state=form.elements[4].value;
		var country=form.elements[5].value;

		faddress_detail.value=address+", "+pincode+", "+city+", "+state+", "+country;
		faddress.value=address;
		fpincode.value=pincode;
		fcity.value=city;
		fstate.value=state;
		fcountry.value=country;
		faddress_status.value='pending analysis';

		var data_xml="<staff>" +
				"<id>"+data_id+"</id>" +
				"<address>"+address+"</address>" +
				"<pincode>"+pincode+"</pincode>" +
				"<city>"+city+"</city>" +
				"<state>"+state+"</state>" +
				"<country>"+country+"</country>" +
				"<address_status>pending analysis</address_status>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</staff>";

		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}

		$("#modal17").dialog("close");
	});

	$("#modal17").dialog("open");
}

/**
 * @modalNo 18
 * @modal Add new task type
 * @param button
 */
function modal18_action(func)
{
	var form=document.getElementById('modal18_form');

	var fname=form.elements[1];
	var fdescription=form.elements[2];
	var fest_hours=form.elements[3];

	fname.value='';
	fdescription.value='';
	fest_hours.value='';

	////adding attribute fields///////
	var attribute_label=document.getElementById('modal18_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"<status></status>" +
			"<value></value>"+
			"<object exact='yes'>task</object>" +
			"</mandatory_attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}
				else
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});


	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var name=form.elements[1].value;
		var description=form.elements[2].value;
		var est_hours=form.elements[3].value;
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var data_xml="<task_type>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+name+"</name>" +
					"<description>"+description+"</description>" +
					"<est_hours>"+est_hours+"</est_hours>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_type>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>task_type</tablename>" +
					"<link_to>form79</link_to>" +
					"<title>Added</title>" +
					"<notes>Task type "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_create_row_func(data_xml,activity_xml,func);
		}
		else
		{
			local_create_row_func(data_xml,activity_xml,func);
		}

		var id=get_new_key();
		$("#modal18_attributes").find('input, select').each(function()
		{
			id++;
			var value=$(this).val();
			var attribute=$(this).attr('name');
			if(value!="")
			{
				var attribute_xml="<attributes>" +
						"<id>"+id+"</id>" +
						"<name>"+name+"</name>" +
						"<type>task</type>" +
						"<attribute>"+attribute+"</attribute>" +
						"<value>"+value+"</value>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</attributes>";
				if(is_online())
				{
					server_create_simple(attribute_xml);
				}
				else
				{
					local_create_simple(attribute_xml);
				}
			}
		});

		$("#modal18").dialog("close");
		//$("#modal18").dialog("destroy");
	});

	$("#modal18").dialog("open");
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

	var fbarcode=form.elements[7];
	var auto_generate=form.elements[8];

	$(auto_generate).off('click');
	$(auto_generate).on('click',function(event)
	{
		if(auto_generate.checked)
		{
			fbarcode.value=get_my_time();
		}
		else
		{
			fbarcode.value="";
		}
	});

	/////---------initializing all the values-------///////////
	var form_id=$(button).attr('form');
	var copy_form=document.getElementById(form_id);
	var copy_name=copy_form.elements[0].value;

	var copy_master_data="<product_master>" +
			"<id></id>" +
			"<name exact='yes'>"+copy_name+"</name>" +
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
					"<target_id exact='yes'>"+result.id+"</target_id>" +
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


	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form39'))
		{
			var name=form.elements[1].value;
			var make=form.elements[2].value;
			var description=form.elements[3].value;

			var indexes=name.split(/[\s,]+/);
      var description_indexes=description.split(/[\s,]+/);
      var make_indexes=make.split(/[\s,]+/);
      var new_indexes=indexes.concat(description_indexes,make_indexes);
      var anew_indexes=vUtil.arrayUnique(new_indexes);
      var index_string=JSON.stringify(anew_indexes);

			var tax=form.elements[6].value;
			var data_id=get_new_key();
			var pic_id=get_new_key();
			var url=$(fpictureinfo).find('div').find('img').attr('src');
			var barcode=form.elements[7].value;
			var last_updated=get_my_time();
			var data_xml="<product_master>" +
						"<id>"+data_id+"</id>" +
						"<make>"+make+"</make>" +
						"<name>"+name+"</name>" +
						"<description>"+description+"</description>" +
						"<tax>"+tax+"</tax>" +
						"<bar_code unique='yes'>"+barcode+"</bar_code>" +
						"<indexes>"+index_string+"</indexes>"+
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
					"<name exact='yes'>"+copy_name+"</name>" +
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
					"<name exact='yes'>"+copy_name+"</name>" +
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
					"<name exact='yes'>"+copy_name+"</name>" +
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
			$("#modal2_link").click();
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
 function modal20_action(func)
 {
 	var form=document.getElementById("modal20_form");

 	////adding attribute fields///////
 	var attribute_label=document.getElementById('modal20_attributes');
 	attribute_label.innerHTML="";
 	var attributes_data={data_store:'mandatory_attributes',
                         indexes:[{index:'attribute'},
                                 {index:'status'},
                                 {index:'value'},
                                 {index:'object',exact:'service'}]};
 	read_json_rows('',attributes_data,function(attributes)
 	{
        attributes.forEach(function(attribute)
 		{
 			if(attribute.status!='inactive')
 			{
 				var required="";
 				if(attribute.status=='required')
 					required='required';
 				var attr_label=document.createElement('div');
 				attr_label.setAttribute('class','row');
 				if(attribute.value=="")
 				{
 					attr_label.innerHTML="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
 					     			"<div class='col-sm-12 col-md-8'><input type='text' "+required+" name='"+attribute.attribute+"'></div>";
 				}
 				else
 				{
 					var values_array=attribute.value.split(";");
 					var content="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
 					     			"<div class='col-sm-12 col-md-8'><select "+required+" name='"+attribute.attribute+"'>";
 					values_array.forEach(function(fvalue)
 					{
 						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
 					});
 					content+="</select></div>";
 					attr_label.innerHTML=content;
 				}
 				attribute_label.appendChild(attr_label);
 			}
 		});
		$('#modal20').formcontrol();
 	});


 	$(form).off('submit');
 	$(form).on('submit',function(event)
 	{
 		event.preventDefault();
 		if(is_create_access('form57'))
 		{
			var name=form.elements['name'].value;
			var description=form.elements['desc'].value;
			var tax=form.elements['tax'].value;
			var price=form.elements['price'].value;
			var data_id=get_new_key();
 			var last_updated=get_my_time();
 			var data_json={data_store:'services',
 	 				log:'yes',
 	 				data:[{index:'id',value:data_id},
 	 					{index:'name',value:name,unique:'yes'},
 	 					{index:'description',value:description},
						{index:'price',value:price},
						{index:'tax',value:tax},
						{index:'last_updated',value:last_updated}],
 	 		log_data:{title:'Added',notes:'Service '+name,link_to:'form57'}};

 			create_json(data_json,func);

 			var id=get_new_key();
 			$("#modal20_attributes").find('input, select').each(function()
 			{
 				id++;
 				var value=$(this).val();
 				if(value!="")
 				{
 					var attribute=$(this).attr('name');
 					var attribute_json={data_store:'attributes',
 	 				data:[{index:'id',value:id},
 	 					{index:'name',value:name},
 	 					{index:'type',value:'service'},
                         {index:'attribute',value:attribute},
                         {index:'value',value:value},
 	 					{index:'last_updated',value:last_updated}]};

 					create_json(attribute_json);
 				}
 			});
 		}
 		else
 		{
 			$("#modal2_link").click();
 		}
 		$(form).find('.close').click();
 	});

 	$("#modal20_link").click();
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
			"<name exact='yes'>"+copy_name+"</name>" +
			"<description></description>" +
			"<price></price>" +
			"<taxable></taxable>" +
			"<tax></tax>" +
			"</services>";
	fetch_requested_data('form57',copy_master_data,function(results)
	{
		results.forEach(function(result)
		{
			form.elements[2].value=result.description;
			form.elements[3].value=result.tax;
			form.elements[4].value=result.price;
		});
	});

	////////------end of initialization-----------///////////

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form57'))
		{
			var name=form.elements[1].value;
			var description=form.elements[2].value;
			var tax=form.elements[3].value;
			var price=form.elements[4].value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<services>" +
						"<id>"+data_id+"</id>" +
						"<name unique='yes'>"+name+"</name>" +
						"<price>"+price+"</price>" +
						"<description>"+description+"</description>" +
						"<taxable>"+taxable+"</taxable>" +
						"<tax>"+tax+"</tax>" +
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
					"<name exact='yes'>"+copy_name+"</name>" +
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
					"<name exact='yes'>"+copy_name+"</name>" +
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
					"<name exact='yes'>"+copy_name+"</name>" +
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
			$("#modal2_link").click();
		}
		$("#modal21").dialog("close");
	});
	$("#modal21").dialog("open");
}

/**
 * @modalNo 22
 * @modal Add new batch
 */
function modal22_action(func)
{
	var form=document.getElementById('modal22_form');

	var fname=form.elements['name'];
	var fbatch=form.elements['batch'];
	var fmanufacture=form.elements['manu_date'];
	var fexpiry=form.elements['ex_date'];
	var fmrp=form.elements['mrp'];
	var fcost=form.elements['pprice'];
	var fsale_price=form.elements['sprice'];

	$(fexpiry).datepicker();
	$(fmanufacture).datepicker();

	var name_data={data_store:'product_master',return_column:'name'};
	set_my_value_list_json(name_data,fname);

	////adding sale price fields for all billing types///////
	var billing_type_data={data_store:'bill_types',return_column:'name',
                          indexes:[{index:'status',exact:'active'}]};
	read_json_single_column(billing_type_data,function(bill_types)
	{
		var billing_label=document.getElementById('modal22_billings');
		billing_label.innerHTML="";
		bill_types.forEach(function(bill_type)
		{
            var attr_label=document.createElement('div');
            attr_label.setAttribute('class','row');
            attr_label.innerHTML="<div class='col-sm-12 col-md-4'>"+bill_type+" sale price"+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><input type='number' step='any' id='"+bill_type+"' required></div>";

			billing_label.appendChild(attr_label);
		});
	});
	////////////////////////////////////////////////

	////auto setting sale price fields/////////
	$(fsale_price).off('blur');
	$(fsale_price).on('blur',function(event)
	{
		var sale_price=fsale_price.value;
		$("#modal22_billings").find('input').each(function()
		{
			if($(this).val()=="")
			{
				$(this).val(sale_price);
			}
		});
	});
	////////////////////


	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form1'))
		{
			var name=fname.value;
			var batch=fbatch.value;

			batch = batch.replace(/â/g,'');
			batch = batch.replace(/&/g, "and");

			var manu_date=get_raw_time(fmanufacture.value);
			var expiry=get_raw_time(fexpiry.value);
			var cost=fcost.value;
			var mrp=fmrp.value;
			var sale_price=fsale_price.value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var data_json={data_store:'product_instances',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'product_name',value:name,uniqueWith:['batch']},
	 					{index:'batch',value:batch},
	 					{index:'expiry',value:expiry},
	 					{index:'manufacture_date',value:manu_date},
	 					{index:'mrp',value:mrp},
	 					{index:'cost_price',value:cost},
	 					{index:'sale_price',value:sale_price},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'New batch '+batch+' for product '+name,link_to:'form1'}};
			create_json(data_json,func);

			var id=get_new_key();

			$("#modal22_billings").find('input').each(function()
			{
				id++;
				var price=$(this).val();
				var bill_type=$(this).attr('id');
				var sale_price_json={data_store:'sale_prices',
	 				data:[{index:'id',value:data_id},
	 					{index:'product_name',value:name},
	 					{index:'batch',value:batch},
	 					{index:'sale_price',value:price},
	 					{index:'pi_id',value:data_id},
	 					{index:'billing_type',value:bill_type},
	 					{index:'last_updated',value:last_updated}]};
				create_json(sale_price_json);
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal22_link").click();
}

function modal23_action(t_func,i_func,v_func)
{
	var form=document.getElementById('modal23_form');

	var template_button=form.elements['download'];
	var records_action=form.elements['upload_option'];
	var select_file=form.elements['file'];
	var dummy_button=form.elements['file_dummy'];
	var selected_file=form.elements['selected_file'];
	var import_button=form.elements['save'];

	$(dummy_button).off('click');
	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(select_file).trigger('click');
	});

	dummy_button.setAttribute('class','btn red-sunglo');

	select_file.value="";
	selected_file.value="";

	$(select_file).off('change');
	$(select_file).on('change',function ()
	{
		var file_name=select_file.value;
		if(file_name!="" && (file_name.indexOf('csv')>-1))
		{
			dummy_button.setAttribute('class','btn green-jungle');
			selected_file.value=file_name;
		}
		else
		{
			dummy_button.setAttribute('class','btn red-sunglo');

			select_file.value="";
			selected_file.value="";
		}
	});

	$(template_button).off("click");
	$(template_button).on("click",function(event)
	{
		t_func();
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		show_progress();
        show_loader();
		var file=select_file.files[0];
        var fileType = /csv/gi;

        selected_file.value = "Uploading!! Please don't refresh";
    	var reader = new FileReader();
        reader.onload = function(e)
        {
        	progress_value=5;
        	var content=reader.result;
        	var data_array=vUtil.csv2array(content);

        	progress_value=10;
           	//console.log(data_array);

           	if(typeof v_func!='undefined')
           	{
           		var error_array=v_func(data_array);
           		if(error_array.status=='success')
           		{
           			if(records_action.value=='new')
			        	{
			        		i_func(data_array,'create_new');
			        	}
			        	else if(records_action.value=='existing')
			        	{
			        		i_func(data_array,'update_records');
			        	}

			        	progress_value=15;

			        	//console.log(data_array.length);

			        	var ajax_complete=setInterval(function()
			        	{
			        		//console.log(number_active_ajax);
			        		if(number_active_ajax===0)
			        		{
			        			progress_value=15+(1-(localdb_open_requests/(2*data_array.length)))*85;
			        		}
			        		else if(localdb_open_requests===0)
			        		{
			        			progress_value=15+(1-((500*(number_active_ajax-1))/(2*data_array.length)))*85;
			        		}

			        		if(number_active_ajax===0 && localdb_open_requests===0)
			        		{
			        			hide_progress();
                                hide_loader();
			        			selected_file.value="Upload complete";
			        			$(select_file).val('');
			        			clearInterval(ajax_complete);
			        		}
			        	},1000);
                        $(form).find(".close").click();
           		}
           		else
           		{
           			hide_progress();
	       			selected_file.value="";
	        		$(select_file).val('');
	        		$(form).find(".close").click();
	        		modal164_action(error_array);
           		}
           	}
           	else
           	{
	           	if(records_action.value=='new')
		        	{
		        		i_func(data_array,'create_new');
		        	}
		        	else if(records_action.value=='existing')
		        	{
		        		i_func(data_array,'update_records');
		        	}

		        	progress_value=15;

		        	//console.log(data_array.length);

		        	var ajax_complete=setInterval(function()
		        	{
		        		//console.log(number_active_ajax);
		        		if(number_active_ajax===0)
		        		{
		        			progress_value=15+(1-(localdb_open_requests/(2*data_array.length)))*85;
		        		}
		        		else if(localdb_open_requests===0)
		        		{
		        			progress_value=15+(1-((500*(number_active_ajax-1))/(2*data_array.length)))*85;
		        		}

		        		if(number_active_ajax===0 && localdb_open_requests===0)
		        		{
		        			hide_progress();
		        			selected_file.value="Upload complete";
		        			$(select_file).val('');
		        			$(form).find(".close").click();
		        			clearInterval(ajax_complete);
		        		}
		        	},1000);
	        }
        }
        reader.readAsText(file);
    });
	$("#modal23_link").click();
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
	var data_id=father_form.elements[4].value;
	var faddress=father_form.elements[7];
	var fpincode=father_form.elements[8];
	var fcity=father_form.elements[9];
	var fstate=father_form.elements[10];
	var fcountry=father_form.elements[11];
	var faddress_status=father_form.elements[12];

	form.elements[1].value=faddress.value;
	form.elements[2].value=fpincode.value;
	form.elements[3].value=fcity.value;
	form.elements[4].value=fstate.value;
	form.elements[5].value=fcountry.value;

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var address=form.elements[1].value;
		var pincode=form.elements[2].value;
		var city=form.elements[3].value;
		var state=form.elements[4].value;
		var country=form.elements[5].value;

		var address_detail=address+", "+pincode+", "+city+", "+state+", "+country;
		faddress_detail.value=address_detail;
		faddress.value=address;
		fpincode.value=pincode;
		fcity.value=city;
		fstate.value=state;
		fcountry.value=country;
		faddress_status.value="pending analysis";

		var data_xml="<customers>" +
				"<id>"+data_id+"</id>" +
				"<address>"+address+"</address>" +
				"<pincode>"+pincode+"</pincode>" +
				"<city>"+city+"</city>" +
				"<state>"+state+"</state>" +
				"<country>"+country+"</country>" +
				"<address_status>pending analysis</address_status>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</customers>";

		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}

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
	var data_id=father_form.elements[4].value;
	var faddress=father_form.elements[7];
	var fpincode=father_form.elements[8];
	var fcity=father_form.elements[9];
	var fstate=father_form.elements[10];
	var fcountry=father_form.elements[11];
	var faddress_status=father_form.elements[1];

	form.elements[1].value=faddress.value;
	form.elements[2].value=fpincode.value;
	form.elements[3].value=fcity.value;
	form.elements[4].value=fstate.value;
	form.elements[5].value=fcountry.value;

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var address=form.elements[1].value;
		var pincode=form.elements[2].value;
		var city=form.elements[3].value;
		var state=form.elements[4].value;
		var country=form.elements[5].value;

		var address_detail=address+", "+pincode+", "+city+", "+state+", "+country;
		faddress_detail.value=address_detail;
		faddress.value=address;
		fpincode.value=pincode;
		fcity.value=city;
		fstate.value=state;
		fcountry.value=country;
		faddress_status.value="pending analysis";

		var data_xml="<suppliers>" +
				"<id>"+data_id+"</id>" +
				"<address>"+address+"</address>" +
				"<pincode>"+pincode+"</pincode>" +
				"<city>"+city+"</city>" +
				"<state>"+state+"</state>" +
				"<country>"+country+"</country>" +
				"<address_status>pending analysis</address_status>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</suppliers>";

		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}

		$("#modal25").dialog("close");
	});

	$("#modal25").dialog("open");
}

/**
 * @modalNo 26
 * @modal Payment Details
 */
function modal26_action(receipt_id,customer,total,paid,mode,func)
{
	var form=document.getElementById('modal26_form');

	var fcustomer=form.elements['by'];
	var ftotal=form.elements['total'];
	var fpaid=form.elements['paid'];
	var fmode=form.elements['mode'];

	fcustomer.value=customer;
	ftotal.value=total;
	fpaid.value=paid;
	fmode.value=mode;

	set_static_value_list_json('payments','mode',fmode);

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();

		var customer=fcustomer.value;
		var total=ftotal.value;
		var paid=fpaid.value;
		var mode=fmode.value;
		var last_updated=get_my_time();

		var receipt_json={data_store:'receipts',
				data:[{index:'id',value:receipt_id},
					{index:'amount',value:paid},
					{index:'mode_payment',value:mode},
					{index:'last_updated',value:last_updated}]};

		var rtran_json={data_store:'transactions',
				data:[{index:'id',value:receipt_id},
					{index:'amount',value:paid},
					{index:'last_updated',value:last_updated}]};

		update_json(receipt_json);
		update_json(rtran_json);

		if(func)
		{
			func(mode,paid);
		}

		$(form).find(".close").click();
	});

	$("#modal26_link").click();
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

	fmake.value="";
	fprice.value="";
	fquantity.value="";
	fsupplier.value="";
	fname.value=product_name;

	var supplier_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	set_my_value_list(supplier_data,fsupplier);

	var make_data="<product_master>" +
		"<make></make>" +
		"<name exact='yes'>"+product_name+"</name>" +
		"</product_master>";
	set_my_value(make_data,fmake);

	var price_data="<product_instances>" +
		"<cost_price></cost_price>" +
		"<product_name exact='yes'>"+product_name+"</product_name>" +
		"</product_instances>";
	set_my_value(price_data,fprice);

	/// logic for last supplier
	var last_purchase_data="<purchase_order_items>" +
			"<id></id>" +
			"<quantity></quantity>" +
			"<order_id></order_id>" +
			"<product_name exact='yes'>"+product_name+"</product_name>" +
			"</purchase_order_items>";
	fetch_requested_data('',last_purchase_data,function(last_purchases)
	{
		var order_id="";
		for(var k in last_purchases)
		{
			order_id=last_purchases[k].order_id;

			var last_order_data="<purchase_orders>" +
					"<supplier></supplier>" +
					"<id exact='yes'>"+order_id+"</id>" +
					"<status></status>" +
					"</purchase_orders>";
			fetch_requested_data('',last_order_data,function(last_orders)
			{
				for(var j in last_orders)
				{
					if(last_orders[j].status=='draft')
					{
						fquantity.value=last_purchases[k].quantity;
						data_id=last_purchases[k].id;
					}
					fsupplier.value=last_orders[j].supplier;
					break;
				}
			});
			break;
		}
	});


	$(form).off("submit");
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
			var last_updated=get_my_time();

			var purchase_order_data="<purchase_orders>" +
					"<id></id>" +
					"<supplier exact='yes'>"+supplier+"</supplier>" +
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
					server_update_row(data_xml,activity_xml);
				}
				else
				{
					local_create_row(data_xml,activity_xml);
					local_update_row(data_xml,activity_xml);
				}
			});

		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal27").dialog("close");
	});

	$("#modal27").dialog("open");
}

/**
 * @modalNo 28
 * @modal Payment Details
 */
 function modal28_action(receipt_id,supplier,total,paid,mode,func)
 {
 	var form=document.getElementById('modal28_form');

 	var fsupplier=form.elements['to'];
 	var ftotal=form.elements['total'];
 	var fpaid=form.elements['paid'];
 	var fmode=form.elements['mode'];

 	fsupplier.value=supplier;
 	ftotal.value=total;
 	fpaid.value=paid;
	fmode.value=mode;

 	set_static_value_list_json('payments','mode',fmode);

 	$(form).off("submit");
 	$(form).on("submit",function(event)
 	{
 		event.preventDefault();

 		var total=ftotal.value;
 		var paid=fpaid.value;
 		var mode=fmode.value;
 		var last_updated=get_my_time();

 		var receipt_json={data_store:'receipts',
 				data:[{index:'id',value:receipt_id},
 					{index:'amount',value:paid},
 					{index:'mode_payment',value:mode},
 					{index:'last_updated',value:last_updated}]};

 		var rtran_json={data_store:'transactions',
 				data:[{index:'id',value:receipt_id},
 					{index:'amount',value:paid},
 					{index:'last_updated',value:last_updated}]};

 		update_json(receipt_json);
 		update_json(rtran_json);

 		if(func)
 		{
 			func(mode,paid);
 		}

 		$(form).find(".close").click();
 	});

 	$("#modal28_link").click();
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
	var fnotes=father_form.elements[11];

	form.elements[1].value=fbill_id.value;
	var date=form.elements[2];
	date.value=get_my_past_date(fdate.value);
	var mode=form.elements[3];
	mode.value=fmode.value;
	var due_date=form.elements[4];
	due_date.value=get_my_past_date(fdue_date.value);
	form.elements[5].value=fnotes.value;

	$(date).datepicker();
	$(due_date).datepicker();
	set_static_value_list('payments','mode',mode);

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var detail_string="Bill Id: " +form.elements[1].value+
				"\nMode of payment: " +form.elements[3].value+
				"\nDue Date: "+form.elements[4].value+
				"\nDate closed: "+form.elements[2].value+
				"\nClosing Notes: "+form.elements[5].value;

		fdetail.value=detail_string;
		fmode.value=form.elements[3].value;
		fdue_date.value=get_raw_time(form.elements[4].value);
		fbill_id.value=form.elements[1].value;
		fnotes.value=form.elements[5].value;

		$("#modal29").dialog("close");
		$(father_form).submit();
	});

	$("#modal29").dialog("open");
}

/**
 * @modal Add Receipt
 * @modalNo 30
 */
function modal30_action()
{
	var form=document.getElementById("modal30_form");
	var receipt_filter=form.elements[1];
	var account_filter=form.elements[2];
	var amount_filter=form.elements[3];
	var balance_filter=form.elements[4];
	var type_filter=form.elements[5];

	var accounts_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_value_list(accounts_data,account_filter);
	set_static_value_list('receipts','type',type_filter);

	var receipts_data="<receipts>" +
			"<receipt_id></receipt_id>" +
			"</receipts>";
	get_single_column_data(function(receipts)
	{
		$(receipt_filter).off('blur');
		$(receipt_filter).on('blur',function(event)
		{
			var found = $.inArray($(this).val(), receipts) > -1;
			if(found)
			{
	            $(this).val('');
	            $(this).attr('placeholder','Duplicate Receipt Number');
	        }
		});
	},receipts_data);

	$(account_filter).off('blur');
	$(account_filter).on('blur',function(e)
	{
		var payments_data="<payments>" +
				"<id></id>" +
				"<type></type>" +
				"<total_amount></total_amount>" +
				"<paid_amount></paid_amount>" +
				"<status exact='yes'>pending</status>" +
				"<acc_name exact='yes'>"+account_filter.value+"</acc_name>" +
				"</payments>";

		fetch_requested_data('',payments_data,function(payments)
		{
			var balance_amount=0;
			payments.forEach(function(payment)
			{
				if(payment.type=='received')
				{
					balance_amount+=parseFloat(payment.total_amount);
					balance_amount-=parseFloat(payment.paid_amount);
				}
				else if(payment.type=='paid')
				{
					balance_amount-=parseFloat(payment.total_amount);
					balance_amount+=parseFloat(payment.paid_amount);
				}
			});

			if(balance_amount==0)
			{
				balance_filter.value="Rs. 0";
			}
			else if(balance_amount>0)
			{
				balance_filter.value="Receivable: Rs. "+balance_amount;
			}
			else
			{
				balance_amount=(-balance_amount);
				balance_filter.value="Payable: Rs. "+balance_amount;
			}
			type_filter.value='received';

			//amount_filter.setAttribute('max',balance_amount);
		});
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		///////////////////////////////////////
		event.preventDefault();
		var receipt_id=form.elements[1].value;
		var receipt_type=type_filter.value;
		var account_name=account_filter.value;
		var counter_payment=parseFloat(amount_filter.value);

		if(is_create_access('form124'))
		{
			var accounts_data="<payments>" +
					"<id></id>" +
					//"<type exact='yes'>"+receipt_type+"</type>" +
					"<type></type>"+
					"<status exact='yes'>pending</status>" +
					"<acc_name exact='yes'>"+account_name+"</acc_name>" +
					"<date></date>" +
					"<total_amount></total_amount>" +
					"<paid_amount></paid_amount>" +
					"<notes></notes>" +
					"</payments>";

			fetch_requested_data('',accounts_data,function(accounts)
			{
				accounts.sort(function(a,b)
				{
					if(a.date>b.date)
					{	return 1;}
					else
					{	return -1;}
				});

				var total_amount=0;

				for(var i=0;i<accounts.length;i++)
				{
					if(accounts[i].type=='received')
					{
						total_amount+=parseFloat(accounts[i].total_amount);
						total_amount-=parseFloat(accounts[i].paid_amount);
					}
					else if(accounts[i].type=='paid')
					{
						total_amount-=parseFloat(accounts[i].total_amount);
						total_amount+=parseFloat(accounts[i].paid_amount);
					}
				}

				total_amount=total_amount-counter_payment;

				if(total_amount>0)
				{
					accounts.sort(function(a,b)
					{
						if(a.type>b.type)
						{	return 1;}
						else
						{	return -1;}
					});
					console.log(accounts);
				}
				else
				{
					accounts.sort(function(a,b)
					{
						if(a.type<b.type)
						{	return 1;}
						else
						{	return -1;}
					});
					console.log(accounts);
				}

				console.log(total_amount);

				var new_id=get_new_key();
				var last_updated=get_my_time();
				accounts.forEach(function(account)
				{
					new_id++;
					if(total_amount==0)
					{
						var notes=account.notes+"\nClosed by receipt # "+receipt_id;
						var payment_xml="<payments>" +
								"<id>"+account.id+"</id>" +
								"<paid_amount>"+account.total_amount+"</paid_amount>" +
								"<status>closed</status>" +
								"<notes>"+notes+"</notes>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</payments>";
						var receipts_xml="<receipts_payment_mapping>" +
								"<id>"+new_id+"</id>" +
								"<receipt_id>"+receipt_id+"</receipt_id>" +
								"<payment_id>"+account.id+"</payment_id>" +
								"<type>"+account.type+"</type>" +
								"<amount>"+(parseFloat(account.total_amount)-parseFloat(account.paid_amount))+"</amount>" +
								"<acc_name>"+account_name+"</acc_name>" +
								"<date>"+last_updated+"</date>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</receipts_payment_mapping>";

						update_simple(payment_xml);
						create_simple(receipts_xml);
					}
					else
					{
						if(account.type=='paid')
						{
							if(total_amount>0)
							{
								var notes=account.notes+"\nClosed by receipt # "+receipt_id;
								var payment_xml="<payments>" +
									"<id>"+account.id+"</id>" +
									"<paid_amount>"+account.total_amount+"</paid_amount>" +
									"<status>closed</status>" +
									"<notes>"+notes+"</notes>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</payments>";
								var receipts_xml="<receipts_payment_mapping>" +
									"<id>"+new_id+"</id>" +
									"<receipt_id>"+receipt_id+"</receipt_id>" +
									"<payment_id>"+account.id+"</payment_id>" +
									"<type>"+account.type+"</type>" +
									"<amount>"+(parseFloat(account.total_amount)-parseFloat(account.paid_amount))+"</amount>" +
									"<acc_name>"+account_name+"</acc_name>" +
									"<date>"+last_updated+"</date>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</receipts_payment_mapping>";

								update_simple(payment_xml);
								create_simple(receipts_xml);
							}
							else
							{
								if(parseFloat(account.total_amount)>-(total_amount))
								{
									var balanced_amount=parseFloat(account.total_amount)-parseFloat(account.paid_amount)+total_amount;
									var notes=account.notes+"\n Rs."+balanced_amount+" balanced against receipt # "+receipt_id;
									var payment_xml="<payments>" +
										"<id>"+account.id+"</id>" +
										"<paid_amount>"+(parseFloat(account.total_amount)+total_amount)+"</paid_amount>" +
										"<status>pending</status>" +
										"<notes>"+notes+"</notes>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</payments>";
									var receipts_xml="<receipts_payment_mapping>" +
										"<id>"+new_id+"</id>" +
										"<receipt_id>"+receipt_id+"</receipt_id>" +
										"<payment_id>"+account.id+"</payment_id>" +
										"<type>"+account.type+"</type>" +
										"<amount>"+balanced_amount+"</amount>" +
										"<acc_name>"+account_name+"</acc_name>" +
										"<date>"+last_updated+"</date>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</receipts_payment_mapping>";

									update_simple(payment_xml);
									create_simple(receipts_xml);
									total_amount=0;
								}
								else
								{
									var notes=account.notes+"\n Rs."+account.paid_amount+" balanced against receipt # "+receipt_id;
									var payment_xml="<payments>" +
										"<id>"+account.id+"</id>" +
										"<paid_amount>0</paid_amount>" +
										"<status>pending</status>" +
										"<notes>"+notes+"</notes>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</payments>";
									var receipts_xml="<receipts_payment_mapping>" +
										"<id>"+new_id+"</id>" +
										"<receipt_id>"+receipt_id+"</receipt_id>" +
										"<payment_id>"+account.id+"</payment_id>" +
										"<type>"+account.type+"</type>" +
										"<amount>"+account.paid_amount+"</amount>" +
										"<acc_name>"+account_name+"</acc_name>" +
										"<date>"+last_updated+"</date>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</receipts_payment_mapping>";

									update_simple(payment_xml);
									create_simple(receipts_xml);
									total_amount=total_amount+parseFloat(account.total_amount);
								}
							}
						}
						else
						{
							if(total_amount<0)
							{
								var notes=account.notes+"\nClosed by receipt # "+receipt_id;
								var payment_xml="<payments>" +
									"<id>"+account.id+"</id>" +
									"<paid_amount>"+account.total_amount+"</paid_amount>" +
									"<status>closed</status>" +
									"<notes>"+notes+"</notes>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</payments>";
								var receipts_xml="<receipts_payment_mapping>" +
									"<id>"+new_id+"</id>" +
									"<receipt_id>"+receipt_id+"</receipt_id>" +
									"<payment_id>"+account.id+"</payment_id>" +
									"<type>"+account.type+"</type>" +
									"<amount>"+(parseFloat(account.total_amount)-parseFloat(account.paid_amount))+"</amount>" +
									"<acc_name>"+account_name+"</acc_name>" +
									"<date>"+last_updated+"</date>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</receipts_payment_mapping>";

								update_simple(payment_xml);
								create_simple(receipts_xml);
							}
							else
							{
								if(parseFloat(account.total_amount)>total_amount)
								{
									var balanced_amount=parseFloat(account.total_amount)-parseFloat(account.paid_amount)-total_amount;
									var notes=account.notes+"\n Rs."+balanced_amount+" balanced against receipt # "+receipt_id;
									var payment_xml="<payments>" +
										"<id>"+account.id+"</id>" +
										"<paid_amount>"+(parseFloat(account.total_amount)-total_amount)+"</paid_amount>" +
										"<status>pending</status>" +
										"<notes>"+notes+"</notes>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</payments>";
									var receipts_xml="<receipts_payment_mapping>" +
										"<id>"+new_id+"</id>" +
										"<receipt_id>"+receipt_id+"</receipt_id>" +
										"<payment_id>"+account.id+"</payment_id>" +
										"<type>"+account.type+"</type>" +
										"<amount>"+balanced_amount+"</amount>" +
										"<acc_name>"+account_name+"</acc_name>" +
										"<date>"+last_updated+"</date>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</receipts_payment_mapping>";

									update_simple(payment_xml);
									create_simple(receipts_xml);
									total_amount=0;
								}
								else
								{
									var notes=account.notes+"\n Rs."+account.paid_amount+" balanced against receipt # "+receipt_id;
									var payment_xml="<payments>" +
										"<id>"+account.id+"</id>" +
										"<paid_amount>0</paid_amount>" +
										"<status>pending</status>" +
										"<notes>"+notes+"</notes>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</payments>";
									var receipts_xml="<receipts_payment_mapping>" +
										"<id>"+new_id+"</id>" +
										"<receipt_id>"+receipt_id+"</receipt_id>" +
										"<payment_id>"+account.id+"</payment_id>" +
										"<type>"+account.type+"</type>" +
										"<amount>"+account.paid_amount+"</amount>" +
										"<acc_name>"+account_name+"</acc_name>" +
										"<date>"+last_updated+"</date>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</receipts_payment_mapping>";

									update_simple(payment_xml);
									create_simple(receipts_xml);
									total_amount=total_amount-parseFloat(account.total_amount);
								}
							}
						}
					}
				});

				var p_id=get_new_key();
				if(total_amount<0)
				{
					var payment_xml="<payments>" +
								"<id>"+p_id+"</id>" +
								"<status>pending</status>" +
								"<type>paid</type>" +
								"<date>"+get_my_time()+"</date>" +
								"<total_amount>"+(-total_amount)+"</total_amount>" +
								"<paid_amount>0</paid_amount>" +
								"<acc_name>"+account_name+"</acc_name>" +
								"<due_date>"+get_credit_period()+"</due_date>" +
								"<mode>cash</mode>" +
								"<transaction_id>"+p_id+"</transaction_id>" +
								"<source_id>"+p_id+"</source_id>" +
								"<source>receipt</source>" +
								"<source_info>"+receipt_id+"</source_info>"+
								"<notes>Generated for receipt # "+receipt_id+"</notes>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</payments>";
					create_simple(payment_xml);
				}

				var receipt_xml="<receipts>" +
								"<id>"+p_id+"</id>" +
								"<receipt_id>"+receipt_id+"</receipt_id>" +
								"<type>"+receipt_type+"</type>" +
								"<amount>"+amount_filter.value+"</amount>" +
								"<acc_name>"+account_name+"</acc_name>" +
								"<date>"+last_updated+"</date>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</receipts>";
				create_simple(receipt_xml);

			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal30").dialog("close");
	});
	$("#modal30").dialog("open");
}


/**
 * @modal Delete Receipt
 * @modalNo 31
 */
function modal31_action()
{
	var form=document.getElementById("modal31_form");
	var receipt_filter=form.elements['receipt'];
	var account_filter=form.elements['account'];
	var balance_filter=form.elements['balance'];
	var amount_filter=form.elements['amount'];

	receipt_filter.value="";
	account_filter.value="";
	balance_filter.value="";
	amount_filter.value="";

	var receipt_id="";
	$(receipt_filter).off('blur');
	$(receipt_filter).off('change');
	$(receipt_filter).on('blur change',function(e)
	{
		var receipts_data={data_store:'receipts',count:1,
                           indexes:[{index:'id'},
                                   {index:'receipt_id',exact:receipt_filter.value},
                                   {index:'amount'},
                                   {index:'acc_name'}]};
		read_json_rows('',receipts_data,function(receipts)
		{
			if(receipts.length>0)
			{
				receipt_id=receipts[0].id;
				account_filter.value=receipts[0].acc_name;
				amount_filter.value=receipts[0].amount;

				var transactions_data={data_store:'transactions',
                                  indexes:[{index:'id'},
                                          {index:'type'},
                                          {index:'amount'},
                                          {index:'acc_name',exact:account_filter.value}]};
				read_json_rows('',transactions_data,function(transactions)
				{
					var balance_amount=0;
					transactions.forEach(function(tran)
					{
						if(tran.type=='received')
						{
							balance_amount-=parseFloat(tran.amount);
						}
						else if(tran.type=='given')
						{
							balance_amount+=parseFloat(tran.amount);
						}
					});

					if(balance_amount==0)
					{
						balance_filter.value="Rs. 0";
					}
					else if(balance_amount>0)
					{
						balance_filter.value="Receivable: Rs. "+balance_amount;
					}
					else
					{
						balance_amount=(-balance_amount);
						balance_filter.value="Payable: Rs. "+balance_amount;
					}
				});
			}
		});
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		///////////////////////////////////////
		event.preventDefault();
		var receipt_id=form.elements['receipt'].value;

		if(is_delete_access('form124') || is_delete_access('form243') || is_delete_access('form291') || is_delete_access('form282'))
		{
      		var receipt_json={data_store:'receipts',
	 					data:[{index:'id',value:receipt_id}]};

    		var tran_json={data_store:'transactions',
	 					data:[{index:'source_id',value:receipt_id}]};

			delete_json(receipt_json);
			delete_json(tran_json);
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
		/////////////////////////////////////////
	});
	$("#modal31_link").click();
}

/**
 * @modal Add Task
 * @modalNo 32
 */
function modal32_action(date_initiated)
{
	var form=document.getElementById("modal32_form");
	var task_filter=form.elements[1];
	var staff_filter=form.elements[2];
	var due_filter=form.elements[3];
	var status_filter=form.elements[4];
	var hours_filter=form.elements[5];

	var task_data="<task_type>" +
			"<name></name>" +
			"</task_type>";
	set_my_value_list(task_data,task_filter);
	var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	set_my_value_list(staff_data,staff_filter);
	$(due_filter).vdatetimepicker();
	set_static_value_list('task_instances','status',status_filter);

	$(task_filter).off('blur');
	$(task_filter).on('blur',function(event)
	{
		var hours_data="<task_type>" +
				"<est_hours></est_hours>" +
				"<name exact='yes'>"+task_filter.value+"</name>" +
				"</task_type>";
		set_my_value(hours_data,hours_filter);
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

		var name=form.elements[1].value;
		var assignee=form.elements[2].value;
		var t_due=get_raw_time(form.elements[3].value);
		var t_initiated=get_raw_time(date_initiated);
		var status=form.elements[4].value;
		var hours=form.elements[5].value;
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<assignee>"+assignee+"</assignee>" +
					"<t_initiated>"+t_initiated+"</t_initiated>" +
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
		var access_xml="<data_access>" +
					"<id>"+get_new_key()+"</id>" +
					"<tablename>task_instances</tablename>" +
					"<record_id>"+data_id+"</record_id>" +
					"<access_type>all</access_type>" +
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

		$("#modal32").dialog("close");
	});

	$("#modal32").dialog("open");
}

/**
 * @modal Update Task
 * @modalNo 33
 */
function modal33_action(id)
{
	var form=document.getElementById("modal33_form");
	var task_filter=form.elements['task'];
	var staff_filter=form.elements['assignee'];
	var notes_filter=form.elements['notes'];
	var status_filter=form.elements['status'];

	var staff_data={data_store:'staff',return_column:'acc_name'};
	set_my_value_list_json(staff_data,staff_filter);
    set_static_value_list_json('task_instances','status',status_filter);

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form14') || is_create_access('form104'))
		{
			var name=form.elements['task'].value;
			var assignee=form.elements['assignee'].value;
			var notes=form.elements['notes'].value;
			var status=form.elements['status'].value;
			var data_id=id;
			var last_updated=get_my_time();

            var data_json={data_store:'task_instances',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'assignee',value:assignee},
                        {index:'status',value:status},
                        {index:'description',value:notes},
                        {index:'last_updated',value:last_updated}]};

            var prod_json={data_store:'production_plan_items',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:status},
                        {index:'last_updated',value:last_updated}]};
			update_json(data_json);
			update_json(prod_json);
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	var tasks_data={data_store:'task_instances',count:1,
                   indexes:[{index:'id',value:id+""},
                           {index:'name'},
                           {index:'assignee'},
                           {index:'description'},
                           {index:'status'}]};
	read_json_rows('',tasks_data,function(results)
	{
		if(results.length>0)
		{
			task_filter.value=results[0].name;
			staff_filter.value=results[0].assignee;
			notes_filter.value=results[0].description;
			status_filter.value=results[0].status;
            $('#modal33').formcontrol();
		}
		$("#modal33_link").click();
	});
}


/**
 * @modal Add Store Area
 * @modalNo 35
 */
function modal35_action(func)
{
	var form=document.getElementById("modal35_form");
	var owner_filter=form.elements['owner'];

	var owner_data={data_store:'staff',return_column:'acc_name'};
	set_my_value_list_json(owner_data,owner_filter);

	////adding attribute fields///////
	var attribute_label=document.getElementById('modal35_attributes');
	attribute_label.innerHTML="";
	var attributes_data={data_store:'mandatory_attributes',
                        indexes:[{index:'attribute'},
                                {index:'status'},
                                {index:'value'},
                                {index:'object',exact:'storage'}]};
	read_json_rows('',attributes_data,function(attributes)
	{
        attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required';
				var attr_label=document.createElement('div');
				attr_label.setAttribute('class','row');
				if(attribute.value=="")
				{
					attr_label.innerHTML="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><input type='text' "+required+" name='"+attribute.attribute+"'></div>";
				}
				else
				{
					var values_array=attribute.value.split(";");
					var content="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><select "+required+" name='"+attribute.attribute+"'>";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select></div>";
					attr_label.innerHTML=content;
				}
				attribute_label.appendChild(attr_label);
			}
		});
	});


	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form83'))
		{
			var data_id=get_new_key();
			var name=form.elements['name'].value;
			var owner=form.elements['owner'].value;
			var last_updated=get_my_time();
			var data_json={data_store:'store_areas',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'owner',value:owner},
	 					{index:'last_updated',value:last_updated}],
	 		log_data:{title:'Added',notes:'Storage '+name,link_to:'form83'}};

			create_json(data_json,func);

			var id=get_new_key();
			$("#modal35_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				if(value!="")
				{
					var attribute=$(this).attr('name');
					var attribute_json={data_store:'attributes',
	 				data:[{index:'id',value:id},
	 					{index:'name',value:name},
	 					{index:'type',value:'storage'},
                        {index:'attribute',value:attribute},
                        {index:'value',value:value},
	 					{index:'last_updated',value:last_updated}]};

					create_json(attribute_json);
				}
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find('.close').click();
	});

	$("#modal35_link").click();
}

/**
 * @modal Add Appointment
 * @modalNo 36
 */
function modal36_action(schedule_time)
{
	var form=document.getElementById("modal36_form");
	var customer_filter=form.elements['customer'];
	var staff_filter=form.elements['assignee'];
	var schedule_filter=form.elements['schedule'];

	var customer_data={data_store:'customers',return_column:'acc_name'};
	set_my_value_list_json(customer_data,customer_filter);

	var staff_data={data_store:'staff',return_column:'acc_name'};
	set_my_value_list_json(staff_data,staff_filter);

	$(schedule_filter).vdatetimepicker();
	schedule_filter.value=schedule_time;

	$('#modal36').formcontrol();

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form89'))
		{
			var name=customer_filter.value;
			var assignee=staff_filter.value;
			var notes=form.elements['notes'].value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var schedule=get_raw_time(schedule_filter.value);

			var data_json={data_store:'appointments',
	 				data:[{index:'id',value:data_id},
	 					{index:'customer',value:name},
	 					{index:'assignee',value:assignee},
                        {index:'schedule',value:schedule},
                        {index:'status',value:'pending'},
						{index:'hours',value:1},
						{index:'notes',value:notes},
	 					{index:'last_updated',value:last_updated}],
					log:'yes',
					log_data:{title:'Added',notes:'Appointment with '+name,link_to:'form89'}};
			create_json(data_json);
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal36_link").click();
}

/**
 * @modal Update Appointment
 * @modalNo 37
 */
function modal37_action(id,schedule)
{
	var form=document.getElementById("modal37_form");
	var customer_filter=form.elements['customer'];
	var staff_filter=form.elements['assignee'];
	var notes_filter=form.elements['notes'];
	var status_filter=form.elements['status'];
	var notify_button=form.elements['notify'];

	var customer_data={data_store:'customers',return_column:'acc_name'};
	set_my_value_list_json(customer_data,customer_filter);

	var staff_data={data_store:'staff',return_column:'acc_name'};
	set_my_value_list_json(staff_data,staff_filter);
	set_static_value_list_json('appointments','status',status_filter);

	var apps_data={data_store:'appointments',count:1,
				  indexes:[{index:'id',value:id},
						  {index:'customer'},
						  {index:'assignee'},
						  {index:'notes'},
						  {index:'status'}]};
	read_json_rows('form89',apps_data,function(results)
	{
		if(results.length>0)
		{
			customer_filter.value=results[0].customer;
			staff_filter.value=results[0].assignee;
			notes_filter.value=results[0].notes;
			status_filter.value=results[0].status;
		}
		$('#modal37').formcontrol();
		$("#modal37_link").click();
	});

	$(notify_button).off('click');
	$(notify_button).on('click',function()
	{
		show_loader();
		var customer_name=customer_filter.value;
		var customer_data={data_store:'customers',count:1,
						  indexes:[{index:'name'},{index:'id'},
								   {index:'acc_name',exact:customer_filter.value},
								  {index:'email'},
								  {index:'phone'}]};
		read_json_rows('',customer_data,function(customers)
		{
			if(customers.length>0)
			{
				var bt=get_session_var('title');
				if(!vUtil.isBlank(customers[0].phone))
				{
					var sms_message="Your appointment at "+bt+" is confirmed for "+get_my_datetime(schedule)+". Dont forget to visit.";
					send_sms(customers[0].phone,sms_message,'transaction');
				}

				if(!vUtil.isBlank(customers[0].email))
				{
					var from=get_session_var('email');
					var email_message="Your appointment at "+bt+" is confirmed for "+get_my_datetime(schedule)+". Dont forget to visit.\n\nRegards,\n"+bt+"\n"+get_session_var('address')+"\n"+get_session_var('phone');

					var to=[{"email":customers[0].email,"name":customers[0].name,"customer_id":customers[0].id}];
					var email_to=JSON.stringify(to);

					send_email(email_to,from,bt,bt+' - Reminder for Appointment',email_message,function(){});
				}
			}
			hide_loader();
		});
		$(form).find(".close").click();
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form89'))
		{
			var name=customer_filter.value;
			var assignee=staff_filter.value;
			var notes=notes_filter.value;
			var status=status_filter.value;
			var last_updated=get_my_time();

			var data_json={data_store:'appointments',
	 				data:[{index:'id',value:id},
	 					{index:'customer',value:name},
	 					{index:'assignee',value:assignee},
                        {index:'status',value:status},
						{index:'notes',value:notes},
	 					{index:'last_updated',value:last_updated}]};
			update_json(data_json);
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});
}

/**
 * @modalNo 38
 * @modal Update sale price
 */
function modal38_action(father_id,sale_price_value)
{
	var form=document.getElementById('modal38_form');
	var fsale_price=form.elements[1];
	var billing_label=document.getElementById('modal38_billings');
	$(billing_label).html("");

	fsale_price.value=sale_price_value;
	////adding sale price fields for all billing types///////
	var billing_type_data="<sale_prices>" +
			"<id></id>" +
			"<sale_price></sale_price>" +
			"<billing_type></billing_type>" +
			"<pi_id exact='yes'>"+father_id+"</pi_id>" +
			"</sale_prices>";
	fetch_requested_data('',billing_type_data,function(sale_prices)
	{
		sale_prices.forEach(function(sale_price)
		{
			var bill_label=document.createElement('label');
			bill_label.innerHTML=sale_price.billing_type+" sale price (Rs.) <input type='number' id='"+sale_price.id+"' value='"+sale_price.sale_price+"' step='any' required>";
			billing_label.appendChild(bill_label);
			var line_break=document.createElement('br');
			billing_label.appendChild(line_break);
		});
	});
	////////////////////////////////////////////////

	////auto setting sale price fields/////////
	$(fsale_price).off('blur');
	$(fsale_price).on('blur',function(event)
	{
		var sale_price=fsale_price.value;
		$("#modal38_billings").find('input').each(function()
		{
			if($(this).val()=="")
			{
				$(this).val(sale_price);
			}
		});
	});
	////////////////////


	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form166') || is_update_access('form155'))
		{
			var sale_price=fsale_price.value;
			var last_updated=get_my_time();
			var data_xml="<product_instances>" +
						"<id>"+father_id+"</id>" +
						"<sale_price>"+sale_price+"</sale_price>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</product_instances>";
			if(is_online())
			{
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}

			$("#modal38_billings").find('input').each(function()
			{
				var price=$(this).val();
				var id=$(this).attr('id');
				var sale_price_xml="<sale_prices>" +
						"<id>"+id+"</id>" +
						"<sale_price>"+price+"</sale_price>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</sale_prices>";
				if(is_online())
				{
					server_update_simple(sale_price_xml);
				}
				else
				{
					local_update_simple(sale_price_xml);
				}
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal38").dialog("close");
	});

	$("#modal38").dialog("open");
}

/**
 * @modal Add Loan
 * @modalNo 39
 */
function modal39_action(schedule_date)
{
	var form=document.getElementById("modal39_form");
	var type_filter=form.elements[1];
	var account_filter=form.elements[2];
	var amount_filter=form.elements[3];
	var date_filter=form.elements[4];
	var repayment_filter=form.elements[5];
	var rate_filter=form.elements[6];
	var iperiod_filter=form.elements[7];
	var itype_filter=form.elements[8];
	var emi_filter=form.elements[9];
	var emi_period_filter=form.elements[10];
	var num_emi_filter=form.elements[11];

	var account_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	set_my_value_list(account_data,account_filter);
	set_static_value_list('loans','type',type_filter);
	set_static_value_list('loans','repayment_method',repayment_filter);
	set_static_value_list('loans','interest_type',itype_filter);

	$(rate_filter).parent().hide();
	$(iperiod_filter).parent().hide();
	$(itype_filter).parent().hide();
	$(emi_filter).parent().hide();
	$(emi_period_filter).parent().hide();
	$(num_emi_filter).parent().hide();

	$(repayment_filter).off('blur');
	$(repayment_filter).on('blur',function(event)
	{
		if(repayment_filter.value=='instalments')
		{
			$(emi_filter).parent().show();
			$(emi_period_filter).parent().show();
			$(num_emi_filter).parent().show();
			$(rate_filter).parent().hide();
			$(iperiod_filter).parent().hide();
			$(itype_filter).parent().hide();
		}
		else
		{
			$(rate_filter).parent().show();
			$(iperiod_filter).parent().show();
			$(itype_filter).parent().show();
			$(emi_filter).parent().hide();
			$(emi_period_filter).parent().hide();
			$(num_emi_filter).parent().hide();
		}
	});

	$(date_filter).datepicker();
	date_filter.value=vTime.date();

	////adding attribute fields///////
	var attribute_label=document.getElementById('modal39_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"<status></status>" +
			"<value></value>"+
			"<object exact='yes'>loan</object>" +
			"</mandatory_attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}
				else
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});


	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form93'))
		{
			var type=form.elements[1].value;
			var account=form.elements[2].value;
			var amount=form.elements[3].value;
			var date=get_raw_time(form.elements[4].value);
			var repayment=form.elements[5].value;
			var rate=form.elements[6].value;
			var period=form.elements[7].value;
			var itype=form.elements[8].value;
			var next_date=date+(parseFloat(period)*86400000);
			var emi=form.elements[9].value;
			var emi_period=form.elements[10].value;
			var num_emi=form.elements[11].value;
			var next_emi_date=date+(parseFloat(emi_period)*86400000);
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var adjective="to";
			var receiver=account;
			var giver="loan";
			var ptype='paid';
			var due_time=get_debit_period();
			if(type=='taken')
			{
				adjective="from";
				giver=account;
				receiver="loan";
				ptype='received';
			}
			var data_xml="<loans>" +
						"<id>"+data_id+"</id>" +
						"<type>"+type+"</type>" +
						"<account>"+account+"</account>" +
						"<loan_amount>"+amount+"</loan_amount>" +
						"<date_initiated>"+date+"</date_initiated>" +
						"<repayment_method>"+repayment+"</repayment_method>" +
						"<interest_paid>0</interest_paid>" +
						"<interest_rate>"+rate+"</interest_rate>" +
						"<interest_period>"+period+"</interest_period>" +
						"<next_interest_date>"+next_date+"</next_interest_date>" +
						"<interest_type>"+itype+"</interest_type>" +
						"<emi>"+emi+"</emi>" +
						"<emi_period>"+emi_period+"</emi_period>" +
						"<pending_emi>"+num_emi+"</pending_emi>" +
						"<next_emi_date>"+next_emi_date+"</next_emi_date>" +
						"<status>open</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</loans>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>loans</tablename>" +
						"<link_to>form93</link_to>" +
						"<title>Added</title>" +
						"<notes>Loan of amount Rs. "+amount+" "+type+" "+adjective+" "+account+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var payment_id=get_new_key()+""+Math.floor(Math.random()*1000);
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
						"<type>"+ptype+"</type>" +
						"<total_amount>"+amount+"</total_amount>" +
						"<paid_amount>"+amount+"</paid_amount>" +
						"<status>closed</status>" +
						"<date>"+get_my_time()+"</date>" +
						"<due_date>"+get_my_time()+"</due_date>" +
						"<mode></mode>" +
						"<transaction_id>"+payment_id+"</transaction_id>" +
						"<source_id>"+data_id+"</source_id>" +
                        "<source>loan</source>" +
                        "<source_info>"+data_id+"</source_info>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</payments>";
			if(is_online())
			{
				server_create_row(data_xml,activity_xml);
				server_create_simple(transaction2_xml);
				server_create_simple_func(payment_xml,function()
				{
					console.log(payment_id);
					if(type=='taken')
						modal26_action(payment_id);
					else
						modal28_action(payment_id);
				});
			}
			else
			{
				local_create_row(data_xml,activity_xml);
				local_create_simple(transaction2_xml);
				local_create_simple_func(payment_xml,function()
				{
					if(type=='taken')
						modal26_action(payment_id);
					else
						modal28_action(payment_id);
				});
			}

			var id=get_new_key();
			$("#modal39_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				if(value!="")
				{
					var attribute=$(this).attr('name');
					var attribute_xml="<attributes>" +
							"<id>"+id+"</id>" +
							"<name>"+data_id+"</name>" +
							"<type>loan</type>" +
							"<attribute>"+attribute+"</attribute>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</attributes>";
					if(is_online())
					{
						server_create_simple(attribute_xml);
					}
					else
					{
						local_create_simple(attribute_xml);
					}
				}
			});

		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal39").dialog("close");
	});

	$("#modal39").dialog("open");
}


/**
 * @modal Discard Item
 * @modalNo 40
 */
function modal40_action(product,batch)
{
	var form=document.getElementById("modal40_form");
	var item_filter=form.elements[1];
	var batch_filter=form.elements[2];
	var quantity_filter=form.elements[3];
	var storage_filter=form.elements[4];
	var reason_filter=form.elements[5];

	item_filter.value=product;
	batch_filter.value=batch;

	var item_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_value_list(item_data,item_filter);

	var storage_data="<store_areas>"+
					"<name></name>"+
					//"<area_type exact='yes'>"+get_session_var('storage_level')+"</area_type>"+
					"<area_type></area_type>"+
					"</store_areas>";
	set_my_value_list(storage_data,storage_filter);

	$(item_filter).off('blur');
	$(item_filter).on('blur',function(event)
	{
		var batch_data="<product_instances>" +
			"<batch></batch>" +
			"<product_name exact='yes'>"+item_filter.value+"</product_name>" +
			"</product_instances>";
		set_my_value_list(batch_data,batch_filter);
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form94'))
		{
			var item=form.elements[1].value;
			var batch=form.elements[2].value;
			var quantity=form.elements[3].value;
			var storage=form.elements[4].value;
			var reason=form.elements[5].value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<discarded>" +
						"<id>"+data_id+"</id>" +
						"<product_name>"+item+"</product_name>" +
						"<batch>"+batch+"</batch>" +
						"<quantity>"+quantity+"</quantity>" +
						"<storage>"+storage+"</storage>"+
						"<reason>"+reason+"</reason>"+
						"<status>pending approval</status>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</discarded>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>discarded</tablename>" +
						"<link_to>form94</link_to>" +
						"<title>Discarded</title>" +
						"<notes>"+quantity+" of Batch number "+batch+" of item "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			create_row(data_xml,activity_xml);
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal40").dialog("close");
	});

	$("#modal40").dialog("open");
}

/**
 * @modal Close Payments
 * @modalNo 41
 */
function modal41_action(button)
{
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);

	var form=document.getElementById("modal41_form");

	var account_name=father_form.elements[0].value;
	var balance_display=father_form.elements[3].value;
	var balance=father_form.elements[8].value;

	form.elements[1].value=account_name;
	form.elements[2].value=balance_display;
	form.elements[3].setAttribute('max',balance);

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

		var counter_payment=parseFloat(form.elements[3].value);
		//console.log(counter_payment);
		var user_notes=form.elements[4].value;

		if(is_create_access('form11'))
		{
			var accounts_data="<payments>" +
					"<id></id>" +
					"<status exact='yes'>pending</status>" +
					"<acc_name exact='yes'>"+account_name+"</acc_name>" +
					"<type></type>" +
					"<date></date>" +
					"<total_amount></total_amount>" +
					"<paid_amount></paid_amount>" +
					"<notes></notes>" +
					"</payments>";

			fetch_requested_data('',accounts_data,function(accounts)
			{
				accounts.sort(function(a,b)
				{
					if(a.date>b.date)
					{	return 1;}
					else
					{	return -1;}
				});

				var total_received=0;
				var total_paid=0;
				for(var i=0;i<accounts.length;i++)
				{
					if(accounts[i].type=='paid')
					{
						total_paid=parseFloat(accounts[i].total_amount)-parseFloat(accounts[i].paid_amount);
					}
					else
					{
						total_received=parseFloat(accounts[i].total_amount)-parseFloat(accounts[i].paid_amount);
					}
				}

				if(total_received<total_paid)
				{
					total_received+=counter_payment;
				}
				else
				{
					total_paid+=counter_payment;
				}

				accounts.forEach(function(account)
				{
					if(total_received<total_paid)
					{
						if(account.type=='received')
						{
							var notes=account.notes+"\nClosed by balancing against other payables";
							var received_xml="<payments>" +
								"<id>"+account.id+"</id>" +
								"<paid_amount>"+account.total_amount+"</paid_amount>" +
								"<status>closed</status>" +
								"<notes>"+notes+"</notes>" +
								"<last_updated>"+get_my_time()+"</last_updated>" +
								"</payments>";
							if(is_online())
							{
								server_update_simple(received_xml);
							}
							else
							{
								local_update_simple(received_xml);
							}
						}
						else
						{
							var pending_amount=parseFloat(account.total_amount)-parseFloat(account.paid_amount);
							if(pending_amount<=total_received)
							{
								var notes=account.notes+"\n"+user_notes;
								var paid_xml="<payments>" +
									"<id>"+account.id+"</id>" +
									"<paid_amount>"+account.total_amount+"</paid_amount>" +
									"<status>closed</status>" +
									"<notes>"+notes+"</notes>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</payments>";
								if(is_online())
								{
									server_update_simple(paid_xml);
								}
								else
								{
									local_update_simple(paid_xml);
								}

								total_received-=pending_amount;
								total_paid-=pending_amount;
							}
							else
							{
								var paid_amount=parseFloat(account.paid_amount)+total_received;
								//console.log(paid_amount);
								var notes=account.notes+"\n Rs."+total_received+" balanced against other receivables and "+user_notes;
								var paid_xml="<payments>" +
									"<id>"+account.id+"</id>" +
									"<paid_amount>"+paid_amount+"</paid_amount>" +
									"<status>pending</status>" +
									"<notes>"+notes+"</notes>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</payments>";
								if(is_online())
								{
									server_update_simple(paid_xml);
								}
								else
								{
									local_update_simple(paid_xml);
								}

								total_received=0;
								total_paid=0;
							}
						}
					}
					else
					{
						if(account.type=='paid')
						{
							var notes=account.notes+"\nClosed by balancing other receivables";
							var paid_xml="<payments>" +
								"<id>"+account.id+"</id>" +
								"<paid_amount>"+account.total_amount+"</paid_amount>" +
								"<status>closed</status>" +
								"<notes>"+notes+"</notes>" +
								"<last_updated>"+get_my_time()+"</last_updated>" +
								"</payments>";
							if(is_online())
							{
								server_update_simple(paid_xml);
							}
							else
							{
								local_update_simple(paid_xml);
							}
						}
						else
						{
							var pending_amount=parseFloat(account.total_amount)-parseFloat(account.paid_amount);

							if(pending_amount<=total_paid)
							{
								var notes=account.notes+"\n"+user_notes;
								var received_xml="<payments>" +
									"<id>"+account.id+"</id>" +
									"<paid_amount>"+account.total_amount+"</paid_amount>" +
									"<status>closed</status>" +
									"<notes>"+notes+"</notes>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</payments>";
								if(is_online())
								{
									server_update_simple(received_xml);
								}
								else
								{
									local_update_simple(received_xml);
								}

								total_received-=pending_amount;
								total_paid-=pending_amount;
							}
							else
							{
								var paid_amount=parseFloat(account.paid_amount)+total_paid;
								var notes=account.notes+"\n Rs."+total_paid+" balanced against other payables "+user_notes;
								var received_xml="<payments>" +
									"<id>"+account.id+"</id>" +
									"<paid_amount>"+paid_amount+"</paid_amount>" +
									"<status>pending</status>" +
									"<notes>"+notes+"</notes>" +
									"<last_updated>"+get_my_time()+"</last_updated>" +
									"</payments>";
								if(is_online())
								{
									server_update_simple(received_xml);
								}
								else
								{
									local_update_simple(received_xml);
								}
								total_received=0;
								total_paid=0;
							}
						}
					}
				});
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal41").dialog("close");
	});

	$("#modal41").dialog("open");
}

/**
 * @modal Bill Type
 * @modalNo 42
 */
function modal42_action(order_id)
{
	var form=document.getElementById("modal42_form");
	var type_filter=form.elements[1];

	var type_data="<bill_types>" +
			"<name></name>" +
			"<status exact='yes'>active</status>" +
			"</bill_types>";
	set_my_value_list(type_data,type_filter);
	set_my_value(type_data,type_filter);

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		form108_bill(order_id,type_filter.value);
		//form108_bill(order_id,type_filter.value,order_num,sale_channel,customer,order_time);
		$("#modal42").dialog("close");
	});

	$("#modal42").dialog("open");
}

/**
 * @modal Add Project Task
 * @modalNo 43
 */
function modal43_action(date_initiated)
{
	var form=document.getElementById("modal43_form");
	var project_filter=form.elements['project'];
	var task_filter=form.elements['task'];
	var desc_filter=form.elements['desc'];
    var staff_filter=form.elements['assignee'];
	var due_filter=form.elements['due'];

	var project_data={data_store:'projects',return_column:'name'};
	set_my_value_list_json(project_data,project_filter);

	var staff_data={data_store:'staff',return_column:'acc_name'};
	set_my_value_list_json(staff_data,staff_filter);

	$(due_filter).vdatetimepicker();

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form104'))
		{
			var project=project_filter.value;
			var name=task_filter.value;
			var description=desc_filter.value;
			var assignee=staff_filter.value;
			var t_due=get_raw_time(due_filter.value);
			var data_id=get_new_key();
			var last_updated=get_my_time();
            var t_initiated=get_my_time();
            if(typeof date_initiated!='undefined')
            {
                t_initiated=get_raw_time(date_initiated);
            }

            var data_json={data_store:'task_instances',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'description',value:description},
                        {index:'source',value:'project'},
                        {index:'source_name',value:project},
                        {index:'assignee',value:assignee},
                        {index:'status',value:'pending'},
                        {index:'t_initiated',value:t_initiated},
                        {index:'t_due',value:t_due},
                        {index:'task_hours',value:'1'},
	 					{index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Added',notes:'Task '+name+' for '+assignee,link_to:'form104'}};

				create_json(data_json);
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal43_link").click();
}

/**
 * @modal Share
 * @modalNo 44
 */
function modal44_action(recipient,subject,message)
{
	show_loader();
	var form=document.getElementById("modal44_form");
	var client=form.elements[1];

	set_static_value_list('share','share_options',client);
	var sup_email_data="<suppliers>" +
			"<email></email>" +
			"<acc_name exact='yes'>"+recipient+"</acc_name>" +
			"</suppliers>";
	var cust_email_data="<customers>" +
			"<email></email>" +
			"<acc_name exact='yes'>"+recipient+"</acc_name>" +
			"</customers>";
	var staff_email_data="<staff>" +
			"<email></email>" +
			"<acc_name exact='yes'>"+recipient+"</acc_name>" +
			"</staff>";

	var email_data_array=[sup_email_data,cust_email_data,staff_email_data];
	message=encodeURIComponent(message);
	subject=encodeURIComponent(subject);

	get_single_column_data_array(email_data_array,function(email_results)
	{
		if(email_results.length>0)
		{
			form.elements[2].value=email_results[0];
		}
		form.elements[3].value=recipient;

		var whatsapp_link=document.createElement('a');
		whatsapp_link.setAttribute('href',"whatsapp://send?text="+message);
		whatsapp_link.setAttribute('target',"_blank");

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();

			var email=encodeURIComponent(form.elements[2].value);
			var gmail_string="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&su="+subject+"&to="+email+"&body="+message;
			var outlook_string="https://mail.live.com/default.aspx?rru=compose&to="+email+"&subject="+subject+"&body="+message;
			var yahoo_string="http://compose.mail.yahoo.com/?To="+email+"&Cc=&Bcc=&Subj="+subject+"&Body="+message;
			switch(client.value)
			{
				case 'gmail': window.open(gmail_string,'_blank');
								break;
				case 'outlook':	window.open(outlook_string,'_blank');
								break;
				case 'whatsapp': $(whatsapp_link).click();
								break;
				case 'yahoo': window.open(yahoo_string,'_blank');
								break;
			}
			$("#modal44").dialog("close");
		});

		$("#modal44").dialog("open");
		hide_loader();
	});

}


/**
 * @modalNo 45
 * @modal Add new loyalty program
 * @param button
 */
function modal45_action()
{
	var form=document.getElementById('modal45_form');

	var program_name=form.elements[1];
	var type=form.elements[2];
	var tier=form.elements[3];
	var tier_criteria_min=form.elements[4];
	var tier_criteria_max=form.elements[5];
	var redemption_criteria=form.elements[6];
	var points_addition=form.elements[7];
	var discount=form.elements[8];
	var cashback=form.elements[9];
	var reward_product=form.elements[10];
	var status=form.elements[11];

	var product_data="<product_master>" +
		"<name></name>" +
		"</product_master>";
	set_my_value_list(product_data,reward_product);
	set_static_value_list('loyalty_programs','type',type);
	set_static_value_list('loyalty_programs','status',status);
	$(discount).parent().hide();
	$(cashback).parent().hide();
	$(reward_product).parent().hide();
	$(redemption_criteria).parent().hide();

	$(type).off('blur');
	$(type).on('blur',function(event)
	{
		$(discount).parent().hide();
		$(cashback).parent().hide();
		$(reward_product).parent().hide();
		$(redemption_criteria).parent().hide();

		if(type.value=='cashback')
		{
			$(cashback).parent().show();
			$(redemption_criteria).parent().show();
		}
		else if(type.value=='discount')
		{
			$(discount).parent().show();
		}
		else if(type.value=='reward product')
		{
			$(reward_product).parent().show();
			$(redemption_criteria).parent().show();
		}
	});

	////adding attribute fields///////
	var attribute_label=document.getElementById('modal45_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"<status></status>" +
			"<value></value>"+
			"<object exact='yes'>loyalty program</object>" +
			"</mandatory_attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}
				else
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});


	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form116'))
		{
			var name_value=form.elements[1].value;
			var type_value=form.elements[2].value;
			var tier_value=form.elements[3].value;
			var tier_criteria_min_value=form.elements[4].value;
			var tier_criteria_max_value=form.elements[5].value;
			var redemption_criteria_value=form.elements[6].value;
			var points_addition_value=form.elements[7].value;
			var discount_value=form.elements[8].value;
			var cashback_value=form.elements[9].value;
			var reward_product_value=form.elements[10].value;
			var status_value=form.elements[11].value;
			var data_id=get_new_key();
			var last_updated=get_my_time();

			var data_xml="<loyalty_programs>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name_value+"</name>" +
						"<type>"+type_value+"</type>" +
						"<tier>"+tier_value+"</tier>" +
						"<tier_criteria_lower>"+tier_criteria_min_value+"</tier_criteria_lower>" +
						"<tier_criteria_upper>"+tier_criteria_max_value+"</tier_criteria_upper>" +
						"<redemption_criteria>"+redemption_criteria_value+"</redemption_criteria>" +
						"<points_addition>"+points_addition_value+"</points_addition>" +
						"<discount>"+discount_value+"</discount>" +
						"<cashback>"+cashback_value+"</cashback>" +
						"<reward_product>"+reward_product_value+"</reward_product>" +
						"<status>"+status_value+"</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</loyalty_programs>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>loyalty_programs</tablename>" +
						"<link_to>form116</link_to>" +
						"<title>Added</title>" +
						"<notes>Loyalty program "+name_value+" tier "+tier_value+"</notes>" +
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

			var id=get_new_key();
			$("#modal45_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				if(value!="")
				{
					var attribute=$(this).attr('name');
					var attribute_xml="<attributes>" +
							"<id>"+id+"</id>" +
							"<name>"+name_value+"</name>" +
							"<type>loyalty program</type>" +
							"<attribute>"+attribute+"</attribute>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</attributes>";
					if(is_online())
					{
						server_create_simple(attribute_xml);
					}
					else
					{
						local_create_simple(attribute_xml);
					}
				}
			});

			var customer_data="<customers>" +
						"<acc_name></acc_name>" +
						"</customers>";
			get_single_column_data(function(customers)
			{
				var customers_xml="<loyalty_customers>";
				var id=get_new_key();
				var counter=0;
				customers.forEach(function(customer)
				{
					if(counter==500)
					{
						counter=0;
						customers_xml+="</loyalty_customers><separator></separator><loyalty_customers>";
					}
					customers_xml+="<row>" +
							"<id>"+id+"</id>" +
							"<program_name>"+name_value+"</program_name>" +
							"<customer>"+customer+"</customer>" +
							"<tier>"+tier_value+"</tier>" +
							"<status>inactive</status>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</row>";
					id+=1;
					counter+=1;
				});
				customers_xml+="</loyalty_customers>";
				if(is_online())
				{
					server_create_batch(customers_xml);
				}
				else
				{
					local_create_batch(customers_xml);
				}
			},customer_data);
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal45").dialog("close");
	});
	$("#modal45").dialog("open");
}


/**
 * @modalNo 46
 * @modal Update Loyalty program
 * @param button
 */
function modal46_action(button)
{
	var form=document.getElementById('modal46_form');

	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);
	var fname=father_form.elements[0];
	var ftype=father_form.elements[1];
	var fdetail=father_form.elements[3];
	var fstatus=father_form.elements[4];
	var fdata_id=father_form.elements[5];
	var ftier_criteria_lower=father_form.elements[8];
	var ftier_criteria_upper=father_form.elements[9];
	var fpoint_addition=father_form.elements[10];
	var fdiscount=father_form.elements[11];
	var fcashback=father_form.elements[12];
	var freward_product=father_form.elements[13];
	var fredemption_criteria=father_form.elements[14];

	form.elements[1].value=ftier_criteria_lower.value;
	form.elements[2].value=ftier_criteria_upper.value;
	form.elements[4].value=fpoint_addition.value;
	form.elements[8].value=fstatus.value;

	var redemption_criteria=form.elements[3];
	redemption_criteria.value=fredemption_criteria.value;
	var discount=form.elements[5]
	discount.value=fdiscount.value;
	var cashback=form.elements[6];
	cashback.value=fcashback.value;
	var reward_product=form.elements[7];
	reward_product.value=freward_product.value;

	$(discount).parent().hide();
	$(cashback).parent().hide();
	$(reward_product).parent().hide();
	$(redemption_criteria).parent().hide();

	if(ftype.value=='cashback')
	{
		$(cashback).parent().show();
		$(redemption_criteria).parent().show();
	}
	else if(ftype.value=='discount')
	{
		$(discount).parent().show();
	}
	else if(ftype.value=='reward product')
	{
		$(reward_product).parent().show();
		$(redemption_criteria).parent().show();
	}

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form116'))
		{
			ftier_criteria_lower.value=form.elements[1].value;
			ftier_criteria_upper.value=form.elements[2].value;
			fredemption_criteria.value=form.elements[3].value;
			fpoint_addition.value=form.elements[4].value;
			fdiscount.value=form.elements[5].value;
			fcashback.value=form.elements[6].value;
			freward_product.value=form.elements[7].value;
			fstatus.value=form.elements[8].value;
			if(ftype.value=='cashback')
			{
				fdetail.value="Tier criteria: "+ftier_criteria_lower.value+"-"+ftier_criteria_upper.value+"\nPoints Addition: "+fpoint_addition.value+"\nCashback: "+fcashback.value+"\nRedemption Criteria: "+fredemption_criteria.value;
			}
			else if(ftype.value=='discount')
			{
				fdetail.value="Tier criteria: "+ftier_criteria_lower.value+"-"+ftier_criteria_upper.value+"\nPoints Addition: "+fpoint_addition.value+"\nDiscount: "+fdiscount.value;
			}
			else if(ftype.value=='reward product')
			{
				fdetail.value="Tier criteria: "+ftier_criteria_lower.value+"-"+ftier_criteria_upper.value+"\nPoints Addition: "+fpoint_addition.value+"\nReward Product: "+freward_product.value+"\nRedemption Criteria: "+fredemption_criteria.value;
			}

			var data_xml="<loyalty_programs>" +
					"<id>"+fdata_id.value+"</id>" +
					"<tier_criteria_lower>"+ftier_criteria_lower.value+"</tier_criteria_lower>" +
					"<tier_criteria_upper>"+ftier_criteria_upper.value+"</tier_criteria_upper>" +
					"<redemption_criteria>"+fredemption_criteria.value+"</redemption_criteria>" +
					"<points_addition>"+fpoint_addition.value+"</points_addition>" +
					"<discount>"+fdiscount.value+"</discount>" +
					"<cashback>"+fcashback.value+"</cashback>" +
					"<reward_product>"+freward_product.value+"</reward_product>" +
					"<status>"+fstatus.value+"</status>" +
					"<last_updated>"+get_my_time()+"</last_updated>" +
					"</loyalty_programs>";
			var activity_xml="<activity>" +
					"<data_id>"+fdata_id.value+"</data_id>" +
					"<tablename>loyalty_programs</tablename>" +
					"<link_to>form116</link_to>" +
					"<title>Updated</title>" +
					"<notes>Loyalty program "+fname.value+"</notes>" +
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
			$("#modal2_link").click();
		}
		$("#modal46").dialog("close");
	});

	$("#modal46").dialog("open");
}

/**
 * @modal Add Service Request
 * @modalNo 47
 */
function modal47_action(service_date)
{
	var form=document.getElementById("modal47_form");
	var id_filter=form.elements[1];
	var customer_filter=form.elements[2];
	var by_filter=form.elements[3];
	var problem_type_filter=form.elements[4];
	var problem_filter=form.elements[5];
	id_filter.value=get_my_time();
	by_filter.value=get_account_name();

	var customers_list_data="<customers>"+
							"<acc_name></acc_name>"+
							"</customers>";
	set_my_value_list(customers_list_data,customer_filter);

	var problem_type_data="<service_requests>"+
						"<problem_type></problem_type>"+
						"</service_requests>";
	set_my_filter(problem_type_data,problem_type_filter);

	var customer_data="<accounts count='1'>"+
					"<acc_name></acc_name>"+
					"<type exact='yes'>customer</type>"+
					"<username>"+get_username()+"</username>"+
					"</accounts>";
	get_single_column_data(function(customer_names)
	{
		if(customer_names.length>0)
		{
			customer_filter.value=customer_names[0];
			customer_filter.setAttribute('readonly','readonly');
		}
	},customer_data);

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form132'))
		{
			var data_id=id_filter.value;
			var customer=customer_filter.value;
			var reported_by=by_filter.value;
			var problem=problem_filter.value;
			var problem_type=problem_type_filter.value;
			var last_updated=get_my_time();
			var data_xml="<service_requests>" +
						"<id>"+data_id+"</id>" +
						"<customer>"+customer+"</customer>" +
						"<notes>"+problem+"</notes>" +
						"<problem_type>"+problem_type+"</problem_type>" +
						"<reported_by>"+reported_by+"</reported_by>" +
						"<reported_time>"+last_updated+"</reported_time>" +
						"<start_time>"+get_raw_time(service_date)+"</start_time>" +
						"<end_time>"+(get_raw_time(service_date)+86400000)+"</end_time>" +
						"<status>open</status>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</service_requests>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>service_requests</tablename>" +
						"<link_to>form128</link_to>" +
						"<title>Added</title>" +
						"<notes>Service request from customer "+customer+"</notes>" +
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
			$("#modal2_link").click();
		}
		$("#modal47").dialog("close");
	});

	$("#modal47").dialog("open");
}


/**
 * @modal Add Solution
 * @modalNo 48
 */
function modal48_action(issue_id)
{
	var form=document.getElementById("modal48_form");
	var issue_filter=form.elements[1];
	var solution_filter=form.elements[2];
	issue_filter.value=issue_id;

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form126'))
		{
			var solution=form.elements[2].value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<solutions>" +
						"<id>"+data_id+"</id>" +
						"<issue_id>"+issue_id+"</issue_id>" +
						"<detail>"+solution+"</detail>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</solutions>";
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
			$("#modal2_link").click();
		}
		$("#modal48").dialog("close");
	});

	$("#modal48").dialog("open");
}


/**
 * @modal Add Issue
 * @modalNo 49
 */
function modal49_action(issue_id)
{
	var form=document.getElementById("modal49_form");
	var issue_filter=form.elements[1];
	var short_filter=form.elements[2];
	var detail_filter=form.elements[3];
	issue_filter.value=get_my_time();

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form126'))
		{
			var issue_id=form.elements[1].value;
			var short_desc=form.elements[2].value;
			var detail=form.elements[3].value;
			var last_updated=get_my_time();
			var data_xml="<issues>" +
						"<id>"+issue_id+"</id>" +
						"<short_desc>"+short_desc+"</short_desc>" +
						"<detail>"+detail+"</detail>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</issues>";
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
			$("#modal2_link").click();
		}
		$("#modal49").dialog("close");
	});

	$("#modal49").dialog("open");
}


/**
 * @modal Sending Mails
 * @modalNo 50
 */
function modal50_action()
{
	show_loader();
	var form=document.getElementById("form78_master");
	var nl_name=form.elements[1].value;
	var sms_content=form.elements[2].value;
	var nl_id=form.elements[3].value;

	print_newsletter(nl_name,nl_id,'mail',function(container)
	{
		var business_title=get_session_var('title');
		var subject=nl_name;

		var email_id_string="";
		var email_message=container.innerHTML;
		var from=get_session_var('email');
		var to_array=[];

		$("[id^='row_form78_']").each(function(index)
		{
			var form_id=$(this).attr('id');
			var form=document.getElementById(form_id);

			if(form.elements[3].checked)
			{
				var customer_email=form.elements[1].value;
				var customer_phone=form.elements[2].value;
				var customer_name=form.elements[4].value;
				var customer_id=form.elements[5].value;
				var message=sms_content.replace(/customer_name/g,customer_name);
				message=message.replace(/business_title/g,business_title);

				send_sms(customer_phone,message,'transaction');
				if(customer_email!="")
				{
					var to={"email":customer_email,"name":customer_name,"customer_id":customer_id};
					to_array.push(to);
				}
			}
		});

		var email_to=JSON.stringify(to_array);
		send_email(email_to,from,business_title,subject,email_message,function()
		{
			$("#modal58_link").click();
			hide_loader();
		});
	});
}


/**
 * @modalNo 53
 * @modal Scheme to customer
 */
function modal53_action(item_name,customer)
{
	var bills_data="<bills>" +
			"<id></id>" +
			"<customer_name exact='yes'>"+customer+"</customer_name>" +
			"</bills>";
	get_single_column_data(function(bills)
	{
		var bill_id_string="--";
		for(var i in bills)
		{
			bill_id_string+=bills[i]+"--";
		}

		var bill_items_data="<bill_items count='5'>" +
				"<id></id>" +
				"<item_name exact='yes'>"+item_name+"</item_name>" +
				"<p_quantity></p_quantity>" +
				"<f_quantity></f_quantity>" +
				"<batch></batch>" +
				"<bill_id array='yes'>"+bill_id_string+"</bill_id>" +
				"</bill_items>";
		fetch_requested_data('',bill_items_data,function(bill_items)
		{
			var item_table=document.getElementById("modal53_table");
			item_table.innerHTML="";
			var item_head=document.createElement('tr');
			item_head.innerHTML="<th>Batch</th><th>Quantity</th>";
			item_table.appendChild(item_head);
			bill_items.forEach(function(bill_item)
			{
				var item_row=document.createElement('tr');
				item_row.innerHTML="<td>"+bill_item.batch+"</td><td>"+bill_item.p_quantity+"+"+bill_item.f_quantity+"</td>";
				item_table.appendChild(item_row);
			});

			$("#modal53").dialog("open");
		});
	},bills_data);
}

/**
 * @modalNo 54
 * @modal Scheme from suppliers
 */
function modal54_action(item_name)
{
	var bill_items_data="<supplier_bill_items count='5'>" +
			"<id></id>" +
			"<product_name exact='yes'>"+item_name+"</product_name>" +
			"<p_quantity></p_quantity>" +
			"<f_quantity></f_quantity>" +
			"<batch></batch>" +
			"</supplier_bill_items>";
	fetch_requested_data('',bill_items_data,function(bill_items)
	{
		var item_table=document.getElementById("modal54_table");
		item_table.innerHTML="";
		var item_head=document.createElement('tr');
		item_head.innerHTML="<th>Batch</th><th>Quantity</th>";
		item_table.appendChild(item_head);
		bill_items.forEach(function(bill_item)
		{
			var item_row=document.createElement('tr');
			item_row.innerHTML="<td>"+bill_item.batch+"</td><td>"+bill_item.p_quantity+"+"+bill_item.f_quantity+"</td>";
			item_table.appendChild(item_row);
		});
	});
	////////////////////////////////////////////////

	$("#modal54").dialog("open");
}

/**
 * @modalNo 57
 * @modal Pricing History
 */
function modal57_action(item_name,customer)
{
	var bills_data="<bills>" +
			"<id></id>" +
			"<customer_name exact='yes'>"+customer+"</customer_name>" +
			"</bills>";
	get_single_column_data(function(bills)
	{
		var bill_id_string="--";
		for(var i in bills)
		{
			bill_id_string+=bills[i]+"--";
		}

		var bill_items_data="<bill_items count='5'>" +
				"<id></id>" +
				"<item_name exact='yes'>"+item_name+"</item_name>" +
				"<quantity></quantity>" +
				"<total></total>" +
				"<bill_id array='yes'>"+bill_id_string+"</bill_id>" +
				"</bill_items>";
		fetch_requested_data('',bill_items_data,function(bill_items)
		{
			var item_table=document.getElementById("modal57_bill_table");
			item_table.innerHTML="";
			var item_head=document.createElement('tr');
			item_head.innerHTML="<th>Quantity</th><th>Total</th>";
			item_table.appendChild(item_head);
			bill_items.forEach(function(bill_item)
			{
				var item_row=document.createElement('tr');
				item_row.innerHTML="<td>"+bill_item.quantity+"</td><td>"+bill_item.total+"</td>";
				item_table.appendChild(item_row);
			});
		});
	},bills_data);

	var quot_data="<quotation>" +
			"<id></id>" +
			"<customer exact='yes'>"+customer+"</customer>" +
			"</quotation>";
	get_single_column_data(function(quots)
	{
		var quot_id_string="--";
		for(var i in quots)
		{
			quot_id_string+=quots[i]+"--";
		}

		var quot_items_data="<quotation_items count='5'>" +
				"<id></id>" +
				"<item_name exact='yes'>"+item_name+"</item_name>" +
				"<quantity></quantity>" +
				"<total></total>" +
				"<quotation_id array='yes'>"+quot_id_string+"</quotation_id>" +
				"</quotation_items>";
		fetch_requested_data('',quot_items_data,function(quot_items)
		{
			var item_table=document.getElementById("modal57_quot_table");
			item_table.innerHTML="";
			var item_head=document.createElement('tr');
			item_head.innerHTML="<th>Quantity</th><th>Total</th>";
			item_table.appendChild(item_head);
			quot_items.forEach(function(quot_item)
			{
				var item_row=document.createElement('tr');
				item_row.innerHTML="<td>"+quot_item.quantity+"</td><td>"+quot_item.total+"</td>";
				item_table.appendChild(item_row);
			});
		});
	},quot_data);

	$("#modal57").dialog("open");
}

/**
 * @modalNo 83
 * @modal Store Inventory
 */
function modal83_action(item_name)
{
	var utilization_json=new Object();
		utilization_json.data_store='area_utilization';
		utilization_json.return_column='name';
		utilization_json.indexes=[{index:'item_name',exact:item_name}];

	read_json_single_column(utilization_json,function (areas)
	{
		var item_table=document.getElementById("modal83_inventory_table");
		item_table.innerHTML="";
		var item_head=document.createElement('tr');
		item_head.innerHTML="<th>Storage</th><th>Quantity</th>";
		item_table.appendChild(item_head);
		areas.forEach(function(area)
		{
			var item_row=document.createElement('tr');
			get_store_inventory(area,item_name,'',function(inventory)
			{
				item_row.innerHTML="<td>"+area+"</td><td>"+inventory+"</td>";
				item_table.appendChild(item_row);
			});
		});
	});
	$("#modal83").dialog("open");
}

/**
 * @modalNo 84
 * @modal Design Preview
 */
function modal84_action(html_code,id)
{
	var doc_columns=new Object();
		doc_columns.data_store='documents';
		doc_columns.indexes=[{index:'id'},
							{index:'url'},
							{index:'doc_name'},
							{index:'doc_type',exact:'newsletter_components'},
							{index:'target_id',exact:id}];

	read_json_rows('',doc_columns,function(doc_results)
	{
		var docHTML="";
		doc_results.forEach(function (doc)
		{
			var updated_url=doc.url.replace(/ /g,"+");
			var replace_word="{{"+doc.doc_name+"}}";
			var re=new RegExp(replace_word,"g");
			html_code=html_code.replace(re,updated_url);
		});
		$('#modal84_preview').html(html_code);
	});

	$("#modal84").dialog("open");
}

/**
 * @modal Email documents
 * @modalNo 101
 */
function modal101_action(doc_type,person,person_type,func,attachment_type,message_attachment)
{
	show_loader();
	var form=document.getElementById('modal101_form');

	func(function(container)
	{
		var business_title=get_session_var('title');

		var email_message=container.innerHTML;
		var from=get_session_var('email');

		var person_filter=form.elements['to'];
		$(person_filter).off('blur');
		form.elements['subject'].value=doc_type;

		$("#modal101_link").click();

		if(person!="")
		{
			var email_id_xml={data_store:'suppliers',
                      indexes:[{index:'email'},{index:'name'},{index:'acc_name',exact:person}]};
			if(person_type=='customer')
			{
    			email_id_xml.data_store='customers';
			}
			else if(person_type=='staff')
			{
    			email_id_xml.data_store='staff';
			}

			read_json_rows('',email_id_xml,function(emails)
			{
				if(emails.length>0)
				{
					form.elements['to'].value=person;
					form.elements['email'].value=emails[0].email;
					form.elements['acc_name'].value=emails[0].name;
				}
				$('#modal101').formcontrol();
				hide_loader();
			});
		}
		else
		{
			var person_xml={data_store:'suppliers',return_column:'acc_name'};
			if(person_type=='customer')
			{
                person_xml.data_store='customers';
			}
			else if(person_type=='staff')
			{
                person_xml.data_store='staff';
			}

			person_filter.removeAttribute('readonly');

			set_my_value_list_func(person_xml,person_filter,function ()
			{
				$(person_filter).focus();
			});

			$(person_filter).on('blur',function ()
			{
				var email_id_xml={data_store:'suppliers',count:1,
                                 indexes:[{index:'email'},{index:'name'},{index:'acc_name',exact:person_filter.value}]};
				if(person_type=='customer')
				{
                    email_id_xml.data_store='customers';
				}
				else if(person_type=='staff')
				{
                    email_id_xml.data_store='staff';
				}
				read_json_rows('',email_id_xml,function(emails)
				{
					form.elements['email'].value=emails[0].email;
					form.elements['acc_name'].value=emails[0].name;
				});
			});
			$('#modal101').formcontrol();
			hide_loader();
		}

		$(form).off("submit");
		$(form).on("submit",function(event)
		{
			event.preventDefault();
			show_loader();
            var to_array=form.elements['email'].value.split(';');
			var receiver_array=[];

		    to_array.forEach(function(to)
		    {
		     	var receiver={"email":to,"name":form.elements['acc_name'].value};
		     	receiver_array.push(receiver);
		    });

			var receiver=JSON.stringify(receiver_array);
			var sub=form.elements[3].value;

			if(typeof attachment_type!='undefined')
			{
				//console.log(message_attachment);
				send_email_attachment(receiver,from,business_title,sub,email_message,message_attachment,'csv',function()
				{
					hide_loader();
				});
			}
			else
			{
        		send_email(receiver,from,business_title,sub,email_message,function()
				{
					hide_loader();
				});
			}
			$(form).find(".close").click();
		});
	});
}

/**
 * @modalNo 102
 * @modal re-assign service request
 * @param button
 */
function modal102_action(request_id)
{
	var form=document.getElementById('modal102_form');

	var request_id=form.elements[1];
	var assignee_filter=form.elements[2];

	var request_data="<service_requests count='1'>"+
						"<assignee></assignee>"+
						"<id>"+request_id+"</id>"+
						"</service_requests>";
	set_my_value(request_data,assignee_filter);

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var assignee=assignee_filter.value;
		var last_updated=get_my_time();

		var request_xml="<service_requests>" +
					"<id>"+request_id+"</id>" +
					"<assignee>"+assignee+"</assignee>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_requests>";
		if(is_online())
		{
			server_update_simple(request_xml);
		}
		else
		{
			local_update_simple(request_xml);
		}

		$("#modal102").dialog("close");
	});

	$("#modal102").dialog("open");
}

/**
 * @modalNo 103
 * @modal close service request
 * @param button
 */
function modal103_action(button)
{
	var form=document.getElementById('modal103_form');

	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);

	var request_id=father_form.elements[0].value;
	form.elements[1].value=request_id;
	var closing_filter=form.elements[2];
	var status_filter=form.elements[3];

	set_static_value_list('service_requests','status',status_filter);
	var request_data="<service_requests count='1'>"+
						"<id>"+request_id+"</id>"+
						"<closing_notes></closing_notes>"+
						"<status></status>"+
						"</service_requests>";
	fetch_requested_data('',request_data,function(requests)
	{
		if(requests.length>0)
		{
			closing_filter.value=requests[0].closing_notes;
			status_filter.value=requests[0].status;
		}
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var closing_notes=closing_filter.value;
		var status=status_filter.value;
		var last_updated=get_my_time();
		father_form.elements[3].value=status;

		var request_xml="<service_requests>" +
					"<id>"+request_id+"</id>" +
					"<closing_notes>"+closing_notes+"</closing_notes>"+
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_requests>";
		if(is_online())
		{
			server_update_simple(request_xml);
		}
		else
		{
			local_update_simple(request_xml);
		}

		$("#modal103").dialog("close");
	});

	$("#modal103").dialog("open");
}

/**
 * @modalNo 104
 * @modal close machine service
 * @param button
 */
function modal104_action(button)
{
	var form_id=$(button).attr('form');
	var father_form=document.getElementById(form_id);

	var machine_name=father_form.elements[1].value;
	var data_id=father_form.elements[5].value;

	var form=document.getElementById('modal104_form');
	form.elements[1].value=machine_name;
	var closing_filter=form.elements[2];
	var status_filter=form.elements[3];

	set_static_value_list('service_request_machines','status',status_filter);
	var request_data="<service_request_machines count='1'>"+
						"<id>"+data_id+"</id>"+
						"<closing_notes></closing_notes>"+
						"<status></status>"+
						"</service_request_machines>";
	fetch_requested_data('',request_data,function(requests)
	{
		if(requests.length>0)
		{
			closing_filter.value=requests[0].closing_notes;
			status_filter.value=requests[0].status;
		}
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var closing_notes=closing_filter.value;
		var status=status_filter.value;
		var last_updated=get_my_time();
		father_form.elements[4].value=status;
		father_form.elements[3].value=closing_notes;

		var request_xml="<service_request_machines>" +
					"<id>"+data_id+"</id>" +
					"<closing_notes>"+closing_notes+"</closing_notes>"+
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_request_machines>";
		if(is_online())
		{
			server_update_simple(request_xml);
		}
		else
		{
			local_update_simple(request_xml);
		}
		$("#modal104").dialog("close");
	});

	$("#modal104").dialog("open");
}


/**
 * @modalNo 105
 * @modal Add project phase
 * @param button
 */
function modal105_action(project_id)
{
	var form=document.getElementById('modal105_form');

	var start_filter=form.elements[3];
	var due_filter=form.elements[4];
	var status_filter=form.elements[5];

	$(start_filter).datepicker();
	$(due_filter).datepicker();
	set_static_value_list('project_phases','status',status_filter);

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();

		var phase=form.elements[1].value;
		var details=form.elements[2].value;
		var start_date=get_raw_time(form.elements[3].value);
		var due_date=get_raw_time(form.elements[4].value);
		var status=form.elements[5].value;
		var data_id=get_new_key();
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
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}

		$("#modal105").dialog("close");
	});

	$("#modal105").dialog("open");
}

/**
 * @modalNo 107
 * @modal Update project phase
 * @param button
 */
function modal107_action(data_id)
{
	var form=document.getElementById('modal107_form');

	var start_filter=form.elements[3];
	var due_filter=form.elements[4];
	var status_filter=form.elements[5];

	$(start_filter).datepicker();
	$(due_filter).datepicker();
	set_static_value_list('project_phases','status',status_filter);

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();

		var phase=form.elements[1].value;
		var details=form.elements[2].value;
		var start_date=get_raw_time(form.elements[3].value);
		var due_date=get_raw_time(form.elements[4].value);
		var status=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<project_phases>" +
					"<id>"+data_id+"</id>" +
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
		$("#modal107").dialog("close");
	});

	var phase_data="<project_phases count='1'>"+
						"<id>"+data_id+"</id>"+
						"<phase_name></phase_name>"+
						"<details></details>"+
						"<start_date></start_date>"+
						"<due_date></due_date>"+
						"<status></status>"+
						"</project_phases>";
	fetch_requested_data('',phase_data,function(phases)
	{
		phases.forEach(function(phase)
		{
			form.elements[1].value=phase.phase_name;
			form.elements[2].value=phase.details;
			form.elements[3].value=get_my_past_date(phase.start_date);
			form.elements[4].value=get_my_past_date(phase.due_date);
			form.elements[5].value=phase.status;
		});
		$("#modal107").dialog("open");
	});
}

/**
 * @modalNo 108
 * @modal Workflow Assignees (Record level)
 * @param button
 */
function modal108_action(tablename,record_id)
{
	var form=document.getElementById('modal108_form');

	var type_filter=form.elements[1];
	var user_type_filter=form.elements[2];
	var user_filter=form.elements[3];
	var user_field_filter=form.elements[4];
	var field_filter=form.elements[5];
	var value_filter=form.elements[6];

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

	set_static_value_list('data_access','access_type',type_filter);

	var user_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	set_my_value_list(user_data,user_filter);

	var field_data="<user_fields_list>"+
				"<field_name></field_name>"+
				"<tablename exact='yes'>"+tablename+"</tablename>"+
				"</user_fields_list>";
	set_my_value_list(field_data,user_filter);

	var field_data="<data_access>" +
			"<criteria_field></criteria_field>" +
			"<tablename exact='yes'>"+tablename+"</tablename>" +
			"</data_access>";
	set_my_filter(field_data,field_filter);

	$(type_filter).focus();

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();

		var access_type=form.elements[1].value;
		var user_type=form.elements[2].value;
		var user=form.elements[3].value;
		var user_field=form.elements[4].value;
		var criteria_field=form.elements[5].value;
		var criteria_value=form.elements[6].value;
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var data_xml="<data_access>" +
					"<id>"+data_id+"</id>" +
					"<tablename>"+tablename+"</tablename>" +
					"<record_id>"+record_id+"</record_id>" +
					"<access_type>"+access_type+"</access_type>" +
					"<user_type>"+user_type+"</user_type>" +
					"<user>"+user+"</user>" +
					"<user_field>"+user_field+"</user_field>" +
					"<criteria_field>"+criteria_field+"</criteria_field>" +
					"<criteria_value>"+criteria_value+"</criteria_value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</data_access>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}

		$("#modal108").dialog("close");
	});
	$("#modal108").dialog("open");

}

/**
 * @modalNo 109
 * @modal Workflow Assignees
 * @param button
 */
function modal109_action(tablename)
{
	var form=document.getElementById('modal109_form');

	var type_filter=form.elements[1];
	var user_type_filter=form.elements[2];
	var user_filter=form.elements[3];
	var user_field_filter=form.elements[4];
	var field_filter=form.elements[5];
	var value_filter=form.elements[6];

	$(user_field_filter).parent().hide();

	$(user_type_filter).off('blur');
	$(user_type_filter).on('blur',function()
	{
		$(user_filter).parent().hide();
		$(user_field_filter).parent().hide();

		if(user_type_filter.value=='user')
		{
			$(user_filter).parent().show();
		}
		else if(user_type_filter.value=='field')
		{
			$(user_field_filter).parent().show();
		}
	});

	set_static_value_list('data_access','access_type',type_filter);

	var user_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	set_my_value_list(user_data,user_filter);

	var field_data="<user_fields_list>"+
				"<field_name></field_name>"+
				"<tablename exact='yes'>"+tablename+"</tablename>"+
				"</user_fields_list>";
	set_my_value_list(field_data,user_filter);

	var field_data="<data_access>" +
				"<criteria_field></criteria_field>" +
				"<tablename exact='yes'>"+tablename+"</tablename>" +
				"</data_access>";
	set_my_filter(field_data,field_filter);

	$(type_filter).focus();

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();

		var access_type=form.elements[1].value;
		var user_type=form.elements[2].value;
		var user=form.elements[3].value;
		var user_field=form.elements[4].value;
		var criteria_field=form.elements[5].value;
		var criteria_value=form.elements[6].value;
		var data_id=get_new_key();
		var last_updated=get_my_time();
		var data_xml="<data_access>" +
					"<id>"+data_id+"</id>" +
					"<tablename>"+tablename+"</tablename>" +
					"<record_id>all</record_id>" +
					"<access_type>"+access_type+"</access_type>" +
					"<user_type>"+user_type+"</user_type>" +
					"<user>"+user+"</user>" +
					"<user_field>"+user_field+"</user_field>" +
					"<criteria_field>"+criteria_field+"</criteria_field>" +
					"<criteria_value>"+criteria_value+"</criteria_value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</data_access>";
		if(is_online())
		{
			server_create_simple(data_xml);
		}
		else
		{
			local_create_simple(data_xml);
		}

		$("#modal109").dialog("close");
	});

	$("#modal109").dialog("open");

}

/**
 * @modalNo 110
 * @modal Add to inventory
 * @param button
 */
function modal110_action(button)
{
	var form_id=$(button).attr('form');
	var master_form=document.getElementById(form_id);
	var product_name=master_form.elements[0].value;
	var batch=master_form.elements[1].value;
	var quantity=master_form.elements[2].value;
	var data_id=master_form.elements[5].value;

	var form=document.getElementById('modal110_form');

	var manu_filter=form.elements[1];
	var expiry_filter=form.elements[2];
	var store_filter=form.elements[5];

	var store_data="<store_areas>"+
					"<name></name>"+
					"<area_type exact='yes'>storage</area_type>"+
					"</store_areas>";
	set_my_value_list(store_data,store_filter);

	$(manu_filter).datepicker();
	$(expiry_filter).datepicker();
	$(manu_filter).focus();

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();

		master_form.elements[4].value='completed';
		var last_updated=get_my_time();
		var manu_date=get_raw_time(form.elements[1].value);
		var expiry_date=get_raw_time(form.elements[2].value);
		var cost_price=form.elements[3].value;
		var sale_price=form.elements[4].value;
		var store=form.elements[5].value;
		var id=get_new_key();
		var data_xml="<manufacturing_schedule>" +
					"<id>"+data_id+"</id>" +
					"<status>completed</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</manufacturing_schedule>";
		var inventory_xml="<inventory_adjust>"+
					"<id>"+id+"</id>"+
					"<product_name>"+product_name+"</product_name>"+
					"<batch>"+batch+"</batch>"+
					"<quantity>"+quantity+"</quantity>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</inventory_adjust>";
		var area_xml="<area_utilization>"+
					"<id>"+id+"</id>"+
					"<item_name>"+product_name+"</item_name>"+
					"<batch>"+batch+"</batch>"+
					"<name>"+store+"</name>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</area_utilization>";
		var instances_xml="<product_instances>" +
					"<id>"+id+"</id>" +
					"<product_name>"+product_name+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<expiry>"+expiry_date+"</expiry>" +
					"<manufacture_date>"+manu_date+"</manufacture_date>" +
					"<cost_price>"+cost_price+"</cost_price>" +
					"<sale_price>"+sale_price+"</sale_price>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</product_instances>";
		var store_owner_xml="<store_areas>"+
							"<owner></owner>"+
							"<name exact='yes'>"+store+"</name>"+
							"</store_areas>";
		get_single_column_data(function(owners)
		{
			if(owners.length>0)
			{
				var store_xml="<store_movement>"+
					"<id>"+get_new_key()+"</id>"+
					"<item_name>"+product_name+"</item_name>"+
					"<batch>"+batch+"</batch>"+
					"<quantity>"+quantity+"</quantity>"+
					"<target>"+store+"</target>"+
					"<source>manufacturing</source>"+
					"<receiver>"+owners[0]+"</receiver>"+
					"<status>received</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</store_movement>";
				if(is_online())
				{
					server_create_simple(store_xml);
				}
				else
				{
					local_create_simple(store_xml);
				}
			}
		},store_owner_xml);

		////adding sale price fields for all billing types///////
		var billing_type_data="<bill_types>" +
			"<name></name>" +
			"<status exact='yes'>active</status>" +
			"</bill_types>";
		get_single_column_data(function(bill_types)
		{
			var i=1;
			bill_types.forEach(function (bill_type)
			{
				i++;
				var sale_price_xml="<sale_prices>" +
						"<id>"+(id+i)+"</id>" +
						"<product_name>"+product_name+"</product_name>" +
						"<batch>"+batch+"</batch>" +
						"<sale_price>"+sale_price+"</sale_price>" +
						"<pi_id>"+id+"</pi_id>" +
						"<billing_type>"+bill_type+"</billing_type>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</sale_prices>";
				if(is_online())
				{
					server_create_simple(sale_price_xml);
				}
				else
				{
					local_create_simple(sale_price_xml);
				}
			});
		},billing_type_data);

		if(is_online())
		{
			server_update_simple(data_xml);
			server_create_simple(inventory_xml);
			server_create_simple(instances_xml);
			server_create_simple(area_xml);
		}
		else
		{
			local_update_simple(data_xml);
			local_create_simple(inventory_xml);
			local_create_simple(instances_xml);
			local_create_simple(area_xml);
		}

		$("#modal110").dialog("close");
	});

	$("#modal110").dialog("open");
}

/**
 * @modalNo 111
 * @modal Log Location
 * @param button
 */
function modal111_action()
{
	if(navigator && navigator.geolocation)
	{
		show_loader();
		navigator.geolocation.getCurrentPosition(function(position)
		{
			var form=document.getElementById('modal111_form');
			var flocation=form.elements[1];
			var fname=form.elements[2];
			var ftime=form.elements[3];
			var flat=form.elements[4];
			var flng=form.elements[5];

			ftime.value=get_my_datetime();
			fname.value=get_account_name();
			flat.value=position.coords.latitude;
			flng.value=position.coords.longitude;

			$(form).off("submit");
			$(form).on("submit",function(event)
			{
				event.preventDefault();

				var data_id=get_new_key();
				var last_updated=get_my_time();
				var data_xml="<location_history>" +
							"<id>"+data_id+"</id>" +
							"<acc_name>"+fname.value+"</acc_name>" +
							"<lat>"+flat.value+"</lat>" +
							"<lng>"+flng.value+"</lng>" +
							"<location>"+flocation.value+"</location>" +
							"<log_time>"+get_raw_time(ftime.value)+"</log_time>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</location_history>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>location_history</tablename>" +
							"<link_to>form86</link_to>" +
							"<title>Logged</title>" +
							"<notes>Location for user "+fname.value+"</notes>" +
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

				$("#modal111").dialog("close");
			});
			hide_loader();
			$("#modal111").dialog("open");
		},function()
		{
			$("#modal56_link").click();
			console.log('error in getting geo-location');
			hide_loader();
		});
	}
}

/**
 * @modalNo 112
 * @modal Add new product
 * @param button
 */
function modal112_action(func)
{
	var form=document.getElementById('modal112_form');

	var fname=form.elements['name'];
	var fmake=form.elements['make'];
	var fdescription=form.elements['desc'];


	var make_data={data_store:'product_master',return_column:'make'};
	set_my_filter_json(make_data,fmake);

	////adding attribute fields///////
	var attribute_label=document.getElementById('modal112_attributes');
	attribute_label.innerHTML="";
	var attributes_data={data_store:'mandatory_attributes',
                        indexes:[{index:'attribute'},{index:'status'},{index:'value'},{index:'object',exact:'product'}]};
	read_json_rows('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
            if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required';
				var attr_label=document.createElement('div');
				attr_label.setAttribute('class','row');
				if(attribute.value=="")
				{
					attr_label.innerHTML="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><input type='text' "+required+" name='"+attribute.attribute+"'></div>";
				}
				else
				{
					var values_array=attribute.value.split(";");
					var content="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><select "+required+" name='"+attribute.attribute+"'>";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select></div>";
					attr_label.innerHTML=content;
				}
				attribute_label.appendChild(attr_label);
			}
		});
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form39'))
		{
			var name=form.elements['name'].value;
			var make=form.elements['make'].value;
			var description=form.elements['desc'].value;

			var tax=form.elements['tax'].value;
			var data_id=get_new_key();
			var cost_price=form.elements['cost'].value;
      var sale_price=form.elements['sale'].value;
			var last_updated=get_my_time();
      var indexes=name.split(/[\s,]+/);
      var description_indexes=description.split(/[\s,]+/);
      var make_indexes=make.split(/[\s,]+/);
      var new_indexes=indexes.concat(description_indexes,make_indexes);
      var anew_indexes=vUtil.arrayUnique(new_indexes);
      var index_string=JSON.stringify(anew_indexes);

      var data_json={data_store:'product_master',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'make',value:make},
	 					{index:'description',value:description},
	 					{index:'tax',value:tax},
            {index:'indexes',value:index_string},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Product '+name+' to inventory',link_to:'form39'}};

            create_json(data_json,func);

        var instance_json={data_store:'product_instances',
	 				data:[{index:'id',value:data_id},
	 					{index:'product_name',value:name,uniqueWith:['batch']},
	 					{index:'batch',value:name},
	 					{index:'cost_price',value:cost_price},
	 					{index:'sale_price',value:sale_price},
	 					{index:'last_updated',value:last_updated}]};
			create_json(instance_json);

			var billing_type_data={data_store:'bill_types',return_column:'name',indexes:[{index:'status',exact:'active'}]};
			read_json_single_column(billing_type_data,function(bill_types)
			{
                var id=get_new_key();
				bill_types.forEach(function(bill_type)
				{
					id++;
					var sale_price_json={data_store:'sale_prices',
	 				data:[{index:'id',value:id},
	 					{index:'product_name',value:name},
	 					{index:'batch',value:name},
	 					{index:'sale_price',value:sale_price},
	 					{index:'pi_id',value:data_id},
                        {index:'billing_type',value:bill_type},
	 					{index:'last_updated',value:last_updated}]};
					create_json(sale_price_json);
				});
			});


			var id=get_new_key();
            $("#modal112_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				var attribute=$(this).attr('name');
				if(value!="")
				{
					var attribute_json={data_store:'attributes',
	 				data:[{index:'id',value:id},
	 					{index:'name',value:name},
	 					{index:'type',value:'product'},
	 					{index:'attribute',value:attribute},
	 					{index:'value',value:value},
	 					{index:'last_updated',value:last_updated}]};
					create_json(attribute_json);
				}
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal112_link").click();
}


/**
 * @modal Add Store Area (Nikki)
 * @modalNo 113
 */
function modal113_action(func)
{
	var form=document.getElementById("modal113_form");
	var area_type_filter=form.elements[2];
	var parent_filter=form.elements[3];
	var owner_filter=form.elements[4];
	var length_filter=form.elements[5];
	var breadth_filter=form.elements[6];
	var height_filter=form.elements[7];
	var unit_filter=form.elements[8];

	var owner_data="<staff>"+
				"<acc_name></acc_name>"+
				"</staff>";
	set_my_value_list(owner_data,owner_filter);

	var type_data="<storage_structure>"+
				"<name></name>"+
				"</storage_structure>";
	set_my_value_list(type_data,area_type_filter);

	set_static_value_list('dimensions','unit',unit_filter);

	$(area_type_filter).off('blur');
	$(area_type_filter).on('blur',function ()
	{
		var storage_parent="<storage_structure>"+
						"<parent></parent>"+
						"<name exact='yes'>"+area_type_filter.value+"</name>"+
						"<len></len>"+
						"<breadth></breadth>"+
						"<height></height>"+
						"<unit></unit>"+
						"</storage_structure>";
		fetch_requested_data('',storage_parent,function(parents)
		{
			if(parents.length>0)
			{
				var parent_data="<store_areas>"+
						"<name></name>"+
						"<area_type exact='yes'>"+parents[0].parent+"</area_type>"+
						"</store_areas>";
				set_my_value_list(parent_data,parent_filter);

				length_filter.value=parents[0].len;
				breadth_filter.value=parents[0].breadth;
				height_filter.value=parents[0].height;
				unit_filter.value=parents[0].unit;
			}
		},storage_parent);
	});

	////adding attribute fields///////
	var attribute_label=document.getElementById('modal113_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"<status></status>" +
			"<value></value>"+
			"<object exact='yes'>storage</object>" +
			"</mandatory_attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}
				else
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});


	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form170'))
		{
			var data_id=get_new_key();
			var name=form.elements[1].value;
			var area_type=form.elements[2].value;
			var parent=form.elements[3].value;
			var owner=form.elements[4].value;
			var length=form.elements[5].value;
			var breadth=form.elements[6].value;
			var height=form.elements[7].value;
			var unit=form.elements[8].value;
			var last_updated=get_my_time();
			var data_xml="<store_areas>" +
						"<id>"+data_id+"</id>" +
						"<name unique='yes'>"+name+"</name>" +
						"<owner>"+owner+"</owner>" +
						"<area_type>"+area_type+"</area_type>" +
						"<parent>"+parent+"</parent>"+
						"<len>"+length+"</len>"+
						"<breadth>"+breadth+"</breadth>"+
						"<height>"+height+"</height>"+
						"<unit>"+unit+"</unit>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</store_areas>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>store_areas</tablename>" +
						"<link_to>form170</link_to>" +
						"<title>Added</title>" +
						"<notes>Storage area "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_create_row_func(data_xml,activity_xml,func);
			}
			else
			{
				local_create_row_func(data_xml,activity_xml,func);
			}

			var id=get_new_key();
			$("#modal113_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				if(value!="")
				{
					var attribute=$(this).attr('name');
					var attribute_xml="<attributes>" +
							"<id>"+id+"</id>" +
							"<name>"+name+"</name>" +
							"<type>storage</type>" +
							"<attribute>"+attribute+"</attribute>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</attributes>";
					if(is_online())
					{
						server_create_simple(attribute_xml);
					}
					else
					{
						local_create_simple(attribute_xml);
					}
				}
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal113").dialog("close");
	});

	$("#modal113").dialog("open");
}

/**
 * @modalNo 114
 * @modal Add new product
 * @param button
 */
function modal114_action(func)
{
	var form=document.getElementById('modal114_form');

	var fname=form.elements[1];
	var fmake=form.elements[2];
	var fdescription=form.elements[3];
	var fpictureinfo=form.elements[4];
	var fpicture=form.elements[5];
	var dummy_button=form.elements[6];
	var flength=form.elements[8];
	var fbreadth=form.elements[9];
	var fheight=form.elements[10];
	var fvolume=form.elements[11];
	var funit=form.elements[12];
	var fweight=form.elements[13];
	var fpacking=form.elements[14];
	var fbarcode=form.elements[15];
	var auto_generate=form.elements[16];

	//fbarcode.value=get_my_time()*10+Math.round(Math.random()*10);
	//auto_generate.checked=true;
	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(fpicture).trigger('click');
	});

	fbarcode.value="";
	auto_generate.checked=false;

	$(auto_generate).off('click');
	$(auto_generate).on('click',function(event)
	{
		if(auto_generate.checked)
		{
			fbarcode.value=get_my_time()*10+Math.round(Math.random()*10);
		}
		else
		{
			fbarcode.value="";
		}
	});

	set_static_value_list('dimensions','unit',funit);

	var make_data={data_store:'product_master',return_column:'make'};
	set_my_filter_json(make_data,fmake);

	fpicture.addEventListener('change',function(evt)
	{
		select_picture(evt,fpictureinfo,function(dataURL)
		{
			fpictureinfo.innerHTML="<div class='figure'><img src='"+dataURL+"'/></div>";
		});
	},false);

	////adding attribute fields///////
	var attribute_label=document.getElementById('modal114_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<mandatory_attributes>" +
			"<attribute></attribute>" +
			"<status></status>" +
			"<value></value>"+
			"<object exact='yes'>product</object>" +
			"</mandatory_attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}
				else
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form39'))
		{
			var name=form.elements[1].value;
			var description=form.elements[2].value;
			var make=form.elements[3].value;

			name = name.replace(/[^a-z0-9A-Z<>\t\n \(\)\+\-\;\.\<\,]/g,'');
			name = name.replace(/â/g,'');
			name = name.replace(/&/g, "and");
			make = make.replace(/[^a-z0-9A-Z<>\t\n \(\)\+\-\;\.\<\,]/g,'');
			make = make.replace(/â/g,'');
			make = make.replace(/&/g, "and");
			description = description.replace(/[^a-z0-9A-Z<>\t\n \(\)\+\-\;\.\<\,]/g,'');
			description = description.replace(/â/g,'');
			description = description.replace(/&/g, "and");

			var indexes=name.split(/[\s,]+/);
			var description_indexes=description.split(/[\s,]+/);
			var make_indexes=make.split(/[\s,]+/);
			var new_indexes=indexes.concat(description_indexes,make_indexes);
			var anew_indexes=vUtil.arrayUnique(new_indexes);
			var index_string=JSON.stringify(anew_indexes);

			var tax=form.elements[7].value;
			var data_id=get_new_key();
			var pic_id=get_new_key();
			var url=$(fpictureinfo).find('div').find('img').attr('src');
			var length=form.elements[8].value;
			var breadth=form.elements[9].value;
			var height=form.elements[10].value;
			var volume=form.elements[11].value;
			var unit=form.elements[12].value;
			var weight=form.elements[13].value;
			var packing=form.elements[14].value;

			packing = packing.replace(/[^a-z0-9A-Z<>\t\n \!\@\$\%\^\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
			packing = packing.replace(/â/g,'');

			var barcode=form.elements[15].value;
			var last_updated=get_my_time();
			var data_xml="<product_master>" +
						"<id>"+data_id+"</id>" +
						"<make>"+make+"</make>" +
						"<name unique='yes'>"+name+"</name>" +
						"<description>"+description+"</description>" +
						"<tax>"+tax+"</tax>" +
						"<len>"+length+"</len>"+
						"<breadth>"+breadth+"</breadth>"+
						"<height>"+height+"</height>"+
						"<volume>"+volume+"</volume>"+
						"<unit>"+unit+"</unit>"+
						"<weight>"+weight+"</weight>"+
						"<packing>"+packing+"</packing>"+
						"<bar_code>"+barcode+"</bar_code>" +
						"<indexes>"+index_string+"</indexes>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</product_master>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>product_master</tablename>" +
						"<link_to>form39</link_to>" +
						"<title>Added</title>" +
						"<notes>Product "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			create_row_func(data_xml,activity_xml,func);

			var id=get_new_key();
			$("#modal114_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				var attribute=$(this).attr('name');
				if(value!="")
				{
					var attribute_xml="<attributes>" +
							"<id>"+id+"</id>" +
							"<name>"+name+"</name>" +
							"<type>product</type>" +
							"<attribute>"+attribute+"</attribute>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</attributes>";
					create_simple(attribute_xml);

				}
			});

			if(url!="")
			{
				var pic_xml="<documents>" +
							"<id>"+pic_id+"</id>" +
							"<url>"+url+"</url>" +
							"<doc_type>product_master</doc_type>" +
							"<target_id>"+data_id+"</target_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</documents>";
				create_simple(pic_xml);

			}

			var channel_data="<sale_channels>" +
					"<id></id>" +
					"<name></name>" +
					"</sale_channels>";
			fetch_requested_data('',channel_data,function(channels)
			{
				var sku_mapping_xml="<sku_mapping>";
				var cat_sku_mapping_xml="<category_sku_mapping>";
				var channel_price_xml="<channel_prices>";
				var id=parseFloat(get_new_key());
				var counter=0;
				var last_updated=get_my_time();
				channels.forEach(function(channel)
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
							"<channel>"+channel.name+"</channel>"+
							"<system_sku>"+name+"</system_sku>"+
							"<item_desc>"+description+"</item_desc>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</row>";
					cat_sku_mapping_xml+="<row>" +
							"<id>"+id+"</id>" +
							"<channel>"+channel.name+"</channel>" +
							"<sku>"+name+"</sku>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</row>";
					channel_price_xml+="<row>" +
							"<id>"+id+"</id>" +
							"<channel>"+channel.name+"</channel>" +
							"<item>"+name+"</item>" +
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

				//create_batch(sku_mapping_xml);
				create_batch(cat_sku_mapping_xml);
				//create_batch(channel_price_xml);

			});

		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal114").dialog("close");
	});

	$("#modal114").dialog("open");
}

/**
 * @modalNo 115
 * @modal Delete Confirmation
 * @param button
 */
function modal115_action(func)
{
	var form115=document.getElementById('modal115_form');
	var yes_button=form115.elements['yes'];
	var no_button=form115.elements['no'];

	$(yes_button).off('click');
	$(yes_button).on('click',function(e)
	{
		e.preventDefault();
		$(form115).find('.close').click();
		func();
	});

	$("#modal115_link").click();
	$('#modal115').on('keyup',function (e)
	{
		if(e.keyCode==13)
		{
			e.preventDefault();
			$(yes_button).click();
		}
	});
}


/**
 * @modal Map Barcode
 * @modalNo 116
 */
function modal116_action(barcode,sku)
{
	var form=document.getElementById("modal116_form");
	var barcode_filter=form.elements['barcode'];
	var sku_filter=form.elements['sku'];
	var name_filter=form.elements['name'];
	var id_filter=form.elements['id'];

	var barcode_img=document.getElementById('modal116_barcode_img');
	$(barcode_img).hide();

	barcode_filter.value=barcode;
	sku_filter.value="";
	name_filter.value="";
	id_filter.value="";

	if(typeof sku!='undefined')
	{
		sku_filter.value=sku;
		var product_data="<product_master count='1'>"+
						"<id></id>"+
						"<description></description>"+
						"<name exact='yes'>"+sku_filter.value+"</name>"+
						"</product_master>";
		fetch_requested_data('',product_data,function (products)
		{
			if(products.length>0)
			{
				name_filter.value=products[0].description;
				id_filter.value=products[0].id;
				$(barcode_img).show();
				$(barcode_img).off('click');
				$(barcode_img).on('click',function ()
				{
					print_product_barcode(barcode_filter.value,sku_filter.value,name_filter.value);
				});
			}
		});
	}

	var sku_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
			//"<bar_code exact='yes'></bar_code>"+
	set_my_value_list_func(sku_data,sku_filter,function()
	{
		$(sku_filter).focus();
	});

	$(sku_filter).off('select');
	$(sku_filter).on('select',function ()
	{
		//console.log('select triggered');
		var product_data="<product_master count='1'>"+
						"<id></id>"+
						"<description></description>"+
						"<name exact='yes'>"+sku_filter.value+"</name>"+
						"</product_master>";
		fetch_requested_data('',product_data,function (products)
		{
			if(products.length>0)
			{
				name_filter.value=products[0].description;
				id_filter.value=products[0].id;
			}
			else
			{
				name_filter.value="";
				id_filter.value="";
			}
		});
	});


	my_datalist_change(sku_filter,function ()
	{
		//console.log('change triggered');
		var product_data="<product_master count='1'>"+
						"<id></id>"+
						"<description></description>"+
						"<name exact='yes'>"+sku_filter.value+"</name>"+
						"</product_master>";
		fetch_requested_data('',product_data,function (products)
		{
			if(products.length>0)
			{
				name_filter.value=products[0].description;
				id_filter.value=products[0].id;
			}
			else
			{
				name_filter.value="";
				id_filter.value="";
			}
		});
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

		var id=id_filter.value;
		var barcode=barcode_filter.value;
		//console.log(id);
		//console.log(barcode);

		var last_updated=get_my_time();
		var data_xml="<product_master>" +
					"<id>"+id+"</id>" +
					"<bar_code>"+barcode+"</bar_code>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</product_master>";
		update_simple(data_xml);

		$("#modal116").dialog("close");
	});

	$("#modal116").dialog("open");
}


/**
 * @modal Add Task
 * @modalNo 117
 */
function modal117_action(date_due)
{
	var form=document.getElementById("modal117_form");
	var task_filter=form.elements['task'];
	var desc_filter=form.elements['notes'];
	var staff_filter=form.elements['assignee'];
	var status_filter=form.elements['status'];

    $('#modal117').formcontrol();
	//start_filter.value=date_initiated;

	var staff_data={data_store:'staff',return_column:'acc_name'};
	set_my_value_list_json(staff_data,staff_filter);

	set_static_value_list_json('task_instances','status',status_filter);

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form185') || is_create_access('form188'))
		{
			var name=form.elements['task'].value;
			var description=form.elements['notes'].value;
			var assignee=form.elements['assignee'].value;
			var status=form.elements['status'].value;
			var data_id=get_new_key();
			var last_updated=get_my_time();

            var data_json={data_store:'task_instances',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'description',value:description},
	 					{index:'assignee',value:assignee},
	 					{index:'status',value:status},
                        {index:'task_hours',value:1},
                        {index:'source',value:'business process'},
                        {index:'t_due',value:get_raw_time(date_due)},
                        {index:'t_initiated',value:get_raw_time(date_due)-3600000},
                        {index:'source_id',value:''},
                        {index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Added',notes:'Task '+name+' assigned to '+assignee,link_to:'form185'}};
			create_json(data_json);
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal117_link").click();
}

/**
 * @modal New Order
 * @modalNo 118
 */
function modal118_action()
{
	var form=document.getElementById("modal118_form");
	var phone_filter=form.elements['phone'];
	var name_filter=form.elements['name'];
	var credit_filter=form.elements['credit'];
	var address_filter=form.elements['address'];
	var notes_filter=form.elements['notes'];
	var email_filter=form.elements['email'];
	var new_filter=form.elements['new_old'];
	var acc_name_filter=form.elements['acc_name'];
	var id_filter=form.elements['customer_id'];

	phone_filter.value="";
	name_filter.value="";
	credit_filter.value="";
	address_filter.value="";
	notes_filter.value="";
	email_filter.value="";
	new_filter.value="";
	acc_name_filter.value="";
	id_filter.value="";

	var phone_data="<customers>" +
			"<phone></phone>" +
			"</customers>";
	set_my_filter(phone_data,phone_filter);

	var address_data="<customers>" +
			"<address></address>" +
			"</customers>";
	set_my_filter(address_data,address_filter);

	var name_data="<customers>" +
			"<name></name>" +
			"</customers>";
	set_my_filter(name_data,name_filter);

	$(address_filter).off('keydown');
	$(address_filter).on('keydown',function(e)
	{
		if(e.keyCode==13)
		{
			e.preventDefault();

			if(address_filter.value!="")
			{
				var customers_data="<customers>"+
								"<id></id>"+
								"<name></name>"+
								"<email></email>"+
								"<acc_name></acc_name>"+
								"<address exact='yes'>"+address_filter.value+"</address>"+
								"<phone></phone>"+
								"</customers>";
				fetch_requested_data('',customers_data,function(customers)
				{
					if(customers.length>0)
					{
						var payments_data="<payments>" +
								"<id></id>" +
								"<type></type>" +
								"<total_amount></total_amount>" +
								"<paid_amount></paid_amount>" +
								"<status exact='yes'>pending</status>" +
								"<acc_name exact='yes'>"+customers[0].acc_name+"</acc_name>" +
								"</payments>";
						fetch_requested_data('',payments_data,function(payments)
						{
							var balance_amount=0;
							payments.forEach(function(payment)
							{
								if(payment.type=='received')
								{
									balance_amount+=parseFloat(payment.total_amount);
									balance_amount-=parseFloat(payment.paid_amount);
								}
								else if(payment.type=='paid')
								{
									balance_amount-=parseFloat(payment.total_amount);
									balance_amount+=parseFloat(payment.paid_amount);
								}
							});
							credit_filter.value=balance_amount;
						});
						name_filter.value=customers[0].name;
						email_filter.value=customers[0].email;
						phone_filter.value=customers[0].phone;
						acc_name_filter.value=customers[0].acc_name;
						new_filter.value='no';
						id_filter.value=customers[0].id;
						name_filter.setAttribute('readonly','readonly');
						$(notes_filter).focus();
					}
					else
					{
						name_filter.value="";
						email_filter.value="";
						phone_filter.value="";
						id_filter.value="";
						name_filter.removeAttribute('readonly');
						new_filter.value='yes';
						credit_filter.value=0;
						acc_name_filter.value=name_filter.value+" ("+phone_filter.value+")";
					}
				});
			}
		}
	});

	$(phone_filter).off('blur');
	$(phone_filter).on('blur',function()
	{
		if(phone_filter.value!="")
		{
			var customers_data="<customers>"+
							"<id></id>"+
							"<name></name>"+
							"<email></email>"+
							"<acc_name></acc_name>"+
							"<address></address>"+
							"<phone exact='yes'>"+phone_filter.value+"</phone>"+
							"</customers>";
			fetch_requested_data('',customers_data,function(customers)
			{
				if(customers.length>0)
				{
					var payments_data="<payments>" +
							"<id></id>" +
							"<type></type>" +
							"<total_amount></total_amount>" +
							"<paid_amount></paid_amount>" +
							"<status exact='yes'>pending</status>" +
							"<acc_name exact='yes'>"+customers[0].acc_name+"</acc_name>" +
							"</payments>";
					fetch_requested_data('',payments_data,function(payments)
					{
						var balance_amount=0;
						payments.forEach(function(payment)
						{
							if(payment.type=='received')
							{
								balance_amount+=parseFloat(payment.total_amount);
								balance_amount-=parseFloat(payment.paid_amount);
							}
							else if(payment.type=='paid')
							{
								balance_amount-=parseFloat(payment.total_amount);
								balance_amount+=parseFloat(payment.paid_amount);
							}
						});
						credit_filter.value=balance_amount;
					});
					name_filter.value=customers[0].name;
					email_filter.value=customers[0].email;
					address_filter.value=customers[0].address;
					acc_name_filter.value=customers[0].acc_name;
					new_filter.value='no';
					id_filter.value=customers[0].id;
					name_filter.setAttribute('readonly','readonly');
					$(notes_filter).focus();
				}
				else
				{
					name_filter.value="";
					email_filter.value="";
					address_filter.value="";
					id_filter.value="";
					name_filter.removeAttribute('readonly');
					new_filter.value='yes';
					credit_filter.value=0;
					acc_name_filter.value=name_filter.value+" ("+phone_filter.value+")";
				}
			});
		}
	});

	$(name_filter).off('blur');
	$(name_filter).on('blur',function()
	{
		acc_name_filter.value=name_filter.value+" ("+phone_filter.value+")";
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form190'))
		{
			var phone=phone_filter.value;
			var name=name_filter.value;
			var credit=credit_filter.value;
			var address=address_filter.value;
			var notes=notes_filter.value;
			var email=email_filter.value;
			var new_old=new_filter.value;
			var acc_name=acc_name_filter.value;
			var old_id=id_filter.value;
			var data_id=get_new_key();
			var last_updated=get_my_time();

			if(new_old=='yes')
			{
				var customer_xml="<customers>"+
								"<id>"+data_id+"</id>"+
								"<name>"+name+"</name>"+
								"<phone>"+phone+"</phone>"+
								"<email>"+email+"</email>"+
								"<acc_name>"+acc_name+"</acc_name>"+
                        		"<status>active</status>"+
                        		"<address>"+address+"</address>"+
								"<last_updated>"+last_updated+"</last_updated>" +
                        		"</customers>";
				var account_xml="<accounts>" +
								"<id>"+data_id+"</id>" +
								"<acc_name unique='yes'>"+acc_name+"</acc_name>" +
								"<type>customer</type>" +
								"<username></username>"+
								"<last_updated>"+last_updated+"</last_updated>" +
								"</accounts>";

                create_simple(customer_xml);
				create_simple(account_xml);

			}
			else
			{
				var customer_xml="<customers>"+
								"<id>"+old_id+"</id>"+
								"<address>"+address+"</address>"+
								"<last_updated>"+last_updated+"</last_updated>" +
                        		"</customers>";
                update_simple(customer_xml);
			}

			var order_num_xml="<user_preferences>"+
							"<id></id>"+
							"<value></value>"+
							"<type exact='yes'>accounting</type>"+
							"<name exact='yes'>so_num</name>"+
							"</user_preferences>";
			fetch_requested_data('',order_num_xml,function (order_nums)
			{
				if(order_nums.length>0)
				{
					var data_xml="<sale_orders>" +
								"<id>"+data_id+"</id>" +
								"<order_num>"+order_nums[0].value+"</order_num>"+
								"<customer_name>"+acc_name+"</customer_name>"+
		                        "<address>"+address+"</address>"+
		                        "<notes>"+notes+"</notes>"+
		                        "<order_date>"+last_updated+"</order_date>"+
		                        "<status>pending</status>"+
								"<last_updated>"+last_updated+"</last_updated>" +
								"</sale_orders>";
					var activity_xml="<activity>" +
								"<data_id>"+data_id+"</data_id>" +
								"<tablename>sale_orders</tablename>" +
								"<link_to>form190</link_to>" +
								"<title>New Order</title>" +
								"<notes>From "+name+"</notes>" +
								"<updated_by>"+get_name()+"</updated_by>" +
								"</activity>";
					var order_num_data="<user_preferences>"+
								"<id>"+order_nums[0].id+"</id>"+
								"<value>"+(parseFloat(order_nums[0].value)+1)+"</value>"+
								"<last_updated>"+last_updated+"</last_updated>"+
							"</user_preferences>";
					create_row(data_xml,activity_xml);
					update_simple(order_num_data);
				}
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal118").dialog("close");
	});

	$("#modal118").dialog("open");
}

/**
 * @modal Select Assignee
 * @modalNo 119
 */
function modal119_action(data_id,type)
{
	var form=document.getElementById("modal119_form");
	var name_filter=form.elements[1];

	var name_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	set_my_filter(name_data,name_filter);

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		if(is_create_access('form190'))
		{
			var name=form.elements[1].value;
			var last_updated=get_my_time();

			var data_xml="<sale_orders>" +
						"<id>"+data_id+"</id>"+
						"<pickup_assignee>"+name+"</pickup_assignee>"+
                        "<last_updated>"+last_updated+"</last_updated>" +
						"</sale_orders>";

			if(type=='delivery')
			{
				var data_xml="<sale_orders>" +
						"<id>"+data_id+"</id>"+
						"<delivery_assignee>"+name+"</delivery_assignee>"+
                        "<last_updated>"+last_updated+"</last_updated>" +
						"</sale_orders>";
			}
			if(is_online())
			{
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal119").dialog("close");
	});

	$("#modal119").dialog("open");
}


/**
 * @modalNo 120
 * @modal Add new batch
 */
function modal120_action(func,product_name,required)
{
	var form=document.getElementById('modal120_form');

	var fname=form.elements[1];
	var fbatch=form.elements[2];
	var fexpiry=form.elements[3];
	var fmrp=form.elements[4];

	if(typeof required!='undefined')
	{
		if(required=='required')
		{
			fexpiry.setAttribute('required','required');
			fmrp.setAttribute('required','required');
		}
	}

	fbatch.value="";
	fexpiry.value="";
	fmrp.value="";

	$(fexpiry).datepicker(
	{
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'mm/yy',
        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
        }
    });

	var name_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_value_list(name_data,fname);

	if(typeof product_name!='undefined')
	{
		fname.value=product_name;
		var batch_data="<product_instances>" +
				"<batch></batch>" +
				"<product_name exact='yes'>"+fname.value+"</product_name>" +
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
		            $(this).attr('placeholder','Batch Exists');
		        }
			});
		},batch_data);
	}

	$(fname).off('blur');
	$(fname).on('blur',function(event)
	{
		var batch_data="<product_instances>" +
				"<batch></batch>" +
				"<product_name exact='yes'>"+fname.value+"</product_name>" +
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
		            $(this).attr('placeholder','Batch Exists');
		        }
			});
		},batch_data);
	});


	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
			var name=fname.value;
			var batch=fbatch.value;

			batch = batch.replace(/[^a-z0-9A-Z<>\t\n \!\@\$\&\%\^\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
			batch = batch.replace(/â/g,'');
			batch = batch.replace(/&/g, "and");

			var expiry=get_raw_time(fexpiry.value);
			var mrp=fmrp.value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<product_instances>" +
						"<id>"+data_id+"</id>" +
						"<product_name>"+name+"</product_name>" +
						"<batch>"+batch+"</batch>" +
						"<expiry>"+expiry+"</expiry>" +
						"<mrp>"+mrp+"</mrp>" +
						"<status>available</status>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</product_instances>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>product_instances</tablename>" +
						"<link_to>form1</link_to>" +
						"<title>Added</title>" +
						"<notes>New batch "+batch+" for item "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			create_row_func(data_xml,activity_xml,func);

		$("#modal120").dialog("close");
	});

	$("#modal120").dialog("open");
}


/**
 * @modalNo 122
 * @modal Update Inventory
 */
function modal122_action(item_name)
{
	var form=document.getElementById('modal122_form');

	var fitem=form.elements[1];
	var ffresh=form.elements[2];
	var fhireable=form.elements[3];
	fitem.value=item_name;

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form155'))
		{
			var item=fitem.value;
			var fresh=parseFloat(ffresh.value);
			var hireable=parseFloat(fhireable.value);

			var last_updated=get_my_time();

			var hireable_data="<bill_items sum='yes'>"+
							"<quantity></quantity>"+
							"<hired exact='yes'>yes</hired>"+
							"<fresh exact='yes'>yes</fresh>"+
							"<item_name exact='yes'>"+item+"</item_name>"+
							"</bill_items>";
			get_single_column_data(function(hireables)
			{
				var new_hireable=hireable;
				if(hireables.length>0)
				{
					new_hireable-=parseFloat(hireables[0]);
				}

				var hireable_xml="<bill_items sum='yes'>"+
							"<id>"+get_new_key()+"</id>"+
							"<quantity>"+new_hireable+"</quantity>"+
							"<hired exact='yes'>yes</hired>"+
							"<fresh exact='yes'>yes</fresh>"+
							"<item_name exact='yes'>"+item+"</item_name>"+
							"<from_date>"+last_updated+"</from_date>"+
							"<to_date>"+last_updated+"</to_date>"+
							"<storage>"+get_session_var('sales_store')+"</storage>"+
							"<last_updated>"+last_updated+"</last_updated>"+
							"</bill_items>";

				get_inventory(item,'',function(inventory)
				{
					var new_total=fresh+hireable-parseFloat(inventory);
					var adjust_xml="<inventory_adjust>" +
							"<id>"+get_new_key()+"</id>" +
							"<product_name>"+item+"</product_name>" +
							"<batch>"+item+"</batch>" +
							"<quantity>"+new_total+"</quantity>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"<storage>"+get_session_var('discard_items_store')+"</storage>"+
							"</inventory_adjust>";
					if(is_online())
					{
						server_create_simple_no_warning(adjust_xml);
						server_create_simple_no_warning(hireable_xml);
					}
					else
					{
						local_create_simple_no_warning(adjust_xml);
						local_create_simple_no_warning(hireable_xml);
					}

					///////////adding store placement////////
					///////////adding store placement////////
					var bill_storage_data="<area_utilization>" +
							"<id></id>" +
							"<name exact='yes'>"+get_session_var('sales_store')+"</name>" +
							"<item_name exact='yes'>"+item+"</item_name>" +
							"<batch exact='yes'>"+item+"</batch>" +
							"</area_utilization>";
					fetch_requested_data('',bill_storage_data,function(placements)
					{
						if(placements.length===0 && storage!="")
						{
							var storage_xml="<area_utilization>" +
									"<id>"+get_new_key()+"</id>" +
									"<name>"+get_session_var('sales_store')+"</name>" +
									"<item_name>"+item+"</item_name>" +
									"<batch>"+item+"</batch>" +
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

					var storage_data="<area_utilization>" +
							"<id></id>" +
							"<name exact='yes'>"+get_session_var('discard_items_store')+"</name>" +
							"<item_name exact='yes'>"+item+"</item_name>" +
							"<batch exact='yes'>"+item+"</batch>" +
							"</area_utilization>";
					fetch_requested_data('',storage_data,function(placements)
					{
						if(placements.length===0 && storage!="")
						{
							var storage_xml="<area_utilization>" +
									"<id>"+get_new_key()+"</id>" +
									"<name>"+get_session_var('discard_items_store')+"</name>" +
									"<item_name>"+item+"</item_name>" +
									"<batch>"+item+"</batch>" +
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

				});
			},hireable_data);
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal122").dialog("close");
	});

	$("#modal122").dialog("open");
}

/**
 * @modalNo 123
 * @modal Add new letterhead
 */
function modal123_action(item_name)
{
	var form=document.getElementById('modal123_form');

	var date_filter=form.elements[2];

	$(date_filter).datepicker();

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form195'))
		{
			var name=form.elements[1].value;
			var date=get_raw_time(form.elements[2].value);
			var to=form.elements[3].value;
			var subject=form.elements[4].value;
			var salutation=form.elements[5].value;
			var content=form.elements[6].value;
			var signature=form.elements[7].value;
			var footer=form.elements[8].value;
			var last_updated=get_my_time();

			var letter_xml="<letterheads>"+
							"<id>"+get_new_key()+"</id>"+
							"<name unique='yes'>"+name+"</name>"+
							"<date>"+date+"</date>"+
							"<receiver>"+to+"</receiver>"+
							"<subject>"+subject+"</subject>"+
							"<salutation>"+salutation+"</salutation>"+
							"<content>"+content+"</content>"+
							"<signature>"+signature+"</signature>"+
							"<footer>"+footer+"</footer>"+
							"<last_updated>"+last_updated+"</last_updated>"+
							"</letterheads>";
			if(is_online())
			{
				server_create_simple(letter_xml);
			}
			else
			{
				local_create_simple(letter_xml);
			}
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal123").dialog("close");
	});

	$("#modal123").dialog("open");
}

/**
 * @modal Send SMS
 * @modalNo 124
 */
function modal124_action(person_type,person,sms)
{
	show_loader();
	var form=document.getElementById('modal124_form');

	var person_filter=form.elements[1];
	var sms_filter=form.elements[3];

	sms_filter.value=sms;

	$(person_filter).off('blur');

	if(person!="")
	{
		var phone_xml="<suppliers>"+
				"<phone></phone>"+
				"<name></name>"+
				"<acc_name exact='yes'>"+person+"</acc_name>"+
				"</suppliers>";
		if(person_type=='customer')
		{
			phone_xml="<customers>"+
					"<phone></phone>"+
					"<name></name>"+
					"<acc_name exact='yes'>"+person+"</acc_name>"+
					"</customers>";
		}
		else if(person_type=='staff')
		{
			phone_xml="<staff>"+
					"<phone></phone>"+
					"<name></name>"+
					"<acc_name exact='yes'>"+person+"</acc_name>"+
					"</staff>";
		}

		fetch_requested_data('',phone_xml,function(phones)
		{
			form.elements[1].value=person;
			form.elements[2].value=phones[0].phone;
			form.elements[4].value=phones[0].name;

			hide_loader();
		});
	}
	else
	{
		var person_xml="<suppliers>"+
					"<acc_name></acc_name>"+
					"</suppliers>";
		if(person_type=='customer')
		{
			person_xml="<customers>"+
					"<acc_name></acc_name>"+
					"</customers>";
		}
		else if(person_type=='staff')
		{
			person_xml="<staff>"+
					"<acc_name></acc_name>"+
					"</staff>";
		}

		set_my_value_list(person_xml,person_filter);

		$(person_filter).on('blur',function ()
		{
			var phone_xml="<suppliers count='1'>"+
				"<phone></phone>"+
				"<name></name>"+
				"<acc_name exact='yes'>"+person_filter.value+"</acc_name>"+
				"</suppliers>";

			if(person_type=='customer')
			{
				phone_xml="<customers>"+
						"<phone></phone>"+
						"<name></name>"+
						"<acc_name exact='yes'>"+person_filter.value+"</acc_name>"+
						"</customers>";
			}
			else if(person_type=='staff')
			{
				phone_xml="<staff>"+
						"<phone></phone>"+
						"<name></name>"+
						"<acc_name exact='yes'>"+person_filter.value+"</acc_name>"+
						"</staff>";
			}
			fetch_requested_data('',phone_xml,function(phones)
			{
				form.elements[2].value=phones[0].phone;
				form.elements[4].value=phones[0].name;

				hide_loader();
			});
		});
	}

	$("#modal124").dialog("open");
	$('textarea').autosize();

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		show_loader();
		var to=form.elements[2].value;
		var customer_name=form.elements[4].value;

		var sms_content=sms.replace(/customer_name/g,customer_name);
		send_sms(to,sms_content,'transaction');

		$("#modal124").dialog("close");
	});
}

/**
 * @modalNo 125
 * @modal Suppliers product mapping
 * @param button
 */
function modal125_action(item_name)
{
	var form=document.getElementById('modal125_form');

	////adding attribute fields/////
	var supplier_label=document.getElementById('modal125_suppliers');
	supplier_label.innerHTML="";
	var supplier_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	fetch_requested_data('',supplier_data,function(suppliers)
	{
		suppliers.forEach(function(supplier)
		{
			var attr_label=document.createElement('label');
			attr_label.innerHTML=supplier.acc_name+" <input type='checkbox' name='"+supplier.acc_name+"'>";

			supplier_label.appendChild(attr_label);
			var line_break=document.createElement('br');
			supplier_label.appendChild(line_break);
		});
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		var delete_mapping="<supplier_item_mapping>"+
						"<item_name>"+item_name+"</item_name>"+
						"</supplier_item_mapping>";
		delete_simple_func(delete_mapping,function ()
		{
			var id=get_new_key();
			$("#modal125_suppliers").find('input').each(function()
			{
				id++;
				var element=$(this)[0];
				var value=element.value;
				var supplier_name=element.name;
				if(element.checked)
				{
					var supplier_item_xml="<supplier_item_mapping>" +
							"<id>"+id+"</id>" +
							"<supplier>"+supplier_name+"</supplier>" +
							"<item>"+item_name+"</item>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</supplier_item_mapping>";
					if(is_online())
					{
						server_create_simple(supplier_item_xml);
					}
					else
					{
						local_create_simple(supplier_item_xml);
					}
				}
			});
		});

		$("#modal125").dialog("close");
	});

	$("#modal125").dialog("open");
}

/**
 * @modalNo 126
 * @modal Priority Suppliers
 * @param button
 */
function modal126_action(po_id,po_num)
{
	var form=document.getElementById('modal126_form');

	$(form).off('submit');
	$(form).on('submit',function (event)
	{
		event.preventDefault();
        var last_updated=get_my_time();
		var supplier_name=form.elements['supplier'].value;
        var po_json={data_store:'purchase_orders',
                        data:[{index:'id',value:po_id},
                             {index:'supplier',value:supplier_name},
                             {index:'status',value:'supplier finalized'},
                             {index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Assigned',notes:'Supplier for PO # '+po_num,link_to:'form179'}};

		update_json(po_json);

		$(form).find(".close").click();
        form179_ini();
	});

	////adding attribute fields/////
	var supplier_label=document.getElementById('modal126_suppliers');
	supplier_label.innerHTML="";

	var po_items_data={data_store:'purchase_order_items',
                      indexes:[{index:'item_name'},
                              {index:'order_id',exact:po_id}]};
	read_json_rows('',po_items_data,function(po_items)
	{
        //console.log(po_items);
		po_items=jQuery.unique(po_items);
		var item_string=[];
		for(var k in po_items)
		{
			item_string.push(po_items[k].item_name);
		}

		var suppliers_xml={data_store:'supplier_item_mapping',
                          indexes:[{index:'supplier'},
                                  {index:'item',array:item_string}]};
		read_json_rows('',suppliers_xml,function(suppliers)
		{
            //console.log(suppliers);
			var unique_sup_array=new Object();

			for(var i in suppliers)
			{
				var supplier_name=suppliers[i].supplier;
				if(!Array.isArray(unique_sup_array[supplier_name]))
				{
					unique_sup_array[supplier_name]=[];
				}
				unique_sup_array[supplier_name].push(suppliers[i].item);
			}

			var final_suppliers=[];
			for(var x in unique_sup_array)
			{
				if(unique_sup_array[x].length==po_items.length)
				{
					final_suppliers.push(x);
				}
			}

			var score_xml={data_store:'suppliers',
                          indexes:[{index:'score'},
                                  {index:'acc_name',array:final_suppliers}]};
			read_json_rows('',score_xml,function (scores)
			{
                //console.log(scores);
				scores.sort(function(a,b)
				{
					if(a.score<b.score)
					{	return 1;}
					else
					{	return -1;}
				});

				var radio_check='checked';
				scores.forEach(function(score)
				{
					var attr_label=document.createElement('div');
                    attr_label.setAttribute('class','row');
					attr_label.innerHTML="<div class='col-sm-3'><input type='radio' value='"+score.acc_name+"' "+radio_check+" name='supplier'></div><div class='col-sm-9'><b>"+score.score+"</b> : "+score.acc_name+"</div>";
					if(radio_check=='checked')
					{
						radio_check="";
					}
					supplier_label.appendChild(attr_label);
				});
			});
		});
	});

	$("#modal126_link").click();
}

/**
 * @modalNo 127
 * @modal Print laundry tags
 * @param button
 */
function modal127_action()
{
	var form127=document.getElementById('modal127_form');
	var yes_button=form127.elements[1];
	var no_button=form127.elements[2];

	$(yes_button).off('click');
	$(yes_button).on('click',function()
	{
		$("#modal127").dialog("close");
		////add code to print tags

		var master_form=document.getElementById('form10_master');
		var bill_num=master_form.elements['bill_num'].value;
		var bill_date=master_form.elements['bill_date'].value;
		//var bill_due_date=master_form.elements['due_date'].value;
		//var bus_title='The Washclub';
		//var customer_address=master_form.elements['customer_address'].value;
		var total_quantity=0;
		var items=[];
		$("[id^='save_form10_']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			var quantity=parseInt(subform.elements[2].value);
			for(var i=0;i<quantity;i++)
			{
				total_quantity+=1;
				var item=new Object();
				item.number=total_quantity;
				item.name=subform.elements[0].value;
				items.push(item);
			}
		});

		var container=document.createElement('div');
		container.setAttribute('style','width:95%;font-size:14px;line-height:20px;');

		items.forEach(function(item)
		{
			var item_container=document.createElement('div');
				var item_count_elem=document.createElement('div');
				//var business_title_elem=document.createElement('div');
				var item_name_elem=document.createElement('div');
				var bill_num_elem=document.createElement('div');
				var due_date_elem=document.createElement('div');
				//var address_elem=document.createElement('div');

			item_container.setAttribute('style','width:100%;height:auto;margin:0px;margin-top:5%;margin-bottom:5%;font-size:14px;page-break-inside:avoid;page-break-after:auto;page-break-before:auto;');
			bill_num_elem.setAttribute('style','font-size:22px;margin:5px;font-weight:900;');
			item_name_elem.setAttribute('style','font-size:18px;margin:5px;');

			item_count_elem.innerHTML="<hr style='border: 1px solid #000;margin:0px;'>"+item.number+" of "+total_quantity;
			//business_title_elem.innerHTML=bus_title;
			item_name_elem.innerHTML=item.name;
			bill_num_elem.innerHTML="<b>"+bill_num+"</b>";
			due_date_elem.innerHTML="<b>"+bill_date+"</b><hr style='border: 1px solid #000;margin:0px;'>";
			//address_elem.innerHTML="<hr style='border: 1px solid #000;margin:0px;'>"+customer_address+"<hr style='border: 0px solid #000;margin:0px;'>";

			item_container.appendChild(item_count_elem);
			//item_container.appendChild(business_title_elem);
			item_container.appendChild(item_name_elem);
			item_container.appendChild(bill_num_elem);
			item_container.appendChild(due_date_elem);
			//item_container.appendChild(address_elem);
			container.appendChild(item_container);
		});

		$.print(container);
		////////////////////////
	});

	$(no_button).on('click',function()
	{
		$("#modal127").dialog("close");
	});

	$("#modal127").dialog("open");
}

/**
 * @modalNo 128
 * @modal Add Logistics Order
 */
function modal128_action()
{
	var form=document.getElementById('modal128_form');

	var channel_filter=form.elements['channel'];
	var type_filter=form.elements['type'];

	set_static_value_list('logistics_orders','type',type_filter);
	set_static_value_list('logistics_orders','channel',channel_filter);

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form195'))
		{
			var awb=form.elements['awb'].value;
			var type=form.elements['type'].value;
			var order=form.elements['order'].value;
			var channel=form.elements['channel'].value;
			var merchant=form.elements['merchant'].value;
			var shipto=form.elements['shipto'].value;
			var address=form.elements['address'].value;
			var city=form.elements['city'].value;
			var pincode=form.elements['pincode'].value;
			var phone=form.elements['phone'].value;
			var weight=form.elements['weight'].value;
			var d_value=form.elements['d_value'].value;
			var c_value=form.elements['c_value'].value;
			var raddress=form.elements['raddress'].value;
			var date=get_my_time();
			var last_updated=get_my_time();

			var orders_xml="<logistics_orders>"+
						"<id>"+last_updated+"</id>"+
						"<awb_num unique='yes'>"+awb+"</awb_num>"+
		                "<type>"+type+"</type>"+
		                "<order_num>"+order+"</order_num>"+
		                "<merchant_name>"+merchant+"</merchant_name>"+
		                "<channel_name>"+channel+"</channel_name>"+
		                "<ship_to>"+shipto+"</ship_to>"+
		                "<address1>"+address+"</address1>"+
		                "<city>"+city+"</city>"+
		                "<pincode>"+pincode+"</pincode>"+
		                "<phone>"+phone+"</phone>"+
		                "<weight>"+weight+"</weight>"+
		                "<declared_value>"+d_value+"</declared_value>"+
		                "<collectable_value>"+c_value+"</collectable_value>"+
		                "<return_address1>"+raddress+"</return_address1>"+
		                "<import_date>"+date+"</import_date>"+
		                "<status>picked</status>"+
		                "<last_updated>"+last_updated+"</last_updated>"+
						"</logistics_orders>";
			create_simple(orders_xml);
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal128").dialog("close");
	});

	$("#modal128").dialog("open");
}


/**
 * @modalNo 130
 * @modal Delete Cache
 */
function modal130_action()
{
	var form=document.getElementById('modal130_form');

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		$("#modal130").dialog("close");
		clear_appcache();
	});
	console.log('something else 7');
	$("#modal130").dialog("open");
}

/**
 * @modalNo 131
 * @modal Issue GRN without QC
 */
function modal131_action(order_id,order_num,total_quantity,supplier_name,order_date,quantity_accepted)
{
	var form=document.getElementById('modal131_form');
	var order_num_filter=form.elements['order_num'];
	var total_filter=form.elements['o_quantity'];
	var received_filter=form.elements['r_quantity'];
	var print_button=form.elements['print'];

	$(print_button).off('click');
	$(print_button).on('click',function ()
	{
		var received_quantity=received_filter.value;
		modal131_print(order_num,received_quantity,total_quantity,supplier_name,order_date);
		$(form).trigger('submit');
	});

	order_num_filter.value=order_num;
	total_filter.value=total_quantity;
	//received_filter.setAttribute('max',total_quantity);
	//received_filter.value="";
	$(received_filter).focus();

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form43'))
		{
			var order_num=order_num_filter.value;
			var received_quantity=parseFloat(received_filter.value);
			var last_updated=get_my_time();
			var qc_pending=received_quantity-parseFloat(quantity_accepted);
			var status='partially received';
			if(received_quantity==parseFloat(total_quantity))
			{
				status='completely received';
			}

			var orders_xml="<purchase_orders>"+
						"<id>"+order_id+"</id>"+
		                "<status>"+status+"</status>"+
		                "<quantity_received>"+received_quantity+"</quantity_received>"+
		                "<quantity_qc_pending>"+qc_pending+"</quantity_qc_pending>"+
		                "<last_updated>"+last_updated+"</last_updated>"+
						"</purchase_orders>";
			update_simple(orders_xml);
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal131").dialog("close");
	});

	$("#modal131").dialog("open");
}

/**
 * @modalNo 132
 * @modal Refresh Tab
 * @param button
 */
function modal132_action(tab_id,func)
{
	var form132=document.getElementById('modal132_form');
	var yes_button=form132.elements[0];
	var no_button=form132.elements[1];


	if(vyavsaay_active_tab==tab_id)
	{
		$(form132).off('submit');
		$(form132).on('submit',function(event)
		{
			event.preventDefault();
			$("#modal132").dialog("close");
			func();
		});

		$(no_button).off('click');
		$(no_button).on('click',function()
		{
			$("#modal132").dialog("close");
		});

		$("#modal132").dialog("open");
	}
	else
	{
		func();
	}
}

/**
 * @modal Analyze Order
 * @modalNo 133
 */
function modal133_action(order_id,sale_channel,order_num,customer,billing_type,order_time,bill_id)
{
	show_loader();
	var form=document.getElementById("modal133_form");
	var type_filter=form.elements[0];
	var cancel_button=form.elements[2];

	document.getElementById('modal133_order_id').innerHTML="Order #: "+order_num;

	type_filter.value=billing_type;

	var type_data="<bill_types>" +
			"<name></name>" +
			"<status exact='yes'>active</status>" +
			"</bill_types>";
	set_my_value_list(type_data,type_filter);

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		form108_bill(order_id,type_filter.value,order_num,sale_channel,customer,order_time);
		$("#modal133").dialog("close");
	});

	$(cancel_button).off('click');
	$(cancel_button).on('click',function(event)
	{
		event.preventDefault();
		$("#modal133").dialog("close");
	});

	var headHTML="<tr style='background-color:#2C8A50;'>"+
				"<td>Item</td>"+
				"<td>Quantity</td>"+
				"<td>Select</td>"+
				"</tr>";
	$('#modal133_item_table').html(headHTML);

	var order_items_xml="<sale_order_items>"+
					"<id></id>"+
					"<order_id exact='yes'>"+order_id+"</order_id>"+
                    "<item_name></item_name>"+
                    "<item_desc></item_desc>"+
                    "<channel_sku></channel_sku>"+
                    "<vendor_sku></vendor_sku>"+
                    "<quantity></quantity>"+
                    "<mrp></mrp>"+
                    "<unit_price></unit_price>"+
                    "<selling_price></selling_price>"+
                    "<amount></amount>"+
                    "<tax></tax>"+
                    "<tax_rate></tax_rate>"+
                    "<freight></freight>"+
                    "<total></total>"+
					"</sale_order_items>";
	var analyze_item_timer=0;

	fetch_requested_data('',order_items_xml,function (order_items)
	{
		var bill_id_string='--';
		var bill_id_array=vUtil.jsonParse(bill_id);
		for(var x in bill_id_array)
		{
			bill_id_string+=bill_id_array[x].bill_id+"--";
		}

		var bill_items_xml="<bill_items>"+
					"<bill_id array='yes'>"+bill_id_string+"</bill_id>"+
					"<item_name></item_name>"+
					"<item_desc></item_desc>"+
					"<quantity></quantity>"+
					"</bill_items>";
		fetch_requested_data('',bill_items_xml,function (bill_items)
		{
			//console.log(bill_items);
			for(var j=0;j<order_items.length;j++)
			{
				order_items[j].order_quantity=order_items[j].quantity;
			}

			for(var k=0;k<order_items.length;k++)
			{
				for(var l=0;l<bill_items.length;l++)
				{
					if(order_items[k].item_name==bill_items[l].item_name)
					{
						if(parseFloat(order_items[k].quantity)>parseFloat(bill_items[l].quantity))
						{
							order_items[k].quantity=parseFloat(order_items[k].quantity)-parseFloat(bill_items[l].quantity);
							bill_items.splice(l,1);
							l--;
						}
						else if(parseFloat(order_items[k].quantity)<parseFloat(bill_items[l].quantity))
						{
							bill_items[l].quantity=parseFloat(bill_items[l].quantity)-parseFloat(order_items[k].quantity);
							order_items.splice(k,1);
							k--;
							break;
						}
						else
						{
							bill_items.splice(l,1);
							order_items.splice(k,1);
							k--;
							break;
						}
					}
				}
			}


			var channel_sku_string="--";
			for(var i in order_items)
			{
				channel_sku_string+=order_items[i].channel_sku+"--";
			}

			var sku_data="<sku_mapping count='1'>"+
						"<item_desc></item_desc>"+
						"<system_sku></system_sku>"+
						"<channel_sku array='yes'>"+channel_sku_string+"</channel_sku>"+
						"<channel exact='yes'>"+sale_channel+"</channel>"+
						"</sku_mapping>";
			fetch_requested_data('',sku_data,function(skus)
			{
				analyze_item_timer=order_items.length;

				order_items.forEach(function (order_item)
				{
					var tr_elem_title=[];
					var tr_elem_selection=[];
					if(order_item.item_name=="" || order_item.item_desc=="")
					{
						for(var i in skus)
						{
							if(skus[i].channel_sku==order_item.channel_sku)
							{
								order_item.item_name=skus[i].system_sku;
								order_item.item_desc=skus[i].item_desc;
							}
						}
					}

					var order_item_timer=2;

					/////////////////////////////
					var sku_components_xml="<pre_requisites>"+
									"<name exact='yes'>"+order_item.item_name+"</name>"+
									"<type>product</type>"+
									"<requisite_type>product</requisite_type>"+
									"<requisite_name></requisite_name>"+
									"<quantity></quantity>"+
									"</pre_requisites>";
					fetch_requested_data('',sku_components_xml,function(components)
					{
						order_item_timer+=components.length;
						if(components.length==0)
						{
							order_item_timer+=1;
							get_inventory(order_item.item_name,'',function(quantity)
							{
								console.log(order_item.item_name+"-"+quantity);

								if(parseFloat(quantity)<parseFloat(order_item.quantity))
								{
									tr_elem_title.push('Insufficient Inventory ');
									tr_elem_selection.push(get_session_var('billing_on_inventory'));
								}
								order_item_timer-=1;
							});
						}
						else
						{
							components.forEach(function(component)
							{
								component.quantity=parseFloat(component.quantity)*parseFloat(order_item.quantity);
								get_inventory(component.requisite_name,'',function(quantity)
								{
									if(parseFloat(quantity)<parseFloat(component.quantity))
									{
										tr_elem_title.push('Insufficient Inventory for '+component.requisite_name);
										tr_elem_selection.push(get_session_var('billing_on_inventory'));
									}
									order_item_timer-=1;
								});
							});
						}
						order_item_timer-=1;
					});


					var price_data="<channel_prices count='1'>" +
							//"<latest exact='yes'>yes</latest>"+
							"<from_time upperbound='yes'>"+order_time+"</from_time>"+
							"<channel exact='yes'>"+sale_channel+"</channel>"+
	                        "<item exact='yes'>"+order_item.item_name+"</item>"+
							"<sale_price></sale_price>"+
							"<freight></freight>"+
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
							var total_sale_price=parseFloat(sale_prices[0].sale_price)+parseFloat(sale_prices[0].freight);
							var order_total_price=parseFloat(order_item.total)/parseFloat(order_item.quantity);
							//console.log(total_sale_price);
							//console.log(order_total_price);
							if(total_sale_price>(order_total_price+1) || total_sale_price<(order_total_price-1))
							{
								tr_elem_title.push('Price Mismatch');
								tr_elem_selection.push(get_session_var('billing_on_price'));
							}
						}
						else
						{
							tr_elem_title.push('Pricing not defined for this item and channel');
							tr_elem_selection.push('no');
						}
						order_item_timer-=1;
					});

					var order_item_analysis_complete=setInterval(function()
					{
				  	   if(order_item_timer===0)
				  	   {
			  			   clearInterval(order_item_analysis_complete);
							var item_checked="checked";
			  			   var item_title="";
			  			   var hide_checkbox=false;

							for (var y in tr_elem_title)
							{
								item_title+=tr_elem_title[y]+"\n";
							}

							for (var z in tr_elem_selection)
							{
								if(tr_elem_selection[z]=='maybe')
								{
									item_checked="";
								}
								else if(tr_elem_selection[z]=='no')
								{
									item_checked="";
									hide_checkbox=true;
									break;
								}
							}

			  			   	var order_item_string=JSON.stringify(order_item);
							order_item_string=order_item_string.replace(/'/g, "");
			  			   	//console.log(order_item_string);
							var rowsHTML="<tr title='"+item_title+"' data-object='"+order_item_string+"' id='modal133_item_row_"+order_item.id+"'>"+
								"<td>"+order_item.item_name+"</td>"+
								"<td>"+order_item.quantity+"</td>";

							if(hide_checkbox)
							{
								rowsHTML+="<td><input "+item_checked+" style='display:none;' type='checkbox' id='modal133_item_check_"+order_item.id+"'></td>";
							}
							else
							{
								rowsHTML+="<td><input "+item_checked+" type='checkbox' id='modal133_item_check_"+order_item.id+"'></td>";
							}
								rowsHTML+="</tr>";
							$('#modal133_item_table').append(rowsHTML);
							analyze_item_timer-=1;
				  	   }
				     },100);
				});

				var analysis_complete=setInterval(function()
				{
					if(analyze_item_timer===0)
					{
						clearInterval(analysis_complete);
						hide_loader();
					}
				},100);
			});
		});
	});

	$("#modal133").dialog("open");
}

/**
 * @modalNo 134
 * @modal Followup Details
 */
function modal134_action(lead_id,customer,lead_details)
{
	var form=document.getElementById('modal134_form');
	var date_filter=form.elements['date'];
	var response_filter=form.elements['response'];
	var detail_filter=form.elements['details'];
	var next_date_filter=form.elements['next_date'];

	$(date_filter).datepicker();
	$(next_date_filter).datepicker();

	date_filter.value=vTime.date();

	set_static_value_list_json('followups','response',response_filter);

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form213') || is_update_access('form289') || is_update_access('form361'))
		{
			var id=get_new_key();
			var date=get_raw_time(date_filter.value);
			var response=response_filter.value;
			var details=detail_filter.value;
			var next_date=get_raw_time(next_date_filter.value);
			var last_updated=get_my_time();
			var new_details=lead_details+"\n\n"+date_filter.value+": "+details;

			var follow_json={data_store:'followups',
		 				data:[{index:'id',value:id},
		 					{index:'customer',value:customer},
		 					{index:'date',value:date},
		 					{index:'response',value:response},
		 					{index:'detail',value:details},
		 					{index:'next_date',value:next_date},
		 					{index:'source_id',value:lead_id},
		 					{index:'last_updated',value:last_updated}]};
	 		var lead_json={data_store:'sale_leads',
		 				data:[{index:'id',value:lead_id},
		 					{index:'due_date',value:next_date},
		 					{index:'detail',value:new_details},
		 					{index:'last_updated',value:last_updated}]};
			create_json(follow_json);
			update_json(lead_json);
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal134_link").click();
}

/**
 * @modalNo 135
 * @modal Set User preferences
 */
function modal135_action(type,master)
{
	var form=document.getElementById('modal135_form');
	var type_filter=form.elements['type'];
	var name_filter=form.elements['name'];
	var display_name_filter=form.elements['display_name'];
	var value_filter=form.elements['value'];

	if(type!="")
	{
		type_filter.value=type;
		type_filter.setAttribute('readonly','readonly');
		$(name_filter).focus();
	}
	else
	{
		type_filter.value="";
		type_filter.removeAttribute('readonly');
		$(type_filter).focus();
	}

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form46') || is_create_access('form50'))
		{
			var id=get_new_key();
			var type_new=type_filter.value;
			var name=name_filter.value;
			var display_name=display_name_filter.value;
			var value=value_filter.value;
			var last_updated=get_my_time();

			var data_json={data_store:'user_preferences',
		 				data:[{index:'id',value:id},
		 					{index:'name',value:name,unique:'yes'},
		 					{index:'display_name',value:display_name},
		 					{index:'type',value:type_new},
		 					{index:'value',value:value},
		 					{index:'status',value:'active'},
		 					{index:'shortcut',value:''},
		 					{index:'sync',value:'checked'},
		 					{index:'last_updated',value:last_updated}]};
			if(typeof master!='undefined' && master=='master')
			{
				server_create_master_all(data_json);
			}
			else
			{
				create_json(data_json);
				set_session_var(name,value);
	 		}
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find('.close').click();
	});

	$("#modal135_link").click();
	$('#modal135').formcontrol();
}

/**
 * @modalNo 136
 * @modal Add form/report
 */
function modal136_action(type,master)
{
	var form=document.getElementById('modal136_form');
	var type_filter=form.elements['type'];
	var name_filter=form.elements['name'];
	var display_name_filter=form.elements['disp'];
	var tables_filter=form.elements['tables'];

	if(type!="")
	{
		type_filter.value=type;
		type_filter.setAttribute('readonly','readonly');
		$(name_filter).focus();
	}
	else
	{
		type_filter.value="";
		type_filter.removeAttribute('readonly');
		$(type_filter).focus();
	}

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form46') || is_create_access('form50'))
		{
			var id=get_new_key();
			var type_new=type_filter.value;
			var name=name_filter.value;
			var display_name=display_name_filter.value;
			var tables=tables_filter.value;
			var last_updated=get_my_time();

			var data_json={data_store:'user_preferences',
		 				data:[{index:'id',value:id},
		 					{index:'name',value:name,unique:'yes'},
		 					{index:'display_name',value:display_name},
		 					{index:'type',value:type_new},
		 					{index:'value',value:'checked'},
		 					{index:'tables',value:tables},
		 					{index:'status',value:'active'},
		 					{index:'shortcut',value:''},
		 					{index:'sync',value:'checked'},
		 					{index:'last_updated',value:last_updated}]};
	 		var data2_json={data_store:'access_control',
		 				data:[{index:'id',value:id},
		 					{index:'element_id',value:name,uniqueWith:['username']},
		 					{index:'element_name',value:display_name},
		 					{index:'username',value:'master'},
		 					{index:'re',value:'checked'},
		 					{index:'cr',value:'checked'},
		 					{index:'up',value:'checked'},
		 					{index:'del',value:'checked'},
		 					{index:'last_updated',value:last_updated}]};

			if(typeof master!='undefined' && master=='master')
			{
				server_create_master_all(data_json);
				server_create_master_all(data2_json);
			}
			else
			{
				create_json(data_json);
				create_json(data2_json);
	 		}
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find('.close').click();
	});
	$("#modal136_link").click();
}

/**
 * @modal View Supplier Bills
 * @modalNo 137
 */
function modal137_action(bill_ids)
{
	var bill_id_array=vUtil.jsonParse(bill_ids);

	var rowsHTML="<tr><td>Bill Number</td><td>Link</td></tr>";

	bill_id_array.forEach(function (bill_id)
	{
		rowsHTML+="<tr>"+
				"<td>"+bill_id.bill_num+"</td>"+
				"<td><a onclick=\"element_display('"+bill_id.bill_id+"','form122',['form136','form295']); $('#modal137').find('.close').click();\"><u style='cursor:pointer;'>View</u></a></td>"+
				"</tr>";
	});

	$('#modal137_item_table').html(rowsHTML);

	$("#modal137_link").click();
}

/**
 * @modal Import sale orders
 */
function modal138_action()
{
	var form=document.getElementById('modal138_form');

	var template_button=form.elements[1];
	var channel_filter=form.elements[2];
	var select_file=form.elements[3];
	var dummy_button=form.elements[4];
	var selected_file=form.elements[5];
	var import_button=form.elements[6];

	$(dummy_button).off('click');
	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(select_file).trigger('click');
	});

	dummy_button.setAttribute('class','btn red-sunglo');
	select_file.value="";
	selected_file.value="";

	$(select_file).off('change');
	$(select_file).on('change',function ()
	{
		var file_name=select_file.value;
		if(file_name!="" && (file_name.indexOf('csv')>-1))
		{
			dummy_button.setAttribute('class','btn green-jungle');
	        selected_file.value=file_name;
		}
		else
		{
			dummy_button.setAttribute('class','btn red-sunglo');
	        select_file.value="";
			selected_file.value="";
		}
	});

	var channel_data="<sale_channels>"+
					"<name></name>"+
					"</sale_channels>";
	set_my_value_list(channel_data,channel_filter);

	$(template_button).off("click");
	$(template_button).on("click",function(event)
	{
		var data_array=['order_id','order_date','customer_name','customer_email','phone',
						'address','pincode','tin','item_name','channel_sku','system_sku',
						'item_mrp','item_price','quantity','shipping_amount','estimated_shipping_date',
						'tax_type','last_updated'];
		my_array_to_csv(data_array);
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		show_progress();
		show_loader();

		var file=select_file.files[0];
        var fileType = /csv/gi;
		var channel=channel_filter.value;

        selected_file.value = "Uploading!! Please don't refresh";
    	var reader = new FileReader();
        reader.onload = function(e)
        {
        	progress_value=2;
	       	var content=reader.result;
	       	var data_array=vUtil.csv2array(content);

			data_array.forEach(function (data_row)
			{
				data_row.sku=data_row.channel_sku+data_row.system_sku;
			});

	       	progress_value=5;

	    	var list2_data=new Object();
					list2_data.count=0;
					list2_data.start_index=0;
					list2_data.data_store='sale_orders';
					list2_data.indexes=[{index:'order_num'}];

			read_json_rows('',list2_data,function(orders)
			{

		    	var list1_data=new Object();
					list1_data.count=0;
					list1_data.start_index=0;
					list1_data.data_store='sku_mapping';
					list1_data.indexes=[{index:'item_desc'},{index:'system_sku'},{index:'channel_sku'},{index:'channel',exact:channel}];

				read_json_rows('',list1_data,function(skus)
				{
					var list_data=new Object();
					list_data.count=0;
					list_data.start_index=0;
					list_data.data_store='product_master';
					list_data.indexes=[{index:'name'},{index:'tax'}];

					read_json_rows('',list_data,function(products)
					{
						hide_loader();
						var orders_list=vUtil.arrayColumn(orders,'order_num');
						var skus_list=vUtil.arrayColumn(skus,'channel_sku');
						var products_list=vUtil.arrayColumn(products,'name');

						var validate_template_array=[{column:'order_date',required:'yes',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
												{column:'order_id',required:'yes',regex:new RegExp('^[0-9a-zA-Z-]+$'),anti_list:orders_list},
												{column:'customer_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
												{column:'customer_email',regex:new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z_.-]+$')},
												{column:'phone',regex:new RegExp('^[0-9 ./,+-]+$')},
												{column:'address'},
												{column:'pincode',regex:new RegExp('^[0-9]+$')},
												{column:'tin',regex:new RegExp('^[a-zA-Z0-9./-]+$')},
												{column:'item_name',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()+-]+$')},
												{column:'channel_sku',list:skus_list},
												{column:'system_sku',list:products_list},
												{column:'sku',required:'yes'},
												{column:'item_mrp',required:'yes',regex:new RegExp('^[0-9.]+$')},
												{column:'item_price',required:'yes',regex:new RegExp('^[0-9.]+$')},
												{column:'shipping_amount',required:'yes',regex:new RegExp('^[0-9.]+$')},
												{column:'quantity',required:'yes',regex:new RegExp('^[0-9.]+$')},
												{column:'tax_type',required:'yes',list:['Tax','Retail-VAT','Retail-CST','Retail-CST-C']}];

						var error_array=vImport.validate(data_array,validate_template_array);
						if(error_array.status=='success')
						{
			        		progress_value=10;

					    	var data_xml="<sale_orders>";
				       		var data2_xml="<sale_order_items>";
							var data3_xml="<customers>";
							var counter=1;
							var last_updated=get_my_time();
							var order_array=[];
							var order_item_array=[];
							var customer_array=[];

							data_array.forEach(function (data_row)
							{
								if(data_row.system_sku=="")
								{
									for(var i in skus)
									{
										if(data_row.channel_sku==skus[i].channel_sku)
										{
											data_row.system_sku=skus[i].system_sku;
											data_row.item_name=skus[i].item_desc;
											break;
										}
									}
								}

								counter+=1;
								var customer=data_row.customer_name+" ("+data_row.phone+")";
								var customer_object=new Object();
								customer_object.id=last_updated+counter;
								customer_object.name=data_row.customer_name;
								customer_object.acc_name=customer;
				                customer_object.email=data_row.customer_email;
				                customer_object.phone=data_row.phone;
				                customer_object.address=data_row.address;
				                customer_object.city="";
				                customer_object.pincode=data_row.pincode;
				                customer_object.state="";
				                customer_object.country="India";

				                var add_customer=true;

				                for(var i=0;i<customer_array.length;i++)
				                {
				                	if(customer_array[i].acc_name==customer_object.acc_name)
				                	{
				                		add_customer=false;
				                		break;
				                	}
				                }

				            	if(add_customer)
				            	{
				            		customer_array.push(customer_object);
				            	}

				                var order_item_object=new Object();
								order_item_object.id=last_updated+counter;
				                order_item_object.item_name=data_row.system_sku;
				                order_item_object.item_desc=data_row.item_name;
				                order_item_object.channel_sku=data_row.channel_sku;
				                order_item_object.vendor_sku="";
								order_item_object.quantity=data_row.quantity;
				                order_item_object.mrp=data_row.item_mrp;

				                order_item_object.tax_rate=0;
				                for(var i in products)
				                {
				                	if(products[i].name==order_item_object.item_name)
				                	{
		  				                order_item_object.tax_rate=products[i].tax;
				                		break;
				                	}
				                }
				                order_item_object.selling_price=data_row.item_price;
				                order_item_object.unit_price=parseFloat(data_row.item_price)/(1+parseFloat(order_item_object.tax_rate)/100);
				                order_item_object.amount=(parseFloat(order_item_object.unit_price)*parseFloat(data_row.quantity));
				                order_item_object.tax=parseFloat(order_item_object.amount)*parseFloat(order_item_object.tax_rate)/100;
				                order_item_object.freight=data_row.shipping_amount;
				                order_item_object.total=parseFloat(order_item_object.amount)+parseFloat(data_row.shipping_amount)+parseFloat(order_item_object.tax);

				                var add_order=true;

								var order_object=new Object();
								order_object.id=last_updated+counter;
								order_object.order_num=data_row.order_id;
				                order_object.customer=customer;
				                order_object.pincode=data_row.pincode;
				                order_object.order_date=data_row.order_date;
				                order_object.tax_type=data_row.tax_type;
				                order_object.freight=data_row.shipping_amount;
				                order_object.item_price=data_row.item_price;
				                order_object.amount=order_item_object.amount;
				                order_object.tax=order_item_object.tax;
				                order_object.total=parseFloat(order_object.freight)+parseFloat(order_object.amount)+parseFloat(order_object.tax);
								order_object.total_quantity=parseFloat(data_row.quantity);

								data_row.order_system_id=order_object.id;
								for(var j=0;j<order_array.length;j++)
				                {
				                	if(order_array[j].order_num==order_object.order_num)
				                	{
				                		add_order=false;
				                		order_array[j].freight=parseFloat(order_array[j].freight)+parseFloat(order_object.freight);
										order_array[j].amount=parseFloat(order_array[j].amount)+parseFloat(order_object.amount);
										order_array[j].tax=parseFloat(order_array[j].tax)+parseFloat(order_object.tax);
										order_array[j].total=parseFloat(order_array[j].total)+parseFloat(order_object.total);
										order_array[j].total_quantity=parseFloat(order_array[j].total_quantity)+parseFloat(order_object.total_quantity);
										data_row.order_system_id=order_array[j].id;
				                		break;
				                	}
				                }

		   						order_item_object.order_id=data_row.order_system_id;
								order_item_array.push(order_item_object);

				                if(add_order)
				                {
				                	order_array.push(order_object);
				                }

							});

							order_array.forEach(function(row)
							{
								if((counter%500)===0)
								{
									data_xml+="</sale_orders><separator></separator><sale_orders>";
								}
								counter+=1;
								data_xml+="<row>" +
										"<id>"+row.id+"</id>" +
										"<order_num>"+row.order_num+"</order_num>" +
										"<channel>"+channel+"</channel>" +
										"<customer_name>"+row.customer+"</customer_name>"+
										"<pincode>"+row.pincode+"</pincode>"+
										"<order_date>"+get_raw_time(row.order_date)+"</order_date>"+
										"<freight>"+row.freight+"</freight>"+
										"<amount>"+row.amount+"</amount>"+
										"<tax>"+row.tax+"</tax>"+
										"<total>"+row.total+"</total>"+
										"<total_quantity>"+row.total_quantity+"</total_quantity>"+
										"<status>pending</status>"+
										"<billing_type>"+row.tax_type+"</billing_type>"+
										"<import_date>"+last_updated+"</import_date>" +
										"<last_updated>"+last_updated+"</last_updated>" +
										"</row>";
							});

							//console.log(order_item_array);
							order_item_array.forEach(function(row)
							{
								if((counter%500)===0)
								{
									data2_xml+="</sale_order_items><separator></separator><sale_order_items>";
								}
								counter+=1;

								data2_xml+="<row>" +
										"<id>"+row.id+"</id>" +
										"<order_id>"+row.order_id+"</order_id>"+
				                        "<item_name>"+row.item_name+"</item_name>"+
				                        "<item_desc>"+row.item_desc+"</item_desc>"+
				                        "<channel_sku>"+row.channel_sku+"</channel_sku>"+
				                        "<vendor_sku>"+row.vendor_sku+"</vendor_sku>"+
				                        "<quantity>"+row.quantity+"</quantity>"+
				                        "<notes></notes>"+
				                        "<mrp>"+row.mrp+"</mrp>"+
				                        "<unit_price>"+row.unit_price+"</unit_price>"+
				                        "<selling_price>"+row.selling_price+"</selling_price>"+
				                        "<amount>"+row.amount+"</amount>"+
				                       	"<tax>"+row.tax+"</tax>"+
				                       	"<tax_rate>"+row.tax_rate+"</tax_rate>"+
				                        "<freight>"+row.freight+"</freight>"+
				                        "<total>"+row.total+"</total>"+
										"<last_updated>"+last_updated+"</last_updated>" +
										"</row>";
							});

							customer_array.forEach(function(row)
							{
								if((counter%500)===0)
								{
									data3_xml+="</customers><separator></separator><customers>";
								}
								counter+=1;

								data3_xml+="<row>" +
										"<id>"+row.id+"</id>" +
										"<name>"+row.name+"</name>"+
				                        "<acc_name unique='yes'>"+row.acc_name+"</acc_name>"+
				                        "<email>"+row.email+"</email>"+
				                        "<phone>"+row.phone+"</phone>"+
				                        "<status>active</status>"+
				                        "<address>"+row.address+"</address>"+
				                        "<city>"+row.city+"</city>"+
				                        "<pincode>"+row.pincode+"</pincode>"+
				                        "<state>"+row.state+"</state>"+
				                        "<country>"+row.country+"</country>"+
				                        "<last_updated>"+last_updated+"</last_updated>" +
										"</row>";
							});

							data_xml+="</sale_orders>";
							data2_xml+="</sale_order_items>";
							data3_xml+="</customers>";

							console.log(data2_xml);
							create_batch(data_xml);
							create_batch(data2_xml);
							create_batch(data3_xml);

				           	////////////////////
				        	progress_value=15;

				        	//console.log(data_array.length);

				        	var ajax_complete=setInterval(function()
				        	{
				        		//console.log(number_active_ajax);
				        		if(number_active_ajax===0)
				        		{
				        			progress_value=15+(1-(localdb_open_requests/(2*data_array.length)))*85;
				        		}
				        		else if(localdb_open_requests===0)
				        		{
				        			progress_value=15+(1-((500*(number_active_ajax-1))/(2*data_array.length)))*85;
				        		}

				        		if(number_active_ajax===0 && localdb_open_requests===0)
				        		{
				        			hide_progress();
				        			selected_file.value="Upload complete";
				        			$(select_file).val('');
				        			$("#modal138").dialog("close");
				        			clearInterval(ajax_complete);
				        		}
				        	},1000);
				        }
				        else
				        {
				        	hide_progress();
		        			$(select_file).val('');
		        			$("#modal138").dialog("close");
		        			modal164_action(error_array);
				        }
			        });
			    });
			});
	     };
	     reader.readAsText(file);
    });

	$("#modal138").dialog("open");
}

/**
 * @modal Assign Barcode
 * @modalNo 139
 */
function modal139_action(id,name,description,button)
{
	var form=document.getElementById("modal139_form");
	var barcode_filter=form.elements['barcode'];
	var sku_filter=form.elements['sku'];
	var name_filter=form.elements['name'];
	var id_filter=form.elements['id'];
	var check_filter=form.elements['check'];

	var barcode_img=document.getElementById('modal139_barcode_img');

	$(check_filter).off('change');
	$(check_filter).on('change',function ()
	{
		if(check_filter.checked)
		{
			barcode_filter.value=get_my_time();
		}
	});

	check_filter.checked=false;
	barcode_filter.value="";

	sku_filter.value=name;
	name_filter.value=description;
	id_filter.value=id;

	$(barcode_img).off('click');
	$(barcode_img).on('click',function ()
	{
		if(barcode_filter.value!="")
			print_product_barcode(barcode_filter.value,sku_filter.value,name_filter.value);
	});

	$(barcode_filter).focus();

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

		var id=id_filter.value;
		var barcode=barcode_filter.value;

		var last_updated=get_my_time();
		var data_xml="<product_master>" +
					"<id>"+id+"</id>" +
					"<bar_code>"+barcode+"</bar_code>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</product_master>";
		update_simple(data_xml);

		$("#modal139").dialog("close");

		button.removeAttribute("onclick");
		$(button).on('click',function ()
		{
			print_product_barcode(barcode,name,description);
		});
		$(button).attr('title','Print Barcode - '+barcode);
	});

	$("#modal139").dialog("open");
}

/**
 * @modal Import purchase orders
 */
function modal140_action(i_func)
{
	var form=document.getElementById('modal140_form');

	var template_button=form.elements[1];
	var select_file=form.elements[2];
	var dummy_button=form.elements[3];
	var selected_file=form.elements[4];
	var import_button=form.elements[5];

	$(dummy_button).off('click');
	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(select_file).trigger('click');
	});

	dummy_button.setAttribute('class','btn red-sunglo');
	select_file.value="";
	selected_file.value="";

	$(select_file).off('change');
	$(select_file).on('change',function ()
	{
		var file_name=select_file.value;
		if(file_name!="" && (file_name.indexOf('csv')>-1))
		{
			dummy_button.setAttribute('class','btn green-jungle');
	        selected_file.value=file_name;
		}
		else
		{
			dummy_button.setAttribute('class','btn red-sunglo');
	        select_file.value="";
			selected_file.value="";
		}
	});

	$(template_button).off("click");
	$(template_button).on("click",function(event)
	{
		var data_array=['order_num','order_date','supplier_name','supplier_email','phone','address',
						'item_name','supplier_sku','system_sku','item_mrp','item_price',
						'brand','quantity','order_status','tax_rate','cst','last_updated'];
		my_array_to_csv(data_array);
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		show_progress();
		show_loader();

		var file=select_file.files[0];
        var fileType = /csv/gi;

        selected_file.value = "Uploading!! Please don't refresh";
    	var reader = new FileReader();
        reader.onload = function(e)
        {
        	progress_value=2;
        	var content=reader.result;
        	var data_array=vUtil.csv2array(content);

			progress_value=5;

			var list1_data=new Object();
					list1_data.count=0;
					list1_data.start_index=0;
					list1_data.data_store='purchase_orders';
					list1_data.return_column='order_num';
					list1_data.indexes=[{index:'order_num'}];

			read_json_single_column(list1_data,function(orders)
			{
				var list_data=new Object();
					list_data.count=0;
					list_data.start_index=0;
					list_data.data_store='product_master';
					list_data.return_column='name';
					list_data.indexes=[{index:'name'}];

				read_json_single_column(list_data,function(products)
				{
					var validate_template_array=[{column:'order_date',required:'yes',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
												{column:'order_num',required:'yes',regex:new RegExp('^[0-9a-zA-Z-]+$'),anti_list:orders},
												{column:'supplier_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z\' _.,/@$!()-]+$')},
												{column:'supplier_email',regex:new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z_.-]+$')},
												{column:'phone',regex:new RegExp('^[0-9 ./+,-]+$')},
												{column:'address'},
												{column:'item_name',regex:new RegExp('^[0-9a-zA-Z\' _.,/@$!()-]+$')},
												{column:'supplier_sku',regex:new RegExp('^[0-9a-zA-Z_ -]+$')},
												{column:'system_sku',required:'yes',list:products},
												{column:'item_mrp',required:'yes',regex:new RegExp('^[0-9.]+$')},
												{column:'item_price',required:'yes',regex:new RegExp('^[0-9.]+$')},
												{column:'brand',regex:new RegExp('^[0-9a-zA-Z _.,/@$!()-]+$')},
												{column:'quantity',required:'yes',regex:new RegExp('^[0-9.]+$')},
												{column:'order_status',required:'yes',list:['draft','order placed','closed','partially received','completely received','cancelled']},
												{column:'tax_rate',required:'yes',regex:new RegExp('^[0-9.]+$')},
												{column:'cst',required:'yes',list:['yes','no']}];

					var error_array=vImport.validate(data_array,validate_template_array);
					//var error_array=new Object();
					//error_array.status='success';
					if(error_array.status=='success')
					{
						hide_loader();
			        	progress_value=10;

		           		//////////////////

			       		var data_xml="<purchase_orders>";
			       		var data2_xml="<purchase_order_items>";
						var data3_xml="<suppliers>";
						var data4_xml="<accounts>";

						var counter=1;
						var last_updated=get_my_time();
						var order_array=[];
						var order_item_array=[];
						var supplier_array=[];

						/*
						var import_items_count=data_array.length;
						//console.log(data_array.length);
						var unique_items_in_import=[];

						var import_items_string="--";
						data_array.forEach(function (data_row)
						{
							import_items_string+=data_row.system_sku+"--";
							unique_items_in_import.push(data_row.system_sku);
						});

						unique_items_in_import=vUtil.arrayUnique(unique_items_in_import);


						//console.log(products);
						//console.log(unique_items_in_import);
						if(products.length==unique_items_in_import.length)
						{
						*/
							data_array.forEach(function (data_row)
							{
								counter+=1;
								var supplier=data_row.supplier_name+" ("+data_row.phone+")";
								var supplier_object=new Object();
								supplier_object.id=last_updated+counter;
								supplier_object.name=data_row.supplier_name;
								supplier_object.acc_name=supplier;
				                supplier_object.email=data_row.supplier_email;
				                supplier_object.phone=data_row.phone;
				                supplier_object.address=data_row.address;

				                var add_supplier=true;

				                for(var i=0;i<supplier_array.length;i++)
				                {
				                	if(supplier_array[i].acc_name==supplier_object.acc_name)
				                	{
				                		add_supplier=false;
				                		break;
				                	}
				                }

				            	if(add_supplier)
				            	{
				            		supplier_array.push(supplier_object);
				            	}

								var add_order=true;

								var order_object=new Object();
								order_object.id=last_updated+counter;
								order_object.order_num=data_row.order_num;
				                order_object.supplier=supplier;
				                order_object.order_date=data_row.order_date;
				                order_object.tax_rate=data_row.tax_rate;
				                if(data_row.cst=='yes')
				                {
				                	order_object.tax_rate=get_session_var('cst_rate');
				                }
				                order_object.cst=data_row.cst;
				                order_object.total_quantity=data_row.quantity;
				                order_object.status=data_row.order_status;
				                order_object.amount=parseFloat(data_row.item_price)*parseFloat(data_row.quantity);
				                order_object.tax=Math.round(parseFloat(order_object.amount)*parseFloat(order_object.tax_rate)/100);
								order_object.total=parseFloat(order_object.amount)+parseFloat(order_object.tax);
								data_row.order_system_id=order_object.id;

								for(var j=0;j<order_array.length;j++)
				                {
				                	if(order_array[j].order_num==order_object.order_num)
				                	{
				                		add_order=false;
				                		order_array[j].amount=parseFloat(order_array[j].amount)+parseFloat(order_object.amount);
										order_array[j].tax=parseFloat(order_array[j].tax)+parseFloat(order_object.tax);
										order_array[j].total=parseFloat(order_array[j].total)+parseFloat(order_object.total);
				                		order_array[j].total_quantity=parseFloat(order_array[j].total_quantity)+parseFloat(order_object.total_quantity);

										data_row.order_system_id=order_array[j].id;
				                		break;
				                	}
				                }

				                if(add_order)
				                {
				                	order_array.push(order_object);
				                }
								var order_item_object=new Object();
								order_item_object.id=last_updated+counter;
								order_item_object.order_id=data_row.order_system_id;
				                order_item_object.item_name=data_row.system_sku;
				                order_item_object.item_desc=data_row.item_name;
				                order_item_object.supplier_sku=data_row.supplier_sku;
				                order_item_object.quantity=data_row.quantity;
				                order_item_object.make=data_row.brand;
				                order_item_object.mrp=data_row.item_mrp;
				                order_item_object.tax_rate=data_row.tax_rate;
				                if(data_row.cst=='yes')
				                {
				                	order_item_object.tax_rate=get_session_var('cst_rate');
				                }
				                order_item_object.price=data_row.item_price;
				                order_item_object.amount=parseFloat(data_row.item_price)*parseFloat(data_row.quantity);
				                order_item_object.tax=Math.round(parseFloat(order_item_object.amount)*parseFloat(order_item_object.tax_rate)/100);
				                order_item_object.total=parseFloat(order_item_object.amount)+parseFloat(order_item_object.tax);
								order_item_array.push(order_item_object);
								console.log(order_item_object.tax);
								console.log(order_item_object.amount);
								console.log(order_item_object.tax_rate);
							});

							order_array.forEach(function(row)
							{
								if((counter%500)===0)
								{
									data_xml+="</purchase_orders><separator></separator><purchase_orders>";
								}
								counter+=1;
								data_xml+="<row>" +
										"<id>"+row.id+"</id>" +
										"<order_num>"+row.order_num+"</order_num>" +
										"<supplier>"+row.supplier+"</supplier>"+
										"<order_date>"+get_raw_time(row.order_date)+"</order_date>"+
										"<amount>"+row.amount+"</amount>"+
										"<tax>"+row.tax+"</tax>"+
										"<total>"+row.total+"</total>"+
										"<total_quantity>"+row.total_quantity+"</total_quantity>"+
										"<status>"+row.status+"</status>"+
										"<cst>"+row.cst+"</cst>"+
										"<last_updated>"+last_updated+"</last_updated>" +
										"</row>";
							});

							order_item_array.forEach(function(row)
							{
								if((counter%500)===0)
								{
									data2_xml+="</purchase_order_items><separator></separator><purchase_order_items>";
								}
								counter+=1;

								data2_xml+="<row>" +
										"<id>"+row.id+"</id>" +
										"<order_id>"+row.order_id+"</order_id>"+
				                        "<item_name>"+row.item_name+"</item_name>"+
				                        "<item_desc>"+row.item_desc+"</item_desc>"+
				                        "<supplier_sku>"+row.supplier_sku+"</supplier_sku>"+
				                        "<make>"+row.make+"</make>"+
				                        "<quantity>"+row.quantity+"</quantity>"+
				                        "<mrp>"+row.mrp+"</mrp>"+
				                        "<price>"+row.price+"</price>"+
				                        "<amount>"+row.amount+"</amount>"+
				                        "<tax>"+row.tax+"</tax>"+
				                        "<total>"+row.total+"</total>"+
										"<tax_rate>"+row.tax_rate+"</tax_rate>"+
				                        "<last_updated>"+last_updated+"</last_updated>" +
										"</row>";
							});

							supplier_array.forEach(function(row)
							{
								if((counter%500)===0)
								{
									data3_xml+="</suppliers><separator></separator><suppliers>";
									data4_xml+="</accounts><separator></separator><accounts>";
								}
								counter+=1;

								data3_xml+="<row>" +
										"<id>"+row.id+"</id>" +
										"<name>"+row.name+"</name>"+
				                        "<acc_name unique='yes'>"+row.acc_name+"</acc_name>"+
				                        "<email>"+row.email+"</email>"+
				                        "<phone>"+row.phone+"</phone>"+
				                        "<address>"+row.address+"</address>"+
				                        "<last_updated>"+last_updated+"</last_updated>" +
										"</row>";
								data4_xml+="<row>" +
										"<id>"+row.id+"</id>" +
										"<acc_name unique='yes'>"+row.acc_name+"</acc_name>" +
										"<description></description>" +
										"<type>supplier</type>" +
										"<username></username>" +
										"<status>active</status>"+
										"<last_updated>"+last_updated+"</last_updated>" +
										"</row>";

							});

							data_xml+="</purchase_orders>";
							data2_xml+="</purchase_order_items>";
							data3_xml+="</suppliers>";
							data3_xml+="</accounts>";

							create_batch(data_xml);
							create_batch(data2_xml);
							create_batch(data3_xml);
							create_batch(data4_xml);

				           	////////////////////
				        	progress_value=15;

				        	var ajax_complete=setInterval(function()
				        	{
				        		//console.log(number_active_ajax);
				        		if(number_active_ajax===0)
				        		{
				        			progress_value=15+(1-(localdb_open_requests/(2*data_array.length)))*85;
				        		}
				        		else if(localdb_open_requests===0)
				        		{
				        			progress_value=15+(1-((500*(number_active_ajax-1))/(2*data_array.length)))*85;
				        		}

				        		if(number_active_ajax===0 && localdb_open_requests===0)
				        		{
				        			hide_progress();
				        			selected_file.value="Upload complete";
				        			$(select_file).val('');
				        			$("#modal140").dialog("close");
				        			clearInterval(ajax_complete);
				        		}
				        	},1000);
				        //}
				        /*else
				        {
			        		hide_progress();
		        			$(select_file).val('');
		        			$("#modal140").dialog("close");
		        			$("#modal73_link").click();
				        }*/
				    }
				    else
				    {
				    	hide_progress();
	        			$(select_file).val('');
	        			$("#modal140").dialog("close");
	        			modal164_action(error_array);
				    }
				});
	        });
        }

        reader.readAsText(file);
    });

	$("#modal140").dialog("open");
}

/**
 * @modalNo 141
 * @modal Print laundry tags
 * @param button
 */
function modal141_action(button)
{
	var form141=document.getElementById('modal141_form');
	var save_button=form141.elements['save'];
	var cancel_button=form141.elements['cancel'];

	var form_id=$(button).attr('form');
	var form=document.getElementById(form_id);
	var item=form.elements[1].value;
	var quantity=form.elements[3].value;
	var plan_item_id=form.elements[7].value;

	form141.elements['quantity'].value=quantity;

	var batch_filter=form141.elements['batch'];
	var price_filter=form141.elements['price'];
	var storage_filter=form141.elements['storage'];
	var new_batch_filter=form141.elements['new_batch'];

	var storage_data="<store_areas>"+
					"<name></name>"+
					"</store_areas>";
	set_my_value_list(storage_data,storage_filter,function ()
	{
		$(storage_filter).focus();
	});

	$(batch_filter).off('blur');
	$(batch_filter).on('blur',function ()
	{
		var price_xml="<product_instances>"+
					"<sale_price></sale_price>"+
					"<product_name exact='yes'>"+item+"</product_name>"+
					"<batch exact='yes'>"+batch_filter.value+"</batch>"+
					"</product_instances>";
		get_single_column_data(function(prices)
		{
			if(prices.length>0)
			{
				price_filter.value=prices[0];
				new_batch_filter.value='no';
			}
			else
			{
				price_filter.value="";
				new_batch_filter.value='yes';
			}
		},price_xml);
	});

	////adding pre-requiresites data///////
	var raw_label=document.getElementById('modal141_raw');
	raw_label.innerHTML="";
	var raw_data="<pre_requisites>" +
			"<type exact='yes'>product</type>" +
			"<requisite_type exact='yes'>product</requisite_type>"+
			"<name exact='yes'>"+item+"</name>" +
			"<requisite_name></requisite_name>"+
			"<quantity></quantity>"+
			"</pre_requisites>";
	fetch_requested_data('',raw_data,function(raws)
	{
		raw_label.innerHTML="<b>Please specify the quantities of raw material used</b><br>";
		raws.forEach(function(raw)
		{
			var attr_label=document.createElement('label');
			attr_label.setAttribute('data-name',raw.requisite_name);
			raw.quantity=parseFloat(raw.quantity)*parseFloat(quantity);
			attr_label.innerHTML=raw.requisite_name+": <input type='text' value='' style='width:60px;' required name='batch_"+raw.requisite_name+"'> <input type='number' style='width:40px;' step='any' value='"+raw.quantity+"' required name='quantity_"+raw.requisite_name+"'>";

			raw_label.appendChild(attr_label);
			var line_break=document.createElement('br');
			raw_label.appendChild(line_break);

			var batch_data="<product_instances>"+
							"<batch></batch>"+
							"<product_name exact='yes'>"+raw.requisite_name+"</product_name>"+
							"</product_instances>";
			var batch_filter=form141.elements['batch_'+raw.requisite_name];
			set_my_value_list(batch_data,batch_filter);
		});
	});


	$(form141).off('submit');
	$(form141).on('submit',function(e)
	{
		e.preventDefault();
		form.elements[6].value='completed';
		var last_updated=get_my_time();
		var batch=batch_filter.value;
		var price=price_filter.value;
		var storage=storage_filter.value;

		//console.log(storage_filter);

		////update production plan item
		var plan_item_xml="<production_plan_items>"+
						"<id>"+plan_item_id+"</id>"+
						"<batch>"+batch+"</batch>"+
						"<status>completed</status>"+
						"<last_updated>"+last_updated+"</last_updated>"+
						"</production_plan_items>";
		update_simple(plan_item_xml);

		///add to inventory
		var item_created_xml="<inventory_adjust>"+
							"<id>"+get_new_key()+"</id>"+
							"<product_name>"+item+"</product_name>"+
							"<batch>"+batch+"</batch>"+
							"<quantity>"+quantity+"</quantity>"+
							"<source>manufacturing</source>"+
							"<source_id>"+plan_item_id+"</source_id>"+
							"<storage>"+storage+"</storage>"+
							"<last_updated>"+last_updated+"</last_updated>"+
							"</inventory_adjust>";
		create_simple(item_created_xml);

		///add product instance if not exist
		if(new_batch_filter.value=='yes')
		{
			var instance_xml="<product_instances>"+
							"<id>"+get_new_key()+"</id>"+
							"<sale_price>"+price+"</sale_price>"+
							"<product_name>"+item+"</product_name>"+
							"<batch exact='yes'>"+batch+"</batch>"+
							"<manufacture_date>"+get_my_time()+"</manufacture_date>"+
							"<last_updated>"+last_updated+"</last_updated>"+
							"</product_instances>";
			create_simple(instance_xml);
		}

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
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				create_simple(storage_xml);
			}
		});

		///subtract inventory for raw material
		var id=get_new_key();
		$("#modal141_raw").find('label').each(function()
		{
			id++;
			var batch=$(this).find('input:first-child').val();
			var item_quantity=$(this).find('input:nth-child(2)').val();
			//console.log(batch+" "+item_quantity);
			var requisite=$(this).attr('data-name');
			if(item_quantity!=0)
			{
				var item_subtracted_xml="<inventory_adjust>"+
							"<id>"+id+"</id>"+
							"<product_name>"+requisite+"</product_name>"+
							"<batch>"+batch+"</batch>"+
							"<quantity>-"+item_quantity+"</quantity>"+
							"<source>manufacturing</source>"+
							"<source_id>"+plan_item_id+"</source_id>"+
							"<storage>"+storage+"</storage>"+
							"<last_updated>"+last_updated+"</last_updated>"+
							"</inventory_adjust>";
				create_simple(item_subtracted_xml);
			}
		});
		$(button).hide();
		$("#modal141").dialog("close");

	});

	$(cancel_button).on('click',function()
	{
		$("#modal141").dialog("close");
	});

	$("#modal141").dialog("open");
}

/**
 * @modalNo 142
 * @modal Add new batch (Aurilion)
 */
function modal142_action(func)
{
	var form=document.getElementById('modal142_form');

	var fname=form.elements['name'];
	var fbatch=form.elements['batch'];
	var fexpiry=form.elements['expiry'];
	var fmrp=form.elements['mrp'];
	var fcp=form.elements['cost'];
	var fsp=form.elements['sale'];

	$(fexpiry).datepicker();

	var name_data={data_store:'product_master',return_column:'name'};
	set_my_value_list_json(name_data,fname);

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form1') || is_create_access('form207'))
		{
			var name=fname.value;
			var batch=fbatch.value;

			batch = batch.replace(/[^a-z0-9A-Z<>\t\n \!\@\$\&\%\^\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
			batch = batch.replace(/â/g,'');

			var expiry=get_raw_time(fexpiry.value);
			var mrp=fmrp.value;
			var cp=fcp.value;
			var sp=fsp.value;
			var data_id=get_new_key();
			var last_updated=get_my_time();

			var data_json={data_store:'product_instances',
			data:[{index:'id',value:data_id},
					{index:'product_name',value:name},
					{index:'batch',value:batch,uniqueWith:['product_name']},
					{index:'expiry',value:expiry},
					{index:'mrp',value:mrp},
					{index:'cost_price',value:cp},
					{index:'sale_price',value:sp},
					{index:'last_updated',value:last_updated}],
				log:'yes',
				log_data:{title:'Added',notes:'New Batch '+batch+' for item '+name,link_to:'form207'}};

			create_json(data_json,function ()
			{
				if(typeof func!='undefined')
				{
					func();
				}
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal142_link").click();
}

/**
 * @modalNo 143
 * @modal Update Inventory (aurilion)
 */
function modal143_action(item_name,batch)
{
	var form=document.getElementById('modal143_form');

	var fitem=form.elements['name'];
	var fbatch=form.elements['batch'];
	var ffresh=form.elements['fresh'];
	var finuse=form.elements['inuse'];
	fitem.value=item_name;
	fbatch.value=batch;

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form207'))
		{
			var fresh=parseFloat(ffresh.value);
			var inuse=parseFloat(finuse.value);
			var last_updated=get_my_time();

			var inuse_data={data_store:'bill_items',sum:'yes',return_column:'quantity',
							indexes:[{index:'hired',exact:'yes'},
									{index:'fresh',exact:'yes'},
									{index:'item_name',exact:item_name},
									{index:'batch',exact:batch}]};
			read_json_single_column(inuse_data,function(hireables)
			{
				var new_inuse=inuse;
				if(hireables.length>0)
				{
					new_inuse-=parseFloat(hireables[0]);
				}

				var hireable_json={data_store:'bill_items',
					warning:'no',
					data:[{index:'id',value:get_new_key()},
						{index:'quantity',value:new_inuse},
						{index:'hired',value:'yes'},
						{index:'fresh',value:'yes'},
						{index:'item_name',value:item_name},
						{index:'batch',value:batch},
						{index:'from_date',value:last_updated},
						{index:'to_date',value:last_updated},
						{index:'last_updated',value:last_updated}]};

				get_inventory(item_name,batch,function(inventory)
				{
					var new_total=fresh+inuse-parseFloat(inventory);
					var adjust_json={data_store:'inventory_adjust',
						warning:'no',
						data:[{index:'id',value:get_new_key()},
							{index:'quantity',value:new_total},
							{index:'product_name',value:item_name},
							{index:'batch',value:batch},
							{index:'last_updated',value:last_updated}]};

					create_json(adjust_json);
					create_json(hireable_json);
				});
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal143_link").click();
}

/**
 * @modalNo 144
 * @modal Add document
 * @param button
 */
function modal144_action(doc_type,target_id,func)
{
	var form=document.getElementById('modal144_form');

	var fname=form.elements['name'];
	var docInfo=document.getElementById('modal144_url');
	var fpicture=form.elements['fi'];
    var dummy_button=form.elements['dummy'];

	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(fpicture).trigger('click');
	});

	fpicture.addEventListener('change',function(evt)
	{
		select_document(evt,function(dataURL)
		{
			docInfo.setAttribute('href',dataURL);
		});
	},false);

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form39'))
		{
			var doc_name=fname.value;
			var data_id=get_new_key();
			var url=$(docInfo).attr('href');
			var last_updated=get_my_time();

			if(url!="")
			{
                var data_json={data_store:'documents',
 				data:[{index:'id',value:data_id},
	 					{index:'url',value:url},
	 					{index:'doc_name',value:doc_name},
	 					{index:'doc_type',value:doc_type},
	 					{index:'target_id',value:target_id},
	 					{index:'last_updated',value:last_updated}]};

				create_json(data_json);

				if(typeof func!='undefined')
				{
					func(url,doc_name);
				}
			}
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal144_link").click();
}

/**
 * @modalNo 145
 * @modal Update Contact
 * @param button
 */
function modal145_action(customer_acc_name)
{
	var form=document.getElementById('modal145_form');

	var fname=form.elements[1];
	var fphone=form.elements[2];
	var femail=form.elements[3];
	var faddress=form.elements[4];
	var fpincode=form.elements[5];
	var fcity=form.elements[6];
	var fstate=form.elements[7];
	var fid=form.elements['id'];

	var customer_xml="<customers count='1'>"+
					"<id></id>"+
					"<name></name>"+
					"<phone></phone>"+
					"<email></email>"+
					"<address></address>"+
					"<city></city>"+
					"<state></state>"+
					"<pincode></pincode>"+
					"<acc_name exact='yes'>"+customer_acc_name+"</acc_name>"+
					"</customers>";
	fetch_requested_data('',customer_xml,function(customers)
	{
		if(customers.length>0)
		{
			fname.value=customers[0].name;
			fphone.value=customers[0].phone;
			femail.value=customers[0].email;
			faddress.value=customers[0].address;
			fpincode.value=customers[0].pincode;
			fcity.value=customers[0].city;
			fstate.value=customers[0].state;
			fid.value=customers[0].id;
		}
	});

	////adding attribute fields///////
	var attribute_label=document.getElementById('modal145_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<attributes>" +
			"<id></id>"+
			"<attribute></attribute>" +
			"<value></value>"+
			"<type exact='yes'>customer</type>" +
			"<name exact='yes'>"+customer_acc_name+"</name>" +
			"</attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
				var attr_label=document.createElement('label');
				attr_label.innerHTML=attribute.attribute+" <input type='text' name='"+attribute.id+"' value='"+attribute.value+"'>";
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
		});
	});


	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form30'))
		{
			var name=fname.value;

			name = name.replace(/[^a-z0-9A-Z<>\t\n \!\@\$\&\%\^\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
			name = name.replace(/â/g,'');
			name = name.replace(/&/g, "and");

			var phone=fphone.value;
			var email=femail.value;
			var address=faddress.value;

			address = address.replace(/[^a-z0-9A-Z<>\t\n \!\@\$\&\%\^\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
			address = address.replace(/â/g,'');
			address = address.replace(/&/g, "and");

			var pincode=fpincode.value;
			var city=fcity.value;
			var state=fstate.value;
			var data_id=fid.value;
			var last_updated=get_my_time();
			var data_xml="<customers>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"<phone>"+phone+"</phone>" +
						"<email>"+email+"</email>" +
						"<status>active</status>" +
						"<address>"+address+"</address>" +
						"<pincode>"+pincode+"</pincode>" +
						"<city>"+city+"</city>" +
						"<state>"+state+"</state>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</customers>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>customers</tablename>" +
						"<link_to>form30</link_to>" +
						"<title>Updated</title>" +
						"<notes>Details for customer "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			update_row(data_xml,activity_xml);

			$("#modal145_attributes").find('input, select').each(function()
			{
				var value=$(this).val();
				var id=$(this).attr('name');

				var attribute_xml="<attributes>" +
						"<id>"+id+"</id>" +
						"<value>"+value+"</value>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</attributes>";
				update_simple(attribute_xml);
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal145").dialog("close");
	});

	$("#modal145").dialog("open");
}

/**
 * @modalNo 146
 * @modal Add Test Results
 * @param button
 */
function modal146_action(test_data_id,test_id,item)
{
	var form=document.getElementById('modal146_form');

	var fdate=form.elements['date'];
	var fresult=form.elements['result'];
	var fdetails=form.elements['notes'];
	var docInfo=document.getElementById('modal146_url');
	var fpicture=form.elements['fi'];
	var fnext=form.elements['due'];
    var dummy_button=form.elements['dummy'];

	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(fpicture).trigger('click');
	});

	$(fnext).datepicker();
	fdate.value=vTime.date();
	set_static_filter_json('testing_results','response',fresult);

	fpicture.addEventListener('change',function(evt)
	{
		select_document(evt,function(dataURL)
		{
			docInfo.setAttribute('href',dataURL);
		});
	},false);

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form224'))
		{
			var files=fpicture.files;
			var doc_name=test_id+item;
    		var data_id=get_new_key();
			var url=$(docInfo).attr('href');
			var last_updated=get_my_time();

            var result_json={data_store:'testing_results',
	 				data:[{index:'id',value:data_id},
	 					{index:'test_id',value:test_id},
                        {index:'item',value:item},
	 					{index:'details',value:fdetails.value},
                        {index:'response',value:fresult.value},
	 					{index:'next_date',value:get_raw_time(fnext.value)},
	 					{index:'date',value:get_raw_time(fdate.value)},
	 					{index:'last_updated',value:last_updated}]};

			create_json(result_json);

            var test_json={data_store:'testing_process',
	 				data:[{index:'id',value:test_data_id},
	 					{index:'next_due',value:get_raw_time(fnext.value)},
	 					{index:'last_updated',value:last_updated}]};
			update_json(test_json);

			if(url!="" && url!=null)
			{
                var pic_json={data_store:'documents',
	 				data:[{index:'id',value:data_id},
	 					{index:'url',value:url},
                        {index:'doc_type',value:'testing_results'},
	 					{index:'doc_name',value:doc_name},
                        {index:'target_id',value:test_data_id},
	 					{index:'last_updated',value:last_updated}]};

				create_json(pic_json);
			}
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal146_link").click();
}


/**
 * @modalNo 147
 * @modal Return Items
 * @param button
 */
function modal147_action(hiring_type,button)
{
	var form=document.getElementById('modal147_form');
	var fdate=form.elements[1];
	var fitem=form.elements[2];
	var fquantity=form.elements[3];

	$(fdate).datepicker();
	fdate.value=vTime.date();

	var form_id=$(button).attr('form');
	var master_form=document.getElementById(form_id);
	var item_name=master_form.elements[0].value;
	var customer=master_form.elements[3].value;
	var issue_id=master_form.elements[6].value;

	fitem.value=item_name;

	var columns="<bill_items>" +
				"<quantity></quantity>" +
				"<issue_date></issue_date>" +
				"<issue_type exact='yes'>in</issue_type>" +
				"<hiring_type exact='yes'>"+hiring_type+"</hiring_type>" +
				"<issue_id exact='yes'>"+issue_id+"</issue_id>" +
				"</bill_items>";

	fetch_requested_data('',columns,function(return_results)
	{
		var returned_quantity=0;
		var return_date="";
		return_results.forEach(function(r_result)
		{
			returned_quantity+=parseFloat(r_result.quantity);
		});
		var left_quantity=parseFloat(master_form.elements[1].value)-returned_quantity;
		fquantity.setAttribute('max',left_quantity);
		fquantity.value=left_quantity;
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
			var data_id=get_new_key();
			var last_updated=get_my_time();

			var data_xml="<bill_items>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+item_name+"</item_name>" +
					"<hiring_type>"+hiring_type+"</hiring_type>" +
					"<issue_type>in</issue_type>" +
					"<issue_date>"+get_raw_time(fdate.value)+"</issue_date>" +
					"<customer>"+customer+"</customer>" +
					"<quantity>"+fquantity.value+"</quantity>"+
					"<issue_id>"+issue_id+"</issue_id>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bill_items>";
			create_simple(data_xml);

        $("#modal147").dialog("close");
	});

	$("#modal147").dialog("open");
}


/**
 * @modal Import logistics orders status
 */
function modal148_action()
{
	var form=document.getElementById('modal148_form');

	var template_button=form.elements['download'];
	var select_file=form.elements['file'];
	var dummy_button=form.elements['file_dummy'];
	var selected_file=form.elements['selected_file'];
	var import_button=form.elements['save'];

	$(dummy_button).off('click');
	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(select_file).trigger('click');
	});

	dummy_button.setAttribute('class','btn red-sunglo');
	select_file.value="";
	selected_file.value="";

	$(select_file).off('change');
	$(select_file).on('change',function ()
	{
		var file_name=select_file.value;
		if(file_name!="" && (file_name.indexOf('csv')>-1))
		{
			dummy_button.setAttribute('class','btn green-jungle');
	        selected_file.value=file_name;
		}
		else
		{
			dummy_button.setAttribute('class','btn red-sunglo');
	        select_file.value="";
			selected_file.value="";
		}
	});


	$(template_button).off("click");
	$(template_button).on("click",function(event)
	{
		var data_array=['awb','date','order_status','location','remark','received by'];
		my_array_to_csv(data_array);
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		show_progress();
		var file=select_file.files[0];
        var fileType = /csv/gi;

        selected_file.value = "Uploading!! Please don't refresh";
    	var reader = new FileReader();
        reader.onload = function(e)
        {
			progress_value=2;
        	var content=reader.result;
        	var data_array=vUtil.csv2array(content);

			progress_value=5;

			var validate_template_array=[{column:'date',required:'yes',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
										{column:'awb',required:'yes',regex:new RegExp('^[0-9a-zA-Z]+$')},
										{column:'order_status',required:'yes',list:['delivered','undelivered','pending','in-transit','RTO Delivered','RTO in-transit']},
										{column:'location',regex:new RegExp('^[0-9a-zA-Z\' _.,/@$!()-]+$')},
										{column:'received by',regex:new RegExp('^[0-9a-zA-Z\' _.,/@$!()-]+$')},
										{column:'remark',regex:new RegExp('^[0-9a-zA-Z\' _.,/@$!()-]+$')}];

			var error_array=vImport.validate(data_array,validate_template_array);
			//var error_array=new Object();
			//error_array.status='success';
			if(error_array.status=='success')
			{
	        	progress_value=10;

	        	//////////////////

	       		var last_updated=get_my_time();
				var order_array=[];

				var awb_id_array=[];
				for(var i in data_array)
				{
					awb_id_array.push(data_array[i].awb);
				}

				var order_id_xml={data_store:'logistics_orders',
								  indexes:[{index:'id'},
										   {index:'order_history'},
										   {index:'awb_num',array:awb_id_array}]};
				read_json_rows('',order_id_xml,function (order_ids)
				{
					// console.log(order_ids);
					for (var k=0;k<data_array.length;k++)
					{
						for(var l=0;l<order_ids.length;l++)
						{
							if(data_array[k].awb==order_ids[l].awb_num)
							{
								data_array[k].id=order_ids[l].id;
								data_array[k].order_history=order_ids[l].order_history;
								order_ids.splice(l,1);
								break;
							}
						}
					}

					// console.log(data_array);
					data_array.forEach(function (data_row)
					{
						if(typeof data_row.id!='undefined')
						{
							var order_object=new Object();
							order_object.id=data_row.id;
							order_object.status=data_row['order_status'];
							order_object.received_by=data_row['received by'];

							//console.log(order_object);

							var history_object=vUtil.jsonParse(data_row.order_history);
							var new_history_object=new Object();
							new_history_object.timeStamp=get_raw_time(data_row.date);
							new_history_object.location=data_row['location'];
							new_history_object.status=data_row['order_status'];
							new_history_object.details=data_row.remark;

							history_object.push(new_history_object);
							order_object.order_history=JSON.stringify(history_object);
		                	order_array.push(order_object);

		                }
					});

                    var data_json={data_store:'logistics_orders',
                            loader:'yes',
                            log:'yes',
                            data:[],
                            log_data:{title:'Updated orders status',link_to:'form288'}};

                    order_array.forEach(function(row)
                    {
                        var data_json_array=[{index:'id',value:row.id},
                                {index:'status',value:row.status},
                                {index:'received_by',value:row.received_by},
                                {index:'order_history',value:row.order_history},
                                {index:'last_updated',value:last_updated}];

                        data_json.data.push(data_json_array);
					});
					update_batch_json(data_json);

		           	////////////////////
		        	progress_value=15;

		        	var ajax_complete=setInterval(function()
		        	{
		        		//console.log(number_active_ajax);
		        		if(number_active_ajax===0)
		        		{
		        			progress_value=15+(1-(localdb_open_requests/(2*data_array.length)))*85;
		        		}
		        		else if(localdb_open_requests===0)
		        		{
		        			progress_value=15+(1-((500*(number_active_ajax-1))/(2*data_array.length)))*85;
		        		}

		        		if(number_active_ajax===0 && localdb_open_requests===0)
		        		{
		        			hide_progress();
		        			selected_file.value="Upload complete";
		        			$(select_file).val('');
		        			$(form).find(".close").click();
		        			clearInterval(ajax_complete);
		        		}
		        	},1000);
		        });
		    }
		    else
		    {
		    	hide_progress();
       			$(select_file).val('');
       			$(form).find(".close").click();
				modal164_action(error_array);
		    }
        };

        reader.readAsText(file);
    });

	$("#modal148_link").click();
}

function modal149_action()
{
	var form=document.getElementById('modal149_form');

	var template_button=form.elements['download'];
	var channel_filter=form.elements['channel'];
	var type_filter=form.elements['type'];
	var select_file=form.elements['file'];
	var dummy_button=form.elements['file_dummy'];
	var selected_file=form.elements['selected_file'];

	$(dummy_button).off('click');
	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(select_file).trigger('click');
	});

	dummy_button.setAttribute('class','btn red-sunglo');
	select_file.value="";
	selected_file.value="";

	$(select_file).off('change');
	$(select_file).on('change',function ()
	{
		var file_name=select_file.value;
		if(file_name!="" && (file_name.indexOf('csv')>-1))
		{
			dummy_button.setAttribute('class','btn green-jungle');
			selected_file.value=file_name;
		}
		else
		{
			dummy_button.setAttribute('class','btn red-sunglo');
			select_file.value="";
			selected_file.value="";
		}
	});

	set_static_value_list_json('logistics_orders','type',type_filter);
	set_static_value_list_json('logistics_orders','channel',channel_filter);

	$(template_button).off("click");
	$(template_button).on("click",function(event)
	{
		var data_array=['SR no','Date','AWB No.','Type','Order No.','Manifest ID','Customer Name','Consignee',
						'Consignee Address1','Consignee Address2','Destination City',
						'State','Pincode','Tel. Number','Mobile number','Product name','Weight(K.G.)',
						'Declared Value','Collectable Value','Volumetric Weight(g)','LBH','vendor name','Return Address1','Return Address2','Return Address3',
						'Return Pin','Pieces'];
		my_array_to_csv(data_array);
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		show_progress();
		var file=select_file.files[0];
        var fileType = /csv/gi;

        selected_file.value = "Uploading!! Please don't refresh";
    	var reader = new FileReader();
        reader.onload = function(e)
        {
        	progress_value=2;
        	var content=reader.result;
        	var data_array=vUtil.csv2array(content);

			progress_value=5;

			var validate_template_array=[{column:'Date',required:'yes',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
										{column:'AWB No.',required:'yes',regex:new RegExp('^[0-9a-zA-Z]+$')},
										{column:'Type',required:'yes',list:['RTM','PP','COD']},
										{column:'Order No.',required:'yes',regex:new RegExp('^[0-9a-zA-Z]+$')},
										{column:'Manifest ID',required:'yes',regex:new RegExp('^[0-9a-zA-Z]+$')},
										{column:'Customer Name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'@()_.,-]+$')},
										{column:'Consignee',required:'yes',regex:new RegExp('^[0-9a-zA-Z &\'_.,/@$!()-]+$')},
										{column:'Consignee Address1',required:'yes'},
										{column:'Consignee Address2'},
										{column:'Destination City',required:'yes',regex:new RegExp('^[0-9a-zA-Z &\'()_.,-]+$')},
										{column:'Pincode',required:'yes',regex:new RegExp('^[0-9]+$')},
										{column:'State',regex:new RegExp('^[0-9a-zA-Z\' ,-]+$')},
										{column:'Tel. Number',regex:new RegExp('^[0-9\+\(\)\./, -]+$')},
										{column:'Mobile number',regex:new RegExp('^[0-9\+\(\)\./, -]+$')},
										{column:'Weight(K.G.)',regex:new RegExp('^[0-9\. ]+$')},
										{column:'Declared Value',regex:new RegExp('^[0-9\. ]+$')},
										{column:'Collectable Value',regex:new RegExp('^[0-9\. ]+$')},
										{column:'Volumetric Weight(g)',regex:new RegExp('^[0-9\. ]+$')},
										{column:'LBH',regex:new RegExp('^[0-9\.* ]+$')},
										{column:'vendor name',required:'yes'},
										{column:'Return Address1',required:'yes'},
										{column:'Return Address2'},
										{column:'Return Address3'},
										{column:'Return Pin',required:'yes',regex:new RegExp('^[0-9]+$')}];
			data_array.forEach(function(row)
            {
                var product=vUtil.fetch_index(row,'Product name');
                var product_name_array=product.split('|');
                row['Product name']=product_name_array[0];
            });

			var error_array=vImport.validate(data_array,validate_template_array);
			if(error_array.status=='success')
			{
	        	progress_value=10;
	           	//////////////////
                var data_json={data_store:'logistics_orders',
 					loader:'yes',
 					log:'yes',
 					data:[],
 					log_data:{title:'Orders manifest',link_to:'form203'}};

			     var counter=1;
			     var last_updated=get_my_time();

                data_array.forEach(function(row)
				{
					counter+=1;
					var channel=channel_filter.value;
					row.id=last_updated+counter;
					var order_history=[];
					var history_object={timeStamp:get_my_time(),
										details:"Order dispatched from "+channel,
										location:channel,
										status:"dispatched"};
					order_history.push(history_object);
					var order_history_string=JSON.stringify(order_history);
					var product_name_array=row['Product name'].split('|');

					var data_json_array=[{index:'id',value:row.id},
                            {index:'import_date',value:get_raw_time(row['Date'])},
                            {index:'awb_num',unique:'yes',value:row['AWB No.']},
							{index:'channel_name',value:channel},
			                {index:'manifest_type',value:row['Type']},
			                {index:'type',value:type_filter.value},
			                {index:'order_num',value:row['Order No.']},
			                {index:'manifest_id',value:row['Manifest ID']},
			                {index:'merchant_name',value:row['Customer Name']},
			                {index:'ship_to',value:row['Consignee']},
			                {index:'address1',value:row['Consignee Address1']},
			                {index:'address2',value:row['Consignee Address2']},
			                {index:'city',value:row['Destination City']},
			                {index:'state',value:row['State']},
			                {index:'pincode',value:row['Pincode']},
			                {index:'phone',value:row['Mobile number']},
			                {index:'telephone',value:row['Tel. Number']},
			                {index:'weight',value:row['Weight(K.G.)']},
			                {index:'volumetric_weight',value:row['Volumetric Weight(g)']},
                            {index:'declared_value',value:row['Declared Value']},
			                {index:'collectable_value',value:row['Collectable Value']},
			                {index:'shipper_name',value:row['vendor name']},
			                {index:'return_address1',value:row['Return Address1']},
			                {index:'return_address2',value:row['Return Address2']},
			                {index:'return_address3',value:row['Return Address3']},
			                {index:'return_pincode',value:row['Return Address1']},
			                {index:'lbh',value:row['LBH']},
			                {index:'sku',value:row['Product name']},
			                {index:'pieces',value:row['Pieces']},
			                {index:'order_history',value:order_history_string},
			                {index:'status',value:'picked'},
			                {index:'last_updated',value:last_updated}];

                    data_json.data.push(data_json_array);
				});

				create_batch_json(data_json);

	           	////////////////////
	        	progress_value=15;

	        	var ajax_complete=setInterval(function()
	        	{
	        		//console.log(number_active_ajax);
	        		if(number_active_ajax===0)
	        		{
	        			progress_value=15+(1-(localdb_open_requests/(2*data_array.length)))*85;
	        		}
	        		else if(localdb_open_requests===0)
	        		{
	        			progress_value=15+(1-((500*(number_active_ajax-1))/(2*data_array.length)))*85;
	        		}

	        		if(number_active_ajax===0 && localdb_open_requests===0)
	        		{
	        			hide_progress();
	        			selected_file.value="Upload complete";
	        			$(select_file).val('');
	        			$(form).find(".close").click();
	        			clearInterval(ajax_complete);
	        		}
	        	},1000);
	        }
	        else
	        {
	        	hide_progress();
       			$(select_file).val('');
       			$(form).find(".close").click();
				modal164_action(error_array);
	        }
        }
        reader.readAsText(file);
    });

	$("#modal149_link").click();
}

/**
 * @modalNo 150
 * @modal Scan picked items
 */
function modal150_action(rack,report_id)
{
	///////table initialization/////////////
	var item_table=document.getElementById("modal150_table");
	item_table.innerHTML="";
	var item_head=document.createElement('tr');
	item_head.innerHTML="<th>Item</th><th>Batch</th><th>Quantity To pick</th>";
	item_table.appendChild(item_head);

	$("[id^='row_"+report_id+"_']").each(function(index)
	{
		var subform=$(this)[0];
		var storage=subform.elements[5].value;
		if(storage==rack)
		{
			var item_name=subform.elements[1].value;
			var item_desc=subform.elements[2].value;
			var batch=subform.elements[3].value;
			var quantity=parseFloat(subform.elements[4].value);
			var picked_quantity=parseFloat(subform.elements[5].value);
			var row_id=subform.elements[15].value;
			var item_row=document.createElement('tr');

			item_row.setAttribute('id','modal150_row_'+row_id);
			item_row.setAttribute('data-id',row_id);
			item_row.setAttribute('data-sku',item_name);

			if(item_desc=="")
			{
				item_desc=item_name;
			}

			if(report_id=='report90')
			{
				var order_num=subform.elements[11].value;
				var bill_id=subform.elements[12].value;
				item_row.setAttribute('data-order-num',order_num);
				item_row.setAttribute('data-bill-id',bill_id);
			}
			item_row.innerHTML="<td>"+item_desc+"</td><td>"+batch+"</td><td style='text-align:center;'>"+(quantity-picked_quantity)+"</td>";
			item_table.appendChild(item_row);
		}
	});
	//////////////////////////////

	var form=document.getElementById('modal150_form');

	var barcode_filter=form.elements['barcode'];
	var save_button=form.elements['save'];

	$(save_button).off('click');
	$(save_button).on('click',function (event)
	{
		event.preventDefault();
		var master_form_array=[];
		$("[id^='modal150_row_']").each(function(index)
		{
			//console.log('modal_row_parsed');
			var record_id=$(this).attr('data-id');

			var unpicked_quantity=parseFloat($(this).find('td:nth-child(3)').html());

			master_form_array.push("row_"+report_id+"_"+record_id);
			var master_form=document.getElementById("row_"+report_id+"_"+record_id);
			var to_pick_quantity=parseFloat(master_form.elements[4].value);
			var old_pick_quantity=parseFloat(master_form.elements[5].value);
			var new_pick_quantity=to_pick_quantity-unpicked_quantity;
			master_form.elements[5].value=new_pick_quantity;

			//$(master_form).trigger('submit');
		});

		master_form_array=vUtil.arrayUnique(master_form_array);
		//console.log(master_form_array);

		master_form_array.forEach(function(master_form_id)
		{
			var master_form=document.getElementById(master_form_id);
			$(master_form).trigger('submit');
		});

		$("#modal150").dialog("close");
/*
		if(report_id=='report90')
		{
			report90_get_totals();
		}
*/		var report_form=document.getElementById(report_id+'_header');
		var rack_filter=report_form.elements['rack'];
		rack_filter.value="";
		$(rack_filter).focus();
	});

	$(form).off('submit');
	$(form).on('submit',function (event)
	{
		event.preventDefault();
		//console.log('barcode_scanned');
		var product_xml="<product_master>"+
						"<name></name>"+
						"<bar_code exact='yes'>"+barcode_filter.value+"</bar_code>"+
						"</product_master>";
		get_single_column_data(function (products)
		{
			console.log(products);
			if(products.length>0)
			{
				var product_picked=false;
				var product_name=products[0];

				$("[id^='modal150_row_']").each(function(index)
				{
					//console.log($(this));
					//console.log($(this).find('td:first').html());
					//console.log(product_name);
					//console.log(parseFloat($(this).find('td:nth-child(3)').html()));
					//console.log('modal_row_parsed');
					var row_elem=$(this)[0];
					var item_name=row_elem.getAttribute('data-sku');

					if(item_name.toUpperCase()==product_name.toUpperCase() && !product_picked && parseFloat($(this).find('td:nth-child(3)').html())>0)
					{
						//console.log('picked');
						product_picked=true;
						$(this).find('td:nth-child(3)').html((parseFloat($(this).find('td:nth-child(3)').html())-1));
						if(report_id=='report90')
						{
							var bill_id=$(this).attr('data-bill-id');
							var order_num=$(this).attr('data-order-num');
							modal151_action(bill_id,order_num);
						}
					}
				});

				if(!product_picked)
				{
					$("#modal67_link").click();
				}
			}
			else
			{
				$("#modal66_link").click();
			}
			barcode_filter.value="";
		},product_xml);
	});
	///////////////////////////
	$("#modal150").dialog("open");
}

/**
 * @modalNo 151
 * @modal Bag Number for picked items
 */
function modal151_action(bill_id,order_num)
{
	var form=document.getElementById('modal151_form');

	var order_filter=form.elements['order_num'];
	var bag_filter=form.elements['bag_num'];

	order_filter.value=order_num;
	var bill_id_string=""+bill_id;
	var bag_num=bill_id_string.slice(-3);

	bag_filter.value=bag_num;
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		$("#modal151").dialog("close");
	});

	setTimeout(function()
    {
		$("#modal151").dialog("close");
	},2000);

	///////////////////////////
	$("#modal151").dialog("open");
}


/**
 * @modalNo 152
 * @modal Scan putaway items
 */
function modal152_action(rack)
{
	///////table initialization/////////////
	var item_table=document.getElementById("modal152_table");
	var item_table2=document.getElementById("modal152_table2");
	item_table.innerHTML="";
	item_table2.innerHTML="";
	var item_head=document.createElement('tr');
	item_head.innerHTML="<th>Item</th><th>Batch</th><th>Quantity To place</th>";
	item_table.appendChild(item_head);

	var item_head2=document.createElement('tr');
	item_head2.innerHTML="<th>Item</th><th>Batch</th><th>Quantity Placed</th>";
	item_table2.appendChild(item_head2);

	$("[id^='row_form165_']").each(function(index)
	{
		var subform=$(this)[0];
		var storage=subform.elements[4].value;
		//if(storage==rack || storage=="")
		//{
			var item_name=subform.elements[0].value;
			var batch=subform.elements[1].value;
			var quantity=parseFloat(subform.elements[2].value);
			var placed_quantity=parseFloat(subform.elements[3].value);
			var row_id=subform.elements[11].value;
			var item_row=document.createElement('tr');

			item_row.setAttribute('id','modal152_row_'+row_id);
			item_row.setAttribute('data-id',row_id);

			item_row.innerHTML="<td>"+item_name+"</td><td>"+batch+"</td><td style='text-align:center;'>"+(quantity-placed_quantity)+"</td>";
			item_table.appendChild(item_row);
		//}
	});
	//////////////////////////////

	var form=document.getElementById('modal152_form');

	var barcode_filter=form.elements['barcode'];
	var save_button=form.elements['save'];

	$(save_button).off('click');
	$(save_button).on('click',function (event)
	{
		event.preventDefault();

		var master_form_array=[];
		$("[id^='modal152_row_']").each(function(index)
		{
			//console.log('modal_row_parsed');
			var record_id=$(this).attr('data-id');
			var unplaced_quantity=parseFloat($(this).find('td:nth-child(3)').html());

			master_form_array.push("row_form165_"+record_id);
			//console.log(record_id);
			var master_form=document.getElementById("row_form165_"+record_id);
			var to_place_quantity=parseFloat(master_form.elements[2].value);
			var old_placed_quantity=parseFloat(master_form.elements[3].value);
			var row_storage=master_form.elements[4].value;
			var new_placed_quantity=to_place_quantity-unplaced_quantity;

			//if(row_storage=="" && old_placed_quantity!=new_placed_quantity)
			if(old_placed_quantity!=new_placed_quantity)
			{
				master_form.elements[4].value=rack;
			}

			master_form.elements[3].value=new_placed_quantity;

			//$(master_form).trigger('submit');
		});

		master_form_array=vUtil.arrayUnique(master_form_array);
		//console.log(master_form_array);

		master_form_array.forEach(function(master_form_id)
		{
			var master_form=document.getElementById(master_form_id);
			$(master_form).trigger('submit');
		});

		$("#modal152").dialog("close");
		form165_get_totals();
		var report_form=document.getElementById('form165_master');
		var rack_filter=report_form.elements['rack'];
		rack_filter.value="";
		$(rack_filter).focus();
	});

	$(form).off('submit');
	$(form).on('submit',function (event)
	{
		event.preventDefault();
		//console.log('barcode_scanned');
		var product_xml="<product_master>"+
						"<name></name>"+
						"<bar_code exact='yes'>"+barcode_filter.value+"</bar_code>"+
						"</product_master>";
		get_single_column_data(function (products)
		{
			if(products.length>0)
			{
				var product_placed=false;
				var product_name=products[0];


				$("[id^='modal152_row_']").each(function(index)
				{
					var row_elem=$(this);
					if($(this).find('td:first').html()==product_name && !product_placed && parseFloat($(this).find('td:nth-child(3)').html())>0)
					{
						//console.log('picked');
						product_placed=true;
						$(this).find('td:nth-child(3)').html((parseFloat($(this).find('td:nth-child(3)').html())-1));

						var batch=$(this).find('td:nth-child(2)').html();
						var item_row=document.createElement('tr');
						item_row.innerHTML="<td style='margin:2px;word-wrap: break-word;'>"+product_name+"</td><td style='margin:2px;word-wrap: break-word;'>"+batch+"</td><td style='margin:2px;text-align:center;'>1</td>";
						item_table2.appendChild(item_row);
					}
				});

				if(!product_placed)
				{
					$("#modal72_link").click();
				}
			}
			else
			{
				$("#modal66_link").click();
			}
			barcode_filter.value="";
		},product_xml);
	});
	///////////////////////////
	$("#modal152").dialog("open");
}

/**
 * @modalNo 153
 * @modal Close sale lead
 */
function modal153_action(button,lead_id)
{
	var form=document.getElementById('modal153_form');
	var no_button=form.elements['no'];
	var yes_button=form.elements['yes'];

	$(no_button).off('click');
	$(no_button).on('click',function()
	{
		$(form).find(".close").click();
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form213') || is_update_access('form289') || is_update_access('form361'))
		{
			var lead_form_id=$(button).attr('form');
			var last_updated=get_my_time();

			var data_json={data_store:'sale_leads',
	 				data:[{index:'id',value:lead_id},
	 					{index:'due_date',value:''},
	 					{index:'status',value:'closed'},
	 					{index:'last_updated',value:last_updated}]};
			update_json(data_json);
			$(button).parent().parent().attr('class','active');
			$(button).hide();
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal153_link").click();
}

/**
 * @modal View Invoices
 * @modalNo 154
 */
function modal154_action(bill_ids)
{
	var bill_id_array=vUtil.jsonParse(bill_ids);
	var rowsHTML="<tr style='background-color:#2C8A50;'><td>Invoice</td><td>Link</td></tr>";

	bill_id_array.forEach(function (bill_id)
	{
		rowsHTML+="<tr>"+
				"<td>"+bill_id.bill_num+"</td>"+
				"<td><a onclick=\"element_display('"+bill_id.bill_id+"','form91',['form225']); $('#modal154').dialog('close');\"><u style='cursor:pointer;'>View</u></a></td>"+
				"</tr>";
	});

	$('#modal154_item_table').html(rowsHTML);
	$("#modal154").dialog("open");
}

/**
 * @modal Add Receipt
 * @modalNo 155
 */
function modal155_action()
{
	var form=document.getElementById("modal155_form");
	var receipt_filter=form.elements['receipt_id'];
	var date_filter=form.elements['date'];
	var account_filter=form.elements['account'];
	var narration_filter=form.elements['narration'];
	var amount_filter=form.elements['amount'];
	var balance_filter=form.elements['balance'];
	var receipt_record_id="";

	$(date_filter).datepicker();
	date_filter.value=vTime.date();

	var receipt_id_json={data_store:'user_preferences',count:1,
                        indexes:[{index:'id'},
                                {index:'value'},
                                {index:'name',exact:'receipt_id_series'}]};
	read_json_rows('',receipt_id_json,function (receipts)
	{
		if(receipts.length>0)
		{
			receipt_filter.value=get_session_var('receipt_id_prefix')+"-"+receipts[0].value;
			receipt_record_id=receipts[0].id;
		}
	});

	var accounts_data={data_store:'customers',return_column:'acc_name'};
	set_my_value_list_json(accounts_data,account_filter);

	$(account_filter).off('blur');
	$(account_filter).off('change');
	$(account_filter).on('blur change',function(e)
	{
		var transactions_data={data_store:'transactions',
						indexes:[{index:'id'},
								{index:'type'},
								{index:'amount'},
								{index:'acc_name',exact:account_filter.value}]};
		read_json_rows('',transactions_data,function(transactions)
		{
			var balance_amount=0;
			transactions.forEach(function(tran)
			{
				if(tran.type=='received')
				{
					balance_amount-=parseFloat(tran.amount);
				}
				else if(tran.type=='given')
				{
					balance_amount+=parseFloat(tran.amount);
				}
			});

			if(balance_amount==0)
			{
				balance_filter.value="Rs. 0";
			}
			else if(balance_amount>0)
			{
				balance_filter.value="Receivable: Rs. "+balance_amount;
			}
			else
			{
				balance_amount=(-balance_amount);
				balance_filter.value="Payable: Rs. "+balance_amount;
			}
		});
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		///////////////////////////////////////
		event.preventDefault();
		var received_amount=amount_filter.value;
		var receipt_date=get_raw_time(date_filter.value);
		var receipt_id=form.elements['receipt_id'].value;
		var receipt_type='received';
		var account_name=account_filter.value;
		var narration=narration_filter.value;
		var last_updated=vTime.unix();
		var p_id=get_new_key();

		if(is_create_access('form124') || is_create_access('form243') || is_create_access('form291') || is_create_access('form282'))
		{
			var transaction_json={data_store:'transactions',
				data:[{index:'id',value:p_id},
					{index:'acc_name',value:account_name},
					{index:'type',value:receipt_type},
					{index:'amount',value:received_amount},
					{index:'tax',value:'0'},
					{index:'source_id',value:p_id},
					{index:'source_info',value:receipt_id},
					{index:'source',value:'receipt'},
					{index:'source_link',value:'form291'},
					{index:'trans_date',value:receipt_date},
					{index:'notes',value:narration},
					{index:'last_updated',value:last_updated}]};

					create_json(transaction_json);

        	var receipt_json={data_store:'receipts',
	 				data:[{index:'id',value:p_id},
	 					{index:'receipt_id',value:receipt_id},
	 					{index:'type',value:receipt_type},
	 					{index:'amount',value:received_amount},
	 					{index:'narration',value:narration},
	 					{index:'acc_name',value:account_name},
	 					{index:'date',value:receipt_date},
	 					{index:'last_updated',value:last_updated}]};

				create_json(receipt_json);

			var receipt_id_array=receipt_id.split('-');
        	var receipt_id_json={data_store:'user_preferences',
	 				data:[{index:'id',value:receipt_record_id},
	 					{index:'value',value:(parseInt(receipt_id_array[1])+1)+""}]};
			update_json(receipt_id_json);
		}
		else
		{
			$("#modal2_link").click();
		}

		$(form).find(".close").click();
	});

	$("#modal155_link").click();
}

/**
 * @modalNo 156
 * @modal Add new batch (CPS)
 */
function modal156_action(product_type,product_name)
{
	var form=document.getElementById('modal156_form');

	var fname=form.elements['name'];
	var fbatch=form.elements['batch'];
	var fmanufacture=form.elements['date'];

	$(fmanufacture).datepicker();

	var name_data={data_store:'attributes',return_column:'name',
                  indexes:[{index:'type',exact:'product'},
                          {index:'value',exact:'yes'},
                          {index:'attribute',exact:product_type}]};
	set_my_value_list_json(name_data,fname);

	if(typeof product_name!='undefined')
	{
		fname.value=product_name;
	}

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
        var name=fname.value;
        var batch=fbatch.value;
        var manufactury=get_raw_time(fmanufacture.value);
        var data_id=get_new_key();
        var last_updated=get_my_time();
        var link_to='form183';
        if(product_type=='raw material')
        link_to='form238';

        var data_json={data_store:'product_instances',
                    data:[{index:'id',value:data_id},
                        {index:'product_name',value:name,uniqueWith:["batch"]},
                        {index:'batch',value:batch},
                        {index:'manufacture_date',value:manufactury},
                        {index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Added',notes:'New Batch '+batch+' for item '+name,link_to:link_to}};

        create_json(data_json);
        $(form).find(".close").click();
	});

	$("#modal156_link").click();
}

/**
 * @modalNo 157
 * @modal Delete Confirmation
 * @param button
 */
function modal157_action(func)
{
	var form157=document.getElementById('modal157_form');
	var reason_filter=form157.elements['reason'];
	var yes_button=form157.elements['yes'];
	var no_button=form157.elements['no'];

	$(form157).off('submit');
	$(form157).on('submit',function(event)
	{
		var reason_value=reason_filter.value;
		event.preventDefault();

		$("#modal157").dialog("close");
		func(reason_value);
	});

	$(no_button).off('click');
	$(no_button).on('click',function()
	{
		$("#modal157").dialog("close");
	});

	$("#modal157").dialog("open");
}

/**
 * @modalNo 158
 * @modal Update Invoice Confirmation
 * @param button
 */
function modal158_action(bill_id)
{
	var form158=document.getElementById('modal158_form');
	var yes_button=form158.elements[1];
	var no_button=form158.elements[2];

	$(yes_button).off('click');
	$(yes_button).on('click',function()
	{
		$("#modal158").dialog("close");
		show_loader();

		var bill_items_xml="<bill_items>"+
					"<id></id>"+
					"<item_name></item_name>"+
					"<item_desc></item_desc>"+
					"<quantity></quantity>"+
					"<packed_quantity></packed_quantity>"+
					"<total></total>"+
					"<mrp></mrp>"+
					"<batch></batch>"+
					"<picked_status></picked_status>"+
					"<packing_status></packing_status>"+
					"<storage></storage>"+
					"<bill_id exact='yes'>"+bill_id+"</bill_id>"+
					"</bill_items>";
		fetch_requested_data('',bill_items_xml,function (bill_items)
		{
			var master_form=document.getElementById('form210_master');
			var accepted_filter=master_form.elements['accepted'];
			var rejected_filter=master_form.elements['rejected'];

			$(accepted_filter).off('keydown');
			$(rejected_filter).off('keydown');

			if(bill_items.length>0)
			{
				var data_xml="<bill_items>";
				var counter=1;
				var last_updated=get_my_time();
				bill_items.forEach(function(row)
				{
					if((counter%500)===0)
					{
						data_xml+="</bill_items><separator></separator><bill_items>";
					}

					counter+=1;

					if(parseFloat(row.packed_quantity)>0)
					{
						data_xml+="<row>" +
							"<id>"+row.id+"</id>" +
							"<quantity>"+row.packed_quantity+"</quantity>" +
							"<packed_quantity>"+row.packed_quantity+"</packed_quantity>" +
							"<picked_quantity>"+row.packed_quantity+"</picked_quantity>" +
							"<picked_status>picked</picked_status>"+
							"<packing_status>packed</packing_status>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</row>";
					}
					else
					{
						var data2_xml="<bill_items>" +
							"<id>"+row.id+"</id>" +
							"</bill_items>";
						delete_simple(data2_xml);
					}
				});

				data_xml+="</bill_items>";
				update_batch(data_xml);

				bill_items.forEach(function (bill_item)
				{

				});
			}
			hide_loader();
		});
	});

	$(no_button).off('click');
	$(no_button).on('click',function()
	{
		$("#modal158").dialog("close");
	});

	$("#modal158").dialog("open");
}

/**
 * @modal Analyze Order (CPS)
 * @modalNo 159
 */
function modal159_action(order_id,order_num,customer,billing_type,bill_id)
{
	show_loader();
	var form=document.getElementById("modal159_form");
	var cancel_button=form.elements['cancel'];

	document.getElementById('modal159_order_id').innerHTML="Order #: "+order_num;

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		form181_bill(order_id,billing_type,order_num,customer);
		$("#modal159").dialog("close");
	});

	$(cancel_button).off('click');
	$(cancel_button).on('click',function(event)
	{
		event.preventDefault();
		$("#modal159").dialog("close");
	});

	var headHTML="<tr style='background-color:#2C8A50;'>"+
				"<td>Item</td>"+
				"<td>Quantity</td>"+
				"<td>Select</td>"+
				"</tr>";
	$('#modal159_item_table').html(headHTML);

	var order_items_xml="<sale_order_items>"+
					"<id></id>"+
					"<order_id exact='yes'>"+order_id+"</order_id>"+
                    "<item_name></item_name>"+
                    "<quantity></quantity>"+
                    "<mrp></mrp>"+
                    "<unit_price></unit_price>"+
                    "<amount></amount>"+
                    "<tax></tax>"+
                    "<tax_rate></tax_rate>"+
                    "<total></total>"+
					"</sale_order_items>";
	var analyze_item_timer=0;

	fetch_requested_data('',order_items_xml,function (order_items)
	{
		var bill_id_string='--';
		var bill_id_array=vUtil.jsonParse(bill_id);
		for(var x in bill_id_array)
		{
			bill_id_string+=bill_id_array[x].bill_id+"--";
		}

		var bill_items_xml="<bill_items>"+
					"<bill_id array='yes'>"+bill_id_string+"</bill_id>"+
					"<item_name></item_name>"+
					"<quantity></quantity>"+
					"</bill_items>";
		fetch_requested_data('',bill_items_xml,function (bill_items)
		{
			//console.log(bill_items);
			for(var j=0;j<order_items.length;j++)
			{
				order_items[j].order_quantity=order_items[j].quantity;
			}

			for(var k=0;k<order_items.length;k++)
			{
				for(var l=0;l<bill_items.length;l++)
				{
					if(order_items[k].item_name==bill_items[l].item_name)
					{
						if(parseFloat(order_items[k].quantity)>parseFloat(bill_items[l].quantity))
						{
							order_items[k].quantity=parseFloat(order_items[k].quantity)-parseFloat(bill_items[l].quantity);
							bill_items.splice(l,1);
							l--;
						}
						else if(parseFloat(order_items[k].quantity)<parseFloat(bill_items[l].quantity))
						{
							bill_items[l].quantity=parseFloat(bill_items[l].quantity)-parseFloat(order_items[k].quantity);
							order_items.splice(k,1);
							k--;
							break;
						}
						else
						{
							bill_items.splice(l,1);
							order_items.splice(k,1);
							k--;
							break;
						}
					}
				}
			}


			analyze_item_timer=order_items.length;

			order_items.forEach(function (order_item)
			{
				var tr_elem_title=[];
				var tr_elem_selection=[];

				get_inventory(order_item.item_name,'',function(quantity)
				{
					//console.log(quantity);
					//console.log(order_item.quantity);
					if(parseFloat(quantity)<parseFloat(order_item.quantity))
					{
						tr_elem_title.push('Insufficient Inventory');
						tr_elem_selection.push(get_session_var('billing_on_inventory'));
					}

			      	var item_checked="checked";
	  			   	var item_title="";
	  			   	var hide_checkbox=false;

					for (var y in tr_elem_title)
					{
						item_title+=tr_elem_title[y]+"\n";
					}

					for (var z in tr_elem_selection)
					{
						if(tr_elem_selection[z]=='maybe')
						{
							item_checked="";
						}
						else if(tr_elem_selection[z]=='no')
						{
							item_checked="";
							hide_checkbox=true;
							break;
						}
					}

	  			   	var order_item_string=JSON.stringify(order_item);
	  			   	var rowsHTML="<tr title='"+item_title+"' data-object='"+order_item_string+"' id='modal159_item_row_"+order_item.id+"'>"+
						"<td>"+order_item.item_name+"</td>"+
						"<td>"+order_item.quantity+"</td>";
					if(hide_checkbox)
					{
						rowsHTML+="<td><input "+item_checked+" style='display:none;' type='checkbox' id='modal159_item_check_"+order_item.id+"'></td>";
					}
					else
					{
						rowsHTML+="<td><input "+item_checked+" type='checkbox' id='modal159_item_check_"+order_item.id+"'></td>";
					}
						rowsHTML+="</tr>";
					$('#modal159_item_table').append(rowsHTML);
					analyze_item_timer-=1;

			     });
			});

			var analysis_complete=setInterval(function()
			{
				if(analyze_item_timer===0)
				{
					clearInterval(analysis_complete);
					hide_loader();
				}
			},100);
		});
	});

	$("#modal159").dialog("open");
}

/**
 * @modal Import Unsynced data
 */
function modal160_action()
{
	var form=document.getElementById('modal160_form');

	var select_file=form.elements[1];
	var dummy_button=form.elements[2];
	var selected_file=form.elements[3];
	var import_button=form.elements[4];

	$(dummy_button).off('click');
	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(select_file).trigger('click');
	});

    dummy_button.setAttribute('class','btn red-sunglo');
	select_file.value="";
	selected_file.value="";

	$(select_file).off('change');
	$(select_file).on('change',function ()
	{
		var file_name=select_file.value;
		if(file_name!="" && (file_name.indexOf('csv')>-1))
		{
			dummy_button.setAttribute('class','btn green-jungle');
			selected_file.value=file_name;
		}
		else
		{
			dummy_button.setAttribute('class','btn red-sunglo');
			select_file.value="";
			selected_file.value="";
		}
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		show_progress();
		var file=select_file.files[0];
        var fileType = /csv/gi;

        selected_file.value = "Uploading!! Please don't refresh";
    	var reader = new FileReader();
        reader.onload = function(e)
        {
        	progress_value=2;
        	var content=reader.result;
        	var data_array=vUtil.csv2array(content);

        	progress_value=5;

           	//////////////////
           	var validate_template_array=[{column:'id',required:'yes',regex:new RegExp('^[0-9]+$')},
										{column:'type',required:'yes',list:['create','update','delete']},
										{column:'status',required:'yes',list:['unsynced']},
										{column:'data_xml'},
										{column:'user_display',required:'yes',list:['yes','no']},
										{column:'data_id',regex:new RegExp('^[0-9]+$')},
										{column:'tablename',regex:new RegExp('^[0-9a-zA-Z_]+$')},
										{column:'link_to',regex:new RegExp('^[0-9a-zA-Z_]+$')},
										{column:'last_updated',required:'yes',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')}];

			var error_array=vImport.validate(data_array,validate_template_array);
			if(error_array.status=='success')
			{
				progress_value=10;
	       		data_array.forEach(function(row)
				{
					//console.log(row);
					row.last_updated=""+get_raw_time(row.last_updated);
				});

				///////////////////////////////////
				function local_create_activities(rows)
				{
					if(typeof static_local_db=='undefined')
					{
						open_local_db(function()
						{
							local_create_activities(rows);
						});
					}
					else
					{
						show_loader();
						var table="activities";

						var transaction=static_local_db.transaction([table],"readwrite");
						var os1=transaction.objectStore(table);

						var i=0;
						var success_count=0;

						function create_records()
						{
							if(i<rows.length)
							{
								localdb_open_requests+=1;
								os1.put(rows[i]).onsuccess=function(e)
								{
									console.log(rows[i]);
									i+=1;
									localdb_open_requests-=1;
									success_count+=1;
									create_records();
								};
							}
						};
						create_records();

						var local_create_complete=setInterval(function()
						{
						   if(localdb_open_requests===0)
						   {
						   		var act_row={id:""+(get_new_key()),
										type:'create',
										status:'unsynced',
										title:'Data import',
										notes:'Added '+success_count+' records to table '+table,
										data_xml:'',
										user_display:'yes',
										data_id:'',
										tablename:'',
										link_to:'',
										updated_by:""+get_session_var('name'),
										last_updated:""+get_my_time()};
								var transaction=static_local_db.transaction([table],"readwrite");
								var os3=transaction.objectStore('activities');
								os3.put(act_row).onsuccess=function(e){};
							   clearInterval(local_create_complete);
				     		   hide_loader();
						   }
				        },2000);
					}
				};

				local_create_activities(data_array);

	           	////////////////////
	        	progress_value=15;

	        	//console.log(data_array.length);

	        	var ajax_complete=setInterval(function()
	        	{
	        		//console.log(number_active_ajax);
	        		if(number_active_ajax===0)
	        		{
	        			progress_value=15+(1-(localdb_open_requests/(2*data_array.length)))*85;
	        		}
	        		else if(localdb_open_requests===0)
	        		{
	        			progress_value=15+(1-((500*(number_active_ajax-1))/(2*data_array.length)))*85;
	        		}

	        		if(number_active_ajax===0 && localdb_open_requests===0)
	        		{
	        			hide_progress();
	        			selected_file.value="Upload complete";
	        			$(select_file).val('');
	        			$("#modal160").dialog("close");
	        			clearInterval(ajax_complete);
	        		}
	        	},1000);
	        }
	        else
	        {
	        	hide_progress();
       			$(select_file).val('');
       			$("#modal160").dialog("close");
				modal164_action(error_array);
	        }
        }
        reader.readAsText(file);
    });

	$("#modal160").dialog("open");
}

/**
 * @modalNo 161
 * @modal Add new customer (CRM)
 * @param button
 */
function modal161_action(support_type,func)
{
	var form=document.getElementById('modal161_form');

	var fcat=form.elements[1];
	var fsubcat=form.elements[2];
	var fname=form.elements[3];
	var fphone=form.elements[4];
	var femail=form.elements[5];
	var faddress=form.elements[6];
	var fpincode=form.elements[7];
	var fcity=form.elements[8];
	var fweb=form.elements[9];
	var fperson=form.elements[10];

	///////////////////////////
	fcat.value="";
	fsubcat.value="";
	fname.value="";
	fphone.value="";
	femail.value="";
	faddress.value="";
	fpincode.value="";
	fcity.value="";
	fweb.value="";
	fperson.value="";

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form30'))
		{
			var name=fname.value;
			var phone=fphone.value;
			var acc_name=name+" ("+phone+")";
			var email=femail.value;
			var address=faddress.value;

			name = name.replace(/[^a-z0-9A-Z<>\t\n \!\@\$\&\%\^\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
			name = name.replace(/â/g,'');
			name = name.replace(/&/g, "and");

			address = address.replace(/[^a-z0-9A-Z<>\t\n \!\@\$\&\%\^\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
			address = address.replace(/â/g,'');
			address = address.replace(/&/g, "and");

			var pincode=fpincode.value;
			var city=fcity.value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<customers>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"<phone>"+phone+"</phone>" +
						"<email>"+email+"</email>" +
						"<acc_name unique='yes'>"+acc_name+"</acc_name>" +
						"<status>active</status>" +
						"<address>"+address+"</address>" +
						"<pincode>"+pincode+"</pincode>" +
						"<city>"+city+"</city>" +
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
						"<description></description>" +
						"<acc_name unique='yes'>"+name+" ("+phone+")</acc_name>" +
						"<type>customer</type>" +
						"<username></username>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</accounts>";
			var attribute_xml="<attributes>" +
							"<id>"+data_id+"</id>" +
							"<name>"+acc_name+"</name>" +
							"<type>customer</type>" +
							"<attribute>Support Type</attribute>" +
							"<value>"+support_type+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</attributes>";

			create_row_func(data_xml,activity_xml,func);
			create_simple(account_xml);
			create_simple(attribute_xml);

			var business_title=get_session_var('title');

			var id=get_new_key();
			$(".modal161_attributes").each(function()
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
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal161").dialog("close");
	});

	$("#modal161").dialog("open");
}


/**
 * @modalNo 162
 * @modal Close pickings
 */
function modal162_action(button)
{
	var form=document.getElementById('modal162_form');

	var sku_filter=form.elements['sku'];
	var item_filter=form.elements['item_name'];
	var batch_filter=form.elements['batch'];
	var storage_filter=form.elements['storage'];
	var topick_filter=form.elements['topick'];
	var picked_filter=form.elements['picked'];

	var form_id=$(button).attr('form');
	var master_form=document.getElementById(form_id);
	sku_filter.value=master_form.elements[1].value;
	item_filter.value=master_form.elements[2].value;
	batch_filter.value=master_form.elements[3].value;
	storage_filter.value=master_form.elements[6].value;
	topick_filter.value=master_form.elements[4].value;
	picked_filter.value=master_form.elements[5].value;

	if(storage_filter.value=="")
	{
		storage_filter.removeAttribute('readonly');
	}

	var data_id=master_form.elements[8].value;
	var table_type=master_form.elements[9].value;

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

		var plus_minus="";
		if(table_type=='inventory_adjust')
		{
			plus_minus="-";
		}

		var status="picked";
		if(parseFloat(picked_filter.value)!=parseFloat(topick_filter.value))
			status='pending';
		var data_xml="<"+table_type+">";
			data_xml+="<id>"+data_id+"</id>" +
				"<picked_status>"+status+"</picked_status>" +
				"<picked_quantity>"+plus_minus+picked_filter.value+"</picked_quantity>" +
				"<last_updated>"+get_my_time()+"</last_updated>";
			data_xml+="</"+table_type+">";

		master_form.elements[5].value=picked_filter.value;
		update_simple(data_xml);
		$("#modal162").dialog("close");
	});

	///////////////////////////
	$("#modal162").dialog("open");
}


/**
 * @modalNo 163
 * @modal Mass put-away
 */
function modal163_action(button)
{
	var form=document.getElementById('modal163_form');

	var sku_filter=form.elements['sku'];
	var batch_filter=form.elements['batch'];
	var storage_filter=form.elements['storage'];
	var toplace_filter=form.elements['toplace'];
	var placed_filter=form.elements['placed'];

	var form_id=$(button).attr('form');
	var master_form=document.getElementById(form_id);
	sku_filter.value=master_form.elements[0].value;
	batch_filter.value=master_form.elements[1].value;
	storage_filter.value=master_form.elements[4].value;
	toplace_filter.value=master_form.elements[2].value;
	placed_filter.value=master_form.elements[3].value;

	var storage_data="<store_areas>"+
					"<name></name>"+
					"</store_areas>";
	set_my_value_list(storage_data,storage_filter);

	var data_id=master_form.elements[6].value;
	var table_type=master_form.elements[7].value;
	var old_storage=master_form.elements[9].value;
	var old_placed=master_form.elements[10].value;

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

		var item=sku_filter.value;
		var batch=batch_filter.value;
		var to_place=toplace_filter.value;
		var placed=placed_filter.value;
		var storage=storage_filter.value;
		var last_updated=get_my_time();

		var status="completed";
		if(parseFloat(placed)!=parseFloat(to_place))
			status='pending';
		var data_xml="<"+table_type+">";
			data_xml+="<id>"+data_id+"</id>" +
				"<put_away_status>"+status+"</put_away_status>" +
				"<placed_quantity>"+placed+"</placed_quantity>" +
				"<storage>"+storage+"</storage>"+
				"<last_updated>"+last_updated+"</last_updated>";
			data_xml+="</"+table_type+">";

		update_simple(data_xml);
		master_form.elements[9].value=storage;
		master_form.elements[10].value=placed;

		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+storage+"</name>" +
				"<item_name exact='yes'>"+item+"</item_name>" +
				"<batch exact='yes'>"+batch+"</batch>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0)
			{
				var storage_xml="<area_utilization>" +
						"<id>"+get_new_key()+"</id>" +
						"<name>"+storage+"</name>" +
						"<item_name>"+item+"</item_name>" +
						"<batch>"+batch+"</batch>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				create_simple(storage_xml);
			}
		});

		$("#modal163").dialog("close");
	});

	///////////////////////////
	$("#modal163").dialog("open");
}


/**
 * @modalNo 164
 * @modal Import Validation
 */
function modal164_action(error_array)
{
	var response=my_obj_array_to_csv_string(error_array.logs);
	var type="text/csv";
	var blob = new Blob([response], { type: type });
	var URL = window.URL || window.webkitURL;
   var downloadUrl = URL.createObjectURL(blob);

	var modal_element=document.getElementById('modal164_div');
	var link=document.createElement('span');
	link.setAttribute('href',downloadUrl);
	link.setAttribute('download',"error.csv");
	$(link).html("The import was aborted due to file errors. Please <a style='color:#f00' download='error.csv' href=\""+downloadUrl+"\">click here</a> to download the error report.");
	$(modal_element).html(link);

	$("#modal164_link").click();
	hide_loader();
}

/**
 * @modalNo 165
 * @modal Popup Function Definition
 */
function modal165_action(id,metric_id,master)
{
	var form=document.getElementById('modal165_form');

	var name_filter=form.elements['name'];
	var def_filter=form.elements['def'];

	name_filter.value='';
	var cm="";

	var def_columns=new Object();
			def_columns.count=1;
			def_columns.data_store='system_grid_metrics';
			def_columns.indexes=[{index:'id',value:id},{index:'function_name'},{index:'function_def'}];
	read_json_rows('',def_columns,function (contents)
	{
		var content="";
		if(contents.length>0)
		{
			if(contents[0].function_def!=null && contents[0].function_def!='undefined')
				content=contents[0].function_def;
			name_filter.value=contents[0].function_name;
		}
		cm=$(def_filter).codeeditor({content:content});
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

		var name=name_filter.value;
		var def=cm.getValue();
		var last_updated=get_my_time();

		if(typeof master!='undefined' && master=='master')
		{
			var data_json={data_store:'system_grid_metrics',
	 				log:'no',
	 				data:[{index:'metric_id',value:metric_id,unique:'yes'},
	 					{index:'function_name',value:name},
	 					{index:'function_def',value:def},
	 					{index:'last_updated',value:last_updated}]};
 			server_update_master_all(data_json);
		}
		else
		{
			var data_json={data_store:'system_grid_metrics',
	 				log:'yes',
	 				data:[{index:'id',value:id},
	 					{index:'function_name',value:name},
	 					{index:'function_def',value:def},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Dashboard metric '+name,link_to:'form264'}};
 			update_json(data_json);
 		}
 		$(form).find('.close').click();
	});

	$("#modal165_link").click();
}


/**
 * @modalNo 166
 * @modal Followup Details
 */
function modal166_action(lead_id,supplier,lead_details)
{
	var form=document.getElementById('modal166_form');
	var date_filter=form.elements['date'];
	var response_filter=form.elements['response'];
	var detail_filter=form.elements['details'];
	var next_date_filter=form.elements['next_date'];

	$(date_filter).datepicker();
	$(next_date_filter).datepicker();

	date_filter.value=vTime.date();

	set_static_value_list('followups','response',response_filter);

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form273'))
		{
			var id=get_new_key();
			var date=get_raw_time(date_filter.value);
			var response=response_filter.value;
			var details=detail_filter.value;
			var next_date=get_raw_time(next_date_filter.value);
			var last_updated=get_my_time();
			var new_details=lead_details+"\n\n"+date_filter.value+": "+details;

			var lead_xml="<purchase_leads>"+
						"<id>"+lead_id+"</id>"+
		                "<valid_date>"+next_date+"</valid_date>"+
		                "<detail>"+new_details+"</detail>"+
		                "<last_updated>"+last_updated+"</last_updated>"+
						"</purchase_leads>";
			update_simple(lead_xml);
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal166").dialog("close");
	});

	$("#modal166").dialog("open");
}

/**
 * @modalNo 167
 * @modal Update Contact
 * @param button
 */
function modal167_action(supplier_acc_name)
{
	var form=document.getElementById('modal167_form');

	var fname=form.elements[1];
	var fphone=form.elements[2];
	var femail=form.elements[3];
	var faddress=form.elements[4];
	var fpincode=form.elements[5];
	var fcity=form.elements[6];
	var fstate=form.elements[7];
	var fid=form.elements['id'];

	var supplier_xml="<suppliers count='1'>"+
					"<id></id>"+
					"<name></name>"+
					"<phone></phone>"+
					"<email></email>"+
					"<address></address>"+
					"<city></city>"+
					"<state></state>"+
					"<pincode></pincode>"+
					"<acc_name exact='yes'>"+supplier_acc_name+"</acc_name>"+
					"</suppliers>";
	fetch_requested_data('',supplier_xml,function(suppliers)
	{
		if(suppliers.length>0)
		{
			fname.value=suppliers[0].name;
			fphone.value=suppliers[0].phone;
			femail.value=suppliers[0].email;
			faddress.value=suppliers[0].address;
			fpincode.value=suppliers[0].pincode;
			fcity.value=suppliers[0].city;
			fstate.value=suppliers[0].state;
			fid.value=suppliers[0].id;
		}
	});

	////adding attribute fields///////
	var attribute_label=document.getElementById('modal167_attributes');
	attribute_label.innerHTML="";
	var attributes_data="<attributes>" +
			"<id></id>"+
			"<attribute></attribute>" +
			"<value></value>"+
			"<type exact='yes'>supplier</type>" +
			"<name exact='yes'>"+supplier_acc_name+"</name>" +
			"</attributes>";
	fetch_requested_data('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
				var attr_label=document.createElement('label');
				attr_label.innerHTML=attribute.attribute+" <input type='text' name='"+attribute.id+"' value='"+attribute.value+"'>";
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
		});
	});


	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form30'))
		{
			var name=fname.value;

			name = name.replace(/[^a-z0-9A-Z<>\t\n \!\@\$\&\%\^\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
			name = name.replace(/â/g,'');
			name = name.replace(/&/g, "and");

			var phone=fphone.value;
			var email=femail.value;
			var address=faddress.value;

			address = address.replace(/[^a-z0-9A-Z<>\t\n \!\@\$\&\%\^\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
			address = address.replace(/â/g,'');
			address = address.replace(/&/g, "and");

			var pincode=fpincode.value;
			var city=fcity.value;
			var state=fstate.value;
			var data_id=fid.value;
			var last_updated=get_my_time();
			var data_xml="<suppliers>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"<phone>"+phone+"</phone>" +
						"<email>"+email+"</email>" +
						"<address>"+address+"</address>" +
						"<pincode>"+pincode+"</pincode>" +
						"<city>"+city+"</city>" +
						"<state>"+state+"</state>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</suppliers>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>suppliers</tablename>" +
						"<link_to>form40</link_to>" +
						"<title>Updated</title>" +
						"<notes>Details for supplier "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			update_row(data_xml,activity_xml);

			$("#modal167_attributes").find('input, select').each(function()
			{
				var value=$(this).val();
				var id=$(this).attr('name');

				var attribute_xml="<attributes>" +
						"<id>"+id+"</id>" +
						"<value>"+value+"</value>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</attributes>";
				update_simple(attribute_xml);
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal167").dialog("close");
	});

	$("#modal167").dialog("open");
}

/**
 * @modalNo 168
 * @modal Close purchase lead
 */
function modal168_action(button,lead_id)
{
	var form=document.getElementById('modal168_form');
	var no_button=form.elements['no'];
	var yes_button=form.elements['yes'];

	$(no_button).off('click');
	$(no_button).on('click',function()
	{
		$("#modal168").dialog("close");
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form273'))
		{
			var lead_form_id=$(button).attr('form');
			var last_updated=get_my_time();

			var lead_xml="<purchase_leads>"+
						"<id>"+lead_id+"</id>"+
		                "<valid_date></valid_date>"+
		                "<status>closed</status>"+
		                "<last_updated>"+last_updated+"</last_updated>"+
						"</purchase_leads>";
			update_simple(lead_xml);
			$(button).parent().parent().attr('class','cancelled_row');
			$(button).hide();
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal168").dialog("close");
	});

	$("#modal168").dialog("open");
}

/**
 * @modalNo 169
 * @modal Return columns
 */
function modal169_action(search_id)
{
	var form=document.getElementById('modal169_form');
	var add_button=form.elements['add_button'];
	var delete_button=form.elements['delete_button'];

	var attribute_label=document.getElementById('modal169_columns');
	attribute_label.innerHTML="";

	$(add_button).off('click');
	$(add_button).on('click',function ()
	{
		var content="<div><input placeholder='Key' class='floatlabel' type='text'> <input placeholder='Column' class='floatlabel' type='text'></div>";
		$(attribute_label).append(content);
		$(form).formcontrol();
	});

	$(delete_button).off('click');
	$(delete_button).on('click',function ()
	{
		$('#modal169_columns>div:last-child').remove();
	});

	var attributes_data={data_store:'system_search',count:1,
								indexes:[{index:'id',value:search_id+""},{index:'return_columns'}]};
	read_json_rows('',attributes_data,function(attributes)
	{
		if(attributes.length>0)
		{
			var values_array=vUtil.jsonParse(attributes[0].return_columns);
			var content="";
			values_array.forEach(function(fvalue)
			{
				content+="<div><input placeholder='Key' class='floatlabel' type='text' value='"+fvalue.key+"'> <input type='text' placeholder='Column' class='floatlabel' value='"+fvalue.column+"'></div>";
			});
			$(attribute_label).html(content);
			$(form).formcontrol();
		}
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form276'))
		{
			var last_updated=get_my_time();
			var returns_column_array=[];
			$("#modal169_columns>div").each(function()
			{
				var return_obj=new Object();
				return_obj.key=$(this).find('div:first-child>input').val();
				return_obj.column=$(this).find('div:nth-child(2)>input').val();
				returns_column_array.push(return_obj);
			});

			var return_columns=JSON.stringify(returns_column_array);
			var search_json={data_store:'system_search',
	 				data:[{index:'id',value:search_id},
	 					{index:'return_columns',value:return_columns},
	 					{index:'last_updated',value:last_updated}]};
			update_json(search_json);
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal169_link").click();
}

/**
 * @modal Import Dispatch Information
 */
function modal170_action()
{
	var form=document.getElementById('modal170_form');

	var select_file=form.elements[1];
	var dummy_button=form.elements[2];
	var selected_file=form.elements[3];
	var import_button=form.elements[4];

	$(dummy_button).off('click');
	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(select_file).trigger('click');
	});

    dummy_button.setAttribute('class','btn red-sunglo');
	select_file.value="";
	selected_file.value="";

	$(select_file).off('change');
	$(select_file).on('change',function ()
	{
		var file_name=select_file.value;
		if(file_name!="" && (file_name.indexOf('csv')>-1))
		{
			dummy_button.setAttribute('class','btn green-jungle');
			selected_file.value=file_name;
		}
		else
		{
            dummy_button.setAttribute('class','btn red-sunglo');
			select_file.value="";
			selected_file.value="";
		}
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		show_progress();

		var file=select_file.files[0];
        var fileType = /csv/gi;

        selected_file.value = "Uploading!! Please don't refresh";
    	var reader = new FileReader();
        reader.onload = function(e)
        {
        	progress_value=2;
	       	var content=reader.result;
	       	var data_array=vUtil.csv2array(content);

	       	progress_value=5;


			var validate_template_array=[{column:'ID',required:'yes'},
									{column:'Order ID'},
									{column:'AWB Number',regex:new RegExp('^[0-9a-zA-Z -]+$')},
									{column:'Status',list:['dispatched','','null']}];

			var error_array=vImport.validate(data_array,validate_template_array);
			if(error_array.status=='success')
			{
        		progress_value=10;

		    	var data_xml="<bills>";
	       		var data2_xml="<sale_orders>";
	       		var counter=1;
				var last_updated=get_my_time();


				data_array.forEach(function(row)
				{
					if((counter%500)===0)
					{
						data_xml+="</bills><separator></separator><bills>";
						data2_xml+="</sale_orders><separator></separator><sale_orders>";
					}
					counter+=1;
					data_xml+="<row>" +
							"<id>"+row['ID']+"</id>" +
							"<awb_num>"+row['AWB Number']+"</awb_num>"+
							"<status>"+row['Status']+"</status>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</row>";
					if(row['Order ID']!="")
					{
						data2_xml+="<row>" +
							"<id>"+row['Order ID']+"</id>" +
							"<status>"+row['Status']+"</status>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</row>";
					}
				});


				data_xml+="</bills>";
				data2_xml+="</sale_orders>";

				update_batch(data_xml);
				update_batch(data2_xml);

	           	////////////////////
	        	progress_value=15;

	        	//console.log(data_array.length);

	        	var ajax_complete=setInterval(function()
	        	{
	        		//console.log(number_active_ajax);
	        		if(number_active_ajax===0)
	        		{
	        			progress_value=15+(1-(localdb_open_requests/(2*data_array.length)))*85;
	        		}
	        		else if(localdb_open_requests===0)
	        		{
	        			progress_value=15+(1-((500*(number_active_ajax-1))/(2*data_array.length)))*85;
	        		}

	        		if(number_active_ajax===0 && localdb_open_requests===0)
	        		{
	        			hide_progress();
	        			selected_file.value="Upload complete";
	        			$(select_file).val('');
	        			$("#modal170").dialog("close");
	        			clearInterval(ajax_complete);
	        		}
	        	},1000);
	        }
	        else
	        {
	        	hide_progress();
    			$(select_file).val('');
    			$("#modal170").dialog("close");
    			modal164_action(error_array);
	        }
	     };
	     reader.readAsText(file);
    });

	$("#modal170").dialog("open");
}

/**
 * @modal Email documents (body editable)
 * @modalNo 171
 */
function modal171_action(doc_type,person,person_type,func,attachment_type)
{
	show_loader();
	var form=document.getElementById('modal171_form');

	func(function(container)
	{
		var business_title=get_session_var('title');

		var message_attachment=container.innerHTML;
		var from=get_session_var('email');

		var person_filter=form.elements['to'];
		$(person_filter).off('blur');
		form.elements['subject'].value=doc_type;

		$("#modal171_link").click();

		if(person!="")
		{
			var email_id_xml={data_store:'suppliers',indexes:[{index:'email'},{index:'name'},{index:'acc_name',exact:person}]};
			if(person_type=='customer')
			{
				email_id_xml.data_store='customers';
			}
			else if(person_type=='staff')
			{
				email_id_xml.data_store='staff';
			}

			read_json_rows('',email_id_xml,function(emails)
			{
				if(emails.length>0)
				{
					form.elements['to'].value=person;
					form.elements['email'].value=emails[0].email;
					form.elements['hid'].value=emails[0].name;
				}
				$('#modal171').formcontrol();
				hide_loader();
			});
		}
		else
		{
			var person_xml={data_store:'suppliers',return_column:'acc_name'};
			if(person_type=='customer')
			{
				person_xml.data_store='customers';
			}
			else if(person_type=='staff')
			{
				person_xml.data_store='staff';
			}

			person_filter.removeAttribute('readonly');

			set_my_value_list_json(person_xml,person_filter,function ()
			{
				$(person_filter).focus();
			});

			$(person_filter).on('blur',function ()
			{
				var email_id_xml={data_store:'suppliers',indexes:[{index:'email'},{index:'name'},{index:'acc_name',exact:person_filter.value}]};
				if(person_type=='customer')
				{
					email_id_xml.data_store='customers';
				}
				else if(person_type=='staff')
				{
					email_id_xml.data_store='staff';
				}

				read_json_rows('',email_id_xml,function(emails)
				{
					form.elements['email'].value=emails[0].email;
					form.elements['hid'].value=emails[0].name;
				});
			});
			$('#modal171').formcontrol();
			hide_loader();
		}

		$(form).off("submit");
		$(form).on("submit",function(event)
		{
			event.preventDefault();
			show_loader();
			var receiver_array=[{"email":form.elements['email'].value,"name":form.elements['hid'].value}];
			var receiver=JSON.stringify(receiver_array);

			var sub=form.elements['subject'].value;
			var email_message=form.elements['body'].value;
			email_message=email_message.replace(/\n/g,'<br>');
			if(typeof attachment_type!='undefined')
			{
				send_email_attachment(receiver,from,business_title,sub,email_message,message_attachment,attachment_type,function()
				{
					hide_loader();
				});
			}
			else
			{
				send_email(receiver,from,business_title,sub,email_message,function()
				{
					hide_loader();
				});
			}
			$(form).find(".close").click();
		});
	});
}

/**
 * @modal Add Receipt (payable)
 * @modalNo 172
 */
function modal172_action()
{
	var form=document.getElementById("modal172_form");
	var receipt_filter=form.elements['receipt_id'];
	var date_filter=form.elements['date'];
	var account_filter=form.elements['account'];
	var heading_filter=form.elements['heading'];
	var narration_filter=form.elements['narration'];
	var amount_filter=form.elements['amount'];
	var balance_filter=form.elements['balance'];

	$(date_filter).datepicker();
	date_filter.value=vTime.date();

	var accounts_data={data_store:'accounts',return_column:'acc_name'};
	set_my_value_list_json(accounts_data,account_filter);

	var receipts_data={data_store:'receipts',return_column:'receipt_id'};
	read_json_single_column(receipts_data,function(receipts)
	{
		$(receipt_filter).off('blur');
		$(receipt_filter).on('blur',function(event)
		{
			var found = $.inArray($(this).val(), receipts) > -1;
			if(found)
			{
	        $(this).val('');
	        $(this).attr('placeholder','Duplicate Receipt Number');
	    }
		});

		var found = $.inArray($(receipt_filter).val(), receipts) > -1;
		if(found)
		{
			$(receipt_filter).val('');
			$(receipt_filter).attr('placeholder','Duplicate Receipt Number');
		}
	},receipts_data);

	$(account_filter).off('blur');
	$(account_filter).on('blur',function(e)
	{
		var transactions_data={data_store:'transactions',
								indexes:[{index:'id'},
										{index:'type'},
										{index:'amount'},
										{index:'acc_name',exact:account_filter.value}]};
		read_json_rows('',transactions_data,function(transactions)
		{
			var balance_amount=0;
			transactions.forEach(function(tran)
			{
				if(tran.type=='received')
				{
					balance_amount-=parseFloat(tran.amount);
				}
				else if(tran.type=='given')
				{
					balance_amount+=parseFloat(tran.amount);
				}
			});

			if(balance_amount==0)
			{
				balance_filter.value="Rs. 0";
			}
			else if(balance_amount>0)
			{
				balance_filter.value="Receivable: Rs. "+balance_amount;
			}
			else
			{
				balance_amount=(-balance_amount);
				balance_filter.value="Payable: Rs. "+balance_amount;
			}
		});
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		///////////////////////////////////////
		event.preventDefault();
		var paid_amount=amount_filter.value;
		var receipt_date=get_raw_time(date_filter.value);
		var heading=heading_filter.value;
		var narration=narration_filter.value;
		var receipt_id=receipt_filter.value;
		var receipt_type='paid';
		var account_name=account_filter.value;
		var counter_payment=parseFloat(amount_filter.value);
		var p_id=get_new_key();
		var last_updated=vTime.unix();

		if(is_create_access('form282'))
		{
			var transaction_json={data_store:'transactions',
				data:[{index:'id',value:p_id},
					{index:'acc_name',value:account_name},
					{index:'type',value:'given'},
					{index:'amount',value:paid_amount},
					{index:'tax',value:'0'},
					{index:'source_id',value:p_id},
					{index:'source_info',value:receipt_id,uniqueWith:['source']},
					{index:'source',value:'payable'},
					{index:'source_link',value:'form282'},
					{index:'trans_date',value:receipt_date},
					{index:'notes',value:narration},
					{index:'heading',value:heading},
					{index:'last_updated',value:last_updated}]};

				create_json(transaction_json);

        	var receipt_json={data_store:'receipts',
	 				data:[{index:'id',value:p_id},
	 					{index:'receipt_id',value:receipt_id,unique:'yes'},
	 					{index:'type',value:receipt_type},
	 					{index:'amount',value:paid_amount},
						{index:'heading',value:heading},
	 					{index:'narration',value:narration},
	 					{index:'acc_name',value:account_name},
	 					{index:'date',value:receipt_date},
	 					{index:'last_updated',value:last_updated}]};

			create_json(receipt_json);
		}
		else
		{
			$("#modal2_link").click();
		}

		$(form).find(".close").click();
	});
	$("#modal172_link").click();
}

/**
 * @modalNo 173
 * @modal Inventory (poojaelec)
 */
function modal173_action(item_name)
{
	var form=document.getElementById("modal173_form");
	var item_filter=form.elements['item_name'];
	var stock_filter=form.elements['stock'];
	var buyer_filter=form.elements['buyer'];
	var seller_filter=form.elements['seller'];
	var ok_button=form.elements['ok'];

	$(ok_button).off('click');
	$(ok_button).on('click',function ()
	{
		$("#modal173").dialog("close");
	});

	item_filter.value=item_name;
	stock_filter.value="";
	buyer_filter.value="";
	seller_filter.value="";

	get_inventory(item_name,'',function(inventory)
	{
		stock_filter.value=-parseFloat(inventory);
	});

	var seller_data=new Object();
		seller_data.count=0;
		seller_data.start_index=0;
		seller_data.data_store='purchase_leads';
		seller_data.return_column='quantity';
		seller_data.sum='yes';
		seller_data.indexes=[{index:'status',exact:'open'},
							{index:'item_name',exact:item_name}];
	set_my_value_json(seller_data,seller_filter);

	var buyer_data=new Object();
		buyer_data.count=0;
		buyer_data.start_index=0;
		buyer_data.data_store='sale_leads';
		buyer_data.return_column='quantity';
		buyer_data.sum='yes';
		buyer_data.indexes=[{index:'status',exact:'open'},
							{index:'item_name',exact:item_name}];
	set_my_value_json(buyer_data,buyer_filter);

	$("#modal173").dialog("open");
}

/**
 * @modalNo 174
 * @modal Add new product (poojaelec)
 * @param button
 */
function modal174_action(func)
{
	var form=document.getElementById('modal174_form');

	var fname=form.elements[1];
	var fmake=form.elements[2];
	var fdescription=form.elements[3];
	var fpictureinfo=form.elements[4];
	var fpicture=form.elements[5];
	var dummy_button=form.elements[6];

	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(fpicture).trigger('click');
	});

	var make_data=new Object();
		make_data.data_store='product_master';
		make_data.return_column='make';
		make_data.indexes=[{index:'make'}];
	set_my_filter_json(make_data,fmake);

	fpicture.addEventListener('change',function(evt)
	{
		select_picture(evt,fpictureinfo,function(dataURL)
		{
			fpictureinfo.innerHTML="<div class='figure'><img src='"+dataURL+"'/></div>";
		});
	},false);

	////adding attribute fields///////
	var attribute_label=document.getElementById('modal174_attributes');
	attribute_label.innerHTML="";

	var attributes_data=new Object();
		attributes_data.data_store='mandatory_attributes';
		attributes_data.indexes=[{index:'attribute'},{index:'status'},{index:'value'},{index:'object',exact:'product'}];

	read_json_rows('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}
				else
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form39'))
		{
			var name=form.elements[1].value;
			var make=form.elements[2].value;
			var description=form.elements[3].value;

			name = name.replace(/[^a-z0-9A-Z<>\t\n \!\@\$\&\%\^\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
			name = name.replace(/â/g,'');
			name = name.replace(/&/g, "and");
			make = make.replace(/[^a-z0-9A-Z<>\t\n \!\@\$\&\%\^\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
			make = make.replace(/â/g,'');
			make = make.replace(/&/g, "and");
			description = description.replace(/[^a-z0-9A-Z<>\t\n \!\@\$\&\%\^\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
			description = description.replace(/â/g,'');
			description = description.replace(/&/g, "and");

			var mrp=form.elements[7].value;
			var data_id=get_new_key();
			var pic_id=get_new_key();
			var discount=form.elements[8].value;
			var sale_price=form.elements[9].value;
			var cost_price=form.elements[10].value;
			var url=$(fpictureinfo).find('div').find('img').attr('src');

			var indexes=name.split(/[\s,]+/);
      var description_indexes=description.split(/[\s,]+/);
      var make_indexes=make.split(/[\s,]+/);
      var new_indexes=indexes.concat(description_indexes,make_indexes);
      var anew_indexes=vUtil.arrayUnique(new_indexes);
      var index_string=JSON.stringify(anew_indexes);

			var last_updated=get_my_time();
			var data_xml="<product_master>" +
							"<id>"+data_id+"</id>" +
							"<make>"+make+"</make>" +
							"<name>"+name+"</name>" +
							"<description>"+description+"</description>" +
							"<indexes>"+index_string+"</indexes>"+
							"<tax>0</tax>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</product_master>";
			var instance_xml="<product_instances>"+
							"<id>"+data_id+"</id>"+
							"<product_name>"+name+"</product_name>"+
							"<batch>"+name+"</batch>"+
							"<mrp>"+mrp+"</mrp>"+
							"<cost_price>"+cost_price+"</cost_price>"+
							"<sale_price>"+sale_price+"</sale_price>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</product_instances>";
			var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>product_master</tablename>" +
							"<link_to>form234</link_to>" +
							"<title>Added</title>" +
							"<notes>Product "+name+" to inventory</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
			create_row_func(data_xml,activity_xml,func);
			create_simple(instance_xml);

			var id=get_new_key();
			$("#modal174_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				var attribute=$(this).attr('name');
				if(value!="")
				{
					var attribute_xml="<attributes>" +
							"<id>"+id+"</id>" +
							"<name>"+name+"</name>" +
							"<type>product</type>" +
							"<attribute>"+attribute+"</attribute>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</attributes>";
					create_simple(attribute_xml);

				}
			});

			if(url!="")
			{
				var pic_xml="<documents>" +
							"<id>"+pic_id+"</id>" +
							"<url>"+url+"</url>" +
							"<doc_type>product_master</doc_type>" +
							"<target_id>"+data_id+"</target_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</documents>";
				create_simple(pic_xml);

			}
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal174").dialog("close");
	});

	$("#modal174").dialog("open");
}

/**
 * @modalNo 175
 * @modal Add newsletter components
 * @param button
 */
function modal175_action(func)
{
	var form=document.getElementById('modal175_form');

	var fname=form.elements['nname'];
	var ftemplate=form.elements['tname'];
	var fhtml=form.elements['html_code'];
	var ftid=form.elements['t_id'];

	var tname_data={data_store:'newsletter_components',return_column:'name',
									indexes:[{index:'name'}]};
	set_my_value_list_json(tname_data,ftemplate);

	////adding attribute fields///////
	var markers_label=document.getElementById('modal175_markers');
	markers_label.innerHTML="";

	$(ftemplate).off('blur');
	$(ftemplate).off('change');
	$(ftemplate).on('blur change',function ()
	{
		var markers_data=new Object();
			markers_data.count=1;
			markers_data.data_store='newsletter_components';
			markers_data.indexes=[{index:'name',exact:ftemplate.value},
								{index:'markers'},{index:'html_code'},{index:'id'}];

		read_json_rows('',markers_data,function(newsletter_markers)
		{
			markers_label.innerHTML="";
			if(newsletter_markers.length>0)
			{
				var markers=vUtil.jsonParse(newsletter_markers[0].markers);

				markers.forEach(function(marker)
				{
					var marker_label=document.createElement('div');
					marker_label.innerHTML="<div class='col-sm-12 col-md-4'>"+marker+"</div>"+
					     					"<div class='col-sm-12 col-md-8'><textarea form='modal175_form' name='"+marker+"'></textarea></div>";

					markers_label.appendChild(marker_label);
				});
				fhtml.value=newsletter_markers[0].html_code;
				ftid.value=newsletter_markers[0].id;
			}
			else
			{
				fhtml.value="";
				ftid.value="";
			}
		});
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form299'))
		{
			var name=form.elements['nname'].value;
			var template=form.elements['tname'].value;

			var id=get_new_key();

			var markers_array=[];
			$("#modal175_markers").find('textarea').each(function()
			{
				var value=$(this).val();
				var marker=$(this).attr('name');
				var marker_obj={'marker':marker,'value':value};
				markers_array.push(marker_obj);
			});
			var attr=JSON.stringify(markers_array);
			attr=attr.replace(/"/g,"'");
			var template_id=ftid.value;
			var component_elem="<li class='list-group-item bg-green bg-font-green' id='form299_nc_"+id+"' data-name='"+name+"' data-id='"+id+"' data-tid='"+ftid.value+"'>"+name+
									"<a style='float:right;' onclick=form299_delete_item('"+id+"'); class='btn btn-circle btn-icon-only yellow-saffron'><i class='fa fa-times'></i></a>"+
									"<a style='float:right;' id='form299_nc_edit_"+id+"' class='btn btn-circle btn-icon-only red'><i class='fa fa-pencil'></i></li>";
			$('#form299_navigation').append(component_elem);
			$('#form299_nc_'+id).attr('data-attr',attr);
			$('#form299_nc_edit_'+id).on('click',function ()
			{
				modal179_action(name,id,attr,template_id);
			});

			var images_array=[];
			$("#form299_images").children('li').each(function()
			{
				var image=new Object();
				image.name=$(this).attr('data-name');
				image.id=$(this).attr('data-id');
				image.url=$(this).attr('data-url');
				images_array.push(image);
			});

			////////////////////////////////////////////////
			var html_code=fhtml.value;
			var doc_columns=new Object();
				doc_columns.count=5;
				doc_columns.data_store='documents';
				doc_columns.indexes=[{index:'id'},
									{index:'url'},
									{index:'doc_name'},
									{index:'doc_type',exact:'newsletter_components'},
									{index:'target_id',exact:ftid.value}];

			read_json_rows('',doc_columns,function(doc_results)
			{
				var docHTML="";
				doc_results.forEach(function (doc)
				{
					var updated_url=doc.url.replace(/ /g,"+");
					updated_url=updated_url+"\" data-src=\""+doc.id+".jpeg";
					var replace_word="{{"+doc.doc_name+"}}";
					var re=new RegExp(replace_word,"g");
					html_code=html_code.replace(re,updated_url);
				});

				markers_array.forEach(function (marker)
				{
					var replace_word="{{"+marker.marker+"}}";
					var re=new RegExp(replace_word,"g");
					html_code=html_code.replace(re,marker.value);
				});

				images_array.forEach(function (image)
				{
					var replace_word="image:"+image.name;
					var updated_url=image.url+"\" data-src=\""+image.id+".jpeg";
					var re=new RegExp(replace_word,"g");
					html_code=html_code.replace(re,updated_url);
				});
				var div_dummy=document.createElement('div');
				$(div_dummy).html(html_code);

				var html_elem="";
				$(div_dummy).children('div').each(function (index)
				{
					html_elem=$(this);
					$(html_elem).attr('id','form299_sc_'+id);
					$(html_elem).attr('data-id',id);
				});
				$(div_dummy).remove();
				$('#form299_section').append(html_elem);

			});
			/////////////////////////////////////////////////
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal175_link").click();
}

/**
 * @modalNo 176
 * @modal Add Image to newsletter
 * @param button
 */
function modal176_action(data_id,doc_type,func,master)
{
	var form=document.getElementById('modal176_form');

	var fname=form.elements['name'];
	var fpictureinfo=form.elements['picture'];
	var fpicture=form.elements['file'];
	var dummy_button=form.elements['dummy'];

	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(fpicture).trigger('click');
	});

	fpicture.addEventListener('change',function(evt)
	{
		select_picture_large(evt,function(dataURL)
		{
			fpictureinfo.innerHTML="<div class='figure'><img src='"+dataURL+"'/></div>";
		});
	},false);

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form299') || is_create_access('form298') || is_create_access('form345'))
		{
			var name=form.elements[1].value;
			var pic_id=get_new_key();
			var url=$(fpictureinfo).find('div').find('img').attr('src');
			var last_updated=get_my_time();

			if(url!="")
			{
				var data_json={data_store:'documents',
 				data:[{index:'id',value:pic_id},
	 					{index:'url',value:url},
	 					{index:'doc_name',value:name},
	 					{index:'doc_type',value:doc_type},
	 					{index:'target_id',value:data_id},
	 					{index:'last_updated',value:last_updated}]};
				if(typeof master!='undefined' && master=='master')
				{
					server_create_master_all(data_json);
				}
				else
				{
					create_json(data_json);
				}

				if(typeof func!='undefined')
				{
					func(pic_id,url,name);
				}

				/////////saving s3 object///////////////
				var blob_name=pic_id+".jpeg";

				if(is_online())
				{
					$.ajax(
					{
						type: "POST",
						url: server_root+"/ajax/s3_doc.php",
						data:
						{
							blob: url,
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
					var s3_json={data_store:'s3_objects',
	 				data:[{index:'id',value:pic_id},
		 					{index:'data_blob',value:url},
		 					{index:'name',value:blob_name},
		 					{index:'type',value:'image/jpeg'},
		 					{index:'status',value:'pending'},
		 					{index:'last_updated',value:get_my_time()}]};
					create_json(data_json);
				}

				//////////////////////////////////////////
			}
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal176_link").click();
}
/**
 * @modalNo 177
 * @modal Add new product (poojaelec)
 * @param button
 */
function modal177_action(func)
{
	var form=document.getElementById('modal177_form');

	var fname=form.elements[1];
	var fmake=form.elements[2];
	var fcategory=form.elements[3];
	var fdescription=form.elements[4];
	var fpictureinfo=form.elements[5];
	var fpicture=form.elements[6];
	var dummy_button=form.elements[7];

	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(fpicture).trigger('click');
	});

	var make_data=new Object();
		make_data.data_store='product_master';
		make_data.return_column='make';
		make_data.indexes=[{index:'make'}];
	set_my_filter_json(make_data,fmake);

	var cat_data=new Object();
		cat_data.data_store='product_master';
		cat_data.return_column='category';
		cat_data.indexes=[{index:'category'}];
	set_my_filter_json(cat_data,fcategory);

	fpicture.addEventListener('change',function(evt)
	{
		select_picture(evt,fpictureinfo,function(dataURL)
		{
			fpictureinfo.innerHTML="<div class='figure'><img src='"+dataURL+"'/></div>";
		});
	},false);

	////adding attribute fields///////
	var attribute_label=document.getElementById('modal177_attributes');
	attribute_label.innerHTML="";

	var attributes_data=new Object();
		attributes_data.data_store='mandatory_attributes';
		attributes_data.indexes=[{index:'attribute'},{index:'status'},{index:'value'},{index:'object',exact:'product'}];

	read_json_rows('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required'
				var attr_label=document.createElement('label');
				if(attribute.value=="")
				{
					attr_label.innerHTML=attribute.attribute+" <input type='text' "+required+" name='"+attribute.attribute+"'>";
				}
				else
				{
					var values_array=attribute.value.split(";");
					var content=attribute.attribute+" <select name='"+attribute.attribute+"' "+required+">";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select>";
					attr_label.innerHTML=content;
				}
				attribute_label.appendChild(attr_label);
				var line_break=document.createElement('br');
				attribute_label.appendChild(line_break);
			}
		});
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form39'))
		{
			var name=form.elements[1].value;
			var make=form.elements[2].value;
			var category=form.elements[3].value;
			var description=form.elements[4].value;

			name = name.replace(/[^a-z0-9A-Z<>\t\n \!\@\$\&\%\^\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
			name = name.replace(/â/g,'');
			name = name.replace(/&/g, "and");
			make = make.replace(/[^a-z0-9A-Z<>\t\n \!\@\$\&\%\^\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
			make = make.replace(/â/g,'');
			make = make.replace(/&/g, "and");
			description = description.replace(/[^a-z0-9A-Z<>\t\n \!\@\$\&\%\^\*\(\)\_\+\-\=\{\}\[\]\|\\\:\;\"\'\?\/\>\.\<\,]/g,'');
			description = description.replace(/â/g,'');
			description = description.replace(/&/g, "and");

			var indexes=name.split(/[\s,]+/);
      var description_indexes=description.split(/[\s,]+/);
      var make_indexes=make.split(/[\s,]+/);
      var new_indexes=indexes.concat(description_indexes,make_indexes);
      var anew_indexes=vUtil.arrayUnique(new_indexes);
      var index_string=JSON.stringify(anew_indexes);

			var mrp=form.elements[8].value;
			var data_id=get_new_key();
			var pic_id=get_new_key();
			var discount=form.elements[9].value;
			var sale_price=form.elements[10].value;
			var cost_price=form.elements[11].value;
			var url=$(fpictureinfo).find('div').find('img').attr('src');
			var last_updated=get_my_time();
			var data_xml="<product_master>" +
							"<id>"+data_id+"</id>" +
							"<make>"+make+"</make>" +
							"<name>"+name+"</name>" +
							"<description>"+description+"</description>" +
							"<category>"+category+"</category>" +
							"<indexes>"+index_string+"</indexes>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</product_master>";
			var instance_xml="<product_instances>"+
							"<id>"+data_id+"</id>"+
							"<product_name>"+name+"</product_name>"+
							"<batch>"+name+"</batch>"+
							"<mrp>"+mrp+"</mrp>"+
							"<cost_price>"+cost_price+"</cost_price>"+
							"<sale_price>"+sale_price+"</sale_price>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</product_instances>";
			var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>product_master</tablename>" +
							"<link_to>form300</link_to>" +
							"<title>Added</title>" +
							"<notes>Product "+name+" to inventory</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
			create_row_func(data_xml,activity_xml,func);
			create_simple(instance_xml);

			var id=get_new_key();
			$("#modal177_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				var attribute=$(this).attr('name');
				if(value!="")
				{
					var attribute_xml="<attributes>" +
							"<id>"+id+"</id>" +
							"<name>"+name+"</name>" +
							"<type>product</type>" +
							"<attribute>"+attribute+"</attribute>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</attributes>";
					create_simple(attribute_xml);

				}
			});

			if(url!="")
			{
				var pic_xml="<documents>" +
							"<id>"+pic_id+"</id>" +
							"<url>"+url+"</url>" +
							"<doc_type>product_master</doc_type>" +
							"<target_id>"+data_id+"</target_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</documents>";
				create_simple(pic_xml);
			}
		}
		else
		{
			$("#modal2_link").click();
		}
		$("#modal177").dialog("close");
	});

	$("#modal177").dialog("open");
}

/**
 * @modalNo 178
 * @modal Notification Function Definition
 */
function modal178_action(id,not_name,master)
{
	var form=document.getElementById('modal178_form');

	var name_filter=form.elements['name'];
	var def_filter=form.elements['def'];

	name_filter.value='';
	var cm="";

	var def_columns=new Object();
			def_columns.count=1;
			def_columns.data_store='system_notifications';
			def_columns.indexes=[{index:'id',value:id},{index:'function_name'},{index:'function_def'}];
	read_json_rows('',def_columns,function (contents)
	{
		var content="";
		if(contents.length>0)
		{
			if(contents[0].function_def!=null && contents[0].function_def!='undefined')
				content=contents[0].function_def;
			name_filter.value=contents[0].function_name;
		}
		cm=$(def_filter).codeeditor({content:content});
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

		var name=name_filter.value;
		var def=cm.getValue();
		var last_updated=get_my_time();

		if(typeof master!='undefined' && master=='master')
		{
			var data_json={data_store:'system_notifications',
	 				log:'no',
	 				data:[{index:'name',value:not_name,unique:'yes'},
	 					{index:'function_name',value:name},
	 					{index:'function_def',value:def},
	 					{index:'last_updated',value:last_updated}]};
 			server_update_master_all(data_json);
		}
		else
		{
			var data_json={data_store:'system_notifications',
	 				log:'yes',
	 				data:[{index:'id',value:id},
	 					{index:'function_name',value:name},
	 					{index:'function_def',value:def},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'System configuration for notification '+name,link_to:'form277'}};
 			update_json(data_json);
 		}
 		$(form).find('.close').click();
	});

	$("#modal178_link").click();
}

/**
 * @modalNo 179
 * @modal Update newsletter components
 * @param button
 */
function modal179_action(cname,id,attr,template_id)
{
	var form=document.getElementById('modal179_form');

	var fname=form.elements['nname'];
	var fhtml=form.elements['html_code'];
	var ftid=form.elements['t_id'];
	ftid.value=template_id;
	fname.value=cname;

	var attr_array=vUtil.jsonParse(attr);

	var markers_label=document.getElementById('modal179_markers');
	markers_label.innerHTML="";

	var markers_data={count:1,data_store:'newsletter_components',
									indexes:[{index:'id',value:template_id},
							{index:'markers'},{index:'html_code'}]};
	read_json_rows('',markers_data,function(newsletter_markers)
	{
		markers_label.innerHTML="";
		if(newsletter_markers.length>0)
		{
			var markers=vUtil.jsonParse(newsletter_markers[0].markers);

			markers.forEach(function(marker)
			{
				var marker_value="";

				for(var i in attr_array)
				{
					if(attr_array[i].marker==marker)
					{
						marker_value=attr_array[i].value;
						break;
					}
				}
				var marker_label=document.createElement('div');
				marker_label.setAttribute('class','row');
				marker_label.innerHTML="<div class='col-sm-12 col-md-4'>"+marker+"</div>"+
					     					"<div class='col-sm-12 col-md-8'><textarea form='modal175_form' name='"+marker+"'>"+marker_value+"</textarea></div>";

				markers_label.appendChild(marker_label);
				var line_break=document.createElement('br');
				markers_label.appendChild(line_break);
			});
			fhtml.value=newsletter_markers[0].html_code;
			ftid.value=newsletter_markers[0].id;
		}
		else
		{
			fhtml.value="";
			ftid.value="";
		}
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form299'))
		{
			var name=form.elements['nname'].value;
			var markers_array=[];

			$("#modal179_markers").find('textarea').each(function()
			{
				var value=$(this).val();
				var marker=$(this).attr('name');
				var marker_obj={'marker':marker,'value':value};
				markers_array.push(marker_obj);
			});

			var attr=JSON.stringify(markers_array);
			attr=attr.replace(/\"/g,"'");
			var component_elem=$('#form299_nc_'+id);
			$(component_elem).attr('data-name',name);
			$(component_elem).attr('data-attr',attr);
			$(component_elem).html(name+"<a style='float:right;' class='btn btn-circle btn-icon-only yellow-saffron' onclick=form299_delete_item('"+id+"');><i class='fa fa-times'></i></a><a style='float:right;' class='btn btn-circle btn-icon-only red' id='form299_nc_edit_"+id+"'><i class='fa fa-pencil'></i></a>");
			$('#form299_nc_edit_'+id).on('click',function ()
			{
				modal179_action(name,id,attr,ftid.value);
			});

			var images_array=[];
			$("#form299_images").children('li').each(function()
			{
				var image=new Object();
				image.name=$(this).attr('data-name');
				image.id=$(this).attr('data-id');
				image.url=$(this).attr('data-url');
				images_array.push(image);
			});

			////////////////////////////////////////////////
			var html_code=fhtml.value;
			var doc_columns=new Object();
				doc_columns.count=5;
				doc_columns.data_store='documents';
				doc_columns.indexes=[{index:'id'},
									{index:'url'},
									{index:'doc_name'},
									{index:'doc_type',exact:'newsletter_components'},
									{index:'target_id',exact:ftid.value}];

			read_json_rows('',doc_columns,function(doc_results)
			{
				var docHTML="";
				doc_results.forEach(function (doc)
				{
					var updated_url=doc.url.replace(/ /g,"+");
					updated_url=updated_url+"\" data-src=\""+doc.id+".jpeg";
					var replace_word="{{"+doc.doc_name+"}}";
					var re=new RegExp(replace_word,"g");
					html_code=html_code.replace(re,updated_url);
				});

				markers_array.forEach(function (marker)
				{
					var replace_word="{{"+marker.marker+"}}";
					var re=new RegExp(replace_word,"g");
					html_code=html_code.replace(re,marker.value);
				});

				images_array.forEach(function (image)
				{
					var replace_word="image:"+image.name;
					var updated_url=image.url+"\" data-src=\""+image.id+".jpeg";
					var re=new RegExp(replace_word,"g");
					html_code=html_code.replace(re,updated_url);
				});

				var div_dummy=document.createElement('div');
				$(div_dummy).html(html_code);

				var html_elem="";
				$(div_dummy).children('div').each(function (index)
				{
					html_elem=$(this);
					$(html_elem).attr('id','form299_sc_'+id);
					$(html_elem).attr('data-id',id);
				});
				$(div_dummy).remove();
				$('#form299_sc_'+id).replaceWith(html_elem);
			});
			/////////////////////////////////////////////////
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal179_link").click();
}

/**
 * @modalNo 180
 * @modal Add/Update Code
 * @param button
 */
function modal180_action(id,new_name,master)
{
	var form=document.getElementById('modal180_form');

	var code_filter=form.elements['code'];
	var cm="";

	var code_columns=new Object();
			code_columns.count=1;
			code_columns.data_store='newsletter_components';
			code_columns.return_column='html_code';
			code_columns.indexes=[{index:'id',value:id}];
	read_json_single_column(code_columns,function (contents)
	{
		var content="";
		if(contents.length>0)
		{
			if(contents[0]!=null && contents[0]!='undefined')
				content=contents[0];
		}
		cm=$(code_filter).codeeditor({mode:'xml',content:content});
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

		var code=cm.getValue();
		var last_updated=get_my_time();

		if(typeof master!='undefined' && master=='master')
		{
			var data_json={data_store:'newsletter_components',
	 				log:'no',
	 				data:[{index:'name',value:new_name,unique:'yes'},
	 					{index:'html_code',value:code},
	 					{index:'last_updated',value:last_updated}]};
 			server_update_master_all(data_json);
		}
		else
		{
			var data_json={data_store:'newsletter_components',
	 				log:'yes',
	 				data:[{index:'id',value:id},
	 					{index:'html_code',value:code},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Newsletter design template '+name,link_to:'form298'}};
 			update_json(data_json);
 		}
 		$(form).find('.close').click();
	});

	$("#modal180_link").click();
}


/**
 * @modalNo 181
 * @modal Add/Update Preview
 * @param button
 */
function modal181_action(id,preview,new_name,master)
{
	var form=document.getElementById('modal181_form');

	var fpictureinfo=form.elements['picture'];
	var fpicture=form.elements['file_hidden'];
	var dummy_button=form.elements['dummy'];

	fpictureinfo.innerHTML="<div><img src='"+preview+"'/></div>";

	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(fpicture).trigger('click');
	});

	fpicture.addEventListener('change',function(evt)
	{
		select_picture(evt,fpictureinfo,function(dataURL)
		{
			fpictureinfo.innerHTML="<div><img src='"+dataURL+"'/></div>";
		});
	},false);

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

		var url=$(fpictureinfo).find('div').find('img').attr('src');
		var last_updated=get_my_time();

		if(typeof master!='undefined' && master=='master')
		{
			var data_json={data_store:'newsletter_components',
	 				log:'no',
	 				data:[{index:'name',value:new_name,unique:'yes'},
	 					{index:'preview',value:url},
	 					{index:'last_updated',value:last_updated}]};
 			server_update_master_all(data_json);
		}
		else
		{
			var data_json={data_store:'newsletter_components',
	 				log:'yes',
	 				data:[{index:'id',value:id},
	 					{index:'preview',value:url},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Newsletter design template '+name,link_to:'form298'}};
 			update_json(data_json);
 		}
 		$(form).find('.close').click();
	});

	$("#modal181_link").click();
}


/**
 * @modalNo 182
 * @modal Change Password
 * @param button
 */
function modal182_action()
{
	var form=document.getElementById('modal182_form');

	var old_pass=form.elements['current_pass'];
	var new_password=form.elements['new_pass'];
	var re_pass=form.elements['re_pass'];

	old_pass.value="";
	new_password.value="";
	re_pass.value="";

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();

		show_loader();
		var domain=get_domain();
		var username=get_username();
		var current_pass=old_pass.value;
		var new_pass=new_password.value;
		var last_updated=get_my_time();

		var user_data=new Object();
		user_data.count=1;
		user_data.data_store='accounts';
		user_data.indexes=[{index:'id'},{index:'password'},{index:'username',exact:username}];

		read_json_rows('',user_data,function(results)
		{
			if(results.length>0)
			{
				var salt='$2a$10$'+domain+'1234567891234567891234';
				var salt_22=salt.substring(0, 29);

				var bcrypt = new bCrypt();
				bcrypt.hashpw(current_pass, salt_22, function(currenthash)
				{
					if(currenthash.substring(3)===results[0].password.substring(3))
					{
						//console.log(newhash);
						var bcrypt = new bCrypt();
						bcrypt.hashpw(new_pass, salt_22, function(newhash)
						{
							var data_json={data_store:'accounts',
						 				log:'no',
						 				data:[{index:'id',value:results[0].id},
						 					{index:'password',value:newhash},
						 					{index:'last_updated',value:last_updated}]};

							update_json(data_json);

							$(form).find('.verify').html('Password updated.');
							old_pass.value="";
							new_password.value="";
							re_pass.value="";
							hide_loader();
							$(form).find('.close').click();
						}, function() {});
					}
					else
					{
						$(form).find('.verify').html('Incorrect password. Try again!');
						old_pass.value="";
						new_password.value="";
						re_pass.value="";
						hide_loader();
					}
				}, function() {});
			}
		});
	});

	$("#modal182_link").click();
}

function modal183_action(subject,func)
{
	var form=document.getElementById('modal183_form');

	func(function(container)
	{
		var business_title=get_session_var('title');

		var email_message=container.innerHTML;
		var from=get_session_var('email');

		form.elements['subject'].value=subject;

		$("#modal183_link").click();

		$(form).off("submit");
		$(form).on("submit",function(event)
		{
			event.preventDefault();
			show_loader();
			var receiver_array=[{"email":form.elements['email'].value,"name":''}];
			var receiver=JSON.stringify(receiver_array);
			var sub=form.elements['subject'].value;

			send_email(receiver,from,business_title,sub,email_message,function()
			{
				hide_loader();
			});
			$(form).find('.close').click();
		});
	});

	//$("#modal183_link").click();
}

/**
 * @modalNo 184
 * @modal Popup boxes content
 */
function modal184_action(id,box_id,master)
{
	var form=document.getElementById('modal184_form');

	var content_filter=form.elements['content'];
	var cm="";
	var def_columns=new Object();
			def_columns.count=1;
			def_columns.data_store='system_popboxes';
			def_columns.return_column='box_content';
			def_columns.indexes=[{index:'id',value:id}];
	read_json_single_column(def_columns,function (contents)
	{
		var content="";
		if(contents.length>0)
		{
			content=contents[0];
		}
		cm=$(content_filter).codeeditor({mode:'xml',content:content});
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

		var content=cm.getValue();
		var last_updated=get_my_time();

		if(typeof master!='undefined' && master=='master')
		{
			var data_json={data_store:'system_popboxes',
	 				log:'no',
	 				data:[{index:'box_id',value:box_id,unique:'yes'},
	 					{index:'box_content',value:content},
	 					{index:'last_updated',value:last_updated}]};
 			server_update_master_all(data_json);
		}
		else
		{
			var data_json={data_store:'system_popboxes',
	 				log:'yes',
	 				data:[{index:'id',value:id},
	 					{index:'box_content',value:content},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Popup box '+name,link_to:'form281'}};
 			update_json(data_json);
 		}
 		$(form).find('.close').click();
	});

	$("#modal184_link").click();
}

/**
 * @modalNo 185
 * @modal Popup Function Definition
 */
function modal185_action(id,box_id,master)
{
	var form=document.getElementById('modal185_form');

	var name_filter=form.elements['name'];
	var def_filter=form.elements['def'];

	name_filter.value='';
	var cm="";

	var def_columns=new Object();
			def_columns.count=1;
			def_columns.data_store='system_popboxes';
			def_columns.indexes=[{index:'id',value:id},{index:'function_name'},{index:'function_def'}];
	read_json_rows('',def_columns,function (contents)
	{
		var content="";
		if(contents.length>0)
		{
			if(contents[0].function_def!=null && contents[0].function_def!='undefined')
				content=contents[0].function_def;
			name_filter.value=contents[0].function_name;
		}
		cm=$(def_filter).codeeditor({content:content});
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

		var name=name_filter.value;
		var def=cm.getValue();
		var last_updated=get_my_time();

		if(typeof master!='undefined' && master=='master')
		{
			var data_json={data_store:'system_popboxes',
	 				log:'no',
	 				data:[{index:'box_id',value:box_id,unique:'yes'},
	 					{index:'function_name',value:name},
	 					{index:'function_def',value:def},
	 					{index:'last_updated',value:last_updated}]};
 			server_update_master_all(data_json);
		}
		else
		{
			var data_json={data_store:'system_popboxes',
	 				log:'yes',
	 				data:[{index:'id',value:id},
	 					{index:'function_name',value:name},
	 					{index:'function_def',value:def},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Popup box '+name,link_to:'form281'}};
 			update_json(data_json);
 		}
 		$(form).find('.close').click();
	});

	$("#modal185_link").click();
}

/**
 * @modalNo 186
 * @modal Overwrite Function
 */
function modal186_action(id)
{
	var form=document.getElementById('modal186_form');

	var content_filter=form.elements['content'];
	var cm="";
	var def_columns=new Object();
			def_columns.count=1;
			def_columns.data_store='system_overwrite_func';
			def_columns.return_column='function_def';
			def_columns.indexes=[{index:'id',value:id}];
	read_json_single_column(def_columns,function (contents)
	{
		var content="";
		if(contents.length>0)
		{
			content=contents[0];
		}
		cm=$(content_filter).codeeditor({content:content});
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

		var content=cm.getValue();
		var last_updated=get_my_time();

		var data_json={data_store:'system_overwrite_func',
	 				log:'yes',
	 				data:[{index:'id',value:id},
	 					{index:'function_def',value:content},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Overwrite function '+name,link_to:'form288'}};
 		update_json(data_json);
 		$(form).find('.close').click();
	});

	$("#modal186_link").click();
}

/**
 * @modalNo 187
 * @modal Create Table
 */
function modal187_action(master)
{
	var form=document.getElementById('modal187_form');

	var table_filter=form.elements['table'];
	table_filter.value="";

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

		var table=table_filter.value;
		if(typeof master!='undefined')
		{
			create_server_table(table,master);
		}
		else
		{
			create_server_table(table);
 		}
 		$(form).find('.close').click();
	});

	$("#modal187_link").click();
}

/**
 * @modalNo 188
 * @modal Create Table Column
 */
function modal188_action(tablename,master)
{
	var form=document.getElementById('modal188_form');

	var table_filter=form.elements['table'];
	var col_filter=form.elements['colname'];
	var type_filter=form.elements['coltype'];
	table_filter.value=tablename;
	col_filter.value="";
	type_filter.value="";

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

		var colname=col_filter.value;
		var coltype=type_filter.value;
		if(typeof master!='undefined')
		{
			create_server_table_column(tablename,colname,coltype,master);
		}
		else
		{
			create_server_table_column(tablename,colname,coltype);
 		}

 		$(form).find('.close').click();
	});

	$("#modal188_link").click();
}

/**
 * @modalNo 189
 * @modal Modify Table Column
 */
function modal189_action(tablename,colname,col_type,master)
{
	var form=document.getElementById('modal189_form');

	var table_filter=form.elements['table'];
	var col_filter=form.elements['colname'];
	var type_filter=form.elements['coltype'];
	table_filter.value=tablename;
	col_filter.value=colname;
	type_filter.value=col_type;

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

		var coltype=type_filter.value;
		if(typeof master!='undefined')
		{
			update_server_table_column(tablename,colname,coltype,master);
		}
		else
		{
			update_server_table_column(tablename,colname,coltype);
 		}

 		$(form).find('.close').click();
	});

	$("#modal189_link").click();
}

/**
 * @modalNo 190
 * @modal Add grids to object pages
 */
function modal190_action(id,form_id)
{
	var form=document.getElementById('modal190_form');

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

        var docHTML="<div class='row'><div class='col-xs-10'><a onclick=modal193_action(this); data-display_name='"+form.elements['disp'].value+"' data-color='"+form.elements['color'].value+"' data-width='"+form.elements['wid'].value+"' data-height='"+form.elements['hei'].value+"' data-collapse='"+form.elements['collapse'].value+"'>"+form.elements['name'].value+"</a></div><div class='col-xs-2'><i class='fa fa-times link' onclick=$(this).parent().parent().remove();></i></div></div>";
		$('#'+form_id+'_grids_'+id).append(docHTML);

 		$(form).find('.close').click();
	});

	$("#modal190_link").click();
}

/**
 * @modalNo 191
 * @modal Create Project
 */
function modal191_action(id)
{
	var form=document.getElementById('modal191_form');

	var name_filter=form.elements['name'];
	var detail_filter=form.elements['detail'];
	var status_filter=form.elements['status'];

	set_static_select('projects','status',status_filter,function ()
	{
		$(status_filter).selectpicker('val',result.status);
	});

	name_filter.value="";
	detail_filter.value="";

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		var name=name_filter.value;
		var details=detail_filter.value;
		var status=$(status_filter).val();

		var last_updated=get_my_time();

		var data_json={data_store:'projects',
	 				log:'yes',
	 				data:[{index:'id',value:id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'details',value:details},
	 					{index:'priority',value:0},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Created',notes:'Project '+name,link_to:'form220'}};
 		create_json(data_json);
 		$(form).find('.close').click();
	});

	$("#modal191_link").click();
}

/**
 * @modalNo 192
 * @modal Questionnaire submission
 */
function modal192_action(id)
{
	var form=document.getElementById('modal192_form');

	var def_filter=form.elements['def'];

	var cm="";

	var def_columns=new Object();
			def_columns.count=1;
			def_columns.data_store='ques_struct';
			def_columns.indexes=[{index:'id',value:id},{index:'function_def'}];
	read_json_rows('',def_columns,function (contents)
	{
		var content="";
		if(contents.length>0)
		{
			if(contents[0].function_def!=null && contents[0].function_def!='undefined')
				content=contents[0].function_def;
		}
		cm=$(def_filter).codeeditor({content:content});
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

		var def=cm.getValue();
		var last_updated=get_my_time();

		var data_json={data_store:'ques_struct',
	 				log:'yes',
	 				data:[{index:'id',value:id},
	 					{index:'function_def',value:def},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Updated questionnaire settings',link_to:'form143'}};
 		update_json(data_json);

 		$(form).find('.close').click();
	});

	$("#modal192_link").click();
}

/**
 * @modalNo 193
 * @modal update grids on object pages
 */
function modal193_action(elem)
{
	var form=document.getElementById('modal193_form');
    elem=$(elem);
    form.elements['disp'].value=elem.data('display_name');
    form.elements['color'].value=elem.data('color');
    form.elements['wid'].value=elem.data('width');
    form.elements['hei'].value=elem.data('height');
    form.elements['collapse'].value=elem.data('collapse');
    form.elements['name'].value=$(elem).text();

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

		var docHTML="<div class='row'><div class='col-xs-10'><a onclick=modal193_action(this); data-display_name='"+form.elements['disp'].value+"' data-color='"+form.elements['color'].value+"' data-width='"+form.elements['wid'].value+"' data-height='"+form.elements['hei'].value+"' data-collapse='"+form.elements['collapse'].value+"'>"+form.elements['name'].value+"</a></div><div class='col-xs-2'><i class='fa fa-times link' onclick=$(this).parent().parent().remove();></i></div></div>";
		$(elem).parent().parent().replaceWith(docHTML);

 		$(form).find('.close').click();
	});

	$("#modal193_link").click();
}


/**
 * @modalNo 194
 * @modal Search Items
 */
function modal194_action(elem_id)
{
	var form=document.getElementById('modal194_form');
    var keywords=form.elements['keywords'];
    var items=form.elements['items'];

    keywords.value="";
    var items_data={data_store:'product_master',return_column:'name'};
    set_simple_select(items_data,items,function()
    {
        $(items).find('option').on('click',function()
        {
            $(elem_id).val($(this).html());
            $(form).find('.close').click();
        });
    });

    function search_index()
    {
        var key_value=keywords.value;
        var key_array=key_value.split(/[\s,]+/);
        //key_array.pop();

        for(var i in key_array)
        {
            if(key_array[i]=="" || key_array[i]==null)
            {
                key_array.splice(i,1);
            }
        }

        var items_data={data_store:'product_master',return_column:'name',
                       indexes:[{index:'indexes',all_approx_array:key_array}]};
        set_simple_select(items_data,items,function()
        {
            $(items).find('option').on('click',function()
            {
                $(elem_id).val($(this).html());
                $(form).find('.close').click();
            });
        });
    }
    var timeout="";

    $(keywords).off('keyup');
    $(keywords).on('keyup',function(e)
    {
        clearTimeout(timeout);
        timeout=setTimeout(search_index,400);
    });

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
        $(elem_id).val(items.options[0].innerHTML);
 		$(form).find('.close').click();
	});

	$("#modal194_link").click();
    setTimeout(function() {$(keywords).focus();},100);
}

/**
 * @modal Analyze Order
 * @modalNo 195
 */
function modal195_action(order_id,order_num,customer)
{
	show_loader();
	var form=document.getElementById("modal195_form");
    form.elements['order'].value=order_num;

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		form181_challan(order_id,order_num,customer);
		$(form).find(".close").click();
	});

	var headHTML="<tr>"+
				"<td>Item</td>"+
				"<td>Quantity</td>"+
				"<td>Select</td>"+
				"</tr>";
	$('#modal195_item_table').html(headHTML);

	var order_items_xml={data_store:'sale_order_items',
                        indexes:[{index:'id'},
                                {index:'order_id',exact:order_id},
                                {index:'item_name'},
                                {index:'item_desc'},
                                {index:'quantity'}]};
	var analyze_item_timer=0;

	read_json_rows('',order_items_xml,function (order_items)
	{
        //console.log(bill_items);
        for(var j=0;j<order_items.length;j++)
        {
            order_items[j].order_quantity=order_items[j].quantity;
        }

        analyze_item_timer=order_items.length;

        order_items.forEach(function (order_item)
        {
            var tr_elem_title="";
            var order_item_timer=1;

            get_inventory(order_item.item_name,'',function(quantity)
            {
                if(parseFloat(quantity)<parseFloat(order_item.quantity))
                {
                    tr_elem_title='Insufficient Inventory';
                }
                order_item_timer-=1;
            });

            var order_item_analysis_complete=setInterval(function()
            {
               if(order_item_timer===0)
               {
                   clearInterval(order_item_analysis_complete);
                   var item_checked="checked";
                   var item_title=tr_elem_title;
                   var hide_checkbox=false;

                   if(item_title=='Insufficient Inventory')
                   {
                       item_checked="";
                       hide_checkbox=true;
                   }

                    var order_item_string=JSON.stringify(order_item);
                    order_item_string=order_item_string.replace(/'/g, "");
                    //console.log(order_item_string);
                    var rowsHTML="<tr title='"+item_title+"' data-object='"+order_item_string+"' id='modal195_item_row_"+order_item.id+"'>"+
                        "<td>"+order_item.item_name+"</td>"+
                        "<td>"+order_item.quantity+"</td>";

                    if(hide_checkbox)
                    {
                        rowsHTML+="<td><input "+item_checked+" style='display:none;' type='checkbox' id='modal195_item_check_"+order_item.id+"'></td>";
                    }
                    else
                    {
                        rowsHTML+="<td><input "+item_checked+" type='checkbox' id='modal195_item_check_"+order_item.id+"'></td>";
                    }
                    rowsHTML+="</tr>";
                    $('#modal195_item_table').append(rowsHTML);
                    analyze_item_timer-=1;
               }
             },100);
        });

        var analysis_complete=setInterval(function()
        {
            if(analyze_item_timer===0)
            {
                clearInterval(analysis_complete);
                hide_loader();
            }
        },100);
	});

	$("#modal195_link").click();
}


/**
 * @modalNo 196
 * @modal Add new letter
 */
function modal196_action()
{
	var form=document.getElementById('modal196_form');
    var letter=form.elements['letter'];
    var dep=form.elements['dep'];
    var notes=form.elements['notes'];
    var staff=form.elements['staff'];
    var date=form.elements['date'];
    var dpo_filter=form.elements['dpo'];
    var file_num_filter=form.elements['file_num'];
    var remarks_filter=form.elements['remarks'];
    var office_filter=form.elements['office'];

    $(date).datepicker();

    letter.value="";
    dep.value="";
    notes.value="";
    staff.value="";
    dpo_filter.value="";
    file_num_filter.value="";
    remarks_filter.value="";
    office_filter.value="";
    date.value=get_my_past_date(get_my_time()+7*86400000);

    var staff_data={data_store:'staff',return_column:'acc_name'};
    set_my_value_list_json(staff_data,staff);

    var dep_data={data_store:'letters',return_column:'department'};
    set_my_filter_json(dep_data,dep);

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
        var last_updated=get_my_time();
		var letter_num=letter.value;
        var department=dep.value;
        var details=notes.value;
        var assigned_to=staff.value;
        var dpo=dpo_filter.value;
        var file_num=file_num_filter.value;
        var remarks=remarks_filter.value;
        var office=office_filter.value;
        var due_date=get_raw_time(date.value);

		var data_json={data_store:'letters',
	 				log:'yes',
	               data:[{index:'id',value:get_new_key()},
	 					{index:'letter_num',value:letter_num,unique:'yes'},
                        {index:'department',value:department},
                        {index:'detail',value:details},
	 					{index:'due_date',value:due_date},
	 					{index:'assigned_to',value:assigned_to},
                        {index:'dpo_section',value:dpo},
                        {index:'file_num',value:file_num},
                        {index:'remarks',value:remarks},
                        {index:'office',value:office},
	 					{index:'status',value:'open'},
	 					{index:'last_updated',value:last_updated}],
	 			   log_data:{title:'Added',notes:'Letter # '+letter_num,link_to:'form326'}};
 		create_json(data_json);
        $(form).find('.close').click();
	});

	$("#modal196_link").click();
    $(letter).focus();
}


/**
 * @modalNo 197
 * @modal Close letter
 */
function modal197_action(data_id,letter_num,details)
{
	var form=document.getElementById('modal197_form');
    var letter=form.elements['letter'];
    var notes=form.elements['notes'];

    letter.value=letter_num;
    notes.value='';

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
        var last_updated=get_my_time();
		details=details+"\n"+vTime.date()+": "+notes.value;

		var data_json={data_store:'letters',
	 				log:'yes',
	               data:[{index:'id',value:data_id},
	 					{index:'detail',value:details},
	 					{index:'status',value:'closed'},
	 					{index:'last_updated',value:last_updated}],
	 			   log_data:{title:'Closed',notes:'Letter # '+letter,link_to:'form327'}};
 		update_json(data_json);

        $(form).find('.close').click();
	});

	$("#modal197_link").click();
    $(notes).focus();
}

/**
 * @modalNo 198
 * @modal Followup on letter
 */
function modal198_action(data_id,letter_num,details)
{
	var form=document.getElementById('modal198_form');
    var letter=form.elements['letter'];
    var response=form.elements['response'];
    var notes=form.elements['notes'];
    var date=form.elements['date'];

    $(date).datepicker();
    letter.value=letter_num;
    notes.value='';
    response.value='';
    date.value=get_my_past_date(get_my_time()+7*86400000);

    set_static_value_list_json('followups','response',response);

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
        details=details+"\n"+vTime.date()+": "+notes.value;
        var due_date=get_raw_time(date.value);
        var last_updated=get_my_time();
        var res=response.value;

		var data_json={data_store:'letters',
	 				log:'yes',
	               data:[{index:'id',value:data_id},
	 					{index:'detail',value:details},
                        {index:'due_date',value:due_date},
	 					{index:'last_updated',value:last_updated}],
	 			   log_data:{title:'followed on',notes:'Letter # '+letter,link_to:'form326'}};

        var follow_json={data_store:'followups',
		 				data:[{index:'id',value:get_new_key()},
		 					{index:'customer',value:letter_num},
		 					{index:'date',value:get_my_time()},
		 					{index:'response',value:response.value},
		 					{index:'detail',value:notes.value},
		 					{index:'next_date',value:due_date},
		 					{index:'source_id',value:data_id},
		 					{index:'last_updated',value:last_updated}]};

 		update_json(data_json);
        create_json(follow_json);

        $(form).find('.close').click();
	});

	$("#modal198_link").click();
    $(response).focus();
}

/**
 * @modalNo 199
 * @modal Contact Assignee
 */
function modal199_action(data_id,letter_num,assigned_to)
{
	var form=document.getElementById('modal199_form');
    var letter=form.elements['letter'];
    var assignee=form.elements['staff'];
    var message=form.elements['message'];

    letter.value=letter_num;
    assignee.value=assigned_to;
    var sms_content=get_session_var('sms_content').replace(/assignee/g,assigned_to);
    sms_content=sms_content.replace(/letter_num/g,letter_num);

    message.value=sms_content;

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();

        var phone_data={data_store:'staff',return_column:'phone',count:1,indexes:[{index:'acc_name',exact:assigned_to}]};
        read_json_single_column(phone_data,function(phones)
        {
            if(phones.length>0 && phones[0]!="" && phones[0]!='0' && phones[0]!=null)
            {
                send_sms(phones[0],message.value,'transaction');
            }
            else
            {
                $("#modal87_link").click();
            }
        });

        $(form).find('.close').click();
	});

	$("#modal199_link").click();
    $(message).focus();
}

/**
 * @modalNo 200
 * @modal Letter Followups
 */
function modal200_action(letter_id)
{
    var followup_data={data_store:'followups',
                  indexes:[{index:'date'},{index:'response'},{index:'detail'},{index:'source_id',exact:letter_id}]};
    read_json_rows('',followup_data,function(followups)
    {
        var item_table=document.getElementById("modal200_table");
        item_table.innerHTML="";
        if(followups.length>0)
        {
            var item_head=document.createElement('tr');
            item_head.innerHTML="<th>Date</th><th>Response</th><th>Notes</th>";
            item_table.appendChild(item_head);
            followups.forEach(function(followup)
            {
                var item_row=document.createElement('tr');
                item_row.innerHTML="<td>"+get_my_past_date(followup.date)+"</td><td>"+followup.response+"</td><td>"+followup.detail+"</td>";
                item_table.appendChild(item_row);
            });
        }
        else
        {
            var item_head=document.createElement('tr');
            item_head.innerHTML="<th>No Followups to show</th>";
            item_table.appendChild(item_head);
        }
        $("#modal200_link").click();
    });
}

/**
 * @modalNo 201
 * @modal Add task
 */
function modal201_action(list_name)
{
	var form=document.getElementById('modal201_form');
    var list_filter=form.elements['list'];
    var task_filter=form.elements['task'];
    var desc_filter=form.elements['desc'];
    var staff_filter=form.elements['assignee'];

    list_filter.value="";
    task_filter.value="";
    desc_filter.value="";
    staff_filter.value="";
    $(list_filter).focus();
    if(typeof list_name!='undefined' && list_name!="")
    {
        list_filter.value=list_name;
        list_filter.setAttribute('readonly','readonly');
        $(task_filter).focus();
    }
    else
    {
        list_filter.removeAttribute('readonly');
    }

    var assignee_data={data_store:'staff',return_column:'acc_name'};
    set_my_value_list_json(assignee_data,staff_filter);

    $(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
        var list=list_filter.value;
        var task=task_filter.value;
        var desc=desc_filter.value;
        var staff=staff_filter.value;
        var last_updated=get_my_time();

		var data_json={data_store:'task_instances',
                       log:'yes',
	                   data:[{index:'id',value:get_new_key()},
	 					{index:'name',value:task},
                        {index:'source_name',value:list},
                        {index:'source',value:'to_do'},
                        {index:'description',value:desc},
                        {index:'assignee',value:staff},
                        {index:'status',value:'pending'},
	 					{index:'last_updated',value:last_updated}],
	 			   log_data:{title:'Added',notes:'Task to list '+list_name,link_to:'form279'}};
        create_json(data_json);

        $(form).find('.close').click();
	});
	$('#modal201').formcontrol();
	$("#modal201_link").click();
}

/**
 * @modalNo 202
 * @modal Update task
 */
function modal202_action(data_id)
{
	var form=document.getElementById('modal202_form');
    var task_filter=form.elements['task'];
    var desc_filter=form.elements['desc'];
    var staff_filter=form.elements['assignee'];

    task_filter.value="";
    desc_filter.value="";
    staff_filter.value="";
    $(task_filter).focus();

    var assignee_data={data_store:'staff',return_column:'acc_name'};
    set_my_value_list_json(assignee_data,staff_filter);

    var task_data={data_store:'task_instances',count:1,
                  indexes:[{index:'id',value:data_id+""},
                          {index:'name'},
                          {index:'description'},
                          {index:'assignee'}]};
    read_json_rows('',task_data,function(tasks)
    {
       if(tasks.length>0)
        {
            task_filter.value=tasks[0].name;
            desc_filter.value=tasks[0].description;
            staff_filter.value=tasks[0].assignee;
        }
        setTimeout(function(){$('#modal202').formcontrol();},500);
    });

    $(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
        var task=task_filter.value;
        var desc=desc_filter.value;
        var staff=staff_filter.value;
        var last_updated=get_my_time();

		var data_json={data_store:'task_instances',
                       data:[{index:'id',value:data_id},
	 					{index:'name',value:task},
                        {index:'description',value:desc},
                        {index:'assignee',value:staff},
                        {index:'last_updated',value:last_updated}]};
        update_json(data_json);

        $(form).find('.close').click();
	});

	$("#modal202_link").click();
}

/**
 * @modalNo 203
 * @modal Add new product
 * @param button
 */
function modal203_action(func)
{
	var form=document.getElementById('modal203_form');

	var fname=form.elements['name'];
	var fmake=form.elements['make'];
	var fdescription=form.elements['desc'];


	var make_data={data_store:'product_master',return_column:'make'};
	set_my_filter_json(make_data,fmake);

	////adding attribute fields///////
	var attribute_label=document.getElementById('modal203_attributes');
	attribute_label.innerHTML="";
	var attributes_data={data_store:'mandatory_attributes',
                        indexes:[{index:'attribute'},{index:'status'},{index:'value'},{index:'object',exact:'product'}]};
	read_json_rows('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
            if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required';
				var attr_label=document.createElement('div');
				attr_label.setAttribute('class','row');
				if(attribute.value=="")
				{
					attr_label.innerHTML="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><input type='text' "+required+" name='"+attribute.attribute+"'></div>";
				}
				else
				{
					var values_array=attribute.value.split(";");
					var content="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><select "+required+" name='"+attribute.attribute+"'>";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select></div>";
					attr_label.innerHTML=content;
				}
				attribute_label.appendChild(attr_label);
			}
		});
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form39'))
		{
			var name=form.elements['name'].value;
			var make=form.elements['make'].value;
			var description=form.elements['desc'].value;

			var indexes=name.split(/[\s,]+/);
      var description_indexes=description.split(/[\s,]+/);
      var make_indexes=make.split(/[\s,]+/);
      var new_indexes=indexes.concat(description_indexes,make_indexes);
      var anew_indexes=vUtil.arrayUnique(new_indexes);
      var index_string=JSON.stringify(anew_indexes);

			var tax=form.elements['tax'].value;
			var data_id=get_new_key();
			var sale_price=form.elements['sale'].value;
			var last_updated=get_my_time();

      var data_json={data_store:'product_master',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'make',value:make},
	 					{index:'description',value:description},
	 					{index:'tax',value:tax},
						{index:'indexes',value:index_string},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Product '+name+' to inventory',link_to:'form39'}};

      create_json(data_json,func);

      var instance_json={data_store:'product_instances',
	 				data:[{index:'id',value:data_id},
	 					{index:'product_name',value:name,uniqueWith:['batch']},
	 					{index:'batch',value:name},
	 					{index:'sale_price',value:sale_price},
	 					{index:'last_updated',value:last_updated}]};
			create_json(instance_json);

			var billing_type_data={data_store:'bill_types',return_column:'name',indexes:[{index:'status',exact:'active'}]};
			read_json_single_column(billing_type_data,function(bill_types)
			{
                var id=get_new_key();
				bill_types.forEach(function(bill_type)
				{
					id++;
					var sale_price_json={data_store:'sale_prices',
	 				data:[{index:'id',value:id},
	 					{index:'product_name',value:name},
	 					{index:'batch',value:name},
	 					{index:'sale_price',value:sale_price},
	 					{index:'pi_id',value:data_id},
                        {index:'billing_type',value:bill_type},
	 					{index:'last_updated',value:last_updated}]};
					create_json(sale_price_json);
				});
			});

			var id=get_new_key();
            $("#modal203_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				var attribute=$(this).attr('name');
				if(value!="")
				{
					var attribute_json={data_store:'attributes',
	 				data:[{index:'id',value:id},
	 					{index:'name',value:name},
	 					{index:'type',value:'product'},
	 					{index:'attribute',value:attribute},
	 					{index:'value',value:value},
	 					{index:'last_updated',value:last_updated}]};
					create_json(attribute_json);
				}
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal203_link").click();
}

/**
 * @modalNo 204
 * @modal Add new batch
 */
function modal204_action(func)
{
	var form=document.getElementById('modal204_form');

	var fname=form.elements['name'];
	var fbatch=form.elements['batch'];
	var fmanufacture=form.elements['date'];
	var fsale_price=form.elements['sale'];

	$(fmanufacture).datepicker();

	var name_data={data_store:'attributes',return_column:'name',
                    indexes:[{index:'attribute',exact:'Batch Applicable'},
                            {index:'value',exact:'yes'}]};
	set_my_value_list_json(name_data,fname);

	////adding sale price fields for all billing types///////
	var billing_type_data={data_store:'bill_types',return_column:'name',
                          indexes:[{index:'status',exact:'active'}]};
	read_json_single_column(billing_type_data,function(bill_types)
	{
		var billing_label=document.getElementById('modal204_billings');
		billing_label.innerHTML="";
		bill_types.forEach(function(bill_type)
		{
            var attr_label=document.createElement('div');
            attr_label.setAttribute('class','row');
            attr_label.innerHTML="<div class='col-sm-12 col-md-4'>"+bill_type+" sale price"+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><input type='number' step='any' id='"+bill_type+"' required></div>";

			billing_label.appendChild(attr_label);
		});
	});
	////////////////////////////////////////////////

	////auto setting sale price fields/////////
	$(fsale_price).off('blur');
	$(fsale_price).on('blur',function(event)
	{
		var sale_price=fsale_price.value;
		$("#modal204_billings").find('input').each(function()
		{
			if($(this).val()=="")
			{
				$(this).val(sale_price);
			}
		});
	});
	////////////////////


	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form331'))
		{
			var name=fname.value;
			var batch=fbatch.value;
			var manu_date=get_raw_time(fmanufacture.value);
			var sale_price=fsale_price.value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var data_json={data_store:'product_instances',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'product_name',value:name,uniqueWith:['batch']},
	 					{index:'batch',value:batch},
	 					{index:'manufacture_date',value:manu_date},
	 					{index:'sale_price',value:sale_price},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'New batch '+batch+' for product '+name,link_to:'form331'}};
			create_json(data_json,func);

			var id=get_new_key();

			$("#modal204_billings").find('input').each(function()
			{
				id++;
				var price=$(this).val();
				var bill_type=$(this).attr('id');
				var sale_price_json={data_store:'sale_prices',
	 				data:[{index:'id',value:data_id},
	 					{index:'product_name',value:name},
	 					{index:'batch',value:batch},
	 					{index:'sale_price',value:price},
	 					{index:'pi_id',value:data_id},
	 					{index:'billing_type',value:bill_type},
	 					{index:'last_updated',value:last_updated}]};
				create_json(sale_price_json);
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal204_link").click();
}

/**
 * @modalNo 205
 * @modal Add new staff
 * @param button
 */
function modal205_action(func)
{
	var form=document.getElementById('modal205_form');

	var fname=form.elements['name'];
	var fphone=form.elements['phone'];
	var funit=form.elements['unit'];
	var fdesig=form.elements['desig'];

	///////////////////////////
	fname.value="";
	fphone.value="";
	funit.value="";
	fdesig.value="";

	var attribute_label=document.getElementById('modal205_attributes');
	attribute_label.innerHTML="";
	var attributes_data={data_store:'mandatory_attributes',
								indexes:[{index:'attribute'},{index:'status'},{index:'value'},{index:'object',exact:'staff'}]};

	read_json_rows('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required';
				var attr_label=document.createElement('div');
				attr_label.setAttribute('class','row');
				if(attribute.value=="")
				{
					attr_label.innerHTML="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><input type='text' "+required+" name='"+attribute.attribute+"'></div>";
				}
				else
				{
					var values_array=attribute.value.split(";");
					var content="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><select "+required+" name='"+attribute.attribute+"'>";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select></div>";
					attr_label.innerHTML=content;
				}
				attribute_label.appendChild(attr_label);
			}
		});
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form8'))
		{
			var name=fname.value;
			var phone=fphone.value;
			var acc_name=name+" ("+phone+")";
			var unit=funit.value;
			var designation=fdesig.value;

			name = name.replace(/â/g,'');
			name = name.replace(/&/g, "and");

			var data_id=get_new_key();
			var last_updated=get_my_time();

			var data_json={data_store:'staff',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'phone',value:phone},
	 					{index:'unit',value:unit},
	 					{index:'designation',value:designation},
	 					{index:'status',value:'active'},
	 					{index:'acc_name',value:acc_name,unique:'yes'},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'New staff '+name,link_to:'form335'}};

			var account_json={data_store:'accounts',
	 				data:[{index:'id',value:data_id},
	 					{index:'type',value:'staff'},
	 					{index:'username',value:''},
	 					{index:'acc_name',value:acc_name,unique:'yes'},
	 					{index:'status',value:'active'},
	 					{index:'last_updated',value:last_updated}]};

			create_json(data_json,func);
			create_json(account_json);

			var id=get_new_key();
			$("#modal205_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				var attribute=$(this).attr('name');
				if(value!="")
				{
					var attribute_json={data_store:'attributes',
	 				data:[{index:'id',value:id},
	 					{index:'name',value:acc_name},
	 					{index:'type',value:'staff'},
	 					{index:'attribute',value:attribute},
	 					{index:'value',value:value},
	 					{index:'last_updated',value:last_updated}]};
					create_json(attribute_json);
				}
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal205_link").click();
}

/**
 * @modalNo 206
 * @modal Add document
 * @param button
 */
function modal206_action(doc_type,target_id,target_name,func)
{
	var form=document.getElementById('modal206_form');

	var fname=form.elements['name'];
	var docInfo=document.getElementById('modal206_url');
	var fpicture=form.elements['file_hidden'];
    var dummy_button=form.elements['dummy'];

	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(fpicture).trigger('click');
	});

	fpicture.addEventListener('change',function(evt)
	{
		select_document(evt,function(dataURL)
		{
			docInfo.setAttribute('href',dataURL);
		});
	},false);

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form39'))
		{
			var doc_name=fname.value;
			var data_id=get_new_key();
			var url=$(docInfo).attr('href');
			var last_updated=get_my_time();

			if(url!="")
			{
                var data_json={data_store:'documents',
 				data:[{index:'id',value:data_id},
	 					{index:'url',value:url},
	 					{index:'doc_name',value:doc_name},
	 					{index:'doc_type',value:doc_type},
	 					{index:'target_id',value:target_id},
	 					{index:'target_name',value:target_name},
	 					{index:'last_updated',value:last_updated}]};

				create_json(data_json);

				if(typeof func!='undefined')
				{
					func(url,doc_name);
				}
			}
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal206_link").click();
}

/**
 * @modalNo 207
 * @modal Test Results
 */
function modal207_action(test_id,test_data_id)
{
    var result_data={data_store:'testing_results',
                  indexes:[{index:'id'},{index:'date'},{index:'response'},{index:'details'},{index:'test_id',exact:test_id}]};
    read_json_rows('',result_data,function(followups)
    {
        var item_table=document.getElementById("modal207_table");
        item_table.innerHTML="";
        if(followups.length>0)
        {
            var item_head=document.createElement('tr');
            item_head.innerHTML="<th>Date</th><th>Result</th><th>Notes</th><th>Document</th>";
            item_table.appendChild(item_head);
            followups.forEach(function(followup)
            {
                var item_row=document.createElement('tr');
                item_row.innerHTML="<td>"+get_my_past_date(followup.date)+"</td><td><span class='label label-sm "+status_label_colors[followup.response]+"'>"+followup.response+"</span></td><td>"+followup.details+"</td><td id='modal207_document_"+followup.id+"'></td>";
                item_table.appendChild(item_row);

                var doc_column={data_store:'documents',count:1,
                               indexes:[{index:'id'},
                                       {index:'url'},
                                       {index:'doc_name'},
                                       {index:'doc_type',exact:'testing_results'},
                                       {index:'target_id',exact:test_data_id}]};
                read_json_rows('',doc_column,function(doc_results)
                {
                    if (doc_results.length>0)
                    {
                        var docHTML="<a href='"+doc_results[0].url+"' download='"+doc_results[0].doc_name+"'><u>"+doc_results[0].doc_name+"</u></a><br>";
                        document.getElementById('modal207_document_'+followup.id).innerHTML=docHTML;
                    }
                });
            });
        }
        else
        {
            var item_head=document.createElement('tr');
            item_head.innerHTML="<th>No Results to show</th>";
            item_table.appendChild(item_head);
        }
        $("#modal207_link").click();
    });
}

function modal208_action()
{
	var form=document.getElementById('modal208_form');

	var template_button=form.elements['template'];
    var select_file=form.elements['fi'];
	var dummy_button=form.elements['dummy'];
	var selected_file=form.elements['selected_file'];
	var import_button=form.elements['import'];
    var manifest_filter=form.elements['manifest'];
    var coloader_filter=form.elements['coloader'];
    var vendor_filter=form.elements['vendor'];

    var manifest_data={data_store:'user_preferences',return_column:'value',indexes:[{index:'name',exact:'manifest_num'}]};
    set_my_value_json(manifest_data,manifest_filter);

	$(dummy_button).off('click');
	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(select_file).trigger('click');
	});

	dummy_button.setAttribute('class','btn red-sunglo');
	select_file.value="";
	selected_file.value="";

	$(select_file).off('change');
	$(select_file).on('change',function ()
	{
		var file_name=select_file.value;
		if(file_name!="" && (file_name.indexOf('csv')>-1))
		{
			dummy_button.setAttribute('class','btn green-jungle');
	        selected_file.value=file_name;
		}
		else
		{
			dummy_button.setAttribute('class','btn red-sunglo');
	       select_file.value="";
			selected_file.value="";
		}
	});

	$(template_button).off("click");
	$(template_button).on("click",function(event)
	{
		var data_array=['AWB No','Consignment No','Weight','LBH'];
		my_array_to_csv(data_array);
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		show_progress();
		var file=select_file.files[0];
        var fileType = /csv/gi;
		var manifest_num=manifest_filter.value;
        var coloader=coloader_filter.value;
        var vendor=vendor_filter.value;

        selected_file.value = "Uploading!! Please don't refresh";
    	var reader = new FileReader();
        reader.onload = function(e)
        {
        	progress_value=2;
        	var content=reader.result;
        	var data_array=vUtil.csv2array(content);

			progress_value=5;

			var validate_template_array=[{column:'Weight',regex:new RegExp('^[0-9 .]+$')},
										{column:'AWB No',required:'yes',regex:new RegExp('^[0-9]+$')}];

			var error_array=vImport.validate(data_array,validate_template_array);
			if(error_array.status=='success')
			{
	        	progress_value=10;
	           	//////////////////
                var data_id=get_new_key();
                var last_updated=get_my_time();

                var awbs_array=[];
                data_array.forEach(function(data)
                {
                    awbs_array.push(data['AWB No']);
                });

                var ids_data={data_store:'logistics_orders',indexes:[{index:'id'},{index:'awb_num',array:awbs_array}]};
                read_json_rows('',ids_data,function(ids)
                {
                    data_array.forEach(function(row)
                    {
                        for(var i in ids)
                        {
                            if(ids[i].awb_num==row['AWB No'])
                            {
                                row.id=ids[i].id;
                                ids.splice(i,1);
                                break;
                            }
                        }
                    });

                    var data_json={data_store:'manifests',
                                log:'yes',
                                data:[{index:'id',value:data_id},
                                    {index:'manifest_num',value:manifest_num},
                                    {index:'coloader',value:coloader},
                                    {index:'date',value:get_raw_time(vTime.date())},
                                    {index:'vendor',value:vendor},
                                    {index:'num_orders',value:data_array.length},
                                    {index:'last_updated',value:last_updated}],
                                log_data:{title:'Imported',notes:'Manifest # '+manifest_num,link_to:'form322'}};
                    create_json(data_json);

                    var num_data={data_store:'user_preferences',return_column:'id',indexes:[{index:'name',exact:'manifest_num'}]};
                    read_json_single_column(num_data,function (manifest_num_ids)
                    {
                        if(manifest_num_ids.length>0)
                        {
                            var num_json={data_store:'user_preferences',
                                data:[{index:'id',value:manifest_num_ids[0]},
                                    {index:'value',value:(parseInt(manifest_num)+1)},
                                    {index:'last_updated',value:last_updated}]};

                            update_json(num_json);
                        }
                    });


                    var orders_data_json={data_store:'logistics_orders',loader:'yes',data:[]};

                    var counter=1;

                    data_array.forEach(function(row)
                    {
                        counter+=1;

                        var data_json_array=[{index:'id',value:row.id},
                                {index:'weight',value:row['Weight']},
                                {index:'lbh',value:row['LBH']},
                                {index:'consignment_num',value:row['Consignment No']},
                                {index:'man_id',value:data_id},
                                {index:'manifest_num',value:manifest_num},
                                {index:'last_updated',value:last_updated}];
                        orders_data_json.data.push(data_json_array);
                    });
                    update_batch_json(orders_data_json);

                    ////////////////////
                    progress_value=15;

                    var ajax_complete=setInterval(function()
                    {
                        //console.log(number_active_ajax);
                        if(number_active_ajax===0)
                        {
                            progress_value=15+(1-(localdb_open_requests/(2*data_array.length)))*85;
                        }
                        else if(localdb_open_requests===0)
                        {
                            progress_value=15+(1-((500*(number_active_ajax-1))/(2*data_array.length)))*85;
                        }

                        if(number_active_ajax===0 && localdb_open_requests===0)
                        {
                            hide_progress();
                            selected_file.value="Upload complete";
                            $(select_file).val('');
                            $("#modal208").dialog("close");
                            clearInterval(ajax_complete);
                        }
                    },1000);
                });
	        }
	        else
	        {
	        	hide_progress();
       			$(select_file).val('');
       			$("#modal208").dialog("close");
				modal164_action(error_array);
	        }
        }
        reader.readAsText(file);
    });

	$("#modal208").dialog("open");
}

function modal209_action(subject,body,message_attachment)
{
	var form=document.getElementById('modal209_form');
	var business_title=get_session_var('title');
	var from=get_session_var('email');

    form.elements['subject'].value=subject;
    form.elements['body'].value=body;

    $('#modal209').formcontrol();

    $(form).off("submit");
    $(form).on("submit",function(event)
    {
        event.preventDefault();
        show_loader();
        var receiver_array=[{"email":form.elements['email'].value,"name":''}];
        var receiver=JSON.stringify(receiver_array);
        var sub=form.elements['subject'].value;
        var bod=form.elements['body'].value;

        send_email_attachment(receiver,from,business_title,sub,bod,message_attachment,'csv',function()
        {
            hide_loader();
        });
        $(form).find(".close").click();
    });

    $("#modal209_link").click();
}


/**
 * @modalNo 210
 * @modal Add document (to S3)
 * @param button
 */
function modal210_action(description,func)
{
	var form=document.getElementById('modal210_form');

	var fdesc=form.elements['desc'];
	var fpicture=form.elements['file_hidden'];
    var dummy_button=form.elements['dummy'];
    fdesc.value=description;
    var contentType='';
    var filetype='';
    var url="";

	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(fpicture).trigger('click');
	});


	fpicture.addEventListener('change',function(evt)
	{
        var files = fpicture.files;
        contentType=files[0].type;
        var file_attr=files[0].name.split('.');
        filetype=file_attr[file_attr.length-1];
        console.log(filetype);
		select_document(evt,function(dataURL)
		{
			url=dataURL;
		});
	},false);

    $('modal210_form').formcontrol();

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form343'))
		{
			var data_id=get_new_key();
			var doc_name=get_session_var('domain')+data_id+"."+filetype;
			var last_updated=get_my_time();

			if(url!="")
			{
                var data_json={type:'create',
                           bucket:'vyavsaay-documents',
                           blob: url,
                           name:doc_name,
                           description:fdesc.value,
                           content_type:contentType};
				s3_object(data_json);

				if(typeof func!='undefined')
				{
					func(url);
				}
			}
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal210_link").click();
}

/**
 * @modalNo 211
 * @modal Mark manifest as bag
 * @param button
 */
function modal211_action(manifest_id,manifest_num,func)
{
	var form=document.getElementById('modal211_form');

	var fmanifest=form.elements['manifest_num'];
    fmanifest.value=manifest_num;

	var fseal=form.elements['seal'];
    var flbh=form.elements['lbh'];
    var fweight=form.elements['weight'];

    fseal.value='';
    flbh.value='';
    fweight.value='';

    $('modal211_form').formcontrol();

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form321'))
		{
            var master_form=document.getElementById("form321_master");
            var last_updated=get_my_time();
            master_form.elements['type'].value='bag';
            master_form.elements['lbh'].value=flbh.value;
            master_form.elements['weight'].value=fweight.value;
            master_form.elements['seal'].value=fseal.value;

			var data_json={data_store:'manifests',
                        data:[{index:'id',value:manifest_id},
                            {index:'seal_num',value:fseal.value},
                            {index:'lbh',value:flbh.value},
                            {index:'weight',value:fweight.value},
                            {index:'type',value:'bag'},
                            {index:'last_updated',value:last_updated}],
                          log:'yes',
                          log_data:{title:'Updated',notes:'Marked manifest # '+manifest_num+' as bag',link_to:'form322'}};
            update_json(data_json);
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal211_link").click();
}

/**
 * @modalNo 213
 * @modal Import Configurations
 * @param button
 */
function modal213_action(dbname)
{
	var form=document.getElementById('modal213_form');

	var fpicture=form.elements['file_hidden'];
    var dummy_button=form.elements['dummy'];
    var contentType='';
    var filetype='';
    var url="";

	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(fpicture).trigger('click');
	});

	fpicture.addEventListener('change',function(evt)
	{
        var files = fpicture.files;
        contentType=files[0].type;
        var file_attr=files[0].name.split('.');
        filetype=file_attr[file_attr.length-1];
		select_document(evt,function(dataURL)
		{
			url=dataURL;
		});
	},false);

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form293'))
		{
			var last_updated=get_my_time();

			if(url!="" && filetype=='sql' && contentType=='application/sql')
			{
				server_update_config({db:dbname,sql:url});
            }
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal213_link").click();
}

/**
 * @modalNo 214
 * @modal Add new product (nvs)
 * @param button
 */
function modal214_action(func)
{
	var form=document.getElementById('modal214_form');

	var fname=form.elements['name'];
	var fmake=form.elements['make'];
	var fdescription=form.elements['desc'];

	var make_data={data_store:'product_master',return_column:'make'};
	set_my_filter_json(make_data,fmake);

	////adding attribute fields///////
	var attribute_label=document.getElementById('modal214_attributes');
	attribute_label.innerHTML="";
	var attributes_data={data_store:'mandatory_attributes',
                        indexes:[{index:'attribute'},{index:'status'},{index:'value'},{index:'object',exact:'product'}]};
	read_json_rows('',attributes_data,function(attributes)
	{
		attributes.forEach(function(attribute)
		{
			if(attribute.status!='inactive')
			{
				var required="";
				if(attribute.status=='required')
					required='required';
				var attr_label=document.createElement('div');
				attr_label.setAttribute('class','row');
				if(attribute.value=="")
				{
					attr_label.innerHTML="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><input type='text' "+required+" name='"+attribute.attribute+"'></div>";
				}
				else
				{
					var values_array=attribute.value.split(";");
					var content="<div class='col-sm-12 col-md-4'>"+attribute.attribute+"</div>"+
					     			"<div class='col-sm-12 col-md-8'><select "+required+" name='"+attribute.attribute+"'>";
					values_array.forEach(function(fvalue)
					{
						content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
					});
					content+="</select></div>";
					attr_label.innerHTML=content;
				}
				attribute_label.appendChild(attr_label);
			}
		});
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form234'))
		{
			var name=form.elements['name'].value;
			var make=form.elements['make'].value;
			var description=form.elements['desc'].value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
      var indexes=name.split(/[\s,]+/);
      var description_indexes=description.split(/[\s,]+/);
      var make_indexes=make.split(/[\s,]+/);
      var new_indexes=indexes.concat(description_indexes,make_indexes);
      var anew_indexes=vUtil.arrayUnique(new_indexes);
      var index_string=JSON.stringify(anew_indexes);

      var data_json={data_store:'product_master',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'make',value:make},
	 					{index:'description',value:description},
	 					{index:'indexes',value:index_string},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Product '+name+' to inventory',link_to:'form39'}};

            create_json(data_json,func);

        var instance_json={data_store:'product_instances',
	 				data:[{index:'id',value:data_id},
	 					{index:'product_name',value:name,uniqueWith:['batch']},
	 					{index:'batch',value:name},
	 					{index:'last_updated',value:last_updated}]};
			create_json(instance_json);

			var id=get_new_key();
      $("#modal214_attributes").find('input, select').each(function()
			{
				id++;
				var value=$(this).val();
				var attribute=$(this).attr('name');
				if(value!="")
				{
					var attribute_json={data_store:'attributes',
	 				data:[{index:'id',value:id},
	 					{index:'name',value:name},
	 					{index:'type',value:'product'},
	 					{index:'attribute',value:attribute},
	 					{index:'value',value:value},
	 					{index:'last_updated',value:last_updated}]};
					create_json(attribute_json);
				}
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal214_link").click();
}

/**
 * @modalNo 215
 * @modal Update Inventory (nvs)
 */
function modal215_action(item_name)
{
	var form=document.getElementById('modal215_form');

	var fitem=form.elements['name'];
	var fcurrent=form.elements['current'];
	var fupdated=form.elements['updated'];
	var fpart=form.elements['part'];
	fitem.value=item_name;
	fpart.value="";

	get_inventory(item_name,'',function(inventory)
	{
		fcurrent.value=inventory;
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form260') || is_update_access('form285'))
		{
			var updated=fupdated.value;
			var current=fcurrent.value;
			var particulars=fpart.value;
			var change=parseFloat(updated)-parseFloat(current);
			var last_updated=get_my_time();

			var adjust_json={data_store:'inventory_adjust',
			data:[{index:'id',value:get_new_key()},
				{index:'product_name',value:item_name},
				{index:'batch',value:item_name},
				{index:'quantity',value:change},
				{index:'source',value:'Manual Entry'},
				{index:'item_desc',value:particulars},
				{index:'last_updated',value:last_updated}]};
			create_json(adjust_json);
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal215_link").click();
}


function modal216_action(policy_holder_value,tele_caller_value,func)
{
	var form=document.getElementById('modal216_form');
	var fapp=form.elements['app_number'];
	var fcompany=form.elements['company'];
	var fpreferred=form.elements['preferred'];
	var fptype=form.elements['policy_type'];
	var fterm=form.elements['term'];
	var fpname=form.elements['policy_name'];
	var fholder=form.elements['holder'];
	var fsum=form.elements['sum'];
	var fadults=form.elements['adults'];
	var fchild=form.elements['children'];
	var fage=form.elements['age'];
	var fpremium=form.elements['premium'];
	var freceived=form.elements['received_amount'];
	var fdiscount=form.elements['discount'];
	var ftype=form.elements['type'];
	var fported_from=form.elements['ported_from'];
	var fsource=form.elements['source'];
	var flead=form.elements['lead'];
	var fmanager=form.elements['sales'];
	var fcaller=form.elements['caller'];
	var fagent=form.elements['agent'];
	var select_file=form.elements['file'];
	var dummy_button=form.elements['file_dummy'];

	$(dummy_button).off('click');
	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(select_file).trigger('click');
	});

	dummy_button.setAttribute('class','btn red-sunglo');
	select_file.value="";

	$(select_file).off('change');
	$(select_file).on('change',function ()
	{
		var file_name=select_file.value;
		if(file_name!="")
		{
			dummy_button.setAttribute('class','btn green-jungle');
		}
		else
		{
			dummy_button.setAttribute('class','btn red-sunglo');
			select_file.value="";
		}
	});

	fapp.value="";
	fcompany.value="";
	fpreferred.value="";
	fptype.value="";
	fterm.value="";
	fpname.value="";
	fholder.value="";
	fsum.value="";
	fadults.value="";
	fchild.value="";
	fage.value="";
	fpremium.value="";
	freceived.value="";
	fdiscount.value="";
	ftype.value="fresh";
	fported_from.value="";
	fsource.value="";
	flead.value="";
	fmanager.value="";
	fcaller.value="";
	fagent.value="";

	if(!vUtil.isBlank(policy_holder_value))
	{
		fholder.value=policy_holder_value;
	}

	if(!vUtil.isBlank(tele_caller_value))
	{
		fcaller.value=tele_caller_value;
	}

	set_value_list_json(['fresh','portability'],ftype);
	set_value_list_json([100000,200000,300000,400000,500000,700000,750000,1000000,1500000,2000000,2500000,5000000,10000000,20000000,50000000],fsum);
	set_value_list_json([1,2],fadults);
	set_value_list_json([0,1,2,3],fchild);

	set_static_value_list_json('policies','sales source',fsource);

	var name_data={data_store:'policy_types',return_column:'name'};
	set_my_value_list_json(name_data,fpname);

	function policy_filtering()
	{
		fpname.value="";
		var name_data={data_store:'policy_types',return_column:'name',
						indexes:[{index:'issuer',value:fcompany.value},
								{index:'term',value:fterm.value},
								{index:'preferred',value:fpreferred.value}]};
		set_my_value_list_json(name_data,fpname);
	};

	function discount_cal()
	{
		var short_premium = parseFloat(fpremium.value) - parseFloat(freceived.value);
		var discount = vUtil.round(short_premium/(fpremium.value)*100,2);
		fdiscount.value = short_premium+" ("+discount+" %)";
	}

	vUtil.onChange(fcompany,policy_filtering);
	vUtil.onChange(fterm,policy_filtering);
	vUtil.onChange(fpreferred,policy_filtering);
	vUtil.onChange(fpremium,discount_cal);
	vUtil.onChange(freceived,discount_cal);

	function premium_calculation()
	{
		fpremium.value="";
		var premium_data={data_store:'policy_premiums',return_column:'premium_amount',
						indexes:[{index:'policy_name',exact:fpname.value},
								{index:'sum_insured',exact:fsum.value},
								{index:'adults',exact:fadults.value},
								{index:'children',exact:fchild.value},
								{index:'age_lower',upperbound:fage.value},
								{index:'age_upper',lowerbound:fage.value}]};
		set_my_value_json(premium_data,fpremium);
	};
	vUtil.onChange(fsum,premium_calculation);
	vUtil.onChange(fadults,premium_calculation);
	vUtil.onChange(fchild,premium_calculation);
	vUtil.onChange(fage,premium_calculation);

	var holder_data={data_store:'customers',return_column:'acc_name'};
	set_my_value_list_json(holder_data,fholder);

	var company_data={data_store:'policy_types',return_column:'issuer'};
	set_my_value_list_json(company_data,fcompany);

	var lead_data={data_store:'attributes',return_column:'name',
					indexes:[{index:'type',exact:'staff'},
							{index:'attribute',exact:'Designation'},
							{index:'value',exact:'Team Lead'}]};
	set_my_value_list_json(lead_data,flead);

	var manager_data={data_store:'attributes',return_column:'name',
					indexes:[{index:'type',exact:'staff'},
							{index:'attribute',exact:'Designation'},
							{index:'value',exact:'Sales Manager'}]};
	set_my_value_list_json(manager_data,fmanager);

	var caller_data={data_store:'attributes',return_column:'name',
					indexes:[{index:'type',exact:'staff'},
							{index:'attribute',exact:'Designation'},
							{index:'value',exact:'Tele-Caller'}]};
	set_my_value_list_json(caller_data,fcaller);

	var agent_data={data_store:'attributes',return_column:'name',
					indexes:[{index:'type',exact:'staff'},
							{index:'attribute',exact:'Designation'},
							{index:'value',exact:'Agent'}]};
	set_my_value_list_json(agent_data,fagent);

	set_static_value_list_json('policy_types','type',fptype);
	set_static_value_list_json('policy_types','term',fterm);
	set_static_value_list_json('policy_types','preferred',fpreferred);

	$(fported_from).parent().parent().hide();

	vUtil.onChange(ftype,function()
	{
		if(ftype.value=='portability')
		{
			$(fported_from).parent().parent().show();
		}
	});

	var description = "";
	vUtil.onChange(fpname,function()
	{
		var policy_data={data_store:'policy_types',count:1,
						indexes:[{index:'issuer'},
								{index:'description'},
								{index:'type'},
								{index:'term'},
								{index:'preferred'},
								{index:'accounts'},
								{index:'name',exact:fpname.value}]};
		read_json_rows('',policy_data,function(policies)
		{
			if(policies.length>0)
			{
				var accounts_array=vUtil.jsonParse(policies[0].accounts);
				if(accounts_array.length>0)
				{
					fagent.value = accounts_array[0];
				}
				fcompany.value = policies[0].issuer;
				fpreferred.value = policies[0].preferred;
				description = policies[0].description;
			}
		});

		premium_calculation();
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form347'))
		{
			//saving attachments
			var last_updated=vTime.unix();
			var attachments = [];
			var domain=get_session_var('domain');
			var files = select_file.files;
			// console.log(files);
			var counter=files.length;
			for(var i=0; i<files.length; i++)
			{
				var file=files[i];
				var contentType=file.type;
				var file_attr=file.name.split('.');
				var filetype=file_attr[file_attr.length-1];
				vUtil.fileToDataUrl(file,function(dataURL)
				{
					if(dataURL!="")
					{
						var doc_name=domain+vTime.unix()+file.name;
						var doc_mapping={name:file.name,url:doc_name};
						attachments.push(doc_mapping);

						var data_json={type:'create',
								   bucket:'vyavsaay-documents',
								   blob: dataURL,
								   name:doc_name,
								   description:'',
								   content_type:contentType};
						s3_object(data_json);
						counter--;
					}
				});
			}

			var wait=setInterval(function()
			{
				if(counter==0)
				{
					clearInterval(wait);
					var short_premium = parseFloat(fpremium.value) - parseFloat(freceived.value);
					var discount = vUtil.round(short_premium/(fpremium.value)*100,2);
					var attachment_string=JSON.stringify(attachments);
					var data_json={data_store:'policies',
					data:[{index:'id',value:get_new_key()},
						{index:'application_num',value:fapp.value,unique:'yes'},
						{index:'policy_num',value:""},
						{index:'policy_name',value:fpname.value},
						{index:'description',value:description},
						{index:'issuer',value:fcompany.value},
						{index:'policy_holder',value:fholder.value},
						{index:'premium',value:fpremium.value},
						{index:'discount',value:discount},
						{index:'received_amount',value:freceived.value},
						{index:'short_premium',value:short_premium},
						{index:'agent',value:fagent.value},
						{index:'type',value:fptype.value},
						{index:'term',value:fterm.value},
						{index:'preferred',value:fpreferred.value},
						{index:'issue_type',value:ftype.value},
						{index:'ported_source',value:fported_from.value},
						{index:'sum_insured',value:fsum.value},
						{index:'adults',value:fadults.value},
						{index:'children',value:fchild.value},
						{index:'age',value:fage.value},
						{index:'team_lead',value:flead.value},
						{index:'sales_manager',value:fmanager.value},
						{index:'tele_caller',value:fcaller.value},
						{index:'sales_source',value:fsource.value},
						{index:'attachments',value:attachment_string},
						{index:'status',value:'applied'},
						{index:'last_updated',value:last_updated}]};
					create_json(data_json);

					if(!vUtil.isBlank(func))
					{
						func(fapp.value);
					}
				}
			},500);
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal216_link").click();
}


/**
 * @modalNo 217
 * @modal Add Policy Type
 */
function modal217_action()
{
	var form=document.getElementById('modal217_form');
	var ftype=form.elements['type'];
	var fissuer=form.elements['issuer'];
    var fterm=form.elements['term'];
    var fpreferred=form.elements['preferred'];

	set_static_value_list_json('policy_types','type',ftype);

	issuer_data={data_store:'policy_types',return_column:'issuer'};
	set_my_filter_json(issuer_data,fissuer);

	set_static_value_list_json('policy_types','term',fterm);
	set_static_value_list_json('policy_types','preferred',fpreferred);

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form351'))
		{
			var name=form.elements['name'].value;
			var type=ftype.value;
			var desc=form.elements['desc'].value;
			var issuer=fissuer.value;
			var term=fterm.value;
			var preferred=fpreferred.value;
			var last_updated=get_my_time();

			var data_json={data_store:'policy_types',
			data:[{index:'id',value:get_new_key()},
				{index:'name',value:name},
				{index:'type',value:type},
				{index:'description',value:desc},
				{index:'issuer',value:issuer},
				{index:'term',value:term},
				{index:'preferred',value:preferred},
				{index:'last_updated',value:last_updated}]};
			create_json(data_json);
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal217_link").click();
}

/**
 * @modalNo 218
 * @modal Add Commission
 */
function modal218_action()
{
	var form=document.getElementById('modal218_form');
	var fpolicy=form.elements['policy_number'];
	var fissue=form.elements['issue'];
	var ftype=form.elements['type'];
	var fname=form.elements['name'];
	var fagent=form.elements['agent'];
	var fholder=form.elements['holder'];

	$(fissue).datepicker();

	set_static_value_list_json('policy_types','commissions',ftype);

	policies_data={data_store:'policies',return_column:'policy_num'};
	set_my_value_list_json(policies_data,fpolicy);

	$(fpolicy).off('blur');
	$(fpolicy).off('change');

	var pissuer="";
	$(fpolicy).on('blur change',function()
	{
		var policy_data={data_store:'policies',count:1,
						indexes:[{index:'policy_name'},{index:'issuer'},{index:'policy_holder'},{index:'agent'},
						{index:'policy_num',exact:fpolicy.value}]};
		read_json_rows('',policy_data,function(policies)
		{
			if(policies.length>0)
			{
				fname.value=policies[0].policy_name;
				fagent.value=policies[0].agent;
				fholder.value=policies[0].policy_holder;
				pissuer=policies[0].issuer;
			}
		});
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form351'))
		{
			var notes=form.elements['notes'].value;
			var issue_date=vTime.unix({date:fissue.value});
			var commission_amount=form.elements['commission'].value;
			var commission_number=form.elements['commission_num'].value;
			var last_updated=vTime.unix();

			var data_json={data_store:'policy_commissions',
			data:[{index:'id',value:get_new_key()},
				{index:'policy_num',value:fpolicy.value},
				{index:'commission_num',value:commission_number},
				{index:'issuer',value:pissuer},
				{index:'policy_holder',value:fholder.value},
				{index:'amount',value:commission_amount},
				{index:'agent',value:fagent.value},
				{index:'issue_date',value:issue_date},
				{index:'commission_type',value:ftype.value},
				{index:'status',value:'pending'},
				{index:'notes',value:notes},
				{index:'last_updated',value:last_updated}]};
			create_json(data_json);
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal218_link").click();
}

/**
 * @modalNo 219
 * @modal Add Claim
 */
function modal219_action()
{
	var form=document.getElementById('modal219_form');
	var fpolicy=form.elements['policy_number'];
	var frequest=form.elements['request'];
	var fissue=form.elements['issue'];
	var fname=form.elements['name'];
	var fagent=form.elements['agent'];
	var fholder=form.elements['holder'];

	$(fissue).datepicker();
	$(frequest).datepicker();

	policies_data={data_store:'policies',return_column:'policy_num'};
	set_my_value_list_json(policies_data,fpolicy);

	$(fpolicy).off('blur');
	$(fpolicy).off('change');

	var pissuer="";
	$(fpolicy).on('blur change',function()
	{
		var policy_data={data_store:'policies',count:1,
										indexes:[{index:'policy_name'},{index:'issuer'},{index:'policy_holder'},{index:'agent'},
														{index:'policy_num',exact:fpolicy.value}]};
		read_json_rows('',policy_data,function(policies)
		{
			if(policies.length>0)
			{
				fname.value=policies[0].policy_name;
				fagent.value=policies[0].agent;
				fholder.value=policies[0].policy_holder;
				pissuer=policies[0].issuer;
			}
		});
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form351'))
		{
			var notes=form.elements['notes'].value;
			var issue_date=vTime.unix({date:fissue.value});
			var request_date=vTime.unix({date:frequest.value});
			var claim_amount=form.elements['claim'].value;
			var claim_number=form.elements['claim_num'].value;
			var last_updated=vTime.unix();
			var notes_array=[{date:last_updated,detail:notes}];
			var notes_string=JSON.stringify(notes_array);
			var data_json={data_store:'policy_claims',
			data:[{index:'id',value:get_new_key()},
				{index:'policy_num',value:fpolicy.value},
				{index:'claim_num',value:claim_number},
				{index:'issuer',value:pissuer},
				{index:'policy_holder',value:fholder.value},
				{index:'amount',value:claim_amount},
				{index:'agent',value:fagent.value},
				{index:'issue_date',value:issue_date},
				{index:'request_date',value:request_date},
				{index:'status',value:'pending'},
				{index:'notes',value:notes_string},
				{index:'last_updated',value:last_updated}]};
			create_json(data_json);
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal219_link").click();
}

/**
 * @modalNo 220
 * @modal Add note to policy claim
 */
function modal220_action(claim_id)
{
	var form=document.getElementById('modal220_form');
	var date_filter=form.elements['date'];
	var detail_filter=form.elements['details'];

	$(date_filter).datepicker();
	date_filter.value=vTime.date();

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form349'))
		{
			var id=get_new_key();
			var details=detail_filter.value;
			var last_updated=get_my_time();

			var claim_data={data_store:'policy_claims',count:1,return_column:'notes',indexes:[{index:'id',exact:claim_id}]};
			read_json_single_column(claim_data,function(claims)
			{
				if(claims.length>0)
				{
					var notes_array=vUtil.jsonParse(claims[0]);
					notes_array.push({date:vTime.unix(date_filter.value),detail:details});
					var notes_string=JSON.stringify(notes_array);
					var data_json={data_store:'policy_claims',
				 				data:[{index:'id',value:claim_id},
				 					{index:'notes',value:notes_string},
				 					{index:'last_updated',value:last_updated}]};
					update_json(data_json);
				}
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal220_link").click();
}


function modal221_action(t_func,i_func,v_func)
{
	var form=document.getElementById('modal221_form');

	var template_button=form.elements['download'];
	var select_file=form.elements['file'];
	var dummy_button=form.elements['file_dummy'];
	var selected_file=form.elements['selected_file'];
	var import_button=form.elements['save'];

	$(dummy_button).off('click');
	$(dummy_button).on('click',function (e)
	{
		e.preventDefault();
		$(select_file).trigger('click');
	});

	dummy_button.setAttribute('class','btn red-sunglo');

	select_file.value="";
	selected_file.value="";

	$(select_file).off('change');
	$(select_file).on('change',function ()
	{
		var file_name=select_file.value;
		if(file_name!="" && (file_name.indexOf('csv')>-1))
		{
			dummy_button.setAttribute('class','btn green-jungle');
			selected_file.value=file_name;
		}
		else
		{
			dummy_button.setAttribute('class','btn red-sunglo');

			select_file.value="";
			selected_file.value="";
		}
	});

	$(template_button).off("click");
	$(template_button).on("click",function(event)
	{
		t_func();
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		show_progress();
  	show_loader();
		var file=select_file.files[0];
    var fileType = /csv/gi;

    selected_file.value = "Uploading!! Please don't refresh";
    var reader = new FileReader();
    reader.onload = function(e)
    {
    	progress_value=5;
    	var content=reader.result;
    	var data_array=vUtil.csv2array(content);

    	progress_value=10;
      //console.log(data_array);

     	if(typeof v_func!='undefined')
     	{
     		var error_array=v_func(data_array);
     		if(error_array.status=='success')
     		{
     			i_func(data_array);

        	progress_value=15;

        	//console.log(data_array.length);

        	var ajax_complete=setInterval(function()
        	{
        		//console.log(number_active_ajax);
        		if(number_active_ajax===0)
        		{
        			progress_value=15+(1-(localdb_open_requests/(2*data_array.length)))*85;
        		}
        		else if(localdb_open_requests===0)
        		{
        			progress_value=15+(1-((500*(number_active_ajax-1))/(2*data_array.length)))*85;
        		}

        		if(number_active_ajax===0 && localdb_open_requests===0)
        		{
        			hide_progress();
              hide_loader();
        			selected_file.value="Upload complete";
        			$(select_file).val('');
        			clearInterval(ajax_complete);
        		}
        	},1000);
          $(form).find(".close").click();
     		}
     		else
     		{
     			hide_progress();
	   			selected_file.value="";
	    		$(select_file).val('');
	    		$(form).find(".close").click();
	    		modal164_action(error_array);
     		}
     	}
     	else
     	{
       		i_func(data_array);

      		progress_value=15;

        	//console.log(data_array.length);

        	var ajax_complete=setInterval(function()
        	{
        		//console.log(number_active_ajax);
        		if(number_active_ajax===0)
        		{
        			progress_value=15+(1-(localdb_open_requests/(2*data_array.length)))*85;
        		}
        		else if(localdb_open_requests===0)
        		{
        			progress_value=15+(1-((500*(number_active_ajax-1))/(2*data_array.length)))*85;
        		}

        		if(number_active_ajax===0 && localdb_open_requests===0)
        		{
        			hide_progress();
        			selected_file.value="Upload complete";
        			$(select_file).val('');
        			$(form).find(".close").click();
        			clearInterval(ajax_complete);
        		}
        	},1000);
	      }
	    }
	    reader.readAsText(file);
	});
	$("#modal221_link").click();
}

/**
 * @modalNo 222
 * @modal Add new product (cps)
 * @param button
 */
function modal222_action(func)
{
	var form=document.getElementById('modal222_form');

	var fname=form.elements['name'];
	var fmake=form.elements['make'];
	var fdescription=form.elements['desc'];
	var fmanu=form.elements['manu'];
	var fpurchased=form.elements['purchased'];
	var fcost=form.elements['cost'];
	var fsale=form.elements['sale'];

	var make_data={data_store:'product_master',return_column:'make'};
	set_my_filter_json(make_data,fmake);

	set_value_list_json(['yes','no'],fmanu);
	set_value_list_json(['yes','no'],fpurchased);

	$(fcost).parent().parent().hide();
	$(fsale).parent().parent().hide();

	if(fmanu.value=='yes')
	{
		$(fsale).parent().parent().show();
	}
	if(fpurchased.value=='yes')
	{
		$(fcost).parent().parent().show();
	}

	vUtil.onChange(fmanu,function()
	{
		if(fmanu.value=='yes')
		{
			$(fsale).parent().parent().show();
		}
		else
		{
			$(fsale).parent().parent().hide();
		}
	});

	vUtil.onChange(fpurchased,function()
	{
		if(fpurchased.value=='yes')
		{
			$(fcost).parent().parent().show();
		}
		else
		{
			$(fcost).parent().parent().hide();
		}
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_create_access('form39'))
		{
			var name=fname.value;
			var make=fmake.value;
			var description=fdescription.value;

			var manufactured=fmanu.value;
			var purchased=fpurchased.value;

			var tax=form.elements['tax'].value;
			var data_id=get_new_key();
			var cost_price=fcost.value;
      var sale_price=fsale.value;
			var last_updated=get_my_time();
      var indexes=name.split(/[\s,]+/);
      var description_indexes=description.split(/[\s,]+/);
      var make_indexes=make.split(/[\s,]+/);
      var new_indexes=indexes.concat(description_indexes,make_indexes);
      var anew_indexes=vUtil.arrayUnique(new_indexes);
      var index_string=JSON.stringify(anew_indexes);

      var data_json={data_store:'product_master',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'make',value:make},
	 					{index:'description',value:description},
	 					{index:'tax',value:tax},
            {index:'indexes',value:index_string},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Product '+name+' to inventory',link_to:'form39'}};

      create_json(data_json,func);

      var instance_json={data_store:'product_instances',
	 				data:[{index:'id',value:data_id},
	 					{index:'product_name',value:name,uniqueWith:['batch']},
	 					{index:'batch',value:name},
	 					{index:'cost_price',value:cost_price},
	 					{index:'sale_price',value:sale_price},
	 					{index:'last_updated',value:last_updated}]};
			create_json(instance_json);

			var id=get_new_key();
			var attribute_json={data_store:'attributes',
				data:[{index:'id',value:id},
					{index:'name',value:name},
					{index:'type',value:'product'},
					{index:'attribute',value:'manufactured'},
					{index:'value',value:manufactured},
					{index:'last_updated',value:last_updated}]};
			create_json(attribute_json);

			var attribute2_json={data_store:'attributes',
				data:[{index:'id',value:id+1},
					{index:'name',value:name},
					{index:'type',value:'product'},
					{index:'attribute',value:'raw material'},
					{index:'value',value:purchased},
					{index:'last_updated',value:last_updated}]};
			create_json(attribute2_json);
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal222_link").click();
}

/**
 * @modalNo 223
 * @modal Add Inventory (cps)
 * @param button
 */
function modal223_action(production_item_id,item_name,plan_id,plan_name,produced_quantity,scheduled_quantity)
{
	var form=document.getElementById('modal223_form');

	var fname=form.elements['name'];
	var fbatch=form.elements['batch'];
	var fquantity=form.elements['quantity'];

	fname.value=item_name;

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form186'))
		{
			var batch=fbatch.value;
			var quantity=fquantity.value;
			if(vUtil.isBlank(produced_quantity))
			{
				produced_quantity=0;
			}
			var total_produced=parseFloat(fquantity.value)+parseFloat(produced_quantity);
			var id=get_new_key();
			var last_updated=get_my_time();
			var storage=get_session_var('production_floor_store');
			var status='pending';
			if(scheduled_quantity==total_produced)
			{
				status='inventoried';
			}
			var items_json={data_store:'production_plan_items',
					data:[{index:'id',value:production_item_id},
						{index:'status',value:status},
						{index:'produced_quantity',value:total_produced},
						{index:'last_updated',value:last_updated}]};
			update_json(items_json);

			///add to inventory
			var item_created_json={data_store:'inventory_adjust',
					data:[{index:'id',value:id},
						{index:'product_name',value:item_name,uniqueWith:['batch']},
						{index:'batch',value:batch},
						{index:'quantity',value:quantity},
						{index:'source',value:'manufacturing'},
						{index:'source_id',value:production_item_id},
						{index:'storage',value:storage},
						{index:'last_updated',value:last_updated}]};
			create_json(item_created_json);

			var instance_json={data_store:'product_instances',
					data:[{index:'id',value:id},
						{index:'product_name',value:item_name,uniqueWith:['batch']},
						{index:'batch',value:batch},
						{index:'manufacture_date',value:last_updated},
						{index:'last_updated',value:last_updated}]};
			create_json(instance_json);

			var notification_json={data_store:'notifications',
					data:[{index:'id',value:get_new_key()},
						{index:'title',value:'Update pricing details'},
						{index:'notes',value:'A new batch for '+item_name+' has been added. Please update pricing for the same.'},
						{index:'link_to',value:'form183'},
						{index:'data_id',value:id},
						{index:'status',value:'pending'},
						{index:'target_user',value:''},
						{index:'t_generated',value:last_updated},
						{index:'last_updated',value:last_updated}]};
			create_json(notification_json);

			var storage_json={data_store:'area_utilization',
					data:[{index:'id',value:get_new_key()},
						{index:'item_name',value:item_name,uniqueWith:['batch']},
						{index:'batch',value:batch},
						{index:'name',value:storage},
						{index:'last_updated',value:last_updated}]};
			create_json(storage_json);

			element_display('','form256');
			var form256=document.getElementById('form256_master');
			form256.elements['id'].value=production_item_id;
			form256.elements['pplan'].value=plan_name;
			form256.elements['plan_id'].value=plan_id;
			form256.elements['item_name'].value=item_name;
			form256.elements['batch'].value=batch;
			form256.elements['quantity'].value=quantity;

			var pp_filter=form256.elements['pplan'];
			$(pp_filter).parent().off('click');
			$(pp_filter).parent().on('click',function()
			{
				element_display(plan_id,'form186');
			});

			form256_ini();
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal223_link").click();
}

/*
 * @modalNo 224
 * @modal COD Collection
 * @param button
 */
function modal224_action(drs_num,amount,delivery_person)
{
	var form=document.getElementById('modal224_form');

	var foperator=form.elements['operator'];
	var fexpected=form.elements['expected'];
	var falready=form.elements['already'];
	var fupdated=form.elements['updated'];

	foperator.value=get_account_name();
	fexpected.value=amount;

	var already_data={data_store:'cod_collections',return_column:'amount',sum:'yes',
						indexes:[{index:'drs_num',exact:drs_num},
						{index:'from_name',exact:delivery_person}]};
	read_json_single_column(already_data,function(cods)
	{
		if(cods.length>0)
		{
			falready.value=cods[0];
		}
	});

	var collection_record_id=get_new_key();
	var collection_data={data_store:'cod_collections',return_column:'id',
						indexes:[{index:'drs_num',exact:drs_num},
						{index:'from_name',exact:"DRS # "+drs_num}]};
	read_json_single_column(collection_data,function(cods)
	{
		if(cods.length>0)
		{
			collection_record_id=cods[0];
		}
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form353'))
		{
			var operator=foperator.value;
			var additional=fupdated.value;
			var id=get_new_key();
			var last_updated=vTime.unix();

			var drs_data={data_store:'cod_collections',
					warning:'no',
					data:[{index:'id',value:collection_record_id},
						{index:'amount',value:amount},
						{index:'drs_num',value:drs_num},
						{index:'from_name',value:"DRS # "+drs_num},
						{index:'acc_name',value:delivery_person},
						{index:'date',value:last_updated},
						{index:'last_updated',value:last_updated}]};
			create_json(drs_data);
			update_json(drs_data);

			var operator_data={data_store:'cod_collections',
					data:[{index:'id',value:id},
						{index:'amount',value:additional},
						{index:'drs_num',value:drs_num},
						{index:'acc_name',value:operator},
						{index:'from_name',value:delivery_person},
						{index:'date',value:last_updated},
						{index:'last_updated',value:last_updated}]};
			create_json(operator_data);
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal224_link").click();
}

/**
 * @modal Add Receipt
 * @modalNo 225
 */
function modal225_action()
{
	var form=document.getElementById("modal225_form");
	var receipt_filter=form.elements['receipt_id'];
	var date_filter=form.elements['date'];
	var account_filter=form.elements['account'];
	var heading_filter=form.elements['heading'];
	var narration_filter=form.elements['narration'];
	var amount_filter=form.elements['amount'];
	var balance_filter=form.elements['balance'];
	var receipt_record_id="";

	$(date_filter).datepicker();
	date_filter.value=vTime.date();

	var accounts_data={data_store:'customers',return_column:'acc_name'};
	set_my_value_list_json(accounts_data,account_filter);

	$(account_filter).off('blur');
	$(account_filter).off('change');
	$(account_filter).on('blur change',function(e)
	{
		var transactions_data={data_store:'transactions',
						indexes:[{index:'id'},
								{index:'type'},
								{index:'amount'},
								{index:'acc_name',exact:account_filter.value}]};
		read_json_rows('',transactions_data,function(transactions)
		{
			var balance_amount=0;
			transactions.forEach(function(tran)
			{
				if(tran.type=='received')
				{
					balance_amount-=parseFloat(tran.amount);
				}
				else if(tran.type=='given')
				{
					balance_amount+=parseFloat(tran.amount);
				}
			});

			if(balance_amount==0)
			{
				balance_filter.value="Rs. 0";
			}
			else if(balance_amount>0)
			{
				balance_filter.value="Receivable: Rs. "+balance_amount;
			}
			else
			{
				balance_amount=(-balance_amount);
				balance_filter.value="Payable: Rs. "+balance_amount;
			}
		});
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		///////////////////////////////////////
		event.preventDefault();
		var received_amount=amount_filter.value;
		var receipt_date=get_raw_time(date_filter.value);
		var receipt_id=form.elements['receipt_id'].value;
		var receipt_type='received';
		var account_name=account_filter.value;
		var heading=heading_filter.value;
		var narration=narration_filter.value;
		var last_updated=vTime.unix();
		var p_id=get_new_key();

		if(is_create_access('form124') || is_create_access('form243') || is_create_access('form291') || is_create_access('form282'))
		{
			var transaction_json={data_store:'transactions',
				data:[{index:'id',value:p_id},
					{index:'acc_name',value:account_name},
					{index:'type',value:receipt_type},
					{index:'amount',value:received_amount},
					{index:'tax',value:'0'},
					{index:'source_id',value:p_id},
					{index:'source_info',value:receipt_id,uniqueWith:['source']},
					{index:'source',value:'receipt'},
					{index:'source_link',value:'form291'},
					{index:'trans_date',value:receipt_date},
					{index:'heading',value:heading},
					{index:'notes',value:narration},
					{index:'last_updated',value:last_updated}]};

					create_json(transaction_json);

        	var receipt_json={data_store:'receipts',
	 				data:[{index:'id',value:p_id},
	 					{index:'receipt_id',value:receipt_id,unique:'yes'},
	 					{index:'type',value:receipt_type},
	 					{index:'amount',value:received_amount},
						{index:'heading',value:heading},
	 					{index:'narration',value:narration},
	 					{index:'acc_name',value:account_name},
	 					{index:'date',value:receipt_date},
	 					{index:'last_updated',value:last_updated}]};

			create_json(receipt_json);
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal225_link").click();
}

/**
 * @modalNo 226
 * @modal Edit Accounts
 */
function modal226_action(policy_id)
{
	var form=document.getElementById('modal226_form');
	var add_button=form.elements['add_button'];
	var delete_button=form.elements['delete_button'];

	var attribute_label=document.getElementById('modal226_columns');
	attribute_label.innerHTML="";

	$(add_button).off('click');
	$(add_button).on('click',function ()
	{
		var id=get_new_key();
		var content="<div><input placeholder='Account Name' id='modal226_account_"+id+"' class='floatlabel' type='text'></div>";
		$(attribute_label).append(content);
		var staff_data={data_store:'attributes',return_column:'name',
						indexes:[{index:'type',exact:'staff'},
								{index:'attribute',exact:'Designation'},
								{index:'value',exact:'Agent'}]};
		var staff_element=$('#modal226_account_'+id)[0];
		set_my_value_list_json(staff_data,staff_element);
		$(form).formcontrol();
	});

	$(delete_button).off('click');
	$(delete_button).on('click',function ()
	{
		$('#modal226_columns>div:last-child').remove();
	});

	var attributes_data={data_store:'policy_types',count:1,return_column:'accounts',
						indexes:[{index:'id',value:policy_id}]};
	read_json_single_column(attributes_data,function(attributes)
	{
		if(attributes.length>0)
		{
			var values_array=vUtil.jsonParse(attributes[0]);
			var content="";
			values_array.forEach(function(fvalue)
			{
				content+="<div><input placeholder='Account Name' class='floatlabel' type='text' value='"+fvalue+"'></div>";
			});
			$(attribute_label).html(content);
			$(form).formcontrol();
		}
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form351'))
		{
			var last_updated=get_my_time();
			var returns_column_array=[];
			$("#modal226_columns>div").each(function()
			{
				var return_obj=$(this).find('input').val();
				returns_column_array.push(return_obj);
			});

			var return_columns=JSON.stringify(returns_column_array);
			var search_json={data_store:'policy_types',
	 				data:[{index:'id',value:policy_id},
	 					{index:'accounts',value:return_columns},
	 					{index:'last_updated',value:last_updated}]};
			update_json(search_json);
		}
		else
		{
			$("#modal2_link").click();
		}
		$(form).find(".close").click();
	});

	$("#modal226_link").click();
}


function modal227_action(object)
{
	var form=document.getElementById('modal227_form');
	var old_filter=form.elements['old'];
	var new_filter=form.elements['new'];

	var table_data={data_store:'de_duplication_ref',count:1,
						indexes:[{index:'object',exact:object},
								{index:'tablename'},
								{index:'keycolumn'}]};
	read_json_rows('',table_data,function(tables)
	{
		if(tables.length>0)
		var old_data={data_store:tables[0].tablename,return_column:tables[0].keycolumn};
		set_my_value_list_json(old_data,old_filter);

		read_json_single_column(old_data,function(names)
		{
			$(new_filter).off('blur');
			$(new_filter).on('blur',function(event)
			{
				var found = $.inArray($(this).val(), names) > -1;
				if(found)
				{
		            $(this).val('');
		            $(this).attr('placeholder','This name already exists');
		        }
			});
		});
	});

	$(form).off("submit");
	$(form).on("submit",function(event)
	{
		event.preventDefault();
		if(is_update_access('form80'))
		{
			var last_updated=get_my_time();
			show_loader();
			var references_data={data_store:'de_duplication_ref',
								indexes:[{index:'object',exact:object},
										{index:'tablename'},
										{index:'keycolumn'},
										{index:'ref_table'},
										{index:'ref_field'},
										{index:'action'}]};
			read_json_rows('form80',references_data,function(refs_array)
			{
				var request_counter=0;

				var master_table_data={data_store:refs_array[0].tablename,return_column:'id',indexes:[{index:refs_array[0].keycolumn,exact:old_filter.value}]};
				read_json_single_column(master_table_data,function(master_results)
				{
					if(master_results.length>0)
					{
						var search_json={data_store:refs_array[0].tablename,
								data:[{index:'id',value:master_results[0]},
									{index:refs_array[0].keycolumn,value:new_filter.value},
									{index:'last_updated',value:last_updated}]};
						update_json(search_json);
					}
				});
				//////replacing slave values with master values
				refs_array.forEach(function(refs)
				{
					var tablename=refs.ref_table;
					var column=refs.ref_field;
					var action_type=refs.action;

					if(!vUtil.isBlank(tablename))
					{
						var refs_data={data_store:tablename,return_column:'id',indexes:[{index:column,exact:old_filter.value}]};
						read_json_single_column(refs_data,function(ref_results)
						{
							var data_json={data_store:tablename,data:[]};

							var counter=1;

							ref_results.forEach(function(ref_result)
							{
								counter+=1;
								var data_json_array=[{index:'id',value:ref_result},
										{index:column,value:new_filter.value},
										{index:'last_updated',value:last_updated}];

								data_json.data.push(data_json_array);
							});
							request_counter+=1;
							update_batch_json(data_json,function()
							{
								request_counter-=1;
							});
						});
					}
				});

				var request_timer = setInterval(function()
				{
					if(request_counter===0)
					{
						clearInterval(request_timer);
						hide_loader();
					}
				},500);
			});
		}
		else
		{
			$("#modal2_link").click();
		}
		$('#modal227_form').find('.close').click();
	});

	$("#modal227_link").click();
}
