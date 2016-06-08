<div id='report108' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report108_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report108_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report108_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report108_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Policy Holder" class='floatlabel' name='holder'></label>
				<label><input type='text' placeholder="Agent" class='floatlabel' name='agent'></label>
				<label><input type='text' placeholder="Expiries Upto" class='floatlabel' name='upto'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Policy #</th>
          <th>Policy Holder</th>
          <th>Agent</th>
          <th>Expiry Date</th>
        </tr>
			</thead>
			<tbody id='report108_body'></tbody>
		</table>
	</div>

	<script>

    function report108_header_ini()
    {
        var form=document.getElementById('report108_header');
        var end_filter=form.elements['upto'];
				var holder_filter=form.elements['holder'];
				var agent_filter=form.elements['agent'];

				var agent_data={data_store:'staff',return_column:'acc_name'};
				set_my_filter_json(agent_data,agent_filter);

				var holder_data={data_store:'customers',return_column:'acc_name'};
				set_my_filter_json(holder_data,holder_filter);

        $(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report108_ini();
        });

        $(end_filter).datepicker();
        end_filter.value=vTime.date({addDays:30});

        $('#report108').formcontrol();
    }

    function report108_ini()
    {
        var form=document.getElementById('report108_header');
        var agent_filter=form.elements['agent'].value;
				var holder_filter=form.elements['holder'].value;
				var end_filter=get_raw_time(form.elements['upto'].value)+86399999;

        show_loader();
        $('#report108_body').html('');

        var paginator=$('#report108_body').paginator({'page_size':25});

        var columns={count:paginator.page_size(),
                    start_index:paginator.get_index(),
                    data_store:'policies',
                    indexes:[{index:'id'},
                        {index:'policy_num'},
                        {index:'end_date',upperbound:end_filter},
                        {index:'agent',value:agent_filter},
                        {index:'policy_holder',value:holder_filter},
                        {index:'status',exact:'active'}]};

        read_json_rows('report108',columns,function(items)
        {
            var rowsHTML="";
            items.forEach(function(item)
            {
                rowsHTML+="<tr>";
                rowsHTML+="<form id='report108_"+item.id+"'></form>";
                rowsHTML+="<td data-th='Policy #'>";
				    			rowsHTML+="<a onclick=\"show_object('policies','"+item.policy_num+"');\">"+item.policy_num+"</a>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Policy Holder'>";
									rowsHTML+="<a onclick=\"show_object('customers','"+item.policy_holder+"');\">"+item.policy_holder+"</a>";
                rowsHTML+="</td>";
								rowsHTML+="<td data-th='Agent'>";
									rowsHTML+="<a onclick=\"show_object('staff','"+item.agent+"');\">"+item.agent+"</a>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Expiry Date'>";
                    rowsHTML+=get_my_past_date(item.end_date);
                rowsHTML+="</td>";
                rowsHTML+="</tr>";
            });
            $('#report108_body').append(rowsHTML);

            initialize_tabular_report_buttons(columns,'Policy Expiry Report','report108',function (item)
            {
                item['Policy No']=item.policy_num;
                item['Issuer']=item.issuer;
                item['Policy Name']=item.policy_name;
                item['Policy Type']=item.type;
								item['Policy Description']=item.description;
								item['Issue Date']=vTime.date({time:item.issue_date});
								item['Policy Start Date']=vTime.date({time:item.start_date});
								item['Policy End Date']=vTime.date({time:item.end_date});
								item['Policy Holder']=item.policy_holder;
								item['Agent']=item.agent;
                item['Status']=item.status;

                delete item.id;
                delete item.policy_num;
                delete item.issuer;
                delete item.policy_name;
                delete item.type;
                delete item.description;
                delete item.status;
                delete item.issue_date;
                delete item.start_date;
                delete item.end_date;
                delete item.policy_holder;
                delete item.agent;
            });

            paginator.update_index(items.length);
            hide_loader();
        });
    };

	</script>
</div>
