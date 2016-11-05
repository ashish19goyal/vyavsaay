<div id='report111' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report111_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report111_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report111_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report111_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="AWB #" class='floatlabel' name='awb'></label>
				<label><input type='text' placeholder="Branch" class='floatlabel' name='branch'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>AWB #</th>
		            <th>Consignee</th>
		            <th>Merchant</th>
					<th>COD Amount</th>
					<th>Status</th>
        		</tr>
			</thead>
			<tbody id='report111_body'></tbody>
		</table>
	</div>

	<script>

    function report111_header_ini()
    {
        var form=document.getElementById('report111_header');
        var awb_filter=form.elements['awb'];
		var branch_filter=form.elements['branch'];

		var branch_data={data_store:'store_areas',return_column:'name'};
		set_my_filter_json(branch_data,branch_filter);

        $(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report111_ini();
        });

        $('#report111').formcontrol();
    }

    function report111_ini()
    {
        var form=document.getElementById('report111_header');
        var awb_filter=form.elements['awb'].value;
		var branch_filter=form.elements['branch'].value;

        show_loader();
        $('#report111_body').html('');

        var paginator=$('#report111_body').paginator({'page_size':25});

        var columns={count:paginator.page_size(),
                    start_index:paginator.get_index(),
                    data_store:'logistics_orders',
                    access:'yes',
					indexes:[{index:'id'},
                        {index:'awb_num',value:awb_filter},
                        {index:'ship_to'},
						{index:'merchant_name'},
						{index:'address1'},
						{index:'city'},
						{index:'phone'},
						{index:'branch',value:branch_filter},
						{index:'collectable_value'},
                        {index:'status',array:['received','out for delivery','pending','undelivered']}]};

        read_json_rows('report111',columns,function(items)
        {
            var rowsHTML="";
            items.forEach(function(item)
            {
                rowsHTML+="<tr>";
                rowsHTML+="<form id='report111_"+item.id+"'></form>";
                rowsHTML+="<td data-th='AWB #'>";
				    rowsHTML+="<a onclick=\"element_display('"+item.id+"','form198');\">"+item.awb_num+"</a>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Consignee'>";
					rowsHTML+=item.ship_to+", "+item.address1+", "+item.city;
                rowsHTML+="</td>";
				rowsHTML+="<td data-th='Merchant'>";
					rowsHTML+=item.merchant_name;
                rowsHTML+="</td>";
				rowsHTML+="<td data-th='COD Amount'>";
					rowsHTML+="Rs. "+item.collectable_value;
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Status'>";
                    rowsHTML+=item.status;
                rowsHTML+="</td>";
                rowsHTML+="</tr>";
            });
            $('#report111_body').append(rowsHTML);

			vExport.export_buttons({action:'dynamic',columns:columns,file:'Orders Not Received',report_id:'report111'});

            paginator.update_index(items.length);
            hide_loader();
        });
    };

	</script>
</div>
