<div id='form337' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form337_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form337_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form337_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='form337_email'><i class='fa fa-envelope'></i> Email</a>
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
					<form id='form337_header'></form>
						<th><input type='text' placeholder="Pass #" class='floatlabel' name='pass' form='form337_header'></th>
						<th><input type='text' placeholder="Type" class='floatlabel' name='type' form='form337_header'></th>
						<th><input type='text' placeholder="Co-loader" class='floatlabel' name='loader' form='form337_header'></th>
						<th><input type='text' placeholder="Vendor" class='floatlabel' name='vendor' form='form337_header'></th>
						<th><input type='text' placeholder="Date" class='floatlabel' name='date' form='form337_header'></th>
						<th><input type='submit' form='form337_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form337_body'>
			</tbody>
		</table>
	</div>
    
    <script>
    
        function form337_header_ini()
        {
            var filter_fields=document.getElementById('form337_header');
            var pass_filter=filter_fields.elements['pass'];
            var type_filter=filter_fields.elements['type'];
            var loader_filter=filter_fields.elements['loader'];
            var vendor_filter=filter_fields.elements['vendor'];
            var date_filter=filter_fields.elements['date'];
            
            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form337_ini();
            });

            var pass_data={data_store:'gate_pass',return_column:'pass_num'};
            set_my_filter_json(pass_data,pass_filter);
            set_static_filter_json('gate_pass','type',type_filter);
            $(date_filter).datepicker();
        };

        function form337_ini()
        {
            show_loader();
            var fid=$("#form337_link").attr('data_id');
            if(fid==null)
                fid="";	

            $('#form337_body').html("");

            var filter_fields=document.getElementById('form337_header');
            var fpass=filter_fields.elements['pass'].value;
            var ftype=filter_fields.elements['type'].value;
            var floader=filter_fields.elements['loader'].value;
            var fvendor=filter_fields.elements['vendor'].value;
            var fdate=get_raw_time(filter_fields.elements['date'].value);
            
            var paginator=$('#form337_body').paginator();
			
            var new_columns={count:paginator.page_size(),
                            start_index:paginator.get_index(),
                            data_store:'gate_pass',
                            indexes:[{index:'id',value:fid},
                                    {index:'pass_num',value:fpass},
                                    {index:'type',value:ftype},
                                    {index:'coloader',value:floader},
                                    {index:'vendor',value:fvendor},
                                    {index:'date',value:fdate}]};

            read_json_rows('form337',new_columns,function(results)
            {			
                results.forEach(function(result)
                {
                    var form_id='form336';
                    if(result.type=='bag')
                    {
                        form_id='form344';
                    }
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form337_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Pass #'>";
                                rowsHTML+="<a onclick=\"element_display('"+result.id+"','"+form_id+"');\"><input type='text' readonly='readonly' form='form337_"+result.id+"' value='"+result.pass_num+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Type'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form337_"+result.id+"' value='"+result.type+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Co-loader'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form337_"+result.id+"' value='"+result.coloader+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Vendor'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form337_"+result.id+"' value='"+result.vendor+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Date'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form337_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form337_"+result.id+"' value='"+result.id+"' name='id'>";
                                rowsHTML+="<button type='button' class='btn red' form='form337_"+result.id+"' title='Delete' name='delete' onclick='form337_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";			
                    rowsHTML+="</tr>";

                    $('#form337_body').append(rowsHTML);
                });

                $('#form337').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Gate passes','form337',function (item)
                {
                    item.date=get_my_past_date(item.date);
                });
				hide_loader();
            });
        };

        function form337_delete_item(button)
        {
            if(is_delete_access('form337'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var pass_num=form.elements[0].value;
                    var data_id=form.elements[5].value;
                    var data_json={data_store:'gate_pass',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Gate pass # "+pass_num,link_to:"form337"}};
                    delete_json(data_json);
                    
                    var pass_items_json={data_store:'logistics_orders',return_column:'id',
                                       indexes:[{index:'status',exact:'in-transit'},
                                               {index:'pass_num',exact:pass_num}]};
                    read_json_single_column(pass_items_json,function(pass_items)
                    {
                        var data_json={data_store:'logistics_orders',
                                loader:'no',
                                data:[]};
                        var last_updated=get_my_time();

                        pass_items.forEach(function(pass_item)
                        {
                            var data_json_array=[{index:'id',value:pass_item},
                                    {index:'pass_num',value:''},
                                    {index:'pass_id',value:''},
                                    {index:'last_updated',value:last_updated}];

                            data_json.data.push(data_json_array);
                        });
                        update_batch_json(data_json);                        
                    });

                    var manifests_items_json={data_store:'manifests',return_column:'id',
                                       indexes:[{index:'pass_num',exact:pass_num}]};
                    read_json_single_column(manifests_items_json,function(pass_items)
                    {
                        var data_json={data_store:'manifests',
                                loader:'no',
                                data:[]};
                        var last_updated=get_my_time();

                        pass_items.forEach(function(pass_item)
                        {
                            var data_json_array=[{index:'id',value:pass_item},
                                    {index:'pass_num',value:''},
                                    {index:'pass_id',value:''},
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