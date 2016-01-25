<div id='report94' class='tab-pane'>
	<form id='report94_header' autocomplete="off">
		<fieldset>
			<label>SKU<br><input type='text' required name='sku'></label>
			<label>Item Name<br><input type='text' name='item_name'></label>
			<label>	
				<input type='submit' value='Refresh' name='refresh' class='generic_icon'>
				<input type='button' title='Print' name='print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>SKU</th>
				<th>Item Name</th>
				<th>Quantity (in combo)</th>
				<th>Inventory</th>
			</tr>
		</thead>
		<tbody id='report94_body'>
		</tbody>
		<tfoot id='report94_foot'>
		</tfoot>
	</table>
	
	<script>

function report94_header_ini()
{	
	var form=document.getElementById('report94_header');
	var sku_filter=form.elements['sku'];
	var name_filter=form.elements['item_name'];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report94_ini();
	});

	var sku_data="<product_master>"+
				"<name></name>"+
				"</product_master>";
	set_my_value_list(sku_data,sku_filter);

	var name_data="<product_master>"+
				"<description></description>"+
				"</product_master>";
	set_my_value_list(name_data,name_filter);
	
	$(name_filter).off('blur');
	$(name_filter).off('change');
	$(name_filter).off('select');
	$(name_filter).on('blur change select',function ()
	{
		var sku_data="<product_master>"+
					"<name></name>"+
					"<description exact='yes'>"+name_filter.value+"</description>"+
					"</product_master>";
		set_my_value(sku_data,sku_filter);			
	}); 		
}

function report94_ini()
{
	show_loader();
	var form=document.getElementById('report94_header');
	var sku=form.elements['sku'].value;
	
	$('#report94_body').html('');

	var master_data="<pre_requisites>" +
			"<id></id>" +
			"<name exact='yes'>"+sku+"</name>" +
			"<type>product</type>" +
			"<requisite_name></requisite_name>"+
			"<requisite_desc></requisite_desc>"+
			"<quantity></quantity>"+
			"</pre_requisites>";
	var results=[];
	fetch_requested_data('report94',master_data,function(products)
	{
		//console.log(products);
		var report94_count=products.length;
			
		products.forEach(function(product)
		{
			var result_object=new Object();
			result_object['SKU']=product.requisite_name;
			result_object['Item Name']=product.requisite_desc;
			result_object['Quantity (in combo)']=product.quantity;
			
			report94_count+=1;
			get_inventory(product.requisite_name,"",function(inventory)
			{
				result_object['Inventory']=inventory;
				result_object['Max Inventory combo']=my_round(parseFloat(inventory)/parseFloat(result_object['Quantity (in combo)']),0);
				report94_count-=1;
				results.push(result_object);
			});
			report94_count-=1;				
		});
		
		var report94_complete=setInterval(function()
		{
			if(report94_count===0)
			{
				var maximum_combo_inventory="";
				
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<td data-th='SKU'>";
							rowsHTML+=result['SKU'];
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Item Name'>";
							rowsHTML+=result['Item Name'];
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity (in combo)'>";
							rowsHTML+=result['Quantity (in combo)'];
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Inventory'>";
							rowsHTML+=result['Inventory'];
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
		
					$('#report94_body').append(rowsHTML);
					
					if(result['Max Inventory combo']<maximum_combo_inventory || maximum_combo_inventory=="")
					{
						maximum_combo_inventory=result['Max Inventory combo'];
					}
				});
				
				var footHTML="<tr><td colspan='3'>Maximum Combos in Inventory: </td><td>"+maximum_combo_inventory+"</td></tr>";
				$('#report94_foot').html(footHTML);
				
				var print_button=form.elements['print'];
				print_tabular_report('report94','Combo Inventory',print_button);
			
				clearInterval(report94_complete);
				
				hide_loader();	  		   
			}
		},500);
	});
};
	
	</script>
</div>