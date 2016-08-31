<div id='form212' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form212_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <button class="btn btn-default grey" onclick='modal148_action();'>Import <i class="fa fa-upload"></i></button>
        </div>
	</div>

	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form212_header'></form>
						<th><input type='text' placeholder="AWB #" readonly='readonly' form='form212_header'></th>
						<th><input type='text' placeholder="Order #" readonly='readonly' form='form212_header'></th>
						<th><input type='text' placeholder="Status" readonly='readonly' form='form212_header'></th>
						<th><input type='text' placeholder="Remark" readonly="readonly" form='form212_header'></th>
						<th><input type='submit' form='form212_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form212_body'>
			</tbody>
		</table>
	</div>

    <script>

    function form212_header_ini()
    {
        $('#form212_body').html("");
        var paginator=$('#form212_body').paginator({visible:false});
    }

    function form212_add_item()
    {
        if(is_create_access('form212'))
        {
            var id=vUtil.newKey();
            var rowsHTML="<tr>";
            rowsHTML+="<form id='form212_"+id+"' autocomplete='off'></form>";
                rowsHTML+="<td data-th='AWB #'>";
                    rowsHTML+="<input type='text' required form='form212_"+id+"' oninvalid=\"setCustomValidity('This AWB # is invalid')\">";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Order #' id='form212_order_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Status'>";
                    rowsHTML+="<input type='text' form='form212_"+id+"' required>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Remark'>";
                    rowsHTML+="<textarea form='form212_"+id+"'></textarea>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Action'>";
                    rowsHTML+="<input type='hidden' form='form212_"+id+"'>";
                    rowsHTML+="<button type='submit' class='btn green' form='form212_"+id+"' id='save_form212_"+id+"' ><i class='fa fa-save'></i></button>";
                    rowsHTML+="<input type='hidden' form='form212_"+id+"' name='order_history'>";
                rowsHTML+="</td>";
            rowsHTML+="</tr>";

            $('#form212_body').prepend(rowsHTML);

            var fields=document.getElementById("form212_"+id);
            var awb_filter=fields.elements[0];
            var order_filter=document.getElementById("form212_order_"+id);
            var status_filter=fields.elements[1];
            var remark_filter=fields.elements[2];
            var id_filter=fields.elements[3];
            var save_button=fields.elements[4];
            var order_history=fields.elements[5];

            set_static_value_list_json('logistics_orders','status',status_filter);

            $(fields).on("submit", function(event)
            {
                event.preventDefault();
                form212_update_item(fields);
                form212_add_item();
            });

            $(remark_filter).on('keydown',function (event)
            {
                if(event.keyCode == 13 )
                {
                    event.preventDefault();
                    $(save_button).trigger('click');
                }
            });

            $(awb_filter).focus();

            $(awb_filter).on('keydown',function (event)
            {
                if(event.keyCode == 13 )
                {
                    event.preventDefault();
                    $(status_filter).focus();
                }
            });

            $(awb_filter).on('blur',function ()
            {
                var order_data={data_store:'logistics_orders',count:1,
                               indexes:[{index:'order_num'},
                                       {index:'status'},
                                       {index:'order_history'},
                                       {index:'awb_num',exact:awb_filter.value}]};
                read_json_rows('',order_data,function(orders)
                {
                    if(orders.length>0)
                    {
                        order_filter.innerHTML=orders[0].order_num;
                        status_filter.value=orders[0].status;
                        id_filter.value=orders[0].id;
                        order_history.value=orders[0].order_history;
                    }
                });
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form212_update_item(form)
    {
        if(is_update_access('form212'))
        {
            var awb_num=form.elements[0].value;
            var status=form.elements[1].value;
            var remarks=form.elements[2].value;
            var id=form.elements[3].value;
            var last_updated=get_my_time();
            var delivery_object={index:'delivery_time'};

            var old_order_history=form.elements[5].value;
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
	 					{index:'last_updated',value:last_updated}]};
            update_json(data_json);

            $(form).readonly();
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    </script>
</div>
