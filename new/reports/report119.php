<div id='report119' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report119_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report119_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report119_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report119_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Filter By" class='floatlabel' name='filter'></label>
				<label><input type='text' placeholder="Filter Value" class='floatlabel' name='v'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Application #</th>
		            <th>Policy #</th>
		            <th>Holder</th>
		            <th>Agent</th>
					<th>Sum Insured</th>
					<th>Premium</th>
					<th>End Date</th>
					<th>Status</th>
        		</tr>
			</thead>
			<tbody id='report119_body'></tbody>
		</table>
	</div>

	<script>

    function report119_header_ini()
    {
        var form=document.getElementById('report119_header');
        var f_filter=form.elements['filter'];
		var v_filter=form.elements['v'];

		var data=['Application #','Policy #','Issue Type','End Date','Start Date','Issue Date',
					'Tele Caller','Sales Manager','Team Lead','Agent','Issuing Company',
					'Policy Name','Policy Holder','Preferred','Term'];
		set_value_list_json(data,f_filter);

		vUtil.onChange(f_filter,function()
		{
			var value_data={data_store:'policies'};
			swtich(f_filter.value)
			{
				case 'Application #': value_data['return_column'] = 'applciation_num'; break;
				case 'Policy #': value_data['return_column'] = 'policy_num'; break;
				case 'Issue Type': value_data['return_column'] = 'issue_type'; break;
				case 'End Date':  break;
				case 'Start Date':  break;
				case 'Issue Date':  break;
				case 'Tele Caller': value_data['return_column'] = 'applciation_num'; break;
				case 'Application #': value_data['return_column'] = 'applciation_num'; break;
				case 'Application #': value_data['return_column'] = 'applciation_num'; break;
				case 'Application #': value_data['return_column'] = 'applciation_num'; break;
				case 'Application #': value_data['return_column'] = 'applciation_num'; break;
				case 'Application #': value_data['return_column'] = 'applciation_num'; break;
			}
			set_my_filter_json(value_data,v_filter);
		});

		$(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report119_ini();
        });

        setTimeout(function(){$('#report119').formcontrol();},500);
    }

    function report119_ini()
    {
        var form=document.getElementById('report119_header');
        var awb_filter=form.elements['awb'].value;
		var channel_filter=form.elements['channel'].value;
		var date_filter=get_raw_time(form.elements['date'].value);

        show_loader();
        $('#report119_body').html('');

        var paginator=$('#report119_body').paginator({'page_size':25});

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
						{index:'source',exact:'api'},
                        {index:'status',exact:'picked'}]};

        read_json_rows('report119',columns,function(items)
        {
            var rowsHTML="";
            items.forEach(function(item)
            {
                rowsHTML+="<tr>";
                rowsHTML+="<form id='report119_"+item.id+"'></form>";
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
            $('#report119_body').append(rowsHTML);

            initialize_tabular_report_buttons(columns,'New Orders from API','report119',function (item)
            {
				item['Pickup Date']=vTime.date({time:item.import_date});
				delete item.source;
			});

            paginator.update_index(items.length);
            hide_loader();
        });
    };

	</script>
</div>
