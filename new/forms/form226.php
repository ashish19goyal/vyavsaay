<div id='form226' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form226_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form226_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form226_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form226_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form226_upload' onclick=modal23_action(form226_import_template,form226_import,form226_import_validate);><i class='fa fa-upload'></i> Import</a>
                    </li>
                </ul>
            </div>
        </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form226_header'></form>
						<th><input type='text' placeholder="Person" class='floatlabel' name='person' form='form226_header'></th>
						<th><input type='text' placeholder="Date" class='floatlabel' name='date' form='form226_header'></th>
						<th><input type='text' placeholder="Start KMs" readonly='readonly' form='form226_header'></th>
						<th><input type='text' placeholder="End KMs" readonly='readonly' form='form226_header'></th>
						<th><input type='text' placeholder="Total Run (KMs)" readonly='readonly' form='form226_header'></th>
						<th><input type='submit' form='form226_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form226_body'>
			</tbody>
		</table>
	</div>
    
    <script>
function form226_header_ini()
{
	var filter_fields=document.getElementById('form226_header');
	var person_filter=filter_fields.elements['person'];
	var date_filter=filter_fields.elements['date'];
		
	var person_data={data_store:'staff',return_column:'acc_name'};
	$(filter_fields).off('submit');
	$(filter_fields).on('submit',function(event)
	{
		event.preventDefault();
		form226_ini();
	});

	set_my_filter_json(person_data,person_filter);
	$(date_filter).datepicker();
};

function form226_ini()
{
	show_loader();
	var fid=$("#form226_link").attr('data_id');
	if(fid==null)
		fid="";	
	
	$('#form226_body').html("");

	var filter_fields=document.getElementById('form226_header');
	var fperson=filter_fields.elements['person'].value;
	var fdate=get_raw_time(filter_fields.elements['date'].value);
	
    var paginator=$('#form226_body').paginator();
			
    var new_columns={count:paginator.page_size(),
                     start_index:paginator.get_index(),
                     data_store:'delivery_run',
                     indexes:[{index:'id',value:fid},
                            {index:'person',value:fperson},
                            {index:'date',value:fdate},
                            {index:'starting_km'},
                            {index:'ending_km'},
                            {index:'total_run'}]};

	read_json_rows('form226',new_columns,function(results)
	{	
		results.forEach(function(result)
		{
			var rowsHTML="<tr>";
				rowsHTML+="<form id='form226_"+result.id+"'></form>";
					rowsHTML+="<td data-th='Person'>";
						rowsHTML+="<a onclick=\"show_object('staff','"+result.person+"');\"><input type='text' readonly='readonly' form='form226_"+result.id+"' value='"+result.person+"'></a>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+="<input type='text' readonly='readonly' form='form226_"+result.id+"' value='"+get_my_past_date(result.date)+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Start KMs'>";
						rowsHTML+="<input type='number' readonly='readonly' step='any' form='form226_"+result.id+"' value='"+result.starting_km+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='End KMs'>";
						rowsHTML+="<input type='number' readonly='readonly' step='any' form='form226_"+result.id+"' value='"+result.ending_km+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Total Run (KMs)'>";
						rowsHTML+="<input type='number' readonly='readonly' step='any' form='form226_"+result.id+"' value='"+result.total_run+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form226_"+result.id+"' value='"+result.id+"'>";
						rowsHTML+="<button type='button' class='btn red' form='form226_"+result.id+"' title='Delete' onclick='form226_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
					rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form226_body').append(rowsHTML);
		});

		$('#form226').formcontrol();
        paginator.update_index(results.length);
        initialize_tabular_report_buttons(new_columns,'Delivery Runs','form226',function (item)
        {
            item['date']=get_my_past_date(item.date);
        });
        hide_loader();
	});
};
    
function form226_add_item()
{
	if(is_create_access('form226'))
	{
		var id=get_new_key();
		var rowsHTML="<tr>";
			rowsHTML+="<form id='form226_"+id+"'></form>";
				rowsHTML+="<td data-th='Person'>";
					rowsHTML+="<input type='text' form='form226_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Date'>";
					rowsHTML+="<input type='text' form='form226_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Start KMs'>";
					rowsHTML+="<input type='number' step='any' form='form226_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='End KMs'>";
					rowsHTML+="<input type='number' step='any' form='form226_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Total Run (KMs)'>";
					rowsHTML+="<input type='number' readonly='readonly' step='any' required value='0' form='form226_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					rowsHTML+="<input type='hidden' form='form226_"+id+"' value='"+id+"'>";
					rowsHTML+="<button type='submit' class='btn green' form='form226_"+id+"' name='save' title='Save'><i class='fa fa-save'></i></button>";
					rowsHTML+="<button type='button' class='btn red' form='form226_"+id+"' title='Delete' onclick='form226_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
				rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form226_body').prepend(rowsHTML);
		var fields=document.getElementById("form226_"+id);
		var person_filter=fields.elements[0];
		var date_filter=fields.elements[1];
		var start_filter=fields.elements[2];
		var end_filter=fields.elements[3];
		var total_filter=fields.elements[4];
		
		$(date_filter).datepicker();
		
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form226_create_item(fields);
		});
		
		$(start_filter).add(end_filter).on('blur',function () 
		{
			if(parseFloat(end_filter.value)>=parseFloat(start_filter.value))
			{
				total_filter.value=parseFloat(end_filter.value)-parseFloat(start_filter.value);
			}
			else 
			{
				end_filter.value=start_filter.value;
				total_filter.value=0;
			}
		});
		
		var person_data={data_store:'staff',return_column:'acc_name'};
		set_my_value_list_json(person_data,person_filter,function () 
		{
			$(person_filter).focus();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form226_create_item(form)
{
	if(is_create_access('form226'))
	{
		var person=form.elements[0].value;
		var date=get_raw_time(form.elements[1].value);
		var start=form.elements[2].value;
		var end=form.elements[3].value;
		var total=form.elements[4].value;
		var data_id=form.elements[5].value;
		var save_button=form.elements['save'];
		var del_button=form.elements['delete'];
		var last_updated=get_my_time();
        
        var data_json={data_store:'delivery_run',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'person',value:person},
	 					{index:'date',value:date},
	 					{index:'starting_km',value:start},
	 					{index:'ending_km',value:end},
	 					{index:'total_run',value:total},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Delivery run for '+person,link_to:'form226'}};
				
		create_json(data_json);
		
		$(form).readonly();
		
		del_button.removeAttribute("onclick");
		$(del_button).on('click',function(event)
		{
			form226_delete_item(del_button);
		});
		
		$(save_button).off('click');
		$(save_button).on('click',function(e)
		{
            e.preventDefault();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}    

function form226_delete_item(button)
{
	if(is_delete_access('form226'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			
			var data_id=form.elements[5].value;
            
            var data_json={data_store:'delivery_run',
            data:[{index:'id',value:data_id}]};

			delete_json(data_json);
			
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}
        
function form226_import_template()
{
	var data_array=['id','person','date','starting_km','ending_km','total_run'];
	my_array_to_csv(data_array);
};

function form226_import_validate(data_array)
{
	var validate_template_array=[{column:'starting_km',required:'yes',regex:new RegExp('^[0-9 .]+$')},
							{column:'ending_km',required:'yes',regex:new RegExp('^[0-9 .]+$')},
							{column:'person',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
							{column:'total_run',required:'yes',regex:new RegExp('^[0-9 .]+$')},
							{column:'date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]+')}];
					
	var error_array=validate_import_array(data_array,validate_template_array);
	return error_array;					
}

function form226_import(data_array,import_type)
{
    var data_json={data_store:'delivery_run',
            log:'yes',
            data:[],
            log_data:{title:'Delivery Runs',link_to:'form226'}};

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
                {index:'person',value:row.person},
                {index:'date',value:get_raw_time(row.date)},
                {index:'starting_km',value:row.starting_km},
                {index:'ending_km',value:row.ending_km},
                {index:'total_run',value:row.total_run},             
                {index:'last_updated',value:last_updated}];

        data_json.data.push(data_json_array);
    });

    if(import_type=='create_new')
    {
        if(is_create_access('form226'))
        {
            create_batch_json(data_json);
        }
        else
        {
            $("#modal2_link").click();
        }
    }
    else
    {
        if(is_update_access('form226'))
        {
            update_batch_json(data_json);
        }
        else
        {
            $("#modal2_link").click();
        }
    }
};
        
    </script>
</div>