<div id='form321' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form321_add_item();'>Add <i class='fa fa-plus'></i></a>
            <a class='btn btn-circle grey btn-outline btn-sm' id='form321_save'>Save <i class='fa fa-save'></i></a>
		</div>
        <div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form321_print' onclick='form321_print_form();'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='form321_csv'><i class='fa fa-file-excel-o'></i> Download</a>
                    </li>
                    <li>
                        <a id='form321_share'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>
	
	<div class="portlet-body">
        <form id='form321_master' autocomplete="off">
            <fieldset>
                <label><input type='text' required name='manifest_num' class='floatlabel' placeholder='Manifest #'></label>
                <label><input type='text' name='date' required class='floatlabel' placeholder='Date'></label>
                <label><input type='text' name='loader' class='floatlabel' placeholder='Co-loader'></label>
                <label><input type='text' name='vendor' class='floatlabel' placeholder='Vendor'></label>
                <label><input type='text' name='num' class='floatlabel' readonly='readonly' placeholder='Number of Pieces'></label>
                <label style='margin-top:5px;vertical-align:top;'><button type='button' class='btn green' name='marker'>Mark as bag</button></label>
                <input type='hidden' name='id'>
                <input type='hidden' name='saved'>
                <input type='hidden' name='type'>
                <input type='hidden' name='lbh'>
                <input type='hidden' name='weight'>
                <input type='hidden' name='seal'>
                <input type='submit' class='submit_hidden'>
            </fieldset>
        </form>
        
        <br>
		
        <table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr style='color:#9a9a9a;'>
                    <th>S.No.</th>
                    <th>AWB #</th>
					<th>Consignment #</th>
					<th>LBH</th>
					<th>Weight</th>
					<th>Product</th>
					<th>Destination</th>
					<th></th>
				</tr>
			</thead>
			<tbody id='form321_body'>
			</tbody>
        </table>
    </div>

    <script>
        function form321_header_ini()
        {
            var fields=document.getElementById('form321_master');

            var manifest_filter=fields.elements['manifest_num'];
            var coloader=fields.elements['loader'];
            var vendor=fields.elements['vendor'];
            var date=fields.elements['date'];
            var marker=fields.elements['marker'];
            var id_filter=fields.elements['id'];
            var type_filter=fields.elements['type'];
            var lbh_filter=fields.elements['lbh'];
            var weight_filter=fields.elements['weight'];
            var seal_filter=fields.elements['seal'];
            fields.elements['num'].value=0;
            marker.setAttribute('data-status','unmarked');
            marker.innerHTML="Mark as bag";
            
            fields.elements['saved'].value='no';
            fields.elements['id'].value=get_new_key();
            
            $(marker).off('click');
            $(marker).on('click',function()
            {
                var marker_status=marker.getAttribute('data-status');
                if(marker_status=='unmarked')
                {
                    modal211_action(id_filter.value,manifest_filter.value);
                    marker.setAttribute('data-status','marked');
                    marker.innerHTML="Unmark bag";
                    type_filter.value='bag';
                }
                else
                {
                    form321_unmark_bag(id_filter.value);
                    marker.setAttribute('data-status','unmarked');
                    marker.innerHTML="Mark as bag";
                    type_filter.value='non-bag';
                }
            });

            var save_button=document.getElementById('form321_save');
            manifest_filter.value="";
            coloader.value="";
            vendor.value="";
            type_filter.value='non-bag';
            lbh_filter.value='';
            weight_filter.value='';
            seal_filter.value='';
            
            $(date).datepicker();
            date.value=get_my_date();

            var manifest_id=$("#form321_link").attr('data_id');
            if(manifest_id==null)
                manifest_id="";	

            if(manifest_id=="")
            {
                id_filter.value=get_new_key();
                var manifest_num_data={data_store:'user_preferences',return_column:'value',
                                      indexes:[{index:'name',exact:'manifest_num'}]};
                set_my_value_json(manifest_num_data,manifest_filter);	
            }

            $(save_button).off('click');
            $(save_button).on("click", function(event)
            {
                event.preventDefault();
                form321_update_form();
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
                form321_add_item();
            });
            
            var paginator=$('#form321_body').paginator({visible:false});        

            $('#form321').formcontrol();
        }

        function form321_ini()
        {
            var manifest_id=$("#form321_link").attr('data_id');
            if(manifest_id==null)
                manifest_id="";	
            $('#form321_body').html("");
            
            var filter_fields=document.getElementById('form321_master');
                    
            if(manifest_id!="")
            {
                show_loader();
                var manifest_columns={data_store:'manifests',count:1,
                                     indexes:[{index:'id',value:manifest_id},
                                             {index:'manifest_num'},
                                             {index:'coloader'},
                                             {index:'vendor'},
                                             {index:'type'},
                                             {index:'weight'},
                                             {index:'lbh'},
                                             {index:'seal_num'},
                                             {index:'num_orders'},
                                             {index:'date'}]};

                read_json_rows('form321',manifest_columns,function(manifest_results)
                {
                    if(manifest_results.length>0)
                    {
                        filter_fields.elements['manifest_num'].value=manifest_results[0].manifest_num;
                        filter_fields.elements['loader'].value=manifest_results[0].coloader;
                        filter_fields.elements['vendor'].value=manifest_results[0].vendor;
                        filter_fields.elements['date'].value=get_my_past_date(manifest_results[0].date);
                        filter_fields.elements['id'].value=manifest_results[0].id;
                        filter_fields.elements['type'].value=manifest_results[0].type;
                        filter_fields.elements['weight'].value=manifest_results[0].weight;
                        filter_fields.elements['lbh'].value=manifest_results[0].lbh;
                        filter_fields.elements['seal'].value=manifest_results[0].seal_num;
                        filter_fields.elements['num'].value=manifest_results[0].num_orders;
                        filter_fields.elements['saved'].value='yes';
                        var marker=filter_fields['marker'];
                        if(manifest_results[0].type=='bag')
                        {
                            marker.setAttribute('data-status','marked');
                            marker.innerHTML="Unmark bag";
                        }
                        else
                        {
                            marker.setAttribute('data-status','unmarked');
                            marker.innerHTML="Mark as bag";
                        }
                    }
                    $('#form321').formcontrol();
                });
                
                var manifest_items_column={data_store:'logistics_orders',
                                          indexes:[{index:'id'},
                                                  {index:'awb_num'},
                                                  {index:'consignment_num'},
                                                  {index:'ship_to'},
                                                  {index:'address1'},
                                                  {index:'city'},
                                                  {index:'state'},
                                                  {index:'sku'},
                                                  {index:'pieces'},
                                                  {index:'weight'},
                                                  {index:'lbh'},
                                                  {index:'manifest_num'},
                                                  {index:'man_id',exact:manifest_id}]};

                read_json_rows('form321',manifest_items_column,function(results)
                {
                    results.forEach(function(result)
                    {
                        var id=result.id;
                        var rowsHTML="<tr>";
                        
                        var lbh_calculated=1;
                        var lbh_array=result.lbh.split('*');
                        lbh_array.forEach(function(l)
                        {
                           lbh_calculated*=parseFloat(l); 
                        });
                        var vol_weight=my_round(lbh_calculated/6000,2);
                        var address=result.ship_to+", "+result.address1+", "+result.city+", "+result.state;
                        rowsHTML+="<form id='form321_"+id+"'></form>";
                            rowsHTML+="<td data-th='S.No.'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='AWB #'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form321_"+id+"' value='"+result.awb_num+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Consignment #'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form321_"+id+"' value='"+result.consignment_num+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='LBH'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form321_"+id+"' value='"+result.lbh+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Weight'>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Actual Weight' step='any' readonly='readonly' form='form321_"+id+"' value='"+result.weight+"'>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Volumetric Weight' step='any' readonly='readonly' form='form321_"+id+"' value='"+vol_weight+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Product'>";
                                rowsHTML+="<textarea class='floatlabel' placeholder='Item' readonly='readonly' form='form321_"+id+"'>"+result.sku+"</textarea>";
                                rowsHTML+="<input type='number' class='floatlabel' placeholder='Pieces' step='any' readonly='readonly' form='form321_"+id+"' value='"+result.pieces+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Destination'>";
                                rowsHTML+="<textarea readonly='readonly' form='form321_"+id+"'>"+address+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form321_"+id+"' name='id' value='"+id+"'>";
                                rowsHTML+="<input type='button' class='submit_hidden' form='form321_"+id+"' id='save_form321_"+id+"' name='save'>";
                                rowsHTML+="<button type='button' class='btn red' form='form321_"+id+"' id='delete_form321_"+id+"' onclick='form321_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";			
                        rowsHTML+="</tr>";

                        $('#form321_body').append(rowsHTML);
                        var item_form=document.getElementById('form321_'+id);
                        var save_button=item_form.elements['save'];

                        $(save_button).on('click',function (e) 
                        {
                            e.preventDefault();
                            form321_update_item(item_form);
                        });
                    });

                    form321_update_serial_numbers();
                    
                    $('#form321').formcontrol();
                    hide_loader();
                });
            }
        }

        function form321_add_item()
        {
            if(is_create_access('form321'))
            {
                var id=get_new_key();
                var rowsHTML="<tr>";
                rowsHTML+="<form id='form321_"+id+"'></form>";
                    rowsHTML+="<td data-th='S.No.'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='AWB #'>";
                        rowsHTML+="<input type='text' required form='form321_"+id+"' oninvalid=\"setCustomValidity('This AWB # is invalid')\">";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Consignment #'>";
                        rowsHTML+="<input type='text' form='form321_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='LBH'>";
                        rowsHTML+="<input type='text' form='form321_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Weight'>";
                        rowsHTML+="<input type='text' readonly='readonly' placeholder='Actual Weight' class='floatlabel' form='form321_"+id+"'>";
                        rowsHTML+="<input type='text' readonly='readonly' placeholder='Volumetric Weight' class='floatlabel' form='form321_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Product'>";
                        rowsHTML+="<textarea class='floatlabel' placeholder='Item' readonly='readonly' form='form321_"+id+"'></textarea>";
                        rowsHTML+="<input type='number' readonly='readonly' class='floatlabel' placeholder='Pieces' form='form321_"+id+"'>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Destination'>";
                        rowsHTML+="<textarea readonly='readonly' form='form321_"+id+"'></textarea>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Action'>";
                        rowsHTML+="<input type='hidden' name='id' form='form321_"+id+"' value='"+id+"'>";
                        rowsHTML+="<input type='hidden' name='history' form='form321_"+id+"'>";
                        rowsHTML+="<input type='button' class='submit_hidden' form='form321_"+id+"' id='save_form321_"+id+"' name='save'>";
                        rowsHTML+="<button type='button' class='btn red' name='delete' form='form321_"+id+"' id='delete_form321_"+id+"' onclick='$(this).parent().parent().remove(); form321_update_serial_numbers();'><i class='fa fa-trash'></i></button>";
                    rowsHTML+="</td>";			
                rowsHTML+="</tr>";

                $('#form321_body').prepend(rowsHTML);

                var item_form=document.getElementById('form321_'+id);
                var awb_filter=item_form.elements[0];
                var order_filter=item_form.elements[1];
                var lbh_filter=item_form.elements[2];
                var weight_filter=item_form.elements[3];
                var vol_weight_filter=item_form.elements[4];
                var product_filter=item_form.elements[5];
                var pieces_filter=item_form.elements[6];
                var address_filter=item_form.elements[7];
                var history_filter=item_form.elements['history'];
                var id_filter=item_form.elements['id'];
                var save_button=item_form.elements['save'];
                
                var new_manifest=true;
                var saved=document.getElementById('form321_master').elements['saved'].value;
                if(saved=='yes')
                {
                    new_manifest=false;
                }

                $(order_filter).on('keydown',function(e)
                {
                    if(e.keyCode==13)
                    {
                        e.preventDefault();
                        $(lbh_filter).focus();
                    }
                });
                
                $(lbh_filter).on('keydown',function(e)
                {
                    if(e.keyCode==13)
                    {
                        e.preventDefault();
                        form321_create_item(item_form);
                        form321_add_item();
                    }
                });
                
                $(item_form).on("submit", function(event)
                {
                    event.preventDefault();
                    var total_entries=0;
                    var double_entry=0;
                    $("[id^='save_form321']").each(function(index)
                    {
                        var subform_id=$(this).attr('form');
                        var subform=document.getElementById(subform_id);
                        total_entries+=1;
                        if(subform.elements[0].value==awb_filter.value)	
                            double_entry+=1;
                    });

                    if(total_entries==1 && new_manifest)
                    {
                        form321_create_form(function()
                        {
                            if(double_entry<2)
                            {
                                form321_create_item(item_form);
                                form321_add_item();
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
                            form321_create_item(item_form);
                            form321_add_item();
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
                        $("[id^='save_form321']").each(function(index)
                        {
                            var subform_id=$(this).attr('form');
                            var subform=document.getElementById(subform_id);

                            total_entries+=1;

                            if(subform.elements[0].value==awb_filter.value)	
                                double_entry+=1;
                        });

                        if(total_entries==1 && new_manifest)
                        {
                            form321_create_form(function () 
                            {
                                if(double_entry<2)
                                {
                                    var orders_data={data_store:'logistics_orders',count:1,
                                            indexes:[{index:'id'},
                                                    {index:'ship_to'},
                                                    {index:'address1'},
                                                    {index:'city'},
                                                    {index:'state'},
                                                    {index:'awb_num',exact:awb_filter.value},
                                                    {index:'manifest_type'},
                                                    {index:'consignment_num'},
                                                    {index:'sku'},
                                                    {index:'pieces'},
                                                    {index:'weight'},
                                                    {index:'lbh'},
                                                    {index:'order_history'},
                                                    {index:'status',array:['received','recieved','undelivered','pending']}]};
                                    
                                    read_json_rows('',orders_data,function (orders) 
                                    {
                                        //console.log(orders);
                                        if(orders.length>0)
                                        {
                                            address_filter.value=orders[0].ship_to+", "+orders[0].address1+", "+orders[0].city+", "+orders[0].state;
                                            order_filter.value=orders[0].consignment_num;
                                            product_filter.value=orders[0].sku;
                                            lbh_filter.value=orders[0].lbh;

                                            var lbh_calculated=1;
                                            var lbh_array=orders[0].lbh.split('*');
                                            lbh_array.forEach(function(l)
                                            {
                                               lbh_calculated*=parseFloat(l); 
                                            });
                                            vol_weight_filter.value=my_round(lbh_calculated/6000,2);

                                            weight_filter.value=orders[0].weight;
                                            pieces_filter.value=orders[0].pieces;
                                            id_filter.value=orders[0].id;
                                            history_filter.value=orders[0].order_history;
                                            $(order_filter).focus();
                                        }
                                        else 
                                        {
                                            address_filter.value="";
                                            order_filter.value="";
                                            product_filter.value="";
                                            weight_filter.value="";
                                            pieces_filter.value="";
                                            lbh_filter.value="";
                                            vol_weight_filter.value="";
                                            id_filter.value="";
                                            awb_filter.value="";
                                            history_filter.value="";
                                            $("#modal65_link").click();
                                        }
                                        $('#form321').formcontrol();
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
                                                    {index:'ship_to'},
                                                    {index:'address1'},
                                                    {index:'city'},
                                                    {index:'state'},
                                                    {index:'awb_num',exact:awb_filter.value},
                                                    {index:'manifest_type'},
                                                    {index:'consignment_num'},
                                                    {index:'sku'},
                                                    {index:'pieces'},
                                                    {index:'weight'},
                                                    {index:'lbh'}, 
                                                    {index:'order_history'}, 
                                                    {index:'status',array:['received','undelivered','pending']}]};
                                        
                                read_json_rows('',orders_data,function (orders) 
                                {
                                    //console.log(orders);
                                    if(orders.length>0)
                                    {
                                        address_filter.value=orders[0].ship_to+", "+orders[0].address1+", "+orders[0].city+", "+orders[0].state;
                                        order_filter.value=orders[0].consignment_num;
                                        product_filter.value=orders[0].sku;
                                        lbh_filter.value=orders[0].lbh;
                                        
                                        var lbh_calculated=1;
                                        var lbh_array=orders[0].lbh.split('*');
                                        lbh_array.forEach(function(l)
                                        {
                                           lbh_calculated*=parseFloat(l); 
                                        });
                                        vol_weight_filter.value=my_round(lbh_calculated/6000,2);
                                        
                                        weight_filter.value=orders[0].weight;
                                        pieces_filter.value=orders[0].pieces;
                                        id_filter.value=orders[0].id;
                                        history_filter.value=orders[0].order_history;
                                        $(order_filter).focus();
                                    }
                                    else 
                                    {
                                        address_filter.value="";
                                        order_filter.value="";
                                        product_filter.value="";
                                        weight_filter.value="";
                                        pieces_filter.value="";
                                        lbh_filter.value="";
                                        vol_weight_filter.value="";
                                        id_filter.value="";
                                        awb_filter.value="";
                                        history_filter.value="";
                                        $("#modal65_link").click();
                                    }
                                    $('#form321').formcontrol();
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
                $('#form321').formcontrol();
                form321_update_serial_numbers();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form321_create_item(form)
        {
            if(is_create_access('form321'))
            {
                var master_form=document.getElementById('form321_master');
                var manifest_num=master_form.elements['manifest_num'].value;
                var manifest_id=master_form.elements['id'].value;
                var manifest_date=master_form.elements['date'].value;
                
                var consignment_num=form.elements[1].value;
                var lbh=form.elements[2].value;
                var weight=form.elements[3].value;
                var data_id=form.elements['id'].value;
                var save_button=form.elements['save'];
                var del_button=form.elements['delete'];

                var old_order_history=form.elements['history'].value;
                var order_history=[];
                if(old_order_history!="")
                    order_history=JSON.parse(old_order_history);
                var history_object=new Object();
                history_object.timeStamp=get_my_time();
                history_object.details="Order in-transit";
                history_object.location='';
                history_object.status="in-transit";
                order_history.push(history_object);
                var order_history_string=JSON.stringify(order_history);		

                var last_updated=get_my_time();
                var data_json={data_store:'logistics_orders',
	 				data:[{index:'id',value:data_id},
	 					{index:'consignment_num',value:consignment_num},
	 					{index:'lbh',value:lbh},
	 					{index:'weight',value:weight},
	 					{index:'manifest_num',value:manifest_num},
                        {index:'man_id',value:manifest_id},
                        {index:'status',value:'in-transit'},
                        {index:'order_history',value:order_history_string},
	 					{index:'last_updated',value:last_updated}]};
 				
                update_json(data_json);

                $(form).readonly();

                del_button.removeAttribute("onclick");
                $(del_button).on('click',function(event)
                {
                    form321_delete_item(del_button);
                });

                $(save_button).off('click');
                $(save_button).on('click',function(event)
                {
                    event.preventDefault();
                    form321_update_item(form);
                });
                form321_update_serial_numbers();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form321_create_form(func)
        {
            if(is_create_access('form321'))
            {
                var form=document.getElementById("form321_master");

                var manifest_num=form.elements['manifest_num'].value;
                var coloader=form.elements['loader'].value;
                var vendor=form.elements['vendor'].value;
                var date=get_raw_time(form.elements['date'].value);
                var num_orders=form.elements['num'].value;
                var data_id=form.elements['id'].value;
                form.elements['saved'].value='yes';
                
                var save_button=document.getElementById('form321_save');
                var last_updated=get_my_time();

                form321_update_serial_numbers();
                
                var manifest_columns={data_store:"manifests",count:1,return_column:'id',indexes:[{index:'manifest_num',exact:manifest_num}]};
                read_json_single_column(manifest_columns,function(manifests)
                {
                    if(manifests.length==0)
                    {	
                        var data_json={data_store:'manifests',
                                    data:[{index:'id',value:data_id},
                                        {index:'manifest_num',value:manifest_num},
                                        {index:'coloader',value:coloader},
                                        {index:'date',value:date},
                                        {index:'vendor',value:vendor},
                                        {index:'num_orders',value:num_orders},
                                        {index:'type',value:'non-bag'},
                                        {index:'lbh',value:''},
                                        {index:'weight',value:''},
                                        {index:'seal_num',value:''},
                                        {index:'last_updated',value:last_updated}],
                                      log:'yes',
                                      log_data:{title:'Created',notes:'Manifest # '+manifest_num,link_to:'form322'}};

                        var num_data={data_store:'user_preferences',return_column:'id',count:1,indexes:[{index:'name',exact:'manifest_num'}]};
                        read_json_single_column(num_data,function (manifest_num_ids)
                        {
                            if(manifest_num_ids.length>0)
                            {
                                var num_json={data_store:'user_preferences',
                                    data:[{index:'id',value:manifest_num_ids[0]},
                                        {index:'value',value:(parseInt(manifest_num)+1)},
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
                        $("#modal77_link").click();
                    }
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form321_update_item(form)
        {
            if(is_update_access('form321'))
            {
                var manifest_num=document.getElementById('form321_master').elements['manifest_num'].value;
                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();

                var data_json={data_store:'logistics_orders',
	 				data:[{index:'id',value:data_id},
	 					{index:'manifest_num',value:manifest_num},
                        {index:'last_updated',value:last_updated}]};
 				
                update_json(data_json);
            }
            else
            {
                $("#modal2_link").click();
            }
        }


        function form321_update_form()
        {
            if(is_update_access('form321'))
            {
                var form=document.getElementById("form321_master");

                var manifest_num=form.elements['manifest_num'].value;
                var coloader=form.elements['loader'].value;
                var vendor=form.elements['vendor'].value;
                var date=get_raw_time(form.elements['date'].value);
                var data_id=form.elements['id'].value;
                var num_orders=form.elements['num'].value;
                
                var save_button=document.getElementById('form321_save');
                var last_updated=get_my_time();

                form321_update_serial_numbers();
                
                var manifest_columns={data_store:"manifests",count:2,return_column:'id',indexes:[{index:'manifest_num',exact:manifest_num}]};
                read_json_single_column(manifest_columns,function(manifests)
                {
                    if(manifests.length==0 || (manifests.length==1 && manifests[0]==data_id))
                    {
                        var data_json={data_store:'manifests',
                                    data:[{index:'id',value:data_id},
                                        {index:'manifest_num',value:manifest_num},
                                        {index:'coloader',value:coloader},
                                        {index:'num_orders',value:num_orders},
                                        {index:'date',value:date},
                                        {index:'vendor',value:vendor},
                                        {index:'last_updated',value:last_updated}],
                                      log:'yes',
                                      log_data:{title:'Updated',notes:'Manifest # '+manifest_num,link_to:'form322'}};

                        update_json(data_json);
                        $("[id^='save_form321_']").click();
                    }
                    else 
                    {
                        $("#modal77_link").click();
                    }
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form321_unmark_bag(manifest_id)
        {
            if(is_update_access('form321'))
            {
                var form=document.getElementById("form321_master");
                var manifest_num=form.elements['manifest_num'].value;
                form.elements['type'].value='non-bag';
                form.elements['lbh'].value='';
                form.elements['weight'].value='';
                form.elements['seal'].value='';
                
                var last_updated=get_my_time();
                var data_json={data_store:'manifests',
                            data:[{index:'id',value:manifest_id},
                                {index:'type',value:'non-bag'},
                                {index:'lbh',value:''},
                                {index:'weight',value:''},
                                {index:'seal_num',value:''},
                                {index:'last_updated',value:last_updated}],
                              log:'yes',
                              log_data:{title:'Updated',notes:'Unmarked manifest # '+manifest_num+' as bag',link_to:'form322'}};

                update_json(data_json);

            }
            else
            {
                $("#modal2_link").click();
            }
        }
        
        function form321_delete_item(button)
        {
            if(is_delete_access('form321'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var data_id=form.elements['id'].value;
                    var last_updated=get_my_time();
                    
                    var data_json={data_store:'logistics_orders',
	 				data:[{index:'id',value:data_id},
	 					{index:'consignment_num',value:''},
	 					{index:'manifest_num',value:''},
                        {index:'man_id',value:''},
                        {index:'status',value:'pending'},
	 					{index:'last_updated',value:last_updated}]};

                    update_json(data_json);
                    $(button).parent().parent().remove();
                    form321_update_serial_numbers();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form321_update_serial_numbers()
        {
            $('#form321_body').find('tr').each(function(index)
            {
                $(this).find('td:nth-child(2)').html(index+1);
            });
            var filter_fields=document.getElementById('form321_master');
            var new_results=[];
            var num_orders=0;
            $('#form321_body').find('form').each(function(index)
            {
                var new_obj={};
                var form=$(this)[0];
                
                if(form.elements[0].value!="")
                {
                    var num_pieces=form.elements[6].value;
                    if(!vUtil.isBlank(num_pieces))
                        num_orders+=parseInt(num_pieces);			
                    else
                        num_orders+=1;
                }
            
                new_obj['AWB No']=form.elements[0].value;
                new_obj['Consignement No']=form.elements[1].value;
                new_obj['LBH']=form.elements[2].value;
                new_obj['Actual Weight']=form.elements[3].value;
                new_obj['Volumetric Weight']=form.elements[4].value;
                new_obj['Item']=form.elements[5].value;
                new_obj['Pieces']=form.elements[6].value;
                new_obj['Destination']=form.elements[7].value;   
                new_results.push(new_obj);
            });

            filter_fields.elements['num'].value=num_orders;
            
            $('#form321_share').off('click');
            $('#form321_share').click(function()
            {
                var message_attachment=my_obj_array_to_csv_string(new_results);
                var subject='Manifest Sheet # '+filter_fields.elements['manifest_num'].value;
                var body="Hi,\nPlease find attached the manifest with this mail.\nCo-loader: "+filter_fields.elements['loader'].value+"\nVendor:"+filter_fields.elements['vendor'].value+"\nDate:"+filter_fields.elements['date'].value+"\n\nRegards,\nBeacon Couriers";

                modal209_action(subject,body,message_attachment);
            });

            $('#form321_csv').off('click');
            $('#form321_csv').click(function()
            {
                my_obj_array_to_csv(new_results,'Manifest # '+filter_fields.elements['manifest_num'].value);
            });

        }

        function form321_print_form()
        {
            print_form321_form(function(container)
            {
                $.print(container);
                container.innerHTML="";	
            });	
        }

        function print_form321_form(func)
        {
            var form_id='form321';

            ////////////setting up containers///////////////////////	
            var container=document.createElement('div');

            var header=document.createElement('div');
                var logo=document.createElement('div');
                var business_title=document.createElement('div');
                var mts_barcode=document.createElement('img');

            var mts_title=document.createElement('div');
            var detail_section=document.createElement('div');
            var table_container=document.createElement('div');

            ////////////setting styles for containers/////////////////////////

            container.setAttribute('style','width:98%;height:90%;margin:0px;padding:0px;');
            header.setAttribute('style','display:block;width:98%;height:70px;margin-top:10px;');
                logo.setAttribute('style','float:left;width:35%;height:60px;');
                business_title.setAttribute('style','float:left;width:40%;height:60px;text-align:center;font-weight:bold;');
                mts_barcode.setAttribute('style','float:right;width:23%;height:60px;padding:left:5px;padding-right:5px;');
            mts_title.setAttribute('style','display:block;width:98%;height:60px;text-align:center;font-size:40px;');	
            detail_section.setAttribute('style','display:block;width:98%;height:30px;text-align:center;');

            ///////////////getting the content////////////////////////////////////////

            var bt=get_session_var('title');
            var font_size=get_session_var('print_size');
            var logo_image=get_session_var('logo');

            var master_form=document.getElementById(form_id+'_master');
            var mts_date=master_form.elements['date'].value;
            var mts_num=master_form.elements['manifest_num'].value;
            var coloader=master_form.elements['loader'].value;
            var vendor=master_form.elements['vendor'].value;
            var type=master_form.elements['type'].value;

            ////////////////filling in the content into the containers//////////////////////////

            var table_element=document.getElementById(form_id+'_body');
            var total_items=$(table_element).find('tr').length;

            logo.innerHTML="<img src='https://vyavsaay.com/client_images/"+logo_image+"' style='height:98%;margin-left:10%'>";
            business_title.innerHTML=bt;

            $(mts_barcode).JsBarcode(mts_num,{displayValue:true,fontSize:20});

            mts_title.innerHTML="Manifest";
            var row2="";
            if(type=='bag')
            {
                var seal_num=master_form.elements['seal'].value;
                var lbh=master_form.elements['lbh'].value;
                row2="<tr><td>Type: Bag</td><td>Seal #: "+seal_num+"</td><td>LBH: "+lbh+"</td></tr>";
            }
            detail_text="<table style='border:none;width:98%;font-size:11px;'><tr><td>Co-loader: "+coloader+"</td><td>Vendor: "+vendor+"</td><td>Date: "+mts_date+"</td></tr>"+row2+"</table>";

            detail_section.innerHTML=detail_text;

            var new_table=document.createElement('table');
            new_table.setAttribute('style','font-size:10px;border:none;text-align:left;');
            new_table.setAttribute('class','printing_tables');

            var table_header="<tr style='border-top: 1px solid #000000;'><td style='text-align:left;width:5%'>S.No.</td>"+
                        "<td style='text-align:left;width:20%'>AWB #</td>"+
                        "<td style='text-align:left;width:12%'>Consigment #</td>"+
                        "<td style='text-align:left;width:10%'>Dimension</td>"+
                        "<td style='text-align:left;width:12%'>Weight</td>"+
                        "<td style='text-align:left;width:8%'>Pieces</td>"+
                        "<td style='text-align:left;width:15%'>Product</td>"+
                        "<td style='text-align:left;width:18%'>Destination</td></tr>";

            var table_rows=table_header;
            var counter=0;

            $(table_element).find('form').each(function(index)
            {
                counter+=1;
                var form=$(this)[0];
        
                var awb_num=""+form.elements[0].value;

                var cnote_no=document.createElement('div');
                var barcode_image=document.createElement('img');
                var barcode_value=document.createElement('div');

                barcode_image.setAttribute('style','width:130px;height:30px;');
                barcode_value.setAttribute('style','width:130px;font-size:14px;margin:1px;text-align:center;');

                barcode_value.innerHTML=awb_num;
                $(barcode_image).JsBarcode(awb_num,{displayValue:false});

                cnote_no.appendChild(barcode_image);
                cnote_no.appendChild(barcode_value);

                table_rows+="<tr style='border-top: 1px solid #000000;height:60px;'><td><div>"+counter+"</div></td>"+
                        "<td><div style='text-align:left;'>"+cnote_no.innerHTML+"</div></td>"+
                        "<td><div style='text-align:left;'>"+form.elements[1].value+"</div></td>"+
                        "<td><div style='text-align:left;'>"+form.elements[2].value+"</div></td>"+
                        "<td><div style='text-align:left;'>Actual: "+form.elements[3].value+"<br>Volumetric: "+form.elements[4].value+"</div></td>"+
                        "<td><div style='text-align:left;'>"+form.elements[6].value+"</div></td>"+
                        "<td><div style='text-align:left;'>"+form.elements[5].value+"</div></td>"+
                        "<td><div style='text-align:left;'>"+form.elements[7].value+"</div></td></tr>";				
            });
            new_table.innerHTML=table_rows;
            /////////////placing the containers //////////////////////////////////////////////////////	

            container.appendChild(header);
            container.appendChild(mts_title);
            container.appendChild(detail_section);

            container.appendChild(new_table);

            header.appendChild(logo);
            header.appendChild(business_title);
            header.appendChild(mts_barcode);

            func(container);
        }

    </script>
</div>