<div id='form304' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal142_action();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='form304_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form304_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form304_header'></form>
						<th><input type='text' placeholder="Item" class='floatlabel' name='name' form='form304_header'></th>
						<th><input type='text' placeholder="Cost Price" readonly='readonly' form='form304_header'></th>
						<th><input type='text' placeholder="Sales Price" readonly='readonly' form='form304_header'></th>
						<th><input type='text' placeholder="Quantity" readonly='readonly' form='form304_header'></th>
						<th><input type='submit' form='form304_header' style='display:none;'></th>
				</tr>
			</thead>
			<tbody id='form304_body'>
			</tbody>
		</table>
	</div>

	<div class="modal_forms">
		<a href='#form304_popup' data-toggle="modal" id='form304_popup_link'></a>
		<div id="form304_popup" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
			  <div class="modal-dialog">
				  <div class="modal-content">
					  <form id='form304_popup_form' autocomplete="off">
						  <div class="modal-header">
							  <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
							  <h4 class="modal-title">Update Inventory</h4>
						  </div>
						  <div class="modal-body">
							  <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
								  <div class="row">
									  <div class="col-sm-12 col-md-4">Item</div>
									  <div class="col-sm-12 col-md-8"><input type='text' form='form304_popup_form' readonly='readonly' required name='name'></div>
								  </div>
								  <div class="row">
									  <div class="col-sm-12 col-md-4">Updated Quantity</div>
									  <div class="col-sm-12 col-md-8"><input type='number' step='any' required form='form304_popup_form' name='quantity'></div>
								  </div>
							  </div>
						 </div>
						 <div class="modal-footer">
							 <button type="submit" class="btn green" form='form304_popup_form' name='save'>Update</button>
							 <button type="button" class="btn red" form='form304_popup_form' data-dismiss="modal" name='cancel'>Cancel</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>


	<script>
		function form304_header_ini()
		{
			var filter_fields=document.getElementById('form304_header');
			var names_filter=filter_fields.elements['name'];

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form304_ini();
			});
			//setting autocompletes
			var products_data={data_store:'product_master',return_column:'name'};

			set_my_filter_json(products_data,names_filter);
		};

		function form304_ini()
		{
			show_loader();
			var fid=$("#form304_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form304_body').html("");

			var filter_fields=document.getElementById('form304_header');
			var fname=filter_fields.elements['name'].value;

			var paginator=$('#form304_body').paginator();

			var new_columns={count:paginator.page_size(),
							start_index:paginator.get_index(),
							data_store:'product_instances',
							indexes:[{index:'id',value:fid},
									{index:'product_name',value:fname},
									{index:'cost_price'},
									{index:'sale_price'}]};

			read_json_rows('form304',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form304_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Item'>";
								rowsHTML+="<textarea readonly='readonly' form='form304_"+result.id+"'>"+result.product_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Cost Price'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form304_"+result.id+"' class='dblclick_editable' step='any' value='"+result.cost_price+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Sales Price'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form304_"+result.id+"' class='dblclick_editable' step='any' value='"+result.sale_price+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Quantity'>";
								rowsHTML+="<input type='number' step='any' readonly='readonly' form='form304_"+result.id+"' name='quantity'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form304_"+result.id+"' value='"+result.id+"' name='id'>";
								rowsHTML+="<button type='submit' class='btn green' name='save' form='form304_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn default yellow-stripe' title='Update Inventory' form='form304_"+result.id+"' onclick=\"form304_popup_action('"+result.product_name+"');\">Inventory</button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form304_body').append(rowsHTML);
					var fields=document.getElementById("form304_"+result.id);
					var inventory_filter=fields.elements['quantity'];

					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form304_update_item(fields);
					});

					get_inventory(result.product_name,'',function(inventory)
					{
						inventory_filter.value=inventory;
					});
				});

				paginator.update_index(results.length);
				initialize_static_tabular_report_buttons('Inventory','form304');

				$('#form304').formcontrol();
				hide_loader();
			});
		};

		function form304_update_item(form)
		{
			if(is_update_access('form304'))
			{
				var name=form.elements[0].value;
				var cost_price=form.elements[1].value;
				var sale_price=form.elements[2].value;
				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();

				var data_json={data_store:'product_instances',
					log:'yes',
					data:[{index:'id',value:data_id},
						{index:'sale_price',value:sale_price},
						{index:'cost_price',value:cost_price},
						{index:'last_updated',value:last_updated}],
					log_data:{title:'Updated',notes:'Pricing of item '+name,link_to:'form304'}};

				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form304_popup_action(item_name)
		{
			var form=document.getElementById('form304_popup_form');

			var fitem=form.elements['name'];
			var fquantity=form.elements['quantity'];
			fitem.value=item_name;

			$(form).off("submit");
			$(form).on("submit",function(event)
			{
				event.preventDefault();
				if(is_update_access('form304'))
				{
					get_inventory(item_name,'',function(inventory)
					{
						var last_updated=get_my_time();
						var new_total=parseFloat(fquantity.value)-parseFloat(inventory);
						var adjust_json={data_store:'inventory_adjust',
							warning:'no',
							data:[{index:'id',value:get_new_key()},
								{index:'quantity',value:new_total},
								{index:'product_name',value:item_name},
								{index:'batch',value:''},
								{index:'last_updated',value:last_updated}]};

						create_json(adjust_json);
					});
				}
				else
				{
					$("#modal2_link").click();
				}
				$(form).find(".close").click();
			});

			$("#form304_popup_link").click();
		}

	</script>
</div>
