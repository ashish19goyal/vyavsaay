<div id='form258' class='function_detail'>
	<form id='form258_master' autocomplete="off">
		<fieldset>
			<label>Customer<br><input type='text' required name='customer'></label>
			<label>Quotation #<br><input type='text' readonly="readonly" required name='quot_num'></label>
			<label>Type<br><input type='text' name='type'></label>
			<br><label>Date<br><input type='text' name='date'></label>
			<label>Valid Upto<br><input type='text' name='valid'></label>
			<label>Issued By<br><input type='text' name='issued'></label>
			<br>
			<label>Status<br><input type='text' name='status'></label>
			<label>Computer Generated<br><input type='checkbox' name='computer_generated'></label>
			<label>
				<input type='hidden' name='id'>
				<input type='hidden' name='address'>	
				<input type='hidden' name='email'>	
			</label>
			<label>	<input type='button' title='Save' class='save_icon' name='save'></label>
			<label>	<input type='button' title='Print' class='print_icon' onclick='form258_print_form();'></label>
			<label>	<input type='button' title='Email' class='share_icon' name='share'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>

	<br>
	<b>Items</b>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form258_item_header'></form>
					<th style='width:50px;'>S.No.</th>
					<th>Item</th>
					<th>Details</th>
					<th>Quantity </th>
					<th>Rate </th>
					<th>Amount </th>
					<th><input type='button' class='add_icon' form='form258_item_header' title='Add Item' onclick='form258_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form258_item_body'>
		</tbody>
		<tfoot id='form258_item_foot'>
		</tfoot>
	</table>
	
	<br>
	<b>Spare Parts</b>	
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form258_spare_header'></form>
					<th style='width:50px;'>S.No.</th>
					<th>Part Name</th>
					<th>Description</th>
					<th>Quantity</th>
					<th><input type='button' class='add_icon' form='form258_spare_header' title='Add' onclick='form258_add_spare();'></th>
			</tr>
		</thead>
		<tbody id='form258_spare_body'>
		</tbody>
	</table>

	<br>
	<b>Detailed Specifications <input type='checkbox' id='checkbox_form258_spec'></b>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form258_spec_header'></form>
					<th style='width:50px;'>S.No.</th>
					<th>Type</th>
					<th>Specification</th>
					<th><input type='button' class='add_icon' form='form258_spec_header' title='Add Specification' onclick='form258_add_spec();'></th>			
			</tr>
		</thead>
		<tbody id='form258_spec_body'>
		</tbody>
	</table>

	<br>
	<b>Bank Accounts</b>	
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form258_bank_header'></form>
					<th style='width:50px;'>S.No.</th>
					<th>Name</th>
					<th>Bank</th>
					<th>Account</th>
					<th><input type='button' class='add_icon' form='form258_bank_header' title='Add' onclick='form258_add_bank();'></th>
			</tr>
		</thead>
		<tbody id='form258_bank_body'>
		</tbody>
	</table>

	<br>
	<b>Terms & Conditions</b>	
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form258_tc_header'></form>
					<th style='width:50px;'>S.No.</th>
					<th>Type</th>
					<th>T & C</th>
					<th><input type='button' class='add_icon' form='form258_tc_header' title='Add' onclick='form258_add_tc();'></th>
			</tr>
		</thead>
		<tbody id='form258_tc_body'>
		</tbody>
	</table>

    <script>
        function form258_header_ini()
        {
            var fields=document.getElementById('form258_master');

            var customer_filter=fields.elements['customer'];
            var type_filter=fields.elements['type'];
            var quot_num=fields.elements['quot_num'];
            var date_filter=fields.elements['date'];
            var valid_filter=fields.elements['valid'];
            //var tax_filter=fields.elements['tax'];
            var status_filter=fields.elements['status'];
            var issued_filter=fields.elements['issued'];
            var address_filter=fields.elements['address'];
            var email_filter=fields.elements['email'];
            var id_filter=fields.elements['id'];
            var save_button=fields.elements['save'];
            var share_button=fields.elements['share'];

            $(share_button).off('click');

            id_filter.value=get_new_key();
            customer_filter.value='';
            quot_num.value="";
            //tax_filter.value='';
            status_filter.value='draft';
            type_filter.value='';
            issued_filter.value='';
            address_filter.value='';

            $(date_filter).datepicker();
            $(valid_filter).datepicker();
            date_filter.value=get_my_date();
            valid_filter.value="";

            set_static_value_list('quotation','type',type_filter);
            set_static_value_list('quotation','status',status_filter);

            var staff_data="<staff>"+
                            "<acc_name></acc_name>"+
                            "</staff>";
            set_my_value_list(staff_data,issued_filter);

            $(customer_filter).off('blur');
            $(customer_filter).on('blur',function () 
            {
                var address_data="<customers>"+
                                "<address></address>"+
                                "<city></city>"+
                                "<pincode></pincode>"+
                                "<email></email>"+
                                "<acc_name exact='yes'>"+customer_filter.value+"</acc_name>"+
                                "</customers>";
                fetch_requested_data('',address_data,function (addresses) 
                {
                    if(addresses.length>0)
                    {
                        address_filter.value=addresses[0].address+", "+addresses[0].city+", "+addresses[0].pincode;
                        email_filter.value=addresses[0].email;
                    }
                    else 
                    {
                        address_filter.value="";
                        email_filter.value="";
                    }
                });				
            });

            var quot_id=$("#form258_link").attr('data_id');
            if(quot_id==null || quot_id=="")
            {		
                var quot_num_data="<user_preferences count='1'>"+
                        "<value></value>"+
                        "<name exact='yes'>quotation_num</name>"+
                        "</user_preferences>";
                set_my_value(quot_num_data,quot_num,function()
                {
                    quot_num.value=get_session_var('quot_num_prefix')+"-"+quot_num.value;
                });
            }

            $(save_button).off('click');
            $(save_button).on("click", function(event)
            {
                event.preventDefault();
                form258_create_form();
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
                form258_add_item();
            });

            var customers_data="<customers>" +
                "<acc_name></acc_name>" +
                "</customers>";

            set_my_value_list(customers_data,customer_filter,function () 
            {
                $(customer_filter).focus();
            });

            var add_customer=document.getElementById('form258_add_customer');
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

            //////////terms and conditions///////////
            var payment_tc=get_session_var('payment_tc');
            var delivery_tc=get_session_var('delivery_tc');
            var warranty_tc=get_session_var('warranty_tc');

            var tc_array=[];
            var p_tc_array=payment_tc.split("\n");
            var d_tc_array=delivery_tc.split("\n");
            var w_tc_array=warranty_tc.split("\n");

            p_tc_array.forEach(function (p_tc) 
            {
                var p_obj=new Object();
                p_obj.type='Payment';
                p_obj.tc=p_tc;
                tc_array.push(p_obj);
            });

            d_tc_array.forEach(function (d_tc) 
            {
                var p_obj=new Object();
                p_obj.type='Delivery';
                p_obj.tc=d_tc;
                tc_array.push(p_obj);
            });

            w_tc_array.forEach(function (w_tc) 
            {
                var p_obj=new Object();
                p_obj.type='Warranty';
                p_obj.tc=w_tc;
                tc_array.push(p_obj);
            });

            var tc_counter=0;
            var tc_id=get_new_key();
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
                        rowsHTML+="<input type='button' class='delete_icon' form='form258_tc_"+id+"' id='delete_form258_tc_"+id+"' onclick='$(this).parent().parent().remove(); form258_get_totals();'>";
                    rowsHTML+="</td>";
                rowsHTML+="</tr>";
            });

            $('#form258_tc_body').html(rowsHTML);

            ////////////show hide specifications////////////////////////////////
            var spec_checkbox=document.getElementById('checkbox_form258_spec');
            $(spec_checkbox).off('click');
            $(spec_checkbox).on('click',function () 
            {
                if(spec_checkbox.checked)
                {
                    var name_string="--";

                    $("[id^='save_form258_item_']").each(function(index)
                    {
                        var subform_id=$(this).attr('form');
                        var subform=document.getElementById(subform_id);

                        name_string+=subform.elements[0].value+"--";
                    });

                    var attributes_data="<attributes>"+
                                        "<id></id>"+
                                        "<value></value>"+
                                        "<name array='yes'>"+name_string+"</name>"+
                                        "<attribute exact='yes'>Specification</attribute>"+
                                        "</attributes>";
                    fetch_requested_data('',attributes_data,function (attributes) 
                    {
                        attributes.forEach(function (attribute) 
                        {
                            var spec_split=attribute.value.split(":");
                            var id=attribute.id;
                            var	spec_rowsHTML="<tr>";
                                spec_rowsHTML+="<form id='form258_spec_"+id+"' autocomplete='off'></form>";
                                    spec_rowsHTML+="<td data-th='S.No.'>";
                                    spec_rowsHTML+="</td>";
                                    //spec_rowsHTML+="<td data-th='Item'>";
                                    //	spec_rowsHTML+="<input type='text' readonly='readonly' form='form258_spec_"+id+"' value='"+attribute.name+"'>";
                                    //spec_rowsHTML+="</td>";
                                    spec_rowsHTML+="<td data-th='Type'>";
                                        spec_rowsHTML+="<input type='text' readonly='readonly' form='form258_spec_"+id+"' value='"+spec_split[0]+"'>";
                                    spec_rowsHTML+="</td>";
                                    spec_rowsHTML+="<td data-th='Specification'>";
                                        spec_rowsHTML+="<textarea form='form258_spec_"+id+"' readonly='readonly'>"+spec_split[1]+"</textarea>";
                                    spec_rowsHTML+="</td>";
                                    spec_rowsHTML+="<td data-th='Action'>";
                                        spec_rowsHTML+="<input type='hidden' form='form258_spec_"+id+"' value='"+id+"'>";
                                        spec_rowsHTML+="<input type='button' class='submit_hidden' form='form258_spec_"+id+"' id='save_form258_spec_"+id+"' >";
                                        spec_rowsHTML+="<input type='button' class='delete_icon' form='form258_spec_"+id+"' id='delete_form258_spec_"+id+"' onclick='$(this).parent().parent().remove();form258_get_totals();'>";
                                    spec_rowsHTML+="</td>";
                                spec_rowsHTML+="</tr>";
                            $('#form258_spec_body').append(spec_rowsHTML);
                        });
                        form258_get_totals();
                    });					
                }
                else 
                {
                    $('#form258_spec_body').html('');
                }
            });
        }

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
                            },'pdf');
                        });
                    }

                    hide_loader();			
                });
            }
        }

        function form258_add_item()
        {
            if(is_create_access('form258'))
            {
                var id=get_new_key();
                var	item_rowsHTML="<tr>";
                    item_rowsHTML+="<form id='form258_item_"+id+"' autocomplete='off'></form>";
                        item_rowsHTML+="<td data-th='S.No.'>";
                        item_rowsHTML+="</td>";
                        item_rowsHTML+="<td data-th='Item'>";
                            item_rowsHTML+="<input type='text' form='form258_item_"+id+"'>";
                        item_rowsHTML+="</td>";
                        item_rowsHTML+="<td data-th='Details'>";
                            item_rowsHTML+="<textarea form='form258_item_"+id+"'></textarea>";
                        item_rowsHTML+="</td>";
                        item_rowsHTML+="<td data-th='Quantity'>";
                            item_rowsHTML+="<input type='number' form='form258_item_"+id+"' step='any'>";
                        item_rowsHTML+="</td>";
                        item_rowsHTML+="<td data-th='Rate'>";
                            item_rowsHTML+="<input type='number' form='form258_item_"+id+"' step='any'>";
                        item_rowsHTML+="</td>";
                        item_rowsHTML+="<td data-th='Amount'>";
                            item_rowsHTML+="<input type='number' readonly='readonly' form='form258_item_"+id+"' step='any'>";
                        //	item_rowsHTML+="<br><b>Tax</b>:<input type='number' form='form258_item_"+id+"' step='any'>";
                        //	item_rowsHTML+="<br><b>Total</b>:<input type='number' readonly='readonly' form='form258_item_"+id+"' step='any'>";
                        item_rowsHTML+="</td>";
                        item_rowsHTML+="<td data-th='Action'>";
                            item_rowsHTML+="<input type='hidden' form='form258_item_"+id+"' value='"+id+"'>";
                            item_rowsHTML+="<input type='button' class='submit_hidden' form='form258_item_"+id+"' id='save_form258_item_"+id+"' >";
                            item_rowsHTML+="<input type='button' class='delete_icon' form='form258_item_"+id+"' id='delete_form258_item_"+id+"' onclick='$(this).parent().parent().remove(); form258_get_totals();'>";
                            item_rowsHTML+="<input type='hidden' form='form258_item_"+id+"' name='tax_unit'>";
                        item_rowsHTML+="</td>";
                    item_rowsHTML+="</tr>";
                $('#form258_item_body').append(item_rowsHTML);

                var fields=document.getElementById("form258_item_"+id);
                var name_filter=fields.elements[0];
                var detail_filter=fields.elements[1];
                var quantity_filter=fields.elements[2];
                var price_filter=fields.elements[3];
                var amount_filter=fields.elements[4];
                //var tax_filter=fields.elements[5];
                //var total_filter=fields.elements[6];
                var id_filter=fields.elements[5];
                var tax_unit_filter=fields.elements['tax_unit'];

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form258_add_item();
                });

                var product_data="<attributes>" +
                        "<name></name>" +
                        "<value exact='yes'>no</value>"+
                        "<attribute exact='yes'>Spare Part</attribute>"+
                        "</attributes>";
                set_my_value_list_func(product_data,name_filter,function () 
                {
                    $(name_filter).focus();
                });

        /*
                $(name_filter).on('blur',function(event)
                {
                    var tax_data="<product_master>"+
                                "<tax></tax>"+
                                "<name exact='yes'>"+name_filter.value+"</name>"+
                                "</product_master>";
                    set_my_value(tax_data,tax_unit_filter);			
                });		
        */
                $(quantity_filter).add(price_filter).on('change blur',function(event)
                {
                    amount_filter.value=my_round((parseFloat(price_filter.value)*parseFloat(quantity_filter.value)),2);
                    //tax_filter.value=my_round((parseFloat(tax_unit_filter.value)*parseFloat(amount_filter.value)),2);
                    //$(amount_filter).trigger('change');
                });
        /*
                $(amount_filter).add(tax_filter).on('change blur',function(event)
                {
                    total_filter.value=my_round((parseFloat(amount_filter.value)+parseFloat(tax_filter.value)),0);
                });
        */
                form258_get_totals();
                $('textarea').autosize();
            }
            else
            {
                $("#modal2_link").click();
            }
        }


        /**
         * @form Prepare Quotation
         * @formNo 258
         */
        function form258_add_spare()
        {
            if(is_create_access('form258'))
            {
                var id=get_new_key();
                var	spare_rowsHTML="<tr>";
                    spare_rowsHTML+="<form id='form258_spare_"+id+"' autocomplete='off'></form>";
                        spare_rowsHTML+="<td data-th='S.No.'>";
                        spare_rowsHTML+="</td>";
                        spare_rowsHTML+="<td data-th='Part Name'>";
                            spare_rowsHTML+="<input type='text' form='form258_spare_"+id+"'>";
                        spare_rowsHTML+="</td>";
                        spare_rowsHTML+="<td data-th='Description'>";
                            spare_rowsHTML+="<textarea form='form258_spare_"+id+"' ></textarea>";
                        spare_rowsHTML+="</td>";
                        spare_rowsHTML+="<td data-th='Quantity'>";
                            spare_rowsHTML+="<input type='number' form='form258_spare_"+id+"' step='any'><vy id='form258_spare_unit_"+id+"'></vy>";
                        spare_rowsHTML+="</td>";
                        spare_rowsHTML+="<td data-th='Action'>";
                            spare_rowsHTML+="<input type='hidden' form='form258_spare_"+id+"' value='"+id+"'>";
                            spare_rowsHTML+="<input type='button' class='submit_hidden' form='form258_spare_"+id+"' id='save_form258_spare_"+id+"' >";
                            spare_rowsHTML+="<input type='button' class='delete_icon' form='form258_spare_"+id+"' id='delete_form258_spare_"+id+"' onclick='$(this).parent().parent().remove();form258_get_totals();'>";
                        spare_rowsHTML+="</td>";
                    spare_rowsHTML+="</tr>";
                $('#form258_spare_body').append(spare_rowsHTML);

                var fields=document.getElementById("form258_spare_"+id);
                var name_filter=fields.elements[0];
                var desc_filter=fields.elements[1];
                var quantity_filter=fields.elements[2];
                var id_filter=fields.elements[3];

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form258_add_spare();
                });

                var product_data="<attributes>" +
                        "<name></name>" +
                        "<value exact='yes'>yes</value>"+
                        "<attribute exact='yes'>Spare Part</attribute>"+
                        "</attributes>";
                set_my_value_list_func(product_data,name_filter,function () 
                {
                    $(name_filter).focus();
                });

                $(name_filter).on('blur',function(event)
                {
                    var desc_data="<product_master>"+
                                "<description></description>"+
                                "<name exact='yes'>"+name_filter.value+"</name>"+
                                "</product_master>";
                    set_my_value(desc_data,desc_filter);

                    var unit_data="<attributes count='1'>"+
                                "<value></value>"+
                                "<attribute exact='yes'>Unit</attribute>"+
                                "<type exact='yes'>product</type>"+
                                "<name exact='yes'>"+name_filter.value+"</name>"+
                                "</attributes>";
                    get_single_column_data(function(units)
                    {
                        if(units.length>0)
                        {
                            document.getElementById('form258_spare_unit_'+id).innerHTML=units[0];
                        }
                    },unit_data);			
                });		

                form258_get_totals();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        /**
         * @form Prepare Quotation
         * @formNo 258
         */
        function form258_add_spec()
        {
            if(is_create_access('form258'))
            {
                var id=get_new_key();
                var	spec_rowsHTML="<tr>";
                    spec_rowsHTML+="<form id='form258_spec_"+id+"' autocomplete='off'></form>";
                        spec_rowsHTML+="<td data-th='S.No.'>";
                        spec_rowsHTML+="</td>";
                        //spec_rowsHTML+="<td data-th='Item'>";
                        //	spec_rowsHTML+="<input type='text' form='form258_spec_"+id+"'>";
                        //spec_rowsHTML+="</td>";
                        spec_rowsHTML+="<td data-th='Type'>";
                            spec_rowsHTML+="<input type='text' form='form258_spec_"+id+"'>";
                        spec_rowsHTML+="</td>";
                        spec_rowsHTML+="<td data-th='Specification'>";
                            spec_rowsHTML+="<textarea form='form258_spec_"+id+"'></textarea>";
                        spec_rowsHTML+="</td>";
                        spec_rowsHTML+="<td data-th='Action'>";
                            spec_rowsHTML+="<input type='hidden' form='form258_spec_"+id+"' value='"+id+"'>";
                            spec_rowsHTML+="<input type='button' class='submit_hidden' form='form258_spec_"+id+"' id='save_form258_spec_"+id+"' >";
                            spec_rowsHTML+="<input type='button' class='delete_icon' form='form258_spec_"+id+"' id='delete_form258_spec_"+id+"' onclick='$(this).parent().parent().remove();form258_get_totals();'>";
                        spec_rowsHTML+="</td>";
                    spec_rowsHTML+="</tr>";
                $('#form258_spec_body').append(spec_rowsHTML);

                var fields=document.getElementById("form258_spec_"+id);
                var type_filter=fields.elements[0];
                $(type_filter).focus();

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form258_add_spec();
                });

                /*
                var name_filter=fields.elements[0];
                var product_data="<product_master>" +
                        "<name></name>" +
                        "</product_master>";
                set_my_value_list_func(product_data,name_filter,function () 
                {
                    $(name_filter).focus();
                });
                */

                form258_get_totals();
            }
            else
            {
                $("#modal2_link").click();
            }
        }


        /**
         * @form Prepare Quotation
         * @formNo 258
         */
        function form258_add_bank()
        {
            if(is_create_access('form258'))
            {
                var id=get_new_key();
                var	bank_rowsHTML="<tr>";
                    bank_rowsHTML+="<form id='form258_bank_"+id+"' autocomplete='off'></form>";
                        bank_rowsHTML+="<td data-th='S.No.'>";
                        bank_rowsHTML+="</td>";
                        bank_rowsHTML+="<td data-th='Name'>";
                            bank_rowsHTML+="<input type='text' form='form258_bank_"+id+"'>";
                        bank_rowsHTML+="</td>";
                        bank_rowsHTML+="<td data-th='Bank'>";
                            bank_rowsHTML+="<b>Bank</b>:<input type='text' readonly='readonly' form='form258_bank_"+id+"'>";
                            bank_rowsHTML+="<br><b>IFSC</b>:<input type='text' readonly='readonly' form='form258_bank_"+id+"'>";
                        bank_rowsHTML+="</td>";
                        bank_rowsHTML+="<td data-th='Account'>";
                            bank_rowsHTML+="<b>Account Name</b>:<input type='text' readonly='readonly' form='form258_bank_"+id+"'>";
                            bank_rowsHTML+="<br><b>Account #</b>:<input type='text' readonly='readonly' form='form258_bank_"+id+"'>";
                        bank_rowsHTML+="</td>";
                        bank_rowsHTML+="<td data-th='Action'>";
                            bank_rowsHTML+="<input type='hidden' form='form258_bank_"+id+"' value='"+id+"'>";
                            bank_rowsHTML+="<input type='button' class='submit_hidden' form='form258_bank_"+id+"' id='save_form258_bank_"+id+"' >";
                            bank_rowsHTML+="<input type='button' class='delete_icon' form='form258_bank_"+id+"' id='delete_form258_bank_"+id+"' onclick='$(this).parent().parent().remove();form258_get_totals();'>";
                        bank_rowsHTML+="</td>";
                    bank_rowsHTML+="</tr>";
                $('#form258_bank_body').append(bank_rowsHTML);

                var fields=document.getElementById("form258_bank_"+id);
                var name_filter=fields.elements[0];
                var bank_filter=fields.elements[1];
                var ifsc_filter=fields.elements[2];
                var acc_filter=fields.elements[3];
                var acc_num_filter=fields.elements[4];

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form258_add_bank();
                });

                var bank_data="<bank_accounts>" +
                        "<name></name>" +
                        "<status exact='yes'>active</status>"+
                        "</bank_accounts>";
                set_my_value_list_func(bank_data,name_filter,function () 
                {
                    $(name_filter).focus();
                });

                $(name_filter).on('blur',function () 
                {
                    var details_xml="<bank_accounts>"+
                                    "<bank></bank>"+
                                    "<ifsc></ifsc>"+
                                    "<account_name></account_name>"+
                                    "<account_num></account_num>"+
                                    "<name exact='yes'>"+name_filter.value+"</name>"+
                                    "</bank_accounts>";
                    fetch_requested_data('',details_xml,function (accounts) 
                    {
                        if(accounts.length>0)
                        {
                            bank_filter.value=accounts[0].bank;
                            ifsc_filter.value=accounts[0].ifsc;
                            acc_filter.value=accounts[0].account_name;
                            acc_num_filter.value=accounts[0].account_num;
                        }
                    });				
                });

                form258_get_totals();
            }
            else
            {
                $("#modal2_link").click();
            }
        }


        /**
         * @form Prepare Quotation
         * @formNo 258
         */
        function form258_add_tc()
        {
            if(is_create_access('form258'))
            {
                var id=get_new_key();
                var	rowsHTML="<tr>";
                    rowsHTML+="<form id='form258_tc_"+id+"' autocomplete='off'></form>";
                        rowsHTML+="<td data-th='S.No.'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Type'>";
                            rowsHTML+="<input type='text' form='form258_tc_"+id+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='T&C'>";
                            rowsHTML+="<textarea required form='form258_tc_"+id+"'></textarea>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' form='form258_tc_"+id+"' value='"+id+"'>";
                            rowsHTML+="<input type='button' class='submit_hidden' form='form258_tc_"+id+"' id='save_form258_tc_"+id+"' >";
                            rowsHTML+="<input type='button' class='delete_icon' form='form258_tc_"+id+"' id='delete_form258_tc_"+id+"' onclick='$(this).parent().parent().remove();form258_get_totals();'>";
                        rowsHTML+="</td>";
                    rowsHTML+="</tr>";
                $('#form258_tc_body').append(rowsHTML);

                var fields=document.getElementById("form258_tc_"+id);
                var type_filter=fields.elements[0];

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form258_add_tc();
                });

                set_static_value_list('terms_and_conditions','type',type_filter);

                form258_get_totals();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form258_create_form()
        {
            if(is_create_access('form258'))
            {
                var form=document.getElementById("form258_master");

                var customer=form.elements['customer'].value;
                var quot_num=form.elements['quot_num'].value;
                var quot_date=get_raw_time(form.elements['date'].value);
                var valid_upto=get_raw_time(form.elements['valid'].value);
                var type=form.elements['type'].value;
                var status=form.elements['status'].value;
                var issued_by=form.elements['issued'].value;
                var address=form.elements['address'].value;
                var data_id=form.elements['id'].value;
                var save_button=form.elements['save'];
                var share_button=form.elements['share'];
                var last_updated=get_my_time();

                var message_attachment="";
                var bt=get_session_var('title');

                $(share_button).off('click');
                $(share_button).on('click',function()
                {
                    modal101_action('Quotation from - '+bt,customer,'customer',function (func) 
                    {
                        print_form258(func);
                    });
                });

                var amount=0;
                var tax=0;
                var total=0;
                var total_quantity=0;
                var tax_rate=0;
                var cartage=0;

                $("[id^='save_form258_item_']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    if(!isNaN(parseFloat(subform.elements[2].value)))
                        total_quantity+=parseFloat(subform.elements[2].value);
                    if(!isNaN(parseFloat(subform.elements[4].value)))
                        amount+=parseFloat(subform.elements[4].value);
                /*	if(!isNaN(parseFloat(subform.elements[5].value)))
                        tax+=parseFloat(subform.elements[5].value);
                    if(!isNaN(parseFloat(subform.elements[6].value)))
                        total+=parseFloat(subform.elements[6].value);
                */
                });


                if(document.getElementById('form258_cartage'))
                {
                    cartage=parseFloat(document.getElementById('form258_cartage').value);
                    tax_rate=parseFloat(document.getElementById('form258_tax').value);
                }

                var amount=my_round(amount,2);		
                var tax=my_round(tax_rate*(amount/100),2);		
                var total=my_round((tax+amount+cartage),0);

                var total_row="<tr><td colspan='4' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
                                    "<td>Amount:<br>Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form258_tax'><br>Transport Charges: <br>Total: </td>" +
                                    "<td>Rs. "+amount+"</br>" +
                                    "Rs. "+tax+" <br>" +
                                    "Rs. <input type='number' value='"+my_round(cartage,2)+"' step='any' id='form258_cartage' class='dblclick_editable'><br>" +
                                    "Rs. <vtotal>"+total+"</vtotal></td>" +
                                    "<td></td>" +
                                    "</tr>";

                $('#form258_item_foot').html(total_row);
                longPressEditable($('.dblclick_editable'));

                var spec_array=[];
                var banks_array=[];
                var spares_array=[];
                var items_array=[];
                var terms_array=[];						

                $("[id^='save_form258_item_']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    var item_obj=new Object();
                    item_obj.item=subform.elements[0].value;
                    item_obj.details=subform.elements[1].value;
                    item_obj.quantity=subform.elements[2].value;
                    item_obj.price=subform.elements[3].value;
                    item_obj.amount=subform.elements[4].value;
                    //item_obj.tax=subform.elements[5].value;
                    //item_obj.total=subform.elements[6].value;
                    items_array.push(item_obj);

                    for(var i=0;i<5;i++)
                    {
                        $(subform.elements[i]).attr('readonly','readonly');
                    }				
                });

                $("[id^='save_form258_spare_']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    var item_obj=new Object();

                    item_obj.item=subform.elements[0].value;
                    item_obj.description=subform.elements[1].value;
                    item_obj.quantity=subform.elements[2].value;
                    var id=subform.elements[3].value;
                    item_obj.unit=document.getElementById('form258_spare_unit_'+id).innerHTML;
                    spares_array.push(item_obj);
                    for(var i=0;i<3;i++)
                    {
                        $(subform.elements[i]).attr('readonly','readonly');
                    }
                });

                $("[id^='save_form258_spec_']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    var item_obj=new Object();
                    //item_obj.item=subform.elements[0].value;
                    item_obj.spec=subform.elements[0].value;
                    item_obj.details=subform.elements[1].value;
                    spec_array.push(item_obj);	
                    for(var i=0;i<2;i++)
                    {
                        $(subform.elements[i]).attr('readonly','readonly');
                    }
                });

                $("[id^='save_form258_bank_']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    var item_obj=new Object();
                    item_obj.name=subform.elements[0].value;
                    item_obj.bank=subform.elements[1].value;
                    item_obj.ifsc=subform.elements[2].value;
                    item_obj.account_name=subform.elements[3].value;
                    item_obj.account_num=subform.elements[4].value;
                    banks_array.push(item_obj);
                    for(var i=0;i<5;i++)
                    {
                        $(subform.elements[i]).attr('readonly','readonly');
                    }
                });

                $("[id^='save_form258_tc_']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    var item_obj=new Object();
                    item_obj.type=subform.elements[0].value;
                    item_obj.tc=subform.elements[1].value;
                    terms_array.push(item_obj);	

                    for(var i=0;i<2;i++)
                    {
                        $(subform.elements[i]).attr('readonly','readonly');
                    }
                });


                var specifications=JSON.stringify(spec_array);
                var banks=JSON.stringify(banks_array);
                var spares=JSON.stringify(spares_array);
                var items=JSON.stringify(items_array);
                var terms=JSON.stringify(terms_array);

                var data_xml="<quotation>" +
                            "<id>"+data_id+"</id>" +
                            "<quot_num>"+quot_num+"</quot_num>" +
                            "<customer>"+customer+"</customer>" +
                            "<date>"+quot_date+"</date>" +
                            "<valid_upto>"+valid_upto+"</valid_upto>" +
                            "<type>"+type+"</type>" +
                            "<status>"+status+"</status>" +
                            "<issued_by>"+issued_by+"</issued_by>" +
                            "<address>"+address+"</address>" +
                            "<amount>"+amount+"</amount>"+
                            "<tax>"+tax+"</tax>"+
                            "<tax_rate>"+tax_rate+"</tax_rate>"+
                            "<cartage>"+cartage+"</cartage>"+
                            "<total>"+total+"</total>"+
                            "<specifications>"+specifications+"</specifications>"+
                            "<spares>"+spares+"</spares>"+
                            "<banks>"+banks+"</banks>"+
                            "<terms>"+terms+"</terms>"+
                            "<items>"+items+"</items>"+
                            "<last_updated>"+last_updated+"</last_updated>" +
                            "</quotation>";
                var activity_xml="<activity>" +
                            "<data_id>"+data_id+"</data_id>" +
                            "<tablename>quotation</tablename>" +
                            "<link_to>form259</link_to>" +
                            "<title>Saved</title>" +
                            "<notes>Quotation # "+quot_num+"</notes>" +
                            "<updated_by>"+get_name()+"</updated_by>" +
                            "</activity>";

                create_row(data_xml,activity_xml);

                var num_data="<user_preferences>"+
                            "<id></id>"+						
                            "<name exact='yes'>quotation_num</name>"+												
                            "</user_preferences>";
                get_single_column_data(function (num_ids)
                {
                    if(num_ids.length>0)
                    {
                        var quot_num_array=quot_num.split("-");
                        var num_xml="<user_preferences>"+
                                        "<id>"+num_ids[0]+"</id>"+
                                        "<value>"+(parseInt(quot_num_array[1])+1)+"</value>"+
                                        "<last_updated>"+last_updated+"</last_updated>"+
                                        "</user_preferences>";
                        update_simple(num_xml);
                    }
                },num_data);

                $(save_button).off('click');
                $(save_button).on('click',function(event)
                {
                    event.preventDefault();
                    form258_update_form();
                });		
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form258_update_form()
        {
            if(is_update_access('form258'))
            {
                var form=document.getElementById("form258_master");

                var customer=form.elements['customer'].value;
                var quot_num=form.elements['quot_num'].value;
                var quot_date=get_raw_time(form.elements['date'].value);
                var valid_upto=get_raw_time(form.elements['valid'].value);
                var type=form.elements['type'].value;
                var status=form.elements['status'].value;
                var issued_by=form.elements['issued'].value;
                var address=form.elements['address'].value;
                var data_id=form.elements['id'].value;
                var save_button=form.elements['save'];
                var last_updated=get_my_time();

                var amount=0;
                var tax=0;
                var total=0;
                var total_quantity=0;
                var cartage=0;
                var tax_rate=0;

                $("[id^='save_form258_item_']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    if(!isNaN(parseFloat(subform.elements[2].value)))
                        total_quantity+=parseFloat(subform.elements[2].value);
                    if(!isNaN(parseFloat(subform.elements[4].value)))
                        amount+=parseFloat(subform.elements[4].value);
                /*	if(!isNaN(parseFloat(subform.elements[5].value)))
                        tax+=parseFloat(subform.elements[5].value);
                    if(!isNaN(parseFloat(subform.elements[6].value)))
                        total+=parseFloat(subform.elements[6].value);
                */
                });


                if(document.getElementById('form258_cartage'))
                {
                    cartage=parseFloat(document.getElementById('form258_cartage').value);
                    tax_rate=parseFloat(document.getElementById('form258_tax').value);
                }

                var amount=my_round(amount,2);		
                var tax=my_round(tax_rate*(amount/100),2);		
                var total=my_round((amount+tax+cartage),0);

                var total_row="<tr><td colspan='4' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
                                    "<td>Amount:<br>Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form258_tax'><br>Transport Charges: <br>Total: </td>" +
                                    "<td>Rs. "+amount+"</br>" +
                                    "Rs. "+tax+" <br>" +
                                    "Rs. <input type='number' value='"+my_round(cartage,2)+"' step='any' id='form258_cartage' class='dblclick_editable'><br>" +
                                    "Rs. <vtotal>"+total+"</vtotal></td>" +
                                    "<td></td>" +
                                    "</tr>";

                $('#form258_item_foot').html(total_row);
                longPressEditable($('.dblclick_editable'));

                var spec_array=[];
                var banks_array=[];
                var spares_array=[];
                var items_array=[];
                var terms_array=[];						

                $("[id^='save_form258_item_']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    var item_obj=new Object();
                    item_obj.item=subform.elements[0].value;
                    item_obj.details=subform.elements[1].value;
                    item_obj.quantity=subform.elements[2].value;
                    item_obj.price=subform.elements[3].value;
                    item_obj.amount=subform.elements[4].value;
                    //item_obj.tax=subform.elements[5].value;
                    //item_obj.total=subform.elements[6].value;
                    items_array.push(item_obj);

                    for(var i=0;i<5;i++)
                    {
                        $(subform.elements[i]).attr('readonly','readonly');
                    }
                });

                $("[id^='save_form258_spare_']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    var item_obj=new Object();
                    item_obj.item=subform.elements[0].value;
                    item_obj.description=subform.elements[1].value;
                    item_obj.quantity=subform.elements[2].value;
                    var id=subform.elements[3].value;
                    item_obj.unit=document.getElementById('form258_spare_unit_'+id).innerHTML;

                    spares_array.push(item_obj);
                    for(var i=0;i<3;i++)
                    {
                        $(subform.elements[i]).attr('readonly','readonly');
                    }	
                });

                $("[id^='save_form258_spec_']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    var item_obj=new Object();
                    //item_obj.item=subform.elements[0].value;
                    item_obj.spec=subform.elements[0].value;
                    item_obj.details=subform.elements[1].value;
                    spec_array.push(item_obj);	
                    for(var i=0;i<2;i++)
                    {
                        $(subform.elements[i]).attr('readonly','readonly');
                    }
                });

                $("[id^='save_form258_bank_']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    var item_obj=new Object();
                    item_obj.name=subform.elements[0].value;
                    item_obj.bank=subform.elements[1].value;
                    item_obj.ifsc=subform.elements[2].value;
                    item_obj.account_name=subform.elements[3].value;
                    item_obj.account_num=subform.elements[4].value;
                    banks_array.push(item_obj);	
                    for(var i=0;i<5;i++)
                    {
                        $(subform.elements[i]).attr('readonly','readonly');
                    }	
                });

                $("[id^='save_form258_tc_']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    var item_obj=new Object();
                    item_obj.type=subform.elements[0].value;
                    item_obj.tc=subform.elements[1].value;
                    terms_array.push(item_obj);	
                    for(var i=0;i<2;i++)
                    {
                        $(subform.elements[i]).attr('readonly','readonly');
                    }
                });	

                //console.log(spec_array);
                var specifications=JSON.stringify(spec_array);
                var banks=JSON.stringify(banks_array);
                var spares=JSON.stringify(spares_array);
                var items=JSON.stringify(items_array);
                var terms=JSON.stringify(terms_array);

                var data_xml="<quotation>" +
                            "<id>"+data_id+"</id>" +
                            "<quot_num>"+quot_num+"</quot_num>" +
                            "<customer>"+customer+"</customer>" +
                            "<date>"+quot_date+"</date>" +
                            "<valid_upto>"+valid_upto+"</valid_upto>" +
                            "<type>"+type+"</type>" +
                            "<status>"+status+"</status>" +
                            "<issued_by>"+issued_by+"</issued_by>" +
                            "<address>"+address+"</address>" +
                            "<amount>"+amount+"</amount>"+
                            "<tax>"+tax+"</tax>"+
                            "<tax_rate>"+tax_rate+"</tax_rate>"+
                            "<cartage>"+cartage+"</cartage>"+
                            "<total>"+total+"</total>"+
                            "<specifications>"+specifications+"</specifications>"+
                            "<spares>"+spares+"</spares>"+
                            "<banks>"+banks+"</banks>"+
                            "<terms>"+terms+"</terms>"+
                            "<items>"+items+"</items>"+
                            "<last_updated>"+last_updated+"</last_updated>" +
                            "</quotation>";
                var activity_xml="<activity>" +
                            "<data_id>"+data_id+"</data_id>" +
                            "<tablename>quotation</tablename>" +
                            "<link_to>form259</link_to>" +
                            "<title>Updated</title>" +
                            "<notes>Quotation # "+quot_num+"</notes>" +
                            "<updated_by>"+get_name()+"</updated_by>" +
                            "</activity>";

                update_row(data_xml,activity_xml);

            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form258_get_totals()
        {
            $('#form258_item_body').find('tr').each(function(index)
            {
                $(this).find('td:nth-child(2)').html(index+1);
            });

            $('#form258_spare_body').find('tr').each(function(index)
            {
                $(this).find('td:nth-child(2)').html(index+1);
            });

            $('#form258_spec_body').find('tr').each(function(index)
            {
                $(this).find('td:nth-child(2)').html(index+1);
            });

            $('#form258_bank_body').find('tr').each(function(index)
            {
                $(this).find('td:nth-child(2)').html(index+1);
            });

            $('#form258_tc_body').find('tr').each(function(index)
            {
                $(this).find('td:nth-child(2)').html(index+1);
            });

            var amount=0;
            var tax=0;
            var total=0;
            var total_quantity=0;
            var tax_rate=0;
            var cartage=0;

            $("[id^='save_form258_item_']").each(function(index)
            {
                var subform_id=$(this).attr('form');
                var subform=document.getElementById(subform_id);

                if(!isNaN(parseFloat(subform.elements[2].value)))
                    total_quantity+=parseFloat(subform.elements[2].value);
                if(!isNaN(parseFloat(subform.elements[4].value)))
                    amount+=parseFloat(subform.elements[4].value);
            /*	if(!isNaN(parseFloat(subform.elements[4].value)))
                    tax+=parseFloat(subform.elements[4].value);
                if(!isNaN(parseFloat(subform.elements[5].value)))
                    total+=parseFloat(subform.elements[5].value);
            */
            });


            if(document.getElementById('form258_cartage'))
            {
                cartage=parseFloat(document.getElementById('form258_cartage').value);
                tax_rate=parseFloat(document.getElementById('form258_tax').value);
            }

            var amount=my_round(amount,2);		
            var tax=my_round(tax_rate*(amount/100),2);		
            var total=my_round((amount+tax+cartage),0);

            var total_row="<tr><td colspan='4' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
                                "<td>Amount:<br>Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form258_tax'><br>Transport Charges: <br>Total: </td>" +
                                "<td>Rs. "+amount+"</br>" +
                                "Rs. "+tax+" <br>" +
                                "Rs. <input type='number' value='"+my_round(cartage,2)+"' step='any' id='form258_cartage' class='dblclick_editable'><br>" +
                                "Rs. <vtotal>"+total+"</vtotal></td>" +
                                "<td></td>" +
                                "</tr>";

            $('#form258_item_foot').html(total_row);
            longPressEditable($('.dblclick_editable'));
        }

        function form258_print_form()
        {	
            print_form258(function(container)
            {
                $.print(container);
                container.innerHTML="";	
            });	
        }

        function print_form258(func)
        {
            var form_id='form258';
            ////////////setting up containers///////////////////////	
            var container=document.createElement('div');
            var header=document.createElement('div');
                var logo=document.createElement('div');

            var invoice_line=document.createElement('div');

            var info_section=document.createElement('table');
                var info_row=document.createElement('tr');
                var customer_info=document.createElement('td');
                var business_info=document.createElement('td');

            var footer=document.createElement('div');
                var signature=document.createElement('div');
                var jurisdiction=document.createElement('div');
                var business_contact=document.createElement('div');

        ////////////setting styles for containers/////////////////////////

            container.setAttribute('style','margin:5px;');
            header.setAttribute('style','width:98%;min-height:50px;text-align:center');
                logo.setAttribute('style','width:100%;text-align:center;margin:10px;max-height:50px;font-size:40px;');
            invoice_line.setAttribute('style','width:98%;margin:2px;');
            info_section.setAttribute('style','width:98%;min-height:85px;font-size:11px;');
                customer_info.setAttribute('style','padding:5px;margin:5px;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;font-size:11px;text-align:left;');
                business_info.setAttribute('style','padding:5px;margin:5px;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;font-size:11px;text-align:left;');
            footer.setAttribute('style','width:98%;min-height:60px;font-size:11px;');
                signature.setAttribute('style','float:right;width:98%;text-align:right;font-size:11px;');
                jurisdiction.setAttribute('style','margin:10px;width:98%;text-align:left;font-size:11px;');
                business_contact.setAttribute('style','margin:0px;padding:0px;width:98%;text-align:center;page-break-inside:avoid;font-size:11px;min-height:40px;');

        ///////////////getting the content////////////////////////////////////////

            var bt=get_session_var('title');
            //var logo_image=get_session_var('logo');
            var business_address=get_session_var('address');
            var business_phone=get_session_var('phone');
            var business_email=get_session_var('email');
            var cin=get_session_var('cin');
            var pan=get_session_var('pan');

            var master_form=document.getElementById(form_id+'_master');
            var customer_name=master_form.elements['customer'].value;
            var date=master_form.elements['date'].value;	
            var valid_date=master_form.elements['valid'].value;	
            var issued_by=master_form.elements['issued'].value;	
            var quot_no=master_form.elements['quot_num'].value;
            var customer_address=master_form.elements['address'].value;
            var email=master_form.elements['email'].value;
            var quot_type=master_form.elements['type'].value;
            var computer_generated=master_form.elements['computer_generated'].checked;

            var signature_text="For "+bt+"<br><br>Auth. Signatory<br>";
            if(computer_generated)
            {
                var signature_text="<br>Computer Generated. Signature Not Required<br>";
                signature.setAttribute('style','text-align:center;');
            }

            ////////////////filling in the content into the containers//////////////////////////

            logo.innerHTML=bt;

            invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>Quotation Sheet</b></div><hr style='border: 1px solid #00f;'>";

            customer_info.innerHTML="<b>Customer: </b><br>"+customer_name+"<br>"+customer_address+"<br>Email: "+email;
            business_info.innerHTML="Quotation #: "+quot_no+"<br>Date: "+date+"<br>Valid Upto: "+valid_date+"<br>Issued By: "+issued_by+"<br>Type: "+quot_type;

            signature.innerHTML=signature_text;
            jurisdiction.innerHTML="Note: All disputes subjected to Delhi Jurisdiction";
            business_contact.innerHTML="<p><hr style='border: 1px solid #00f;margin:5px;'></p><p>Address: "+business_address+"<br>Phone: "+business_phone+", E-Mail: "+business_email+"<br>CIN: "+cin+", PAN: "+pan+"</p><p><hr style='border: 1px solid #00f;margin:5px;'></p>";

            /////////////adding item table //////////////////////////////////////////////////////	
            var item_table_element=document.getElementById(form_id+'_item_body');
            var item_table_heading=document.createElement('div');
            item_table_heading.innerHTML="<br><b>Items</b><br>";
            var item_table=document.createElement('table');
            item_table_heading.appendChild(item_table);
            item_table_heading.setAttribute('class','print_element');
            item_table.setAttribute('style','width:98%;font-size:11px;border:1px solid black;text-align:left;');
            item_table.setAttribute('class','plain_table');
            var table_header="<tr>"+
                        "<td style='border: 1px solid #000;text-align:left;width:5%;'>S.No.</td>"+
                        "<td style='border: 1px solid #000;text-align:left;width:40%;'>Item Name</td>"+
                        "<td style='border: 1px solid #000;text-align:left;width:15%'>Quantity</td>"+
                        "<td style='border: 1px solid #000;text-align:left;width:20%'>Rate</td>"+
                        "<td style='border: 1px solid #000;text-align:left;width:20%'>Amount</td></tr>";
                        //"<td style='border: 1px solid #000;text-align:left;width:10%'>Tax</td>"+
                        //"<td style='border: 1px solid #000;text-align:left;width:15%'>Total</td></tr>";

            var table_rows=table_header;
            var counter=0;

            var item_details="";

            $(item_table_element).find('form').each(function(index)
            {
                counter+=1;
                var form=$(this)[0];
                var item_name=form.elements[0].value;
                item_details=form.elements[1].value;
                var quantity=""+form.elements[2].value;
                var price=form.elements[3].value;
                var amount=form.elements[4].value;
                //var tax=form.elements[5].value;		
                //var total=form.elements[6].value;

                table_rows+="<tr>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+counter+"</td>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+item_name+"</td>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+quantity+"</td>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+price+"</td>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+amount+"</td></tr>";
                        //"<td style='border: 1px solid #000;text-align:left;'>"+tax+"</td>"+
                        //"<td style='border: 1px solid #000;text-align:left;'>"+total+"</td></tr>";
            });


            var table_foot=document.getElementById(form_id+'_item_foot');
            var total_quantity=$(table_foot).find('tr>td:first')[0].innerHTML;
            var total_text_element=$(table_foot).find('tr>td:nth-child(2)');
            var total_amount_element=$(table_foot).find('tr>td:nth-child(3)');

            var total_amount_number=$(total_amount_element).find('vtotal').html();
            var wording_total=number2text(total_amount_number);

            $(total_amount_element).find("input").each(function(index)
            {
                $(this).replaceWith($(this).val());
            });
            $(total_text_element).find('input').each(function(index)
            {
                $(this).replaceWith($(this).val());
            });
            var total_amount=$(total_amount_element).html();
            var total_text=$(total_text_element).html();
            var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
                        "<td colspan='2' style='border: 1px solid #000;text-align:left;'>"+total_quantity+"<br>Total (in words): "+wording_total+"</td>"+
                        "<td colspan='2' style='border: 1px solid #000;text-align:left;'>"+total_text+"</td>"+
                        "<td colspan='1' style='border: 1px solid #000;text-align:left;'>"+total_amount+"</td></tr>";

            table_rows+=table_foot_row;
            item_table.innerHTML=table_rows;

            /////////////adding cabinet details table //////////////////////////////////////////////////////	

            var details_table_heading=document.createElement('div');
            details_table_heading.innerHTML="<br><b>Additional Details</b><br>";
            var details_table=document.createElement('table');
            details_table_heading.appendChild(details_table);
            details_table_heading.setAttribute('class','print_element');
            details_table.setAttribute('style','width:98%;font-size:11px;border:1px solid black;text-align:left;');
            details_table.setAttribute('class','plain_table');
            var table_header="<tr>"+
                        "<td style='border: 1px solid #000;text-align:left;width:10%;'>S.No.</td>"+
                        //"<td style='border: 1px solid #000;text-align:left;width:30%;'>Item</td>"+
                        "<td style='border: 1px solid #000;text-align:left;width:45%'>Type</td>"+
                        "<td style='border: 1px solid #000;text-align:left;width:45%'>Details</td></tr>";

            var table_rows=table_header;
            var counter=0;
            if(item_details!="")
            {
                var item_details_array=item_details.split("\n");
                item_details_array.forEach(function(item_detail_row)
                {
                    counter+=1;
                    var detail_row=item_detail_row.split(":");
                    var type=detail_row[0];
                    var details=detail_row[1];

                    table_rows+="<tr>"+
                            "<td style='border: 1px solid #000;text-align:left;'>"+counter+"</td>"+
                            //"<td style='border: 1px solid #000;text-align:left;'>"+item+"</td>"+
                            "<td style='border: 1px solid #000;text-align:left;'>"+type+"</td>"+
                            "<td style='border: 1px solid #000;text-align:left;'>"+details+"</td></tr>";
                });
            }	
            details_table.innerHTML=table_rows;

            /////////////adding spec table //////////////////////////////////////////////////////	

            var spec_table_element=document.getElementById(form_id+'_spec_body');
            var spec_table_heading=document.createElement('div');
            spec_table_heading.innerHTML="<br><b>Specifications</b><br>";
            var spec_table=document.createElement('table');
            spec_table_heading.appendChild(spec_table);
            spec_table_heading.setAttribute('class','print_element');
            spec_table_heading.setAttribute('style','page-break-before:always;');
            spec_table.setAttribute('style','width:98%;font-size:11px;border:1px solid black;text-align:left;');
            spec_table.setAttribute('class','plain_table');
            var table_header="<tr>"+
                        "<td style='border: 1px solid #000;text-align:left;width:10%;'>S.No.</td>"+
                        //"<td style='border: 1px solid #000;text-align:left;width:30%;'>Item</td>"+
                        "<td style='border: 1px solid #000;text-align:left;width:45%'>Type</td>"+
                        "<td style='border: 1px solid #000;text-align:left;width:45%'>Specification</td></tr>";

            var table_rows=table_header;
            var counter=0;

            $(spec_table_element).find('form').each(function(index)
            {
                counter+=1;
                var form=$(this)[0];
                //var item=form.elements[0].value;
                var spec=form.elements[0].value;
                var details=form.elements[1].value;

                table_rows+="<tr>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+counter+"</td>"+
                        //"<td style='border: 1px solid #000;text-align:left;'>"+item+"</td>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+spec+"</td>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+details+"</td></tr>";
            });

            spec_table.innerHTML=table_rows;

            /////////////adding spares table //////////////////////////////////////////////////////	

            var spare_table_element=document.getElementById(form_id+'_spare_body');
            var spare_table_heading=document.createElement('div');
            spare_table_heading.innerHTML="<br><b>Spare Parts</b><br>";
            var spare_table=document.createElement('table');
            spare_table_heading.appendChild(spare_table);
            spare_table_heading.setAttribute('class','print_element');
            spare_table.setAttribute('style','width:98%;font-size:11px;border:1px solid black;text-align:left;');
            spare_table.setAttribute('class','plain_table');
            var table_header="<tr>"+
                        "<td style='border: 1px solid #000;text-align:left;width:10%;'>S.No.</td>"+
                        "<td style='border: 1px solid #000;text-align:left;width:35%;'>Part Name</td>"+
                        "<td style='border: 1px solid #000;text-align:left;width:35%'>Description</td>"+
                        "<td style='border: 1px solid #000;text-align:left;width:20%'>Quantity</td></tr>";

            var table_rows=table_header;
            var counter=0;

            $(spare_table_element).find('form').each(function(index)
            {
                counter+=1;
                var form=$(this)[0];
                var item=form.elements[0].value;
                var desc=form.elements[1].value;
                var quantity=form.elements[2].value;

                table_rows+="<tr>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+counter+"</td>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+item+"</td>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+desc+"</td>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+quantity+"</td></tr>";
            });

            spare_table.innerHTML=table_rows;

            /////////////adding bank table //////////////////////////////////////////////////////	

            var bank_table_element=document.getElementById(form_id+'_bank_body');
            var bank_table_heading=document.createElement('div');
            bank_table_heading.innerHTML="<br><b>Account Details</b><br>";
            var bank_table=document.createElement('table');
            bank_table_heading.appendChild(bank_table);
            bank_table_heading.setAttribute('class','print_element');
            bank_table.setAttribute('style','width:98%;font-size:11px;border:1px solid black;text-align:left;');
            bank_table.setAttribute('class','plain_table');
            var table_header="<tr>"+
                        "<td style='border: 1px solid #000;text-align:left;width:10%;'>S.No.</td>"+
                        "<td style='border: 1px solid #000;text-align:left;width:20%;'>Bank</td>"+
                        "<td style='border: 1px solid #000;text-align:left;width:20%'>IFSC</td>"+
                        "<td style='border: 1px solid #000;text-align:left;width:25%'>Account Name</td>"+
                        "<td style='border: 1px solid #000;text-align:left;width:25%'>Account Number</td></tr>";

            var table_rows=table_header;
            var counter=0;

            $(bank_table_element).find('form').each(function(index)
            {
                counter+=1;
                var form=$(this)[0];
                var bank=form.elements[1].value;
                var ifsc=form.elements[2].value;
                var account_name=form.elements[3].value;
                var account_num=form.elements[4].value;

                table_rows+="<tr>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+counter+"</td>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+bank+"</td>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+ifsc+"</td>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+account_name+"</td>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+account_num+"</td></tr>";
            });

            bank_table.innerHTML=table_rows;

            /////////////adding terms table //////////////////////////////////////////////////////	

            var terms_table_element=document.getElementById(form_id+'_tc_body');
            var terms_table_heading=document.createElement('div');
            terms_table_heading.innerHTML="<br><b>Terms & Conditions</b><br>";
            var terms_table=document.createElement('table');
            terms_table_heading.appendChild(terms_table);
            terms_table_heading.setAttribute('class','print_element');
            terms_table.setAttribute('style','width:98%;font-size:11px;border:1px solid black;text-align:left;');
            terms_table.setAttribute('class','plain_table');
            var table_header="<tr>"+
                        "<td style='border: 1px solid #000;text-align:left;width:10%;'>S.No.</td>"+
                        "<td style='border: 1px solid #000;text-align:left;width:90%;'>Terms & Conditions</td></tr>";

            var table_rows=table_header;
            var counter=0;

            $(terms_table_element).find('form').each(function(index)
            {
                counter+=1;
                var form=$(this)[0];
                var tc=form.elements[1].value;

                table_rows+="<tr>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+counter+"</td>"+
                        "<td style='border: 1px solid #000;text-align:left;'>"+tc+"</td></tr>";
            });

            terms_table.innerHTML=table_rows;

            /////////////placing the containers //////////////////////////////////////////////////////	

            container.appendChild(header);
            container.appendChild(invoice_line);
            container.appendChild(info_section);

            container.appendChild(item_table_heading);
            //container.appendChild(item_table);

            container.appendChild(details_table_heading);
            //container.appendChild(details_table);

            container.appendChild(spare_table_heading);
            //container.appendChild(spare_table);

            container.appendChild(bank_table_heading);
            //container.appendChild(bank_table);

            container.appendChild(terms_table_heading);
            //container.appendChild(terms_table);

            container.appendChild(footer);

            header.appendChild(logo);
            //header.appendChild(business_intro);
            //header.appendChild(business_contact);
            info_section.appendChild(info_row);
            info_row.appendChild(customer_info);
            info_row.appendChild(business_info);

            footer.appendChild(signature);
            footer.appendChild(jurisdiction);
            footer.appendChild(business_contact);

            container.appendChild(spec_table_heading);
            container.appendChild(spec_table);

            func(container);
        }

    </script>
</div>