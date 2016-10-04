<div>
    <div class='scroller' style='height:250px;' data-rail-visible1="1">
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<tbody id='object_staff_roles'>
			</tbody>
		</table>
    </div>
	<script>
		function initialize_object_staff_roles(obj_name,obj_id)
		{
            var container=document.getElementById('object_staff_roles');
            container.innerHTML="";        
            var username_data={data_store:'accounts',return_column:'username',count:1,indexes:[{index:'acc_name',exact:obj_name}]};
            read_json_single_column(username_data,function(usernames)
            {
                if(usernames.length>0)
                {
        			var role_data={data_store:'user_role_mapping',return_column:'role_name',indexes:[{index:'username',exact:usernames[0]}]};
                    read_json_single_column(role_data,function(roles)
                    {
                        roles.forEach(function(role)
                        {
                            var rowsHTML="<tr>";
                                rowsHTML+="<td data-th='role'><b>";
                                    rowsHTML+=role;
                                rowsHTML+="</b></td>";
                            rowsHTML+="</tr>";
                            $(container).append(rowsHTML);
                        });
                    });
                }
            });
		}        
	</script>
</div>