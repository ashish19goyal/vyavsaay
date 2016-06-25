<div id='form352' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form352_save'>Save All <i class='fa fa-save'></i></a>
		</div>
	</div>

	<div class="portlet-body">
        <form id='form352_master' autocomplete="off">
            <fieldset>
                <label><input type='text' name='gate' class='floatlabel' placeholder='Gate Pass #'></label>
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
			<tbody id='form352_body'>
			</tbody>
			<tbody id='form352_foot'>
			</tbody>
        </table>
    </div>

    <script>
    function form352_header_ini()
    {
        $('#form352_body').html("");

        var fields=document.getElementById('form352_master');

        var gate_filter=fields.elements['gate'];
        var remark_filter=fields.elements['remark'];
        var awb_filter=fields.elements['awb_num'];
        var save_button=document.getElementById('form352_save');

        gate_filter.value="";
        $(gate_filter).focus();

        $(awb_filter).off('keydown');
        $(awb_filter).on('keydown',function (event)
        {
            if(event.keyCode == 13)
            {
                event.preventDefault();
                var subform=document.getElementById('form352_'+awb_filter.value);
                subform.elements[2].value="received";
                subform.elements[3].value=remark_filter.value;
                form352_get_totals();
                awb_filter.value="";
            }
        });

        $(gate_filter).off('keydown');
        $(gate_filter).on('keydown',function (event)
        {
            if(event.keyCode == 13)
            {
                event.preventDefault();
                form352_ini();
            }
        });

        $(save_button).off('click');
        $(save_button).on("click", function(event)
        {
            event.preventDefault();
            $("[id^='save_form352_']").click();
        });
    }

    function form352_ini()
    {
        $('#form352_body').html("");
        $('#form352_foot').html("");

        var filter_fields=document.getElementById('form352_master');
        var gate_num=filter_fields['gate'].value;
        var all_remark=filter_fields['remark'].value;
        var awb_filter=filter_fields['awb_num'];

        if(gate_num!="")
        {
            show_loader();

            var branch_object={index:'branch'};

            var new_columns={data_store:'logistics_orders',
                			return_column:'awb_num',
							access:{},
                			indexes:[{index:'awb_num'},
                                    {index:'id'},
                                    {index:'pass_num',exact:gate_num},
                                    {index:'status'},
                                    {index:'order_history'},
                                    branch_object]};

            set_my_value_list_json(new_columns,awb_filter);

            read_json_rows('form352',new_columns,function(results)
            {
                results.forEach(function(result)
                {
                    var id=result.id;
                    var rowsHTML="<tr>";
                    rowsHTML+="<form id='form352_"+result.awb_num+"'></form>";
                        rowsHTML+="<td data-th='AWB #'>";
                            rowsHTML+="<input type='text' readonly='readonly' form='form352_"+result.awb_num+"' value='"+result.awb_num+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Current Status'>";
                            rowsHTML+="<input type='text' readonly='readonly' form='form352_"+result.awb_num+"' value='"+result.status+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Updated Status'>";
                            rowsHTML+="<input type='text' form='form352_"+result.awb_num+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Remark'>";
                            rowsHTML+="<textarea form='form352_"+result.awb_num+"'></textarea>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' form='form352_"+result.awb_num+"' value='"+id+"'>";
                            rowsHTML+="<button type='submit' class='btn green' form='form352_"+result.awb_num+"' id='save_form352_"+id+"' name='save'><i class='fa fa-save'></i></button>";
                            rowsHTML+="<input type='hidden' form='form352_"+result.awb_num+"' value='"+result.order_history+"'>";
							rowsHTML+="<input type='hidden' form='form352_"+result.awb_num+"' name='branch' value='"+result.branch+"'>";
                        rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form352_body').prepend(rowsHTML);
                    var fields=document.getElementById("form352_"+result.awb_num);
                    var status_filter=fields.elements[2];

                    set_static_value_list_json('logistics_orders','status',status_filter);

                    $(fields).on("submit", function(event)
                    {
                        event.preventDefault();
                        form352_update_item(fields);
                    });
                });
                form352_get_totals();
                hide_loader();
            });
        }
    }

    function form352_get_totals()
    {
        var received=0;
        var transit=0;

        $("[id^='save_form352']").each(function(index)
        {
            var subform_id=$(this).attr('form');
            var subform=document.getElementById(subform_id);
            var updated_status=subform.elements[2].value;
            var current_status=subform.elements[1].value;

            if(updated_status!="")
            {
                if(updated_status=='received')
                    received+=1;
                else if(updated_status=='in-transit')
                    transit+=1;
            }
            else
            {
				if(current_status=='received')
                    received+=1;
                else if(current_status=='in-transit')
                    transit+=1;
            }
        });

        var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
                                "<td>Received:<br>Not-Received:</td>" +
                                "<td>"+received+"<br>"+transit+"</td>" +
                                "<td></td>" +
                                "</tr>";
        $('#form352_foot').html(total_row);
    }

    function form352_update_item(form)
    {
        if(is_update_access('form352'))
        {
            var awb_num=form.elements[0].value;
            var status=form.elements[2].value;
            var remarks=form.elements[3].value;
            var id=form.elements[4].value;
            var last_updated=get_my_time();

            if(status=="received")
            {
                var old_order_history=form.elements[6].value;
                var order_history=vUtil.jsonParse(old_order_history);
                var history_object=new Object();
                history_object.timeStamp=get_my_time();
                history_object.details=remarks;
                history_object.status=status;

                history_object.location=form.elements['branch'].value;

                order_history.push(history_object);
                var order_history_string=JSON.stringify(order_history);

                var data_json={data_store:'logistics_orders',
	 				data:[{index:'id',value:id},
	 					{index:'status',value:status},
	 					{index:'comments',value:remarks},
	 					{index:'order_history',value:order_history_string},
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
