<div id='report63' class='tab-pane'>
	<form id='report63_header' autocomplete="off">
		<fieldset>
			<label>SKU<br><input type='text' name='sku'></label>
			<label>Item Name<br><input type='text' name='item_name'></label>
			<label>	
				<input type='submit' name='refresh' value='Refresh' class='generic_icon'>
				<input type='button' name='print' title='Print' class='print_icon'>
			</label>
			<br>
			<label style='background-color:#B93C42;color:#fff;padding:3px;'>Scan Rack<br><input type='text' style='color:#000;' name='rack'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead id='report63_head'>
			<tr>
				<th>Item</th>
				<th>Batch</th>
				<th>Quantity</th>
				<th style='width:250px;'>Storage</th>
			</tr>
		</thead>
		<tbody id='report63_body'>
		</tbody>
	</table>
	
	<script>
	
	function report63_header_ini()
{	
	var form=document.getElementById('report63_header');
	var sku_filter=form.elements['sku'];
	var item_name_filter=form.elements['item_name'];
	var rack_filter=form.elements['rack'];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report63_ini();
	});
		
	$(rack_filter).off('click');
	$(rack_filter).on('click',function()
	{
		this.select();
	});

	var sku_data="<product_master>"+
		"<name></name>"+
		"</product_master>";
	set_my_filter(sku_data,sku_filter);	

	var name_data="<product_master>"+
		"<description></description>"+
		"</product_master>";
	set_my_filter(name_data,item_name_filter);					
	
	$(rack_filter).off('keydown');
	$(rack_filter).on('keydown',function (event) 
	{
		if(event.keyCode==13)
		{
			event.preventDefault();
			modal150_action(rack_filter.value,'report63');
		}
	});
}

function report63_ini()
{
	//console.log('report63');
	var form=document.getElementById('report63_header');
	var sku=form.elements['sku'].value;
	var item=form.elements['item_name'].value;

	show_loader();
	
	$('#report63_body').html('');
	
	var items_data="<bill_items>" +
		"<id></id>"+
		"<item_name>"+sku+"</item_name>" +
		"<item_desc>"+item+"</item_desc>"+
		"<batch></batch>" +
		"<quantity></quantity>"+
		"<picked_quantity></picked_quantity>"+
		"<storage></storage>"+
		"<bill_id></bill_id>"+
		"<picked_status exact='yes'>pending</picked_status>"+
		"</bill_items>";

	fetch_requested_data('report63',items_data,function(items)
	{	
		items.forEach(function(item)
		{
			item.table_type='bill_items';
		});
		
		var num_items=items.length+1;

		for(var i=0;i<items.length;i++)
		{
			if(typeof items[i].item_count=='undefined')
			{
				items[i].item_count=1;			
			}

			for(var j=i+1;j<items.length;j++)
			{
				if(typeof items[j].item_count=='undefined')
				{
					items[j].item_count=1;			
				}
				
				if(items[i].bill_id==items[j].bill_id)
				{
					items[i].item_count+=1;
					items[j].item_count+=1;
				}
			}
		}
		
		for(var i=0;i<items.length;i++)
		{
			if(items[i].item_count>1)
			{
				items.splice(i,1);
				i--;
			}
		}		
		
		for(var i=0;i<items.length;i++)
		{
			var data_object_array=[];
			
			if(items[i].picked_quantity=='null' || items[i].picked_quantity=='' || isNaN(items[i].picked_quantity))
			{
				items[i].picked_quantity=0;
			}
			var data_object=new Object();
			data_object.id=items[i].id;
			data_object.quantity=items[i].quantity;
			data_object.picked=items[i].picked_quantity;
			data_object_array.push(data_object);
			
			for(var j=i+1;j<items.length;j++)
			{
				if(items[j].picked_quantity=='null' || items[j].picked_quantity=='' || isNaN(items[j].picked_quantity))
					items[j].picked_quantity=0;

				if(items[i].item_name==items[j].item_name && items[i].batch==items[j].batch && items[i].storage==items[j].storage && items[i].table_type==items[j].table_type)
				{
					items[i].quantity=parseFloat(items[i].quantity)+parseFloat(items[j].quantity);
					items[i].picked_quantity=parseFloat(items[i].picked_quantity)+parseFloat(items[j].picked_quantity);
					
					var data_object=new Object();
					data_object.id=items[j].id;
					data_object.quantity=items[j].quantity;
					data_object.picked=items[j].picked_quantity;
					data_object_array.push(data_object);

					items.splice(j,1);
					j--;
				}
			}
			items[i].id=JSON.stringify(data_object_array);
		}

		items.forEach(function(item)
		{
			var rowsHTML="<tr>";
			rowsHTML+="<form id='row_report63_"+item.id+"'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' readonly='readonly' form='row_report63_"+item.id+"' value='"+item.item_name+"'>";
				rowsHTML+="<br><textarea readonly='readonly' form='row_report63_"+item.id+"'>"+item.item_desc+"</textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' readonly='readonly' form='row_report63_"+item.id+"' value='"+item.batch+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="To Pick: <input type='number' readonly='readonly' form='row_report63_"+item.id+"' value='"+item.quantity+"'>";
				rowsHTML+="<br>Picked: <input readonly='readonly' type='number' form='row_report63_"+item.id+"' value='"+item.picked_quantity+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Storage'>";
				rowsHTML+="<input type='text' readonly='readonly' style='width:150px;' required form='row_report63_"+item.id+"' value='"+item.storage+"'>";
				rowsHTML+="<img src='./images/edit.png' class='edit_icon' title='Edit Location' id='report63_edit_location_"+item.id+"'>";
				if(item.storage=='')
					rowsHTML+="<img src='./images/refresh.png' class='refresh_icon' title='Refresh Location Calculation' id='report63_refresh_location_"+item.id+"'>";
				rowsHTML+="<input type='hidden' form='row_report63_"+item.id+"' value='"+item.id+"'>";
				rowsHTML+="<input type='hidden' form='row_report63_"+item.id+"' value='"+item.table_type+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='row_report63_"+item.id+"'>";
				rowsHTML+="<input type='hidden' form='row_report63_"+item.id+"' value='"+item.storage+"'>";
				rowsHTML+="<input type='hidden' form='row_report63_"+item.id+"' value='"+item.picked_quantity+"'>";									
				rowsHTML+="<input type='hidden' form='row_report63_"+item.id+"' value='"+item.id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
					
			$('#report63_body').append(rowsHTML);
			var report63_form=document.getElementById('row_report63_'+item.id);
			var storage_filter=report63_form.elements[5];
			
			var storage_data="<store_areas>"+
							"<name></name>"+
							//"<area_type exact='yes'>"+get_session_var('storage_level')+"</area_type>"+
							"<area_type></area_type>"+
							"</store_areas>";
			set_my_value_list(storage_data,storage_filter);
				
			$(storage_filter).on('click',function()
			{
				this.select();
			});
			
			var edit_button=document.getElementById("report63_edit_location_"+item.id);
			$(edit_button).on('click',function ()
			{
				storage_filter.removeAttribute('readonly');
			});

			var refresh_button=document.getElementById("report63_refresh_location_"+item.id);
			$(refresh_button).on('click',function ()
			{
				var storage_xml="<area_utilization>"+
								"<name></name>"+
								"<item_name exact='yes'>"+item.item_name+"</item_name>"+
								"<batch exact='yes'>"+item.batch+"</batch>"+
								"</area_utilization>";											
				get_single_column_data(function (storages) 
				{										
					var storage_result_array=[];
					get_available_storage(item.item_name,item.batch,storages,item.quantity,storage_result_array,function () 
					{
						if(storage_result_array.length>0)
						{
							storage_filter.value=storage_result_array[0].storage;
							report63_update(report63_form);
						}
					});
				},storage_xml);
			});

			$(report63_form).on('submit',function (event) 
			{
				event.preventDefault();
				report63_update(report63_form);
			});
		});
		$('textarea').autosize();
		hide_loader();
	});

	var print_button=form.elements['print'];
	print_tabular_report('report63','Item Picklist',print_button);
};

	</script>
</div>