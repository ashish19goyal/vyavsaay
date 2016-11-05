<div id='report66' class='tab-pane'>
	<form id='report66_header' autocomplete="off">
		<fieldset>
			<label>Storage Type<br><input type='text' required></label>
			<label>Storage<br><input type='text' required></label>
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
				<th>Storage</th>
				<th>SKU</th>
				<th>Item Name</th>
				<th>Batch</th>
				<th>Quantity</th>
			</tr>
		</thead>
		<tbody id='report66_body'>
		</tbody>
	</table>

	<script>

function report66_header_ini()
{
	var form=document.getElementById('report66_header');
	var type_filter=form.elements[1];
	var storage_filter=form.elements[2];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report66_ini();
	});

	$(type_filter).off('blur');
	$(type_filter).on('blur',function ()
	{
		var storage_data="<store_areas>"+
				"<name></name>"+
				"<area_type exact='yes'>"+type_filter.value+"</area_type>"+
				"</store_areas>";
		set_my_filter(storage_data,storage_filter);
		storage_filter.value="";
	});

	var type_data="<storage_structure>"+
				"<name></name>"+
				"</storage_structure>";
	set_my_value_list(type_data,type_filter);
}

function report66_ini()
{
	var form=document.getElementById('report66_header');
	var type_filter=form.elements[1].value;
	var storage_filter=form.elements[2].value;

	show_loader();

	var total_calls=0;
	$('#report66_body').html('');

	var area_data="<store_areas count='1'>" +
			"<id></id>"+
			"<area_type exact='yes'>"+type_filter+"</area_type>" +
			"<name exact='yes'>"+storage_filter+"</name>"+
			"</store_areas>";
	total_calls+=1;
	fetch_requested_data('report66',area_data,function(areas)
	{
		//console.log(areas);
		total_calls-=1;
		areas.forEach(function(area)
		{
			var storage_array=[];
			storage_array.push(area.name);
			storage_count_tracker=0;
			get_all_child_storage(area.name,storage_array);

			total_calls+=1;

			var areas_complete=setInterval(function()
			{
				if(storage_count_tracker===0)
				{
					console.log(storage_array);
					clearInterval(areas_complete);

					total_calls-=1;
					var storage_string="--";
					for(var i in storage_array)
					{
						storage_string+=storage_array[i]+"--";
					}

					var item_data="<area_utilization>"+
								"<name array='yes'>"+storage_string+"</name>"+
								"<item_name></item_name>"+
								"<batch></batch>"+
								"</area_utilization>";
					total_calls+=1;
					fetch_requested_data('',item_data,function(items)
					{
						//console.log(items);
						total_calls-=1;
						for(var i=0;i<items.length;i++)
						{
							for(var j=i+1;j<items.length;j++)
							{
								if(items[i].item_name==items[j].item_name && items[i].batch==items[j].batch && items[i].name==items[j].name)
								{
									items.splice(j,1);
									j--;
								}
							}
						}

						items.forEach(function(item)
						{
							total_calls+=1;
							get_store_inventory(item.name,item.item_name,item.batch,function(quantity)
							{
								item.quantity=parseFloat(quantity);
								total_calls-=1;
							});

							total_calls+=1;
							var name_data="<product_master count='1'>"+
										"<description></description>"+
										"<name exact='yes'>"+item.item_name+"</name>"+
										"</product_master>";
							get_single_column_data(function(descriptions)
							{
								if(descriptions.length>0)
								{
									item.item_desc=descriptions[0];
								}
								total_calls-=1;
							},name_data);
						});

						var inventory_complete=setInterval(function()
						{
							if(total_calls===0)
							{
					  	   		clearInterval(inventory_complete);
								var rowsHTML="";
								items.forEach(function (item)
								{
									if(item.name!="")
									{
										rowsHTML+="<tr>";
										rowsHTML+="<td data-th='Storage'>";
											rowsHTML+=item.name;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='SKU'>";
											rowsHTML+=item.item_name;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Item Name'>";
											rowsHTML+=item.item_desc;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Batch'>";
											rowsHTML+=item.batch;
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Quantity'>";
											rowsHTML+=item.quantity;
										rowsHTML+="</td>";
										rowsHTML+="</tr>";
									}
								});
								$('#report66_body').html(rowsHTML);
								hide_loader();

								var csv_button=form.elements['csv'];
								$(csv_button).off("click");
								$(csv_button).on("click", function(event)
								{
									var new_products=[];
									items.forEach(function(product)
									{
										if(product.name!="")
										{
											var new_product=new Object();
											new_product.Storage=product.name;
											new_product.SKU=product.item_name;
											new_product['Item Name']=product.item_desc;
											new_product.Batch=product.batch;
											new_product.Quantity=product.quantity;
											new_products.push(new_product);
										}
									});
									vExport.csv_download({result:new_products,file:'Inventory Level By Store'});
								});
							}
					     },50);
					});
				}
			},50);
		});
	});

	var print_button=form.elements[4];
	print_tabular_report('report66','Inventory Level (by store)',print_button);
};

	</script>
</div>
