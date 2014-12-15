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
	   table_copy.setAttribute('style','font-size:1em;');
	   container.appendChild(business_title);
	   container.appendChild(title);
	   container.appendChild(table_copy);
	   $.print(container);
	});
}

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
 * @form Create pamphlets
 * @formNo 2
 */
function form2_print_form()
{	
	var form=document.getElementById("form2_master");
	var pamphlet_name=form.elements[1].value;
	var pamphlet_id=form.elements[2].value;
	
	var container=document.getElementById('print_container');
	
	var print_pamphlet=document.createElement('div');
		print_pamphlet.setAttribute('class','print_pamphlet');
	var header=document.createElement('div');
		header.setAttribute('class','header');
	var logo=document.createElement('div');
		logo.setAttribute('class','logo');
		logo.innerHTML="<img src='./images/feedback.jpeg'>";
	var title=document.createElement('div');
		title.setAttribute('class','title');
		title.textContent='Vyavsaay.com';
	var seller_info=document.createElement('div');
		seller_info.setAttribute('class','seller_info');
	var seller_phone=document.createElement('div');
		seller_phone.setAttribute('class','seller_phone');
		seller_phone.textContent='Contact No: 9818005232';
	var seller_address=document.createElement('div');
		seller_address.setAttribute('class','seller_address');
		seller_address.textContent="Office: R.S.D. colony, Sirsa";
	var content=document.createElement('div');
		content.setAttribute('class','content');
	var pamphlet_header=document.createElement('div');
		pamphlet_header.setAttribute('class','pamphlet_header');
	var pamphlet_time=document.createElement('div');
		pamphlet_time.setAttribute('class','pamphlate_time');
		pamphlet_time.textContent='hurry up! Offers limited';
	var offers=document.createElement('div');
		offers.setAttribute('class','offers');
	
		container.appendChild(print_pamphlet);
		print_pamphlet.appendChild(header);
		print_pamphlet.appendChild(content);
		header.appendChild(logo);
		header.appendChild(title);
		header.appendChild(seller_info);
		seller_info.appendChild(seller_phone);
		seller_info.appendChild(seller_address);
		content.appendChild(pamphlet_header);
		pamphlet_header.appendChild(pamphlet_time);
		content.appendChild(offers);
	
	var pamphlet_items_data="<pamphlet_items>" +
			"<item_name></item_name>" +
			"<offer></offer>" +
			"<pamphlet_id>"+pamphlet_id+"</pamphlet_id>" +
			"</pamphlet_items>";
	
	fetch_requested_data('form44',pamphlet_items_data,function(results)
	{
		for(var i in results)
		{
			var offer_item=document.createElement('div');
				offer_item.setAttribute('class','offer_item');
			var product_name=document.createElement('div');
				product_name.setAttribute('class','product_name');
				product_name.textContent=results[i].item_name;
			var offer_detail=document.createElement('div');
				offer_detail.setAttribute('class','offer_detail');
				offer_detail.textContent=results[i].offer;
				
				offers.appendChild(offer_item);
				offer_item.appendChild(product_name);
				offer_item.appendChild(offer_detail);
		}	
		
		//console.log(container);
		$.print(container);
		container.removeChild(print_pamphlet);


	});		
	//$(content).hide();
}

/**
 * @form Manage Pamphlets
 * @formNo 44
 * @param button
 */
function form44_print_item(button)
{	
	var form_id=$(button).attr('form');
	var form=document.getElementById(form_id);
	var pamphlet_name=form.elements[1].value;
	var pamphlet_id=form.elements[2].value;
	
	var container=document.getElementById('print_container');
	
	var print_pamphlet = document.createElement('div');
		print_pamphlet.setAttribute('class','print_pamphlet');
	var header=document.createElement('div');
		header.setAttribute('class','header');
	var logo=document.createElement('div');
		logo.setAttribute('class','logo');
		logo.innerHTML="<img src='./images/feedback.jpeg'>";
	var title=document.createElement('div');
		title.setAttribute('class','title');
		title.textContent='Vyavsaay.com';
	var seller_info=document.createElement('div');
		seller_info.setAttribute('class','seller_info');
	var seller_phone=document.createElement('div');
		seller_phone.setAttribute('class','seller_phone');
		seller_phone.textContent='Contact No: 9818005232';
	var seller_address=document.createElement('div');
		seller_address.setAttribute('class','seller_address');
		seller_address.textContent="Office: R.S.D. colony, Sirsa";
	var content=document.createElement('div');
		content.setAttribute('class','content');
	var pamphlet_header=document.createElement('div');
		pamphlet_header.setAttribute('class','pamphlet_header');
	var pamphlet_time=document.createElement('div');
		pamphlet_time.setAttribute('class','pamphlet_time');
		pamphlet_time.textContent='hurry up! Offers limited';
	var offers=document.createElement('div');
		offers.setAttribute('class','offers');
	
		container.appendChild(print_pamphlet);
		print_pamphlet.appendChild(header);
		print_pamphlet.appendChild(content);
		header.appendChild(logo);
		header.appendChild(title);
		header.appendChild(seller_info);
		seller_info.appendChild(seller_phone);
		seller_info.appendChild(seller_address);
		content.appendChild(pamphlet_header);
		pamphlet_header.appendChild(pamphlet_time);
		content.appendChild(offers);
	
	var pamphlet_items_data="<pamphlet_items>" +
			"<item_name></item_name>" +
			"<offer></offer>" +
			"<pamphlet_id>"+pamphlet_id+"</pamphlet_id>" +
			"</pamphlet_items>";
	
	fetch_requested_data('form44',pamphlet_items_data,function(results)
	{
		for(var i in results)
		{
			var offer_item=document.createElement('div');
				offer_item.setAttribute('class','offer_item');
			var product_name=document.createElement('div');
				product_name.setAttribute('class','product_name');
				product_name.textContent=results[i].item_name;
			var offer_detail=document.createElement('div');
				offer_detail.setAttribute('class','offer_detail');
				offer_detail.textContent=results[i].offer;
				
				offers.appendChild(offer_item);
				offer_item.appendChild(product_name);
				offer_item.appendChild(offer_detail);
		}	
		
		//console.log(container);
		$.print(container);
		container.removeChild(print_pamphlet);

	});		
	//$(content).hide();
}


/**
 * @form Create Product Bill
 * @formNo 12
 */
function form12_print_form()
{	
	var form=document.getElementById("form12_master");
	var customer=form.elements[1].value;
	var date=form.elements[2].value;
	var amount=form.elements[3].value;
	var discount=form.elements[4].value;
	var tax=form.elements[5].value;
	var total=form.elements[6].value;
	
	var container=document.getElementById('print_container');
	
	var print_bill=document.createElement('div');
		print_bill.setAttribute('class','print_product_bill');
	var header=document.createElement('div');
		header.setAttribute('class','header');
	var title=document.createElement('div');
		title.setAttribute('class','title');
		title.textContent=get_session_var('title');
	var seller_info=document.createElement('div');
		seller_info.setAttribute('class','seller_info');
	var seller_phone=document.createElement('div');
		seller_phone.setAttribute('class','seller_phone');
		seller_phone.textContent='Contact No: '+get_session_var('phone');
	var seller_address=document.createElement('div');
		seller_address.setAttribute('class','seller_address');
		seller_address.textContent="Office: "+get_session_var('address');
	var content=document.createElement('div');
		content.setAttribute('class','content');
	var bill_header=document.createElement('div');
		bill_header.setAttribute('class','bill_header');
	var bill_customer=document.createElement('div');
		bill_customer.textContent='Customer: '+customer;
	var bill_time=document.createElement('div');
		bill_time.textContent='Date: '+date;
	var bill_amount=document.createElement('div');
		bill_amount.textContent='Amount: Rs.'+amount;
	var bill_discount=document.createElement('div');
		bill_discount.textContent='Discount Rs.: '+discount;
	var bill_tax=document.createElement('div');
		bill_tax.textContent='Tax Rs.: '+tax;
	var bill_total=document.createElement('div');
		bill_total.textContent='Total Rs.: '+total;
	
	var bill_items=document.createElement('div');
		bill_items.setAttribute('class','bill_items');
	
	container.appendChild(print_bill);
	print_bill.appendChild(header);
	print_bill.appendChild(content);
	header.appendChild(title);
	header.appendChild(seller_info);
	seller_info.appendChild(seller_phone);
	seller_info.appendChild(seller_address);
	content.appendChild(bill_header);
	bill_header.appendChild(bill_customer);
	bill_header.appendChild(bill_time);
	bill_header.appendChild(bill_amount);
	bill_header.appendChild(bill_discount);
	bill_header.appendChild(bill_tax);
	bill_header.appendChild(bill_total);
	content.appendChild(bill_items);

	var table_element=document.getElementById('form12_body').parentNode;
	var table_copy=table_element.cloneNode(true);
	table_copy.removeAttribute('class');
	bill_items.appendChild(table_copy);
			
	$.print(container);
	container.removeChild(print_bill);
}

