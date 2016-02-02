<div id='form30' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form30_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form30_header'></th>
					<th>Contact</th>
					<th>Address</th>
					<th>Details</th>
					<th><input type='button' form='form30_header' value='Add item' class='add_icon' onclick='modal11_action();'>
						<input type='button' form='form30_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form30_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form30_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form30_prev' class='prev_icon' data-index='-25' onclick="$('#form30_index').attr('data-index',$(this).attr('data-index')); form30_ini();">
		<div style='display:hidden;' id='form30_index' data-index='0'></div>
		<img src='./images/next.png' id='form30_next' class='next_icon' data-index='25' onclick="$('#form30_index').attr('data-index',$(this).attr('data-index')); form30_ini();">
	</div>
	
	<script>
		function form30_header_ini()
		{
			var filter_fields=document.getElementById('form30_header');
			var name_filter=filter_fields.elements[0];
			
			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form30_ini();
			});
		
			var name_data="<customers>" +
					"<name></name>" +
					"</customers>";
			
			set_my_filter(name_data,name_filter);
		};
		
		function form30_ini()
		{
			show_loader();
			var fid=$("#form30_link").attr('data_id');
			if(fid==null)
				fid="";	
				
			var filter_fields=document.getElementById('form30_header');
			
			var fname=filter_fields.elements[0].value;
			
			////indexing///
			var index_element=document.getElementById('form30_index');
			var prev_element=document.getElementById('form30_prev');
			var next_element=document.getElementById('form30_next');
			var start_index=index_element.getAttribute('data-index');
			//////////////
		
			var columns="<customers count='25' start_index='"+start_index+"'>" +
					"<id>"+fid+"</id>" +
					"<name>"+fname+"</name>" +
					"<acc_name></acc_name>"+
					"<phone></phone>" +
					"<email></email>" +
					"<status></status>" +
					"<notes></notes>" +
					"<address></address>" +
					"<pincode></pincode>" +
					"<city></city>" +
					"<state></state>" +
					"<country></country>" +
					"<address_status></address_status>" +
					"<last_updated></last_updated>" +
					"</customers>";
		
			$('#form30_body').html("");
		
			fetch_requested_data('form30',columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="";
					rowsHTML+="<tr>";
						rowsHTML+="<form id='form30_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<a onclick=\"show_object('customers','"+result.acc_name+"');\"><textarea readonly='readonly' required form='form30_"+result.id+"'>"+result.name+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Contact'>";
								rowsHTML+="<b>Phone</b>: <input type='text' readonly='readonly' form='form30_"+result.id+"' class='dblclick_editable' value='"+result.phone+"'>";
								rowsHTML+="<br><b>Email</b>: <textarea readonly='readonly' form='form30_"+result.id+"' class='dblclick_editable'>"+result.email+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Address'>";
								rowsHTML+="<textarea readonly='readonly' form='form30_"+result.id+"'>"+result.address+", "+result.pincode+", "+result.city+", "+result.state+", "+result.country+"</textarea>";
								rowsHTML+="<img class='edit_icon' src='images/edit.png' form='form30_"+result.id+"' onclick='modal24_action($(this));'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details' id='form30_"+result.id+"_details'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<input type='submit' class='save_icon' form='form30_"+result.id+"' title='Save'>";
								rowsHTML+="<input type='button' class='delete_icon' form='form30_"+result.id+"' title='Delete' onclick='form30_delete_item($(this));'>";
								rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.address+"'>";
								rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.pincode+"'>";
								rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.city+"'>";
								rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.state+"'>";
								rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.country+"'>";
								rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.address_status+"'>";
								rowsHTML+="<input type='hidden' form='form30_"+result.id+"' value='"+result.acc_name+"'>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";
					
					$('#form30_body').append(rowsHTML);
					var fields=document.getElementById("form30_"+result.id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form30_update_item(fields);
					});
					
					var attributes_data="<attributes>"+
										"<name exact='yes'>"+result.acc_name+"</name>" +
										"<type exact='yes'>customer</type>" +
										"<attribute></attribute>" +
										"<value></value>" +
										"</attributes>";
					fetch_requested_data('',attributes_data,function(attributes)
					{
						var attribute_content="";
						attributes.forEach(function(attribute)
						{
							attribute_content+="<b>"+attribute.attribute+"</b>: "+attribute.value+"<br>";
						});
						var td_elem=document.getElementById('form30_'+result.id+'_details');
						td_elem.innerHTML=attribute_content;
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
				
				var export_button=filter_fields.elements[2];
				$(export_button).off("click");
				$(export_button).on("click", function(event)
				{
					get_export_data(columns,'Customers');
				});
				hide_loader();
			});
		};
		
		function form30_update_item(form)
		{
			if(is_update_access('form30'))
			{
				var name=form.elements[0].value;
				var phone=form.elements[1].value;
				var email=form.elements[2].value;
				var data_id=form.elements[4].value;
				var last_updated=get_my_time();
				var data_xml="<customers>" +
							"<id>"+data_id+"</id>" +
							"<name>"+name+"</name>" +
							"<phone>"+phone+"</phone>" +
							"<email>"+email+"</email>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</customers>";	
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>customers</tablename>" +
							"<link_to>form30</link_to>" +
							"<title>Updated</title>" +
							"<notes>Contact details of customer "+name+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				if(is_online())
				{
					server_update_row(data_xml,activity_xml);
				}
				else
				{
					local_update_row(data_xml,activity_xml);
				}
				for(var i=0;i<4;i++)
				{
					$(form.elements[i]).attr('readonly','readonly');
				}
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form30_delete_item(button)
		{
			if(is_delete_access('form30'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					
					var name=form.elements[0].value;
					var acc_name=form.elements[13].value;
					var data_id=form.elements[4].value;
					var data_xml="<customers>" +
								"<id>"+data_id+"</id>" +
								"</customers>";	
					var activity_xml="<activity>" +
								"<data_id>"+data_id+"</data_id>" +
								"<tablename>customers</tablename>" +
								"<link_to>form30</link_to>" +
								"<title>Deleted</title>" +
								"<notes>Customer profile "+name+"</notes>" +
								"<updated_by>"+get_name()+"</updated_by>" +
								"</activity>";
					var account_xml="<accounts>" +
								"<id>"+data_id+"</id>" +
								"<type>customer</type>" +
								"</accounts>";
					var attribute_xml="<attributes>" +
								"<name>"+acc_name+"</name>" +
								"<type>customer</type>" +
								"</attributes>";
					delete_row(data_xml,activity_xml);
					delete_simple(account_xml);
					delete_simple(attribute_xml);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form30_import_validate(data_array)
		{
			var validate_template_array=[{column:'acc_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'email',regex:new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z_.-]+$')},
									{column:'phone',regex:new RegExp('^[0-9 ./,+-]+$')},
									{column:'address'},
									{column:'city',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'state',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'pincode',regex:new RegExp('^[0-9]+$')}];
							
			var error_array=validate_import_array(data_array,validate_template_array);
			return error_array;					
		}
		
		function form30_import(data_array,import_type)
		{
			var data_xml="<customers>";
			var account_xml="<accounts>";
			var counter=1;
			var last_updated=get_my_time();
			
			data_array.forEach(function(row)
			{
				//console.log(row);
				if((counter%500)===0)
				{
					data_xml+="</customers><separator></separator><customers>";
					account_xml+="</accounts><separator></separator><accounts>";
				}
				counter+=1;
				if(import_type=='create_new')
				{
					row.id=last_updated+counter;
				}
		
				data_xml+="<row>" +
						"<id>"+row.id+"</id>" +
						"<name>"+row.name+"</name>" +
						"<phone>"+row.phone+"</phone>" +
						"<email>"+row.email+"</email>" +
						"<acc_name unique='yes'>"+row.acc_name+"</acc_name>" +
						"<address>"+row.address+"</address>" +
						"<pincode>"+row.pincode+"</pincode>" +
						"<city>"+row.city+"</city>" +
						"<state>"+row.state+"</state>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</row>";
				account_xml+="<row>" +
						"<id>"+row.id+"</id>" +
						"<acc_name>"+row.acc_name+"</acc_name>" +
						"<type>customer</type>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</row>";
			});
			
			data_xml+="</customers>";
			account_xml+="</accounts>";
			console.log(data_xml);
			
			if(import_type=='create_new')
			{
				create_batch(data_xml);
				create_batch(account_xml);
			}
			else
			{
				update_batch(data_xml);
				update_batch(account_xml);
			}
		}
		
		function form30_import_template()
		{
			var data_array=['id','name','phone','email','acc_name','address','city','pincode','state'];
			my_array_to_csv(data_array);
		};

	</script>
</div>