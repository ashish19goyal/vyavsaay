<div class="profile-userpic">
	<div class="profile-usertitle">
        <div class="profile-usertitle-name"> <span class='text-uppercase' id='object_projects_detail_name'></span> </div>
        <div class="profile-usertitle-name" style='text-align:left;'> <span>Notes</span> <span class='label label-success' id='object_projects_detail_notes'></span> </div>
        <div class="profile-usertitle-name" style='text-align:left;'> <span>Expenses</span> <span class='label label-danger' id='object_projects_detail_expenses'></span> </div>
        <div class="profile-usertitle-name" style='text-align:left;'> <span>Hours Spent</span> <span class='label label-warning' id='object_projects_detail_hours'></span> </div>
        <div class="profile-usertitle-name" style='text-align:left;'> <span>Priority</span> <span class='label label-info' id='object_projects_detail_priority'></span> </div>
	</div>
	
	<script>
		function initialize_object_projects_detail(obj_name,obj_id)
		{
			var name=document.getElementById('object_projects_detail_name');
			var notes=document.getElementById('object_projects_detail_notes');
			var expenses=document.getElementById('object_projects_detail_expenses');
			var hours=document.getElementById('object_projects_detail_hours');
			var priority=document.getElementById('object_projects_detail_priority');
            
            name.innerHTML=obj_name;
            
            var detail_data={data_store:'projects',count:1,
                           indexes:[{index:'details'},{index:'priority'},{index:'name',exact:obj_name}]};
            read_json_rows('',detail_data,function(details)
            {
                notes.innerHTML=details[0].details;
                priority.innerHTML=details[0].priority;
            });
            
            var expense_data={data_store:'expenses',sum:'yes',return_column:'amount',
                             indexes:[{index:'source',exact:'project'},
                                     {index:'source_name',exact:obj_name},
                                     {index:'status',exact:'approved'}]};
            read_json_single_column(expense_data,function(results)
            {
                expenses.innerHTML=results[0];
            });

            var hours_data={data_store:'timesheet',sum:'yes',return_column:'hours_worked',
                             indexes:[{index:'source',exact:'project'},
                                     {index:'source_name',exact:obj_name}]};
            read_json_single_column(hours_data,function(results)
            {
                hours.innerHTML=results[0];
            });
		}
	</script>
</div>