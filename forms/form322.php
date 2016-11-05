<div id='form322' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form322_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form322_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form322_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='form322_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form322_header'></form>
						<th><input type='text' placeholder="Manifest #" class='floatlabel' name='manifest' form='form322_header'></th>
						<th><input type='text' placeholder="Type" class='floatlabel' name='type' form='form322_header'></th>
						<th><input type='text' placeholder="Size" readonly='readonly' form='form322_header'></th>
						<th><input type='text' placeholder="Details" readonly='readonly' form='form322_header'></th>
						<th><input type='text' placeholder="Date" class='floatlabel' name='date' form='form322_header'></th>
						<th><input type='submit' form='form322_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form322_body'>
			</tbody>
		</table>
	</div>

    <script>

        function form322_header_ini()
        {
            var filter_fields=document.getElementById('form322_header');
            var manifest_filter=filter_fields.elements['manifest'];
            var type_filter=filter_fields.elements['type'];
            var date_filter=filter_fields.elements['date'];

            var manifest_data={data_store:'manifests',return_column:'manifest_num'};

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form322_ini();
            });

            set_my_filter_json(manifest_data,manifest_filter);
            set_static_filter_json('manifests','type',type_filter);
            $(date_filter).datepicker();
        };

        function form322_ini()
        {
            show_loader();
            var fid=$("#form322_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form322_body').html("");

            var filter_fields=document.getElementById('form322_header');
            var fmanifest=filter_fields.elements['manifest'].value;
            var ftype=filter_fields.elements['type'].value;
            var fdate=get_raw_time(filter_fields.elements['date'].value);

            var paginator=$('#form322_body').paginator();

            var new_columns={count:paginator.page_size(),
                            start_index:paginator.get_index(),
                            access:'yes',
							data_store:'manifests',
                            indexes:[{index:'id',value:fid},
                                    {index:'manifest_num',value:fmanifest},
                                    {index:'type',value:ftype},
                                    {index:'seal_num'},
                                    {index:'lbh'},
                                    {index:'weight'},
                                    {index:'coloader'},
                                    {index:'vendor'},
                                    {index:'date',value:fdate}]};

            read_json_rows('form322',new_columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form322_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Manifest #'>";
                                rowsHTML+="<a onclick=\"element_display('"+result.id+"','form321');\"><input type='text' readonly='readonly' form='form322_"+result.id+"' value='"+result.manifest_num+"'>";
                            rowsHTML+="</td></a>";
                            rowsHTML+="<td data-th='Type'>";
                                rowsHTML+="<input type='text' placeholder='Type' class='floatlabel' readonly='readonly' form='form322_"+result.id+"' value='"+result.type+"'>";
                                rowsHTML+="<input type='text' placeholder='Seal #' class='floatlabel' readonly='readonly' form='form322_"+result.id+"' value='"+result.seal_num+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Size'>";
                                rowsHTML+="<input type='text' placeholder='LBH' class='floatlabel' readonly='readonly' form='form322_"+result.id+"' value='"+result.lbh+"'>";
                                rowsHTML+="<input type='text' placeholder='Weight' class='floatlabel' readonly='readonly' form='form322_"+result.id+"' value='"+result.weight+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Details'>";
                                rowsHTML+="<input type='text' placeholder='Co-loader' class='floatlabel' readonly='readonly' form='form322_"+result.id+"' value='"+result.coloader+"'>";
                                rowsHTML+="<input type='text' placeholder='Vendor' class='floatlabel' readonly='readonly' form='form322_"+result.id+"' value='"+result.vendor+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Date'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form322_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form322_"+result.id+"' value='"+result.id+"' name='id'>";
                                rowsHTML+="<button type='button' class='btn red' form='form322_"+result.id+"' title='Delete' onclick='form322_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form322_body').append(rowsHTML);
                });

                $('#form322').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:new_columns,file:'Manifests',report_id:'form322',feach:function (item)
				{
                    item.date=get_my_past_date(item.date);
                }});
				hide_loader();
            });
        };

        function form322_delete_item(button)
        {
            if(is_delete_access('form322'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var manifest_num=form.elements[0].value;
                    var data_id=form.elements[8].value;
                    var data_json={data_store:'manifests',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Manifest # "+manifest_num,link_to:"form322"}};

                    delete_json(data_json);

                    var manifest_items_json={data_store:'logistics_orders',return_column:'id',
                                            indexes:[{index:'manifest_num',exact:manifest_num}]};

                    read_json_single_column(manifest_items_json,function(manifest_items)
                    {
                        var data_json={data_store:'logistics_orders',
                                loader:'no',
                                data:[]};

                        var last_updated=get_my_time();

                        manifest_items.forEach(function(manifest_item)
                        {
                            var data_json_array=[{index:'id',value:manifest_item},
                                    {index:'manifest_num',value:''},
                                    {index:'man_id',value:''},
                                    {index:'last_updated',value:last_updated}];

                            data_json.data.push(data_json_array);
                        });

                        update_batch_json(data_json);
                    });

                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

    </script>
</div>
