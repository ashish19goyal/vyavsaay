<div id='form277' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form277_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form277_header'></th>
					<th>Description <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form277_header'></th>
					<th>Function</th>
					<th>Timing</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form277_header'></th>
					<th><input type='button' form='form277_header' title='Add Notification' class='add_icon' onclick='form277_add_item();'>
						<input type='button' form='form277_header' name='export' value='EXPORT' class='export_icon'>
						<input type='submit' form='form277_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form277_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form277_prev' class='prev_icon' data-index='-25' onclick="$('#form277_index').attr('data-index',$(this).attr('data-index')); form277_ini();">
		<div style='display:hidden;' id='form277_index' data-index='0'></div>
		<img src='./images/next.png' id='form277_next' class='next_icon' data-index='25' onclick="$('#form277_index').attr('data-index',$(this).attr('data-index')); form277_ini();">
	</div>
	
	<script>
		function form277_header_ini()
		{
			var filter_fields=document.getElementById('form277_header');
			var name_filter=filter_fields.elements[0];
			var desc_filter=filter_fields.elements[1];
			var status_filter=filter_fields.elements[2];
				
			var name_data=new Object();
				name_data.data_store='system_notifications';
				name_data.indexes=[{index:'name'}];		
				name_data.return_column='name';
			set_my_filter_json(name_data,name_filter);
								
			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form277_ini();
			});
		
			set_static_filter_json('system_notifications','status',status_filter);
		};
		
		function form277_ini()
		{
			show_loader();
			var fid=$("#form277_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			var filter_fields=document.getElementById('form277_header');
			
			var	fname=filter_fields.elements[0].value;
			var	fdesc=filter_fields.elements[1].value;
			var	fstatus=filter_fields.elements[2].value;
			
			////indexing///
			var index_element=document.getElementById('form277_index');
			var prev_element=document.getElementById('form277_prev');
			var next_element=document.getElementById('form277_next');
			var start_index=index_element.getAttribute('data-index');
			
			$('#form277_body').html("");
		
			var new_columns=new Object();
					new_columns.count=25;
					new_columns.start_index=start_index;
					new_columns.data_store='system_notifications';		
					
					new_columns.indexes=[{index:'id',value:fid},
										{index:'name',value:fname},
										{index:'description',value:fdesc},
										{index:'function_name'},
										{index:'function_def'},
										{index:'initial_delay'},
										{index:'repeat_delay'},
										{index:'status',value:fstatus}];
				
			read_json_rows('form277',new_columns,function(results)
			{	
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form277_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form277_"+result.id+"' value='"+result.name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea readonly='readonly' form='form277_"+result.id+"' class='dblclick_editable'>"+result.description+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Function'>";
								rowsHTML+="<input type='text' readonly='readonly' class='input_link dblclick_editable' form='form277_"+result.id+"' value='"+result.function_name+"' onclick=\"modal178_action('"+result.id+"',$(this))\">";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Timing'>";
								rowsHTML+="<b>Initital Delay</b>:<input type='number' readonly='readonly' class='dblclick_editable' form='form277_"+result.id+"' value='"+result.initial_delay+"'>";
								rowsHTML+="<b>Repeat Delay</b>:<input type='number' readonly='readonly' class='dblclick_editable' form='form277_"+result.id+"' value='"+result.repeat_delay+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form277_"+result.id+"' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form277_"+result.id+"' value='"+result.id+"'>";	
								rowsHTML+="<input type='submit' class='save_icon' form='form277_"+result.id+"' title='Save'>";
								rowsHTML+="<input type='button' class='delete_icon' form='form277_"+result.id+"' title='Delete' onclick='form277_delete_item($(this));'>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form277_body').append(rowsHTML);
					var fields=document.getElementById("form277_"+result.id);
					var status_filter=fields.elements[5];
								
					set_static_value_list_json('system_notifications','status',status_filter);
					
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form277_update_item(fields);
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

				$('textarea').autosize();
				longPressEditable($('.dblclick_editable'));
		
				var export_button=filter_fields.elements['export'];
				$(export_button).off("click");
				$(export_button).on("click", function(event)
				{
					get_limited_export_data(new_columns,'Notifications Settings');
				});
				hide_loader();
			});
		}

		function form277_add_item()
		{
			if(is_create_access('form277'))
			{
				var id=get_new_key();
		
				var rowsHTML="<tr>";
					rowsHTML+="<form id='form277_"+id+"'></form>";
						rowsHTML+="<td data-th='Name'>";
							rowsHTML+="<input type='text' form='form277_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Description'>";
							rowsHTML+="<textarea type='text' form='form277_"+id+"'></textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Function'>";
							rowsHTML+="<input type='text' class='input_link dblclick_editable' form='form277_"+id+"' onclick=\"modal178_action('"+id+"',$(this))\">";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Timing'>";
								rowsHTML+="<b>Initital Delay</b>:<input type='number' class='dblclick_editable' form='form277_"+id+"'>";
								rowsHTML+="<br><b>Repeat Delay</b>:<input type='number' class='dblclick_editable' form='form277_"+id+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' class='dblclick_editable' form='form277_"+id+"' value='active'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form277_"+id+"' value='"+id+"'>";
							rowsHTML+="<input type='submit' class='save_icon' form='form277_"+id+"'>";	
							rowsHTML+="<input type='button' class='delete_icon' form='form277_"+id+"' onclick='$(this).parent().parent().remove();>";	
						rowsHTML+="</td>";			
					rowsHTML+="</tr>";
			
				$('#form277_body').prepend(rowsHTML);
				longPressEditable($('.dblclick_editable'));
				
				var fields=document.getElementById("form277_"+id);
				var name_filter=fields.elements[0];
				var status_filter=fields.elements[5];
				
				$(name_filter).focus();
				
				set_static_value_list_json('system_notifications','status',status_filter);
					
				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form277_create_item(fields);
				});					
			}
			else
			{
				$("#modal2").dialog("open");
			}		
		}
		
		function form277_create_item(form)
		{
			if(is_create_access('form277'))
			{
				var name=form.elements[0].value;
				var description=form.elements[1].value;
				var function_name=form.elements[2].value;
				var initial_delay=form.elements[3].value;
				var repeat_delay=form.elements[4].value;
				var status=form.elements[5].value;
				var data_id=form.elements[6].value;
				var del_button=form.elements[8];
				
				var last_updated=get_my_time();
				var data_xml="<system_notifications>" +
							"<id>"+data_id+"</id>" +
							"<name unique='yes'>"+name+"</name>" +
							"<description>"+description+"</description>" +
							"<function_name>"+function_name+"</function_name>" +
							"<initial_delay>"+initial_delay+"</initial_delay>" +
							"<repeat_delay>"+repeat_delay+"</repeat_delay>" +
							"<status>"+status+"</status>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</system_notifications>";
				create_simple(data_xml);
				
				for(var i=0;i<6;i++)
				{
					$(form.elements[i]).attr('readonly','readonly');
				}
				
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form277_delete_item(del_button);
				});
				
				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form277_update_item(form);
				});
			}
			else
			{
				$("#modal2").dialog("open");
			}
		}
		
		function form277_update_item(form)
		{
			if(is_update_access('form277'))
			{
				var name=form.elements[0].value;
				var description=form.elements[1].value;
				var function_name=form.elements[2].value;
				var initial_delay=form.elements[3].value;
				var repeat_delay=form.elements[4].value;
				var status=form.elements[5].value;
				var data_id=form.elements[6].value;
				
				var last_updated=get_my_time();
				var data_xml="<system_notifications>" +
							"<id>"+data_id+"</id>" +
							"<name unique='yes'>"+name+"</name>" +
							"<description>"+description+"</description>" +
							"<function_name>"+function_name+"</function_name>" +
							"<initial_delay>"+initial_delay+"</initial_delay>" +
							"<repeat_delay>"+repeat_delay+"</repeat_delay>" +
							"<status>"+status+"</status>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</system_notifications>";
				update_simple(data_xml);
				
				for(var i=0;i<6;i++)
				{
					$(form.elements[i]).attr('readonly','readonly');
				}
			}
			else
			{
				$("#modal2").dialog("open");
			}
		}
		
		function form277_delete_item(button)
		{
			if(is_delete_access('form277'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var name=form.elements[0].value;
					var data_id=form.elements[6].value;
					var data_xml="<system_notifications>" +
								"<id>"+data_id+"</id>" +
								"</system_notifications>";
					var activity_xml="<activity>" +
								"<data_id>"+data_id+"</data_id>" +
								"<tablename>system_notifications</tablename>" +
								"<link_to>form277</link_to>" +
								"<title>Deleted</title>" +
								"<notes>Notification "+name+"</notes>" +
								"<updated_by>"+get_name()+"</updated_by>" +
								"</activity>";
									
					delete_row(data_xml,activity_xml);			
					
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2").dialog("open");
			}
		}
		
		function form277_import_template()
		{
			var data_array=['id','name','description','function_name','function_def','initial_delay','repeat_delay','status'];
			my_array_to_csv(data_array);
		};
		
		function form277_import_validate(data_array)
		{
			var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z_ -]+$')},
									{column:'description',regex:new RegExp('^[0-9a-zA-Z _.,/\'+@!$()-]+$')},
									{column:'function_name',regex:new RegExp('^[a-zA-Z0-9_() ;]+$')},
									{column:'function_def'},
									{column:'status',required:'yes',list:['active','inactive']},
									{column:'initial_delay',required:'yes',regex:new RegExp('^[0-9]+$')},
									{column:'repeat_delay',required:'yes',regex:new RegExp('^[0-9]+$')}];
							
			var error_array=validate_import_array(data_array,validate_template_array);
			return error_array;					
		}
		
		function form277_import(data_array,import_type)
		{
			var data_xml="<system_notifications>";
			var counter=1;
			var last_updated=get_my_time();
			data_array.forEach(function(row)
			{
				if((counter%500)===0)
				{
					data_xml+="</system_notifications><separator></separator><system_notifications>";
				}
		
				counter+=1;
				if(import_type=='create_new')
				{
					row.id=last_updated+counter;
				}
		
				data_xml+="<row>" +
							"<id>"+row.id+"</id>" +
							"<name unique='yes'>"+row.name+"</name>" +
							"<description>"+row.description+"</description>" +
							"<function_name>"+row.function_name+"</function_name>" +
							"<function_def>"+htmlentities(row.function_def)+"</function_def>" +
							"<initial_delay>"+row.initial_delay+"</initial_delay>" +
							"<repeat_delay>"+row.repeat_delay+"</repeat_delay>" +
							"<status>"+row.status+"</status>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</row>";		
			});
			
			data_xml+="</system_notifications>";
			if(import_type=='create_new')
			{
				create_batch(data_xml);
			}
			else
			{
				update_batch(data_xml);
			}
		};

	</script>
</div>