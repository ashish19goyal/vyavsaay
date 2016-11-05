<div id='report109' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report109_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report109_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report109_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report109_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="AWB #" class='floatlabel' name='awb'></label>
				<label><input type='text' placeholder="Channel" class='floatlabel' name='channel'></label>
				<label><input type='text' placeholder="Import Date" class='floatlabel' name='date'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>AWB #</th>
		            <th>Import Date</th>
		            <th>Consignee</th>
		            <th>Merchant</th>
					<th>Status</th>
        		</tr>
			</thead>
			<tbody id='report109_body'></tbody>
		</table>
	</div>

	<script>

    function report109_header_ini()
    {
        var form=document.getElementById('report109_header');
        var awb_filter=form.elements['awb'];
		var channel_filter=form.elements['channel'];
		var date_filter=form.elements['date'];

		set_static_filter_json('logistics_orders','channel',channel_filter);

        $(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report109_ini();
        });

        $(date_filter).datepicker();
        setTimeout(function(){$('#report109').formcontrol();},500);
    }

    function report109_ini()
    {
        var form=document.getElementById('report109_header');
        var awb_filter=form.elements['awb'].value;
		var channel_filter=form.elements['channel'].value;
		var date_filter=get_raw_time(form.elements['date'].value);

        show_loader();
        $('#report109_body').html('');

        var paginator=$('#report109_body').paginator({'page_size':25});

        var columns={count:paginator.page_size(),
                    start_index:paginator.get_index(),
                    data_store:'logistics_orders',
					access:'yes',
                    indexes:[{index:'id'},
                        {index:'awb_num',value:awb_filter},
                        {index:'channel_name',value:channel_filter},
                        {index:'import_date',value:date_filter},
						{index:'ship_to'},
						{index:'merchant_name'},
						{index:'address1'},
						{index:'city'},
						{index:'phone'},
                        {index:'status',exact:'picked'}]};

        read_json_rows('report109',columns,function(items)
        {
            var rowsHTML="";
            items.forEach(function(item)
            {
                rowsHTML+="<tr>";
                rowsHTML+="<form id='report109_"+item.id+"'></form>";
                rowsHTML+="<td data-th='AWB #'>";
				    rowsHTML+="<a onclick=\"element_display('"+item.id+"','form198');\">"+item.awb_num+"</a>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Import Date'>";
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
            $('#report109_body').append(rowsHTML);

			vExport.export_buttons({action:'dynamic',columns:columns,file:'Orders Not Received',report_id:'report109',feach:function (item)
            {
				item.import_date=vTime.date({time:item.import_date});
			}});

            paginator.update_index(items.length);
            hide_loader();
        });
    };

	</script>
</div>
