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
				<label><textarea name='notes' placeholder='Notes' class='floatlabel'></textarea></label>
                <label><input type='text' required name='from' class='floatlabel' placeholder='From Date'></label>
                <label><input type='text' required name='to' required class='floatlabel' placeholder='To Date'></label>
                <label><input type='text' required name='status' readonly='readonly' class='floatlabel' placeholder='Status'></label>
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
					<th>Line</th>
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

		$(fields).editable();

        var plan_filter=fields.elements['plan'];
        var from_filter=fields.elements['from'];
        var to_filter=fields.elements['to'];
        var status_filter=fields.elements['status'];
		var notes_filter=fields.elements['notes'];
        fields.elements['plan_id'].value=vUtil.newKey();
        var save_button=document.getElementById('form186_save');

		status_filter.value='draft';
		notes_filter.value='';
		$(status_filter).attr('readonly','readonly');

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
        $(from_filter).val(vTime.date());

        $(to_filter).datepicker();
        $(to_filter).val(vTime.date({addDays:7}));

        plan_filter.value="";
        $(plan_filter).focus();

        set_static_value_list_json('production_plan','status',status_filter);

        var body_elem=document.getElementById('form186_body');
        body_elem.addEventListener('table_sort',function(e)
        {
            form186_update_serial_numbers();
            $("[id^='save_form186_']").click();
        },false);

		$('#form186_body').paginator({visible:false});
		$('#form186').formcontrol();
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
					filter_fields.elements['notes'].value=plan_results[0].details;
                    filter_fields.elements['plan_id'].value=plan_id;
                    var save_button=document.getElementById('form186_save');

					$(filter_fields).readonly();

                    $(save_button).off('click');
                    $(save_button).on("click", function(event)
                    {
                        event.preventDefault();
                    });
                }

                var plan_items_column={data_store:'production_plan_items',
                                      indexes:[{index:'id'},
                                              {index:'item'},
                                              {index:'order_no'},
                                              {index:'quantity'},
                                              {index:'brand'},
                                              {index:'status'},
                                              {index:'from_time'},
											  {index:'to_time'},
											  {index:'produced_quantity'},
											  {index:'production_line'},
                                              {index:'plan_id',exact:plan_id}]};

                read_json_rows('form186',plan_items_column,function(results)
                {
                    results.sort(function(a,b)
                    {
                        if(parseInt(a.order_no)<parseInt(b.order_no))
                        {	return 1;}
                        else
                        {	return -1;}
                    });

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
                                rowsHTML+="<a onclick=\"show_object('product_master','"+result.item+"');\"><input type='text' class='floatlabel' placeholder='Item' readonly='readonly' form='form186_"+id+"' value='"+result.item+"'></a>";
								rowsHTML+="<input type='text' class='floatlabel' placeholder='Brand' readonly='readonly' form='form186_"+id+"' value='"+result.brand+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Line'>";
								rowsHTML+="<input type='text' placeholder='Line' readonly='readonly' form='form186_"+id+"' value='"+result.production_line+"'>";
							rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Quantity'>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Scheduled' readonly='readonly' form='form186_"+id+"' value='"+result.quantity+"' step='any'>";
								rowsHTML+="<input type='number' class='floatlabel' placeholder='Produced' readonly='readonly' form='form186_"+id+"' value='"+result.produced_quantity+"' step='any'>";
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
                        var from_filter=fields.elements[6];
                        var to_filter=fields.elements[7];
                        var status_filter=fields.elements[8];
                        var save_button=fields.elements['save'];
                        var ready_button=fields.elements['ready'];

                        $(ready_button).on('click',function()
                        {
							modal223_action(result.id,result.item,plan_id,filter_fields.elements['plan'].value,result.produced_quantity,result.quantity);
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

            var id=vUtil.newKey();
            var rowsHTML="<tr>";
            rowsHTML+="<form id='form186_"+id+"' autocomplete='off'></form>";
                rowsHTML+="<td data-th='Order'>";
                    rowsHTML+="<input style='width:50px;' type='number' form='form186_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Item'>";
                    rowsHTML+="<input type='text' class='floatlabel' placeholder='Item' required form='form186_"+id+"'>";
					rowsHTML+="<input type='text' class='floatlabel' placeholder='Brand' required form='form186_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Line'>";
                    rowsHTML+="<input type='text' placeholder='Line' required form='form186_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Quantity'>";
                    rowsHTML+="<input type='number' class='floatlabel' placeholder='Scheduled' required form='form186_"+id+"' step='any'>";
					rowsHTML+="<input type='number' class='floatlabel' placeholder='Produced' readonly='readonly' value='0' form='form186_"+id+"' step='any'>";
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
			var line_filter=fields.elements[3];
            var quantity_filter=fields.elements[4];
			var prod_quantity_filter=fields.elements[5];
            var from_filter=fields.elements[6];
            var to_filter=fields.elements[7];
            var status_filter=fields.elements[8];
            var id_filter=fields.elements[9];
            var save_button=fields.elements[10];

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
			var plan_name=master_form.elements['plan'].value;

            var order=form.elements[0].value;
            var item=form.elements[1].value;
            var brand=form.elements[2].value;
			var line=form.elements[3].value;
            var quantity=form.elements[4].value;
            var from=get_raw_time(form.elements[6].value);
            var to=get_raw_time(form.elements[7].value);
            var status=form.elements[8].value;
            var data_id=form.elements[9].value;
            var save_button=form.elements[10];
            var del_button=form.elements[11];
            var last_updated=get_my_time();

			var data_json={data_store:'production_plan_items',
					data:[{index:'id',value:data_id},
						{index:'order_no',value:order},
						{index:'item',value:item},
						{index:'brand',value:brand},
						{index:'production_line',value:line},
						{index:'quantity',value:quantity},
						{index:'produced_quantity',value:'0'},
						{index:'from_time',value:from},
						{index:'to_time',value:to},
						{index:'status',value:status},
						{index:'plan_id',value:plan_id},
						{index:'last_updated',value:last_updated}]};

            create_json(data_json);

            var raw_data={data_store:'pre_requisites',
						indexes:[{index:'type',exact:'product'},
								{index:'requisite_type',exact:'product'},
								{index:'name',exact:item},
								{index:'requisite_name'},
								{index:'quantity'}]};
            read_json_rows('form186',raw_data,function(raws)
            {
                raws.forEach(function(raw)
                {
                    raw.quantity=parseFloat(raw.quantity)*parseFloat(quantity);
                    var batch_data={data_store:'product_instances',return_column:'batch',
									indexes:[{index:'product_name',exact:raw.requisite_name}]};
                    read_json_single_column(batch_data,function (batches)
                    {
                        var batches_result_array=[];
                        get_available_batch(raw.requisite_name,batches,raw.quantity,batches_result_array,function()
                        {
                            if(parseFloat(raw.quantity)>0)
                            {
                                var notif_notes=raw.quantity+" more pieces of "+raw.requisite_name+" are required for production of "+quantity+" pieces of "+item+". Please procure immediately.";
                                var notif_json={data_store:'notifications',
										data:[{index:'id',value:vUtil.newKey()},
											{index:'t_generated',value:vTime.unix()},
											{index:'data_id',value:data_id},
											{index:'title',value:'Insufficient Inventory'},
											{index:'notes',value:notif_notes},
											{index:'link_to',value:'form238'},
											{index:'target_user',value:''},
											{index:'status',value:'pending'},
											{index:'last_updated',value:last_updated}]};

								create_json(notif_json);
                            }
                        });
                    });
                });
            });

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
			var notes=form.elements['notes'].value;
            var data_id=form.elements['plan_id'].value;
            var save_button=document.getElementById('form186_save');
            var last_updated=get_my_time();

            var data_json={data_store:'production_plan',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:name},
	 					{index:'from_time',value:from},
                        {index:'to_time',value:to},
                        {index:'status',value:status},
						{index:'details',value:notes},
	 					{index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Saved',notes:'Production plan '+name,link_to:'form189'}};

            create_json(data_json);

            $(save_button).off('click');
            $(save_button).on('click',function(event)
            {
                event.preventDefault();
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
			var line=form.elements[3].value;
            var quantity=form.elements[4].value;
            var from=get_raw_time(form.elements[6].value);
            var to=get_raw_time(form.elements[7].value);
            var status=form.elements[8].value;
            var data_id=form.elements[9].value;
            var save_button=form.elements[10];
            var del_button=form.elements[11];
            var last_updated=get_my_time();
			var task_hours=(parseFloat(to)-parseFloat(from))/86400000;

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
						{index:'task_hours',value:task_hours},
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

                var data_id=form.elements[9].value;
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
            plan_info.setAttribute('style','padding:5px;margin:5px;float:left;width:100%;height:120px;');

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
        var plan_name=master_form.elements['plan'].value;
        var from_date=master_form.elements['from'].value;
        var to_date=master_form.elements['to'].value;
        var plan_status=master_form.elements['status'].value;
		var notes=master_form.elements['notes'].value;

        ////////////////filling in the content into the containers//////////////////////////

        logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"'>";
        business_title.innerHTML=bt;
        plan_line.innerHTML="<div style='float:left;width:50%'>From: "+from_date+"</div><div style='float:right;text-align:right;width:50%'>To: "+to_date+"</div>";
        plan_info.innerHTML="<hr style='border: 1px solid #000;margin:2px'>Plan Name: </b>"+plan_name+"<br>Notes: "+notes+"<br>Plan Status: "+plan_status+"<hr style='border: 1px solid #000;margin:2px'>";

        var table_element=document.getElementById(form_id+'_body').parentNode;
        table_copy=table_element.cloneNode(true);

        table_copy.removeAttribute('class');
        table_copy.setAttribute('width','100%');
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

        $(table_copy).find("th:first, td:first").css('width','5%');
        $(table_copy).find("th:nth-child(2), td:nth-child(2)").css('width','30%');
		$(table_copy).find("th:nth-child(3), td:nth-child(3)").css('width','20%');
		$(table_copy).find("th:nth-child(4), td:nth-child(4)").css('width','20%');
		$(table_copy).find("th:nth-child(5), td:nth-child(5)").css('width','15%');
		$(table_copy).find("th:nth-child(6), td:nth-child(6)").css('width','10%');

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
