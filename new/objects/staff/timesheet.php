<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Project</th>
					<th>Date</th>
                    <th>Hours</th>
                </tr>
			</thead>
			<tbody id='object_staff_timesheet_body'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_staff_timesheet(obj_name,obj_id)
		{
            var container=document.getElementById('object_staff_timesheet_body');
            container.innerHTML="";
            
            var paginator=$('#object_staff_timesheet_body').paginator({
                            page_size:5,
                            func:"initialize_object_staff_timesheet('"+obj_name+"','"+obj_id+"');"});
			
            var columns={data_store:'timesheet',
                         count:paginator.page_size(),
                         start_index:paginator.get_index(),
                         access:{},
                         indexes:[{index:'id'},
                                 {index:'source',exact:'project'},
                                 {index:'source_name'},
                                 {index:'acc_name',exact:obj_name},
                                 {index:'date'},
                                 {index:'hours_worked'}]};

            read_json_rows('',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var id=result.id;
                    var rowsHTML="<tr>";
                    rowsHTML+="<form id='object_staff_timesheet_rows_"+id+"'></form>";
                        rowsHTML+="<td data-th='Project'>";
                            rowsHTML+=result.source_name;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Date'>";
                            rowsHTML+=get_my_past_date(result.date);
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Hours'>";
                            rowsHTML+=result.hours_worked;
                        rowsHTML+="</td>";
                    rowsHTML+="</tr>";
                    $('#object_staff_timesheet_body').append(rowsHTML);
                });
                paginator.update_index(results.length);                
            });
		} 

	</script>
</div>