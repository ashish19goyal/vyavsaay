/**
  * this function prepares the table for update inventory form
 * @form Update Inventory
 * @formNo 1
 */
function form1_ini()
{
	var fid=$("#form1_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form1_header');
	
	var fname=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;
	
	var columns="<product_instances>" +
		"<id>"+fid+"</id>" +
		"<batch>"+fbatch+"</batch>" +
		"<product_name>"+fname+"</product_name>" +
		"<cost_price></cost_price>" +
		"<sale_price></sale_price>" +
		"<expiry></expiry>" +
		"<quantity></quantity>" +
		"</product_instances>";
	
	$('#form1_body').html("");
	
	fetch_requested_data('form1',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form1_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form1_"+result.id+"' value='"+result.product_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form1_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Cost price'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form1_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.cost_price+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Sale price'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form1_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.sale_price+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Expiry'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form1_"+result.id+"' ondblclick='set_editable($(this));' value='"+get_my_past_date(result.expiry)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form1_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form1_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form1_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form1_"+result.id+"' onclick='form1_delete_item($(this));'>";
						rowsHTML+="<input type='button' class='process_ok_icon' form='form1_"+result.id+"' onclick=\"modal27_action('"+result.product_name+"');\">";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form1_body').prepend(rowsHTML);
			var fields=document.getElementById("form1_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form1_update_item(fields);
			});
		});
		resize_input();
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'inventory');
		});

	});
};


/**
 * this function prepares the table for manage assets form
 * @form Manage Assets
 * @formNo 5
 */
function form5_ini()
{
	var fid=$("#form5_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form5_header');
		
	var fasset=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	
	var columns="<assets>" +
			"<id>"+fid+"</id>" +
			"<name>"+fasset+"</name>" +
			"<type>"+ftype+"</type>" +
			"<description></description>" +
			"<date_inc></date_inc>" +
			"<ownership_type></ownership_type>" +
			"<ownership_contract></ownership_contract>" +
			"<make></make>" +
			"<maintained_by></maintained_by>" +
			"<maintenance_contract></maintenance_contract>" +
			"<maintenance_contact></maintenance_contact>" +
			"<maintenance_activities></maintenance_activities>" +
			"<initial_value></initial_value>" +
			"<current_value></current_value>" +
			"<asset_location></asset_location>" +
			"</assets>";
	
	$('#form5_body').html("");

	fetch_requested_data('form5',columns,function(results)
	{	
		results.forEach(function(results)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form5_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form5_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form5_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<textarea readonly='readonly' form='form5_"+result.id+"'>"+result.description+"</textarea>";
						rowsHTML+="<img class='add_icon' form='form5_"+result.id+"' value='saved' onclick='modal9_action($(this));'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form5_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form5_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form5_"+result.id+"' value='saved' onclick='form5_delete_item($(this));'>";	
						rowsHTML+="<input type='hidden' form='form5_"+result.id+"' value='"+result.date_inc+"'>";
						rowsHTML+="<input type='hidden' form='form5_"+result.id+"' value='"+result.ownership_type+"'>";
						rowsHTML+="<input type='hidden' form='form5_"+result.id+"' value='"+result.ownership_contract+"'>";
						rowsHTML+="<input type='hidden' form='form5_"+result.id+"' value='"+result.make+"'>";
						rowsHTML+="<input type='hidden' form='form5_"+result.id+"' value='"+result.maintained_by+"'>";
						rowsHTML+="<input type='hidden' form='form5_"+result.id+"' value='"+result.maintenance_contract+"'>";
						rowsHTML+="<input type='hidden' form='form5_"+result.id+"' value='"+result.maintenance_contact+"'>";
						rowsHTML+="<input type='hidden' form='form5_"+result.id+"' value='"+result.maintenance_activities+"'>";
						rowsHTML+="<input type='hidden' form='form5_"+result.id+"' value='"+result.initial_value+"'>";
						rowsHTML+="<input type='hidden' form='form5_"+result.id+"' value='"+result.current_value+"'>";
						rowsHTML+="<input type='hidden' form='form5_"+result.id+"' value='"+result.asset_location+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form5_body').prepend(rowsHTML);
			
			var fields=document.getElementById("form5_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form5_update_item(fields);
			});
		});
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'assets');
		});
	});
};



/**
 * @form Attendance
 * @formNo 7
 */
function form7_ini()
{
	var fid=$("#form7_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var master_fields=document.getElementById('form7_master');
	var fdate=master_fields.elements[1].value;
	
	var filter_fields=document.getElementById('form7_header');
	var fstaff=filter_fields.elements[0].value;
	var fattendance=filter_fields.elements[1].value;
	
	var columns="<attendance>" +
			"<id>"+fid+"</id>" +
			"<date>"+get_raw_time(fdate)+"</date>" +
			"<acc_name>"+fstaff+"</acc_name>" +
			"<presence>"+fattendance+"</presence>" +
			"<hours_worked></hours_worked>" +
			"</attendance>";

	$('#form7_body').html("");

	fetch_requested_data('form7',columns,function(results)
	{
		if(results.length===0)
		{
			var staff_columns="<staff>" +
					"<acc_name></acc_name>" +
					"<status>active</status>" +
					"</staff>";
			fetch_requested_data('form7',staff_columns,function(staff_names)
			{
				staff_names.forEach(function(staff_name)
				{
					var rowsHTML="";
					var data_id=get_new_key();
					rowsHTML+="<tr>";
						rowsHTML+="<form id='form7_"+data_id+"'></form>";
							rowsHTML+="<td>";
								rowsHTML+="<input type='text' readonly='readonly' form='form7_"+data_id+"' value='"+staff_name.acc_name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td>";
								rowsHTML+="<input type='text' form='form7_"+data_id+"' value='present' ondblclick='set_editable($(this));'>";
							rowsHTML+="</td>";
							rowsHTML+="<td>";
								rowsHTML+="<input type='number' form='form7_"+data_id+"' value='8' ondblclick='set_editable($(this));'>";
							rowsHTML+="</td>";
							rowsHTML+="<td>";
								rowsHTML+="<input type='hidden' form='form7_"+data_id+"' value='"+data_id+"'>";
								rowsHTML+="<input type='submit' class='save_icon' id='save_form7_"+data_id+"' form='form7_"+data_id+"' value='saved'>";
								rowsHTML+="<input type='hidden' form='form7_"+data_id+"' value='"+get_raw_time(fdate)+"'>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form7_body').prepend(rowsHTML);
					
					var fields=document.getElementById("form7_"+data_id);
					var attendance_filter=fields.elements[1];
					set_static_value_list('attendance','presence',attendance_filter);

					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form7_create_item(fields);
					});
				});
			});
		}
		else
		{
			results.forEach(function(result)
			{
				var rowsHTML="";
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form7_"+result.id+"'></form>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form7_"+result.id+"' value='"+result.acc_name+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form7_"+result.id+"' value='"+result.presence+"' ondblclick='set_editable($(this));'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='number' readonly='readonly' form='form7_"+result.id+"' value='"+result.hours_worked+"' ondblclick='set_editable($(this));'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='hidden' form='form7_"+result.id+"' value='"+result.id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' id='save_form7_"+result.id+"' form='form7_"+result.id+"' value='saved'>";
							rowsHTML+="<input type='hidden' form='form7_"+result.id+"' value='"+result.date+"'>";
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
				
				$('#form7_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form7_"+result.id);
				var attendance_filter=fields.elements[1];
				set_static_value_list('attendance','presence',attendance_filter);
				
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form7_update_item(fields);
				});
			});
		}
	});
};



/**
 * this function prepares the table for manage staff form
 * @form Manage Staff
 * @formNo 8
 */
function form8_ini()
{
	var fid=$("#form8_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form8_header');
	
	var fname=filter_fields.elements[0].value;
	var fcontact=filter_fields.elements[1].value;
	var femail=filter_fields.elements[2].value;
	var fstatus=filter_fields.elements[3].value;
	
	var columns="<staff>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<phone>"+fcontact+"</phone>" +
			"<email>"+femail+"</email>" +
			"<status>"+fstatus+"</status>" +
			"<joining_date></joining_date>" +
			"<qualification></qualification>" +
			"<skills></skills>" +
			"<monthly_hours></monthly_hours>" +
			"<fixed_comp></fixed_comp>" +
			"<variable_comp_rate></variable_comp_rate>" +
			"<allowed_pto></allowed_pto>" +
			"<acc_name></acc_name>" +
			"<address></address>" +
			"<street></street>" +
			"<city></city>" +
			"<state></state>" +
			"<country></country>" +
			"<address_status></address_status>" +
			"</staff>";

	$('#form8_body').html("");

	fetch_requested_data('form8',columns,function(results)
	{
		results.forEach(function(result)
		{
			var detail_string="Joined on "+get_my_past_date(result.joining_date)+", Qualification: "+result.qualification+", Skills: "+result.skills+", Salary: Rs."+result.fixed_comp+"+ Rs."+result.variable_comp_rate+"/hour. Allowed "+result.allowed_pto+"/month.";

			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form8_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form8_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form8_"+result.id+"' value='"+result.phone+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form8_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.email+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<textarea wrap='soft' readonly='readonly' form='form8_"+result.id+"'>"+result.address+", "+result.street+", "+result.city+", "+result.state+", "+result.country+"</textarea>";
						rowsHTML+="<img class='edit_icon' wrap='virtual' src='images/edit.jpeg' form='form8_"+result.id+"' onclick='modal17_action($(this));'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<textarea wrap='soft' readonly='readonly' form='form8_"+result.id+"'>"+detail_string+"</textarea>";
						rowsHTML+="<img class='edit_icon' src='images/edit.jpeg' form='form8_"+result.id+"' onclick='modal17_action($(this));'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form8_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form8_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form8_"+result.id+"' value='saved' onclick='form8_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.address+"'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.street+"'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.city+"'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.state+"'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.country+"'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.address_status+"'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+get_my_past_date(result.joining_date)+"'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.qualification+"'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.skills+"'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.fixed_comp+"'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.variable_comp_rate+"'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.allowed_pto+"'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.monthly_hours+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form8_body').prepend(rowsHTML);
			
			var fields=document.getElementById("form8_"+result.id);
			var fstatus=fields.elements[5];
			
			set_static_value_list('staff','status',fstatus);
			
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form8_update_item(fields);
			});
		});
		var export_button=filter_fields.elements[5];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'staff');
		});
	});
};


/**
 * @form New Service Bill
 */
function form10_ini()
{
	var bill_id=$("#form10_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	$('#form10_body').html("");

	if(bill_id!="")
	{
		var bill_columns="<bills>" +
				"<id>"+bill_id+"</id>" +
				"<customer_name></customer_name>" +
				"<total></total>" +
				"<bill_date></bill_date>" +
				"<amount></amount>" +
				"<discount></discount>" +
				"<tax></tax>" +
				"<offer></offer>" +
				"<type>service</type>" +
				"<transaction_id></transaction_id>" +
				"</bills>";
		var bill_items_column="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<unit_price></unit_price>" +
				"<staff></staff>" +
				"<notes></notes>" +
				"<amount></amount>" +
				"<total></total>" +
				"<discount></discount>" +
				"<offer></offer>" +
				"<type></type>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<tax></tax>" +
				"</bill_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			for (var i in bill_results)
			{
				var filter_fields=document.getElementById('form10_master');
				filter_fields.elements[1].value=bill_results[i].customer_name;
				filter_fields.elements[2].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements[3].value=bill_results[i].amount;
				filter_fields.elements[4].value=bill_results[i].discount;
				filter_fields.elements[5].value=bill_results[i].tax;
				filter_fields.elements[6].value=bill_results[i].total;
				filter_fields.elements[7].value=bill_id;
				filter_fields.elements[8].value=bill_results[i].offer;
				filter_fields.elements[9].value=bill_results[i].transaction_id;
				
				$(filter_fields).off('submit');
				$(filter_fields).on("submit", function(event)
				{
					event.preventDefault();
					form10_update_form();
				});
				break;
			}
		});
		/////////////////////////////////////////////////////////////////////////
		
		fetch_requested_data('',bill_items_column,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="";
				var id=result.id;
				rowsHTML+="<tr>";
				rowsHTML+="<form id='form10_"+id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form10_"+id+"' value='"+result.item_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form10_"+id+"' value='"+result.staff+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<textarea readonly='readonly' form='form10_"+id+"'>"+result.notes+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' readonly='readonly' form='form10_"+id+"' value='"+result.unit_price+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+result.total+"'>";
						rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+result.amount+"'>";
						rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+result.discount+"'>";
						rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+result.tax+"'>";
						rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+result.offer+"'>";
						rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form10_"+id+"' id='save_form10_"+id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form10_"+id+"' id='delete_form10_"+id+"' onclick='form10_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form10_"+id+"'>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form10_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form10_"+id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
				});
			});
		});
	}
}


/**
 * this function prepares the table for schedule payments form
 * @form Manage Payments
 * @formNo 11
 */
function form11_ini()
{
	var fid=$("#form11_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form11_header');
	
	var ftype=filter_fields.elements[0].value;
	var faccount=filter_fields.elements[1].value;
	var fdue=filter_fields.elements[2].value;
	var fdate=filter_fields.elements[3].value;
	var fstatus=filter_fields.elements[4].value;
	
	var columns="<payments>" +
			"<id>"+fid+"</id>" +
			"<type>"+ftype+"</type>" +
			"<total_amount></total_amount>" +
			"<paid_amount></paid_amount>" +
			"<acc_name>"+faccount+"</acc_name>" +
			"<due_date>"+fdue+"</due_date>" +
			"<status>"+fstatus+"</status>" +
			"<date>"+fdate+"</date>" +
			"</payments>";

	$('#form11_body').html("");

	fetch_requested_data('form11',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form11_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form11_"+result.id+"' value='"+result.type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form11_"+result.id+"' value='"+result.acc_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form11_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.paid_amount+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form11_"+result.id+"' ondblclick='set_editable($(this));' value='"+get_my_past_date(result.due_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form11_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form11_"+result.id+"' ondblclick='set_editable($(this));' value='"+get_my_past_date(result.date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form11_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form11_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form11_"+result.id+"' value='saved' onclick='form11_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form11_body').prepend(rowsHTML);
			
			var fields=document.getElementById("form11_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form11_update_item(fields);
			});
		});
		var export_button=filter_fields.elements[6];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'payments');
		});

	});
};

/**
 * @form New Products Bill
 */
function form12_ini()
{
	var bill_id=$("#form12_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form12_body').html("");

	if(bill_id!="")
	{
		var bill_columns="<bills>" +
				"<id>"+bill_id+"</id>" +
				"<customer_name></customer_name>" +
				"<total></total>" +
				"<bill_date></bill_date>" +
				"<amount></amount>" +
				"<discount></discount>" +
				"<tax></tax>" +
				"<offer></offer>" +
				"<type>product</type>" +
				"<transaction_id></transaction_id>" +
				"</bills>";
		var bill_items_column="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<batch></batch>" +
				"<unit_price></unit_price>" +
				"<quantity></quantity>" +
				"<amount></amount>" +
				"<total></total>" +
				"<discount></discount>" +
				"<offer></offer>" +
				"<type></type>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<tax></tax>" +
				"<free_with></free_with>" +
				"</bill_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			for (var i in bill_results)
			{
				var filter_fields=document.getElementById('form12_master');
				filter_fields.elements[1].value=bill_results[i].customer_name;
				filter_fields.elements[2].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements[3].value=bill_results[i].amount;
				filter_fields.elements[4].value=bill_results[i].discount;
				filter_fields.elements[5].value=bill_results[i].tax;
				filter_fields.elements[6].value=bill_results[i].total;
				filter_fields.elements[7].value=bill_id;
				filter_fields.elements[8].value=bill_results[i].offer;
				filter_fields.elements[9].value=bill_results[i].transaction_id;
				
				$(filter_fields).off('submit');
				$(filter_fields).on("submit", function(event)
				{
					event.preventDefault();
					form12_update_form();
				});
				break;
			}
		});
		/////////////////////////////////////////////////////////////////////////
		
		fetch_requested_data('',bill_items_column,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="";
				var id=result.id;
				rowsHTML+="<tr>";
				rowsHTML+="<form id='form12_"+id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form12_"+id+"' value='"+result.item_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form12_"+id+"' value='"+result.batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' readonly='readonly' form='form12_"+id+"' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' readonly='readonly' form='form12_"+id+"' value='"+result.unit_price+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' readonly='readonly' form='form12_"+id+"' value='"+result.total+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/details.jpeg' form='form12_"+id+"' value='Details' onclick='modal6_action($(this));'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+result.amount+"'>";
						rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+result.discount+"'>";
						rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+result.tax+"'>";
						rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+result.offer+"'>";
						rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form12_"+id+"' id='save_form12_"+id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form12_"+id+"' id='delete_form12_"+id+"' onclick='form12_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
						rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form12_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form12_"+id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
				});
			});
		});
	}
}


/**
 * this function prepares the table for manage tasks form
 * @form Manage Tasks
 * @formNo 14
 */
function form14_ini()
{
	var fid=$("#form14_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form14_header');
	
	//populating form 
	var ftype=filter_fields.elements[0].value;
	var fassignee=filter_fields.elements[1].value;
	var fdue=filter_fields.elements[2].value;
	var fexecuted=filter_fields.elements[3].value;
	var fstatus=filter_fields.elements[4].value;
	
	var columns="<task_instances>" +
			"<id>"+fid+"</id>" +
			"<name>"+ftype+"</name>" +
			"<description></description>" +
			"<assignee>"+fassignee+"</assignee>" +
			"<t_due>"+fdue+"</t_due>" +
			"<t_executed>"+fexecuted+"</t_executed>" +
			"<t_initiated></t_initiated>" +
			"<tasks_hours></task_hours>" +
			"<status>"+fstatus+"</status>" +
			"</task_instances>";

	$('#form14_body').html("");

	fetch_requested_data('form14',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form14_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form14_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form14_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.description+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form14_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.assignee+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form14_"+result.id+"' ondblclick='set_editable($(this));' value='"+get_my_past_date(result.t_due)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form14_"+result.id+"' ondblclick='set_editable($(this));' value='"+get_my_past_date(result.t_executed)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form14_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' readonly='readonly' form='form14_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form14_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form14_"+result.id+"' value='saved' onclick='form14_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form14_body').prepend(rowsHTML);
			var fields=document.getElementById("form14_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form14_update_item(fields);
			});
		});
		var export_button=filter_fields.elements[6];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'tasks');
		});

	});
};

/**
 * @form Enter Customer Returns
 */
function form15_ini()
{
	var data_id=$("#form15_link").attr('data_id');
	if(data_id==null)
		data_id="";	
	
	$('#form15_body').html("");

	if(data_id!="")
	{
		var return_columns="<customer_returns>" +
				"<id>"+data_id+"</id>" +
				"<customer></customer>" +
				"<total></total>" +
				"<return_date></return_date>" +
				"<tax></tax>" +
				"<type>product</type>" +
				"<transaction_id></transaction_id>" +
				"</customer_returns>";
		var return_items_column="<customer_return_items>" +
				"<id></id>" +
				"<return_id>"+data_id+"</return_id>" +
				"<bill_id></bill_id>" +
				"<item_name></item_name>" +
				"<batch></batch>" +
				"<notes></notes>" +
				"<quantity></quantity>" +
				"<type></type>" +
				"<refund_amount></refund_amount>" +
				"<exchange_batch></exchange_batch>" +
				"<tax></tax>" +
				"</customer_return_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',return_columns,function(return_results)
		{
			for (var i in return_results)
			{
				var filter_fields=document.getElementById('form15_master');
				filter_fields.elements[1].value=return_results[i].customer;
				filter_fields.elements[2].value=get_my_past_date(return_results[i].return_date);
				filter_fields.elements[3].value=return_results[i].total;
				filter_fields.elements[4].value=data_id;
				filter_fields.elements[5].value=return_results[i].transaction_id;
				filter_fields.elements[6].value=return_results[i].tax;
				
				$(filter_fields).off('submit');
				$(filter_fields).on("submit", function(event)
				{
					event.preventDefault();
					form15_update_form();
				});
				break;
			}
		});
		/////////////////////////////////////////////////////////////////////////
		
		fetch_requested_data('',return_items_column,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="";
				var id=result.id;
				rowsHTML+="<tr>";
				rowsHTML+="<form id='form15_"+id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form15_"+id+"' value='"+result.item_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form15_"+id+"' value='"+result.batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form15_"+id+"' value='"+result.notes+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' readonly='readonly' form='form15_"+id+"' value='"+result.quantity+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form15_"+id+"' value='"+result.type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						if(result.type=='refund')
						{
							rowsHTML+="<input type='number' readonly='readonly' step='any' form='form15_"+id+"' value='"+result.refund_amount+"'>";
						}
						else
						{
							rowsHTML+="<input type='text' readonly='readonly' form='form15_"+id+"' value='"+result.exhange_batch+"'>";
						}
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form15_"+id+"' value='"+result.tax+"'>";
						rowsHTML+="<input type='hidden' form='form15_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form15_"+id+"' id='save_form15_"+id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form15_"+id+"' id='delete_form15_"+id+"' onclick='form15_delete_item($(this));'>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form15_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form15_"+id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
				});
			});
		});
	}
}



/**
 * @form Manage customer returns
 * @formNo 16
 */
function form16_ini()
{
	var fid=$("#form16_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form16_header');
	
	//populating form 
	if(fid==="")
		fid=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	
	var columns="<customer_returns>" +
			"<id>"+fid+"</id>" +
			"<customer>"+fname+"</customer>" +
			"<return_date></return_date>" +
			"<total></total>" +
			"<type></type>" +
			"<tax></tax>" +
			"<transaction_id></transaction_id>" +
			"</customer_returns>";

	$('#form16_body').html("");

	fetch_requested_data('form16',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form16_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form16_"+result.id+"' value='"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form16_"+result.id+"' value='"+result.customer+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form16_"+result.id+"' value='"+get_my_past_date(result.return_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' readonly='readonly' form='form16_"+result.id+"' value='"+result.total+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='button' class='edit_icon' form='form16_"+result.id+"' title='Edit Return'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form16_"+result.id+"' title='Delete Return' onclick='form16_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form16_"+result.id+"' value='"+result.transaction_id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form16_body').prepend(rowsHTML);
			var fields=document.getElementById("form16_"+result.id);
			var edit_button=fields.elements[4];
			$(edit_button).on("click", function(event)
			{
				event.preventDefault();
				if(result.type=='product')
					element_display(result.id,'form15');
			});
		});
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'customer_returns');
		});
	});
}

/**
 * @form Manage supplier returns
 * @formNo 17
 */
function form17_ini()
{
	var fid=$("#form17_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form17_header');
	
	//populating form 
	if(fid==="")
		fid=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	
	var columns="<supplier_returns>" +
			"<id>"+fid+"</id>" +
			"<supplier>"+fname+"</supplier>" +
			"<return_date></return_date>" +
			"<total></total>" +
			"<type></type>" +
			"<transaction_id></transaction_id>" +
			"</supplier_returns>";

	$('#form17_body').html("");

	fetch_requested_data('form17',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form17_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form17_"+result.id+"' value='"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form17_"+result.id+"' value='"+result.supplier+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form17_"+result.id+"' value='"+get_my_past_date(result.return_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' readonly='readonly' form='form17_"+result.id+"' value='"+result.total+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='button' class='edit_icon' form='form17_"+result.id+"' title='Edit Return'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form17_"+result.id+"' title='Delete Return' onclick='form17_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form17_"+result.id+"' value='"+result.transaction_id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form17_body').prepend(rowsHTML);
			var fields=document.getElementById("form17_"+result.id);
			var edit_button=fields.elements[4];
			$(edit_button).on("click", function(event)
			{
				event.preventDefault();
				if(result.type=='product')
					element_display(result.id,'form19');
			});
		});
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'supplier_returns');
		});
	});
}

/**
 * @form Enter Supplier Returns
 */
function form19_ini()
{
	var data_id=$("#form19_link").attr('data_id');
	if(data_id==null)
		data_id="";	
	
	$('#form19_body').html("");

	if(data_id!="")
	{
		var return_columns="<supplier_returns>" +
				"<id>"+data_id+"</id>" +
				"<supplier></supplier>" +
				"<total></total>" +
				"<return_date></return_date>" +
				"<type>product</type>" +
				"<transaction_id></transaction_id>" +
				"</supplier_returns>";
		var return_items_column="<supplier_return_items>" +
				"<id></id>" +
				"<return_id>"+data_id+"</return_id>" +
				"<item_name></item_name>" +
				"<batch></batch>" +
				"<notes></notes>" +
				"<quantity></quantity>" +
				"<refund_amount></refund_amount>" +
				"</supplier_return_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',return_columns,function(return_results)
		{
			for (var i in return_results)
			{
				var filter_fields=document.getElementById('form19_master');
				filter_fields.elements[1].value=return_results[i].supplier;
				filter_fields.elements[2].value=get_my_past_date(return_results[i].return_date);
				filter_fields.elements[3].value=return_results[i].total;
				filter_fields.elements[4].value=data_id;
				filter_fields.elements[5].value=return_results[i].transaction_id;
				
				$(filter_fields).off('submit');
				$(filter_fields).on("submit", function(event)
				{
					event.preventDefault();
					form19_update_form();
				});
				break;
			}
		});
		/////////////////////////////////////////////////////////////////////////
		
		fetch_requested_data('',return_items_column,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="";
				var id=result.id;
				rowsHTML+="<tr>";
				rowsHTML+="<form id='form19_"+id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form19_"+id+"' value='"+result.item_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form19_"+id+"' value='"+result.batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form19_"+id+"' value='"+result.notes+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' readonly='readonly' form='form19_"+id+"' value='"+result.quantity+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' readonly='readonly' step='any' form='form19_"+id+"' value='"+result.refund_amount+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form19_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form19_"+id+"' id='save_form19_"+id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form19_"+id+"' id='delete_form19_"+id+"' onclick='form19_delete_item($(this));'>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form19_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form19_"+id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
				});
			});
		});
	}
}


/**
 * @form New Supplier Bill
 */
function form21_ini()
{
	var bill_id=$("#form21_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form21_body').html("");

	if(bill_id!="")
	{
		console.log(bill_id);
		var bill_columns="<supplier_bills>" +
				"<id>"+bill_id+"</id>" +
				"<bill_id></bill_id>" +
				"<supplier></supplier>" +
				"<total></total>" +
				"<bill_date></bill_date>" +
				"<entry_date></entry_date>" +
				"<discount></discount>" +
				"<transaction_id></transaction_id>" +
				"</supplier_bills>";
		
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			for (var i in bill_results)
			{
				var filter_fields=document.getElementById('form21_master');
				filter_fields.elements[1].value=bill_results[i].supplier;
				filter_fields.elements[2].value=bill_results[i].bill_id;
				filter_fields.elements[3].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements[4].value=get_my_past_date(bill_results[i].entry_date);
				filter_fields.elements[5].value=bill_results[i].discount;
				filter_fields.elements[6].value=bill_results[i].total;
				filter_fields.elements[7].value=bill_id;
				filter_fields.elements[8].value=bill_results[i].transaction_id;
				
				$(filter_fields).off('submit');
				$(filter_fields).on("submit", function(event)
				{
					event.preventDefault();
					form21_update_form();
				});
				
				break;
			}
		});
		
		var bill_items_column="<supplier_bill_items>" +
				"<id></id>" +
				"<product_name></product_name>" +
				"<batch></batch>" +
				"<unit_price></unit_price>" +
				"<quantity></quantity>" +
				"<amount></amount>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"</supplier_bill_items>";
		
		fetch_requested_data('',bill_items_column,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="";
				var id=result.id;
				rowsHTML+="<tr>";
				rowsHTML+="<form id='form21_"+id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form21_"+id+"' value='"+result.product_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' readonly='readonly' form='form21_"+id+"' value='"+result.quantity+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' readonly='readonly' form='form21_"+id+"' value='"+result.amount+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' readonly='readonly' form='form21_"+id+"' value='"+result.unit_price+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form21_"+id+"' value='"+result.batch+"'>";
						rowsHTML+="<img class='add_icon' form='form21_"+id+"' title='Add new batch' onclick='modal22_action();'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form21_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form21_"+id+"' id='save_form21_"+id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form21_"+id+"' id='delete_form21_"+id+"' onclick='form21_delete_item($(this));'>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form21_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form21_"+id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
				});
			});
		});
	}
}



/**
 * this function prepares the table for dispose items form
 * @form Dispose Items
 * @formNo 22
 */
function form22_ini()
{
	var fid=$("#form22_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form22_header');
	
	var fproduct=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;
	var fmethod=filter_fields.elements[2].value;
	
	var columns="<disposals>" +
			"<id>"+fid+"</id>" +
			"<batch>"+fbatch+"</batch>" +
			"<product_name>"+fproduct+"</product_name>" +
			"<date></date>" +
			"<method>"+fmethod+"</method>" +
			"<quantity></quantity>" +
			"</disposals>";

	$('#form22_body').html("");

	fetch_requested_data('form22',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form22_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form22_"+result.id+"' value='"+result.product_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form22_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form22_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.method+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form22_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form22_"+result.id+"' ondblclick='set_editable($(this));' value='"+get_my_past_date(result.date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form22_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form22_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form22_"+result.id+"' value='saved' onclick='form22_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form22_body').prepend(rowsHTML);
			var fields=document.getElementById("form22_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form22_update_item(fields);
			});
		});
		var export_button=filter_fields.elements[5];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'disposals');
		});
	});
};


/**
 * @form New Purchase order
 * @formNo 24
 */
function form24_ini()
{
	var order_id=$("#form24_link").attr('data_id');
	if(order_id==null)
		order_id="";	
	
	$('#form24_body').html("");

	if(order_id!="")
	{
		var order_columns="<purchase_orders>" +
				"<id>"+order_id+"</id>" +
				"<supplier></supplier>" +
				"<order_date></order_date>" +
				"<status></status>" +
				"</purchase_orders>";
		var order_items_column="<purchase_order_items>" +
				"<id></id>" +
				"<product_name></product_name>" +
				"<quantity></quantity>" +
				"<order_id>"+order_id+"</order_id>" +
				"<make></make>" +
				"<price></price>" +
				"</purchase_order_items>";
	
		////separate fetch function to get order details like customer name, total etc.
		fetch_requested_data('',order_columns,function(order_results)
		{
			for(var i in order_results)
			{
				var filter_fields=document.getElementById('form24_master');
				filter_fields.elements[1].value=order_results[i].supplier;
				filter_fields.elements[2].value=get_my_past_date(order_results[i].order_date);
				filter_fields.elements[3].value=order_results[i].status;
				filter_fields.elements[4].value=order_id;
				
				$(filter_fields).off('submit');
				$(filter_fields).on("submit", function(event)
				{
					event.preventDefault();
					form24_update_form();
				});
				break;
			}
		});
		/////////////////////////////////////////////////////////////////////////
		
		fetch_requested_data('',order_items_column,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="";
				var id=result.id;
				rowsHTML+="<tr>";
				rowsHTML+="<form id='form24_"+id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' required form='form24_"+id+"' value='"+result.product_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' ondblclick='set_editable($(this));' readonly='readonly' required form='form24_"+id+"' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' required form='form24_"+id+"' value='"+result.make+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number'readonly='readonly' required form='form24_"+id+"' value='"+result.price+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form24_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form24_"+id+"' id='save_form24_"+id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form24_"+id+"' id='delete_form24_"+id+"' onclick='form24_delete_item($(this));'>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form24_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form24_"+id);
				var name_filter=fields.elements[0];
				
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form24_update_item(fields);
				});
			});
		});
	}
}



/**
 * this function prepares the table for manage customers form
 * @form Manage Customers
 * @formNo 30
 */
function form30_ini()
{
	var fid=$("#form30_link").attr('data_id');
	if(fid==null)
		fid="";	
		
	var filter_fields=document.getElementById('form30_header');
	
	var fname=filter_fields.elements[0].value;
	var fcontact=filter_fields.elements[1].value;
	var femail=filter_fields.elements[2].value;
	var fstatus=filter_fields.elements[3].value;
	
	var columns="<customers>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<phone>"+fcontact+"</phone>" +
			"<email>"+femail+"</email>" +
			"<status>"+fstatus+"</status>" +
			"<acc_name></acc_name>" +
			"<notes></notes>" +
			"<address></address>" +
			"<street></street>" +
			"<city></city>" +
			"<state></state>" +
			"<country></country>" +
			"<address_status></address_status>" +
			"</customers>";

	$('#form30_body').html("");

	fetch_requested_data('form30',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form30_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' required form='form30_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form30_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.phone+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form30_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.email+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<textarea readonly='readonly' form='form30_"+result.id+"'>"+result.address+", "+result.street+", "+result.city+", "+result.state+", "+result.country+"</textarea>";
						rowsHTML+="<img class='edit_icon' src='images/edit.jpeg' form='form30_"+result.id+"' onclick='modal24_action($(this));'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form30_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form30_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form30_"+result.id+"' value='saved' onclick='form30_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.address+"'>";
						rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.street+"'>";
						rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.city+"'>";
						rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.state+"'>";
						rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.country+"'>";
						rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.address_status+"'>";
					rowsHTML+="</td>";
			rowsHTML+="</tr>";
			
			$('#form30_body').prepend(rowsHTML);
			var fields=document.getElementById("form30_"+result.id);
			var fstatus=fields.elements[4];
			
			set_static_value_list('customers','status',fstatus);
			
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form30_update_item(fields);
			});
		});
		
		var export_button=filter_fields.elements[5];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'customers');
		});
	});
};


/**
 * this function prepares the table for manage offers form
 * @form Manage Offers
 * @formNo 35
 */
function form35_ini()
{
	var fid=$("#form35_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form35_header');
	
	var fname=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	//var fdate=get_raw_time(filter_fields.elements[2].value);
	var fstatus=filter_fields.elements[3].value;
	
	var columns="<offers>" +
			"<id>"+fid+"</id>" +
			"<offer_name>"+fname+"</offer_name>" +
			"<offer_type>"+ftype+"</offer_type>" +
			"<end_date></end_date>" +
			"<offer_detail></offer_detail>" +
			"<status>"+fstatus+"</status>" +
			"<product_name></product_name>" +
			"<batch></batch>" +
			"<service></service>" +
			"<criteria_type></criteria_type>" +
			"<criteria_amount></criteria_amount>" +
			"<criteria_quantity></criteria_quantity>" +
			"<result_type></result_type>" +
			"<discount_percent></discount_percent>" +
			"<discount_amount></discount_amount>" +
			"<quantity_add_percent></quantity_add_percent>" +
			"<quantity_add_amount></quantity_add_amount>" +
			"<free_product_name></free_product_name>" +
			"<free_product_quantity></free_product_quantity>" +
			"</offers>";

	$('#form35_body').html("");

	fetch_requested_data('form35',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form35_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form35_"+result.id+"' value='"+result.offer_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form35_"+result.id+"' value='"+result.offer_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form35_"+result.id+"' ondblclick='set_editable($(this));' value='"+get_my_past_date(result.end_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<textarea readonly='readonly' form='form35_"+result.id+"'>"+result.offer_detail+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form35_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form35_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form35_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form35_"+result.id+"' value='saved' onclick='form35_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form35_body').prepend(rowsHTML);
			var fields=document.getElementById("form35_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form35_update_item(fields);
			});
		});
		var export_button=filter_fields.elements[5];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'offers');
		});
	});
};


/**
 * this function prepares the table for store placement form
 * @form Store Placement
 * @formNo 38
 */
function form38_ini()
{
	var fid=$("#form38_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form38_header');
	
	var fname=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;
	var farea=filter_fields.elements[2].value;
	
	var columns="<area_utilization>" +
			"<id>"+fid+"</id>" +
			"<batch>"+fbatch+"</batch>" +
			"<product_name>"+fname+"</product_name>" +
			"<name>"+farea+"</name>" +
			"<quantity></quantity>" +
			"</area_utilization>";

	$('#form38_body').html("");

	fetch_requested_data('form38',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form38_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form38_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.product_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form38_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form38_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form38_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form38_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form38_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form38_"+result.id+"' value='saved' onclick='form38_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form38_body').prepend(rowsHTML);
			var fields=document.getElementById("form38_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form38_update_item(fields);
			});
		});
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'store');
		});
	});
};


/**
 * this function prepares the table for manage products form
 * @form Manage Products
 * @formNo 39
 */
function form39_ini()
{
	var fid=$("#form39_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form39_header');
	
	var fname=filter_fields.elements[0].value;
	var fmakes=filter_fields.elements[1].value;
	
	var columns="<product_master>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<make>"+fmakes+"</make>" +
			"<description></description>" +
			"<tax></tax>" +
			"</product_master>";

	$('#form39_body').html("");

	fetch_requested_data('form39',columns,function(results)
	{
		$('#form39_body').html("");
		results.forEach(function(result)
		{
			var picture_column="<documents>" +
					"<id></id>" +
					"<url></url>" +
					"<doc_type>product_master</doc_type>" +
					"<target_id>"+result.id+"</target_id>" +
					"</documents>";
			fetch_requested_data('form39',picture_column,function(pic_results)
			{
				var pic_results_url="";
				var pic_results_id="";
				for (var j in pic_results)
				{
					pic_results_id=pic_results[j].id;
					pic_results_url=pic_results[j].url;
				}
				if(pic_results.length===0)
				{
					pic_results_id=get_new_key();
					pic_results_url="";
				}
				
				updated_url=pic_results_url.replace(/ /g,"+");
				var rowsHTML="";
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form39_"+result.id+"'></form>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form39_"+result.id+"' value='"+result.name+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form39_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.make+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form39_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.description+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<output form='form39_"+result.id+"'><div class='figure' name='"+pic_results_id+"'><img id='img_form39_"+result.id+"' src='"+updated_url+"'></div></output>";
							rowsHTML+="<input type='file' form='form39_"+result.id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form39_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.tax+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='hidden' form='form39_"+result.id+"' value='"+result.id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form39_"+result.id+"' value='saved'>";
							rowsHTML+="<input type='button' class='copy_icon' form='form39_"+result.id+"' value='saved' onclick='modal19_action($(this));'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form39_"+result.id+"' value='saved' onclick='form39_delete_item($(this));'>";	
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form39_body').append(rowsHTML);
	
				var fields=document.getElementById("form39_"+result.id);
				var pictureinfo=fields.elements[3];
				var picture=fields.elements[4];

				$(fields).on("submit",function(event)
				{
					event.preventDefault();
					form39_update_item(fields);
				});
				
				picture.addEventListener('change',function(evt)
				{
					select_picture(evt,pictureinfo,function(dataURL)
					{
						pictureinfo.innerHTML="<div class='figure' name='"+pic_results_id+"'><img id='img_form39_"+result.id+"' src='"+dataURL+"'></div>";			
					});
				},false);
			});
		});
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'products');
		});
	});	
};


/**
 * this function prepares the table for manage vendors form
 * @form Manage Vendors
 * @formNo 40
 */
function form40_ini()
{
	var fid=$("#form40_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form40_header');

	var fname=filter_fields.elements[0].value;
	var fcontact=filter_fields.elements[1].value;
	var femail=filter_fields.elements[2].value;
	
	var columns="<suppliers>" +
			"<id>"+fid+"</id>" +
			"<notes></notes>" +
			"<name>"+fname+"</name>" +
			"<phone>"+fcontact+"</phone>" +
			"<email>"+femail+"</email>" +
			"<acc_name></acc_name>" +
			"<address></address>" +
			"<street></street>" +
			"<city></city>" +
			"<state></state>" +
			"<country></country>" +
			"<address_status></address_status>" +
			"</suppliers>";

	$('#form40_body').html("");

	fetch_requested_data('form40',columns,function(results)
	{	
		results.forEach(function(result)
		{		
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form40_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' required form='form40_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form40_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.phone+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form40_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.email+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<textarea readonly='readonly' form='form40_"+result.id+"'>"+result.address+", "+result.street+", "+result.city+", "+result.state+", "+result.country+"</textarea>";
						rowsHTML+="<img class='edit_icon' src='images/edit.jpeg' form='form40_"+result.id+"' onclick='modal25_action($(this));'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<textarea readonly='readonly' form='form40_"+result.id+"' ondblclick='set_editable($(this));'>"+result.notes+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form40_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form40_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form40_"+result.id+"' value='saved' onclick='form40_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form40_"+result.id+"' value='"+result.address+"'>";
						rowsHTML+="<input type='hidden' form='form40_"+result.id+"' value='"+result.street+"'>";
						rowsHTML+="<input type='hidden' form='form40_"+result.id+"' value='"+result.city+"'>";
						rowsHTML+="<input type='hidden' form='form40_"+result.id+"' value='"+result.state+"'>";
						rowsHTML+="<input type='hidden' form='form40_"+result.id+"' value='"+result.country+"'>";
						rowsHTML+="<input type='hidden' form='form40_"+result.id+"' value='"+result.address_status+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form40_body').prepend(rowsHTML);
			var fields=document.getElementById("form40_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form40_update_item(fields);
			});
		});
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'suppliers');
		});
	});
};


function form41_ini()
{
	var coordinates_data="<address>" +
			"<acc_type>master</acc_type>" +
			"<lat></lat>" +
			"<lng></lng>" +
			"</address>";	
	fetch_requested_data('form41',coordinates_data,function(coords)
	{
		for(var z in coords)
		{
			if(typeof map41 != 'undefined')
				map41.remove();

			map41 = L.map('form41_map',{
				center: [coords[z].lat,coords[z].lng], 
				zoom: 10
			});
			
		
			L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
		        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		        subdomains:'1234'
		    }).addTo(map41);
			
			
			var customers_data="<address>" +
					"<id></id>" +
					"<acc_type>customer</acc_type>" +
					"<lat></lat>" +
					"<lng></lng>" +
					"<acc_name></acc_name>" +
					"<status>unconfirmed</status>" +
					"<address></address>" +
					"</address>";
			fetch_requested_data('form41',customers_data,function(customers)
			{
				$('#form41_header').html("");

				customers.forEach(function(customer)
				{
					var latlng=L.latLng(customer.lat,customer.lng);
					var marker=L.marker(latlng,{draggable:true}).addTo(map41).bindPopup("Name: "+customer.acc_name);
					marker.on('dragend',function(event){
						var m=event.target;
						var latlng=m.getLatLng();
						var form=document.getElementById('form41_'+customer.id);
						form.elements[1].value=latlng.lat;
						form.elements[2].value=latlng.lng;
						var save_button=form.elements[7];
						$(save_button).show();
					});
					
					var rowsHTML="";
					rowsHTML+="<div class='customers_content_item' onclick=''>" +
							"<form id='form41_"+customer.id+"'>" +
							"Name: <input type='text' size='25' readonly='readonly' value='"+customer.acc_name+"'>" +
							"Latitude: <input type='text' size='10' readonly='readonly' value='"+customer.lat+"'>" +
							"Longitude: <input type='text' size='10' readonly='readonly' value='"+customer.lng+"'>" +
							"<input type='hidden' value='"+customer.id+"'>" +
							"<input type='hidden' value='"+customer.status+"'>" +
							"<input type='hidden' value='"+customer.address+"'>" +
							"<input type='hidden' value='"+customer.acc_type+"'>" +
							"<input type='button' value='Confirm' form='form41_"+customer.id+"'>" +
							"</form>" +
							"</div>";
					
					$('#form41_header').prepend(rowsHTML);
					var fields=document.getElementById("form41_"+customer.id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form41_update_item(fields);
					});
				});
				
				var scrollPane=$(".customers_pane");
				var scrollContent=$(".customers_content");
				scrollContent.css('width',Math.round(200*customers.length)+"px");
				$(".customers_bar").slider({
					slide: function(event,ui) {
						if (scrollContent.width()>scrollPane.width()){
							scrollContent.css( "margin-left", Math.round(ui.value/100*(scrollPane.width()-scrollContent.width()))+"px");
						} 
						else{
							scrollContent.css("margin-left",0);
						}
					}
				});
	
				scrollPane.css("overflow","hidden");			
			});
			break;
		}
	});
}


/**
 * this function prepares the table for manage bills form
 * @form Manage Bills
 * @formNo 42
 */
function form42_ini()
{
	var fid=$("#form42_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form42_header');
	
	//populating form 
	if(fid==="")
		fid=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	
	var columns="<bills>" +
			"<id>"+fid+"</id>" +
			"<customer_name>"+fname+"</customer_name>" +
			"<bill_date></bill_date>" +
			"<total></total>" +
			"<type></type>" +
			"<transaction_id></transaction_id>" +
			"</bills>";

	$('#form42_body').html("");

	fetch_requested_data('form42',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form42_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form42_"+result.id+"' value='"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form42_"+result.id+"' value='"+result.customer_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form42_"+result.id+"' value='"+get_my_past_date(result.bill_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form42_"+result.id+"' value='"+result.total+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='button' class='edit_icon' form='form42_"+result.id+"' title='Edit Bill'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form42_"+result.id+"' title='Delete Bill' onclick='form42_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form42_"+result.id+"' value='"+result.transaction_id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form42_body').prepend(rowsHTML);
			var fields=document.getElementById("form42_"+result.id);
			var edit_button=fields.elements[4];
			$(edit_button).on("click", function(event)
			{
				event.preventDefault();
				if(result.type=='product')
					element_display(result.id,'form12');
				else if(result.type=='service')
					element_display(result.id,'form10');
				else if(result.type=='both')
					element_display(result.id,'form72');
			});
		});
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'bills');
		});
	});
}


/**
 * @form Manage Purchase orders
 * @formNo 43
 */
function form43_ini()
{
	var fid=$("#form43_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form43_header');
	
	//populating form 
	if(fid==="")
		fid=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	var columns="<purchase_orders>" +
			"<id>"+fid+"</id>" +
			"<supplier>"+fname+"</supplier>" +
			"<order_date></order_date>" +
			"<status>"+fstatus+"</status>" +
			"</purchase_orders>";

	$('#form43_body').html("");

	fetch_requested_data('form43',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form43_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form43_"+result.id+"' value='"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form43_"+result.id+"' value='"+result.supplier+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form43_"+result.id+"' value='"+get_my_past_date(result.order_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' ondblclick='set_editable($(this));' form='form43_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='button' class='edit_icon' form='form43_"+result.id+"' title='Edit order' onclick=\"element_display('"+result.id+"','form24');\">";
						rowsHTML+="<input type='submit' class='save_icon' form='form43_"+result.id+"' title='Save order'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form43_"+result.id+"' title='Delete order' onclick='form43_delete_item($(this));'>";
					rowsHTML+="</td>";
			rowsHTML+="</tr>";
			
			$('#form43_body').prepend(rowsHTML);
			var fields=document.getElementById("form43_"+result.id);
			var status_filter=fields.elements[3];
			
			set_static_value_list('purchase_orders','status',status_filter);
			
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form43_update_item(fields);
			});
			
		});
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'purchase_orders');
		});
	});
};


/**
 * this function prepares the table for manage pamphlets form
 * @form Manage Pamphlets
 * @formNo 44
 */
function form44_ini()
{
	var fid=$("#form44_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form44_header');
	
	//populating form 
	var fname=filter_fields.elements[0].value;
	
	var columns="<pamphlets>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<count_items></count_items>" +
			"</pamphlets>";

	$('#form44_body').html("");

	fetch_requested_data('form44',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form44_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form44_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form44_"+result.id+"' value='"+result.count_items+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' readonly='readonly' form='form44_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form44_"+result.id+"' value='saved' onclick='form44_edit_item($(this));'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form44_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form44_"+result.id+"' value='saved' onclick='form44_delete_item($(this));'>";
						rowsHTML+="<img class='filter_icon' src='./images/print.jpeg' form='form44_"+result.id+"' value='Print' onclick='form44_print_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form44_body').prepend(rowsHTML);
			var fields=document.getElementById("form44_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form44_update_item(fields);
			});
		});
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'pamphlets');
		});
	});
};


/**
 * @form Set Defaults
 * @formNo 46
 */
function form46_ini()
{
	var fid=$("#form46_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form46_header');
	
	var fname=filter_fields.elements[0].value;
	
	var columns="<user_preferences>" +
			"<id>"+fid+"</id>" +
			"<name></name>" +
			"<display_name>"+fname+"</display_name>" +
			"<value></value>" +
			"<status>active</status>" +
			"<type>other</type>" +
			"</user_preferences>";

	$('#form46_body').html("");

	fetch_requested_data('form46',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form46_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form46_"+result.id+"' data-i18n='[value]form."+result.display_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' ondblclick='set_editable($(this));' form='form46_"+result.id+"' value='"+result.value+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form46_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='hidden' form='form46_"+result.id+"' value='"+result.name+"'>";
						rowsHTML+="<input type='submit' class='save_icon' id='save_form46_"+result.id+"' form='form46_"+result.id+"' value='saved'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form46_body').append(rowsHTML);
			
			var fields=document.getElementById("form46_"+result.id);
			//console.log(fields);
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form46_update_item(fields);
			});
		});
		
		$('#form46_body').find('input').i18n();
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'system_defaults');
		});
	});
};


/**
 * this function prepares the table for Select Reports form
 * @form Select Reports
 * @formNo 48
 */
function form48_ini()
{
	var fid=$("#form48_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form48_header');
	
	var fname=filter_fields.elements[0].value;
	
	var columns="<user_preferences>" +
			"<id>"+fid+"</id>" +
			"<name></name>" +
			"<display_name>"+fname+"</display_name>" +
			"<value></value>" +
			"<status>active</status>" +
			"<type>report</type>" +
			"</user_preferences>";

	$('#form48_body').html("");

	fetch_requested_data('form48',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form48_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form48_"+result.id+"' data-i18n='[value]form."+result.display_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='checkbox' form='form48_"+result.id+"' "+result.value+">";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form48_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='hidden' form='form48_"+result.id+"' value='"+result.name+"'>";
						rowsHTML+="<input type='submit' class='save_icon' id='save_form48_"+result.id+"' form='form48_"+result.id+"' value='saved'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form48_body').prepend(rowsHTML);
			var fields=document.getElementById("form48_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form48_update_item(fields);
			});
		});
		
		$('#form48_body').find('input').i18n();
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'reports');
		});

	});
};

/**
 * this function prepares the table for Select Forms form
 * @form Select Forms
 * @formNo 49
 */
function form49_ini()
{
	var fid=$("#form49_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form49_header');
	
	//populating form
	var fname=filter_fields.elements[0].value;
	
	var columns="<user_preferences>" +
			"<id>"+fid+"</id>" +
			"<name></name>" +
			"<display_name>"+fname+"</display_name>" +
			"<value></value>" +
			"<status>active</status>" +
			"<type>form</type>" +
			"</user_preferences>";

	$('#form49_body').html("");

	fetch_requested_data('form49',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form49_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form49_"+result.id+"' data-i18n='[value]form."+result.display_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='checkbox' form='form49_"+result.id+"' "+result.value+">";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form49_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='hidden' form='form49_"+result.id+"' value='"+result.name+"'>";
						rowsHTML+="<input type='submit' class='save_icon' id='save_form49_"+result.id+"' form='form49_"+result.id+"' value='saved'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form49_body').prepend(rowsHTML);
			var fields=document.getElementById("form49_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form49_update_item(fields);
			});
		});
		
		$('#form49_body').find('input').i18n();
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'forms');
		});

	});
};


/**
 * this function prepares the table for Select Accounting Principles form
 * @form Select Accounting Principles
 * @formNo 50
 */
function form50_ini()
{
	var fid=$("#form50_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form50_header');
	
	//populating form
	var fname=filter_fields.elements[0].value;
	
	var columns="<user_preferences>" +
		"<id>"+fid+"</id>" +
		"<name></name>" +
		"<display_name>"+fname+"</display_name>" +
		"<value></value>" +
		"<status>active</status>" +
		"<type>accounting</type>" +
		"</user_preferences>";

	$('#form50_body').html("");

	fetch_requested_data('form50',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form50_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form50_"+result.id+"' data-i18n='[value]form."+result.display_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='checkbox' readonly='readonly' form='form50_"+result.id+"' "+result.value+">";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form50_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='hidden' form='form50_"+result.id+"' value='"+result.name+"'>";
						rowsHTML+="<input type='submit' class='save_icon' id='save_form50_"+result.id+"' form='form50_"+results.id+"' value='saved'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form50_body').prepend(rowsHTML);
			var fields=document.getElementById("form50_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form50_update_item(fields);
			});
		});
		
		$('#form50_body').find('input').i18n();
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'accounting');
		});

	});
};

/**
 * @form Access Control
 * @formNo 51
 */
function form51_ini(fuser)
{
	var header_fields=document.getElementById('form51_master');

	$('#form51_body').html("");

	if(fuser==="")
		fuser=header_fields.elements[3].value;
	if(fuser!="")
	{
		var columns="<access_control>" +
			"<id></id>" +
			"<username>"+fuser+"</username>" +
			"<element_id></element_id>" +
			"<element_name></element_name>" +
			"<status>active</status>" +
			"<re></re>" +
			"<cr></cr>" +
			"<up></up>" +
			"<del></del>" +
			"</access_control>";
	
		fetch_requested_data('form51',columns,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="";
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form51_"+result.id+"'></form>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form51_"+result.id+"' data-i18n='[value]form."+result.element_name+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='checkbox' readonly='readonly' form='form51_"+result.id+"' "+result.re+">";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
						rowsHTML+="<input type='checkbox' readonly='readonly' form='form51_"+result.id+"' "+result.cr+">";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='checkbox' readonly='readonly' form='form51_"+result.id+"' "+result.up+">";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='checkbox' readonly='readonly' form='form51_"+result.id+"' "+result.del+">";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='hidden' form='form51_"+result.id+"' value='"+result.id+"'>";
							rowsHTML+="<input type='hidden' form='form51_"+result.id+"' value='"+result.element_id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' id='save_form51_"+result.id+"' form='form51_"+result.id+"' value='saved'>";	
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
				
				$('#form51_body').prepend(rowsHTML);
				var fields=document.getElementById("form51_"+result.id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form51_update_item(fields);
				});
			});
			$('#form51_body').find('input').i18n();
		});
	}
	else
	{
		$('#form51_body').html("");
	}
};


/**
 * @form Set shortcut keys
 * @formNo 52
 */
function form52_ini()
{
	var fid=$("#form52_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form52_header');
	var felement=filter_fields.elements[0].value;
	var fkey=filter_fields.elements[1].value;
	
	var columns="<shortcuts>" +
		"<id>"+fid+"</id>" +
		"<element_id></element_id>" +
		"<element_name>"+felement+"</element_name>" +
		"<status>active</status>" +
		"<shortcut>"+fkey+"</shortcut>" +
		"</shortcuts>";

	$('#form52_body').html("");

	fetch_requested_data('form52',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form52_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form52_"+result.id+"' data-i18n='[value]form."+result.element_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form52_"+result.id+"' value='"+result.shortcut+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form52_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='hidden' form='form52_"+result.id+"' value='"+result.element_id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' id='save_form52_"+result.id+"' form='form52_"+result.id+"' value='saved'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form52_body').prepend(rowsHTML);
			var fields=document.getElementById("form52_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form52_update_item(fields);
			});
		});
		
		$('#form52_body').find('input').i18n();
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'shortcuts');
		});

	});
};

/**
 * @form Manage Supplier Bills
 * @formNo 53
 */
function form53_ini()
{
	var fid=$("#form53_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form53_header');
	
	var fbill_id=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	
	var columns="<supplier_bills>" +
			"<id>"+fid+"</id>" +
			"<bill_id>"+fbill_id+"</bill_id>" +
			"<supplier>"+fname+"</supplier>" +
			"<bill_date></bill_date>" +
			"<entry_date></entry_date>" +
			"<total></total>" +
			"<transaction_id></transaction_id>" +
			"</supplier_bills>";

	$('#form53_body').html("");

	fetch_requested_data('form53',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form53_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form53_"+result.id+"' value='"+result.bill_id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form53_"+result.id+"' value='"+result.supplier+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form53_"+result.id+"' value='"+get_my_past_date(result.bill_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form53_"+result.id+"' value='"+get_my_past_date(result.entry_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form53_"+result.id+"' value='"+result.total+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form53_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form53_"+result.id+"' title='Edit Bill'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form53_"+result.id+"' title='Delete Bill' onclick='form53_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form53_"+result.id+"' value='"+result.transaction_id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form53_body').prepend(rowsHTML);
			var fields=document.getElementById("form53_"+result.id);
			var edit_button=fields.elements[6];
			$(edit_button).on("click", function(event)
			{
				event.preventDefault();
				element_display(result.id,'form21');
			});
		});
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'supplier_bills');
		});
	});
}

/**
 * @form Select Templates
 * @formNo 54
 */
function form54_ini()
{
	
	var fid=$("#form54_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form54_header');
	
	var fname=filter_fields.elements[0].value;
	
	var columns="<user_preferences>" +
			"<id>"+fid+"</id>" +
			"<display_name>"+fname+"</display_name>" +
			"<value></value>" +
			"<status>active</status>" +
			"<type>template</type>" +
			"</user_preferences>";

	$('#form54_body').html("");

	fetch_requested_data('form54',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form54"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form54_"+result.id+"' data-i18n='[value]form."+result.display_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' form='form54_"+result.id+"' value='"+result.value+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form54_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' id='save_form54_"+result.id+"' form='form54_"+result.id+"' value='saved'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form54_body').append(rowsHTML);
			var fields=document.getElementById("form54_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form54_update_item(fields);
			});
		});
		
		$('#form54_body').find('input').i18n();

		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'printing_templates');
		});

	});
};

/**
 * @form Virtual Store
 * @formNo 55
 */
function form55_ini()
{
	var fid=$("#form55_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form55_header');
	
	var fname=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;
	
	var utilization="<area_utilization>" +
			"<id>"+fid+"</id>" +
			"<product_name>"+fname+"</product_name>" +
			"<name></name>" +
			"<batch>"+fbatch+"</batch>" +
			"<quantity></quantity>" +
			"</area_utilization>";

	$('#form55_body').html("");

	fetch_requested_data('form55',utilization,function(results)
	{
		var canvas = document.getElementById('virtual_store');
		var ctx = canvas.getContext('2d');

		results.forEach(function(result)
		{
			var storages_data="<store_areas>" +
				"<name>"+result.name+"</name>" +
				"<area_type>storage</area_type>" +
				"<height></height>" +
				"<width></width>" +
				"<length></length>" +
				"<locx></locx>" +
				"<locy></locy>" +
				"<locz></locz>" +
				"<storey></storey>" +
				"</store_areas>";
			
			fetch_requested_data('form55',storages_data,function(area_results)
			{
				for(var i in area_results)
				{
					draw_star(ctx,area_results[i].locx,area_results[i].locy,10,"#ff0000");
				}
			});
		});
	});
}

/**
 * @form Expense Register
 * @formNo 56
 */
function form56_ini()
{
	var fid=$("#form56_link").attr('data_id');
	if(fid==null)
		fid="";	
	var filter_fields=document.getElementById('form56_header');
	
	var fdate=filter_fields.elements[0].value;
	var faccount=filter_fields.elements[1].value;
	
	var columns="<expenses>" +
			"<id>"+fid+"</id>" +
			"<expense_date>"+fdate+"</expense_date>" +
			"<to_acc>"+faccount+"</to_acc>" +
			"<description></description>" +
			"<amount></amount>" +
			"</expenses>";

	$('#form56_body').html("");

	fetch_requested_data('form56',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form56_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form56_"+result.id+"' value='"+result.expense_date+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form56_"+result.id+"' value='"+result.to_acc+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form56_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.description+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form56_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.amount+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form56_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form56_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form56_"+result.id+"' value='saved' onclick='form56_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form56_body').prepend(rowsHTML);
			var fields=document.getElementById("form56_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form56_update_item(fields);
			});
		});
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'expenses');
		});

	});
};

/**
 * @form manage services
 * @formNo 57
 */
function form57_ini()
{
	var fid=$("#form57_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form57_header');
	
	var fservices=filter_fields.elements[0].value;
	
	var columns="<services>" +
			"<id>"+fid+"</id>" +
			"<name>"+fservices+"</name>" +
			"<description></description>" +
			"<price></price>" +
			"<duration></duration>" +
			"<tax></tax>" +
			"</services>";

	$('#form57_body').html("");

	fetch_requested_data('form57',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form57_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form57_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<textarea readonly='readonly' form='form57_"+result.id+"' ondblclick='set_editable($(this));'>"+result.description+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' readonly='readonly' form='form57_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.price+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' readonly='readonly' form='form57_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.duration+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' readonly='readonly' form='form57_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.tax+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form57_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form57_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='copy_icon' form='form57_"+result.id+"' value='saved' onclick='modal21_action($(this));'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form57_"+result.id+"' value='saved' onclick='form57_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form57_body').prepend(rowsHTML);
			var fields=document.getElementById("form57_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form57_update_item(fields);
			});			
		});

		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'services');
		});

	});
};

/**
 * @form Service pre-requisites
 * @formNo 58
 */
function form58_ini()
{
	var fid=$("#form58_link").attr('data_id');
	if(fid==null)
		fid="";	
	var filter_fields=document.getElementById('form58_header');
	
	var fservice=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var frequisite=filter_fields.elements[2].value;
	
	var columns="<pre_requisites>" +
			"<id>"+fid+"</id>" +
			"<name>"+fservices+"</name>" +
			"<type>service</type>" +
			"<requisite_type>"+ftype+"</requisite_type>" +
			"<requisite_name>"+frequisite+"</requisite_name>" +
			"<quantity></quantity>" +
			"</pre_requisites>";

	$('#form58_body').html("");

	fetch_requested_data('form58',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form58_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form58_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form58_"+result.id+"' value='"+result.requisite_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form58_"+result.id+"' value='"+result.requisite_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form58_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form58_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form58_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form58_"+result.id+"' value='saved' onclick='form58_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form58_body').prepend(rowsHTML);
			var fields=document.getElementById("form58_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form58_update_item(fields);
			});
		});
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'service_pre_requisites');
		});

	});
};

/**
 * @form product pre-requisites
 * @formNo 59
 */
function form59_ini()
{
	var fid=$("#form59_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form59_header');
	
	var fproduct=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var frequisite=filter_fields.elements[2].value;
	
	var columns="<pre_requisites>" +
			"<id>"+fid+"</id>" +
			"<name>"+fproduct+"</name>" +
			"<type>product</type>" +
			"<requisite_type>"+ftype+"</requisite_type>" +
			"<requisite_name>"+frequisite+"</requisite_name>" +
			"<quantity></quantity>" +
			"</pre_requisites>";

	$('#form59_body').html("");

	fetch_requested_data('form59',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form59_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form59_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form59_"+result.id+"' value='"+result.requisite_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form59_"+result.id+"' value='"+result.requisite_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form59_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form59_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form59_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form59_"+result.id+"' value='saved' onclick='form59_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form59_body').prepend(rowsHTML);
			var fields=document.getElementById("form59_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form59_update_item(fields);
			});
		});
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'product_pre_requisites');
		});

	});
};


/**
 * @form Product Attributes
 * @formNo 60
 */
function form60_ini()
{
	var fid=$("#form60_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form60_header');
	
	var fproduct=filter_fields.elements[0].value;
	var fattribute=filter_fields.elements[1].value;
	
	var columns="<attributes>" +
			"<id>"+fid+"</id>" +
			"<name>"+fproduct+"</name>" +
			"<type>product</type>" +
			"<attribute>"+fattribute+"</attribute>" +
			"<value></value>" +
			"</attributes>";

	$('#form60_body').html("");

	fetch_requested_data('form60',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form60_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form60_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form60_"+result.id+"' value='"+result.attribute+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form60_"+result.id+"' value='"+result.value+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form60_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form60_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form60_"+result.id+"' value='saved' onclick='form60_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form60_body').prepend(rowsHTML);
			var fields=document.getElementById("form60_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form60_update_item(fields);
			});
		});
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'product_attributes');
		});

	});
};

/**
 * @form Service Attributes
 * @formNo 61
 */
function form61_ini()
{
	var fid=$("#form61_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form61_header');
	
	var fservice=filter_fields.elements[0].value;
	var fattribute=filter_fields.elements[1].value;
	
	var columns="<attributes>" +
			"<id>"+fid+"</id>" +
			"<name>"+fservice+"</name>" +
			"<type>service</type>" +
			"<attribute>"+fattribute+"</attribute>" +
			"<value></value>" +
			"</attributes>";

	$('#form61_body').html("");

	fetch_requested_data('form61',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form61_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form61_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form61_"+result.id+"' value='"+result.attribute+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form61_"+result.id+"' value='"+result.value+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form61_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form61_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form61_"+result.id+"' value='saved' onclick='form61_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form61_body').prepend(rowsHTML);
			var fields=document.getElementById("form61_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form61_update_item(fields);
			});
		});

		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'service_attributes');
		});

	});
};

/**
 * @form Product reviews
 * @formNo 62
 */
function form62_ini()
{
	var fid=$("#form62_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form62_header');
	
	var fproduct=filter_fields.elements[0].value;
	var freviewer=filter_fields.elements[1].value;
	var frating=filter_fields.elements[2].value;
	
	var columns="<reviews>" +
			"<id>"+fid+"</id>" +
			"<name>"+fproduct+"</name>" +
			"<type>product</type>" +
			"<reviewer>"+freviewer+"</reviewer>" +
			"<detail></detail>" +
			"<rating>"+frating+"</rating>" +
			"</reviews>";

	$('#form62_body').html("");

	fetch_requested_data('form62',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form62_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form62_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form62_"+result.id+"' value='"+result.reviewer+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form62_"+result.id+"' value='"+result.detail+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form62_"+result.id+"' value='"+result.rating+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form62_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form62_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form62_"+result.id+"' value='saved' onclick='form62_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form62_body').prepend(rowsHTML);
			var fields=document.getElementById("form62_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form62_update_item(fields);
			});
		});
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'product_reviews');
		});

	});
};

/**
 * @form Service reviews
 * @formNo 63
 */
function form63_ini()
{
	var fid=$("#form63_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form63_header');
	
	var fservice=filter_fields.elements[0].value;
	var freviewer=filter_fields.elements[1].value;
	var frating=filter_fields.elements[2].value;
	
	var columns="<reviews>" +
			"<id>"+fid+"</id>" +
			"<name>"+fservice+"</name>" +
			"<type>service</type>" +
			"<reviewer>"+freviewer+"</reviewer>" +
			"<detail></detail>" +
			"<rating>"+frating+"</rating>" +
			"</reviews>";

	$('#form63_body').html("");

	fetch_requested_data('form63',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form63_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form63_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form63_"+result.id+"' value='"+result.reviewer+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form63_"+result.id+"' value='"+result.detail+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form63_"+result.id+"' value='"+result.rating+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form63_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form63_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form63_"+result.id+"' value='saved' onclick='form63_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form63_body').prepend(rowsHTML);
			var fields=document.getElementById("form63_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form63_update_item(fields);
			});
		});
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'service_reviews');
		});

	});
};

/**
 * @form Service Cross sells
 * @formNo 64
 */
function form64_ini()
{
	var fid=$("#form64_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form64_header');
	
	var fservice=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var fcross=filter_fields.elements[2].value;
	
	var columns="<cross_sells>" +
			"<id>"+fid+"</id>" +
			"<name>"+fservice+"</name>" +
			"<type>service</type>" +
			"<cross_type>"+ftype+"</cross_type>" +
			"<cross_name>"+fcross+"</cross_name>" +
			"</cross_sells>";

	$('#form64_body').html("");

	fetch_requested_data('form64',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form64_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form64_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form64_"+result.id+"' value='"+result.cross_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form64_"+result.id+"' value='"+result.cross_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form64_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form64_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form64_"+result.id+"' value='saved' onclick='form64_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form64_body').prepend(rowsHTML);
			var fields=document.getElementById("form64_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form64_update_item(fields);
			});
		});
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'service_cross_sells');
		});

	});
};


/**
 * @form Cross sells
 * @formNo 66
 */
function form66_ini()
{
	var fid=$("#form66_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form66_header');
	
	var fproduct=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var fcross=filter_fields.elements[2].value;
	
	var columns="<cross_sells>" +
			"<id>"+fid+"</id>" +
			"<name>"+fproduct+"</name>" +
			"<type>product</type>" +
			"<cross_type>"+ftype+"</cross_type>" +
			"<cross_name>"+fcross+"</cross_name>" +
			"</cross_sells>";

	$('#form66_body').html("");

	fetch_requested_data('form66',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form66_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form66_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form66_"+result.id+"' value='"+result.cross_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form66_"+result.id+"' value='"+result.cross_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form66_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form66_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form66_"+result.id+"' value='saved' onclick='form66_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form66_body').prepend(rowsHTML);
			var fields=document.getElementById("form66_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form66_update_item(fields);
			});
		});
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'product_cross_sells');
		});

	});
};

/**
 * @form New sale order
 * @formNo 69
 */
function form69_ini()
{
	console.log('form69_ini');
	var order_id=$("#form69_link").attr('data_id');
	if(order_id==null)
		order_id="";	
	
	$('#form69_body').html("");

	if(order_id!="")
	{
		var order_columns="<sale_orders>" +
				"<id>"+order_id+"</id>" +
				"<customer_name></customer_name>" +
				"<order_date></order_date>" +
				"<type>product</type>" +
				"<status></status>" +
				"</sale_orders>";
		var order_items_column="<sale_order_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<quantity></quantity>" +
				"<order_id>"+order_id+"</order_id>" +
				"<notes></notes>" +
				"</sale_order_items>";
	
		////separate fetch function to get order details like customer name, total etc.
		fetch_requested_data('',order_columns,function(order_results)
		{
			for(var i in order_results)
			{
				var filter_fields=document.getElementById('form69_master');
				filter_fields.elements[1].value=order_results[i].customer_name;
				filter_fields.elements[2].value=get_my_past_date(order_results[i].order_date);
				filter_fields.elements[3].value=order_results[i].status;
				filter_fields.elements[4].value=order_id;
				
				$(filter_fields).off('submit');
				$(filter_fields).on("submit", function(event)
				{
					event.preventDefault();
					form69_update_form();
				});
				break;
			}
		});
		/////////////////////////////////////////////////////////////////////////
		
		fetch_requested_data('',order_items_column,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="";
				var id=result.id;
				rowsHTML+="<tr>";
				rowsHTML+="<form id='form69_"+id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' required form='form69_"+id+"' value='"+result.item_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' ondblclick='set_editable($(this));' readonly='readonly' required form='form69_"+id+"' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<textarea readonly='readonly' form='form69_"+id+"'>"+result.notes+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form69_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form69_"+id+"' id='save_form69_"+id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form69_"+id+"' id='delete_form69_"+id+"' onclick='form69_delete_item($(this));'>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form69_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form69_"+id);
				var name_filter=fields.elements[0];
				var quantity_filter=fields.elements[1];
				
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form69_update_item(fields);
				});
				
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				
				set_my_value_list(product_data,name_filter);
				
				$(name_filter).on('blur',function(event)
				{
					var max_data="<product_instances>" +
								"<quantity></quantity>" +
								"<product_name>"+name_filter.value+"</product_name>" +
								"</product_instances>";
					set_my_max_value(max_data,quantity_filter);
				});
	
			});
		});
	}
}


/**
 * @form Manage Sale orders
 * @formNo 70
 */
function form70_ini()
{
	var fid=$("#form70_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form70_header');
	
	//populating form 
	if(fid==="")
		fid=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	var columns="<sale_orders>" +
			"<id>"+fid+"</id>" +
			"<customer_name>"+fname+"</customer_name>" +
			"<order_date></order_date>" +
			"<type>product</type>" +
			"<status>"+fstatus+"</status>" +
			"</sale_orders>";

	$('#form70_body').html("");

	fetch_requested_data('form70',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form70_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form70_"+result.id+"' value='"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form70_"+result.id+"' ondblclick='set_editable($(this));' value='"+result.customer_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form70_"+result.id+"' value='"+get_my_past_date(result.order_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' ondblclick='set_editable($(this));' form='form70_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='button' class='edit_icon' form='form70_"+result.id+"' title='Edit order' onclick=\"element_display('"+result.id+"','form69');\">";
						rowsHTML+="<input type='submit' class='save_icon' form='form70_"+result.id+"' title='Save order'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form70_"+result.id+"' title='Delete order' onclick='form70_delete_item($(this));'>";
						rowsHTML+="<input type='button' form='form70_"+result.id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form70_body').prepend(rowsHTML);
			var fields=document.getElementById("form70_"+result.id);
			var bill_button=fields.elements[7];
			var status_filter=fields.elements[3];
			
			set_static_value_list('sale_orders','status',status_filter);
			
			if(result.status=='pending')
			{
				$(bill_button).attr('class','process_ok_icon');
				$(bill_button).attr('title','Create bill');
				$(bill_button).on('click',function(event)
				{
					create_bill_from_order(result.id);
				});
			}
			else
			{
				$(bill_button).hide();
			}
			
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form70_update_item(fields);
			});
			
		});
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'sale_orders');
		});
	});
};


/**
 * @form Manage Financial Accounts
 * @formNo 71
 */
function form71_ini()
{
	var fid=$("#form71_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form71_header');

	var fname=filter_fields.elements[0].value;
	
	var columns="<accounts>" +
			"<id>"+fid+"</id>" +
			"<acc_name>"+fname+"</acc_name>" +
			"<description></description>" +
			"<type>financial</type>" +
			"</accounts>";

	$('#form71_body').html("");

	fetch_requested_data('form71',columns,function(results)
	{	
		results.forEach(function(result)
		{		
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form71_"+result.id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' required form='form71_"+result.id+"' value='"+result.acc_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<textarea readonly='readonly' form='form71_"+result.id+"' ondblclick='set_editable($(this));'>"+result.description+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form71_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form71_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form71_"+result.id+"' value='saved' onclick='form71_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form71_body').prepend(rowsHTML);
			var fields=document.getElementById("form71_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form71_update_item(fields);
			});
		});
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'accounts');
		});
	});
};

/**
 * @form New Bill
 */
function form72_ini()
{
	var bill_id=$("#form72_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form72_body').html("");

	if(bill_id!="")
	{
		var bill_columns="<bills>" +
				"<id>"+bill_id+"</id>" +
				"<customer_name></customer_name>" +
				"<total></total>" +
				"<bill_date></bill_date>" +
				"<amount></amount>" +
				"<discount></discount>" +
				"<tax></tax>" +
				"<offer></offer>" +
				"<type>both</type>" +
				"<transaction_id></transaction_id>" +
				"</bills>";
		var bill_items_column="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<batch></batch>" +
				"<staff></staff>" +
				"<quantity></quantity>" +
				"<notes></notes>" +
				"<unit_price></unit_price>" +
				"<amount></amount>" +
				"<total></total>" +
				"<discount></discount>" +
				"<offer></offer>" +
				"<type></type>" +
				"<bill_id>"+bill_id+"</bill_id>" +
				"<tax></tax>" +
				"<free_with></free_with>" +
				"</bill_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			for (var i in bill_results)
			{
				var filter_fields=document.getElementById('form72_master');
				filter_fields.elements[1].value=bill_results[i].customer_name;
				filter_fields.elements[2].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements[3].value=bill_results[i].amount;
				filter_fields.elements[4].value=bill_results[i].discount;
				filter_fields.elements[5].value=bill_results[i].tax;
				filter_fields.elements[6].value=bill_results[i].total;
				filter_fields.elements[7].value=bill_id;
				filter_fields.elements[8].value=bill_results[i].offer;
				filter_fields.elements[9].value=bill_results[i].transaction_id;
				
				$(filter_fields).off('submit');
				$(filter_fields).on("submit", function(event)
				{
					event.preventDefault();
					form12_update_form();
				});
				break;
			}
		});
		/////////////////////////////////////////////////////////////////////////
		
		fetch_requested_data('',bill_items_column,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="";
				var id=result.id;
				rowsHTML+="<tr>";
				rowsHTML+="<form id='form72_"+id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+result.item_name+"'>";
					rowsHTML+="</td>";
					if(result.batch!=null && result.batch!="")
					{
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+result.batch+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<input type='number' readonly='readonly' form='form72_"+id+"' value='"+result.quantity+"'>";
						rowsHTML+="</td>";
					}
					else
					{
						rowsHTML+="<td>";
							rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+result.staff+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td>";
							rowsHTML+="<textarea readonly='readonly' form='form72_"+id+"'>"+result.notes+"</textarea>";
						rowsHTML+="</td>";
					}
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' readonly='readonly' form='form72_"+id+"' value='"+result.unit_price+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='number' readonly='readonly' form='form72_"+id+"' value='"+result.total+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/details.jpeg' form='form72_"+id+"' value='Details' onclick='modal6_action($(this));'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+result.amount+"'>";
						rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+result.discount+"'>";
						rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+result.tax+"'>";
						rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+result.offer+"'>";
						rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form72_"+id+"' id='save_form72_"+id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='form72_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
						rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
						rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form72_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form72_"+id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
				});
			});
		});
	}
}



function notifications_ini()
{
	var columns="<notifications>" +
			"<title></title>" +
			"<link_to></link_to>" +
			"<data_id></data_id>" +
			"<notes></notes>" +
			"<t_generated></t_generated>" +
			"<status>pending</status>" +
			"</notifications>";

	fetch_requested_data('',columns,function(notifs)
	{	
		var result_html="";
		for(var i in notifs)
		{
			result_html+="<div class='notification_detail'>" +
					notifs[i].title +
					"</br><a onclick=\"" +
					"element_display('"+notifs[i].data_id +
					"','"+notifs[i].link_to+"');\">"+notifs[i].notes+"</a>" +
					"<div class='notification_status'>" +
					" Generated @ " +
					get_formatted_time(notifs[i].t_generated) +
					"</div>" +
					"<div>" +
					"<input type='button' value='Seen' onclick='notifications_update_item()'>" +
					"<input type='button' value='Close' onclick='notifications_update_item()'>" +
					"</div>" +
					"</div>";
		}
		
		var columns2="<notifications>" +
				"<title></title>" +
				"<link_to></link_to>" +
				"<data_id></data_id>" +
				"<notes></notes>" +
				"<t_generated></t_generated>" +
				"<status>reviewed</status>" +
				"</notifications>";
		
		fetch_requested_data('',columns2,function(notifs2)
		{	
			for(var j in notifs2)
			{
				result_html+="<div class='notification_detail'>" +
						notifs2[j].title +
						"</br><a onclick=\"" +
						"element_display('"+notifs2[j].data_id +
						"','"+notifs2[j].link_to+"');\">"+notifs2[j].notes+"</a>" +
						"<div class='notification_status'>" +
						" Generated @ " +
						get_formatted_time(notifs2[j].t_generated) +
						"</div>" +
						"<div>" +
						"<input type='button' value='Unseen' onclick='notifications_update_item()'>" +
						"<input type='button' value='Close' onclick='notifications_update_item()'>" +
						"</div>" +
						"</div>";
			}
			$("#notifications_detail").html(result_html);
		});
	});
}


function opportunities_ini()
{
	var columns="<opportunities>" +
			"<title></title>" +
			"<link_to></link_to>" +
			"<data_id></data_id>" +
			"<notes></notes>" +
			"<t_generated></t_generated>" +
			"<status>pending</status>" +
			"</opportunities>";

	fetch_requested_data('',columns,function(oppors)
	{	
		var result_html="";
		
		for(var i in oppors)
		{
			result_html+="<div class='opportunity_detail'>" +
					oppors[i].title +
					"</br><a onclick=\"" +
					"element_display('"+oppors[i].data_id +
					"','"+oppors[i].link_to+
					"');\">"+oppors[i].notes+"</a>" +
					"<div class='opportunity_status'>" +
					" Generated @ " +
					get_formatted_time(oppors[i].t_generated) +
					"</div>" +
					"<div>" +
					"<input type='button' value='Seen' onclick='opportunities_update_item()'>" +
					"<input type='button' value='Close' onclick='opportunities_update_item()'>" +
					"</div>" +
					"</div>";	
		}
		var columns2="<opportunities>" +
				"<title></title>" +
				"<link_to></link_to>" +
				"<data_id></data_id>" +
				"<notes></notes>" +
				"<t_generated></t_generated>" +
				"<status>reviewed</status>" +
				"</opportunities>";
		
		fetch_requested_data('',columns2,function(oppors2)
		{	
			for(var j in oppors2)
			{
				result_html+="<div class='opportunity_detail'>" +
						oppors2[j].title +
						"</br><a onclick=\"" +
						"element_display('"+oppors2[j].data_id +
						"','"+oppors2[j].link_to+
						"');\">"+oppors2[j].notes+"</a>" +
						"<div class='opportunity_status'>" +
						" Generated @ " +
						get_formatted_time(oppors2[j].t_generated) +
						"</div>" +
						"<div>" +
						"<input type='button' value='Unseen' onclick='opportunities_update_item()'>" +
						"<input type='button' value='Close' onclick='opportunities_update_item()'>" +
						"</div>" +
						"</div>";	
			}
		
			$("#opportunities_detail").html(result_html);
		});
		
	});
}


function activities_ini() 
{
	var columns="<activities>" +
		"<title></title>" +
		"<link_to></link_to>" +
		"<data_id></data_id>" +
		"<notes></notes>" +
		"<updated_by></updated_by>" +
		"<user_display>yes</user_display>" +
		"<last_updated compare='more than'>"+get_raw_time_24h()+"</last_updated>" +
		"</activities>";
	
	fetch_requested_data('',columns,function(activities)
	{
		var result_html="";
		for(var i in activities)
		{
			result_html+="<div class='activity_detail'>" +
						activities[i].title +
						"</br><a onclick=\"" +
						"element_display('"+activities[i].data_id +
						"','"+activities[i].link_to+
						"');\">"+activities[i].notes+"</a>" +
						"<div class='activity_log'>By:" +
						activities[i].updated_by +
						" @ " +
						get_formatted_time(activities[i].last_updated) +
						"</div>" +
						"</div>";
		}
		$("#activity_lane").html(result_html);
		
	});
	setTimeout(activities_ini,100000);	
}

function all_activities_ini() 
{
	var columns="<activities>" +
		"<title></title>" +
		"<link_to></link_to>" +
		"<data_id></data_id>" +
		"<notes></notes>" +
		"<updated_by></updated_by>" +
		"<user_display>yes</user_display>" +
		"<last_updated></last_updated>" +
		"</activities>";
	
	fetch_requested_data('',columns,function(activities)
	{
		var result_html="";
		for(var i in activities)
		{
			result_html+="<div class='all_activity_detail'>" +
						activities[i].title +
						"</br><a onclick=\"" +
						"element_display('"+activities[i].data_id +
						"','"+activities[i].link_to+
						"');\">"+activities[i].notes+"</a>" +
						"<div class='all_activity_log'>By:" +
						activities[i].updated_by +
						" @ " +
						get_formatted_time(activities[i].last_updated) +
						"</div>" +
						"</div>";
		}
		$("#all_activity_lane").html(result_html);		
	});
}


function search_ini()
{
	var searchStr=document.getElementById("search_box").value;	
	
	$("#search_results").html("");
	
	var length=searchStr.length;
	
	if(length>=3)
	{
		///////////////////////from products//////////////
		var product_columns="<product_master>" +
				"<id></id>" +
				"<name>"+searchStr+"</name>" +
				"<description></description>" +
				"</product_master>";
	
		fetch_requested_data('',product_columns,function(product_results)
		{
			var num_res=0;
			var result_html="";
			product_results.forEach(function(product)
			{
				result_html+="<div class='search_detail'>" +
						"Product: "+product.name+
						"</br><a onclick=\"" +
						"form_display('"+product.id +
						"','form39');\">"+product.description+"</a>" +
						"</div>";
				num_res=num_res+1;
			});
			$("#search_results").append(result_html);
		});
	
		///////////////////////from services//////////////
		var service_columns="<services>" +
				"<id></id>" +
				"<name>"+searchStr+"</name>" +
				"<description></description>" +
				"</services>";
	
		fetch_requested_data('',service_columns,function(service_results)
		{
			var num_res=0;
			var result_html="";
			service_results.forEach(function(service)
			{
				result_html+="<div class='search_detail'>" +
						"Service: "+service.name+
						"</br><a onclick=\"" +
						"element_display('"+service.id +
						"','form57');\">"+service.description+"</a>" +
						"</div>";
				num_res=num_res+1;
			});
			$("#search_results").append(result_html);
		});
	
		///////////////////////from customer//////////////
		var customer_columns="<customers>" +
				"<id></id>" +
				"<name></name>" +
				"<acc_name>"+searchStr+"</acc_name>" +
				"<email></email>" +
				"<phone></phone>" +
				"</customers>";
	
		fetch_requested_data('',customer_columns,function(customer_results)
		{
			var num_res=0;
			var result_html="";
			customer_results.forEach(function(customer)
			{
				result_html+="<div class='search_detail'>" +
						"Customer: "+customer.name+
						"</br><a onclick=\"" +
						"element_display('"+customer.id +
						"','form30');\">Email:"+customer.email+" Phone:"+customer.phone+"</a>" +
						"</div>";
				num_res=num_res+1;
			});
			$("#search_results").append(result_html);
		});
	
		///////////////////////from supplier//////////////
		var supplier_columns="<suppliers>" +
				"<id></id>" +
				"<name></name>" +
				"<acc_name>"+searchStr+"</acc_name>" +
				"<email></email>" +
				"<phone></phone>" +
				"</suppliers>";
	
		fetch_requested_data('',supplier_columns,function(supplier_results)
		{
			var num_res=0;
			var result_html="";
			supplier_results.forEach(function(supplier)
			{
				result_html+="<div class='search_detail'>" +
						"Supplier: "+supplier.name+
						"</br><a onclick=\"" +
						"element_display('"+supplier.id +
						"','form40');\">Email:"+supplier.email+" Phone:"+supplier.phone+"</a>" +
						"</div>";
				num_res=num_res+1;
			});
			$("#search_results").append(result_html);
		});
	
		///////////////////////from staff//////////////
		var staff_columns="<staff>" +
				"<id></id>" +
				"<name></name>" +
				"<acc_name>"+searchStr+"</acc_name>" +
				"<email></email>" +
				"<phone></phone>" +
				"</staff>";
	
		fetch_requested_data('',staff_columns,function(staff_results)
		{
			var num_res=0;
			var result_html="";
			staff_results.forEach(function(staff)
			{
				result_html+="<div class='search_detail'>" +
						"Employee: "+staff.name+
						"</br><a onclick=\"" +
						"element_display('"+staff.id +
						"','form8');\">Email:"+staff.email+" Phone:"+staff.phone+"</a>" +
						"</div>";
				num_res=num_res+1;
			});
			$("#search_results").append(result_html);
		});
	
		///////////////////////from assets//////////////
		var assets_columns="<assets>" +
				"<id></id>" +
				"<name>"+searchStr+"</name>" +
				"<type></type>" +
				"<owner></owner>" +
				"</assets>";
	
		fetch_requested_data('',assets_columns,function(asset_results)
		{
			var num_res=0;
			var result_html="";
			asset_results.forEach(function(asset)
			{
				result_html+="<div class='search_detail'>" +
						"Asset: "+asset.name+
						"</br><a onclick=\"" +
						"element_display('"+asset.id +
						"','form5');\">Type: "+asset.type+" Owner: "+asset.owner+"</a>" +
						"</div>";
				num_res=num_res+1;
			});
			$("#search_results").append(result_html);
		});
	
		/////////////////////from activities///////////
		var columns="<activities>" +
				"<title></title>" +
				"<link_to></link_to>" +
				"<data_id></data_id>" +
				"<notes></notes>" +
				"<updated_by></updated_by>" +
				"<data_xml>"+searchStr+"</data_xml>" +
				"<last_updated></last_updated>" +
				"</activities>";
	
		fetch_requested_data('',columns,function(activity_results)
		{
			var num_res=0;
			var result_html="";
			activity_results.forEach(function(activity)
			{
				result_html+="<div class='search_detail'>" +
						"Activity: "+activity.title +
						"</br><a onclick=\"" +
						"element_display('"+activity.data_id +
						"','"+activity.link_to +
						"');\">"+activity.notes+"</a>" +
						"</div>";
				num_res=num_res+1;
			});
			$("#search_results").append(result_html);
		});
	}
	else
	{
		$("#search_results").html("Type atleast 3 letters to find any results");
	}
}
