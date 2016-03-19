<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Person</th>
					<th>Amount</th>
					<th>Date</th>
                    <th>Notes</th>
                    <th>Status</th>
				</tr>
			</thead>
			<tbody id='object_projects_expenses_body'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_projects_expenses(obj_name,obj_id)
		{
            var container=document.getElementById('object_projects_expenses_body');
            container.innerHTML="";
            
            var paginator=$('#object_projects_expenses_body').paginator(
                        {
                            page_size:5,
                            func:"initialize_object_projects_expenses('"+obj_name+"','"+obj_id+"');"});
			
            var columns={data_store:'expenses',
                         count:paginator.page_size(),
                         start_index:paginator.get_index(),
                         access:{},
                         indexes:[{index:'id'},
                                 {index:'source',exact:'project'},
                                 {index:'source_name',exact:obj_name},
                                 {index:'person'},
                                 {index:'amount'},
                                 {index:'detail'},
                                 {index:'expense_date'},
                                 {index:'status'}]};

            read_json_rows('',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var id=result.id;
                    var rowsHTML="<tr>";
                    rowsHTML+="<form id='object_projects_expenses_rows_"+id+"'></form>";
                        rowsHTML+="<td data-th='Person'>";
                            rowsHTML+="<a onclick=\"show_object('staff','"+result.person+"');\">"+result.person+"</a>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Amount'>";
                            rowsHTML+="Rs. "+result.amount;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Date'>";
                            rowsHTML+=get_my_past_date(result.expense_date);
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Notes'>";
                            rowsHTML+=result.detail;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Status'><span class='label label-sm "+status_label_colors[result.status]+"'>";
                            rowsHTML+=result.status;
                        rowsHTML+="</span></td>";
                    rowsHTML+="</tr>";
                    $('#object_projects_expenses_body').append(rowsHTML);
                });
                paginator.update_index(results.length);                
            });
		} 

	</script>
</div>