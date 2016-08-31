<div id='form143' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">	
	</div>

	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form143_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form143_header'></th>
						<th><input type='text' placeholder="Display Name" class='floatlabel' name='disp' form='form143_header'></th>
						<th><input type='text' placeholder="Workflow" readonly="readonly" name='workflow' form='form143_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form143_header'></th>
						<th><input type='text' placeholder="Function" readonly='readonly' name='function' form='form143_header'></th>
						<th><input type='submit' form='form143_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form143_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form143_header_ini()
		{
			var filter_fields=document.getElementById('form143_header');
			var name_filter=filter_fields.elements['name'];
			var display_filter=filter_fields.elements['disp'];
			var status_filter=filter_fields.elements['status'];
			
			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form143_ini();
			});
		
			var name_data={data_store:'ques_struct',return_column:'name'};
			var display_data={data_store:'ques_struct',return_column:'display_name'};
			
			set_my_filter_json(name_data,name_filter);
			set_my_filter_json(display_data,display_filter);
			set_static_filter_json('ques_data','status',status_filter);
		};
		
		function form143_ini()
		{
			show_loader();
			var fid=$("#form143_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			$('#form143_body').html("");

			var filter_fields=document.getElementById('form143_header');
			var fname=filter_fields.elements['name'].value;
			var fdisplay=filter_fields.elements['disp'].value;
			var fstatus=filter_fields.elements['status'].value;
			
			var paginator=$('#form143_body').paginator();
			
			var data_json=new Object();
					data_json.count=paginator.page_size();
					data_json.start_index=paginator.get_index();
					data_json.data_store='ques_struct';

					data_json.indexes=[{index:'id',value:fid},
									{index:'name',value:fname},
									{index:'display_name',value:fdisplay},
									{index:'status',value:fstatus},
									{index:'function_def'},
									{index:'reviewer'},{index:'approver'}];					

			read_json_rows('form143',data_json,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="";
					rowsHTML+="<tr>";
						rowsHTML+="<form id='form143_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<a onclick=element_display('"+result.id+"','form142');><textarea readonly='readonly' form='form143_"+result.id+"'>"+result.name+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Display Name'>";
								rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form143_"+result.id+"'>"+result.display_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Workflow'>";
								rowsHTML+="<input type='text' class='floatlabel dblclick_editable' placeholder='Reviewer' readonly='readonly' form='form143_"+result.id+"' value='"+result.reviewer+"'>";
								rowsHTML+="<input type='text' readonly='readonly' placeholder='Approver' class='floatlabel dblclick_editable' form='form143_"+result.id+"' value='"+result.approver+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form143_"+result.id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Function'>";
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form308_"+result.id+"' onclick=\"modal192_action('"+result.id+"');\">Function</button>";							
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form143_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form143_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";
		
					$('#form143_body').append(rowsHTML);
					var fields=document.getElementById("form143_"+result.id);
					var reviewer_filter=fields.elements[2];
					var approver_filter=fields.elements[3];
					
					var staff_data={data_store:'staff',return_column:'acc_name'};
					set_my_value_list_json(staff_data,reviewer_filter);
					set_my_value_list_json(staff_data,approver_filter);
					
					$(fields).on('submit',function(event)
					{
						event.preventDefault();
						form143_update_item(fields);
					});						
				});
		
				$('#form143').formcontrol();
				paginator.update_index(results.length);
				hide_loader();
			});
		}
		
		/**
		 * @form Manage questionnaire
		 * @param button
		 */
		function form143_update_item(form)
		{
			if(is_update_access('form143'))
			{
				var name=form.elements[0].value;
				var display_name=form.elements[1].value;
				var reviewer=form.elements[2].value;
				var approver=form.elements[3].value;
				var status=form.elements[4].value;
				var id=form.elements[5].value;
				var last_updated=get_my_time();
				
				var data_json={data_store:'ques_struct',
	 				log:'yes',
	 				data:[{index:'id',value:id},
	 					{index:'name',value:name},
	 					{index:'display_name',value:display_name},
	 					{index:'status',value:status},
	 					{index:'approver',value:approver},
	 					{index:'reviewer',value:reviewer},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Questionnaire '+display_name,link_to:'form143'}};

				update_json(data_json);	
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

	</script>
</div>