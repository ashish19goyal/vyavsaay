function form24_get_totals()
{
	var amount=0;
	var tax=0;
	var total=0;
	var total_quantity=0;
	
	$("[id^='save_form24']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		
		if(!isNaN(parseFloat(subform.elements[7].value)))
		{
			amount+=parseFloat(subform.elements[7].value);
			tax+=parseFloat(subform.elements[9].value);
			total+=parseFloat(subform.elements[10].value);
		}
		if(!isNaN(parseFloat(subform.elements[2].value)))			
			total_quantity+=parseFloat(subform.elements[2].value);		
	});
	
	var form=document.getElementById("form24_master");
	
/*	if(form.elements['cst'].checked)
	{
		tax+=.02*amount;
		total+=.02*amount;
	}
*/	
	amount=my_round(amount,2);
	tax=my_round(tax,2);
	total=my_round(total,2);
		
	var total_row="<tr><td colspan='2' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
							"<td>Amount:<br>Tax: <br>Total: </td>" +
							"<td>Rs. "+amount+"<br>" +
							"Rs. "+tax+"<br> " +
							"Rs. "+total+"</td>" +
							"<td></td>" +
							"</tr>";
					
	$('#form24_foot').html(total_row);
}

function form69_get_totals()
{
	var total_quantity=0;
	var amount=0;
	var freight=0;
	var tax=0;
	var total=0;
	
	$("[id^='save_form69']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		if(!isNaN(parseFloat(subform.elements[8].value)))
			amount+=parseFloat(subform.elements[8].value);
		if(!isNaN(parseFloat(subform.elements[9].value)))			
			tax+=parseFloat(subform.elements[9].value);
		if(!isNaN(parseFloat(subform.elements[6].value)))			
			freight+=parseFloat(subform.elements[6].value);
		if(!isNaN(parseFloat(subform.elements[10].value)))			
			total+=parseFloat(subform.elements[10].value);						
		if(!isNaN(parseFloat(subform.elements[4].value)))
			total_quantity+=parseFloat(subform.elements[4].value);	
	});
	
	amount=my_round(amount,2);
	freight=my_round(freight,2);
	tax=my_round(tax,2);
	total=my_round(total,2);

	var total_row="<tr><td colspan='1' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
						"<td>Amount:</br>Tax: <br>Freight: </br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+tax+"</br>" +
						"Rs. "+freight+"</br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
	$('#form69_foot').html(total_row);
}

function form72_get_totals()
{
	var amount=0;
	var discount=0;
	var service_tax=0;
	var vat=0;
	var total=0;
	
	$("[id^='save_form72']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		
		if(!isNaN(parseFloat(subform.elements[5].value)))
		{
			amount+=parseFloat(subform.elements[5].value);
		}
		if(!isNaN(parseFloat(subform.elements[6].value)))
		{
			discount+=parseFloat(subform.elements[6].value);
		}
		if(!isNaN(parseFloat(subform.elements[8].value)))
		{
			total+=parseFloat(subform.elements[8].value);
		}					
		if(!isNaN(parseFloat(subform.elements[7].value)))
		{
			if(subform.elements[2].value=="NA")
			{
				service_tax+=parseFloat(subform.elements[7].value);
			}
			else 
			{
				vat+=parseFloat(subform.elements[7].value);
			}
		}					

	});
	
	service_tax=my_round(service_tax,2);
	vat=my_round(vat,2);
	amount=my_round(amount,2);
	discount=my_round(discount,2);
	total=my_round(total,0);
	
	var tax_string="VAT: <br>S.Tax:";
	var tax_amount_string="Rs. "+vat+"<br>Rs. "+service_tax+"<br>";

	if(vat==0)
	{
		tax_string="S.Tax:";
		tax_amount_string="Rs. "+service_tax+"<br>";
	}
	
	if(service_tax==0)
	{
		tax_string="VAT:";
		tax_amount_string="Rs. "+vat+"<br>";
	}
	
	if(service_tax==0 && vat==0)
	{
		tax_string="Tax:";
		tax_amount_string="Rs. 0<br>";
	}
	
	var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:<br>Discount: <br>"+tax_string+"<br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+discount+"</br>" +
				tax_amount_string +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
	$('#form72_foot').html(total_row);
}


function form91_get_totals()
{
	var amount=0;
	var tax_name="VAT";
	var tax_array=[];
	var freight=0;
	var total=0;
	var total_quantity=0;
	
	$("[id^='save_form91']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		
		if(!isNaN(parseFloat(subform.elements[3].value)))
		{
			total_quantity+=parseFloat(subform.elements[3].value);
		}
		if(!isNaN(parseFloat(subform.elements[7].value)))
		{
			amount+=parseFloat(subform.elements[7].value);
		}
		if(!isNaN(parseFloat(subform.elements[8].value)))
		{
			if(typeof tax_array[subform.elements[11].value]=='undefined')
			{
				tax_array[subform.elements[11].value]=0;
			}
			tax_array[subform.elements[11].value]+=parseFloat(subform.elements[8].value);
		}
		if(!isNaN(parseFloat(subform.elements[6].value)))
		{
			freight+=parseFloat(subform.elements[6].value);
		}
		if(!isNaN(parseFloat(subform.elements[9].value)))
		{
			total+=parseFloat(subform.elements[9].value);
		}					
	});
	
	var form=document.getElementById("form91_master");

	if(form.elements['bill_type'].value=='Retail-CST' || form.elements['bill_type'].value=='Retail-CST-C')
	{
		tax_name="CST";
	}

	var tax_string="";
	var tax="";
	for(var x in tax_array)
	{
		tax_array[x]=my_round(tax_array[x],2);
		tax_string+=tax_name+" @"+x+"%: <br>";		
		tax+="Rs. "+tax_array[x]+": <br>";
	}

	amount=my_round(amount,2);
	freight=my_round(freight,2);
	total=my_round(total,2);

	var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
							"<td>Amount:</br>"+tax_string+"Freight: </br>Total: </td>" +
							"<td>Rs. "+amount+"</br>" +tax+
							"Rs. "+freight+"</br>" +
							"Rs. <vyavsaay_p id='form91_final_total'>"+total+"</vyavsaay_p></td>" +
							"<td></td>" +
							"</tr>";
	$('#form91_foot').html(total_row);
}

function form122_get_totals()
{
	var total=0;
	var tax=0;
	var amount=0;
	var total_accepted=0;
	var total_quantity=0;
	
	$("[id^='save_form122']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		if(subform.elements[12].value=='accepted')
		{
			if(!isNaN(parseFloat(subform.elements[7].value)))
				amount+=parseFloat(subform.elements[7].value);
			if(!isNaN(parseFloat(subform.elements[8].value)))
				tax+=parseFloat(subform.elements[8].value);
			if(!isNaN(parseFloat(subform.elements[4].value)))
				total_accepted+=parseFloat(subform.elements[4].value);			
		}
		if(!isNaN(parseFloat(subform.elements[4].value)))
			total_quantity+=parseFloat(subform.elements[4].value);
	});

	amount=my_round(amount,2);
	tax=my_round(tax,2);
	total=amount+tax;
		
	var total_row="<tr><td colspan='3' data-th='Total'>Total Accepted Quantity: "+total_accepted+"<br>Total Rejected Quantity: "+(total_quantity-total_accepted)+"</td>" +
				"<td>Amount:</br>Tax: </br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+tax+"</br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
						
	$('#form122_foot').html(total_row);
}

function form136_get_totals()
{
	var total=0;
	var tax=0;
	var amount=0;
	var total_quantity=0;
	
	$("[id^='save_form136']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
				
		var qc_id=subform.elements[10].value;
		var qc=document.getElementById('form136_check_image_'+qc_id).getAttribute('data-accepted');
		
		if(qc=='accepted')
		{
			if(!isNaN(parseFloat(subform.elements[4].value)))
				amount+=parseFloat(subform.elements[4].value);
			if(!isNaN(parseFloat(subform.elements[5].value)))
				tax+=parseFloat(subform.elements[5].value);
			if(!isNaN(parseFloat(subform.elements[2].value)))
				total_quantity+=parseFloat(subform.elements[2].value);
		}
	});

	amount=my_round(amount,2);
	tax=my_round(tax,2);
	total=amount+tax;
		
	var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
				"<td>Amount:</br>Tax: </br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+tax+"</br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
						
	$('#form136_foot').html(total_row);
}

/**
 * @form Project Expenses
 * @formNo 137
 * @param button
 */
function form137_get_totals()
{
	var master_form=document.getElementById('form137_master');

	var total_expense=0;
	var total_approved=0;
	
	$("[id^='form137_rows_']").each(function(index)
	{
		if(!isNaN(parseFloat(this.elements[1].value)))
		{
			if(this.elements[4].value=='submitted')
			{
				total_expense+=parseFloat(this.elements[1].value);
			}
			else if(this.elements[4].value=='approved')
			{
				total_expense+=parseFloat(this.elements[1].value);
				total_approved+=parseFloat(this.elements[1].value);
			}
		}		
	});
	
	master_form.elements['expense'].value=total_expense;
	master_form.elements['approved'].value=total_approved;	
}

function form153_get_totals()
{
	var amount=0;
	var discount=0;
	var tax=0;
	var tax_rate=0;
	
	if(document.getElementById('form153_discount'))
	{
		discount=parseFloat(document.getElementById('form153_discount').value);
		tax_rate=parseFloat(document.getElementById('form153_tax').value);
	}

	$("[id^='save_form153']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		//tax+=parseFloat(subform.elements[5].value);
		
		if(isNaN(parseFloat(subform.elements[5].value)))
			amount+=0;
		else
			amount+=Math.round(parseFloat(subform.elements[5].value));	
		//total+=Math.round(parseFloat(subform.elements[7].value));
		//discount+=parseFloat(subform.elements[8].value);
	});

	var tax=Math.round((tax_rate*((amount-discount)/100))).toFixed(2);
	var total=Math.round(amount+tax-discount).toFixed(2);

	var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
					"<td>Amount:</br>Discount: </br>Tax:@ <input type='number' value='"+tax_rate+"' title='specify tax rate' step='any' id='form153_tax' class='dblclick_editable'>% </br>Total: </td>" +
					"<td>Rs. "+amount.toFixed(2)+"</br>" +
					"Rs. <input type='number' value='"+discount.toFixed(2)+"' step='any' id='form153_discount' class='dblclick_editable'></br>" +
					"Rs. "+tax+"<br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";

	$('#form153_foot').html(total_row);
	longPressEditable($('.dblclick_editable'));
}

function form154_update_serial_numbers()
{
	$('#form154_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});
}

function form154_get_totals()
{
	var form=document.getElementById("form154_master");
		
	var bill_type=form.elements['bill_type'].value;
	var tax_type=form.elements['tax_type'].value;
	
	var tax_text="VAT";
	if(tax_type=='CST' || tax_type=='Retail Central')
	{
		tax_text="CST";
	}
		
	var hiring=false;
	if(bill_type=='Hiring')
		hiring=true;
		
	var amount=0;
	var discount=0;
	var cartage=0;
	var tax_rate=0;
	
	if(document.getElementById('form154_discount'))
	{
		discount=parseFloat(document.getElementById('form154_discount').value);
		tax_rate=parseFloat(document.getElementById('form154_tax').value);
		cartage=parseFloat(document.getElementById('form154_cartage').value);
	}
	
	$("[id^='save_form154']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		if(hiring)
		{
			if(isNaN(parseFloat(subform.elements[7].value)))
				amount+=0;
			else
				amount+=Math.round(parseFloat(subform.elements[7].value));
		}
		else if(bill_type=='Installation' || bill_type=='Repair')
		{			
			if(isNaN(parseFloat(subform.elements[3].value)))
				amount+=0;
			else
				amount+=Math.round(parseFloat(subform.elements[3].value));
		}
		else
		{			
			if(isNaN(parseFloat(subform.elements[3].value)))
				amount+=0;
			else
				amount+=Math.round(parseFloat(subform.elements[3].value));
		}
	});

	var tax=Math.round((tax_rate*((amount-discount)/100)));		
	var total=Math.round(amount+tax-discount+cartage).toFixed(2);
	
	form.elements['bill_total'].value=total;
	
	var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:<disc><br>Discount: </disc><br>"+tax_text+":@ <input type='number' value='"+tax_rate+"' step='any' id='form154_tax' class='dblclick_editable'>% <br>Cartage: <br>Total: </td>" +
				"<td>Rs. "+amount.toFixed(2)+"</br>" +
				"<disc_amount>Rs. <input type='number' value='"+discount.toFixed(2)+"' step='any' id='form154_discount' class='dblclick_editable'></br></disc_amount>" +
				"Rs. "+tax.toFixed(2)+" <br>" +
				"Rs. <input type='number' value='0.00' step='any' id='form154_cartage' class='dblclick_editable'></br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
	if(hiring)
	{
		total_row="<tr><td colspan='4' data-th='Total'>Total</td>" +
				"<td>Amount:<disc><br>Discount: </disc><br>Service Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form154_tax' class='dblclick_editable'>% <br>Cartage: <br>Total: </td>" +
				"<td>Rs. "+amount.toFixed(2)+"</br>" +
				"<disc_amount>Rs. <input type='number' value='"+discount.toFixed(2)+"' step='any' id='form154_discount' class='dblclick_editable'><br><disc_amount>" +
				"Rs. "+tax.toFixed(2)+" <br>" +
				"Rs. <input type='number' value='0.00' step='any' id='form154_cartage' class='dblclick_editable'></br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";

	}
	else if(bill_type=='Service')
	{
		total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:<disc><br>Discount: </disc><br>Service Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form154_tax' class='dblclick_editable'>% <br>Cartage: <br>Total: </td>" +
				"<td>Rs. "+amount.toFixed(2)+"</br>" +
				"<disc_amount>Rs. <input type='number' value='"+discount.toFixed(2)+"' step='any' id='form154_discount' class='dblclick_editable'></br></disc_amount>" +
				"Rs. "+tax.toFixed(2)+" <br>" +
				"Rs. <input type='number' value='0.00' step='any' id='form154_cartage' class='dblclick_editable'></br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
	}

	$('#form154_foot').html(total_row);
	longPressEditable($('.dblclick_editable'));
}

function form158_get_totals()
{
	var amount=0;
	
	$("[id^='save_form158']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		
		if(isNaN(parseFloat(subform.elements[3].value)))
			amount+=0;
		else	
			amount+=parseFloat(subform.elements[3].value);
		
	});
	var discount=0;
	var tax_rate=0;
	var cartage=0;
	
	if(document.getElementById('form158_discount'))
	{
		discount=parseFloat(document.getElementById('form158_discount').value);
		tax_rate=parseFloat(document.getElementById('form158_tax').value);
		cartage=parseFloat(document.getElementById('form158_cartage').value);
	}
	
	var tax=Math.round((tax_rate*((amount-discount)/100)));		
	var total=Math.round(amount+tax-discount+cartage);
	
	var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
							"<td>Amount:<br>Discount: <br>Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form158_tax' class='dblclick_editable'>%<br>Cartage: <br>Total: </td>" +
							"<td>Rs. "+Math.round(amount)+"</br>" +
							"<disc_amount>Rs. <input type='number' value='"+Math.round(discount)+"' step='any' id='form158_discount' class='dblclick_editable'><br></disc_amount>" +
							"Rs. "+tax+" <br>" +
							"Rs. <input type='number' value='"+Math.round(cartage)+"' step='any' id='form158_cartage' class='dblclick_editable'><br>" +
							"Rs. "+Math.round(total)+"</td>" +
							"<td></td>" +
							"</tr>";
					
	$('#form158_foot').html(total_row);
	longPressEditable($('.dblclick_editable'));
}


/**
 * @form Put Away
 * @formNo 165
 * @param button
 */
function form165_get_totals()
{
	var master_form=document.getElementById('form165_master');

	var total_tbp=0;
	var total_placed=0;
	
	$("[id^='row_form165_']").each(function(index)
	{
		if(!isNaN(parseFloat(this.elements[2].value)))
		{
			total_tbp+=parseFloat(this.elements[2].value);
		}		
		if(!isNaN(parseFloat(this.elements[3].value)))
		{
			total_placed+=parseFloat(this.elements[3].value);
		}		

	});
	
	master_form.elements['pending_count'].value=total_tbp-total_placed;
}


function form178_get_totals()
{
	var amount=0;
	var tax=0;
	var total=0;
	
	$("[id^='save_form178']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		
		if(!isNaN(parseFloat(subform.elements[5].value)))
		{
			amount+=parseFloat(subform.elements[5].value);
			tax+=parseFloat(subform.elements[6].value);
			total+=parseFloat(subform.elements[7].value);
		}
	});
	
	var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
							"<td>Amount:<br>Tax: <br>Total: </td>" +
							"<td>Rs. "+amount+"<br>" +
							"Rs. "+tax+"<br> " +
							"Rs. "+total+"</td>" +
							"<td></td>" +
							"</tr>";
					
	$('#form178_foot').html(total_row);
}

function form180_get_totals()
{
	var amount=0;
	var tax=0;
	var total=0;
	var total_quantity=0;
	
	
	$("[id^='save_form180']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		
		if(!isNaN(parseFloat(subform.elements[5].value)))
		{
			amount+=parseFloat(subform.elements[5].value);
			tax+=parseFloat(subform.elements[6].value);
			total+=parseFloat(subform.elements[7].value);
		}
		if(!isNaN(parseFloat(subform.elements[2].value)))			
			total_quantity+=parseFloat(subform.elements[2].value);		
	});
	
	var form=document.getElementById("form180_master");
	
	amount=my_round(amount,2);
	tax=my_round(tax,2);
	total=my_round(total,2);
		
	var total_row="<tr><td colspan='1' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
							"<td>Amount:<br>Tax: <br>Total: </td>" +
							"<td>Rs. "+amount+"<br>" +
							"Rs. "+tax+"<br> " +
							"Rs. "+total+"</td>" +
							"<td></td>" +
							"</tr>";
					
	$('#form180_foot').html(total_row);
}

function form184_update_serial_numbers()
{
	$('#form184_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)>input').attr('value',index+1);
	});
}


function form193_get_totals()
{
	//console.log('getting totals');
	var total_quantity=0;
	
	$("[id^='save_form193']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		
		if(subform.elements[1].value!="")
		{
			total_quantity+=1;
		}		
	});

	var fields=document.getElementById('form193_master');
	fields.elements['q_scanned'].value=total_quantity;
}


function form200_update_serial_numbers()
{
	$('#form200_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});
	
	var num_orders=0;
	$("[id^='save_form200']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);

		if(subform.elements[0].value!="")
		{
			num_orders+=1;			
		}
	});
	
	var form=document.getElementById("form200_master");
	form.elements['num_orders'].value=num_orders;
}


function form211_get_totals()
{
	var out_for_delivery=0;
	var delivered=0;
	var pending=0;
	var undelivered=0;	
	
	$("[id^='save_form211']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		var updated_status=subform.elements[2].value;
		var current_status=subform.elements[1].value;
		
		if(updated_status!="")
		{
			if(updated_status=='delivered')
				delivered+=1;
			else if(updated_status=='undelivered')	
				undelivered+=1;
			else if(updated_status=='out for delivery')	
				out_for_delivery+=1;
			else if(updated_status=='pending')	
				pending+=1;	
		}
		else 
		{
			if(current_status=='delivered')
				delivered+=1;
			else if(current_status=='undelivered')	
				undelivered+=1;
			else if(current_status=='out for delivery')	
				out_for_delivery+=1;
			else if(current_status=='pending')	
				pending+=1;	
		}
	});
	
	var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
							"<td>Out for Delivery:<br>Delivered:<br>Undelivered:<br>Pending:</td>" +
							"<td>"+out_for_delivery+"<br>"+delivered+"<br>" +undelivered+"<br> " +pending+"</td>" +
							"<td></td>" +
							"</tr>";
	$('#form211_foot').html(total_row);
}

function form222_get_totals()
{
	var amount=0;
	var tax=0;
	var total=0;
	
	$("[id^='save_form222']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		
		if(!isNaN(parseFloat(subform.elements[5].value)))
		{
			amount+=parseFloat(subform.elements[5].value);
			tax+=parseFloat(subform.elements[6].value);
			total+=parseFloat(subform.elements[7].value);
		}		
	});
	
	var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
							"<td>Amount:<br>Tax: <br>Total: </td>" +
							"<td>Rs. "+amount+"<br>" +
							"Rs. "+tax+"<br> " +
							"Rs. "+total+"</td>" +
							"<td></td>" +
							"</tr>";
	$('#form222_foot').html(total_row);
}

function form225_get_totals()
{
	var amount=0;
	var tax=0;
	var discount=0;	
	var total=0;
	var total_quantity=0;
	
	$("[id^='save_form225']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		if(!isNaN(parseFloat(subform.elements[5].value)))
			amount+=parseFloat(subform.elements[5].value);
		if(!isNaN(parseFloat(subform.elements[6].value)))
			discount+=parseFloat(subform.elements[6].value);
		if(!isNaN(parseFloat(subform.elements[7].value)))
			tax+=parseFloat(subform.elements[7].value);
		if(!isNaN(parseFloat(subform.elements[8].value)))
			total+=parseFloat(subform.elements[8].value);
		
		if(!isNaN(parseFloat(subform.elements[3].value)))
			total_quantity+=parseFloat(subform.elements[3].value);							
	});

	var form=document.getElementById("form225_master");
	
	amount=my_round(amount,2);
	tax=my_round(tax,2);
	discount=my_round(discount,2);	
	total=my_round(total,2);
		
	var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
				"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+discount+"</br>" +
				"Rs. "+tax+"</br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
					
	$('#form225_foot').html(total_row);
}

function form244_get_totals()
{
	var total_quantity=0;
	
	$("[id^='save_form244']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		
		if(subform.elements[1].value!="")
		{
			total_quantity+=1;
		}		
	});

	var fields=document.getElementById('form244_master');
	fields.elements['q_scanned'].value=total_quantity;
}

function form248_update_serial_numbers()
{
	$('#form248_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});
	
	var num_orders=0;
	var weight=0;
	$("[id^='save_form248']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);

		if(subform.elements[0].value!="")
		{
			num_orders+=1;			
		}
		if(!isNaN(parseFloat(subform.elements[3].value)))
		{
			weight+=parseFloat(subform.elements[3].value);			
		}
	});
	
	var form=document.getElementById("form248_master");
	form.elements['num_orders'].value=num_orders;
	form.elements['weight'].value=my_round(weight,4);
}

function form250_update_serial_numbers()
{
	$('#form250_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});
	
	var num_bags=0;
	var num_orders=0;
	var weight=0;
	$("[id^='save_form250']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);

		if(subform.elements[0].value!="")
		{
			num_bags+=1;			
		}
		if(!isNaN(parseFloat(subform.elements[3].value)))
		{
			num_orders+=parseFloat(subform.elements[3].value);			
		}
		if(!isNaN(parseFloat(subform.elements[2].value)))
		{
			weight+=parseFloat(subform.elements[2].value);			
		}
	});
	
	var form=document.getElementById("form250_master");
	form.elements['num_orders'].value=num_orders;
	form.elements['num_bags'].value=num_bags;
	form.elements['weight'].value=weight;
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

	$("[id^='save_form258_item_']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);

		if(!isNaN(parseFloat(subform.elements[1].value)))
			total_quantity+=parseFloat(subform.elements[1].value);
		if(!isNaN(parseFloat(subform.elements[3].value)))
			amount+=parseFloat(subform.elements[3].value);
		if(!isNaN(parseFloat(subform.elements[4].value)))
			tax+=parseFloat(subform.elements[4].value);
		if(!isNaN(parseFloat(subform.elements[5].value)))
			total+=parseFloat(subform.elements[5].value);
	});

	var cartage=0;
	
	if(document.getElementById('form258_cartage'))
	{
		cartage=parseFloat(document.getElementById('form258_cartage').value);
	}
	
	var amount=my_round(amount,2);		
	var tax=my_round(tax,2);		
	var total=my_round((total+cartage),0);

	var total_row="<tr><td colspan='4' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
						"<td>Amount:<br>Tax:<br>Transport Charges: <br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+tax+" <br>" +
						"Rs. <input type='number' value='"+my_round(cartage,2)+"' step='any' id='form258_cartage' class='dblclick_editable'><br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
					
	$('#form258_item_foot').html(total_row);
	longPressEditable($('.dblclick_editable'));
}

function form262_update_serial_numbers()
{
	$('#form262_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)>input').attr('value',index+1);
	});
}

function form263_update_serial_numbers()
{
	$('#form263_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});
}

function form265_update_serial_numbers()
{
	$('#form265_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});
	
	var num_orders=0;
	$("[id^='save_form265']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);

		if(subform.elements[0].value!="")
		{
			num_orders+=1;			
		}
	});
	
	var form=document.getElementById("form265_master");
	form.elements['num_orders'].value=num_orders;
}

function form267_get_totals()
{
	var out_for_delivery=0;
	var delivered=0;
	var pending=0;
	
	$("[id^='save_form267']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		var updated_status=subform.elements[2].value;
		var current_status=subform.elements[1].value;
		
		if(updated_status!="")
		{
			if(updated_status=='RTO delivered')
				delivered+=1;
			else if(updated_status=='RTO out for delivery')	
				out_for_delivery+=1;
			else if(updated_status=='RTO pending')	
				pending+=1;	
		}
		else 
		{
			if(current_status=='RTO delivered')
				delivered+=1;
			else if(current_status=='RTO out for delivery')	
				out_for_delivery+=1;
			else if(current_status=='RTO pending')	
				pending+=1;	
		}
	});
	
	var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
							"<td>Out for Delivery:<br>Delivered:<br>Pending:</td>" +
							"<td>"+out_for_delivery+"<br>"+delivered+"<br>" +pending+"</td>" +
							"<td></td>" +
							"</tr>";
	$('#form267_foot').html(total_row);
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
	longPressEditable($('.dblclick_editable'));
}


function form270_get_totals()
{
	var amount=0;
	var tax=0;
	var total=0;
	var total_quantity=0;

	$("[id^='save_form270']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		
		if(!isNaN(parseFloat(subform.elements[1].value)))
			total_quantity+=parseFloat(subform.elements[1].value);
		if(!isNaN(parseFloat(subform.elements[3].value)))
			amount+=parseFloat(subform.elements[3].value);
		if(!isNaN(parseFloat(subform.elements[4].value)))
			tax+=parseFloat(subform.elements[4].value);
		if(!isNaN(parseFloat(subform.elements[5].value)))
			total+=parseFloat(subform.elements[5].value);
	});

	var cartage=0;
	
	if(document.getElementById('form270_cartage'))
	{
		cartage=parseFloat(document.getElementById('form270_cartage').value);
	}
	
	var amount=my_round(amount,2);		
	var tax=my_round(tax,2);		
	var total=my_round((total+cartage),0);

	var total_row="<tr><td colspan='2' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
						"<td>Amount:<br>Tax:<br>Cartage: <br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+tax+" <br>" +
						"Rs. <input type='number' value='"+my_round(cartage,2)+"' step='any' id='form270_cartage' class='dblclick_editable'><br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
					
	$('#form270_foot').html(total_row);
	longPressEditable($('.dblclick_editable'));
}

function form284_update_serial_numbers()
{
	$('#form284_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});
}

function form284_get_totals()
{
	var form=document.getElementById("form284_master");
		
	var bill_type=form.elements['bill_type'].value;
	
	var amount=0;
	var cartage=0;
	var tax_rate=0;
	
	if(document.getElementById('form284_cartage'))
	{
		tax_rate=parseFloat(document.getElementById('form284_tax').value);
		cartage=parseFloat(document.getElementById('form284_cartage').value);
	}
	
	$("[id^='save_form284']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		if(!isNaN(parseFloat(subform.elements[4].value)))
				amount+=parseFloat(subform.elements[4].value);
	});

	amount=my_round(amount,2);		
	var tax=my_round((tax_rate*((amount)/100)),2);		
	var total=my_round(amount+tax+cartage,0);
	
	var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:<br>Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form284_tax' class='dblclick_editable'>% <br>Cartage: <br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+tax+" <br>" +
				"Rs. <input type='number' value='"+cartage+"' step='any' id='form284_cartage' class='dblclick_editable'></br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
	$('#form284_foot').html(total_row);
	longPressEditable($('.dblclick_editable'));
}
