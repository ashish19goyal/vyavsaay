<div id='form219' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form219_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form219_save'>Save <i class='fa fa-save'></i></a>
		</div>
        <div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form219_print' onclick='form219_print_form();'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='form219_share'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
        <form id='form219_master' autocomplete="off">
            <fieldset>
                <label><input type='text' required name='drs_num' class='floatlabel' placeholder='DRS #'></label>
                <label><input type='text' required name='employee' class='floatlabel' placeholder='Employee'></label>
                <label><input type='text' name='date' required class='floatlabel' placeholder='Date'></label>
                <label><input type='number' readonly='readonly' class='floatlabel' placeholder='Total COD' step='any' name='total'></label>
			    <label><input type='text' name='num_orders' class='floatlabel' readonly='readonly' placeholder='Number of Orders'></label>
                <label><input type='text' name='branch' class='floatlabel' placeholder='Branch' readonly='readonly'></label>
                <input type='hidden' name='id'>
                <input type='hidden' name='saved'>
                <input type='submit' class='submit_hidden'>
            </fieldset>
        </form>

        <br>

        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr style='color:#9a9a9a;'>
                    <th>S.No.</th>
                    <th>AWB #</th>
					<th>Address</th>
					<th>Details</th>
					<th>Status</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form219_body'>
			</tbody>
        </table>
    </div>

    <script>
    function form219_header_ini()
    {
        var fields=document.getElementById('form219_master');

        var drs_filter=fields.elements['drs_num'];
        var employee=fields.elements['employee'];
        var drs_date=fields.elements['date'];
        var total_cod=fields.elements['total'];
        var branch=fields.elements['branch'];

        fields.elements['saved'].value='no';
        fields.elements['id'].value=get_new_key();

        var save_button=document.getElementById('form219_save');
        drs_filter.value="";
        employee.value="";

        var drs_id=$("#form219_link").attr('data_id');
        if(drs_id==null)
            drs_id="";

        if(drs_id=="")
        {
            var drs_num_data={data_store:'user_preferences',count:1,return_column:'value',
                             indexes:[{index:'name',exact:'drs_num'}]};
            set_my_value_json(drs_num_data,drs_filter);
        }

        var acc_name=get_account_name();
        var branch_data={data_store:'store_areas',count:1,return_column:'name',
                        indexes:[{index:'owner',value:acc_name}]};
        set_my_value_json(branch_data,branch);

        $(save_button).off('click');
        $(save_button).on("click", function(event)
        {
            event.preventDefault();
            form219_update_form();
        });

        $(document).off('keydown');
        $(document).on('keydown', function(event) {
            if( event.keyCode == 83 && event.ctrlKey) {
                event.preventDefault();
                $(save_button).trigger('click');
            }
        });

        $(fields).off('submit');
        $(fields).on("submit", function(event)
        {
            event.preventDefault();
            form219_add_item();
        });

        var employee_data={data_store:'staff',return_column:'acc_name'};
        set_my_value_list_json(employee_data,employee,function ()
        {
            $(employee).focus();
        });

        $(drs_date).datepicker();
        drs_date.value=vTime.date();

        $('#form219').formcontrol();
        var paginator=$('#form219_body').paginator({visible:false});

    }

    function form219_ini()
    {
        var drs_id=$("#form219_link").attr('data_id');
        if(drs_id==null)
            drs_id="";
        $('#form219_body').html("");

        if(drs_id!="")
        {
            show_loader();

            var drs_columns={data_store:'drs',
                            indexes:[{index:'id',value:drs_id},
                                    {index:'drs_num'},
                                    {index:'employee'},
                                    {index:'collectable_amount'},
                                    {index:'drs_time'},
                                    {index:'branch'}]};
            read_json_rows('form219',drs_columns,function(drs_results)
            {
                var filter_fields=document.getElementById('form219_master');
                if(drs_results.length>0)
                {
                    filter_fields.elements['drs_num'].value=drs_results[0].drs_num;
                    filter_fields.elements['employee'].value=drs_results[0].employee;
                    filter_fields.elements['date'].value=get_my_past_date(drs_results[0].drs_time);
                    filter_fields.elements['id'].value=drs_results[0].id;
                    filter_fields.elements['total'].value=drs_results[0].collectable_amount;
                    filter_fields.elements['branch'].value=drs_results[0].branch;
                    filter_fields.elements['saved'].value='yes';
                }
            });

            var drs_items_column={data_store:'logistics_orders',
                                 indexes:[{index:'id'},
                                         {index:'awb_num'},
                                         {index:'manifest_type'},
                                         {index:'order_num'},
                                         {index:'merchant_name'},
                                         {index:'ship_to'},
                                         {index:'address1'},
                                         {index:'address2'},
                                         {index:'city'},
                                         {index:'pincode'},
                                         {index:'phone'},
                                         {index:'weight'},
                                         {index:'pieces'},
                                         {index:'status'},
                                         {index:'collectable_value'},
                                         {index:'drs_num'},
                                         {index:'drs_id',exact:drs_id}]};

            read_json_rows('form219',drs_items_column,function(results)
            {
                results.forEach(function(result)
                {
                    var id=result.id;
                    var rowsHTML="<tr>";

                    var address=result.ship_to+"\n"+result.address1+", "+result.address2+", "+result.city+"-"+result.pincode;
                    if(result.address2=="--" || result.address2==result.address1)
                    {
                        var address=result.ship_to+"\n"+result.address1+", "+result.city+"-"+result.pincode;
                    }
                    rowsHTML+="<form id='form219_"+id+"'></form>";
                        rowsHTML+="<td data-th='S.No.'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='AWB #'>";
						    rowsHTML+="<a onclick=\"element_display('','form198');form198_ini('"+result.awb_num+"');\"><input type='text' readonly='readonly' form='form219_"+id+"' value='"+result.awb_num+"'></a>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Address'>";
                            rowsHTML+="<textarea readonly='readonly' class='floatlabel' placeholder='Address' form='form219_"+id+"'>"+address+"</textarea>";
                            rowsHTML+="<input type='text' class='floatlabel' placeholder='Phone' readonly='readonly' value='"+result.phone+"' form='form219_"+id+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Details'>";
                            rowsHTML+="<input type='number' class='floatlabel' placeholder='COD Amount' readonly='readonly' form='form219_"+id+"' value='"+result.collectable_value+"' step='any'>";
                            rowsHTML+="<input type='number'  class='floatlabel' placeholder='Weight' readonly='readonly' form='form219_"+id+"' value='"+result.weight+"' step='any'>";
                            rowsHTML+="<input type='number' readonly='readonly' class='floatlabel_right' placeholder='Pieces' form='form219_"+id+"' value='"+result.pieces+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Status'>";
                            rowsHTML+="<input type='text' readonly='readonly' form='form219_"+id+"' value='"+result.status+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' form='form219_"+id+"' value='"+result.manifest_type+"'>";
                            rowsHTML+="<input type='hidden' form='form219_"+id+"' value='"+result.order_num+"'>";
                            rowsHTML+="<input type='hidden' form='form219_"+id+"' value='"+result.merchant_name+"'>";
                            rowsHTML+="<input type='hidden' form='form219_"+id+"' value='"+id+"'>";
                            rowsHTML+="<input type='button' name='save' class='submit_hidden' form='form219_"+id+"' id='save_form219_"+id+"'>";
                            rowsHTML+="<button type='button' name='delete' class='btn red' form='form219_"+id+"' id='delete_form219_"+id+"' onclick='form219_delete_item($(this));form219_update_serial_numbers();'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="<input type='hidden' form='form219_"+id+"' value='"+result.ship_to+"'>";
                        rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form219_body').append(rowsHTML);

                    var item_form=document.getElementById('form219_'+id);
                    var save_button=item_form.elements['save'];

                    $(save_button).on('click',function (e)
                    {
                        e.preventDefault();
                        form219_update_item(item_form);
                    });
                });

                $('#form219_share').off('click');
                $('#form219_share').on('click',function()
                {
                    modal101_action('Delivery Run Sheet',filter_fields.elements['employee'].value,'staff',function (func)
                    {
                        print_form219(func);
                    });
                });

                form219_update_serial_numbers();
                $('#form219').formcontrol();
                hide_loader();
            });
        }
    }

    function form219_add_item()
    {
        if(is_create_access('form219'))
        {
            var id=get_new_key();
            var rowsHTML="<tr>";
            rowsHTML+="<form id='form219_"+id+"'></form>";
                rowsHTML+="<td data-th='S.No.'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='AWB #'>";
                    rowsHTML+="<input type='text' required form='form219_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Address'>";
                    rowsHTML+="<textarea readonly='readonly' class='floatlabel' placeholder='Address' form='form219_"+id+"'></textarea>";
                    rowsHTML+="<input type='text' readonly='readonly' class='floatlabel' placeholder='Phone' form='form219_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Details'>";
                    rowsHTML+="<input type='number' class='floatlabel' placeholder='COD Amount' readonly='readonly' form='form219_"+id+"' step='any'>";
                    rowsHTML+="<input type='number' class='floatlabel' placeholder='Weight' readonly='readonly' form='form219_"+id+"' step='any'>";
                    rowsHTML+="<input type='number' class='floatlabel_right' placeholder='Pieces' readonly='readonly' form='form219_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Status'>";
                    rowsHTML+="<input type='text' readonly='readonly' form='form219_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Action'>";
                    rowsHTML+="<input type='hidden' form='form219_"+id+"' name='manifest_type'>";
                    rowsHTML+="<input type='hidden' form='form219_"+id+"' name='order_num'>";
                    rowsHTML+="<input type='hidden' form='form219_"+id+"' name='merchant_name'>";
                    rowsHTML+="<input type='hidden' form='form219_"+id+"' value='"+id+"'>";
                    rowsHTML+="<input type='button' name='save' class='submit_hidden' form='form219_"+id+"' id='save_form219_"+id+"'>";
                    rowsHTML+="<button type='button' name='delete' class='btn red' form='form219_"+id+"' id='delete_form219_"+id+"' onclick='$(this).parent().parent().remove(); form219_update_serial_numbers();'><i class='fa fa-trash'></i></button>";
                    rowsHTML+="<input type='hidden' form='form219_"+id+"' name='ship_to'>";
                    rowsHTML+="<input type='submit' class='submit_hidden' form='form219_"+id+"'>";
                    rowsHTML+="<input type='hidden' form='form219_"+id+"' name='order_history'>";
                rowsHTML+="</td>";
            rowsHTML+="</tr>";

            $('#form219_body').prepend(rowsHTML);

            var item_form=document.getElementById('form219_'+id);
            var awb_filter=item_form.elements[0];
            var address_filter=item_form.elements[1];
            var phone_filter=item_form.elements[2];
            var cod_filter=item_form.elements[3];
            var weight_filter=item_form.elements[4];
            var pieces_filter=item_form.elements[5];
            var status_filter=item_form.elements[6];
            var manifest_type_filter=item_form.elements[7];
            var order_num_filter=item_form.elements[8];
            var merchant_filter=item_form.elements[9];
            var id_filter=item_form.elements[10];
            var save_button=item_form.elements['save'];
            var ship_to=item_form.elements['ship_to'];
            var order_history=item_form.elements['order_history'];

            var new_drs=true;
            var saved=document.getElementById('form219_master').elements['saved'].value;
            if(saved=='yes')
            {
                new_drs=false;
            }

            $(item_form).on("submit", function(event)
            {
                event.preventDefault();

                var total_entries=0;
                var double_entry=0;
                $("[id^='save_form219']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);
                    total_entries+=1;
                    if(subform.elements[0].value==awb_filter.value)
                        double_entry+=1;
                });

                if(total_entries==1 && new_drs)
                {
                    form219_create_form(function ()
                    {
                        if(double_entry<2)
                        {
                            form219_create_item(item_form);
                            form219_add_item();
                        }
                        else
                        {
                            awb_filter.value="";
                            $("#modal65_link").click();
                        }
                    });
                }
                else
                {
                    if(double_entry<2)
                    {
                        form219_create_item(item_form);
                        form219_add_item();
                    }
                    else
                    {
                        awb_filter.value="";
                        $("#modal65_link").click();
                    }
                }
            });

            $(awb_filter).focus();

            $(awb_filter).on('keydown',function (event)
            {
                if(event.keyCode == 13 )
                {
                    event.preventDefault();

                    var total_entries=0;
                    var double_entry=0;
                    $("[id^='save_form219']").each(function(index)
                    {
                        var subform_id=$(this).attr('form');
                        var subform=document.getElementById(subform_id);

                        total_entries+=1;
                        if(subform.elements[0].value==awb_filter.value)
                            double_entry+=1;
                    });

                    if(total_entries==1 && new_drs)
                    {
                        form219_create_form(function ()
                        {
                            if(double_entry<2)
                            {
                                var status_object={index:'status',array:['received','undelivered','pending']};
                                if(get_session_var('drs_restriction')=='no')
                                {
                                    status_object={index:'status'};
                                }
                                var orders_data={data_store:'logistics_orders',count:1,
                                                indexes:[{index:'id'},
                                                        {index:'address1'},
                                                        {index:'address2'},
                                                        {index:'city'},
                                                        {index:'pincode'},
                                                        {index:'type'},
                                                        {index:'awb_num',exact:awb_filter.value},
                                                        {index:'manifest_type',exact:'COD'},
                                                        {index:'order_num'},
                                                        {index:'merchant_name'},
                                                        {index:'ship_to'},
                                                        {index:'phone'},
                                                        {index:'collectable_value'},
                                                        {index:'weight'},
                                                        {index:'pieces'},
                                                        {index:'drs_num'},
                                                        {index:'order_history'},
                                                        status_object]};

                                read_json_rows('',orders_data,function (orders)
                                {
                                    //console.log(orders);
                                    if(orders.length>0)
                                    {
                                        address_filter.value=orders[0].ship_to+"\n"+orders[0].address1+", "+orders[0].address2+", "+orders[0].city+"-"+orders[0].pincode;
                                        phone_filter.value=orders[0].phone;
                                        weight_filter.value=orders[0].weight;
                                        pieces_filter.value=orders[0].pieces;
                                        status_filter.value=orders[0].status;
                                        cod_filter.value=orders[0].collectable_value;
                                        manifest_type_filter.value=orders[0].manifest_type;
                                        order_num_filter.value=orders[0].order_num;
                                        id_filter.value=orders[0].id;
                                        merchant_filter.value=orders[0].merchant_name;
                                        order_history.value=orders[0].order_history;
                                        ship_to.value=orders[0].ship_to;
                                        form219_create_item(item_form);
                                        form219_add_item();
                                    }
                                    else
                                    {
                                        address_filter.value="";
                                        phone_filter.value="";
                                        weight_filter.value="";
                                        pieces_filter.value="";
                                        status_filter.value="";
                                        cod_filter.value="";
                                        manifest_type_filter.value="";
                                        order_num_filter.value="";
                                        id_filter.value="";
                                        merchant_filter.value="";
                                        order_history.value="";
                                        ship_to.value="";
                                        awb_filter.value="";
                                        $("#modal65_link").click();
                                    }
                                });
                            }
                            else
                            {
                                awb_filter.value="";
                                $("#modal65_link").click();
                            }
                        });
                    }
                    else
                    {
                        if(double_entry<2)
                        {
                            var status_object={index:'status',array:['received','undelivered','pending']};
                                if(get_session_var('drs_restriction')=='no')
                                {
                                    status_object={index:'status'};
                                }
                                var orders_data={data_store:'logistics_orders',count:1,
                                                indexes:[{index:'id'},
                                                        {index:'address1'},
                                                        {index:'address2'},
                                                        {index:'city'},
                                                        {index:'pincode'},
                                                        {index:'type'},
                                                        {index:'awb_num',exact:awb_filter.value},
                                                        {index:'manifest_type',exact:'COD'},
                                                        {index:'order_num'},
                                                        {index:'merchant_name'},
                                                        {index:'ship_to'},
                                                        {index:'phone'},
                                                        {index:'collectable_value'},
                                                        {index:'weight'},
                                                        {index:'pieces'},
                                                        {index:'drs_num'},
                                                        {index:'order_history'},
                                                        status_object]};
                                //console.log(orders_data);
                            read_json_rows('',orders_data,function (orders)
                            {
                                //console.log(orders);
                                if(orders.length>0)
                                {
                                    address_filter.value=orders[0].ship_to+"\n"+orders[0].address1+", "+orders[0].address2+", "+orders[0].city+"-"+orders[0].pincode;
                                    phone_filter.value=orders[0].phone;
                                    weight_filter.value=orders[0].weight;
                                    pieces_filter.value=orders[0].pieces;
                                    status_filter.value=orders[0].status;
                                    cod_filter.value=orders[0].collectable_value;
                                    manifest_type_filter.value=orders[0].manifest_type;
                                    order_num_filter.value=orders[0].order_num;
                                    id_filter.value=orders[0].id;
                                    merchant_filter.value=orders[0].merchant_name;
                                    order_history.value=orders[0].order_history;
                                    ship_to.value=orders[0].ship_to;
                                    form219_create_item(item_form);
                                    form219_add_item();
                                }
                                else
                                {
                                    address_filter.value="";
                                    phone_filter.value="";
                                    weight_filter.value="";
                                    pieces_filter.value="";
                                    status_filter.value="";
                                    cod_filter.value="";
                                    manifest_type_filter.value="";
                                    order_num_filter.value="";
                                    id_filter.value="";
                                    merchant_filter.value="";
                                    order_history.value="";
                                    ship_to.value="";
                                    awb_filter.value="";
                                    $("#modal65_link").click();
                                }
                            });
                        }
                        else
                        {
                            awb_filter.value="";
                            $("#modal65_link").click();
                        }
                    }
                }
            });
            $('#form219').formcontrol();
            form219_update_serial_numbers();
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form219_create_item(form)
    {
        if(is_create_access('form219'))
        {
            var drs_num=document.getElementById('form219_master').elements['drs_num'].value;
            var drs_id=document.getElementById('form219_master').elements['id'].value;
            var drs_date=document.getElementById('form219_master').elements['date'].value;
            var delivery_person=document.getElementById('form219_master').elements['employee'].value;
            var data_id=form.elements[10].value;
            var save_button=form.elements['save'];
            var del_button=form.elements['delete'];
            var last_updated=get_my_time();

            var old_order_history=form.elements[15].value;

            var order_history=vUtil.jsonParse(old_order_history);

            var history_object=new Object();
            history_object.timeStamp=get_my_time();
            history_object.details="Order Out for delivery";
            history_object.location=get_session_var('address');
            history_object.status="Out for delivery";
            order_history.push(history_object);
            var order_history_string=JSON.stringify(order_history);

            var data_json={data_store:'logistics_orders',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:'out for delivery'},
	 					{index:'drs_num',value:drs_num},
	 					{index:'drs_id',value:drs_id},
	 					{index:'delivery_person',value:delivery_person},
                        {index:'order_history',value:order_history_string},
                        {index:'drs_time',value:get_raw_time(drs_date)},
                        {index:'last_updated',value:last_updated}]};

            update_json(data_json);

            $(form).readonly();

            del_button.removeAttribute("onclick");
            $(del_button).on('click',function(event)
            {
                form219_delete_item(del_button);
            });

            $(save_button).off('click');
            $(save_button).on('click',function(event)
            {
                event.preventDefault();
                form219_update_item(form);
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form219_create_form(func)
    {
        if(is_create_access('form219'))
        {
            form219_update_serial_numbers();
            var form=document.getElementById("form219_master");

            var drs_num=form.elements['drs_num'].value;
            var employee=form.elements['employee'].value;
            var ddate=get_raw_time(form.elements['date'].value);
            var collectable_amount=form.elements['total'].value;
            var data_id=form.elements['id'].value;
            var branch=form.elements['branch'].value;
            form.elements['saved'].value='yes';

            $('#form219_share').off('click');
            $('#form219_share').on('click',function()
            {
                modal101_action('Delivery Run Sheet',employee,'staff',function (func)
                {
                    print_form219(func);
                });
            });

            var last_updated=get_my_time();

            var drs_columns={data_store:'drs',count:1,return_column:'id',indexes:[{index:'drs_num',exact:drs_num}]};
            read_json_single_column(drs_columns,function(drses)
            {
                //console.log(drses);
                if(drses.length==0)
                {
                    var data_json={data_store:'drs',
	 				data:[{index:'id',value:data_id},
	 					{index:'drs_num',value:drs_num},
	 					{index:'employee',value:employee},
	 					{index:'drs_time',value:ddate},
	 					{index:'type',value:'COD'},
                        {index:'collectable_amount',value:collectable_amount},
                        {index:'branch',value:branch},
                        {index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Generated',notes:'DRS #'+drs_num,link_to:'form201'}};

                    create_json(data_json);

                    var num_data={data_store:'user_preferences',return_column:'id',indexes:[{index:'name',exact:'drs_num'}]};
                    read_json_single_column(num_data,function (drs_num_ids)
                    {
                        if(drs_num_ids.length>0)
                        {
                            var num_json={data_store:'user_preferences',
                            data:[{index:'id',value:drs_num_ids[0]},
                                {index:'value',value:(parseInt(drs_num)+1)},
                                {index:'last_updated',value:last_updated}]};

                            update_json(num_json);
                        }
                    });

                    if(typeof func!='undefined')
                    {
                        func();
                    }
                }
                else
                {
                    $("#modal68_link").click();
                }
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form219_update_item(form)
    {
        if(is_update_access('form219'))
        {
            var drs_num=document.getElementById('form219_master').elements['drs_num'].value;
            var delivery_person=document.getElementById('form219_master').elements['employee'].value;
            var data_id=form.elements[10].value;
            var last_updated=get_my_time();

            var data_json={data_store:'logistics_orders',
	 				data:[{index:'id',value:data_id},
	 					{index:'drs_num',value:drs_num},
	 					{index:'delivery_person',value:delivery_person},
                        {index:'last_updated',value:last_updated}]};

            update_json(data_json);
        }
        else
        {
            $("#modal2_link").click();
        }
    }


    function form219_update_serial_numbers()
    {
        $('#form219_body').find('tr').each(function(index)
        {
            $(this).find('td:nth-child(2)').html(index+1);
        });

        var total_amount=0;
        var num_orders=0;

        $("[id^='save_form219']").each(function(index)
        {
            var subform_id=$(this).attr('form');
            var subform=document.getElementById(subform_id);

            if(subform.elements[0].value!="")
            {
                num_orders+=1;
            }
            if(!isNaN(parseFloat(subform.elements[3].value)))
            {
                total_amount+=parseFloat(subform.elements[3].value);
            }
        });

        var form=document.getElementById("form219_master");
        form.elements['total'].value=total_amount;
        form.elements['num_orders'].value=num_orders;
    }

    function form219_update_form()
    {
        if(is_create_access('form219'))
        {
            form219_update_serial_numbers();
            var form=document.getElementById("form219_master");

            var drs_num=form.elements['drs_num'].value;
            var employee=form.elements['employee'].value;
            var ddate=get_raw_time(form.elements['date'].value);
            var collectable_amount=form.elements['total'].value;
            var data_id=form.elements['id'].value;

            $('#form219_share').off('click');
            $('#form219_share').on('click',function()
            {
                modal101_action('Delivery Run Sheet',employee,'staff',function (func)
                {
                    print_form219(func);
                });
            });

            var last_updated=get_my_time();

            var drs_columns={data_store:'drs',count:2,indexes:[{index:'id'},{index:'drs_num',exact:drs_num}]};
            read_json_rows('',drs_columns,function(drses)
            {
                if(drses.length==0 || (drses.length==1 && drses[0].id==data_id))
                {
                    var data_json={data_store:'drs',
	 				data:[{index:'id',value:data_id},
	 					{index:'drs_num',value:drs_num},
	 					{index:'employee',value:employee},
	 					{index:'collectable_amount',value:collectable_amount},
	 					{index:'drs_time',value:ddate},
	 					{index:'last_updated',value:last_updated}],
                    log:'yes',
                    log_data:{title:'Updated',notes:'DRS #'+drs_num,link_to:'form201'}};

                    update_json(data_json);

                    $("[id^='save_form219_']").click();
                }
                else
                {
                    $("#modal68_link").click();
                }
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form219_delete_item(button)
    {
        if(is_delete_access('form219'))
        {
            modal115_action(function()
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var data_id=form.elements[10].value;
                var last_updated=get_my_time();

                var data_json={data_store:'logistics_orders',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:'pending'},
	 					{index:'drs_num',value:''},
	 					{index:'drs_time',value:''},
                        {index:'drs_id',value:''},
                        {index:'delivery_person',value:''},
	 					{index:'last_updated',value:last_updated}]};

                update_json(data_json);
                $(button).parent().parent().remove();
                form219_update_serial_numbers();
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form219_print_form()
    {
        print_form219(function(container)
        {
            $.print(container);
            container.innerHTML="";
        });
    }

    function print_form219(func)
    {
        var form_id='form219';

        ////////////setting up containers///////////////////////
        var container=document.createElement('div');

        var header=document.createElement('div');
            var logo=document.createElement('div');
            var business_title=document.createElement('div');
            var drs_barcode=document.createElement('img');

        var drs_title=document.createElement('div');

        var detail_section=document.createElement('div');

        var table_container=document.createElement('div');

        ////////////setting styles for containers/////////////////////////

        container.setAttribute('style','width:98%;height:90%;max-height:90%;margin:0px;padding:0px;');
        header.setAttribute('style','display:block;width:100%;min-height:70px;margin-top:10px;');
            logo.setAttribute('style','float:left;width:35%;height:60px;');
            business_title.setAttribute('style','float:left;width:40%;height:60px;text-align:center;font-weight:bold;');
            drs_barcode.setAttribute('style','float:right;width:20%;height:60px;padding:left:5px;padding-right:5px;');

        drs_title.setAttribute('style','display:block;width:100%;min-height:20px;text-align:center');
        detail_section.setAttribute('style','display:block;width:100%;min-height:30px;text-align:center;');

        ///////////////getting the content////////////////////////////////////////

        var bt=get_session_var('title');
        var font_size=get_session_var('print_size');
        var logo_image=get_session_var('logo');

        var master_form=document.getElementById(form_id+'_master');
        var employee_name=master_form.elements['employee'].value;
        var drs_date=master_form.elements['date'].value;
        var drs_num=master_form.elements['drs_num'].value;
        var page_num=1;

        ////////////////filling in the content into the containers//////////////////////////

        var table_element=document.getElementById(form_id+'_body');

        var total_items=$(table_element).find('tr').length;

        logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"' style='height:120%;margin-left:20%'>";
        business_title.innerHTML=bt;

        $(drs_barcode).JsBarcode(drs_num,{displayValue:true});

        drs_title.innerHTML="Delivery Run Sheet";

        var employee_text="<td>Employee: "+employee_name+"</td><td>Total Items: "+total_items+"</td>";
        var drs_text="<td>DRS #: "+drs_num+"</td><td>DRS Date: "+drs_date+"</td>";
        var detail_text="<table style='border:none;width:100%;font-size:11px;'><tr>"+employee_text+"</tr><tr>"+drs_text+"</tr></table>";

        detail_section.innerHTML=detail_text;

        var new_table=document.createElement('table');
        new_table.setAttribute('style','font-size:10px;border:none;text-align:left;');
        new_table.setAttribute('class','printing_tables');

        var table_header="<tr style='border-top: 1px solid #000000;'><td style='text-align:left;width:4%'>S.No.</td>"+
                    "<td style='text-align:left;width:19%'>C-Note No.</td>"+
                    "<td style='text-align:left;width:11%'>Address</td>"+
                    "<td style='text-align:left;width:5%'>Wt.</td>"+
                    "<td style='text-align:left;width:5%'>P</td>"+
                    "<td style='text-align:left;width:10%'>Amount</td>"+
                    "<td style='text-align:left;width:25%'>Receiver/Comp Seal</td>"+
                    "<td style='text-align:left;width:4%'>RC</td>"+
                    "<td style='text-align:left;width:15%'>Sign</td></tr>";

        var table_rows=table_header;
        var counter=0;

        var td_text="<td style='border:solid 1px #000000'></td>";
        var tr_text="<tr>"+td_text+td_text+td_text+td_text+td_text+td_text+td_text+td_text+td_text+td_text+"</tr>";
        var rc="<table style='width:15px;height:15px;'><tr>"+td_text+"</tr></table>";

        $(table_element).find('form').each(function(index)
        {
            counter+=1;
            var form=$(this)[0];
            var mob_seal="<table style='width:95%;height:40px;'>"+tr_text+tr_text+"</table><br><div style='font-size:14px;'>"+form.elements[2].value+"</div>";

            var awb_num=""+form.elements[0].value;
            var manifest_type=form.elements[7].value;//.replace(/manifest/g,"");
            var order_id=form.elements[8].value;
            var merchant_name=form.elements[9].value;
            var ship_to=form.elements[13].value;

            var cnote_no=document.createElement('div');
            var barcode_image=document.createElement('img');
            var barcode_value=document.createElement('div');
            var type_value=document.createElement('div');
            var merchant_value=document.createElement('div');

            barcode_image.setAttribute('style','width:130px;height:30px;');
            barcode_value.setAttribute('style','width:130px;font-size:14px;margin:1px;text-align:center;');
            type_value.setAttribute('style','width:130px;font-size:9px;margin:1px;text-align:left;');
            merchant_value.setAttribute('style','width:130px;font-size:14px;margin:1px;text-align:left;');

            barcode_value.innerHTML=awb_num;
            type_value.innerHTML="Type: "+manifest_type+" O-ID: "+order_id;
            merchant_value.innerHTML=ship_to;
            $(barcode_image).JsBarcode(awb_num,{displayValue:false});

            cnote_no.appendChild(barcode_image);
            cnote_no.appendChild(barcode_value);
            cnote_no.appendChild(type_value);
            cnote_no.appendChild(merchant_value);

            table_rows+="<tr style='border-top: 1px solid #000000;height:60px;'><td><div>"+counter+"</div></td>"+
                    "<td><div style='text-align:left;'>"+cnote_no.innerHTML+"</div></td>"+
                    "<td><div style='text-align:left;'>"+form.elements[1].value+"</div></td>"+
                    "<td><div>"+form.elements[4].value+"</div></td>"+
                    "<td><div>"+form.elements[5].value+"</div></td>"+
                    "<td><div>Rs. "+form.elements[3].value+"</div></td>"+
                    "<td><div style='text-align:left;'>"+mob_seal+"</div></td>"+
                    "<td><div>"+rc+"</div></td>"+
                    "<td></td></tr>";
        });
        new_table.innerHTML=table_rows;
        /////////////placing the containers //////////////////////////////////////////////////////

        container.appendChild(header);
        container.appendChild(drs_title);
        container.appendChild(detail_section);

        container.appendChild(new_table);

        header.appendChild(logo);
        header.appendChild(business_title);
        header.appendChild(drs_barcode);

        func(container);
    }

    </script>
</div>
