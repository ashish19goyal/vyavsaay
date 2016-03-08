<div id='form17' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form17_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form17_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form17_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form17_header'></form>
						<th><input type='text' placeholder="Return #" class='floatlabel' name='return' form='form17_header'></th>
						<th><input type='text' placeholder="Supplier" class='floatlabel' name='supplier' form='form17_header'></th>
						<th><input type='text' placeholder="Date" readonly='readonly' form='form17_header'></th>
						<th><input type='text' placeholder="Amount" readonly="readonly" form='form17_header'></th>
						<th><input type='submit' form='form17_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form17_body'>
			</tbody>
		</table>
	</div>
    
    <script>

        function form17_header_ini()
        {
            var filter_fields=document.getElementById('form17_header');
            var return_filter=filter_fields.elements['return'];
            var name_filter=filter_fields.elements['supplier'];

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form17_ini();
            });

            var return_data={data_store:'supplier_returns',return_column:'id'};
            var sup_data={data_store:'suppliers',return_column:'acc_name'};

            set_my_filter_json(sup_data,name_filter);
            set_my_filter_json(return_data,return_filter);
        };

        function form17_ini()
        {
            show_loader();
            var fid=$("#form17_link").attr('data_id');
            if(fid==null)
                fid="";	

            $('#form17_body').html("");
            
            var filter_fields=document.getElementById('form17_header');

            //populating form 
            if(fid==="")
                fid=filter_fields.elements['return'].value;
            var fname=filter_fields.elements['supplier'].value;

            var paginator=$('#form17_body').paginator();
			
			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='supplier_returns';

					columns.indexes=[{index:'id',value:fid},
									{index:'supplier',value:fname},
									{index:'return_date'},
									{index:'total'}];
			
            read_json_rows('form17',columns,function(results)
            {	
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form17_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Return #'>";
                                rowsHTML+="<a onclick=\"element_display('"+result.id+"','form19');\"><input type='text' readonly='readonly' form='form17_"+result.id+"' value='"+result.id+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Supplier'>";
                                rowsHTML+="<a onclick=\"show_object('suppliers','"+result.supplier+"');\"><textarea readonly='readonly' form='form17_"+result.id+"'>"+result.supplier+"</textarea></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Date'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form17_"+result.id+"' value='"+get_my_past_date(result.return_date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Amount'>";
                                rowsHTML+="<input type='number' readonly='readonly' form='form17_"+result.id+"' value='"+result.total+"' step='any'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<button type='button' class='btn red' form='form17_"+result.id+"' title='Delete Return' onclick='form17_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";			
                    rowsHTML+="</tr>";

                    $('#form17_body').append(rowsHTML);
                });

                $('#form17').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(columns,'Purchase Returns','form17',function (item){});
				hide_loader();
            });
        }

        function form17_delete_item(button)
        {
            if(is_delete_access('form17'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var data_id=form.elements[0].value;
                    var supplier=form.elements[1].value;
                    var total=form.elements[3].value;
                    var last_updated=get_my_time();
                    var data_json={data_store:'supplier_returns',
                        log:'yes',
                        data:[{index:'id',value:data_id}],
                        log_data:{title:'Deleted',notes:'Purchase return # '+data_id,link_to:'form17'}};
 				
                    var transaction_json={data_store:'transactions',
                        data:[{index:'id',value:data_id}]};

                    delete_json(data_json);
                    delete_json(transaction_json);
                    $(button).parent().parent().remove();

                    var payment_json={data_store:'payments',count:1,
                                     indexes:[{index:'id'},
                                             {index:'source_id',exact:data_id},
                                             {index:'status',array:["pending","cancelled"]},
                                             {index:'transaction_id'}]};
                    read_json_rows('',payment_json,function(payments)
                    {
                        if(payments.length>0)
                        {
                            var pt_json={data_store:'transactions',
                                        data:[{index:'id',value:payments[0].transaction_id}]};

                            var pay_json={data_store:'payments',
                                        data:[{index:'id',value:payments[0].id}]};

                            delete_json(pay_json);
                            delete_json(pt_json);
                        }
                    });

                    var items_json={data_store:'supplier_return_items',
                                data:[{index:'return_id',value:data_id}]};
                    var discard_json={data_store:'discarded',
                                data:[{index:'source_id',value:data_id},
                                     {index:'source',value:'purchase return'}]};
                    
                    delete_json(items_json);
                    delete_json(discard_json);
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }
    </script>
</div>