<div id='form262' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form262_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form262_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form262_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form262_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                </ul>
            </div>
      </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables sortable" width="100%">
			<thead>
				<tr>
					<form id='form262_header'></form>
						<th><input type='text' placeholder="Order" readonly='readonly' name='order' form='form262_header'></th>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form262_header'></th>
						<th><input type='text' placeholder="Display Name" class='floatlabel' name='disp' form='form262_header'></th>
						<th><input type='text' placeholder="Design" readonly="readonly" name='color' form='form262_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form262_header'></th>
						<th><input type='submit' form='form262_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form262_body'>
			</tbody>
		</table>
	</div>
	
	<script>
		function form262_header_ini()
		{
			var filter_fields=document.getElementById('form262_header');
			var grid_filter=filter_fields.elements['name'];
			var name_filter=filter_fields.elements['disp'];
			var status_filter=filter_fields.elements['status'];
				
			var grid_data={data_store:'system_grids',return_column:'name'};
			var name_data={data_store:'system_grids',return_column:'display_name'};
			
			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form262_ini();
			});
		
			set_my_filter_json(grid_data,grid_filter);
			set_my_filter_json(name_data,name_filter);
			set_static_filter_json('system_grids','status',status_filter);
			
			var body_elem=document.getElementById('form262_body');
			body_elem.addEventListener('table_sort',function(e)
			{
				form262_update_serial_numbers();
				$("[id^='save_form262_']").click();
			},false);
		};
		
		function form262_ini()
		{
			show_loader();
			var fid=$("#form262_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			var filter_fields=document.getElementById('form262_header');
			
			var fgrid=filter_fields.elements['name'].value;
			var fname=filter_fields.elements['disp'].value;
			var fstatus=filter_fields.elements['status'].value;
		
			$('#form262_body').html("");
		
			var new_columns=new Object();
					new_columns.data_store='system_grids';		
					new_columns.indexes=[{index:'id',value:fid},
										{index:'name',value:fgrid},
										{index:'display_name',value:fname},
										{index:'back_color'},
										{index:'elements'},
										{index:'grid_order'},
										{index:'icon'},
										{index:'status',value:fstatus}];
				
			read_json_rows('form262',new_columns,function(results)
			{	
				results.sort(function(a,b)
				{
					if(parseInt(a.grid_order)>parseInt(b.grid_order))
					{	return 1;}
					else 
					{	return -1;}
				});
					
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form262_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Order'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form262_"+result.id+"' value='"+result.grid_order+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Grid'>";
								rowsHTML+="<a onclick=element_display('"+result.id+"','form263');><input type='text' readonly='readonly' form='form262_"+result.id+"' value='"+result.name+"'></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form262_"+result.id+"' value='"+result.display_name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Design'>";
								rowsHTML+="<input type='text' readonly='readonly' placeholder='Color' class='dblclick_editable floatlabel' form='form262_"+result.id+"' value='"+result.back_color+"'>";
								rowsHTML+="<input type='text' readonly='readonly' placeholder='Icon' class='dblclick_editable floatlabel' form='form262_"+result.id+"' value='"+result.icon+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form262_"+result.id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form262_"+result.id+"' value='"+result.id+"'>";	
								rowsHTML+="<button type='submit' class='btn green' form='form262_"+result.id+"' id='save_form262_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' name='delete' class='btn red' form='form262_"+result.id+"' title='Delete' onclick='form262_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form262_body').append(rowsHTML);
					var fields=document.getElementById("form262_"+result.id);
					var status_filter=fields.elements[5];
								
					set_static_value_list('system_grids','status',status_filter);
					
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form262_update_item(fields);
					});
				});

				$('#form262').formcontrol();
				initialize_tabular_report_buttons(new_columns,'System Grids','form262',function (item){});
				hide_loader();
			});
		}
		
		function form262_add_item()
		{
			if(is_create_access('form262'))
			{
				var id=vUtil.newKey();
		
				var rowsHTML="<tr>";
					rowsHTML+="<form id='form262_"+id+"'></form>";
						rowsHTML+="<td data-th='Order'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form262_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Grid'>";
							rowsHTML+="<input type='text' form='form262_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Name'>";
							rowsHTML+="<input type='text' class='dblclick_editable' form='form262_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Design'>";
							rowsHTML+="<input type='text' class='dblclick_editable floatlabel' placeholder='Color' form='form262_"+id+"'>";
							rowsHTML+="<input type='text' class='dblclick_editable floatlabel' placeholder='Icon' form='form262_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' class='dblclick_editable' form='form262_"+id+"' value='active'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form262_"+id+"' value='"+id+"'>";
							rowsHTML+="<button type='submit' class='btn green' form='form262_"+id+"' id='save_form262_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
							rowsHTML+="<button type='button' name='delete' class='btn red' form='form262_"+id+"' title='Delete' onclick='$(this).parent().parent().remove(); form262_update_serial_numbers();'><i class='fa fa-trash'></i></button>";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
			
				$('#form262_body').prepend(rowsHTML);
				longPressEditable($('.dblclick_editable'));
				
				var fields=document.getElementById("form262_"+id);
				var status_filter=fields.elements[5];

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form262_create_item(fields);
				});

				set_static_value_list('system_grids','status',status_filter);
				form262_update_serial_numbers();
				$('#form262').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}		
		}
		
		function form262_create_item(form)
		{
			if(is_create_access('form262'))
			{
				var order=form.elements[0].value;
				var name=form.elements[1].value;
				var display_name=form.elements[2].value;
				var back_color=form.elements[3].value;
				var icon=form.elements[4].value;
				var status=form.elements[5].value;
				var data_id=form.elements[6].value;
				var del_button=form.elements['delete'];
				
				var last_updated=get_my_time();
				var data_json={data_store:'system_grids',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'display_name',value:display_name},
	 					{index:'back_color',value:back_color},
	 					{index:'grid_order',value:order},
	 					{index:'status',value:status},
	 					{index:'icon',value:icon},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Grid '+display_name+' to Dashboard',link_to:'form262'}};
 								
				create_json(data_json);
				
				$(form).readonly();
				
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form262_delete_item(del_button);
				});
				
				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form262_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form262_update_item(form)
		{
			if(is_update_access('form262'))
			{
				var order=form.elements[0].value;
				var name=form.elements[1].value;
				var display_name=form.elements[2].value;
				var back_color=form.elements[3].value;
				var icon=form.elements[4].value;
				var status=form.elements[5].value;
				var data_id=form.elements[6].value;
				var del_button=form.elements['delete'];
				
				var last_updated=get_my_time();
				var data_json={data_store:'system_grids',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'display_name',value:display_name},
	 					{index:'back_color',value:back_color},
	 					{index:'grid_order',value:order},
	 					{index:'status',value:status},
	 					{index:'icon',value:icon},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Grid '+display_name+' on Dashboard',link_to:'form262'}};
 				update_json(data_json);
				
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form262_delete_item(button)
		{
			if(is_delete_access('form262'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var name=form.elements[1].value;
					var display_name=form.elements[2].value;
					var data_id=form.elements[6].value;
					var data_json={data_store:'system_grids',
		 				log:'yes',
		 				data:[{index:'id',value:data_id}],
		 				log_data:{title:'Deleted',notes:'Grid '+display_name+' from Dashboard',link_to:'form262'}};
	 				delete_json(data_json);
					
					$(button).parent().parent().remove();
					form262_update_serial_numbers();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form262_update_serial_numbers()
		{
			$('#form262_body').find('tr').each(function(index)
			{
				$(this).find('td:nth-child(2)>input').attr('value',index+1);
			});
		}

	</script>
</div>