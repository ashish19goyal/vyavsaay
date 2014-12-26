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
	   table_copy.setAttribute('style',"font-size:"+font_size+"em");
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
		//logo.innerHTML="<img src='./images/feedback.jpeg'>";
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
		//header.appendChild(logo);
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
 * @form Create service bills
 * @formNo 10
 */
function form10_print_form()
{
	var container=document.createElement('div');
	var business_title=document.createElement('div');
	var title=document.createElement('div');
	var bt=get_session_var('title');
	title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.2em'><b>Sale Bill</b></div></br>";

	business_title.innerHTML="<div style='display:block;font-size:1.5em;float:left;'><b>"+bt+"</b></div>"+
		"<div style='display:block;float:right;'><div>Contact No: "+get_session_var('phone') +
		"<br>Address: "+get_session_var('address')+"</div></div></br>";
	business_title.setAttribute('style',"height:8%;padding:1%;border:2px solid black;font-size:"+font_size+"em");

	var header_element=document.getElementById("form10_master");
	var header_copy=header_element.cloneNode(true);
	
	var table_element=document.getElementById("form10_body").parentNode;
	var table_copy=table_element.cloneNode(true);
	
	table_copy.removeAttribute('class');
	$(table_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child").remove();
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	$(header_copy).find("a,input[type=hidden],input[type=button],input[type=submit],img").remove();
	$(header_copy).find("input[type=text],input[type=number],textarea").each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	var font_size=get_session_var('print_size');
	$(table_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	header_copy.setAttribute('style',"font-size:"+font_size+"em");
	
	container.appendChild(title);
	container.appendChild(business_title);
	container.appendChild(table_copy);
	container.appendChild(header_copy);
	
	$.print(container);
}


/**
 * @form Create Product bills
 * @formNo 12
 */
function form12_print_form()
{
	var container=document.createElement('div');
	var business_title=document.createElement('div');
	var title=document.createElement('div');
	var bt=get_session_var('title');
	title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.2em'><b>Sale Bill</b></div></br>";

	business_title.innerHTML="<div style='display:block;font-size:1.5em;float:left;'><b>"+bt+"</b></div>"+
		"<div style='display:block;float:right;'><div>Contact No: "+get_session_var('phone') +
		"<br>Address: "+get_session_var('address')+"</div></div></br>";
	business_title.setAttribute('style',"height:8%;padding:1%;border:2px solid black;font-size:"+font_size+"em");

	var header_element=document.getElementById("form12_master");
	var header_copy=header_element.cloneNode(true);
	
	var table_element=document.getElementById("form12_body").parentNode;
	var table_copy=table_element.cloneNode(true);
	
	table_copy.removeAttribute('class');
	$(table_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child").remove();
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	$(header_copy).find("a,input[type=hidden],input[type=button],input[type=submit],img").remove();
	$(header_copy).find("input[type=text],input[type=number],textarea").each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	var font_size=get_session_var('print_size');
	$(table_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	header_copy.setAttribute('style',"font-size:"+font_size+"em");
	
	container.appendChild(title);
	container.appendChild(business_title);
	container.appendChild(table_copy);
	container.appendChild(header_copy);
	
	$.print(container);
}


/**
 * @form Enter customer returns
 * @formNo 15
 */
function form15_print_form()
{
	var container=document.createElement('div');
	var business_title=document.createElement('div');
	var title=document.createElement('div');
	var bt=get_session_var('title');
	title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.2em'><b>Sale returns</b></div></br>";

	business_title.innerHTML="<div style='display:block;font-size:1.5em;float:left;'><b>"+bt+"</b></div>"+
		"<div style='display:block;float:right;'><div>Contact No: "+get_session_var('phone') +
		"<br>Address: "+get_session_var('address')+"</div></div></br>";
	business_title.setAttribute('style',"height:8%;padding:1%;border:2px solid black;font-size:"+font_size+"em");

	var header_element=document.getElementById("form15_master");
	var header_copy=header_element.cloneNode(true);
	
	var table_element=document.getElementById("form15_body").parentNode;
	var table_copy=table_element.cloneNode(true);
	
	table_copy.removeAttribute('class');
	$(table_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child").remove();
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	$(header_copy).find("a,input[type=hidden],input[type=button],input[type=submit],img").remove();
	$(header_copy).find("input[type=text],input[type=number],textarea").each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	var font_size=get_session_var('print_size');
	$(table_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	header_copy.setAttribute('style',"font-size:"+font_size+"em");
	
	container.appendChild(title);
	container.appendChild(business_title);
	container.appendChild(table_copy);
	container.appendChild(header_copy);
	
	$.print(container);
}


/**
 * @form Enter supplier returns
 * @formNo 19
 */
function form19_print_form()
{
	var container=document.createElement('div');
	var business_title=document.createElement('div');
	var title=document.createElement('div');
	var bt=get_session_var('title');
	title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.2em'><b>Purchase returns</b></div></br>";
	
	business_title.innerHTML="<div style='display:block;font-size:1.5em;float:left;'><b>"+bt+"</b></div>"+
		"<div style='display:block;float:right;'><div>Contact No: "+get_session_var('phone') +
		"<br>Address: "+get_session_var('address')+"</div></div></br>";
	business_title.setAttribute('style',"height:8%;padding:1%;border:2px solid black;font-size:"+font_size+"em");

	var header_element=document.getElementById("form19_master");
	var header_copy=header_element.cloneNode(true);
	
	var table_element=document.getElementById("form19_body").parentNode;
	var table_copy=table_element.cloneNode(true);
	
	table_copy.removeAttribute('class');
	$(table_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child").remove();
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	$(header_copy).find("a,input[type=hidden],input[type=button],input[type=submit],img").remove();
	$(header_copy).find("input[type=text],input[type=number],textarea").each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	var font_size=get_session_var('print_size');
	$(table_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	header_copy.setAttribute('style',"font-size:"+font_size+"em");
	
	container.appendChild(title);
	container.appendChild(business_title);
	container.appendChild(table_copy);
	container.appendChild(header_copy);
	
	$.print(container);
}


/**
 * @form Enter supplier bill
 * @formNo 21
 */
function form21_print_form()
{
	var container=document.createElement('div');
	var business_title=document.createElement('div');
	var title=document.createElement('div');
	var bt=get_session_var('title');
	title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.2em'><b>Purchase Bill</b></div></br>";

	business_title.innerHTML="<div style='display:block;font-size:1.5em;float:left;'><b>"+bt+"</b></div>"+
		"<div style='display:block;float:right;'><div>Contact No: "+get_session_var('phone') +
		"<br>Address: "+get_session_var('address')+"</div></div></br>";
	business_title.setAttribute('style',"height:8%;padding:1%;border:2px solid black;font-size:"+font_size+"em");

	var header_element=document.getElementById("form21_master");
	var header_copy=header_element.cloneNode(true);
	
	var table_element=document.getElementById("form21_body").parentNode;
	var table_copy=table_element.cloneNode(true);
	
	table_copy.removeAttribute('class');
	$(table_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child").remove();
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	$(header_copy).find("a").remove();
	$(header_copy).find("input[type=hidden],input[type=button],input[type=submit],img").remove();
	$(header_copy).find("input[type=text],input[type=number],textarea").each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	var font_size=get_session_var('print_size');
	$(table_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	header_copy.setAttribute('style',"font-size:"+font_size+"em");
	
	container.appendChild(title);
	container.appendChild(business_title);
	container.appendChild(table_copy);
	container.appendChild(header_copy);
	
	$.print(container);
}


/**
 * @form Create Purchase order
 * @formNo 24
 */
function form24_print_form()
{
	var container=document.createElement('div');
	var business_title=document.createElement('div');
	var title=document.createElement('div');
	var bt=get_session_var('title');
	title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.2em'><b>Purchase Order</b></div></br>";
	
	business_title.innerHTML="<div style='display:block;font-size:1.5em;float:left;'><b>"+bt+"</b></div>"+
		"<div style='display:block;float:right;'><div>Contact No: "+get_session_var('phone') +
		"<br>Address: "+get_session_var('address')+"</div></div></br>";
	business_title.setAttribute('style',"height:8%;padding:1%;border:2px solid black;font-size:"+font_size+"em");

	var header_element=document.getElementById("form24_master");
	var header_copy=header_element.cloneNode(true);
	
	var table_element=document.getElementById("form24_body").parentNode;
	var table_copy=table_element.cloneNode(true);
	
	table_copy.removeAttribute('class');
	$(table_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child").remove();
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	$(header_copy).find("a").remove();
	$(header_copy).find("input[type=hidden],input[type=button],input[type=submit],img").remove();
	$(header_copy).find("input[type=text],input[type=number],textarea").each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	var font_size=get_session_var('print_size');
	$(table_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	header_copy.setAttribute('style',"font-size:"+font_size+"em");
	
	container.appendChild(title);
	container.appendChild(business_title);
	container.appendChild(header_copy);
	container.appendChild(table_copy);
	
	$.print(container);
}


/**
 * @form Create Sale order
 * @formNo 69
 */
function form69_print_form()
{
	var container=document.createElement('div');
	var business_title=document.createElement('div');
	var title=document.createElement('div');
	var bt=get_session_var('title');
	title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.2em'><b>Sale Order</b></div></br>";
	
	business_title.innerHTML="<div style='display:block;font-size:1.5em;float:left;'><b>"+bt+"</b></div>"+
		"<div style='display:block;float:right;'><div>Contact No: "+get_session_var('phone') +
		"<br>Address: "+get_session_var('address')+"</div></div></br>";
	business_title.setAttribute('style',"height:8%;padding:1%;border:2px solid black;font-size:"+font_size+"em");

	var header_element=document.getElementById("form69_master");
	var header_copy=header_element.cloneNode(true);
	
	var table_element=document.getElementById("form69_body").parentNode;
	var table_copy=table_element.cloneNode(true);
	
	table_copy.removeAttribute('class');
	$(table_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child").remove();
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	$(header_copy).find("a").remove();
	$(header_copy).find("input[type=hidden],input[type=button],input[type=submit],img").remove();
	$(header_copy).find("input[type=text],input[type=number],textarea").each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	var font_size=get_session_var('print_size');
	$(table_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	header_copy.setAttribute('style',"font-size:"+font_size+"em");
	
	container.appendChild(title);
	container.appendChild(business_title);
	container.appendChild(header_copy);
	container.appendChild(table_copy);
	
	$.print(container);
}


/**
 * @form Create bills
 * @formNo 72
 */
function form72_print_form()
{
	var container=document.createElement('div');
	var business_title=document.createElement('div');
	var title=document.createElement('div');
	var bt=get_session_var('title');
	title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.2em'><b>Sale Bill</b></div></br>";
	
	business_title.innerHTML="<div style='display:block;font-size:1.5em;float:left;'><b>"+bt+"</b></div>"+
		"<div style='display:block;float:right;'><div>Contact No: "+get_session_var('phone') +
		"<br>Address: "+get_session_var('address')+"</div></div></br>";
	business_title.setAttribute('style',"height:8%;padding:1%;border:2px solid black;font-size:"+font_size+"em");

	var header_element=document.getElementById("form72_master");
	var header_copy=header_element.cloneNode(true);
	
	var table_element=document.getElementById("form72_body").parentNode;
	var table_copy=table_element.cloneNode(true);
	
	table_copy.removeAttribute('class');
	$(table_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child").remove();
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	$(header_copy).find("a").remove();
	$(header_copy).find("input[type=hidden],input[type=button],input[type=submit],img").remove();
	$(header_copy).find("input[type=text],input[type=number],textarea").each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	var font_size=get_session_var('print_size');
	$(table_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	header_copy.setAttribute('style',"font-size:"+font_size+"em");
	
	container.appendChild(title);
	container.appendChild(business_title);
	container.appendChild(table_copy);
	container.appendChild(header_copy);
	
	$.print(container);
}


/**
 * @form Scan items(multi-register)
 * @formNo 82
 */
function form82_print_form()
{
	var container=document.createElement('div');
	var business_title=document.createElement('div');
	var title=document.createElement('div');
	var bt=get_session_var('title');
	title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.2em'><b>Sale Bill</b></div></br>";
	
	business_title.innerHTML="<div style='display:block;font-size:1.5em;float:left;'><b>"+bt+"</b></div>"+
		"<div style='display:block;float:right;'><div>Contact No: "+get_session_var('phone') +
		"<br>Address: "+get_session_var('address')+"</div></div></br>";
	business_title.setAttribute('style',"height:8%;padding:1%;border:2px solid black;font-size:"+font_size+"em");

	var header_element=document.getElementById("form82_master");
	var header_copy=header_element.cloneNode(true);
	
	var table_element=document.getElementById("form82_body").parentNode;
	var table_copy=table_element.cloneNode(true);
	
	table_copy.removeAttribute('class');
	$(table_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child").remove();
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	$(header_copy).find("a").remove();
	$(header_copy).find("input[type=hidden],input[type=button],input[type=submit],img").remove();
	$(header_copy).find("input[type=text],input[type=number],textarea").each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	var font_size=get_session_var('print_size');
	$(table_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	header_copy.setAttribute('style',"font-size:"+font_size+"em");
	
	container.appendChild(title);
	container.appendChild(business_title);
	container.appendChild(table_copy);
	container.appendChild(header_copy);
	
	$.print(container);
}

/**
 * @form Create bills(multi-register)
 * @formNo 91
 */
function form91_print_form()
{
	var container=document.createElement('div');
	var business_title=document.createElement('div');
	var title=document.createElement('div');
	var bt=get_session_var('title');
	
	title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.2em'><b>Sale Bill</b></div></br>";
	
	business_title.innerHTML="<div style='display:block;font-size:1.5em;float:left;'><b>"+bt+"</b></div>"+
							"<div style='display:block;float:right;'><div>Contact No: "+get_session_var('phone') +
							"<br>Address: "+get_session_var('address')+"</div></div></br>";
	business_title.setAttribute('style',"height:8%;padding:1%;border:2px solid black;font-size:"+font_size+"em");
	
	var header_element=document.getElementById("form91_master");
	var header_copy=header_element.cloneNode(true);
	
	var table_element=document.getElementById("form91_body").parentNode;
	var table_copy=table_element.cloneNode(true);
	
	table_copy.removeAttribute('class');
	$(table_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child").remove();
	$(table_copy).find('input,textarea').each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	$(header_copy).find("a").remove();
	$(header_copy).find("input[type=hidden],input[type=button],input[type=submit],img").remove();
	$(header_copy).find("input[type=text],input[type=number],textarea").each(function(index)
	{
		$(this).replaceWith($(this).val());
	});
			
	var font_size=get_session_var('print_size');
	$(table_copy).find('td,th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
	header_copy.setAttribute('style',"padding:1%;font-size:"+font_size+"em");
	
	container.appendChild(title);
	container.appendChild(business_title);
	container.appendChild(table_copy);
	container.appendChild(header_copy);
	
	$.print(container);
}