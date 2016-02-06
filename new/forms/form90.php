<div id='form90' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form90_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form90_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form90_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form90_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form90_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form90_header'></th>
						<th><input type='text' placeholder="Description" class='floatlabel' name='desc' form='form90_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form90_header'></th>
						<th><input type='submit' form='form90_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form90_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form90_header_ini()
		{
			var filter_fields=document.getElementById('form90_header');
			var name_filter=filter_fields.elements['name'];
			var status_filter=filter_fields.elements['status'];
			
			var name_data={data_store:'bill_types',return_column:'name'};			
			set_my_filter_json(name_data,name_filter);
			set_static_filter_json('bill_types','status',status_filter);

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form90_ini();
			});		
		};
		
		function form90_ini()
		{
			show_loader();
			var fid=$("#form90_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			$('#form90_body').html("");
		
			var filter_fields=document.getElementById('form90_header');
			var fname=filter_fields.elements['name'].value;
			var fdesc=filter_fields.elements['desc'].value;
			var fstatus=filter_fields.elements['status'].value;
			
			var paginator=$('#form90_body').paginator();
			
			var data_json=new Object();
					data_json.count=paginator.page_size();
					data_json.start_index=paginator.get_index();
					data_json.data_store='bill_types';

					data_json.indexes=[{index:'id',value:fid},
									{index:'name',value:fname},
									{index:'notes',value:fdesc},
									{index:'status',value:fstatus}];
			
			read_json_rows('form90',data_json,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form90_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form90_"+result.id+"' value='"+result.name+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea readonly='readonly' form='form90_"+result.id+"' class='dblclick_editable'>"+result.notes+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select form='form90_"+result.id+"' class='dblclick_editable'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form90_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form90_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' name='delete' form='form90_"+result.id+"' title='Delete' onclick='form90_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
					$('#form90_body').append(rowsHTML);
		
					var fields=document.getElementById("form90_"+result.id);
					var status_filter=fields.elements[2];
					
					set_static_select('bill_types','status',status_filter,function () 
					{
						$(status_filter).selectpicker('val',result.status);
					});
					
					$(fields).on("submit",function(event)
					{
						event.preventDefault();
						form90_update_item(fields);
					});
				});
		
				$('#form90').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(data_json,'Invoice Types','form90',function (item){});
				hide_loader();
			});	
		};
		
		function form90_add_item()
		{
			if(is_create_access('form90'))
			{
				var id=get_new_key();
				var rowsHTML="<tr>";
						rowsHTML+="<form id='form90_"+id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<input type='text' form='form90_"+id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea form='form90_"+id+"' class='dblclick_editable'></textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<select form='form90_"+id+"' data-style='btn-info' class='dblclick_editable'></select>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form90_"+id+"' value='"+id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form90_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' name='delete' form='form90_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
				
				$('#form90_body').prepend(rowsHTML);
				
				var fields=document.getElementById("form90_"+id);
				var name_filter=fields.elements[0];
				var status_filter=fields.elements[2];
					
				set_static_select('bill_types','status',status_filter);

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form90_create_item(fields);
				});
							
				$(name_filter).focus();
				$('#form90').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}		
		}
		
		function form90_create_item(form)
		{
			if(is_create_access('form90'))
			{
				show_loader();
		
				var name=form.elements[0].value;
				var notes=form.elements[1].value;
				var status='active';
				var data_id=form.elements[3].value;
				var last_updated=get_my_time();
				
				var data_json={data_store:'bill_types',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name,unique:'yes'},
	 					{index:'notes',value:notes},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Created',notes:'Invoice type '+name,link_to:'form90'}};
 				
 				var data2_json={data_store:'user_preferences',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name+"_bill_num",unique:'yes'},
	 					{index:'display_name',value:name+" Bill series number"},
	 					{index:'value',value:1001},
	 					{index:'type',value:'accounting'},
	 					{index:'sync',value:'checked'},
	 					{index:'last_updated',value:last_updated}]};
 								
				create_json(data_json);
				create_json(data2_json);
				
				var product_instance_data=new Object();
					product_instance_data.data_store="product_instances";
					product_instance_data.indexes=[{index:'id'},{index:'product_name'},{index:'batch'},{index:'sale_price'}];
					
				read_json_rows('',product_instance_data,function(instances)
				{
					var data_json={data_store:'sale_prices',
		 					loader:'no',
		 					data:[]};
		
					var counter=1;
					var last_updated=get_my_time();
				
					instances.forEach(function(row)
					{
						counter+=1;
						row.id=last_updated+counter;
						
						var data_json_array=[{index:'id',value:row.id},
			 					{index:'product_name',value:row.product_name},
			 					{index:'batch',value:row.batch},
			 					{index:'sale_price',value:row.sale_price},
			 					{index:'pi_id',value:row.id},
			 					{index:'billing_type',value:name},
			 					{index:'last_updated',value:last_updated}];
		
						data_json.data.push(data_json_array);
					});

					create_batch_json(data_json);
				});
		
				$(form).readonly();

				var del_button=form.elements['delete'];
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form90_delete_item(del_button);
				});
				
				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form90_update_item(form);
				});
				
				var sales_price_complete=setInterval(function()
				{
		  		   if(localdb_open_requests===0 && number_active_ajax===0)
		  		   {
		  			   clearInterval(sales_price_complete);
			  		   hide_loader();
		  		   }
			    },1000);
			}
			else
			{
				$("#modal2_link").click();
			}
		}
		
		function form90_update_item(form)
		{
			if(is_update_access('form90'))
			{
				var name=form.elements[0].value;
				var notes=form.elements[1].value;
				var status=$(form.elements[2]).val();
				var data_id=form.elements[3].value;
				var last_updated=get_my_time();
				
				var data_json={data_store:'bill_types',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'notes',value:notes},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Invoice type '+name,link_to:'form90'}};
				update_json(data_json);

				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form90_delete_item(button)
		{
			if(is_delete_access('form90'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					
					var name=form.elements[0].value;
					var notes=form.elements[1].value;
					var data_id=form.elements[3].value;

					var data_json={data_store:'bill_types',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Invoice type "+name,link_to:"form90"}};
					
					var data2_json={data_store:'sale_prices',
 							data:[{index:'billing_type',value:name}]};

					var data3_json={data_store:'user_preferences',
 							data:[{index:'id',value:data_id}]};

					delete_json(data_json);			
					delete_json(data2_json);			
					delete_json(data3_json);			
										
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