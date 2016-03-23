/**
* Print Objects
*/
function print_object(object)
{
	var container=document.getElementById('vyavsaay_object_'+object);
	$.print(container);
}

/**
* Print barcodes
*/
function print_barcode(string)
{
	var container=document.createElement('div');
	var image_element=document.createElement('img');
	var name_element=document.createElement('div');
		
	container.setAttribute('style','width:90%;height:90%;padding:0px;margin:0px');	
	image_element.setAttribute('style','width:200px;');
	name_element.setAttribute('style','width:90%;font-weight:bold;font-size:11px;margin:1px;text-align:center;');
	container.appendChild(image_element);
	container.appendChild(name_element);
	
	name_element.innerHTML=string;
	$(image_element).JsBarcode(string,{displayValue:false});
	$.print(container);	
}

/**
* Print barcodes for products
*/
function print_product_barcode(barcode,sku,name)
{
	var container=document.createElement('div');
	var sku_element=document.createElement('div');
	var image_element=document.createElement('img');
	var name_element=document.createElement('div');
	
	container.setAttribute('style','width:90%;height:90%;max-height:90%;margin:0px;padding:0px;');
	sku_element.setAttribute('style','width:90%;height:20px;text-align:center;font-size:10px;margin:0px;padding:0px;');
	image_element.setAttribute('style','width:200px;height:60px;margin:0px;padding:0px;');
	name_element.setAttribute('style','width:90%;height:20px;font-size:9px;margin:0px;padding:0px;');
	
	container.appendChild(sku_element);
	container.appendChild(image_element);
	container.appendChild(name_element);

	sku_element.innerHTML=sku;
	$(image_element).JsBarcode(barcode,{displayValue:true,fontSize:24});
	name_element.innerHTML=name;	   
	
	$.print(container);	
}


/**
* Print smaller barcodes for products
*/
function print_smaller_product_barcode(barcode,sku,name)
{
	//console.log('printing smaller barcode');
	var container=document.createElement('div');
	var sku_element=document.createElement('div');
	var image_element=document.createElement('img');
	//var name_element=document.createElement('div');
	
	container.setAttribute('style','width:95%;height:80%;max-height:90%;margin:0px;padding:0px;');
	sku_element.setAttribute('style','width:95%;height:25px;text-align:center;font-size:12px;margin:0px;margin-top:2px;padding:0px;');
	image_element.setAttribute('style','width:200px;height:60px;margin:2px;padding:2px;');
	//name_element.setAttribute('style','width:95%;height:15px;font-size:9px;margin:0px;padding:0px;');
	
	container.appendChild(sku_element);
	container.appendChild(image_element);
	//container.appendChild(name_element);

/*
    var bsettings = {
      bgColor: "#ffffff",
      color: "#000000",
      showHRI:true,
      barWidth: 1,
      barHeight: 40
    };
*/
	sku_element.innerHTML=sku;
	//$(image_element).barcode(barcode,'ean13',bsettings);
	$(image_element).JsBarcode(barcode,{displayValue:true,fontSize:20});
	//name_element.innerHTML=name;
	$.print(container);	
}


 /**
 * Print reports in tabular format
 * @param report_name
 * @param report_title
 * @param print_button
 */
function print_tabular_report(report_name,report_title,print_button)
{
	$(print_button).off('click');
	$(print_button).on('click',function(event)
	{
	   var container=document.createElement('div');
	   var business_title=document.createElement('div');
	   var title=document.createElement('div');
	   var bt=get_session_var('title');
	   business_title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.5em'><b>"+bt+"</b></div>";
	   title.innerHTML="<div style='display: block;width:100%;font-size:1.2em'><b>"+report_title+"</b></div>";
	   var table_element=document.getElementById(report_name+"_body").parentNode;
	   var table_copy=table_element.cloneNode(true);
	   table_copy.removeAttribute('class');
	   $(table_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;");
	   container.appendChild(business_title);
	   container.appendChild(title);
	   container.appendChild(table_copy);
	   $.print(container);
	});
}

function print_static_report_table(report_id,report_title,func)
{
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_intro=document.createElement('div');
	
	var report_title_line=document.createElement('div');
	
	var table_container=document.createElement('div');

	var footer=document.createElement('div');
		var business_contact=document.createElement('div');
	
////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;text-align:center');
		report_title_line.setAttribute('style','width:100%;text-align:center;font-size:18px;margin:10px 0px;');
	footer.setAttribute('style','width:100%;min-height:100px;font-size:14px;');
		business_contact.setAttribute('style','width:100%;text-align:center;margin:10px 0px;');
	
///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var logo_image=get_session_var('logo');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');
	var business_website=get_session_var('website');
	
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	business_contact.innerHTML="<hr style='border: 1px solid #000;margin:2px 0px;'><div>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email+" Website: "+business_website+"</div><hr style='border: 1px solid #000;margin:2px 0px;'>";
	report_title_line.innerHTML="<hr style='border: 1px solid #000;margin:2px 0px;'><div style='text-align:center;'><b style='text-size:1.2em'>"+report_title+"</b></div><hr style='border: 1px solid #000;margin:2px 0px;'>";

	/////////////adding new table //////////////////////////////////////////////////////	

	var new_table=document.createElement('table');
	new_table.setAttribute('style','width:100%;font-size:14px;border:1px solid black;text-align:left;');
	new_table.setAttribute('class','plain_table');

	$(new_table).html($("#"+report_id+"_body").parent().find('thead').html());
	$(new_table).append($("#"+report_id+"_body").html());
	$(new_table).append($("#"+report_id+"_body").parent().find('tfoot').html());

    $(new_table).find('span').each(function()
    {
        $(this).parent().html($(this).text());
    });

    $(new_table).find("input[type='hidden'],input[type='button'],button").each(function()
    {
        $(this).remove();
    });

	/////////////placing the containers //////////////////////////////////////////////////////	
	
	container.appendChild(header);
	container.appendChild(report_title_line);
	
	container.appendChild(new_table);
	container.appendChild(footer);

	header.appendChild(logo);
	
	container.appendChild(business_contact);
	
	func(container);
}


function print_report_table(report_data,report_title,func)
{
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_intro=document.createElement('div');
	
	var report_title_line=document.createElement('div');
	
	var table_container=document.createElement('div');

	var footer=document.createElement('div');
		var business_contact=document.createElement('div');
	
////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;text-align:center');
		report_title_line.setAttribute('style','width:100%;text-align:center;font-size:18px;margin:10px 0px;');
	footer.setAttribute('style','width:100%;min-height:100px;font-size:14px;');
		business_contact.setAttribute('style','width:100%;text-align:center;margin:10px 0px;');
	
///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var logo_image=get_session_var('logo');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');
	var business_website=get_session_var('website');
	
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	business_contact.innerHTML="<hr style='border: 1px solid #000;margin:2px 0px;'><div>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email+" Website: "+business_website+"</div><hr style='border: 1px solid #000;margin:2px 0px;'>";
	report_title_line.innerHTML="<hr style='border: 1px solid #000;margin:2px 0px;'><div style='text-align:center;'><b style='text-size:1.2em'>"+report_title+"</b></div><hr style='border: 1px solid #000;margin:2px 0px;'>";

	/////////////adding new table //////////////////////////////////////////////////////	

	var new_table=document.createElement('table');
	new_table.setAttribute('style','width:100%;font-size:14px;border:1px solid black;text-align:left;');
	new_table.setAttribute('class','plain_table');

	var table_rows="";
	
	if(report_data.length>0)
	{
		var data_row=report_data[0];
		table_rows+="<tr>";
		
		for(var i in data_row)
		{
			table_rows+="<th style='border: 1px solid #000;text-align:left;'>"+i+"</th>";				
		}		
		table_rows+="</tr>";
	}

	report_data.forEach(function(data_row)
	{
		table_rows+="<tr>";
		for(var i in data_row)
		{
			table_rows+="<td style='border: 1px solid #000;text-align:left;'>"+data_row[i]+"</td>";				
		}		
		table_rows+="</tr>";
	});

	new_table.innerHTML=table_rows;
	
	/////////////placing the containers //////////////////////////////////////////////////////	
	
	container.appendChild(header);
	container.appendChild(report_title_line);
	
	container.appendChild(new_table);
	container.appendChild(footer);

	header.appendChild(logo);
	//footer.appendChild(signature);
	
	container.appendChild(business_contact);
	
	func(container);
}


/**
 * Print reports in graphical form
 * @param report_name
 * @param report_title
 * @param print_button
 * @param chart_element
 */
function print_graphical_report(report_name,report_title,print_button,chart_element)
{
	$(print_button).off('click');
	$(print_button).on('click',function(event)
	{
	   var container=document.createElement('div');
	   var business_title=document.createElement('div');
	   var title=document.createElement('div');
	   var bt=get_session_var('title');
	   business_title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.5em'><b>"+bt+"</b></div>";
	   title.innerHTML="<div style='display: block;width:100%;font-size:1.2em'><b>"+report_title+"</b></div>";
	   var legend=document.createElement('div');
	   legend.innerHTML="<b>Legend<div style='display: block;'>"+chart_element.generateLegend();+"</div></b>";
	   var report_image=document.createElement('img');
	   report_image.setAttribute('src',chart_element.toBase64Image());

	   container.appendChild(business_title);
	   container.appendChild(title);
	   container.appendChild(legend);
	   container.appendChild(report_image);
	   $.print(container);
	});
}

/**
 * Print bills, receipts etc in tabular format
 */
function print_tabular_form(form_id,form_title,table_copy)
{
	var container=document.createElement('div');
	var business_title=document.createElement('div');
	var title=document.createElement('div');
	var bill_message=document.createElement('div');
	var signature=document.createElement('div');
	var footer=document.createElement('div');
	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	signature.innerHTML="<div style='float:right;text-align:left;display:block;width:30%;font-size:"+font_size+"em'><b>Signature: </b></div>";
	bill_message.innerHTML="<div style='float:left;text-align:left;display:block;width:60%;font-size:"+font_size+"em'><textarea style='border:none;width:100%;height:100px;'>"+get_session_var('bill_message')+"</textarea></div>";
	title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.2em;margin:2px;'><b>"+form_title+"</b></div>";
	
	business_title.innerHTML="<div style='display:block;font-size:1.5em;float:left;'><b>"+bt+"</b><br>" +
							"<div style='font-size:"+font_size+"em;padding:5px'>VAT #: "+get_session_var('vat')+"<br>" +
							"TIN #: "+get_session_var('tin')+"</div></div>"+
							"<div style='display:block;float:right;'><div>Contact No: "+get_session_var('phone') +
							"<br>Address: "+get_session_var('address')+"</div></div>";
	business_title.setAttribute('style',"height:80px;padding:1%;border:2px solid black;border-bottom:none;font-size:"+font_size+"em");
	
	var form_master=form_id+"_master";
	var header_element=document.getElementById(form_master);
	var header_copy=header_element.cloneNode(true);
	$(header_copy).find("a").remove();
	$(header_copy).find("input[type=hidden],input[type=button],input[type=submit],img").remove();
	$(header_copy).find("input[type=text],input[type=number],textarea").each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
	
	if(!table_copy)
	{
		var table_element=document.getElementById(form_id+'_body').parentNode;
		table_copy=table_element.cloneNode(true);
	}
	table_copy.removeAttribute('class');
	$(table_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child,v1").remove();
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
	$(table_copy).find('label').each(function(index)
	{
		$(this).replaceWith($(this).html());
	});
	
	$(table_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	header_copy.setAttribute('style',"padding:1%;font-size:"+font_size+"em;border:2px solid black;");
	
	container.appendChild(title);
	container.appendChild(business_title);
	container.appendChild(header_copy);
	container.appendChild(table_copy);
	footer.appendChild(bill_message);
	footer.appendChild(signature);
	container.appendChild(footer);
	$.print(container);
}

/**
* This function prepares the printing template for the newsletter
*/
function print_newsletter(nl_name,nl_id,print_type,func)
{
	if(is_read_access('form237'))
	{
		form237_print_form(nl_name,nl_id,print_type,func);
	}
	else
	{
		form196_print_form(nl_name,nl_id,print_type,func);
	}
}

/**
* This function prepares the printing template for the newsletter
*/
function print_flex_newsletter(nl_name,nl_id,print_type,func)
{
	if(is_read_access('form237'))
	{
		form237_print_form(nl_name,nl_id,print_type,func);
	}
	else
	{
		form196_print_form(nl_name,nl_id,print_type,func);
	}
}


/**
 * @form Create NewsLetter
 * @formNo 2
 */
function form2_print_form()
{	
	var form=document.getElementById("form2_master");
	var newsletter_name=form.elements[1].value;
	var newsletter_id=form.elements[3].value;
		
	print_newsletter(newsletter_name,newsletter_id,'paper',function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
 * @form Create Service bills
 * @formNo 10
 */
function form10_print_form()
{
	print_form10(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}


/**
 * @form Create service bills
 * @formNo 10
 */
function print_form10(func)
{
	var form_id='form10';
	
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var business_title=document.createElement('div');
	
	var invoice_box=document.createElement('div');
	
	var info_section=document.createElement('div');	
		var customer_info=document.createElement('div');
		var payment_info=document.createElement('div');

	var table_container=document.createElement('div');
		
	////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;min-height:1in;');
		business_title.setAttribute('style','width:100%;text-align:center;font-size:16px;');
	invoice_box.setAttribute('style','width:99%;min-height:.5in;background-color:#bbbbbb;border: 1px solid #000000;padding:2px;font-size:14px');
	info_section.setAttribute('style','width:99%;min-height:.5in;border: 1px solid #000000;font-size:14px;padding:2px');
		customer_info.setAttribute('style','padding:2px;margin:2px;float:left;width:48%;height:.5in;text-align:left;');
		payment_info.setAttribute('style','padding:2px;margin:2px;float:right;width:48%;height:.5in;text-align:right;');
	
	///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');

	var master_form=document.getElementById(form_id+'_master');
	var customer_name=master_form.elements['customer'].value;
	var customer_address=master_form.elements['customer_address'].value;
	var bill_date=master_form.elements['bill_date'].value;
	var due_date=master_form.elements['due_date'].value;
	var invoice_no=master_form.elements['bill_num'].value;
	var payment_text=master_form.elements['payment'].value;
	
	////////////////filling in the content into the containers//////////////////////////

	business_title.innerHTML="<b>"+bt+"</b><br>"+business_address+"<br>"+business_phone;
	invoice_box.innerHTML="<div style='float:left;width:50%;font-weight:bold'>Bill No.: "+invoice_no+"</div><div style='float:right;text-align:right;width:50%'>Bill Date: "+bill_date+"<br>Due Date: "+due_date+"</div>";
	
	customer_info.innerHTML=customer_name+"<br>"+customer_address;
	payment_info.innerHTML=payment_text;

	var table_element=document.getElementById(form_id+'_body');
	
	/////////////adding new table //////////////////////////////////////////////////////	
	var new_table=document.createElement('table');
	new_table.setAttribute('style','font-size:13px;border:1px solid black;text-align:left;');
	var table_header="<tr style='border-top: 1px solid #000000;border-bottom: 1px solid #000000;font-weight:bold'><td style='text-align:left;width:.2in;'>Qty</td>"+
				"<td style='text-align:left;width:1.3in'>Item</td>"+
				"<td style='text-align:left;width:.5in'>Remark</td>"+
				"<td style='text-align:left;width:.3in'>Rate</td>"+
				"<td style='text-align:left;width:.3in'>Amount</td></tr>";
				
	var table_rows=table_header;
	var counter=0;
	
	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		//console.log(form);
		var quantity=""+form.elements[2].value;
		var item_name=form.elements[0].value;
		var remark=form.elements[1].value;
		var rate=form.elements[3].value;
		var amount=form.elements[4].value;		

		table_rows+="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;'>"+
				"<td style='text-align:left'>"+quantity+"</td>"+
				"<td style='text-align:left'>"+item_name+"</td>"+
				"<td style='text-align:left'>"+remark+"</td>"+
				"<td style='text-align:left'>"+rate+"</td>"+
				"<td style='text-align:left'>"+amount+"</td></tr>";
	});
	
	var row_count=$(table_element).find('tbody>tr').length;
	var rows_to_add=15-row_count;
	for(var i=0;i<rows_to_add;i++)
	{
		table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:.2in;'><td></td><td></td><td></td><td></td><td></td></tr>";
	}

	var table_foot=document.getElementById(form_id+'_foot');
	var total_quantity=$(table_foot).find('tr>td:first')[0].innerHTML;
	var total_text=$(table_foot).find('tr>td:nth-child(2)')[0].innerHTML;
	var total_amount=$(table_foot).find('tr>td:nth-child(3)')[0].innerHTML;
	
	var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
				"<td colspan='2' style='text-align:left;'>"+total_quantity+"</td>"+
				"<td style='text-align:left;'>"+total_text+"</td>"+
				"<td colspan='2' style='text-align:left;width:.3in'>"+total_amount+"</td></tr>";
		
	table_rows+=table_foot_row;
	new_table.innerHTML=table_rows;
	

	////////////////////////////////////////////////////////////////////////////////////////

	container.appendChild(header);
	container.appendChild(invoice_box);
	container.appendChild(info_section);

	container.appendChild(new_table);

	header.appendChild(business_title);

	info_section.appendChild(customer_info);
	info_section.appendChild(payment_info);

	func(container);
}

/**
 * @form Create Product bills
 * @formNo 12
 */
function form12_print_form()
{
	print_tabular_form('form12','Sale Bill');
}



/**
 * @form Enter supplier bill
 * @formNo 21
 */
function form21_print_form()
{
	print_tabular_form('form21','Purchase Bill');
}


/**
 * @form Create Purchase order
 * @formNo 24
 */
function form24_print_form()
{	
	print_form24(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
* This function prepares the printing template for the documents like bills and purchase orders
*/
function print_form24(func)
{
	var form_id='form24';
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_intro=document.createElement('div');
		var business_contact=document.createElement('div');
	
	var invoice_line=document.createElement('div');
	
	var info_section=document.createElement('div');	
		var customer_info=document.createElement('div');
		var business_info=document.createElement('div');

	var table_container=document.createElement('div');

	var footer=document.createElement('div');
		var tandc=document.createElement('div');
		var signature=document.createElement('div');

////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;min-height:100px;text-align:center');
		logo.setAttribute('style','width:100%;text-align:center;font-weight:600;font-size:32px;line-height:40px;');
		business_intro.setAttribute('style','width:100%;text-align:center');
		business_contact.setAttribute('style','width:100%;text-align:left');
	info_section.setAttribute('style','width:100%;min-height:80px');
		customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
		business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
	footer.setAttribute('style','width:100%;min-height:100px');
		tandc.setAttribute('style','float:left;width:60%;min-height:50px');
		signature.setAttribute('style','float:right;width:30%;min-height:60px');

///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	var logo_image=get_session_var('logo');
	//var business_intro_text=get_session_var('business_intro');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');
	//var business_website=get_session_var('website');

	var master_form=document.getElementById(form_id+'_master');
	var supplier_name=master_form.elements['supplier'].value;
	var date=master_form.elements['date'].value;	
	var order_no=master_form.elements['order_num'].value;
	var supplier_address=master_form.elements['address'].value;
	var supplier_tin=master_form.elements['tin'].value;
	var payment_mode=master_form.elements['mode'].value;
	var vat_no=get_session_var('vat');
	var tin_no=get_session_var('tin');
		
	var tandc_text=get_session_var('po_message').replace(/\n/g,"<br>");
	var signature_text="<br>"+bt+"<br><br><br>Auth. Signatory<br>";
	
	////////////////filling in the content into the containers//////////////////////////

	//logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	logo.innerHTML=bt;
	//business_intro.innerHTML="<hr style='border: 1px solid #000;'>"+business_intro_text;
	business_contact.innerHTML="<hr style='border: 1px solid #00f;'>Billing Address: "+business_address+"<br>Buyer VAT #:"+vat_no+"<br>Contact Nos.: "+business_phone+"<br>E-Mail: "+business_email;
	
	invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>Purchase Order #: "+order_no+"</b></div><hr style='border: 1px solid #00f;'>";
	
	customer_info.innerHTML="<b>Supplier: </b><br>"+supplier_name+"<br>"+supplier_address+"<br>TIN#: "+supplier_tin;
	business_info.innerHTML="<b>Buyer</b><br>TIN #: "+tin_no+"<br>PO Issue Date: "+date+"<br>Purchase Order No: "+order_no+"<br>Mode of Payment: "+payment_mode;
	
	tandc.innerHTML="<br><b>Terms and Conditions</b><br>"+tandc_text;
	signature.innerHTML=signature_text;

	var table_element=document.getElementById(form_id+'_body');
	
	/////////////adding new table //////////////////////////////////////////////////////	
	var new_table=document.createElement('table');
	new_table.setAttribute('style','width:100%;font-size:11px;border:1px solid black;text-align:left;');
	new_table.setAttribute('class','plain_table');
	var table_header="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;width:30px;'>S.No.</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:130px;'>Item Name</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:80px'>SKU</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:80px'>Supplier SKU</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:45px'>Qty</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:45px'>MRP</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:45px'>Price</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:45px'>Tax</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:80px;font-size:1.2em;font-weight:bold'>Total(inc taxes)</td></tr>";
				
	var table_rows=table_header;
	var counter=0;
	
	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		var item_desc=form.elements[1].value;
		var item_name=form.elements[0].value;
		var quantity=""+form.elements[2].value;
		var supplier_sku=form.elements[4].value;
		var mrp=form.elements[5].value;
		var price=form.elements[6].value;
		var tax_rate=form.elements[8].value;		
		var total=form.elements[10].value;

		table_rows+="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+counter+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+item_desc+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+item_name+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+supplier_sku+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+quantity+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+mrp+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+price+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+tax_rate+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;font-size:1.2em;font-weight:bold;'>"+total+"</td></tr>";
	});
	
	var row_count=$(table_element).find('tbody>tr').length;
	var rows_to_add=9-row_count;
	for(var i=0;i<rows_to_add;i++)
	{
		table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	}

	var table_foot=document.getElementById(form_id+'_foot');
	var total_quantity=$(table_foot).find('tr>td:first')[0].innerHTML;
	var total_text=$(table_foot).find('tr>td:nth-child(2)')[0].innerHTML;
	var total_amount=$(table_foot).find('tr>td:nth-child(3)')[0].innerHTML;
	
	var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
				"<td colspan='4' style='border: 1px solid #000;text-align:left;'>"+total_quantity+"</td>"+
				"<td colspan='3' style='border: 1px solid #000;text-align:left;'>"+total_text+"</td>"+
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
	//header.appendChild(business_intro);
	header.appendChild(business_contact);
	
	info_section.appendChild(customer_info);
	info_section.appendChild(business_info);
	
	footer.appendChild(tandc);
	footer.appendChild(signature);
	
	func(container);
}


/**
 * @form Create Sale order
 * @formNo 69
 */
function form69_print_form()
{
	print_tabular_form('form69','Sale Order');
}


/**
 * @form Create bills
 * @formNo 72
 */
function form72_print_form()
{	
	print_form72(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
* This function prepares the printing template for the documents like bills and purchase orders
*/
function print_form72(func)
{
	var form_id='form72';
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_intro=document.createElement('div');
		var business_contact=document.createElement('div');
	
	var info_section=document.createElement('div');	

	var table_container=document.createElement('div');

	var footer=document.createElement('div');

	////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;min-height:100px;text-align:center');
	//	business_intro.setAttribute('style','width:100%;text-align:center');
		business_contact.setAttribute('style','width:100%;text-align:center');
	info_section.setAttribute('style','width:100%;min-height:80px;text-align:left;margin:5px;');
	footer.setAttribute('style','width:100%;min-height:100px;text-align:center;margin:10px 5px;');

	///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var logo_image=get_session_var('logo');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');
	
	var master_form=document.getElementById(form_id+'_master');
	var customer_name=master_form.elements['customer'].value;
	var date=master_form.elements['date'].value;	
	var bill_num=master_form.elements['bill_num'].value;
	var vat_no=get_session_var('vat');
	var st_no=get_session_var('service_tax_no');
	
	var show_sub_totals=master_form.elements['sub_totals'];
		
	var bill_message=get_session_var('bill_message').replace(/\n/g,"<br>");
	
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	//business_intro.innerHTML=get_session_var('business_intro');
	business_contact.innerHTML="<hr style='border: 1px solid #00f;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email+"<br>VAT #: "+vat_no+"S.Tax #: "+st_no;
	
	var info_section_text="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>Invoice No: "+bill_num+"</b></div><hr style='border: 1px solid #00f;'>"+
							"<b>For: </b>"+customer_name+
							"<br>Date: "+date;
/*	
	if(show_sub_totals.checked)	
	{
		info_section_text+="<br>VAT #: "+vat_no;
	}
*/	
	info_section.innerHTML=info_section_text;
	footer.innerHTML=bill_message;
	
	var table_element=document.getElementById(form_id+'_body');
	
	/////////////adding new table //////////////////////////////////////////////////////	
	var new_table=document.createElement('table');
	new_table.setAttribute('style','border:none;width:100%;font-size:14px;text-align:left;');
	
	var table_header_service="<tr style='border-top: 1px solid #000000;border-bottom: 1px solid #000000;'>"+
				"<td style='text-align:left;width:130px;wrap:break-word'>Service</td>"+
				"<td style='text-align:left;width:45px'>Qty</td>"+
				"<td style='text-align:left;width:80px'>Total</td></tr>";

	var table_header_product="<tr style='border-top: 1px solid #000000;border-bottom: 1px solid #000000;'>"+
				"<td style='text-align:left;width:130px;wrap:break-word'>Item</td>"+
				"<td style='text-align:left;width:45px'>Qty</td>"+
				"<td style='text-align:left;width:80px'>Total</td></tr>";

	var table_rows_service=table_header_service;
	var table_rows_product=table_header_product;
	var counter_service=0;
	var counter_product=0;
	var total_items=0;
	var total_amount=0;
	var total_vat=0;
	var total_st=0;
	var master_total=0;
	
	$(table_element).find('form').each(function(index)
	{
		var form=$(this)[0];
		var item_name=form.elements[1].value;
		var batch=form.elements[2].value;
		var quantity=""+form.elements[3].value;
		var price=form.elements[4].value;
		var amount=form.elements[5].value;
		var tax=form.elements[7].value;
		var total=form.elements[8].value;
		
		if(batch=='NA')
		{
			counter_service+=1;
			
			total_items+=parseFloat(form.elements[3].value);			
			total_amount+=parseFloat(form.elements[5].value);
			total_st+=parseFloat(form.elements[7].value);
			master_total+=parseFloat(form.elements[8].value);
			
			table_rows_service+="<tr>"+
					"<td style='text-align:left;'>"+item_name+"</td>"+
					"<td style='text-align:left;'>"+quantity+"</td>"+
					"<td style='text-align:left;'>"+total+"</td></tr>";
		}
		else 
		{
			counter_product+=1;
			
			total_items+=parseFloat(form.elements[3].value);
			total_amount+=parseFloat(form.elements[5].value);
			total_vat+=parseFloat(form.elements[7].value);
			master_total+=parseFloat(form.elements[8].value);
			
			table_rows_product+="<tr>"+
					"<td style='text-align:left;'>"+item_name+"</td>"+
					"<td style='text-align:left;'>"+quantity+"</td>"+
					"<td style='text-align:left;'>"+total+"</td></tr>";

		}
	});
	
	total_amount=my_round(total_amount,2);
	total_vat=my_round(total_vat,2);
	total_st=my_round(total_st,2);
	master_total=my_round(master_total,0);
	
	var row_count=$(table_element).find('tbody>tr').length;
	var rows_to_add=5-row_count;
	for(var i=0;i<3;i++)
	{
		table_rows_service+="<tr style='flex:2;height:20px;'><td></td><td></td><td></td></tr>";
	}
	for(var i=0;i<rows_to_add;i++)
	{
		table_rows_product+="<tr style='flex:2;height:20px;'><td></td><td></td><td></td></tr>";
	}

	var table_foot=document.getElementById(form_id+'_foot');
	
	var display_total="Total:";
	var display_total_amount="Rs. "+master_total;
	
	if(show_sub_totals.checked)
	{
		display_total="Amount:<br>VAT: <br>S. Tax:<br>Total:";
		display_total_amount="Rs. "+total_amount+"<br>Rs. "+total_vat+"<br>Rs. "+total_st+"<br>Rs. "+master_total;

		if(counter_service==0)
		{
			display_total="Amount:<br>VAT: <br>Total:";
			display_total_amount="Rs. "+total_amount+"<br>Rs. "+total_vat+"<br>Rs. "+master_total;
		}

		if(counter_product==0)
		{
			display_total="Amount:<br>S. Tax:<br>Total:";
			display_total_amount="Rs. "+total_amount+"<br>Rs. "+total_st+"<br>Rs. "+master_total;
		}
		
		if(counter_service==0 && counter_product==0)
		{
			display_total="Amount:<br>Tax:<br>Total:";
			display_total_amount="Rs. "+total_amount+"<br>Rs. 0<br>Rs. "+master_total;
		}
	}
	
	//console.log(total_amount);
	var table_foot_row="<tr style='border-top: 1px solid #000000;border-bottom: 1px solid #000000;'>"+
				"<td style='text-align:left;'>Total bill Items:"+total_items+"</td>"+
				"<td style='text-align:left;'>"+display_total+"</td>"+
				"<td style='text-align:left;'>"+display_total_amount+"</td></tr>";
	//console.log(table_foot_row);
	var table_rows="";
	if(counter_service>0)
	{
		table_rows+=table_rows_service;
	}

	if(counter_product>0)
	{
		table_rows+=table_rows_product;
	}
		
	table_rows+=table_foot_row;
	new_table.innerHTML=table_rows;
	
	/////////////placing the containers //////////////////////////////////////////////////////	
	
	container.appendChild(header);
	container.appendChild(info_section);
	
	container.appendChild(new_table);
	
	container.appendChild(footer);
	
	header.appendChild(logo);
	//header.appendChild(business_intro);
	header.appendChild(business_contact);
	
	func(container);
}

/**
 * @form Scan items(multi-register)
 * @formNo 82
 */
function form82_print_form()
{
	print_tabular_form('form82','Sale Bill');
}

/**
 * @form Create bills(multi-register)
 * @formNo 91
 */
function form91_print_form()
{	
	print_form91(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
 * @form Create bills(multi-register)
 * @formNo 91
 */
function print_form91(func)
{
	var form_id='form91';
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var invoice_info=document.createElement('div');
		var business_title=document.createElement('div');
		var business_contact=document.createElement('div');
		
	var info_section=document.createElement('div');	
		var customer_info=document.createElement('div');
		var business_info=document.createElement('div');

	var table_container=document.createElement('div');

	var footer=document.createElement('div');
		var tandc=document.createElement('div');
		var signature=document.createElement('div');

////////////setting styles for containers/////////////////////////

	header.setAttribute('style','border: 1px solid #000000;width:98%;min-height:100px;text-align:center');
		invoice_info.setAttribute('style','margin:5px;width:98%;text-align:center');
		business_title.setAttribute('style','margin:5px;width:100%;text-align:center;font-size:24px;');
		business_contact.setAttribute('style','width:100%;text-align:center;');
	info_section.setAttribute('style','width:98%;min-height:100px');
		customer_info.setAttribute('style','padding:5px;float:left;width:48%;height:100px;border: 1px solid #000;');
		business_info.setAttribute('style','padding:5px;float:right;width:48%;height:100px;border: 1px solid #000;');
	footer.setAttribute('style','margin:10px;width:98%;min-height:100px');
		tandc.setAttribute('style','float:left;width:44%;min-height:60px');
		signature.setAttribute('style','float:right;width:54%;min-height:60px;text-align:right;');

///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	//var font_size=get_session_var('print_size');
	//var logo_image=get_session_var('logo');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');

	var master_form=document.getElementById(form_id+'_master');
	var customer_name=master_form.elements['customer'].value;
	var date=master_form.elements['date'].value;
	var channel=master_form.elements['channel'].value;	
	var bill_type=master_form.elements['bill_type'].value;
	var order_no=master_form.elements['order_num'].value;
	var bill_num=master_form.elements['bill_num'].value;
	var po_num=master_form.elements['order_num'].value;
	var po_date=get_my_past_date(master_form.elements['po_date'].value);
	var customer_address=document.getElementById('form91_customer_info').innerHTML;
	var customer_tin=master_form.elements['customer_tin'].value;
	var tin_no=get_session_var('tin');
		
	var tandc_text=get_session_var('bill_message');
	var signature_text="<br>for "+bt+"<br><br><br>Authorised Signatory<br>";
	
	////////////////filling in the content into the containers//////////////////////////

	if(bill_type=="Tax")	
	{
		invoice_info.innerHTML="TAX INVOICE";
	}
	else 
	{
		invoice_info.innerHTML="RETAIL INVOICE";
	}

	business_title.innerHTML=bt;
	business_contact.innerHTML=business_address+"<br>Tel: "+business_phone+" emial: "+business_email;
	
	customer_info.innerHTML=customer_name+"<br>"+customer_address+"<br>TIN #:"+customer_tin;
	business_info.innerHTML="Invoice #: "+bill_num+"<br>Dated: "+date+"<br>PO #: "+po_num+"<br>PO Date: "+po_date+"<br>TIN: "+tin_no;
	
	tandc.innerHTML="<b><u>Terms and Conditions</u></b><br>"+tandc_text;
	signature.innerHTML=signature_text;

	var table_element=document.getElementById(form_id+'_body');
	
	/////////////adding new table //////////////////////////////////////////////////////	
	var new_table=document.createElement('table');
	new_table.setAttribute('style','width:98%;font-size:12px;border:1px solid black;text-align:left;');
	var table_header="<thead style='border:1px solid #000000;'><tr>"+
				"<td style='text-align:left;width:30px;'>S.No.</td>"+
				"<td style='text-align:left;width:60px;'>SKU</td>"+
				"<td style='text-align:left;width:100px'>Item Name</td>"+
				"<td style='text-align:left;width:60px'>Batch</td>"+
				"<td style='text-align:left;width:45px'>Qty</td>"+
				"<td style='text-align:left;width:45px'>MRP</td>"+
				"<td style='text-align:left;width:45px'>Price</td>"+
				"<td style='text-align:left;width:45px'>Amount</td>"+
				"<td style='text-align:left;width:45px'>Tax%</td>"+
				"<td style='text-align:left;width:45px'>Freight</td>"+
				"<td style='text-align:left;width:80px'>Total</td></tr></thead>";
				
	var table_rows=table_header+"<tbody style='border: 1px solid #000000;'>";
	var counter=0;
	
	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		var sku=form.elements[0].value;
		var item_name=form.elements[1].value;
		var batch=form.elements[2].value;
		var quantity=""+form.elements[3].value;
		var mrp=""+form.elements[4].value;
		var price=form.elements[5].value;
		var tax_rate=form.elements[11].value;		
		var amount=form.elements[7].value;		
		var tax=form.elements[8].value;		
		var total=form.elements[9].value;
		var freight=form.elements[6].value;

		table_rows+="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;'>"+
				"<td style='text-align:left;'>"+counter+"</td>"+
				"<td style='text-align:left;word-wrap: break-word;'>"+sku+"</td>"+
				"<td style='text-align:left;word-wrap: break-word;'>"+item_name+"</td>"+
				"<td style='text-align:left;word-wrap: break-word;'>"+batch+"</td>"+
				"<td style='text-align:left;'>"+quantity+"</td>"+
				"<td style='text-align:left;'>"+mrp+"</td>"+
				"<td style='text-align:left;'>"+price+"</td>"+
				"<td style='text-align:left;'>"+amount+"</td>"+
				"<td style='text-align:left;'>"+tax_rate+"</td>"+
				"<td style='text-align:left;'>"+freight+"</td>"+
				"<td style='text-align:left;'>"+total+"</td></tr>";
	});
	
	var row_count=$(table_element).find('tbody>tr').length;
	var rows_to_add=15-row_count;
	for(var i=0;i<rows_to_add;i++)
	{
		table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	}

	table_rows+="</tbody>";
	
	var bill_total=document.getElementById('form91_final_total').innerHTML;
	var wording_total=number2text(bill_total);
	
	var against_c_form="";
	if(bill_type=='Retail-CST-C')
	{
		against_c_form="<br>Against C-Form";
	}

	var table_foot=document.getElementById(form_id+'_foot');
	var total_quantity=$(table_foot).find('tr>td:first')[0].innerHTML;
	var total_text=$(table_foot).find('tr>td:nth-child(2)')[0].innerHTML;
	var total_amount=$(table_foot).find('tr>td:nth-child(3)')[0].innerHTML;
	
	var table_foot_row="<tfoot style='border: 1px solid #000000;'><tr>"+
				"<td colspan='6' style='text-align:left;'>"+wording_total+"<br>"+total_quantity+against_c_form+"</td>"+
				"<td colspan='3' style='text-align:left;'>"+total_text+"</td>"+
				"<td colspan='2' style='text-align:left;'>"+total_amount+"</td></tr></tfoot>";
		
	table_rows+=table_foot_row;
	new_table.innerHTML=table_rows;
	
	/////////////placing the containers //////////////////////////////////////////////////////	
	
	container.appendChild(header);
	container.appendChild(info_section);
	
	container.appendChild(new_table);
	container.appendChild(footer);
	
	header.appendChild(invoice_info);
	header.appendChild(business_title);
	header.appendChild(business_contact);
	
	info_section.appendChild(customer_info);
	info_section.appendChild(business_info);
	
	footer.appendChild(tandc);
	footer.appendChild(signature);
	
	func(container);
}

/**
 * @form Create bills(multi-register, unbilled items)
 * @formNo 119
 */
function form119_print_form()
{
	var new_thead="<tr>"+
				"<th>Make</th>"+
				"<th colspan='2'>Item</th>"+
				"<th>Batch</th>" +
				"<th>Expiry</th>" +
				"<th>Qty.</th>" +
				"<th>Free</th>"+
				"<th>S. Price</th>"+
				"<th>MRP</th>"+
				"<th>Amount</th>" +
				"<th>Tax</th>" +
				"<th></th>"+
				"</tr>";
	var table_element=document.getElementById('form119_body').parentNode;
	var table_copy=table_element.cloneNode(true);
	$(table_copy).find('datalist,form').remove();
	
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).attr('value',$(this).val());
	});
	
	var tbody=table_copy.children[1].innerHTML;
	var new_tbody=tbody.replace(/<br>/g,'</td><td>');
	
	var tfoot=table_copy.children[2].innerHTML;
	var new_tfoot=tfoot.replace(/<td>/g,"<td colspan='2'>");
	var new_tfoot=new_tfoot.replace(/<td colspan='3'/g,"<td colspan='7'");
	var new_tfoot=new_tfoot.replace(/<td colspan=\"3\"/g,"<td colspan='7'");
	
	//console.log(tbody);
	table_copy.children[0].innerHTML=new_thead;
	table_copy.children[1].innerHTML=new_tbody;
	table_copy.children[2].innerHTML=new_tfoot;
	
	
	var single_bill_items=parseInt(get_session_var('bill_print_items'));
	var rows=table_copy.children[1].children.length;

	for(var i=0;i<rows;i++)
	{
		table_copy.children[1].children[i].children[1].setAttribute('colspan','2');
	}
	
	while(rows>0)
	{
		var new_table_copy=table_copy.cloneNode(true);
		
		for(var j=single_bill_items;j<rows;j++)
		{
			new_table_copy.children[1].removeChild(new_table_copy.children[1].children[single_bill_items]);
		}
		for(var i=0;i<single_bill_items && i<rows;i++)
		{
			table_copy.children[1].removeChild(table_copy.children[1].children[0]);
		}
		rows=table_copy.children[1].children.length;
		print_tabular_form('form119','Sale Bill',new_table_copy);
	}
}

/**
 * @form Enter supplier bill (unbilled items)
 * @formNo 122
 */
function form122_print_form()
{	
	print_form122(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
 * @form Enter Supplier bills
 * @formNo 122
 */
function print_form122(func)
{
	var form_id='form122';
	
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var invoice_info=document.createElement('div');
		var business_title=document.createElement('div');
		var business_contact=document.createElement('div');
	
			
	var info_section=document.createElement('div');	
		var supplier_info=document.createElement('div');
		var business_info=document.createElement('div');

	var accepted_section=document.createElement('div');
	var rejected_section=document.createElement('div');

	var footer=document.createElement('div');
		var tandc=document.createElement('div');
		var signature=document.createElement('div');

////////////setting styles for containers/////////////////////////

	header.setAttribute('style','border: 1px solid #000000;width:98%;min-height:100px;text-align:center');
		invoice_info.setAttribute('style','margin:5px;width:98%;text-align:center');
		business_title.setAttribute('style','margin:5px;width:100%;text-align:center;font-size:24px;');
		business_contact.setAttribute('style','width:100%;text-align:center;');
	info_section.setAttribute('style','width:98%;min-height:100px');
		supplier_info.setAttribute('style','padding:5px;float:left;width:48%;height:100px;border: 1px solid #000;');
		business_info.setAttribute('style','padding:5px;float:right;width:48%;height:100px;border: 1px solid #000;');
	accepted_section.setAttribute('style','margin:20px;width:98%;text-align:center');
	rejected_section.setAttribute('style','margin:20px;width:98%;text-align:center');
		
	footer.setAttribute('style','margin:10px;width:98%;min-height:100px');
		tandc.setAttribute('style','float:left;width:44%;min-height:60px');
		signature.setAttribute('style','float:right;width:54%;min-height:60px;text-align:right;');

///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	//var font_size=get_session_var('print_size');
	//var logo_image=get_session_var('logo');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');

	var master_form=document.getElementById(form_id+'_master');
	var supplier_name=master_form.elements['supplier'].value;
	var date=master_form.elements['bill_date'].value;
	var bill_num=master_form.elements['bill_num'].value;
	var po_num=master_form.elements['po_num'].value;
	var tin_no=get_session_var('tin');
		
	var tandc_text=get_session_var('grn_message');
	var signature_text="<br>for "+bt+"<br><br><br>Authorised Signatory<br>";
	
	////////////////filling in the content into the containers//////////////////////////

	invoice_info.innerHTML="Goods Receiving Note";
	accepted_section.innerHTML="QC ok / Accepted";
	rejected_section.innerHTML="QC failed / Rejected";

	business_title.innerHTML=bt;
	business_contact.innerHTML=business_address+"<br>Tel: "+business_phone+" emial: "+business_email;
	
	supplier_info.innerHTML=supplier_name+"<br>";
	business_info.innerHTML="Invoice #: "+bill_num+"<br>Dated: "+date+"<br>PO #: "+po_num+"<br>";
	
	tandc.innerHTML="<b><u>Terms and Conditions</u></b><br>"+tandc_text;
	signature.innerHTML=signature_text;

	var table_element=document.getElementById(form_id+'_body');
	
	/////////////adding new table //////////////////////////////////////////////////////	
	var new_table1=document.createElement('table');
	var new_table2=document.createElement('table');
	new_table1.setAttribute('style','width:98%;font-size:12px;border:1px solid black;text-align:left;');
	new_table2.setAttribute('style','width:98%;font-size:12px;border:1px solid black;text-align:left;');
	
	var table_header="<thead style='border:1px solid #000000;'><tr>"+
				"<td style='text-align:left;width:30px;'>S.No.</td>"+
				"<td style='text-align:left;width:60px;'>SKU</td>"+
				"<td style='text-align:left;width:100px'>Item Name</td>"+
				"<td style='text-align:left;width:60px'>Batch</td>"+
				"<td style='text-align:left;width:45px'>Qty</td>"+
				"<td style='text-align:left;width:45px'>MRP</td>"+
				"<td style='text-align:left;width:45px'>Price</td>"+
				"<td style='text-align:left;width:45px'>Amount</td>"+
				"<td style='text-align:left;width:45px'>Tax</td>"+
				"<td style='text-align:left;width:80px'>Total</td></tr></thead>";
				
	var table_rows1=table_header+"<tbody style='border: 1px solid #000000;'>";
	var table_rows2=table_header+"<tbody style='border: 1px solid #000000;'>";
	var counter1=0;
	var counter2=0;
	var total_accepted_quantity=0;
	var total_rejected_quantity=0;
	
	$(table_element).find('form').each(function(index)
	{
		var form=$(this)[0];
		var sku=form.elements[1].value;
		var item_name=form.elements[2].value;
		var batch=form.elements[3].value;
		var quantity=""+form.elements[4].value;
		var mrp=""+form.elements[5].value;
		var price=form.elements[6].value;
		var amount=form.elements[7].value;		
		var tax=form.elements[8].value;
		var selection=form.elements[12].value;		
		var total=parseFloat(amount)+parseFloat(tax);

		if(selection=='accepted')
		{
			counter1+=1;
			total_accepted_quantity+=parseFloat(quantity);
			table_rows1+="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;'>"+
				"<td style='text-align:left;'>"+counter1+"</td>"+
				"<td style='text-align:left;word-wrap: break-word;'>"+sku+"</td>"+
				"<td style='text-align:left;word-wrap: break-word;'>"+item_name+"</td>"+
				"<td style='text-align:left;word-wrap: break-word;'>"+batch+"</td>"+
				"<td style='text-align:left;'>"+quantity+"</td>"+
				"<td style='text-align:left;'>"+mrp+"</td>"+
				"<td style='text-align:left;'>"+price+"</td>"+
				"<td style='text-align:left;'>"+amount+"</td>"+
				"<td style='text-align:left;'>"+tax+"</td>"+
				"<td style='text-align:left;'>"+total+"</td></tr>";
		}
		else 
		{
			counter2+=1;
			total_rejected_quantity+=parseFloat(quantity);
			table_rows2+="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;'>"+
				"<td style='text-align:left;'>"+counter2+"</td>"+
				"<td style='text-align:left;word-wrap: break-word;'>"+sku+"</td>"+
				"<td style='text-align:left;word-wrap: break-word;'>"+item_name+"</td>"+
				"<td style='text-align:left;word-wrap: break-word;'>"+batch+"</td>"+
				"<td style='text-align:left;'>"+quantity+"</td>"+
				"<td style='text-align:left;'>"+mrp+"</td>"+
				"<td style='text-align:left;'>"+price+"</td>"+
				"<td style='text-align:left;'>"+amount+"</td>"+
				"<td style='text-align:left;'>"+tax+"</td>"+
				"<td style='text-align:left;'>"+total+"</td></tr>";
		}		
	});
	
	var row_count=$(table_element).find('tbody>tr').length;
	var rows_to_add1=12-counter1;
	for(var i=0;i<rows_to_add1;i++)
	{
		table_rows1+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	}

	var rows_to_add2=3-counter2;
	for(var i=0;i<rows_to_add2;i++)
	{
		table_rows2+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	}

	table_rows1+="</tbody>";	
	table_rows2+="</tbody>";	

	var table_foot=document.getElementById(form_id+'_foot');
	var total_text=$(table_foot).find('tr>td:nth-child(2)')[0].innerHTML;
	var total_amount=$(table_foot).find('tr>td:nth-child(3)')[0].innerHTML;
	
	var table_foot_row1="<tfoot style='border: 1px solid #000000;'><tr>"+
				"<td colspan='5' style='text-align:left;'>Total Accepted Quantity: "+total_accepted_quantity+"</td>"+
				"<td colspan='3' style='text-align:left;'>"+total_text+"</td>"+
				"<td colspan='2' style='text-align:left;'>"+total_amount+"</td></tr></tfoot>";

	var table_foot_row2="<tfoot style='border: 1px solid #000000;'><tr>"+
				"<td colspan='10' style='text-align:left;'>Total Rejected Quantity: "+total_rejected_quantity+"</td>"+
				"</tr></tfoot>";
		
	table_rows1+=table_foot_row1;
	table_rows2+=table_foot_row2;
	
	new_table1.innerHTML=table_rows1;
	new_table2.innerHTML=table_rows2;
	
	/////////////placing the containers //////////////////////////////////////////////////////	
	
	container.appendChild(header);
	container.appendChild(info_section);
	
	container.appendChild(accepted_section);
	
	container.appendChild(new_table1);
	
	container.appendChild(rejected_section);

	container.appendChild(new_table2);
	container.appendChild(footer);
	
	header.appendChild(invoice_info);
	header.appendChild(business_title);
	header.appendChild(business_contact);
	
	info_section.appendChild(supplier_info);
	info_section.appendChild(business_info);
	
	footer.appendChild(tandc);
	footer.appendChild(signature);
	
	func(container);
}


/**
 * @form Job Orders
 * @formNo 130
 */
function form130_print_form()
{
	print_tabular_form('form130','Job Order');
}


/**
 * @form Service Request - budgeting
 */
function form151_print_form()
{
	var container=document.createElement('div');
	var business_title=document.createElement('div');
	var title=document.createElement('div');
	var bill_message=document.createElement('div');
	var signature=document.createElement('div');
	var footer=document.createElement('div');
	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	signature.innerHTML="<div style='float:right;text-align:left;display:block;width:30%;font-size:"+font_size+"em'><b>Signature: </b></div>";
	bill_message.innerHTML="<div style='float:left;text-align:left;display:block;width:60%;font-size:"+font_size+"em'><textarea style='border:none;width:100%;height:100px;'>"+get_session_var('bill_message')+"</textarea></div>";
	title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.2em;margin:2px;'><b>Service Request Bill</b></div>";
	
	business_title.innerHTML="<div style='display:block;font-size:1.5em;float:left;'><b>"+bt+"</b><br>" +
							"<div style='font-size:"+font_size+"em;padding:5px'>VAT #: "+get_session_var('vat')+"<br>" +
							"TIN #: "+get_session_var('tin')+"</div></div>"+
							"<div style='display:block;float:right;'><div>Contact No: "+get_session_var('phone') +
							"<br>Address: "+get_session_var('address')+"</div></div>";
	business_title.setAttribute('style',"height:80px;padding:1%;border:2px solid black;border-bottom:none;font-size:"+font_size+"em");
	
	var form_master="form151_master";
	var header_element=document.getElementById(form_master);
	$(header_element).find("textarea").each(function(index)
	{
		$(this).attr('value',$(this).val());
	});	

	var header_copy=header_element.cloneNode(true);
	$(header_copy).find("a").remove();
	$(header_copy).find("input[type=hidden],input[type=button],input[type=submit],img").remove();
	$(header_copy).find("input").each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
	$(header_copy).find("textarea").each(function(index)
	{
		$(this).replaceWith($(this).attr('value'));
	});
	
	var table_task_element=document.getElementById('form151_task_body').parentNode;
	var table_item_element=document.getElementById('form151_item_body').parentNode;
	var table_expense_element=document.getElementById('form151_expense_body').parentNode;
	table_task_copy=table_task_element.cloneNode(true);
	table_item_copy=table_item_element.cloneNode(true);
	table_expense_copy=table_expense_element.cloneNode(true);
	
	table_task_copy.removeAttribute('class');
	table_item_copy.removeAttribute('class');
	table_expense_copy.removeAttribute('class');
	
	$(table_task_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child,v1").remove();
	$(table_item_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child,v1").remove();
	$(table_expense_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child,v1").remove();
	
	$(table_task_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
	$(table_item_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
	$(table_expense_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
	
	$(table_task_copy).find('label').each(function(index)
	{
		$(this).replaceWith($(this).html());
	});
	$(table_item_copy).find('label').each(function(index)
	{
		$(this).replaceWith($(this).html());
	});
	$(table_expense_copy).find('label').each(function(index)
	{
		$(this).replaceWith($(this).html());
	});
	
	$(table_task_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	$(table_item_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	$(table_expense_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	header_copy.setAttribute('style',"padding:1%;font-size:"+font_size+"em;border:2px solid black;");

	var line_break1=document.createElement('br');
	var line_break2=document.createElement('br');
		
	container.appendChild(title);
	container.appendChild(business_title);
	container.appendChild(header_copy);
	container.appendChild(table_task_copy);
	container.appendChild(line_break1);	
	container.appendChild(table_item_copy);
	container.appendChild(line_break2);
	container.appendChild(table_expense_copy);
	footer.appendChild(bill_message);
	footer.appendChild(signature);
	container.appendChild(footer);
	$.print(container);
}


/**
 * @form Prepare Quotation
 * @formNo 153
 */
function form153_print_form()
{	
	print_form153(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});
}

/**
 * @form Prepare Quotation
 * @formNo 153
 */
function print_form153(func)
{
	var form_id='form153';

	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_intro=document.createElement('div');
		var business_contact=document.createElement('div');

	var customer_info=document.createElement('div');
	
	var quotation_intro=document.createElement('div');
		//var subject=document.createElement('div');
		var intro=document.createElement('div');

	var table_container=document.createElement('div');

	var footer=document.createElement('div');
		var tandc=document.createElement('div');
		var signature=document.createElement('div');

////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;min-height:100px;text-align:center');
	business_intro.setAttribute('style','width:100%;text-align:center');
	business_contact.setAttribute('style','width:100%;text-align:center');
	customer_info.setAttribute('style','width:100%;height:60px');
	quotation_intro.setAttribute('style','width:100%;min-height:60px');
	footer.setAttribute('style','width:100%;min-height:100px');

///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	var logo_image=get_session_var('logo');
	var business_intro_text=get_session_var('business_intro');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');
	var business_website=get_session_var('website');

	var master_form=document.getElementById('form153_master');
	var customer_name=master_form.elements[1].value;
	var customer_address1=document.getElementById('form153_customer_info').innerHTML;
	var customer_address=customer_address1.replace("Address<br>","");
	var date=master_form.elements[3].value;	
	
	//var subject_text="Subject: Quotation for supply of light and sound equipment";
	var intro_text=master_form.elements[4].value;
	
	var tandc_text=get_session_var('quot_message');
	var signature_text="<br>Thanking You.<br><br><br>Yours faithfully,<br>"+bt;
	
////////////////filling in the content into the containers/////////////////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	business_intro.innerHTML="<hr style='border: 1px solid #000;'>"+business_intro_text+"<hr style='border: 1px solid #000;'>";
	business_contact.innerHTML=business_address+" Tel: "+business_phone+" E-Mail: "+business_email+" Website: "+business_website+"<hr style='border: 1px solid #000;'>";
	
	customer_info.innerHTML="<div style='width:70%;float:left;'>To<br>"+customer_name+"<br>"+customer_address+"</div><div style='width:30%;float:right;'>Date: "+date+"</div>";
	
	//subject.innerHTML="<br>"+subject_text;
	var new_intro_text=intro_text.replace(/\n/g,"<br>");
	intro.innerHTML=new_intro_text+"<br><br>";	
	
	tandc.innerHTML="<br><b>Terms and Conditions</b><br>"+tandc_text;
	signature.innerHTML=signature_text;
	
		
	var table_element=document.getElementById('form153_body').parentNode;
	
	$(table_element).find('textarea').each(function(index)
	{
		$(this).attr('value',$(this).val());
	});

	
	table_copy=table_element.cloneNode(true);
	
	table_copy.removeAttribute('class');
	$(table_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child,v1").remove();
	
	$(table_copy).find('input[type=number]').each(function(index)
	{
		$(this).replaceWith(Math.round($(this).val()).toFixed(2));
	});	
	$(table_copy).find('input').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
	$(table_copy).find('textarea').each(function(index)
	{
		$(this).replaceWith($(this).attr('value'));
	});
		
	$(table_copy).find('label').each(function(index)
	{
		$(this).replaceWith($(this).html());
	});
	
	$(table_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	
/////////////placing the containers //////////////////////////////////////////////////////	
	
	container.appendChild(header);
	container.appendChild(customer_info);
	container.appendChild(quotation_intro);
	container.appendChild(table_copy);
	container.appendChild(footer);
	
	header.appendChild(logo);
	header.appendChild(business_intro);
	header.appendChild(business_contact);
	
	//quotation_intro.appendChild(subject);
	quotation_intro.appendChild(intro);
	
	footer.appendChild(tandc);
	footer.appendChild(signature);
	
	func(container);
}


/**
 * @form Create Bill (DLM)
 * @formNo 154
 */
function form154_print_form()
{
	var form_id='form154';
	
////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_intro=document.createElement('div');
		var business_contact=document.createElement('div');
	
	var invoice_line=document.createElement('div');
	
	var info_section=document.createElement('div');	
		var customer_info=document.createElement('div');
		var business_info=document.createElement('div');

	var table_container=document.createElement('div');

	var footer=document.createElement('div');
		var tandc=document.createElement('div');
		var signature=document.createElement('div');

////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;min-height:100px;text-align:center');
		business_intro.setAttribute('style','width:100%;text-align:center;');
		business_contact.setAttribute('style','width:100%;text-align:center;');
	info_section.setAttribute('style','width:100%;min-height:60px');
		customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:46%;height:90px;border: 1px solid #000;border-radius:5px;');
		business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:46%;height:90px;border: 1px solid #000;border-radius:5px;');
	footer.setAttribute('style','width:100%;min-height:100px');
		tandc.setAttribute('style','float:left;width:60%;min-height:50px');
		signature.setAttribute('style','float:right;width:30%;min-height:60px');

///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	var logo_image=get_session_var('logo');
	var business_intro_text=get_session_var('business_intro');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');
	var business_website=get_session_var('website');

	var master_form=document.getElementById('form154_master');
	var customer_name=master_form.elements['customer'].value;
	var customer_address1=document.getElementById('form154_customer_info').innerHTML;
	var customer_address=customer_address1.replace("Address<br>","");
	var date=master_form.elements['date'].value;
	var narration=master_form.elements['narration'].value;
	var invoice_no=master_form.elements['bill_num'].value;
	var customer_cst=master_form.elements['cst'].value;	
	var customer_tin=master_form.elements['tin'].value;
	var tin_no=get_session_var('tin');
	var sales_tax_no=get_session_var('sales_tax_no');	
	var service_tax_no=get_session_var('service_tax_no');	
	var tax_text="Tin No: "+tin_no;
	var hiring=false;
	var a1_job=false;
	if(master_form.elements['job'].checked)
		a1_job=true;
	var c_form=false;
	if(master_form.elements['cform'].checked)
		c_form=true;

	var bill_total=parseFloat(master_form.elements['bill_total'].value);

	var invoice_text="Invoice";
	if(master_form.elements['bill_type'].value=='Retail')
	{
		invoice_text="Retail Invoice";
	}
	else if(master_form.elements['bill_type'].value=='Tax')
	{
		invoice_text="Tax Invoice";
	}
	else if(master_form.elements['bill_type'].value=='Hiring')
	{
		hiring=true;
		tax_text="Service Tax no: "+service_tax_no;	
	}
	else
	{
		tax_text="Service Tax no: "+service_tax_no;
	}
	var tandc_text=get_session_var('bill_message');
	var signature_text="<br>For "+bt+"<br><br><br>Auth. Signatory<br>";
	
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	business_intro.innerHTML="<hr style='border: 1px solid #000;margin:2px;'>"+business_intro_text;
	business_contact.innerHTML="<hr style='border: 1px solid #000;margin:2px;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email+" Website: "+business_website;
	
	invoice_line.innerHTML="<hr style='border: 1px solid #000;margin:2px'><div style='text-align:center;'><b style='text-size:1.2em'>"+invoice_text+"</b></div><br>";
	
	if(master_form.elements['bill_type'].value=='Tax' || master_form.elements['bill_type'].value=='Retail')
	{
		customer_info.innerHTML="<b>Customer</b><br>"+customer_name+"<br>"+customer_address+"<br>CST#: "+customer_cst+"<br>TIN#: "+customer_tin;
	}
	else
	{		
		customer_info.innerHTML="<b>Customer</b><br>"+customer_name+"<br>"+customer_address;
	}

	business_info.innerHTML=tax_text+"<br>Date: "+date+"<br>Invoice No: "+invoice_no+"<br>Narration: "+narration;
	
	tandc.innerHTML="<br><b>Terms and Conditions</b><br>"+tandc_text;
	signature.innerHTML=signature_text;

	var table_element=document.getElementById('form154_body').parentNode;
	$(table_element).find('textarea').each(function(index)
	{
		$(this).attr('value',$(this).val());
	});

	table_copy=table_element.cloneNode(true);
	
	table_copy.removeAttribute('class');
	
	var discount_amount=parseFloat(document.getElementById('form154_discount').value);
	if(discount_amount==0)
	{
		var disc_nodes=table_copy.getElementsByTagName('disc');
		var disc_amount_nodes=table_copy.getElementsByTagName('disc_amount');
		disc_nodes[0].parentNode.removeChild(disc_nodes[0]);
		disc_amount_nodes[0].parentNode.removeChild(disc_amount_nodes[0]);
	}

	$(table_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child,form,fresh,v1").remove();
	
	$(table_copy).find('input[type=number]').each(function(index)
	{
		$(this).replaceWith(Math.round($(this).val()).toFixed(2));
	});	

	$(table_copy).find('input').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
	$(table_copy).find('textarea').each(function(index)
	{
		$(this).replaceWith($(this).attr('value'));
	});

	$(table_copy).find('label').each(function(index)
	{
		$(this).replaceWith($(this).html());
	});

	var wording_total=number2text(bill_total);	
	if(hiring)
	{
		var head_html="<tr><form id='form154_header'></form>"+
					"<th style='width:50px'>S.No.</th>"+
					"<th style='width:200px'>Item</th>"+
					"<th>Qty.</th>"+
					"<th>From</th>"+
					"<th>To</th>"+
					"<th>Days</th>"+
					"<th>Rate</th>"+
					"<th>Amount</th>"+
					"</tr>";
		$(table_copy).find('thead').html(head_html);
		var body_html=$(table_copy).find('tbody').html();
		new_body_html=body_html.replace(/f1/g,'td');
		new_body_html=new_body_html.replace(/<td data-th=\"Date\">From:/g,"");
		new_body_html=new_body_html.replace(/<br>To:/g,"");
		new_body_html=new_body_html.replace(/<\/td><\/td>/g,"</td>");
		
		$(table_copy).find('tbody').html(new_body_html);
		$(table_copy).find('tfoot > tr > td:first').attr('colspan','4');
		$(table_copy).find('tfoot > tr > td:nth-child(2)').attr('colspan','2');
		$(table_copy).find('tfoot > tr > td:nth-child(3)').attr('colspan','2');
		$(table_copy).find('tfoot > tr > td:first').html('Total<br>'+wording_total);		
	}
	else 
	{
		$(table_copy).find('tfoot > tr > td:first').attr('colspan','2');
		$(table_copy).find('tfoot > tr > td:nth-child(2)').attr('colspan','2');
		if(c_form)
		{
			$(table_copy).find('tfoot > tr > td:first').html('Total<br>'+wording_total+'<br>Against C-form');
		}
		else
		{
			$(table_copy).find('tfoot > tr > td:first').html('Total<br>'+wording_total);
		}		
	}
	
	if(a1_job)
	{
		var new_table_row="<tr><td>1</td><td>";
		var new_from_date="";
		var new_to_date="";		
		var new_days="";
		var new_amount=0;

		$(table_copy).find('tbody>tr').each(function()
		{
			new_table_row+=$(this).find('td:nth-child(2)').html()+" "+$(this).find('td:nth-child(3)').html()+", ";
			new_from_date=$(this).find('td:nth-child(4)').html();
			new_to_date=$(this).find('td:nth-child(5)').html();
			new_days=$(this).find('td:nth-child(6)').html();
			new_amount+=parseFloat($(this).find('td:nth-child(8)').html());
		});
		new_table_row+="</td><td>1 job</td><td>"+new_from_date+"</td><td>"+new_to_date+"</td><td>"+new_days+"</td><td></td><td>"+new_amount+"</td></tr>";
		$(table_copy).find('tbody').html(new_table_row);
	}
	
	//table_copy.removeAttribute('class');
	//$(table_copy).attr('style','min-height:600px;');
	$(table_copy).find('tbody').attr('style','height:500px;min-height:500px;');
	$(table_copy).find('th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	$(table_copy).find('td').attr('style',"border-right:2px solid black;border-left:2px solid black;text-align:left;font-size:"+font_size+"em");
	$(table_copy).find('tfoot').attr('style',"border:2px solid black;text-align:left;");
	$(table_copy).find("tbody>tr").attr('style','flex:1;height:20px');
	
	if(hiring)
	{
		$(table_copy).find("th:nth-child(3), td:nth-child(3)").css('width','200px');
		$(table_copy).find("th:first, td:first").css('width','40px');
		var row_count=$(table_copy).find('tbody>tr').length;
		var rows_to_add=15-row_count;
		for(var i=0;i<rows_to_add;i++)
		{		
			$(table_copy).find("tbody").append("<tr style='flex:2;border-right:2px solid black;border-left:2px solid black;'><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td></tr>");
		}
	}
	else
	{
		$(table_copy).find("th:first, td:first").css('width','40px');
		$(table_copy).find("th:nth-child(2), td:nth-child(2)").css('width','300px');
		var row_count=$(table_copy).find('tbody>tr').length;
		var rows_to_add=15-row_count;
		for(var i=0;i<rows_to_add;i++)
		{
			$(table_copy).find("tbody").append("<tr style='flex:2;border-right:2px solid black;border-left:2px solid black;'><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td></tr>");
		}
	}
		
	/////////////placing the containers //////////////////////////////////////////////////////	
	
	container.appendChild(header);
	container.appendChild(invoice_line);
	container.appendChild(info_section);
	
	container.appendChild(table_copy);
	container.appendChild(footer);
	
	header.appendChild(logo);
	header.appendChild(business_intro);
	header.appendChild(business_contact);
	
	info_section.appendChild(customer_info);
	info_section.appendChild(business_info);
	
	footer.appendChild(tandc);
	footer.appendChild(signature);
	
	$.print(container);
}



/**
 * @form Create service bills
 * @formNo 194
 */
function print_form194(func)
{
	var form_id='form194';
	
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_title=document.createElement('div');
	
	var invoice_line=document.createElement('div');
	
	var info_section=document.createElement('div');	
		var customer_info=document.createElement('div');

	var table_container=document.createElement('div');

	var footer=document.createElement('div');
		var tandc=document.createElement('div');
		var address=document.createElement('div');

	////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;min-height:100px;');
		business_title.setAttribute('style','float:right;width:50%;text-align:right;');
	invoice_line.setAttribute('style','width:100%;min-height:60px;background-color:#bbbbbb;');
	info_section.setAttribute('style','width:100%;min-height:60px;text-align:left;');
		customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:100%;height:90px;');
	footer.setAttribute('style','width:100%;min-height:100px');
		tandc.setAttribute('style','width:100%;min-height:50px;background-color:#bbbbbb;');
		address.setAttribute('style','width:100%;min-height:50px;text-align:center;');

	///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	var logo_image=get_session_var('logo');
	var business_intro_text=get_session_var('business_intro');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');
	var business_website=get_session_var('website');

	var master_form=document.getElementById(form_id+'_master');
	var customer_name=master_form.elements[1].value;
	var customer_address=master_form.elements['customer_address'].value;
	var date=master_form.elements[4].value;
	var invoice_no=master_form.elements[3].value;
	var service_tax_no=get_session_var('service_tax_no');	
	var tax_text="Service Tax No: "+service_tax_no;

	var tandc_text=get_session_var('bill_message');
	
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	business_title.innerHTML=bt;
	invoice_line.innerHTML="<div style='float:left;width:50%'>Invoice #: "+invoice_no+"</div><div style='float:right;text-align:right;width:50%'>Invoice Date: "+date+"</div>";
	
	//invoice_line.innerHTML="<hr style='border: 1px solid #000;margin:2px'><div style='text-align:center;'><b style='text-size:1.2em'>"+invoice_text+"</b></div><br>";
	
	customer_info.innerHTML="<hr style='border: 1px solid #000;margin:2px'>Customer</b><br>"+customer_name+"<br>"+customer_address+"<hr style='border: 1px solid #000;margin:2px'>";
	
	tandc.innerHTML=tandc_text;
	address.innerHTML=tax_text+" | Address: "+business_address;

	var table_element=document.getElementById(form_id+'_body').parentNode;
	table_copy=table_element.cloneNode(true);
	
	table_copy.removeAttribute('class');
	table_copy.setAttribute('width','1000px');
	$(table_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child,form,fresh").remove();
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
	
	$(table_copy).find('label').each(function(index)
	{
		$(this).replaceWith($(this).html());
	});
		
	$(table_copy).find('tfoot > tr > td:first').attr('colspan','1');
	$(table_copy).find('tfoot > tr > td:nth-child(2)').attr('colspan','2');
	
	
	//table_copy.removeAttribute('class');
	//$(table_copy).attr('style','min-height:600px;');
	$(table_copy).find('tbody').attr('style','height:500px;min-height:500px;');
	$(table_copy).find('th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	$(table_copy).find('td').attr('style',"border-right:2px solid black;border-left:2px solid black;text-align:left;font-size:"+font_size+"em");
	$(table_copy).find('tfoot').attr('style',"border:2px solid black;text-align:left;");
	$(table_copy).find("tbody>tr").attr('style','flex:1;height:30px');
	
	$(table_copy).find("th:first, td:first").css('width','300px');
	var row_count=$(table_copy).find('tbody>tr').length;
	var rows_to_add=15-row_count;
	for(var i=0;i<rows_to_add;i++)
	{
		$(table_copy).find("tbody").append("<tr style='flex:2;border-right:2px solid black;border-left:2px solid black;'><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td></tr>");
	}
	
	/////////////placing the containers //////////////////////////////////////////////////////	

	container.appendChild(header);
	container.appendChild(invoice_line);
	container.appendChild(info_section);

	container.appendChild(table_copy);
	container.appendChild(footer);

	header.appendChild(logo);
	header.appendChild(business_title);

	info_section.appendChild(customer_info);

	footer.appendChild(tandc);
	footer.appendChild(address);

	func(container);
}

/**
 * @form LetterHeads
 * @formNo 195
 */
function form195_print_form(id)
{
	print_form195(id,function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
 * @form Letterheads
 * @formNo 195
 */
function print_form195(id,func)
{
	var form_id='form195';
	
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_details=document.createElement('div');
	
	var top_section=document.createElement('div');	
		var date_info=document.createElement('div');
		var subject_info=document.createElement('div');
		var to_info=document.createElement('div');
		var salutation_info=document.createElement('div');

	var content_section=document.createElement('div');

	var footer=document.createElement('div');
		var signature=document.createElement('div');
		var tandc=document.createElement('div');

	////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;min-height:100px;margin-bottom:50px;');
		logo.setAttribute('style','float:left;width:48%;');
		business_details.setAttribute('style','float:right;width:50%;text-align:right;');
	top_section.setAttribute('style','width:100%;min-height:60px;');
		date_info.setAttribute('style','float:right;width:100%;text-align:right;margin:5px;');
		subject_info.setAttribute('style','float:left;width:90%;text-align:left;margin:5px;');
		to_info.setAttribute('style','float:left;width:100%;text-align:left;margin:5px;');
		salutation_info.setAttribute('style','float:left;width:100%;text-align:left;margin:5px;');

	content_section.setAttribute('style','width:100%;min-height:200px;text-align:left;margin:5px;margin-bottom:50px;');

	footer.setAttribute('style','width:100%;min-height:50px;');
		signature.setAttribute('style','width:100%;min-height:60px;margin:5px;');
		tandc.setAttribute('style','width:100%;min-height:50px;text-align:left;margin:5px;');

	///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	var logo_image=get_session_var('logo');
	//var business_intro_text=get_session_var('business_intro');
	var business_address=get_session_var('address').replace(/\n/g,"<br>");
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');
	var business_website=get_session_var('website');

	var master_form=document.getElementById(form_id+'_'+id);
	var date=master_form.elements[2].value;
	var to=master_form.elements[1].value.replace(/\n/g,"<br>");
	var subject=master_form.elements[4].value.replace(/\n/g,"<br>");
	var salutation=master_form.elements[5].value.replace(/\n/g,"<br>");
	var content=master_form.elements[6].value.replace(/\n/g,"<br>");
	var signature_text=master_form.elements[7].value.replace(/\n/g,"<br>");
	var tandc_text=master_form.elements[8].value.replace(/\n/g,"<br>");
		
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	business_details.innerHTML=business_address+"<br>Phone: "+business_phone+"<br>Email: "+business_email+"<br>Web: "+business_website;
	date_info.innerHTML=date;
	if(subject!="")	
	{
		subject_info.innerHTML="Subject: "+subject;
	}
	to_info.innerHTML=to;
	salutation_info.innerHTML=salutation;
	
	content_section.innerHTML=content;
	
	signature.innerHTML=signature_text;
	tandc.innerHTML=tandc_text;
	
	/////////////placing the containers //////////////////////////////////////////////////////	

	container.appendChild(header);
	container.appendChild(top_section);
	container.appendChild(content_section);
	container.appendChild(footer);

	header.appendChild(logo);
	header.appendChild(business_details);

	top_section.appendChild(date_info);
	top_section.appendChild(subject_info);
	top_section.appendChild(to_info);
	top_section.appendChild(salutation_info);

	footer.appendChild(signature);
	footer.appendChild(tandc);

	func(container);
}

/**
* This function prepares the printing template for the newsletter
*/
function form196_print_form(nl_name,nl_id,print_type,func)
{
	var container=document.createElement('div');
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_intro=document.createElement('div');
	
	var nl_content=document.createElement('div');
	
	var footer=document.createElement('div');
		var business_contact=document.createElement('div');
		var powered_by=document.createElement('div');
		
////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:98%;min-height:100px;text-align:center');
		business_intro.setAttribute('style','width:98%;text-align:center');
	
	nl_content.setAttribute('style','display:block;width:98%;min-height:60px');

	footer.setAttribute('style','display:block;width:98%;');
		business_contact.setAttribute('style','display:block;width:98%;text-align:center');
		powered_by.setAttribute('style','display:block;width:98%;text-align:center');
	
///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var logo_image=get_session_var('logo');
	var business_intro_text=get_session_var('business_intro');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');
	var business_website=get_session_var('website');
	var tandc_text=get_session_var('bill_message');
	var powered_by_text=get_session_var('powered_by');	
	var powered_by_link=get_session_var('powered_by_link');
	var domain=get_session_var('domain');
	
////////////////filling in the content into the containers/////////////////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	business_intro.innerHTML="<hr style='border: 1px solid #000;'>"+business_intro_text+"<hr style='border: 1px solid #000;'>";
		
	business_contact.innerHTML="<hr style='border: 1px solid #000;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email+" Website: "+business_website;	

	if(powered_by_text!="")	
	{
		powered_by.innerHTML="<hr style='border: 1px solid #000;'>Powered By: <a href='"+powered_by_link+"'>"+powered_by_text+"</a> | <a href='https://vyavsaay.com/f/u.htm?d="+domain+"&i=*|customer_id|*'>Unsubscribe</a>";
	}	
	else 
	{
		powered_by.innerHTML="<hr style='border: 1px solid #000;'>Powered By: <a href='https://vyavsaay.com'>Vyavsaay ERP</a> | <a href='https://vyavsaay.com/f/u.htm?d="+domain+"&i=*|customer_id|*'>Unsubscribe</a>";
	}
/////////////placing the containers //////////////////////////////////////////////////////	
	
	container.appendChild(header);
	container.appendChild(nl_content);
	container.appendChild(footer);
	
	header.appendChild(logo);
	header.appendChild(business_intro);
	
	footer.appendChild(business_contact);
	footer.appendChild(powered_by);

/////////////////populating the content section with newsletter items//////////////////////////
	var newsletter_items_data="<newsletter_items>" +
			"<item_type></item_type>" +
			"<item_name></item_name>" +
			"<item_detail></item_detail>" +
			"<data_blob></data_blob>" +
			"<pic_url></pic_url>"+
			"<url></url>"+
			"<column_size></column_size>"+
			"<nl_id exact='yes'>"+nl_id+"</nl_id>" +
			"</newsletter_items>";
	
	fetch_requested_data('',newsletter_items_data,function(results)
	{
		var right=false;
		results.forEach(function(result)
		{
			var nl_item=document.createElement('div');
			var nl_item_heading=document.createElement('div');
			var nl_item_pic=document.createElement('div');
			var nl_item_detail=document.createElement('div');
			var nl_item_link=document.createElement('a');
			
			var type=result.item_type;
			var name=result.item_name;
			var detail=result.item_detail.replace(/\n/g,"<br>");
			var blob=result.data_blob.replace(/ /g,"+");
			var pic_url=result.pic_url;
							
			var url=result.url;
			var size=result.column_size;
			
			nl_item.style.display='block';
			nl_item.style.margin='2px';
			nl_item.style.padding='2px';
			nl_item.style.border='1px solid #444';
			nl_item.style.minHeight='150px';
			
			nl_item_link.style.textDecoration='none';
			nl_item_pic.width='90%';			
			
			if(size=='2')
			{
				nl_item.style.width='98%';
				nl_item.style.float='left';
			}
			else 
			{
				nl_item.style.width='48%';
				if(right)
				{
					nl_item.style.float='right';
					right=false;
				}
				else{
					nl_item.style.float='left';
					right=true;
				}
			}
			
			nl_item_heading.setAttribute('style','display:block;margin:2px;padding:2px;width:90%');
			
			nl_item_pic.setAttribute('style','float:left;margin:2px;padding:2px;');
			if(url!="")
			{
				nl_item_link.setAttribute('href',url);
			}			
			
			nl_item_heading.innerHTML="<b>"+name+"</b>";
			nl_item_detail.innerHTML=detail;
			
			nl_content.appendChild(nl_item);
			nl_item.appendChild(nl_item_link);
			nl_item_link.appendChild(nl_item_heading);			
			
			var item_clear_div=document.createElement('div');
			item_clear_div.setAttribute('style','clear:both;');
			nl_item.appendChild(item_clear_div);			
			
			if(blob!='undefined' && blob!="")
			{
				if(print_type=='mail')
				{
					nl_item_pic.innerHTML="<img src='https://vyavsaay.com/"+pic_url+"'>";
				}
				else
				{
					nl_item_pic.innerHTML="<img src='"+blob+"'>";
				}
				nl_item_link.appendChild(nl_item_pic);				
			}

			nl_item_link.appendChild(nl_item_detail);
						
		});
		
		var clear_div=document.createElement('div');
		clear_div.setAttribute('style','clear:both;');
		nl_content.appendChild(clear_div);
		
		func(container);
	});
}


/**
 * @form Create DRS
 * @formNo 200
 */
function form200_print_form()
{
	print_form200(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
 * @form Create DRS
 * @formNo 200
 */
function print_form200(func)
{
	var form_id='form200';
	
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_title=document.createElement('div');
		var drs_barcode=document.createElement('img');
	
	var drs_title=document.createElement('div');
	
	var detail_section=document.createElement('div');
	
	var table_container=document.createElement('div');

	////////////setting styles for containers/////////////////////////

	container.setAttribute('style','width:98%;height:90%;margin:0px;padding:0px;');
	header.setAttribute('style','display:block;width:98%;height:70px;margin-top:10px;');
		logo.setAttribute('style','float:left;width:35%;height:60px;');
		business_title.setAttribute('style','float:left;width:40%;height:60px;text-align:center;font-weight:bold;');
		drs_barcode.setAttribute('style','float:right;width:23%;height:60px;padding:left:5px;padding-right:5px;');
	drs_title.setAttribute('style','display:block;width:98%;height:20px;text-align:center');	
	detail_section.setAttribute('style','display:block;width:98%;height:30px;text-align:center;');
	
	///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	var logo_image=get_session_var('logo');

	var master_form=document.getElementById(form_id+'_master');
	var employee_name=master_form.elements['employee'].value;
	var drs_date=master_form.elements['date'].value;
	//var print_date=master_form.elements['pdate'].value;
	var drs_num=master_form.elements['drs_num'].value;
	var page_num=1;

	////////////////filling in the content into the containers//////////////////////////
	
	var table_element=document.getElementById(form_id+'_body');
		
	var total_items=$(table_element).find('tr').length;

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"' style='height:98%;margin-left:10%'>";
	business_title.innerHTML=bt;

	$(drs_barcode).JsBarcode(drs_num,{displayValue:false});
		
	drs_title.innerHTML="Delivery Run Sheet";

	employee_text="<td>Employee: "+employee_name+"</td><td>Total Items: "+total_items+"</td>";
	drs_text="<td>DRS #: "+drs_num+"</td><td>DRS Date: "+drs_date+"</td>";
	detail_text="<table style='border:none;width:98%;font-size:11px;'><tr>"+employee_text+"</tr><tr>"+drs_text+"</tr></table>";
	
	detail_section.innerHTML=detail_text;

	var new_table=document.createElement('table');
	new_table.setAttribute('style','font-size:10px;border:none;text-align:left;');
	new_table.setAttribute('class','printing_tables');

	var table_header="<tr style='border-top: 1px solid #000000;'><td style='text-align:left;width:4%'>S.No.</td>"+
				"<td style='text-align:left;width:19%'>C-Note No.</td>"+
				"<td style='text-align:left;width:11%'>Address</td>"+
				"<td style='text-align:left;width:5%'>Wt.</td>"+
				"<td style='text-align:left;width:5%'>P</td>"+
				"<td style='text-align:left;width:5%'>Time</td>"+
				"<td style='text-align:left;width:30%'>Receiver/Comp Seal</td>"+
				"<td style='text-align:left;width:4%'>RC</td>"+
				"<td style='text-align:left;width:15%'>Sign</td></tr>";

	var table_rows=table_header;
	var counter=0;

	var td_text="<td style='border:solid 1px #000000'></td>";
	var tr_text="<tr>"+td_text+td_text+td_text+td_text+td_text+td_text+td_text+td_text+td_text+td_text+"</tr>";
	var rc="<table style='width:15px;height:15px;'><tr>"+td_text+"</tr></table>";

	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		var mob_seal="<table style='width:95%;height:40px;'>"+tr_text+tr_text+"</table><br><div style='font-size:14px;'>"+form.elements[2].value+"</div>";
		
		var awb_num=""+form.elements[0].value;
		var manifest_type=form.elements[6].value;//.replace(/manifest/g,"");
		var order_id=form.elements[7].value;
		var merchant_name=form.elements[8].value;
		var ship_to=form.elements[12].value;

		var cnote_no=document.createElement('div');
		var barcode_image=document.createElement('img');
		var barcode_value=document.createElement('div');
		var type_value=document.createElement('div');
		var merchant_value=document.createElement('div');
		
		barcode_image.setAttribute('style','width:130px;height:30px;');
		barcode_value.setAttribute('style','width:130px;font-size:14px;margin:1px;text-align:center;');
		type_value.setAttribute('style','width:130px;font-size:9px;margin:1px;text-align:left;');	
		merchant_value.setAttribute('style','width:130px;font-size:14px;margin:1px;text-align:left;');
		
		barcode_value.innerHTML=awb_num;
		type_value.innerHTML="Type: "+manifest_type+" O-ID: "+order_id;
		if(manifest_type=='PREPAID')
		{
			merchant_value.innerHTML=ship_to;
		}		
		else
		{	
			merchant_value.innerHTML=merchant_name;
		}
		$(barcode_image).JsBarcode(awb_num,{displayValue:false});

		cnote_no.appendChild(barcode_image);
		cnote_no.appendChild(barcode_value);
		cnote_no.appendChild(type_value);
		cnote_no.appendChild(merchant_value);

		table_rows+="<tr style='border-top: 1px solid #000000;height:60px;'><td><div>"+counter+"</div></td>"+
				"<td><div style='text-align:left;'>"+cnote_no.innerHTML+"</div></td>"+
				"<td><div style='text-align:left;'>"+form.elements[1].value+"</div></td>"+
				"<td><div>"+form.elements[3].value+"</div></td>"+
				"<td><div>"+form.elements[4].value+"</div></td>"+
				"<td></td>"+
				"<td><div style='text-align:left;'>"+mob_seal+"</div></td>"+
				"<td><div>"+rc+"</div></td>"+
				"<td></td></tr>";				
	});
	new_table.innerHTML=table_rows;
	/////////////placing the containers //////////////////////////////////////////////////////	

	container.appendChild(header);
	container.appendChild(drs_title);
	container.appendChild(detail_section);

	container.appendChild(new_table);
	
	header.appendChild(logo);
	header.appendChild(business_title);
	header.appendChild(drs_barcode);

	func(container);
}

/**
 * @form Treatment Plan
 * @formNo 209
 */
function form209_print_form()
{
	print_form209(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
 * @form Create Treatment Plan
 * @formNo 209
 */
function print_form209(func)
{
	var form_id='form209';
	
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_title=document.createElement('div');
	
	var plan_line=document.createElement('div');
	
	var info_section=document.createElement('div');	
		var plan_info=document.createElement('div');

	var table_container=document.createElement('div');

	var footer=document.createElement('div');
		var address=document.createElement('div');

	////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;min-height:100px;');
		business_title.setAttribute('style','float:right;width:50%;text-align:right;');
	plan_line.setAttribute('style','width:100%;min-height:60px;background-color:#bbbbbb;');
	info_section.setAttribute('style','width:100%;min-height:60px;text-align:left;');
		plan_info.setAttribute('style','padding:5px;margin:5px;float:left;width:100%;height:90px;');
	footer.setAttribute('style','width:100%;min-height:100px');
		address.setAttribute('style','width:100%;min-height:50px;text-align:center;');

	///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	var logo_image=get_session_var('logo');
	var business_intro_text=get_session_var('business_intro');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');
	var business_website=get_session_var('website');

	var master_form=document.getElementById(form_id+'_master');
	var plan_num=master_form.elements['num'].value;
	var customer=master_form.elements['customer'].value;
	var start_date=master_form.elements['date'].value;
	var plan_status=master_form.elements['status'].value;
		
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	business_title.innerHTML=bt;
	plan_line.innerHTML="<div style='float:left;width:50%'>Name: "+customer+"</div><div style='float:right;text-align:right;width:50%'>Starting From: "+start_date+"</div>";	
	plan_info.innerHTML="<hr style='border: 1px solid #000;margin:2px'>Plan #: </b>"+plan_num+"<br>Plan Status: "+plan_status+"<hr style='border: 1px solid #000;margin:2px'>";
	
	address.innerHTML="Address: "+business_address;

	var table_element=document.getElementById(form_id+'_body');
	/////////////adding new table //////////////////////////////////////////////////////	
	var new_table=document.createElement('table');
	new_table.setAttribute('style','width:100%;font-size:11px;border:1px solid black;text-align:left;');
	var table_header="<tr style='border-top: 1px solid #000000;border-bottom: 1px solid #000000;'>"+
				"<td style='text-align:left;width:30px;'>S.No.</td>"+
				"<td style='text-align:left;width:130px;'>Item</td>"+
				"<td style='text-align:left;width:100px'>Details</td>"+
				"<td style='text-align:left;width:45px'>From</td>"+
				"<td style='text-align:left;width:45px'>To</td>"+
				"<td style='text-align:left;width:45px'>Status</td></tr>";
				
	var table_rows=table_header;
	var counter=0;
	
	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		var s_no=form.elements[0].value;
		var item_name=form.elements[1].value;
		var details=form.elements[2].value;
		var from=form.elements[4].value;
		var to=form.elements[5].value;
		var status=form.elements[6].value;
		
		table_rows+="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;'>"+
				"<td style='text-align:left;'>"+s_no+"</td>"+
				"<td style='text-align:left;'>"+item_name+"</td>"+
				"<td style='text-align:left;'>"+details+"</td>"+
				"<td style='text-align:left;'>"+from+"</td>"+
				"<td style='text-align:left;'>"+to+"</td>"+
				"<td style='text-align:left;'>"+status+"</td></tr>";
	});
	
	var row_count=$(table_element).find('tbody>tr').length;
	var rows_to_add=10-row_count;
	for(var i=0;i<rows_to_add;i++)
	{
		table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	}

	new_table.innerHTML=table_rows;
	
	/////////////placing the containers //////////////////////////////////////////////////////	
	
	/////////////placing the containers //////////////////////////////////////////////////////	

	container.appendChild(header);
	container.appendChild(plan_line);
	container.appendChild(info_section);

	container.appendChild(new_table);
	container.appendChild(footer);

	header.appendChild(logo);
	header.appendChild(business_title);

	info_section.appendChild(plan_info);

	footer.appendChild(address);

	func(container);
}

/**
 * @form Pack order
 * @formNo 210
 */
function print_form210(bill_id)
{
	var form_id='form210';
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
				"<mrp></mrp>" +
				"<tax_rate></tax_rate>" +
				"<freight></freight>"+
				"<total></total>" +
				"<storage></storage>" +
				"<bill_id exact='yes'>"+bill_id+"</bill_id>" +				
				"</bill_items>";
	var form210_print_count=2;
	var customer_address="";
	var customer_tin="";
	var customer_name="";
	var date="";
	var channel="";	
	var bill_type="";
	var po_num="";
	var bill_num="";
	var po_date="";

	fetch_requested_data('',bill_columns,function(bill_results)
	{
		if(bill_results.length>0)
		{
			form210_print_count+=1;
			var po_date_data="<sale_orders>"+
								"<order_date></order_date>"+
								"<order_num exact='yes'>"+bill_results[0].order_num+"</order_num>"+
								"</sale_orders>";
			get_single_column_data(function(pos)
			{
				if(pos.length>0)
				{
					po_date=get_my_past_date(pos[0]);
				}
				form210_print_count-=1;
			},po_date_data);
			
			form210_print_count+=1;
			var address_data="<customers>" +
					"<address></address>" +
					"<city></city>" +
					"<acc_name exact='yes'>"+bill_results[0].customer_name+"</acc_name>" +
					"</customers>";
			fetch_requested_data('',address_data,function(addresses)
			{
				if(addresses.length>0)
				{
					customer_address="Address<br>"+addresses[0].address+", "+addresses[0].city;					
				}
				form210_print_count-=1;
			});
			
			form210_print_count+=1;
			var tin_data="<attributes count='1'>" +
					"<value></value>" +
					"<type exact='yes'>customer</type>"+
					"<attribute array='yes'>--VAT#--CST#--</attribute>"+ 
					"<name exact='yes'>"+bill_results[0].customer_name+"</name>" +
					"</attributes>";
			get_single_column_data(function(tins)
			{
				if(tins.length>0)
				{
					customer_tin=tins[0];
				}
				form210_print_count-=1;
			},tin_data);
		}
		
		customer_name=bill_results[0].customer_name;
		date=get_my_past_date(bill_results[0].bill_date);
		channel=bill_results[0].channel;	
		bill_type=bill_results[0].billing_type;
		po_num=bill_results[0].order_num;
		bill_num=bill_results[0].bill_num;
		
		form210_print_count-=1;
	});
	
		
	fetch_requested_data('',bill_items_column,function(results)
	{
		form210_print_count-=1;
	
	
		var form210_complete=setInterval(function()
        {
        	if(form210_print_count===0)
        	{
      
				////////////setting up containers///////////////////////	
				var container=document.createElement('div');
				var header=document.createElement('div');
					var invoice_info=document.createElement('div');
					var business_title=document.createElement('div');
					var business_contact=document.createElement('div');
					
				var info_section=document.createElement('div');	
					var customer_info=document.createElement('div');
					var business_info=document.createElement('div');
			
				var table_container=document.createElement('div');
			
				var footer=document.createElement('div');
					var tandc=document.createElement('div');
					var signature=document.createElement('div');
			
			////////////setting styles for containers/////////////////////////
			
				header.setAttribute('style','border: 1px solid #000000;width:98%;min-height:100px;text-align:center');
					invoice_info.setAttribute('style','margin:5px;width:98%;text-align:center');
					business_title.setAttribute('style','margin:5px;width:100%;text-align:center;font-size:24px;');
					business_contact.setAttribute('style','width:100%;text-align:center;');
				info_section.setAttribute('style','width:98%;min-height:100px');
					customer_info.setAttribute('style','padding:5px;float:left;width:48%;height:100px;border: 1px solid #000;');
					business_info.setAttribute('style','padding:5px;float:right;width:48%;height:100px;border: 1px solid #000;');
				footer.setAttribute('style','margin:10px;width:98%;min-height:100px');
					tandc.setAttribute('style','float:left;width:44%;min-height:60px');
					signature.setAttribute('style','float:right;width:54%;min-height:60px;text-align:right;');
			
			///////////////getting the content////////////////////////////////////////
			
				var bt=get_session_var('title');
				//var font_size=get_session_var('print_size');
				//var logo_image=get_session_var('logo');
				var business_address=get_session_var('address');
				var business_phone=get_session_var('phone');
				var business_email=get_session_var('email');
			
				var tin_no=get_session_var('tin');
					
				var tandc_text=get_session_var('bill_message');
				var signature_text="<br>for "+bt+"<br><br><br>Authorised Signatory<br>";
				
				////////////////filling in the content into the containers//////////////////////////
			
				if(bill_type=="Tax")	
				{
					invoice_info.innerHTML="TAX INVOICE";
				}
				else 
				{
					invoice_info.innerHTML="RETAIL INVOICE";
				}
			
				business_title.innerHTML=bt;
				business_contact.innerHTML=business_address+"<br>Tel: "+business_phone+" emial: "+business_email;
				
				customer_info.innerHTML=customer_name+"<br>"+customer_address+"<br>TIN #:"+customer_tin;
				business_info.innerHTML="Invoice #: "+bill_num+"<br>Dated: "+date+"<br>PO #: "+po_num+"<br>PO Date: "+po_date+"<br>TIN: "+tin_no;
				
				tandc.innerHTML="<b><u>Terms and Conditions</u></b><br>"+tandc_text;
				signature.innerHTML=signature_text;
			
				var table_element=document.getElementById(form_id+'_body');
				
				/////////////adding new table //////////////////////////////////////////////////////	
				var new_table=document.createElement('table');
				new_table.setAttribute('style','width:98%;font-size:12px;border:1px solid black;text-align:left;');
				var table_header="<thead style='border:1px solid #000000;'><tr>"+
							"<td style='text-align:left;width:30px;'>S.No.</td>"+
							"<td style='text-align:left;width:60px;'>SKU</td>"+
							"<td style='text-align:left;width:100px'>Item Name</td>"+
							"<td style='text-align:left;width:60px'>Batch</td>"+
							"<td style='text-align:left;width:45px'>Qty</td>"+
							"<td style='text-align:left;width:45px'>MRP</td>"+
							"<td style='text-align:left;width:45px'>Price</td>"+
							"<td style='text-align:left;width:45px'>Amount</td>"+
							"<td style='text-align:left;width:45px'>Tax%</td>"+
							"<td style='text-align:left;width:45px'>Freight</td>"+
							"<td style='text-align:left;width:80px'>Total</td></tr></thead>";
							
				var table_rows=table_header+"<tbody style='border: 1px solid #000000;'>";
				var counter=0;
				var bill_total=0;
				var bill_amount=0;
				var bill_freight=0;
				var total_quantity=0;
				var tax_array=[];
			
				results.forEach(function(result)
				{
					counter+=1;
					var sku=result.item_name;
					var item_name=result.item_desc;
					var batch=result.batch;
					var quantity=""+result.quantity;
					var mrp=""+result.mrp;
					var price=result.unit_price;
					var tax_rate=result.tax_rate;		
					var amount=result.amount;		
					var tax=result.tax;		
					var total=result.total;
					var freight=result.freight;
					var tax_rate=result.tax_rate;		
					
					total_quantity+=parseFloat(quantity);
					bill_total+=parseFloat(total);
					bill_amount+=parseFloat(amount);
					bill_freight+=parseFloat(freight);
					
					if(typeof tax_array[tax_rate]=='undefined')
					{
						tax_array[tax_rate]=0;
					}
					tax_array[tax_rate]+=parseFloat(tax);
					
					table_rows+="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;'>"+
							"<td style='text-align:left;'>"+counter+"</td>"+
							"<td style='text-align:left;word-wrap: break-word;'>"+sku+"</td>"+
							"<td style='text-align:left;word-wrap: break-word;'>"+item_name+"</td>"+
							"<td style='text-align:left;word-wrap: break-word;'>"+batch+"</td>"+
							"<td style='text-align:left;'>"+quantity+"</td>"+
							"<td style='text-align:left;'>"+mrp+"</td>"+
							"<td style='text-align:left;'>"+price+"</td>"+
							"<td style='text-align:left;'>"+amount+"</td>"+
							"<td style='text-align:left;'>"+tax_rate+"</td>"+
							"<td style='text-align:left;'>"+freight+"</td>"+
							"<td style='text-align:left;'>"+total+"</td></tr>";
				});
				
				var row_count=$(new_table).find('tbody>tr').length;
				var rows_to_add=15-row_count;
				for(var i=0;i<rows_to_add;i++)
				{
					table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
				}
			
				table_rows+="</tbody>";
				
				var wording_total=number2text(bill_total);
				
				var against_c_form="";
				if(bill_type=='Retail-CST-C')
				{
					against_c_form="<br>Against C-Form";
				}
			
				var tax_name="VAT";
				
				if(bill_type=='Retail-CST' || bill_type=='Retail-CST-C')
				{
					tax_name="CST";
				}
			
				var tax_string="";
				var bill_tax="";
				for(var x in tax_array)
				{
					tax_array[x]=my_round(tax_array[x],2);
					tax_string+=tax_name+" @"+x+"%: <br>";		
					bill_tax+="Rs. "+tax_array[x]+": <br>";
				}
				
				var table_foot=document.getElementById(form_id+'_foot');
				var total_quantity="Total Quantity: "+total_quantity;
				var total_text="Amount:</br>"+tax_string+"Freight: </br>Total:";
				var total_amount="Rs. "+bill_amount+"</br>" +bill_tax+"Rs. "+bill_freight+"</br>Rs. "+bill_total;
				
				var table_foot_row="<tfoot style='border: 1px solid #000000;'><tr>"+
							"<td colspan='6' style='text-align:left;'>"+wording_total+"<br>"+total_quantity+against_c_form+"</td>"+
							"<td colspan='3' style='text-align:left;'>"+total_text+"</td>"+
							"<td colspan='2' style='text-align:left;'>"+total_amount+"</td></tr></tfoot>";
					
				table_rows+=table_foot_row;
				new_table.innerHTML=table_rows;
				
				/////////////placing the containers //////////////////////////////////////////////////////	
				
				container.appendChild(header);
				container.appendChild(info_section);
				
				container.appendChild(new_table);
				container.appendChild(footer);
				
				header.appendChild(invoice_info);
				header.appendChild(business_title);
				header.appendChild(business_contact);
				
				info_section.appendChild(customer_info);
				info_section.appendChild(business_info);
				
				footer.appendChild(tandc);
				footer.appendChild(signature);
				
				$.print(container);
	  			container.innerHTML="";
	  			
	  			hide_loader();
      			clearInterval(form210_complete);
        	}
        },1000);	
	});
}

/**
 * @form Create Manifest
 * @formNo 215
 */
function form215_print_form()
{
	print_form215(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
 * @form Create manifest
 * @formNo 215
 */
function print_form215(func)
{
	var form_id='form215';
	
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_title=document.createElement('div');
		var drs_barcode=document.createElement('img');
	
	var drs_title=document.createElement('div');
	
	var detail_section=document.createElement('div');
	
	var table_container=document.createElement('div');

	////////////setting styles for containers/////////////////////////

	container.setAttribute('style','width:98%;height:90%;margin:0px;padding:0px;');
	header.setAttribute('style','display:block;width:98%;height:70px;margin-top:10px;');
		logo.setAttribute('style','float:left;width:35%;height:60px;');
		business_title.setAttribute('style','float:left;width:40%;height:60px;text-align:center;font-weight:bold;');
		drs_barcode.setAttribute('style','float:right;width:23%;height:60px;padding:left:5px;padding-right:5px;');
	drs_title.setAttribute('style','display:block;width:98%;height:20px;text-align:center');	
	detail_section.setAttribute('style','display:block;width:98%;height:30px;text-align:center;');
	
	///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	var logo_image=get_session_var('logo');

	var master_form=document.getElementById(form_id+'_master');
	var drs_date=master_form.elements['date'].value;
	//var print_date=master_form.elements['pdate'].value;
	var drs_num=master_form.elements['man_num'].value;
	
	////////////////filling in the content into the containers//////////////////////////
	
	var table_element=document.getElementById(form_id+'_body');
		
	var total_items=$(table_element).find('tr').length;

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"' style='height:98%;margin-left:10%'>";
	business_title.innerHTML=bt;

	$(drs_barcode).JsBarcode(drs_num,{displayValue:false});
		
	drs_title.innerHTML="Dispatch Manifest";

	employee_text="</td><td>Total Orders: "+total_items+"</td>";
	drs_text="<td>Manifest #: "+drs_num+"</td><td>Manifest Date: "+drs_date+"</td>";
	detail_text="<table style='border:none;width:98%;font-size:11px;'><tr>"+employee_text+"</tr><tr>"+drs_text+"</tr></table>";
	
	detail_section.innerHTML=detail_text;

	var new_table=document.createElement('table');
	new_table.setAttribute('style','font-size:10px;border:none;text-align:left;');
	new_table.setAttribute('class','printing_tables');

	var table_header="<tr style='border-top: 1px solid #000000;'><td style='text-align:left;width:10%'>S.No.</td>"+
				"<td style='text-align:left;width:35%'>Bill Id</td>"+
				"<td style='text-align:left;width:18%'>Invoice #</td>"+
				"<td style='text-align:left;width:18%'>Order #</td>"+
				"<td style='text-align:left;width:18%'>Channel</td></tr>";

	var table_rows=table_header;
	var counter=0;

	var td_text="<td style='border:solid 1px #000000'></td>";
	var tr_text="<tr>"+td_text+td_text+td_text+td_text+td_text+"</tr>";
	
	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		
		var bill_id=""+form.elements[0].value;
		var bill_num=""+form.elements[1].value;
		var order_num=form.elements[2].value;
		var channel=form.elements[3].value;
		
		var cnote_no=document.createElement('div');
		var barcode_image=document.createElement('img');
		var barcode_value=document.createElement('div');
		
		barcode_image.setAttribute('style','width:150px;height:30px;');
		barcode_value.setAttribute('style','width:150px;font-size:14px;margin:1px;text-align:center;');
		
		barcode_value.innerHTML=bill_id;
		$(barcode_image).JsBarcode(bill_id,{displayValue:false});

		cnote_no.appendChild(barcode_image);
		cnote_no.appendChild(barcode_value);

		table_rows+="<tr style='border-top: 1px solid #000000;height:60px;'><td><div style='text-align:left;>"+counter+"</div></td>"+
				"<td><div style='text-align:left;'>"+cnote_no.innerHTML+"</div></td>"+
				"<td><div style='text-align:left;'>"+bill_num+"</div></td>"+
				"<td><div style='text-align:left;>"+order_num+"</div></td>"+
				"<td><div style='text-align:left;>"+channel+"</div></td></tr>";				
	});
	new_table.innerHTML=table_rows;
	/////////////placing the containers //////////////////////////////////////////////////////	

	container.appendChild(header);
	container.appendChild(drs_title);
	container.appendChild(detail_section);

	container.appendChild(new_table);
	
	header.appendChild(logo);
	header.appendChild(business_title);
	header.appendChild(drs_barcode);

	func(container);
}


/**
 * @form Create COD DRS
 * @formNo 219
 */
function form219_print_form()
{
	print_form219(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
 * @form Create COD DRS
 * @formNo 219
 */
function print_form219(func)
{
	var form_id='form219';
	
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_title=document.createElement('div');
		var drs_barcode=document.createElement('img');
	
	var drs_title=document.createElement('div');
	
	var detail_section=document.createElement('div');
	
	var table_container=document.createElement('div');

	////////////setting styles for containers/////////////////////////

	container.setAttribute('style','width:98%;height:90%;max-height:90%;margin:0px;padding:0px;');
	header.setAttribute('style','display:block;width:100%;min-height:70px;margin-top:10px;');
		logo.setAttribute('style','float:left;width:35%;height:60px;');
		business_title.setAttribute('style','float:left;width:40%;height:60px;text-align:center;font-weight:bold;');
		drs_barcode.setAttribute('style','float:right;width:20%;height:60px;padding:left:5px;padding-right:5px;');
	
	drs_title.setAttribute('style','display:block;width:100%;min-height:20px;text-align:center');	
	detail_section.setAttribute('style','display:block;width:100%;min-height:30px;text-align:center;');
	
	///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	var logo_image=get_session_var('logo');

	var master_form=document.getElementById(form_id+'_master');
	var employee_name=master_form.elements['employee'].value;
	var drs_date=master_form.elements['date'].value;
	var drs_num=master_form.elements['drs_num'].value;
	var page_num=1;
	
	////////////////filling in the content into the containers//////////////////////////
	
	var table_element=document.getElementById(form_id+'_body');
		
	var total_items=$(table_element).find('tr').length;
	
	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"' style='height:120%;margin-left:20%'>";
	business_title.innerHTML=bt;

	$(drs_barcode).JsBarcode(drs_num,{displayValue:true});
		
	drs_title.innerHTML="Delivery Run Sheet";

	employee_text="<td>Employee: "+employee_name+"</td><td>Total Items: "+total_items+"</td>";
	drs_text="<td>DRS #: "+drs_num+"</td><td>DRS Date: "+drs_date+"</td>";
	drs_text="<td>DRS #: "+drs_num+"</td><td>DRS Date: "+drs_date+"</td>";
	detail_text="<table style='border:none;width:100%;font-size:11px;'><tr>"+employee_text+"</tr><tr>"+drs_text+"</tr></table>";
	
	detail_section.innerHTML=detail_text;
	
	var new_table=document.createElement('table');
	new_table.setAttribute('style','font-size:10px;border:none;text-align:left;');
	new_table.setAttribute('class','printing_tables');

	var table_header="<tr style='border-top: 1px solid #000000;'><td style='text-align:left;width:4%'>S.No.</td>"+
				"<td style='text-align:left;width:19%'>C-Note No.</td>"+
				"<td style='text-align:left;width:11%'>Address</td>"+
				"<td style='text-align:left;width:5%'>Wt.</td>"+
				"<td style='text-align:left;width:5%'>P</td>"+
				"<td style='text-align:left;width:10%'>Amount</td>"+
				"<td style='text-align:left;width:25%'>Receiver/Comp Seal</td>"+
				"<td style='text-align:left;width:4%'>RC</td>"+
				"<td style='text-align:left;width:15%'>Sign</td></tr>";
				
	var table_rows=table_header;
	var counter=0;

	var td_text="<td style='border:solid 1px #000000'></td>";
	var tr_text="<tr>"+td_text+td_text+td_text+td_text+td_text+td_text+td_text+td_text+td_text+td_text+"</tr>";
	var rc="<table style='width:15px;height:15px;'><tr>"+td_text+"</tr></table>";

	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		var mob_seal="<table style='width:95%;height:40px;'>"+tr_text+tr_text+"</table><br><div style='font-size:14px;'>"+form.elements[2].value+"</div>";
		
		var awb_num=""+form.elements[0].value;
		var manifest_type=form.elements[7].value;//.replace(/manifest/g,"");
		var order_id=form.elements[8].value;
		var merchant_name=form.elements[9].value;
		var ship_to=form.elements[13].value;

		var cnote_no=document.createElement('div');
		var barcode_image=document.createElement('img');
		var barcode_value=document.createElement('div');
		var type_value=document.createElement('div');
		var merchant_value=document.createElement('div');
		
		barcode_image.setAttribute('style','width:130px;height:30px;');
		barcode_value.setAttribute('style','width:130px;font-size:14px;margin:1px;text-align:center;');
		type_value.setAttribute('style','width:130px;font-size:9px;margin:1px;text-align:left;');	
		merchant_value.setAttribute('style','width:130px;font-size:14px;margin:1px;text-align:left;');
		
		barcode_value.innerHTML=awb_num;
		type_value.innerHTML="Type: "+manifest_type+" O-ID: "+order_id;
		merchant_value.innerHTML=ship_to;
		$(barcode_image).JsBarcode(awb_num,{displayValue:false});
		
		cnote_no.appendChild(barcode_image);
		cnote_no.appendChild(barcode_value);
		cnote_no.appendChild(type_value);
		cnote_no.appendChild(merchant_value);

		table_rows+="<tr style='border-top: 1px solid #000000;height:60px;'><td><div>"+counter+"</div></td>"+
				"<td><div style='text-align:left;'>"+cnote_no.innerHTML+"</div></td>"+
				"<td><div style='text-align:left;'>"+form.elements[1].value+"</div></td>"+
				"<td><div>"+form.elements[4].value+"</div></td>"+
				"<td><div>"+form.elements[5].value+"</div></td>"+
				"<td><div>Rs. "+form.elements[3].value+"</div></td>"+
				"<td><div style='text-align:left;'>"+mob_seal+"</div></td>"+
				"<td><div>"+rc+"</div></td>"+
				"<td></td></tr>";
	});
	new_table.innerHTML=table_rows;
	/////////////placing the containers //////////////////////////////////////////////////////	

	container.appendChild(header);
	container.appendChild(drs_title);
	container.appendChild(detail_section);

	container.appendChild(new_table);
	
	header.appendChild(logo);
	header.appendChild(business_title);
	header.appendChild(drs_barcode);

	func(container);
}

/**
 * @form Create Purchase order (Aurilion)
 * @formNo 222
 */
function form222_print_form()
{	
	print_form222(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
* This function prepares the printing template for the documents like bills and purchase orders
*/
function print_form222(func)
{
	var form_id='form222';
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_intro=document.createElement('div');
		var business_contact=document.createElement('div');
	
	var invoice_line=document.createElement('div');
	
	var info_section=document.createElement('div');	
		var customer_info=document.createElement('div');
		var business_info=document.createElement('div');

	var table_container=document.createElement('div');

	var footer=document.createElement('div');
		var tandc=document.createElement('div');
		var signature=document.createElement('div');

////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;min-height:100px;text-align:center');
		business_intro.setAttribute('style','width:100%;text-align:center');
		business_contact.setAttribute('style','width:100%;text-align:center');
	info_section.setAttribute('style','width:100%;min-height:80px');
		customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
		business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
	footer.setAttribute('style','width:100%;min-height:100px');
		tandc.setAttribute('style','float:left;width:60%;min-height:50px');
		signature.setAttribute('style','float:right;width:30%;min-height:60px');

///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	var logo_image=get_session_var('logo');
	//var business_intro_text=get_session_var('business_intro');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');
	//var business_website=get_session_var('website');

	var master_form=document.getElementById(form_id+'_master');
	var supplier_name=master_form.elements['supplier'].value;
	var date=master_form.elements['date'].value;	
	var order_no=master_form.elements['order_num'].value;
	var vat_no=get_session_var('vat');
		
	var tandc_text=get_session_var('po_message');
	var signature_text="<br>"+bt+"<br><br><br>Auth. Signatory<br>";
	
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	//business_intro.innerHTML="<hr style='border: 1px solid #000;'>"+business_intro_text;
	business_contact.innerHTML="<hr style='border: 1px solid #00f;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email;
	
	invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>Purchase Order</b></div><hr style='border: 1px solid #00f;'>";
	
	customer_info.innerHTML="<b>To</b><br>"+supplier_name;
	business_info.innerHTML="VAT #: "+vat_no+"<br>Date: "+date+"<br>Order No: "+order_no;
	
	tandc.innerHTML="<br><b>Terms and Conditions</b><br>"+tandc_text;
	signature.innerHTML=signature_text;

	var table_element=document.getElementById(form_id+'_body');
	
	/////////////adding new table //////////////////////////////////////////////////////	
	var new_table=document.createElement('table');
	new_table.setAttribute('style','width:100%;font-size:11px;border:1px solid black;text-align:left;');
	var table_header="<tr style='border-top: 1px solid #000000;border-bottom: 1px solid #000000;'>"+
				"<td style='text-align:left;width:130px;'>Item Name</td>"+
				"<td style='text-align:left;width:45px'>Qty</td>"+
				"<td style='text-align:left;width:45px'>Brand</td>"+
				"<td style='text-align:left;width:45px'>MRP</td>"+
				"<td style='text-align:left;width:45px'>Price</td>"+
				"<td style='text-align:left;width:45px'>Tax</td>"+
				"<td style='text-align:left;width:80px'>Total</td></tr>";
				
	var table_rows=table_header;
	var counter=0;
	
	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		var item_name=form.elements[0].value;
		var quantity=""+form.elements[1].value;
		var brand=form.elements[2].value;
		var mrp=form.elements[3].value;
		var price=form.elements[4].value;
		var amount=form.elements[5].value;
		var tax=form.elements[6].value;
		var total=form.elements[7].value;

		table_rows+="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;'>"+
				"<td style='text-align:left;'>"+item_name+"</td>"+
				"<td style='text-align:left;'>"+quantity+"</td>"+
				"<td style='text-align:left;'>"+brand+"</td>"+
				"<td style='text-align:left;'>"+mrp+"</td>"+
				"<td style='text-align:left;'>"+price+"</td>"+
				"<td style='text-align:left;'>"+tax+"</td>"+
				"<td style='text-align:left;'>"+total+"</td></tr>";
	});
	
	var row_count=$(table_element).find('tbody>tr').length;
	var rows_to_add=12-row_count;
	for(var i=0;i<rows_to_add;i++)
	{
		table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	}

	var table_foot=document.getElementById(form_id+'_foot');
	var total_quantity=$(table_foot).find('tr>td:first')[0].innerHTML;
	var total_text=$(table_foot).find('tr>td:nth-child(2)')[0].innerHTML;
	var total_amount=$(table_foot).find('tr>td:nth-child(3)')[0].innerHTML;
	
	var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
				"<td colspan='3' style='text-align:left;'>"+total_quantity+"</td>"+
				"<td colspan='3' style='text-align:left;'>"+total_text+"</td>"+
				"<td colspan='2' style='text-align:left;'>"+total_amount+"</td></tr>";
		
	table_rows+=table_foot_row;
	new_table.innerHTML=table_rows;
	
	/////////////placing the containers //////////////////////////////////////////////////////	
	
	container.appendChild(header);
	container.appendChild(invoice_line);
	container.appendChild(info_section);
	
	container.appendChild(new_table);
	container.appendChild(footer);
	
	header.appendChild(logo);
	//header.appendChild(business_intro);
	header.appendChild(business_contact);
	
	info_section.appendChild(customer_info);
	info_section.appendChild(business_info);
	
	footer.appendChild(tandc);
	footer.appendChild(signature);
	
	func(container);
}


/**
 * @form Prescription
 * @formNo 231
 */
function form231_print_form()
{
	print_form231(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
 * @form Prescription
 * @formNo 231
 */
function print_form231(func)
{
	var form_id='form231';
	
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_title=document.createElement('div');
		var business_intro=document.createElement('div');
	
	var doctor_line=document.createElement('div');
	
	var info_section=document.createElement('div');	
	
	var main_section=document.createElement('div');
		var rx_line=document.createElement('div');
		var table_container=document.createElement('div');
		var signature_box=document.createElement('div');

	var footer=document.createElement('div');
		var address=document.createElement('div');

	////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:95%;min-height:200px;line-height:40px;');
		logo.setAttribute('style','float:left;width:30%;height:200px;');
		business_title.setAttribute('style','float:left;width:65%;text-align:left;font-size:30px;');		
		business_intro.setAttribute('style','float:left;width:65%;text-align:left;font-size:25px;');
	doctor_line.setAttribute('style','width:95%;min-height:40px;font-size:20px;font-weight:600;');
	info_section.setAttribute('style','display:block;width:95%;min-height:60px;background-color:#bcd7ef;text-align:left;font-size:20px;line-height:25px;');
	main_section.setAttribute('style','width:95%;min-height:500px;text-align:left;padding:10px;');
		rx_line.setAttribute('style','padding:5px;margin:5px;float:left;width:95%;height:40px;font-size:25px;font-weight:900;');
		signature_box.setAttribute('style','padding:5px;margin:5px;float:right;text-align:right;width:95%;height:30px;font-size:20px;');
	footer.setAttribute('style','width:95%;min-height:100px;font-size:15px;');
		address.setAttribute('style','width:95%;min-height:50px;text-align:center;');

	///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var logo_image=get_session_var('logo');
	var business_intro_text=get_session_var('business_intro');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');
	var business_website=get_session_var('website');

	var master_form=document.getElementById(form_id+'_master');
	var pres_num=master_form.elements['p_num'].value;
	var doctor=master_form.elements['doctor'].value;
	var patient=master_form.elements['patient'].value;
	var date=master_form.elements['date'].value;
	var age=master_form.elements['age'].value;
	var sex=master_form.elements['sex'].value;
	var next_visit=master_form.elements['next'].value;
	if(master_form.elements['next'].value=="01/01/1970")
		next_visit="";
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML="<img style='width:90%;height:90%;' src='https://vyavsaay.com/client_images/"+logo_image+"'>";	
	business_title.innerHTML=bt;
	business_intro.innerHTML="<i>"+business_intro_text+"</i>";
	
	doctor_line.innerHTML="<div style='float:left'>Dr. Anish Goyal</div><div style='float:right'>Dr. Neha Sharma</div><br><hr style='border: 1px solid #000;margin:2px'>";
	
	info_section.innerHTML="Date: "+date+"<br>Patient: "+patient+"<br>Age: "+age+"<br>Sex: "+sex+"<br>Next Visit: "+next_visit;	
	rx_line.innerHTML="Rx";
	signature_box.innerHTML="<hr style='width:30%;border: 1px solid #000;margin:2px;float:right;'>Signature";

	address.innerHTML="<hr style='width:100%;border: 1px solid #000;margin:2px'>"+business_address+"<br>Contact No. "+business_phone+"<br>Email: "+business_email+" Web: "+business_website;

	var table_element=document.getElementById(form_id+'_body');
	/////////////adding new table //////////////////////////////////////////////////////	
	var new_table=document.createElement('table');
	new_table.setAttribute('style','float:left;width:100%;border:none;font-size:15px;text-align:left;');
	var table_header="<tr style='border-bottom: 1px solid #000000;'>"+
				"<td style='text-align:left;width:30px;'>S.No.</td>"+
				"<td style='text-align:left;width:100px;'>Type</td>"+
				"<td style='text-align:left;width:200px'>Item</td>"+
				"<td style='text-align:left;width:100px'>Strength</td>"+
				"<td style='text-align:left;width:100px'>Frequency</td>"+
				"<td style='text-align:left;width:50px'>Days</td></tr>";

	var table_rows=table_header;
	var counter=0;
	
	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		var item_type=form.elements[0].value;
		var item_name=form.elements[1].value;
		var dosage=form.elements[2].value;
		var frequency=form.elements[3].value;
		var days=form.elements[4].value;

		table_rows+="<tr>"+
				"<td style='text-align:left;'>"+counter+"</td>"+
				"<td style='text-align:left;'>"+item_type+"</td>"+
				"<td style='text-align:left;'>"+item_name+"</td>"+
				"<td style='text-align:left;'>"+dosage+"</td>"+
				"<td style='text-align:left;'>"+frequency+"</td>"+
				"<td style='text-align:left;'>"+days+"</td></tr>";
	});

	var row_count=$(table_element).find('tbody>tr').length;
	var rows_to_add=12-row_count;
	for(var i=0;i<rows_to_add;i++)
	{
		table_rows+="<tr style='flex:2;height:25px;'><td></td><td></td><td></td><td></td><td></td></tr>";
	}

	new_table.innerHTML=table_rows;

	/////////////placing the containers //////////////////////////////////////////////////////	

	container.appendChild(header);
	container.appendChild(doctor_line);
	container.appendChild(info_section);
	container.appendChild(main_section);
	container.appendChild(footer);

	main_section.appendChild(rx_line);
	main_section.appendChild(new_table);
	main_section.appendChild(signature_box);

	header.appendChild(logo);
	header.appendChild(business_title);
	header.appendChild(business_intro);

	footer.appendChild(address);

	func(container);
}

/**
 * @form Newsletter Creator
 * @formNo 233
 */
function form233_print()
{
	var container=document.getElementById('form233_section');
	$.print(container);
}

/**
 * @form Issue GRN without QC
 * @modalNo 131
 */
function modal131_print(order_num,received_quantity,total_quantity,supplier_name,order_date)
{
	print_modal131(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	},order_num,received_quantity,total_quantity,supplier_name,order_date);	
}

/**
 * @form Issue GRN without QC
 * @formNo 131
 */
function print_modal131(func,order_num,received_quantity,total_quantity,supplier_name,order_date)
{	
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var business_title=document.createElement('div');
	
	var invoice_box=document.createElement('div');

	var info_section=document.createElement('div');	
		var supplier_info=document.createElement('div');
		var order_info=document.createElement('div');

	var footer=document.createElement('div');
		var tandc=document.createElement('div');
		var signature=document.createElement('div');
		
	////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;min-height:100px;');
		business_title.setAttribute('style','width:99%;text-align:center;');
	invoice_box.setAttribute('style','width:99%;min-height:60px;background-color:#bbbbbb;border: 1px solid #000000;padding:2px;');
	info_section.setAttribute('style','width:99%;min-height:60px;padding:2px;border: 1px solid #000000;');
		supplier_info.setAttribute('style','padding:2px;margin:2px;float:left;width:48%;height:60px;text-align:left;');
		order_info.setAttribute('style','padding:2px;margin:2px;float:right;width:48%;height:60px;text-align:right;');
	footer.setAttribute('style','width:100%;min-height:100px');
		tandc.setAttribute('style','float:left;width:60%;min-height:50px');
		signature.setAttribute('style','float:right;width:30%;min-height:60px');

	///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var today_date=get_my_date();
	var signature_text="<br>"+bt+"<br><br><br>Auth. Signatory<br>";
	
	////////////////filling in the content into the containers//////////////////////////

	business_title.innerHTML="<b>"+bt+"</b><br>"+business_address+"<br>"+business_phone;
	invoice_box.innerHTML="<div style='float:left;width:50%'>Order No.: "+order_num+"</div><div style='float:right;text-align:right;width:50%'>Order Date: "+order_date+"<br>Receiving Date: "+today_date+"</div>";
	
	supplier_info.innerHTML="<b>Supplier</b><br>"+supplier_name;
	order_info.innerHTML="Received "+received_quantity+" quantity out of total order of "+total_quantity+" quantity";
	
	////////////////filling in the content into the containers//////////////////////////
	
	tandc.innerHTML="";
	signature.innerHTML=signature_text;

	///////////////////////////////////////

	container.appendChild(header);
	container.appendChild(invoice_box);
	container.appendChild(info_section);
	container.appendChild(footer);

	header.appendChild(business_title);

	info_section.appendChild(supplier_info);
	info_section.appendChild(order_info);

	footer.appendChild(tandc);
	footer.appendChild(signature);

	func(container);
}

/**
* This function prepares the printing template for the newsletter
*/
function form237_print_form(nl_name,nl_id,print_type,func)
{
	var container=document.createElement('div');
	var header=document.createElement('div');
		var logo=document.createElement('div');
	
	var nl_content=document.createElement('div');
	
	var footer=document.createElement('div');
		var powered_by=document.createElement('div');
	
////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:98%;min-height:100px;text-align:center');
	
	nl_content.setAttribute('style','display:block;width:98%;height:auto;text-align:center;');

	footer.setAttribute('style','width:98%;min-height:100px;text-align:center;margin:5px;');
		powered_by.setAttribute('style','width:98%;text-align:center');
	
///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var logo_image=get_session_var('logo');
	var powered_by_text=get_session_var('powered_by');	
	var powered_by_link=get_session_var('powered_by_link');
	var domain=get_session_var('domain');
	
////////////////filling in the content into the containers/////////////////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	
	if(powered_by_text!="")	
	{
		powered_by.innerHTML="<hr style='border: 1px solid #000;'>Powered By: <a href='"+powered_by_link+"'>"+powered_by_text+"</a> | <a href='https://vyavsaay.com/f/u.htm?d="+domain+"&i=*|customer_id|*'>Unsubscribe</a>";
	}	
	else 
	{
		powered_by.innerHTML="<hr style='border: 1px solid #000;'>Powered By: <a href='https://vyavsaay.com'>Vyavsaay ERP</a> | <a href='https://vyavsaay.com/f/u.htm?d="+domain+"&i=*|customer_id|*'>Unsubscribe</a>";
	}
	
/////////////placing the containers //////////////////////////////////////////////////////	
	container.appendChild(header);
	container.appendChild(nl_content);
	container.appendChild(footer);
	
	header.appendChild(logo);
	
	footer.appendChild(powered_by);

/////////////////populating the content section with newsletter items//////////////////////////
	var newsletter_data=new Object();
		newsletter_data.data_store='newsletter';
		newsletter_data.count=1;
		newsletter_data.indexes=[{index:'id',value:nl_id},
							{index:'html_content'}];
	
	read_json_rows('',newsletter_data,function(results)
	{
		//console.log(results);
		if(results.length>0)
		{
			var updated_content=revert_htmlentities(results[0].html_content);
			$(nl_content).html(updated_content);
			
			$(nl_content).find('img').each(function(index)
			{
				var image_elem=$(this)[0];
				var data_src=image_elem.getAttribute('data-src');

				image_elem.src="https://s3-ap-southeast-1.amazonaws.com/vyavsaay-newsletter/"+data_src;	
			});
		}
		//console.log(container.innerHTML);
		
		func(container);
	});
}


/**
 * @form Create MTS
 * @formNo 250
 */
function form250_print_form()
{
	print_form250(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
 * @form Create MTS
 * @formNo 250
 */
function print_form250(func)
{
	var form_id='form250';
	
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_title=document.createElement('div');
		var mts_barcode=document.createElement('img');
	
	var mts_title=document.createElement('div');
	
	var detail_section=document.createElement('div');
	
	var table_container=document.createElement('div');

	////////////setting styles for containers/////////////////////////

	container.setAttribute('style','width:98%;height:90%;margin:0px;padding:0px;');
	header.setAttribute('style','display:block;width:98%;height:70px;margin-top:10px;');
		logo.setAttribute('style','float:left;width:35%;height:60px;');
		business_title.setAttribute('style','float:left;width:40%;height:60px;text-align:center;font-weight:bold;');
		mts_barcode.setAttribute('style','float:right;width:23%;height:60px;padding:left:5px;padding-right:5px;');
	mts_title.setAttribute('style','display:block;width:98%;height:20px;text-align:center');	
	detail_section.setAttribute('style','display:block;width:98%;height:30px;text-align:center;');
	
	///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	var logo_image=get_session_var('logo');

	var master_form=document.getElementById(form_id+'_master');
	var branch_name=master_form.elements['branch'].value;
	var mts_date=master_form.elements['date'].value;
	var mts_num=master_form.elements['mts_num'].value;
	var mts_weight=master_form.elements['weight'].value;
	var num_orders=master_form.elements['num_orders'].value;
	var num_bags=master_form.elements['num_bags'].value;

	////////////////filling in the content into the containers//////////////////////////
	
	var table_element=document.getElementById(form_id+'_body');
	var total_items=$(table_element).find('tr').length;

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"' style='height:98%;margin-left:10%'>";
	business_title.innerHTML=bt;

	$(mts_barcode).JsBarcode(mts_num,{displayValue:false});
		
	mts_title.innerHTML="Material Transfer Sheet";

	employee_text="<td>Branch: "+branch_name+"</td><td>Total Bags: "+num_bags+"</td><td>Total Orders: "+num_orders+"</td>";
	mts_text="<td>MTS #: "+mts_num+"</td><td>MTS Date: "+mts_date+"</td>";
	detail_text="<table style='border:none;width:98%;font-size:11px;'><tr>"+employee_text+"</tr><tr>"+mts_text+"</tr></table>";
	
	detail_section.innerHTML=detail_text;

	var new_table=document.createElement('table');
	new_table.setAttribute('style','font-size:10px;border:none;text-align:left;');
	new_table.setAttribute('class','printing_tables');

	var table_header="<tr style='border-top: 1px solid #000000;'><td style='text-align:left;width:6%'>S.No.</td>"+
				"<td style='text-align:left;width:30%'>Bag No.</td>"+
				"<td style='text-align:left;width:20%'>LBH</td>"+
				"<td style='text-align:left;width:20%'>Wt.</td>"+
				"<td style='text-align:left;width:20%'>Orders</td></tr>";

	var table_rows=table_header;
	var counter=0;

//	var td_text="<td style='border:solid 1px #000000'></td>";
//	var tr_text="<tr>"+td_text+td_text+td_text+td_text+td_text+td_text+td_text+td_text+td_text+td_text+"</tr>";
//	var rc="<table style='width:15px;height:15px;'><tr>"+td_text+"</tr></table>";

	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		//var mob_seal="<table style='width:95%;height:40px;'>"+tr_text+tr_text+"</table><br><div style='font-size:14px;'>"+form.elements[2].value+"</div>";
		
		var bag_num=""+form.elements[0].value;
		
		var cnote_no=document.createElement('div');
		var barcode_image=document.createElement('img');
		var barcode_value=document.createElement('div');
		
		barcode_image.setAttribute('style','width:130px;height:30px;');
		barcode_value.setAttribute('style','width:130px;font-size:14px;margin:1px;text-align:center;');
		
		barcode_value.innerHTML=bag_num;
		$(barcode_image).JsBarcode(bag_num,{displayValue:false});

		cnote_no.appendChild(barcode_image);
		cnote_no.appendChild(barcode_value);
		
		table_rows+="<tr style='border-top: 1px solid #000000;height:60px;'><td><div>"+counter+"</div></td>"+
				"<td><div style='text-align:left;'>"+cnote_no.innerHTML+"</div></td>"+
				"<td><div>"+form.elements[1].value+"</div></td>"+
				"<td><div>"+form.elements[2].value+"</div></td>"+
				"<td><div>"+form.elements[3].value+"</div></td></tr>";				
	});
	new_table.innerHTML=table_rows;
	/////////////placing the containers //////////////////////////////////////////////////////	

	container.appendChild(header);
	container.appendChild(mts_title);
	container.appendChild(detail_section);

	container.appendChild(new_table);
	
	header.appendChild(logo);
	header.appendChild(business_title);
	header.appendChild(mts_barcode);

	func(container);
}

/**
 * @form Prepare Quotation (NVS)
 * @formNo 258
 */
function form258_print_form()
{	
	print_form258(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
* This function prepares the printing template for the documents like bills and purchase orders
*/
function print_form258(func)
{
	var form_id='form258';
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var logo=document.createElement('div');
	
	var invoice_line=document.createElement('div');
	
	var info_section=document.createElement('div');	
		var customer_info=document.createElement('div');
		var business_info=document.createElement('div');

	var footer=document.createElement('div');
		var signature=document.createElement('div');
		var jurisdiction=document.createElement('div');
		var business_contact=document.createElement('div');

////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:98%;min-height:100px;text-align:center');
		logo.setAttribute('style','width:98%;text-align:center;margin:5px;font-weight:600;font-size:32px;line-height:40px;');
	invoice_line.setAttribute('style','width:98%;margin:2px;');
	info_section.setAttribute('style','width:98%;min-height:85px;font-size:11px;');
		customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;font-size:11px;');
		business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;font-size:11px;');
	footer.setAttribute('style','width:98%;min-height:50px;font-size:11px;');
		signature.setAttribute('style','float:right;width:98%;text-align:right;font-size:11px;');
		jurisdiction.setAttribute('style','margin:10px;width:98%;text-align:left;font-size:11px;');
		business_contact.setAttribute('style','margin:0px;padding:0px;width:98%;text-align:center;page-break-inside:avoid;font-size:11px;');

///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var logo_image=get_session_var('logo');
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

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	
	invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>Quotation Sheet</b></div><hr style='border: 1px solid #00f;'>";
	
	customer_info.innerHTML="<b>Customer: </b><br>"+customer_name+"<br>"+customer_address+"<br>Email: "+email;
	business_info.innerHTML="Quotation #: "+quot_no+"<br>Date: "+date+"<br>Valid Upto: "+valid_date+"<br>Issued By: "+issued_by+"<br>Type: "+quot_type;
	
	signature.innerHTML=signature_text;
	jurisdiction.innerHTML="Note: All disputes subjected to Delhi Jurisdiction";
	business_contact.innerHTML="<hr style='border: 1px solid #00f;margin:5px;'>Address: "+business_address+"<br>Phone: "+business_phone+", E-Mail: "+business_email+"<br>CIN: "+cin+", PAN: "+pan+"<hr style='border: 1px solid #00f;margin:5px;'>";
	
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
	
	info_section.appendChild(customer_info);
	info_section.appendChild(business_info);
	
	footer.appendChild(signature);
	footer.appendChild(jurisdiction);
	footer.appendChild(business_contact);
	
	container.appendChild(spec_table_heading);
	container.appendChild(spec_table);
	
	func(container);
}


/**
 * @form Create RTO
 * @formNo 265
 */
function form265_print_form()
{
	print_form265(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
 * @form Create RTO
 * @formNo 265
 */
function print_form265(func)
{
	var form_id='form265';
	
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_title=document.createElement('div');
		var rto_barcode=document.createElement('img');
	
	var rto_title=document.createElement('div');
	
	var detail_section=document.createElement('div');
	
	var table_container=document.createElement('div');

	////////////setting styles for containers/////////////////////////

	container.setAttribute('style','width:98%;height:90%;margin:0px;padding:0px;');
	header.setAttribute('style','display:block;width:98%;height:70px;margin-top:10px;');
		logo.setAttribute('style','float:left;width:35%;height:60px;');
		business_title.setAttribute('style','float:left;width:40%;height:60px;text-align:center;font-weight:bold;');
		rto_barcode.setAttribute('style','float:right;width:23%;height:60px;padding:left:5px;padding-right:5px;');
	rto_title.setAttribute('style','display:block;width:98%;height:20px;text-align:center');	
	detail_section.setAttribute('style','display:block;width:98%;height:30px;text-align:center;');
	
	///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	var logo_image=get_session_var('logo');

	var master_form=document.getElementById(form_id+'_master');
	var employee_name=master_form.elements['employee'].value;
	var rto_date=master_form.elements['date'].value;
	//var print_date=master_form.elements['pdate'].value;
	var rto_num=master_form.elements['rto_num'].value;
	var page_num=1;

	////////////////filling in the content into the containers//////////////////////////
	
	var table_element=document.getElementById(form_id+'_body');
		
	var total_items=$(table_element).find('tr').length;

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"' style='height:98%;margin-left:10%'>";
	business_title.innerHTML=bt;

	$(rto_barcode).JsBarcode(rto_num,{displayValue:false});
		
	rto_title.innerHTML="Return To Origin";

	employee_text="<td>Employee: "+employee_name+"</td><td>Total Items: "+total_items+"</td>";
	rto_text="<td>RTO #: "+rto_num+"</td><td>RTO Date: "+rto_date+"</td>";
	detail_text="<table style='border:none;width:98%;font-size:11px;'><tr>"+employee_text+"</tr><tr>"+rto_text+"</tr></table>";
	
	detail_section.innerHTML=detail_text;

	var new_table=document.createElement('table');
	new_table.setAttribute('style','font-size:10px;border:none;text-align:left;');
	new_table.setAttribute('class','printing_tables');

	var table_header="<tr style='border-top: 1px solid #000000;'><td style='text-align:left;width:4%'>S.No.</td>"+
				"<td style='text-align:left;width:19%'>C-Note No.</td>"+
				"<td style='text-align:left;width:11%'>Address</td>"+
				"<td style='text-align:left;width:5%'>Wt.</td>"+
				"<td style='text-align:left;width:5%'>P</td>"+
				"<td style='text-align:left;width:5%'>Time</td>"+
				"<td style='text-align:left;width:30%'>Receiver/Comp Seal</td>"+
				"<td style='text-align:left;width:4%'>RC</td>"+
				"<td style='text-align:left;width:15%'>Sign</td></tr>";

	var table_rows=table_header;
	var counter=0;

	var td_text="<td style='border:solid 1px #000000'></td>";
	var tr_text="<tr>"+td_text+td_text+td_text+td_text+td_text+td_text+td_text+td_text+td_text+td_text+"</tr>";
	var rc="<table style='width:15px;height:15px;'><tr>"+td_text+"</tr></table>";

	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		var mob_seal="<table style='width:95%;height:40px;'>"+tr_text+tr_text+"</table><br><div style='font-size:14px;'>"+form.elements[2].value+"</div>";
		
		var awb_num=""+form.elements[0].value;
		var manifest_type=form.elements[6].value;//.replace(/manifest/g,"");
		var order_id=form.elements[7].value;
		var ship_to=form.elements[8].value;
		var merchant_name=form.elements[12].value;
		
		var cnote_no=document.createElement('div');
		var barcode_image=document.createElement('img');
		var barcode_value=document.createElement('div');
		var type_value=document.createElement('div');
		var merchant_value=document.createElement('div');
		
		barcode_image.setAttribute('style','width:130px;height:30px;');
		barcode_value.setAttribute('style','width:130px;font-size:14px;margin:1px;text-align:center;');
		type_value.setAttribute('style','width:130px;font-size:9px;margin:1px;text-align:left;');	
		merchant_value.setAttribute('style','width:130px;font-size:14px;margin:1px;text-align:left;');
		
		barcode_value.innerHTML=awb_num;
		type_value.innerHTML="Type: "+manifest_type+" O-ID: "+order_id;
		merchant_value.innerHTML=merchant_name;
		$(barcode_image).JsBarcode(awb_num,{displayValue:false});

		cnote_no.appendChild(barcode_image);
		cnote_no.appendChild(barcode_value);
		cnote_no.appendChild(type_value);
		cnote_no.appendChild(merchant_value);

		table_rows+="<tr style='border-top: 1px solid #000000;height:60px;'><td><div>"+counter+"</div></td>"+
				"<td><div style='text-align:left;'>"+cnote_no.innerHTML+"</div></td>"+
				"<td><div style='text-align:left;'>"+form.elements[1].value+"</div></td>"+
				"<td><div>"+form.elements[3].value+"</div></td>"+
				"<td><div>"+form.elements[4].value+"</div></td>"+
				"<td></td>"+
				"<td><div style='text-align:left;'>"+mob_seal+"</div></td>"+
				"<td><div>"+rc+"</div></td>"+
				"<td></td></tr>";				
	});
	new_table.innerHTML=table_rows;
	/////////////placing the containers //////////////////////////////////////////////////////	

	container.appendChild(header);
	container.appendChild(rto_title);
	container.appendChild(detail_section);

	container.appendChild(new_table);
	
	header.appendChild(logo);
	header.appendChild(business_title);
	header.appendChild(rto_barcode);

	func(container);
}

/**
 * @form Delivery Challan Details
 * @formNo 268
 */
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


/**
 * @form Purchase bill (nvs)
 * @formNo 270
 */
function form270_print_form()
{
	print_form270(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
* This function prepares the printing template for the documents like bills and purchase orders
*/
function print_form270(func)
{
	var form_id='form270';
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_intro=document.createElement('div');
		var business_contact=document.createElement('div');
	
	var invoice_line=document.createElement('div');
	
	var info_section=document.createElement('div');	
		var customer_info=document.createElement('div');
		var business_info=document.createElement('div');

	var table_container=document.createElement('div');

////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;min-height:100px;text-align:center');
		logo.setAttribute('style','width:100%;text-align:center;font-weight:600;font-size:32px;line-height:40px;');
		business_intro.setAttribute('style','width:100%;text-align:center');
		business_contact.setAttribute('style','width:100%;text-align:left');
	info_section.setAttribute('style','width:100%;min-height:80px');
		customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
		business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
	
///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var logo_image=get_session_var('logo');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');

	var master_form=document.getElementById(form_id+'_master');
	var supplier_name=master_form.elements['supplier'].value;
	var date=master_form.elements['date'].value;	
	var bill_no=master_form.elements['bill_num'].value;
	var tin_no=get_session_var('tin');
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML=bt;
	business_contact.innerHTML="<hr style='border: 1px solid #00f;'>Billing Address: "+business_address+"<br>Contact Nos.: "+business_phone+"<br>E-Mail: "+business_email;
	
	invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>Purchase Bill #: "+bill_no+"</b></div><hr style='border: 1px solid #00f;'>";
	
	customer_info.innerHTML="<b>Supplier: </b><br>"+supplier_name;
	business_info.innerHTML="<b>Buyer</b><br>TIN #: "+tin_no+"<br>Bill Date: "+date+"<br>Bill No: "+bill_no;
	
	var table_element=document.getElementById(form_id+'_body');
	
	/////////////adding new table //////////////////////////////////////////////////////	
	var new_table=document.createElement('table');
	new_table.setAttribute('style','width:100%;font-size:11px;border:1px solid black;text-align:left;');
	new_table.setAttribute('class','plain_table');
	var table_header="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;width:10%;'>S.No.</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:25%;'>Item Name</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:15%'>Qty</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:15%'>Price</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:15%'>Tax</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:15%;font-size:1.2em;font-weight:bold'>Total(inc taxes)</td></tr>";
				
	var table_rows=table_header;
	var counter=0;
	
	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		var item_name=form.elements[0].value;
		var quantity=""+form.elements[1].value;
		var price=form.elements[2].value;
		var amount=form.elements[3].value;
		var tax=form.elements[4].value;
		var total=form.elements[5].value;
		
		table_rows+="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+counter+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+item_name+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+quantity+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+price+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+tax+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;font-size:1.2em;font-weight:bold;'>"+total+"</td></tr>";
	});
	
	var row_count=$(table_element).find('tbody>tr').length;
	var rows_to_add=9-row_count;
	for(var i=0;i<rows_to_add;i++)
	{
		table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	}

	var table_foot=document.getElementById(form_id+'_foot');
	var total_quantity=$(table_foot).find('tr>td:first')[0].innerHTML;
	var total_text=$(table_foot).find('tr>td:nth-child(2)')[0].innerHTML;
	var total_amount=$(table_foot).find('tr>td:nth-child(3)')[0].innerHTML;
	
	var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
				"<td colspan='2' style='border: 1px solid #000;text-align:left;'>"+total_quantity+"</td>"+
				"<td colspan='2' style='border: 1px solid #000;text-align:left;'>"+total_text+"</td>"+
				"<td colspan='2' style='border: 1px solid #000;text-align:left;font-size:1.2em;font-weight:bold;'>"+total_amount+"</td></tr>";
		
	table_rows+=table_foot_row;
	new_table.innerHTML=table_rows;
	
	/////////////placing the containers //////////////////////////////////////////////////////	
	
	container.appendChild(header);
	container.appendChild(invoice_line);
	container.appendChild(info_section);
	
	container.appendChild(new_table);
	
	header.appendChild(logo);
	header.appendChild(business_contact);
	
	info_section.appendChild(customer_info);
	info_section.appendChild(business_info);
	
	func(container);
}

/**
 * @form Create Performa Invoice
 * @formNo 284
 */
function form284_print_form()
{
	print_form284(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
* This function prepares the printing template for the documents like bills and purchase orders
*/
function print_form284(func)
{
	var form_id='form284';
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
	
	info_section.setAttribute('style','width:100%;height:85px;font-size:11px;');
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
	var address=master_form.elements['customer_info'].value;
	var date=master_form.elements['date'].value;
	var bill_no=master_form.elements['bill_num'].value;
	var invoice_type=master_form.elements['bill_type'].value;
	var narration=master_form.elements['narration'].value;
	var cin=get_session_var('cin');
	var pan=get_session_var('pan');
	var customer_email=master_form.elements['email'].value;
	var customer_tin=master_form.elements['tin'].value;
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	
	invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>"+invoice_type+" Invoice</b></div><hr style='border: 1px solid #00f;'>";
	
	customer_info.innerHTML="<b>Customer: </b><br>"+customer_name+"<br>"+address+"<br>Email: "+customer_email+"<br>TIN: "+customer_tin;
	business_info.innerHTML="<b>Seller</b><br>Bill #: "+bill_no+"<br>Date: "+date+"<br>Remarks: "+narration;

	jurisdiction.innerHTML="All disputes subjected to Delhi jurisdiction.<br>This is a computer generated invoice.";
	signature.innerHTML="<div style='float:left;text-align:left;width:50%;'>Customer's Seal & Sign.<br><br><br></div><div style='float:right;width:50%;text-align:right;'>For "+bt+"<br><br>Auth. Signatory<br></div>";
	business_contact.innerHTML="<hr style='border: 1px solid #00f;margin:5px;'>Address: "+business_address+"<br>Phone: "+business_phone+", E-Mail: "+business_email+"<br>CIN: "+cin+", PAN: "+pan+"<hr style='border: 1px solid #00f;margin:5px;'>";

	var table_element=document.getElementById(form_id+'_body');

	/////////////adding new table //////////////////////////////////////////////////////	
	var new_table=document.createElement('table');
	new_table.setAttribute('style','width:100%;font-size:12px;border:1px solid black;text-align:left;');
	new_table.setAttribute('class','plain_table');
	var table_header="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;width:8%;'>S.No.</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:25%;'>Item Name</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:25%'>Details</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:13%'>Quantity</td>"+
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
		var rate=form.elements[3].value;
		var amount=form.elements[4].value;
		
		table_rows+="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+counter+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+item_name+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+details+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+quantity+"</td>"+
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
	
	var total_text_element=$(table_foot).find('tr>td:nth-child(2)');
	var total_amount_element=$(table_foot).find('tr>td:nth-child(3)');
	
	var total_amount_number=$(total_amount_element).find('vtotal').html();
	var wording_total=number2text(total_amount_number);
	
	$(total_amount_element).add(total_text_element).find("input").each(function(index)
	{
		$(this).replaceWith($(this).val());
	});

	var total_text=$(total_text_element)[0].innerHTML;
	var total_amount=$(total_amount_element)[0].innerHTML;
	
	var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
				"<td colspan='2' style='border: 1px solid #000;text-align:left;'>Total (in words): "+wording_total+"</td>"+
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


/**
 * @form receipt
 * @modalNo 291
 */
function form291_print(receipt_id,acc_name,amount,date,narration,address)
{
	print_form291(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	},receipt_id,acc_name,amount,date,narration,address,pan_text);	
}

/**
 * @form receipts (NVS)
 * @formNo 291
 */
function print_form291(func,receipt_id,acc_name,amount,date,narration,address)
{	
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var logo=document.createElement('div');
	
	var invoice_box=document.createElement('div');

	var info_section=document.createElement('div');	
		var info_div=document.createElement('div');
		var info_table=document.createElement('div');

	var footer=document.createElement('div');
		var signature=document.createElement('div');
		var jurisdiction=document.createElement('div');
		var business_contact=document.createElement('div');
		
	////////////setting styles for containers/////////////////////////

	container.setAttribute('style','width:100%;');
	header.setAttribute('style','width:100%;height:auto;');
		logo.setAttribute('style','width:100%;text-align:center;margin:5px;line-height:40px;');
	invoice_box.setAttribute('style','width:100%;margin:10px;text-align:center;font-size:20px;');
	info_section.setAttribute('style','width:100%;min-height:60px;margin:10px 5px;padding:2px;');
		info_div.setAttribute('style','width:96%;padding:5px;font-size:13px;line-height:14px;');
		info_table.setAttribute('style','display:block;margin:2px;width:100%;text-align:left;font-size:13px;');
	footer.setAttribute('style','width:100%;min-height:50px');
		signature.setAttribute('style','display:block;float:right;width:100%;text-align:right;');
		jurisdiction.setAttribute('style','display:block;margin:5px;width:100%;text-align:left;font-size:11px;');
		business_contact.setAttribute('style','display:block;margin:5px;padding:0px;line-height:11px;width:100%;text-align:center;font-size:11px;');

	///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var logo_image=get_session_var('logo');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');
	var cin=get_session_var('cin');
	var pan=get_session_var('pan');
	var signature_text="For "+bt+"<br><br><br>Auth. Signatory<br>";
	
	////////////////filling in the content into the containers//////////////////////////
	var wording_total=number2text(amount);
	
	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	invoice_box.innerHTML="<hr style='border: 1px solid #00f;margin:5px;'>Receipt Voucher<hr style='border: 1px solid #00f;margin:5px;'>";
	
	info_div.innerHTML="<div style='width:50%;float:left;text-align:left;'>Receipt #: "+receipt_id+"</div><div style='width:50%;float:right;text-align:right;'>Dated: "+get_my_past_date(date)+"</div>";
	
	///////////central information table///////////
	var table_text="<table style='border:none;text-align:left;font-size:13px;'><tr style='border-top:1px solid #555;border-bottom:1px solid #555;'><th style='width:70%;border-right:1px solid #555;font-weight:400;'>Particulars</th><th style='font-weight:400;width:30%;'>Amount</th></tr>";
		table_text+="<tr style='height:40px;'><td style='text-align:left;border-right:1px solid #555;'>Account: "+acc_name+"<br>Address: "+address+"</td><td></td></tr>";
		table_text+="<tr style='height:40px;'><td style='text-align:left;border-right:1px solid #555;'>Remarks: "+narration+"</td><td></td></tr>";
		table_text+="<tr style='border-top:1px solid #555;border-bottom:1px solid #555;text-align:left;'><td style='text-align:left;border-right:1px solid #555;'>Amount (in words): "+wording_total+"</td><td style='text-align:left;'>Rs. "+amount+"</td></tr></table>";
	
	/////////////////////////////////////////////
	info_table.innerHTML=table_text;	
	
	////////////////filling in the content into the containers//////////////////////////
	
	signature.innerHTML=signature_text;
	jurisdiction.innerHTML="All disputes subjected to Delhi jurisdiction.<br>This is a computer generated receipt.";
	business_contact.innerHTML="<hr style='border: 1px solid #00f;margin:5px;'>Address: "+business_address+"<br>Phone: "+business_phone+", E-Mail: "+business_email+"<br>CIN: "+cin+", PAN: "+pan+"<hr style='border: 1px solid #00f;margin:5px;'>";
	///////////////////////////////////////

	container.appendChild(header);
	container.appendChild(invoice_box);
	container.appendChild(info_section);
	container.appendChild(footer);

	header.appendChild(logo);

	info_section.appendChild(info_div);
	info_section.appendChild(info_table);
	
	footer.appendChild(jurisdiction);
	footer.appendChild(signature);
	footer.appendChild(business_contact);

	func(container);
}

/**
 * @form Create Performa Invoice
 * @formNo 292
 */
function form292_print_form(id)
{
	print_form292(id,function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
* This function prepares the printing template for the documents like bills and purchase orders
*/
function print_form292(id,func)
{
	var form_id='form292';
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
		var jurisdiction=document.createElement('div');
		var business_contact=document.createElement('div');
	
////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;text-align:center');
		logo.setAttribute('style','width:100%;text-align:center;');
	
	info_section.setAttribute('style','width:100%;height:85px;font-size:14px;');
		customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
		business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
	
	footer.setAttribute('style','width:98%;min-height:100px;');
		jurisdiction.setAttribute('style','margin:10px;width:98%;min-height:20px;text-align:left;font-size:12px;');
		business_contact.setAttribute('style','margin:0px;padding:0px;width:98%;text-align:center;page-break-inside:avoid;font-size:12px;');

///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var logo_image=get_session_var('logo');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');

	var master_form=document.getElementById(form_id+'_'+id);
	var customer_name=master_form.elements[0].value;
	var domain=master_form.elements[1].value;
	var bill_start=master_form.elements[2].value;
	var bill_end=master_form.elements[3].value;
	var bill_no=master_form.elements[4].value;
	var narration=master_form.elements[5].value;
	var bill_user_accounts=master_form.elements[6].value;
	var bill_amount=master_form.elements[7].value;
	var bill_tax=master_form.elements[8].value;
	var bill_total=master_form.elements[9].value;
	
	var st_no=get_session_var('service_tax_no');
	var pan=get_session_var('pan');
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	
	invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='font-size:16px;'>Invoice</b></div><hr style='border: 1px solid #00f;'>";
	
	customer_info.innerHTML="<b>Customer: </b><br>"+customer_name+"<br>Account Name: "+domain;
	business_info.innerHTML="Bill #: "+bill_no+"<br>Date: "+get_my_date()+"<br>ST #: "+st_no;

	jurisdiction.innerHTML="All disputes subjected to Delhi jurisdiction.<br>This is a computer generated invoice.";
	business_contact.innerHTML="<hr style='border: 1px solid #00f;margin:5px;'>Address: "+business_address+"<br>Phone: "+business_phone+", E-Mail: "+business_email+"<br>PAN: "+pan+"<hr style='border: 1px solid #00f;margin:5px;'>";

	var table_element=document.getElementById(form_id+'_body');

	/////////////adding new table //////////////////////////////////////////////////////	
	var new_table=document.createElement('table');
	new_table.setAttribute('style','width:100%;font-size:14px;border:1px solid #00f;text-align:left;');
	new_table.setAttribute('class','plain_table');
	var table_header="<tr>"+
				"<td style='border: 1px solid #00f;text-align:left;width:6%;'>S.No.</td>"+
				"<td style='border: 1px solid #00f;text-align:left;width:24%;'>Item</td>"+
				"<td style='border: 1px solid #00f;text-align:left;width:25%'>Period</td>"+
				"<td style='border: 1px solid #00f;text-align:left;width:15%'>Amount</td>"+
				"<td style='border: 1px solid #00f;text-align:left;width:15%'>Tax</td>"+
				"<td style='border: 1px solid #00f;text-align:left;width:15%'>Total</td></tr>";

	var table_rows=table_header;
		
	table_rows+="<tr>"+
				"<td style='border: 1px solid #00f;text-align:left;'>1</td>"+
				"<td style='border: 1px solid #00f;text-align:left;'>"+narration+"</td>"+
				"<td style='border: 1px solid #00f;text-align:left;'>"+bill_start+" - "+bill_end+"</td>"+
				"<td style='border: 1px solid #00f;text-align:left;'>Rs. "+bill_amount+"</td>"+
				"<td style='border: 1px solid #00f;text-align:left;'>Rs. "+bill_tax+"</td>"+
				"<td style='border: 1px solid #00f;text-align:left;'>Rs. "+bill_total+"</td></tr>";
	
	var rows_to_add=10;
	for(var i=0;i<rows_to_add;i++)
	{
		table_rows+="<tr style='flex:2;border-right:1px solid #00f;border-left:1px solid #00f;height:30px;'><td style='border:none'></td><td style='border:none'></td><td style='border:none'></td><td style='border:none'></td><td style='border:none'></td><td style='border:none'></td></tr>";
	}

	var wording_total=number2text(bill_total);
	
	var table_foot_row="<tr style='border-right: 1px solid #00f;border-left: 1px solid #00f;border-top: 1px solid #00f;a'>"+
				"<td colspan='3' style='border: 1px solid #00f;text-align:left;'>Total (in words): "+wording_total+"</td>"+
				"<td colspan='1' style='border: 1px solid #00f;text-align:left;'>Total</td>"+
				"<td colspan='2' style='border: 1px solid #00f;text-align:left;font-size:1.2em;font-weight:bold;'>Rs. "+bill_total+"</td></tr>";
		
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
	footer.appendChild(business_contact);
	
	func(container);
}

function form294_print_form()
{
	print_form294(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});
}

/**
 * @form Create Bill (Sehgal)
 * @formNo 294
 */
function print_form294(func)
{
	var form_id='form294';
	
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
		var tandc=document.createElement('div');
		var signature=document.createElement('div');
		var business_contact=document.createElement('div');
	
////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;text-align:center');
		business_intro.setAttribute('style','width:100%;text-align:center;font-size:18px;margin:10px;');
		invoice_line.setAttribute('style','width:100%;text-align:center;font-size:18px;margin:10px;');
	info_section.setAttribute('style','width:100%;font-size:14px;');
		customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:46%;height:90px;border: 1px solid #000;border-radius:5px;');
		business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:46%;height:90px;border: 1px solid #000;border-radius:5px;');
	footer.setAttribute('style','width:100%;min-height:100px;font-size:14px;');
		tandc.setAttribute('style','float:left;width:60%;min-height:50px');
		signature.setAttribute('style','float:right;width:30%;min-height:60px');
	business_contact.setAttribute('style','width:100%;text-align:center;margin:10px;');
	
///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	var logo_image=get_session_var('logo');
	var business_intro_text=get_session_var('business_intro');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');
	var business_website=get_session_var('website');

	var master_form=document.getElementById('form294_master');
	var customer_name=master_form.elements['customer'].value;
	var customer_address1=document.getElementById('form294_customer_info').innerHTML;
	var customer_address=customer_address1.replace("Address<br>","");
	var date=master_form.elements['date'].value;
	var invoice_no=master_form.elements['bill_num'].value;
	var customer_cst=master_form.elements['cst'].value;	
	var customer_tin=master_form.elements['tin'].value;
	var tin_no=get_session_var('tin');
	var sales_tax_no=get_session_var('sales_tax_no');	
	var service_tax_no=get_session_var('service_tax_no');	
	var tax_text="Tin No: "+tin_no;
	
	var invoice_text="Invoice";
	var tandc_text=get_session_var('bill_message');
	var signature_text="<br>For "+bt+"<br><br><br>Auth. Signatory<br>";
	
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	business_intro.innerHTML="<hr style='border: 1px solid #000;margin:2px;'>"+business_intro_text;
	business_contact.innerHTML="<hr style='border: 1px solid #000;margin:2px;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email+" Website: "+business_website+"<hr style='border: 1px solid #000;margin:2px;'>";
	invoice_line.innerHTML="<hr style='border: 1px solid #000;margin:2px'><div style='text-align:center;'><b style='text-size:1.2em'>"+invoice_text+"</b></div><hr style='border: 1px solid #000;margin:2px'>";

	customer_info.innerHTML="<b>Customer</b><br>"+customer_name+"<br>"+customer_address+"<br>CST#: "+customer_cst+"<br>TIN#: "+customer_tin;

	business_info.innerHTML=tax_text+"<br>Date: "+date+"<br>Invoice No: "+invoice_no;

	tandc.innerHTML="<br><b>Terms and Conditions</b><br>"+tandc_text;
	signature.innerHTML=signature_text;

	var table_element=document.getElementById(form_id+'_body');
	/////////////adding new table //////////////////////////////////////////////////////	

	var new_table=document.createElement('table');
	new_table.setAttribute('style','width:100%;font-size:14px;border:1px solid black;text-align:left;');
	new_table.setAttribute('class','plain_table');
	var table_header="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;width:8%;'>S.No.</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:32%;'>Item Name</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:20%'>Quantity</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:20%'>Rate</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:20%'>Amount</td></tr>";

	var table_rows=table_header;
	var counter=0;

	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		var item_name=form.elements[0].value;
		var quantity=""+form.elements[1].value;
		var rate=form.elements[2].value;
		var amount=form.elements[3].value;
		
		table_rows+="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+counter+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+item_name+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+quantity+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+rate+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+amount+"</td></tr>";
	});

	var total_amount=0;
	$("[id^='save_form294']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		if(!isNaN(parseFloat(subform.elements[3].value)))
			total_amount+=parseFloat(subform.elements[3].value);		
	});

	var tax_rate=0;
	var discount=0;
	var cartage=0;
	if(document.getElementById('form294_discount'))
	{
		discount=parseFloat(document.getElementById('form294_discount').value);
		tax_rate=parseFloat(document.getElementById('form294_tax').value);
		cartage=parseFloat(document.getElementById('form294_cartage').value);
	}

	var total_amount=my_round(total_amount,2);
	var tax=my_round((tax_rate*((total_amount-discount)/100)),2);		
	var total_total=my_round(total_amount+tax-discount+cartage,0);

	var wording_total=number2text(total_total);
	
	var row_count=$(table_element).find('tbody>tr').length;
	var rows_to_add=12-row_count;
	
	for(var i=0;i<rows_to_add;i++)
	{
		table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td><td></td></tr>";
	}

	var table_foot=document.getElementById(form_id+'_foot');
	var total_quantity=$(table_foot).find('tr>td:first')[0].innerHTML;
	var total_text_element=$(table_foot).find('tr>td:nth-child(2)');
	var total_amount_element=$(table_foot).find('tr>td:nth-child(3)');
	
	$(total_amount_element).add(total_text_element).find("input").each(function(index)
	{
		$(this).replaceWith($(this).val());
	});

	var total_text=$(total_text_element)[0].innerHTML;
	var total_amount=$(total_amount_element)[0].innerHTML;
	
	var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
				"<td colspan='2' style='border: 1px solid #000;text-align:left;'>Total (in words): "+wording_total+"</td>"+
				"<td colspan='1' style='border: 1px solid #000;text-align:left;'>"+total_text+"</td>"+
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
	header.appendChild(business_intro);
	
	info_section.appendChild(customer_info);
	info_section.appendChild(business_info);
	
	footer.appendChild(tandc);
	footer.appendChild(signature);
	
	container.appendChild(business_contact);
	
	func(container);
}

/**
 * @form Create Purchase order (Sehgal)
 * @formNo 296
 */
function form296_print_form()
{	
	print_form296(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
* This function prepares the printing template for the documents like bills and purchase orders
*/
function print_form296(func)
{
	var form_id='form296';
	////////////setting up containers///////////////////////	
	var container=document.createElement('div');
	var header=document.createElement('div');
		var logo=document.createElement('div');
		var business_intro=document.createElement('div');
		var business_contact=document.createElement('div');
	
	var invoice_line=document.createElement('div');
	
	var info_section=document.createElement('div');	
		var customer_info=document.createElement('div');
		var business_info=document.createElement('div');

	var table_container=document.createElement('div');

	var footer=document.createElement('div');
		var tandc=document.createElement('div');
		var signature=document.createElement('div');

////////////setting styles for containers/////////////////////////

	header.setAttribute('style','width:100%;min-height:100px;text-align:center');
		logo.setAttribute('style','width:100%;text-align:center;font-weight:600;font-size:32px;line-height:40px;');
		business_intro.setAttribute('style','width:100%;text-align:center');
		business_contact.setAttribute('style','width:100%;text-align:left');
	info_section.setAttribute('style','width:100%;min-height:80px');
		customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
		business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:46%;height:80px;border: 1px solid #00f;border-radius:5px;');
	footer.setAttribute('style','width:100%;min-height:100px');
		tandc.setAttribute('style','float:left;width:60%;min-height:50px');
		signature.setAttribute('style','float:right;width:30%;min-height:60px');

///////////////getting the content////////////////////////////////////////

	var bt=get_session_var('title');
	var font_size=get_session_var('print_size');
	var logo_image=get_session_var('logo');
	//var business_intro_text=get_session_var('business_intro');
	var business_address=get_session_var('address');
	var business_phone=get_session_var('phone');
	var business_email=get_session_var('email');
	//var business_website=get_session_var('website');

	var master_form=document.getElementById(form_id+'_master');
	var supplier_name=master_form.elements['supplier'].value;
	var date=master_form.elements['date'].value;	
	var order_no=master_form.elements['order_num'].value;
	var supplier_address=master_form.elements['address'].value;
	var vat_no=get_session_var('vat');
	var tin_no=get_session_var('tin');
		
	var tandc_text=get_session_var('po_message').replace(/\n/g,"<br>");
	var signature_text="<br>"+bt+"<br><br><br>Auth. Signatory<br>";
	
	////////////////filling in the content into the containers//////////////////////////

	//logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	logo.innerHTML=bt;
	business_contact.innerHTML="<hr style='border: 1px solid #00f;'>Billing Address: "+business_address+"<br>Buyer VAT #:"+vat_no+"<br>Contact Nos.: "+business_phone+"<br>E-Mail: "+business_email;
	
	invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>Purchase Order #: "+order_no+"</b></div><hr style='border: 1px solid #00f;'>";
	
	customer_info.innerHTML="<b>Supplier: </b><br>"+supplier_name+"<br>"+supplier_address;
	business_info.innerHTML="<b>Buyer</b><br>TIN #: "+tin_no+"<br>PO Issue Date: "+date+"<br>Purchase Order No: "+order_no;
	
	tandc.innerHTML="<br><b>Terms and Conditions</b><br>"+tandc_text;
	signature.innerHTML=signature_text;

	var table_element=document.getElementById(form_id+'_body');
	
	/////////////adding new table //////////////////////////////////////////////////////	
	var new_table=document.createElement('table');
	new_table.setAttribute('style','width:100%;font-size:11px;border:1px solid black;text-align:left;');
	new_table.setAttribute('class','plain_table');
	var table_header="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;width:8%;'>S.No.</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:20%;'>Item Name</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:20%'>Description</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:10%'>Qty</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:10%'>MRP</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:10%'>Price</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:10%'>Tax</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:10%;font-size:1.2em;font-weight:bold'>Total(inc taxes)</td></tr>";
				
	var table_rows=table_header;
	var counter=0;
	
	$(table_element).find('form').each(function(index)
	{
		counter+=1;
		var form=$(this)[0];
		var item_desc=form.elements[1].value;
		var item_name=form.elements[0].value;
		var quantity=""+form.elements[2].value;
		var mrp=form.elements[4].value;
		var price=form.elements[5].value;
		var tax_rate=form.elements[7].value;		
		var total=form.elements[9].value;

		table_rows+="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+counter+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+item_name+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+item_desc+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+quantity+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+mrp+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+price+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;'>"+tax_rate+"</td>"+
				"<td style='border: 1px solid #000;text-align:left;font-size:1.2em;font-weight:bold;'>"+total+"</td></tr>";
	});
	
	var row_count=$(table_element).find('tbody>tr').length;
	var rows_to_add=9-row_count;
	for(var i=0;i<rows_to_add;i++)
	{
		table_rows+="<tr style='flex:2;border-right:1px solid black;border-left:1px solid black;height:20px;'><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	}

	var table_foot=document.getElementById(form_id+'_foot');
	var total_quantity=$(table_foot).find('tr>td:first')[0].innerHTML;
	var total_text=$(table_foot).find('tr>td:nth-child(2)')[0].innerHTML;
	var total_amount=$(table_foot).find('tr>td:nth-child(3)')[0].innerHTML;
	
	var table_foot_row="<tr style='border-right: 1px solid #000000;border-left: 1px solid #000000;border-top: 1px solid #000000;'>"+
				"<td colspan='4' style='border: 1px solid #000;text-align:left;'>"+total_quantity+"</td>"+
				"<td colspan='3' style='border: 1px solid #000;text-align:left;'>"+total_text+"</td>"+
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
	//header.appendChild(business_intro);
	header.appendChild(business_contact);
	
	info_section.appendChild(customer_info);
	info_section.appendChild(business_info);
	
	footer.appendChild(tandc);
	footer.appendChild(signature);
	
	func(container);
}