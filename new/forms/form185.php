<div id='form185' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>
            <div class='btn-group' id='form185_view' data-toggle='buttons'>
                <label class='btn green-jungle cc active' onclick=form185_ini('calendar');><input name='cc' type='radio' class='toggle'>Calendar</label>
                <label class='btn green-jungle tt' onclick=form185_ini('table');><input type='radio' name='tt' class='toggle'>Table</label>
            </div>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal43_action();'>Add Task <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form185_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form185_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form185_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form185_upload' onclick=modal23_action(form185_import_template,form185_import,form185_import_validate);><i class='fa fa-upload'></i> Import</a>
                    </li>
                </ul>
            </div>
        </div>	
	</div>
	
	<div class="portlet-body">
	   <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form185_header'></form>
						<th><input type='text' placeholder="Task" class='floatlabel' name='task' form='form185_header'></th>
						<th><input type='text' placeholder="Details" readonly="readonly" form='form185_header'></th>
						<th><input type='text' placeholder="Assignee" class='floatlabel' name='assignee' form='form185_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form185_header'></th>
						<th><input type='submit' form='form185_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form185_body'>
			</tbody>
		</table>

        <div class='row'>
            <div class="col-md-12 col-sm-12">
                <div id="form185_calendar" class="has-toolbar"></div>
            </div>
        </div>

    </div>
    
    <script>
    function form185_header_ini()
    {
        var filter_fields=document.getElementById('form185_header');
        var task_filter=filter_fields.elements['task'];
        var assignee_filter=filter_fields.elements['assignee'];
        var status_filter=filter_fields.elements['status'];

        var assignee_data={data_store:'staff',return_column:'acc_name'};
        set_my_filter_json(assignee_data,assignee_filter);

        set_static_filter_json('task_instances','status',status_filter);

        $(filter_fields).off('submit');
        $(filter_fields).on('submit',function(event)
        {
            event.preventDefault();
            form185_ini();
        });
        
        $("#form185_calendar").parent().parent().show();        
    }

    function form185_ini(view)
    {
        var fid=$("#form185_link").attr('data_id');
        if(fid==null)
            fid="";
        show_loader();
        $('#form185_body').html("");
        $('#form185_calendar').fullCalendar('destroy');
            
        var view_filter='calendar';
        if(typeof view!='undefined' && view=='table')
        {
            view_filter='table';
            $('#form185_view').find('label.tt').addClass('active');
            $('#form185_view').find('label.cc').removeClass('active');
        }
        else
        {
            $('#form185_view').find('label.cc').addClass('active');
            $('#form185_view').find('label.tt').removeClass('active');
        }

        if(view_filter=='calendar')
        {
            $("#form185_body").parent().hide();
            $("#form185_calendar").parent().parent().show();
            
            $('#form185_calendar').fullCalendar({
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
                    var tasks_data={data_store:'task_instances',
                                   indexes:[{index:'id'},
                                           {index:'name'},
                                           {index:'description'},
                                           {index:'t_due',lowerbound:start_time,upperbound:end_time},
                                           {index:'status'},
                                           {index:'assignee'},
                                           {index:'task_hours'},
                                           {index:'source',exact:'business process'}]};
                    read_json_rows('form185',tasks_data,function(tasks)
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
                                title: task.name+"\nAssigned to: "+task.assignee,
                                start:get_iso_time(task.t_due-3600000*(parseFloat(task.task_hours))),
                                end:get_iso_time(task.t_due),
                                color: color,
                                id: task.id,
                            });
                        });
                        callback(events);
                        
                        initialize_tabular_report_buttons(tasks_data,'Manufacturing Tasks','form185',function (item)
                        {
                            item['Due Time']=get_my_datetime(item.t_due);
                            delete item.t_due;
                            delete item.task_hours;
                            delete item.source_name;
                            delete item.source;
                        });
                        hide_loader();
                    });
                },
                dayClick: function(date,jsEvent,view){
                    modal117_action(get_my_date_from_iso(date.format()));
                },
                eventClick: function(calEvent,jsEvent,view){
                    modal33_action(calEvent.id);
                },
                eventDrop: function(event,delta,revertFunc)
                {
                    //console.log(event);
                    var t_due=(parseFloat(event.end.unix())*1000);
                    var t_initiated=(parseFloat(event.start.unix())*1000);
                    
                    var data_json={data_store:'task_instances',
 							data:[{index:'id',value:event.id},
                                 {index:'t_due',value:t_due},
                                 {index:'last_updated',value:get_my_time()}]};
                    update_json(data_json);
                    
                    var prod_json={data_store:'production_plan_items',
 							data:[{index:'id',value:event.id},
                                 {index:'from_time',value:t_initiated},
                                 {index:'to_time',value:t_due},
                                 {index:'last_updated',value:get_my_time()}]};
                    update_json(prod_json);
                    
                    var store_movement_xml={data_store:'store_movement',
                                           indexes:[{index:'id'},
                                                   {index:'record_source',exact:'production_plan_item'},
                                                   {index:'source_id',exact:event.id}]};
                    read_json_rows('',store_movement_xml,function (movs) 
                    {
                        movs.forEach(function (mov) 
                        {
                            var mov_json={data_store:'store_movement',
 							data:[{index:'id',value:mov.id},
                                 {index:'applicable_from',value:t_initiated},
                                 {index:'last_updated',value:get_my_time()}]};
                            update_json(mov_json);                    
                        });
                    });		
                },
                eventResize: function(event, delta, revertFunc)
                {
                    var task_hours=parseFloat((parseFloat(event.end.unix())-parseFloat(event.start.unix()))/3600);
                    var data_json={data_store:'task_instances',
 							data:[{index:'id',value:event.id},
                                 {index:'task_hours',value:task_hours},
                                 {index:'last_updated',value:get_my_time()}]};
                    update_json(data_json);
                }
            });
            setTimeout(function(){$('#form185 .fc-today-button').click()},1000);    
        }
        else
        {   
            $("#form185_body").parent().show();
            $("#form185_calendar").parent().parent().hide();
            
            var fields=document.getElementById('form185_header');
            var task_filter=fields.elements['task'].value;
            var assignee_filter=fields.elements['assignee'].value;
            var status_filter=fields.elements['status'].value;
        
            var paginator=$('#form185_body').paginator();
			
            var columns={data_store:'task_instances',
                         count:paginator.page_size(),
                         start_index:paginator.get_index(),
			             access:{},
                         indexes:[{index:'id',value:fid},
                                   {index:'name',value:task_filter},
                                   {index:'description'},
                                   {index:'t_due'},
                                   {index:'status',value:status_filter},
                                   {index:'assignee',value:assignee_filter},
                                   {index:'task_hours'},
                                   {index:'source',exact:'business process'},
                                   {index:'source_name'}]};
           
            read_json_rows('form185',columns,function(results)
            {
                results.forEach(function(result)
                {
                    result.t_due=get_my_datetime(result.t_due);
                    result.t_initiated=get_my_datetime(result.t_initiated);
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form185_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Task'>";
                                rowsHTML+="<textarea readonly='readonly' form='form185_"+result.id+"'>"+result.name+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Details'>";
                                rowsHTML+="<input type='text' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Due Date' form='form185_"+result.id+"' value='"+result.t_due+"' name='due'>";
                                rowsHTML+="<textarea type='text' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Description' form='form185_"+result.id+"' name='description'>"+result.description+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Assignee'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form185_"+result.id+"' class='dblclick_editable' value='"+result.assignee+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Status'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form185_"+result.id+"' class='dblclick_editable' value='"+result.status+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' readonly='readonly' name='id' form='form185_"+result.id+"' value='"+result.id+"'>";
                                rowsHTML+="<button type='submit' class='btn green' name='save' form='form185_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
                                rowsHTML+="<button type='button' class='btn red' form='form185_"+result.id+"' title='Delete' name='delete' onclick='form185_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";			
                    rowsHTML+="</tr>";

                    $('#form185_body').append(rowsHTML);
                    var fields=document.getElementById("form185_"+result.id);
                    $(fields).on("submit", function(event)
                    {
                        event.preventDefault();
                        form185_update_item(fields);
                    });

                    var name_filter=fields.elements[0];
                    var assignee_filter=fields.elements[3];
                    var due_filter=fields.elements[1];
                    var status_filter=fields.elements[4];

                    var staff_data={data_store:'staff',return_column:'acc_name'};
                    set_my_value_list_json(staff_data,assignee_filter);
                    set_static_value_list_json('task_instances','status',status_filter);
                    $(due_filter).vdatetimepicker();
                });

                paginator.update_index(results.length);
				initialize_tabular_report_buttons(columns,'Manufacturing Tasks','form185',function (item)
                {
                    item['Due Time']=get_my_datetime(item.t_due);
                    delete item.t_due;
                    
                    delete item.task_hours;                    
                    delete item.source_name;
                    delete item.source;
                });
				$('#form185').formcontrol();
                
                hide_loader();
            });
            
        }
    }

    function form185_delete_item(button)
    {
        if(is_delete_access('form185'))
        {
            modal115_action(function()
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var name=form.elements[0].value;
                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();
                var data_json={data_store:'task_instances',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Task "+name,link_to:"form185"}};
			
                delete_json(data_json);

                $(button).parent().parent().remove();
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form185_update_item(form)
    {
        if(is_update_access('form185'))
        {
            var name=fields.elements[0].value;
            var due=get_raw_time(fields.elements[1].value);
            var details=fields.elements[2].value;
            var assignee=fields.elements[3].value;
            var status=fields.elements[4].value;
            var data_id=form.elements['id'].value;
            var last_updated=get_my_time();
            
            var data_json={data_store:'task_instances',
 							data:[{index:'id',value:data_id},
                                 {index:'name',value:name},
                                 {index:'assignee',value:assignee},
                                 {index:'description',value:details},
                                 {index:'t_due',value:due},
                                 {index:'status',value:status},
                                 {index:'last_updated',value:last_updated}]};			

            var prod_json={data_store:'production_plan_items',
 							data:[{index:'id',value:data_id},
                                 {index:'to_time',value:due},
                                 {index:'status',value:status},
                                 {index:'last_updated',value:last_updated}]};			

            update_json(data_json);
            update_json(prod_json);

            var store_movement_xml={data_store:'store_movement',
                                   indexes:[{index:'id'},
                                           {index:'record_source',exact:'production_plan_items'},
                                           {index:'source_id',exact:data_id}]};
            read_json_rows('',store_movement_xml,function (movs) 
            {
                movs.forEach(function (mov) 
                {
                    var mov_json={data_store:'store_movement',
 							data:[{index:'id',value:mov.id},
                                 {index:'applicable_from',value:due},
                                 {index:'last_updated',value:get_my_time()}]};
                    update_json(mov_json);    
                });
            });					

            $(form).readonly();
        }
        else
        {
            $("#modal2_link").click();
        }
    }
    </script>
</div>