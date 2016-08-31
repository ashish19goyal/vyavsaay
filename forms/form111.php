<div id='form111' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=form111_add_item();>Add field <i class='fa fa-plus'></i></a>
			<a class='btn btn-circle grey btn-outline btn-sm' id='form111_save_report'>Save Report <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
			<a class='btn btn-circle grey btn-outline btn-sm' id='form111_generate_button'><i class='fa fa-file-excel-o'></i> Generate Report</a>
      </div>	
	</div>
	
	<div class="portlet-body">
	<form id='form111_master' autocomplete="off">
		<fieldset>
			<label>Report Name<br><input type='text' required name='name'></label>
			<label>Description<br><textarea name='desc'></textarea></label>
			<label>	<input type='hidden' name='report_id'></label>
			<label>	<input type='submit' class='submit_hidden'></label>
		</fieldset>
	</form>
		
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form111_header'></form>
						<th><input type='text' placeholder="Table" readonly="readonly" name='table' form='form111_header'></th>
						<th><input type='text' placeholder="Field"  readonly="readonly" name='field' form='form111_header'></th>
						<th><input type='text' placeholder="Condition" readonly="readonly" name='condition' form='form111_header'></th>
						<th><input type='text' placeholder="Match" readonly="readonly" name='match' form='form111_header'></th>
						<th><input type='submit' form='form111_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form111_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form111_header_ini()
		{
			var fields=document.getElementById('form111_master');
			fields.elements['name'].value="";
			fields.elements['desc'].value="";
			var report_id=fields.elements['report_id'];
			report_id.value=vUtil.newKey();
			
			var generate_button=document.getElementById('form111_generate_button');
			$(generate_button).off('click');
			$(generate_button).on('click',function () 
			{
				generate_report(report_id.value);
			});			
			
			var save_report_button=document.getElementById('form111_save_report');
			$(save_report_button).off('click');
			$(save_report_button).on('click',function () 
			{
				form111_create_form();
			});			
						
			$(fields).off('submit');
			$(fields).on('submit',function(event)
			{
				event.preventDefault();
				form111_add_item();
			});
		}
		
		function form111_ini()
		{
			var report_id=$("#form111_link").attr('data_id');
			if(report_id==null)
				report_id="";	
			$('#form111_body').html("");
			
			if(report_id!="")
			{
				show_loader();
				var report_columns={data_store:'reports',
										indexes:[{index:'id',value:report_id},
													{index:'name'},{index:'description'}]};
				var report_item_columns={data_store:'report_items',
										indexes:[{index:'id'},{index:'report_id',exact:report_id},
													{index:'table1'},{index:'field1'},{index:'condition1'},
													{index:'table2'},{index:'field2'},{index:'value'}]};
													
				read_json_rows('form111',report_columns,function(report_results)
				{
					if (report_results.length>0)
					{
						var filter_fields=document.getElementById('form111_master');
						filter_fields.elements['name'].value=report_results[0].name;
						filter_fields.elements['desc'].value=report_results[0].description;
						filter_fields.elements['report_id'].value=report_results[0].id;
						
						var save_report_button=document.getElementById('form111_save_report');
						$(save_report_button).off('click');
						$(save_report_button).on('click',function () 
						{
							form111_update_form();
						});			

					}
				});
				/////////////////////////////////////////////////////////////////////////

				read_json_rows('form111',report_item_columns,function(results)
				{
					results.forEach(function(result)
					{
						var id=result.id;
						var rowsHTML="<tr>";
						rowsHTML+="<form id='form111_"+id+"'></form>";
							rowsHTML+="<td data-th='Table'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form111_"+id+"' value='"+result.table1+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Field'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form111_"+id+"' value='"+result.field1+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Condition'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form111_"+id+"' value='"+result.condition1+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Match'>";
								rowsHTML+="<input type='text' placeholder='Table' class='floatlabel' readonly='readonly' form='form111_"+id+"' value='"+result.table2+"'>";
								rowsHTML+="<input type='text' placeholder='Field' class='floatlabel' readonly='readonly' form='form111_"+id+"' value='"+result.field2+"'>";
								rowsHTML+="<input type='text' placeholder='value' class='floatlabel' readonly='readonly' form='form111_"+id+"' value='"+result.value+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form111_"+id+"' value='"+id+"'>";
								rowsHTML+="<input type='button' class='submit_hidden' form='form111_"+id+"' name='save' id='save_form111_"+id+"'>";
								rowsHTML+="<button type='button' class='btn red' name='delete' form='form111_"+id+"' title='Delete' onclick='form111_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
						rowsHTML+="</tr>";
					
						$('#form111_body').append(rowsHTML);
					});
					$('#form111').formcontrol();
					hide_loader();
				});
			}
		}
		
		function form111_add_item()
		{
			if(is_create_access('form111'))
			{
				var id=vUtil.newKey();
				var rowsHTML="<tr>";
				rowsHTML+="<form id='form111_"+id+"' autocomplete='off'></form>";
					rowsHTML+="<td data-th='Table'>";
						rowsHTML+="<input type='text' form='form111_"+id+"' required value=''>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Field'>";
						rowsHTML+="<input type='text' form='form111_"+id+"' required value=''>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Condition'>";
						rowsHTML+="<input type='text' form='form111_"+id+"' required value='none'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Match'>";
						rowsHTML+="<input type='text' class='floatlabel' placeholder='Table' form='form111_"+id+"'>";
						rowsHTML+="<input type='text' class='floatlabel' placeholder='Field' form='form111_"+id+"'>";
						rowsHTML+="<input type='text' class='floatlabel' placeholder='Value' form='form111_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form111_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='button' class='submit_hidden' form='form111_"+id+"' name='save' id='save_form111_"+id+"' >";	
						rowsHTML+="<button type='button' class='btn red' name='delete' form='form111_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
						rowsHTML+="<input type='submit' class='submit_hidden' form='form111_"+id+"'>";	
					rowsHTML+="</td>";			
				rowsHTML+="</tr>";
			
				$('#form111_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form111_"+id);
				var table1_filter=fields.elements[0];
				var field1_filter=fields.elements[1];
				var condition_filter=fields.elements[2];
				var table2_filter=fields.elements[3];
				var field2_filter=fields.elements[4];
				var value_filter=fields.elements[5];
				var save_button=fields.elements['save'];
				
				$(save_button).on('click',function () 
				{
					form111_create_item(fields);
				});
				
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form111_add_item();
				});
							
				$(table1_filter).focus();
				
				var tables_data={data_store:'report_items',return_column:'table1'};
				var fields_data={data_store:'report_items',return_column:'field1'};
				
				set_my_filter_json(tables_data,table1_filter);
				set_my_filter_json(tables_data,table2_filter);
				set_my_filter_json(fields_data,field1_filter);
				set_my_filter_json(fields_data,field2_filter);

				set_static_value_list_json('report_items','condition1',condition_filter);

				$(condition_filter).on('blur',function(event)
				{
					if(condition_filter.value.indexOf('field')!=-1)
					{
						value_filter.setAttribute('readonly','readonly');
						table2_filter.removeAttribute('readonly');
						field2_filter.removeAttribute('readonly');
					}
					else
					{
						value_filter.removeAttribute('readonly');
						table2_filter.setAttribute('readonly','readonly');
						field2_filter.setAttribute('readonly','readonly');
					}
				});
				$('#form111').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}		
		}
		
		function form111_create_form()
		{
			if(is_create_access('form111'))
			{
				var form=document.getElementById("form111_master");
		
				var name=form.elements[1].value;
				var description=form.elements[2].value;
				var data_id=form.elements[3].value;
				var last_updated=get_my_time();
				
				var data_json={data_store:'reports',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'description',value:description},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Created',notes:'Report '+name,link_to:'form111'}};
				create_json(data_json);
				
				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form111_update_form();
				});
				
				$("[id^='save_form111_']").click();
			}
			else
			{
				$("#modal2_link").click();
			}	
		}
		
		function form111_create_item(form)
		{
			if(is_create_access('form111'))
			{
				var report_id=document.getElementById('form111_master').elements[3].value;
				var table1=form.elements[0].value;
				var field1=form.elements[1].value;
				var condition=form.elements[2].value;
				var table2=form.elements[3].value;
				var field2=form.elements[4].value;
				var value=form.elements[5].value;
				var data_id=form.elements[6].value;
				var last_updated=get_my_time();
				var save_button=form.elements['save'];
				var del_button=form.elements['delete'];

				var data_json={data_store:'report_items',
	 				data:[{index:'id',value:data_id},
	 					{index:'table1',value:table1},
	 					{index:'field1',value:field1},
	 					{index:'condition1',value:condition},
	 					{index:'table2',value:table2},
	 					{index:'field2',value:field2},
	 					{index:'value',value:value},
	 					{index:'report_id',value:report_id},
	 					{index:'last_updated',value:last_updated}]};
							
				create_json(data_json);
					
				$(form).readonly();
				
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form111_delete_item(del_button);
				});
				
				$(save_button).off('click');
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form111_update_form()
		{
			if(is_update_access('form111'))
			{
				var form=document.getElementById("form111_master");
		
				var name=form.elements[1].value;
				var description=form.elements[2].value;
				var data_id=form.elements[3].value;
				var last_updated=get_my_time();
				
				var data_json={data_store:'reports',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'description',value:description},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Report '+name,link_to:'form111'}};
								
				update_row(data_json);
				
				$("[id^='save_form111_']").click();
			}
			else
			{
				$("#modal2_link").click();
			}	
		}
		
		function form111_delete_item(button)
		{
			if(is_delete_access('form111'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					
					var data_id=form.elements[6].value;
					var data_json={data_store:'report_items',
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