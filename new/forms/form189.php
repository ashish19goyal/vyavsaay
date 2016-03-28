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
                            rowsHTML+="<textarea readonly='readonly' class='dblclick_editable' form='form189_"+result.id+"'>"+result.details+"</textarea>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Schedule'>";
                            rowsHTML+="<input type='text' class='floatlabel' placeholder='From' readonly='readonly' form='form189_"+result.id+"' value='"+get_my_past_date(result.from_time)+"'>";
                            rowsHTML+="<input type='text' class='floatlabel' placeholder='To' readonly='readonly' form='form189_"+result.id+"' value='"+get_my_past_date(result.to_time)+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Status'>";
                            rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form189_"+result.id+"' value='"+result.status+"' required>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' name='id' form='form189_"+result.id+"' value='"+result.id+"'>";
                            rowsHTML+="<button type='submit' class='btn green' form='form189_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
                            rowsHTML+="<button type='button' class='btn red' form='form189_"+result.id+"' title='Delete' onclick='form189_delete_item($(this))'><i class='fa fa-trash'></i></button>";
                        rowsHTML+="</td>";			
                rowsHTML+="</tr>";

                $('#form189_body').append(rowsHTML);

                var fields=document.getElementById("form189_"+result.id);
                var status_filter=fields.elements[4];
                
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

                var items_json={data_store:'production_plan_items',return_column:'id',count:1,
 							    indexes:[{index:'plan_id',exact:data_id}]};
			    read_json_single_column(items_json,function (items) 
                {
                    var item_json={data_store:'production_plan_items',
 							data:[{index:'plan_id',value:data_id}]};
                    delete_json(item_json);

                    items.forEach(function (item) 
                    {
                        var task_json={data_store:'task_instances',
 							data:[{index:'source_id',value:item.id}]};
                        delete_json(task_json);
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

    function form189_update_item(form)
    {
        if(is_update_access('form189'))
        {
            var name=form.elements[0].value;
            var details=form.elements[1].value;
            var from=get_raw_time(form.elements[2].value);
            var to=get_raw_time(form.elements[3].value);
            var status=form.elements[4].value;
            var data_id=form.elements[5].value;
            var last_updated=get_my_time();

            var data_json={data_store:'production_plan',
 							data:[{index:'id',value:data_id},
                                 {index:'name',value:name},
                                 {index:'details',value:details},
                                 {index:'from_time',value:from},
                                 {index:'to_time',value:to},
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
        
    function form189_print_schedule()
    {
        var form_id='form186';

        ////////////setting up containers///////////////////////	
        var container=document.createElement('div');
        var header=document.createElement('div');
            var logo=document.createElement('div');
            var business_title=document.createElement('div');

        var plan_line=document.createElement('div');

        var info_section=document.createElement('div');	
            var plan_info=document.createElement('div');

        var table_container=document.createElement('div');

        var footer=document.createElement('div');
            var address=document.createElement('div');

        ////////////setting styles for containers/////////////////////////

        header.setAttribute('style','width:100%;min-height:100px;');
            business_title.setAttribute('style','float:right;width:50%;text-align:right;');
        plan_line.setAttribute('style','width:100%;min-height:60px;background-color:#bbbbbb;');
        info_section.setAttribute('style','width:100%;min-height:60px;text-align:left;');
            plan_info.setAttribute('style','padding:5px;margin:5px;float:left;width:100%;height:90px;');

        ///////////////getting the content////////////////////////////////////////

        var bt=get_session_var('title');
        var font_size=get_session_var('print_size');
        var logo_image=get_session_var('logo');
        var business_intro_text=get_session_var('business_intro');
        var business_address=get_session_var('address');
        var business_phone=get_session_var('phone');
        var business_email=get_session_var('email');
        var business_website=get_session_var('website');

        var master_form=document.getElementById(form_id+'_master');
        var plan_name=master_form.elements[1].value;
        var from_date=master_form.elements[2].value;
        var to_date=master_form.elements[3].value;
        var plan_status=master_form.elements[4].value;

        ////////////////filling in the content into the containers//////////////////////////

        logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
        business_title.innerHTML=bt;
        plan_line.innerHTML="<div style='float:left;width:50%'>From: "+from_date+"</div><div style='float:right;text-align:right;width:50%'>To: "+to_date+"</div>";	
        plan_info.innerHTML="<hr style='border: 1px solid #000;margin:2px'>Plan Name: </b>"+plan_name+"<br>Plan Status: "+plan_status+"<hr style='border: 1px solid #000;margin:2px'>";

        var table_element=document.getElementById(form_id+'_body').parentNode;
        table_copy=table_element.cloneNode(true);

        table_copy.removeAttribute('class');
        table_copy.setAttribute('width','1000px');
        $(table_copy).find("a,img,input[type=checkbox],th:last-child, td:last-child,form,fresh").remove();
        $(table_copy).find('input,textarea').each(function(index)
        {
            $(this).replaceWith($(this).val());
        });

        $(table_copy).find('label').each(function(index)
        {
            $(this).replaceWith($(this).html());
        });	

        $(table_copy).find('th').attr('style',"border:2px solid black;text-align:left;font-size:"+font_size+"em");
        $(table_copy).find('td').attr('style',"border-right:2px solid black;border-left:2px solid black;text-align:left;font-size:"+font_size+"em");
        $(table_copy).find('tfoot').attr('style',"border:2px solid black;text-align:left;");
        $(table_copy).find("tbody>tr").attr('style','border:2px solid black;flex:1;height:30px');
        $(table_copy).find("tbody").attr('style','border:2px solid black;');

        $(table_copy).find("th:first, td:first").css('width','60px');
        $(table_copy).find("th:nth-child(2), td:nth-child(2)").css('width','200px');

        /////////////placing the containers //////////////////////////////////////////////////////	

        container.appendChild(header);
        container.appendChild(plan_line);
        container.appendChild(info_section);

        container.appendChild(table_copy);

        header.appendChild(logo);
        header.appendChild(business_title);

        info_section.appendChild(plan_info);

        func(container);
    }
    </script>
</div>