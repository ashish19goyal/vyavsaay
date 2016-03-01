<div id='form203' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form203_header'></form>
					<th>AWB # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form203_header'></th>
					<th>Order # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form203_header'></th>
					<th>Customer </th>
					<th>Date <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form203_header'></th>
					<th>Type </th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form203_header'></th>
					<th><input type="button" value='Add new order' class='add_icon' form='form203_header' onclick="modal128_action();">
						<br><input type='button' form='form203_header' value='Import' name='import' class='import_icon'>
						<br><input type='button' form='form203_header' value='EXPORT' name='export' class='export_icon'>
						<input type='submit' form='form203_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form203_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form203_prev' class='prev_icon' data-index='-25' onclick="$('#form203_index').attr('data-index',$(this).attr('data-index')); form203_ini();">
		<div style='display:hidden;' id='form203_index' data-index='0'></div>
		<img src='./images/next.png' id='form203_next' class='next_icon' data-index='25' onclick="$('#form203_index').attr('data-index',$(this).attr('data-index')); form203_ini();">
	</div>
    
    <script>
    
    function form203_header_ini()
{
	var filter_fields=document.getElementById('form203_header');
	var awb_filter=filter_fields.elements[0];
	var order_filter=filter_fields.elements[1];
	var date_filter=filter_fields.elements[2];
	var status_filter=filter_fields.elements[3];
	var import_button=filter_fields.elements['import'];
		
	var awb_data="<logistics_orders>" +
			"<awb_num></awb_num>" +
			"</logistics_orders>";
	var order_data="<logistics_orders>" +
			"<order_num></order_num>" +
			"</logistics_orders>";

	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form203_ini();
	});

	$(import_button).off("click");
	$(import_button).on("click",function(event)
	{
		modal149_action();
	});

	$(awb_filter).on('click',function()
	{
	///write code to select all text in the field
		this.select();
	});
	
	//set_my_filter(order_data,order_filter);
	//set_my_filter(awb_data,awb_filter);
	set_static_filter('logistics_orders','status',status_filter);
	$(date_filter).datepicker();
};

function form203_ini()
{
	show_loader();
	var fid=$("#form203_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	var filter_fields=document.getElementById('form203_header');

	//populating form 
	var fawb=filter_fields.elements[0].value;
	var forder=filter_fields.elements[1].value;
	var fdate=get_raw_time(filter_fields.elements[2].value);
	var fstatus=filter_fields.elements[3].value;
	
	////indexing///
	var index_element=document.getElementById('form203_index');
	var prev_element=document.getElementById('form203_prev');
	var next_element=document.getElementById('form203_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
	
	$('#form203_body').html("");
	
	var awb_object={index:'awb_num'};
	var status_object={index:'status'};
	if(fawb!="")
	{
		awb_object={index:'awb_num',exact:fawb};
	}
	if(fstatus!="")
	{
		status_object={index:'status',exact:fstatus};
	}

	if_data_read_access('store_areas',function(accessible_data)
	{
		//console.log(accessible_data);
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

		//console.log(branch_object);
		
		var new_columns=new Object();
			new_columns.count=25;
			new_columns.start_index=start_index;
			new_columns.data_store='logistics_orders';		
			
			new_columns.indexes=[{index:'id',value:fid},
								{index:'order_num',value:forder},
								{index:'merchant_name'},
								{index:'ship_to'},
								{index:'import_date',value:fdate},
								{index:'type'},
								{index:'manifest_type'},
								{index:'branch'},
								branch_object,
								status_object,
								awb_object];
		
		read_json_rows('form203',new_columns,function(results)
		{	
			results.forEach(function(result)
			{
				var rowsHTML="";
				rowsHTML+="<tr>";
					rowsHTML+="<form id='form203_"+result.id+"'></form>";
						rowsHTML+="<td data-th='AWB #'>";
							rowsHTML+="<input type='text' readonly='readonly' class='input_link' form='form203_"+result.id+"' onclick=\"element_display('"+result.id+"','form198');\" value='"+result.awb_num+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Order #'>";
							rowsHTML+=result.order_num;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Customer'>";
							rowsHTML+="<b>Merchant: </b>"+ result.merchant_name;
							rowsHTML+="<br><b>Ship to: </b>"+ result.ship_to;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Date'>";
							rowsHTML+=get_my_past_date(result.import_date);
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Type'>";
							rowsHTML+="<b>Type: </b>"+ result.type;
							rowsHTML+="<br><b>Manifest Type: </b>"+ result.manifest_type;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form203_"+result.id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form203_"+result.id+"' value='"+result.id+"' name='id'>";
							rowsHTML+="<input type='button' class='delete_icon' form='form203_"+result.id+"' title='Delete order' onclick='form203_delete_item($(this));'>";
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
	
				$('#form203_body').append(rowsHTML);
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
				get_limited_export_data(new_columns,'logistics_orders',function(new_result)
				{
					new_result.import_date=get_my_datetime(new_result.import_date);
				});
			});
			hide_loader();
		});
	});
};

function form203_delete_item(button)
{
	if(is_delete_access('form203'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			
			var awb_num=form.elements[0].value;
			var data_id=form.elements[2].value;
			var last_updated=get_my_time();
			var data_xml="<logistics_orders>" +
						"<id>"+data_id+"</id>" +
						"</logistics_orders>";	
			var sku_xml="<logistics_sku_mapping>" +
						"<awb_num>"+awb_num+"</awb_num>" +
						"</logistics_sku_mapping>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>logistics_orders</tablename>" +
						"<link_to>form203</link_to>" +
						"<title>Deleted</title>" +
						"<notes>AWB # "+awb_num+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
				server_delete_simple(sku_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
				local_delete_simple(sku_xml);
			}	
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

function form203_import_template()
{
	var data_array=['id','AWB No.','Type','Order No.','Manifest ID','Merchant Name','Ship To','Address1','Address2','City','State','Pincode','Mobile number','Tel. Number','Prod/SKU code','Product name','Weight','Declared Value','Collectable Value','Vendor Code','Shipper Name','Return Address1','Return Address2','Return Address3','Return Pin','Length ( Cms )','Breadth ( Cms )','Height ( Cms )','Pieces','Carrier Account','Carrier Name','Manifest Type','Dispatch Date','Notes','Pickup Location','Pickup By'];
	my_array_to_csv(data_array);
};

function form203_import(data_array,import_type)
{
	var data_xml="<logistics_orders>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</logistics_orders><separator></separator><logistics_orders>";
		}
				counter+=1;
		
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}
		var order_history=[];
		var history_object=new Object();
		history_object.timeStamp=get_my_time();
		history_object.details="Order dispatched from Shopclues";
		history_object.location=row['Pickup Location'];	
		if(row['Manifest Type']=='RTM Manifest')
		{
			history_object.location=row['Return Address2'];	
		}
		history_object.status="dispatched";
		order_history.push(history_object);
		var order_history_string=JSON.stringify(order_history);
		
		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<awb_num unique='yes'>"+row['AWB No.']+"</awb_num>"+
                "<type>"+row['Type']+"</type>"+
                "<order_num>"+row['Order No.']+"</order_num>"+
                "<manifest_id>"+row['Manifest ID']+"</manifest_id>"+
                "<merchant_name>"+row['Merchant Name']+"</merchant_name>"+
                "<ship_to>"+row['Ship To']+"</ship_to>"+
                "<address1>"+row['Address1']+"</address1>"+
                "<address2>"+row['Address2']+"</address2>"+
                "<city>"+row['City']+"</city>"+
                "<state>"+row['State']+"</state>"+
                "<pincode>"+row['Pincode']+"</pincode>"+
                "<phone>"+row['Mobile number']+"</phone>"+
                "<telephone>"+row['Tel. Number']+"</telephone>"+
                "<weight>"+row['Weight']+"</weight>"+
                "<declared_value>"+row['Declared Value']+"</declared_value>"+
                "<collectable_value>"+row['Collectable Value']+"</collectable_value>"+
                "<vendor_code>"+row['Vendor Code']+"</vendor_code>"+
                "<shipper_name>"+row['Shipper Name']+"</shipper_name>"+
                "<return_address1>"+row['Return Address1']+"</return_address1>"+
                "<return_address2>"+row['Return Address2']+"</return_address2>"+
                "<return_address3>"+row['Return Address3']+"</return_address3>"+
                "<return_pincode>"+row['Return Pin']+"</return_pincode>"+
                "<len>"+row['Length ( Cms )']+"</len>"+
                "<breadth>"+row['Breadth ( Cms )']+"</breadth>"+
                "<height>"+row['Height ( Cms )']+"</height>"+
                "<pieces>"+row['Pieces']+"</pieces>"+
                "<carrier_account>"+row['Carrier Account']+"</carrier_account>"+
                "<carrier_name>"+row['Carrier Name']+"</carrier_name>"+
                "<manifest_type>"+row['Manifest Type']+"</manifest_type>"+
                "<dispatch_date>"+get_raw_time(row['Dispatch Date'])+"</dispatch_date>"+
                "<import_date>"+get_raw_time(get_my_date())+"</import_date>"+
                "<notes>"+row['Notes']+"</notes>"+
                "<pickup_location>"+row['Pickup Location']+"</pickup_location>"+
                "<pickup_by>"+row['Pickup By']+"</pickup_by>"+
                "<sku>"+row['Prod/SKU code']+"</sku>"+
                "<product_name>"+row['Product name']+"</product_name>"+
                "<order_history>"+order_history_string+"</order_history>"+
                "<status>picked</status>"+
                "<last_updated>"+last_updated+"</last_updated>" +
				"</row>";							
	});
	data_xml+="</logistics_orders>";
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