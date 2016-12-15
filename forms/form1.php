<div id='form1' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal142_action();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='form1_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form1_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form1_header'></form>
						<th><input type='text' placeholder="Item" class='floatlabel' name='name' form='form1_header'></th>
						<th><input type='text' placeholder="Batch" class='floatlabel' name='batch' form='form1_header'></th>
						<th><input type='text' placeholder="MRP" readonly='readonly' form='form1_header'></th>
						<th><input type='text' placeholder="Cost Price" readonly='readonly' form='form1_header'></th>
						<th><input type='text' placeholder="Sales Price" readonly='readonly' form='form1_header'></th>
						<th><input type='text' placeholder="Quantity" readonly='readonly' form='form1_header'></th>
						<th><input type='submit' form='form1_header' style='display:none;'></th>
				</tr>
			</thead>
			<tbody id='form1_body'>
			</tbody>
		</table>
	</div>

	<div class="modal_forms">
		<a href='#form1_popup' data-toggle="modal" id='form1_popup_link'></a>
		<div id="form1_popup" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
			  <div class="modal-dialog">
				  <div class="modal-content">
					  <form id='form1_popup_form' autocomplete="off">
						  <div class="modal-header">
							  <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
							  <h4 class="modal-title">Update Inventory</h4>
						  </div>
						  <div class="modal-body">
							  <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
								  <div class="row">
									  <div class="col-sm-12 col-md-4">Item</div>
									  <div class="col-sm-12 col-md-8"><input type='text' form='form1_popup_form' readonly='readonly' required name='name'></div>
								  </div>
								  <div class="row">
									  <div class="col-sm-12 col-md-4">Batch</div>
									  <div class="col-sm-12 col-md-8"><input type='text' form='form1_popup_form' readonly='readonly' required name='batch'></div>
								  </div>
								  <div class="row">
									  <div class="col-sm-12 col-md-4">Updated Quantity</div>
									  <div class="col-sm-12 col-md-8"><input type='number' step='any' required form='form1_popup_form' name='quantity'></div>
								  </div>
							  </div>
						 </div>
						 <div class="modal-footer">
							 <button type="submit" class="btn green" form='form1_popup_form' name='save'>Update</button>
							 <button type="button" class="btn red" form='form1_popup_form' data-dismiss="modal" name='cancel'>Cancel</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>


	<script>
		function form1_header_ini()
		{
			var filter_fields=document.getElementById('form1_header');
			var names_filter=filter_fields.elements['name'];
			var batch_filter=filter_fields.elements['batch'];

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form1_ini();
			});
			//setting autocompletes
			var products_data={data_store:'product_master',return_column:'name'};
			var batch_data={data_store:'product_instances',return_column:'batch'};

			set_my_filter_json(products_data,names_filter);
			set_my_filter_json(batch_data,batch_filter);
		};

		function form1_ini()
		{
			show_loader();
			var fid=$("#form1_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form1_body').html("");

			var filter_fields=document.getElementById('form1_header');
			var fname=filter_fields.elements['name'].value;
			var fbatch=filter_fields.elements['batch'].value;

			var paginator=$('#form1_body').paginator();

			var new_columns={count:paginator.page_size(),
							start_index:paginator.get_index(),
							data_store:'product_instances',
							indexes:[{index:'id',value:fid},
									{index:'product_name',value:fname},
									{index:'batch',value:fbatch},
									{index:'mrp'},
									{index:'cost_price'},
									{index:'sale_price'}]};

			read_json_rows('form1',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form1_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Item'>";
								rowsHTML+="<a onclick=\"show_object('product_master','"+result.product_name+"');\"><textarea readonly='readonly' form='form1_"+result.id+"'>"+result.product_name+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Batch'>";
								rowsHTML+="<a><textarea readonly='readonly' form='form1_"+result.id+"' name='batch'>"+result.batch+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='MRP'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form1_"+result.id+"' placeholder='Rs.' class='floatlabel dblclick_editable' step='any' value='"+result.mrp+"' name='mrp'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Cost Price'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form1_"+result.id+"' placeholder='Rs.' class='floatlabel dblclick_editable' step='any' value='"+result.cost_price+"' name='cost'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Sales Price'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form1_"+result.id+"' placeholder='Without Tax (Rs.)' class='floatlabel dblclick_editable' step='any' value='"+result.sale_price+"' name='sale'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form1_"+result.id+"' placeholder='Net (Rs.)' class='floatlabel dblclick_editable' step='any' name='net'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Quantity'>";
								rowsHTML+="<input type='number' step='any' readonly='readonly' form='form1_"+result.id+"' name='quantity'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form1_"+result.id+"' value='"+result.id+"' name='id'>";
								rowsHTML+="<input type='hidden' form='form1_"+result.id+"' name='tax'>";
								rowsHTML+="<button type='submit' class='btn green' name='save' form='form1_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn default yellow-stripe' title='Update Inventory' form='form1_"+result.id+"' onclick=\"form1_popup_action('"+result.product_name+"','"+result.batch+"');\">Inventory</button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form1_body').append(rowsHTML);
					var fields=document.getElementById("form1_"+result.id);
					var inventory_filter=fields.elements['quantity'];
					var batch_filter=fields.elements['batch'];
					var net_filter=fields.elements['net'];
					var sales_filter=fields.elements['sale'];
					var tax_filter=fields.elements['tax'];

					var batch_object={product:result.product_name,batch:result.batch};
					$(batch_filter).parent().on('click',function()
					{
						show_object('product_instances',batch_object);
					});

					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form1_update_item(fields);
					});

					var tax_data={data_store:'product_master',return_column:'tax',count:1,
								indexes:[{index:'name',exact:result.product_name}]};
					read_json_single_column(tax_data,function(taxes)
					{
						if(taxes.length>0){
							tax_filter.value=taxes[0];
							net_filter.value=vUtil.round(((parseFloat(taxes[0])/100)+1)*parseFloat(sales_filter.value),2);
							$(net_filter).floatlabel();
						}
					});

					vUtil.onChange(sales_filter,function()
					{
						net_filter.value=vUtil.round(((parseFloat(tax_filter.value)/100)+1)*parseFloat(sales_filter.value),2);
						$(net_filter).floatlabel();
					});

					vUtil.onChange(net_filter,function()
					{
						sales_filter.value=vUtil.round(parseFloat(net_filter.value)/((parseFloat(tax_filter.value)/100)+1),2);
						$(sales_filter).floatlabel();
					});

					get_inventory(result.product_name,result.batch,function(inventory)
					{
						inventory_filter.value=inventory;
					});
				});

				paginator.update_index(results.length);
				vExport.export_buttons({file:'Inventory',report_id:'form1',action:'static'});

				$('#form1').formcontrol();
				hide_loader();
			});
		};

		function form1_update_item(form)
		{
			if(is_update_access('form1'))
			{
				var name=form.elements[0].value;
				var mrp=form.elements['mrp'].value;
				var cost_price=form.elements['cost'].value;
				var sale_price=form.elements['sale'].value;
				var data_id=form.elements['id'].value;
				var last_updated=vTime.unix();

				var data_json={data_store:'product_instances',
					log:'yes',
					data:[{index:'id',value:data_id},
						{index:'mrp',value:mrp},
						{index:'sale_price',value:sale_price},
						{index:'cost_price',value:cost_price},
						{index:'last_updated',value:last_updated}],
					log_data:{title:'Updated',notes:'Pricing of item '+name,link_to:'form1'}};

				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form1_popup_action(item_name,batch)
		{
			var form=document.getElementById('form1_popup_form');

			var fitem=form.elements['name'];
			var fbatch=form.elements['batch'];
			var fquantity=form.elements['quantity'];
			fitem.value=item_name;
			fbatch.value=batch;

			$(form).off("submit");
			$(form).on("submit",function(event)
			{
				event.preventDefault();
				if(is_update_access('form1'))
				{
					get_inventory(item_name,'',function(inventory)
					{
						var last_updated=get_my_time();
						var new_total=parseFloat(fquantity.value)-parseFloat(inventory);
						var adjust_json={data_store:'inventory_adjust',
							warning:'no',
							data:[{index:'id',value:vUtil.newKey()},
								{index:'quantity',value:new_total},
								{index:'product_name',value:item_name},
								{index:'batch',value:batch},
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

			$("#form1_popup_link").click();
		}

	</script>
</div>
