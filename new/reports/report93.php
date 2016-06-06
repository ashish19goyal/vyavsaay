<div id='report93' class='tab-pane'>
	<form id='report93_header' autocomplete="off">
		<fieldset>
			<label>Brand<br><input type='text' name='brand'></label>
			<label>SKU<br><input type='text' name='sku'></label>
			<label>Item Name<br><input type='text' name='name'></label>
			<label>Batch<br><input type='text' name='batch'></label>
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
				<th>Brand</th>
				<th>SKU</th>
				<th>Batch</th>
				<th>Storage</th>
				<th>Quantity</th>
			</tr>
		</thead>
		<tbody id='report93_body'>
		</tbody>
	</table>

	<script>

function report93_header_ini()
{
	var form=document.getElementById('report93_header');
	var brand_filter=form.elements['brand'];
	var sku_filter=form.elements['sku'];
	var name_filter=form.elements['name'];
	var batch_filter=form.elements['batch'];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report93_ini();
	});

	var brand_data="<product_master>"+
				"<make></make>"+
				"</product_master>";
	set_my_value_list(brand_data,brand_filter);

	var sku_data="<product_master>"+
				"<name></name>"+
				"</product_master>";
	set_my_filter(sku_data,sku_filter);

	var name_data="<product_master>"+
				"<description></description>"+
				"</product_master>";
	set_my_filter(name_data,name_filter);

	var batch_data="<product_instances>"+
				"<batch></batch>"+
				"</product_instances>";
	set_my_filter(batch_data,batch_filter);

}

function report93_ini()
{
	show_loader();
	var form=document.getElementById('report93_header');
	var brand=form.elements['brand'].value;
	var sku=form.elements['sku'].value;
	var item_name=form.elements['name'].value;
	var batch=form.elements['batch'].value;

	$('#report93_body').html('');

	var master_data="<product_master>" +
			"<id></id>" +
			"<name>"+sku+"</name>" +
			"<description>"+item_name+"</description>"+
			"<make>"+brand+"</make>" +
			"</product_master>";
	var results=[];
	fetch_requested_data('report93',master_data,function(products)
	{
		products=vUtil.arrayUnique(products);
		//console.log(products);
		var sku_string="--";
		for(var i in products)
		{
			sku_string+=products[i].name+"--";
		}
		var product_instances_xml="<product_instances>"+
								"<product_name array='yes'>"+sku_string+"</product_name>"+
								"<batch>"+batch+"</batch>"+
								"<expiry></expiry>"+
								"<mrp></mrp>"+
								"</product_instances>";
		fetch_requested_data('report93',product_instances_xml,function(product_instances)
		{
			//product_instances=array_unique(product_instances);
			//console.log(product_instances);
			for(var l=0;l<product_instances.length;l++)
			{
				for(var m=l+1;m<product_instances.length;m++)
				{
					if(product_instances[m].product_name==product_instances[l].product_name && product_instances[m].batch==product_instances[l].batch)
					{
						product_instances.splice(m,1);
						m--;
					}
				}
			}
			var report93_count=product_instances.length;

			product_instances.forEach(function(product_instance)
			{
				report93_count+=1;
				var area_util_xml="<area_utilization>"+
							"<name></name>"+
							"<item_name exact='yes'>"+product_instance.product_name+"</item_name>"+
							"<batch exact='yes'>"+product_instance.batch+"</batch>"+
							"</area_utilization>";
				fetch_requested_data('report93',area_util_xml,function(areas)
				{
					//console.log(areas);
					for(var l=0;l<areas.length;l++)
					{
						for(var m=l+1;m<areas.length;m++)
						{
							if(areas[m].name==areas[l].name && areas[m].item_name==areas[l].item_name && areas[m].batch==areas[l].batch)
							{
								areas.splice(m,1);
								m--;
							}
						}
					}
					areas.forEach(function(area)
					{
						var result_object=new Object();
						result_object['SKU']=area.item_name;
						result_object['Batch']=area.batch;
						result_object['Storage']=area.name;
						result_object['Expiry']=get_my_past_date(product_instance.expiry);
						result_object['MRP']=product_instance.mrp;

						report93_count+=1;
						get_store_inventory(area.name,area.item_name,area.batch,function(inventory)
						{
							result_object['Quantity']=inventory;
							report93_count-=1;
							results.push(result_object);
						});
					});
					report93_count-=1;
				});
				report93_count-=1;
			});

			var report93_complete=setInterval(function()
			{
				if(report93_count===0)
				{
					results.forEach(function(result)
					{
						for(var x in products)
						{
							if(result['SKU']==products[x].name)
							{
								result['Brand']=products[x].make;
								result['Item Name']=products[x].description;
								break;
							}
						}
						var rowsHTML="<tr>";
							rowsHTML+="<td data-th='Brand'>";
								rowsHTML+=result['Brand'];
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Item'>";
								rowsHTML+="<b>SKU</b>: "+result['SKU'];
								rowsHTML+="<br><b>Name</b>: "+result['Item Name'];
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Batch'>";
								rowsHTML+="<b>Batch</b>: "+result['Batch'];
								rowsHTML+="<br><b>MRP</b>: "+result['MRP'];
								rowsHTML+="<br><b>Expiry</b>: "+result['Expiry'];
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Storage'>";
								rowsHTML+=result['Storage'];
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Inventory'>";
								rowsHTML+=result['Quantity'];
							rowsHTML+="</td>";
						rowsHTML+="</tr>";

						$('#report93_body').append(rowsHTML);

					});

					var print_button=form.elements['print'];
					print_tabular_report('report93','Stock Report',print_button);

					var csv_button=form.elements['csv'];
					$(csv_button).off("click");
					$(csv_button).on("click", function(event)
					{
						csv_download_report(results,'Stock Report');
					});

					clearInterval(report93_complete);

					hide_loader();
				}
			},1000);
		});
	});
};

	</script>
</div>
