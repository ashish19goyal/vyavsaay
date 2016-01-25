<div id='report1' class='tab-pane'>
	<form id='report1_header' autocomplete="off">
		<fieldset>
			<label>Date Since</br><input type='text' required title='Date since the changes are to be evaluated'></label>
			<label>Product</br><input type='text' title='If product is not specified, all applicable products will be shown'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Product</th>
				<th>Batch</th>
				<th>Store Area</th>
				<th>Type</th>
				<th>Detail</th>
			</tr>
		</thead>
		<tbody id='report1_body'>
		</tbody>
	</table>
	
	<script>
		function report1_header_ini()
{	
	var form=document.getElementById('report1_header');
	var date_since=form.elements[1];
	var product_filter=form.elements[2];
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	set_my_filter(product_data,product_filter);

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report1_ini();
	});
	
	$(date_since).datepicker();
	$(date_since).val(get_my_date());
}
	
	function report1_ini()
{
	var form=document.getElementById('report1_header');
	var date_since=form.elements[1].value;
	var product_filter=form.elements[2].value;

	show_loader();
	$('#report1_body').html('');
	var report_count=2;
	/////appending new arrivals details
	var product_data="<supplier_bill_items>" +
			"<product_name>"+product_filter+"</product_name>" +
			"<last_updated lowerbound='yes'>"+get_raw_time(date_since)+"</last_updated>" +
			"</supplier_bill_items>";
	
	get_single_column_data(function(products)
	{
		report_count-=1;
		report_count+=products.length;
		
		products.forEach(function(product)
		{
			var bill_id_data="<supplier_bill_items>" +
					"<product_name exact='yes'>"+product+"</product_name>" +
					"<bill_id></bill_id>" +
					"<batch></batch>" +
					"</supplier_bill_items>";
			
			fetch_requested_data('report1',bill_id_data,function(bill_ids)
			{
				var sup_bill_id_array="--";
				for(var j in bill_ids)
				{
					sup_bill_id_array+=bill_ids[j].sup_bill_id+"--";
				}
				
				var sup_bill_data="<supplier_bills count='1'>" +
						"<bill_id array='yes'>"+sup_bill_id_array+"</bill_id>" +
						"<entry_date upperbound='yes'>"+get_raw_time(date_since)+"</entry_date>" +
						"</supplier_bills>";
			
				fetch_requested_data('report1',sup_bill_data,function(bill_entries)
				{
					if(bill_entries.length==0)
					{
						var store_data="<area_utilization>" +
								"<name></name>" +
								"<item_name exact='yes'>"+product+"</item_name>" +
								"<batch></batch>" +
								"</area_utilization>";
						
						fetch_requested_data('report1',store_data,function(areas)
						{
							var areas_string="";
							for(var x in areas)
							{
								areas_string+=areas[x].name+", ";
							}
							areas_string=areas_string.substr(0,(areas_string.length-2));

							var rowsHTML="<tr>";
								rowsHTML+="<td data-th='Product'>";
									rowsHTML+=bill_ids[j].product_name;
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Batch'>";
									rowsHTML+=bill_ids[j].batch;
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Store Area'>";
									rowsHTML+=areas_string;
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Type'>";
									rowsHTML+="New Arrival";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Detail'>";
									rowsHTML+="New product";
								rowsHTML+="</td>";
							rowsHTML+="</tr>";						

							$('#report1_body').append(rowsHTML);
							report_count-=1;
						});
					}
				});
			});
		});
	},product_data);
	
/////appending offer details
	var offer_data="<offers>" +
			"<product_name>"+product_filter+"</product_name>" +
			"<batch></batch>" +
			"<offer_detail></offer_detail>" +
			"<status></status>" +
			"<last_updated lowerbound='yes'>"+get_raw_time(date_since)+"</last_updated>" +
			"</offers>";
	
	fetch_requested_data('report1',offer_data,function(offers)
	{
		report_count-=1;
		report_count+=offers.length;
		offers.forEach(function(offer)
		{
			var store_data="<area_utilization>" +
					"<name></name>" +
					"<item_name exact='yes'>"+offer.product_name+"</item_name>" +
					"<batch>"+offer.batch+"</batch>" +
					"</area_utilization>";
			
			fetch_requested_data('report1',store_data,function(areas)
			{
				var areas_string="";
				for(var x in areas)
				{
					areas_string+=areas[x].name+", ";
				}
				areas_string=areas_string.substr(0,(areas_string.length-2));
				var rowsHTML="<tr>";
					rowsHTML+="<td data-th='Product'>";
						rowsHTML+=offer.product_name;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+=offer.batch;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Store Area'>";
						rowsHTML+=areas_string;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+='Updated Offer';
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Detail'>";
						rowsHTML+=offer.offer_detail;
					rowsHTML+="</td>";
				rowsHTML+="</tr>";
				
				$('#report1_body').append(rowsHTML);
				report_count-=1;
			});
		});
	});
	
	var report_complete=setInterval(function()
	{
	   if(report_count===0)
	   {
		   clearInterval(report_complete);
		   hide_loader();
	   }
	},1000);
	
	var print_button=form.elements[4];
	print_tabular_report('report1','Signage Changes',print_button);

};

	</script>
</div>