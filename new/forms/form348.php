<div id='form348' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal218_action();'>Add <i class='fa fa-plus'></i></a>
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
										<li class="divider"> </li>
                    <li>
                        <a id='form348_upload' onclick=modal23_action(form348_import_template,form348_import,form348_import_validate);><i class='fa fa-upload'></i> Import</a>
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
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form348_header'></th>
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
			var status_filter=form.elements['status'];

			var policy_data={data_store:'policies',return_column:'policy_num'};
			set_my_filter_json(policy_data,policy_filter);

			set_static_filter_json('policy_commissions','status',status_filter);

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form348_ini();
			});
		}

		function form348_ini()
		{
			var fid=$("#form348_link").attr('data_id');
			if(fid==null)
				fid="";

			var form=document.getElementById('form348_header');
			var comm_filter=form.elements['comm'].value;
			var policy_filter=form.elements['policy'].value;
			var status_filter=form.elements['status'].value;

			show_loader();
			$('#form348_body').html('');

			var paginator=$('#form348_body').paginator();

			var new_columns={count:paginator.page_size(),
											start_index:paginator.get_index(),
											data_store:'policy_commissions',
											indexes:[{index:'id',value:fid},
															{index:'commission_num',value:comm_filter},
															{index:'policy_num',value:policy_filter},
															{index:'amount'},
															{index:'status',value:status_filter}]};

			read_json_rows('form348',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form348_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Commission #'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form348_"+result.id+"' value='"+result.commission_num+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Policy'>";
								rowsHTML+="<textarea readonly='readonly' form='form348_"+result.id+"'>"+result.policy_num+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Amount'>";
								rowsHTML+="<input type='number' readonly='readonly' form='form348_"+result.id+"' value='"+result.amount+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' class='dblclick_editable' readonly='readonly' form='form348_"+result.id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form348_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form348_"+result.id+"' title='Save' name='save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button class='btn red' form='form348_"+result.id+"' title='Delete' onclick='form348_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form348_body').append(rowsHTML);
					var fields=document.getElementById("form348_"+result.id);
					var status_filter=fields.elements[3];

					set_static_value_list('policy_commissions','status',status_filter);

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

		function form348_update_item(form)
		{
			if(is_update_access('form348'))
			{
				var status=form.elements[3].value;
				var data_id=form.elements[4].value;

				var last_updated=get_my_time();

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

	</script>
</div>
