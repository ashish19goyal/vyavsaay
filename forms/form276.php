<div id='form276' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form276_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form276_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form276_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form276_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form276_header'></form>
						<th><input type='text' placeholder="Table" class='floatlabel' name='table' form='form276_header'></th>
						<th><input type='text' placeholder="Tab" class='floatlabel' name='tab' form='form276_header'></th>
						<th><input type='text' placeholder="Search" class='floatlabel' name='search' form='form276_header'></th>
						<th><input type='text' placeholder="Result" readonly="readonly" name='result' form='form276_header'></th>
						<th><input type='submit' form='form276_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form276_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form276_header_ini()
		{
			var filter_fields=document.getElementById('form276_header');
			var table_filter=filter_fields.elements['table'];
			var tab_filter=filter_fields.elements['tab'];

			var name_data={data_store:'system_search',return_column:'table_name'};
			var tab_data={data_store:'system_search',return_column:'tab_name'};

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form276_ini();
			});

			set_my_filter_json(name_data,table_filter);
			set_my_filter_json(tab_data,tab_filter);
		};

		function form276_ini()
		{
			show_loader();
			var fid=$("#form276_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form276_body').html("");

			var filter_fields=document.getElementById('form276_header');
			var ftable=filter_fields.elements['table'].value;
			var ftab=filter_fields.elements['tab'].value;
			var fsearch=filter_fields.elements['search'].value;

			var paginator=$('#form276_body').paginator();

			var new_columns=new Object();
					new_columns.count=paginator.page_size();
					new_columns.start_index=paginator.get_index();
					new_columns.data_store='system_search';

					new_columns.indexes=[{index:'id',value:fid},
										{index:'search_column_array',value:fsearch},
										{index:'table_name',value:ftable},
										{index:'result_title'},
										{index:'result_detail'},
										{index:'result_form'},
										{index:'result_count'},
										{index:'return_columns'},
										{index:'tab_order'},
										{index:'tab_name',value:ftab}];

			read_json_rows('form276',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form276_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Table'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form276_"+result.id+"' value='"+result.table_name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Tab'>";
								rowsHTML+="<input type='text' readonly='readonly' placeholder='Name' class='floatlabel dblclick_editable' form='form276_"+result.id+"' value='"+result.tab_name+"'>";
								rowsHTML+="<input type='number' readonly='readonly' placeholder='Order' class='floatlabel dblclick_editable' form='form276_"+result.id+"' value='"+result.tab_order+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Search'>";
								rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form276_"+result.id+"'>"+result.search_column_array+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Result'>";
								rowsHTML+="<input type='text' readonly='readonly' placeholder='Title' class='floatlabel dblclick_editable' form='form276_"+result.id+"' value='"+result.result_title+"'>";
								rowsHTML+="<textarea readonly='readonly' placeholder='Detail' class='floatlabel dblclick_editable' form='form276_"+result.id+"'>"+result.result_detail+"</textarea>";
								rowsHTML+="<input type='text' placeholder='Form' class='floatlabel dblclick_editable' readonly='readonly' form='form276_"+result.id+"' value='"+result.result_form+"'>";
								rowsHTML+="<input type='number' placeholder='Count' class='floatlabel dblclick_editable' readonly='readonly' form='form276_"+result.id+"' value='"+result.result_count+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form276_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form276_"+result.id+"'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form276_"+result.id+"' title='Delete' onclick='form276_delete_item($(this));'><i class='fa fa-trash'></i></button>";
								rowsHTML+="<button type='button' class='btn yellow' form='form276_"+result.id+"' onclick=\"modal169_action('"+result.id+"')\">Return Columns</button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form276_body').append(rowsHTML);
					var fields=document.getElementById('form276_'+result.id);

					$(fields).on('submit',function (ev)
					{
						ev.preventDefault();
						form276_update_item(fields);
					});
				});

				$('#form276').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:new_columns,file:'Search Settings',report_id:'form276'});
				hide_loader();
			});
		}

		function form276_add_item()
		{
			if(is_create_access('form276'))
			{
				var id=vUtil.newKey();
				var rowsHTML="<tr>";
						rowsHTML+="<form id='form276_"+id+"'></form>";
							rowsHTML+="<td data-th='Table'>";
								rowsHTML+="<input type='text' form='form276_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Tab'>";
								rowsHTML+="<input type='text' form='form276_"+id+"' placeholder='Name' class='floatlabel dblclick_editable'>";
								rowsHTML+="<input type='number' form='form276_"+id+"' placeholder='Order' class='floatlabel dblclick_editable'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Search'>";
								rowsHTML+="<textarea type='text' form='form276_"+id+"' class='dblclick_editable'></textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Result'>";
								rowsHTML+="<input type='text' placeholder='Title' class='floatlabel dblclick_editable' form='form276_"+id+"'>";
								rowsHTML+="<textarea placeholder='Detail' class='floatlabel dblclick_editable' form='form276_"+id+"'></textarea>";
								rowsHTML+="<input type='text' placeholder='Form' class='floatlabel dblclick_editable' form='form276_"+id+"'>";
								rowsHTML+="<input type='number' placeholder='Count' class='floatlabel dblclick_editable' form='form276_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form276_"+id+"' value='"+id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form276_"+id+"' name='save' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form276_"+id+"' name=''delete title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
								rowsHTML+="<button type='button' class='btn yellow' form='form276_"+id+"' onclick=\"modal169_action('"+id+"')\">Return Columns</button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

				$('#form276_body').prepend(rowsHTML);

				var fields=document.getElementById("form276_"+id);
				var form_filter=fields.elements[6];
				var status_filter=fields.elements[8];

				var form_data={data_store:'user_preferences',return_column:'name',
									indexes:[{index:'value',exact:'checked'}]};
				set_my_value_list_json(form_data,form_filter);

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form276_create_item(fields);
				});
				$('#form276').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form276_create_item(form)
		{
			if(is_create_access('form276'))
			{
				var table_name=form.elements[0].value;
				var tab_name=form.elements[1].value;
				var tab_order=form.elements[2].value;
				var search_column=form.elements[3].value;
				var result_title=form.elements[4].value;
				var result_detail=form.elements[5].value;
				var result_form=form.elements[6].value;
				var result_count=form.elements[7].value;
				var data_id=form.elements[8].value;
				var del_button=form.elements[10];
				var last_updated=get_my_time();

				var data_json={data_store:'system_search',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'table_name',value:table_name},
	 					{index:'tab_name',value:tab_name},
	 					{index:'tab_order',value:tab_order},
	 					{index:'search_column_array',value:search_column},
	 					{index:'result_title',value:result_title},
	 					{index:'result_detail',value:result_detail},
	 					{index:'result_form',value:result_form},
	 					{index:'result_count',value:result_count},
	 					{index:'status',value:'active'},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Search tab '+tab_name,link_to:'form276'}};

				create_json(data_json);

				$(form).readonly();

				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form276_delete_item(del_button);
				});

				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form276_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form276_update_item(form)
		{
			if(is_update_access('form276'))
			{
				var table_name=form.elements[0].value;
				var tab_name=form.elements[1].value;
				var tab_order=form.elements[2].value;
				var search_column=form.elements[3].value;
				var result_title=form.elements[4].value;
				var result_detail=form.elements[5].value;
				var result_form=form.elements[6].value;
				var result_count=form.elements[7].value;
				var data_id=form.elements[8].value;

				var last_updated=get_my_time();
				var data_json={data_store:'system_search',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'table_name',value:table_name},
	 					{index:'tab_name',value:tab_name},
	 					{index:'tab_order',value:tab_order},
	 					{index:'search_column_array',value:search_column},
	 					{index:'result_title',value:result_title},
	 					{index:'result_detail',value:result_detail},
	 					{index:'result_form',value:result_form},
	 					{index:'result_count',value:result_count},
	 					{index:'status',value:'active'},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Search settings '+name,link_to:'form276'}};
 				update_json(data_json);

				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form276_delete_item(button)
		{
			if(is_delete_access('form276'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var data_id=form.elements[8].value;
					var tab_name=form.elements[1].value;

					var data_json={data_store:'system_search',
	 				log:'yes',
	 				data:[{index:'id',value:data_id}],
	 				log_data:{title:'Deleted',notes:'Search tab '+tab_name,link_to:'form276'}};

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
