<div id='form220' class='tab-pane portlet box yellow-saffron'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal191_action();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form220_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form220_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form220_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form220_upload' onclick=modal23_action(form220_import_template,form220_import);><i class='fa fa-upload'></i> Import</a>
                    </li>
                </ul>
            </div>
      </div>
	</div>

	<div class="portlet-body">
		<form id='form220_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Name" class='floatlabel' name='name'></label>
				<label><input type='text' placeholder="Status" class='floatlabel' name='status'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
		<br>
		<div id='form220_body' class='row'>

		</div>
	</div>

	<script>
		function form220_header_ini()
		{
			var filter_fields=document.getElementById('form220_header');
			var name_filter=filter_fields.elements['name'];
			var status_filter=filter_fields.elements['status'];

			var name_data={data_store:'projects',return_column:'name'};
			set_my_filter_json(name_data,name_filter);

			set_static_filter_json('projects','status',status_filter);

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form220_ini();
			});
		};


		function form220_ini()
		{
			show_loader();
			var fid=$("#form220_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form220_body').html("");

			var filter_fields=document.getElementById('form220_header');
			var fname=filter_fields.elements['name'].value;
			var fstatus=filter_fields.elements['status'].value;

			var paginator=$('#form220_body').paginator({'page_size':24});

			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='projects';
					columns.access={};
					columns.indexes=[{index:'id',value:fid},
									{index:'name',value:fname},
									{index:'details'},
									{index:'status',value:fstatus},
									{index:'priority'}];

			read_json_rows('form220',columns,function(results)
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

                    var rowsHTML="<div class='col-xs-6 col-sm-3 col-md-3' "+clear_both+">"+
											"<div class='thumbnail'>"+
                                 	          "<div class='caption'>"+
                                    	           "<form id='form220_"+result.id+"'>"+
                                                    "<a onclick=\"show_object('projects','"+result.name+"');\"><textarea readonly='readonly' name='name' class='floatlabel' placeholder='Name' form='form220_"+result.id+"'>"+result.name+"</textarea></a>"+
                                                    "<textarea readonly='readonly' class='floatlabel dblclick_editable' placeholder='Details' name='details' form='form220_"+result.id+"'>"+result.details+"</textarea>"+
                                                    "<input type='text' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Priority' name='priority' form='form220_"+result.id+"' value='"+result.priority+"'>"+
                                                    "<select class='dblclick_editable' name='status' form='form220_"+result.id+"'></select>"+
                                                    "<input type='hidden' form='form220_"+result.id+"' name='id' value='"+result.id+"'>"+
                                                    "<input type='hidden' form='form220_"+result.id+"' name='acc_name' value='"+result.acc_name+"'>"+
                                                    "<button type='submit' class='btn green' form='form220_"+result.id+"' name='save' title='Save'><i class='fa fa-2x fa-save'></i></button>"+
												    "<button type='button' class='btn red' form='form220_"+result.id+"' name='delete' title='Delete' onclick='form220_delete_item($(this));'><i class='fa fa-2x fa-trash'></i></button>"+
                                                "</form>"+
                                              "</div>"+
                               	            "</div>"+
                                    "</div>";

					$('#form220_body').append(rowsHTML);

					var fields=document.getElementById("form220_"+result.id);
					var status_filter=fields.elements['status'];

					set_static_select('projects','status',status_filter,function ()
					{
						$(status_filter).selectpicker('val',result.status);
					});

					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form220_update_item(fields);
					});
				});

				$('#form220').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:columns,file:'Projects',report_id:'form220'});

				hide_loader();
			});
		};


		function form220_update_item(form)
		{
			if(is_update_access('form220'))
			{
				var name=form.elements['name'].value;
				var details=form.elements['details'].value;
				var priority=form.elements['priority'].value;
				var status=form.elements['status'].value;
				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();

				var data_json={data_store:'projects',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'priority',value:priority},
	 					{index:'details',value:details},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log:'yes',
	 				log_data:{title:'Updated',notes:'Project '+name,link_to:'form220'}};

				update_json(data_json);

				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form220_delete_item(button)
		{
			if(is_delete_access('form220'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);

					var name=form.elements['name'].value;
					var data_id=form.elements['id'].value;
					var last_updated=get_my_time();

					var data_json={data_store:'projects',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Project "+name,link_to:"form220"}};
					var data2_json={data_store:'project_team',
 							data:[{index:'project_id',value:data_id}]};
					var data3_json={data_store:'project_phases',
 							data:[{index:'project_id',value:data_id}]};
					var data4_json={data_store:'task_instances',
 							data:[{index:'source_id',value:data_id},{index:'source',value:'projects'}]};
					var data5_json={data_store:'object_access',
 							data:[{index:'record_id',value:data_id},{index:'tablename',value:'projects'}]};
					var data6_json={data_store:'documents',
 							data:[{index:'target_name',value:name},{index:'doc_type',value:'project'}]};
					var data7_json={data_store:'expenses',
 							data:[{index:'source_name',value:name},{index:'source',value:'project'}]};

					delete_json(data_json);
					delete_json(data2_json);
					delete_json(data3_json);
					delete_json(data4_json);
					delete_json(data5_json);
                    delete_json(data6_json);
                    delete_json(data7_json);
					$(button).parent().parent().parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form220_import_template()
		{
			var data_array=['id','name','details','priority','start_date','status'];
			vUtil.arrayToCSV(data_array);
		};


		function form220_import(data_array,import_type)
		{
			var data_json={data_store:'projects',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Projects',link_to:'form220'}};

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
	 					{index:'name',value:row.name,unique:'yes'},
	 					{index:'details',value:row.details},
	 					{index:'start_date',value:get_raw_time(row.start_date)},
	 					{index:'status',value:row.status},
	 					{index:'priority',value:row.priority},
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
		};

	</script>
</div>
