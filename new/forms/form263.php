<div id='form263' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=form263_add_item();>Add Tab <i class='fa fa-plus'></i></a>
			<a class='btn btn-circle grey btn-outline btn-sm' id='form263_save'>Save <i class='fa fa-save'></i></a>
		</div>
	</div>

	<div class="portlet-body">
	<form id='form263_master' autocomplete="off">
		<fieldset>
			<label>Grid Name<br><input type='text' required name='grid'></label>
			<label>	<input type='hidden' name='id'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>

	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables sortable" width="100%">
			<thead>
				<tr>
					<form id='form263_header'></form>
						<th><input type='text' placeholder="Order" readonly="readonly" name='order' form='form263_header'></th>
						<th><input type='text' placeholder="Type"  readonly="readonly" name='type' form='form263_header'></th>
						<th><input type='text' placeholder="Name"  readonly="readonly" name='name' form='form263_header'></th>
						<th><input type='text' placeholder="Display Name" readonly="readonly" name='disp' form='form263_header'></th>
						<th><input type='text' placeholder="Action" readonly="readonly" name='action' form='form263_header'></th>
						<th><input type='submit' form='form263_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form263_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form263_header_ini()
		{
			var fields=document.getElementById('form263_master');

			var grid_filter=fields.elements['grid'];
			var id_filter=fields.elements['id'];

			var save_button=document.getElementById('form263_save');

			id_filter.value="";
			grid_filter.value='';

			$(save_button).off('click');
			$(save_button).on("click", function(event)
			{
				event.preventDefault();
				form263_update_form();
			});

			$(fields).off('submit');
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form263_ini();
			});

			var grid_data={data_store:'system_grids',return_column:'name',indexes:[{index:'status',exact:'active'}]};
			set_my_value_list_json(grid_data,grid_filter,function ()
			{
				$(grid_filter).focus();
			});

			$(grid_filter).off('blur');
			$(grid_filter).off('change');
			$(grid_filter).off('select');

			$(grid_filter).on('blur change select',function()
			{
				var grid_data={data_store:'system_grids',return_column:'id',indexes:[{index:'name',exact:grid_filter.value}]};
				set_my_value_json(grid_data,id_filter);
			});

			$('#form263_body').html("");

			var body_elem=document.getElementById('form263_body');
			body_elem.addEventListener('table_sort',function(e)
			{
				form263_update_serial_numbers();
			},false);
		}

		function form263_ini()
		{
			var data_id=$("#form263_link").attr('data_id');
			if(data_id==null)
				data_id="";
			$('#form263_body').html("");

			var master_form=document.getElementById('form263_master');
			var id_filter=master_form.elements['id'];

			if(data_id=="")
			{
				data_id=id_filter.value;
			}

			if(data_id!="")
			{
				show_loader();
				var new_columns=new Object();
					new_columns.count=1;
					new_columns.data_store='system_grids';

					new_columns.indexes=[{index:'id',value:data_id},
										{index:'name'},
										{index:'display_name'},
										{index:'elements'},
										{index:'status'}];

				read_json_rows('form263',new_columns,function(results)
				{
					var filter_fields=document.getElementById('form263_master');
					if(results.length>0)
					{
						filter_fields.elements['grid'].value=results[0].name;

						if(results[0].elements!="" && results[0].elements!=null)
						{
							var elements_array=vUtil.jsonParse(results[0].elements);

							var new_id=get_new_key();
							var counter=0;
							elements_array.forEach(function(result)
							{
								counter+=1;
								var id=new_id+counter;
								var rowsHTML="<tr>";
								rowsHTML+="<form id='form263_"+id+"'></form>";
									rowsHTML+="<td data-th='S.No.'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Type'>";
										rowsHTML+="<input type='text' readonly='readonly' form='form263_"+id+"' value='"+result.type+"'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Name'>";
										rowsHTML+="<input type='text' readonly='readonly' form='form263_"+id+"' value='"+result.name+"'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Display Name'>";
										rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form263_"+id+"' value='"+result.display_name+"'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Onclick'>";
										rowsHTML+="<textarea readonly='readonly' form='form263_"+id+"'>"+result.onclick+"</textarea>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Action'>";
										rowsHTML+="<input type='hidden' form='form263_"+id+"' value='"+id+"'>";
										rowsHTML+="<input type='button' class='submit_hidden' form='form263_"+id+"' id='save_form263_"+id+"'>";
										rowsHTML+="<button type='button' class='btn red' name='delete' form='form263_"+id+"' title='Delete' onclick='$(this).parent().parent().remove(); form263_update_serial_numbers();'><i class='fa fa-trash'></i></button>";
									rowsHTML+="</td>";
								rowsHTML+="</tr>";

								$('#form263_body').append(rowsHTML);
							});
						}
						form263_update_serial_numbers();
						$('#form263').formcontrol();
						hide_loader();
					}
				});
			}
		}

		function form263_add_item()
		{
			if(is_create_access('form263'))
			{
				var id=get_new_key();
				var rowsHTML="<tr>";
				rowsHTML+="<form id='form263_"+id+"'></form>";
					rowsHTML+="<td data-th='S.No.'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' required form='form263_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' required form='form263_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Display Name'>";
						rowsHTML+="<input type='text' required form='form263_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Onclick'>";
						rowsHTML+="<textarea required form='form263_"+id+"'></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form263_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='button' class='submit_hidden' form='form263_"+id+"' id='save_form263_"+id+"'>";
						rowsHTML+="<button type='button' class='btn red' name='delete' form='form263_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
					rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form263_body').append(rowsHTML);

				var item_form=document.getElementById('form263_'+id);
				var type_filter=item_form.elements[0];
				var name_filter=item_form.elements[1];

				set_static_value_list('system_grid_elements','type',type_filter,function ()
				{
					$(type_filter).focus();
				});

				var name_data={data_store:'user_preferences',return_column:'name',
									indexes:[{index:'value',exact:'checked'},
												{index:'type',array:['report','form']}]};
				set_my_value_list_json(name_data,name_filter);

				$('#form263').formcontrol();
				form263_update_serial_numbers();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form263_update_form()
		{
			if(is_update_access('form263'))
			{
				var elements_array=[];
				$("[id^='save_form263']").each(function(index)
				{
					var subform_id=$(this).attr('form');
					var subform=document.getElementById(subform_id);

					var elem_obj=new Object();
					elem_obj.type=subform.elements[0].value;
					elem_obj.name=subform.elements[1].value;
					elem_obj.display_name=subform.elements[2].value;
					elem_obj.onclick=subform.elements[3].value;
					elements_array.push(elem_obj);

					$(subform).readonly();
				});

				var data_id=document.getElementById('form263_master').elements['id'].value;
				var elements_string=JSON.stringify(elements_array);
				var last_updated=get_my_time();

				var data_json={data_store:'system_grids',
	 				data:[{index:'id',value:data_id},
	 					{index:'elements',value:elements_string},
	 					{index:'last_updated',value:last_updated}]};

				update_json(data_json);
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form263_update_serial_numbers()
		{
			$('#form263_body').find('tr').each(function(index)
			{
				$(this).find('td:nth-child(2)').html(index+1);
			});
		}

	</script>
</div>
