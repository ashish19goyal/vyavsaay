<div id='form44' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form44_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form44_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form44_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form44_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form44_header'></th>
						<th><input type='text' placeholder="Description" class='floatlabel' name='desc' form='form44_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form44_header'></th>
						<th><input type='submit' form='form44_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form44_body'>
			</tbody>
		</table>
	</div>

	
	<script>

		function form44_header_ini()
		{
			var filter_fields=document.getElementById('form44_header');
			var name_filter=filter_fields.elements['name'];
			var status_filter=filter_fields.elements['status'];
			
			var name_columns={data_store:'newsletter',return_column:'name'};
			set_my_filter_json(name_columns,name_filter);
			set_static_filter_json('newsletter','status',status_filter);
			
			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form44_ini();
			});
		};
		
		function form44_ini()
		{
			show_loader();
			var fid=$("#form44_link").attr('data_id');
			if(fid==null)
				fid="";	

			$('#form44_body').html("");
						
			var filter_fields=document.getElementById('form44_header');
			var fname=filter_fields.elements['name'].value;
			var fdesc=filter_fields.elements['desc'].value;
			var fstatus=filter_fields.elements['status'].value;
			
			var paginator=$('#form44_body').paginator();
			
			var new_columns=new Object();
					new_columns.count=paginator.page_size();
					new_columns.start_index=paginator.get_index();
					new_columns.data_store='newsletter';
					new_columns.indexes=[{index:'id',value:fid},
									{index:'name',value:fname},
									{index:'description',value:fdesc},
									{index:'status',value:fstatus}];
		
			read_json_rows('form44',new_columns,function(results)
			{	
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form44_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<a onclick=element_display('"+result.id+"','form299',['form2']);><textarea readonly='readonly' form='form44_"+result.id+"'>"+result.name+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form44_"+result.id+"'>"+result.description+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' class='dblclick_editable' readonly='readonly' required form='form44_"+result.id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' readonly='readonly' form='form44_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form44_"+result.id+"' name='save' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form44_"+result.id+"' name='delete' title='Delete' onclick='form44_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form44_body').append(rowsHTML);
					
					var fields=document.getElementById("form44_"+result.id);
					var status_filter=fields.elements[2];
					
					set_static_filter_json('newsletter','status',status_filter);
					
					$(fields).on("submit",function(event)
					{
						event.preventDefault();
						form44_update_item(fields);
					});
				});
		
				$('#form44').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Newsletters','form44',function (item){});
				hide_loader();
			});
		};
		
		function form44_update_item(form)
		{
			if(is_update_access('form44'))
			{
				var name=form.elements[0].value;
				var description=form.elements[1].value;
				var status=form.elements[2].value;
				var data_id=form.elements[3].value;
				var last_updated=get_my_time();
				
				var data_json={data_store:'newsletter',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'description',value:description},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Newsletter '+name,link_to:'form44'}}; 								
								
				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form44_delete_item(button)
		{
			if(is_delete_access('form44'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					
					var name=form.elements[0].value;
					var data_id=form.elements[3].value;
					var last_updated=get_my_time();
					
					var data_json={data_store:'newsletter',
	 				log:'yes',
	 				data:[{index:'id',value:data_id}],
	 				log_data:{title:'Deleted',notes:'Newsletter '+name,link_to:'form44'}}; 								

					var data2_json={data_store:'newsletter_items',
	 					data:[{index:'nl_id',value:data_id}]};
					
					var data3_json={data_store:'documents',
	 				data:[{index:'target_id',value:data_id},{index:'doc_type',value:'newsletter'}]};
				
					delete_json(data_json);
					delete_json(data2_json);
					delete_json(data3_json);
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