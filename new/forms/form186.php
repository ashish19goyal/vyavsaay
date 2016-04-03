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
                    <th>Order</th>
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
            var plan_columns={data_store:'production_plan',
                             indexes:[{index:'id',value:plan_id},
                                     {index:'name'},
                                     {index:'details'},
                                     {index:'from_time'},
                                     {index:'to_time'},
                                     {index:'status'}]};

            var filter_fields=document.getElementById('form186_master');

            ////separate fetch function to get plan details 
            read_json_rows('form186',plan_columns,function(plan_results)
            {
                if (plan_results.length>0)
                {
                    filter_fields.elements['plan'].value=plan_results[0].name;
                    filter_fields.elements['from'].value=get_my_past_date(plan_results[0].from_time);
                    filter_fields.elements['to'].value=get_my_past_date(plan_results[0].to_time);
                    filter_fields.elements['status'].value=plan_results[0].status;
                    filter_fields.elements['plan_id'].value=plan_id;
                    var save_button=document.getElementById('form186_save');

                    $(save_button).off('click');
                    $(save_button).on("click", function(event)
                    {
                        event.preventDefault();
                        form186_update_form();
                    });
                }
            });

            var plan_items_column={data_store:'production_plan_items',
                                  indexes:[{index:'id'},
                                          {index:'item'},
                                          {index:'batch'},
                                          {index:'order_no'},
                                          {index:'quantity'},
                                          {index:'brand'},
                                          {index:'status'},
                                          {index:'from_time'},
                                          {index:'to_time'},
                                          {index:'plan_id',exact:plan_id}]};

            read_json_rows('form186',plan_items_column,function(results)
            {
                results.forEach(function(result)
                {
                    var plan_status=filter_fields.elements['status'].value;
                    var id=result.id;
                    var rowsHTML="<tr>";
                    rowsHTML+="<form id='form186_"+id+"'></form>";
                        rowsHTML+="<td data-th='Order'>";
                            rowsHTML+="<input style='width:50px;' type='number' readonly='readonly' form='form186_"+id+"' value='"+result.order_no+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Item'>";
                            rowsHTML+="<a onclick=\"show_object('product_master','"+result.item+"');\"><input type='text' readonly='readonly' form='form186_"+id+"' value='"+result.item+"'></a>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Brand'>";
                            rowsHTML+="<input type='text' readonly='readonly' form='form186_"+id+"' value='"+result.brand+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Quantity'>";
                            rowsHTML+="<input type='number' readonly='readonly' form='form186_"+id+"' value='"+result.quantity+"' step='any'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Schedule'>";
                            rowsHTML+="<input type='text' readonly='readonly' class='floatlabel dblclick_editable' placeholder='From' form='form186_"+id+"' value='"+get_my_past_date(result.from_time)+"'>";
                            rowsHTML+="<input type='text' readonly='readonly' placeholder='To' class='dblclick_editable floatlabel' form='form186_"+id+"' value='"+get_my_past_date(result.to_time)+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Status'>";
                            rowsHTML+="<input type='text' readonly='readonly' form='form186_"+id+"' class='dblclick_editable' value='"+result.status+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' form='form186_"+id+"' value='"+id+"'>";
                            rowsHTML+="<button type='button' class='btn green' form='form186_"+id+"' id='save_form186_"+id+"' name='save' title='Save'><i class='fa fa-save'></i></button>";
                        if(result.status!='inventoried')
                            rowsHTML+="<button type='button' class='btn red' form='form186_"+id+"' id='delete_form186_"+id+"' name='delete' onclick='form186_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                        if(plan_status=='approved' && result.status!='inventoried')
                        {
                            rowsHTML+="<button type='button' class='btn default green-stripe' title='Inventory' name='ready' form='form186_"+id+"'>Inventory</button>";							
                        }						
                        rowsHTML+="</td>";			
                    rowsHTML+="</tr>";

                    $('#form186_body').prepend(rowsHTML);
                    var fields=document.getElementById('form186_'+id);
                    var from_filter=fields.elements[4];
                    var to_filter=fields.elements[5];
                    var status_filter=fields.elements[6];
                    var save_button=fields.elements['save'];
                    var ready_button=fields.elements['ready'];

                    $(ready_button).on('click',function()
                    {
                        element_display(result.id,'form256');
                        var save_button=document.getElementById('form256_save');
                        $(save_button).off('click');
                        $(save_button).on("click", function(event)
                        {
                            event.preventDefault();
                            form256_create_form();
                        });						
                    });

                    $(from_filter).datepicker();
                    $(to_filter).datepicker();
                    set_static_value_list_json('production_plan_items','status',status_filter);

                    $(save_button).on('click',function (event) 
                    {
                        event.preventDefault();
                        form186_update_item(fields);
                    });
                });

                $('#form186_share').click(function()
                {
                    modal101_action('Production Plan','','staff',function (func) 
                    {
                        print_form186(func);
                    });
                });
                $('#form186').formcontrol();
                hide_loader();
            });
        }
    }

    function form186_add_item()
    {
        if(is_create_access('form186'))
        {
            var filter_fields=document.getElementById('form186_master');
            var min_date=filter_fields.elements['from'].value;
            var max_date=filter_fields.elements['to'].value;

            var id=get_new_key();
            var rowsHTML="<tr>";
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
                    rowsHTML+="<input class='floatlabel' placeholder='From' type='text' form='form186_"+id+"'>";
                    rowsHTML+="<input class='floatlabel' placeholder='To' type='text' form='form186_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Status'>";
                    rowsHTML+="<input type='text' form='form186_"+id+"' required value='pending'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Action'>";
                    rowsHTML+="<input type='hidden' form='form186_"+id+"' value='"+id+"'>";
                    rowsHTML+="<button type='button' class='btn green' name='save' form='form186_"+id+"' id='save_form186_"+id+"'><i class='fa fa-save'></i></button>";
                    rowsHTML+="<button type='button' class='btn red' form='form186_"+id+"' id='delete_form186_"+id+"' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
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

            var product_data={data_store:'attributes',return_column:'name',
                             indexes:[{index:'type',exact:'product'},
                                     {index:'value',exact:'yes'},
                                     {index:'attribute',exact:'manufactured'}]};
            set_my_value_list_json(product_data,item_filter,function () 
            {
                $(item_filter).focus();
            });

            var mind=new Date();
            mind.setTime(get_raw_time(min_date));
            var maxd=new Date();
            maxd.setTime(get_raw_time(max_date));

            $(from_filter).datepicker({minDate:mind,maxDate:maxd});
            $(to_filter).datepicker({minDate:mind,maxDate:maxd});
            set_static_value_list_json('production_plan_items','status',status_filter);
            form186_update_serial_numbers();
            $('#form186').formcontrol();
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

            var plan_id=master_form.elements['plan_id'].value;

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
                            
                            var batch_id=get_new_key();
                            batches_result_array.forEach(function (batch_result) 
                            {
                                batch_id++;
                               // console.log(batch_result);
                                var batch_raw_xml="<batch_raw_material>"+
                                    "<id>"+batch_id+"</id>"+
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
                                //console.log(storage);																	
                                get_single_column_data(function (storages) 
                                {
                                   var storage_result_array=[]; get_available_storage(raw.requisite_name,batch_result.batch,storages,batch_result.quantity,storage_result_array,function () 
                                    {
                                        var item_storage="";
                                        var store_item_id=get_new_key();
                                        var adjust_count=1;	
                                        var target=get_session_var('production_floor_store');
                                        /*
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
                                        }*/
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
                                        });				
                                    });
                                },storage_xml);	
                                    ////////////////////////////////////////////////////////
                            });
                        });
                    },batch_data);	
                });
            });

            var task_hours=(parseFloat(to)-parseFloat(from))/86400000;
            var data_xml="<task_instances>"+
                    "<id>"+data_id+"</id>"+
                    "<name>"+item+"("+quantity+" pieces)"+"</name>" +
                    "<description>Perform production of "+quantity+" pieces of "+item+"</description>" +
                    "<assignee></assignee>" +
                    "<t_due>"+to+"</t_due>" +
                    "<t_initiated>"+from+"</t_initiated>" +
                    "<task_hours>"+task_hours+"</task_hours>" +
                    "<status>pending</status>" +
                    "<source>business process</source>" +
                    "<source_id>"+data_id+"</source_id>" +
                    "<last_updated>"+last_updated+"</last_updated>" +
                    "</task_instances>";
            create_simple(data_xml);

            
            $(form).readonly();
            
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


    function form186_create_form()
    {
        if(is_create_access('form186'))
        {
            show_loader();
            var form=document.getElementById("form186_master");

            var name=form.elements['plan'].value;
            var from=get_raw_time(form.elements['from'].value);
            var to=get_raw_time(form.elements['to'].value);
            var status=form.elements['status'].value;
            var data_id=form.elements['plan_id'].value;
            var save_button=document.getElementById('form186_save');
            var last_updated=get_my_time();

            var data_json={data_store:'production_plan',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'from_time',value:from},
                        {index:'to_time',value:to},
                        {index:'status',value:status},  
	 					{index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Saved',notes:'Production plan '+name,link_to:'form189'}};
 				
            create_json(data_json);

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
            
            var data_json={data_store:'production_plan_items',
	 				data:[{index:'id',value:data_id},
	 					{index:'order_no',value:order},
	 					{index:'item',value:item},
	 					{index:'brand',value:brand},
	 					{index:'quantity',value:quantity},
	 					{index:'from_time',value:from},
                        {index:'to_time',value:to},
                        {index:'status',value:status},  
	 					{index:'plan_id',value:plan_id},
	 					{index:'last_updated',value:last_updated}]};
 			
            var task_json={data_store:'task_instances',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:item+" ("+quantity+"pieces)"},
	 					{index:'t_due',value:to},
	 					{index:'t_initiated',value:from},
	 					{index:'last_updated',value:last_updated}]};
            update_json(data_json);
            update_json(task_json);

            var store_movement_xml={data_store:'store_movement',return_column:'id',
                                   indexes:[{index:'record_source',exact:'production_plan_item'},
                                           {index:'source_id',exact:data_id}]};
            read_json_single_column(store_movement_xml,function (movs) 
            {
                movs.forEach(function (mov) 
                {
                    var mov_json={data_store:'store_movement',
	 				data:[{index:'id',value:mov},
	 					{index:'applicable_from',value:from},
	 					{index:'last_updated',value:last_updated}]};
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


    function form186_update_form()
    {
        if(is_update_access('form186'))
        {
            var form=document.getElementById("form186_master");

            var name=form.elements['plan'].value;
            var from=get_raw_time(form.elements['from'].value);
            var to=get_raw_time(form.elements['to'].value);
            var status=form.elements['status'].value;
            var data_id=form.elements['plan_id'].value;
            var save_button=document.getElementById('form186_save');
            var last_updated=get_my_time();

            var data_json={data_store:'production_plan',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'from_time',value:from},
                        {index:'to_time',value:to},
                        {index:'status',value:status},  
	 					{index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Updated',notes:'Production plan '+name,link_to:'form189'}};
 			
            update_json(data_json);

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
                var data_json={data_store:'production_plan_items',
	 				data:[{index:'id',value:data_id}]};
                var task_json={data_store:'task_instances',
	 				data:[{index:'source_id',value:data_id}]};
	 		    var batch_raw_json={data_store:'batch_raw_material',
	 				data:[{index:'production_id',value:data_id}]};
	 		    var move_json={data_store:'store_movement',
	 				data:[{index:'source_id',value:data_id},
                         {index:'record_source',value:'production_plan_item'}]};
	 		    
                delete_json(data_json);
                delete_json(task_json);
                delete_json(batch_raw_json);
                delete_json(move_json);
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