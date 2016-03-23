<div id='form256' class='tab-pane'>
	<form id='form256_master' autocomplete="off">
		<fieldset>
		   <label>Item: <input type='text' required name='item_name'></label>
		   <label>Batch: <input type='text' required name='batch'></label>
		   	<label>	<input type='button' class='save_icon' name='save'></label>
			<br>
			<label>Quantity: <input type='text' readonly='readonly' name='quantity'></label>
		   <label>Production Plan: <input type='text' readonly='readonly' name='pplan' value'Go To Prodcution Plan'></label>
		   <label>Brand: <input type='text' readonly='readonly' name='brand'></label>
		   <label>	
			   <input type='hidden' name='id'>
			   <input type='submit' class='submit_hidden'>			
			</label>
		</fieldset>	
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form256_header'></form>
					<th>Item</th>
					<th>Batch</th>
					<th>Quantity</th>
					<th><input type='button' class='add_icon' form='form256_header' title='Add item' onclick='form256_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form256_body'>
		</tbody>
	</table>
    
    <script>
function form256_header_ini()
{
	var fields=document.getElementById('form256_master');
	
	var item_filter=fields.elements['item_name'];
	var batch_filter=fields.elements['batch'];
	var quantity_filter=fields.elements['quantity'];
	var brand_filter=fields.elements['brand'];
	var plan_filter=fields.elements['pplan'];
	var id_filter=fields.elements['id'];
	var save_button=fields.elements['save'];

	$(plan_filter).off('click');
	
	$(save_button).off('click');
	$(save_button).on("click", function(event)
	{
		event.preventDefault();
		form256_update_form();
	});

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
		form256_ini();
	});

	var item_data="<attributes>" +
			"<name></name>" +
			"<type exact='yes'>product</type>"+
			"<value exact='yes'>yes</value>"+
			"<attribute exact='yes'>manufactured</attribute>"+
			"</attributes>";
		
	set_my_value_list(item_data,item_filter,function () 
	{
		$(item_filter).focus();
	});
	
	var batch_data="<product_instances>" +
		"<batch></batch>" +
		"</product_instances>";
	set_my_filter(batch_data,batch_filter,function () 
	{
		$(batch_filter).focus();
	});
	
	$(item_filter).off('blur');
	$(item_filter).on('blur',function()
	{
		var batch_data="<product_instances>" +
			"<batch></batch>" +
			"</product_instances>";
		set_my_filter(batch_data,batch_filter,function () 
		{
			$(batch_filter).focus();
		});
	});

	item_filter.value='';
	batch_filter.value="";
	quantity_filter.value="";
	brand_filter.value="";
	plan_filter.value="";
	id_filter.value="";
	
	$('#form256_body').html("");
}
    
function form256_ini()
{
	var fid=$("#form256_link").attr('data_id');
	if(fid==null)
		fid="";	

	$('#form256_body').html('');
		
	var master_fields=document.getElementById('form256_master');
	var master_name=master_fields.elements['item_name'].value;
	var batch=master_fields.elements['batch'].value;
	
	if(fid!="" || master_name!="")
	{
		show_loader();

		var items_column="<production_plan_items>" +
						"<id>"+fid+"</id>" +
						"<plan_id></plan_id>"+
						"<status></status>" +
						"<brand></brand>" +
						"<quantity></quantity>" +
						"<item>"+master_name+"</item>" +
						"<batch>"+batch+"</batch>" +
						"</production_plan_items>";
		fetch_requested_data('',items_column,function(bag_results)
		{
			var filter_fields=document.getElementById('form256_master');
			if(bag_results.length>0)
			{
				filter_fields.elements['id'].value=bag_results[0].id;
				filter_fields.elements['item_name'].value=bag_results[0].item;
				filter_fields.elements['batch'].value=bag_results[0].batch;
				filter_fields.elements['brand'].value=bag_results[0].brand;
				filter_fields.elements['quantity'].value=bag_results[0].quantity;
				filter_fields.elements['pplan'].value=bag_results[0].plan_id;
	
				var plan_elem=filter_fields.elements['pplan'];			
				$(plan_elem).on('click',function()
				{
					element_display(bag_results[0].plan_id,'form186');
				});
							
				var save_button=filter_fields.elements['save'];
				
				var raw_column="<batch_raw_material>" +
								"<id></id>" +
								"<item></item>" +
								"<batch></batch>" +
								"<quantity></quantity>" +
								"<production_id exact='yes'>"+bag_results[0].id+"</production_id>" +
								"</batch_raw_material>";
	
				fetch_requested_data('form256',raw_column,function(results)
				{
					//console.log(results);
					results.forEach(function(result)
					{
						var id=result.id;
						var rowsHTML="<tr>";
						rowsHTML+="<form id='form256_"+id+"'></form>";
							rowsHTML+="<td data-th='Item'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form256_"+id+"' value='"+result.item+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Batch'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form256_"+id+"' value='"+result.batch+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Quantity'>";
								rowsHTML+="<input type='number' step='any' readonly='readonly' form='form256_"+id+"' value='"+result.quantity+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form256_"+id+"' value='"+id+"'>";
								rowsHTML+="<input type='button' class='submit_hidden' form='form256_"+id+"' id='save_form256_"+id+"'>";
								rowsHTML+="<input type='button' class='delete_icon' form='form256_"+id+"' id='delete_form256_"+id+"' onclick='form256_delete_item($(this));'>";
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
			
						$('#form256_body').append(rowsHTML);
					});
					
					$('textarea').autosize();
					hide_loader();
				});
			}
			else
			{
				hide_loader();
			}
		});
	}
}
        
function form256_add_item()
{
	if(is_create_access('form256'))
	{
		var rowsHTML="";
		var id=get_new_key();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form256_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' form='form256_"+id+"' required value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='form256_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' class='dblclick_editable' required step='any' form='form256_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form256_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form256_"+id+"'>";	
				rowsHTML+="<input type='button' class='delete_icon' form='form256_"+id+"' onclick='$(this).parent().parent().remove();'>";	
			rowsHTML+="</td>";			
		rowsHTML+="</tr>";
	
		$('#form256_body').prepend(rowsHTML);
		
		var fields=document.getElementById("form256_"+id);
		var item_filter=fields.elements[0];
		var batch_filter=fields.elements[1];
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form256_create_item(fields);
		});

		var item_data="<attributes>" +
			"<name></name>" +
			"<type exact='yes'>product</type>"+
			"<value exact='yes'>yes</value>"+
			"<attribute exact='yes'>raw material</attribute>"+
			"</attributes>";
		set_my_value_list_func(item_data,item_filter,function () 
		{
			$(item_filter).focus();
		});

		$(item_filter).on('blur',function () 
		{		
			var batch_data="<product_instances>" +
				"<batch></batch>" +
				"<product_name exact='yes'>"+item_filter.value+"</product_name>"+
				"</product_instances>";
							
			set_my_value_list(batch_data,batch_filter);
		});		
		longPressEditable($('.dblclick_editable'));
			
	}
	else
	{
		$("#modal2_link").click();
	}		
}

function form256_create_item(form)
{
	if(is_create_access('form256'))
	{
		var production_id=document.getElementById('form256_master').elements['id'].value;
		var item=form.elements[0].value;
		var batch=form.elements[1].value;
		var quantity=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var del_button=form.elements[5];
		var storage=get_session_var('production_floor_store');
		
		var data_xml="<batch_raw_material>" +
					"<id>"+data_id+"</id>" +
					"<production_id>"+production_id+"</production_id>" +
					"<item>"+item+"</item>" +
					"<batch>"+batch+"</batch>" +
					"<quantity>"+quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</batch_raw_material>";
		var item_subtracted_xml="<inventory_adjust>"+
					"<id>"+data_id+"</id>"+
					"<product_name>"+item+"</product_name>"+
					"<batch>"+batch+"</batch>"+
					"<quantity>-"+quantity+"</quantity>"+
					"<source>manufacturing</source>"+
					"<source_id>"+production_id+"</source_id>"+
					"<storage>"+storage+"</storage>"+
					"<last_updated>"+last_updated+"</last_updated>"+
					"</inventory_adjust>";
		
		create_simple(item_subtracted_xml);			
		create_simple(data_xml);
		
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form256_delete_item(del_button);
		});
		
		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			form256_update_item(form);
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Batch Info
 * @param button
 */
function form256_create_form()
{
	if(is_create_access('form256'))
	{
		var filter_fields=document.getElementById('form256_master');
		var id=filter_fields.elements['id'].value;
		var item=filter_fields.elements['item_name'].value;
		var batch=filter_fields.elements['batch'].value;
		var quantity=filter_fields.elements['quantity'].value;
		var last_updated=get_my_time();
		var storage=get_session_var('production_floor_store');
		var save_button=filter_fields.elements['save'];

		var items_column="<production_plan_items>" +
						"<id>"+id+"</id>" +
						"<batch>"+batch+"</batch>" +
						"<status>inventoried</status>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</production_plan_items>";
		update_simple(items_column);

		///add to inventory
		var item_created_xml="<inventory_adjust>"+
							"<id>"+get_new_key()+"</id>"+
							"<product_name>"+item+"</product_name>"+
							"<batch>"+batch+"</batch>"+
							"<quantity>"+quantity+"</quantity>"+
							"<source>manufacturing</source>"+
							"<source_id>"+id+"</source_id>"+
							"<storage>"+storage+"</storage>"+
							"<last_updated>"+last_updated+"</last_updated>"+
							"</inventory_adjust>";
		create_simple(item_created_xml);
		
		var instance_xml="<product_instances>"+
						"<id>"+get_new_key()+"</id>"+
						"<product_name>"+item+"</product_name>"+
						"<batch exact='yes'>"+batch+"</batch>"+
						"<manufacture_date>"+last_updated+"</manufacture_date>"+
						"<last_updated>"+last_updated+"</last_updated>"+
						"</product_instances>";
		create_simple(instance_xml);				
		
		///add area utilization if not exist
		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+storage+"</name>" +
				"<item_name exact='yes'>"+item+"</item_name>" +
				"<batch exact='yes'>"+batch+"</batch>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0 && storage!="")
			{
				var storage_xml="<area_utilization>" +
						"<id>"+get_new_key()+"</id>" +
						"<name>"+storage+"</name>" +
						"<item_name>"+item+"</item_name>" +
						"<batch>"+batch+"</batch>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</area_utilization>";
				create_simple(storage_xml);
			}
		});		
		
		$(save_button).off('click');
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form256_update_form();
		});

		$("[id^='save_form256_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}	
}
    
function form256_update_item(form)
{
	if(is_update_access('form256'))
	{
		var item=form.elements[0].value;
		var batch=form.elements[1].value;
		var quantity=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<batch_raw_material>" +
					"<id>"+data_id+"</id>" +
					"<quantity>"+quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</batch_raw_material>";
		var item_subtracted_xml="<inventory_adjust>"+
					"<id>"+data_id+"</id>"+
					"<quantity>-"+quantity+"</quantity>"+
					"<last_updated>"+last_updated+"</last_updated>"+
					"</inventory_adjust>";
		
		update_simple(data_xml);
		
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}
   
function form256_update_form()
{
	if(is_update_access('form256'))
	{
		$("[id^='save_form256_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}	
}
        
function form256_delete_item(button)
{
	if(is_delete_access('form256'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var item=form.elements[0].value;
			var data_id=form.elements[3].value;
			var data_xml="<batch_raw_material>" +
						"<id>"+data_id+"</id>" +
						"</batch_raw_material>";
			delete_simple(data_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}
        
    </script>
</div>