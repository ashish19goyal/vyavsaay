<div id='form249' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form249_header'></form>
					<th>Bag # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form249_header'></th>
					<th>Date <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form249_header'></th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form249_header'></th>
					<th>MTS</th>
					<th>
						<input type='button' form='form249_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form249_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form249_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form249_prev' class='prev_icon' data-index='-25' onclick="$('#form249_index').attr('data-index',$(this).attr('data-index')); form249_ini();">
		<div style='display:hidden;' id='form249_index' data-index='0'></div>
		<img src='./images/next.png' id='form249_next' class='next_icon' data-index='25' onclick="$('#form249_index').attr('data-index',$(this).attr('data-index')); form249_ini();">
	</div>
    
    <script>
    
        function form249_header_ini()
{
	var filter_fields=document.getElementById('form249_header');
	var bag_filter=filter_fields.elements[0];
	var date_filter=filter_fields.elements[1];
	var status_filter=filter_fields.elements[2];
		
	var bag_data="<transit_bags>" +
			"<bag_num></bag_num>" +
			"</transit_bags>";
			
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form249_ini();
	});

	set_my_filter(bag_data,bag_filter);
	$(date_filter).datepicker();
		
	set_static_filter('transit_bags','status',status_filter);
};

function form249_ini()
{
	show_loader();
	var fid=$("#form249_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form249_header');

	//populating form 
	var fbag=filter_fields.elements[0].value;
	var fdate=get_raw_time(filter_fields.elements[1].value);
	var fstatus=filter_fields.elements[2].value;
	
	////indexing///
	var index_element=document.getElementById('form249_index');
	var prev_element=document.getElementById('form249_prev');
	var next_element=document.getElementById('form249_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	$('#form249_body').html("");
	
	if_data_read_access('store_areas',function(accessible_data)
	{
		console.log(accessible_data);
		var branches_array=[];
		var branch_object={index:'branch',array:branches_array};
		
		for(var x in accessible_data)
		{
			branches_array.push(accessible_data[x].name);
			if(accessible_data[x].record_id=='all')
			{
				branch_object={index:'branch'};
				break;
			}
		}

		console.log(branch_object);
		
		var new_columns=new Object();
			new_columns.count=25;
			new_columns.start_index=start_index;
			new_columns.data_store='transit_bags';		
			
			new_columns.indexes=[{index:'id',value:fid},
								{index:'bag_num',value:fbag},
								{index:'lbh'},
								{index:'weight'},
								{index:'date',value:fdate},
								{index:'num_orders'},
								{index:'status',value:fstatus},
								{index:'mts'},
								branch_object];
		
		read_json_rows('form249',new_columns,function(results)
		{			
			results.forEach(function(result)
			{
				var rowsHTML="";
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form249_"+result.id+"'></form>";
						rowsHTML+="<td data-th='Bag #'>";
							rowsHTML+="<input type='text' class='input_link' readonly='readonly' form='form249_"+result.id+"' value='"+result.bag_num+"' onclick=\"element_display('"+result.id+"','form248');\">";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Date'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form249_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form249_"+result.id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='MTS'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form249_"+result.id+"' value='"+result.mts+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form249_"+result.id+"' value='"+result.id+"' name='id'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form249_"+result.id+"' title='Delete' onclick='form249_delete_item($(this));'>";
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
				
				$('#form249_body').append(rowsHTML);
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
			
			var export_button=filter_fields.elements[3];
			
			$(export_button).off("click");
			$(export_button).on("click", function(event)
			{
				get_export_data(columns,'Transit bags');
			});
			hide_loader();
		});
	});
};

/**
 * @form Manage Transit Bags
 * @param button
 */
function form249_delete_item(button)
{
	if(is_delete_access('form249'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var bag_num=form.elements[0].value;
			var data_id=form.elements[4].value;
			var data_xml="<transit_bags>" +
						"<id>"+data_id+"</id>" +
						"</transit_bags>";	
			var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>transit_bags</tablename>" +
					"<link_to>form249</link_to>" +
					"<title>Delete</title>" +
					"<notes>Bag # "+bag_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
			
			var bag_items_xml="<logistics_orders>"+
							"<id></id>"+
							"<status exact='yes'>in-transit</status>"+
							"<bag_num exact='yes'>"+bag_num+"</bag_num>"+
							"</logistics_orders>";			
			get_single_column_data(function(bag_items)
			{
				var data_xml="<logistics_orders>";
				var counter=1;
				var last_updated=get_my_time();
				
				bag_items.forEach(function(bag_item)
				{
					if((counter%500)===0)
					{
						data_xml+="</logistics_orders><separator></separator><logistics_orders>";
					}
						
					counter+=1;
				
					data_xml+="<row>" +
							"<id>"+bag_item+"</id>" +
							"<bag_num></bag_num>" +
							"<bag_id></bag_id>" +
							"<status>received</status>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</row>";
				});
				data_xml+="</logistics_orders>";
				//console.log(data_xml);
				update_batch(data_xml);
				
			},bag_items_xml);
			
			delete_row(data_xml,activity_xml);
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