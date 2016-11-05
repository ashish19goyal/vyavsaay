<div id='form213' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form213_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form213_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form213_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form213_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form213_upload' onclick=modal23_action(form213_import_template,form213_import,form213_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form213_header'></form>
						<th><input type='text' placeholder="Customer" class='floatlabel' name='customer' form='form213_header'></th>
						<th><input type='text' placeholder="Details" class='floatlabel' name='detail' form='form213_header'></th>
						<th><input type='text' placeholder="Follow up" readonly='readonly' name='date' form='form213_header'></th>
						<th><input type='text' placeholder="Identified By/PoC" class='floatlabel' name='staff' form='form213_header'></th>
						<th><input type='submit' form='form213_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form213_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form213_header_ini()
		{
			var filter_fields=document.getElementById('form213_header');
			var names_filter=filter_fields.elements['customer'];
			var identified_filter=filter_fields.elements['staff'];

			var names_data={data_store:'customers',return_column:'acc_name'};
			set_my_filter_json(names_data,names_filter);

			var identified_data={data_store:'staff',return_column:'acc_name'};
			set_my_filter_json(identified_data,identified_filter);

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form213_ini();
			});
		}

		function form213_ini()
		{
			show_loader();
			var fid=$("#form213_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form213_body').html("");

			var filter_fields=document.getElementById('form213_header');
			var fname=filter_fields.elements['customer'].value;
			var fdetail=filter_fields.elements['detail'].value;
			var fidentity=filter_fields.elements['staff'].value;

			var paginator=$('#form213_body').paginator();

			var new_columns=new Object();
					new_columns.count=paginator.page_size();
					new_columns.start_index=paginator.get_index();
					new_columns.data_store='sale_leads';
					new_columns.indexes=[{index:'id',value:fid},
									{index:'customer',value:fname},
									{index:'detail',value:fdetail},
									{index:'status'},
									{index:'due_date'},
									{index:'identified_by',value:fidentity}];

			read_json_rows('form213',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var row_class="";
					if(result.status=='closed')
					{
						row_class="class='active'";
					}
					var rowsHTML="<tr "+row_class+">";
						rowsHTML+="<form id='form213_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Customer'>";
								rowsHTML+="<a onclick=\"show_object('customers','"+result.customer+"');\"><textarea readonly='readonly' form='form213_"+result.id+"' name='customer'>"+result.customer+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<textarea readonly='readonly' form='form213_"+result.id+"' class='dblclick_editable' name='detail'>"+result.detail+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Follow up'>";
								rowsHTML+="<input type='text' readonly='readonly' placeholder='Next Due Date' form='form213_"+result.id+"' name='date' class='floatlabel dblclick_editable' value='"+get_my_past_date(result.due_date)+"'>";
							if(result.status!='closed')
							{
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form213_"+result.id+"' name='followup'>Follow up</button>";
							}
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Identified By/PoC'>";
							if(result.identified_by=="")
								rowsHTML+="<input type='text' readonly='readonly' form='form213_"+result.id+"' name='staff' class='dblclick_editable' value='"+result.identified_by+"'>";
							else
								rowsHTML+="<input type='text' readonly='readonly' form='form213_"+result.id+"' name='staff' value='"+result.identified_by+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form213_"+result.id+"' name='id' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form213_"+result.id+"' title='Save' name='save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form213_"+result.id+"' title='Delete' name='delete' onclick='form213_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							if(result.status!='closed')
							{
								rowsHTML+="<button type='button' class='btn yellow' form='form213_"+result.id+"' onclick=\"modal153_action(this,'"+result.id+"');\">Close Lead</button>";
							}
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form213_body').append(rowsHTML);
					var fields=document.getElementById("form213_"+result.id);
					var identified_filter=fields.elements['staff'];
					var followup_button=fields.elements['followup'];

					$(followup_button).on('click',function ()
					{
						modal134_action(result.id,result.customer,result.detail);
					});

					var identified_data={data_store:'staff',return_column:'acc_name'};
					set_my_value_list_json(identified_data,identified_filter);

					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form213_update_item(fields);
					});
				});

				$('#form213').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:new_columns,file:'Sale Leads',report_id:'form213'});
				hide_loader();
			});
		};

		function form213_add_item()
		{
			if(is_create_access('form213'))
			{
				var id=vUtil.newKey();
				var rowsHTML="<tr>";
						rowsHTML+="<form id='form213_"+id+"'></form>";
							rowsHTML+="<td data-th='Customer'>";
								rowsHTML+="<input type='text' form='form213_"+id+"' name='customer'>";
								rowsHTML+="<a title='Add new customer profile' class='btn btn-circle btn-icon-only grey-cascade' id='form213_add_customer_"+id+"'><i class='fa fa-plus'></i></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<textarea form='form213_"+id+"' class='dblclick_editable' name='detail'></textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Follow up'>";
								rowsHTML+="<input type='text' placeholder='Next Due Date' form='form213_"+id+"' name='date' class='floatlabel dblclick_editable'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Identified By/PoC'>";
								rowsHTML+="<input type='text' form='form213_"+id+"' name='staff' class='dblclick_editable'>";
								rowsHTML+="<a title='Add new staff profile' class='btn btn-circle btn-icon-only grey-cascade' id='form213_add_staff_"+id+"'><i class='fa fa-plus'></i></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form213_"+id+"' name='id' value='"+id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form213_"+id+"' title='Save' name='save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form213_"+id+"' title='Delete' name='delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

				$('#form213_body').prepend(rowsHTML);

				var fields=document.getElementById("form213_"+id);
				var customer_filter=fields.elements[0];
				var detail_filter=fields.elements[1];
				var due_filter=fields.elements[2];
				var by_filter=fields.elements[3];

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form213_create_item(fields);
				});

				var customer_data={data_store:'customers',return_column:'acc_name'};
				set_my_value_list_json(customer_data,customer_filter,function ()
				{
					$(customer_filter).focus();
				});

				$(due_filter).datepicker();
				due_filter.value=get_my_past_date(parseFloat(get_my_time())+86400000);

				var staff_data={data_store:'staff',return_column:'acc_name'};
				set_my_value_list_json(staff_data,by_filter);

				var add_customer=document.getElementById('form213_add_customer_'+id);
				$(add_customer).on('click',function()
				{
					modal11_action(function()
					{
						set_my_value_list_json(customer_data,customer_filter,function ()
						{
							$(customer_filter).focus();
						});
					});
				});

				var add_staff=document.getElementById('form213_add_staff_'+id);
				$(add_staff).on('click',function()
				{
					modal16_action(function()
					{
						set_my_value_list_json(staff_data,by_filter);
					});
				});
				$('#form213').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form213_create_item(form)
		{
			if(is_create_access('form213'))
			{
				var customer=form.elements['customer'].value;
				var detail=form.elements['detail'].value;
				var due_date=get_raw_time(form.elements['date'].value);
				var identified_by=form.elements['staff'].value;
				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();

				var data_json={data_store:'sale_leads',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'customer',value:customer},
	 					{index:'detail',value:detail},
	 					{index:'due_date',value:due_date},
	 					{index:'status',value:'open'},
	 					{index:'identified_by',value:identified_by},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Sale lead for customer '+customer,link_to:'form213'}};
				create_json(data_json);

				$(form).readonly();

				var customer_data={data_store:'customers',
										count:1,
										indexes:[{index:'id'},
													{index:'name'},
													{index:'phone'},
													{index:'email'},
													{index:'acc_name',exact:customer}]};

				read_json_rows('',customer_data,function(customers)
				{
					var customer_name=customers[0].name;
					var customer_phone=customers[0].phone;
					var business_title=get_session_var('title');
					var sms_content=get_session_var('sms_content');
					var message=sms_content.replace(/customer_name/g,customer_name);
					message=message.replace(/business_title/g,business_title);

					send_sms(customer_phone,message,'transaction');
					///////////////////////////////////////////////////////////////////////////////

					var nl_name=get_session_var('default_newsletter');
					var nl_id_xml={data_store:'newsletter',return_column:'id',
										indexes:[{index:'name',exact:nl_name}]};
					read_json_single_column(nl_id_xml,function(nls)
					{
						if(nls.length>0)
						{
							var subject=nl_name;
							var nl_id=nls[0];
							print_newsletter(nl_name,nl_id,'mail',function(container)
							{
								var message=container.innerHTML;
								var from=get_session_var('email');
								var to_array=[{"name":customers[0].name,"email":customers[0].email,"customer_id":customers[0].id}];
								var to=JSON.stringify(to_array);
								send_email(to,from,business_title,subject,message,function(){});
							});
						}
					});
				});

				var del_button=form.elements['delete'];
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form213_delete_item(del_button);
				});

				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form213_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form213_update_item(form)
		{
			if(is_update_access('form213'))
			{
				var customer=form.elements['customer'].value;
				var detail=form.elements['detail'].value;
				var due_date=get_raw_time(form.elements['date'].value);
				var identified_by=form.elements['staff'].value;
				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();
				var data_json={data_store:'sale_leads',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'customer',value:customer},
	 					{index:'detail',value:detail},
	 					{index:'due_date',value:due_date},
	 					{index:'status',value:'open'},
	 					{index:'identified_by',value:identified_by},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Sale lead for customer '+customer,link_to:'form213'}};
				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form213_delete_item(button)
		{
			if(is_delete_access('form213'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var customer=form.elements['customer'].value;
					var data_id=form.elements['id'].value;
					var data_json={data_store:'sale_leads',
	 					log:'yes',
	 					data:[{index:'id',value:data_id}],
	 					log_data:{title:'Deleted',notes:'Sale lead for customer '+customer,link_to:'form213'}};
					var follow_json={data_store:'followups',
	 					data:[{index:'source_id',value:data_id}]};

					delete_json(data_json);
					delete_json(follow_json);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form213_import_template()
		{
			var data_array=['id','customer','detail','due_date','identified_by'];
			vUtil.arrayToCSV(data_array);
		};

		function form213_import_validate(data_array)
		{
			var validate_template_array=[{column:'customer',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'detail',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'due_date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')}];

			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;
		}

		function form213_import(data_array,import_type)
		{
			var data_json={data_store:'sale_leads',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Sale leads for customers',link_to:'form213'}};

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
	 					{index:'customer',value:row.customer},
	 					{index:'detail',value:row.detail},
	 					{index:'due_date',value:get_raw_time(row.due_date)},
	 					{index:'identified_by',value:row.identified_by},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
			});

			if(import_type=='create_new')
			{
				create_batch_json(data_json);
			}
			else
			{
				update_batch_json(data_json);
			}
		}

	</script>
</div>
