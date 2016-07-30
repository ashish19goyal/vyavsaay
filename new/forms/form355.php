<div id='form355' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form355_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form355_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form355_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form355_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form355_upload' onclick=modal23_action(form355_import_template,form355_import,form355_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form355_header'></form>
						<th><input type='text' placeholder="Object" class='floatlabel' name='object' form='form355_header'></th>
						<th><input type='text' placeholder="Table" class='floatlabel' name='table' form='form355_header'></th>
						<th><input type='text' placeholder="Field" class='floatlabel' name='field' form='form355_header'></th>
						<th><input type='text' placeholder="Reference Table" class='floatlabel' name='rtable' form='form355_header'></th>
						<th><input type='text' placeholder="Reference Field" class='floatlabel' name='rfield' form='form355_header'></th>
						<th><input type='text' placeholder="Modify" class='floatlabel' name='action' form='form355_header'></th>
						<th><input type='submit' form='form355_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form355_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form355_header_ini()
		{
			var filter_fields=document.getElementById('form355_header');
			var object_filter=filter_fields.elements['object'];
			var table_filter=filter_fields.elements['table'];
			var field_filter=filter_fields.elements['field'];
			var rtable_filter=filter_fields.elements['rtable'];
			var rfield_filter=filter_fields.elements['rfield'];
			var action_filter=filter_fields.elements['action'];

			var object_data={data_store:'de_duplication_ref',return_column:'object'};
			var table_data={data_store:'de_duplication_ref',return_column:'tablename'};
			var field_data={data_store:'de_duplication_ref',return_column:'keycolumn'};
			var rtable_data={data_store:'de_duplication_ref',return_column:'ref_table'};
			var rfield_data={data_store:'de_duplication_ref',return_column:'ref_field'};

			set_my_filter_json(object_data,object_filter);
			set_my_filter_json(table_data,table_filter);
			set_my_filter_json(field_data,field_filter);
			set_my_filter_json(rtable_data,rtable_filter);
			set_my_filter_json(rfield_data,rfield_filter);
			set_static_filter_json('de_duplication_ref','action',action_filter);

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form355_ini();
			});
		};

		function form355_ini()
		{
			show_loader();
			var fid=$("#form355_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form355_body').html("");

			var filter_fields=document.getElementById('form355_header');
			var fobject=filter_fields.elements['object'].value;
			var ftable=filter_fields.elements['table'].value;
			var ffield=filter_fields.elements['field'].value;
			var rtable=filter_fields.elements['rtable'].value;
			var rfield=filter_fields.elements['rfield'].value;
			var faction=filter_fields.elements['action'].value;

			var paginator=$('#form355_body').paginator();

			var new_columns={count:paginator.page_size(),
							start_index:paginator.get_index(),
							data_store:'de_duplication_ref',
							indexes:[{index:'id',value:fid},
									{index:'object',value:fobject},
									{index:'tablename',value:ftable},
									{index:'keycolumn',value:ffield},
									{index:'ref_table',value:rtable},
									{index:'ref_field',value:rfield},
									{index:'action',value:faction}]};

			read_json_rows('form355',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form355_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Object'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form355_"+result.id+"' value='"+result.object+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Table'>";
								rowsHTML+="<textarea readonly='readonly' form='form355_"+result.id+"'>"+result.tablename+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Field'>";
								rowsHTML+="<textarea readonly='readonly' form='form355_"+result.id+"'>"+result.keycolumn+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Reference Table'>";
								rowsHTML+="<textarea readonly='readonly' form='form355_"+result.id+"'>"+result.ref_table+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Reference Field'>";
								rowsHTML+="<textarea readonly='readonly' form='form355_"+result.id+"'>"+result.ref_field+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Modify'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form355_"+result.id+"' value='"+result.action+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form355_"+result.id+"' value='"+result.id+"' name='id'>";
								rowsHTML+="<button type='button' class='btn red' name='delete' form='form355_"+result.id+"' title='Delete' onclick='form355_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form355_body').append(rowsHTML);
				});

				$('#form355').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Object Rename Setings','form355',function (item){});
				hide_loader();
			});
		};

		function form355_add_item()
		{
			if(is_create_access('form355'))
			{
				var id=get_new_key();
				var rowsHTML="<tr>";
				rowsHTML+="<form id='form355_"+id+"' autocomplete='off'></form>";
					rowsHTML+="<td data-th='Object'>";
						rowsHTML+="<input type='text' form='form355_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Table'>";
						rowsHTML+="<input type='text' form='form355_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Field'>";
						rowsHTML+="<input type='text' form='form355_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Reference Table'>";
						rowsHTML+="<input type='text' form='form355_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Reference Field'>";
						rowsHTML+="<input type='text' form='form355_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Modify'>";
						rowsHTML+="<input type='text' form='form355_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' name='id' form='form355_"+id+"' value='"+id+"'>";
						rowsHTML+="<button type='submit' class='btn green' form='form355_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
						rowsHTML+="<button type='button' class='btn red' name='delete' form='form355_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
					rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form355_body').prepend(rowsHTML);
				var fields=document.getElementById("form355_"+id);
				var object_filter=fields.elements[0];
				var table_filter=fields.elements[1];
				var field_filter=fields.elements[2];
				var action_filter=fields.elements[5];

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form355_create_item(fields);
				});

				var object_data={data_store:'de_duplication_ref',return_column:'object'};
				set_my_filter_json(object_data,object_filter,function ()
				{
					$(object_filter).focus();
				});

				var table_data={data_store:'de_duplication_ref',return_column:'tablename'};
				set_my_filter_json(table_data,table_filter);

				var field_data={data_store:'de_duplication_ref',return_column:'keycolumn'};
				set_my_filter_json(field_data,field_filter);

				set_static_value_list('de_duplication_ref','action',action_filter);

				$('#form355').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form355_create_item(form)
		{
			if(is_create_access('form355'))
			{
				var object=form.elements[0].value;
				var table=form.elements[1].value;
				var field=form.elements[2].value;
				var rtable=form.elements[3].value;
				var rfield=form.elements[4].value;
				var action=form.elements[5].value;

				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();

				var data_json={data_store:'de_duplication_ref',
	 				data:[{index:'id',value:data_id},
						{index:'object',value:object,uniqueWith:['ref_table','ref_field']},
						{index:'tablename',value:table},
	 					{index:'keycolumn',value:field},
						{index:'ref_table',value:rtable},
						{index:'ref_field',value:rfield},
	 					{index:'action',value:action},
	 					{index:'last_updated',value:last_updated}]};
				create_json(data_json);

				$(form).readonly();

				var del_button=form.elements['delete'];
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form355_delete_item(del_button);
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

		function form355_delete_item(button)
		{
			if(is_delete_access('form355'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);

					var data_id=form.elements['id'].value;

					var data_json={data_store:'de_duplication_ref',
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

		function form355_import_template()
		{
			var data_array=['id','object','tablename','keycolumn','ref_table','ref_field','action'];
			my_array_to_csv(data_array);
		};

		function form355_import_validate(data_array)
		{
			var validate_template_array=[{column:'object',required:'yes',regex:new RegExp('^[0-9a-zA-Z_]+$')},
									{column:'tablename',required:'yes',regex:new RegExp('^[0-9a-zA-Z_]+$')},
									{column:'keycolumn',required:'yes',regex:new RegExp('^[0-9a-zA-Z_]+$')},
									{column:'ref_table',required:'yes',regex:new RegExp('^[0-9a-zA-Z_]+$')},
									{column:'ref_field',required:'yes',regex:new RegExp('^[0-9a-zA-Z_]+$')},
									{column:'action',required:'yes',list:['delete','update']}];

			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;
		}

		function form355_import(data_array,import_type)
		{
			var data_json={data_store:'de_duplication_ref',
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
						{index:'object',value:row.object},
						{index:'tablename',value:row.tablename},
	 					{index:'keycolumn',value:row.keycolumn},
						{index:'ref_table',value:row.ref_table},
	 					{index:'ref_field',value:row.ref_field},
	 					{index:'action',value:row.action},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
			});

			if(import_type=='create_new')
			{
				if(is_create_access('form355')){
					create_batch_json(data_json);
				}
				else {
					$("#modal2_link").click();
				}
			}
			else
			{
				if(is_update_access('form355'))
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
