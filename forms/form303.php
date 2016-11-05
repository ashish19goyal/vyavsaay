<div id='form303' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form303_header'></form>
					<th>Item Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form303_header'></th>
					<th>Store <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form303_header'></th>
					<th>Quantity</th>
					<th><input type='button' form='form303_header' value='Add item' class='add_icon' onclick='form303_add_item();'>
						<input type='button' form='form303_header' name='export' value='EXPORT' class='export_icon'>
						<input type='submit' form='form303_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form303_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form303_prev' class='prev_icon' data-index='-25' onclick="$('#form303_index').attr('data-index',$(this).attr('data-index')); form303_ini();">
		<div style='display:hidden;' id='form303_index' data-index='0'></div>
		<img src='./images/next.png' id='form303_next' class='next_icon' data-index='25' onclick="$('#form303_index').attr('data-index',$(this).attr('data-index')); form303_ini();">
	</div>

	<script>
		function form303_header_ini()
		{
			var filter_fields=document.getElementById('form303_header');
			var name_filter=filter_fields.elements[0];
			var area_filter=filter_fields.elements[1];

			var products_data="<product_master>" +
					"<name></name>" +
					"</product_master>";
			var area_data="<store_areas>" +
					"<name></name>" +
					"</store_areas>";

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form303_ini();
			});

			set_my_filter(products_data,name_filter);
			set_my_filter(area_data,area_filter);
		};

		function form303_ini()
		{
			show_loader();
			var fid=$("#form303_link").attr('data_id');
			if(fid==null)
				fid="";

			var filter_fields=document.getElementById('form303_header');

			var fname=filter_fields.elements[0].value;
			var farea=filter_fields.elements[1].value;

			////indexing///
			var index_element=document.getElementById('form303_index');
			var prev_element=document.getElementById('form303_prev');
			var next_element=document.getElementById('form303_next');
			var start_index=index_element.getAttribute('data-index');
			//////////////

			var columns="<area_utilization count='25' start_index='"+start_index+"'>" +
					"<id>"+fid+"</id>" +
					"<item_name>"+fname+"</item_name>" +
					"<name>"+farea+"</name>" +
					"</area_utilization>";

			$('#form303_body').html("");

			if_data_read_access('area_utilization',function(accessible_data)
			{
				fetch_requested_data('form303',columns,function(results)
				{
					results.forEach(function(result)
					{
						var read=false;
						var update=false;
						var del=false;
						var access=false;
						for(var x in accessible_data)
						{
							if(accessible_data[x].record_id===result.id || accessible_data[x].record_id=='all')
							{
								if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || result[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
								{
									if(accessible_data[x].access_type=='all')
									{
										read=true;
										update=true;
										del=true;
										access=true;
										break;
									}
									else if(accessible_data[x].access_type=='read')
									{
										read=true;
									}
									else if(accessible_data[x].access_type=='delete')
									{
										del=true;
									}
									else if(accessible_data[x].access_type=='update')
									{
										update=true;
									}
								}
							}
						}

						if(read)
						{
							var rowsHTML="";
							rowsHTML+="<tr>";
								rowsHTML+="<form id='form303_"+result.id+"'></form>";
									rowsHTML+="<td data-th='Item Name'>";
										rowsHTML+="<input type='text' readonly='readonly' form='form303_"+result.id+"' value='"+result.item_name+"'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Store Area'>";
										rowsHTML+="<input type='text' readonly='readonly' form='form303_"+result.id+"' value='"+result.name+"'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Quantity'>";
										rowsHTML+="<input type='number' step='any' class='dblclick_editable' readonly='readonly' form='form303_"+result.id+"'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Action'>";
										rowsHTML+="<input type='hidden' form='form303_"+result.id+"' value='"+result.id+"'>";
										rowsHTML+="<input type='hidden' form='form303_"+result.id+"'>";
									if(update)
										rowsHTML+="<input type='submit' class='save_icon' form='form303_"+result.id+"' name='save' title='Update'>";
									if(del)
										rowsHTML+="<input type='button' class='delete_icon' form='form303_"+result.id+"' name='delete' title='Delete' onclick='form303_delete_item($(this));'>";
									rowsHTML+="</td>";
							rowsHTML+="</tr>";

							$('#form303_body').append(rowsHTML);
							var fields=document.getElementById("form303_"+result.id);
							var fresh_inventory=fields.elements[2];
							var old_inventory=fields.elements[4];
							var delete_button="";
							if(del)
							{
								delete_button=fields.elements['delete'];
							}

							if(update)
							{
								save_button=fields.elements['save'];
								$(save_button).on('click',function (e)
								{
									e.preventDefault();
									form303_update_item(fields);
								});
							}

							get_store_inventory(result.name,result.item_name,'',function(inventory)
							{
								fresh_inventory.value=inventory;
								old_inventory.value=inventory;
								if(parseFloat(inventory)!=0)
								{
									$(delete_button).hide();
								}
							});
						}
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

					var export_button=filter_fields.elements['export'];
					$(export_button).off("click");
					$(export_button).on("click", function(event)
					{
						vExport.old_export(columns:columns,file:'Store Placements'});
					});
					hide_loader();
				});
			});
		};

		function form303_add_item()
		{
			if(is_create_access('form303'))
			{
				var rowsHTML="";
				var id=vUtil.newKey();
				rowsHTML+="<tr>";
				rowsHTML+="<form id='form303_"+id+"' autocomplete='off'></form>";
					rowsHTML+="<td data-th='Item Name'>";
						rowsHTML+="<input type='text' form='form303_"+id+"' value=''>";
						rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form303_add_product_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Store Area'>";
						rowsHTML+="<input type='text' form='form303_"+id+"' value=''>";
						rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new storage' id='form303_add_storage_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='number' readonly='readonly' form='form303_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form303_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='hidden' form='form303_"+id+"' value='0'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form303_"+id+"' name='save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form303_"+id+"' name='delete' onclick='$(this).parent().parent().remove();'>";
					rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form303_body').prepend(rowsHTML);

				var fields=document.getElementById("form303_"+id);
				var product_filter=fields.elements[0];
				var area_filter=fields.elements[1];

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form303_create_item(fields);
				});

				var products_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(products_data,product_filter,function ()
				{
					$(product_filter).focus();
				});

				var add_product=document.getElementById('form303_add_product_'+id);
				$(add_product).on('click',function()
				{
					modal112_action(function()
					{
						var product_data="<product_master>" +
								"<name></name>" +
								"</product_master>";
						set_my_value_list(products_data,product_filter,function ()
						{
							$(product_filter).focus();
						});
					});
				});


				var add_storage=document.getElementById('form303_add_storage_'+id);
				$(add_storage).on('click',function()
				{
					modal35_action(function()
					{
						var area_data="<store_areas>" +
						"<name></name>" +
						"<area_type exact='yes'>storage</area_type>" +
						"</store_areas>";
						set_my_value_list(area_data,area_filter);
					});
				});

				var area_data="<store_areas>" +
						"<name></name>" +
						"<area_type exact='yes'>storage</area_type>" +
						"</store_areas>";

				set_my_value_list(area_data,area_filter);
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form303_create_item(form)
		{
			if(is_create_access('form303'))
			{
				var product_name=form.elements[0].value;
				var name=form.elements[1].value;
				var data_id=form.elements[3].value;
				var last_updated=get_my_time();
				var data_xml="<area_utilization>" +
							"<id>"+data_id+"</id>" +
							"<item_name>"+product_name+"</item_name>" +
							"<batch>"+product_name+"</batch>" +
							"<name>"+name+"</name>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</area_utilization>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>area_utilization</tablename>" +
							"<link_to>form303</link_to>" +
							"<title>Added</title>" +
							"<notes>Item "+product_name+" to storage area "+name+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				create_row(data_xml,activity_xml);
				for(var i=0;i<4;i++)
				{
					$(form.elements[i]).attr('readonly','readonly');
				}

				var save_button=form.elements['save'];
				$(save_button).off('click');
				$(save_button).on('click',function (e)
				{
					e.preventDefault();
					form303_update_item(form);
				});

				var del_button=form.elements['delete'];
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form303_delete_item(del_button);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form303_update_item(form)
		{
			if(is_update_access('form303'))
			{
				var product_name=form.elements[0].value;
				var name=form.elements[1].value;
				var quantity=parseFloat(form.elements[2].value)-parseFloat(form.elements[4].value);
				var data_id=form.elements[3].value;
				var last_updated=get_my_time();
				var data_xml="<inventory_adjust>" +
							"<id>"+vUtil.newKey()+"</id>" +
							"<product_name>"+product_name+"</product_name>" +
							"<batch>"+product_name+"</batch>" +
							"<storage>"+name+"</storage>" +
							"<quantity>"+quantity+"</quantity>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</inventory_adjust>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>inventory_adjust</tablename>" +
							"<link_to>form303</link_to>" +
							"<title>Updated</title>" +
							"<notes>Inventory for "+product_name+" at storage area "+name+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				if(quantity!=0)
				{
					create_row(data_xml,activity_xml);
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

		function form303_delete_item(button)
		{
			if(is_delete_access('form303'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);

					var product_name=form.elements[0].value;
					var name=form.elements[1].value;
					var data_id=form.elements[3].value;
					var last_updated=get_my_time();
					var data_xml="<area_utilization>" +
								"<id>"+data_id+"</id>" +
								"</area_utilization>";
					var activity_xml="<activity>" +
								"<data_id>"+data_id+"</data_id>" +
								"<tablename>area_utilization</tablename>" +
								"<link_to>form303</link_to>" +
								"<title>Removed</title>" +
								"<notes>Item "+product_name+" from storage area "+name+"</notes>" +
								"<updated_by>"+get_name()+"</updated_by>" +
								"</activity>";
					delete_row(data_xml,activity_xml);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form303_import_template()
		{
			var data_array=['id','item_name','storage'];
			vUtil.arrayToCSV(data_array);
		};

		function form303_import_validate(data_array)
		{
			var validate_template_array=[{column:'item_name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'storage',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')}];

			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;
		}

		function form303_import(data_array,import_type)
		{
			var data_xml="<area_utilization>";
			var counter=1;
			var last_updated=get_my_time();

			data_array.forEach(function(row)
			{
				if((counter%500)===0)
				{
					data_xml+="</area_utilization><separator></separator><area_utilization>";
				}
				counter+=1;
				if(import_type=='create_new')
				{
					row.id=last_updated+counter;
				}

				data_xml+="<row>" +
						"<id>"+row.id+"</id>" +
						"<item_name>"+row.item_name+"</item_name>" +
						"<batch>"+row.item_name+"</batch>" +
						"<name>"+row.storage+"</name>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</row>";
			});

			data_xml+="</area_utilization>";
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
