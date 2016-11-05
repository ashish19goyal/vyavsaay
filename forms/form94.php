<div id='form94' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form94_header'></form>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form94_header'></th>
					<th>Batch <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form94_header'></th>
					<th>Quantity</th>
					<th>Reason</th>
					<th><input type='button' form='form94_header' title='Discard another item' class='add_icon' onclick="modal40_action('','');">
						<input type='button' form='form94_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form94_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form94_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form94_prev' class='prev_icon' data-index='-25' onclick="$('#form94_index').attr('data-index',$(this).attr('data-index')); form94_ini();">
		<div style='display:hidden;' id='form94_index' data-index='0'></div>
		<img src='./images/next.png' id='form94_next' class='next_icon' data-index='25' onclick="$('#form94_index').attr('data-index',$(this).attr('data-index')); form94_ini();">
	</div>

    <script>
        function form94_header_ini()
{
	var filter_fields=document.getElementById('form94_header');
	var names_filter=filter_fields.elements[0];
	var batches_filter=filter_fields.elements[1];

	//setting autocompletes
	var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";

	var batch_data="<product_instances>" +
			"<batch></batch>" +
			"</product_instances>";

	set_my_filter(products_data,names_filter);
	set_my_filter(batch_data,batches_filter);


	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form94_ini();
	});
};

function form94_ini()
{
	show_loader();
	var fid=$("#form94_link").attr('data_id');
	if(fid==null)
		fid="";

	var filter_fields=document.getElementById('form94_header');

	var fname=filter_fields.elements[0].value;
	var fbatch=filter_fields.elements[1].value;

	////indexing///
	var index_element=document.getElementById('form94_index');
	var prev_element=document.getElementById('form94_prev');
	var next_element=document.getElementById('form94_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var columns="<discarded count='25' start_index='"+start_index+"'>" +
		"<id>"+fid+"</id>" +
		"<batch>"+fbatch+"</batch>" +
		"<product_name>"+fname+"</product_name>" +
		"<quantity></quantity>" +
		"<source></source>" +
		"<source_link></source_link>" +
		"<source_id></source_id>" +
		"<storage></storage>"+
		"<reason></reason>"+
		"<status exact='yes'>pending approval</status>"+
		"<last_updated></last_updated>" +
		"</discarded>";

	$('#form94_body').html("");

	fetch_requested_data('form94',columns,function(results)
	{
		results.forEach(function(result)
		{
			var source_string=result.source+" <a onclick=\"element_display('"+result.source_id+"','"+result.source_link+"')\"><u>"+result.source_id+"</u></a>";
			var rowsHTML="";
			rowsHTML+="<tr>";
				rowsHTML+="<form id='form94_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Item'>";
						rowsHTML+="<textarea readonly='readonly' form='form94_"+result.id+"'>"+result.product_name+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Batch'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form94_"+result.id+"' value='"+result.batch+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Quantity'>";
						rowsHTML+="<input type='number' step='any' readonly='readonly' form='form94_"+result.id+"' value='"+result.quantity+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Reason'>";
						rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form94_"+result.id+"'>"+result.reason+"</textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form94_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<input type='hidden' form='form94_"+result.id+"' value='"+result.storage+"'>";
						rowsHTML+="<input type='submit' class='save_icon' title='Save' form='form94_"+result.id+"'>";
						//rowsHTML+="<input type='button' class='delete_icon' title='Delete' form='form94_"+result.id+"' onclick='form94_delete_item($(this));'>";
						rowsHTML+="<br><input type='button' class='generic_icon' title='Don\'t Reject' value='Approve' form='form94_"+result.id+"'>";
						rowsHTML+="<br><input type='button' class='generic_icon' title='Reject' value='Reject' form='form94_"+result.id+"'>";
					rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form94_body').append(rowsHTML);
			var fields=document.getElementById("form94_"+result.id);
			//var storage_filter=fields.elements[3];
			var accept_button=fields.elements[7];
			var reject_button=fields.elements[8];

/*			var storage_xml="<store_areas>"+
							"<name></name>"+
							"</store_areas>";
			set_my_value_list(storage_xml,storage_filter);
*/
			$(fields).on("submit",function(event)
			{
				event.preventDefault();
				form94_update_item(fields);
			});

			$(accept_button).on("click",function(event)
			{
				event.preventDefault();
				form94_accept_item(fields);
			});

			$(reject_button).on("click",function(event)
			{
				event.preventDefault();
				form94_reject_item(fields);
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

		var export_button=filter_fields.elements[3];
		$(export_button).off("click");
		$(export_button).on("click", function(event)
		{
			vExport.old_export(columns:columns,file:'Discarded Items'});
		});
		hide_loader();
	});
};

function form94_update_item(form)
{
	if(is_update_access('form94'))
	{
		var item_name=form.elements[0].value;
		var batch=form.elements[1].value;
		//var storage=form.elements[3].value;
		var reason=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<discarded>" +
					"<id>"+data_id+"</id>" +
					//"<storage>"+storage+"</storage>" +
					"<reason>"+reason+"</reason>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</discarded>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>discarded</tablename>" +
					"<link_to>form94</link_to>" +
					"<title>Updated</title>" +
					"<notes>The reason for discarding "+item_name+"</notes>" +
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
		$("#modal2_link").click();
	}
}

/**
 * @form Discard Items
 * @formN0 94
 * @param button
 */
function form94_accept_item(form)
{
	if(is_delete_access('form94'))
	{
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var quantity=form.elements[2].value;
		var storage=form.elements[5].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<discarded>" +
					"<id>"+data_id+"</id>" +
					"</discarded>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>discarded</tablename>" +
					"<link_to>form94</link_to>" +
					"<title>Approved</title>" +
					"<notes>"+name+" not discarded</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		delete_row(data_xml,activity_xml);
		$(form).parent().remove();

		var adjust_id=vUtil.newKey();
		var adjust1_xml="<inventory_adjust>"+
						"<id>"+adjust_id+"</id>"+
						"<batch>"+batch+"</batch>"+
						"<quantity>"+quantity+"</quantity>"+
						"<product_name>"+name+"</product_name>"+
						"<storage>"+storage+"</storage>"+
						"<source>discarded</source>"+
						"<source_id>"+data_id+"</source_id>"+
						"<put_away_status>pending</put_away_status>"+
						"<last_updated>"+last_updated+"</last_updated>"+
						"</inventory_adjust>";
		var adjust2_xml="<inventory_adjust>"+
						"<id>"+(adjust_id+1)+"</id>"+
						"<batch>"+batch+"</batch>"+
						"<quantity>-"+quantity+"</quantity>"+
						"<product_name>"+name+"</product_name>"+
						"<storage>"+storage+"</storage>"+
						"<source>discarded</source>"+
						"<source_id>"+data_id+"</source_id>"+
						"<put_away_status>completed</put_away_status>"+
						"<last_updated>"+last_updated+"</last_updated>"+
						"</inventory_adjust>";
		create_simple(adjust1_xml);
		create_simple(adjust2_xml);
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 94
 * form Discarded Items
 * @param button
 */
function form94_reject_item(form)
{
	if(is_update_access('form94'))
	{
		var item_name=form.elements[0].value;
		var batch=form.elements[1].value;
		//var storage=form.elements[3].value;
		var reason=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<discarded>" +
					"<id>"+data_id+"</id>" +
					//"<storage>"+storage+"</storage>" +
					"<reason>"+reason+"</reason>" +
					"<status>rejected</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</discarded>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>discarded</tablename>" +
					"<link_to>form94</link_to>" +
					"<title>discarded</title>" +
					"<notes>"+item_name+" discarded</notes>" +
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
		$("#modal2_link").click();
	}
}

function form94_import_template()
{
	var data_array=['id','product_name','batch','quantity','storage'];
	vUtil.arrayToCSV(data_array);
};

function form94_import(data_array,import_type)
{
	var data_xml="<discarded>";
	var counter=1;
	var last_updated=get_my_time();

	data_array.forEach(function(row)
	{
		if((counter%500)===0)
		{
			data_xml+="</discarded><separator></separator><discarded>";
		}
				counter+=1;
		if(import_type=='create_new')
		{
			row.id=last_updated+counter;
		}

		data_xml+="<row>" +
				"<id>"+row.id+"</id>" +
				"<product_name>"+row.product_name+"</product_name>" +
				"<batch>"+row.batch+"</batch>" +
				"<quantity>"+row.quantity+"</quantity>" +
				"<storage>"+row.storage+"</storage>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</row>";
	});
	data_xml+="</discarded>";
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
