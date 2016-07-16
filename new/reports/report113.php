<div id='report113' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report113_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report113_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='report113_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report113_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report113_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Account" class='floatlabel' name='account'></label>
				<label><input type='text' placeholder="Start Date" class='floatlabel' required name='start'></label>
        		<label><input type='text' placeholder="End Date" class='floatlabel' required name='end'></label>
        		<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Account</th>
					<th>Date</th>
					<th>Type</th>
					<th>Particulars</th>
					<th>Amount</th>
				</tr>
			</thead>
			<tbody id='report113_body'>
			</tbody>
			<tfoot id='report113_foot'>
			</tfoot>
		</table>
	</div>

	<script>
        function report113_header_ini()
        {
            var form=document.getElementById('report113_header');
			var account_filter=form.elements['account'];
			var start_filter=form.elements['start'];
			var end_filter=form.elements['end'];

            $(form).off('submit');
            $(form).on('submit',function(event)
            {
                event.preventDefault();
                report113_ini();
            });

            $(start_filter).datepicker();
			$(end_filter).datepicker();
			start_filter.value=vTime.date({addDays:-30});
			end_filter.value=vTime.date();

			var paginator=$('#report113_body').paginator({'visible':false,'container':$('#report113_body')});

            $('#report113').formcontrol();
        }

        function report113_ini()
        {
            var form=document.getElementById('report113_header');
			var account=form.elements['account'].value;
			var start=vTime.unix({date:form.elements['start'].value});
			var end=vTime.unix({date:form.elements['end'].value});

            show_loader();
            $('#report113_body').html('');
			$('#report113_foot').html('');

            var tran_data={data_store:'cash_register',
                              indexes:[{index:'id'},
                                      {index:'amount'},
                                      {index:'type'},
									  {index:'notes'},
									  {index:'acc_name',value:account},
                                      {index:'date',lowerbound:start,upperbound:end},
								  	  {index:'last_updated'}]};
            read_json_rows('report113',tran_data,function(transactions)
            {
          	  transactions.sort(function(a,b)
			  {
			  	  if(parseFloat(a.date)>parseFloat(b.date))
			  	  {	return 1;}
			  	  else if(parseFloat(a.date)==parseFloat(b.date) && parseFloat(a.last_updated)>parseFloat(b.last_updated))
			  	  { return 1;}
			  	  else
			  	  {	return -1;}
			  });

			  var total_amount=0;
              transactions.forEach(function(tran)
              {
                  var rowsHTML="<tr>";
                  rowsHTML+="<td data-th='Account'>";
                      rowsHTML+=tran.acc_name;
                  rowsHTML+="</td>";
				  rowsHTML+="<td data-th='Date'>";
                      rowsHTML+=vTime.date({time:tran.date});
                  rowsHTML+="</td>";
	              rowsHTML+="<td data-th='Type'>";
                      rowsHTML+=tran.type;
                  rowsHTML+="</td>";
				  rowsHTML+="<td data-th='Particulars'>";
                      rowsHTML+=tran.notes;
                  rowsHTML+="</td>";
                  rowsHTML+="<td data-th='Amount'>";
                      rowsHTML+=tran.amount;
                  rowsHTML+="</td>";
				  rowsHTML+="</tr>";
				  if(tran.type=='received')
				  {
					  total_amount+=parseFloat(tran.amount);
				  }
				  else
				  {
					  total_amount-=parseFloat(tran.amount);
				  }
                  $('#report113_body').append(rowsHTML);
              });

			  var footRow="<tr><td colspan='4'>Total Amount</td><td>Rs. "+total_amount+"</td></tr>";
			  $('#report113_foot').append(footRow);

			  initialize_static_tabular_report_buttons('Cash Register','report113');
		      hide_loader();
		    });
		};
	</script>
</div>
