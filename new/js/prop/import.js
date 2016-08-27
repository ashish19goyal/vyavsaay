/**
* @form Update Inventory
* @formNo 1
*/
function form1_import(data_array,import_type)
{
	var data_xml="<product_instances>";
	var counter=1;
	var new_id=parseFloat(vUtil.newKey());
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</product_instances><separator></separator><product_instances>";
		}

		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}
		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<product_name>"+row.product_name+"</product_name>" +
				"<batch>"+row.batch+"</batch>" +
				"<mrp>"+row.mrp+"</mrp>" +
				"<expiry>"+get_raw_time(row.expiry)+"</expiry>" +
				"<manufacture_date>"+get_raw_time(row.manufacture_date)+"</manufacture_date>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		if(row.actual_quantity!="")
		{
			get_inventory(row.product_name,row.batch,function(quantity)
			{
				if(parseFloat(quantity)!==parseFloat(row.actual_quantity))
				{
					var new_quantity=parseFloat(row.actual_quantity)-parseFloat(quantity);
					var adjust_xml="<inventory_adjust>" +
							"<id>"+(new_id+counter)+"</id>" +
							"<product_name>"+row.product_name+"</product_name>" +
							"<batch>"+row.batch+"</batch>" +
							"<quantity>"+new_quantity+"</quantity>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</inventory_adjust>";
					create_simple_no_warning(adjust_xml);
				}
			});
		}
	});

	data_xml+="</product_instances>";

	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
}


/**
* @form Manage Assets
* @formNo 5
*/
function form5_import(data_array,import_type)
{
	var data_xml="<assets>";
	var counter=1;
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</assets><separator></separator><assets>";
		}

		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<type>"+row.type+"</type>" +
				"<description>"+row.description+"</description>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</assets>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form create service bills
* @formNo 10
*/
function form10_import(data_array,import_type)
{
	var data_xml="<bill_items>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</bill_items><separator></separator><bill_items>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<bill_id>"+row.bill_id+"</bill_id>" +
				"<item_name>"+row.item_name+"</item_name>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<unit_price>"+row.unit_price+"</unit_price>" +
				"<mrp>"+row.mrp+"</mrp>" +
				"<amount>"+row.amount+"</amount>" +
				"<total>"+row.total+"</total>" +
				"<discount>"+row.discount+"</discount>" +
				"<offer>"+row.offer+"</offer>" +
				"<type>"+row.type+"</type>" +
				"<batch>"+row.batch+"</batch>" +
				"<notes>"+row.notes+"</notes>" +
				"<staff>"+row.staff+"</staff>" +
				"<tax>"+row.tax+"</tax>" +
				"<free_with>"+row.free_with+"</free_with>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</bill_items>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
		}
		else
		{
			local_create_batch(data_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}
	}

};


/**
* @form Manage Payments
* @formNo 11
*/
function form11_import(data_array,import_type)
{
	var data_xml="<payments>";
	var transaction_xml="<transactions>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</payments><separator></separator><payments>";
			transaction_xml+="</transactions><separator></separator><transactions>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}


		var receiver=row.acc_name;
		var giver="master";
		if(row.type=='received')
		{
			receiver='master';
			giver=row.acc_name;
		}
		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<type>"+row.type+"</type>" +
				"<total_amount>"+row.total_amount+"</total_amount>" +
				"<paid_amount>"+row.paid_amount+"</paid_amount>" +
				"<acc_name>"+row.acc_name+"</acc_name>" +
				"<status>"+row.status+"</status>" +
				"<date>"+get_raw_time(row.date)+"</date>" +
				"<due_date>"+get_raw_time(row.due_date)+"</due_date>" +
				"<mode>"+row.mode+"</mode>" +
				"<source>"+row.source+"</source>" +
				"<source_id>"+row.source_id+"</source_id>" +
				"<source_info>"+row.source_info+"</source_info>" +
				"<transaction_id>"+row.id+"</transaction_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		transaction_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<trans_date>"+get_raw_time(row.date)+"</trans_date>" +
				"<amount>"+row.total_amount+"</amount>" +
				"<receiver>"+receiver+"</receiver>" +
				"<giver>"+giver+"</giver>" +
				"<tax>0</tax>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</payments>";
	transaction_xml+="</transactions>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
			server_create_batch(transaction_xml);
		}
		else
		{
			local_create_batch(data_xml);
			local_create_batch(transaction_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
			server_update_batch(transaction_xml);
		}
		else
		{
			local_update_batch(data_xml);
			local_update_batch(transaction_xml);
		}
	}
};

/**
* @form Create Product bills
* @formNo 12
*/
function form12_import(data_array,import_type)
{
	var data_xml="<bill_items>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</bill_items><separator></separator><bill_items>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<bill_id>"+row.bill_id+"</bill_id>" +
				"<item_name>"+row.item_name+"</item_name>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<unit_price>"+row.unit_price+"</unit_price>" +
				"<mrp>"+row.mrp+"</mrp>" +
				"<amount>"+row.amount+"</amount>" +
				"<total>"+row.total+"</total>" +
				"<discount>"+row.discount+"</discount>" +
				"<offer>"+row.offer+"</offer>" +
				"<type>"+row.type+"</type>" +
				"<batch>"+row.batch+"</batch>" +
				"<notes>"+row.notes+"</notes>" +
				"<staff>"+row.staff+"</staff>" +
				"<tax>"+row.tax+"</tax>" +
				"<free_with>"+row.free_with+"</free_with>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</bill_items>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
		}
		else
		{
			local_create_batch(data_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}
	}
};


/**
* @form Manage Tasks
* @formNo 14
*/
function form14_import(data_array,import_type)
{
	var data_xml="<task_instances>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</task_instances><separator></separator><task_instances>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}


		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<description>"+row.description+"</description>" +
				"<assignee>"+row.assignee+"</assignee>" +
				"<status>"+row.status+"</status>" +
				"<t_due>"+get_raw_time(row.t_due)+"</t_due>" +
				"<t_initiated>"+get_raw_time(row.t_initiated)+"</t_initiated>" +
				"<tasks_hours>"+row.task_hours+"</task_hours>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</task_instances>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
		}
		else
		{
			local_create_batch(data_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}
	}
};


/**
* @form Manage Customer Returns
* @formNo 16
*/
function form16_import(data_array,import_type)
{
	var data_xml="<customer_returns>";
	var transaction_xml="<transactions>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</customer_returns><separator></separator><customer_returns>";
			transaction_xml+="</transactions><separator></separator><transactions>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}


		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<order_num>"+row.order_num+"</order_num>" +
				"<order_id>"+row.order_id+"</order_id>" +
				"<channel>"+row.channel+"</channel>" +
				"<customer>"+row.customer+"</customer>" +
				"<return_date>"+get_raw_time(row.return_date)+"</return_date>" +
				"<total>"+row.total+"</total>" +
				"<status>"+row.status+"</status>" +
				"<tax>"+row.tax+"</tax>" +
				"<transaction_id>"+row.transaction_id+"</transaction_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		transaction_xml+="<row>" +
				"<id>"+row.transaction_id+"</id>" +
				"<trans_date>"+get_raw_time(row.return_date)+"</trans_date>" +
				"<amount>"+row.total+"</amount>" +
				"<receiver>master</receiver>" +
				"<giver>"+row.customer+"</giver>" +
				"<tax>-"+row.tax+"</tax>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";

	});

	data_xml+="</customer_returns>";
	transaction_xml+="</transactions>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
			server_create_batch(transaction_xml);
		}
		else
		{
			local_create_batch(data_xml);
			local_create_batch(transaction_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
			server_update_batch(transaction_xml);
		}
		else
		{
			local_update_batch(data_xml);
			local_update_batch(transaction_xml);
		}
	}
};


/**
* @form create purchase order
* @formNo 24
*/
function form24_import(data_array,import_type)
{
	var data_xml="<purchase_order_items>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</purchase_order_items><separator></separator><purchase_order_items>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<item_name>"+row.item_name+"</item_name>" +
				"<item_desc>"+row.item_desc+"</item_desc>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<make>"+row.make+"</make>" +
				"<supplier_sku>"+row.supplier_sku+"</supplier_sku>" +
				"<order_id>"+row.order_id+"</order_id>" +
				"<price>"+row.price+"</price>" +
				"<mrp>"+row.mrp+"</mrp>"+
				"<amount>"+row.amount+"</amount>"+
				"<tax>"+row.tax+"</tax>"+
				"<total>"+row.total+"</total>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="<purchase_order_items>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Manage Offers
* @formNo 35
*/
function form35_import(data_array,import_type)
{
	var data_xml="<offers>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</offers><separator></separator><offers>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<offer_name unique='yes'>"+row.offer_name+"</offer_name>" +
				"<offer_type>"+row.offer_type+"</offer_type>" +
				"<end_date>"+row.end_date+"</end_date>" +
				"<offer_detail>"+row.offer_detail+"</offer_detail>" +
				"<status>"+row.status+"</status>" +
				"<product_name>"+row.product_name+"</product_name>" +
				"<batch>"+row.batch+"</batch>" +
				"<service>"+row.service+"</service>" +
				"<criteria_type>"+row.criteria_type+"</criteria_type>" +
				"<criteria_amount>"+row.criteria_amount+"</criteria_amount>" +
				"<criteria_quantity>"+row.criteria_quantity+"</criteria_quantity>" +
				"<result_type>"+row.result_type+"</result_type>" +
				"<discount_percent>"+row.discount_percent+"</discount_percent>" +
				"<discount_amount>"+row.discount_amount+"</discount_amount>" +
				"<quantity_add_percent>"+row.quantity_add_percent+"</quantity_add_percent>" +
				"<quantity_add_amount>"+row.quantity_add_amount+"</quantity_add_amount>" +
				"<free_product_name>"+row.free_product_name+"</free_product_name>" +
				"<free_product_quantity>"+row.free_product_quantity+"</free_product_quantity>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</offers>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Manage Purchase orders
* @formNo 43
*/
function form43_import(data_array,import_type)
{
	var data_xml="<purchase_orders>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</purchase_orders><separator></separator><purchase_orders>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<supplier>"+row.supplier+"</supplier>" +
				"<order_date>"+get_raw_time(row.order_date)+"</order_date>" +
				"<status>"+row.status+"</status>" +
				"<order_num>"+row.order_num+"</order_num>" +
				"<amount>"+row.amount+"</amount>" +
				"<tax>"+row.tax+"</tax>" +
				"<total>"+row.total+"</total>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</purchase_orders>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Service pre-requisites
* @formNo 58
*/
function form58_import(data_array,import_type)
{
	var data_json={data_store:'pre_requisites',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'pre requisites for services',link_to:'form58'}};

	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		var data_json_array=[{index:'id',value:row.id},
						{index:'name',value:row.name,uniqueWith:['type']},
						{index:'type',value:row.type},
						{index:'requisite_type',value:row.requisite_type},
						{index:'requisite_name',value:row.requisite_name},
						{index:'quantity',value:row.quantity},
						{index:'last_updated',value:last_updated}];
		data_json.data.push(data_json_array);
	});

	if(import_type=='create_new')
	{
		create_batch_json(data_json);
	}
	else
	{
		update_batch_json(data_json);
	}
};

/**
* @form product pre-requisites
* @formNo 59
*/
function form59_import(data_array,import_type)
{
	var data_xml="<pre_requisites>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</pre_requisites><separator></separator><pre_requisites>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<type>"+row.type+"</type>" +
				"<requisite_type>"+row.requisite_type+"</requisite_type>" +
				"<requisite_name>"+row.requisite_name+"</requisite_name>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";

	});
	data_xml+="</pre_requisites>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Service Attributes
* @formNo 61
*/
function form61_import(data_array,import_type)
{
	var data_xml="<attributes>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</attributes><separator></separator><attributes>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<type>service</type>" +
				"<attribute>"+row.attribute+"</attribute>" +
				"<value>"+row.value+"</value>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</attributes>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Product reviews
* @formNo 62
*/
function form62_import(data_array,import_type)
{
	var data_xml="<reviews>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</reviews><separator></separator><reviews>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<reviewer>"+row.reviewer+"</reviewer>" +
				"<detail>"+row.detail+"</detail>" +
				"<rating>"+row.rating+"</rating>" +
				"<type>"+row.type+"</type>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</reviews>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Service reviews
* @formNo 63
*/
function form63_import(data_array,import_type)
{
	var data_xml="<reviews>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</reviews><separator></separator><reviews>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<reviewer>"+row.reviewer+"</reviewer>" +
				"<detail>"+row.detail+"</detail>" +
				"<rating>"+row.rating+"</rating>" +
				"<type>"+row.type+"</type>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</reviews>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Service Cross sells
* @formNo 64
*/
function form64_import(data_array,import_type)
{
	var data_xml="<cross_sells>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</cross_sells><separator></separator><cross_sells>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<type>"+row.type+"</type>" +
				"<cross_name>"+row.cross_name+"</cross_name>" +
				"<cross_type>"+row.cross_type+"</cross_type>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</cross_sells>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Product Cross sells
* @formNo 66
*/
function form66_import(data_array,import_type)
{
	var data_xml="<cross_sells>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</cross_sells><separator></separator><cross_sells>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<type>"+row.type+"</type>" +
				"<cross_name>"+row.cross_name+"</cross_name>" +
				"<cross_type>"+row.cross_type+"</cross_type>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</cross_sells>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Create sale order
* @formNo 69
*/
function form69_import(data_array,import_type)
{
	var data_xml="<sale_order_items>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</sale_order_items><separator></separator><sale_order_items>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<order_id>"+row.order_id+"</order_id>" +
				"<item_name>"+row.item_name+"</item_name>" +
				"<item_desc>"+row.item_desc+"</item_desc>" +
				"<channel_sku>"+row.channel_sku+"</channel_sku>" +
				"<vendor_sku>"+row.vendor_sku+"</vendor_sku>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<mrp>"+row.mrp+"</mrp>" +
				"<price>"+row.price+"</price>" +
				"<amount>"+row.amount+"</amount>" +
				"<tax>"+row.tax+"</tax>" +
				"<freight>"+row.freight+"</freight>" +
				"<total>"+row.total+"</total>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</sale_order_items>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Manage sale order
* @formNo 70
*/
function form70_import(data_array,import_type)
{
	var data_xml="<sale_orders>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</sale_orders><separator></separator><sale_orders>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<customer_name>"+row.customer_name+"</customer_name>" +
				"<order_date>"+get_raw_time(row.order_date)+"</order_date>" +
				"<type>"+row.type+"</type>" +
				"<status>"+row.status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</sale_orders>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Manage Task Types
* @formNo 79
*/
function form79_import(data_array,import_type)
{
	var data_xml="<task_type>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</task_type><separator></separator><task_type>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<description>"+row.description+"</description>" +
				"<est_hours>"+row.est_hours+"</est_hours>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</task_type>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Sale leads
* @formNo 81
*/
function form81_import(data_array,import_type)
{
	var data_xml="<sale_leads>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</sale_leads><separator></separator><sale_leads>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<customer>"+row.customer+"</customer>" +
				"<detail>"+row.detail+"</detail>" +
				"<due_date>"+row.due_date+"</due_date>" +
				"<identified_by>"+row.identified_by+"</identified_by>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</sale_leads>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
}

/**
* @form scan items
* @formNo 82
*/
function form82_import(data_array,import_type)
{
	var data_xml="<bill_items>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</bill_items><separator></separator><bill_items>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<bill_id>"+row.bill_id+"</bill_id>" +
				"<item_name>"+row.item_name+"</item_name>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<unit_price>"+row.unit_price+"</unit_price>" +
				"<mrp>"+row.mrp+"</mrp>" +
				"<amount>"+row.amount+"</amount>" +
				"<total>"+row.total+"</total>" +
				"<discount>"+row.discount+"</discount>" +
				"<offer>"+row.offer+"</offer>" +
				"<type>"+row.type+"</type>" +
				"<batch>"+row.batch+"</batch>" +
				"<notes>"+row.notes+"</notes>" +
				"<staff>"+row.staff+"</staff>" +
				"<tax>"+row.tax+"</tax>" +
				"<free_with>"+row.free_with+"</free_with>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</bill_items>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Manage Subscriptions
* @formNo 84
*/
function form84_import(data_array,import_type)
{
	var data_xml="<service_subscriptions>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</service_subscriptions><separator></separator><service_subscriptions>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<customer>"+row.customer+"</customer>" +
				"<service>"+row.service+"</service>" +
				"<status>"+row.status+"</status>" +
				"<notes>"+row.notes+"</notes>" +
				"<last_bill_date>"+get_raw_time(row.last_bill_date)+"</last_bill_date>" +
				"<next_due_date>"+get_raw_time(row.next_due_date)+"</next_due_date>" +
				"<last_bill_id>"+row.last_bill_id+"</last_bill_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</service_subscriptions>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Manage Products
* @formNo 87
*/
function form87_import(data_array,import_type)
{
	var data_xml="<product_master>";
	var counter=1;
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</product_master><separator></separator><product_master>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name unique='yes'>"+row.name+"</name>" +
				"<make>"+row.make+"</make>" +
				"<description>"+row.description+"</description>" +
				"<tax>"+row.tax+"</tax>" +
				"<bar_code>"+row.bar_code+"</bar_code>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</product_master>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Manufacturing Schedule
* @formNo 88
*/
function form88_import(data_array,import_type)
{
	var data_xml="<manufacturing_schedule>";
	var counter=1;
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</manufacturing_schedule><separator></separator><manufacturing_schedule>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<product unique='yes'>"+row.product+"</product>" +
				"<process_notes>"+row.process_notes+"</process_notes>" +
				"<status>"+row.status+"</status>" +
				"<schedule>"+get_raw_time(row.schedule)+"</schedule>" +
				"<iteration_notes>"+row.iteration_notes+"</iteration_notes>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</manufacturing_schedule>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Create Bills(multiple register)
* @formNo 91
*/
function form91_import(data_array,import_type)
{
	var data_xml="<bill_items>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</bill_items><separator></separator><bill_items>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<bill_id>"+row.bill_id+"</bill_id>" +
				"<item_name>"+row.item_name+"</item_name>" +
				"<item_desc>"+row.item_desc+"</item_desc>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<unit_price>"+row.unit_price+"</unit_price>" +
				"<mrp>"+row.mrp+"</mrp>" +
				"<amount>"+row.amount+"</amount>" +
				"<total>"+row.total+"</total>" +
				"<freight>"+row.freight+"</freight>" +
				"<batch>"+row.batch+"</batch>" +
				"<tax>"+row.tax+"</tax>" +
				"<tax_rate>"+row.tax_rate+"</tax_rate>" +
				"<vat>"+row.vat+"</vat>" +
				"<cst>"+row.cst+"</cst>" +
				"<storage>"+row.storage+"</storage>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</bill_items>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Manage Loans
* @formNo 93
*/
function form93_import(data_array,import_type)
{
	var data_xml="<loans>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</loans><separator></separator><loans>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<type>"+row.type+"</type>" +
				"<account>"+row.account+"</account>" +
				"<date_initiated>"+get_raw_time(row.date_initiated)+"</date_initiated>" +
				"<loan_amount>"+row.loan_amount+"</loan_amount>" +
				"<repayment_method>"+row.repayment_method+"</repayment_method>" +
				"<interest_paid>"+row.interest_paid+"</interest_paid>" +
				"<interest_rate>"+row.interest_rate+"</interest_rate>" +
				"<interest_period>"+row.interest_period+"</interest_period>" +
				"<next_interest_date>"+get_raw_time(row.next_interest_date)+"</next_interest_date>" +
				"<interest_type>"+row.interest_type+"</interest_type>" +
				"<emi>"+row.emi+"</emi>" +
				"<emi_period>"+row.emi_period+"</emi_period>" +
				"<next_emi_date>"+get_raw_time(row.next_emi_date)+"</next_emi_date>" +
				"<pending_emi>"+row.pending_emi+"</pending_emi>" +
				"<status>"+row.status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</loans>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Manage Projects
* @formNo 101
*/
function form101_import(data_array,import_type)
{
	var data_xml="<projects>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</projects><separator></separator><projects>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name unique='yes'>"+row.name+"</name>" +
				"<start_date>"+get_raw_time(row.start_date)+"</start_date>" +
				"<status>"+row.status+"</status>" +
				"<details>"+row.details+"</details>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</projects>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Project Team
* @formNo 102
*/
function form102_import(data_array,import_type)
{
	var data_xml="<project_team>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</project_team><separator></separator><project_team>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<project_id>"+row.project_id+"</project_id>" +
				"<member>"+row.member+"</member>" +
				"<notes>"+row.notes+"</notes>" +
				"<role>"+row.role+"</role>" +
				"<status>"+row.status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</project_team>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Project Phases
* @formNo 103
*/
function form103_import(data_array,import_type)
{
	var data_xml="<project_phases>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</project_phases><separator></separator><project_phases>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<project_id>"+row.project_id+"</project_id>" +
				"<phase_name>"+row.phase_name+"</phase_name>" +
				"<details>"+row.details+"</details>" +
				"<start_date>"+get_raw_time(row.start_date)+"</start_date>" +
				"<due_date>"+get_raw_time(row.due_date)+"</due_date>" +
				"<status>"+row.status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</project_phases>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Manage sale order (multi-register)
* @formNo 108
*/
function form108_import(data_array,import_type)
{
	var data_xml="<sale_orders>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</sale_orders><separator></separator><sale_orders>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<customer_name>"+row.customer_name+"</customer_name>" +
				"<order_date>"+get_raw_time(row.order_date)+"</order_date>" +
				"<order_num>"+row.order_num+"</order_num>" +
				"<channel>"+row.channel+"</channel>"+
				"<status>"+row.status+"</status>" +
				"<amount>"+row.amount+"</amount>" +
				"<tax>"+row.tax+"</tax>" +
				"<freight>"+row.freight+"</freight>" +
				"<total>"+row.total+"</total>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</sale_orders>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Asset Attributes
* @formNo 109
*/
function form109_import(data_array,import_type)
{
	var data_xml="<attributes>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</attributes><separator></separator><attributes>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<type>asset</type>" +
				"<attribute>"+row.attribute+"</attribute>" +
				"<value>"+row.value+"</value>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</attributes>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Add sale challans
* @formNo 112
*/
function form112_import(data_array,import_type)
{
	var data_xml="<unbilled_sale_items>";
	var counter=1;
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</unbilled_sale_items><separator></separator><unbilled_sale_items>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<customer>"+row.customer+"</customer>" +
				"<item_name>"+row.item_name+"</item_name>" +
				"<item_desc>"+row.item_desc+"</item_desc>" +
				"<batch>"+row.batch+"</batch>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<mrp>"+row.mrp+"</mrp>" +
				"<unit_price>"+row.unit_price+"</unit_price>" +
				"<amount>"+row.amount+"</amount>" +
				"<tax>"+row.tax+"</tax>" +
				"<total>"+row.total+"</total>" +
				"<storage>"+row.storage+"</storage>" +
				"<bill_status>"+row.bill_status+"</bill_status>" +
				"<picked_status>"+row.picked_status+"</picked_status>" +
				"<sale_date>"+get_raw_time(row.sale_date)+"</sale_date>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</unbilled_sale_items>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Manage sale challans
* @formNo 113
*/
function form113_import(data_array,import_type)
{
	var data_xml="<unbilled_sale_items>";
	var counter=1;
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</unbilled_sale_items><separator></separator><unbilled_sale_items>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<customer>"+row.customer+"</customer>" +
				"<item_name>"+row.item_name+"</item_name>" +
				"<item_desc>"+row.item_desc+"</item_desc>" +
				"<batch>"+row.batch+"</batch>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<mrp>"+row.mrp+"</mrp>" +
				"<unit_price>"+row.unit_price+"</unit_price>" +
				"<amount>"+row.amount+"</amount>" +
				"<tax>"+row.tax+"</tax>" +
				"<total>"+row.total+"</total>" +
				"<storage>"+row.storage+"</storage>" +
				"<bill_status>"+row.bill_status+"</bill_status>" +
				"<picked_status>"+row.picked_status+"</picked_status>" +
				"<sale_date>"+get_raw_time(row.sale_date)+"</sale_date>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</unbilled_sale_items>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Add unbilled purchase items
* @formNo 114
*/
function form114_import(data_array,import_type)
{
	var data_xml="<unbilled_purchase_items>";
	var counter=1;
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</unbilled_purchase_items><separator></separator><unbilled_purchase_items>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<supplier>"+row.supplier+"</supplier>" +
				"<item_name>"+row.item_name+"</item_name>" +
				"<item_desc>"+row.item_desc+"</item_desc>" +
				"<batch>"+row.batch+"</batch>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<unit_price>"+row.unit_price+"</unit_price>" +
				"<amount>"+row.amount+"</amount>" +
				"<tax>"+row.tax+"</tax>" +
				"<total>"+row.total+"</total>" +
				"<storage>"+row.storage+"</storage>" +
				"<put_away_status>"+row.put_away_status+"</put_away_status>" +
				"<bill_status>"+row.bill_status+"</bill_status>" +
				"<purchase_date>"+get_raw_time(row.purchase_date)+"</purchase_date>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</unbilled_purchase_items>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Manage unbilled purchase items
* @formNo 115
*/
function form115_import(data_array,import_type)
{
	var data_xml="<unbilled_purchase_items>";
	var counter=1;
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</unbilled_purchase_items><separator></separator><unbilled_purchase_items>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<supplier>"+row.supplier+"</supplier>" +
				"<item_name>"+row.item_name+"</item_name>" +
				"<item_desc>"+row.item_desc+"</item_desc>" +
				"<batch>"+row.batch+"</batch>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<unit_price>"+row.unit_price+"</unit_price>" +
				"<amount>"+row.amount+"</amount>" +
				"<tax>"+row.tax+"</tax>" +
				"<total>"+row.total+"</total>" +
				"<storage>"+row.storage+"</storage>" +
				"<put_away_status>"+row.put_away_status+"</put_away_status>" +
				"<bill_status>"+row.bill_status+"</bill_status>" +
				"<purchase_date>"+get_raw_time(row.purchase_date)+"</purchase_date>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</unbilled_purchase_items>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Manage Loyalty Programs
* @formNo 116
*/
function form116_import(data_array,import_type)
{
	var data_xml="<loyalty_programs>";
	var counter=1;
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</loyalty_programs><separator></separator><loyalty_programs>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<type>"+row.type+"</type>" +
				"<tier>"+row.tier+"</tier>" +
				"<tier_criteria_lower>"+row.tier_criteria_lower+"</tier_criteria_lower>" +
				"<tier_criteria_upper>"+row.tier_criteria_upper+"</tier_criteria_upper>" +
				"<redemption_criteria>"+row.redemption_criteria+"</redemption_criteria>" +
				"<points_addition>"+row.points_addition+"</points_addition>" +
				"<discount>"+row.discount+"<discount>" +
				"<cashback>"+row.cashback+"</cashback>" +
				"<reward_product>"+row.reward_product+"</reward_product>" +
				"<status>"+row.status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</loyalty_programs>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Create Bills(loyalty)
* @formNo 118
*/
function form118_import(data_array,import_type)
{
	var data_xml="<bill_items>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</bill_items><separator></separator><bill_items>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<bill_id>"+row.bill_id+"</bill_id>" +
				"<item_name>"+row.item_name+"</item_name>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<p_quantity>"+row.p_quantity+"</p_quantity>" +
				"<f_quantity>"+row.f_quantity+"</f_quantity>" +
				"<unit_price>"+row.unit_price+"</unit_price>" +
				"<mrp>"+row.mrp+"</mrp>" +
				"<amount>"+row.amount+"</amount>" +
				"<total>"+row.total+"</total>" +
				"<discount>"+row.discount+"</discount>" +
				"<offer>"+row.offer+"</offer>" +
				"<type>"+row.type+"</type>" +
				"<batch>"+row.batch+"</batch>" +
				"<notes>"+row.notes+"</notes>" +
				"<staff>"+row.staff+"</staff>" +
				"<tax>"+row.tax+"</tax>" +
				"<free_with>"+row.free_with+"</free_with>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</bill_items>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Create Bills(multiple register, unbilled items)
* @formNo 119
*/
function form119_import(data_array,import_type)
{
	var data_xml="<bill_items>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</bill_items><separator></separator><bill_items>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<bill_id>"+row.bill_id+"</bill_id>" +
				"<item_name>"+row.item_name+"</item_name>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<p_quantity>"+row.p_quantity+"</p_quantity>" +
				"<f_quantity>"+row.f_quantity+"</f_quantity>" +
				"<unit_price>"+row.unit_price+"</unit_price>" +
				"<mrp>"+row.mrp+"</mrp>" +
				"<amount>"+row.amount+"</amount>" +
				"<total>"+row.total+"</total>" +
				"<discount>"+row.discount+"</discount>" +
				"<offer>"+row.offer+"</offer>" +
				"<type>"+row.type+"</type>" +
				"<batch>"+row.batch+"</batch>" +
				"<notes>"+row.notes+"</notes>" +
				"<staff>"+row.staff+"</staff>" +
				"<tax>"+row.tax+"</tax>" +
				"<free_with>"+row.free_with+"</free_with>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</bill_items>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Manage Loyalty customers
* @formNo 120
*/
function form120_import(data_array,import_type)
{
	var data_xml="<loyalty_customers>";
	var counter=1;
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</loyalty_customers><separator></separator><loyalty_customers>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<program_name>"+row.program_name+"</program_name>" +
				"<customer>"+row.customer+"</customer>" +
				"<tier>"+row.tier+"</tier>" +
				"<status>"+row.status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</loyalty_customers>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Adjust Loyalty Points
* @formNo 121
*/
function form121_import(data_array,import_type)
{
	var data_xml="<loyalty_points>";
	var counter=1;
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</loyalty_points><separator></separator><loyalty_points>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<program_name>"+row.program_name+"</program_name>" +
				"<customer>"+row.customer+"</customer>" +
				"<points>"+row.points+"</points>" +
				"<date>"+get_raw_time(row.date)+"</date>" +
				"<source>"+row.source+"</source>" +
				"<source_id>"+row.source_id+"</source_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</loyalty_points>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Enter Supplier bill (unbilled items)
* @formNo 122
*/
function form122_import(data_array,import_type)
{
	var data_xml="<supplier_bill_items>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</supplier_bill_items><separator></separator><supplier_bill_items>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<product_name>"+row.product_name+"</product_name>" +
				"<item_desc>"+row.item_desc+"</item_desc>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<batch>"+row.batch+"</batch>" +
				"<bill_id>"+row.bill_id+"</bill_id>" +
				"<mrp>"+row.mrp+"</mrp>" +
				"<unit_price>"+row.unit_price+"</unit_price>" +
				"<amount>"+row.amount+"</amount>" +
				"<tax>"+row.tax+"</tax>" +
				"<cst>"+row.cst+"</cst>" +
				"<total>"+row.total+"</total>" +
				"<qc>"+row.qc+"</qc>" +
				"<qc_comments>"+row.qc_comments+"</qc_comments>" +
				"<storage>"+row.storage+"</storage>" +
				"<put_away_status>"+row.put_away_status+"</put_away_status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</supplier_bill_items>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Receipts
* @formNo 124
*/
function form124_import(data_array,import_type)
{
	var data_xml="<receipts>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</receipts><separator></separator><receipts>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<receipt_id>"+row.receipt_id+"</receipt_id>" +
				"<payment_id>"+row.payment_id+"</payment_id>" +
				"<type>"+row.type+"</type>" +
				"<amount>"+row.amount+"</amount>" +
				"<acc_name>"+row.acc_name+"</acc_name>" +
				"<date>"+get_raw_time(row.date)+"</date>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</receipts>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Customer Accounts
* @formNo 125
*/
function form125_import(data_array,import_type)
{
	var data_xml="<accounts>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</accounts><separator></separator><accounts>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<username>"+row.username+"</username>" +
				"<acc_name>"+row.acc_name+"</acc_name>" +
				"<type>"+row.type+"</type>" +
				"<description>"+row.description+"</description>" +
				"<status>"+row.status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</accounts>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Customer Profiling
* @formNo 139
*/
function form139_import(data_array,import_type)
{
	var data_xml="<assets>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</assets><separator></separator><assets>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<type>"+row.type+"</type>" +
				"<owner_type>"+row.owner_type+"</owner_type>" +
				"<description>"+row.description+"</description>" +
				"<location>"+row.location+"</location>" +
				"<area>"+row.area+"</area>"+
				"<floors>"+row.floors+"</floors>"+
				"<notes>"+row.notes+"</notes>"+
				"<owner>"+row.owner+"</owner>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</assets>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Supplier Profiling
* @formNo 140
*/
function form140_import(data_array,import_type)
{
	var data_xml="<assets>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</assets><separator></separator><assets>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<type>"+row.type+"</type>" +
				"<owner_type>"+row.owner_type+"</owner_type>" +
				"<description>"+row.description+"</description>" +
				"<location>"+row.location+"</location>" +
				"<area>"+row.area+"</area>"+
				"<floors>"+row.floors+"</floors>"+
				"<notes>"+row.notes+"</notes>"+
				"<owner>"+row.owner+"</owner>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</assets>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Manufacturing
* @formNo 146
*/
function form146_import(data_array,import_type)
{
	var data_xml="<manufacturing_schedule>";
	var counter=1;
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</manufacturing_schedule><separator></separator><manufacturing_schedule>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<product>"+row.product+"</product>" +
				"<batch>"+row.batch+"</batch>"+
				"<quantity>"+row.quantity+"</quantity>"+
				"<schedule>"+get_raw_time(row.schedule)+"</schedule>" +
				"<status>"+row.status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</manufacturing_schedule>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
		}
		else
		{
			local_create_batch(data_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}
	}
};


/**
* @form Create Bill (DLM)
* @formNo 154
*/
function form154_import(data_array,import_type)
{
	var data_xml="<bill_items>";
	var counter=1;
	var new_id=parseFloat(vUtil.newKey());
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</bill_items><separator></separator><bill_items>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<item_name>"+row.item_name+"</item_name>" +
				"<batch>"+row.item_name+"</batch>" +
				"<bill_id>"+row.bill_id+"</bill_id>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<unit>"+row.unit+"</unit>" +
				"<unit_price>"+row.unit_price+"</unit_price>" +
				"<amount>"+row.amount+"</amount>" +
				"<storage>"+row.storage+"</storage>" +
				"<hired>"+row.hired+"</hired>" +
				"<fresh>"+row.fresh+"</fresh>" +
				"<from_date>"+get_raw_time(row.from_date)+"</from_date>" +
				"<to_date>"+get_raw_time(row.to_date)+"</to_date>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</bill_items>";

	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
		}
		else
		{
			local_create_batch(data_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}
	}
}

/**
* @form Update Inventory (DLM)
* @formNo 155
*/
function form155_import(data_array,import_type)
{
	var data_xml="<product_instances>";
	var counter=1;
	var new_id=parseFloat(vUtil.newKey());
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</product_instances><separator></separator><product_instances>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<product_name>"+row.product_name+"</product_name>" +
				"<batch>"+row.product_name+"</batch>" +
				"<cost_price>"+row.cost_price+"</cost_price>" +
				"<sale_price>"+row.sale_price+"</sale_price>" +
				"<manufacture_date>"+get_raw_time(row.manufacture_date)+"</manufacture_date>" +
				"<mrp>"+row.mrp+"</mrp>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		if(row.actual_quantity!="")
		{
			get_inventory(row.product_name,row.batch,function(quantity)
			{
				if(parseFloat(quantity)!==parseFloat(row.actual_quantity))
				{
					var new_quantity=parseFloat(row.actual_quantity)-parseFloat(quantity);
					var adjust_xml="<inventory_adjust>" +
							"<id>"+(parseFloat(vUtil.newKey())+Math.round(Math.random()*100))+"</id>" +
							"<product_name>"+row.product_name+"</product_name>" +
							"<batch>"+row.product_name+"</batch>" +
							"<quantity>"+new_quantity+"</quantity>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</inventory_adjust>";

					create_simple_no_warning(adjust_xml);

				}
			});
		}
	});

	data_xml+="</product_instances>";

	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
}

/**
* @form Store Placement (DLM)
* @formNo 156
*/
function form156_import(data_array,import_type)
{
	var data_xml="<area_utilization>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</area_utilization><separator></separator><area_utilization>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<item_name>"+row.item_name+"</item_name>" +
				"<batch>"+row.item_name+"</batch>" +
				"<name>"+row.name+"</name>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</area_utilization>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
		}
		else
		{
			local_create_batch(data_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}
	}
};

/**
* @form Store Movement (DLM)
* @formNo 157
*/
function form157_import(data_array,import_type)
{
	var data_xml="<store_movement>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</store_movement><separator></separator><store_movement>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}


		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<item_name>"+row.item_name+"</item_name>" +
				"<batch>"+row.item_name+"</batch>"+
				"<quantity>"+row.quantity+"</quantity>" +
				"<source>"+row.source+"</source>"+
				"<target>"+row.target+"</target>"+
				"<status>"+row.status+"</status>" +
				"<dispatcher>"+row.dispatcher+"</dispatcher>" +
				"<receiver>"+row.receiver+"</receiver>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</store_movement>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
		}
		else
		{
			local_create_batch(data_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}
	}
};

/**
* @form Enter Purchase bill (DLM)
* @formNo 158
*/
function form158_import(data_array,import_type)
{
	var data_xml="<supplier_bill_items>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</supplier_bill_items><separator></separator><supplier_bill_items>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<product_name>"+row.product_name+"</product_name>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<batch>"+row.product_name+"</batch>" +
				"<bill_id>"+row.bill_id+"</bill_id>" +
				"<unit_price>"+row.unit_price+"</unit_price>" +
				"<amount>"+row.amount+"</amount>" +
				"<tax>"+row.tax+"</tax>" +
				"<total>"+row.total+"</total>" +
				"<storage>"+row.storage+"</storage>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</supplier_bill_items>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
		}
		else
		{
			local_create_batch(data_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}
	}
};

/**
* @form Checklist items
* @formNo 161
*/
function form161_import(data_array,import_type)
{
	var data_xml="<checklist_items>";
	var counter=1;
	var new_id=parseFloat(vUtil.newKey());
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</checklist_items><separator></separator><checklist_items>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<checkpoint>"+row.checkpoint+"</checkpoint>" +
				"<desired_result>"+row.desired_result+"</desired_result>" +
				"<status>"+row.status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</checklist_items>";

	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
		}
		else
		{
			local_create_batch(data_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}
	}
}

/**
* @form Product Checklist
* @formNo 162
*/
function form162_import(data_array,import_type)
{
	var data_xml="<checklist_mapping>";
	var counter=1;
	var new_id=parseFloat(vUtil.newKey());
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</checklist_mapping><separator></separator><checklist_mapping>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<checkpoint>"+row.checkpoint+"</checkpoint>" +
				"<desired_result>"+row.desired_result+"</desired_result>" +
				"<item>"+row.item+"</item>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</checklist_mapping>";

	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
		}
		else
		{
			local_create_batch(data_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}
	}
}


/**
* @form Storage Structure
* @formNo 167
*/
function form167_import(data_array,import_type)
{
	var data_xml="<storage_structure>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</storage_structure><separator></separator><storage_structure>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}


		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<parent>"+row.parent+"</parent>" +
				"<len>"+row.length+"</len>" +
				"<breadth>"+row.breadth+"</breadth>" +
				"<height>"+row.height+"</height>" +
				"<unit>"+row.unit+"</unit>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</storage_structure>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
		}
		else
		{
			local_create_batch(data_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}
	}
};

/**
* @form Manage Products (Nikki)
* @formNo 169
*/
function form169_import(data_array,import_type)
{
	var data_xml="<product_master>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</product_master><separator></separator><product_master>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name unique='yes'>"+row.sku+"</name>" +
				"<make>"+row.brand+"</make>" +
				"<description>"+row.name+"</description>" +
				"<tax>"+row.tax+"</tax>" +
				"<bar_code>"+row.bar_code+"</bar_code>" +
				"<len>"+row.length+"</len>"+
				"<breadth>"+row.breadth+"</breadth>"+
				"<height>"+row.height+"</height>"+
				"<volume>"+row.volume+"</volume>"+
				"<unit>"+row.unit+"</unit>"+
				"<weight>"+row.weight+"</weight>"+
				"<packing>"+row.packing+"</packing>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</product_master>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Store Areas (Nikki)
* @formNo 170
*/
function form170_import(data_array,import_type)
{
	var data_xml="<store_areas>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</store_areas><separator></separator><store_areas>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<parent>"+row.parent+"</parent>" +
				"<owner>"+row.owner+"</owner>"+
				"<area_type>"+row.area_type+"</area_type>" +
				"<height>"+row.length+"</height>" +
				"<breadth>"+row.breadth+"</breadth>" +
				"<len>"+row.length+"</len>" +
				"<unit>"+row.unit+"</unit>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</store_areas>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}

};

/**
* @form Manage Channels
* @formNo 171
*/
function form171_import(data_array,import_type)
{
	var data_xml="<sale_channels>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</sale_channels><separator></separator><sale_channels>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<details>"+row.details+"</details>" +
				"<dead_weight_factor>"+row.dead_weight_factor+"</dead_weight_factor>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</sale_channels>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
		}
		else
		{
			local_create_batch(data_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}
	}

};


/**
* @form Pricing Sheet
* @formNo 172
*/
function form172_import(data_array,import_type)
{
	var data_xml="<channel_prices>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</channel_prices><separator></separator><channel_prices>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		var profit=vUtil.round((parseFloat(row.sale_price)+parseFloat(row.freight)-parseFloat(row.total_charges)-parseFloat(row.cost_price)),2);
		var profit_mrp=vUtil.round((profit/parseFloat(row.mrp)*100),2);
		var profit_sp=vUtil.round((profit/parseFloat(row.sale_price)*100),2);
		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<channel>"+row.channel+"</channel>" +
				"<item>"+row.item+"</item>" +
				"<from_time>"+get_raw_time(row.from_time)+"</from_time>" +
				"<mrp>"+row.mrp+"</mrp>"+
				"<discount_customer>"+row.discount_customer+"</discount_customer>"+
				"<sale_price>"+row.sale_price+"</sale_price>"+
				"<freight>"+row.freight+"</freight>"+
				"<channel_commission_percentage>"+row.channel_commission_percentage+"</channel_commission_percentage>"+
				"<channel_commission>"+row.channel_commission+"</channel_commission>"+
				"<pickup_charges>"+row.pickup_charges+"</pickup_charges>"+
				"<gateway_charges>"+row.gateway_charges+"</gateway_charges>"+
				"<service_tax>"+row.service_tax+"</service_tax>"+
				"<total_charges>"+row.total_charges+"</total_charges>"+
				"<cost_price>"+row.cost_price+"</cost_price>"+
				"<total_payable>"+(parseFloat(row.total_charges))+"</total_payable>"+
				"<total_receivable>"+(parseFloat(row.sale_price)+parseFloat(row.freight)-parseFloat(row.total_charges))+"</total_receivable>"+
				"<profit_mrp>"+profit_mrp+"</profit_mrp>"+
				"<profit_sp>"+profit_sp+"</profit_sp>"+
				"<profit>"+profit+"</profit>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</channel_prices>";
//	console.log(data_xml);
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}

};

/**
* @form SKU mapping
* @formNo 173
*/
function form173_import(data_array,import_type)
{
	var data_xml="<sku_mapping>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</sku_mapping><separator></separator><sku_mapping>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<channel>"+row.channel+"</channel>" +
				"<channel_sku>"+row.channel_sku+"</channel_sku>" +
				"<system_sku>"+row.system_sku+"</system_sku>"+
				"<item_desc>"+row.item_desc+"</item_desc>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</sku_mapping>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}

};

/**
* @form Pickup Charges
* @formNo 174
*/
function form174_import(data_array,import_type)
{
	var data_xml="<pickup_charges>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</pickup_charges><separator></separator><pickup_charges>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<channel>"+row.channel+"</channel>" +
				"<pincode>"+row.pincode+"</pincode>" +
				"<minimum>"+row.minimum+"</minimum>"+
				"<maximum>"+row.maximum+"</maximum>" +
				"<weight_rate>"+row.weight_rate+"</weight_rate>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</pickup_charges>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Channel Categories
* @formNo 175
*/
function form175_import(data_array,import_type)
{
	var data_xml="<channel_category>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</channel_category><separator></separator><channel_category>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<channel>"+row.channel+"</channel>" +
				"<type>"+row.type+"</type>" +
				"<name>"+row.name+"</name>"+
				"<parent>"+row.parent+"</parent>" +
				"<commission>"+row.commission+"</commission>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</channel_category>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Category Item mapping
* @formNo 176
*/
function form176_import(data_array,import_type)
{
	var data_xml="<category_sku_mapping>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</category_sku_mapping><separator></separator><category_sku_mapping>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<channel>"+row.channel+"</channel>" +
				"<cat_type>"+row.cat_type+"</cat_type>" +
				"<cat_name>"+row.cat_name+"</cat_name>"+
				"<sku>"+row.sku+"</sku>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</category_sku_mapping>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Prioritization Parameters
* @formNo 177
*/
function form177_import(data_array,import_type)
{
	var data_xml="<prioritization_parameters>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</prioritization_parameters><separator></separator><prioritization_parameters>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<type>"+row.type+"</type>" +
				"<values>"+row.values+"</values>"+
				"<threshold>"+row.threshold+"</threshold>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</prioritization_parameters>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Production Steps
* @formNo 184
*/
function form184_import(data_array,import_type)
{
	var data_xml="<business_processes>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</business_processes><separator></separator><business_processes>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<order_no>"+row.order_no+"</order_no>" +
				"<name>"+row.name+"</name>" +
				"<details>"+row.details+"</details>" +
				"<type>"+row.type+"</type>"+
				"<time_estimate>"+row.time_estimate+"</time_estimate>"+
				"<default_assignee>"+row.default_assignee+"</default_assignee>"+
				"<status>"+row.status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</business_processes>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
		}
		else
		{
			local_create_batch(data_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}
	}
};

/**
* @form Testing Steps
* @formNo 187
*/
function form187_import(data_array,import_type)
{
	var data_xml="<business_processes>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</business_processes><separator></separator><business_processes>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<order_no>"+row.order_no+"</order_no>" +
				"<name>"+row.name+"</name>" +
				"<details>"+row.details+"</details>" +
				"<type>testing</type>"+
				"<time_estimate>"+row.time_estimate+"</time_estimate>"+
				"<default_assignee>"+row.default_assignee+"</default_assignee>"+
				"<status>"+row.status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</business_processes>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
		}
		else
		{
			local_create_batch(data_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}
	}
};

/**
* @form Testing Steps
* @formNo 190
*/
function form190_import(data_array,import_type)
{
	var data_xml="<sale_orders>";
	var task_xml="<task_instances>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</sale_orders><separator></separator><sale_orders>";
			task_xml+="</task_instances><separator></separator><task_instances>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<customer_name>"+row.customer_name+"</customer_name>" +
				"<notes>"+row.notes+"</notes>" +
				"<order_date>"+get_raw_time(row.order_date)+"</order_date>"+
				"<status>"+row.status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		task_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>Pickup for customer "+row.customer_name+"</name>" +
				"<description>Address: "+row.address+"</description>"+
				"<t_initiated>"+last_updated+"</t_initiated>" +
				"<t_due>"+(parseFloat(last_updated)+(4*3600000))+"</t_due>"+
				"<status>pending</status>" +
				"<assignee>"+row.assignee+"</assignee>"+
				"<source>sale order</source>"+
				"<source_id>"+row.id+"</source_id>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</sale_orders>";
	task_xml+="</task_instances>";

	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
			server_create_batch(task_xml);
		}
		else
		{
			local_create_batch(data_xml);
			local_create_batch(task_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
			server_update_batch(task_xml);
		}
		else
		{
			local_update_batch(data_xml);
			local_update_batch(task_xml);
		}
	}
};


/**
* @form Inventory_adjust
* @formNo 193
*/
function form193_import(data_array,import_type)
{
	var data_xml="<inventory_adjust>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</inventory_adjust><separator></separator><inventory_adjust>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<product_name>"+row.product_name+"</product_name>" +
				"<batch>"+row.batch+"</batch>" +
				"<quantity>"+row.quantity+"</quantity>"+
				"<source>"+row.source+"</source>" +
				"<storage>"+row.storage+"</storage>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</inventory_adjust>";

	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form Letterhead
* @formNo 195
*/
function form195_import(data_array,import_type)
{
	var data_xml="<letterheads>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</letterheads><separator></separator><letterheads>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<date>"+get_raw_time(row.date)+"</date>" +
				"<receiver>"+row.receiver+"</receiver>"+
				"<subject>"+row.subject+"</subject>"+
				"<salutation>"+row.salutation+"</salutation>"+
				"<content>"+row.content+"</content>" +
				"<signature>"+row.signature+"</signature>"+
				"<footer>"+row.footer+"</footer>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</letterheads>";

	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
		}
		else
		{
			local_create_batch(data_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}
	}
};

/**
* @form SKU Mapping (Supplier)
* @formNo 217
*/
function form217_import(data_array,import_type)
{
	var data_xml="<supplier_item_mapping>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</supplier_item_mapping><separator></separator><supplier_item_mapping>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<item>"+row.item+"</item>" +
				"<item_desc>"+row.item_desc+"</item_desc>" +
				"<supplier_sku>"+row.supplier_sku+"</supplier_sku>" +
				"<margin>"+row.margin+"</margin>" +
				"<supplier>"+row.supplier+"</supplier>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</supplier_item_mapping>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form create purchase order (Aurilion)
* @formNo 222
*/
function form222_import(data_array,import_type)
{
	var data_xml="<purchase_order_items>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</purchase_order_items><separator></separator><purchase_order_items>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<item_name>"+row.item_name+"</item_name>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<make>"+row.make+"</make>" +
				"<order_id>"+row.order_id+"</order_id>" +
				"<price>"+row.price+"</price>" +
				"<mrp>"+row.mrp+"</mrp>"+
				"<amount>"+row.amount+"</amount>"+
				"<tax>"+row.tax+"</tax>"+
				"<total>"+row.total+"</total>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="<purchase_order_items>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
		}
		else
		{
			local_create_batch(data_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}
	}
};

/**
* @form Manage Purchase orders (aurilion)
* @formNo 223
*/
function form223_import(data_array,import_type)
{
	var data_xml="<purchase_orders>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</purchase_orders><separator></separator><purchase_orders>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<supplier>"+row.supplier+"</supplier>" +
				"<order_date>"+get_raw_time(row.order_date)+"</order_date>" +
				"<status>"+row.status+"</status>" +
				"<order_num>"+row.order_num+"</order_num>" +
				"<amount>"+row.amount+"</amount>" +
				"<tax>"+row.tax+"</tax>" +
				"<total>"+row.total+"</total>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</purchase_orders>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
		}
		else
		{
			local_create_batch(data_xml);
		}
	}
	else
	{
		if(is_online())
		{
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}
	}
};


/**
* @form In-out
* @formNo 230
*/
function form230_import(data_array,import_type)
{
	var data_xml="<bill_items>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</bill_items><separator></separator><bill_items>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<item_name>"+row.item+"</item_name>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<issue_date>"+get_raw_time(row.date)+"</issue_date>" +
				"<issue_type>"+row.issue_type+"</issue_type>" +
				"<hiring_type>"+row.for_from+"</hiring_type>" +
				"<customer>"+row.to_from+"</customer>" +
				"<notes>"+row.notes+"</notes>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</bill_items>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};

/**
* @form SKU components
* @formNo 245
*/
function form245_import(data_array,import_type)
{
	var data_xml="<pre_requisites>";
	var counter=1;
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</pre_requisites><separator></separator><pre_requisites>";
		}

		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.sku+"</name>" +
				"<type>product</type>"+
				"<quantity>"+row.quantity+"</quantity>"+
				"<requisite_type>product</requisite_type>"+
				"<requisite_name>"+row.component_sku+"</requisite_name>"+
				"<requisite_desc>"+row.component_name+"</requisite_desc>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</pre_requisites>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Purchase leads (followups)
* @formNo 273
*/
function form273_import(data_array,import_type)
{
	var data_xml="<purchase_leads>";
	var data2_xml="<suppliers>";
	var data3_xml="<accounts>";
	var counter=1;
	var last_updated=get_my_time();
	var supplier_array=[];

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</purchase_leads><separator></separator><purchase_leads>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<supplier>"+row.name+" ("+row.phone+")"+"</supplier>" +
				"<detail>"+row['comments']+"</detail>" +
				"<item_name>"+row['item']+"</item_name>" +
				"<item_company>"+row['company']+"</item_company>" +
				"<price>"+row['price']+"</price>" +
				"<quantity>"+row['quantity']+"</quantity>" +
				"<identified_date>"+get_raw_time(row['identified date'])+"</identified_date>" +
				"<status>open</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";

		var supplier=row.name+" ("+row.phone+")";
		var supplier_object=new Object();
		supplier_object.id=last_updated+counter;
		supplier_object.name=row.name;
		supplier_object.acc_name=supplier;
        supplier_object.email=row.email;
        supplier_object.phone=row.phone;
        supplier_object.address=row.address;
        supplier_object.city=row.city;

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
	});

	counter=1;
	supplier_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data2_xml+="</suppliers><separator></separator><suppliers>";
			data3_xml+="</accounts><separator></separator><accounts>";
		}
		counter+=1;

		data2_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>"+
                "<acc_name unique='yes'>"+row.acc_name+"</acc_name>"+
                "<email>"+row.email+"</email>"+
                "<phone>"+row.phone+"</phone>"+
                "<address>"+row.address+"</address>"+
                "<city>"+row.city+"</city>"+
                "<last_updated>"+last_updated+"</last_updated>" +
				"</row>";

		data3_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<acc_name unique='yes'>"+row.acc_name+"</acc_name>" +
				"<description></description>" +
				"<type>supplier</type>" +
				"<username></username>" +
				"<status>active</status>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</purchase_leads>";
	data2_xml+="</suppliers>";
	data3_xml+="</accounts>";

	if(import_type=='create_new')
	{
		create_batch(data_xml);
		create_batch(data2_xml);
		create_batch(data3_xml);
	}
	else
	{
		update_batch(data_xml);
		update_batch(data2_xml);
		update_batch(data3_xml);
	}
}

/**
* @form Inventory (poojaelec)
* @formNo 274
*/
function form274_import(data_array,import_type)
{
	var data_xml="<product_master>";
	var data1_xml="<product_instances>";
	var data2_xml="<inventory_adjust>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</product_master><separator></separator><product_master>";
			data1_xml+="</product_instances><separator></separator><product_instances>";
			data2_xml+="</inventory_adjust><separator></separator><inventory_adjust>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name unique='yes'>"+row.item+"</name>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		data1_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<product_name unique='yes'>"+row.item+"</product_name>" +
				"<batch>"+row.item+"</batch>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		data2_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<product_name>"+row.item+"</product_name>" +
				"<batch>"+row.item+"</batch>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</product_master>";
	data1_xml+="</product_instances>";
	data2_xml+="</inventory_adjust>";

	if(import_type=='create_new')
	{
		create_batch(data_xml);
		create_batch(data1_xml);
		create_batch(data2_xml);
	}
	else
	{
		update_batch(data2_xml);
	}
};


/**
* @form In-out (poojaelec)
* @formNo 275
*/
function form275_import(data_array,import_type)
{
	var data_xml="<bill_items>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</bill_items><separator></separator><bill_items>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<item_name>"+row.item+"</item_name>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<issue_date>"+get_raw_time(row.date)+"</issue_date>" +
				"<issue_type>"+row.type+"</issue_type>" +
				"<customer>"+row['to/from']+"</customer>" +
				"<notes>"+row.notes+"</notes>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</bill_items>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
};


/**
* @form Buyer Leads
* @formNo 289
*/
function form289_import(data_array,import_type)
{
	var data_xml="<sale_leads>";
	var data2_xml="<customers>";
	var data3_xml="<accounts>";
	var counter=1;
	var last_updated=get_my_time();
	var supplier_array=[];

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</sale_leads><separator></separator><sale_leads>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<customer>"+row.name+" ("+row.phone+")"+"</customer>" +
				"<detail>"+row['comments']+"</detail>" +
				"<item_name>"+row['item']+"</item_name>" +
				"<item_company>"+row['company']+"</item_company>" +
				"<price>"+row['price']+"</price>" +
				"<identified_by>"+row['point-of-contact']+"</identified_by>" +
				"<quantity>"+row['quantity']+"</quantity>" +
				"<due_date>"+get_raw_time(row['followup date'])+"</due_date>" +
				"<status>open</status>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";

		var supplier=row.name+" ("+row.phone+")";
		var supplier_object=new Object();
		supplier_object.id=last_updated+counter;
		supplier_object.name=row.name;
		supplier_object.acc_name=supplier;
        supplier_object.email=row.email;
        supplier_object.phone=row.phone;
        supplier_object.address=row.address;
        supplier_object.city=row.city;

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
	});

	counter=1;
	supplier_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data2_xml+="</customers><separator></separator><customers>";
			data3_xml+="</accounts><separator></separator><accounts>";
		}
		counter+=1;

		data2_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>"+
                "<acc_name unique='yes'>"+row.acc_name+"</acc_name>"+
                "<email>"+row.email+"</email>"+
                "<phone>"+row.phone+"</phone>"+
                "<address>"+row.address+"</address>"+
                "<city>"+row.city+"</city>"+
                "<last_updated>"+last_updated+"</last_updated>" +
				"</row>";

		data3_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<acc_name unique='yes'>"+row.acc_name+"</acc_name>" +
				"<description></description>" +
				"<type>customer</type>" +
				"<username></username>" +
				"<status>active</status>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";

	});

	data_xml+="</sale_leads>";
	data2_xml+="</customers>";
	data3_xml+="</accounts>";

	if(import_type=='create_new')
	{
		create_batch(data_xml);
		create_batch(data2_xml);
		create_batch(data3_xml);
	}
	else
	{
		update_batch(data_xml);
		update_batch(data2_xml);
		update_batch(data3_xml);
	}
}


/**
* @form Cities
* @formNo 290
*/
function form290_import(data_array,import_type)
{
	var data_xml="<cities_data>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</cities_data><separator></separator><cities_data>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<city>"+row['city']+"</city>" +
				"<state>"+row['state']+"</state>" +
				"<country>"+row['country']+"</country>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</cities_data>";

	if(import_type=='create_new')
	{
		create_batch(data_xml);
	}
	else
	{
		update_batch(data_xml);
	}
}


/**
* @form Manage Products (Pooja)
* @formNo 300
*/
function form300_import(data_array,import_type)
{
	var data_xml="<product_master>";
	var data2_xml="<product_instances>";
	var counter=1;
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</product_master><separator></separator><product_master>";
			data2_xml+="</product_instances><separator></separator><product_instances>";
		}

		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name unique='yes'>"+row['Model']+"</name>" +
				"<make>"+row['Company']+"</make>" +
				"<description>"+row['Company']+"</description>" +
				"<category>"+row['Category']+"</category>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		data2_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<product_name>"+row['Model']+"</product_name>" +
				"<batch>"+row['Model']+"</batch>" +
				"<cost_price>"+row['Cost Price']+"</cost_price>" +
				"<sale_price>"+row['Sale Price']+"</sale_price>" +
				"<mrp>"+row['MRP']+"</mrp>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</product_master>";
	data2_xml+="</product_instances>";
	if(import_type=='create_new')
	{
		create_batch(data_xml);
		create_batch(data2_xml);
	}
	else
	{
		update_batch(data_xml);
		update_batch(data2_xml);
	}
};
