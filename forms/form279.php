<div id='form279' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
            <div class='btn-group' id='form279_status' data-toggle='buttons' data-value='pending'>
                <label class='btn green-jungle open active' onclick=form279_ini('open');><input name='open' type='radio' class='toggle'>Open</label>
				<label class='btn green-jungle closed' onclick=form279_ini('closed');><input name='closed' type='radio' class='toggle'>Closed</label>
            </div>
		</div>
		<div class="actions">
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form279_add_list_popup();'>Add List <i class='fa fa-plus'></i></a>
		</div>
	</div>

	<div class="portlet-body">
	   <form id='form279_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="List" class='floatlabel' name='list'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
		<br>

        <div id='form279_body' class='row'>
        </div>

		<div class='modal_forms'>
			<a href='#form279_add_task' data-toggle="modal" id='form279_add_task_link'></a>
			<div id="form279_add_task" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<form id='form279_add_task_form' autocomplete="off">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
								<h4 class="modal-title">Add Task</h4>
							</div>
							<div class="modal-body">
							   <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
									<div class="row">
										<div class="col-sm-12 col-md-4">List Name</div>
										<div class="col-sm-12 col-md-8"><input type='text' form='form279_add_task_form' required name='list'></div>
										</div>
								   <div class="row">
										<div class="col-sm-12 col-md-4">Task</div>
										<div class="col-sm-12 col-md-8"><input type='text' form='form279_add_task_form' name='task' required></div>
								   </div>
								  <div class="row">
										<div class="col-sm-12 col-md-4">Notes</div>
									  <div class="col-sm-12 col-md-8"><textarea form='form279_add_task_form' name='desc'></textarea></div>
								   </div>
								  <div class="row">
										<div class="col-sm-12 col-md-4">Assignee</div>
									  <div class="col-sm-12 col-md-8"><input type='text' form='form279_add_task_form' name='assignee'></div>
								   </div>
							   </div>
							 </div>
							<div class="modal-footer">
							<button type="submit" class="btn green" form='form279_add_task_form' name='save'>Add</button>
							<button type="button" class="btn red" form='form279_add_task_form' data-dismiss='modal' name='cancel'>Cancel</button>
							</div>
						</form>
					</div>
				</div>
			</div>

			<a href='#form279_add_list' data-toggle="modal" id='form279_add_list_link'></a>
			<div id="form279_add_list" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<form id='form279_add_list_form' autocomplete="off">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
								<h4 class="modal-title">Add Task List</h4>
							</div>
							<div class="modal-body">
							   <div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
									<div class="row">
										<div class="col-sm-12 col-md-4">List Name</div>
										<div class="col-sm-12 col-md-8"><input type='text' form='form279_add_list_form' required name='list'></div>
										</div>
								   <div class="row">
										<div class="col-sm-12 col-md-4">Color</div>
										<div class="col-sm-12 col-md-8"><input type='text' form='form279_add_list_form' name='color' required></div>
								   </div>
							   </div>
							 </div>
							<div class="modal-footer">
							<button type="submit" class="btn green" form='form279_add_list_form' name='save'>Add</button>
							<button type="button" class="btn red" form='form279_add_list_form' data-dismiss='modal' name='cancel'>Cancel</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

    </div>

	<script>

		function form279_header_ini()
		{
			var form=document.getElementById('form279_header');
			var list_filter=form.elements['list'];

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form279_ini();
			});

			var list_data={data_store:'task_lists',return_column:'name'};
			set_my_filter_json(list_data,list_filter);
	  	}

		function form279_ini(task_types)
		{
			var fid=$("#form279_link").attr('data_id');
			if(fid==null)
				fid="";

			var status_filter='open';
			if(typeof task_types!='undefined' && task_types=='closed')
			{
			  status_filter='closed';
			  $('#form279_status').data('value','closed');
			  $('#form279_status').find('label.closed').addClass('active');
			  $('#form279_status').find('label.open').removeClass('active');
			}
			else
			{
			  $('#form279_status').data('value','open');
			  $('#form279_status').find('label.open').addClass('active');
			  $('#form279_status').find('label.closed').removeClass('active');
			}

			var form=document.getElementById('form279_header');
			var list_filter=form.elements['list'].value;

			show_loader();
			$('#form279_body').html('');

			var paginator=$('#form279_body').paginator({
				func:"form279_ini($('#form279_status').data('value'))",
				page_size:5
			});

			var list_columns = {count:paginator.page_size(),
						start_index:paginator.get_index(),
						data_store:'task_lists',
						indexes:[{index:'id',value:fid},
								{index:'name',value:list_filter},
								{index:'color'},
								{index:'sort_order',sort:"asc"},
                                {index:'type',exact:'to_do'},
								{index:'status',exact:status_filter}]};
			read_json_rows('form279',list_columns,function(lists)
			{
				lists.forEach(function(list_item)
				{
					var list_html="<div class='col-sm-4' style='padding-bottom:10px;'>"+
								"<div class='mt-element-list'>"+
									"<div class='mt-list-head list-todo "+list_item.color+"'>"+
										"<div class='list-head-title-container'>"+
											"<a id='form279_task_list_"+list_item.id+"' class='list-toggle-container' data-toggle='collapse' href='#form279_lists_heading_"+list_item.id+"' aria-expanded='false'>"+
												"<h3 class='list-title uppercase'>"+list_item.name+"</h3>"+
											"</a>"+
										"</div>"+
										"<a title='Delete List' onclick=\"form279_delete_list('"+list_item.id+"','"+list_item.name+"',this);\"><i class='fa fa-close pending'></i></a>"+
										"<a title='Add Task' onclick=\"form279_add_task_popup('"+list_item.id+"','"+list_item.name+"');\"><i class='fa fa-plus pending'></i>"+
										"</a>"+
									"</div>"+
									"<div class='task-list panel-collapse collapse in' id='form279_lists_heading_"+list_item.id+"' area-expanded='false'>"+
										"<ul id='form279_lists_"+list_item.id+"' class='v_task_list'></ul>"+
									"</div>"+
								"</div>"+
							"</div>"+
						"</div>";

					$('#form279_body').append(list_html);
					$("#form279_task_list_"+list_item.id).on('click',function(){
						form279_get_tasks(list_item.id,list_item.name);
					});
				});

				$('#form279').formcontrol();
				paginator.update_index(lists.length);
				hide_loader();
			});
		}

		function form279_get_tasks(listid,listname)
		{
			if($('#form279_lists_'+listid).html()=="")
			{
				show_loader();
				var columns={data_store:'task_instances',
							indexes:[{index:'id'},
									{index:'name'},
									{index:'description'},
									{index:'t_initiated'},
									{index:'t_due'},
									{index:'sort_order',sort:'asc'},
									{index:'inputs'},
									{index:'outputs'},
									{index:'list',exact:listname},
									{index:'status',exact:'open'},
	                                {index:'assignee'}]};
				read_json_rows('form279',columns,function(results)
				{
					results.forEach(function(result)
					{
						var rowsHTML="<li class='task-list-item done'>"+
	                                    "<div class='task-status'>";
	                        if(result.status=='open')
	                        {
	                            rowsHTML+="<a class='done' onclick=form279_close_item('"+result.id+"',this); title='Close'>"+
	                                        "<i class='fa fa-check'></i>"+
	                                    "</a>";
	                        }
							else
							{
								rowsHTML+="<a class='done' onclick=form279_reopen_item('"+result.id+"',this); title='Re-open'>"+
	                                        "<i class='fa fa-reply'></i>"+
	                                    "</a>";
							}
	                        rowsHTML+="<a class='pending' title='Delete' onclick=form279_delete_item('"+result.id+"',this);>"+
	                            			"<i class='fa fa-close link'></i>"+
	                                    "</a>"+
										"<a class='done' title='"+result.assignee+"'>"+
 		   	                            			"<i class='fa fa-user link'></i>"+
 		   	                            "</a>"+
 		   	                            "</div>"+
	                                    "<div class='task-content'>"+
	                                        "<h4 class='lowercase'>"+
	                                            "<a onclick=\"form279_modify_task(modal202_action('"+result.id+"');\">"+result.name+"</a>"+
	                                        "</h4>"+
	                                        "<p>"+result.description+"</p>"+
	                                    "</div>"+
	                                "</li>";

						$('#form279_lists_'+listid).append(rowsHTML);
	                });
					hide_loader();
					$('#form279_task_list_'+list_item.id).trigger('click');
				});
			}
		};

		function form279_reopen_item(id,button)
		{
			if(is_update_access('form279'))
			{
				var last_updated=get_my_time();
				var data_json={data_store:'task_instances',
	 				data:[{index:'id',value:id},
	 					{index:'status',value:'open'},
	 					{index:'last_updated',value:last_updated}]};
 				update_json(data_json);
                $(button).parent().parent().remove();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form279_close_item(id,button)
		{
			if(is_update_access('form279'))
			{
				var last_updated=get_my_time();
				var data_json={data_store:'task_instances',
	 				data:[{index:'id',value:id},
	 					{index:'status',value:'closed'},
	 					{index:'last_updated',value:last_updated}]};
 				update_json(data_json);
                $(button).parent().parent().remove();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form279_delete_item(id,button)
		{
			if(is_delete_access('form279'))
			{
				modal115_action(function()
				{
					var data_json={data_store:'task_instances',
 							data:[{index:'id',value:id}]};
					delete_json(data_json);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form279_delete_list(id,name,button)
		{
			if(is_delete_access('form279'))
			{
				modal115_action(function()
				{
					var data_json={data_store:'task_instances',
							data:[{index:'list',exact:name}]};
					delete_json(data_json);

					var list_json={data_store:'task_lists',
							data:[{index:'id',exact:id}]};
					delete_json(list_json);

					$(button).parent().parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form279_add_list_popup()
		{
			var form=document.getElementById('form279_add_list_form');
			var name_filter=form.elements['list'];
			var color_filter=form.elements['color'];

			name_filter.value="";
			color_filter.value="";
			$(name_filter).focus();

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				var name=name_filter.value;
				var color=color_filter.value;
				var last_updated=get_my_time();

				var data_json={data_store:'task_lists',
							   log:'yes',
							   data:[{index:'id',value:vUtil.newKey()},
								{index:'name',value:name},
								{index:'color',value:color},
								{index:'type',value:'to_do'},
								{index:'status',value:'open'},
								{index:'sort_order',value:'100'},
								{index:'last_updated',value:last_updated}],
						   log_data:{title:'Added',notes:'New Task list '+name,link_to:'form279'}};
				create_json(data_json);

				$(form).find('.close').click();
			});
			$('#form279_add_list').formcontrol();
			$("#form279_add_list_link").click();
		}

		function form279_add_task_popup(list_id,list_name)
		{
			var form=document.getElementById('form279_add_task_form');
		    var list_filter=form.elements['list'];
		    var task_filter=form.elements['task'];
		    var desc_filter=form.elements['desc'];
		    var staff_filter=form.elements['assignee'];

		    list_filter.value="";
		    task_filter.value="";
		    desc_filter.value="";
		    staff_filter.value="";
		    $(list_filter).focus();
		    if(typeof list_name!='undefined' && list_name!="")
		    {
		        list_filter.value=list_name;
		        list_filter.setAttribute('readonly','readonly');
		        $(task_filter).focus();
		    }

		    var assignee_data={data_store:'staff',return_column:'acc_name'};
		    set_my_value_list_json(assignee_data,staff_filter);

		    $(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
		        var task=task_filter.value;
		        var desc=desc_filter.value;
		        var staff=staff_filter.value;
		        var last_updated=get_my_time();

				var data_json={data_store:'task_instances',
		                       log:'yes',
			                   data:[{index:'id',value:vUtil.newKey()},
			 					{index:'name',value:task},
		                        {index:'source_id',value:list_id},
		                        {index:'source',value:'to_do'},
		                        {index:'description',value:desc},
		                        {index:'assignee',value:staff},
		                        {index:'status',value:'pending'},
			 					{index:'last_updated',value:last_updated}],
			 			   log_data:{title:'Added',notes:'Task to list '+list_name,link_to:'form279'}};
		        create_json(data_json);

		        $(form).find('.close').click();
			});
			$('#form279_add_task').formcontrol();
			$("#form279_add_task_link").click();
		}

	</script>
</div>
