<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Policy #</th>
                    <th>Policy Name</th>
                    <th>Sum Insured</th>
                    <th>End Date</th>
                    <th>Status</th>
				</tr>
			</thead>
			<tbody id='object_customers_policies'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_customers_policies(obj_name,obj_id)
		{
            var container=document.getElementById('object_customers_policies');
            container.innerHTML="";

            var paginator=$('#object_customers_policies').paginator({
                            page_size:5,
                            func:"initialize_object_customers_policies('"+obj_name+"','"+obj_id+"');"});

			var policy_data={data_store:'policies',
                         count:paginator.page_size(),
                         start_index:paginator.get_index(),
                         indexes:[{index:'id'},
                                {index:'application_num'},
                                {index:'policy_num'},
                                {index:'policy_name'},
                                {index:'policy_holder',exact:obj_name},
                                {index:'status'},
                                {index:'sum_insured'},
                                {index:'end_date'}]};
            read_json_rows('',policy_data,function(results)
            {
                results.forEach(function(result)
				{
                    if(vUtil.isBlank(result.policy_num))
                    {
                        result.policy_num = result.application_num;
                    }
					var rowsHTML="<tr>";
                        rowsHTML+="<td data-th='Policy #'><b>";
                            rowsHTML+=result.policy_num;
                        rowsHTML+="</b></td>";
                        rowsHTML+="<td data-th='Policy Name'>";
                            rowsHTML+=result.policy_name;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Sum Insured'>";
                            rowsHTML+="Rs. "+result.sum_insured;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='End Date'>";
                            rowsHTML+=get_my_past_date(result.end_date);
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Status'>";
                            rowsHTML+=result.status;
                        rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$(container).append(rowsHTML);
				});
                paginator.update_index(results.length);
            });
		}
	</script>
</div>
