function form12_print_form()
{	
	var form=document.getElementById("form12_master");
	
	var customer=form.elements[1].value;
	var bill_date=form.elements[2].value;
	var amount=form.elements[3].value;
	var data_id=form.elements[4].value;
	
	var content=document.querySelector('#print_sale_bill');
	var logo=content.querySelector(".logo");
	var title=content.querySelector(".title");
	var seller_name=content.querySelector(".seller_name");
	var seller_phone=content.querySelector(".seller_phone");
	var seller_address=content.querySelector(".seller_address");
	var invoice_date=content.querySelector(".invoice_date");
	var invoice_num=content.querySelector(".invoice_num");
	var customer_name=content.querySelector(".customer_name");
	var customer_phone=content.querySelector(".customer_phone");
	var customer_address=content.querySelector(".customer_address");
	var invoice_total=content.querySelector(".invoice_total");
	var invoice_discount=content.querySelector(".invoice_discount");
	var invoice_taxes=content.querySelector(".invoice_taxes");
	var invoice_net=content.querySelector(".invoice_net");
	var invoice_details=content.querySelector(".invoice_details");

	//logo.appendChild(document.createElement('img')).src=logo_src;
	customer_name.textContent=customer;
	invoice_date.textContent=bill_date;
	invoice_total.textContent=amount;
	invoice_num.textContent=data_id;
	
	//printing the content using jquery.print library
	$(content).show();
	$.print(content);
	$(content).hide();
}

function sale_bill_print_setup()
{
	var template_name=sessionStorage.getItem('sale_bill');
	var link = document.createElement('link');
	link.rel = 'import';
	link.href = "./templates/sale_bill/"+template_name+".html";
	link.onload = function(e){
		var content=link.import.querySelector(".print_sale_bill");
		var print_template=document.querySelector('#print_sale_bill');
		console.log(content);
		print_template.appendChild(content);
		$(print_template).hide();
	};
	link.onerror = function(e){
		
	};
	document.head.appendChild(link);
}