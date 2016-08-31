<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Customer</th>
                    <th>Details</th>
                    <th>Status</th>
                    <th>Followup Date</th>
				</tr>
			</thead>
			<tbody id='object_staff_leads'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_staff_leads(obj_name,obj_id)
		{
            var container=document.getElementById('object_staff_leads');
            container.innerHTML="";   
            
            var paginator=$('#object_staff_leads').paginator({
                            page_size:5,
                            func:"initialize_object_staff_leads('"+obj_name+"','"+obj_id+"');"});
			
			var attribute_data={data_store:'sale_leads',
                         count:paginator.page_size(),
                         start_index:paginator.get_index(),
                         indexes:[{index:'id'},{index:'customer'},{index:'detail'},{index:'identified_by',exact:obj_name},{index:'status'},{index:'due_date'}]};
            read_json_rows('',attribute_data,function(results)
            {
                results.forEach(function(result)
				{
					var rowsHTML="<tr>";
                        rowsHTML+="<td data-th='Customer'><b>";
                            rowsHTML+=result.customer;
                        rowsHTML+="</b></td>";
                        rowsHTML+="<td data-th='Details'>";
                            rowsHTML+=result.detail;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Status'>";
                            rowsHTML+=result.status;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Followup Date'>";
                            rowsHTML+=get_my_past_date(result.due_date);
                        rowsHTML+="</td>";
					rowsHTML+="</tr>";
					
					$(container).append(rowsHTML);
				});
                paginator.update_index(results.length);                
            });
		}        
	</script>
</div>