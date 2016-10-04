<div id='form293' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form293_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form293_header'></form>
						<th><input type='text' placeholder="UserName" class='floatlabel' name='name' form='form293_header'></th>
						<th><input type='text' placeholder="Contact Person" class='floatlabel' name='person' form='form293_header'></th>
						<th><input type='text' placeholder="Contact Details" readonly="readonly" form='form293_header'></th>
						<th><input type='text' placeholder="DB" class='floatlabel' name='db' form='form293_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form293_header'></th>
						<th><input type='submit' form='form293_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form293_body'>
			</tbody>
		</table>
	</div>
	
	<script>
	function form293_header_ini()
	{
		var filter_fields=document.getElementById('form293_header');	
		var user_filter=filter_fields.elements['name'];
		var name_filter=filter_fields.elements['person'];
		var db_filter=filter_fields.elements['db'];
		var status_filter=filter_fields.elements['status'];

		var user_data={database:'0',
					data_store:'user_profile',
					indexes:[{index:'username'}],
					return_column:'username'};
		set_master_filter_json(user_data,user_filter);

		var name_data={data_store:'user_profile',
						database:'0',
						indexes:[{index:'name'}],
						return_column:'name'};
		set_master_filter_json(name_data,name_filter);

		var db_data={data_store:'user_profile',
					database:'0',
					indexes:[{index:'dbname'}],
					return_column:'dbname'};
		set_master_filter_json(db_data,db_filter);

		$(filter_fields).off('submit');
		$(filter_fields).on('submit',function(event)
		{
			event.preventDefault();
			form293_ini();
		});
	}

	function form293_ini()
	{
		show_loader();
		var fid=$("#form293_link").attr('data_id');
		if(fid==null)
			fid="";	

		var filter_fields=document.getElementById('form293_header');
		var fuser=filter_fields.elements['name'].value;
		var fname=filter_fields.elements['person'].value;
		var fdb=filter_fields.elements['db'].value;
		var fstatus=filter_fields.elements['status'].value;

		$('#form293_body').html("");

		var paginator=$('#form293_body').paginator();
			
		var new_columns={count:paginator.page_size(),
						start_index:paginator.get_index(),
						data_store:'user_profile',
						database:'0',
						indexes:[{index:'id',value:fid},
								{index:'username',value:fuser},
								{index:'phone'},
								{index:'name',value:fname},
								{index:'status',value:fstatus},
								{index:'email'},
								{index:'dbname',value:fdb}]};

		read_json_rows_master('form293',new_columns,function(results)
		{	
			results.forEach(function(result)
			{
				var rowsHTML="<tr>";
					rowsHTML+="<form id='form293_"+result.id+"'></form>";
						rowsHTML+="<td data-th='Username'>";
							rowsHTML+="<textarea readonly='readonly' form='form293_"+result.id+"'>"+result.username+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Contact Person'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form293_"+result.id+"' value='"+result.name+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Contact Details'>";
							rowsHTML+="<input type='text' class='floatlabel dblclick_editable' placeholder='Phone' readonly='readonly' form='form293_"+result.id+"' value='"+result.phone+"'>";
							rowsHTML+="<input type='text' class='floatlabel dblclick_editable' placeholder='Email' readonly='readonly' form='form293_"+result.id+"' value='"+result.email+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='DB'>";
							rowsHTML+="<textarea readonly='readonly' form='form293_"+result.id+"' required class='dblclick_editable'>"+result.dbname+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' required form='form293_"+result.id+"' value='"+result.status+"'>";	
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form293_"+result.id+"' value='"+result.id+"'>";
							rowsHTML+="<button type='submit' class='btn green' title='Save' name='save' form='form293_"+result.id+"'><i class='fa fa-save'></i></button>";
							rowsHTML+="<button type='button' class='btn red' form='form293_"+result.id+"' onclick='form293_delete_item($(this));' name='delete' title='Delete'><i class='fa fa-trash'></i></button>";
							rowsHTML+="<button type='button' class='btn default yellow-stripe' form='form293_"+result.id+"' onclick=\"modal213_action('"+result.dbname+"');\" name='import' title='Update Configurations'>Import Config</button>";
						rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form293_body').append(rowsHTML);
				var fields=document.getElementById("form293_"+result.id);
				var status_filter=fields.elements[5];

				set_static_value_list_json('user_profile','status',status_filter);

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form293_update_item(fields);
				});
			});

			$('#form293').formcontrol();
			paginator.update_index(results.length);
			hide_loader();
		});
	};

	function form293_add_item()
	{
		if(is_create_access('form293'))
		{
			var id=vUtil.newKey();
			var rowsHTML="<tr>";
				rowsHTML+="<form id='form293_"+id+"'></form>";
					rowsHTML+="<td data-th='Username'>";
						rowsHTML+="<textarea placeholder='UserName' form='form293_"+id+"' required></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Contact Person'>";
						rowsHTML+="<input type='text' placeholder='Contact Person' form='form293_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Contact Details'>";
						rowsHTML+="<input type='text' class='floatlabel dblclick_editable' placeholder='Phone' form='form293_"+id+"'>";
						rowsHTML+="<input type='text' class='floatlabel dblclick_editable' placeholder='Email' form='form293_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='DB'>";
						rowsHTML+="<textarea form='form293_"+id+"' placeholder='DB' required class='dblclick_editable'></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' class='dblclick_editable' placeholder='Status' requried form='form293_"+id+"'>";	
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form293_"+id+"' value='"+id+"'>";
						rowsHTML+="<button type='submit' class='btn green' form='form293_"+id+"' name='save' title='Save'><i class='fa fa-save'></i></button>";
						rowsHTML+="<button type='button' class='btn red' form='form293_"+id+"' onclick='$(this).parent().parent().remove();' name='delete' title='Delete'><i class='fa fa-trash'></i></button>";
					rowsHTML+="</td>";			
			rowsHTML+="</tr>";

			$('#form293_body').prepend(rowsHTML);

			var fields=document.getElementById("form293_"+id);
			var user_filter=fields.elements[0];
			var status_filter=fields.elements[5];

			$(user_filter).focus();

			set_static_value_list_json('user_profile','status',status_filter);

			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form293_create_item(fields);
			});

			$('#form293').formcontrol();
		}
		else
		{
			$("#modal2_link").click();
		}		
	}

	function form293_create_item(form)
	{
		if(is_create_access('form293'))
		{
			var new_columns={data_store:'user_profile',database:'0',
							data:[{index:'id',value:form.elements[6].value},
								{index:'username',value:form.elements[0].value,unique:'yes'},
								{index:'phone',value:form.elements[2].value},
								{index:'name',value:form.elements[1].value},
								{index:'status',value:form.elements[5].value},
								{index:'email',value:form.elements[3].value},
								{index:'dbname',value:form.elements[4].value},
								{index:'last_updated',value:get_my_time()}]};

			var del_button=form.elements['delete'];

			server_create_master(new_columns);

			$(form).readonly();
			
			del_button.removeAttribute("onclick");
			$(del_button).on('click',function(event)
			{
				form293_delete_item(del_button);
			});

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form293_update_item(form);
			});
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form293_update_item(form)
	{
		if(is_update_access('form293'))
		{
			var new_columns={data_store:'user_profile',database:'0',
							 data:[{index:'id',value:form.elements[6].value},
								{index:'phone',value:form.elements[2].value},
								{index:'name',value:form.elements[1].value},
								{index:'status',value:form.elements[5].value},
								{index:'email',value:form.elements[3].value},
								{index:'last_updated',value:get_my_time()}]};

			server_update_master(new_columns);
			$(form).readonly();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form293_delete_item(button)
	{
		if(is_delete_access('form293'))
		{
			modal115_action(function()
			{
				var form_id=$(button).attr('form');
				var form=document.getElementById(form_id);

				var new_columns={data_store:'user_profile',database:'0',
								 data:[{index:'id',value:form.elements[6].value}]};

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