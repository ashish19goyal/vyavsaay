<div id='form110' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=element_display('','form111');>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form110_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form110_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form110_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form110_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form110_header'></th>
						<th><input type='text' placeholder="Description" class='floatlabel' name='desc' form='form110_header'></th>
						<th><input type='submit' form='form110_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form110_body'>
			</tbody>
		</table>
	</div>
	
	<script>
		function form110_header_ini()
		{
			var filter_fields=document.getElementById('form110_header');
			var name_filter=filter_fields.elements['name'];
			
			var name_data={data_store:'reports',return_column:'name'};
			set_my_filter_json(name_data,name_filter);
			
			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form110_ini();
			});
		};
		
		function form110_ini()
		{
			show_loader();
			var fid=$("#form110_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			$('#form110_body').html("");
			
			var filter_fields=document.getElementById('form110_header');
			
			var fname=filter_fields.elements['name'].value;
			var fdesc=filter_fields.elements['desc'].value;
			
			var paginator=$('#form110_body').paginator();
			
			var data_json=new Object();
					data_json.count=paginator.page_size();
					data_json.start_index=paginator.get_index();
					data_json.data_store='reports';

					data_json.indexes=[{index:'id',value:fid},
									{index:'name',value:fname},
									{index:'description',value:fdesc}];
			
			read_json_rows('form110',data_json,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form110_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<a onclick=element_display('"+result.id+"','form111');><textarea readonly='readonly' form='form110_"+result.id+"'>"+result.name+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea readonly='readonly' form='form110_"+result.id+"' class='dblclick_editable'>"+result.description+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form110_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form110_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' name='delete' form='form110_"+result.id+"' title='Delete' onclick='form110_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form110_body').append(rowsHTML);			
				});
		
				$('#form110').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(data_json,'Custom Reports','form110',function (item){});
				
				hide_loader();
			});
		};
		
		
		function form110_delete_item(button)
		{
			if(is_delete_access('form110'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					
					var name=form.elements[0].value;
					var data_id=form.elements[2].value;
					var last_updated=get_my_time();
					
					var data_json={data_store:'reports',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Custom report "+name,link_to:"form110"}};
					
					var data2_json={data_store:'report_items',
 							data:[{index:'report_id',value:data_id}]};
										
					delete_json(data_json);
					delete_json(data2_json);
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