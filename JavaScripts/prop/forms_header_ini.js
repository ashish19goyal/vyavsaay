/**
 * this function prepares the table for update inventroy form
 * @form Update Inventory
 * @formNo 1
 */
function form1_header_ini()
{
	var filter_fields=document.getElementById('form1_header');	
	var names_filter=filter_fields.elements[0];
	var batches_filter=filter_fields.elements[1];
	var expiry=filter_fields.elements[2];

	//setting autocompletes 
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	var batch_data="<product_instances>" +
			"<batch></batch>" +
			"</product_instances>";

	
	set_my_filter(products_data,names_filter);
	set_my_filter(batch_data,batches_filter);
	$(expiry).datepicker();
};


/**
 * @form Create Pamphlets
 * @formNo 2
 */
function form2_header_ini()
{
	var fields=document.getElementById('form2_master');
	fields.elements[1].value="";
	fields.elements[2].value=get_new_key();
}


/**
 * this function prepares the table for manage assets form
 * @form Manage Assets
 * @formNo 5
 */
function form5_header_ini()
{
	var filter_fields=document.getElementById('form5_header');
	var asset_filter=filter_fields.elements[0];
	var owner_filter=filter_fields.elements[1];
	var type_filter=filter_fields.elements[2];
	
	var assets_data="<assets>" +
		"<name></name>" +
		"</assets>";
	var owner_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	
	set_my_filter(assets_data,asset_filter);
	set_my_filter(owner_data,owner_filter);
	set_static_filter('assets','type',type_filter);
	
};



/**
 * this function prepares the table for attendance form
 * @form Attendance
 * @formNo 7
 */
function form7_header_ini()
{
	console.log("setting form7 header");
	var filter_fields=document.getElementById('form7_header');
	var staff_filter=filter_fields.elements[0];
	var attendance_filter=filter_fields.elements[1];
	var date_filter=filter_fields.elements[2];
	
	var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	
	set_my_filter(staff_data,staff_filter);
	set_static_filter('attendance','presence',attendance_filter);

	$(date_filter).datepicker();
	$(date_filter).val(get_my_date());
};



/**
 * @form Manage Staff
 * @formNo 8
 */
function form8_header_ini()
{
	var filter_fields=document.getElementById('form8_header');
	var name_filter=filter_fields.elements[0];
	var phone_filter=filter_fields.elements[1];
	var email_filter=filter_fields.elements[2];
	var status_filter=filter_fields.elements[3];
	
	var name_data="<staff>" +
		"<name></name>" +
		"</staff>";
	var phone_data="<staff>" +
		"<phone></phone>" +
		"</staff>";
	var email_data="<staff>" +
		"<email></email>" +
		"</staff>";

	set_my_filter(name_data,name_filter);	
	set_my_filter(phone_data,phone_filter);	
	set_my_filter(email_data,email_filter);
	set_static_filter('staff','status',status_filter);
};


/**
 * @form Cash Register
 * @formNo 9
 */
function form9_header_ini()
{
	var filter_fields=document.getElementById('form9_header');
	var type_filter=filter_fields.elements[0];
	var date_filter=filter_fields.elements[1];
	var from_filter=filter_fields.elements[2];
	var to_filter=filter_fields.elements[3];
	var system_filter=filter_fields.elements[5];
	
	var accounts_data="<accounts>" +
		"<acc_name></acc_name>" +
		"</accounts>";

	set_static_filter('transactions','trans_type',type_filter);
	set_static_filter('transactions','system_generated',system_filter);
	
	$(date_filter).datepicker();
	
	set_my_filter(accounts_data,from_filter);
	set_my_filter(accounts_data,to_filter);
			
};

/**
 * @form Create Service Receipt
 * @formNo 10
 */
function form10_header_ini()
{
	var fields=document.getElementById('form10_master');
	
	var customers_filter=fields.elements[1];
	var bill_date=fields.elements[2];
	fields.elements[3].value=0;
	fields.elements[4].value=get_new_key();
		
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	
	set_my_filter(customers_data,customers_filter);
	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
}

/**
 * @form Schedule Payments
 * @formNo 11
 */
function form11_header_ini()
{
	var filter_fields=document.getElementById('form11_header');
	var trans_filter=filter_fields.elements[0];
	var from_filter=filter_fields.elements[1];
	var due_filter=filter_fields.elements[2];
	var closed_filter=filter_fields.elements[3];
	var status_filter=filter_fields.elements[4];
	
	var accounts_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";

	var trans_data="<transactions>" +
			"<id></id>" +
			"</transactions>";
	
	set_my_filter(trans_data,trans_filter);
	set_my_filter(accounts_data,from_filter);
	
	$(due_filter).datepicker();
	$(closed_filter).datepicker();
	
	set_static_filter('payments','status',status_filter);
			
};

/**
 * @form New Bill
 * @formNo 12
 */
function form12_header_ini()
{
	var fields=document.getElementById('form12_master');
	
	var customers_filter=fields.elements[1];
	var bill_date=fields.elements[2];
	fields.elements[3].value=0;
	fields.elements[4].value=get_new_key();
		
	var customers_data="<customers>" +
		"<acc_name></acc_name>" +
		"</customers>";
	
	set_my_filter(customers_data,customers_filter);
	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
}


/**
 * this function prepares the table for manage tasks form
 * @form Manage Tasks
 * @formNo 14
 */
function form14_header_ini()
{
	var filter_fields=document.getElementById('form14_header');
	var type_filter=filter_fields.elements[0];
	var assignee_filter=filter_fields.elements[1];
	var due_filter=filter_fields.elements[2];
	var executed_filter=filter_fields.elements[3];
	var status_filter=filter_fields.elements[4];
	
	var type_data="<task_type>" +
			"<name></name>" +
			"</task_type>";
	var assignee_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	
	set_my_filter(type_data,type_filter);
	set_my_filter(assignee_data,assignee_filter);
	
	$(due_filter).datepicker();
	$(executed_filter).datepicker();
	
	set_static_filter('task_instances','status',status_filter);
	
};


/**
 * this function prepares the table for accept returns form
 * @form Accept returns
 * @formNo 15
 */
function form15_header_ini()
{
	var filter_fields=document.getElementById('form15_header');
	var customer_filter=filter_fields.elements[0];
	var bill_filter=filter_fields.elements[1];
	var name_filter=filter_fields.elements[2];
	var batch_filter=filter_fields.elements[3];
	
	var bill_data="<bills>" +
			"<id></id>" +
			"</bills>";
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var batch_data="<product_instances>" +
			"<batch></batch>" +
			"</product_instances>";
	var customer_data="<customers>" +
			"<name></name>" +
			"</customers>";
	//setting autocompletes
	
	set_my_filter(bill_data,bill_filter);
	set_my_filter(product_data,name_filter);
	set_my_filter(batch_data,batch_filter);
	set_my_filter(customer_data,customer_filter);
			
};


/**
 * this function prepares the table for Manage returns form
 * @form Manage returns
 * @formNo 19
 */
function form19_header_ini()
{
	var filter_fields=document.getElementById('form19_header');
	var product_filter=filter_fields.elements[0];
	var batch_filter=filter_fields.elements[1];
	var bill_filter=filter_fields.elements[2];
	var supplier_filter=filter_fields.elements[3];
	var reason_filter=filter_fields.elements[4];
	
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var batch_data="<product_instances>" +
			"<batch></batch>" +
			"</product_instances>";
	var bill_data="<supplier_bills>" +
			"<bill_id></bill_id>" +
			"</supplier_bills>";
	var supplier_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	//setting autocompletes 
	
	set_my_filter(products_data,product_filter);
	set_my_filter(batch_data,batch_filter);
	set_my_filter(bill_data,bill_filter);
	set_my_filter(supplier_data,supplier_filter);
	set_static_filter('supplier_returns','reason',reason_filter);
	
};


/**
 * @form Enter Goods Received
 * @formNo 21
 */
function form21_header_ini()
{
	var fields=document.getElementById('form21_master');
	
	var supplier_filter=fields.elements[1];
	var bill_date=fields.elements[3];
	var entry_date=fields.elements[4];
	fields.elements[5].value=0;
	fields.elements[6].value=get_new_key();
		
	var suppliers_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	
	set_my_filter(suppliers_data,supplier_filter);
	
	$(bill_date).datepicker();
	$(bill_date).val(get_my_date());
	
	$(entry_date).datepicker();
	$(entry_date).val(get_my_date());
}


/**
 * this function prepares the table for dispose items form
 * @form Dispose Items
 * @formNo 22
 */
function form22_header_ini()
{
	var filter_fields=document.getElementById('form22_header');
	var product_filter=filter_fields.elements[0];
	var batch_filter=filter_fields.elements[1];
	var method_filter=filter_fields.elements[2];
	var date_filter=filter_fields.elements[3];
	
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var batch_data="<product_instances>" +
			"<batch></batch>" +
			"</product_instances>";
	
	set_my_filter(products_data,product_filter);
	set_my_filter(batch_data,batch_filter);
	set_static_filter('disposals','method',method_filter);

	$(date_filter).datepicker();
};


/**
 * @form Create purchase order
 * @formNo 24
 */
function form24_header_ini()
{
	var fields=document.getElementById('form24_master');
	
	var supplier_filter=fields.elements[1];
	var order_date=fields.elements[2];
	fields.elements[3].value=0;
	fields.elements[4].value=get_new_key();
		
	var suppliers_data="<suppliers>" +
		"<acc_name></acc_name>" +
		"</suppliers>";
	
	set_my_filter(suppliers_data,supplier_filter);
	
	$(order_date).datepicker();
	$(order_date).val(get_my_date());
	
}


/**
 * this function prepares the table for manage customers form
 * @form Manage Customers
 * @formNo 30
 */
function form30_header_ini()
{
	var filter_fields=document.getElementById('form30_header');
	var name_filter=filter_fields.elements[0];
	var contact_filter=filter_fields.elements[1];
	var email_filter=filter_fields.elements[2];
	var status_filter=filter_fields.elements[3];

	var name_data="<customers>" +
			"<name></name>" +
			"</customers>";
	var contact_data="<customers>" +
			"<phone></phone>" +
			"</customers>";
	var email_data="<customers>" +
			"<email></email>" +
			"</customers>";
	
	set_my_filter(name_data,name_filter);
	set_my_filter(contact_data,contact_filter);
	set_my_filter(email_data,email_filter);
	set_static_filter('customers','status',status_filter);
};


/**
 * this function prepares the table for manage offers form
 * @form Manage Offers
 * @formNo 35
 */
function form35_header_ini()
{
	var filter_fields=document.getElementById('form35_header');
	var name_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var date_filter=filter_fields.elements[2];
	var status_filter=filter_fields.elements[3];
	
	var offer_data="<offers>" +
			"<offer_name></offer_name>" +
			"</offers>";
	
	set_my_filter(offer_data,name_filter);
	set_static_filter('offers','offer_type',type_filter);
	$(date_filter).datepicker();
	set_static_filter('offers','status',status_filter);
};


/**
 * this function prepares the table for store placement form
 * @form Store Placement
 * @formNo 38
 */
function form38_header_ini()
{
	var filter_fields=document.getElementById('form38_header');
	var name_filter=filter_fields.elements[0];
	var batch_filter=filter_fields.elements[1];
	var area_filter=filter_fields.elements[2];
	
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var batch_data="<product_instances>" +
			"<batch></batch>" +
			"</product_instances>";
	var area_data="<store_areas>" +
			"<name></name>" +
			"</store_areas>";
	
	set_my_filter(products_data,name_filter);
	set_my_filter(batch_data,batch_filter);
	set_my_filter(area_data,area_filter);
				
};


/**
 * this function prepares the table for manage products form
 * @form Manage Products
 * @formNo 39
 */
function form39_header_ini()
{
	var filter_fields=document.getElementById('form39_header');
	var name_filter=filter_fields.elements[0].value;
	var make_filter=filter_fields.elements[1].value;
	var manufactured_filter=filter_fields.elements[2].value;
	
	var make_data="<product_master>" +
			"<make></make>" +
			"</product_master>";
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";

	set_my_filter(make_data,make_filter);
	set_my_filter(products_data,name_filter);
	set_static_filter('product_master','manufactured',manufactured_filter);
};


/**
 * this function prepares the table for manage vendors form
 * @form Manage Vendors
 * @formNo 40
 */
function form40_header_ini()
{
	var filter_fields=document.getElementById('form40_header');
	var name_filter=filter_fields.elements[0];
	var phone_filter=filter_fields.elements[1];
	var email_filter=filter_fields.elements[2];
	
	var name_data="<suppliers>" +
			"<name></name>" +
			"</suppliers>";
	var contact_data="<suppliers>" +
			"<phone></phone>" +
			"</suppliers>";
	var email_data="<suppliers>" +
			"<email></email>" +
			"</suppliers>";

	set_my_filter(name_data,name_filter);
	set_my_filter(contact_data,contact_filter);
	set_my_filter(email_data,email_filter);

};



/**
 * this function prepares the table for manage bills form
 * @form Manage Bills
 * @formNo 42
 */
function form42_header_ini()
{
	var filter_fields=document.getElementById('form42_header');
	var bill_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	var date_filter=filter_fields.elements[2];
	
	var bill_data="<bills>" +
			"<id></id>" +
			"</bills>";
	var cust_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(bill_data,bill_filter);
	set_my_filter(cust_data,name_filter);
	$(date_filter).datepicker();

};


/**
 * this function prepares the table for manage purchase orders form
 * @form Manage Purchase Orders
 * @formNo 43
 */
function form43_header_ini()
{
	var filter_fields=document.getElementById('form43_header');
	var order_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	var date_filter=filter_fields.elements[2];
	
	var order_data="<purchase_orders>" +
			"<id></id>" +
			"</purchase_orders>";
	var supplier_data="<suppliers>" +
			"<name></name>" +
			"</suppliers>";
	
	set_my_filter(order_data,order_filter);
	set_my_filter(supplier_data,name_filter);
	$(date_filter).datepicker();

};

/**
 * this function prepares the table for manage pamphlets form
 * @form Manage Pamphlets
 * @formNo 44
 */
function form44_header_ini()
{
	var filter_fields=document.getElementById('form44_header');
	var name_filter=filter_fields.elements[0];
	
	var name_data="<pamphlets>" +
			"<name></name>" +
			"</pamphlets>";
	
	set_my_filter(name_data,name_filter);
};

/**
 * this function prepares the table for manage service receipts form
 * @form Manage Service Receipts
 * @formNo 45
 */
function form45_header_ini()
{
	var filter_fields=document.getElementById('form45_header');
	var receipt_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	var date_filter=filter_fields.elements[2];
	
	var receipt_data="<bills>" +
			"<id></id>" +
			"</bills>";
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(receipt_data,receipt_filter);
	set_my_filter(customer_data,name_filter);
	$(date_filter).datepicker();

};


/**
 * this function sets the current theme for the change theme form
 * @form Change Theme
 * @formNo 46
 */
function form46_header_ini()
{
	var filter_fields=document.getElementById('form46_header');
	var other_element=filter_fields.elements[0];
	
	var other_data="<user_preferences>" +
			"<value></value>" +
			"<type>other</other>" +
			"</user_preferences>";
	
	set_my_filter(other_data,other_element);

};

/**
 * this function the header for Select Reprots form
 * @form Select Reports
 * @formNo 48
 */
function form48_header_ini()
{
	var filter_fields=document.getElementById('form48_header');
	var report_filter=filter_fields.elements[0];
	
	var reports_data="<user_preferences>" +
			"<display_name></display_name>" +
			"<type>report</type>" +
			"</user_preferences>";

	set_my_filter(reports_data,report_filter);

};


/**
 * this function the header for Select Forms form
 * @form Select Forms
 * @formNo 49
 */
function form49_header_ini()
{
	var filter_fields=document.getElementById('form49_header');
	var form_filter=filter_fields.elements[0];
	
	var forms_data="<user_preferences>" +
			"<display_name></display_name>" +
			"<type>form</type>" +
			"</user_preferences>";

	set_my_filter(forms_data,form_filter);

};

/**
 * this function the header for Select Accounting Principles form
 * @form Select Accounting Principles
 * @formNo 50
 */
function form50_header_ini()
{
	var filter_fields=document.getElementById('form50_header');
	var accounts_filter=filter_fields.elements[0];
	
	var accounts_data="<user_preferences>" +
			"<display_name></display_name>" +
			"<type>accounting</type>" +
			"</user_preferences>";

	set_my_filter(accounts_data,accounts_filter);

};

/**
 * @form Set Access Control
 * @formNo 51
 */
function form51_header_ini()
{
	var users_filter=document.getElementById('form51_master').elements[3];
		
	var username_data="<user_profiles>" +
			"<username></username>" +
			"</user_profiles>";
	
	set_my_filter(username_data,users_filter);

};

/**
 * @form Set Access Control
 * @formNo 51
 */
function form51_add_form()
{
	var form=document.getElementById('form51_master');
	var username=form.elements[3];
	
	$(username).on('blur',function(event){});
	form.elements[3].value="";
	form.elements[4].value="";
	form.elements[5].value="";
	form.elements[6].value=get_new_key();
	
	var columns="<access_control>" +
		"<id></id>" +
		"<username>master</username>" +
		"<element_id></element_id>" +
		"<element_name></element_name>" +
		"<status>active</status>" +
		"<re></re>" +
		"<cr></cr>" +
		"<up></up>" +
		"<del></del>" +
		"</access_control>";

	fetch_requested_data(columns,function(results)
	{
		var rowsHTML="";
	
		for(var i in results)
		{
			var id=get_my_time()+Math.floor(Math.random()*1000);
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form51_"+id+"'></form>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='text' readonly='readonly' form='form51_"+id+"' value='"+results[i].element_name+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='checkbox' form='form51_"+id+"' "+results[i].re+">";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
					rowsHTML+="<input type='checkbox' form='form51_"+id+"' "+results[i].cr+">";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='checkbox' form='form51_"+id+"' "+results[i].up+">";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='checkbox' form='form51_"+id+"' "+results[i].del+">";
					rowsHTML+="</td>";
					rowsHTML+="<td>";
						rowsHTML+="<input type='hidden' form='form51_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='hidden' form='form51_"+id+"' value='"+results[i].element_id+"'>";
						rowsHTML+="<img class='filter_icon' src='./images/save.jpeg' id='save_form51_"+id+"' form='form51_"+id+"' value='Save' onclick='form51_save_item($(this));'>";	
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";
		}
		//console.log(rowsHTML);
		$('#form51_body').html(rowsHTML);
	});
	
};


function form51_modify_form(button)
{
	var form=document.getElementById('form51_master');
	var username=form.elements[3];
	
	$(username).on('blur',function(event)
	{
		form51_ini('');
	});
	form51_ini('');
}

/**
 * this function sets the header for Set shortcuts form
 * @form Set shortcuts
 * @formNo 52
 */
function form52_header_ini()
{
	var filter_fields=document.getElementById('form50_header');
	var report_filter=filter_fields.elements[0];
	var key_filter=filter_fields.elements[1];
	
	var element_data="<shortcuts>" +
			"<element_name></element_name>" +
			"</shortcuts>";
	var key_data="<shortcuts>" +
			"<shortcut></shortcut>" +
			"</shortcuts>";

	set_my_filter(element_data,report_filter);
	set_my_filter(key_data,key_filter);

};

/**
 * this function prepares the table for manage supplier bills form
 * @form Manage Supplier Bills
 * @formNo 53
 */
function form53_header_ini()
{
	var filter_fields=document.getElementById('form53_header');
	var bill_filter=filter_fields.elements[0];
	var name_filter=filter_fields.elements[1];
	var bill_date_filter=filter_fields.elements[2];
	var entry_date_filter=filter_fields.elements[3];
	
	var bill_data="<supplier_bills>" +
			"<bill_id></bill_id>" +
			"</supplier_bills>";
	var sup_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	
	set_my_filter(bill_data,bill_filter);
	set_my_filter(sup_data,name_filter);
	$(bill_date_filter).datepicker();
	$(entry_date_filter).datepicker();

};

/**
 * @form Select Templates
 * @formNo 54
 */
function form54_header_ini()
{
	var filter_fields=document.getElementById('form54_header');
	var templates_filter=filter_fields.elements[0];
	
	var templates_data="<user_preferences>" +
			"<display_name></display_name>" +
			"<type>template</type>" +
			"</user_preferences>";

	set_my_filter(templates_data,templates_filter);

};

/**
 * @form Virtual Store
 * @formNo 55
 */
function form55_header_ini()
{	
	var filter_fields=document.getElementById('form55_header');
	var products_filter=filter_fields.elements[0];
	var batches_filter=filter_fields.elements[1];
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
		
	var batches_data="<product_instances>" +
			"<batch></batch>" +
			"</product_instances>";
	
	set_my_filter(product_data,products_filter);
	set_my_filter(batches_data,batches_filter);
	
	var canvas = document.getElementById('virtual_store');
	var ctx = canvas.getContext('2d');
	
	var blocks_data="<store_areas>" +
			"<name></name>" +
			"<area_type>block</area_type>" +
			"<height></height>" +
			"<width></width>" +
			"<length></length>" +
			"<locx></locx>" +
			"<locy></locy>" +
			"<locz></locz>" +
			"<storey></storey>" +
			"<color></color>" +
			"<radius></radius>" +
			"<loc_type></loc_type>" +
			"<faceEast></faceEast>" +
			"<faceWest></faceWest>" +
			"<faceNorth></faceNorth>" +
			"<faceSouth></faceSouth>" +	
			"</store_areas>";
	fetch_requested_data(blocks_data,function(blocks)
	{	
	    draw_blocks(ctx,blocks);
	});
	
	var doors_data="<store_areas>" +
			"<name></name>" +
			"<area_type>door</area_type>" +
			"<height></height>" +
			"<width></width>" +
			"<length></length>" +
			"<locx></locx>" +
			"<locy></locy>" +
			"<locz></locz>" +
			"<storey></storey>" +
			"<color></color>" +
			"<radius></radius>" +
			"<loc_type></loc_type>" +
			"<faceEast></faceEast>" +
			"<faceWest></faceWest>" +
			"<faceNorth></faceNorth>" +
			"<faceSouth></faceSouth>" +	
			"</store_areas>";

	fetch_requested_data(doors_data,function(doors)
	{	
	    draw_doors(ctx,doors);		
	});
	
	var storages_data="<store_areas>" +
			"<name></name>" +
			"<area_type>storage</area_type>" +
			"<height></height>" +
			"<width></width>" +
			"<length></length>" +
			"<locx></locx>" +
			"<locy></locy>" +
			"<locz></locz>" +
			"<storey></storey>" +
			"<color></color>" +
			"<radius></radius>" +
			"<loc_type></loc_type>" +
			"<faceEast></faceEast>" +
			"<faceWest></faceWest>" +
			"<faceNorth></faceNorth>" +
			"<faceSouth></faceSouth>" +	
			"</store_areas>";
	fetch_requested_data(storages_data,function(storages)
	{	
	    draw_storages(ctx,storages);
	});
	
};


/**
 * @form Expense register
 * @formNo 56
 */
function form56_header_ini()
{
	var filter_fields=document.getElementById('form56_header');
	var date_filter=filter_fields.elements[0];
	var account_filter=filter_fields.elements[1];
	
	var account_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	
	set_my_filter(account_data,account_filter);
	
	$(date_filter).datepicker();
	$(date_filter).val(get_my_date());
};

/**
 * @form Manage services
 * @formNo 57
 */
function form57_header_ini()
{
	var filter_fields=document.getElementById('form57_header');
	var service_filter=filter_fields.elements[0];
	
	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	
	set_my_filter(service_data,service_filter);
};

/**
 * @form Service Pre-requisites
 * @formNo 58
 */
function form58_header_ini()
{
	var filter_fields=document.getElementById('form58_header');
	var service_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var requisite_filter=filter_fields.elements[2];
	
	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	var requisite_data="<pre_requisites>" +
			"<requisite_name></requisite_name>" +
			"<type>service</type>" +
			"</pre_requisites>";
	
	set_my_filter(service_data,service_filter);
	set_static_filter('pre_requisites','requisite_type',type_filter);
	set_my_filter(requisite_data,requisite_filter);
	
};

/**
 * @form product pre-requisites
 * @formNo 59
 */
function form59_header_ini()
{
	var filter_fields=document.getElementById('form59_header');
	var product_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var requisite_filter=filter_fields.elements[2];
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var requisite_data="<pre_requisites>" +
			"<requisite_name></requisite_name>" +
			"<type>product</type>" +
			"</pre_requisites>";
	
	set_my_filter(product_data,product_filter);
	set_static_filter('pre_requisites','requisite_type',type_filter);
	set_my_filter(requisite_data,requisite_filter);
};

/**
 * @form Product Categories
 * @formNo 60
 */
function form60_header_ini()
{
	var filter_fields=document.getElementById('form60_header');
	var product_filter=filter_fields.elements[0];
	var category_filter=filter_fields.elements[1];
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var category_data="<categories>" +
			"<category></category>" +
			"</categories>";
	
	set_my_filter(product_data,product_filter);
	set_my_filter(category_data,category_filter);
};

/**
 * @form Service Categories
 * @formNo 61
 */
function form61_header_ini()
{
	var filter_fields=document.getElementById('form61_header');
	var service_filter=filter_fields.elements[0];
	var category_filter=filter_fields.elements[1];
	
	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	var category_data="<categories>" +
			"<category></category>" +
			"</categories>";
	
	set_my_filter(service_data,service_filter);
	set_my_filter(category_data,category_filter);
};


/**
 * @form Product reviews
 * @formNo 62
 */
function form62_header_ini()
{
	var filter_fields=document.getElementById('form62_header');
	var product_filter=filter_fields.elements[0];
	var reviewer_filter=filter_fields.elements[1];
	var rating_filter=filter_fields.elements[2];
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var reviewer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(product_data,product_filter);
	set_static_filter('reviews','rating',rating_filter);
	set_my_filter(reviewer_data,reviewer_filter);
};

/**
 * @form service reviews
 * @formNo 63
 */
function form63_header_ini()
{
	var filter_fields=document.getElementById('form63_header');
	var service_filter=filter_fields.elements[0];
	var reviewer_filter=filter_fields.elements[1];
	var rating_filter=filter_fields.elements[2];
	
	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	var reviewer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(service_data,service_filter);
	set_static_filter('reviews','rating',rating_filter);
	set_my_filter(reviewer_data,reviewer_filter);
};

/**
 * @form Service Cross sells
 * @formNo 64
 */
function form64_header_ini()
{
	var filter_fields=document.getElementById('form64_header');
	var service_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var cross_filter=filter_fields.elements[2];
	
	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	var cross_data="<cross_sells>" +
			"<cross_name></cross_name>" +
			"</cross_sells>";
	
	set_my_filter(service_data,service_filter);
	set_static_filter('cross_sells','type',type_filter);
	set_my_filter(cross_data,cross_filter);
};

/**
 * @form Service taxes
 * @formNo 65
 */
function form65_header_ini()
{
	var filter_fields=document.getElementById('form65_header');
	var service_filter=filter_fields.elements[0];
	var taxable_filter=filter_fields.elements[1];
	
	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	
	set_my_filter(service_data,service_filter);
	set_static_filter('services','taxable',taxable_filter);
};


/**
 * @form Product Cross sells
 * @formNo 66
 */
function form66_header_ini()
{
	var filter_fields=document.getElementById('form66_header');
	var product_filter=filter_fields.elements[0];
	var type_filter=filter_fields.elements[1];
	var cross_filter=filter_fields.elements[2];
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var cross_data="<cross_sells>" +
			"<cross_name></cross_name>" +
			"</cross_sells>";
	
	set_my_filter(product_data,product_filter);
	set_static_filter('cross_sells','type',type_filter);
	set_my_filter(cross_data,cross_filter);
};

/**
 * @form Product dimensions
 * @formNo 67
 */
function form67_header_ini()
{
	var filter_fields=document.getElementById('form67_header');
	var product_filter=filter_fields.elements[0];
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	set_my_filter(product_data,product_filter);
};

/**
 * @form Product taxes
 * @formNo 68
 */
function form68_header_ini()
{
	var filter_fields=document.getElementById('form68_header');
	var product_filter=filter_fields.elements[0];
	var taxable_filter=filter_fields.elements[1];
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	set_my_filter(product_data,product_filter);
	set_static_filter('product_master','taxable',taxable_filter);
};

