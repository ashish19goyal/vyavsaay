<div id='form363' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form363_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form363_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form363_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form363_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form363_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form363_header'></th>
						<th><input type='text' placeholder="Product" class='floatlabel' name='product' form='form363_header'></th>
						<th><input type='text' placeholder="Period" readonly='readonly' form='form363_header'></th>
						<th><input type='text' placeholder="Value" readonly='readonly' form='form363_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form363_header'></th>
						<th><input type='submit' form='form363_header' style='display: none;'></th>
				</tr>
			</thead>
			<tbody id='form363_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form363_header_ini()
		{
			var filter_fields=document.getElementById('form363_header');
			var name_filter=filter_fields.elements['name'];
			var product_filter=filter_fields.elements['product'];
			var status_filter=filter_fields.elements['status'];

			var name_data={data_store:'tds_settings',return_column:'name'};
			var product_data={data_store:'tds_settings',return_column:'product'};

			set_my_filter_json(name_data,name_filter);
			set_my_filter_json(product_data,product_filter);
			set_filter_json(['active','archived'],status_filter);

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form363_ini();
			});
		};

		function form363_ini()
		{
			show_loader();
			var fid=$("#form363_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form363_body').html("");

			var filter_fields=document.getElementById('form363_header');
			var fname=filter_fields.elements['name'].value;
			var fproduct=filter_fields.elements['product'].value;
			var fstatus=filter_fields.elements['status'].value;

			var paginator=$('#form363_body').paginator();

			var new_columns={count:paginator.page_size(),
							start_index:paginator.get_index(),
							data_store:'tds_settings',
							indexes:[{index:'id',value:fid},
									{index:'name',value:fname},
									{index:'product',value:fproduct},
									{index:'status',value:fstatus},
									{index:'percentage'},
									{index:'start_date'},
									{index:'end_date'}]};

			read_json_rows('form363',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form363_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<textarea readonly='readonly' form='form363_"+result.id+"'>"+result.name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Product'>";
								rowsHTML+="<textarea readonly='readonly' form='form363_"+result.id+"'>"+result.product+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Period'>";
								rowsHTML+="<input type='text' readonly='readonly' class='floatlabel' placeholder='Start Date' form='form363_"+result.id+"' value='"+vTime.date({time:result.start_date})+"'>";
								rowsHTML+="<input type='text' readonly='readonly' class='floatlabel' placeholder='End Date' form='form363_"+result.id+"' value='"+vTime.date({time:result.end_date})+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Value'>";
								rowsHTML+="<input type='number' class='floatlabel_right' placeholder='%' readonly='readonly' form='form363_"+result.id+"' value='"+result.percentage+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form363_"+result.id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form363_"+result.id+"' name='id' value='"+result.id+"'>";
								if(result.status=='active')
								{
									rowsHTML+="<button type='button' class='btn red' name='archive' form='form363_"+result.id+"' title='Archive'><i class='fa fa-times'></i></button>";
								}
								else if(result.status=='archived')
								{
									rowsHTML+="<button type='button' class='btn green' name='active' form='form363_"+result.id+"' title='Activate'><i class='fa fa-check'></i></button>";
								}
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form363_body').append(rowsHTML);
					var fields=document.getElementById("form363_"+result.id);
					var archive_button = fields.elements['archive'];
					var active_button = fields.elements['active'];

					$(archive_button).on("click", function(event)
					{
						event.preventDefault();
						form363_archive_item(fields);
					});

					$(active_button).on("click", function(event)
					{
						event.preventDefault();
						form363_activate_item(fields);
					});
				});

				$('#form363').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:new_columns,file:'TDS Settings',report_id:'form363',feach:function (item)
				{
					item['Start Date'] = vTime.date({time:item.start_date});
					item['End Date'] = vTime.date({time:item.end_date});
					delete item.start_date;
					delete item.end_date;
				}});
				hide_loader();
			});
		};

		function form363_add_item()
		{
			if(is_create_access('form363'))
			{
				var id=vUtil.newKey();
				var rowsHTML="<tr>";
					rowsHTML+="<form id='form363_"+id+"'></form>";
						rowsHTML+="<td data-th='Name'>";
							rowsHTML+="<textarea required form='form363_"+id+"'></textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Product'>";
							rowsHTML+="<input type='text' required form='form363_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Period'>";
							rowsHTML+="<input type='text' requried class='floatlabel' placeholder='Start Date' form='form363_"+id+"'>";
							rowsHTML+="<input type='text' class='floatlabel' placeholder='End Date' form='form363_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Value'>";
							rowsHTML+="<input type='number' required step='any' class='floatlabel_right' placeholder='%' form='form363_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' required form='form363_"+id+"' value='active'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form363_"+id+"' name='id' value='"+id+"'>";
							rowsHTML+="<button type='submit' class='btn green' name='save' form='form363_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
						rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form363_body').prepend(rowsHTML);
				var fields=document.getElementById("form363_"+id);
				var name_filter=fields.elements[0];
				var product_filter=fields.elements[1];
				var start_filter=fields.elements[2];
				var end_filter=fields.elements[3];
				var status_filter=fields.elements[5];

				$(start_filter).datepicker();
				$(end_filter).datepicker();

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form363_create_item(fields);
				});

				$(name_filter).focus();

				set_value_list_json(['active','archived'],status_filter);

				var product_data = {data_store:'policy_types',return_column:'issuer'};
				set_my_value_list_json(product_data,product_filter);

				$('#form363').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form363_create_item(form)
		{
			if(is_create_access('form363'))
			{
				var tax_name=form.elements[0].value;
				var product=form.elements[1].value;
				var start=vTime.unix({date:form.elements[2].value});
				var end=vTime.unix({date:form.elements[3].value});
				var value=form.elements[4].value;
				var status=form.elements[5].value;
				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();

				var data_json={data_store:'tds_settings',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:tax_name,unique:'yes'},
	 					{index:'product',value:product},
	 					{index:'start_date',value:start},
						{index:'end_date',value:end},
	 					{index:'percentage',value:value},
						{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'TDS head '+tax_name,link_to:'form363'}};
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

		function form363_archive_item(form)
		{
			if(is_update_access('form363'))
			{
				var name=form.elements[0].value;
				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();
				var data_json={data_store:'tds_settings',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:'archived'},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'TDS head '+name+' archived',link_to:'form363'}};

				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form363_activate_item(form)
		{
			if(is_update_access('form363'))
			{
				var name=form.elements[0].value;
				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();
				var data_json={data_store:'tds_settings',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:'active'},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'TDS head '+name+' activated again',link_to:'form363'}};

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
