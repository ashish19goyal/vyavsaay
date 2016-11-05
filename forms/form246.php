<div id='form246' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form246_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form246_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form246_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form246_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form246_upload' onclick=modal23_action(form246_import_template,form246_import,form246_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form246_header'></form>
						<th><input type='text' placeholder="Zone" class='floatlabel' name='zone' form='form246_header'></th>
						<th><input type='text' placeholder="Description" class='floatlabel' name='desc' form='form246_header'></th>
						<th><input type='submit' form='form246_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form246_body'>
			</tbody>
		</table>
	</div>

    <script>
    function form246_header_ini()
    {
        var filter_fields=document.getElementById('form246_header');
        var zone_filter=filter_fields.elements['zone'];

        var zone_data={data_store:'transfer_zones',return_column:'name'};
        set_my_filter_json(zone_data,zone_filter);

        $(filter_fields).off('submit');
        $(filter_fields).on('submit',function(event)
        {
            event.preventDefault();
            form246_ini();
        });
    };

    function form246_ini()
    {
        show_loader();
        var fid=$("#form246_link").attr('data_id');
        if(fid==null)
            fid="";

        $('#form246_body').html("");

        var filter_fields=document.getElementById('form246_header');
        var fzone=filter_fields.elements['zone'].value;
        var fdesc=filter_fields.elements['desc'].value;

        var paginator=$('#form246_body').paginator();

		var new_columns={count:paginator.page_size(),
                         start_index:paginator.get_index(),
                         data_store:'transfer_zones',
                         indexes:[{index:'id',value:fid},
                                {index:'name',value:fzone},
                                {index:'description',value:fdesc}]};

        read_json_rows('form246',new_columns,function(results)
        {
            results.forEach(function(result)
            {
                var rowsHTML="";
                rowsHTML+="<tr>";
                    rowsHTML+="<form id='form246_"+result.id+"'></form>";
                        rowsHTML+="<td data-th='Zone'>";
                            rowsHTML+="<input type='text' readonly='readonly' form='form246_"+result.id+"' value='"+result.name+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Description'>";
                            rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form246_"+result.id+"'>"+result.description+"</textarea>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' form='form246_"+result.id+"' value='"+result.id+"'>";
                            rowsHTML+="<button type='submit' form='form246_"+result.id+"' title='Save' class='btn green' name='save'><i class='fa fa-save'></i></button>";
                            rowsHTML+="<button type='button' form='form246_"+result.id+"' title='Delete' class='btn red' onclick='form246_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
                        rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form246_body').append(rowsHTML);
                var fields=document.getElementById('form246_'+result.id);

                $(fields).on('submit',function (e)
                {
                    e.preventDefault();
                    form246_update_item(fields);
                });
            });

            $('#form246').formcontrol();
            paginator.update_index(results.length);
			vExport.export_buttons({action:'dynamic',columns:new_columns,file:'Transfer Zones',report_id:'form246'});
            hide_loader();
        });
    };

    function form246_add_item()
    {
        if(is_create_access('form246'))
        {
            var id=vUtil.newKey();
            var rowsHTML="<tr>";
            rowsHTML+="<form id='form246_"+id+"'></form>";
                rowsHTML+="<td data-th='Zone'>";
                    rowsHTML+="<input type='text' required form='form246_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Description'>";
                    rowsHTML+="<textarea form='form246_"+id+"' class='dblclick_editable'></textarea>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Action'>";
                    rowsHTML+="<input type='hidden' form='form246_"+id+"' value='"+id+"'>";
                    rowsHTML+="<button type='submit' class='btn green' form='form246_"+id+"' id='save_form246_"+id+"'><i class='fa fa-save' name='save'></i></button>";
                    rowsHTML+="<button type='button' class='btn red' form='form246_"+id+"' id='delete_form246_"+id+"' onclick='$(this).parent().parent().remove();' name='delete'><i class='fa fa-trash'></i></button>";
                rowsHTML+="</td>";
            rowsHTML+="</tr>";

            $('#form246_body').prepend(rowsHTML);

            var item_form=document.getElementById('form246_'+id);
            var zone_filter=item_form.elements[0];

            $(item_form).on("submit", function(event)
            {
                event.preventDefault();
                form246_create_item(item_form);
            });

            $(zone_filter).focus();

            $('#form246').formcontrol();
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form246_create_item(form)
    {
        if(is_create_access('form246'))
        {
            var zone=form.elements[0].value;
            var description=form.elements[1].value;
            var data_id=form.elements[2].value;
            var save_button=form.elements['save'];
            var del_button=form.elements['delete'];
            var last_updated=get_my_time();

            var data_json={data_store:'transfer_zones',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:zone,unique:'yes'},
	 					{index:'description',value:description},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Transfer zone '+zone,link_to:'form246'}};

            create_json(data_json);

            $(form).readonly();
            del_button.removeAttribute("onclick");
            $(del_button).on('click',function(event)
            {
                form246_delete_item(del_button);
            });

            $(form).off('submit');
            $(form).on('submit',function (e)
            {
                e.preventDefault();
                form246_update_item(form);
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form246_update_item(form)
    {
        if(is_update_access('form246'))
        {
            var zone=form.elements[0].value;
            var description=form.elements[1].value;
            var data_id=form.elements[2].value;

            var last_updated=get_my_time();

            var data_json={data_store:'transfer_zones',
	 				data:[{index:'id',value:data_id},
	 					{index:'description',value:description},
	 					{index:'last_updated',value:last_updated}]};

            update_json(data_json);

            $(form).readonly();
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form246_delete_item(button)
    {
        if(is_delete_access('form246'))
        {
            modal115_action(function()
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var zone=form.elements[0].value;
                var data_id=form.elements[2].value;

                var zone_json={data_store:'transfer_zones',
	 				data:[{index:'id',value:data_id}],
                    log:'yes',
                    log_data:{title:'Deleted',notes:'Transfer zone '+zone,link_to:'form246'}};

                delete_json(zone_json);

                var pincodes_xml={data_store:'pincodes',return_column:'id',
                                 indexes:[{index:'zone',exact:zone}]};
                read_json_single_column(pincodes_xml,function(pin_ids)
                {
                    var data_json={data_store:'pincodes',
                    data:[]};

                    var counter=1;
                    var last_updated=get_my_time();

                    pin_ids.forEach(function(row)
                    {
                        var data_json_array=[{index:'id',value:row},
                                {index:'zone',value:''},
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

    function form246_import_template()
    {
        var data_array=['id','name','description'];
        vUtil.arrayToCSV(data_array);
    };

    function form246_import_validate(data_array)
    {
        var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.,()!@#$%^&* -]+$')}];

        var error_array=vImport.validate(data_array,validate_template_array);
        return error_array;
    }

    function form246_import(data_array,import_type)
    {
        var data_json={data_store:'transfer_zones',
                    log:'yes',
                    data:[],
                    log_data:{title:'Transfer Zones',link_to:'form246'}};

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
                    {index:'name',value:row.name},
                    {index:'description',value:row.description},
                    {index:'last_updated',value:last_updated}];

            data_json.data.push(data_json_array);
        });

        if(import_type=='create_new')
        {
            if(is_create_access('form246'))
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
            if(is_update_access('form246'))
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
