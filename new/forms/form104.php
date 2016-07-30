<div id='form104' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
            <div class='btn-group' id='form104_view' data-toggle='buttons'>
                <label class='btn green-jungle cc active' onclick=form104_ini('calendar');><input name='cc' type='radio' class='toggle'>Calendar</label>
                <label class='btn green-jungle tt' onclick=form104_ini('table');><input type='radio' name='tt' class='toggle'>Table</label>
            </div>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal43_action();'>Add Task <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form104_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form104_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form104_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form104_upload' onclick=modal23_action(form104_import_template,form104_import,form104_import_validate);><i class='fa fa-upload'></i> Import</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
	   <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form104_header'></form>
						<th><input type='text' placeholder="Project" class='floatlabel' name='project' form='form104_header'></th>
						<th><input type='text' placeholder="Task" class='floatlabel' name='task' form='form104_header'></th>
						<th><input type='text' placeholder="Assignee" class='floatlabel' name='assignee' form='form104_header'></th>
						<th><input type='text' placeholder="Details" readonly="readonly" form='form104_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form104_header'></th>
						<th><input type='submit' form='form104_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form104_body'>
			</tbody>
		</table>

        <div class='row'>
            <div class="col-md-12 col-sm-12">
                <div id="form104_calendar" class="has-toolbar"></div>
            </div>
        </div>

    </div>

    <script>
    function form104_header_ini()
    {
        var fields=document.getElementById('form104_header');

        var project_filter=fields.elements['project'];
        var task_filter=fields.elements['task'];
        var assignee_filter=fields.elements['assignee'];
        var status_filter=fields.elements['status'];

        var project_data={data_store:'projects',return_column:'name'};
        set_my_value_list_json(project_data,project_filter);

        $(fields).off('submit');
        $(fields).on('submit',function (event)
        {
            event.preventDefault();
            form104_ini();
        });
        $("#form104_calendar").parent().parent().show();
    }

    function form104_ini(view)
    {
        var fid=$("#form104_link").attr('data_id');
        if(fid==null)
            fid="";
        show_loader();
        $('#form104_body').html("");
        $('#form104_calendar').fullCalendar('destroy');

        var view_filter='calendar';
        if(typeof view!='undefined' && view=='table')
        {
            view_filter='table';
            $('#form104_view').find('label.tt').addClass('active');
            $('#form104_view').find('label.cc').removeClass('active');
        }
        else
        {
            $('#form104_view').find('label.cc').addClass('active');
            $('#form104_view').find('label.tt').removeClass('active');
        }

        if(view_filter=='calendar')
        {
            $("#form104_body").parent().hide();
            $("#form104_calendar").parent().parent().show();

            $('#form104_calendar').fullCalendar(
            {
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'today'
                },
                editable: true,
                slotEventOverlap:true,
                events: function(start, end, timezone, callback)
                {
                    console.log('view5');
                    var start_time=parseFloat(start.unix())*1000;
                    var end_time=parseFloat(end.unix())*1000;
                    var tasks_data={data_store:'task_instances',
                                   access:'yes',
                                   indexes:[{index:'id',value:fid},
                                           {index:'name'},
                                           {index:'description'},
                                           {index:'t_due',lowerbound:start_time,upperbound:end_time},
                                           {index:'status'},
                                           {index:'assignee'},
                                            {index:'task_hours'},
                                           {index:'source',exact:'project'},
                                           {index:'source_name'}]};

                    read_json_rows('form104',tasks_data,function(tasks)
                    {
                        var events=[];
                        tasks.forEach(function(task)
                        {
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
                                id: task.id
                            });
                        });
                        callback(events);

                        initialize_tabular_report_buttons(tasks_data,'Project Tasks','form104',function (item)
                        {
                            item['Due Time']=get_my_datetime(item.t_due);
                            delete item.t_due;

                            delete item.task_hours;

                            item['Project']=(item.source_name);
                            delete item.source_name;
                            delete item.source;
                        });
                        hide_loader();
                    });
                },
                dayClick: function(date,jsEvent,view)
                {
                    modal43_action(get_my_date_from_iso(date.format()));
                },
                eventClick: function(calEvent,jsEvent,view)
                {
                    modal33_action(calEvent.id);
                },
                eventDrop: function(event,delta,revertFunc)
                {
                    var t_due=(parseFloat(event.end.unix())*1000);

                    var data_json={data_store:'task_instances',
 							data:[{index:'id',value:event.id},
                                 {index:'t_due',value:t_due},
                                 {index:'last_updated',value:get_my_time()}]};
                    update_json(data_json);
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
            setTimeout(function(){$('#form104 .fc-today-button').click()},1000);
        }
        else
        {
            $("#form104_body").parent().show();
            $("#form104_calendar").parent().parent().hide();
            var fields=document.getElementById('form104_header');
            var project_filter=fields.elements['project'].value;
            var task_filter=fields.elements['task'].value;
            var assignee_filter=fields.elements['assignee'].value;
            var status_filter=fields.elements['status'].value;

            var paginator=$('#form104_body').paginator();

            var columns={data_store:'task_instances',
                         count:paginator.page_size(),
                         start_index:paginator.get_index(),
			             access:'yes',
                         indexes:[{index:'id',value:fid},
                                   {index:'name',value:task_filter},
                                   {index:'description'},
                                   {index:'t_due'},
                                   {index:'status',value:status_filter},
                                   {index:'assignee',value:assignee_filter},
                                   {index:'task_hours'},
                                   {index:'source',exact:'project'},
                                   {index:'source_name',value:project_filter}]};

            read_json_rows('form104',columns,function(results)
            {
                results.forEach(function(result)
                {
                    result.t_due=get_my_datetime(result.t_due);
                    result.t_initiated=get_my_datetime(result.t_initiated);

                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form104_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Project'>";
                                rowsHTML+="<a onclick=\"show_object('projects','"+result.source_name+"');\"><input type='text' readonly='readonly' form='form104_"+result.id+"' name='project' value='"+result.source_name+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Task'>";
                                rowsHTML+="<textarea readonly='readonly' name='task' form='form104_"+result.id+"'>"+result.name+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Assignee'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form104_"+result.id+"' class='dblclick_editable' value='"+result.assignee+"' name='assignee'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Details'>";
                                rowsHTML+="<input type='text' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Due Date' form='form104_"+result.id+"' value='"+result.t_due+"' name='due'>";
                                rowsHTML+="<textarea type='text' readonly='readonly' class='floatlabel dblclick_editable' placeholder='Description' form='form104_"+result.id+"' name='description'>"+result.description+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Status'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form104_"+result.id+"' class='dblclick_editable' name='status' value='"+result.status+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' readonly='readonly' form='form104_"+result.id+"' value='"+result.id+"' name='id'>";
                                rowsHTML+="<button type='submit' class='btn green' name='save' form='form104_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
                                rowsHTML+="<button type='button' class='btn red' form='form104_"+result.id+"' title='Delete' name='delete' onclick='form104_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form104_body').append(rowsHTML);
                    var fields=document.getElementById("form104_"+result.id);
                    var date_filter=fields.elements[3];

                    $(date_filter).vdatetimepicker();

                    $(fields).on("submit", function(event)
                    {
                        event.preventDefault();
                        form104_update_item(fields);
                    });

                    var name_filter=fields.elements['task'];
                    var assignee_filter=fields.elements['assignee'];
                    var due_filter=fields.elements['due'];
                    var status_filter=fields.elements['status'];

                    var staff_data={data_store:'staff',return_column:'acc_name'};
                    set_my_value_list_json(staff_data,assignee_filter);

                    set_static_value_list_json('task_instances','status',status_filter);
                    $(due_filter).vdatetimepicker();
                });

				paginator.update_index(results.length);
				initialize_tabular_report_buttons(columns,'Project Tasks','form104',function (item)
                {
                    item['Due Time']=get_my_datetime(item.t_due);
                    delete item.t_due;

                    delete item.task_hours;

                    item['Project']=(item.source_name);
                    delete item.source_name;
                    delete item.source;
                });
				$('#form104').formcontrol();
                hide_loader();
            });
        }
    }

    function form104_update_item(form)
    {
        if(is_update_access('form104'))
        {
            var project=form.elements['project'].value;
            var task=form.elements['task'].value;
            var assignee=form.elements['assignee'].value;
            var due_time=get_raw_time(form.elements['due'].value);
            var desc=form.elements['description'].value;
            var status=form.elements['status'].value;
            var data_id=form.elements['id'].value;
            var last_updated=get_my_time();

            var data_json={data_store:'task_instances',
 							data:[{index:'id',value:data_id},
                                 {index:'name',value:task},
                                 {index:'source_name',value:project},
                                 {index:'assignee',value:assignee},
                                 {index:'description',value:desc},
                                 {index:'t_due',value:due_time},
                                 {index:'status',value:status},
                                 {index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Updated",notes:"Task "+task,link_to:"form104"}};
            update_json(data_json);
            $(form).readonly();
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form104_delete_item(button)
    {
        if(is_delete_access('form104'))
        {
            modal115_action(function()
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var data_id=form.elements['id'].value;
                var task=form.elements['task'].value;
                var last_updated=get_my_time();

                var data_json={data_store:'task_instances',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Task "+task,link_to:"form104"}};

                delete_json(data_json);
                $(button).parent().parent().remove();
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form104_import_template()
    {
        var data_array=['id','project','task','description','assignee','due time','estimated hours','status'];
        my_array_to_csv(data_array);
    };

    function form104_import_validate(data_array)
    {
        var validate_template_array=[{column:'project',required:'yes',regex:new RegExp('^[0-9a-zA-Z _#$!;.,()-]+$')},
                                {column:'task',requried:'yes',regex:new RegExp('^[0-9a-zA-Z _#$!;.,()-]+$')},
                                {column:'description',regex:new RegExp('^[0-9a-zA-Z _#$!;.,()-]+$')},
                                {column:'assignee',regex:new RegExp('^[0-9a-zA-Z _#$!;.,()-]+$')},
                                {column:'estimated hours',required:'yes',regex:new RegExp('^[0-9.]+$')},
                                {column:'status',required:'yes',list:["pending","completed","cancelled"]}];

        var error_array=vImport.validate(data_array,validate_template_array);
        return error_array;
    }

    function form104_import(data_array,import_type)
    {
        var data_json={data_store:'task_instances',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Tasks list',link_to:'form104'}};

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
                    {index:'source_name',value:row.project},
                    {index:'name',value:row.task},
                    {index:'description',value:row.description},
                    {index:'assignee',value:row.assignee},
                    {index:'status',value:row.status},
                    {index:'t_due',value:get_raw_time(row['due time'])},
                    {index:'t_initiated',value:get_raw_time()},
                    {index:'task_hours',value:row['estimated hours']},
                    {index:'source',value:'project'},
                    {index:'last_updated',value:last_updated}];

            data_json.data.push(data_json_array);
        });
    };

    </script>
</div>
