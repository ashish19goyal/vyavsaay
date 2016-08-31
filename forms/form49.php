<div id='form49' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=modal136_action('form');>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form49_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form49_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form49_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form49_header'></form>
						<th><input type='text' placeholder="Form Name" class='floatlabel' name='name' form='form49_header'></th>
						<th><input type='text' placeholder="Tables" class='floatlabel' name='tables' form='form49_header'></th>
						<th><input type='text' placeholder="Value" readonly="readonly" name='selection' form='form49_header'></th>
						<th><input type='submit' form='form49_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form49_body'>
			</tbody>
		</table>
	</div>
	
	<script>

		function form49_header_ini()
		{	
			var form=document.getElementById('form49_header');
			var other_element=form.elements['name'];
						
			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form49_ini();
			});
			
			var other_data=new Object();
						other_data.data_store='user_preferences';
						other_data.return_column='display_name';
						other_data.indexes=[{index:'type',exact:'form'}];
					
			set_my_filter_json(other_data,other_element);
		}	
		
		function form49_ini()
		{
			var fid=$("#form49_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			var form=document.getElementById('form49_header');
			var name_filter=form.elements['name'].value;
			var tables_filter=form.elements['tables'].value;
			
			show_loader();
			$('#form49_body').html('');	
			
			var paginator=$('#form49_body').paginator();
			
			var other_data=new Object();
					other_data.count=paginator.page_size();
					other_data.start_index=paginator.get_index();
					other_data.data_store='user_preferences';

					other_data.indexes=[{index:'id',value:fid},
									{index:'display_name',value:name_filter},
									{index:'tables',value:tables_filter},
									{index:'value'},
									{index:'name'},
									{index:'type',exact:'form'}];
									
			read_json_rows('form49',other_data,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form49_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' title='"+result.name+"' form='form49_"+result.id+"'>"+result.display_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Tables'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form49_"+result.id+"'>"+result.tables+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Value'>";
								rowsHTML+="<input type='checkbox' readonly='readonly' form='form49_"+result.id+"' "+result.value+">";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form49_"+result.id+"' value='"+result.id+"'>";	
								rowsHTML+="<input type='hidden' form='form49_"+result.id+"' value='"+result.name+"'>";	
								rowsHTML+="<button type='submit' class='btn green' form='form49_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button class='btn red' form='form49_"+result.id+"' title='Delete' onclick='form49_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form49_body').append(rowsHTML);
					var fields=document.getElementById("form49_"+result.id);
					
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form49_update_item(fields);
					});
				});

				$('#form49').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(other_data,'Form Tabs','form49',function (item){});
				hide_loader();
			});
		};

		function form49_update_item(form)
		{
			if(is_update_access('form49'))
			{
				var display_name=form.elements[0].value;
				var tables=form.elements[1].value;
				var value='unchecked';
				if(form.elements[2].checked)
					value='checked';
				var data_id=form.elements[3].value;
				var name=form.elements[4].value;
				var del_button=form.elements[5];
				var last_updated=get_my_time();
				
				var data_json={data_store:'user_preferences',
	 				data:[{index:'id',value:data_id},
	 					{index:'display_name',value:display_name},
	 					{index:'tables',value:tables},
	 					{index:'value',value:value},
	 					{index:'last_updated',value:last_updated}],
	 				log:'yes',
	 				log_data:{title:'Updated',notes:'Form Tab '+display_name,link_to:'form49'}};
 				update_json(data_json);
 				
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form49_delete_item(button)
		{
			if(is_delete_access('form49'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					
					var display_name=form.elements[0].value;
					var data_id=form.elements[3].value;
					var name=form.elements[4].value;
					var data_json={data_store:'user_preferences',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:'Deleted',notes:'Form tab '+display_name,link_to:'form49'}};
					
					var data2_json={data_store:'access_control',
								data:[{index:'element_id',value:name}]};
					
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

	</script>
</div>