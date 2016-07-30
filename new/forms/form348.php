<div id='form348' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<div class='btn-group' id='form348_status' data-toggle='buttons'>
					<label class='btn green-jungle pending active' onclick=form348_ini('pending');><input name='pending' type='radio' class='toggle'>Pending</label>
					<label class='btn green-jungle received' onclick=form348_ini('received');><input type='radio' name='received' class='toggle'>Received</label>
					<label class='btn green-jungle rejected' onclick=form348_ini('rejected');><input type='radio' name='rejected' class='toggle'>Rejected</label>
			</div>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
										<li>
												<a onclick='modal218_action();'><i class='fa fa-plus'> Add</i></a>
										</li>
										<li class="divider"> </li>
										<li>
                        <a id='form348_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form348_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form348_print'><i class='fa fa-print'></i> Print</a>
                    </li>
										<li class="divider"> </li>
                    <li>
                        <a id='form348_upload' onclick=modal221_action(form348_import_template,form348_import,form348_import_validate);><i class='fa fa-upload'></i> Import</a>
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
						<th><input type='text' placeholder="Commission #" class='floatlabel' name='comm' form='form348_header'></th>
						<th><input type='text' placeholder="Policy" class='floatlabel' name='policy' form='form348_header'></th>
						<th><input type='text' placeholder="Amount" readonly="readonly" name='amount' form='form348_header'></th>
						<th><input type='text' placeholder="Agent" class='floatlabel' name='agent' form='form348_header'></th>
						<th><input type='submit' form='form348_header' style='visibility: hidden;'></th>
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

			var policy_data={data_store:'policies',return_column:'policy_num'};
			set_my_filter_json(policy_data,policy_filter);

			var agent_data={data_store:'staff',return_column:'acc_name'};
			set_my_filter_json(agent_data,agent_filter);

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
			var comm_filter=form.elements['comm'].value;
			var policy_filter=form.elements['policy'].value;
			var agent_filter=form.elements['agent'].value;

			show_loader();
			$('#form348_body').html('');

			var status_filter='pending';
			if(typeof c_type!='undefined' && c_type=='received')
			{
					status_filter='received';
					$('#form348_status').find('label.received').addClass('active');
					$('#form348_status').find('label.pending').removeClass('active');
					$('#form348_status').find('label.rejected').removeClass('active');
			}
			else if(typeof c_type!='undefined' && c_type=='rejected')
			{
					status_filter='rejected';
					$('#form348_status').find('label.rejected').addClass('active');
					$('#form348_status').find('label.pending').removeClass('active');
					$('#form348_status').find('label.received').removeClass('active');
			}
			else
			{
					$('#form348_status').find('label.pending').addClass('active');
					$('#form348_status').find('label.received').removeClass('active');
					$('#form348_status').find('label.rejected').removeClass('active');
			}

			var paginator=$('#form348_body').paginator();

			var new_columns={count:paginator.page_size(),
											start_index:paginator.get_index(),
											data_store:'policy_commissions',
											indexes:[{index:'id',value:fid},
															{index:'commission_num',value:comm_filter},
															{index:'policy_num',value:policy_filter},
															{index:'amount'},
															{index:'policy_holder'},
															{index:'issuer'},
															{index:'agent',value:agent_filter},
															{index:'status',exact:status_filter}]};

			read_json_rows('form348',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form348_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Commission #'>";
								rowsHTML+="<a onclick=\"show_object('policy_commissions','"+result.commission_num+"');\"><input type='text' readonly='readonly' form='form348_"+result.id+"' value='"+result.commission_num+"'></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Policy'>";
								rowsHTML+="<a onclick=\"show_object('policies','"+result.policy_num+"');\"><textarea readonly='readonly' form='form348_"+result.id+"'>"+result.policy_num+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Amount'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form348_"+result.id+"' value='"+result.amount+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Agent'>";
								rowsHTML+="<a onclick=\"show_object('staff','"+result.agent+"')\"><input type='text' readonly='readonly' form='form348_"+result.id+"' value='"+result.agent+"'></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form348_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button class='btn red' form='form348_"+result.id+"' title='Delete' onclick='form348_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
								if(result.status=='pending')
								{
									rowsHTML+="<button class='btn grey' form='form348_"+result.id+"' title='Received' name='received'><i class='fa fa-check'></i></button>";
									rowsHTML+="<button class='btn grey' form='form348_"+result.id+"' title='Rejected' name='rejected'><i class='fa fa-times'></i></button>";
								}
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form348_body').append(rowsHTML);
					var fields=document.getElementById("form348_"+result.id);

					var approve_button=fields.elements['received'];
					var reject_button=fields.elements['rejected'];

					$(approve_button).on('click',function()
					{
						form348_update_item(fields,'received');
						$(this).parent().parent().remove();
					});

					$(reject_button).on('click',function()
					{
						form348_update_item(fields,'rejected');
						$(this).parent().parent().remove();
					});

					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form348_update_item(fields);
					});
				});

				$('#form348').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Policy Commissions','form348',function (item){});
				hide_loader();
			});
		};

		function form348_update_item(form,status)
		{
			if(is_update_access('form348'))
			{
				var data_id=form.elements[4].value;

				var last_updated=vTime.unix();

				var data_json={data_store:'policy_commissions',
	 				data:[{index:'id',value:data_id},
						{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}]};

				update_json(data_json);

				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form348_delete_item(button)
		{
			if(is_delete_access('form348'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);

					var data_id=form.elements[4].value;
					var data_json={data_store:'policy_commissions',
 							data:[{index:'id',value:data_id}]};

					delete_json(data_json);

					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form348_import_template()
		{
			var data_array=['id','commission number','policy number','commission amount','commission type','issuer','policy holder','agent','notes','issue date','status'];
			my_array_to_csv(data_array);
		};

		function form348_import_validate(data_array)
		{
			var validate_template_array=[{column:'policy number',required:'yes',regex:new RegExp('^[0-9a-zA-Z_., ()-]+$')},
															{column:'commission number',required:'yes',regex:new RegExp('^[0-9a-zA-Z_., ()-]+$')},
															{column:'policy holder',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
															{column:'issuer',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
															{column:'agent',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
															{column:'commission amount',regex:new RegExp('^[0-9 .]+$')},
															{column:'issue date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
															{column:'commission type',list:['customer','agent']},
															{column:'status',list:['pending','received','rejected']}];

			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;
		}

		function form348_import(data_array)
		{
			var create_json={data_store:'policy_commissions',
 					log:'yes',
 					data:[],
 					log_data:{title:'commissions for policies',link_to:'form348'}};

			var update_json={data_store:'policy_commissions',
		 					log:'yes',
		 					data:[],
		 					log_data:{title:'commissions for policies',link_to:'form348'}};

			var last_updated=vTime.unix();

			data_array.forEach(function(row)
			{
				create_json.data.push(create_json_array);
			});

			create_batch_json(create_json);
			update_batch_json(update_json);
		}


	</script>
</div>
