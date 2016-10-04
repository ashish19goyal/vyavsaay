<div id='form365' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form365_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
	</div>

	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form365_header'></form>
						<th><input type='text' placeholder="Display Name" class='floatlabel' name='display' form='form365_header'></th>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form365_header'></th>
						<th><input type='text' placeholder="Last Started At" readonly='readonly' form='form365_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form365_header'></th>
						<th><input type='submit' form='form365_header' style='display:none;'></th>
				</tr>
			</thead>
			<tbody id='form365_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form365_header_ini()
		{
			var filter_fields=document.getElementById('form365_header');
			var display_filter=filter_fields.elements['display'];
			var name_filter=filter_fields.elements['name'];
			var status_filter=filter_fields.elements['status'];

			var display_data={database:'0',data_store:'crons',return_column:'display_name'};
			var name_data={database:'0',data_store:'crons',return_column:'name'};

			set_master_filter_json(display_data,display_filter);
			set_master_filter_json(name_data,name_filter);
			set_filter_json(['active','suspended'],status_filter);

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form365_ini();
			});
		};

		function form365_ini()
		{
			show_loader();
			var fid=$("#form365_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form365_body').html("");

			var filter_fields=document.getElementById('form365_header');
			var fdisplay=filter_fields.elements['display'].value;
			var fname=filter_fields.elements['name'].value;
			var fstatus=filter_fields.elements['status'].value;

			var paginator=$('#form365_body').paginator();

			var new_columns={count:paginator.page_size(),
							start_index:paginator.get_index(),
							data_store:'crons',
							database:'0',
							indexes:[{index:'id',value:fid},
									{index:'display_name',value:fdisplay},
									{index:'name',value:fname},
									{index:'status',value:fstatus},
									{index:'started_on'}]};

			read_json_rows_master('form365',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form365_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Display Name'>";
								rowsHTML+="<textarea readonly='readonly' form='form365_"+result.id+"'>"+result.display_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<textarea readonly='readonly' form='form365_"+result.id+"'>"+result.name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Last Started At'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form365_"+result.id+"' value='"+vTime.datetime({time:result.started_on})+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' name='status' form='form365_"+result.id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form365_"+result.id+"' value='"+result.id+"' name='id'>";
								rowsHTML+="<button type='button' class='btn green' name='check' form='form365_"+result.id+"' title='Re-check Status' onclick='form365_check_item($(this));'><i class='fa fa-refresh'></i></button>";
								rowsHTML+="<button type='button' class='btn red' name='delete' form='form365_"+result.id+"' title='Delete Cron' onclick='form365_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							if(result.status=='suspended')
							{
								rowsHTML+="<button type='button' class='btn blue' name='activate' form='form365_"+result.id+"' title='Activate Cron' onclick='form365_activate_item($(this));'><i class='fa fa-line-chart'></i></button>";
							}
							else{
								rowsHTML+="<button type='button' class='btn yellow' name='suspend' form='form365_"+result.id+"' title='Suspend Cron' onclick='form365_suspend_item($(this));'><i class='fa fa-power-off'></i></button>";
							}
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form365_body').append(rowsHTML);
				});

				$('#form365').formcontrol();
				paginator.update_index(results.length);
				hide_loader();
			});
		};

		function form365_add_item()
		{
			if(is_create_access('form365'))
			{
				var id=vUtil.newKey();
				var rowsHTML="<tr>";
				rowsHTML+="<form id='form365_"+id+"' autocomplete='off'></form>";
					rowsHTML+="<td data-th='Display Name'>";
						rowsHTML+="<input type='text' form='form365_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' form='form365_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Last Started At'>";
						rowsHTML+="<input type='text' form='form365_"+id+"' readonly='readonly'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form365_"+id+"' name='status' required value='suspended'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form365_"+id+"' value='"+id+"' name='id'>";
						rowsHTML+="<button type='submit' class='btn green' name='save' form='form365_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
						rowsHTML+="<button type='button' class='btn red' name='delete' form='form365_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
					rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form365_body').prepend(rowsHTML);
				var fields=document.getElementById("form365_"+id);
				var display_filter=fields.elements[0];

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form365_create_item(fields);
				});

				$(display_filter).focus();

				$('#form365').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form365_create_item(form)
		{
			if(is_create_access('form365'))
			{
				var display=form.elements[0].value;
				var name=form.elements[1].value;
				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();

				var data_json={data_store:'crons',
					database:'0',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'display_name',value:display},
	 					{index:'status',value:'suspended'},
	 					{index:'started_on',value:''},
	 					{index:'last_updated',value:last_updated}]};
				server_create_master(data_json);

				$(form).readonly();

				var del_button=form.elements['delete'];
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form365_delete_item(del_button);
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

		function form365_activate_item(button)
		{
			if(is_update_access('form365'))
			{
				var form_id=$(button).attr('form');
				var form=document.getElementById(form_id);
				var cron_name=form.elements[1].value;

				var columns={cron_name:cron_name,request_type:'activate'};
				server_cron_request(columns,function(response)
				{
					if(response.result=='active')
					{
						form.elements['status'].value='active';

						var data_id=form.elements['id'].value;
						var last_updated=vTime.unix();
						var data_json={data_store:'crons',database:'0',
			 				data:[{index:'id',value:data_id},
			 					{index:'status',value:'active'},
								{index:'started_on',value:last_updated},
			 					{index:'last_updated',value:last_updated}]};

						server_update_master(data_json);
					}
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form365_suspend_item(button)
		{
			if(is_update_access('form365'))
			{
				var form_id=$(button).attr('form');
				var form=document.getElementById(form_id);
				var cron_name=form.elements[1].value;

				var columns={cron_name:cron_name,request_type:'suspend'};
				server_cron_request(columns,function(response)
				{
					if(response.result=='suspended')
					{
						form.elements['status'].value='suspended';

						var data_id=form.elements['id'].value;
						var last_updated=vTime.unix();
						var data_json={data_store:'crons',database:'0',
			 				data:[{index:'id',value:data_id},
			 					{index:'status',value:'suspended'},
								{index:'started_on',value:''},
			 					{index:'last_updated',value:last_updated}]};

						server_update_master(data_json);
					}
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form365_check_item(button)
		{
			if(is_update_access('form365'))
			{
				var form_id=$(button).attr('form');
				var form=document.getElementById(form_id);
				var cron_name=form.elements[1].value;

				var columns={cron_name:cron_name,request_type:'check'};
				server_cron_request(columns,function(response)
				{
					form.elements['status'].value=response.result;

					var data_id=form.elements['id'].value;
					var last_updated=vTime.unix();
					var data_json={data_store:'crons',database:'0',
						data:[{index:'id',value:data_id},
							{index:'status',value:response.result},
							{index:'last_updated',value:last_updated}]};

					server_update_master(data_json);
					$(form).readonly();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form365_delete_item(button)
		{
			if(is_delete_access('form365'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var cron_name=form.elements[1].value;

					var columns={cron_name:cron_name,request_type:'suspend'};
					server_cron_request(columns,function(response)
					{
						if(response.result=='suspended')
						{
							var data_id=form.elements['id'].value;
							var last_updated=get_my_time();

							var data_json={data_store:'crons',database:'0',
				 				data:[{index:'id',value:data_id}]};

							server_delete_master(data_json);
							$(button).parent().parent().remove();
						}
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
