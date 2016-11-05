<div id='form318' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=modal135_action('accounting','master');>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form318_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form318_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form318_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form318_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form318_header'></th>
						<th><input type='text' placeholder="Value" class='floatlabel' name='values' form='form318_header'></th>
						<th><input type='submit' form='form318_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form318_body'>
			</tbody>
		</table>
	</div>

	<script>

		function form318_header_ini()
		{
			var form=document.getElementById('form318_header');
			var other_element=form.elements['name'];

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form318_ini();
			});

			var other_data=new Object();
						other_data.data_store='user_preferences';
						other_data.return_column='display_name';
						other_data.indexes=[{index:'type',exact:'accounting'}];

			set_my_filter_json(other_data,other_element);
		}

		function form318_ini()
		{
			var fid=$("#form318_link").attr('data_id');
			if(fid==null)
				fid="";

			var form=document.getElementById('form318_header');
			var name_filter=form.elements['name'].value;
			var value_filter=form.elements['values'].value;

			show_loader();
			$('#form318_body').html('');

			var paginator=$('#form318_body').paginator();

			var other_data=new Object();
					other_data.count=paginator.page_size();
					other_data.start_index=paginator.get_index();
					other_data.data_store='user_preferences';

					other_data.indexes=[{index:'id',value:fid},
									{index:'display_name',value:name_filter},
									{index:'value',value:value_filter},
									{index:'name'},
									{index:'type',exact:'accounting'}];

			read_json_rows('form318',other_data,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form318_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' title='"+result.name+"' form='form318_"+result.id+"'>"+result.display_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Value'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form318_"+result.id+"'>"+result.value+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form318_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<input type='hidden' form='form318_"+result.id+"' value='"+result.name+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form318_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button class='btn red' form='form318_"+result.id+"' title='Delete' onclick='form318_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form318_body').append(rowsHTML);
					var fields=document.getElementById("form318_"+result.id);

					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form318_update_item(fields);
					});
				});

				$('#form318').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:other_data,file:'Other Settings',report_id:'form318'});
				hide_loader();
			});
		};

		function form318_update_item(form)
		{
			if(is_update_access('form318'))
			{
				var display_name=form.elements[0].value;
				var values=form.elements[1].value;
				var data_id=form.elements[2].value;
				var name=form.elements[3].value;
				var del_button=form.elements[5];

				var last_updated=get_my_time();

				var data_json={data_store:'user_preferences',
	 				data:[{index:'name',value:name,unique:'yes'},
	 					{index:'display_name',value:display_name},
	 					{index:'value',value:values},
	 					{index:'last_updated',value:last_updated}]};

 				server_update_master_all(data_json);

				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form318_delete_item(button)
		{
			if(is_delete_access('form318'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var name=form.elements[3].value;
					var data_json={data_store:'user_preferences',
 							data:[{index:'name',value:name}]};

					server_delete_master_all(data_json);

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
