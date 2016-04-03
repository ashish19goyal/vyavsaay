<div id='form261' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form261_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form261_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form261_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form261_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form261_upload' onclick=modal23_action(form261_import_template,form261_import,form261_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form261_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form261_header'></th>
						<th><input type='text' placeholder="Bank" class='floatlabel' name='bank' form='form261_header'></th>
						<th><input type='text' placeholder="Account" readonly='readonly' form='form261_header'></th>
						<th><input type='text' placeholder="Status" class="floatlabel" name='status' form='form261_header'></th>
						<th><input type='submit' form='form261_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form261_body'>
			</tbody>
		</table>
	</div>

    <script>
        function form261_header_ini()
        {
            var filter_fields=document.getElementById('form261_header');	
            var name_filter=filter_fields.elements['name'];
            var bank_filter=filter_fields.elements['bank'];
            var status_filter=filter_fields.elements['status'];

            var name_data={data_store:'bank_accounts',return_column:'name'};
            set_my_filter_json(name_data,name_filter);

            var bank_data={data_store:'bank_accounts',return_column:'bank'};
            set_my_filter_json(bank_data,bank_filter);

            set_static_filter_json('bank_accounts','status',status_filter);	

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form261_ini();
            });	
        }

        function form261_ini()
        {
            show_loader();
            var fid=$("#form261_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form261_body').html("");

            var filter_fields=document.getElementById('form261_header');
            var fname=filter_fields.elements['name'].value;
            var fbank=filter_fields.elements['bank'].value;
            var fstatus=filter_fields.elements['status'].value;

            var paginator=$('#form261_body').paginator();
			
			var new_columns=new Object();
				new_columns.count=paginator.page_size();
				new_columns.start_index=paginator.get_index();
			    new_columns.data_store='bank_accounts';		

                new_columns.indexes=[{index:'id',value:fid},
                                        {index:'name',value:fname},
                                        {index:'bank',value:fbank},
                                        {index:'branch'},
                                        {index:'account_name'},
                                        {index:'account_num'},
                                        {index:'ifsc'},
                                        {index:'status',value:fstatus}];

            read_json_rows('form261',new_columns,function(results)
            {			
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form261_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Name'>";
                                rowsHTML+="<textarea readonly='readonly' form='form261_"+result.id+"'>"+result.name+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Bank'>";
                                rowsHTML+="<input type='text' placeholder='Bank' class='floatlabel dblclick_editable' readonly='readonly' form='form261_"+result.id+"' required value='"+result.bank+"'>";
                                rowsHTML+="<textarea placeholder='Branch' class='floatlabel dblclick_editable' readonly='readonly' form='form261_"+result.id+"'>"+result.branch+"</textarea>";
                                rowsHTML+="<input type='text' placeholder='IFSC' class=' floatlabel dblclick_editable' readonly='readonly' form='form261_"+result.id+"' value='"+result.ifsc+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Account'>";
                                rowsHTML+="<input type='text' placeholder='Name' readonly='readonly' form='form261_"+result.id+"' required class='floatlabel dblclick_editable' value='"+result.account_name+"'>";
                                rowsHTML+="<input type='text' placeholder='Account #' readonly='readonly' form='form261_"+result.id+"' required class='floatlabel dblclick_editable' value='"+result.account_num+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Status'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form261_"+result.id+"' required class='dblclick_editable' value='"+result.status+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form261_"+result.id+"' value='"+result.id+"'>";
                                rowsHTML+="<button type='submit' class='btn green' form='form261_"+result.id+"' name='save' title='Save'><i class='fa fa-save'></i></button>";
                                rowsHTML+="<button type='button' class='btn red' form='form261_"+result.id+"' onclick='form261_delete_item($(this));' title='Delete' name='delete'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";			
                    rowsHTML+="</tr>";

                    $('#form261_body').append(rowsHTML);
                    var fields=document.getElementById("form261_"+result.id);
                    var status_filter=fields.elements[6];

                    set_static_value_list('bank_accounts','status',status_filter);

                    $(fields).on("submit", function(event)
                    {
                        event.preventDefault();
                        form261_update_item(fields);
                    });
                });

                $('#form261').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Bank Accounts','form261',function (item)
                {
                    item['account #']=item.account_num;
                    item['account name']=item.account_name;
                    
                    delete item.account_name;
                    delete item.account_num;
                });
				hide_loader();
            });
        };

        function form261_add_item()
        {
            if(is_create_access('form261'))
            {
                var id=get_new_key();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form261_"+id+"' autocomplete='off'></form>";
                    rowsHTML+="<td data-th='Name'>";
                        rowsHTML+="<input type='text' form='form261_"+id+"' placeholder='Name' required>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Bank'>";
                        rowsHTML+="<input type='text' placeholder='Bank' class='floatlabel dblclick_editable' form='form261_"+id+"' required>";
                        rowsHTML+="<textarea placeholder='Branch' class='floatlabel dblclick_editable' form='form261_"+id+"'></textarea>";
                        rowsHTML+="<input type='text' placeholder='IFSC' class='floatlabel dblclick_editable' form='form261_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Account'>";
                        rowsHTML+="<input type='text' placeholder='Name' form='form261_"+id+"' required class='dblclick_editable floatlabel'>";
                        rowsHTML+="<input type='text' placeholder='Account #' form='form261_"+id+"' required class='dblclick_editable floatlabel'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Status'>";
                        rowsHTML+="<input type='text' placeholder='Status' required form='form261_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form261_"+id+"' value='"+id+"'>";
                        rowsHTML+="<button type='submit' class='btn green' form='form261_"+id+"' name='save' title='Save'><i class='fa fa-save'></i></button>";	
                        rowsHTML+="<button type='button' class='btn red' form='form261_"+id+"' onclick='$(this).parent().parent().remove();' name='delete' title='Delete'><i class='fa fa-trash'></i></button>";	
                    rowsHTML+="</td>";			
                rowsHTML+="</tr>";

                $('#form261_body').prepend(rowsHTML);
                
                var fields=document.getElementById("form261_"+id);
                var status_filter=fields.elements[6];

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form261_create_item(fields);
                });

                set_static_value_list_json('bank_accounts','status',status_filter);
                $('#form261').formcontrol();
            }
            else
            {
                $("#modal2_link").click();
            }		
        }

        function form261_create_item(form)
        {
            if(is_create_access('form261'))
            {
                var name=form.elements[0].value;
                var bank=form.elements[1].value;
                var branch=form.elements[2].value;
                var ifsc=form.elements[3].value;
                var acc_name=form.elements[4].value;
                var acc_num=form.elements[5].value;
                var status=form.elements[6].value;
                var data_id=form.elements[7].value;
                var del_button=form.elements['delete'];

                var last_updated=get_my_time();
                
                var data_json={data_store:'bank_accounts',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'bank',value:bank},
                        {index:'branch',value:branch},
                        {index:'ifsc',value:ifsc},
                        {index:'account_name',value:acc_name},
                        {index:'account_num',value:acc_num},  
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Bank account details for '+name,link_to:'form261'}};
 				
                create_json(data_json);

                $(form).readonly();
                
                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form261_delete_item(del_button);
                });

                $(form).off('submit');
                $(form).on('submit',function(event)
                {
                    event.preventDefault();
                    form261_update_item(form);
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form261_update_item(form)
        {
            if(is_update_access('form261'))
            {
                var name=form.elements[0].value;
                var bank=form.elements[1].value;
                var branch=form.elements[2].value;
                var ifsc=form.elements[3].value;
                var acc_name=form.elements[4].value;
                var acc_num=form.elements[5].value;
                var status=form.elements[6].value;
                var data_id=form.elements[7].value;
                var last_updated=get_my_time();
                
                var data_json={data_store:'bank_accounts',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'bank',value:bank},
                        {index:'branch',value:branch},
                        {index:'ifsc',value:ifsc},
                        {index:'account_name',value:acc_name},
                        {index:'account_num',value:acc_num},  
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Bank account details for '+name,link_to:'form261'}};
 				
                update_json(data_json);

                $(form).readonly();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form261_delete_item(button)
        {
            if(is_delete_access('form261'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);
                    var name=form.elements[0].value;
                    var data_id=form.elements[7].value;
                    
                    var data_json={data_store:'bank_accounts',
	 				log:'yes',
	 				data:[{index:'id',value:data_id}],
	 				log_data:{title:'Deleted',notes:'Bank account details for '+name,link_to:'form261'}};
 				
                    delete_json(data_json);			

                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form261_import_template()
        {
            var data_array=['id','name','bank','branch','ifsc','account name','account number','status'];
            my_array_to_csv(data_array);
        };

        function form261_import_validate(data_array)
        {
            var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'+!_.,()@/-]+$')},
                                    {column:'bank',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
                                    {column:'branch',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
                                    {column:'ifsc',regex:new RegExp('^[a-zA-Z0-9]+$')},
                                    {column:'account name',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
                                    {column:'account number',required:'yes',regex:new RegExp('^[a-zA-Z0-9]+$')},
                                    {column:'status',required:'yes',list:['active','inactive']}];

            var error_array=validate_import_array(data_array,validate_template_array);
            return error_array;					
        }

        function form261_import(data_array,import_type)
        {
            var data_json={data_store:'bank_accounts',
 					log:'yes',
 					data:[],
 					log_data:{title:'Bank account details',link_to:'form261'}};

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
	 					{index:'name',value:row.name,unique:'yes'},
	 					{index:'bank',value:row.bank},
	 					{index:'branch',value:row.branch},
                        {index:'ifsc',value:row.ifsc},
                        {index:'account_name',value:row['account name']},
                        {index:'account_num',value:row['account number']},             
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