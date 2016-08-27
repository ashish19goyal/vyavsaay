<div id='form247' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form247_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form247_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form247_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form247_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form247_upload' onclick=modal23_action(form247_import_template,form247_import,form247_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form247_header'></form>
						<th><input type='text' placeholder="Pincode" class='floatlabel' name='pincode' form='form247_header'></th>
						<th><input type='text' placeholder="Zone" class='floatlabel' name='zone' form='form247_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form247_header'></th>
						<th><input type='submit' form='form247_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form247_body'>
			</tbody>
		</table>
	</div>

    <script>
    
    function form247_header_ini()
    {
        var filter_fields=document.getElementById('form247_header');
        var code_filter=filter_fields.elements['pincode'];
        var zone_filter=filter_fields.elements['zone'];
        var status_filter=filter_fields.elements['status'];

        var code_data={data_store:'pincodes',return_column:'pincode'};
        var zone_data={data_store:'transfer_zones',return_column:'name'};

        $(filter_fields).off('submit');
        $(filter_fields).on('submit',function(event)
        {
            event.preventDefault();
            form247_ini();
        });

        set_my_filter_json(code_data,code_filter);
        set_my_filter_json(zone_data,zone_filter);
        set_static_filter_json('pincodes','status',status_filter);
    };

    function form247_ini()
    {
        show_loader();
        var fid=$("#form247_link").attr('data_id');
        if(fid==null)
            fid="";	

        $('#form247_body').html("");

        var filter_fields=document.getElementById('form247_header');
        var fpincode=filter_fields.elements['pincode'].value;
        var fzone=filter_fields.elements['zone'].value;
        var fstatus=filter_fields.elements['status'].value;

        var paginator=$('#form247_body').paginator();
			
		var new_columns={count:paginator.page_size(),
                         start_index:paginator.get_index(),
                         data_store:'pincodes',
                         indexes:[{index:'id',value:fid},
                                {index:'zone',value:fzone},
                                {index:'status',value:fstatus},
                                {index:'pincode',value:fpincode}]};        
        read_json_rows('form247',new_columns,function(results)
        {
            results.forEach(function(result)
            {
                var rowsHTML="<tr>";
                    rowsHTML+="<form id='form247_"+result.id+"'></form>";
                        rowsHTML+="<td data-th='Pincode'>";
                            rowsHTML+="<input type='text' readonly='readonly' form='form247_"+result.id+"' value='"+result.pincode+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Zone'>";
                            rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form247_"+result.id+"' value='"+result.zone+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Status'>";
                            rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form247_"+result.id+"' value='"+result.status+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' form='form247_"+result.id+"' value='"+result.id+"'>";
                            rowsHTML+="<button type='submit' form='form247_"+result.id+"' title='Save' class='btn green'><i class='fa fa-save' name='save'></i></button>";
                            rowsHTML+="<button type='button' form='form247_"+result.id+"' title='Delete' class='btn red' onclick='form247_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
                        rowsHTML+="</td>";				
                rowsHTML+="</tr>";

                $('#form247_body').append(rowsHTML);
                var fields=document.getElementById('form247_'+result.id);
                var zone_filter=fields.elements[1];
                var status_filter=fields.elements[2];
                var save_button=fields.elements['save'];

                var zone_data={data_store:'transfer_zones',return_column:'name'};
                set_my_value_list_json(zone_data,zone_filter);
                set_static_value_list_json('pincodes','status',status_filter);

                $(fields).on('submit',function (e) 
                {
                    e.preventDefault();
                    form247_update_item(fields);
                });
            });

            $('#form247').formcontrol();
            paginator.update_index(results.length);
            initialize_tabular_report_buttons(new_columns,'Pincodes','form247');
            hide_loader();
        });
    };

    function form247_add_item()
    {
        if(is_create_access('form247'))
        {
            var id=vUtil.newKey();
            var rowsHTML="<tr>";
            rowsHTML+="<form id='form247_"+id+"'></form>";
                rowsHTML+="<td data-th='Pincode'>";
                    rowsHTML+="<input type='text' required form='form247_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Zone'>";
                    rowsHTML+="<input type='text' class='dblclick_editable' form='form247_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Status'>";
                    rowsHTML+="<input type='text' form='form247_"+id+"' class='dblclick_editable' required value='active'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Action'>";
                    rowsHTML+="<input type='hidden' form='form247_"+id+"' value='"+id+"'>";
                    rowsHTML+="<button type='submit' class='btn green' form='form247_"+id+"' name='save' id='save_form247_"+id+"'><i class='fa fa-save'></i></button>";
                    rowsHTML+="<button type='button' class='btn red' form='form247_"+id+"' id='delete_form247_"+id+"' onclick='$(this).parent().parent().remove();' name='delete'><i class='fa fa-trash'></i></button>";
                rowsHTML+="</td>";			
            rowsHTML+="</tr>";

            $('#form247_body').prepend(rowsHTML);

            var item_form=document.getElementById('form247_'+id);
            var code_filter=item_form.elements[0];
            var zone_filter=item_form.elements[1];
            var status_filter=item_form.elements[2];

            $(item_form).on("submit", function(event)
            {
                event.preventDefault();
                form247_create_item(item_form);
            });

            $(code_filter).focus();

            var zone_data={data_store:'transfer_zones',return_column:'name'};
            set_my_value_list_json(zone_data,zone_filter);
            set_static_value_list_json('pincodes','status',status_filter);

            $('#form247').formcontrol();
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form247_create_item(form)
    {
        if(is_create_access('form247'))
        {
            var pincode=form.elements[0].value;
            var zone=form.elements[1].value;
            var status=form.elements[2].value;		
            var data_id=form.elements[3].value;
            var save_button=form.elements['save'];
            var del_button=form.elements['delete'];
            var last_updated=get_my_time();
            
            var data_json={data_store:'pincodes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'pincode',value:pincode,unique:'yes'},
	 					{index:'zone',value:zone},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Pincode to '+zone,link_to:'form247'}};
 				
            create_json(data_json);
            $(form).readonly();

            del_button.removeAttribute("onclick");
            $(del_button).on('click',function(event)
            {
                form247_delete_item(del_button);
            });

            $(form).off('submit');
            $(form).on('submit',function (e) 
            {
                e.preventDefault();
                form247_update_item(form);
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form247_update_item(form)
    {
        if(is_update_access('form247'))
        {
            var zone=form.elements[1].value;
            var status=form.elements[2].value;
            var data_id=form.elements[3].value;

            var last_updated=get_my_time();
            
            var data_json={data_store:'pincodes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'zone',value:zone},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Pincode to '+zone,link_to:'form247'}};
 			
            update_json(data_json);

            $(form).readonly();
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form247_delete_item(button)
    {
        if(is_delete_access('form247'))
        {
            modal115_action(function()
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var pincode=form.elements[0].value;
                var data_id=form.elements[3].value;

                var data_json={data_store:'pincodes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id}],
	 				log_data:{title:'Deleted',notes:'Pincode '+pincode,link_to:'form247'}};
 			
                delete_json(data_json);

                $(button).parent().parent().remove();
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form247_import_template()
    {
        var data_array=['id','pincode','zone','status'];
        vUtil.arrayToCSV(data_array);
    };

    function form247_import_validate(data_array)
    {
        var validate_template_array=[{column:'pincode',required:'yes',regex:new RegExp('^[0-9a-zA-Z -]+$')},
                                {column:'zone',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
                                {column:'status',required:'yes',list:['active','inactive']}];

        var error_array=vImport.validate(data_array,validate_template_array);
        return error_array;					
    }

    function form247_import(data_array,import_type)
    {
        var data_json={data_store:'pincodes',
                    log:'yes',
                    data:[],
                    log_data:{title:'Pincodes',link_to:'form247'}};

        var counter=1;
        var last_updated=get_my_time();

        data_array.forEach(function(row)
        {
            counter+=1;
            if(import_type=='create_new')
            {
                row.id=last_updated+counter;
            }

            var data_json_array=[{index:'id',value:row.id},
                    {index:'pincode',value:row.pincode},
                    {index:'zone',value:row.zone},
                    {index:'status',value:row.status},
                    {index:'last_updated',value:last_updated}];

            data_json.data.push(data_json_array);
        });

        if(import_type=='create_new')
        {
            if(is_create_access('form247'))
            {
                create_batch_json(data_json);
            }
            else
            {
                $("#modal2_link").click();
            }
        }
        else
        {
            if(is_update_access('form247'))
            {
                update_batch_json(data_json);
            }
            else
            {
                $("#modal2_link").click();
            }
        }
    };

    </script>
</div>