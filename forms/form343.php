<div id='form343' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=modal210_action('');>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form343_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form343_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form343_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form343_header'></form>
						<th><input type='text' placeholder="Description" class='floatlabel' name='desc' form='form343_header'></th>
						<th><input type='text' placeholder="Link" readonly='readonly' form='form343_header'></th>
						<th><input type='submit' form='form343_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form343_body'>
			</tbody>
		</table>
	</div>
	
	<script>
		function form343_header_ini()
		{
			var filter_fields=document.getElementById('form343_header');	
			
			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form343_ini();
			});
		}
		
		function form343_ini()
		{
			show_loader();
			var fid=$("#form343_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			$('#form343_body').html("");
			
			var filter_fields=document.getElementById('form343_header');
			var fdetail=filter_fields.elements['desc'].value;
			
			var paginator=$('#form343_body').paginator();
			
			var new_columns={count:paginator.page_size(),
                             start_index:paginator.get_index(),
                             data_store:'s3_objects',
                             indexes:[{index:'id',value:fid},
									{index:'type'},
									{index:'description',value:fdetail},
									{index:'status'},
									{index:'name'}]};
					
			read_json_rows('form343',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form343_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea readonly='readonly' form='form343_"+result.id+"' name='desc'>"+result.description+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Link'>";
								rowsHTML+="<a href='https://s3-ap-southeast-1.amazonaws.com/vyavsaay-documents/"+result.name+"'><input type='text' readonly='readonly' placeholder='Click to preview' form='form343_"+result.id+"' name='preview' value='"+result.name+"'></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form343_"+result.id+"' name='id' value='"+result.id+"'>";
								rowsHTML+="<input type='hidden' form='form343_"+result.id+"' name='name' value='"+result.name+"'>";
								rowsHTML+="<button type='button' class='btn red' form='form343_"+result.id+"' title='Delete' name='delete' onclick='form343_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form343_body').append(rowsHTML);				    
				});
		
				$('#form343').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Documents','form343');
				hide_loader();
			});
		};
		
		
		function form343_delete_item(button)
		{
			if(is_delete_access('form343'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var data_id=form.elements['id'].value;
					var object_name=form.elements['name'].value;
					var data_json={data_store:'s3_objects',
	 					data:[{index:'id',value:data_id}]};
					
                    var object_data={type:'delete',bucket:'vyavsaay-documents',name:object_name};

                    delete_json(data_json);
					s3_object(object_data);
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