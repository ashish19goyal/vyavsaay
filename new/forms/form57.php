<div id='form57' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal20_action();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form57_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form57_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form57_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form57_upload' onclick=modal23_action(form57_import_template,form57_import,form57_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form57_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form57_header'></th>
						<th><input type='text' placeholder="Description" class='floatlabel' name='desc' form='form57_header'></th>
						<th><input type='text' placeholder="Price" readonly='readonly' form='form57_header'></th>
						<th><input type='text' placeholder="Tax (in %)" readonly='readonly' form='form57_header'></th>
						<th><input type='submit' form='form57_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form57_body'>
			</tbody>
		</table>
	</div>

	<script>
	function form57_header_ini()
	{
		var filter_fields=document.getElementById('form57_header');
		var service_filter=filter_fields.elements['name'];

		var service_data={data_store:'services',return_column:'name'};
		set_my_filter_json(service_data,service_filter);

		$(filter_fields).off('submit');
		$(filter_fields).on('submit',function(event)
		{
			event.preventDefault();
			form57_ini();
		});
	};

	function form57_ini()
	{
		show_loader();
		var fid=$("#form57_link").attr('data_id');
		if(fid==null)
			fid="";

		$('#form57_body').html("");

		var filter_fields=document.getElementById('form57_header');
		var fservices=filter_fields.elements['name'].value;
		var fdesc=filter_fields.elements['desc'].value;

		var paginator=$('#form57_body').paginator();

		var new_columns={count:paginator.page_size(),
						start_index:paginator.get_index(),
						data_store:'services',
						indexes:[{index:'id',value:fid},
								{index:'name',value:fservices},
								{index:'description',value:fdesc},
								{index:'price'},
								{index:'tax'}]};

		read_json_rows('form57',new_columns,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="<tr>";
					rowsHTML+="<form id='form57_"+result.id+"'></form>";
						rowsHTML+="<td data-th='Name'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form57_"+result.id+"' value='"+result.name+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Description'>";
							rowsHTML+="<textarea readonly='readonly' form='form57_"+result.id+"' class='dblclick_editable'>"+result.description+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="<input type='number' readonly='readonly' step='any' form='form57_"+result.id+"' class='dblclick_editable' value='"+result.price+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Tax(in %)'>";
							rowsHTML+="<input type='number' readonly='readonly' form='form57_"+result.id+"' step='any' class='dblclick_editable' value='"+result.tax+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form57_"+result.id+"' value='"+result.id+"' name='id'>";
							rowsHTML+="<button type='submit' class='btn green' name='save' form='form57_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
							rowsHTML+="<button type='button' class='btn red' name='delete' form='form57_"+result.id+"' title='Delete' onclick='form57_delete_item($(this));'><i class='fa fa-trash'></i></button>";
						rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form57_body').append(rowsHTML);
				var fields=document.getElementById("form57_"+result.id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form57_update_item(fields);
				});
			});

			$('#form57').formcontrol();
			paginator.update_index(results.length);
			initialize_tabular_report_buttons(new_columns,'Services','form57',function (item){});
			hide_loader();
		});
	};

	function form57_update_item(form)
	{
		if(is_update_access('form57'))
		{
			var service=form.elements[0].value;
			var description=form.elements[1].value;
			var price=form.elements[2].value;
			var tax=form.elements[3].value;
			var data_id=form.elements[4].value;
			var last_updated=get_my_time();

			var data_json={data_store:'services',
				log:'yes',
				data:[{index:'id',value:data_id},
					{index:'description',value:description},
					{index:'price',value:price},
					{index:'tax',value:tax},
					{index:'last_updated',value:last_updated}],
				log_data:{title:'updated',notes:'Service '+service,link_to:'form57'}};

			update_json(data_json);
			$(form).readonly();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form57_delete_item(button)
	{
		if(is_delete_access('form57'))
		{
			modal115_action(function()
			{
				var form_id=$(button).attr('form');
				var form=document.getElementById(form_id);

				var service=form.elements[0].value;
				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();

				var data_json={data_store:'services',
						log:'yes',
						data:[{index:'id',value:data_id}],
						log_data:{title:'Deleted',notes:'Service '+service,link_to:'form57'}};

				var requisite_json={data_store:'pre_requisites',
						data:[{index:'name',value:service},
							{index:'type',exact:'service'}]};

				var attribute_json={data_store:'attributes',
						data:[{index:'name',value:service},
							{index:'type',exact:'service'}]};

				delete_json(data_json);
				delete_json(requisite_json);
				delete_json(attribute_json);

				$(button).parent().parent().remove();
			});
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form57_import_template()
	{
		var data_array=['id','name','description','price','tax'];
		my_array_to_csv(data_array);
	};

	function form57_import_validate(data_array)
	{
		var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
								{column:'description',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
								{column:'price',required:'yes',regex:new RegExp('^[0-9. ]+$')},
								{column:'tax',required:'yes',regex:new RegExp('^[0-9. ]+$')}];

		var error_array=vImport.validate(data_array,validate_template_array);
		return error_array;
	}

	function form57_import(data_array,import_type)
	{
		var data_json={data_store:'services',
				log:'yes',
				data:[],
				log_data:{title:'Services',link_to:'form57'}};

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
					{index:'description',value:description},
					{index:'price',value:row.price},
					{index:'tax',value:row.tax},
					{index:'last_updated',value:last_updated}];

			data_json.data.push(data_json_array);
		});

		if(import_type=='create_new')
		{
			if(is_create_access('form57')){
				create_batch_json(data_json);
			}
			else {
				$("#modal2_link").click();
			}
		}
		else
		{
			if(is_update_access('form57'))
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
