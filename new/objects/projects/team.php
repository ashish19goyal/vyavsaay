<div>
    <input type='hidden' id='object_projects_team_project_id'>
    <input type='hidden' id='object_projects_team_project_name'>
    <button type='button' onclick=object_projects_team_add(); class='btn btn-circle grey-cascade' title='Add member'>Add <i class='fa fa-plus'></i></button>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Person</th>
					<th>Role</th>
                    <th>Notes</th>
                    <th>Status</th>
                    <th></th>
                </tr>
			</thead>
			<tbody id='object_projects_team_body'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_projects_team(obj_name,obj_id)
		{
            var container=document.getElementById('object_projects_team_body');
            container.innerHTML="";

            var paginator=$('#object_projects_team_body').paginator(
                        {   page_size:5,
                            func:"initialize_object_projects_team('"+obj_name+"','"+obj_id+"');"});

			$('#object_projects_team_project_name').value=obj_name;
            var project_data={data_store:'projects',return_column:'id',indexes:[{index:'name',exact:obj_name}]};
            set_my_value_json(project_data,$('#object_projects_team_project_id'));

            var columns={data_store:'project_team',
                         count:paginator.page_size(),
                         start_index:paginator.get_index(),
                         indexes:[{index:'id'},
                                 {index:'project_name',exact:obj_name},
                                 {index:'member'},
                                 {index:'role'},
                                 {index:'notes'},
                                 {index:'status'}]};

            read_json_rows('',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var id=result.id;
					var rowsHTML="<tr>";
					rowsHTML+="<form id='object_projects_team_"+id+"'></form>";
						rowsHTML+="<td data-th='Member'>";
							rowsHTML+="<textarea readonly='readonly' form='object_projects_team_"+id+"'>"+result.member+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Role'>";
							rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='object_projects_team_"+id+"'>"+result.role+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Notes'>";
							rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='object_projects_team_"+id+"'>"+result.notes+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Status'>";
							rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='object_projects_team_"+id+"' value='"+result.status+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='object_projects_team_"+id+"' value='"+id+"'>";
							rowsHTML+="<button type`='submit' class='btn green' name='save' form='object_projects_team_"+id+"'><i class='fa fa-save'></i></button>";
							rowsHTML+="<button type='button' class='btn red' form='object_projects_team_"+id+"' id='delete_object_projects_team_"+id+"' name='delete' onclick='object_projects_team_delete($(this));'><i class='fa fa-trash'></i></button>";
						rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#object_projects_team_body').append(rowsHTML);
					var fields=document.getElementById("object_projects_team_"+id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						object_projects_team_update(fields);
					});
                });
                $('#object_projects_team_body').formcontrol();
                paginator.update_index(results.length);
            });
		}

        function object_projects_team_add()
        {
            if(is_create_access('projects'))
            {
                var id=vUtil.newKey();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='object_projects_team_"+id+"' autocomplete='off'></form>";
                    rowsHTML+="<td data-th='Member'>";
                        rowsHTML+="<input type='text' form='object_projects_team_"+id+"' required>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Role'>";
                        rowsHTML+="<textarea form='object_projects_team_"+id+"'></textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Notes'>";
                        rowsHTML+="<textarea form='object_projects_team_"+id+"'></textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Status'>";
                        rowsHTML+="<input type='text' form='object_projects_team_"+id+"' required value='active'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' form='object_projects_team_"+id+"' value='"+id+"'>";
                        rowsHTML+="<button type='submit' name='save' class='btn green' form='object_projects_team_"+id+"'><i class='fa fa-save'></i></button>";
                        rowsHTML+="<button type='button' name='delete' class='btn red' form='object_projects_team_"+id+"' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
                    rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#object_projects_team_body').prepend(rowsHTML);
                var fields=document.getElementById("object_projects_team_"+id);
                var member_filter=fields.elements[0];
                var status_filter=fields.elements[3];

                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    object_projects_team_create(fields);
                });

                var member_data={data_store:'staff',return_column:'acc_name'};
                set_my_value_list_json(member_data,member_filter,function ()
                {
                    $(member_filter).focus();
                });

                set_static_value_list('project_team','status',status_filter);
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function object_projects_team_create(form)
        {
            if(is_create_access('projects'))
            {
                var member=form.elements[0].value;
                var role=form.elements[1].value;
                var notes=form.elements[2].value;
                var status=form.elements[3].value;
                var data_id=form.elements[4].value;
                var last_updated=get_my_time();
                var obj_name=$('#object_projects_team_project_name').value;
                var obj_id=$('#object_projects_team_project_id').value;
                console.log(obj_name);
                console.log(obj_id);

                var data_json={data_store:'project_team',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'member',value:member,uniqueWith:['project_name']},
	 					{index:'role',value:role},
	 					{index:'notes',value:notes},
                        {index:'project_name',value:obj_name},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:member+' to project team for '+obj_name,link_to:'form220'}};

                var access_json={data_store:'object_access',
	 				data:[{index:'id',value:data_id},
	 					{index:'tablename',value:'projects'},
	 					{index:'record_id',value:obj_id},
	 					{index:'user_type',value:'user'},
                        {index:'user',value:member},
	 					{index:'last_updated',value:last_updated}]};

                create_json(data_json);
                create_json(access_json);

                $(form).readonly();

                var del_button=form.elements['delete'];
                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    object_projects_team_delete(del_button);
                });

                $(form).off('submit');
                $(form).on('submit',function(event)
                {
                    event.preventDefault();
                    object_projects_team_update(form);
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        };

        function object_projects_team_update(form)
        {
            if(is_update_access('projects'))
            {
                var member=form.elements[0].value;
                var role=form.elements[1].value;
                var notes=form.elements[2].value;
                var status=form.elements[3].value;
                var data_id=form.elements[4].value;
                var last_updated=get_my_time();

                var data_json={data_store:'project_team',
	 				data:[{index:'id',value:data_id},
	 					{index:'role',value:role},
	 					{index:'notes',value:notes},
                		{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}]};


                update_json(data_json);

                $(form).readonly();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function object_projects_team_delete(button)
        {
            if(is_delete_access('projects'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);
                    var member=form.elements[0].value;
                    var data_id=form.elements[4].value;
                    var obj_name=$('#object_projects_team_project_name').value;

                    var data_json={data_store:'project_team',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Removed",notes:member+" from project team of "+obj_name,link_to:"form220"}};

                    delete_json(data_json);
                    
                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

    </script>
</div>
