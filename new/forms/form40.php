<div id='form40' class='tab-pane portlet box yellow-saffron'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal13_action();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form40_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form40_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form40_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
		<form id='form40_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Name" class='floatlabel' name='name'></label>
				<label><input type='text' placeholder="Phone" class='floatlabel' name='contact'></label>
				<label><input type='text' placeholder="Email" class='floatlabel' name='email'></label>
				<label><input type='submit' class='submit_hidden'></label>			
			</fieldset>
		</form>
		<br>
		<div id='form40_body' class='row'>
			
		</div>
	</div>
	
	<script>

		function form40_header_ini()
		{
			var filter_fields=document.getElementById('form40_header');
			var name_filter=filter_fields.elements['name'];
			var contact_filter=filter_fields.elements['contact'];
			
			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form40_ini();
			});
		
			var name_data=new Object();
				name_data.data_store="suppliers";
				name_data.return_column="name";
				name_data.indexes=[{index:'id'}];
			
			set_my_filter_json(name_data,name_filter);
		};
		
		function form40_ini()
		{
			show_loader();
			var fid=$("#form40_link").attr('data_id');
			if(fid==null)
				fid="";	
				
			$('#form40_body').html("");
			var filter_fields=document.getElementById('form40_header');
			var fname=filter_fields.elements['name'].value;
			var fcontact=filter_fields.elements['contact'].value;
			var femail=filter_fields.elements['email'].value;
			
			var paginator=$('#form40_body').paginator({'page_size':24});
			
			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='suppliers';

					columns.indexes=[{index:'id',value:fid},
									{index:'name',value:fname},
									{index:'acc_name'},
									{index:'phone',value:fcontact},
									{index:'email',value:femail},
									{index:'address'},
									{index:'city'},
									{index:'state'},
									{index:'pincode'}];		
			
			read_json_rows('form40',columns,function(results)
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
	            										"<button type='submit' class='btn' form='form40_"+result.id+"' name='save' title='Save'><i class='fa fa-2x fa-save'></i></button>"+
															"<button type='button' class='btn' form='form40_"+result.id+"' name='delete' title='Delete' onclick='form40_delete_item($(this));'><i class='fa fa-2x fa-trash'></i></button>"+
													"</div>"+
                               			"<div class='row thumbnail-button-top'>"+
	            										"<button type='button' class='btn' form='form40_"+result.id+"'name='image' title='Change Picture'><i class='fa fa-2x fa-pencil link'></i></button>"+
	            										"<input type='file' style='display:none;' form='form40_"+result.id+"'name='image_dummy'>"+
													"</div>"+
                               			"<a onclick=\"show_object('suppliers','"+result.acc_name+"');\"><img class='vr_image' data-id='' alt='"+first_char+"' id='form40_image_"+result.id+"'></a>"+
                               		"</div>"+
                                 	"<div class='caption'>"+
                                    	"<form id='form40_"+result.id+"'>"+
														"<a onclick=\"show_object('suppliers','"+result.acc_name+"');\"><textarea readonly='readonly' name='name' class='floatlabel' placeholder='Name' form='form40_"+result.id+"'>"+result.name+"</textarea></a>"+
	                                    	"<input type='text' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Phone' name='phone' form='form40_"+result.id+"' value='"+result.phone+"'>"+
	                                    	"<textarea readonly='readonly' class='floatlabel dblclick_editable' placeholder='Email' name='email' form='form40_"+result.id+"'>"+result.email+"</textarea>"+
	                                    	"<textarea readonly='readonly' class='floatlabel dblclick_editable' placeholder='Address' name='address' form='form40_"+result.id+"'>"+result.address+"</textarea>"+
	                        					"<input type='hidden' form='form40_"+result.id+"' name='id' value='"+result.id+"'>"+
	           	    								"<input type='hidden' form='form40_"+result.id+"' name='acc_name' value='"+result.acc_name+"'>"+
	            								"</form>"+
                                 	"</div>"+
                               	"</div>"+
                             "</div>";
					
					$('#form40_body').append(rowsHTML);
					var fields=document.getElementById("form40_"+result.id);
					var image_button=fields.elements['image'];
					var image_dummy=fields.elements['image_dummy'];
					var image_elem=document.getElementById('form40_image_'+result.id);
					
					var docs=new Object();
					docs.data_store='documents';
					docs.indexes=[{index:'id'},{index:'url'},{index:'doc_type',exact:'supplier'},{index:'doc_name',exact:'image'},{index:'target_id',exact:result.id}];		
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
					 					{index:'doc_type',value:'supplier'},
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
						form40_update_item(fields);
					});					
				});
				
				$('#form40').formcontrol();
				paginator.update_index(results.length);				
				initialize_tabular_report_buttons(columns,'Suppliers','form40',function (item){});
								
				hide_loader();
			});
		};
		
		function form40_update_item(form)
		{
			if(is_update_access('form40'))
			{
				var name=form.elements['name'].value;
				var phone=form.elements['phone'].value;
				var email=form.elements['email'].value;
				var address=form.elements['address'].value;
				var data_id=form.elements['id'].value;
				var acc_name=form.elements['acc_name'].value;
				var last_updated=get_my_time();
				
				var data_json={data_store:'suppliers',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'phone',value:phone},
	 					{index:'email',value:email},
	 					{index:'address',value:address},
	 					{index:'last_updated',value:last_updated}],
	 				log:'yes',
	 				log_data:{title:'Updated',notes:'Profile of supplier '+name,link_to:'form40'}};

				update_json(data_json);
				
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form40_delete_item(button)
		{
			if(is_delete_access('form40'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					
					var name=form.elements['name'].value;
					var data_id=form.elements['id'].value;
					var acc_name=form.elements['acc_name'].value;
					
					var data_json={data_store:'suppliers',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Profile of supplier "+name,link_to:"form40"}};
					var account_json={data_store:'accounts',
 							data:[{index:'id',value:data_id},{index:'type',value:'supplier'}]};
					var attribute_json={data_store:'attributes',
 							data:[{index:'name',value:acc_name},{index:'type',value:'supplier'}]};
								
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
		
		function form40_import_template()
		{
			var data_array=['id','name','phone','email','acc_name','address','city','pincode','state'];
			my_array_to_csv(data_array);
		};

		function form40_import_validate(data_array)
		{
			var validate_template_array=[{column:'acc_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'email',regex:new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z_.-]+$')},
									{column:'phone',regex:new RegExp('^[0-9 ./,+-]+$')},
									{column:'city',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'state',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'pincode',regex:new RegExp('^[0-9]+$')}];
							
			var error_array=validate_import_array(data_array,validate_template_array);
			return error_array;					
		}
		
		function form40_import(data_array,import_type)
		{
			var data_json={data_store:'suppliers',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Supplier profiles',link_to:'form40'}};

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
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);

				var account_json_array=[{index:'id',value:row.id},
	 					{index:'acc_name',value:row.acc_name,unique:'yes'},
	 					{index:'type',value:'supplier'},
	 					{index:'username',value:''},
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