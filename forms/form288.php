<div id='form288' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form288_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form288_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form288_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form288_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form288_upload' onclick=modal23_action(form288_import_template,form288_import,form288_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form288_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form288_header'></th>
						<th><input type='text' placeholder="Description" class='floatlabel' name='desc' form='form288_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form288_header'></th>
						<th><input type='text' placeholder="Content" readonly="readonly" name='content' form='form288_header'></th>
						<th><input type='submit' form='form288_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form288_body'>
			</tbody>
		</table>
	</div>

	<script>
        function form288_header_ini()
		{
			var form=document.getElementById('form288_header');
			var name_filter=form.elements['name'];
			var desc_filter=form.elements['desc'];
			var status_filter=form.elements['status'];

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form288_ini();
			});
			set_static_filter_json('system_overwrite_func','status',status_filter);
		}

		function form288_ini()
		{
			var fid=$("#form288_link").attr('data_id');
			if(fid==null)
				fid="";

			var form=document.getElementById('form288_header');
			var name_filter=form.elements['name'].value;
			var status_filter=form.elements['status'].value;
			var desc_filter=form.elements['desc'].value;

			show_loader();
			$('#form288_body').html('');

			var paginator=$('#form288_body').paginator();

			var overwrite_data=new Object();
					overwrite_data.count=paginator.page_size();
					overwrite_data.start_index=paginator.get_index();
					overwrite_data.data_store='system_overwrite_func';

					overwrite_data.indexes=[{index:'id',value:fid},
									{index:'name',value:name_filter},
									{index:'description',value:desc_filter},
									{index:'function_def'},
									{index:'status',value:status_filter}];

			read_json_rows('form288',overwrite_data,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form288_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form288_"+result.id+"' value='"+result.name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea class='dblclick_editable' form='form288_"+result.id+"'>"+result.description+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select class='dblclick_editable' form='form288_"+result.id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form288_"+result.id+"' onclick=\"modal186_action('"+result.id+"');\">Function</button>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form288_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form288_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form288_"+result.id+"' title='Delete' onclick='form288_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form288_body').append(rowsHTML);
					var fields=document.getElementById("form288_"+result.id);
					var status_filter=fields.elements[2];

					set_static_select('system_overwrite_func','status',status_filter,function ()
					{
						$(status_filter).selectpicker('val',result.status);
					});

					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form288_update_item(fields);
					});
				});

				$('#form288').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:overwrite_data,file:'Overwrite Functions',report_id:'form288'});
				hide_loader();
			});
		};

		function form288_add_item()
		{
			if(is_create_access('form288'))
			{
				var id=vUtil.newKey();
				var rowsHTML="<tr>";
						rowsHTML+="<form id='form288_"+id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<input type='text' required form='form288_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea class='dblclick_editable' form='form288_"+id+"'></textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select data-style='btn-info' required class='dblclick_editable' form='form288_"+id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form288_"+id+"'>Function</button>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form288_"+id+"' value='"+id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form288_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form288_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

				$('#form288_body').prepend(rowsHTML);

				var fields=document.getElementById("form288_"+id);
				var name_filter=fields.elements[0];
				var status_filter=fields.elements[2];

				$(name_filter).focus();

				set_static_select('system_overwrite_func','status',status_filter);

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form288_create_item(fields);
				});
				$('#form288').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form288_create_item(form)
		{
			if(is_create_access('form288'))
			{
				var name=form.elements[0].value;
				var description=form.elements[1].value;
				var status=$(form.elements[2]).val();
				var func_button=form.elements[3];
				var data_id=form.elements[4].value;
				var del_button=form.elements[6];

				var last_updated=get_my_time();

				var data_json={data_store:'system_overwrite_func',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'description',value:description},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Overwrite function '+name,link_to:'form288'}};

				create_json(data_json);

				$(form).readonly();

				$(func_button).on('click',function ()
				{
					modal186_action(data_id);
				});

				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form288_delete_item(del_button);
				});

				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form288_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form288_update_item(form)
		{
			if(is_update_access('form288'))
			{
				var name=form.elements[0].value;
				var description=form.elements[1].value;
				var status=$(form.elements[2]).val();
				var data_id=form.elements[4].value;
				var del_button=form.elements[6];

				var last_updated=get_my_time();

				var data_json={data_store:'system_overwrite_func',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'description',value:description},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Overwrite function '+name,link_to:'form288'}};
 				update_json(data_json);

				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form288_delete_item(button)
		{
			if(is_delete_access('form288'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var name=form.elements[0].value;
					var data_id=form.elements[4].value;
					var data_json={data_store:'system_overwrite_func',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Overwrite function "+name,link_to:"form288"}};

					delete_json(data_json);

					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form288_import_template()
		{
			var data_array=['id','name','description','function_def','status'];
			vUtil.arrayToCSV(data_array);
		};

		function form288_import_validate(data_array)
		{
			var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z_-]+$')},
									{column:'description',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
									{column:'status',required:'yes',list:['active','inactive']}];

			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;
		}

		function form288_import(data_array,import_type)
		{
			var data_json={data_store:'system_overwrite_func',
					loader:'yes',
					log:'yes',
					data:[],
					log_data:{title:'Overwrite function for system configuration',link_to:'form288'}};

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
						{index:'description',value:row.description},
						{index:'function_def',value:row.function_def},
						{index:'status',value:row.status},
						{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
			});

			if(import_type=='create_new')
			{
				if(is_create_access('form288'))
            	{
					create_batch_json(data_json);
				}
				else
				{
					$("#modal2_link").click();
				}
			}
			else
			{
				if(is_update_access('form288'))
            	{
            		update_batch_json(data_json);
				}
				else
				{
					$("#modal2_link").click();
				}
			}
		};

	</script>
</div>
