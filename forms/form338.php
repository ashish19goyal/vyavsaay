<div id='form338' class='function_detail'>
	<form id='form338_master' autocomplete="off">
		<fieldset>
			<label>Comments: <textarea class='widebox' name='comments'></textarea></label>			
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead id='form338_head'>
			<tr>
				<form id='form338_header'></form>
					<th>AWB #</th>
					<th>Order #</th>
                    <th>Status</th>
					<th><input type='button' form='form338_header' title='Add item' class='add_icon' onclick='form338_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form338_body'>
		</tbody>
	</table>
    
    <script>
    function form338_header_ini()
    {
        var fields=document.getElementById('form338_master');

        var comments_filter=fields.elements['comments'];

        comments_filter.value="";	
        $(fields).off('submit');
        $(fields).on('submit',function(event)
        {
            event.preventDefault();
            form338_add_item();
        });

        $('#form338_body').html("");
    }

    function form338_add_item()
    {
        if(is_create_access('form338'))
        {
            var id=get_new_key();
            var rowsHTML="<tr>";
            rowsHTML+="<form id='form338_"+id+"' autocomplete='off'></form>";
                rowsHTML+="<td data-th='AWB #'>";
                    rowsHTML+="<input type='text' required form='form338_"+id+"' oninvalid=\"setCustomValidity('This AWB # is invalid')\">";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Order #'>";
                    rowsHTML+="<input type='text' readonly='readonly' form='form338_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Status'>";
                    rowsHTML+="<input type='text' readonly='readonly' form='form338_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Action'>";
                    rowsHTML+="<input type='hidden' form='form338_"+id+"'>";
                    rowsHTML+="<input type='submit' class='submit_hidden' form='form338_"+id+"' id='save_form338_"+id+"' >";
                    rowsHTML+="<input type='hidden' form='form338_"+id+"' name='order_history'>";
                rowsHTML+="</td>";
            rowsHTML+="</tr>";

            $('#form338_body').prepend(rowsHTML);

            var fields=document.getElementById("form338_"+id);
            var awb_filter=fields.elements[0];
            var order_filter=fields.elements[1];
            var status_filter=fields.elements[2];
            var id_filter=fields.elements[3];
            var order_history=fields.elements[5];

            $(awb_filter).on('keydown',function (event) 
            {
                if(event.keyCode == 13 ) 
                {
                    event.preventDefault();

                    var double_entry=0;
                    $("[id^='save_form338']").each(function(index)
                    {
                        var subform_id=$(this).attr('form');
                        var subform=document.getElementById(subform_id);

                        if(subform.elements[0].value==awb_filter.value)	
                            double_entry+=1;
                    });

                    if(double_entry<2)
                    {
                        var order_data={data_store:'logistics_orders',count:1,
                                       indexes:[{index:'id'},
                                               {index:'order_history'},
                                               {index:'status'},
                                               {index:'order_num'},
                                               {index:'awb_num',exact:awb_filter.value}]};
                        read_json_rows('',order_data,function(orders)
                        {
                                //console.log('form338 double entry checked');
                            if(orders.length>0)
                            {
                                id_filter.value=orders[0].id;
                                order_filter.value=orders[0].order_num;
                                status_filter.value=orders[0].status;
                                order_history.value=orders[0].order_history;
                                form338_update_item(fields);
                                form338_add_item();
                            }
                            else 
                            {
                                order_filter.value="";
                                status_filter.value="";
                                id_filter.value="";
                                order_history.value="";
                                awb_filter.value="";
                                $("#modal65").dialog("open");
                            }
                        });
                    }
                    else 
                    {
                        awb_filter.value="";
                        $("#modal65").dialog("open");
                    }		
                }
            });

            $(fields).on("submit", function(event)
            {
                event.preventDefault();

                var double_entry=0;
                $("[id^='save_form338']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    if(subform.elements[0].value==awb_filter.value)	
                        double_entry+=1;
                });

                if(double_entry<2)
                {
                    form338_add_item();
                }
                else 
                {
                    awb_filter.value="";
                    $("#modal65").dialog("open");
                }
            });

            $(awb_filter).focus();

        }
        else
        {
            $("#modal2").dialog("open");
        }
    }

    function form338_update_item(form)
    {
        if(is_update_access('form338'))
        {
            //console.log('338 update');
            var master_form=document.getElementById("form338_master");		
            var comments=master_form.elements['comments'].value;

            var awb_num=form.elements[0].value;
            var status='RTO pending';
            var id=form.elements[3].value;
            var last_updated=get_my_time();

            var old_order_history=form.elements[5].value;

            var order_history=JSON.parse(old_order_history);
            var history_object=new Object();
            history_object.timeStamp=get_my_time();
            history_object.details=comments;
            history_object.location=get_session_var('address');
            history_object.status=status;
            order_history.push(history_object);
            var order_history_string=JSON.stringify(order_history);		

            var data_json={data_store:'logistics_orders',
	 				data:[{index:'id',value:id},
	 					{index:'status',value:status},
	 					{index:'comments',value:comments},
	 					{index:'order_history',value:order_history_string},
	 					{index:'last_updated',value:last_updated}]};
            update_json(data_json);

            for(var i=0;i<1;i++)
            {
                $(form.elements[i]).attr('readonly','readonly');
            }
        }
        else
        {
            $("#modal2").dialog("open");
        }
    }
    </script>
</div>