<div id='form46' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=modal135_action('');>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form46_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form46_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form46_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form46_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form46_header'></th>
						<th><input type='text' placeholder="Value" class='floatlabel' name='values' form='form46_header'></th>
						<th><input type='submit' form='form46_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form46_body'>
			</tbody>
		</table>
	</div>
	
	<script>

		function form46_header_ini()
		{	
			var form=document.getElementById('form46_header');
			var other_element=form.elements['name'];
						
			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form46_ini();
			});
			
			var other_data=new Object();
						other_data.data_store='user_preferences';
						other_data.return_column='display_name';
						other_data.indexes=[{index:'type',exact:'other'}];
					
			set_my_filter_json(other_data,other_element);
		}	
		
		function form46_ini()
		{
			var fid=$("#form46_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			var form=document.getElementById('form46_header');
			var name_filter=form.elements['name'].value;
			var value_filter=form.elements['values'].value;
			
			show_loader();
			$('#form46_body').html('');	
			
			var paginator=$('#form46_body').paginator();
			
			var other_data=new Object();
					other_data.count=paginator.page_size();
					other_data.start_index=paginator.get_index();
					other_data.data_store='user_preferences';

					other_data.indexes=[{index:'id',value:fid},
									{index:'display_name',value:name_filter},
									{index:'value',value:value_filter},
									{index:'name'},
									{index:'type',exact:'other'}];
									
			read_json_rows('form46',other_data,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form46_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' title='"+result.name+"' form='form46_"+result.id+"'>"+result.display_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Value'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form46_"+result.id+"'>"+result.value+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form46_"+result.id+"' value='"+result.id+"'>";	
								rowsHTML+="<input type='hidden' form='form46_"+result.id+"' value='"+result.name+"'>";	
								rowsHTML+="<button type='submit' class='btn green' form='form46_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button class='btn red' form='form46_"+result.id+"' title='Delete' onclick='form46_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form46_body').append(rowsHTML);
					var fields=document.getElementById("form46_"+result.id);
					
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form46_update_item(fields);
					});
				});

				$('#form46').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(other_data,'Other settings','form46',function (item){});
				hide_loader();
			});
		};
		
		function form46_update_item(form)
		{
			if(is_update_access('form46'))
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
	 				log_data:{title:'Updated',notes:'Setting '+display_name,link_to:'form46'}};
 				update_json(data_json);
 				
				set_session_var(name,values);
				$('#form46').readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form46_delete_item(button)
		{
			if(is_delete_access('form46'))
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
 							log_data:{title:'Deleted',notes:'Setting '+display_name,link_to:'form46'}};
			
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