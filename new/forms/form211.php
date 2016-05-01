<div id='form211' class='tab-pane'>
	<form id='form211_master' autocomplete="off">
		<fieldset>
			<label>DRS #<br><input type='text' name='drs'></label>
			<label>Status<br><input type='text' name='status'></label>
			<label>Remark<br><textarea name='remark' class='widebox'></textarea></label>
			<label>AWB #<br><input name='awb_num'></label><br>
			<label>
				<input type='button' class='save_icon' name='save' title="Save All">
			</label>
		</fieldset>
	</form>
		<table class='rwd-table'>
		<thead id='form211_head'>
			<tr>
				<form id='form211_header'></form>
					<th>AWB #</th>
					<th>Current Status</th>
					<th>Updated Status</th>
					<th>Remark</th>
					<th></th>
			</tr>
		</thead>
		<tbody id='form211_body'>
		</tbody>
		<tfoot id='form211_foot'>
		</tfoot>
	</table>
    
    <script>
    function form211_header_ini()
{
	$('#form211_body').html("");
	
	var fields=document.getElementById('form211_master');
	
	var drs_filter=fields.elements['drs'];
	var status_filter=fields.elements['status'];
	var remark_filter=fields.elements['remark'];
	var awb_filter=fields.elements['awb_num'];
	var save_button=fields.elements['save'];

	drs_filter.value="";
	$(drs_filter).focus();

	set_static_value_list('logistics_orders','status',status_filter);

	$(awb_filter).off('keydown');
	$(awb_filter).on('keydown',function (event) 
	{
		if(event.keyCode == 13) 
		{
	    	event.preventDefault();
	    	var subform=document.getElementById('form211_'+awb_filter.value);
	    	subform.elements[2].value=status_filter.value;
	    	subform.elements[3].value=remark_filter.value;
	    	form211_get_totals();
	    	awb_filter.value="";
	    }
	});
	
	$(drs_filter).off('keydown');
	$(drs_filter).on('keydown',function (event) 
	{
		if(event.keyCode == 13) 
		{
	    	event.preventDefault();
	    	form211_ini();
	    }
	});
/*
	$(status_filter).off('blur');
	$(status_filter).on('blur',function () 
	{
		$("[id^='save_form211']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			subform.elements[2].value=status_filter.value;
		});
	});
	
	$(remark_filter).off('blur');
	$(remark_filter).on('blur',function () 
	{
		$("[id^='save_form211']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			subform.elements[3].value=remark_filter.value;
		});		
	});
*/	
/*
	$(refresh_button).off('click');
	$(refresh_button).on("click", function(event)
	{
		event.preventDefault();
		form211_ini();
	});
*/
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		$("[id^='save_form211_']").click();
	});
}

function form211_ini()
{
	$('#form211_body').html("");
	$('#form211_foot').html("");

	var filter_fields=document.getElementById('form211_master');
	var drs_num=filter_fields['drs'].value;
	var all_status=filter_fields['status'].value;
	var all_remark=filter_fields['remark'].value;
	var awb_filter=filter_fields['awb_num'];
		
	if(drs_num!="")
	{
		show_loader();
		
		if_data_read_access('store_areas',function(accessible_data)
		{
			console.log(accessible_data);
			var branches_array=[];
			var branch_object={index:'branch',array:branches_array};
			
			for(var x in accessible_data)
			{
				branches_array.push(accessible_data[x].name);
				if(accessible_data[x].record_id=='all')
				{
					branch_object={index:'branch'};
					break;
				}
			}
	
			console.log(branch_object);
			
			var new_columns=new Object();
				new_columns.count=0;
				new_columns.start_index=0;
				new_columns.data_store='logistics_orders';
				new_columns.return_column='awb_num';		
				
				new_columns.indexes=[{index:'awb_num'},
									{index:'id'},
									{index:'drs_num',exact:drs_num},
									{index:'status'},
									{index:'order_history'},
									branch_object];

			set_my_value_list_json(new_columns,awb_filter);
			
			read_json_rows('',new_columns,function(results)
			{	
				results.forEach(function(result)
				{
					var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='form211_"+result.awb_num+"'></form>";
						rowsHTML+="<td data-th='AWB #'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form211_"+result.awb_num+"' value='"+result.awb_num+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Current Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form211_"+result.awb_num+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Updated Status'>";
							rowsHTML+="<input type='text' form='form211_"+result.awb_num+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Remark'>";
							rowsHTML+="<textarea form='form211_"+result.awb_num+"'></textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form211_"+result.awb_num+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form211_"+result.awb_num+"' id='save_form211_"+id+"'>";
							rowsHTML+="<input type='hidden' form='form211_"+result.awb_num+"' value='"+result.order_history+"'>";
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form211_body').prepend(rowsHTML);
					var fields=document.getElementById("form211_"+result.awb_num);
					var status_filter=fields.elements[2];
					
					set_static_value_list('logistics_orders','status',status_filter);
							
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form211_update_item(fields);
					});
				});
				form211_get_totals();
				hide_loader();
			});
		});
	}
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

function form211_update_item(form)
{
	if(is_update_access('form211'))
	{
		var awb_num=form.elements[0].value;
		var status=form.elements[2].value;
		var remarks=form.elements[3].value;
		var id=form.elements[4].value;
		var last_updated=get_my_time();
		var delivery_string="<delivery_time></delivery_time>";
		
		if(status!="")
		{
			var old_order_history=form.elements[6].value;
			var order_history=JSON.parse(old_order_history);
			var history_object=new Object();
			history_object.timeStamp=get_my_time();
			history_object.details=remarks;
			history_object.status=status;
			
			if(status=='received')
			{
				history_object.location=get_session_var('address');
			}
			else if(status=='pending')
			{
				history_object.location=get_session_var('address');
			}
			else if(status=='delivered')
			{
				history_object.location="";
				delivery_string="<delivery_time>"+history_object.timeStamp+"</delivery_time>";
			}
			else if(status=='undelivered')
			{
				history_object.location="";
			}
			
			order_history.push(history_object);
			var order_history_string=JSON.stringify(order_history);		
			
			var data_xml="<logistics_orders>" +
						"<id>"+id+"</id>" +
						"<status>"+status+"</status>" +
						"<comments>"+remarks+"</comments>" +
						"<order_history>"+order_history_string+"</order_history>" +
						delivery_string+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</logistics_orders>";
			update_simple(data_xml);
			for(var i=0;i<4;i++)
			{
				$(form.elements[i]).attr('readonly','readonly');
			}
			
			$(form).off('submit');
			$(form).on('submit',function (e) 
			{
				e.preventDefault();
			});
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}
    
    </script>
</div>