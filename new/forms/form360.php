<div id='form360' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form360_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form360_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form360_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form360_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form360_upload' onclick=modal23_action(form360_import_template,form360_import,form360_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form360_header'></form>
						<th><input type='text' placeholder="Policy" class='floatlabel' name='name' form='form360_header'></th>
						<th><input type='text' placeholder="Holders" readonly='readonly' form='form360_header'></th>
						<th><input type='text' placeholder="Age" readonly='readonly' form='form360_header'></th>
						<th><input type='text' placeholder="Amount" readonly='readonly' form='form360_header'></th>
						<th><input type='submit' form='form360_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form360_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form360_header_ini()
		{
			var filter_fields=document.getElementById('form360_header');
			var policy_filter=filter_fields.elements['name'];

			var policy_data={data_store:'policy_types',return_column:'name'};
			set_my_filter_json(policy_data,policy_filter);

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form360_ini();
			});
		};

		function form360_ini()
		{
			show_loader();
			var fid=$("#form360_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form360_body').html("");

			var filter_fields=document.getElementById('form360_header');
			var fpolicy=filter_fields.elements['name'].value;

			var paginator=$('#form360_body').paginator();

			var new_columns={count:paginator.page_size(),
							start_index:paginator.get_index(),
							data_store:'policy_premiums',
							indexes:[{index:'id',value:fid},
									{index:'policy_name',value:fpolicy},
									{index:'issuer',},
									{index:'age_lower'},
									{index:'age_upper'},
									{index:'sum_insured'},
									{index:'adults'},
									{index:'children'},
									{index:'premium_amount'}]};

			read_json_rows('form360',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form360_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Policy'>";
								rowsHTML+="<textarea readonly='readonly' class='floatlabel' placeholder='Policy Name' form='form360_"+result.id+"'>"+result.policy_name+"</textarea>";
								rowsHTML+="<input type='text' readonly='readonly' class='floatlabel' placeholder='Issuer' form='form360_"+result.id+"' value='"+result.issuer+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Holders'>";
								rowsHTML+="<input type='number' step='1' min='0' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Adults' form='form360_"+result.id+"' value='"+result.adults+"'>";
								rowsHTML+="<input type='number' step='1' min='0' readonly='readonly' class='floatlabel dblclick_editable' placeholder='children' form='form360_"+result.id+"' value='"+result.children+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Age'>";
								rowsHTML+="<input type='number' step='1' min='0' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Lower Limit' form='form360_"+result.id+"' value='"+result.age_lower+"'>";
								rowsHTML+="<input type='number' step='1' min='0' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Upper Limit' form='form360_"+result.id+"' value='"+result.age_upper+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Amount'>";
								rowsHTML+="<input type='number' step='any' min='0' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Sum Insured' form='form360_"+result.id+"' value='"+result.sum_insured+"'>";
								rowsHTML+="<input type='number' step='any' min='0' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Premium Amount' form='form360_"+result.id+"' value='"+result.premium_amount+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form360_"+result.id+"' value='"+result.id+"' name='id'>";
								rowsHTML+="<button type='submit' class='btn green' name='save' form='form360_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' name='delete' form='form360_"+result.id+"' title='Delete' onclick='form360_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form360_body').append(rowsHTML);
					var fields=document.getElementById("form360_"+result.id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form360_update_item(fields);
					});
				});

				$('#form360').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Premium Setup','form360',function (item){});
				hide_loader();
			});
		};

		function form360_add_item()
		{
			if(is_create_access('form360'))
			{
				var id=get_new_key();
				var rowsHTML="<tr>";
					rowsHTML+="<form id='form360_"+id+"'></form>";
						rowsHTML+="<td data-th='Policy'>";
							rowsHTML+="<input type='text' class='floatlabel' placeholder='Policy Name' form='form360_"+id+"'>";
							rowsHTML+="<input type='text' class='floatlabel' placeholder='Issuer' form='form360_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Holders'>";
							rowsHTML+="<input type='number' step='1' min='0' class='floatlabel dblclick_editable' placeholder='Adults' form='form360_"+id+"'>";
							rowsHTML+="<input type='number' step='1' min='0' class='floatlabel dblclick_editable' placeholder='children' form='form360_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Age'>";
							rowsHTML+="<input type='number' step='1' min='0' class='floatlabel dblclick_editable' placeholder='Lower Limit' form='form360_"+id+"'>";
							rowsHTML+="<input type='number' step='1' min='0' class='floatlabel dblclick_editable' placeholder='Upper Limit' form='form360_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="<input type='number' step='any' min='0' class='floatlabel dblclick_editable' placeholder='Sum Insured' form='form360_"+id+"'>";
							rowsHTML+="<input type='number' step='any' min='0' class='floatlabel dblclick_editable' placeholder='Premium Amount' form='form360_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form360_"+id+"' value='"+id+"' name='id'>";
							rowsHTML+="<button type='submit' class='btn green' name='save' form='form360_"+id+"' name='save' title='Save'><i class='fa fa-save'></i></button>";
							rowsHTML+="<button type='button' class='btn red' name='delete' form='form360_"+id+"' name='delete' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
						rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form360_body').prepend(rowsHTML);
				var fields=document.getElementById("form360_"+id);
				var policy_filter=fields.elements[0];
				var issuer_filter=fields.elements[1];

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form360_create_item(fields);
				});

				var policy_data={data_store:'policy_types',return_column:'name'};
				set_my_value_list_json(policy_data,policy_filter,function ()
				{
					$(policy_filter).focus();
				});

				vUtil.onChange(policy_filter,function()
				{
					var issuer_data={data_store:'policy_types',return_column:'issuer',
												indexes:[{index:'name',exact:policy_filter.value}]};
					set_my_value_json(issuer_data,issuer_filter);
				});

				$('#form360').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form360_create_item(form)
		{
			if(is_create_access('form360'))
			{
				var policy_name=form.elements[0].value;
				var issuer=form.elements[1].value;
				var adults=form.elements[2].value;
				var children=form.elements[3].value;
				var age_lower=form.elements[4].value;
				var age_upper=form.elements[5].value;
				var sum=form.elements[6].value;
				var premium=form.elements[7].value;
				var data_id=form.elements[8].value;
				var last_updated=get_my_time();

				var data_json={data_store:'policy_premiums',
	 				data:[{index:'id',value:data_id},
	 					{index:'policy_name',value:policy_name},
	 					{index:'issuer',value:issuer},
	 					{index:'adults',value:adults},
	 					{index:'children',value:children},
						{index:'age_lower',value:age_lower},
						{index:'age_upper',value:age_upper},
						{index:'sum_insured',value:sum},
						{index:'premium_amount',value:premium},
	 					{index:'last_updated',value:last_updated}]};

				create_json(data_json);

				$(form).readonly();

				var del_button=form.elements['delete'];
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form360_delete_item(del_button);
				});

				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form360_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form360_update_item(form)
		{
			if(is_update_access('form360'))
			{
				var policy_name=form.elements[0].value;
				var issuer=form.elements[1].value;
				var adults=form.elements[2].value;
				var children=form.elements[3].value;
				var age_lower=form.elements[4].value;
				var age_upper=form.elements[5].value;
				var sum=form.elements[6].value;
				var premium=form.elements[7].value;
				var data_id=form.elements[8].value;
				var last_updated=get_my_time();

				var data_json={data_store:'policy_premiums',
	 				data:[{index:'id',value:data_id},
	 					{index:'policy_name',value:policy_name},
	 					{index:'issuer',value:issuer},
	 					{index:'adults',value:adults},
	 					{index:'children',value:children},
						{index:'age_lower',value:age_lower},
						{index:'age_upper',value:age_upper},
						{index:'sum_insured',value:sum},
						{index:'premium_amount',value:premium},
	 					{index:'last_updated',value:last_updated}]};

				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form360_delete_item(button)
		{
			if(is_delete_access('form360'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);

					var data_id=form.elements['id'].value;

					var data_json={data_store:'policy_premiums',data:[{index:'id',value:data_id}]};
					delete_json(data_json);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form360_import_template()
		{
			var data_array=['id','policy_name','issuer','adults','children','age_lower','age_upper','sum_insured','premium_amount'];
			my_array_to_csv(data_array);
		};

		function form360_import_validate(data_array)
		{
			var validate_template_array=[{column:'policy_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'issuer',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'adults',required:'yes',regex:new RegExp('^[0-9]+$')},
									{column:'children',required:'yes',regex:new RegExp('^[0-9]+$')},
									{column:'age_lower',required:'yes',regex:new RegExp('^[0-9]+$')},
									{column:'age_upper',required:'yes',regex:new RegExp('^[0-9]+$')},
									{column:'sum_insured',required:'yes',regex:new RegExp('^[0-9 .]+$')},
									{column:'premium_amount',required:'yes',regex:new RegExp('^[0-9 .]+$')}];

			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;
		}

		function form360_import(data_array,import_type)
		{
			var data_json={data_store:'policy_premiums',
 					log:'yes',
 					data:[],
 					log_data:{title:'Premium setup',link_to:'form360'}};

			var counter=1;
			var last_updated=get_my_time();

			data_array.forEach(function(row)
			{
				counter+=1;
				if(import_type=='create_new')
				{
					row.id=last_updated+counter;
				}

				var data_json_array=[{index:'id',value:row.id},
	 					{index:'policy_name',value:row.policy_name},
	 					{index:'issuer',value:row.issuer},
	 					{index:'adults',value:row.adults},
	 					{index:'children',value:row.children},
						{index:'age_lower',value:row.age_lower},
						{index:'age_upper',value:row.age_upper},
						{index:'sum_insured',value:row.sum_insured},
						{index:'premium_amount',value:row.premium_amount},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
			});

			if(import_type=='create_new')
			{
				if(is_create_access('form360')){
					create_batch_json(data_json);
				}
				else {
					$("#modal2_link").click();
				}
			}
			else
			{
				if(is_update_access('form360'))
				{
					update_batch_json(data_json);
				}
				else{
					$("#modal2_link").click();
				}
			}
		};

	</script>
</div>
