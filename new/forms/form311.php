<div id='form311' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form311_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form311_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form311_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form311_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form311_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form311_header'></th>
						<th><input type='text' placeholder="Description" class='floatlabel' name='desc' form='form311_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form311_header'></th>
						<th><input type='text' placeholder="Content" readonly="readonly" name='content' form='form311_header'></th>
						<th><input type='submit' form='form311_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form311_body'>
			</tbody>
		</table>
	</div>
	
	<script>

		function form311_header_ini()
		{	
			var form=document.getElementById('form311_header');
			var name_filter=form.elements['name'];
			var desc_filter=form.elements['desc'];
			var status_filter=form.elements['status'];
			
			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form311_ini();
			});			
			set_static_filter_json('system_overwrite_func','status',status_filter);	
		}	
		
		function form311_ini()
		{
			var fid=$("#form311_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			var form=document.getElementById('form311_header');
			var name_filter=form.elements['name'].value;
			var status_filter=form.elements['status'].value;
			var desc_filter=form.elements['desc'].value;
			
			show_loader();
			$('#form311_body').html('');	
			
			var paginator=$('#form311_body').paginator();
			
			var overwrite_data=new Object();
					overwrite_data.count=paginator.page_size();
					overwrite_data.start_index=paginator.get_index();
					overwrite_data.data_store='system_overwrite_func';

					overwrite_data.indexes=[{index:'id',value:fid},
									{index:'name',value:name_filter},
									{index:'description',value:desc_filter},
									{index:'function_def'},
									{index:'status',value:status_filter}];
									
			read_json_rows('form311',overwrite_data,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form311_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form311_"+result.id+"' value='"+result.name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea class='dblclick_editable' form='form311_"+result.id+"'>"+result.description+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select class='dblclick_editable' form='form311_"+result.id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form311_"+result.id+"' onclick=\"modal186_action('"+result.id+"','"+result.name+"','master');\">Function</button>";							
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form311_"+result.id+"' value='"+result.id+"'>";	
								rowsHTML+="<button type='submit' class='btn green' form='form311_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button class='btn red' form='form311_"+result.id+"' title='Delete' onclick='form311_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form311_body').append(rowsHTML);
					var fields=document.getElementById("form311_"+result.id);
					var status_filter=fields.elements[2];

					set_static_select('system_overwrite_func','status',status_filter,function () 
					{
						$(status_filter).selectpicker('val',result.status);
					});
					
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form311_update_item(fields);
					});
				});

				$('#form311').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(overwrite_data,'Overwrite Functions','form311',function (item){});
				hide_loader();
			});
		};

		function form311_add_item()
		{
			if(is_create_access('form311'))
			{
				var id=get_new_key();
				var rowsHTML="<tr>";
						rowsHTML+="<form id='form311_"+id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<input type='text' form='form311_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea class='dblclick_editable' form='form311_"+id+"'></textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select data-style='btn-info' class='dblclick_editable' form='form311_"+id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form311_"+id+"'>Function</button>";							
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form311_"+id+"' value='"+id+"'>";	
								rowsHTML+="<button type='submit' class='btn green' form='form311_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button class='btn red' form='form311_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
				$('#form311_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form311_"+id);
				var name_filter=fields.elements[0];
				var status_filter=fields.elements[2];

				$(name_filter).focus();

				set_static_select('system_overwrite_func','status',status_filter);
				
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form311_create_item(fields);
				});
				$('#form311').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}		
		}
		
		function form311_create_item(form)
		{
			if(is_create_access('form311'))
			{
				var name=form.elements[0].value;
				var description=form.elements[1].value;
				var status=$(form.elements[2]).val();
				var func_button=form.elements[3];
				var data_id=form.elements[4].value;
				var del_button=form.elements[6];
				
				var last_updated=get_my_time();
				
				var data_json={data_store:'system_overwrite_func',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'description',value:description},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}]};
 						
				server_create_master_all(data_json);

				$(form).readonly();
				
				$(func_button).on('click',function () 
				{
					modal186_action(data_id,name,'master');
				});

				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form311_delete_item(del_button);
				});
				
				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form311_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form311_update_item(form)
		{
			if(is_update_access('form311'))
			{
				var name=form.elements[0].value;
				var description=form.elements[1].value;
				var status=$(form.elements[2]).val();
				var data_id=form.elements[4].value;
				var del_button=form.elements[6];
				
				var last_updated=get_my_time();
				
				var data_json={data_store:'system_overwrite_func',
	 				data:[{index:'name',value:name,unique:'yes'},
	 					{index:'description',value:description},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}]};
 				server_update_master_all(data_json);
				
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form311_delete_item(button)
		{
			if(is_delete_access('form311'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var name=form.elements[0].value;
					var data_json={data_store:'system_overwrite_func',
 							data:[{index:'name',value:name}]};
			
					server_delete_master_all(data_json);			
										
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