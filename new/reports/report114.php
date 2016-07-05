<div id='report114' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report114_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report114_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='report114_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report114_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report114_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Id" class='floatlabel' name='receipt'></label>
				<label><input type='text' placeholder="Type" class='floatlabel' name='type'></label>
				<label><input type='text' placeholder="Account" class='floatlabel' name='account'></label>
				<label><input type='text' placeholder="Start Date" class='floatlabel' name='start'></label>
        		<label><input type='text' placeholder="End Date" class='floatlabel' name='end'></label>
        		<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Id</th>
					<th>Type</th>
					<th>Account</th>
					<th>Date</th>
					<th>Narration</th>
					<th>Amount</th>
				</tr>
			</thead>
			<tbody id='report114_body'>
			</tbody>
		</table>
	</div>

	<script>
        function report114_header_ini()
        {
            var form=document.getElementById('report114_header');
			var id_filter=form.elements['receipt'];
			var type_filter=form.elements['type'];
			var account_filter=form.elements['account'];
			var start_filter=form.elements['start'];
			var end_filter=form.elements['end'];

            $(form).off('submit');
            $(form).on('submit',function(event)
            {
                event.preventDefault();
                report114_ini();
            });

			var account_data={data_store:'accounts',return_column:'acc_name'};
			set_my_filter_json(account_data,account_filter);
			set_value_list_json(['receipt','payable'],type_filter);
            $(start_filter).datepicker();
			$(end_filter).datepicker();
			start_filter.value=vTime.date({addDays:-30});
			end_filter.value=vTime.date();

			var paginator=$('#report114_body').paginator({'visible':false,'container':$('#report114_body')});

            setTimeout(function(){$('#report114').formcontrol();},1000);
        }

        function report114_ini()
        {
            var form=document.getElementById('report114_header');
			var fid=form.elements['receipt'].value;
			var ftype=form.elements['type'].value;
			var account=form.elements['account'].value;
			var start=vTime.unix({date:form.elements['start'].value});
			var end=vTime.unix({date:form.elements['end'].value});
			var rtype="";
			if(ftype=='receipt')
			{
				rtype='received';
			}
			else if(ftype=='payable')
			{
				rtype='paid';
			}

            show_loader();
            $('#report114_body').html('');

            var tran_data={data_store:'receipts',
                              indexes:[{index:'id'},
                                      {index:'receipt_id',value:fid},
                                      {index:'type',value:rtype},
									  {index:'acc_name',value:account},
                                      {index:'date',lowerbound:start,upperbound:end},
									  {index:'amount'},
									  {index:'narration'},
								  	  {index:'last_updated'}]};
            read_json_rows('report114',tran_data,function(transactions)
            {
          	  transactions.forEach(function(tran)
              {
				  var type='receipt';
				  if(tran.type=='paid')
				  {
					  type='payable';
				  }
                  var rowsHTML="<tr>";
				  rowsHTML+="<td data-th='Id'>";
                      rowsHTML+=tran.receipt_id;
                  rowsHTML+="</td>";
				  rowsHTML+="<td data-th='Type'>";
                      rowsHTML+=type;
                  rowsHTML+="</td>";
                  rowsHTML+="<td data-th='Account'>";
                      rowsHTML+=tran.acc_name;
                  rowsHTML+="</td>";
				  rowsHTML+="<td data-th='Date'>";
                      rowsHTML+=vTime.date({time:tran.date});
                  rowsHTML+="</td>";
	              rowsHTML+="<td data-th='Narration'>";
                      rowsHTML+=tran.narration;
                  rowsHTML+="</td>";
                  rowsHTML+="<td data-th='Amount'>";
                      rowsHTML+=tran.amount;
                  rowsHTML+="</td>";
				  rowsHTML+="</tr>";

                  $('#report114_body').append(rowsHTML);
              });

			  initialize_static_tabular_report_buttons('Receipts/Payables Report','report114');
		      hide_loader();
		    });
		};
	</script>
</div>
