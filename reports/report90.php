<div id='report90' class='tab-pane'>
	<form id='report90_header' autocomplete="off">
		<fieldset>
			<!--<label style='background-color:#555;color:#fff;padding:5px;'>Pending Quantity<br><input type='number' step='any' style='font-weight:bold;' readonly='readonly' name='pending_count'></label>-->
			<!--<label>Channel<br><input type='text' name='channel'></label>-->
			<label>Order #<br><input type='text' name='order'></label>
			<label>Invoice #<br><input type='text' name='bill'></label>
			<label><input type='submit' name='refresh' value='Refresh' class='generic_icon'></label>
			<label><input type='button' name='print' title='Print visible data' class='print_icon'></label>
			<label><input type='button' title='Download Visible Data' class='csv_icon' name='csv'></label>
			<label><input type='button' title='Download All Data' class='csv_red_icon' name='all_csv'></label>
			</label>
			<br>
			<label style='background-color:#B93C42;color:#fff;padding:3px;'>Scan Rack<br><input type='text' style='color:#000;' name='rack'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead id='report90_head'>
			<tr>
				<th style='width:40px;'>
					<input type='checkbox' id='report90_select_all'>
				</th>
				<th>Order</th>
				<th>Item</th>
				<th>Batch</th>
				<th>Quantity</th>
				<th style='width:160px;'>Storage</th>
				<th><div class='report_result_count_selected'>20</div><div class='report_result_count'>50</div><div class='report_result_count'>100</div>
					<input type='button' class='generic_icon' title='Close Selected Pickings' value='Close All' id='report90_close_all_picks'>
				</th>
			</tr>
		</thead>
		<tbody id='report90_body'>
		</tbody>
	</table>

	<div class='form_nav'>
		<img src='./images/previous.png' id='report90_prev' class='prev_icon' data-index='-25' onclick="$('#report90_index').attr('data-index',$(this).attr('data-index')); report90_ini();">
		<div style='display:hidden;' id='report90_index' data-index='0'></div>
		<img src='./images/next.png' id='report90_next' class='next_icon' data-index='25' onclick="$('#report90_index').attr('data-index',$(this).attr('data-index')); report90_ini();">
	</div>

	<script>

function report90_header_ini()
{
	var form=document.getElementById('report90_header');
	//var channel_filter=form.elements['channel'];
	var order_filter=form.elements['order'];
	var bill_filter=form.elements['bill'];

	var rack_filter=form.elements['rack'];

	$('.report_result_count_selected').off('click');
	$('.report_result_count').off('click');
	$('.report_result_count').add('.report_result_count_selected').on('click',function ()
	{
		//console.log('something');
		$('.report_result_count_selected').attr('class','report_result_count');
		$(this).attr('class','report_result_count_selected');
	});

	var close_all_picks=document.getElementById('report90_close_all_picks');
	$(close_all_picks).off('click');
	$(close_all_picks).on('click',function ()
	{
		$("[id^='row_report90_']").each(function(index)
		{
			var subform=$(this)[0];
			if(subform.elements[0].checked && subform.elements[6].value!="")
			{
				report90_close_item(subform);
				//$(subform.elements[7]).trigger('click');
			}
		});
	});

	var select_all_check=document.getElementById('report90_select_all');
	$(select_all_check).off('change');
	$(select_all_check).on('change',function ()
	{
		//console.log('changed');
		if(select_all_check.checked)
		{
			$('.report90_select_box').each(function()
			{
				$(this)[0].checked=true;
			});
		}
		else
		{
			$('.report90_select_box').each(function()
			{
				$(this)[0].checked=false;
			});
		}
	});

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report90_ini();
	});

	$(rack_filter).off('click');
	$(rack_filter).on('click',function()
	{
		this.select();
	});

	var channel_data="<sale_channels>"+
		"<name></name>"+
		"</sale_channels>";
	//set_my_filter(channel_data,channel_filter);

	var order_data="<sale_orders>"+
		"<order_num></order_num>"+
		"</sale_orders>";
	set_my_filter(order_data,order_filter);

	var bill_data="<bills>"+
		"<bill_num></bill_num>"+
		"<status></status>"+
		"</bills>";
	set_my_filter(bill_data,bill_filter);

	$(rack_filter).off('keydown');
	$(rack_filter).on('keydown',function (event)
	{
		if(event.keyCode==13)
		{
			event.preventDefault();
			modal150_action(rack_filter.value,'report90');
		}
	});
}

function report90_ini()
{
	var form=document.getElementById('report90_header');
	//var channel=form.elements['channel'].value;
	var order_num=form.elements['order'].value;
	var invoice_num=form.elements['bill'].value;
	$('#report90_body').html('');

	var report_result_count=parseFloat($('.report_result_count_selected').html());
	//console.log(report_result_count);
	show_loader();

	var report90_count=0;

	////indexing///
	var index_element=document.getElementById('report90_index');
	var prev_element=document.getElementById('report90_prev');
	var next_element=document.getElementById('report90_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	console.log(start_index);
	///////////////when channel or order number is specified///////////////////////////////////////////
	if(order_num!="" || invoice_num!="")
	{
		$(next_element).hide();
		$(prev_element).hide();

		var bills_data="<sale_orders count='1'>"+
						"<id></id>"+
						"<bill_id>"+invoice_num+"</bill_id>"+
						"<order_num>"+order_num+"</order_num>"+
						"<order_date></order_date>"+
						"<import_date></import_date>"+
						"<billing_type></billing_type>"+
						"<channel></channel>"+
						"</sale_orders>";
		fetch_requested_data('',bills_data,function(bills)
		{
			if(bills.length>0)
			{
				var bill_id_object=vUtil.jsonParse(bills[0].bill_id);
				var bill_id_string="--";
				for(var a in bill_id_object)
				{
					bill_id_string=bill_id_object[a].bill_id+"--";
				}
				var items_data="<bill_items>" +
						"<id></id>"+
						"<item_name></item_name>" +
						"<item_desc></item_desc>"+
						"<batch></batch>" +
						"<quantity></quantity>"+
						"<picked_quantity></picked_quantity>"+
						"<storage></storage>"+
						"<picked_status exact='yes'>pending</picked_status>"+
						"<bill_id array='yes'>"+bill_id_string+"</bill_id>"+
						"</bill_items>";

				fetch_requested_data('report90',items_data,function(items)
				{
					var inventory_xml="<inventory_adjust>" +
								"<id></id>" +
								"<batch></batch>" +
								"<product_name></product_name>" +
								"<item_desc></item_desc>" +
								"<quantity></quantity>"+
								"<picked_quantity></picked_quantity>"+
								"<storage></storage>"+
								"<source_id exact='yes'>"+bills[0].id+"</source_id>"+
								"<source exact='yes'>picking</source>"+
								"<picked_status exact='yes'>pending</picked_status>"+
								"</inventory_adjust>";

					fetch_requested_data('report90',inventory_xml,function(adjust_results)
					{
						items.forEach(function(item)
						{
							item.table_type='bill_items';
						});

						for(var z in adjust_results)
						{
							var adjust_item=new Object();
							adjust_item.item_name=adjust_results[z].product_name;
							adjust_item.item_desc=adjust_results[z].item_desc;
							adjust_item.batch=adjust_results[z].batch;
							adjust_item.quantity=-(parseFloat(adjust_results[z].quantity));
							adjust_item.storage=adjust_results[z].storage;
							adjust_item.id=adjust_results[z].id;
							adjust_item.table_type='inventory_adjust';
							adjust_item.picked_quantity=-(parseFloat(adjust_results[z].picked_quantity));
							adjust_item.bill_id=adjust_results[z].source_id;
							items.push(adjust_item);
						}

						items.forEach(function(item)
						{
							var picked_quantity=item.picked_quantity;
							if(item.picked_quantity=='null' || item.picked_quantity=='' || isNaN(item.picked_quantity))
							{
								picked_quantity=0;
							}
							item.picked_quantity=picked_quantity;

							report_result_count-=1;
							item.order_num=bills[0].order_num;
							item.bill_num=bills[0].bill_num;

							var rowsHTML="<tr>";
								rowsHTML+="<form id='row_report90_"+item.id+"'></form>";
								rowsHTML+="<td data-th='Select'>";
									rowsHTML+="<input type='checkbox' class='report90_select_box' form='row_report90_"+item.id+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Order' id='report90_order_"+item.id+"'>";
									rowsHTML+=bills[0].channel+" Order #: "+bills[0].order_num+"<br>Order Date: "+get_my_past_date(bills[0].order_date);
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Item'>";
									rowsHTML+="<input type='text' readonly='readonly' form='row_report90_"+item.id+"' value='"+item.item_name+"'>";
									rowsHTML+="<br><textarea readonly='readonly' form='row_report90_"+item.id+"'>"+item.item_desc+"</textarea>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Batch'>";
									rowsHTML+="<input type='text' readonly='readonly' form='row_report90_"+item.id+"' value='"+item.batch+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Quantity'>";
									rowsHTML+="To Pick: <input type='number' readonly='readonly' form='row_report90_"+item.id+"' value='"+item.quantity+"'>";
									rowsHTML+="<br>Picked: <input readonly='readonly' type='number' form='row_report90_"+item.id+"' value='"+picked_quantity+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Storage'>";
									rowsHTML+="<input type='text' readonly='readonly' style='width:150px;' form='row_report90_"+item.id+"' value='"+item.storage+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Action'>";
									rowsHTML+="<img src='./images/edit.png' class='edit_icon' title='Edit Location' id='report90_edit_location_"+item.id+"'>";
									if(item.quantity!=picked_quantity)
										rowsHTML+="<img src='./images/refresh.png' class='refresh_icon' title='Refresh Location Calculation' id='report90_refresh_location_"+item.id+"'>";
									rowsHTML+="<br><input type='button' class='generic_icon' value='Close' form='row_report90_"+item.id+"' onclick=\"modal162_action($(this));\">";
									rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' value='"+item.id+"'>";
									rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' value='"+item.table_type+"'>";
									rowsHTML+="<input type='submit' class='submit_hidden' form='row_report90_"+item.id+"'>";
									rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' name='order_num' value='"+bills[0].order_num+"'>";
									rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' name='bill_id' value='"+item.bill_id+"'>";
									rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' name='old_storage' value='"+item.storage+"'>";
									rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' name='old_picked' value='"+picked_quantity+"'>";
									rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' name='old_id' value='"+item.id+"'>";
								rowsHTML+="</td>";
							rowsHTML+="</tr>";

							$('#report90_body').append(rowsHTML);


							var report90_form=document.getElementById('row_report90_'+item.id);
							var storage_filter=report90_form.elements[6];

							var edit_button=document.getElementById("report90_edit_location_"+item.id);
							$(edit_button).on('click',function ()
							{
								storage_filter.removeAttribute('readonly');
							});

							var refresh_button=document.getElementById("report90_refresh_location_"+item.id);
							$(refresh_button).on('click',function ()
							{
								show_loader();
								var storage_xml="<area_utilization>"+
												"<name></name>"+
												"<item_name exact='yes'>"+item.item_name+"</item_name>"+
												"<batch exact='yes'>"+item.batch+"</batch>"+
												"</area_utilization>";
								get_single_column_data(function (storages)
								{
									//console.log(storages);
									var dup_storages=[];
									for(var i in storages)
									{
										var dup_storage=new Object();
										dup_storage.storage=storages[i];
										dup_storages.push(dup_storage);
									}
									//console.log(dup_storages);

									var storage_result_array=[];
									get_available_storage(item.item_name,item.batch,storages,item.quantity,storage_result_array,function ()
									{
										//console.log(storage_result_array);
										if(storage_result_array.length>0)
										{
											storage_result_array.sort(function(a,b)
											{
												if(parseInt(a.quantity)<parseInt(b.quantity))
												{	return 1;}
												else
												{	return -1;}
											});

											storage_filter.value=storage_result_array[0].storage;
											report90_update(report90_form);

											var storage_string="";
											storage_result_array.forEach(function(storage_result)
											{
												storage_string+=storage_result.storage+"\n";
											});
											refresh_button.setAttribute('title',storage_string);
										}
										else
										{
											//console.log(dup_storages);
											var storage_string="";
											dup_storages.forEach(function(storage_result)
											{
												storage_string+=storage_result.storage+"\n";
											});
											refresh_button.setAttribute('title',storage_string);
										}
										hide_loader();
									});
								},storage_xml);
							});

							$(report90_form).on('submit',function (event)
							{
								event.preventDefault();
								report90_update(report90_form);
							});

							var storage_data="<store_areas>"+
										"<name></name>"+
										"<area_type></area_type>"+
										"</store_areas>";
							set_my_value_list(storage_data,storage_filter);

							$(storage_filter).on('click',function()
							{
								this.select();
							});

						});

						var report90_complete=setInterval(function()
						{
					  	   if(report90_count===0)
					  	   {
								clearInterval(report90_complete);
								$('textarea').autosize();
								//report90_get_totals();

								var csv_button=form.elements['csv'];
								$(csv_button).off("click");
								$(csv_button).on("click", function(event)
								{
									var sorted_array=[];
									items.forEach(function(new_result)
									{
										var sorted_element=new Object();
										sorted_element['Channel']=bills[0].channel;
										sorted_element['Order #']=new_result.order_num;
										sorted_element['Order Date']=get_my_past_date(bills[0].order_date);
										sorted_element['Import Date']=get_my_datetime(bills[0].import_date);
										//sorted_element['Bill #']=new_result.bill_num;
										sorted_element['SKU']=new_result.item_name;
										sorted_element['Item Name']=new_result.item_desc;
										sorted_element['Batch']=new_result.batch;
										sorted_element['Storage']=new_result.storage;
										sorted_element['To Pick']=new_result.quantity;
										sorted_element['Picked']=new_result.picked_quantity;

										sorted_array.push(sorted_element);
									});
									vExport.csv_download({result:sorted_array,file:'Order Picklist - '+bills[0].order_num});
								});

								hide_loader();
					  	   }
						},500);

					});
				});
			}
		});
	}
	else
	{
		var items_data="<bill_items>" +
				"<id></id>"+
				"<item_name></item_name>" +
				"<item_desc></item_desc>"+
				"<batch></batch>" +
				"<quantity></quantity>"+
				"<picked_quantity></picked_quantity>"+
				"<storage></storage>"+
				"<picked_status exact='yes'>pending</picked_status>"+
				"<bill_id></bill_id>"+
				"</bill_items>";

		fetch_requested_data('report90',items_data,function(items)
		{
			var inventory_xml="<inventory_adjust>" +
						"<id></id>" +
						"<batch></batch>" +
						"<product_name></product_name>" +
						"<item_desc></item_desc>" +
						"<quantity></quantity>"+
						"<picked_quantity></picked_quantity>"+
						"<storage></storage>"+
						"<source_id></source_id>"+
						"<source exact='yes'>picking</source>"+
						"<picked_status exact='yes'>pending</picked_status>"+
						"</inventory_adjust>";

			fetch_requested_data('report90',inventory_xml,function(adjust_results)
			{
				items.forEach(function(item)
				{
					item.table_type='bill_items';
				});

				for(var z in adjust_results)
				{
					var adjust_item=new Object();
					adjust_item.item_name=adjust_results[z].product_name;
					adjust_item.item_desc=adjust_results[z].item_desc;
					adjust_item.batch=adjust_results[z].batch;
					adjust_item.quantity=-(parseFloat(adjust_results[z].quantity));
					adjust_item.storage=adjust_results[z].storage;
					adjust_item.id=adjust_results[z].id;
					adjust_item.table_type='inventory_adjust';
					adjust_item.picked_quantity=-(parseFloat(adjust_results[z].picked_quantity));
					adjust_item.bill_id=adjust_results[z].source_id;
					items.push(adjust_item);
				}

				var report90_count=0;

				items.splice(0,start_index);
				items.splice(report_result_count,items.length-report_result_count);

				items.forEach(function(item)
				{
					//report_result_count-=1;

					var picked_quantity=item.picked_quantity;
					if(item.picked_quantity=='null' || item.picked_quantity=='' || isNaN(item.picked_quantity))
					{
						picked_quantity=0;
					}
					item.picked_quantity=picked_quantity;

					var rowsHTML="<tr>";
						rowsHTML+="<form id='row_report90_"+item.id+"'></form>";
						rowsHTML+="<td data-th='Select'>";
							rowsHTML+="<input type='checkbox' class='report90_select_box' form='row_report90_"+item.id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Order' id='report90_order_"+item.id+"'>";

						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Item'>";
							rowsHTML+="<input type='text' readonly='readonly' form='row_report90_"+item.id+"' value='"+item.item_name+"'>";
							rowsHTML+="<br><textarea readonly='readonly' form='row_report90_"+item.id+"'>"+item.item_desc+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' readonly='readonly' form='row_report90_"+item.id+"' value='"+item.batch+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="To Pick: <input type='number' readonly='readonly' form='row_report90_"+item.id+"' value='"+item.quantity+"'>";
							rowsHTML+="<br>Picked: <input readonly='readonly' type='number' form='row_report90_"+item.id+"' value='"+picked_quantity+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Storage'>";
							rowsHTML+="<input type='text' readonly='readonly' style='width:150px;' form='row_report90_"+item.id+"' value='"+item.storage+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<img src='./images/edit.png' class='edit_icon' title='Edit Location' id='report90_edit_location_"+item.id+"'>";
							if(item.quantity!=picked_quantity)
								rowsHTML+="<img src='./images/refresh.png' class='refresh_icon' title='Refresh Location Calculation' id='report90_refresh_location_"+item.id+"'>";
							rowsHTML+="<br><input type='button' class='generic_icon' value='Close' form='row_report90_"+item.id+"' onclick=\"modal162_action($(this));\">";
							rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' value='"+item.id+"'>";
							rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' value='"+item.table_type+"'>";
							rowsHTML+="<input type='submit' class='submit_hidden' form='row_report90_"+item.id+"'>";
							rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' name='order_num'>";
							rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' name='bill_id' value='"+item.bill_id+"'>";
							rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' name='old_storage' value='"+item.storage+"'>";
							rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' name='old_picked' value='"+picked_quantity+"'>";
							rowsHTML+="<input type='hidden' form='row_report90_"+item.id+"' name='old_id' value='"+item.id+"'>";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#report90_body').append(rowsHTML);

					var report90_form=document.getElementById('row_report90_'+item.id);
					var storage_filter=report90_form.elements[6];

					var edit_button=document.getElementById("report90_edit_location_"+item.id);
					$(edit_button).on('click',function ()
					{
						storage_filter.removeAttribute('readonly');
					});

					var refresh_button=document.getElementById("report90_refresh_location_"+item.id);
					$(refresh_button).on('click',function ()
					{
						show_loader();
						var storage_xml="<area_utilization>"+
										"<name></name>"+
										"<item_name exact='yes'>"+item.item_name+"</item_name>"+
										"<batch exact='yes'>"+item.batch+"</batch>"+
										"</area_utilization>";
						get_single_column_data(function (storages)
						{
							//console.log(storages);
							var dup_storages=[];
							for(var i in storages)
							{
								var dup_storage=new Object();
								dup_storage.storage=storages[i];
								dup_storages.push(dup_storage);
							}
							//console.log(dup_storages);

							var storage_result_array=[];
							get_available_storage(item.item_name,item.batch,storages,item.quantity,storage_result_array,function ()
							{
								//console.log(storage_result_array);
								if(storage_result_array.length>0)
								{
									storage_result_array.sort(function(a,b)
									{
										if(parseInt(a.quantity)<parseInt(b.quantity))
										{	return 1;}
										else
										{	return -1;}
									});

									storage_filter.value=storage_result_array[0].storage;
									report90_update(report90_form);

									var storage_string="";
									storage_result_array.forEach(function(storage_result)
									{
										storage_string+=storage_result.storage+"\n";
									});
									refresh_button.setAttribute('title',storage_string);
								}
								else
								{
									//console.log(dup_storages);
									var storage_string="";
									dup_storages.forEach(function(storage_result)
									{
										storage_string+=storage_result.storage+"\n";
									});
									refresh_button.setAttribute('title',storage_string);
								}
								hide_loader();
							});
						},storage_xml);
					});

					$(report90_form).on('submit',function (event)
					{
						event.preventDefault();
						report90_update(report90_form);
					});

					var storage_data="<store_areas>"+
								"<name></name>"+
								"<area_type></area_type>"+
								"</store_areas>";
					set_my_value_list(storage_data,storage_filter);

					$(storage_filter).on('click',function()
					{
						this.select();
					});

					var bills_data="<sale_orders count='1'>"+
						"<bill_id>"+item.bill_id+"</bill_id>"+
						"<order_num></order_num>"+
						"<order_date></order_date>"+
						"<import_date></import_date>"+
						"<channel></channel>"+
						"</sale_orders>";

					fetch_requested_data('',bills_data,function(bills)
					{
						if(bills.length>0)
						{
							report90_form.elements['order_num'].value=bills[0].order_num;
							item.order_num=bills[0].order_num;
							item.order_date=get_my_past_date(bills[0].order_date);
							item.import_date=get_my_datetime(bills[0].import_date);
							item.channel=bills[0].channel;

							//item.bill_num=bills[0].bill_num;
							var order_num_td=document.getElementById("report90_order_"+item.id);
							$(order_num_td).html(bills[0].channel+" Order #: "+bills[0].order_num+"<br>Order Date: "+item.order_date);
						}
					});
				});

				var report90_complete=setInterval(function()
				{
			  	   if(report90_count===0)
			  	   {
						clearInterval(report90_complete);
						$('textarea').autosize();
						//report90_get_totals();

						var csv_button=form.elements['csv'];
						$(csv_button).off("click");
						$(csv_button).on("click", function(event)
						{
							var sorted_array=[];
							items.forEach(function(new_result)
							{
								var sorted_element=new Object();
								sorted_element['Channel']=new_result.channel;
								sorted_element['Order #']=new_result.order_num;
								sorted_element['Order Date']=new_result.order_date;
								sorted_element['Import Date']=new_result.import_date;
								//sorted_element['Bill #']=new_result.bill_num;
								sorted_element['SKU']=new_result.item_name;
								sorted_element['Item Name']=new_result.item_desc;
								sorted_element['Batch']=new_result.batch;
								sorted_element['Storage']=new_result.storage;
								sorted_element['To Pick']=new_result.quantity;
								sorted_element['Picked']=new_result.picked_quantity;

								sorted_array.push(sorted_element);
							});
							vExport.csv_download({result:sorted_array,file:'Order Picklist'});
						});


						////indexing///
						var next_index=parseInt(start_index)+parseFloat($('.report_result_count_selected').html());
						var prev_index=parseInt(start_index)-parseFloat($('.report_result_count_selected').html());
						next_element.setAttribute('data-index',next_index);
						prev_element.setAttribute('data-index',prev_index);
						index_element.setAttribute('data-index','0');
						if(items.length<report_result_count)
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

						hide_loader();
			  	   }
				},500);
			});
		});
	}

	var all_csv_button=form.elements['all_csv'];
	$(all_csv_button).off("click");
	$(all_csv_button).on("click", function(event)
	{
		show_loader();
		var items_data="<bill_items>" +
				"<id></id>"+
				"<item_name></item_name>" +
				"<item_desc></item_desc>"+
				"<batch></batch>" +
				"<quantity></quantity>"+
				"<picked_quantity></picked_quantity>"+
				"<storage></storage>"+
				"<picked_status exact='yes'>pending</picked_status>"+
				"<bill_id></bill_id>"+
				"</bill_items>";

		fetch_requested_data('report90',items_data,function(items)
		{
			var inventory_xml="<inventory_adjust>" +
						"<id></id>" +
						"<batch></batch>" +
						"<product_name></product_name>" +
						"<item_desc></item_desc>" +
						"<quantity></quantity>"+
						"<picked_quantity></picked_quantity>"+
						"<storage></storage>"+
						"<source_id></source_id>"+
						"<source exact='yes'>picking</source>"+
						"<picked_status exact='yes'>pending</picked_status>"+
						"</inventory_adjust>";

			fetch_requested_data('report90',inventory_xml,function(adjust_results)
			{
				var sorted_array=[];

				items.forEach(function(new_result)
				{
					var sorted_element=new Object();
					sorted_element['SKU']=new_result.item_name;
					sorted_element['Item Name']=new_result.item_desc;
					sorted_element['Batch']=new_result.batch;
					sorted_element['Storage']=new_result.storage;
					sorted_element['To Pick']=new_result.quantity;
					sorted_element['Picked']=new_result.picked_quantity;
					sorted_element['Bill Id']=new_result.bill_id;
					sorted_array.push(sorted_element);
				});

				adjust_results.forEach(function(new_result)
				{
					var sorted_element=new Object();
					sorted_element['SKU']=new_result.product_name;
					sorted_element['Item Name']=new_result.item_desc;
					sorted_element['Batch']=new_result.batch;
					sorted_element['Storage']=new_result.storage;
					sorted_element['To Pick']=-parseFloat(new_result.quantity);
					sorted_element['Picked']=-parseFloat(new_result.picked_quantity);
					sorted_element['Bill Id']=new_result.source_id;
					sorted_array.push(sorted_element);
				});
				var report90_csv_count=sorted_array.length;

				sorted_array.forEach(function (item)
				{
					//console.log(item['Bill Id']);
					var orders_data="<sale_orders count='1'>"+
						"<bill_id>"+item['Bill Id']+"</bill_id>"+
						"<order_num></order_num>"+
						"<order_date></order_date>"+
						"<import_date></import_date>"+
						"<channel></channel>"+
						"</sale_orders>";
					fetch_requested_data('',orders_data,function(bills)
					{
						//console.log(bills);
						if(bills.length>0)
						{
							item['Channel']=bills[0].channel;
							item['Order #']=bills[0].order_num;
							item['Order Date']=get_my_datetime(bills[0].order_date);
							item['Import Date']=get_my_datetime(bills[0].import_date);
						}
						report90_csv_count-=1;
					});
				});

				var report90_complete=setInterval(function()
				{
					if(report90_csv_count===0)
					{
						clearInterval(report90_complete);
						hide_loader();
						vExport.csv_download({result:sorted_array,file:'Order Picklist'});
					}
				},500);
			});
		});
	});

	var print_button=form.elements['print'];
	print_report90('Order Picklist',print_button);
};

function print_report90(report_title,print_button)
{
	$(print_button).off('click');
	$(print_button).on('click',function(event)
	{
	   var container=document.createElement('div');
	   var business_title=document.createElement('div');
	   var title=document.createElement('div');
	   var bt=get_session_var('title');
	   business_title.innerHTML="<div style='text-align:center;display:block;width:100%;font-size:1.5em'><b>"+bt+"</b></div>";
	   title.innerHTML="<div style='display: block;width:100%;font-size:1.2em'><b>"+report_title+"</b></div>";
	   var table_element=document.getElementById("report90_body");


	   var font_size=get_session_var('print_size');

		var new_table=document.createElement('table');
		new_table.setAttribute('style','font-size:11px;border:1px solid #000;text-align:left;');
		new_table.setAttribute('class','printing_tables');

		var table_header="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;width:16%'>SKU</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:30%'>Item Name</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:16%'>Batch</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:16%'>Storage</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:10%'>To Pick</td>"+
				"<td style='border: 1px solid #000;text-align:left;width:10%'>Picked</td></tr>";

		var table_rows=table_header;
		var counter=0;

		$(table_element).find('form').each(function(index)
		{
			counter+=1;
			var form=$(this)[0];
			table_rows+="<tr>"+
				"<td style='border: 1px solid #000;text-align:left;'><div>"+form.elements[1].value+"</div></td>"+
				"<td style='border: 1px solid #000;text-align:left;'><div>"+form.elements[2].value+"</div></td>"+
				"<td style='border: 1px solid #000;text-align:left;'><div>"+form.elements[3].value+"</div></td>"+
				"<td style='border: 1px solid #000;text-align:left;'><div>"+form.elements[6].value+"</div></td>"+
				"<td style='border: 1px solid #000;text-align:left;'><div>"+form.elements[4].value+"</div></td>"+
				"<td style='border: 1px solid #000;text-align:left;'><div>"+form.elements[5].value+"</div></td></tr>";
		});
		new_table.innerHTML=table_rows;
		/////////////placing the containers //////////////////////////////////////////////////////


	   //$(table_copy).find('td,th').attr('style',"word-wrap: break-word;border:1px solid black;text-align:left;font-size:"+font_size+"em");
	   container.appendChild(business_title);
	   container.appendChild(title);
	   container.appendChild(new_table);
	   $.print(container);
	});
}

	</script>

</div>
