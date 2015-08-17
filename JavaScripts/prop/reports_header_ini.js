/**
 * @reportNo 1
 * @report Signage changes
 */
function report1_header_ini()
{	
	var form=document.getElementById('report1_header');
	var date_since=form.elements[1];
	var product_filter=form.elements[2];
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_filter(product_data,product_filter);

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report1_ini();
	});
	
	$(date_since).datepicker();
	$(date_since).val(get_my_date());
	
}

/**
 * @reportNo 4
 * @report Modes of payment
 */
function report4_header_ini()
{	
	var form=document.getElementById('report4_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report4_ini();
	});

	$(start_date).datepicker();
	$(start_date).val(get_my_past_date((get_my_time()-86400000)));

	$(end_date).datepicker();
	$(end_date).val(get_my_date());
}

/**
* @reportNo 5
* @report Customers account balances
*/
function report5_header_ini()
{	
	var form=document.getElementById('report5_header');
	var balance=form.elements[1];
	var customer_filter=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report5_ini();
	});

	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(customer_data,customer_filter);
}

/**
 * @reportNo 6
 * @report Payments due from customers
 */
function report6_header_ini()
{	
	var form=document.getElementById('report6_header');
	var due_date=form.elements[1];
	var customer_filter=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report6_ini();
	});

	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(customer_data,customer_filter);
	
	$(due_date).datepicker();
	due_date.value=get_my_date();
}

/**
 * @reportNo 9
 * @report Product sales report
 */
function report9_header_ini()
{	
	var form=document.getElementById('report9_header');
	var name_filter=form.elements[1];
	var make_filter=form.elements[2];
	var customer_filter=form.elements[3];
	var start_date_filter=form.elements[4];
	var end_date_filter=form.elements[5];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report9_ini();
	});

	var name_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var make_data="<product_master>" +
			"<make></make>" +
			"</product_master>";
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(name_data,name_filter);
	set_my_filter(make_data,make_filter);
	set_my_filter(customer_data,customer_filter);
	
	$(start_date_filter).datepicker();
	$(end_date_filter).datepicker();
	$(start_date_filter).val(get_my_past_date((get_my_time()-86400000)));
	$(end_date_filter).val(get_my_date());
}

/**
 * @reportNo 14
 * @report Expenses by period
 */
function report14_header_ini()
{	
	var form=document.getElementById('report14_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];
	var account_filter=form.elements[3];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report14_ini();
	});

	var accounts_data="<accounts>" +
			"<acc_name></acc_name>" +
			"<type exact='yes'>financial</type>" +
			"</accounts>";
	set_my_filter(accounts_data,account_filter);
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-86400000));
	end_date.value=get_my_date();
}

/**
 * @reportNo 15
 * @report Financial Summary
 */
function report15_header_ini()
{	
	var form=document.getElementById('report15_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report15_ini();
	});
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-86400000));
	end_date.value=get_my_date();
}

/**
 * @reportNo 17
 * @report Staff performance
 */
function report17_header_ini()
{	
	var form=document.getElementById('report17_header');
	var from_filter=form.elements[1];
	var to_filter=form.elements[2];
	var staff_filter=form.elements[3];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report17_ini();
	});

	var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
	
	set_my_filter(staff_data,staff_filter);
	
	$(from_filter).datepicker();
	$(from_filter).val(get_my_past_date((get_my_time()-86400000)));
	$(to_filter).datepicker();
	$(to_filter).val(get_my_date());
}

/**
 * @reportNo 26
 * @report Sales by customers
 */
function report26_header_ini()
{	
	var form=document.getElementById('report26_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];
	var customer_filter=form.elements[3];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report26_ini();
	});

	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(customer_data,customer_filter);
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-86400000));
	end_date.value=get_my_date();
}

/**
 * @reportNo 27
 * @report Expiring Inventory
 */
function report27_header_ini()
{	
	var form=document.getElementById('report27_header');
	var expiry_date=form.elements[1];
	var product_filter=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report27_ini();
	});

	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_filter(product_data,product_filter);
	
	$(expiry_date).datepicker();
	expiry_date.value=get_my_date();
}

/**
 * @reportNo 28
 * @report Short Inventory
 */
function report28_header_ini()
{	
	var form=document.getElementById('report28_header');
	var nun_days=form.elements[1];
	var product_filter=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report28_ini();
	});

	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_filter(product_data,product_filter);
	
}

/**
 * @reportNo 29
 * @report Pre-requisites for products
 */
function report29_header_ini()
{	
	var form=document.getElementById('report29_header');
	var product_filter=form.elements[1];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report29_ini();
	});
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	set_my_filter(product_data,product_filter);
}


function report30_header_ini()
{	
	var form=document.getElementById('report30_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report30_ini();
	});

	$(start_date).datepicker();
	$(start_date).val(get_my_past_date((get_my_time()-86400000)));

	$(end_date).datepicker();
	$(end_date).val(get_my_date());
}

/**
 * @report Customer map by credit
 * @reportNo 31
 */
function report31_header_ini()
{	
	var form=document.getElementById('report31_header');
	var amount=form.elements[1];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report31_ini();
	});

	$("#report31_slider").slider({
		range: true,
		min: 0,
		max: 1000000,
		values: [75,3000],
		slide: function(event,ui){
			$(amount).val("Rs. "+ui.values[0]+" - Rs. "+ui.values[1]);
		}});
	$(amount).val("Rs. "+$("#report31_slider").slider("values",0)+" - Rs. "+$("#report31_slider").slider("values",1));
	
}

/**
 * @report Staff map
 * @reportNo 32
 */
function report32_header_ini()
{	
	var form=document.getElementById('report32_header');
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report32_ini();
	});
}

/**
 * @report Supplier map by debit
 * @reportNo 33
 */
function report33_header_ini()
{	
	var form=document.getElementById('report33_header');
	var amount=form.elements[1];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report33_ini();
	});

	$("#report33_slider").slider({
		range: true,
		min: 0,
		max: 5000000,
		values: [7500,500000],
		slide: function(event,ui){
			$(amount).val("Rs. "+ui.values[0]+" - Rs. "+ui.values[1]);
		}});
	$(amount).val("Rs. "+$("#report33_slider").slider("values",0)+" - Rs. "+$("#report33_slider").slider("values",1));
}

/**
 * @reportNo 34
 * @report Effective Margin
 */
function report34_header_ini()
{	
	var form=document.getElementById('report34_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report34_ini();
	});
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-86400000));
	end_date.value=get_my_date();
}


/**
 * @report Customer map by products
 * @reportNo 35
 */
function report35_header_ini()
{	
	var form=document.getElementById('report35_header');
	var product_filter=form.elements[1];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report35_ini();
	});

	var product_data="<product_master>" +
		"<name></name>" +
		"</product_master>";
	set_my_filter(product_data,product_filter);
}

/**
 * @report Supplier map by products
 * @reportNo 36
 */
function report36_header_ini()
{	
	var form=document.getElementById('report36_header');
	var product_filter=form.elements[1];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report36_ini();
	});

	var product_data="<product_master>" +
		"<name></name>" +
		"</product_master>";
	set_my_filter(product_data,product_filter);
}

/**
 * @reportNo 37
 * @report Payments due to suppliers
 */
function report37_header_ini()
{	
	var form=document.getElementById('report37_header');
	var due_date=form.elements[1];
	var supplier_filter=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report37_ini();
	});

	var supplier_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	set_my_filter(supplier_data,supplier_filter);
	
	$(due_date).datepicker();
	due_date.value=get_my_date();
}

/**
 * @reportNo 38
 * @report Sales by products
 */
function report38_header_ini()
{	
	var form=document.getElementById('report38_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];
	var product_filter=form.elements[3];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report38_ini();
	});

	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_filter(product_data,product_filter);
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-86400000));
	end_date.value=get_my_date();
}

/**
 * @reportNo 39
 * @report Sales by services
 */
function report39_header_ini()
{	
	var form=document.getElementById('report39_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];
	var service_filter=form.elements[3];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report39_ini();
	});

	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	set_my_filter(service_data,service_filter);
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-86400000));
	end_date.value=get_my_date();
}

/**
 * @reportNo 40
 * @report Surplus Inventory
 */
function report40_header_ini()
{	
	var form=document.getElementById('report40_header');
	var nun_days=form.elements[1];
	var product_filter=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report40_ini();
	});

	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_filter(product_data,product_filter);
	
}

/**
 * @reportNo 41
 * @report Pre-requisites for services
 */
function report41_header_ini()
{	
	var form=document.getElementById('report41_header');
	var service_filter=form.elements[1];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report41_ini();
	});

	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	set_my_filter(service_data,service_filter);
}

/**
 * @reportNo 42
 * @report Feedback
 */
function report42_header_ini()
{	
	var form=document.getElementById('report42_header');
	var customer_filter=form.elements['customer'];
	var start_filter=form.elements['start'];
	var end_filter=form.elements['end'];	
	var refresh_button=form.elements['refresh'];	
	
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(customer_data,customer_filter);

	$(start_filter).datepicker();
	$(end_filter).datepicker();
}

/**
 * @reportNo 43
 * @report Change in customer behavior
 */
function report43_header_ini()
{	
	var form=document.getElementById('report43_header');
	var customer_filter=form.elements[1];
	var p1_start_filter=form.elements[2];
	var p1_end_filter=form.elements[3];
	var p2_start_filter=form.elements[4];
	var p2_end_filter=form.elements[5];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report43_ini();
	});
	
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(customer_data,customer_filter);
	
	$(p1_start_filter).datepicker();
	p1_start_filter.value=get_my_past_date((get_my_time()-86400000));
	
	$(p1_end_filter).datepicker();
	p1_end_filter.value=get_my_date();

	$(p2_start_filter).datepicker();
	p2_start_filter.value=get_my_past_date((get_my_time()-86400000));
	
	$(p2_end_filter).datepicker();
	p2_end_filter.value=get_my_date();
}

/**
 * @reportNo 44
 * @report Compare products
 */
function report44_header_ini()
{	
	var form=document.getElementById('report44_header');
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report44_ini();
	});

	$('#report44_body').html("");
}


/**
 * @report Virtual Store
 * @reportNo 45
 */
function report45_header_ini()
{	
	var filter_fields=document.getElementById('report45_header');
	var products_filter=filter_fields.elements[0];
	var batches_filter=filter_fields.elements[1];
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_filter(product_data,products_filter);
	
	$(products_filter).off('blur');
	$(products_filter).on('blur',function(event)
	{
		var batches_data="<product_instances>" +
			"<batch></batch>" +
			"<product_name exact='yes'>"+products_filter.value+"</product_name>" +
			"</product_instances>";

		set_my_filter(batches_data,batches_filter);
	});
	
	var canvas = document.getElementById('report45_canvas');
	var ctx = canvas.getContext('2d');
	
	var blocks_data="<store_areas>" +
			"<name></name>" +
			"<area_type exact='yes'>block</area_type>" +
			"<height></height>" +
			"<width></width>" +
			"<len></len>" +
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
	fetch_requested_data('',blocks_data,function(blocks)
	{	
	    draw_blocks(ctx,blocks);
	});
	
	var doors_data="<store_areas>" +
			"<name></name>" +
			"<area_type exact='yes'>door</area_type>" +
			"<height></height>" +
			"<width></width>" +
			"<len></len>" +
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

	fetch_requested_data('',doors_data,function(doors)
	{	
		draw_doors(ctx,doors);		
	});
	
	var storages_data="<store_areas>" +
			"<name></name>" +
			"<area_type exact='yes'>storage</area_type>" +
			"<height></height>" +
			"<width></width>" +
			"<len></len>" +
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
	fetch_requested_data('',storages_data,function(storages)
	{	
	    draw_storages(ctx,storages);
	});
	
};

/**
* @reportNo 46
* @report Suppliers account balances
*/
function report46_header_ini()
{	
	var form=document.getElementById('report46_header');
	var balance=form.elements[1];
	var supplier_filter=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report46_ini();
	});

	var supplier_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	set_my_filter(supplier_data,supplier_filter);
}

/**
 * @reportNo 47
 * @report Inventory value
 */
function report47_header_ini()
{	
	var form=document.getElementById('report47_header');
	var product_filter=form.elements[1];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report47_ini();
	});

	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_filter(product_data,product_filter);
}

/**
 * @reportNo 48
 * @report Resource Analysis
 */
function report48_header_ini()
{	
	var form=document.getElementById('report48_header');
	var product_filter=form.elements[1];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report48_ini();
	});

	var product_data="<manufacturing_schedule>" +
			"<product></product>" +
			"</manufacturing_schedule>";
	set_my_filter(product_data,product_filter);
}

/**
 * @reportNo 50
 * @report Margin by products
 */
function report50_header_ini()
{	
	var form=document.getElementById('report50_header');
	var make_filter=form.elements[1];
	var product_filter=form.elements[2];
	var margin_filter=form.elements[3];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report50_ini();
	});

	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_filter(product_data,product_filter);
	
	var make_data="<product_master>" +
		"<make></make>" +
		"</product_master>";
	set_my_filter(make_data,make_filter);
	
	$("#report50_slider").slider(
	{
		range: true,
		min: 0,
		max: 100,
		values: [5,15],
		slide: function(event,ui){
			$(margin_filter).val(ui.values[0]+"% - "+ui.values[1]+"%");
	}});
	$(margin_filter).val($("#report50_slider").slider("values",0)+"% - "+$("#report50_slider").slider("values",1)+"%");
}

/**
 * @reportNo 51
 * @report Dead items
 */
function report51_header_ini()
{	
	var form=document.getElementById('report51_header');
	var product_filter=form.elements[1];
	var date_filter=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report51_ini();
	});

	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_filter(product_data,product_filter);

	$(date_filter).datepicker();
}

/**
 * @reportNo 52
 * @report Product purchase report
 */
function report52_header_ini()
{	
	var form=document.getElementById('report52_header');
	var name_filter=form.elements[1];
	var make_filter=form.elements[2];
	var supplier_filter=form.elements[3];
	var date_filter=form.elements[4];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report52_ini();
	});

	var name_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	var make_data="<product_master>" +
			"<make></make>" +
			"</product_master>";
	var supplier_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	
	set_my_filter(name_data,name_filter);
	set_my_filter(make_data,make_filter);
	set_my_filter(supplier_data,supplier_filter);
	
	$(date_filter).datepicker();
	$(date_filter).val(get_my_past_date((get_my_time()-86400000)));
}

/**
 * @reportNo 53
 * @report Sales tax
 */
function report53_header_ini()
{	
	var form=document.getElementById('report53_header');
	var name_filter=form.elements[1];
	var start_filter=form.elements[2];
	var end_filter=form.elements[3];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report53_ini();
	});

	var name_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	set_my_filter(name_data,name_filter);
	
	$(start_filter).datepicker();
	$(start_filter).val(get_my_past_date((get_my_time()-86400000)));
	$(end_filter).datepicker();
	$(end_filter).val(get_my_past_date(get_my_time()));
}

/**
 * @reportNo 54
 * @report Best days (by sales)
 */
function report54_header_ini()
{	
	var form=document.getElementById('report54_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report54_ini();
	});
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-86400000));
	end_date.value=get_my_date();
}

/**
 * @reportNo 55
 * @report worst days (by sales)
 */
function report55_header_ini()
{	
	var form=document.getElementById('report55_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report55_ini();
	});
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-86400000));
	end_date.value=get_my_date();
}

/**
 * @reportNo 56
 * @report Service Requests report
 */
function report56_header_ini()
{	
	var form=document.getElementById('report56_header');
	var customer_filter=form.elements[1];
	var machine_filter=form.elements[2];
	var problem_filter=form.elements[3];
	var start_filter=form.elements[4];
	var end_filter=form.elements[5];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report56_ini();
	});

	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	
	set_my_filter(customer_data,customer_filter);
	
	var machine_data="<service_requests>"+
						"<machine_type></machine_type>"+						
						"</service_requests>";	
	set_my_filter(machine_data,machine_filter);	
	
	$(start_filter).datepicker();
	$(start_filter).val(get_my_past_date((get_my_time()-86400000)));
	$(end_filter).datepicker();
	$(end_filter).val(get_my_past_date(get_my_time()));
}

/**
 * @reportNo 57
 * @report Subscription Status
 */
function report57_header_ini()
{	
	var form=document.getElementById('report57_header');
	var customer_filter=form.elements[1];
	var subscription_filter=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report57_ini();
	});

	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(customer_data,customer_filter);
	
	var sub_data="<service_subscriptions>"+
				"<service></service>"+
				"</service_subscriptions>";	
	set_my_filter(sub_data,subscription_filter);
}

/**
 * @reportNo 58
 * @report Ledger
 */
function report58_header_ini()
{	
	var form=document.getElementById('report58_header');
	var account_filter=form.elements[1];
	var start_filter=form.elements[2];
	var end_filter=form.elements[3];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report58_ini();
	});

	var account_data="<accounts>" +
			"<acc_name></acc_name>" +
			"</accounts>";
	
	set_my_filter(account_data,account_filter);
		
	$(start_filter).datepicker();
	$(start_filter).val(get_my_past_date((get_my_time()-86400000)));
	$(end_filter).datepicker();
	$(end_filter).val(get_my_date());
}

/**
 * @reportNo 60
 * @report Trial Balance
 */
function report60_header_ini()
{	
	var form=document.getElementById('report60_header');
	var start_filter=form.elements[1];
	var end_filter=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report60_ini();
	});
		
	$(start_filter).datepicker();
	$(start_filter).val(get_my_past_date((get_my_time()-86400000)));
	$(end_filter).datepicker();
	$(end_filter).val(get_my_date());
}

/**
 * @reportNo 63
 * @report Item Picklist
 */
function report63_header_ini()
{	
	var form=document.getElementById('report63_header');
	var type_filter=form.elements[1];
	var sku_filter=form.elements[2];
	var item_name_filter=form.elements[3];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report63_ini();
	});
	
	set_static_value_list('item_picklist','pick_type',type_filter,function ()
	{
		$(type_filter).focus();
	});
	
	$(type_filter).off('blur');
	$(type_filter).on('blur',function () 
	{	
		var sku_data="<product_master>"+
			"<name></name>"+
			"</product_master>";
		set_my_filter(sku_data,sku_filter);	

		var name_data="<product_master>"+
			"<description></description>"+
			"</product_master>";
		set_my_filter(name_data,item_name_filter);	
	});				
}

/**
 * @reportNo 64
 * @report Packing Instructions
 */
function report64_header_ini()
{	
	var master_form=document.getElementById('report64_header');
	var item_filter=master_form.elements[1];
	
	$('#report64_image').html('');
	$('#report64_packing').html('');
	$('#report64_invoice').html('');

	$(item_filter).focus();

	$(master_form).off('submit');
	$(master_form).on('submit',function(event)
	{
		event.preventDefault();
		report64_ini();
	});
	
	var form=document.getElementById('report64_form');
	var reject_button=form.elements['reject'];
	var accept_button=form.elements['accept'];
	var print_button=form.elements['print'];
	
	$(reject_button).off('click');
	$(accept_button).off('click');
	$(print_button).off('click');
	
	$(reject_button).hide();
	$(accept_button).hide();
	$(print_button).hide();
	
	$(reject_button).on('click',function () 
	{
		var columns="<product_master count='1'>" +
			"<id></id>" +
			"<name></name>"+
			"<bar_code exact='yes'>"+item_filter.value+"</bar_code>" +
			"</product_master>";
		fetch_requested_data('',columns,function (products) 
		{
			var bill_items="<bill_items count='1'>"+
					"<id></id>"+
					"<item_name exact='yes'>"+products[0].name+"</item_name>"+
					"<picked_status exact='yes'>picked</picked_status>"+
					"<packing_status exact='yes'>pending</packing_status>"+
					"</bill_items>";
			fetch_requested_data('',bill_items,function (items) 
			{
				var items_xml="<bill_items>"+
						"<id>"+items[0].id+"</id>"+					
						"<picked_status exact='yes'>pending</picked_status>"+
						"<packing_status exact='yes'>pending</packing_status>"+
						"<last_updated>"+get_my_time()+"</last_updated>"+						
						"</bill_items>";
				if(is_online())
				{
					server_update_simple(items_xml);
				}
				else 
				{
					local_update_simple(items_xml);
				}		
			});		
		});
	});

	$(accept_button).on('click',function () 
	{
		var columns="<product_master count='1'>" +
			"<id></id>" +
			"<name></name>"+
			"<bar_code exact='yes'>"+item_filter.value+"</bar_code>" +
			"</product_master>";
		fetch_requested_data('',columns,function (products) 
		{
			var bill_items="<bill_items count='1'>"+
					"<id></id>"+					
					"<item_name exact='yes'>"+products[0].name+"</item_name>"+
					"<picked_status exact='yes'>picked</picked_status>"+
					"<packing_status exact='yes'>pending</packing_status>"+
					"</bill_items>";
			fetch_requested_data('',bill_items,function (items) 
			{
				var items_xml="<bill_items>"+
						"<id>"+items[0].id+"</id>"+					
						"<packing_status exact='yes'>packed</packing_status>"+
						"<last_updated>"+get_my_time()+"</last_updated>"+						
						"</bill_items>";
				if(is_online())
				{
					server_update_simple(items_xml);
				}
				else 
				{
					local_update_simple(items_xml);
				}				
			});		
		});
	});

	$(print_button).on('click',function () 
	{
		var container=document.getElementById('report64_invoice');
		$.print(container);
	});
}

/**
 * @reportNo 65
 * @report Pricing Update timestamps
 */
function report65_header_ini()
{	
	var form=document.getElementById('report65_header');
	var channel_filter=form.elements[1];
	var item_filter=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report65_ini();
	});

	var item_data="<product_master>"+
				"<name></name>"+
				"</product_master>";
	set_my_filter(item_data,item_filter);

	var channel_data="<sale_channels>"+
				"<name></name>"+
				"</sale_channels>";
	set_my_filter(channel_data,channel_filter);
	
}

/**
 * @reportNo 66
 * @report Inventory Status (by store)
 */
function report66_header_ini()
{	
	var form=document.getElementById('report66_header');
	var type_filter=form.elements[1];
	var storage_filter=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report66_ini();
	});
	
	$(type_filter).off('blur');
	$(type_filter).on('blur',function () 
	{
		var storage_data="<store_areas>"+
				"<name></name>"+
				"<area_type exact='yes'>"+type_filter.value+"</area_type>"+
				"</store_areas>";
		set_my_filter(storage_data,storage_filter);
		storage_filter.value="";
	});
	
	var type_data="<storage_structure>"+
				"<name></name>"+
				"</storage_structure>";
	set_my_value_list(type_data,type_filter);		
}

/**
 * @reportNo 67
 * @report Channel Collections
 */
function report67_header_ini()
{	
	var form=document.getElementById('report67_header');
	var channel_filter=form.elements[1];
	var status_filter=form.elements[2];
	var from_filter=form.elements[3];
	var to_filter=form.elements[4];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report67_ini();
	});
	
/*	var customer_data="<customers>"+
				"<acc_name></acc_name>"+
				"</customers>";
	set_my_filter(customer_data,customer_filter);
*/

	set_static_filter('bills','collection_status',status_filter);	
	var channel_data="<sale_channels>"+
				"<name></name>"+
				"</sale_channels>";
	set_my_filter(channel_data,channel_filter);

	$(from_filter).datepicker();
	$(to_filter).datepicker();
	from_filter.value=get_my_past_date((get_my_time()-86400000));
	to_filter.value=get_my_date();
}

/**
 * @reportNo 69
 * @report Project Expenses
 */
function report69_header_ini()
{	
	var form=document.getElementById('report69_header');
	var project_filter=form.elements['project'];
	var staff_filter=form.elements['staff'];
	var from_filter=form.elements['from'];
	var to_filter=form.elements['to'];
	var id_filter=form.elements['project_id'];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report69_ini();
	});
	
	var project_data="<projects>"+
				"<name></name>"+
				"</projects>";
	set_my_value_list(project_data,project_filter);

	my_datalist_change(project_filter,function () 
	{
		var id_data="<projects>"+
					"<id></id>"+
					"<name exact='yes'>"+project_filter.value+"</name>"+					
					"</projects>";
		set_my_value(id_data,id_filter);
	});

	var staff_data="<staff>"+
				"<acc_name></acc_name>"+
				"</staff>";
	set_my_filter(staff_data,staff_filter);

	$(from_filter).datepicker();
	$(to_filter).datepicker();
}

/**
 * @reportNo 72
 * @report Pickup and deliveries
 */
function report72_header_ini()
{	
	var form=document.getElementById('report72_header');
	var customer_filter=form.elements[1];
	var addess_filter=form.elements[2];
	var status_filter=form.elements[3];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report72_ini();
	});
	
	var customer_data="<customers>"+
				"<acc_name></acc_name>"+
				"</customers>";
	set_my_filter(customer_data,customer_filter);
	
	set_static_filter('sale_orders','status',status_filter);	
}

/**
 * @reportNo 73
 * @report Laundry Stock
 */
function report73_header_ini()
{	
	var form=document.getElementById('report73_header');
	var customer_filter=form.elements['customer'];
	var item_filter=form.elements['item_name'];
	var status_filter=form.elements['status'];	
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report73_ini();
	});

	set_static_filter('sale_orders','status',status_filter);
	
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(customer_data,customer_filter);
	
	var item_data="<bill_items>" +
			"<item_name></item_name>" +
			"</bill_items>";
	set_my_filter(item_data,item_filter);
}

/**
 * @reportNo 74
 * @report Feedback
 */
function report74_header_ini()
{	
	var form=document.getElementById('report74_header');
	var customer_filter=form.elements['customer'];
	var start_filter=form.elements['start'];
	var end_filter=form.elements['end'];	
	var refresh_button=form.elements['refresh'];	
	
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(customer_data,customer_filter);

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report74_ini();
	});

	$(start_filter).datepicker();
	$(end_filter).datepicker();
	start_filter.value=get_my_past_date((get_my_time()-86400000));
	end_filter.value=get_my_date();
}

/**
 * @reportNo 75
 * @report Supplier Score Report
 */
function report75_header_ini()
{	
	var form=document.getElementById('report75_header');
	var supplier_filter=form.elements['supplier'];
	var refresh_button=form.elements['refresh'];	
	
	var supplier_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	set_my_filter(supplier_data,supplier_filter);
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report75_ini();
	});
}

/**
 * @reportNo 76
 * @report Logistics order status
 */
function report76_header_ini()
{	
	var form=document.getElementById('report76_header');
	var awb_filter=form.elements[1];
	var delivery_filter=form.elements[2];
	var status_filter=form.elements[3];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report76_ini();
	});
	
	var awb_data="<logistics_orders>"+
				"<awb_num></awb_num>"+
				"</logistics_orders>";
	set_my_filter(awb_data,awb_filter);

	var delivery_data="<logistics_orders>"+
				"<delivery_person></delivery_person>"+
				"</logistics_orders>";
	set_my_filter(delivery_data,delivery_filter);
	
	set_static_filter('logistics_orders','status',status_filter);	
}

/**
 * @reportNo 77
 * @report Inventory Storage (by item)
 */
function report77_header_ini()
{	
	var form=document.getElementById('report77_header');
	var item_filter=form.elements[1];
	var batch_filter=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report77_ini();
	});
			
	var item_data="<product_master>"+
				"<name></name>"+
				"</product_master>";
	set_my_filter(item_data,item_filter);
	
	var batch_data="<product_instances>"+
				"<batch></batch>"+
				"</product_instances>";
	set_my_filter(batch_data,batch_filter);				
}

/**
 * @reportNo 78
 * @report Followup report
 */
function report78_header_ini()
{	
	var form=document.getElementById('report78_header');
	var customer_filter=form.elements['customer'];
	var date_filter=form.elements['date'];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report78_ini();
	});
			
	var customer_data="<customers>"+
				"<acc_name></acc_name>"+
				"</customers>";
	set_my_filter(customer_data,customer_filter);
	$(date_filter).datepicker();
}

/**
 * @reportNo 79
 * @report Pending PO items
 */
function report79_header_ini()
{	
	var form=document.getElementById('report79_header');
	var order_filter=form.elements[1];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report79_ini();
	});
	
	var order_data="<purchase_orders>"+
				"<order_num></order_num>"+
				"<status array='yes'>--order placed--partially received--</status>"+
				"</purchase_orders>";
	set_my_filter(order_data,order_filter);
}


/**
 * @reportNo 80
 * @report Total Sales
 */
function report80_header_ini()
{	
	var form=document.getElementById('report80_header');
	var start_filter=form.elements[1];
	var end_filter=form.elements[2];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report80_ini();
	});
	
	$(start_filter).datepicker();
	$(end_filter).datepicker();	
}

/**
 * @reportNo 81
 * @report Sale leads report
 */
function report81_header_ini()
{	
	var form=document.getElementById('report81_header');
	var staff_filter=form.elements['staff'];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report81_ini();
	});
			
	var staff_data="<staff>"+
				"<acc_name></acc_name>"+
				"</staff>";
	set_my_filter(staff_data,staff_filter);
}

/**
 * @reportNo 82
 * @report Iventory report
 */
function report82_header_ini()
{	
	var form=document.getElementById('report82_header');
	var product_filter=form.elements['product'];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report82_ini();
	});
			
	var product_data="<product_master>"+
				"<name></name>"+
				"</product_master>";
	set_my_filter(product_data,product_filter);
}

/**
 * @reportNo 83
 * @report Testing Results
 */
function report83_header_ini()
{	
	var form=document.getElementById('report83_header');
	var test_filter=form.elements['test'];
	var name_filter=form.elements['name'];
	var result_filter=form.elements['result'];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report83_ini();
	});
			
	var name_data="<product_master>"+
				"<name></name>"+
				"</product_master>";
	set_my_filter(name_data,name_filter);
	
	var test_data="<testing_process>"+
				"<test_id></test_id>"+
				"</testing_process>";
	set_my_filter(test_data,test_filter);
	
	set_static_filter('testing_results','response',result_filter);
	
	var prev_element=document.getElementById('report83_prev');
	var next_element=document.getElementById('report83_next');
	
	$(prev_element).hide();
	$(next_element).hide();	
}

/**
 * @reportNo 84
 * @report # deliveries
 */
function report84_header_ini()
{	
	var form=document.getElementById('report84_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report84_ini();
	});
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-(7*86400000)));
	end_date.value=get_my_date();
}

/**
 * @reportNo 85
 * @report # deliveries
 */
function report85_header_ini()
{	
	var form=document.getElementById('report85_header');
	var start_date=form.elements[1];
	var end_date=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report85_ini();
	});
	
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-(7*86400000)));
	end_date.value=get_my_date();	
}

/**
 * @reportNo 86
 * @report Sales report (Modern)
 */
function report86_header_ini()
{	
	var form=document.getElementById('report86_header');
	var item_filter=form.elements[1];
	var start_date=form.elements[2];
	var end_date=form.elements[3];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report86_ini();
	});

	var item_data="<product_master>"+
				"<name></name>"+
				"</product_master>";
	set_my_filter(item_data,item_filter);
				
	$(start_date).datepicker();
	$(end_date).datepicker();
	start_date.value=get_my_past_date((get_my_time()-(7*86400000)));
	end_date.value=get_my_date();
}