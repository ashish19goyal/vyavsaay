<div id='form353' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form353_save'>Save All <i class='fa fa-save'></i></a>
		</div>
	</div>

	<div class="portlet-body">
        <form id='form353_master' autocomplete="off">
            <fieldset>
                <label><input type='text' name='drs' class='floatlabel' placeholder='DRS #'></label>
                <label><input type='text' name='status' class='floatlabel' placeholder='Status'></label>
                <label><textarea name='remark' class='floatlabel' placeholder='Remark'></textarea></label>
                <label><input type='text' name='awb_num' class='floatlabel' placeholder='AWB #'></label>
                <input type='hidden' name='collection'>
				<input type='hidden' name='delivery_person'>
				<input type='submit' class='submit_hidden'>
            </fieldset>
        </form>

        <br>

        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr style='color:#9a9a9a;'>
                    <th>AWB #</th>
					<th>Current Status</th>
					<th>Updated Status</th>
					<th>Remark</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form353_body'>
			</tbody>
			<tbody id='form353_foot'>
			</tbody>
        </table>
    </div>

    <script>
    function form353_header_ini()
    {
        $('#form353_body').html("");

        var fields=document.getElementById('form353_master');

        var drs_filter=fields.elements['drs'];
        var status_filter=fields.elements['status'];
        var remark_filter=fields.elements['remark'];
        var awb_filter=fields.elements['awb_num'];
		var collection_filter=fields.elements['collection'];
		var delivery_filter=fields.elements['delivery_person'];
        var save_button=document.getElementById('form353_save');

		collection_filter.value="";
		delivery_filter.value="";
        drs_filter.value="";
        $(drs_filter).focus();

        set_static_value_list_json('logistics_orders','status',status_filter);

        $(awb_filter).off('keydown');
        $(awb_filter).on('keydown',function (event)
        {
            if(event.keyCode == 13)
            {
                event.preventDefault();
                var subform=document.getElementById('form353_'+awb_filter.value);
                subform.elements[2].value=status_filter.value;
                subform.elements[3].value=remark_filter.value;
                form353_get_totals();
                awb_filter.value="";
            }
        });

        $(drs_filter).off('keydown');
        $(drs_filter).on('keydown',function (event)
        {
            if(event.keyCode == 13)
            {
                event.preventDefault();
                form353_ini();
            }
        });

        $(save_button).off('click');
        $(save_button).on("click", function(event)
        {
            event.preventDefault();
            $("[id^='save_form353_']").click();
			modal224_action(drs_filter.value,collection_filter.value,delivery_filter.value);
        });

		$('#form353_body').paginator({visible:false});
    }

    function form353_ini()
    {
        $('#form353_body').html("");
        $('#form353_foot').html("");

        var filter_fields=document.getElementById('form353_master');
        var drs_num=filter_fields['drs'].value;
        var all_status=filter_fields['status'].value;
        var all_remark=filter_fields['remark'].value;
        var awb_filter=filter_fields['awb_num'];
		var delivery_filter=filter_fields['delivery_person'];

        if(drs_num!="")
        {
            show_loader();

			var delivery_person_data={data_store:'drs',return_column:'employee',indexes:[{index:'drs_num',exact:drs_num}]};
			set_my_value_json(delivery_person_data,delivery_filter);

            var branch_object={index:'branch'};
            var new_columns={data_store:'logistics_orders',
                			return_column:'awb_num',
							access:{},
                			indexes:[{index:'awb_num'},
                                    {index:'id'},
									{index:'type',exact:'COD'},
                                    {index:'drs_num',exact:drs_num},
                                    {index:'status'},
                                    {index:'order_history'},
									{index:'collectable_value'},
                                    branch_object]};

            set_my_value_list_json(new_columns,awb_filter);

            read_json_rows('form353',new_columns,function(results)
            {
                results.forEach(function(result)
                {
                    var id=result.id;
                    var rowsHTML="<tr>";
                    rowsHTML+="<form id='form353_"+result.awb_num+"'></form>";
                        rowsHTML+="<td data-th='AWB #'>";
                            rowsHTML+="<input type='text' readonly='readonly' form='form353_"+result.awb_num+"' value='"+result.awb_num+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Current Status'>";
                            rowsHTML+="<input type='text' readonly='readonly' form='form353_"+result.awb_num+"' value='"+result.status+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Updated Status'>";
                            rowsHTML+="<input type='text' form='form353_"+result.awb_num+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Remark'>";
                            rowsHTML+="<textarea form='form353_"+result.awb_num+"'></textarea>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' form='form353_"+result.awb_num+"' value='"+id+"'>";
                            rowsHTML+="<button type='submit' class='btn green' form='form353_"+result.awb_num+"' id='save_form353_"+id+"' name='save'><i class='fa fa-save'></i></button>";
                            rowsHTML+="<input type='hidden' form='form353_"+result.awb_num+"' value='"+result.order_history+"'>";
							rowsHTML+="<input type='hidden' form='form353_"+result.awb_num+"' name='amount' value='"+result.collectable_value+"'>";
                        rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form353_body').prepend(rowsHTML);
                    var fields=document.getElementById("form353_"+result.awb_num);
                    var status_filter=fields.elements[2];

                    set_static_value_list_json('logistics_orders','status',status_filter);

                    $(fields).on("submit", function(event)
                    {
                        event.preventDefault();
                        form353_update_item(fields);
                    });
                });
                form353_get_totals();
                hide_loader();
            });
        }
    }

    function form353_get_totals()
    {
        var out_for_delivery=0;
        var delivered=0;
        var pending=0;
        var undelivered=0;
		var total_cod=0;

        $("[id^='save_form353']").each(function(index)
        {
            var subform_id=$(this).attr('form');
            var subform=document.getElementById(subform_id);
            var updated_status=subform.elements[2].value;
            var current_status=subform.elements[1].value;
			var cod_amount=parseFloat(subform.elements['amount'].value);

            if(updated_status!="")
            {
                if(updated_status=='delivered')
                {
					delivered+=1;
					total_cod+=cod_amount;
				}
                else if(updated_status=='undelivered')
                    undelivered+=1;
                else if(updated_status=='out for delivery')
                    out_for_delivery+=1;
                else if(updated_status=='pending')
                    pending+=1;
            }
            else
            {
                if(current_status=='delivered')
				{
                    delivered+=1;
					total_cod+=cod_amount;
				}
                else if(current_status=='undelivered')
                    undelivered+=1;
                else if(current_status=='out for delivery')
                    out_for_delivery+=1;
                else if(current_status=='pending')
                    pending+=1;
            }
        });

		var filter_fields=document.getElementById('form353_master');
        filter_fields.elements['collection'].value=total_cod;

        var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
                                "<td>Out for Delivery:<br>Delivered:<br>Undelivered:<br>Pending:</td>" +
                                "<td>"+out_for_delivery+"<br>"+delivered+"<br>" +undelivered+"<br> " +pending+"</td>" +
                                "<td></td>" +
                                "</tr>";
        $('#form353_foot').html(total_row);
    }

    function form353_update_item(form)
    {
        if(is_update_access('form353'))
        {
            var awb_num=form.elements[0].value;
            var status=form.elements[2].value;
            var remarks=form.elements[3].value;
            var id=form.elements[4].value;
            var last_updated=get_my_time();
            var delivery_object={index:'delivery_time'};

            if(status!="")
            {
                var old_order_history=form.elements[6].value;
                var order_history=vUtil.jsonParse(old_order_history);
                var history_object=new Object();
                history_object.timeStamp=get_my_time();
                history_object.details=remarks;
                history_object.status=status;

                if(status=='received')
                {
                    history_object.location=get_session_var('address');
                }
                else if(status=='pending')
                {
                    history_object.location=get_session_var('address');
                }
                else if(status=='delivered')
                {
                    history_object.location="";
                    delivery_object={index:'delivery_time',value:history_object.timeStamp};
                }
                else if(status=='undelivered')
                {
                    history_object.location="";
                }

                order_history.push(history_object);
                var order_history_string=JSON.stringify(order_history);

                var data_json={data_store:'logistics_orders',
	 				data:[{index:'id',value:id},
	 					{index:'status',value:status},
	 					{index:'comments',value:remarks},
	 					{index:'order_history',value:order_history_string},
                        delivery_object,
	 					{index:'last_updated',value:last_updated}]};

                update_json(data_json);

                $(form).readonly();

                $(form).off('submit');
                $(form).on('submit',function (e)
                {
                    e.preventDefault();
                });
            }
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    </script>
</div>
