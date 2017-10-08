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
				<label><input type='text' name='ndr' class='floatlabel' placeholder='Non-Delivery Reason'></label>
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
					<th>Non-Delivery Reason</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form211_body'>
			</tbody>
			<tbody id='form211_foot'>
			</tbody>
        </table>
    </div>

	<div class='modal_forms'>
		<a href='#form211_modal_ndr' data-toggle="modal" id='form211_modal_ndr_link'></a>
		<div id="form211_modal_ndr" class="modal fade draggable-modal" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<form id='form211_modal_ndr_form'>
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
							<h4 class="modal-title">Update Non-Delivery Reason</h4>
						</div>
						<div class="modal-body">
							<div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
								This order can't be updated, as the selection for Non-delivery reason is incorrect. Please verify.
							</div>
						</div>
						<div class="modal-footer">
							<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

    <script>
	var rto_reasons = ['WACW','RTA','ANF','ACCNR','COS','NSPCNC','ICA'];
	var ndr_reasons = [
		'NDR-No response and adderss not found',
		'NDR-contact number swich off and address not traceable',
		'NDR-Order cancel by customer',
		'NDR-As per shopclues instruction',
		'NDR-Address not traceable and customer is unable to describe location',
		'NDR-Refused by customer',
		'NDR-Incomplete address and contact number swich off',
		'NDR-customer is out of station',
		'NDR-Incomplete address and No response',
		'NDR-No service',
		'NDR-Address not found and No Response',
		'NDR-customer cancel the order',
		'NDR-contact number not valid and address not found',
		'NDR-Short address and No response',
		'NDR-contact number not contactable and address not found',
		'NDR-Door closed and contact number swich off',
		'NDR-customr is asking for refund only',
		'NDR-Wrong address and No response',
		'NDR-Shifted',
		'NDR-House closed and No response',
		'NDR-No such person and No response',
		'NDR-Order Cancel',
		'NDR-NSP and No response',
		'NDR-Customer out of station',
		'NDR-Open Delivery',
		'NDR-Wrong Porduct',
		'NDR-Incomplete address and customer no response',
		'NDR-No Service',
		'NDR-Customer no response',
		'NDR-Fake Order',
		'NDR-Address in complete',
		'NDR-No Book any Order',
		'NDR-Wrong Address and wrong contact number',
		'NDR-Again and Again delivery address change',
	];

	function form211_header_ini()
    {
        $('#form211_body').html("");

        var fields=document.getElementById('form211_master');

        var drs_filter=fields.elements['drs'];
        var status_filter=fields.elements['status'];
        var remark_filter=fields.elements['remark'];
		var ndr_filter=fields.elements['ndr'];
        var awb_filter=fields.elements['awb_num'];
        var save_button=document.getElementById('form211_save');

        drs_filter.value="";
        $(drs_filter).focus();

		set_value_list_json(['pending','delivered','undelivered','RTO pending','out for delivery'],status_filter);
		var all_reasons = rto_reasons.concat(ndr_reasons);
		set_value_list_json(all_reasons,ndr_filter);

		var fillSubform = function(){
			var subform=document.getElementById('form211_'+awb_filter.value);
			subform.elements[2].value=status_filter.value;
			subform.elements[3].value=remark_filter.value;
			subform.elements[4].value=ndr_filter.value;
			form211_get_totals();
			awb_filter.value="";
		};

		$(awb_filter).off('keydown');
		$(awb_filter).on('keydown',function (event)
		{
			if(event.keyCode == 13)
			{
				event.preventDefault();
				if((status_filter.value == 'undelivered' && ndr_reasons.indexOf(ndr_filter.value)>-1) ||
					(status_filter.value == 'RTO pending' && rto_reasons.indexOf(ndr_filter.value)>-1) ||
					(status_filter.value != 'RTO pending' && status_filter.value != 'undelivered' && ndr_filter.value == "")
				)
				{
					fillSubform();
				}
				else{
					$("#form211_modal_ndr_link").click();
				}

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

		$(fields).on('submit',function(event){
			event.preventDefault();
		});
    }

    function form211_ini()
    {
        $('#form211_body').html("");
        $('#form211_foot').html("");

        var filter_fields=document.getElementById('form211_master');
        var drs_num=filter_fields['drs'].value;
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
						rowsHTML+="<td data-th='Non-Delivery Reason'>";
                            rowsHTML+="<input type='text' form='form211_"+result.awb_num+"'>";
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
					var ndr_filter=fields.elements[4];

					set_value_list_json(['pending','delivered','undelivered','RTO pending','out for delivery'],status_filter);

                    $(fields).on("submit", function(event)
                    {
                        event.preventDefault();
						if((status_filter.value == 'undelivered' && ndr_reasons.indexOf(ndr_filter.value)>-1) ||
							(status_filter.value == 'RTO pending' && rto_reasons.indexOf(ndr_filter.value)>-1) ||
							(status_filter.value != 'RTO pending' && status_filter.value != 'undelivered' && ndr_filter.value == "")
						)
						{
							form211_update_item(fields);
						}
						else{
							$("#form211_modal_ndr_link").click();
						}
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
			var ndr_reason=form.elements[4].value;
            var id=form.elements[5].value;
            var last_updated=get_my_time();
            var delivery_object={index:'delivery_time',value:1};

            if(status!="")
            {
                var old_order_history=form.elements[7].value;
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
						{index:'reason_code',value:ndr_reason},
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
