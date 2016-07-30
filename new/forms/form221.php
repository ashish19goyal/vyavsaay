<div id='form221' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form221_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form221_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form221_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form221_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form221_upload' onclick=modal23_action(form221_import_template,form221_import,form221_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form221_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form221_header'></th>
						<th><input type='text' placeholder="Project" class='floatlabel' name='project' form='form221_header'></th>
						<th><input type='text' placeholder="Date" class='floatlabel' name='date' form='form221_header'></th>
						<th><input type='text' placeholder="Hours" readonly='readonly' name='hours' form='form221_header'></th>
						<th><input type='submit' form='form221_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form221_body'>
			</tbody>
		</table>
	</div>
	
	<script>
		function form221_header_ini()
		{
			var filter_fields=document.getElementById('form221_header');
			var name_filter=filter_fields.elements['name'];
			var project_filter=filter_fields.elements['project'];
			var date_filter=filter_fields.elements['date'];
		
			var name_data={data_store:'staff',return_column:'acc_name'};
			var project_data={data_store:'projects',return_column:'name'};
			
			set_my_filter_json(name_data,name_filter);
			set_my_filter_json(project_data,project_filter);
			
			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form221_ini();
			});
			
			$(date_filter).datepicker();
		};
		
		function form221_ini()
		{
			show_loader();
			var fid=$("#form221_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			$('#form221_body').html('');
			var filter_fields=document.getElementById('form221_header');
			
			//populating form 
			var fname=filter_fields.elements['name'].value;
			var fproject=filter_fields.elements['project'].value;
			var fdate=get_raw_time(filter_fields.elements['date'].value);
			
			var paginator=$('#form221_body').paginator({'page_size':25});
			
			var new_columns=new Object();
					new_columns.count=paginator.page_size();
					new_columns.start_index=paginator.get_index();
					new_columns.data_store='timesheet';
					new_columns.access={};
					new_columns.indexes=[{index:'id',value:fid},
									{index:'acc_name',value:fname},
									{index:'date',value:fdate},
									{index:'hours_worked'},
									{index:'source',exact:'project'},
									{index:'source_name',value:fproject}];		
			
				read_json_rows('form221',new_columns,function(results)
				{
					results.forEach(function(result)
					{
						var id=result.id;
						var rowsHTML="<tr>";
						rowsHTML+="<form id='form221_"+id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<a onclick=\"show_object('staff','"+result.acc_name+"');\"><textarea readonly='readonly' form='form221_"+id+"'>"+result.acc_name+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Project'>";
								rowsHTML+="<a onclick=\"show_object('projects','"+result.source_name+"');\"><input type='text' readonly='readonly' form='form221_"+id+"' value='"+result.source_name+"'></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Date'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form221_"+id+"' value='"+get_my_past_date(result.date)+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Hours'>";
								rowsHTML+="<input type='number' step='any' readonly='readonly' form='form221_"+id+"' value='"+result.hours_worked+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form221_"+id+"' value='"+id+"'>";
								rowsHTML+="<button type='button' class='btn red' form='form221_"+id+"' name='delete' title='Delete' onclick=form221_delete_item($(this));><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
						
						$('#form221_body').append(rowsHTML);
					});
					
					$('#form221').formcontrol();
					paginator.update_index(results.length);
					initialize_tabular_report_buttons(new_columns,'Timesheet','form221',function (item){});
					hide_loader();
				});
		}
		
		
		function form221_add_item()
		{
			if(is_create_access('form221'))
			{
				var id=get_new_key();
				var rowsHTML="<tr>";
				rowsHTML+="<form id='form221_"+id+"' autocomplete='off'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' form='form221_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Project'>";
						rowsHTML+="<input type='text' form='form221_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+="<input type='text' form='form221_"+id+"' value='"+vTime.date()+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Hours'>";
						rowsHTML+="<input type='text' form='form221_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form221_"+id+"' value='"+id+"'>";
						rowsHTML+="<button type='submit' class='btn green' form='form221_"+id+"' name='save' title='Save' id='save_form221_"+id+"' ><i class='fa fa-save'></i></button>";	
						rowsHTML+="<button type='button' class='btn red' form='form221_"+id+"' name='delete' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form221_body').prepend(rowsHTML);
				var fields=document.getElementById("form221_"+id);
				var person_filter=fields.elements[0];
				var project_filter=fields.elements[1];
				var date_filter=fields.elements[2];
				
				$(date_filter).datepicker();
				
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form221_create_item(fields);
				});

				var project_data={data_store:'projects',return_column:'name'};
				set_my_value_list_json(project_data,project_filter);
								
				if(is_update_access('form221'))
				{
					var person_data={data_store:'staff',return_column:'acc_name'};
					set_my_value_list_json(person_data,person_filter,function () 
					{
						$(person_filter).focus();
					});
				}
				else
				{
					person_filter.value=get_account_name();
					person_filter.setAttribute('readonly','readonly');
					$(project_filter).focus();
				}
				$('#form221').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form221_create_item(form)
		{
			if(is_create_access('form221'))
			{
				var person=form.elements[0].value;
				var project=form.elements[1].value;
				var date=get_raw_time(form.elements[2].value);		
				var hours=form.elements[3].value;		
				var data_id=form.elements[4].value;
				var del_button=form.elements[6];
				var last_updated=get_my_time();
				
				var data_json={data_store:'timesheet',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'acc_name',value:person},
	 					{index:'source',value:'project'},
	 					{index:'source_name',value:project},
	 					{index:'date',value:date},
	 					{index:'hours_worked',value:hours},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:hours+' hours for project '+project,link_to:'form221'}};
				create_json(data_json);
					
				$(form).readonly();
				
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form221_delete_item(del_button);
				});
				
				$(form).off('submit');
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form221_delete_item(button)
		{
			if(is_delete_access('form221'))
			{	
				modal115_action(function()
				{	
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);	
					var data_id=form.elements[4].value;
					
					var data_json={data_store:'timesheet',
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
		
		function form221_import_template()
		{
			var data_array=['id','name','project','date','hours_worked'];
			my_array_to_csv(data_array);
		}
		
		function form221_import_validate(data_array)
		{
			var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'project',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'date',required:'yes',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
									{column:'hours_worked',required:'yes',regex:new RegExp('^[0-9]+$')}];

			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;					
		}
		
		function form221_import(data_array,import_type)
		{
			var data_json={data_store:'timesheet',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Timesheet for projects',link_to:'form221'}};

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
	 					{index:'acc_name',value:row.name},
	 					{index:'date',value:get_raw_time(row.date)},
	 					{index:'hours_worked',value:row.hours_worked},
	 					{index:'source',value:'project'},
	 					{index:'source_name',value:row.project},
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