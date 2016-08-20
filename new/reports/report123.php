<div id='report123' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report123_ini();'>Refresh</a>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=report123_add_filter();>Add Filter</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report123_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report123_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report123_header' autocomplete="off">
			<input type='submit' class='submit_hidden'>
			<fieldset id='report123_filters'></fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Issuing Company</th>
		            <th>Agent</th>
					<th>Policy #</th>
					<th>Premium</th>
					<th>Basic Comm.</th>
					<th>ORC Comm.</th>
				</tr>
			</thead>
			<tbody id='report123_body'></tbody>
		</table>
	</div>

	<script>

	function report123_add_filter()
	{
		var form=document.getElementById('report123_header');
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

		var fieldset=document.getElementById('report123_filters');
		fieldset.appendChild(row);

		var data=['Application #','Policy #','Issue Type','End Date','Start Date','Issue Date',
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
				$('#report123').formcontrol();
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
				default: i_filter.value = 'status'; s();
			}
		});
		$('#report123').formcontrol();
	}

    function report123_header_ini()
    {
		var form=document.getElementById('report123_header');
		$('#report123_filters').html('');
		report123_add_filter();

		$(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report123_ini();
        });

        setTimeout(function(){$('#report123').formcontrol();},500);
    }

    function report123_ini()
    {
        var form=document.getElementById('report123_header');

        show_loader();
        $('#report123_body').html('');

        var paginator=$('#report123_body').paginator({'page_size':50});

        var columns={count:paginator.page_size(),
                    start_index:paginator.get_index(),
                    data_store:'policies',
					indexes:[{index:'id'},
                        {index:'issuer'},
                        {index:'agent'},
						{index:'premium'},
						{index:'policy_num'},
						{index:'policy_name'},
						{index:'status',exact:'issued'}]};

		$('#report123_filters .row').each(function(index)
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
					columns.indexes.push({index:i_filter,lowerbound:from_filter});
				}
			 	if(!vUtil.isBlank(to_filter)){
					columns.indexes.push({index:i_filter,upperbound:to_filter});
				}
			}
		});

		read_json_rows('report123',columns,function(policies)
        {
			var policy_names = vUtil.arrayColumn(policies,'policy_name');
			var bank_data={data_store:'policy_types',
							indexes:[{index:'name',array:policy_names},
									{index:'commissions'}]};
			read_json_rows('report123',bank_data,function(policy_types)
	        {
				var policy_num = vUtil.arrayColumn(policies,'policy_num');
				var commissions_data={data_store:'policy_commissions',
									indexes:[{index:'policy_num',array:policy_num},
											{index:'comm_percent'},
											{index:'amount'},
											{index:'commission_type'}]};
				read_json_rows('report123',commissions_data,function(commissions)
				{
					for(var i in commissions)
					{
						for(var a in policies)
						{
							if(policies[a].policy_num==commissions[i].policy_num)
							{
								policies[a][commissions[i].commission_type] = commissions[i].amount;
								policies[a][commissions[i].commission_type+"_percent"] = commissions[i].comm_percent;
								break;
							}
						}
					}

		            policies.forEach(function(item)
		            {
						var rowsHTML="<tr>";
		                rowsHTML+="<form id='report123_"+item.id+"'></form>";
		                rowsHTML+="<td data-th='Issuing Company'>";
							rowsHTML+=item.issuer;
		                rowsHTML+="</td>";
						rowsHTML+="<td data-th='Agent'>";
							rowsHTML+=item.agent;
		                rowsHTML+="</td>";
						rowsHTML+="<td data-th='Policy #'>";
							rowsHTML+="<a onclick=\"show_object('policies','"+item.policy_num+"');\">"+item.policy_num+"</a>";
		                rowsHTML+="</td>";
						rowsHTML+="<td data-th='Premium'>";
							rowsHTML+=item.premium;
		                rowsHTML+="</td>";
						rowsHTML+="<td data-th='Basic Comm.'>";
							rowsHTML+="<span class='label label-sm label-warning'><a id='report123_basic_"+item.id+"'>"+item.basic+"</a></span>";
		                rowsHTML+="</td>";
						rowsHTML+="<td data-th='ORC Comm.'>";
							rowsHTML+="<span class='label label-sm label-warning'><a id='report123_orc_"+item.id+"'>"+item.orc+"</a></span>";
						rowsHTML+="</td>";
						rowsHTML+="</tr>";

						$('#report123_body').append(rowsHTML);

		            });

					initialize_static_tabular_report_buttons('Commissions Validation','report123');

		            paginator.update_index(policies.length);
		            hide_loader();
				});
			});
        });
    };

	</script>
</div>
