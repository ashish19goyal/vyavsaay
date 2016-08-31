<div id='form306' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form306_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form306_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form306_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form306_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form306_header'></form>
						<th><input type='text' placeholder="Box Id" class='floatlabel' name='box' form='form306_header'></th>
						<th><input type='text' placeholder="Type" class='floatlabel' name='type' form='form306_header'></th>
						<th><input type='text' placeholder="Title" class='floatlabel' name='title' form='form306_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form306_header'></th>
						<th><input type='text' placeholder="Details" readonly="readonly" name='details' form='form306_header'></th>
						<th><input type='submit' form='form306_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form306_body'>
			</tbody>
		</table>
	</div>
	
	<script>

		function form306_header_ini()
		{	
			var form=document.getElementById('form306_header');
			var id_filter=form.elements['box'];
			var type_filter=form.elements['type'];
			var title_filter=form.elements['title'];
			var status_filter=form.elements['status'];
			
			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form306_ini();
			});
			
			set_static_filter_json('system_popboxes','status',status_filter);	
			set_static_filter_json('system_popboxes','box_type',type_filter);	
		}	
		
		function form306_ini()
		{
			var fid=$("#form306_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			var form=document.getElementById('form306_header');
			var box_filter=form.elements['box'].value;
			var type_filter=form.elements['type'].value;
			var status_filter=form.elements['status'].value;
			var title_filter=form.elements['title'].value;
			
			show_loader();
			$('#form306_body').html('');	
			
			var paginator=$('#form306_body').paginator();
			
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
			read_json_rows('form306',pop_data,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form306_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Box Id'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form306_"+result.id+"' value='"+result.box_id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Type'>";
								rowsHTML+="<select class='dblclick_editable' form='form306_"+result.id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Title'>";
								rowsHTML+="<textarea readonly='readonly' form='form306_"+result.id+"' class='dblclick_editable'>"+result.box_title+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select class='dblclick_editable' form='form306_"+result.id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<button type='button' class='btn default yellow-stripe' form='form306_"+result.id+"' onclick=\"modal184_action('"+result.id+"','"+result.box_id+"','master');\">Box Content</button>";							
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form306_"+result.id+"' onclick=\"modal185_action('"+result.id+"','"+result.box_id+"','master');\">Function</button>";							
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form306_"+result.id+"' value='"+result.id+"'>";	
								rowsHTML+="<button type='submit' class='btn green' form='form306_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form306_"+result.id+"' title='Delete' onclick='form306_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form306_body').append(rowsHTML);
					var fields=document.getElementById("form306_"+result.id);
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
						form306_update_item(fields);
					});
				});
				
				$('#form306').formcontrol();
				paginator.update_index(results.length);				
				initialize_tabular_report_buttons(pop_data,'Pop Boxes','form306',function (item){});
				hide_loader();
			});
		};

		function form306_add_item()
		{
			if(is_create_access('form306'))
			{
				var id=vUtil.newKey();
		
				var rowsHTML="<tr>";
						rowsHTML+="<form id='form306_"+id+"'></form>";
							rowsHTML+="<td data-th='Box Id'>";
								rowsHTML+="<input type='text' form='form306_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Type'>";
								rowsHTML+="<select data-style='btn-info' class='dblclick_editable' form='form306_"+id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Title'>";
								rowsHTML+="<textarea form='form306_"+id+"' class='dblclick_editable'></textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select data-style='btn-info' class='dblclick_editable' form='form306_"+id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<button type='button' class='btn default yellow-stripe' form='form306_"+id+"'>Box Content</button>";							
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form306_"+id+"'>Function</button>";							
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form306_"+id+"' value='"+id+"'>";	
								rowsHTML+="<button type='submit' class='btn green' form='form306_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form306_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
				$('#form306_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form306_"+id);
				var name_filter=fields.elements[0];
				var type_filter=fields.elements[1];
				var status_filter=fields.elements[3];

				$(name_filter).focus();

				set_static_select('system_popboxes','status',status_filter);
				set_static_select('system_popboxes','box_type',type_filter);
				
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form306_create_item(fields);
				});
				$('#form306').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}		
		}
		
		function form306_create_item(form)
		{
			if(is_create_access('form306'))
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
	 				data:[{index:'id',value:data_id},
	 					{index:'box_id',value:name,unique:'yes'},
	 					{index:'box_type',value:type},
	 					{index:'box_title',value:title},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}]};
 						
				server_create_master_all(data_json);

				$(form).readonly();
				
				$(box_content).on('click',function () 
				{
					modal184_action(data_id,name,'master');
				});

				$(box_func).on('click',function () 
				{
					modal185_action(data_id,name,'master');
				});
				
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form306_delete_item(del_button);
				});
				
				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form306_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form306_update_item(form)
		{
			if(is_update_access('form306'))
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
	 				data:[{index:'box_id',value:name,unique:'yes'},
	 					{index:'box_type',value:type},
	 					{index:'box_title',value:title},
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
		
		function form306_delete_item(button)
		{
			if(is_delete_access('form306'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var name=form.elements[0].value;
					var data_json={data_store:'system_popboxes',
 							data:[{index:'box_id',value:name}]};
			
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