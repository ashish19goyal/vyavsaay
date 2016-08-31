<div id='form268' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form268_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form268_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form268_print' onclick=form268_print_form();><i class='fa fa-print'></i> Print</a>
      	<a class='btn btn-default btn-sm' id='form268_share'><i class='fa fa-envelope'></i> Mail</a>
      </div>
  </div>

	<div class="portlet-body">
        <form id='form268_master' autocomplete="off">
            <fieldset>
                <label><div class='btn-overlap'><input type='text' required name='customer' placeholder='Customer' class='floatlabel'><button type='button' title='Add new customer' class='btn btn-icon-only default right-overlap' id='form268_add_customer'><i class='fa fa-plus'></i></button></div></label>
				<label><input type='text' name='bill_num' readonly='readonly' required class='floatlabel' placeholder='Invoice #'></label>
                <label><input type='text' required name='bill_type' class='floatlabel' placeholder='Type'></label>
                <label><input type='text' name='date' required class='floatlabel' placeholder='Date'></label>
				<label><input type='text' name='challan_num' class='floatlabel' placeholder='Manual Challan #'></label>
                <label><input type='text' name='vehicle_num' class='floatlabel' placeholder='Vehicle #'></label>
                <label><input type='text' name='prepared' class='floatlabel' placeholder='Prepared By'></label>
				<label><textarea name='narration' class='floatlabel' placeholder='Narration'></textarea></label>
                <input type='hidden' name='bill_id'>
				<input type='hidden' name='customer_info'>
				<input type='hidden' name='cst'>
				<input type='hidden' name='tin'>
				<input type='hidden' name='email'>
			    <input type='submit' class='submit_hidden'>
            </fieldset>
        </form>

        <br>

    	<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables sortable" width="100%">
			<thead>
				<tr style='color:#9a9a9a;'>
          			<th>S.No.</th>
					<th>Item</th>
					<th>Details</th>
          			<th>Quantity</th>
					<th>Amount</th>
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

	var customers_filter=fields.elements['customer'];
	var bill_type=fields.elements['bill_type'];
	var bill_date=fields.elements['date'];
	var narration=fields.elements['narration'];
	var bill_num=fields.elements['bill_num'];
	fields.elements['bill_id'].value=vUtil.newKey();
	var save_button=document.getElementById('form268_save');
	var cst_filter=fields.elements['cst'];
	var tin_filter=fields.elements['tin'];
	var customer_info=fields.elements['customer_info'];
	var challan_num=fields.elements['challan_num'];
	var vehicle_num=fields.elements['vehicle_num'];
	var prepared_filter=fields.elements['prepared'];
	var email_filter=fields.elements['email'];
	var share_button=document.getElementById('form268_share');

	$(share_button).off('click');

	vUtil.dropdownHover($(customers_filter),function(func)
	{
		var company_data={data_store:'attributes',count:1,return_column:'value',
						indexes:[{index:'name',exact:customers_filter.value},
								{index:'type',exact:'customer'},
								{index:'attribute',exact:'Company Name'}]};
		read_json_single_column(company_data,function(custs)
		{
			var cust_data={data_store:'customers',count:1,
							indexes:[{index:'acc_name',exact:customers_filter.value},{index:'name'},
									{index:'phone'},{index:'address'},{index:'email'}]};
			read_json_rows('',cust_data,function(customers)
			{
				var html="";
				if(customers.length>0)
				{
					html+= "<br><b>Name</b>: "+customers[0].name;
					html+= "<br><b>Phone</b>: "+customers[0].phone;
					html+= "<br><b>Email</b>: "+customers[0].email;
					html+= "<br><b>Address</b>: "+customers[0].address;
				}
				if(custs.length>0)
				{
					html+= "<br><b>Company Name</b>: "+custs[0];
				}
				func(html);
			});
		});
	});
	
	narration.value="";
	challan_num.value='';
	vehicle_num.value='';
	prepared_filter.value='';
	bill_type.removeAttribute('readonly');

	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form268_create_form();
	});

	$(document).off('keydown');
	$(document).on('keydown', function(event)
	{
		if( event.keyCode == 83 && event.ctrlKey)
		{
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		form268_add_item();
	});

	var customers_data={data_store:'customers',return_column:'acc_name'};
	set_my_value_list_json(customers_data,customers_filter,function ()
	{
		$(customers_filter).focus();
	});

	var add_customer=document.getElementById('form268_add_customer');
	$(add_customer).off('click');
	$(add_customer).on('click',function()
	{
		modal11_action(function()
		{
			set_my_value_list_json(customers_data,customers_filter);
		});
	});

	var type_data={data_store:'bill_types',return_column:'name'};
	set_my_value_list_json(type_data,bill_type);

	var bill_id=$("#form268_link").attr('data_id');
	if(vUtil.isBlank(bill_id))
	{
		var challan_num_data={data_store:'user_preferences',count:1,return_column:'value',
                             indexes:[{index:'name',exact:'delivery_challan_num'}]};
		read_json_single_column(challan_num_data,function(nums)
		{
			if(nums.length>0)
			{
				bill_num.value=get_session_var('challan_number_prefix')+"-"+nums[0];
			}
		});
	}

	$(customers_filter).off('blur');
	$(customers_filter).on('blur',function(e)
	{
		var address_data={data_store:'customers',
                         indexes:[{index:'address'},
                                 {index:'city'},
                                 {index:'email'},
                                 {index:'acc_name',exact:customers_filter.value}]};
		read_json_rows('',address_data,function(addresses)
		{
			if(addresses.length>0)
			{
				customer_info.value="Address\n"+addresses[0].address+", "+addresses[0].city;
				email_filter.value=addresses[0].email;
			}
			else
			{
				customer_info.value="";
				email_filter.value="";
			}
		});

		var tin_data={data_store:'attributes',return_column:'value',
                     indexes:[{index:'type',exact:'customer'},
                             {index:'attribute',exact:'TIN'},
                             {index:'name',exact:customers_filter.value}]};
		set_my_value_json(tin_data,tin_filter);
	});

	$(bill_date).datepicker();
	$(bill_date).val(vTime.date());
	customers_filter.value='';

	var body_elem=document.getElementById('form268_body');
	body_elem.addEventListener('table_sort',function(e)
	{
		form268_update_serial_numbers();
	},false);

	var paginator=$('#form268_body').paginator({visible:false});
  	$('#form268').formcontrol();
}

function form268_ini()
{
	var bill_id=$("#form268_link").attr('data_id');
	if(bill_id==null)
		bill_id="";

	$('#form268_body').html("");
	$('#form268_foot').html("");

	if(bill_id!="")
	{
		show_loader();
        var filter_fields=document.getElementById('form268_master');

		var bill_columns={data_store:'bills',
                         indexes:[{index:'id',exact:bill_id},
                                 {index:'bill_num'},
                                 {index:'customer_name'},
                                 {index:'total'},
                                 {index:'bill_date'},
                                 {index:'amount'},
                                 {index:'discount'},
                                 {index:'cartage'},
                                 {index:'tax'},
                                 {index:'tax_rate'},
                                 {index:'billing_type'},
                                 {index:'tax_type'},
                                 {index:'type',exact:'delivery challan'},
								 {index:'challan_num'},
								 {index:'prepared_by'},
								 {index:'vehicle_num'},
                                 {index:'storage'},
                                 {index:'notes'}]};

    	read_json_rows('form268',bill_columns,function(bill_results)
		{
			if(bill_results.length>0)
			{
				filter_fields.elements['customer'].value=bill_results[0].customer_name;
				filter_fields.elements['bill_type'].value=bill_results[0].billing_type;
				filter_fields.elements['date'].value=get_my_past_date(bill_results[0].bill_date);
				filter_fields.elements['narration'].value=bill_results[0].notes;
				filter_fields.elements['bill_num'].value=bill_results[0].bill_num;
				filter_fields.elements['bill_id'].value=bill_id;
				filter_fields.elements['challan_num'].value=bill_results[0].challan_num;
				filter_fields.elements['vehicle_num'].value=bill_results[0].vehicle_num;
				filter_fields.elements['prepared'].value=bill_results[0].prepared_by;
				var save_button=document.getElementById('form268_save');
				var customer_info=filter_fields.elements['customer_info'];
				filter_fields.elements['bill_type'].setAttribute('readonly','readonly');
				var cst_filter=filter_fields.elements['cst'];
				var tin_filter=filter_fields.elements['tin'];

				if(filter_fields.elements['bill_type'].value=='Retail' || filter_fields.elements['bill_type'].value=='Tax')
				{
					var tin_data={data_store:'attributes',return_column:'value',
                                 indexes:[{index:'type',exact:'customer'},
                                         {index:'attribute',exact:'TIN'},
                                         {index:'name',exact:bill_results[0].customer_name}]};
					set_my_value_json(tin_data,tin_filter);
				}

				var address_data={data_store:'customers',
                                 indexes:[{index:'address'},
                                         {index:'city'},
                                         {index:'acc_name',exact:bill_results[0].customer_name}]};
				read_json_rows('',address_data,function(addresses)
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
					form268_update_form();
				});

				var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Amount:<br>Tax(%):@ <input type='number' value='"+bill_results[0].tax_rate+"' step='any' id='form268_tax' class='dblclick_editable' style='width: 60%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>Cartage: <br>Total: </td>" +
							"<td>Rs. "+bill_results[0].amount+"</br>" +
							"Rs. "+bill_results[0].tax+" <br>" +
							"Rs. <input type='number' value='"+bill_results[0].cartage+"' step='any' id='form268_cartage' class='dblclick_editable' style='width: 80%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>" +
							"Rs. <vtotal>"+bill_results[0].total+"</vtotal></td>" +
							"<td></td>" +
							"</tr>";

				$('#form268_foot').html(total_row);
				$('#form268').formcontrol();
			}
        });

		var bill_items_column={data_store:"bill_items",
                      indexes:[{index:'id'},
							  {index:'s_no'},
							  {index:'item_name'},
                              {index:'item_desc'},
                              {index:'unit_price'},
                              {index:'quantity'},
                              {index:'unit'},
                              {index:'amount'},
                              {index:'total'},
                              {index:'discount'},
                              {index:'bill_id',exact:bill_id},
                              {index:'tax'},
                              {index:'from_date'},
                              {index:'to_date'}]};
		read_json_rows('form268',bill_items_column,function(results)
        {
			results.sort(function(a,b)
			{
				if(parseInt(a.s_no)>parseInt(b.s_no))
				{	return 1;}
				else
				{	return -1;}
			});

            results.forEach(function(result)
            {
                var id=result.id;
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form268_"+id+"'></form>";
                    rowsHTML+="<td data-th='S.No.' id='form268_sno_"+id+"'>";
						rowsHTML+=result.s_no;
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Item'>";
                        rowsHTML+="<a onclick=\"show_object('product_master','"+result.item_name+"');\"><textarea readonly='readonly' form='form268_"+id+"'>"+result.item_name+"</textarea></a>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Details'>";
                        rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form268_"+id+"'>"+result.item_desc+"</textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Quantity'>";
                        rowsHTML+="<input type='number' readonly='readonly' class='dblclick_editable' form='form268_"+id+"' value='"+result.quantity+"' step='any' placeholder='"+result.unit+"' class='floatlabel_right'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Amount'>";
						rowsHTML+="<input type='number' placeholder='Amount' class='floatlabel dblclick_editable' readonly='readonly' form='form268_"+id+"' value='"+result.amount+"'>";
				    	rowsHTML+="<input type='number' placeholder='Rate' class='floatlabel' readonly='readonly' form='form268_"+id+"' value='"+result.unit_price+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form268_"+id+"' value='"+id+"'>";
                        rowsHTML+="<input type='button' class='submit_hidden' name='save' form='form268_"+id+"' id='save_form268_"+id+"'>";
                        rowsHTML+="<button type='button' class='btn red' form='form268_"+id+"' id='delete_form268_"+id+"' onclick='form268_delete_item($(this)); form268_get_totals();' name='delete'><i class='fa fa-trash'></i></button>";
                    rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form268_body').append(rowsHTML);
				var fields=document.getElementById("form268_"+result.id);
				var quantity_filter=fields.elements[2];
				var amount_filter=fields.elements[3];
				var price_filter=fields.elements[4];
				var save_button=fields.elements['save'];

				$(amount_filter).add(quantity_filter).on('blur',function(event)
				{
					price_filter.value=vUtil.round((parseFloat(amount_filter.value)/parseFloat(quantity_filter.value)),2);
					$(price_filter).floatlabel();
				});

				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form268_update_item(fields);
				});
            });

            form268_update_serial_numbers();
            var bt=get_session_var('title');
            var share_button=document.getElementById('form268_share');
            $(share_button).show();
            $(share_button).click(function()
            {
                modal101_action('Delivery Challan from - '+bt,filter_fields.elements['customer'].value,'customer',function (func)
                {
                    print_form268(func);
                });
            });
			form268_get_totals();
            $('#form268').formcontrol();
            hide_loader();
        });
	}
}

function form268_add_item()
{
	var filter_fields=document.getElementById('form268_master');
	var bill_type=filter_fields.elements['bill_type'].value;
	var customer_name=filter_fields.elements['customer'].value;

	if(is_create_access('form268'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form268_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='S.No.' id='form268_sno_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'><div class='btn-overlap'>";
				rowsHTML+="<input type='text' placeholder='Item' required id='form268_item_"+id+"' form='form268_"+id+"'>";
				rowsHTML+="<button class='btn btn-icon-only default right-overlap' onclick=\"modal194_action('#form268_item_"+id+"');\"><i class='fa fa-search'></i></button></div>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<textarea form='form268_"+id+"' class='dblclick_editable' placeholder='Details'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' min='0' class='dblclick_editable' required placeholder='Quantity' form='form268_"+id+"' step='any'> <b id='form268_unit_"+id+"'></b>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="<input type='number' required placeholder='Amount' class='floatlabel dblclick_editable' form='form268_"+id+"' step='any'>";
				rowsHTML+="<input type='number' placeholder='Rate' class='floatlabel' required readonly='readonly' form='form268_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form268_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form268_"+id+"' id='save_form268_"+id+"' >";
				rowsHTML+="<button type='button' class='btn red' form='form268_"+id+"' id='delete_form268_"+id+"' onclick='$(this).parent().parent().remove();form268_update_serial_numbers(); form268_get_totals();' name='delete'><i class='fa fa-trash'></i></button>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form268_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form268_body').append(rowsHTML);

		var fields=document.getElementById("form268_"+id);
		var name_filter=fields.elements[0];
		var detail_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var amount_filter=fields.elements[3];
		var price_filter=fields.elements[4];
		var id_filter=fields.elements[5];
		var save_button=fields.elements[6];

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
			var desc_data={data_store:'product_master',return_column:'description',
                          indexes:[{index:'name',exact:name_filter.value}]};
			set_my_value_json(desc_data,detail_filter);

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
		});

		$(amount_filter).add(quantity_filter).on('blur',function(event)
		{
			price_filter.value=vUtil.round((parseFloat(amount_filter.value)/parseFloat(quantity_filter.value)),2);
			$(price_filter).floatlabel();
		});

		form268_update_serial_numbers();
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
		var bill_id=document.getElementById("form268_master").elements['bill_id'].value;
		var challan_type=document.getElementById("form268_master").elements['bill_type'].value;

		var name=form.elements[0].value;
		var details=form.elements[1].value;
		var quantity=form.elements[2].value;
		var amount=form.elements[3].value;
		var price=form.elements[4].value;
		var data_id=form.elements[5].value;
		var s_no=$('#form268_sno_'+data_id).html();
		var save_button=form.elements[6];
		var del_button=form.elements[7];

		var unit=form.elements[2].placeholder;
		var last_updated=get_my_time();

        var data_json={data_store:'bill_items',
	 				data:[{index:'id',value:data_id},
							{index:'s_no',value:s_no},
		 					{index:'item_name',value:name},
		 					{index:'item_desc',value:details},
                			{index:'batch',value:name},
	 						{index:'quantity',value:quantity},
			                {index:'unit',value:unit},
			                {index:'unit_price',value:price},
			                {index:'amount',value:amount},
			                {index:'bill_id',value:bill_id},
	 						{index:'last_updated',value:last_updated}]};

        create_json(data_json);

		var inventory_json={data_store:'inventory_adjust',
	 				data:[{index:'id',value:data_id},
	 					{index:'product_name',value:name},
	 					{index:'batch',value:name},
	 					{index:'item_desc',value:details},
	 					{index:'quantity',value:quantity},
			            {index:'source',value:'delivery challan'},
			            {index:'source_id',value:bill_id},
	 					{index:'last_updated',value:last_updated}]};

		if(challan_type=='service')
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
		$(save_button).on('click',function(e)
		{
			e.preventDefault();
			form268_update_item(form);
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form268_update_item(form)
{
	if(is_update_access('form268'))
	{
		var bill_id=document.getElementById("form268_master").elements['bill_id'].value;
		var challan_type=document.getElementById("form268_master").elements['bill_type'].value;

		var name=form.elements[0].value;
		var details=form.elements[1].value;
		var quantity=form.elements[2].value;
		var amount=form.elements[3].value;
		var price=form.elements[4].value;
		var data_id=form.elements[5].value;
		var s_no=$('#form268_sno_'+data_id).html();

		var unit=form.elements[2].placeholder;
		var last_updated=get_my_time();

        var data_json={data_store:'bill_items',
	 				data:[{index:'id',value:data_id},
							{index:'s_no',value:s_no},
		 					{index:'item_name',value:name},
		 					{index:'item_desc',value:details},
                			{index:'batch',value:name},
	 						{index:'quantity',value:quantity},
			                {index:'unit',value:unit},
			                {index:'unit_price',value:price},
			                {index:'amount',value:amount},
			                {index:'bill_id',value:bill_id},
	 						{index:'last_updated',value:last_updated}]};

        update_json(data_json);

		var inventory_json={data_store:'inventory_adjust',
	 				data:[{index:'id',value:data_id},
	 					{index:'product_name',value:name},
	 					{index:'batch',value:name},
	 					{index:'item_desc',value:details},
	 					{index:'quantity',value:quantity},
			            {index:'source',value:'delivery challan'},
			            {index:'source_id',value:bill_id},
	 					{index:'last_updated',value:last_updated}]};

		if(challan_type=='service')
		{
			update_json(inventory_json);
		}

		$(form).readonly();
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
		var bill_type=form.elements['bill_type'].value;
		var bill_date=get_raw_time(form.elements['date'].value);
		var narration=form.elements['narration'].value;
		var bill_num=form.elements['bill_num'].value;
		var challan_num=form.elements['challan_num'].value;
		var vehicle_num=form.elements['vehicle_num'].value;
		var prepared_by=form.elements['prepared'].value;
		var share_button=document.getElementById('form268_share');

		var bt=get_session_var('title');
		$(share_button).off('click');
		$(share_button).on('click',function()
		{
			modal101_action('Delivery Challan from :'+bt,customer,'customer',function (func)
			{
				print_form268(func);
			});
		});

		var amount=0;
		var tax_rate=0;
		var cartage=0;
		var total_quantity=0;

		if(document.getElementById('form268_cartage'))
		{
			tax_rate=parseFloat(document.getElementById('form268_tax').value);
			cartage=parseFloat(document.getElementById('form268_cartage').value);
		}

		$("[id^='save_form268']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			if(!isNaN(parseFloat(subform.elements[3].value)))
				amount+=parseFloat(subform.elements[3].value);
			if(!isNaN(parseFloat(subform.elements[2].value)))
				total_quantity+=parseFloat(subform.elements[2].value);
		});

		amount=vUtil.round(amount,2);
		var tax=vUtil.round((tax_rate*((amount)/100)),2);
		var total=vUtil.round(amount+tax+cartage);

		var data_id=form.elements['bill_id'].value;
		var save_button=document.getElementById('form268_save');
    	var last_updated=get_my_time();

    	var data_json={data_store:'bills',
	 				data:[{index:'id',value:data_id},
	 					{index:'bill_num',value:bill_num},
	 					{index:'customer_name',value:customer},
			            {index:'bill_date',value:bill_date},
			            {index:'amount',value:amount},
			            {index:'total',value:total},
			            {index:'tax',value:tax},
			            {index:'cartage',value:cartage},
			            {index:'billing_type',value:bill_type},
			            {index:'tax_rate',value:tax_rate},
			            {index:'transaction_id',value:data_id},
			            {index:'challan_num',value:challan_num},
						{index:'prepared_by',value:prepared_by},
						{index:'vehicle_num',value:vehicle_num},
						{index:'notes',value:narration},
			            {index:'type',value:'delivery challan'},
	 					{index:'last_updated',value:last_updated}],
		          log:'yes',
		          log_data:{title:'Saved',notes:'Delivery Challan # '+bill_num,link_to:'form269'}};

        var transaction_json={data_store:'transactions',
	 				data:[{index:'id',value:data_id},
						{index:'acc_name',value:customer},
						{index:'type',value:'given'},
						{index:'amount',value:total},
            			{index:'tax',value:tax},
						{index:'source_id',value:data_id},
						{index:'source_info',value:bill_num},
						{index:'source',value:'delivery challan'},
						{index:'source_link',value:'form269'},
						{index:'trans_date',value:bill_date},
						{index:'notes',value:narration},
	 					{index:'last_updated',value:last_updated}]};

		var num_data={data_store:'user_preferences',return_column:'id',count:1,
                     indexes:[{index:'name',exact:'delivery_challan_num'}]};
		read_json_single_column(num_data,function (num_ids)
		{
			if(num_ids.length>0)
			{
				var challan_num_array=bill_num.split("-");
      			var num_json={data_store:'user_preferences',
	 				data:[{index:'id',value:num_ids[0]},
	 					{index:'value',value:(parseInt(challan_num_array[1])+1)},
	 					{index:'last_updated',value:last_updated}]};
				update_json(num_json);
			}
		},num_data);

		create_json(data_json);
		create_json(transaction_json);

		var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
					"<td>Amount:<br>Tax(%):@ <input type='number' value='"+tax_rate+"' step='any' readonly='readonly' id='form268_tax' class='dblclick_editable' style='width: 60%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>Cartage: <br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. "+tax+"<br>" +
					"Rs. <input type='number' value='"+cartage+"' step='any' id='form268_cartage' readonly='readonly' class='dblclick_editable' style='width: 80%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'></br>" +
					"Rs. <vtotal>"+total+"</vtotal></td>" +
					"<td></td>" +
					"</tr>";

		$('#form268_foot').html(total_row);
		$('#form268').formcontrol();

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
		var bill_type=form.elements['bill_type'].value;
		var bill_date=get_raw_time(form.elements['date'].value);
		var narration=form.elements['narration'].value;
		var bill_num=form.elements['bill_num'].value;
		var challan_num=form.elements['challan_num'].value;
		var vehicle_num=form.elements['vehicle_num'].value;
		var prepared_by=form.elements['prepared'].value;
		var share_button=document.getElementById('form268_share');

		var bt=get_session_var('title');
		$(share_button).off('click');
		$(share_button).on('click',function()
		{
			modal101_action('Delivery Challan from :'+bt,customer,'customer',function (func)
			{
				print_form268(func);
			});
		});

		var amount=0;
		var tax_rate=0;
		var cartage=0;
		var total_quantity=0;

		if(document.getElementById('form268_cartage'))
		{
			tax_rate=parseFloat(document.getElementById('form268_tax').value);
			cartage=parseFloat(document.getElementById('form268_cartage').value);
		}

		$("[id^='save_form268']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			if(!isNaN(parseFloat(subform.elements[3].value)))
				amount+=parseFloat(subform.elements[3].value);
			if(!isNaN(parseFloat(subform.elements[2].value)))
				total_quantity+=parseFloat(subform.elements[2].value);
		});

		amount=vUtil.round(amount,2);
		var tax=vUtil.round((tax_rate*((amount)/100)),2);
		var total=vUtil.round(amount+tax+cartage);

		var data_id=form.elements['bill_id'].value;
		var save_button=document.getElementById('form268_save');
    	var last_updated=get_my_time();

    	var data_json={data_store:'bills',
	 				data:[{index:'id',value:data_id},
	 					{index:'bill_num',value:bill_num},
	 					{index:'customer_name',value:customer},
			            {index:'bill_date',value:bill_date},
			            {index:'amount',value:amount},
			            {index:'total',value:total},
			            {index:'tax',value:tax},
			            {index:'cartage',value:cartage},
			            {index:'billing_type',value:bill_type},
			            {index:'tax_rate',value:tax_rate},
			            {index:'transaction_id',value:data_id},
			            {index:'challan_num',value:challan_num},
						{index:'prepared_by',value:prepared_by},
						{index:'vehicle_num',value:vehicle_num},
						{index:'notes',value:narration},
			            {index:'type',value:'delivery challan'},
	 					{index:'last_updated',value:last_updated}],
		          log:'yes',
		          log_data:{title:'Saved',notes:'Delivery Challan # '+bill_num,link_to:'form269'}};

        var transaction_json={data_store:'transactions',
	 				data:[{index:'id',value:data_id},
						{index:'acc_name',value:customer},
						{index:'type',value:'given'},
						{index:'amount',value:total},
            			{index:'tax',value:tax},
						{index:'source_id',value:data_id},
						{index:'source_info',value:bill_num},
						{index:'source',value:'delivery challan'},
						{index:'source_link',value:'form269'},
						{index:'trans_date',value:bill_date},
						{index:'notes',value:narration},
	 					{index:'last_updated',value:last_updated}]};

		update_json(data_json);
		update_json(transaction_json);

		var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
					"<td>Amount:<br>Tax(%):@ <input type='number' readonly='readonly' value='"+tax_rate+"' step='any' id='form268_tax' class='dblclick_editable' style='width: 60%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>Cartage: <br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. "+tax+" <br>" +
					"Rs. <input type='number' value='"+cartage+"' readonly='readonly' step='any' id='form268_cartage' class='dblclick_editable' style='width: 80%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'></br>" +
					"Rs. <vtotal>"+total+"</vtotal></td>" +
					"<td></td>" +
					"</tr>";

		$('#form268_foot').html(total_row);

    	$('#form268').formcontrol();
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
			var data_id=form.elements[5].value;

      		var data_json={data_store:'bill_items',
	 				data:[{index:'id',value:data_id}]};
			delete_json(data_json);

			var inventory_json={data_store:'inventory_adjust',
	  	 				data:[{index:'id',value:data_id}]};
			delete_json(inventory_json);

			$(button).parent().parent().remove();
			form268_update_serial_numbers();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form268_update_serial_numbers()
{
	$('#form268_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});
}

function form268_get_totals()
{
	var form=document.getElementById("form268_master");

	var bill_type=form.elements['bill_type'].value;

	var amount=0;
	var cartage=0;
	var tax_rate=0;
	var total_quantity=0;

	if(document.getElementById('form268_cartage'))
	{
		tax_rate=parseFloat(document.getElementById('form268_tax').value);
		cartage=parseFloat(document.getElementById('form268_cartage').value);
	}

	$("[id^='save_form268']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		if(!isNaN(parseFloat(subform.elements[3].value)))
				amount+=parseFloat(subform.elements[3].value);
		if(!isNaN(parseFloat(subform.elements[2].value)))
				total_quantity+=parseFloat(subform.elements[2].value);
	});

	amount=vUtil.round(amount,2);
	var tax=vUtil.round((tax_rate*((amount)/100)),2);
	var total=vUtil.round(amount+tax+cartage,0);

	var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
				"<td>Amount:<br>Tax(%):@ <input type='number' value='"+tax_rate+"' step='any' id='form268_tax' class='dblclick_editable' style='width: 60%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'><br>Cartage: <br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+tax+" <br>" +
				"Rs. <input type='number' value='"+cartage+"' step='any' id='form268_cartage' class='dblclick_editable' style='width: 80%;float: right;height: 20px;margin: 0px;padding: 0px 5px;'></br>" +
				"Rs. <vtotal>"+total+"</vtotal></td>" +
				"<td></td>" +
				"</tr>";
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

	header.setAttribute('style','width:100%;text-align:center');
		logo.setAttribute('style','width:100%;text-align:center;');

	info_section.setAttribute('style','width:100%;height:100px;font-size:11px;');
		customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:48%;height:100px;border: 1px solid #000;border-radius:5px;');
		business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:48%;height:100px;border: 1px solid #000;border-radius:5px;');

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
	var address=master_form.elements['customer_info'].value;
	var date=master_form.elements['date'].value;
	var bill_no=master_form.elements['bill_num'].value;
	var invoice_type=master_form.elements['bill_type'].value;
	var narration=master_form.elements['narration'].value;
	var prepared_by=master_form.elements['prepared'].value;
	var cin=get_session_var('cin');
	var pan=get_session_var('pan');
	var customer_email=master_form.elements['email'].value;
	var customer_tin=master_form.elements['tin'].value;
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";

	invoice_line.innerHTML="<hr style='border: 1px solid #000;'><div style='text-align:center;'><b style='text-size:1.2em'>Delivery Challan</b></div><hr style='border: 1px solid #000;'>";

	customer_info.innerHTML="<b>Customer: </b><br>"+customer_name+"<br>"+address+"<br>Email: "+customer_email+"<br>TIN: "+customer_tin;
	business_info.innerHTML="<b>Seller</b><br>Challan #: "+bill_no+"<br>Prepared By: "+prepared_by+"<br>Date: "+date+"<br>Remarks: "+narration;

	jurisdiction.innerHTML="All disputes subjected to Delhi jurisdiction.<br>This is a computer generated challan.";
	signature.innerHTML="<div style='float:left;text-align:left;width:50%;'>Customer's Seal & Sign.<br><br><br></div><div style='float:right;width:50%;text-align:right;'>For "+bt+"<br><br>Auth. Signatory<br></div>";
	business_contact.innerHTML="<hr style='border: 1px solid #000;margin:5px;'>Address: "+business_address+"<br>Phone: "+business_phone+", E-Mail: "+business_email+"<br>CIN: "+cin+", PAN: "+pan+"<hr style='border: 1px solid #000;margin:5px;'>";

	var table_element=document.getElementById(form_id+'_body');

	/////////////adding new table //////////////////////////////////////////////////////
	var new_table=document.createElement('table');
	new_table.setAttribute('style','width:100%;font-size:12px;border:1px solid black;text-align:left;');
	new_table.setAttribute('class','plain_table');
	var table_header="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;width:8%;'>S.No.</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:25%;'>Item Name</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:25%'>Details</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:15%'>Quantity</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:13%'>Rate</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:13%'>Amount</td></tr>";

	var table_rows=table_header;
	var counter=0;

	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		var item_name=form.elements[0].value;
		var details=form.elements[1].value;
		var quantity=""+form.elements[2].value;
		var rate=form.elements[4].value;
		var amount=form.elements[3].value;
		var unit=form.elements[2].placeholder;

		table_rows+="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+counter+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+item_name+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+details+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+quantity+" "+unit+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+rate+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+amount+"</td></tr>";
	});

	var row_count=$(table_element).find('tbody>tr').length;
	var rows_to_add=10-row_count;
	for(var i=0;i<rows_to_add;i++)
	{
		table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	}

	var table_foot=document.getElementById(form_id+'_foot');
	var total_quantity=$(table_foot).find('tr>td:first')[0].innerHTML;

	var total_quantity_element=$(table_foot).find('tr>td:first-child');
	var total_text_element=$(table_foot).find('tr>td:nth-child(2)');
	var total_amount_element=$(table_foot).find('tr>td:nth-child(3)');

	var total_amount_number=$(total_amount_element).find('vtotal').html();
	var wording_total=number2text(total_amount_number);

	$(total_amount_element).add(total_text_element).find("input").each(function(index)
	{
		$(this).replaceWith($(this).val());
	});

	var total_quantity=$(total_quantity_element)[0].innerHTML;
	var total_text=$(total_text_element)[0].innerHTML;
	var total_amount=$(total_amount_element)[0].innerHTML;

	var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
				"<td colspan='2' style='border: 1px solid #000;text-align:left;'>"+total_quantity+"<br>Total (in words): "+wording_total+"</td>"+
				"<td colspan='2' style='border: 1px solid #000;text-align:left;'>"+total_text+"</td>"+
				"<td colspan='2' style='border: 1px solid #000;text-align:left;font-size:1.2em;font-weight:bold;'>"+total_amount+"</td></tr>";

	table_rows+=table_foot_row;
	new_table.innerHTML=table_rows;

	/////////////placing the containers //////////////////////////////////////////////////////

	container.appendChild(header);
	container.appendChild(invoice_line);
	container.appendChild(info_section);

	container.appendChild(new_table);
	container.appendChild(footer);

	header.appendChild(logo);
	header.appendChild(business_contact);

	info_section.appendChild(customer_info);
	info_section.appendChild(business_info);

	footer.appendChild(jurisdiction);
	footer.appendChild(signature);
	footer.appendChild(business_contact);

	func(container);
}
    </script>
</div>
