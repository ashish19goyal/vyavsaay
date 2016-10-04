<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead><tr>
				<td>Type</td>
				<td>Amount</td>
				<td>Status</td>
			</tr></thead>
			<tbody id='object_policies_commissions'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_policies_commissions(obj_name,obj_id)
		{
            var container=document.getElementById('object_policies_commissions');
            container.innerHTML="";
			var attribute_data={data_store:'policy_commissions',
                           indexes:[{index:'amount'},
									{index:'commission_type'},
									{index:'status'},
							   		{index:'policy_num',exact:obj_name}]};
            read_json_rows('',attribute_data,function(results)
            {
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
                        rowsHTML+="<td data-th='Type'>";
                            rowsHTML+=result.commission_type;
                        rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
                            rowsHTML+="Rs. "+result.amount;
                        rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
                            rowsHTML+=result.status;
                        rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$(container).append(rowsHTML);
				});
			});
		}
	</script>
</div>
