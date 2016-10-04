<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Plan</th>
                    <th>Brand</th>
                    <th>Line</th>
                    <th>Quantity</th>
                    <th>Schedule</th>
				</tr>
			</thead>
			<tbody id='object_product_instances_production_record_body'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_product_instances_production_record(obj_name,obj_id)
		{
            var container=document.getElementById('object_product_instances_production_record_body');
            container.innerHTML="";

            var items_column={data_store:'batch_raw_material',count:1,
                             indexes:[{index:'item',exact:obj_name.product},
                                     {index:'batch',exact:obj_name.batch},
                                     {index:'production_id'},
                                    {index:'production_plan'}]};
		    read_json_rows('',items_column,function(items)
            {
                if(items.length>0)
                {
                    var columns={data_store:'production_plan_items',count:1,
                             indexes:[{index:'id',exact:items[0].production_id},
                             {index:'brand'},{index:'quantity'},
                             {index:'production_line'},
                            {index:'from_time'},{index:'to_time'},{index:'produced_quantity'}]};

                    read_json_rows('',columns,function(results)
                    {
                        results.forEach(function(result)
                        {
                            var rowsHTML="<tr>";
                                rowsHTML+="<td data-th='Plan'>";
                                    rowsHTML+=items[0].production_plan;
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Brand'>";
                                    rowsHTML+=result.brand;
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Line'>";
                                    rowsHTML+=result.production_line;
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Quantity'>";
                                    rowsHTML+='Scheduled: '+result.quantity;
                                    rowsHTML+='<br>Produced: '+result.produced_quantity;
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Schedule'>";
                                    rowsHTML+='From: '+vTime.date({time:result.from_time});
                                    rowsHTML+='<br>To: '+vTime.date({time:result.to_time});
                                rowsHTML+="</td>";
                            rowsHTML+="</tr>";
                            $('#object_product_instances_production_record_body').append(rowsHTML);
                        });
                    });
                }
                else
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<td colspan='5'>No production records found for this batch</td>";
                    rowsHTML+="</tr>";
                    $('#object_product_instances_production_record_body').append(rowsHTML);
                }
            });
		}

	</script>
</div>
