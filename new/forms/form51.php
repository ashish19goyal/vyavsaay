<div id='form51' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=form51_add_item();>Add <i class='fa fa-plus'></i></a>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=form51_update_form();>Save All <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form51_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form51_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form51_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
		<form id='form51_master' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder='Username' class='floatlabel' name='username'></label>
				<button type='submit' class='btn red' style='vertical-align:top;'>Show Access</button>
			</fieldset>
		</form>
		<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form51_header'></form>
						<th><input type='text' placeholder="Tab Name" class='floatlabel' name='name' form='form51_header'></th>
						<th><input type='text' placeholder="Read" readonly="readonly" name='read' form='form51_header'></th>
						<th><input type='text' placeholder="Create" readonly="readonly" name='create' form='form51_header'></th>
						<th><input type='text' placeholder="Update" readonly="readonly" name='update' form='form51_header'></th>
						<th><input type='text' placeholder="Delete" readonly="readonly" name='delete' form='form51_header'></th>
						<th><input type='submit' form='form51_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form51_body'>
			</tbody>
		</table>
	</div>
	
	<script>
	
		function form51_header_ini()
		{
			var fields=document.getElementById('form51_master');
			var form=document.getElementById('form51_header');
			
			var users_filter=fields.elements['username'];
			var save_button=fields.elements['save'];
			
			var username_data=new Object();
				username_data.data_store="accounts";
				username_data.return_column="username";
				username_data.indexes=[{index:'id'}];
			set_my_value_list_json(username_data,users_filter);	
			
			$(fields).off('submit');
			$(fields).on('submit',function (e) 
			{
				e.preventDefault();
				form51_ini();
			});

			$(form).off('submit');
			$(form).on('submit',function (e) 
			{
				e.preventDefault();
				form51_ini();
			});
		};
		
		function form51_ini()
		{
			var header_fields=document.getElementById('form51_master');
			
			$('#form51_body').html("");
		
			var fuser=header_fields.elements['username'].value;
			var fname=document.getElementById('form51_header').elements['name'].value;
			
			if(fuser!="")
			{
				show_loader();
				
				var columns=new Object();
				columns.data_store="access_control";
				columns.indexes=[{index:'id'},
										{index:'username',exact:fuser},
										{index:'element_id'},
										{index:'element_name',value:fname},
										{index:'re'},{index:'cr'},{index:'up'},{index:'del'}];
				
				read_json_rows('form51',columns,function(results)
				{
					if(results.length==0)
					{
						var elements_name=new Object();
							elements_name.data_store="access_control";
							elements_name.indexes=[{index:'id'},
													{index:'username',exact:'master'},
													{index:'element_id'},
													{index:'element_name',value:fname}];
							
						read_json_rows('form51',elements_name,function(elements)
						{
							var counter=0;
							var new_key=get_new_key();
							elements.forEach(function(element)
							{
								counter+=1;
								var data_id=new_key+counter;
								var rowsHTML="<tr>";
									rowsHTML+="<form id='form51_"+data_id+"' class='save_form51'></form>";
										rowsHTML+="<td data-th='Name'>";
											rowsHTML+="<input type='text' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Tab Name' title='"+element.element_id+"' form='form51_"+data_id+"' value='"+element.element_name+"'>";
											rowsHTML+="<input type='text' readonly='readonly' class='floatlabel' placeholder='Tab Id' form='form51_"+data_id+"' value='"+element.element_id+"' required name='element_id'>";
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Read'>";
											rowsHTML+="<input type='checkbox' readonly='readonly' form='form51_"+data_id+"'>";
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Create'>";
										rowsHTML+="<input type='checkbox' readonly='readonly' form='form51_"+data_id+"'>";
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Update'>";
											rowsHTML+="<input type='checkbox' readonly='readonly' form='form51_"+data_id+"'>";
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Delete'>";
											rowsHTML+="<input type='checkbox' readonly='readonly' form='form51_"+data_id+"'>";
										rowsHTML+="</td>";
										rowsHTML+="<td data-th='Action'>";
											rowsHTML+="<input type='hidden' form='form51_"+data_id+"' value='"+data_id+"'>";
											rowsHTML+="<button type='submit' class='btn green' form='form51_"+data_id+"' name='save' title='Save' data-action='create'><i class='fa fa-save'></i></button>";	
											rowsHTML+="<button type='button' class='btn red' form='form51_"+data_id+"' name='delete' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
										rowsHTML+="</td>";			
								rowsHTML+="</tr>";
								
								$('#form51_body').append(rowsHTML);
								var fields=document.getElementById("form51_"+data_id);
								$(fields).on("submit", function(event)
								{
									event.preventDefault();
									form51_create_item(fields);
								});
		
							});
							$('#form51').formcontrol();							
							hide_loader();
						});
					}
					else
					{
						results.forEach(function(result)
						{
							//console.log('existing user');
							var rowsHTML="<tr>";
								rowsHTML+="<form id='form51_"+result.id+"' class='save_form51'></form>";
									rowsHTML+="<td data-th='Name'>";
										rowsHTML+="<input type='text' class='floatlabel dblclick_editable' readonly='readonly' placeholder='Tab Name' form='form51_"+result.id+"' value='"+result.element_name+"'>";
										rowsHTML+="<input type='text' class='floatlabel' readonly='readonly' placeholder='Tab Id' form='form51_"+result.id+"' value='"+result.element_id+"' required name='element_id'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Read'>";
										rowsHTML+="<input type='checkbox' readonly='readonly' form='form51_"+result.id+"' "+result.re+">";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Create'>";
										rowsHTML+="<input type='checkbox' readonly='readonly' form='form51_"+result.id+"' "+result.cr+">";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Update'>";
										rowsHTML+="<input type='checkbox' readonly='readonly' form='form51_"+result.id+"' "+result.up+">";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Delete'>";
										rowsHTML+="<input type='checkbox' readonly='readonly' form='form51_"+result.id+"' "+result.del+">";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Action'>";
										rowsHTML+="<input type='hidden' form='form51_"+result.id+"' value='"+result.id+"'>";
										rowsHTML+="<button type='submit' class='btn green' form='form51_"+result.id+"' name='save' title='Save' data-action='update'><i class='fa fa-save'></i></button>";
										rowsHTML+="<button type='button' class='btn red' form='form51_"+result.id+"' name='delete' title='Delete' onclick='form51_delete_item($(this));'><i class='fa fa-trash'></i></button>";
									rowsHTML+="</td>";			
							rowsHTML+="</tr>";
							
							$('#form51_body').append(rowsHTML);
							var fields=document.getElementById("form51_"+result.id);
							$(fields).on("submit", function(event)
							{
								event.preventDefault();
								form51_update_item(fields);
							});
						});
						$('#form51').formcontrol();							
						hide_loader();	
					}
				});
			}
			else
			{
				$('#form51_body').html("");
			}
		};
		
		function form51_add_item()
		{
			if(is_create_access('form51'))
			{
				var id=get_new_key();
				var rowsHTML="<tr>";
					rowsHTML+="<form id='form51_"+id+"' class='save_form51'></form>";
						rowsHTML+="<td data-th='Name'>";
							rowsHTML+="<input type='text' class='floatlabel dblclick_editable' placeholder='Tab Name' form='form51_"+id+"'>";
							rowsHTML+="<input type='text' class='floatlabel' placeholder='Tab Id' form='form51_"+id+"' required name='element_id'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Read'>";
							rowsHTML+="<input type='checkbox' form='form51_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Create'>";
						rowsHTML+="<input type='checkbox' form='form51_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Update'>";
							rowsHTML+="<input type='checkbox' form='form51_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Delete'>";
							rowsHTML+="<input type='checkbox' form='form51_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form51_"+id+"' value='"+id+"'>";
							rowsHTML+="<button type='submit' class='btn green' form='form51_"+id+"' title='Save' name='save' data-action='create'><i class='fa fa-save'></i></button>";
							rowsHTML+="<button type='button' class='btn red' form='form51_"+id+"' name='delete' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
				
				$('#form51_body').prepend(rowsHTML);
				var fields=document.getElementById("form51_"+id);
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form51_create_item(fields);
				});
				
				var fields=document.getElementById("form51_"+id);
				var name_filter=fields.elements[0];
				var id_filter=fields.elements['element_id'];
		
				var names_data={data_store:'user_preferences',
									return_column:'display_name',
									indexes:[{index:'id'}]};
				set_my_filter_json(names_data,name_filter,function () 
				{
					$(name_filter).focus();
				});
				
				$(name_filter).on('blur',function () 
				{
					var names_data={data_store:'user_preferences',
									return_column:'name',
									indexes:[{index:'display_name',exact:name_filter.value}]};
					read_json_single_column(names_data,function (elements) 
					{
						if(elements.length>0)
						{
							id_filter.value=elements[0];
						}
						else
						{
							var names_data={data_store:'user_preferences',
									return_column:'name',
									indexes:[{index:'display_name',exact:name_filter.value}]};
							set_my_value_json(names_data,id_filter);					
						}
					});
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form51_create_item(form)
		{
			if(is_create_access('form51'))
			{
				var master_form=document.getElementById('form51_master');
				var username=master_form.elements['username'].value;
				var save_button=form.elements['save'];
				var delete_button=form.elements['delete'];
				
				var element_name=form.elements[0].value;
				var re='unchecked';
				if(form.elements[2].checked)
					re='checked';
				var cr='unchecked';
				if(form.elements[3].checked)
					cr='checked';
				var up='unchecked';
				if(form.elements[4].checked)
					up='checked';
				var del='unchecked';
				if(form.elements[5].checked)
					del='checked';
				var data_id=form.elements[6].value;
				var element_id=form.elements[1].value;
				var last_updated=get_my_time();
				
				var data_json={data_store:'access_control',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'username',value:username,uniqueWith:['element_id']},
	 					{index:'element_id',value:element_id},
	 					{index:'element_name',value:element_name},
	 					{index:'re',value:re},
	 					{index:'cr',value:cr},
	 					{index:'up',value:up},
	 					{index:'del',value:del},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Access Control for user '+username,link_to:'form51'}};

				create_json(data_json);
				
				save_button.setAttribute('data-action','update');
					
				$(form).readonly();

				del_button.removeAttribute("onclick");
				$(delete_button).on('click',function(event)
				{
					event.preventDefault();
					form51_delete_item(delete_button);
				});

				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form51_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form51_update_item(form)
		{
			if(is_update_access('form51'))
			{
				var master_form=document.getElementById('form51_master');
				var username=master_form.elements['username'].value;
				var save_button=form.elements['save'];
				
				var element_name=form.elements[0].value;
				var re='unchecked';
				if(form.elements[2].checked)
					re='checked';
				var cr='unchecked';
				if(form.elements[3].checked)
					cr='checked';
				var up='unchecked';
				if(form.elements[4].checked)
					up='checked';
				var del='unchecked';
				if(form.elements[5].checked)
					del='checked';
				var data_id=form.elements[6].value;
				var element_id=form.elements[1].value;
				var last_updated=get_my_time();
				
				var data_json={data_store:'access_control',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'username',value:username},
	 					{index:'element_id',value:element_id},
	 					{index:'element_name',value:element_name},
	 					{index:'re',value:re},
	 					{index:'cr',value:cr},
	 					{index:'up',value:up},
	 					{index:'del',value:del},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Access Control for user '+username,link_to:'form51'}};

				update_json(data_json);
				
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form51_update_form()
		{
			if(is_update_access('form51'))
			{
				var username=document.getElementById('form51_master').elements['username'].value;
				var data_create={data_store:'access_control',
 					loader:'yes',
 					log:'yes',
 					data:[],
 					log_data:{title:'Created access control for user '+username,link_to:'form51'}};

				var data_update={data_store:'access_control',
 					loader:'yes',
 					log:'yes',
 					data:[],
 					log_data:{title:'Updated access control for user '+username,link_to:'form51'}};

				var last_updated=get_my_time();
			
				$(".save_form51").each(function () 
				{
					var row=$(this)[0];

					var re='unchecked';
					if(row.elements[2].checked)
						re='checked';
					var cr='unchecked';
					if(row.elements[3].checked)
						cr='checked';
					var up='unchecked';
					if(row.elements[4].checked)
						up='checked';
					var del='unchecked';
					if(row.elements[5].checked)
						del='checked';
					
					var data_json_array=[{index:'id',value:row.elements[6].value},
						{index:'username',value:username,uniqueWith:['element_id']},
	 					{index:'element_id',value:row.elements[1].value},
	 					{index:'element_name',value:row.elements[0].value},
	 					{index:'re',value:re},
	 					{index:'cr',value:cr},
	 					{index:'up',value:up},
	 					{index:'del',value:del},
	 					{index:'last_updated',value:last_updated}];
					
					if(row.elements['save'].getAttribute('data-action')=='create')
					{
						data_create.data.push(data_json_array);
					}
					else
					{
						data_update.data.push(data_json_array);
					}

					$(row).readonly();
				});
				
				create_batch_json(data_create);
				update_batch_json(data_update);
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form51_delete_item(button)
		{
			if(is_delete_access('form51'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					
					var data_id=form.elements[6].value;
					var data_json={data_store:'access_control',
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