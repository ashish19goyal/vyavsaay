<div id='report88' class='tab-pane'>
	<form id='report88_header' autocomplete="off">
		<fieldset>
			<label>Keyword<br><input type='text' name='key'></label>
			<label>Item Name<br><input type='text' name='name'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Item</th>
				<th>Details</th>
				<th>Inventory</th>
			</tr>
		</thead>
		<tbody id='report88_body'>
		</tbody>
	</table>
	
	<script>

function report88_header_ini()
{	
	var form=document.getElementById('report88_header');
	var keyword_filter=form.elements['key'];
	var item_filter=form.elements['name'];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report88_ini();
	});

/*	var company_data="<product_master>"+
				"<make></make>"+
				"</product_master>";
	set_my_filter(company_data,company_filter);
*/
	var item_data="<product_master>"+
				"<name></name>"+
				"</product_master>";
	set_my_filter(item_data,item_filter);
}

function report88_ini()
{
	show_loader();
	var form=document.getElementById('report88_header');
	var keyword=form.elements['key'].value;
	var item=form.elements['name'].value;
	
	$('#report88_body').html('');

	var attribute_data="<attributes>" +
			"<name>"+item+"</name>" +
			"<type exact='yes'>product</type>" +
			"<value>"+keyword+"</value>"+
			"<attribute></attribute>"+
			"</attributes>";
	
	fetch_requested_data('report88',attribute_data,function(attributes)
	{
		var item_data="<product_master>" +
			"<name>"+item+"</name>" +
			"<description>"+keyword+"</description>"+
			"</product_master>";
		fetch_requested_data('report88',item_data,function(items)
		{
			for (var i=0;i<items.length;i++)
			{
				items[i].attribute="Details";
				items[i].value=items[i].description;
				attributes.push(items[i]);
			}
	
			for (var i=0;i<attributes.length;i++)
			{
				attributes[i].attribute_content=attributes[i].attribute+": "+attributes[i].value+"<br>";
				for(var j=i+1;j<attributes.length;j++)
				{
					if(attributes[i].name==attributes[j].name)
					{
						attributes[i].attribute_content+=attributes[j].attribute+": "+attributes[j].value+"<br>";
						attributes.splice(j,1);
						j-=1;
					}
				}
			}
	
			attributes.forEach(function(result)
			{
				var rowsHTML="<tr>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+=result.name;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+=result.attribute_content;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Inventory' id='report88_inventory_"+result.id+"'>";
					rowsHTML+="</td>";
				rowsHTML+="</tr>";
	
				$('#report88_body').append(rowsHTML);
				
				get_inventory(result.name,'',function(inventory)
				{
					document.getElementById('report88_inventory_'+result.id).innerHTML=-parseFloat(inventory);
				});
			});
			
			var print_button=form.elements[4];
			print_tabular_report('report88','Inventory Report',print_button);
			hide_loader();
		});
	});
};
	
	</script>
</div>