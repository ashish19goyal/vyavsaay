<div id='form363' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form363_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form363_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form363_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form363_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form363_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form363_header'></th>
						<th><input type='text' placeholder="Attribute" class='floatlabel' name='attribute' form='form363_header'></th>
						<th><input type='text' placeholder="Value" class='floatlabel' name='value' form='form363_header'></th>
						<th><input type='submit' form='form363_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form363_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form363_header_ini()
		{
			var filter_fields=document.getElementById('form363_header');
			var customer_filter=filter_fields.elements['name'];
			var attribute_filter=filter_fields.elements['attribute'];
			var value_filter=filter_fields.elements['value'];

			var customer_data={data_store:'customers',return_column:'acc_name'};
			var attribute_data={data_store:'attributes',return_column:'attribute',
										indexes:[{index:'type',exact:'customer'}]};
			var value_data={data_store:'attributes',return_column:'value',
								indexes:[{index:'type',exact:'customer'}]};

			set_my_filter_json(customer_data,customer_filter);
			set_my_filter_json(attribute_data,attribute_filter);
			set_my_filter_json(value_data,value_filter);

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form363_ini();
			});
		};

		function form363_ini()
		{
			show_loader();
			var fid=$("#form363_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form363_body').html("");

			var filter_fields=document.getElementById('form363_header');
			var fcustomer=filter_fields.elements['name'].value;
			var fattribute=filter_fields.elements['attribute'].value;
			var fvalue=filter_fields.elements['value'].value;

			var paginator=$('#form363_body').paginator();

			var new_columns={count:paginator.page_size(),
							start_index:paginator.get_index(),
							data_store:'attributes',
							indexes:[{index:'id',value:fid},
									{index:'name',value:fcustomer},
									{index:'type',exact:'customer'},
									{index:'attribute',value:fattribute},
									{index:'value',value:fvalue}]};

			read_json_rows('form363',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form363_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<a onclick=\"show_object('customers','"+result.name+"');\"><textarea readonly='readonly' form='form363_"+result.id+"'>"+result.name+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Attribute'>";
								rowsHTML+="<textarea readonly='readonly' form='form363_"+result.id+"'>"+result.attribute+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Value'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form363_"+result.id+"'>"+result.value+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form363_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' name='save' form='form363_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' name='delete' form='form363_"+result.id+"' title='Delete' onclick='form363_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form363_body').append(rowsHTML);
					var fields=document.getElementById("form363_"+result.id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form363_update_item(fields);
					});
				});

				$('#form363').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Customer Attributes','form363',function (item){});
				hide_loader();
			});
		};

		function form363_add_item()
		{
			if(is_create_access('form363'))
			{
				var id=vUtil.newKey();
				var rowsHTML="<tr>";
				rowsHTML+="<form id='form363_"+id+"' autocomplete='off'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' form='form363_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Attribute'>";
						rowsHTML+="<input type='text' form='form363_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Value'>";
						rowsHTML+="<textarea class='dblclick_editable' form='form363_"+id+"' required></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form363_"+id+"' value='"+id+"'>";
						rowsHTML+="<button type='submit' class='btn green' form='form363_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
						rowsHTML+="<button type='button' class='btn red' form='form363_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
					rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form363_body').prepend(rowsHTML);
				var fields=document.getElementById("form363_"+id);
				var customer_filter=fields.elements[0];
				var attribute_filter=fields.elements[1];

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form363_create_item(fields);
				});

				var customer_data={data_store:'customers',return_column:'acc_name'};
				set_my_value_list_json(customer_data,customer_filter,function ()
				{
					$(customer_filter).focus();
				});

				var attribute_data={data_store:'attributes',return_column:'attribute',
											indexes:[{index:'type',exact:'customer'}]};
				set_my_filter_json(attribute_data,attribute_filter);

				$('#form363').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form363_create_item(form)
		{
			if(is_create_access('form363'))
			{
				var customer=form.elements[0].value;
				var attribute=form.elements[1].value;
				var value=form.elements[2].value;
				var data_id=form.elements[3].value;
				var last_updated=get_my_time();

				var data_json={data_store:'attributes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:customer},
	 					{index:'type',value:'customer'},
	 					{index:'attribute',value:attribute},
	 					{index:'value',value:value},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Attribute for customer '+customer,link_to:'form363'}};
				create_json(data_json);

				$(form).readonly();

				var del_button=form.elements[5];
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form363_delete_item(del_button);
				});

				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form363_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form363_update_item(form)
		{
			if(is_update_access('form363'))
			{
				var customer=form.elements[0].value;
				var attribute=form.elements[1].value;
				var value=form.elements[2].value;
				var data_id=form.elements[3].value;
				var last_updated=get_my_time();
				var data_json={data_store:'attributes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:customer},
	 					{index:'type',value:'customer'},
	 					{index:'attribute',value:attribute},
	 					{index:'value',value:value},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Attribute for customer '+customer,link_to:'form363'}};

				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form363_delete_item(button)
		{
			if(is_delete_access('form363'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);

					var customer=form.elements[0].value;
					var attribute=form.elements[1].value;
					var value=form.elements[2].value;
					var data_id=form.elements[3].value;
					var last_updated=get_my_time();

					var data_json={data_store:'attributes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id}],
	 				log_data:{title:'Deleted',notes:'Attribute for customer '+customer,link_to:'form363'}};

					delete_json(data_json);
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
