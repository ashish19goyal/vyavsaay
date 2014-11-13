/**
 * @form Create pamphlets
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
