<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Storage</th>
                    <th>Quantity</th>
				</tr>
			</thead>
			<tbody id='object_product_instances_store_inventory_body'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_product_instances_store_inventory(obj_name,obj_id)
		{
            var container=document.getElementById('object_product_instances_store_inventory_body');
            container.innerHTML="";
            
            var columns={data_store:'area_utilization',
                         indexes:[{index:'id'},
                                 {index:'item_name',exact:obj_name.product},
                                 {index:'batch',exact:obj_name.batch},
                                 {index:'name'}]};

            read_json_rows('',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var id=result.id;
                    var rowsHTML="<tr>";
                        rowsHTML+="<td data-th='Storage'>";
                            rowsHTML+=result.name;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Quantity' id='object_product_instances_store_inventory_"+id+"'>";
                        rowsHTML+="</td>";
                    rowsHTML+="</tr>";
                    $('#object_product_instances_store_inventory_body').append(rowsHTML);
                    
                    get_store_inventory(result.name,result.item_name,result.batch,function(inventory)
                    {
                        console.log(inventory);
                        $('#object_product_instances_store_inventory_'+id).html(inventory);
                    });
                });
            });
		} 

	</script>
</div>