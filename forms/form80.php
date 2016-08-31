<div id='form80' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form80_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form80_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
			<a class='btn btn-default btn-sm' id='form80_merge'>Merge <i class='fa fa-compress'></i></a>
      </div>
	</div>

	<div class="portlet-body">
        <form id='form80_master' autocomplete="off">
            <fieldset>
                <label><input type='text' required name='object_type' class='floatlabel' placeholder='Object'></label>
                <input type='hidden' name='table_name'>
                <input type='hidden' name='column'>
                <input type='submit' class='submit_hidden'>
            </fieldset>
        </form>

        <br>

        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr style='color:#9a9a9a;'>
          			<th>Change</th>
					<th>To</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form80_body'>
			</tbody>
      	</table>
    </div>

	<div class='modal_forms'>
		<a href='#form80_popup' data-toggle="modal" id='form80_popup_link'></a>
		<div id="form80_popup" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<form id='form80_popup_form'>
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
							<h4 class="modal-title">Merging Records</h4>
						</div>
						<div class="modal-body">
							<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
								Merging records.
								Please Wait.
							</div>
						</div>
						<div class="modal-footer">
							<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
						</div>
					</form>
				</div>
			</div>
		</div>

		<a href='#form80_popup2' data-toggle="modal" id='form80_popup_link2'></a>
		<div id="form80_popup2" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<form id='form80_popup_form2'>
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
							<h4 class="modal-title">Merging Finished</h4>
						</div>
						<div class="modal-body">
							<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
								Merging finished. You can close this popup now.
							</div>
						</div>
						<div class="modal-footer">
							<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<script>
	function form80_header_ini()
	{
		var fields=document.getElementById('form80_master');

		var object_filter=fields.elements['object_type'];
		var table_filter=fields.elements['table_name'];
		var column_filter=fields.elements['column'];
		var mapping_button=document.getElementById('form80_save');
		var merge_button=document.getElementById('form80_merge');

		object_filter.value='';
		table_filter.value='';
		column_filter.value='';

		$(fields).off('submit');
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form80_ini();
		});

		$(mapping_button).off('submit');
		$(mapping_button).on("submit", function(event)
		{
			event.preventDefault();
			form80_update_form();
		});

		set_static_value_list_json('de_duplication_ref','object',object_filter);

		$(merge_button).off('click');
		$(merge_button).on('click',function(event)
		{
			form80_popup_action(object_filter.value);
		});

		vUtil.onChange(object_filter,function(event)
		{
			var table_data={data_store:'de_duplication_ref',
							indexes:[{index:'ref_table'},
									{index:'ref_field'},
									{index:'tablename'},
									{index:'keycolumn'},
									{index:'action'},
									{index:'object',exact:object_filter.value}]};
			read_json_rows('form80',table_data,function (tables)
			{
				if(tables.length>0)
				{
					table_filter.value=tables[0].tablename;
					column_filter.value=tables[0].keycolumn;
				}
				else
				{
					table_filter.value="";
					column_filter.value="";
					object_filter.value="";
				}
			});
		});

		$(object_filter).focus();
		$('#form80_body').paginator({visible:false});
		$('#form80').formcontrol();
	}

	function form80_ini()
	{
		show_loader();
		var fid=$("#form80_link").attr('data_id');
		if(fid==null)
			fid="";

		$('#form80_body').html("");

		var filter_fields=document.getElementById('form80_master');
		var fobject=filter_fields.elements['object_type'].value;

		var columns={data_store:'de_duplication',
					indexes:[{index:'id'},
							{index:'object',exact:fobject},
							{index:'slave_value'},
							{index:'slave_id'},
							{index:'master_value'},
							{index:'master_id'},
							{index:'status',exact:'pending'}]};

		read_json_rows('form80',columns,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="<tr>";
					rowsHTML+="<form id='form80_"+result.id+"'></form>";
						rowsHTML+="<td data-th='Change'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form80_"+result.id+"' value='"+result.slave_value+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='To'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form80_"+result.id+"' value='"+result.master_value+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form80_"+result.id+"' value='"+result.id+"' name='id'>";
							rowsHTML+="<button type='button' class='btn red' form='form80_"+result.id+"' onclick='form80_delete_item($(this));'><i class='fa fa-trash'></i></button>";
						rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form80_body').append(rowsHTML);
			});
			hide_loader();
		});
	};

	function form80_add_item()
	{
		if(is_create_access('form80'))
		{
			var id=vUtil.newKey();
			var rowsHTML="<tr>";
			rowsHTML+="<form id='form80_"+id+"' autocomplete='off'></form>";
				rowsHTML+="<td data-th='Change'>";
					rowsHTML+="<input type='text' form='form80_"+id+"' required>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='To'>";
					rowsHTML+="<input type='text' form='form80_"+id+"' required>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					rowsHTML+="<input type='hidden' form='form80_"+id+"' value='"+id+"' name='id'>";
					rowsHTML+="<input type='hidden' form='form80_"+id+"' name='slave_id'>";
					rowsHTML+="<input type='hidden' form='form80_"+id+"' name='master_id'>";
					rowsHTML+="<button type='submit' class='btn green' form='form80_"+id+"' id='save_form_"+id+"' name='save'><i class='fa fa-save'></i></button>";
					rowsHTML+="<button type='button' class='btn red' form='form80_"+id+"' name='delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
				rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form80_body').prepend(rowsHTML);
			var fields=document.getElementById("form80_"+id);
			var slave_filter=fields.elements[0];
			var master_filter=fields.elements[1];
			var slave_id_filter=fields.elements['slave_id'];
			var master_id_filter=fields.elements['master_id'];

			var master_fields=document.getElementById('form80_master');
			var table=master_fields.elements['table_name'].value;
			var column=master_fields.elements['column'].value;

			var slave_data={data_store:table,return_column:column};
			set_my_value_list_json(slave_data,master_filter);
			set_my_value_list_json(slave_data,slave_filter);

			$(slave_filter).on('blur',function()
			{
				var id_data={data_store:table,return_column:'id',indexes:[{index:column,exact:slave_filter.value}]};
				set_my_value_json(id_data,slave_id_filter);
			});

			$(master_filter).on('blur',function()
			{
				var id_data={data_store:table,return_column:'id',indexes:[{index:column,exact:master_filter.value}]};
				set_my_value_json(id_data,master_id_filter);
			});

			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form80_create_item(fields);
			});

			$('#form80').formcontrol();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form80_create_item(form)
	{
		if(is_create_access('form80'))
		{
			var master_form=document.getElementById('form80_master');
			var object=master_form.elements['object_type'].value;
			var table=master_form.elements['table_name'].value;
			var column=master_form.elements['column'].value;

			var slave_value=form.elements[0].value;
			var master_value=form.elements[1].value;
			var slave_id=form.elements['slave_id'].value;
			var master_id=form.elements['master_id'].value;
			var data_id=form.elements['id'].value;
			var last_updated=get_my_time();

			var data_json={data_store:'de_duplication',
						data:[{index:'id',value:data_id},
							{index:'object',value:object},
							{index:'tablename',value:table},
							{index:'keycolumn',value:column},
							{index:'slave_value',value:slave_value},
							{index:'master_value',value:master_value},
							{index:'master_id',value:master_id},
							{index:'slave_id',value:slave_id},
							{index:'status',value:'pending'},
							{index:'last_updated',value:last_updated}]};

			create_json(data_json);

			$(form).readonly();

			var del_button=form.elements['delete'];
			del_button.removeAttribute("onclick");
			$(del_button).on('click',function(event)
			{
				form80_delete_item(del_button);
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

	function form80_update_form(button)
	{
		if(is_update_access('form80'))
		{
			$("[id^='save_form80_']").click();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form80_delete_item(button)
	{
		if(is_delete_access('form80'))
		{
			modal115_action(function()
			{
				var form_id=$(button).attr('form');
				var form=document.getElementById(form_id);
				var data_id=form.elements['id'].value;

				var data_json={data_store:'de_duplication',
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

	function form80_popup_action(object)
	{
		if(is_create_access('form80'))
		{
			$("#form80_popup_link").click();
			show_loader();
			var references_data={data_store:'de_duplication_ref',
								indexes:[{index:'object',exact:object},
										{index:'ref_table'},
										{index:'ref_field'},
										{index:'action'}]};
			read_json_rows('form80',references_data,function(refs_array)
			{
				var de_duplication_data={data_store:'de_duplication',
										indexes:[{index:'id'},
												{index:'object',exact:object},
												{index:'tablename'},
												{index:'keycolumn'},
												{index:'slave_id'},
												{index:'slave_value'},
												{index:'master_id'},
												{index:'master_value'},
												{index:'status',exact:'pending'}]};

				read_json_rows('form80',de_duplication_data,function(results)
				{
					var request_counter=0;
					results.forEach(function(result)
					{
						if(result.slave_id!==result.master_id)
						{
							//////deleting the slave record from master table
							var slave_json={data_store:result.tablename,data:[{index:'id',value:result.slave_id}]};
							delete_json(slave_json);

							//////replacing slave values with master values
							refs_array.forEach(function(refs)
							{
								var tablename=refs.ref_table;
								var column=refs.ref_field;
								var action_type=refs.action;

								if(!vUtil.isBlank(tablename))
								{
									if(action_type=='delete')
									{
										request_counter+=1;
										var refs_json={data_store:tablename,data:[{index:column,exact:result.slave_value}]};
										delete_json(refs_json,function()
										{
											request_counter-=1;
										});
									}
									else
									{
										var refs_data={data_store:tablename,return_column:'id',indexes:[{index:column,exact:result.slave_value}]};
										read_json_single_column(refs_data,function(ref_results)
										{
											var data_json={data_store:tablename,
								 					data:[]};

											var counter=1;
											var last_updated=get_my_time();

											ref_results.forEach(function(ref_result)
											{
												counter+=1;
												var data_json_array=[{index:'id',value:ref_result},
									 					{index:column,value:result.master_value},
									 					{index:'last_updated',value:last_updated}];

												data_json.data.push(data_json_array);
											});
											request_counter+=1;
											update_batch_json(data_json,function()
											{
												request_counter-=1;
											});
										});
									}
								}
							});
						}

						var de_duplication_data={data_store:'de_duplication',
								data:[{index:'id',value:result.id},
									{index:'status',value:'closed'},
									{index:'last_updated',value:vTime.unix()}]};
						request_counter+=1;
						update_json(de_duplication_data,function()
						{
							request_counter-=1;
						});
					});

					var request_timer = setInterval(function()
					{
						if(request_counter===0)
						{
							clearInterval(request_timer);
							hide_loader();
							$('#form80_popup_form').find('.close').click();
							$("#form80_popup_link2").click();
						}
					},500);
				});
			});
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	</script>
</div>
