<div id='report58' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report58_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report58_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='report58_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report58_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report58_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Account" class='floatlabel' required name='account'></label>
				<label><input type='text' placeholder="Start Date" class='floatlabel' required name='start'></label>
        		<label><input type='text' placeholder="End Date" class='floatlabel' required name='end'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Date</th>
					<th>Particulars</th>
					<th>Debit</th>
					<th>Credit</th>
					<th>Balance</th>
				</tr>
			</thead>
			<tbody id='report58_body'>
			</tbody>
		</table>
	</div>

	<script>
        function report58_header_ini()
        {
            var form=document.getElementById('report58_header');
            var account_filter=form.elements['account'];
            var start_filter=form.elements['start'];
            var end_filter=form.elements['end'];

            $(form).off('submit');
            $(form).on('submit',function(event)
            {
                event.preventDefault();
                report58_ini();
            });

            var account_data={data_store:'accounts',return_column:'acc_name'};
            set_my_filter_json(account_data,account_filter);

            $(start_filter).datepicker();
            start_filter.value=vTime.date({addDays:-30});
            $(end_filter).datepicker();
            end_filter.value=vTime.date();

			var paginator=$('#report58_body').paginator({'visible':false,'container':$('#report58_body')});

            setTimeout(function(){$('#report58').formcontrol();},500);
        }

        function report58_ini()
        {
            var form=document.getElementById('report58_header');
            var account=form.elements['account'].value;
            var start_date=form.elements['start'].value;
            var end_date=form.elements['end'].value;

            show_loader();
            $('#report58_body').html('');

            var tran_data={data_store:'transactions',
                              indexes:[{index:'id'},
                                      {index:'type'},
                                      {index:'amount'},
                                      {index:'source_link'},
									  {index:'source'},
                                      {index:'source_id'},
                                      {index:'source_info'},
									  {index:'notes'},
                                      {index:'trans_date',upperbound:(get_raw_time(end_date)+86399999)},
                                      {index:'acc_name',exact:account},
									  {index:'last_updated'}]};
            read_json_rows('report58',tran_data,function(transactions)
            {
	              transactions.sort(function(a,b)
	              {
	                  	if(parseFloat(a.trans_date)>parseFloat(b.trans_date))
	                  	{	return 1;}
						else if(parseFloat(a.trans_date)==parseFloat(b.trans_date) && parseFloat(a.last_updated)>parseFloat(b.last_updated))
						{ return 1;}
						else
	                  	{	return -1;}
	              });

              var balance=0;

              for(var p=0;p<transactions.length;p++)
              {
                  if(transactions[p].trans_date<get_raw_time(start_date))
                  {
                      if(transactions[p].type=='given')
                      {
                          balance+=parseFloat(transactions[p].amount);
                      }
                      else
                      {
                          balance-=parseFloat(transactions[p].amount);
                      }

                      transactions.splice(p,1);
                      p--;
                  }
              }

              transactions.forEach(function(tran)
              {
                  var credit="-";
                  var debit="-";
                  var particulars=tran.source+" - "+tran.source_info+"<br>Notes: "+tran.notes;
				  var source_form=tran.source_link;

					if(tran.type=='received')
					{
						balance-=parseFloat(tran.amount);
					  	credit="<span class='label label-sm label-success'>Rs. "+tran.amount+"</span>";
					}
					else
					{
						balance+=parseFloat(tran.amount);
					  	debit="<span class='label label-sm label-warning'>Rs. "+tran.amount+"</span>";
					}

                  var rowsHTML="<tr>";
                  rowsHTML+="<td data-th='Date'>";
                      rowsHTML+=get_my_past_date(tran.trans_date);
                  rowsHTML+="</td>";
                  rowsHTML+="<td data-th='Particulars' style='text-transform:capitalize;'><a id='report58_particulars_"+tran.id+"'>";
                      rowsHTML+=particulars;
                  rowsHTML+="</a></td>";
                  rowsHTML+="<td data-th='Debit'>";
                      rowsHTML+=debit;
                  rowsHTML+="</td>";
				  rowsHTML+="<td data-th='Credit'>";
                      rowsHTML+=credit;
                  rowsHTML+="</td>";
                  rowsHTML+="<td data-th='Balance'>";
                      rowsHTML+="Rs. "+vUtil.round(balance,2);
                  rowsHTML+="</td>";
				  rowsHTML+="</tr>";

                  $('#report58_body').append(rowsHTML);
                  var particulars_link=document.getElementById('report58_particulars_'+tran.id);

                  $(particulars_link).on('click',function()
                  {
						element_display(tran.source_id,source_form);
                  });
              });
	        	initialize_static_tabular_report_buttons('Ledger','report58');
	          	hide_loader();
            });
        };
	</script>
</div>
