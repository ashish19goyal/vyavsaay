<div id='form282' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal172_action();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' onclick='modal31_action();'>Delete <i class='fa fa-trash'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form282_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form282_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form282_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form282_header'></form>
						<th><input type='text' placeholder="Receipt Id" class='floatlabel' name='receipt' form='form282_header'></th>
						<th><input type='text' placeholder="Account" class='floatlabel' name='account' form='form282_header'></th>
						<th><input type='text' placeholder="Amount" readonly='readonly' name='amount' form='form282_header'></th>
						<th><input type='text' placeholder="Narration" class='floatlabel' name='narration' form='form282_header'></th>
						<th>
                            <input type='text' placeholder="Documents" readonly="readonly" name='docs' form='form282_header'>
                            <input type='submit' form='form282_header' class='submit_hidden'>
                        </th>
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

            var paginator=$('#form282_body').paginator();
			
			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='receipts';
					columns.indexes=[{index:'id',value:fid},
									{index:'receipt_id',value:rid},
									{index:'acc_name',value:faccount},
									{index:'amount'},{index:'date'},
                                    {index:'narration',value:fnarration},
									{index:'type',exact:'paid'}];
			
            read_json_rows('form282',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form282_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Receipt Id'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form282_"+result.id+"' value='"+result.receipt_id+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Account'>";
                                rowsHTML+="<textarea readonly='readonly' form='form282_"+result.id+"'>"+result.acc_name+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Amount'>";
                                rowsHTML+="<input type='number' readonly='readonly' form='form282_"+result.id+"' value='"+result.amount+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Narration'>";
                                rowsHTML+="<input type='text' class='floatlabel' placeholder='Issued On' value='"+get_my_past_date(result.date)+"' readonly='readonly'>";
                                rowsHTML+="<textarea readonly='readonly' class='floatlabel' placeholder='Details' form='form282_"+result.id+"'>"+result.narration+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Document'>";
                                    rowsHTML+="<div id='form282_documents_"+result.id+"'></div>";
                            rowsHTML+="<a title='Add document' class='btn btn-circle btn-icon-only grey-cascade' id='form282_add_document_"+result.id+"'><i class='fa fa-plus'></i></a>";
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form282_body').append(rowsHTML);

                    var fields=document.getElementById('form282_'+result.id);
                    var doc_filter=document.getElementById('form282_add_document_'+result.id);

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
                });

                $('#form282').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(columns,'Receipts (Payable)','form282',function (item)
                {
                    item.date=get_my_past_date(item.date);
                });
				hide_loader();
            });
        };        
    </script>
</div>