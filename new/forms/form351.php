<div id='form351' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal217_action();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form351_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form351_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form351_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form351_upload' onclick=modal23_action(form351_import_template,form351_import,form351_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form351_header'></form>
						<th><input type='text' placeholder="Policy Name" class='floatlabel' name='name' form='form351_header'></th>
            			<th><input type='text' placeholder="Policy Type" class='floatlabel' name='type' form='form351_header'></th>
						<th><input type='text' placeholder="Provider" class='floatlabel' name='provider' form='form351_header'></th>
						<th><input type='text' placeholder="Description" class='floatlabel' name='description' form='form351_header'></th>
						<th><input type='submit' form='form351_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form351_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form351_header_ini()
		{
			var filter_fields=document.getElementById('form351_header');

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form351_ini();
			});
		};

		function form351_ini()
		{
			show_loader();
			var fid=$("#form351_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form351_body').html("");

			var filter_fields=document.getElementById('form351_header');
			var fname=filter_fields.elements['name'].value;
      		var ftype=filter_fields.elements['type'].value;
			var fprovider=filter_fields.elements['provider'].value;
			var fdesc=filter_fields.elements['description'].value;

			var paginator=$('#form351_body').paginator();

			var new_columns={count:paginator.page_size(),
					            start_index:paginator.get_index(),
					            data_store:'policy_types',
					            indexes:[{index:'id',value:fid},
            									{index:'name',value:fname},
                              {index:'type',value:ftype},
            									{index:'issuer',value:fprovider},
            									{index:'description',value:fdesc}]};

			read_json_rows('form351',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form351_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<textarea readonly='readonly' form='form351_"+result.id+"'>"+result.name+"</textarea>";
							rowsHTML+="</td>";
              rowsHTML+="<td data-th='Type'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form351_"+result.id+"' value='"+result.type+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Provider'>";
								rowsHTML+="<textarea readonly='readonly' form='form351_"+result.id+"'>"+result.issuer+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form351_"+result.id+"'>"+result.description+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form351_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' name='save' form='form351_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' name='delete' form='form351_"+result.id+"' title='Delete' onclick='form351_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form351_body').append(rowsHTML);
					var fields=document.getElementById("form351_"+result.id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form351_update_item(fields);
					});
				});

				$('#form351').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Policy Types','form351',function (item){});
				hide_loader();
			});
		};

		function form351_update_item(form)
		{
			if(is_update_access('form351'))
			{
				var name=form.elements[0].value;
				var desc=form.elements[3].value;
				var data_id=form.elements[4].value;
				var last_updated=get_my_time();
				var data_json={data_store:'policy_types',
	 				data:[{index:'id',value:data_id},
	 					{index:'description',value:desc},
	 					{index:'last_updated',value:last_updated}]};
				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form351_delete_item(button)
		{
			if(is_delete_access('form351'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);

					var name=form.elements[0].value;
					var provider=form.elements[2].value;
					var data_id=form.elements[4].value;
					var last_updated=get_my_time();

					var data_json={data_store:'policy_types',
	 				log:'yes',
	 				data:[{index:'id',value:data_id}],
	 				log_data:{title:'Deleted',notes:'Policy type '+name+' from '+provider,link_to:'form351'}};

					delete_json(data_json);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form351_import_template()
		{
			var data_array=['id','name','type','issuer','description'];
			my_array_to_csv(data_array);
		};

		function form351_import_validate(data_array)
		{
			var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
                                  {column:'type',required:'yes',list:['health','life','car']},
                                  {column:'issuer',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
                									{column:'description',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')}];

			var error_array=validate_import_array(data_array,validate_template_array);
			return error_array;
		}

		function form351_import(data_array,import_type)
		{
			var data_json={data_store:'policy_types',
 					log:'yes',
 					data:[],
 					log_data:{title:'Policy Types',link_to:'form351'}};

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
	 					{index:'type',value:row.type},
	 					{index:'issuer',value:row.issuer},
	 					{index:'description',value:row.description},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
			});

			if(import_type=='create_new')
			{
				create_batch_json(data_json);
			}
			else
			{
				update_batch_json(data_json);
			}
		};

	</script>
</div>
