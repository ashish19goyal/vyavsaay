<div id='form214' class='tab-pane portlet box grey'>
	<div class="portlet-title" style='text-align:center;'>
		<div><img id='form214_logo' style='max-width:90%;max-height:200px;'></div>	
	</div>

	<div class="portlet-body">
		<form id='form214_master' autocomplete="off">
			<div class='row'>
				<div class='col-md-4 col-sm-4'><b>Name</b></div>
				<div class='col-md-8 col-sm-8'><input type='text' name='name' required></div>
			</div>
			<div class='row'>	
				<div class='col-md-4 col-sm-4'><b>Phone</b></div>
				<div class='col-md-8 col-sm-8'><input type='tel' required name='phone'></div>
			</div>
			<div class='row'>	
				<div class='col-md-4 col-sm-4'><b>Email</b></div>
				<div class='col-md-8 col-sm-8'><input type='email' name='email'></div>
			</div>
			<div class='row'>	
				<div class='col-md-4 col-sm-4'><b>Address</b></div>
				<div class='col-md-8 col-sm-8'><textarea name='address'></textarea></div>
			</div>
			<div id='form214_attributes'>
			</div>
			<div class='row'>	
				<div class='col-md-4 col-sm-4'><b>Requirement Details</b></div>
				<div class='col-md-8 col-sm-8'><textarea name='details'></textarea></div>
			</div>
			<div class='row'>	
				<div class='col-md-4 col-sm-4'><b>Follow-up Date</b></div>
				<div class='col-md-8 col-sm-8'><input type='text' name='date'></div>
			</div>
			<div class='row'>	
				<div class='col-md-4 col-sm-4'><b>Contact Person</b></div>
				<div class='col-md-8 col-sm-8'><input type='text' name='contact'></div>
			</div>
			<div class='row'>	
				<div class='col-md-4 col-sm-4'>
				</div>
				<div class='col-md-8 col-sm-8'>
					<input type='submit' name='save' value='Save' class='btn green'>
				</div>	
			</div>
		</form>		
	</div>

	<script>
		function form214_header_ini()
		{
			var fields=document.getElementById('form214_master');
		
			$(fields).off('submit');
			$(fields).on('submit',function(event)
			{
				event.preventDefault();
				form214_create_item();
			});
		
			var date_filter=fields.elements['date'];
			$(date_filter).datepicker();
		
			$('#form214_attributes').html("");
			
			
			var logo_image=get_session_var('logo');
			var business_intro_text=get_session_var('business_intro');
			var business_address=get_session_var('address');
			var business_phone=get_session_var('phone');
			var business_email=get_session_var('email');
			var business_website=get_session_var('website');
			$('#form214_logo').attr('src','./client_images/'+logo_image);
		}
		
		function form214_ini()
		{
			show_loader();
			
			var master_form=document.getElementById('form214_master');
			var name_filter=master_form.elements['name'];
			var phone_filter=master_form.elements['phone'];
			var email_filter=master_form.elements['email'];
			var address_filter=master_form.elements['address'];
			var details_filter=master_form.elements['details'];
			var date_filter=master_form.elements['date'];
			var contact_person_filter=master_form.elements['contact'];
			
            $(date_filter).datepicker();
            
			master_form.reset();
			name_filter.value="";
			phone_filter.value="";
			email_filter.value="";
			address_filter.value="";
			details_filter.value="";
			contact_person_filter.value=get_account_name();
		
			var attribute_label=document.getElementById('form214_attributes');
			$(attribute_label).html('');	
			var attribute_columns=new Object();
					attribute_columns.data_store='mandatory_attributes';
					attribute_columns.indexes=[{index:'attribute'},{index:'status'},{index:'value'},
											{index:'object',exact:'customer'}];
							
			read_json_rows('',attribute_columns,function(attributes)
			{
				attributes.forEach(function(attribute)
				{
					if(attribute.status!='inactive')
					{
						var required="";
						if(attribute.status=='required')
							required='required'
						var attr_label=document.createElement('div');
						attr_label.setAttribute('class','row');
						if(attribute.value=="")
						{
							attr_label.innerHTML="<div class='col-md-4 col-sm-4'><b>"+attribute.attribute+"</b></div>"+
					     			"<div class='col-sm-8 col-md-8'><input type='text' "+required+" name='"+attribute.attribute+"'></div>";				
						}				
						else 
						{
							var values_array=attribute.value.split(";");
							var content="<div class='col-sm-4 col-md-4'><b>"+attribute.attribute+"</b></div>"+
					     			"<div class='col-sm-8 col-md-8'><select "+required+" name='"+attribute.attribute+"'>";					
												
							values_array.forEach(function(fvalue)
							{
								content+="<option value='"+fvalue+"'>"+fvalue+"</option>";
							});
							content+="</div></select>";
							attr_label.innerHTML=content;
						}
						attribute_label.appendChild(attr_label);
					}
				});
				hide_loader();
			});
		};
		
		function form214_create_item()
		{
			if(is_create_access('form214'))
			{
				var form=document.getElementById("form214_master");
				
				var name=form.elements['name'].value;
				var phone=form.elements['phone'].value;
				var email=form.elements['email'].value;
				var address=form.elements['address'].value;
				var details=form.elements['details'].value;
				var due_date=form.elements['date'].value;
				var identified_by=form.elements['contact'].value;
				var acc_name=name+" ("+phone+")";
					
				var id=get_new_key();
				var last_updated=get_my_time();
				var customer_json={data_store:'customers',
			 				warning:'no',
			 				data:[{index:'id',value:id},
			 					{index:'name',value:name},
			 					{index:'phone',value:phone},
			 					{index:'email',value:email},
			 					{index:'acc_name',value:acc_name,unique:'yes'},
			 					{index:'status',value:'active'},
			 					{index:'address',value:address},
			 					{index:'last_updated',value:last_updated}]};
				var lead_json={data_store:'sale_leads',
			 				data:[{index:'id',value:id},
			 					{index:'customer',value:acc_name},
			 					{index:'detail',value:details},
			 					{index:'due_date',value:get_raw_time(due_date)},
			 					{index:'status',value:'open'},
			 					{index:'identified_by',value:identified_by},
			 					{index:'last_updated',value:last_updated}]};			 				
				
				create_json(lead_json);
				create_json(customer_json);
				
				var business_title=get_session_var('title');
				var sms_content=get_session_var('sms_content');			
				var message=sms_content.replace(/customer_name/g,name);
				message=message.replace(/business_title/g,business_title);
				
				send_sms(phone,message,'transaction');
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
							var to_array=[{"name":name,"email":email,"customer_id":id}];					
							var to=JSON.stringify(to_array);
							var from=get_session_var('email');
							send_email(to,from,business_title,subject,message,function(){});
						});
					}
				});

				$("#form214_attributes").find('input, select').each(function()
				{
					id++;
					var value=$(this).val();
					var attribute=$(this).attr('name');
					if(value!="")
					{
						var data_json={data_store:'attributes',
			 				data:[{index:'id',value:id},
			 					{index:'name',value:acc_name},
			 					{index:'type',value:'customer'},
			 					{index:'attribute',value:attribute},
			 					{index:'value',value:value},
			 					{index:'last_updated',value:last_updated}]};
						create_json(data_json);
					}
				});
		
				$('#modal62_link').click();
				form214_ini();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

	</script>
</div>