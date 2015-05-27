/**
 * @form Update Inventory
 * @formNo 1
 * @Loading heavy
 */
function form1_ini()
{
	show_loader();
	var fid=$("#form1_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form1_header');
	
	var fname=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;

	////indexing///
	var index_element=document.getElementById('form1_index');
	var prev_element=document.getElementById('form1_prev');
	var next_element=document.getElementById('form1_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	
	var columns="<product_instances count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<batch>"+fbatch+"</batch>" +
		"<product_name>"+fname+"</product_name>" +
		"<manufacture_date></manufacture_date>"+
		"<expiry></expiry>" +
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
						rowsHTML+="<textarea readonly='readonly' form='form1_"+result.id+"'>"+result.product_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form1_"+result.id+"' value='"+result.batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Manufacturing'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form1_"+result.id+"' class='dblclick_editable' value='"+get_my_past_date(result.manufacture_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Expiry'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form1_"+result.id+"' class='dblclick_editable' value='"+get_my_past_date(result.expiry)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="System: <input type='number' step='any' readonly='readonly' form='form1_"+result.id+"' value=''>";
						rowsHTML+="</br>Actual: <input type='number' step='any' readonly='readonly' form='form1_"+result.id+"' value='' class='dblclick_editable' >";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form1_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' title='Save' form='form1_"+result.id+"'>";					
						rowsHTML+="<input type='button' class='delete_icon' title='Delete' form='form1_"+result.id+"' onclick='form1_delete_item($(this));'>";
						rowsHTML+="<input type='button' class='generic_icon' value='Purchase' form='form1_"+result.id+"' onclick=\"modal27_action('"+result.product_name+"');\">";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form1_body').append(rowsHTML);
			var fields=document.getElementById("form1_"+result.id);
			var manufacturing=fields.elements[2];
			var expiry=fields.elements[3];
			var sys_inventory=fields.elements[4];
			var actual_inventory=fields.elements[5];
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form1_update_item(fields);
			});
			
			$(manufacturing).datepicker();
			$(expiry).datepicker();
			
			get_inventory(result.product_name,result.batch,function(inventory)
			{
				sys_inventory.value=inventory;
				actual_inventory.value=inventory;
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();

		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'inventory');
		});
		
		hide_loader();
	});
};

/**
 * @form Create Newsletter
 * @formNo 2
 * @Loading light
 */
function form2_ini()
{
	var newsletter_id=$("#form2_link").attr('data_id');
	if(newsletter_id==null)
		newsletter_id="";	
	$('#form2_body').html("");
	
	if(newsletter_id!="")
	{
		show_loader();
		var newsletter_columns="<newsletter>" +
				"<id>"+newsletter_id+"</id>" +
				"<name></name>" +
				"<description></description>"+
				"</newsletter>";
		var newsletter_item_columns="<newsletter_items>" +
				"<id></id>" +
				"<nl_id exact='yes'>"+newsletter_id+"</nl_id>" +
				"<item_type></item_type>" +
				"<item_name></item_name>" +
				"<item_detail></item_detail>" +
				"<data_blob></data_blob>" +
				"<pic_url></pic_url>"+
				"<column_size></column_size>"+
				"<url></url>"+
				"</newsletter_items>";
	
		fetch_requested_data('',newsletter_columns,function(newsletter_results)
		{
			for (var i in newsletter_results)
			{
				var filter_fields=document.getElementById('form2_master');
				filter_fields.elements[1].value=newsletter_results[i].name;
				filter_fields.elements[2].value=newsletter_results[i].description;
				filter_fields.elements[3].value=newsletter_id;
				var save_button=filter_fields.elements[4];
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form2_update_form();
				});
				break;
			}
		});
		/////////////////////////////////////////////////////////////////////////
		
		fetch_requested_data('',newsletter_item_columns,function(results)
		{
			results.forEach(function(result)
			{
				var id=result.id;
				var updated_blob=result.data_blob.replace(/ /g,"+");
				var rowsHTML="<tr>";
				rowsHTML+="<form id='form2_"+id+"'></form>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form2_"+id+"' value='"+result.item_type+"'>";
						rowsHTML+="<br><b><textarea readonly='readonly' form='form2_"+id+"'>"+result.item_name+"</textarea></b>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Detail'>";
						rowsHTML+="Detail: <textarea readonly='readonly' class='widebox' form='form2_"+id+"'>"+result.item_detail+"</textarea>";
						rowsHTML+="<br>Link: <textarea readonly='readonly' class='widebox' form='form2_"+id+"'>"+result.url+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Image'>";
						rowsHTML+="<output form='form2_"+id+"'><div class='figure'><img src='"+updated_blob+"'></div></output>";
						rowsHTML+="<br>Size: <input type='number' form='form2_"+id+"' readonly='readonly' value='"+result.column_size+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form2_"+id+"'>";					
						rowsHTML+="<input type='hidden' form='form2_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='submit' class='submit_hidden' form='form2_"+id+"' id='save_form2_"+id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form2_"+id+"' id='delete_form2_"+id+"' onclick='form2_delete_item($(this));'>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form2_body').append(rowsHTML);
				
				var fields=document.getElementById("form2_"+id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
				});
			});
			$('textarea').autosize();
			hide_loader();
		});
	}
}


/**
 * @form Manage Assets
 * @formNo 5
 * @Loading light
 */
function form5_ini()
{
	show_loader();
	var fid=$("#form5_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form5_header');
		
	var fasset=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form5_index');
	var prev_element=document.getElementById('form5_prev');
	var next_element=document.getElementById('form5_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	
	var columns="<assets count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fasset+"</name>" +
			"<type>"+ftype+"</type>" +
			"<description></description>" +
			"</assets>";
	
	$('#form5_body').html("");

	fetch_requested_data('form5',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form5_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form5_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form5_"+result.id+"' class='dblclick_editable' value='"+result.type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="<textarea readonly='readonly' form='form5_"+result.id+"' class='dblclick_editable'>"+result.description+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form5_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form5_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form5_"+result.id+"' title='Delete' onclick='form5_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form5_body').append(rowsHTML);
			
			var fields=document.getElementById("form5_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form5_update_item(fields);
			});
		});
		
		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();

		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'assets');
		});
		hide_loader();
	});
};


/**
 * @form Attendance
 * @formNo 7
 * @Loading light
 */
function form7_ini()
{
	show_loader();
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
			"<date exact='yes'>"+get_raw_time(fdate)+"</date>" +
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
					"<status exact='yes'>active</status>" +
					"</staff>";
			fetch_requested_data('form7',staff_columns,function(staff_names)
			{
				staff_names.forEach(function(staff_name)
				{
					var rowsHTML="";
					var data_id=get_new_key();
					rowsHTML+="<tr>";
						rowsHTML+="<form id='form7_"+data_id+"'></form>";
							rowsHTML+="<td data-th='Staff Name'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form7_"+data_id+"' value='"+staff_name.acc_name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Attendance'>";
								rowsHTML+="<input type='text' form='form7_"+data_id+"' value='present' class='dblclick_editable'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Hours Worked'>";
								rowsHTML+="<input type='number' form='form7_"+data_id+"' value='8' class='dblclick_editable'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
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
				
				longPressEditable($('.dblclick_editable'));
				hide_loader();
			});
		}
		else
		{
			results.forEach(function(result)
			{
				var rowsHTML="";
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form7_"+result.id+"'></form>";
						rowsHTML+="<td data-th='Name'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form7_"+result.id+"' value='"+result.acc_name+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Name'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form7_"+result.id+"' value='"+result.presence+"' class='dblclick_editable'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Name'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form7_"+result.id+"' value='"+result.hours_worked+"' class='dblclick_editable'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Name'>";
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
			
			longPressEditable($('.dblclick_editable'));
			hide_loader();
		}
	});
};


/**
 * @form Manage Staff
 * @formNo 8
 */
function form8_ini()
{
	show_loader();
	var fid=$("#form8_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form8_header');
	
	var fname=filter_fields.elements[0].value;
	var fstatus=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form8_index');
	var prev_element=document.getElementById('form8_prev');
	var next_element=document.getElementById('form8_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<staff count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<phone></phone>" +
			"<email></email>" +
			"<status>"+fstatus+"</status>" +
			"<acc_name></acc_name>" +
			"<address></address>" +
			"<pincode></pincode>" +
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
			var rowsHTML="<tr>";
				rowsHTML+="<form id='form8_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form8_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Contact'>";
						rowsHTML+="Phone: <input type='text' readonly='readonly' form='form8_"+result.id+"' value='"+result.phone+"'>";
						rowsHTML+="<br>Email: <textarea readonly='readonly' form='form8_"+result.id+"' class='dblclick_editable'>"+result.email+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Address'>";
						rowsHTML+="<textarea wrap='soft' readonly='readonly' form='form8_"+result.id+"'>"+result.address+", "+result.pincode+", "+result.city+", "+result.state+", "+result.country+"</textarea>";
						rowsHTML+="<img class='edit_icon' wrap='virtual' src='images/edit.png' form='form8_"+result.id+"' onclick='modal17_action($(this));'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details' id='form8_"+result.id+"_details'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form8_"+result.id+"' class='dblclick_editable' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form8_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form8_"+result.id+"' title='Delete' onclick='form8_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.address+"'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.pincode+"'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.city+"'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.state+"'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.country+"'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.address_status+"'>";
						rowsHTML+="<input type='hidden' form='form8_"+result.id+"' value='"+result.acc_name+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form8_body').append(rowsHTML);
			
			var fields=document.getElementById("form8_"+result.id);
			var fstatus=fields.elements[4];
			
			set_static_value_list('staff','status',fstatus);
			
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form8_update_item(fields);
			});
			
			var attributes_data="<attributes>"+
								"<name exact='yes'>"+result.acc_name+"</name>" +
								"<type exact='yes'>staff</type>" +
								"<attribute></attribute>" +
								"<value></value>" +
								"</attributes>";
			fetch_requested_data('',attributes_data,function(attributes)
			{
				var attribute_content="";
				attributes.forEach(function(attribute)
				{
					attribute_content+=attribute.attribute+": "+attribute.value+"<br>";
				});
				var td_elem=document.getElementById('form8_'+result.id+'_details');
				td_elem.innerHTML=attribute_content;
			});
		});
		
		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();

		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'staff');
		});
		hide_loader();
	});
};


/**
 * @form New Service Bill
 * @formNo 10
 * @Loading light
 */
function form10_ini()
{
	var bill_id=$("#form10_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	$('#form10_body').html("");
	$('#form10_foot').html("");
	
	if(bill_id!="")
	{
		show_loader();
		var bill_columns="<bills>" +
				"<id>"+bill_id+"</id>" +
				"<bill_num></bill_num>"+
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
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
				"<tax></tax>" +
				"</bill_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			var filter_fields=document.getElementById('form10_master');
			
			for (var i in bill_results)
			{
				filter_fields.elements[1].value=bill_results[i].customer_name;
				filter_fields.elements[2].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements[3].value=bill_results[i].bill_num;
				filter_fields.elements[4].value=bill_id;
				filter_fields.elements[5].value=bill_results[i].offer;
				filter_fields.elements[6].value=bill_results[i].transaction_id;
				var save_button=filter_fields.elements[7];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form10_update_form();
				});
				
				var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
							"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
							"<td>Rs. "+bill_results[i].amount+"</br>" +
							"Rs. "+bill_results[i].discount+"</br>" +
							"Rs. "+bill_results[i].tax+"</br>" +
							"Rs. "+bill_results[i].total+"</td>" +
							"<td></td>" +
							"</tr>";
				$('#form10_foot').html(total_row);
				
				break;
			}
		
		/////////////////////////////////////////////////////////////////////////
				
			fetch_requested_data('',bill_items_column,function(results)
			{
				var message_string="Bill from: "+get_session_var('title')+"\nAddress: "+get_session_var('address');
				
				results.forEach(function(result)
				{
					message_string+="\nItem: "+result.item_name;
					message_string+=" Price: "+result.unit_price;
					
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form10_"+id+"'></form>";
						rowsHTML+="<td data-th='Service Name'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form10_"+id+"' value='"+result.item_name+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Person'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form10_"+id+"' value='"+result.staff+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Additional Notes'>";
							rowsHTML+="<textarea readonly='readonly' form='form10_"+id+"'>"+result.notes+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form10_"+id+"' value='"+result.unit_price+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+result.total+"'>";
							rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+result.amount+"'>";
							rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+result.discount+"'>";
							rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+result.tax+"'>";
							rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+result.offer+"'>";
							rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form10_"+id+"' id='save_form10_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form10_"+id+"' id='delete_form10_"+id+"' onclick='form10_delete_item($(this));'>";
							rowsHTML+="<input type='hidden' form='form10_"+id+"'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form10_body').append(rowsHTML);
				});
				
				message_string+="\nAmount: "+bill_results[0].amount;
				message_string+="\ndiscount: "+bill_results[0].discount;
				message_string+="\nTax: "+bill_results[0].tax;
				message_string+="\nTotal: "+bill_results[0].total;
				
				var subject="Bill from "+get_session_var('title');
				$('#form10_share').show();
				$('#form10_share').click(function()
				{
					modal44_action(filter_fields.elements[1].value,subject,message_string);
				});
				hide_loader();
			});
		});
	}
}


/**
 * @form Manage Payments
 * @formNo 11
 * @Loading light
 */
function form11_ini()
{
	show_loader();
	var fid=$("#form11_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form11_header');
	
	var ftype=filter_fields.elements[0].value;
	var faccount=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form11_index');
	var prev_element=document.getElementById('form11_prev');
	var next_element=document.getElementById('form11_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<payments count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<type>"+ftype+"</type>" +
			"<total_amount></total_amount>" +
			"<paid_amount></paid_amount>" +
			"<acc_name>"+faccount+"</acc_name>" +
			"<due_date></due_date>" +
			"<status>"+fstatus+"</status>" +
			"<date></date>" +
			"<mode></mode>" +
			"<bill_id></bill_id>" +
			"<notes></notes>" +
			"<last_updated></last_updated>" +
			"</payments>";

	$('#form11_body').html("");

	fetch_requested_data('form11',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var message_string="";
			if(result.type=='paid')
			{
				message_string="Payment of Rs: "+result.paid_amount+" paid on "+get_my_past_date(result.date)+".\n The status of this payment is "+result.status;
			}
			else
			{
				message_string="Payment of Rs: "+result.paid_amount+" received on "+get_my_past_date(result.date)+".\n The status of this payment is "+result.status;
			}
			var subject="Payment Receipt from "+get_session_var('title');
			
			var detail_string="Bill Id: " +result.bill_id+
					"\nMode of payment: " +result.mode+
					"\nDue Date: "+get_my_past_date(result.due_date)+
					"\nDate: "+get_my_past_date(result.date)+
					"\nClosing Notes: "+result.notes;
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form11_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form11_"+result.id+"' value='"+result.type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Account'>";
						rowsHTML+="<textarea readonly='readonly' form='form11_"+result.id+"'>"+result.acc_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Total Amount'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form11_"+result.id+"' value='"+result.total_amount+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Paid Amount'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form11_"+result.id+"' class='dblclick_editable' value='"+result.paid_amount+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form11_"+result.id+"' class='dblclick_editable' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="<textarea readonly='readonly' form='form11_"+result.id+"'>"+detail_string+"</textarea>";
						rowsHTML+="<img class='edit_icon' src='images/edit.png' form='form11_"+result.id+"' onclick='modal29_action($(this));'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form11_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='hidden' form='form11_"+result.id+"' value='"+result.mode+"'>";
						rowsHTML+="<input type='hidden' form='form11_"+result.id+"' value='"+result.date+"'>";
						rowsHTML+="<input type='hidden' form='form11_"+result.id+"' value='"+result.due_date+"'>";
						rowsHTML+="<input type='hidden' form='form11_"+result.id+"' value='"+result.bill_id+"'>";
						rowsHTML+="<input type='hidden' form='form11_"+result.id+"' value='"+result.notes+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form11_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='hidden' form='form11_"+result.id+"' value='"+message_string+"'>";
						rowsHTML+="<input type='button' form='form11_"+result.id+"' title='Share' class='share_icon'>"; //onclick=\"modal44_action('"+result.acc_name+"','"+subject+"','"+message_string+"');\">";
					rowsHTML+="</td>";
			rowsHTML+="</tr>";
			
			$('#form11_body').append(rowsHTML);
			
			var fields=document.getElementById("form11_"+result.id);
			var status_filter=fields.elements[4];
			var share_message=fields.elements[13];
			var share_button=fields.elements[14];
			
			set_static_value_list('payments','status',status_filter);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form11_update_item(fields);
			});
			
			$(share_button).on("click", function(event)
			{
				event.preventDefault();
				modal44_action(result.acc_name,subject,share_message.value);
			});
	
			longPressEditable($('.dblclick_editable'));
			$('textarea').autosize();
		});
		
		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'payments');
		});
		hide_loader();
	});
};


/**
 * @form New Products Bill
 * @formNo 12
 * @Loading light
 */
function form12_ini()
{
	var bill_id=$("#form12_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form12_body').html("");
	$('#form12_foot').html("");
	if(bill_id!="")
	{
		show_loader();
		var bill_columns="<bills>" +
				"<id>"+bill_id+"</id>" +
				"<bill_num></bill_num>"+				
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
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
				"<tax></tax>" +
				"<free_with></free_with>" +
				"</bill_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			var filter_fields=document.getElementById('form12_master');
			
			for (var i in bill_results)
			{
				filter_fields.elements[1].value=bill_results[i].customer_name;
				filter_fields.elements[2].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements[3].value=bill_results[i].bill_num;
				filter_fields.elements[4].value=bill_id;
				filter_fields.elements[5].value=bill_results[i].offer;
				filter_fields.elements[6].value=bill_results[i].transaction_id;
				var save_button=filter_fields.elements[7];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form12_update_form();
				});
				
				var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
							"<td>Rs. "+bill_results[i].amount+"</br>" +
							"Rs. "+bill_results[i].discount+"</br>" +
							"Rs. "+bill_results[i].tax+"</br>" +
							"Rs. "+bill_results[i].total+"</td>" +
							"<td></td>" +
							"</tr>";
				$('#form12_foot').html(total_row);
				
				break;
			}
		
		
			fetch_requested_data('',bill_items_column,function(results)
			{
				var message_string="Bill from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');
				
				results.forEach(function(result)
				{
					message_string+="\nItem: "+result.item_name;
					message_string+=" Quantity: "+result.quantity;
					message_string+=" Total: "+result.total;
					
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form12_"+id+"'></form>";
						rowsHTML+="<td data-th='Product Name'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form12_"+id+"' value='"+result.item_name+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form12_"+id+"' value='"+result.batch+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form12_"+id+"' value='"+result.quantity+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Unit Price'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form12_"+id+"' value='"+result.unit_price+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Total'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form12_"+id+"' value='"+result.total+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+result.amount+"'>";
							rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+result.discount+"'>";
							rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+result.tax+"'>";
							rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+result.offer+"'>";
							rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='submit_hidden' form='form12_"+id+"' id='save_form12_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form12_"+id+"' id='delete_form12_"+id+"' onclick='form12_delete_item($(this));'>";
							rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
							rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form12_body').append(rowsHTML);
					
					var fields=document.getElementById("form12_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
					});
				});
				
				message_string+="\nAmount: "+bill_results[0].amount;
				message_string+="\ndiscount: "+bill_results[0].discount;
				message_string+="\nTax: "+bill_results[0].tax;
				message_string+="\nTotal: "+bill_results[0].total;
				
				var subject="Bill from "+get_session_var('title');
				$('#form12_share').show();
				$('#form12_share').click(function()
				{
					modal44_action(filter_fields.elements[1].value,subject,message_string);
				});
				
				hide_loader();
			});
		});
	}
}


/**
 * @form Manage Tasks
 * @formNo 14
 * @Loading heavy
 */
function form14_ini()
{
	show_loader();
	var fid=$("#form14_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form14_header');
	
	//populating form 
	var ftype=filter_fields.elements[0].value;
	var fassignee=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form14_index');
	var prev_element=document.getElementById('form14_prev');
	var next_element=document.getElementById('form14_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<task_instances count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+ftype+"</name>" +
			"<description></description>" +
			"<assignee>"+fassignee+"</assignee>" +
			"<t_due></t_due>" +
			"<t_initiated></t_initiated>" +
			"<task_hours></task_hours>" +
			"<status>"+fstatus+"</status>" +
			"<last_updated></last_updated>" +
			"</task_instances>";

	$('#form14_body').html("");

	fetch_requested_data('form14',columns,function(results)
	{
		results.forEach(function(result)
		{
			result.t_due=get_my_datetime(result.t_due);
			result.t_initiated=get_my_datetime(result.t_initiated);
			var message_string="Due time: "+result.t_due+"\nTask: "+result.name+"\nAssignee:"+result.assignee;
			message_string=encodeURIComponent(message_string);
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form14_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Task Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form14_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Assignee'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form14_"+result.id+"' class='dblclick_editable' value='"+result.assignee+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Due Time'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form14_"+result.id+"' class='dblclick_editable' value='"+result.t_due+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form14_"+result.id+"' class='dblclick_editable' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' readonly='readonly' form='form14_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form14_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form14_"+result.id+"' title='Delete' onclick='form14_delete_item($(this));'>";
						rowsHTML+="<a id='form14_whatsapp_"+result.id+"' href='whatsapp://send?text="+message_string+"' target='_blank'><img style='width:25px;height:25px;' src='./images/whatsapp.jpeg' form='form14_"+result.id+"' title='Send details through WhatsApp'></a>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form14_body').append(rowsHTML);
			var fields=document.getElementById("form14_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form14_update_item(fields);
			});
			
			var name_filter=fields.elements[0];
			var assignee_filter=fields.elements[1];
			var due_filter=fields.elements[2];
			var status_filter=fields.elements[3];
						
			var staff_data="<staff>" +
					"<acc_name></acc_name>" +
					"</staff>";
			set_my_value_list(staff_data,assignee_filter);
			
			set_static_value_list('task_instances','status',status_filter);
			$(due_filter).datetimepicker();
		});
		
		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		

		longPressEditable($('.dblclick_editable'));
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'tasks');
		});
		hide_loader();
	});
};

/**
 * @form Enter Customer Returns
 * @formNo 15
 * @Loading light
 */
function form15_ini()
{
	var data_id=$("#form15_link").attr('data_id');
	if(data_id==null)
		data_id="";	
	
	$('#form15_body').html("");
	$('#form15_foot').html("");
	
	if(data_id!="")
	{
		show_loader();
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
				"<return_id exact='yes'>"+data_id+"</return_id>" +
				"<item_name></item_name>" +
				"<batch></batch>" +
				"<notes></notes>" +
				"<quantity></quantity>" +
				"<type></type>" +
				"<refund_amount></refund_amount>" +
				"<exchange_batch></exchange_batch>" +
				"<saleable></saleable>" +
				"<tax></tax>" +
				"</customer_return_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',return_columns,function(return_results)
		{
			var filter_fields=document.getElementById('form15_master');
			
			for (var i in return_results)
			{
				filter_fields.elements[1].value=return_results[i].customer;
				filter_fields.elements[2].value=get_my_past_date(return_results[i].return_date);
				filter_fields.elements[3].value=data_id;
				filter_fields.elements[4].value=return_results[i].transaction_id;
				var save_button=filter_fields.elements[5];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form15_update_form();
				});
		
				var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Refund:</td>" +
							"<td>Rs. "+return_results[i].total+"</td>" +
							"<td></td>" +
							"</tr>";
				$('#form15_foot').html(total_row);
				
				break;
			}
		
			fetch_requested_data('',return_items_column,function(results)
			{
				var message_string="Returns Bill from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');
				
				results.forEach(function(result)
				{
					message_string+="\nItem: "+result.item_name;
					message_string+=" Quantity: "+result.quantity;
					
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form15_"+id+"'></form>";
						rowsHTML+="<td data-th='Product Name'>";
							rowsHTML+="<textarea readonly='readonly' form='form15_"+id+"'>"+result.item_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form15_"+id+"' value='"+result.batch+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Notes'>";
							rowsHTML+="<textarea readonly='readonly' form='form15_"+id+"'>"+result.notes+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form15_"+id+"' value='"+result.quantity+"' step='any'>";
							rowsHTML+="</br>Saleable: <input type='checkbox' readonly='readonly' form='form15_"+id+"' "+result.saleable+">";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Type'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form15_"+id+"' value='"+result.type+"'></br>";
							if(result.type=='refund')
							{
								rowsHTML+="Amount <input type='number' readonly='readonly' step='any' form='form15_"+id+"' value='"+result.refund_amount+"'>";
								message_string+=" Refund Rs: "+result.refund_amount;
							}
							else
							{
								rowsHTML+="Batch <input type='text' readonly='readonly' form='form15_"+id+"' value='"+result.exchange_batch+"'>";
								message_string+=" Exchanged";
							}
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form15_"+id+"' value='"+result.tax+"'>";
							rowsHTML+="<input type='hidden' form='form15_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='submit_hidden' form='form15_"+id+"' id='save_form15_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form15_"+id+"' id='delete_form15_"+id+"' onclick='form15_delete_item($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form15_body').append(rowsHTML);
					
					var fields=document.getElementById("form15_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
					});
				});
				
				message_string+="\nTotal: "+filter_fields.elements[3].value;
				message_string=encodeURIComponent(message_string);
				
				var subject="Returns Bill from "+get_session_var('title');
				$('#form15_share').show();
				$('#form15_share').click(function()
				{
					modal44_action(filter_fields.elements[1].value,subject,message_string);
				});
				
				hide_loader();
			});
		});
	}
}

/**
 * @form Manage customer returns
 * @formNo 16
 * @Loading light
 */
function form16_ini()
{
	show_loader();
	var fid=$("#form16_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form16_header');
	
	//populating form 
	if(fid==="")
		fid=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form16_index');
	var prev_element=document.getElementById('form16_prev');
	var next_element=document.getElementById('form16_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<customer_returns count='25' start_index='"+start_index+"'>" +
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
					rowsHTML+="<td data-th='Return Id'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form16_"+result.id+"' value='"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form16_"+result.id+"'>"+result.customer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Return Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form16_"+result.id+"' value='"+get_my_past_date(result.return_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Return Amount'>";
						rowsHTML+="<input type='number' readonly='readonly' form='form16_"+result.id+"' value='"+result.total+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form16_"+result.id+"' title='Edit Return'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form16_"+result.id+"' title='Delete Return' onclick='form16_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form16_"+result.id+"' value='"+result.transaction_id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form16_body').append(rowsHTML);
			var fields=document.getElementById("form16_"+result.id);
			var edit_button=fields.elements[4];
			$(edit_button).on("click", function(event)
			{
				event.preventDefault();
				if(result.type=='product')
					element_display(result.id,'form15');
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		

		longPressEditable($('.dblclick_editable'));
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'customer_returns');
		});
		hide_loader();
	});
}

/**
 * @form Manage supplier returns
 * @formNo 17
 * @Loading light
 */
function form17_ini()
{
	show_loader();
	var fid=$("#form17_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form17_header');
	
	//populating form 
	if(fid==="")
		fid=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form17_index');
	var prev_element=document.getElementById('form17_prev');
	var next_element=document.getElementById('form17_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<supplier_returns count='25' start_index='"+start_index+"'>" +
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
					rowsHTML+="<td data-th='Return Id'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form17_"+result.id+"' value='"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Supplier'>";
						rowsHTML+="<textarea readonly='readonly' form='form17_"+result.id+"'>"+result.supplier+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Return Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form17_"+result.id+"' value='"+get_my_past_date(result.return_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Return Amount'>";
						rowsHTML+="<input type='number' readonly='readonly' form='form17_"+result.id+"' value='"+result.total+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form17_"+result.id+"' title='Edit Return'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form17_"+result.id+"' title='Delete Return' onclick='form17_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form17_"+result.id+"' value='"+result.transaction_id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form17_body').append(rowsHTML);
			var fields=document.getElementById("form17_"+result.id);
			var edit_button=fields.elements[4];
			$(edit_button).on("click", function(event)
			{
				event.preventDefault();
				if(result.type=='product')
					element_display(result.id,'form19');
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'supplier_returns');
		});
		hide_loader();
	});
}

/**
 * @form Enter Supplier Returns
 * @formNo 19
 * @Loading light
 */
function form19_ini()
{
	var data_id=$("#form19_link").attr('data_id');
	if(data_id==null)
		data_id="";	
	
	$('#form19_body').html("");
	$('#form19_foot').html("");
	
	if(data_id!="")
	{
		show_loader();
		var return_columns="<supplier_returns>" +
				"<id>"+data_id+"</id>" +
				"<supplier></supplier>" +
				"<total></total>" +
				"<tax></tax>" +
				"<return_date></return_date>" +
				"<type>product</type>" +
				"<transaction_id></transaction_id>" +
				"</supplier_returns>";
		var return_items_column="<supplier_return_items>" +
				"<id></id>" +
				"<return_id exact='yes'>"+data_id+"</return_id>" +
				"<item_name></item_name>" +
				"<batch></batch>" +
				"<notes></notes>" +
				"<quantity></quantity>" +
				"<refund_amount></refund_amount>" +
				"<tax></tax>" +
				"<saleable></saleable>" +
				"</supplier_return_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',return_columns,function(return_results)
		{
			for (var i in return_results)
			{
				var filter_fields=document.getElementById('form19_master');
				filter_fields.elements[1].value=return_results[i].supplier;
				filter_fields.elements[2].value=get_my_past_date(return_results[i].return_date);
				filter_fields.elements[3].value=data_id;
				filter_fields.elements[4].value=return_results[i].transaction_id;
				var save_button=filter_fields.elements[5];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form19_update_form();
				});

				var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Refund:</td>" +
							"<td>Rs. "+return_results[i].total+"</td>" +
							"<td></td>" +
							"</tr>";
				$('#form19_foot').html(total_row);
				
				break;
			}
			
			fetch_requested_data('',return_items_column,function(results)
			{
				var message_string="Returns from:"+get_session_var('title')+"\nAddress: "+get_session_var('address');
				
				results.forEach(function(result)
				{
					message_string+="\nItem: "+result.item_name;
					message_string+=" Quantity: "+result.quantity;
					message_string+=" Amount: "+result.refund_amount;
					
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form19_"+id+"'></form>";
						rowsHTML+="<td data-th='Product Name'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form19_"+id+"' value='"+result.item_name+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form19_"+id+"' value='"+result.batch+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Notes'>";
							rowsHTML+="<textarea readonly='readonly' form='form19_"+id+"'>"+result.notes+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form19_"+id+"' value='"+result.quantity+"' step='any'>";
							rowsHTML+="</br>Saleable: <input type='checkbox' readonly='readonly' form='form19_"+id+"' "+result.saleable+">";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Return Amount'>";
							rowsHTML+="<input type='number' readonly='readonly' step='any' form='form19_"+id+"' value='"+result.refund_amount+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form19_"+id+"' value='"+result.tax+"'>";
							rowsHTML+="<input type='hidden' form='form19_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form19_"+id+"' id='save_form19_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form19_"+id+"' id='delete_form19_"+id+"' onclick='form19_delete_item($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form19_body').append(rowsHTML);
				});

				message_string+="\nTotal Refund: "+filter_fields.elements[3].value;
				message_string=encodeURIComponent(message_string);
				
				var subject="Returns from "+get_session_var('title');
				$('#form19_share').show();
				$('#form19_share').click(function()
				{
					modal44_action(filter_fields.elements[1].value,subject,message_string);
				});
				
				hide_loader();
			});
		});
	}
}


/**
 * @form New Supplier Bill
 * @formNo 21
 * @Loading light
 */
function form21_ini()
{
	var bill_id=$("#form21_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form21_body').html("");
	$('#form21_foot').html("");
	
	if(bill_id!="")
	{
		show_loader();
		var bill_columns="<supplier_bills>" +
				"<id>"+bill_id+"</id>" +
				"<bill_id></bill_id>" +
				"<supplier></supplier>" +
				"<total></total>" +
				"<amount></amount>" +
				"<discount></discount>" +
				"<tax></tax>" +
				"<bill_date></bill_date>" +
				"<entry_date></entry_date>" +
				"<notes></notes>" +
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
				filter_fields.elements[5].value=bill_results[i].notes;
				filter_fields.elements[6].value=bill_id;
				filter_fields.elements[7].value=bill_results[i].transaction_id;
				var save_button=filter_fields.elements[8];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form21_update_form();
				});
				
				var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
							"<td>Rs. "+bill_results[i].amount+"</br>" +
							"Rs. "+bill_results[i].discount+"</br>" +
							"Rs. "+bill_results[i].tax+"</br>" +
							"Rs. "+bill_results[i].total+"</td>" +
							"<td></td>" +
							"</tr>";
				$('#form21_foot').html(total_row);
				
				break;
			}
		});
		
		var bill_items_column="<supplier_bill_items>" +
				"<id></id>" +
				"<product_name></product_name>" +
				"<batch></batch>" +
				"<amount></amount>" +
				"<tax></tax>" +
				"<total></total>" +
				"<unit_price></unit_price>" +
				"<p_quantity></p_quantity>" +
				"<f_quantity></f_quantity>" +
				"<quantity></quantity>" +
				"<storage></storage>" +
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
				"</supplier_bill_items>";
		
		fetch_requested_data('',bill_items_column,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="";
				var id=result.id;
				rowsHTML+="<tr>";
				rowsHTML+="<form id='form21_"+id+"'></form>";
					rowsHTML+="<td data-th='Product Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form21_"+id+"'>"+result.product_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="Bought: <input type='number' readonly='readonly' form='form21_"+id+"' value='"+result.p_quantity+"' step='any'>";
						rowsHTML+="</br>Free: <input type='number' readonly='readonly' form='form21_"+id+"' value='"+result.f_quantity+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Amount'>";
						rowsHTML+="Total: <input type='number' readonly='readonly' form='form21_"+id+"' value='"+result.total+"' step='any'>";
						rowsHTML+="</br>Tax: <input type='number' readonly='readonly' form='form21_"+id+"' value='"+result.tax+"' step='any'>";
						rowsHTML+="</br>Amount: <input type='number' readonly='readonly' form='form21_"+id+"' value='"+result.amount+"' step='any'>";
						rowsHTML+="</br>Unit Price: <input type='number' readonly='readonly' form='form21_"+id+"' value='"+result.unit_price+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form21_"+id+"' value='"+result.batch+"'>";
						rowsHTML+="<input type='hidden' form='form21_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Storage Area'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form21_"+id+"' value='"+result.storage+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form21_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='submit' class='submit_hidden' form='form21_"+id+"' id='save_form21_"+id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form21_"+id+"' id='delete_form21_"+id+"' onclick='form21_delete_item($(this));'>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form21_body').append(rowsHTML);
				
				var fields=document.getElementById("form21_"+id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
				});
			});
			hide_loader();
		});
	}
}



/**
 * @form New Purchase order
 * @formNo 24
 * @Loading light
 */
function form24_ini()
{
	var order_id=$("#form24_link").attr('data_id');
	if(order_id==null)
		order_id="";	
	
	$('#form24_body').html("");
	
	if(order_id!="")
	{
		show_loader();
		var order_columns="<purchase_orders>" +
				"<id>"+order_id+"</id>" +
				"<order_num></order_num>"+
				"<supplier></supplier>" +
				"<order_date></order_date>" +
				"<status></status>" +
				"</purchase_orders>";
		var order_items_column="<purchase_order_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<quantity></quantity>" +
				"<order_id exact='yes'>"+order_id+"</order_id>" +
				"<make></make>" +
				"<mrp></mrp>"+
				"<price></price>" +
				"</purchase_order_items>";
	
		////separate fetch function to get order details like customer name, total etc.
		fetch_requested_data('',order_columns,function(order_results)
		{
			var filter_fields=document.getElementById('form24_master');
			
			for(var i in order_results)
			{
				filter_fields.elements[1].value=order_results[i].supplier;
				filter_fields.elements[2].value=get_my_past_date(order_results[i].order_date);
				filter_fields.elements[3].value=order_results[i].order_num;
				filter_fields.elements[4].value=order_results[i].status;
				filter_fields.elements[5].value=order_id;
				
				var save_button=filter_fields.elements[6];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form24_update_form();
				});

				break;
			}
		
			fetch_requested_data('',order_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form24_"+id+"'></form>";
						rowsHTML+="<td data-th='Item Name'>";
							rowsHTML+="<textarea readonly='readonly' required form='form24_"+id+"'>"+result.item_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' required form='form24_"+id+"' value='"+result.quantity+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Make'>";
							rowsHTML+="<textarea readonly='readonly' required form='form24_"+id+"'>"+result.make+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="MRP: <input type='number'readonly='readonly' required form='form24_"+id+"' value='"+result.mrp+"' step='any'>";
							rowsHTML+="<br>Price: <input type='number'readonly='readonly' required form='form24_"+id+"' value='"+result.price+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form24_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form24_"+id+"' id='save_form24_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form24_"+id+"' id='delete_form24_"+id+"' onclick='form24_delete_item($(this));'>";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
				
					$('#form24_body').append(rowsHTML);
				});
				
				$('#form24_share').show();
				$('#form24_share').click(function()
				{
					modal101_action('purchase_order',order_results[i].supplier,order_results[i].order_num);
				});
				
				hide_loader();
			});
		});
	}
}

/**
 * @form Manage Customers
 * @formNo 30
 * @Loading light
 */
function form30_ini()
{
	show_loader();
	var fid=$("#form30_link").attr('data_id');
	if(fid==null)
		fid="";	
		
	var filter_fields=document.getElementById('form30_header');
	
	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form30_index');
	var prev_element=document.getElementById('form30_prev');
	var next_element=document.getElementById('form30_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<customers count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<acc_name></acc_name>"+
			"<phone></phone>" +
			"<email></email>" +
			"<status></status>" +
			"<notes></notes>" +
			"<address></address>" +
			"<pincode></pincode>" +
			"<city></city>" +
			"<state></state>" +
			"<country></country>" +
			"<address_status></address_status>" +
			"<last_updated></last_updated>" +
			"</customers>";

	$('#form30_body').html("");

	fetch_requested_data('form30',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form30_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' required form='form30_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Contact'>";
						rowsHTML+="Phone: <input type='text' readonly='readonly' form='form30_"+result.id+"' class='dblclick_editable' value='"+result.phone+"'>";
						rowsHTML+="<br>Email: <input type='text' readonly='readonly' form='form30_"+result.id+"' class='dblclick_editable' value='"+result.email+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Address'>";
						rowsHTML+="<textarea readonly='readonly' form='form30_"+result.id+"'>"+result.address+", "+result.pincode+", "+result.city+", "+result.state+", "+result.country+"</textarea>";
						rowsHTML+="<img class='edit_icon' src='images/edit.png' form='form30_"+result.id+"' onclick='modal24_action($(this));'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details' id='form30_"+result.id+"_details'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form30_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form30_"+result.id+"' title='Delete' onclick='form30_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.address+"'>";
						rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.pincode+"'>";
						rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.city+"'>";
						rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.state+"'>";
						rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.country+"'>";
						rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.address_status+"'>";
						rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.acc_name+"'>";
					rowsHTML+="</td>";
			rowsHTML+="</tr>";
			
			$('#form30_body').append(rowsHTML);
			var fields=document.getElementById("form30_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form30_update_item(fields);
			});
			
			var attributes_data="<attributes>"+
								"<name exact='yes'>"+result.acc_name+"</name>" +
								"<type exact='yes'>customer</type>" +
								"<attribute></attribute>" +
								"<value></value>" +
								"</attributes>";
			fetch_requested_data('',attributes_data,function(attributes)
			{
				var attribute_content="";
				attributes.forEach(function(attribute)
				{
					attribute_content+=attribute.attribute+": "+attribute.value+"<br>";
				});
				var td_elem=document.getElementById('form30_'+result.id+'_details');
				td_elem.innerHTML=attribute_content;
			});					
		});
		
		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'customers');
		});
		hide_loader();
	});
};


/**
 * @form Manage Offers
 * @formNo 35
 * @Loading light
 */
function form35_ini()
{
	show_loader();
	var fid=$("#form35_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form35_header');
	
	var fname=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form35_index');
	var prev_element=document.getElementById('form35_prev');
	var next_element=document.getElementById('form35_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<offers count='25' start_index='"+start_index+"'>" +
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
			"<last_updated></last_updated>" +
			"</offers>";

	$('#form35_body').html("");

	fetch_requested_data('form35',columns,function(results)
	{
		results.forEach(function(result)
		{
			var message_string="Exciting Offer\n"+result.offer_detail+"\nAvail at:"+encodeURIComponent(get_session_var('title'))+"\nVisit us at:"+get_session_var('address');
			message_string=encodeURIComponent(message_string);
			
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form35_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Offer Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form35_"+result.id+"'>"+result.offer_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Offer Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form35_"+result.id+"' value='"+result.offer_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='End Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form35_"+result.id+"' class='dblclick_editable' value='"+get_my_past_date(result.end_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Offer Detail'>";
						rowsHTML+="<textarea readonly='readonly' form='form35_"+result.id+"'>"+result.offer_detail+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form35_"+result.id+"' class='dblclick_editable' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form35_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form35_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form35_"+result.id+"' value='saved' onclick='form35_delete_item($(this));'>";
						rowsHTML+="<a id='form35_whatsapp_"+result.id+"' href='whatsapp://send?text="+message_string+"' target='_blank'><img style='width:25px;height:25px;' src='./images/whatsapp.jpeg' form='form35_"+result.id+"' title='Send details through WhatsApp'></a>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form35_body').append(rowsHTML);
			var fields=document.getElementById("form35_"+result.id);
			var end_filter=fields.elements[2];
			var status_filter=fields.elements[4];
			
			$(end_filter).datepicker();
			set_static_value_list('offers','status',status_filter);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form35_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'offers');
		});
		hide_loader();
	});
};


/**
 * @form Store Placement
 * @formNo 38
 * @Loading light
 */
function form38_ini()
{
	show_loader();
	var fid=$("#form38_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form38_header');
	
	var fname=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;
	var farea=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form38_index');
	var prev_element=document.getElementById('form38_prev');
	var next_element=document.getElementById('form38_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<area_utilization count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<batch>"+fbatch+"</batch>" +
			"<item_name>"+fname+"</item_name>" +
			"<name>"+farea+"</name>" +
			"</area_utilization>";

	$('#form38_body').html("");

	fetch_requested_data('form38',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form38_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Item Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form38_"+result.id+"' value='"+result.item_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form38_"+result.id+"' value='"+result.batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Store Area'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form38_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='number' readonly='readonly' form='form38_"+result.id+"' value=''>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form38_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form38_"+result.id+"' title='Delete' onclick='form38_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form38_body').append(rowsHTML);
			var fields=document.getElementById("form38_"+result.id);
			var quantity=fields.elements[3];
			var delete_button=fields.elements[5];
			
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
			});
			
			get_store_inventory(result.name,result.item_name,result.batch,function(inventory)
			{
				quantity.value=inventory;
				if(parseFloat(inventory)!=0)
				{
					$(delete_button).hide();
				}
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'store_placement');
		});
		hide_loader();
	});
};


/**
 * @form Manage Products
 * @formNo 39
 * @Loading heavy
 */
function form39_ini()
{
	show_loader();
	var fid=$("#form39_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form39_header');
	
	var fname=filter_fields.elements[0].value;
	var fmakes=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form39_index');
	var prev_element=document.getElementById('form39_prev');
	var next_element=document.getElementById('form39_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<product_master count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<make>"+fmakes+"</make>" +
			"<description></description>" +
			"<bar_code></bar_code>" +
			"<tax></tax>" +
			"<last_updated></last_updated>" +
			"</product_master>";

	$('#form39_body').html("");

	fetch_requested_data('form39',columns,function(results)
	{
		results.forEach(function(result)
		{
			var picture_column="<documents>" +
					"<id></id>" +
					"<url></url>" +
					"<doc_type exact='yes'>product_master</doc_type>" +
					"<target_id exact='yes'>"+result.id+"</target_id>" +
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
						rowsHTML+="<td data-th='Name'>";
							rowsHTML+="<textarea readonly='readonly' form='form39_"+result.id+"'>"+result.name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Make'>";
							rowsHTML+="<textarea readonly='readonly' form='form39_"+result.id+"' class='dblclick_editable'>"+result.make+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Description'>";
							rowsHTML+="<textarea readonly='readonly' form='form39_"+result.id+"' class='dblclick_editable'>"+result.description+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Picture'>";
							rowsHTML+="<output form='form39_"+result.id+"'><div class='figure' name='"+pic_results_id+"'><img id='img_form39_"+result.id+"' src='"+updated_url+"'></div></output>";
							rowsHTML+="<input type='file' form='form39_"+result.id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Tax'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form39_"+result.id+"' class='dblclick_editable' value='"+result.tax+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
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
				
				longPressEditable($('.dblclick_editable'));
				
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		$('textarea').autosize();
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'products');
		});
		hide_loader();
	});	
};


/**
 * @form Manage suppliers
 * @formNo 40
 * @Loading light
 */
function form40_ini()
{
	show_loader();
	var fid=$("#form40_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form40_header');

	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form40_index');
	var prev_element=document.getElementById('form40_prev');
	var next_element=document.getElementById('form40_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<suppliers count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<notes></notes>" +
			"<name>"+fname+"</name>" +
			"<phone></phone>" +
			"<email></email>" +
			"<acc_name></acc_name>" +
			"<address></address>" +
			"<pincode></pincode>" +
			"<city></city>" +
			"<state></state>" +
			"<country></country>" +
			"<address_status></address_status>" +
			"<last_updated></last_updated>" +
			"</suppliers>";

	$('#form40_body').html("");

	fetch_requested_data('form40',columns,function(results)
	{	
		results.forEach(function(result)
		{		
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form40_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' required form='form40_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Contact'>";
						rowsHTML+="Phone: <input type='text' readonly='readonly' form='form40_"+result.id+"' class='dblclick_editable' value='"+result.phone+"'>";
						rowsHTML+="<br>Email: <textarea readonly='readonly' form='form40_"+result.id+"' class='dblclick_editable'>"+result.email+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Address'>";
						rowsHTML+="<textarea readonly='readonly' form='form40_"+result.id+"'>"+result.address+", "+result.pincode+", "+result.city+", "+result.state+", "+result.country+"</textarea>";
						rowsHTML+="<img class='edit_icon' src='images/edit.png' form='form40_"+result.id+"' onclick='modal25_action($(this));'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details' id='form40_"+result.id+"_details'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form40_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form40_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form40_"+result.id+"' value='saved' onclick='form40_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form40_"+result.id+"' value='"+result.address+"'>";
						rowsHTML+="<input type='hidden' form='form40_"+result.id+"' value='"+result.pincode+"'>";
						rowsHTML+="<input type='hidden' form='form40_"+result.id+"' value='"+result.city+"'>";
						rowsHTML+="<input type='hidden' form='form40_"+result.id+"' value='"+result.state+"'>";
						rowsHTML+="<input type='hidden' form='form40_"+result.id+"' value='"+result.country+"'>";
						rowsHTML+="<input type='hidden' form='form40_"+result.id+"' value='"+result.address_status+"'>";
						rowsHTML+="<input type='hidden' form='form40_"+result.id+"' value='"+result.acc_name+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form40_body').append(rowsHTML);
			var fields=document.getElementById("form40_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form40_update_item(fields);
			});
			
			var attributes_data="<attributes>"+
								"<name exact='yes'>"+result.acc_name+"</name>" +
								"<type exact='yes'>supplier</type>" +
								"<attribute></attribute>" +
								"<value></value>" +
								"</attributes>";
			fetch_requested_data('',attributes_data,function(attributes)
			{
				var attribute_content="";
				attributes.forEach(function(attribute)
				{
					attribute_content+=attribute.attribute+": "+attribute.value+"<br>";
				});
				var td_elem=document.getElementById('form40_'+result.id+'_details');
				td_elem.innerHTML=attribute_content;
			});	
		});
		
		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'suppliers');
		});
		hide_loader();
	});
};

/**
 * @form Verify Customer geo-location
 * @formNo 41
 */
function form41_ini()
{
	if(is_online())
	{
		show_loader();
		var domain=get_domain();
		var username=get_username();
		var re_access=get_session_var('re');
		ajax_with_custom_func("./ajax/geoCode.php","domain="+domain+"&username="+username+"&type=customers&re="+re_access,function(e)
		{
			//console.log(e.responseText);

			$('#form41_header').html("");
		
			var lat=get_session_var('lat');
			var lng=get_session_var('lng');
			var title=get_session_var('title');
			
			if(typeof map41 != 'undefined')
				map41.remove();
		
			map41 = L.map('form41_map',{
				center: [lat,lng], 
				zoom: 10
			});
			
			//var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
			var mqUrl='http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png';
			L.tileLayer(mqUrl, 
				{
			        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenstreetMap contributors</a>',
			        subdomains:'1234'
		    	}).addTo(map41);
			
			//////////changeable master coordinates/////////
			
			var mlatlng=L.latLng(lat,lng);
			var mmarker=L.marker(mlatlng,{draggable:true}).addTo(map41).bindPopup(title);
			mmarker.on('dragend',function(event){
				var m=event.target;
				var latlng=m.getLatLng();
				var form=document.getElementById('form41_master');
				form.elements[1].value=latlng.lat;
				form.elements[2].value=latlng.lng;
				var save_button=form.elements[3];
				$(save_button).show();
			});
			
			var rowsHTML="<div class='customers_content_item'>" +
					"<form id='form41_master'>" +
					"Name: <textarea style='height:40px;width:100px' readonly='readonly'>"+title+"</textarea></br>" +
					"Latitude: <textarea style='height:20px;width:100px' readonly='readonly'>"+lat+"</textarea></br>" +
					"Longitude: <textarea style='height:20px;width:100px' readonly='readonly'>"+lng+"</textarea></br>" +
					"<input type='button' class='export_icon' value='Confirm' style='display:none;' form='form41_master'>" +
					"</form>" +
					"</div>";
			
			$('#form41_header').append(rowsHTML);
			var fields=document.getElementById("form41_master");
			var save_button=fields.elements[3];
			$(save_button).on("click", function(event)
			{
				event.preventDefault();
				form41_update_master(fields);
			});
			$(fields).parent().on('click',function(event)
			{
				//console.log('clicked on master');
				mmarker.openPopup();
			});
		
			/////////////////////////////////////////////////
			
			var customers_data="<customers>" +
					"<id></id>" +
					"<name></name>" +
					"<lat></lat>" +
					"<lng></lng>" +
					"<acc_name></acc_name>" +
					"<address_status exact='yes'>unconfirmed</address_status>" +
					"<address></address>" +
					"<pincode></pincode>" +
					"<city></city>" +
					"<state></state>" +
					"<country></country>" +
					"</customers>";
			fetch_requested_data('form41',customers_data,function(customers)
			{
				customers.forEach(function(customer)
				{
					if(customer.lat=='')
					{
						customer.lat=lat;
					}
					if(customer.lng=='')
					{
						customer.lng=lng;
					}
					var latlng=L.latLng(customer.lat,customer.lng);
					var marker=L.marker(latlng,{draggable:true}).addTo(map41).bindPopup(customer.name);
					marker.on('dragend',function(event){
						var m=event.target;
						var latlng=m.getLatLng();
						var form=document.getElementById('form41_'+customer.id);
						form.elements[1].value=latlng.lat;
						form.elements[2].value=latlng.lng;
						var save_button=form.elements[4];
						$(save_button).show();
					});
					
					var rowsHTML="<div class='customers_content_item'>" +
							"<form id='form41_"+customer.id+"'>" +
							"Name: <textarea style='height:40px;width:100px' readonly='readonly'>"+customer.acc_name+"</textarea></br>" +
							"Latitude: <textarea style='height:20px;width:100px' readonly='readonly'>"+customer.lat+"</textarea></br>" +
							"Longitude: <textarea style='height:20px;width:100px' readonly='readonly'>"+customer.lng+"</textarea></br>" +
							"<input type='hidden' value='"+customer.id+"'>" +
							"<input type='button' class='export_icon' value='Confirm' form='form41_"+customer.id+"'>" +
							"</form>" +
							"</div>";
					
					$('#form41_header').append(rowsHTML);
					var fields=document.getElementById("form41_"+customer.id);
					var save_button=fields.elements[4];
					$(save_button).on("click", function(event)
					{
						event.preventDefault();
						form41_update_item(fields);
					});
					$(fields).parent().on('click',function(event)
					{
						marker.openPopup();
					});
				});
				
				var scrollPane=$(".customers_pane");
				var scrollContent=$(".customers_content");
				scrollContent.css('width',(Math.round(225*customers.length)+225)+"px");
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
			
				hide_loader();
			});
		});
	}
	else
	{
		$("#modal6").dialog("open");
	}
}

/**
 * @form Manage Bills
 * @formNo 42
 * @Loading light
 */
function form42_ini()
{
	show_loader();
	var fid=$("#form42_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form42_header');
	
	//populating form 
	var fnum=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;

	////indexing///
	var index_element=document.getElementById('form42_index');
	var prev_element=document.getElementById('form42_prev');
	var next_element=document.getElementById('form42_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<bills count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<bill_num>"+fnum+"</bill_num>"+			
			"<customer_name>"+fname+"</customer_name>" +
			"<bill_date></bill_date>" +
			"<total></total>" +
			"<type></type>" +
			"<transaction_id></transaction_id>" +
			"<last_updated></last_updated>" +
			"</bills>";

	$('#form42_body').html("");

	fetch_requested_data('form42',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form42_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Bill No.'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form42_"+result.id+"' value='"+result.bill_num+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form42_"+result.id+"'>"+result.customer_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Bill Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form42_"+result.id+"' value='"+get_my_past_date(result.bill_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Bill Amount'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form42_"+result.id+"' value='"+result.total+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form42_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form42_"+result.id+"' title='Edit Bill'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form42_"+result.id+"' title='Delete Bill' onclick='form42_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form42_"+result.id+"' value='"+result.transaction_id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form42_body').append(rowsHTML);
			var fields=document.getElementById("form42_"+result.id);
			var edit_button=fields.elements[5];
			$(edit_button).on("click", function(event)
			{
				event.preventDefault();
				if(result.type=='product')
					element_display(result.id,'form12',['form118']);
				else if(result.type=='service')
					element_display(result.id,'form10');
				else if(result.type=='both')
					element_display(result.id,'form72');
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		$('textarea').autosize();
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'bills');
		});
		hide_loader();
	});
}


/**
 * @form Manage Purchase orders
 * @formNo 43
 * @Loading light
 */
function form43_ini()
{
	show_loader();
	var fid=$("#form43_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form43_header');
	
	//populating form 
	var fnum=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form43_index');
	var prev_element=document.getElementById('form43_prev');
	var next_element=document.getElementById('form43_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<purchase_orders count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<order_num>"+fnum+"</order_num>"+
			"<supplier>"+fname+"</supplier>" +
			"<order_date></order_date>" +
			"<status>"+fstatus+"</status>" +
			"<last_updated></last_updated>" +
			"</purchase_orders>";

	$('#form43_body').html("");

	fetch_requested_data('form43',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form43_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Order #'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form43_"+result.id+"' value='"+result.order_num+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Supplier'>";
						rowsHTML+="<textarea readonly='readonly' form='form43_"+result.id+"'>"+result.supplier+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Order Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form43_"+result.id+"' value='"+get_my_past_date(result.order_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form43_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form43_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form43_"+result.id+"' title='Edit order' onclick=\"element_display('"+result.id+"','form24');\">";
						rowsHTML+="<input type='submit' class='save_icon' form='form43_"+result.id+"' title='Save order'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form43_"+result.id+"' title='Delete order' onclick='form43_delete_item($(this));'>";
					rowsHTML+="</td>";
			rowsHTML+="</tr>";
			
			$('#form43_body').append(rowsHTML);
			var fields=document.getElementById("form43_"+result.id);
			var status_filter=fields.elements[3];
			
			set_static_value_list('purchase_orders','status',status_filter);
			
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form43_update_item(fields);
			});
						
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'purchase_orders');
		});
		hide_loader();
	});
};


/**
 * @form Manage NewsLetter
 * @formNo 44
 * @Loading light
 */
function form44_ini()
{
	show_loader();
	var fid=$("#form44_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form44_header');
	
	//populating form 
	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form44_index');
	var prev_element=document.getElementById('form44_prev');
	var next_element=document.getElementById('form44_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<newsletter count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<description></description>"+
			"<count_items></count_items>" +
			"</newsletter>";

	$('#form44_body').html("");

	fetch_requested_data('form44',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form44_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form44_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Description'>";
						rowsHTML+="<textarea readonly='readonly' class='widebox' form='form44_"+result.id+"'>"+result.description+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' readonly='readonly' form='form44_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form44_"+result.id+"' title='Edit' onclick=\"element_display('"+result.id+"','form2');\">";
						rowsHTML+="<input type='button' class='delete_icon' form='form44_"+result.id+"' title='Delete' onclick='form44_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form44_body').append(rowsHTML);
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}

		$('textarea').autosize();
		
		var export_button=filter_fields.elements[1];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'NewsLetters');
		});
		hide_loader();
	});
};


/**
 * @form Set Defaults
 * @formNo 46
 * @Loading light
 */
function form46_ini()
{
	show_loader();
	var fid=$("#form46_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form46_header');
	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form46_index');
	var prev_element=document.getElementById('form46_prev');
	var next_element=document.getElementById('form46_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<user_preferences count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name></name>" +
			"<display_name>"+fname+"</display_name>" +
			"<value></value>" +
			"<status exact='yes'>active</status>" +
			"<type exact='yes'>other</type>" +
			"</user_preferences>";

	$('#form46_body').html("");

	fetch_requested_data('form46',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form46_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Setting'>";
						rowsHTML+="<textarea readonly='readonly' form='form46_"+result.id+"' data-i18n='form."+result.display_name+"'></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Value'>";
						rowsHTML+="<textarea readonly='readonly' class='dblclick_editable widebox' form='form46_"+result.id+"'>"+result.value+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form46_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='hidden' form='form46_"+result.id+"' value='"+result.name+"'>";
						rowsHTML+="<input type='submit' class='save_icon' id='save_form46_"+result.id+"' form='form46_"+result.id+"' title='Save'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form46_body').append(rowsHTML);
			
			var fields=document.getElementById("form46_"+result.id);
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form46_update_item(fields);
			});
		});
		
		$('#form46_body').find('textarea').i18n();

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'system_defaults');
		});
		hide_loader();
	});
};


/**
 * @form Select Reports
 * @formNo 48
 * @Loading light
 */
function form48_ini()
{
	show_loader();
	var fid=$("#form48_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form48_header');
	
	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form48_index');
	var prev_element=document.getElementById('form48_prev');
	var next_element=document.getElementById('form48_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<user_preferences count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name></name>" +
			"<display_name>"+fname+"</display_name>" +
			"<value></value>" +
			"<status exact='yes'>active</status>" +
			"<type exact='yes'>report</type>" +
			"</user_preferences>";

	$('#form48_body').html("");

	fetch_requested_data('form48',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form48_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Report'>";
						rowsHTML+="<textarea readonly='readonly' form='form48_"+result.id+"' data-i18n='form."+result.display_name+"'></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Selection'>";
						rowsHTML+="<input type='checkbox' form='form48_"+result.id+"' "+result.value+">";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form48_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='hidden' form='form48_"+result.id+"' value='"+result.name+"'>";
						rowsHTML+="<input type='submit' class='save_icon' id='save_form48_"+result.id+"' form='form48_"+result.id+"' value='saved'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form48_body').append(rowsHTML);
			var fields=document.getElementById("form48_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form48_update_item(fields);
			});
		});
		
		$('#form48_body').find('textarea').i18n();

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'reports');
		});
		hide_loader();
	});
};

/**
 * @form Select Forms
 * @formNo 49
 * @Loading light
 */
function form49_ini()
{
	show_loader();
	var fid=$("#form49_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form49_header');
	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form49_index');
	var prev_element=document.getElementById('form49_prev');
	var next_element=document.getElementById('form49_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<user_preferences count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name></name>" +
			"<display_name>"+fname+"</display_name>" +
			"<value></value>" +
			"<status exact='yes'>active</status>" +
			"<type exact='yes'>form</type>" +
			"</user_preferences>";

	$('#form49_body').html("");

	fetch_requested_data('form49',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form49_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Form'>";
						rowsHTML+="<textarea readonly='readonly' form='form49_"+result.id+"' data-i18n='form."+result.display_name+"'></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Selection'>";
						rowsHTML+="<input type='checkbox' form='form49_"+result.id+"' "+result.value+">";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form49_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='hidden' form='form49_"+result.id+"' value='"+result.name+"'>";
						rowsHTML+="<input type='submit' class='save_icon' id='save_form49_"+result.id+"' form='form49_"+result.id+"' value='saved'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form49_body').append(rowsHTML);
			var fields=document.getElementById("form49_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form49_update_item(fields);
			});
		});
		
		$('#form49_body').find('textarea').i18n();

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'forms');
		});
		hide_loader();
	});
};


/**
 * @form Set Accounting Defaults
 * @formNo 50
 * @Loading light
 */
function form50_ini()
{
	show_loader();
	var fid=$("#form50_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form50_header');
	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form50_index');
	var prev_element=document.getElementById('form50_prev');
	var next_element=document.getElementById('form50_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<user_preferences count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<name></name>" +
		"<display_name>"+fname+"</display_name>" +
		"<value></value>" +
		"<status exact='yes'>active</status>" +
		"<type exact='yes'>accounting</type>" +
		"</user_preferences>";

	$('#form50_body').html("");

	fetch_requested_data('form50',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form50_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form50_"+result.id+"'>"+result.display_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Value'>";
						rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form50_"+result.id+"'>"+result.value+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form50_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='hidden' form='form50_"+result.id+"' value='"+result.name+"'>";
						rowsHTML+="<input type='submit' class='save_icon' id='save_form50_"+result.id+"' form='form50_"+result.id+"'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form50_body').append(rowsHTML);
			var fields=document.getElementById("form50_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form50_update_item(fields);
			});
		});
		
		$('#form50_body').find('textarea').i18n();

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'accounting');
		});
		hide_loader();
	});
};

/**
 * @form Access Control
 * @formNo 51
 * @Loading light
 */
function form51_ini()
{
	var header_fields=document.getElementById('form51_master');
	header_fields.elements[2].value="";
	header_fields.elements[3].value='';
	
	$('#form51_body').html("");

	var	fuser=header_fields.elements[1].value;
	if(fuser!="")
	{
		show_loader();
		var user_name_columns="<accounts>" +
				"<id></id>" +
				"<username exact='yes'>"+fuser+"</username>" +
				"</accounts>";
		get_single_column_data(function(user_results)
		{
			if(user_results.length>0)
				header_fields.elements[3].value=user_results[0];
		},user_name_columns);
		
		var columns="<access_control>" +
				"<id></id>" +
				"<username exact='yes'>"+fuser+"</username>" +
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
			if(results.length==0)
			{
				//console.log('new user');
				var elements_name="<access_control>" +
							"<id></id>" +
							"<element_id></element_id>"+
							"<element_name></element_name>"+
							"<status exact='yes'>active</status>"+
							"<username exact='yes'>master</username>"+
							"</access_control>";
				
				fetch_requested_data('form51',elements_name,function(elements)
				{
					//console.log('elements found for new user');
					elements.forEach(function(element)
					{
						var data_id=get_new_key();
						var rowsHTML="";
						rowsHTML+="<tr>";
							rowsHTML+="<form id='form51_"+data_id+"'></form>";
								rowsHTML+="<td data-th='Name'>";
									rowsHTML+="<textarea readonly='readonly' form='form51_"+data_id+"' data-i18n='form."+element.element_name+"'></textarea>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Read'>";
									rowsHTML+="<input type='checkbox' form='form51_"+data_id+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Create'>";
								rowsHTML+="<input type='checkbox' form='form51_"+data_id+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Update'>";
									rowsHTML+="<input type='checkbox' form='form51_"+data_id+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Delete'>";
									rowsHTML+="<input type='checkbox' form='form51_"+data_id+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Action'>";
									rowsHTML+="<input type='hidden' form='form51_"+data_id+"' value='"+data_id+"'>";
									rowsHTML+="<input type='hidden' form='form51_"+data_id+"' value='"+element.element_id+"'>";
									rowsHTML+="<input type='submit' class='save_icon' id='save_form51_"+data_id+"' form='form51_"+data_id+"'>";	
								rowsHTML+="</td>";			
						rowsHTML+="</tr>";
						
						$('#form51_body').append(rowsHTML);
						var fields=document.getElementById("form51_"+data_id);
						$(fields).on("submit", function(event)
						{
							event.preventDefault();
							form51_create_item(fields);
						});

					});
					$('textarea').autosize();
					
					$('#form51_body').find('textarea').i18n();
					hide_loader();
				});
			}
			
			results.forEach(function(result)
			{
				//console.log('existing user');
				var rowsHTML="";
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form51_"+result.id+"'></form>";
						rowsHTML+="<td data-th='Name'>";
							rowsHTML+="<textarea readonly='readonly' form='form51_"+result.id+"' data-i18n='form."+result.element_name+"'></textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Read'>";
							rowsHTML+="<input type='checkbox' form='form51_"+result.id+"' "+result.re+">";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Create'>";
						rowsHTML+="<input type='checkbox' form='form51_"+result.id+"' "+result.cr+">";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Update'>";
							rowsHTML+="<input type='checkbox' form='form51_"+result.id+"' "+result.up+">";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Delete'>";
							rowsHTML+="<input type='checkbox' form='form51_"+result.id+"' "+result.del+">";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form51_"+result.id+"' value='"+result.id+"'>";
							rowsHTML+="<input type='hidden' form='form51_"+result.id+"' value='"+result.element_id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' id='save_form51_"+result.id+"' form='form51_"+result.id+"' value='saved'>";	
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
				
				$('#form51_body').append(rowsHTML);
				var fields=document.getElementById("form51_"+result.id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form51_update_item(fields);
				});
				hide_loader();
			});
			$('textarea').autosize();
			
			$('#form51_body').find('textarea').i18n();
		});
	}
	else
	{
		$('#form51_body').html("");
	}
};


/**
 * @form Manage Supplier Bills
 * @formNo 53
 * @Loading light
 */
function form53_ini()
{
	show_loader();
	var fid=$("#form53_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form53_header');
	
	var fbill_id=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form53_index');
	var prev_element=document.getElementById('form53_prev');
	var next_element=document.getElementById('form53_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<supplier_bills count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<bill_id>"+fbill_id+"</bill_id>" +
			"<supplier>"+fname+"</supplier>" +
			"<bill_date></bill_date>" +
			"<entry_date></entry_date>" +
			"<total></total>" +
			"<notes></notes>" +
			"<transaction_id></transaction_id>" +
			"<last_updated></last_updated>" +
			"</supplier_bills>";

	$('#form53_body').html("");

	fetch_requested_data('form53',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form53_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Bill Number'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form53_"+result.id+"' value='"+result.bill_id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Supplier'>";
						rowsHTML+="<textarea readonly='readonly' form='form53_"+result.id+"'>"+result.supplier+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Bill Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form53_"+result.id+"' value='"+get_my_past_date(result.bill_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Total'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form53_"+result.id+"' value='"+result.total+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Notes'>";
						rowsHTML+="<textarea readonly='readonly' form='form53_"+result.id+"' class='dblclick_editable'>"+result.notes+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form53_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form53_"+result.id+"' title='Edit Bill'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form53_"+result.id+"' title='Delete Bill' onclick='form53_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form53_"+result.id+"' value='"+result.transaction_id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form53_body').append(rowsHTML);
			var fields=document.getElementById("form53_"+result.id);
			var edit_button=fields.elements[6];
			$(edit_button).on("click", function(event)
			{
				event.preventDefault();
				element_display(result.id,'form21',['form122','form136','form158']);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'supplier_bills');
		});
		hide_loader();
	});
}

/**
 * @form Select Templates
 * @formNo 54
 */
function form54_ini()
{
	show_loader();
	var fid=$("#form54_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form54_header');
	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form54_index');
	var prev_element=document.getElementById('form54_prev');
	var next_element=document.getElementById('form54_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<user_preferences count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name></name>" +
			"<display_name>"+fname+"</display_name>" +
			"<value></value>" +
			"<status exact='yes'>active</status>" +
			"<type exact='yes'>template</type>" +
			"</user_preferences>";

	$('#form54_body').html("");

	fetch_requested_data('form54',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form54_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Template Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form54_"+result.id+"' data-i18n='form."+result.display_name+"'></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Selected Template'>";
						rowsHTML+="<input type='text' form='form54_"+result.id+"' value='"+result.value+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form54_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' id='save_form54_"+result.id+"' form='form54_"+result.id+"' title='Save'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form54_body').append(rowsHTML);
			var fields=document.getElementById("form54_"+result.id);
			var template_filter=fields.elements[1];
			set_static_value_list('template',result.name,template_filter);
			
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form54_update_item(fields);
			});
		});
		
		$('#form54_body').find('textarea').i18n();

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
				
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'printing_templates');
		});
		hide_loader();
	});
};


/**
 * @form Cash Register
 * @formNo 56
 * @Loading light
 */
function form56_ini()
{
	show_loader();
	var fid=$("#form56_link").attr('data_id');
	if(fid==null)
		fid="";	
	var filter_fields=document.getElementById('form56_header');
	
	var faccount=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form56_index');
	var prev_element=document.getElementById('form56_prev');
	var next_element=document.getElementById('form56_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<cash_register count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<type>"+ftype+"</type>" +
			"<acc_name>"+faccount+"</acc_name>" +
			"<notes></notes>" +
			"<amount></amount>" +
			"<last_updated></last_updated>" +
			"</cash_register>";

	$('#form56_body').html("");

	fetch_requested_data('form56',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form56_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Account'>";
						rowsHTML+="<textarea readonly='readonly' form='form56_"+result.id+"'>"+result.acc_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form56_"+result.id+"' value='"+result.type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Amount'>";
						rowsHTML+="<input type='number' readonly='readonly' step='any' form='form56_"+result.id+"' value='"+result.amount+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Notes'>";
						rowsHTML+="<textarea readonly='readonly' form='form56_"+result.id+"' class='dblclick_editable'>"+result.notes+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form56_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form56_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form56_"+result.id+"' onclick='form56_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form56_body').append(rowsHTML);
			var fields=document.getElementById("form56_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form56_update_item(fields);
			});
		});
		

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'expenses');
		});
		hide_loader();
	});
};

/**
 * @form manage services
 * @formNo 57
 * @Loading light
 */
function form57_ini()
{
	show_loader();
	var fid=$("#form57_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form57_header');
	var fservices=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form57_index');
	var prev_element=document.getElementById('form57_prev');
	var next_element=document.getElementById('form57_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<services count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fservices+"</name>" +
			"<description></description>" +
			"<price></price>" +
			"<tax></tax>" +
			"<last_updated></last_updated>" +
			"</services>";

	$('#form57_body').html("");

	fetch_requested_data('form57',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form57_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form57_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Description'>";
						rowsHTML+="<textarea readonly='readonly' form='form57_"+result.id+"' class='dblclick_editable'>"+result.description+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Price'>";
						rowsHTML+="<input type='number' readonly='readonly' form='form57_"+result.id+"' class='dblclick_editable' value='"+result.price+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Tax(in %)'>";
						rowsHTML+="<input type='number' readonly='readonly' form='form57_"+result.id+"' class='dblclick_editable' value='"+result.tax+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form57_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form57_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='copy_icon' form='form57_"+result.id+"' value='saved' onclick='modal21_action($(this));'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form57_"+result.id+"' value='saved' onclick='form57_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form57_body').append(rowsHTML);
			var fields=document.getElementById("form57_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form57_update_item(fields);
			});			
		});


		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'services');
		});
		hide_loader();
	});
};

/**
 * @form Service pre-requisites
 * @formNo 58
 * @Loading light
 */
function form58_ini()
{
	show_loader();
	var fid=$("#form58_link").attr('data_id');
	if(fid==null)
		fid="";	
	var filter_fields=document.getElementById('form58_header');
	
	var fservice=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var frequisite=filter_fields.elements[2].value;

	////indexing///
	var index_element=document.getElementById('form58_index');
	var prev_element=document.getElementById('form58_prev');
	var next_element=document.getElementById('form58_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<pre_requisites count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fservice+"</name>" +
			"<type exact='yes'>service</type>" +
			"<requisite_type>"+ftype+"</requisite_type>" +
			"<requisite_name>"+frequisite+"</requisite_name>" +
			"<quantity></quantity>" +
			"<last_updated></last_updated>" +
			"</pre_requisites>";

	$('#form58_body').html("");

	fetch_requested_data('form58',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form58_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form58_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Requisite Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form58_"+result.id+"' value='"+result.requisite_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Requisite Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form58_"+result.id+"' value='"+result.requisite_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form58_"+result.id+"' class='dblclick_editable' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form58_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form58_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form58_"+result.id+"' value='saved' onclick='form58_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form58_body').append(rowsHTML);
			var fields=document.getElementById("form58_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form58_update_item(fields);
			});
		});
		

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'service_pre_requisites');
		});
		hide_loader();
	});
};

/**
 * @form product pre-requisites
 * @formNo 59
 * @Loading light
 */
function form59_ini()
{
	show_loader();
	var fid=$("#form59_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form59_header');
	
	var fproduct=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var frequisite=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form59_index');
	var prev_element=document.getElementById('form59_prev');
	var next_element=document.getElementById('form59_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<pre_requisites count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fproduct+"</name>" +
			"<type exact='yes'>product</type>" +
			"<requisite_type>"+ftype+"</requisite_type>" +
			"<requisite_name>"+frequisite+"</requisite_name>" +
			"<quantity></quantity>" +
			"<last_updated></last_updated>" +
			"</pre_requisites>";

	$('#form59_body').html("");

	fetch_requested_data('form59',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form59_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form59_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Requisite Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form59_"+result.id+"' value='"+result.requisite_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Requisite Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form59_"+result.id+"' value='"+result.requisite_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form59_"+result.id+"' class='dblclick_editable' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form59_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form59_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form59_"+result.id+"' value='saved' onclick='form59_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form59_body').append(rowsHTML);
			var fields=document.getElementById("form59_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form59_update_item(fields);
			});
		});
		

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'product_pre_requisites');
		});
		hide_loader();
	});
};


/**
 * @form Product Attributes
 * @formNo 60
 * @Loading light
 */
function form60_ini()
{
	show_loader();
	var fid=$("#form60_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form60_header');
	
	var fproduct=filter_fields.elements[0].value;
	var fattribute=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form60_index');
	var prev_element=document.getElementById('form60_prev');
	var next_element=document.getElementById('form60_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<attributes count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fproduct+"</name>" +
			"<type exact='yes'>product</type>" +
			"<attribute>"+fattribute+"</attribute>" +
			"<value></value>" +
			"<last_updated></last_updated>" +
			"</attributes>";

	$('#form60_body').html("");

	fetch_requested_data('form60',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form60_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form60_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Attribute'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form60_"+result.id+"' value='"+result.attribute+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Value'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form60_"+result.id+"' value='"+result.value+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form60_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form60_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form60_"+result.id+"' value='saved' onclick='form60_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form60_body').append(rowsHTML);
			var fields=document.getElementById("form60_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form60_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		
		longPressEditable($('.dblclick_editable'));
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'product_attributes');
		});
		hide_loader();
	});
};

/**
 * @form Service Attributes
 * @formNo 61
 * @Loading light
 */
function form61_ini()
{
	show_loader();
	var fid=$("#form61_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form61_header');
	
	var fservice=filter_fields.elements[0].value;
	var fattribute=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form61_index');
	var prev_element=document.getElementById('form61_prev');
	var next_element=document.getElementById('form61_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<attributes count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fservice+"</name>" +
			"<type exact='yes'>service</type>" +
			"<attribute>"+fattribute+"</attribute>" +
			"<value></value>" +
			"<last_updated></last_updated>" +
			"</attributes>";

	$('#form61_body').html("");

	fetch_requested_data('form61',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form61_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form61_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Attribute'>";
						rowsHTML+="<textarea readonly='readonly' form='form61_"+result.id+"'>"+result.attribute+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Value'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form61_"+result.id+"' value='"+result.value+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form61_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form61_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form61_"+result.id+"' value='saved' onclick='form61_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form61_body').append(rowsHTML);
			var fields=document.getElementById("form61_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form61_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		
		longPressEditable($('.dblclick_editable'));
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'service_attributes');
		});
		hide_loader();
	});
};

/**
 * @form Product reviews
 * @formNo 62
 * @Loading light
 */
function form62_ini()
{
	show_loader();
	var fid=$("#form62_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form62_header');
	
	var fproduct=filter_fields.elements[0].value;
	var freviewer=filter_fields.elements[1].value;
	var frating=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form62_index');
	var prev_element=document.getElementById('form62_prev');
	var next_element=document.getElementById('form62_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<reviews count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fproduct+"</name>" +
			"<type exact='yes'>product</type>" +
			"<reviewer>"+freviewer+"</reviewer>" +
			"<detail></detail>" +
			"<rating>"+frating+"</rating>" +
			"<last_updated></last_updated>" +
			"</reviews>";

	$('#form62_body').html("");

	fetch_requested_data('form62',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form62_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form62_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Reviewer'>";
						rowsHTML+="<textarea readonly='readonly' form='form62_"+result.id+"'>"+result.reviewer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Detail'>";
						rowsHTML+="<textarea readonly='readonly' form='form62_"+result.id+"'>"+result.detail+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Rating'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form62_"+result.id+"' value='"+result.rating+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form62_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form62_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form62_"+result.id+"' value='saved' onclick='form62_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form62_body').append(rowsHTML);
			var fields=document.getElementById("form62_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form62_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'product_reviews');
		});
		hide_loader();
	});
};

/**
 * @form Service reviews
 * @formNo 63
 * @Loading light
 */
function form63_ini()
{
	show_loader();
	var fid=$("#form63_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form63_header');
	
	var fservice=filter_fields.elements[0].value;
	var freviewer=filter_fields.elements[1].value;
	var frating=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form63_index');
	var prev_element=document.getElementById('form63_prev');
	var next_element=document.getElementById('form63_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<reviews count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fservice+"</name>" +
			"<type exact='yes'>service</type>" +
			"<reviewer>"+freviewer+"</reviewer>" +
			"<detail></detail>" +
			"<rating>"+frating+"</rating>" +
			"<last_updated></last_updated>" +
			"</reviews>";

	$('#form63_body').html("");

	fetch_requested_data('form63',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form63_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form63_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Reviewer'>";
						rowsHTML+="<textarea readonly='readonly' form='form63_"+result.id+"'>"+result.reviewer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Detail'>";
						rowsHTML+="<textarea readonly='readonly' form='form63_"+result.id+"'>"+result.detail+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Rating'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form63_"+result.id+"' value='"+result.rating+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form63_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form63_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form63_"+result.id+"' value='saved' onclick='form63_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form63_body').append(rowsHTML);
			var fields=document.getElementById("form63_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form63_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'service_reviews');
		});
		hide_loader();
	});
};

/**
 * @form Service Cross sells
 * @formNo 64
 * @Loading light
 */
function form64_ini()
{
	show_loader();
	var fid=$("#form64_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form64_header');
	
	var fservice=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var fcross=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form64_index');
	var prev_element=document.getElementById('form64_prev');
	var next_element=document.getElementById('form64_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<cross_sells count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fservice+"</name>" +
			"<type exact='yes'>service</type>" +
			"<cross_type>"+ftype+"</cross_type>" +
			"<cross_name>"+fcross+"</cross_name>" +
			"<last_updated></last_updated>" +
			"</cross_sells>";

	$('#form64_body').html("");

	fetch_requested_data('form64',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form64_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form64_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form64_"+result.id+"' value='"+result.cross_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Cross-sold Item'>";
						rowsHTML+="<textarea readonly='readonly' form='form64_"+result.id+"'>"+result.cross_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form64_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form64_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form64_"+result.id+"' value='saved' onclick='form64_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form64_body').append(rowsHTML);
			var fields=document.getElementById("form64_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form64_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'service_cross_sells');
		});
		hide_loader();
	});
};


/**
 * @form Cross sells
 * @formNo 66
 * @Loading light
 */
function form66_ini()
{
	show_loader();
	var fid=$("#form66_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form66_header');
	
	var fproduct=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var fcross=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form66_index');
	var prev_element=document.getElementById('form66_prev');
	var next_element=document.getElementById('form66_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<cross_sells count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fproduct+"</name>" +
			"<type exact='yes'>product</type>" +
			"<cross_type>"+ftype+"</cross_type>" +
			"<cross_name>"+fcross+"</cross_name>" +
			"<last_updated></last_updated>" +
			"</cross_sells>";

	$('#form66_body').html("");

	fetch_requested_data('form66',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form66_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form66_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form66_"+result.id+"' value='"+result.cross_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Cross-sold Item'>";
						rowsHTML+="<textarea readonly='readonly' form='form66_"+result.id+"'>"+result.cross_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form66_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form66_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form66_"+result.id+"' value='saved' onclick='form66_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form66_body').append(rowsHTML);
			var fields=document.getElementById("form66_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form66_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'product_cross_sells');
		});
		hide_loader();
	});
};

/**
 * @form New sale order
 * @formNo 69
 * @Loading light
 */
function form69_ini()
{
	//console.log('form69_ini');
	var order_id=$("#form69_link").attr('data_id');
	if(order_id==null)
		order_id="";	
	
	$('#form69_body').html("");

	if(order_id!="")
	{
		show_loader();
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
				"<order_id exact='yes'>"+order_id+"</order_id>" +
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
				
				var save_button=filter_fields.elements[5];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
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
					rowsHTML+="<td data-th='Product Name'>";
						rowsHTML+="<input type='text' readonly='readonly' required form='form69_"+id+"' value='"+result.item_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='number' class='dblclick_editable' readonly='readonly' required form='form69_"+id+"' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Notes'>";
						rowsHTML+="<textarea readonly='readonly' form='form69_"+id+"'>"+result.notes+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form69_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='submit' class='submit_hidden' form='form69_"+id+"' id='save_form69_"+id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form69_"+id+"' id='delete_form69_"+id+"' onclick='form69_delete_item($(this));'>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form69_body').append(rowsHTML);
				
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
					get_inventory(name_filter.value,'',function(quantity)
					{
						$(quantity_filter).attr('max',quantity);
						$(quantity_filter).attr('min',"0");
					});
				});
	
			});
			hide_loader();
		});
	}
}


/**
 * @form Manage Sale orders
 * @formNo 70
 * @Loading light
 */
function form70_ini()
{
	show_loader();
	var fid=$("#form70_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form70_header');
	
	//populating form 
	if(fid==="")
		fid=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form70_index');
	var prev_element=document.getElementById('form70_prev');
	var next_element=document.getElementById('form70_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<sale_orders count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<customer_name>"+fname+"</customer_name>" +
			"<order_date></order_date>" +
			"<type exact='yes'>product</type>" +
			"<status>"+fstatus+"</status>" +
			"<last_updated></last_updated>" +
			"</sale_orders>";

	$('#form70_body').html("");

	fetch_requested_data('form70',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form70_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Order No.'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form70_"+result.id+"' value='"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form70_"+result.id+"'>"+result.customer_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Order Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form70_"+result.id+"' value='"+get_my_past_date(result.order_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form70_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form70_"+result.id+"' title='Edit order' onclick=\"element_display('"+result.id+"','form69');\">";
						rowsHTML+="<input type='submit' class='save_icon' form='form70_"+result.id+"' title='Save order'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form70_"+result.id+"' title='Delete order' onclick='form70_delete_item($(this));'>";
						rowsHTML+="<br><input type='button' class='generic_icon' form='form70_"+result.id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form70_body').append(rowsHTML);
			var fields=document.getElementById("form70_"+result.id);
			var bill_button=fields.elements[7];
			var status_filter=fields.elements[3];
			
			set_static_value_list('sale_orders','status',status_filter);
			
			if(result.status=='pending')
			{
				$(bill_button).attr('value','Create Bill');
				$(bill_button).on('click',function(event)
				{
					form70_bill(result.id);
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

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'sale_orders');
		});
		hide_loader();
	});
};


/**
 * @form Manage Accounts
 * @formNo 71
 * @Loading heavy
 */
function form71_ini()
{
	show_loader();
	var fid=$("#form71_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form71_header');
	var fname=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form71_index');
	var prev_element=document.getElementById('form71_prev');
	var next_element=document.getElementById('form71_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<accounts count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<acc_name>"+fname+"</acc_name>" +
			"<description></description>" +
			"<type>"+ftype+"</type>" +
			"<last_updated></last_updated>" +
			"</accounts>";

	$('#form71_body').html("");

	fetch_requested_data('form71',columns,function(results)
	{	
		var accounts_string="--";
		for(var a in results)
		{
			accounts_string+=results[a].acc_name+"--";
		}
		
		var payments_data="<payments>" +
				"<id></id>" +
				"<acc_name array='yes'>"+accounts_string+"</acc_name>" +
				"<type></type>" +
				"<total_amount></total_amount>" +
				"<paid_amount></paid_amount>" +
				"<status exact='yes'>pending</status>" +
				"</payments>";
		fetch_requested_data('form71',payments_data,function(payments)
		{
			results.forEach(function(result)
			{		
				var balance_amount=0;
				payments.forEach(function(payment)
				{
					if(payment.acc_name==result.acc_name)
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
					}
				});
				
				balance_amount=my_round(balance_amount,2);
				var balance_display="";
				if(balance_amount==0)
				{
					balance_display="Rs. 0";
				}
				else if(balance_amount>0)
				{
					balance_display="Receivable: Rs. "+balance_amount;
				}
				else
				{
					balance_amount=(-balance_amount);
					balance_display="Payable: Rs. "+balance_amount;
				}
				
				var rowsHTML="";
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form71_"+result.id+"'></form>";
						rowsHTML+="<td data-th='Name'>";
							rowsHTML+="<textarea readonly='readonly' form='form71_"+result.id+"'>"+result.acc_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Type'>";
							rowsHTML+="<input type='text' readonly='readonly' required form='form71_"+result.id+"' value='"+result.type+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Description'>";
							rowsHTML+="<textarea readonly='readonly' form='form71_"+result.id+"' class='dblclick_editable'>"+result.description+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Balance'>";
							rowsHTML+="<textarea readonly='readonly' form='form71_"+result.id+"'>"+balance_display+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form71_"+result.id+"' value='"+result.id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form71_"+result.id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form71_"+result.id+"' onclick='form71_delete_item($(this));'>";
							//rowsHTML+="<input type='button' class='generic_icon' value='Close payments' form='form71_"+result.id+"' onclick='modal41_action($(this));'>";
							rowsHTML+="<input type='hidden' form='form71_"+result.id+"' value='"+balance_amount+"'>";
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
				
				$('#form71_body').append(rowsHTML);
				var fields=document.getElementById("form71_"+result.id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form71_update_item(fields);
				});
			});

			////indexing///
			var next_index=parseInt(start_index)+25;
			var prev_index=parseInt(start_index)-25;
			next_element.setAttribute('data-index',next_index);
			prev_element.setAttribute('data-index',prev_index);
			index_element.setAttribute('data-index','0');
			if(results.length<25)
			{
				$(next_element).hide();
			}
			else
			{
				$(next_element).show();
			}
			if(prev_index<0)
			{
				$(prev_element).hide();
			}
			else
			{
				$(prev_element).show();
			}
			/////////////

			longPressEditable($('.dblclick_editable'));
			$('textarea').autosize();
				
			var export_button=filter_fields.elements[3];
			$(export_button).off("click");
			$(export_button).on("click", function(event)
			{
				my_obj_array_to_csv(results,'accounts');
			});
			hide_loader();
		});
	});
};

/**
 * @form New Bill
 * @formNo 72
 * @Loading light
 */
function form72_ini()
{
	var bill_id=$("#form72_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form72_body').html("");
	$('#form72_foot').html("");
	
	if(bill_id!="")
	{
		show_loader();
		var bill_columns="<bills>" +
				"<id>"+bill_id+"</id>" +
				"<bill_num></bill_num>"+				
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
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
				"<tax></tax>" +
				"<free_with></free_with>" +
				"</bill_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			var filter_fields=document.getElementById('form72_master');
			
			for (var i in bill_results)
			{
				filter_fields.elements[1].value=bill_results[i].customer_name;
				filter_fields.elements[2].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements[3].value=bill_results[i].bill_num;
				filter_fields.elements[4].value=bill_id;
				filter_fields.elements[5].value=bill_results[i].offer;
				filter_fields.elements[6].value=bill_results[i].transaction_id;
				var save_button=filter_fields.elements[7];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form72_update_form();
				});

				var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
							"<td>Rs. "+bill_results[i].amount+"</br>" +
							"Rs. "+bill_results[i].discount+"</br>" +
							"Rs. "+bill_results[i].tax+"</br>" +
							"Rs. "+bill_results[i].total+"</td>" +
							"<td></td>" +
							"</tr>";
				$('#form72_foot').html(total_row);

				break;
			}
			
			fetch_requested_data('',bill_items_column,function(results)
			{
				var message_string="Bill from:"+get_session_var('title')+"\nAddress: "+get_session_var('address');
				
				results.forEach(function(result)
				{
					message_string+="\nItem: "+result.item_name;
					message_string+=" Price: "+result.unit_price;
					message_string+=" Total: "+result.total;
					
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form72_"+id+"'></form>";
						rowsHTML+="<td data-th='Item Name'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+result.item_name+"'>";
						rowsHTML+="</td>";
						if(result.batch!=null && result.batch!="")
						{
							rowsHTML+="<td data-th='Batch'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+result.batch+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Quantity'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form72_"+id+"' value='"+result.quantity+"'>";
							rowsHTML+="</td>";
						}
						else
						{
							rowsHTML+="<td data-th='Person'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+result.staff+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Notes'>";
								rowsHTML+="<textarea readonly='readonly' form='form72_"+id+"'>"+result.notes+"</textarea>";
							rowsHTML+="</td>";
						}
						rowsHTML+="<td data-th='Unit Price'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form72_"+id+"' value='"+result.unit_price+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Total'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form72_"+id+"' value='"+result.total+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+result.amount+"'>";
							rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+result.discount+"'>";
							rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+result.tax+"'>";
							rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+result.offer+"'>";
							rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='submit_hidden' form='form72_"+id+"' id='save_form72_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='form72_delete_item($(this));'>";
							rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
							rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
							rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form72_body').append(rowsHTML);
					
					var fields=document.getElementById("form72_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
					});
				});
				
				message_string+="\nAmount: "+bill_results[0].amount;
				message_string+="\ndiscount: "+bill_results[0].discount;
				message_string+="\nTax: "+bill_results[0].tax;
				message_string+="\nTotal: "+bill_results[0].total;

				var subject="Bill from "+get_session_var('title');
				$('#form72_share').show();
				$('#form72_share').click(function()
				{
					modal44_action(filter_fields.elements[1].value,subject,message_string);
				});
				
				hide_loader();
			});
		});
	}
}

/**
 * Notifications screen
 */
function notifications_ini()
{
	show_loader();
	var columns="<notifications count='100'>" +
			"<id></id>" +
			"<title></title>" +
			"<link_to></link_to>" +
			"<data_id></data_id>" +
			"<notes></notes>" +
			"<t_generated></t_generated>" +
			"<status exact='yes'>pending</status>" +
			"<target_user></target_user>"+
			"<last_updated></last_updated>" +
			"</notifications>";

	if_data_read_access('notifications',function(accessible_data)
	{	
		fetch_requested_data('',columns,function(notifs)
		{	
			var result_html="";
			
			notifs.forEach(function(notif)
			{
				var read=false;
				var update=false;
				for(var x in accessible_data)
				{
					if(accessible_data[x].record_id==notif.id || accessible_data[x].record_id=='all')
					{
						if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || notif[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
						{
							if(accessible_data[x].access_type=='all')
							{
								read=true;
								update=true;
								break;
							}
							if(accessible_data[x].access_type=='read')
							{
								read=true;
							}
							if(accessible_data[x].access_type=='update')
							{
								update=true;
							}							
						}
					}
				}

				var found=notif.target_user.indexOf(get_account_name());
				if(read || found>=0)
				{
					result_html+="<div class='notification_detail'><b>" +
						notif.title +
						"</b><br><a onclick=\"" +
						"element_display('"+notif.data_id +
						"','"+notif.link_to+"');\">"+notif.notes+"</a>" +
						"<div class='notification_status'>" +
						" Generated @ " +
						get_formatted_time(notif.t_generated) +
						"</div>";
						if(update || found>=0) 
						{
							result_html+="<div><input type='button' class='generic_icon' value='Seen' onclick=\"notifications_update($(this),'"+notif.id+"','reviewed')\">" +
							"<input type='button' class='generic_icon' value='Close' onclick=\"notifications_update($(this),'"+notif.id+"','closed')\">" +
							"</div>";
						}
					result_html+="</div>";
				}
			});
			
			var columns2="<notifications count='100'>" +
					"<id></id>" +
					"<title></title>" +
					"<link_to></link_to>" +
					"<data_id></data_id>" +
					"<notes></notes>" +
					"<t_generated></t_generated>" +
					"<status exact='yes'>reviewed</status>" +
					"<target_user></target_user>"+
					"<last_updated></last_updated>" +
					"</notifications>";
			
			fetch_requested_data('',columns2,function(notifs2)
			{	
				notifs2.forEach(function(notif2)
				{
					var read=false;
					var update=false;
					for(var x in accessible_data)
					{
						if(accessible_data[x].record_id==notif2.id || accessible_data[x].record_id=='all')
						{
							if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || notif2[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
							{
								if(accessible_data[x].access_type=='all')
								{
									read=true;
									update=true;
									break;
								}
								if(accessible_data[x].access_type=='read')
								{
									read=true;
								}
								if(accessible_data[x].access_type=='update')
								{
									update=true;
								}							
							}
						}
					}
					
					var found=notif2.target_user.indexOf(get_account_name());
					if(read || found>=0)
					{
						result_html+="<div class='notification_detail'><b>" +
							notif2.title +
							"</b><br><a onclick=\"" +
							"element_display('"+notif2.data_id +
							"','"+notif2.link_to+"');\">"+notif2.notes+"</a>" +
							"<div class='notification_status'>" +
							" Generated @ " +
							get_formatted_time(notif2.t_generated) +
							"</div>";
						if(update || found>=0) 
						{
							result_html+="<div><input type='button' class='generic_icon' value='Close' onclick=\"notifications_update($(this),'"+notif2.id+"','closed')\">" +
							"</div>";
						}
						result_html+="</div>";
					}
				});
				$("#notifications_detail").html(result_html);
				hide_loader();
			});
		});
	});
}


function initialize_questionnaires(id,ques_name)
{
	var fields_data="<ques_fields>"+
					"<id></id>"+
					"<ques_id exact='yes'>"+id+"</ques_id>"+
					"<name></name>"+
					"<display_name></display_name>"+
					"<description></description>"+					
					"<type></type>"+
					"<fvalues></fvalues>"+
					"<fcol></fcol>"+
					"<forder></forder>"+
					"<freq></freq>"+
					"</ques_fields>";
	fetch_requested_data('',fields_data,function(fields)
	{
		///sort the results by forder
		var content="<form id='"+ques_name+"_ques_header'><fieldset>";
		content+="<label><b>Questionnaire Id</b><br><input type='text' readonly='readonly'></label><label><b>Submitter</b><br><input type='text' readonly='readonly'></label><label><b>Submission Date</b><br><input type='text' readonly='readonly'></label>";
		content+="<input type='button' value='Previous Submissions' class='generic_icon' onclick=\"previous_questionnaires('"+id+"','"+ques_name+"',0);\"></fieldset></form>"+
				"<form class='questionnaire_form' id='"+ques_name+"_ques_main'><fieldset>";

		fields.sort(function(a,b)
		{
			if(parseInt(a.forder)>parseInt(b.forder))
			{	return 1;}
			else 
			{	return -1;}
		});			

		content+="<input type='hidden'>";
		content+="<input type='hidden'>";
				
		fields.forEach(function(field)
		{
			var required='';
			if(field.freq=='checked')
				required='required';			
			var fcol=":";
			content+="<br>";
			var field_desc="";
			if(field.description!="" && field.description!=null)
			{
				field_desc=" ("+field.description+")";
			}

			switch(field.type)
			{
				case 'text':content+="<label>"+field.display_name+field_desc+fcol+" <input id='field"+id+"_"+field.id+"' type='text' "+required+"></label>";
							break;
				case 'number':content+="<label>"+field.display_name+field_desc+fcol+" <input id='field"+id+"_"+field.id+"' type='number' step='any' "+required+"></label>";
							break;
				case 'value list':content+="<label>"+field.display_name+field_desc+fcol+" <select id='field"+id+"_"+field.id+"' "+required+">";
								var values_array=field.fvalues.split(";");
								values_array.forEach(function(fvalue)
								{
									content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
								});
								content+="</select></label>";
							break;
				case 'textarea':content+="<label>"+field.display_name+field_desc+fcol+" <textarea id='field"+id+"_"+field.id+"' "+required+"></textarea></label>";
							break;
			}
			content+="<br>";
		});
		content+="<label><input type='submit' value='Submit' class='generic_icon'></label>";
		content+="</fieldset></form>";
		$("#"+ques_name).html(content);
		
		//function to submit the questionnaire
		var ques_form=document.getElementById(ques_name+"_ques_main");
		var reviewer_filter=ques_form.elements[1];
		var approver_filter=ques_form.elements[2];
		
		var reviewer_data="<ques_struct count='1'>"+
						"<id>"+id+"</id>"+
						"<reviewer></reviewer>"+
						"<approver></approver>"+
						"</ques_struct>";
		fetch_requested_data('',reviewer_data,function(people)
		{
			if(people.length>0)
			{
				reviewer_filter.value=people[0].reviewer;
				approver_filter.value=people[0].approver;
			}
		});		
		
		var ques_header=document.getElementById(ques_name+"_ques_header");
		ques_header.elements[1].value=get_new_key();
		ques_header.elements[2].value=get_account_name();
		ques_header.elements[3].value=get_my_date();
		
		$(ques_form).off('submit');
		$(ques_form).on('submit',function(event)
		{
			event.preventDefault();
			
			var data_id=ques_header.elements[1].value;
			var submitter=ques_header.elements[2].value;
			var sub_date=get_raw_time(ques_header.elements[3].value);
			var reviewer=ques_form.elements[1].value;
			var approver=ques_form.elements[2].value;
			var last_updated=get_my_time();
			
			var ques_data="<ques_data>"+
						"<id>"+data_id+"</id>"+
						"<ques_struct_id>"+id+"</ques_struct_id>"+
						"<submitter>"+submitter+"</submitter>"+
						"<reviewer>"+reviewer+"</reviewer>"+
						"<approver>"+approver+"</approver>"+
						"<sub_date>"+sub_date+"</sub_date>"+
						"<status>submitted</status>"+
						"<last_updated>"+last_updated+"</last_updated>"+
						"</ques_data>";
			if(is_online())
			{
				server_create_simple(ques_data);
			}
			else
			{
				local_create_simple(ques_data);
			}
			
			fields.forEach(function(field)
			{
				var field_value=document.getElementById("field"+id+"_"+field.id).value;
				var field_data_id=get_new_key();
				var field_data="<ques_fields_data>"+
						"<id>"+field_data_id+"</id>"+
						"<ques_id>"+data_id+"</ques_id>"+
						"<field_id>"+field.id+"</field_id>"+
						"<field_value>"+field_value+"</field_value>"+
						"<last_updated>"+last_updated+"</last_updated>"+
						"</ques_fields_data>";
				if(is_online())
				{
					server_create_simple(field_data);
				}
				else
				{
					local_create_simple(field_data);
				}				
			});
			$(ques_form).off('submit');
			$(ques_form).on('submit',function(event)
			{
				event.preventDefault();
			});
		});
	});
}

function previous_questionnaires(id,ques_name,start_index)
{
	show_loader();
	var ques_data="<ques_data count='25' start_index='"+start_index+"'>"+
					"<id></id>"+
					"<ques_struct_id exact='yes'>"+id+"</ques_struct_id>"+
					"<submitter></submitter>"+
					"<status></status>"+
					"<sub_date></sub_date>"+
					"</ques_data>";

	if_data_read_access('ques_data',function(accessible_data)
	{
		fetch_requested_data('',ques_data,function(questionnaires)
		{
			var next_index=parseInt(start_index)+25;
			var prev_index=parseInt(start_index)-25;
			var content="<table class='rwd-table'>"+
						"<thead><tr>"+
						"<th>Id</th>"+
						"<th>Submitter</th>"+
						"<th>Submission Date</th>"+
						"<th>Status</th>"+
						"<th>Action</th>"+
						"</tr></thead><tbody id='"+ques_name+"_body'></tbody></table>"+
						"<div class='form_nav'>"+
						"<img src='./images/previous.png' id='"+ques_name+"_prev' class='prev_icon' onclick=onclick=\"previous_questionnaires('"+id+"','"+ques_name+"',"+prev_index+");\">"+
						"<img src='./images/next.png' id='"+ques_name+"_next' class='next_icon' onclick=onclick=\"previous_questionnaires('"+id+"','"+ques_name+"',"+next_index+");\">"+
						"</div>";
	
			$("#"+ques_name).html(content);
			var tbody=document.getElementById(ques_name+'_body');
			var next_element=document.getElementById(ques_name+'_next');
			var prev_element=document.getElementById(ques_name+'_prev');
	
			if(questionnaires.length<25)
			{
				$(next_element).hide();
			}
			else
			{
				$(next_element).show();
			}
			if(start_index<1)
			{
				$(prev_element).hide();
			}
			else
			{
				$(prev_element).show();
			}

			questionnaires.forEach(function(result)
			{
				var read=false;
				var update=false;
				var del=false;
				var access=false;
				for(var x in accessible_data)
				{
					if(accessible_data[x].record_id===result.id || accessible_data[x].record_id=='all')
					{
						if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || result[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
						{
							if(accessible_data[x].access_type=='all')
							{
								read=true;
								update=true;
								del=true;
								access=true;
								break;
							}
							else if(accessible_data[x].access_type=='read')
							{
								read=true;
							}
							else if(accessible_data[x].access_type=='delete')
							{
								del=true;
							}
							else if(accessible_data[x].access_type=='update')
							{
								update=true;
							}
						}
					}
				}
				
				if(read)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='ques_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Id'>";
								rowsHTML+="<a onclick=\"filled_questionnaires('"+id+"','"+ques_name+"','"+result.id+"','"+result.submitter+"','"+result.sub_date+"')\">"+result.id+"</a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Submitter'>";
								rowsHTML+=result.submitter;
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Submission Date'>";
								rowsHTML+=get_my_past_date(result.sub_date);
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status' id='ques_status_"+result.id+"'>";
								rowsHTML+=result.status;
							rowsHTML+="</td>";
							if(update)
							{
								rowsHTML+="<td data-th='Action'>";
								if(result.status=='submitted')								
									rowsHTML+="<input type='button' class='generic_icon' value='Review' onclick='questionnaire_reviewed("+result.id+");'>";
								else if(result.status=='reviewed')								
									rowsHTML+="<input type='button' class='generic_icon' value='Approve' onclick='questionnaire_approved("+result.id+");'>";
								rowsHTML+="</td>";						
							}
					rowsHTML+="</tr>";
					
					$(tbody).append(rowsHTML);
				}
			});

			hide_loader();
		});
	});
}

function questionnaire_reviewed(id)
{
	var last_updated=get_my_time();
	var status_element=document.getElementById('ques_status_'+id);
	status_element.innerHTML='reviewed';
	var ques_xml="<ques_data>"+
					"<id>"+id+"</id>"+
					"<status>reviewed</status>"+
					"<rev_date>"+last_updated+"</rev_date>"+
					"<last_updated>"+last_updated+"</last_updated>"+
					"</ques_data>";
	if(is_online())
	{
		server_update_simple(ques_xml);
	}
	else
	{
		local_update_simple(ques_xml);
	}		
}

function questionnaire_approved(id)
{
	var last_updated=get_my_time();
	var status_element=document.getElementById('ques_status_'+id);
	status_element.innerHTML='approved';
	var ques_xml="<ques_data>"+
					"<id>"+id+"</id>"+
					"<status>approved</status>"+
					"<rev_date>"+last_updated+"</rev_date>"+
					"<last_updated>"+last_updated+"</last_updated>"+
					"</ques_data>";
	if(is_online())
	{
		server_update_simple(ques_xml);
	}
	else
	{
		local_update_simple(ques_xml);
	}		
}


function filled_questionnaires(struct_id,ques_name,ques_id,submitter,sub_date)
{
	var fields_data="<ques_fields>"+
					"<id></id>"+
					"<ques_id exact='yes'>"+struct_id+"</ques_id>"+
					"<name></name>"+
					"<display_name></display_name>"+
					"<description></description>"+					
					"<type></type>"+
					"<fvalues></fvalues>"+
					"<forder></forder>"+
					"<freq></freq>"+
					"</ques_fields>";
	fetch_requested_data('',fields_data,function(fields)
	{
		var field_value_data="<ques_fields_data>"+
							"<id></id>"+
							"<ques_id exact='yes'>"+ques_id+"</ques_id>"+
							"<field_id></field_id>"+
							"<field_value></field_value>"+
							"</ques_fields_data>";

		fetch_requested_data('',field_value_data,function(field_values)
		{
			var content="<form id='"+ques_name+"_ques_header'><fieldset>";
			content+="<label><b>Questionnaire Id</b><br><input type='text' value='"+ques_id+"' readonly='readonly'></label>"+
					"<label><b>Submitter</b><br><input type='text' value='"+submitter+"' readonly='readonly'></label>"+
					"<label><b>Submission Date</b><br><input type='text' value='"+get_my_past_date(sub_date)+"' readonly='readonly'></label>";
			content+="<input type='button' value='Previous Submissions' class='generic_icon' onclick=\"previous_questionnaires('"+struct_id+"','"+ques_name+"',0);\"></fieldset></form>"+
					"<form class='questionnaire_form' id='"+ques_name+"_ques_main'><fieldset>";
	
			fields.sort(function(a,b)
			{
				if(parseInt(a.forder)>parseInt(b.forder))
				{	return 1;}
				else 
				{	return -1;}
			});
	
			fields.forEach(function(field)
			{
				var field_value="";
				for(var i in field_values)
				{
					if(field_values[i].field_id==field.id)
					{
						field_value=field_values[i].field_value;
						break;
					}
				}
				var fcol=":";
				content+="<br>";
				var field_desc="";
				if(field.description!="" && field.description!=null)
				{
					field_desc=" ("+field.description+")";
				}
				
				switch(field.type)
				{
					case 'text':content+="<label>"+field.display_name+field_desc+fcol+" <input value='"+field_value+"' type='text' readonly='readonly'></label>";
								break;
					case 'number':content+="<label>"+field.display_name+field_desc+fcol+" <input value='"+field_value+"' type='number' readonly='readonly'></label>";
								break;
					case 'value list':content+="<label>"+field.display_name+field_desc+fcol+" <input type='text' value='"+field_value+"' readonly='readonly'></label>";
								break;
					case 'textarea':content+="<label>"+field.display_name+field_desc+fcol+" <textarea readonly='readonly'>"+field_value+"</textarea></label>";
								break;
				}
			});
			content+="</fieldset></form>";
			$("#"+ques_name).html(content);			
		});		
	});
}

function activities_ini()
{
	if(is_create_access('activities'))
	{
		show_loader();
		var columns="<activities count='100'>" +
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
				result_html+="<div class='all_activity_detail'><b>" +
							activities[i].title +
							"</b></br><a onclick=\"" +
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
			hide_loader();
		});
	}
	else 
	{
		$("#modal2").dialog("open");
	}
}

/**
* Atleast three characters are required to make a search
* This function searches the records from following tables
* Product Master
* Product Instances
* Services
* Customers
* Suppliers
* Staff
* Assets
* Activities
**/
function search_ini()
{
	var searchStr=document.getElementById("search_box").value;	
	
	$("#search_results").html("");
	
	var length=searchStr.length;
	
	if(length>=3)
	{
		///////////////////////from products//////////////
		var product_columns="<product_master count='10'>" +
				"<id></id>" +
				"<name>"+searchStr+"</name>" +
				"</product_master>";
	
		fetch_requested_data('',product_columns,function(product_results)
		{
			var num_res=0;
			var result_html="";
			product_results.forEach(function(product)
			{
				var link_to='form87';
				if(is_read_access('form39'))
				{
					link_to='form39';
				}	
				result_html+="<div class='search_detail'>" +
						"<b>Found a Product"+
						"</b></br><a onclick=\"" +
						"element_display('"+product.id +
						"','"+link_to+"');\">"+product.name+"</a>" +
						"</div>";
				num_res=num_res+1;
			});
			$("#search_results").append(result_html);
		});

		///////////////from product instances////////////////
		var product_instance_columns="<product_instances count='10'>" +
				"<id></id>" +
				"<product_name>"+searchStr+"</product_name>" +
				"</product_instances>";
	
		fetch_requested_data('',product_instance_columns,function(instance_results)
		{
			var num_res=0;
			var result_html="";
			instance_results.forEach(function(product)
			{
				var link_to='form1';
				if(is_read_access('form155'))
				{
					link_to='form155';
				}	
				result_html+="<div class='search_detail'>" +
						"<b>Found an inventory record for product"+
						"</b></br><a onclick=\"" +
						"element_display('"+product.id +
						"','"+link_to+"');\">"+product.product_name+"</a>" +
						"</div>";
				num_res=num_res+1;
			});
			$("#search_results").append(result_html);
		});
	
		///////////////////////from services//////////////
		var service_columns="<services count='10'>" +
				"<id></id>" +
				"<name>"+searchStr+"</name>" +
				"</services>";
	
		fetch_requested_data('',service_columns,function(service_results)
		{
			var num_res=0;
			var result_html="";
			service_results.forEach(function(service)
			{
				result_html+="<div class='search_detail'>" +
						"<b>Found a Service"+
						"</b></br><a onclick=\"" +
						"element_display('"+service.id +
						"','form57');\">"+service.name+"</a>" +
						"</div>";
				num_res=num_res+1;
			});
			$("#search_results").append(result_html);
		});
	
		///////////////////////from customer//////////////
		var customer_columns="<customers count='10'>" +
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
						"<b>Found a Customer: "+customer.name+
						"</b></br><a onclick=\"" +
						"element_display('"+customer.id +
						"','form30');\">Email:"+customer.email+" Phone:"+customer.phone+"</a>" +
						"</div>";
				num_res=num_res+1;
			});
			$("#search_results").append(result_html);
		});
	
		///////////////////////from supplier//////////////
		var supplier_columns="<suppliers count='10'>" +
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
						"<b>Found a supplier: "+supplier.name+
						"</b></br><a onclick=\"" +
						"element_display('"+supplier.id +
						"','form40');\">Email:"+supplier.email+" Phone:"+supplier.phone+"</a>" +
						"</div>";
				num_res=num_res+1;
			});
			$("#search_results").append(result_html);
		});
	
		///////////////////////from staff//////////////
		var staff_columns="<staff count='10'>" +
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
						"<b>Found an employee: "+staff.name+
						"</b></br><a onclick=\"" +
						"element_display('"+staff.id +
						"','form8');\">Email:"+staff.email+" Phone:"+staff.phone+"</a>" +
						"</div>";
				num_res=num_res+1;
			});
			$("#search_results").append(result_html);
		});
	
		///////////////////////from assets//////////////
		var assets_columns="<assets count='10'>" +
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
						"<b>Found an asset: "+asset.name+
						"</b></br><a onclick=\"" +
						"element_display('"+asset.id +
						"','form5');\">Type: "+asset.type+" Owner: "+asset.owner+"</a>" +
						"</div>";
				num_res=num_res+1;
			});
			$("#search_results").append(result_html);
		});
	
		/////////////////////from activities///////////
		var columns="<activities count='10'>" +
				"<title></title>" +
				"<link_to></link_to>" +
				"<data_id></data_id>" +
				"<notes></notes>" +
				"<updated_by></updated_by>" +
				"<data_xml>"+searchStr+"</data_xml>" +
				"<user_display exact='yes'>yes</user_display>" +
				"<last_updated></last_updated>" +
				"</activities>";
	
		fetch_requested_data('',columns,function(activity_results)
		{
			var num_res=0;
			var result_html="";
			activity_results.forEach(function(activity)
			{
				result_html+="<div class='search_detail'>" +
						"<b>Recent activity: "+activity.title +
						"</b></br><a onclick=\"" +
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
};

/**
 * @form Set shortcut keys
 * @formNo 77
 * @Loading light
 */
function form77_ini()
{
	show_loader();
	var fid=$("#form77_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form77_header');
	var felement=filter_fields.elements[0].value;
	var fkey=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form77_index');
	var prev_element=document.getElementById('form77_prev');
	var next_element=document.getElementById('form77_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<user_preferences count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name></name>" +
			"<display_name>"+felement+"</display_name>" +
			"<shortcut>"+fkey+"</shortcut>" +
			"<value exact='yes'>checked</value>" +
			"<type array='yes'>--form--report--</type>" +
			"</user_preferences>";

	
	$('#form77_body').html("");

	fetch_requested_data('form77',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form77_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Report/Form'>";
						rowsHTML+="<textarea readonly='readonly' form='form77_"+result.id+"' data-i18n='form."+result.display_name+"'></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Key'>";
						rowsHTML+="<input type='text' form='form77_"+result.id+"' class='dblclick_editable' value='"+result.shortcut+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form77_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='hidden' form='form77_"+result.id+"' value='"+result.name+"'>";
						rowsHTML+="<input type='submit' class='save_icon' id='save_form77_"+result.id+"' form='form77_"+result.id+"'>";	
					rowsHTML+="</td>";
			rowsHTML+="</tr>";
			
			$('#form77_body').append(rowsHTML);
			var fields=document.getElementById("form77_"+result.id);
			var key_filter=fields.elements[1];
			
			set_static_value_list('shortcuts','key',key_filter);
			
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form77_update_item(fields);
			});
		});
		
		$('#form77_body').find('textarea').i18n();
		

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
				
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'shortcuts');
		});
		hide_loader();
	});
};

/**
 * @form Promotion Emails
 * @formNo 78
 * @Loading heavy
 */
function form78_ini()
{
	var newsletter_id=$("#form78_link").attr('data_id');
	if(newsletter_id==null)
		newsletter_id="";	

	var newsletter_name=document.getElementById('form78_master').elements[1].value;
	
	$('#form78_body').html("");
	if(newsletter_id!="" || newsletter_name!="")
	{
		show_loader();
		var newsletter_columns="<newsletter>" +
				"<id>"+newsletter_id+"</id>" +
				"<name>"+newsletter_name+"</name>" +
				"</newsletter>";
		
		////separate fetch function to get newsletter details like name
		fetch_requested_data('',newsletter_columns,function(newsletter_results)
		{
			for (var i in newsletter_results)
			{
				newsletter_id=newsletter_results[i].id;
				var filter_fields=document.getElementById('form78_master');
				filter_fields.elements[1].value=newsletter_results[i].name;
				filter_fields.elements[3].value=newsletter_results[i].id;
				break;
			}
			/////////////////////////////////////////////////////////////////////////
			
						
			var customer_columns="<customers>" +
					"<id></id>" +
					"<name></name>" +
					"<email></email>" +
					"<phone></phone>"+
					"<acc_name></acc_name>" +
					"</customers>";
			fetch_requested_data('',customer_columns,function(results)
			{
				results.forEach(function(result)
				{
					if(result.email!="" && result.email!="undefined")
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='row_form78_"+id+"'></form>";
						rowsHTML+="<td data-th='Customer Name'>";
							rowsHTML+="<textarea readonly='readonly' form='row_form78_"+id+"'>"+result.acc_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Email'>";
							rowsHTML+="<textarea readonly='readonly' form='row_form78_"+id+"'>"+result.email+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Phone'>";
							rowsHTML+="<textarea readonly='readonly' form='row_form78_"+id+"'>"+result.phone+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Select'>";
							rowsHTML+="<input type='checkbox' form='row_form78_"+id+"' checked>";
							rowsHTML+="<input type='hidden' form='row_form78_"+id+"' value='"+result.name+"'>";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
				
					$('#form78_body').append(rowsHTML);				
				});
				$('textarea').autosize();
				hide_loader();
			});
		});
	}
}

/**
 * @form Manage task types
 * @formNo 79
 * @Loading light
 */
function form79_ini()
{
	show_loader();
	var fid=$("#form79_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form79_header');
	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form79_index');
	var prev_element=document.getElementById('form79_prev');
	var next_element=document.getElementById('form79_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<task_type count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<name>"+fname+"</name>" +
		"<description></description>" +
		"<est_hours></est_hours>" +
		"<last_updated></last_updated>" +
		"</task_type>";
	
	$('#form79_body').html("");
	
	fetch_requested_data('form79',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="<tr>";
				rowsHTML+="<form id='form79_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Task'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form79_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Description'>";
						rowsHTML+="<textarea readonly='readonly' form='form79_"+result.id+"' class='dblclick_editable'>"+result.description+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Estimated Hours'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form79_"+result.id+"' class='dblclick_editable' value='"+result.est_hours+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form79_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form79_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form79_"+result.id+"' onclick='form79_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form79_body').append(rowsHTML);
			var fields=document.getElementById("form79_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form79_update_item(fields);
			});
		});
		

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'task_types');
		});
		hide_loader();
	});
};


/**
 * @form De-duplication mapping
 * @formNo 80
 * @Loading light
 */
function form80_ini()
{
	show_loader();
	var fid=$("#form80_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form80_master');
	var fobject=filter_fields.elements[1].value;
	
	var columns="<de_duplication>" +
		"<id></id>" +
		"<object>"+fobject+"</object>" +
		"<slave_id></slave_id>" +
		"<slave_value></slave_value>" +
		"<master_id></master_id>" +
		"<master_value></master_value>" +
		"<status exact='yes'>pending</status>" +
		"</de_duplication>";
	
	$('#form80_body').html("");
	
	fetch_requested_data('form80',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="<tr>";
				rowsHTML+="<form id='form80_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Change'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form80_"+result.id+"' value='"+result.slave_value+"'>";
						rowsHTML+="<input type='hidden' form='form80_"+result.id+"' value='"+result.slave_id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='To'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form80_"+result.id+"' value='"+result.master_value+"'>";
						rowsHTML+="<input type='hidden' form='form80_"+result.id+"' value='"+result.master_id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form80_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form80_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form80_"+result.id+"' onclick='form80_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form80_body').append(rowsHTML);
			var fields=document.getElementById("form80_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
			});
		});
		hide_loader();
	});
};


/**
 * @form Sale Leads
 * @formNo 81
 * @Loading light
 */
function form81_ini()
{
	show_loader();
	var fid=$("#form81_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form81_header');
	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form81_index');
	var prev_element=document.getElementById('form81_prev');
	var next_element=document.getElementById('form81_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<sale_leads count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<customer>"+fname+"</customer>" +
		"<detail></detail>" +
		"<due_date></due_date>" +
		"<identified_by></identified_by>" +
		"<last_updated></last_updated>" +
		"</sale_leads>";
	
	$('#form81_body').html("");
	
	fetch_requested_data('form81',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form81_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form81_"+result.id+"' value='"+result.customer+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="<textarea readonly='readonly' form='form81_"+result.id+"' class='dblclick_editable'>"+result.detail+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Due Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form81_"+result.id+"' class='dblclick_editable' value='"+get_my_past_date(result.due_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Identified By'>";
						rowsHTML+="<textarea readonly='readonly' form='form81_"+result.id+"'>"+result.identified_by+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form81_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form81_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form81_"+result.id+"' onclick='form81_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form81_body').append(rowsHTML);
			var fields=document.getElementById("form81_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form81_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'sale_leads');
		});
		hide_loader();
	});
};

/**
 * @form Store Areas
 * @formNo 83
 * @Loading light
 */
function form83_ini()
{
	show_loader();
	var fid=$("#form83_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form83_header');
	var fname=filter_fields.elements[0].value;
	var fowner=filter_fields.elements[1].value;
	var ftype=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form83_index');
	var prev_element=document.getElementById('form83_prev');
	var next_element=document.getElementById('form83_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<store_areas count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<owner>"+fowner+"</owner>"+
			"<area_type>"+ftype+"</area_type>" +
			"<last_updated></last_updated>" +
			"</store_areas>";

	$('#form83_body').html("");

	fetch_requested_data('form83',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form83_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form83_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Owner'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form83_"+result.id+"' value='"+result.owner+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form83_"+result.id+"' value='"+result.area_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form83_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form83_"+result.id+"' title='Delete' onclick='form83_delete_item($(this));'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form83_"+result.id+"' title='Save'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form83_body').append(rowsHTML);
			var fields=document.getElementById("form83_"+result.id);
			var owner_filter=fields.elements[1];
			
			var owner_data="<staff>"+
							"<acc_name></acc_name>"+							
							"</staff>";
			set_my_value_list(owner_data,owner_filter);
			
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form83_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		$('textarea').autosize();
		longPressEditable($('.dblclick_editable'));
				
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'store_areas');
		});
		hide_loader();
	});
};

/**
 * @form Service Subscriptions
 * @formNo 84
 * @Loading light
 */
function form84_ini()
{
	show_loader();
	var fid=$("#form84_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form84_header');
	
	var fcustomer=filter_fields.elements[0].value;
	var fservice=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form84_index');
	var prev_element=document.getElementById('form84_prev');
	var next_element=document.getElementById('form84_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<service_subscriptions count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<customer>"+fcustomer+"</customer>" +
			"<service>"+fservice+"</service>" +
			"<status>"+fstatus+"</status>" +
			"<notes></notes>" +
			"<last_bill_date></last_bill_date>" +
			"<next_due_date></next_due_date>" +
			"<last_bill_id></last_bill_id>" +
			"<last_updated></last_updated>" +
			"</service_subscriptions>";

	$('#form84_body').html("");

	fetch_requested_data('form84',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var last_bill_string="Last bill Id: "+result.last_bill_id+"\nLast bill date: "+get_my_past_date(result.last_bill_date)+"\nNext due date: "+get_my_past_date(result.next_due_date);
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form84_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form84_"+result.id+"'>"+result.customer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Service'>";
						rowsHTML+="<textarea readonly='readonly' form='form84_"+result.id+"'>"+result.service+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form84_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Notes'>";
						rowsHTML+="<textarea readonly='readonly' form='form84_"+result.id+"' class='dblclick_editable'>"+result.notes+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Last Bill'>";
						rowsHTML+="<textarea readonly='readonly' form='form84_"+result.id+"'>"+last_bill_string+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form84_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form84_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form84_"+result.id+"' title='Delete' onclick='form84_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form84_body').append(rowsHTML);
			var fields=document.getElementById("form84_"+result.id);
			var status_filter=fields.elements[2];
			
			set_static_filter('service_subscriptions','status',status_filter);
			
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form84_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'subscriptions');
		});
		hide_loader();
	});
};


/**
 * @form Verify supplier geo-location
 * @formNo 85
 * @Loading light
 */
function form85_ini()
{
	if(is_online())
	{
		show_loader();
		var domain=get_domain();
		var username=get_username();
		var re_access=get_session_var('re');
		ajax_with_custom_func("./ajax/geoCode.php","domain="+domain+"&username="+username+"&type=suppliers&re="+re_access,function(e)
		{
			console.log(e.responseText);

			$('#form85_header').html("");
		
			var lat=get_session_var('lat');
			var lng=get_session_var('lng');
			var title=get_session_var('title');
			
			if(typeof map85 != 'undefined')
				map85.remove();
		
			map85 = L.map('form85_map',{
				center: [lat,lng], 
				zoom: 10
			});
		
			L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
		        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenstreetMap</a>',
		        subdomains:'1234'
		    }).addTo(map85);
			
			//////////changeable master coordinates/////////
			
			var mlatlng=L.latLng(lat,lng);
			var mmarker=L.marker(mlatlng,{draggable:true}).addTo(map85).bindPopup(title);
			mmarker.on('dragend',function(event){
				var m=event.target;
				var latlng=m.getLatLng();
				var form=document.getElementById('form85_master');
				form.elements[1].value=latlng.lat;
				form.elements[2].value=latlng.lng;
				var save_button=form.elements[3];
				$(save_button).show();
			});
			
			var rowsHTML="<div class='customers_content_item'>" +
					"<form id='form85_master'>" +
					"Name: <textarea style='height:40px;width:100px' readonly='readonly'>"+title+"</textarea></br>" +
					"Latitude: <textarea style='height:20px;width:100px' readonly='readonly'>"+lat+"</textarea></br>" +
					"Longitude: <textarea style='height:20px;width:100px' readonly='readonly'>"+lng+"</textarea></br>" +
					"<input type='button' class='export_icon' value='Confirm' style='display:none;' form='form85_master'>" +
					"</form>" +
					"</div>";
			
			$('#form85_header').append(rowsHTML);
			var fields=document.getElementById("form85_master");
			var save_button=fields.elements[3];
			$(save_button).on("click", function(event)
			{
				event.preventDefault();
				form85_update_master(fields);
			});
			$(fields).parent().on('click',function(event)
			{
				mmarker.openPopup();
			});
		
			/////////////////////////////////////////////////
			
			var suppliers_data="<suppliers>" +
					"<id></id>" +
					"<name></name>" +
					"<lat></lat>" +
					"<lng></lng>" +
					"<acc_name></acc_name>" +
					"<address_status exact='yes'>unconfirmed</address_status>" +
					"<address></address>" +
					"<pincode></pincode>" +
					"<city></city>" +
					"<state></state>" +
					"<country></country>" +
					"</suppliers>";
			fetch_requested_data('form85',suppliers_data,function(suppliers)
			{
				suppliers.forEach(function(supplier)
				{
					if(supplier.lat=='')
					{
						supplier.lat=lat;
					}
					if(supplier.lng=='')
					{
						supplier.lng=lng;
					}
					var latlng=L.latLng(supplier.lat,supplier.lng);
					var marker=L.marker(latlng,{draggable:true}).addTo(map85).bindPopup(supplier.name);
					marker.on('dragend',function(event){
						var m=event.target;
						var latlng=m.getLatLng();
						var form=document.getElementById('form85_'+supplier.id);
						form.elements[1].value=latlng.lat;
						form.elements[2].value=latlng.lng;
						var save_button=form.elements[4];
						$(save_button).show();
					});
					
					var rowsHTML="<div class='customers_content_item'>" +
							"<form id='form85_"+supplier.id+"'>" +
							"Name: <textarea style='height:40px;width:100px' readonly='readonly'>"+supplier.acc_name+"</textarea><br>" +
							"Latitude: <textarea style='height:20px;width:100px' readonly='readonly'>"+supplier.lat+"</textarea><br>" +
							"Longitude: <textarea style='height:20px;width:100px' readonly='readonly'>"+supplier.lng+"</textarea><br>" +
							"<input type='hidden' value='"+supplier.id+"'>" +
							"<input type='button' class='export_icon' value='Confirm' form='form85_"+supplier.id+"'>" +
							"</form>" +
							"</div>";
					
					$('#form85_header').append(rowsHTML);
					var fields=document.getElementById("form85_"+supplier.id);
					var save_button=fields.elements[4];
					$(save_button).on("click", function(event)
					{
						event.preventDefault();
						form85_update_item(fields);
					});
					$(fields).parent().on('click',function(event)
					{
						//console.log('clicked on customer');
						marker.openPopup();
					});
				});
				
				var scrollPane=$(".customers_pane");
				var scrollContent=$(".customers_content");
				scrollContent.css('width',(Math.round(225*suppliers.length)+225)+"px");
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
			
				hide_loader();
			});
		});
	}
	else
	{
		$("#modal6").dialog("open");
	}
}


/**
 * @form Verify staff geo-location
 * @formNo 86
 * @Loading light
 */
function form86_ini()
{
	if(is_online())
	{
		show_loader();
		var domain=get_domain();
		var username=get_username();
		var re_access=get_session_var('re');
		ajax_with_custom_func("./ajax/geoCode.php","domain="+domain+"&username="+username+"&type=staff&re="+re_access,function(e)
		{
			$('#form86_header').html("");
		
			var lat=get_session_var('lat');
			var lng=get_session_var('lng');
			var title=get_session_var('title');
			
			if(typeof map86 != 'undefined')
				map86.remove();
		
			map86 = L.map('form86_map',{
				center: [lat,lng], 
				zoom: 10
			});
		
			L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
		        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenstreetMap</a>',
		        subdomains:'1234'
		    }).addTo(map86);
					
			/////////////////////////////////////////////////
			var master_form=document.getElementById("form86_master");
			var acc_name=master_form.elements[1].value;
			var date=get_raw_time(master_form.elements[2].value);
			var staff_data="<location_history>" +
					"<id></id>" +
					"<lat></lat>" +
					"<lng></lng>" +
					"<acc_name exact='yes'>"+acc_name+"</acc_name>" +
					"<log_time upperbound='yes'>"+(date+86400000)+"</log_time>"+
					"<log_time lowerbound='yes'>"+date+"</log_time>"+
					"<location></location>"+
					"</location_history>";
			fetch_requested_data('form86',staff_data,function(staffs)
			{
				staffs.sort(function(a,b)
				{
					if(parseFloat(a.log_time)<parseFloat(b.log_time))
					{	return 1;}
					else 
					{	return -1;}
				});	

				staffs.forEach(function(staff)
				{
					var latlng=L.latLng(staff.lat,staff.lng);
					var my_time=get_my_datetime(staff.log_time).split(" ");
					var marker=L.marker(latlng,{}).addTo(map86).bindPopup("<b>"+staff.location+"</b><br>At "+my_time[1]);
					
					var rowsHTML="<div class='customers_content_item' id='form86_"+staff.id+"'>" +
							"Location: "+staff.location+"<br><br>" +
							"Time: At "+my_time[1]+
							"</div>";
					
					$('#form86_header').append(rowsHTML);
					var fields=document.getElementById("form86_"+staff.id);
					
					$(fields).on('click',function(event)
					{
						marker.openPopup();
					});
				});
				
				var scrollPane=$(".customers_pane");
				var scrollContent=$(".customers_content");
				scrollContent.css('width',(Math.round(225*staffs.length)+225)+"px");
				//scrollContent.css('height',"100px");
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
			
				hide_loader();
			});
		});
	}
	else
	{
		$("#modal6").dialog("open");
	}
}

/**
 * @form Manage Products
 * @formNo 87
 * @Loading light
 */
function form87_ini()
{
	show_loader();
	var fid=$("#form87_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form87_header');
	
	var fname=filter_fields.elements[0].value;
	var fmakes=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form87_index');
	var prev_element=document.getElementById('form87_prev');
	var next_element=document.getElementById('form87_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<product_master count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<make>"+fmakes+"</make>" +
			"<description></description>" +
			"<tax></tax>" +
			"<bar_code></bar_code>" +
			"<last_updated></last_updated>" +
			"</product_master>";

	$('#form87_body').html("");

	fetch_requested_data('form87',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form87_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form87_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Make'>";
						rowsHTML+="<textarea readonly='readonly' form='form87_"+result.id+"' class='dblclick_editable'>"+result.make+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Description'>";
						rowsHTML+="<textarea readonly='readonly' form='form87_"+result.id+"' class='dblclick_editable'>"+result.description+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Tax'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form87_"+result.id+"' class='dblclick_editable' value='"+result.tax+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form87_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form87_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='copy_icon' form='form87_"+result.id+"' value='saved' onclick='modal19_action($(this));'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form87_"+result.id+"' value='saved' onclick='form87_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		
			$('#form87_body').append(rowsHTML);

			var fields=document.getElementById("form87_"+result.id);
			
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form87_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'products');
		});
		hide_loader();
	});	
};


/**
 * @form Manufacturing Schedule
 * @formNo 88
 * @Loading light
 */
function form88_ini()
{
	show_loader();
	var fid=$("#form88_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form88_header');
	var fname=filter_fields.elements[0].value;
	var fstatus=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form88_index');
	var prev_element=document.getElementById('form88_prev');
	var next_element=document.getElementById('form88_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<manufacturing_schedule count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<product>"+fname+"</product>" +
			"<process_notes></process_notes>" +
			"<iteration_notes></iteration_notes>" +
			"<schedule></schedule>" +
			"<status>"+fstatus+"</status>" +
			"<last_updated></last_updated>" +
			"</manufacturing_schedule>";

	$('#form88_body').html("");

	fetch_requested_data('form88',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form88_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Product'>";
						rowsHTML+="<textarea readonly='readonly' form='form88_"+result.id+"'>"+result.product+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Process Notes'>";
						rowsHTML+="<textarea readonly='readonly' form='form88_"+result.id+"' class='dblclick_editable'>"+result.process_notes+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form88_"+result.id+"' class='dblclick_editable' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Schedule'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form88_"+result.id+"' class='dblclick_editable' value='"+get_my_datetime(result.schedule)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Iteration Notes'>";
						rowsHTML+="<textarea readonly='readonly' form='form88_"+result.id+"' class='dblclick_editable'>"+result.iteration_notes+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form88_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form88_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form88_"+result.id+"' title='Delete' onclick='form88_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form88_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		
			$('#form88_body').append(rowsHTML);

			var fields=document.getElementById("form88_"+result.id);
			var status_filter=fields.elements[2];
			var schedule_filter=fields.elements[3];
			
			set_static_value_list('manufacturing_schedule','status',status_filter);
			$(schedule_filter).datetimepicker();
			
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form88_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'manufacturing_schedule');
		});
		hide_loader();
	});	
};

/**
 * @form Appointments
 * @formNo 89
 * @Loading heavy
 */
function form89_ini()
{
	show_loader();
	var fid=$("#form89_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form89_header');
	
	//populating form 
	var fcustomer=filter_fields.elements[0].value;
	var fassignee=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form89_index');
	var prev_element=document.getElementById('form89_prev');
	var next_element=document.getElementById('form89_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<appointments count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<customer>"+fcustomer+"</customer>" +
			"<schedule></schedule>" +
			"<assignee>"+fassignee+"</assignee>" +
			"<hours></hours>" +
			"<status>"+fstatus+"</status>" +
			"<notes></notes>" +
			"<last_updated></last_updated>" +
			"</appointments>";

	$('#form89_body').html("");

	fetch_requested_data('form89',columns,function(results)
	{
		results.forEach(function(result)
		{
			var message_string=result.customer+" appointment with "+result.assignee+" @"+get_my_datetime(result.schedule)+"\nNotes:"+result.notes;
			message_string=encodeURIComponent(message_string);
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form89_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form89_"+result.id+"'>"+result.customer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Assignee'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form89_"+result.id+"' class='dblclick_editable' value='"+result.assignee+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Schedule'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form89_"+result.id+"' class='dblclick_editable'>"+get_my_datetime(result.schedule)+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Notes'>";
						rowsHTML+="<textarea readonly='readonly' form='form89_"+result.id+"' class='dblclick_editable'>"+result.notes+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form89_"+result.id+"' class='dblclick_editable' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' readonly='readonly' form='form89_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form89_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form89_"+result.id+"' title='Delete' onclick='form89_delete_item($(this));'>";
						rowsHTML+="<a id='form89_whatsapp_"+result.id+"' href='whatsapp://send?text="+message_string+"' target='_blank'><img style='width:25px;height:25px;' src='./images/whatsapp.jpeg' form='form89_"+result.id+"' title='Send details through WhatsApp'></a>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form89_body').append(rowsHTML);
			var fields=document.getElementById("form89_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form89_update_item(fields);
			});
			
			var name_filter=fields.elements[0];
			var assignee_filter=fields.elements[1];
			var schedule_filter=fields.elements[2];
			var status_filter=fields.elements[4];
						
			var staff_data="<staff>" +
					"<acc_name></acc_name>" +
					"</staff>";
			set_my_value_list(staff_data,assignee_filter);
			set_static_value_list('appointments','status',status_filter);
			$(schedule_filter).datetimepicker();
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'appointments');
		});
		hide_loader();
	});
};

/**
 * @form Billing types
 * @formNo 90
 * @Loading light
 */
function form90_ini()
{
	show_loader();
	var fid=$("#form90_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form90_header');
	
	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form90_index');
	var prev_element=document.getElementById('form90_prev');
	var next_element=document.getElementById('form90_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<bill_types count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<notes></notes>" +
			"<last_updated></last_updated>" +
			"</bill_types>";

	$('#form90_body').html("");

	fetch_requested_data('form90',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form90_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form90_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Notes'>";
						rowsHTML+="<textarea readonly='readonly' form='form90_"+result.id+"' class='dblclick_editable'>"+result.notes+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form90_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form90_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form90_"+result.id+"' title='Delete' onclick='form90_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		
			$('#form90_body').append(rowsHTML);

			var fields=document.getElementById("form90_"+result.id);
			
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form90_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'billing_types');
		});
		hide_loader();
	});	
};

/**
 * @form Create Bills(multiple register)
 * @formNo 91
 * @Loading light
 */
function form91_ini()
{
	var bill_id=$("#form91_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form91_body').html("");
	$('#form91_foot').html("");
	document.getElementById('form91_customer_info').innerHTML="";
	
	if(bill_id!="")
	{
		show_loader();
		var bill_columns="<bills>" +
				"<id>"+bill_id+"</id>" +
				"<bill_num></bill_num>"+
				"<customer_name></customer_name>" +
				"<total></total>" +
				"<bill_date></bill_date>" +
				"<amount></amount>" +
				"<discount></discount>" +
				"<tax></tax>" +
				"<offer></offer>" +
				"<billing_type></billing_type>" +
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
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
				"<tax></tax>" +
				"<free_with></free_with>" +
				"</bill_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			var filter_fields=document.getElementById('form91_master');
			
			for (var i in bill_results)
			{
				filter_fields.elements[1].value=bill_results[i].customer_name;
				filter_fields.elements[2].value=bill_results[i].billing_type;
				filter_fields.elements[3].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements[4].value=bill_results[i].bill_num;
				filter_fields.elements[5].value=bill_id;				
				filter_fields.elements[6].value=bill_results[i].offer;
				filter_fields.elements[7].value=bill_results[i].transaction_id;
				var save_button=filter_fields.elements[8];
				
				var address_data="<customers>" +
						"<address></address>" +
						"<city></city>" +
						"<acc_name exact='yes'>"+bill_results[i].customer_name+"</acc_name>" +
						"</customers>";
				fetch_requested_data('',address_data,function(addresses)
				{
					var address_string="";
					if(addresses.length>0)
					{
						address_string+=addresses[i].address+", "+addresses[i].city;
					}
					document.getElementById('form91_customer_info').innerHTML="Address<br>"+address_string;
				});
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form91_update_form();
				});

				var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
							"<td>Rs. "+bill_results[i].amount+"</br>" +
							"Rs. "+bill_results[i].discount+"</br>" +
							"Rs. "+bill_results[i].tax+"</br>" +
							"Rs. "+bill_results[i].total+"</td>" +
							"<td></td>" +
							"</tr>";
				$('#form91_foot').html(total_row);

				break;
			}
		
			fetch_requested_data('',bill_items_column,function(results)
			{
				var message_string="Bill from: "+get_session_var('title')+"\nAddress: "+get_session_var('address');
				
				results.forEach(function(result)
				{
					message_string+="\nItem: "+result.item_name;
					message_string+=" Quantity: "+result.quantity;
					message_string+=" Total: "+result.total;
					
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form91_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<textarea readonly='readonly' form='form91_"+id+"'>"+result.item_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form91_"+id+"' value='"+result.batch+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form91_"+id+"' value='"+result.quantity+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Unit Price'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form91_"+id+"' value='"+result.unit_price+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Total'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form91_"+id+"' value='"+result.total+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form91_"+id+"' value='"+result.amount+"'>";
							rowsHTML+="<input type='hidden' form='form91_"+id+"' value='"+result.discount+"'>";
							rowsHTML+="<input type='hidden' form='form91_"+id+"' value='"+result.tax+"'>";
							rowsHTML+="<input type='hidden' form='form91_"+id+"' value='"+result.offer+"'>";
							rowsHTML+="<input type='hidden' form='form91_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='submit_hidden' form='form91_"+id+"' id='save_form91_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form91_"+id+"' id='delete_form91_"+id+"' onclick='form91_delete_item($(this));'>";
							rowsHTML+="<input type='hidden' form='form91_"+id+"'>";
							rowsHTML+="<input type='hidden' form='form91_"+id+"'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form91_body').append(rowsHTML);
					
					var fields=document.getElementById("form91_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
					});
				});
				
				message_string+="\nAmount: "+bill_results[0].amount;
				message_string+="\ndiscount: "+bill_results[0].discount;
				message_string+="\nTax: "+bill_results[0].tax;
				message_string+="\nTotal: "+bill_results[0].total;
				
				var subject="Bill from "+get_session_var('title');
				$('#form91_share').show();
				$('#form91_share').click(function()
				{
					modal44_action(filter_fields.elements[1].value,subject,message_string);
				});

				hide_loader();
			});
		});
	}
}

/**
 * @form Manage Bills(multiple registers)
 * @formNo 92
 * @Loading light
 */
function form92_ini()
{
	show_loader();
	var fid=$("#form92_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form92_header');
	
	//populating form 
	var fnum=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var fname=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form92_index');
	var prev_element=document.getElementById('form92_prev');
	var next_element=document.getElementById('form92_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<bills count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<bill_num>"+fnum+"</bill_num>"+
			"<customer_name>"+fname+"</customer_name>" +
			"<bill_date></bill_date>" +
			"<total></total>" +
			"<type></type>" +
			"<transaction_id></transaction_id>" +
			"<billing_type>"+ftype+"</billing_type>" +
			"<last_updated></last_updated>" +
			"</bills>";

	$('#form92_body').html("");

	fetch_requested_data('form92',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form92_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Bill No.'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form92_"+result.id+"' value='"+result.bill_num+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form92_"+result.id+"' value='"+result.billing_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form92_"+result.id+"'>"+result.customer_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Bill Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form92_"+result.id+"' value='"+get_my_past_date(result.bill_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Bill Amount'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form92_"+result.id+"' value='"+result.total+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form92_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form92_"+result.id+"' title='Edit Bill'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form92_"+result.id+"' title='Delete Bill' onclick='form92_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form92_"+result.id+"' value='"+result.transaction_id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form92_body').append(rowsHTML);
			var fields=document.getElementById("form92_"+result.id);
			var edit_button=fields.elements[6];
			$(edit_button).on("click", function(event)
			{
				event.preventDefault();
				element_display(result.id,'form119',['form91','form130','form154']);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'bills');
		});
		hide_loader();
	});
}

/**
 * @form Manage Loans
 * @formNo 93
 * @Loading light
 */
function form93_ini()
{
	show_loader();
	var fid=$("#form93_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form93_header');
	var faccount=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form93_index');
	var prev_element=document.getElementById('form93_prev');
	var next_element=document.getElementById('form93_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<loans count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<type>"+ftype+"</type>" +
			"<account>"+faccount+"</account>" +
			"<loan_amount></loan_amount>" +
			"<repayment_method></repayment_method>" +
			"<status>"+fstatus+"</status>" +
			"<date_initiated></date_initiated>" +
			"<interest_paid></interest_paid>" +
			"<interest_rate></interest_rate>" +
			"<interest_period></interest_period>" +
			"<next_interest_date></next_interest_date>" +
			"<emi></emi>" +
			"<emi_period></emi_period>" +
			"<next_emi_date></next_emi_date>" +
			"<pending_emi></pending_emi>" +
			"<interest_type></interest_type>" +
			"<last_updated></last_updated>" +
			"</loans>";

	$('#form93_body').html("");

	fetch_requested_data('form93',columns,function(results)
	{
		results.forEach(function(result)
		{
			var details="Repayment as lump sum "+
					"\nDate inititated: "+get_my_past_date(result.date_initiated)+
					"\nInterest rate is "+result.interest_rate + "%"+
					"\nInterest period is "+result.interest_period+" days" +
					"\nInterest is "+result.interest_type +
					"\nInterest paid till date: "+result.interest_paid+
					"\nNext interest payment date: "+get_my_past_date(result.next_interest_date);
			if(result.repayment_method=='instalments')
			{
				details="Repayment in instalments"+
				"\nDate inititated: "+get_my_past_date(result.date_initiated)+
				"\nEMI is Rs. "+result.emi +
				"\nEMI period is "+result.emi_period+" days" +
				"\n"+result.pending_emi+" EMIs are pending"+
				"\nNext emi payment date is "+get_my_past_date(result.next_emi_date);
			}
			var rowsHTML="<tr>";
				rowsHTML+="<form id='form93_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Account'>";
						rowsHTML+="<textarea readonly='readonly' form='form93_"+result.id+"'>"+result.account+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form93_"+result.id+"' value='"+result.type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Loan Amount'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form93_"+result.id+"' value='"+result.loan_amount+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="<textarea readonly='readonly' form='form93_"+result.id+"'>"+details+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form93_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form93_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='hidden' form='form93_"+result.id+"' value='"+result.repayment_method+"'>";
						rowsHTML+="<input type='hidden' form='form93_"+result.id+"' value='"+result.emi+"'>";
						rowsHTML+="<input type='hidden' form='form93_"+result.id+"' value='"+result.pending_emi+"'>";
						if(result.status=='open')
						{
							rowsHTML+="<input type='submit' class='export_icon' title='Close loan' form='form93_"+result.id+"' value='Close'>";
						}
						rowsHTML+="<input type='button' class='delete_icon' form='form93_"+result.id+"' title='Delete' onclick='form93_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		
			$('#form93_body').append(rowsHTML);

			var fields=document.getElementById("form93_"+result.id);
			var status_filter=fields.elements[4];
			
			set_static_value_list('loans','status',status_filter);
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form93_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'loans');
		});
		hide_loader();
	});	
};


/**
 * @form Discard Items
 * @formNo 94
 * @Loading light
 */
function form94_ini()
{
	show_loader();
	var fid=$("#form94_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form94_header');
	
	var fname=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form94_index');
	var prev_element=document.getElementById('form94_prev');
	var next_element=document.getElementById('form94_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<discarded count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<batch>"+fbatch+"</batch>" +
		"<product_name>"+fname+"</product_name>" +
		"<quantity></quantity>" +
		"<source></source>" +
		"<source_link></source_link>" +
		"<source_id></source_id>" +
		"<last_updated></last_updated>" +
		"</discarded>";
	
	$('#form94_body').html("");
	
	fetch_requested_data('form94',columns,function(results)
	{
		results.forEach(function(result)
		{
			var source_string=result.source+" <a onclick=\"element_display('"+result.source_id+"','"+result.source_link+"')\"><u>"+result.source_id+"</u></a>";
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form94_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Item Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form94_"+result.id+"'>"+result.product_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form94_"+result.id+"' value='"+result.batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form94_"+result.id+"' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Source'>";
						rowsHTML+=source_string;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form94_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' title='Save' form='form94_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' title='Delete' form='form94_"+result.id+"' onclick='form94_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form94_body').append(rowsHTML);
			var fields=document.getElementById("form94_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'discarded_items');
		});
		hide_loader();
	});
};

/**
 * @form Data Import
 * @formNo 95
 * @Loading light
 */
function form95_ini()
{
	show_loader();
	var fid=$("#form95_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form95_header');
		
	var fnumber=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form95_index');
	var prev_element=document.getElementById('form95_prev');
	var next_element=document.getElementById('form95_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	
	var columns="<user_preferences count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fnumber+"</name>" +
			"<display_name>"+fname+"</display_name>" +
			"<type exact='yes'>form</type>" +
			"<value exact='yes'>checked</value>" +
			"</user_preferences>";
	
	$('#form95_body').html("");

	fetch_requested_data('form95',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form95_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Form No'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form95_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Form Name'>";
						rowsHTML+="<textarea readonly='readonly' class='widebox' form='form95_"+result.id+"' data-i18n='form."+result.display_name+"'></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Import'>";
						rowsHTML+="<input type='hidden' form='form95_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='import_icon' form='form95_"+result.id+"' value='IMPORT'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form95_body').prepend(rowsHTML);
			
			var fields=document.getElementById("form95_"+result.id);
			
			var import_button=fields.elements[3];
			$(import_button).on("click",function(event)
			{
				import_data(result.name);
			});
		});
		
		$('#form95_body').find('textarea').i18n();

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		$('textarea').autosize();
		
		hide_loader();
	});
};

/**
 * @form Customer Attributes
 * @formNo 96
 * @Loading light
 */
function form96_ini()
{
	show_loader();
	var fid=$("#form96_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form96_header');
	
	var fcustomer=filter_fields.elements[0].value;
	var fattribute=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form96_index');
	var prev_element=document.getElementById('form96_prev');
	var next_element=document.getElementById('form96_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<attributes count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fcustomer+"</name>" +
			"<type exact='yes'>customer</type>" +
			"<attribute>"+fattribute+"</attribute>" +
			"<value></value>" +
			"<last_updated></last_updated>" +
			"</attributes>";

	$('#form96_body').html("");

	fetch_requested_data('form96',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form96_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form96_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Attribute'>";
						rowsHTML+="<textarea readonly='readonly' form='form96_"+result.id+"'>"+result.attribute+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Value'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form96_"+result.id+"' value='"+result.value+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form96_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form96_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form96_"+result.id+"' title='Delete' onclick='form96_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form96_body').append(rowsHTML);
			var fields=document.getElementById("form96_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form96_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'customer_attributes');
		});
		hide_loader();
	});
};

/**
 * @form Supplier Attributes
 * @formNo 97
 * @Loading light
 */
function form97_ini()
{
	show_loader();
	var fid=$("#form97_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form97_header');
	
	var fsupplier=filter_fields.elements[0].value;
	var fattribute=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form97_index');
	var prev_element=document.getElementById('form97_prev');
	var next_element=document.getElementById('form97_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<attributes count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fsupplier+"</name>" +
			"<type exact='yes'>supplier</type>" +
			"<attribute>"+fattribute+"</attribute>" +
			"<value></value>" +
			"<last_updated></last_updated>" +
			"</attributes>";

	$('#form97_body').html("");

	fetch_requested_data('form97',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form97_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form97_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Attribute'>";
						rowsHTML+="<textarea readonly='readonly' form='form97_"+result.id+"'>"+result.attribute+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Value'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form97_"+result.id+"' value='"+result.value+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form97_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form97_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form97_"+result.id+"' title='Delete' onclick='form97_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form97_body').append(rowsHTML);
			var fields=document.getElementById("form97_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form97_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'supplier_attributes');
		});
		hide_loader();
	});
};

/**
 * @form Staff Attributes
 * @formNo 98
 * @Loading light
 */
function form98_ini()
{
	show_loader();
	var fid=$("#form98_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form98_header');
	
	var fsupplier=filter_fields.elements[0].value;
	var fattribute=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form98_index');
	var prev_element=document.getElementById('form98_prev');
	var next_element=document.getElementById('form98_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<attributes count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fsupplier+"</name>" +
			"<type exact='yes'>staff</type>" +
			"<attribute>"+fattribute+"</attribute>" +
			"<value></value>" +
			"<last_updated></last_updated>" +
			"</attributes>";

	$('#form98_body').html("");

	fetch_requested_data('form98',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form98_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form98_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Attribute'>";
						rowsHTML+="<textarea readonly='readonly' form='form98_"+result.id+"'>"+result.attribute+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Value'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form98_"+result.id+"' value='"+result.value+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form98_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form98_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form98_"+result.id+"' title='Delete' onclick='form98_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form98_body').append(rowsHTML);
			var fields=document.getElementById("form98_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form98_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'staff_attributes');
		});
		hide_loader();
	});
};

/**
 * @form Selective Sync
 * @formNo 100
 * @Loading light
 */
function form100_ini()
{
	show_loader();
	var fid=$("#form100_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form100_header');
	var fname=filter_fields.elements[0].value;
	var felement=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form100_index');
	var prev_element=document.getElementById('form100_prev');
	var next_element=document.getElementById('form100_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<user_preferences count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+felement+"</name>" +
			"<display_name>"+fname+"</display_name>" +
			"<sync></sync>" +
			"<value exact='yes'>checked</value>" +
			"<type exact='yes'>form</type>" +
			"</user_preferences>";
	
	$('#form100_body').html("");

	fetch_requested_data('form100',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form100_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Form Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form100_"+result.id+"' data-i18n='form."+result.display_name+"'></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Sync'>";
						rowsHTML+="<input type='checkbox' form='form100_"+result.id+"' "+result.sync+">";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form100_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='hidden' form='form100_"+result.id+"' value='"+result.name+"'>";
						rowsHTML+="<input type='submit' class='save_icon' id='save_form100_"+result.id+"' form='form100_"+result.id+"'>";	
					rowsHTML+="</td>";
			rowsHTML+="</tr>";
			
			$('#form100_body').append(rowsHTML);
			var fields=document.getElementById("form100_"+result.id);
			
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form100_update_item(fields);
			});
		});
		
		$('#form100_body').find('textarea').i18n();
		

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		
		$('textarea').autosize();
		hide_loader();
	});
};

/**
 * @form Manage Projects
 * @formNo 101
 * @Loading light
 */
function form101_ini()
{
	show_loader();
	var fid=$("#form101_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form101_header');
	
	//populating form 
	var fname=filter_fields.elements[0].value;
	var fstatus=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form101_index');
	var prev_element=document.getElementById('form101_prev');
	var next_element=document.getElementById('form101_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<projects count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<details></details>" +
			"<start_date></start_date>" +
			"<status>"+fstatus+"</status>" +
			"<last_updated></last_updated>" +
			"</projects>";

	$('#form101_body').html("");

	if_data_read_access('projects',function(accessible_data)
	{
		fetch_requested_data('form101',columns,function(results)
		{
			results.forEach(function(result)
			{
				var read=false;
				var update=false;
				var del=false;
				var access=false;
				for(var x in accessible_data)
				{
					if(accessible_data[x].record_id===result.id || accessible_data[x].record_id=='all')
					{
						if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || result[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
						{
							if(accessible_data[x].access_type=='all')
							{
								read=true;
								update=true;
								del=true;
								access=true;
								break;
							}
							else if(accessible_data[x].access_type=='read')
							{
								read=true;
							}
							else if(accessible_data[x].access_type=='delete')
							{
								del=true;
							}
							else if(accessible_data[x].access_type=='update')
							{
								update=true;
							}
						}
					}
				}
				
				if(read)
				{
					var rowsHTML="";
					rowsHTML+="<tr>";
						rowsHTML+="<form id='form101_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Project Name'>";
								rowsHTML+="<textarea readonly='readonly' form='form101_"+result.id+"'>"+result.name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form101_"+result.id+"'>"+result.details+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Start Date'>";
								rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form101_"+result.id+"' value='"+get_my_past_date(result.start_date)+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form101_"+result.id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' readonly='readonly' form='form101_"+result.id+"' value='"+result.id+"'>";
								if(update)
								{
									rowsHTML+="<input type='submit' class='save_icon' form='form101_"+result.id+"' title='Save'>";
								}
								if(del)
								{
									rowsHTML+="<input type='button' class='delete_icon' form='form101_"+result.id+"' title='Delete' onclick='form101_delete_item($(this));'>";
								}
								if(result.status=='active')
								{
									rowsHTML+="<br><input type='button' class='generic_icon' form='form101_"+result.id+"' value='Budget' onclick=\"element_display('"+result.id+"','form144',['form137']);\">";
									rowsHTML+="<br><input type='button' class='generic_icon' form='form101_"+result.id+"' value='Schedule' onclick=\"element_display('"+result.id+"','form135');\">";
								}
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form101_body').append(rowsHTML);
					
					var fields=document.getElementById("form101_"+result.id);
					var status_filter=fields.elements[3];
					set_static_value_list('projects','status',status_filter);
					
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form101_update_item(fields);
					});
				}
			});
	
			////indexing///
			var next_index=parseInt(start_index)+25;
			var prev_index=parseInt(start_index)-25;
			next_element.setAttribute('data-index',next_index);
			prev_element.setAttribute('data-index',prev_index);
			index_element.setAttribute('data-index','0');
			if(results.length<25)
			{
				$(next_element).hide();
			}
			else
			{
				$(next_element).show();
			}
			if(prev_index<0)
			{
				$(prev_element).hide();
			}
			else
			{
				$(prev_element).show();
			}
			
			longPressEditable($('.dblclick_editable'));
			$('textarea').autosize();
			
			var export_button=filter_fields.elements[3];
			$(export_button).off("click");
			$(export_button).on("click", function(event)
			{
				my_obj_array_to_csv(results,'projects');
			});
			hide_loader();
		});
	});
};

/**
 * @form Assign project members
 * @formNo 102
 * @Loading light
 */
function form102_ini()
{
	var project_id=$("#form102_link").attr('data_id');
	if(project_id==null)
		project_id="";
	$('#form102_body').html("");
	
	var fields=document.getElementById('form102_master');
	if(project_id=="")
	{	
		project_id=fields.elements[2].value;
	}
	else
	{
		fields.elements[2].value=project_id;
	}

	if(project_id!="")
	{
		show_loader();
		var project_columns="<projects>" +
				"<id>"+project_id+"</id>" +
				"<name></name>" +
				"</projects>";
		var member_columns="<project_team>" +
				"<id></id>" +
				"<project_id exact='yes'>"+project_id+"</project_id>" +
				"<member></member>" +
				"<role></role>" +
				"<notes></notes>" +
				"<status></status>" +
				"</project_team>";
	
		fetch_requested_data('',project_columns,function(project_results)
		{
			for (var i in project_results)
			{
				var filter_fields=document.getElementById('form102_master');
				filter_fields.elements[1].value=project_results[i].name;
				filter_fields.elements[2].value=project_results[i].id;
				
				$(filter_fields).off('submit');
				$(filter_fields).on("submit", function(event)
				{
					event.preventDefault();
					form102_create_form();
				});
				break;
			}
		});
		/////////////////////////////////////////////////////////////////////////
		
		if_data_read_access('project_team',function(accessible_data)
		{
			fetch_requested_data('',member_columns,function(results)
			{
				results.forEach(function(result)
				{
					var read=false;
					var update=false;
					var del=false;
					var access=false;
					for(var x in accessible_data)
					{
						if(accessible_data[x].record_id===result.id || accessible_data[x].record_id=='all')
						{
							if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || result[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
							{
								if(accessible_data[x].access_type=='all')
								{
									read=true;
									update=true;
									del=true;
									access=true;
									break;
								}
								else if(accessible_data[x].access_type=='read')
								{
									read=true;
								}
								else if(accessible_data[x].access_type=='delete')
								{
									del=true;
								}
								else if(accessible_data[x].access_type=='update')
								{
									update=true;
								}
							}
						}
					}
					
					if(read)
					{
						var rowsHTML="";
						var id=result.id;
						rowsHTML+="<tr>";
						rowsHTML+="<form id='form102_"+id+"'></form>";
							rowsHTML+="<td data-th='Member'>";
								rowsHTML+="<textarea readonly='readonly' form='form102_"+id+"'>"+result.member+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Role'>";
								rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form102_"+id+"'>"+result.role+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Notes'>";
								rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form102_"+id+"'>"+result.notes+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form102_"+id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form102_"+id+"' value='"+id+"'>";
							if(update)
							{
								rowsHTML+="<input type='submit' class='submit_hidden' form='form102_"+id+"' id='save_form102_"+id+"'>";
							}
							if(del)
							{
								rowsHTML+="<input type='button' class='delete_icon' form='form102_"+id+"' id='delete_form102_"+id+"' onclick='form102_delete_item($(this));'>";
							}
							if(access)
							{
								rowsHTML+="<input type='button' class='generic_icon' form='form102_"+result.id+"' value='Access' onclick=\"access_display('project_team','"+result.id+"');\">";
							}
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
					
						$('#form102_body').append(rowsHTML);
						
						var fields=document.getElementById("form102_"+id);
						var status_filter=fields.elements[3];
						set_static_value_list('projects','status',status_filter);
						
						$(fields).on("submit", function(event)
						{
							event.preventDefault();
							form102_update_item(fields);
						});
					}
				});
				
				longPressEditable($('.dblclick_editable'));
				$('textarea').autosize();
				
				hide_loader();
			});
		});
	}
}

/**
 * @form Create project phases
 * @formNo 103
 * @Loading light
 */
function form103_ini()
{
	var project_id=$("#form103_link").attr('data_id');
	if(project_id==null)
		project_id="";	
	$('#form103_body').html("");
	
	var fields=document.getElementById('form103_master');
	if(project_id=="")
	{	
		project_id=fields.elements[2].value;
	}
	else
	{
		fields.elements[2].value=project_id;
	}
	
	
	if(project_id!="")
	{
		show_loader();
		var project_columns="<projects>" +
				"<id>"+project_id+"</id>" +
				"<name></name>" +
				"</projects>";
		var phase_columns="<project_phases>" +
				"<id></id>" +
				"<project_id exact='yes'>"+project_id+"</project_id>" +
				"<phase_name></phase_name>" +
				"<details></details>" +
				"<start_date></start_date>" +
				"<due_date></due_date>" +
				"<status></status>" +
				"</project_phases>";
	
		fetch_requested_data('',project_columns,function(project_results)
		{
			for (var i in project_results)
			{
				var filter_fields=document.getElementById('form103_master');
				filter_fields.elements[1].value=project_results[i].name;
				filter_fields.elements[2].value=project_results[i].id;
				
				$(filter_fields).off('submit');
				$(filter_fields).on("submit", function(event)
				{
					event.preventDefault();
					form103_create_form();
				});
				break;
			}
		});
		/////////////////////////////////////////////////////////////////////////
		if_data_read_access('project_phases',function(accessible_data)
		{
			fetch_requested_data('',phase_columns,function(results)
			{
				results.forEach(function(result)
				{
					var read=false;
					var update=false;
					var del=false;
					var access=false;
					for(var x in accessible_data)
					{
						if(accessible_data[x].record_id===result.id || accessible_data[x].record_id=='all')
						{
							if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || result[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
							{
								if(accessible_data[x].access_type=='all')
								{
									read=true;
									update=true;
									del=true;
									access=true;
									break;
								}
								else if(accessible_data[x].access_type=='read')
								{
									read=true;
								}
								else if(accessible_data[x].access_type=='delete')
								{
									del=true;
								}
								else if(accessible_data[x].access_type=='update')
								{
									update=true;
								}
							}
						}
					}
					
					if(read)
					{
						var rowsHTML="";
						var id=result.id;
						rowsHTML+="<tr>";
						rowsHTML+="<form id='form103_"+id+"'></form>";
							rowsHTML+="<td data-th='Phase Name'>";
								rowsHTML+="<textarea readonly='readonly' form='form103_"+id+"'>"+result.phase_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form103_"+id+"'>"+result.details+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Start Date'>";
								rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form103_"+id+"' value='"+get_my_past_date(result.start_date)+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Due Date'>";
								rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form103_"+id+"' value='"+get_my_past_date(result.due_date)+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='status'>";
								rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form103_"+id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form103_"+id+"' value='"+id+"'>";
							if(update)
								rowsHTML+="<input type='submit' class='submit_hidden' form='form103_"+id+"' id='save_form103_"+id+"'>";
							if(del)
								rowsHTML+="<input type='button' class='delete_icon' form='form103_"+id+"' id='delete_form103_"+id+"' onclick='form103_delete_item($(this));'>";
							if(access)
								rowsHTML+="<input type='button' class='generic_icon' form='form103_"+result.id+"' value='Access' onclick=\"access_display('project_phases','"+result.id+"');\">";
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
					
						$('#form103_body').append(rowsHTML);
						
						var fields=document.getElementById("form103_"+id);
						var start_filter=fields.elements[2];
						var due_filter=fields.elements[3];
						var status_filter=fields.elements[4];
						set_static_value_list('project_phases','status',status_filter);
						
						$(start_filter).datepicker();
						$(due_filter).datepicker();
						
						$(fields).on("submit", function(event)
						{
							event.preventDefault();
							form103_update_item(fields);
						});
					}	
				});
				longPressEditable($('.dblclick_editable'));
				$('textarea').autosize();
				
				hide_loader();
			});
		});
	}
}

/**
 * @form Assign project tasks
 * @formNo 104
 * @Loading light
 */
function form104_ini()
{
	var project_id=$("#form104_link").attr('data_id');
	if(project_id==null)
		project_id="";	
	$('#form104_body').html("");
	
	var fields=document.getElementById('form104_master');
	if(project_id=="")
	{	
		project_id=fields.elements[2].value;
	}
	else
	{
		fields.elements[2].value=project_id;
	}
	
	if(project_id!="")
	{
		$('#form104_calendar').fullCalendar('destroy');
		$('#form104_calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			height:400,
			fixedWeekCount:false,
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			events: function(start, end, timezone, callback) {
		        var start_time=parseFloat(start.unix())*1000;
		        var end_time=parseFloat(end.unix())*1000;
		        var tasks_data="<task_instances>" +
		        		"<id></id>" +
		        		"<name></name>" +
		        		"<description></description>" +
		        		"<t_initiated lowerbound='yes'>"+start_time+"</t_initiated>" +
		        		"<t_initiated upperbound='yes'>"+end_time+"</t_initiated>" +
		        		"<t_due></t_due>" +
		        		"<status></status>" +
		        		"<assignee></assignee>" +
		        		"<task_hours></task_hours>" +
		        		"<source exact='yes'>project</source>" +
		        		"<source_id exact='yes'>"+project_id+"</source_id>" +
						"</task_instances>";

		        if_data_read_access('task_instances',function(accessible_data)
		        {
			        fetch_requested_data('form104',tasks_data,function(tasks)
			        {
			        	var events=[];
			        	tasks.forEach(function(task)
			        	{
							var read=false;
							var update=false;
							var del=false;
							var access=false;
							for(var x in accessible_data)
							{
								if(accessible_data[x].record_id===task.id || accessible_data[x].record_id=='all')
								{
									if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || task[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
									{
										if(accessible_data[x].access_type=='all')
										{
											read=true;
											update=true;
											del=true;
											access=true;
											break;
										}
										else if(accessible_data[x].access_type=='read')
										{
											read=true;
										}
										else if(accessible_data[x].access_type=='delete')
										{
											del=true;
										}
										else if(accessible_data[x].access_type=='update')
										{
											update=true;
										}
									}
								}
							}
							
							if(read)
							{
								console.log('task found');
			        			var color="yellow";
			        			if(task.status=='cancelled')
			        			{
			        				color="aaaaaa";
			        			}
			        			else if(task.status=='pending' && parseFloat(task.t_due)<get_my_time())
			        			{
			        				color='#ff0000';
			        			}
			        			else if(task.status=='completed')
			        			{
			        				color='#00ff00';
			        			}
				        		events.push({
				        			title: task.description+"\nAssigned to: "+task.assignee+"\nDue time: "+get_formatted_time(task.t_due),
				        			start:get_iso_time(task.t_initiated),
				        			end:get_iso_time(parseFloat(task.t_initiated)+(3600000)),
				        			color: color,
				        			textColor:"#333",
				        			id: task.id,
				        			editable:update
				        		});
							}
			        	});
			        	callback(events);
			        });
		        });
		    },
		    dayClick: function(date,jsEvent,view){
		    	modal43_action(get_my_date_from_iso(date.format()),project_id);
		    },
		    eventClick: function(calEvent,jsEvent,view){
		    	modal33_action(calEvent.id);
		    },
		    eventDrop: function(event,delta,revertFunc){
		    	var t_initiated=(parseFloat(event.start.unix())*1000);
		    	var data_xml="<task_instances>" +
							"<id>"+event.id+"</id>" +
							"<t_initiated>"+t_initiated+"</t_initiated>" +
							"<last_updated>"+get_my_time()+"</last_updated>" +
							"</task_instances>";
				if(is_online())
				{
					server_update_simple(data_xml);
				}
				else
				{
					local_update_simple(data_xml);
				}
		    },
		    eventResize: function(event, delta, revertFunc){
		    	var task_hours=parseFloat((parseFloat(event.end.unix())-parseFloat(event.start.unix()))/3600);
		    	var data_xml="<task_instances>" +
							"<id>"+event.id+"</id>" +
							"<task_hours>"+task_hours+"</task_hours>" +
							"<last_updated>"+get_my_time()+"</last_updated>" +
							"</task_instances>";
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
		
		var columns="<task_instances>" +
				"<id></id>" +
				"<name></name>" +
				"<description></description>" +
				"<assignee></assignee>" +
				"<t_due></t_due>" +
				"<t_initiated></t_initiated>" +
				"<task_hours></task_hours>" +
				"<status></status>" +
				"<source exact='yes'>project</source>" +
				"<source_id exact='yes'>"+project_id+"</source_id>" +
				"<last_updated></last_updated>" +
				"</task_instances>";
		
		if_data_read_access('task_instances',function(accessible_data)
		{
			fetch_requested_data('form104',columns,function(results)
			{
				results.forEach(function(result)
				{
					var read=false;
					var update=false;
					var del=false;
					var access=false;
					for(var x in accessible_data)
					{
						if(accessible_data[x].record_id===result.id || accessible_data[x].record_id=='all')
						{
							if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || result[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
							{
								if(accessible_data[x].access_type=='all')
								{
									read=true;
									update=true;
									del=true;
									access=true;
									break;
								}
								else if(accessible_data[x].access_type=='read')
								{
									read=true;
								}
								else if(accessible_data[x].access_type=='delete')
								{
									del=true;
								}
								else if(accessible_data[x].access_type=='update')
								{
									update=true;
								}
							}
						}
					}

					if(read)
					{
						result.t_due=get_my_datetime(result.t_due);
						result.t_initiated=get_my_datetime(result.t_initiated);
						var message_string="Due time: "+result.t_due+"\nTask: "+result.description+"\nAssignee:"+result.assignee;
						message_string=encodeURIComponent(message_string);
						var rowsHTML="";
						rowsHTML+="<tr>";
							rowsHTML+="<form id='form104_"+result.id+"'></form>";
								rowsHTML+="<td data-th='Phase'>";
									rowsHTML+="<input type='text' readonly='readonly' form='form104_"+result.id+"' value='"+result.name+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Task'>";
									rowsHTML+="<textarea readonly='readonly' form='form104_"+result.id+"'>"+result.description+"</textarea>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Assignee'>";
									rowsHTML+="<input type='text' readonly='readonly' form='form104_"+result.id+"' class='dblclick_editable' value='"+result.assignee+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Due Time'>";
									rowsHTML+="<input type='text' readonly='readonly' form='form104_"+result.id+"' class='dblclick_editable' value='"+result.t_due+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Status'>";
									rowsHTML+="<input type='text' readonly='readonly' form='form104_"+result.id+"' class='dblclick_editable' value='"+result.status+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Action'>";
									rowsHTML+="<input type='hidden' readonly='readonly' form='form104_"+result.id+"' value='"+result.id+"'>";
								if(update)	
									rowsHTML+="<input type='submit' class='save_icon' form='form104_"+result.id+"' title='Save'>";
								if(del)
									rowsHTML+="<input type='button' class='delete_icon' form='form104_"+result.id+"' title='Delete' onclick='form104_delete_item($(this));'>";
								rowsHTML+="<a id='form104_whatsapp_"+result.id+"' href='whatsapp://send?text="+message_string+"' target='_blank'><img style='width:25px;height:25px;' src='./images/whatsapp.jpeg' form='form104_"+result.id+"' title='Send details through WhatsApp'></a>";
								rowsHTML+="</td>";			
						rowsHTML+="</tr>";
						
						$('#form104_body').append(rowsHTML);
						var fields=document.getElementById("form104_"+result.id);
						$(fields).on("submit", function(event)
						{
							event.preventDefault();
							form104_update_item(fields);
						});
						
						var name_filter=fields.elements[0];
						var assignee_filter=fields.elements[2];
						var due_filter=fields.elements[3];
						var status_filter=fields.elements[4];
									
						var staff_data="<staff>" +
								"<acc_name></acc_name>" +
								"</staff>";
						set_my_value_list(staff_data,assignee_filter);
						
						set_static_value_list('task_instances','status',status_filter);
						$(due_filter).datetimepicker();
					}
				});
				
				////indexing///
				longPressEditable($('.dblclick_editable'));
				hide_loader();
			});
		});
	}
}

/**
 * @form Manage Data Access
 * @formNo 105
 * @Loading light
 */
function form105_ini()
{
	show_loader();
	var fid=$("#form105_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var master_fields=document.getElementById('form105_master');
	var ftablename=master_fields.elements[1].value;
	var frecord=master_fields.elements[2].value;

	var columns="<data_access>" +
			"<id>"+fid+"</id>" +
			"<tablename exact='yes'>"+ftablename+"</tablename>" +
			"<record_id exact='yes'>"+frecord+"</record_id>" +
			"<access_type></access_type>" +
			"<user_type></user_type>" +
			"<user></user>" +
			"<user_field></user_field>" +
			"<criteria_field></criteria_field>" +
			"<criteria_value></criteria_value>" +
			"<last_updated></last_updated>" +
			"</data_access>";

	$('#form105_body').html("");

	fetch_requested_data('',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form105_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Access Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form105_"+result.id+"' value='"+result.access_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='User Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form105_"+result.id+"' value='"+result.user_type+"'>";
					rowsHTML+="</td>";
					if(result.user_type=='user')
					{
						rowsHTML+="<td data-th='User'>";
					}
					else if(result.user_type=='field')
					{
						rowsHTML+="<td data-th='User Field'>";
					}
							rowsHTML+="<textarea readonly='readonly' form='form105_"+result.id+"'>"+result.user+"</textarea>";
							rowsHTML+="<input readonly='readonly' type='text' form='form105_"+result.id+"' value='"+result.user_field+"'>";
						rowsHTML+="</td>";										
					rowsHTML+="<td data-th='Criteria Field'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form105_"+result.id+"' value='"+result.criteria_field+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Criteria Value'>";
						rowsHTML+="<textarea readonly='readonly' form='form105_"+result.id+"'>"+result.criteria_value+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form105_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form105_"+result.id+"' title='Delete' onclick='form105_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form105_body').append(rowsHTML);
			var fields=document.getElementById("form105_"+result.id);
			var user_filter=fields.elements[2];
			var user_field_filter=fields.elements[3];
			if(result.user_type=='user')
			{
				$(user_field_filter).hide();
			}
			else 
			{
				$(user_filter).hide();				
			}

		});

		$('textarea').autosize();
		hide_loader();
	});
};

/**
 * @form Manage Sale orders (multi-register)
 * @formNo 108
 * @Loading light
 */
function form108_ini()
{
	show_loader();
	var fid=$("#form108_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form108_header');
	
	//populating form 
	if(fid==="")
		fid=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form108_index');
	var prev_element=document.getElementById('form108_prev');
	var next_element=document.getElementById('form108_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<sale_orders count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<customer_name>"+fname+"</customer_name>" +
			"<order_date></order_date>" +
			"<type>product</type>" +
			"<status>"+fstatus+"</status>" +
			"<last_updated></last_updated>" +
			"</sale_orders>";

	$('#form108_body').html("");

	fetch_requested_data('form108',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form108_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Order No.'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form108_"+result.id+"' value='"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form108_"+result.id+"'>"+result.customer_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Order Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form108_"+result.id+"' value='"+get_my_past_date(result.order_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form108_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form108_"+result.id+"' title='Edit order' onclick=\"element_display('"+result.id+"','form69');\">";
						rowsHTML+="<input type='submit' class='save_icon' form='form108_"+result.id+"' title='Save order'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form108_"+result.id+"' title='Delete order' onclick='form108_delete_item($(this));'>";
						rowsHTML+="<br><input type='button' class='generic_icon' form='form108_"+result.id+"' value='Create Bill'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form108_body').append(rowsHTML);
			var fields=document.getElementById("form108_"+result.id);
			var bill_button=fields.elements[7];
			var status_filter=fields.elements[3];
			
			set_static_value_list('sale_orders','status',status_filter);
			
			if(result.status=='pending')
			{
				$(bill_button).on('click',function(event)
				{
					modal42_action(result.id);
				});
			}
			else
			{
				$(bill_button).hide();
			}
			
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form108_update_item(fields);
			});
			
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'sale_orders');
		});
		hide_loader();
	});
};

/**
 * @form Asset Attributes
 * @formNo 109
 * @Loading light
 */
function form109_ini()
{
	show_loader();
	var fid=$("#form109_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form109_header');
	
	var fasset=filter_fields.elements[0].value;
	var fattribute=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form109_index');
	var prev_element=document.getElementById('form109_prev');
	var next_element=document.getElementById('form109_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<attributes count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fasset+"</name>" +
			"<type exact='yes'>asset</type>" +
			"<attribute>"+fattribute+"</attribute>" +
			"<value></value>" +
			"<last_updated></last_updated>" +
			"</attributes>";

	$('#form109_body').html("");

	fetch_requested_data('form109',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form109_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form109_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Attribute'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form109_"+result.id+"' value='"+result.attribute+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Value'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form109_"+result.id+"' value='"+result.value+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form109_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form109_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form109_"+result.id+"' title='Delete' onclick='form109_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form109_body').append(rowsHTML);
			var fields=document.getElementById("form109_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form109_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'product_attributes');
		});
		hide_loader();
	});
};

/**
 * @form Manage Reports
 * @formNo 110
 * @Loading Light
 */
function form110_ini()
{
	show_loader();
	var fid=$("#form110_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form110_header');
	
	var fname=filter_fields.elements[0].value;

	////indexing///
	var index_element=document.getElementById('form110_index');
	var prev_element=document.getElementById('form110_prev');
	var next_element=document.getElementById('form110_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	
	var columns="<reports count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<name>"+fname+"</name>" +
		"<description></description>" +
		"<last_updated></last_updated>" +
		"</reports>";

	$('#form110_body').html("");
	
	fetch_requested_data('form110',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form110_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form110_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Description'>";
						rowsHTML+="<textarea readonly='readonly' form='form110_"+result.id+"' class='dblclick_editable'>"+result.description+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form110_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='edit_icon' title='Edit report settings' form='form110_"+result.id+"' onclick=\"element_display('"+result.id+"','form111');\">";
						rowsHTML+="<input type='button' class='delete_icon' title='Delete' form='form110_"+result.id+"' onclick='form110_delete_item($(this));'>";
						rowsHTML+="<input type='button' class='generic_icon' value='Generate' form='form110_"+result.id+"' onclick=\"generate_report('"+result.id+"');\">";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form110_body').append(rowsHTML);			
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();

		hide_loader();
	});
};


/**
 * @form Create Reports
 * @formNo 111
 * @Loading light
 */
function form111_ini()
{
	var report_id=$("#form111_link").attr('data_id');
	if(report_id==null)
		report_id="";	
	$('#form111_body').html("");
	//console.log(pamphlet_id);
	if(report_id!="")
	{
		show_loader();
		var report_columns="<reports>" +
				"<id>"+report_id+"</id>" +
				"<name></name>" +
				"<description></description>" +
				"</reports>";
		var report_item_columns="<report_items>" +
				"<id></id>" +
				"<report_id exact='yes'>"+report_id+"</report_id>" +
				"<table1></table1>" +
				"<field1></field1>" +
				"<condition1></condition1>" +
				"<table2></table2>" +
				"<field2></field2>" +
				"<value></value>" +
				"</report_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',report_columns,function(report_results)
		{
			for (var i in report_results)
			{
				var filter_fields=document.getElementById('form111_master');
				filter_fields.elements[1].value=report_results[i].name;
				filter_fields.elements[2].value=report_results[i].description;
				filter_fields.elements[3].value=report_results[i].id;
				
				$(filter_fields).off('submit');
				$(filter_fields).on("submit", function(event)
				{
					event.preventDefault();
					form111_update_form();
				});
				break;
			}
		});
		/////////////////////////////////////////////////////////////////////////
		
		fetch_requested_data('',report_item_columns,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="";
				var id=result.id;
				rowsHTML+="<tr>";
				rowsHTML+="<form id='form111_"+id+"'></form>";
					rowsHTML+="<td data-th='Table'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form111_"+id+"' value='"+result.table1+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Field'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form111_"+id+"' value='"+result.field1+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Condition'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form111_"+id+"' value='"+result.condition1+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Condition Match'>";
						rowsHTML+="Table <input type='text' readonly='readonly' form='form111_"+id+"' value='"+result.table2+"'>";
						rowsHTML+="</br>Field <input type='text' readonly='readonly' form='form111_"+id+"' value='"+result.field2+"'>";
						rowsHTML+="</br>Value <input type='text' readonly='readonly' form='form111_"+id+"' value='"+result.value+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form111_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='submit' class='submit_hidden' form='form111_"+id+"' id='save_form111_"+id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form111_"+id+"' id='delete_form111_"+id+"' onclick='form111_delete_item($(this));'>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form111_body').append(rowsHTML);
				
				var fields=document.getElementById("form111_"+id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
				});
			});
			hide_loader();
		});
	}
}

/**
 * @form Manage UnBilled Items
 * @formNo 113
 * @Loading light
 */
function form113_ini()
{
	show_loader();
	var fid=$("#form113_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form113_header');
	
	var	fcustomer=filter_fields.elements[0].value;
	var fitem=filter_fields.elements[1].value;
	var fbatch=filter_fields.elements[2].value;
	////indexing///
	var index_element=document.getElementById('form113_index');
	var prev_element=document.getElementById('form113_prev');
	var next_element=document.getElementById('form113_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<unbilled_sale_items count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<customer>"+fcustomer+"</customer>" +
			"<item_name></item_name>" +
			"<batch></batch>" +
			"<quantity></quantity>" +
			"<sale_date></sale_date>" +
			"</unbilled_sale_items>";

	$('#form113_body').html("");

	fetch_requested_data('form113',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form113_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form113_"+result.id+"'>"+result.customer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Item Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form113_"+result.id+"'>"+result.item_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form113_"+result.id+"' value='"+result.batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form113_"+result.id+"' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form113_"+result.id+"' value='"+get_my_past_date(result.sale_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form113_"+result.id+"' value='"+result.id+"'>";	
						rowsHTML+="<input type='button' class='delete_icon' form='form113_"+result.id+"' title='Delete' onclick='form113_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form113_body').append(rowsHTML);
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		$('textarea').autosize();
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'unbilled_sale_items');
		});
		hide_loader();
	});
}


/**
 * @form Manage UnBilled Purchase Items
 * @formNo 115
 * @Loading light
 */
function form115_ini()
{
	show_loader();
	var fid=$("#form115_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form115_header');
	
	var	fsupplier=filter_fields.elements[0].value;
	var fitem=filter_fields.elements[1].value;
	var fbatch=filter_fields.elements[2].value;
	////indexing///
	var index_element=document.getElementById('form115_index');
	var prev_element=document.getElementById('form115_prev');
	var next_element=document.getElementById('form115_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<unbilled_purchase_items count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<supplier>"+fsupplier+"</supplier>" +
			"<item_name></item_name>" +
			"<batch></batch>" +
			"<quantity></quantity>" +
			"<purchase_date></purchase_date>" +
			"</unbilled_purchase_items>";

	$('#form115_body').html("");

	fetch_requested_data('form115',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form115_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Supplier'>";
						rowsHTML+="<textarea readonly='readonly' form='form115_"+result.id+"'>"+result.supplier+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Item Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form115_"+result.id+"'>"+result.item_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form115_"+result.id+"' value='"+result.batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form115_"+result.id+"' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form115_"+result.id+"' value='"+get_my_past_date(result.purchase_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form115_"+result.id+"' value='"+result.id+"'>";	
						rowsHTML+="<input type='button' class='delete_icon' form='form115_"+result.id+"' title='Delete' onclick='form115_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form115_body').append(rowsHTML);
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		$('textarea').autosize();
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'unbilled_purchase_items');
		});
		hide_loader();
	});
}


/**
 * @form Manage Loyalty Programs
 * @formNo 116
 * @Loading light
 */
function form116_ini()
{
	show_loader();
	var fid=$("#form116_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form116_header');
	
	var	fname=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var ftier=filter_fields.elements[2].value;
	var fstatus=filter_fields.elements[3].value;
	////indexing///
	var index_element=document.getElementById('form116_index');
	var prev_element=document.getElementById('form116_prev');
	var next_element=document.getElementById('form116_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<loyalty_programs count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<type>"+ftype+"</type>" +
			"<tier>"+ftier+"</tier>" +
			"<status>"+fstatus+"</status>" +
			"<tier_criteria_lower></tier_criteria_lower>" +
			"<tier_criteria_upper></tier_criteria_upper>" +
			"<redemption_criteria></redemption_criteria>" +
			"<points_addition></points_addition>" +
			"<discount></discount>" +
			"<cashback></cashback>" +
			"<reward_product></reward_product>" +
			"</loyalty_programs>";

	$('#form116_body').html("");

	fetch_requested_data('form116',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var details="Tier criteria: "+result.tier_criteria_lower+"-"+result.tier_criteria_upper+"\nPoints Addition: "+result.points_addition;
			if(result.type=='cashback')
			{
				details+="\nCashback: "+result.cashback;
				details+="\nRedemption Criteria: "+result.redemption_criteria;
			}
			else if(result.type=='discount')
			{
				details+="\nDiscount: "+result.discount;
			}
			else if(result.type=='reward product')
			{
				details+="\nReward Product: "+result.reward_product;
				details+="\nRedemption Criteria: "+result.redemption_criteria;
			}
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form116_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form116_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form116_"+result.id+"' value='"+result.type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Tier'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form116_"+result.id+"' value='"+result.tier+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="<textarea readonly='readonly' form='form116_"+result.id+"'>"+details+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form116_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form116_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form116_"+result.id+"' onclick='modal46_action($(this));'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form116_"+result.id+"' title='Delete' onclick='form116_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form116_"+result.id+"' value='"+result.tier_criteria_lower+"'>";
						rowsHTML+="<input type='hidden' form='form116_"+result.id+"' value='"+result.tier_criteria_upper+"'>";
						rowsHTML+="<input type='hidden' form='form116_"+result.id+"' value='"+result.points_addition+"'>";
						rowsHTML+="<input type='hidden' form='form116_"+result.id+"' value='"+result.discount+"'>";
						rowsHTML+="<input type='hidden' form='form116_"+result.id+"' value='"+result.cashback+"'>";
						rowsHTML+="<input type='hidden' form='form116_"+result.id+"' value='"+result.reward_product+"'>";
						rowsHTML+="<input type='hidden' form='form116_"+result.id+"' value='"+result.redemption_criteria+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form116_body').append(rowsHTML);
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		$('textarea').autosize();
		
		var export_button=filter_fields.elements[5];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'loyalty_programs');
		});
		hide_loader();
	});
}

/**
 * @form Create Bills(loyalty)
 * @formNo 118
 * @Loading light
 */
function form118_ini()
{
	var bill_id=$("#form118_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form118_body').html("");
	$('#form118_foot').html("");
	document.getElementById('form118_customer_info').innerHTML="";
	
	if(bill_id!="")
	{
		show_loader();
		var bill_columns="<bills>" +
				"<id>"+bill_id+"</id>" +
				"<bill_num></bill_num>"+
				"<customer_name></customer_name>" +
				"<total></total>" +
				"<bill_date></bill_date>" +
				"<amount></amount>" +
				"<discount></discount>" +
				"<tax></tax>" +
				"<offer></offer>" +
				"<billing_type></billing_type>" +
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
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
				"<tax></tax>" +
				"<free_with></free_with>" +
				"</bill_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			var filter_fields=document.getElementById('form118_master');
			
			for (var i in bill_results)
			{
				filter_fields.elements[1].value=bill_results[i].customer_name;
				filter_fields.elements[2].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements[3].value=bill_results[i].bill_num;
				filter_fields.elements[4].value=bill_id;
				filter_fields.elements[5].value=bill_results[i].offer;
				filter_fields.elements[6].value=bill_results[i].transaction_id;
				var save_button=filter_fields.elements[10];
				
				var address_data="<customers>" +
						"<address></address>" +
						"<city></city>" +
						"<acc_name exact='yes'>"+bill_results[i].customer_name+"</acc_name>" +
						"</customers>";
				fetch_requested_data('',address_data,function(addresses)
				{
					var address_string="";
					if(addresses.length>0)
					{
						address_string+=addresses[i].address+", "+addresses[i].city;
					}
					document.getElementById('form118_customer_info').innerHTML="Address<br>"+address_string;
				});
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form118_update_form();
				});

				var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
							"<td>Rs. "+bill_results[i].amount+"</br>" +
							"Rs. "+bill_results[i].discount+"</br>" +
							"Rs. "+bill_results[i].tax+"</br>" +
							"Rs. "+bill_results[i].total+"</td>" +
							"<td></td>" +
							"</tr>";
				$('#form118_foot').html(total_row);
				
				var loyalty_data="<loyalty_programs count='1'>"+
					"<name></name>"+
					"<status exact='yes'>active</status>"+
					"</loyalty_programs>";
				get_single_column_data(function(programs)
				{
					if(programs.length>0)
					{
						filter_fields.elements[7].value=programs[0];
						var points_data="<loyalty_points>"+
							"<points></points>"+
							"<program_name exact='yes'>"+loyalty_program.value+"</program_name>"+
							"<customer exact='yes'>"+customers_filter.value+"</customer>"+
							"</loyalty_points>";
						get_single_column_data(function(points)
						{
							var points_value=0;
							for(var i=0;i<points.length;i++)
							{
								points_value+=parseFloat(points[i]);
							}	
							filter_fields.elements[8].value=points_value;	
						},points_data);
					}
				},loyalty_data);
				
				break;
			}
		
			fetch_requested_data('',bill_items_column,function(results)
			{
				var message_string="Bill from: "+get_session_var('title')+"\nAddress: "+get_session_var('address');
				
				results.forEach(function(result)
				{
					message_string+="\nItem: "+result.item_name;
					message_string+=" Quantity: "+result.quantity;
					message_string+=" Total: "+result.total;
					
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form118_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<textarea readonly='readonly' form='form118_"+id+"'>"+result.item_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form118_"+id+"' value='"+result.batch+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form118_"+id+"' value='"+result.quantity+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Unit Price'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form118_"+id+"' value='"+result.unit_price+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Total'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form118_"+id+"' value='"+result.total+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form118_"+id+"' value='"+result.amount+"'>";
							rowsHTML+="<input type='hidden' form='form118_"+id+"' value='"+result.discount+"'>";
							rowsHTML+="<input type='hidden' form='form118_"+id+"' value='"+result.tax+"'>";
							rowsHTML+="<input type='hidden' form='form118_"+id+"' value='"+result.offer+"'>";
							rowsHTML+="<input type='hidden' form='form118_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form118_"+id+"' id='save_form118_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form118_"+id+"' id='delete_form118_"+id+"' onclick='form118_delete_item($(this));'>";
							rowsHTML+="<input type='hidden' form='form118_"+id+"'>";
							rowsHTML+="<input type='hidden' form='form118_"+id+"'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form118_body').append(rowsHTML);
				});
				
				message_string+="\nAmount: "+bill_results[0].amount;
				message_string+="\ndiscount: "+bill_results[0].discount;
				message_string+="\nTax: "+bill_results[0].tax;
				message_string+="\nTotal: "+bill_results[0].total;
				
				var subject="Bill from "+get_session_var('title');
				$('#form118_share').show();
				$('#form118_share').click(function()
				{
					modal44_action(filter_fields.elements[1].value,subject,message_string);
				});

				hide_loader();
			});
		});
	}
}


/**
 * @form Create Bills(multiple register, unbilled items)
 * @formNo 119
 * @Loading light
 */
function form119_ini()
{
	var bill_id=$("#form119_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form119_body').html("");
	$('#form119_foot').html("");
	document.getElementById('form119_customer_info').innerHTML="";
	document.getElementById('form119_payment_info').innerHTML="";
	
	if(bill_id!="")
	{
		show_loader();
		var bill_columns="<bills>" +
				"<id>"+bill_id+"</id>" +
				"<bill_num></bill_num>"+
				"<customer_name></customer_name>" +
				"<total></total>" +
				"<bill_date></bill_date>" +
				"<amount></amount>" +
				"<discount></discount>" +
				"<tax></tax>" +
				"<offer></offer>" +
				"<billing_type></billing_type>" +
				"<type>product</type>" +
				"<transaction_id></transaction_id>" +
				"</bills>";
		var bill_items_column="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<batch></batch>" +
				"<unit_price></unit_price>" +
				"<mrp></mrp>" +
				"<quantity></quantity>" +
				"<p_quantity></p_quantity>" +
				"<f_quantity></f_quantity>" +
				"<amount></amount>" +
				"<total></total>" +
				"<discount></discount>" +
				"<offer></offer>" +
				"<type></type>" +
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
				"<tax></tax>" +
				"<free_with></free_with>" +
				"</bill_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			//console.log(bill_results);
			var filter_fields=document.getElementById('form119_master');
			
			for (var i in bill_results)
			{
				filter_fields.elements[1].value=bill_results[i].customer_name;
				filter_fields.elements[2].value=bill_results[i].billing_type;
				filter_fields.elements[3].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements[4].value=bill_results[i].bill_num;
				filter_fields.elements[6].value=bill_id;
				filter_fields.elements[7].value=bill_results[i].offer;
				filter_fields.elements[8].value=bill_results[i].transaction_id;
				var unbilled_button=filter_fields.elements[9];
				var save_button=filter_fields.elements[10];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form119_update_form();
				});
				
				var attributes_data="<attributes>" +
						"<value></value>" +
						"<type exact='yes'>customer</type>" +
						"<attribute array='yes'>--DL No--TIN--</attribute>" +
						"<name exact='yes'>"+bill_results[i].customer_name+"</name>" +
						"</attributes>";
				fetch_requested_data('',attributes_data,function(attributes)
				{
					var attributes_string="";
					for(var i in attributes)
					{
						attributes_string+=attributes[i].attribute+": "+attributes[i].value+"<br>";
					}
					document.getElementById('form119_customer_info').innerHTML=attributes_string;
				});
				
				var payment_data="<payments>" +
						"<id></id>" +
						"<mode></mode>" +
						"<paid_amount></paid_amount>" +
						"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
						"</payments>";
				fetch_requested_data('',payment_data,function(payments)
				{
					if(payments.length>0)
					{
						document.getElementById('form119_payment_info').innerHTML="Payment: "+payments[0].mode+"<br>Paid: Rs."+payments[0].paid_amount;
					}
				});
				
				var unbilled_data="<unbilled_sale_items>" +
						"<id></id>" +
						"<customer exact='yes'>"+bill_results[i].customer_name+"</customer>" +
						"</unbilled_sale_items>";
				get_single_column_data(function(customers)
				{
					filter_fields.elements[5].value=customers.length;
					if(customers.length>0)
						$(unbilled_button).show();
					
				},unbilled_data);
		
				var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
									"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
									"<td>Rs. "+bill_results[i].amount+"</br>" +
									"Rs. "+bill_results[i].discount+"</br>" +
									"Rs. "+bill_results[i].tax+"</br>" +
									"Rs. "+bill_results[i].total+"</td>" +
									"<td></td>" +
									"</tr>";
				$('#form119_foot').html(total_row);

				break;
			}
		
			fetch_requested_data('',bill_items_column,function(results)
			{
				var message_string="Bill from: "+get_session_var('title')+"\nAddress: "+get_session_var('address');
				
				results.forEach(function(result)
				{
					message_string+="\nItem: "+result.item_name;
					message_string+=" Quantity: "+result.quantity;
					message_string+=" Total: "+result.total;
					
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form119_"+id+"'></form>";
						rowsHTML+="<td data-th='Product Name'>";
							rowsHTML+="<label id='form119_product_make_"+id+"'></label>";
							rowsHTML+="<br><v2><v2><textarea required form='form119_"+id+"' readonly='readonly'>"+result.item_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' required form='form119_"+id+"' readonly='readonly' value='"+result.batch+"'>";
							rowsHTML+="<br><v2>Expiry: </v2><label id='form119_exp_"+id+"'></label>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<v1>Bought: </v1><input type='number' min='0' required form='form119_"+id+"' readonly='readonly' step='any' value='"+result.p_quantity+"'>";
							rowsHTML+="<br><v2>Free: </v2><input type='number' min='0' value='0' required form='form119_"+id+"' readonly='readonly' step='any' value='"+result.f_quantity+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="<v1>Sale: </v1>Rs. <input type='number' required min='0' readonly='readonly' form='form119_"+id+"' step='any' value='"+result.unit_price+"'>";
							rowsHTML+="<br><v2>MRP: </v2>Rs. <input type='number' min='0' readonly='readonly' form='form119_"+id+"' step='any' value='"+result.mrp+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Total'>";
							rowsHTML+="<v1>Amount: </v1>Rs. <input type='number' required min='0' form='form119_"+id+"' readonly='readonly' step='any' value='"+result.amount+"'>";
							rowsHTML+="<input type='hidden' form='form119_"+id+"' readonly='readonly' value='"+result.discount+"'>";
							rowsHTML+="<br><v2>Tax: </v2>Rs. <input type='number' required min='0' form='form119_"+id+"' readonly='readonly' step='any' value='"+result.tax+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form119_"+id+"' value='"+result.total+"'>";
							rowsHTML+="<input type='hidden' form='form119_"+id+"' value='"+result.offer+"'>";
							rowsHTML+="<input type='hidden' form='form119_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form119_"+id+"' id='save_form119_"+id+"' >";
							rowsHTML+="<input type='button' class='delete_icon' form='form119_"+id+"' id='delete_form119_"+id+"' onclick='form119_delete_item($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";

					$('#form119_body').append(rowsHTML);
					
					var make_data="<product_master>" +
							"<make></make>" +
							"<name exact='yes'>"+result.item_name+"</name>" +
							"</product_master>";
					get_single_column_data(function(data)
					{
						if(data.length>0)
						{
							document.getElementById('form119_product_make_'+id).innerHTML=data[0]+":";
						}
					},make_data);
					
					var exp_data="<product_instances>" +
							"<expiry></expiry>" +
							"<product_name exact='yes'>"+result.item_name+"</product_name>" +
							"<batch exact='yes'>"+result.batch+"</batch>" +
							"</product_instances>";
					get_single_column_data(function(data)
					{
						if(data.length>0)
						{
							document.getElementById('form119_exp_'+id).innerHTML=get_my_past_date(data[0]);
						}
					},exp_data);

				});
				
				message_string+="\nAmount: "+bill_results[0].amount;
				message_string+="\ndiscount: "+bill_results[0].discount;
				message_string+="\nTax: "+bill_results[0].tax;
				message_string+="\nTotal: "+bill_results[0].total;
				
				var subject="Bill from "+get_session_var('title');
				$('#form119_share').show();
				$('#form119_share').click(function()
				{
					modal44_action(filter_fields.elements[1].value,subject,message_string);
				});
				hide_loader();
			});
		});
	}
}

/**
 * @form Manage Loyalty Customers
 * @formNo 120
 * @Loading light
 */
function form120_ini()
{
	show_loader();
	var fid=$("#form120_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form120_header');
	
	var	fname=filter_fields.elements[0].value;
	var fcustomer=filter_fields.elements[1].value;
	var ftier=filter_fields.elements[2].value;
	var fstatus=filter_fields.elements[3].value;
	////indexing///
	var index_element=document.getElementById('form120_index');
	var prev_element=document.getElementById('form120_prev');
	var next_element=document.getElementById('form120_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<loyalty_customers count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<program_name>"+fname+"</program_name>" +
			"<customer>"+fcustomer+"</customer>" +
			"<tier>"+ftier+"</tier>" +
			"<status exact='yes'>active</status>" +
			"</loyalty_customers>";

	$('#form120_body').html("");

	fetch_requested_data('form120',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var points_data="<loyalty_points>" +
					"<points></points>" +
					"<program_name exact='yes'>"+result.program_name+"</program_name>" +
					"<customer exact='yes'>"+result.customer+"</customer>" +
					"</loyalty_points>";
			get_single_column_data(function(points)
			{
				var points_value=0;
				for(var i in points)
				{
					points_value+=parseFloat(points[i]);
				}
				var rowsHTML="";
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form120_"+result.id+"'></form>";
						rowsHTML+="<td data-th='Program Name'>";
							rowsHTML+="<textarea readonly='readonly' form='form120_"+result.id+"'>"+result.program_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Customer'>";
							rowsHTML+="<textarea readonly='readonly' form='form120_"+result.id+"'>"+result.customer+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Tier'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form120_"+result.id+"' value='"+result.tier+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Points'>";
							rowsHTML+="<input type='number' readonly='readonly' step='any' form='form120_"+result.id+"' value='"+points_value+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form116_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
				
				$('#form120_body').append(rowsHTML);
			},points_data);
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		$('textarea').autosize();
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'loyalty_customers');
		});
		hide_loader();
	});
}

/**
 * @form adjust Loyalty Points
 * @formNo 121
 * @Loading light
 */
function form121_ini()
{
	show_loader();
	var fid=$("#form121_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form121_header');
	
	var	fname=filter_fields.elements[0].value;
	var fcustomer=filter_fields.elements[1].value;
	////indexing///
	var index_element=document.getElementById('form121_index');
	var prev_element=document.getElementById('form121_prev');
	var next_element=document.getElementById('form121_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<loyalty_points count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<program_name>"+fname+"</program_name>" +
			"<customer>"+fcustomer+"</customer>" +
			"<points></points>" +
			"<date></date>" +
			"<source></source>" +
			"<source_id></source_id>" +
			"</loyalty_points>";

	$('#form121_body').html("");

	fetch_requested_data('form121',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form121_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Program Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form121_"+result.id+"'>"+result.program_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form121_"+result.id+"'>"+result.customer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Points'>";
						rowsHTML+="<input type='number' readonly='readonly' step='any' form='form121_"+result.id+"' value='"+result.points+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form121_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Source'>";
						rowsHTML+="<textarea form='form121_"+result.id+"' readonly='readonly'>"+result.source+": "+result.source_id+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form121_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form121_"+result.id+"' id='delete_form121_"+result.id+"' onclick='form121_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form121_body').append(rowsHTML);
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		$('textarea').autosize();
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'loyalty_points');
		});
		hide_loader();
	});
}


/**
 * @form Enter Supplier Bill (unbilled items)
 * @formNo 122
 * @Loading light
 */
function form122_ini()
{
	var bill_id=$("#form122_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form122_body').html("");
	$('#form122_foot').html("");
	
	if(bill_id!="")
	{
		show_loader();
		var bill_columns="<supplier_bills>" +
				"<id>"+bill_id+"</id>" +
				"<bill_id></bill_id>" +
				"<supplier></supplier>" +
				"<total></total>" +
				"<amount></amount>" +
				"<discount></discount>" +
				"<tax></tax>" +
				"<bill_date></bill_date>" +
				"<entry_date></entry_date>" +
				"<notes></notes>" +
				"<transaction_id></transaction_id>" +
				"</supplier_bills>";
		
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			for (var i in bill_results)
			{
				var filter_fields=document.getElementById('form122_master');
				filter_fields.elements[1].value=bill_results[i].supplier;
				filter_fields.elements[2].value=bill_results[i].bill_id;
				filter_fields.elements[3].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements[4].value=get_my_past_date(bill_results[i].entry_date);
				filter_fields.elements[5].value=bill_results[i].notes;
				filter_fields.elements[7].value=bill_id;
				filter_fields.elements[8].value=bill_results[i].transaction_id;
				var unbilled_button=filter_fields.elements[9];
				var save_button=filter_fields.elements[10];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form122_update_form();
				});

				var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
								"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
								"<td>Rs. "+bill_results[i].amount+"</br>" +
								"Rs. "+bill_results[i].discount+"</br>" +
								"Rs. "+bill_results[i].tax+"</br>" +
								"Rs. "+bill_results[i].total+"</td>" +
								"<td></td>" +
								"</tr>";
				$('#form122_foot').html(total_row);

				var unbilled_data="<unbilled_purchase_items>" +
						"<id></id>" +
						"<supplier exact='yes'>"+bill_results[i].supplier+"</supplier>" +
						"</unbilled_purchase_items>";
				get_single_column_data(function(suppliers)
				{
					filter_fields.elements[6].value=suppliers.length;
					if(supplier.length>0)
						$(unbilled_button).show();
				},unbilled_data);

				break;
			}
		});
		
		var bill_items_column="<supplier_bill_items>" +
				"<id></id>" +
				"<product_name></product_name>" +
				"<batch></batch>" +
				"<amount></amount>" +
				"<tax></tax>" +
				"<total></total>" +
				"<unit_price></unit_price>" +
				"<p_quantity></p_quantity>" +
				"<f_quantity></f_quantity>" +
				"<storage></storage>" +
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
				"</supplier_bill_items>";
		
		fetch_requested_data('',bill_items_column,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="";
				var id=result.id;
				rowsHTML+="<tr>";
				rowsHTML+="<form id='form122_"+id+"'></form>";
					rowsHTML+="<td data-th='Product Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form122_"+id+"'>"+result.product_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="Bought: <input type='number' readonly='readonly' form='form122_"+id+"' value='"+result.p_quantity+"' step='any'>";
						rowsHTML+="</br>Free: <input type='number' readonly='readonly' form='form122_"+id+"' value='"+result.f_quantity+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Amount'>";
						rowsHTML+="Total: <input type='number' readonly='readonly' form='form122_"+id+"' value='"+result.total+"' step='any'>";
						rowsHTML+="</br>Tax: <input type='number' readonly='readonly' form='form122_"+id+"' value='"+result.tax+"' step='any'>";
						rowsHTML+="</br>Amount: <input type='number' readonly='readonly' form='form122_"+id+"' value='"+result.amount+"' step='any'>";
						rowsHTML+="</br>Unit Price: <input type='number' readonly='readonly' form='form122_"+id+"' value='"+result.unit_price+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form122_"+id+"' value='"+result.batch+"'>";
						rowsHTML+="<input type='hidden' form='form122_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Storage Area'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form122_"+id+"' value='"+result.storage+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form122_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='submit' class='submit_hidden' form='form122_"+id+"' id='save_form122_"+id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form122_"+id+"' id='delete_form122_"+id+"' onclick='form122_delete_item($(this));'>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form122_body').append(rowsHTML);
				
				var fields=document.getElementById("form122_"+id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
				});
			});
			hide_loader();
		});
	}
}

/**
 * @form Mandatory Attributes
 * @formNo 123
 * @Loading light
 */
function form123_ini()
{
	show_loader();
	var fid=$("#form123_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form123_header');
	
	var fobject=filter_fields.elements[0].value;
	var fattribute=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form123_index');
	var prev_element=document.getElementById('form123_prev');
	var next_element=document.getElementById('form123_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<mandatory_attributes count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<object>"+fobject+"</object>" +
			"<attribute>"+fattribute+"</attribute>" +
			"<value></value>"+			
			"<status>"+fstatus+"</status>" +
			"</mandatory_attributes>";

	$('#form123_body').html("");

	fetch_requested_data('form123',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form123_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Object'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form123_"+result.id+"' value='"+result.object+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Attribute'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form123_"+result.id+"' value='"+result.attribute+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Values'>";
						rowsHTML+="<textarea readonly='readonly' form='form123_"+result.id+"' class='dblclick_editable' title='Specify a list separated by semicolon(;). Or leave blank if any text is applicable'>"+result.value+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form123_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form123_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form123_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form123_"+result.id+"' title='Delete' onclick='form123_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form123_body').append(rowsHTML);
			var fields=document.getElementById("form123_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form123_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		
		longPressEditable($('.dblclick_editable'));
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'mandatory_attributes');
		});
		hide_loader();
	});
};


/**
 * @form Receipts
 * @formNo 124
 * @Loading light
 */
function form124_ini()
{
	show_loader();
	var fid=$("#form124_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form124_header');
	
	var rid=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var faccount=filter_fields.elements[2].value;
	var pid=filter_fields.elements[3].value;
	
	////indexing///
	var index_element=document.getElementById('form124_index');
	var prev_element=document.getElementById('form124_prev');
	var next_element=document.getElementById('form124_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<receipts count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<receipt_id>"+rid+"</receipt_id>" +
			"<type>"+ftype+"</type>" +
			"<acc_name>"+faccount+"</acc_name>" +
			"<payment_id>"+pid+"</payment_id>" +
			"<amount></amount>" +
			"</receipts>";

	$('#form124_body').html("");

	fetch_requested_data('form124',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form124_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Receipt Id'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form124_"+result.id+"' value='"+result.receipt_id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form124_"+result.id+"' value='"+result.type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Account'>";
						rowsHTML+="<textarea readonly='readonly' form='form124_"+result.id+"'>"+result.acc_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Payment Id'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form124_"+result.id+"' value='"+result.payment_id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Amount'>";
						rowsHTML+="<input type='number' readonly='readonly' form='form124_"+result.id+"' value='"+result.amount+"'>";
						rowsHTML+="<input type='hidden' form='form124_"+result.id+"' value='"+result.id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form124_body').append(rowsHTML);
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		
		var export_button=filter_fields.elements[6];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'receipts');
		});
		hide_loader();
	});
};

/**
 * @form Customer Accounts
 * @formNo 125
 * @Loading light
 */
function form125_ini()
{
	show_loader();
	var fid=$("#form125_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form125_header');
	
	var fcustomer=filter_fields.elements[0].value;
	var fusername=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form125_index');
	var prev_element=document.getElementById('form125_prev');
	var next_element=document.getElementById('form125_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<accounts count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<acc_name>"+fcustomer+"</acc_name>" +
			"<username>"+fusername+"</username>" +
			"<status>"+fstatus+"</status>" +
			"<type exact='yes'>customer</type>"+			
			"</accounts>";

	$('#form125_body').html("");

	fetch_requested_data('form125',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form125_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form125_"+result.id+"'>"+result.acc_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Username'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form125_"+result.id+"' value='"+result.username+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Password'>";
						rowsHTML+="<input type='password' readonly='readonly' class='dblclick_editable' form='form125_"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form125_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form125_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form125_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form125_"+result.id+"' title='Delete' onclick='form125_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form125_body').append(rowsHTML);
			var fields=document.getElementById("form125_"+result.id);
			var status_filter=fields.elements[3];
			set_static_value_list('accounts','status',status_filter);
			
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form125_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[5];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'customer_accounts');
		});
		hide_loader();
	});
};



/**
 * @form Issues List
 * @formNo 126
 * @Loading light
 */
function form126_ini()
{
	show_loader();
	var fid=$("#form126_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form126_header');
	
	if(fid=='')	
	{	
		fid=filter_fields.elements[0].value;
	}	
	var fdesc=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form126_index');
	var prev_element=document.getElementById('form126_prev');
	var next_element=document.getElementById('form126_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<issues count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<short_desc>"+fdesc+"</short_desc>" +
			"<detail></detail>" +
			"</issues>";

	$('#form126_body').html("");

	fetch_requested_data('form126',columns,function(results)
	{
		results.forEach(function(result)
		{
			var sol_columns="<solutions>" +
			"<detail></detail>" +
			"<issue_id exact='yes'>"+result.id+"</issue_id>" +
			"</solutions>";
			
			fetch_requested_data('form126',sol_columns,function(sol_results)
			{
				var solutions="";
				sol_results.forEach(function(sol)
				{	
					solutions+="* "+sol.detail+"\n";
				});
				
				var rowsHTML="<tr>";
					rowsHTML+="<form id='form126_"+result.id+"'></form>";
						rowsHTML+="<td data-th='Issue Id'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form126_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Short Description'>";
							rowsHTML+="<textarea readonly='readonly' form='form126_"+result.id+"'>"+result.short_desc+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Detail'>";
							rowsHTML+="<textarea readonly='readonly' form='form126_"+result.id+"'>"+result.detail+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Solutions'>";
							rowsHTML+="<textarea readonly='readonly' form='form126_"+result.id+"'>"+solutions+"</textarea>";
							rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add solution' onclick=\"modal48_action('"+result.id+"');\">";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form126_"+result.id+"' value='"+result.id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form126_"+result.id+"' title='Delete' onclick='form126_delete_item($(this));'>";
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
				
				$('#form126_body').append(rowsHTML);
				$('textarea').autosize();
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'issues');
		});
		hide_loader();
	});
};


/**
 * @form Manage Service Requests
 * @formNo 128
 * @Loading light
 */
function form128_ini()
{
	show_loader();
	var fid=$("#form128_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form128_header');
	
	if(fid=='')	
	{	
		fid=filter_fields.elements[0].value;
	}	
	var fcustomer=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form128_index');
	var prev_element=document.getElementById('form128_prev');
	var next_element=document.getElementById('form128_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<service_requests count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<customer>"+fcustomer+"</customer>" +
			"<notes></notes>"+
			"<problem_type></problem_type>"+
			"<reported_by></reported_by>"+			
			"<closing_notes></closing_notes>"+
			"<start_time></start_time>"+
			"<end_time></end_time>"+
			"<status>"+fstatus+"</status>" +
			"</service_requests>";

	$('#form128_body').html("");

	if_data_read_access('service_requests',function(accessible_data)
	{
		fetch_requested_data('form128',columns,function(results)
		{
			results.forEach(function(result)
			{
				var read=false;
				var update=false;
				var del=false;
				var access=false;
				for(var x in accessible_data)
				{
					if(accessible_data[x].record_id==result.id || accessible_data[x].record_id=='all')
					{
						if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field=='null' || result[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
						{
							if(accessible_data[x].access_type=='all')
							{
								read=true;
								update=true;
								del=true;
								access=true;
								break;
							}
							else if(accessible_data[x].access_type=='read')
							{
								read=true;
							}
							else if(accessible_data[x].access_type=='delete')
							{
								del=true;
							}
							else if(accessible_data[x].access_type=='update')
							{
								update=true;
							}
						}
					}
				}
				
				if(read)
				{
					var details="Reported By: "+result.reported_by+"\nProblem Type: "+result.problem_type+"\nProblem detail: "+result.notes;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form128_"+result.id+"'></form>";
						rowsHTML+="<td data-th='Request Id'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form128_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Customer'>";
							rowsHTML+="<textarea readonly='readonly' form='form128_"+result.id+"'>"+result.customer+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Detail'>";
							rowsHTML+="<textarea readonly='readonly' form='form128_"+result.id+"'>"+details+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form128_"+result.id+"' value='"+result.status+"'>";
							if(update)
								rowsHTML+="<br><input type='button' class='generic_icon' value='Close' form='form128_"+result.id+"' onclick='modal103_action($(this))'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form128_"+result.id+"' value='"+result.id+"'>";
							if(del)								
								rowsHTML+="<input type='button' class='delete_icon' form='form128_"+result.id+"' title='Delete' onclick='form128_delete_item($(this));'>";
							rowsHTML+="<input type='button' class='generic_icon' value='Details' title='Service Request Details' form='form128_"+result.id+"' onclick=\"element_display('"+result.id+"','form134')\">";
							rowsHTML+="<input type='button' class='generic_icon' value='Billing' title='Billing Details' form='form128_"+result.id+"' onclick=\"element_display('"+result.id+"','form151')\">";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
				
					$('#form128_body').append(rowsHTML);
					$('textarea').autosize();
				}
			});
			
			////indexing///
			var next_index=parseInt(start_index)+25;
			var prev_index=parseInt(start_index)-25;
			next_element.setAttribute('data-index',next_index);
			prev_element.setAttribute('data-index',prev_index);
			index_element.setAttribute('data-index','0');
			if(results.length<25)
			{
				$(next_element).hide();
			}
			else
			{
				$(next_element).show();
			}
			if(prev_index<0)
			{
				$(prev_element).hide();
			}
			else
			{
				$(prev_element).show();
			}
			
			/////////////			
			var export_button=filter_fields.elements[4];
			$(export_button).off("click");
			$(export_button).on("click", function(event)
			{
				my_obj_array_to_csv(results,'service_requests');
			});
			hide_loader();
		});
	});
};


/**
 * @form Engineer's locations
 * @formNo 129
 * @Loading light
 */
function form129_ini()
{
	if(is_online())
	{
		show_loader();
		var domain=get_domain();
		var username=get_username();
		var re_access=get_session_var('re');
		
		$('#form129_header').html("");
	
		var lat=get_session_var('lat');
		var lng=get_session_var('lng');
		var title=get_session_var('title');
		
		if(typeof map129 != 'undefined')
			map129.remove();
	
		map129 = L.map('form129_map',{
			center: [lat,lng], 
			zoom: 10
		});
		
/*		var googleLayer=new L.Google('ROADMAP');
		console.log(googleLayer);		
		map129.addLayer(googleLayer);
*/		
		L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
	        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenstreetMap</a>',
	        subdomains:'1234'
	    }).addTo(map129);
		
		//////////changeable master coordinates/////////
		
		var mlatlng=L.latLng(lat,lng);
		var mmarker=L.marker(mlatlng,{draggable:true}).addTo(map129).bindPopup(title);
		mmarker.on('dragend',function(event){
			var m=event.target;
			var latlng=m.getLatLng();
			var form=document.getElementById('form129_master');
			form.elements[1].value=latlng.lat;
			form.elements[2].value=latlng.lng;
			var save_button=form.elements[3];
			$(save_button).show();
		});
		
		var rowsHTML="<div class='customers_content_item'>" +
				"<form id='form129_master'>" +
				"Name: <textarea style='height:40px;width:100px' readonly='readonly'>"+title+"</textarea></br>" +
				"Latitude: <textarea style='height:20px;width:100px' readonly='readonly'>"+lat+"</textarea></br>" +
				"Longitude: <textarea style='height:20px;width:100px' readonly='readonly'>"+lng+"</textarea></br>" +
				"<input type='button' class='export_icon' value='Confirm' style='display:none;' form='form129_master'>" +
				"</form>" +
				"</div>";
		
		$('#form129_header').append(rowsHTML);
		var fields=document.getElementById("form129_master");
		var save_button=fields.elements[3];
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form129_update_master(fields);
		});
		$(fields).parent().on('click',function(event)
		{
			//console.log('clicked on master');
			mmarker.openPopup();
		});
	
		/////////////////////////////////////////////////
		
		var staff_data="<staff>" +
				"<id></id>" +
				"<name></name>" +
				"<lat></lat>" +
				"<lng></lng>" +
				"<acc_name></acc_name>" +
				"<address></address>" +
				"<pincode></pincode>" +
				"<city></city>" +
				"<state></state>" +
				"<country></country>" +
				"</staff>";
		if_data_read_access('staff',function(accessible_data)
		{
			fetch_requested_data('form129',staff_data,function(staffs)
			{
				staffs.forEach(function(staff)
				{
					var read=false;
					var update=false;
					var del=false;
					var access=false;
					for(var x in accessible_data)
					{
						if(accessible_data[x].record_id===staff.id || accessible_data[x].record_id=='all')
						{
							if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || staff[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
							{
								if(accessible_data[x].access_type=='all')
								{
									read=true;
									update=true;
									del=true;
									access=true;
									break;
								}
								else if(accessible_data[x].access_type=='read')
								{
									read=true;
								}
								else if(accessible_data[x].access_type=='delete')
								{
									del=true;
								}
								else if(accessible_data[x].access_type=='update')
								{
									update=true;
								}
							}
						}
					}

					if(read)
					{
						if(staff.lat=='')
						{
							staff.lat=lat;
						}
						if(staff.lng=='')
						{
							staff.lng=lng;
						}
						var latlng=L.latLng(staff.lat,staff.lng);
						var marker=L.marker(latlng,{draggable:true}).addTo(map129).bindPopup(staff.name);
						marker.on('dragend',function(event){
							var m=event.target;
							var latlng=m.getLatLng();
							var form=document.getElementById('form129_'+staff.id);
							form.elements[1].value=latlng.lat;
							form.elements[2].value=latlng.lng;
							if(update)
							{							
								var save_button=form.elements[4];
								$(save_button).show();
							}
						});
						
						var rowsHTML="<div class='customers_content_item'>" +
								"<form id='form129_"+staff.id+"'>" +
								"Name: <textarea style='height:40px;width:100px' readonly='readonly'>"+staff.acc_name+"</textarea></br>" +
								"Latitude: <textarea style='height:20px;width:100px' readonly='readonly'>"+staff.lat+"</textarea></br>" +
								"Longitude: <textarea style='height:20px;width:100px' readonly='readonly'>"+staff.lng+"</textarea></br>" +
								"<input type='hidden' value='"+staff.id+"'>" +
								"<input type='button' class='export_icon' value='Confirm' form='form129_"+staff.id+"'>" +
								"</form>" +
								"</div>";
						
						$('#form129_header').append(rowsHTML);
						var fields=document.getElementById("form129_"+staff.id);
						if(update)
						{
							var save_button=fields.elements[4];
							$(save_button).on("click", function(event)
							{
								event.preventDefault();
								form129_update_item(fields);
							});
						}
						$(fields).parent().on('click',function(event)
						{
							marker.openPopup();
						});
					}
				});
				
				var scrollPane=$(".customers_pane");
				var scrollContent=$(".customers_content");
				scrollContent.css('width',(Math.round(225*staffs.length)+225)+"px");
				$(".customers_bar").slider({
					slide: function(event,ui)
					{
						if(scrollContent.width()>scrollPane.width())
						{
							scrollContent.css( "margin-left", Math.round(ui.value/100*(scrollPane.width()-scrollContent.width()))+"px");
						}
						else
						{
							scrollContent.css("margin-left",0);
						}
					}
				});
		
				scrollPane.css("overflow","hidden");			
			hide_loader();
			});						
		});			
	}
	else
	{
		$("#modal6").dialog("open");
	}
}

/**
 * @form Job order
 * @formNo 130
 * @Loading light
 */
function form130_ini()
{
	var bill_id=$("#form130_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form130_body').html("");
	$('#form130_foot').html("");
	
	if(bill_id!="")
	{
		show_loader();
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
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
				"<tax></tax>" +
				"<free_with></free_with>" +
				"</bill_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			var filter_fields=document.getElementById('form130_master');
			
			for (var i in bill_results)
			{
				filter_fields.elements[1].value=bill_results[i].customer_name;
				filter_fields.elements[2].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements[3].value=bill_id;
				filter_fields.elements[4].value=bill_results[i].offer;
				filter_fields.elements[5].value=bill_results[i].transaction_id;
				
				var save_button=filter_fields.elements[6];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form130_update_form();
				});

				var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
							"<td>Rs. "+bill_results[i].amount+"</br>" +
							"Rs. "+bill_results[i].discount+"</br>" +
							"Rs. "+bill_results[i].tax+"</br>" +
							"Rs. "+bill_results[i].total+"</td>" +
							"<td></td>" +
							"</tr>";
				$('#form130_foot').html(total_row);

				break;
			}
			
			fetch_requested_data('',bill_items_column,function(results)
			{
				var message_string="Bill from:"+get_session_var('title')+"\nAddress: "+get_session_var('address');
				
				results.forEach(function(result)
				{
					message_string+="\nItem: "+result.item_name;
					message_string+=" Price: "+result.unit_price;
					message_string+=" Total: "+result.total;
					
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form130_"+id+"'></form>";
						rowsHTML+="<td data-th='Item Name'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form130_"+id+"' value='"+result.item_name+"'>";
						rowsHTML+="</td>";
						if(result.batch!=null && result.batch!="")
						{
							rowsHTML+="<td data-th='Batch'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form130_"+id+"' value='"+result.batch+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Quantity'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form130_"+id+"' value='"+result.quantity+"'>";
							rowsHTML+="</td>";
						}
						else
						{
							rowsHTML+="<td data-th='Person'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form130_"+id+"' value='"+result.staff+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Notes'>";
								rowsHTML+="<textarea readonly='readonly' form='form130_"+id+"'>"+result.notes+"</textarea>";
							rowsHTML+="</td>";
						}
						rowsHTML+="<td data-th='Unit Price'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form130_"+id+"' value='"+result.unit_price+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Total'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form130_"+id+"' value='"+result.total+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+result.amount+"'>";
							rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+result.discount+"'>";
							rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+result.tax+"'>";
							rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+result.offer+"'>";
							rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='submit_hidden' form='form130_"+id+"' id='save_form130_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form130_"+id+"' id='delete_form130_"+id+"' onclick='form130_delete_item($(this));'>";
							rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
							rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
							rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form130_body').append(rowsHTML);
					
					var fields=document.getElementById("form130_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
					});
				});
				
				
				message_string+="\nAmount: "+filter_fields.elements[3].value;
				message_string+="\ndiscount: "+filter_fields.elements[4].value;
				message_string+="\nTax: "+filter_fields.elements[5].value;
				message_string+="\nTotal: "+filter_fields.elements[6].value;

				var subject="Bill from "+get_session_var('title');
				$('#form130_share').show();
				$('#form130_share').click(function()
				{
					modal44_action(filter_fields.elements[1].value,subject,message_string);
				});
				
				hide_loader();
			});
		});
	}
}

/**
 * @form Tasks
 * @formNo 131
 * @Loading heavy
 */
function form131_ini()
{
	show_loader();
	var fid=$("#form131_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form131_header');
	
	//populating form 
	var ftype=filter_fields.elements[0].value;
	var fassignee=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form131_index');
	var prev_element=document.getElementById('form131_prev');
	var next_element=document.getElementById('form131_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<task_instances count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+ftype+"</name>" +
			"<description></description>" +
			"<assignee>"+fassignee+"</assignee>" +
			"<t_due></t_due>" +
			"<t_initiated></t_initiated>" +
			"<task_hours></task_hours>" +
			"<status>"+fstatus+"</status>" +
			"<last_updated></last_updated>" +
			"<source exact='yes'>service request</source>"+
	        "</task_instances>";

	$('#form131_body').html("");

	if_data_read_access('staff',function(accessible_data)
	{
		fetch_requested_data('form131',columns,function(results)
		{
			results.forEach(function(result)
			{
				var read=false;
				var update=false;
				var del=false;
				var access=false;
				for(var x in accessible_data)
				{
					if(accessible_data[x].record_id===result.id || accessible_data[x].record_id=='all')
					{
						if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || result[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
						{
							if(accessible_data[x].access_type=='all')
							{
								read=true;
								update=true;
								del=true;
								access=true;
								break;
							}
							else if(accessible_data[x].access_type=='read')
							{
								read=true;
							}
							else if(accessible_data[x].access_type=='delete')
							{
								del=true;
							}
							else if(accessible_data[x].access_type=='update')
							{
								update=true;
							}
						}
					}
				}

				if(read)
				{
					result.t_due=get_my_datetime(result.t_due);
					result.t_initiated=get_my_datetime(result.t_initiated);
					var message_string="Due time: "+result.t_due+"\nTask: "+result.name+"\nAssignee:"+result.assignee;
					message_string=encodeURIComponent(message_string);
					var rowsHTML="";
					rowsHTML+="<tr>";
						rowsHTML+="<form id='form131_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Task Name'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form131_"+result.id+"' value='"+result.name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Assignee'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form131_"+result.id+"' class='dblclick_editable' value='"+result.assignee+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Due Time'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form131_"+result.id+"' class='dblclick_editable' value='"+result.t_due+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form131_"+result.id+"' class='dblclick_editable' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' readonly='readonly' form='form131_"+result.id+"' value='"+result.id+"'>";
								if(update)								
									rowsHTML+="<input type='submit' class='save_icon' form='form131_"+result.id+"' title='Save'>";
								if(del)		
									rowsHTML+="<input type='button' class='delete_icon' form='form131_"+result.id+"' title='Delete' onclick='form131_delete_item($(this));'>";
								rowsHTML+="<a id='form131_whatsapp_"+result.id+"' href='whatsapp://send?text="+message_string+"' target='_blank'><img style='width:25px;height:25px;' src='./images/whatsapp.jpeg' form='form131_"+result.id+"' title='Send details through WhatsApp'></a>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
			
					$('#form131_body').append(rowsHTML);
					var fields=document.getElementById("form131_"+result.id);
					if(update)
					{					
						$(fields).on("submit", function(event)
						{
							event.preventDefault();
							form131_update_item(fields);
						});
					}
					
					var name_filter=fields.elements[0];
					var assignee_filter=fields.elements[1];
					var due_filter=fields.elements[2];
					var status_filter=fields.elements[3];
								
					var staff_data="<staff>" +
							"<acc_name></acc_name>" +
							"</staff>";
					set_my_value_list(staff_data,assignee_filter);
					set_static_value_list('task_instances','status',status_filter);
					$(due_filter).datetimepicker();
				}
			});
		
			////indexing///
			var next_index=parseInt(start_index)+25;
			var prev_index=parseInt(start_index)-25;
			next_element.setAttribute('data-index',next_index);
			prev_element.setAttribute('data-index',prev_index);
			index_element.setAttribute('data-index','0');
			if(results.length<25)
			{
				$(next_element).hide();
			}
			else
			{
				$(next_element).show();
			}
			if(prev_index<0)
			{
				$(prev_element).hide();
			}
			else
			{
				$(prev_element).show();
			}
			/////////////
	
			longPressEditable($('.dblclick_editable'));
			
			var export_button=filter_fields.elements[4];
			$(export_button).off("click");
			$(export_button).on("click", function(event)
			{
				my_obj_array_to_csv(results,'tasks');
			});
			hide_loader();
		});
	});
};

/**
 * @form Service documents
 * @formNo 133
 * @Loading heavy
 */
function form133_ini()
{
	show_loader();
	var fid=$("#form133_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form133_header');
	
	if(fid=='')
		fid=filter_fields.elements[0].value;
	var fcustomer=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form133_index');
	var prev_element=document.getElementById('form133_prev');
	var next_element=document.getElementById('form133_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var doc_column="<documents count='25' start_index='"+start_index+"'>" +
			"<id></id>" +
			"<url></url>" +
			"<doc_name></doc_name>"+
			"<target_id>"+fid+"</target_id>" +
			"<doc_type exact='yes'>service request</doc_type>" +
			"</documents>";

	$('#form133_body').html("");

	fetch_requested_data('form133',doc_column,function(doc_results)
	{
		doc_results.forEach(function(doc_result)
		{
			var columns="<service_requests>" +
					"<customer></customer>"+					
					"<id>"+doc_result.target_id+"</id>" +
					"</service_requests>";
			get_single_column_data(function(results)
			{
				var updated_url=doc_result.url.replace(/ /g,"+");
				var rowsHTML="<tr>";
					rowsHTML+="<form id='form133_"+doc_result.id+"'></form>";
						rowsHTML+="<td data-th='Request Id'>";
							rowsHTML+="<textarea readonly='readonly' form='form133_"+doc_result.id+"'>"+doc_result.target_id+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Customer'>";
							rowsHTML+="<textarea readonly='readonly' form='form133_"+doc_result.id+"'>"+results[0]+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='File'>";
							rowsHTML+="<a href='"+updated_url+"' download='"+doc_result.doc_name+"'>"+doc_result.doc_name+"</a>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form133_"+doc_result.id+"' value='"+doc_result.id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form133_"+doc_result.id+"' title='Save'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form133_"+doc_result.id+"' title='Delete' onclick='form133_delete_item($(this));'>";	
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form133_body').append(rowsHTML);
	
				var fields=document.getElementById("form133_"+doc_result.id);

				$(fields).on("submit",function(event)
				{
					event.preventDefault();
					form133_update_item(fields);
				});				
			},columns);
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(doc_results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		$('textarea').autosize();		
		hide_loader();
	});	
};


/**
 * @form Service Request Dashboard
 * @formNo 134
 * @Loading light
 */
function form134_ini()
{
	var filter_fields=document.getElementById('form134_master');
	var request_id=filter_fields.elements[1].value;
	
	$('#form134_detail_body').html("");
	$('#form134_machine_body').html("");
	$('#form134_team_body').html("");
	$('#form134_document_body').html("");
	$('#form134_task_body').html("");
	
	if(request_id!="" && request_id!="undefined")
	{
		show_loader();
		var request_columns="<service_requests>" +
				"<id>"+request_id+"</id>" +
				"<customer></customer>"+
				"<reported_by></reported_by>" +
				"<notes></notes>" +
				"<problem_type></problem_type>" +
				"<closing_notes></closing_notes>" +
				"<reported_time></reported_time>" +
				"<status></status>" +
				"</service_requests>";
	
		fetch_requested_data('form134',request_columns,function(request_results)
		{
			var filter_fields=document.getElementById('form134_master');
			
			if(request_results.length>0)
			{
				filter_fields.elements[1].value=request_results[0].id;
				filter_fields.elements[2].value=request_results[0].customer;
				filter_fields.elements[3].value=request_results[0].status;
				var id=request_results.id;
				var rowsHTML="<tr>";
					rowsHTML+="<td data-th='Reported By'>";
						rowsHTML+=request_results[0].reported_by+"<br>At: ";
						rowsHTML+=get_my_datetime(request_results[0].reported_time);
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Problem Type'>";
						rowsHTML+=request_results[0].problem_type;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Problem'>";
						rowsHTML+=request_results[0].notes;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Closing Notes'>";
						rowsHTML+=request_results[0].closing_notes;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='button' value='Add to Repo' class='generic_icon' onclick=\"form134_add_issue($(this),'"+request_results[0].problem_type+"','"+request_results[0].notes+"','"+request_results[0].closing_notes+"')\">";
					rowsHTML+="</td>";								
				rowsHTML+="</tr>";
			
				$('#form134_detail_body').append(rowsHTML);				
			}
		
			/////////////service request machines////////////////////////
			var machines_data="<service_request_machines>"+
									"<id></id>"+
									"<request_id exact='yes'>"+request_id+"</request_id>"+
									"<machine_type></machine_type>"+
									"<machine></machine>"+
									"<problem_type></problem_type>"+
									"<problem></problem>"+
									"<closing_notes></closing_notes>"+
									"<status></status>"+
									"</service_request_machines>";
			fetch_requested_data('',machines_data,function(machine_results)
			{				
				machine_results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form134_machine_"+id+"'></form>";
						rowsHTML+="<td data-th='Machine Type'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form134_machine_"+id+"' value='"+result.machine_type+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Machine'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form134_machine_"+id+"' value='"+result.machine+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Problem'>";
							rowsHTML+="<textarea readonly='readonly' form='form134_machine_"+id+"'>"+result.problem+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Closing Notes'>";
							rowsHTML+="<textarea readonly='readonly' form='form134_machine_"+id+"'>"+result.closing_notes+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form134_machine_"+id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form134_machine_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='generic_icon' value='Close' form='form134_machine_"+id+"' onclick='modal104_action($(this))'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form134_machine_"+id+"' id='delete_form134_machine_"+id+"' onclick='form134_delete_machine($(this));'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form134_machine_"+id+"' >";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";				
					$('#form134_machine_body').append(rowsHTML);
					
					var fields=document.getElementById("form134_machine_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form134_update_machine(fields);
					});

				});	
				longPressEditable($('.dblclick_editable'));		
			});

			/////////////service request team////////////////////////
			var team_data="<service_request_team>"+
									"<id></id>"+
									"<request_id exact='yes'>"+request_id+"</request_id>"+
									"<assignee></assignee>"+
									"<phone></phone>"+
									"<email></email>"+
									"</service_request_team>";
			fetch_requested_data('',team_data,function(team_results)
			{				
				team_results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form134_team_"+id+"'></form>";
						rowsHTML+="<td data-th='Assignee'>";
							rowsHTML+="<textarea readonly='readonly' form='form134_team_"+id+"'>"+result.assignee+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Phone'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form134_team_"+id+"' value='"+result.phone+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Email'>";
							rowsHTML+="<textarea readonly='readonly' form='form134_team_"+id+"'>"+result.email+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form134_team_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form134_team_"+id+"' id='delete_form134_team_"+id+"' onclick='form134_delete_team($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";				
					$('#form134_team_body').append(rowsHTML);
				});		
				longPressEditable($('.dblclick_editable'));		
			});
			
			/////////////service request document////////////////////
			var document_data="<documents>"+
								"<id></id>"+
								"<doc_type exact='yes'>service request</doc_type>"+
								"<target_id exact='yes'>"+request_id+"</target_id>"+
								"<doc_name></doc_name>"+
								"<url></url>"+
								"</documents>";
			fetch_requested_data('',document_data,function(document_results)
			{				
				document_results.forEach(function(result)
				{
					var id=result.id;
					var updated_url=result.url.replace(/ /g,"+");
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form134_document_"+id+"'></form>";
						rowsHTML+="<td data-th='Document Name'>";
							rowsHTML+="<textarea readonly='readonly' form='form134_document_"+id+"'>"+result.doc_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='File'>";
							rowsHTML+="<a href='"+updated_url+"' download='"+result.doc_name+"'><u>link</u></a>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form134_document_"+id+"'>";
							rowsHTML+="<input type='hidden' form='form134_document_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form134_document_"+id+"' id='delete_form134_document_"+id+"' onclick='form134_delete_document($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";				
					$('#form134_document_body').append(rowsHTML);
				});				
			});

			/////////////service request tasks////////////////////
			var task_data="<task_instances>"+
								"<id></id>"+
								"<source exact='yes'>service request</source>"+
								"<source_id exact='yes'>"+request_id+"</source_id>"+
								"<name></name>"+
								"<assignee></assignee>"+
								"<status></status>"+
								"<t_due></t_due>"+
								"<description></description>"+
								"</task_instances>";
			fetch_requested_data('',task_data,function(task_results)
			{				
				task_results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form134_task_"+id+"'></form>";
						rowsHTML+="<td data-th='Task'>";
							rowsHTML+="<textarea readonly='readonly' form='form134_task_"+id+"'>"+result.description+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Assignee'>";
							rowsHTML+="<textarea readonly='readonly' form='form134_task_"+id+"'>"+result.assignee+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Due By'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form134_task_"+id+"' value='"+get_my_datetime(result.t_due)+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form134_task_"+id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form134_task_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form134_task_"+id+"' id='delete_form134_task_"+id+"' onclick='form134_delete_task($(this));'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form134_task_"+id+"' >";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";				
					$('#form134_task_body').append(rowsHTML);
					var fields=document.getElementById("form134_task_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form134_update_task(fields);
					});
				});	
				longPressEditable($('.dblclick_editable'));			
			});
					
			hide_loader();
		});
	}
}


/**
 * @form Project Dashboard
 * @formNo 135
 * @Loading light
 */
function form135_ini()
{
	var filter_fields=document.getElementById('form135_master');
	var project_id=filter_fields.elements[4].value;	
	
	$('#form135_team_body').html("");
	$('#form135_document_body').html("");
	$('#form135_task_body').html("");
	$('#form135_asset_body').html("");
	
	if(project_id!="")
	{
		show_loader();
		var project_columns="<projects count='1'>" +
				"<id>"+project_id+"</id>" +
				"<name></name>"+
				"<details></details>" +
				"<start_date></start_date>" +
				"<status></status>" +
				"</projects>";
	
		fetch_requested_data('form135',project_columns,function(project_results)
		{
			var filter_fields=document.getElementById('form135_master');
			
			if(project_results.length>0)
			{
				filter_fields.elements[1].value=project_results[0].name;
				filter_fields.elements[2].value=project_results[0].details;
				filter_fields.elements[3].value=project_results[0].status;
			}

			///////////project schedule//////////////////////
			var phase_columns="<project_phases>" +
					"<id></id>" +
					"<project_id exact='yes'>"+project_id+"</project_id>" +
					"<phase_name></phase_name>" +
					"<details></details>" +
					"<start_date></start_date>" +
					"<due_date></due_date>"+
					"<percent_complete></percent_complete>"+
					"<status></status>" +
					"</project_phases>";
		
			fetch_requested_data('',phase_columns,function(results)
			{
				var source_array=[];
				
				results.sort(function(a,b)
				{
					if(parseFloat(a.start_date)>parseFloat(b.start_date))
					{	return 1;}
					else 
					{	return -1;}
				});	
					
				results.forEach(function(result)
				{
					var from_time = "/Date(" + result.start_date + ")/";
					var to_time = "/Date(" + result.due_date + ")/";
											
					var source_item=new Object();
					source_item.name=result.phase_name;
					source_item.desc="";						
					var value_item=new Object();
					value_item.from=from_time;
					value_item.to=to_time;
					value_item.label=result.details;
					value_item.desc=result.details;
					value_item.dataObj=result.id;						
					value_item.customClass="ganttRed";
					if(result.status=='completed')
						value_item.customClass="ganttGreen";
					else if(result.status=='active')
						value_item.customClass="ganttYellow";
											
					var values_array=[];
					values_array.push(value_item);
					source_item.values=values_array;
					source_array.push(source_item);
				
				});
								
				$("#form135_gantt").gantt({
					source: source_array,
					scale: "days",
					minScale: "hours",
					maxScale:"months",
					navigate: "scroll",
					onItemClick: function(data) 
					{
						modal107_action(data);
					},
				});					
			});		
		
			/////////////project team////////////////////////
			var team_data="<project_team>"+
									"<id></id>"+
									"<project_id exact='yes'>"+project_id+"</project_id>"+
									"<member></member>"+
									"<role></role>"+
									"<notes></notes>"+
									"<status></status>"+
									"</project_team>";
			fetch_requested_data('',team_data,function(team_results)
			{				
				team_results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form135_team_"+id+"'></form>";
						rowsHTML+="<td data-th='Member'>";
							rowsHTML+="<textarea readonly='readonly' form='form135_team_"+id+"'>"+result.member+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Role'>";
							rowsHTML+="<textarea readonly='readonly' form='form135_team_"+id+"'>"+result.role+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Notes'>";
							rowsHTML+="<textarea readonly='readonly' form='form135_team_"+id+"'>"+result.notes+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form135_team_"+id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form135_team_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form135_team_"+id+"' >";
							rowsHTML+="<input type='button' class='delete_icon' form='form135_team_"+id+"' id='delete_form135_team_"+id+"' onclick='form135_delete_team($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";				
					$('#form135_team_body').append(rowsHTML);
					var fields=document.getElementById("form135_team_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form135_update_team(fields);
					});
				});
				longPressEditable($('.dblclick_editable'));
			});
			
			/////////////service request document////////////////////
			var document_data="<documents>"+
								"<id></id>"+
								"<doc_type exact='yes'>project</doc_type>"+
								"<target_id exact='yes'>"+project_id+"</target_id>"+
								"<doc_name></doc_name>"+
								"<url></url>"+
								"</documents>";
			fetch_requested_data('',document_data,function(document_results)
			{				
				document_results.forEach(function(result)
				{
					var id=result.id;
					var updated_url=result.url.replace(/ /g,"+");
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form135_document_"+id+"'></form>";
						rowsHTML+="<td data-th='Document Name'>";
							rowsHTML+="<textarea readonly='readonly' form='form135_document_"+id+"'>"+result.doc_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='File'>";
							rowsHTML+="<a href='"+updated_url+"' download='"+result.doc_name+"'><u>link</u></a>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form135_document_"+id+"'>";
							rowsHTML+="<input type='hidden' form='form135_document_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form135_document_"+id+"' id='delete_form135_document_"+id+"' onclick='form135_delete_document($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";				
					$('#form135_document_body').append(rowsHTML);
				});				
			});

			/////////////project tasks////////////////////
			var task_data="<task_instances>"+
								"<id></id>"+
								"<source exact='yes'>project</source>"+
								"<source_id exact='yes'>"+project_id+"</source_id>"+
								"<name></name>"+
								"<assignee></assignee>"+
								"<status></status>"+
								"<t_due></t_due>"+
								"<description></description>"+
								"</task_instances>";
			fetch_requested_data('',task_data,function(task_results)
			{				
				task_results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form135_task_"+id+"'></form>";
						rowsHTML+="<td data-th='Task'>";
							rowsHTML+="<textarea readonly='readonly' form='form135_task_"+id+"'>"+result.name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Description'>";
							rowsHTML+="<textarea readonly='readonly' form='form135_task_"+id+"'>"+result.description+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Assignee'>";
							rowsHTML+="<textarea readonly='readonly' form='form135_task_"+id+"'>"+result.assignee+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Due By'>";
							rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form135_task_"+id+"' value='"+get_my_datetime(result.t_due)+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form135_task_"+id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form135_task_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form135_task_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form135_task_"+id+"' id='delete_form135_task_"+id+"' onclick='form135_delete_task($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";				
					$('#form135_task_body').append(rowsHTML);
					var fields=document.getElementById("form135_task_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form135_update_task(fields);
					});
				});	
				longPressEditable($('.dblclick_editable'));
			});
			
			hide_loader();
		});
	}
}



/**
 * @form Enter Supplier Bill (wholesale)
 * @formNo 136
 * @Loading light
 */
function form136_ini()
{
	var bill_id=$("#form136_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form136_body').html("");
	$('#form136_foot').html("");
	
	if(bill_id!="")
	{
		show_loader();
		var bill_columns="<supplier_bills>" +
				"<id>"+bill_id+"</id>" +
				"<bill_id></bill_id>" +
				"<supplier></supplier>" +
				"<total></total>" +
				"<amount></amount>" +
				"<discount></discount>" +
				"<tax></tax>" +
				"<bill_date></bill_date>" +
				"<entry_date></entry_date>" +
				"<notes></notes>" +
				"<transaction_id></transaction_id>" +
				"</supplier_bills>";
		
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			for (var i in bill_results)
			{
				var filter_fields=document.getElementById('form136_master');
				filter_fields.elements[1].value=bill_results[i].supplier;
				filter_fields.elements[2].value=bill_results[i].bill_id;
				filter_fields.elements[3].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements[4].value=get_my_past_date(bill_results[i].entry_date);
				filter_fields.elements[5].value=bill_results[i].notes;
				filter_fields.elements[6].value=bill_id;
				filter_fields.elements[7].value=bill_results[i].transaction_id;
				var save_button=filter_fields.elements[8];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form136_update_form();
				});
				
				var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
							"<td>Rs. "+bill_results[i].amount+"</br>" +
							"Rs. "+bill_results[i].discount+"</br>" +
							"Rs. "+bill_results[i].tax+"</br>" +
							"Rs. "+bill_results[i].total+"</td>" +
							"<td></td>" +
							"</tr>";
				$('#form136_foot').html(total_row);
				
				break;
			}
		});
		
		var bill_items_column="<supplier_bill_items>" +
				"<id></id>" +
				"<product_name></product_name>" +
				"<batch></batch>" +
				"<amount></amount>" +
				"<tax></tax>" +
				"<total></total>" +
				"<unit_price></unit_price>" +
				"<p_quantity></p_quantity>" +
				"<f_quantity></f_quantity>" +
				"<quantity></quantity>" +
				"<storage></storage>" +
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
				"</supplier_bill_items>";
		
		fetch_requested_data('',bill_items_column,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="";
				var id=result.id;
				rowsHTML+="<tr>";
				rowsHTML+="<form id='form136_"+id+"'></form>";
					rowsHTML+="<td data-th='Product Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form136_"+id+"'>"+result.product_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form136_"+id+"' value='"+result.batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="Bought: <input type='number' readonly='readonly' form='form136_"+id+"' value='"+result.p_quantity+"' step='any'>";
						rowsHTML+="<br>Free: <input type='number' readonly='readonly' form='form136_"+id+"' value='"+result.f_quantity+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Amount'>";
						rowsHTML+="Unit Price: <input type='number' readonly='readonly' form='form136_"+id+"' value='"+result.unit_price+"' step='any'>";
						rowsHTML+="<br>Tax: <input type='number' readonly='readonly' form='form136_"+id+"' value='"+result.tax+"' step='any'>";
						rowsHTML+="<br>Total: <input type='number' readonly='readonly' form='form136_"+id+"' value='"+result.total+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Storage Area'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form136_"+id+"' value='"+result.storage+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form136_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='submit' class='submit_hidden' form='form136_"+id+"' id='save_form136_"+id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form136_"+id+"' id='delete_form136_"+id+"' onclick='form136_delete_item($(this));'>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form136_body').append(rowsHTML);
				
				var fields=document.getElementById("form136_"+id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
				});
			});
			hide_loader();
		});
	}
}

/**
 * @form Project Expenses
 * @formNo 137
 * @Loading light
 */
function form137_ini()
{
	var project_id=$("#form137_link").attr('data_id');
	if(project_id==null)
		project_id="";
	$('#form137_body').html("");

	var fields=document.getElementById('form137_master');
	if(project_id=="")
	{	
		project_id=fields.elements[2].value;
	}
	else
	{
		fields.elements[2].value=project_id;
	}

	if(project_id!="")
	{
		show_loader();
		var project_columns="<projects>" +
				"<id>"+project_id+"</id>" +
				"<name></name>" +
				"</projects>";
		var member_columns="<expenses>" +
			"<id></id>" +
			"<source exact='yes'>project</source>"+
			"<source_id exact='yes'>"+project_id+"</source_id>" +
			"<person></person>" +
			"<amount></amount>" +
			"<detail></detail>" +
			"<status></status>" +
			"</expenses>";

		fetch_requested_data('',project_columns,function(project_results)
		{
			for (var i in project_results)
			{
				var filter_fields=document.getElementById('form137_master');
				filter_fields.elements[1].value=project_results[i].name;
				filter_fields.elements[2].value=project_results[i].id;
				
				$(filter_fields).off('submit');
				$(filter_fields).on("submit", function(event)
				{
					event.preventDefault();
					form137_create_form();
				});
				break;
			}
		});
		/////////////////////////////////////////////////////////////////////////
		
		if_data_read_access('expenses',function(accessible_data)
		{
			fetch_requested_data('',member_columns,function(results)
			{
				results.forEach(function(result)
				{
					var read=false;
					var update=false;
					var del=false;
					var access=false;
					for(var x in accessible_data)
					{
						if(accessible_data[x].record_id==result.id || accessible_data[x].record_id=='all')
						{
							if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || result[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
							{
								if(accessible_data[x].access_type=='all')
								{
									read=true;
									update=true;
									del=true;
									access=true;
									break;
								}
								else if(accessible_data[x].access_type=='read')
								{
									read=true;
								}
								else if(accessible_data[x].access_type=='delete')
								{
									del=true;
								}
								else if(accessible_data[x].access_type=='update')
								{
									update=true;
								}
							}
						}
					}
					
					if(read)
					{
						var id=result.id;
						var rowsHTML="<tr>";
						rowsHTML+="<form id='form137_"+id+"'></form>";
							rowsHTML+="<td data-th='Person'>";
								rowsHTML+="<textarea readonly='readonly' form='form137_"+id+"'>"+result.person+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Amount'>";
								rowsHTML+="Rs. <input type='number' readonly='readonly' form='form137_"+id+"' value='"+result.amount+"' step='any'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<textarea readonly='readonly' form='form137_"+id+"'>"+result.detail+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form137_"+id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form137_"+id+"' value='"+id+"'>";
							if(update && result.status=='submitted')
							{
								rowsHTML+="<input type='button' class='generic_icon' value='Approve' form='form137_"+id+"' onclick='form137_approve_item($(this))'>";
								rowsHTML+="<input type='button' class='generic_icon' value='Reject' form='form137_"+id+"' onclick='form137_reject_item($(this))'>";
							}
							if(del)
							{
								rowsHTML+="<input type='button' class='delete_icon' form='form137_"+id+"' id='delete_form137_"+id+"' onclick='form137_delete_item($(this));'>";
							}
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";

						$('#form137_body').append(rowsHTML);
					}
				});
				$('textarea').autosize();				
				hide_loader();
			});
		});
	}
}


/**
 * @form Project Schedule
 * @formNo 138
 * @Loading light
 */
function form138_ini()
{
	var project_id=$("#form138_link").attr('data_id');
	if(project_id==null)
		project_id="";

	//console.log(project_id);
	var fields=document.getElementById('form138_master');
	if(project_id=="")
	{	
		project_id=fields.elements[2].value;
	}
	else
	{
		fields.elements[2].value=project_id;
	}
	
	if(project_id!="")
	{
		show_loader();
		
		var project_name=fields.elements[1].value;
		var project_columns="<projects>" +
				"<id>"+project_id+"</id>" +
				"<name></name>" +
				"</projects>";
	
		var phase_columns="<project_phases>" +
				"<id></id>" +
				"<project_id exact='yes'>"+project_id+"</project_id>" +
				"<phase_name></phase_name>" +
				"<details></details>" +
				"<start_date></start_date>" +
				"<due_date></due_date>"+
				"<percent_complete></percent_complete>"+
				"<status></status>" +
				"</project_phases>";
	
		fetch_requested_data('',project_columns,function(project_results)
		{
			for (var i in project_results)
			{
				var filter_fields=document.getElementById('form138_master');
				filter_fields.elements[1].value=project_results[i].name;
				filter_fields.elements[2].value=project_results[i].id;				
				break;
			}
		});
		/////////////////////////////////////////////////////////////////////////
		
		if_data_read_access('projects',function(accessible_data)
		{
			fetch_requested_data('',phase_columns,function(results)
			{
				var source_array=[];
				
				results.sort(function(a,b)
				{
					if(parseFloat(a.start_date)>parseFloat(b.start_date))
					{	return 1;}
					else 
					{	return -1;}
				});	
					
				results.forEach(function(result)
				{
					var read=false;
					var update=false;
					var del=false;
					var access=false;
					for(var x in accessible_data)
					{
						if(accessible_data[x].record_id===project_id || accessible_data[x].record_id=='all')
						{
							if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || result[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
							{
								if(accessible_data[x].access_type=='all')
								{
									read=true;
									update=true;
									del=true;
									access=true;
									break;
								}
								else if(accessible_data[x].access_type=='read')
								{
									read=true;
								}
								else if(accessible_data[x].access_type=='delete')
								{
									del=true;
								}
								else if(accessible_data[x].access_type=='update')
								{
									update=true;
								}
							}
						}
					}
					
					if(read)
					{

						var from_time = "/Date(" + result.start_date + ")/";
						var to_time = "/Date(" + result.due_date + ")/";
												
						var source_item=new Object();
						source_item.name=result.phase_name;
						source_item.desc="";						
						var value_item=new Object();
						value_item.from=from_time;
						value_item.to=to_time;
						value_item.label=result.details;
						value_item.desc=result.details;
						value_item.dataObj=result.id;						
						value_item.customClass="ganttRed";
						if(result.status=='completed')
							value_item.customClass="ganttGreen";
						else if(result.status=='active')
							value_item.customClass="ganttYellow";
												
						var values_array=[];
						values_array.push(value_item);
						source_item.values=values_array;
						source_array.push(source_item);
					}
				});
								
				$("#form138_gantt").gantt({
					source: source_array,
					scale: "days",
					minScale: "hours",
					maxScale:"months",
					navigate: "scroll",
					onItemClick: function(data) 
					{
						modal107_action(data);
					},
				});
								
				hide_loader();
			});
		});
	}
}


/**
 * @form Customer Profiling
 * @formNo 139
 * @Loading light
 */
function form139_ini()
{
	var data_id=$("#form139_link").attr('data_id');
	show_loader();

	if(data_id==null)
		data_id="";
	$('#form139_body').html("");

	var filter_fields=document.getElementById('form139_header');
	var fcustomer=filter_fields.elements[0].value;
	var flocation=filter_fields.elements[1].value;
	
	var member_columns="<assets>" +
			"<id>"+data_id+"</id>" +
			"<name></name>" +
			"<type></type>" +
			"<description></description>" +
			"<location>"+flocation+"</location>"+
			"<area></area>"+
			"<floors></floors>"+
			"<notes></notes>"+
			"<owner>"+fcustomer+"</owner>" +
			"<owner_type exact='yes'>customer</owner_type>"+
			"<type exact='yes'>facility</type>"+
			"</assets>";

	/////////////////////////////////////////////////////////////////////////
	
	fetch_requested_data('form139',member_columns,function(results)
	{
		results.forEach(function(result)
		{		
			var id=result.id;
			var rowsHTML="<tr>";
			rowsHTML+="<form id='form139_"+id+"'></form>";
				rowsHTML+="<td data-th='Customer'>";
					rowsHTML+="<textarea readonly='readonly' form='form139_"+id+"'>"+result.owner+"</textarea>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Facility'>";
					rowsHTML+="<textarea readonly='readonly' form='form139_"+id+"'>"+result.name+"</textarea>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Location'>";
					rowsHTML+="<textarea readonly='readonly' form='form139_"+id+"'>"+result.location+"</textarea>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Area'>";
					rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form139_"+id+"' value='"+result.area+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Floors'>";
					rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form139_"+id+"' value='"+result.floors+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					rowsHTML+="<input type='hidden' form='form139_"+id+"' value='"+id+"'>";
					rowsHTML+="<input type='submit' class='submit_hidden' form='form139_"+id+"' id='save_form139_"+id+"'>";
					rowsHTML+="<input type='button' class='delete_icon' form='form139_"+id+"' id='delete_form139_"+id+"' onclick='form139_delete_item($(this));'>";
				rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		
			$('#form139_body').append(rowsHTML);
			
			var fields=document.getElementById("form139_"+id);
			
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form139_update_item(fields);
			});
		});
		
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
	
		hide_loader();
	});	
}


/**
 * @form Customer Profiling
 * @formNo 140
 * @Loading light
 */
function form140_ini()
{
	var data_id=$("#form140_link").attr('data_id');
	if(data_id==null)
		data_id="";
	$('#form140_body').html("");

	show_loader();
	
	var filter_fields=document.getElementById('form140_header');
	var fsupplier=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;	
	var flocation=filter_fields.elements[2].value;

	var member_columns="<assets>" +
			"<id>"+data_id+"</id>" +
			"<name></name>" +
			"<type></type>" +
			"<description></description>" +
			"<location>"+flocation+"</location>"+
			"<area></area>"+
			"<floors></floors>"+
			"<notes></notes>"+
			"<owner>"+fsupplier+"</owner>" +
			"<owner_type exact='yes'>supplier</owner_type>"+
			"<type>"+ftype+"</type>"+
			"</assets>";

	/////////////////////////////////////////////////////////////////////////
	
	fetch_requested_data('form140',member_columns,function(results)
	{
		results.forEach(function(result)
		{		
			var rowsHTML="";
			var id=result.id;
			rowsHTML+="<tr>";
			rowsHTML+="<form id='form140_"+id+"'></form>";
				rowsHTML+="<td data-th='Supplier'>";
					rowsHTML+="<textarea readonly='readonly' form='form140_"+id+"'>"+result.owner+"</textarea>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Asset Type'>";
					rowsHTML+="<textarea readonly='readonly' form='form140_"+id+"'>"+result.type+"</textarea>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Description'>";
					rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form140_"+id+"'>"+result.description+"</textarea>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Location'>";
					rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form140_"+id+"'>"+result.location+"</textarea>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Notes'>";
					rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form140_"+id+"'>"+result.notes+"</textarea>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					rowsHTML+="<input type='hidden' form='form140_"+id+"' value='"+id+"'>";
					rowsHTML+="<input type='submit' class='submit_hidden' form='form140_"+id+"' id='save_form140_"+id+"'>";
					rowsHTML+="<input type='button' class='delete_icon' form='form140_"+id+"' id='delete_form140_"+id+"' onclick='form140_delete_item($(this));'>";
				rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		
			$('#form140_body').append(rowsHTML);
			
			var fields=document.getElementById("form140_"+id);
			
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form140_update_item(fields);
			});
		});
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
	
		hide_loader();
	});	
}

/**
 * @form Manage orders (App)
 * @formNo 141
 * @Loading light
 */
function form141_ini()
{
	show_loader();
	var fid=$("#form141_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form141_header');
	
	//populating form 
	if(fid==="")
		fid=filter_fields.elements[0].value;
	var fcustomer=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form141_index');
	var prev_element=document.getElementById('form141_prev');
	var next_element=document.getElementById('form141_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	//var parameter_url="http://orderchhotu.in:8080/order/listoforders?status=approved";
	var parameter_url="http://orderchhotu.in:8080/productbrand";
	var kvp="";
	$('#form141_body').html("");

	ajax_for_app(parameter_url,kvp,function(results)
	{	
		console.log(results);
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form141_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Order No.'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form141_"+result.id+"' value='"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form141_"+result.id+"'>"+result.customer_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Schedule'>";
						rowsHTML+="Order Time: <input type='text' readonly='readonly' form='form141_"+result.id+"' value='"+get_my_past_date(result.order_date)+"'>";
						rowsHTML+="<br>Delivery Time: <input type='text' readonly='readonly' form='form141_"+result.id+"' value='"+get_my_past_date(result.order_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Ninja'>";
						rowsHTML+="Pickup: <input type='text' readonly='readonly' form='form141_"+result.id+"' value='"+get_my_past_date(result.order_date)+"'>";
						rowsHTML+="<br>Delivery: <input type='text' readonly='readonly' form='form141_"+result.id+"' value='"+get_my_past_date(result.order_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form141_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form141_"+result.id+"' title='Edit order' onclick=\"element_display('"+result.id+"','form69');\">";
						rowsHTML+="<input type='submit' class='save_icon' form='form141_"+result.id+"' title='Save order'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form141_"+result.id+"' title='Delete order' onclick='form141_delete_item($(this));'>";
						rowsHTML+="<br><input type='button' class='generic_icon' form='form141_"+result.id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form141_body').append(rowsHTML);
			var fields=document.getElementById("form141_"+result.id);
			var bill_button=fields.elements[7];
			var status_filter=fields.elements[3];
			
			set_static_value_list('sale_orders','status',status_filter);
			
			if(result.status=='pending')
			{
				$(bill_button).attr('value','Create Bill');
				$(bill_button).on('click',function(event)
				{
					form141_bill(result.id);
				});
			}
			else
			{
				$(bill_button).hide();
			}
			
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form141_update_item(fields);
			});
			
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'sale_orders');
		});
		hide_loader();
	});
};


/**
 * @form Create Questionnaire
 * @formNo 142
 * @Loading light
 */
function form142_ini()
{
	var data_id=$("#form142_link").attr('data_id');
	if(data_id==null)
		data_id="";	
	
	$('#form142_body').html("");
	
	if(data_id!="")
	{
		show_loader();
		var struct_columns="<ques_struct>" +
				"<id>"+data_id+"</id>" +
				"<name></name>" +
				"<display_name></display_name>" +
				"<func></func>" +
				"<description></description>" +
				"<status></status>" +
				"</ques_struct>";
		var field_column="<ques_fields>" +
				"<id></id>" +
				"<ques_id exact='yes'>"+data_id+"</ques_id>" +
				"<name></name>" +
				"<display_name></display_name>"+
				"<description></description>" +
				"<type></type>" +
				"<fvalues></fvalues>" +
				"<fcol></fcol>" +
				"<forder></forder>" +
				"<freq></freq>" +
				"</ques_fields>";
	
		fetch_requested_data('',struct_columns,function(struct_results)
		{
			var filter_fields=document.getElementById('form142_master');
			
			for (var i in struct_results)
			{
				filter_fields.elements[1].value=struct_results[i].name;
				filter_fields.elements[2].value=struct_results[i].display_name;
				filter_fields.elements[3].value=struct_results[i].func;
				filter_fields.elements[4].value=struct_results[i].status;
				filter_fields.elements[5].value=struct_results[i].id;
				var save_button=filter_fields.elements[6];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form142_update_form();
				});
						
				break;
			}
		
			fetch_requested_data('',field_column,function(results)
			{				
				results.forEach(function(result)
				{
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form142_"+id+"'></form>";
						rowsHTML+="<td data-th='Name'>";
							rowsHTML+="<textarea readonly='readonly' form='form142_"+id+"'>"+result.display_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Description'>";
							rowsHTML+="<textarea readonly='readonly' form='form142_"+id+"'>"+result.description+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Type'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form142_"+id+"' value='"+result.type+"'>";
							if(result.type=='value list')							
								rowsHTML+="<br>Values: <input type='text' readonly='readonly' form='form142_"+id+"' value='"+result.fvalues+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Order'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form142_"+id+"' value='"+result.forder+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Required'>";
							rowsHTML+="<input type='checkbox' readonly='readonly' form='form142_"+id+"' "+result.freq+">";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form142_"+id+"' value='"+id+"'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form142_body').append(rowsHTML);
					$('textarea').autosize();
				});				
				hide_loader();
			});
		});
	}
}

/**
 * @form Manage Questionnaire
 * @formNo 143
 * @Loading light
 */
function form143_ini()
{
	show_loader();
	var fid=$("#form143_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form143_header');
	
	//populating form 
	if(fid==="")
		fid=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var fdisplay=filter_fields.elements[2].value;
	var fstatus=filter_fields.elements[3].value;
	
	////indexing///
	var index_element=document.getElementById('form143_index');
	var prev_element=document.getElementById('form143_prev');
	var next_element=document.getElementById('form143_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<ques_struct count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<display_name>"+fdisplay+"</display_name>" +
			"<reviewer></reviewer>"+
			"<approver></approver>"+
			"<status>"+fstatus+"</status>" +
			"</ques_struct>";

	$('#form143_body').html("");

	fetch_requested_data('form143',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form143_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Id'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form143_"+result.id+"' value='"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form143_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Display Name'>";
						rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form143_"+result.id+"'>"+result.display_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Workflow'>";
						rowsHTML+="Reviewer: <input type='text' readonly='readonly' class='dblclick_editable' form='form143_"+result.id+"' value='"+result.reviewer+"'>";
						rowsHTML+="<br>Approver: <input type='text' readonly='readonly' class='dblclick_editable' form='form143_"+result.id+"' value='"+result.approver+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form143_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form143_"+result.id+"' title='View Questionnaire'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form143_"+result.id+"' title='Save'>";
					rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form143_body').append(rowsHTML);
			var fields=document.getElementById("form143_"+result.id);
			var reviewer_filter=fields.elements[3];
			var approver_filter=fields.elements[4];
			var edit_button=fields.elements[6];

			var staff_data="<staff>"+
						"<acc_name></acc_name>"+
						"</staff>";
			set_my_value_list(staff_data,reviewer_filter);
			set_my_value_list(staff_data,approver_filter);
			
			$(edit_button).on("click", function(event)
			{
				event.preventDefault();
				element_display(result.id,'form142');
			});
			$(fields).on('submit',function(event)
			{
				event.preventDefault();
				form143_update_item(fields);
			});						
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		
		longPressEditable($('.dblclick_editable'));
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'questionnaires');
		});
		hide_loader();
	});
}


/**
 * @form Project Budgeting
 * @formNo 144
 * @Loading light
 */
function form144_ini()
{
	var filter_fields=document.getElementById('form144_master');
	var project_id=filter_fields.elements[5].value;

	$('#form144_task_body').html("");
	$('#form144_expense_body').html("");
	if(project_id!="")
	{
		show_loader();
		var project_columns="<projects count='1'>" +
				"<id>"+project_id+"</id>" +
				"<name></name>"+
				"<details></details>" +
				"<start_date></start_date>" +
				"<status></status>" +
				"</projects>";
		
		fetch_requested_data('form144',project_columns,function(project_results)
		{
			if(project_results.length>0)
			{
				filter_fields.elements[1].value=project_results[0].name;
				//filter_fields.elements[2].value=project_results[0].details;
				//filter_fields.elements[3].value=project_results[0].status;								
			}
			/////////////project tasks////////////////////
			
			var budget_estimate_filter=filter_fields.elements[2];
			var budget_actual_filter=filter_fields.elements[3];
			budget_actual_filter.value=0;
			
			var task_data="<task_instances>"+
						"<id></id>"+
						"<source exact='yes'>project</source>"+
						"<source_id exact='yes'>"+project_id+"</source_id>"+
						"<name></name>"+
						"<assignee></assignee>"+
						"<status></status>"+
						"<t_due></t_due>"+
						"<est_expense></est_expense>"+
						"<expense></expense>"+
						"<description></description>"+
						"</task_instances>";
			fetch_requested_data('',task_data,function(task_results)
			{		
				var budget_estimate_value=0;
				var	budget_actual_value=0;		
				task_results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form144_task_"+id+"'></form>";
						rowsHTML+="<td data-th='Phase'>";
							rowsHTML+="<textarea readonly='readonly' form='form144_task_"+id+"'>"+result.name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Task'>";
							rowsHTML+="<textarea readonly='readonly' form='form144_task_"+id+"'>"+result.description+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="Estimated: Rs. <input type='number' readonly='readonly' class='dblclick_editable' form='form144_task_"+id+"' value='"+result.est_expense+"'>";
							rowsHTML+="<br>Actual: Rs. <input type='number' readonly='readonly' class='dblclick_editable' form='form144_task_"+id+"' value='"+result.expense+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form144_task_"+id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form144_task_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form144_task_"+id+"' >";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";				
					$('#form144_task_body').append(rowsHTML);
					
					var fields=document.getElementById("form144_task_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form144_update_task(fields);
					});
					budget_estimate_value+=parseFloat(result.est_expense);
					budget_actual_value+=parseFloat(result.expense);
				});
				budget_estimate_filter.value=my_round(budget_estimate_value,2);
				budget_actual_filter.value=parseFloat(budget_actual_filter.value)+my_round(budget_actual_value,2);
				longPressEditable($('.dblclick_editable'));
			});
	
			/////////////project expenses////////////////////
			var expense_data="<expenses>"+
								"<id></id>"+
								"<source exact='yes'>project</source>"+
								"<source_id exact='yes'>"+project_id+"</source_id>"+
								"<person></person>"+
								"<amount></amount>"+
								"<status></status>"+
								"<detail></detail>"+
								"</expenses>";
			fetch_requested_data('',expense_data,function(expense_results)
			{		
				var budget_actual_value=0;		
				expense_results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form144_expense_"+id+"'></form>";
						rowsHTML+="<td data-th='Person'>";
							rowsHTML+="<textarea readonly='readonly' form='form144_expense_"+id+"'>"+result.person+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="Rs. <input type='number' readonly='readonly' form='form144_expense_"+id+"' value='"+result.amount+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Detail'>";
							rowsHTML+="<textarea readonly='readonly' form='form144_expense_"+id+"'>"+result.detail+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form144_expense_"+id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form144_expense_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form144_expense_"+id+"' >";
							rowsHTML+="<input type='button' class='delete_icon' form='form144_expense_"+id+"' id='delete_form144_expense_"+id+"' onclick='form144_delete_expense($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";				
					$('#form144_expense_body').append(rowsHTML);
					
					var fields=document.getElementById("form144_expense_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form144_update_expense(fields);
					});
					budget_actual_value+=parseFloat(result.amount);
				});		
				budget_actual_filter.value=parseFloat(budget_actual_filter.value)+my_round(budget_actual_value,2);		
			});

			hide_loader();
		});
	}
}



/**
 * @form Store movement
 * @formNo 145
 * @Loading light
 */
function form145_ini()
{
	show_loader();
	var fid=$("#form145_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form145_header');
	var fproduct=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form145_index');
	var prev_element=document.getElementById('form145_prev');
	var next_element=document.getElementById('form145_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<store_movement count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<batch>"+fbatch+"</batch>" +
			"<item_name>"+fproduct+"</item_name>" +
			"<quantity></quantity>"+
			"<source></source>"+
			"<target></target>"+
			"<dispatcher></dispatcher>"+
			"<receiver></receiver>"+
			"<status>"+fstatus+"</status>"+
			"<last_updated></last_updated>" +
			"</store_movement>";

	$('#form145_body').html("");

	if_data_read_access('store_movement',function(accessible_data)
	{
		console.log(accessible_data);
		fetch_requested_data('form145',columns,function(results)
		{	
			results.forEach(function(result)
			{
				var read=false;
				var update=false;
				var del=false;
				var access=false;
				for(var x in accessible_data)
				{
					if(accessible_data[x].record_id===result.id || accessible_data[x].record_id=='all')
					{
						if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || result[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
						{
							if(accessible_data[x].access_type=='all')
							{
								read=true;
								update=true;
								del=true;
								access=true;
								break;
							}
							else if(accessible_data[x].access_type=='read')
							{
								read=true;
							}
							else if(accessible_data[x].access_type=='delete')
							{
								del=true;
							}
							else if(accessible_data[x].access_type=='update')
							{
								update=true;
							}
						}
					}
				}

				if(read)
				{
					var rowsHTML="";
						rowsHTML+="<tr>";
							rowsHTML+="<form id='form145_"+result.id+"'></form>";
								rowsHTML+="<td data-th='Product'>";
									rowsHTML+="<textarea readonly='readonly' form='form145_"+result.id+"'>"+result.item_name+"</textarea>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Batch'>";
									rowsHTML+="<input type='text' readonly='readonly' form='form145_"+result.id+"' value='"+result.batch+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Quantity'>";
									rowsHTML+="<input type='number' readonly='readonly' form='form145_"+result.id+"' value='"+result.quantity+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Store'>";
									rowsHTML+="Source: <input type='text' readonly='readonly' form='form145_"+result.id+"' value='"+result.source+"'>";
									rowsHTML+="<br>Target: <input type='text' readonly='readonly' form='form145_"+result.id+"' value='"+result.target+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Status'>";
									rowsHTML+="<input type='text' readonly='readonly' form='form145_"+result.id+"' value='"+result.status+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Action'>";
									rowsHTML+="<input type='hidden' form='form145_"+result.id+"' value='"+result.id+"'>";
							if(update)
							{
									if(result.status!='received')									
										rowsHTML+="<input type='button' class='generic_icon' form='form145_"+result.id+"' value='Cancel' onclick='form145_cancel_item($(this));'>";
									if(result.status=='pending')									
										rowsHTML+="<input type='button' class='generic_icon' form='form145_"+result.id+"' value='Dispatch' onclick='form145_dispatch_item($(this));'>";
									if(result.status=='dispatched')
										rowsHTML+="<input type='button' class='generic_icon' form='form145_"+result.id+"' value='Receive' onclick='form145_receive_item($(this));'>";
							}
								rowsHTML+="</td>";											
					rowsHTML+="</tr>";
						
					$('#form145_body').append(rowsHTML);
					var fields=document.getElementById("form145_"+result.id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
					});
				}
			});
	
			////indexing///
			var next_index=parseInt(start_index)+25;
			var prev_index=parseInt(start_index)-25;
			next_element.setAttribute('data-index',next_index);
			prev_element.setAttribute('data-index',prev_index);
			index_element.setAttribute('data-index','0');
			if(results.length<25)
			{
				$(next_element).hide();
			}
			else
			{
				$(next_element).show();
			}
			if(prev_index<0)
			{
				$(prev_element).hide();
			}
			else
			{
				$(prev_element).show();
			}
			/////////////
	
			longPressEditable($('.dblclick_editable'));
			
			var export_button=filter_fields.elements[4];
			$(export_button).off("click");
			$(export_button).on("click", function(event)
			{
				my_obj_array_to_csv(results,'store_movement');
			});
			hide_loader();
		});
	});
};


/**
 * @form Manufacturing
 * @formNo 146
 * @Loading light
 */
function form146_ini()
{
	show_loader();
	var fid=$("#form146_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form146_header');
	var fname=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form146_index');
	var prev_element=document.getElementById('form146_prev');
	var next_element=document.getElementById('form146_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<manufacturing_schedule count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<product>"+fname+"</product>" +
			"<batch>"+fbatch+"</batch>"+
			"<quantity></quantity>"+
			"<process_notes></process_notes>" +
			"<iteration_notes></iteration_notes>" +
			"<schedule></schedule>" +
			"<status>"+fstatus+"</status>" +
			"<last_updated></last_updated>" +
			"</manufacturing_schedule>";

	$('#form146_body').html("");

	fetch_requested_data('form146',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form146_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Product'>";
						rowsHTML+="<textarea readonly='readonly' form='form146_"+result.id+"'>"+result.product+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+="<textarea readonly='readonly' form='form146_"+result.id+"'>"+result.batch+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form146_"+result.id+"' class='dblclick_editable' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Schedule'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form146_"+result.id+"' class='dblclick_editable' value='"+get_my_datetime(result.schedule)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form146_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form146_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='submit_hidden' form='form146_"+result.id+"'>";
					if(result.status!='completed')					
						rowsHTML+="<input type='button' class='delete_icon' form='form146_"+result.id+"' title='Delete' onclick='form146_delete_item($(this));'>";
					if(result.status=='scheduled')
						rowsHTML+="<input type='button' class='generic_icon' form='form146_"+result.id+"' value='Completed' onclick='modal110_action($(this));'>";
					if(result.status!='completed' && result.status!='suspended')
						rowsHTML+="<input type='button' class='generic_icon' form='form146_"+result.id+"' value='Suspend' onclick='form146_suspend_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		
			$('#form146_body').append(rowsHTML);

			var fields=document.getElementById("form146_"+result.id);
			var schedule_filter=fields.elements[3];			
			$(schedule_filter).datetimepicker();
			
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form146_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'manufacturing_schedule');
		});
		hide_loader();
	});	
};

/**
 * @form Manage Roles
 * @formNo 147
 * @Loading light
 */
function form147_ini()
{
	show_loader();
	var fid=$("#form147_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form147_header');
	var frole=filter_fields.elements[0].value;
	var fstatus=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form147_index');
	var prev_element=document.getElementById('form147_prev');
	var next_element=document.getElementById('form147_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<roles count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<role_name>"+frole+"</role_name>" +
			"<description></description>" +
			"<status>"+fstatus+"</status>" +
			"</roles>";

	$('#form147_body').html("");

	fetch_requested_data('form147',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form147_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Role'>";
						rowsHTML+="<textarea readonly='readonly' form='form147_"+result.id+"'>"+result.role_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Description'>";
						rowsHTML+="<textarea readonly='readonly' form='form147_"+result.id+"' class='dblclick_editable'>"+result.description+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form147_"+result.id+"' class='dblclick_editable' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form147_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form147_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form147_"+result.id+"' title='Delete' onclick='form147_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		
			$('#form147_body').append(rowsHTML);

			var fields=document.getElementById("form147_"+result.id);
			
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form147_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'roles');
		});
		hide_loader();
	});	
};

/**
 * @form Create Roles
 * @formNo 148
 * @Loading light
 */
function form148_ini()
{
	var header_fields=document.getElementById('form148_master');
	header_fields.elements[2].value="";
	header_fields.elements[3].value='';
	
	$('#form148_body').html("");

	var	fuser=header_fields.elements[1].value;
	if(fuser!="")
	{
		show_loader();
		var user_name_columns="<accounts>" +
				"<id></id>" +
				"<username exact='yes'>"+fuser+"</username>" +
				"</accounts>";
		get_single_column_data(function(user_results)
		{
			if(user_results.length>0)
				header_fields.elements[4].value=user_results[0];
		},user_name_columns);
		
		var columns="<access_control>" +
				"<id></id>" +
				"<username exact='yes'>"+fuser+"</username>" +
				"<element_id></element_id>" +
				"<element_name></element_name>" +
				"<status>active</status>" +
				"<re></re>" +
				"<cr></cr>" +
				"<up></up>" +
				"<del></del>" +
				"</access_control>";
		
		fetch_requested_data('form148',columns,function(results)
		{
			if(results.length==0)
			{
				//console.log('new user');
				var elements_name="<access_control>" +
							"<id></id>" +
							"<element_id></element_id>"+
							"<element_name></element_name>"+
							"<status exact='yes'>active</status>"+
							"<username exact='yes'>master</username>"+
							"</access_control>";
				
				fetch_requested_data('form148',elements_name,function(elements)
				{
					//console.log('elements found for new user');
					elements.forEach(function(element)
					{
						var data_id=get_new_key();
						var rowsHTML="";
						rowsHTML+="<tr>";
							rowsHTML+="<form id='form148_"+data_id+"'></form>";
								rowsHTML+="<td data-th='Name'>";
									rowsHTML+="<textarea readonly='readonly' form='form148_"+data_id+"' data-i18n='form."+element.element_name+"'></textarea>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Read'>";
									rowsHTML+="<input type='checkbox' form='form148_"+data_id+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Create'>";
								rowsHTML+="<input type='checkbox' form='form148_"+data_id+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Update'>";
									rowsHTML+="<input type='checkbox' form='form148_"+data_id+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Delete'>";
									rowsHTML+="<input type='checkbox' form='form148_"+data_id+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Action'>";
									rowsHTML+="<input type='hidden' form='form148_"+data_id+"' value='"+data_id+"'>";
									rowsHTML+="<input type='hidden' form='form148_"+data_id+"' value='"+element.element_id+"'>";
									rowsHTML+="<input type='submit' class='save_icon' id='save_form148_"+data_id+"' form='form148_"+data_id+"'>";	
								rowsHTML+="</td>";			
						rowsHTML+="</tr>";
						
						$('#form148_body').append(rowsHTML);
						var fields=document.getElementById("form148_"+data_id);
						$(fields).on("submit", function(event)
						{
							event.preventDefault();
							form148_create_item(fields);
						});

					});
					$('textarea').autosize();
					
					$('#form148_body').find('textarea').i18n();
					hide_loader();
				});
			}
			
			results.forEach(function(result)
			{
				var rowsHTML="";
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form148_"+result.id+"'></form>";
						rowsHTML+="<td data-th='Name'>";
							rowsHTML+="<textarea readonly='readonly' form='form148_"+result.id+"' data-i18n='form."+result.element_name+"'></textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Read'>";
							rowsHTML+="<input type='checkbox' form='form148_"+result.id+"' "+result.re+">";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Create'>";
						rowsHTML+="<input type='checkbox' form='form148_"+result.id+"' "+result.cr+">";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Update'>";
							rowsHTML+="<input type='checkbox' form='form148_"+result.id+"' "+result.up+">";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Delete'>";
							rowsHTML+="<input type='checkbox' form='form148_"+result.id+"' "+result.del+">";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form148_"+result.id+"' value='"+result.id+"'>";
							rowsHTML+="<input type='hidden' form='form148_"+result.id+"' value='"+result.element_id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' id='save_form148_"+result.id+"' form='form148_"+result.id+"' value='saved'>";	
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
				
				$('#form148_body').append(rowsHTML);
				var fields=document.getElementById("form148_"+result.id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form148_update_item(fields);
				});
				hide_loader();
			});
			$('textarea').autosize();
			
			$('#form148_body').find('textarea').i18n();
		});
	}
	else
	{
		$('#form148_body').html("");
	}
};

/**
 * @form Assign Roles
 * @formNo 149
 * @Loading light
 */
function form149_ini()
{
	show_loader();
	var fid=$("#form149_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form149_header');
	var frole=filter_fields.elements[0].value;
	var fuser=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form149_index');
	var prev_element=document.getElementById('form149_prev');
	var next_element=document.getElementById('form149_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<user_role_mapping count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<role_name>"+frole+"</role_name>" +
			"<username>"+fuser+"</username>" +
			"<status>"+fstatus+"</status>" +
			"</user_role_mapping>";

	$('#form149_body').html("");

	fetch_requested_data('form149',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form149_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Role'>";
						rowsHTML+="<textarea readonly='readonly' form='form149_"+result.id+"'>"+result.role_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Username'>";
						rowsHTML+="<textarea readonly='readonly' form='form149_"+result.id+"'>"+result.username+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form149_"+result.id+"' class='dblclick_editable' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form149_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form149_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form149_"+result.id+"' title='Delete' onclick='form149_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		
			$('#form149_body').append(rowsHTML);

			var fields=document.getElementById("form149_"+result.id);
			
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form149_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'user_role_mapping');
		});
		hide_loader();
	});	
};

/**
 * @form Project Feeds
 * @formNo 150
 * @Loading light
 */
function form150_ini()
{
	$('#form150_body').html("");
	
	show_loader();
	var account_name=get_account_name();	
	var member_columns="<project_team>" +
				"<project_id></project_id>"+
				"<status exact='yes'>active</status>" +
				"<member exact='yes'>"+account_name+"</member>"+
				"</project_team>";
	get_single_column_data(function(member_results)
	{
		var project_id_string="--";
		for (var i in member_results) 
		{
			project_id_string+=member_results[i]+"--";
		}
		
		var feed_columns="<feeds>"+
						"<id></id>"+
						"<content_type></content_type>"+
						"<content_title></content_title>"+
                        "<content_detail></content_detail>"+
                        "<content_blob></content_blob>"+
                        "<content_url></content_url>"+
						"<status exact='yes'>visible</status>"+                        
                        "<source exact='yes'>project</source>"+
                        "<source_id array='yes'>"+project_id_string+"</source_id>"+
                        "<target_user></target_user>"+
                        "<owner></owner>"+
						"</feeds>";
		
		fetch_requested_data('form150',feed_columns,function(feed_results)
		{
			feed_results.forEach(function (feed_result) 
			{
				var feed_content="<div class='feed_item'>"+
								"<br><div class='feed_title'>"+feed_result.content_title+
								" <a class='small_cross_icon' onclick=\"delete_feed('"+feed_result.id+"',$(this));\" title='Delete post'>&#10006;</a></div>"+
								"<br><div class='feed_detail'>"+feed_result.content_detail+"</div>"+
								"<br><div id='form150_likes_"+feed_result.id+"' class='feed_likes'></div>"+								
								"<br><div id='form150_comments_"+feed_result.id+"' class='feed_comments'></div>"+
								"</div>";
												
				$('#form150_body').append(feed_content);
								
				var like_columns="<feed_likes>"+
								"<person></person>"+
								"<feed_id exact='yes'>"+feed_result.id+"</feed_id>"+
								"</feed_likes>";
				get_single_column_data(function (like_results) 
				{
					var liked=false;
					for(var i in like_results)
					{
						if(like_results[i]==account_name)
						{	
							liked=true;
							break;
						}
					}
					if(liked)
					{
						var likes_content="<img src='../images/thumbs_up.png' class='thumbs_icon' onclick=\"dislike_feed('"+feed_result.id+"',$(this))\"> <b id='form150_likes_count_"+feed_result.id+"'>"+like_results.length+"</b> likes";
					}
					else 
					{
						var likes_content="<img src='../images/thumbs_up_line.png' class='thumbs_icon' onclick=\"like_feed('"+feed_result.id+"',$(this))\"> <b id='form150_likes_count_"+feed_result.id+"'>"+like_results.length+"</b> likes";
					}
					$('#form150_likes_'+feed_result.id).html(likes_content);
				},like_columns);

				var comment_columns="<feed_comments>"+
									"<id></id>"+
									"<comment_text></comment_text>"+
									"<person></person>"+
									"<feed_id exact='yes'>"+feed_result.id+"</feed_id>"+
									"</feed_comments>";

				fetch_requested_data('form150',comment_columns,function(comment_results)
				{					
					var comments_content="";
					for(var i in comment_results)
					{
						var delete_right=get_account_name();
						var comments_content_item="<label>"+comment_results[i].person+": "+comment_results[i].comment_text;
						if(feed_result.owner==delete_right || comment_results[i].person==delete_right)
						{
							comments_content_item+=" <a class='small_cross_icon' onclick=\"delete_feed_comment('"+comment_results[i].id+"',$(this));\" title='Delete comment'>&#10006;</a>";
						}
						comments_content_item+="</label><br>";
						comments_content=comments_content_item+comments_content;
					}
					comments_content+="<label>"+account_name+": <textarea class='feed_comments' placeholder='comment..'></textarea></label>";
					$('#form150_comments_'+feed_result.id).html(comments_content);
					$('#form150_comments_'+feed_result.id).find('label').find('textarea').on('keyup',function(e)
					{
						if (e.keyCode==13) 
						{
							create_feed_comment(feed_result.id,this);
						}
					});
				});
			});

			hide_loader();
		});
		
	},member_columns);	
}


/**
 * @form Service Request - Billing
 * @formNo 151
 * @Loading light
 */
function form151_ini()
{
	var filter_fields=document.getElementById('form151_master');
	var request_id=filter_fields.elements[1].value;
	
	$('#form151_task_body').html("");
	$('#form151_item_body').html("");
	$('#form151_expense_body').html("");	
	
	if(request_id!="")
	{
		show_loader();
		var request_columns="<service_requests>" +
				"<id>"+request_id+"</id>" +
				"<customer></customer>"+
				"<reported_by></reported_by>" +
				"<notes></notes>" +
				"<problem_type></problem_type>" +
				"<closing_notes></closing_notes>" +
				"<reported_time></reported_time>" +
				"<status></status>" +
				"</service_requests>";
	
		fetch_requested_data('form151',request_columns,function(request_results)
		{
			var filter_fields=document.getElementById('form151_master');
			filter_fields.elements[3].value="0";
			filter_fields.elements[4].value="0";

			if(request_results.length>0)
			{
				filter_fields.elements[1].value=request_results[0].id;
				filter_fields.elements[2].value=request_results[0].customer;
			}
			
			/////////////service request tasks////////////////////
			var task_data="<task_instances>"+
								"<id></id>"+
								"<source exact='yes'>service request</source>"+
								"<source_id exact='yes'>"+request_id+"</source_id>"+
								"<name></name>"+
								"<assignee></assignee>"+
								"<status></status>"+
								"<t_due></t_due>"+
								"<est_expense></est_expense>"+
								"<expense></expense>"+
								"<description></description>"+
								"</task_instances>";

			fetch_requested_data('',task_data,function(task_results)
			{
				var est_amount=0;
				var amount=0;
				task_results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form151_task_"+id+"'></form>";
						rowsHTML+="<td data-th='Task'>";
							rowsHTML+="<textarea readonly='readonly' form='form151_task_"+id+"'>"+result.description+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Est. Amount'>";
							rowsHTML+="Rs. <input type='number' readonly='readonly' class='dblclick_editable' form='form151_task_"+id+"' value='"+result.est_expense+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Actual Amount'>";
							rowsHTML+="Rs. <input type='number' readonly='readonly' class='dblclick_editable' form='form151_task_"+id+"' value='"+result.expense+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form151_task_"+id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form151_task_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form151_task_"+id+"' id='delete_form151_task_"+id+"' onclick='form151_delete_task($(this));'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form151_task_"+id+"' >";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					$('#form151_task_body').append(rowsHTML);
					est_amount+=parseFloat(result.est_expense);
					amount+=parseFloat(result.expense);
					var fields=document.getElementById("form151_task_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form151_update_task(fields);
					});
				});
				longPressEditable($('.dblclick_editable'));
				filter_fields.elements[3].value=parseFloat(filter_fields.elements[3].value)+est_amount;
				filter_fields.elements[4].value=parseFloat(filter_fields.elements[4].value)+amount;
			});


			/////////////service request items////////////////////
			var item_data="<service_request_items>"+
								"<id></id>"+
								"<request_id exact='yes'>"+request_id+"</request_id>"+
								"<item_name></item_name>"+
								"<est_amount></est_amount>"+
								"<amount></amount>"+
								"<quantity></quantity>"+
								"<status></status>"+
								"</service_request_items>";
			fetch_requested_data('',item_data,function(item_results)
			{
				var est_amount=0;
				var amount=0;
				item_results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form151_item_"+id+"'></form>";
						rowsHTML+="<td data-th='Item Name'>";
							rowsHTML+="<textarea readonly='readonly' form='form151_item_"+id+"'>"+result.item_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form151_item_"+id+"' value='"+result.quantity+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="Estimated: Rs. <input type='number' readonly='readonly' form='form151_item_"+id+"' value='"+result.est_amount+"'>";
							rowsHTML+="<br>Actual: Rs. <input type='number' readonly='readonly' class='dblclick_editable' form='form151_item_"+id+"' value='"+result.amount+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form151_item_"+id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form151_item_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form151_item_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form151_item_"+id+"' id='delete_form151_item_"+id+"' onclick='form151_delete_item($(this));'>";
						if(result.status=='requested')							
							rowsHTML+="<br><input type='button' class='generic_icon' value='Approve' form='form151_item_"+id+"' id='approve_form151_item_"+id+"' onclick=\"form151_approve_item($(this));\">";
						if(result.status=='approved')
							rowsHTML+="<br><input type='button' class='generic_icon' value='Use' form='form151_item_"+id+"' id='approve_form151_item_"+id+"' onclick=\"form151_approve_item($(this));\">";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";

					$('#form151_item_body').append(rowsHTML);
					est_amount+=parseFloat(result.est_amount);
					amount+=parseFloat(result.amount);
					var fields=document.getElementById("form151_item_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form151_update_item(fields);
					});
				});				
				longPressEditable($('.dblclick_editable'));
				filter_fields.elements[3].value=parseFloat(filter_fields.elements[3].value)+est_amount;
				filter_fields.elements[4].value=parseFloat(filter_fields.elements[4].value)+amount;
			});
			

			/////////////service request expenses////////////////////
			var expense_data="<expenses>"+
								"<id></id>"+
								"<source exact='yes'>service request</source>"+
								"<source_id exact='yes'>"+request_id+"</source_id>"+
								"<person></person>"+
								"<amount></amount>"+
								"<status></status>"+
								"<detail></detail>"+
								"</expenses>";
			fetch_requested_data('',expense_data,function(expense_results)
			{	
				var amount=0;			
				expense_results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form151_expense_"+id+"'></form>";
						rowsHTML+="<td data-th='Person'>";
							rowsHTML+="<textarea readonly='readonly' form='form151_expense_"+id+"'>"+result.person+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="Rs. <input type='number' readonly='readonly' form='form151_expense_"+id+"' value='"+result.amount+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Detail'>";
							rowsHTML+="<textarea readonly='readonly' form='form151_expense_"+id+"'>"+result.detail+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form151_expense_"+id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form151_expense_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form151_expense_"+id+"' id='delete_form151_expense_"+id+"' onclick='form151_delete_expense($(this));'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form151_expense_"+id+"'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";				
					$('#form151_expense_body').append(rowsHTML);
					amount+=parseFloat(result.amount);
					var fields=document.getElementById("form151_expense_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form151_update_expense(fields);
					});
				});
				longPressEditable($('.dblclick_editable'));
				filter_fields.elements[4].value=parseFloat(filter_fields.elements[4].value)+amount;
			});			
			hide_loader();
		});
	}
}

/**
 * @form Manage Quotation
 * @formNo 152
 * @Loading light
 */
function form152_ini()
{
	show_loader();
	var fid=$("#form152_link").attr('data_id');
	
	var filter_fields=document.getElementById('form152_header');
	
	//populating form
	if(fid==null)
		fid=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var fname=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form152_index');
	var prev_element=document.getElementById('form152_prev');
	var next_element=document.getElementById('form152_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<quotation count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<customer>"+fname+"</customer>" +
			"<date></date>" +
			"<total></total>" +
			"<type></type>" +
			"<billing_type>"+ftype+"</billing_type>" +
			"<status></status>"+
			"<last_updated></last_updated>" +
			"</quotation>";

	$('#form152_body').html("");

	if_data_read_access('quotation',function(accessible_data)
	{
		fetch_requested_data('form152',columns,function(results)
		{	
			results.forEach(function(result)
			{
				var read=false;
				var update=false;
				var del=false;
				var access=false;
				for(var x in accessible_data)
				{
					if(accessible_data[x].record_id===result.id || accessible_data[x].record_id=='all')
					{
						if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || result[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
						{
							if(accessible_data[x].access_type=='all')
							{
								read=true;
								update=true;
								del=true;
								access=true;
								break;
							}
							else if(accessible_data[x].access_type=='read')
							{
								read=true;
							}
							else if(accessible_data[x].access_type=='delete')
							{
								del=true;
							}
							else if(accessible_data[x].access_type=='update')
							{
								update=true;
							}
						}
					}
				}

				if(read)
				{
					var rowsHTML="";
					rowsHTML+="<tr>";
						rowsHTML+="<form id='form152_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Id'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form152_"+result.id+"' value='"+result.id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Type'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form152_"+result.id+"' value='"+result.billing_type+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Customer'>";
								rowsHTML+="<textarea readonly='readonly' form='form152_"+result.id+"'>"+result.customer+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Date'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form152_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Amount'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form152_"+result.id+"' value='"+result.total+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='button' class='edit_icon' form='form152_"+result.id+"' title='Edit Quotation'>";
								rowsHTML+="<input type='button' class='delete_icon' form='form152_"+result.id+"' title='Delete Quotation' onclick='form152_delete_item($(this));'>";
							if(result.status=='generated' && update)
							{
								rowsHTML+="<br><input type='button' class='generic_icon' form='form152_"+result.id+"' value='Approve' onclick='form152_approve_item($(this));'>";
								rowsHTML+="<br><input type='button' class='generic_icon' form='form152_"+result.id+"' value='Reject' onclick='form152_reject_item($(this));'>";
							}					
							else if(result.status=='approved')
								rowsHTML+="<input type='button' class='generic_icon' form='form152_"+result.id+"' value='Approved'>";
							else if(result.status=='rejected')
								rowsHTML+="<input type='button' class='generic_icon' form='form152_"+result.id+"' value='Rejected'>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form152_body').append(rowsHTML);
					var fields=document.getElementById("form152_"+result.id);
					var edit_button=fields.elements[5];
					$(edit_button).on("click", function(event)
					{
						event.preventDefault();
						element_display(result.id,'form153');
					});
				}
			});
			
			////indexing///
			var next_index=parseInt(start_index)+25;
			var prev_index=parseInt(start_index)-25;
			next_element.setAttribute('data-index',next_index);
			prev_element.setAttribute('data-index',prev_index);
			index_element.setAttribute('data-index','0');
			if(results.length<25)
			{
				$(next_element).hide();
			}
			else
			{
				$(next_element).show();
			}
			if(prev_index<0)
			{
				$(prev_element).hide();
			}
			else
			{
				$(prev_element).show();
			}
			/////////////
	
			$('textarea').autosize();
			
			var export_button=filter_fields.elements[3];
			$(export_button).off("click");
			$(export_button).on("click", function(event)
			{
				my_obj_array_to_csv(results,'Quotations');
			});
			hide_loader();
		});
	});
}


/**
 * @form Prepare Quotations
 * @formNo 153
 * @Loading light
 */
function form153_ini()
{
	var quot_id=$("#form153_link").attr('data_id');
	if(quot_id==null)
		quot_id="";	
	
	$('#form153_body').html("");
	$('#form153_foot').html("");
	document.getElementById('form153_customer_info').innerHTML="";
	
	if(quot_id!="")
	{
		show_loader();
		var quot_columns="<quotation>" +
				"<id>"+quot_id+"</id>" +
				"<customer></customer>" +
				"<total></total>" +
				"<date></date>" +
				"<amount></amount>" +
				"<discount></discount>" +
				"<tax></tax>" +
				"<offer></offer>" +
				"<billing_type></billing_type>" +
				"<intro_notes></intro_notes>"+
				"</quotation>";
		var quot_items_column="<quotation_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<description></description>"+
				"<unit_price></unit_price>" +
				"<unit></unit>" +
				"<quantity></quantity>" +
				"<amount></amount>" +
				"<total></total>" +
				"<discount></discount>" +
				"<offer></offer>" +
				"<type></type>" +
				"<quotation_id exact='yes'>"+quot_id+"</quotation_id>" +
				"<tax></tax>" +
				"</quotation_items>";
	
		////separate fetch function to get quotation details like customer name, total etc.
		fetch_requested_data('',quot_columns,function(quot_results)
		{
			var filter_fields=document.getElementById('form153_master');
			
			for (var i in quot_results)
			{
				filter_fields.elements[1].value=quot_results[i].customer;
				filter_fields.elements[2].value=quot_results[i].billing_type;
				filter_fields.elements[3].value=get_my_past_date(quot_results[i].date);
				filter_fields.elements[4].value=quot_results[i].intro_notes;								
				filter_fields.elements[5].value=quot_id;				
				filter_fields.elements[6].value=quot_results[i].offer;
				var save_button=filter_fields.elements[7];
				
				var address_data="<customers>" +
						"<address></address>" +
						"<city></city>" +
						"<acc_name exact='yes'>"+quot_results[i].customer+"</acc_name>" +
						"</customers>";
				fetch_requested_data('',address_data,function(addresses)
				{
					var address_string="";
					if(addresses.length>0)
					{
						address_string+=addresses[i].address+", "+addresses[i].city;
					}
					document.getElementById('form153_customer_info').innerHTML="Address<br>"+address_string;
				});
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form153_update_form();
				});

				var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
							"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
							"<td>Rs. "+quot_results[i].amount+"</br>" +
							"Rs. <input type='number' value='"+quot_results[i].discount+"' step='any' id='form153_discount' class='dblclick_editable'></br>" +
							"Rs. "+quot_results[i].tax+"</br>" +
							"Rs. "+quot_results[i].total+"</td>" +
							"<td></td>" +
							"</tr>";
				$('#form153_foot').html(total_row);
				longPressEditable($('.dblclick_editable'));

				break;
			}
		
			fetch_requested_data('',quot_items_column,function(results)
			{
				var hiring=false;
				if(filter_fields.elements[2].value=='Hiring')
				{	hiring=true;  }
				
				results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form153_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<textarea readonly='readonly' form='form153_"+id+"'>"+result.item_name+"</textarea>";
							rowsHTML+="<br><textarea readonly='readonly' form='form153_"+id+"'>"+result.description+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form153_"+id+"' value='"+result.quantity+"'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form153_"+id+"' value='"+result.unit+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Unit Price'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form153_"+id+"' value='"+result.unit_price+"' step='any'>";
						if(hiring)
						{	rowsHTML+="/day";  }	
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form153_"+id+"' value='"+result.amount+"'>";
						if(hiring)
						{	rowsHTML+="/day";  }	
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form153_"+id+"' value='"+result.total+"'>";
							rowsHTML+="<input type='hidden' form='form153_"+id+"' value='"+result.discount+"'>";
							rowsHTML+="<input type='hidden' form='form153_"+id+"' value='"+result.tax+"'>";
							rowsHTML+="<input type='hidden' form='form153_"+id+"' value='"+result.offer+"'>";
							rowsHTML+="<input type='hidden' form='form153_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='submit_hidden' form='form153_"+id+"' id='save_form153_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form153_"+id+"' id='delete_form153_"+id+"' onclick='form153_delete_item($(this));'>";
							rowsHTML+="<input type='hidden' form='form153_"+id+"'>";
							rowsHTML+="<input type='hidden' form='form153_"+id+"'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form153_body').append(rowsHTML);
					
					var fields=document.getElementById("form153_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
					});
				});
				
				hide_loader();
			});
		});
	}
}

/**
 * @form Create Bills (DLM)
 * @formNo 154
 * @Loading light
 */
function form154_ini()
{
	var bill_id=$("#form154_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form154_body').html("");
	$('#form154_foot').html("");
	document.getElementById('form154_customer_info').innerHTML="";
	
	if(bill_id!="")
	{
		show_loader();
		var bill_columns="<bills>" +
				"<id>"+bill_id+"</id>" +
				"<bill_num></bill_num>"+
				"<customer_name></customer_name>" +
				"<total></total>" +
				"<bill_date></bill_date>" +
				"<amount></amount>" +
				"<discount></discount>" +
				"<cartage></cartage>"+
				"<tax></tax>" +
				"<billing_type></billing_type>" +
				"<type></type>" +
				"<transaction_id></transaction_id>" +
				"<storage></storage>"+
				"</bills>";
		var bill_items_column="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<unit_price></unit_price>" +
				"<quantity></quantity>" +
				"<amount></amount>" +
				"<total></total>" +
				"<discount></discount>" +
				"<type></type>" +
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
				"<tax></tax>" +
				"<from_date></from_date>"+
				"<to_date></to_date>"+
				"</bill_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			var filter_fields=document.getElementById('form154_master');
			var hiring=false;
				
			for (var i in bill_results)
			{
				filter_fields.elements[1].value=bill_results[i].customer_name;
				filter_fields.elements[2].value=bill_results[i].billing_type;
				filter_fields.elements[3].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements[4].value=bill_results[i].bill_num;
				filter_fields.elements[5].value=bill_results[i].storage;
				filter_fields.elements[6].value=bill_id;				
				filter_fields.elements[7].value=bill_results[i].transaction_id;
				var save_button=filter_fields.elements[8];
				filter_fields.elements[2].setAttribute('readonly','readonly');
				filter_fields.elements[5].setAttribute('readonly','readonly');
				
				if(filter_fields.elements[2].value=='Hiring')
					hiring=true;
			
				var address_data="<customers>" +
						"<address></address>" +
						"<city></city>" +
						"<acc_name exact='yes'>"+bill_results[i].customer_name+"</acc_name>" +
						"</customers>";
				fetch_requested_data('',address_data,function(addresses)
				{
					var address_string="";
					if(addresses.length>0)
					{
						address_string+=addresses[i].address+", "+addresses[i].city;
					}
					document.getElementById('form154_customer_info').innerHTML="Address<br>"+address_string;
				});
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form154_update_form();
				});

				var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
							"<td>Amount:<br>Discount: <br>Tax: <br>Cartage: <br>Total: </td>" +
							"<td>Rs. "+bill_results[i].amount+"</br>" +
							"Rs. <input type='number' value='"+bill_results[i].discount+"' step='any' id='form154_discount' class='dblclick_editable'></br>" +
							"Rs. "+bill_results[i].tax+"</br>" +
							"Rs. <input type='number' value='"+bill_results[i].cartage+"' step='any' id='form154_cartage' class='dblclick_editable'></br>" +
							"Rs. "+bill_results[i].total+"</td>" +
							"<td></td>" +
							"</tr>";
				
				var headHTML="<tr><form id='form154_header'></form>"+
							"<th>Item</th>"+
							"<th>Quantity</th>"+
							"<th>Rate</th>"+
							"<th>Amount</th>"+
							"<th><input type='button' title='Add Service' class='add_icon' onclick='form154_add_service();'></th>"+
							"</tr>";
					
				if(hiring)
				{				
					total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Amount:<br>Discount: <br>Tax: <br>Cartage: <br>Total: </td>" +
							"<td>Rs. "+bill_results[i].amount+"</br>" +
							"Rs. <input type='number' value='"+bill_results[i].discount+"' step='any' id='form154_discount' class='dblclick_editable'></br>" +
							"Rs. "+bill_results[i].tax+"</br>" +
							"Rs. <input type='number' value='"+bill_results[i].cartage+"' step='any' id='form154_cartage' class='dblclick_editable'></br>" +
							"Rs. "+bill_results[i].total+"</td>" +
							"<td></td>" +
							"</tr>";
							
					headHTML="<tr><form id='form154_header'></form>"+
							"<th>Item</th>"+
							"<th>Quantity</th>"+
							"<th>Date</th>"+
							"<th>Rate</th>"+
							"<th>Amount</th>"+
							"<th><input type='button' title='Add Product' class='add_icon' onclick='form154_add_product();'></th>"+
							"</tr>";
								
				}
				else if(filter_fields.elements[2].value=='Retail')
				{
					headHTML="<tr><form id='form154_header'></form>"+
							"<th>Item</th>"+
							"<th>Quantity</th>"+
							"<th>Rate</th>"+
							"<th>Amount</th>"+
							"<th><input type='button' title='Add Product' class='add_icon' onclick='form154_add_product();'></th>"+
							"</tr>";
				}
				else
				{
						$(filter_fields).off('submit');
						$(filter_fields).on("submit", function(event)
						{
							event.preventDefault();
							form154_add_service();
						});
		
				}
				
				$('#form154_head').html(headHTML);				
				$('#form154_foot').html(total_row);
				longPressEditable($('.dblclick_editable'));

				break;
			}
		
			fetch_requested_data('',bill_items_column,function(results)
			{
				if(hiring)
				{
					results.forEach(function(result)
					{
						var id=result.id;
						var days=((parseFloat(result.to_date)-parseFloat(result.from_date))/86400000)+1;
						var rowsHTML="<tr>";
						rowsHTML+="<form id='form154_"+id+"'></form>";
							rowsHTML+="<td data-th='Item'>";
								rowsHTML+="<textarea readonly='readonly' form='form154_"+id+"'>"+result.item_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Quantity'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form154_"+id+"' value='"+result.quantity+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Date'>";
								rowsHTML+="From: <f1><input type='text' readonly='readonly' form='form154_"+id+"' value='"+get_my_past_date(result.from_date)+"'></f1>";
								rowsHTML+="<br>To:<f1> <input type='text' readonly='readonly' form='form154_"+id+"' value='"+get_my_past_date(result.to_date)+"'></f1>";
								rowsHTML+="<br> <f1><input type='number' readonly='readonly' form='form154_"+id+"' value='"+days+"'> days</f1>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Rate'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form154_"+id+"' value='"+result.unit_price+"' step='any'> /day";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Amount'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form154_"+id+"' value='"+result.amount+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form154_"+id+"' value='"+result.total+"'>";
								rowsHTML+="<input type='hidden' form='form154_"+id+"' value='"+result.discount+"'>";
								rowsHTML+="<input type='hidden' form='form154_"+id+"' value='"+result.tax+"'>";
								rowsHTML+="<input type='hidden' form='form154_"+id+"' value='"+id+"'>";
								rowsHTML+="<input type='button' class='submit_hidden' form='form154_"+id+"' id='save_form154_"+id+"'>";
								rowsHTML+="<input type='button' class='delete_icon' form='form154_"+id+"' id='delete_form154_"+id+"' onclick='form154_delete_hiring_item($(this));'>";
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
					
						$('#form154_body').append(rowsHTML);
					});
				}
				else
				{
					results.forEach(function(result)
					{
						var id=result.id;
						var rowsHTML="<tr>";
						rowsHTML+="<form id='form154_"+id+"'></form>";
							rowsHTML+="<td data-th='Item'>";
								rowsHTML+="<textarea readonly='readonly' form='form154_"+id+"'>"+result.item_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Quantity'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form154_"+id+"' value='"+result.quantity+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Rate'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form154_"+id+"' value='"+result.unit_price+"' step='any'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Amount'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form154_"+id+"' value='"+result.amount+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form154_"+id+"' value='"+result.total+"'>";
								rowsHTML+="<input type='hidden' form='form154_"+id+"' value='"+result.discount+"'>";
								rowsHTML+="<input type='hidden' form='form154_"+id+"' value='"+result.tax+"'>";
								rowsHTML+="<input type='hidden' form='form154_"+id+"' value='"+id+"'>";
								rowsHTML+="<input type='button' class='submit_hidden' form='form154_"+id+"' id='save_form154_"+id+"'>";
								rowsHTML+="<input type='button' class='delete_icon' form='form154_"+id+"' id='delete_form154_"+id+"' onclick='form154_delete_item($(this));'>";
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
					
						$('#form154_body').append(rowsHTML);
						
					});
				}	
				hide_loader();
			});
		});
	}
}

/**
 * @form Update Inventory (DLM)
 * @formNo 155
 * @Loading heavy
 */
function form155_ini()
{
	show_loader();
	var fid=$("#form155_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form155_header');
	
	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form155_index');
	var prev_element=document.getElementById('form155_prev');
	var next_element=document.getElementById('form155_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	
	var columns="<product_instances count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<product_name>"+fname+"</product_name>" +
		"<cost_price></cost_price>" +
		"<sale_price></sale_price>" +
		"</product_instances>";

	$('#form155_body').html("");
	
	fetch_requested_data('form155',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form155_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form155_"+result.id+"'>"+result.product_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Cost price'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form155_"+result.id+"' class='dblclick_editable' value='"+result.cost_price+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Sale price'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form155_"+result.id+"' value='"+result.sale_price+"'>";
						rowsHTML+="<img src='./images/edit.png' class='edit_icon' onclick=\"modal38_action('"+result.id+"','"+result.sale_price+"');\">";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="System: <input type='number' step='any' readonly='readonly' form='form155_"+result.id+"'>";
						rowsHTML+="</br>Available: <input type='number' step='any' readonly='readonly' form='form155_"+result.id+"' class='dblclick_editable'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form155_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' title='Update and adjust' form='form155_"+result.id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form155_body').append(rowsHTML);
			var fields=document.getElementById("form155_"+result.id);
			var sys_inventory=fields.elements[3];
			var actual_inventory=fields.elements[4];
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form155_update_item(fields);
			});
			
			get_inventory(result.product_name,'',function(inventory)
			{
				sys_inventory.value=inventory;
			});
			
			var inventory_data="<bill_items type='sub'>"+
								"<quantity></quantity>"+
								"<hired exact='yes'>yes</hired>"+
								"<from_date upperbound='yes'>"+get_my_time()+"</from_date>"+
								"<to_date lowerbound='yes'>"+(parseFloat(get_my_time())+86400000)+"</to_date>"+
								"<item_name exact='yes'>"+result.product_name+"</item_name>"+
								"</bill_items>";
			get_available_inventory(result.product_name,'',inventory_data,function(inventory)
			{
				actual_inventory.value=inventory;
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();

		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'inventory');
		});
		
		hide_loader();
	});
};


/**
 * @form Store Placement (DLM)
 * @formNo 156
 * @Loading light
 */
function form156_ini()
{
	show_loader();
	var fid=$("#form156_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form156_header');
	
	var fname=filter_fields.elements[0].value;
	var farea=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form156_index');
	var prev_element=document.getElementById('form156_prev');
	var next_element=document.getElementById('form156_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<area_utilization count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<item_name>"+fname+"</item_name>" +
			"<name>"+farea+"</name>" +
			"</area_utilization>";

	$('#form156_body').html("");

	if_data_read_access('area_utilization',function(accessible_data)
	{
		fetch_requested_data('form156',columns,function(results)
		{	
			results.forEach(function(result)
			{
				var read=false;
				var update=false;
				var del=false;
				var access=false;
				for(var x in accessible_data)
				{
					if(accessible_data[x].record_id===result.id || accessible_data[x].record_id=='all')
					{
						if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || result[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
						{
							if(accessible_data[x].access_type=='all')
							{
								read=true;
								update=true;
								del=true;
								access=true;
								break;
							}
							else if(accessible_data[x].access_type=='read')
							{
								read=true;
							}
							else if(accessible_data[x].access_type=='delete')
							{
								del=true;
							}
							else if(accessible_data[x].access_type=='update')
							{
								update=true;
							}
						}
					}
				}

				if(read)
				{
					var rowsHTML="";
					rowsHTML+="<tr>";
						rowsHTML+="<form id='form156_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Item Name'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form156_"+result.id+"' value='"+result.item_name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Store Area'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form156_"+result.id+"' value='"+result.name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Quantity'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form156_"+result.id+"' value=''>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form156_"+result.id+"' value='"+result.id+"'>";
							if(del)							
								rowsHTML+="<input type='button' class='delete_icon' form='form156_"+result.id+"' title='Delete' onclick='form156_delete_item($(this));'>";	
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form156_body').append(rowsHTML);
					var fields=document.getElementById("form156_"+result.id);
					var quantity=fields.elements[2];
					var delete_button="";
					if(del)					
						delete_button=fields.elements[4];
					
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
					});
					
					get_store_inventory(result.name,result.item_name,result.item_name,function(inventory)
					{
						quantity.value=inventory;
						if(parseFloat(inventory)!=0)
						{
							$(delete_button).hide();
						}
					});
				}
			});
		
			////indexing///
			var next_index=parseInt(start_index)+25;
			var prev_index=parseInt(start_index)-25;
			next_element.setAttribute('data-index',next_index);
			prev_element.setAttribute('data-index',prev_index);
			index_element.setAttribute('data-index','0');
			if(results.length<25)
			{
				$(next_element).hide();
			}
			else
			{
				$(next_element).show();
			}
			if(prev_index<0)
			{
				$(prev_element).hide();
			}
			else
			{
				$(prev_element).show();
			}
			/////////////
	
			longPressEditable($('.dblclick_editable'));
			
			var export_button=filter_fields.elements[3];
			$(export_button).off("click");
			$(export_button).on("click", function(event)
			{
				my_obj_array_to_csv(results,'store_placement');
			});
			hide_loader();
		});
	});
};

/**
 * @form Store movement (DLM)
 * @formNo 157
 * @Loading light
 */
function form157_ini()
{
	show_loader();
	var fid=$("#form157_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form157_header');
	var fproduct=filter_fields.elements[0].value;
	var fstatus=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form157_index');
	var prev_element=document.getElementById('form157_prev');
	var next_element=document.getElementById('form157_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<store_movement count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<item_name>"+fproduct+"</item_name>" +
			"<quantity></quantity>"+
			"<source></source>"+
			"<target></target>"+
			"<dispatcher></dispatcher>"+
			"<receiver></receiver>"+
			"<status>"+fstatus+"</status>"+
			"<last_updated></last_updated>" +
			"</store_movement>";

	$('#form157_body').html("");

	if_data_read_access('store_movement',function(accessible_data)
	{
		fetch_requested_data('form157',columns,function(results)
		{	
			results.forEach(function(result)
			{
				var read=false;
				var update=false;
				var del=false;
				var access=false;
				for(var x in accessible_data)
				{
					if(accessible_data[x].record_id===result.id || accessible_data[x].record_id=='all')
					{
						if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || result[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
						{
							if(accessible_data[x].access_type=='all')
							{
								read=true;
								update=true;
								del=true;
								access=true;
								break;
							}
							else if(accessible_data[x].access_type=='read')
							{
								read=true;
							}
							else if(accessible_data[x].access_type=='delete')
							{
								del=true;
							}
							else if(accessible_data[x].access_type=='update')
							{
								update=true;
							}
						}
					}
				}

				if(read)
				{
					var rowsHTML="<tr>";
							rowsHTML+="<form id='form157_"+result.id+"'></form>";
								rowsHTML+="<td data-th='Product'>";
									rowsHTML+="<textarea readonly='readonly' form='form157_"+result.id+"'>"+result.item_name+"</textarea>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Quantity'>";
									rowsHTML+="<input type='number' readonly='readonly' form='form157_"+result.id+"' value='"+result.quantity+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Store'>";
									rowsHTML+="Source: <input type='text' readonly='readonly' form='form157_"+result.id+"' value='"+result.source+"'>";
									rowsHTML+="<br>Target: <input type='text' readonly='readonly' form='form157_"+result.id+"' value='"+result.target+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Status'>";
									rowsHTML+="<input type='text' readonly='readonly' form='form157_"+result.id+"' value='"+result.status+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Action'>";
									rowsHTML+="<input type='hidden' form='form157_"+result.id+"' value='"+result.id+"'>";
							if(update)
							{
									if(result.status!='received')									
										rowsHTML+="<input type='button' class='generic_icon' form='form157_"+result.id+"' value='Cancel' onclick='form157_cancel_item($(this));'>";
									if(result.status=='pending')									
										rowsHTML+="<input type='button' class='generic_icon' form='form157_"+result.id+"' value='Dispatch' onclick='form157_dispatch_item($(this));'>";
									if(result.status=='dispatched')
										rowsHTML+="<input type='button' class='generic_icon' form='form157_"+result.id+"' value='Receive' onclick='form157_receive_item($(this));'>";
							}
								rowsHTML+="</td>";											
					rowsHTML+="</tr>";
						
					$('#form157_body').append(rowsHTML);
					var fields=document.getElementById("form157_"+result.id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
					});
				}
			});
	
			////indexing///
			var next_index=parseInt(start_index)+25;
			var prev_index=parseInt(start_index)-25;
			next_element.setAttribute('data-index',next_index);
			prev_element.setAttribute('data-index',prev_index);
			index_element.setAttribute('data-index','0');
			if(results.length<25)
			{
				$(next_element).hide();
			}
			else
			{
				$(next_element).show();
			}
			if(prev_index<0)
			{
				$(prev_element).hide();
			}
			else
			{
				$(prev_element).show();
			}
			/////////////
	
			longPressEditable($('.dblclick_editable'));
			
			var export_button=filter_fields.elements[3];
			$(export_button).off("click");
			$(export_button).on("click", function(event)
			{
				my_obj_array_to_csv(results,'store_movement');
			});
			hide_loader();
		});
	});
};

/**
 * @form Enter Supplier Bill (DLM)
 * @formNo 158
 * @Loading light
 */
function form158_ini()
{
	var bill_id=$("#form158_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form158_body').html("");
	$('#form158_foot').html("");
	
	if(bill_id!="")
	{
		show_loader();
		var bill_columns="<supplier_bills>" +
				"<id>"+bill_id+"</id>" +
				"<bill_id></bill_id>" +
				"<supplier></supplier>" +
				"<total></total>" +
				"<amount></amount>" +
				"<discount></discount>" +
				"<tax></tax>" +
				"<bill_date></bill_date>" +
				"<entry_date></entry_date>" +
				"<notes></notes>" +
				"<transaction_id></transaction_id>" +
				"<imported></imported>"+
				"</supplier_bills>";
		
		var filter_fields=document.getElementById('form158_master');

		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			for (var i in bill_results)
			{
				filter_fields.elements[1].value=bill_results[i].supplier;
				filter_fields.elements[2].value=bill_results[i].bill_id;
				filter_fields.elements[3].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements[4].value=get_my_past_date(bill_results[i].entry_date);
				if(bill_results[i].imported=='yes')
					filter_fields.elements[5].checked=true;
				else
					filter_fields.elements[5].checked=false;
				filter_fields.elements[6].value=bill_id;
				filter_fields.elements[7].value=bill_results[i].transaction_id;
				var save_button=filter_fields.elements[8];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form158_update_form();
				});
				
				var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
							"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
							"<td>Rs. "+bill_results[i].amount+"</br>" +
							"Rs. "+bill_results[i].discount+"</br>" +
							"Rs. "+bill_results[i].tax+"</br>" +
							"Rs. "+bill_results[i].total+"</td>" +
							"<td></td>" +
							"</tr>";
				$('#form158_foot').html(total_row);
				
				break;
			}
		
		
			var bill_items_column="<supplier_bill_items>" +
					"<id></id>" +
					"<product_name></product_name>" +
					"<batch></batch>" +
					"<amount></amount>" +
					"<tax></tax>" +
					"<total></total>" +
					"<unit_price></unit_price>" +
					"<quantity></quantity>" +
					"<quantity></quantity>" +
					"<storage></storage>" +
					"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
					"</supplier_bill_items>";
			
			fetch_requested_data('',bill_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form158_"+id+"'></form>";
						rowsHTML+="<td data-th='Product Name'>";
							rowsHTML+="<textarea readonly='readonly' form='form158_"+id+"'>"+result.product_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form158_"+id+"' value='"+result.quantity+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="Unit Price: <input type='number' readonly='readonly' class='dblclick_editable' form='form158_"+id+"' value='"+result.unit_price+"' step='any'>";
							rowsHTML+="<br>Tax: <input type='number' readonly='readonly' class='dblclick_editable' form='form158_"+id+"' value='"+result.tax+"' step='any'>";
							rowsHTML+="<br>Total: <input type='number' readonly='readonly' form='form158_"+id+"' value='"+result.total+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Storage Area'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form158_"+id+"' value='"+result.storage+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form158_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form158_"+id+"' id='save_form158_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form158_"+id+"' id='delete_form158_"+id+"' onclick='form158_delete_item($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form158_body').append(rowsHTML);
					
				});			
				hide_loader();
			});
		});
	}
}


/**
 * @form Manage Sale prices
 * @formNo 166
 * @Loading light
 */
function form166_ini()
{
	show_loader();
	var fid=$("#form166_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form166_header');
	
	var fname=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;

	////indexing///
	var index_element=document.getElementById('form166_index');
	var prev_element=document.getElementById('form166_prev');
	var next_element=document.getElementById('form166_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	
	var columns="<product_instances count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<batch>"+fbatch+"</batch>" +
		"<product_name>"+fname+"</product_name>" +
		"<cost_price></cost_price>" +
		"<sale_price></sale_price>" +
		"<mrp></mrp>"+
		"</product_instances>";

	$('#form166_body').html("");
	
	fetch_requested_data('form166',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form166_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form166_"+result.id+"'>"+result.product_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form166_"+result.id+"' value='"+result.batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='MRP'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form166_"+result.id+"' class='dblclick_editable' value='"+result.mrp+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Cost price'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form166_"+result.id+"' class='dblclick_editable' value='"+result.cost_price+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Sale price'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form166_"+result.id+"' value='"+result.sale_price+"'>";
						rowsHTML+="<img src='./images/edit.png' class='edit_icon' onclick=\"modal38_action('"+result.id+"','"+result.sale_price+"');\">";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form166_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' title='Save' form='form166_"+result.id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form166_body').append(rowsHTML);
			var fields=document.getElementById("form166_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form166_update_item(fields);
			});
		});

		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(results.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////
		
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();

		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			my_obj_array_to_csv(results,'sale_prices');
		});
		
		hide_loader();
	});
};
