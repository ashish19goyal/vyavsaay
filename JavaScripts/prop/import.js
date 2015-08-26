/**
* @form Update Inventory
* @formNo 1
*/
function form1_import(data_array,import_type)
{
	var data_xml="<product_instances>";
	var counter=1;
	var new_id=parseFloat(get_new_key());
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
					if(is_online())
					{
						server_create_simple_no_warning(adjust_xml);
					}
					else
					{
						local_create_simple_no_warning(adjust_xml);
					}
				}
			});
		}
	});

	data_xml+="</product_instances>";
	
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
* @form Manage Staff
* @formNo 8
*/
function form8_import(data_array,import_type)
{
	var data_xml="<staff>";
	var account_xml="<accounts>";
	var counter=1;
	var last_updated=get_my_time();
	
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</staff><separator></separator><staff>";
			account_xml+="</accounts><separator></separator><accounts>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<phone>"+row.phone+"</phone>" +
				"<email>"+row.email+"</email>" +
				"<acc_name unique='yes'>"+row.acc_name+"</acc_name>" +
				"<status>"+row.status+"</status>" +
				"<address>"+row.address+"</address>" +
				"<pincode>"+row.pincode+"</pincode>" +
				"<city>"+row.city+"</city>" +
				"<state>"+row.state+"</state>" +
				"<country>"+row.country+"</country>" +
				"<address_status>pending analysis</address_status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		account_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<acc_name>"+row.acc_name+"</acc_name>" +
				"<description></description>" +
				"<type>staff</type>" +
				"<username unique='yes'>"+row.username+"</username>" +
				"<status>active</status>"+				
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</staff>";
	account_xml+="</accounts>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
			server_create_batch(account_xml);
		}
		else
		{
			local_create_batch(data_xml);
			local_create_batch(account_xml);
		}
	}
	else
	{
		if(is_online())
		{	
			server_update_batch(data_xml);
			server_update_batch(account_xml);
		}
		else
		{
			local_update_batch(data_xml);
			local_update_batch(account_xml);
		}
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
				"<source_info>"+row.source_info+"</source_info>" +				
				"<bill_id>"+row.bill_id+"</bill_id>" +
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
* @form Enter Customer Returns
* @formNo 15
*/
function form15_import(data_array,import_type)
{
	var data_xml="<customer_return_items>";
	var discard_xml="<discarded>";
	var counter=1;
	var last_updated=get_my_time();
	var discard_id=parseFloat(get_new_key());
	
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</customer_return_items><separator></separator><customer_return_items>";
			discard_xml+="</discarded><separator></separator><discarded>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}


		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<return_id>"+row.return_id+"</return_id>" +
				"<item_name>"+row.item_name+"</item_name>" +
				"<item_desc>"+row.item_desc+"</item_desc>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<refund_amount>"+row.refund_amount+"</refund_amount>" +
				"<exchange_batch>"+row.exchange_batch+"</exchange_batch>" +
				"<saleable>"+row.saleable+"</saleable>" +
				"<type>"+row.type+"</type>" +
				"<batch>"+row.batch+"</batch>" +
				"<notes>"+row.notes+"</notes>" +
				"<tax>"+row.tax+"</tax>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		
		if(row.saleable!="checked")
		{
			discard_xml+="<row>" +
					"<id>"+(discard_id+counter)+"</id>" +
					"<product_name>"+row.item_name+"</product_name>" +
					"<source_id>"+row.return_id+"</source_id>" +
					"<batch>"+row.batch+"</batch>" +
					"<source>sale return</source>" +
					"<source_link>form15</source_link>" +
					"<quantity>"+row.quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</row>";
		}
	});
	data_xml+="</customer_return_items>";
	discard_xml+="</discarded>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
			server_create_batch(discard_xml);
		}
		else
		{
			local_create_batch(data_xml);
			local_create_batch(discard_xml);
		}
	}
	else
	{
		if(is_online())
		{	
			server_update_batch(data_xml);
			server_update_batch(discard_xml);
		}
		else
		{
			local_update_batch(data_xml);
			local_update_batch(discard_xml);
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
* @form Manage Supplier Returns
* @formNo 17
*/
function form17_import(data_array,import_type)
{
	var data_xml="<supplier_returns>";
	var transaction_xml="<transactions>";
	var counter=1;
	var last_updated=get_my_time();
	
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</supplier_returns><separator></separator><supplier_returns>";
			transaction_xml+="</transactions><separator></separator><transactions>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}


		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<supplier>"+row.supplier+"</supplier>" +
				"<return_date>"+get_raw_time(row.return_date)+"</return_date>" +
				"<total>"+row.total+"</total>" +
				"<type>"+row.type+"</type>" +
				"<tax>"+row.tax+"</tax>" +
				"<transaction_id>"+row.transaction_id+"</transaction_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		transaction_xml+="<row>" +
				"<id>"+row.transaction_id+"</id>" +
				"<trans_date>"+get_raw_time(row.return_date)+"</trans_date>" +
				"<amount>"+row.total+"</amount>" +
				"<receiver>"+row.supplier+"</receiver>" +
				"<giver>master</giver>" +
				"<tax>"+row.tax+"</tax>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		
	});
	
	data_xml+="</supplier_returns>";
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
* @form Enter Supplier Returns
* @formNo 19
*/
function form19_import(data_array,import_type)
{
	var data_xml="<supplier_return_items>";
	var counter=1;
	var last_updated=get_my_time();
	
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</supplier_return_items><separator></separator><supplier_return_items>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<return_id>"+row.return_id+"</return_id>" +
				"<item_name>"+row.item_name+"</item_name>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<refund_amount>"+row.refund_amount+"</refund_amount>" +
				"<saleable>"+row.saleable+"</saleable>" +
				"<batch>"+row.batch+"</batch>" +
				"<notes>"+row.notes+"</notes>" +
				"<tax>"+row.tax+"</tax>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	
	data_xml+="</supplier_return_items>";
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
* @form Enter Supplier bill
* @formNo 21
*/
function form21_import(data_array,import_type)
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
				"<batch>"+row.batch+"</batch>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<bill_id>"+row.bill_id+"</bill_id>" +
				"<unit_price>"+row.unit_price+"</unit_price>" +
				"<amount>"+row.amount+"</amount>" +
				"<tax>"+row.tax+"</tax>" +
				"<total>"+row.total+"</total>" +
				"<discount>"+row.discount+"</discount>" +
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
* @form Manage Customers
* @formNo 30
*/
function form30_import(data_array,import_type)
{
	var data_xml="<customers>";
	var account_xml="<accounts>";
	var counter=1;
	var last_updated=get_my_time();
	
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</customers><separator></separator><customers>";
			account_xml+="</accounts><separator></separator><accounts>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<phone>"+row.phone+"</phone>" +
				"<email>"+row.email+"</email>" +
				"<acc_name unique='yes'>"+row.acc_name+"</acc_name>" +
				"<status>"+row.status+"</status>" +
				"<notes>"+row.notes+"</notes>" +
				"<address>"+row.address+"</address>" +
				"<pincode>"+row.pincode+"</pincode>" +
				"<city>"+row.city+"</city>" +
				"<state>"+row.state+"</state>" +
				"<country>"+row.country+"</country>" +
				"<address_status>"+row.address_status+"</address_status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		account_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<acc_name>"+row.acc_name+"</acc_name>" +
				"<description>"+row.notes+"</description>" +
				"<type>customer</type>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	
	data_xml+="</customers>";
	account_xml+="</accounts>";
	
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
			server_create_batch(account_xml);
		}
		else
		{
			local_create_batch(data_xml);
			local_create_batch(account_xml);
		}
	}
	else
	{
		if(is_online())
		{	
			server_update_batch(data_xml);
			server_update_batch(account_xml);
		}
		else
		{
			local_update_batch(data_xml);
			local_update_batch(account_xml);
		}
	}
}

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
* @form Store Placement
* @formNo 38
*/
function form38_import(data_array,import_type)
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
				"<batch>"+row.batch+"</batch>" +
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
* @form Manage Products
* @formNo 39
*/
function form39_import(data_array,import_type)
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
* @form Manage suppliers
* @formNo 40
*/
function form40_import(data_array,import_type)
{
	var data_xml="<suppliers>";
	var account_xml="<accounts>";
	var counter=1;
	var last_updated=get_my_time();
	
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</suppliers><separator></separator><suppliers>";
			account_xml+="</accounts><separator></separator><accounts>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<phone>"+row.phone+"</phone>" +
				"<email>"+row.email+"</email>" +
				"<acc_name unique='yes'>"+row.acc_name+"</acc_name>" +
				"<notes>"+row.notes+"</notes>" +
				"<address>"+row.address+"</address>" +
				"<pincode>"+row.pincode+"</pincode>" +
				"<city>"+row.city+"</city>" +
				"<state>"+row.state+"</state>" +
				"<country>"+row.country+"</country>" +
				"<address_status>"+row.address_status+"</address_status>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</row>";
		account_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<acc_name>"+row.acc_name+"</acc_name>" +
				"<description>"+row.notes+"</description>" +
				"<type>supplier</type>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</row>";
	});
	
	data_xml+="</suppliers>";
	account_xml+="</accounts>";
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
			server_create_batch(account_xml);
		}
		else
		{
			local_create_batch(data_xml);
			local_create_batch(account_xml);
		}
	}
	else
	{
		if(is_online())
		{	
			server_update_batch(data_xml);
			server_update_batch(account_xml);
		}
		else
		{
			local_update_batch(data_xml);
			local_update_batch(account_xml);
		}
	}
};

/**
* @form Manage Bills
* @formNo 42
*/
function form42_import(data_array,import_type)
{
	var data_xml="<bills>";
	var transaction_xml="<transactions>";
	var counter=1;
	var last_updated=get_my_time();
	
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</bills><separator></separator><bills>";
			transaction_xml+="</transactions><separator></separator><transactions>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<bill_num>"+row.bill_num+"</bill_num>"+
				"<customer_name>"+row.customer_name+"</customer_name>" +
				"<bill_date>"+get_raw_time(row.bill_date)+"</bill_date>" +
				"<amount>"+row.amount+"</amount>" +
				"<total>"+row.total+"</total>" +
				"<type>"+row.type+"</type>" +
				"<billing_type>"+row.billing_type+"</billing_type>" +
				"<offer>"+row.offer+"</offer>" +
				"<discount>"+row.discount+"</discount>" +
				"<tax>"+row.tax+"</tax>" +
				"<transaction_id>"+row.transaction_id+"</transaction_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		transaction_xml+="<row>" +
				"<id>"+row.transaction_id+"</id>" +
				"<trans_date>"+get_raw_time(row.bill_date)+"</trans_date>" +
				"<amount>"+row.total+"</amount>" +
				"<receiver>"+row.customer_name+"</receiver>" +
				"<giver>master</giver>" +
				"<tax>"+row.tax+"</tax>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</row>";
	});
	data_xml+="</bills>";
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
* @form Manage supplier bill
* @formNo 53
*/
function form53_import(data_array,import_type)
{
	var data_xml="<supplier_bills>";
	var transaction_xml="<transactions>";
	var counter=1;
	var last_updated=get_my_time();
	
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</supplier_bills><separator></separator><supplier_bills>";
			transaction_xml+="</transactions><separator></separator><transactions>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<bill_id>"+row.bill_id+"</bill_id>" +
				"<supplier>"+row.supplier+"</supplier>" +
				"<bill_date>"+get_raw_time(row.bill_date)+"</bill_date>" +
				"<entry_date>"+get_raw_time(row.entry_date)+"</entry_date>" +
				"<amount>"+row.amount+"</amount>" +
				"<discount>"+row.discount+"</discount>" +
				"<tax>"+row.tax+"</tax>" +
				"<total>"+row.total+"</total>" +
				"<transaction_id>"+row.transaction_id+"</transaction_id>" +
				"<notes>"+row.notes+"</notes>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		transaction_xml+="<row>" +
				"<id>"+row.transaction_id+"</id>" +
				"<trans_date>"+get_raw_time(row.entry_date)+"</trans_date>" +
				"<amount>"+row.total+"</amount>" +
				"<receiver>master</receiver>" +
				"<giver>"+row.supplier+"</giver>" +
				"<tax>"+row.tax+"</tax>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</supplier_bills>";
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
* @form Cash Register
* @formNo 56
*/
function form56_import(data_array,import_type)
{
	var data_xml="<cash_register>";
	var transaction_xml="<transactions>";
	var payment_xml="<payments>";
	var transaction2_xml="<transactions>";
	var counter=1;
	var last_updated=get_my_time();

	var payment_id=parseFloat(get_my_time());
	
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</cash_register><separator></separator><cash_register>";
			transaction_xml+="</transactions><separator></separator><transactions>";
			payment_xml+="</payments><separator></separator><payments>";
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
			giver=row.acc_name;
			receiver="master";
		}
		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<type>"+row.type+"</type>" +
				"<acc_name>"+row.acc_name+"</acc_name>" +
				"<amount>"+row.amount+"</amount>" +
				"<notes>"+row.notes+"</notes>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		transaction_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<trans_date>"+get_my_time()+"</trans_date>" +
				"<amount>"+row.amount+"</amount>" +
				"<receiver>"+giver+"</receiver>" +
				"<giver>"+receiver+"</giver>" +
				"<tax>0</tax>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		transaction2_xml+="<row>" +
				"<id>"+(payment_id+counter)+"</id>" +
				"<trans_date>"+get_my_time()+"</trans_date>" +
				"<amount>"+row.amount+"</amount>" +
				"<receiver>"+receiver+"</receiver>" +
				"<giver>"+giver+"</giver>" +
				"<tax>0</tax>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		payment_xml+="<row>" +
				"<id>"+(payment_id+counter)+"</id>" +
				"<acc_name>"+row.acc_name+"</acc_name>" +
				"<type>"+row.type+"</type>" +
				"<total_amount>"+row.amount+"</total_amount>" +
				"<paid_amount>"+row.amount+"</paid_amount>" +
				"<status>closed</status>" +
				"<date>"+get_my_time()+"</date>" +
				"<due_date>"+get_my_time()+"</due_date>" +
				"<mode>cash</mode>" +
				"<transaction_id>"+payment_id+"</transaction_id>" +
				"<bill_id>"+row.id+"</bill_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	
	data_xml+="</cash_register>";
	transaction_xml+="</transactions>";
	payment_xml+="</payments>";
	transaction2_xml+="</transactions>";
	
	if(import_type=='create_new')
	{
		if(is_online())
		{
			server_create_batch(data_xml);
			server_create_batch(transaction_xml);
			server_create_batch(transaction2_xml);
			server_create_batch(payment_xml);
		}
		else
		{
			local_create_batch(data_xml);
			local_create_batch(transaction_xml);
			local_create_batch(transaction2_xml);
			local_create_batch(payment_xml);
		}
	}
	else
	{
		if(is_online())
		{	
			server_update_batch(data_xml);
			server_update_batch(transaction_xml);
			server_update_batch(transaction2_xml);
			server_update_batch(payment_xml);
		}
		else
		{
			local_update_batch(data_xml);
			local_update_batch(transaction_xml);
			local_update_batch(transaction2_xml);
			local_update_batch(payment_xml);
		}
	}
};

/**
* @form manage services
* @formNo 57
*/
function form57_import(data_array,import_type)
{
	var data_xml="<services>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</services><separator></separator><services>";
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
				"<price>"+row.price+"</price>" +
				"<tax>"+row.tax+"</tax>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	
	data_xml+="</services>";
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
* @form Service pre-requisites
* @formNo 58
*/
function form58_import(data_array,import_type)
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
* @form Product Attributes
* @formNo 60
*/
function form60_import(data_array,import_type)
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
				"<type>product</type>" +
				"<attribute>"+row.attribute+"</attribute>" +
				"<value>"+row.value+"</value>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</attributes>";
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
* @form Manage accounts
* @formNo 71
*/
function form71_import(data_array,import_type)
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
				"<acc_name>"+row.acc_name+"</acc_name>" +
				"<description>"+row.description+"</description>" +
				"<type>"+row.type+"</type>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</accounts>";
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
* @form create bills
* @formNo 72
*/
function form72_import(data_array,import_type)
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
				"<batch>"+row.batch+"</batch>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<unit_price>"+row.unit_price+"</unit_price>" +
				"<amount>"+row.amount+"</amount>" +
				"<total>"+row.total+"</total>" +
				"<discount>"+row.discount+"</discount>" +
				"<tax>"+row.tax+"</tax>" +
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
* @form Store Areas
* @formNo 83
*/
function form83_import(data_array,import_type)
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
				"<area_type>"+row.area_type+"</area_type>" +
				"<height>"+row.length+"</height>" +
				"<width>"+row.width+"</width>" +
				"<len>"+row.length+"</len>" +
				"<locx>"+row.locx+"</locx>" +
				"<locy>"+row.locy+"</locy>" +
				"<locz>"+row.locz+"</locz>" +
				"<storey>"+row.storey+"</storey>" +
				"<color>"+row.color+"</color>" +
				"<loc_type>"+row.loc_type+"</loc_type>" +
				"<faceEast>"+row.faceEast+"<faceEast>" +
				"<faceWest>"+row.faceWest+"</faceWest>" +
				"<faceNorth>"+row.faceNorth+"</faceNorth>" +
				"<faceSouth>"+row.faceSouth+"</faceSouth>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</store_areas>";
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
* @form Appointments
* @formNo 89
*/
function form89_import(data_array,import_type)
{
	var data_xml="<appointments>";
	var counter=1;
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</appointments><separator></separator><appointments>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<customer>"+row.customer+"</customer>" +
				"<schedule>"+row.schedule+"</schedule>" +
				"<status>"+row.status+"</status>" +
				"<assignee>"+row.assignee+"</assignee>" +
				"<hours>"+row.hours+"</hours>" +
				"<notes>"+row.notes+"</notes>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	
	data_xml+="</appointments>";
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
* @form Billing types
* @formNo 90
*/
function form90_import(data_array,import_type)
{
	var data_xml="<bill_types>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</bill_types><separator></separator><bill_types>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name unique='yes'>"+row.name+"</name>" +
				"<notes>"+row.notes+"</notes>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</bill_types>";
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
				"<storage>"+row.storage+"</storage>" +
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
* @form Manage Bills(multi-register)
* @formNo 92
*/
function form92_import(data_array,import_type)
{
	var data_xml="<bills>";
	var transaction_xml="<transactions>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</bills><separator></separator><bills>";
			transaction_xml+="</transactions><separator></separator><transactions>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}


		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<bill_num>"+row.bill_num+"</bill_num>"+
				"<customer_name>"+row.customer_name+"</customer_name>" +
				"<bill_date>"+get_raw_time(row.bill_date)+"</bill_date>" +
				"<amount>"+row.amount+"</amount>" +
				"<total>"+row.total+"</total>" +
				"<type>"+row.type+"</type>" +
				"<billing_type>"+row.billing_type+"</billing_type>" +
				"<offer>"+row.offer+"</offer>" +
				"<discount>"+row.discount+"</discount>" +
				"<tax>"+row.tax+"</tax>" +
				"<tax_rate>"+row.tax_rate+"</tax_rate>" +
				"<transaction_id>"+row.transaction_id+"</transaction_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		transaction_xml+="<row>" +
				"<id>"+row.transaction_id+"</id>" +
				"<trans_date>"+get_raw_time(row.bill_date)+"</trans_date>" +
				"<amount>"+row.total+"</amount>" +
				"<receiver>"+row.customer_name+"</receiver>" +
				"<giver>master</giver>" +
				"<tax>"+row.tax+"</tax>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</bills>";
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
* @form Discard Items
* @formNo 94
*/
function form94_import(data_array,import_type)
{
	var data_xml="<discarded>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</discarded><separator></separator><discarded>";
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
				"<quantity>"+row.quantity+"</quantity>" +
				"<storage>"+row.storage+"</storage>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</discarded>";
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
* @form Customer Attributes
* @formNo 96
*/
function form96_import(data_array,import_type)
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
				"<type>customer</type>" +
				"<attribute>"+row.attribute+"</attribute>" +
				"<value>"+row.value+"</value>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</attributes>";
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
* @form Supplier Attributes
* @formNo 97
*/
function form97_import(data_array,import_type)
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
				"<type>supplier</type>" +
				"<attribute>"+row.attribute+"</attribute>" +
				"<value>"+row.value+"</value>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</attributes>";
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
* @form Staff Attributes
* @formNo 98
*/
function form98_import(data_array,import_type)
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
				"<type>staff</type>" +
				"<attribute>"+row.attribute+"</attribute>" +
				"<value>"+row.value+"</value>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</attributes>";
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
* @form Manage Project Tasks
* @formNo 104
*/
function form104_import(data_array,import_type)
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
				"<source>project</source>" +
				"<source_id>"+row.project_id+"</source_id>" +
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
* @form Mandatory Attributes
* @formNo 123
*/
function form123_import(data_array,import_type)
{
	var data_xml="<mandatory_attributes>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</mandatory_attributes><separator></separator><mandatory_attributes>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<object>"+row.object+"</object>" +
				"<attribute>"+row.attribute+"</attribute>" +
				"<values>"+row.values+"</values>"+
				"<status>"+row.status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</mandatory_attributes>";
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
* @form Enter Supplier bill (wholesale)
* @formNo 136
*/
function form136_import(data_array,import_type)
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
				"<p_quantity>"+row.p_quantity+"</p_quantity>" +
				"<f_quantity>"+row.f_quantity+"</f_quantity>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<batch>"+row.batch+"</batch>" +
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
* @form Project Expenses
* @formNo 137
*/
function form137_import(data_array,import_type)
{
	var data_xml="<expenses>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</expenses><separator></separator><expenses>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<status>"+row.status+"</status>" +
				"<person>"+row.person+"</person>" +
				"<amount>"+row.amount+"</amount>" +
				"<detail>"+row.detail+"</detail>" +
				"<expense_date>"+get_raw_time(row.expense_date)+"</expense_date>" +
				"<source>"+row.source+"</source>" +
				"<source_id>"+row.source_id+"</source_id>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</expenses>";
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
* @form Create Questionnaire
* @formNo 142
*/
function form142_import(data_array,import_type)
{
	var data_xml="<ques_fields>";
	var discard_xml="<discarded>";
	var counter=1;
	var last_updated=get_my_time();
	var discard_id=parseFloat(get_new_key());
	
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</ques_fields><separator></separator><ques_fields>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}


		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<ques_id>"+row.ques_id+"</ques_id>" +
				"<name>"+row.name+"</name>" +
				"<display_name>"+row.display_name+"</display_name>" +
				"<description>"+row.description+"</description>" +
				"<type>"+row.type+"</type>" +
				"<fvalues>"+row.fvalues+"</fvalues>" +
				"<forder>"+row.forder+"</forder>" +
				"<freq>"+row.freq+"</freq>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";		
	});
	data_xml+="</ques_fields>";
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
* @form Manage Questionnaire
* @formNo 143
*/
function form143_import(data_array,import_type)
{
	var data_xml="<ques_struct>";
	var counter=1;
	var last_updated=get_my_time();
	
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</ques_struct><separator></separator><ques_struct>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}


		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<display_name>"+row.display_name+"</display_name>" +
				"<func>"+row.func+"</func>" +
				"<description>"+row.description+"</description>" +
				"<status>"+row.status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";		
	});
	
	data_xml+="</ques_struct>";
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
* @form Store Movement
* @formNo 145
*/
function form145_import(data_array,import_type)
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
				"<batch>"+row.batch+"</batch>"+
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
* @form Manage Roles
* @formNo 147
*/
function form147_import(data_array,import_type)
{
	var data_xml="<roles>";
	var counter=1;
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</roles><separator></separator><roles>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<role_name>"+row.role_name+"</role_name>" +
				"<description>"+row.description+"</description>"+
				"<status>"+row.status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	
	data_xml+="</roles>";
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
* @form Assign Roles
* @formNo 149
*/
function form149_import(data_array,import_type)
{
	var data_xml="<user_role_mapping>";
	var counter=1;
	var last_updated=get_my_time();
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</user_role_mapping><separator></separator><user_role_mapping>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<role_name>"+row.role_name+"</role_name>" +
				"<username>"+row.username+"</username>"+
				"<status>"+row.status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	
	data_xml+="</user_role_mapping>";
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
	var new_id=parseFloat(get_new_key());
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
	var new_id=parseFloat(get_new_key());
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
							"<id>"+(parseFloat(get_new_key())+Math.round(Math.random()*100))+"</id>" +
							"<product_name>"+row.product_name+"</product_name>" +
							"<batch>"+row.product_name+"</batch>" +
							"<quantity>"+new_quantity+"</quantity>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</inventory_adjust>";
					if(is_online())
					{
						server_create_simple_no_warning(adjust_xml);
					}
					else
					{
						local_create_simple_no_warning(adjust_xml);
					}
				}
			});
		}
	});

	data_xml+="</product_instances>";
	
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
	var new_id=parseFloat(get_new_key());
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
	var new_id=parseFloat(get_new_key());
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
* @form Manage sale prices
* @formNo 166
*/
function form166_import(data_array,import_type)
{
	var data_xml="<product_instances>";
	var counter=1;
	var new_id=parseFloat(get_new_key());
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
				"<sale_price>"+row.sale_price+"</sale_price>" +
				"<cost_price>"+row.cost_price+"</cost_price>" +
				"<mrp>"+row.mrp+"</mrp>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});

	data_xml+="</product_instances>";
	
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

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<channel>"+row.channel+"</channel>" +
				"<item>"+row.sku+"</item>" +
				"<sale_price>"+row.price+"</sale_price>"+
				"<freight>"+row.freight+"</freight>"+
				"<discount_customer>"+row.discount_customer+"</discount_customer>"+
				"<gateway_charges>"+row.gateway_charges+"</gateway_charges>"+
				"<storage_charges>"+row.storage_charges+"</storage_charges>"+
				"<total_charges>"+row.total_charges+"</total_charges>"+
				"<service_tax>"+row.service_tax+"</service_tax>"+
				"<total_payable>"+row.total_payable+"</total_payable>"+
				"<total_receivable>"+row.total_receivable+"</total_receivable>"+
				"<profit_mrp>"+row.profit_mrp+"</profit_mrp>"+
				"<profit_sp>"+row.profit_sp+"</profit_sp>"+
				"<profit>"+row.profit+"</profit>"+
				"<latest>"+row.latest+"</latest>"+				
				"<from_time>"+get_raw_time(row.from_time)+"</from_time>" +
				"<to_time>"+get_raw_time(row.to_time)+"</to_time>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</channel_prices>";
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
				"<channel_system_sku>"+row.vendor_sku+"</channel_system_sku>" +
				"<system_sku>"+row.system_sku+"</system_sku>"+
				"<item_desc>"+row.item_desc+"</item_desc>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</sku_mapping>";
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
* @form Create purchase orders (CPS)
* @formNo 178
*/
function form178_import(data_array,import_type)
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
				"<amount>"+row.amount+"</amount>" +
				"<tax>"+row.tax+"</tax>" +
				"<total>"+row.total+"</total>" +
				"<mrp>"+row.mrp+"</mrp>"+
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
* @form Manage Purchase orders
* @formNo 179
*/
function form179_import(data_array,import_type)
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
				"<priority>"+row.priority+"</priority>" +
				"<amount>"+row.amount+"</amount>" +
				"<tax>"+row.tax+"</tax>" +
				"<total>"+row.total+"</total>" +
				"<order_num>"+row.order_num+"</order_num>" +
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
* @form Create sale order (CPS)
* @formNo 180
*/
function form180_import(data_array,import_type)
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
				"<quantity>"+row.quantity+"</quantity>" +
				"<mrp>"+row.mrp+"</mrp>" +
				"<price>"+row.price+"</price>" +
				"<amount>"+row.amount+"</amount>" +
				"<tax>"+row.tax+"</tax>" +
				"<total>"+row.total+"</total>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</sale_order_items>";
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
* @form Manage sale order (CPS)
* @formNo 181
*/
function form181_import(data_array,import_type)
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
				"<order_num>"+row.order_num+"</order_num>" +
				"<order_date>"+get_raw_time(row.order_date)+"</order_date>" +
				"<type>"+row.type+"</type>" +
				"<status>"+row.status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</sale_orders>";
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
* @form Update Inventory (CPS)
* @formNo 183
*/
function form183_import(data_array,import_type)
{
	var data_xml="<product_instances>";
	var counter=1;
	var new_id=parseFloat(get_new_key());
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
* @form Manage Values list
* @formNo 191
*/
function form191_import(data_array,import_type)
{
	var data_xml="<values_list>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</values_list><separator></separator><values_list>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<tablename>"+row.tablename+"</tablename>" +
				"<listname>"+row.listname+"</listname>" +
				"<name>"+row.name+"</name>"+
				"<status>"+row.status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</values_list>";
	
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
* @form Supplier Item Mapping
* @formNo 197
*/
function form197_import(data_array,import_type)
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
				"<supplier>"+row.supplier+"</supplier>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</supplier_item_mapping>";
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
* @form Manage sale order (multi-register)
* @formNo 203
*/
function form203_import(data_array,import_type)
{
	var data_xml="<logistics_orders>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</logistics_orders><separator></separator><logistics_orders>";
		}
				counter+=1;
		
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}
		var order_history=[];
		var history_object=new Object();
		history_object.timeStamp=get_raw_time(row['Dispatch Date']);
		history_object.details="Order dispatched from merchant";
		history_object.location=row['Merchant Name'];
		history_object.status="dispatched";
		order_history.push(history_object);
		var order_history_string=JSON.stringify(order_history);
		
		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<awb_num>"+row['AWB No.']+"</awb_num>"+
                "<type>"+row['Type']+"</type>"+
                "<order_num>"+row['Order No.']+"</order_num>"+
                "<manifest_id>"+row['Manifest ID']+"</manifest_id>"+
                "<merchant_name>"+row['Merchant Name']+"</merchant_name>"+
                "<ship_to>"+row['Ship To']+"</ship_to>"+
                "<address1>"+row['Address1']+"</address1>"+
                "<address2>"+row['Address2']+"</address2>"+
                "<city>"+row['City']+"</city>"+
                "<state>"+row['State']+"</state>"+
                "<pincode>"+row['Pincode']+"</pincode>"+
                "<phone>"+row['Mobile number']+"</phone>"+
                "<telephone>"+row['Tel. Number']+"</telephone>"+
                "<weight>"+row['Weight']+"</weight>"+
                "<declared_value>"+row['Declared Value']+"</declared_value>"+
                "<collectable_value>"+row['Collectable Value']+"</collectable_value>"+
                "<vendor_code>"+row['Vendor Code']+"</vendor_code>"+
                "<shipper_name>"+row['Shipper Name']+"</shipper_name>"+
                "<return_address1>"+row['Return Address1']+"</return_address1>"+
                "<return_address2>"+row['Return Address2']+"</return_address2>"+
                "<return_address3>"+row['Return Address3']+"</return_address3>"+
                "<return_pincode>"+row['Return Pin']+"</return_pincode>"+
                "<len>"+row['Length ( Cms )']+"</len>"+
                "<breadth>"+row['Breadth ( Cms )']+"</breadth>"+
                "<height>"+row['Height ( Cms )']+"</height>"+
                "<pieces>"+row['Pieces']+"</pieces>"+
                "<carrier_account>"+row['Carrier Account']+"</carrier_account>"+
                "<carrier_name>"+row['Carrier Name']+"</carrier_name>"+
                "<manifest_type>"+row['Manifest Type']+"</manifest_type>"+
                "<dispatch_date>"+get_raw_time(row['Dispatch Date'])+"</dispatch_date>"+
                "<import_date>"+get_raw_time(get_my_date())+"</import_date>"+
                "<notes>"+row['Notes']+"</notes>"+
                "<pickup_location>"+row['Pickup Location']+"</pickup_location>"+
                "<pickup_by>"+row['Pickup By']+"</pickup_by>"+
                "<sku>"+row['Prod/SKU code']+"</sku>"+
                "<product_name>"+row['Product name']+"</product_name>"+
                "<order_history>"+order_history_string+"</order_history>"+
                "<status>picked</status>"+
                "<last_updated>"+last_updated+"</last_updated>" +
				"</row>";							
	});
	data_xml+="</logistics_orders>";
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
* @form manage DRS
* @formNo 201
*/
function form201_import(data_array,import_type)
{
	var data_xml="<drs>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</drs><separator></separator><drs>";
		}
		
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<drs_num>"+row.drs_num+"</drs_num>" +
				"<employee>"+row.employee+"</employee>" +
				"<drs_time>"+get_raw_time(row.drs_time)+"</drs_time>" +
				"<status>"+row.status+"</status>"+
				"<type>"+row.type+"</type>"+
				"<collectable_amount>"+row.collectable_amount+"</collectable_amount>"+
				"<collected_amount>"+row.collected_amount+"</collected_amount>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</drs>";
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
* @form Update Inventory (aurilion)
* @formNo 207
*/
function form207_import(data_array,import_type)
{
	var data_xml="<product_instances>";
	var counter=1;
	var new_id=parseFloat(get_new_key());
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
				"<mrp>"+row.mrp+"</mrp>" +
				"<cost_price>"+row.cost_price+"</cost_price>" +
				"<sale_price>"+row.sale_price+"</sale_price>" +
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
* @form Sale leads (followups)
* @formNo 213
*/
function form213_import(data_array,import_type)
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
	console.log(data_xml);
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
* @form Manage Projects (CPS)
* @formNo 220
*/
function form220_import(data_array,import_type)
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
				"<priority>"+row.priority+"</priority>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	
	data_xml+="</projects>";
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
* @form Timesheet
* @formNo 221
*/
function form221_import(data_array,import_type)
{
	var data_xml="<timesheet>";
	var counter=1;
	var last_updated=get_my_time();
	
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</timesheet><separator></separator><timesheet>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<acc_name>"+row.acc_name+"</acc_name>" +
				"<date>"+get_raw_time(row.date)+"</date>" +
				"<hours_worked>"+row.hours_worked+"</hours_worked>" +
				"<source>project</source>" +
				"<source_name>"+row.project+"</source_name>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	
	data_xml+="</timesheet>";
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
* @form Delivery Run
* @formNo 226
*/
function form226_import(data_array,import_type)
{
	var data_xml="<delivery_run>";
	var counter=1;
	var last_updated=get_my_time();
	
	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</delivery_run><separator></separator><delivery_run>";
		}
		counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<person>"+row.person+"</person>" +
				"<date>"+get_raw_time(row.date)+"</date>" +
				"<starting_km>"+row.starting_km+"</starting_km>" +
				"<ending_km>"+row.ending_km+"</ending_km>" +
				"<total_run>"+row.total_run+"</total_run>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	
	data_xml+="</delivery_run>";
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
* @form Manage Products (without tax)
* @formNo 234
*/
function form234_import(data_array,import_type)
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
				"<name unique='yes'>"+row.name+"</name>" +
				"<make>"+row.make+"</make>" +
				"<description>"+row.description+"</description>" +
				"<bar_code>"+row.bar_code+"</bar_code>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
		data2_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<product_name>"+row.name+"</product_name>" +
				"<batch>"+row.name+"</batch>" +
				"<cost_price>"+row.cost_price+"</cost_price>" +
				"<sale_price>"+row.sale_price+"</sale_price>" +
				"<mrp>"+row.mrp+"</mrp>" +
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