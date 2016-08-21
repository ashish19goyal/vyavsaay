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

	<div class='modal_forms'>

	<a href='#report123_popup' data-toggle="modal" id='report123_popup_link'></a>
		<div id="report123_popup" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<form id='report123_popup_form' autocomplete="off">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
							<h4 class="modal-title">Valdiation Failed</h4>
						</div>
						<div class="modal-body">
							<div id='report123_popup_message' class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
								Validation Failed!
							</div>
						</div>
						<div class="modal-footer">
							<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
						</div>
					</form>
				</div>
			</div>
		</div>
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
						{index:'sum_insured'},
						{index:'term'},
						{index:'upsell'},
						{index:'issue_type'},
						{index:'issued_in_quarter'},
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
				var policy_commissions = vUtil.keyedArrayColumn(policy_types,'name','commissions');
				for(var i in policy_commissions){
					policy_commissions[i] = vUtil.jsonParse(policy_commissions[i]);
				}

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
							rowsHTML+="<span class='label label-sm' id='report123_basic_"+item.id+"'>"+item.basic+"</span>";
		                rowsHTML+="</td>";
						rowsHTML+="<td data-th='ORC Comm.'>";
							rowsHTML+="<span class='label label-sm' id='report123_orc_"+item.id+"'>"+item.orc+"</span>";
						rowsHTML+="</td>";
						rowsHTML+="</tr>";

						$('#report123_body').append(rowsHTML);

						report123_evaluate_commission('basic',item,policy_commissions);
						report123_evaluate_commission('orc',item,policy_commissions);
		            });

					initialize_static_tabular_report_buttons('Commissions Validation','report123');

		            paginator.update_index(policies.length);
		            hide_loader();
				});
			});
        });
    };

	function report123_evaluate_commission(comm_type,data,policy_commissions)
	{
		var commissions = policy_commissions[data.policy_name];
		var found=false;
		var match=false;

		if(!vUtil.isBlank(commissions))
		{
			commissions.forEach(function(commission)
			{
				if(commission.type.toLowerCase()==comm_type.toLowerCase() && commission.issue.toLowerCase()==data['issue_type'].toLowerCase() && !found)
				{
					commission.conditions = vUtil.jsonParse(commission.conditions);
					var all_match=true;
					commission.conditions.forEach(function(cond)
					{
						if((!vUtil.isBlank(cond.exact) && data[cond.index]!=cond.exact) || (!vUtil.isBlank(cond.lowerbound) && data[cond.index]<cond.lowerbound) || (!vUtil.isBlank(cond.upperbound) && data[cond.index]>cond.upperbound))
						{
							all_match=false;
						}
					});

					if(all_match)
					{
						found=true;
						if(parseFloat(data[comm_type+"_percent"])==parseFloat(commission.commission))
						{
							match=true;
						}
					}
				}
			});

			if(vUtil.isBlank(data[comm_type]))
			{
				$('#report123_'+comm_type+"_"+data.id).addClass('label-warning');
				$('#report123_'+comm_type+"_"+data.id).addClass('link');
				$('#report123_'+comm_type+"_"+data.id).click(function()
				{
					$('#report123_popup_message').html("Commission details have not been imported for this policy.");
					$('#report123_popup_link').click();
				});
			}
			else if(match && found)
			{
				$('#report123_'+comm_type+"_"+data.id).addClass('label-success');
			}
			else if(found)
			{
				$('#report123_'+comm_type+"_"+data.id).addClass('label-danger');
				$('#report123_'+comm_type+"_"+data.id).addClass('link');
				$('#report123_'+comm_type+"_"+data.id).click(function()
				{
					$('#report123_popup_message').html("Commission Amount doesn't match system settings. Please check.");
					$('#report123_popup_link').click();
				});
			}
			else
			{
				$('#report123_'+comm_type+"_"+data.id).addClass('label-warning');
				$('#report123_'+comm_type+"_"+data.id).addClass('link');
				$('#report123_'+comm_type+"_"+data.id).click(function()
				{
					$('#report123_popup_message').html('Could not find the commission settings, matching this policy. Please re-check the commission setings in the policy bank.');
					$('#report123_popup_link').click();
				});
			}
		}
	};

	</script>
</div>
