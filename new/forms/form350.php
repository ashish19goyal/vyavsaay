<div id='form350' class='tab-pane'>
	<div class='portlet box red'>
		<div class="portlet-title">
			<div class='caption'>Wish Customers</div>
		</div>

		<div class="portlet-body">
			<form id='form350_master' autocomplete="off">
				<div class='row'>
					<div class='col-md-4 col-sm-4'><b>Newsletter</b></div>
					<div class='col-md-8 col-sm-8'><input type='text' name='newsletter'></div>
				</div>
				<div class='row'>
					<div class='col-md-4 col-sm-4'><b>SMS content</b></div>
					<div class='col-md-8 col-sm-8'><textarea required name='sms'></textarea></div>
				</div>
				<div class='row'>
					<div class='col-md-4 col-sm-4'><b>Wish For</b></div>
					<div class='col-md-8 col-sm-8'><input type='text' name='list'></div>
				</div>
				<div class='row'>
					<div class='col-md-4 col-sm-4'>
					</div>
					<div class='col-md-8 col-sm-8'>
						<input type='hidden' name='nl_id' form='form350_master' value=''>
						<button type='button' name='send' class='btn blue'>Send</button>
					</div>
				</div>
			</form>
		</div>
	</div>

	<script>
		function form350_header_ini()
		{
			var fields=document.getElementById('form350_master');
			var name_filter=fields.elements['newsletter'];
			var sms_filter=fields.elements['sms'];
			var list_filter=fields.elements['list'];
			var id_filter=fields.elements['nl_id'];
			var send_button=fields.elements['send'];

			id_filter.value="";
			list_filter.value="";
			fields.elements['nl_id'].value="";

			$(send_button).off('click');
			$(send_button).on('click',function(event)
			{
				event.preventDefault();
				form350_ini();
			});

			var list_columns={data_store:'attributes',return_column:'attribute',
												indexes:[{index:'type',exact:'customer'}]};
			set_my_value_list_json(list_columns,list_filter);

			sms_filter.value=get_session_var('sms_birthday_wish');
			name_filter.value=get_session_var('newsletter_birthday_wish');

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

			var paginator=$('#form350').paginator({visible:false,container:$('#form350')});
			$('#form350').formcontrol();
		}

		function form350_ini()
		{
			var master_form=document.getElementById('form350_master');
			var nl_name=master_form.elements['newsletter'].value;
			var nl_id=master_form.elements['nl_id'].value;
			var sms_content=master_form.elements['sms'].value;
			var list=master_form.elements['list'].value;

			if(!vUtil.isBlank(nl_id) || !vUtil.isBlank(sms_content))
			{
				show_loader();
				var list_value=vTime.anniversaryDates({'resultFormat':'all'});
				console.log(list_value);
				var attribute_columns={data_store:'attributes',return_column:'name',
															indexes:[{index:'attribute',exact:list},
																			{index:'type',exact:'customer'},
																			{index:'value',array:list_value}]};
				read_json_single_column(attribute_columns,function(attributes)
				{
					var customer_columns={data_store:'customers',
																indexes:[{index:'id'},
																				{index:'name'},
																				{index:'email'},
																				{index:'phone'},
																				{index:'acc_name',array:attributes},
																				{index:'email_subscription',unequal:'no'}]};

					read_json_rows('form350',customer_columns,function(results)
					{
						form350_print_form(nl_name,nl_id,'mail',function(container)
						{
							var business_title=get_session_var('title');
							var subject=nl_name;

							var email_id_string="";
							var email_message=container.innerHTML;
							var from=get_session_var('email');

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

								send_sms(customer_phone,message,sms_type);

								if(result.email!="")
								{
									var to={"email":result.email,"name":result.name,"customer_id":result.id};
									to_array.push(to);
								}
							});

							var email_to=JSON.stringify(to_array);
							//console.log(email_to);

							send_email(email_to,from,business_title,subject,email_message,function()
							{
								$("#modal58_link").click();
								hide_loader();
							});
						});
					});
				});
			}
		}

		function form350_print_form(nl_name,nl_id,print_type,func)
		{
			var container=document.createElement('div');
			var header=document.createElement('div');
				var logo=document.createElement('div');

			var nl_content=document.createElement('div');

			var footer=document.createElement('div');
				var powered_by=document.createElement('div');

		////////////setting styles for containers/////////////////////////

			header.setAttribute('style','width:98%;min-height:100px;text-align:center');

			nl_content.setAttribute('style','display:block;width:98%;height:auto;text-align:center;');

			footer.setAttribute('style','width:98%;min-height:100px;text-align:center;margin:5px;');
				powered_by.setAttribute('style','width:98%;text-align:center');

		///////////////getting the content////////////////////////////////////////

			var bt=get_session_var('title');
			var logo_image=get_session_var('logo');
			var powered_by_text=get_session_var('powered_by');
			var powered_by_link=get_session_var('powered_by_link');
			var domain=get_session_var('domain');

		////////////////filling in the content into the containers/////////////////////////////////////

			logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";

			if(powered_by_text!="")
			{
				powered_by.innerHTML="<hr style='border: 1px solid #000;'>Powered By: <a href='"+powered_by_link+"'>"+powered_by_text+"</a> | <a href='https://vyavsaay.com/f/u.htm?d="+domain+"&i=*|customer_id|*'>Unsubscribe</a>";
			}
			else
			{
				powered_by.innerHTML="<hr style='border: 1px solid #000;'>Powered By: <a href='https://vyavsaay.com'>Vyavsaay ERP</a> | <a href='https://vyavsaay.com/f/u.htm?d="+domain+"&i=*|customer_id|*'>Unsubscribe</a>";
			}

		/////////////placing the containers //////////////////////////////////////////////////////
			container.appendChild(header);
			container.appendChild(nl_content);
			container.appendChild(footer);

			header.appendChild(logo);

			footer.appendChild(powered_by);

		/////////////////populating the content section with newsletter items//////////////////////////
			var newsletter_data=new Object();
				newsletter_data.data_store='newsletter';
				newsletter_data.count=1;
				newsletter_data.indexes=[{index:'id',value:nl_id},
									{index:'html_content'}];

			read_json_rows('',newsletter_data,function(results)
			{
				//console.log(results);
				if(results.length>0)
				{
					var updated_content=revert_htmlentities(results[0].html_content);
					$(nl_content).html(updated_content);

					$(nl_content).find('img').each(function(index)
					{
						var image_elem=$(this)[0];
						var data_src=image_elem.getAttribute('data-src');

						image_elem.src="https://s3-ap-southeast-1.amazonaws.com/vyavsaay-newsletter/"+data_src;
					});
				}
				//console.log(container.innerHTML);

				func(container);
			});
		}

	</script>
</div>
