<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Invoice #</th>
                    <th>Date</th>
                    <th>Amount</th>
				</tr>
			</thead>
			<tbody id='object_customers_bills'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_customers_bills(obj_name,obj_id)
		{
            var container=document.getElementById('object_customers_bills');
            container.innerHTML="";
            
            var paginator=$('#object_customers_bills').paginator({
                            page_size:5,
                            func:"initialize_object_customers_bills('"+obj_name+"','"+obj_id+"');"});
			
			var attribute_data={data_store:'bills',
                                count:paginator.page_size(),
                                start_index:paginator.get_index(),
                               indexes:[{index:'id'},{index:'bill_num'},{index:'total'},{index:'date'},{index:'customer',value:obj_name}]};
            read_json_rows('',attribute_data,function(results)
            {
                results.forEach(function(result)
				{
					var rowsHTML="<tr>";
                        rowsHTML+="<td data-th='Invoice #'>";
                            rowsHTML+=result.bill_num;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Date'>";
                            rowsHTML+=get_my_past_date(result.date);
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Amount'>";
                            rowsHTML+="Rs. "+result.total;
                        rowsHTML+="</td>";
					rowsHTML+="</tr>";
					
					$(container).append(rowsHTML);
				});
                paginator.update_index(results.length);
            });
		}        
	</script>
</div>