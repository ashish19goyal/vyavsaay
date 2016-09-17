<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<tr>
				<th>Item</th>
				<th>Quantity</th>
			</tr>
			<tbody id='object_product_master_raw_materials'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_product_master_raw_materials(obj_name,obj_id)
		{
            var container=document.getElementById('object_product_master_raw_materials');
            container.innerHTML="";
			var items_column={data_store:'pre_requisites',
							 indexes:[{index:'id'},
									 {index:'type',exact:'product'},
									 {index:'requisite_type',exact:'product'},
									 {index:'requisite_name'},
									 {index:'quantity'},
									 {index:'name',exact:obj_name}]};

            read_json_rows('',items_column,function(results)
            {
                results.forEach(function(result)
				{
					var rowsHTML="<tr>";
                        rowsHTML+="<td data-th='Item'><b>";
                            rowsHTML+=result.requisite_name;
                        rowsHTML+="</b></td>";
                        rowsHTML+="<td data-th='Quantity'>";
                            rowsHTML+=result.quantity;
                        rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$(container).append(rowsHTML);
				});
            });
		}
	</script>
</div>
