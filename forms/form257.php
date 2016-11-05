<div id='form257' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form257_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form257_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form257_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form257_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form257_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form257_header'></th>
						<th><input type='text' placeholder="Username" class='floatlabel' name='user' form='form257_header'></th>
						<th><input type='text' placeholder="Password" readonly="readonly" name='pass' form='form257_header'></th>
						<th><input type='text' placeholder="Type" class='floatlabel' name='type' form='form257_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form257_header'></th>
						<th><input type='submit' form='form257_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form257_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form257_header_ini()
		{
			var filter_fields=document.getElementById('form257_header');
			var names_filter=filter_fields.elements['name'];
			var username_filter=filter_fields.elements['user'];
			var type_filter=filter_fields.elements['type'];
			var status_filter=filter_fields.elements['status'];

			var name_columns=new Object();
				name_columns.data_store='accounts';
				name_columns.indexes=[{index:'acc_name'}];
				name_columns.return_column='acc_name';
			set_my_filter_json(name_columns,names_filter);

			var username_columns=new Object();
				username_columns.data_store='accounts';
				username_columns.indexes=[{index:'username'}];
				username_columns.return_column='username';
			set_my_filter_json(username_columns,username_filter);

			set_static_filter_json('accounts','status',status_filter);
			set_static_filter_json('accounts','type',type_filter);

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form257_ini();
			});
		}

		function form257_ini()
		{
			show_loader();
			var fid=$("#form257_link").attr('data_id');
			if(fid==null)
				fid="";

			var filter_fields=document.getElementById('form257_header');
			var fname=filter_fields.elements['name'].value;
			var fusername=filter_fields.elements['user'].value;
			var ftype=filter_fields.elements['type'].value;
			var fstatus=filter_fields.elements['status'].value;

			$('#form257_body').html("");

			var paginator=$('#form257_body').paginator();

			var new_columns=new Object();
					new_columns.count=paginator.page_size();
					new_columns.start_index=paginator.get_index();
					new_columns.data_store='accounts';

					new_columns.indexes=[{index:'id',value:fid},
										{index:'acc_name',value:fname},
										{index:'username',value:fusername,unequal:"",isnull:'no'},
										{index:'type',value:ftype},
										{index:'status',value:fstatus}];

			read_json_rows('form257',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="";
					rowsHTML+="<tr>";
						rowsHTML+="<form id='form257_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<textarea readonly='readonly' form='form257_"+result.id+"'>"+result.acc_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Username'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form257_"+result.id+"' value='"+result.username+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Password'>";
								rowsHTML+="<input type='password' readonly='readonly' form='form257_"+result.id+"' required class='dblclick_editable' value='********'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Type'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form257_"+result.id+"' value='"+result.type+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select class='dblclick_editable' required form='form257_"+result.id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form257_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form257_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
							if(result.type!='master')
								rowsHTML+="<button class='btn red' form='form257_"+result.id+"' title='Delete' onclick='form257_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form257_body').append(rowsHTML);
					var fields=document.getElementById("form257_"+result.id);
					var status_filter=fields.elements[4];

					set_static_select('accounts','status',status_filter,function ()
					{
						$(status_filter).selectpicker('val',result.status);
					});

					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form257_update_item(fields);
					});
				});

				$('#form257').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:new_columns,file:'User Accounts',report_id:'form257'});
				hide_loader();
			});
		};

		function form257_add_item()
		{
			if(is_create_access('form257'))
			{
				var id=vUtil.newKey();
				var rowsHTML="";
					rowsHTML+="<tr>";
						rowsHTML+="<form id='form257_"+id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<input type='text' form='form257_"+id+"' required>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Username'>";
								rowsHTML+="<input type='text' form='form257_"+id+"' required>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Password'>";
								rowsHTML+="<input type='password' form='form257_"+id+"' required class='dblclick_editable'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Type'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form257_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select class='dblclick_editable' required form='form257_"+id+"'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form257_"+id+"' value='"+id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form257_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button class='btn red' form='form257_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

				$('#form257_body').prepend(rowsHTML);
				longPressEditable($('.dblclick_editable'));

				var fields=document.getElementById("form257_"+id);
				var name_filter=fields.elements[0];
				var type_filter=fields.elements[3];
				var status_filter=fields.elements[4];
				var id_filter=fields.elements[5];

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form257_update_item(fields);
				});

				var list_data={data_store:'accounts',
							return_column:'acc_name',
							indexes:[{index:'username'}]};

				set_my_value_list_json(list_data,name_filter,function ()
				{
					$(name_filter).focus();
				});

				$(name_filter).on('blur',function ()
				{
					var type_data=new Object();
						type_data.count=1;
						type_data.data_store='accounts';
						type_data.indexes=[{index:'id'},{index:'type'},{index:'status'},{index:'acc_name',exact:name_filter.value}];

					read_json_rows('',type_data,function (accounts)
					{
						if(accounts.length>0)
						{
							type_filter.value=accounts[0].type;
							status_filter.value=accounts[0].status;
							id_filter.value=accounts[0].id;
						}
					});
				});

				set_static_select('accounts','status',status_filter);
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form257_update_item(form)
		{
			if(is_update_access('form257'))
			{
				var name=form.elements[0].value;
				var username=form.elements[1].value;
				var password=form.elements[2].value;
				var type=form.elements[3].value;
				var status=$(form.elements[4]).val();
				var data_id=form.elements[5].value;
				var last_updated=get_my_time();

				var data_json={data_store:'accounts',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'username',value:username,unique:'yes'},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Created',notes:'Login for '+name,link_to:'form257'}};
 				update_json(data_json);

				if(password!="" && password!="********")
				{
					var salt='$2a$10$'+get_domain()+'1234567891234567891234';
					var salt_22=salt.substring(0, 29);

					var bcrypt = new bCrypt();
					bcrypt.hashpw(password, salt_22, function(newhash)
					{
						var data2_json={data_store:'accounts',
			 				log:'yes',
			 				data:[{index:'id',value:data_id},
			 					{index:'password',value:newhash},
			 					{index:'last_updated',value:get_my_time()}],
			 				log_data:{title:'Updated',notes:'Password for '+username,link_to:'form257'}};
		 				update_json(data2_json);
					}, function() {});
				}

				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form257_delete_item(button)
		{
			if(is_delete_access('form257'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var name=form.elements[0].value;
					var username=form.elements[1].value;
					var data_id=form.elements[5].value;

					var data_json={data_store:'accounts',
			 				log:'yes',
			 				data:[{index:'id',value:data_id},
			 					{index:'password',value:''},
			 					{index:'username',value:''},
			 					{index:'last_updated',value:get_my_time()}],
			 				log_data:{title:'Deleted',notes:'Login for '+name,link_to:'form257'}};
	 				update_json(data_json);

					var data2_json={data_store:'access_control',data:[{index:'username',value:username}]};
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
