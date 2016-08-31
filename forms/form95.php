<div id='form95' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form95_header'></form>
						<th><input type='text' placeholder="Tab Id" class='floatlabel' name='id' form='form95_header'></th>
						<th><input type='text' placeholder="Tab Name" class='floatlabel' name='name' form='form95_header'></th>
						<th><input type='text' placeholder="Action" readonly="readonly" name='action' form='form95_header'>
							<input type='submit' form='form95_header' style='display:none;'></th>
				</tr>
			</thead>
			<tbody id='form95_body'>
			</tbody>
		</table>
	</div>
	
	<script>
		function form95_header_ini()
		{
			var filter_fields=document.getElementById('form95_header');	
			var id_filter=filter_fields.elements['id'];
			var name_filter=filter_fields.elements['name'];

			var number_data={data_store:'user_preferences',
									return_column:'name',
									indexes:[{index:'type',exact:'form'},
												{index:'value',exact:'checked'}]};			
			
			var name_data={data_store:'user_preferences',
									return_column:'display_name',
									indexes:[{index:'type',exact:'form'},
												{index:'value',exact:'checked'}]};			
			
			set_my_filter_json(number_data,id_filter);
			set_my_filter_json(name_data,name_filter);
			
			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form95_ini();
			});
		};
		
		function form95_ini()
		{
			show_loader();
			var fid=$("#form95_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			$('#form95_body').html("");

			var filter_fields=document.getElementById('form95_header');
				
			var fnumber=filter_fields.elements['id'].value;
			var fname=filter_fields.elements['name'].value;
			
			var paginator=$('#form95_body').paginator();
			
			var data_json=new Object();
					data_json.count=paginator.page_size();
					data_json.start_index=paginator.get_index();
					data_json.data_store='user_preferences';

					data_json.indexes=[{index:'id',value:fid},
									{index:'name',value:fnumber},
									{index:'display_name',value:fname},
									{index:'type',exact:'form'},
									{index:'value',exact:'checked'}];
						
			read_json_rows('form95',data_json,function(results)
			{	
				results.forEach(function(result)
				{
					var rowsHTML="";
					rowsHTML+="<tr>";
						rowsHTML+="<form id='form95_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Tab Id'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form95_"+result.id+"' value='"+result.name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Tab Name'>";
								rowsHTML+="<textarea readonly='readonly' form='form95_"+result.id+"'>"+result.display_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Import'>";
								rowsHTML+="<input type='hidden' form='form95_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='button' class='btn red' form='form95_"+result.id+"'>IMPORT</button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";
					
					$('#form95_body').prepend(rowsHTML);
					
					var fields=document.getElementById("form95_"+result.id);
					
					var import_button=fields.elements[3];
					$(import_button).on("click",function(event)
					{
						import_data(result.name);
					});
				});
				
				$('#form95').formcontrol();
				paginator.update_index(results.length);
				
				hide_loader();
			});
		};


	</script>
</div>