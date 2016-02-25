<div id='form327' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form327_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form327_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form327_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form327_header'></form>
						<th><input type='text' placeholder="Letter #" class='floatlabel' name='letter' form='form327_header'></th>
						<th><input type='text' placeholder="Department" class='floatlabel' name='dep' form='form327_header'></th>
						<th><input type='text' placeholder="Notes" class='floatlabel' name='notes' form='form327_header'></th>
						<th><input type='text' placeholder="Assigned To" class='floatlabel' name='staff' form='form327_header'></th>
						<th><input type='submit' form='form327_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form327_body'>
			</tbody>
		</table>
	</div>
	
	<script>
		function form327_header_ini()
		{
			var filter_fields=document.getElementById('form327_header');	
			var names_filter=filter_fields.elements['letter'];
            var dep_filter=filter_fields.elements['dep'];
			var staff_filter=filter_fields.elements['staff'];
		
			var names_data={data_store:'letters',return_column:'letter_num'};
			set_my_filter_json(names_data,names_filter);

		      var dep_data={data_store:'letters',return_column:'department'};
			set_my_filter_json(dep_data,dep_filter);

			var staff_data={data_store:'staff',return_column:'acc_name'};
			set_my_filter_json(staff_data,staff_filter);
			
			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form327_ini();
			});	
		}
		
		function form327_ini()
		{
			show_loader();
			var fid=$("#form327_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			$('#form327_body').html("");
			
			var filter_fields=document.getElementById('form327_header');
			var fname=filter_fields.elements['letter'].value;
            var fdep=filter_fields.elements['dep'].value;
			var fnotes=filter_fields.elements['notes'].value;
			var fstaff=filter_fields.elements['staff'].value;
			
			var paginator=$('#form327_body').paginator();
			
			var new_columns=new Object();
					new_columns.count=paginator.page_size();
					new_columns.start_index=paginator.get_index();
					new_columns.data_store='letters';
					new_columns.indexes=[{index:'id',value:fid},
									{index:'letter_num',value:fname},
									{index:'department',value:fdep},
                                    {index:'detail',value:fnotes},
									{index:'status',exact:'closed'},
									{index:'assigned_to',value:fstaff}];
					
			read_json_rows('form327',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form327_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Letter #'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form327_"+result.id+"' value='"+result.letter_num+"' name='letter'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Department'>";
								rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form327_"+result.id+"' name='dep' value='"+result.department+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Notes'>";
								rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form327_"+result.id+"' name='notes'>"+result.department+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Assigned To'>";
								rowsHTML+="<a onclick=\"show_object('staff','"+result.assigned_to+"');\"><input type='text' readonly='readonly' form='form327_"+result.id+"' name='staff' class='dblclick_editable' value='"+result.assigned_to+"'></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form327_"+result.id+"' name='id' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form327_"+result.id+"' title='Save' name='save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form327_"+result.id+"' title='Delete' name='delete' onclick='form327_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form327_body').append(rowsHTML);
					var fields=document.getElementById("form327_"+result.id);
					var dep_filter=fields.elements['dep'];
					var staff_filter=fields.elements['staff'];
					var followup_button=fields.elements['followup'];
                    
					var dep_data={data_store:'letters',return_column:'department'};
					set_my_filter_json(dep_data,dep_filter);

					var staff_data={data_store:'staff',return_column:'acc_name'};
					set_my_value_list_json(staff_data,staff_filter);
							
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form327_update_item(fields);
					});
				});
		
				$('#form327').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Closed Letters','form327',function (item)
                {
                    delete item.status;
                    delete item.id;
                });
				hide_loader();
			});
		};
		
		function form327_update_item(form)
		{
			if(is_update_access('form327'))
			{
				var letter=form.elements['letter'].value;
				var dep=form.elements['dep'].value;
                var detail=form.elements['notes'].value;
				var staff=form.elements['staff'].value;
				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();
				var data_json={data_store:'letters',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'department',value:dep},
                        {index:'detail',value:notes},
	 					{index:'assigned_to',value:staff},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Letter # '+letter,link_to:'form327'}};
				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form327_delete_item(button)
		{
			if(is_delete_access('form327'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var letter=form.elements['letter'].value;
					var data_id=form.elements['id'].value;
					var data_json={data_store:'letters',
	 					log:'yes',
	 					data:[{index:'id',value:data_id}],
	 					log_data:{title:'Deleted',notes:'Letter # '+letter,link_to:'form327'}};
					var follow_json={data_store:'followups',
	 					data:[{index:'source_id',value:data_id}]};

					delete_json(data_json);
					delete_json(follow_json);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form327_import_template()
		{
			var data_array=['id','letter_num','department','notes','due_date','assigned_to'];
			my_array_to_csv(data_array);
		};
		
		function form327_import_validate(data_array)
		{
			var validate_template_array=[{column:'letter_num',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'notes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
                                    {column:'department',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
                                    {column:'assigned_to',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},     
									{column:'due_date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')}];
							
			var error_array=validate_import_array(data_array,validate_template_array);
			return error_array;					
		}
		
		function form327_import(data_array,import_type)
		{
			var data_json={data_store:'letters',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Closed letters',link_to:'form327'}};

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
	 					{index:'letter_num',value:row.letter_num},
	 					{index:'detail',value:row.notes},
                        {index:'department',value:row.department},             
	 					{index:'due_date',value:get_raw_time(row.due_date)},
	 					{index:'assigned_to',value:row.assigned_to},
                        {index:'status',value:'closed'},             
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
		}

	</script>
</div>