<div id='form48' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=modal136_action('report');>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form48_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form48_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form48_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form48_header'></form>
						<th><input type='text' placeholder="Report Name" class='floatlabel' name='name' form='form48_header'></th>
						<th><input type='text' placeholder="Tables" class='floatlabel' name='tables' form='form48_header'></th>
						<th><input type='text' placeholder="Value" readonly="readonly" name='selection' form='form48_header'></th>
						<th><input type='submit' form='form48_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form48_body'>
			</tbody>
		</table>
	</div>
	
	<script>

		function form48_header_ini()
		{	
			var form=document.getElementById('form48_header');
			var other_element=form.elements['name'];
						
			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form48_ini();
			});
			
			var other_data=new Object();
						other_data.data_store='user_preferences';
						other_data.return_column='display_name';
						other_data.indexes=[{index:'type',exact:'report'}];
					
			set_my_filter_json(other_data,other_element);
		}	
		
		function form48_ini()
		{
			var fid=$("#form48_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			var form=document.getElementById('form48_header');
			var name_filter=form.elements['name'].value;
			var tables_filter=form.elements['tables'].value;
			
			show_loader();
			$('#form48_body').html('');	
			
			var paginator=$('#form48_body').paginator();
			
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
									
			read_json_rows('form48',other_data,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form48_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' title='"+result.name+"' form='form48_"+result.id+"'>"+result.display_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Tables'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form48_"+result.id+"'>"+result.tables+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Value'>";
								rowsHTML+="<input type='checkbox' readonly='readonly' form='form48_"+result.id+"' "+result.value+">";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form48_"+result.id+"' value='"+result.id+"'>";	
								rowsHTML+="<input type='hidden' form='form48_"+result.id+"' value='"+result.name+"'>";	
								rowsHTML+="<button type='submit' class='btn green' form='form48_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button class='btn red' form='form48_"+result.id+"' title='Delete' onclick='form48_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form48_body').append(rowsHTML);
					var fields=document.getElementById("form48_"+result.id);
					
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form48_update_item(fields);
					});
				});

				$('#form48').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(other_data,'Report Tabs','form48',function (item){});
				hide_loader();
			});
		};

		function form48_update_item(form)
		{
			if(is_update_access('form48'))
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
	 				log_data:{title:'Updated',notes:'Report Tab '+display_name,link_to:'form48'}};
 				update_json(data_json);
 				
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form48_delete_item(button)
		{
			if(is_delete_access('form48'))
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
 							log_data:{title:'Deleted',notes:'Report tab '+display_name,link_to:'form48'}};
					
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