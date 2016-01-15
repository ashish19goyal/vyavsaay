<div id='form304' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form304_header'></form>
					<th>Product Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form304_header'></th>
					<th>Cost Price (in Rs)</th>
					<th>Sale Price (in Rs)</th>
					<th>Quantity</th>
					<th><input type='button' form='form304_header' name='export' value='EXPORT' class='export_icon'>
						<input type='submit' form='form304_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form304_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form304_prev' class='prev_icon' data-index='-25' onclick="$('#form304_index').attr('data-index',$(this).attr('data-index')); form304_ini();">
		<div style='display:hidden;' id='form304_index' data-index='0'></div>
		<img src='./images/next.png' id='form304_next' class='next_icon' data-index='25' onclick="$('#form304_index').attr('data-index',$(this).attr('data-index')); form304_ini();">
	</div>
	
	<script>
		function form304_header_ini()
		{
			var filter_fields=document.getElementById('form304_header');	
			var names_filter=filter_fields.elements[0];

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form304_ini();
			});
		
			var products_data="<product_master>" +
					"<name></name>" +
					"</product_master>";	
			set_my_filter(products_data,names_filter);
		};
			
		function form304_ini()
		{
			show_loader();
			var fid=$("#form304_link").attr('data_id');
			if(fid==null)
				fid="";	
			
			var filter_fields=document.getElementById('form304_header');
			
			var fname=filter_fields.elements[0].value;
			
			////indexing///
			var index_element=document.getElementById('form304_index');
			var prev_element=document.getElementById('form304_prev');
			var next_element=document.getElementById('form304_next');
			var start_index=index_element.getAttribute('data-index');
			//////////////
			
			var columns="<product_instances count='25' start_index='"+start_index+"'>" +
				"<id>"+fid+"</id>" +
				"<product_name>"+fname+"</product_name>" +
				"<cost_price></cost_price>" +
				"<sale_price></sale_price>" +
				"</product_instances>";
		
			$('#form304_body').html("");
			
			fetch_requested_data('form304',columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="";
					rowsHTML+="<tr>";
						rowsHTML+="<form id='form304_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<textarea readonly='readonly' form='form304_"+result.id+"'>"+result.product_name+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Cost price'>";
								rowsHTML+="<input type='number' step='any' readonly='readonly' form='form304_"+result.id+"' class='dblclick_editable' value='"+result.cost_price+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Sale price'>";
								rowsHTML+="<input type='number' step='any' readonly='readonly' form='form304_"+result.id+"' class='dblclick_editable' value='"+result.sale_price+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Quantity'>";
								rowsHTML+="<input type='number' step='any' readonly='readonly' form='form304_"+result.id+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form304_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<input type='submit' class='save_icon' title='Save' form='form304_"+result.id+"'>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";
					
					$('#form304_body').append(rowsHTML);
					var fields=document.getElementById("form304_"+result.id);
					var fresh_inventory=fields.elements[3];
					
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form304_update_item(fields);
					});
		
					get_inventory(result.product_name,'',function(inventory)
					{
						fresh_inventory.value=parseFloat(inventory);
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
		
				var export_button=filter_fields.elements['export'];
				$(export_button).off("click");
				$(export_button).on("click", function(event)
				{
					get_export_data(columns,'Inventory');
				});
				
				hide_loader();
			});
		};
				
		function form304_update_item(form)
		{
			if(is_update_access('form304'))
			{
				var name=form.elements[0].value;
				var cost_price=form.elements[1].value;
				var sale_price=form.elements[2].value;
				var data_id=form.elements[4].value;
				var last_updated=get_my_time();
				var data_xml="<product_instances>" +
							"<id>"+data_id+"</id>" +
							"<product_name>"+name+"</product_name>" +
							"<batch>"+name+"</batch>" +
							"<cost_price>"+cost_price+"</cost_price>" +
							"<sale_price>"+sale_price+"</sale_price>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</product_instances>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>product_instances</tablename>" +
							"<link_to>form304</link_to>" +
							"<title>Updated</title>" +
							"<notes>Inventory for product "+name+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				update_row(data_xml,activity_xml);
				for(var i=0;i<4;i++)
				{
					$(form.elements[i]).attr('readonly','readonly');
				}
			}
			else
			{
				$("#modal2").dialog("open");
			}
		}
		
		function form304_import_template()
		{
			var data_array=['id','product_name','cost_price','sale_price','manufacture_date','mrp'];
			my_array_to_csv(data_array);
		};
		
		function form304_import_validate(data_array)
		{
			var validate_template_array=[{column:'product_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'cost_price',required:'yes',regex:new RegExp('^[0-9]+$')},
									{column:'sale_price',regex:new RegExp('^[[0-9]+$')},
									{column:'manufacture_date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
									{column:'mrp',regex:new RegExp('^[0-9]+$')}];
							
			var error_array=validate_import_array(data_array,validate_template_array);
			return error_array;					
		}
		
		function form304_import(data_array,import_type)
		{
			var data_xml="<product_instances>";
			var counter=1;
			var new_id=parseFloat(get_new_key());
			var last_updated=get_my_time();
			data_array.forEach(function(row)
			{
				if((counter%500)===0)
				{
					data_xml+="</product_instances><separator></separator><product_instances>";
				}
				counter+=1;
				if(import_type=='create_new')
				{
					row.id=last_updated+counter;
				}
		
				data_xml+="<row>" +
						"<id>"+row.id+"</id>" +
						"<product_name>"+row.product_name+"</product_name>" +
						"<batch>"+row.product_name+"</batch>" +
						"<cost_price>"+row.cost_price+"</cost_price>" +
						"<sale_price>"+row.sale_price+"</sale_price>" +
						"<manufacture_date>"+get_raw_time(row.manufacture_date)+"</manufacture_date>" +
						"<mrp>"+row.mrp+"</mrp>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</row>";
				
			});
		
			data_xml+="</product_instances>";
			
			if(import_type=='create_new')
			{
				create_batch(data_xml);
			}
			else
			{
				update_batch(data_xml);
			}
		}
	</script>
</div>