<div id='form277' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form277_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form277_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form277_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form277_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form277_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form277_header'></th>
						<th><input type='text' placeholder="Description" class='floatlabel' name='desc' form='form277_header'></th>
						<th><input type='text' placeholder="Timing" readonly="readonly" class='floatlabel' name='time' form='form277_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form277_header'></th>
						<th><input type='text' placeholder="Function" readonly="readonly" name='details' form='form277_header'></th>
						<th><input type='submit' form='form277_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form277_body'>
			</tbody>
		</table>
	</div>
	
	<script>

		function form277_header_ini()
		{	
			var form=document.getElementById('form277_header');
			var name_filter=form.elements['name'];
			var desc_filter=form.elements['desc'];
			var status_filter=form.elements['status'];
			
			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form277_ini();
			});
			
			set_static_filter_json('system_notifications','status',status_filter);
		}	
		
		function form277_ini()
		{
			var fid=$("#form277_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			var form=document.getElementById('form277_header');
			var name_filter=form.elements['name'].value;
			var desc_filter=form.elements['desc'].value;
			var status_filter=form.elements['status'].value;

			show_loader();
			$('#form277_body').html('');	
			
			var paginator=$('#form277_body').paginator();
			
			var pop_data=new Object();
					pop_data.count=paginator.page_size();
					pop_data.start_index=paginator.get_index();
					pop_data.data_store='system_notifications';
							
					pop_data.indexes=[{index:'id',value:fid},
									{index:'name',value:name_filter},
									{index:'description',value:desc_filter},
									{index:'status',value:status_filter},
									{index:'repeat_delay'},
									{index:'initial_delay'},
									{index:'function_name'},
									{index:'function_def'}];
			read_json_rows('form277',pop_data,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form277_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form277_"+result.id+"' value='"+result.name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form277_"+result.id+"'>"+result.description+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Timing'>";
								rowsHTML+="<input type='number' step='any' placeholder='Initial Delay' class='dblclick_editable floatlabel' readonly='readonly' form='form277_"+result.id+"' value='"+result.initial_delay+"'>";
								rowsHTML+="<input type='number' step='any' placeholder='Repeat Delay' class='dblclick_editable floatlabel' readonly='readonly' form='form277_"+result.id+"' value='"+result.repeat_delay+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select class='dblclick_editable' form='form277_"+result.id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Function'>";
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form277_"+result.id+"' onclick=\"modal178_action('"+result.id+"');\">Function</button>";							
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form277_"+result.id+"' value='"+result.id+"'>";	
								rowsHTML+="<button type='submit' class='btn green' form='form277_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form277_"+result.id+"' title='Delete' onclick='form277_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form277_body').append(rowsHTML);
					var fields=document.getElementById("form277_"+result.id);
					var status_filter=fields.elements[4];

					set_static_select('system_notifications','status',status_filter,function () 
					{
						$(status_filter).selectpicker('val',result.status);
					});
					
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form277_update_item(fields);
					});
				});
				
				$('#form277').formcontrol();
				paginator.update_index(results.length);				
				initialize_tabular_report_buttons(pop_data,'Notifications','form277',function (item){});
				hide_loader();
			});
		};

		function form277_add_item()
		{
			if(is_create_access('form277'))
			{
				var id=get_new_key();
		
				var rowsHTML="<tr>";
						rowsHTML+="<form id='form277_"+id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<input type='text' form='form277_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea class='dblclick_editable' form='form277_"+id+"'></textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Timing'>";
								rowsHTML+="<input type='number' step='any' placeholder='Initial Delay' class='dblclick_editable floatlabel' form='form277_"+id+"'>";
								rowsHTML+="<input type='number' step='any' placeholder='Repeat Delay' class='dblclick_editable floatlabel' form='form277_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select class='dblclick_editable' form='form277_"+id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Function'>";
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form277_"+id+"'>Function</button>";							
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form277_"+id+"' value='"+id+"'>";	
								rowsHTML+="<button type='submit' class='btn green' form='form277_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form277_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
							
				$('#form277_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form277_"+id);
				var name_filter=fields.elements[0];
				var status_filter=fields.elements[4];

				$(name_filter).focus();

				set_static_select('system_notifications','status',status_filter);
				
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form277_create_item(fields);
				});
				$('#form277').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}		
		}
		
		function form277_create_item(form)
		{
			if(is_create_access('form277'))
			{
				var name=form.elements[0].value;
				var desc=form.elements[1].value;
				var initial_delay=form.elements[2].value;
				var repeat_delay=form.elements[3].value;
				var status=$(form.elements[4]).val();
				var func_button=form.elements[5];
				var data_id=form.elements[6].value;
				var del_button=form.elements[8];
				
				var last_updated=get_my_time();
				
				var data_json={data_store:'system_notifications',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'description',value:desc},
	 					{index:'initial_delay',value:initial_delay},
	 					{index:'repeat_delay',value:repeat_delay},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}]};

				create_json(data_json);
				
				$(form).readonly();
				
				$(func_button).on('click',function () 
				{
					modal178_action(data_id);
				});

				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form277_delete_item(del_button);
				});
				
				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form277_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form277_update_item(form)
		{
			if(is_update_access('form277'))
			{
				var name=form.elements[0].value;
				var desc=form.elements[1].value;
				var initial_delay=form.elements[2].value;
				var repeat_delay=form.elements[3].value;
				var status=$(form.elements[4]).val();
				var func_button=form.elements[5];
				var data_id=form.elements[6].value;
				var del_button=form.elements[8];
				
				var last_updated=get_my_time();
				
				var data_json={data_store:'system_notifications',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'description',value:desc},
	 					{index:'initial_delay',value:initial_delay},
	 					{index:'repeat_delay',value:repeat_delay},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}]};

				update_json(data_json);				
				
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form277_delete_item(button)
		{
			if(is_delete_access('form277'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var name=form.elements[0].value;
					var data_id=form.elements[6].value;
					var data_json={data_store:'system_notifications',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Notification "+name,link_to:"form277"}};
			
					delete_json(data_json);			
					
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form277_import_template()
		{
			var data_array=['id','name','description','function_name','function_def','initial_delay','repeat_delay','status'];
			my_array_to_csv(data_array);
		};
		
		function form277_import_validate(data_array)
		{
			var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z_ -]+$')},
									{column:'description',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
									{column:'function_name',regex:new RegExp('^[a-zA-Z0-9_() ;]+$')},
									{column:'function_def'},
									{column:'status',required:'yes',list:['active','inactive']},
									{column:'initial_delay',required:'yes',regex:new RegExp('^[0-9]+$')},
									{column:'repeat_delay',required:'yes',regex:new RegExp('^[0-9]+$')}];
							
			var error_array=validate_import_array(data_array,validate_template_array);
			return error_array;					
		}
		
		function form277_import(data_array,import_type)
		{
			var data_json={data_store:'system_notifications',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Notifications for system configuration',link_to:'form277'}};

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
	 					{index:'name',value:row.name},
	 					{index:'description',value:row.description},
	 					{index:'initial_delay',value:row.initial_delay},
	 					{index:'repeat_delay',value:row.repeat_delay},
	 					{index:'function_name',value:row.function_name},
	 					{index:'function_def',value:row.function_def},
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