<div id='form50' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=modal135_action('accounting');>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form50_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form50_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form50_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form50_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form50_header'></th>
						<th><input type='text' placeholder="Value" class='floatlabel' name='values' form='form50_header'></th>
						<th><input type='submit' form='form50_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form50_body'>
			</tbody>
		</table>
	</div>
	
	<script>

		function form50_header_ini()
		{	
			var form=document.getElementById('form50_header');
			var other_element=form.elements['name'];
						
			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form50_ini();
			});
			
			var other_data=new Object();
						other_data.data_store='user_preferences';
						other_data.return_column='display_name';
						other_data.indexes=[{index:'type',exact:'accounting'}];
					
			set_my_filter_json(other_data,other_element);
		}	
		
		function form50_ini()
		{
			var fid=$("#form50_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			var form=document.getElementById('form50_header');
			var name_filter=form.elements['name'].value;
			var value_filter=form.elements['values'].value;
			
			show_loader();
			$('#form50_body').html('');	
			
			var paginator=$('#form50_body').paginator();
			
			var other_data=new Object();
					other_data.count=paginator.page_size();
					other_data.start_index=paginator.get_index();
					other_data.data_store='user_preferences';

					other_data.indexes=[{index:'id',value:fid},
									{index:'display_name',value:name_filter},
									{index:'value',value:value_filter},
									{index:'name'},
									{index:'type',exact:'accounting'}];
									
			read_json_rows('form50',other_data,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form50_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' title='"+result.name+"' form='form50_"+result.id+"'>"+result.display_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Value'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form50_"+result.id+"'>"+result.value+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form50_"+result.id+"' value='"+result.id+"'>";	
								rowsHTML+="<input type='hidden' form='form50_"+result.id+"' value='"+result.name+"'>";	
								rowsHTML+="<button type='submit' class='btn green' form='form50_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button class='btn red' form='form50_"+result.id+"' title='Delete' onclick='form50_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form50_body').append(rowsHTML);
					var fields=document.getElementById("form50_"+result.id);
					
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form50_update_item(fields);
					});
				});

				$('#form50').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(other_data,'Other settings','form50',function (item){});
				hide_loader();
			});
		};
		
		function form50_update_item(form)
		{
			if(is_update_access('form50'))
			{
				var display_name=form.elements[0].value;
				var values=form.elements[1].value;
				var data_id=form.elements[2].value;
				var name=form.elements[3].value;
				var del_button=form.elements[5];
				var last_updated=get_my_time();
				
				var data_json={data_store:'user_preferences',
	 				data:[{index:'id',value:data_id},
	 					{index:'display_name',value:display_name},
	 					{index:'value',value:values},
	 					{index:'last_updated',value:last_updated}],
	 				log:'yes',
	 				log_data:{title:'Updated',notes:'Setting '+display_name,link_to:'form50'}};
 				update_json(data_json);
 				
				set_session_var(name,values);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form50_delete_item(button)
		{
			if(is_delete_access('form50'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					
					var display_name=form.elements[0].value;
					var data_id=form.elements[2].value;
					
					var data_json={data_store:'user_preferences',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:'Deleted',notes:'Setting '+display_name,link_to:'form50'}};
			
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