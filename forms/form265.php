<div id='form265' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form265_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form265_save'>Save <i class='fa fa-save'></i></a>
		</div>
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form265_print' onclick=form265_print_form();><i class='fa fa-print'></i> Print</a>
        <a class='btn btn-default btn-sm' id='form265_share'><i class='fa fa-envelope'></i> Email</a>
      </div>
	</div>

	<div class="portlet-body">
        <form id='form265_master' autocomplete="off">
            <fieldset>
                <label><input type='text' required name='rto_num' class='floatlabel' placeholder='RTO #'></label>
                <label><input type='text' required name='employee' class='floatlabel' placeholder='Employee'></label>
                <label><input type='text' name='date' required class='floatlabel' placeholder='RTO Date'></label>
                <label><input type='text' name='num_orders' readonly="readonly" class='floatlabel' placeholder='# of Orders'></label>
                <label><input type='text' name='branch' class='floatlabel' readonly='readonly' placeholder='Branch'></label>
                <input type='hidden' name='id'>
                <input type='hidden' name='saved'>
                <input type='submit' class='submit_hidden'>
            </fieldset>
        </form>

        <br>

        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr style='color:#9a9a9a;'>
                    <th>S. No.</th>
					<th>AWB #</th>
					<th>Address</th>
					<th>Details</th>
					<th>Status</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form265_body'>
			</tbody>
        </table>
    </div>

    <script>
    function form265_header_ini()
    {
        var fields=document.getElementById('form265_master');

        var rto_filter=fields.elements['rto_num'];
        var employee=fields.elements['employee'];
        var rto_date=fields.elements['date'];
        var branch=fields.elements['branch'];

        fields.elements['saved'].value='no';
        fields.elements['id'].value=vUtil.newKey();

        var save_button=document.getElementById('form265_save');
        rto_filter.value="";
        employee.value="";

        var rto_id=$("#form265_link").attr('data_id');
        if(rto_id==null)
            rto_id="";

        if(rto_id=="")
        {
            var rto_num_data={data_store:'user_preferences',count:1,return_column:'value',
                             indexes:[{index:'name',exact:'rto_num'}]};
            set_my_value_json(rto_num_data,rto_filter);
        }

        $(save_button).off('click');
        $(save_button).on("click", function(event)
        {
            event.preventDefault();
            form265_update_form();
        });

        $(document).off('keydown');
        $(document).on('keydown', function(event) {
            if( event.keyCode == 83 && event.ctrlKey) {
                event.preventDefault();
                $(save_button).trigger('click');
            }
        });

        var acc_name=get_account_name();
        var branch_data={data_store:'store_areas',return_column:'name',
                        indexes:[{index:'owner',exact:acc_name}]};
        set_my_value_json(branch_data,branch);

        $(fields).off('submit');
        $(fields).on("submit", function(event)
        {
            event.preventDefault();
            form265_add_item();
        });

        var employee_data={data_store:'staff',return_column:'acc_name'};
        set_my_value_list_json(employee_data,employee,function ()
        {
            $(employee).focus();
        });

        $(rto_date).datepicker();
        rto_date.value=vTime.date();
				//rto_date.value=vTime.date();
        $('#form265').formcontrol();
        var paginator=$('#form265_body').paginator({visible:false});

    }

    function form265_ini()
    {
        var rto_id=$("#form265_link").attr('data_id');
        if(rto_id==null)
            rto_id="";
        $('#form265_body').html("");

        if(rto_id!="")
        {
            show_loader();

            var filter_fields=document.getElementById('form265_master');

            var paginator=$('#form265_body').paginator({visible:false});

            var rto_columns={data_store:'rto',
                            indexes:[{index:'id',value:rto_id},
                                    {index:'rto_num'},
                                    {index:'employee'},
                                    {index:'rto_time'},
                                    {index:'branch'}]};

            read_json_rows('form265',rto_columns,function(rto_results)
            {
                if(rto_results.length>0)
                {
                    filter_fields.elements['rto_num'].value=rto_results[0].rto_num;
                    filter_fields.elements['employee'].value=rto_results[0].employee;
                    filter_fields.elements['date'].value=get_my_past_date(rto_results[0].rto_time);
                    filter_fields.elements['id'].value=rto_results[0].id;
                    filter_fields.elements['branch'].value=rto_results[0].branch;
                    filter_fields.elements['saved'].value='yes';

                    var save_button=document.getElementById('form265_save');
                }
            });

            var rto_items_column={data_store:'logistics_orders',
                                 indexes:[{index:'id'},
                                         {index:'awb_num'},
                                         {index:'manifest_type'},
                                         {index:'order_num'},
                                         {index:'merchant_name'},
                                         {index:'ship_to'},
                                         {index:'return_address1'},
                                         {index:'return_address2'},
                                         {index:'return_address3'},
                                         {index:'return_pincode'},
                                         {index:'vendor_phone'},
                                         {index:'weight'},
                                         {index:'pieces'},
                                         {index:'status'},
                                         {index:'rto_num'},
                                         {index:'rto_id',exact:rto_id}]};

            read_json_rows('form265',rto_items_column,function(results)
            {
                results.forEach(function(result)
                {
                    var id=result.id;
                    var rowsHTML="<tr>";

                    var address=result.merchant_name+"\n"+result.return_address1+", "+result.return_address2+", "+result.return_address3+"-"+result.return_pincode;
                    rowsHTML+="<form id='form265_"+id+"'></form>";
                        rowsHTML+="<td data-th='S.No.'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='AWB #'>";
                            rowsHTML+="<a onclick=\"element_display('','form198');form198_ini('"+result.awb_num+"');\"><input type='text' readonly='readonly' form='form265_"+id+"' value='"+result.awb_num+"'></a>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Address'>";
                            rowsHTML+="<textarea readonly='readonly' form='form265_"+id+"'>"+address+"</textarea>";
                            rowsHTML+="<input type='text' class='floatlabel' placeholder='Phone' readonly='readonly' value='"+result.vendor_phone+"' form='form265_"+id+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Details'>";
                            rowsHTML+="<input type='number' placeholder='Weight' class='floatlabel' readonly='readonly' form='form265_"+id+"' value='"+result.weight+"' step='any'>";
                            rowsHTML+="<input type='number' placeholder='Pieces' class='floatlabel' readonly='readonly' form='form265_"+id+"' value='"+result.pieces+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Status'>";
                            rowsHTML+="<input type='text' readonly='readonly' form='form265_"+id+"' value='"+result.status+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' form='form265_"+id+"' value='"+result.manifest_type+"'>";
                            rowsHTML+="<input type='hidden' form='form265_"+id+"' value='"+result.order_num+"'>";
                            rowsHTML+="<input type='hidden' form='form265_"+id+"' value='"+result.ship_to+"'>";
                            rowsHTML+="<input type='hidden' form='form265_"+id+"' value='"+id+"'>";
                            rowsHTML+="<input type='button' name='save' class='submit_hidden' form='form265_"+id+"' id='save_form265_"+id+"'>";
                            rowsHTML+="<button type='button' class='btn red' form='form265_"+id+"' id='delete_form265_"+id+"' name='delete' onclick='form265_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="<input type='hidden' form='form265_"+id+"' value='"+result.merchant_name+"'>";
                        rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form265_body').append(rowsHTML);

                    var item_form=document.getElementById('form265_'+id);
                    var save_button=item_form.elements['save'];

                    $(save_button).on('click',function (e)
                    {
                        e.preventDefault();
                        form265_update_item(item_form);
                    });
                });

                $('#form265_share').off('click');
                $('#form265_share').click(function()
                {
                    modal101_action('RTO Sheet',filter_fields.elements['employee'].value,'staff',function (func)
                    {
                        print_form265(func);
                    });
                });

                form265_update_serial_numbers();
                $('#form265').formcontrol();
                hide_loader();
            });
        }
    }

    function form265_add_item()
    {
        if(is_create_access('form265'))
        {
            var id=vUtil.newKey();
            var rowsHTML="<tr>";
            rowsHTML+="<form id='form265_"+id+"'></form>";
                rowsHTML+="<td data-th='S.No.'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='AWB #'>";
                    rowsHTML+="<input type='text' required form='form265_"+id+"' oninvalid=\"setCustomValidity('This AWB # is invalid')\">";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Address'>";
                    rowsHTML+="<textarea placeholder='Address' readonly='readonly' form='form265_"+id+"'></textarea>";
                    rowsHTML+="<input class='floatlabel' placeholder='Phone' type='text' readonly='readonly' form='form265_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Details'>";
                    rowsHTML+="<input type='number' class='floatlabel' placeholder='Weight' readonly='readonly' form='form265_"+id+"' step='any'>";
                    rowsHTML+="<input type='number' class='floatlabel' placeholder='Pieces' readonly='readonly' form='form265_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Status'>";
                    rowsHTML+="<input type='text' readonly='readonly' form='form265_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Action'>";
                    rowsHTML+="<input type='hidden' form='form265_"+id+"' name='manifest_type'>";
                    rowsHTML+="<input type='hidden' form='form265_"+id+"' name='order_num'>";
                    rowsHTML+="<input type='hidden' form='form265_"+id+"' name='ship_to'>";
                    rowsHTML+="<input type='hidden' form='form265_"+id+"' value='"+id+"'>";
                    rowsHTML+="<input type='button' class='submit_hidden' form='form265_"+id+"' id='save_form265_"+id+"' name='save'>";
                    rowsHTML+="<button type='button' class='btn red' form='form265_"+id+"' id='delete_form265_"+id+"' onclick='$(this).parent().parent().remove(); form265_update_serial_numbers();' name='delete'><i class='fa fa-trash'></i></button>";
                    rowsHTML+="<input type='hidden' form='form265_"+id+"' name='merchant_name'>";
                    rowsHTML+="<input type='submit' class='submit_hidden' form='form265_"+id+"'>";
                    rowsHTML+="<input type='hidden' form='form265_"+id+"' name='order_history'>";
                rowsHTML+="</td>";
            rowsHTML+="</tr>";

            $('#form265_body').prepend(rowsHTML);

            var item_form=document.getElementById('form265_'+id);
            var awb_filter=item_form.elements[0];
            var address_filter=item_form.elements[1];
            var phone_filter=item_form.elements[2];
            var weight_filter=item_form.elements[3];
            var pieces_filter=item_form.elements[4];
            var status_filter=item_form.elements[5];
            var manifest_type_filter=item_form.elements[6];
            var order_num_filter=item_form.elements[7];
            var ship_to=item_form.elements[8];
            var id_filter=item_form.elements[9];
            var save_button=item_form.elements['save'];
            var merchant_filter=item_form.elements[12];
            var order_history=item_form.elements[14];

            var new_rto=true;
            var saved=document.getElementById('form265_master').elements['saved'].value;
            if(saved=='yes')
            {
                new_rto=false;
            }

            $(item_form).on("submit", function(event)
            {
                event.preventDefault();
                var total_entries=0;
                var double_entry=0;
                $("[id^='save_form265']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);
                    total_entries+=1;
                    if(subform.elements[0].value==awb_filter.value)
                        double_entry+=1;
                });

                if(total_entries==1 && new_rto)
                {
                    form265_create_form(function()
                    {
                        if(double_entry<2)
                        {
                            form265_create_item(item_form);
                            form265_add_item();
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
                        form265_create_item(item_form);
                        form265_add_item();
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
                    $("[id^='save_form265']").each(function(index)
                    {
                        var subform_id=$(this).attr('form');
                        var subform=document.getElementById(subform_id);

                        total_entries+=1;

                        if(subform.elements[0].value==awb_filter.value)
                            double_entry+=1;
                    });

                    if(total_entries==1 && new_rto)
                    {
                        form265_create_form(function ()
                        {
                            if(double_entry<2)
                            {
                                var orders_data={data_store:'logistics_orders',count:1,
                                                indexes:[{index:'id'},
                                                        {index:'return_address1'},
                                                        {index:'return_address2'},
                                                        {index:'return_address3'},
                                                        {index:'return_pincode'},
                                                        {index:'type'},
                                                        {index:'awb_num',exact:awb_filter.value},
                                                        {index:'manifest_type'},
                                                        {index:'order_num'},
                                                        {index:'merchant_name'},
                                                        {index:'ship_to'},
                                                        {index:'vendor_phone'},
                                                        {index:'weight'},
                                                        {index:'pieces'},
                                                        {index:'rto_num'},
                                                        {index:'status'},
                                                        {index:'order_history'}]};
                                read_json_rows('',orders_data,function (orders)
                                {
                                    //console.log(orders);
                                    if(orders.length>0)
                                    {
                                        address_filter.value=orders[0].merchant_name+"\n"+orders[0].return_address1+", "+orders[0].return_address2+", "+orders[0].return_address3+"-"+orders[0].return_pincode;
                                        phone_filter.value=orders[0].vendor_phone;
                                        weight_filter.value=orders[0].weight;
                                        pieces_filter.value=orders[0].pieces;
                                        status_filter.value=orders[0].status;
                                        manifest_type_filter.value=orders[0].manifest_type;
                                        order_num_filter.value=orders[0].order_num;
                                        id_filter.value=orders[0].id;
                                        merchant_filter.value=orders[0].merchant_name;
                                        order_history.value=orders[0].order_history;
                                        ship_to.value=orders[0].ship_to;
                                        form265_create_item(item_form);
                                        form265_add_item();
                                    }
                                    else
                                    {
                                        address_filter.value="";
                                        phone_filter.value="";
                                        weight_filter.value="";
                                        pieces_filter.value="";
                                        status_filter.value="";
                                        manifest_type_filter.value="";
                                        order_num_filter.value="";
                                        id_filter.value="";
                                        merchant_filter.value="";
                                        order_history.value="";
                                        ship_to.value="";
                                        awb_filter.value="";
                                        $("#modal65_link").click();
                                    }
                                    $('#form265').formcontrol();
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
                            var orders_data={data_store:'logistics_orders',count:1,
                                                indexes:[{index:'id'},
                                                        {index:'return_address1'},
                                                        {index:'return_address2'},
                                                        {index:'return_address3'},
                                                        {index:'return_pincode'},
                                                        {index:'type'},
                                                        {index:'awb_num',exact:awb_filter.value},
                                                        {index:'manifest_type'},
                                                        {index:'order_num'},
                                                        {index:'merchant_name'},
                                                        {index:'ship_to'},
                                                        {index:'vendor_phone'},
                                                        {index:'weight'},
                                                        {index:'pieces'},
                                                        {index:'rto_num'},
                                                        {index:'status'},
                                                        {index:'order_history'}]};

                            read_json_rows('',orders_data,function (orders)
                            {
                               // console.log(orders);
                                if(orders.length>0)
                                {
                                    address_filter.value=orders[0].merchant_name+"\n"+orders[0].return_address1+", "+orders[0].return_address2+", "+orders[0].return_address3+"-"+orders[0].return_pincode;
                                    phone_filter.value=orders[0].vendor_phone;
                                    weight_filter.value=orders[0].weight;
                                    pieces_filter.value=orders[0].pieces;
                                    status_filter.value=orders[0].status;
                                    manifest_type_filter.value=orders[0].manifest_type;
                                    order_num_filter.value=orders[0].order_num;
                                    id_filter.value=orders[0].id;
                                    merchant_filter.value=orders[0].merchant_name;
                                    order_history.value=orders[0].order_history;
                                    ship_to.value=orders[0].ship_to;
                                    form265_create_item(item_form);
                                    form265_add_item();
                                }
                                else
                                {
                                    address_filter.value="";
                                    phone_filter.value="";
                                    weight_filter.value="";
                                    pieces_filter.value="";
                                    status_filter.value="";
                                    manifest_type_filter.value="";
                                    order_num_filter.value="";
                                    id_filter.value="";
                                    merchant_filter.value="";
                                    order_history.value="";
                                    ship_to.value="";
                                    awb_filter.value="";
                                    $("#modal65_link").click();
                                }
                                $('#form265').formcontrol();
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

            $('#form265').formcontrol();
            form265_update_serial_numbers();
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form265_create_item(form)
    {
        if(is_create_access('form265'))
        {
            var rto_num=document.getElementById('form265_master').elements['rto_num'].value;
            var rto_id=document.getElementById('form265_master').elements['id'].value;
            var rto_date=document.getElementById('form265_master').elements['date'].value;
            var delivery_person=document.getElementById('form265_master').elements['employee'].value;
            var data_id=form.elements[9].value;
            var save_button=form.elements['save'];
            var del_button=form.elements['delete'];
            var old_order_history=form.elements[14].value;

            var order_history=vUtil.jsonParse(old_order_history);
            var history_object={timeStamp:get_my_time(),
            					details:"Order Out for Return",
            					location:get_session_var('address'),
            					status:"RTO out for delivery"};
			if(order_history.length>0 && order_history[order_history.length-1]['status']!="RTO out for delivery")
			{
				order_history.push(history_object);
			}

            var order_history_string=JSON.stringify(order_history);

            var last_updated=get_my_time();
            var data_json={data_store:'logistics_orders',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:'RTO out for delivery'},
	 					{index:'rto_num',value:rto_num},
	 					{index:'rto_id',value:rto_id},
                        {index:'return_person',value:delivery_person},
                        {index:'order_history',value:order_history_string},
                        {index:'rto_time',value:get_raw_time(rto_date)},
                        {index:'last_updated',value:last_updated}]};

            update_json(data_json);

            $(form).readonly();

            del_button.removeAttribute("onclick");
            $(del_button).on('click',function(event)
            {
                form265_delete_item(del_button);
            });

            $(save_button).off('click');
            $(save_button).on('click',function(event)
            {
                event.preventDefault();
                form265_update_item(form);
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form265_create_form(func)
    {
        if(is_create_access('form265'))
        {
            var form=document.getElementById("form265_master");

            var rto_num=form.elements['rto_num'].value;
            var employee=form.elements['employee'].value;
            var ddate=get_raw_time(form.elements['date'].value);
            var data_id=form.elements['id'].value;
            var branch=form.elements['branch'].value;
            form.elements['saved'].value='yes';

            $('#form265_share').off('click');
            $('#form265_share').click(function()
            {
                modal101_action('RTO Sheet',employee,'staff',function (func)
                {
                    print_form265(func);
                });
            });

            var save_button=document.getElementById('form265_save');
            var last_updated=get_my_time();

            var rto_columns={data_store:'rto',count:1,return_column:'id',indexes:[{index:'rto_num',exact:rto_num}]};
            read_json_single_column(rto_columns,function(rtoes)
            {
                if(rtoes.length==0)
                {
                    var data_json={data_store:'rto',
                        data:[{index:'id',value:data_id},
                            {index:'rto_num',value:rto_num},
                            {index:'employee',value:employee},
                            {index:'rto_time',value:ddate},
                            {index:'branch',value:branch},
                            {index:'last_updated',value:last_updated}],
                        log:'yes',
                        log_data:{title:'Generated',notes:'RTO # '+rto_num,link_to:'form266'}};

                    var num_data={data_store:'user_preferences',return_column:'id',indexes:[{index:'name',exact:'rto_num'}]};
                    read_json_single_column(num_data,function (rto_num_ids)
                    {
                        if(rto_num_ids.length>0)
                        {
                            var num_json={data_store:'user_preferences',
                                data:[{index:'id',value:rto_num_ids[0]},
                                    {index:'value',value:(parseInt(rto_num)+1)},
                                    {index:'last_updated',value:last_updated}]};

                            update_json(num_json);
                        }
                    });

                    create_json(data_json);
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

    function form265_update_item(form)
    {
        if(is_update_access('form265'))
        {
            var rto_num=document.getElementById('form265_master').elements['rto_num'].value;
            var delivery_person=document.getElementById('form265_master').elements['employee'].value;
            var data_id=form.elements[9].value;
            var last_updated=get_my_time();

            var data_json={data_store:'logistics_orders',
                        data:[{index:'id',value:data_id},
                            {index:'rto_num',value:rto_num},
                            {index:'return_person',value:delivery_person},
                            {index:'last_updated',value:last_updated}]};
            update_json(data_json);
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form265_update_form()
    {
        if(is_create_access('form265'))
        {
            var form=document.getElementById("form265_master");

            var rto_num=form.elements['rto_num'].value;
            var employee=form.elements['employee'].value;
            var ddate=get_raw_time(form.elements['date'].value);
            var data_id=form.elements['id'].value;

            $('#form265_share').off('click');
            $('#form265_share').click(function()
            {
                modal101_action('RTO Sheet',employee,'staff',function (func)
                {
                    print_form265(func);
                });
            });

            var last_updated=get_my_time();

            var rto_columns={data_store:'rto',count:2,
                            indexes:[{index:'id'},{index:'rto_num',exact:rto_num}]};
            read_json_rows('',rto_columns,function(rtoes)
            {
				console.log(rtoes);
                if(rtoes.length==0 || (rtoes.length==1 && rtoes[0].id==data_id))
                {
                    var data_json={data_store:'rto',
                        data:[{index:'id',value:data_id},
                            {index:'rto_num',value:rto_num},
                            {index:'employee',value:employee},
                            {index:'rto_time',value:ddate},
                            {index:'last_updated',value:last_updated}],
                        log:'yes',
                        log_data:{title:'Updated',notes:'RTO # '+rto_num,link_to:'form266'}};

                    update_json(data_json);

                    $("[id^='save_form265_']").click();
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

    function form265_delete_item(button)
    {
        if(is_delete_access('form265'))
        {
            modal115_action(function()
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var data_id=form.elements[9].value;
                var last_updated=get_my_time();

                var data_json={data_store:'logistics_orders',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:'RTO pending'},
	 					{index:'rto_num',value:''},
	 					{index:'rto_id',value:''},
                        {index:'return_person',value:''},
                        {index:'last_updated',value:last_updated}]};

                update_json(data_json);
                $(button).parent().parent().remove();
                form265_update_serial_numbers();
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form265_update_serial_numbers()
    {
        $('#form265_body').find('tr').each(function(index)
        {
            $(this).find('td:nth-child(2)').html(index+1);
        });

        var num_orders=0;
        $("[id^='save_form265']").each(function(index)
        {
            var subform_id=$(this).attr('form');
            var subform=document.getElementById(subform_id);

            if(subform.elements[0].value!="")
            {
                num_orders+=1;
            }
        });

        var form=document.getElementById("form265_master");
        form.elements['num_orders'].value=num_orders;
    }

    function form265_print_form()
    {
        print_form265(function(container)
        {
            $.print(container);
            container.innerHTML="";
        });
    }

    function print_form265(func)
    {
        var form_id='form265';

        ////////////setting up containers///////////////////////
        var container=document.createElement('div');

        var header=document.createElement('div');
            var logo=document.createElement('div');
            var business_title=document.createElement('div');
            var rto_barcode=document.createElement('img');

        var rto_title=document.createElement('div');

        var detail_section=document.createElement('div');

        var table_container=document.createElement('div');

        ////////////setting styles for containers/////////////////////////

        container.setAttribute('style','width:98%;height:90%;margin:0px;padding:0px;');
        header.setAttribute('style','display:block;width:98%;height:70px;margin-top:10px;');
            logo.setAttribute('style','float:left;width:35%;height:60px;');
            business_title.setAttribute('style','float:left;width:40%;height:60px;text-align:center;font-weight:bold;');
            rto_barcode.setAttribute('style','float:right;width:23%;height:60px;padding:left:5px;padding-right:5px;');
        rto_title.setAttribute('style','display:block;width:98%;height:20px;text-align:center');
        detail_section.setAttribute('style','display:block;width:98%;height:30px;text-align:center;');

        ///////////////getting the content////////////////////////////////////////

        var bt=get_session_var('title');
        var font_size=get_session_var('print_size');
        var logo_image=get_session_var('logo');

        var master_form=document.getElementById(form_id+'_master');
        var employee_name=master_form.elements['employee'].value;
        var rto_date=master_form.elements['date'].value;
        //var print_date=master_form.elements['pdate'].value;
        var rto_num=master_form.elements['rto_num'].value;
        var page_num=1;

        ////////////////filling in the content into the containers//////////////////////////

        var table_element=document.getElementById(form_id+'_body');

        var total_items=$(table_element).find('tr').length;

        logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"' style='height:98%;margin-left:10%'>";
        business_title.innerHTML=bt;

        $(rto_barcode).JsBarcode(rto_num,{displayValue:false});

        rto_title.innerHTML="Return To Origin";

        employee_text="<td>Employee: "+employee_name+"</td><td>Total Items: "+total_items+"</td>";
        rto_text="<td>RTO #: "+rto_num+"</td><td>RTO Date: "+rto_date+"</td>";
        detail_text="<table style='border:none;width:98%;font-size:11px;'><tr>"+employee_text+"</tr><tr>"+rto_text+"</tr></table>";

        detail_section.innerHTML=detail_text;

        var new_table=document.createElement('table');
        new_table.setAttribute('style','font-size:10px;border:none;text-align:left;');
        new_table.setAttribute('class','printing_tables');

        var table_header="<tr style='border-top: 1px solid #000000;'><td style='text-align:left;width:4%'>S.No.</td>"+
                    "<td style='text-align:left;width:19%'>C-Note No.</td>"+
                    "<td style='text-align:left;width:11%'>Address</td>"+
                    "<td style='text-align:left;width:5%'>Wt.</td>"+
                    "<td style='text-align:left;width:5%'>P</td>"+
                    "<td style='text-align:left;width:5%'>Time</td>"+
                    "<td style='text-align:left;width:30%'>Receiver/Comp Seal</td>"+
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
            var manifest_type=form.elements[6].value;//.replace(/manifest/g,"");
            var order_id=form.elements[7].value;
            var ship_to=form.elements[8].value;
            var merchant_name=form.elements[12].value;

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
            merchant_value.innerHTML=merchant_name;
            $(barcode_image).JsBarcode(awb_num,{displayValue:false});

            cnote_no.appendChild(barcode_image);
            cnote_no.appendChild(barcode_value);
            cnote_no.appendChild(type_value);
            cnote_no.appendChild(merchant_value);

            table_rows+="<tr style='border-top: 1px solid #000000;height:60px;'><td><div>"+counter+"</div></td>"+
                    "<td><div style='text-align:left;'>"+cnote_no.innerHTML+"</div></td>"+
                    "<td><div style='text-align:left;'>"+form.elements[1].value+"</div></td>"+
                    "<td><div>"+form.elements[3].value+"</div></td>"+
                    "<td><div>"+form.elements[4].value+"</div></td>"+
                    "<td></td>"+
                    "<td><div style='text-align:left;'>"+mob_seal+"</div></td>"+
                    "<td><div>"+rc+"</div></td>"+
                    "<td></td></tr>";
        });
        new_table.innerHTML=table_rows;
        /////////////placing the containers //////////////////////////////////////////////////////

        container.appendChild(header);
        container.appendChild(rto_title);
        container.appendChild(detail_section);

        container.appendChild(new_table);

        header.appendChild(logo);
        header.appendChild(business_title);
        header.appendChild(rto_barcode);

        func(container);
    }

    </script>
</div>
