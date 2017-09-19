<div id='report129' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report129_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report129_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report129_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report129_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="AWB #" class='floatlabel' name='awb'></label>
				<label><input type='text' placeholder="Order #" class='floatlabel' name='order'></label>
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
                    <th>Order #</th>
					<th>Consignee</th>
                    <th>Import Date</th>
                    <th>Status</th>
                </tr>
			</thead>
			<tbody id='report129_body'></tbody>
		</table>
	</div>

	<script>

    function report129_header_ini()
    {
        var form=document.getElementById('report129_header');
        var awb_filter=form.elements['awb'];
        var order_filter=form.elements['order'];
        var status_filter=form.elements['status'];
        var start_filter=form.elements['start'];
        var end_filter=form.elements['end'];

        $(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report129_ini();
        });

        set_static_filter_json('logistics_orders','status',status_filter);

        $(start_filter).datepicker();
        $(end_filter).datepicker();
        start_filter.value=get_my_past_date(get_my_time()-(7*86400000));
        end_filter.value=vTime.date();

        setTimeout(function(){$('#report129').formcontrol();},500);
    }

    function report129_ini()
    {
        var form=document.getElementById('report129_header');
        var awb_filter=form.elements['awb'].value;
        var order_filter=form.elements['order'].value;
        var status_filter=form.elements['status'].value;
        var start_filter=get_raw_time(form.elements['start'].value);
        var end_filter=get_raw_time(form.elements['end'].value)+86399999;

        show_loader();
        $('#report129_body').html('');

        var paginator=$('#report129_body').paginator({'page_size':50});

        var columns={count:paginator.page_size(),
                    start_index:paginator.get_index(),
                    data_store:'logistics_orders',
					indexes:[{index:'id'},
                            {index:'awb_num',value:awb_filter},
                            {index:'import_date',lowerbound:start_filter,upperbound:end_filter},
                            {index:'order_num'},
                            {index:'weight'},
                            {index:'pieces'},
							{index:'manifest_type'},
                            {index:'status',value:status_filter},
                            {index:'channel_name',value:'Shopclues'},
                            {index:'merchant_name'},
                            {index:'phone'},
                            {index:'sku'},
                            {index:'collectable_value'},
                            {index:'ship_to'},
                            {index:'address1'},
                            {index:'address2'},
                            {index:'address3'},
                            {index:'city'}]};

        read_json_rows('report129',columns,function(items)
        {
            var rowsHTML="";
            items.forEach(function(item)
            {
                rowsHTML+="<tr>";
                rowsHTML+="<form id='report129_"+item.id+"'></form>";
                rowsHTML+="<td data-th='AWB #'>";
				    rowsHTML+=item.awb_num;
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Order #'>";
                    rowsHTML+=item.order_num;
                rowsHTML+="</td>";
				rowsHTML+="<td data-th='Consignee'>";
                    rowsHTML+=item.ship_to+"<br>"+item.address1;
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Import Date'>";
                    rowsHTML+=get_my_past_date(item.import_date);
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Status'>";
                    rowsHTML+=item.status;
                rowsHTML+="</td>";
                rowsHTML+="</tr>";

            });
            $('#report129_body').append(rowsHTML);
			$('#report129').formcontrol();

			vExport.export_buttons({action:'dynamic',columns:columns,file:'Beacon MIS',report_id:'report129',feach:function (item)
            {
                item['AWB No']=item.awb_num;
                item['Order Id']=item.order_num;
                item['Import Date']=get_my_past_date(item.import_date);
                item['Status']=item.status;
                item['Wt']=item.weight;
                item['Pcs']=item.pieces;
                item['COD Amount']=item.collectable_value;
                item['AWB Type']=item.manifest_type;
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
                delete item.merchant_name;
				delete item.manifest_type;
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
            }});

            paginator.update_index(items.length);
            hide_loader();
        });
    };

	</script>
</div>
