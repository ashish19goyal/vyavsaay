<div id='report112' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report112_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report112_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='report112_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report112_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report112_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Date" class='floatlabel' required name='date'></label>
        		<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Time</th>
					<th>Activity</th>
					<th>Details</th>
					<th>Amount</th>
				</tr>
			</thead>
			<tbody id='report112_body'>
			</tbody>
		</table>
	</div>

	<script>
        function report112_header_ini()
        {
            var form=document.getElementById('report112_header');
            var date_filter=form.elements['date'];

            $(form).off('submit');
            $(form).on('submit',function(event)
            {
                event.preventDefault();
                report112_ini();
            });

            $(date_filter).datepicker();
            $(date_filter).val(vTime.date());

			var paginator=$('#report112_body').paginator({'visible':false,'container':$('#report112_body')});

            $('#report112').formcontrol();
        }

        function report112_ini()
        {
            var form=document.getElementById('report112_header');
            var start=vTime.unix({date:form.elements['date'].value});
			var end=start+86400000-1;

            show_loader();
            $('#report112_body').html('');

            var tran_data={data_store:'transactions',
                              indexes:[{index:'id'},
                                      {index:'amount'},
                                      {index:'source_link'},
									  {index:'source'},
                                      {index:'source_id'},
                                      {index:'source_info'},
									  {index:'notes'},
                                      {index:'trans_date'},
                                      {index:'acc_name'},
									  {index:'last_updated',lowerbound:start,upperbound:end}]};
            read_json_rows('report112',tran_data,function(transactions)
            {
              transactions.sort(function(a,b)
              {
                  	if(parseFloat(a.last_updated)>parseFloat(b.last_updated))
                  	{	return 1;}
					else
                  	{	return -1;}
              });

              transactions.forEach(function(tran)
              {
                  var rowsHTML="<tr>";
                  rowsHTML+="<td data-th='Time'>";
                      rowsHTML+=vTime.time({time:tran.last_updated});
                  rowsHTML+="</td>";
				  rowsHTML+="<td data-th='Activity' style='text-transform:capitalize;'>";
                      rowsHTML+=tran.source;
                  rowsHTML+="</td>";
	              rowsHTML+="<td data-th='Details' style='text-transform:capitalize;'><a id='report112_particulars_"+tran.id+"'>";
                      rowsHTML+="Account: "+tran.acc_name+"<br>Notes: "+tran.notes;
                  rowsHTML+="</a></td>";
                  rowsHTML+="<td data-th='Amount'>";
                      rowsHTML+=tran.amount;
                  rowsHTML+="</td>";
				  rowsHTML+="</tr>";

                  $('#report112_body').append(rowsHTML);
                  var particulars_link=document.getElementById('report112_particulars_'+tran.id);

                  $(particulars_link).on('click',function()
                  {
						element_display(tran.source_id,tran.source_link);
                  });
              });
			  initialize_static_tabular_report_buttons('Day Book','report112');
		      hide_loader();
		    });
		};
	</script>
</div>
