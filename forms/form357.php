<div id='form357' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form357_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
	</div>

	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form357_header'></form>
						<th><input type='text' placeholder="UserName" class='floatlabel' name='name' form='form357_header'></th>
						<th><input type='text' placeholder="Domain" class='floatlabel' name='domain' form='form357_header'></th>
						<th><input type='text' placeholder="Data Store" class='floatlabel' name='store' form='form357_header'></th>
						<th><input type='text' placeholder="Field Details" readonly='readonly' form='form357_header'></th>
						<th><input type='text' placeholder="Notification" readonly='readonly' form='form357_header'></th>
						<th><input type='submit' form='form357_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form357_body'>
			</tbody>
		</table>
	</div>

	<script>
	function form357_header_ini()
	{
		var filter_fields=document.getElementById('form357_header');
		var user_filter=filter_fields.elements['name'];
		var domain_filter=filter_fields.elements['domain'];
		var store_filter=filter_fields.elements['store'];

		var user_data={database:'0',data_store:'api_key_mapping',return_column:'username'};
		set_master_filter_json(user_data,user_filter);

		var domain_data={data_store:'api_key_mapping',database:'0',return_column:'domain'};
		set_master_filter_json(domain_data,domain_filter);

		var store_data={data_store:'api_key_mapping',database:'0',return_column:'data_stores'};
		set_master_filter_json(store_data,store_filter);

		$(filter_fields).off('submit');
		$(filter_fields).on('submit',function(event)
		{
			event.preventDefault();
			form357_ini();
		});
	}

	function form357_ini()
	{
		show_loader();
		var fid=$("#form357_link").attr('data_id');
		if(fid==null)
			fid="";

		$('#form357_body').html("");

		var filter_fields=document.getElementById('form357_header');
		var fuser=filter_fields.elements['name'].value;
		var fdomain=filter_fields.elements['domain'].value;
		var fstore=filter_fields.elements['store'].value;

		var paginator=$('#form357_body').paginator();

		var new_columns={count:paginator.page_size(),
						start_index:paginator.get_index(),
						data_store:'api_key_mapping',
						database:'0',
						indexes:[{index:'id',value:fid},
								{index:'username',value:fuser},
								{index:'api_key'},
								{index:'data_stores',value:fstore},
								{index:'return_index'},
								{index:'status'},
								{index:'request_types'},
								{index:'required_fields'},
								{index:'re_factoring'},
								{index:'indexes'},
								{index:'dbname'},
								{index:'email'},
								{index:'email_title'},
								{index:'get_message'},
								{index:'put_message'},
								{index:'post_message'},
								{index:'delete_message'},
								{index:'domain',value:fdomain}]};

		read_json_rows_master('form357',new_columns,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="<tr>";
					rowsHTML+="<form id='form357_"+result.id+"'></form>";
						rowsHTML+="<td data-th='Username'>";
							rowsHTML+="<textarea class='floatlabel' placeholder='Username' readonly='readonly' form='form357_"+result.id+"'>"+result.username+"</textarea>";
							rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Key' readonly='readonly' form='form357_"+result.id+"'>"+result.api_key+"</textarea>";
							rowsHTML+="<input type='text' readonly='readonly' placeholder='Status' class='floatlabel dblclick_editable' required form='form357_"+result.id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Domain'>";
							rowsHTML+="<input type='text' class='floatlabel dblclick_editable' placeholder='Domain' readonly='readonly' form='form357_"+result.id+"' value='"+result.domain+"'>";
							rowsHTML+="<input type='text' class='floatlabel' placeholder='DB' readonly='readonly' form='form357_"+result.id+"' value='"+result.dbname+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Data Store'>";
							rowsHTML+="<input type='text' class='floatlabel' placeholder='Store Name' readonly='readonly' form='form357_"+result.id+"' value='"+result.data_stores+"'>";
							rowsHTML+="<input type='text' class='floatlabel dblclick_editable' placeholder='Request Types' readonly='readonly' form='form357_"+result.id+"' value='"+result.request_types+"'>";
							rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Get Indexes' readonly='readonly' form='form357_"+result.id+"'>"+result.indexes+"</textarea>";
							rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Return Index' readonly='readonly' form='form357_"+result.id+"'>"+result.return_index+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Field Details'>";
							rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Required' readonly='readonly' form='form357_"+result.id+"'>"+result.required_fields+"</textarea>";
							rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Re-factor' readonly='readonly' form='form357_"+result.id+"'>"+result.re_factoring+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Notification'>";
							rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Emails' readonly='readonly' form='form357_"+result.id+"'>"+result.email+"</textarea>";
							rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Title' readonly='readonly' form='form357_"+result.id+"'>"+result.email_title+"</textarea>";
							rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Get Message' readonly='readonly' form='form357_"+result.id+"'>"+result.get_message+"</textarea>";
							rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Put Message' readonly='readonly' form='form357_"+result.id+"'>"+result.put_message+"</textarea>";
							rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Post Message' readonly='readonly' form='form357_"+result.id+"'>"+result.post_message+"</textarea>";
							rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Delete Message' readonly='readonly' form='form357_"+result.id+"'>"+result.delete_message+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form357_"+result.id+"' name='id' value='"+result.id+"'>";
							rowsHTML+="<button type='submit' class='btn green' title='Save' name='save' form='form357_"+result.id+"'><i class='fa fa-save'></i></button>";
							rowsHTML+="<button type='button' class='btn red' form='form357_"+result.id+"' onclick='form357_delete_item($(this));' name='delete' title='Delete'><i class='fa fa-trash'></i></button>";
						rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form357_body').prepend(rowsHTML);
				var fields=document.getElementById("form357_"+result.id);
				var status_filter=fields.elements[2];

				set_static_value_list_json('api_key_mapping','status',status_filter);

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form357_update_item(fields);
				});
			});

			$('#form357').formcontrol();
			paginator.update_index(results.length);
			initialize_tabular_report_buttons(new_columns,'API Settings','form357',function (item){});
			hide_loader();
		});
	};

	function form357_add_item()
	{
		if(is_create_access('form357'))
		{
			var id=vUtil.newKey();
			var rowsHTML="<tr>";
				rowsHTML+="<form id='form357_"+id+"'></form>";
				rowsHTML+="<td data-th='Username'>";
					rowsHTML+="<input type='text' class='floatlabel dblclick_editable' placeholder='Username' required form='form357_"+id+"'>";
					rowsHTML+="<input type='text' class='floatlabel dblclick_editable' placeholder='Key' required form='form357_"+id+"'>";
					rowsHTML+="<input type='text' class='floatlabel dblclick_editable' placeholder='Status' required form='form357_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='DB'>";
					rowsHTML+="<input type='text' class='floatlabel' placeholder='Domain' required form='form357_"+id+"'>";
					rowsHTML+="<input type='text' class='floatlabel' placeholder='Db' required form='form357_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Data Store'>";
					rowsHTML+="<input type='text' class='floatlabel dblclick_editable' required placeholder='Store Name' form='form357_"+id+"'>";
					rowsHTML+="<input type='text' class='floatlabel dblclick_editable' required placeholder='Request Types' form='form357_"+id+"'>";
					rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Get Indexes' form='form357_"+id+"'></textarea>";
					rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Return Index' form='form357_"+id+"'></textarea>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Field Details'>";
					rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Required' form='form357_"+id+"'></textarea>";
					rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Re-factor' form='form357_"+id+"'></textarea>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Notification'>";
					rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Emails' form='form357_"+id+"'></textarea>";
					rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Title' form='form357_"+id+"'></textarea>";
					rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Get Message' form='form357_"+id+"'></textarea>";
					rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Put Message' form='form357_"+id+"'></textarea>";
					rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Post Message' form='form357_"+id+"'></textarea>";
					rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Delete Message' form='form357_"+id+"'></textarea>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					rowsHTML+="<input type='hidden' form='form357_"+id+"' name='id' value='"+id+"'>";
					rowsHTML+="<button type='submit' class='btn green' title='Save' name='save' form='form357_"+id+"'><i class='fa fa-save'></i></button>";
					rowsHTML+="<button type='button' class='btn red' form='form357_"+id+"' onclick='$(this).parent().parent().remove();' name='delete' title='Delete'><i class='fa fa-trash'></i></button>";
				rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form357_body').prepend(rowsHTML);

			var fields=document.getElementById("form357_"+id);
			var user_filter=fields.elements[0];
			var status_filter=fields.elements[2];

			$(user_filter).focus();

			set_static_value_list_json('api_key_mapping','status',status_filter);

			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form357_create_item(fields);
			});

			$('#form357').formcontrol();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form357_create_item(form)
	{
		if(is_create_access('form357'))
		{
			var new_columns={data_store:'api_key_mapping',database:'0',
							data:[{index:'id',value:form.elements['id'].value},
								{index:'username',value:form.elements[0].value,uniqueWith:['data_stores','domain']},
								{index:'api_key',value:form.elements[1].value},
								{index:'status',value:form.elements[2].value},
								{index:'domain',value:form.elements[3].value},
								{index:'dbname',value:form.elements[4].value},
								{index:'data_stores',value:form.elements[5].value},
								{index:'request_types',value:form.elements[6].value},
								{index:'indexes',value:form.elements[7].value},
								{index:'return_index',value:form.elements[8].value},
								{index:'required_fields',value:form.elements[9].value},
								{index:'re_factoring',value:form.elements[10].value},
								{index:'email',value:form.elements[11].value},
								{index:'email_title',value:form.elements[12].value},
								{index:'get_message',value:form.elements[13].value},
								{index:'put_message',value:form.elements[14].value},
								{index:'post_message',value:form.elements[15].value},
								{index:'delete_message',value:form.elements[16].value},
								{index:'last_updated',value:get_my_time()}]};

			var del_button=form.elements['delete'];
			server_create_master(new_columns);

			$(form).readonly();

			del_button.removeAttribute("onclick");
			$(del_button).on('click',function(event)
			{
				form357_delete_item(del_button);
			});

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form357_update_item(form);
			});
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form357_update_item(form)
	{
		if(is_update_access('form357'))
		{
			var new_columns={data_store:'api_key_mapping',database:'0',
							data:[{index:'id',value:form.elements['id'].value},
								{index:'username',value:form.elements[0].value},
								{index:'api_key',value:form.elements[1].value},
								{index:'status',value:form.elements[2].value},
								{index:'domain',value:form.elements[3].value},
								{index:'dbname',value:form.elements[4].value},
								{index:'data_stores',value:form.elements[5].value},
								{index:'request_types',value:form.elements[6].value},
								{index:'indexes',value:form.elements[7].value},
								{index:'return_index',value:form.elements[8].value},
								{index:'required_fields',value:form.elements[9].value},
								{index:'re_factoring',value:form.elements[10].value},
								{index:'email',value:form.elements[11].value},
								{index:'email_title',value:form.elements[12].value},
								{index:'get_message',value:form.elements[13].value},
								{index:'put_message',value:form.elements[14].value},
								{index:'post_message',value:form.elements[15].value},
								{index:'delete_message',value:form.elements[16].value},
								{index:'last_updated',value:get_my_time()}]};

			server_update_master(new_columns);
			$(form).readonly();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form357_delete_item(button)
	{
		if(is_delete_access('form357'))
		{
			modal115_action(function()
			{
				var form_id=$(button).attr('form');
				var form=document.getElementById(form_id);

				var new_columns={data_store:'api_key_mapping',database:'0',
								 data:[{index:'id',value:form.elements['id'].value}]};

				server_delete_master(new_columns);

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
