<div id='form314' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form314_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form314_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form314_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form314_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form314_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form314_header'></th>
						<th><input type='text' placeholder="Display Name" class='floatlabel' name='display_name' form='form314_header'></th>
						<th><input type='text' placeholder="Grids" class='floatlabel' name='element' form='form314_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form314_header'></th>
						<th><input type='submit' form='form314_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form314_body'>
			</tbody>
		</table>
	</div>

	<script>

		function form314_header_ini()
		{
			var form=document.getElementById('form314_header');
			var status_filter=form.elements['status'];

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form314_ini();
			});

			set_static_filter_json('system_objects','status',status_filter);
		}

		function form314_ini()
		{
			var fid=$("#form314_link").attr('data_id');
			if(fid==null)
				fid="";

			var form=document.getElementById('form314_header');
			var name_filter=form.elements['name'].value;
			var display_filter=form.elements['display_name'].value;
			var elements_filter=form.elements['element'].value;
			var status_filter=form.elements['status'].value;

			show_loader();
			$('#form314_body').html('');

			var paginator=$('#form314_body').paginator();

			var obj_data=new Object();
					obj_data.count=paginator.page_size();
					obj_data.start_index=paginator.get_index();
					obj_data.data_store='system_objects';

					obj_data.indexes=[{index:'id',value:fid},
									{index:'name',value:name_filter},
									{index:'display_name',value:display_filter},
									{index:'elements',value:elements_filter},
									{index:'status',value:status_filter}];

			read_json_rows('form314',obj_data,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form314_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form314_"+result.id+"' value='"+result.name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Display Name'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form314_"+result.id+"'>"+result.display_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Grids'>";
								rowsHTML+="<button type='button' class='btn default green-stripe' form='form314_"+result.id+"'>Add Grid</button>";
								rowsHTML+="<div id='form314_grids_"+result.id+"'></div>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select class='dblclick_editable' required form='form314_"+result.id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form314_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form314_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button class='btn red' form='form314_"+result.id+"' title='Delete' onclick='form314_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form314_body').append(rowsHTML);
					var fields=document.getElementById("form314_"+result.id);
					var status_filter=fields.elements[3];
					var grid_button=fields.elements[2];

					$(grid_button).on('click',function ()
					{
						modal190_action(result.id,'form314');
					});

					var elements_array=vUtil.jsonParse(result.elements);
					var docHTML="";
					elements_array.forEach(function(element)
					{
						docHTML+="<div class='row'><div class='col-xs-10'><a onclick=modal193_action(this); data-display_name='"+element.display_name+"' data-color='"+element.color+"' data-width='"+element.width+"' data-height='"+element.height+"' data-collapse='"+element.collapse+"'>"+element.name+"</a></div><div class='col-xs-2'><i class='fa fa-times link' onclick=$(this).parent().parent().remove();></i></div></div>";
					});
					document.getElementById('form314_grids_'+result.id).innerHTML=docHTML;

					set_static_select('system_objects','status',status_filter,function ()
					{
						$(status_filter).selectpicker('val',result.status);
					});

					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form314_update_item(fields);
					});
				});

				$('#form314').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:obj_data,file:'Object Pages',report_id:'form314'});
				hide_loader();
			});
		};

		function form314_add_item()
		{
			if(is_create_access('form314'))
			{
				var id=vUtil.newKey();
				var rowsHTML="<tr>";
						rowsHTML+="<form id='form314_"+id+"'></form>";
                        rowsHTML+="<td data-th='Name'>";
                            rowsHTML+="<input type='text' form='form314_"+id+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Display Name'>";
                            rowsHTML+="<textarea class='dblclick_editable' form='form314_"+id+"'></textarea>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Grids'>";
                            rowsHTML+="<button type='button' class='btn default green-stripe' form='form314_"+id+"'>Add Grid</button>";
                            rowsHTML+="<div id='form314_grids_"+id+"'></div>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Status'>";
                            rowsHTML+="<select class='dblclick_editable' data-style='btn-info' form='form314_"+id+"'></select>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' form='form314_"+id+"' value='"+id+"'>";
                            rowsHTML+="<button type='submit' class='btn green' form='form314_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
                            rowsHTML+="<button class='btn red' form='form314_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
                        rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form314_body').prepend(rowsHTML);
				var fields=document.getElementById("form314_"+id);
				var status_filter=fields.elements[3];
				var grid_button=fields.elements[2];

				$(grid_button).on('click',function ()
				{
					modal190_action(id,'form314');
				});

				set_static_select('system_objects','status',status_filter);

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form314_create_item(fields);
				});
				$('#form314').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form314_create_item(form)
		{
			if(is_create_access('form314'))
			{
				var name=form.elements[0].value;
				var display_name=form.elements[1].value;
				var status=$(form.elements[3]).val();
				var data_id=form.elements[4].value;
				var del_button=form.elements[6];

				var last_updated=get_my_time();
				var elements_array=[];
				$('#form314_grids_'+data_id).find('a').each(function()
				{
					var element=new Object();
					var span=$(this);
					element.name=$(this).text();
					element.display_name=$(this).data('display_name');
					element.color=$(this).data('color');
					element.collapse=$(this).data('collapse');
					element.width=$(this).data('width');
					element.height=$(this).data('height');
					elements_array.push(element);
				});
				var elements=JSON.stringify(elements_array);

				var data_json={data_store:'system_objects',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'display_name',value:display_name},
	 					{index:'elements',value:elements},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log:'yes',
	 				log_data:{title:'Added',notes:display_name+' object page',link_to:'form314'}};

 				var data2_json={data_store:'access_control',
		 				data:[{index:'id',value:data_id},
		 					{index:'element_id',value:name,uniqueWith:['username']},
		 					{index:'element_name',value:display_name},
		 					{index:'username',value:'master'},
		 					{index:'re',value:'checked'},
		 					{index:'cr',value:'checked'},
		 					{index:'up',value:'checked'},
		 					{index:'del',value:'checked'},
		 					{index:'last_updated',value:last_updated}]};

				create_json(data_json);
				create_json(data2_json);

				$(form).readonly();

				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form314_delete_item(del_button);
				});

				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form314_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form314_update_item(form)
		{
			if(is_update_access('form314'))
			{
				var name=form.elements[0].value;
				var display_name=form.elements[1].value;
				var status=$(form.elements[3]).val();
				var data_id=form.elements[4].value;
				var del_button=form.elements[6];

				var elements_array=[];
				$('#form314_grids_'+data_id).find('a').each(function()
				{
					var element=new Object();
					var span=$(this);
					element.name=$(this).text();
					element.display_name=$(this).data('display_name');
					element.color=$(this).data('color');
					element.collapse=$(this).data('collapse');
					element.width=$(this).data('width');
					element.height=$(this).data('height');
					elements_array.push(element);
				});
				var elements=JSON.stringify(elements_array);
				var last_updated=get_my_time();

				var data_json={data_store:'system_objects',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'display_name',value:display_name},
	 					{index:'elements',value:elements},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
 					log:'yes',
	 				log_data:{title:'Updated',notes:display_name+' object page',link_to:'form314'}};

				update_json(data_json);

				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form314_delete_item(button)
		{
			if(is_delete_access('form314'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);

					var name=form.elements[0].value;
					var display_name=form.elements[1].value;
				    var data_id=form.elements[4].value;
					var data_json={data_store:'system_objects',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
			 				log_data:{title:'Deleted',notes:display_name+' object page',link_to:'form314'}};
					var data2_json={data_store:'access_control',
								data:[{index:'element_id',value:name}]};

					delete_json(data_json);
					delete_json(data2_json);

					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

	</script>
</div>
