<div id='form8' class='tab-pane portlet box yellow-saffron'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal16_action();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form8_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form8_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form8_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
		<form id='form8_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Name" class='floatlabel' name='name'></label>
				<label><input type='text' placeholder="Phone" class='floatlabel' name='contact'></label>
				<label><input type='text' placeholder="Email" class='floatlabel' name='email'></label>
				<label><input type='text' placeholder="Status" class='floatlabel' name='status'></label>
				<label><input type='submit' class='submit_hidden'></label>			
			</fieldset>
		</form>
		<br>
		<div id='form8_body' class='row'>
			
		</div>
	</div>
	
	<script>

		function form8_header_ini()
		{
			var filter_fields=document.getElementById('form8_header');
			var name_filter=filter_fields.elements['name'];
			var status_filter=filter_fields.elements['status'];
			
			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form8_ini();
			});
		
			var name_data=new Object();
				name_data.data_store="staff";
				name_data.return_column="name";
				name_data.indexes=[{index:'id'}];
			
			set_my_filter_json(name_data,name_filter);
			set_static_filter_json('staff','status',status_filter);
		};
		
		function form8_ini()
		{
			show_loader();
			var fid=$("#form8_link").attr('data_id');
			if(fid==null)
				fid="";	
				
			$('#form8_body').html("");
			var filter_fields=document.getElementById('form8_header');
			var fname=filter_fields.elements['name'].value;
			var fcontact=filter_fields.elements['contact'].value;
			var femail=filter_fields.elements['email'].value;
			var fstatus=filter_fields.elements['status'].value;
			
			var paginator=$('#form8_body').paginator({'page_size':24});
			
			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='staff';

					columns.indexes=[{index:'id',value:fid},
									{index:'name',value:fname},
									{index:'acc_name'},
									{index:'phone',value:fcontact},
									{index:'email',value:femail},
									{index:'status',value:fstatus},
									{index:'address'},
									{index:'city'},
									{index:'state'},
									{index:'pincode'}];		
			
			read_json_rows('form8',columns,function(results)
			{
				var counter=0;
				results.forEach(function(result)
				{
					var clear_both="";
					if((counter%4)==0)
					{
						clear_both="style='clear:both;'";
					}
					counter++;
					var first_char=result.name.substr(0,1);
					var rowsHTML="<div class='col-xs-6 col-sm-3 col-md-3' "+clear_both+">"+
											"<div class='thumbnail'>"+
												"<div class='vr_image_container'>"+
													"<div class='row thumbnail-button-bottom'>"+
	            										"<button type='submit' class='btn' form='form8_"+result.id+"' name='save' title='Save'><i class='fa fa-2x fa-save'></i></button>"+
															"<button type='button' class='btn' form='form8_"+result.id+"' name='delete' title='Delete' onclick='form8_delete_item($(this));'><i class='fa fa-2x fa-trash'></i></button>"+
													"</div>"+
                               			"<div class='row thumbnail-button-top'>"+
	            										"<button type='button' class='btn' form='form8_"+result.id+"'name='image' title='Change Picture'><i class='fa fa-2x fa-pencil link'></i></button>"+
	            										"<input type='file' style='display:none;' form='form8_"+result.id+"'name='image_dummy'>"+
													"</div>"+
                               			"<a onclick=\"show_object('staff','"+result.acc_name+"');\"><img class='vr_image' data-id='' alt='"+first_char+"' id='form8_image_"+result.id+"'></a>"+
                               		"</div>"+
                                 	"<div class='caption'>"+
                                    	"<form id='form8_"+result.id+"'>"+
														"<a onclick=\"show_object('staff','"+result.acc_name+"');\"><textarea readonly='readonly' name='name' class='floatlabel' placeholder='Name' form='form8_"+result.id+"'>"+result.name+"</textarea></a>"+
	                                    	"<input type='text' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Phone' name='phone' form='form8_"+result.id+"' value='"+result.phone+"'>"+
	                                    	"<textarea readonly='readonly' class='floatlabel dblclick_editable' placeholder='Email' name='email' form='form8_"+result.id+"'>"+result.email+"</textarea>"+
	                                    	"<textarea readonly='readonly' class='floatlabel dblclick_editable' placeholder='Address' name='address' form='form8_"+result.id+"'>"+result.address+"</textarea>"+
	                        					"<select class='dblclick_editable' name='status' form='form8_"+result.id+"'></select>"+
	                                    	"<input type='hidden' form='form8_"+result.id+"' name='id' value='"+result.id+"'>"+
	           	    								"<input type='hidden' form='form8_"+result.id+"' name='acc_name' value='"+result.acc_name+"'>"+
	            								"</form>"+
                                 	"</div>"+
                               	"</div>"+
                             "</div>";
					
					$('#form8_body').append(rowsHTML);
					var fields=document.getElementById("form8_"+result.id);
					var image_button=fields.elements['image'];
					var image_dummy=fields.elements['image_dummy'];
					var image_elem=document.getElementById('form8_image_'+result.id);
					var delete_button=fields.elements['delete'];
					var status_filter=fields.elements['status'];

					set_static_select('staff','status',status_filter,function () 
					{
						$(status_filter).selectpicker('val',result.status);
					});
					
					var master_data=new Object();
						master_data.data_store="accounts";
						master_data.count=1;
						master_data.return_column='acc_name';
						master_data.indexes=[{index:'username',exact:'master'}];
					
					read_json_single_column(master_data,function(accounts)
					{
						if(accounts[0]==result.acc_name)
						{
							$(delete_button).hide();
						}
					});
					
					var docs=new Object();
					docs.data_store='documents';
					docs.indexes=[{index:'id'},{index:'url'},{index:'doc_type',exact:'staff'},{index:'doc_name',exact:'image'},{index:'target_id',exact:result.id}];		
					read_json_rows('',docs,function(pics)
					{
						if(pics.length>0)
						{
							image_elem.src=pics[0].url;
							image_elem.setAttribute('data-id',pics[0].id);
						}
					});
					
					$(image_button).on('click',function (e) 
					{
						e.preventDefault();
						$(image_dummy).click();
					});
					
					$(image_dummy).on('change',function(evt)
					{
					   select_picture(evt,'',function(dataURL)
						{
							image_elem.src=dataURL;
							var last_updated=get_my_time();
							if(image_elem.getAttribute('data-id')=="")
							{
								var data_id=get_new_key();
								image_elem.setAttribute('data-id',data_id);
								
								var data_json={data_store:'documents',
					 				data:[{index:'id',value:data_id},
					 					{index:'target_id',value:result.id},
					 					{index:'url',value:dataURL},
					 					{index:'doc_name',value:'image'},
					 					{index:'doc_type',value:'staff'},
					 					{index:'last_updated',value:last_updated}]};
								create_json(data_json);
							}
							else 
							{
								var data_id=image_elem.getAttribute('data-id');
								var data_json={data_store:'documents',
					 				data:[{index:'id',value:data_id},
					 					{index:'url',value:dataURL},
					 					{index:'last_updated',value:last_updated}]};
								update_json(data_json);								
							}
						});
					});
					
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form8_update_item(fields);
					});					
				});
				
				$('#form8').formcontrol();
				paginator.update_index(results.length);				
				initialize_tabular_report_buttons(columns,'Staff','form8',function (item){});
								
				hide_loader();
			});
		};
		
		function form8_update_item(form)
		{
			if(is_update_access('form8'))
			{
				var name=form.elements['name'].value;
				var phone=form.elements['phone'].value;
				var email=form.elements['email'].value;
				var address=form.elements['address'].value;
				var status=$(form.elements['status']).val();
				var data_id=form.elements['id'].value;
				var acc_name=form.elements['acc_name'].value;
				var last_updated=get_my_time();
				
				var data_json={data_store:'staff',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'phone',value:phone},
	 					{index:'email',value:email},
	 					{index:'address',value:address},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log:'yes',
	 				log_data:{title:'Updated',notes:'Profile of staff '+name,link_to:'form8'}};

				update_json(data_json);
				
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form8_delete_item(button)
		{
			if(is_delete_access('form8'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					
					var name=form.elements['name'].value;
					var data_id=form.elements['id'].value;
					var acc_name=form.elements['acc_name'].value;
					
					var data_json={data_store:'staff',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Profile of staff "+name,link_to:"form8"}};
					var account_json={data_store:'accounts',
 							data:[{index:'id',value:data_id},{index:'type',value:'staff'}]};
					var attribute_json={data_store:'attributes',
 							data:[{index:'name',value:acc_name},{index:'type',value:'staff'}]};
								
					delete_json(data_json);
					delete_json(account_json);
					delete_json(attribute_json);
					$(button).parent().parent().parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form8_import_template()
		{
			var data_array=['id','name','phone','email','status','acc_name','username',
			                'address','pincode','city','state','country'];
			my_array_to_csv(data_array);
		};

		function form8_import_validate(data_array)
		{
			var validate_template_array=[{column:'acc_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'email',regex:new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z_.-]+$')},
									{column:'phone',regex:new RegExp('^[0-9 ./,+-]+$')},
									{column:'username',regex:new RegExp('^[0-9a-zA-Z]+$')},
									{column:'status',list:['active','suspended','retired']},
									{column:'city',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'state',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'country',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'pincode',regex:new RegExp('^[0-9]+$')}];
							
			var error_array=validate_import_array(data_array,validate_template_array);
			return error_array;					
		}

		function form8_import(data_array,import_type)
		{
			var data_json={data_store:'staff',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Staff profiles',link_to:'form8'}};

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
				
				var data_json_array=[{index:'id',value:row.id},
	 					{index:'name',value:row.name},
	 					{index:'phone',value:row.phone},
	 					{index:'email',value:row.email},
	 					{index:'acc_name',value:row.acc_name,unique:'yes'},
	 					{index:'address',value:row.address},
	 					{index:'pincode',value:row.pincode},
	 					{index:'city',value:row.city},
	 					{index:'state',value:row.state},
	 					{index:'country',value:row.country},
	 					{index:'status',value:row.status},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);

				var account_json_array=[{index:'id',value:row.id},
	 					{index:'acc_name',value:row.acc_name,unique:'yes'},
	 					{index:'type',value:'staff'},
	 					{index:'username',value:row.username},
	 					{index:'status',value:'active'},
	 					{index:'last_updated',value:last_updated}];

				account_json.data.push(account_json_array);				
			});
			
			if(import_type=='create_new')
			{
				create_batch_json(data_json);
				create_batch_json(account_json);
			}
			else
			{
				update_batch_json(data_json);
				update_batch_json(account_json);
			}
		}
		
	</script>
</div>