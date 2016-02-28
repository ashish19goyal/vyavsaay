<div id='form147' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form147_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form147_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form147_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form147_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form147_header'></form>
						<th><input type='text' placeholder="Role" class='floatlabel' name='role' form='form147_header'></th>
						<th><input type='text' placeholder="Description" class='floatlabel' name='desc' form='form147_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form147_header'></th>
						<th><input type='submit' form='form147_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form147_body'>
			</tbody>
		</table>
	</div>
    
    <script>
    
        function form147_header_ini()
        {
            var filter_fields=document.getElementById('form147_header');
            var role_filter=filter_fields.elements['role'];
            var status_filter=filter_fields.elements['status'];

            var role_data={data_store:'roles',return_column:'role_name'};
            set_my_filter_json(role_data,role_filter);	
            set_static_filter_json('roles','status',status_filter);

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form147_ini();
            });
        };


        function form147_ini()
        {
            show_loader();
            var fid=$("#form147_link").attr('data_id');
            if(fid==null)
                fid="";	

            $('#form147_body').html("");

            var filter_fields=document.getElementById('form147_header');
            var frole=filter_fields.elements['role'].value;
            var fdesc=filter_fields.elements['desc'].value;
            var fstatus=filter_fields.elements['status'].value;

            var paginator=$('#form147_body').paginator();
			
			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='roles';

					columns.indexes=[{index:'id',value:fid},
									{index:'role_name',value:frole},
									{index:'description',value:fdesc},
									{index:'status',value:fstatus}];
			
            read_json_rows('form147',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form147_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Role'>";
                                rowsHTML+="<textarea readonly='readonly' form='form147_"+result.id+"'>"+result.role_name+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Description'>";
                                rowsHTML+="<textarea readonly='readonly' form='form147_"+result.id+"' class='dblclick_editable'>"+result.description+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Status'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form147_"+result.id+"' class='dblclick_editable' value='"+result.status+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form147_"+result.id+"' value='"+result.id+"'>";
                                rowsHTML+="<button type='submit' class='btn green' name='save' title='Save' form='form147_"+result.id+"'><i class='fa fa-save'></i></button>";
                                rowsHTML+="<button type='button' class='btn red' name='delete' title='Delete' form='form147_"+result.id+"' onclick='form147_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";			
                    rowsHTML+="</tr>";

                    $('#form147_body').append(rowsHTML);

                    var fields=document.getElementById("form147_"+result.id);
                    var status_filter=fields.elements[2];
                    
                    set_static_value_list_json('roles','status',status_filter);
                    $(fields).on("submit",function(event)
                    {
                        event.preventDefault();
                        form147_update_item(fields);
                    });
                });

                $('#form147').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(columns,'User Roles','form147',function (item)
                {
                    delete item.id;
                });
				hide_loader();
            });	
        };

        function form147_add_item()
        {
            if(is_create_access('form147'))
            {
                var id=get_new_key();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form147_"+id+"' autocomplete='off'></form>";
                    rowsHTML+="<td data-th='Role'>";
                        rowsHTML+="<input type='text' form='form147_"+id+"' required>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Description'>";
                        rowsHTML+="<textarea form='form147_"+id+"'></textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Status'>";
                        rowsHTML+="<input type='text' required form='form147_"+id+"' value='active'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form147_"+id+"' value='"+id+"'>";
                        rowsHTML+="<button type='submit' class='btn green' form='form147_"+id+"' title='Save' name='save'><i class='fa fa-save'></i></button>";	
                        rowsHTML+="<button type='button' class='btn red' form='form147_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();' name='delete'><i class='fa fa-trash'></i></button>";
                    rowsHTML+="</td>";			
                rowsHTML+="</tr>";

                $('#form147_body').prepend(rowsHTML);
                var fields=document.getElementById("form147_"+id);
                var role_filter=fields.elements[0];
                var status_filter=fields.elements[2];

                $(role_filter).focus();
                
                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form147_create_item(fields);
                });

                set_static_value_list_json('roles','status',status_filter);
                $('#form147').formcontrol();
				
            }
            else
            {
                $("#modal2_link").click();
            }		
        }

        function form147_create_item(form)
        {
            if(is_create_access('form147'))
            {
                var role=form.elements[0].value;
                var desc=form.elements[1].value;
                var status=form.elements[2].value;		
                var data_id=form.elements[3].value;
                var last_updated=get_my_time();
                
                var data_json={data_store:'roles',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'role_name',value:role,unique:'yes'},
	 					{index:'description',value:desc},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Created',notes:'User role '+role,link_to:'form147'}};
 				
                create_json(data_json);

                $(form).readonly();

                var del_button=form.elements['delete'];
                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form147_delete_item(del_button);
                });

                $(form).off('submit');
                $(form).on('submit',function(event)
                {
                    event.preventDefault();
                    form147_update_item(form);
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form147_update_item(form)
        {
            if(is_update_access('form147'))
            {
                var role=form.elements[0].value;
                var desc=form.elements[1].value;
                var status=form.elements[2].value;
                var data_id=form.elements[3].value;
                var last_updated=get_my_time();
                var data_json={data_store:'roles',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'role_name',value:role,unique:'yes'},
	 					{index:'description',value:desc},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'User role '+role,link_to:'form147'}};
 				
                update_json(data_json);
                	
                $(form).readonly();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form147_delete_item(button)
        {
            if(is_delete_access('form147'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var role=form.elements[0].value;
                    var desc=form.elements[1].value;
                    var status=form.elements[2].value;		
                    var data_id=form.elements[3].value;
                    
                    var data_json={data_store:'roles',
	 				log:'yes',
	 				data:[{index:'id',value:data_id}],
	 				log_data:{title:'Deleted',notes:'User role '+role,link_to:'form147'}};
 				   
                    var mapping_json={data_store:'user_role_mapping',
	 				data:[{index:'role_name',value:role}]};
 				
                    var access_json={data_store:'access_control',
	 				data:[{index:'username',value:role}]};

                    
                    delete_json(data_json);
                    delete_json(mapping_json);
                    delete_json(access_json);
                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form147_import_template()
        {
            var data_array=['id','role_name','description','status'];
            my_array_to_csv(data_array);
        };

        function form147_import_validate(data_array)
        {
            var validate_template_array=[{column:'role_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z_.,()-]+$')},
                                    {column:'description',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
                                    {column:'status',required:'yes',list:['active','inactive']}];

            var error_array=validate_import_array(data_array,validate_template_array);
            return error_array;					
        }

        function form147_import(data_array,import_type)
        {
            var data_json={data_store:'roles',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Access roles',link_to:'form147'}};

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
	 					{index:'role_name',value:row.role_name},
	 					{index:'description',value:row.description},
	 					{index:'status',value:row.status},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
			});
			
			if(import_type=='create_new')
			{
				create_batch_json(data_json);
			}
			else
			{
				update_batch_json(data_json);
			}
        };

    </script>
</div>