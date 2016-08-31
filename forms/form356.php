<div id='form356' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form356_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form356_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form356_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form356_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form356_upload' onclick=modal23_action(form356_import_template,form356_import,form356_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form356_header'></form>
						<th><input type='text' placeholder="Table" class='floatlabel' name='table' form='form356_header'></th>
						<th><input type='text' placeholder="Field" class='floatlabel' name='field' form='form356_header'></th>
						<th><input type='submit' form='form356_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form356_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form356_header_ini()
		{
			var filter_fields=document.getElementById('form356_header');
			var table_filter=filter_fields.elements['table'];
			var field_filter=filter_fields.elements['field'];

			var table_data={data_store:'user_fields_list',return_column:'tablename'};
			var field_data={data_store:'user_fields_list',return_column:'field_name'};

			set_my_filter_json(table_data,table_filter);
			set_my_filter_json(field_data,field_filter);

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form356_ini();
			});
		};

		function form356_ini()
		{
			show_loader();
			var fid=$("#form356_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form356_body').html("");

			var filter_fields=document.getElementById('form356_header');
			var ftable=filter_fields.elements['table'].value;
			var ffield=filter_fields.elements['field'].value;

			var paginator=$('#form356_body').paginator();

			var new_columns={count:paginator.page_size(),
							start_index:paginator.get_index(),
							data_store:'user_fields_list',
							indexes:[{index:'id',value:fid},
									{index:'tablename',value:ftable},
									{index:'field_name',value:ffield}]};

			read_json_rows('form356',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form356_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Table'>";
								rowsHTML+="<textarea readonly='readonly' form='form356_"+result.id+"'>"+result.tablename+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Field'>";
								rowsHTML+="<textarea readonly='readonly' form='form356_"+result.id+"'>"+result.field_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form356_"+result.id+"' value='"+result.id+"' name='id'>";
								rowsHTML+="<button type='button' class='btn red' name='delete' form='form356_"+result.id+"' title='Delete' onclick='form356_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form356_body').append(rowsHTML);
				});

				$('#form356').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'User Fields Settings','form356',function (item){});
				hide_loader();
			});
		};

		function form356_add_item()
		{
			if(is_create_access('form356'))
			{
				var id=vUtil.newKey();
				var rowsHTML="<tr>";
				rowsHTML+="<form id='form356_"+id+"' autocomplete='off'></form>";
					rowsHTML+="<td data-th='Table'>";
						rowsHTML+="<input type='text' form='form356_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Field'>";
						rowsHTML+="<input type='text' form='form356_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' name='id' form='form356_"+id+"' value='"+id+"'>";
						rowsHTML+="<button type='submit' class='btn green' form='form356_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
						rowsHTML+="<button type='button' class='btn red' name='delete' form='form356_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
					rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form356_body').prepend(rowsHTML);
				var fields=document.getElementById("form356_"+id);
				var table_filter=fields.elements[0];
				var field_filter=fields.elements[1];

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form356_create_item(fields);
				});

				var table_data={data_store:'user_fields_list',return_column:'tablename'};
				set_my_filter_json(table_data,table_filter,function ()
				{
					$(table_filter).focus();
				});

				var field_data={data_store:'user_fields_list',return_column:'field_name'};
				set_my_filter_json(field_data,field_filter);

				$('#form356').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form356_create_item(form)
		{
			if(is_create_access('form356'))
			{
				var table=form.elements[0].value;
				var field=form.elements[1].value;
				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();

				var data_json={data_store:'user_fields_list',
	 				data:[{index:'id',value:data_id},
	 					{index:'tablename',value:table,uniqueWith:['field_name']},
	 					{index:'field_name',value:field},
	 					{index:'status',value:'active'},
	 					{index:'last_updated',value:last_updated}]};
				create_json(data_json);

				$(form).readonly();

				var del_button=form.elements['delete'];
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form356_delete_item(del_button);
				});

				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form356_delete_item(button)
		{
			if(is_delete_access('form356'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);

					var data_id=form.elements['id'].value;

					var data_json={data_store:'user_fields_list',
	 					data:[{index:'id',value:data_id}]};

					delete_json(data_json);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form356_import_template()
		{
			var data_array=['id','tablename','field_name'];
			vUtil.arrayToCSV(data_array);
		};

		function form356_import_validate(data_array)
		{
			var validate_template_array=[{column:'tablename',required:'yes',regex:new RegExp('^[0-9a-zA-Z_]+$')},
									{column:'field_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z_]+$')}];

			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;
		}

		function form356_import(data_array,import_type)
		{
			var data_json={data_store:'user_fields_list',
 					data:[]};

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
	 					{index:'tablename',value:row.tablename},
	 					{index:'field_name',value:row.field_name},
	 					{index:'status',value:'active'},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
			});

			if(import_type=='create_new')
			{
				if(is_create_access('form356')){
					create_batch_json(data_json);
				}
				else {
					$("#modal2_link").click();
				}
			}
			else
			{
				if(is_update_access('form356'))
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
