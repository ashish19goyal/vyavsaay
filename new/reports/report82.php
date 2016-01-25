<div id='report82' class='tab-pane'>
	<form id='report82_header' autocomplete="off">
		<fieldset>
			<label>Item<br><input type='text' name='product'></label>
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
				<th>Total Inventory</th>
				<th>Pending Order</th>
				<th>Available Inventory</th>
			</tr>
		</thead>
		<tbody id='report82_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='report82_prev' class='prev_icon' data-index='-25' onclick="$('#report82_index').attr('data-index',$(this).attr('data-index')); report82_ini();">
		<div style='display:hidden;' id='report82_index' data-index='0'></div>
		<img src='./images/next.png' id='report82_next' class='next_icon' data-index='25' onclick="$('#report82_index').attr('data-index',$(this).attr('data-index')); report82_ini();">
	</div>
	
	<script>

function report82_header_ini()
{	
	var form=document.getElementById('report82_header');
	var product_filter=form.elements['product'];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report82_ini();
	});
			
	var product_data="<product_master>"+
				"<name></name>"+
				"</product_master>";
	set_my_filter(product_data,product_filter);
}

function report82_ini()
{
	var form=document.getElementById('report82_header');
	var item_filter=form.elements[1].value;

	show_loader();
	$('#report82_body').html('');	

	////indexing///
	var index_element=document.getElementById('report82_index');
	var prev_element=document.getElementById('report82_prev');
	var next_element=document.getElementById('report82_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var items_data="<product_master count='25' start_index='"+start_index+"'>" +
		"<id></id>"+
		"<name>"+item_filter+"</name>" +
		"</product_master>";
	//console.log(orders_data);
	
	fetch_requested_data('report82',items_data,function(items)
	{
		items.forEach(function(item)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
			rowsHTML+="<form id='report82_"+item.id+"'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+=item.name;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Total Inventory'>";
				rowsHTML+="<p id='report82_total_"+item.id+"'></p>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Pending Order'>";
				rowsHTML+="<p id='report82_ordered_"+item.id+"'></p>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Available Inventory'>";
				rowsHTML+="<p id='report82_available_"+item.id+"'></p>";
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
		
			$('#report82_body').append(rowsHTML);
			
			get_inventory(item.name,'',function (inventory) 
			{
				document.getElementById("report82_total_"+item.id).innerHTML=inventory;
				var sale_item_xml="<sale_order_items sum='yes'>"+
								"<quantity></quantity>"+								
								"<bill_status exact='yes'>pending</bill_status>"+
								"<item_name exact='yes'>"+item.name+"</item_name>"+
								"</sale_order_items>";
				get_single_column_data(function (sale_items) 
				{
						
					if(sale_items.length>0)
					{
						var av_inventory=parseFloat(inventory)-parseFloat(sale_items[0]);
						document.getElementById("report82_ordered_"+item.id).innerHTML=sale_items[0];
						document.getElementById("report82_available_"+item.id).innerHTML=av_inventory;
					}
					else
					{
						document.getElementById("report82_ordered_"+item.id).innerHTML='0';
						document.getElementById("report82_available_"+item.id).innerHTML=inventory;
					}
				},sale_item_xml);				
				
			});				
		});		
		
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

		hide_loader();
	});
	
	var print_button=form.elements[3];
	print_tabular_report('report82','Inventory Report',print_button);
};
	
	</script>
</div>