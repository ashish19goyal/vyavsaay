<div id='form313' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form313_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form313_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form313_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form313_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form313_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form313_header'></th>
						<th><input type='text' placeholder="Description" class='floatlabel' name='desc' form='form313_header'></th>
						<th><input type='text' placeholder="Markers" readonly="readonly" name='markers' form='form313_header'></th>
						<th><input type='text' placeholder="Design" readonly="readonly" name='design' form='form313_header'></th>
						<th><input type='text' placeholder="Images" readonly="readonly" name='images' form='form313_header'></th>
						<th><input type='submit' form='form313_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form313_body'>
			</tbody>
		</table>
	</div>
	
	<script>

		function form313_header_ini()
		{	
			var form=document.getElementById('form313_header');
			
			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form313_ini();
			});	
		}	
		
		function form313_ini()
		{
			var fid=$("#form313_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			var form=document.getElementById('form313_header');
			var name_filter=form.elements['name'].value;
			var desc_filter=form.elements['desc'].value;
			
			show_loader();
			$('#form313_body').html('');	
			
			var paginator=$('#form313_body').paginator();
			
			var overwrite_data=new Object();
					overwrite_data.count=paginator.page_size();
					overwrite_data.start_index=paginator.get_index();
					overwrite_data.data_store='newsletter_components';

					overwrite_data.indexes=[{index:'id',value:fid},
									{index:'name',value:name_filter},
									{index:'detail',value:desc_filter},
									{index:'html_code'},
									{index:'preview'},
									{index:'markers'}];
									
			read_json_rows('form313',overwrite_data,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form313_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form313_"+result.id+"' value='"+result.name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form313_"+result.id+"'>"+result.detail+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Markers'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form313_"+result.id+"'>"+result.markers+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Design'>";
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form313_"+result.id+"' onclick=\"modal180_action('"+result.id+"','"+result.name+"','master');\">Code</button>";
								rowsHTML+="<button type='button' class='btn default yellow-stripe' form='form313_"+result.id+"' onclick=\"modal181_action('"+result.id+"','"+result.preview+"','"+result.name+"','master');\">Preview</button>";							
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Images'>";
								rowsHTML+="<button type='button' class='btn default green-stripe' form='form313_"+result.id+"'>Add Image</button>";							
								rowsHTML+="<div id='form313_images_"+result.id+"'></div>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form313_"+result.id+"' value='"+result.id+"'>";	
								rowsHTML+="<button type='submit' class='btn green' form='form313_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button class='btn red' form='form313_"+result.id+"' title='Delete' onclick='form313_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form313_body').append(rowsHTML);
					var fields=document.getElementById("form313_"+result.id);
					var img_button=fields.elements[5];
					
					$(img_button).on('click',function () 
					{
						modal176_action(result.id,'newsletter_components',function (pic_id,url,doc_name) 
						{
							var docHTML="<a href='"+url+"' download='"+doc_name+"'><u>"+doc_name+"</u></a><br>";
							var doc_container=document.getElementById('form313_images_'+result.id);
							$(doc_container).append(docHTML);
						});
					});
					
					var doc_columns=new Object();
						doc_columns.data_store='documents';
						doc_columns.indexes=[{index:'id'},
											{index:'url'},
											{index:'doc_name'},
											{index:'doc_type',exact:'newsletter_components'},
											{index:'target_id',exact:result.id}];
					
					read_json_rows('form313',doc_columns,function(doc_results)
					{
						var docHTML="";
						for (var j in doc_results)
						{
							var updated_url=doc_results[j].url.replace(/ /g,"+");
							docHTML+="<a href='"+updated_url+"' download='"+doc_results[j].doc_name+"'><u>"+doc_results[j].doc_name+"</u></a><br>";							
						}
						document.getElementById('form313_images_'+result.id).innerHTML=docHTML;
					});
					
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form313_update_item(fields);
					});
				});

				$('#form313').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(overwrite_data,'Newsletter Components','form313',function (item){});
				hide_loader();
			});
		};

		function form313_add_item()
		{
			if(is_create_access('form313'))
			{
				var id=vUtil.newKey();
				var rowsHTML="<tr>";
					rowsHTML+="<form id='form313_"+id+"'></form>";
						rowsHTML+="<td data-th='Name'>";
							rowsHTML+="<input type='text' form='form313_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Description'>";
							rowsHTML+="<textarea class='dblclick_editable' form='form313_"+id+"'></textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Markers'>";
							rowsHTML+="<textarea class='dblclick_editable' form='form313_"+id+"'></textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Design'>";
							rowsHTML+="<button type='button' class='btn default purple-stripe' form='form313_"+id+"'>Code</button>";
							rowsHTML+="<button type='button' class='btn default yellow-stripe' form='form313_"+id+"'>Preview</button>";							
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Images'>";
							rowsHTML+="<button type='button' class='btn default green-stripe' form='form313_"+id+"'>Add Image</button>";							
							rowsHTML+="<div id='form313_images_"+id+"'></div>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form313_"+id+"' value='"+id+"'>";	
							rowsHTML+="<button type='submit' class='btn green' form='form313_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
							rowsHTML+="<button class='btn red' form='form313_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
				
				$('#form313_body').prepend(rowsHTML);
				var fields=document.getElementById("form313_"+id);
				var img_button=fields.elements[5];
				
				$(img_button).on('click',function () 
				{
					modal176_action(id,'newsletter_components',function (pic_id,url,doc_name) 
					{
						var docHTML="<a href='"+url+"' download='"+doc_name+"'><u>"+doc_name+"</u></a><br>";
						var doc_container=document.getElementById('form313_images_'+id);
						$(doc_container).append(docHTML);
					},'master');
				});

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form313_create_item(fields);
				});
				$('#form313').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}		
		}
		
		function form313_create_item(form)
		{
			if(is_create_access('form313'))
			{
				var name=form.elements[0].value;
				var description=form.elements[1].value;
				var markers=form.elements[2].value;
				var code_button=form.elements[3];
				var preview_button=form.elements[4];
				var data_id=form.elements[6].value;
				var del_button=form.elements[8];
				
				var last_updated=get_my_time();
				
				var data_json={data_store:'newsletter_components',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'detail',value:description},
	 					{index:'markers',value:markers},
	 					{index:'last_updated',value:last_updated}]};
 						
				server_create_master_all(data_json);

				$(form).readonly();
				
				$(code_button).on('click',function () 
				{
					modal180_action(data_id,name,'master');
				});

				$(preview_button).on('click',function () 
				{
					modal181_action(data_id,'',name,'master');
				});

				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form313_delete_item(del_button);
				});
				
				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form313_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form313_update_item(form)
		{
			if(is_update_access('form313'))
			{
				var name=form.elements[0].value;
				var description=form.elements[1].value;
				var markers=form.elements[2].value;
				var data_id=form.elements[6].value;
				var del_button=form.elements[8];
				
				var last_updated=get_my_time();
				
				var data_json={data_store:'newsletter_components',
	 				data:[{index:'name',value:name,unique:'yes'},
	 					{index:'detail',value:description},
	 					{index:'markers',value:markers},
	 					{index:'last_updated',value:last_updated}]};
 				
 				server_update_master_all(data_json);
				
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form313_delete_item(button)
		{
			if(is_delete_access('form313'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var name=form.elements[0].value;
					var data_json={data_store:'newsletter_components',
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