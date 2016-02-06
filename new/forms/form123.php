<div id='form123' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form123_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form123_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form123_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form123_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form123_header'></form>
						<th><input type='text' placeholder="Object" class='floatlabel' name='name' form='form123_header'></th>
						<th><input type='text' placeholder="Attribute" class='floatlabel' name='attribute' form='form123_header'></th>
						<th><input type='text' placeholder="Values" class='floatlabel' name='val' form='form123_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form123_header'></th>
						<th><input type='submit' form='form123_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form123_body'>
			</tbody>
		</table>
	</div>
	
	<script>
		function form123_header_ini()
		{
			var filter_fields=document.getElementById('form123_header');
			var object_filter=filter_fields.elements['name'];
			var attr_filter=filter_fields.elements['attribute'];
			var status_filter=filter_fields.elements['status'];
			
			var attr_data={data_store:'mandatory_attributes',return_column:'attribute'};
			
			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form123_ini();
			});
		
			set_my_filter_json(attr_data,attr_filter);
			set_static_filter_json('mandatory_attributes','object',object_filter);
			set_static_filter_json('mandatory_attributes','status',status_filter);
		};
		
		function form123_ini()
		{
			show_loader();
			var fid=$("#form123_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			$('#form123_body').html("");
			
			var filter_fields=document.getElementById('form123_header');			
			var fobject=filter_fields.elements['name'].value;
			var fattribute=filter_fields.elements['attribute'].value;
			var fval=filter_fields.elements['val'].value;
			var fstatus=filter_fields.elements['status'].value;
			
			var paginator=$('#form123_body').paginator();
			
			var data_json=new Object();
					data_json.count=paginator.page_size();
					data_json.start_index=paginator.get_index();
					data_json.data_store='mandatory_attributes';

					data_json.indexes=[{index:'id',value:fid},
									{index:'object',value:fobject},
									{index:'attribute',value:fattribute},
									{index:'value'},
									{index:'status',value:fstatus}];

			read_json_rows('form123',data_json,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="";
					rowsHTML+="<tr>";
						rowsHTML+="<form id='form123_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Object'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form123_"+result.id+"' value='"+result.object+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Attribute'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form123_"+result.id+"' value='"+result.attribute+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Values'>";
								rowsHTML+="<textarea readonly='readonly' form='form123_"+result.id+"' class='dblclick_editable' title='Specify a list separated by semicolon(;). Or leave blank if any text is applicable'>"+result.value+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form123_"+result.id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form123_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form123_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' name='delete' form='form123_"+result.id+"' title='Delete' onclick='form123_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form123_body').append(rowsHTML);
					var fields=document.getElementById("form123_"+result.id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form123_update_item(fields);
					});
				});
		
				$('#form123').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(data_json,'Mandatory Attributes','form123',function (item){});
				hide_loader();
			});
		};
		
		function form123_add_item()
		{
			if(is_create_access('form123'))
			{
				var id=get_new_key();
				var rowsHTML="<tr>";
				rowsHTML+="<form id='form123_"+id+"' autocomplete='off'></form>";
					rowsHTML+="<td data-th='Object'>";
						rowsHTML+="<input type='text' form='form123_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Attribute'>";
						rowsHTML+="<input type='text' form='form123_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Attribute'>";
						rowsHTML+="<textarea form='form123_"+id+"' title='Specify a list separated by semicolon(;). Or leave blank if any text is applicable'></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' form='form123_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form123_"+id+"' value='"+id+"'>";
						rowsHTML+="<button type='submit' class='btn green' form='form123_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
						rowsHTML+="<button type='button' class='btn red' name='delete' form='form123_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form123_body').prepend(rowsHTML);
				var fields=document.getElementById("form123_"+id);
				var object_filter=fields.elements[0];
				var attribute_filter=fields.elements[1];
				var status_filter=fields.elements[3];
				
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form123_create_item(fields);
				});
						
				set_static_value_list_json('mandatory_attributes','object',object_filter,function()
				{
					$(object_filter).focus();		
				});
				set_static_value_list_json('mandatory_attributes','status',status_filter);
				$('textarea').autosize();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form123_create_item(form)
		{
			if(is_create_access('form123'))
			{
				var object=form.elements[0].value;
				var attribute=form.elements[1].value;
				var values=form.elements[2].value;
				var status=form.elements[3].value;
				var data_id=form.elements[4].value;
				var del_button=form.elements[6];
				var last_updated=get_my_time();
				
				var data_json={data_store:'mandatory_attributes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'object',value:object,uniqueWith:['attribute']},
	 					{index:'attribute',value:attribute},
	 					{index:'value',value:values},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Attribute for '+object,link_to:'form123'}};
				
				create_json(data_json);				
				$(form).readonly();
				
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form123_delete_item(del_button);
				});

				$(form).off('submit');		
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form123_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form123_update_item(form)
		{
			if(is_update_access('form123'))
			{
				var object=form.elements[0].value;
				var attribute=form.elements[1].value;
				var values=form.elements[2].value;
				var status=form.elements[3].value;
				var data_id=form.elements[4].value;
				var last_updated=get_my_time();
				
				var data_json={data_store:'mandatory_attributes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'object',value:object,uniqueWith:['attribute']},
	 					{index:'attribute',value:attribute},
	 					{index:'value',value:values},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Attribute for '+object,link_to:'form123'}};
				
				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form123_delete_item(button)
		{
			if(is_delete_access('form123'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					
					var object=form.elements[0].value;
					var attribute=form.elements[1].value;
					var data_id=form.elements[4].value;
					
					var data_json={data_store:'mandatory_attributes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id}],
	 				log_data:{title:'Deleted',notes:'Attribute for '+object,link_to:'form123'}};
									
					delete_json(data_json);
						
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form123_import_template()
		{
			var data_array=['id','object','attribute','values','status'];
			my_array_to_csv(data_array);
		};
		
		function form123_import_validate(data_array)
		{
			var validate_template_array=[{column:'object',required:'yes',list:['account','task','storage','product','service',
									'loan','loyalty program','staff','supplier','customer','asset']},
									{column:'status',required:'yes',list:['required','active','inactive']},
									{column:'attribute',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'values',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')}];
							
			var error_array=validate_import_array(data_array,validate_template_array);
			return error_array;					
		}
		
		function form123_import(data_array,import_type)
		{
			var data_json={data_store:'mandatory_attributes',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Attributes for objects',link_to:'form123'}};

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
	 					{index:'object',value:row.object,uniqueWith:['attribute']},
	 					{index:'attribute',value:row.attribute},
	 					{index:'value',value:row.values},
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