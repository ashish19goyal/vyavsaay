<div>
    <div class='row'>
        <div class="col-md-12 col-sm-12">
            <div id="object_projects_tasks_calendar" class="has-toolbar"></div>
        </div>
    </div>
	<script>
		function initialize_object_projects_tasks(obj_name,obj_id)
		{
            $('#object_projects_tasks_calendar').fullCalendar('destroy');
            $('#object_projects_tasks_calendar').fullCalendar(
            {
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'today'
                },
                slotEventOverlap:true,
                events: function(start, end, timezone, callback)
                {
                    var start_time=parseFloat(start.unix())*1000;
                    var end_time=parseFloat(end.unix())*1000;
                    var tasks_data={data_store:'task_instances',
                                    access:'yes',
                                   indexes:[{index:'id'},
                                           {index:'name'},
                                           {index:'description'},
                                           {index:'t_due',lowerbound:start_time,upperbound:end_time},
                                           {index:'status'},
                                           {index:'assignee'},
                                            {index:'task_hours'},
                                           {index:'source',exact:'project'},
                                           {index:'source_name',exact:obj_name}]};

                    read_json_rows('',tasks_data,function(tasks)
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
                                color: color
                            });
                        });
                        callback(events);
                    });
                }
            });
            setTimeout(function(){$('#object_projects_tasks_calendar .fc-today-button').click()},1000);
		}

	</script>
</div>
