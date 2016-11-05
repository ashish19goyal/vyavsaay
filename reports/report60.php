<div id='report60' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report60_ini();'>Refresh</a>
            <a class='btn btn-circle grey btn-outline btn-sm' onclick='report60_popup_action();' title='Add Ledger Entry'>Add Entry</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report60_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='report60_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report60_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report60_header' autocomplete="off">
			<fieldset>
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
          			<th>Account</th>
					<th>Particulars</th>
					<th>Debit</th>
					<th>Credit</th>
          			<th>Balance</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='report60_body'>
			</tbody>
		</table>
	</div>

	<div class='modal_forms'>
		<a href='#report60_popup' data-toggle="modal" id='report60_popup_link'></a>
		<div id="report60_popup" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<form id='report60_popup_form' autocomplete="off">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
							<h4 class="modal-title">Add Ledger Entry</h4>
						</div>
						<div class="modal-body">
						   <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
							   <div class="row">
									<div class="col-sm-12 col-md-4">Type</div>
									<div class="col-sm-12 col-md-8"><input type='text' form='report60_popup_form' name='type' required></textarea></div>
							   </div>
							   <div class="row">
									<div class="col-sm-12 col-md-4">Date</div>
									<div class="col-sm-12 col-md-8"><input type='text' required form='report60_popup_form' name='date'></div>
							  </div>
							  <div class="row">
									<div class="col-sm-12 col-md-4">Account</div>
									<div class="col-sm-12 col-md-8"><input type='text' required form='report60_popup_form' name='account'></div>
							  </div>
							  <div class="row">
									<div class="col-sm-12 col-md-4">Narration</div>
									<div class="col-sm-12 col-md-8"><textarea required form='report60_popup_form' name='narration'></textarea></div>
							   </div>
							   <div class="row">
									<div class="col-sm-12 col-md-4">Amount</div>
									<div class="col-sm-12 col-md-8"><input type='number' step='any' form='report60_popup_form' name='amount' required></div>
							   </div>
							   <div class="row">
									<div class="col-sm-12 col-md-4">Balance</div>
									<div class="col-sm-12 col-md-8"><input type='text' readonly='readonly' form='report60_popup_form' name='balance'></div>
							   </div>
						   </div>
						 </div>
						<div class="modal-footer">
							<button type="submit" class="btn green" form='report60_popup_form' name='save'>Add</button>
							<button type="button" data-dismiss='modal' class="btn red" form='report60_popup_form' name='cancel'>Cancel</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<script>

        function report60_header_ini()
        {
            var form=document.getElementById('report60_header');
            var start_filter=form.elements['start'];
            var end_filter=form.elements['end'];

            $(form).off('submit');
            $(form).on('submit',function(event)
            {
                event.preventDefault();
                report60_ini();
            });

            $(start_filter).datepicker();
            $(start_filter).val(get_my_past_date((get_my_time()-30*86400000)));
            $(end_filter).datepicker();
            $(end_filter).val(vTime.date());

			var paginator=$('#report60_body').paginator({'visible':false,'container':$('#report60_body')});

			setTimeout(function(){$('#report60').formcontrol();},500);
        }

        function report60_ini()
        {
            var form=document.getElementById('report60_header');
            var start_date=get_raw_time(form.elements['start'].value);
            var end_date=get_raw_time(form.elements['end'].value)+86399999;

            show_loader();
            $('#report60_body').html('');

			var tran_data={data_store:'transactions',
						indexes:[{index:'id'},
								{index:'type'},
								{index:'amount'},
								{index:'source_link'},
								{index:'source'},
								{index:'source_id'},
								{index:'source_info'},
								{index:'notes'},
								{index:'trans_date',upperbound:end_date},
								{index:'acc_name'},
								{index:'last_updated'}]};

            read_json_rows('report60',tran_data,function(transactions)
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
					if(transactions[p].trans_date<start_date)
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
					else {
						balance+=parseFloat(tran.amount);
						debit="<span class='label label-sm label-warning'>Rs. "+tran.amount+"</span>";
					}

                  var rowsHTML="<tr>";
                  rowsHTML+="<td data-th='Date'>";
                      rowsHTML+=get_my_past_date(tran.trans_date);
                  rowsHTML+="</td>";
                  rowsHTML+="<td data-th='Account'><a onclick=\"show_object('accounts','"+tran.acc_name+"');\">";
                      rowsHTML+=tran.acc_name;
                  rowsHTML+="</a></td>";
                  rowsHTML+="<td data-th='Particulars'><a id='report60_particulars_"+tran.id+"'>";
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
				  rowsHTML+="<td data-th='Balance'>";
				  		if(tran.source=='manual entry')
                        	rowsHTML+="<button type='button' class='btn red' name='delete' title='Delete' onclick=\"report60_delete_item($(this),'"+tran.id+"');\"><i class='fa fa-trash'></i></button>";
                  rowsHTML+="</td>";
				  rowsHTML+="</tr>";

                  $('#report60_body').append(rowsHTML);
                  var particulars_link=document.getElementById('report60_particulars_'+tran.id);

					$(particulars_link).on('click',function()
                  {
                      element_display(tran.source_id,source_form);
                  });
              });
			  vExport.export_buttons({file:'Trial Balance',report_id:'report60',action:'static'});
              hide_loader();
          });
        };

		function report60_delete_item(button,data_id)
		{
			if(is_delete_access('report60'))
			{
				modal115_action(function()
				{
					var data_json={data_store:'transactions',
							data:[{index:'id',value:data_id}]};

					delete_json(data_json);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function report60_popup_action()
		{
			var form=document.getElementById("report60_popup_form");
			var type_filter=form.elements['type'];
			var date_filter=form.elements['date'];
			var account_filter=form.elements['account'];
			var narration_filter=form.elements['narration'];
			var amount_filter=form.elements['amount'];
			var balance_filter=form.elements['balance'];

			$(date_filter).datepicker();
			date_filter.value=vTime.date();

			set_static_value_list_json('transactions','type',type_filter);

			var accounts_data={data_store:'accounts',return_column:'acc_name'};
			set_my_value_list_json(accounts_data,account_filter);

			vUtil.onChange(account_filter,function()
			{
				var transactions_data={data_store:'transactions',
								indexes:[{index:'id'},
										{index:'type'},
										{index:'amount'},
										{index:'acc_name',exact:account_filter.value}]};
				read_json_rows('report60',transactions_data,function(transactions)
				{
					console.log(transactions);
					var balance_amount=0;
					transactions.forEach(function(tran)
					{
						if(tran.type=='received')
						{
							balance_amount-=parseFloat(tran.amount);
						}
						else if(tran.type=='given')
						{
							balance_amount+=parseFloat(tran.amount);
						}
					});

					if(balance_amount==0)
					{
						balance_filter.value="Rs. 0";
					}
					else if(balance_amount>0)
					{
						balance_filter.value="Receivable: Rs. "+balance_amount;
					}
					else
					{
						balance_amount=(-balance_amount);
						balance_filter.value="Payable: Rs. "+balance_amount;
					}
				});
			});

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				///////////////////////////////////////
				event.preventDefault();
				var received_amount=amount_filter.value;
				var receipt_date=get_raw_time(date_filter.value);
				var type=type_filter.value;
				var receipt_type='received';
				if(type=='debit')
				{
					receipt_type='given';
				}
				var account_name=account_filter.value;
				var narration=narration_filter.value;
				var last_updated=vTime.unix();
				var p_id=vUtil.newKey();

				if(is_create_access('report60'))
				{
					var transaction_json={data_store:'transactions',
						data:[{index:'id',value:p_id},
							{index:'acc_name',value:account_name},
							{index:'type',value:receipt_type},
							{index:'amount',value:received_amount},
							{index:'tax',value:'0'},
							{index:'source_id',value:p_id},
							{index:'source_info',value:''},
							{index:'source',value:'manual entry'},
							{index:'source_link',value:'repot58'},
							{index:'trans_date',value:receipt_date},
							{index:'notes',value:narration},
							{index:'last_updated',value:last_updated}]};

					create_json(transaction_json);
				}
				else
				{
					$("#modal2_link").click();
				}

				$(form).find(".close").click();
			});

			$("#report60_popup_link").click();
		}
	</script>
</div>
