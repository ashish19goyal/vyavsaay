<div id='form282' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal172_action();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form282_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form282_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form282_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form282_header'></form>
						<th><input type='text' placeholder="Payment Id" class='floatlabel' name='receipt' form='form282_header'></th>
						<th><input type='text' placeholder="Account" class='floatlabel' name='account' form='form282_header'></th>
						<th>
							<div class='row'>
								<div class='col-md-6' style='padding-right:0px;'>
									<input type='text' placeholder="Start Date" class='floatlabel' name='start' form='form282_header'>
								</div>
								<div class='col-md-6' style='padding-left:0px;'>
									<input type='text' placeholder="End Date" class='floatlabel' name='end' form='form282_header'>
								</div>
							</div>
						</th>
						<th><input type='text' placeholder="Details" class='floatlabel' name='narration' form='form282_header'></th>
						<th><input type='text' placeholder="Documents" readonly="readonly" name='docs' form='form282_header'></th>
            			<th><input type='submit' form='form282_header' class='submit_hidden'></th>
				</tr>
			</thead>
			<tbody id='form282_body'>
			</tbody>
		</table>
	</div>
    <script>
        function form282_header_ini()
        {
            var filter_fields=document.getElementById('form282_header');
            var id_filter=filter_fields.elements['receipt'];
            var account_filter=filter_fields.elements['account'];
            var narration_filter=filter_fields.elements['narration'];

            var id_data={data_store:'receipts',return_column:'receipt_id'};
            var account_data={data_store:'accounts',return_column:'acc_name'};

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form282_ini();
            });

            set_my_filter_json(id_data,id_filter);
            set_my_filter_json(account_data,account_filter);
        };

        function form282_ini()
        {
            show_loader();
            var fid=$("#form282_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form282_body').html("");

            var filter_fields=document.getElementById('form282_header');
            var rid=filter_fields.elements['receipt'].value;
            var faccount=filter_fields.elements['account'].value;
            var fnarration=filter_fields.elements['narration'].value;
			var sdate=vTime.unix({date:filter_fields.elements['start'].value});
			var edate=vTime.unix({date:filter_fields.elements['end'].value});

			var date_object={index:'date'};
			if(sdate!="")
			{
				date_object.lowerbound=sdate;
			}
			if(edate!="")
			{
				date_object.upperbound=edate+86400000-1;
			}

            var paginator=$('#form282_body').paginator();

			var columns={count:paginator.page_size(),
						data_store:'receipts',
						start_index:paginator.get_index(),
						indexes:[{index:'id',value:fid},
						{index:'receipt_id',value:rid},
						{index:'acc_name',value:faccount},
						{index:'amount'},
						date_object,
						{index:'heading'},
						{index:'narration',value:fnarration},
						{index:'type',exact:'paid'}]};

            read_json_rows('form282',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form282_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Payment Id'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form282_"+result.id+"' value='"+result.receipt_id+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Account'>";
                                rowsHTML+="<textarea readonly='readonly' form='form282_"+result.id+"'>"+result.acc_name+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Date'>";
								rowsHTML+="<input type='text' name='date' class='dblclick_editable' form='form282_"+result.id+"' value='"+get_my_past_date(result.date)+"' readonly='readonly'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<input type='number' class='floatlabel dblclick_editable' placeholder='Amount Rs.' readonly='readonly' form='form282_"+result.id+"' value='"+result.amount+"'>";
								rowsHTML+="<input type='text' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Heading' form='form282_"+result.id+"' value='"+result.heading+"'>";
                                rowsHTML+="<textarea readonly='readonly' class='floatlabel dblclick_editable' placeholder='Narration' form='form282_"+result.id+"'>"+result.narration+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Document'>";
                                rowsHTML+="<div id='form282_documents_"+result.id+"'></div>";
                                rowsHTML+="<a title='Add document' class='btn btn-circle btn-icon-only grey-cascade' id='form282_add_document_"+result.id+"'><i class='fa fa-plus'></i></a>";
                            rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form282_"+result.id+"' value='"+result.id+"' name='id'>";
								rowsHTML+="<button type='submit' class='btn green' form='form282_"+result.id+"' title='Update'><i class='fa fa-save'></i></button>";
                            	rowsHTML+="<button type='button' class='btn red' form='form282_"+result.id+"' title='Delete' onclick='form282_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
					rowsHTML+="</tr>";

                    $('#form282_body').append(rowsHTML);

                    var fields=document.getElementById('form282_'+result.id);
                    var doc_filter=document.getElementById('form282_add_document_'+result.id);
					var date_filter=fields.elements['date'];

					$(fields).off('submit');
					$(fields).on('submit',function(e)
					{
						e.preventDefault();
						form282_update_item(fields);
					});

                    $(doc_filter).on('click',function ()
                    {
                        modal144_action('receipts',result.id,function (url,doc_name)
                        {
                            var docHTML="<a href='"+url+"' download='"+doc_name+"'><u>"+doc_name+"</u></a><br>";
                            var doc_container=document.getElementById('form282_documents_'+result.id);
                            $(doc_container).append(docHTML);
                        });
                    });

                    var doc_column={data_store:'documents',
                                   indexes:[{index:'id'},
                                           {index:'url'},
                                           {index:'doc_name'},
                                           {index:'doc_type',exact:'receipts'},
                                           {index:'target_id',exact:result.id}]};
                    read_json_rows('form282',doc_column,function(doc_results)
                    {
                        var docHTML="";
                        for (var j in doc_results)
                        {
                            var updated_url=doc_results[j].url.replace(/ /g,"+");
                            docHTML+="<a href='"+updated_url+"' download='"+doc_results[j].doc_name+"'><u>"+doc_results[j].doc_name+"</u></a><br>";
                        }
                        document.getElementById('form282_documents_'+result.id).innerHTML=docHTML;
                    });

					$(date_filter).datepicker();
                });

                $('#form282').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(columns,'Payments','form282',function (item)
                {
                    item.date=get_my_past_date(item.date);
                });
				hide_loader();
            });
        };

		function form282_update_item(form)
		{
			if(is_update_access('form282'))
			{
				var data_id=form.elements['id'].value;
				var last_updated=vTime.unix();
				var receipt_date=vTime.unix({date:form.elements[2].value});
				var received_amount=form.elements[3].value;
				var heading=form.elements[4].value;
				var narration=form.elements[5].value;

				var transaction_json={data_store:'transactions',
					data:[{index:'id',value:data_id},
						{index:'amount',value:received_amount},
						{index:'trans_date',value:receipt_date},
						{index:'heading',value:heading},
						{index:'notes',value:narration},
						{index:'last_updated',value:last_updated}]};

				update_json(transaction_json);

	        	var receipt_json={data_store:'receipts',
		 				data:[{index:'id',value:data_id},
		 					{index:'amount',value:received_amount},
							{index:'heading',value:heading},
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

		function form282_delete_item(button)
		{
			if(is_delete_access('form282'))
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
    </script>
</div>
