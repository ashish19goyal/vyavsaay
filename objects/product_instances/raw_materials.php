<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Item</th>
                    <th>Batch</th>
                    <th>Quantity</th>
				</tr>
			</thead>
			<tbody id='object_product_instances_raw_materials_body'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_product_instances_raw_materials(obj_name,obj_id)
		{
            var container=document.getElementById('object_product_instances_raw_materials_body');
            container.innerHTML="";

            var items_column={data_store:'production_plan_items',return_column:'id',
                             indexes:[{index:'item',exact:obj_name.product},
                                     {index:'batch',exact:obj_name.batch}]};
		    read_json_single_column(items_column,function(items)
            {
                if(items.length>0)
                {
                    var columns={data_store:'batch_raw_material',
                             indexes:[{index:'item'},{index:'batch'},{index:'quantity'},{index:'production_id',exact:items[0]}]};

                    read_json_rows('',columns,function(results)
                    {
                        results.forEach(function(result)
                        {
                            var rowsHTML="<tr>";
                                rowsHTML+="<td data-th='Item'>";
                                    rowsHTML+=result.item;
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Batch'>";
                                    rowsHTML+=result.batch;
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Quantity'>";
                                    rowsHTML+=result.quantity;
                                rowsHTML+="</td>";
                            rowsHTML+="</tr>";
                            $('#object_product_instances_raw_materials_body').append(rowsHTML);
                        });
                    });
                }
                else
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<td colspan='3'>No production records found for this batch</td>";
                    rowsHTML+="</tr>";
                    $('#object_product_instances_raw_materials_body').append(rowsHTML);
                }
            });
		}

	</script>
</div>
