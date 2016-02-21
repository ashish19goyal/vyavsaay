<div id='form248' class='function_detail'>
	<form id='form248_master' autocomplete="off">
		<fieldset>
			<label>Bag # <br><input type='text' name='bag_num' required></label>
			<label>Branch<br><input type='text' name='branch' required></label>
			<label>LBH<br><input type='text' name='lbh' required></label>
			<br><label>Date<br><input type='text' name='date'></label>
			<label>Weight<br><input type='text' name='weight' readonly='readonly'></label>
			<label># of Orders<br><input type='number' readonly='readonly' name='num_orders'></label>
			<label>	<input type='button' title='Save Bag' name='save' class='save_icon'></label>
			<label>	<input type='hidden' name='id'>
					<input type='hidden' name='saved'>
				<input type='submit' class='submit_hidden'>
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form248_header'></form>
					<th style='width:50px'>S. No.</th>
					<th>AWB #</th>
					<th>Address</th>
					<th>Details</th>
					<th>Status</th>
					<th><input type='button' form='form248_header' title='Add item' class='add_icon' onclick='form248_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form248_body'>
		</tbody>
		<tfoot id='form248_foot'>
		</tfoot>
	</table>
    
    <script>
        function form248_header_ini()
{
	var fields=document.getElementById('form248_master');

	var bag_filter=fields.elements['bag_num'];
	var lbh=fields.elements['lbh'];
	var date=fields.elements['date'];
	var weight=fields.elements['weight'];
	var branch=fields.elements['branch'];
	
	branch.removeAttribute('readonly');	
	
	fields.elements['saved'].value='no';
	fields.elements['id'].value=get_new_key();

	var branch_data="<store_areas><name></name></store_areas>";
	set_my_value_list(branch_data,branch);	
	
	var save_button=fields.elements['save'];
	bag_filter.value="";
	lbh.value="";
	weight.value="";
	$(date).datepicker();
	date.value=get_my_date();

	var bag_id=$("#form248_link").attr('data_id');
	if(bag_id==null)
		bag_id="";	

	if(bag_id=="")
	{
		var bag_num_data="<user_preferences count='1'>"+
						"<value></value>"+
						"<name exact='yes'>bag_num</name>"+
						"</user_preferences>";
		set_my_value(bag_num_data,bag_filter);	
	}
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form248_update_form();
	});

	$(save_button).hide();
	
	$(document).off('keydown');
	$(document).on('keydown', function(event) {
		if( event.keyCode == 83 && event.ctrlKey) {
	    	event.preventDefault();
	    	$(save_button).trigger('click');
	    }
	});

	$(fields).off('submit');
	$(fields).on("submit", function(event)
	{
		event.preventDefault();
		//modal129_action();
		form248_add_item();
	});

}

function form248_ini()
{
	var bag_id=$("#form248_link").attr('data_id');
	if(bag_id==null)
		bag_id="";	
	$('#form248_body').html("");
	$('#form248_foot').html("");
	
	if(bag_id!="")
	{
		show_loader();
		var bag_columns="<transit_bags>" +
				"<id>"+bag_id+"</id>" +
				"<bag_num></bag_num>"+
				"<lbh></lbh>"+
				"<weight></weight>"+
				"<date></date>"+
				"<num_orders></num_orders>"+
				"<branch></branch>"+
				"</transit_bags>";
	
		////separate fetch function to get bill details like customer name, total etc.
		fetch_requested_data('',bag_columns,function(bag_results)
		{
			var filter_fields=document.getElementById('form248_master');
			if(bag_results.length>0)
			{
				filter_fields.elements['bag_num'].value=bag_results[0].bag_num;
				filter_fields.elements['lbh'].value=bag_results[0].lbh;
				filter_fields.elements['weight'].value=bag_results[0].weight;
				filter_fields.elements['date'].value=get_my_past_date(bag_results[0].date);
				filter_fields.elements['id'].value=bag_results[0].id;
				filter_fields.elements['num_orders'].value=bag_results[0].num_orders;
				filter_fields.elements['branch'].value=bag_results[0].branch;
				filter_fields.elements['saved'].value='yes';

				filter_fields.elements['branch'].setAttribute('readonly','readonly');
				
				var save_button=filter_fields.elements['save'];
				$(save_button).show();
				
				var bag_items_column="<logistics_orders>" +
									"<id></id>" +
									"<awb_num></awb_num>" +
									"<manifest_type></manifest_type>" +
									"<order_num></order_num>" +
									"<ship_to></ship_to>" +
									"<address1></address1>" +
									"<address2></address2>" +
									"<city></city>" +
									"<pincode></pincode>" +
									"<phone></phone>" +
									"<weight></weight>" +
									"<status></status>" +
									"<lbh></lbh>"+
									"<bag_num exact='yes'>"+bag_results[0].bag_num+"</bag_num>" +
									"<bag_id exact='yes'>"+bag_id+"</bag_id>" +
									"</logistics_orders>";

				/////////////////////////////////////////////////////////////////////////
	
				fetch_requested_data('',bag_items_column,function(results)
				{
					results.forEach(function(result)
					{
						var id=result.id;
						var rowsHTML="<tr>";

						var address=result.ship_to+"\n"+result.address1+", "+result.address2+", "+result.city+"-"+result.pincode;
						if(result.address2=="--" || result.address2==result.address1)
						{
							var address=result.ship_to+"\n"+result.address1+", "+result.city+"-"+result.pincode;
						}						
						rowsHTML+="<form id='form248_"+id+"'></form>";
							rowsHTML+="<td data-th='S.No.'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='AWB #'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form248_"+id+"' value='"+result.awb_num+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Address'>";
								rowsHTML+="<textarea readonly='readonly' form='form248_"+id+"'>"+address+"</textarea>";
								rowsHTML+="<br><b>Phone</b>: <input type='text' readonly='readonly' value='"+result.phone+"' form='form248_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<b>Weight</b>: <input type='number' step='any' readonly='readonly' form='form248_"+id+"' value='"+result.weight+"'>";
								rowsHTML+="<br><b>LBH</b>: <input type='text' readonly='readonly' value='"+result.lbh+"' form='form248_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form248_"+id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form248_"+id+"' value='"+id+"'>";
								rowsHTML+="<input type='button' class='submit_hidden' form='form248_"+id+"' id='save_form248_"+id+"'>";
								rowsHTML+="<input type='button' class='delete_icon' form='form248_"+id+"' id='delete_form248_"+id+"' onclick='form248_delete_item($(this));'>";
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
	
						$('#form248_body').append(rowsHTML);
						
						var item_form=document.getElementById('form248_'+id);
						var save_button=item_form.elements[7];
						
						$(save_button).on('click',function (e) 
						{
							e.preventDefault();
							form248_update_item(item_form);
						});
					});
					
					form248_update_serial_numbers();
					$('textarea').autosize();
					hide_loader();
				});
			}
		});
	}
}

function form248_add_item()
{
	if(is_create_access('form248'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form248_"+id+"'></form>";
			rowsHTML+="<td data-th='S.No.'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='AWB #'>";
				rowsHTML+="<input type='text' required form='form248_"+id+"' oninvalid=\"setCustomValidity('This AWB # is invalid')\">";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Address'>";
				rowsHTML+="<textarea readonly='readonly' form='form248_"+id+"'></textarea>";
				rowsHTML+="<br><b>Phone</b>: <input type='text' readonly='readonly' form='form248_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<b>Weight</b>: <input type='number' step='any' readonly='readonly' form='form248_"+id+"'>";
				rowsHTML+="<br><b>LBH</b>: <input type='text' readonly='readonly' form='form248_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' readonly='readonly' form='form248_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form248_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form248_"+id+"' id='save_form248_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form248_"+id+"' id='delete_form248_"+id+"' onclick='$(this).parent().parent().remove(); form248_update_serial_numbers();'>";
				rowsHTML+="<input type='hidden' form='form248_"+id+"' value='' name='order_history'>";
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";

		$('#form248_body').prepend(rowsHTML);

		var item_form=document.getElementById('form248_'+id);
		var awb_filter=item_form.elements[0];
		var address_filter=item_form.elements[1];
		var phone_filter=item_form.elements[2];
		var weight_filter=item_form.elements[3];
		var lbh_filter=item_form.elements[4];
		var status_filter=item_form.elements[5];
		var id_filter=item_form.elements[6];
		var save_button=item_form.elements[7];
		var history_filter=item_form.elements[9];
		
		var new_bag=true;
		var saved=document.getElementById('form248_master').elements['saved'].value;
		if(saved=='yes')
		{
			new_bag=false;
		}
		
		$(item_form).on("submit", function(event)
		{
			event.preventDefault();
			var total_entries=0;
			var double_entry=0;
			$("[id^='save_form248']").each(function(index)
			{
				var subform_id=$(this).attr('form');
				var subform=document.getElementById(subform_id);
				total_entries+=1;
				if(subform.elements[0].value==awb_filter.value)	
					double_entry+=1;
			});

			if(total_entries==1 && new_bag)
			{
				form248_create_form(function()
				{
					if(double_entry<2)
					{
						form248_create_item(item_form);
						form248_add_item();
					}
					else 
					{
						awb_filter.value="";
						$("#modal65").dialog("open");
					}
				});
			}
			else 
			{
				if(double_entry<2)
				{
					form248_create_item(item_form);
					form248_add_item();
				}
				else 
				{
					awb_filter.value="";
					$("#modal65").dialog("open");
				}
			}
		});

		$(awb_filter).focus();
				
		$(awb_filter).on('keydown',function (event) 
		{
			if(event.keyCode == 13 ) 
			{
				event.preventDefault();
				
				var total_entries=0;
				var double_entry=0;
				$("[id^='save_form248']").each(function(index)
				{
					var subform_id=$(this).attr('form');
					var subform=document.getElementById(subform_id);
					
					total_entries+=1;
				
					if(subform.elements[0].value==awb_filter.value)	
						double_entry+=1;
				});
				
				if(total_entries==1 && new_bag)
				{
					form248_create_form(function () 
					{
						if(double_entry<2)
						{
							var orders_data="<logistics_orders count='1'>"+
											"<id></id>"+
											"<address1></address1>"+
											"<address2></address2>"+
											"<city></city>"+
											"<pincode></pincode>"+
											"<awb_num exact='yes'>"+awb_filter.value+"</awb_num>" +
											"<manifest_type></manifest_type>" +
											"<order_num></order_num>" +
											"<merchant_name></merchant_name>" +
											"<ship_to></ship_to>" +
											"<phone></phone>" +
											"<weight></weight>" +
											"<lbh></lbh>" +
											"<pieces></pieces>" +
											"<drs_num></drs_num>" +
											"<status array='yes'>--received--undelivered--pending--</status>"+
											"<order_history></order_history>"+
											"</logistics_orders>";
							//console.log(orders_data);				
							fetch_requested_data('',orders_data,function (orders) 
							{
								//console.log(orders);
								if(orders.length>0)
								{
									address_filter.value=orders[0].ship_to+"\n"+orders[0].address1+", "+orders[0].address2+", "+orders[0].city+"-"+orders[0].pincode;
									phone_filter.value=orders[0].phone;
									weight_filter.value=orders[0].weight;
									lbh_filter.value=orders[0].lbh;
									status_filter.value=orders[0].status;
									id_filter.value=orders[0].id;
									history_filter.value=orders[0].order_history;
									form248_create_item(item_form);
									form248_add_item();
								}
								else 
								{
									address_filter.value="";
									phone_filter.value="";
									weight_filter.value="";
									lbh_filter.value="";
									status_filter.value="";
									id_filter.value="";
									history_filter.value="";
									awb_filter.value="";
									$("#modal65").dialog("open");
								}
							});
						}
						else 
						{
							awb_filter.value="";
							$("#modal65").dialog("open");
						}
					});
				}
				else 
				{
					if(double_entry<2)
					{
						var orders_data="<logistics_orders count='1'>"+
										"<id></id>"+
										"<address1></address1>"+
										"<address2></address2>"+
										"<city></city>"+
										"<pincode></pincode>"+
										"<awb_num exact='yes'>"+awb_filter.value+"</awb_num>" +
										"<manifest_type></manifest_type>" +
										"<order_num></order_num>" +
										"<merchant_name></merchant_name>" +
										"<ship_to></ship_to>" +
										"<phone></phone>" +
										"<weight></weight>" +
										"<lbh></lbh>" +
										"<pieces></pieces>" +
										"<drs_num></drs_num>" +
										"<status array='yes'>--received--undelivered--pending--</status>"+
										"<order_history></order_history>"+
										"</logistics_orders>";
						//console.log(orders_data);				
						fetch_requested_data('',orders_data,function (orders) 
						{
							//console.log(orders);
							if(orders.length>0)
							{
								address_filter.value=orders[0].ship_to+"\n"+orders[0].address1+", "+orders[0].address2+", "+orders[0].city+"-"+orders[0].pincode;
								phone_filter.value=orders[0].phone;
								weight_filter.value=orders[0].weight;
								lbh_filter.value=orders[0].lbh;
								status_filter.value=orders[0].status;
								id_filter.value=orders[0].id;
								history_filter.value=orders[0].order_history;	
								form248_create_item(item_form);
								form248_add_item();
							}
							else 
							{
								address_filter.value="";
								phone_filter.value="";
								weight_filter.value="";
								lbh_filter.value="";
								status_filter.value="";
								id_filter.value="";
								awb_filter.value="";
								history_filter.value="";
								$("#modal65").dialog("open");
							}
						});
					}
					else 
					{
						awb_filter.value="";
						$("#modal65").dialog("open");
					}
				}
			}
		});
		$('textarea').autosize();
		form248_update_serial_numbers();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

function form248_create_item(form)
{
	//console.log('form248_create_form');
	if(is_create_access('form248'))
	{
		var master_form=document.getElementById('form248_master');
		var bag_num=master_form.elements['bag_num'].value;
		var bag_id=master_form.elements['id'].value;
		var bag_date=master_form.elements['date'].value;
		var lbh=master_form.elements['lbh'].value;
		var weight=master_form.elements['weight'].value;
		var num_orders=master_form.elements['num_orders'].value;
		var branch=master_form.elements['branch'].value;
				
		var data_id=form.elements[6].value;
		var save_button=form.elements[7];
		var del_button=form.elements[8];
		
		var old_order_history=form.elements[9].value;

		var order_history=[];
		if(old_order_history!="")
			order_history=JSON.parse(old_order_history);
		var history_object=new Object();
		history_object.timeStamp=get_my_time();
		history_object.details="Order in-transit";
		history_object.location=branch;
		history_object.status="in-transit";
		order_history.push(history_object);
		var order_history_string=JSON.stringify(order_history);		
		
		var last_updated=get_my_time();
		var data_xml="<logistics_orders>" +
					"<id>"+data_id+"</id>" +
					"<status>in-transit</status>" +
					"<bag_num>"+bag_num+"</bag_num>"+
					"<bag_id>"+bag_id+"</bag_id>"+
					"<order_history>"+order_history_string+"</order_history>"+
					"<branch>"+branch+"</branch>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</logistics_orders>";
		update_simple(data_xml);
		
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form248_delete_item(del_button);
		});

		$(save_button).off('click');
		$(save_button).on('click',function(event)
		{
			event.preventDefault();
			form248_update_item(form);
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create bag
 * @param button
 */
function form248_create_form(func)
{
	if(is_create_access('form248'))
	{
		var form=document.getElementById("form248_master");
		
		var bag_num=form.elements['bag_num'].value;
		var lbh=form.elements['lbh'].value;
		var weight=form.elements['weight'].value;
		var date=get_raw_time(form.elements['date'].value);
		var data_id=form.elements['id'].value;
		var num_orders=form.elements['num_orders'].value;
		var branch_filter=form.elements['branch'];
		var branch=branch_filter.value;
		
		branch_filter.setAttribute('readonly','readonly');
		
		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var bag_columns="<transit_bags count='1'>" +
					"<bag_num exact='yes'>"+bag_num+"</bag_num>"+
					"</transit_bags>";		
		get_single_column_data(function(bags)
		{
			if(bags.length==0)
			{	
				var data_xml="<transit_bags>" +
							"<id>"+data_id+"</id>" +
							"<bag_num>"+bag_num+"</bag_num>"+
							"<lbh>"+lbh+"</lbh>"+
							"<date>"+date+"</date>"+
							"<weight>"+weight+"</weight>"+
							"<num_orders>"+num_orders+"</num_orders>"+
							"<status>pending</status>"+
							"<branch>"+branch+"</branch>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</transit_bags>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>transit_bags</tablename>" +
							"<link_to>form249</link_to>" +
							"<title>Create</title>" +
							"<notes>Bag # "+bag_num+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				var num_data="<user_preferences>"+
							"<id></id>"+						
							"<name exact='yes'>bag_num</name>"+												
							"</user_preferences>";
				get_single_column_data(function (bag_num_ids)
				{
					if(bag_num_ids.length>0)
					{
						var num_xml="<user_preferences>"+
										"<id>"+bag_num_ids[0]+"</id>"+
										"<value>"+(parseInt(bag_num)+1)+"</value>"+
										"<last_updated>"+last_updated+"</last_updated>"+
										"</user_preferences>";
						update_simple(num_xml);
					}
				},num_data);
		
				create_row(data_xml,activity_xml);
				
				$(save_button).show();
				
				if(typeof func!='undefined')
				{
					func();
				}
			}
			else 
			{
				$("#modal77").dialog("open");
			}
		},bag_columns);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

function form248_update_item(form)
{
	if(is_update_access('form248'))
	{
		var bag_num=document.getElementById('form248_master').elements['bag_num'].value;
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		
		var data_xml="<logistics_orders>" +
					"<id>"+data_id+"</id>" +
					"<bag_num>"+bag_num+"</bag_num>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</logistics_orders>";
		update_simple(data_xml);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Manage Transit bags
 * @param button
 */
function form248_update_form()
{
	if(is_create_access('form248'))
	{
		var form=document.getElementById("form248_master");
		
		var bag_num=form.elements['bag_num'].value;
		var lbh=form.elements['lbh'].value;
		var weight=form.elements['weight'].value;
		var num_orders=form.elements['num_orders'].value;
		var date=get_raw_time(form.elements['date'].value);
		var data_id=form.elements['id'].value;
		
		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var bag_columns="<transit_bags count='2'>" +
					"<id></id>"+
					"<bag_num exact='yes'>"+bag_num+"</bag_num>"+
					"</transit_bags>";		
		fetch_requested_data('',bag_columns,function(bags)
		{
			if(bags.length==0 || (bags.length==1 && bags[0].id==data_id))
			{
				var data_xml="<transit_bags>" +
							"<id>"+data_id+"</id>" +
							"<bag_num>"+bag_num+"</bag_num>"+
							"<lbh>"+lbh+"</lbh>"+
							"<weight>"+weight+"</weight>"+
							"<num_orders>"+num_orders+"</num_orders>"+
							"<date>"+date+"</date>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</transit_bags>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>transit_bags</tablename>" +
							"<link_to>form249</link_to>" +
							"<title>Updated</title>" +
							"<notes>Bag # "+bag_num+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				update_row(data_xml,activity_xml);
				
		
				$("[id^='save_form248_']").click();
			}
			else 
			{
				$("#modal77").dialog("open");
			}
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

function form248_delete_item(button)
{
	if(is_delete_access('form248'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[6].value;
			var last_updated=get_my_time();
			var data_xml="<logistics_orders>" +
						"<id>"+data_id+"</id>" +
						"<status>received</status>" +
						"<bag_num></bag_num>"+
						"<bag_id></bag_id>"+
						"<branch></branch>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</logistics_orders>";
			update_simple(data_xml);
			$(button).parent().parent().remove();
			form248_update_serial_numbers();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
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

    </script>
</div>