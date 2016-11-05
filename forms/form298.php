<div id='form298' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form298_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form298_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form298_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form298_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form298_upload' onclick=modal23_action(form298_import_template,form298_import,form298_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form298_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form298_header'></th>
						<th><input type='text' placeholder="Description" class='floatlabel' name='desc' form='form298_header'></th>
						<th><input type='text' placeholder="Markers" readonly="readonly" name='markers' form='form298_header'></th>
						<th><input type='text' placeholder="Design" readonly="readonly" name='design' form='form298_header'></th>
						<th><input type='text' placeholder="Images" readonly="readonly" name='images' form='form298_header'></th>
						<th><input type='submit' form='form298_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form298_body'>
			</tbody>
		</table>
	</div>

	<script>

		function form298_header_ini()
		{
			var form=document.getElementById('form298_header');

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form298_ini();
			});
		}

		function form298_ini()
		{
			var fid=$("#form298_link").attr('data_id');
			if(fid==null)
				fid="";

			var form=document.getElementById('form298_header');
			var name_filter=form.elements['name'].value;
			var desc_filter=form.elements['desc'].value;

			show_loader();
			$('#form298_body').html('');

			var paginator=$('#form298_body').paginator();

			var overwrite_data=new Object();
					overwrite_data.count=paginator.page_size();
					overwrite_data.start_index=paginator.get_index();
					overwrite_data.data_store='newsletter_components';

					overwrite_data.indexes=[{index:'id',value:fid},
									{index:'name',value:name_filter},
									{index:'detail',value:desc_filter},
									{index:'html_code'},
									{index:'preview'},
									{index:'markers'}];

			read_json_rows('form298',overwrite_data,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form298_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form298_"+result.id+"' value='"+result.name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form298_"+result.id+"'>"+result.detail+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Markers'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form298_"+result.id+"'>"+result.markers+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Design'>";
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form298_"+result.id+"' onclick=\"modal180_action('"+result.id+"','"+result.name+"','master');\">Code</button>";
								rowsHTML+="<button type='button' class='btn default yellow-stripe' form='form298_"+result.id+"' onclick=\"modal181_action('"+result.id+"','"+result.preview+"');\">Preview</button>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Images'>";
								rowsHTML+="<button type='button' class='btn default green-stripe' form='form298_"+result.id+"'>Add Image</button>";
								rowsHTML+="<div id='form298_images_"+result.id+"'></div>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form298_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form298_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button class='btn red' form='form298_"+result.id+"' title='Delete' onclick='form298_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form298_body').append(rowsHTML);
					var fields=document.getElementById("form298_"+result.id);
					var img_button=fields.elements[5];

					$(img_button).on('click',function ()
					{
						modal176_action(result.id,'newsletter_components',function (pic_id,url,doc_name)
						{
							var docHTML="<a href='"+url+"' download='"+doc_name+"'><u>"+doc_name+"</u></a><br>";
							var doc_container=document.getElementById('form298_images_'+result.id);
							$(doc_container).append(docHTML);
						});
					});

					var doc_columns=new Object();
						doc_columns.data_store='documents';
						doc_columns.indexes=[{index:'id'},
											{index:'url'},
											{index:'doc_name'},
											{index:'doc_type',exact:'newsletter_components'},
											{index:'target_id',exact:result.id}];

					read_json_rows('form298',doc_columns,function(doc_results)
					{
						var docHTML="";
						for (var j in doc_results)
						{
							var updated_url=doc_results[j].url.replace(/ /g,"+");
							docHTML+="<a href='"+updated_url+"' download='"+doc_results[j].doc_name+"'><u>"+doc_results[j].doc_name+"</u></a><br>";
						}
						document.getElementById('form298_images_'+result.id).innerHTML=docHTML;
					});

					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form298_update_item(fields);
					});
				});

				$('#form298').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:overwrite_data,file:'Newsletter Components',report_id:'form298'});
				hide_loader();
			});
		};

		function form298_add_item()
		{
			if(is_create_access('form298'))
			{
				var id=vUtil.newKey();
				var rowsHTML="<tr>";
					rowsHTML+="<form id='form298_"+id+"'></form>";
						rowsHTML+="<td data-th='Name'>";
							rowsHTML+="<input type='text' form='form298_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Description'>";
							rowsHTML+="<textarea class='dblclick_editable' form='form298_"+id+"'></textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Markers'>";
							rowsHTML+="<textarea class='dblclick_editable' form='form298_"+id+"'></textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Design'>";
							rowsHTML+="<button type='button' class='btn default purple-stripe' form='form298_"+id+"'>Code</button>";
							rowsHTML+="<button type='button' class='btn default yellow-stripe' form='form298_"+id+"'>Preview</button>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Images'>";
							rowsHTML+="<button type='button' class='btn default green-stripe' form='form298_"+id+"'>Add Image</button>";
							rowsHTML+="<div id='form298_images_"+id+"'></div>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form298_"+id+"' value='"+id+"'>";
							rowsHTML+="<button type='submit' class='btn green' form='form298_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
							rowsHTML+="<button class='btn red' form='form298_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
						rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form298_body').prepend(rowsHTML);
				var fields=document.getElementById("form298_"+id);
				var img_button=fields.elements[5];

				$(img_button).on('click',function ()
				{
					modal176_action(result.id,'newsletter_components',function (pic_id,url,doc_name)
					{
						var docHTML="<a href='"+url+"' download='"+doc_name+"'><u>"+doc_name+"</u></a><br>";
						var doc_container=document.getElementById('form298_images_'+id);
						$(doc_container).append(docHTML);
					});
				});

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form298_create_item(fields);
				});
				$('#form298').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form298_create_item(form)
		{
			if(is_create_access('form298'))
			{
				var name=form.elements[0].value;
				var description=form.elements[1].value;
				var markers=form.elements[2].value;
				var code_button=form.elements[3];
				var preview_button=form.elements[4];
				var data_id=form.elements[6].value;
				var del_button=form.elements[8];

				var last_updated=get_my_time();

				var data_json={data_store:'newsletter_components',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'detail',value:description},
	 					{index:'markers',value:markers},
	 					{index:'last_updated',value:last_updated}]};

				create_json(data_json);

				$(form).readonly();

				$(code_button).on('click',function ()
				{
					modal180_action(data_id,name,'master');
				});

				$(preview_button).on('click',function ()
				{
					modal181_action(data_id,'');
				});

				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form298_delete_item(del_button);
				});

				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form298_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form298_update_item(form)
		{
			if(is_update_access('form298'))
			{
				var name=form.elements[0].value;
				var description=form.elements[1].value;
				var markers=form.elements[2].value;
				var code_button=form.elements[3];
				var preview_button=form.elements[3];
				var data_id=form.elements[6].value;
				var del_button=form.elements[8];

				var last_updated=get_my_time();

				var data_json={data_store:'newsletter_components',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'detail',value:description},
	 					{index:'markers',value:markers},
	 					{index:'last_updated',value:last_updated}]};

				update_json(data_json);

				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form298_delete_item(button)
		{
			if(is_delete_access('form298'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);

					var name=form.elements[0].value;
					var data_id=form.elements[6].value;
					var data_json={data_store:'newsletter_components',
 							data:[{index:'id',value:data_id}]};
					var data2_json={data_store:'documents',
 							data:[{index:'target_id',value:data_id},{index:'doc_type',value:'newsletter_components'}]};

					delete_json(data_json);
					delete_json(data2_json);

					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form298_import_validate(data_array)
		{
			var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,\'()-]+$')},
									{column:'detail',regex:new RegExp('^[0-9a-zA-Z _.,\\<>\'+@!$#%\*()-]+$')},
									{column:'html_code',required:'yes'}];

			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;
		}

		function form298_import_template()
		{
			var data_array=['id','name','detail','html_code','markers'];
			vUtil.arrayToCSV(data_array);
		};

		function form298_import(data_array,import_type)
		{
			var data_json={data_store:'newsletter_components',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Templates for designing newsletters',link_to:'form298'}};

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
	 					{index:'detail',value:row.detail},
	 					{index:'html_code',value:row.html_code},
	 					{index:'markers',value:row.markers},
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
		}
	</script>
</div>
