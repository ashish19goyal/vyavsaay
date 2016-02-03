<div id='form30' class='tab-pane portlet'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form30_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form30_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form30_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form30_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
		<form id='form30_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Name" class='floatlabel' name='name'></label>
				<label><input type='text' placeholder="Phone" class='floatlabel' name='contact'></label>
				<label><input type='text' placeholder="Email" class='floatlabel' name='email'></label>
				<label><input type='submit' class='submit_hidden'></label>			
			</fieldset>
		</form>
		<br>
		
		<div id='form30_body'>
			
		</div>
	</div>
	
	<script>

		function form30_header_ini()
		{
			var filter_fields=document.getElementById('form30_header');
			var name_filter=filter_fields.elements['name'];
			var contact_filter=filter_fields.elements['contact'];
			
			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form30_ini();
			});
		
			var name_data=new Object();
				name_data.data_store="customers";
				name_data.return_column="name";
				name_data.indexes=[{index:'id'}];
			
			set_my_filter_json(name_data,name_filter);
		};
		
		function form30_ini()
		{
			show_loader();
			var fid=$("#form30_link").attr('data_id');
			if(fid==null)
				fid="";	
				
			$('#form30_body').html("");
			var filter_fields=document.getElementById('form30_header');
			var fname=filter_fields.elements['name'].value;
			var fcontact=filter_fields.elements['contact'].value;
			var femail=filter_fields.elements['email'].value;
			
			var paginator=$('#form30_body').paginator({'page_size':24});
			
			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='customers';

					columns.indexes=[{index:'id',value:fid},
									{index:'name',value:fname},
									{index:'acc_name'},
									{index:'phone',value:fcontact},
									{index:'email',value:femail},
									{index:'address'},
									{index:'city'},
									{index:'state'},
									{index:'pincode'}];		
			
			read_json_rows('form30',columns,function(results)
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
				});
				
				$('#form277').formcontrol();
				paginator.update_index(results.length);				
				initialize_tabular_report_buttons(columns,'Customers','form30',function (item){});
								
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
				
				var data_json={data_store:'customers',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'phone',value:phone},
	 					{index:'email',value:email},
	 					{index:'last_updated',value:last_updated}],
	 				log:'yes',
	 				log_data:{title:'Updated',notes:'Profile of customer '+name,link_to:'form30'}};

				update_json(data_json);
				
				$(form).readonly();
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
					
					var data_json={data_store:'customers',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Profile of customer "+name,link_to:"form30"}};
					var account_json={data_store:'accounts',
 							data:[{index:'id',value:data_id},{index:'type',value:'customer'}]};
					var attribute_json={data_store:'attributes',
 							data:[{index:'name',value:acc_name},{index:'type',value:'customer'}]};
								
					delete_json(data_json);
					delete_json(account_json);
					delete_json(attribute_json);
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
									{column:'city',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'state',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'pincode',regex:new RegExp('^[0-9]+$')}];
							
			var error_array=validate_import_array(data_array,validate_template_array);
			return error_array;					
		}
		
		function form30_import(data_array,import_type)
		{
			var data_json={data_store:'customers',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Customer profiles',link_to:'form30'}};

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
	 					{index:'name',value:row.name},
	 					{index:'acc_name',value:row.acc_name,unique:'yes'},
	 					{index:'type',value:'customer'},
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
		
		function form30_import_template()
		{
			var data_array=['id','name','phone','email','acc_name','address','city','pincode','state'];
			my_array_to_csv(data_array);
		};

	</script>
</div>