<div id='form264' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form264_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form264_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form264_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form264_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>

	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form264_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form264_header'></th>
						<th><input type='text' placeholder="Display" class='floatlabel' name='display' form='form264_header'></th>
						<th><input type='text' placeholder="Grid" class='floatlabel' name='grid' form='form264_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form264_header'></th>
						<th><input type='text' placeholder="Details" readonly="readonly" name='details' form='form264_header'></th>
						<th><input type='submit' form='form264_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form264_body'>
			</tbody>
		</table>
	</div>
	
	<script>
		function form264_header_ini()
		{
			var form=document.getElementById('form264_header');
			var name_filter=form.elements['name'];
			var display_filter=form.elements['display'];
			var grid_filter=form.elements['grid'];
			var status_filter=form.elements['status'];
			
			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form264_ini();
			});
			
			set_static_filter_json('system_grid_metrics','status',status_filter);
		};
		
		function form264_ini()
		{
			var fid=$("#form264_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			var form=document.getElementById('form264_header');
			var name_filter=form.elements['name'].value;
			var display_filter=form.elements['display'].value;
			var grid_filter=form.elements['grid'].value;
			var status_filter=form.elements['status'].value;

			show_loader();
			$('#form264_body').html('');	
			
			var paginator=$('#form264_body').paginator();
			
			var pop_data=new Object();
					pop_data.count=paginator.page_size();
					pop_data.start_index=paginator.get_index();
					pop_data.data_store='system_grid_metrics';
							
					pop_data.indexes=[{index:'id',value:fid},
									{index:'metric_id',value:name_filter},
									{index:'display_name',value:display_filter},
									{index:'grid',value:grid_filter},
									{index:'status',value:status_filter},
									{index:'repeat_time'},
									{index:'function_name'},
									{index:'function_def'}];
			read_json_rows('form264',pop_data,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form264_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form264_"+result.id+"' value='"+result.metric_id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Display'>";
								rowsHTML+="<input type='text' class='dblclick_editable' readonly='readonly' form='form264_"+result.id+"' value='"+result.display_name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Grid'>";
								rowsHTML+="<select class='dblclick_editable' form='form264_"+result.id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select class='dblclick_editable' form='form264_"+result.id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<input type='number' step='any' class='dblclick_editable floatlabel' placeholder='Repeat Time' readonly='readonly' form='form264_"+result.id+"' value='"+result.repeat_time+"'>";							
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form264_"+result.id+"' onclick=\"modal165_action('"+result.id+"');\">Function</button>";							
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form264_"+result.id+"' value='"+result.id+"'>";	
								rowsHTML+="<button type='submit' class='btn green' form='form264_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form264_"+result.id+"' title='Delete' onclick='form264_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form264_body').append(rowsHTML);
					var fields=document.getElementById("form264_"+result.id);
					var grid_filter=fields.elements[2];
					var status_filter=fields.elements[3];

					set_static_select('system_grid_metrics','status',status_filter,function () 
					{
						$(status_filter).selectpicker('val',result.status);
					});
					
					var type_data=new Object();
						type_data.data_store='system_grids';		
						type_data.return_column='name';
						type_data.indexes=[{index:'status',exact:'active'}];
					set_my_select(type_data,grid_filter,function()
					{
						$(grid_filter).selectpicker('val',result.grid);
					});
					
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form264_update_item(fields);
					});
				});
				
				$('#form264').formcontrol();
				paginator.update_index(results.length);				
				initialize_tabular_report_buttons(pop_data,'Grid Metrics','form264',function (item){});
				hide_loader();
			});
		}
		
		function form264_add_item()
		{
			if(is_create_access('form264'))
			{
				var id=get_new_key();
		
				var rowsHTML="<tr>";
						rowsHTML+="<form id='form264_"+id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<input type='text' form='form264_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Display'>";
								rowsHTML+="<input type='text' class='dblclick_editable' form='form264_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Grid'>";
								rowsHTML+="<select class='dblclick_editable' data-style='btn-info' form='form264_"+id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select class='dblclick_editable' data-style='btn-info' form='form264_"+id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<input type='number' step='any' class='dblclick_editable floatlabel' placeholder='Repeat Time' form='form264_"+id+"'>";							
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form264_"+id+"'>Function</button>";							
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form264_"+id+"' value='"+id+"'>";	
								rowsHTML+="<button type='submit' class='btn green' form='form264_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form264_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
						
				$('#form264_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form264_"+id);
				var name_filter=fields.elements[0];
				var grid_filter=fields.elements[2];
				var status_filter=fields.elements[3];

				$(name_filter).focus();

				set_static_select('system_grid_metrics','status',status_filter);
				var type_data=new Object();
					type_data.data_store='system_grids';		
					type_data.return_column='name';
					type_data.indexes=[{index:'status',exact:'active'}];
				set_my_select(type_data,grid_filter);
				
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form264_create_item(fields);
				});
				$('#form264').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}		
		}
		
		function form264_create_item(form)
		{
			if(is_create_access('form264'))
			{
				var name=form.elements[0].value;
				var display_name=form.elements[1].value;
				var grid=$(form.elements[2]).val();
				var status=$(form.elements[3]).val();
				var repeat_time=form.elements[4].value;
				var box_func=form.elements[5];
				var data_id=form.elements[6].value;
				var del_button=form.elements[8];
				
				var last_updated=get_my_time();
				
				var data_json={data_store:'system_grid_metrics',
	 				log:'no',
	 				data:[{index:'id',value:data_id},
	 					{index:'metric_id',value:name,unique:'yes'},
	 					{index:'display_name',value:display_name},
	 					{index:'grid',value:grid},
	 					{index:'repeat_time',value:repeat_time},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}]};

				create_json(data_json);

				$('#form264').readonly();
				
				$(box_func).on('click',function () 
				{
					modal165_action(data_id);
				});

				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form264_delete_item(del_button);
				});
				
				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form264_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form264_update_item(form)
		{
			if(is_update_access('form264'))
			{
				var name=form.elements[0].value;
				var display_name=form.elements[1].value;
				var grid=$(form.elements[2]).val();
				var status=$(form.elements[3]).val();
				var repeat_time=form.elements[4].value;
				var box_func=form.elements[5];
				var data_id=form.elements[6].value;
				var del_button=form.elements[8];
				
				var last_updated=get_my_time();
				var data_json={data_store:'system_grid_metrics',
	 				log:'no',
	 				data:[{index:'id',value:data_id},
	 					{index:'metric_id',value:name,unique:'yes'},
	 					{index:'display_name',value:display_name},
	 					{index:'grid',value:grid},
	 					{index:'repeat_time',value:repeat_time},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}]};
				
				update_json(data_json);
				
				for(var i=0;i<5;i++)
				{
					$(form.elements[i]).attr('readonly','readonly');
				}
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form264_delete_item(button)
		{
			if(is_delete_access('form264'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var name=form.elements[0].value;
					var data_id=form.elements[6].value;
					var data_json={data_store:'system_grid_metrics',
 							data:[{index:'id',value:data_id}]};

					delete_json(data_json);			

					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form264_import_template()
		{
			var data_array=['id','metric_id','display_name','grid','function_name','function_def','status','repeat_time'];
			my_array_to_csv(data_array);
		};
		
		function form264_import_validate(data_array)
		{
			var validate_template_array=[{column:'metric_id',required:'yes',regex:new RegExp('^[0-9a-zA-Z_]+$')},
									{column:'display_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
									{column:'grid',regex:new RegExp('^[a-zA-Z0-9_]+$')},
									{column:'function_name',regex:new RegExp('^[a-zA-Z0-9_() ;]+$')},
									{column:'status',required:'yes',list:['active','inactive']},
									{column:'repeat_time',required:'yes',regex:new RegExp('^[0-9]+$')}];
							
			var error_array=validate_import_array(data_array,validate_template_array);
			return error_array;					
		}
		
		function form264_import(data_array,import_type)
		{
			var data_json={data_store:'system_grid_metrics',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Metrics to be displayed on the dashboard',link_to:'form264'}};

			var counter=1;
			var last_updated=get_my_time();
		
			data_array.forEach(function(row)
			{
				counter+=1;
				if(import_type=='create_new')
				{
					row.id=last_updated+counter;
				}
				
				var data_json=[{index:'id',value:row.id},
	 					{index:'metric_id',value:row.metric_id},
	 					{index:'display_name',value:row.display_name},
	 					{index:'grid',value:row.grid},
	 					{index:'function_name',value:row.function_name},
	 					{index:'function_def',value:row.function_def},
	 					{index:'repeat_time',value:row.repeat_time},
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