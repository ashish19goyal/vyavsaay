<div id='form266' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form266_csv'><i class='fa fa-file-excel-o'></i> Download as CSV</a>
                    </li>
                    <li>
                      	<a id='form266_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form266_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form266_header'></form>
						<th><input type='text' placeholder="RTO #" class='floatlabel' name='rto' form='form266_header'></th>
						<th><input type='text' placeholder="Employee" class='floatlabel' name='emp' form='form266_header'></th>
						<th><input type='text' placeholder="Date" class='floatlabel' name='date' form='form266_header'></th>
						<th><input type='submit' form='form266_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form266_body'>
			</tbody>
		</table>
	</div>

    <script>
        function form266_header_ini()
        {
            var filter_fields=document.getElementById('form266_header');
            var rto_filter=filter_fields.elements['rto'];
            var employee_filter=filter_fields.elements['emp'];
            var date_filter=filter_fields.elements['date'];

            var rto_data={data_store:'rto',return_column:'rto_num'};
            var employee_data={data_store:'staff',return_column:'acc_name'};

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form266_ini();
            });

            set_my_filter_json(rto_data,rto_filter);
            set_my_filter_json(employee_data,employee_filter);
            $(date_filter).datepicker();
        };

        function form266_ini()
        {
            show_loader();
            var fid=$("#form266_link").attr('data_id');
            if(fid==null)
                fid="";

            var filter_fields=document.getElementById('form266_header');
            var frto=filter_fields.elements['rto'].value;
            var femployee=filter_fields.elements['emp'].value;
            var fdate=get_raw_time(filter_fields.elements['date'].value);

            $('#form266_body').html("");

            var paginator=$('#form266_body').paginator();

			var new_columns={count:paginator.page_size(),
                             start_index:paginator.get_index(),
                             data_store:'rto',
							 access:'yes',
                             indexes:[{index:'id',value:fid},
                                    {index:'rto_num',value:frto},
                                    {index:'employee',value:femployee},
                                    {index:'rto_time',value:fdate}]};

            read_json_rows('form266',new_columns,function(results)
            {
                var rto_num_array=[];
                results.forEach(function(result)
                {
                    rto_num_array.push(result.rto_num);
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form266_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='RTO #'>";
                                rowsHTML+="<a onclick=\"element_display('"+result.id+"','form265');\"><input type='text' readonly='readonly' form='form266_"+result.id+"' value='"+result.rto_num+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Employee'>";
                                rowsHTML+="<a onclick=\"show_object('staff','"+result.employee+"');\"><textarea readonly='readonly' form='form266_"+result.id+"'>"+result.employee+"</textarea></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='RTO Time'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form266_"+result.id+"' value='"+get_my_past_date(result.rto_time)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form266_"+result.id+"' value='"+result.id+"' name='id'>";
                                rowsHTML+="<button type='button' class='btn red' form='form266_"+result.id+"' title='Delete RTO' name='delete' onclick='form266_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form266_body').append(rowsHTML);
                });

                var columns=new Object();
                columns.data_store='logistics_orders';
                columns.indexes=[{index:'id'},
                                {index:'awb_num'},
                                {index:'rto_time'},
                                {index:'order_num'},
                                {index:'weight'},
                                {index:'pieces'},
                                {index:'status'},
                                {index:'return_person'},
                                {index:'manifest_type'},
                                {index:'merchant_name'},
                                {index:'vendor_phone'},
                                {index:'phone'},
                                {index:'sku'},
                                {index:'return_address1'},
                                {index:'return_address2'},
                                {index:'return_address3'},
                                {index:'ship_to'},
                                {index:'address1'},
                                {index:'address2'},
                                {index:'address3'},
                                {index:'city'},
                                {index:'rto_num',array:rto_num_array}];

				vExport.export_buttons({action:'dynamic',columns:columns,file:'RTO Orders',report_id:'form266',feach:function (item)
				{
                    item['AWB No']=item.awb_num;
                    item['RTO No']=item.rto_num;
                    item['Order Id']=item.order_num;
                    item['Wt']=item.weight;
                    item['Pcs']=item.pieces;
                    item['status']=item.status;
                    item['Delivery Boy']=item.return_person;
                    item['AWB Type']=item.manifest_type;
                    item['Merchant']=item.merchant_name;
                    item['Merchant Address']=item.return_address1+", "+item.return_address2+", "+item.return_address3;
                    item['Merchant Mobile No']=item.vendor_phone;
                    item['Consignee Address']=item.address1+", "+item.address2+", "+item.address3+", "+item.city;
                    item['Mobile No']=item.phone;
                    item['Product Name']=item.sku;

                    delete item.order_num;
                    delete item.awb_num;
                    delete item.rto_num;
                    delete item.weight;
                    delete item.pieces;
                    delete item.status;
                    delete item.return_person;
                    delete item.manifest_type;
                    delete item.merchant_name;
                    delete item.return_address1;
                    delete item.return_address2;
                    delete item.return_address3;
                    delete item.vendor_phone;
                    delete item.address1;
                    delete item.address2;
                    delete item.address3;
                    delete item.city;
                    delete item.phone;
                    delete item.sku;
                }});

				$('#form266').formcontrol();
				paginator.update_index(results.length);
                hide_loader();
            });
        };

        function form266_delete_item(button)
        {
            if(is_delete_access('form266'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var rto_num=form.elements[0].value;
                    var data_id=form.elements[3].value;
                    var data_json={data_store:'rto',
                                    data:[{index:'id',value:data_id}],
                                    log:'yes',
                                    log_data:{title:"Deleted",notes:"RTO # "+rto_num,link_to:"form266"}};
                    delete_json(data_json);

                    var rto_items_xml={data_store:'logistics_orders',return_column:'id',
                                      indexes:[{index:'status',exact:'RTO out for delivery'},
                                              {index:'rto_num',exact:rto_num}]};
                    read_json_single_column(rto_items_xml,function(rto_items)
                    {
                        var data_json={data_store:'logsistics_orders',
                                        loader:'yes',
                                        data:[]};

                        var counter=1;
                        var last_updated=get_my_time();

                        rto_items.forEach(function(row)
                        {
                            var data_json_array=[{index:'id',value:row},
                                            {index:'rto_num',value:''},
                                            {index:'rto_id',value:''},
                                            {index:'return_person',value:''},
                                            {index:'status',value:'RTO pending'},
                                            {index:'last_updated',value:last_updated}];
                            data_json.data.push(data_json_array);
                        });
                        update_batch_json(data_json);
                    });

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
