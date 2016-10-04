<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<tbody id='object_customers_attributes'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_customers_attributes(obj_name,obj_id)
		{
            var container=document.getElementById('object_customers_attributes');
            container.innerHTML="";
			var attribute_data={data_store:'attributes',
                           indexes:[{index:'id'},{index:'attribute'},{index:'value'},{index:'type',exact:'customer'},{index:'name',exact:obj_name}]};
            read_json_rows('',attribute_data,function(results)
            {
                results.forEach(function(result)
				{
					var rowsHTML="<tr>";
                        rowsHTML+="<td data-th='Attribute'><b>";
                            rowsHTML+=result.attribute;
                        rowsHTML+="</b></td>";
                        rowsHTML+="<td data-th='Value'>";
                            rowsHTML+=result.value;
                        rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$(container).append(rowsHTML);
				});
            });

            var customer_data={data_store:'customers',
                           indexes:[{index:'phone'},{index:'address'},{index:'email'},{index:'acc_name',exact:obj_name}]};
            read_json_rows('',customer_data,function(results)
            {
                results.forEach(function(result)
				{
					var rowsHTML="<tr>";
                        rowsHTML+="<td data-th='Attribute'><b>";
                            rowsHTML+='Phone';
                        rowsHTML+="</b></td>";
                        rowsHTML+="<td data-th='Value'>";
                            rowsHTML+=result.phone;
                        rowsHTML+="</td>";
					rowsHTML+="</tr>";
                    rowsHTML+="<tr>";
                        rowsHTML+="<td data-th='Attribute'><b>";
                            rowsHTML+='Email';
                        rowsHTML+="</b></td>";
                        rowsHTML+="<td data-th='Value'>";
                            rowsHTML+=result.email;
                        rowsHTML+="</td>";
					rowsHTML+="</tr>";
                    rowsHTML+="<tr>";
                        rowsHTML+="<td data-th='Attribute'><b>";
                            rowsHTML+='Address';
                        rowsHTML+="</b></td>";
                        rowsHTML+="<td data-th='Value'>";
                            rowsHTML+=result.address;
                        rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$(container).append(rowsHTML);
				});
            });
		}
	</script>
</div>
