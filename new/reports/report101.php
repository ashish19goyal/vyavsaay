<div id='report101' class='tab-pane portlet box red-sunglo'>	   
	<div class="portlet-title">
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='report101_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='report101_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='report101_print'><i class='fa fa-print'></i> Print</a>
      	<a class='btn btn-default btn-sm' id='report101_email'><i class='fa fa-envelope'></i> Email</a>
      </div>	
	</div>
	
	<div class="portlet-body">
		<div class='btn-group' data-toggle='buttons'>
            <label class='btn green active'><input type='radio' class='toggle'>Due Today</label>
            <label class='btn green'><input type='radio' class='toggle'>Due This Week</label>
        </div>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="101%">
			<thead>
				<tr>
					<th>Letter #</th>
					<th>Department</th>
					<th>Notes</th>
					<th>Assignee</th>
				</tr>
			</thead>
			<tbody id='report101_body'>
			</tbody>
		</table>
	</div>
	
	<script>

    function report101_ini()
    {
        var form=document.getElementById('report101_header');
        var customer_filter=form.elements['customer'].value;
        var date_filter=form.elements['date'].value;

        show_loader();

        $('#report101_body').html('');

        var paginator=$('#report101_body').paginator();

        var follow_up_data=new Object();
                follow_up_data.count=paginator.page_size();
                follow_up_data.start_index=paginator.get_index();
                follow_up_data.data_store='followups';

                follow_up_data.indexes=[{index:'id'},
                                {index:'customer',exact:customer_filter},
                                {index:'date',value:date_filter},
                                {index:'response'},{index:'detail'},{index:'next_date'},{index:'source_id'}];

        read_json_rows('report101',follow_up_data,function(followups)
        {
            var rowsHTML="";
            followups.forEach(function (followup) 
            {
                rowsHTML+="<tr>";
                rowsHTML+="<td data-th='Date'><a title='Click to go to the lead' onclick=element_display('"+followup.source_id+"','form213');>";
                    rowsHTML+=get_my_past_date(followup.date);
                rowsHTML+="</a></td>";
                rowsHTML+="<td data-th='Response'><span class='label label-sm "+status_label_colors[followup.response]+"'>";
                    rowsHTML+=followup.response;
                rowsHTML+="</span></td>";
                rowsHTML+="<td data-th='Details'>";
                    rowsHTML+=followup.detail;
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Next follow-up'>";
                    rowsHTML+=get_my_past_date(followup.next_date);
                rowsHTML+="</td>";
                rowsHTML+="</tr>";			
            });
            $('#report101_body').html(rowsHTML);
            hide_loader();

            paginator.update_index(followups.length);

            initialize_tabular_report_buttons(follow_up_data,'Sale Lead followups','report101',function (item) 
            {
                item.next_date=get_my_past_date(item.next_date);
                item.date=get_my_past_date(item.date);
                delete item.source_id;
            });	
        });				
    };
	
	</script>
</div>