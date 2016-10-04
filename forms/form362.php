<div id='form362' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form362_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form362_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form362_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form362_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form362_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form362_header'></th>
						<th><input type='text' placeholder="Display Name" class='floatlabel' name='display' form='form362_header'></th>
						<th><input type='text' placeholder="Period" readonly='readonly' form='form362_header'></th>
						<th><input type='text' placeholder="Value" readonly='readonly' form='form362_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form362_header'></th>
						<th><input type='submit' form='form362_header' style='display: none;'></th>
				</tr>
			</thead>
			<tbody id='form362_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form362_header_ini()
		{
			var filter_fields=document.getElementById('form362_header');
			var name_filter=filter_fields.elements['name'];
			var display_filter=filter_fields.elements['display'];
			var status_filter=filter_fields.elements['status'];

			var name_data={data_store:'tax_heads',return_column:'tax_name'};
			var display_data={data_store:'tax_heads',return_column:'display_name'};

			set_my_filter_json(name_data,name_filter);
			set_my_filter_json(display_data,display_filter);
			set_filter_json(['active','archived'],status_filter);

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form362_ini();
			});
		};

		function form362_ini()
		{
			show_loader();
			var fid=$("#form362_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form362_body').html("");

			var filter_fields=document.getElementById('form362_header');
			var fname=filter_fields.elements['name'].value;
			var fdisplay=filter_fields.elements['display'].value;
			var fstatus=filter_fields.elements['status'].value;

			var paginator=$('#form362_body').paginator();

			var new_columns={count:paginator.page_size(),
							start_index:paginator.get_index(),
							data_store:'tax_heads',
							indexes:[{index:'id',value:fid},
									{index:'tax_name',value:fname},
									{index:'display_name',value:fdisplay},
									{index:'status',value:fstatus},
									{index:'percentage'},
									{index:'start_date'},
									{index:'end_date'}]};

			read_json_rows('form362',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form362_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Tax Name'>";
								rowsHTML+="<textarea readonly='readonly' form='form362_"+result.id+"'>"+result.tax_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Display Name'>";
								rowsHTML+="<textarea readonly='readonly' form='form362_"+result.id+"'>"+result.display_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Period'>";
								rowsHTML+="<input type='text' readonly='readonly' class='floatlabel' placeholder='Start Date' form='form362_"+result.id+"' value='"+vTime.date({time:result.start_date})+"'>";
								rowsHTML+="<input type='text' readonly='readonly' class='floatlabel' placeholder='End Date' form='form362_"+result.id+"' value='"+vTime.date({time:result.end_date})+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Value'>";
								rowsHTML+="<input type='number' class='floatlabel_right' placeholder='%' readonly='readonly' form='form362_"+result.id+"' value='"+result.percentage+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form362_"+result.id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form362_"+result.id+"' name='id' value='"+result.id+"'>";
								if(result.status=='active')
								{
									rowsHTML+="<button type='button' class='btn red' name='archive' form='form362_"+result.id+"' title='Archive'><i class='fa fa-times'></i></button>";
								}
								else if(result.status=='archived')
								{
									rowsHTML+="<button type='button' class='btn green' name='active' form='form362_"+result.id+"' title='Activate'><i class='fa fa-check'></i></button>";
								}
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form362_body').append(rowsHTML);
					var fields=document.getElementById("form362_"+result.id);
					var archive_button = fields.elements['archive'];
					var active_button = fields.elements['active'];

					$(archive_button).on("click", function(event)
					{
						event.preventDefault();
						form362_archive_item(fields);
					});

					$(active_button).on("click", function(event)
					{
						event.preventDefault();
						form362_activate_item(fields);
					});
				});

				$('#form362').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Tax Heads','form362',function (item)
				{
					item['Start Date'] = vTime.date({time:item.start_date});
					item['End Date'] = vTime.date({time:item.end_date});
					delete item.start_date;
					delete item.end_date;
				});
				hide_loader();
			});
		};

		function form362_add_item()
		{
			if(is_create_access('form362'))
			{
				var id=vUtil.newKey();
				var rowsHTML="<tr>";
					rowsHTML+="<form id='form362_"+id+"'></form>";
						rowsHTML+="<td data-th='Tax Name'>";
							rowsHTML+="<textarea required form='form362_"+id+"'></textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Display Name'>";
							rowsHTML+="<textarea required form='form362_"+id+"'></textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Period'>";
							rowsHTML+="<input type='text' required class='floatlabel' placeholder='Start Date' form='form362_"+id+"'>";
							rowsHTML+="<input type='text' class='floatlabel' placeholder='End Date' form='form362_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Value'>";
							rowsHTML+="<input type='number' required step='any' class='floatlabel_right' placeholder='%' form='form362_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' required form='form362_"+id+"' value='active'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form362_"+id+"' name='id' value='"+id+"'>";
							rowsHTML+="<button type='submit' class='btn green' name='save' form='form362_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
						rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form362_body').prepend(rowsHTML);
				var fields=document.getElementById("form362_"+id);
				var name_filter=fields.elements[0];
				var start_filter=fields.elements[2];
				var end_filter=fields.elements[3];
				var status_filter=fields.elements[5];

				$(start_filter).datepicker();
				$(end_filter).datepicker();

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form362_create_item(fields);
				});

				$(name_filter).focus();

				set_value_list_json(['active','archived'],status_filter);

				$('#form362').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form362_create_item(form)
		{
			if(is_create_access('form362'))
			{
				var tax_name=form.elements[0].value;
				var display=form.elements[1].value;
				var start=vTime.unix({date:form.elements[2].value});
				var end=vTime.unix({date:form.elements[3].value});
				var value=form.elements[4].value;
				var status=form.elements[5].value;
				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();

				var data_json={data_store:'tax_heads',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'tax_name',value:tax_name},
	 					{index:'display_name',value:display},
	 					{index:'start_date',value:start},
						{index:'end_date',value:end},
	 					{index:'percentage',value:value},
						{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Tax head '+display,link_to:'form362'}};
				create_json(data_json);

				$(form).readonly();

				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form362_archive_item(form)
		{
			if(is_update_access('form362'))
			{
				var display=form.elements[1].value;
				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();
				var data_json={data_store:'tax_heads',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:'archived'},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Tax head '+display+' archived',link_to:'form362'}};

				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form362_activate_item(form)
		{
			if(is_update_access('form362'))
			{
				var display=form.elements[1].value;
				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();
				var data_json={data_store:'tax_heads',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:'active'},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Tax head '+display+' activated again',link_to:'form362'}};

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
