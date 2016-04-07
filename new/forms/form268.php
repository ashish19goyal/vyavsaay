<div id='form268' class='tab-pane'>
	<form id='form268_master' autocomplete="off">
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' id='form268_add_customer'><br>
			<input type='text' required name='customer'></label>
			<label>Challan #<br><input type='text' readonly='readonly' required name='challan_num'></label>
			<label>Date<br><input type='text' required name='date'></label>
			<!--<label>Status<br><input type='text' required name='status'></label>-->
			<br><label>AWB #<br><input type='text' name='awb_num'></label>
			<label>Vehicle #<br><input type='text' name='vehicle_num'></label>
			<label>Type<br><input type='text' required name='type'></label>
			<label>Prepared By<br><input type='text' name='prepared'></label>
			<br><label>
				<input type='hidden' name='id'>
				<input type='hidden' name='address'>
			</label>
			<label>	<input type='button' title='Save' class='save_icon' name='save'></label>
			<label>	<input type='button' title='Print' class='print_icon' name='print' onclick='form268_print_form();'></label>
			<label>	<input type='button' title='Email' class='share_icon' name='share'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form268_header'></form>
					<th>Item</th>
					<th>Specification</th>					
					<th>Quantity</th>
					<th><input type='button' form='form268_header' title='Add item' class='add_icon' onclick='form268_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form268_body'>
		</tbody>
		<tfoot id='form268_foot'>
		</tfoot>
	</table>
    
    <script>
    function form268_header_ini()
{
	var fields=document.getElementById('form268_master');
	
	var customer_filter=fields.elements['customer'];
	var challan_date=fields.elements['date'];
	var challan_num=fields.elements['challan_num'];
	var awb_num=fields.elements['awb_num'];
	var vehicle_num=fields.elements['vehicle_num'];
	var type_filter=fields.elements['type'];
	//var status_filter=fields.elements['status'];
	var prepared_filter=fields.elements['prepared'];
	var address_filter=fields.elements['address'];
	var id_filter=fields.elements['id'];
	var save_button=fields.elements['save'];
	var share_button=fields.elements['share'];

	$(share_button).off('click');
	
	id_filter.value=get_new_key();
	customer_filter.value='';
	challan_num.value="";
	awb_num.value='';
	vehicle_num.value='';
	type_filter.value='';
	prepared_filter.value='';
	address_filter.value='';
	//status_filter.value='draft';
	
	$(challan_date).datepicker();
	challan_date.value=get_my_date();

	set_static_value_list('delivery_challans','type',type_filter);
	//set_static_value_list('delivery_challans','status',status_filter);
	
	var staff_data="<staff>"+
					"<acc_name></acc_name>"+
					"</staff>";
	set_my_value_list(staff_data,prepared_filter);
	
	$(customer_filter).off('blur');
	$(customer_filter).on('blur',function () 
	{
		var address_data="<customers>"+
						"<address></address>"+
						"<city></city>"+
						"<pincode></pincode>"+
						"<acc_name exact='yes'>"+customer_filter.value+"</acc_name>"+
						"</customers>";
		fetch_requested_data('',address_data,function (addresses) 
		{
			if(addresses.length>0)
			{
				address_filter.value=addresses[0].address+", "+addresses[0].city+", "+addresses[0].pincode;
			}
			else 
			{
				address_filter.value="";
			}
		});				
	});

	var challan_id=$("#form268_link").attr('data_id');
	if(challan_id==null || challan_id=="")
	{		
		var challan_num_data="<user_preferences count='1'>"+
				"<value></value>"+
				"<name exact='yes'>delivery_challan_num</name>"+
				"</user_preferences>";
		get_single_column_data(function(nums)
		{
			if(nums.length>0)
			{
				challan_num.value=get_session_var('challan_number_prefix')+"-"+nums[0];
			}
		},challan_num_data);		
	}
			
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form268_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form268_add_item();
	});
	
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	
	set_my_value_list(customers_data,customer_filter,function () 
	{
		$(customer_filter).focus();
	});
	
	var add_customer=document.getElementById('form268_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{	
			var customer_data="<customer>" +
				"<acc_name></acc_name>" +
				"</customer>";			
			set_my_value_list(customer_data,customer_filter);
		});
	});
}

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
    
function form268_add_item()
{
	if(is_create_access('form268'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form268_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' class='wideinput' required form='form268_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Specification'>";
				rowsHTML+="<textarea form='form268_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' step='any' required form='form268_"+id+"'> <b id='form268_unit_"+id+"'></b>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form268_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form268_"+id+"' id='save_form268_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form268_"+id+"' id='delete_form268_"+id+"' onclick='$(this).parent().parent().remove();form268_get_totals();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form268_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";
	
		$('#form268_body').append(rowsHTML);
		
		var fields=document.getElementById("form268_"+id);
		var name_filter=fields.elements[0];
		var spec_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var id_filter=fields.elements[3];
		var save_button=fields.elements[4];
		
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form268_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form268_add_item();
		});
		
		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list_func(product_data,name_filter,function () 
		{
			$(name_filter).focus();
		});

		$(name_filter).on('blur',function(event)
		{
			var unit_data="<attributes count='1'>"+
							"<value></value>"+
							"<attribute exact='yes'>Unit</attribute>"+
							"<name exact='yes'>"+name_filter.value+"</name>"+
							"</attributes>";
			get_single_column_data(function(units)
			{
				if(units.length>0)
					$('#form268_unit_'+id).html(units[0]);
			},unit_data);			
										
			var desc_data="<product_master>"+
						"<description></description>"+
						"<name exact='yes'>"+name_filter.value+"</name>"+
						"</product_master>";
			set_my_value(desc_data,spec_filter);			
		});		
		form268_get_totals();
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form268_create_item(form)
{
	if(is_create_access('form268'))
	{
		var master_form=document.getElementById("form268_master");
		var challan_id=master_form.elements['id'].value;
		
		var name=form.elements[0].value;
		var spec=form.elements[1].value;
		var quantity=form.elements[2].value;
		var data_id=form.elements[3].value;
		var save_button=form.elements[4];
		var del_button=form.elements[5];
		var last_updated=get_my_time();
		var unit=$('#form268_unit_'+data_id).html();
	
		var data_xml="<delivery_challan_items>" +
				"<id>"+data_id+"</id>" +
				"<item_name>"+name+"</item_name>" +
				"<item_desc>"+spec+"</item_desc>" +
				"<quantity>"+quantity+"</quantity>" +
				"<unit>"+unit+"</unit>"+				
				"<challan_id>"+challan_id+"</challan_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</delivery_challan_items>";	
		var inventory_xml="<inventory_adjust>" +
				"<id>"+data_id+"</id>" +
				"<product_name>"+name+"</product_name>" +
				"<batch>"+name+"</batch>" +
				"<item_desc>"+spec+"</item_desc>" +
				"<quantity>-"+quantity+"</quantity>" +
				"<source>delivery challan</source>" +
				"<source_id>"+challan_id+"</source_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</inventory_adjust>";	
	
		create_simple(data_xml);
		create_simple(inventory_xml);
				
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form268_delete_item(del_button);
		});

		$(save_button).off('click');
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Delivery challan Details
 * @param button
 */
function form268_create_form()
{
	if(is_create_access('form268'))
	{
		var form=document.getElementById("form268_master");
		
		var customer=form.elements['customer'].value;
		var challan_num=form.elements['challan_num'].value;
		var challan_date=get_raw_time(form.elements['date'].value);
		var awb_num=form.elements['awb_num'].value;
		var vehicle_num=form.elements['vehicle_num'].value;
		var type=form.elements['type'].value;
		//var status=form.elements['status'].value;
		var prepared_by=form.elements['prepared'].value;
		var address=form.elements['address'].value;
		var data_id=form.elements['id'].value;
		var save_button=form.elements['save'];
		var share_button=form.elements['email'];
		var last_updated=get_my_time();
		
		$(share_button).off('click');
		$(share_button).on('click',function()
		{
			modal101_action('Delivery Challan #:'+challan_num,customer,'customer',function (func) 
			{
				print_form268(func);
			});
		});
		
		var total_quantity=0;

		$("[id^='save_form268']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			
			if(!isNaN(parseFloat(subform.elements[2].value)))
				total_quantity+=parseFloat(subform.elements[2].value);
		});
		
		var total_row="<tr><td colspan='4' data-th='Total'>Total Quantity: "+total_quantity+"</td></tr>";
					
		$('#form268_foot').html(total_row);
		longPressEditable($('.dblclick_editable'));

		
		var data_xml="<delivery_challans>" +
					"<id>"+data_id+"</id>" +
					"<challan_num>"+challan_num+"</challan_num>" +
					"<customer>"+customer+"</customer>" +
					"<challan_date>"+challan_date+"</challan_date>" +
					"<awb_num>"+awb_num+"</awb_num>" +
					"<vehicle_num>"+vehicle_num+"</vehicle_num>" +
					"<type>"+type+"</type>" +
					//"<status>"+status+"</status>" +
					"<prepared_by>"+prepared_by+"</prepared_by>" +
					"<address>"+address+"</address>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</delivery_challans>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>delivery_challans</tablename>" +
					"<link_to>form269</link_to>" +
					"<title>Saved</title>" +
					"<notes>Delivery challan # "+challan_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		
		create_row(data_xml,activity_xml);
		
		var num_data="<user_preferences>"+
					"<id></id>"+						
					"<name exact='yes'>delivery_challan_num</name>"+												
					"</user_preferences>";
		get_single_column_data(function (num_ids)
		{
			if(num_ids.length>0)
			{
				var challan_num_array=challan_num.split("-");
				var num_xml="<user_preferences>"+
								"<id>"+num_ids[0]+"</id>"+
								"<value>"+(parseInt(challan_num_array[1])+1)+"</value>"+
								"<last_updated>"+last_updated+"</last_updated>"+
								"</user_preferences>";
				update_simple(num_xml);
			}
		},num_data);

		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form268_update_form();
		});
		
		$("[id^='save_form268_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}
        
function form268_update_form()
{
	if(is_update_access('form268'))
	{
		var form=document.getElementById("form268_master");
		
		var customer=form.elements['customer'].value;
		var challan_num=form.elements['challan_num'].value;
		var challan_date=get_raw_time(form.elements['date'].value);
		var awb_num=form.elements['awb_num'].value;
		var vehicle_num=form.elements['vehicle_num'].value;
		var type=form.elements['type'].value;
		//var status=form.elements['status'].value;
		var prepared_by=form.elements['prepared'].value;
		var address=form.elements['address'].value;
		var data_id=form.elements['id'].value;
		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var total_quantity=0;

		$("[id^='save_form268']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			
			if(!isNaN(parseFloat(subform.elements[2].value)))
				total_quantity+=parseFloat(subform.elements[2].value);
		});
		
		var total_row="<tr><td colspan='4' data-th='Total'>Total Quantity: "+total_quantity+"</td></tr>";
					
		$('#form268_foot').html(total_row);
		longPressEditable($('.dblclick_editable'));

		
		var data_xml="<delivery_challans>" +
					"<id>"+data_id+"</id>" +
					"<challan_num>"+challan_num+"</challan_num>" +
					"<customer>"+customer+"</customer>" +
					"<challan_date>"+challan_date+"</challan_date>" +
					"<awb_num>"+awb_num+"</awb_num>" +
					"<vehicle_num>"+vehicle_num+"</vehicle_num>" +
					//"<status>"+status+"</status>" +
					"<prepared_by>"+prepared_by+"</prepared_by>" +
					"<address>"+address+"</address>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</delivery_challans>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>delivery_challans</tablename>" +
					"<link_to>form269</link_to>" +
					"<title>Updated</title>" +
					"<notes>Delivery challan # "+challan_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		
		update_row(data_xml,activity_xml);
		
		$("[id^='save_form268_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}
        
function form268_delete_item(button)
{
	if(is_delete_access('form268'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);			
			var data_id=form.elements[3].value;
			
			var data_xml="<delivery_challan_items>" +
						"<id>"+data_id+"</id>" +
						"</delivery_challan_items>";	
			var inventory_xml="<inventory_adjust>" +
						"<id>"+data_id+"</id>" +
						"<source>delivery challan</source>"+						
						"</inventory_adjust>";	
			
			delete_simple(data_xml);
			delete_simple(inventory_xml);
					
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form268_get_totals()
{
	var total_quantity=0;

	$("[id^='save_form268']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		
		if(!isNaN(parseFloat(subform.elements[2].value)))
			total_quantity+=parseFloat(subform.elements[2].value);
	});

	var total_row="<tr><td colspan='4' data-th='Total'>Total Quantity: "+total_quantity+"</td></tr>";
						
	$('#form268_foot').html(total_row);
	longPressEditable($('.dblclick_editable'));
}
    
function form268_print_form()
{
	print_form268(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
* This function prepares the printing template for the documents like bills and purchase orders
*/
function print_form268(func)
{
	var form_id='form268';
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_intro=document.createElement('div');
	
	var invoice_line=document.createElement('div');
	
	var info_section=document.createElement('div');	
		var customer_info=document.createElement('div');
		var business_info=document.createElement('div');

	var table_container=document.createElement('div');

	var footer=document.createElement('div');
		var signature=document.createElement('div');
		var jurisdiction=document.createElement('div');
		var business_contact=document.createElement('div');	

////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;min-height:100px;text-align:center');
		logo.setAttribute('style','width:100%;text-align:center;');
		business_intro.setAttribute('style','width:100%;text-align:center');
		business_contact.setAttribute('style','width:100%;text-align:left');
	info_section.setAttribute('style','width:100%;min-height:80px');
		customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
		business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
	footer.setAttribute('style','width:98%;min-height:100px;');
		signature.setAttribute('style','width:98%;min-height:50px;font-size:11px;');
		jurisdiction.setAttribute('style','margin:10px;width:98%;min-height:20px;text-align:left;font-size:11px;');
		business_contact.setAttribute('style','margin:0px;padding:0px;width:98%;text-align:center;page-break-inside:avoid;font-size:11px;');

///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var logo_image=get_session_var('logo');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');

	var master_form=document.getElementById(form_id+'_master');
	var customer_name=master_form.elements['customer'].value;
	var address=master_form.elements['address'].value;
	var date=master_form.elements['date'].value;	
	var challan_no=master_form.elements['challan_num'].value;
	var prepared_by=master_form.elements['prepared'].value;
	var cin=get_session_var('cin');
	var pan=get_session_var('pan');
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	business_contact.innerHTML="<hr style='border: 1px solid #00f;'>Address: "+business_address+"<br>Contact Nos.: "+business_phone+"<br>E-Mail: "+business_email;
	
	invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>Delivery Challan</b></div><hr style='border: 1px solid #00f;'>";
	
	customer_info.innerHTML="<b>Customer: </b><br>"+customer_name+"<br>"+address;
	business_info.innerHTML="<b>Seller</b><br>Challan No: "+challan_no+"<br>Date: "+date+"<br>Prepared By: "+prepared_by;

	jurisdiction.innerHTML="All disputes subjected to Delhi jurisdiction.<br>This is a computer generated challan.";
	signature.innerHTML="<div style='float:left;text-align:left;width:50%;'><br>Customer's Seal & Sign.<br><br><br></div><div style='float:right;width:50%;text-align:right;'><br>For "+bt+"<br><br>Auth. Signatory<br></div>";
	business_contact.innerHTML="<hr style='border: 1px solid #00f;margin:5px;'>Address: "+business_address+"<br>Phone: "+business_phone+", E-Mail: "+business_email+"<br>CIN: "+cin+", PAN: "+pan+"<hr style='border: 1px solid #00f;margin:5px;'>";

	var table_element=document.getElementById(form_id+'_body');	
	
	/////////////adding new table //////////////////////////////////////////////////////	
	var new_table=document.createElement('table');
	new_table.setAttribute('style','width:100%;font-size:11px;border:1px solid black;text-align:left;');
	new_table.setAttribute('class','plain_table');
	var table_header="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;width:10%;'>S.No.</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:40%;'>Item Name</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:40%'>Specification</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:20%'>Quantity</td></tr>";
				
	var table_rows=table_header;
	var counter=0;
	
	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		var item_name=form.elements[0].value;
		var spec=form.elements[1].value;
		var quantity=""+form.elements[2].value;
		
		table_rows+="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+counter+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+item_name+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+spec+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+quantity+"</td></tr>";
	});
	
	var row_count=$(table_element).find('tbody>tr').length;
	var rows_to_add=15-row_count;
	for(var i=0;i<rows_to_add;i++)
	{
		table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td></tr>";
	}

	var table_foot=document.getElementById(form_id+'_foot');
	var total_quantity=$(table_foot).find('tr>td:first')[0].innerHTML;
	
	var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
				"<td colspan='4' style='border: 1px solid #000;text-align:left;'>"+total_quantity+"</td></tr>";
		
	table_rows+=table_foot_row;
	new_table.innerHTML=table_rows;
	
	/////////////placing the containers //////////////////////////////////////////////////////	
	
	container.appendChild(header);
	container.appendChild(invoice_line);
	container.appendChild(info_section);
	
	container.appendChild(new_table);
	container.appendChild(footer);
	
	header.appendChild(logo);
	
	info_section.appendChild(customer_info);
	info_section.appendChild(business_info);
	
	footer.appendChild(signature);
	footer.appendChild(jurisdiction);
	footer.appendChild(business_contact);
	
	func(container);
}

    </script>
</div>