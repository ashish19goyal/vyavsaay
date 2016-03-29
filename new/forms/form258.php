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