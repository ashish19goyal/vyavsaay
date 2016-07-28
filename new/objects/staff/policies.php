<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Policy #</th>
                    <th>Policy Holder</th>
                    <th>Policy Name</th>
                    <th>Issue Date</th>
                    <th>Status</th>
				</tr>
			</thead>
			<tbody id='object_staff_policies'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_staff_policies(obj_name,obj_id)
		{
            var container=document.getElementById('object_staff_policies');
            container.innerHTML="";

            var attribute_data={data_store:'attributes',return_column:'value',
                                indexes:[{index:'id'},
                                        {index:'attribute',exact:'Designation'},
                                        {index:'type',exact:'staff'},
                                        {index:'name',exact:obj_name}]};
            read_json_single_column(attribute_data,function(attributes)
            {
                if(attributes.length>0)
                {
                    var designation = attributes[0];
                    switch (designation) {
                        case 'Agent':var attribute_object = {index:'agent',exact:obj_name};break;
                        case 'Team Lead':var attribute_object = {index:'team_lead',exact:obj_name};break;
                        case 'Sales Manager':var attribute_object = {index:'sales_manager',exact:obj_name};break;
                        case 'Tele-Caller':var attribute_object = {index:'tele_caller',exact:obj_name};break;
                        default:var attribute_object = {index:'team_lead',exact:obj_name};
                    }

                    var paginator=$('#object_staff_policies').paginator({
                                    page_size:5,
                                    func:"initialize_object_staff_policies('"+obj_name+"','"+obj_id+"');"});

        			var policy_data={data_store:'policies',
                                 count:paginator.page_size(),
                                 start_index:paginator.get_index(),
                                 indexes:[{index:'id'},
                                        {index:'application_num'},
                                        {index:'policy_num'},
                                        {index:'policy_name'},
                                        {index:'policy_holder'},
                                        {index:'status'},
                                        attribute_object,
                                        {index:'issue_date'}]};
                    read_json_rows('',policy_data,function(results)
                    {
                        results.forEach(function(result)
        				{
                            if(vUtil.isBlank(result.policy_num))
                            {
                                result.policy_num = result.application_num;
                            }
        					var rowsHTML="<tr>";
                                rowsHTML+="<td data-th='Policy #'><b>";
                                    rowsHTML+=result.policy_num;
                                rowsHTML+="</b></td>";
                                rowsHTML+="<td data-th='Policy Holder'>";
                                    rowsHTML+=result.policy_holder;
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Policy Name'>";
                                    rowsHTML+=result.policy_name;
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Issue Date'>";
                                    rowsHTML+=get_my_past_date(result.issue_date);
                                rowsHTML+="</td>";
                                rowsHTML+="<td data-th='Status'>";
                                    rowsHTML+=result.status;
                                rowsHTML+="</td>";
        					rowsHTML+="</tr>";

        					$(container).append(rowsHTML);
        				});
                        paginator.update_index(results.length);
                    });
                }
            });
		}
	</script>
</div>
