<div id='form341' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form341_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form341_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form341_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form341_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form341_upload' onclick=form341_update_clients_all();><i class='fa fa-users'></i> Update Clients</a>
                    </li>
					<li class="divider"> </li>
                    <li>
                        <a id='form341_upload' onclick=modal23_action(form341_import_template,form341_import,form341_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form341_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form341_header'></th>
						<th><input type='text' placeholder="Display Name" class='floatlabel' name='disp' form='form341_header'></th>
						<th><input type='text' placeholder="Description" class='floatlabel' name='desc' form='form341_header'></th>
						<th><input type='text' placeholder="Clients" class='floatlabel' name='clients' form='form341_header'></th>
						<th><input type='submit' form='form341_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form341_body'>
			</tbody>
		</table>
	</div>

	<script>
    function form341_header_ini()
		{
			var form=document.getElementById('form341_header');
			var name_filter=form.elements['name'];
			var disp_filter=form.elements['disp'];
			var desc_filter=form.elements['desc'];
			var clients_filter=form.elements['clients'];

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form341_ini();
			});

			var name_data={data_store:'tabs_list',return_column:'name'};
			set_my_filter_json(name_data,name_filter);

			var disp_data={data_store:'tabs_list',return_column:'display_name'};
			set_my_filter_json(disp_data,disp_filter);
		}

		function form341_ini()
		{
			var fid=$("#form341_link").attr('data_id');
			if(fid==null)
				fid="";

			var form=document.getElementById('form341_header');
			var name_filter=form.elements['name'].value;
			var disp_filter=form.elements['disp'].value;
			var desc_filter=form.elements['desc'].value;
			var clients_filter=form.elements['clients'].value;

			show_loader();
			$('#form341_body').html('');

			var paginator=$('#form341_body').paginator();

			var new_columns={count:paginator.page_size(),
								start_index:paginator.get_index(),
								data_store:'tabs_list',
								indexes:[{index:'id',value:fid},
									{index:'name',value:name_filter},
									{index:'description',value:desc_filter},
									{index:'display_name',value:disp_filter},
									{index:'clients',value:clients_filter},
									{index:'code'}]};

			read_json_rows('form341',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var clients_array=vUtil.jsonParse(result.clients);

					var rowsHTML="<tr>";
						rowsHTML+="<form id='form341_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<a onclick=\"element_display('"+result.id+"','form342');\"><input type='text' readonly='readonly' form='form341_"+result.id+"' value='"+result.name+"'></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Display Name'>";
								rowsHTML+="<textarea class='dblclick_editable' form='form341_"+result.id+"' readonly='readonly'>"+result.display_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea class='dblclick_editable' form='form341_"+result.id+"' readonly='readonly'>"+result.description+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Clients'><ul id='form341_clients_list_"+result.id+"'>";
								clients_array.forEach(function(client){
									rowsHTML+="<li>"+client+"</li>";
								});
								rowsHTML+="</ul>";
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form341_"+result.id+"' onclick=\"form341_update_clients('"+result.id+"','"+result.name+"');\">Update</button>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form341_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form341_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form341_"+result.id+"' title='Delete' onclick='form341_delete_item($(this));'><i class='fa fa-trash'></i></button>";
								rowsHTML+="<button type='button' class='btn default yellow-stripe' form='form341_"+result.id+"' onclick=\"form341_download_code('"+result.code+"','"+result.name+"');\">Get Code</button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form341_body').append(rowsHTML);
					var fields=document.getElementById("form341_"+result.id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form341_update_item(fields);
					});
				});

				$('#form341').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:new_columns,file:'Tabs List',report_id:'form341',feach:function (item)
				{
					delete item.code;
				}});
				hide_loader();
			});
		};

		function form341_add_item()
		{
			if(is_create_access('form341'))
			{
				var id=vUtil.newKey();
				var rowsHTML="<tr>";
						rowsHTML+="<form id='form341_"+id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<input type='text' required form='form341_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Display Name'>";
								rowsHTML+="<textarea class='dblclick_editable' form='form341_"+id+"'></textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea class='dblclick_editable' form='form341_"+id+"'></textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Clients'><ul id='form341_clients_list_"+id+"'></ul>";
								rowsHTML+="<button type='button' class='btn default purple-stripe' form='form341_"+id+"'>Update</button>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form341_"+id+"' value='"+id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form341_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form341_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();' name='delete'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

				$('#form341_body').prepend(rowsHTML);

				var fields=document.getElementById("form341_"+id);
				var name_filter=fields.elements[0];
				$(name_filter).focus();

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form341_create_item(fields);
				});
				$('#form341').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form341_create_item(form)
		{
			if(is_create_access('form341'))
			{
				var name=form.elements[0].value;
				var disp=form.elements[1].value;
				var description=form.elements[2].value;
				var func_button=form.elements[3];
				var data_id=form.elements[4].value;
				var del_button=form.elements['delete'];

				var last_updated=get_my_time();

				var data_json={data_store:'tabs_list',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'display_name',value:disp},
	 					{index:'description',value:description},
	 					{index:'clients',value:''},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Tab '+name+' to master list',link_to:'form341'}};

				create_json(data_json);

				$(form).readonly();

				$(func_button).on('click',function ()
				{
					form341_update_clients(data_id,name);
				});

				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form341_delete_item(del_button);
				});

				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form341_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form341_update_item(form)
		{
			if(is_update_access('form341'))
			{
				var name=form.elements[0].value;
				var disp=form.elements[1].value;
				var description=form.elements[2].value;
				var data_id=form.elements[4].value;

				var last_updated=get_my_time();

				var data_json={data_store:'tabs_list',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'description',value:description},
	 					{index:'display_name',value:disp},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Tab '+name+' in master list',link_to:'form341'}};
 				update_json(data_json);

				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form341_update_clients(id,tab_name)
		{
			if(is_online() && is_update_access('form341'))
			{
				show_loader();
				server_read_tab_clients(tab_name,function(clients)
				{
					hide_loader();
					var data_json={data_store:'tabs_list',
	 				log:'yes',
	 				data:[{index:'id',value:id},
	 					{index:'clients',value:JSON.stringify(clients)},
	 					{index:'last_updated',value:get_my_time()}],
	 				log_data:{title:'Updated',notes:'Clients for Tab '+name,link_to:'form341'}};
 					update_json(data_json);

					var clientsHTML="";
					clients.forEach(function(client)
					{
						clientsHTML+="<li>"+client+"</li>";
					});
					$('#form341_clients_list_'+id).html(clientsHTML);
				});
			}
		}

		function form341_update_clients_all()
		{
			if(is_online() && is_update_access('form341'))
			{
				show_loader();
				var new_columns={data_store:'tabs_list',indexes:[{index:'id'},{index:'name'}]};
				read_json_rows('form341',new_columns,function(tabs)
				{
					var data_json={data_store:'tabs_list',
						loader:'yes',
						log:'yes',
						data:[],
						log_data:{title:'Clients for Tabs',link_to:'form341'}};

					var last_updated=get_my_time();
					var counter=tabs.length;

					tabs.forEach(function(tab)
					{
						server_read_tab_clients(tab.name,function(clients)
						{
							var data_json_array=[{index:'id',value:tab.id},
									{index:'clients',value:JSON.stringify(clients)},
	 								{index:'last_updated',value:last_updated}];
							data_json.data.push(data_json_array);

							counter--;
						});
					});

					var tabs_time=setInterval(function()
					{
						if(counter===0)
						{
							clearInterval(tabs_time);
							hide_loader();
							update_batch_json(data_json);
						}
					},500);
				});
			}
		}

		function form341_delete_item(button)
		{
			if(is_delete_access('form341'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var name=form.elements[0].value;
					var data_id=form.elements[4].value;
					var data_json={data_store:'tabs_list',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Tab "+name+' from master list',link_to:"form341"}};

					delete_json(data_json);

					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form341_download_code(code,tab_name)
		{
			var a = document.createElement('a');
			var type = 'text/php;';
			var blob = new Blob([code], { type: type });
			var URL = window.URL || window.webkitURL;
			var downloadUrl = URL.createObjectURL(blob);

			a.setAttribute('href',downloadUrl);
			a.download = tab_name+'.php';
			a.target = '_blank';

			document.body.appendChild(a);
			a.click();
			$(a).remove();
		}

		function form341_import_template()
		{
			var data_array=['id','name','display name','description'];
			vUtil.arrayToCSV(data_array);
		};

		function form341_import_validate(data_array)
		{
			var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z_-]+$')},
									{column:'display name',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
									{column:'description',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')}];
			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;
		}

		function form341_import(data_array,import_type)
		{
			var data_json={data_store:'tabs_list',
					loader:'yes',
					log:'yes',
					data:[],
					log_data:{title:'Tabs list',link_to:'form341'}};

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
						{index:'description',value:row.description},
						{index:'display_name',value:row['display name']},
						{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
			});

			if(import_type=='create_new')
			{
				if(is_create_access('form341'))
            	{
					create_batch_json(data_json);
				}
				else
				{
					$("#modal2_link").click();
				}
			}
			else
			{
				if(is_update_access('form341'))
            	{
            		update_batch_json(data_json);
				}
				else
				{
					$("#modal2_link").click();
				}
			}
		};

	</script>
</div>
