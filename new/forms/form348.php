<div id='form348' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<div class='btn-group' id='form348_status' data-toggle='buttons'>
					<label class='btn green-jungle basic active' onclick=form348_ini('basic');><input name='basic' type='radio' class='toggle'>Basic</label>
					<label class='btn green-jungle orc' onclick=form348_ini('orc');><input type='radio' name='orc' class='toggle'>ORC</label>
			</div>
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
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form348_header'></form>
						<th><input type='text' placeholder="Issuing Company" class='floatlabel' name='company' form='form348_header'></th>
						<th><input type='text' placeholder="Policy #" class='floatlabel' name='policy' form='form348_header'></th>
						<th><input type='text' placeholder="Agent" class='floatlabel' name='agent' form='form348_header'></th>
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

		function form348_header_ini()
		{
			var form=document.getElementById('form348_header');
			var policy_filter=form.elements['policy'];
			var agent_filter=form.elements['agent'];
			var company_filter=form.elements['company'];

			var policy_data={data_store:'policies',return_column:'policy_num'};
			set_my_filter_json(policy_data,policy_filter);

			var agent_data={data_store:'attributes',return_column:'name',
							indexes:[{index:'type',exact:'staff'},{index:'attribute',exact:'Designation'},
									{index:'value',exact:'Agent'}]};
			set_my_filter_json(agent_data,agent_filter);

			var company_data={data_store:'policy_types',return_column:'issuer'};
			set_my_filter_json(company_data,company_filter);

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form348_ini();
			});
		}

		function form348_ini(c_type)
		{
			var fid=$("#form348_link").attr('data_id');
			if(fid==null)
				fid="";

			var form=document.getElementById('form348_header');
			var company_filter=form.elements['company'].value;
			var policy_filter=form.elements['policy'].value;
			var agent_filter=form.elements['agent'].value;

			show_loader();
			$('#form348_body').html('');

			var type_filter='basic';
			if(typeof c_type!='undefined' && c_type=='orc')
			{
					type_filter='orc';
					$('#form348_status').find('label.orc').addClass('active');
					$('#form348_status').find('label.basic').removeClass('active');
			}
			else
			{
					$('#form348_status').find('label.basic').addClass('active');
					$('#form348_status').find('label.orc').removeClass('active');
			}

			var paginator=$('#form348_body').paginator();

			var new_columns={count:paginator.page_size(),
							start_index:paginator.get_index(),
							data_store:'policy_commissions',
							indexes:[{index:'id',value:fid},
									{index:'policy_num',value:policy_filter},
									{index:'amount'},
									{index:'comm_percent'},
									{index:'premium'},
									{index:'issue_date'},
									{index:'issuer',value:company_filter},
									{index:'commission_type',value:type_filter},
									{index:'agent',value:agent_filter}]};

			read_json_rows('form348',new_columns,function(results)
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
				initialize_tabular_report_buttons(new_columns,'Policy Commissions','form348',function (item)
				{
					item['Commission %']=vTime.date({time:item.comm_percent});
					item['Issue Date']=vTime.date({time:item.issue_date});
					delete item.issue_date;
					delete item.comm_percent;
				});
				hide_loader();
			});
		};

		// function form348_delete_item(button)
		// {
		// 	if(is_delete_access('form348'))
		// 	{
		// 		modal115_action(function()
		// 		{
		// 			var form_id=$(button).attr('form');
		// 			var form=document.getElementById(form_id);
		//
		// 			var data_id=form.elements['id'].value;
		// 			var data_json={data_store:'policy_commissions',
 	// 						data:[{index:'id',value:data_id}]};
		//
		// 			delete_json(data_json);
		//
		// 			$(button).parent().parent().remove();
		// 		});
		// 	}
		// 	else
		// 	{
		// 		$("#modal2_link").click();
		// 	}
		// }

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

	</script>
</div>
