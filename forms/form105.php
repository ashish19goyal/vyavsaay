<div id='form105' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form105_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form105_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form105_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form105_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form105_header'></form>
                    <th><input type='text' placeholder="Table" class='floatlabel' name='tablename' form='form105_header'></th>
                    <th><input type='text' placeholder="User Type" class='floatlabel' name='type' form='form105_header'></th>
                    <th><input type='text' placeholder="User" class='floatlabel' name='user' form='form105_header'></th>
                    <th><input type='text' placeholder="Criteria" readonly="readonly" form='form105_header'></th>
                    <th><input type='submit' form='form105_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form105_body'>
			</tbody>
		</table>
	</div>

    <script>
        function form105_header_ini()
        {
            var fields=document.getElementById('form105_header');
            var table=fields.elements['tablename'];
            var type=fields.elements['type'];

            $(fields).off('submit');
            $(fields).on('submit',function(event)
            {
                event.preventDefault();
                form105_ini();
            });

            var tables_data={data_store:'access_conditions',return_column:'tablename'};
            set_my_filter_json(tables_data,table);
            set_filter_json(['user','role','field'],type);
        }

        function form105_ini()
        {
            show_loader();
            var fid=$("#form105_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form105_body').html("");

            var fields=document.getElementById('form105_header');
            var ftablename=fields.elements['tablename'].value;
            var ftype=fields.elements['type'].value;
            var fuser=fields.elements['user'].value;

            var paginator=$('#form105_body').paginator();

			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='access_conditions';

					columns.indexes=[{index:'id',value:fid},
									{index:'tablename',value:ftablename},
									{index:'user_type',value:ftype},
									{index:'user',value:fuser},
									{index:'criteria_field'},
                                    {index:'criteria_value'}];

            read_json_rows('form105',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form105_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Table'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form105_"+result.id+"' value='"+result.tablename+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='User Type'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form105_"+result.id+"' value='"+result.user_type+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='User'>";
                                rowsHTML+="<textarea readonly='readonly' form='form105_"+result.id+"'>"+result.user+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Criteria'>";
                                rowsHTML+="<input type='text' class='floatlabel' placeholder='Field' readonly='readonly' form='form105_"+result.id+"' value='"+result.criteria_field+"'>";
                                rowsHTML+="<textarea class='floatlabel' placeholder='Value' readonly='readonly' form='form105_"+result.id+"'>"+result.criteria_value+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form105_"+result.id+"' value='"+result.id+"'>";
                                rowsHTML+="<button type='button' class='btn red' name='delete' form='form105_"+result.id+"' title='Delete' onclick='form105_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form105_body').append(rowsHTML);
                });

				$('#form105').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:columns,file:'Data Access Rules',report_id:'form105'});
                hide_loader();
            });
        };

        function form105_add_item()
        {
            if(is_create_access('form105'))
            {
                var id=vUtil.newKey();
                var rowsHTML="<tr>";
                    rowsHTML+="<form id='form105_"+id+"'></form>";
                        rowsHTML+="<td data-th='Table'>";
                            rowsHTML+="<input type='text' form='form105_"+id+"' required>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='User Type'>";
                            rowsHTML+="<input type='text' form='form105_"+id+"' required>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='User'>";
                            rowsHTML+="<input type='text' form='form105_"+id+"' required>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Criteria'>";
                            rowsHTML+="<input type='text' class='floatlabel' placeholder='Field' form='form105_"+id+"'>";
                            rowsHTML+="<textarea class='floatlabel' placeholder='Value' form='form105_"+id+"'></textarea>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' form='form105_"+id+"' value='"+id+"'>";
                            rowsHTML+="<button type='submit' class='btn green' name='save' form='form105_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
                            rowsHTML+="<button type='button' class='btn red' name='delete' form='form105_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
                        rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form105_body').prepend(rowsHTML);

                var fields=document.getElementById("form105_"+id);
                var table_filter=fields.elements[0];
                var type_filter=fields.elements[1];
                var user_filter=fields.elements[2];
                var field_filter=fields.elements[3];

                var tables_data={data_store:'access_conditions',return_column:'tablename'};
                set_my_filter_json(tables_data,table_filter,function()
                {
                    $(table_filter).focus();
                });
                set_value_list_json(['user','role','field'],type_filter);

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form105_create_item(fields);
                });

                $(type_filter).off('blur');
                $(type_filter).on('blur',function()
                {
                    var user_data={};
                    if(type_filter.value=='user')
                    {
                        user_data={data_store:'accounts',return_column:'acc_name'};
                    }
                    else if(type_filter.value=='field')
                    {
                        user_data={data_store:'user_fields_list',return_column:'field_name',
                                        indexes:[{index:'tablename',exact:table_filter.value}]};
                    }
                    else if(type_filter.value=='role')
                    {
                        user_data={data_store:'roles',return_column:'role_name'};
                    }
                    set_my_value_list_json(user_data,user_filter);
                });

                var field_data={data_store:'access_conditions',return_column:'criteria_field'};
                set_my_filter_json(field_data,field_filter);
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form105_create_item(form)
        {
            if(is_create_access('form105'))
            {
                var tablename=form.elements[0].value;
                var user_type=form.elements[1].value;
                var user=form.elements[2].value;
                var criteria_field=form.elements[3].value;
                var criteria_value=form.elements[4].value;
                var data_id=form.elements[5].value;
                var del_button=form.elements['delete'];

                var last_updated=get_my_time();
                var data_json={data_store:'access_conditions',
                                data:[{index:'id',value:data_id},
                                     {index:'tablename',value:tablename},
                                      {index:'user_type',value:user_type},
                                      {index:'user',value:user},
                                      {index:'criteria_field',value:criteria_field},
                                      {index:'criteria_value',value:criteria_value},
                                      {index:'last_updated',value:last_updated}]};
                create_json(data_json);
                $(form).readonly();

                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form105_delete_item(del_button);
                });

                $(form).off('submit');
                $(form).on('submit',function(event)
                {
                    event.preventDefault();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form105_delete_item(button)
        {
            if(is_delete_access('form105'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var data_id=form.elements[5].value;
                    var data_json={data_store:'access_conditions',
                                data:[{index:'id',value:data_id}]};
                    delete_json(data_json);
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
