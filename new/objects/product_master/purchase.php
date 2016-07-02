<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Supplier</th>
                	<th>Date</th>
                    <th>Quantity</th>
					<th>Rate</th>
					<th>Amount</th>
                </tr>
			</thead>
			<tbody id='object_product_master_purchase_body'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_product_master_purchase(obj_name,obj_id)
		{
            var container=document.getElementById('object_product_master_purchase_body');
            container.innerHTML="";

            var paginator=$('#object_product_master_purchase_body').paginator({
                            page_size:5,
                            func:"initialize_object_product_master_purchase('"+obj_name+"','"+obj_id+"');"});

            var columns={data_store:'supplier_bill_items',
                         count:paginator.page_size(),
                         start_index:paginator.get_index(),
                         indexes:[{index:'id'},
                                {index:'product_name',exact:obj_name},
                                 {index:'quantity'},
                                 {index:'unit_price'},
                                 {index:'amount'},
                                 {index:'bill_id'},
                                 {index:'last_updated'}]};

            read_json_rows('',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<td data-th='Supplier' id='object_product_master_purchase_"+result.id+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Date'>";
                            rowsHTML+=get_my_past_date(result.last_updated);
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Quantity'>";
                            rowsHTML+=result.quantity;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Rate'>";
                            rowsHTML+=result.unit_price;
                        rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
                            rowsHTML+=result.amount;
                        rowsHTML+="</td>";
                    rowsHTML+="</tr>";
                    $('#object_product_master_purchase_body').append(rowsHTML);
                    var supplier_data={data_store:'supplier_bills',return_column:'supplier',count:1,
                                       indexes:[{index:'id',exact:result.bill_id}]};
                    read_json_single_column(supplier_data,function(suppliers)
                    {
                        if(suppliers.length>0)
                        {
                            $('#object_product_master_purchase_'+result.id).html(suppliers[0]);
                        }
                    });
                });
                paginator.update_index(results.length);
            });
		}

	</script>
</div>
