<div id='form96' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form96_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form96_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form96_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form96_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form96_upload' onclick=modal23_action(form96_import_template,form96_import,form96_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form96_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form96_header'></th>
						<th><input type='text' placeholder="Attribute" class='floatlabel' name='attribute' form='form96_header'></th>
						<th><input type='text' placeholder="Value" class='floatlabel' name='value' form='form96_header'></th>
						<th><input type='submit' form='form96_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form96_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form96_header_ini()
		{
			var filter_fields=document.getElementById('form96_header');
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
				form96_ini();
			});
		};

		function form96_ini()
		{
			show_loader();
			var fid=$("#form96_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form96_body').html("");

			var filter_fields=document.getElementById('form96_header');
			var fcustomer=filter_fields.elements['name'].value;
			var fattribute=filter_fields.elements['attribute'].value;
			var fvalue=filter_fields.elements['value'].value;

			var paginator=$('#form96_body').paginator();

			var new_columns={count:paginator.page_size(),
							start_index:paginator.get_index(),
							data_store:'attributes',
							indexes:[{index:'id',value:fid},
									{index:'name',value:fcustomer},
									{index:'type',exact:'customer'},
									{index:'attribute',value:fattribute},
									{index:'value',value:fvalue}]};

			read_json_rows('form96',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form96_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<a onclick=\"show_object('customers','"+result.name+"');\"><textarea readonly='readonly' form='form96_"+result.id+"'>"+result.name+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Attribute'>";
								rowsHTML+="<textarea readonly='readonly' form='form96_"+result.id+"'>"+result.attribute+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Value'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form96_"+result.id+"'>"+result.value+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form96_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' name='save' form='form96_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' name='delete' form='form96_"+result.id+"' title='Delete' onclick='form96_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form96_body').append(rowsHTML);
					var fields=document.getElementById("form96_"+result.id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form96_update_item(fields);
					});
				});

				$('#form96').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Customer Attributes','form96',function (item){});
				hide_loader();
			});
		};

		function form96_add_item()
		{
			if(is_create_access('form96'))
			{
				var id=get_new_key();
				var rowsHTML="<tr>";
				rowsHTML+="<form id='form96_"+id+"' autocomplete='off'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' form='form96_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Attribute'>";
						rowsHTML+="<input type='text' form='form96_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Value'>";
						rowsHTML+="<textarea class='dblclick_editable' form='form96_"+id+"' required></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form96_"+id+"' value='"+id+"'>";
						rowsHTML+="<button type='submit' class='btn green' form='form96_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
						rowsHTML+="<button type='button' class='btn red' form='form96_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
					rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form96_body').prepend(rowsHTML);
				var fields=document.getElementById("form96_"+id);
				var customer_filter=fields.elements[0];
				var attribute_filter=fields.elements[1];

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form96_create_item(fields);
				});

				var customer_data={data_store:'customers',return_column:'acc_name'};
				set_my_value_list_json(customer_data,customer_filter,function ()
				{
					$(customer_filter).focus();
				});

				var attribute_data={data_store:'attributes',return_column:'attribute',
											indexes:[{index:'type',exact:'customer'}]};
				set_my_filter_json(attribute_data,attribute_filter);

				$('#form96').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form96_create_item(form)
		{
			if(is_create_access('form96'))
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
	 				log_data:{title:'Added',notes:'Attribute for customer '+customer,link_to:'form96'}};
				create_json(data_json);

				$(form).readonly();

				var del_button=form.elements[5];
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form96_delete_item(del_button);
				});

				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form96_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form96_update_item(form)
		{
			if(is_update_access('form96'))
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
	 				log_data:{title:'Updated',notes:'Attribute for customer '+customer,link_to:'form96'}};

				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form96_delete_item(button)
		{
			if(is_delete_access('form96'))
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
	 				log_data:{title:'Deleted',notes:'Attribute for customer '+customer,link_to:'form96'}};

					delete_json(data_json);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form96_import_template()
		{
			var data_array=['id','name','attribute','value'];
			my_array_to_csv(data_array);
		};

		function form96_import_validate(data_array)
		{
			var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'attribute',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'value',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')}];

			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;
		}

		function form96_import(data_array,import_type)
		{
			var data_json={data_store:'attributes',
 					log:'yes',
 					data:[],
 					log_data:{title:'Attributes for customers',link_to:'form96'}};

			var counter=1;
			var last_updated=get_my_time();

			data_array.forEach(function(row)
			{
				counter+=1;
				if(import_type=='create_new')
				{
					row.id=last_updated+counter;
				}

				var data_json_array=[{index:'id',value:row.id},
	 					{index:'name',value:row.name},
	 					{index:'type',value:'customer'},
	 					{index:'attribute',value:row.attribute},
	 					{index:'value',value:row.value},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
			});

			if(import_type=='create_new')
			{
				if(is_create_access('form96')){
					create_batch_json(data_json);
				}
				else {
					$("#modal2_link").click();
				}
			}
			else
			{
				if(is_update_access('form96'))
				{
					update_batch_json(data_json);
				}
				else{
					$("#modal2_link").click();
				}
			}
		};

	</script>
</div>
