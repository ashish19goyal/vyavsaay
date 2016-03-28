<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<tbody id='object_suppliers_attributes'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_suppliers_attributes(obj_name,obj_id)
		{
            var container=document.getElementById('object_suppliers_attributes');
            container.innerHTML="";        
			var attribute_data={data_store:'attributes',
                           indexes:[{index:'id'},{index:'attribute'},{index:'value'},{index:'type',exact:'supplier'},{index:'name',value:obj_name}]};
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
		}        
	</script>
</div>