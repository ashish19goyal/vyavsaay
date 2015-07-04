/**
* Print barcodes
*/
function print_barcode(string)
{
	var container=document.createElement('div');
	var image_element=document.createElement('img');
	var name_element=document.createElement('div');
		
	container.setAttribute('style','width:200px;height:100px');	
	image_element.setAttribute('style','width:200px;');
	name_element.setAttribute('style','width:200px;font-weight:bold;font-size:28px;margin:1px;text-align:center');
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
	
	container.setAttribute('style','width:200px;height:100px');
	sku_element.setAttribute('style','width:200px;text-align:center;');
	image_element.setAttribute('style','width:200px;');
	name_element.setAttribute('style','width:200px;');
	
	container.appendChild(sku_element);
	container.appendChild(image_element);
	container.appendChild(name_element);

	sku_element.innerHTML=sku;	   
	$(image_element).JsBarcode(barcode,{displayValue:true,fontSize:24});
	name_element.innerHTML=name;	   

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
	   var font_size=get_session_var('print_size');
	   $(table_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	   container.appendChild(business_title);
	   container.appendChild(title);
	   container.appendChild(table_copy);
	   $.print(container);
	});
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
	
////////////////filling in the content into the containers/////////////////////////////////////

	logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
	business_intro.innerHTML="<hr style='border: 1px solid #000;'>"+business_intro_text+"<hr style='border: 1px solid #000;'>";
		
	business_contact.innerHTML="<hr style='border: 1px solid #000;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email+" Website: "+business_website;	

	if(powered_by_text!="")	
		powered_by.innerHTML="<hr style='border: 1px solid #000;'><a href='"+powered_by_link+"'>Powered By: "+powered_by_text+"</a>";	
	
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
			
			nl_item_heading.setAttribute('style','display:block;margin:2px;padding:2px;width:98%');
			
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

	header.setAttribute('style','width:100%;min-height:100px;');
		business_title.setAttribute('style','width:90%;text-align:center;');
	invoice_box.setAttribute('style','width:98%;min-height:60px;background-color:#bbbbbb;border: 1px solid #000000;padding:2px;');
	info_section.setAttribute('style','width:99%;min-height:60px;border: 1px solid #000000;');
		customer_info.setAttribute('style','padding:2px;margin:2px;float:left;width:48%;height:60px;text-align:left;');
		payment_info.setAttribute('style','padding:2px;margin:2px;float:right;width:48%;height:60px;text-align:right;');
	
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
	invoice_box.innerHTML="<div style='float:left;width:50%'>Bill No.: "+invoice_no+"</div><div style='float:right;text-align:right;width:50%'>Bill Date: "+bill_date+"<br>Due Date: "+due_date+"</div>";
	
	customer_info.innerHTML="<b>Customer</b><br>"+customer_name+"<br>"+customer_address;
	payment_info.innerHTML=payment_text;

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
	container.appendChild(invoice_box);
	container.appendChild(info_section);

	container.appendChild(table_copy);

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
	print_tabular_form('form12','Sale Bill');}


/**
 * @form Enter customer returns
 * @formNo 15
 */
function form15_print_form()
{
	print_tabular_form('form15','Sale Returns');
}


/**
 * @form Enter supplier returns
 * @formNo 19
 */
function form19_print_form()
{
	print_tabular_form('form19','Purchase Returns');
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
		business_intro.setAttribute('style','width:100%;text-align:center');
		business_contact.setAttribute('style','width:100%;text-align:center');
	info_section.setAttribute('style','width:100%;min-height:60px');
		customer_info.setAttribute('style','padding:5px;margin:5px;float:left;width:46%;height:60px;border: 1px solid #00f;border-radius:5px;');
		business_info.setAttribute('style','padding:5px;margin:5px;float:right;width:46%;height:60px;border: 1px solid #00f;border-radius:5px;');
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
	var supplier_name=master_form.elements[1].value;
	var date=master_form.elements[2].value;	
	var order_no=master_form.elements[3].value;
	var vat_no=get_session_var('vat');
		
	var tandc_text=get_session_var('po_message');
	var signature_text="<br>"+bt+"<br><br><br>Auth. Signatory<br>";
	
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML="<img src='./client_images/"+logo_image+"'>";
	//business_intro.innerHTML="<hr style='border: 1px solid #000;'>"+business_intro_text;
	business_contact.innerHTML="<hr style='border: 1px solid #00f;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email;
	
	invoice_line.innerHTML="<hr style='border: 1px solid #00f;'><div style='text-align:center;'><b style='text-size:1.2em'>Purchase Order</b></div><hr style='border: 1px solid #00f;'>";
	
	customer_info.innerHTML="<b>To</b><br>"+supplier_name;
	business_info.innerHTML="VAT #: "+vat_no+"<br>Date: "+date+"<br>Order No: "+order_no;
	
	tandc.innerHTML="<br><b>Terms and Conditions</b><br>"+tandc_text;
	signature.innerHTML=signature_text;

	var table_element=document.getElementById(form_id+'_body').parentNode;
	table_copy=table_element.cloneNode(true);
	
	table_copy.removeAttribute('class');
	$(table_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child,form").remove();
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
	
	$(table_copy).find('label').each(function(index)
	{
		$(this).replaceWith($(this).html());
	});

	$(table_copy).find('tbody').attr('style','height:400px;');
	$(table_copy).find('th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	$(table_copy).find('td').attr('style',"border-right:2px solid black;border-left:2px solid black;text-align:left;font-size:"+font_size+"em");
	$(table_copy).find('tfoot').attr('style',"border:2px solid black;text-align:left;");

	$(table_copy).find("tbody>tr").attr('style','flex:1;height:30px');
	
	$(table_copy).find("th:first, td:first").css('width','300px');
	$(table_copy).find("tbody").append("<tr style='flex:2;border-right:2px solid black;border-left:2px solid black;'><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td></tr>");
	
	/////////////placing the containers //////////////////////////////////////////////////////	
	
	container.appendChild(header);
	container.appendChild(invoice_line);
	container.appendChild(info_section);
	
	container.appendChild(table_copy);
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
	print_tabular_form('form72','Sale Bill');
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
	var new_thead="<tr>"+
		"<th colspan='2'>Item</th>"+
		"<th>Qty.</th>" +
		"<th>Total</th>" +
		"<th></th>"+
		"</tr>";
	
	var table_element=document.getElementById('form91_body').parentNode;
	var table_copy=table_element.cloneNode(true);
	$(table_copy).find('datalist,form').remove();
	
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).attr('value',$(this).val());
	});
	
	var tfoot=table_copy.children[2].innerHTML;
	var new_tfoot=tfoot.replace(/<td colspan='3'/g,"<td colspan='2'");
	var new_tfoot=new_tfoot.replace(/<td colspan=\"3\"/g,"<td colspan='2'");
	
	//console.log(tbody);
	table_copy.children[0].innerHTML=new_thead;
	table_copy.children[2].innerHTML=new_tfoot;
	
	var single_bill_items=parseInt(get_session_var('bill_print_items'));
	var rows=table_copy.children[1].children.length;
	
	for(var i=0;i<rows;i++)
	{
		table_copy.children[1].children[i].children[0].setAttribute('colspan','2');
		
		table_copy.children[1].children[i].removeChild(table_copy.children[1].children[i].children[1]);
		table_copy.children[1].children[i].removeChild(table_copy.children[1].children[i].children[2]);
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
		print_tabular_form('form91','Sale Bill',new_table_copy);
	}
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
	print_tabular_form('form119','Purchase Bill');
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

	logo.innerHTML="<img src='./client_images/"+logo_image+"'>";
	business_intro.innerHTML="<hr style='border: 1px solid #000;'>"+business_intro_text+"<hr style='border: 1px solid #000;'>";
	business_contact.innerHTML=business_address+" Tel: "+business_phone+" E-Mail: "+business_email+" Website: "+business_website+"<hr style='border: 1px solid #000;'>";
	
	customer_info.innerHTML="<div style='width:70%;float:left;'>To<br>"+customer_name+"<br>"+customer_address+"</div><div style='width:30%;float:right;'>Date: "+date+"</div>";
	
	//subject.innerHTML="<br>"+subject_text;
	var new_intro_text=intro_text.replace(/\n/g,"<br>");
	intro.innerHTML=new_intro_text+"<br><br>";	
	
	tandc.innerHTML="<br><b>Terms and Conditions</b><br>"+tandc_text;
	signature.innerHTML=signature_text;
	
		
	var table_element=document.getElementById('form153_body').parentNode;
	table_copy=table_element.cloneNode(true);
	
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
	
	$.print(container);
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
	var customer_name=master_form.elements[1].value;
	var customer_address1=document.getElementById('form154_customer_info').innerHTML;
	var customer_address=customer_address1.replace("Address<br>","");
	var date=master_form.elements[4].value;
	var narration=master_form.elements[5].value;
	var invoice_no=master_form.elements[7].value;
	var customer_cst=master_form.elements[13].value;	
	var customer_tin=master_form.elements[14].value;
	var tin_no=get_session_var('tin');
	var sales_tax_no=get_session_var('sales_tax_no');	
	var service_tax_no=get_session_var('service_tax_no');	
	var tax_text="Tin No: "+tin_no;
	var hiring=false;
	var a1_job=false;
	if(master_form.elements[6].checked)
		a1_job=true;

	var invoice_text="Invoice";
	if(master_form.elements[2].value=='Retail')
	{
		invoice_text="Retail Invoice";
	}
	else if(master_form.elements[2].value=='Tax')
	{
		invoice_text="Tax Invoice";
	}
	else if(master_form.elements[2].value=='Hiring')
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

	logo.innerHTML="<img src='./client_images/"+logo_image+"'>";
	business_intro.innerHTML="<hr style='border: 1px solid #000;margin:2px;'>"+business_intro_text;
	business_contact.innerHTML="<hr style='border: 1px solid #000;margin:2px;'>"+business_address+" Tel: "+business_phone+" E-Mail: "+business_email+" Website: "+business_website;
	
	invoice_line.innerHTML="<hr style='border: 1px solid #000;margin:2px'><div style='text-align:center;'><b style='text-size:1.2em'>"+invoice_text+"</b></div><br>";
	
	if(master_form.elements[2].value=='Tax' || master_form.elements[2].value=='Retail')
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
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
	
	$(table_copy).find('label').each(function(index)
	{
		$(this).replaceWith($(this).html());
	});
		
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
	}
	else 
	{
		$(table_copy).find('tfoot > tr > td:first').attr('colspan','2');
		$(table_copy).find('tfoot > tr > td:nth-child(2)').attr('colspan','2');
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
	$(table_copy).find("tbody>tr").attr('style','flex:1;height:30px');
	
	if(hiring)
	{
		$(table_copy).find("th:nth-child(3), td:nth-child(3)").css('width','200px');
		$(table_copy).find("th:first, td:first").css('width','50px');
		var row_count=$(table_copy).find('tbody>tr').length;
		var rows_to_add=15-row_count;
		for(var i=0;i<rows_to_add;i++)
		{		
			$(table_copy).find("tbody").append("<tr style='flex:2;border-right:2px solid black;border-left:2px solid black;'><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td><td style='border-right:2px solid black;border-left:2px solid black;'></td></tr>");
		}
	}
	else
	{
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
 * @form Production Plan
 * @formNo 186
 */
function form186_print_form()
{
	print_form186(function(container)
	{
		$.print(container);
		container.innerHTML="";	
	});	
}

/**
 * @form Create Production Plan
 * @formNo 186
 */
function print_form186(func)
{
	var form_id='form186';
	
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
	var plan_name=master_form.elements[1].value;
	var from_date=master_form.elements[2].value;
	var to_date=master_form.elements[3].value;
	var plan_status=master_form.elements[4].value;
		
	////////////////filling in the content into the containers//////////////////////////

	logo.innerHTML="<img src='./client_images/"+logo_image+"'>";
	business_title.innerHTML=bt;
	plan_line.innerHTML="<div style='float:left;width:50%'>From: "+from_date+"</div><div style='float:right;text-align:right;width:50%'>To: "+to_date+"</div>";	
	plan_info.innerHTML="<hr style='border: 1px solid #000;margin:2px'>Plan Name: </b>"+plan_name+"<br>Plan Status: "+plan_status+"<hr style='border: 1px solid #000;margin:2px'>";
	
	address.innerHTML="Address: "+business_address;

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
	
	$(table_copy).find('th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	$(table_copy).find('td').attr('style',"border-right:2px solid black;border-left:2px solid black;text-align:left;font-size:"+font_size+"em");
	$(table_copy).find('tfoot').attr('style',"border:2px solid black;text-align:left;");
	$(table_copy).find("tbody>tr").attr('style','flex:1;height:30px');

	$(table_copy).find("th:first, td:first").css('width','60px');
	$(table_copy).find("th:nth-child(2), td:nth-child(2)").css('width','300px');
	
	/////////////placing the containers //////////////////////////////////////////////////////	

	container.appendChild(header);
	container.appendChild(plan_line);
	container.appendChild(info_section);

	container.appendChild(table_copy);
	container.appendChild(footer);

	header.appendChild(logo);
	header.appendChild(business_title);

	info_section.appendChild(plan_info);

	footer.appendChild(address);

	func(container);
}

/**
 * @form Create service bills
 * @formNo 10
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

	logo.innerHTML="<img src='./client_images/"+logo_image+"'>";
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
