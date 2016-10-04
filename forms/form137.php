<div id='form137' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form137_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='form137_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form137_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form137_upload' onclick=modal23_action(form137_import_template,form137_import,form137_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form137_header'></form>
						<th><input type='text' placeholder="Person" class='floatlabel' name='person' form='form137_header'></th>
						<th><input type='text' placeholder="Project" class='floatlabel' name='project' form='form137_header'></th>
						<th><input type='text' placeholder="Amount" readonly='readonly' form='form137_header'></th>
						<th><input type='text' placeholder="Details" readonly="readonly" form='form137_header'></th>
                        <th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form137_header'></th>
						<th><input type='submit' form='form137_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form137_body'>
			</tbody>
		</table>
	</div>

    <script>
        function form137_header_ini()
        {
            var fields=document.getElementById('form137_header');

            var person_filter=fields.elements['person'];
            var project_filter=fields.elements['project'];
            var status_filter=fields.elements['status'];

            var person_data={data_store:'staff',return_column:'acc_name'};
            var project_data={data_store:'projects',return_column:'name'};

            set_my_filter_json(person_data,person_filter);
            set_my_filter_json(project_data,project_filter);
            set_static_filter_json('projects','status',status_filter);

            $(fields).off('submit');
            $(fields).on('submit',function(event)
            {
                event.preventDefault();
                form137_ini();
            });
        };

        function form137_ini()
        {
            var fid=$("#form137_link").attr('data_id');
            if(fid==null)
                fid="";
            $('#form137_body').html("");

            show_loader();

            var fields=document.getElementById('form137_header');
            var fproject=fields.elements['project'].value;
			var fperson=fields.elements['person'].value;
			var fstatus=fields.elements['status'].value;

            var paginator=$('#form137_body').paginator();

            var columns={data_store:'expenses',
                         count:paginator.page_size(),
                         start_index:paginator.get_index(),
                         access:'yes',
                         indexes:[{index:'id',value:fid},
                                 {index:'source',exact:'project'},
                                 {index:'source_name',value:fproject},
                                 {index:'person',value:fperson},
                                 {index:'amount'},
                                 {index:'detail'},
                                 {index:'expense_date'},
                                 {index:'status',value:fstatus}]};

            read_json_rows('form137',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var id=result.id;
                    var rowsHTML="<tr>";
                    rowsHTML+="<form id='form137_rows_"+id+"'></form>";
                        rowsHTML+="<td data-th='Person'>";
                            rowsHTML+="<a onclick=\"show_object('staff','"+result.person+"');\"><textarea readonly='readonly' form='form137_rows_"+id+"'>"+result.person+"</textarea></a>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Project'>";
                            rowsHTML+="<a onclick=\"show_object('projects','"+result.source_name+"');\"><textarea readonly='readonly' form='form137_rows_"+id+"'>"+result.source_name+"</textarea></a>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Amount'>";
                            rowsHTML+="<input type='number' class='floatlabel' placeholder='Rs.' readonly='readonly' form='form137_rows_"+id+"' value='"+result.amount+"' step='any'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Details'>";
                            rowsHTML+="<input type='text' class='floatlabel' placeholder='Date' readonly='readonly' form='form137_rows_"+id+"' value='"+get_my_past_date(result.expense_date)+"'>";
                            rowsHTML+="<textarea class='floatlabel' placeholder='Notes' readonly='readonly' form='form137_rows_"+id+"'>"+result.detail+"</textarea>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Status'>";
                            rowsHTML+="<input type='text' readonly='readonly' form='form137_rows_"+id+"' value='"+result.status+"'>";
                        if(is_update_access('form137') && result.status=='submitted')
                        {
                            rowsHTML+="<button type='button' class='btn default green-stripe' name='approve' form='form137_rows_"+id+"' onclick='form137_approve_item($(this))'>Approve</button>";
                            rowsHTML+="<button type='button' class='btn default red-stripe' name='reject' form='form137_rows_"+id+"' onclick='form137_reject_item($(this))'>Reject</button>";
                        }
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' form='form137_rows_"+id+"' value='"+id+"' name='id'>";
                        if(result.status=='submitted')
                        {
                            rowsHTML+="<button type='button' class='btn red' form='form137_rows_"+id+"' id='delete_form137_rows_"+id+"' onclick='form137_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
                        }
                        rowsHTML+="</td>";
                    rowsHTML+="</tr>";
                    $('#form137_body').append(rowsHTML);
                });

                $('#form137').formcontrol();
                paginator.update_index(results.length);
                initialize_tabular_report_buttons(columns,'Project Expenses','form137',function (item)
                {
                    item['Project Name']=item.source_name;
                    delete item.source_name;
                    delete item.source;
                    item['Expense Date']=get_my_past_date(item.expense_date);
                    delete item.expense_date;
                });

                hide_loader();
            });
        }

        function form137_add_item()
        {
            if(is_create_access('form137'))
            {
                var id=vUtil.newKey();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form137_rows_"+id+"' autocomplete='off'></form>";
                    rowsHTML+="<td data-th='Person'>";
                        rowsHTML+="<input type='text' form='form137_rows_"+id+"' required>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Project'>";
                        rowsHTML+="<input type='text' form='form137_rows_"+id+"' required>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Amount'>";
                        rowsHTML+="<input type='number' class='floatlabel' placeholder='Rs.' step='any' form='form137_rows_"+id+"' required>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Details'>";
                        rowsHTML+="<input type='text' class='floatlabel' placeholder='Date' readonly='readonly' form='form137_rows_"+id+"' value='"+vTime.date()+"'>";
                        rowsHTML+="<textarea class='floatlabel' placeholder='Notes' form='form137_rows_"+id+"'></textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Status'>";
                        rowsHTML+="<input type='text' readonly='readonly' form='form137_rows_"+id+"' value='submitted'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='form137_rows_"+id+"' value='"+id+"' name='id'>";
                        rowsHTML+="<button type='submit' class='btn green' form='form137_rows_"+id+"' id='save_form137_"+id+"' name='save' title='Save'><i class='fa fa-save'></i></button>";
                        rowsHTML+="<button type='button' class='btn red' form='form137_rows_"+id+"' onclick='$(this).parent().parent().remove();' name='delete'><i class='fa fa-trash'></i></button>";
                    rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form137_body').prepend(rowsHTML);
                var fields=document.getElementById("form137_rows_"+id);
                var person_filter=fields.elements[0];
                var project_filter=fields.elements[1];
                var amount_filter=fields.elements[2];
                var date_filter=fields.elements[3];
                var status_filter=fields.elements[5];

                $(date_filter).datepicker();

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form137_create_item(fields);
                });

                if(is_update_access('form137'))
                {
                    var person_data={data_store:'staff',return_column:'acc_name'};
                    set_my_value_list_json(person_data,person_filter,function ()
                    {
                        $(person_filter).focus();
                    });
                }
                else
                {
                    person_filter.value=get_account_name();
                    person_filter.setAttribute('readonly','readonly');
                    $(project_filter).focus();
                }

                var project_data={data_store:'projects',return_column:'name'};
                set_my_value_list_json(project_data,project_filter);
                $('#form137').formcontrol();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form137_create_item(form)
        {
            if(is_create_access('form137'))
            {
                var person=form.elements[0].value;
                var project=form.elements[1].value;
                var amount=form.elements[2].value;
                var date=get_raw_time(form.elements[3].value);
                var details=form.elements[4].value;
                var status=form.elements[5].value;
                var data_id=form.elements['id'].value;
                var del_button=form.elements['delete'];
                var last_updated=get_my_time();

                var data_json={data_store:'expenses',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'source',value:'project'},
	 					{index:'status',value:status},
	 					{index:'source_name',value:project},
	 					{index:'expense_date',value:date},
                        {index:'person',value:person},
                        {index:'amount',value:amount},
                        {index:'detail',value:details},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Submitted',notes:'Expense of Rs. '+amount+' for '+person,link_to:'form137'}};
 				create_json(data_json);

                $(form).readonly();

                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form137_delete_item(del_button);
                });
                $(form).off('submit');
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form137_approve_item(button)
        {
            if(is_update_access('form137'))
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var status='approved';
                var person=form.elements[0].value;
                var amount=form.elements[2].value;
                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();
                form.elements[5].value='approved';
                var data_json={data_store:'expenses',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Rejected',notes:"Expense of Rs. "+amount+" for "+person,link_to:'form137'}};

                update_json(data_json);
                $(button).hide();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form137_reject_item(button)
        {
            if(is_update_access('form137'))
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var status='rejected';
                var person=form.elements[0].value;
                var amount=form.elements[2].value;
                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();
                form.elements[5].value='rejected';
                var data_json={data_store:'expenses',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Rejected',notes:"Expense of Rs. "+amount+" for "+person,link_to:'form137'}};

                update_json(data_json);
                $(button).hide();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form137_delete_item(button)
        {
            var form_id=$(button).attr('form');
            var form=document.getElementById(form_id);
            var amount=form.elements[2].value;
            var person=form.elements[0].value;

            if(is_delete_access('form137') || person==get_account_name())
            {
                modal115_action(function()
                {
                    var data_id=form.elements['id'].value;

                    var data_json={data_store:'expenses',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Expense of Rs. "+amount+" for "+person,link_to:"form137"}};

                    delete_json(data_json);

                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form137_import_template()
        {
            var data_array=['id','person','project','amount','notes','date','status'];
            vUtil.arrayToCSV(data_array);
        };

        function form137_import_validate(data_array)
        {
            var validate_template_array=[{column:'person',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.!;\[\],()@#$%-]+$')},
                                    {column:'project',requried:'yes',regex:new RegExp('^[0-9a-zA-Z _.,;@\'()-]+$')},
                                    {column:'notes',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,;#\"\'+@!$()-]+$')},
                                    {column:'amount',required:'yes',regex:new RegExp('^[0-9. ]+$')},
                                    {column:'status',required:'yes',list:['submitted','approved','rejected']}];

            var error_array=vImport.validate(data_array,validate_template_array);
            return error_array;
        }

        function form137_import(data_array,import_type)
        {
         	var data_json={data_store:'expenses',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Expenses for projects',link_to:'form137'}};

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
	 					{index:'status',value:row.status},
	 					{index:'person',value:row.person},
	 					{index:'amount',value:row.amount},
	 					{index:'detail',value:row.notes},
                        {index:'expense_date',value:get_raw_time(row.expense_date)},
                        {index:'source_name',value:row.project},
                        {index:'source',value:'project'},
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
