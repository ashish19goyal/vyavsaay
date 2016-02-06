<div id='form142' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=form142_add_item();>Add field <i class='fa fa-plus'></i></a>
			<a class='btn btn-circle grey btn-outline btn-sm' id='form142_save_ques'>Save Questionnaire <i class='fa fa-save'></i></a>
		</div>
	</div>
	
	<div class="portlet-body">
		<form id='form142_master'>
			<fieldset>
				<label>Name<br><input type='text' required name='name'></label>
				<label>Display Name<br><textarea name='disp'></textarea></label>
				<label>Grid<br><input type='text' name='grid' required></label>
				<label>Status<br><input type='text' name='status' required></label>
				<label><input type='hidden' name='id'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
			
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form142_header'></form>
						<th><input type='text' placeholder="Name" readonly="readonly" name='name' form='form142_header'></th>
						<th><input type='text' placeholder="Description"  readonly="readonly" name='desc' form='form142_header'></th>
						<th><input type='text' placeholder="Type" readonly="readonly" name='type' form='form142_header'></th>
						<th><input type='text' placeholder="Order" readonly="readonly" name='order' form='form142_header'></th>
						<th><input type='text' placeholder="Required" readonly="readonly" name='req' form='form142_header'></th>
						<th><input type='submit' form='form142_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form142_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form142_header_ini()
		{
			var fields=document.getElementById('form142_master');
			
			var name_filter=fields.elements['name'];
			var display_filter=fields.elements['disp'];
			var grid_filter=fields.elements['grid'];
			var status_filter=fields.elements['status'];
			fields.elements['id'].value=get_new_key();
			
			var save_button=document.getElementById('form142_save_ques');
			
			$(save_button).off('click');
			$(save_button).on("click", function(event)
			{
				event.preventDefault();
				form142_create_form();
			});
			
			$(fields).off('submit');
			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form142_add_item();
			});
				
			name_filter.value='';
			display_filter.value='';
			grid_filter.value='';
			status_filter.value='active';
			
			var grid_data={data_store:'system_grids',return_column:'name'};
			set_my_value_list_json(grid_data,grid_filter);
			
			set_static_value_list_json('ques_struct','status',status_filter);
			$(name_filter).focus();
		}
		
		function form142_ini()
		{
			var data_id=$("#form142_link").attr('data_id');
			if(data_id==null)
				data_id="";	
			
			$('#form142_body').html("");
			
			if(data_id!="")
			{
				show_loader();
				var struct_columns={data_store:'ques_struct',
											indexes:[{index:'id',value:data_id},
														{index:'name'},
														{index:'display_name'},
														{index:'func'},
														{index:'description'},
														{index:'status'}]};
				var field_column={data_store:'ques_fields',
										indexes:[{index:'id'},
													{index:'ques_id',exact:data_id},
													{index:'name'},
													{index:'display_name'},
													{index:'description'},
													{index:'type'},
													{index:'fvalues'},
													{index:'dynamic_values'},
													{index:'fcol'},
													{index:'forder'},
													{index:'weight'},
													{index:'freq'}]};

				read_json_rows('form142',struct_columns,function(struct_results)
				{
					var filter_fields=document.getElementById('form142_master');
					
					if(struct_results.length>0)
					{
						filter_fields.elements['name'].value=struct_results[0].name;
						filter_fields.elements['disp'].value=struct_results[0].display_name;
						filter_fields.elements['grid'].value=struct_results[0].func;
						filter_fields.elements['status'].value=struct_results[0].status;
						filter_fields.elements['id'].value=struct_results[0].id;
						
						var save_button=document.getElementById('form142_save_ques');
			
						$(save_button).off('click');
						$(save_button).on("click", function(event)
						{
							event.preventDefault();
							form142_update_form();
						});
					}
				
					read_json_rows('form142',field_column,function(results)
					{				
						results.forEach(function(result)
						{
							var values=result.fvalues;
							if(result.type=='dynamic value list')
							{
								values=result.dynamic_values;
								values=values.replace(/vyavsaay/g,"");
							}
							var id=result.id;
							var rowsHTML="<tr>";
							rowsHTML+="<form id='form142_"+id+"'></form>";
								rowsHTML+="<td data-th='Name'>";
									rowsHTML+="<textarea readonly='readonly' form='form142_"+id+"'>"+result.display_name+"</textarea>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Description'>";
									rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form142_"+id+"'>"+result.description+"</textarea>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Type'>";
									rowsHTML+="<input type='text' class='floatlabel' placeholder='Type' readonly='readonly' form='form142_"+id+"' value='"+result.type+"'>";
									rowsHTML+="<textarea class='dblclick_editable floatlabel' placeholder='Values' readonly='readonly' form='form142_"+id+"'>"+values+"</textarea>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Details'>";
									rowsHTML+="<input type='number' readonly='readonly' placeholder='Order' class='dblclick_editable floatlabel' form='form142_"+id+"' value='"+result.forder+"'>";
									rowsHTML+="<input type='number' readonly='readonly' placeholder='Weight' class='dblclick_editable floatlabel' form='form142_"+id+"' value='"+result.weight+"'>";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Required'>";
									rowsHTML+="<input type='checkbox' readonly='readonly' form='form142_"+id+"' "+result.freq+">";
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Action'>";
									rowsHTML+="<input type='hidden' form='form142_"+id+"' value='"+id+"'>";
									rowsHTML+="<input type='button' class='submit_hidden' name='save' form='form142_"+id+"' id='save_form142_"+id+"' >";
									rowsHTML+="<button type='button' class='btn red' name='delete' form='form142_"+id+"' title='Delete' onclick='form142_delete_item($(this));'><i class='fa fa-trash'></i></button>";
								rowsHTML+="</td>";			
							rowsHTML+="</tr>";
						
							$('#form142_body').append(rowsHTML);
							
							var fields=document.getElementById("form142_"+id);
							var type_filter=fields.elements[2];
							var values_filter=fields.elements[3];
							var save_button=fields.elements['save'];
							var delete_button=fields.elements['delete'];
							
							$(save_button).on('click',function (event) 
							{
								event.preventDefault();
								form142_update_item(fields);
							});					
							
							if(type_filter.value=='value list' || type_filter.value=='dynamic value list')
							{
								$(values_filter).show();
							}
							else
							{
								$(values_filter).hide();
							}
						});
						$('#form142').formcontrol();
						hide_loader();
					});
				});
			}
		}
		
		function form142_add_item()
		{
			if(is_create_access('form142'))
			{
				var id=get_new_key();
				var rowsHTML="<tr>";
				rowsHTML+="<form id='form142_"+id+"'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' required form='form142_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Description'>";
						rowsHTML+="<textarea form='form142_"+id+"'></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' class='floatlabel' placeholder='Type' required form='form142_"+id+"'>";
						rowsHTML+="<textarea type='text' class='dblclick_editable floatlabel' placeholder='Values' title='Add list segregated by semicolon and specify numerical values using colon' form='form142_"+id+"'></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Details'>";
						rowsHTML+="<input type='number' class='dblclick_editable floatlabel' placeholder='Order' required form='form142_"+id+"'>";
						rowsHTML+="<input type='number' class='dblclick_editable floatlabel' placeholder='Weight' step='any' required form='form142_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Required'>";
						rowsHTML+="<input type='checkbox' form='form142_"+id+"'>";			
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form142_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='button' class='submit_hidden' name='save' form='form142_"+id+"' id='save_form142_"+id+"' >";
						rowsHTML+="<button type='button' class='btn red' name='delete' form='form142_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
						rowsHTML+="<input type='submit' class='submit_hidden' form='form142_"+id+"'>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form142_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form142_"+id);
				var name_filter=fields.elements[0];
				var type_filter=fields.elements[2];
				var values_filter=fields.elements[3];
				var save_button=fields.elements['save'];
		
				$(name_filter).focus();
				$(values_filter).hide();		
						
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form142_create_item(fields);
				});
				
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form142_add_item();
				});			
				
				set_static_value_list_json('ques_fields','type',type_filter);
						
				$(type_filter).on('blur',function(event)
				{
					if(type_filter.value=='value list' || type_filter.value=='dynamic value list')
					{
						$(values_filter).show();
					}
					else
					{
						$(values_filter).hide();
					}
				});		
				$('#form142').formcontrol();						
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form142_create_item(form)
		{
			if(is_create_access('form142'))
			{
				var ques_id=document.getElementById("form142_master").elements['id'].value;
				var ques_name=document.getElementById("form142_master").elements['name'].value;
		
				var display_name=form.elements[0].value;
				var description=form.elements[1].value;
				var type=form.elements[2].value;
				var values="";
				var dynamic_values="";		
				if(type=='value list')
					values=form.elements[3].value;
				else if(type=='dynamic value list')
					dynamic_values="vyavsaay"+htmlentities(form.elements[3].value)+"vyavsaay";
					
				var order=form.elements[4].value;
				var weight=form.elements[5].value;
				var name=ques_name+'field'+order;
				var required='unchecked';
				if(form.elements[6].checked)
					required='checked';
				var data_id=form.elements[7].value;
				var save_button=form.elements['save'];
				var del_button=form.elements['delete'];
				var last_updated=get_my_time();
				
				var data_json={data_store:'ques_fields',
	 				data:[{index:'id',value:data_id},
	 					{index:'ques_id',value:ques_id},
	 					{index:'name',value:name},
	 					{index:'display_name',value:display_name},
	 					{index:'description',value:description},
	 					{index:'type',value:type},
	 					{index:'fvalues',value:values},
	 					{index:'dynamic_values',value:dynamic_values},
	 					{index:'forder',value:order},
	 					{index:'weight',value:weight},
	 					{index:'freq',value:required},
	 					{index:'last_updated',value:last_updated}]};
							
				create_json(data_json);
										
				$(form).readonly();
				
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form142_delete_item(del_button);
				});
		
				$(save_button).off('click');
				$(save_button).on('click',function () 
				{
					form142_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		
		/**
		 * @form Create questionnaire
		 * @param button
		 */
		function form142_create_form()
		{
			if(is_create_access('form142'))
			{
				var master_form=document.getElementById("form142_master");
				var name=master_form.elements['name'].value;
				var display_name=master_form.elements['disp'].value;
				var func=master_form.elements['grid'].value;
				var status=master_form.elements['status'].value;
				var data_id=master_form.elements['id'].value;
				var last_updated=get_my_time();
				
				var data_json={data_store:'ques_struct',
					log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'display_name',value:display_name},
	 					{index:'func',value:func},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Created',notes:'Questionnaire '+display_name,link_to:'form143'}};
							
				create_json(data_json);
				
				var save_button=document.getElementById('form142_save_ques');
			
				$(save_button).off('click');
				$(save_button).on("click", function(event)
				{
					event.preventDefault();
					form142_update_form();
				});
				
				$("[id^='save_form142_']").click();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		/**
		 * @form Create Questionnaire
		 * @formNo 142
		 * @param button
		 */
		function form142_update_item(form)
		{
			if(is_update_access('form142'))
			{
				var ques_id=document.getElementById("form142_master").elements['id'].value;
		
				var display_name=form.elements[0].value;
				var description=form.elements[1].value;
				var type=form.elements[2].value;
		
				var values="";
				var dynamic_values="";		
				if(type=='value list')
					values=form.elements[3].value;
				else if(type=='dynamic value list')
					dynamic_values="vyavsaay"+htmlentities(form.elements[3].value)+"vyavsaay";
				
				var order=form.elements[4].value;
				var weight=form.elements[5].value;
				var name='field'+order;
				var required='unchecked';
				if(form.elements[6].checked)
					required='checked';
				var data_id=form.elements[7].value;
				var last_updated=get_my_time();
				
				var data_json={data_store:'ques_fields',
					data:[{index:'id',value:data_id},
	 					{index:'ques_id',value:ques_id},
	 					{index:'display_name',value:display_name},
	 					{index:'description',value:description},
	 					{index:'type',value:type},
	 					{index:'fvalues',value:values},
	 					{index:'dynamic_values',value:dynamic_values},
	 					{index:'forder',value:order},
	 					{index:'weight',value:weight},
	 					{index:'freq',value:required},
	 					{index:'last_updated',value:last_updated}]};
							
				update_json(data_json);
					
				$(form).readonly();		
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		/**
		 * @form Create questionnaire
		 * @param button
		 */
		function form142_update_form()
		{
			if(is_update_access('form142'))
			{
				var master_form=document.getElementById("form142_master");
				var name=master_form.elements[1].value;
				var display_name=master_form.elements[2].value;
				var func=master_form.elements[3].value;
				var status=master_form.elements[4].value;
				var data_id=master_form.elements[5].value;
				var last_updated=get_my_time();
				
				var data_json={data_store:'ques_struct',
					log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'display_name',value:display_name},
	 					{index:'func',value:func},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Questionnaire '+display_name,link_to:'form143'}};
							
				update_json(data_json);
				$("[id^='save_form142_']").click();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		/**
		 * @form Create Questionnaire
		 * @param button
		 */
		function form142_delete_item(button)
		{
			if(is_delete_access('form142'))
			{
				modal115_action(function()
				{
					var ques_id=document.getElementById("form142_master").elements['id'].value;
					
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					
					var data_id=form.elements[7].value;
					
					var data_json={data_store:'ques_fields',
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

	</script>
</div>