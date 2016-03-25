<div id='form199' class='function_detail'>
	<form id='form199_master' autocomplete="off">
		<fieldset>
			<label>Comments: <textarea class='widebox' name='comments'></textarea></label>
			<!--<label><input type='button' name='save' class='generic_icon' value='Update Status'></label>-->
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead id='form199_head'>
			<tr>
				<form id='form199_header'></form>
					<th>AWB #</th>
					<th>LBH</th>
					<th>Transfer Zone</th>
					<th><input type='button' form='form199_header' title='Add item' class='add_icon' onclick='form199_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form199_body'>
		</tbody>
	</table>
    
    <script>
    function form199_header_ini()
{
	var fields=document.getElementById('form199_master');

	var comments_filter=fields.elements['comments'];

	comments_filter.value="";	
	$(fields).off('submit');
	$(fields).on('submit',function(event)
	{
		event.preventDefault();
		form199_add_item();
	});

	$('#form199_body').html("");
}

function form199_add_item()
{
	if(is_create_access('form199'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form199_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='AWB #'>";
				rowsHTML+="<input type='text' required form='form199_"+id+"' oninvalid=\"setCustomValidity('This AWB # is invalid')\">";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='LBH'>";
				rowsHTML+="<input type='text' form='form199_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Transfer Zone'>";
				rowsHTML+="<input type='text' readonly='readonly' form='form199_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form199_"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form199_"+id+"' id='save_form199_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form199_"+id+"' id='delete_form199_"+id+"' onclick='form199_delete_item($(this));'>";
				rowsHTML+="<input type='hidden' form='form199_"+id+"' name='order_history'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form199_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form199_"+id);
		var awb_filter=fields.elements[0];
		var lbh_filter=fields.elements[1];
		var tz_filter=fields.elements[2];
		var id_filter=fields.elements[3];
		var order_history=fields.elements[6];

		$(lbh_filter).on('keydown',function (event) 
		{
			if(event.keyCode==13)
			{
				event.preventDefault();
			
				form199_update_item(fields);
				form199_add_item();
			}
		});
		
		$(awb_filter).on('keydown',function (event) 
		{
			if(event.keyCode == 13 ) 
			{
				event.preventDefault();
				
				var double_entry=0;
				$("[id^='save_form199']").each(function(index)
				{
					var subform_id=$(this).attr('form');
					var subform=document.getElementById(subform_id);
					
					if(subform.elements[0].value==awb_filter.value)	
						double_entry+=1;
				});
	
				if(double_entry<2)
				{
					var order_data="<logistics_orders count='1'>"+
							"<id></id>"+
							"<pincode></pincode>"+
							"<order_history></order_history>"+
							"<len></len>"+
							"<breadth></breadth>"+
							"<height></height>"+
							"<lbh></lbh>"+
							"<status array='yes'>--picked--in-transit--</status>"+
							"<awb_num exact='yes'>"+awb_filter.value+"</awb_num>"+
							"</logistics_orders>";
					fetch_requested_data('',order_data,function(orders)
					{
						//console.log('form199 double entry checked');
						if(orders.length>0)
						{
							var transfer_zone_data="<pincodes>"+
												"<zone></zone>"+
												"<status exact='yes'>active</status>"+
												"<pincode exact='yes'>"+orders[0].pincode+"</pincode>"+
												"</pincodes>";
							set_my_value(transfer_zone_data,tz_filter);					
							/*
							if(orders[0].lbh=="" || orders[0].lbh=="null" || orders[0].lbh==null)							
								lbh_filter.value=orders[0].len+"*"+orders[0].breadth+"*"+orders[0].height;
							else 
								lbh_filter.value=orders[0].lbh;	
							*/
							id_filter.value=orders[0].id;
							order_history.value=orders[0].order_history;
							$(lbh_filter).focus();
						}
						else 
						{
							tz_filter.value="";
							lbh_filter.value="";
							id_filter.value="";
							order_history.value="";
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
			}
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			
			var double_entry=0;
			$("[id^='save_form199']").each(function(index)
			{
				var subform_id=$(this).attr('form');
				var subform=document.getElementById(subform_id);
				
				if(subform.elements[0].value==awb_filter.value)	
					double_entry+=1;
			});

			if(double_entry<2)
			{
				form199_add_item();
			}
			else 
			{
				awb_filter.value="";
				$("#modal65").dialog("open");
			}
		});

		$(awb_filter).focus();
		
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

function form199_update_item(form)
{
	if(is_update_access('form199'))
	{
		//console.log('199 update');
		var master_form=document.getElementById("form199_master");		
		var comments=master_form.elements['comments'].value;
		
		var awb_num=form.elements[0].value;
		var lbh=form.elements[1].value;
		var status='received';
		var id=form.elements[3].value;
		var last_updated=get_my_time();
		
		var old_order_history=form.elements[6].value;

		var order_history=JSON.parse(old_order_history);
		var history_object=new Object();
		history_object.timeStamp=get_my_time();
		history_object.details=comments;
		history_object.location=get_session_var('address');
		history_object.status=status;
		order_history.push(history_object);
		var order_history_string=JSON.stringify(order_history);		
		
		var data_xml="<logistics_orders>" +
					"<id>"+id+"</id>" +
					//"<awb_num>"+awb_num+"</awb_num>" +
					"<status>"+status+"</status>" +
					"<lbh>"+lbh+"</lbh>" +
					"<comments>"+comments+"</comments>" +
					"<order_history>"+order_history_string+"</order_history>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</logistics_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+id+"</data_id>" +
					"<tablename>logistics_orders</tablename>" +
					"<link_to>form198</link_to>" +
					"<title>Received</title>" +
					"<notes>AWB # "+awb_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		
		for(var i=0;i<2;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

function form199_update_lbh(form)
{
	if(is_update_access('form199'))
	{
		//console.log('199 update');
		var master_form=document.getElementById("form199_master");		
		
		var awb_num=form.elements[0].value;
		var lbh=form.elements[1].value;
		var id=form.elements[3].value;
		var last_updated=get_my_time();
		
		var data_xml="<logistics_orders>" +
					"<id>"+id+"</id>" +
					"<lbh>"+lbh+"</lbh>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</logistics_orders>";
		update_simple(data_xml);
		
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}
    
function form199_delete_item(button)
{
	if(is_update_access('form199'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		
		var awb_num=form.elements[0].value;
		var status='picked';
		var id=form.elements[3].value;
		var last_updated=get_my_time();
		if(id!="")
		{		
			var data_xml="<logistics_orders>" +
						"<id>"+id+"</id>" +
						//"<awb_num>"+awb_num+"</awb_num>" +
						"<status>"+status+"</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</logistics_orders>";
			var activity_xml="<activity>" +
						"<data_id>"+id+"</data_id>" +
						"<tablename>logistics_orders</tablename>" +
						"<link_to>form198</link_to>" +
						"<title>Unmarked</title>" +
						"<notes>AWB # "+awb_num+" from received</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			update_row(data_xml,activity_xml);
		}	
		$(button).parent().parent().remove();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

    </script>
</div>