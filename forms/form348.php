<div id='form348' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=form348_add_filter();>Add Filter</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
					<li>
                        <a id='form348_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form348_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form348_print'><i class='fa fa-print'></i> Print</a>
                    </li>
					<li class='divider'></li>
					<li>
                        <a id='form348_recalculate' onclick=form348_recalculate_commissions();><i class='fa fa-refresh'></i> Recalculate Commissions</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='form348_header' autocomplete="off">
			<!-- <label style='float:right;'><button type='button' class='btn red-pink' onclick='modal11_action();' title='Add Customer'><i class='fa fa-plus'></i> Add Customer</button></label> -->
			<input type='submit' class='submit_hidden'>
			<fieldset id='form348_filters'></fieldset>
		</form>

	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form348_header'></form>
						<th><input type='text' placeholder="Issuing Company" readonly="readonly" name='company' form='form348_header'></th>
						<th><input type='text' placeholder="Policy #" readonly="readonly" name='policy' form='form348_header'></th>
						<th><input type='text' placeholder="Agent" readonly="readonly" name='agent' form='form348_header'></th>
						<th><input type='text' placeholder="Premium" readonly="readonly" form='form348_header'></th>
						<th><input type='text' placeholder="Commission %" readonly="readonly" form='form348_header'></th>
						<th><input type='text' placeholder="Amount" readonly="readonly" form='form348_header'></th>
						<th><input type='submit' form='form348_header' style='display:none;'></th>
				</tr>
			</thead>
			<tbody id='form348_body'>
			</tbody>
		</table>
	</div>

	<script>

	function form348_add_filter()
	{
		var form=document.getElementById('form348_header');
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

		var fieldset=document.getElementById('form348_filters');
		fieldset.appendChild(row);

		var data=['Policy #','Issue Date','Agent','Issuing Company','Commission Type'];

		set_value_list_json(data,f_filter);

		$(from_filter).datepicker();
		$(to_filter).datepicker();

		function s(x){
			if(!vUtil.isBlank(x) && x=='d'){
				$(from_filter).show();
				$(to_filter).show();
				$(v_filter).hide();
				// $('#form348').formcontrol();
			}else{
				$(from_filter).hide();
				$(to_filter).hide();
				$(v_filter).show();
				var value_data={data_store:'policy_commissions',return_column:i_filter.value};
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
				case 'Policy #': i_filter.value = 'policy_num'; s(); break;
				case 'Issue Date':  i_filter.value = 'issue_date'; s('d'); break;
				case 'Agent': i_filter.value = 'agent'; s(); break;
				case 'Issuing Company': i_filter.value = 'issuer'; s(); break;
				case 'Commission Type': i_filter.value = 'commission_type'; s(); break;
				default: i_filter.value = 'commission_type'; s();
			}
		});
		$('#form348').formcontrol();
	}

	function form348_header_ini()
	{
		var filter_fields=document.getElementById('form348_header');
		$('#form348_filters').html('');
		form348_add_filter();

		$(filter_fields).off('submit');
		$(filter_fields).on('submit',function(event)
		{
			event.preventDefault();
			form348_ini();
		});
	};

		function form348_ini(c_type)
		{
			var fid=$("#form348_link").attr('data_id');
			if(fid==null)
				fid="";

			show_loader();
			$('#form348_body').html('');

			var paginator=$('#form348_body').paginator();

			var columns={count:paginator.page_size(),
							start_index:paginator.get_index(),
							data_store:'policy_commissions',
							indexes:[{index:'id',value:fid},
									{index:'policy_num'},
									{index:'amount'},
									{index:'comm_percent'},
									{index:'premium'},
									{index:'issue_date'},
									{index:'issuer'},
									{index:'commission_type'},
									{index:'agent'}]};

			$('#form348_filters .row').each(function(index)
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

			read_json_rows('form348',columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form348_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Issuing Company'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form348_"+result.id+"' value='"+result.issuer+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Policy #'>";
								rowsHTML+="<a onclick=\"show_object('policies','"+result.policy_num+"');\"><textarea readonly='readonly' form='form348_"+result.id+"'>"+result.policy_num+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Agent'>";
								rowsHTML+="<a onclick=\"show_object('staff','"+result.agent+"')\"><textarea readonly='readonly' form='form348_"+result.id+"'>"+result.agent+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Premium'>";
								rowsHTML+="<input type='number' step='any' readonly='readonly' class='dblclick_editable' form='form348_"+result.id+"' value='"+result.premium+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Commission %'>";
								rowsHTML+="<input type='number' step='any' readonly='readonly' class='dblclick_editable' form='form348_"+result.id+"' value='"+result.comm_percent+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Amount'>";
								rowsHTML+="<input type='number' step='any' readonly='readonly' class='dblclick_editable' form='form348_"+result.id+"' value='"+result.amount+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form348_"+result.id+"' value='"+result.id+"' name='id'>";
								rowsHTML+="<button class='btn green' type='submit'  form='form348_"+result.id+"' title='Update' name='save'><i class='fa fa-save'></i></button>";
								// rowsHTML+="<button class='btn red' type='button'  form='form348_"+result.id+"' title='Delete' onclick='form348_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form348_body').append(rowsHTML);
					var fields=document.getElementById("form348_"+result.id);
					var p_filter = fields.elements[3];
					var c_filter = fields.elements[4];
					var a_filter = fields.elements[5];

					vUtil.onChange(p_filter,function()
					{
						a_filter.value = vUtil.round((p_filter.value*c_filter.value/100),2);
					});

					vUtil.onChange(c_filter,function()
					{
						a_filter.value = vUtil.round((p_filter.value*c_filter.value/100),2);
					});

					vUtil.onChange(a_filter,function()
					{
						c_filter.value = vUtil.round((100*a_filter.value/p_filter.value),2);
					});

					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form348_update_item(fields);
					});
				});

				$('#form348').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(columns,'Policy Commissions','form348',function (item)
				{
					item['Commission %']=item.comm_percent;
					item['Issue Date']=vTime.date({time:item.issue_date});
					delete item.issue_date;
					delete item.comm_percent;
				});
				hide_loader();
			});
		};

		function form348_update_item(form)
		{
			if(is_update_access('form348'))
			{
				var data_id=form.elements['id'].value;
				var premium = form.elements[3].value;
				var comm = form.elements[4].value;
				var amount = form.elements[5].value;
				var data_json={data_store:'policy_commissions',
						data:[{index:'id',value:data_id},
							{index:'premium',value:premium},
							{index:'amount',value:amount},
							{index:'comm_percent',value:comm}]};

				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form348_recalculate_commissions()
		{
			if(is_update_access('form348'))
			{
				show_loader();
				var comm_data={data_store:'policy_commissions',
								indexes:[{index:'amount'},
										{index:'id'},
										{index:'policy_num'},
										{index:'comm_percent'},
										{index:'premium'},
										{index:'commission_type'},
										{index:'issue_date'}]};
				read_json_rows('form348',comm_data,function(commissions)
				{
					var policy_nums = vUtil.arrayColumn(commissions,'policy_num');

					var policy_data={data_store:'policies',
									indexes:[{index:'policy_num',array:policy_nums},
											{index:'policy_name'},
											{index:'sum_insured'},
											{index:'issued_in_quarter'},
											{index:'upsell'},
											{index:'issue_type'},
											{index:'term'}]};
					read_json_rows('form348',policy_data,function(policies)
					{
						var policy_names = vUtil.arrayColumn(policies,'policy_name');
						var policy_names_data={data_store:'policy_types',
										indexes:[{index:'name',array:policy_names},
												{index:'commissions'}]};
						read_json_rows('form348',policy_names_data,function(policy_types)
						{
							var last_updated = vTime.unix();

							for(var i in commissions)
							{
								for(var j in policies)
								{
									if(commissions[i].policy_num==policies[j].policy_num)
									{
										commissions[i].policy_name = policies[j].policy_name;
										commissions[i].sum_insured = policies[j].sum_insured;
										commissions[i].issued_in_quarter = policies[j].issued_in_quarter;
										commissions[i].upsell = policies[j].upsell;
										commissions[i].issue_type = policies[j].issue_type;
										commissions[i].term = policies[j].term;
										break;
									}
								}

								for(var k in policy_types)
								{
									if(commissions[i].policy_name==policy_types[k].name)
									{
										commissions[i].commissions = vUtil.jsonParse(policy_types[k].commissions);
										break;
									}
								}
							}

							var update_comm_json={data_store:'policy_commissions',data:[]};

							commissions.forEach(function(comm)
							{
								if(!vUtil.isBlank(comm.commissions))
								{
									comm.commissions.forEach(function(commission)
									{
										if(commission.type.toLowerCase()==comm.commission_type.toLowerCase() && commission.issue.toLowerCase()==comm['issue_type'].toLowerCase())
										{
											commission.conditions = vUtil.jsonParse(commission.conditions);
											var all_match=true;

											commission.conditions.forEach(function(cond)
											{
												if((!vUtil.isBlank(cond.exact) && comm[cond.index]!=cond.exact) || (!vUtil.isBlank(cond.lowerbound) && comm[cond.index]<cond.lowerbound) || (!vUtil.isBlank(cond.upperbound) && comm[cond.index]>cond.upperbound))
												{
													all_match=false;
												}
											});

											if(all_match)
											{
												comm['comm_percent'] = commission.commission;
												comm['amount'] = parseFloat(commission.commission)*parseFloat(comm['premium'])/100;

												var data_array=[{index:'id',value:comm['id']},
														{index:'comm_percent',value:comm['comm_percent']},
														{index:'amount',value:comm['amount']},
														{index:'last_updated',value:last_updated}];

												update_comm_json.data.push(data_array);
											}
										}
									});
								}

							});
							update_batch_json(update_comm_json);
							hide_loader();
						});
					});
				});
			}
			else{
				$("#modal2_link").click();
			}
		};

	</script>
</div>
