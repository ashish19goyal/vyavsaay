<div id='report92' class='tab-pane'>
	<form id='report92_header' autocomplete="off">
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
				<th>Order #</th>
				<th>SKU</th>
				<th>Item Name</th>
				<th>Order Qty</th>
				<th>Pending Qty</th>
			</tr>
		</thead>
		<tbody id='report92_body'>
		</tbody>
	</table>

	<script>

function report92_header_ini()
{
	var form=document.getElementById('report92_header');
	var order_filter=form.elements[1];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report92_ini();
	});

	var order_data="<sale_orders>"+
				"<order_num></order_num>"+
				"</sale_orders>";
	set_my_filter(order_data,order_filter);
}

function report92_ini()
{
	var form=document.getElementById('report92_header');
	var order_filter=form.elements[1].value;

	show_loader();
	$('#report92_body').html('');

	var order_data="<sale_orders>"+
				"<id></id>"+
				"<order_num>"+order_filter+"</order_num>"+
				"<status array='yes'>--pending--partially billed--partially picked--partially packed--</status>"+
				"<bill_id></bill_id>"+
				"</sale_orders>";

	fetch_requested_data('report92',order_data,function(pos)
	{
		//console.log(pos);
		var bill_id_string='--';
		var po_id_string='--';
		for(var i in pos)
		{
			var bill_id_array=vUtil.jsonParse(pos[i].bill_id);
			for(var x in bill_id_array)
			{
				bill_id_string+=bill_id_array[x].bill_id+"--";
			}

			po_id_string+=pos[i].id+"--";
		}

		var bill_items_xml="<bill_items>"+
					"<bill_id array='yes'>"+bill_id_string+"</bill_id>"+
					"<item_name></item_name>"+
					"<item_desc></item_desc>"+
					"<quantity></quantity>"+
					"</bill_items>";

		var po_items_xml="<sale_order_items>"+
					"<order_id array='yes'>"+po_id_string+"</order_id>"+
					"<item_name></item_name>"+
					"<item_desc></item_desc>"+
					"<quantity></quantity>"+
					"</sale_order_items>";
		fetch_requested_data('',po_items_xml,function (po_items)
		{
			//console.log(po_items);
			fetch_requested_data('',bill_items_xml,function (bill_items)
			{
				//console.log(bill_items);
				for(var j=0;j<po_items.length;j++)
				{
					po_items[j].order_quantity=po_items[j].quantity;
					for(var x in pos)
					{
						if(pos[x].id==po_items[j].order_id)
						{
							po_items[j].order_num=pos[x].order_num;
							break;
						}
					}
				}

				for(var k=0;k<po_items.length;k++)
				{
					for(var l=0;l<bill_items.length;l++)
					{
						if(po_items[k].item_name==bill_items[l].item_name)
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
					rowsHTML+="<tr>";
					rowsHTML+="<td data-th='Order #'>";
						rowsHTML+="<a onclick=\"element_display('"+item.order_id+"','form108');\">"+item.order_num+"<\a>";
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
				$('#report92_body').html(rowsHTML);

				var csv_button=form.elements['csv'];
				$(csv_button).off("click");
				$(csv_button).on("click", function(event)
				{
					var new_items=[];
					po_items.forEach(function(item)
					{
						var new_item=new Object();
						new_item['Order #']=item.order_num;
						new_item['SKU']=item.item_name;
						new_item['Item Name']=item.item_desc;
						new_item['Order Qty']=item.order_quantity;
						new_item['Pending Qty']=item.quantity;
						new_items.push(new_item);
					});
					vExport.csv_download({result:new_items,file:'Pending sale order items'});
				});

				hide_loader();
			});
		});
	});

	var print_button=form.elements[3];
	print_tabular_report('report92','Pending Sale Order Items',print_button);
};

	</script>
</div>
