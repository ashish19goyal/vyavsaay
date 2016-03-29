<div id='form97' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form97_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form97_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form97_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form97_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form97_upload' onclick=modal23_action(form97_import_template,form97_import,form97_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form97_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form97_header'></th>
						<th><input type='text' placeholder="Attribute" class='floatlabel' name='attribute' form='form97_header'></th>
						<th><input type='text' placeholder="Value" class='floatlabel' name='value' form='form97_header'></th>
						<th><input type='submit' form='form97_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form97_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form97_header_ini()
		{
			var filter_fields=document.getElementById('form97_header');
			var supplier_filter=filter_fields.elements['name'];
			var attribute_filter=filter_fields.elements['attribute'];
			var value_filter=filter_fields.elements['value'];
			
			var supplier_data={data_store:'suppliers',return_column:'acc_name'};
			var attribute_data={data_store:'attributes',return_column:'attribute',
										indexes:[{index:'type',exact:'supplier'}]};		
			var value_data={data_store:'attributes',return_column:'value',
								indexes:[{index:'type',exact:'supplier'}]};
			
			set_my_filter_json(supplier_data,supplier_filter);
			set_my_filter_json(attribute_data,attribute_filter);
			set_my_filter_json(value_data,value_filter);
			
			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form97_ini();
			});
		};
		
		function form97_ini()
		{
			show_loader();
			var fid=$("#form97_link").attr('data_id');
			if(fid==null)
				fid="";	

			$('#form97_body').html("");
			
			var filter_fields=document.getElementById('form97_header');			
			var fsupplier=filter_fields.elements['name'].value;
			var fattribute=filter_fields.elements['attribute'].value;
			var fvalue=filter_fields.elements['value'].value;
			
			var paginator=$('#form97_body').paginator();
			
			var new_columns=new Object();
					new_columns.count=paginator.page_size();
					new_columns.start_index=paginator.get_index();
					new_columns.data_store='attributes';
					new_columns.indexes=[{index:'id',value:fid},
									{index:'name',value:fsupplier},
									{index:'type',exact:'supplier'},
									{index:'attribute',value:fattribute},
									{index:'value',value:fvalue}];
		
			read_json_rows('form97',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form97_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<a onclick=\"show_object('suppliers','"+result.name+"');\"><textarea readonly='readonly' form='form97_"+result.id+"'>"+result.name+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Attribute'>";
								rowsHTML+="<textarea readonly='readonly' form='form97_"+result.id+"'>"+result.attribute+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Value'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form97_"+result.id+"'>"+result.value+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form97_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' name='save' form='form97_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' name='delete' form='form97_"+result.id+"' title='Delete' onclick='form97_delete_item($(this));'><i class='fa fa-trash'></i></button>";	
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form97_body').append(rowsHTML);
					var fields=document.getElementById("form97_"+result.id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form97_update_item(fields);
					});
				});
		
				$('#form97').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Supplier Attributes','form97',function (item){});
				hide_loader();
			});
		};
		
		function form97_add_item()
		{
			if(is_create_access('form97'))
			{
				var id=get_new_key();
				var rowsHTML="<tr>";
				rowsHTML+="<form id='form97_"+id+"' autocomplete='off'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' form='form97_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Attribute'>";
						rowsHTML+="<input type='text' form='form97_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Value'>";
						rowsHTML+="<textarea class='dblclick_editable' form='form97_"+id+"' required></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form97_"+id+"' value='"+id+"'>";
						rowsHTML+="<button type='submit' class='btn green' form='form97_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
						rowsHTML+="<button type='button' class='btn red' form='form97_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";	
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form97_body').prepend(rowsHTML);
				var fields=document.getElementById("form97_"+id);
				var supplier_filter=fields.elements[0];
				var attribute_filter=fields.elements[1];
				
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form97_create_item(fields);
				});
						
				var supplier_data={data_store:'suppliers',return_column:'acc_name'};
				set_my_value_list_json(supplier_data,supplier_filter,function () 
				{
					$(supplier_filter).focus();
				});
		
				var attribute_data={data_store:'attributes',return_column:'attribute',
											indexes:[{index:'type',exact:'supplier'}]};
				set_my_filter_json(attribute_data,attribute_filter);
				
				$('#form97').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form97_create_item(form)
		{
			if(is_create_access('form97'))
			{
				var supplier=form.elements[0].value;
				var attribute=form.elements[1].value;
				var value=form.elements[2].value;
				var data_id=form.elements[3].value;
				var last_updated=get_my_time();
				
				var data_json={data_store:'attributes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:supplier},
	 					{index:'type',value:'supplier'},
	 					{index:'attribute',value:attribute},
	 					{index:'value',value:value},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Attribute for supplier '+supplier,link_to:'form97'}}; 								
				create_json(data_json);	
				
				$(form).readonly();
				
				var del_button=form.elements[5];
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form97_delete_item(del_button);
				});
				
				$(form).off('submit');		
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form97_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form97_update_item(form)
		{
			if(is_update_access('form97'))
			{
				var supplier=form.elements[0].value;
				var attribute=form.elements[1].value;
				var value=form.elements[2].value;
				var data_id=form.elements[3].value;
				var last_updated=get_my_time();
				var data_json={data_store:'attributes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:supplier},
	 					{index:'type',value:'supplier'},
	 					{index:'attribute',value:attribute},
	 					{index:'value',value:value},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Attribute for supplier '+supplier,link_to:'form97'}}; 								
				
				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form97_delete_item(button)
		{
			if(is_delete_access('form97'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					
					var supplier=form.elements[0].value;
					var attribute=form.elements[1].value;
					var value=form.elements[2].value;
					var data_id=form.elements[3].value;
					var last_updated=get_my_time();
					
					var data_json={data_store:'attributes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id}],
	 				log_data:{title:'Deleted',notes:'Attribute for supplier '+supplier,link_to:'form97'}}; 								
				
					delete_json(data_json);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form97_import_template()
		{
			var data_array=['id','name','attribute','value'];
			my_array_to_csv(data_array);
		};
		
		function form97_import_validate(data_array)
		{
			var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'attribute',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'value',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')}];
							
			var error_array=validate_import_array(data_array,validate_template_array);
			return error_array;					
		}
		
		function form97_import(data_array,import_type)
		{
			var data_json={data_store:'attributes',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Attributes for suppliers',link_to:'form97'}};

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
	 					{index:'type',value:'supplier'},
	 					{index:'attribute',value:row.attribute},
	 					{index:'value',value:row.value},
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