<div id='form241' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form241_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form241_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form241_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form241_header'></form>
						<th><input type='text' placeholder="Account" class='floatlabel' name='account' form='form241_header'></th>
						<th><input type='text' placeholder="Total Amount" readonly='readonly' name='total' form='form241_header'></th>
						<th><input type='text' placeholder="Paid Amount" readonly='readonly' name='paid' form='form241_header'></th>
						<th><input type='text' placeholder="Due Date" readonly='readonly' name='date' form='form241_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form241_header'></th>
						<th><input type='submit' form='form241_header' class='submit_hidden'></th>
				</tr>
			</thead>
			<tbody id='form241_body'>
			</tbody>
		</table>
	</div>
    
    <script>
        
        function form241_header_ini()
        {
            var filter_fields=document.getElementById('form241_header');
            var account_filter=filter_fields.elements['account'];
            var status_filter=filter_fields.elements['status'];

            var accounts_data={data_store:'accounts',return_column:'acc_name'};

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form241_ini();
            });

            set_my_filter_json(accounts_data,account_filter);
            set_static_filter_json('payments','status',status_filter);
        };

        function form241_ini()
        {
            show_loader();
            var fid=$("#form241_link").attr('data_id');
            if(fid==null)
                fid="";	

            $('#form241_body').html("");

            var filter_fields=document.getElementById('form241_header');
            var faccount=filter_fields.elements['account'].value;
            var fstatus=filter_fields.elements['status'].value;

            var paginator=$('#form241_body').paginator();
			
			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='payments';
					columns.indexes=[{index:'id',value:fid},
									{index:'acc_name',value:faccount},
									{index:'total_amount'},
									{index:'paid_amount'},
									{index:'due_date'},
									{index:'status',value:fstatus},
                                    {index:'type',exact:'received'}];
			
            read_json_rows('form241',columns,function(results)
            {	
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form241_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Account'>";
                                rowsHTML+="<a onclick=\"show_object('accounts','"+result.acc_name+"');\"><textarea readonly='readonly' form='form241_"+result.id+"'>"+result.acc_name+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Total Amount'>";
                                rowsHTML+="<input type='number' step='any' readonly='readonly' form='form241_"+result.id+"' value='"+result.total_amount+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Paid Amount'>";
                                rowsHTML+="<input type='number' step='any' readonly='readonly' required form='form241_"+result.id+"' class='dblclick_editable' value='"+result.paid_amount+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Due Date'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form241_"+result.id+"' value='"+get_my_past_date(result.due_date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Status'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form241_"+result.id+"' required class='dblclick_editable' value='"+result.status+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form241_"+result.id+"' value='"+result.id+"'>";
                                rowsHTML+="<button type='submit' class='btn green' form='form241_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form241_body').append(rowsHTML);

                    var fields=document.getElementById("form241_"+result.id);
                    var status_filter=fields.elements[4];

                    set_static_value_list_json('payments','status',status_filter);
                    $(fields).on("submit", function(event)
                    {
                        event.preventDefault();
                        form241_update_item(fields);
                    });
                });

                $('#form241').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(columns,'Receivables','form241',function (item)
                {
                    delete item.type;
                    delete item.id;
                    item.due_date=get_my_past_date(item.due_date);
                });
				hide_loader();
            });
        };

        function form241_update_item(form)
        {
            if(is_update_access('form241'))
            {
                var acc_name=form.elements[0].value;
                var total_amount=form.elements[1].value;
                var paid_amount=form.elements[2].value;
                var due_date=get_raw_time(form.elements[3].value);
                var status=form.elements[4].value;
                var data_id=form.elements[5].value;

                var last_updated=get_my_time();
                
                var data_json={data_store:'payments',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'acc_name',value:acc_name},
	 					{index:'total_amount',value:total_amount},
                        {index:'paid_amount',value:paid_amount},  
	 					{index:'due_date',value:due_date},
                        {index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Payment of Rs. '+total_amount+' receivable from '+acc_name,link_to:'form241'}};
                update_json(data_json);
                $(form).readonly();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

    </script>
</div>