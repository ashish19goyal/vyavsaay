/**
 * @form manage customers
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
