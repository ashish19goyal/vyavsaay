<div id='form347' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form347_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form347_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form347_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form347_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form347_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form347_header'></th>
						<th><input type='text' placeholder="Description" class='floatlabel' name='desc' form='form347_header'></th>
						<th><input type='text' placeholder="Type" class='floatlabel' name='type' form='form347_header'></th>
						<th><input type='text' placeholder="Code" class="floatlabel" name='code' form='form347_header'></th>
						<th><input type='text' placeholder="Markers" class="floatlabel" name='markers' form='form347_header'></th>
						<th><input type='submit' form='form347_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form347_body'>
			</tbody>
		</table>
	</div>

	<script>

		function form347_header_ini()
		{
			var form=document.getElementById('form347_header');
			var type_filter=form.elements['type'];

			set_static_filter_json('tab_components','type',type_filter);

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form347_ini();
			});
		}

		function form347_ini()
		{
			var fid=$("#form347_link").attr('data_id');
			if(fid==null)
				fid="";

			var form=document.getElementById('form347_header');
			var name_filter=form.elements['name'].value;
			var desc_filter=form.elements['desc'].value;
			var type_filter=form.elements['type'].value;
			var code_filter=form.elements['code'].value;
			var marker_filter=form.elements['markers'].value;

			show_loader();
			$('#form347_body').html('');

			var paginator=$('#form347_body').paginator();

			var new_columns={count:paginator.page_size(),
											start_index:paginator.get_index(),
											data_store:'tab_components',
											indexes:[{index:'id',value:fid},
															{index:'name',value:name_filter},
															{index:'description',value:desc_filter},
															{index:'code',value:code_filter},
															{index:'type',value:type_filter},
															{index:'markers',value:marker_filter}]};

			read_json_rows('form347',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form347_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form347_"+result.id+"' value='"+result.name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form347_"+result.id+"'>"+result.description+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Type'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form347_"+result.id+"' value='"+result.type+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Code'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form347_"+result.id+"'>"+result.code+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Markers'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form347_"+result.id+"'>"+result.markers+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form347_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form347_"+result.id+"' title='Save' name='save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button class='btn red' form='form347_"+result.id+"' title='Delete' onclick='form347_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form347_body').append(rowsHTML);
					var fields=document.getElementById("form347_"+result.id);

					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form347_update_item(fields);
					});
				});

				$('#form347').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Tab Components','form347',function (item){});
				hide_loader();
			});
		};

		function form347_add_item()
		{
			if(is_create_access('form347'))
			{
				var id=get_new_key();
				var rowsHTML="<tr>";
					rowsHTML+="<form id='form347_"+id+"'></form>";
						rowsHTML+="<td data-th='Name'>";
							rowsHTML+="<input type='text' required form='form347_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Description'>";
							rowsHTML+="<textarea class='dblclick_editable' form='form347_"+id+"'></textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Type'>";
							rowsHTML+="<input type='text' required class='dblclick_editable' form='form347_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Code'>";
							rowsHTML+="<textarea class='dblclick_editable' required form='form347_"+id+"'></textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Markers'>";
							rowsHTML+="<textarea class='dblclick_editable' form='form347_"+id+"'></textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form347_"+id+"' value='"+id+"'>";
							rowsHTML+="<button type='submit' class='btn green' form='form347_"+id+"' title='Save' name='save'><i class='fa fa-save'></i></button>";
							rowsHTML+="<button class='btn red' form='form347_"+id+"' title='Delete' name='delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
						rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form347_body').prepend(rowsHTML);
				var fields=document.getElementById("form347_"+id);
				var name_filter=fields.elements[0];
				var type_filter=fields.elements[2];

				set_static_filter_json('tab_components','type',type_filter);

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form347_create_item(fields);
				});
				$(name_filter).focus();
				$('#form347').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form347_create_item(form)
		{
			if(is_create_access('form347'))
			{
				var name=form.elements[0].value;
				var description=form.elements[1].value;
				var type=form.elements[2].value;
				var code=form.elements[3].value;
				var markers=form.elements[4].value;
				var data_id=form.elements[5].value;
				var del_button=form.elements['delete'];

				var last_updated=get_my_time();

				var data_json={data_store:'tab_components',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'description',value:description},
	 					{index:'markers',value:markers},
						{index:'type',value:type},
						{index:'code',value:code},
	 					{index:'last_updated',value:last_updated}]};

				create_json(data_json);

				$(form).readonly();

				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form347_delete_item(del_button);
				});

				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form347_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form347_update_item(form)
		{
			if(is_update_access('form347'))
			{
				var name=form.elements[0].value;
				var description=form.elements[1].value;
				var type=form.elements[2].value;
				var code=form.elements[3].value;
				var markers=form.elements[4].value;
				var data_id=form.elements[5].value;
				var del_button=form.elements['delete'];

				var last_updated=get_my_time();

				var data_json={data_store:'tab_components',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'description',value:description},
	 					{index:'markers',value:markers},
						{index:'type',value:type},
						{index:'code',value:code},
	 					{index:'last_updated',value:last_updated}]};

				update_json(data_json);

				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form347_delete_item(button)
		{
			if(is_delete_access('form347'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);

					var name=form.elements[0].value;
					var data_id=form.elements[5].value;
					var data_json={data_store:'tab_components',
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

	</script>
</div>
