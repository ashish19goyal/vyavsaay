<div id='form207' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form207_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form207_header'></th>
					<th>Batch <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form207_header'></th>
					<th>Expiry</th>
					<th>Pricing</th>
					<th>Quantity</th>
					<th><input type='button' form='form207_header' value='Add Batch' class='add_icon' onclick='modal142_action();'>
						<input type='button' form='form207_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form207_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form207_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form207_prev' class='prev_icon' data-index='-25' onclick="$('#form207_index').attr('data-index',$(this).attr('data-index')); form207_ini();">
		<div style='display:hidden;' id='form207_index' data-index='0'></div>
		<img src='./images/next.png' id='form207_next' class='next_icon' data-index='25' onclick="$('#form207_index').attr('data-index',$(this).attr('data-index')); form207_ini();">
	</div>

	<script>
	function form207_header_ini()
	{
		var filter_fields=document.getElementById('form207_header');
		var names_filter=filter_fields.elements[0];
		var batches_filter=filter_fields.elements[1];

		$(filter_fields).off('submit');
		$(filter_fields).on('submit',function(event)
		{
			event.preventDefault();
			form207_ini();
		});
		//setting autocompletes
		var products_data="<product_master>" +
				"<name></name>" +
				"</product_master>";

		var batch_data="<product_instances>" +
				"<batch></batch>" +
				"</product_instances>";

		set_my_filter(products_data,names_filter);
		set_my_filter(batch_data,batches_filter);
	};

	function form207_ini()
	{
		show_loader();
		var fid=$("#form207_link").attr('data_id');
		if(fid==null)
			fid="";

		var filter_fields=document.getElementById('form207_header');

		var fname=filter_fields.elements[0].value;
		var fbatch=filter_fields.elements[1].value;

		////indexing///
		var index_element=document.getElementById('form207_index');
		var prev_element=document.getElementById('form207_prev');
		var next_element=document.getElementById('form207_next');
		var start_index=index_element.getAttribute('data-index');
		//////////////

		var columns="<product_instances count='25' start_index='"+start_index+"'>" +
			"<id>"+fid+"</id>" +
			"<batch>"+fbatch+"</batch>" +
			"<product_name>"+fname+"</product_name>" +
			"<manufacture_date></manufacture_date>"+
			"<expiry></expiry>" +
			"<cost_price></cost_price>"+
			"<sale_price></sale_price>"+
			"<mrp></mrp>"+
			"</product_instances>";

		$('#form207_body').html("");

		fetch_requested_data('form207',columns,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="";
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form207_"+result.id+"'></form>";
						rowsHTML+="<td data-th='Name'>";
							rowsHTML+="<textarea readonly='readonly' form='form207_"+result.id+"'>"+result.product_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Batch'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form207_"+result.id+"' value='"+result.batch+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Expiry'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form207_"+result.id+"' class='dblclick_editable' value='"+get_my_past_date(result.expiry)+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Pricing'>";
							rowsHTML+="MRP: <input type='number' step='any' readonly='readonly' form='form207_"+result.id+"' class='dblclick_editable' value='"+result.mrp+"'>";
							rowsHTML+="</br>SP: <input type='number' step='any' readonly='readonly' form='form207_"+result.id+"' value='"+result.sale_price+"' class='dblclick_editable'>";
							rowsHTML+="</br>CP: <input type='number' step='any' readonly='readonly' form='form207_"+result.id+"' value='"+result.cost_price+"' class='dblclick_editable' >";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="Fresh: <input type='number' step='any' readonly='readonly' form='form207_"+result.id+"' value=''>";
							rowsHTML+="</br>In use: <input type='number' step='any' readonly='readonly' form='form207_"+result.id+"' value=''>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form207_"+result.id+"' value='"+result.id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' title='Save' form='form207_"+result.id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' title='Delete' form='form207_"+result.id+"' onclick='form207_delete_item($(this));'>";
							rowsHTML+="<input type='button' class='generic_icon' value='Inventory' title='Update Inventory' form='form207_"+result.id+"' onclick=\"modal143_action('"+result.product_name+"','"+result.batch+"')\">";
						rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form207_body').append(rowsHTML);
				var fields=document.getElementById("form207_"+result.id);
				var expiry=fields.elements[2];
				var fresh_inventory=fields.elements[6];
				var inuse_inventory=fields.elements[7];
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form207_update_item(fields);
				});

				$(expiry).datepicker();

				var hireable_data="<bill_items sum='yes'>"+
								"<quantity></quantity>"+
								"<hired exact='yes'>yes</hired>"+
								"<fresh exact='yes'>yes</fresh>"+
								"<item_name exact='yes'>"+result.product_name+"</item_name>"+
								"<batch exact='yes'>"+result.batch+"</batch>"+
								"</bill_items>";
				set_my_value_func(hireable_data,inuse_inventory,function()
				{
					get_inventory(result.product_name,result.batch,function(inventory)
					{
						fresh_inventory.value=parseFloat(inventory)-parseFloat(inuse_inventory.value);
					});
				});
			});

			////indexing///
			var next_index=parseInt(start_index)+25;
			var prev_index=parseInt(start_index)-25;
			next_element.setAttribute('data-index',next_index);
			prev_element.setAttribute('data-index',prev_index);
			index_element.setAttribute('data-index','0');
			if(results.length<25)
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

			longPressEditable($('.dblclick_editable'));
			$('textarea').autosize();

			var export_button=filter_fields.elements[3];
			$(export_button).off("click");
			$(export_button).on("click", function(event)
			{
				get_export_data(columns,'inventory');
			});
			hide_loader();
		});
	};

	function form207_update_item(form)
	{
		if(is_update_access('form1'))
		{
			var name=form.elements[0].value;
			var batch=form.elements[1].value;
			var expiry=get_raw_time(form.elements[2].value);
			var mrp=form.elements[3].value;
			var sp=form.elements[4].value;
			var cp=form.elements[5].value;
			var data_id=form.elements[8].value;
			var last_updated=get_my_time();
			var data_xml="<product_instances>" +
						"<id>"+data_id+"</id>" +
						"<product_name>"+name+"</product_name>" +
						"<batch>"+batch+"</batch>" +
						"<mrp>"+mrp+"</mrp>"+
						"<sale_price>"+sp+"</sale_price>"+
						"<cost_price>"+cp+"</cost_price>"+
						"<expiry>"+expiry+"</expiry>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</product_instances>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>product_instances</tablename>" +
						"<link_to>form207</link_to>" +
						"<title>Updated</title>" +
						"<notes>Batch number "+batch+" of "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			update_row(data_xml,activity_xml);
			for(var i=0;i<8;i++)
			{
				$(form.elements[i]).attr('readonly','readonly');
			}
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form207_delete_item(button)
	{
		if(is_delete_access('form207'))
		{
			modal115_action(function()
			{
				var form_id=$(button).attr('form');
				var form=document.getElementById(form_id);
				var name=form.elements[0].value;
				var batch=form.elements[1].value;
				var data_id=form.elements[8].value;
				var last_updated=get_my_time();
				var data_xml="<product_instances>" +
							"<id>"+data_id+"</id>" +
							"</product_instances>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>product_instances</tablename>" +
							"<link_to>form207</link_to>" +
							"<title>Deleted</title>" +
							"<notes>Batch number "+batch+" of product "+name+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				var other_delete="<area_utilization>" +
							"<item_name>"+name+"</item_name>" +
							"<batch>"+batch+"</batch>" +
							"</area_utilization>";

				if(is_online())
				{
					server_delete_row(data_xml,activity_xml);
					server_delete_simple(other_delete);
				}
				else
				{
					local_delete_row(data_xml,activity_xml);
					local_delete_simple(other_delete);
				}
				$(button).parent().parent().remove();
			});
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	</script>
</div>
