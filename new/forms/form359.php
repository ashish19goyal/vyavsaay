<div id='form359' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form359_popup_action();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form359_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form359_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form359_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form359_header'></form>
						<th><input type='text' placeholder="Journal Id" class='floatlabel' name='receipt' form='form359_header'></th>
						<th><input type='text' placeholder="Account" class='floatlabel' name='account' form='form359_header'></th>
						<th><input type='text' placeholder="Type" class='floatlabel' name='type' form='form359_header'></th>
						<th><input type='text' placeholder="Date" class='floatlabel' name='date' form='form359_header'></th>
						<th><input type='text' placeholder="Details" class='floatlabel' name='narration' form='form359_header'></th>
						<th><input type='text' placeholder="Documents" readonly="readonly" name='docs' form='form359_header'></th>
            			<th><input type='submit' form='form359_header' class='submit_hidden'></th>
				</tr>
			</thead>
			<tbody id='form359_body'>
			</tbody>
		</table>
	</div>

	<div class='modal_forms'>
		<a href='#form359_popup' data-toggle="modal" id='form359_popup_link'></a>
		<div id="form359_popup" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<form id='form359_popup_form' autocomplete="off">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
							<h4 class="modal-title">Add Journal</h4>
						</div>
						<div class="modal-body">
						   <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
							   <div class="row">
									<div class="col-sm-12 col-md-4">Journal #</div>
									<div class="col-sm-12 col-md-8"><input type='text' form='form359_popup_form' name='id' required></div>
							   </div>
							   <div class="row">
									<div class="col-sm-12 col-md-4">Type</div>
									<div class="col-sm-12 col-md-8"><input type='text' form='form359_popup_form' name='type' required></div>
							   </div>
							   <div class="row">
									<div class="col-sm-12 col-md-4">Date</div>
									<div class="col-sm-12 col-md-8"><input type='text' required form='form359_popup_form' name='date'></div>
							  </div>
							  <div class="row">
									<div class="col-sm-12 col-md-4">Account</div>
									<div class="col-sm-12 col-md-8"><input type='text' required form='form359_popup_form' name='account'></div>
							  </div>
							  <div class="row">
									<div class="col-sm-12 col-md-4">Heading</div>
									<div class="col-sm-12 col-md-8"><input type='text' required form='form359_popup_form' name='heading'></div>
							   </div>
							  <div class="row">
									<div class="col-sm-12 col-md-4">Narration</div>
									<div class="col-sm-12 col-md-8"><textarea required form='form359_popup_form' name='narration'></textarea></div>
							   </div>
							   <div class="row">
									<div class="col-sm-12 col-md-4">Amount</div>
									<div class="col-sm-12 col-md-8"><input type='number' step='any' form='form359_popup_form' name='amount' required></div>
							   </div>
							   <div class="row">
									<div class="col-sm-12 col-md-4">Balance</div>
									<div class="col-sm-12 col-md-8"><input type='text' readonly='readonly' form='form359_popup_form' name='balance'></div>
							   </div>
						   </div>
						 </div>
						<div class="modal-footer">
							<button type="submit" class="btn green" form='form359_popup_form' name='save'>Add</button>
							<button type="button" data-dismiss='modal' class="btn red" form='form359_popup_form' name='cancel'>Cancel</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

    <script>
        function form359_header_ini()
        {
            var filter_fields=document.getElementById('form359_header');
            var id_filter=filter_fields.elements['receipt'];
            var account_filter=filter_fields.elements['account'];
			var type_filter=filter_fields.elements['type'];
            var narration_filter=filter_fields.elements['narration'];

            var id_data={data_store:'receipts',return_column:'receipt_id'};
            var account_data={data_store:'accounts',return_column:'acc_name'};

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form359_ini();
            });

            set_my_filter_json(id_data,id_filter);
            set_my_filter_json(account_data,account_filter);
			set_static_filter_json('transactions','type',type_filter);
        };

        function form359_ini()
        {
            show_loader();
            var fid=$("#form359_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form359_body').html("");

            var filter_fields=document.getElementById('form359_header');
            var rid=filter_fields.elements['receipt'].value;
            var faccount=filter_fields.elements['account'].value;
            var fnarration=filter_fields.elements['narration'].value;
			var ftype=filter_fields.elements['type'].value;
			var fdate=vTime.unix({date:filter_fields.elements['date'].value});

            var paginator=$('#form359_body').paginator();

			var columns={count:paginator.page_size(),
						data_store:'journals',
						start_index:paginator.get_index(),
						indexes:[{index:'id',value:fid},
						{index:'journal_id',value:rid},
						{index:'acc_name',value:faccount},
						{index:'amount'},
						{index:'date',value:fdate},
                        {index:'narration',value:fnarration},
						{index:'type',value:ftype}]};

            read_json_rows('form359',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form359_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Journal Id'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form359_"+result.id+"' value='"+result.receipt_id+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Account'>";
                                rowsHTML+="<textarea readonly='readonly' form='form359_"+result.id+"'>"+result.acc_name+"</textarea>";
                            rowsHTML+="</td>";
							rowsHTML+="<td data-th='Type'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form359_"+result.id+"' value='"+result.type+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Date'>";
								rowsHTML+="<input type='text' name='date' class='dblclick_editable' form='form359_"+result.id+"' value='"+get_my_past_date(result.date)+"' readonly='readonly'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<input type='number' class='floatlabel dblclick_editable' placeholder='Amount Rs.' readonly='readonly' form='form359_"+result.id+"' value='"+result.amount+"'>";
						        rowsHTML+="<textarea readonly='readonly' class='floatlabel dblclick_editable' placeholder='Narration' form='form359_"+result.id+"'>"+result.narration+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form359_"+result.id+"' value='"+result.id+"' name='id'>";
								rowsHTML+="<button type='submit' class='btn green' form='form359_"+result.id+"' title='Update'><i class='fa fa-save'></i></button>";
                            	rowsHTML+="<button type='button' class='btn red' form='form359_"+result.id+"' title='Delete' onclick='form359_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
					rowsHTML+="</tr>";

                    $('#form359_body').append(rowsHTML);

                    var fields=document.getElementById('form359_'+result.id);
                    var date_filter=fields.elements['date'];

					$(fields).off('submit');
					$(fields).on('submit',function(e)
					{
						e.preventDefault();
						form359_update_item(fields);
					});

                    $(date_filter).datepicker();
                });

                $('#form359').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(columns,'Journals','form359',function (item)
                {
                    item.date=get_my_past_date(item.date);
                });
				hide_loader();
            });
        };

		function form359_update_item(form)
		{
			if(is_update_access('form359'))
			{
				var data_id=form.elements['id'].value;
				var last_updated=vTime.unix();
				var receipt_date=vTime.unix({date:form.elements[3].value});
				var received_amount=form.elements[4].value;
				var narration=form.elements[5].value;

				var transaction_json={data_store:'transactions',
					data:[{index:'id',value:data_id},
						{index:'amount',value:received_amount},
						{index:'trans_date',value:receipt_date},
						{index:'notes',value:narration},
						{index:'last_updated',value:last_updated}]};

				update_json(transaction_json);

	        	var receipt_json={data_store:'journals',
		 				data:[{index:'id',value:data_id},
		 					{index:'amount',value:received_amount},
		 					{index:'narration',value:narration},
		 					{index:'date',value:receipt_date},
		 					{index:'last_updated',value:last_updated}]};

				update_json(receipt_json);

				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form359_delete_item(button)
		{
			if(is_delete_access('form359'))
	        {
	            modal115_action(function()
	            {
					var form_id=$(button).attr('form');
	                var form=document.getElementById(form_id);

	                var data_id=form.elements['id'].value;

					var transaction_json={data_store:'transactions',
						data:[{index:'id',value:data_id}]};

					delete_json(transaction_json);

		        	var receipt_json={data_store:'journals',
			 				data:[{index:'id',value:data_id}]};

					delete_json(receipt_json);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form359_popup_action()
		{
			var form=document.getElementById("form359_popup_form");
			var id_filter=form.elements['id'];
			var type_filter=form.elements['type'];
			var date_filter=form.elements['date'];
			var account_filter=form.elements['account'];
			var heading_filter=form.elements['heading'];
			var narration_filter=form.elements['narration'];
			var amount_filter=form.elements['amount'];
			var balance_filter=form.elements['balance'];

			$(date_filter).datepicker();
			date_filter.value=vTime.date();

			set_static_value_list_json('transactions','type',type_filter);

			var accounts_data={data_store:'accounts',return_column:'acc_name'};
			set_my_value_list_json(accounts_data,account_filter);

			id_filter.value="";
			heading_filter.value="";
			narration_filter.value="";
			account_filter.value="";
			amount_filter.value="";
			balance_filter.value="";

			vUtil.onChange(account_filter,function()
			{
				var transactions_data={data_store:'transactions',
								indexes:[{index:'id'},
										{index:'type'},
										{index:'amount'},
										{index:'acc_name',exact:account_filter.value}]};
				read_json_rows('form359',transactions_data,function(transactions)
				{
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
				var jid=id_filter.value;
				var account_name=account_filter.value;
				var heading=heading_filter.value;
				var narration=narration_filter.value;
				var last_updated=vTime.unix();
				var p_id=get_new_key();

				if(is_create_access('form359'))
				{
					var transaction_json={data_store:'transactions',
						data:[{index:'id',value:p_id},
							{index:'acc_name',value:account_name},
							{index:'type',value:receipt_type},
							{index:'amount',value:received_amount},
							{index:'tax',value:'0'},
							{index:'source_id',value:p_id},
							{index:'source_info',value:jid},
							{index:'source',value:'journal'},
							{index:'source_link',value:'form359'},
							{index:'trans_date',value:receipt_date},
							{index:'notes',value:narration},
							{index:'last_updated',value:last_updated}]};

					var journal_json={data_store:'journals',
							data:[{index:'id',value:p_id},
							{index:'journal_id',value:jid},
							{index:'acc_name',value:account_name},
							{index:'amount',received_amount},
							{index:'date',value:receipt_date},
							{index:'heading',value:heading},
							{index:'narration',value:narration},
							{index:'type',value:type},
							{index:'last_updated',value:last_updated}]};

					create_json(transaction_json);
					create_json(journal_json);
				}
				else
				{
					$("#modal2_link").click();
				}

				$(form).find(".close").click();
			});

			$("#form359_popup_link").click();
		}
    </script>
</div>
