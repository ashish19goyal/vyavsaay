<div id='form268' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form268_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form268_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form268_print' onclick=form268_print_form();><i class='fa fa-print'></i> Print</a>
        <a class='btn btn-default btn-sm' id='form268_share'><i class='fa fa-envelope'></i> Email</a>
      </div>
	</div>

	<div class="portlet-body">
        <form id='form268_master' autocomplete="off">
            <fieldset>
                <label><div class='btn-overlap'><input type='text' required name='customer' placeholder='Customer' class='floatlabel'><button type='button' title='Add new customer' class='btn btn-icon-only default right-overlap' id='form268_add_customer'><i class='fa fa-plus'></i></button></div></label>
                <label><input type='text' required readonly="readonly" name='challan_num' class='floatlabel' placeholder='Challan #'></label>
                <label><input type='text' name='date' required class='floatlabel' placeholder='Date'></label>
                <label><input type='text' name='awb_num' class='floatlabel' placeholder='AWB #'></label>
                <label><input type='text' name='vehicle_num' class='floatlabel' placeholder='Vehicle #'></label>
                <label><input type='text' name='type' class='floatlabel' placeholder='Type' required></label>
                <label><input type='text' name='prepared' class='floatlabel' placeholder='Prepared By'></label><input type='hidden' name='id'>
                <input type='hidden' name='address'>
                <input type='submit' class='submit_hidden'>
            </fieldset>
        </form>

        <br>

        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr style='color:#9a9a9a;'>
          <th>Item</th>
					<th>Specification</th>
					<th>Quantity</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form268_body'>
			</tbody>
      <tfoot id='form268_foot'>
      </tfoot>
		</table>
    </div>

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
	var prepared_filter=fields.elements['prepared'];
	var address_filter=fields.elements['address'];
	var id_filter=fields.elements['id'];
	var save_button=document.getElementById('form268_save');
	var share_button=document.getElementById('form268_share');

	$(share_button).off('click');

	id_filter.value=get_new_key();
	customer_filter.value='';
	challan_num.value="";
	awb_num.value='';
	vehicle_num.value='';
	type_filter.value='';
	prepared_filter.value='';
	address_filter.value='';

	$(challan_date).datepicker();
	challan_date.value=get_my_date();

	set_static_value_list_json('delivery_challans','type',type_filter);

	var staff_data={data_store:'staff',return_column:'acc_name'};
	set_my_value_list_json(staff_data,prepared_filter);

	$(customer_filter).off('blur');
	$(customer_filter).on('blur',function ()
	{
		var address_data={data_store:'customers',
                         indexes:[{index:'address'},{index:'city'},{index:'pincode'},{index:'acc_name',exact:customer_filter.value}]};
		read_json_rows('',address_data,function (addresses)
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
		var challan_num_data={data_store:'user_preferences',count:1,return_column:'value',
                             indexes:[{index:'name',exact:'delivery_challan_num'}]};
		read_json_single_column(challan_num_data,function(nums)
		{
			if(nums.length>0)
			{
				challan_num.value=get_session_var('challan_number_prefix')+"-"+nums[0];
			}
		});
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

	var customers_data={data_store:"customers",return_column:'acc_name'};
	set_my_value_list_json(customers_data,customer_filter,function ()
	{
		$(customer_filter).focus();
	});

	var add_customer=document.getElementById('form268_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{
			set_my_value_list_json(customers_data,customer_filter);
		});
	});

	var paginator=$('#form268_body').paginator({visible:false});
	$('#form268').formcontrol();
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
		var challan_columns={data_store:'delivery_challans',count:1,
                            indexes:[{index:'id',exact:challan_id},
                                    {index:'challan_num'},
                                    {index:'customer'},
                                    {index:'challan_date'},
                                    {index:'awb_num'},
                                    {index:'vehicle_num'},
                                    {index:'prepared_by'},
                                    {index:'type'},
                                    {index:'address'}]};

		var filter_fields=document.getElementById('form268_master');

		read_json_rows('form268',challan_columns,function(challan_results)
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
				filter_fields.elements['prepared'].value=challan_results[0].prepared_by;
				filter_fields.elements['address'].value=challan_results[0].address;

				var save_button=document.getElementById('form268_save');

				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form268_update_form();
				});
			}
            $(filter_fields).formcontrol();
        });
        var challan_items_column={data_store:'delivery_challan_items',
                                 indexes:[{index:'id'},
                                         {index:'item_name'},
                                         {index:'item_desc'},
                                         {index:'quantity'},
                                         {index:'unit'},
                                         {index:'challan_id',exact:challan_id}]};

        read_json_rows('form268',challan_items_column,function(results)
        {
            results.forEach(function(result)
            {
                var id=result.id;
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form268_"+id+"'></form>";
                    rowsHTML+="<td data-th='Item'>";
                        rowsHTML+="<a onclick=\"show_object('product_master','"+result.item_name+"');\"><textarea readonly='readonly' form='form268_"+id+"'>"+result.item_name+"</textarea></a>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Specification'>";
                        rowsHTML+="<textarea readonly='readonly' form='form268_"+id+"'>"+result.item_desc+"</textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Quantity'>";
                        rowsHTML+="<input type='number' readonly='readonly' class='floatlabel_right' placeholder='"+result.unit+"' form='form268_"+id+"' value='"+result.quantity+"' step='any'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form268_"+id+"' value='"+id+"'>";
                        rowsHTML+="<input type='button' name='save' class='submit_hidden' form='form268_"+id+"' id='save_form268_"+id+"'>";
                        rowsHTML+="<button type='button' class='btn red' form='form268_"+id+"' id='delete_form268_"+id+"' onclick='form268_delete_item($(this)); form268_get_totals();' name='delete'><i class='fa fa-trash'></i></button>";
                    rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form268_body').append(rowsHTML);

            });
            form268_get_totals();

            var share_button=document.getElementById('form268_share');
            $(share_button).click(function()
            {
                modal101_action('Delivery Challan #:'+filter_fields.elements['challan_num'].value,filter_fields.elements['customer'].value,'customer',function (func)
                {
                    print_form268(func);
                });
            });

            $('#form268').formcontrol();
            hide_loader();
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
			rowsHTML+="<td data-th='Item'><div class='btn-overlap'>";
				rowsHTML+="<input type='text' placeholder='Item' required id='form268_item_"+id+"' form='form268_"+id+"'>";
				rowsHTML+="<button class='btn btn-icon-only default right-overlap' onclick=\"modal194_action('#form268_item_"+id+"');\"><i class='fa fa-search'></i></button></div>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Specification'>";
				rowsHTML+="<textarea form='form268_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' step='any' required form='form268_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form268_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form268_"+id+"' id='save_form268_"+id+"' >";
				rowsHTML+="<button type='button' class='btn red' form='form268_"+id+"' id='delete_form268_"+id+"' onclick='$(this).parent().parent().remove();form268_get_totals();' name='delete'><i class='fa fa-trash'></i></button>";
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

		var product_data={data_store:'product_master',return_column:'name'};
		set_my_value_list_json(product_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		$(name_filter).on('blur',function(event)
		{
			var unit_data={data_store:'attributes',count:1,return_column:'value',
                          indexes:[{index:'attribute',exact:'Unit'},
                                  {index:'name',exact:name_filter.value}]};
			read_json_single_column(unit_data,function(units)
			{
				if(units.length>0)
                {
                    quantity_filter.placeholder=units[0];
                    $(quantity_filter).floatlabel_right();
                }
			});

			var desc_data={data_store:'product_master',return_column:'description',
                          indexes:[{index:'name',exact:name_filter.value}]};
			set_my_value_json(desc_data,spec_filter);
		});
		form268_get_totals();
        $('#form268').formcontrol();
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
		var challan_type=master_form.elements['type'].value;

		var name=form.elements[0].value;
		var spec=form.elements[1].value;
		var quantity=form.elements[2].value;
		var data_id=form.elements[3].value;
		var save_button=form.elements[4];
		var del_button=form.elements[5];
		var last_updated=get_my_time();
		var unit=form.elements[2].placeholder;

        var data_json={data_store:'delivery_challan_items',
	 				data:[{index:'id',value:data_id},
	 					{index:'item_name',value:name},
	 					{index:'item_desc',value:spec},
	 					{index:'quantity',value:quantity},
            {index:'unit',value:unit},
            {index:'challan_id',value:challan_id},
	 					{index:'last_updated',value:last_updated}]};

        var inventory_json={data_store:'inventory_adjust',
	 				data:[{index:'id',value:data_id},
	 					{index:'product_name',value:name},
	 					{index:'batch',value:name},
	 					{index:'item_desc',value:spec},
	 					{index:'quantity',value:(-quantity)},
            {index:'source',value:'delivery challan'},
            {index:'source_id',value:challan_id},
	 					{index:'last_updated',value:last_updated}]};

        create_json(data_json);
				if(challan_type!='service' && challan_type!='repair')
				{
					create_json(inventory_json);
				}

		$(form).readonly();

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
		var prepared_by=form.elements['prepared'].value;
		var address=form.elements['address'].value;
		var data_id=form.elements['id'].value;
		var save_button=document.getElementById('form268_save');
    var share_button=document.getElementById('form268_share');
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
		$('#form268').formcontrol();

    var data_json={data_store:'delivery_challans',
	 				data:[{index:'id',value:data_id},
	 					{index:'challan_num',value:challan_num},
	 					{index:'customer',value:customer},
	 					{index:'challan_date',value:challan_date},
	 					{index:'awb_num',value:awb_num},
            {index:'vehicle_num',value:vehicle_num},
            {index:'type',value:type},
            {index:'prepared_by',value:prepared_by},
            {index:'address',value:address},
	 					{index:'last_updated',value:last_updated}],
          log:'yes',
          log_data:{title:'Saved',notes:'Delivery Challan # '+challan_num,link_to:'form269'}};

		create_json(data_json);

		var num_data={data_store:'user_preferences',return_column:'id',count:1,
                     indexes:[{index:'name',exact:'delivery_challan_num'}]};
		read_json_single_column(num_data,function (num_ids)
		{
			if(num_ids.length>0)
			{
				var challan_num_array=challan_num.split("-");
      	var num_json={data_store:'user_preferences',
	 				data:[{index:'id',value:num_ids[0]},
	 					{index:'value',value:(parseInt(challan_num_array[1])+1)},
	 					{index:'last_updated',value:last_updated}]};
				update_json(num_json);
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
		var prepared_by=form.elements['prepared'].value;
		var address=form.elements['address'].value;
		var data_id=form.elements['id'].value;
		var save_button=document.getElementById('form268_save');
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
		$('#form268').formcontrol();

		var data_json={data_store:'delivery_challans',
	 				data:[{index:'id',value:data_id},
	 					{index:'challan_num',value:challan_num},
	 					{index:'customer',value:customer},
	 					{index:'challan_date',value:challan_date},
	 					{index:'awb_num',value:awb_num},
            {index:'vehicle_num',value:vehicle_num},
            {index:'prepared_by',value:prepared_by},
            {index:'address',value:address},
	 					{index:'last_updated',value:last_updated}],
          log:'yes',
          log_data:{title:'Updated',notes:'Delivery Challan # '+challan_num,link_to:'form269'}};

		update_json(data_json);

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

      var data_json={data_store:'delivery_challan_items',
	 				data:[{index:'id',value:data_id}]};
      var inventory_json={data_store:'inventory_adjust',
	 				data:[{index:'id',value:data_id}]};

			delete_json(data_json);
			delete_json(inventory_json);

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
	$('#form268').formcontrol();
}

function form268_print_form()
{
	print_form268(function(container)
	{
		$.print(container);
		container.innerHTML="";
	});
}

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
	info_section.setAttribute('style','width:100%;min-height:100px');
		customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:48%;height:100px;border: 1px solid #00f;border-radius:5px;');
		business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:48%;height:100px;border: 1px solid #00f;border-radius:5px;');
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
	new_table.setAttribute('style','width:100%;font-size:13px;border:1px solid black;text-align:left;');
	new_table.setAttribute('class','plain_table');
	var table_header="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;width:10%;'>S.No.</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:30%;'>Item Name</td>"+
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
		var unit=form.elements[2].placeholder;
		table_rows+="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+counter+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+item_name+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+spec+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+quantity+" "+unit+"</td></tr>";
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
