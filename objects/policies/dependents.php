<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead><tr>
				<td>Name</td>
				<td>Relation</td>
				<td>Date of Birth</td>
			</tr></thead>
			<tbody id='object_policies_dependents'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_policies_dependents(obj_name,obj_id)
		{
            var container=document.getElementById('object_policies_dependents');
            container.innerHTML="";

            var add_index={index:'policy_num',exact:obj_name};
			if(vUtil.isBlank(obj_name))
			{
				add_index={index:'id',exact:obj_id};
			}

			var attribute_data={data_store:'policies',return_column:'dependents',count:1,
                           indexes:[{index:'policy_num'},add_index]};
            read_json_single_column(attribute_data,function(results)
            {
				if(results.length>0)
				{
					var dependents = vUtil.jsonParse(results[0]);
					dependents.forEach(function(attachment)
					{
						var rowsHTML="<tr>";
	                        rowsHTML+="<td data-th='Name'>";
	                            rowsHTML+=attachment.name;
	                        rowsHTML+="</td>";
							rowsHTML+="<td data-th='Relation'>";
	                            rowsHTML+=attachment.relation;
	                        rowsHTML+="</td>";
							rowsHTML+="<td data-th='Date of Birth'>";
	                            rowsHTML+=vTime.date({time:attachment.date});
	                        rowsHTML+="</td>";
						rowsHTML+="</tr>";

						$(container).append(rowsHTML);
					});
				}
            });
		}
	</script>
</div>
