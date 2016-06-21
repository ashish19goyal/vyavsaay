<div id='form207' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal142_action();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='form207_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form207_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                </ul>
            </div>
      </div>
	</div>

	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form207_header'></form>
						<th><input type='text' placeholder="Item" class='floatlabel' name='name' form='form207_header'></th>
						<th><input type='text' placeholder="Batch" class='floatlabel' name='batch' form='form207_header'></th>
						<th><input type='text' placeholder="Expiry" readonly='readonly' form='form207_header'></th>
						<th><input type='text' placeholder="Pricing" readonly='readonly' form='form207_header'></th>
						<th><input type='text' placeholder="Quantity" readonly='readonly' form='form207_header'></th>
						<th><input type='submit' form='form207_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form207_body'>
			</tbody>
		</table>
	</div>

	<script>
	function form207_header_ini()
	{
		var filter_fields=document.getElementById('form207_header');
		var names_filter=filter_fields.elements['name'];
		var batches_filter=filter_fields.elements['batch'];

		$(filter_fields).off('submit');
		$(filter_fields).on('submit',function(event)
		{
			event.preventDefault();
			form207_ini();
		});
		//setting autocompletes
		var products_data={data_store:'product_master',return_column:'name'};
		var batch_data={data_store:'product_instances',return_column:'batch'};

		set_my_filter_json(products_data,names_filter);
		set_my_filter_json(batch_data,batches_filter);
	};

	function form207_ini()
	{
		show_loader();
		var fid=$("#form207_link").attr('data_id');
		if(fid==null)
			fid="";

		$('#form207_body').html("");

		var filter_fields=document.getElementById('form207_header');
		var fname=filter_fields.elements['name'].value;
		var fbatch=filter_fields.elements['batch'].value;

		var paginator=$('#form207_body').paginator();

		var new_columns={count:paginator.page_size(),
						start_index:paginator.get_index(),
						data_store:'product_instances',
						indexes:[{index:'id',value:fid},
								{index:'product_name',value:fname},
								{index:'batch',value:fbatch},
								{index:'expiry'},
								{index:'cost_price'},
								{index:'sale_price'},
								{index:'mrp'}]};

		read_json_rows('form207',new_columns,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="<tr>";
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
							rowsHTML+="<input type='number' step='any' class='floatlabel dblclick_editable' placeholder='MRP' readonly='readonly' form='form207_"+result.id+"' value='"+result.mrp+"'>";
							rowsHTML+="<input type='number' step='any' class='floatlabel dblclick_editable' placeholder='Sale Price' readonly='readonly' form='form207_"+result.id+"' value='"+result.sale_price+"'>";
							rowsHTML+="<input type='number' step='any' class='floatlabel dblclick_editable' placeholder='Cost Price' readonly='readonly' form='form207_"+result.id+"' value='"+result.cost_price+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Quantity'>";
							rowsHTML+="<input type='number' class='floatlabel' placeholder='Fresh' step='any' readonly='readonly' form='form207_"+result.id+"'>";
							rowsHTML+="<input type='number' class='floatlabel' placeholder='In Use' step='any' readonly='readonly' form='form207_"+result.id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form207_"+result.id+"' value='"+result.id+"' name='id'>";
							rowsHTML+="<button type='submit' class='btn green' name='save' form='form207_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
							rowsHTML+="<button type='button' class='btn red' name='delete' form='form207_"+result.id+"' title='Delete' onclick='form207_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="<button type='button' class='btn default yellow-stripe' title='Update Inventory' form='form207_"+result.id+"' onclick=\"modal143_action('"+result.product_name+"','"+result.batch+"')\">Inventory</button>";
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

				var hireable_data={data_store:'bill_items',sum:'yes',return_column:'quantity',
								indexes:[{index:'hired',exact:'yes'},
										{index:'fresh',exact:'yes'},
										{index:'item_name',exact:result.product_name},
										{index:'batch',exact:result.batch}]};
				set_my_value_json(hireable_data,inuse_inventory,function()
				{
					get_inventory(result.product_name,result.batch,function(inventory)
					{
						fresh_inventory.value=parseFloat(inventory)-parseFloat(inuse_inventory.value);
						$(fresh_inventory).floatlabel();
					});
					$(inuse_inventory).floatlabel();
				});
			});

			paginator.update_index(results.length);
			initialize_static_tabular_report_buttons('Inventory','form207');

			$('#form207').formcontrol();
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
			var data_id=form.elements['id'].value;
			var last_updated=get_my_time();

			var data_json={data_store:'product_instances',
				log:'yes',
				data:[{index:'id',value:data_id},
					{index:'mrp',value:mrp},
					{index:'sale_price',value:sp},
					{index:'cost_price',value:cp},
					{index:'expiry',value:expiry},
					{index:'last_updated',value:last_updated}],
				log_data:{title:'updated',notes:'Batch '+batch+' of item '+name,link_to:'form207'}};

			update_json(data_json);
			$(form).readonly();
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
				var data_id=form.elements['id'].value;

				var data_json={data_store:'product_instances',
						log:'yes',
						data:[{index:'id',value:data_id}],
						log_data:{title:'Deleted',notes:'Batch '+batch+' of item '+name,link_to:'form207'}};

				var other_json={data_store:'area_utilization',
						data:[{index:'item_name',value:name},
							{index:'batch',exact:batch}]};

				delete_json(data_json);
				delete_json(other_json);
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
