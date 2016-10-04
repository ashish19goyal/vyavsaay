<div id='form358' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=form358_add_item();>Start Scanning <i class='fa fa-plus'></i></a>
		</div>
		<div class='actions'>
			<a class='btn grey btn-outline btn-sm' id='form358_add_evidence' title='Upload documents after scanning orders'>Add Evidence <i class='fa fa-file-o'></i></a>
		</div>
	</div>

	<div class="portlet-body">
	   <form id='form358_master' autocomplete="off">
            <fieldset>
                <label><textarea type='text' name='comment' class='floatlabel' placeholder='Comment'></textarea></label>
                <label><input type='text' name='picked' class='floatlabel' placeholder='Picked by'></label>
                <input type='submit' class='submit_hidden'>
            </fieldset>
        </form>

        <br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form358_header'></form>
						<th><input type='text' placeholder="AWB #" readonly='readonly' form='form358_header'></th>
						<th><input type='text' placeholder="Pieces" readonly='readonly' form='form358_header'></th>
						<th><input type='text' placeholder="Product" readonly='readonly' form='form358_header'></th>
						<th><input type='text' placeholder="Merchant" readonly='readonly' form='form358_header'></th>
						<th><input type='text' placeholder="Status" readonly='readonly' form='form358_header'>
                            <input type='submit' form='form358_header' class='submit_hidden'></th>
				</tr>
			</thead>
			<tbody id='form358_body'>
			</tbody>
		</table>
	</div>

    <script>

    function form358_header_ini()
    {
        var fields=document.getElementById('form358_master');

        var comments_filter=fields.elements['comment'];
        var picked_filter=fields.elements['picked'];

        var staff_data={data_store:'staff',return_column:'acc_name'};
        set_my_value_list_json(staff_data,picked_filter);

        comments_filter.value="";
        picked_filter.value="";

        $(fields).off('submit');
        $(fields).on('submit',function(event)
        {
            event.preventDefault();
            form358_add_item();
        });

        $('#form358_add_evidence').off('click');
        $('#form358_add_evidence').on('click',function(e)
        {
            var description="Evidence for incoming of AWB";
            $("[id^='save_form358']").each(function(index)
            {
                var subform_id=$(this).attr('form');
                var subform=document.getElementById(subform_id);
                if(subform.elements[0].value!="")
                {
                    description+=" "+subform.elements[0].value+",";
                }
            });
            modal210_action(description);
        });

        $('#form358_body').html("");
        $('#form358').formcontrol();

        var paginator=$('#form358_body').paginator({visible:false});
    }

    function form358_add_item()
    {
        if(is_create_access('form358'))
        {
            var id=vUtil.newKey();
            var rowsHTML="<tr>";
            rowsHTML+="<form id='form358_"+id+"' autocomplete='off'></form>";
                rowsHTML+="<td data-th='AWB #'>";
                    rowsHTML+="<input type='text' required form='form358_"+id+"' oninvalid=\"setCustomValidity('This AWB # is invalid')\">";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Pieces'>";
                    rowsHTML+="<input type='number' readonly='readonly' form='form358_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Product'>";
                    rowsHTML+="<input type='text' readonly='readonly' form='form358_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Merchant'>";
                    rowsHTML+="<input type='text' readonly='readonly' form='form358_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Status'>";
                    rowsHTML+="<input type='text' readonly='readonly' form='form358_"+id+"'>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Action'>";
                    rowsHTML+="<input type='hidden' form='form358_"+id+"'>";
                    rowsHTML+="<input type='submit' class='submit_hidden' form='form358_"+id+"' id='save_form358_"+id+"' >";
                    rowsHTML+="<button type='button' class='btn red' form='form358_"+id+"' id='delete_form358_"+id+"' onclick='form358_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                    rowsHTML+="<input type='hidden' form='form358_"+id+"' name='order_history'>";
                rowsHTML+="</td>";
            rowsHTML+="</tr>";

            $('#form358_body').prepend(rowsHTML);

            var fields=document.getElementById("form358_"+id);
            var awb_filter=fields.elements[0];
            var pieces_filter=fields.elements[1];
            var product_filter=fields.elements[2];
            var merchant_filter=fields.elements[3];
            var status_filter=fields.elements[4];
            var id_filter=fields.elements[5];
            var order_history=fields.elements['order_history'];

            $(awb_filter).on('keydown',function (event)
            {
                if(event.keyCode == 13 )
                {
                    event.preventDefault();

                    var double_entry=0;
                    $("[id^='save_form358']").each(function(index)
                    {
                        var subform_id=$(this).attr('form');
                        var subform=document.getElementById(subform_id);

                        if(subform.elements[0].value==awb_filter.value)
                            double_entry+=1;
                    });

                    if(double_entry<2)
                    {
                        var order_data={data_store:'logistics_orders',count:1,
                                       access:'yes',
									   indexes:[{index:'id'},
                                               {index:'order_history'},
                                               {index:'status',array:['picked','in-transit']},
                                               {index:'sku'},
                                               {index:'merchant_name'},
                                               {index:'pieces'},
                                               {index:'awb_num',exact:awb_filter.value}]};
                        read_json_rows('',order_data,function(orders)
                        {
                            //console.log('form358 double entry checked');
                            if(orders.length>0)
                            {
                                id_filter.value=orders[0].id;
                                order_history.value=orders[0].order_history;
                                pieces_filter.value=orders[0].pieces;
                                product_filter.value=orders[0].sku;
                                merchant_filter.value=orders[0].merchant_name;
                                status_filter.value=orders[0].status;
								form358_update_item(fields);
			                    form358_add_item();
                            }
                            else
                            {
                                id_filter.value="";
                                order_history.value="";
                                pieces_filter.value="";
                                product_filter.value="";
                                merchant_filter.value="";
                                status_filter.value="";
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
            });

            $(fields).on("submit", function(event)
            {
                event.preventDefault();

                var double_entry=0;
                $("[id^='save_form358']").each(function(index)
                {
                    var subform_id=$(this).attr('form');
                    var subform=document.getElementById(subform_id);

                    if(subform.elements[0].value==awb_filter.value)
                        double_entry+=1;
                });

                if(double_entry<2)
                {
                    form358_add_item();
                }
                else
                {
                    awb_filter.value="";
                    $("#modal65_link").click();
                }
            });

            $(awb_filter).focus();

        }
        else
        {
            $("#modal2_link").click();
        }
    }

    function form358_update_item(form)
    {
        if(is_update_access('form358'))
        {
            //console.log('358 update');
            var master_form=document.getElementById("form358_master");
            var comments=master_form.elements['comment'].value;
            var picked_by=master_form.elements['picked'].value;

            var awb_num=form.elements[0].value;
            var pieces=form.elements[1].value;
            var status='received';
            var id=form.elements[5].value;
            var last_updated=get_my_time();

			if(vUtil.isBlank(comments))
			{
				comments = "Order checked in at the branch";
			}
            var old_order_history=form.elements['order_history'].value;
            var order_history=vUtil.jsonParse(old_order_history);
            var history_object={timeStamp:get_my_time(),
            					details:comments,
            					location:get_session_var('address'),
            					status:status};
			if(order_history.length>0 && order_history[order_history.length-1]['status']!=status)
			{
				order_history.push(history_object);
			}

            var order_history_string=JSON.stringify(order_history);

            var data_json={data_store:'logistics_orders',
	 				data:[{index:'id',value:id},
	 					{index:'status',value:status},
	 					{index:'comments',value:comments},
	 					{index:'pickup_by',value:picked_by},
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

    function form358_delete_item(button)
    {
        if(is_update_access('form358'))
        {
            var form_id=$(button).attr('form');
            var form=document.getElementById(form_id);

            var awb_num=form.elements[0].value;
            var status='picked';
            var id=form.elements[5].value;
            var last_updated=get_my_time();
            if(id!="")
            {
                var data_json={data_store:'logistics_orders',
	 				data:[{index:'id',value:id},
                         {index:'status',value:status},
                         {index:'last_updated',value:last_updated}]};
                update_json(data_json);
            }
            $(button).parent().parent().remove();
        }
        else
        {
            $("#modal2_link").click();
        }
    }
    </script>
</div>
