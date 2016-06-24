<div id='form80' class='tab-pane'>
	<form id='form80_master' autocomplete="off">
		<fieldset>
			<label>Object type: <input type='text' required></label>
			<label>
				<input type='hidden' name='table_name'>
				<input type='hidden' name='column'>
				<input type='hidden' name='references'>
				<input type='hidden' name='reference_ids'>
			</label>
			<label>	<input type='button' value='Save all Mappings' name='mapping' class='generic_icon'></label>
			<label>	<input type='button' value='Start merging' name='merging' class='generic_icon'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form80_header'></form>
					<th>Change</th>
					<th>To</th>
					<th><input type='button' form='form80_header' title='Add item' class='add_icon' onclick='form80_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form80_body'>
		</tbody>
	</table>

	<script>
	function form80_header_ini()
	{
		var fields=document.getElementById('form80_master');

		var object_filter=fields.elements[1];
		var table_filter=fields.elements[2];
		var column_filter=fields.elements[3];
		var refs_filter=fields.elements[4];
		var ref_ids_filter=fields.elements[5];
		var mapping_button=fields.elements['mapping'];
		var merge_button=fields.elements['merging'];

		object_filter.value='';
		table_filter.value='';
		column_filter.value='';
		refs_filter.value='';
		ref_ids_filter.value='';

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

		set_static_value_list('de_duplication_ref','object',object_filter);

		$(merge_button).off('click');
		$(merge_button).on('click',function(event)
		{
			modal51_action(object_filter.value);
		});

		$(object_filter).off('blur');
		$(object_filter).off('change');
		$(object_filter).off('select');

		$(object_filter).on('change blur select',function(event)
		{
			var table_data="<de_duplication_ref>" +
					"<references_id></references_id>" +
					"<tablename></tablename>" +
					"<keycolumn></keycolumn>" +
					"<references_value></references_value>" +
					"<object exact='yes'>"+object_filter.value+"</object>" +
					"</de_duplication_ref>";
			fetch_requested_data('',table_data,function (tables)
			{
				if(tables.length>0)
				{
					table_filter.value=tables[0].tablename;
					column_filter.value=tables[0].keycolumn;
					refs_filter.value=tables[0].references_value;
					ref_ids_filter.value=tables[0].references_id;
				}
				else
				{
					table_filter.value="";
					column_filter.value="";
					refs_filter.value="";
					ref_ids_filter.value="";
					object_filter.value="";
				}
			});
		});

		$(object_filter).focus();
	}

	function form80_ini()
	{
		show_loader();
		var fid=$("#form80_link").attr('data_id');
		if(fid==null)
			fid="";

		var filter_fields=document.getElementById('form80_master');
		var fobject=filter_fields.elements[1].value;

		var columns="<de_duplication>" +
			"<id></id>" +
			"<object>"+fobject+"</object>" +
			"<slave_id></slave_id>" +
			"<slave_value></slave_value>" +
			"<master_id></master_id>" +
			"<master_value></master_value>" +
			"<status exact='yes'>pending</status>" +
			"</de_duplication>";

		$('#form80_body').html("");

		fetch_requested_data('form80',columns,function(results)
		{
			results.forEach(function(result)
			{
				var rowsHTML="<tr>";
					rowsHTML+="<form id='form80_"+result.id+"'></form>";
						rowsHTML+="<td data-th='Change'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form80_"+result.id+"' value='"+result.slave_value+"'>";
							rowsHTML+="<input type='hidden' form='form80_"+result.id+"' value='"+result.slave_id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='To'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form80_"+result.id+"' value='"+result.master_value+"'>";
							rowsHTML+="<input type='hidden' form='form80_"+result.id+"' value='"+result.master_id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form80_"+result.id+"' value='"+result.id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form80_"+result.id+"'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form80_"+result.id+"' onclick='form80_delete_item($(this));'>";
						rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form80_body').append(rowsHTML);
				var fields=document.getElementById("form80_"+result.id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
				});
			});
			hide_loader();
		});
	};

	function form80_add_item()
	{
		if(is_create_access('form80'))
		{
			var rowsHTML="";
			var id=get_new_key();
			rowsHTML+="<tr>";
			rowsHTML+="<form id='form80_"+id+"' autocomplete='off'></form>";
				rowsHTML+="<td data-th='Change'>";
					rowsHTML+="<input type='text' form='form80_"+id+"' required>";
					rowsHTML+="<input type='hidden' form='form80_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='To'>";
					rowsHTML+="<input type='text' form='form80_"+id+"' required>";
					rowsHTML+="<input type='hidden' form='form80_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form80_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form80_"+id+"' id='save_form_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form80_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form80_body').prepend(rowsHTML);
			var fields=document.getElementById("form80_"+id);
			var slave_filter=fields.elements[0];
			var slave_id_filter=fields.elements[1];
			var master_filter=fields.elements[2];
			var master_id_filter=fields.elements[3];

			var master_fields=document.getElementById('form80_master');
			var table=master_fields.elements[2].value;
			var column=master_fields.elements[3].value;

			var slave_data="<"+table+">" +
					"<"+column+"></"+column+">" +
					"</"+table+">";
			set_my_value_list(slave_data,slave_filter);
			set_my_value_list(slave_data,master_filter);

			$(slave_filter).on('blur',function(event)
			{
				var slave_id_data="<"+table+">" +
					"<id></id>" +
					"<"+column+" exact='yes'>"+slave_filter.value+"</"+column+">" +
					"</"+table+">";
				set_my_value(slave_id_data,slave_id_filter);
			});
			$(master_filter).on('blur',function(event)
			{
				var master_id_data="<"+table+">" +
					"<id></id>" +
					"<"+column+" exact='yes'>"+master_filter.value+"</"+column+">" +
					"</"+table+">";
				set_my_value(master_id_data,master_id_filter);
			});

			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form80_create_item(fields);
			});
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
			var object=master_form.elements[1].value;
			var table=master_form.elements[2].value;
			var column=master_form.elements[3].value;
			var refs=master_form.elements[4].value;
			var ref_ids=master_form.elements[5].value;

			var slave_value=form.elements[0].value;
			var slave_id=form.elements[1].value;
			var master_value=form.elements[2].value;
			var master_id=form.elements[3].value;
			var data_id=form.elements[4].value;
			var last_updated=get_my_time();
			var data_xml="<de_duplication>" +
						"<id>"+data_id+"</id>" +
						"<object>"+object+"</object>" +
						"<tablename>"+table+"</tablename>" +
						"<keycolumn>"+column+"</keycolumn>" +
						"<references_value>"+refs+"</references_value>" +
						"<references_id>"+ref_ids+"</references_id>" +
						"<slave_id>"+slave_id+"</slave_id>" +
						"<slave_value>"+slave_value+"</slave_value>" +
						"<master_id>"+master_id+"</master_id>" +
						"<master_value>"+master_value+"</master_value>" +
						"<status>pending</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</de_duplication>";
			create_simple(data_xml);
			for(var i=0;i<5;i++)
			{
				$(form.elements[i]).attr('readonly','readonly');
			}
			var del_button=form.elements[6];
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
				//console.log('deleting form80');
				var form_id=$(button).attr('form');
				var form=document.getElementById(form_id);
				var slave_id=form.elements[1].value;
				var data_id=form.elements[4].value;
				var last_updated=get_my_time();
				var data_xml="<de_duplication>" +
							"<id>"+data_id+"</id>" +
							"<slave_id>"+slave_id+"</slave_id>" +
							"</de_duplication>";
				if(is_online())
				{
					server_delete_simple(data_xml);
				}
				else
				{
					local_delete_simple(data_xml);
				}
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
