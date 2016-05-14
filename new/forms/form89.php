<div id='form89' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>
            <div class='btn-group' id='form89_view' data-toggle='buttons'>
                <label class='btn green-jungle cc active' onclick=form89_ini('calendar');><input name='cc' type='radio' class='toggle'>Calendar</label>
                <label class='btn green-jungle tt' onclick=form89_ini('table');><input type='radio' name='tt' class='toggle'>Table</label>
            </div>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form89_add_item();'>Add Appointment <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Sync <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form89_google_sync'><i class='fa fa-google'></i> Google Calendar</a>
                    </li>
                </ul>
            </div>
			<div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form89_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form89_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form89_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form89_upload' onclick=modal23_action(form89_import_template,form89_import,form89_import_validate);><i class='fa fa-upload'></i> Import</a>
                    </li>
                </ul>
            </div>
        </div>	
	</div>
	
	<div class="portlet-body">
	   <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form89_header'></form>
						<th><input type='text' placeholder="Customer" class='floatlabel' name='customer' form='form89_header'></th>
						<th><input type='text' placeholder="Assignee" class="floatlabel" name='assignee' form='form89_header'></th>
						<th><input type='text' placeholder="Schedule" readonly='readonly' form='form89_header'></th>
						<th><input type='text' placeholder="Notes" class="floatlabel" name='notes' form='form89_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form89_header'></th>
						<th><input type='submit' form='form89_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form89_body'>
			</tbody>
		</table>

        <div class='row'>
            <div class="col-md-12 col-sm-12">
                <div id="form89_calendar" class="has-toolbar"></div>
            </div>
        </div>

    </div>
	
	<script>
	function form89_header_ini()
	{
		///calendar set
		var filter_fields=document.getElementById('form89_header');
		var customer_filter=filter_fields.elements[0];
		var assignee_filter=filter_fields.elements[1];
		var status_filter=filter_fields.elements[2];

		var staff_data={data_store:'staff',return_column:'acc_name'};
		var customer_data={data_store:'customers',return_column:'acc_name'};

		set_my_filter_json(customer_data,customer_filter);	
		set_my_filter_json(staff_data,assignee_filter);
		set_static_filter_json('appointments','status',status_filter);

		$(filter_fields).off('submit');
		$(filter_fields).on('submit',function(event)
		{
			event.preventDefault();
			form89_ini();
		});

		$("#form89_calendar").parent().parent().show();        
	};

		
	function form89_ini(view)
    {
        var fid=$("#form89_link").attr('data_id');
        if(fid==null)
            fid="";
        show_loader();
        $('#form89_body').html("");
        $('#form89_calendar').fullCalendar('destroy');
            
        var view_filter='calendar';
        if(typeof view!='undefined' && view=='table')
        {
            view_filter='table';
            $('#form89_view').find('label.tt').addClass('active');
            $('#form89_view').find('label.cc').removeClass('active');
        }
        else
        {
            $('#form89_view').find('label.cc').addClass('active');
            $('#form89_view').find('label.tt').removeClass('active');
        }

        if(view_filter=='calendar')
        {
            $("#form89_body").parent().hide();
            $("#form89_calendar").parent().parent().show();
            
            $('#form89_calendar').fullCalendar({
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'today'
                },
                editable: true,
                slotEventOverlap:true,
                events: function(start, end, timezone, callback) 
                {
					var start_time=parseFloat(start.unix())*1000;
                    var end_time=parseFloat(end.unix())*1000;
                    var tasks_data={data_store:'appointments',
									access:{},
                                   indexes:[{index:'id'},
                                           {index:'customer'},
                                           {index:'schedule',lowerbound:start_time,upperbound:end_time},
                                           {index:'status'},
                                           {index:'assignee'},
                                           {index:'hours'},
                                           {index:'notes'}]};
                    read_json_rows('form89',tasks_data,function(tasks)
                    {
                        var events=[];
                        tasks.forEach(function(task)
                        {
                            if(parseFloat(task.task_hours)==0)
                            {
                                task.task_hours=1;
                            }
                            var color="#f8cb00";
                            if(task.status=='cancelled')
                            {
                                color="#95a5a6";
                            }
                            else if(task.status=='pending' && parseFloat(task.t_due)<get_my_time())
                            {
                                color='#f3565d';
                            }
                            else if(task.status=='completed')
                            {
                                color='#1bbc9b';
                            }
                            events.push({
                                title: "Appointment with "+task.customer+"\n"+task.notes,
                                start:get_iso_time(task.t_due-3600000*(parseFloat(task.task_hours))),
                                end:get_iso_time(task.t_due),
                                color: color,
                                id: task.id,
                            });
                        });
                        callback(events);
                        
                        initialize_tabular_report_buttons(tasks_data,'Appointments','form89',function (item)
                        {
                            item['Schedule']=get_my_datetime(item.schedule);
                            delete item.schedule;
                            delete item.hours;
                        });
                        hide_loader();
                    });
                },
                dayClick: function(date,jsEvent,view){
                    modal36_action(get_my_date_from_iso(date.format()));
                },
                eventClick: function(calEvent,jsEvent,view){
                    modal37_action(calEvent.id);
                },
				eventDrop: function(event,delta,revertFunc)
				{
					var schedule=(parseFloat(event.start.unix())*1000);
					var data_json={data_store:'appointments',
 							data:[{index:'id',value:event.id},
                                 {index:'schedule',value:schedule},
                                 {index:'last_updated',value:get_my_time()}]};
                    update_json(data_json);
				},
				eventResize: function(event, delta, revertFunc){
					var hours=parseFloat((parseFloat(event.end.unix())-parseFloat(event.start.unix()))/3600);
					var data_json={data_store:'appointments',
 							data:[{index:'id',value:event.id},
                                 {index:'hours',value:hours},
                                 {index:'last_updated',value:get_my_time()}]};
                    update_json(data_json);					
				}
            });
            setTimeout(function(){$('#form89 .fc-today-button').click()},1000);    
        }
        else
        {   
            $("#form89_body").parent().show();
            $("#form89_calendar").parent().parent().hide();
            
            var fields=document.getElementById('form89_header');
            var customer_filter=fields.elements['customer'].value;
            var assignee_filter=fields.elements['assignee'].value;
            var notes_filter=fields.elements['notes'].value;
            var status_filter=fields.elements['status'].value;
        
            var paginator=$('#form89_body').paginator();
			
			var columns={data_store:'appointments',
                         count:paginator.page_size(),
                         start_index:paginator.get_index(),
			             access:{},
                         indexes:[{index:'id',value:fid},
                                   {index:'customer',value:customer_filter},
                                   {index:'schedule'},
                                   {index:'assignee',value:assignee_filter},
                                   {index:'status',value:status_filter},
                                   {index:'hours'},
                                   {index:'notes',value:notes_filter},
                                   {index:'source_name'}]};
           
            read_json_rows('form89',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
						rowsHTML+="<form id='form89_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Customer'>";
								rowsHTML+="<a onclick=\"show_object('customers','"+result.customer+"');\"><textarea readonly='readonly' form='form89_"+result.id+"'>"+result.customer+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Assignee'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form89_"+result.id+"' class='dblclick_editable' value='"+result.assignee+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Schedule'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form89_"+result.id+"' class='dblclick_editable'>"+get_my_datetime(result.schedule)+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Notes'>";
								rowsHTML+="<textarea readonly='readonly' form='form89_"+result.id+"' class='dblclick_editable'>"+result.notes+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Status'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form89_"+result.id+"' class='dblclick_editable' value='"+result.status+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' readonly='readonly' form='form89_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' form='form89_"+result.id+"' title='Save' name='save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' form='form89_"+result.id+"' title='Delete' onclick='form89_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";			
					rowsHTML+="</tr>";

					$('#form89_body').append(rowsHTML);
					var fields=document.getElementById("form89_"+result.id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form89_update_item(fields);
					});

					var name_filter=fields.elements[0];
					var assignee_filter=fields.elements[1];
					var schedule_filter=fields.elements[2];
					var status_filter=fields.elements[4];

					var staff_data={data_store:'staff',return_column:'acc_name'};
					set_my_value_list_json(staff_data,assignee_filter);
					set_static_value_list_json('appointments','status',status_filter);
                });

                paginator.update_index(results.length);
				
				initialize_tabular_report_buttons(columns,'Appointments','form89',function (item)
				{
					item['Schedule']=get_my_datetime(item.schedule);
					delete item.schedule;
					delete item.hours;
				});

				$('#form89').formcontrol();                
                hide_loader();
            });
            
        }
    }

	function form89_add_item()
	{
		if(is_create_access('form89'))
		{
			var id=get_new_key();
			var rowsHTML="<tr>";
			rowsHTML+="<form id='form89_"+id+"' autocomplete='off'></form>";
				rowsHTML+="<td data-th='Customer'>";
					rowsHTML+="<input type='text' required form='form89_"+id+"' value=''>";
					rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form89_add_customer_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Assignee'>";
					rowsHTML+="<input type='text' form='form89_"+id+"' value=''>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Schedule'>";
					rowsHTML+="<input type='text' required form='form89_"+id+"' value=''>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Notes'>";
					rowsHTML+="<textarea form='form89_"+id+"'></textarea>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Status'>";
					rowsHTML+="<input type='text' required form='form89_"+id+"' value='pending'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					rowsHTML+="<input type='hidden' form='form89_"+id+"' value='"+id+"'>";
					rowsHTML+="<button type='submit' class='btn green' form='form89_"+id+"' name='save'><i class='fa fa-save'></i></button>";
					rowsHTML+="<button type='button' class='btn red' form='form89_"+id+"' onclick='$(this).parent().parent().remove();' name='delete'><i class='fa fa-trash'></i></button>";	
				rowsHTML+="</td>";			
			rowsHTML+="</tr>";

			$('#form89_body').prepend(rowsHTML);

			var fields=document.getElementById("form89_"+id);
			var name_filter=fields.elements[0];
			var assignee_filter=fields.elements[1];
			var schedule_filter=fields.elements[2];
			var status_filter=fields.elements[4];

			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form89_create_item(fields);
			});

			var customer_data={data_store:'customers',return_column:'acc_name'};
			set_my_value_list_json(customer_data,name_filter,function () 
			{
				$(name_filter).focus();
			});

			var staff_data={data_store:'staff',return_column:'acc_name'};
			set_my_value_list_json(staff_data,assignee_filter);

			var add_customer=document.getElementById('form89_add_customer_'+id);
			$(add_customer).on('click',function()
			{
				modal11_action(function()
				{	
					set_my_value_list_json(customer_data,name_filter,function () 
					{
						$(name_filter).focus();
					});
				});
			});

			set_static_value_list_json('appointments','status',status_filter);
			$('#form89').formcontrol();
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form89_create_item(form)
	{
		if(is_create_access('form89'))
		{
			var name=form.elements[0].value;
			var assignee=form.elements[1].value;
			var schedule=get_raw_time(form.elements[2].value);
			var notes=form.elements[3].value;
			var status=form.elements[4].value;
			var data_id=form.elements[5].value;
			var last_updated=get_my_time();
			
			var data_json={data_store:'appointments',
 							data:[{index:'id',value:data_id},
								  {index:'customer',value:name},
								  {index:'assignee',value:assignee},
								  {index:'schedule',value:schedule},
								  {index:'status',value:status},
								  {index:'notes',value:notes},
                                 {index:'hours',value:1},
                                 {index:'last_updated',value:last_updated}]};
            create_json(data_json);
			
			$(form).readonly();
			
			var del_button=form.elements['delete'];
			del_button.removeAttribute("onclick");
			$(del_button).on('click',function(event)
			{
				form89_delete_item(del_button);
			});

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form89_update_item(form);
			});
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form89_update_item(form)
	{
		if(is_update_access('form89'))
		{
			var name=form.elements[0].value;
			var assignee=form.elements[1].value;
			var schedule=get_raw_time(form.elements[2].value);
			var notes=form.elements[3].value;
			var status=form.elements[4].value;
			var data_id=form.elements[5].value;
			var last_updated=get_my_time();
			var data_xml="<appointments>" +
						"<id>"+data_id+"</id>" +
						"<customer>"+name+"</customer>" +
						"<assignee>"+assignee+"</assignee>" +
						"<schedule>"+schedule+"</schedule>" +
						"<status>"+status+"</status>" +
						"<notes>"+notes+"</notes>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</appointments>";	
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>appointments</tablename>" +
						"<link_to>form89</link_to>" +
						"<title>Updated</title>" +
						"<notes>Appointment with "+name+" assigned to "+assignee+"</notes>" +
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

			var message_string=name+" appointment with "+assignee+" @"+form.elements[2].value+"\nNotes:"+result.notes;
			message_string=encodeURIComponent(message_string);
			$("#form89_whatsapp_"+data_id).attr('href',"whatsapp://send?text="+message_string);
			$("#form89_whatsapp_"+data_id).show();

			for(var i=0;i<5;i++)
			{
				$(form.elements[i]).attr('readonly','readonly');
			}
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form89_delete_item(button)
	{
		if(is_delete_access('form89'))
		{
			modal115_action(function()
			{
				var form_id=$(button).attr('form');
				var form=document.getElementById(form_id);

				var name=form.elements[0].value;
				var assignee=form.elements[1].value;
				var status=form.elements[4].value;
				var data_id=form.elements[5].value;
				var data_xml="<appointments>" +
							"<id>"+data_id+"</id>" +
							"<customer>"+name+"</customer>" +
							"<assignee>"+assignee+"</assignee>" +
							"<status>"+status+"</status>" +
							"</appointments>";	
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>appointments</tablename>" +
							"<link_to>form89</link_to>" +
							"<title>Deleted</title>" +
							"<notes>Appointment with "+name+" assigned to "+assignee+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				if(is_online())
				{
					server_delete_row(data_xml,activity_xml);
				}
				else
				{
					local_delete_row(data_xml,activity_xml);
				}	
				$(button).parent().parent().remove();
			});
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	function form89_import_template()
	{
		var data_array=['id','customer','schedule','status','assignee','hours','notes'];
		my_array_to_csv(data_array);
	};

	function form89_import(data_array,import_type)
	{
		var data_xml="<appointments>";
		var counter=1;
		var last_updated=get_my_time();
		data_array.forEach(function(row)
		{
			if((counter%500)===0)
			{
				data_xml+="</appointments><separator></separator><appointments>";
			}
					counter+=1;
			if(import_type=='create_new')
			{
				row.id=last_updated+counter;
			}

			data_xml+="<row>" +
					"<id>"+row.id+"</id>" +
					"<customer>"+row.customer+"</customer>" +
					"<schedule>"+row.schedule+"</schedule>" +
					"<status>"+row.status+"</status>" +
					"<assignee>"+row.assignee+"</assignee>" +
					"<hours>"+row.hours+"</hours>" +
					"<notes>"+row.notes+"</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</row>";
		});

		data_xml+="</appointments>";
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