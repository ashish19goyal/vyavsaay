<div id='report75' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report75_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report75_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='report75_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report75_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report75_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Supplier" class='floatlabel' name='supplier' required></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Parameter</th>
					<th>Weight</th>
					<th>Score (out of 100)</th>
				</tr>
			</thead>
			<tbody id='report75_body'>
			</tbody>
			<tfoot id='report75_foot'>
			</tfoot>
		</table>
	</div>

	<script>
		function report75_header_ini()
		{
			var form=document.getElementById('report75_header');
			var supplier_filter=form.elements['supplier'];

			var supplier_data={data_store:'suppliers',return_column:'acc_name'};
			set_my_value_list_json(supplier_data,supplier_filter);

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				report75_ini();
			});
		}

		function report75_ini()
		{
			show_loader();

			var form=document.getElementById('report75_header');
			var supplier=form.elements['supplier'].value;

			$('#report75_body').html("");
			$('#report75_foot').html("");

			if(supplier!="")
			{
				var struct_data={data_store:'ques_struct',
										indexes:[{index:'id'},{index:'name',exact:'ques2'}]};

				read_json_rows('report75',struct_data,function(structs)
				{
					if(structs.length>0)
					{
						var fields_data={data_store:'ques_fields',
											indexes:[{index:'id'},
														{index:'ques_id',exact:structs[0].id},
														{index:'name'},
														{index:'display_name'},
														{index:'description'},
														{index:'weight'},
														{index:'forder'}]};
						read_json_rows('report75',fields_data,function (fields)
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
                                var ques_match=[];
                                for(var j=0;j<field_values.length;j++)
                                {
                                    if(fields[0].id==field_values[j].field_id && field_values[j].field_value==supplier)
                                    {
                                        ques_match.push(field_values[j].ques_id);
                                    }
                                }

                                fields.forEach(function(field)
                                {
									var total_value=0;
                                    var total_count=0;
                                    var isnumber=true;
                                    for(var j=0;j<field_values.length;j++)
                                    {
                                        if(!isNaN(field_values[j].field_value))
                                        {
                                            if(field.id==field_values[j].field_id && ques_match.indexOf(field_values[j].ques_id)>-1)
                                            {
                                                total_value+=parseFloat(field_values[j].field_value);
                                                total_count+=1;
                                            }
                                        }
                                        else
                                        {
                                            isnumber=false;
                                            break;
                                        }
                                    }

                                    if(isnumber)
                                    {
                                        field.score=Math.round(total_value/total_count);
                                    }
                                    else
                                    {
                                        field.score=supplier;
                                    }
                                    var rowsHTML="<tr>";
                                        rowsHTML+="<td data-th='Parameter'>";
                                            rowsHTML+=field.display_name;
                                        rowsHTML+="</td>";
                                        rowsHTML+="<td data-th='Weight'>";
                                            rowsHTML+=field.weight;
                                        rowsHTML+="</td>";
                                        rowsHTML+="<td data-th='Score (out of 100)'>";
                                            rowsHTML+=field.score;
                                        rowsHTML+="</td>";
                                    rowsHTML+="</tr>";
                                    $('#report75_body').append(rowsHTML);
                                });

                                var total_score=0;
								var total_weight=0;
                                fields.forEach(function (total_field)
                                {
                                    if(!isNaN(parseFloat(total_field.score)))
                                    {
                                        total_score+=(parseFloat(total_field.score)*parseFloat(total_field.weight));
                                        total_weight+=parseFloat(total_field.weight);
                                    }
                                });
                                var weighted_score=Math.round(total_score/total_weight);
                                var footHTML="<tr><td>Total Score</td><td></td><td>"+weighted_score+"</td></tr>";
                                $('#report75_foot').html(footHTML);
                                hide_loader();
						  });
						});
					}
					else
					{
						hide_loader();
					}
				});
				vExport.export_buttons({file:'Supplier Score',report_id:'report75',action:'static'});
			}
		};

	</script>
</div>
