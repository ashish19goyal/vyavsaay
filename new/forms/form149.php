<div id='form149' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form149_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form149_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form149_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form149_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form149_header'></form>
						<th><input type='text' placeholder="Role" class='floatlabel' name='role' form='form149_header'></th>
						<th><input type='text' placeholder="Username" class='floatlabel' name='username' form='form149_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form149_header'></th>
						<th><input type='submit' form='form149_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form149_body'>
			</tbody>
		</table>
	</div>
	
	<script>
		function form149_header_ini()
		{
			var filter_fields=document.getElementById('form149_header');
			var role_filter=filter_fields.elements['role'];
			var username_filter=filter_fields.elements['username'];
			var status_filter=filter_fields.elements['status'];
			
			var role_data={data_store:'roles',return_column:'role_name'};
			set_my_filter_json(role_data,role_filter);
		
			var user_data={data_store:'user_role_mapping',return_column:'username'};
			set_my_filter_json(user_data,username_filter);					
				
			set_static_filter_json('roles','status',status_filter);
			
			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form149_ini();
			});
		};
		
		function form149_ini()
		{
			show_loader();
			var fid=$("#form149_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			$('#form149_body').html("");

			var filter_fields=document.getElementById('form149_header');
			var frole=filter_fields.elements['role'].value;
			var fuser=filter_fields.elements['username'].value;
			var fstatus=filter_fields.elements['status'].value;
			
			var paginator=$('#form149_body').paginator();
			
			var data_json=new Object();
					data_json.count=paginator.page_size();
					data_json.start_index=paginator.get_index();
					data_json.data_store='user_role_mapping';

					data_json.indexes=[{index:'id',value:fid},
									{index:'role_name',value:frole},
									{index:'username',value:fuser},
									{index:'status',value:fstatus}];
			
			read_json_rows('form149',data_json,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form149_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Role'>";
								rowsHTML+="<textarea readonly='readonly' form='form149_"+result.id+"'>"+result.role_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Username'>";
								rowsHTML+="<textarea readonly='readonly' form='form149_"+result.id+"'>"+result.username+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select form='form149_"+result.id+"' class='dblclick_editable'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form149_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form149_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' name='delete' form='form149_"+result.id+"' title='Delete' onclick='form149_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form149_body').append(rowsHTML);
		
					var fields=document.getElementById("form149_"+result.id);
					var status_filter=fields.elements[2];
					
					set_static_select('user_role_mapping','status',status_filter,function () 
					{
						$(status_filter).selectpicker('val',result.status);
					});
					
					$(fields).on("submit",function(event)
					{
						event.preventDefault();
						form149_update_item(fields);
					});
				});
		
				$('#form149').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(data_json,'User Role Mappings','form149',function (item){});
				
				hide_loader();
			});	
		};
		
		function form149_add_item()
		{
			if(is_create_access('form149'))
			{
				var id=get_new_key();
				var rowsHTML="<tr>";
						rowsHTML+="<form id='form149_"+id+"'></form>";
							rowsHTML+="<td data-th='Role'>";
								rowsHTML+="<input type='text' form='form149_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Username'>";
								rowsHTML+="<input type='text' form='form149_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select form='form149_"+id+"' data-style='btn-info' class='dblclick_editable'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form149_"+id+"' value='"+id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form149_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' name='delete' form='form149_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
				rowsHTML+="</tr>";
				
				$('#form149_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form149_"+id);
				var role_filter=fields.elements[0];
				var user_filter=fields.elements[1];
				var status_filter=fields.elements[2];
				
				var role_data={data_store:'roles',return_column:'role_name'};
				set_my_value_list_json(role_data,role_filter,function () 
				{
					$(role_filter).focus();
				});		
				
				var user_data={data_store:'accounts',return_column:'username'};
				set_my_value_list_json(user_data,user_filter);		
				
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form149_create_item(fields);
				});

				set_static_select('user_role_mapping','status',status_filter);
				
				$('#form149').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}		
		}
		
		function form149_create_item(form)
		{
			if(is_create_access('form149'))
			{
				var role=form.elements[0].value;
				var user=form.elements[1].value;
				var status=$(form.elements[2]).val();		
				var data_id=form.elements[3].value;
				var last_updated=get_my_time();
				
				var data_json={data_store:'user_role_mapping',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'role_name',value:role,uniqueWith:['username']},
	 					{index:'username',value:user},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Assigned',notes:'Role '+role+' to user '+user,link_to:'form149'}}; 				
				create_json(data_json);
				
				$(form).readonly();
						
				var del_button=form.elements['delete'];
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form149_delete_item(del_button);
				});
				
				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form149_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form149_update_item(form)
		{
			if(is_update_access('form149'))
			{
				var form_id=$(button).attr('form');
				var form=document.getElementById(form_id);
		
				var role=form.elements[0].value;
				var username=form.elements[1].value;
				var status=form.elements[2].value;
				var data_id=form.elements[3].value;
				var last_updated=get_my_time();
				
				var data_json={data_store:'user_role_mapping',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Role '+role+' assigned to user '+user,link_to:'form149'}}; 				
								
				update_json(data_json);
									
				$(form).readonly();				
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form149_delete_item(button)
		{
			if(is_delete_access('form149'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					
					var role=form.elements[0].value;
					var user=form.elements[1].value;
					var data_id=form.elements[3].value;
					
					var data_json={data_store:'user_role_mapping',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Removed",notes:"Role "+role+" assigned to user "+user,link_to:"form149"}};
										
					delete_json(data_json);					
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form149_import_template()
		{
			var data_array=['id','role_name','username','status'];
			my_array_to_csv(data_array);
		};
		
		function form149_import_validate(data_array)
		{
			var validate_template_array=[{column:'role_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z _-]+$')},
									{column:'username',required:'yes',regex:new RegExp('^[0-9a-zA-Z_-]+$')},
									{column:'status',required:'yes',list:['active','inactive']}];
							
			var error_array=validate_import_array(data_array,validate_template_array);
			return error_array;					
		}
		
		
		function form149_import(data_array,import_type)
		{
			var data_json={data_store:'user_role_mapping',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Role mappings for users',link_to:'form149'}};

			var counter=1;
			var last_updated=get_my_time();
		
			data_array.forEach(function(row)
			{
				counter+=1;
				if(import_type=='create_new')
				{
					row.id=last_updated+counter;
				}
				
				var data_json_array=[{index:'id',value:row.id},
	 					{index:'role_name',value:row.role_name},
	 					{index:'username',value:row.username},
	 					{index:'status',value:row.status},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
			});
			
			if(import_type=='create_new')
			{
				create_batch_json(data_json);
			}
			else
			{
				update_batch_json(data_json);
			}		
		};

	</script>
</div>