<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Bill #</th>
                    <th>Date</th>
                    <th>Amount</th>
				</tr>
			</thead>
			<tbody id='object_suppliers_purchases'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_suppliers_purchases(obj_name,obj_id)
		{
            var container=document.getElementById('object_suppliers_purchases');
            container.innerHTML="";        
			var attribute_data={data_store:'supplier_bills',
                           indexes:[{index:'id'},{index:'attribute'},{index:'value'},{index:'type',exact:'supplier'},{index:'name',value:obj_name}]};
            read_json_rows('',attribute_data,function(results)
            {
                results.forEach(function(result)
				{
					var rowsHTML="<tr>";
                        rowsHTML+="<td data-th='Bill #'>";
                            rowsHTML+=result.bill_id;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Date'>";
                            rowsHTML+=get_my_past_date(result.bill_date);
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Amount'>";
                            rowsHTML+="Rs. "+result.total;
                        rowsHTML+="</td>";
					rowsHTML+="</tr>";
					
					$(container).append(rowsHTML);
				});		
            });
		}        
	</script>
</div>