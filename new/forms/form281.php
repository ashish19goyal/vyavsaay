<div id='form281' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form281_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form281_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form281_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form281_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form281_upload' onclick=modal23_action(form281_import_template,form281_import,form281_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form281_header'></form>
						<th><input type='text' placeholder="Box Id" class='floatlabel' name='box' form='form281_header'></th>
						<th><input type='text' placeholder="Type" class='floatlabel' name='type' form='form281_header'></th>
						<th><input type='text' placeholder="Title" class='floatlabel' name='title' form='form281_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form281_header'></th>
						<th><input type='text' placeholder="Details" readonly="readonly" name='details' form='form281_header'></th>
						<th><input type='submit' form='form281_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form281_body'>
			</tbody>
		</table>
	</div>
	
	<script>

		function form281_header_ini()
		{	
			var form=document.getElementById('form281_header');
			var id_filter=form.elements['box'];
			var type_filter=form.elements['type'];
			var title_filter=form.elements['title'];
			var status_filter=form.elements['status'];
			
			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form281_ini();
			});
			
			set_static_filter_json('system_popboxes','status',status_filter);	
			set_static_filter_json('system_popboxes','box_type',type_filter);	
		}	
		
		function form281_ini()
		{
			var fid=$("#form281_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			var form=document.getElementById('form281_header');
			var box_filter=form.elements['box'].value;
			var type_filter=form.elements['type'].value;
			var status_filter=form.elements['status'].value;
			var title_filter=form.elements['title'].value;
			
			show_loader();
			$('#form281_body').html('');	
			
			var paginator=$('#form281_body').paginator();
			
			var pop_data=new Object();
					pop_data.count=paginator.page_size();
					pop_data.start_index=paginator.get_index();
					pop_data.data_store='system_popboxes';
							
					pop_data.indexes=[{index:'id',value:fid},
									{index:'box_id',value:box_filter},
									{index:'box_title',value:title_filter},
									{index:'box_type',value:type_filter},
									{index:'status',value:status_filter},
									{index:'box_content'},									
									{index:'function_name'},
									{index:'function_def'}];
			read_json_rows('form281',pop_data,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form281_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Box Id'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form281_"+result.id+"' value='"+result.box_id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Type'>";
								rowsHTML+="<select class='dblclick_editable' form='form281_"+result.id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Title'>";
								rowsHTML+="<textarea readonly='readonly' form='form281_"+result.id+"' class='dblclick_editable'>"+result.box_title+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select class='dblclick_editable' form='form281_"+result.id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<button type='button' class='btn default yellow-stripe' form='form281_"+result.id+"' onclick=\"modal184_action('"+result.id+"');\">Box Content</button>";							
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form281_"+result.id+"' onclick=\"modal185_action('"+result.id+"');\">Function</button>";	
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form281_"+result.id+"' value='"+result.id+"'>";	
								rowsHTML+="<button type='submit' class='btn green' form='form281_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button class='btn red' form='form281_"+result.id+"' title='Delete' onclick='form281_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form281_body').append(rowsHTML);
					var fields=document.getElementById("form281_"+result.id);
					var type_filter=fields.elements[1];
					var status_filter=fields.elements[3];

					set_static_select('system_popboxes','status',status_filter,function () 
					{
						$(status_filter).selectpicker('val',result.status);
					});
					
					set_static_select('system_popboxes','box_type',type_filter,function()
					{
						$(type_filter).selectpicker('val',result.box_type);
					});
					
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form281_update_item(fields);
					});
				});
				
				$('#form281').formcontrol();
				paginator.update_index(results.length);				
				initialize_tabular_report_buttons(pop_data,'Pop Boxes','form281',function (item){});
				hide_loader();
			});
		};

		function form281_add_item()
		{
			if(is_create_access('form281'))
			{
				var id=get_new_key();
		
				var rowsHTML="<tr>";
						rowsHTML+="<form id='form281_"+id+"'></form>";
							rowsHTML+="<td data-th='Box Id'>";
								rowsHTML+="<input type='text' form='form281_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Type'>";
								rowsHTML+="<select data-style='btn-info' class='dblclick_editable' form='form281_"+id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Title'>";
								rowsHTML+="<textarea form='form281_"+id+"' class='dblclick_editable'></textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select data-style='btn-info' class='dblclick_editable' form='form281_"+id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<button type='button' class='btn default yellow-stripe' form='form281_"+id+"'>Box Content</button>";							
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form281_"+id+"'>Function</button>";							
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form281_"+id+"' value='"+id+"'>";	
								rowsHTML+="<button type='submit' class='btn green' form='form281_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button class='btn red' form='form281_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
				$('#form281_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form281_"+id);
				var name_filter=fields.elements[0];
				var type_filter=fields.elements[1];
				var status_filter=fields.elements[3];

				$(name_filter).focus();

				set_static_select('system_popboxes','status',status_filter);
				set_static_select('system_popboxes','box_type',type_filter);
				
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form281_create_item(fields);
				});
				$('#form281').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}		
		}
		
		function form281_create_item(form)
		{
			if(is_create_access('form281'))
			{
				var name=form.elements[0].value;
				var type=$(form.elements[1]).val();
				var title=form.elements[2].value;
				var status=$(form.elements[3]).val();
				var box_content=form.elements[4];
				var box_func=form.elements[5];
				var data_id=form.elements[6].value;
				var del_button=form.elements[8];
				
				var last_updated=get_my_time();
				
				var data_json={data_store:'system_popboxes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'box_id',value:name,unique:'yes'},
	 					{index:'box_type',value:type},
	 					{index:'box_title',value:title},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Popup box '+name,link_to:'form281'}};
 						
				create_json(data_json);

				$(form).readonly();
				
				$(box_content).on('click',function () 
				{
					modal184_action(data_id);
				});

				$(box_func).on('click',function () 
				{
					modal185_action(data_id);
				});
				
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form281_delete_item(del_button);
				});
				
				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form281_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form281_update_item(form)
		{
			if(is_update_access('form281'))
			{
				var name=form.elements[0].value;
				var type=$(form.elements[1]).val();
				var title=form.elements[2].value;
				var status=$(form.elements[3]).val();
				var data_id=form.elements[6].value;
				var del_button=form.elements[8];
				
				var last_updated=get_my_time();
				
				var last_updated=get_my_time();
				var data_json={data_store:'system_popboxes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'box_id',value:name},
	 					{index:'box_type',value:type},
	 					{index:'box_title',value:title},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Popup box '+name,link_to:'form281'}};
 				update_json(data_json);
				
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form281_delete_item(button)
		{
			if(is_delete_access('form281'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var name=form.elements[0].value;
					var data_id=form.elements[6].value;
					var data_json={data_store:'system_popboxes',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Popup box "+name,link_to:"form281"}};
			
					delete_json(data_json);			
					
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form281_import_template()
		{
			var data_array=['id','box_id','box_title','box_type','box_content','function_name','function_def','status'];
			my_array_to_csv(data_array);
		};
		
		function form281_import_validate(data_array)
		{
			var validate_template_array=[{column:'box_id',required:'yes',regex:new RegExp('^[0-9a-zA-Z_-]+$')},
									{column:'box_title',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
									{column:'function_name',regex:new RegExp('^[a-zA-Z0-9_() ;]+$')},
									{column:'status',required:'yes',list:['active','inactive']},
									{column:'box_type',required:'yes',list:['static','actionable']}];
							
			var error_array=validate_import_array(data_array,validate_template_array);
			return error_array;					
		}
		
		function form281_import(data_array,import_type)
		{
			var data_json={data_store:'system_popboxes',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Popup boxes for system configuration',link_to:'form281'}};

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
	 					{index:'box_id',value:row.box_id},
	 					{index:'box_type',value:row.box_type},
	 					{index:'box_title',value:row.box_title},
	 					{index:'function_name',value:row.function_name},
	 					{index:'function_def',value:row.function_def},
	 					{index:'box_content',value:row.box_content},
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