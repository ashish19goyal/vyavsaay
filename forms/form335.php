<div id='form335' class='tab-pane portlet box yellow-saffron'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal205_action();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form335_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form335_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form335_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form335_upload' onclick=modal23_action(form335_import_template,form335_import,form335_import_validate);><i class='fa fa-upload'></i> Import</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='form335_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Name" class='floatlabel' name='name'></label>
				<label><input type='text' placeholder="Phone" class='floatlabel' name='contact'></label>
				<label><input type='text' placeholder="Unit" class='floatlabel' name='unit'></label>
				<label><input type='text' placeholder="Designation" class='floatlabel' name='designation'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
		<br>
		<div id='form335_body' class='row'>

		</div>
	</div>

	<script>

		function form335_header_ini()
		{
			var filter_fields=document.getElementById('form335_header');
			var name_filter=filter_fields.elements['name'];

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form335_ini();
			});

			var name_data={data_store:'staff',return_column:'name'};
			set_my_filter_json(name_data,name_filter);
		};

		function form335_ini()
		{
			show_loader();
			var fid=$("#form335_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form335_body').html("");
			var filter_fields=document.getElementById('form335_header');
			var fname=filter_fields.elements['name'].value;
			var fcontact=filter_fields.elements['contact'].value;
			var funit=filter_fields.elements['unit'].value;
			var fdesig=filter_fields.elements['designation'].value;

			var paginator=$('#form335_body').paginator({'page_size':24});

			var columns={data_store:'staff',
					count:paginator.page_size(),
					start_index:paginator.get_index(),
					data_store:'staff',
					indexes:[{index:'id',value:fid},
									{index:'name',value:fname},
									{index:'acc_name'},
									{index:'phone',value:fcontact},
									{index:'unit',value:funit},
									{index:'designation',value:fdesig}]};

			read_json_rows('form335',columns,function(results)
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
	            										"<button type='submit' class='btn green' form='form335_"+result.id+"' name='save' title='Save'><i class='fa fa-2x fa-save'></i></button>"+
															"<button type='button' class='btn red' form='form335_"+result.id+"' name='delete' title='Delete' onclick='form335_delete_item($(this));'><i class='fa fa-2x fa-trash'></i></button>"+
													"</div>"+
                               			"<div class='row thumbnail-button-top'>"+
	            							"<button type='button' class='btn' form='form335_"+result.id+"'name='image' title='Change Picture'><i class='fa fa-2x fa-pencil link'></i></button>"+
	            							"<input type='file' style='display:none;' form='form335_"+result.id+"'name='image_dummy'>"+
								        "</div>"+
                               			"<a onclick=\"show_object('staff','"+result.acc_name+"');\"><img class='vr_image' data-id='' alt='"+first_char+"' id='form335_image_"+result.id+"'></a>"+
                               		"</div>"+
                                 	"<div class='caption'>"+
                                    	"<form id='form335_"+result.id+"'>"+
														"<a onclick=\"show_object('staff','"+result.acc_name+"');\"><textarea readonly='readonly' name='name' class='floatlabel' placeholder='Name' form='form335_"+result.id+"'>"+result.name+"</textarea></a>"+
	                                    	"<input type='text' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Phone' name='phone' form='form335_"+result.id+"' value='"+result.phone+"'>"+
	                                    	"<textarea readonly='readonly' class='floatlabel dblclick_editable' placeholder='Unit' name='unit' form='form335_"+result.id+"'>"+result.unit+"</textarea>"+
	                                    	"<textarea readonly='readonly' class='floatlabel dblclick_editable' placeholder='Designation' name='designation' form='form335_"+result.id+"'>"+result.designation+"</textarea>"+
	                        				"<input type='hidden' form='form335_"+result.id+"' name='id' value='"+result.id+"'>"+
	           	    			            "<input type='hidden' form='form335_"+result.id+"' name='acc_name' value='"+result.acc_name+"'>"+
	            			            "</form>"+
                                 	"</div>"+
                               	"</div>"+
                             "</div>";

					$('#form335_body').append(rowsHTML);
					var fields=document.getElementById("form335_"+result.id);
					var image_button=fields.elements['image'];
					var image_dummy=fields.elements['image_dummy'];
					var image_elem=document.getElementById('form335_image_'+result.id);
					var delete_button=fields.elements['delete'];

					var master_data={data_store:'accounts',return_column:'acc_name',count:1,
                                    indexes:[{index:'username',exact:'master'}]};

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
						vFileHandler.picture({evt:evt,size:'small',fsuccess:function(dataURL)
						{
							image_elem.src=dataURL;
							var last_updated=get_my_time();
							if(image_elem.getAttribute('data-id')=="")
							{
								var data_id=vUtil.newKey();
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
						}});
					});

					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form335_update_item(fields);
					});
				});

				$('#form335').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:columns,file:'Staff',report_id:'form335'});

				hide_loader();
			});
		};

		function form335_update_item(form)
		{
			if(is_update_access('form335'))
			{
				var name=form.elements['name'].value;
				var phone=form.elements['phone'].value;
				var unit=form.elements['unit'].value;
				var designation=form.elements['designation'].value;
				var data_id=form.elements['id'].value;
				var acc_name=form.elements['acc_name'].value;
				var last_updated=get_my_time();

				var data_json={data_store:'staff',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'phone',value:phone},
	 					{index:'unit',value:unit},
	 					{index:'designation',value:designation},
	 					{index:'last_updated',value:last_updated}],
	 				log:'yes',
	 				log_data:{title:'Updated',notes:'Profile of staff '+name,link_to:'form335'}};

				update_json(data_json);

				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form335_delete_item(button)
		{
			if(is_delete_access('form335'))
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
 							log_data:{title:"Deleted",notes:"Profile of staff "+name,link_to:"form335"}};
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

		function form335_import_template()
		{
			var data_array=['id','name','phone','unit','designation'];
			vUtil.arrayToCSV(data_array);
		};

		function form335_import_validate(data_array)
		{
			var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'unit',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'phone',regex:new RegExp('^[0-9 ./,+-]+$')},
									{column:'designation',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')}];

			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;
		}

		function form335_import(data_array,import_type)
		{
			var data_json={data_store:'staff',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Staff profiles',link_to:'form335'}};

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
	 					{index:'unit',value:row.unit},
	 					{index:'acc_name',value:row.name+" ("+row.phone+")",unique:'yes'},
	 					{index:'designation',value:row.designation},
	 					{index:'status',value:'active'},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);

				var account_json_array=[{index:'id',value:row.id},
	 					{index:'acc_name',value:row.name+" ("+row.phone+")",unique:'yes'},
	 					{index:'type',value:'staff'},
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
