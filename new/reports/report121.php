<div id='report121' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report121_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report121_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report121_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report121_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Filter By" class='floatlabel' name='filter'></label>
				<label><input type='text' placeholder="Filter Value" class='floatlabel' name='v'></label>
				<label><input type='text' placeholder="From Date" class='floatlabel' name='from'></label>
				<label><input type='text' placeholder="To Date" class='floatlabel' name='to'></label>
				<input type='hidden' name='index' value='status'>
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
				</tr>
			</thead>
			<tbody id='report121_body'></tbody>
		</table>
	</div>

	<script>

    function report121_header_ini()
    {
        var form=document.getElementById('report121_header');
        var f_filter=form.elements['filter'];
		var v_filter=form.elements['v'];
		var from_filter=form.elements['from'];
		var to_filter=form.elements['to'];
		var f_filter_index=form.elements['index'];

		var data=['Application #','Policy #','Issue Type','Start Date','Issue Date',
					'Tele Caller','Sales Manager','Team Lead','Agent','Issuing Company',
					'Policy Name','Policy Holder','Preferred','Term'];
		set_value_list_json(data,f_filter);

		$(from_filter).datepicker();
		$(to_filter).datepicker();

		function s(x){
			if(!vUtil.isBlank(x) && x=='d'){
				$(from_filter).show();
				$(to_filter).show();
				$(v_filter).hide();
				$('#report121').formcontrol();
			}else{
				$(from_filter).hide();
				$(to_filter).hide();
				$(v_filter).show();
				var value_data={data_store:'policies',return_column:f_filter_index.value};
				set_my_filter_json(value_data,v_filter);
			}
			v_filter.value="";
			from_filter.value="";
			to_filter.value="";
		}

		s();
		f_filter.value="";
		vUtil.onChange(f_filter,function()
		{
			switch(f_filter.value)
			{
				case 'Application #': f_filter_index.value = 'application_num'; s(); break;
				case 'Policy #': f_filter_index.value = 'policy_num'; s(); break;
				case 'Issue Type': f_filter_index.value = 'issue_type'; s(); break;
				case 'Start Date':  f_filter_index.value = 'start_date'; s('d'); break;
				case 'Issue Date':  f_filter_index.value = 'issue_date'; s('d'); break;
				case 'Tele Caller': f_filter_index.value = 'tele_caller'; s(); break;
				case 'Sales Manager': f_filter_index.value = 'sales_manager'; s(); break;
				case 'Team Lead': f_filter_index.value = 'team_lead'; s(); break;
				case 'Agent': f_filter_index.value = 'agent'; s(); break;
				case 'Issuing Company': f_filter_index.value = 'issuer'; s(); break;
				case 'Policy Name': f_filter_index.value = 'policy_name'; s(); break;
				case 'Policy Holder': f_filter_index.value = 'policy_holder'; s(); break;
				case 'Preferred': f_filter_index.value = 'preferred'; s(); break;
				case 'Term': f_filter_index.value = 'term'; s(); break;
				default: f_filter_index.value = 'status'; s();
			}
		});

		$(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report121_ini();
        });

        setTimeout(function(){$('#report121').formcontrol();},500);
    }

    function report121_ini()
    {
        var form=document.getElementById('report121_header');
        var f_filter_index=form.elements['index'].value;
		var v_filter=form.elements['v'].value;
		var from_filter=vTime.unix({date:form.elements['from'].value});
		var to_filter=vTime.unix({date:form.elements['to'].value});

        show_loader();
        $('#report121_body').html('');

        var paginator=$('#report121_body').paginator({'page_size':25});

		var renewed_data={data_store:'policies',return_column:'application_number'};
		read_json_single_column(renewed_data,function(renewals)
		{
			console.log(renewals);
	        var columns={count:paginator.page_size(),
	                    start_index:paginator.get_index(),
	                    data_store:'policies',
						indexes:[{index:'id'},
	                        {index:'policy_num',anti_array:renewals},
	                        {index:'application_num'},
	                        {index:'policy_holder'},
							{index:'agent'},
							{index:'sum_insured'},
							{index:'premium'},
							{index:'issue_date'},
							{index:'end_date',upperbound:vTime.unix()},
							{index:'status'}]};
			if(!vUtil.isBlank(v_filter)){
				columns.indexes.push({index:f_filter_index,value:v_filter});
			}
			else{
				if(!vUtil.isBlank(from_filter)){
					columns.indexes.push({index:f_filter_index,lowerbound:from_filter});
				}
			 	if(!vUtil.isBlank(to_filter)){
					columns.indexes.push({index:f_filter_index,upperbound:to_filter});
				}
			}

	        read_json_rows('report121',columns,function(items)
	        {
	            var rowsHTML="";
	            items.forEach(function(item)
	            {
	                rowsHTML+="<tr>";
	                rowsHTML+="<form id='report121_"+item.id+"'></form>";
	                rowsHTML+="<td data-th='Application #'>";
					    rowsHTML+=item.application_num;
	                rowsHTML+="</td>";
					rowsHTML+="<td data-th='Policy #'>";
						rowsHTML+="<a onclick=\"show_object('policies','"+item.policy_num+"');\">"+item.policy_num+"</a>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Policy Holder'>";
						rowsHTML+="<a onclick=\"show_object('customers','"+item.policy_holder+"');\">"+item.policy_holder+"</a>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Agent'>";
						rowsHTML+=item.agent;
	                rowsHTML+="</td>";
					rowsHTML+="<td data-th='Sum Insured'>";
						rowsHTML+=item.sum_insured;
	                rowsHTML+="</td>";
					rowsHTML+="<td data-th='Premium'>";
						rowsHTML+=item.premium;
	                rowsHTML+="</td>";
					rowsHTML+="<td data-th='End Date'>";
						rowsHTML+=vTime.date({time:item.end_date});
	                rowsHTML+="</td>";
	                rowsHTML+="</tr>";
	            });
	            $('#report121_body').append(rowsHTML);

	            initialize_tabular_report_buttons(columns,'Policies Report','report121',function (item)
	            {
					item['End Date']=vTime.date({time:item.end_date});
					delete item.end_date;
				});

	            paginator.update_index(items.length);
	            hide_loader();
	        });
		});
    };

	</script>
</div>
