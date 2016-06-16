<div id='form189' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form189_print_schedule();' title="Print Today's Schedule">Print Schedule <i class='fa fa-print'></i></a>
        </div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form189_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form189_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form189_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form189_header'></form>
						<th><input type='text' placeholder="Plan Name" class='floatlabel' name='name' form='form189_header'></th>
						<th><input type='text' placeholder="Details" class='floatlabel' name='desc' form='form189_header'></th>
						<th><input type='text' placeholder="Schedule" readonly='readonly' form='form189_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form189_header'></th>
						<th><input type='submit' form='form189_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form189_body'>
			</tbody>
		</table>
	</div>

    <script>
    function form189_header_ini()
    {
        var filter_fields=document.getElementById('form189_header');
        var name_filter=filter_fields.elements['name'];
        var status_filter=filter_fields.elements['status'];

        var name_data={data_store:'production_plan',return_column:'name'};
        set_my_filter_json(name_data,name_filter);
        set_static_filter_json('production_plan','status',status_filter);

        $(filter_fields).off('submit');
        $(filter_fields).on('submit',function(event)
        {
            event.preventDefault();
            form189_ini();
        });
    };

    function form189_ini()
    {
        show_loader();
        var fid=$("#form189_link").attr('data_id');
        if(fid==null)
            fid="";

        $('#form189_body').html("");

        var filter_fields=document.getElementById('form189_header');
        var fname=filter_fields.elements['name'].value;
        var fdesc=filter_fields.elements['desc'].value;
        var fstatus=filter_fields.elements['status'].value;

        var paginator=$('#form189_body').paginator();

        var columns={data_store:'production_plan',
			         count:paginator.page_size(),
			         start_index:paginator.get_index(),
			         indexes:[{index:'id',value:fid},
                                {index:'name',value:fname},
                                {index:'details',value:fdesc},
                                {index:'from_time'},
                                {index:'to_time'},
                                {index:'status',value:fstatus}]};

        read_json_rows('form189',columns,function(results)
        {
            results.forEach(function(result)
            {
                var rowsHTML="<tr>";
                    rowsHTML+="<form id='form189_"+result.id+"'></form>";
                        rowsHTML+="<td data-th='Plan'>";
                            rowsHTML+="<a onclick=\"element_display('"+result.id+"','form186');\"><input type='text' readonly='readonly' form='form189_"+result.id+"' value='"+result.name+"'></a>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Details'>";
                            rowsHTML+="<textarea readonly='readonly' form='form189_"+result.id+"'>"+result.details+"</textarea>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Schedule'>";
                            rowsHTML+="<input type='text' class='floatlabel' placeholder='From' readonly='readonly' form='form189_"+result.id+"' value='"+get_my_past_date(result.from_time)+"'>";
                            rowsHTML+="<input type='text' class='floatlabel' placeholder='To' readonly='readonly' form='form189_"+result.id+"' value='"+get_my_past_date(result.to_time)+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Status'>";
                            rowsHTML+="<input type='text' readonly='readonly' name='status' form='form189_"+result.id+"' value='"+result.status+"' required>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' name='id' form='form189_"+result.id+"' value='"+result.id+"'>";
							if(result.status=='draft')
							{
								rowsHTML+="<button type='button' name='approve' class='btn green' form='form189_"+result.id+"' title='Approve'><i class='fa fa-check'></i></button>";
								rowsHTML+="<button type='button' name='reject' class='btn grey' form='form189_"+result.id+"' title='Reject'><i class='fa fa-times'></i></button>";
							}
                            rowsHTML+="<button type='button' class='btn red' form='form189_"+result.id+"' title='Delete' onclick='form189_delete_item($(this))'><i class='fa fa-trash'></i></button>";
                        rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form189_body').append(rowsHTML);

                var fields=document.getElementById("form189_"+result.id);
                var status_filter=fields.elements[4];
				var approve_button=fields.elements['approve'];
				var reject_button=fields.elements['reject'];

				$(approve_button).on('click',function()
				{
					form189_approve_item(fields);
				});

				$(reject_button).on('click',function()
				{
					form189_reject_item(fields);
				});

                set_static_value_list('production_plan','status',status_filter);
                $(fields).on("submit",function(event)
                {
                    event.preventDefault();
                    form189_update_item(fields);
                });
            });

            $('#form189').formcontrol();
			paginator.update_index(results.length);
			initialize_tabular_report_buttons(columns,'Production Plans','form189',function (item)
            {
                item['Start Date']=get_my_past_date(item.from_time);
                item['End Date']=get_my_past_date(item.to_time);
                delete item.from_time;
                delete item.to_time;
            });
            hide_loader();
        });
    };

    function form189_delete_item(button)
    {
        if(is_delete_access('form189'))
        {
            modal115_action(function()
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var data_id=form.elements['id'].value;

                var data_json={data_store:'production_plan',
 							data:[{index:'id',value:data_id}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:name+" production plan",link_to:"form189"}};

                delete_json(data_json);

                var items_json={data_store:'production_plan_items',return_column:'id',
 							    indexes:[{index:'plan_id',exact:data_id}]};
			    read_json_single_column(items_json,function (items)
                {
                    var item_json={data_store:'production_plan_items',
 							data:[{index:'plan_id',value:data_id}]};
                    delete_json(item_json);

                    items.forEach(function (item)
                    {
                        var task_json={data_store:'task_instances',
 							data:[{index:'source_id',value:item}]};
                        delete_json(task_json);

						var batch_raw_json={data_store:'batch_raw_material',
			 				data:[{index:'production_id',value:item}]};

						delete_json(batch_raw_json);

			 		    var move_json={data_store:'store_movement',
			 				data:[{index:'source_id',value:item},
		                         {index:'record_source',value:'production_plan_item'}]};
						delete_json(move_json);
                    });
                });

                $(button).parent().parent().remove();
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

	function form189_reject_item(form)
    {
        if(is_update_access('form189'))
        {
            var data_id=form.elements['id'].value;
			var name=form.elements[0].value;

            var data_json={data_store:'production_plan',
							data:[{index:'id',value:data_id},
								{index:'status',value:'rejected'}],
							log:'yes',
							log_data:{title:"Rejected",notes:name+" production plan",link_to:"form189"}};

            update_json(data_json);

			var items_json={data_store:'production_plan_items',return_column:'id',
							indexes:[{index:'plan_id',exact:data_id}]};
			read_json_single_column(items_json,function (items)
			{
				items.forEach(function(item)
				{
					var item_json={data_store:'production_plan_items',
							data:[{index:'id',value:item},
								{index:'status',value:'cancelled'}]};
					update_json(item_json);
				});
			});

			var status_filter=form.elements['status'];
			var approve_button=form.elements['approve'];
			var reject_button=form.elements['reject'];
			status_filter.value='rejected';
			$(approve_button).hide();
			$(reject_button).hide();
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form189_approve_item(form)
    {
        if(is_update_access('form189'))
        {
			var data_id=form.elements['id'].value;
			var name=form.elements[0].value;

			var data_json={data_store:'production_plan',
							data:[{index:'id',value:data_id},
								{index:'status',value:'approved'}],
							log:'yes',
							log_data:{title:"Approved",notes:name+" production plan",link_to:"form189"}};

            update_json(data_json);

			var items_json={data_store:'production_plan_items',
							indexes:[{index:'id'},
									{index:'from_time'},
									{index:'to_time'},
									{index:'item'},
									{index:'quantity'},
									{index:'plan_id',exact:data_id}]};
			read_json_rows('form189',items_json,function (items)
			{
				var last_updated=vTime.unix();
				items.forEach(function (item)
				{
					var task_hours=(parseFloat(item.to_time)-parseFloat(item.from_time))/86400000;
					var task_json={data_store:'task_instances',
								data:[{index:'id',value:item.id},
									{index:'name',value:item.item+"("+item.quantity+" pieces)"},
									{index:'description',value:'Plan: '+name},
									{index:'assignee',value:''},
									{index:'t_due',value:item.to_time},
									{index:'t_initiated',value:item.from_time},
									{index:'task_hours',value:task_hours},
									{index:'status',value:'pending'},
									{index:'source',value:'manufacturing'},
									{index:'source_id',value:item.id},
									{index:'last_updated',value:last_updated}]};
					create_json(task_json);

					///update logic to schedule store movement

				});
			});

			var status_filter=form.elements['status'];
			var approve_button=form.elements['approve'];
			var reject_button=form.elements['reject'];
			status_filter.value='approved';
			$(approve_button).hide();
			$(reject_button).hide();
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form189_print_schedule()
    {
        var form_id='form186';

        ////////////setting up containers///////////////////////
        var container=document.createElement('div');
        var header=document.createElement('div');
            var logo=document.createElement('div');
            var business_title=document.createElement('div');

        var plan_line=document.createElement('div');

        var table_container=document.createElement('div');

        var footer=document.createElement('div');

        ////////////setting styles for containers/////////////////////////

        header.setAttribute('style','width:100%;min-height:100px;');
        plan_line.setAttribute('style','width:100%;min-height:40px;');
        footer.setAttribute('style','width:100%;min-height:50px;');

        ///////////////getting the content////////////////////////////////////////

        var bt=get_session_var('title');
        var logo_image=get_session_var('logo');
        var business_intro_text=get_session_var('business_intro');
        var business_address=get_session_var('address');
        var business_phone=get_session_var('phone');
        var business_email=get_session_var('email');
        var business_website=get_session_var('website');

        ////////////////filling in the content into the containers//////////////////////////

        logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
        plan_line.innerHTML="<div>Today's Schedule: "+vTime.date()+"</div>";
        footer.innerHTML=business_address+"<br>Phone: "+business_phone+", Email: "+business_email+", Website: "+business_website;

        var plan_items_column={data_store:'production_plan_items',
                                  indexes:[{index:'id'},
                                          {index:'item'},
                                          {index:'batch'},
                                          {index:'order_no'},
                                          {index:'quantity'},
										  {index:'produced_quantity'},
                                          {index:'production_line'},
                                          {index:'brand'},
                                          {index:'status'},
                                          {index:'from_time',lowerbound:get_raw_time(vTime.date()),upperbound:get_raw_time(vTime.date())+86400000},
                                          {index:'to_time'}]};
        read_json_rows('',plan_items_column,function(plan_items)
        {
            show_loader();
            var table_copy=document.createElement('table');
            table_copy.setAttribute('style','min-height:300px;width:100%');
            var th_elem="<tr>"+
                            "<th style='border:2px solid black;text-align:left;'>Order No</th>"+
                            "<th style='border:2px solid black;text-align:left;'>Item</th>"+
                            "<th style='border:2px solid black;text-align:left;'>Line</th>"+
                            "<th style='border:2px solid black;text-align:left;'>Quantity</th>"+
							"<th style='border:2px solid black;text-align:left;'>Schedule</th>"+
                            "<th style='border:2px solid black;text-align:left;'>Status</th>"+
                        "</tr>";
            $(table_copy).append(th_elem);

            plan_items.forEach(function(plan_item)
            {
                var td_elem="<tr>"+
                                "<td style='border:2px solid black;text-align:left;'>"+plan_item.order_no+"</td>"+
                                "<td style='border:2px solid black;text-align:left;'>Item: "+plan_item.item+"<br>Brand: "+plan_item.brand+"</td>"+
                                "<td style='border:2px solid black;text-align:left;'>"+plan_item.production_line+"</td>"+
                                "<td style='border:2px solid black;text-align:left;'>Scheduled: "+plan_item.quantity+"<br>Produced: "+plan_item.produced_quantity+"</td>"+
								"<td style='border:2px solid black;text-align:left;'>From: "+get_my_datetime(plan_item.from_time)+"<br>To: "+get_my_datetime(plan_item.to_time)+"</td>"+
                                "<td style='border:2px solid black;text-align:left;'>"+plan_item.status+"</td>"+
                            "</tr>";

                $(table_copy).append(td_elem);
                /////////////placing the containers //////////////////////////////////////////////////////
            });

            container.appendChild(header);
            container.appendChild(plan_line);
            container.appendChild(table_copy);
            container.appendChild(footer);

            header.appendChild(logo);

            hide_loader();
            $.print(container);
        });
    }
    </script>
</div>
