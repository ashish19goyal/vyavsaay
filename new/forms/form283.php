<div id='form283' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form283_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form283_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form283_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form283_header'></form>
						<th><input type='text' placeholder="Invoice #" class='floatlabel' name='invoice' form='form283_header'></th>
						<th><input type='text' placeholder="Customer" class='floatlabel' name='cust' form='form283_header'></th>
						<th><input type='text' placeholder="Date" class='floatlabel' name='date' form='form283_header'></th>
						<th><input type='text' placeholder="Amount" readonly="readonly" form='form283_header'></th>
						<th><input type='text' placeholder="Narration" readonly="readonly" form='form283_header'></th>
						<th><input type='submit' form='form283_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form283_body'>
			</tbody>
		</table>
	</div>

    <script>
        function form283_header_ini()
        {
            var filter_fields=document.getElementById('form283_header');
            var bill_filter=filter_fields.elements['invoice'];
            var name_filter=filter_fields.elements['cust'];

            var bill_data={data_store:'bills',return_column:'bill_num'};
            var cust_data={data_store:'customers',return_column:'acc_name'};

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form283_ini();
            });

            set_my_filter_json(bill_data,bill_filter);
            set_my_filter_json(cust_data,name_filter);
        };

        function form283_ini()
        {
            show_loader();
            var fid=$("#form283_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form283_body').html("");

            var filter_fields=document.getElementById('form283_header');
            var fnum=filter_fields.elements['invoice'].value;
            var fname=filter_fields.elements['cust'].value;
			var fdate=vTime.unix({date:filter_fields.elements['date'].value});

            var paginator=$('#form283_body').paginator();

			var new_columns={count:paginator.page_size(),
							start_index:paginator.get_index(),
							data_store:'bills',
                			indexes:[{index:'id',value:fid},
                                    {index:'bill_num',value:fnum},
                                    {index:'customer_name',value:fname},
                                    {index:'bill_date',value:fdate},
                                    {index:'total'},
                                    {index:'status'},
									{index:'notes'},
                                    {index:'performa',exact:'yes'}]};

            read_json_rows('form283',new_columns,function(results)
            {
                results.forEach(function(result)
                {
                    var cancelled_bill="";
                    if(result.status=='cancelled')
                    {
                        cancelled_bill="style='opacity:0.5' title='This bill was cancelled'";
                    }

                    var rowsHTML="<tr "+cancelled_bill+">";
                        rowsHTML+="<form id='form283_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Invoice #'>";
                                rowsHTML+="<a><input type='text' readonly='readonly' form='form283_"+result.id+"' value='"+result.bill_num+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Customer'>";
                                rowsHTML+="<a onclick=\"show_object('customers','"+result.customer_name+"');\"><textarea readonly='readonly' form='form283_"+result.id+"'>"+result.customer_name+"</textarea></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Date'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form283_"+result.id+"' value='"+get_my_past_date(result.bill_date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Amount'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form283_"+result.id+"' value='"+result.total+"'>";
                            rowsHTML+="</td>";
							rowsHTML+="<td data-th='Narration'>";
                                rowsHTML+="<textarea readonly='readonly' form='form283_"+result.id+"'>"+result.notes+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form283_"+result.id+"' value='"+result.id+"' name='id'>";
                            if(result.status!='cancelled')
                            {
                                rowsHTML+="<button type='button' class='btn red' form='form283_"+result.id+"' title='Delete Bill' onclick='form283_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            }
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form283_body').append(rowsHTML);
                    var fields=document.getElementById("form283_"+result.id);

                    if(result.status!='cancelled')
                    {
                        var input_link=fields.elements[0];
                        $(input_link).parent().on("click", function(event)
                        {
                            event.preventDefault();
                            element_display(result.id,'form284');
                        });
                    }
                });

                $('#form283').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Invoices','form283',function (item)
                {
                    item['bill date']=get_my_past_date(item.bill_date);
                    delete item.bill_date;
                    delete item.performa;
                });
				hide_loader();
            });
        }

        function form283_delete_item(button)
        {
            if(is_delete_access('form283'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var bill_num=form.elements[0].value;
                    var data_id=form.elements['id'].value;
                    var last_updated=get_my_time();

                    var bill_json={data_store:'bills',
				 				log:'yes',
				 				data:[{index:'id',value:data_id},
				 					{index:'status',value:'cancelled'},
				 					{index:'last_updated',value:last_updated}],
				 				log_data:{title:"Cancelled",notes:"Invoice # "+bill_num,link_to:"form283"}};

					var transaction_json={data_store:'transactions',
			 							data:[{index:'id',value:data_id}]};

					var items_json={data_store:'bill_items',
			 							data:[{index:'bill_id',value:data_id}]};

					var adjust_json={data_store:'inventory_adjust',
			 							data:[{index:'source',value:'sale'},
			                   {index:'source_id',value:data_id}]};

                    update_json(bill_json);
                    delete_json(transaction_json);
                    delete_json(items_json);
                    delete_json(adjust_json);

                    // var payment_xml={data_store:'payments',
                    //                 indexes:[{index:'id'},
                    //                         {index:'source_id',exact:data_id},
                    //                         {index:'status',array:['pending','cancelled']},
                    //                         {index:'transaction_id'}]};
                    // read_json_rows('',payment_xml,function(payments)
                    // {
                    //     if(payments.length>0)
                    //     {
                    //         var pt_json={data_store:'transactions',
 									// 							data:[{index:'id',value:payments[0].transaction_id}]};
                    //         var pay_json={data_store:'payments',
 									// 							data:[{index:'id',value:payments[0].id}]};
										//
                    //         delete_json(pay_json);
                    //         delete_json(pt_json);
                    //     }
                    // });
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
