<div id='form211' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form211_save'>Save All <i class='fa fa-save'></i></a>
		</div>
	</div>

	<div class="portlet-body">
        <form id='form211_master' autocomplete="off">
            <fieldset>
                <label><input type='text' name='drs' class='floatlabel' placeholder='DRS #'></label>
                <label><input type='text' name='status' class='floatlabel' placeholder='Status'></label>
                <label><textarea name='remark' class='floatlabel' placeholder='Remark'></textarea></label>
                <label><input type='text' name='awb_num' class='floatlabel' placeholder='AWB #'></label>
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
			<tbody id='form211_body'>
			</tbody>
			<tbody id='form211_foot'>
			</tbody>
        </table>
    </div>

    <script>
    function form211_header_ini()
    {
        $('#form211_body').html("");

        var fields=document.getElementById('form211_master');

        var drs_filter=fields.elements['drs'];
        var status_filter=fields.elements['status'];
        var remark_filter=fields.elements['remark'];
        var awb_filter=fields.elements['awb_num'];
        var save_button=document.getElementById('form211_save');

        drs_filter.value="";
        $(drs_filter).focus();

		set_value_list_json(['pending','delivered','undelivered','RTO pending','out for delivery'],status_filter);
        // set_static_value_list_json('logistics_orders','status',status_filter);

        $(awb_filter).off('keydown');
        $(awb_filter).on('keydown',function (event)
        {
            if(event.keyCode == 13)
            {
                event.preventDefault();
                var subform=document.getElementById('form211_'+awb_filter.value);
                subform.elements[2].value=status_filter.value;
                subform.elements[3].value=remark_filter.value;
                form211_get_totals();
                awb_filter.value="";
            }
        });

        $(drs_filter).off('keydown');
        $(drs_filter).on('keydown',function (event)
        {
            if(event.keyCode == 13)
            {
                event.preventDefault();
                form211_ini();
            }
        });

        $(save_button).off('click');
        $(save_button).on("click", function(event)
        {
            event.preventDefault();
            $("[id^='save_form211_']").click();
        });
    }

    function form211_ini()
    {
        $('#form211_body').html("");
        $('#form211_foot').html("");

        var filter_fields=document.getElementById('form211_master');
        var drs_num=filter_fields['drs'].value;
        var all_status=filter_fields['status'].value;
        var all_remark=filter_fields['remark'].value;
        var awb_filter=filter_fields['awb_num'];

        if(drs_num!="")
        {
            show_loader();

            var branch_object={index:'branch'};

            var new_columns={data_store:'logistics_orders',
                			return_column:'awb_num',
							access:'yes',
                			indexes:[{index:'awb_num'},
                                    {index:'id'},
									{index:'type',exact:'NONCOD'},
                                    {index:'drs_num',exact:drs_num},
                                    {index:'status'},
									{index:'order_history'},
                                    branch_object]};

            set_my_value_list_json(new_columns,awb_filter);

            read_json_rows('form211',new_columns,function(results)
            {
                results.forEach(function(result)
                {
                    var id=result.id;
                    var rowsHTML="<tr>";
                    rowsHTML+="<form id='form211_"+result.awb_num+"'></form>";
                        rowsHTML+="<td data-th='AWB #'>";
                            rowsHTML+="<input type='text' readonly='readonly' form='form211_"+result.awb_num+"' value='"+result.awb_num+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Current Status'>";
                            rowsHTML+="<input type='text' readonly='readonly' form='form211_"+result.awb_num+"' value='"+result.status+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Updated Status'>";
                            rowsHTML+="<input type='text' form='form211_"+result.awb_num+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Remark'>";
                            rowsHTML+="<textarea form='form211_"+result.awb_num+"'></textarea>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' form='form211_"+result.awb_num+"' value='"+id+"'>";
                            rowsHTML+="<button type='submit' class='btn green' form='form211_"+result.awb_num+"' id='save_form211_"+id+"' name='save'><i class='fa fa-save'></i></button>";
                            rowsHTML+="<input type='hidden' form='form211_"+result.awb_num+"' value='"+result.order_history+"'>";
                        rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form211_body').prepend(rowsHTML);
                    var fields=document.getElementById("form211_"+result.awb_num);
                    var status_filter=fields.elements[2];

					set_value_list_json(['pending','delivered','undelivered','RTO pending','out for delivery'],status_filter);
                    // set_static_value_list_json('logistics_orders','status',status_filter);

                    $(fields).on("submit", function(event)
                    {
                        event.preventDefault();
                        form211_update_item(fields);
                    });
                });
                form211_get_totals();
                hide_loader();
            });
        }
    }

    function form211_get_totals()
    {
        var out_for_delivery=0;
        var delivered=0;
        var pending=0;
        var undelivered=0;
		var rto_pending=0;

        $("[id^='save_form211']").each(function(index)
        {
            var subform_id=$(this).attr('form');
            var subform=document.getElementById(subform_id);
            var updated_status=subform.elements[2].value;
            var current_status=subform.elements[1].value;

            if(updated_status!="")
            {
                if(updated_status=='delivered')
                    delivered+=1;
                else if(updated_status=='undelivered')
                    undelivered+=1;
                else if(updated_status=='out for delivery')
                    out_for_delivery+=1;
                else if(updated_status=='pending')
                    pending+=1;
				else if(updated_status=='RTO pending')
                    rto_pending+=1;
            }
            else
            {
                if(current_status=='delivered')
                    delivered+=1;
                else if(current_status=='undelivered')
                    undelivered+=1;
                else if(current_status=='out for delivery')
                    out_for_delivery+=1;
                else if(current_status=='pending')
                    pending+=1;
				else if(current_status=='RTO pending')
                    rto_pending+=1;
            }
        });

        var total_row="<tr><td colspan='2' data-th='Total'><b>Total</b></td>" +
                                "<td>Out for Delivery:<br>Delivered:<br>Undelivered:<br>Pending:<br>RTO Pending:</td>" +
                                "<td>"+out_for_delivery+"<br>"+delivered+"<br>" +undelivered+"<br> " +pending+"<br> " +rto_pending+"</td>"
                                "<td></td>" +
                                "</tr>";
        $('#form211_foot').html(total_row);
    }

    function form211_update_item(form)
    {
        if(is_update_access('form211'))
        {
            var awb_num=form.elements[0].value;
            var status=form.elements[2].value;
            var remarks=form.elements[3].value;
            var id=form.elements[4].value;
            var last_updated=get_my_time();
            var delivery_object={index:'delivery_time',value:1};

            if(status!="")
            {
                var old_order_history=form.elements[6].value;
                var order_history=vUtil.jsonParse(old_order_history);
                var history_object={timeStamp:get_my_time(),status:status};

                // if(status=='received')
                // {
                //     history_object.location=get_session_var('address');
				// 	history_object.details= (vUtil.isBlank(remarks))? "Order checked in at the branch" : remarks;
                // }
                if(status=='pending')
                {
                    history_object.location=get_session_var('address');
					history_object.details= (vUtil.isBlank(remarks))? "Order pending for delivery" : remarks;
                }
                else if(status=='delivered')
                {
                    history_object.location="";
                    delivery_object={index:'delivery_time',value:history_object.timeStamp};
					history_object.details= (vUtil.isBlank(remarks))? "Order delivered" : remarks;
                }
                else if(status=='undelivered')
                {
                    history_object.location="";
					history_object.details= (vUtil.isBlank(remarks))? "Order could not be delivered. Delivery will be re-attempted shortly." : remarks;
                }
				else if(status=='RTO pending')
				{
					history_object.location=get_session_var('address');
					history_object.details= (vUtil.isBlank(remarks))? "Order marked for RTO." : remarks;
				}

				if(order_history.length>0 && order_history[order_history.length-1]['status']!=status)
				{
					order_history.push(history_object);
				}
				var order_history_string=JSON.stringify(order_history);

                var data_json={data_store:'logistics_orders',
	 				data:[{index:'id',value:id},
	 					{index:'status',value:status},
	 					{index:'comments',value:remarks},
	 					{index:'order_history',value:order_history_string},
						{index:'sync_status',value:1},
                        delivery_object,
	 					{index:'last_updated',value:last_updated}]};

				// console.log(data_json);
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
