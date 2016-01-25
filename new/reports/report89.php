<div id='report89' class='tab-pane'>
	<form id='report89_header' autocomplete="off">
		<fieldset>
			<label>Delivery Person<br><input type='text' name='person'></label>
			<label>Start Date<br><input type='text' name='start' required></label>
			<label>End Date<br><input type='text' name='end' required></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
				<input type='button' title='Download CSV' class='csv_icon' name='csv'>			
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Person</th>
				<th>AWB #</th>
				<th>Order Date</th>
				<th>Delivery Date</th>
			</tr>
		</thead>
		<tbody id='report89_body'>
		</tbody>
	</table>
	
	<script>

function report89_header_ini()
{	
	var form=document.getElementById('report89_header');
	var person_filter=form.elements['person'];
	var start_filter=form.elements['start'];
	var end_filter=form.elements['end'];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report89_ini();
	});

	var person_data="<staff>"+
				"<acc_name></acc_name>"+
				"</staff>";
	set_my_filter(person_data,person_filter);
	
	$(start_filter).datepicker();
	$(end_filter).datepicker();
	start_filter.value=get_my_past_date(get_my_time()-7*86400000);
	end_filter.value=get_my_date();
}

function report89_ini()
{
	show_loader();
	var form=document.getElementById('report89_header');
	var person=form.elements['person'].value;
	var start_date=get_raw_time(form.elements['start'].value);
	var end_date=get_raw_time(form.elements['end'].value)+86399999;
	
	$('#report89_body').html('');
	
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
	
		var columns=new Object();
		columns.count=0;
		columns.start_index=0;
		columns.data_store='logistics_orders';		
		
		columns.indexes=[{index:'id'},
						{index:'awb_num'},
						{index:'import_date',lowerbound:start_date,upperbound:end_date},
						{index:'order_num'},
						{index:'status',exact:'delivered'},
						{index:'delivery_person',value:person},
						{index:'manifest_type'},
						{index:'merchant_name'},
						{index:'phone'},
						{index:'sku'},
						{index:'return_address1'},
						{index:'return_address2'},
						{index:'return_address3'},
						{index:'order_history'},
						{index:'drs_num'},
						branch_object];		
	
		read_json_rows('report89',columns,function(deliveries)
		{
			deliveries.forEach(function(result)
			{
				result.delivery_date="NA";
				if(result.order_history!=0 && result.order_history!="" && result.order_history!="null" && result.order_history!=null)
				{
					var order_history_object=JSON.parse(result.order_history);
					for(var i in order_history_object)
					{
						if(order_history_object[i].status=='delivered')
						{
							result.delivery_date=get_my_past_date(order_history_object[i].timeStamp);
							break;
						}
					}
				}
				
				var rowsHTML="<tr>";
					rowsHTML+="<td data-th='Person'>";
						rowsHTML+=result.delivery_person;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='AWB #'>";
						rowsHTML+=result.awb_num;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+=get_my_past_date(result.import_date);
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Delivery Date'>";
						rowsHTML+=result.delivery_date;
					rowsHTML+="</td>";
				rowsHTML+="</tr>";
			
	
				$('#report89_body').append(rowsHTML);			
			});
			
			var print_button=form.elements[5];
			print_tabular_report('report89','Deliveries by person',print_button);
			
			var csv_button=form.elements['csv'];
			$(csv_button).off("click");
			$(csv_button).on("click", function(event)
			{
				var sorted_array=[];
				deliveries.forEach(function(new_result)
				{
					var sorted_element=new Object();
					sorted_element['AWB No']=new_result.awb_num;
					sorted_element['Order Id']=new_result.order_num;
					sorted_element['status']=new_result.status;
					sorted_element['Manifest Import Date']=get_my_past_date(new_result.import_date);
					sorted_element['Delivery Boy']=new_result.delivery_person;
					sorted_element['AWB Type']=new_result.manifest_type;
					sorted_element['Merchant']=new_result.merchant_name;
					sorted_element['Merchant Address']=new_result.return_address1+", "+new_result.return_address2+", "+new_result.return_address3;
					sorted_element['Mobile No']=new_result.phone;
					sorted_element['Product Name']=new_result.sku;
					
					sorted_array.push(sorted_element);
				});
				csv_download_report(sorted_array,'Delivery Report');
			});
			
			hide_loader();
		});
	});
};
	
	</script>
</div>