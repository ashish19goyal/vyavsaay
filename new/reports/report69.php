<div id='report69' class='tab-pane portlet box red-sunglo'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report69_ini();'>Refresh</a>
		</div>		
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report69_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='report69_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='report69_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report69_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>	
	</div>

	<div class="portlet-body">
		<form id='report69_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Project" class='floatlabel' name='project'></label>
				<label><input type='text' placeholder="Staff" class='floatlabel' name='staff'></label>
                <label><input type='text' placeholder="Keywords" class='floatlabel' name='keywords'></label>
                <label><input type='text' placeholder="From Date" class='floatlabel' required name='from'></label>
                <label><input type='text' placeholder="To Date" class='floatlabel' required name='to'></label>
                <input type='hidden' name='project_id'>
				<input type='submit' class='submit_hidden'>
            </fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Staff</th>
					<th>Detail</th>
					<th>Amount</th>
					<th>Date</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody id='report69_body'>
			</tbody>
		</table>
	</div>
	
	<script>

        function report69_header_ini()
        {	
            var form=document.getElementById('report69_header');
            var project_filter=form.elements['project'];
            var staff_filter=form.elements['staff'];
            var from_filter=form.elements['from'];
            var to_filter=form.elements['to'];
            var id_filter=form.elements['project_id'];
            
            $(form).off('submit');
            $(form).on('submit',function(event)
            {
                event.preventDefault();
                report69_ini();
            });

            my_datalist_change(project_filter,function () 
            {
                var id_data={data_store:'projects',return_column:'id',
                            indexes:[{index:'name',exact:project_filter.value}]};
                set_my_value_json(id_data,id_filter);
            });

            var project_data={data_store:'projects',return_column:'name'};
            set_my_filter_json(project_data,project_filter);

            var staff_data={data_store:'staff',return_column:'acc_name'};
            set_my_filter_json(staff_data,staff_filter);

            $(from_filter).datepicker();
            $(from_filter).val(get_my_past_date((get_my_time()-7*86400000)));

            $(to_filter).datepicker();
            $(to_filter).val(get_my_date());
            $('#report69').formcontrol();
        }

        function report69_ini()
        {
            var form=document.getElementById('report69_header');
            var staff_filter=form.elements['staff'].value;
            var from_filter=get_raw_time(form.elements['from'].value);
            var to_filter=get_raw_time(form.elements['to'].value)+86399999;
            var key_filter=form.elements['keywords'].value;
            var id_filter=form.elements['project_id'].value;
            
            show_loader();
            $('#report69_body').html('');	

            var paginator=$('#report69_body').paginator();
			var columns=new Object();
			columns.count=paginator.page_size();
			columns.start_index=paginator.get_index();
			columns.data_store='expenses';
					
			columns.indexes=[{index:'id'},
							{index:'person',value:staff_filter},
							{index:'amount'},{index:'status'},
							{index:'detail',value:key_filter},
                            {index:'source',exact:'project'},
                            {index:'source_id',value:id_filter},
                            {index:'expense_date',lowerbound:from_filter,upperbound:to_filter}];
	            
            read_json_rows('report69',columns,function(items)
            {
                var rowsHTML="";
                items.forEach(function(item)
                {
                    rowsHTML+="<tr>";
                    rowsHTML+="<form id='report69_"+item.id+"'></form>";
                    rowsHTML+="<td data-th='Staff'><a onclick=\"show_object('staff','"+item.person+"')\">";
                        rowsHTML+=item.person;
                    rowsHTML+="</a></td>";
                    rowsHTML+="<td data-th='Detail'>";
                        rowsHTML+=item.detail;
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Amount'>";
                        rowsHTML+=item.amount;
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Date'>";
                        rowsHTML+=get_my_past_date(item.expense_date);
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Status'><span class='label label-sm "  +status_label_colors[item.status]+"'>";
                        rowsHTML+=item.status;
                    rowsHTML+="</span></td>";
                    rowsHTML+="</tr>";
                });
                $('#report69_body').html(rowsHTML);

                paginator.update_index(items.length);
				initialize_tabular_report_buttons(columns,'Expenses Report','report69',function (item) 
                {
                    item.expense_date=get_my_past_date(item.expense_date);
                    delete item.source_id;
                    delete item.source;
                });
                hide_loader();
            });
        };
	</script>
</div>