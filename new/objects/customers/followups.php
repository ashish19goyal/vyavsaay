<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<tbody id='object_customers_followups'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_customers_followups(obj_name,obj_id)
		{
            var container=document.getElementById('object_customers_followups');
            container.innerHTML="";
            
            var paginator=$('#object_customers_followups').paginator({
                            page_size:5,
                            func:"initialize_object_customers_followups('"+obj_name+"','"+obj_id+"');"});

			var attribute_data={data_store:'followups',
                            count:paginator.page_size(),
                            start_index:paginator.get_index(),
                           indexes:[{index:'id'},{index:'date'},{index:'response'},{index:'detail'},{index:'customer',value:obj_name}]};
            read_json_rows('',attribute_data,function(results)
            {
                results.forEach(function(result)
				{
					var rowsHTML="<tr>";
                        rowsHTML+="<td data-th='Date'>";
                            rowsHTML+=get_my_past_date(result.date);
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Response'>";
                            rowsHTML+=result.response;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Notes'>";
                            rowsHTML+=result.detail;
                        rowsHTML+="</td>";
					rowsHTML+="</tr>";
					
					$(container).append(rowsHTML);
				});	
                paginator.update_index(results.length);
            });
		}        
	</script>
</div>