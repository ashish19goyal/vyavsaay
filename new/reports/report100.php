<div id='report100' class='tab-pane portlet box red-sunglo'>	   
	<div class="portlet-title">
        <div class='caption'>		
            <div class='btn-group' id='report100_due_date' data-toggle='buttons'>
                <label class='btn red-pink active today' onclick=report100_ini('today');><input type='radio' class='toggle'>Due Today</label>
                <label class='btn red-pink week' onclick=report100_ini('week');><input type='radio' class='toggle'>Due In a Week</label>
            </div>
        </div>
        <div class="actions">
            <a class='btn btn-default btn-sm' id='report100_remind'><i class='fa fa-'></i> Remind Staff</a>
            <a class='btn btn-default btn-sm' id='report100_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
            <a class='btn btn-default btn-sm' id='report100_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
            <a class='btn btn-default btn-sm' id='report100_print'><i class='fa fa-print'></i> Print</a>
            <a class='btn btn-default btn-sm' id='report100_email'><i class='fa fa-envelope'></i> Email</a>
      </div>	
	</div>
	
	<div class="portlet-body">
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Letter #</th>
					<th>Department</th>
					<th>Notes</th>
					<th>Assignee</th>
				</tr>
			</thead>
			<tbody id='report100_body'>
			</tbody>
		</table>
	</div>
	
	<script>

    function report100_ini(due_date)
    {
        show_loader();

        $('#report100_body').html('');

        var due_time=get_raw_time(get_my_date())+86400000;
        if(typeof due_date!='undefined' && due_date=='week')
        {
            due_time=get_raw_time(get_my_date())+7*86400000;
        }
        else
        {
            $('#report100_due_date').find('label.today').addClass('active');
            $('#report100_due_date').find('label.week').removeClass('active');
        }
        
        var paginator=$('#report100_body').paginator();

        var letters_data=new Object();
                letters_data.count=paginator.page_size();
                letters_data.start_index=paginator.get_index();
                letters_data.data_store='letters';

                letters_data.indexes=[{index:'id'},
                                {index:'letter_num'},
                                {index:'department'},
                                {index:'detail'},{index:'assigned_to'},{index:'status',exact:'open'},{index:'due_date',upperbound:due_time}];
        read_json_rows('report100',letters_data,function(letters)
        {
            var rowsHTML="";
            letters.forEach(function (letter) 
            {
                rowsHTML+="<tr>";
                rowsHTML+="<td data-th='Letter #'><a title='Click to see followup details' onclick=modal200_action('"+letter.id+"');>";
                    rowsHTML+=letter.letter_num;
                rowsHTML+="</a></td>";
                rowsHTML+="<td data-th='Department'>";
                    rowsHTML+=letter.department;
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Notes'>";
                    rowsHTML+="<textarea readonly='readonly'>"+letter.detail+"</textarea>"
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Assignee'><a onclick=\"show_object('staff','"+letter.assigned_to+"');\">";
                    rowsHTML+=letter.assigned_to;
                rowsHTML+="</a></td>";
                rowsHTML+="</tr>";			
            });
            $('#report100_body').html(rowsHTML);
            $('#report100').formcontrol();
            hide_loader();

            paginator.update_index(letters.length);

            initialize_tabular_report_buttons(letters_data,'Due Letters','report100',function (item) 
            {
                item.due_date=get_my_past_date(item.due_date);
                delete item.id;
                delete item.status;
                delete item.due_date;
            });
        });				
    };
	
	</script>
</div>