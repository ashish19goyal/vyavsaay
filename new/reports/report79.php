<div id='report79' class='tab-pane'>
	<form id='report79_header' autocomplete="off">
		<fieldset>
			<label>Order #<br><input type='text' name='awb'></label>
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
				<th>PO #</th>
				<th>SKU</th>
				<th>Item Name</th>
				<th>Order Qty</th>
				<th>Pending Qty</th>
			</tr>
		</thead>
		<tbody id='report79_body'>
		</tbody>
	</table>
	
	<script>

function report79_header_ini()
{	
	var form=document.getElementById('report79_header');
	var order_filter=form.elements[1];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report79_ini();
	});
	
	var order_data="<purchase_orders>"+
				"<order_num></order_num>"+
				"<status array='yes'>--order placed--partially received--</status>"+
				"</purchase_orders>";
	set_my_filter(order_data,order_filter);
}

function report79_ini()
{
	var form=document.getElementById('report79_header');
	var order_filter=form.elements[1].value;
	
	show_loader();
	$('#report79_body').html('');	
	
	var order_data="<purchase_orders>"+
				"<id></id>"+
				"<order_num>"+order_filter+"</order_num>"+
				"<status array='yes'>--order placed--partially received--</status>"+
				"<bill_id></bill_id>"+
				"</purchase_orders>";
	
	fetch_requested_data('report79',order_data,function(pos)
	{
		var bill_id_string='--';
		var po_id_string='--';
		for(var i in pos)
		{
			if(pos[i].bill_id!="" && pos[i].bill_id!=null)
			{
				var bill_id_array=JSON.parse(pos[i].bill_id);
				for(var x in bill_id_array)
				{
					bill_id_string+=bill_id_array[x].bill_id+"--";
				}
			}
			po_id_string+=pos[i].id+"--";
		}		

		var bill_items_xml="<supplier_bill_items>"+
					"<bill_id array='yes'>"+bill_id_string+"</bill_id>"+
					"<product_name></product_name>"+
					"<item_desc></item_desc>"+
					"<quantity></quantity>"+
					"<qc exact='yes'>accepted</qc>"+
					"</supplier_bill_items>";
					
		var po_items_xml="<purchase_order_items>"+
					"<order_id array='yes'>"+po_id_string+"</order_id>"+
					"<item_name></item_name>"+
					"<item_desc></item_desc>"+
					"<quantity></quantity>"+
					"</purchase_order_items>";
		fetch_requested_data('',po_items_xml,function (po_items) 
		{
			//console.log(po_items);
			fetch_requested_data('',bill_items_xml,function (bill_items) 
			{
				//console.log(bill_items);
				for(var j=0;j<po_items.length;j++)
				{
					po_items[j].order_quantity=po_items[j].quantity;
				}
				
				for(var k=0;k<po_items.length;k++)
				{
					for(var l=0;l<bill_items.length;l++)
					{
						if(po_items[k].item_name==bill_items[l].product_name)
						{
							if(parseFloat(po_items[k].quantity)>parseFloat(bill_items[l].quantity))
							{
								po_items[k].quantity=parseFloat(po_items[k].quantity)-parseFloat(bill_items[l].quantity);
								bill_items.splice(l,1);
								l--;
							}
							else if(parseFloat(po_items[k].quantity)<parseFloat(bill_items[l].quantity))
							{
								bill_items[l].quantity=parseFloat(bill_items[l].quantity)-parseFloat(po_items[k].quantity);
								po_items.splice(k,1);
								k--;
								break;
							}
							else 
							{
								bill_items.splice(l,1);
								po_items.splice(k,1);
								k--;
								break;
							}
						}
					}
				}
				
				var rowsHTML="";
				po_items.forEach(function(item)
				{
					for(var l in pos)
					{
						if(item.order_id==pos[l].id)
						{
							item.order_num=pos[l].order_num;
							break;
						}
					}
					rowsHTML+="<tr>";
					rowsHTML+="<td data-th='PO #'>";
						rowsHTML+="<a onclick=\"element_display('"+item.order_id+"','form24');\">"+item.order_num+"<\a>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='SKU'>";
						rowsHTML+=item.item_name;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Item Name'>";
						rowsHTML+=item.item_desc;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Order Qty'>";
						rowsHTML+=item.order_quantity;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Pending Qty'>";
						rowsHTML+=item.quantity;
					rowsHTML+="</td>";
					rowsHTML+="</tr>";
				});
				$('#report79_body').html(rowsHTML);
				
				var csv_button=form.elements['csv'];
				$(csv_button).off("click");
				$(csv_button).on("click", function(event)
				{
					var new_items=[];
					po_items.forEach(function(item)
					{
						var new_item=new Object();
						new_item['PO #']=item.order_num;
						new_item['SKU']=item.item_name;
						new_item['Item Name']=item.item_desc;
						new_item['Order Qty']=item.order_quantity;
						new_item['Pending Qty']=item.quantity;
						new_items.push(new_item);
					});
					csv_download_report(new_items,'Pending purchase order items');
				});
				
				hide_loader();
			});
		});
	});
	
	var print_button=form.elements[3];
	print_tabular_report('report79','Pending Purchase Order Items',print_button);
};
	
	</script>
</div>