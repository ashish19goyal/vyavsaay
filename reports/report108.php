<div id='report108' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report108_ini();'>Refresh</a>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=report108_add_filter();>Add Filter</a>
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
			<input type='submit' class='submit_hidden'>
			<fieldset id='report108_filters'></fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Issuing Company</th>
					<th>Policy #</th>
					<th>Policy Holder</th>
					<th>Agent</th>
		            <th>Premium</th>
		            <th>Expiry Date</th>
					<th>Renew</th>
        		</tr>
			</thead>
			<tbody id='report108_body'></tbody>
		</table>
	</div>

	<script>

	function report108_add_filter()
	{
		var form=document.getElementById('report108_header');
		var f_filter=document.createElement('input');
		f_filter.type='text';
		f_filter.placeholder='Filter By';
		f_filter.className='floatlabel';
		f_filter.setAttribute('data-name','f');

		var v_filter=document.createElement('input');
		v_filter.type='text';
		v_filter.placeholder='Filter Value';
		v_filter.className='floatlabel';
		v_filter.setAttribute('data-name','v');

		var i_filter=document.createElement('input');
		i_filter.type='hidden';
		i_filter.setAttribute('data-name','i');
		i_filter.value='status';

		var from_filter=document.createElement('input');
		from_filter.type='text';
		from_filter.placeholder='From Date';
		from_filter.className='floatlabel';
		from_filter.setAttribute('data-name','from');

		var to_filter=document.createElement('input');
		to_filter.type='text';
		to_filter.placeholder='To Date';
		to_filter.className='floatlabel';
		to_filter.setAttribute('data-name','to');

		var remove_link = document.createElement('a');
		remove_link.onclick = function(){
			$(this).parent().parent().remove();
		};
		remove_link.style="vertical-align:top";
		remove_link.title="Remove Filter";
		remove_link.innerHTML = "<i class='fa fa-times' style='font-size:25px;margin-top:20px;'></i>";

		var row=document.createElement('div');
		row.className='row';
		var col=document.createElement('div');
		col.className='col-md-12';

		var label1=document.createElement('label');
		var label2=document.createElement('label');
		var label3=document.createElement('label');
		var label4=document.createElement('label');
		// var label5=document.createElement('label');

		row.appendChild(col);
		col.appendChild(label1);
		col.appendChild(label2);
		col.appendChild(label3);
		col.appendChild(label4);
		col.appendChild(remove_link);

		label1.appendChild(f_filter);
		label2.appendChild(v_filter);
		label3.appendChild(from_filter);
		label4.appendChild(to_filter);
		// label5.appendChild(remove_link);
		col.appendChild(i_filter);

		var fieldset=document.getElementById('report108_filters');
		fieldset.appendChild(row);

		var data=['Application #','Policy #','Issue Type','End Date','Start Date','Issue Date',
					'Tele Caller','Sales Manager','Team Lead','Agent','Issuing Company',
					'Policy Name','Policy Holder','Preferred','Term','Out Source'];
		set_value_list_json(data,f_filter);

		$(from_filter).datepicker();
		$(to_filter).datepicker();

		function s(x){
			if(!vUtil.isBlank(x) && x=='d'){
				$(from_filter).show();
				$(to_filter).show();
				$(v_filter).hide();
				$('#report108').formcontrol();
			}else{
				$(from_filter).hide();
				$(to_filter).hide();
				$(v_filter).show();
				var value_data={data_store:'policies',return_column:i_filter.value};
				set_my_filter_json(value_data,v_filter);
			}
			v_filter.value="";
			from_filter.value="";
			to_filter.value="";
		}

		s();
		vUtil.onChange(f_filter,function()
		{
			switch(f_filter.value)
			{
				case 'Application #': i_filter.value = 'application_num'; s(); break;
				case 'Policy #': i_filter.value = 'policy_num'; s(); break;
				case 'Issue Type': i_filter.value = 'issue_type'; s(); break;
				case 'End Date':  i_filter.value = 'end_date'; s('d'); break;
				case 'Start Date':  i_filter.value = 'start_date'; s('d'); break;
				case 'Issue Date':  i_filter.value = 'issue_date'; s('d'); break;
				case 'Tele Caller': i_filter.value = 'tele_caller'; s(); break;
				case 'Sales Manager': i_filter.value = 'sales_manager'; s(); break;
				case 'Team Lead': i_filter.value = 'team_lead'; s(); break;
				case 'Agent': i_filter.value = 'agent'; s(); break;
				case 'Issuing Company': i_filter.value = 'issuer'; s(); break;
				case 'Policy Name': i_filter.value = 'policy_name'; s(); break;
				case 'Policy Holder': i_filter.value = 'policy_holder'; s(); break;
				case 'Preferred': i_filter.value = 'preferred'; s(); break;
				case 'Term': i_filter.value = 'term'; s(); break;
				case 'Out Source': i_filter.value = 'out_source'; s(); break;
				default: i_filter.value = 'status'; s();
			}
		});
		$('#report108').formcontrol();
	}

    function report108_header_ini()
    {
        var form=document.getElementById('report108_header');

		$('#report108_filters').html('');
		report108_add_filter();

        $(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report108_ini();
        });

        $('#report108').formcontrol();
    }

    function report108_ini()
    {
        var form=document.getElementById('report108_header');

        show_loader();
        $('#report108_body').html('');

        var paginator=$('#report108_body').paginator({'page_size':50});

		var renewed_policies={data_store:'policies',return_column:'application_num'};

		read_json_single_column(renewed_policies,function(app_nums)
		{
	        var columns={count:paginator.page_size(),
	                    start_index:paginator.get_index(),
	                    data_store:'policies',
	                    indexes:[{index:'id'},
	                        {index:'policy_num',anti_array:app_nums},
	                        {index:'end_date'},
	                        {index:'agent'},
							{index:'issuer'},
							{index:'policy_name'},
							{index:'type'},
							{index:'description'},
							{index:'issue_date'},
							{index:'start_date'},
							{index:'premium'},
	                        {index:'policy_holder'},
	                        {index:'status',exact:'issued'}]};

			$('#report108_filters .row').each(function(index)
			{
				var row = this;
				var f_filter = $(this).find("input[data-name='f']").val();
				var v_filter = $(this).find("input[data-name='v']").val();
				var i_filter = $(this).find("input[data-name='i']").val();
				var from_filter = $(this).find("input[data-name='from']").val();
				var to_filter = $(this).find("input[data-name='to']").val();

				if(!vUtil.isBlank(v_filter)){
					columns.indexes.push({index:i_filter,value:v_filter});
				}
				else{
					if(!vUtil.isBlank(from_filter)){
						columns.indexes.push({index:i_filter,lowerbound:vTime.unix({date:from_filter})});
					}
				 	if(!vUtil.isBlank(to_filter)){
						columns.indexes.push({index:i_filter,upperbound:vTime.unix({date:to_filter})});
					}
				}
			});

	        read_json_rows('report108',columns,function(items)
	        {
	            var rowsHTML="";
	            items.forEach(function(item)
	            {
	                rowsHTML+="<tr>";
	                rowsHTML+="<form id='report108_"+item.id+"'></form>";
					rowsHTML+="<td data-th='Issuing Company'>";
	                    rowsHTML+=item.issuer;
	                rowsHTML+="</td>";
					rowsHTML+="<td data-th='Policy #'>";
					    rowsHTML+="<a onclick=\"show_object('policies','"+item.policy_num+"');\">"+item.policy_num+"</a>";
	                rowsHTML+="</td>";
					rowsHTML+="<td data-th='Policy Holder'>";
						rowsHTML+="<a onclick=\"show_object('customers','"+item.policy_holder+"');\">"+item.policy_holder+"</a>";
	                rowsHTML+="</td>";
					rowsHTML+="<td data-th='Agent'>";
						rowsHTML+="<a onclick=\"show_object('staff','"+item.agent+"');\">"+item.agent+"</a>";
	                rowsHTML+="</td>";
	                rowsHTML+="<td data-th='Premium'>";
	                    rowsHTML+=item.premium;
	                rowsHTML+="</td>";
	                rowsHTML+="<td data-th='Expiry Date'>";
	                    rowsHTML+=get_my_past_date(item.end_date);
	                rowsHTML+="</td>";
					rowsHTML+="<td data-th='Renew'>";
	                    rowsHTML+="<button class='btn green' onclick=\"modal217_action('"+item.id+"');\"><i class='fa fa-refresh'> Renew</button>";
	                rowsHTML+="</td>";
	                rowsHTML+="</tr>";
	            });
	            $('#report108_body').append(rowsHTML);

	            initialize_tabular_report_buttons(columns,'Policy Expiry Report','report108',function (item)
	            {
	                item['Policy No']=item.policy_num;
	                item['Issuer']=item.issuer;
					item['Policy Name']=item.policy_name;
					item['Premium']=item.premium;
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
					delete item.premium;
	            });

	            paginator.update_index(items.length);
	            hide_loader();
	        });
		});
    };

	</script>
</div>
