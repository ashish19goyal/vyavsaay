<div id='form269' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form269_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form269_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form269_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form269_header'></form>
						<th><input type='text' placeholder="Challan #" class='floatlabel' name='invoice' form='form269_header'></th>
						<th><input type='text' placeholder="Customer" class='floatlabel' name='cust' form='form269_header'></th>
						<th>
							<div class='row'>
								<div class='col-md-6' style='padding-right:0px;'>
									<input type='text' placeholder="Start Date" class='floatlabel' name='start' form='form269_header'>
								</div>
								<div class='col-md-6' style='padding-left:0px;'>
									<input type='text' placeholder="End Date" class='floatlabel' name='end' form='form269_header'>
								</div>
							</div>
						</th>
						<th><input type='text' placeholder="Manual Challan #" class='floatlabel' name='man_challan' form='form269_header'></th>
						<th><input type='text' placeholder="Details" readonly="readonly" form='form269_header'></th>
						<th><input type='submit' form='form269_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form269_body'>
			</tbody>
		</table>
	</div>

    <script>
        function form269_header_ini()
        {
            var filter_fields=document.getElementById('form269_header');
            var bill_filter=filter_fields.elements['invoice'];
            var name_filter=filter_fields.elements['cust'];
			var man_challan_filter=filter_fields.elements['man_challan'];

            var bill_data={data_store:'bills',return_column:'bill_num'};
            var cust_data={data_store:'customers',return_column:'acc_name'};
			var manc_data={data_store:'bills',return_column:'acc_name'};

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form269_ini();
            });

            set_my_filter_json(bill_data,bill_filter);
            set_my_filter_json(cust_data,name_filter);
        };

        function form269_ini()
        {
            show_loader();
            var fid=$("#form269_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form269_body').html("");

            var filter_fields=document.getElementById('form269_header');
            var fnum=filter_fields.elements['invoice'].value;
            var fname=filter_fields.elements['cust'].value;
			var fmanc=filter_fields.elements['man_challan'].value;
			var sdate=vTime.unix({date:filter_fields.elements['start'].value});
			var edate=vTime.unix({date:filter_fields.elements['end'].value});

			var date_object={index:'bill_date'};
			if(sdate!="")
			{
				date_object.lowerbound=sdate;
			}
			if(edate!="")
			{
				date_object.upperbound=edate+86400000-1;
			}

            var paginator=$('#form269_body').paginator();

			var new_columns={count:paginator.page_size(),
							start_index:paginator.get_index(),
							data_store:'bills',
                			indexes:[{index:'id',value:fid},
                                    {index:'bill_num',value:fnum},
                                    {index:'customer_name',value:fname},
									{index:'challan_num',value:fmanc},
                                    date_object,
                                    {index:'total'},
                                    {index:'status'},
									{index:'notes'},
                                    {index:'type',exact:'delivery challan'}]};

            read_json_rows('form269',new_columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form269_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Challan #'>";
                                rowsHTML+="<a onclick=\"element_display('"+result.id+"','form268');\"><input type='text' readonly='readonly' form='form269_"+result.id+"' value='"+result.bill_num+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Customer'>";
                                rowsHTML+="<a onclick=\"show_object('customers','"+result.customer_name+"');\"><textarea readonly='readonly' form='form269_"+result.id+"'>"+result.customer_name+"</textarea></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Date'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form269_"+result.id+"' value='"+get_my_past_date(result.bill_date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Manual Challan #'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form269_"+result.id+"' value='"+result.challan_num+"'>";
                            rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<input type='number' step='any' class='floatlabel' placeholder='Amount' readonly='readonly' form='form269_"+result.id+"' value='"+result.total+"'>";
                                rowsHTML+="<textarea class='floatlabel' placeholder='Narration' readonly='readonly' form='form269_"+result.id+"'>"+result.notes+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form269_"+result.id+"' value='"+result.id+"' name='id'>";
                                rowsHTML+="<button type='button' class='btn red' form='form269_"+result.id+"' title='Delete' onclick='form269_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form269_body').append(rowsHTML);
                });

                $('#form269').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:new_columns,file:'Invoices',report_id:'form269',feach:function (item)
				{
					item['Challan #']=item.bill_num;
                    item['Challan Date']=get_my_past_date(item.bill_date);
					item['Manual Challan #']=item.challan_num;
                    delete item.bill_date;
					delete item.bill_num;
                    delete item.type;
					delete item.challan_num;
                }});
				hide_loader();
            });
        }

        function form269_delete_item(button)
        {
            if(is_delete_access('form269'))
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
				 				data:[{index:'id',value:data_id}],
				 				log_data:{title:"Cancelled",notes:"Delivery Challan # "+bill_num,link_to:"form269"}};

					var transaction_json={data_store:'transactions',
			 							data:[{index:'id',value:data_id}]};

					var items_json={data_store:'bill_items',
			 							data:[{index:'bill_id',value:data_id}]};

					var adjust_json={data_store:'inventory_adjust',
			 					data:[{index:'source',value:'delivery challan'},
			                   		{index:'source_id',value:data_id}]};

                    delete_json(bill_json);
                    delete_json(transaction_json);
                    delete_json(items_json);
                    delete_json(adjust_json);

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
