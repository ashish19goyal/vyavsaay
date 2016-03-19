<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Parameter</th>
					<th>Weight</th>
					<th>Score (out of 100)</th>
                </tr>
			</thead>
			<tbody id='object_projects_score_body'>
			</tbody>
            <tfoot id='object_projects_score_foot'>
			</tfoot>
		</table>
    </div>
	<script>
		function initialize_object_projects_score(obj_name,obj_id)
		{
            var container=document.getElementById('object_projects_score_body');
            container.innerHTML="";
            
            var struct_data={data_store:'ques_struct',
										indexes:[{index:'id'},{index:'name',exact:'ques1'}]};
			
            read_json_rows('',struct_data,function(structs)
            {
                if(structs.length>0)
                {
                    var fields_data={data_store:'ques_fields',return_column:'id',
                                    indexes:[{index:'id'},
                                            {index:'ques_id',exact:structs[0].id},
                                            {index:'name'},
                                            {index:'display_name'},
                                            {index:'description'},
                                            {index:'weight'},
                                            {index:'forder'}]};
                    read_json_rows('',fields_data,function (fields) 
                    {
                        fields.sort(function(a,b)
                        {
                            if(parseInt(a.forder)>parseInt(b.forder))
                            {	return 1;}
                            else 
                            {	return -1;}
                        });

                        var fields_id_array=[];
                        fields.forEach(function (field) 
                        {
                            fields_id_array.push(field.id);
                        });
                        
                        var field_value_data={data_store:'ques_fields_data',
                                            indexes:[{index:'ques_id'},{index:'field_value'},       
                                                     {index:'field_id',array:fields_id_array}]};
                        read_json_rows('',field_value_data,function (field_values) 
                        {
                           for(var i=1;i<fields.length;i++)
                           {
                                var total_value=0;
                                var total_count=0;
                                for(var j=0;j<field_values.length;j++)
                                {
                                    if(fields[i].id==field_values[j].field_id)
                                    {
                                        total_value+=parseFloat(field_values[j].field_value);
                                        total_count+=1;
                                    }
                                }
                                fields[i].score=Math.round(total_value/total_count);
                                
                               
                                var rowsHTML="<tr>";
                                    rowsHTML+="<td data-th='Parameter'>";
                                        rowsHTML+=fields[i].display_name;
                                    rowsHTML+="</td>";
                                    rowsHTML+="<td data-th='Weight'>";
                                        rowsHTML+=fields[i].weight;
                                    rowsHTML+="</td>";
                                    rowsHTML+="<td data-th='Score (out of 100)'>";
                                        rowsHTML+=fields[i].score;
                                    rowsHTML+="</td>";
                                rowsHTML+="</tr>";

                                $('#object_projects_score_body').append(rowsHTML);
                            }
                            
                            var total_score=0;
                            var total_weight=0;								
                            
                            fields.forEach(function (total_field)
                            {
                                if(typeof total_field.score!='undefined' && !isNaN(total_field.score))
                                {
                                    total_score+=(parseFloat(total_field.score)*parseFloat(total_field.weight));
                                    total_weight+=parseFloat(total_field.weight);
                                }
                            });
                            var weighted_score=Math.round(total_score/total_weight);
                            var footHTML="<tr><td>Total Score</td><td></td><td>"+weighted_score+"</td></tr>";
                            $('#object_projects_score_foot').html(footHTML);
                        });
                    });
                }
            });
		} 

	</script>
</div>