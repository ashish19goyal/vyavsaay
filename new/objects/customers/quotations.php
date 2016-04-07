<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<tbody id='object_customers_quotations'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_customers_quotations(obj_name,obj_id)
		{
            var container=document.getElementById('object_customers_quotations');
            container.innerHTML=""; 
            
            var paginator=$('#object_customers_quotations').paginator({
                            page_size:5,
                            func:"initialize_object_customers_quotations('"+obj_name+"','"+obj_id+"');"});
			        
			var attribute_data={data_store:'quotation',
                                count:paginator.page_size(),
                                start_index:paginator.get_index(),
                               indexes:[{index:'id'},{index:'quot_num'},{index:'status'},{index:'date'},{index:'customer',value:obj_name}]};
            read_json_rows('',attribute_data,function(results)
            {
                results.forEach(function(result)
				{
					var rowsHTML="<tr>";
                        rowsHTML+="<td data-th='Quotation #'>";
                            rowsHTML+=result.quot_num;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Date'>";
                            rowsHTML+=get_my_past_date(result.date);
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