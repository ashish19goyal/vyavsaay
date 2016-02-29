<div id='form316' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=modal136_action('report','master');>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form316_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form316_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form316_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form316_header'></form>
						<th><input type='text' placeholder="Report Name" class='floatlabel' name='name' form='form316_header'></th>
						<th><input type='text' placeholder="Tables" class='floatlabel' name='tables' form='form316_header'></th>
						<th><input type='text' placeholder="Value" readonly="readonly" name='selection' form='form316_header'></th>
						<th><input type='submit' form='form316_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form316_body'>
			</tbody>
		</table>
	</div>
	
	<script>

		function form316_header_ini()
		{	
			var form=document.getElementById('form316_header');
			var other_element=form.elements['name'];
						
			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form316_ini();
			});
			
			var other_data=new Object();
						other_data.data_store='user_preferences';
						other_data.return_column='display_name';
						other_data.indexes=[{index:'type',exact:'report'}];
					
			set_my_filter_json(other_data,other_element);
		}	
		
		function form316_ini()
		{
			var fid=$("#form316_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			var form=document.getElementById('form316_header');
			var name_filter=form.elements['name'].value;
			var tables_filter=form.elements['tables'].value;
			
			show_loader();
			$('#form316_body').html('');	
			
			var paginator=$('#form316_body').paginator();
			
			var other_data=new Object();
					other_data.count=paginator.page_size();
					other_data.start_index=paginator.get_index();
					other_data.data_store='user_preferences';

					other_data.indexes=[{index:'id',value:fid},
									{index:'display_name',value:name_filter},
									{index:'tables',value:tables_filter},
									{index:'value'},
									{index:'name'},
									{index:'type',exact:'report'}];
									
			read_json_rows('form316',other_data,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form316_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' title='"+result.name+"' form='form316_"+result.id+"'>"+result.display_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Tables'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form316_"+result.id+"'>"+result.tables+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Value'>";
								rowsHTML+="<input type='checkbox' readonly='readonly' form='form48_"+result.id+"' "+result.value+">";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form316_"+result.id+"' value='"+result.id+"'>";	
								rowsHTML+="<input type='hidden' form='form316_"+result.id+"' value='"+result.name+"'>";	
								rowsHTML+="<button type='submit' class='btn green' form='form316_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button class='btn red' form='form316_"+result.id+"' title='Delete' onclick='form316_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form316_body').append(rowsHTML);
					var fields=document.getElementById("form316_"+result.id);
					
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form316_update_item(fields);
					});
				});

				$('#form316').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(other_data,'Report Tabs','form316',function (item){});
				hide_loader();
			});
		};

		function form316_update_item(form)
		{
			if(is_update_access('form316'))
			{
				var display_name=form.elements[0].value;
				var tables=form.elements[1].value;
				var value='unchecked';
				if(form.elements[2].checked)
					value='checked';
						
				var data_id=form.elements[3].value;
				var name=form.elements[4].value;
				var del_button=form.elements[6];
				
				var last_updated=get_my_time();
				
				var data_json={data_store:'user_preferences',
	 				data:[{index:'name',value:name,unique:'yes'},
	 					{index:'display_name',value:display_name},
	 					{index:'value',value:value},
	 					{index:'tables',value:tables},
	 					{index:'last_updated',value:last_updated}]};
 				
 				server_update_master_all(data_json);
				
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form316_delete_item(button)
		{
			if(is_delete_access('form316'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var name=form.elements[4].value;
					var data_json={data_store:'user_preferences',
 							data:[{index:'name',value:name}]};
					
					var data2_json={data_store:'access_control',
							data:[{index:'element_id',value:name}]};

					server_delete_master_all(data_json);			
					server_delete_master_all(data2_json);			
										
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