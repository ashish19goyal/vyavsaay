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
            $(start_filter).val(get_my_past_date((get_my_time()-30*86400000)));
            $(end_filter).datepicker();
            $(end_filter).val(get_my_date());
            $('#report58').formcontrol();
        }

        function report58_ini()
        {
            var form=document.getElementById('report58_header');
            var account=form.elements['account'].value;
            var start_date=form.elements['start'].value;
            var end_date=form.elements['end'].value;

            show_loader();
            $('#report58_body').html('');

            var payments_data={data_store:'payments',
                              indexes:[{index:'id'},
                                      {index:'type'},
                                      {index:'total_amount'},
                                      {index:'paid_amount'},
                                      {index:'mode'},
                                      {index:'status',array:['pending','closed']},
                                      {index:'source'},
                                      {index:'source_id'},
                                      {index:'source_info'},
                                      {index:'date',upperbound:(get_raw_time(end_date)+86399999)},
                                      {index:'acc_name',exact:account}]};
            read_json_rows('report58',payments_data,function(payments)
            {	
                var receipts_data={data_store:'receipts_payment_mapping',
                                  indexes:[{index:'id'},
                                          {index:'receipt_id'},
                                          {index:'payment_id'},
                                          {index:'type'},
                                          {index:'amount'},
                                          {index:'date',upperbound:(get_raw_time(end_date)+86399999)},
                                          {index:'acc_name',exact:account}]};
                
                read_json_rows('report58',receipts_data,function(receipts)
                {
                    for(var k in receipts)
                    {
                        var receipt_to_pay=new Object();
                        receipt_to_pay.acc_name=receipts[k].acc_name;
                        receipt_to_pay.type="received";
                        if(receipts[k].type=='received')
                        {
                            receipt_to_pay.type="paid";
                        }
                        receipt_to_pay.mode='credit';
                        receipt_to_pay.total_amount=receipts[k].amount;
                        receipt_to_pay.paid_amount=0;
                        receipt_to_pay.date=receipts[k].date;
                        receipt_to_pay.source='receipt';
                        receipt_to_pay.source_info=receipts[k].receipt_id;
                        receipt_to_pay.source_id=receipts[k].receipt_id;
                        receipt_to_pay.id=receipts[k].id;
                        receipt_to_pay.status='from receipt';
                        for(var j in payments)
                        {
                            if(payments[j].id==receipt_to_pay.id)
                            {
                                payments[j].paid_amount=parseFloat(payments[j].paid_amount)-parseFloat(receipt_to_pay.total_amount);
                            }
                        }				
                        payments.push(receipt_to_pay);
                    }

                    payments.sort(function(a,b)
                    {
                        if(parseFloat(a.date)>parseFloat(b.date))
                        {	return 1;}
                        else 
                        {	return -1;}
                    });

                    var balance=0;

                    for(var p=0;p<payments.length;p++)
                    {
                        if(payments[p].date<get_raw_time(start_date))
                        {
                            if(payments[p].type=='received')
                            {
                                balance+=parseFloat(payments[p].total_amount);
                            }
                            else 
                            {
                                balance-=parseFloat(payments[p].total_amount);
                            }

                            if(parseFloat(payments[p].paid_amount)>0 && payments[p].paid_amount!='')
                            {
                                if(payments[p].type=='received')
                                {
                                    balance-=parseFloat(payments[p].paid_amount);						
                                }
                                else 
                                {
                                    balance+=parseFloat(payments[p].paid_amount);
                                }
                            }

                            payments.splice(p,1);					
                            p--;				
                        }
                    }									

                    payments.forEach(function(payment)
                    {
                        var debit="-";
                        var credit="-";
                        var particulars="";
                        var source_form='';
                        var source_form_array=[];
                        
                        if(payment.type=='received')
                        {
                            balance+=parseFloat(payment.total_amount);
                            credit="<span class='label label-sm label-danger'>Rs. "+payment.total_amount+"</span>";
                            particulars="To "+payment.acc_name+" for "+payment.source+" # "+payment.source_info;
                            if(payment.status=='from receipt')
                            {
                                source_form='form243';
                                particulars="To "+payment.acc_name+" through receipt # "+payment.source_info;
                            }
                            else
                            {
                                source_form='form42';
                                source_form_array.push('form92');
                            }
                        }
                        else 
                        {
                            balance-=parseFloat(payment.total_amount);
                            debit="<span class='label label-sm label-success'>Rs. "+payment.total_amount+"</span>";
                            particulars="From "+payment.acc_name+" for "+payment.source+" # "+payment.source_info;
                            if(payment.status=='from receipt')
                            {
                                source_form='form282';
                                particulars="From "+payment.acc_name+" through receipt # "+payment.source_info;
                            }
                            else
                            {
                                source_form='form53';
                            }
                        }

                        var rowsHTML="<tr>";
                        rowsHTML+="<td data-th='Date'>";
                            rowsHTML+=get_my_past_date(payment.date);
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Particulars'><a id='report58_particulars_"+payment.id+"'>";
                            rowsHTML+=particulars;
                        rowsHTML+="</a></td>";
                        rowsHTML+="<td data-th='Debit'>";
                            rowsHTML+=debit;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Credit'>";
                            rowsHTML+=credit;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Balance'>";
                            rowsHTML+="Rs. "+my_round(balance,2);
                        rowsHTML+="</td>";
                        rowsHTML+="</tr>";

                        $('#report58_body').append(rowsHTML);
                        var particulars_link=document.getElementById('report58_particulars_'+payment.id);
                        var source_id=payment.source_id;
                        
                        $(particulars_link).on('click',function()
                        {
                            element_display(source_id,source_form,source_form_array);
                        });
                        
                        if(parseFloat(payment.paid_amount)>0 && payment.paid_amount!='')
                        {
                            var debit2="-";
                            var credit2="-";
                            var particulars2="";
                            var source_form2="";
                            var source_form_array2=[];
                            
                            if(payment.type=='received')
                            {
                                balance-=parseFloat(payment.paid_amount);						
                                debit2="<span class='label label-sm label-success'>Rs. "+payment.paid_amount+"</span>";
                                particulars2="From "+payment.acc_name+" by payment id "+payment.id;
                                source_form2='form241';
                                source_form_array2.push('form11');
                            }
                            else 
                            {
                                balance+=parseFloat(payment.paid_amount);
                                credit2="<span class='label label-sm label-danger'>Rs. "+payment.paid_amount+"</span>";
                                particulars2="To "+payment.acc_name+" by payment id "+payment.id;
                                source_form2='form242';
                                source_form_array2.push('form11');
                            }

                            var rowsHTML="<tr>";
                            rowsHTML+="<td data-th='Date'>";
                                rowsHTML+=get_my_past_date(payment.date);
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Particulars'><a id='report58_particulars_"+(parseFloat(payment.id)+1)+"'>";
                                rowsHTML+=particulars2;
                            rowsHTML+="</a></td>";
                            rowsHTML+="<td data-th='Debit'>";
                                rowsHTML+=debit2;
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Credit'>";
                                rowsHTML+=credit2;
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Balance'>";
                                rowsHTML+="Rs. "+my_round(balance,2);
                            rowsHTML+="</td>";
                            rowsHTML+="</tr>";

                            $('#report58_body').append(rowsHTML);
                            var particulars_link=document.getElementById('report58_particulars_'+(parseFloat(payment.id)+1));
                            var source_id=payment.id;
                            $(particulars_link).on('click',function()
                            {
                                element_display(source_id,source_form2,source_form_array2);
                            });
                        }
                    });
                    initialize_static_tabular_report_buttons('Ledger','report58');
                    hide_loader();
                });
            });
        };
	
	</script>
</div>