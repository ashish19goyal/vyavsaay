<div id='form186' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form186_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form186_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form186_print' onclick=form186_print_form();><i class='fa fa-print'></i> Print</a>
        <a class='btn btn-default btn-sm' id='form186_share'><i class='fa fa-envelope'></i> Email</a>    
      </div>
	</div>
	
	<div class="portlet-body">
        <form id='form186_master' autocomplete="off">
            <fieldset>
                <label><input type='text' required name='plan' placeholder='Plan Name' class='floatlabel'></label>
                <label><input type='text' required name='from' class='floatlabel' placeholder='From Date'></label>
                <label><input type='text' required name='to' required class='floatlabel' placeholder='To Date'></label>
                <label><input type='text' required name='status' class='floatlabel' placeholder='Status'></label>
                <input type='hidden' name='plan_id'>
                <input type='submit' class='submit_hidden'>
            </fieldset>
        </form>
        
        <br>
		
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr style='color:#9a9a9a;'>
                    <th>Item</th>
					<th>Brand</th>
					<th>Quantity</th>
					<th>Schedule</th>
					<th>Status</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form186_body'>
			</tbody>
		</table>
    </div>

            
    <script>
    function form186_header_ini()
    {
        var fields=document.getElementById('form186_master');

        var plan_filter=fields.elements['plan'];
        var from_filter=fields.elements['from'];
        var to_filter=fields.elements['to'];
        var status_filter=fields.elements['status'];
        fields.elements['plan_id'].value=get_new_key();
        var save_button=document.getElementById('form186_save');

        status_filter.value='draft';

        $(save_button).off('click');
        $(save_button).on("click", function(event)
        {
            event.preventDefault();
            form186_create_form();
        });

        $(document).off('keydown');
        $(document).on('keydown', function(event) {
            if( event.keyCode == 83 && event.ctrlKey) {
                event.preventDefault();
                $(save_button).trigger('click');
            }
        });

        $(fields).off('submit');
        $(fields).on('submit',function(event)
        {
            event.preventDefault();
            form186_add_item();
        });

        $(from_filter).datepicker();
        $(from_filter).val(get_my_date());

        $(to_filter).datepicker();
        $(to_filter).val(get_my_date());

        plan_filter.value="";
        $(plan_filter).focus();

        set_static_value_list_json('production_plan','status',status_filter);

        var body_elem=document.getElementById('form186_body');
        body_elem.addEventListener('table_sort',function(e)
        {
            form186_update_serial_numbers();
            $("[id^='save_form186_']").click();
        },false);
    }

    function form186_ini()
    {
        var plan_id=$("#form186_link").attr('data_id');
        if(plan_id==null)
            plan_id="";	

        $('#form186_body').html("");
        $('#form186_foot').html("");

        if(plan_id!="")
        {
            show_loader();
            var plan_columns="<production_plan>" +
                    "<id>"+plan_id+"</id>" +
                    "<name></name>" +
                    "<details></details>" +
                    "<from_time></from_time>" +
                    "<to_time></to_time>" +
                    "<status></status>"+
                    "</production_plan>";

            var filter_fields=document.getElementById('form186_master');

            ////separate fetch function to get plan details 
            fetch_requested_data('',plan_columns,function(plan_results)
            {
                for (var i in plan_results)
                {
                    filter_fields.elements[1].value=plan_results[i].name;
                    filter_fields.elements[2].value=get_my_past_date(plan_results[i].from_time);
                    filter_fields.elements[3].value=get_my_past_date(plan_results[i].to_time);
                    filter_fields.elements[4].value=plan_results[i].status;
                    filter_fields.elements[5].value=plan_id;
                    var save_button=filter_fields.elements[6];

                    $(save_button).off('click');
                    $(save_button).on("click", function(event)
                    {
                        event.preventDefault();
                        form186_update_form();
                    });

                    break;
                }


                var plan_items_column="<production_plan_items>" +
                        "<id></id>" +
                        "<item></item>" +
                        "<batch></batch>"+
                        "<order_no></order_no>" +
                        "<quantity></quantity>" +
                        "<brand></brand>" +
                        "<status></status>" +
                        "<from_time></from_time>" +
                        "<to_time></to_time>" +
                        "<plan_id exact='yes'>"+plan_id+"</plan_id>" +
                        "</production_plan_items>";

                fetch_requested_data('',plan_items_column,function(results)
                {
                    results.forEach(function(result)
                    {
                        var plan_status=filter_fields.elements[4].value;
                        var rowsHTML="";
                        var id=result.id;
                        rowsHTML+="<tr>";
                        rowsHTML+="<form id='form186_"+id+"'></form>";
                            rowsHTML+="<td data-th='Order'>";
                                rowsHTML+="<input style='width:50px;' type='number' readonly='readonly' form='form186_"+id+"' value='"+result.order_no+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Item'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form186_"+id+"' value='"+result.item+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Brand'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form186_"+id+"' value='"+result.brand+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Quantity'>";
                                rowsHTML+="<input type='number' readonly='readonly' class='dblclick_editable' form='form186_"+id+"' value='"+result.quantity+"' step='any'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Schedule'>";
                                rowsHTML+="<b>From</b>: <input type='text' readonly='readonly' class='dblclick_editable' form='form186_"+id+"' value='"+get_my_past_date(result.from_time)+"'>";
                                rowsHTML+="<br><b>To</b>: <input type='text' readonly='readonly' class='dblclick_editable' form='form186_"+id+"' value='"+get_my_past_date(result.to_time)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Status'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form186_"+id+"' class='dblclick_editable' value='"+result.status+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form186_"+id+"' value='"+id+"'>";
                                rowsHTML+="<input type='button' class='save_icon' form='form186_"+id+"' id='save_form186_"+id+"'>";
                            if(result.status!='inventoried')
                                rowsHTML+="<input type='button' class='delete_icon' form='form186_"+id+"' id='delete_form186_"+id+"' onclick='form186_delete_item($(this));'>";
                            if(plan_status=='approved' && result.status!='inventoried')
                            {
                                rowsHTML+="<input type='button' class='generic_icon' value='Inventory' name='ready' form='form186_"+id+"'>";							
                            }						
                            rowsHTML+="</td>";			
                        rowsHTML+="</tr>";

                        $('#form186_body').prepend(rowsHTML);
                        var fields=document.getElementById('form186_'+id);
                        var from_filter=fields.elements[4];
                        var to_filter=fields.elements[5];
                        var status_filter=fields.elements[6];
                        var save_button=fields.elements[8];
                        var ready_button=fields.elements['ready'];

                        $(ready_button).on('click',function()
                        {
                            //console.log('button');
                            element_display(result.id,'form256');

                            var save_button=document.getElementById('form256_master').elements['save'];						
                            $(save_button).off('click');
                            $(save_button).on("click", function(event)
                            {
                                event.preventDefault();
                                form256_create_form();
                            });						
                        });

                        $(from_filter).datepicker();
                        $(to_filter).datepicker();
                        set_static_value_list('production_plan_items','status',status_filter);

                        $(save_button).on('click',function (event) 
                        {
                            event.preventDefault();
                            form186_update_item(fields);
                        });
                    });

                    $('#form186_share').show();
                    $('#form186_share').click(function()
                    {
                        modal101_action('Production Plan','','staff',function (func) 
                        {
                            print_form186(func);
                        });
                    });

                    hide_loader();
                });
            });
        }
    }

    function form186_add_item()
    {
        if(is_create_access('form186'))
        {
            var filter_fields=document.getElementById('form186_master');

            var rowsHTML="";
            var id=get_new_key();
            rowsHTML+="<tr>";
            rowsHTML+="<form id='form186_"+id+"' autocomplete='off'></form>";
                rowsHTML+="<td data-th='Order'>";
                    rowsHTML+="<input style='width:50px;' type='number' form='form186_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Item'>";
                    rowsHTML+="<input type='text' required form='form186_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Brand'>";
                    rowsHTML+="<input type='text' required form='form186_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Quantity'>";
                    rowsHTML+="<input type='number' required form='form186_"+id+"' step='any'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Schedule'>";
                    rowsHTML+="<b>From</b>: <input type='text' form='form186_"+id+"'>";
                    rowsHTML+="<br><b>To</b>: <input type='text' form='form186_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Status'>";
                    rowsHTML+="<input type='text' form='form186_"+id+"' required value='pending'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Action'>";
                    rowsHTML+="<input type='hidden' form='form186_"+id+"' value='"+id+"'>";
                    rowsHTML+="<input type='button' class='save_icon' form='form186_"+id+"' id='save_form186_"+id+"' >";
                    rowsHTML+="<input type='button' class='delete_icon' form='form186_"+id+"' id='delete_form186_"+id+"' onclick='$(this).parent().parent().remove();'>";
                    rowsHTML+="<input type='submit' class='submit_hidden' form='form186_"+id+"'>";
                rowsHTML+="</td>";
            rowsHTML+="</tr>";

            $('#form186_body').append(rowsHTML);

            var fields=document.getElementById("form186_"+id);
            var order_filter=fields.elements[0];
            var item_filter=fields.elements[1];
            var brand_filter=fields.elements[2];
            var quantity_filter=fields.elements[3];
            var from_filter=fields.elements[4];
            var to_filter=fields.elements[5];
            var status_filter=fields.elements[6];
            var id_filter=fields.elements[7];
            var save_button=fields.elements[8];

            $(save_button).on("click", function(event)
            {
                event.preventDefault();
                form186_create_item(fields);
            });

            $(fields).on("submit", function(event)
            {
                event.preventDefault();
                form186_add_item();
            });

            var product_data="<attributes>" +
            "<name></name>" +
            "<type exact='yes'>product</type>"+
            "<value exact='yes'>yes</value>"+
            "<attribute exact='yes'>manufactured</attribute>"+
            "</attributes>";
            set_my_value_list_func(product_data,item_filter,function () 
            {
                $(item_filter).focus();
            });

            $(from_filter).datepicker();
            $(to_filter).datepicker();
            set_static_value_list('production_plan_items','status',status_filter);
            form186_update_serial_numbers();
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form186_create_item(form)
    {
        if(is_create_access('form186'))
        {
            var master_form=document.getElementById("form186_master");

            var plan_id=master_form.elements[5].value;

            var order=form.elements[0].value;
            var item=form.elements[1].value;
            var brand=form.elements[2].value;
            var quantity=form.elements[3].value;
            var from=get_raw_time(form.elements[4].value);
            var to=get_raw_time(form.elements[5].value);
            var status=form.elements[6].value;
            var data_id=form.elements[7].value;
            var save_button=form.elements[8];
            var del_button=form.elements[9];
            var last_updated=get_my_time();

            var data_xml="<production_plan_items>" +
                    "<id>"+data_id+"</id>" +
                    "<order_no>"+order+"</order_no>" +
                    "<item>"+item+"</item>" +
                    "<brand>"+brand+"</brand>" +
                    "<quantity>"+quantity+"</quantity>" +
                    "<from_time>"+from+"</from_time>" +
                    "<to_time>"+to+"</to_time>" +
                    "<status>"+status+"</status>" +
                    "<plan_id>"+plan_id+"</plan_id>" +
                    "<last_updated>"+last_updated+"</last_updated>" +
                    "</production_plan_items>";

            create_simple(data_xml);
            console.log(data_xml);

            var raw_data="<pre_requisites>" +
                    "<type exact='yes'>product</type>" +
                    "<requisite_type exact='yes'>product</requisite_type>"+
                    "<name exact='yes'>"+item+"</name>" +
                    "<requisite_name></requisite_name>"+
                    "<quantity></quantity>"+
                    "</pre_requisites>";
            fetch_requested_data('',raw_data,function(raws)
            {
                raws.forEach(function(raw)
                {
                    raw.quantity=parseFloat(raw.quantity)*parseFloat(quantity);			
                    var batch_data="<product_instances>"+
                                    "<batch></batch>"+
                                    "<product_name exact='yes'>"+raw.requisite_name+"</product_name>"+
                                    "</product_instances>";
                    get_single_column_data(function (batches) 
                    {
                        var batches_result_array=[];
                        get_available_batch(raw.requisite_name,batches,raw.quantity,batches_result_array,function()
                        {
                            if(parseFloat(raw.quantity)>0)
                            {
                                var notif_notes=raw.quantity+" more pieces of "+raw.requisite_name+" are requirement for production of "+quantity+" pieces of "+item+". Please procure immediately.";
                                var notif_xml="<notifications>" +
                                        "<id>"+get_new_key()+"</id>" +
                                        "<t_generated>"+get_my_time()+"</t_generated>" +
                                        "<data_id>"+data_id+"</data_id>" +
                                        "<title>Insufficient Inventory</title>" +
                                        "<notes>"+notif_notes+"</notes>" +
                                        "<link_to>form238</link_to>" +
                                        "<target_user></target_user>"+
                                        "<status>pending</status>" +
                                        "<last_updated>"+last_updated+"</last_updated>" +
                                        "</notifications>";
                                create_simple(notif_xml);		
                            }

                            batches_result_array.forEach(function (batch_result) 
                            {
                                console.log(batch_result);
                                var batch_raw_xml="<batch_raw_material>"+
                                    "<item>"+raw.requisite_name+"</item>"+
                                    "<batch>"+batch_result.batch+"</batch>"+
                                    "<quantity>"+batch_result.quantity+"</quantity>"+
                                    "<production_id>"+data_id+"</production_id>"+
                                    "<last_updated>"+last_updated+"</last_updated>" +
                                    "</batch_raw_material>";
                                create_simple(batch_raw_xml);
                                ///////////////////////////////////////////////////////
                                var storage_xml="<area_utilization>"+
                                                "<name></name>"+
                                                "<item_name exact='yes'>"+raw.requisite_name+"</item_name>"+
                                                "<batch exact='yes'>"+batch_result.batch+"</batch>"+
                                                "</area_utilization>";
                                console.log(storage);																	
                                get_single_column_data(function (storages) 
                                {
                                    get_available_storage(raw.requisite_name,batch_result.batch,storages,batch_result.quantity,storage_result_array,function () 
                                    {
                                        console.log(storage_result_array);

                                        var item_storage="";
                                        var store_item_id=get_new_key();
                                        var adjust_count=1;	
                                        var target=get_session_var('production_floor_store');
                                        if(storage_result_array.length>0)
                                        {
                                            item_storage=storage_result_array[0].storage;

                                            adjust_count+=1;
                                            var data_xml="<store_movement>" +
                                                "<id>"+store_item_id+"</id>" +
                                                "<item_name>"+raw.requisite_name+"</item_name>" +
                                                "<batch>"+batch_result.batch+"</batch>" +
                                                "<quantity>"+batch_result.quantity+"</quantity>" +
                                                "<source>"+item_storage+"</source>"+
                                                "<target>"+target+"</target>"+
                                                "<status>pending</status>"+
                                                "<dispatcher>"+get_account_name()+"</dispatcher>"+
                                                "<receiver></receiver>"+
                                                "<record_source>production_plan_item</record_source>"+
                                                "<source_id>"+data_id+"</source_id>"+
                                                "<applicable_from>"+from+"</applicable_from>" +
                                                "<last_updated>"+last_updated+"</last_updated>" +
                                                "</store_movement>";	
                                            create_simple(data_xml);	
                                            console.log(data_xml);
                                        }
                                        storage_result_array.forEach(function(storage_result)
                                        {
                                            adjust_count+=1;
                                            var data_xml="<store_movement>" +
                                                "<id>"+(store_item_id+adjust_count)+"</id>" +
                                                "<item_name>"+raw.requisite_name+"</item_name>" +
                                                "<batch>"+batch_result.batch+"</batch>" +
                                                "<quantity>"+storage_result.quantity+"</quantity>" +
                                                "<source>"+storage_result.storage+"</source>"+
                                                "<target>"+target+"</target>"+
                                                "<status>pending</status>"+
                                                "<dispatcher>"+get_account_name()+"</dispatcher>"+
                                                "<receiver></receiver>"+
                                                "<record_source>production_plan_item</record_source>"+
                                                "<source_id>"+data_id+"</source_id>"+
                                                "<applicable_from>"+from+"</applicable_from>" +
                                                "<last_updated>"+last_updated+"</last_updated>" +
                                                "</store_movement>";
                                            create_simple(data_xml);
                                            console.log(data_xml);																			
                                        });				
                                    });
                                },storage_xml);	
                                    ////////////////////////////////////////////////////////
                            });
                        });
                    },batch_data);	
                });
            });

            var steps_xml="<business_processes>"+
                        "<name></name>"+
                        "<details></details>"+
                        "<order_no></order_no>"+
                        "<time_estimate></time_estimate>"+
                        "<default_assignee></default_assignee>"+
                        "<type array='yes'>--production--testing--</type>"+
                        "<status array='yes'>--active--required--</status>"+
                        "</business_processes>";
            fetch_requested_data('',steps_xml,function (steps) 
            {
                steps.sort(function(a,b)
                {
                    if(parseInt(a.order_no)>parseInt(b.order_no))
                    {	return 1;}
                    else 
                    {	return -1;}
                });

                var t_initiated=parseFloat(from);
                var steps_string="";
                var task_hours=0;
                steps.forEach(function(step)
                {
                    steps_string+=step.name+"\n";
                    task_hours=parseFloat(step.time_estimate)*parseFloat(quantity);
                });	
                var t_due=t_initiated+(task_hours*3600000);

                var data_xml="<task_instances>"+
                        "<id>"+data_id+"</id>"+
                        "<name>"+item+"("+quantity+" pieces)"+"</name>" +
                        "<description>Perform following steps for production of "+quantity+" pieces of "+item+"\n"+steps_string+"</description>" +
                        "<assignee></assignee>" +
                        "<t_due>"+t_due+"</t_due>" +
                        "<t_initiated>"+t_initiated+"</t_initiated>" +
                        "<task_hours>"+task_hours+"</task_hours>" +
                        "<status>pending</status>" +
                        "<source>business process</source>" +
                        "<source_id>"+data_id+"</source_id>" +
                        "<last_updated>"+last_updated+"</last_updated>" +
                        "</task_instances>";
                create_simple(data_xml);

            });

            for(var i=0;i<7;i++)
            {
                $(form.elements[i]).attr('readonly','readonly');
            }		

            del_button.removeAttribute("onclick");
            $(del_button).on('click',function(event)
            {
                form186_delete_item(del_button);
            });

            $(save_button).off('click');
            $(save_button).on('click',function (e) 
            {
                e.preventDefault();
                form186_update_item(form);
            });

        }
        else
        {
            $("#modal2_link").click();
        }
    }


    /**
     * @form Create production plan
     * @param button
     */
    function form186_create_form()
    {
        if(is_create_access('form186'))
        {
            show_loader();
            var form=document.getElementById("form186_master");

            var name=form.elements[1].value;
            var from=get_raw_time(form.elements[2].value);
            var to=get_raw_time(form.elements[3].value);
            var status=form.elements[4].value;
            var data_id=form.elements[5].value;
            var save_button=form.elements[6];
            var last_updated=get_my_time();

            var data_xml="<production_plan>" +
                        "<id>"+data_id+"</id>" +
                        "<name>"+name+"</name>" +
                        "<from_time>"+from+"</from_time>" +
                        "<to_time>"+to+"</to_time>" +
                        "<status>"+status+"</status>"+
                        "<last_updated>"+last_updated+"</last_updated>" +
                        "</production_plan>";
            var activity_xml="<activity>" +
                        "<data_id>"+data_id+"</data_id>" +
                        "<tablename>production_plan</tablename>" +
                        "<link_to>form189</link_to>" +
                        "<title>Saved</title>" +
                        "<notes>Production plan "+name+"</notes>" +
                        "<updated_by>"+get_name()+"</updated_by>" +
                        "</activity>";
            create_row(data_xml,activity_xml);

            $(save_button).off('click');
            $(save_button).on('click',function(event)
            {
                event.preventDefault();
                form186_update_form();
            });

            $('#form186_share').show();
            $('#form186_share').click(function()
            {
                modal101_action('Production Plan','','staff',function (func) 
                {
                    print_form186(func);
                });
            });

            $("[id^='save_form186_']").click();
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form186_update_item(form)
    {
        if(is_update_access('form186'))
        {
            var master_form=document.getElementById("form186_master");		
            var plan_id=master_form.elements['plan_id'].value;

            var order=form.elements[0].value;
            var item=form.elements[1].value;
            var brand=form.elements[2].value;
            var quantity=form.elements[3].value;
            var from=get_raw_time(form.elements[4].value);
            var to=get_raw_time(form.elements[5].value);
            var status=form.elements[6].value;
            var data_id=form.elements[7].value;
            var last_updated=get_my_time();

            var data_xml="<production_plan_items>" +
                    "<id>"+data_id+"</id>" +
                    "<order_no>"+order+"</order_no>" +
                    "<item>"+item+"</item>" +
                    "<brand>"+brand+"</brand>" +
                    "<quantity>"+quantity+"</quantity>" +
                    "<from_time>"+from+"</from_time>" +
                    "<to_time>"+to+"</to_time>" +
                    "<status>"+status+"</status>" +
                    "<plan_id>"+plan_id+"</plan_id>" +
                    "<last_updated>"+last_updated+"</last_updated>" +
                    "</production_plan_items>";
            var task_xml="<task_instances>"+
                    "<id>"+data_id+"</id>"+
                    "<name>"+item+"("+quantity+" pieces)"+"</name>" +
                    "<t_due>"+to+"</t_due>" +
                    "<t_initiated>"+from+"</t_initiated>" +
                    "<last_updated>"+last_updated+"</last_updated>" +
                    "</task_instances>";

            update_simple(data_xml);
            update_simple(task_xml);

            var store_movement_xml="<store_movement>"+
                                "<id></id>"+
                                "<record_source exact='yes'>production_plan_item</record_source>"+
                                "<source_id exact='yes'>"+data_id+"</source_id>"+
                                "</store_movement>";
            fetch_requested_data('',store_movement_xml,function (movs) 
            {
                movs.forEach(function (mov) 
                {
                    var mov_xml="<store_movement>"+
                        "<id>"+mov.id+"</id>"+
                        "<applicable_from>"+from+"</applicable_from>"+
                        "<last_updated>"+last_updated+"</last_updated>" +
                        "</store_movement>";
                    update_simple(mov_xml);	
                });
            });					

            for(var i=0;i<7;i++)
            {
                $(form.elements[i]).attr('readonly','readonly');
            }		
        }
        else
        {
            $("#modal2_link").click();
        }
    }


    /**
     * @form Create Production Plan
     * @param button
     */
    function form186_update_form()
    {
        if(is_update_access('form186'))
        {
            var form=document.getElementById("form186_master");

            var name=form.elements[1].value;
            var from=get_raw_time(form.elements[2].value);
            var to=get_raw_time(form.elements[3].value);
            var status=form.elements[4].value;
            var data_id=form.elements[5].value;
            var save_button=form.elements[6];
            var last_updated=get_my_time();

            var data_xml="<production_plan>" +
                        "<id>"+data_id+"</id>" +
                        "<name>"+name+"</name>" +
                        "<from_time>"+from+"</from_time>" +
                        "<to_time>"+to+"</to_time>" +
                        "<status>"+status+"</status>"+
                        "<last_updated>"+last_updated+"</last_updated>" +
                        "</production_plan>";
            var activity_xml="<activity>" +
                        "<data_id>"+data_id+"</data_id>" +
                        "<tablename>production_plan</tablename>" +
                        "<link_to>form189</link_to>" +
                        "<title>Updated</title>" +
                        "<notes>Production Plan "+name+"</notes>" +
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

            $("[id^='save_form186_']").click();
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form186_update_serial_numbers()
    {
        $('#form186_body').find('tr').each(function(index)
        {
            $(this).find('td:nth-child(2)>input').attr('value',index+1);
        });
    }

    function form186_delete_item(button)
    {
        if(is_delete_access('form186'))
        {
            modal115_action(function()
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var data_id=form.elements[7].value;
                var last_updated=get_my_time();
                var data_xml="<production_plan_items>" +
                            "<id>"+data_id+"</id>" +
                            "</production_plan_items>";	
                var task_xml="<task_instances>" +
                            "<source_id exact='yes'>"+data_id+"</source_id>" +
                            "</task_instances>";
                var batch_raw_xml="<batch_raw_material>"+
                            "<production_id>"+data_id+"</production_id>"+
                            "</batch_raw_material>";
                var move_xml="<store_movement>"+
                            "<record_source>production_plan_item</record_source>"+
                            "<source_id>"+data_id+"</source_id>"+
                            "</store_movement>";

                delete_simple(data_xml);
                delete_simple(task_xml);
                delete_simple(batch_raw_xml);
                delete_simple(move_xml);
                $(button).parent().parent().remove();
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form186_print_form()
    {
        print_form186(function(container)
        {
            $.print(container);
            container.innerHTML="";	
        });	
    }

    /**
     * @form Create Production Plan
     * @formNo 186
     */
    function print_form186(func)
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