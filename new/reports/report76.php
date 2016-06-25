<div id='report76' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report76_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report76_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report76_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report76_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="AWB #" class='floatlabel' name='awb'></label>
				<label><input type='text' placeholder="Channel" class='floatlabel' name='channel'></label>
				<label><input type='text' placeholder="Manifest ID" class='floatlabel' name='manifest'></label>
				<label><input type='text' placeholder="Status" class='floatlabel' name='status'></label>
				<label><input type='text' placeholder="Import Start Date" class='floatlabel' name='start'></label>
                <label><input type='text' placeholder="Import End Date" class='floatlabel' name='end'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>AWB #</th>
                    <th>Manifest Id</th>
                    <th>Import Date</th>
                    <th>Status</th>
                </tr>
			</thead>
			<tbody id='report76_body'></tbody>
		</table>
	</div>

	<script>

    function report76_header_ini()
    {
        var form=document.getElementById('report76_header');
        var awb_filter=form.elements['awb'];
        var channel_filter=form.elements['channel'];
        var manifest_filter=form.elements['manifest'];
        var status_filter=form.elements['status'];
        var start_filter=form.elements['start'];
        var end_filter=form.elements['end'];

        $(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report76_ini();
        });

        var manifest_data={data_store:'logistics_orders',return_column:'manifest_id'};
        set_my_filter_json(manifest_data,manifest_filter);

        set_static_filter_json('logistics_orders','status',status_filter);
        set_static_value_list_json('logistics_orders','channel',channel_filter);

        $(start_filter).datepicker();
        $(end_filter).datepicker();
        start_filter.value=get_my_past_date(get_my_time()-(7*86400000));
        end_filter.value=vTime.date();

        $('#report76').formcontrol();
    }

    function report76_ini()
    {
        var form=document.getElementById('report76_header');
        var awb_filter=form.elements['awb'].value;
        var channel_filter=form.elements['channel'].value;
        var manifest_filter=form.elements['manifest'].value;
        var status_filter=form.elements['status'].value;
        var start_filter=get_raw_time(form.elements['start'].value);
        var end_filter=get_raw_time(form.elements['end'].value)+86399999;

        show_loader();
        $('#report76_body').html('');

        var paginator=$('#report76_body').paginator({'page_size':25});

        var columns={count:paginator.page_size(),
                    start_index:paginator.get_index(),
                    data_store:'logistics_orders',
					access:{},
                    indexes:[{index:'id'},
                            {index:'awb_num',value:awb_filter},
                            {index:'import_date',lowerbound:start_filter,upperbound:end_filter},
                            {index:'drs_time'},
                            {index:'order_num'},
                            {index:'weight'},
                            {index:'pieces'},
                            {index:'status',value:status_filter},
                            {index:'manifest_id',value:manifest_filter},
                            {index:'channel_name',value:channel_filter},
                            {index:'manifest_type'},
                            {index:'merchant_name'},
                            {index:'phone'},
                            {index:'sku'},
                            {index:'delivery_person'},
                            {index:'collectable_value'},
                            {index:'ship_to'},
                            {index:'address1'},
                            {index:'address2'},
                            {index:'address3'},
                            {index:'city'},
                            {index:'return_address1'},
                            {index:'return_address2'},
                            {index:'return_address3'},
                            {index:'drs_num'}]};

        read_json_rows('report76',columns,function(items)
        {
            var rowsHTML="";
            items.forEach(function(item)
            {
                rowsHTML+="<tr>";
                rowsHTML+="<form id='report76_"+item.id+"'></form>";
                rowsHTML+="<td data-th='AWB #'>";
				    rowsHTML+="<a onclick=\"element_display('','form198');form198_ini('"+item.awb_num+"');\">"+item.awb_num+"</a>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Manifest Id'>";
                    rowsHTML+=item.manifest_id;
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Date'>";
                    rowsHTML+=get_my_past_date(item.import_date);
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Status'>";
                    rowsHTML+=item.status;
                rowsHTML+="</td>";
                rowsHTML+="</tr>";

            });
            $('#report76_body').append(rowsHTML);
			$('#report76').formcontrol();

            initialize_tabular_report_buttons(columns,'Order Status','report76',function (item)
            {
                item['AWB No']=item.awb_num;
                item['Order Id']=item.order_num;
                item['Import Date']=get_my_past_date(item.import_date);
                item['Manifest Id']=get_my_past_date(item.manifest_id);
                item['Channel']=item.channel_name;
                item['Status']=item.status;
                item['Wt']=item.weight;
                item['Pcs']=item.pieces;
                item['COD Amount']=item.collectable_value;
                item['Delivery Boy']=item.delivery_person;
                item['AWB Type']=item.manifest_type;
                item['Customer Name']=item.merchant_name;
                item['Customer Address']=item.return_address1+", "+item.return_address2+", "+item.return_address3;
                item['Consignee Name']=item.ship_to;
                item['Consignee Address']=item.address1+", "+item.address2+", "+item.address3;
                item['City']=item.city;
                item['Pincode']=item.pincode;
                item['Mobile No']=item.phone;
                item['Product Name']=item.sku;

                delete item.id;
                delete item.awb_num;
                delete item.import_date;
                delete item.order_num;
                delete item.weight;
                delete item.pieces;
                delete item.status;
                delete item.channel_name;
                delete item.manifest_type;
                delete item.merchant_name;
                delete item.phone;
                delete item.sku;
                delete item.delivery_person;
                delete item.collectable_value;
                delete item.ship_to;
                delete item.address1;
                delete item.address2;
                delete item.address3;
                delete item.city;
                delete item.pincode;
                delete item.return_address1;
                delete item.return_address2;
                delete item.return_address3;
            });

            paginator.update_index(items.length);
            hide_loader();
        });
    };

	</script>
</div>
