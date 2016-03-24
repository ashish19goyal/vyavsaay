<div id='report105' class='tab-pane'>
	<form id='report105_header' autocomplete="off">
		<fieldset>
			<label>Upto Date<br><input type='text' required name='end'></label>
			<label>	
				<input type='submit' value='Refresh' name='refresh' class='generic_icon'>
				<input type='button' title='Print' name='print' class='print_icon'>
				<input type='button' title='Download CSV' class='csv_icon' name='csv'>			
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>AWB #</th>
				<th>Product</th>
				<th>Import Date</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody id='report105_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='report105_prev' class='prev_icon' data-index='-25' onclick="$('#report105_index').attr('data-index',$(this).attr('data-index')); report105_ini();">
		<div style='display:hidden;' id='report105_index' data-index='0'></div>
		<img src='./images/next.png' id='report105_next' class='next_icon' data-index='25' onclick="$('#report105_index').attr('data-index',$(this).attr('data-index')); report105_ini();">
	</div>
	
	<script>

function report105_header_ini()
{	
	var form=document.getElementById('report105_header');
	var end_filter=form.elements['end'];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report105_ini();
	});
	
	$(end_filter).datepicker();
	end_filter.value=get_my_date();
}

function report105_ini()
{
	var form=document.getElementById('report105_header');
	var end_filter=get_raw_time(form.elements['end'].value)+86399999;
	
	show_loader();
	$('#report105_body').html('');	
	
	////indexing///
	var index_element=document.getElementById('report105_index');
	var prev_element=document.getElementById('report105_prev');
	var next_element=document.getElementById('report105_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	if_data_read_access('store_areas',function(accessible_data)
	{
		//console.log(accessible_data);
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

		var columns=new Object();
		columns.count=25;
		columns.start_index=start_index;
		columns.data_store='logistics_orders';		
		
		columns.indexes=[{index:'id'},
						{index:'awb_num'},
						{index:'import_date',upperbound:end_filter},
						{index:'drs_time'},
						{index:'order_num'},
						{index:'weight'},
						{index:'pieces'},
						{index:'status',array:['received','pending','undelivered']},
						{index:'manifest_id'},
						{index:'channel_name'},
						{index:'manifest_type'},
						{index:'merchant_name'},
						{index:'phone'},
						{index:'sku'},
						{index:'delivery_person'},
						{index:'collectable_value'},
						{index:'ship_to'},
						{index:'address1'},
						{index:'address2'},
						{index:'address3'},
						{index:'city'},
						{index:'return_address1'},
						{index:'return_address2'},
						{index:'return_address3'},
						{index:'drs_num'},
						branch_object];		
		//console.log(columns);
		read_json_rows('report105',columns,function(items)
		{
			//console.log(items);
			var rowsHTML="";
			items.forEach(function(item)
			{
				rowsHTML+="<tr>";
				rowsHTML+="<form id='report105_"+item.id+"'></form>";
				rowsHTML+="<td data-th='AWB #' style='text-decoration:underline;cursor:pointer;' onclick=\"element_display('"+item.id+"','form198')\">";
					rowsHTML+=item.awb_num;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Product'>";
					rowsHTML+=item.sku;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Date'>";
					rowsHTML+=get_my_past_date(item.import_date);
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Status'>";
					rowsHTML+=item.status;
				rowsHTML+="</td>";
				rowsHTML+="</tr>";
						
			});
			$('#report105_body').append(rowsHTML);
			
			////indexing///
			var next_index=parseInt(start_index)+25;
			var prev_index=parseInt(start_index)-25;
			next_element.setAttribute('data-index',next_index);
			prev_element.setAttribute('data-index',prev_index);
			index_element.setAttribute('data-index','0');
			if(items.length<25)
			{
				$(next_element).hide();
			}
			else
			{
				$(next_element).show();
			}
			if(prev_index<0)
			{
				$(prev_element).hide();
			}
			else
			{
				$(prev_element).show();
			}
	
			/////////////
			var csv_button=form.elements['csv'];
			$(csv_button).off("click");
			$(csv_button).on("click", function(event)
			{
				columns.count=0;
				columns.start_index=0;
				
				get_export_data_restructured(columns,'Order Detail Report',function(new_results)
				{
					var sorted_array=[];
					new_results.forEach(function(new_result)
					{
						var sorted_element=new Object();
						sorted_element['AWB No']=new_result.awb_num;
						sorted_element['Order Id']=new_result.order_num;
						sorted_element['Import Date']=get_my_past_date(new_result.import_date);
						sorted_element['Channel']=new_result.channel_name;
						sorted_element['Status']=new_result.status;
						sorted_element['Wt']=new_result.weight;
						sorted_element['Pcs']=new_result.pieces;
						sorted_element['COD Amount']=new_result.collectable_value;
						sorted_element['Delivery Boy']=new_result.delivery_person;
						sorted_element['AWB Type']=new_result.manifest_type;
						sorted_element['Customer Name']=new_result.merchant_name;
						sorted_element['Customer Address']=new_result.return_address1+", "+new_result.return_address2+", "+new_result.return_address3;
						sorted_element['Consignee Name']=new_result.ship_to;
						sorted_element['Consignee Address']=new_result.address1+", "+new_result.address2+", "+new_result.address3+", "+new_result.city;
						sorted_element['Mobile No']=new_result.phone;
						sorted_element['Product Name']=new_result.sku;
												
						sorted_array.push(sorted_element);
					});
					return sorted_array;
				});
			});
			hide_loader();
		});
	});	
	var print_button=form.elements['print'];
	print_tabular_report('report105','Orders',print_button);
};
	
	</script>
</div>