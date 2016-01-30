<div id='form257' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form257_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form257_header'></th>
					<th>Username <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form257_header'></th>
					<th>Password</th>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form257_header'></th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form257_header'></th>
					<th><input type='button' form='form257_header' title='Add new' class='add_icon' onclick='form257_add_item();'>
						<input type='button' form='form257_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form257_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form257_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form257_prev' class='prev_icon' data-index='-25' onclick="$('#form257_index').attr('data-index',$(this).attr('data-index')); form257_ini();">
		<div style='display:hidden;' id='form257_index' data-index='0'></div>
		<img src='./images/next.png' id='form257_next' class='next_icon' data-index='25' onclick="$('#form257_index').attr('data-index',$(this).attr('data-index')); form257_ini();">
	</div>
	
	<script>
		function form257_header_ini()
		{
			var filter_fields=document.getElementById('form257_header');	
			var names_filter=filter_fields.elements[0];
			var username_filter=filter_fields.elements[1];
			var type_filter=filter_fields.elements[2];
			var status_filter=filter_fields.elements[3];
			
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
			var fname=filter_fields.elements[0].value;
			var fusername=filter_fields.elements[1].value;
			var ftype=filter_fields.elements[2].value;
			var fstatus=filter_fields.elements[3].value;
			
			////indexing///
			var index_element=document.getElementById('form257_index');
			var prev_element=document.getElementById('form257_prev');
			var next_element=document.getElementById('form257_next');
			var start_index=index_element.getAttribute('data-index');
			//////////////
			$('#form257_body').html("");
			
			var new_columns=new Object();
					new_columns.count=25;
					new_columns.start_index=start_index;
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
								rowsHTML+="<input type='text' readonly='readonly' form='form257_"+result.id+"' required value='"+result.username+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Password'>";
								rowsHTML+="<input type='password' readonly='readonly' form='form257_"+result.id+"' required class='dblclick_editable' value='********'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Type'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form257_"+result.id+"' value='"+result.type+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form257_"+result.id+"' required class='dblclick_editable' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form257_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<input type='submit' class='save_icon' form='form257_"+result.id+"'>";
								rowsHTML+="<input type='button' class='delete_icon' form='form257_"+result.id+"' onclick='form257_delete_item($(this));'>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form257_body').append(rowsHTML);
					var fields=document.getElementById("form257_"+result.id);
					var status_filter=fields.elements[4];
					
					set_static_value_list('accounts','status',status_filter);
							
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form257_update_item(fields);
					});
				});
		
				////indexing///
				var next_index=parseInt(start_index)+25;
				var prev_index=parseInt(start_index)-25;
				next_element.setAttribute('data-index',next_index);
				prev_element.setAttribute('data-index',prev_index);
				index_element.setAttribute('data-index','0');
				if(results.length<25)
				{
					$(next_element).hide();
				}
				else
				{
					$(next_element).show();
				}
				if(prev_index<0)
				{
					$(prev_element).hide();
				}
				else
				{
					$(prev_element).show();
				}
				/////////////
		
				longPressEditable($('.dblclick_editable'));
				$('textarea').autosize();
				
				var export_button=filter_fields.elements[5];
				$(export_button).off("click");
				$(export_button).on("click", function(event)
				{
					get_limited_export_data(new_columns,'User Accounts');
				});
				hide_loader();
			});
		};
		
		function form257_add_item()
		{
			if(is_create_access('form257'))
			{
				var rowsHTML="";
				var id=get_new_key();
				rowsHTML+="<tr>";
				rowsHTML+="<form id='form257_"+id+"' autocomplete='off'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' form='form257_"+id+"' required value=''>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Username'>";
						rowsHTML+="<input type='text' form='form257_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Password'>";
						rowsHTML+="<input type='password' class='dblclick_editable' required form='form257_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Type'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form257_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'>";
						rowsHTML+="<input type='text' required form='form257_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form257_"+id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form257_"+id+"'>";	
						rowsHTML+="<input type='button' class='delete_icon' form='form257_"+id+"' onclick='$(this).parent().parent().remove();'>";	
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
					
				$(name_filter).on('blur',function ()
				{
					var type_data=new Object();
						type_data.count=1;
						type_data.data_store='accounts';
						type_data.indexes=[{index:'id'},{index:'type'},{index:'status'},{index:'acc_name',exact:name_filter.value}];
					
					fetch_requested_data('',type_data,function (accounts) 
					{
						if(accounts.length>0)
						{
							type_filter.value=accounts[0].type;
							status_filter.value=accounts[0].status;
							id_filter.value=accounts[0].id;					
						}
					});
				});				
		
				var list_data=new Object();
						list_data.count=0;
						list_data.start_index=0;
						list_data.data_store='accounts';		
						list_data.return_column='acc_name';				
						list_data.indexes=[{index:'username'}];
			
				set_my_value_list_json(list_data,name_filter,function () 
				{
					$(name_filter).focus();
				});
				
				set_static_value_list('accounts','status',status_filter);
			}
			else
			{
				$("#modal2").dialog("open");
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
				var status=form.elements[4].value;
				var data_id=form.elements[5].value;
				var last_updated=get_my_time();
				var data_xml="<accounts>" +
							"<id>"+data_id+"</id>" +
							"<username unique='yes'>"+username+"</username>" +
							"<status>"+status+"</status>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</accounts>";
				update_simple(data_xml);
				
				if(password!="" && password!="********")
				{
					var salt='$2a$10$'+get_domain()+'1234567891234567891234';
					var salt_22=salt.substring(0, 29);
					
					var bcrypt = new bCrypt();
					bcrypt.hashpw(password, salt_22, function(newhash)
					{
						var data_xml="<accounts>" +
									"<id>"+data_id+"</id>" +
									"<password>"+newhash+"</password>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</accounts>";
						var activity_xml="<activity>" +
									"<data_id>"+data_id+"</data_id>" +
									"<tablename>accounts</tablename>" +
									"<link_to>form257</link_to>" +
									"<title>Updated</title>" +
									"<notes>Password for "+username+"</notes>" +
									"<updated_by>"+get_name()+"</updated_by>" +
									"</activity>";
						update_row(data_xml,activity_xml);				
					}, function() {});
				}
				
				for(var i=0;i<5;i++)
				{
					$(form.elements[i]).attr('readonly','readonly');
				}
			}
			else
			{
				$("#modal2").dialog("open");
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
					var data_xml="<accounts>" +
								"<id>"+data_id+"</id>" +
								"<username></username>" +
								"<password></password>"+
								"</accounts>";
					var activity_xml="<activity>" +
								"<data_id>"+data_id+"</data_id>" +
								"<tablename>accounts</tablename>" +
								"<link_to>form257</link_to>" +
								"<title>Deleted</title>" +
								"<notes>User account for "+name+"</notes>" +
								"<updated_by>"+get_name()+"</updated_by>" +
								"</activity>";
					var access_xml="<access_control>"+
									"<username>"+username+"</username>"+
									"</access_control>";
									
					delete_simple(access_xml);			
					update_row(data_xml,activity_xml);
					
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2").dialog("open");
			}
		}

	</script>
</div>