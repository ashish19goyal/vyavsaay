<div id='report117' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report117_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report117_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report117_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report117_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="AWB #" class='floatlabel' name='awb'></label>
				<label><input type='text' placeholder="Channel" class='floatlabel' name='channel'></label>
				<label><input type='text' placeholder="Pickup Date" class='floatlabel' name='date'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>AWB #</th>
		            <th>Pickup Date</th>
		            <th>Consignee</th>
		            <th>Merchant</th>
					<th>Status</th>
        		</tr>
			</thead>
			<tbody id='report117_body'></tbody>
		</table>
	</div>

	<script>

    function report117_header_ini()
    {
        var form=document.getElementById('report117_header');
        var awb_filter=form.elements['awb'];
		var channel_filter=form.elements['channel'];
		var date_filter=form.elements['date'];

		set_static_filter_json('logistics_orders','channel',channel_filter);

        $(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report117_ini();
        });

        $(date_filter).datepicker();
        setTimeout(function(){$('#report117').formcontrol();},500);
    }

    function report117_ini()
    {
        var form=document.getElementById('report117_header');
        var awb_filter=form.elements['awb'].value;
		var channel_filter=form.elements['channel'].value;
		var date_filter=vTime.unix({date:form.elements['date'].value});

        show_loader();
        $('#report117_body').html('');

        var paginator=$('#report117_body').paginator({'page_size':25});

        var columns={count:paginator.page_size(),
                    start_index:paginator.get_index(),
                    data_store:'logistics_orders',
					access:'yes',
                    indexes:[{index:'id'},
                        {index:'awb_num',value:awb_filter},
                        {index:'channel_name',value:channel_filter},
                        {index:'import_date',value:date_filter},
						{index:'merchant_name'},
						{index:'return_address1'},
						{index:'ship_to'},
						{index:'address1'},
						{index:'city'},
						{index:'phone'},
						{index:'sku'},
						{index:'pieces'},
						{index:'source',exact:'api'},
                        {index:'status',exact:'picked'}]};
		if(!vUtil.isBlank(date_filter)){
			var date_filter_index={index:'import_date',lowerbound:date_filter,upperbound:date_filter+86400000};
			columns.indexes.push(date_filter_index);
		}

        read_json_rows('report117',columns,function(items)
        {
            var rowsHTML="";
            items.forEach(function(item)
            {
                rowsHTML+="<tr>";
                rowsHTML+="<form id='report117_"+item.id+"'></form>";
                rowsHTML+="<td data-th='AWB #'>";
				    rowsHTML+="<a onclick=\"element_display('"+item.id+"','form198');\">"+item.awb_num+"</a>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Pickup Date'>";
					rowsHTML+=vTime.date({time:item.import_date});
                rowsHTML+="</td>";
				rowsHTML+="<td data-th='Consignee'>";
					rowsHTML+=item.ship_to+", "+item.address1+", "+item.city;
                rowsHTML+="</td>";
				rowsHTML+="<td data-th='Merchant'>";
					rowsHTML+=item.merchant_name;
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Status'>";
                    rowsHTML+=item.status;
                rowsHTML+="</td>";
                rowsHTML+="</tr>";
            });
            $('#report117_body').append(rowsHTML);

            initialize_tabular_report_buttons(columns,'New Orders from API','report117',function (item)
            {
				item['Pickup Date']=vTime.date({time:item.import_date});
				item['Pickup Time']=vTime.time({time:item.import_date});
				item['Product']=item.sku;
				delete item.source;
				delete item.sku;
				delete item.import_date;
			});

            paginator.update_index(items.length);
            hide_loader();
        });
    };

	</script>
</div>
