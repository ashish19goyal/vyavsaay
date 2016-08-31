<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
                <tr>
                    <th>Letter #</th>
                    <th>Department</th>
                    <th>Notes</th>
                    <th>Due Date</th>
                </tr>
			</thead>
            <tbody id='object_staff_letters'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_staff_letters(obj_name,obj_id)
		{
            var container=document.getElementById('object_staff_letters');
            container.innerHTML="";        
			var attribute_data={data_store:'letters',
                           indexes:[{index:'id'},{index:'letter_num'},{index:'status',exact:'open'},{index:'assigned_to',exact:obj_name},{index:'department'},{index:'detail'},{index:'due_date'}]};
            read_json_rows('',attribute_data,function(results)
            {
                results.forEach(function(result)
				{
					var rowsHTML="<tr>";
                        rowsHTML+="<td data-th='Letter #'>";
                            rowsHTML+=result.letter_num;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Department'>";
                            rowsHTML+=result.department;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Detail'>";
                            rowsHTML+=result.detail;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Due Date'>";
                            rowsHTML+=get_my_past_date(result.due_date);
                        rowsHTML+="</td>";
					rowsHTML+="</tr>";
					
					$(container).append(rowsHTML);
				});		
            });
		}        
	</script>
</div>