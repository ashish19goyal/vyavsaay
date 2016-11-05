<div id='form292' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form292_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form292_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form292_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form292_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form292_header'></form>
						<th><input type='text' placeholder="Domain" class='floatlabel' name='domain' form='form292_header'></th>
						<th><input type='text' placeholder="Period" readonly='readonly' form='form292_header'></th>
						<th><input type='text' placeholder="Invoice" class='floatlabel' name='invoice' form='form292_header'></th>
						<th><input type='text' placeholder="Amount" readonly="readonly" form='form292_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form292_header'></th>
						<th><input type='submit' form='form292_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form292_body'>
			</tbody>
		</table>
	</div>

	<script>
	function form292_header_ini()
	{
		var filter_fields=document.getElementById('form292_header');
		var name_filter=filter_fields.elements['domain'];
		var invoice_filter=filter_fields.elements['invoice'];
		var status_filter=filter_fields.elements['status'];

		var name_data={data_store:'user_profile',
						database:'0',
						indexes:[{index:'name'}],
						return_column:'name'};
		set_master_filter_json(name_data,name_filter);

		var invoice_data={data_store:'bills',
						indexes:[{index:'bill_num'}],
						return_column:'bill_num'};
		set_my_filter_json(invoice_data,invoice_filter);

		set_static_filter_json('system_billing','payment_status',status_filter);

		$(filter_fields).off('submit');
		$(filter_fields).on('submit',function(event)
		{
			event.preventDefault();
			form292_ini();
		});
		$('#form292').formcontrol();
	}

	function form292_ini()
	{
		show_loader();
		var fid=$("#form292_link").attr('data_id');
		if(fid==null)
			fid="";

		$('#form292_body').html("");

		var filter_fields=document.getElementById('form292_header');
		var fname=filter_fields.elements['domain'].value;
		var finvoice=filter_fields.elements['invoice'].value;
		var fstatus=filter_fields.elements['status'].value;

		var paginator=$('#form292_body').paginator();

		var new_columns={count:paginator.page_size(),
						start_index:paginator.get_index(),
						data_store:'bills',
						indexes:[{index:'id',value:fid},
								{index:'customer_name'},
								{index:'bill_num',value:finvoice},
								{index:'amount'},
								{index:'domain',value:fname},
								{index:'display'},
								{index:'tax'},
								{index:'total'},
								{index:'status',value:fstatus},
								{index:'total_quantity'},
								{index:'period_start'},
								{index:'period_end'},
								{index:'notes'},
								{index:'bill_date'}]};

		read_json_rows('form292',new_columns,function(results)
		{
			var bt=get_session_var('title');
			results.forEach(function(result)
			{
				var rowsHTML="<tr>";
					rowsHTML+="<form id='form292_"+result.id+"'></form>";
						rowsHTML+="<td data-th='Domain'>";
							rowsHTML+="<textarea class='floatlabel dblclick_editable' placeholder='Name' readonly='readonly' form='form292_"+result.id+"'>"+result.customer_name+"</textarea>";
							rowsHTML+="<input type='text' class='floatlabel' placeholder='Domain' readonly='readonly' form='form292_"+result.id+"' value='"+result.domain+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Period'>";
							rowsHTML+="<input type='text' class='floatlabel' placeholder='From' readonly='readonly' form='form292_"+result.id+"' value='"+get_my_past_date(result.period_start)+"'>";
							rowsHTML+="<input type='text' class='floatlabel' placeholder='To' readonly='readonly' form='form292_"+result.id+"' value='"+get_my_past_date(result.period_end)+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Invoice'>";
							rowsHTML+="<input type='text' class='floatlabel' placeholder='Invoice #' readonly='readonly' form='form292_"+result.id+"' value='"+result.bill_num+"'>";
							rowsHTML+="<textarea class='floatlabel' placeholder='Remarks' readonly='readonly' form='form292_"+result.id+"' class='dblclick_editable'>"+result.notes+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Amount'>";
							rowsHTML+="<input type='number' step='any' class='floatlabel dblclick_editable' placeholder='User Accounts' readonly='readonly' form='form292_"+result.id+"' value='"+result.total_quantity+"'>";
							rowsHTML+="<input type='number' step='any' class='floatlabel dblclick_editable' placeholder='Amount' readonly='readonly' form='form292_"+result.id+"' value='"+result.amount+"'>";
							rowsHTML+="<input type='number' step='any' class='floatlabel dblclick_editable' placeholder='Tax' readonly='readonly' form='form292_"+result.id+"' value='"+result.tax+"'>";
							rowsHTML+="<input type='number' step='any' class='floatlabel' placeholder='Total' readonly='readonly' form='form292_"+result.id+"' value='"+result.total+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' placeholder='Payment' required class='floatlabel dblclick_editable' form='form292_"+result.id+"' value='"+result.status+"'>";
							rowsHTML+="<input type='text' readonly='readonly' placeholder='Display' required class='floatlabel dblclick_editable' form='form292_"+result.id+"' value='"+result.display+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form292_"+result.id+"' value='"+result.id+"'>";
							if(result.status!='cancelled')
							{
								rowsHTML+="<button type='submit' title='Save' class='btn green' form='form292_"+result.id+"'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' title='Delete' class='btn red' form='form292_"+result.id+"' onclick='form292_delete_item($(this));'><i class='fa fa-trash'></i></button>";
								rowsHTML+="<button type='button' title='Email' class='btn yellow' form='form292_"+result.id+"' name='share'><i class='fa fa-reply'></i></button>";
								rowsHTML+="<button type='button' title='Print' class='btn purple' form='form292_"+result.id+"' name='print'><i class='fa fa-print'></i></button>";
							}
							rowsHTML+="<input type='hidden' form='form292_"+result.id+"' name='bill_date' value='"+result.bill_date+"'>";
						rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form292_body').append(rowsHTML);
				var fields=document.getElementById("form292_"+result.id);
				var invoice_filter=fields.elements[4];
				var amount_filter=fields.elements[7];
				var tax_filter=fields.elements[8];
				var total_filter=fields.elements[9];
				var status_filter=fields.elements[10];
				var display_filter=fields.elements[11];
				var share_button=fields.elements['share'];
				var print_button=fields.elements['print'];

				$(share_button).on('click',function ()
				{
					modal101_action('Invoice # '+invoice_filter.value+' from - '+bt,result.customer_name,'customer',function (func)
					{
						print_form292(result.id,func);
					});
				});

				$(print_button).on('click',function ()
				{
					form292_print_form(result.id);
				});

				var tax_rate=get_session_var('service_tax_rate');

				$(amount_filter).on('blur change',function ()
				{
					tax_filter.value=parseFloat(amount_filter.value)*parseFloat(tax_rate)/100;
					total_filter.value=vUtil.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value),0);
				});

				$(tax_filter).on('blur change',function ()
				{
					total_filter.value=vUtil.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value),0);
				});

				set_static_value_list_json('system_billing','payment_status',status_filter);
				set_static_value_list_json('system_billing','display',display_filter);

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form292_update_item(fields);
				});
			});

			$('#form292').formcontrol();
			paginator.update_index(results.length);
			vExport.export_buttons({action:'dynamic',columns:new_columns,file:'Invoices',report_id:'form292',feach:function (item)
			{
				item['bill date']=get_my_past_date(item.bill_date);
				delete item.bill_date;
			}});
			hide_loader();
		});
	};

	function form292_add_item()
	{
		if(is_create_access('form292'))
		{
			var id=vUtil.newKey();
			var rowsHTML="<tr>";
				rowsHTML+="<form id='form292_"+id+"'></form>";
					rowsHTML+="<td data-th='Domain'>";
						rowsHTML+="<input type='text' class='floatlabel' placeholder='Name' readonly='readonly' form='form292_"+id+"'>";
						rowsHTML+="<input type='text' class='floatlabel' placeholder='Domain' required form='form292_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Period'>";
						rowsHTML+="<input type='text' class='floatlabel' placeholder='From' form='form292_"+id+"'>";
						rowsHTML+="<input type='text' class='floatlabel' placeholder='To' form='form292_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Invoice'>";
						rowsHTML+="<input type='text' class='floatlabel' placeholder='Invoice #' form='form292_"+id+"' required readonly='readonly'>";
						rowsHTML+="<textarea form='form292_"+id+"' class='dblclick_editable floatlabel' placeholder='Remarks'></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Amount'>";
						rowsHTML+="<input type='number' step='any' form='form292_"+id+"' class='dblclick_editable floatlabel' placeholder='User Accounts'>";
						rowsHTML+="<input type='number' step='any' form='form292_"+id+"' class='dblclick_editable floatlabel' placeholder='Amount'>";
						rowsHTML+="<input type='number' step='any' form='form292_"+id+"' class='dblclick_editable floatlabel' placeholder='Tax'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form292_"+id+"' class='floatlabel' placeholder='Total'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' required class='dblclick_editable floatlabel' placeholder='Payment' form='form292_"+id+"'>";
						rowsHTML+="<input type='text' required class='dblclick_editable floatlabel' placeholder='Display' value='show' form='form292_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form292_"+id+"' value='"+id+"'>";
						rowsHTML+="<button type='submit' title='Save' class='btn green' form='form292_"+id+"'><i class='fa fa-save'></i></button>";
						rowsHTML+="<button type='button' title='Delete' class='btn red' form='form292_"+id+"' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
					rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form292_body').prepend(rowsHTML);
			var fields=document.getElementById("form292_"+id);
			var customer_filter=fields.elements[0];
			var domain_filter=fields.elements[1];
			var start_filter=fields.elements[2];
			var end_filter=fields.elements[3];
			var invoice_filter=fields.elements[4];
			var amount_filter=fields.elements[7];
			var tax_filter=fields.elements[8];
			var total_filter=fields.elements[9];
			var status_filter=fields.elements[10];
			var display_filter=fields.elements[11];

			var name_data={data_store:'user_profile',
						  database:'0',
						  indexes:[{index:'username'}],
						  return_column:'username'};
			set_master_list_json(name_data,domain_filter,function ()
			{
				$(domain_filter).focus();
			});

			$(domain_filter).on('blur',function ()
			{
				var domain_data={data_store:'user_profile',
								database:'0',
								indexes:[{index:'username',exact:domain_filter.value}],
								return_column:'name'};
				set_master_value_json(domain_data,customer_filter);
			});

			$(start_filter).datepicker();
			$(end_filter).datepicker();

			var invoice_data={data_store:'user_preferences',
							indexes:[{index:'name',exact:'bill_num'}],
							return_column:'value'};
			read_json_single_column(invoice_data,function (nums)
			{
				if(nums.length>0)
				{
					invoice_filter.value=get_session_var('bill_num_prefix')+"-"+nums[0];
				}
			});

			var tax_rate=get_session_var('service_tax_rate');
			$(amount_filter).on('blur change',function ()
			{
				tax_filter.value=parseFloat(amount_filter.value)*parseFloat(tax_rate)/100;
				total_filter.value=vUtil.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value),0);
			});

			$(tax_filter).on('blur change',function ()
			{
				total_filter.value=vUtil.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value),0);
			});

			set_static_value_list_json('system_billing','payment_status',status_filter);
			set_static_value_list_json('system_billing','display',display_filter);

			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form292_create_item(fields);
			});
			$('#form292').formcontrol();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form292_create_item(form)
	{
		if(is_create_access('form292'))
		{
			var domain=form.elements[1].value;
			var bill_num=form.elements[4].value;
			var last_updated=get_my_time();
			var new_columns={data_store:'system_billing',
							database:'re_user_'+domain,
							data:[{index:'id',value:form.elements[12].value},
								{index:'account_name',value:form.elements[0].value},
								{index:'period_start',value:get_raw_time(form.elements[2].value)},
								{index:'period_end',value:get_raw_time(form.elements[3].value)},
								{index:'order_id',value:form.elements[4].value},
								{index:'narration',value:form.elements[5].value},
								{index:'user_accounts',value:form.elements[6].value},
								{index:'currency',value:'Rs'},
								{index:'amount',value:form.elements[7].value},
								{index:'tax',value:form.elements[8].value},
								{index:'total',value:form.elements[9].value},
								{index:'payment_status',value:form.elements[10].value},
								{index:'display',value:form.elements[11].value},
								{index:'last_updated',value:last_updated}]};

			var two_columns={data_store:'bills',
							database:'re_user_vyavsaay',
							data:[{index:'id',value:form.elements[12].value},
								{index:'customer_name',value:form.elements[0].value},
								{index:'domain',value:form.elements[1].value},
								{index:'period_start',value:get_raw_time(form.elements[2].value)},
								{index:'period_end',value:get_raw_time(form.elements[3].value)},
								{index:'bill_num',value:form.elements[4].value,unique:'yes'},
								{index:'notes',value:form.elements[5].value},
								{index:'total_quantity',value:form.elements[6].value},
								{index:'amount',value:form.elements[7].value},
								{index:'tax',value:form.elements[8].value},
								{index:'total',value:form.elements[9].value},
								{index:'status',value:form.elements[10].value},
								{index:'display',value:form.elements[11].value},
								{index:'bill_date',value:last_updated},
								{index:'last_updated',value:last_updated}]};

			server_create_master(new_columns);
			server_create_master(two_columns);

			var num_data={data_store:'user_preferences',
						return_column:'id',
						indexes:[{index:'name',exact:'bill_num'}]};
			read_json_single_column(num_data,function (bill_num_ids)
			{
				if(bill_num_ids.length>0)
				{
					var bill_num_array=bill_num.split("-");
					var num_json={data_store:'user_preferences',
									data:[{index:'id',value:bill_num_ids[0]},
										{index:'value',value:(parseInt(bill_num_array[1])+1)},
										{index:'last_updated',value:last_updated}]};

					update_json(num_json);
				}
			});

			$(form).readonly();

			var del_button=form.elements[14];
			del_button.removeAttribute("onclick");
			$(del_button).on('click',function(event)
			{
				form292_delete_item(del_button);
			});

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form292_update_item(form);
			});
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form292_update_item(form)
	{
		if(is_update_access('form292'))
		{
			var domain=form.elements[1].value;
			var new_columns={data_store:'system_billing',
							database:'re_user_'+domain,
							data:[{index:'id',value:form.elements[12].value},
								{index:'account_name',value:form.elements[0].value},
								{index:'period_start',value:get_raw_time(form.elements[2].value)},
								{index:'period_end',value:get_raw_time(form.elements[3].value)},
								{index:'order_id',value:form.elements[4].value},
								{index:'narration',value:form.elements[5].value},
								{index:'user_accounts',value:form.elements[6].value},
								{index:'amount',value:form.elements[7].value},
								{index:'tax',value:form.elements[8].value},
								{index:'total',value:form.elements[9].value},
								{index:'payment_status',value:form.elements[10].value},
								{index:'display',value:form.elements[11].value},
								{index:'last_updated',value:get_my_time()}]};

			var two_columns={data_store:'bills',
							database:'re_user_vyavsaay',
							data:[{index:'id',value:form.elements[12].value},
								{index:'customer_name',value:form.elements[0].value},
								{index:'domain',value:form.elements[1].value},
								{index:'period_start',value:get_raw_time(form.elements[2].value)},
								{index:'period_end',value:get_raw_time(form.elements[3].value)},
								{index:'bill_num',value:form.elements[4].value,unique:'yes'},
								{index:'notes',value:form.elements[5].value},
								{index:'total_quantity',value:form.elements[6].value},
								{index:'amount',value:form.elements[7].value},
								{index:'tax',value:form.elements[8].value},
								{index:'total',value:form.elements[9].value},
								{index:'status',value:form.elements[10].value},
								{index:'display',value:form.elements[11].value},
								{index:'bill_date',value:get_my_time()},
								{index:'last_updated',value:get_my_time()}]};

			server_update_master(new_columns);
			server_update_master(two_columns);

			$(form).readonly();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form292_delete_item(button)
	{
		if(is_delete_access('form292'))
		{
			modal115_action(function()
			{
				var form_id=$(button).attr('form');
				var form=document.getElementById(form_id);
				var domain=form.elements[1].value;
				form.elements[10].value='cancelled';

				var new_columns={data_store:'system_billing',
								database:'re_user_'+domain,
								data:[{index:'id',value:form.elements[12].value}]};
				server_delete_master(new_columns);

				var two_columns={data_store:'bills',
								database:'re_user_vyavsaay',
								data:[{index:'id',value:form.elements[12].value},
									{index:'status',value:'cancelled'},
									{index:'last_updated',value:get_my_time()}]};
				server_update_master(two_columns);
			});
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form292_print_form(id)
	{
		print_form292(id,function(container)
		{
			$.print(container);
			container.innerHTML="";
		});
	}

	function print_form292(id,func)
	{
		var form_id='form292';
		////////////setting up containers///////////////////////
		var container=document.createElement('div');
		var header=document.createElement('div');
			var logo=document.createElement('div');

		var invoice_line=document.createElement('div');

		var info_section=document.createElement('div');
			var customer_info=document.createElement('div');
			var business_info=document.createElement('div');
			var clear_both=document.createElement('div');

		var table_container=document.createElement('div');

		var footer=document.createElement('div');
			var jurisdiction=document.createElement('div');
			var business_contact=document.createElement('div');

	////////////setting styles for containers/////////////////////////

		header.setAttribute('style','width:100%;text-align:center');
			logo.setAttribute('style','width:100%;text-align:center;');

		info_section.setAttribute('style','width:100%;min-height:100px;font-size:14px;');
			customer_info.setAttribute('style','padding:5px;margin:5px 1px;float:left;width:48%;height:100px;border: 1px solid #000;border-radius:5px;');
			business_info.setAttribute('style','padding:5px;margin:5px 1px;float:right;width:48%;height:100px;border: 1px solid #000;border-radius:5px;');
			clear_both.setAttribute('style','clear:both');

		footer.setAttribute('style','width:98%;min-height:100px;');
			jurisdiction.setAttribute('style','margin:10px;width:98%;min-height:20px;text-align:left;font-size:12px;');
			business_contact.setAttribute('style','margin:0px;padding:0px;width:98%;text-align:center;page-break-inside:avoid;font-size:12px;');

	///////////////getting the content////////////////////////////////////////

		var bt=get_session_var('title');
		var logo_image=get_session_var('logo');
		var business_address=get_session_var('address');
		var business_phone=get_session_var('phone');
		var business_email=get_session_var('email');

		var master_form=document.getElementById(form_id+'_'+id);
		var customer_name=master_form.elements[0].value;
		var domain=master_form.elements[1].value;
		var bill_start=master_form.elements[2].value;
		var bill_end=master_form.elements[3].value;
		var bill_no=master_form.elements[4].value;
		var narration=master_form.elements[5].value;
		var bill_user_accounts=master_form.elements[6].value;
		var bill_amount=master_form.elements[7].value;
		var bill_tax=master_form.elements[8].value;
		var bill_total=master_form.elements[9].value;
		var bill_date=vTime.date({time:master_form.elements['bill_date'].value});

		// var st_no=get_session_var('service_tax_no');
		var pan=get_session_var('pan');
		////////////////filling in the content into the containers//////////////////////////

		logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";

		invoice_line.innerHTML="<hr style='border: 1px solid #000;'><div style='text-align:center;'><b style='font-size:16px;'>Invoice</b></div><hr style='border: 1px solid #000;'>";

		customer_info.innerHTML="<b>Customer: </b><br>"+customer_name+"<br>Account Name: "+domain;
		business_info.innerHTML="Bill #: "+bill_no+"<br>Bill Date: "+bill_date+"<br>Print Date: "+vTime.date();//+"<br>ST #: "+st_no;

		jurisdiction.innerHTML="All disputes subjected to Delhi jurisdiction.<br>This is a computer generated invoice.";
		business_contact.innerHTML="<hr style='border: 1px solid #000;margin:5px;'>Address: "+business_address+"<br>Phone: "+business_phone+", E-Mail: "+business_email+"<br>PAN: "+pan+"<hr style='border: 1px solid #000;margin:5px;'>";

		var table_element=document.getElementById(form_id+'_body');

		/////////////adding new table //////////////////////////////////////////////////////
		var new_table=document.createElement('table');
		new_table.setAttribute('style','width:98%;font-size:14px;border:1px solid #000;text-align:left;margin-left:1%;');
		new_table.setAttribute('class','plain_table');
		var table_header="<tr>"+
					"<td style='border: 1px solid #000;text-align:left;width:6%;font-weight:600;'>S.No.</td>"+
					"<td style='border: 1px solid #000;text-align:left;width:24%;font-weight:600;'>Item</td>"+
					"<td style='border: 1px solid #000;text-align:left;width:25%;font-weight:600;'>Period</td>"+
					"<td style='border: 1px solid #000;text-align:left;width:15%;font-weight:600;'>Amount</td>"+
					"<td style='border: 1px solid #000;text-align:left;width:15%;font-weight:600;'>Tax</td>"+
					"<td style='border: 1px solid #000;text-align:left;width:15%;font-weight:600;'>Total</td></tr>";

		var table_rows=table_header;

		table_rows+="<tr>"+
					"<td style='border: 1px solid #000;text-align:left;'>1</td>"+
					"<td style='border: 1px solid #000;text-align:left;'>"+narration+"</td>"+
					"<td style='border: 1px solid #000;text-align:left;'>"+bill_start+" - "+bill_end+"</td>"+
					"<td style='border: 1px solid #000;text-align:left;'>Rs. "+bill_amount+"</td>"+
					"<td style='border: 1px solid #000;text-align:left;'>Rs. "+bill_tax+"</td>"+
					"<td style='border: 1px solid #000;text-align:left;'>Rs. "+bill_total+"</td></tr>";

		var rows_to_add=10;
		for(var i=0;i<rows_to_add;i++)
		{
			table_rows+="<tr style='flex:2;border-right:1px solid #000;border-left:1px solid #000;height:30px;'><td style='border:none'></td><td style='border:none'></td><td style='border:none'></td><td style='border:none'></td><td style='border:none'></td><td style='border:none'></td></tr>";
		}

		var wording_total=number2text(bill_total);

		var table_foot_row="<tr style='border-right: 1px solid #000;border-left: 1px solid #000;border-top: 1px solid #000;a'>"+
					"<td colspan='3' style='border: 1px solid #000;text-align:left;'>Total (in words): "+wording_total+"</td>"+
					"<td colspan='1' style='border: 1px solid #000;text-align:left;'>Total</td>"+
					"<td colspan='2' style='border: 1px solid #000;text-align:left;font-size:1.2em;font-weight:bold;'>Rs. "+bill_total+"</td></tr>";

		table_rows+=table_foot_row;
		new_table.innerHTML=table_rows;

		/////////////placing the containers //////////////////////////////////////////////////////

		container.appendChild(header);
		container.appendChild(invoice_line);
		container.appendChild(info_section);

		container.appendChild(new_table);
		container.appendChild(footer);

		header.appendChild(logo);
		header.appendChild(business_contact);

		info_section.appendChild(customer_info);
		info_section.appendChild(business_info);
		info_section.appendChild(clear_both);

		footer.appendChild(jurisdiction);
		footer.appendChild(business_contact);

		func(container);
	}

	</script>
</div>
