<div id='form329' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form329_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form329_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form329_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form329_header'></form>
						<th><input type='text' placeholder="Return #" class='floatlabel' name='return' form='form329_header'></th>
						<th><input type='text' placeholder="Customer" class='floatlabel' name='customer' form='form329_header'></th>
						<th><input type='text' placeholder="Date" readonly='readonly' form='form329_header'></th>
						<th><input type='text' placeholder="Amount" readonly="readonly" form='form329_header'></th>
						<th><input type='submit' form='form329_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form329_body'>
			</tbody>
		</table>
	</div>

    <script>

        function form329_header_ini()
        {
            var filter_fields=document.getElementById('form329_header');
            var return_filter=filter_fields.elements['return'];
            var name_filter=filter_fields.elements['customer'];

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form329_ini();
            });

            var return_data={data_store:'customer_returns',return_column:'return_num'};
            var sup_data={data_store:'customers',return_column:'acc_name'};

            set_my_filter_json(sup_data,name_filter);
            set_my_filter_json(return_data,return_filter);
        };

        function form329_ini()
        {
            show_loader();
            var fid=$("#form329_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form329_body').html("");

            var filter_fields=document.getElementById('form329_header');

            //populating form
            var fnum=filter_fields.elements['return'].value;
            var fname=filter_fields.elements['customer'].value;

            var paginator=$('#form329_body').paginator();

						var columns={count:paginator.page_size(),
												start_index:paginator.get_index(),
												data_store:'customer_returns',
												indexes:[{index:'id',value:fid},
																{index:'return_num',value:fnum},
																{index:'customer',value:fname},
																{index:'return_date'},
																{index:'total'}]};

            read_json_rows('form329',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form329_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Return #'>";
                                rowsHTML+="<a onclick=\"element_display('"+result.id+"','form328');\"><input type='text' readonly='readonly' form='form329_"+result.id+"' value='"+result.return_num+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Customer'>";
                                rowsHTML+="<a onclick=\"show_object('customers','"+result.customer+"');\"><textarea readonly='readonly' form='form329_"+result.id+"'>"+result.customer+"</textarea></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Date'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form329_"+result.id+"' value='"+get_my_past_date(result.return_date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Amount'>";
                                rowsHTML+="<input type='number' readonly='readonly' form='form329_"+result.id+"' value='"+result.total+"' step='any'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
																rowsHTML+="<input type='hidden' form='form329_"+result.id+"' name='id' value='"+result.id+"'>";
                                rowsHTML+="<button type='button' class='btn red' form='form329_"+result.id+"' title='Delete Return' onclick='form329_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form329_body').append(rowsHTML);
                });

                $('#form329').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:columns,file:'Sale Returns',report_id:'form329',feach:function (item)
				{
					item.return_date=vTime.date({time:item.return_date});
				}});
				hide_loader();
            });
        }

        function form329_delete_item(button)
        {
            if(is_delete_access('form329'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var return_num=form.elements[0].value;
										var data_id=form.elements['id'].value;
                    var customer=form.elements[1].value;
                    var total=form.elements[3].value;
                    var last_updated=get_my_time();
                    var data_json={data_store:'customer_returns',
                        log:'yes',
                        data:[{index:'id',value:data_id}],
                        log_data:{title:'Deleted',notes:'Sale return # '+return_num,link_to:'form329'}};

                    var transaction_json={data_store:'transactions',
                        data:[{index:'id',value:data_id}]};

                    delete_json(data_json);
                    delete_json(transaction_json);
                    $(button).parent().parent().remove();

                    var items_json={data_store:'customer_return_items',
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
