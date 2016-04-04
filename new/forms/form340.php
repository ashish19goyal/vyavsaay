<div id='form340' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form340_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form340_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form340_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form340_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form340_upload' onclick=modal23_action(form340_import_template,form340_import,form340_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form340_header'></form>
						<th><input type='text' placeholder="Customer" class='floatlabel' name='customer' form='form340_header'></th>
						<th><input type='text' placeholder="Details" class='floatlabel' name='detail' form='form340_header'></th>
						<th><input type='text' placeholder="Follow up" readonly='readonly' name='date' form='form340_header'></th>
						<th><input type='text' placeholder="Identified By/PoC" class='floatlabel' name='staff' form='form340_header'></th>
						<th><input type='submit' form='form340_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form340_body'>
			</tbody>
		</table>
	</div>
	
	<script>
		function form340_header_ini()
		{
			var filter_fields=document.getElementById('form340_header');	
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
				form340_ini();
			});	
		}
		
		function form340_ini()
		{
			show_loader();
			var fid=$("#form340_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			$('#form340_body').html("");
			
			var filter_fields=document.getElementById('form340_header');
			var fname=filter_fields.elements['customer'].value;
			var fdetail=filter_fields.elements['detail'].value;
			var fidentity=filter_fields.elements['staff'].value;
			
			var paginator=$('#form340_body').paginator();
			
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
					
			read_json_rows('form340',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var row_class="";
					if(result.status=='closed')
					{
						row_class="class='active'";
					}
					var rowsHTML="<tr "+row_class+">";
						rowsHTML+="<form id='form340_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Customer'>";
								rowsHTML+="<a onclick=\"show_object('customers','"+result.customer+"');\"><textarea readonly='readonly' form='form340_"+result.id+"' name='customer'>"+result.customer+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<textarea readonly='readonly' form='form340_"+result.id+"' class='dblclick_editable' name='detail'>"+result.detail+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Follow up'>";
								rowsHTML+="<input type='text' readonly='readonly' placeholder='Next Due Date' form='form340_"+result.id+"' name='date' class='floatlabel dblclick_editable' value='"+get_my_past_date(result.due_date)+"'>";
							if(result.status!='closed')					
							{					
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form340_"+result.id+"' name='followup'>Follow up</button>";
							}
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Identified By/PoC'>";
							if(result.identified_by=="")
								rowsHTML+="<input type='text' readonly='readonly' form='form340_"+result.id+"' name='staff' class='dblclick_editable' value='"+result.identified_by+"'>";
							else
								rowsHTML+="<input type='text' readonly='readonly' form='form340_"+result.id+"' name='staff' value='"+result.identified_by+"'>";	
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form340_"+result.id+"' name='id' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form340_"+result.id+"' title='Save' name='save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form340_"+result.id+"' title='Delete' name='delete' onclick='form340_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							if(result.status!='closed')					
							{					
								rowsHTML+="<button type='button' class='btn yellow' form='form340_"+result.id+"' onclick=\"modal153_action(this,'"+result.id+"');\">Close Lead</button>";
							}					
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form340_body').append(rowsHTML);
					var fields=document.getElementById("form340_"+result.id);
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
						form340_update_item(fields);
					});
				});
		
				$('#form340').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Sale Leads','form340',function (item)
                {
                    item['followup date']=get_my_past_date(item.due_date);
                    delete item.due_date;
                });
				hide_loader();
			});
		};
		
		function form340_add_item()
		{
			if(is_create_access('form340'))
			{
				var id=get_new_key();
				var rowsHTML="<tr>";
						rowsHTML+="<form id='form340_"+id+"'></form>";
							rowsHTML+="<td data-th='Customer'>";
								rowsHTML+="<input type='text' form='form340_"+id+"' name='customer'>";
								rowsHTML+="<a title='Add new customer profile' class='btn btn-circle btn-icon-only grey-cascade' id='form340_add_customer_"+id+"'><i class='fa fa-plus'></i></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<textarea form='form340_"+id+"' class='dblclick_editable' name='detail'></textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Follow up'>";
								rowsHTML+="<input type='text' placeholder='Next Due Date' form='form340_"+id+"' name='date' class='floatlabel dblclick_editable'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Identified By/PoC'>";
								rowsHTML+="<input type='text' form='form340_"+id+"' name='staff' class='dblclick_editable'>";
								rowsHTML+="<a title='Add new staff profile' class='btn btn-circle btn-icon-only grey-cascade' id='form340_add_staff_"+id+"'><i class='fa fa-plus'></i></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form340_"+id+"' name='id' value='"+id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form340_"+id+"' title='Save' name='save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form340_"+id+"' title='Delete' name='delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
				$('#form340_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form340_"+id);
				var customer_filter=fields.elements[0];
				var detail_filter=fields.elements[1];
				var due_filter=fields.elements[2];
				var by_filter=fields.elements[3];
				
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form340_create_item(fields);
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
		
				var add_customer=document.getElementById('form340_add_customer_'+id);
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
		
				var add_staff=document.getElementById('form340_add_staff_'+id);
				$(add_staff).on('click',function()
				{
					modal16_action(function()
					{	
						set_my_value_list_json(staff_data,by_filter);
					});
				});
				$('#form340').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}		
		}
		
		function form340_create_item(form)
		{
			if(is_create_access('form340'))
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
	 					{index:'customer',value:customer,unique:'yes'},
	 					{index:'detail',value:detail},
	 					{index:'due_date',value:due_date},
	 					{index:'status',value:'open'},
	 					{index:'identified_by',value:identified_by},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Sale lead for customer '+customer,link_to:'form340'}};
				create_json(data_json);
				
				$(form).readonly();
		
				var del_button=form.elements['delete'];
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form340_delete_item(del_button);
				});
				
				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form340_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form340_update_item(form)
		{
			if(is_update_access('form340'))
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
	 				log_data:{title:'Updated',notes:'Sale lead for customer '+customer,link_to:'form340'}};
				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form340_delete_item(button)
		{
			if(is_delete_access('form340'))
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
	 					log_data:{title:'Deleted',notes:'Sale lead for customer '+customer,link_to:'form340'}};
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
		
		function form340_import_template()
		{
			var data_array=['id','person','party name','location','email','contact','requirement','identified by','followup date'];
			my_array_to_csv(data_array);
		};
		
		function form340_import_validate(data_array)
		{
			var validate_template_array=[{column:'person',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
                                         {column:'identified by',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'requirement',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!%\[\]()\"-]+$')},
									{column:'followup date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')}];
							
			var error_array=validate_import_array(data_array,validate_template_array);
			return error_array;					
		}
		
		function form340_import(data_array,import_type)
		{
            var leads_json={data_store:'sale_leads',
 					log:'yes',
 					data:[],
 					log_data:{title:'Sale leads for customers',link_to:'form340'}};

            var data_json={data_store:'customers',
 					loader:'no',
 					data:[]};
            
            var attribute_json={data_store:'attributes',
 					loader:'no',
 					data:[]};

			var account_json={data_store:'accounts',
 					loader:'no',
 					data:[]};

			var counter=1;
			var last_updated=get_my_time();
		
			data_array.forEach(function(row)
			{
				counter+=1;
				if(import_type=='create_new')
				{
					row.id=last_updated+counter;
				}
				
                row.acc_name=row.person+" ("+row.contact+")";
                
				var leads_json_array=[{index:'id',value:row.id},
	 					{index:'customer',value:row.acc_name,unique:'yes'},
	 					{index:'detail',value:row.requirement},
	 					{index:'due_date',value:get_raw_time(row['followup date'])},
	 					{index:'identified_by',value:row['identified by']},
                        {index:'status',value:'open'}
	 					{index:'last_updated',value:last_updated}];

				leads_json.data.push(leads_json_array);

				var data_json_array=[{index:'id',value:row.id},
	 					{index:'name',value:row.person},
	 					{index:'phone',value:row.contact},
	 					{index:'email',value:row.email},
	 					{index:'acc_name',value:row.acc_name,unique:'yes'},
	 					{index:'address',value:row.location},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);

                var attribute_json_array=[{index:'id',value:row.id},
	 					{index:'name',value:row.acc_name,uniqueWith:['attribute']},
	 					{index:'type',value:'customer'},
	 					{index:'attribute',value:'Company Name'},
	 					{index:'value',value:row['party name']},
	 					{index:'last_updated',value:last_updated}];

				attribute_json.data.push(attribute_json_array);

				var account_json_array=[{index:'id',value:row.id},
	 					{index:'acc_name',value:row.acc_name,unique:'yes'},
	 					{index:'type',value:'customer'},
	 					{index:'username',value:''},
	 					{index:'status',value:'active'},
	 					{index:'last_updated',value:last_updated}];

				account_json.data.push(account_json_array);				
			});
			
			if(import_type=='create_new')
			{
				create_batch_json(leads_json);
				create_batch_json(data_json);
				create_batch_json(attribute_json);
				create_batch_json(account_json);
			}
		}

	</script>
</div>