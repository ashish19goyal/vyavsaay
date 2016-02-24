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
						//rowsHTML+="<input type='button' class='generic_icon' value='Purchase' form='form1_"+result.id+"' onclick=\"modal27_action('"+result.product_name+"');\">";
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

		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data_extended(columns,'Inventory',function(new_result)
			{
				total_export_requests+=1;

				get_inventory(new_result.product_name,new_result.batch,function(inventory)
				{
					new_result.quantity=inventory;
					total_export_requests-=1;
				});	
			});
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
	
	//console.log(newsletter_id);
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
						rowsHTML+="<br><b><textarea readonly='readonly' form='form2_"+id+"' class='dblclick_editable'>"+result.item_name+"</textarea></b>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Detail'>";
						rowsHTML+="Detail: <textarea readonly='readonly' class='widebox dblclick_editable' form='form2_"+id+"'>"+result.item_detail+"</textarea>";
						rowsHTML+="<br>Link: <textarea readonly='readonly' class='widebox dblclick_editable' form='form2_"+id+"'>"+result.url+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Image'>";
						rowsHTML+="<output form='form2_"+id+"'><div class='figure'><img id='img_form2_"+id+"' src='"+updated_blob+"'></div></output>";
						rowsHTML+="<input type='file' form='form2_"+id+"'>";
						rowsHTML+="<br>Size: <input type='number' form='form2_"+id+"' readonly='readonly' class='dblclick_editable' value='"+result.column_size+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form2_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='submit' class='submit_hidden' form='form2_"+id+"' id='save_form2_"+id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form2_"+id+"' id='delete_form2_"+id+"' onclick='form2_delete_item($(this));'>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form2_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form2_"+id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form2_update_item(fields);
				});
				
				var type_filter=fields.elements[0];
				var name_filter=fields.elements[1];
				var detail_filter=fields.elements[2];
				var link_filter=fields.elements[3];
				var pictureinfo=fields.elements[4];
				var picture=fields.elements[5];
		
				picture.addEventListener('change',function(evt)
				{
					select_picture(evt,pictureinfo,function(dataURL)
					{
						pictureinfo.innerHTML="<div class='figure'><img id='img_form2_"+id+"' src='"+dataURL+"'></div>";			
					});
				},false);
		
			});
			$('textarea').autosize();
			longPressEditable($('.dblclick_editable'));

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
			get_export_data(columns,'Assets');
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
				"<order_num></order_num>"+
				"<order_id></order_id>"+
				"<customer_name></customer_name>" +
				"<total></total>" +
				"<bill_date></bill_date>" +
				"<due_date></due_date>" +
				"<amount></amount>" +
				"<discount></discount>" +
				"<tax></tax>" +
				"<total_quantity></total_quantity>"+
				"<transaction_id></transaction_id>" +
				"</bills>";
		var bill_items_column="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<unit_price></unit_price>" +
				"<notes></notes>" +
				"<quantity></quantity>" +
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
				filter_fields.elements['customer'].value=bill_results[i].customer_name;
				filter_fields.elements['order_num'].value=bill_results[i].order_num;
				filter_fields.elements['bill_num'].value=bill_results[i].bill_num;
				filter_fields.elements['bill_date'].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements['due_date'].value=get_my_past_date(bill_results[i].due_date);
				filter_fields.elements['bill_id'].value=bill_id;
				filter_fields.elements['order_id'].value=bill_results[i].order_id;
				filter_fields.elements['t_id'].value=bill_results[i].transaction_id;
				var payment_filter=filter_fields.elements['payment'];
				var save_button=filter_fields.elements['save'];
				var address_filter=filter_fields.elements['customer_address'];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form10_update_form();
				});

				var total_row="<tr><td colspan='2' data-th='Total'>Total<br>PCS: "+bill_results[i].total_quantity+"</td>" +
							"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
							"<td>Rs. "+bill_results[i].amount+"</br>" +
							"Rs. "+bill_results[i].discount+"</br>" +
							"Rs. "+bill_results[i].tax+"</br>" +
							"Rs. "+bill_results[i].total+"</td>" +
							"<td></td>" +
							"</tr>";
				$('#form10_foot').html(total_row);

				var address_data="<customers count='1'>"+
								"<address></address>"+
								"<city></city>"+
								"<pincode></pincode>"+
								"<acc_name exact='yes'>"+bill_results[i].customer_name+"</acc_name>"+
								"</customers>";
				fetch_requested_data('',address_data,function(addresses)
				{
					if(addresses.length>0)
						address_filter.value=addresses[0].address+', '+addresses[0].city+"-"+addresses[0].pincode;
				});
				
				var payment_data="<payments count='1'>" +
					"<id></id>" +
					"<paid_amount></paid_amount>"+
					"<total_amount></total_amount>"+
					"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
					"</payments>";
				fetch_requested_data('',payment_data,function(payments)
				{
					if(payments.length>0)
					{
						if(parseFloat(payments[0].paid_amount)==0)
							payment_filter.value="Unpaid<br>Balance: Rs. "+payments[0].total_amount;
						else if(parseFloat(payments[0].paid_amount)==parseFloat(payments[0].total_amount))
							payment_filter.value="Paid<br>Balance: Rs. 0";	
						else 
							payment_filter.value="Partially paid<br>Balance: Rs. "+(parseFloat(payments[0].total_amount)-parseFloat(payments[0].paid_amount));
					}
				});
				break;
			}

			/////////////////////////////////////////////////////////////////////////

			fetch_requested_data('',bill_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form10_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<textarea readonly='readonly' form='form10_"+id+"'>"+result.item_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Remark'>";
							rowsHTML+="<textarea readonly='readonly' form='form10_"+id+"'>"+result.notes+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' step='1' readonly='readonly' form='form10_"+id+"' value='"+result.quantity+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="Unit Price: <input type='number' readonly='readonly' form='form10_"+id+"' value='"+result.unit_price+"' step='any'>";
							rowsHTML+="<br>Amount: <input type='hidden' form='form10_"+id+"' value='"+result.amount+"'>";
							rowsHTML+="<br>Discount: <input type='hidden' form='form10_"+id+"' value='"+result.discount+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+result.tax+"'>";
							rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+result.total+"'>";
							rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form10_"+id+"' id='save_form10_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form10_"+id+"' id='delete_form10_"+id+"' onclick='form10_delete_item($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";

					$('#form10_body').append(rowsHTML);
				});
				
				$('#form10_share').show();
				$('#form10_share').click(function()
				{
					modal101_action('Sale Bill',filter_fields.elements['customer'].value,'customer',function (func) 
					{
						print_form10(func);
					});
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
			
			var detail_string="Due Date: "+get_my_past_date(result.due_date);
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
						rowsHTML+="<input type='number' step='any' readonly='readonly' required form='form11_"+result.id+"' class='dblclick_editable' value='"+result.paid_amount+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form11_"+result.id+"' required class='dblclick_editable' value='"+result.status+"'>";
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
			get_export_data(columns,'Payments');
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
			get_export_data(columns,'Tasks');
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
				"<order_id></order_id>"+
				"<order_num></order_num>"+
				"<channel></channel>"+
				"<transaction_id></transaction_id>" +
				"<status></status>"+
				"</customer_returns>";
		var return_items_column="<customer_return_items>" +
				"<id></id>" +
				"<return_id exact='yes'>"+data_id+"</return_id>" +
				"<item_name></item_name>" +
				"<item_desc></item_desc>" +
				"<batch></batch>" +
				"<notes></notes>" +
				"<quantity></quantity>" +
				"<type></type>" +
				"<refund_amount></refund_amount>" +
				"<exchange_batch></exchange_batch>" +
				"<saleable></saleable>" +
				"<storage></storage>"+
				"<tax></tax>" +
				"</customer_return_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',return_columns,function(return_results)
		{
			var filter_fields=document.getElementById('form15_master');
			
			for (var i in return_results)
			{
				filter_fields.elements['customer'].value=return_results[i].customer;
				filter_fields.elements['date'].value=get_my_past_date(return_results[i].return_date);
				filter_fields.elements['return_id'].value=data_id;
				filter_fields.elements['t_id'].value=return_results[i].transaction_id;
				filter_fields.elements['order_id'].value=return_results[i].order_id;
				filter_fields.elements['order_num'].value=return_results[i].order_num;
				filter_fields.elements['channel'].value=return_results[i].channel;				
				var save_button=filter_fields.elements['save'];
				
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
				results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form15_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<input type='hidden' form='form15_"+id+"'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form15_"+id+"' value='"+result.item_name+"'>";
							rowsHTML+="<br><textarea readonly='readonly' form='form15_"+id+"'>"+result.item_desc+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form15_"+id+"' value='"+result.batch+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form15_"+id+"' value='"+result.quantity+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Type'>";
							rowsHTML+="Saleable: <input type='checkbox' readonly='readonly' form='form15_"+id+"' "+result.saleable+">";
							rowsHTML+="<br>Type: <input type='text' readonly='readonly' form='form15_"+id+"' value='"+result.type+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Details'>";
							if(result.type=='refund')
							{
								rowsHTML+="Amount <input type='number' readonly='readonly' step='any' form='form15_"+id+"' value='"+result.refund_amount+"'>";
							}
							else
							{
								rowsHTML+="Batch <input type='text' readonly='readonly' form='form15_"+id+"' value='"+result.exchange_batch+"'>";
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
	var	forder=filter_fields.elements[0].value;
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
			"<order_num>"+forder+"</order_num>" +
			"<channel></channel>"+			
			"<return_date></return_date>" +
			"<total></total>" +
			"<tax></tax>" +
			"<transaction_id></transaction_id>" +
			"<status></status>"+
			"</customer_returns>";

	$('#form16_body').html("");

	fetch_requested_data('form16',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var cancelled_bill="";
			if(result.status=='cancelled')
			{
				cancelled_bill="style='opacity:0.5' title='This bill was cancelled'";
			}	
			var rowsHTML="<tr "+cancelled_bill+">";
				rowsHTML+="<form id='form16_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Order #'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form16_"+result.id+"' value='"+result.order_num+"'>";
						rowsHTML+="<br><input type='text' readonly='readonly' form='form16_"+result.id+"' value='"+result.channel+"'>";
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
						rowsHTML+="<input type='hidden' form='form16_"+result.id+"' value='"+result.id+"'>";
					if(result.status!='cancelled')
					{						
						rowsHTML+="<input type='button' class='edit_icon' form='form16_"+result.id+"' title='Edit Return'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form16_"+result.id+"' title='Delete Return' onclick='form16_delete_item($(this));'>";
					}
						rowsHTML+="<input type='hidden' form='form16_"+result.id+"' value='"+result.transaction_id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form16_body').append(rowsHTML);
			
			var fields=document.getElementById("form16_"+result.id);
			var edit_button=fields.elements[6];						
			$(edit_button).on("click", function(event)
			{
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
			get_export_data(columns,'Customer Returns');
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
			get_export_data(columns,'Supplier Returns');
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
 * @form New Supplier Bill (Aurilion)
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
				filter_fields.elements['supplier'].value=bill_results[i].supplier;
				filter_fields.elements['bill_num'].value=bill_results[i].bill_id;
				filter_fields.elements['date'].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements['edate'].value=get_my_past_date(bill_results[i].entry_date);
				filter_fields.elements['bill_id'].value=bill_id;
				filter_fields.elements['t_id'].value=bill_results[i].transaction_id;
				var save_button=filter_fields.elements['save'];
				
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
				"<discount></discount>" +
				"<unit_price></unit_price>" +
				"<quantity></quantity>" +
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
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<input type='hidden' form='form21_"+id+"'>";
						rowsHTML+="<textarea readonly='readonly' form='form21_"+id+"'>"+result.product_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form21_"+id+"' value='"+result.batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='number' readonly='readonly' form='form21_"+id+"' value='"+result.quantity+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Rate'>";
						rowsHTML+="<input type='number' readonly='readonly' form='form21_"+id+"' value='"+result.unit_price+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Amount'>";
						rowsHTML+="Amount: <input type='number' readonly='readonly' form='form21_"+id+"' value='"+result.amount+"' step='any'>";
						rowsHTML+="<br>Discount: <input type='number' readonly='readonly' form='form21_"+id+"' value='"+result.discount+"' step='any'>";
						rowsHTML+="<br>Tax: <input type='number' readonly='readonly' form='form21_"+id+"' value='"+result.tax+"' step='any'>";
						rowsHTML+="<br>Total: <input type='number' readonly='readonly' form='form21_"+id+"' value='"+result.total+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form21_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='button' class='submit_hidden' form='form21_"+id+"' id='save_form21_"+id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form21_"+id+"' id='delete_form21_"+id+"' onclick='form21_delete_item($(this));'>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form21_body').append(rowsHTML);
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
	$('#form24_foot').html("");
	
	if(order_id!="")
	{
		show_loader();
		var order_columns="<purchase_orders>" +
				"<id>"+order_id+"</id>" +
				"<order_num></order_num>"+
				"<supplier></supplier>" +
				"<order_date></order_date>" +
				"<status></status>" +
				"<amount></amount>"+
				"<tax></tax>"+
				"<cst></cst>"+
				"<payment_mode></payment_mode>"+
				"<total></total>"+
				"</purchase_orders>";
		var order_items_column="<purchase_order_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<item_desc></item_desc>" +
				"<quantity></quantity>" +
				"<order_id exact='yes'>"+order_id+"</order_id>" +
				"<make></make>" +
				"<supplier_sku></supplier_sku>"+
				"<mrp></mrp>"+
				"<price></price>" +
				"<amount></amount>"+
				"<tax></tax>"+
				"<tax_rate></tax_rate>"+
				"<total></total>"+				
				"</purchase_order_items>";
	
		////separate fetch function to get order details like customer name, total etc.
		fetch_requested_data('',order_columns,function(order_results)
		{
			var filter_fields=document.getElementById('form24_master');
			
			for(var i in order_results)
			{
				filter_fields.elements['supplier'].value=order_results[i].supplier;
				filter_fields.elements['date'].value=get_my_past_date(order_results[i].order_date);
				filter_fields.elements['order_num'].value=order_results[i].order_num;
				filter_fields.elements['status'].value=order_results[i].status;
				filter_fields.elements['order_id'].value=order_id;
				filter_fields.elements['mode'].value=order_results[i].payment_mode;
				//order_results[i].order_num;
				
				if(order_results[i].cst=='yes')
				{
					filter_fields.elements['cst'].checked=true;
				}
				else 
				{
					filter_fields.elements['cst'].checked=false;
				}

				var save_button=filter_fields.elements['save'];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form24_update_form();
				});
				
				var supplier_address="<suppliers>"+
									"<address></address>"+
									"<pincode></pincode>"+
									"<acc_name exact='yes'>"+order_results[i].supplier+"</acc_name>"+
									"</suppliers>";
				fetch_requested_data('',supplier_address,function(addresses)
				{
					if(addresses.length>0)
					{
						filter_fields.elements['address'].value=addresses[0].address+"-"+addresses[0].pincode;
					}
				});
				var supplier_tin_xml="<attributes>"+
									"<value></value>"+
									"<type exact='yes'>supplier</type>"+
									"<attribute exact='yes'>TIN#</attribute>"+
									"<name exact='yes'>"+order_results[i].supplier+"</name>"+
									"</attributes>";
				set_my_value(supplier_tin_xml,filter_fields.elements['tin']);
				
				break;
			}
		
			fetch_requested_data('',order_items_column,function(results)
			{
				var data_array=[];
				var counter=0;
				results.forEach(function(result)
				{
					counter+=1;
					var new_object=new Object();
					new_object['S.No.']=counter;					
					new_object['Item Name']=result.item_desc;
					new_object['SKU']=result.item_name;
					new_object['Supplier SKU']=result.supplier_sku;
					new_object['Qty']=result.quantity;
					new_object['MRP']=result.mrp;
					new_object['Price']=result.price;
					new_object['Tax']=result.tax_rate;
					new_object['Total']=result.total;
					data_array.push(new_object);
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form24_"+id+"'></form>";
						rowsHTML+="<td data-th='Item Name'>";
							rowsHTML+="<input readonly='readonly' type='text' required form='form24_"+id+"' value='"+result.item_name+"'>";
							rowsHTML+="<br><textarea readonly='readonly' form='form24_"+id+"'>"+result.item_desc+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' required form='form24_"+id+"' value='"+result.quantity+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Make'>";
							rowsHTML+="Make: <input type='text' readonly='readonly' form='form24_"+id+"' value='"+result.make+"'>";
							rowsHTML+="<br>Supplier SKU: <input type='text' step='any' readonly='readonly' form='form24_"+id+"' value='"+result.supplier_sku+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="MRP: <input type='number' readonly='readonly' required form='form24_"+id+"' value='"+result.mrp+"' step='any'>";
							rowsHTML+="<br>Price: <input type='number' readonly='readonly' required form='form24_"+id+"' value='"+result.price+"' step='any'>";
							rowsHTML+="<br>Amount: <input type='number' readonly='readonly' required form='form24_"+id+"' value='"+result.amount+"' step='any'>";
							rowsHTML+="<br>Tax Rate: <input type='number' readonly='readonly' form='form24_"+id+"' value='"+result.tax_rate+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' readonly='readonly' form='form24_"+id+"' value='"+result.tax+"'>";
							rowsHTML+="<input type='hidden' readonly='readonly' form='form24_"+id+"' value='"+result.total+"'>";
							rowsHTML+="<input type='hidden' form='form24_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form24_"+id+"' id='save_form24_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form24_"+id+"' id='delete_form24_"+id+"' onclick='form24_delete_item($(this)); form24_get_totals();'>";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
				
					$('#form24_body').append(rowsHTML);
				});

				var message_attachment=my_obj_array_to_csv_string(data_array);
				var bt=get_session_var('title');
				$('#form24_share').show();
				$('#form24_share').click(function()
				{
					modal101_action(bt+' - PO# '+filter_fields.elements['order_num'].value+' - '+filter_fields.elements['supplier'].value,filter_fields.elements['supplier'].value,'supplier',function (func) 
					{
						print_form24(func);
					},'csv',message_attachment);
				});
				form24_get_totals();
				$('textarea').autosize();
				hide_loader();
			});
		});
	}
}

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
			get_export_data(columns,'Offers');
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
		ajax_with_custom_func("./ajax/geoCode.php",{domain:domain,username:username,type:'customers',re:re_access},function(e)
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
		$("#modal6_link").click();
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
			"<status></status>"+
			"<last_updated></last_updated>" +
			"</bills>";

	$('#form42_body').html("");

	fetch_requested_data('form42',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var cancelled_bill="";
			if(result.status=='cancelled')
			{
				cancelled_bill="style='opacity:0.5' title='This bill was cancelled'";
			}
			
			var rowsHTML="<tr "+cancelled_bill+">";
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
					if(result.status!='cancelled')
					{
						rowsHTML+="<input type='button' class='edit_icon' form='form42_"+result.id+"' title='Edit Bill'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form42_"+result.id+"' title='Delete Bill' onclick='form42_delete_item($(this));'>";
					}
						rowsHTML+="<input type='hidden' form='form42_"+result.id+"' value='"+result.transaction_id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form42_body').append(rowsHTML);
			var fields=document.getElementById("form42_"+result.id);
			if(result.status!='cancelled')
			{			
				var edit_button=fields.elements[5];
				$(edit_button).on("click", function(event)
				{
					event.preventDefault();
					element_display(result.id,'form12',['form118','form10','form72']);
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
		
		var export_button=filter_fields.elements[2];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data(columns,'Bills');
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
			"<bill_id></bill_id>"+
			"<total_quantity></total_quantity>"+
			"<quantity_received></quantity_received>"+
			"<quantity_accepted></quantity_accepted>"+
			"<quantity_qc_pending></quantity_qc_pending>"+
			"<cst></cst>"+
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
						rowsHTML+="<textarea style='width:100%;'readonly='readonly' form='form43_"+result.id+"'>"+result.order_num+"</textarea>";
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
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="Ordered: <input type='number' step='any' readonly='readonly' form='form43_"+result.id+"' value='"+result.total_quantity+"'>";
						rowsHTML+="<br>Received: <input type='number' step='any' readonly='readonly' form='form43_"+result.id+"' value='"+result.quantity_received+"'>";
						rowsHTML+="<br>Accepted: <input type='number' step='any' readonly='readonly' form='form43_"+result.id+"' value='"+result.quantity_accepted+"'>";
						rowsHTML+="<br>QC Pending: <input type='number' step='any' readonly='readonly' form='form43_"+result.id+"' value='"+result.quantity_qc_pending+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form43_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form43_"+result.id+"' title='Edit order' onclick=\"element_display('"+result.id+"','form24');\">";
						rowsHTML+="<input type='submit' class='save_icon' form='form43_"+result.id+"' title='Save order'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form43_"+result.id+"' title='Delete order' onclick='form43_delete_item($(this));'>";
					if(result.status=='order placed' || result.status=='partially received')
					{
						if(result.quantity_accepted!=result.total_quantity)
						{
							rowsHTML+="<br><input type='button' name='issue_quantity' class='generic_icon' form='form43_"+result.id+"' value='GRN without QC'>";
							rowsHTML+="<br><input type='button' name='issue_grn' class='generic_icon' form='form43_"+result.id+"' value='GRN with QC'>";
						}
						if(result.qc_pending==0 || result.qc_pending=='0')
							rowsHTML+="<br><input type='button' name='new_order' class='generic_icon' form='form43_"+result.id+"' value='New Order'>";						
					}
					else if(result.status=='completely received')
					{
						if(result.quantity_accepted!=result.total_quantity)
						{
							rowsHTML+="<br><input type='button' name='issue_quantity' class='generic_icon' form='form43_"+result.id+"' value='GRN without QC'>";
							rowsHTML+="<br><input type='button' name='issue_grn' class='generic_icon' form='form43_"+result.id+"' value='GRN with QC'>";
						}
					}
					
					if(result.bill_id!='' && result.bill_id!='null')
					{
						rowsHTML+="<br><input type='button' name='view_bill' class='generic_icon' form='form43_"+result.id+"' value='View Bill'>";
					}
					
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
			
			if(result.bill_id!='' && result.bill_id!='null')
			{
				var view_button=fields.elements['view_bill'];
				$(view_button).on('click',function()
				{
					modal137_action(result.bill_id);
					//element_display(result.bill_id,'form122');
				});
			}

			if(result.status=='order placed' || result.status=='partially received' || result.status=='completely received')
			{
				///grn without qc
				var quantity_button=fields.elements['issue_quantity'];
				$(quantity_button).on('click',function()
				{
					modal131_action(result.id,result.order_num,result.total_quantity,result.supplier,get_my_past_date(result.order_date),result.quantity_accepted);
				});
				
				//grn with qc
				var issue_button=fields.elements['issue_grn'];
				$(issue_button).on('click',function()
				{
					element_display('','form122');
					var master_form=document.getElementById('form122_master');
					master_form.elements['supplier'].value=result.supplier;
					master_form.elements['po_num'].value=result.order_num;
					master_form.elements['order_id'].value=result.id;
					
					if(result.cst=='yes')
						master_form.elements['cst'].checked=true;
					$(master_form.elements['bill_num']).focus();
				});
				
				//new order
				var new_order_button=fields.elements['new_order'];
				$(new_order_button).on('click',function()
				{
					var po_items_xml="<purchase_order_items>"+
									"<item_name></item_name>"+
									"<quantity></quantity>"+
									"<make></make>"+
									"<price></price>"+
									"<amount></amount>"+
									"<tax></tax>"+
									"<total></total>"+
									"<supplier_sku></supplier_sku>"+
									"<mrp></mrp>"+
									"<order_id exact='yes'>"+result.id+"</order_id>"+
									"</purchase_order_items>";
					fetch_requested_data('',po_items_xml,function (po_items) 
					{
						var bill_items_xml="<supplier_bill_items>"+
										"<product_name></product_name>"+
										"<quantity></quantity>"+
										"<qc exact='yes'>accepted</qc>"+
										"<bill_id array='yes'>"+result.bill_id+"</bill_id>"+
										"</supplier_bill_items>";
						fetch_requested_data('',bill_items_xml,function (bill_items) 
						{
							for(var k=0;k<po_items.length;k++)
							{
								for(var l=0;l<bill_items.length;l++)
								{
									if(po_items[k].item_name==bill_items[l].product_name)
									{
										if(parseFloat(po_items[k].quantity)>parseFloat(bill_items[l].quantity))
										{
											var old_quantity=parseFloat(po_items[k].quantity);
											var new_quantity=parseFloat(po_items[k].quantity)-parseFloat(bill_items[l].quantity);
																					
											po_items[k].quantity=new_quantity;
											po_items[k].amount=parseFloat(po_items[k].amount)*new_quantity/old_quantity;
											po_items[k].tax=parseFloat(po_items[k].tax)*new_quantity/old_quantity;
											po_items[k].total=parseFloat(po_items[k].total)*new_quantity/old_quantity;
										
											bill_items.splice(l,1);
											l--;
										}
										else if(parseFloat(po_items[k].quantity)<parseFloat(bill_items[l].quantity))
										{
											bill_items[l].quantity=parseFloat(bill_items[l].quantity)-parseFloat(po_items[k].quantity);
											po_items.splice(k,1);
											k--;
											break;
										}
										else 
										{
											bill_items.splice(l,1);
											po_items.splice(k,1);
											k--;
											break;
										}
									}
								}
							}

							element_display('','form24');							
							po_items.forEach(function(po_item)
							{
								var id=get_new_key();
								var rowsHTML="<tr>";
								rowsHTML+="<form id='form24_"+id+"' autocomplete='off'></form>";
									rowsHTML+="<td data-th='Item Name'>";
										rowsHTML+="<input type='text' required form='form24_"+id+"' value='"+po_item.item_name+"'>";
										rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form24_add_product_"+id+"'>";
										rowsHTML+="<br><textarea readonly='readonly' form='form24_"+id+"'></textarea>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Quantity'>";
										rowsHTML+="<input type='number' required form='form24_"+id+"' value='"+po_item.quantity+"' step='any'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Make'>";
										rowsHTML+="Make: <input type='text' form='form24_"+id+"' readonly='readonly' value='"+po_item.make+"'>";
										rowsHTML+="Supplier SKU: <input type='text' form='form24_"+id+"' readonly='readonly' value='"+po_item.supplier_sku+"'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Price'>";
										rowsHTML+="MRP: <input type='number' required form='form24_"+id+"' value='"+po_item.mrp+"' step='any' readonly='readonly'>";
										rowsHTML+="<br>Price: <input type='number' required form='form24_"+id+"' step='any' value='"+po_item.price+"' readonly='readonly' class='dblclick_editable'>";
										rowsHTML+="<br>Amount: <input type='number' required readonly='readonly' form='form24_"+id+"' value='"+po_item.amount+"' step='any' class='dblclick_editable'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Action'>";
										rowsHTML+="<input type='hidden' form='form24_"+id+"' name='tax' value='"+po_item.tax+"'>";
										rowsHTML+="<input type='hidden' form='form24_"+id+"' name='total' value='"+po_item.total+"'>";
										rowsHTML+="<input type='hidden' form='form24_"+id+"' value='"+id+"'>";
										rowsHTML+="<input type='button' class='submit_hidden' form='form24_"+id+"' id='save_form24_"+id+"' >";
										rowsHTML+="<input type='button' class='delete_icon' form='form24_"+id+"' id='delete_form24_"+id+"' onclick='$(this).parent().parent().remove(); form24_get_totals();'>";
										rowsHTML+="<input type='submit' class='submit_hidden' form='form24_"+id+"'>";
										rowsHTML+="<input type='hidden' form='form24_"+id+"' name='tax_rate'>";
									rowsHTML+="</td>";			
								rowsHTML+="</tr>";
							
								$('#form24_body').prepend(rowsHTML);
						
								var master_form=document.getElementById("form24_master");		
								var supplier_name_filter=master_form.elements['supplier'];
								var supplier_name=supplier_name_filter.value;
								
								var fields=document.getElementById("form24_"+id);
								var name_filter=fields.elements[0];
								var desc_filter=fields.elements[1];
								var quantity_filter=fields.elements[2];
								var make_filter=fields.elements[3];
								var supplier_sku_filter=fields.elements[4];
								var mrp_filter=fields.elements[5];
								var price_filter=fields.elements[6];
								var amount_filter=fields.elements[7];
								var tax_rate_filter=fields.elements[8];
								var tax_filter=fields.elements[9];
								var total_filter=fields.elements[10];
								var id_filter=fields.elements[11];
								var save_button=fields.elements[12];
										
								$(save_button).on("click", function(event)
								{
									event.preventDefault();
									form24_create_item(fields);
								});
								
								$(fields).on("submit", function(event)
								{
									event.preventDefault();
									form24_add_item();
								});
								
								var product_data="<product_master>" +
										"<name></name>" +
										"</product_master>";
								set_my_value_list_func(product_data,name_filter);
								
								var add_product=document.getElementById('form24_add_product_'+id);
								$(add_product).on('click',function()
								{
									modal14_action(function()
									{	
										var product_data="<product_master>" +
												"<name></name>" +
												"</product_master>";
										set_my_value_list_func(product_data,name_filter,function () 
										{
											$(name_filter).focus();
										});
									});
								});		
										
								$(name_filter).add(supplier_name_filter).on('blur',function(event)
								{
									var make_data="<product_master count='1'>" +
											"<make></make>" +
											"<tax></tax>"+
											"<description></description>"+
											"<name exact='yes'>"+name_filter.value+"</name>" +
											"</product_master>";
									fetch_requested_data('',make_data,function (makes) 
									{
										if(makes.length>0)
										{
											make_filter.value=makes[0].make;
											tax_rate_filter.value=makes[0].tax;
											desc_filter.value=makes[0].description;
										}
									});			
									
									var mrp_data="<product_instances>"+
												"<mrp></mrp>"+
												"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
												"</product_instances>";
									get_single_column_data(function(mrps)
									{
										if(mrps.length>0)
										{
											mrp_filter.value=mrps[0];
										}
										else{
											mrp_filter.value="";
										}
										var margin_data="<supplier_item_mapping>" +
													"<margin></margin>"+
													"<supplier_sku></supplier_sku>"+							
													"<supplier exact='yes'>"+supplier_name_filter.value+"</supplier>" +
													"<item exact='yes'>"+name_filter.value+"</item>"+
													"</supplier_item_mapping>";
										fetch_requested_data('',margin_data,function(margins)
										{
											if(margins.length>0)
											{
												supplier_sku_filter.value=margins[0].supplier_sku;
												price_filter.value=my_round((parseFloat(mrp_filter.value)*(100-parseFloat(margins[0].margin))/100),2);
												amount_filter.value=Math.round(parseFloat(quantity_filter.value)*parseFloat(price_filter.value));
												tax_filter.value=Math.round(parseFloat(amount_filter.value)*(parseFloat(tax_rate_filter.value)/100));
												total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
											}
											else
											{
												supplier_sku_filter.value="";
												price_filter.value="";
												amount_filter.value="";
												tax_filter.value="";
												total_filter.value="";
											}
										});					
									},mrp_data);
								});
								
								$(quantity_filter).add(price_filter).on('blur',function(event)
								{
									amount_filter.value=Math.round(parseFloat(quantity_filter.value)*parseFloat(price_filter.value));
									tax_filter.value=Math.round(parseFloat(amount_filter.value)*(parseFloat(tax_rate_filter.value)/100));
									total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
								});
								
								form24_get_totals();
								longPressEditable($('.dblclick_editable'));
							});
						});				
					});					
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
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data(columns,'Purchase Orders');
		});
		hide_loader();
	});
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
			"<order_id></order_id>" +
			"<last_updated></last_updated>" +
			"<notes></notes>"+
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
						rowsHTML+="<input type='text' readonly='readonly' class='input_link' form='form53_"+result.id+"' value='"+result.bill_id+"' onclick=\"element_display('"+result.id+"','form21',['form122','form136','form158','form192','form270','form295']);\">";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Supplier'>";
						rowsHTML+="<textarea readonly='readonly' form='form53_"+result.id+"'>"+result.supplier+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Bill Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form53_"+result.id+"' value='"+get_my_past_date(result.bill_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Total'>";
						rowsHTML+="Rs. <input type='text' readonly='readonly' form='form53_"+result.id+"' value='"+Math.round(result.total)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Notes'>";
						rowsHTML+="<textarea readonly='readonly' form='form53_"+result.id+"' class='dblclick_editable'>"+result.notes+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form53_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form53_"+result.id+"' title='Delete Bill' onclick='form53_delete_item($(this));'>";
						rowsHTML+="<input type='hidden' form='form53_"+result.id+"' value='"+result.transaction_id+"'>";
						rowsHTML+="<input type='hidden' form='form53_"+result.id+"' value='"+result.order_id+"'>";
						if(result.notes=='pending approval')
							rowsHTML+="<br><input type='button' class='generic_icon' value='approve' form='form53_"+result.id+"' title='Approve Bill' onclick='form53_approve_item($(this))'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form53_body').append(rowsHTML);
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
		
		var export_button=filter_fields.elements['export'];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data(columns,'Supplier Bills');
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
			get_export_data(columns,'Printing Templates');
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
						rowsHTML+="<input type='number' readonly='readonly' step='any' form='form57_"+result.id+"' class='dblclick_editable' value='"+result.price+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Tax(in %)'>";
						rowsHTML+="<input type='number' readonly='readonly' form='form57_"+result.id+"' step='any' class='dblclick_editable' value='"+result.tax+"'>";
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
			get_export_data(columns,'Services');
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
			get_export_data(columns,'Service Pre requisites');
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
					rowsHTML+="<td data-th='Required Material'>";
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
			get_export_data(columns,'Product Pre requisites');
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
			get_export_data(columns,'Service Attributes');
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
			get_export_data(columns,'Product Reviews');
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
			get_export_data(columns,'Service Reviews');
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
			get_export_data(columns,'Service Cross Sells');
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
			get_export_data(columns,'Product Cross Sells');
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
	$('#form69_foot').html("");

	if(order_id!="")
	{
		show_loader();
		var order_columns="<sale_orders>" +
				"<id>"+order_id+"</id>" +
				"<customer_name></customer_name>" +
				"<order_num></order_num>"+
				"<channel></channel>"+
				"<order_date></order_date>" +
				"<amount></amount>"+
				"<tax></tax>"+
				"<total></total>"+
				"<freight></freight>"+
				"<billing_type></billing_type>"+
				"<status></status>" +
				"</sale_orders>";
		var order_items_column="<sale_order_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<item_desc></item_desc>" +
				"<channel_sku></channel_sku>"+
				"<vendor_sku></vendor_sku>"+
				"<quantity></quantity>" +
				"<mrp></mrp>"+
				"<amount></amount>"+
				"<tax></tax>"+
				"<total></total>"+
				"<unit_price></unit_price>"+
				"<selling_price></selling_price>"+
				"<freight></freight>"+
                "<order_id exact='yes'>"+order_id+"</order_id>" +
				"<notes></notes>" +
				"</sale_order_items>";
	
		////separate fetch function to get order details like customer name, total etc.
		fetch_requested_data('',order_columns,function(order_results)
		{
			for(var i in order_results)
			{
				var filter_fields=document.getElementById('form69_master');
				filter_fields.elements['customer'].value=order_results[i].customer_name;
				filter_fields.elements['order_date'].value=get_my_past_date(order_results[i].order_date);
				filter_fields.elements['status'].value=order_results[i].status;
				filter_fields.elements['order_id'].value=order_id;
				filter_fields.elements['order_num'].value=order_results[i].order_num;
				filter_fields.elements['channel'].value=order_results[i].channel;
				filter_fields.elements['bill_type'].value=order_results[i].billing_type;
				
				var save_button=filter_fields.elements['save'];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form69_update_form();
				});
				
				break;
			}
			/////////////////////////////////////////////////////////////////////////
		
			fetch_requested_data('',order_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form69_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<input type='hidden' readonly='readonly' required form='form69_"+id+"' value='"+result.channel_sku+"'>";
							rowsHTML+="<input type='hidden' readonly='readonly' required form='form69_"+id+"' value='"+result.vendor_sku+"'>";
							rowsHTML+="<input type='text' class='wideinput' readonly='readonly' required form='form69_"+id+"' value='"+result.item_name+"'>";
							rowsHTML+="<br>Name: <textarea readonly='readonly' form='form69_"+id+"'>"+result.item_desc+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' class='dblclick_editable' readonly='readonly' required form='form69_"+id+"' value='"+result.quantity+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="<b>SP</b>: Rs. <input type='number' readonly='readonly' form='form69_"+id+"' value='"+result.selling_price+"' step='any'>";
							rowsHTML+="<br><b>Freight</b>: Rs. <input type='number' readonly='readonly' form='form69_"+id+"' value='"+result.freight+"' step='any'>";
							rowsHTML+="<br><b>MRP</b>: Rs. <input type='number' readonly='readonly' form='form69_"+id+"' value='"+result.mrp+"' step='any'>";
							rowsHTML+="<br><b>Amount</b>: Rs. <input type='number' readonly='readonly' form='form69_"+id+"' value='"+result.amount+"' step='any'>";
							rowsHTML+="<br><b>Tax</b>: Rs. <input type='number' readonly='readonly' form='form69_"+id+"' value='"+result.tax+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form69_"+id+"' value='"+result.total+"'>";
							rowsHTML+="<input type='hidden' form='form69_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form69_"+id+"' id='save_form69_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form69_"+id+"' id='delete_form69_"+id+"' onclick='form69_delete_item($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form69_body').append(rowsHTML);
					
					var fields=document.getElementById("form69_"+id);
					var name_filter=fields.elements[2];
					var desc_filter=fields.elements[3];
					var quantity_filter=fields.elements[4];
					
					if(result.item_name=="")
					{
						var sku_data="<sku_mapping count='1'>"+
									"<item_desc></item_desc>"+
									"<system_sku></system_sku>"+
									"<channel_sku>"+result.channel_sku+"</channel_sku>"+
									"<channel_system_sku>"+result.vendor_sku+"</channel_system_sku>"+
									"<channel exact='yes'>"+filter_fields.elements['channel'].value+"</channel>"+
									"</sku_mapping>";
						fetch_requested_data('',sku_data,function(skus)
						{
							if(skus.length>0)
							{
								name_filter.value=skus[0].system_sku;
								desc_filter.value=skus[0].item_desc;
								//$(fields).trigger('submit');
							}
						});
					}
				});
				$('textarea').autosize();
				form69_get_totals();
				hide_loader();
			});
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
			get_export_data(columns,'Sale Orders');
		});
		hide_loader();
	});
};


/**
 * @form Create Bill (Aurilion)
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
				"<transaction_id></transaction_id>" +
				"</bills>";
		var bill_items_column="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<batch></batch>" +
				"<staff></staff>" +
				"<quantity></quantity>" +
				"<unit_price></unit_price>" +
				"<amount></amount>" +
				"<total></total>" +
				"<discount></discount>" +
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
				"<tax></tax>" +
				"</bill_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			var filter_fields=document.getElementById('form72_master');
			
			if(bill_results.length>0)
			{
				filter_fields.elements['customer'].value=bill_results[0].customer_name;
				filter_fields.elements['date'].value=get_my_past_date(bill_results[0].bill_date);
				filter_fields.elements['bill_num'].value=bill_results[0].bill_num;
				filter_fields.elements['bill_id'].value=bill_id;
				filter_fields.elements['t_id'].value=bill_results[0].transaction_id;
				var save_button=filter_fields.elements['save'];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form72_update_form();
				});
			}
			
			fetch_requested_data('',bill_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form72_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<input type='hidden' form='form72_"+id+"'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+result.item_name+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form72_"+id+"' value='"+result.batch+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form72_"+id+"' value='"+result.quantity+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Rate'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form72_"+id+"' value='"+result.unit_price+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="Amount: <input type='number' readonly='readonly' form='form72_"+id+"' step='any' value='"+result.amount+"'>";
							rowsHTML+="<br>Discount: <input type='number' readonly='readonly' form='form72_"+id+"' step='any' value='"+result.discount+"'>";
							rowsHTML+="<br>Tax: <input type='number' readonly='readonly' form='form72_"+id+"' step='any' value='"+result.tax+"'>";
							rowsHTML+="<br>Total: <input type='number' readonly='readonly' form='form72_"+id+"' step='any' value='"+result.total+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form72_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form72_"+id+"' id='save_form72_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form72_"+id+"' id='delete_form72_"+id+"' onclick='form72_delete_item($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form72_body').append(rowsHTML);
				});
				
				var bt=get_session_var('title');
				$('#form72_share').show();
				$('#form72_share').click(function()
				{
					modal101_action(bt+' - Invoice# '+filter_fields.elements['bill_num'].value,filter_fields.elements['customer'].value,'customer',function (func) 
					{
						print_form72(func);
					});
				});
				form72_get_totals();
				hide_loader();
			});
		});
	}
}

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
			get_export_data(columns,'Shortcuts');
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
					"<promotion_status></promotion_status>"+
					"</customers>";
			fetch_requested_data('',customer_columns,function(results)
			{
				results.forEach(function(result)
				{
					if(result.promotion_status!="suspended")
					{					
						var id=result.id;
						var rowsHTML="<tr>";
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
								rowsHTML+="<input type='hidden' form='row_form78_"+id+"' value='"+result.id+"'>";
							rowsHTML+="</td>";
						rowsHTML+="</tr>";
					
						$('#form78_body').append(rowsHTML);
					}				
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
			get_export_data(columns,'Task Types');
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
						rowsHTML+="<textarea readonly='readonly' form='form81_"+result.id+"'>"+result.customer+"</textarea>";
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
			get_export_data(columns,'Sale Leads');
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
			get_export_data(columns,'Subscriptions');
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
		ajax_with_custom_func("./ajax/geoCode.php",{domain:domain,username:username,type:'suppliers',re:re_access},function(e)
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
		$("#modal6_link").click();
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
		ajax_with_custom_func("./ajax/geoCode.php",{domain:domain,username:username,type:'staff',re:re_access},function(e)
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
		$("#modal6_link").click();
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
					rowsHTML+="<td data-th='Details' id='form87_"+result.id+"_details'>";
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
			
			var attributes_data="<attributes>"+
								"<name exact='yes'>"+result.name+"</name>" +
								"<type exact='yes'>product</type>" +
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
				var td_elem=document.getElementById('form87_'+result.id+'_details');
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
			get_export_data(columns,'Products');
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
			get_export_data(columns,'Manufacturing Schedule');
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
	
	///////////calendar view
	$('#form89_calendar').fullCalendar('destroy');
	$('#form89_calendar').fullCalendar({
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
	        var app_data="<appointments>" +
	        		"<id>"+fid+"</id>" +
	        		"<customer></customer>" +
	        		"<schedule lowerbound='yes'>"+start_time+"</schedule>" +
	        		"<schedule upperbound='yes'>"+end_time+"</schedule>" +
	        		"<status></status>" +
	        		"<assignee></assignee>" +
	        		"<hours></hours>" +
	        		"<notes></notes>" +
	        		"</appointments>";
	        
	        fetch_requested_data('form89',app_data,function(apps)
	        {
	        	//console.log(apps);
	        	var events=[];
	        	
	        	apps.forEach(function(app)
	        	{
        			var color="yellow";
        			if(app.status=='cancelled')
        			{
        				color="aaaaaa";
        			}
        			else if(app.status=='closed')
        			{
        				color='#00ff00';
        			}
	        		events.push({
	        			title: "\n"+app.assignee+"\nappointment with: "+app.customer,
	        			start:get_iso_time(app.schedule),
	        			end:get_iso_time(parseFloat(app.schedule)+(parseFloat(app.hours)*3600000)),
	        			color: color,
	        			textColor:"#333",
	        			id: app.id
	        		});	        		
	        	});
	        	callback(events);
	        });
	    },
	    dayClick: function(date,jsEvent,view){
	    	modal36_action(get_my_date_from_iso(date.format()));
	    },
	    eventClick: function(calEvent,jsEvent,view){
	    	modal37_action(calEvent.id);
	    },
	    eventDrop: function(event,delta,revertFunc){
	    	var schedule=(parseFloat(event.start.unix())*1000);
	    	var data_xml="<appointments>" +
						"<id>"+event.id+"</id>" +
						"<schedule>"+schedule+"</schedule>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</appointments>";
			update_simple(data_xml);
	    },
	    eventResize: function(event, delta, revertFunc){
	    	var hours=parseFloat((parseFloat(event.end.unix())-parseFloat(event.start.unix()))/3600);
	    	var data_xml="<appointments>" +
						"<id>"+event.id+"</id>" +
						"<hours>"+hours+"</hours>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</appointments>";
			update_simple(data_xml);
		}
	});
	

	////////////////
	
	
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
			get_export_data(columns,'Appointments');
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
				"<order_id></order_id>"+
				"<order_num></order_num>"+
				"<channel></channel>"+
				"<customer_name></customer_name>" +
				"<total></total>" +
				"<bill_date></bill_date>" +
				"<amount></amount>" +
				"<tax></tax>" +
				"<freight></freight>" +
				"<billing_type></billing_type>" +
				"<transaction_id></transaction_id>" +
				"</bills>";
		var bill_items_column="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<item_desc></item_desc>" +
				"<batch></batch>" +
				"<unit_price></unit_price>" +
				"<quantity></quantity>" +
				"<amount></amount>" +
				"<tax></tax>" +
				"<vat></vat>" +
				"<cst></cst>" +
				"<mrp></mrp>"+
				"<tax_rate></tax_rate>" +
				"<freight></freight>"+
				"<total></total>" +
				"<storage></storage>" +
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +				
				"</bill_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			var filter_fields=document.getElementById('form91_master');
			
			for (var i in bill_results)
			{
				filter_fields.elements['customer'].value=bill_results[i].customer_name;
				filter_fields.elements['bill_type'].value=bill_results[i].billing_type;
				filter_fields.elements['date'].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements['bill_num'].value=bill_results[i].bill_num;
				filter_fields.elements['bill_id'].value=bill_id;				
				filter_fields.elements['channel'].value=bill_results[i].channel;
				filter_fields.elements['t_id'].value=bill_results[i].transaction_id;
				filter_fields.elements['order_id'].value=bill_results[i].order_id;
				filter_fields.elements['order_num'].value=bill_results[i].order_num;				
				var save_button=filter_fields.elements['save'];
				
				var po_date_data="<sale_orders>"+
								"<order_date></order_date>"+
								"<order_num exact='yes'>"+bill_results[i].order_num+"</order_num>"+
								"</sale_orders>";
				set_my_value(po_date_data,filter_fields.elements['po_date']); 

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
						address_string+=addresses[0].address+", "+addresses[0].city;
					}
					document.getElementById('form91_customer_info').innerHTML="Address<br>"+address_string;
				});
				
				var tin_data="<attributes>" +
						"<value></value>" +
						"<type exact='yes'>customer</type>"+
						"<attribute array='yes'>--VAT#--CST#--</attribute>"+ 
						"<name exact='yes'>"+bill_results[i].customer_name+"</name>" +
						"</attributes>";
				set_my_value(tin_data,filter_fields.elements['customer_tin']);
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form91_update_form();
				});

				break;
			}
		
			fetch_requested_data('',bill_items_column,function(results)
			{
				results.forEach(function(result)
				{
					//console.log(result);
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form91_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form91_"+id+"' value='"+result.item_name+"'>";
							rowsHTML+="<br><textarea readonly='readonly' form='form91_"+id+"'>"+result.item_desc+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form91_"+id+"' value='"+result.batch+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form91_"+id+"' value='"+result.quantity+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Rate'>";
							rowsHTML+="MRP: <input type='number' readonly='readonly' form='form91_"+id+"' value='"+result.mrp+"' step='any'>";
							rowsHTML+="<br>Price: <input type='number' readonly='readonly' form='form91_"+id+"' value='"+result.unit_price+"' step='any'>";
							rowsHTML+="<br>Freight: <input type='number' readonly='readonly' step='any' form='form91_"+id+"' value='"+result.freight+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Total'>";
							rowsHTML+="Amount: <input type='number' readonly='readonly' form='form91_"+id+"' value='"+result.amount+"' step='any'>";
							rowsHTML+="<br>Tax: <input type='number' readonly='readonly' form='form91_"+id+"' value='"+result.tax+"' step='any'>";
							rowsHTML+="<br>Total: <input type='number' step='any' readonly='readonly' form='form91_"+id+"' value='"+result.total+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form91_"+id+"' value='"+result.storage+"' name='storage'>";
							rowsHTML+="<input type='hidden' readonly='readonly' form='form91_"+id+"' step='.01' value='"+result.tax_rate+"'>";
							rowsHTML+="<input type='hidden' form='form91_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form91_"+id+"' id='save_form91_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form91_"+id+"' id='delete_form91_"+id+"' onclick='form91_delete_item($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form91_body').append(rowsHTML);					
				});
				
				form91_get_totals();

				var bt=get_session_var('title');
				$('#form91_share').show();
				$('#form91_share').click(function()
				{
					modal101_action(bt+' - Invoice# '+filter_fields.elements['bill_num'].value,filter_fields.elements['customer'].value,'customer',function (func) 
					{
						print_form91(func);
					});
				});
				$('textarea').autosize();
				hide_loader();
			});
		});
	}
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
			get_export_data(columns,'Loans');
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
		"<storage></storage>"+
		"<reason></reason>"+
		"<status exact='yes'>pending approval</status>"+
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
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<textarea readonly='readonly' form='form94_"+result.id+"'>"+result.product_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form94_"+result.id+"' value='"+result.batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form94_"+result.id+"' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Reason'>";
						rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form94_"+result.id+"'>"+result.reason+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form94_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='hidden' form='form94_"+result.id+"' value='"+result.storage+"'>";
						rowsHTML+="<input type='submit' class='save_icon' title='Save' form='form94_"+result.id+"'>";
						//rowsHTML+="<input type='button' class='delete_icon' title='Delete' form='form94_"+result.id+"' onclick='form94_delete_item($(this));'>";
						rowsHTML+="<br><input type='button' class='generic_icon' title='Don\'t Reject' value='Approve' form='form94_"+result.id+"'>";
						rowsHTML+="<br><input type='button' class='generic_icon' title='Reject' value='Reject' form='form94_"+result.id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form94_body').append(rowsHTML);
			var fields=document.getElementById("form94_"+result.id);
			//var storage_filter=fields.elements[3];
			var accept_button=fields.elements[7];
			var reject_button=fields.elements[8];
			
/*			var storage_xml="<store_areas>"+
							"<name></name>"+
							"</store_areas>";
			set_my_value_list(storage_xml,storage_filter);
*/			
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form94_update_item(fields);
			});

			$(accept_button).on("click",function(event)
			{
				event.preventDefault();
				form94_accept_item(fields);
			});

			$(reject_button).on("click",function(event)
			{
				event.preventDefault();
				form94_reject_item(fields);
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
			get_export_data(columns,'Discarded Items');
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
									rowsHTML+="<br><input type='button' class='generic_icon' form='form101_"+result.id+"' name='schedule' value='Schedule' onclick=\"element_display('"+result.id+"','form135');\">";
								}
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form101_body').append(rowsHTML);
					
					var fields=document.getElementById("form101_"+result.id);
					var status_filter=fields.elements[3];
					var schedule_button=fields.elements['schedule'];					
					
					if(!is_form_access('form135'))
					{
						$(schedule_button).hide();
					}
					
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
				get_export_data(columns,'Projects');
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
	var fchannel=filter_fields.elements[0].value;
	var fnum=filter_fields.elements[1].value;
	var fname=filter_fields.elements[2].value;
	var fdate=get_raw_time(filter_fields.elements[3].value);
	var fstatus=filter_fields.elements[4].value;
	
	////indexing///
	var index_element=document.getElementById('form108_index');
	var prev_element=document.getElementById('form108_prev');
	var next_element=document.getElementById('form108_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var order_date_string="<order_date></order_date>";
	if(fdate!="")
	{
		order_date_string="<order_date lowerbound='yes'>"+(fdate-1000)+"</order_date>"+
						"<order_date upperbound='yes'>"+(fdate+86390000)+"</order_date>";
			
	}
	
	var columns="<sale_orders count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<order_num>"+fnum+"</order_num>"+
			"<customer_name>"+fname+"</customer_name>" +
			"<channel>"+fchannel+"</channel>"+			
			"<order_date></order_date>" +
			"<status>"+fstatus+"</status>" +
			"<bill_id></bill_id>"+
			"<return_id></return_id>"+
			order_date_string+
			"<billing_type></billing_type>"+
			"</sale_orders>";

	$('#form108_body').html("");

	fetch_requested_data('form108',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var row_color="default_row";
			
			switch(result.status) 
			{
				case 'dispatched':row_color='grey_row';
									break;
				case 'packed':row_color='blue_row';
								break;
				case 'picked':row_color='orange_row';
								break;
				case 'billed':row_color='yellow_row';
								break;
				case 'pending':row_color='red_row';
								break;
				case 'partially packed':row_color='blue_row';
								break;
				case 'partially picked':row_color='orange_row';
								break;
				case 'partially billed':row_color='yellow_row';
								break;
													
			}
			var rowsHTML="";
			rowsHTML+="<tr class='"+row_color+"'>";
				rowsHTML+="<form id='form108_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Channel'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form108_"+result.id+"' value='"+result.channel+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Order #'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form108_"+result.id+"' value='"+result.order_num+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form108_"+result.id+"'>"+result.customer_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Order Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form108_"+result.id+"' value='"+get_my_past_date(result.order_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form108_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form108_"+result.id+"' value='"+result.id+"' name='id'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form108_"+result.id+"' title='Edit order' onclick=\"element_display('"+result.id+"','form69');\">";
						rowsHTML+="<input type='button' class='submit_hidden' form='form108_"+result.id+"' title='Save order'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form108_"+result.id+"' title='Delete order' onclick='form108_delete_item($(this));'>";
					if(result.status!='closed' && result.status!='cancelled' && result.status!='billed' && result.status!='picked' && result.status!='packed' && result.status!='dispatched')
					{
						rowsHTML+="<br><input type='button' class='generic_icon' form='form108_"+result.id+"' name='create' value='Create Bill'>";
					}
					if(result.status!='pending')
					{
						rowsHTML+="<br><input type='button' class='generic_icon' form='form108_"+result.id+"' name='view' value='View Bill'>";
					}
					if(result.status=='return initiated')
					{
						rowsHTML+="<br><input type='button' class='generic_icon' name='return' form='form108_"+result.id+"' name='issue_grn' value='Issue GRN'>";
					}					
					else if(result.status=='return received' || result.status=='return closed')
					{
						rowsHTML+="<br><input type='button' class='generic_icon' name='return' form='form108_"+result.id+"' name='view_return' value='View Return'>";
					}					
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form108_body').append(rowsHTML);
			var fields=document.getElementById("form108_"+result.id);
			var create_bill_button=fields.elements['create'];
			var view_bill_button=fields.elements['view'];
			var status_filter=fields.elements[4];
			
			//set_static_value_list('sale_orders','status',status_filter);

			$(create_bill_button).off('click');
			$(create_bill_button).on('click',function(event)
			{
				modal133_action(result.id,result.channel,result.order_num,result.customer_name,result.billing_type,result.order_date,result.bill_id);
			});

			$(view_bill_button).off('click');
			$(view_bill_button).on('click',function(event)
			{
				modal154_action(result.bill_id);
			});
	
			if(result.status=='return initiated')
			{
				var return_button=fields.elements['return'];
				$(return_button).on('click',function(event)
				{
					element_display('','form15');
					var form15_master=document.getElementById('form15_master');
					form15_master.elements['customer']=result.customer_name;
					form15_master.elements['channel']=result.channel;
					form15_master.elements['order_num']=result.order_num;
					form15_master.elements['order_id']=result.order_id;
				});
			}
			else if(result.status=='return received' || result.status=='return closed')
			{
				var return_button=fields.elements['return'];
				$(return_button).on('click',function(event)
				{
					element_display(result.return_id,'form15');
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
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[5];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data(columns,'Sale Orders');
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
			get_export_data(columns,'Product Attributes');
		});
		hide_loader();
	});
};

/**
 * @form Manage Sale Challans
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
	var fstatus=filter_fields.elements[2].value;
	////indexing///
	var index_element=document.getElementById('form113_index');
	var prev_element=document.getElementById('form113_prev');
	var next_element=document.getElementById('form113_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<unbilled_sale_items count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<customer>"+fcustomer+"</customer>" +
			"<item_name>"+fitem+"</item_name>" +
			"<batch></batch>" +
			"<quantity></quantity>" +
			"<sale_date></sale_date>" +
			"<amount></amount>"+
			"<tax></tax>"+
			"<total></total>"+
			"<mrp></mrp>"+
			"<bill_status>"+fstatus+"</bill_status>"+
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
						rowsHTML+="<textarea readonly='readonly' title='"+get_my_past_date(result.sale_date)+"' form='form113_"+result.id+"'>"+result.customer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form113_"+result.id+"' value='"+result.item_name+"'>";
						rowsHTML+="<br><textarea readonly='readonly' form='form113_"+result.id+"'>"+result.item_desc+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form113_"+result.id+"' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Total'>";
						rowsHTML+="<input type='number' step='any' title='Amount: Rs. "+result.amount+"\nTax: Rs. "+result.tax+"' readonly='readonly' form='form113_"+result.id+"' value='"+result.total+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form113_"+result.id+"' value='"+result.bill_status+"'>";
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
			get_export_data(columns,'Sale Challans');
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
	var fstatus=filter_fields.elements[2].value;
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
			"<item_desc></item_desc>" +
			"<batch></batch>" +
			"<quantity></quantity>" +
			"<purchase_date></purchase_date>" +
			"<unit_price></unit_price>"+
			"<amount></amount>"+
			"<tax></tax>"+
			"<total></total>"+
			"<bill_status>"+fstatus+"</bill_status>"+
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
						rowsHTML+="<textarea readonly='readonly' title='"+get_my_past_date(result.purchase_date)+"' form='form115_"+result.id+"'>"+result.supplier+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Item Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form115_"+result.id+"' value='"+result.item_name+"'>";
						rowsHTML+="<br><textarea readonly='readonly' form='form115_"+result.id+"'>"+result.item_desc+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form115_"+result.id+"' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Total'>";
						rowsHTML+="<input type='number' step='any' title='Amount: Rs. "+result.amount+"\nTax: Rs. "+result.tax+"' readonly='readonly' form='form115_"+result.id+"' value='"+result.total+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form115_"+result.id+"' value='"+result.bill_status+"'>";
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
			get_export_data(columns,'Purchase Challans');
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
			get_export_data(columns,'Loyalty Programs');
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
				results.forEach(function(result)
				{
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
				
				var subject="Bill from "+get_session_var('title');
				$('#form119_share').show();
				$('#form119_share').click(function()
				{
					modal101_action(bt+' - bill # '+filter_fields.elements[4].value,filter_fields.elements[1].value,'customer',function (func) 
					{
						print_form119(func);
					});
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
			get_export_data(columns,'loyalty_customers');
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
			get_export_data(columns,'loyalty_points');
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
		var bill_columns="<supplier_bills count='1'>" +
					"<id>"+bill_id+"</id>" +
					"<bill_id></bill_id>" +
					"<order_id></order_id>" +
					"<order_num></order_num>" +
					"<supplier></supplier>" +
					"<bill_date></bill_date>" +
					"<entry_date></entry_date>" +
					"<total></total>" +
					"<discount></discount>" +
					"<amount></amount>" +
					"<tax></tax>" +
					"<cst></cst>"+
					"<transaction_id></transaction_id>" +
					"</supplier_bills>";
		
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			if (bill_results.length>0)
			{
				var filter_fields=document.getElementById('form122_master');
				filter_fields.elements['supplier'].value=bill_results[0].supplier;
				filter_fields.elements['order_id'].value=bill_results[0].order_id;
				filter_fields.elements['po_num'].value=bill_results[0].order_num;
				filter_fields.elements['bill_num'].value=bill_results[0].bill_id;
				filter_fields.elements['bill_date'].value=get_my_past_date(bill_results[0].bill_date);
				filter_fields.elements['entry_date'].value=get_my_past_date(bill_results[0].entry_date);
				filter_fields.elements['bill_id'].value=bill_id;
				filter_fields.elements['t_id'].value=bill_results[0].transaction_id;
				var unbilled_button=filter_fields.elements['unbilled_button'];
				var unbilled=filter_fields.elements['unbilled'];
				//$(unbilled).parent().hide();
				//$(unbilled_button).parent().hide();
				var save_button=filter_fields.elements['save'];
				var share_button=filter_fields.elements['share'];
				
				filter_fields.elements['cst'].checked=false;
				if(bill_results[0].cst=='yes')
				{
					filter_fields.elements['cst'].checked=true;				
				}

				var bt=get_session_var('title');

				$(share_button).show();
				$(share_button).click(function()
				{
					modal101_action(bt+' - Purchase bill # '+filter_fields.elements['bill_num'].value,filter_fields.elements['supplier'].value,'supplier',function (func) 
					{
						print_form122(func);
					});
				});
								
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form122_update_form();
				});
			}
		});
		
		var bill_items_column="<supplier_bill_items>" +
				"<id></id>" +
				"<product_name></product_name>" +
				"<item_desc></item_desc>"+
				"<batch></batch>" +
				"<quantity></quantity>" +
				"<unit_price></unit_price>"+
				"<mrp></mrp>"+
				"<amount></amount>"+
				"<tax></tax>"+
				"<po_price></po_price>"+
				"<po_amount></po_amount>"+
				"<po_tax></po_tax>"+
				"<total></total>"+
				"<storage></storage>"+
				"<qc></qc>"+
				"<qc_comments></qc_comments>"+
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
				"</supplier_bill_items>";
		
		fetch_requested_data('',bill_items_column,function(results)
		{
			results.forEach(function(result)
			{
				var id=result.id;
				var rowsHTML="<tr>";
				rowsHTML+="<form id='form122_"+id+"' autocomplete='off'></form>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<input type='hidden' form='form122_"+id+"'>";
						rowsHTML+="<b>SKU</b>: <input type='text' form='form122_"+id+"' value='"+result.product_name+"' required readonly='readonly'>";
						rowsHTML+="<br><b>Name</b>: <textarea readonly='readonly' form='form122_"+id+"' readonly='readonly'>"+result.item_desc+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+="<input type='text' form='form122_"+id+"' value='"+result.batch+"' required readonly='readonly'>";
						rowsHTML+="<br><b>Quantity</b>: <input type='number' form='form122_"+id+"' value='"+result.quantity+"' required step='any' readonly='readonly'>";
						rowsHTML+="<br><b>MRP</b>: <input type='number' form='form122_"+id+"' value='"+result.mrp+"' required step='any' readonly='readonly'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Bill Price'>";
						rowsHTML+="<b>Unit Price</b>: Rs. <input type='number' form='form122_"+id+"' value='"+result.unit_price+"' step='any' readonly='readonly'>";
						rowsHTML+="<br><b>Amount</b>: Rs. <input type='number' readonly='readonly' form='form122_"+id+"' value='"+result.amount+"' step='any' readonly='readonly'>";
						rowsHTML+="<br><b>Tax</b>: Rs. <input type='number' readonly='readonly' form='form122_"+id+"' value='"+result.tax+"' step='any' readonly='readonly'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='PO Price'>";
						rowsHTML+="<b>Unit Price</b>: Rs. <input type='number' form='form122_"+id+"' value='"+result.po_price+"' step='any' readonly='readonly'>";
						rowsHTML+="<br><b>Amount</b>: Rs. <input type='number' readonly='readonly' form='form122_"+id+"' value='"+result.po_amount+"' step='any' readonly='readonly'>";
						rowsHTML+="<br><b>Tax</b>: Rs. <input type='number' readonly='readonly' form='form122_"+id+"' value='"+result.po_tax+"' step='any' readonly='readonly'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Check'>";
						rowsHTML+="<input type='text' form='form122_"+id+"' value='"+result.qc+"' readonly='readonly'>";
						if(result.qc=='accepted')
							rowsHTML+=" <img src='./images/green_circle.png' class='green_circle'>";
						else
							rowsHTML+=" <img src='./images/red_circle.png' class='red_circle'>";
						rowsHTML+="<br><b>Comments</b>: <textarea form='form122_"+id+"' readonly='readonly'>"+result.qc_comments+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form122_"+id+"' value='"+result.storage+"'>";
						rowsHTML+="<input type='hidden' form='form122_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='button' class='submit_hidden' form='form122_"+id+"' id='save_form122_"+id+"' >";	
						rowsHTML+="<input type='button' class='delete_icon' form='form122_"+id+"' id='delete_form122_"+id+"' onclick='form122_delete_item($(this));'>";
						rowsHTML+="<input type='button' class='submit_hidden' form='form122_"+id+"'>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form122_body').prepend(rowsHTML);
				
			});
			form122_get_totals();
			$('textarea').autosize();
			hide_loader();
		});
	}
}


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
	//var ftype=filter_fields.elements[1].value;
	var faccount=filter_fields.elements[1].value;
	//var pid=filter_fields.elements[3].value;
	
	////indexing///
	var index_element=document.getElementById('form124_index');
	var prev_element=document.getElementById('form124_prev');
	var next_element=document.getElementById('form124_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<receipts count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<receipt_id>"+rid+"</receipt_id>" +
			//"<type>"+ftype+"</type>" +
			"<acc_name>"+faccount+"</acc_name>" +
			//"<payment_id>"+pid+"</payment_id>" +
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
					//rowsHTML+="<td data-th='Type'>";
					//	rowsHTML+="<input type='text' readonly='readonly' form='form124_"+result.id+"' value='"+result.type+"'>";
					//rowsHTML+="</td>";
					rowsHTML+="<td data-th='Account'>";
						rowsHTML+="<textarea readonly='readonly' form='form124_"+result.id+"'>"+result.acc_name+"</textarea>";
					rowsHTML+="</td>";
					//rowsHTML+="<td data-th='Payment Id'>";
					//	rowsHTML+="<input type='text' readonly='readonly' form='form124_"+result.id+"' value='"+result.payment_id+"'>";
					//rowsHTML+="</td>";
					rowsHTML+="<td data-th='Amount'>";
						rowsHTML+="<input type='number' readonly='readonly' form='form124_"+result.id+"' value='"+result.amount+"'>";
						rowsHTML+="<input type='hidden' form='form124_"+result.id+"' value='"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Document'>";
						rowsHTML+="<br><div id='form124_documents_"+result.id+"'></div>";
						rowsHTML+="<input type='button' form='form124_"+result.id+"' value='Add document' class='generic_icon'>";
					rowsHTML+="</td>";				
			rowsHTML+="</tr>";
			
			$('#form124_body').append(rowsHTML);
			var fields=document.getElementById('form124_'+result.id);
			var doc_filter=fields.elements[4];
					
			$(doc_filter).on('click',function () 
			{
				modal144_action('receipts',result.id,function (url,doc_name) 
				{
					var docHTML="<a href='"+url+"' download='"+doc_name+"'><u>"+doc_name+"</u></a><br>";
					var doc_container=document.getElementById('form124_documents_'+result.id);
					$(doc_container).append(docHTML);
				});
			});
			
			var doc_column="<documents>" +
							"<id></id>" +
							"<url></url>" +
							"<doc_name></doc_name>"+
							"<doc_type exact='yes'>receipts</doc_type>" +
							"<target_id exact='yes'>"+result.id+"</target_id>" +
							"</documents>";
			fetch_requested_data('form124',doc_column,function(doc_results)
			{
				var docHTML="";
				for (var j in doc_results)
				{
					var updated_url=doc_results[j].url.replace(/ /g,"+");
					docHTML+="<a href='"+updated_url+"' download='"+doc_results[j].doc_name+"'><u>"+doc_results[j].doc_name+"</u></a><br>";							
				}
				document.getElementById('form124_documents_'+result.id).innerHTML=docHTML;
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
			get_export_data(columns,'receipts');
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
			get_export_data(columns,'customer_accounts');
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
			get_export_data(columns,'issues');
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
				get_export_data(columns,'service_requests');
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
		$("#modal6_link").click();
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
				get_export_data(columns,'tasks');
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
				$('textarea').autosize();				
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
				$('textarea').autosize();
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
				$('textarea').autosize();		
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
				$('textarea').autosize();
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
				"<order_id></order_id>" +
				"<order_num></order_num>" +
				"</supplier_bills>";
		
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			if (bill_results.length>0)
			{
				var filter_fields=document.getElementById('form136_master');
				filter_fields.elements['supplier'].value=bill_results[0].supplier;
				filter_fields.elements['bill_num'].value=bill_results[0].bill_id;
				filter_fields.elements['bill_date'].value=get_my_past_date(bill_results[0].bill_date);
				filter_fields.elements['entry_date'].value=get_my_past_date(bill_results[0].entry_date);
				filter_fields.elements['id'].value=bill_id;
				filter_fields.elements['order_id'].value=bill_results[0].order_id;
				filter_fields.elements['po_num'].value=bill_results[0].order_num;
				var save_button=filter_fields.elements['save'];

				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form136_update_form();
				});
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
				"<po_price></po_price>"+
				"<po_amount></po_amount>"+
				"<po_tax></po_tax>"+				
				"<quantity></quantity>" +
				"<storage></storage>" +
				"<qc></qc>"+
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
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<textarea readonly='readonly' form='form136_"+id+"'>"+result.product_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form136_"+id+"' value='"+result.batch+"'>";
						rowsHTML+="<img src='./images/barcode.png' class='barcode_icon' title='Print Barcode - "+id+"' onclick=\"print_product_barcode('"+id+"','"+result.product_name+"','"+result.batch+"');\">";
						rowsHTML+="<br><b>Quantity</b>: <input type='number' readonly='readonly' form='form136_"+id+"' value='"+result.quantity+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Bill Price'>";
						rowsHTML+="<b>Unit Price</b>: <input type='number' readonly='readonly' form='form136_"+id+"' value='"+result.unit_price+"' step='any'>";
						rowsHTML+="<br><b>Amount</b>: <input type='number' readonly='readonly' form='form136_"+id+"' value='"+result.amount+"' step='any'>";
						rowsHTML+="<br><b>Tax</b>: <input type='number' readonly='readonly' form='form136_"+id+"' value='"+result.tax+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='PO Price'>";
						rowsHTML+="<b>Unit Price</b>: <input type='number' readonly='readonly' form='form136_"+id+"' value='"+result.po_price+"' step='any'>";
						rowsHTML+="<br><b>Total</b>: <input type='number' readonly='readonly' form='form136_"+id+"' value='"+result.po_amount+"' step='any'>";
						rowsHTML+="<br><b>Tax</b>: <input type='number' readonly='readonly' form='form136_"+id+"' value='"+result.po_tax+"' step='any'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Storage Area'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form136_"+id+"' value='"+result.storage+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						if(result.qc=='accepted')
						{						
							rowsHTML+=" <img id='form136_check_image_"+id+"' src='./images/green_circle.png' class='green_circle' title='Accepted' data-accepted='accepted'>";
						}else {
							rowsHTML+=" <img id='form136_check_image_"+id+"' src='./images/red_circle.png' class='red_circle' title='Rejected' data-accepted='rejected'>";
						}
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
			form136_get_totals();
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
		project_id=fields.elements['id'].value;
	}
	else
	{
		fields.elements['id'].value=project_id;
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
			"<expense_date></expense_date>"+
			"<status></status>" +
			"</expenses>";

		var filter_fields=document.getElementById('form137_master');
				
		fetch_requested_data('',project_columns,function(project_results)
		{
			for (var i in project_results)
			{
				filter_fields.elements['name'].value=project_results[i].name;
				filter_fields.elements['id'].value=project_results[i].id;
				
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
				var total_expense=0;
				var total_approved=0;
				
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
						rowsHTML+="<form id='form137_rows_"+id+"'></form>";
							rowsHTML+="<td data-th='Person'>";
								rowsHTML+="<textarea readonly='readonly' form='form137_rows_"+id+"'>"+result.person+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Amount'>";
								rowsHTML+="Rs. <input type='number' readonly='readonly' form='form137_rows_"+id+"' value='"+result.amount+"' step='any'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<textarea readonly='readonly' form='form137_rows_"+id+"'>"+result.detail+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Date'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form137_rows_"+id+"' value='"+get_my_past_date(result.expense_date)+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form137_rows_"+id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form137_rows_"+id+"' value='"+id+"'>";
							if(update && result.status=='submitted')
							{
								rowsHTML+="<input type='button' class='generic_icon' value='Approve' form='form137_rows_"+id+"' onclick='form137_approve_item($(this))'>";
								rowsHTML+="<input type='button' class='generic_icon' value='Reject' form='form137_rows_"+id+"' onclick='form137_reject_item($(this))'>";
							}
							if(del && result.status=='submitted')
							{
								rowsHTML+="<input type='button' class='delete_icon' form='form137_rows_"+id+"' id='delete_form137_rows_"+id+"' onclick='form137_delete_item($(this)); form137_get_totals();'>";
							}
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
						if(result.amount!="")
						{
							if(result.status=='approved')
							{
								total_expense+=parseFloat(result.amount);
								total_approved+=parseFloat(result.amount);
							}
							else if(result.status=='submitted')
							{
								total_expense+=parseFloat(result.amount);
							}
						}			
						$('#form137_body').append(rowsHTML);
					}
				});
				$('textarea').autosize();
				filter_fields.elements['expense'].value=total_expense;
				filter_fields.elements['approved'].value=total_approved;				
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
			get_export_data(columns,'sale_orders');
		});
		hide_loader();
	});
};

/**
 * @form Project Budgeting
 * @formNo 144
 * @Loading light
 */
function form144_ini()
{
	var filter_fields=document.getElementById('form144_master');
	var project_id=filter_fields.elements['project_id'].value;
	
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
				filter_fields.elements['project'].value=project_results[0].name;
				//filter_fields.elements[2].value=project_results[0].details;
				//filter_fields.elements[3].value=project_results[0].status;
				var hours_filter=filter_fields.elements['hours'];
			
				var timesheet_data="<timesheet>"+
							"<hours_worked></hours_worked>"+
							"<source exact='yes'>project</source>"+
							"<source_name exact='yes'>"+project_results[0].name+"</source_name>"+
							"</timesheet>";
				fetch_requested_data('',timesheet_data,function(times)
				{
					var total_hours=0;
					for(var i in times)
					{
						total_hours+=parseFloat(times[i].hours_worked);
					}
					hours_filter.value=total_hours;
				});								
			}
			/////////////project tasks////////////////////
			
			var budget_estimate_filter=filter_fields.elements['estimate'];
			var budget_actual_filter=filter_fields.elements['actual'];
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
			get_export_data(columns,'manufacturing_schedule');
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
			get_export_data(columns,'roles');
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
								"<br><u>"+feed_result.owner+"</u>: <div class='feed_detail'>"+feed_result.content_detail+"</div>"+
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
						var comments_content_item="<label><u>"+comment_results[i].person+"</u>: "+comment_results[i].comment_text;
						if(feed_result.owner==delete_right || comment_results[i].person==delete_right)
						{
							comments_content_item+=" <a class='small_cross_icon' onclick=\"delete_feed_comment('"+comment_results[i].id+"',$(this));\" title='Delete comment'>&#10006;</a>";
						}
						comments_content_item+="</label><br>";
						comments_content=comments_content_item+comments_content;
					}
					comments_content+="<label><u>"+account_name+"</u>: <textarea class='feed_comments' placeholder='comment..'></textarea></label>";
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
		fid="";
	var	fnum=filter_fields.elements[0].value;
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
			"<quot_num>"+fnum+"</quot_num>" +
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
							rowsHTML+="<td data-th='Quot #'>";
								rowsHTML+="<input type='text' readonly='readonly' class='input_link' form='form152_"+result.id+"' value='"+result.quot_num+"' onclick=\"element_display('"+result.id+"','form153');\">";
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
								rowsHTML+="<input type='text' readonly='readonly' form='form152_"+result.id+"' value='"+Math.round(result.total)+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form152_"+result.id+"' value='"+result.id+"'>";
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
			
			var export_button=filter_fields.elements['export'];
			$(export_button).off("click");
			$(export_button).on("click", function(event)
			{
				get_export_data(columns,'Quotations');
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
				"<quot_num></quot_num>" +
				"<customer></customer>" +
				"<total></total>" +
				"<date></date>" +
				"<amount></amount>" +
				"<discount></discount>" +
				"<tax></tax>" +
				"<tax_rate></tax_rate>" +
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
				filter_fields.elements['customer'].value=quot_results[i].customer;
				filter_fields.elements['type'].value=quot_results[i].billing_type;
				filter_fields.elements['date'].value=get_my_past_date(quot_results[i].date);
				filter_fields.elements['notes'].value=quot_results[i].intro_notes;								
				filter_fields.elements['quot_num'].value=quot_results[i].quot_num;								
				filter_fields.elements['quot_id'].value=quot_id;				
				var save_button=filter_fields.elements['save'];
				
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
							"<td>Amount:</br>Discount: </br>Tax:@ <input type='number' value='"+quot_results[i].tax_rate+"' step='any' id='form153_tax' class='dblclick_editable'>% </br>Total: </td>" +
							"<td>Rs. "+quot_results[i].amount+"</br>" +
							"Rs. <input type='number' value='"+quot_results[i].discount+"' step='any' id='form153_discount' class='dblclick_editable'><br>" +
							"Rs. "+quot_results[i].tax+"<br>" +
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
							rowsHTML+="<input type='number' readonly='readonly' form='form153_"+id+"' value='"+result.quantity+"' step='any'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form153_"+id+"' value='"+result.unit+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Unit Price'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form153_"+id+"' value='"+result.unit_price+"' step='any'>";
						if(hiring)
						{	rowsHTML+="/day";  }	
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form153_"+id+"' value='"+Math.round(result.amount).toFixed(2)+"'>";
						if(hiring)
						{	rowsHTML+="/day";  }	
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form153_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form153_"+id+"' id='save_form153_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form153_"+id+"' id='delete_form153_"+id+"' onclick='form153_delete_item($(this)); form153_get_totals();'>";
							rowsHTML+="<input type='hidden' form='form153_"+id+"'>";
							rowsHTML+="<input type='hidden' form='form153_"+id+"'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form153_body').append(rowsHTML);					
				});
				
				var bt=get_session_var('title');
				$('#form153_share').show();
				$('#form153_share').click(function()
				{
					modal101_action("Quotation from "+bt+' - '+filter_fields.elements['quot_num'].value,filter_fields.elements['customer'].value,'customer',function (func) 
					{
						print_form153(func);
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
				"<tax_rate></tax_rate>"+
				"<billing_type></billing_type>" +
				"<tax_type></tax_type>"+
				"<type></type>" +
				"<transaction_id></transaction_id>" +
				"<storage></storage>"+
				"<print_1_job></print_1_job>"+
				"<notes></notes>"+
				"</bills>";
		var bill_items_column="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<item_desc></item_desc>"+
				"<unit_price></unit_price>" +
				"<quantity></quantity>" +
				"<unit></unit>"+				
				"<amount></amount>" +
				"<total></total>" +
				"<discount></discount>" +
				"<type></type>" +
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
				"<tax></tax>" +
				"<from_date></from_date>"+
				"<to_date></to_date>"+
				"<fresh></fresh>"+
				"</bill_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			var filter_fields=document.getElementById('form154_master');
			var hiring=false;
			var a1_job=document.getElementById('form154_1job');

			for (var i in bill_results)
			{
				filter_fields.elements['customer'].value=bill_results[i].customer_name;
				filter_fields.elements['bill_type'].value=bill_results[i].billing_type;
				filter_fields.elements['store'].value=bill_results[i].storage;
				filter_fields.elements['date'].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements['narration'].value=bill_results[i].notes;
				filter_fields.elements['bill_total'].value=bill_results[i].total;
				var tax_type_filter=filter_fields.elements['tax_type'];
				tax_type_filter.value=bill_results[i].tax_type;
				var cform_filter=filter_fields.elements['cform'];
				
				var tax_text="VAT";
				if(filter_fields.elements['tax_type'].value=="Retail Central" || filter_fields.elements['tax_type'].value=="CST")
				{
					tax_text="CST";
				}
				
				$(tax_type_filter).parent().hide();
				
				if(bill_results[i].print_1_job=='yes')
				{
					filter_fields.elements['job'].checked=true;
				}			
				else 
				{
					filter_fields.elements['job'].checked=false;
				}

				if(filter_fields.elements['bill_type'].value=='Retail')
				{
					$(cform_filter).parent().show();
				}
				else
				{
					$(cform_filter).parent().hide();
				}

				if(bill_results[i].cform=='yes')
				{
					cform_filter.checked=true;
				}			
				else 
				{
					cform_filter.checked=false;
				}
				
				filter_fields.elements['bill_num'].value=bill_results[i].bill_num;
				filter_fields.elements['bill_id'].value=bill_id;				
				filter_fields.elements['t_id'].value=bill_results[i].transaction_id;
				var save_button=filter_fields.elements['save'];
				filter_fields.elements['bill_type'].setAttribute('readonly','readonly');
				filter_fields.elements['store'].setAttribute('readonly','readonly');
				var cst_filter=filter_fields.elements['cst'];
				var tin_filter=filter_fields.elements['tin'];

				if(filter_fields.elements['bill_type'].value=='Hiring')
				{
					hiring=true;
				}

				if(filter_fields.elements['bill_type'].value=='Retail' || filter_fields.elements['bill_type'].value=='Tax')
				{
					var cst_data="<attributes>"+
								"<value></value>"+
								"<type exact='yes'>customer</type>"+
								"<attribute exact='yes'>CST#</attribute>"+
								"<name exact='yes'>"+bill_results[i].customer_name+"</name>"+
								"</attributes>";
					set_my_value(cst_data,cst_filter);

					var tin_data="<attributes>"+
								"<value></value>"+
								"<type exact='yes'>customer</type>"+
								"<attribute exact='yes'>TIN#</attribute>"+
								"<name exact='yes'>"+bill_results[i].customer_name+"</name>"+
								"</attributes>";
					set_my_value(tin_data,tin_filter);
				}
								
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

				var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Amount:<disc><br>Discount: </disc><br>"+tax_text+":@ <input type='number' value='"+bill_results[i].tax_rate+"' step='any' id='form154_tax' class='dblclick_editable'>%<br>Cartage: <br>Total: </td>" +
							"<td>Rs. "+Math.round(bill_results[i].amount).toFixed(2)+"</br>" +
							"<disc_amount>Rs. <input type='number' value='"+Math.round(bill_results[i].discount).toFixed(2)+"' step='any' id='form154_discount' class='dblclick_editable'><br></disc_amount>" +
							"Rs. "+Math.round(bill_results[i].tax).toFixed(2)+" <br>" +
							"Rs. <input type='number' value='"+Math.round(bill_results[i].cartage).toFixed(2)+"' step='any' id='form154_cartage' class='dblclick_editable'><br>" +
							"Rs. "+Math.round(bill_results[i].total).toFixed(2)+"</td>" +
							"<td></td>" +
							"</tr>";
				
				var headHTML="<tr><form id='form154_header'></form>"+
							"<th style='width:50px'>S.No.</th>"+
							"<th style='min-width:200px'>Item</th>"+
							"<th>Qty.</th>"+
							"<th>Rate</th>"+
							"<th>Amount</th>"+
							"<th><input type='button' title='Add Service' class='add_icon' onclick='form154_add_service();'></th>"+
							"</tr>";
					
				if(hiring)
				{				
					total_row="<tr><td colspan='4' data-th='Total'>Total</td>" +
							"<td>Amount:<disc><br>Discount: </disc><br>Service Tax @ <input type='number' value='"+bill_results[i].tax_rate+"' step='any' id='form154_tax' class='dblclick_editable'><br>Cartage: <br>Total: </td>" +
							"<td>Rs. "+Math.round(bill_results[i].amount).toFixed(2)+"</br>" +
							"<disc_amount>Rs. <input type='number' value='"+Math.round(bill_results[i].discount).toFixed(2)+"' step='any' id='form154_discount' class='dblclick_editable'><br></disc_amount>" +
							"Rs. "+Math.round(bill_results[i].tax).toFixed(2)+" <br>" +
							"Rs. <input type='number' value='"+Math.round(bill_results[i].cartage).toFixed(2)+"' step='any' id='form154_cartage' class='dblclick_editable'></br>" +
							"Rs. "+Math.round(bill_results[i].total).toFixed(2)+"</td>" +
							"<td></td>" +
							"</tr>";
							
					headHTML="<tr><form id='form154_header'></form>"+
							"<th style='width:50px'>S.No.</th>"+
							"<th style='min-width:200px'>Item</th>"+
							"<th>Qty.</th>"+
							"<th>Date</th>"+
							"<th>Rate</th>"+
							"<th>Amount</th>"+
							"<th><input type='button' title='Add Product' class='add_icon' onclick='form154_add_product();'></th>"+
							"</tr>";
					$(a1_job).show();				
				}
				else if(filter_fields.elements['bill_type'].value=='Retail' || filter_fields.elements['bill_type'].value=='Tax')
				{
					headHTML="<tr><form id='form154_header'></form>"+
							"<th style='width:50px'>S.No.</th>"+
							"<th style='min-width:200px'>Item</th>"+
							"<th>Qty.</th>"+
							"<th>Rate</th>"+
							"<th>Amount</th>"+
							"<th><input type='button' title='Add Product' class='add_icon' onclick='form154_add_product();'></th>"+
							"</tr>";
					$(tax_type_filter).parent().show();		
				}
				else
				{
					total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Amount:<disc><br>Discount: </disc><br>Service Tax @ <input type='number' value='"+bill_results[i].tax_rate+"' step='any' id='form154_tax' class='dblclick_editable'>% <br>Cartage: <br>Total: </td>" +
							"<td>Rs. "+Math.round(bill_results[i].amount).toFixed(2)+"</br>" +
							"<disc_amount>Rs. <input type='number' value='"+Math.round(bill_results[i].discount).toFixed(2)+"' step='any' id='form154_discount' class='dblclick_editable'><br></disc_amount>" +
							"Rs. "+Math.round(bill_results[i].tax).toFixed(2)+"<br>" +
							"Rs. <input type='number' value='"+Math.round(bill_results[i].cartage).toFixed(2)+"' step='any' id='form154_cartage' class='dblclick_editable'><br>" +
							"Rs. "+Math.round(bill_results[i].total).toFixed(2)+"</td>" +
							"<td></td>" +
							"</tr>";
				
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
							rowsHTML+="<td data-th='S.No.'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Item'>";
								rowsHTML+="<textarea readonly='readonly' form='form154_"+id+"'>"+result.item_name+"</textarea>";
							if(result.fresh=='yes')							
							{	rowsHTML+="<fresh><br>Fresh: <input type='checkbox' checked form='form154_"+id+"'></fresh>";}
							else	
							{	rowsHTML+="<fresh><br>Fresh: <input type='checkbox' form='form154_"+id+"'></fresh>";}
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Quantity'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form154_"+id+"' value='"+result.quantity+"' step='any'> <b>"+result.unit+"</b>";
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
									rowsHTML+="<input type='number' readonly='readonly' form='form154_"+id+"' value='"+Math.round(result.amount).toFixed(2)+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form154_"+id+"' value='"+id+"'>";
								rowsHTML+="<input type='button' class='submit_hidden' form='form154_"+id+"' id='save_form154_"+id+"'>";
								rowsHTML+="<input type='button' class='delete_icon' form='form154_"+id+"' id='delete_form154_"+id+"' onclick='form154_delete_hiring_item($(this)); form154_get_totals();'>";
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
					
						$('#form154_body').prepend(rowsHTML);
					});
				}
				else
				{
					results.forEach(function(result)
					{
						var id=result.id;
						var rowsHTML="<tr>";
						rowsHTML+="<form id='form154_"+id+"'></form>";
							rowsHTML+="<td data-th='S.No.'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Item'>";
								rowsHTML+="<textarea readonly='readonly' form='form154_"+id+"'>"+result.item_name+"</textarea>";
								if(result.item_desc!='undefined' || result.item_desc!="")
								{							
									rowsHTML+="<br>"+result.item_desc;
								}							
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Quantity'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form154_"+id+"' value='"+result.quantity+"' step='any'> <b>"+result.unit+"</b>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Rate'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form154_"+id+"' value='"+result.unit_price+"' step='any'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Amount'>";
									rowsHTML+="<input type='number' readonly='readonly' form='form154_"+id+"' value='"+Math.round(result.amount).toFixed(2)+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form154_"+id+"' value='"+id+"'>";
								rowsHTML+="<input type='button' class='submit_hidden' form='form154_"+id+"' id='save_form154_"+id+"'>";
								rowsHTML+="<input type='button' class='delete_icon' form='form154_"+id+"' id='delete_form154_"+id+"' onclick='form154_delete_item($(this)); form154_get_totals();'>";
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
					
						$('#form154_body').prepend(rowsHTML);	
					});
				}	
				form154_update_serial_numbers();
				$('textarea').autosize();
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
						rowsHTML+="Fresh: <input type='number' step='any' readonly='readonly' form='form155_"+result.id+"'>";
						rowsHTML+="<br>Hireable: <input type='number' step='any' readonly='readonly' form='form155_"+result.id+"'>";
						rowsHTML+="<br>Hired: <input type='number' step='any' readonly='readonly' form='form155_"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form155_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' title='Save' form='form155_"+result.id+"'>";
						rowsHTML+="<input type='button' class='generic_icon' value='Inventory' title='Update Inventory' form='form155_"+result.id+"' onclick=\"modal122_action('"+result.product_name+"')\">";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form155_body').append(rowsHTML);
			var fields=document.getElementById("form155_"+result.id);
			var fresh_inventory=fields.elements[3];
			var hireable_inventory=fields.elements[4];
			var hired_inventory=fields.elements[5];

			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form155_update_item(fields);
			});

			var hired_data="<bill_items sum='yes'>"+
							"<quantity></quantity>"+
							"<hired exact='yes'>yes</hired>"+
							"<from_date upperbound='yes'>"+get_my_time()+"</from_date>"+
							"<to_date lowerbound='yes'>"+(parseFloat(get_my_time())+86400000)+"</to_date>"+
							"<item_name exact='yes'>"+result.product_name+"</item_name>"+
							"</bill_items>";
			set_my_value(hired_data,hired_inventory);

			var hireable_data="<bill_items sum='yes'>"+
							"<quantity></quantity>"+
							"<hired exact='yes'>yes</hired>"+
							"<fresh exact='yes'>yes</fresh>"+
							"<item_name exact='yes'>"+result.product_name+"</item_name>"+
							"</bill_items>";
			set_my_value_func(hireable_data,hireable_inventory,function()
			{
				get_inventory(result.product_name,'',function(inventory)
				{
					fresh_inventory.value=parseFloat(inventory)-parseFloat(hireable_inventory.value);
				});
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

		var export_button=filter_fields.elements[1];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data(columns,'inventory');
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
								rowsHTML+="Fresh: <input type='number' step='any' readonly='readonly' form='form156_"+result.id+"'>";
								rowsHTML+="<br>Hireable: <input type='number' step='any' readonly='readonly' form='form156_"+result.id+"'>";
								rowsHTML+="<br>Hired: <input type='number' step='any' readonly='readonly' form='form156_"+result.id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form156_"+result.id+"' value='"+result.id+"'>";
							if(del)							
								rowsHTML+="<input type='button' class='delete_icon' form='form156_"+result.id+"' title='Delete' onclick='form156_delete_item($(this));'>";	
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form156_body').append(rowsHTML);
					var fields=document.getElementById("form156_"+result.id);
					var fresh_inventory=fields.elements[2];
					var hireable_inventory=fields.elements[3];
					var hired_inventory=fields.elements[4];
					var delete_button="";
					if(del)					
						delete_button=fields.elements[6];
					
					var hired_data="<bill_items sum='yes'>"+
									"<quantity></quantity>"+
									"<hired exact='yes'>yes</hired>"+
									"<from_date upperbound='yes'>"+get_my_time()+"</from_date>"+
									"<to_date lowerbound='yes'>"+(parseFloat(get_my_time())+86400000)+"</to_date>"+
									"<item_name exact='yes'>"+result.item_name+"</item_name>"+
									"<storage exact='yes'>"+result.name+"</storage>"+
									"</bill_items>";
					set_my_value(hired_data,hired_inventory);
		
					var hireable_data="<bill_items sum='yes'>"+
									"<quantity></quantity>"+
									"<hired exact='yes'>yes</hired>"+
									"<fresh exact='yes'>yes</fresh>"+
									"<item_name exact='yes'>"+result.item_name+"</item_name>"+
									"<storage exact='yes'>"+result.name+"</storage>"+
									"</bill_items>";
					set_my_value_func(hireable_data,hireable_inventory,function()
					{
						get_store_inventory(result.name,result.item_name,'',function(inventory)
						{
							fresh_inventory.value=parseFloat(inventory)-parseFloat(hireable_inventory.value);
						});
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
				get_export_data(columns,'store_placement');
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
									if(result.status!='received' && result.status!='cancelled')									
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
				get_export_data(columns,'store_movement');
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
				"<tax_rate></tax_rate>"+
				"<cartage></cartage>"+
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
				filter_fields.elements['supplier'].value=bill_results[i].supplier;
				filter_fields.elements['bill_num'].value=bill_results[i].bill_id;
				filter_fields.elements['date'].value=get_my_past_date(bill_results[i].bill_date);
				if(bill_results[i].imported=='yes')
					filter_fields.elements['imported'].checked=true;
				else
					filter_fields.elements['imported'].checked=false;
				filter_fields.elements['bill_id'].value=bill_id;
				filter_fields.elements['t_id'].value=bill_results[i].transaction_id;
				var save_button=filter_fields.elements['save'];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form158_update_form();
				});
				
				var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
							"<td>Amount:<br>Discount: <br>Tax:@ <input type='number' value='"+bill_results[i].tax_rate+"' step='any' id='form158_tax' class='dblclick_editable'>%<br>Cartage: <br>Total: </td>" +
							"<td>Rs. "+Math.round(bill_results[i].amount)+"</br>" +
							"<disc_amount>Rs. <input type='number' value='"+Math.round(bill_results[i].discount)+"' step='any' id='form158_discount' class='dblclick_editable'><br></disc_amount>" +
							"Rs. "+Math.round(bill_results[i].tax)+" <br>" +
							"Rs. <input type='number' value='"+Math.round(bill_results[i].cartage)+"' step='any' id='form158_cartage' class='dblclick_editable'><br>" +
							"Rs. "+Math.round(bill_results[i].total)+"</td>" +
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
					"<unit></unit>" +
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
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<textarea readonly='readonly' form='form158_"+id+"'>"+result.product_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form158_"+id+"' value='"+result.quantity+"' step='any'><b>"+result.unit+"</b>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="Unit Price: <input type='number' readonly='readonly' class='dblclick_editable' form='form158_"+id+"' value='"+result.unit_price+"' step='any'>";
							rowsHTML+="<br>Amount: <input type='number' readonly='readonly' form='form158_"+id+"' value='"+Math.round(result.amount)+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Storage'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form158_"+id+"' value='"+result.storage+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form158_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form158_"+id+"' id='save_form158_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form158_"+id+"' id='delete_form158_"+id+"' onclick='form158_delete_item($(this)); form158_get_totals();'>";
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
 * @form Checklist Items
 * @formNo 161
 * @Loading light
 */
function form161_ini()
{
	show_loader();
	var fid=$("#form161_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form161_header');
	
	var fcp=filter_fields.elements[0].value;
	var fstatus=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form161_index');
	var prev_element=document.getElementById('form161_prev');
	var next_element=document.getElementById('form161_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<checklist_items count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<checkpoint>"+fcp+"</checkpoint>" +
		"<desired_result></desired_result>" +
		"<status></status>" +
		"</checklist_items>";
	
	$('#form161_body').html("");
	
	fetch_requested_data('form161',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form161_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Checkpoint'>";
						rowsHTML+="<textarea readonly='readonly' form='form161_"+result.id+"'>"+result.checkpoint+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Desired Result'>";
						rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form161_"+result.id+"'>"+result.desired_result+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' class='dblclick_editable' readonly='readonly' form='form161_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form161_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' title='Save' form='form161_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' title='Delete' form='form161_"+result.id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form161_body').append(rowsHTML);
			var fields=document.getElementById("form161_"+result.id);
			var cp_filter=fields.elements[0];
			var status_filter=fields.elements[2];
			
			set_static_value_list('checklist_items','status',status_filter);			
			
			$(fields).on('submit',function(event)
			{
				event.preventDefault();
				form161_update_item(fields);
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
			get_export_data(columns,'checklist_items');
		});
		hide_loader();
	});
};

/**
 * @form Checklist Items
 * @formNo 162
 * @Loading light
 */
function form162_ini()
{
	show_loader();
	var fid=$("#form162_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form162_header');
	
	var fitem=filter_fields.elements[0].value;
	var fcp=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form162_index');
	var prev_element=document.getElementById('form162_prev');
	var next_element=document.getElementById('form162_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<checklist_mapping count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<checkpoint>"+fcp+"</checkpoint>" +
		"<desired_result></desired_result>" +
		"<item>"+fitem+"</item>" +
		"</checklist_mapping>";
	
	$('#form162_body').html("");
	
	fetch_requested_data('form162',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form162_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<textarea readonly='readonly' form='form162_"+result.id+"'>"+result.item+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Checkpoint'>";
						rowsHTML+="<textarea readonly='readonly' form='form162_"+result.id+"'><"+result.checkpoint+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Desired Result'>";
						rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form162_"+result.id+"'>"+result.desired_result+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form162_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' title='Save' form='form162_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' title='Delete' form='form162_"+result.id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form162_body').append(rowsHTML);
			var fields=document.getElementById("form162_"+result.id);
			
			$(fields).on('submit',function(event)
			{
				event.preventDefault();
				form162_update_item(fields);
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
			get_export_data(columns,'product_checklist');
		});
		hide_loader();
	});
};

/**
 * @form Product Dimensions
 * @formNo 163
 * @Loading light
 */
function form163_ini()
{
	show_loader();
	var fid=$("#form163_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form163_header');
	
	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form163_index');
	var prev_element=document.getElementById('form163_prev');
	var next_element=document.getElementById('form163_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<product_master count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<name>"+fname+"</name>" +
		"<len></len>" +
		"<breadth></breadth>" +
		"<height></height>" +
		"<volume></volume>" +
		"<unit></unit>"+
		"<weight></weight>"+
		"<packing></packing>"+
		"</product_master>";
	
	$('#form163_body').html("");
	
	fetch_requested_data('form163',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form163_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<textarea readonly='readonly' form='form163_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Size'>";
						rowsHTML+="Length: <input type='number' step='any' class='dblclick_editable' readonly='readonly' form='form163_"+result.id+"' value='"+result.len+"'>"+result.unit;
						rowsHTML+="<br>Breadth: <input type='number' step='any' class='dblclick_editable' readonly='readonly' form='form163_"+result.id+"' value='"+result.breadth+"'>"+result.unit;
						rowsHTML+="<br>Height: <input type='number' step='any' class='dblclick_editable' readonly='readonly' form='form163_"+result.id+"' value='"+result.height+"'>"+result.unit;
						rowsHTML+="<br>Volume: <input type='number' step='any' class='dblclick_editable' readonly='readonly' form='form163_"+result.id+"' value='"+result.volume+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Weight'>";
						rowsHTML+="<input type='text' class='dblclick_editable' readonly='readonly' form='form163_"+result.id+"' value='"+result.weight+"'>gms";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Dead Weights' id='form163_dw_"+result.id+"'>";
						///////////////insert dead weight calculations here/////////////////
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Packing'>";
						rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form163_"+result.id+"'>"+result.packing+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form163_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' title='Save' form='form163_"+result.id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form163_body').append(rowsHTML);
			var fields=document.getElementById("form163_"+result.id);
			var length_filter=fields.elements[1];
			var breadth_filter=fields.elements[2];
			var height_filter=fields.elements[3];
			var volume_filter=fields.elements[4];
			var weight_filter=fields.elements[5];
			var dead_weight_container=document.getElementById('form163_dw_'+result.id);
			
			$(length_filter).add(breadth_filter).add(height_filter).add(weight_filter).on('blur',function()
			{
				volume_filter.value=my_round((parseFloat(length_filter.value)*parseFloat(breadth_filter.value)*parseFloat(height_filter.value)),2);
				var channel_data="<sale_channels>"+
							"<name></name>"+
							"<dead_weight_factor></dead_weight_factor>"+
							"</sale_channels>";
				fetch_requested_data('',channel_data,function(channels)
				{
					var dead_weight_value="";
					channels.forEach(function(channel)
					{
						var channel_weight=Math.max(parseFloat(weight_filter.value),parseFloat(volume_filter.value)*parseFloat(channel.dead_weight_factor));
						dead_weight_value+=channel.name+": "+channel_weight+" gms<br>";
					});
					dead_weight_container.innerHTML=dead_weight_value;
				});			
			});

			var channel_data="<sale_channels>"+
							"<name></name>"+
							"<dead_weight_factor></dead_weight_factor>"+
							"</sale_channels>";
			fetch_requested_data('',channel_data,function(channels)
			{
				var dead_weight_value="";
				channels.forEach(function(channel)
				{
					var channel_weight=Math.max(parseFloat(result.weight),parseFloat(result.volume)*parseFloat(channel.dead_weight_factor));
					dead_weight_value+=channel.name+": "+channel_weight+" gms<br>";
				});
				dead_weight_container.innerHTML=dead_weight_value;
			});				
			
			$(fields).on('submit',function(event)
			{
				event.preventDefault();
				form163_update_item(fields);
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
		
		var export_button=filter_fields.elements[1];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data(columns,'product_dimensions');
		});
		hide_loader();
	});
};


/**
 * @form Put-away suggestions
 * @formNo 165
 * @Loading light
 */
function form165_ini()
{
	show_loader();
	var fid=$("#form165_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form165_master');
	var fproduct=filter_fields.elements['sku'].value;
	var fbatch=filter_fields.elements['batch'].value;
	var frack=filter_fields.elements['rack'].value;
	
	$('#form165_body').html("");

	if_data_read_access('store_areas',function(accessible_data)
	{		
		//console.log(accessible_data);
		var columns="<supplier_bill_items>" +
			"<id>"+fid+"</id>" +
			"<batch>"+fbatch+"</batch>" +
			"<product_name>"+fproduct+"</product_name>" +
			"<quantity></quantity>"+
			"<placed_quantity></placed_quantity>"+
			"<storage></storage>"+
			"<put_away_status exact='yes'>pending</put_away_status>"+
			"</supplier_bill_items>";
		
		fetch_requested_data('form165',columns,function(results)
		{
			///discarded items
			var inventory_xml="<inventory_adjust>" +
					"<id>"+fid+"</id>" +
					"<batch>"+fbatch+"</batch>" +
					"<product_name>"+fproduct+"</product_name>" +
					"<quantity></quantity>"+
					"<placed_quantity></placed_quantity>"+
					"<storage></storage>"+
					"<put_away_status exact='yes'>pending</put_away_status>"+
					"</inventory_adjust>";
			
			fetch_requested_data('form165',inventory_xml,function(adjust_results)
			{
				results.forEach(function(result)
				{
					result.table_type='supplier_bill_items';
				});
				
				for(var z in adjust_results)
				{
					var adjust_item=new Object();
					adjust_item.product_name=adjust_results[z].product_name;
					adjust_item.batch=adjust_results[z].batch;
					adjust_item.quantity=adjust_results[z].quantity;
					adjust_item.storage=adjust_results[z].storage;
					adjust_item.id=adjust_results[z].id;
					adjust_item.table_type='inventory_adjust';
					adjust_item.placed_quantity=adjust_results[z].placed_quantity;
					results.push(adjust_item);
				}

				//console.log(results);
				results.forEach(function(result)
				{
					var read=false;
					var update=false;
					var del=false;
					var access=false;
					for(var x in accessible_data)
					{
						//console.log(result.storage);
						//console.log(accessible_data[x].name);
						
						if(result.storage==accessible_data[x].name || accessible_data[x].record_id=='all')
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
	
					if(read)
					{
						if(result.placed_quantity=='null' || result.placed_quantity=='' || isNaN(result.placed_quantity))
							result.placed_quantity=0;
			
						var rowsHTML="";
							rowsHTML+="<tr>";
								rowsHTML+="<form id='row_form165_"+result.id+"'></form>";
									rowsHTML+="<td data-th='Item'>";
										rowsHTML+="<textarea readonly='readonly' form='row_form165_"+result.id+"'>"+result.product_name+"</textarea>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Batch'>";
										rowsHTML+="<input type='text' readonly='readonly' form='row_form165_"+result.id+"' value='"+result.batch+"'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Quantity'>";
										rowsHTML+="To place: <input type='number' readonly='readonly' form='row_form165_"+result.id+"' value='"+result.quantity+"'>";
										rowsHTML+="<br>Placed: <input type='number' readonly='readonly' form='row_form165_"+result.id+"' value='"+result.placed_quantity+"'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Storage'>";
										rowsHTML+="<input type='text' form='row_form165_"+result.id+"' readonly='readonly' value='"+result.storage+"'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Action'>";
										rowsHTML+="<img src='./images/edit.png' class='edit_icon' title='Edit Location' id='form165_edit_location_"+result.id+"'>";
										rowsHTML+="<input type='hidden' form='row_form165_"+result.id+"' value='Put-away' onclick='modal163_action($(this));'>";
										rowsHTML+="<input type='hidden' form='row_form165_"+result.id+"' value='"+result.id+"'>";
										rowsHTML+="<input type='hidden' form='row_form165_"+result.id+"' value='"+result.table_type+"'>";
										rowsHTML+="<input type='submit' class='submit_hidden' form='row_form165_"+result.id+"' value='Place'>";
										rowsHTML+="<input type='hidden' form='row_form165_"+result.id+"' value='"+result.storage+"'>";
										rowsHTML+="<input type='hidden' form='row_form165_"+result.id+"' value='"+result.placed_quantity+"'>";									
										rowsHTML+="<input type='hidden' form='row_form165_"+result.id+"' value='"+result.id+"'>";
									rowsHTML+="</td>";																					
						rowsHTML+="</tr>";
							
						$('#form165_body').append(rowsHTML);
						var fields=document.getElementById("row_form165_"+result.id);
						var storage_filter=fields.elements[4];
						var storage_data="<store_areas>"+
										"<name></name>"+
										//"<area_type exact='yes'>"+get_session_var('storage_level')+"</area_type>"+
										"<area_type></area_type>"+
										"</store_areas>";
						set_my_value_list(storage_data,storage_filter);
						
						$(storage_filter).on('click',function()
						{
							///write code to select all text in the field
							this.select();
						});
						
						
						var edit_button=document.getElementById("form165_edit_location_"+result.id);
						$(edit_button).on('click',function ()
						{
							storage_filter.removeAttribute('readonly');
						});
						
						
						
						$(fields).on('submit',function(event)
						{
							event.preventDefault();
							form165_update_item(fields);
						});
					}
				});
				form165_get_totals();
				longPressEditable($('.dblclick_editable'));
				
				hide_loader();
			});
		});
	});
};


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
	//var fbatch=filter_fields.elements[1].value;

	////indexing///
	var index_element=document.getElementById('form166_index');
	var prev_element=document.getElementById('form166_prev');
	var next_element=document.getElementById('form166_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	
	var columns="<product_instances count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		//"<batch>"+fbatch+"</batch>" +
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
					//rowsHTML+="<td data-th='Batch'>";
					//	rowsHTML+="<input type='text' readonly='readonly' form='form166_"+result.id+"' value='"+result.batch+"'>";
					//rowsHTML+="</td>";
					rowsHTML+="<td data-th='MRP'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form166_"+result.id+"' class='dblclick_editable' value='"+result.mrp+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Cost price'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form166_"+result.id+"' class='dblclick_editable' value='"+result.cost_price+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Sale price'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form166_"+result.id+"' value='"+result.sale_price+"' class='dblclick_editable'>";
					//	rowsHTML+="<img src='./images/edit.png' class='edit_icon' onclick=\"modal38_action('"+result.id+"','"+result.sale_price+"');\">";
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

		var export_button=filter_fields.elements[1];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data(columns,'Pricing');
		});
		
		hide_loader();
	});
};


/**
 * @form Storage Structure
 * @formNo 167
 * @Loading light
 */
function form167_ini()
{
	show_loader();
	var fid=$("#form167_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form167_header');
	
	var fname=filter_fields.elements[0].value;
	var fparent=filter_fields.elements[1].value;

	////indexing///
	var index_element=document.getElementById('form167_index');
	var prev_element=document.getElementById('form167_prev');
	var next_element=document.getElementById('form167_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	
	var columns="<storage_structure count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<name>"+fname+"</name>" +
		"<parent>"+fparent+"</parent>" +
		"<len></len>" +
		"<breadth></breadth>" +
		"<height></height>"+
		"<unit></unit>"+
		"</storage_structure>";

	$('#form167_body').html("");
	
	fetch_requested_data('form167',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form167_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form167_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Parent'>";
						rowsHTML+="<textarea readonly='readonly' form='form167_"+result.id+"'>"+result.parent+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Default Dimensions'>";
						rowsHTML+="Length: <input type='number' step='any' readonly='readonly' class='dblclick_editable' form='form167_"+result.id+"' value='"+result.len+"'>";
						rowsHTML+="<br>Breadth: <input type='number' step='any' readonly='readonly' class='dblclick_editable' form='form167_"+result.id+"' value='"+result.breadth+"'>";
						rowsHTML+="<br>Height: <input type='number' step='any' readonly='readonly' class='dblclick_editable' form='form167_"+result.id+"' value='"+result.height+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Unit'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form167_"+result.id+"' value='"+result.unit+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form167_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' title='Save' form='form167_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' title='Delete' form='form167_"+result.id+"' onclick='form167_delete_item($(this))'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form167_body').append(rowsHTML);
			var fields=document.getElementById("form167_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form167_update_item(fields);
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
			get_export_data(columns,'storage_structure');
		});
		
		hide_loader();
	});
};

/**
 * @form Manage Products
 * @formNo 169
 * @Loading heavy
 */
function form169_ini()
{
	show_loader();
	var fid=$("#form169_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form169_header');
	
	var fsku=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var fbrand=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form169_index');
	var prev_element=document.getElementById('form169_prev');
	var next_element=document.getElementById('form169_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	$('#form169_body').html("");

	var new_columns=new Object();
		new_columns.count=25;
		new_columns.start_index=start_index;
		new_columns.data_store='product_master';		
		
		new_columns.indexes=[{index:'id',value:fid},
							{index:'name',value:fsku},
							{index:'make',value:fbrand},
							{index:'description',value:fname},
							{index:'bar_code'},
							{index:'tax'}];		

	read_json_rows('form169',new_columns,function(results)
	{	
		var smaller_barcodes=get_session_var('brands_small_barcode');
		results.forEach(function(result)
		{
			var picture_column="<documents>" +
					"<id></id>" +
					"<url></url>" +
					"<doc_type exact='yes'>product_master</doc_type>" +
					"<target_id exact='yes'>"+result.id+"</target_id>" +
					"</documents>";
			fetch_requested_data('form169',picture_column,function(pic_results)
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
					rowsHTML+="<form id='form169_"+result.id+"'></form>";
						rowsHTML+="<td data-th='SKU'>";
							rowsHTML+="<textarea readonly='readonly' form='form169_"+result.id+"'>"+result.name+"</textarea>";
							if(result.bar_code!="" && result.bar_code!="null")
							{
								if(smaller_barcodes!=null && smaller_barcodes.indexOf(result.make)>-1)
								{
									rowsHTML+="<img src='./images/barcode.png' class='barcode_icon' title='Print Barcode - "+result.bar_code+"' onclick=\"print_smaller_product_barcode('"+result.bar_code+"','"+result.name+"','"+result.description+"');\">";
								}
								else 
								{
									rowsHTML+="<img src='./images/barcode.png' class='barcode_icon' title='Print Barcode - "+result.bar_code+"' onclick=\"print_product_barcode('"+result.bar_code+"','"+result.name+"','"+result.description+"');\">";
								}
							}
							else
							{
								rowsHTML+="<img src='./images/barcode.png' class='barcode_icon' title='Click to assign barcode' onclick=\"modal139_action('"+result.id+"','"+result.name+"','"+result.description+"',this);\">";
							}
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Name'>";
							rowsHTML+="<textarea readonly='readonly' form='form169_"+result.id+"' class='dblclick_editable'>"+result.description+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Brand'>";
							rowsHTML+="<textarea readonly='readonly' form='form169_"+result.id+"' class='dblclick_editable'>"+result.make+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Picture'>";
							rowsHTML+="<output form='form169_"+result.id+"'><div class='figure' name='"+pic_results_id+"'><img id='img_form169_"+result.id+"' src='"+updated_url+"'></div></output>";
							rowsHTML+="<input type='file' style='display:none' form='form169_"+result.id+"'>";
							rowsHTML+="<input type='button' class='generic_red_icon' form='form169_"+result.id+"' value='Change Picture'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Tax'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form169_"+result.id+"' class='dblclick_editable' value='"+result.tax+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form169_"+result.id+"' value='"+result.id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form169_"+result.id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form169_"+result.id+"' onclick='form169_delete_item($(this));'>";
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form169_body').append(rowsHTML);
	
				var fields=document.getElementById("form169_"+result.id);
				var pictureinfo=fields.elements[3];
				var picture=fields.elements[4];
				var dummy_button=fields.elements[5];
	
				$(dummy_button).on('click',function (e) 
				{
					e.preventDefault();
					$(picture).trigger('click');
				});

				$(fields).on("submit",function(event)
				{
					event.preventDefault();
					form169_update_item(fields);
				});
				
				picture.addEventListener('change',function(evt)
				{
					select_picture(evt,pictureinfo,function(dataURL)
					{
						pictureinfo.innerHTML="<div class='figure' name='"+pic_results_id+"'><img id='img_form169_"+result.id+"' src='"+dataURL+"'></div>";			
					});
				},false);
				
				longPressEditable($('.dblclick_editable'));
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
			get_limited_export_data(new_columns,'Products',function(new_result)
			{
			});
		});
		hide_loader();
	});	
};



/**
 * @form Store Areas (Nikki)
 * @formNo 170
 * @Loading light
 */
function form170_ini()
{
	show_loader();
	var fid=$("#form170_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form170_header');
	var fname=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var fparent=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form170_index');
	var prev_element=document.getElementById('form170_prev');
	var next_element=document.getElementById('form170_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<store_areas count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<parent>"+fparent+"</parent>"+
			"<area_type>"+ftype+"</area_type>" +
			"<owner></owner>"+
			"<len></len>"+
			"<breadth></breadth>"+
			"<height></height>"+
			"<unit></unit>"+
			"<last_updated></last_updated>" +
			"</store_areas>";

	$('#form170_body').html("");

	fetch_requested_data('form170',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form170_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form170_"+result.id+"' value='"+result.name+"'>";
						rowsHTML+="<img src='./images/barcode.png' class='barcode_icon' title='Print Barcode' onclick=\"print_barcode('"+result.name+"');\">";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form170_"+result.id+"' value='"+result.area_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Parent'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form170_"+result.id+"' value='"+result.parent+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="Owner: <input type='text' readonly='readonly' class='dblclick_editable' form='form170_"+result.id+"' value='"+result.owner+"'>";
						rowsHTML+="<br>Length: <input type='number' step='any' readonly='readonly' class='dblclick_editable' form='form170_"+result.id+"' value='"+result.len+"'>"+result.unit;
						rowsHTML+="<br>Breadth: <input type='number' step='any' readonly='readonly' class='dblclick_editable' form='form170_"+result.id+"' value='"+result.breadth+"'>"+result.unit;
						rowsHTML+="<br>Height: <input type='number' step='any' readonly='readonly' class='dblclick_editable' form='form170_"+result.id+"' value='"+result.height+"'>"+result.unit;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form170_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form170_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form170_"+result.id+"' title='Delete' onclick='form170_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form170_body').append(rowsHTML);
			var fields=document.getElementById("form170_"+result.id);
			var type_filter=fields.elements[2];
			var parent_filter=fields.elements[2];
			var owner_filter=fields.elements[3];

			var type_data="<storage_structure>"+
						"<name></name>"+							
						"</storage_structure>";
			set_my_value_list(type_data,type_filter);

			var parent_data="<store_areas>"+
						"<name></name>"+							
						"</store_areas>";
			set_my_value_list(parent_data,parent_filter);
			
			var owner_data="<staff>"+
						"<acc_name></acc_name>"+							
						"</staff>";
			set_my_value_list(owner_data,owner_filter);
			
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form170_update_item(fields);
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
			get_export_data(columns,'store_areas');
		});
		hide_loader();
	});
};


/**
 * @form Manage Channels
 * @formNo 171
 * @Loading light
 */
function form171_ini()
{
	show_loader();
	var fid=$("#form171_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form171_header');
	
	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form171_index');
	var prev_element=document.getElementById('form171_prev');
	var next_element=document.getElementById('form171_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<sale_channels count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<details></details>" +
			"<dead_weight_factor></dead_weight_factor>"+
			"<last_updated></last_updated>" +
			"</sale_channels>";

	$('#form171_body').html("");

	fetch_requested_data('form171',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form171_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form171_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="<textarea readonly='readonly' form='form171_"+result.id+"' class='dblclick_editable'>"+result.details+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Dead Weight Factor'>";
						rowsHTML+="<input type='number' readonly='readonly' form='form171_"+result.id+"' class='dblclick_editable' value='"+result.dead_weight_factor+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form171_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form171_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form171_"+result.id+"' title='Delete' onclick='form171_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		
			$('#form171_body').append(rowsHTML);

			var fields=document.getElementById("form171_"+result.id);
			
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form171_update_item(fields);
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
			get_export_data(columns,'sale_channels');
		});
		hide_loader();
	});	
};

/**
 * @form Pricing Sheet
 * @formNo 172
 * @Loading heavy
 */
function form172_ini()
{
	show_loader();
	var fid=$("#form172_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form172_header');
	
	var fname=filter_fields.elements[0].value;
	var fsku=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form172_index');
	var prev_element=document.getElementById('form172_prev');
	var next_element=document.getElementById('form172_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<channel_prices count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<channel>"+fname+"</channel>" +
			"<item>"+fsku+"</item>" +
			"<sale_price></sale_price>"+
			"<cost_price></cost_price>"+
			"<mrp></mrp>"+
			"<freight></freight>"+
			"<discount_customer></discount_customer>"+
			"<gateway_charges></gateway_charges>"+
			"<storage_charges></storage_charges>"+
			"<total_charges></total_charges>"+
			"<pickup_charges></pickup_charges>"+
			"<service_tax></service_tax>"+
			"<gateway_charges></gateway_charges>"+
			"<channel_commission></channel_commission>"+
			"<channel_commission_percentage></channel_commission_percentage>"+
			"<total_payable></total_payable>"+
			"<total_receivable></total_receivable>"+
			"<profit_mrp></profit_mrp>"+
			"<profit_sp></profit_sp>"+
			"<profit></profit>"+
			"<from_time></from_time>"+
			"</channel_prices>";

	$('#form172_body').html("");

	fetch_requested_data('form172',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form172_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Channel'>";
						rowsHTML+="<input type='text' style='width:100px;' readonly='readonly' form='form172_"+result.id+"' value='"+result.channel+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<b>SKU</b>: <input type='text' readonly='readonly' form='form172_"+result.id+"' value='"+result.item+"'>";
						rowsHTML+="<br><b>From</b>: <input type='text' readonly='readonly' form='form172_"+result.id+"' value='"+get_my_datetime(result.from_time)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Price'>";
						rowsHTML+="<b>MRP</b>: Rs. <input type='number' step='any' readonly='readonly' form='form172_"+result.id+"' value='"+result.mrp+"'>";
						rowsHTML+="<br><b>Disc.</b>: Rs. <input type='number' step='any' readonly='readonly' form='form172_"+result.id+"' value='"+result.discount_customer+"'>";
						rowsHTML+="<br><b>SP</b>: Rs. <input type='number' step='any' readonly='readonly' form='form172_"+result.id+"' value='"+result.sale_price+"'>";
						rowsHTML+="<br><b>Freight</b>: Rs. <input type='number' step='any' readonly='readonly' form='form172_"+result.id+"' value='"+result.freight+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Channel Charges'>";
						rowsHTML+="<b>Comm.</b>: <input type='number' style='width:40px;' step='any' readonly='readonly' form='form172_"+result.id+"' value='"+result.channel_commission_percentage+"'> %";
						rowsHTML+="<br><b>Comm.</b>: Rs. <input type='number' style='width:60px;' step='any' form='form172_"+result.id+"' readonly='readonly' value='"+result.channel_commission+"'>";
						rowsHTML+="<br><b>Pickup</b>: Rs. <input type='number' style='width:60px;' step='any' readonly='readonly' form='form172_"+result.id+"' value='"+result.pickup_charges+"'>";
						rowsHTML+="<br><b>Others</b>: Rs. <input type='number' style='width:60px;' step='any' readonly='readonly' form='form172_"+result.id+"' value='"+result.gateway_charges+"'>";
						rowsHTML+="<br><b>S. Tax</b>: Rs. <input type='number' style='width:60px;' step='any' readonly='readonly' form='form172_"+result.id+"' value='"+result.service_tax+"'>";
						rowsHTML+="<br><b>Total</b>: Rs. <input type='number' style='width:60px;' step='any' readonly='readonly' form='form172_"+result.id+"' value='"+result.total_charges+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Profit'>";
						rowsHTML+="<b>CP</b>: Rs. <input type='number' step='any' readonly='readonly' form='form172_"+result.id+"' value='"+result.cost_price+"'>";
						rowsHTML+="<br><b>Profit</b>: Rs. <input type='number' step='any' readonly='readonly' form='form172_"+result.id+"' value='"+result.profit+"'>";
						rowsHTML+="<br><b>Profit (MRP)</b>: <input type='number' style='width:40px;' step='any' readonly='readonly' form='form172_"+result.id+"' value='"+result.profit_mrp+"'> %";
						rowsHTML+="<br><b>Profit (SP)</b>: <input type='number' style='width:40px;' step='any' readonly='readonly' form='form172_"+result.id+"' value='"+result.profit_sp+"'> %";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form172_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='save_icon' form='form172_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form172_"+result.id+"' title='Delete' onclick='form172_delete_item($(this))'>";
					rowsHTML+="</td>";
			rowsHTML+="</tr>";
		
			$('#form172_body').append(rowsHTML);
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
			get_export_data(columns,'pricing_sheet');
		});
		hide_loader();
	});	
};

/**
 * @form SKU mapping
 * @formNo 173
 * @Loading light
 */
function form173_ini()
{
	show_loader();
	var fid=$("#form173_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form173_header');
	
	var fname=filter_fields.elements[0].value;
	var fcsku=filter_fields.elements[1].value;
	var fbsku=filter_fields.elements[2].value;
	var fssku=filter_fields.elements[3].value;
	
	////indexing///
	var index_element=document.getElementById('form173_index');
	var prev_element=document.getElementById('form173_prev');
	var next_element=document.getElementById('form173_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<sku_mapping count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<channel>"+fname+"</channel>" +
			"<channel_sku>"+fcsku+"</channel_sku>" +
			"<channel_system_sku>"+fbsku+"</channel_system_sku>"+
			"<system_sku>"+fssku+"</system_sku>"+
			"<item_desc></item_desc>"+
			"</sku_mapping>";

	$('#form173_body').html("");

	fetch_requested_data('form173',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form173_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Channel'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form173_"+result.id+"' value='"+result.channel+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Channel SKU'>";
						rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form173_"+result.id+"'>"+result.channel_sku+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Vendor SKU'>";
						rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form173_"+result.id+"'>"+result.channel_system_sku+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='System SKU'>";
						rowsHTML+="<textarea readonly='readonly' form='form173_"+result.id+"'>"+result.system_sku+"</textarea>";
						rowsHTML+="<br>Name: <textarea readonly='readonly' form='form173_"+result.id+"'>"+result.item_desc+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form173_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form173_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form173_"+result.id+"' title='Delete' onclick='form173_delete_item($(this))'>";			
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		
			$('#form173_body').append(rowsHTML);

			var fields=document.getElementById("form173_"+result.id);
			
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form173_update_item(fields);
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
			get_export_data(columns,'sku_mapping');
		});
		hide_loader();
	});	
};

/**
 * @form Pickup Charges
 * @formNo 174
 * @Loading light
 */
function form174_ini()
{
	show_loader();
	var fid=$("#form174_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form174_header');
	
	var fchannel=filter_fields.elements[0].value;
	var fpincode=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form174_index');
	var prev_element=document.getElementById('form174_prev');
	var next_element=document.getElementById('form174_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<pickup_charges count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<channel>"+fchannel+"</channel>" +
			"<pincode>"+fpincode+"</pincode>" +
			"<rate></rate>"+
			"<min_charges></min_charges>"+
			"<max_charges></max_charges>"+
			"</pickup_charges>";

	$('#form174_body').html("");

	fetch_requested_data('form174',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form174_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Channel'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form174_"+result.id+"' value='"+result.channel+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Pincode'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form174_"+result.id+"' value='"+result.pincode+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Minimum'>";
						rowsHTML+="Rs. <input type='number' min='0' step='any' class='dblclick_editable' readonly='readonly' form='form174_"+result.id+"' value='"+result.min_charges+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Maximum'>";
						rowsHTML+="Rs. <input type='number' min='0' step='any' class='dblclick_editable' readonly='readonly' form='form174_"+result.id+"' value='"+result.max_charges+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Weight Factor'>";
						rowsHTML+="Rs. <input type='number' min='0' step='any' class='dblclick_editable' readonly='readonly' form='form174_"+result.id+"' value='"+result.rate+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form174_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form174_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form174_"+result.id+"' title='Delete'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";

			$('#form174_body').append(rowsHTML);

			var fields=document.getElementById("form174_"+result.id);

			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form174_update_item(fields);
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
			get_export_data(columns,'pickup_charges');
		});
		hide_loader();
	});	
};

/**
 * @form Channel Categories
 * @formNo 175
 * @Loading light
 */
function form175_ini()
{
	show_loader();
	var fid=$("#form175_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form175_header');
	
	var fchannel=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var fname=filter_fields.elements[2].value;
	var fparent=filter_fields.elements[3].value;
	
	////indexing///
	var index_element=document.getElementById('form175_index');
	var prev_element=document.getElementById('form175_prev');
	var next_element=document.getElementById('form175_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<channel_category count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<channel>"+fchannel+"</channel>" +
			"<type>"+ftype+"</type>" +
			"<name>"+fname+"</name>"+
			"<parent>"+fparent+"</parent>"+
			"<commission></commission>"+
			"</channel_category>";

	$('#form175_body').html("");

	fetch_requested_data('form175',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form175_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Channel'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form175_"+result.id+"' value='"+result.channel+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form175_"+result.id+"' value='"+result.type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form175_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Parent'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form175_"+result.id+"' value='"+result.parent+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Commission'>";
						rowsHTML+="<input type='number' min='0' step='any' class='dblclick_editable' value='"+result.commission+"' readonly='readonly' form='form175_"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form175_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form175_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form175_"+result.id+"' title='Delete'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";

			$('#form175_body').append(rowsHTML);

			var fields=document.getElementById("form175_"+result.id);

			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form175_update_item(fields);
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
			get_export_data(columns,'channel_categories');
		});
		hide_loader();
	});	
};

/**
 * @form Category Item mapping
 * @formNo 176
 * @Loading light
 */
function form176_ini()
{
	show_loader();
	var fid=$("#form176_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form176_header');
	
	var fchannel=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var fcategory=filter_fields.elements[2].value;
	var fitem=filter_fields.elements[3].value;
	
	////indexing///
	var index_element=document.getElementById('form176_index');
	var prev_element=document.getElementById('form176_prev');
	var next_element=document.getElementById('form176_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<category_sku_mapping count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<channel>"+fchannel+"</channel>" +
			"<cat_type>"+ftype+"</cat_type>" +
			"<cat_name>"+fcategory+"</cat_name>"+
			"<sku>"+fitem+"</sku>"+
			"</category_sku_mapping>";

	$('#form176_body').html("");

	fetch_requested_data('form176',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form176_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Channel'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form176_"+result.id+"' value='"+result.channel+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form176_"+result.id+"' value='"+result.cat_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Category'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form176_"+result.id+"' value='"+result.cat_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form176_"+result.id+"' value='"+result.sku+"'>";
						rowsHTML+="<br><textarea readonly='readonly' form='form176_"+result.id+"'></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form176_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form176_"+result.id+"' title='Save'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";

			$('#form176_body').append(rowsHTML);

			var fields=document.getElementById("form176_"+result.id);
			var type_filter=fields.elements[1];
			var category_filter=fields.elements[2];
			var desc_filter=fields.elements[4];

			set_static_value_list('category_sku_mapping','cat_type',type_filter);
			
			$(type_filter).on('blur',function()
			{
				var category_data="<channel_category>"+
								"<name></name>"+
								"<type exact='yes'>"+type_filter.value+"</type>"+
								"<channel exact='yes'>"+result.channel+"</channel>"+
								"</channel_category>";
				set_my_value_list(category_data,category_filter);
			});
			
			var desc_data="<product_master>"+
						"<description></description>"+
						"<name exact='yes'>"+result.sku+"</name>"+
						"</product_master>";
			set_my_value(desc_data,desc_filter);
			
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form176_update_item(fields);
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
			get_export_data(columns,'category_sku_mapping');
		});
		hide_loader();
	});	
};

/**
 * @form Prioritization Parameters
 * @formNo 177
 * @Loading light
 */
function form177_ini()
{
	show_loader();
	var fid=$("#form177_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form177_header');
	
	var fname=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form177_index');
	var prev_element=document.getElementById('form177_prev');
	var next_element=document.getElementById('form177_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<prioritization_parameters count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<type>"+ftype+"</type>" +
			"<values></values>"+
			"<threshold></threshold>"+
			"</prioritization_parameters>";

	$('#form177_body').html("");

	fetch_requested_data('form177',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form177_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form177_"+result.id+"' value='"+result.type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Parameter'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form177_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Values'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form177_"+result.id+"' value='"+result.values+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Threshold'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form177_"+result.id+"' value='"+result.threshold+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form177_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form177_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form177_"+result.id+"' title='Delete' onclick='form177_delete_item($(this))'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";

			$('#form177_body').append(rowsHTML);

			var fields=document.getElementById("form177_"+result.id);
			
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form177_update_item(fields);
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
			get_export_data(columns,'prioritization_parameters');
		});
		hide_loader();
	});	
};

/**
 * @form New Purchase order (CPS)
 * @formNo 178
 * @Loading light
 */
function form178_ini()
{
	var order_id=$("#form178_link").attr('data_id');
	if(order_id==null)
		order_id="";	
	
	$('#form178_body').html("");
	$('#form178_foot').html("");
	
	if(order_id!="")
	{
		show_loader();
		var order_columns="<purchase_orders>" +
				"<id>"+order_id+"</id>" +
				"<order_num></order_num>"+
				"<supplier></supplier>" +
				"<order_date></order_date>" +
				"<priority></priority>" +
				"<amount></amount>"+
				"<tax></tax>"+
				"<total></total>"+
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
				"<amount></amount>"+
				"<tax></tax>"+
				"<total></total>"+
				"</purchase_order_items>";
	
		////separate fetch function to get order details like customer name, total etc.
		fetch_requested_data('',order_columns,function(order_results)
		{
			var filter_fields=document.getElementById('form178_master');
			
			for(var i in order_results)
			{
				var supplier_filter=filter_fields.elements['supplier'];
				supplier_filter.value=order_results[i].supplier;
				filter_fields.elements['date'].value=get_my_past_date(order_results[i].order_date);
				filter_fields.elements['order_num'].value=order_results[i].order_num;
				filter_fields.elements['status'].value=order_results[i].status;
				filter_fields.elements['order_id'].value=order_id;
				filter_fields.elements['priority'].value=order_results[i].priority;				
				var save_button=filter_fields.elements['save'];
				
				if(order_results[i].status=='order placed' || order_results[i].status=='closed' || order_results[i].status=='supplier finalized')
				{					
					$(supplier_filter).parent().show();
				}
				
				var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
							"<td>Amount:<br>Tax: <br>Total: </td>" +
							"<td>Rs. "+order_results[i].amount+"<br>" +
							"Rs. "+order_results[i].tax+"<br> " +
							"Rs. "+order_results[i].total+"</td>" +
							"<td></td>" +
							"</tr>";
					
				$('#form178_foot').html(total_row);

				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form178_update_form();
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
					rowsHTML+="<form id='form178_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<textarea readonly='readonly' required form='form178_"+id+"'>"+result.item_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' required form='form178_"+id+"' value='"+result.quantity+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Make'>";
							rowsHTML+="<textarea readonly='readonly' required form='form178_"+id+"'>"+result.make+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="MRP: <input type='number' readonly='readonly' required form='form178_"+id+"' value='"+result.mrp+"' step='any'>";
							rowsHTML+="<br>Price: <input type='number' readonly='readonly' required form='form178_"+id+"' value='"+result.price+"' step='any'>";
							rowsHTML+="<br>Amount: <input type='number' readonly='readonly' required form='form178_"+id+"' value='"+result.amount+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form178_"+id+"' value='"+result.tax+"'>";
							rowsHTML+="<input type='hidden' form='form178_"+id+"' value='"+result.total+"'>";
							rowsHTML+="<input type='hidden' form='form178_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form178_"+id+"' id='save_form178_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form178_"+id+"' id='delete_form178_"+id+"' onclick='form178_delete_item($(this)); form178_get_totals();'>";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
				
					$('#form178_body').append(rowsHTML);
				});
				
				$('#form178_share').show();
				$('#form178_share').click(function()
				{
					modal101_action('Purchase Order',order_results[i].supplier,'supplier',function (func) 
					{
						print_form178(func);
					});
				});
				
				hide_loader();
			});
		});
	}
}

/**
 * @form Manage Purchase orders
 * @formNo 179
 * @Loading light
 */
function form179_ini()
{
	show_loader();
	var fid=$("#form179_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form179_header');
	
	//populating form 
	var fnum=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form179_index');
	var prev_element=document.getElementById('form179_prev');
	var next_element=document.getElementById('form179_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<purchase_orders count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<order_num>"+fnum+"</order_num>"+
			"<supplier>"+fname+"</supplier>" +
			"<order_date></order_date>" +
			"<priority></priority>" +
			"<status>"+fstatus+"</status>" +
			"<bill_id></bill_id>"+
			"</purchase_orders>";

	$('#form179_body').html("");

	fetch_requested_data('form179',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form179_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Order #'>";
						rowsHTML+="<input type='text' readonly='readonly' class='input_link' onclick=\"element_display('"+result.id+"','form178');\" form='form179_"+result.id+"' value='"+result.order_num+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Order Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form179_"+result.id+"' value='"+get_my_past_date(result.order_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Score'>";
						rowsHTML+="<textarea readonly='readonly' form='form179_"+result.id+"'>"+result.priority+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Supplier'>";
					if(result.supplier!='')
					{					
						rowsHTML+="<input type='text' readonly='readonly' form='form179_"+result.id+"' class='dblclick_editable' value='"+result.supplier+"'>";
					}
					else
					{					
						rowsHTML+="<input type='text' readonly='readonly' form='form179_"+result.id+"' class='dblclick_editable' value='XXXXXXXX'>";
					}	
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form179_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form179_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form179_"+result.id+"' title='Save order'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form179_"+result.id+"' title='Delete order' onclick='form179_delete_item($(this));'>";
					if(result.status=='order placed' || result.status=='partially received')
					{
						rowsHTML+="<br><input type='button' name='issue_grn' class='generic_icon' form='form179_"+result.id+"' value='Issue GRN'>";
					}
					if(result.supplier=='')
					{
						rowsHTML+="<br><input type='button' name='assign_supplier' class='generic_icon' form='form179_"+result.id+"' onclick=\"modal126_action('"+result.id+"','"+result.order_num+"');\" value='Assign'>";
					}
					if(result.bill_id!='' && result.bill_id!='null')
					{
						rowsHTML+="<br><input type='button' name='view_bill' class='generic_icon' form='form179_"+result.id+"' value='View Bill'>";
					}
					rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form179_body').append(rowsHTML);
			var fields=document.getElementById("form179_"+result.id);
			var supplier_filter=fields.elements[3];
			var status_filter=fields.elements[4];
			
			var supplier_data="<suppliers>"+
							"<acc_name></acc_name>"+
							"</suppliers>";
			set_my_value_list(supplier_data,supplier_filter);
			
			set_static_value_list('purchase_orders','status',status_filter);
			
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form179_update_item(fields);
			});
			
			var issue_button=fields.elements['issue_grn'];
			$(issue_button).on('click',function()
			{
				element_display('','form136');
				var master_form=document.getElementById('form136_master');
				master_form.elements['supplier'].value=result.supplier;
				master_form.elements['po_num'].value=result.order_num;
				master_form.elements['order_id'].value=result.id;
				$(master_form.elements['bill_num']).focus();
			});
			
			
			var view_button=fields.elements['view_bill'];
			$(view_button).on('click',function()
			{
				modal137_action(result.bill_id);
				//element_display(result.bill_id,'form122');
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
		
		var export_button=filter_fields.elements['export'];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data(columns,'Purchase Orders');
		});
		hide_loader();
	});
};


/**
 * @form Production Steps
 * @formNo 184
 * @Loading light
 */
function form184_ini()
{
	show_loader();
	var fid=$("#form184_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form184_header');
	
	var fname=filter_fields.elements[0].value;
	var ftype=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form184_index');
	var prev_element=document.getElementById('form184_prev');
	var next_element=document.getElementById('form184_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<business_processes count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<details></details>" +
			"<order_no></order_no>"+
			"<default_assignee></default_assignee>"+
			"<time_estimate></time_estimate>"+
			"<type>"+ftype+"</type>"+
			"<status>"+fstatus+"</status>"+
			"</business_processes>";

	$('#form184_body').html("");

	fetch_requested_data('form184',columns,function(results)
	{
		results.sort(function(a,b)
		{
			if(parseInt(a.order_no)>parseInt(b.order_no))
			{	return 1;}
			else 
			{	return -1;}
		});

		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form184_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Order'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form184_"+result.id+"' value='"+result.order_no+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Step'>";
						rowsHTML+="<textarea readonly='readonly' form='form184_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="Time Estimate: <input type='number' step='any' class='dblclick_editable' title='Estimate of hours spent per piece of item production' readonly='readonly' form='form184_"+result.id+"' value='"+result.time_estimate+"'>";
						rowsHTML+="<br>Default Assignee: <input type='text' class='dblclick_editable' readonly='readonly' form='form184_"+result.id+"' value='"+result.default_assignee+"'>";
						rowsHTML+="<br>Notes: <textarea readonly='readonly' class='dblclick_editable' form='form184_"+result.id+"'>"+result.details+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form184_"+result.id+"' value='"+result.type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form184_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form184_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form184_"+result.id+"' title='Save' id='save_form184_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form184_"+result.id+"' title='Delete' onclick='form184_delete_item($(this))'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";

			$('#form184_body').append(rowsHTML);

			var fields=document.getElementById("form184_"+result.id);
			var assignee_filter=fields.elements[3];
			var status_filter=fields.elements[6];
			
			var assignee_data="<staff>"+
							"<acc_name></acc_name>"+
							"<status exact='yes'>active</status>"+
							"</staff>";
			set_my_value_list(assignee_data,assignee_filter);
							
			set_static_value_list('business_processes','status',status_filter);
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form184_update_item(fields);
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
			get_export_data(columns,'production_steps');
		});
		hide_loader();
	});	
};

/**
 * @form Track Production
 * @formNo 185
 * @Loading light
 */
function form185_ini()
{
	var task_id=$("#form185_link").attr('data_id');

	$('#form185_body').html("");
	
	$('#form185_calendar').fullCalendar('destroy');
	$('#form185_calendar').fullCalendar({
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
	        		"<source exact='yes'>business process</source>" +
	        		"</task_instances>";

	        if_data_read_access('task_instances',function(accessible_data)
	        {
		        fetch_requested_data('form185',tasks_data,function(tasks)
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
							//console.log('task found');
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
			        			title: task.name+"\nAssigned to: "+task.assignee,
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
	    	modal117_action(get_my_date_from_iso(date.format()));
	    },
	    eventClick: function(calEvent,jsEvent,view){
	    	modal33_action(calEvent.id);
	    },
	    eventDrop: function(event,delta,revertFunc)
	    {
	    	var t_initiated=(parseFloat(event.start.unix())*1000);
	    	var data_xml="<task_instances>" +
						"<id>"+event.id+"</id>" +
						"<t_initiated>"+t_initiated+"</t_initiated>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</task_instances>";
			var prod_xml="<production_plan_items>" +
						"<id>"+event.id+"</id>" +
						"<from_time>"+t_initiated+"</from_time>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</production_plan_items>";
						
			update_simple(data_xml);
			update_simple(prod_xml);
			
			var store_movement_xml="<store_movement>"+
							"<id></id>"+
							"<record_source exact='yes'>production_plan_item</record_source>"+
							"<source_id exact='yes'>"+event.id+"</source_id>"+
							"</store_movement>";
			fetch_requested_data('',store_movement_xml,function (movs) 
			{
				movs.forEach(function (mov) 
				{
					var mov_xml="<store_movement>"+
						"<id>"+mov.id+"</id>"+
						"<applicable_from>"+t_initiated+"</applicable_from>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</store_movement>";
					update_simple(mov_xml);	
				});
			});		
	    },
	    eventResize: function(event, delta, revertFunc){
	    	var task_hours=parseFloat((parseFloat(event.end.unix())-parseFloat(event.start.unix()))/3600);
	    	var data_xml="<task_instances>" +
						"<id>"+event.id+"</id>" +
						"<task_hours>"+task_hours+"</task_hours>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</task_instances>";
			update_simple(data_xml);
		}
	});

	var filter_fields=document.getElementById('form185_header');
	
	var fname=filter_fields.elements[0].value;
	var fassignee=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	
	////indexing///
	var index_element=document.getElementById('form185_index');
	var prev_element=document.getElementById('form185_prev');
	var next_element=document.getElementById('form185_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<task_instances count='25' start_index='"+start_index+"'>" +
			"<id></id>" +
			"<name>"+fname+"</name>" +
			"<description></description>" +
			"<assignee>"+fassignee+"</assignee>" +
			"<t_due></t_due>" +
			"<t_initiated></t_initiated>" +
			"<task_hours></task_hours>" +
			"<status>"+fstatus+"</status>" +
			"<source exact='yes'>business process</source>" +
			"<last_updated></last_updated>" +
			"</task_instances>";
	
	if_data_read_access('task_instances',function(accessible_data)
	{
		fetch_requested_data('form185',columns,function(results)
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
					var rowsHTML="";
					rowsHTML+="<tr>";
						rowsHTML+="<form id='form185_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Task'>";
								rowsHTML+="<textarea readonly='readonly' form='form185_"+result.id+"'>"+result.name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form185_"+result.id+"'>"+result.description+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Assignee'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form185_"+result.id+"' class='dblclick_editable' value='"+result.assignee+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Time'>";
								rowsHTML+="Start: <input type='text' readonly='readonly' form='form185_"+result.id+"' class='dblclick_editable' value='"+result.t_initiated+"'>";
								rowsHTML+="<br>Due by: <input type='text' readonly='readonly' form='form185_"+result.id+"' class='dblclick_editable' value='"+result.t_due+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form185_"+result.id+"' class='dblclick_editable' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' readonly='readonly' form='form185_"+result.id+"' value='"+result.id+"'>";
							if(update)	
								rowsHTML+="<input type='submit' class='save_icon' form='form185_"+result.id+"' title='Save'>";
							if(del)
								rowsHTML+="<input type='button' class='delete_icon' form='form185_"+result.id+"' title='Delete' onclick='form185_delete_item($(this));'>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form185_body').append(rowsHTML);
					var fields=document.getElementById("form185_"+result.id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form185_update_item(fields);
					});
					
					var name_filter=fields.elements[0];
					var assignee_filter=fields.elements[2];
					var from_filter=fields.elements[3];
					var due_filter=fields.elements[4];
					var status_filter=fields.elements[5];
								
					var staff_data="<staff>" +
							"<acc_name></acc_name>" +
							"</staff>";
					set_my_value_list(staff_data,assignee_filter);
					
					set_static_value_list('task_instances','status',status_filter);
					$(due_filter).datetimepicker();
					$(from_filter).datetimepicker();
				}
			});
			
			////indexing///
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
	});	
}

/**
 * @form Create Production Plan
 * @formNo 186
 * @Loading light
 */
function form186_ini()
{
	var plan_id=$("#form186_link").attr('data_id');
	if(plan_id==null)
		plan_id="";	
	
	$('#form186_body').html("");
	$('#form186_foot').html("");
	
	if(plan_id!="")
	{
		show_loader();
		var plan_columns="<production_plan>" +
				"<id>"+plan_id+"</id>" +
				"<name></name>" +
				"<details></details>" +
				"<from_time></from_time>" +
				"<to_time></to_time>" +
				"<status></status>"+
				"</production_plan>";
		
		var filter_fields=document.getElementById('form186_master');

		////separate fetch function to get plan details 
		fetch_requested_data('',plan_columns,function(plan_results)
		{
			for (var i in plan_results)
			{
				filter_fields.elements[1].value=plan_results[i].name;
				filter_fields.elements[2].value=get_my_past_date(plan_results[i].from_time);
				filter_fields.elements[3].value=get_my_past_date(plan_results[i].to_time);
				filter_fields.elements[4].value=plan_results[i].status;
				filter_fields.elements[5].value=plan_id;
				var save_button=filter_fields.elements[6];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form186_update_form();
				});
					
				break;
			}
		
		
			var plan_items_column="<production_plan_items>" +
					"<id></id>" +
					"<item></item>" +
					"<batch></batch>"+
					"<order_no></order_no>" +
					"<quantity></quantity>" +
					"<brand></brand>" +
					"<status></status>" +
					"<from_time></from_time>" +
					"<to_time></to_time>" +
					"<plan_id exact='yes'>"+plan_id+"</plan_id>" +
					"</production_plan_items>";
			
			fetch_requested_data('',plan_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var plan_status=filter_fields.elements[4].value;
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form186_"+id+"'></form>";
						rowsHTML+="<td data-th='Order'>";
							rowsHTML+="<input style='width:50px;' type='number' readonly='readonly' form='form186_"+id+"' value='"+result.order_no+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form186_"+id+"' value='"+result.item+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Brand'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form186_"+id+"' value='"+result.brand+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' class='dblclick_editable' form='form186_"+id+"' value='"+result.quantity+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Schedule'>";
							rowsHTML+="<b>From</b>: <input type='text' readonly='readonly' class='dblclick_editable' form='form186_"+id+"' value='"+get_my_past_date(result.from_time)+"'>";
							rowsHTML+="<br><b>To</b>: <input type='text' readonly='readonly' class='dblclick_editable' form='form186_"+id+"' value='"+get_my_past_date(result.to_time)+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form186_"+id+"' class='dblclick_editable' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form186_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='save_icon' form='form186_"+id+"' id='save_form186_"+id+"'>";
						if(result.status!='inventoried')
							rowsHTML+="<input type='button' class='delete_icon' form='form186_"+id+"' id='delete_form186_"+id+"' onclick='form186_delete_item($(this));'>";
						if(plan_status=='approved' && result.status!='inventoried')
						{
							rowsHTML+="<input type='button' class='generic_icon' value='Inventory' name='ready' form='form186_"+id+"'>";							
						}						
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form186_body').prepend(rowsHTML);
					var fields=document.getElementById('form186_'+id);
					var from_filter=fields.elements[4];
					var to_filter=fields.elements[5];
					var status_filter=fields.elements[6];
					var save_button=fields.elements[8];
					var ready_button=fields.elements['ready'];
					
					$(ready_button).on('click',function()
					{
						//console.log('button');
						element_display(result.id,'form256');
						
						var save_button=document.getElementById('form256_master').elements['save'];						
						$(save_button).off('click');
						$(save_button).on("click", function(event)
						{
							event.preventDefault();
							form256_create_form();
						});						
					});
					
					$(from_filter).datepicker();
					$(to_filter).datepicker();
					set_static_value_list('production_plan_items','status',status_filter);
					
					$(save_button).on('click',function (event) 
					{
						event.preventDefault();
						form186_update_item(fields);
					});
				});

				$('#form186_share').show();
				$('#form186_share').click(function()
				{
					modal101_action('Production Plan','','staff',function (func) 
					{
						print_form186(func);
					});
				});

				hide_loader();
			});
		});
	}
}


/**
 * @form Testing Steps
 * @formNo 187
 * @Loading light
 */
function form187_ini()
{
	show_loader();
	var fid=$("#form187_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form187_header');
	
	var fname=filter_fields.elements[0].value;
	var fstatus=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form187_index');
	var prev_element=document.getElementById('form187_prev');
	var next_element=document.getElementById('form187_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<business_processes count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<details></details>" +
			"<order_no></order_no>"+
			"<default_assignee></default_assignee>"+
			"<time_estimate></time_estimate>"+
			"<type exact='yes'>testing</type>"+
			"<status>"+fstatus+"</status>"+
			"</business_processes>";

	$('#form187_body').html("");

	fetch_requested_data('form187',columns,function(results)
	{
		results.sort(function(a,b)
		{
			if(parseInt(a.order_no)>parseInt(b.order_no))
			{	return 1;}
			else 
			{	return -1;}
		});
			
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form187_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Order'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form187_"+result.id+"' value='"+result.order_no+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Step'>";
						rowsHTML+="<textarea readonly='readonly' form='form187_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="Time Estimate: <input type='number' step='any' class='dblclick_editable' title='Estimate of hours spent per piece of item testing' readonly='readonly' form='form187_"+result.id+"' value='"+result.time_estimate+"'>";
						rowsHTML+="<br>Default Assignee: <input type='text' class='dblclick_editable' readonly='readonly' form='form187_"+result.id+"' value='"+result.default_assignee+"'>";
						rowsHTML+="<br>Notes: <textarea readonly='readonly' class='dblclick_editable' form='form187_"+result.id+"'>"+result.details+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form187_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form187_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form187_"+result.id+"' title='Save' id='save_form187_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form187_"+result.id+"' title='Delete' onclick='form187_delete_item($(this))'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";

			$('#form187_body').append(rowsHTML);

			var fields=document.getElementById("form187_"+result.id);
			var assignee_filter=fields.elements[3];
			var status_filter=fields.elements[5];
			
			var assignee_data="<staff>"+
							"<acc_name></acc_name>"+
							"<status exact='yes'>active</status>"+
							"</staff>";
			set_my_value_list(assignee_data,assignee_filter);
							
			set_static_value_list('business_processes','status',status_filter);
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form187_update_item(fields);
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
			get_export_data(columns,'testing_steps');
		});
		hide_loader();
	});	
};

/**
 * @form Track Testing
 * @formNo 188
 * @Loading light
 */
function form188_ini()
{
	var task_id=$("#form188_link").attr('data_id');

	$('#form188_body').html("");
	
	$('#form188_calendar').fullCalendar('destroy');
	$('#form188_calendar').fullCalendar({
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
	        		"<source exact='yes'>testing</source>" +
	        		"</task_instances>";

	        if_data_read_access('task_instances',function(accessible_data)
	        {
		        fetch_requested_data('form188',tasks_data,function(tasks)
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
							//console.log('task found');
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
			        			title: task.name+"\nAssigned to: "+task.assignee,
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
	    	modal117_action('testing',get_my_date_from_iso(date.format()));
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
	
	////indexing///
	var index_element=document.getElementById('form188_index');
	var prev_element=document.getElementById('form188_prev');
	var next_element=document.getElementById('form188_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<task_instances count='25' start_index='"+start_index+"'>" +
			"<id></id>" +
			"<name></name>" +
			"<description></description>" +
			"<assignee></assignee>" +
			"<t_due></t_due>" +
			"<t_initiated></t_initiated>" +
			"<task_hours></task_hours>" +
			"<status></status>" +
			"<source exact='yes'>testing</source>" +
			"<last_updated></last_updated>" +
			"</task_instances>";
	
	if_data_read_access('task_instances',function(accessible_data)
	{
		fetch_requested_data('form188',columns,function(results)
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
					var rowsHTML="";
					rowsHTML+="<tr>";
						rowsHTML+="<form id='form188_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Task'>";
								rowsHTML+="<textarea readonly='readonly' form='form188_"+result.id+"'>"+result.name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<textarea readonly='readonly' form='form188_"+result.id+"'>"+result.description+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Assignee'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form188_"+result.id+"' class='dblclick_editable' value='"+result.assignee+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Due Time'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form188_"+result.id+"' class='dblclick_editable' value='"+result.t_due+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form188_"+result.id+"' class='dblclick_editable' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' readonly='readonly' form='form188_"+result.id+"' value='"+result.id+"'>";
							if(update)	
								rowsHTML+="<input type='submit' class='save_icon' form='form188_"+result.id+"' title='Save'>";
							if(del)
								rowsHTML+="<input type='button' class='delete_icon' form='form188_"+result.id+"' title='Delete' onclick='form188_delete_item($(this));'>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form188_body').append(rowsHTML);
					var fields=document.getElementById("form188_"+result.id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form188_update_item(fields);
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
					$(due_filter).datepicker();
				}
			});
			
			////indexing///
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
	});	
}


/**
 * @form Manage Production Plans
 * @formNo 189
 * @Loading light
 */
function form189_ini()
{
	show_loader();
	var fid=$("#form189_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form189_header');
	
	var fname=filter_fields.elements[0].value;
	var fstatus=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form189_index');
	var prev_element=document.getElementById('form189_prev');
	var next_element=document.getElementById('form189_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<production_plan count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<details></details>" +
			"<from_time></from_time>"+
			"<to_time></to_time>"+
			"<status>"+fstatus+"</status>"+
			"</production_plan>";

	$('#form189_body').html("");

	fetch_requested_data('form189',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form189_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Plan'>";
						rowsHTML+="<input type='text' readonly='readonly' class='input_link' form='form189_"+result.id+"' value='"+result.name+"' onclick=\"element_display('"+result.id+"','form186');\">";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form189_"+result.id+"'>"+result.details+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Schedule'>";
						rowsHTML+="<b>From</b>: <input type='text' readonly='readonly' form='form189_"+result.id+"' value='"+get_my_past_date(result.from_time)+"'>";
						rowsHTML+="<br><b>To</b>: <input type='text' readonly='readonly' form='form189_"+result.id+"' value='"+get_my_past_date(result.to_time)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form189_"+result.id+"' value='"+result.status+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form189_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form189_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form189_"+result.id+"' title='Delete' onclick='form189_delete_item($(this))'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";

			$('#form189_body').append(rowsHTML);

			var fields=document.getElementById("form189_"+result.id);
			var status_filter=fields.elements[4];
			/*var edit_button=fields.elements[6];
			
			$(edit_button).on("click", function(event)
			{
				event.preventDefault();
				element_display(result.id,'form186');
			});
*/
			set_static_value_list('production_plan','status',status_filter);
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form189_update_item(fields);
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
			get_export_data(columns,'production_plans');
		});
		hide_loader();
	});	
};

/**
 * @form Orders (laundry)
 * @formNo 190
 * @Loading light
 */
function form190_ini()
{
	show_loader();
	var fid=$("#form190_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form190_header');
	
	var fname=filter_fields.elements[0].value;
	var fstatus=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form190_index');
	var prev_element=document.getElementById('form190_prev');
	var next_element=document.getElementById('form190_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<sale_orders count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<order_num></order_num>"+
			"<bill_id></bill_id>"+
			"<customer_name>"+fname+"</customer_name>" +
			"<notes></notes>" +
			"<order_date></order_date>"+
			"<amount></amount>"+
			"<tax></tax>"+
			"<total></total>"+
			"<status>"+fstatus+"</status>"+
			"</sale_orders>";

	$('#form190_body').html("");

	fetch_requested_data('form190',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr title='Order #: "+result.order_num+"'>";
				rowsHTML+="<form id='form190_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form190_"+result.id+"'>"+result.customer_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form190_"+result.id+"'>"+result.notes+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Total'>";
						rowsHTML+="Rs. <input type='number' title='Amount: "+result.amount+"\nTax:"+result.tax+"' step='any' readonly='readonly' form='form190_"+result.id+"' value='"+result.total+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Order Time'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form190_"+result.id+"' value='"+get_my_past_date(result.order_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form190_"+result.id+"' value='"+result.status+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form190_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form190_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form190_"+result.id+"' title='Delete' onclick='form190_delete_item($(this))'>";
						//rowsHTML+="<input type='button' class='share_icon' form='form190_"+result.id+"' title='Send SMS'>";
						rowsHTML+="<br><input type='button' class='generic_icon' form='form190_"+result.id+"' value='View Bill'>";
						rowsHTML+="<input type='hidden' form='form190_"+result.id+"' value='"+result.order_num+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";

			$('#form190_body').append(rowsHTML);

			var fields=document.getElementById("form190_"+result.id);
			var status_filter=fields.elements[4];
			//var share_button=fields.elements[8];
			var edit_button=fields.elements[8];
			
			set_static_value_list('sale_orders','status',status_filter);
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form190_update_item(fields);
			});
			
			if(result.bill_id=='undefined' || result.bill_id=='')
			{
				edit_button.value="Create Bill";			
			}
			else
			{
				edit_button.value="View Bill";
			}

			$(edit_button).on("click", function(event)
			{
				event.preventDefault();
				if(result.bill_id=='undefined' || result.bill_id=='')
				{
					element_display("",'form10');
					var form10_master=document.getElementById('form10_master');
					form10_master.elements['customer'].value=result.customer_name;
					form10_master.elements['order_num'].value=result.order_num;
					form10_master.elements['order_id'].value=result.id;	
				}
				else
				{
					element_display(result.bill_id,'form10');
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
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data(columns,'orders');
		});
		hide_loader();
	});	
};



/**
 * @form Enter Supplier Bill (Laundry)
 * @formNo 192
 * @Loading light
 */
function form192_ini()
{
	var bill_id=$("#form192_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form192_body').html("");
	$('#form192_foot').html("");
	
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
		
		var filter_fields=document.getElementById('form192_master');

		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			for (var i in bill_results)
			{
				filter_fields.elements[1].value=bill_results[i].supplier;
				filter_fields.elements[2].value=bill_results[i].bill_id;
				filter_fields.elements[3].value=get_my_past_date(bill_results[i].bill_date);
				filter_fields.elements[4].value=get_my_past_date(bill_results[i].entry_date);
				filter_fields.elements[5].value=bill_id;
				filter_fields.elements[6].value=bill_results[i].transaction_id;
				var save_button=filter_fields.elements[7];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form192_update_form();
				});
				
				var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
							"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
							"<td>Rs. "+bill_results[i].amount+"</br>" +
							"Rs. "+bill_results[i].discount+"</br>" +
							"Rs. "+bill_results[i].tax+"</br>" +
							"Rs. "+bill_results[i].total+"</td>" +
							"<td></td>" +
							"</tr>";
				$('#form192_foot').html(total_row);
				
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
					rowsHTML+="<form id='form192_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<textarea readonly='readonly' form='form192_"+id+"'>"+result.product_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form192_"+id+"' value='"+result.quantity+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form192_"+id+"' value='"+result.unit_price+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="Amount: <input type='number' readonly='readonly' form='form192_"+id+"' value='"+result.amount+"' step='any'>";
							rowsHTML+="<br>Tax: <input type='number' readonly='readonly' form='form192_"+id+"' value='"+result.tax+"' step='any'>";
							rowsHTML+="<br>Total: <input type='number' readonly='readonly' form='form192_"+id+"' value='"+result.total+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form192_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form192_"+id+"' id='save_form192_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form192_"+id+"' id='delete_form192_"+id+"' onclick='form192_delete_item($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form192_body').append(rowsHTML);
					
				});			
				hide_loader();
			});
		});
	}
}

/**
 * @form Promotion by list
 * @formNo 196
 * @Loading heavy
 */
function form196_ini()
{
	var master_form=document.getElementById('form196_master');
	var nl_name=master_form.elements['newsletter'].value;
	var nl_id=master_form.elements['nl_id'].value;	
	var sms_content=master_form.elements['sms'].value;	
	var list=master_form.elements['list'].value;	
	var list_value=master_form.elements['value'].value;	
	
	if(nl_id!="" || nl_name!="" || sms_content!="")
	{
		show_loader();
		
		var attributes_columns=new Object();
				attributes_columns.data_store='attributes';
				attributes_columns.return_column='name';
				attributes_columns.indexes=[{index:'attribute',exact:list},
								{index:'type',exact:'customer'},
								{index:'value',exact:list_value}];
		
		read_json_single_column(attributes_columns,function(attributes)
		{
			var customer_columns=new Object();
				customer_columns.data_store='customers';
				customer_columns.indexes=[{index:'id'},
								{index:'name'},
								{index:'email'},
								{index:'phone'},
								{index:'acc_name',array:attributes},
								{index:'email_subscription',unequal:'no'}];
				
			read_json_rows('',customer_columns,function(results)
			{
				form196_print_form(nl_name,nl_id,'mail',function(container)
				{
					var business_title=get_session_var('title');
					var subject=nl_name;
					
					var email_id_string="";
					var email_message=container.innerHTML;
					var from=get_session_var('email');
					
					var sms_type=get_session_var('sms_type');
					if(sms_type=='undefined')
					{
						sms_type='transaction';
					}
					var to_array=[];
					results.forEach(function (result) 
					{
						var customer_phone=result.phone;
						var customer_name=result.name;
						var message=sms_content.replace(/customer_name/g,customer_name);
						message=message.replace(/business_title/g,business_title);
						
						send_sms(customer_phone,message,sms_type);
						if(result.email!="")
						{
							var to={"email":result.email,"name":result.name,"customer_id":result.id};
							to_array.push(to);
						}						
					});
					
					var email_to=JSON.stringify(to_array);
					console.log(email_to);
										
					send_email(email_to,from,business_title,subject,email_message,function()
					{
						$("#modal58_link").click();
						hide_loader();			
					});
				});		
			});
		});
	}
}

/**
 * @form Promotion by list
 * @formNo 196
 * @Loading heavy
 */
function form196_ini_all()
{
	var master_form=document.getElementById('form196_master');
	var nl_name=master_form.elements['newsletter'].value;
	var nl_id=master_form.elements['nl_id'].value;	
	var sms_content=master_form.elements['sms'].value;	
	var list=master_form.elements['list'].value;	
	var list_value=master_form.elements['value'].value;	
	
	if(nl_id!="" && nl_name!="" || sms_content!="")
	{
		show_loader();
		
		var customer_columns=new Object();
			customer_columns.data_store='customers';
			customer_columns.indexes=[{index:'id'},
								{index:'name'},
								{index:'email'},
								{index:'phone'},
								{index:'acc_name'},
								{index:'email_subscription',unequal:'no'}];
		
		read_json_rows('',customer_columns,function(results)
		{
			form196_print_form(nl_name,nl_id,'mail',function(container)
			{
				var business_title=get_session_var('title');
				var subject=nl_name;
				
				var email_id_string="";
				var email_message=container.innerHTML;
				var from=get_session_var('email');
				
				var sms_type=get_session_var('sms_type');
				if(sms_type=='undefined')
				{
					sms_type='transaction';
				}
				var to_array=[];
				
				results.forEach(function (result) 
				{
					var customer_phone=result.phone;
					var customer_name=result.name;
					var message=sms_content.replace(/customer_name/g,customer_name);
					message=message.replace(/business_title/g,business_title);
						
					send_sms(customer_phone,message,sms_type);
				
					if(result.email!="")
					{
						var to={"email":result.email,"name":result.name,"customer_id":result.id};
						to_array.push(to);
					}				
				});
					
				var email_to=JSON.stringify(to_array);
				console.log(email_to);
				send_email(email_to,from,business_title,subject,email_message,function()
				{
					$("#modal58_link").click();
					hide_loader();			
				});
			});		
		});
	}
}

/**
 * @form LetterHeads
 * @formNo 195
 * @Loading light
 */
function form195_ini()
{
	show_loader();
	var fid=$("#form195_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form195_header');
	
	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form195_index');
	var prev_element=document.getElementById('form195_prev');
	var next_element=document.getElementById('form195_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<letterheads count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<date></date>" +
			"<receiver></receiver>"+
			"<subject></subject>"+
			"<salutation></salutation>"+
			"<content></content>"+
			"<signature></signature>"+
			"<footer></footer>"+
			"</letterheads>";

	$('#form195_body').html("");

	fetch_requested_data('form195',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form195_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form195_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='To'>";
						rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form195_"+result.id+"'>"+result.receiver+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form195_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form195_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='hidden' form='form195_"+result.id+"' value='"+result.subject+"'>";
						rowsHTML+="<input type='hidden' form='form195_"+result.id+"' value='"+result.salutation+"'>";
						rowsHTML+="<input type='hidden' form='form195_"+result.id+"' value='"+result.content+"'>";
						rowsHTML+="<input type='hidden' form='form195_"+result.id+"' value='"+result.signature+"'>";
						rowsHTML+="<input type='hidden' form='form195_"+result.id+"' value='"+result.footer+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form195_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form195_"+result.id+"' title='Delete' onclick='form195_delete_item($(this))'>";
						rowsHTML+="<input type='button' class='print_icon' form='form195_"+result.id+"' title='Print' onclick=\"form195_print_form('"+result.id+"')\">";
						rowsHTML+="<input type='button' class='share_icon' form='form195_"+result.id+"' title='Send as mail'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";

			$('#form195_body').append(rowsHTML);

			var fields=document.getElementById("form195_"+result.id);
			var share_button=fields.elements[12];

			$(share_button).click(function()
			{
				modal101_action(result.name,'','customer',function (func) 
				{
					print_form195(result.id,func);
				});
			});

			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form195_update_item(fields);
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
			get_export_data(columns,'letterheads');
		});
		hide_loader();
	});	
};

/**
 * @form Supplier Item mapping
 * @formNo 197
 * @Loading light
 */
function form197_ini()
{
	show_loader();
	var fid=$("#form197_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form197_header');
	
	var fproduct=filter_fields.elements[0].value;
	var fsupplier=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form197_index');
	var prev_element=document.getElementById('form197_prev');
	var next_element=document.getElementById('form197_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<supplier_item_mapping count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<item>"+fproduct+"</item>" +
			"<supplier>"+fsupplier+"</supplier>" +
			"</supplier_item_mapping>";

	$('#form197_body').html("");

	fetch_requested_data('form197',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form197_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<textarea readonly='readonly' form='form197_"+result.id+"'>"+result.item+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Supplier'>";
						rowsHTML+="<textarea readonly='readonly' form='form197_"+result.id+"'>"+result.supplier+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form197_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form197_"+result.id+"' value='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form197_"+result.id+"' value='Delete' onclick='form197_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form197_body').append(rowsHTML);
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
			get_export_data(columns,'supplier_item_mapping');
		});
		hide_loader();
	});
};

/**
 * @form Logistics Orders
 * @formNo 198
 * @Loading light
 */
function form198_ini()
{
	show_loader();
	var fid=$("#form198_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	console.log(fid);
	var master_form=document.getElementById('form198_master');
	var awb_num=master_form.elements['awb_num'];

	$('#form198_body').html("");

	var new_columns=new Object();
		new_columns.count=1;
		new_columns.start_index=0;
		new_columns.data_store='logistics_orders';		
		
		new_columns.indexes=[{index:'id',value:fid},
							{index:'order_num'},
							{index:'awb_num',value:awb_num.value},
							{index:'type'},
							{index:'manifest_type'},							
							{index:'channel_name'},
							{index:'merchant_name'},
							{index:'ship_to'},
							{index:'import_date'},
							{index:'address1'},
							{index:'address2'},
							{index:'city'},
							{index:'pincode'},
							{index:'state'},
							{index:'phone'},
							{index:'telephone'},
							{index:'sku'},
							{index:'pieces'},
							{index:'collectable_value'},
							{index:'declared_value'},
							{index:'weight'},
							{index:'volumetric_weight'},
							{index:'lbh'},
							{index:'len'},
							{index:'breadth'},
							{index:'height'},
							{index:'shipper_name'},
							{index:'return_address1'},
							{index:'return_address2'},
							{index:'return_address3'},
							{index:'vendor_phone'},
							{index:'return_pincode'},
							{index:'manifest_id'},
							{index:'delivery_person'},
							{index:'order_history'},
							{index:'drs_num'},
							{index:'branch'},
							{index:'received_by'},
							{index:'received_by_phone'},
							{index:'received_by_sign'},
							{index:'status'}];		

	read_json_rows('form198',new_columns,function(results)
	{
		console.log(results);	
		results.forEach(function(result)
		{
			if(awb_num.value=="")
			{
				awb_num.value=result.awb_num;
			}
			
			var order_history=JSON.parse(result.order_history);
		
			var rowsHTML="<b>Order History</b><br><table class='plain_table'><tr style='background-color:#4eac72'><td>Time</td><td>Details</td><td>Location</td><td>Status</td></tr>";
			
			for(var k in order_history)
			{
				rowsHTML+="<tr><td>"+get_my_datetime(order_history[k].timeStamp)+"</td><td>"+order_history[k].details+"</td><td>"+order_history[k].location+"</td><td>"+order_history[k].status+"</td></tr>";
			}
			rowsHTML+="</table><br>";

				rowsHTML+="<input type='hidden' name='id'  value='"+result.id+"'>";
				rowsHTML+="<label>Order #: <input type='text' name='order_num'  value='"+result.order_num+"'></label>";
				rowsHTML+="<label>Channel: <input type='text' name='channel_name'  value='"+result.channel_name+"' required></label>";
				rowsHTML+="<label>Type: <input type='text' name='type'  value='"+result.type+"' required></label>";
				rowsHTML+="<label>Manifest Type: <input type='text' name='manifest_type'  value='"+result.manifest_type+"' required></label>";
				rowsHTML+="<label>Manifest ID: <input type='text' name='manifest_id'  value='"+result.manifest_id+"' required></label>";
				rowsHTML+="<label>Customer Name: <textarea name='merchant_name'  required>"+result.merchant_name+"</textarea></label>";
				rowsHTML+="<label>Consignee: <textarea name='ship_to'  required>"+result.ship_to+"</textarea></label>";
				rowsHTML+="<label>Address 1: <textarea name='address1' >"+result.address1+"</textarea></label>";
				rowsHTML+="<label>Address 2: <textarea name='address2' >"+result.address2+"</textarea></label>";
				rowsHTML+="<label>Destination City: <input type='text' name='city'  value='"+result.city+"'></label>";
				rowsHTML+="<label>State: <input type='text' name='state'  value='"+result.state+"'></label>";
				rowsHTML+="<label>Pincode: <input type='text' name='pincode'  value='"+result.pincode+"'></label>";
				rowsHTML+="<label>Phone: <input type='text' name='phone'  required value='"+result.phone+"'></label>";
				rowsHTML+="<label>Telephone: <input type='text' name='telephone'  value='"+result.telephone+"'></label>";
				rowsHTML+="<label>Weight: <input type='number' step='any' name='weight'  value='"+result.weight+"'></label>";
				rowsHTML+="<label>Volumetric Weight: <input type='number' step='any' name='vol_weight'  value='"+result.volumetric_weight+"'></label>";
				rowsHTML+="<label>Declared Value: <input type='number' step='any' name='d_value'  value='"+result.declared_value+"'></label>";
				rowsHTML+="<label>Collectable Value: <input type='number' step='any' name='c_value'  value='"+result.collectable_value+"'></label>";
				rowsHTML+="<label>Vendor Name: <textarea name='shipper_name' >"+result.shipper_name+"</textarea></label>";
				rowsHTML+="<label>Return Address1: <textarea name='r_address1' >"+result.return_address1+"</textarea></label>";
				rowsHTML+="<label>Return Address2: <textarea name='r_address2' >"+result.return_address2+"</textarea></label>";
				rowsHTML+="<label>Return Address3: <textarea name='r_address3' >"+result.return_address3+"</textarea></label>";
				rowsHTML+="<label>Return Pincode: <input type='text' name='rpincode' value='"+result.return_pincode+"'></label>";
				if(result.lbh=="")
				{
					rowsHTML+="<label>LBH: <input type='text' name='lbh'  value='"+result.len+"*"+result.breadth+"*"+result.height+"'></label>";			
				}				
				else {				
					rowsHTML+="<label>LBH: <input type='text' name='lbh'  value='"+result.lbh+"'></label>";
				}				
				rowsHTML+="<label>Import Date: <input type='text' name='ddate'  value='"+get_my_past_date(result.import_date)+"'></label>";
				rowsHTML+="<label>Product Name: <textarea name='product_name' >"+result.sku+"</textarea></label>";
				rowsHTML+="<label>Status: <input type='text' name='status'  required value='"+result.status+"'></label>";
				rowsHTML+="<label>Delivery Person: <input type='text' name='delivery_person'  value='"+result.delivery_person+"'></label>";
				rowsHTML+="<label>DRS #: <input type='text' name='drs_num'  value='"+result.drs_num+"'></label>";
				rowsHTML+="<label>Branch: <input type='text' name='branch'  value='"+result.branch+"'></label>";
				rowsHTML+="<label>Received By: <input type='text' name='received_by'  value='"+result.received_by+"'></label>";
				rowsHTML+="<label>Received By (Phone): <input type='text' name='received_by_phone'  value='"+result.received_by_phone+"'></label>";
				rowsHTML+="<label>Signature:<div id='form198_canvas_div'></div></label>";
				rowsHTML+="<label><input type='button' value='Update' class='generic_icon' name='update' onclick='form198_update_item();'></label>";

			$('#form198_fieldset').html(rowsHTML);
			if(result.received_by_sign!="" && result.received_by_sign!=null && result.received_by_sign!="null")
			{
				dataURL="data:image/jsignature;base30,"+result.received_by_sign;
				$("#form198_canvas_div").jSignature({width:300,height:200,color:"#00F","background-color":"#F5F4A8"}); // inits the jSignature widget.			
				$("#form198_canvas_div").jSignature("setData",dataURL);
			}
		});

		
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();		
		hide_loader();
	});
};

/**
 * @form Create DRS
 * @formNo 200
 * @Loading light
 */
function form200_ini()
{
	var drs_id=$("#form200_link").attr('data_id');
	if(drs_id==null)
		drs_id="";	
	$('#form200_body').html("");
	$('#form200_foot').html("");
	
	if(drs_id!="")
	{
		show_loader();
		var drs_columns="<drs>" +
				"<id>"+drs_id+"</id>" +
				"<drs_num></drs_num>"+
				"<employee></employee>"+
				"<drs_time></drs_time>"+
				"<branch></branch>"+
				"</drs>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',drs_columns,function(drs_results)
		{
			var filter_fields=document.getElementById('form200_master');
			if(drs_results.length>0)
			{
				filter_fields.elements['drs_num'].value=drs_results[0].drs_num;
				filter_fields.elements['employee'].value=drs_results[0].employee;
				filter_fields.elements['date'].value=get_my_past_date(drs_results[0].drs_time);
				filter_fields.elements['id'].value=drs_results[0].id;
				filter_fields.elements['branch'].value=drs_results[0].branch;
				filter_fields.elements['saved'].value='yes';

				var save_button=filter_fields.elements['save'];
				
				$(save_button).show();
				
				var drs_items_column="<logistics_orders>" +
									"<id></id>" +
									"<awb_num></awb_num>" +
									"<manifest_type></manifest_type>" +
									"<order_num></order_num>" +
									"<merchant_name></merchant_name>" +
									"<ship_to></ship_to>" +
									"<address1></address1>" +
									"<address2></address2>" +
									"<city></city>" +
									"<pincode></pincode>" +
									"<phone></phone>" +
									"<weight></weight>" +
									"<pieces></pieces>" +
									"<status></status>" +
									"<drs_num exact='yes'>"+drs_results[0].drs_num+"</drs_num>" +
									"<drs_id exact='yes'>"+drs_id+"</drs_id>" +
									"</logistics_orders>";

				/////////////////////////////////////////////////////////////////////////
	
				fetch_requested_data('',drs_items_column,function(results)
				{
					results.forEach(function(result)
					{
						var id=result.id;
						var rowsHTML="<tr>";

						var address=result.ship_to+"\n"+result.address1+", "+result.address2+", "+result.city+"-"+result.pincode;
						if(result.address2=="--" || result.address2==result.address1)
						{
							var address=result.ship_to+"\n"+result.address1+", "+result.city+"-"+result.pincode;
						}						
						rowsHTML+="<form id='form200_"+id+"'></form>";
							rowsHTML+="<td data-th='S.No.'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='AWB #'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form200_"+id+"' value='"+result.awb_num+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Address'>";
								rowsHTML+="<textarea readonly='readonly' form='form200_"+id+"'>"+address+"</textarea>";
								rowsHTML+="<br>Phone: <input type='text' readonly='readonly' value='"+result.phone+"' form='form200_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="Weight: <input type='number' readonly='readonly' form='form200_"+id+"' value='"+result.weight+"' step='any'>";
								rowsHTML+="<br>Pieces: <input type='number' readonly='readonly' form='form200_"+id+"' value='"+result.pieces+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form200_"+id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form200_"+id+"' value='"+result.manifest_type+"'>";
								rowsHTML+="<input type='hidden' form='form200_"+id+"' value='"+result.order_num+"'>";
								rowsHTML+="<input type='hidden' form='form200_"+id+"' value='"+result.merchant_name+"'>";
								rowsHTML+="<input type='hidden' form='form200_"+id+"' value='"+id+"'>";
								rowsHTML+="<input type='button' class='submit_hidden' form='form200_"+id+"' id='save_form200_"+id+"'>";
								rowsHTML+="<input type='button' class='delete_icon' form='form200_"+id+"' id='delete_form200_"+id+"' onclick='form200_delete_item($(this));'>";
								rowsHTML+="<input type='hidden' form='form200_"+id+"' value='"+result.ship_to+"'>";
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
	
						$('#form200_body').append(rowsHTML);
						
						var item_form=document.getElementById('form200_'+id);
						var save_button=item_form.elements[10];
						
						$(save_button).on('click',function (e) 
						{
							e.preventDefault();
							form200_update_item(item_form);
						});
					});
					
					$('#form200_share').show();
					$('#form200_share').click(function()
					{
						modal101_action('Delivery Run Sheet',filter_fields.elements['employee'].value,'staff',function (func) 
						{
							print_form200(func);
						});
					});
					
					form200_update_serial_numbers();
					$('textarea').autosize();
					hide_loader();
				});
			}
		});
	}
}

/**
 * @form Manage DRS
 * @formNo 201
 * @Loading light
 */
function form201_ini()
{
	show_loader();
	var fid=$("#form201_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form201_header');

	//populating form 
	var fdrs=filter_fields.elements[0].value;
	var femployee=filter_fields.elements[1].value;
	var fdate=get_raw_time(filter_fields.elements[2].value);
	var ftype=filter_fields.elements[3].value;
	
	////indexing///
	var index_element=document.getElementById('form201_index');
	var prev_element=document.getElementById('form201_prev');
	var next_element=document.getElementById('form201_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	$('#form201_body').html("");
	
	if_data_read_access('store_areas',function(accessible_data)
	{
		//console.log(accessible_data);
		var branches_array=[];
		var branch_object={index:'branch',array:branches_array};
		
		for(var x in accessible_data)
		{
			branches_array.push(accessible_data[x].name);
			if(accessible_data[x].record_id=='all')
			{
				branch_object={index:'branch'};
				break;
			}
		}

		//console.log(branches_array);
		
		var type_object={index:'type'};
		if(ftype!="")
		{
			type_object={index:'type',exact:ftype};
		}
		var new_columns=new Object();
			new_columns.count=25;
			new_columns.start_index=start_index;
			new_columns.data_store='drs';		
			
			new_columns.indexes=[{index:'id',value:fid},
								{index:'drs_num',value:fdrs},
								{index:'employee',value:femployee},
								{index:'drs_time',value:fdate},
								type_object,
								{index:'collectable_amount'},
								{index:'collected_amount'},
								branch_object];
		
		read_json_rows('form201',new_columns,function(results)
		{
			var drs_num_array=[];
			results.forEach(function(result)
			{
				drs_num_array.push(result.drs_num);
				var rowsHTML="";
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form201_"+result.id+"'></form>";
						rowsHTML+="<td data-th='DRS #'>";
						if(result.type=='COD')
							rowsHTML+="<input type='text' class='input_link' readonly='readonly' form='form201_"+result.id+"' value='"+result.drs_num+"' onclick=\"element_display('"+result.id+"','form219');\">";
						else {
							rowsHTML+="<input type='text' class='input_link' readonly='readonly' form='form201_"+result.id+"' value='"+result.drs_num+"' onclick=\"element_display('"+result.id+"','form200');\">";
						}	
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Employee'>";
							rowsHTML+="<textarea readonly='readonly' form='form201_"+result.id+"'>"+result.employee+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='DRS Time'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form201_"+result.id+"' value='"+get_my_past_date(result.drs_time)+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Type'>";
							if(result.type=='COD')
								rowsHTML+="<input type='text' readonly='readonly' form='form201_"+result.id+"' title='Collectable Amount: Rs. "+result.collectable_amount+"\nCollected Amount: Rs. "+result.collected_amount+"' value='"+result.type+"'>";
							else
								rowsHTML+="<input type='text' readonly='readonly' form='form201_"+result.id+"' title='Non-COD' value='"+result.type+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form201_"+result.id+"' value='"+result.id+"' name='id'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form201_"+result.id+"' title='Delete order' onclick='form201_delete_item($(this));'>";
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
				
				$('#form201_body').append(rowsHTML);
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
				var columns=new Object();
				columns.count=0;
				columns.start_index=0;
				columns.data_store='logistics_orders';		
				
				columns.indexes=[{index:'id'},
								{index:'awb_num'},
								{index:'drs_time'},
								{index:'order_num'},
								{index:'weight'},
								{index:'pieces'},
								{index:'status'},
								{index:'delivery_person'},
								{index:'manifest_type'},
								{index:'merchant_name'},
								{index:'phone'},
								{index:'sku'},
								{index:'return_address1'},
								{index:'return_address2'},
								{index:'return_address3'},
								{index:'drs_num',array:drs_num_array}];		
	
				get_export_data_restructured(columns,'drs_details',function(new_results)
				{
					var sorted_array=[];
					new_results.forEach(function(new_result)
					{
						var sorted_element=new Object();
						sorted_element['DRS No']=new_result.drs_num;
						if(new_result.drs_time!="" && new_result.drs_time!="NULL")
						{	
							sorted_element['DRS Date']=get_my_datetime(new_result.drs_time);
						}
						else 
						{
							sorted_element['DRS Date']="";
						}	
						sorted_element['Order Id']=new_result.order_num;
						sorted_element['AWB No']=new_result.awb_num;
						sorted_element['Wt']=new_result.weight;
						sorted_element['Pcs']=new_result.pieces;
						sorted_element['status']=new_result.status;
						sorted_element['Delivery Boy']=new_result.delivery_person;
						sorted_element['AWB Type']=new_result.manifest_type;
						sorted_element['Merchant']=new_result.merchant_name;
						sorted_element['Merchant Address']=new_result.return_address1+", "+new_result.return_address2+", "+new_result.return_address3;
						sorted_element['Mobile No']=new_result.phone;
						sorted_element['Product Name']=new_result.sku;
						
						if(new_result.drs_num!="")
						{
							sorted_array.push(sorted_element);
						}
					});
					return sorted_array;
				});
			});
			hide_loader();
		});
	});
};


/**
 * @form Logistics Orders
 * @formNo 203
 * @Loading light
 */
function form203_ini()
{
	show_loader();
	var fid=$("#form203_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form203_header');

	//populating form 
	var fawb=filter_fields.elements[0].value;
	var forder=filter_fields.elements[1].value;
	var fdate=get_raw_time(filter_fields.elements[2].value);
	var fstatus=filter_fields.elements[3].value;
	
	////indexing///
	var index_element=document.getElementById('form203_index');
	var prev_element=document.getElementById('form203_prev');
	var next_element=document.getElementById('form203_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	
	$('#form203_body').html("");
	
	var awb_object={index:'awb_num'};
	var status_object={index:'status'};
	if(fawb!="")
	{
		awb_object={index:'awb_num',exact:fawb};
	}
	if(fstatus!="")
	{
		status_object={index:'status',exact:fstatus};
	}

	if_data_read_access('store_areas',function(accessible_data)
	{
		//console.log(accessible_data);
		var branches_array=[];
		var branch_object={index:'branch',array:branches_array};
		
		for(var x in accessible_data)
		{
			branches_array.push(accessible_data[x].name);
			if(accessible_data[x].record_id=='all')
			{
				branch_object={index:'branch'};
				break;
			}
		}

		//console.log(branch_object);
		
		var new_columns=new Object();
			new_columns.count=25;
			new_columns.start_index=start_index;
			new_columns.data_store='logistics_orders';		
			
			new_columns.indexes=[{index:'id',value:fid},
								{index:'order_num',value:forder},
								{index:'merchant_name'},
								{index:'ship_to'},
								{index:'import_date',value:fdate},
								{index:'type'},
								{index:'manifest_type'},
								{index:'branch'},
								branch_object,
								status_object,
								awb_object];
		
		read_json_rows('form203',new_columns,function(results)
		{	
			results.forEach(function(result)
			{
				var rowsHTML="";
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form203_"+result.id+"'></form>";
						rowsHTML+="<td data-th='AWB #'>";
							rowsHTML+="<input type='text' readonly='readonly' class='input_link' form='form203_"+result.id+"' onclick=\"element_display('"+result.id+"','form198');\" value='"+result.awb_num+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Order #'>";
							rowsHTML+=result.order_num;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Customer'>";
							rowsHTML+="<b>Merchant: </b>"+ result.merchant_name;
							rowsHTML+="<br><b>Ship to: </b>"+ result.ship_to;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Date'>";
							rowsHTML+=get_my_past_date(result.import_date);
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Type'>";
							rowsHTML+="<b>Type: </b>"+ result.type;
							rowsHTML+="<br><b>Manifest Type: </b>"+ result.manifest_type;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form203_"+result.id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form203_"+result.id+"' value='"+result.id+"' name='id'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form203_"+result.id+"' title='Delete order' onclick='form203_delete_item($(this));'>";
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
	
				$('#form203_body').append(rowsHTML);
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
			
			var export_button=filter_fields.elements['export'];
			$(export_button).off("click");
			$(export_button).on("click", function(event)
			{
				get_limited_export_data(new_columns,'logistics_orders',function(new_result)
				{
					new_result.import_date=get_my_datetime(new_result.import_date);
				});
			});
			hide_loader();
		});
	});
};

/**
 * @form Update Inventory (Aurilion)
 * @formNo 1
 * @Loading heavy
 */
function form207_ini()
{
	show_loader();
	var fid=$("#form207_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form207_header');
	
	var fname=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;

	////indexing///
	var index_element=document.getElementById('form207_index');
	var prev_element=document.getElementById('form207_prev');
	var next_element=document.getElementById('form207_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	
	var columns="<product_instances count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<batch>"+fbatch+"</batch>" +
		"<product_name>"+fname+"</product_name>" +
		"<manufacture_date></manufacture_date>"+
		"<expiry></expiry>" +
		"<cost_price></cost_price>"+
		"<sale_price></sale_price>"+
		"<mrp></mrp>"+		
		"</product_instances>";

	$('#form207_body').html("");
	
	fetch_requested_data('form207',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form207_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form207_"+result.id+"'>"+result.product_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form207_"+result.id+"' value='"+result.batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Expiry'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form207_"+result.id+"' class='dblclick_editable' value='"+get_my_past_date(result.expiry)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Pricing'>";
						rowsHTML+="MRP: <input type='number' step='any' readonly='readonly' form='form207_"+result.id+"' class='dblclick_editable' value='"+result.mrp+"'>";
						rowsHTML+="</br>SP: <input type='number' step='any' readonly='readonly' form='form207_"+result.id+"' value='"+result.sale_price+"' class='dblclick_editable'>";
						rowsHTML+="</br>CP: <input type='number' step='any' readonly='readonly' form='form207_"+result.id+"' value='"+result.cost_price+"' class='dblclick_editable' >";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="Fresh: <input type='number' step='any' readonly='readonly' form='form207_"+result.id+"' value=''>";
						rowsHTML+="</br>In use: <input type='number' step='any' readonly='readonly' form='form207_"+result.id+"' value=''>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form207_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' title='Save' form='form207_"+result.id+"'>";					
						rowsHTML+="<input type='button' class='delete_icon' title='Delete' form='form207_"+result.id+"' onclick='form207_delete_item($(this));'>";
						rowsHTML+="<input type='button' class='generic_icon' value='Inventory' title='Update Inventory' form='form207_"+result.id+"' onclick=\"modal143_action('"+result.product_name+"','"+result.batch+"')\">";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form207_body').append(rowsHTML);
			var fields=document.getElementById("form207_"+result.id);
			var expiry=fields.elements[2];
			var fresh_inventory=fields.elements[6];
			var inuse_inventory=fields.elements[7];
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form207_update_item(fields);
			});
			
			$(expiry).datepicker();
			
			var hireable_data="<bill_items sum='yes'>"+
							"<quantity></quantity>"+
							"<hired exact='yes'>yes</hired>"+
							"<fresh exact='yes'>yes</fresh>"+
							"<item_name exact='yes'>"+result.product_name+"</item_name>"+
							"<batch exact='yes'>"+result.batch+"</batch>"+
							"</bill_items>";
			set_my_value_func(hireable_data,inuse_inventory,function()
			{
				get_inventory(result.product_name,result.batch,function(inventory)
				{
					fresh_inventory.value=parseFloat(inventory)-parseFloat(inuse_inventory.value);
				});
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
			get_export_data(columns,'inventory');
		});
		hide_loader();
	});
};



/**
 * @form Treatment Plans
 * @formNo 208
 * @Loading light
 */
function form208_ini()
{
	show_loader();
	var fid=$("#form208_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form208_header');
	
	var fnum=filter_fields.elements[0].value;
	var fcust=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form208_index');
	var prev_element=document.getElementById('form208_prev');
	var next_element=document.getElementById('form208_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<treatment_plans count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<plan_num>"+fnum+"</plan_num>" +
			"<customer>"+fcust+"</customer>" +
			"<details></details>" +
			"<start_date></start_date>"+
			"<status>"+fstatus+"</status>"+
			"</treatment_plans>";

	$('#form208_body').html("");

	fetch_requested_data('form208',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form208_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Plan #'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form208_"+result.id+"' value='"+result.plan_num+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form208_"+result.id+"'>"+result.customer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form208_"+result.id+"'>"+result.details+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Start Date'>";
						rowsHTML+="<input type='text' class='dblclick_editable' readonly='readonly' form='form208_"+result.id+"' value='"+get_my_past_date(result.start_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form208_"+result.id+"' value='"+result.status+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form208_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form208_"+result.id+"' title='Edit/View Plan'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form208_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form208_"+result.id+"' title='Delete' onclick='form208_delete_item($(this))'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";

			$('#form208_body').append(rowsHTML);

			var fields=document.getElementById("form208_"+result.id);
			var date_filter=fields.elements[3];
			var status_filter=fields.elements[4];
			var edit_button=fields.elements[6];
			
			$(date_filter).datepicker();
			
			$(edit_button).on("click", function(event)
			{
				event.preventDefault();
				element_display(result.id,'form209');
			});

			set_static_value_list('treatment_plans','status',status_filter);
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form208_update_item(fields);
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
			get_export_data(columns,'treatment_plans');
		});
		hide_loader();
	});	
};

/**
 * @form Create Treatment Plan
 * @formNo 209
 * @Loading light
 */
function form209_ini()
{
	var plan_id=$("#form209_link").attr('data_id');
	if(plan_id==null)
		plan_id="";	
	
	$('#form209_body').html("");
	$('#form209_foot').html("");
	
	if(plan_id!="")
	{
		show_loader();
		var plan_columns="<treatment_plans>" +
				"<id>"+plan_id+"</id>" +
				"<plan_num></plan_num>" +
				"<details></details>" +
				"<customer></customer>" +
				"<start_date></start_date>" +
				"<status></status>"+
				"</treatment_plans>";
		
		var filter_fields=document.getElementById('form209_master');

		////separate fetch function to get plan details 
		fetch_requested_data('',plan_columns,function(plan_results)
		{
			if (plan_results.length>0)
			{
				filter_fields.elements['num'].value=plan_results[0].plan_num;
				filter_fields.elements['customer'].value=plan_results[0].customer;
				filter_fields.elements['date'].value=get_my_past_date(plan_results[0].start_date);
				filter_fields.elements['status'].value=plan_results[0].status;
				filter_fields.elements['plan_id'].value=plan_id;
				var save_button=filter_fields.elements['save'];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form209_update_form();
				});
			}
		
		
			var plan_items_column="<treatment_plan_items>" +
					"<id></id>" +
					"<item></item>" +
					"<order_no></order_no>" +
					"<status></status>" +
					"<details></details>" +
					"<from_time></from_time>" +
					"<to_time></to_time>" +
					"<plan_id exact='yes'>"+plan_id+"</plan_id>" +
					"</treatment_plan_items>";
			
			fetch_requested_data('',plan_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form209_"+id+"'></form>";
						rowsHTML+="<td data-th='Order'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form209_"+id+"' value='"+result.order_no+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form209_"+id+"' value='"+result.item+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Details'>";
							rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form209_"+id+"'>"+result.details+"</textarea>";
							rowsHTML+="<br><div id='form209_documents_"+id+"'></div>";
							rowsHTML+="<input type='button' form='form209_"+id+"' value='Add document' class='generic_icon'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Schedule'>";
							rowsHTML+="From: <input type='text' readonly='readonly' class='dblclick_editable' form='form209_"+id+"' value='"+get_my_past_date(result.from_time)+"'>";
							rowsHTML+="<br>To: <input type='text' readonly='readonly' class='dblclick_editable' form='form209_"+id+"' value='"+get_my_past_date(result.to_time)+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form209_"+id+"' class='dblclick_editable' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form209_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='save_icon' form='form209_"+id+"' id='save_form209_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form209_"+id+"' id='delete_form209_"+id+"' onclick='form209_delete_item($(this));'>";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
				
					$('#form209_body').prepend(rowsHTML);
					var fields=document.getElementById('form209_'+id);
					var doc_filter=fields.elements[3];
					var from_filter=fields.elements[4];
					var to_filter=fields.elements[5];
					var status_filter=fields.elements[6];
					var save_button=fields.elements[8];
					
					$(doc_filter).on('click',function () 
					{
						modal144_action('treatment_plan_items',id,function (url,doc_name) 
						{
							var docHTML="<a href='"+url+"' download='"+doc_name+"'><u>"+doc_name+"</u></a><br>";
							var doc_container=document.getElementById('form209_documents_'+id);
							$(doc_container).append(docHTML);
						});
					});
					
					$(from_filter).datepicker();
					$(to_filter).datepicker();
					set_static_value_list('treatment_plan_items','status',status_filter);
					
					$(save_button).on('click',function (event) 
					{
						event.preventDefault();
						form209_update_item(fields);
					});
					
					///fetching documents for this item					
					
					var doc_column="<documents>" +
							"<id></id>" +
							"<url></url>" +
							"<doc_name></doc_name>"+
							"<doc_type exact='yes'>treatment_plan_items</doc_type>" +
							"<target_id exact='yes'>"+result.id+"</target_id>" +
							"</documents>";
					fetch_requested_data('form209',doc_column,function(doc_results)
					{
						var docHTML="";
						for (var j in doc_results)
						{
							var updated_url=doc_results[j].url.replace(/ /g,"+");
							docHTML+="<a href='"+updated_url+"' download='"+doc_results[j].doc_name+"'><u>"+doc_results[j].doc_name+"</u></a><br>";							
						}
						document.getElementById('form209_documents_'+id).innerHTML=docHTML;
					});
				});

				$('#form209_share').show();
				$('#form209_share').click(function()
				{
					modal101_action('Treatment Plan',filter_fields.elements['customer'].value,'customer',function (func) 
					{
						print_form209(func);
					});
				});

				hide_loader();
			});
		});
	}
}

/**
 * @formNo 210
 * @report Order Packing
 */
function form210_ini()
{
	var master_form=document.getElementById('form210_master');
	var order_filter=master_form.elements['order'];
	var bill_filter=master_form.elements['bill'];
	var print_button=master_form.elements['print'];
	var print_invoice_button=master_form.elements['print_invoice'];
	var edit_invoice_button=master_form.elements['edit_invoice'];
	
	$('#form210_invoice_line').html('');
	$('#form210_invoice').html('');
	$('#form210_image').html('');

	show_loader();

	var bills_xml="<bills count='1'>"+
			"<id></id>"+
			"<customer_name></customer_name>"+
	       	"<bill_num exact='yes'>"+bill_filter.value+"</bill_num>"+
	   		"<order_num></order_num>"+
	  		"<order_id></order_id>"+
	       	"<bill_date></bill_date>"+
	      	"</bills>";
	fetch_requested_data('',bills_xml,function (bills) 
	{
	     if(bills.length>0)
	     {
	     	$(print_button).off('click'); 
			$(print_button).on('click',function () 
			{
				print_product_barcode(bills[0].id,"Order # "+bills[0].order_num,"Invoice # "+bills[0].bill_num);
			});

	     	$(print_invoice_button).off('click'); 
			$(print_invoice_button).on('click',function () 
			{
				print_form210(bills[0].id);
			});
			
			$(edit_invoice_button).off('click'); 
			$(edit_invoice_button).on('click',function () 
			{
				modal158_action(bills[0].id);
			});
			 	
	      	//////////provide a preview of the invoice//////////////////////
			var bill_items_xml="<bill_items>"+
					"<id></id>"+
					"<item_name></item_name>"+
					"<item_desc></item_desc>"+
					"<quantity></quantity>"+
					"<packed_quantity></packed_quantity>"+
					"<total></total>"+
					"<mrp></mrp>"+
					"<batch></batch>"+
					"<picked_status exact='yes'>picked</picked_status>"+
					"<packing_status></packing_status>"+
					"<show_for_packing></show_for_packing>"+
					"<storage></storage>"+
					"<bill_id exact='yes'>"+bills[0].id+"</bill_id>"+		
					"</bill_items>";
			fetch_requested_data('',bill_items_xml,function (bill_items) 
			{
				var inventory_adjust_xml="<inventory_adjust>"+
										"<id></id>"+
										"<product_name></product_name>"+
										"<item_desc></item_desc>"+
										"<quantity></quantity>"+
										"<packed_quantity></packed_quantity>"+
										"<batch></batch>"+
										"<picked_status exact='yes'>picked</picked_status>"+
										"<packing_status></packing_status>"+
										"<show_for_packing exact='yes'>yes</show_for_packing>"+
										"<storage></storage>"+
										"<source>picking</source>"+
										"<source_id exact='yes'>"+bills[0].id+"</source_id>"+		
										"</inventory_adjust>";
				fetch_requested_data('',inventory_adjust_xml,function (adjust_items) 
				{
					//console.log(bill_items);
					for(var c=0;c<bill_items.length;c++)
					{
						bill_items[c].table_type='bill_items';
						if(bill_items[c].show_for_packing=='dummy')
						{
							//console.log(bill_items[c]);
							bill_items.splice(c,1);
							c--;
						}
					}
						
					for(var b=0;b<adjust_items.length;b++)
					{
						var adjust_item=new Object();
						adjust_item.id=adjust_items[b].id;
						adjust_item.item_name=adjust_items[b].product_name;
						adjust_item.item_desc=adjust_items[b].item_desc;
						adjust_item.quantity=-(parseFloat(adjust_items[b].quantity));
						adjust_item.packed_quantity=-(parseFloat(adjust_items[b].packed_quantity));
						adjust_item.total="";
						adjust_item.mrp="";
						adjust_item.batch=adjust_items[b].batch;
						adjust_item.picked_status=adjust_items[b].picked_status;
						adjust_item.packing_status=adjust_items[b].packing_status;
						adjust_item.show_for_packing=adjust_items[b].show_for_packing;
						adjust_item.storage=adjust_items[b].storage;
						adjust_item.bill_id=adjust_items[b].source_id;
						adjust_item.table_type='inventory_adjust';
						bill_items.push(adjust_item);
					}
											
					if(bill_items.length>0)
					{
						////////////setting up containers///////////////////////	
						var container=document.getElementById('form210_invoice');
												
						var invoice_line=document.getElementById('form210_invoice_line');
						var table_container=document.createElement('div');
						
						////////////setting styles for containers/////////////////////////
										
						///////////////getting the content////////////////////////////////////////
						var date=get_my_past_date(bills[0].bill_date);				
						var invoice_no=bills[0].bill_num;
						var order_no=bills[0].order_num;
						
						invoice_line.innerHTML="<div style='float:left;width:50%;text-align:left'>Invoice #: "+invoice_no+"<br>Order #: "+order_no+"</div><div style='float:right;text-align:right;width:50%'>Invoice Date: "+date+"</div>";
												
						var table_copy=document.createElement('table');
						
						table_copy.setAttribute('width','100%');
						table_copy.setAttribute('class','plain_table');
						$(table_copy).append("<tr><th>SKU</th><th>Item</th><th>Batch</th><th>MRP</th><th>Total</th><th>Quantity</th></tr>");
	
						bill_items.forEach(function (item) 
						{
							if(isNaN(item.packed_quantity) || item.packed_quantity=='null' || item.packed_quantity=='')
							{
								item.packed_quantity=0;
							}
							var row_class="";
							if(item.packing_status=='packed')
							{
								row_class=" class='green_row'";
							}
							var item_object_string=JSON.stringify(item);
							$(table_copy).append("<tr "+row_class+" id='form210_row_"+item.id+"' data-object='"+item_object_string+"'><td>"+item.item_name+"</td><td>"+item.item_desc+"</td><td>"+item.batch+"</td></td><td>"+item.mrp+"</td><td>"+item.total+"</td><td>To Pack: <vyavsaay_p id='form210_topack_"+item.id+"'>"+item.quantity+"</vyavsaay_p><br>Packed: <vyavsaay_p id='form210_packed_"+item.id+"'>"+item.packed_quantity+"</vyavsaay_p><br>Rejected: <vyavsaay_p id='form210_rejected_"+item.id+"'>0</vyavsaay_p></td></tr>");	
						});
	
						container.appendChild(table_copy);
						
						hide_loader();
						/////////get images and packing instructions//////////					
						var bill_item_name_string="--";						
						bill_items.forEach(function(bill_item)
						{
							bill_item_name_string+=bill_item.item_name+"--";
						});
						var product_columns="<product_master>" +
								"<id></id>" +
								"<name array='yes'>"+bill_item_name_string+"</name>"+
								"<description></description>"+								
								"<packing></packing>"+
								"</product_master>";
						fetch_requested_data('',product_columns,function (products) 
						{
							products.forEach(function (product)
							{
								/////////get product image////////////
								var picture_column="<documents>" +
										"<id></id>" +
										"<url></url>" +
										"<doc_type exact='yes'>product_master</doc_type>" +
										"<target_id exact='yes'>"+product.id+"</target_id>" +
										"</documents>";
								fetch_requested_data('',picture_column,function(pic_results)
								{
									var pic_results_url="";
									var pic_results_id="";
									if(pic_results.length>0)
									{
										pic_results_id=pic_results[0].id;
										pic_results_url=pic_results[0].url;
									}
									updated_url=pic_results_url.replace(/ /g,"+");
									var imgHTML="<div style='display:block;width:45%;margin:5px;float:left;'><b>"+product.name+"</b>: "+product.description+"<br>Packing Instructions: "+product.packing+"<br><img style='width:98%;height:auto;' src='"+updated_url+"'></div>";
									
									$('#form210_image').append(imgHTML);	
									$('#form210_form').show();			
									//hide_loader();
								});
							});
						});											
					}
					else 
					{
						var container=document.getElementById('form210_invoice');
						container.innerHTML='<b>No items are pending for packing for this Order.<b>';	
						hide_loader();
					}
				});
			});
			////////////////////////////////////////////////////////////////
		}
		else 
		{
			var container=document.getElementById('form210_invoice');
			container.innerHTML='<b>Incorrect Order #<b>';	
			hide_loader();
		}		
	});		
};

/**
 * @form Update Logistics Orders (by drs)
 * @formNo 211
 * @Loading light
 */
function form211_ini()
{
	$('#form211_body').html("");
	$('#form211_foot').html("");

	var filter_fields=document.getElementById('form211_master');
	var drs_num=filter_fields['drs'].value;
	var all_status=filter_fields['status'].value;
	var all_remark=filter_fields['remark'].value;
	var awb_filter=filter_fields['awb_num'];
		
	if(drs_num!="")
	{
		show_loader();
		
		if_data_read_access('store_areas',function(accessible_data)
		{
			console.log(accessible_data);
			var branches_array=[];
			var branch_object={index:'branch',array:branches_array};
			
			for(var x in accessible_data)
			{
				branches_array.push(accessible_data[x].name);
				if(accessible_data[x].record_id=='all')
				{
					branch_object={index:'branch'};
					break;
				}
			}
	
			console.log(branch_object);
			
			var new_columns=new Object();
				new_columns.count=0;
				new_columns.start_index=0;
				new_columns.data_store='logistics_orders';
				new_columns.return_column='awb_num';		
				
				new_columns.indexes=[{index:'awb_num'},
									{index:'id'},
									{index:'drs_num',exact:drs_num},
									{index:'status'},
									{index:'order_history'},
									branch_object];

			set_my_value_list_json(new_columns,awb_filter);
			
			read_json_rows('',new_columns,function(results)
			{	
				results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form211_"+result.awb_num+"'></form>";
						rowsHTML+="<td data-th='AWB #'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form211_"+result.awb_num+"' value='"+result.awb_num+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Current Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form211_"+result.awb_num+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Updated Status'>";
							rowsHTML+="<input type='text' form='form211_"+result.awb_num+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Remark'>";
							rowsHTML+="<textarea form='form211_"+result.awb_num+"'></textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form211_"+result.awb_num+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form211_"+result.awb_num+"' id='save_form211_"+id+"'>";
							rowsHTML+="<input type='hidden' form='form211_"+result.awb_num+"' value='"+result.order_history+"'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form211_body').prepend(rowsHTML);
					var fields=document.getElementById("form211_"+result.awb_num);
					var status_filter=fields.elements[2];
					
					set_static_value_list('logistics_orders','status',status_filter);
							
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form211_update_item(fields);
					});
				});
				form211_get_totals();
				hide_loader();
			});
		});
	}
}


/**
 * @form Create manifest
 * @formNo 200
 * @Loading light
 */
function form215_ini()
{
	var drs_id=$("#form215_link").attr('data_id');
	if(drs_id==null)
		drs_id="";	
	$('#form215_body').html("");
	$('#form215_foot').html("");
	
	if(drs_id!="")
	{
		show_loader();
		var drs_columns="<drs>" +
				"<id>"+drs_id+"</id>" +
				"<drs_num></drs_num>"+
				"<drs_time></drs_time>"+
				"<num_orders></num_orders>"+
				"</drs>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',drs_columns,function(drs_results)
		{
			var filter_fields=document.getElementById('form215_master');
			if(drs_results.length>0)
			{
				filter_fields.elements['man_num'].value=drs_results[0].drs_num;
				filter_fields.elements['num_orders'].value=drs_results[0].num_orders;
				filter_fields.elements['date'].value=get_my_past_date(drs_results[0].drs_time);
				filter_fields.elements['id'].value=drs_results[0].id;
				
				var save_button=filter_fields.elements['save'];
				$(save_button).show();
				
				var drs_items_column="<bills>" +
									"<id></id>" +
									"<order_num></order_num>" +
									"<channel></channel>" +
									"<bill_num></bill_num>" +
									"<manifest_num exact='yes'>"+drs_results[0].drs_num+"</manifest_num>" +
									"<manifest_id exact='yes'>"+drs_id+"</manifest_id>" +
									"</bills>";

				/////////////////////////////////////////////////////////////////////////
	
				fetch_requested_data('',drs_items_column,function(results)
				{
					results.forEach(function(result)
					{
						var id=result.id;
						var rowsHTML="<tr>";

						rowsHTML+="<form id='form215_"+id+"'></form>";
							rowsHTML+="<td data-th='S.No.'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Bill Id'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form215_"+id+"' value='"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Bill #'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form215_"+id+"' value='"+result.bill_num+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Order #'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form215_"+id+"' value='"+result.order_num+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Channel'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form215_"+id+"' value='"+result.channel+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form215_"+id+"' value='"+id+"'>";
								rowsHTML+="<input type='button' class='submit_hidden' form='form215_"+id+"' id='save_form215_"+id+"'>";
								rowsHTML+="<input type='button' class='delete_icon' form='form215_"+id+"' id='delete_form215_"+id+"' onclick='form215_delete_item($(this));'>";
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
	
						$('#form215_body').append(rowsHTML);
						
						var item_form=document.getElementById('form215_'+id);
						var save_button=item_form.elements[5];
						
						$(save_button).on('click',function (e) 
						{
							e.preventDefault();
							form215_update_item(item_form);
						});
					});
					
					$('#form215_share').show();
					$('#form215_share').click(function()
					{
						modal101_action('Order Manifest - #'+filter_fields.elements['man_num'].value,'','staff',function (func) 
						{
							print_form215(func);
						});
					});
					
					form215_update_serial_numbers();
					$('textarea').autosize();
					hide_loader();
				});
			}
		});
	}
}


/**
 * @form SKU mapping (Supplier)
 * @formNo 217
 * @Loading light
 */
function form217_ini()
{
	show_loader();
	var fid=$("#form217_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form217_header');
	
	var fsupplier=filter_fields.elements[0].value;
	var fproduct=filter_fields.elements[1].value;
	var fsku=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form217_index');
	var prev_element=document.getElementById('form217_prev');
	var next_element=document.getElementById('form217_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<supplier_item_mapping count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<item>"+fproduct+"</item>" +
			"<item_desc></item_desc>" +
			"<supplier>"+fsupplier+"</supplier>" +
			"<supplier_sku>"+fsku+"</supplier_sku>" +
			"<margin></margin>" +
			"</supplier_item_mapping>";

	$('#form217_body').html("");

	fetch_requested_data('form217',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form217_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Supplier'>";
						rowsHTML+="<textarea readonly='readonly' form='form217_"+result.id+"'>"+result.supplier+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form217_"+result.id+"' value='"+result.item+"'>";
						rowsHTML+="<br><textarea readonly='readonly' form='form217_"+result.id+"'>"+result.item_desc+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Supplier SKU'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form217_"+result.id+"' value='"+result.supplier_sku+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Margin'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' class='dblclick_editable' form='form217_"+result.id+"' value='"+result.margin+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form217_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form217_"+result.id+"' value='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form217_"+result.id+"' value='Delete' onclick='form217_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form217_body').append(rowsHTML);
			var fields=document.getElementById("form217_"+result.id);
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form217_update_item(fields);
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
			get_export_data(columns,'supplier_sku');
		});
		hide_loader();
	});
};

/**
 * @form Create COD DRS
 * @formNo 219
 * @Loading light
 */
function form219_ini()
{
	var drs_id=$("#form219_link").attr('data_id');
	if(drs_id==null)
		drs_id="";	
	$('#form219_body').html("");
	$('#form219_foot').html("");
	
	if(drs_id!="")
	{
		show_loader();
		var drs_columns="<drs>" +
				"<id>"+drs_id+"</id>" +
				"<drs_num></drs_num>"+
				"<employee></employee>"+
				"<collectable_amount></collectable_amount>"+
				"<collected_amount></collected_amount>"+
				"<drs_time></drs_time>"+
				"<branch></branch>"+
				"</drs>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',drs_columns,function(drs_results)
		{
			var filter_fields=document.getElementById('form219_master');
			if(drs_results.length>0)
			{
				filter_fields.elements['drs_num'].value=drs_results[0].drs_num;
				filter_fields.elements['employee'].value=drs_results[0].employee;
				filter_fields.elements['date'].value=get_my_past_date(drs_results[0].drs_time);
				filter_fields.elements['id'].value=drs_results[0].id;
				filter_fields.elements['total'].value=drs_results[0].collectable_amount;
				filter_fields.elements['collected'].value=drs_results[0].collected_amount;
				filter_fields.elements['branch'].value=drs_results[0].branch;
				filter_fields.elements['saved'].value='yes';

				var save_button=filter_fields.elements['save'];
				$(save_button).show();
				
				var drs_items_column="<logistics_orders>" +
									"<id></id>" +
									"<awb_num></awb_num>" +
									"<manifest_type></manifest_type>" +
									"<order_num></order_num>" +
									"<merchant_name></merchant_name>" +
									"<ship_to></ship_to>" +
									"<address1></address1>" +
									"<address2></address2>" +
									"<city></city>" +
									"<pincode></pincode>" +
									"<phone></phone>" +
									"<weight></weight>" +
									"<pieces></pieces>" +
									"<status></status>" +
									"<collectable_value></collectable_value>"+
									"<drs_num exact='yes'>"+drs_results[0].drs_num+"</drs_num>" +
									"<drs_id exact='yes'>"+drs_id+"</drs_id>" +
									"</logistics_orders>";

				/////////////////////////////////////////////////////////////////////////
	
				fetch_requested_data('',drs_items_column,function(results)
				{
					results.forEach(function(result)
					{
						var id=result.id;
						var rowsHTML="<tr>";

						var address=result.ship_to+"\n"+result.address1+", "+result.address2+", "+result.city+"-"+result.pincode;
						if(result.address2=="--" || result.address2==result.address1)
						{
							var address=result.ship_to+"\n"+result.address1+", "+result.city+"-"+result.pincode;
						}						
						rowsHTML+="<form id='form219_"+id+"'></form>";
							rowsHTML+="<td data-th='S.No.'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='AWB #'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form219_"+id+"' value='"+result.awb_num+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Address'>";
								rowsHTML+="<textarea readonly='readonly' form='form219_"+id+"'>"+address+"</textarea>";
								rowsHTML+="<br>Phone: <input type='text' readonly='readonly' value='"+result.phone+"' form='form219_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="COD Amount: Rs. <input type='number' readonly='readonly' form='form219_"+id+"' value='"+result.collectable_value+"' step='any'>";
								rowsHTML+="<br>Weight: <input type='number' readonly='readonly' form='form219_"+id+"' value='"+result.weight+"' step='any'>";
								rowsHTML+="<br>Pieces: <input type='number' readonly='readonly' form='form219_"+id+"' value='"+result.pieces+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form219_"+id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form219_"+id+"' value='"+result.manifest_type+"'>";
								rowsHTML+="<input type='hidden' form='form219_"+id+"' value='"+result.order_num+"'>";
								rowsHTML+="<input type='hidden' form='form219_"+id+"' value='"+result.merchant_name+"'>";
								rowsHTML+="<input type='hidden' form='form219_"+id+"' value='"+id+"'>";
								rowsHTML+="<input type='button' class='submit_hidden' form='form219_"+id+"' id='save_form219_"+id+"'>";
								rowsHTML+="<input type='button' class='delete_icon' form='form219_"+id+"' id='delete_form219_"+id+"' onclick='form219_delete_item($(this));form219_update_serial_numbers();'>";
								rowsHTML+="<input type='hidden' form='form219_"+id+"' value='"+result.ship_to+"'>";
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
	
						$('#form219_body').append(rowsHTML);
						
						var item_form=document.getElementById('form219_'+id);
						var save_button=item_form.elements[11];
						
						$(save_button).on('click',function (e) 
						{
							e.preventDefault();
							form219_update_item(item_form);
						});
					});
					
					$('#form219_share').show();
					$('#form219_share').click(function()
					{
						modal101_action('Delivery Run Sheet',filter_fields.elements['employee'].value,'staff',function (func) 
						{
							print_form219(func);
						});
					});
					
					form219_update_serial_numbers();
					$('textarea').autosize();
					hide_loader();
				});
			}
		});
	}
}


/**
 * @form New Purchase order
 * @formNo 222
 * @Loading light
 */
function form222_ini()
{
	var order_id=$("#form222_link").attr('data_id');
	if(order_id==null)
		order_id="";	
	
	$('#form222_body').html("");
	$('#form222_foot').html("");
	
	if(order_id!="")
	{
		show_loader();
		var order_columns="<purchase_orders>" +
				"<id>"+order_id+"</id>" +
				"<order_num></order_num>"+
				"<supplier></supplier>" +
				"<order_date></order_date>" +
				"<status></status>" +
				"<amount></amount>"+
				"<tax></tax>"+
				"<total></total>"+
				"</purchase_orders>";
		var order_items_column="<purchase_order_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<item_desc></item_desc>" +
				"<quantity></quantity>" +
				"<order_id exact='yes'>"+order_id+"</order_id>" +
				"<make></make>" +
				"<mrp></mrp>"+
				"<price></price>" +
				"<amount></amount>"+
				"<tax></tax>"+
				"<total></total>"+				
				"</purchase_order_items>";
	
		////separate fetch function to get order details like customer name, total etc.
		fetch_requested_data('',order_columns,function(order_results)
		{
			var filter_fields=document.getElementById('form222_master');
			
			if(order_results.length>0)
			{
				filter_fields.elements['supplier'].value=order_results[0].supplier;
				filter_fields.elements['date'].value=get_my_past_date(order_results[0].order_date);
				filter_fields.elements['order_num'].value=order_results[0].order_num;
				filter_fields.elements['status'].value=order_results[0].status;
				filter_fields.elements['order_id'].value=order_id;
				var save_button=filter_fields.elements['save'];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form222_update_form();
				});
				
				var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
							"<td>Amount:<br>Tax: <br>Total: </td>" +
							"<td>Rs. "+order_results[0].amount+"<br>" +
							"Rs. "+order_results[0].tax+"<br> " +
							"Rs. "+order_results[0].total+"</td>" +
							"<td></td>" +
							"</tr>";
					
				$('#form222_foot').html(total_row);
			}
		
			fetch_requested_data('',order_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form222_"+id+"'></form>";
						rowsHTML+="<td data-th='Item Name'>";
							rowsHTML+="<input readonly='readonly' type='text' required form='form222_"+id+"' value='"+result.item_name+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' required form='form222_"+id+"' value='"+result.quantity+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Make'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form222_"+id+"' value='"+result.make+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="MRP: <input type='number' readonly='readonly' required form='form222_"+id+"' value='"+result.mrp+"' step='any'>";
							rowsHTML+="<br>Price: <input type='number' readonly='readonly' required form='form222_"+id+"' value='"+result.price+"' step='any'>";
							rowsHTML+="<br>Amount: <input type='number' readonly='readonly' required form='form222_"+id+"' value='"+result.amount+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' readonly='readonly' form='form222_"+id+"' value='"+result.tax+"'>";
							rowsHTML+="<input type='hidden' readonly='readonly' form='form222_"+id+"' value='"+result.total+"'>";
							rowsHTML+="<input type='hidden' form='form222_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form222_"+id+"' id='save_form222_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form222_"+id+"' id='delete_form222_"+id+"' onclick='form222_delete_item($(this)); form222_get_totals();'>";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
				
					$('#form222_body').append(rowsHTML);
				});
				var bt=get_session_var('title');
				$('#form222_share').show();
				$('#form222_share').click(function()
				{
					modal101_action(bt+' - PO# '+filter_fields.elements['order_num'].value,filter_fields.elements['supplier'].value,'supplier',function (func) 
					{
						print_form222(func);
					});
				});
				
				hide_loader();
			});
		});
	}
}

/**
 * @form Manage Purchase orders (Aurilion)
 * @formNo 223
 * @Loading light
 */
function form223_ini()
{
	show_loader();
	var fid=$("#form223_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form223_header');
	
	//populating form 
	var fnum=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form223_index');
	var prev_element=document.getElementById('form223_prev');
	var next_element=document.getElementById('form223_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<purchase_orders count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<order_num>"+fnum+"</order_num>"+
			"<supplier>"+fname+"</supplier>" +
			"<order_date></order_date>" +
			"<status>"+fstatus+"</status>" +
			"<bill_id></bill_id>"+
			"<last_updated></last_updated>" +
			"</purchase_orders>";

	$('#form223_body').html("");

	fetch_requested_data('form223',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form223_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Order #'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form223_"+result.id+"' value='"+result.order_num+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Supplier'>";
						rowsHTML+="<textarea readonly='readonly' form='form223_"+result.id+"'>"+result.supplier+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Order Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form223_"+result.id+"' value='"+get_my_past_date(result.order_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form223_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form223_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form223_"+result.id+"' title='Edit order' onclick=\"element_display('"+result.id+"','form222');\">";
						rowsHTML+="<input type='submit' class='save_icon' form='form223_"+result.id+"' title='Save order'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form223_"+result.id+"' title='Delete order' onclick='form223_delete_item($(this));'>";
					
					rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form223_body').append(rowsHTML);
			var fields=document.getElementById("form223_"+result.id);
			var status_filter=fields.elements[3];

			set_static_value_list('purchase_orders','status',status_filter);

			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form223_update_item(fields);
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
			get_export_data(columns,'purchase_orders');
		});
		hide_loader();
	});
};


/**
 * @form Manage Purchase orders (Aurilion)
 * @formNo 224
 * @Loading light
 */
function form224_ini()
{
	show_loader();
	var fid=$("#form224_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form224_header');
	
	//populating form 
	var fnum=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form224_index');
	var prev_element=document.getElementById('form224_prev');
	var next_element=document.getElementById('form224_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<testing_process count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<test_id>"+fnum+"</test_id>"+
			"<item>"+fname+"</item>" +
			"<details></details>" +
			"<status>"+fstatus+"</status>" +
			"<next_due></next_due>"+
			"</testing_process>";

	$('#form224_body').html("");

	fetch_requested_data('form224',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form224_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Test Id'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form224_"+result.id+"' value='"+result.test_id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<textarea readonly='readonly' form='form224_"+result.id+"'>"+result.item+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="<textarea readonly='readonly' form='form224_"+result.id+"' class='dblclick_editable'>"+result.details+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Next Due Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form224_"+result.id+"' value='"+get_my_past_date(result.next_due)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form224_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form224_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form224_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form224_"+result.id+"' title='Delete' onclick='form224_delete_item($(this));'>";
						rowsHTML+="<br><input type='button' class='generic_icon' form='form224_"+result.id+"' value='Add Results' onclick=\"modal146_action('"+result.id+"','"+result.test_id+"','"+result.item+"');\">";
					rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form224_body').append(rowsHTML);
			var fields=document.getElementById("form224_"+result.id);
			var date_filter=fields.elements[3];
			var status_filter=fields.elements[4];

			$(date_filter).datepicker();
			
			set_static_value_list('testing_process','status',status_filter);

			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form224_update_item(fields);
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
			get_export_data(columns,'Testing');
		});
		hide_loader();
	});
};


/**
 * @form Delivery Run
 * @formNo 226
 * @Loading light
 */
function form226_ini()
{
	show_loader();
	var fid=$("#form226_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form226_header');
	
	//populating form 
	var fperson=filter_fields.elements[0].value;
	var fdate=get_raw_time(filter_fields.elements[1].value);
	
	////indexing///
	var index_element=document.getElementById('form226_index');
	var prev_element=document.getElementById('form226_prev');
	var next_element=document.getElementById('form226_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<delivery_run count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<person>"+fperson+"</person>"+
			"<date>"+fdate+"</date>" +
			"<starting_km></starting_km>" +
			"<ending_km></ending_km>" +
			"<total_run></total_run>"+
			"</delivery_run>";

	$('#form226_body').html("");

	fetch_requested_data('form226',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="<tr>";
				rowsHTML+="<form id='form226_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Person'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form226_"+result.id+"' value='"+result.person+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form226_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Start KMs'>";
						rowsHTML+="<input type='number' readonly='readonly' step='any' form='form226_"+result.id+"' value='"+result.starting_km+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='End KMs'>";
						rowsHTML+="<input type='number' readonly='readonly' step='any' form='form226_"+result.id+"' value='"+result.ending_km+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Total Run (KMs)'>";
						rowsHTML+="<input type='number' readonly='readonly' step='any' form='form226_"+result.id+"' value='"+result.total_run+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form226_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form226_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form226_"+result.id+"' title='Delete' onclick='form226_delete_item($(this));'>";
					rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form226_body').append(rowsHTML);
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
			get_export_data(columns,'DeliveryRun');
		});
		hide_loader();
	});
};


/**
 * @form Warehouse Inventory
 * @formNo 227
 * @Loading heavy
 */
function form227_ini()
{
	show_loader();
	var fid=$("#form227_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form227_header');
	
	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form227_index');
	var prev_element=document.getElementById('form227_prev');
	var next_element=document.getElementById('form227_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	
	var columns="<product_instances count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<product_name>"+fname+"</product_name>" +
		"</product_instances>";

	$('#form227_body').html("");
	
	fetch_requested_data('form227',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form227_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<textarea readonly='readonly' form='form227_"+result.id+"'>"+result.product_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Warehouse Qty'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form227_"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='On Demo Qty'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form227_"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='On Hire Qty'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form227_"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form227_"+result.id+"' value='"+result.id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form227_body').append(rowsHTML);
			var fields=document.getElementById("form227_"+result.id);
			var w_in=fields.elements[1];
			var d_in=fields.elements[2];
			var h_in=fields.elements[3];
			
			get_inventory(result.product_name,'',function(inventory)
			{
				w_in.value=-parseFloat(inventory);
				var demo_quantity_xml="<bill_items sum='yes'>" +
					"<quantity></quantity>"+
					"<hiring_type exact='yes'>demo</hiring_type>"+
					"<issue_date lowerbound='yes'>"+get_my_time()+"</issue_date>"+
					"<item_name exact='yes'>"+result.product_name+"</item_name>" +
					"</bill_items>";
	
				get_single_column_data(function(demos)
				{
					if(demos.length>0)
					{
						w_in.value=parseFloat(w_in.value)-parseFloat(demos[0]);
					}
				},demo_quantity_xml);
	
				var hire_quantity_xml="<bill_items sum='yes'>" +
					"<quantity></quantity>"+
					"<hiring_type exact='yes'>hire</hiring_type>"+
					"<issue_date lowerbound='yes'>"+get_my_time()+"</issue_date>"+
					"<item_name exact='yes'>"+result.product_name+"</item_name>" +
					"</bill_items>";
	
				get_single_column_data(function(hires)
				{
					if(hires.length>0)
					{
						w_in.value=parseFloat(w_in.value)-parseFloat(hires[0]);
					}
				},hire_quantity_xml);
			});
			
			var demo_quantity_xml="<bill_items sum='yes'>" +
				"<quantity></quantity>"+
				"<hiring_type exact='yes'>demo</hiring_type>"+
				"<issue_date upperbound='yes'>"+get_my_time()+"</issue_date>"+
				"<item_name exact='yes'>"+result.product_name+"</item_name>" +
				"</bill_items>";

			set_my_value_func(demo_quantity_xml,d_in,function()
			{
				d_in.value=(-parseFloat(d_in.value));
			});

			var hire_quantity_xml="<bill_items sum='yes'>" +
				"<quantity></quantity>"+
				"<hiring_type exact='yes'>hire</hiring_type>"+
				"<issue_date upperbound='yes'>"+get_my_time()+"</issue_date>"+
				"<item_name exact='yes'>"+result.product_name+"</item_name>" +
				"</bill_items>";

			set_my_value_func(hire_quantity_xml,h_in,function()
			{
				h_in.value=-parseFloat(h_in.value);
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

		var export_button=filter_fields.elements[1];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data_extended(columns,'WarehouseInventory',function(new_result)
			{
				total_export_requests+=3;

				get_inventory(new_result.product_name,'',function(inventory)
				{
					new_result.warehouse_quantity=""+(-parseFloat(inventory));
					total_export_requests-=1;
				});
				
				var demo_quantity_xml="<bill_items sum='yes'>" +
					"<quantity></quantity>"+
					"<hiring_type exact='yes'>demo</hiring_type>"+
					"<issue_date upperbound='yes'>"+get_my_time()+"</issue_date>"+
					"<item_name exact='yes'>"+new_result.product_name+"</item_name>" +
					"</bill_items>";
	
				get_single_column_data(function(inventories)
				{
					if(inventories.length>0)
					{
						new_result.demo_quantity=""+(-parseFloat(inventories[0]));
					}
					else 
					{
						new_result.demo_quantity=""+0;
					}
					total_export_requests-=1;
				},demo_quantity_xml);

				var hire_quantity_xml="<bill_items sum='yes'>" +
					"<quantity></quantity>"+
					"<hiring_type exact='yes'>hire</hiring_type>"+
					"<issue_date upperbound='yes'>"+get_my_time()+"</issue_date>"+
					"<item_name exact='yes'>"+new_result.product_name+"</item_name>" +
					"</bill_items>";
	
				get_single_column_data(function(inventories)
				{
					if(inventories.length>0)
					{
						new_result.hire_quantity=""+(-parseFloat(inventories[0]));
					}
					else 
					{
						new_result.hire_quantity=""+0;
					}
					total_export_requests-=1;
				},hire_quantity_xml);
			});
		});
		hide_loader();
	});
};

/**
 * @form Demo
 * @formNo 228
 * @Loading light
 */
function form228_ini()
{
	show_loader();
	var fid=$("#form228_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form228_header');
	
	var fitem=filter_fields.elements[0].value;
	var fcustomer=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form228_index');
	var prev_element=document.getElementById('form228_prev');
	var next_element=document.getElementById('form228_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<bill_items count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<item_name>"+fitem+"</item_name>" +
			"<customer>"+fcustomer+"</customer>" +
			"<quantity></quantity>" +
			"<issue_date></issue_date>" +
			"<issue_type exact='yes'>out</issue_type>" +
			"<hiring_type exact='yes'>demo</hiring_type>" +
			"</bill_items>";

	$('#form228_body').html("");

	fetch_requested_data('form228',columns,function(results)
	{
		//console.log('form228_ini');
		results.forEach(function(result)
		{
			result.quantity=-parseFloat(result.quantity);
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form228_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<textarea readonly='readonly' form='form228_"+result.id+"'>"+result.item_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="Issued: <input type='number' step='any' readonly='readonly' form='form228_"+result.id+"' value='"+result.quantity+"'>";
						rowsHTML+="<br>Returned: <input type='number' step='any' readonly='readonly' form='form228_"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form228_"+result.id+"'>"+result.customer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+="Issued: <input type='text' readonly='readonly' form='form228_"+result.id+"' value='"+get_my_past_date(result.issue_date)+"'>";
						rowsHTML+="<br>Returned: <input type='text' readonly='readonly' form='form228_"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form228_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='hidden' form='form228_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form228_"+result.id+"' onclick='form228_delete_item($(this));'>";
						rowsHTML+="<input type='button' class='generic_icon' form='form228_"+result.id+"' value='Return' onclick=\"modal147_action('demo',$(this));\">";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form228_body').append(rowsHTML);
			var fields=document.getElementById("form228_"+result.id);
			var issue_quantity_filter=fields.elements[1];
			var return_quantity_filter=fields.elements[2];
			var return_date_filter=fields.elements[5];
			var return_button=fields.elements[9];

			var columns="<bill_items>" +
					"<quantity></quantity>" +
					"<issue_date></issue_date>" +
					"<issue_type exact='yes'>in</issue_type>" +
					"<hiring_type exact='yes'>demo</hiring_type>" +
					"<issue_id exact='yes'>"+result.id+"</issue_id>" +
					"</bill_items>";
			
			fetch_requested_data('form228',columns,function(return_results)
			{
				var returned_quantity=0;
				var return_date="";
				return_results.forEach(function(r_result)
				{
					returned_quantity+=parseFloat(r_result.quantity);
					if(return_date=="")					
						return_date=r_result.issue_date;
				});
				return_quantity_filter.value=returned_quantity;
				return_date_filter.value=get_my_past_date(return_date);
				
				if(parseFloat(return_quantity_filter.value)>=parseFloat(issue_quantity_filter.value))
				{
					$(return_button).hide();
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
		$('textarea').autosize();

		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data(columns,'demo');
		});
		hide_loader();
	});
};

/**
 * @form Hiring Inventory
 * @formNo 229
 * @Loading heavy
 */
function form229_ini()
{
	show_loader();
	var fid=$("#form229_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form229_header');
	
	var fitem=filter_fields.elements[0].value;
	var fcustomer=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form229_index');
	var prev_element=document.getElementById('form229_prev');
	var next_element=document.getElementById('form229_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<bill_items count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<item_name>"+fitem+"</item_name>" +
			"<customer>"+fcustomer+"</customer>" +
			"<quantity></quantity>" +
			"<issue_date></issue_date>" +
			"<issue_type exact='yes'>out</issue_type>" +
			"<hiring_type exact='yes'>hire</hiring_type>" +
			"</bill_items>";

	$('#form229_body').html("");

	fetch_requested_data('form229',columns,function(results)
	{
		results.forEach(function(result)
		{
			result.quantity=-parseFloat(result.quantity);
			var rowsHTML="<tr>";
				rowsHTML+="<form id='form229_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<textarea readonly='readonly' form='form229_"+result.id+"'>"+result.item_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="Issued: <input type='number' step='any' readonly='readonly' form='form229_"+result.id+"' value='"+result.quantity+"'>";
						rowsHTML+="<br>Returned: <input type='number' step='any' readonly='readonly' form='form229_"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form229_"+result.id+"'>"+result.customer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+="Issued: <input type='text' readonly='readonly' form='form229_"+result.id+"' value='"+get_my_past_date(result.issue_date)+"'>";
						rowsHTML+="<br>Returned: <input type='text' readonly='readonly' form='form229_"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form229_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='hidden' form='form229_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form229_"+result.id+"' onclick='form229_delete_item($(this));'>";
						rowsHTML+="<input type='button' class='generic_icon' form='form229_"+result.id+"' value='Return' onclick=\"modal147_action('hire',$(this));\">";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form229_body').append(rowsHTML);
			var fields=document.getElementById("form229_"+result.id);
			var issue_quantity_filter=fields.elements[1];
			var return_quantity_filter=fields.elements[2];
			var return_date_filter=fields.elements[5];
			var return_button=fields.elements[9];
			
			var columns="<bill_items>" +
					"<quantity></quantity>" +
					"<issue_date></issue_date>" +
					"<issue_type exact='yes'>in</issue_type>" +
					"<hiring_type exact='yes'>hire</hiring_type>" +
					"<issue_id exact='yes'>"+result.id+"</issue_id>" +
					"</bill_items>";
			fetch_requested_data('form229',columns,function(return_results)
			{
				var returned_quantity=0;
				var return_date="";
				return_results.forEach(function(r_result)
				{
					returned_quantity+=parseFloat(r_result.quantity);
					if(return_date=="")					
						return_date=r_result.issue_date;
				});
				return_quantity_filter.value=returned_quantity;
				return_date_filter.value=get_my_past_date(return_date);
				
				if(parseFloat(return_quantity_filter.value)==parseFloat(issue_quantity_filter.value))
				{
					$(return_button).hide();
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
		$('textarea').autosize();
		
		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data(columns,'hire');
		});
		hide_loader();
	});
};

/**
 * @form In-out
 * @formNo 230
 * @Loading light
 */
function form230_ini()
{
	show_loader();
	var fid=$("#form230_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form230_header');
	
	var fitem=filter_fields.elements[0].value;
	var fissue=filter_fields.elements[1].value;
	var fhire=filter_fields.elements[2].value;
	var fcustomer=filter_fields.elements[3].value;
	
	////indexing///
	var index_element=document.getElementById('form230_index');
	var prev_element=document.getElementById('form230_prev');
	var next_element=document.getElementById('form230_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<bill_items count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<item_name>"+fitem+"</item_name>" +
			"<hiring_type>"+fhire+"</hiring_type>" +
			"<customer>"+fcustomer+"</customer>" +
			"<quantity></quantity>" +
			"<issue_date></issue_date>" +
			"<issue_type>"+fissue+"</issue_type>" +
			"<notes></notes>"+
			"</bill_items>";

	$('#form230_body').html("");

	fetch_requested_data('form230',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form230_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<textarea readonly='readonly' form='form230_"+result.id+"'>"+result.item_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form230_"+result.id+"' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form230_"+result.id+"' value='"+result.issue_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='For/From'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form230_"+result.id+"' value='"+result.hiring_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='To/From'>";
						rowsHTML+="<textarea readonly='readonly' form='form230_"+result.id+"'>"+result.customer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="Date: <input type='text' readonly='readonly' form='form230_"+result.id+"' value='"+get_my_past_date(result.issue_date)+"'>";
						rowsHTML+="<br><textarea placeholder='Notes' readonly='readonly' class='dblclick_editable' form='form230_"+result.id+"'>"+result.notes+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form230_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='save_icon' form='form230_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form230_"+result.id+"' onclick='form230_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form230_body').append(rowsHTML);
			var fields=document.getElementById('form230_'+result.id);
			
			$(fields).on('submit',function (ev) 
			{
				ev.preventDefault();
				form230_update_item(fields);
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
			get_export_data(columns,'In-out');
		});
		hide_loader();
	});
};

/**
 * @form Create Prescriptions
 * @formNo 231
 * @Loading light
 */
function form231_ini()
{
	var pres_id=$("#form231_link").attr('data_id');
	if(pres_id==null)
		pres_id="";	

	$('#form231_body').html("");
	$('#form231_foot').html("");
	
	if(pres_id!="")
	{
		show_loader();
		var pres_columns="<prescriptions>" +
				"<id>"+pres_id+"</id>" +
				"<p_num></p_num>" +
				"<patient></patient>" +
				"<doctor></doctor>" +
				"<date></date>" +
				"<next_date></next_date>" +
				"</prescriptions>";
		
		var filter_fields=document.getElementById('form231_master');

		////separate fetch function to get plan details 
		fetch_requested_data('',pres_columns,function(pres_results)
		{
			if (pres_results.length>0)
			{
				filter_fields.elements['p_num'].value=pres_results[0].p_num;
				filter_fields.elements['patient'].value=pres_results[0].patient;
				filter_fields.elements['doctor'].value=pres_results[0].doctor;
				filter_fields.elements['date'].value=get_my_past_date(pres_results[0].date);
				filter_fields.elements['next'].value=get_my_past_date(pres_results[0].next_date);
				filter_fields.elements['pres_id'].value=pres_id;
				var save_button=filter_fields.elements['save'];

				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form231_update_form();
				});
			}

			var plan_items_column="<prescription_items>" +
					"<id></id>" +
					"<p_id exact='yes'>"+pres_id+"</p_id>" +
					"<item></item>" +
					"<type></type>" +
					"<dosage></dosage>" +
					"<num_days></num_days>" +
					"</prescription_items>";
			
			fetch_requested_data('',plan_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form231_"+id+"'></form>";
						rowsHTML+="<td data-th='Type'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form231_"+id+"' value='"+result.type+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Medicine'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form231_"+id+"' value='"+result.item+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Strength'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form231_"+id+"' value='"+result.dosage+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Frequency'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form231_"+id+"' value='"+result.frequency+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Days'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form231_"+id+"' value='"+result.num_days+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form231_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='save_icon' form='form231_"+id+"' id='save_form231_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form231_"+id+"' id='delete_form231_"+id+"' onclick='form231_delete_item($(this));'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form231_body').prepend(rowsHTML);
				});
				
				var bt=get_session_var('title');
				$('#form231_share').show();
				$('#form231_share').click(function()
				{
					modal101_action('Prescription from '+bt,filter_fields.elements['patient'].value,'customer',function (func) 
					{
						print_form231(func);
					});
				});

				hide_loader();
			});
		});
	}
}

/**
 * @form Manage Prescriptions
 * @formNo 232
 * @Loading light
 */
function form232_ini()
{
	show_loader();
	var fid=$("#form232_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form232_header');
	
	var fnum=filter_fields.elements[0].value;
	var fdoctor=filter_fields.elements[1].value;
	var fpatient=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form232_index');
	var prev_element=document.getElementById('form232_prev');
	var next_element=document.getElementById('form232_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<prescriptions count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<p_num>"+fnum+"</p_num>" +
			"<doctor>"+fdoctor+"</doctor>" +
			"<patient>"+fpatient+"</patient>" +
			"<date></date>"+
			"<next_date></next_date>"+
			"</prescriptions>";

	$('#form232_body').html("");

	fetch_requested_data('form232',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form232_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Pres #'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form232_"+result.id+"' value='"+result.p_num+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Doctor'>";
						rowsHTML+="<textarea readonly='readonly' form='form232_"+result.id+"'>"+result.doctor+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Patient'>";
						rowsHTML+="<textarea readonly='readonly' form='form232_"+result.id+"'>"+result.patient+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form232_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Next Visit'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form232_"+result.id+"' value='"+get_my_past_date(result.next_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form232_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='edit_icon' form='form232_"+result.id+"' title='Edit/View'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form232_"+result.id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form232_"+result.id+"' title='Delete' onclick='form232_delete_item($(this))'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";

			$('#form232_body').append(rowsHTML);

			var fields=document.getElementById("form232_"+result.id);
			var edit_button=fields.elements[6];
			
			$(edit_button).on("click", function(event)
			{
				event.preventDefault();
				element_display(result.id,'form231');
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
			get_export_data(columns,'prescriptions');
		});
		hide_loader();
	});	
};


/**
 * @form Newsletter Creator
 * @formNo 233
 * @Loading light
 */
function form233_ini()
{
	var fid=$("#form233_link").attr('data_id');
	if(fid==null)
		fid="";
	
	if(fid!="")
	{
		console.log('loading');
		show_loader();

		var columns="<newsletter count='1'>" +
			"<id>"+fid+"</id>" +
			"<name></name>" +
			"<description></description>" +
			"<html_content></html_content>" +
			"<pic_url></pic_url>"+
			"</newsletter>";
		fetch_requested_data('form233',columns,function(newsletters)
		{
			if(newsletters.length>0)
			{
				var master_form=document.getElementById('form233_form');
				master_form.elements['name'].value=newsletters[0].name;
				master_form.elements['description'].value=newsletters[0].description;
				master_form.elements['id'].value=newsletters[0].id;
				master_form.elements['pic_url'].value=newsletters[0].pic_url;

				$(master_form).off('submit');
				$(master_form).on('submit',function (e) 
				{
					e.preventDefault();
					form233_update_item();
				});
				
				//console.log(revert_htmlentities(newsletters[0].html_content));
				var updated_content=revert_htmlentities(newsletters[0].html_content);
				$('#form233_section').html(updated_content);
				
				//$(".resizable").resizable();
			    //$(".draggable").draggable();

			    $('.resizable-aspect-ratio').resizable({aspectRatio: true});
    	        //$('.draggable-containment').draggable({ containment: "window" });
			}
			hide_loader();
		});	
	}
};


/**
 * @form Manage Products (without tax)
 * @formNo 234
 * @Loading light
 */
function form234_ini()
{
	show_loader();
	var fid=$("#form234_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form234_header');
	
	var fname=filter_fields.elements[0].value;
	var fmakes=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form234_index');
	var prev_element=document.getElementById('form234_prev');
	var next_element=document.getElementById('form234_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<product_master count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fname+"</name>" +
			"<make>"+fmakes+"</make>" +
			"<description></description>" +
			"<bar_code></bar_code>" +
			"<last_updated></last_updated>" +
			"</product_master>";

	$('#form234_body').html("");

	fetch_requested_data('form234',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form234_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form234_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Make'>";
						rowsHTML+="<textarea readonly='readonly' form='form234_"+result.id+"' class='dblclick_editable'>"+result.make+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Description'>";
						rowsHTML+="<textarea readonly='readonly' form='form234_"+result.id+"' class='dblclick_editable'>"+result.description+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details' id='form234_"+result.id+"_details'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form234_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form234_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form234_"+result.id+"' value='saved' onclick='form234_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		
			$('#form234_body').append(rowsHTML);

			var fields=document.getElementById("form234_"+result.id);
			
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form234_update_item(fields);
			});
			
			var attributes_data="<attributes>"+
								"<name exact='yes'>"+result.name+"</name>" +
								"<type exact='yes'>product</type>" +
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
				var td_elem=document.getElementById('form234_'+result.id+'_details');
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
			get_export_data(columns,'products');
		});
		hide_loader();
	});	
};


/**
 * @form Manage Products (Grid)
 * @formNo 235
 * @Loading heavy
 */
function form235_ini()
{
	show_loader();
	var fid=$("#form235_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form235_header');
	
	var fname=filter_fields.elements[1].value;
	var fmakes=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form235_index');
	var prev_element=document.getElementById('form235_prev');
	var next_element=document.getElementById('form235_next');
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

	$('#form235_grid').html("");

	fetch_requested_data('form235',columns,function(results)
	{
		results.forEach(function(result)
		{
			var picture_column="<documents>" +
					"<id></id>" +
					"<url></url>" +
					"<doc_type exact='yes'>product_master</doc_type>" +
					"<target_id exact='yes'>"+result.id+"</target_id>" +
					"</documents>";
			fetch_requested_data('form235',picture_column,function(pic_results)
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
				
				var rowsHTML="<li><ul class='form_grid_item'>";
					rowsHTML+="<form id='form235_"+result.id+"'></form>";
						rowsHTML+="<li>";
							rowsHTML+="<output form='form235_"+result.id+"'><div class='form_grid_item' name='"+pic_results_id+"'><img id='img_form235_"+result.id+"' src='"+updated_url+"'></div></output>";
							rowsHTML+="<input type='file' form='form235_"+result.id+"'>";
							rowsHTML+="<input type='button' class='generic_icon' value='Change Picture' form='form235_"+result.id+"'>";
						rowsHTML+="</li>";
						rowsHTML+="<li>";
							rowsHTML+="Name: <textarea readonly='readonly' form='form235_"+result.id+"'>"+result.name+"</textarea>";
						rowsHTML+="</li>";
						rowsHTML+="<li>";
							rowsHTML+="Make: <textarea readonly='readonly' form='form235_"+result.id+"' class='dblclick_editable'>"+result.make+"</textarea>";
						rowsHTML+="</li>";
						rowsHTML+="<li>";
							rowsHTML+="Description: <textarea readonly='readonly' form='form235_"+result.id+"' class='dblclick_editable'>"+result.description+"</textarea>";
						rowsHTML+="</li>";
						rowsHTML+="<li>";
							rowsHTML+="Tax: <input type='text' readonly='readonly' form='form235_"+result.id+"' class='dblclick_editable' value='"+result.tax+"'>";
						rowsHTML+="</li>";
						rowsHTML+="<li data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form235_"+result.id+"' value='"+result.id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form235_"+result.id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form235_"+result.id+"' onclick='form235_delete_item($(this));'>";	
						rowsHTML+="</li>";			
				rowsHTML+="</ul></li>";
			
				$('#form235_grid').append(rowsHTML);

				var fields=document.getElementById("form235_"+result.id);
				var pictureinfo=fields.elements[0];
				var picture=fields.elements[1];
				var dummy_button=fields.elements[2];

				$(fields).on("submit",function(event)
				{
					event.preventDefault();
					form235_update_item(fields);
				});
				
				$(dummy_button).on('click',function (e) 
				{
					e.preventDefault();
					$(picture).trigger('click');
				});
				
				picture.addEventListener('change',function(evt)
				{
					select_picture(evt,pictureinfo,function(dataURL)
					{
						pictureinfo.innerHTML="<div class='form_grid_item' name='"+pic_results_id+"'><img id='img_form235_"+result.id+"' src='"+dataURL+"'></div>";			
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

		var export_button=filter_fields.elements[4];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data(columns,'products');
		});
		hide_loader();
	});	
};

/**
 * @form Manage Manifest
 * @formNo 236
 * @Loading light
 */
function form236_ini()
{
	show_loader();
	var fid=$("#form236_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form236_header');

	//populating form 
	var fdrs=filter_fields.elements[0].value;
	var fdate=get_raw_time(filter_fields.elements[1].value);
	
	////indexing///
	var index_element=document.getElementById('form236_index');
	var prev_element=document.getElementById('form236_prev');
	var next_element=document.getElementById('form236_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<drs count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<drs_num>"+fdrs+"</drs_num>"+
			"<drs_time>"+fdate+"</drs_time>" +
			"<num_orders></num_orders>" +
			"</drs>";

	$('#form236_body').html("");

	fetch_requested_data('form236',columns,function(results)
	{	
		var drs_num_array="--";
		results.forEach(function(result)
		{
			drs_num_array+=result.drs_num+"--";
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form236_"+result.id+"'></form>";
					rowsHTML+="<td data-th='DRS #'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form236_"+result.id+"' value='"+result.drs_num+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='DRS Time'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form236_"+result.id+"' value='"+get_my_past_date(result.drs_time)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='# Orders'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form236_"+result.id+"' value='"+result.num_orders+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form236_"+result.id+"' value='"+result.id+"' name='id'>";
						rowsHTML+="<input type='button' form='form236_"+result.id+"' class='edit_icon' title='View Manifest' name='edit' onclick=\"element_display('"+result.id+"','form215');\">";
						rowsHTML+="<input type='button' class='delete_icon' form='form236_"+result.id+"' title='Delete order' onclick='form236_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form236_body').append(rowsHTML);
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
			get_export_data(columns,'manifest_details');
		});
		hide_loader();
	});
};


/**
 * @form SKU components
 * @formNo 245
 * @Loading light
 */
function form245_ini()
{
	show_loader();

	var master_fields=document.getElementById('form245_master');
	var master_name=master_fields.elements['item_name'].value;
	
		
	var items_column="<pre_requisites>" +
						"<id></id>" +
						"<type exact='yes'>product</type>" +
						"<requisite_type exact='yes'>product</requisite_type>" +
						"<requisite_name></requisite_name>" +
						"<requisite_desc></requisite_desc>" +
						"<quantity></quantity>" +
						"<name exact='yes'>"+master_name+"</name>" +
						"</pre_requisites>";
	
	fetch_requested_data('form245',items_column,function(results)
	{
		console.log(results);
		results.forEach(function(result)
		{
			var id=result.id;
			var rowsHTML="<tr>";
			rowsHTML+="<form id='form245_"+id+"'></form>";
				rowsHTML+="<td data-th='S.No.'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='SKU'>";
					rowsHTML+="<input type='text' readonly='readonly' form='form245_"+id+"' value='"+result.requisite_name+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Item Name'>";
					rowsHTML+="<textarea readonly='readonly' form='form245_"+id+"'>"+result.requisite_desc+"</textarea>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Quantity'>";
					rowsHTML+="<input type='number' step='any' readonly='readonly' form='form245_"+id+"' value='"+result.quantity+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					rowsHTML+="<input type='hidden' form='form245_"+id+"' value='"+id+"'>";
					rowsHTML+="<input type='button' class='submit_hidden' form='form245_"+id+"' id='save_form245_"+id+"'>";
					rowsHTML+="<input type='button' class='delete_icon' form='form245_"+id+"' id='delete_form245_"+id+"' onclick='form245_delete_item($(this));'>";
				rowsHTML+="</td>";			
			rowsHTML+="</tr>";

			$('#form245_body').append(rowsHTML);
		});
		
		form245_update_serial_numbers();
		$('textarea').autosize();
		hide_loader();
	});
}

/**
 * @form Transfer zones
 * @formNo 246
 * @Loading light
 */
function form246_ini()
{
	show_loader();
	var fid=$("#form246_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form246_header');
	
	var fzone=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form246_index');
	var prev_element=document.getElementById('form246_prev');
	var next_element=document.getElementById('form246_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<transfer_zones count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<name>"+fzone+"</name>" +
			"<description></description>"+
			"</transfer_zones>";

	$('#form246_body').html("");

	fetch_requested_data('form246',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form246_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Zone'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form246_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Description'>";
						rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form246_"+result.id+"'>"+result.description+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form246_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' form='form246_"+result.id+"' title='Save' class='save_icon'>";
						rowsHTML+="<input type='button' form='form246_"+result.id+"' title='Delete' class='delete_icon' onclick='form246_delete_item($(this));'>";
					rowsHTML+="</td>";				
			rowsHTML+="</tr>";
			
			$('#form246_body').append(rowsHTML);
			var fields=document.getElementById('form246_'+result.id);
			var save_button=fields.elements[3];
			
			$(fields).on('submit',function (e) 
			{
				e.preventDefault();
				form246_update_item(fields);
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
			get_export_data(columns,'transfer zones');
		});
		hide_loader();
	});
};

/**
 * @form Manage Pincodes
 * @formNo 247
 * @Loading light
 */
function form247_ini()
{
	show_loader();
	var fid=$("#form247_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form247_header');
	
	var fpincode=filter_fields.elements[0].value;
	var fzone=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form247_index');
	var prev_element=document.getElementById('form247_prev');
	var next_element=document.getElementById('form247_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<pincodes count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<zone>"+fzone+"</zone>" +
			"<status></status>"+
			"<pincode>"+fpincode+"</pincode>"+
			"</pincodes>";

	$('#form247_body').html("");

	fetch_requested_data('form247',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form247_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Pincode'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form247_"+result.id+"' value='"+result.pincode+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Zone'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form247_"+result.id+"' value='"+result.zone+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form247_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form247_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' form='form247_"+result.id+"' title='Save' class='save_icon'>";
						rowsHTML+="<input type='button' form='form247_"+result.id+"' title='Delete' class='delete_icon' onclick='form247_delete_item($(this));'>";
					rowsHTML+="</td>";				
			rowsHTML+="</tr>";
			
			$('#form247_body').append(rowsHTML);
			var fields=document.getElementById('form247_'+result.id);
			var zone_filter=fields.elements[1];
			var status_filter=fields.elements[2];
			var save_button=fields.elements[4];
			
			var zone_data="<transfer_zones>"+
						"<name></name>"+
						"</transfer_zones>";
			set_my_value_list(zone_data,zone_filter);
						
			set_static_value_list('pincodes','status',status_filter);
			
			$(fields).on('submit',function (e) 
			{
				e.preventDefault();
				form247_update_item(fields);
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
			get_export_data(columns,'Pincodes');
		});
		hide_loader();
	});
};


/**
 * @form Create Transit bag
 * @formNo 248
 * @Loading light
 */
function form248_ini()
{
	var bag_id=$("#form248_link").attr('data_id');
	if(bag_id==null)
		bag_id="";	
	$('#form248_body').html("");
	$('#form248_foot').html("");
	
	if(bag_id!="")
	{
		show_loader();
		var bag_columns="<transit_bags>" +
				"<id>"+bag_id+"</id>" +
				"<bag_num></bag_num>"+
				"<lbh></lbh>"+
				"<weight></weight>"+
				"<date></date>"+
				"<num_orders></num_orders>"+
				"<branch></branch>"+
				"</transit_bags>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bag_columns,function(bag_results)
		{
			var filter_fields=document.getElementById('form248_master');
			if(bag_results.length>0)
			{
				filter_fields.elements['bag_num'].value=bag_results[0].bag_num;
				filter_fields.elements['lbh'].value=bag_results[0].lbh;
				filter_fields.elements['weight'].value=bag_results[0].weight;
				filter_fields.elements['date'].value=get_my_past_date(bag_results[0].date);
				filter_fields.elements['id'].value=bag_results[0].id;
				filter_fields.elements['num_orders'].value=bag_results[0].num_orders;
				filter_fields.elements['branch'].value=bag_results[0].branch;
				filter_fields.elements['saved'].value='yes';

				filter_fields.elements['branch'].setAttribute('readonly','readonly');
				
				var save_button=filter_fields.elements['save'];
				$(save_button).show();
				
				var bag_items_column="<logistics_orders>" +
									"<id></id>" +
									"<awb_num></awb_num>" +
									"<manifest_type></manifest_type>" +
									"<order_num></order_num>" +
									"<ship_to></ship_to>" +
									"<address1></address1>" +
									"<address2></address2>" +
									"<city></city>" +
									"<pincode></pincode>" +
									"<phone></phone>" +
									"<weight></weight>" +
									"<status></status>" +
									"<lbh></lbh>"+
									"<bag_num exact='yes'>"+bag_results[0].bag_num+"</bag_num>" +
									"<bag_id exact='yes'>"+bag_id+"</bag_id>" +
									"</logistics_orders>";

				/////////////////////////////////////////////////////////////////////////
	
				fetch_requested_data('',bag_items_column,function(results)
				{
					results.forEach(function(result)
					{
						var id=result.id;
						var rowsHTML="<tr>";

						var address=result.ship_to+"\n"+result.address1+", "+result.address2+", "+result.city+"-"+result.pincode;
						if(result.address2=="--" || result.address2==result.address1)
						{
							var address=result.ship_to+"\n"+result.address1+", "+result.city+"-"+result.pincode;
						}						
						rowsHTML+="<form id='form248_"+id+"'></form>";
							rowsHTML+="<td data-th='S.No.'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='AWB #'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form248_"+id+"' value='"+result.awb_num+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Address'>";
								rowsHTML+="<textarea readonly='readonly' form='form248_"+id+"'>"+address+"</textarea>";
								rowsHTML+="<br><b>Phone</b>: <input type='text' readonly='readonly' value='"+result.phone+"' form='form248_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<b>Weight</b>: <input type='number' step='any' readonly='readonly' form='form248_"+id+"' value='"+result.weight+"'>";
								rowsHTML+="<br><b>LBH</b>: <input type='text' readonly='readonly' value='"+result.lbh+"' form='form248_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form248_"+id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form248_"+id+"' value='"+id+"'>";
								rowsHTML+="<input type='button' class='submit_hidden' form='form248_"+id+"' id='save_form248_"+id+"'>";
								rowsHTML+="<input type='button' class='delete_icon' form='form248_"+id+"' id='delete_form248_"+id+"' onclick='form248_delete_item($(this));'>";
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
	
						$('#form248_body').append(rowsHTML);
						
						var item_form=document.getElementById('form248_'+id);
						var save_button=item_form.elements[7];
						
						$(save_button).on('click',function (e) 
						{
							e.preventDefault();
							form248_update_item(item_form);
						});
					});
					
					form248_update_serial_numbers();
					$('textarea').autosize();
					hide_loader();
				});
			}
		});
	}
}

/**
 * @form Manage Transit bag
 * @formNo 249
 * @Loading light
 */
function form249_ini()
{
	show_loader();
	var fid=$("#form249_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form249_header');

	//populating form 
	var fbag=filter_fields.elements[0].value;
	var fdate=get_raw_time(filter_fields.elements[1].value);
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form249_index');
	var prev_element=document.getElementById('form249_prev');
	var next_element=document.getElementById('form249_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	$('#form249_body').html("");
	
	if_data_read_access('store_areas',function(accessible_data)
	{
		console.log(accessible_data);
		var branches_array=[];
		var branch_object={index:'branch',array:branches_array};
		
		for(var x in accessible_data)
		{
			branches_array.push(accessible_data[x].name);
			if(accessible_data[x].record_id=='all')
			{
				branch_object={index:'branch'};
				break;
			}
		}

		console.log(branch_object);
		
		var new_columns=new Object();
			new_columns.count=25;
			new_columns.start_index=start_index;
			new_columns.data_store='transit_bags';		
			
			new_columns.indexes=[{index:'id',value:fid},
								{index:'bag_num',value:fbag},
								{index:'lbh'},
								{index:'weight'},
								{index:'date',value:fdate},
								{index:'num_orders'},
								{index:'status',value:fstatus},
								{index:'mts'},
								branch_object];
		
		read_json_rows('form249',new_columns,function(results)
		{			
			results.forEach(function(result)
			{
				var rowsHTML="";
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form249_"+result.id+"'></form>";
						rowsHTML+="<td data-th='Bag #'>";
							rowsHTML+="<input type='text' class='input_link' readonly='readonly' form='form249_"+result.id+"' value='"+result.bag_num+"' onclick=\"element_display('"+result.id+"','form248');\">";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Date'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form249_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form249_"+result.id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='MTS'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form249_"+result.id+"' value='"+result.mts+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form249_"+result.id+"' value='"+result.id+"' name='id'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form249_"+result.id+"' title='Delete' onclick='form249_delete_item($(this));'>";
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
				
				$('#form249_body').append(rowsHTML);
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
				get_export_data(columns,'Transit bags');
			});
			hide_loader();
		});
	});
};

/**
 * @form Create MTS
 * @formNo 250
 * @Loading light
 */
function form250_ini()
{
	var mts_id=$("#form250_link").attr('data_id');
	if(mts_id==null)
		mts_id="";	
	$('#form250_body').html("");
	$('#form250_foot').html("");
	
	if(mts_id!="")
	{
		show_loader();
		var mts_columns="<mts>" +
				"<id>"+mts_id+"</id>" +
				"<mts_num></mts_num>"+
				"<weight></weight>"+
				"<branch></branch>"+
				"<date></date>"+
				"<num_orders></num_orders>"+
				"<num_bags></num_bags>"+
				"</mts>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',mts_columns,function(mts_results)
		{
			var filter_fields=document.getElementById('form250_master');
			if(mts_results.length>0)
			{
				filter_fields.elements['mts_num'].value=mts_results[0].mts_num;
				filter_fields.elements['branch'].value=mts_results[0].branch;
				filter_fields.elements['weight'].value=mts_results[0].weight;
				filter_fields.elements['date'].value=get_my_past_date(mts_results[0].date);
				filter_fields.elements['id'].value=mts_results[0].id;
				filter_fields.elements['num_orders'].value=mts_results[0].num_orders;
				filter_fields.elements['num_bags'].value=mts_results[0].num_bags;
				filter_fields.elements['saved'].value='yes';

				var save_button=filter_fields.elements['save'];
				$(save_button).show();
				
				var bag_columns="<transit_bags>" +
						"<id></id>" +
						"<bag_num></bag_num>"+
						"<weight></weight>"+
						"<lbh></lbh>"+
						"<date></date>"+
						"<num_orders></num_orders>"+
						"<mts_id exact='yes'>"+mts_id+"</mts_id>"+
						"</transit_bags>";
			
				/////////////////////////////////////////////////////////////////////////
	
				fetch_requested_data('',bag_columns,function(results)
				{
					results.forEach(function(result)
					{
						var id=result.id;
						var rowsHTML="<tr>";
						rowsHTML+="<form id='form250_"+id+"'></form>";
							rowsHTML+="<td data-th='S.No.'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Bag #'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form250_"+id+"' value='"+result.bag_num+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='LBH'>";
								rowsHTML+="<textarea readonly='readonly' form='form250_"+id+"'>"+result.lbh+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Weight'>";
								rowsHTML+="<input type='number' step='any' readonly='readonly' form='form250_"+id+"' value='"+result.weight+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='# orders'>";
								rowsHTML+="<input type='number' step='any' readonly='readonly' form='form250_"+id+"' value='"+result.num_orders+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form250_"+id+"' value='"+id+"'>";
								rowsHTML+="<input type='button' class='submit_hidden' form='form250_"+id+"' id='save_form250_"+id+"'>";
								rowsHTML+="<input type='button' class='delete_icon' form='form250_"+id+"' id='delete_form250_"+id+"' onclick='form250_delete_item($(this));'>";
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
	
						$('#form250_body').append(rowsHTML);
						
						var item_form=document.getElementById('form250_'+id);
						var save_button=item_form.elements[5];
						
						$(save_button).on('click',function (e) 
						{
							e.preventDefault();
							form250_update_item(item_form);
						});
					});
					
					form250_update_serial_numbers();
					
					$('#form250_share').show();
					$('#form250_share').click(function()
					{
						modal101_action('Material Transfer Sheet','','staff',function (func) 
						{
							print_form250(func);
						});
					});
					
					$('textarea').autosize();
					hide_loader();
				});
			}
		});
	}
}

/**
 * @form Manage MTS
 * @formNo 251
 * @Loading light
 */
function form251_ini()
{
	show_loader();
	var fid=$("#form251_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form251_header');

	//populating form 
	var fmts=filter_fields.elements[0].value;
	var fdate=get_raw_time(filter_fields.elements[1].value);
	var fbranch=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form251_index');
	var prev_element=document.getElementById('form251_prev');
	var next_element=document.getElementById('form251_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	$('#form251_body').html("");
	
	if_data_read_access('store_areas',function(accessible_data)
	{
		console.log(accessible_data);
		var branches_array=[];
		var branch_object={index:'branch',array:branches_array};
		
		for(var x in accessible_data)
		{
			branches_array.push(accessible_data[x].name);
			if(accessible_data[x].record_id=='all')
			{
				branch_object={index:'branch'};
				break;
			}
		}
		
		branch_object.value=fbranch;
		console.log(branch_object);
		
		var new_columns=new Object();
			new_columns.count=25;
			new_columns.start_index=start_index;
			new_columns.data_store='mts';		
			
			new_columns.indexes=[{index:'id',value:fid},
								{index:'mts_num',value:fmts},
								{index:'weight'},
								{index:'date',value:fdate},
								{index:'num_orders'},
								{index:'num_bags'},
								branch_object];
		
		read_json_rows('form251',new_columns,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="";
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form251_"+result.id+"'></form>";
						rowsHTML+="<td data-th='MTS #'>";
							rowsHTML+="<input type='text' class='input_link' readonly='readonly' form='form251_"+result.id+"' value='"+result.mts_num+"' onclick=\"element_display('"+result.id+"','form250');\">";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Date'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form251_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Branch'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form251_"+result.id+"' value='"+result.branch+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Details'>";
							rowsHTML+="<b>Bags</b>: <input type='number' readonly='readonly' form='form251_"+result.id+"' value='"+result.num_bags+"'>";
							rowsHTML+="<br><b>Orders</b>: <input type='number' readonly='readonly' form='form251_"+result.id+"' value='"+result.num_orders+"'>";
							rowsHTML+="<br><b>Weight</b>: <input type='number' readonly='readonly' form='form251_"+result.id+"' value='"+result.weight+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form251_"+result.id+"' value='"+result.id+"' name='id'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form251_"+result.id+"' title='Delete' onclick='form251_delete_item($(this));'>";
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
				
				$('#form251_body').append(rowsHTML);
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
				get_export_data(columns,'MTS');
			});
			hide_loader();
		});
	});
};


/**
 * @form Vendor Leads
 * @formNo 252
 * @Loading light
 */
function form252_ini()
{
	show_loader();
	var fid=$("#form252_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form252_header');
	var fname=filter_fields.elements[0].value;
	var fidentify=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form252_index');
	var prev_element=document.getElementById('form252_prev');
	var next_element=document.getElementById('form252_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<sale_leads count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<customer>"+fname+"</customer>" +
		"<detail></detail>" +
		"<status></status>" +
		"<due_date></due_date>" +
		"<identified_by>"+fidentify+"</identified_by>" +
		"<type exact='yes'>vendor</type>" +
		"</sale_leads>";
	
	$('#form252_body').html("");
	
	fetch_requested_data('form252',columns,function(results)
	{
		results.forEach(function(result)
		{
			var row_class="";
			if(result.status=='closed')
			{
				row_class="class='cancelled_row'";
			}
			var rowsHTML="";
			rowsHTML+="<tr "+row_class+">";
				rowsHTML+="<form id='form252_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form252_"+result.id+"'>"+result.customer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="<textarea readonly='readonly' form='form252_"+result.id+"' class='dblclick_editable'>"+result.detail+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Due Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form252_"+result.id+"' class='dblclick_editable' value='"+get_my_past_date(result.due_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Identified By'>";
					if(result.identified_by=="")
						rowsHTML+="<input type='text' readonly='readonly' form='form252_"+result.id+"' class='dblclick_editable' value='"+result.identified_by+"'>";
					else
						rowsHTML+="<input type='text' readonly='readonly' form='form252_"+result.id+"' value='"+result.identified_by+"'>";	
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form252_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form252_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form252_"+result.id+"' onclick='form252_delete_item($(this));'>";
					if(result.status!='closed')					
					{					
						rowsHTML+="<br><input type='button' class='generic_icon' form='form252_"+result.id+"' value='Follow-up' onclick=\"modal134_action('"+result.id+"','"+result.customer+"','"+result.detail+"');\">";
						rowsHTML+="<br><input type='button' class='generic_icon' form='form252_"+result.id+"' value='Update Contact' onclick=\"modal145_action('"+result.customer+"');\">";
						rowsHTML+="<br><input type='button' class='generic_icon' form='form252_"+result.id+"' value='Close Lead' onclick=\"modal153_action(this,'"+result.id+"');\">";
					}					
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form252_body').append(rowsHTML);
			var fields=document.getElementById("form252_"+result.id);
			var identified_filter=fields.elements[3];
			
			var identified_data="<staff>"+
								"<acc_name></acc_name>"+
								"</staff>";
			set_my_value_list(identified_data,identified_filter);
					
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form252_update_item(fields);
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
			get_export_data(columns,'Vendor Support');
		});
		hide_loader();
	});
};

/**
 * @form Customer Leads
 * @formNo 253
 * @Loading light
 */
function form253_ini()
{
	show_loader();
	var fid=$("#form253_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form253_header');
	var fname=filter_fields.elements[0].value;
	var fidentify=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form253_index');
	var prev_element=document.getElementById('form253_prev');
	var next_element=document.getElementById('form253_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<sale_leads count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<customer>"+fname+"</customer>" +
		"<detail></detail>" +
		"<status></status>" +
		"<due_date></due_date>" +
		"<identified_by>"+fidentify+"</identified_by>" +
		"<type exact='yes'>customer</type>" +
		"</sale_leads>";
	
	$('#form253_body').html("");
	
	fetch_requested_data('form253',columns,function(results)
	{
		results.forEach(function(result)
		{
			var row_class="";
			if(result.status=='closed')
			{
				row_class="class='cancelled_row'";
			}
			var rowsHTML="";
			rowsHTML+="<tr "+row_class+">";
				rowsHTML+="<form id='form253_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form253_"+result.id+"'>"+result.customer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="<textarea readonly='readonly' form='form253_"+result.id+"' class='dblclick_editable'>"+result.detail+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Due Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form253_"+result.id+"' class='dblclick_editable' value='"+get_my_past_date(result.due_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Identified By'>";
					if(result.identified_by=="")
						rowsHTML+="<input type='text' readonly='readonly' form='form253_"+result.id+"' class='dblclick_editable' value='"+result.identified_by+"'>";
					else
						rowsHTML+="<input type='text' readonly='readonly' form='form253_"+result.id+"' value='"+result.identified_by+"'>";	
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form253_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form253_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form253_"+result.id+"' onclick='form253_delete_item($(this));'>";
					if(result.status!='closed')					
					{					
						rowsHTML+="<br><input type='button' class='generic_icon' form='form253_"+result.id+"' value='Follow-up' onclick=\"modal134_action('"+result.id+"','"+result.customer+"','"+result.detail+"');\">";
						rowsHTML+="<br><input type='button' class='generic_icon' form='form253_"+result.id+"' value='Update Contact' onclick=\"modal145_action('"+result.customer+"');\">";
						rowsHTML+="<br><input type='button' class='generic_icon' form='form253_"+result.id+"' value='Close Lead' onclick=\"modal153_action(this,'"+result.id+"');\">";
					}					
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form253_body').append(rowsHTML);
			var fields=document.getElementById("form253_"+result.id);
			var identified_filter=fields.elements[3];
			
			var identified_data="<staff>"+
								"<acc_name></acc_name>"+
								"</staff>";
			set_my_value_list(identified_data,identified_filter);
					
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form253_update_item(fields);
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
			get_export_data(columns,'Customer Support');
		});
		hide_loader();
	});
};

/**
 * @form Telecalling Leads
 * @formNo 254
 * @Loading light
 */
function form254_ini()
{
	show_loader();
	var fid=$("#form254_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form254_header');
	var fname=filter_fields.elements[0].value;
	var fidentify=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form254_index');
	var prev_element=document.getElementById('form254_prev');
	var next_element=document.getElementById('form254_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<sale_leads count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<customer>"+fname+"</customer>" +
		"<detail></detail>" +
		"<status></status>" +
		"<due_date></due_date>" +
		"<identified_by>"+fidentify+"</identified_by>" +
		"<type exact='yes'>telecalling</type>" +
		"</sale_leads>";
	
	$('#form254_body').html("");
	
	fetch_requested_data('form254',columns,function(results)
	{
		results.forEach(function(result)
		{
			var row_class="";
			if(result.status=='closed')
			{
				row_class="class='cancelled_row'";
			}
			var rowsHTML="";
			rowsHTML+="<tr "+row_class+">";
				rowsHTML+="<form id='form254_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form254_"+result.id+"'>"+result.customer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="<textarea readonly='readonly' form='form254_"+result.id+"' class='dblclick_editable'>"+result.detail+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Due Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form254_"+result.id+"' class='dblclick_editable' value='"+get_my_past_date(result.due_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Identified By'>";
					if(result.identified_by=="")
						rowsHTML+="<input type='text' readonly='readonly' form='form254_"+result.id+"' class='dblclick_editable' value='"+result.identified_by+"'>";
					else
						rowsHTML+="<input type='text' readonly='readonly' form='form254_"+result.id+"' value='"+result.identified_by+"'>";	
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form254_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form254_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form254_"+result.id+"' onclick='form254_delete_item($(this));'>";
					if(result.status!='closed')					
					{					
						rowsHTML+="<br><input type='button' class='generic_icon' form='form254_"+result.id+"' value='Follow-up' onclick=\"modal134_action('"+result.id+"','"+result.customer+"','"+result.detail+"');\">";
						rowsHTML+="<br><input type='button' class='generic_icon' form='form254_"+result.id+"' value='Update Contact' onclick=\"modal145_action('"+result.customer+"');\">";
						rowsHTML+="<br><input type='button' class='generic_icon' form='form254_"+result.id+"' value='Close Lead' onclick=\"modal153_action(this,'"+result.id+"');\">";
					}					
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form254_body').append(rowsHTML);
			var fields=document.getElementById("form254_"+result.id);
			var identified_filter=fields.elements[3];
			
			var identified_data="<staff>"+
								"<acc_name></acc_name>"+
								"</staff>";
			set_my_value_list(identified_data,identified_filter);
					
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form254_update_item(fields);
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
			get_export_data(columns,'Telecalling Support');
		});
		hide_loader();
	});
};

/**
 * @form Marketing Leads
 * @formNo 255
 * @Loading light
 */
function form255_ini()
{
	show_loader();
	var fid=$("#form255_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form255_header');
	var fname=filter_fields.elements[0].value;
	var fidentify=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form255_index');
	var prev_element=document.getElementById('form255_prev');
	var next_element=document.getElementById('form255_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<sale_leads count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<customer>"+fname+"</customer>" +
		"<detail></detail>" +
		"<status></status>" +
		"<due_date></due_date>" +
		"<identified_by>"+fidentify+"</identified_by>" +
		"<type exact='yes'>marketing</type>" +
		"</sale_leads>";
	
	$('#form255_body').html("");
	
	fetch_requested_data('form255',columns,function(results)
	{
		results.forEach(function(result)
		{
			var row_class="";
			if(result.status=='closed')
			{
				row_class="class='cancelled_row'";
			}
			var rowsHTML="";
			rowsHTML+="<tr "+row_class+">";
				rowsHTML+="<form id='form255_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form255_"+result.id+"'>"+result.customer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="<textarea readonly='readonly' form='form255_"+result.id+"' class='dblclick_editable'>"+result.detail+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Due Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form255_"+result.id+"' class='dblclick_editable' value='"+get_my_past_date(result.due_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Identified By'>";
					if(result.identified_by=="")
						rowsHTML+="<input type='text' readonly='readonly' form='form255_"+result.id+"' class='dblclick_editable' value='"+result.identified_by+"'>";
					else
						rowsHTML+="<input type='text' readonly='readonly' form='form255_"+result.id+"' value='"+result.identified_by+"'>";	
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form255_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form255_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form255_"+result.id+"' onclick='form255_delete_item($(this));'>";
					if(result.status!='closed')					
					{					
						rowsHTML+="<br><input type='button' class='generic_icon' form='form255_"+result.id+"' value='Follow-up' onclick=\"modal134_action('"+result.id+"','"+result.customer+"','"+result.detail+"');\">";
						rowsHTML+="<br><input type='button' class='generic_icon' form='form255_"+result.id+"' value='Update Contact' onclick=\"modal145_action('"+result.customer+"');\">";
						rowsHTML+="<br><input type='button' class='generic_icon' form='form255_"+result.id+"' value='Close Lead' onclick=\"modal153_action(this,'"+result.id+"');\">";
					}					
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form255_body').append(rowsHTML);
			var fields=document.getElementById("form255_"+result.id);
			var identified_filter=fields.elements[3];
			
			var identified_data="<staff>"+
								"<acc_name></acc_name>"+
								"</staff>";
			set_my_value_list(identified_data,identified_filter);
					
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form255_update_item(fields);
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
			get_export_data(columns,'Marketing Support');
		});
		hide_loader();
	});
};

/**
 * @form Batch info
 * @formNo 256
 * @Loading light
 */
function form256_ini()
{
	var fid=$("#form256_link").attr('data_id');
	if(fid==null)
		fid="";	

	$('#form256_body').html('');
		
	var master_fields=document.getElementById('form256_master');
	var master_name=master_fields.elements['item_name'].value;
	var batch=master_fields.elements['batch'].value;
	
	if(fid!="" || master_name!="")
	{
		show_loader();

		var items_column="<production_plan_items>" +
						"<id>"+fid+"</id>" +
						"<plan_id></plan_id>"+
						"<status></status>" +
						"<brand></brand>" +
						"<quantity></quantity>" +
						"<item>"+master_name+"</item>" +
						"<batch>"+batch+"</batch>" +
						"</production_plan_items>";
		fetch_requested_data('',items_column,function(bag_results)
		{
			var filter_fields=document.getElementById('form256_master');
			if(bag_results.length>0)
			{
				filter_fields.elements['id'].value=bag_results[0].id;
				filter_fields.elements['item_name'].value=bag_results[0].item;
				filter_fields.elements['batch'].value=bag_results[0].batch;
				filter_fields.elements['brand'].value=bag_results[0].brand;
				filter_fields.elements['quantity'].value=bag_results[0].quantity;
				filter_fields.elements['pplan'].value=bag_results[0].plan_id;
	
				var plan_elem=filter_fields.elements['pplan'];			
				$(plan_elem).on('click',function()
				{
					element_display(bag_results[0].plan_id,'form186');
				});
							
				var save_button=filter_fields.elements['save'];
				
				var raw_column="<batch_raw_material>" +
								"<id></id>" +
								"<item></item>" +
								"<batch></batch>" +
								"<quantity></quantity>" +
								"<production_id exact='yes'>"+bag_results[0].id+"</production_id>" +
								"</batch_raw_material>";
	
				fetch_requested_data('form256',raw_column,function(results)
				{
					//console.log(results);
					results.forEach(function(result)
					{
						var id=result.id;
						var rowsHTML="<tr>";
						rowsHTML+="<form id='form256_"+id+"'></form>";
							rowsHTML+="<td data-th='Item'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form256_"+id+"' value='"+result.item+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Batch'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form256_"+id+"' value='"+result.batch+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Quantity'>";
								rowsHTML+="<input type='number' step='any' readonly='readonly' form='form256_"+id+"' value='"+result.quantity+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form256_"+id+"' value='"+id+"'>";
								rowsHTML+="<input type='button' class='submit_hidden' form='form256_"+id+"' id='save_form256_"+id+"'>";
								rowsHTML+="<input type='button' class='delete_icon' form='form256_"+id+"' id='delete_form256_"+id+"' onclick='form256_delete_item($(this));'>";
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
			
						$('#form256_body').append(rowsHTML);
					});
					
					$('textarea').autosize();
					hide_loader();
				});
			}
			else
			{
				hide_loader();
			}
		});
	}
}


/**
 * @form Quotation Details
 * @formNo 258
 * @Loading light
 */
function form258_ini()
{
	var quot_id=$("#form258_link").attr('data_id');
	if(quot_id==null)
		quot_id="";	
	
	$('#form258_item_body').html("");
	$('#form258_item_foot').html("");
	$('#form258_spec_body').html("");
	$('#form258_spare_body').html("");
	$('#form258_bank_body').html("");
		
	if(quot_id!="")
	{
		$('#form258_tc_body').html("");
		
		show_loader();
		var quot_columns="<quotation count='1'>" +
				"<id>"+quot_id+"</id>" +
				"<quot_num></quot_num>" +
				"<customer></customer>" +
				"<date></date>" +
				"<type></type>" +
				"<valid_upto></valid_upto>" +
				"<issued_by></issued_by>" +
				"<status></status>" +
				//"<billing_type></billing_type>" +
				"<address></address>" +
				"<banks></banks>" +
				"<terms></terms>" +
				"<specifications></specifications>" +
				"<spares></spares>"+
				"<items></items>"+
				"<amount></amount>"+
				"<tax></tax>"+
				"<tax_rate></tax_rate>"+
				"<cartage></cartage>"+
				"<total></total>"+					
				"</quotation>";
		
		var filter_fields=document.getElementById('form258_master');

		////separate fetch function to get challan details like customer name, total etc.
		fetch_requested_data('',quot_columns,function(quot_results)
		{
			if(quot_results.length>0)
			{
				filter_fields.elements['customer'].value=quot_results[0].customer;
				filter_fields.elements['quot_num'].value=quot_results[0].quot_num;
				filter_fields.elements['date'].value=get_my_past_date(quot_results[0].date);
				filter_fields.elements['id'].value=quot_id;
				filter_fields.elements['type'].value=quot_results[0].type;
				filter_fields.elements['valid'].value=get_my_past_date(quot_results[0].valid_upto);
				//filter_fields.elements['tax'].value=quot_results[0].billing_type;
				filter_fields.elements['status'].value=quot_results[0].status;
				filter_fields.elements['issued'].value=quot_results[0].issued_by;
				filter_fields.elements['address'].value=quot_results[0].address;
				var email_filter=filter_fields['email'];
				
				var email_data="<customers>"+
								"<email></email>"+
								"<acc_name exact='yes'>"+quot_results[0].customer+"</acc_name>"+
								"</customers>";
				set_my_value(email_data,email_filter);
								
				var save_button=filter_fields.elements['save'];

				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form258_update_form();
				});
				
				/////////////////terms and conditions////////////////
				var tc_array=JSON.parse(quot_results[0].terms);
				var tc_id=get_new_key();
				var tc_counter=0;
				var rowsHTML="";			
				tc_array.forEach(function (tc) 
				{
					var id=tc_id+tc_counter;
					tc_counter+=1;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form258_tc_"+id+"' autocomplete='off'></form>";
						rowsHTML+="<td data-th='S.No.'>";
						rowsHTML+=tc_counter;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Type'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form258_tc_"+id+"' value='"+tc.type+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='T&C'>";
							rowsHTML+="<textarea required readonly='readonly' form='form258_tc_"+id+"'>"+tc.tc+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form258_tc_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form258_tc_"+id+"' id='save_form258_tc_"+id+"' >";
							rowsHTML+="<input type='button' class='delete_icon' form='form258_tc_"+id+"' id='delete_form258_tc_"+id+"' onclick='$(this).parent().parent().remove();form258_get_totals();'>";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
				});
				$('#form258_tc_body').html(rowsHTML);

				
				/////////////////banks////////////////
				var bank_array=JSON.parse(quot_results[0].banks);
				var bank_id=get_new_key();
				var bank_counter=0;
				var bank_rowsHTML="";			
				bank_array.forEach(function (bank) 
				{
					var id=bank_id+bank_counter;
					bank_counter+=1;
					bank_rowsHTML+="<tr>";
					bank_rowsHTML+="<form id='form258_bank_"+id+"' autocomplete='off'></form>";
						bank_rowsHTML+="<td data-th='S.No.'>";
						bank_rowsHTML+=bank_counter;
						bank_rowsHTML+="</td>";
						bank_rowsHTML+="<td data-th='Name'>";
							bank_rowsHTML+="<input type='text' readonly='readonly' form='form258_bank_"+id+"' value='"+bank.name+"'>";
						bank_rowsHTML+="</td>";
						bank_rowsHTML+="<td data-th='Bank'>";
							bank_rowsHTML+="<b>Bank</b>:<input type='text' readonly='readonly' form='form258_bank_"+id+"' value='"+bank.bank+"'>";
							bank_rowsHTML+="<br><b>IFSC</b>:<input type='text' readonly='readonly' form='form258_bank_"+id+"' value='"+bank.ifsc+"'>";
						bank_rowsHTML+="</td>";
						bank_rowsHTML+="<td data-th='Account'>";
							bank_rowsHTML+="<b>Account Name</b>:<input type='text' readonly='readonly' form='form258_bank_"+id+"' value='"+bank.account_name+"'>";
							bank_rowsHTML+="<br><b>Account #</b>:<input type='text' readonly='readonly' form='form258_bank_"+id+"' value='"+bank.account_num+"'>";
						bank_rowsHTML+="</td>";
						bank_rowsHTML+="<td data-th='Action'>";
							bank_rowsHTML+="<input type='hidden' form='form258_bank_"+id+"' value='"+id+"'>";
							bank_rowsHTML+="<input type='button' class='submit_hidden' form='form258_bank_"+id+"' id='save_form258_bank_"+id+"' >";
							bank_rowsHTML+="<input type='button' class='delete_icon' form='form258_bank_"+id+"' id='delete_form258_bank_"+id+"' onclick='$(this).parent().parent().remove();form258_get_totals();'>";
						bank_rowsHTML+="</td>";
					bank_rowsHTML+="</tr>";
				});
				$('#form258_bank_body').html(bank_rowsHTML);

				/////////////////specifications////////////////
				//console.log(quot_results[0].specifications);
				var spec_array=JSON.parse(quot_results[0].specifications);
				var spec_id=get_new_key();
				var spec_counter=0;
				var spec_rowsHTML="";			
				spec_array.forEach(function (spec) 
				{
					var id=spec_id+spec_counter;
					spec_counter+=1;
					spec_rowsHTML+="<tr>";
					spec_rowsHTML+="<form id='form258_spec_"+id+"' autocomplete='off'></form>";
						spec_rowsHTML+="<td data-th='S.No.'>";
						spec_rowsHTML+=spec_counter;
						spec_rowsHTML+="</td>";
						//spec_rowsHTML+="<td data-th='Item'>";
						//	spec_rowsHTML+="<input type='text' readonly='readonly' form='form258_spec_"+id+"' value='"+spec.item+"'>";
						//spec_rowsHTML+="</td>";
						spec_rowsHTML+="<td data-th='Type'>";
							spec_rowsHTML+="<input type='text' readonly='readonly' form='form258_spec_"+id+"' value='"+spec.spec+"'>";
						spec_rowsHTML+="</td>";
						spec_rowsHTML+="<td data-th='Specification'>";
							spec_rowsHTML+="<textarea readonly='readonly' form='form258_spec_"+id+"'>"+spec.details+"</textarea>";
						spec_rowsHTML+="</td>";
						spec_rowsHTML+="<td data-th='Action'>";
							spec_rowsHTML+="<input type='hidden' form='form258_spec_"+id+"' value='"+id+"'>";
							spec_rowsHTML+="<input type='button' class='submit_hidden' form='form258_spec_"+id+"' id='save_form258_spec_"+id+"' >";
							spec_rowsHTML+="<input type='button' class='delete_icon' form='form258_spec_"+id+"' id='delete_form258_spec_"+id+"' onclick='$(this).parent().parent().remove();form258_get_totals();'>";
						spec_rowsHTML+="</td>";
					spec_rowsHTML+="</tr>";
				});
				$('#form258_spec_body').html(spec_rowsHTML);
				
				
				/////////////////spares////////////////
				var spare_array=JSON.parse(quot_results[0].spares);
				var spare_id=get_new_key();
				var spare_counter=0;
				var spare_rowsHTML="";			
				spare_array.forEach(function (spare) 
				{
					var id=spare_id+spare_counter;
					spare_counter+=1;
					spare_rowsHTML+="<tr>";
					spare_rowsHTML+="<form id='form258_spare_"+id+"' autocomplete='off'></form>";
						spare_rowsHTML+="<td data-th='S.No.'>";
						spare_rowsHTML+=spare_counter;
						spare_rowsHTML+="</td>";
						spare_rowsHTML+="<td data-th='Part Name'>";
							spare_rowsHTML+="<input type='text' readonly='readonly' form='form258_spare_"+id+"' value='"+spare.item+"'>";
						spare_rowsHTML+="</td>";
						spare_rowsHTML+="<td data-th='Description'>";
							spare_rowsHTML+="<textarea readonly='readonly' form='form258_spare_"+id+"' >"+spare.description+"</textarea>";
						spare_rowsHTML+="</td>";
						spare_rowsHTML+="<td data-th='Quantity'>";
							spare_rowsHTML+="<input type='number' readonly='readonly' form='form258_spare_"+id+"' step='any' value='"+spare.quantity+"'><vy id='form258_spare_unit_"+id+"'>"+spare.unit+"</vy>";
						spare_rowsHTML+="</td>";
						spare_rowsHTML+="<td data-th='Action'>";
							spare_rowsHTML+="<input type='hidden' form='form258_spare_"+id+"' value='"+id+"'>";
							spare_rowsHTML+="<input type='button' class='submit_hidden' form='form258_spare_"+id+"' id='save_form258_spare_"+id+"' >";
							spare_rowsHTML+="<input type='button' class='delete_icon' form='form258_spare_"+id+"' id='delete_form258_spare_"+id+"' onclick='$(this).parent().parent().remove();form258_get_totals();'>";
						spare_rowsHTML+="</td>";
					spare_rowsHTML+="</tr>";
				});
				$('#form258_spare_body').html(spare_rowsHTML);
				
			
				var item_array=JSON.parse(quot_results[0].items);
				var item_id=get_new_key();
				var item_counter=0;
				var item_rowsHTML="";			
				
				item_array.forEach(function (item) 
				{
					var id=item_id+item_counter;
					item_counter+=1;
					item_rowsHTML+="<tr>";
					item_rowsHTML+="<form id='form258_item_"+id+"' autocomplete='off'></form>";
						item_rowsHTML+="<td data-th='S.No.'>";
						item_rowsHTML+=item_counter;
						item_rowsHTML+="</td>";
						item_rowsHTML+="<td data-th='Item'>";
							item_rowsHTML+="<input type='text' readonly='readonly' form='form258_item_"+id+"' value='"+item.item+"'>";
						item_rowsHTML+="</td>";
						item_rowsHTML+="<td data-th='Details'>";
							item_rowsHTML+="<textarea readonly='readonly' form='form258_item_"+id+"' class='dblclick_editable'>"+item.details+"</textarea>";
						item_rowsHTML+="</td>";
						item_rowsHTML+="<td data-th='Quantity'>";
							item_rowsHTML+="<input type='number' readonly='readonly' form='form258_item_"+id+"' step='any' value='"+item.quantity+"'>";
						item_rowsHTML+="</td>";
						item_rowsHTML+="<td data-th='Rate'>";
							item_rowsHTML+="<input type='number' readonly='readonly' form='form258_item_"+id+"' step='any' value='"+item.price+"'>";
						item_rowsHTML+="</td>";
						item_rowsHTML+="<td data-th='Amount'>";
							item_rowsHTML+="<input type='number' readonly='readonly' form='form258_item_"+id+"' step='any' value='"+item.amount+"'>";
							//item_rowsHTML+="<br><b>Tax</b>:<input type='number' readonly='readonly' form='form258_item_"+id+"' step='any' value='"+item.tax+"'>";
							//item_rowsHTML+="<br><b>Total</b>:<input type='number' readonly='readonly' form='form258_item_"+id+"' step='any' value='"+item.total+"'>";
						item_rowsHTML+="</td>";
						item_rowsHTML+="<td data-th='Action'>";
							item_rowsHTML+="<input type='hidden' form='form258_item_"+id+"' value='"+id+"'>";
							item_rowsHTML+="<input type='button' class='submit_hidden' form='form258_item_"+id+"' id='save_form258_item_"+id+"' >";
							item_rowsHTML+="<input type='button' class='delete_icon' form='form258_item_"+id+"' id='delete_form258_item_"+id+"' onclick='$(this).parent().parent().remove(); form258_get_totals();'>";
						item_rowsHTML+="</td>";
					item_rowsHTML+="</tr>";
				});
				
				$('#form258_item_body').html(item_rowsHTML);
				
				var total_quantity=0;
			
				$("[id^='save_form258_item_']").each(function(index)
				{
					var subform_id=$(this).attr('form');
					var subform=document.getElementById(subform_id);
			
					if(!isNaN(parseFloat(subform.elements[2].value)))
						total_quantity+=parseFloat(subform.elements[2].value);
				});
			
				var total_row="<tr><td colspan='4' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
								"<td>Amount:<br>Tax:@ <input type='number' value='"+quot_results[0].tax_rate+"' step='any' id='form258_tax'><br>Transport Charges: <br>Total: </td>" +
								"<td>Rs. "+quot_results[0].amount+"</br>" +
								"Rs. "+quot_results[0].tax+" <br>" +
								"Rs. <input type='number' value='"+quot_results[0].cartage+"' step='any' id='form258_cartage' class='dblclick_editable'><br>" +
								"Rs. <vtotal>"+quot_results[0].total+"</vtotal></td>" +
								"<td></td>" +
								"</tr>";
				
				$('#form258_item_foot').html(total_row);
				
				//form258_get_totals();
				
				
				///////////csv preparation///////////
				var bt=get_session_var('title');
				var business_intro_text=get_session_var('business_intro');
				var business_address=get_session_var('address');
				var business_phone=get_session_var('phone');
				var business_email=get_session_var('email');
	/*
				var customer_name=filter_fields.elements['customer'].value;
				var date=filter_fields.elements['date'].value;	
				var valid_date=filter_fields.elements['valid'].value;	
				var issued_by=filter_fields.elements['issued'].value;	
				var quot_no=filter_fields.elements['quot_num'].value;
				var customer_address=filter_fields.elements['address'].value;
				var quot_type=filter_fields.elements['type'].value;
					
				var signature_text="<br>Computer Generated<br><br><br>Signature Not Required<br>";
	
				var message_attachment=bt+"\n\nAddress: "+business_address+"\nPhone: "+business_phone+"\nEmail"+business_email+"\n";
				message_attachment+="Quotation Sheet\n\n";
				message_attachment+="Client Name:,"+customer_name+",Date:"+date+"\n";
				message_attachment+="Issued By:,"+issued_by+"\n\n";

				message_attachment+=my_obj_array_to_csv_string(item_array)+"\n\n";
				message_attachment+=my_obj_array_to_csv_string(spec_array)+"\n\n";
				message_attachment+=my_obj_array_to_csv_string(spare_array)+"\n\n";
				message_attachment+=my_obj_array_to_csv_string(bank_array)+"\n\n";
				message_attachment+=my_obj_array_to_csv_string(tc_array)+"\n\n";
		*/		
				///////////////////////////
					
				longPressEditable($('.dblclick_editable'));
				$('textarea').autosize();

				var share_button=filter_fields.elements['share'];
				$(share_button).show();
				$(share_button).click(function()
				{
					modal171_action('Quotation from - '+bt,filter_fields.elements['customer'].value,'customer',function (func) 
					{
						print_form258(func);
					},'image');
				});
			}
					
			hide_loader();			
		});
	}
}


/**
 * @form Manage Quotation (NVS)
 * @formNo 259
 * @Loading light
 */
function form259_ini()
{
	show_loader();
	var fid=$("#form259_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form259_header');
	
	var fquot_id=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form259_index');
	var prev_element=document.getElementById('form259_prev');
	var next_element=document.getElementById('form259_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<quotation count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<quot_num>"+fquot_id+"</quot_num>" +
			"<customer>"+fname+"</customer>" +
			"<status>"+fstatus+"</status>"+
			"<date></date>" +
			"</quotation>";

	$('#form259_body').html("");

	fetch_requested_data('form259',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form259_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Quotation #'>";
						rowsHTML+="<input type='text' readonly='readonly' class='input_link' form='form259_"+result.id+"' value='"+result.quot_num+"' onclick=\"element_display('"+result.id+"','form258');\">";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form259_"+result.id+"'>"+result.customer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form259_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form259_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form259_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form259_"+result.id+"' title='Delete Quotation' onclick='form259_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form259_body').append(rowsHTML);
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
		
		var export_button=filter_fields.elements['export'];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data(columns,'Quotations');
		});
		hide_loader();
	});
}


/**
 * @form Inventory (Spares)
 * @formNo 260
 * @Loading heavy
 */
function form260_ini()
{
	show_loader();
	var fid=$("#form260_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form260_header');
	
	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form260_index');
	var prev_element=document.getElementById('form260_prev');
	var next_element=document.getElementById('form260_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	
	$('#form260_body').html("");

	var new_columns=new Object();
			new_columns.count=25;
			new_columns.start_index=start_index;
			new_columns.data_store='attributes';		
			
			new_columns.indexes=[{index:'id',value:fid},
								{index:'name',value:fname},
								{index:'type',exact:'product'},
								{index:'value',exact:'yes'},
								{index:'attribute',exact:'Spare Part'}];
		
	read_json_rows('form260',new_columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form260_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<textarea readonly='readonly' form='form260_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form260_"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form260_"+result.id+"' value='"+result.id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form260_body').append(rowsHTML);
			var fields=document.getElementById("form260_"+result.id);
			var sys_inventory=fields.elements[1];
			
			get_inventory(result.name,'',function(inventory)
			{
				sys_inventory.value=inventory;
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
			get_export_data(columns,'Inventory - Spares');
		});
		hide_loader();	
	});
};


/**
 * @form Bank Accounts
 * @formNo 261
 * @Loading light
 */
function form261_ini()
{
	show_loader();
	var fid=$("#form261_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form261_header');
	var fname=filter_fields.elements[0].value;
	var fbank=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form261_index');
	var prev_element=document.getElementById('form261_prev');
	var next_element=document.getElementById('form261_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	$('#form261_body').html("");
	
	var new_columns=new Object();
			new_columns.count=25;
			new_columns.start_index=start_index;
			new_columns.data_store='bank_accounts';		
			
			new_columns.indexes=[{index:'id',value:fid},
								{index:'name',value:fname},
								{index:'bank',value:fbank},
								{index:'branch'},
								{index:'account_name'},
								{index:'account_num'},
								{index:'ifsc'},
								{index:'status',value:fstatus}];
		
	read_json_rows('form261',new_columns,function(results)
	{			
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form261_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<textarea readonly='readonly' form='form261_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Bank'>";
						rowsHTML+="<b>Bank</b>:<input type='text' class='dblclick_editable' readonly='readonly' form='form261_"+result.id+"' required value='"+result.bank+"'>";
						rowsHTML+="<br><b>Branch</b>:<textarea class='dblclick_editable' readonly='readonly' form='form261_"+result.id+"'>"+result.branch+"</textarea>";
						rowsHTML+="<br><b>IFSC</b>:<input type='text' class='dblclick_editable' readonly='readonly' form='form261_"+result.id+"' value='"+result.ifsc+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Account'>";
						rowsHTML+="<b>Name</b>: <input type='text' readonly='readonly' form='form261_"+result.id+"' required class='dblclick_editable' value='"+result.account_name+"'>";
						rowsHTML+="<br><b>Account #</b>: <input type='text' readonly='readonly' form='form261_"+result.id+"' required class='dblclick_editable' value='"+result.account_num+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form261_"+result.id+"' required class='dblclick_editable' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form261_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form261_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form261_"+result.id+"' onclick='form261_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form261_body').append(rowsHTML);
			var fields=document.getElementById("form261_"+result.id);
			var status_filter=fields.elements[6];
			
			set_static_value_list('bank_accounts','status',status_filter);
					
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form261_update_item(fields);
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
			get_limited_export_data(new_columns,'Bank Accounts');
		});
		hide_loader();
	});
};



/**
 * @form Create RTO
 * @formNo 265
 * @Loading light
 */
function form265_ini()
{
	var rto_id=$("#form265_link").attr('data_id');
	if(rto_id==null)
		rto_id="";	
	$('#form265_body').html("");
	$('#form265_foot').html("");
	
	if(rto_id!="")
	{
		show_loader();
		var rto_columns="<rto>" +
				"<id>"+rto_id+"</id>" +
				"<rto_num></rto_num>"+
				"<employee></employee>"+
				"<rto_time></rto_time>"+
				"<branch></branch>"+
				"</rto>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',rto_columns,function(rto_results)
		{
			var filter_fields=document.getElementById('form265_master');
			if(rto_results.length>0)
			{
				filter_fields.elements['rto_num'].value=rto_results[0].rto_num;
				filter_fields.elements['employee'].value=rto_results[0].employee;
				filter_fields.elements['date'].value=get_my_past_date(rto_results[0].rto_time);
				filter_fields.elements['id'].value=rto_results[0].id;
				filter_fields.elements['branch'].value=rto_results[0].branch;
				filter_fields.elements['saved'].value='yes';

				var save_button=filter_fields.elements['save'];
				
				$(save_button).show();
				
				var rto_items_column="<logistics_orders>" +
									"<id></id>" +
									"<awb_num></awb_num>" +
									"<manifest_type></manifest_type>" +
									"<order_num></order_num>" +
									"<merchant_name></merchant_name>" +
									"<ship_to></ship_to>" +
									"<return_address1></return_address1>" +
									"<return_address2></return_address2>" +
									"<return_address3></return_address3>" +
									"<return_pincode></return_pincode>" +
									"<vendor_phone></vendor_phone>" +
									"<weight></weight>" +
									"<pieces></pieces>" +
									"<status></status>" +
									"<rto_num exact='yes'>"+rto_results[0].rto_num+"</rto_num>" +
									"<rto_id exact='yes'>"+rto_id+"</rto_id>" +
									"</logistics_orders>";

				/////////////////////////////////////////////////////////////////////////
	
				fetch_requested_data('',rto_items_column,function(results)
				{
					results.forEach(function(result)
					{
						var id=result.id;
						var rowsHTML="<tr>";

						var address=result.merchant_name+"\n"+result.return_address1+", "+result.return_address2+", "+result.return_address3+"-"+result.return_pincode;
						rowsHTML+="<form id='form265_"+id+"'></form>";
							rowsHTML+="<td data-th='S.No.'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='AWB #'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form265_"+id+"' value='"+result.awb_num+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Address'>";
								rowsHTML+="<textarea readonly='readonly' form='form265_"+id+"'>"+address+"</textarea>";
								rowsHTML+="<br>Phone: <input type='text' readonly='readonly' value='"+result.vendor_phone+"' form='form265_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="Weight: <input type='number' readonly='readonly' form='form265_"+id+"' value='"+result.weight+"' step='any'>";
								rowsHTML+="<br>Pieces: <input type='number' readonly='readonly' form='form265_"+id+"' value='"+result.pieces+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form265_"+id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form265_"+id+"' value='"+result.manifest_type+"'>";
								rowsHTML+="<input type='hidden' form='form265_"+id+"' value='"+result.order_num+"'>";
								rowsHTML+="<input type='hidden' form='form265_"+id+"' value='"+result.ship_to+"'>";
								rowsHTML+="<input type='hidden' form='form265_"+id+"' value='"+id+"'>";
								rowsHTML+="<input type='button' class='submit_hidden' form='form265_"+id+"' id='save_form265_"+id+"'>";
								rowsHTML+="<input type='button' class='delete_icon' form='form265_"+id+"' id='delete_form265_"+id+"' onclick='form265_delete_item($(this));'>";
								rowsHTML+="<input type='hidden' form='form265_"+id+"' value='"+result.merchant_name+"'>";
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
	
						$('#form265_body').append(rowsHTML);
						
						var item_form=document.getElementById('form265_'+id);
						var save_button=item_form.elements[10];
						
						$(save_button).on('click',function (e) 
						{
							e.preventDefault();
							form265_update_item(item_form);
						});
					});
					
					$('#form265_share').show();
					$('#form265_share').click(function()
					{
						modal101_action('RTO Sheet',filter_fields.elements['employee'].value,'staff',function (func) 
						{
							print_form265(func);
						});
					});
					
					form265_update_serial_numbers();
					$('textarea').autosize();
					hide_loader();
				});
			}
		});
	}
}

/**
 * @form Manage RTO
 * @formNo 266
 * @Loading light
 */
function form266_ini()
{
	show_loader();
	var fid=$("#form266_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form266_header');

	//populating form 
	var frto=filter_fields.elements[0].value;
	var femployee=filter_fields.elements[1].value;
	var fdate=get_raw_time(filter_fields.elements[2].value);
	
	////indexing///
	var index_element=document.getElementById('form266_index');
	var prev_element=document.getElementById('form266_prev');
	var next_element=document.getElementById('form266_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	$('#form266_body').html("");
	
	if_data_read_access('store_areas',function(accessible_data)
	{
		//console.log(accessible_data);
		var branches_array=[];
		var branch_object={index:'branch',array:branches_array};
		
		for(var x in accessible_data)
		{
			branches_array.push(accessible_data[x].name);
			if(accessible_data[x].record_id=='all')
			{
				branch_object={index:'branch'};
				break;
			}
		}

		//console.log(branch_object);
		
		var new_columns=new Object();
			new_columns.count=25;
			new_columns.start_index=start_index;
			new_columns.data_store='rto';		
			
			new_columns.indexes=[{index:'id',value:fid},
								{index:'rto_num',value:frto},
								{index:'employee',value:femployee},
								{index:'rto_time',value:fdate},
								branch_object];
		
		read_json_rows('form266',new_columns,function(results)
		{
			var rto_num_array=[];
			results.forEach(function(result)
			{
				rto_num_array.push(result.rto_num);
				var rowsHTML="";
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form266_"+result.id+"'></form>";
						rowsHTML+="<td data-th='RTO #'>";
							rowsHTML+="<input type='text' class='input_link' readonly='readonly' form='form266_"+result.id+"' value='"+result.rto_num+"' onclick=\"element_display('"+result.id+"','form265');\">";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Employee'>";
							rowsHTML+="<textarea readonly='readonly' form='form266_"+result.id+"'>"+result.employee+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='RTO Time'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form266_"+result.id+"' value='"+get_my_past_date(result.rto_time)+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form266_"+result.id+"' value='"+result.id+"' name='id'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form266_"+result.id+"' title='Delete RTO' onclick='form266_delete_item($(this));'>";
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
				
				$('#form266_body').append(rowsHTML);
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
			
			var export_button=filter_fields.elements['export'];
			$(export_button).off("click");
			$(export_button).on("click", function(event)
			{
				var columns=new Object();
				columns.count=0;
				columns.start_index=0;
				columns.data_store='logistics_orders';		
				
				columns.indexes=[{index:'id'},
								{index:'awb_num'},
								{index:'rto_time'},
								{index:'order_num'},
								{index:'weight'},
								{index:'pieces'},
								{index:'status'},
								{index:'return_person'},
								{index:'manifest_type'},
								{index:'merchant_name'},
								{index:'vendor_phone'},
								{index:'sku'},
								{index:'return_address1'},
								{index:'return_address2'},
								{index:'return_address3'},
								{index:'rto_num',array:rto_num_array}];		
	
				get_export_data_restructured(columns,'RTO Details',function(new_results)
				{
					var sorted_array=[];
					new_results.forEach(function(new_result)
					{
						var sorted_element=new Object();
						sorted_element['RTO No']=new_result.rto_num;
						if(new_result.rto_time!="" && new_result.rto_time!="NULL")
						{	
							sorted_element['RTO Date']=get_my_datetime(new_result.rto_time);
						}
						else 
						{
							sorted_element['RTO Date']="";
						}	
						sorted_element['Order Id']=new_result.order_num;
						sorted_element['AWB No']=new_result.awb_num;
						sorted_element['Wt']=new_result.weight;
						sorted_element['Pcs']=new_result.pieces;
						sorted_element['status']=new_result.status;
						sorted_element['Delivery Boy']=new_result.return_person;
						sorted_element['AWB Type']=new_result.manifest_type;
						sorted_element['Merchant']=new_result.merchant_name;
						sorted_element['Merchant Address']=new_result.return_address1+", "+new_result.return_address2+", "+new_result.return_address3;
						sorted_element['Mobile No']=new_result.vendor_phone;
						sorted_element['Product Name']=new_result.sku;
						
						if(new_result.rto_num!="")
						{
							sorted_array.push(sorted_element);
						}
					});
					return sorted_array;
				});
			});
			hide_loader();
		});
	});
};

/**
 * @form RTO Status
 * @formNo 267
 * @Loading light
 */
function form267_ini()
{
	$('#form267_body').html("");
	$('#form267_foot').html("");

	var filter_fields=document.getElementById('form267_master');
	var rto_num=filter_fields['rto'].value;
	var all_status=filter_fields['status'].value;
	var all_remark=filter_fields['remark'].value;
	var awb_filter=filter_fields['awb_num'];
		
	if(rto_num!="")
	{
		show_loader();
		
		if_data_read_access('store_areas',function(accessible_data)
		{
			//console.log(accessible_data);
			var branches_array=[];
			var branch_object={index:'branch',array:branches_array};
			
			for(var x in accessible_data)
			{
				branches_array.push(accessible_data[x].name);
				if(accessible_data[x].record_id=='all')
				{
					branch_object={index:'branch'};
					break;
				}
			}
	
			//console.log(branch_object);
			
			var new_columns=new Object();
				new_columns.count=0;
				new_columns.start_index=0;
				new_columns.data_store='logistics_orders';
				new_columns.return_column='awb_num';		
				
				new_columns.indexes=[{index:'awb_num'},
									{index:'id'},
									{index:'rto_num',exact:rto_num},
									{index:'status'},
									{index:'order_history'},
									branch_object];

			set_my_value_list_json(new_columns,awb_filter);
			
			read_json_rows('',new_columns,function(results)
			{	
				results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form267_"+result.awb_num+"'></form>";
						rowsHTML+="<td data-th='AWB #'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form267_"+result.awb_num+"' value='"+result.awb_num+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Current Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form267_"+result.awb_num+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Updated Status'>";
							rowsHTML+="<input type='text' form='form267_"+result.awb_num+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Remark'>";
							rowsHTML+="<textarea form='form267_"+result.awb_num+"'></textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form267_"+result.awb_num+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form267_"+result.awb_num+"' id='save_form267_"+id+"'>";
							rowsHTML+="<input type='hidden' form='form267_"+result.awb_num+"' value='"+result.order_history+"'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form267_body').prepend(rowsHTML);
					var fields=document.getElementById("form267_"+result.awb_num);
					var status_filter=fields.elements[2];
					
					set_static_value_list('logistics_orders','status',status_filter);
							
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form267_update_item(fields);
					});
				});
				form267_get_totals();
				hide_loader();
			});
		});
	}
}

/**
 * @form Delivery Challan Details
 * @formNo 268
 * @Loading light
 */
function form268_ini()
{
	var challan_id=$("#form268_link").attr('data_id');
	if(challan_id==null)
		challan_id="";	
	
	$('#form268_body').html("");
	$('#form268_foot').html("");
	
	if(challan_id!="")
	{
		show_loader();
		var challan_columns="<delivery_challans count='1'>" +
				"<id>"+challan_id+"</id>" +
				"<challan_num></challan_num>" +
				"<customer></customer>" +
				"<challan_date></challan_date>" +
				"<awb_num></awb_num>" +
				"<vehicle_num></vehicle_num>" +
				"<prepared_by></prepared_by>" +
				//"<status></status>" +
				"<type></type>" +
				"<address></address>" +
				"</delivery_challans>";
		
		var filter_fields=document.getElementById('form268_master');

		////separate fetch function to get challan details like customer name, total etc.
		fetch_requested_data('',challan_columns,function(challan_results)
		{
			if (challan_results.length>0)
			{
				filter_fields.elements['customer'].value=challan_results[0].customer;
				filter_fields.elements['challan_num'].value=challan_results[0].challan_num;
				filter_fields.elements['date'].value=get_my_past_date(challan_results[0].challan_date);
				filter_fields.elements['id'].value=challan_id;
				filter_fields.elements['awb_num'].value=challan_results[0].awb_num;
				filter_fields.elements['vehicle_num'].value=challan_results[0].vehicle_num;
				filter_fields.elements['type'].value=challan_results[0].type;
				//filter_fields.elements['status'].value=challan_results[0].status;
				filter_fields.elements['prepared'].value=challan_results[0].prepared_by;
				filter_fields.elements['address'].value=challan_results[0].address;
	
				var save_button=filter_fields.elements['save'];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form268_update_form();
				});	
			}
		
			var challan_items_column="<delivery_challan_items>" +
					"<id></id>" +
					"<item_name></item_name>" +
					"<item_desc></item_desc>" +
					"<quantity></quantity>" +
					"<unit></unit>" +
					"<challan_id exact='yes'>"+challan_id+"</challan_id>" +
					"</delivery_challan_items>";
			
			fetch_requested_data('',challan_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form268_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<textarea readonly='readonly' form='form268_"+id+"'>"+result.item_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Specification'>";
							rowsHTML+="<textarea readonly='readonly' form='form268_"+id+"'>"+result.item_desc+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form268_"+id+"' value='"+result.quantity+"' step='any'><b>"+result.unit+"</b>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form268_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form268_"+id+"' id='save_form268_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form268_"+id+"' id='delete_form268_"+id+"' onclick='form268_delete_item($(this)); form268_get_totals();'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form268_body').append(rowsHTML);
					
				});	
				form268_get_totals();
				
				var share_button=filter_fields.elements['share'];
				
				$(share_button).show();
				$(share_button).click(function()
				{
					modal101_action('Delivery Challan #:'+filter_fields.elements['challan_num'].value,filter_fields.elements['customer'].value,'customer',function (func) 
					{
						print_form268(func);
					});
				});
					
				hide_loader();
			});
		});
	}
}


/**
 * @form Manage Delivery Challan
 * @formNo 269
 * @Loading light
 */
function form269_ini()
{
	show_loader();
	var fid=$("#form269_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form269_header');
	
	var fchallan=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	//var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form269_index');
	var prev_element=document.getElementById('form269_prev');
	var next_element=document.getElementById('form269_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<delivery_challans count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<challan_num>"+fchallan+"</challan_num>" +
			"<customer>"+fname+"</customer>" +
			//"<status>"+fstatus+"</status>"+
			"<challan_date></challan_date>" +
			"<type></type>" +
			"<awb_num></awb_num>" +
			"<vehicle_num></vehicle_num>" +			
			"<prepared_by></prepared_by>" +
			"</delivery_challans>";

	$('#form269_body').html("");

	fetch_requested_data('form269',columns,function(results)
	{	
		results.forEach(function(result)
		{
			var details="Type: "+result.type+"\nPrepared By: "+result.prepared_by+"\nAWB #: "+result.awb_num+"\nVehicle #: "+result.vehicle_num;
			var rowsHTML="<tr>";
				rowsHTML+="<form id='form269_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Challan #'>";
						rowsHTML+="<input type='text' readonly='readonly' class='input_link' form='form269_"+result.id+"' value='"+result.challan_num+"' onclick=\"element_display('"+result.id+"','form268');\">";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form269_"+result.id+"'>"+result.customer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form269_"+result.id+"' value='"+get_my_past_date(result.challan_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="<textarea readonly='readonly' form='form269_"+result.id+"'>"+details+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form269_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form269_"+result.id+"' title='Delete Challan' onclick='form269_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form269_body').append(rowsHTML);
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
		
		var export_button=filter_fields.elements['export'];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data(columns,'Delivery Challans');
		});
		hide_loader();
	});
}

/**
 * @form Enter Supplier Bill (NVS)
 * @formNo 270
 * @Loading light
 */
function form270_ini()
{
	var bill_id=$("#form270_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form270_body').html("");
	$('#form270_foot').html("");
	
	if(bill_id!="")
	{
		show_loader();
		var bill_columns="<supplier_bills count='1'>" +
				"<id>"+bill_id+"</id>" +
				"<bill_id></bill_id>" +
				"<supplier></supplier>" +
				"<total></total>" +
				"<amount></amount>" +
				"<discount></discount>" +
				"<tax></tax>" +
				"<tax_rate></tax_rate>"+
				"<cartage></cartage>"+
				"<bill_date></bill_date>" +
				"<entry_date></entry_date>" +
				"<notes></notes>" +
				"<transaction_id></transaction_id>" +
				"</supplier_bills>";
		
		var filter_fields=document.getElementById('form270_master');

		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			if (bill_results.length>0)
			{
				filter_fields.elements['supplier'].value=bill_results[0].supplier;
				filter_fields.elements['bill_num'].value=bill_results[0].bill_id;
				filter_fields.elements['date'].value=get_my_past_date(bill_results[0].bill_date);
				filter_fields.elements['bill_id'].value=bill_id;
				var save_button=filter_fields.elements['save'];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form270_update_form();
				});	
				
				var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
							"<td>Amount:<br>Tax:<br>Cartage: <br>Total: </td>" +
							"<td>Rs. "+bill_results[0].amount+"</br>" +
							"Rs. "+bill_results[0].tax+" <br>" +
							"Rs. <input type='number' value='"+bill_results[0].cartage+"' step='any' id='form270_cartage' class='dblclick_editable'><br>" +
							"Rs. "+bill_results[0].total+"</td>" +
							"<td></td>" +
							"</tr>";
						
				$('#form270_foot').html(total_row);
				longPressEditable($('.dblclick_editable'));	
			}
		
			var bill_items_column="<supplier_bill_items>" +
					"<id></id>" +
					"<product_name></product_name>" +
					"<amount></amount>" +
					"<tax></tax>" +
					"<total></total>" +
					"<unit_price></unit_price>" +
					"<quantity></quantity>" +
					"<unit></unit>" +
					"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
					"</supplier_bill_items>";
			
			fetch_requested_data('',bill_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form270_"+id+"'></form>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<textarea readonly='readonly' form='form270_"+id+"'>"+result.product_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form270_"+id+"' value='"+result.quantity+"' step='any'><b>"+result.unit+"</b>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="<input type='number' readonly='readonly' class='dblclick_editable' form='form270_"+id+"' value='"+result.unit_price+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="<b>Amount</b><input type='number' readonly='readonly' form='form270_"+id+"' value='"+result.amount+"' step='any'>";
							rowsHTML+="<br><b>Tax</b>: <input type='number' readonly='readonly' form='form270_"+id+"' value='"+result.tax+"' step='any'>";
							rowsHTML+="<br><b>Total</b>: <input type='number' readonly='readonly' form='form270_"+id+"' value='"+result.total+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form270_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form270_"+id+"' id='save_form270_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form270_"+id+"' id='delete_form270_"+id+"' onclick='form270_delete_item($(this)); form270_get_totals();'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form270_body').append(rowsHTML);
					
				});	
				form270_get_totals();		
				hide_loader();
			});
		});
	}
}

/**
 * @form Enter COD Collections
 * @formNo 271
 * @Loading light
 */
function form271_ini()
{
	show_loader();
	var fid=$("#form271_link").attr('data_id');
	if(fid==null)
		fid="";
	
	$('#form271_body').html("");
	
	var filter_fields=document.getElementById('form271_header');
	
	var fperson=filter_fields.elements[0].value;
	var fdate=get_raw_time(filter_fields.elements[1].value);
	
	////indexing///
	var index_element=document.getElementById('form271_index');
	var prev_element=document.getElementById('form271_prev');
	var next_element=document.getElementById('form271_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var new_columns=new Object();
		new_columns.count=25;
		new_columns.start_index=start_index;
		new_columns.data_store='cod_collections';
		
		new_columns.indexes=[{index:'id',value:fid},
							{index:'acc_name',value:fperson},
							{index:'date',value:fdate},
							{index:'amount'}];
	
	read_json_rows('',new_columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="<tr>";
				rowsHTML+="<form id='form271_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Person'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form271_"+result.id+"' value='"+result.acc_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form271_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Amount'>";
						rowsHTML+="Rs. <input type='number' readonly='readonly' form='form271_"+result.id+"' step='any' value='"+result.amount+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form271_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form271_"+result.id+"' title='Delete' onclick='form271_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form271_body').append(rowsHTML);
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
		
		var export_button=filter_fields.elements['export'];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_limited_export_data(new_columns,'COD Collections');
		});
		hide_loader();
	});
}

/**
 * @form Enter COD Collections
 * @formNo 272
 * @Loading light
 */
function form272_ini()
{
	show_loader();

	var form272_form=document.getElementById('form272_form');
	form272_form.reset();	
	$(form272_form).hide();	
	
	var filter_fields=document.getElementById('form272_master');	
	var fawb=filter_fields.elements['awb'].value;
	//console.log(fawb);
	var new_columns=new Object();
		new_columns.count=1;
		new_columns.start_index=0;
		new_columns.data_store='logistics_orders';
		
		new_columns.indexes=[{index:'id'},
							{index:'order_num'},
							{index:'address1'},
							{index:'address2'},
							{index:'address3'},
							{index:'pincode'},
							{index:'phone'},
							{index:'ship_to'},
							{index:'order_history'},
							{index:'status',exact:'out for delivery'},
							{index:'awb_num',exact:fawb}];
	//console.log(new_columns);
	read_json_rows('form272',new_columns,function(results)
	{	
		//console.log(results);
		results.forEach(function(result)
		{
			form272_form.elements[1].value=result.order_num;
			form272_form.elements[2].value=result.address1+", "+result.address2+", "+result.address3+", "+result.pincode;
			form272_form.elements[3].value=result.ship_to;
			form272_form.elements[4].value=result.phone;
			form272_form.elements['id'].value=result.id;
			form272_form.elements['history'].value=result.order_history;
			
			$(form272_form).show();	
			$('textarea').autosize();		
		});
		
		if(results.length==0)
		{
			$("#modal82_link").click();
		}
		
		hide_loader();
	});
}

/**
 * @form Purchase Leads
 * @formNo 273
 * @Loading light
 */
function form273_ini()
{
	show_loader();
	var fid=$("#form273_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form273_header');
	var fname=filter_fields.elements[0].value;
	var fitem=filter_fields.elements[1].value;
	var fcomment=filter_fields.elements[2].value;
	var fdate=get_raw_time(filter_fields.elements[3].value);
	
	////indexing///
	var index_element=document.getElementById('form273_index');
	var prev_element=document.getElementById('form273_prev');
	var next_element=document.getElementById('form273_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	$('#form273_body').html("");

	var new_columns=new Object();
		new_columns.count=25;
		new_columns.start_index=start_index;
		new_columns.data_store='purchase_leads';
		
		new_columns.indexes=[{index:'id',value:fid},
							{index:'supplier',value:fname},
							{index:'detail',value:fcomment},
							{index:'item_name',value:fitem},
							{index:'item_company'},
							{index:'price'},
							{index:'quantity'},
							{index:'status'},
							{index:'identified_date',value:fdate}];
	read_json_rows('form273',new_columns,function(results)
	{	
		results.forEach(function(result)
		{
			var row_class="";
			if(result.status=='closed')
			{
				row_class="class='cancelled_row'";
			}
			var rowsHTML="";
			rowsHTML+="<tr "+row_class+">";
				rowsHTML+="<form id='form273_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Supplier'>";
						rowsHTML+="<textarea readonly='readonly' form='form273_"+result.id+"'>"+result.supplier+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<b>Model</b>:<input type='text' readonly='readonly' form='form273_"+result.id+"' value='"+result.item_name+"'>";
						rowsHTML+="<br><b>Company</b>:<input type='text' readonly='readonly' form='form273_"+result.id+"' value='"+result.item_company+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Price'>";
						rowsHTML+="<b>Price</b>:<input type='text' readonly='readonly' form='form273_"+result.id+"' class='dblclick_editable' value='"+result.price+"'>";
						rowsHTML+="<br><b>Quantity</b>:<input type='number' step='any' readonly='readonly' form='form273_"+result.id+"' class='dblclick_editable' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Comments'>";
						rowsHTML+="<textarea readonly='readonly' form='form273_"+result.id+"' class='dblclick_editable'>"+result.detail+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form273_"+result.id+"' value='"+get_my_past_date(result.identified_date)+"'>";	
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form273_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form273_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form273_"+result.id+"' onclick='form273_delete_item($(this));'>";
					if(result.status!='closed')					
					{					
						rowsHTML+="<br><input type='button' class='generic_icon' form='form273_"+result.id+"' value='Follow-up' name='followup'>";
						rowsHTML+="<br><input type='button' class='generic_icon' form='form273_"+result.id+"' value='Update Contact' onclick=\"modal167_action('"+result.supplier+"');\">";
						rowsHTML+="<br><input type='button' class='generic_icon' form='form273_"+result.id+"' value='Close Lead' onclick=\"modal168_action(this,'"+result.id+"');\">";
					}					
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form273_body').append(rowsHTML);
			var fields=document.getElementById("form273_"+result.id);
			var followup_button=fields.elements['followup'];
			
			$(followup_button).on('click',function () 
			{
				modal166_action(result.id,result.supplier,result.detail);
			});

			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form273_update_item(fields);
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
		
		var export_button=filter_fields.elements['export'];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_limited_export_data(new_columns,'Seller Leads');
		});
		hide_loader();
	});
};

/**
 * @form Inventory (poojaelec)
 * @formNo 274
 * @Loading heavy
 */
function form274_ini()
{
	show_loader();
	var fid=$("#form274_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form274_header');
	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form274_index');
	var prev_element=document.getElementById('form274_prev');
	var next_element=document.getElementById('form274_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	
	var columns="<product_instances count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<product_name>"+fname+"</product_name>" +
		"</product_instances>";

	$('#form274_body').html("");
	
	fetch_requested_data('form274',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form274_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<textarea readonly='readonly' form='form274_"+result.id+"'>"+result.product_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Stock Qty'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form274_"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Seller Lead Qty'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form274_"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Buyer Lead Qty'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form274_"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form274_"+result.id+"' value='"+result.id+"'>";
					rowsHTML+="</td>";
			rowsHTML+="</tr>";
			
			$('#form274_body').append(rowsHTML);
			var fields=document.getElementById("form274_"+result.id);
			var w_in=fields.elements[1];
			var s_in=fields.elements[2];
			var b_in=fields.elements[3];
			
			get_inventory(result.product_name,'',function(inventory)
			{
				w_in.value=-parseFloat(inventory);
			});
			
			var seller_data=new Object();
				seller_data.count=0;
				seller_data.start_index=0;
				seller_data.data_store='purchase_leads';
				seller_data.return_column='quantity';
				seller_data.sum='yes';
				seller_data.indexes=[{index:'status',exact:'open'},
									{index:'item_name',exact:result.product_name}];
			set_my_value_json(seller_data,s_in);

			var buyer_data=new Object();
				buyer_data.count=0;
				buyer_data.start_index=0;
				buyer_data.data_store='sale_leads';
				buyer_data.return_column='quantity';
				buyer_data.sum='yes';
				buyer_data.indexes=[{index:'status',exact:'open'},
									{index:'item_name',exact:result.product_name}];
			set_my_value_json(buyer_data,b_in);
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

		var export_button=filter_fields.elements['export'];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data_extended(columns,'Inventory',function(new_result)
			{
				total_export_requests+=1;
				get_inventory(new_result.product_name,'',function(inventory)
				{
					new_result['Stock Quantity']=""+(-parseFloat(inventory));
					total_export_requests-=1;
				});
			});
		});
		hide_loader();
	});
};

/**
 * @form In-out (Poojaelec)
 * @formNo 275
 * @Loading light
 */
function form275_ini()
{
	show_loader();
	var fid=$("#form275_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form275_header');
	
	var fitem=filter_fields.elements[0].value;
	var fissue=filter_fields.elements[1].value;
	var fcustomer=filter_fields.elements[3].value;
	
	////indexing///
	var index_element=document.getElementById('form275_index');
	var prev_element=document.getElementById('form275_prev');
	var next_element=document.getElementById('form275_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<bill_items count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<item_name>"+fitem+"</item_name>" +
			"<customer>"+fcustomer+"</customer>" +
			"<quantity></quantity>" +
			"<issue_date></issue_date>" +
			"<issue_type>"+fissue+"</issue_type>" +
			"<notes></notes>"+
			"</bill_items>";

	$('#form275_body').html("");

	fetch_requested_data('form275',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form275_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<textarea readonly='readonly' form='form275_"+result.id+"'>"+result.item_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form275_"+result.id+"' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form275_"+result.id+"' value='"+result.issue_type+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='To/From'>";
						rowsHTML+="<textarea readonly='readonly' form='form275_"+result.id+"'>"+result.customer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="Date: <input type='text' readonly='readonly' form='form275_"+result.id+"' value='"+get_my_past_date(result.issue_date)+"'>";
						rowsHTML+="<br><textarea placeholder='Notes' readonly='readonly' class='dblclick_editable' form='form275_"+result.id+"'>"+result.notes+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form275_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form275_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form275_"+result.id+"' onclick='form275_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form275_body').append(rowsHTML);
			var fields=document.getElementById('form275_'+result.id);
			
			$(fields).on('submit',function (ev) 
			{
				ev.preventDefault();
				form275_update_item(fields);
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
		
		var export_button=filter_fields.elements['export'];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data(columns,'In-out');
		});
		hide_loader();
	});
};


/**
 * @form Manage Performa Invoices
 * @formNo 283
 * @Loading light
 */
function form283_ini()
{
	show_loader();
	var fid=$("#form283_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form283_header');
	
	//populating form 
	var fnum=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;

	////indexing///
	var index_element=document.getElementById('form283_index');
	var prev_element=document.getElementById('form283_prev');
	var next_element=document.getElementById('form283_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	$('#form283_body').html("");

	var new_columns=new Object();
		new_columns.count=25;
		new_columns.start_index=start_index;
		new_columns.data_store='bills';
		new_columns.indexes=[{index:'id',value:fid},
							{index:'bill_num',value:fnum},
							{index:'customer_name',value:fname},
							{index:'bill_date'},
							{index:'total'},
							{index:'type'},
							{index:'transaction_id'},
							{index:'status'},
							{index:'performa',exact:'yes'}];

	read_json_rows('form283',new_columns,function(results)
	{
		results.forEach(function(result)
		{
			var cancelled_bill="";
			if(result.status=='cancelled')
			{
				cancelled_bill="style='opacity:0.5' title='This bill was cancelled'";
			}
			
			var rowsHTML="<tr "+cancelled_bill+">";
				rowsHTML+="<form id='form283_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Invoice #'>";
						rowsHTML+="<input type='text' readonly='readonly' class='input_link' form='form283_"+result.id+"' value='"+result.bill_num+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form283_"+result.id+"'>"+result.customer_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form283_"+result.id+"' value='"+get_my_past_date(result.bill_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Amount'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form283_"+result.id+"' value='"+result.total+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form283_"+result.id+"' value='"+result.id+"'>";
					if(result.status!='cancelled')
					{
						rowsHTML+="<input type='button' class='delete_icon' form='form283_"+result.id+"' title='Delete Bill' onclick='form283_delete_item($(this));'>";
					}
						rowsHTML+="<input type='hidden' form='form283_"+result.id+"' value='"+result.transaction_id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form283_body').append(rowsHTML);
			var fields=document.getElementById("form283_"+result.id);
			
			if(result.status!='cancelled')
			{			
				var input_link=fields.elements[0];
				$(input_link).on("click", function(event)
				{
					event.preventDefault();
					element_display(result.id,'form284');
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
		
		var export_button=filter_fields.elements['export'];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data(columns,'Performa Invoices');
		});
		hide_loader();
	});
}

/**
 * @form Create Performa Bill
 * @formNo 284
 * @Loading light
 */
function form284_ini()
{
	var bill_id=$("#form284_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form284_body').html("");
	$('#form284_foot').html("");
	
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
				"<tax_rate></tax_rate>"+
				"<billing_type></billing_type>" +
				"<tax_type></tax_type>"+
				"<type></type>" +
				"<storage></storage>"+
				"<notes></notes>"+
				"</bills>";
		var bill_items_column="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<item_desc></item_desc>"+
				"<unit_price></unit_price>" +
				"<quantity></quantity>" +
				"<unit></unit>"+				
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
			var filter_fields=document.getElementById('form284_master');
			if(bill_results.length>0)
			{
				filter_fields.elements['customer'].value=bill_results[0].customer_name;
				filter_fields.elements['bill_type'].value=bill_results[0].billing_type;
				filter_fields.elements['date'].value=get_my_past_date(bill_results[0].bill_date);
				filter_fields.elements['narration'].value=bill_results[0].notes;
				filter_fields.elements['bill_num'].value=bill_results[0].bill_num;
				filter_fields.elements['bill_id'].value=bill_id;				
				var save_button=filter_fields.elements['save'];
				var customer_info=filter_fields.elements['customer_info'];
				filter_fields.elements['bill_type'].setAttribute('readonly','readonly');
				var cst_filter=filter_fields.elements['cst'];
				var tin_filter=filter_fields.elements['tin'];

				if(filter_fields.elements['bill_type'].value=='Retail' || filter_fields.elements['bill_type'].value=='Tax')
				{
					var tin_data="<attributes>"+
								"<value></value>"+
								"<type exact='yes'>customer</type>"+
								"<attribute exact='yes'>TIN</attribute>"+
								"<name exact='yes'>"+bill_results[0].customer_name+"</name>"+
								"</attributes>";
					set_my_value(tin_data,tin_filter);
				}
								
				var address_data="<customers>" +
						"<address></address>" +
						"<city></city>" +
						"<acc_name exact='yes'>"+bill_results[0].customer_name+"</acc_name>" +
						"</customers>";
				fetch_requested_data('',address_data,function(addresses)
				{
					var address_string="";
					if(addresses.length>0)
					{
						address_string+=addresses[0].address+", "+addresses[0].city;
					}
					customer_info.value="Address<br>"+address_string;
				});
								
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form284_update_form();
				});

				var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Amount:<br>Tax:@ <input type='number' value='"+bill_results[0].tax_rate+"' step='any' id='form284_tax' class='dblclick_editable'>%<br>Cartage: <br>Total: </td>" +
							"<td>Rs. "+bill_results[0].amount+"</br>" +
							"Rs. "+bill_results[0].tax+" <br>" +
							"Rs. <input type='number' value='"+bill_results[0].cartage+"' step='any' id='form284_cartage' class='dblclick_editable'><br>" +
							"Rs. <vtotal>"+bill_results[0].total+"</vtotal></td>" +
							"<td></td>" +
							"</tr>";
				
				$('#form284_foot').html(total_row);
				longPressEditable($('.dblclick_editable'));
			}
		
			fetch_requested_data('',bill_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form284_"+id+"'></form>";
						rowsHTML+="<td data-th='S.No.'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<textarea readonly='readonly' form='form284_"+id+"'>"+result.item_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Details'>";
							rowsHTML+="<textarea readonly='readonly' form='form284_"+id+"'>"+result.item_desc+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form284_"+id+"' value='"+result.quantity+"' step='any'> <b>"+result.unit+"</b>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
								rowsHTML+="<b>Rate</b>:<input type='number' readonly='readonly' form='form284_"+id+"' value='"+result.unit_price+"'>";
								rowsHTML+="<br><b>Amount</b>:<input type='number' readonly='readonly' form='form284_"+id+"' value='"+result.amount+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form284_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form284_"+id+"' id='save_form284_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form284_"+id+"' id='delete_form284_"+id+"' onclick='form284_delete_item($(this)); form284_get_totals();'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form284_body').prepend(rowsHTML);	
				});

				form284_update_serial_numbers();
				var bt=get_session_var('title');
				var share_button=filter_fields.elements['share'];
				$(share_button).show();
				$(share_button).click(function()
				{
					modal101_action('Invoice from - '+bt,filter_fields.elements['customer'].value,'customer',function (func) 
					{
						print_form284(func);
					});
				});
				
				$('textarea').autosize();
				hide_loader();
			});
		});
	}
}

/**
 * @form Inventory (Cabinets)
 * @formNo 285
 * @Loading heavy
 */
function form285_ini()
{
	show_loader();
	var fid=$("#form285_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form285_header');
	
	var fname=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form285_index');
	var prev_element=document.getElementById('form285_prev');
	var next_element=document.getElementById('form285_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	
	$('#form285_body').html("");

	var new_columns=new Object();
			new_columns.count=25;
			new_columns.start_index=start_index;
			new_columns.data_store='attributes';		
			
			new_columns.indexes=[{index:'id',value:fid},
								{index:'name',value:fname},
								{index:'type',exact:'product'},
								{index:'value',exact:'no'},
								{index:'attribute',exact:'Spare Part'}];
		
	read_json_rows('form285',new_columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form285_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<textarea readonly='readonly' form='form285_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form285_"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form285_"+result.id+"' value='"+result.id+"'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form285_body').append(rowsHTML);
			var fields=document.getElementById("form285_"+result.id);
			var sys_inventory=fields.elements[1];
			
			get_inventory(result.name,'',function(inventory)
			{
				sys_inventory.value=inventory;
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
			get_export_data(columns,'Inventory - Cabinets');
		});
		hide_loader();	
	});
};


/**
 * @form buyer Leads
 * @formNo 289
 * @Loading light
 */
function form289_ini()
{
	show_loader();
	var fid=$("#form289_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form289_header');
	var fname=filter_fields.elements[0].value;
	var fitem=filter_fields.elements[1].value;
	var fpoc=filter_fields.elements[2].value;
	var fcomment=filter_fields.elements[3].value;
	var fdate=get_raw_time(filter_fields.elements[4].value);
	
	////indexing///
	var index_element=document.getElementById('form289_index');
	var prev_element=document.getElementById('form289_prev');
	var next_element=document.getElementById('form289_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	$('#form289_body').html("");

	var new_columns=new Object();
		new_columns.count=25;
		new_columns.start_index=start_index;
		new_columns.data_store='sale_leads';
		
		new_columns.indexes=[{index:'id',value:fid},
							{index:'customer',value:fname},
							{index:'detail',value:fcomment},
							{index:'item_name',value:fitem},
							{index:'item_company'},
							{index:'identified_by',value:fpoc},
							{index:'price'},
							{index:'quantity'},
							{index:'status'},
							{index:'due_date',value:fdate}];
	read_json_rows('form289',new_columns,function(results)
	{	
		results.forEach(function(result)
		{
			var row_class="";
			if(result.status=='closed')
			{
				row_class="class='cancelled_row'";
			}
			var rowsHTML="";
			rowsHTML+="<tr "+row_class+">";
				rowsHTML+="<form id='form289_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<textarea readonly='readonly' form='form289_"+result.id+"'>"+result.customer+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<b>Model</b>:<input type='text' readonly='readonly' form='form289_"+result.id+"' value='"+result.item_name+"'>";
						rowsHTML+="<br><b>Company</b>:<input type='text' readonly='readonly' form='form289_"+result.id+"' value='"+result.item_company+"'>";
						rowsHTML+="<br><b>Price</b>:<input type='text' readonly='readonly' form='form289_"+result.id+"' class='dblclick_editable' value='"+result.price+"'>";
						rowsHTML+="<br><b>Quantity</b>:<input type='number' step='any' readonly='readonly' form='form289_"+result.id+"' class='dblclick_editable' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='PoC'>";
						rowsHTML+="<textarea readonly='readonly' form='form289_"+result.id+"'>"+result.identified_by+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Comments'>";
						rowsHTML+="<textarea readonly='readonly' form='form289_"+result.id+"' class='dblclick_editable'>"+result.detail+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Followup Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form289_"+result.id+"' value='"+get_my_past_date(result.due_date)+"'>";	
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form289_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form289_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form289_"+result.id+"' onclick='form289_delete_item($(this));'>";
					if(result.status!='closed')					
					{					
						rowsHTML+="<br><input type='button' class='generic_icon' form='form289_"+result.id+"' value='Follow-up' name='followup'>";
						rowsHTML+="<br><input type='button' class='generic_icon' form='form289_"+result.id+"' value='Update Contact' onclick=\"modal145_action('"+result.customer+"');\">";
						rowsHTML+="<br><input type='button' class='generic_icon' form='form289_"+result.id+"' value='Close Lead' onclick=\"modal153_action(this,'"+result.id+"');\">";
					}					
										
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form289_body').append(rowsHTML);
			var fields=document.getElementById("form289_"+result.id);
			var followup_button=fields.elements['followup'];
			
			$(followup_button).on('click',function () 
			{
				modal134_action(result.id,result.customer,result.detail);
			});

			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form289_update_item(fields);
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
		
		var export_button=filter_fields.elements['export'];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_limited_export_data(new_columns,'Buyer Leads');
		});
		hide_loader();
	});
};

/**
 * @form Cities
 * @formNo 290
 * @Loading light
 */
function form290_ini()
{
	show_loader();
	var fid=$("#form290_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form290_header');
	var fcity=filter_fields.elements[0].value;
	var fstate=filter_fields.elements[1].value;
	var fcountry=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form290_index');
	var prev_element=document.getElementById('form290_prev');
	var next_element=document.getElementById('form290_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	$('#form290_body').html("");

	var new_columns=new Object();
		new_columns.count=25;
		new_columns.start_index=start_index;
		new_columns.data_store='cities_data';
		
		new_columns.indexes=[{index:'id',value:fid},
							{index:'city',value:fcity},
							{index:'state',value:fstate},
							{index:'country',value:fcountry}];
	read_json_rows('form290',new_columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="<tr>";
				rowsHTML+="<form id='form290_"+result.id+"'></form>";
					rowsHTML+="<td data-th='City'>";
						rowsHTML+="<textarea readonly='readonly' form='form290_"+result.id+"'>"+result.city+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='State'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form290_"+result.id+"' value='"+result.state+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Country'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form290_"+result.id+"' value='"+result.country+"'>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form290_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='button' class='save_icon' form='form290_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form290_"+result.id+"' onclick='form290_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form290_body').append(rowsHTML);
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
		
		var export_button=filter_fields.elements['export'];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_limited_export_data(new_columns,'Cities');
		});
		hide_loader();
	});
};

/**
 * @form Receipts (NVS)
 * @formNo 291
 * @Loading light
 */
function form291_ini()
{
	show_loader();
	var fid=$("#form291_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form291_header');
	
	var rid=filter_fields.elements[0].value;
	var faccount=filter_fields.elements[1].value;
	
	////indexing///
	var index_element=document.getElementById('form291_index');
	var prev_element=document.getElementById('form291_prev');
	var next_element=document.getElementById('form291_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<receipts count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<receipt_id>"+rid+"</receipt_id>" +
			"<acc_name>"+faccount+"</acc_name>" +
			"<amount></amount>" +
			"<type exact='yes'>received</type>" +
			"<narration></narration>"+
			"<date></date>"+
			"</receipts>";

	$('#form291_body').html("");

	fetch_requested_data('form291',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form291_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Receipt Id'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form291_"+result.id+"' value='"+result.receipt_id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Account'>";
						rowsHTML+="<textarea readonly='readonly' form='form291_"+result.id+"'>"+result.acc_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Amount'>";
						rowsHTML+="<input type='number' readonly='readonly' form='form291_"+result.id+"' value='"+result.amount+"'>";
						rowsHTML+="<input type='hidden' form='form291_"+result.id+"' value='"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Narration'>";
						rowsHTML+="<b>Issued on</b>: "+get_my_past_date(result.date);
						rowsHTML+="<br><textarea readonly='readonly' form='form291_"+result.id+"'>"+result.narration+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Document'>";
						rowsHTML+="<br><div id='form291_documents_"+result.id+"'></div>";
						rowsHTML+="<input type='button' form='form291_"+result.id+"' value='Add document' class='generic_icon'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='button' form='form291_"+result.id+"' value='Print Receipt' class='print_icon'>";
						rowsHTML+="<input type='button' form='form291_"+result.id+"' value='Email Receipt' class='share_icon'>";
						rowsHTML+="<input type='hidden' form='form291_"+result.id+"' name='address'>";
					rowsHTML+="</td>";				
			rowsHTML+="</tr>";
			
			$('#form291_body').append(rowsHTML);
			var fields=document.getElementById('form291_'+result.id);
			var doc_filter=fields.elements[5];
			var print_button=fields.elements[6];
			var share_button=fields.elements[7];
			var address_filter=fields.elements['address'];
			
			var address_data="<customers>"+
							"<address></address>"+
							"<city></city>"+
							"<acc_name exact='yes'>"+result.acc_name+"</acc_name>"+
							"</customers>";
			fetch_requested_data('',address_data,function (addresses) 
			{
				if(addresses.length>0)
				{
					address_filter.value=addresses[0].address+", "+addresses[0].city;
				}
			});				
			
			$(print_button).on('click',function () 
			{
				form291_print(result.receipt_id,result.acc_name,result.amount,result.date,result.narration,address_filter.value);
			});

			var bt=get_session_var('title');
			$(share_button).on('click',function () 
			{
				modal101_action('Payment Receipt - '+BT,result.acc_name,'customer',function (func) 
				{
					print_form291(func,result.receipt_id,result.acc_name,result.amount,result.date,result.narration,address_filter.value);
				});
			});

			$(doc_filter).on('click',function () 
			{
				modal144_action('receipts',result.id,function (url,doc_name) 
				{
					var docHTML="<a href='"+url+"' download='"+doc_name+"'><u>"+doc_name+"</u></a><br>";
					var doc_container=document.getElementById('form291_documents_'+result.id);
					$(doc_container).append(docHTML);
				});
			});
			
			var doc_column="<documents>" +
							"<id></id>" +
							"<url></url>" +
							"<doc_name></doc_name>"+
							"<doc_type exact='yes'>receipts</doc_type>" +
							"<target_id exact='yes'>"+result.id+"</target_id>" +
							"</documents>";
			fetch_requested_data('form291',doc_column,function(doc_results)
			{
				var docHTML="";
				for (var j in doc_results)
				{
					var updated_url=doc_results[j].url.replace(/ /g,"+");
					docHTML+="<a href='"+updated_url+"' download='"+doc_results[j].doc_name+"'><u>"+doc_results[j].doc_name+"</u></a><br>";							
				}
				document.getElementById('form291_documents_'+result.id).innerHTML=docHTML;
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
		
		var export_button=filter_fields.elements['export'];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data(columns,'Receivable Receipts');
		});
		hide_loader();
	});
};

/**
 * @form vyavsaay Billing
 * @formNo 292
 * @Loading light
 */
function form292_ini()
{
	show_loader();
	var fid=$("#form292_link").attr('data_id');
	if(fid==null)
		fid="";
	
	var filter_fields=document.getElementById('form292_header');
	var fname=filter_fields.elements[0].value;
	var finvoice=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form292_index');
	var prev_element=document.getElementById('form292_prev');
	var next_element=document.getElementById('form292_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	$('#form292_body').html("");

	var new_columns=new Object();
		new_columns.count=25;
		new_columns.start_index=start_index;
		new_columns.data_store='bills';
		
		new_columns.indexes=[{index:'id',value:fid},
							{index:'customer_name',value:fname},
							{index:'bill_num',value:finvoice},
							{index:'amount'},
							{index:'domain'},
							{index:'display'},
							{index:'tax'},
							{index:'total'},
							{index:'status',value:fstatus},
							{index:'total_quantity'},
							{index:'period_start'},
							{index:'period_end'},
							{index:'notes'},
							{index:'bill_date'}];
							
	read_json_rows('form292',new_columns,function(results)
	{	
		var bt=get_session_var('title');
		results.forEach(function(result)
		{
			var rowsHTML="<tr>";
				rowsHTML+="<form id='form292_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Customer'>";
						rowsHTML+="<b>Name</b>:<textarea readonly='readonly' form='form292_"+result.id+"'>"+result.customer_name+"</textarea>";
						rowsHTML+="<br><b>Domain</b>:<input type='text' readonly='readonly' form='form292_"+result.id+"' value='"+result.domain+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Period'>";
						rowsHTML+="<b>From</b>:<input type='text' readonly='readonly' form='form292_"+result.id+"' value='"+get_my_past_date(result.period_start)+"'>";
						rowsHTML+="<br><b>To</b>:<input type='text' readonly='readonly' form='form292_"+result.id+"' value='"+get_my_past_date(result.period_end)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="<b>Invoice #</b>:<input type='text' readonly='readonly' form='form292_"+result.id+"' value='"+result.bill_num+"'>";
						rowsHTML+="<br><b>Remarks</b>:<textarea readonly='readonly' form='form292_"+result.id+"' class='dblclick_editable'>"+result.notes+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Amount'>";
						rowsHTML+="<b>User Accounts</b>:<input type='number' step='any' readonly='readonly' form='form292_"+result.id+"' class='dblclick_editable' value='"+result.total_quantity+"'>";
						rowsHTML+="<br><b>Amount</b>: Rs <input type='number' step='any' readonly='readonly' form='form292_"+result.id+"' class='dblclick_editable' value='"+result.amount+"'>";
						rowsHTML+="<br><b>Tax</b>: Rs <input type='number' step='any' readonly='readonly' form='form292_"+result.id+"' class='dblclick_editable' value='"+result.tax+"'>";
						rowsHTML+="<br><b>Total</b>: Rs <input type='number' step='any' readonly='readonly' form='form292_"+result.id+"' value='"+result.total+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<b>Payment</b>:<input type='text' readonly='readonly' required class='dblclick_editable' form='form292_"+result.id+"' value='"+result.status+"'>";
						rowsHTML+="<b>Display</b>:<input type='text' readonly='readonly' required class='dblclick_editable' form='form292_"+result.id+"' value='"+result.display+"'>";	
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form292_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form292_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form292_"+result.id+"' onclick='form292_delete_item($(this));'>";
						rowsHTML+="<input type='button' class='share_icon' form='form292_"+result.id+"' name='share'>";
						rowsHTML+="<input type='button' class='print_icon' form='form292_"+result.id+"' name='print'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form292_body').append(rowsHTML);
			var fields=document.getElementById("form292_"+result.id);
			var invoice_filter=fields.elements[4];
			var amount_filter=fields.elements[7];
			var tax_filter=fields.elements[8];
			var total_filter=fields.elements[9];
			var status_filter=fields.elements[10];
			var display_filter=fields.elements[11];
			var share_button=fields.elements['share'];
			var print_button=fields.elements['print'];
			
			$(share_button).on('click',function () 
			{
				modal101_action('Invoice # '+invoice_filter.value+' from - '+bt,result.customer_name,'customer',function (func) 
				{
					print_form292(result.id,func);
				});
			});

			$(print_button).on('click',function () 
			{
				form292_print_form(result.id);
			});

			var tax_rate=get_session_var('service_tax_rate');
		
			$(amount_filter).on('blur change',function () 
			{
				tax_filter.value=parseFloat(amount_filter.value)*parseFloat(tax_rate)/100;
				total_filter.value=my_round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value),0);
			});
			
			$(tax_filter).on('blur change',function () 
			{
				total_filter.value=my_round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value),0);
			});

			set_static_value_list_json('system_billing','payment_status',status_filter);
			set_static_value_list_json('system_billing','display',display_filter);
			
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form292_update_item(fields);
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
		
		var export_button=filter_fields.elements['export'];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_limited_export_data(new_columns,'Vyavsaay Billing');
		});
		hide_loader();
	});
};

/**
 * @form vyavsaay accounts
 * @formNo 293
 * @Loading light
 */
function form293_ini()
{
	show_loader();
	var fid=$("#form293_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form293_header');
	var fuser=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var fdb=filter_fields.elements[2].value;
	var fstatus=filter_fields.elements[3].value;
	
	////indexing///
	var index_element=document.getElementById('form293_index');
	var prev_element=document.getElementById('form293_prev');
	var next_element=document.getElementById('form293_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	$('#form293_body').html("");

	var new_columns=new Object();
		new_columns.count=25;
		new_columns.start_index=start_index;
		new_columns.data_store='user_profile';
		new_columns.database='0';
		
		new_columns.indexes=[{index:'id',value:fid},
							{index:'username',value:fuser},
							{index:'phone'},
							{index:'name',value:fname},
							{index:'status',value:fstatus},
							{index:'email'},
							{index:'dbname',value:fdb}];
							
	read_json_rows_master('form293',new_columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="<tr>";
				rowsHTML+="<form id='form293_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Username'>";
						rowsHTML+="<textarea readonly='readonly' form='form293_"+result.id+"'>"+result.username+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Contact Person'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form293_"+result.id+"' value='"+result.name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Contact Details'>";
						rowsHTML+="<b>Phone</b>:<input type='text' readonly='readonly' form='form293_"+result.id+"' class='dblclick_editable' value='"+result.phone+"'>";
						rowsHTML+="<br><b>Email</b>:<input type='text' readonly='readonly' form='form293_"+result.id+"' class='dblclick_editable' value='"+result.email+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='DB'>";
						rowsHTML+="<textarea readonly='readonly' form='form293_"+result.id+"' required class='dblclick_editable'>"+result.dbname+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' required form='form293_"+result.id+"' value='"+result.status+"'>";	
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form293_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form293_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form293_"+result.id+"' onclick='form293_delete_item($(this));'>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
			
			$('#form293_body').append(rowsHTML);
			var fields=document.getElementById("form293_"+result.id);
			var status_filter=fields.elements[5];
			
			set_static_value_list_json('user_profile','status',status_filter);
			
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form293_update_item(fields);
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
		
		var export_button=filter_fields.elements['export'];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_limited_export_data(new_columns,'Vyavsaay Accounts');
		});
		hide_loader();
	});
};

/**
 * @form Create Bills (Sehgal)
 * @formNo 294
 * @Loading light
 */
function form294_ini()
{
	var bill_id=$("#form294_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form294_body').html("");
	$('#form294_foot').html("");
	document.getElementById('form294_customer_info').innerHTML="";
	
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
				"<tax_rate></tax_rate>"+
				"<billing_type></billing_type>" +
				"<transaction_id></transaction_id>" +
				"</bills>";
		var bill_items_column="<bill_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<item_desc></item_desc>"+
				"<unit_price></unit_price>" +
				"<quantity></quantity>" +
				"<storage></storage>"+				
				"<unit></unit>"+				
				"<amount></amount>" +
				"<total></total>" +
				"<discount></discount>" +
				"<type></type>" +
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
				"<tax></tax>" +
				"</bill_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			var filter_fields=document.getElementById('form294_master');
			if (bill_results.length>0)
			{
				filter_fields.elements['customer'].value=bill_results[0].customer_name;
				filter_fields.elements['tax_type'].value=bill_results[0].billing_type;
				filter_fields.elements['date'].value=get_my_past_date(bill_results[0].bill_date);
				filter_fields.elements['bill_num'].value=bill_results[0].bill_num;
				filter_fields.elements['bill_id'].value=bill_id;				

				var save_button=filter_fields.elements['save'];
				var cst_filter=filter_fields.elements['cst'];
				var tin_filter=filter_fields.elements['tin'];

				var cst_data="<attributes>"+
							"<value></value>"+
							"<type exact='yes'>customer</type>"+
							"<attribute exact='yes'>CST#</attribute>"+
							"<name exact='yes'>"+bill_results[0].customer_name+"</name>"+
							"</attributes>";
				set_my_value(cst_data,cst_filter);

				var tin_data="<attributes>"+
							"<value></value>"+
							"<type exact='yes'>customer</type>"+
							"<attribute exact='yes'>TIN#</attribute>"+
							"<name exact='yes'>"+bill_results[0].customer_name+"</name>"+
							"</attributes>";
				set_my_value(tin_data,tin_filter);
								
				var address_data="<customers>" +
						"<address></address>" +
						"<city></city>" +
						"<acc_name exact='yes'>"+bill_results[0].customer_name+"</acc_name>" +
						"</customers>";
				fetch_requested_data('',address_data,function(addresses)
				{
					var address_string="";
					if(addresses.length>0)
					{
						address_string+=addresses[0].address+", "+addresses[0].city;
					}
					document.getElementById('form294_customer_info').innerHTML="Address<br>"+address_string;
				});

				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form294_update_form();
				});

				var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Amount:<disc><br>Discount: </disc><br>Tax:@ <input type='number' value='"+bill_results[0].tax_rate+"' step='any' id='form294_tax' class='dblclick_editable'>%<br>Cartage: <br>Total: </td>" +
							"<td>Rs. "+bill_results[0].amount+"</br>" +
							"<disc_amount>Rs. <input type='number' value='"+bill_results[0].discount+"' step='any' id='form294_discount' class='dblclick_editable'><br></disc_amount>" +
							"Rs. "+bill_results[0].tax+" <br>" +
							"Rs. <input type='number' value='"+bill_results[0].cartage+"' step='any' id='form294_cartage' class='dblclick_editable'><br>" +
							"Rs. "+bill_results[0].total+"</td>" +
							"<td></td>" +
							"</tr>";
				
				$('#form294_foot').html(total_row);
				longPressEditable($('.dblclick_editable'));				
			}
		
			fetch_requested_data('',bill_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form294_"+id+"'></form>";
						rowsHTML+="<td data-th='S.No.'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<textarea readonly='readonly' form='form294_"+id+"'>"+result.item_name+"</textarea>";
							if(result.item_desc!='undefined' || result.item_desc!="")
							{							
								rowsHTML+="<br>"+result.item_desc;
							}							
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form294_"+id+"' value='"+result.quantity+"' step='any'> <b>"+result.unit+"</b>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="<b>Rate</b>: Rs. <input type='number' readonly='readonly' form='form294_"+id+"' value='"+result.unit_price+"' step='any'>";
							rowsHTML+="<br><b>Amount</b>: Rs. <input type='number' readonly='readonly' form='form294_"+id+"' value='"+result.amount+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Store'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form294_"+id+"' value='"+result.storage+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form294_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form294_"+id+"' id='save_form294_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form294_"+id+"' id='delete_form294_"+id+"' onclick='form294_delete_item($(this)); form294_get_totals();'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form294_body').prepend(rowsHTML);	
				});
				
				form294_update_serial_numbers();
				$('textarea').autosize();
				
				var bt=get_session_var('title');
				$('#form294_share').show();
				$('#form294_share').click(function()
				{
					modal101_action("Invoice from "+bt+' - '+filter_fields.elements['bill_num'].value,filter_fields.elements['customer'].value,'customer',function (func) 
					{
						print_form294(func);
					});
				});
								
				hide_loader();
			});
		});
	}
}

/**
 * @form Create Purchase Bills (Sehgal)
 * @formNo 295
 * @Loading light
 */
function form295_ini()
{
	var bill_id=$("#form295_link").attr('data_id');
	if(bill_id==null)
		bill_id="";	
	
	$('#form295_body').html("");
	$('#form295_foot').html("");
	
	if(bill_id!="")
	{
		show_loader();
		var bill_columns="<supplier_bills>" +
				"<id>"+bill_id+"</id>" +
				"<bill_id></bill_id>"+
				"<supplier></supplier>" +
				"<bill_date></bill_date>" +
				"<entry_date></entry_date>" +
				"<amount></amount>" +
				"<discount></discount>" +
				"<cartage></cartage>"+
				"<tax></tax>" +
				"<total></total>" +
				"<tax_rate></tax_rate>"+
				"<transaction_id></transaction_id>" +
				"<order_id></order_id>" +
				"<order_num></order_num>" +
				"<notes></notes>"+
				"</supplier_bills>";
		var bill_items_column="<supplier_bill_items>" +
				"<id></id>" +
				"<product_name></product_name>" +
				"<item_desc></item_desc>"+
				"<unit_price></unit_price>" +
				"<quantity></quantity>" +
				"<storage></storage>"+				
				"<unit></unit>"+				
				"<amount></amount>" +
				"<total></total>" +
				"<discount></discount>" +
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +
				"<tax></tax>" +
				"</supplier_bill_items>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bill_columns,function(bill_results)
		{
			var filter_fields=document.getElementById('form295_master');
			if (bill_results.length>0)
			{
				filter_fields.elements['supplier'].value=bill_results[0].supplier;
				filter_fields.elements['date'].value=get_my_past_date(bill_results[0].bill_date);
				filter_fields.elements['entry_date'].value=get_my_past_date(bill_results[0].entry_date);
				filter_fields.elements['bill_num'].value=bill_results[0].bill_id;
				filter_fields.elements['po_num'].value=bill_results[0].order_num;
				filter_fields.elements['order_id'].value=bill_results[0].order_id;
				filter_fields.elements['bill_id'].value=bill_id;	
				filter_fields.elements['notes'].value=bill_results[0].notes;
				
				var save_button=filter_fields.elements['save'];

				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form295_update_form();
				});

				var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Amount:<disc><br>Discount: </disc><br>Tax:@ <input type='number' value='"+bill_results[0].tax_rate+"' step='any' id='form295_tax' class='dblclick_editable'>%<br>Cartage: <br>Total: </td>" +
							"<td>Rs. "+bill_results[0].amount+"</br>" +
							"<disc_amount>Rs. <input type='number' value='"+bill_results[0].discount+"' step='any' id='form295_discount' class='dblclick_editable'><br></disc_amount>" +
							"Rs. "+bill_results[0].tax+" <br>" +
							"Rs. <input type='number' value='"+bill_results[0].cartage+"' step='any' id='form295_cartage' class='dblclick_editable'><br>" +
							"Rs. "+bill_results[0].total+"</td>" +
							"<td></td>" +
							"</tr>";
				
				$('#form295_foot').html(total_row);
				longPressEditable($('.dblclick_editable'));				
			}
		
			fetch_requested_data('',bill_items_column,function(results)
			{
				results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form295_"+id+"'></form>";
						rowsHTML+="<td data-th='S.No.'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<textarea readonly='readonly' form='form295_"+id+"'>"+result.product_name+"</textarea>";
							if(result.item_desc!='undefined' || result.item_desc!="")
							{							
								rowsHTML+="<br>"+result.item_desc;
							}							
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form295_"+id+"' value='"+result.quantity+"' step='any'> <b>"+result.unit+"</b>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="<b>Rate</b>: Rs. <input type='number' readonly='readonly' form='form295_"+id+"' value='"+result.unit_price+"' step='any'>";
							rowsHTML+="<br><b>Amount</b>: Rs. <input type='number' readonly='readonly' form='form295_"+id+"' value='"+result.amount+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Store'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form295_"+id+"' value='"+result.storage+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form295_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form295_"+id+"' id='save_form295_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form295_"+id+"' id='delete_form295_"+id+"' onclick='form295_delete_item($(this)); form295_get_totals();'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form295_body').prepend(rowsHTML);	
				});
			
				form295_update_serial_numbers();
				$('textarea').autosize();
				hide_loader();
			});
		});
	}
}


/**
 * @form Create Purchase order (Sehgal)
 * @formNo 296
 * @Loading light
 */
function form296_ini()
{
	var order_id=$("#form296_link").attr('data_id');
	if(order_id==null)
		order_id="";	
	
	$('#form296_body').html("");
	$('#form296_foot').html("");
	
	if(order_id!="")
	{
		show_loader();
		var order_columns="<purchase_orders>" +
				"<id>"+order_id+"</id>" +
				"<order_num></order_num>"+
				"<supplier></supplier>" +
				"<order_date></order_date>" +
				"<status></status>" +
				"<amount></amount>"+
				"<tax></tax>"+
				"<total></total>"+
				"</purchase_orders>";
		var order_items_column="<purchase_order_items>" +
				"<id></id>" +
				"<item_name></item_name>" +
				"<item_desc></item_desc>" +
				"<quantity></quantity>" +
				"<order_id exact='yes'>"+order_id+"</order_id>" +
				"<make></make>" +
				"<mrp></mrp>"+
				"<price></price>" +
				"<amount></amount>"+
				"<tax></tax>"+
				"<tax_rate></tax_rate>"+
				"<total></total>"+				
				"</purchase_order_items>";
	
		////separate fetch function to get order details like customer name, total etc.
		fetch_requested_data('',order_columns,function(order_results)
		{
			var filter_fields=document.getElementById('form296_master');
			
			if(order_results.length>0)
			{
				filter_fields.elements['supplier'].value=order_results[0].supplier;
				filter_fields.elements['date'].value=get_my_past_date(order_results[0].order_date);
				filter_fields.elements['order_num'].value=order_results[0].order_num;
				filter_fields.elements['status'].value=order_results[0].status;
				filter_fields.elements['order_id'].value=order_id;
				
				var save_button=filter_fields.elements['save'];
				
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form296_update_form();
				});
				
				var supplier_address="<suppliers>"+
									"<address></address>"+
									"<pincode></pincode>"+
									"<acc_name exact='yes'>"+order_results[0].supplier+"</acc_name>"+
									"</suppliers>";
				fetch_requested_data('',supplier_address,function(addresses)
				{
					if(addresses.length>0)
					{
						filter_fields.elements['address'].value=addresses[0].address+"-"+addresses[0].pincode;
					}
				});				
			}
		
			fetch_requested_data('',order_items_column,function(results)
			{
				var data_array=[];
				var counter=0;
				results.forEach(function(result)
				{
					counter+=1;
					var new_object=new Object();
					new_object['S.No.']=counter;					
					new_object['Item Name']=result.item_name;
					new_object['Description']=result.item_desc;
					new_object['Quantity']=result.quantity;
					new_object['MRP']=result.mrp;
					new_object['Price']=result.price;
					new_object['Tax']=result.tax_rate;
					new_object['Total']=result.total;
					data_array.push(new_object);
					var rowsHTML="";
					var id=result.id;
					rowsHTML+="<tr>";
					rowsHTML+="<form id='form296_"+id+"'></form>";
						rowsHTML+="<td data-th='Item Name'>";
							rowsHTML+="<input readonly='readonly' type='text' required form='form296_"+id+"' value='"+result.item_name+"'>";
							rowsHTML+="<br><textarea readonly='readonly' form='form296_"+id+"'>"+result.item_desc+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' readonly='readonly' required form='form296_"+id+"' value='"+result.quantity+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Make'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form296_"+id+"' value='"+result.make+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="MRP: <input type='number' readonly='readonly' required form='form296_"+id+"' value='"+result.mrp+"' step='any'>";
							rowsHTML+="<br>Price: <input type='number' readonly='readonly' required form='form296_"+id+"' value='"+result.price+"' step='any'>";
							rowsHTML+="<br>Amount: <input type='number' readonly='readonly' required form='form296_"+id+"' value='"+result.amount+"' step='any'>";
							rowsHTML+="<br>Tax Rate: <input type='number' readonly='readonly' form='form296_"+id+"' value='"+result.tax_rate+"' step='any'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' readonly='readonly' form='form296_"+id+"' value='"+result.tax+"'>";
							rowsHTML+="<input type='hidden' readonly='readonly' form='form296_"+id+"' value='"+result.total+"'>";
							rowsHTML+="<input type='hidden' form='form296_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='button' class='submit_hidden' form='form296_"+id+"' id='save_form296_"+id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form296_"+id+"' id='delete_form296_"+id+"' onclick='form296_delete_item($(this)); form296_get_totals();'>";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
				
					$('#form296_body').append(rowsHTML);
				});

				var message_attachment=my_obj_array_to_csv_string(data_array);
				var bt=get_session_var('title');
				$('#form296_share').show();
				$('#form296_share').click(function()
				{
					modal101_action(bt+' - PO# '+filter_fields.elements['order_num'].value+' - '+filter_fields.elements['supplier'].value,filter_fields.elements['supplier'].value,'supplier',function (func) 
					{
						print_form296(func);
					},'csv',message_attachment);
				});
				form296_get_totals();
				$('textarea').autosize();
				hide_loader();
			});
		});
	}
}

/**
 * @form Manage Purchase orders (Sehgal)
 * @formNo 297
 * @Loading light
 */
function form297_ini()
{
	show_loader();
	var fid=$("#form297_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form297_header');
	
	//populating form 
	var fnum=filter_fields.elements[0].value;
	var fname=filter_fields.elements[1].value;
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form297_index');
	var prev_element=document.getElementById('form297_prev');
	var next_element=document.getElementById('form297_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<purchase_orders count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<order_num>"+fnum+"</order_num>"+
			"<supplier>"+fname+"</supplier>" +
			"<order_date></order_date>" +
			"<status>"+fstatus+"</status>" +
			"<bill_id></bill_id>"+
			"<cst></cst>"+
			"</purchase_orders>";

	$('#form297_body').html("");

	fetch_requested_data('form297',columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form297_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Order #'>";
						rowsHTML+="<input type='text' class='input_link' onclick=\"element_display('"+result.id+"','form296');\" style='width:100%;'readonly='readonly' form='form297_"+result.id+"' value='"+result.order_num+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Supplier'>";
						rowsHTML+="<textarea readonly='readonly' form='form297_"+result.id+"'>"+result.supplier+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Order Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form297_"+result.id+"' value='"+get_my_past_date(result.order_date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form297_"+result.id+"' value='"+result.status+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form297_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form297_"+result.id+"' title='Save order'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form297_"+result.id+"' title='Delete order' onclick='form297_delete_item($(this));'>";
					if(result.status=='order placed' || result.status=='received' || result.status=='partially received' || result.status=='completely received')
					{
						rowsHTML+="<br><input type='button' name='issue_grn' class='generic_icon' form='form297_"+result.id+"' value='Issue GRN'>";
					}
					if(result.bill_id!='' && result.bill_id!='null')
					{
						rowsHTML+="<br><input type='button' name='view_bill' class='generic_icon' form='form297_"+result.id+"' value='View Bill'>";
					}
					
					rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form297_body').append(rowsHTML);
			var fields=document.getElementById("form297_"+result.id);
			var status_filter=fields.elements[3];

			set_static_value_list('purchase_orders','status',status_filter);

			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form297_update_item(fields);
			});
			
			if(result.bill_id!='' && result.bill_id!='null')
			{
				var view_button=fields.elements['view_bill'];
				$(view_button).on('click',function()
				{
					modal137_action(result.bill_id);
				});
			}

			if(result.status=='order placed' || result.status=='received' || result.status=='partially received' || result.status=='completely received')
			{
				var issue_button=fields.elements['issue_grn'];
				$(issue_button).on('click',function()
				{
					element_display('','form295');
					var master_form=document.getElementById('form295_master');
					master_form.elements['supplier'].value=result.supplier;
					master_form.elements['po_num'].value=result.order_num;
					master_form.elements['order_id'].value=result.id;
					
					$(master_form.elements['bill_num']).focus();
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
		$('textarea').autosize();
		
		var export_button=filter_fields.elements['export'];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_export_data(columns,'Purchase Orders');
		});
		hide_loader();
	});
};


/**
 * @form Manage Products (pooja)
 * @formNo 300
 * @Loading light
 */
function form300_ini()
{
	show_loader();
	var fid=$("#form300_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form300_header');
	
	var fname=filter_fields.elements[0].value;
	var fmakes=filter_fields.elements[1].value;
	var fcategory=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form300_index');
	var prev_element=document.getElementById('form300_prev');
	var next_element=document.getElementById('form300_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	$('#form300_body').html("");

	var new_columns=new Object();
		new_columns.count=25;
		new_columns.start_index=start_index;
		new_columns.data_store='product_master';
		
		new_columns.indexes=[{index:'id',value:fid},
							{index:'name',value:fname},
							{index:'make',value:fmakes},
							{index:'category',value:fcategory},
							{index:'description'}];
	
	read_json_rows('form300',new_columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form300_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Model'>";
						rowsHTML+="<textarea readonly='readonly' form='form300_"+result.id+"'>"+result.name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Company'>";
						rowsHTML+="<textarea readonly='readonly' form='form300_"+result.id+"' class='dblclick_editable'>"+result.make+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Category'>";
						rowsHTML+="<textarea readonly='readonly' form='form300_"+result.id+"' class='dblclick_editable'>"+result.category+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Description'>";
						rowsHTML+="<textarea readonly='readonly' form='form300_"+result.id+"' class='dblclick_editable'>"+result.description+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Picture'>";
							rowsHTML+="<output form='form300_"+result.id+"'><div class='figure' id='figure_form300_"+result.id+"' name='"+get_new_key()+"'><img id='img_form300_"+result.id+"'></div></output>";
							rowsHTML+="<input type='file' style='display:none' form='form300_"+result.id+"'>";
							rowsHTML+="<input type='button' class='generic_red_icon' form='form300_"+result.id+"' value='Change Picture'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form300_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form300_"+result.id+"' value='saved'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form300_"+result.id+"' value='saved' onclick='form300_delete_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		
			$('#form300_body').append(rowsHTML);
			var fields=document.getElementById("form300_"+result.id);
			var pictureinfo=fields.elements[4];
			var picture=fields.elements[5];
			var dummy_button=fields.elements[6];

			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form300_update_item(fields);
			});
			
			var pic_columns=new Object();
				pic_columns.count=1;
				pic_columns.data_store='documents';
				
				pic_columns.indexes=[{index:'id'},
									{index:'url'},
									{index:'doc_type',exact:'product_master'},
									{index:'target_id',exact:result.id}];
			
			read_json_rows('',pic_columns,function(pic_results)
			{
				if(pic_results.length>0)
				{
					var updated_url=pic_results[0].url.replace(/ /g,"+");
					$('#img_form300_'+result.id).attr('src',updated_url);
					$('#figure_form300_'+result.id).attr('name',pic_results[0].id);				
				}
			});
			
	
			$(dummy_button).on('click',function (e) 
			{
				e.preventDefault();
				$(picture).trigger('click');
			});
			
			picture.addEventListener('change',function(evt)
			{
				select_picture(evt,pictureinfo,function(dataURL)
				{
					var pic_result_id=$('#figure_form300_'+result.id).attr('name');
					pictureinfo.innerHTML="<div class='figure' name='"+pic_result_id+"'><img id='img_form300_"+result.id+"' src='"+dataURL+"'></div>";			
				});
			},false);		
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
		
		var export_button=filter_fields.elements['export'];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_limited_export_data(new_columns,'Products');
		});
		hide_loader();
	});	
};

/**
 * @form Convert QR Scan Data
 * @formNo 302
 * @Loading light
 */
function form302_ini()
{
	show_loader();
	var fid=$("#form302_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form302_header');
	
	var fsource=filter_fields.elements[0].value;
	
	////indexing///
	var index_element=document.getElementById('form302_index');
	var prev_element=document.getElementById('form302_prev');
	var next_element=document.getElementById('form302_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	$('#form302_body').html("");

	var new_columns=new Object();
		new_columns.count=25;
		new_columns.start_index=start_index;
		new_columns.data_store='qr_contexts';
		
		new_columns.indexes=[{index:'id',value:fid},
							{index:'source',value:fsource},
							{index:'format'},
							{index:'conversion_func'}];
	
	read_json_rows('form302',new_columns,function(results)
	{
		results.forEach(function(result)
		{
			var rowsHTML="<tr>";
				rowsHTML+="<form id='form302_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Source'>";
						rowsHTML+="<textarea readonly='readonly' form='form302_"+result.id+"'>"+result.source+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Format'>";
						rowsHTML+="<textarea readonly='readonly' form='form302_"+result.id+"' class='dblclick_editable'>"+result.format+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Conversion Function'>";
						rowsHTML+="<textarea readonly='readonly' form='form302_"+result.id+"' class='dblclick_editable'>"+result.conversion_func+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Pending Records'>";
						rowsHTML+="<input type='number' readonly='readonly' form='form302_"+result.id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form302_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form302_"+result.id+"'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form302_"+result.id+"' onclick='form302_delete_item($(this));'>";	
						rowsHTML+="<input type='button' class='generic_icon' value='Convert' form='form302_"+result.id+"'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		
			$('#form302_body').append(rowsHTML);
			var fields=document.getElementById("form302_"+result.id);
			var pending_count=fields.elements[3];
			var convert_button=fields.elements[7];

			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form302_update_item(fields);
			});
			
			var count_columns=new Object();
				count_columns.data_store='qr_scans';
				count_columns.indexes=[{index:'source',exact:result.source},
									{index:'status',exact:'pending'}];
		
			read_json_count(count_columns,function(item_count)
			{
				pending_count.value=item_count;
			});
	
			$(convert_button).on('click',function (e) 
			{
				e.preventDefault();
				var qr_columns=new Object();
					qr_columns.data_store='qr_scans';
					qr_columns.return_column='data';
					qr_columns.indexes=[{index:'source',exact:result.source},
										{index:'status',exact:'pending'}];
			
				read_json_single_column(qr_columns,function(items)
				{
					var my_func="function form302_dummy_function(results){"+result.conversion_func+"};";
					$('#form302_script_tag').html(my_func);
					form302_dummy_function(items);
					$("#modal85_link").click();
					$('#form302_script_tag').html();
				});					
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
		
		var export_button=filter_fields.elements['export'];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			get_limited_export_data(new_columns,'QR Sources');
		});
		hide_loader();
	});	
};
