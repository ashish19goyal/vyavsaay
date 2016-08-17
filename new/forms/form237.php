<div id='form237' class='tab-pane'>
	<div class='portlet box red'>
		<div class="portlet-title">
			<div class='caption'>Contact Customers</div>
		</div>

		<div class="portlet-body">
			<form id='form237_master' autocomplete="off">
				<div class='row'>
					<div class='col-md-4 col-sm-4'><b>Newsletter</b></div>
					<div class='col-md-8 col-sm-8'><input type='text' name='newsletter'></div>
				</div>
				<div class='row'>
					<div class='col-md-4 col-sm-4'><b>SMS content</b></div>
					<div class='col-md-8 col-sm-8'><textarea required name='sms'></textarea></div>
				</div>
				<div class='row'>
					<div class='col-md-4 col-sm-4'><b>List Type</b></div>
					<div class='col-md-8 col-sm-8'><input type='text' required name='list'></div>
				</div>
				<div class='row'>
					<div class='col-md-4 col-sm-4'><b>List Value</b></div>
					<div class='col-md-8 col-sm-8'><input type='text' name='value'></div>
				</div>
				<div class='row'>
					<div class='col-md-4 col-sm-4'>
					</div>
					<div class='col-md-8 col-sm-8'>
						<input type='hidden' name='nl_id' form='form237_master' value=''>
						<button type='button' name='send' class='btn blue'>Send as per list</button>
						<button type='button' name='send_all' class='btn red'>Send to all</button>
					</div>
				</div>
			</form>
		</div>
	</div>

	<script>
		function form237_header_ini()
		{
			var fields=document.getElementById('form237_master');
			var name_filter=fields.elements['newsletter'];
			var sms_filter=fields.elements['sms'];
			var list_filter=fields.elements['list'];
			var value_filter=fields.elements['value'];
			var id_filter=fields.elements['nl_id'];
			var send_button=fields.elements['send'];
			var send_all_button=fields.elements['send_all'];
			id_filter.value="";
			name_filter.value="";
			list_filter.value="";
			fields.elements['nl_id'].value="";

			$(send_button).off('click');
			$(send_button).on('click',function(event)
			{
				event.preventDefault();
				form237_ini();
			});

			$(send_all_button).off('click');
			$(send_all_button).on('click',function(event)
			{
				event.preventDefault();
				form237_ini_all();
			});

			var list_columns={data_store:'attributes',return_column:'attribute',
											indexes:[{index:'type',exact:'customer'}]};
			set_my_value_list_json(list_columns,list_filter);

			$(list_filter).off('blur');
			$(list_filter).on('blur',function()
			{

				var value_columns={data_store:'attributes',return_column:'value',
													indexes:[{index:'type',exact:'customer'},
																	{index:'attribute',exact:list_filter.value}]};
				set_my_value_list_json(value_columns,value_filter);
			});

			sms_filter.value=get_session_var('sms_content');

			var name_columns={data_store:'newsletter',return_column:'name',
												indexes:[{index:'status',exact:'active'}]};
			set_my_value_list_json(name_columns,name_filter,function ()
			{
				$(name_filter).focus();
			});

			$(name_filter).off('blur');
			$(name_filter).on('blur',function()
			{
				var nl_columns={count:1,data_store:'newsletter',return_column:'id',
												indexes:[{index:'name',exact:name_filter.value}]};
				set_my_value_json(nl_columns,id_filter);
			});

			my_datalist_change(name_filter,function ()
			{
				var nl_columns={count:1,data_store:'newsletter',return_column:'id',
												indexes:[{index:'name',exact:name_filter.value}]};
				set_my_value_json(nl_columns,id_filter);
			});

			var paginator=$('#form237').paginator({visible:false,container:$('#form237')});
			$('#form237').formcontrol();
		}

		function form237_ini()
		{
			var master_form=document.getElementById('form237_master');
			var nl_name=master_form.elements['newsletter'].value;
			var nl_id=master_form.elements['nl_id'].value;
			var sms_content=master_form.elements['sms'].value;
			var list=master_form.elements['list'].value;
			var list_value=master_form.elements['value'].value;

			if(nl_id!="" || nl_name!="" || sms_content!="")
			{
				show_loader();
				var attribute_columns=new Object();
					attribute_columns.data_store='attributes';
					attribute_columns.return_column='name';
					attribute_columns.indexes=[{index:'attribute',exact:list},
											{index:'type',exact:'customer'},
											{index:'value',exact:list_value}];

				read_json_single_column(attribute_columns,function(attributes)
				{
					var customer_columns={data_store:'customers',
										indexes:[{index:'id'},
										{index:'name'},
										{index:'email'},
										{index:'phone'},
										{index:'acc_name',array:attributes},
										{index:'email_subscription',unequal:'no'}]};

					read_json_rows('',customer_columns,function(results)
					{
						form237_print_form(nl_name,nl_id,'mail',function(container)
						{
							var business_title=get_session_var('title');
							var sms_type=get_session_var('sms_type');
							if(sms_type=='undefined')
							{
								sms_type='transaction';
							}
							var to_array=[];
							results.forEach(function (result)
							{
								var customer_phone=result.phone;
								var customer_name=result.name;
								var message=sms_content.replace(/customer_name/g,customer_name);
								message=message.replace(/business_title/g,business_title);

								if(!vUtil.isBlank(message))
								{
									send_sms(customer_phone,message,sms_type);
								}

								if(result.email!="")
								{
									var to={"email":result.email,"name":result.name,"customer_id":result.id};
									to_array.push(to);
								}
							});

							if(!vUtil.isBlank(container))
							{
								var subject=nl_name;
								var email_message=container.innerHTML;
								var from=get_session_var('email');
								var email_to=JSON.stringify(to_array);

								send_email(email_to,from,business_title,subject,email_message,function()
								{
									$("#modal58_link").click();
									hide_loader();
								});
							}
							else
							{
								$("#modal58_link").click();
								hide_loader();
							}
						});
					});
				});
			}
		}

		/**
		 * @form Promotion (flex newsletter)
		 * @formNo 237
		 * @Loading heavy
		 */
		function form237_ini_all()
		{
			var master_form=document.getElementById('form237_master');
			var nl_name=master_form.elements['newsletter'].value;
			var nl_id=master_form.elements['nl_id'].value;
			var sms_content=master_form.elements['sms'].value;
			var list=master_form.elements['list'].value;
			var list_value=master_form.elements['value'].value;

			if(nl_id!="" && nl_name!="" || sms_content!="")
			{
				show_loader();

				var customer_columns={data_store:'customers',
									indexes:[{index:'id'},
										{index:'name'},
										{index:'email'},
										{index:'phone'},
										{index:'acc_name'},
										{index:'email_subscription',unequal:'no'}]};

				read_json_rows('',customer_columns,function(results)
				{
					form237_print_form(nl_name,nl_id,'mail',function(container)
					{
						var business_title=get_session_var('title');
						var sms_type=get_session_var('sms_type');
						if(sms_type=='undefined')
						{
							sms_type='transaction';
						}
						var to_array=[];
						results.forEach(function (result)
						{
							var customer_phone=result.phone;
							var customer_name=result.name;
							var message=sms_content.replace(/customer_name/g,customer_name);
							message=message.replace(/business_title/g,business_title);

							if(!vUtil.isBlank(message))
							{
								send_sms(customer_phone,message,sms_type);
							}

							if(result.email!="")
							{
								var to={"email":result.email,"name":result.name,"customer_id":result.id};
								to_array.push(to);
							}
						});

						if(!vUtil.isBlank(container))
						{
							var subject=nl_name;
							var email_message=container.innerHTML;
							var from=get_session_var('email');
							var email_to=JSON.stringify(to_array);

							send_email(email_to,from,business_title,subject,email_message,function()
							{
								$("#modal58_link").click();
								hide_loader();
							});
						}
						else
						{
							$("#modal58_link").click();
							hide_loader();
						}

					});
				});
			}
		}

	</script>
</div>
