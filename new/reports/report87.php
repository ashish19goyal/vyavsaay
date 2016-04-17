<div id='report87' class='tab-pane portlet box red-sunglo'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report87_ini();'>Refresh</a>
		</div>		
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report87_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='report87_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report87_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>	
	</div>
	
	<div class="portlet-body">
		<form id='report87_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Person" class='floatlabel' name='person'></label>
				<label><input type='text' placeholder="Start Date" class='floatlabel' name='start'></label>
				<label><input type='text' placeholder="End Date" class='floatlabel' name='end'></label>
				<label><input type='submit' class='submit_hidden'></label>			
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Person</th>
                    <th>Date</th>
                    <th>Total Run</th>
                </tr>
			</thead>
			<tbody id='report87_body'></tbody>
            <tbody id='report87_foot'></tbody>
		</table>
	</div>
	
	<script>

    function report87_header_ini()
    {	
        var form=document.getElementById('report87_header');
        var person_filter=form.elements['person'];
        var start_date=form.elements['start'];
        var end_date=form.elements['end'];

        $(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report87_ini();
        });

        var person_data={data_store:'staff',return_column:'acc_name'};
        set_my_filter_json(person_data,person_filter);

        $(start_date).datepicker();
        $(end_date).datepicker();
        start_date.value=get_my_past_date((get_my_time()-(7*87400000)));
        end_date.value=get_my_date();
        $('#report87').formcontrol();
    }

    function report87_ini()
    {
        show_loader();
        var form=document.getElementById('report87_header');
        var person=form.elements['person'].value;
        var start=get_raw_time(form.elements['start'].value);
        var end=get_raw_time(form.elements['end'].value)+86399999;

        $('#report87_body').html('');
        $('#report87_foot').html('');

        var columns={data_store:'delivery_run',
                     indexes:[{index:'id'},
                        {index:'person',value:person},
                        {index:'date',lowerbound:start,upperbound:end},
                        {index:'total_run'}]};

        read_json_rows('report87',columns,function(deliveries)
        {	
            var total_kms=0;
            deliveries.forEach(function(result)
            {	
                total_kms+=parseFloat(result.total_run);
                var rowsHTML="<tr>";
                    rowsHTML+="<td data-th='Person'>";
                        rowsHTML+="<a onclick=\"show_object('staff','"+result.person+"');\">"+result.person+"</a>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Date'>";
                        rowsHTML+=get_my_past_date(result.date);
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Kms'>";
                        rowsHTML+=result.total_run+" kms";
                    rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#report87_body').append(rowsHTML);
            });

            var total_row="<tr><td data-th='Total' colspan='2'>Total</td><td data-th='Total Kms'>"+total_kms+" kms</td></tr>";
            $('#report87_foot').html(total_row);

            initialize_static_tabular_report_buttons('Delivery Run Report','report87');
            hide_loader();
        });
    };
	
	</script>
</div>