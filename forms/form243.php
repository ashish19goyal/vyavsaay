<div id='form243' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal155_action();'>Add <i class='fa fa-plus'></i></a>
        </div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form243_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form243_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form243_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form243_header'></form>
						<th><input type='text' placeholder="Receipt Id" class='floatlabel' name='receipt' form='form243_header'></th>
						<th><input type='text' placeholder="Account" class='floatlabel' name='account' form='form243_header'></th>
						<th><input type='text' placeholder="Amount" readonly='readonly' name='amount' form='form243_header'></th>
						<th><input type='text' placeholder="Narration" class='floatlabel' name='narration' form='form243_header'></th>
						<th><input type='text' placeholder="Documents" readonly="readonly" name='docs' form='form243_header'></th>
						<th><input type='submit' form='form243_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form243_body'>
			</tbody>
		</table>
	</div>

    <script>
        function form243_header_ini()
        {
            var filter_fields=document.getElementById('form243_header');
            var id_filter=filter_fields.elements['receipt'];
            var account_filter=filter_fields.elements['account'];

            var id_data={data_store:'receipts',return_column:'receipt_id'};
            var account_data={data_store:'accounts',return_column:'acc_name'};

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form243_ini();
            });

            set_my_filter_json(id_data,id_filter);
            set_my_filter_json(account_data,account_filter);
        };

        function form243_ini()
        {
            show_loader();
            var fid=$("#form243_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form243_body').html("");

            var filter_fields=document.getElementById('form243_header');
            var rid=filter_fields.elements['receipt'].value;
            var faccount=filter_fields.elements['account'].value;
            var fnarration=filter_fields.elements['narration'].value;

            var paginator=$('#form243_body').paginator();

			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='receipts';

					columns.indexes=[{index:'id',value:fid},
									{index:'receipt_id',value:rid},
									{index:'acc_name',value:faccount},
									{index:'amount'},{index:'date'},
                                    {index:'narration',value:fnarration},
									{index:'type',exact:'received'}];

            read_json_rows('form243',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="";
                    rowsHTML+="<tr>";
                        rowsHTML+="<form id='form243_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Receipt Id'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form243_"+result.id+"' value='"+result.receipt_id+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Account'>";
                                rowsHTML+="<a onclick=\"show_object('accounts','"+result.acc_name+"');\"><textarea readonly='readonly' form='form243_"+result.id+"'>"+result.acc_name+"</textarea>";
                            rowsHTML+="</a></td>";
                            rowsHTML+="<td data-th='Amount'>";
                                rowsHTML+="<input type='number' readonly='readonly' form='form243_"+result.id+"' value='"+result.amount+"'>";
                                rowsHTML+="<input type='hidden' form='form243_"+result.id+"' value='"+result.id+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Narration'>";
                                rowsHTML+="<input type='text' placeholder='Issued On' form='form243_"+result.id+"' class='floatlabel' readonly='readonly' value='"+get_my_past_date(result.date)+"'>";
                                rowsHTML+="<textarea readonly='readonly' class='floatlabel' placeholder='Details' form='form243_"+result.id+"'>"+result.narration+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Document'>";
                                rowsHTML+="<div id='form243_documents_"+result.id+"'></div>";
                            rowsHTML+="<a title='Add document' class='btn btn-circle btn-icon-only grey-cascade' id='form243_add_document_"+result.id+"'><i class='fa fa-plus'></i></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<button type='button' form='form243_"+result.id+"' title='Print Receipt' class='btn yellow btn-icon-only' name='print'><i class='fa fa-print'></i></button>";
                                rowsHTML+="<button type='button' form='form243_"+result.id+"' title='Email Receipt' class='btn grey-mint btn-icon-only' name='email'><i class='fa fa-mail-forward'></i></button>";
								rowsHTML+="<input type='hidden' form='form243_"+result.id+"' value='"+result.id+"' name='id'>";
                                rowsHTML+="<button type='button' class='btn red' form='form243_"+result.id+"' title='Delete' onclick='form243_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form243_body').append(rowsHTML);
                    var fields=document.getElementById('form243_'+result.id);
                    var doc_filter=document.getElementById('form243_add_document_'+result.id);
                    var print_button=fields.elements['print'];
                    var share_button=fields.elements['email'];

                    $(print_button).on('click',function ()
                    {
                        form243_print(result.receipt_id,result.acc_name,result.amount,result.date,result.narration);
                    });

                    var bt=get_session_var('title');
                    $(share_button).on('click',function ()
                    {
                        modal101_action('Payment Receipt - '+bt,result.acc_name,'customer',function (func)
                        {
                            print_form243(func,result.receipt_id,result.acc_name,result.amount,result.date,result.narration);
                        });
                    });

                    $(doc_filter).on('click',function ()
                    {
                        modal144_action('receipts',result.id,function (url,doc_name)
                        {
                            var docHTML="<a href='"+url+"' download='"+doc_name+"'><u>"+doc_name+"</u></a><br>";
                            var doc_container=document.getElementById('form243_documents_'+result.id);
                            $(doc_container).append(docHTML);
                        });
                    });

                    var doc_column={data_store:'documents',
                                    indexes:[{index:'id'},
                                            {index:'url'},
                                            {index:'doc_name'},
                                            {index:'doc_type',exact:'receipts'},
                                            {index:'target_id',exact:result.id}]};
                    read_json_rows('form243',doc_column,function(doc_results)
                    {
                        var docHTML="";
                        for (var j in doc_results)
                        {
                            docHTML+="<a href='"+doc_results[j].url+"' download='"+doc_results[j].doc_name+"'><u>"+doc_results[j].doc_name+"</u></a><br>";
                        }
                        document.getElementById('form243_documents_'+result.id).innerHTML=docHTML;
                    });
                });

                $('#form243').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(columns,'Receipts (Receivable)','form243',function (item)
                {
                    item.date=get_my_past_date(item.date);
                });
				hide_loader();
            });
        };

		function form243_delete_item(button)
		{
			if(is_delete_access('form243'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);

					var data_id=form.elements['id'].value;

					var transaction_json={data_store:'transactions',
						data:[{index:'id',value:data_id}]};

					delete_json(transaction_json);

					var receipt_json={data_store:'receipts',
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

        function form243_print(receipt_id,acc_name,amount,date,narration,pan_text)
        {
            print_form243(function(container)
            {
                $.print(container);
                container.innerHTML="";
            },receipt_id,acc_name,amount,date,narration,pan_text);
        }

        function print_form243(func,receipt_id,acc_name,amount,date,narration,pan_text)
        {
            ////////////setting up containers///////////////////////
            var container=document.createElement('div');
            var header=document.createElement('div');
                var business_title=document.createElement('div');

            var invoice_box=document.createElement('div');

            var info_section=document.createElement('div');
                var supplier_info=document.createElement('div');
                var order_info=document.createElement('div');

            var footer=document.createElement('div');
                var tandc=document.createElement('div');
                var signature=document.createElement('div');

            ////////////setting styles for containers/////////////////////////

            container.setAttribute('style','border:1px solid #000000;width:100%;');
            header.setAttribute('style','width:100%;height:auto;');
                business_title.setAttribute('style','width:99%;text-align:center;font-size:18px;line-height:24px;');
            invoice_box.setAttribute('style','width:99%;min-height:60px;margin:10px;text-align:center;font-size:20px;');
            info_section.setAttribute('style','width:99%;min-height:60px;margin:10px 5px;padding:2px;font-size:16px;line-height:22px;');
            footer.setAttribute('style','width:100%;min-height:100px');
                tandc.setAttribute('style','float:left;width:60%;min-height:50px');
                signature.setAttribute('style','float:right;width:30%;min-height:60px');

            ///////////////getting the content////////////////////////////////////////

            var bt=get_session_var('title');
            var business_address=get_session_var('address');
            var business_phone=get_session_var('phone');
            var today_date=vTime.date();
            var signature_text="<br><br><br><br>Received By:<br>";

            ////////////////filling in the content into the containers//////////////////////////

            business_title.innerHTML="<b>"+bt+"</b><br>"+business_address+"<br>"+business_phone;
            invoice_box.innerHTML="Payment Receipt";

            info_section.innerHTML="<b>Receipt Number</b>: "+receipt_id+"<br><b>Date</b>: "+get_my_past_date(date)+"<br><b>Amount Received</b>: "+amount+"<br><b>From</b>: "+acc_name+"<br><b>Narration</b>: "+narration;

            ////////////////filling in the content into the containers//////////////////////////

            tandc.innerHTML="";
            signature.innerHTML=signature_text;

            ///////////////////////////////////////

            container.appendChild(header);
            container.appendChild(invoice_box);
            container.appendChild(info_section);
            container.appendChild(footer);

            header.appendChild(business_title);

            footer.appendChild(tandc);
            footer.appendChild(signature);

            func(container);
        }


    </script>
</div>
