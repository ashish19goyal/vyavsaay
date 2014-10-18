
/**
* @form Update Inventory
* @formNo 1
*/
function form1_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<product_instances>" +
				"<id>"+row.id+"</id>" +
				"<product_name>"+row.product_name+"</product_name>" +
				"<batch>"+row.batch+"</batch>" +
				"<price>"+row.price+"</price>" +
				"<expiry>"+row.expiry+"</expiry>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</product_instances>";
		if(import_type=='create_new')
		{
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
			if(is_online())
			{	
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
}


/**
* @form Manage Assets
* @formNo 5
*/
function form5_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<assets>" +
				"<id>"+row.id+"</id>" +
				"<name unique='yes'>"+row.name+"</name>" +
				"<date_inc>"+row.date_inc+"</date_inc>" +
				"<owner>"+row.owner+"</owner>" +
				"<activity>"+row.activity+"</activity>" +
				"<value>"+row.value+"</value>" +
				"<type>"+row.type+"</type>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</assets>";
		var value_xml="<asset_valuations>" +
				"<id>"+get_new_key()+"</id>" +
				"<date_valuated>"+get_my_date()+"</date_valuated>" +
				"<value>"+row.value+"</value>" +
				"<asset_name>"+row.name+"</asset_name>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</asset_valuations>";
		var maintenance_xml="<asset_maintenance>" +
				"<id>"+get_new_key()+"</id>" +
				"<date_maintained>"+get_my_date()+"</date_maintained>" +
				"<activity>"+row.activity+"</activity>" +
				"<asset_name>"+row.name+"</asset_name>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</asset_maintenance>";
		if(import_type=='create_new')
		{
			if(is_online())
			{
				server_create_simple(data_xml);
				server_create_simple(value_xml);
				server_create_simple(maintenance_xml);
			}
			else
			{
				local_create_simple(data_xml);
				local_create_simple(value_xml);
				local_create_simple(maintenance_xml);
			}
		}
		else
		{
			if(is_online())
			{	
				server_update_simple(data_xml);
				server_update_simple(value_xml);
				server_update_simple(maintenance_xml);
			}
			else
			{
				local_update_simple(data_xml);
				local_update_simple(value_xml);
				local_update_simple(maintenance_xml);
			}
		}
	});
};


/**
* @form Manage Staff
* @formNo 8
*/
function form8_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<staff>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<phone>"+row.phone+"</phone>" +
				"<email>"+row.email+"</email>" +
				"<acc_name unique='yes'>"+row.acc_name+"</acc_name>" +
				"<joining_date>"+row.joining_date+"</joining_date>" +
				"<skills>"+row.skills+"</skills>" +
				"<qualification>"+row.qualification+"</qualification>" +
				"<fixed_comp>"+row.fixed_comp+"</fixed_comp>" +
				"<variable_comp_rate>"+row.variable_comp_rate+"</variable_comp_rate>" +
				"<monthly_hours>"+row.monthly_hours+"</monthly_hours>" +
				"<allowed_pto>"+row.allowed_pto+"</allowed_pto>" +
				"<status>"+row.status+"</status>" +
				"<notes>"+row.notes+"</notes>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</staff>";
		var account_xml="<accounts>" +
				"<id>"+row.id+"</id>" +
				"<acc_name>"+row.acc_name+"</acc_name>" +
				"<balance>0</balance>" +
				"<description></description>" +
				"<type>staff</type>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</accounts>";
		var address_xml="<address>" +
				"<id>"+row.id+"</id>" +
				"<address>"+row.address+"</address>" +
				"<street>"+row.street+"</street>" +
				"<state>"+row.state+"</state>" +
				"<country>"+row.country+"</country>" +
				"<status>pending analysis</status>" +
				"<acc_type>staff</acc_type>" +
				"<acc_name>"+row.acc_name+"</acc_name>" +
				"</address>";
		if(import_type=='create_new')
		{
			if(is_online())
			{
				server_create_simple(data_xml);
				server_create_simple(account_xml);
				server_create_simple(address_xml);
			}
			else
			{
				local_create_simple(data_xml);
				local_create_simple(account_xml);
				local_create_simple(address_xml);
			}
		}
		else
		{
			if(is_online())
			{	
				server_update_simple(data_xml);
				server_update_simple(account_xml);
				server_update_simple(address_xml);
			}
			else
			{
				local_update_simple(data_xml);
				local_update_simple(account_xml);
				local_update_simple(address_xml);
			}
		}		
	});
};


/**
* @form Manage Payments
* @formNo 11
*/
function form11_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var receiver=row.acc_name;
		var giver="master";
		if(row.type=='received')
		{
			receiver='master';
			giver=row.acc_name;
		}
		var data_xml="<payments>" +
				"<id>"+row.id+"</id>" +
				"<type>"+row.type+"</type>" +
				"<total_amount>"+row.total_amount+"</total_amount>" +
				"<paid_amount>"+row.paid_amount+"</paid_amount>" +
				"<acc_name>"+row.acc_name+"</acc_name>" +
				"<due_date>"+row.due_date+"</due_date>" +
				"<status>"+row.status+"</status>" +
				"<date>"+row.date+"</date>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</payments>";
		var transaction_xml="<transactions>" +
				"<id>"+row.id+"</id>" +
				"<trans_date>"+row.date+"</trans_date>" +
				"<amount>"+row.total_amount+"</amount>" +
				"<receiver>"+receiver+"</receiver>" +
				"<giver>"+giver+"</giver>" +
				"<taxable>false</taxable>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</transactions>";
		if(import_type=='create_new')
		{
			if(is_online())
			{
				server_create_simple(data_xml);
				server_create_simple(transaction_xml);
			}
			else
			{
				local_create_simple(data_xml);
				local_create_simple(transaction_xml);
			}
		}
		else
		{
			if(is_online())
			{	
				server_update_simple(data_xml);
				server_update_simple(transaction_xml);
			}
			else
			{
				local_update_simple(data_xml);
				local_update_simple(transaction_xml);
			}
		}
	});
};


/**
* @form Manage Tasks
* @formNo 14
*/
function form14_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<task_instances>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<description>"+row.description+"</description>" +
				"<assignee>"+row.assignee+"</assignee>" +
				"<status>"+row.status+"</status>" +
				"<t_due>"+row.t_due+"</t_due>" +
				"<t_executed>"+row.t_executed+"</t_executed>" +
				"<t_initiated>"+row.t_initiated+"</t_initiated>" +
				"<tasks_hours>"+row.task_hours+"</task_hours>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</task_instances>";
		if(import_type=='create_new')
		{
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
			if(is_online())
			{	
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
};


/**
* @form Manage Customers
* @formNo 30
*/
function form30_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<customers>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<phone>"+row.phone+"</phone>" +
				"<email>"+row.email+"</email>" +
				"<acc_name unique='yes'>"+row.acc_name+"</acc_name>" +
				"<status>"+row.status+"</status>" +
				"<notes>"+row.notes+"</notes>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</customers>";
		var account_xml="<accounts>" +
				"<id>"+row.id+"</id>" +
				"<acc_name>"+row.acc_name+"</acc_name>" +
				"<balance>0</balance>" +
				"<description></description>" +
				"<type>customer</type>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</accounts>";
		var address_xml="<address>" +
				"<id>"+row.id+"</id>" +
				"<address>"+row.address+"</address>" +
				"<street>"+row.street+"</street>" +
				"<state>"+row.state+"</state>" +
				"<country>"+row.country+"</country>" +
				"<status>pending analysis</status>" +
				"<acc_type>customer</acc_type>" +
				"<acc_name>"+row.acc_name+"</acc_name>" +
				"</address>";
		if(import_type=='create_new')
		{
			if(is_online())
			{
				server_create_simple(data_xml);
				server_create_simple(account_xml);
				server_create_simple(address_xml);
			}
			else
			{
				local_create_simple(data_xml);
				local_create_simple(account_xml);
				local_create_simple(address_xml);
			}
		}
		else
		{
			if(is_online())
			{	
				server_update_simple(data_xml);
				server_update_simple(account_xml);
				server_update_simple(address_xml);
			}
			else
			{
				local_update_simple(data_xml);
				local_update_simple(account_xml);
				local_update_simple(address_xml);
			}
		}
	});
}

/**
* @form Manage Offers
* @formNo 35
*/
function form35_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<offers>" +
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
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</offers>";
		if(import_type=='create_new')
		{
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
			if(is_online())
			{	
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
};


/**
* @form Store Placement
* @formNo 38
*/
function form38_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<area_utilization>" +
				"<id>"+row.id+"</id>" +
				"<product_name>"+row.product_name+"</product_name>" +
				"<batch>"+row.batch+"</batch>" +
				"<name>"+row.name+"</name>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</area_utilization>";
		if(import_type=='create_new')
		{
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
			if(is_online())
			{	
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
};


/**
* @form Manage Products
* @formNo 39
*/
function form39_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<product_master>" +
				"<id>"+row.id+"</id>" +
				"<name unique='yes'>"+row.name+"</name>" +
				"<make>"+row.make+"</make>" +
				"<description>"+row.description+"</description>" +
				"<manufactured>"+row.manufactured+"</manufactured>" +
				"<unit>"+row.unit+"</unit>" +
				"<tags>"+row.tags+"</tags>" +
				"<taxable>"+row.taxable+"</taxable>" +
				"<tax>"+row.tax+"</tax>" +
				"<weight>"+row.weight+"</weight>" +
				"<height>"+row.height+"</height>" +
				"<length>"+row.length+"</length>" +
				"<width>"+row.width+"</width>" +
				"</product_master>";
		if(import_type=='create_new')
		{
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
			if(is_online())
			{	
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
};


/**
* @form Manage suppliers
* @formNo 40
*/
function form40_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<suppliers>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<phone>"+row.phone+"</phone>" +
				"<email>"+row.email+"</email>" +
				"<acc_name unique='yes'>"+row.acc_name+"</acc_name>" +
				"<notes>"+row.notes+"</notes>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</suppliers>";
		var account_xml="<accounts>" +
				"<id>"+row.id+"</id>" +
				"<acc_name>"+row.acc_name+"</acc_name>" +
				"<balance>0</balance>" +
				"<description></description>" +
				"<type>customer</type>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</accounts>";
		var address_xml="<address>" +
				"<id>"+row.id+"</id>" +
				"<address>"+row.address+"</address>" +
				"<street>"+row.street+"</street>" +
				"<state>"+row.state+"</state>" +
				"<country>"+row.country+"</country>" +
				"<status>pending analysis</status>" +
				"<acc_type>customer</acc_type>" +
				"<acc_name>"+row.acc_name+"</acc_name>" +
				"</address>";
		if(import_type=='create_new')
		{
			if(is_online())
			{
				server_create_simple(data_xml);
				server_create_simple(account_xml);
				server_create_simple(address_xml);
			}
			else
			{
				local_create_simple(data_xml);
				local_create_simple(account_xml);
				local_create_simple(address_xml);
			}
		}
		else
		{
			if(is_online())
			{	
				server_update_simple(data_xml);
				server_update_simple(account_xml);
				server_update_simple(address_xml);
			}
			else
			{
				local_update_simple(data_xml);
				local_update_simple(account_xml);
				local_update_simple(address_xml);
			}
		}
	});
};


/**
* @form Expense Register
* @formNo 56
*/
function form56_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var receiver=row.acc_name;
		var giver="master";
		var data_xml="<expenses>" +
				"<id>"+row.id+"</id>" +
				"<amount>"+row.amount+"</amount>" +
				"<expense_date>"+row.expense_date+"</expense_date>" +
				"<to_acc>"+row.to_acc+"</to_acc>" +
				"<description>"+row.description+"</description>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</expenses>";
		var transaction_xml="<transactions>" +
				"<id>"+row.id+"</id>" +
				"<trans_date>"+row.date+"</trans_date>" +
				"<amount>"+row.amount+"</amount>" +
				"<receiver>"+receiver+"</receiver>" +
				"<giver>"+giver+"</giver>" +
				"<taxable>false</taxable>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</transactions>";
		if(import_type=='create_new')
		{
			if(is_online())
			{
				server_create_simple(data_xml);
				server_create_simple(transaction_xml);
			}
			else
			{
				local_create_simple(data_xml);
				local_create_simple(transaction_xml);
			}
		}
		else
		{
			if(is_online())
			{	
				server_update_simple(data_xml);
				server_update_simple(transaction_xml);
			}
			else
			{
				local_update_simple(data_xml);
				local_update_simple(transaction_xml);
			}
		}
	});
};

/**
* @form manage services
* @formNo 57
*/
function form57_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<services>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<description>"+row.description+"</description>" +
				"<price>"+row.price+"</price>" +
				"<tags>"+row.tags+"</tags>" +
				"<taxable>"+row.taxable+"</taxable>" +
				"<tax>"+row.tax+"</tax>" +
				"<duration>"+row.duration+"</duration>" +
				"<warranty>"+row.warranty+"</warranty>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</services>";
		if(import_type=='create_new')
		{
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
			if(is_online())
			{	
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
};

/**
* @form Service pre-requisites
* @formNo 58
*/
function form58_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<pre_requisites>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<type>"+row.type+"</type>" +
				"<requisite_type>"+row.requisite_type+"</requisite_type>" +
				"<requisite_name>"+row.requisite_name+"</requisite_name>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</pre_requisites>";
		if(import_type=='create_new')
		{
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
			if(is_online())
			{	
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
};

/**
* @form product pre-requisites
* @formNo 59
*/
function form59_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<pre_requisites>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<type>"+row.type+"</type>" +
				"<requisite_type>"+row.requisite_type+"</requisite_type>" +
				"<requisite_name>"+row.requisite_name+"</requisite_name>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</pre_requisites>";
		if(import_type=='create_new')
		{
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
			if(is_online())
			{	
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
};


/**
* @form Product Categories
* @formNo 60
*/
function form60_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<categories>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<category>"+row.category+"</category>" +
				"<type>"+row.type+"</type>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</categories>";
		if(import_type=='create_new')
		{
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
			if(is_online())
			{	
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
};

/**
* @form Service Categories
* @formNo 61
*/
function form61_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<categories>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<category>"+row.category+"</category>" +
				"<type>"+row.type+"</type>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</categories>";
		if(import_type=='create_new')
		{
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
			if(is_online())
			{	
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
};

/**
* @form Product reviews
* @formNo 62
*/
function form62_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<reviews>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<reviewer>"+row.reviewer+"</reviewer>" +
				"<detail>"+row.detail+"</detail>" +
				"<rating>"+row.rating+"</rating>" +
				"<type>"+row.type+"</type>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</reviews>";
		if(import_type=='create_new')
		{
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
			if(is_online())
			{	
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
};

/**
* @form Service reviews
* @formNo 63
*/
function form63_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<reviews>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<reviewer>"+row.reviewer+"</reviewer>" +
				"<detail>"+row.detail+"</detail>" +
				"<rating>"+row.rating+"</rating>" +
				"<type>"+row.type+"</type>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</reviews>";
		if(import_type=='create_new')
		{
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
			if(is_online())
			{	
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
};

/**
* @form Service Cross sells
* @formNo 64
*/
function form64_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<cross_sells>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<type>"+row.type+"</type>" +
				"<cross_name>"+row.cross_name+"</cross_name>" +
				"<cross_type>"+row.cross_type+"</cross_type>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</cross_sells>";
		if(import_type=='create_new')
		{
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
			if(is_online())
			{	
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
};

/**
* @form Service Taxes
* @formNo 65
*/
function form65_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<services>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<taxable>"+row.taxable+"</taxable>" +
				"<tax>"+row.tax+"</tax>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</services>";
		if(import_type=='create_new')
		{
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
			if(is_online())
			{	
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
};


/**
* @form Product Cross sells
* @formNo 66
*/
function form66_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<cross_sells>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<type>"+row.type+"</type>" +
				"<cross_name>"+row.cross_name+"</cross_name>" +
				"<cross_type>"+row.cross_type+"</cross_type>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</cross_sells>";
		if(import_type=='create_new')
		{
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
			if(is_online())
			{	
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
};


/**
* @form Product dimensions
* @formNo 67
*/
function form67_import(data_array,import_type)
{
	var data_array=['id','name','weight','length','width','height'];
	data_array.forEach(function(row)
	{
		var data_xml="<product_master>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<weight>"+row.weight+"</weight>" +
				"<length>"+row.length+"</length>" +
				"<width>"+row.width+"</width>" +
				"<height>"+row.height+"</height>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</product_master>";
		if(import_type=='create_new')
		{
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
			if(is_online())
			{	
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
};

/**
* @form Product Taxes
* @formNo 68
*/
function form68_import(data_array,import_type)
{
	data_array.forEach(function(row)
	{
		var data_xml="<product_master>" +
				"<id>"+row.id+"</id>" +
				"<name>"+row.name+"</name>" +
				"<taxable>"+row.taxable+"</taxable>" +
				"<tax>"+row.tax+"</tax>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</product_master>";
		if(import_type=='create_new')
		{
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
			if(is_online())
			{	
				server_update_simple(data_xml);
			}
			else
			{
				local_update_simple(data_xml);
			}
		}
	});
};
