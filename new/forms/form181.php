<div id='form181' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form181_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form181_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form181_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form181_header'></form>
						<th><input type='text' placeholder="Order #" class='floatlabel' name='order' form='form181_header'></th>
						<th><input type='text' placeholder="Customer" class='floatlabel' name='customer' form='form181_header'></th>
						<th><input type='text' placeholder="Date" readonly="readonly" name='date' form='form181_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form181_header'></th>
						<th><input type='text' placeholder="Process" readonly='readonly' form='form181_header'></th>
						<th><input type='submit' form='form181_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form181_body'>
			</tbody>
		</table>
	</div>

    <script>
        function form181_header_ini()
        {
            var filter_fields=document.getElementById('form181_header');
            var order_filter=filter_fields.elements['order'];
            var name_filter=filter_fields.elements['customer'];
            var status_filter=filter_fields.elements['status'];

            var order_data={data_store:'sale_orders',return_column:'order_num'};
            var cust_data={data_store:'customers',return_column:'acc_name'};

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form181_ini();
            });

            set_my_filter_json(order_data,order_filter);
            set_my_filter_json(cust_data,name_filter);
            set_static_filter_json('sale_orders','status',status_filter);
        };

        function form181_ini()
        {
            show_loader();
            var fid=$("#form181_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form181_body').html("");

            var filter_fields=document.getElementById('form181_header');
            var	forder=filter_fields.elements['order'].value;
            var fname=filter_fields.elements['customer'].value;
            var fstatus=filter_fields.elements['status'].value;

            var paginator=$('#form181_body').paginator();

			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='sale_orders';

					columns.indexes=[{index:'id',value:fid},
									{index:'order_num',value:forder},
									{index:'customer_name',value:fname},
									{index:'order_date'},
                                    {index:'bill_id'},
                                    {index:'billing_type'},
                                    {index:'challan_info'},
									{index:'status',value:fstatus}];

            read_json_rows('form181',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="";
                    rowsHTML+="<tr>";
                        rowsHTML+="<form id='form181_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Order #'>";
                                rowsHTML+="<a onclick=\"element_display('"+result.id+"','form180');\"><input type='text' readonly='readonly' form='form181_"+result.id+"' value='"+result.order_num+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Customer'>";
                                rowsHTML+="<a onclick=\"show_object('customers','"+result.customer_name+"');\"><textarea readonly='readonly' form='form181_"+result.id+"'>"+result.customer_name+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Date'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form181_"+result.id+"' value='"+get_my_past_date(result.order_date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Status'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form181_"+result.id+"' value='"+result.status+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Process'>";
                                rowsHTML+="<input type='hidden' form='form181_"+result.id+"' value='"+result.id+"'>";
                                if(result.challan_info!="" && result.challan_info!=null && result.challan_info!="[]")
                                {
                                    rowsHTML+="<button type='button' class='btn default purple-stripe' form='form181_"+result.id+"' name='view_challan'>View Challan</button>";

                                    if(result.bill_id!="" && result.bill_id!=null && result.bill_id!="[]")
                                    {
                                        rowsHTML+="<button type='button' class='btn default yellow-stripe' form='form181_"+result.id+"' name='view_bill'>View Bill</button>";
                                    }
                                    else
                                    {
                                        rowsHTML+="<button type='button' class='btn default yellow-stripe' form='form181_"+result.id+"' name='create_bill'>Create Bill</button>";
                                    }
                                }
                                else
                                {
                                    rowsHTML+="<button type='button' class='btn default purple-stripe' form='form181_"+result.id+"' name='create_challan'>Create Challan</button>";
                                }
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<button type='button' class='btn red' form='form181_"+result.id+"' title='Delete order' name='delete' onclick='form181_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form181_body').append(rowsHTML);
                    var fields=document.getElementById("form181_"+result.id);
                    var status_filter=fields.elements[3];
                    var create_bill_button=fields.elements['create_bill'];
                    var view_bill_button=fields.elements['view_bill'];

                    var create_challan_button=fields.elements['create_challan'];
                    var view_challan_button=fields.elements['view_challan'];

                    set_static_value_list_json('sale_orders','status',status_filter);

                    $(create_bill_button).on('click',function(event)
                    {
                       form181_bill(result.id,result.billing_type,result.order_num,result.customer_name);
                    });

                    $(view_bill_button).on('click',function(event)
                    {
                        var bill_id_array=vUtil.jsonParse(result.bill_id);
                        element_display(bill_id_array[0].bill_id,'form225');
                    });

                    $(create_challan_button).on('click',function(event)
                    {
                        modal195_action(result.id,result.order_num,result.customer_name);
                    });

                    $(view_challan_button).on('click',function(event)
                    {
                        var bill_id_array=vUtil.jsonParse(result.challan_info);
                        element_display(bill_id_array[0].challan_id,'form323');
                    });
                });

				$('#form181').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(columns,'Sale Orders','form181',function (item)
                {
                    delete item.bill_id;
                    delete item.challan_info;
                    item.order_date=get_my_past_date(item.order_date);
                });
                hide_loader();
            });
        };

        function form181_delete_item(button)
        {
            if(is_delete_access('form181'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var order_num=form.elements[0].value;
                    var customer_name=form.elements[1].value;
                    var order_date=get_raw_time(form.elements[2].value);
                    var status=form.elements[3].value;
                    var data_id=form.elements[4].value;
                    var last_updated=get_my_time();

                    var data_json={data_store:'sale_orders',
	 				log:'yes',
	 				data:[{index:'id',value:data_id}],
	 				log_data:{title:'Deleted',notes:'Sale order # '+order_num,link_to:'form181'}};

                    var item_json={data_store:'sale_order_items',
	 				data:[{index:'order_id',value:data_id}]};

                    delete_json(data_json);
                    delete_json(item_json);
                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form181_challan(order_id,order_num,customer)
        {
            if(is_create_access('form181'))
            {
                show_loader();
                var pending_items_count=0;
                var actual_order_items=[];
                var order_items=[];
                var bill_key=get_new_key();

                $("#modal195_item_table tr").each(function(index)
                {
                    var checked=false;
                    if($(this).find('td:nth-child(3)>input').length>0)
                        checked=$(this).find('td:nth-child(3)>input')[0].checked;
                    var order_item=new Object();

                    if(checked)
                    {
                        order_item=vUtil.jsonParse($(this).attr('data-object'));
                        order_items.push(order_item);
                    }
                    actual_order_items.push(order_item);
                });

                if(!(order_items.length!=(actual_order_items.length-1) && get_session_var('allow_partial_challan')=='no'))
                {
                    if(order_items.length>0)
                    {
                        pending_items_count=order_items.length;
                        console.log(order_items);

                        var challan_items_json={data_store:'delivery_challan_items',loader:'no',data:[]};
                        var challan_items_adjust_json={data_store:'inventory_adjust',loader:'no',data:[]};

                        var master_bill_item_id=get_new_key();
                        var bill_item_id=get_new_key();
                        order_items.forEach(function(order_item)
                        {
                            var batch_data={data_store:'product_instances',
                                            indexes:[{index:'batch'},{index:'last_updated'},{index:'product_name',exact:order_item.item_name}]};
                            read_json_rows('',batch_data,function(batches_array)
                            {
                                //console.log(batches_array);
                                batches_array.sort(function(a,b)
                                {
                                    if(parseFloat(a.last_updated)>parseFloat(b.last_updated))
                                    {	return 1;}
                                    else
                                    {	return -1;}
                                });
                                var batches=[];
                                batches_array.forEach(function (batches_array_elem)
                                {
                                    //console.log(batches_array_elem);
                                    batches.push(batches_array_elem.batch);
                                });

                                console.log(batches);

                                var single_batch=batches[0];
                                var batches_result_array=[];
                                get_available_batch(order_item.item_name,batches,order_item.quantity,batches_result_array,function()
                                {
                                    console.log(batches_result_array);
                                    if(batches_result_array.length===0)
                                    {
                                        var single_batch_object=new Object();
                                        single_batch_object.batch=single_batch;
                                        single_batch_object.quantity=order_item.quantity;

                                        batches_result_array.push(single_batch_object);
                                    }

                                    pending_items_count+=batches_result_array.length-1;

                                    batches_result_array.forEach(function(batch_result)
                                    {
                                        var storage_xml={data_store:'area_utilization',return_column:'name',
                                                        indexes:[{index:'item_name',exact:order_item.item_name},
                                                                {index:'batch',exact:batch_result.batch}]};

                                        read_json_single_column(storage_xml,function (storages)
                                        {
                                            var storage_result_array=[];
                                            get_available_storage(order_item.item_name,batch_result.batch,storages,batch_result.quantity,storage_result_array,function ()
                                            {
                                                console.log(storage_result_array);
                                                var item_storage="";
                                                if(storage_result_array.length>0)
                                                {
                                                    item_storage=storage_result_array[0].storage;
                                                }
                                                /////saving to bill item

                                                bill_item_id++;
                                                var data_json_array=[{index:'id',value:bill_item_id},
                                                        {index:'item_name',value:order_item.item_name},
                                                        {index:'item_desc',value:order_item.item_desc},
                                                        {index:'batch',value:batch_result.batch},
                                                        {index:'challan_id',value:bill_key},
                                                        {index:'storage',value:item_storage},
                                                        {index:'quantity',value:batch_result.quantity},
                                                        {index:'last_updated',value:get_my_time()}];

                                                var adjust_json_array=[{index:'id',value:bill_item_id},
                                                        {index:'product_name',value:order_item.item_name},
                                                        {index:'item_desc',value:order_item.item_desc},
                                                        {index:'batch',value:batch_result.batch},
                                                        {index:'storage',value:item_storage},
                                                        {index:'quantity',value:(-batch_result.quantity)+""},
                                                        {index:'source_id',value:bill_key},
                                                        {index:'source',value:'delivery challan'},
                                                        {index:'last_updated',value:get_my_time()}];

                                                challan_items_json.data.push(data_json_array);
                                                challan_items_adjust_json.data.push(adjust_json_array);

                                                pending_items_count-=1;
                                            });
                                        });
                                    });
                                });
                            });
                        });

                        /////saving bill details
                        var bill_items_complete=setInterval(function()
                        {
                           if(pending_items_count===0)
                           {
                                clearInterval(bill_items_complete);

                                var num_data={data_store:'user_preferences',
                                              indexes:[{index:'id'},{index:'value'},{index:'name',exact:'challan_num'}]};
                                read_json_rows('',num_data,function (bill_num_ids)
                                {
                                    if(bill_num_ids.length>0)
                                    {
                                        //////////////////////////////////////////////
                                        var sale_order_xml={data_store:'sale_orders',
                                                           indexes:[{index:'id',value:order_id},
                                                                   {index:'challan_info'},{index:'total_quantity'}]};
                                        read_json_rows('',sale_order_xml,function (sorders)
                                        {
                                            if(sorders.length>0)
                                            {
                                                var id_object_array=vUtil.jsonParse(sorders[0].challan_info);

                                                var id_object=new Object();
                                                id_object.challan_num=bill_num_ids[0].value;
                                                id_object.challan_id=bill_key;

                                                id_object.quantity=0;
                                                for(var j in order_items)
                                                {
                                                    id_object.quantity+=parseFloat(order_items[j].quantity);
                                                }
                                                id_object_array.push(id_object);

                                                var master_total_quantity=0;
                                                for(var k in id_object_array)
                                                {
                                                    master_total_quantity+=parseFloat(id_object_array[k].quantity);
                                                }

                                                var status='delivered';

                                                var new_bill_id=JSON.stringify(id_object_array);
                                                //console.log(new_bill_id);
                                                var so_json={data_store:'sale_orders',
                                                    data:[{index:'id',value:order_id},
                                                        {index:'challan_info',value:new_bill_id},
                                                        {index:'status',value:status},
                                                        {index:'last_updated',value:get_my_time()}]};

                                                update_json(so_json,function ()
                                                {
                                                    form181_ini();
                                                });
                                            }
                                        });
                                        /////////////////////////////////////////////
                                        var bill_key_string=""+bill_key;

                                        var num_json={data_store:'user_preferences',
                                            data:[{index:'id',value:bill_num_ids[0].id},
                                                {index:'value',value:(parseInt(bill_num_ids[0].value)+1)},
                                                {index:'last_updated',value:get_my_time()}]};

                                        var challan_json={data_store:'delivery_challans',
                                            data:[{index:'id',value:bill_key},
                                                {index:'challan_num',value:get_session_var('challan_prefix')+"-"+bill_num_ids[0].value},
                                                {index:'challan_date',value:get_my_time()},
                                                {index:'order_num',value:order_num},
                                                {index:'order_id',value:order_id},
                                                {index:'total_quantity',value:''},
                                                {index:'customer',value:customer},
                                                {index:'last_updated',value:get_my_time()}],
                                            log:'yes',
                                            log_data:{title:'Created',notes:'Delivery Challan for order # '+order_num,link_to:'form324'}};

                                        update_json(num_json);
                                        create_json(challan_json);

                                        create_batch_json(challan_items_json);
                                        create_batch_json(challan_items_adjust_json);
                                    }
                                });
                                hide_loader();
                            }
                        },200);
                    }
                    else
                    {
                        hide_loader();
                        $("#modal89_link").click();
                    }
                }
                else
                {
                    hide_loader();
                    $("#modal90_link").click();
                }
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form181_bill(order_id,order_type,order_num,customer)
        {
            if(is_create_access('form181'))
            {
                show_loader();
                var bill_amount=0;
                var bill_tax=0;
                var bill_total=0;

                var order_items=[];
                var bill_key=get_new_key();

                var challan_data={data_store:'delivery_challans',return_column:'id',count:1,
                                  indexes:[{index:'order_id',exact:order_id}]};

                read_json_single_column(challan_data,function(challans)
                {
                    var challan_items_data={data_store:'delivery_challan_items',
                                           indexes:[{index:'id'},
                                                   {index:'challan_id',exact:challans[0]},
                                                   {index:'item_name'},
                                                   {index:'item_desc'},
                                                   {index:'storage'},
                                                   {index:'quantity'},
                                                   {index:'batch'}]};
                    read_json_rows('',challan_items_data,function(challan_items)
                    {
                        var bill_items_json={data_store:'bill_items',loader:'no',data:[]};
                        var bill_items_adjust_json={data_store:'inventory_adjust',loader:'no',data:[]};
                        var master_bill_item_id=get_new_key();
                        var bill_item_id=get_new_key();
                        var pending_items_count=challan_items.length;

                        challan_items.forEach(function(order_item)
                        {
                            var batch_data={data_store:'product_instances',count:1,
                                           indexes:[{index:'sale_price'},
                                                   {index:'mrp'},
                                                   {index:'product_name',exact:order_item.item_name},
                                                   {index:'batch',exact:order_item.batch}]};
                            read_json_rows('',batch_data,function(batches)
                            {
                                var product_master_data={data_store:'product_master',return_column:'tax',
                                                        indexes:[{index:'name',exact:order_item.item_name}]};
                                read_json_single_column(product_master_data,function(products_master)
                                {
                                    var item_tax_rate=parseFloat(products_master[0])/100;
                                    if(isNaN(item_tax_rate))
                                    {
                                        item_tax_rate=0;
                                    }

                                    var unit_price=batches[0].sale_price;
                                    var mrp=batches[0].mrp;
                                    var bill_item_amount=vUtil.round(parseFloat(unit_price)*parseFloat(order_item.quantity),2);
                                    var bill_item_tax=vUtil.round(item_tax_rate*parseFloat(bill_item_amount),2);
                                    var bill_item_total=vUtil.round(bill_item_amount+bill_item_tax,0);

                                    bill_item_id++;
                                    var data_json_array=[{index:'id',value:bill_item_id},
                                            {index:'item_name',value:order_item.item_name},
                                            {index:'item_desc',value:order_item.item_desc},
                                            {index:'batch',value:order_item.batch},
                                            {index:'bill_id',value:bill_key},
                                            {index:'storage',value:order_item.storage},
                                            {index:'quantity',value:order_item.quantity},
                                            {index:'unit_price',value:unit_price},
                                            {index:'mrp',value:mrp},
                                            {index:'amount',value:bill_item_amount},
                                            {index:'tax',value:bill_item_tax},
                                            {index:'total',value:bill_item_total},
                                            {index:'last_updated',value:get_my_time()}];

                                    var adjust_json_array=[{index:'id',value:bill_item_id},
                                            {index:'product_name',value:order_item.item_name},
                                            {index:'item_desc',value:order_item.item_desc},
                                            {index:'batch',value:order_item.batch},
                                            {index:'storage',value:order_item.storage},
                                            {index:'quantity',value:order_item.quantity},
                                            {index:'source_id',value:bill_key},
                                            {index:'source',value:'sale'},
                                            {index:'last_updated',value:get_my_time()}];

                                    bill_items_json.data.push(data_json_array);
                                    bill_items_adjust_json.data.push(adjust_json_array);

                                    bill_amount+=bill_item_amount;
                                    bill_total+=bill_item_total;
                                    bill_tax+=bill_item_tax;

                                    pending_items_count-=1;
                                });
                            });
                        });

                        /////saving bill details
                        var bill_items_complete=setInterval(function()
                        {
                           if(pending_items_count===0)
                           {
                                clearInterval(bill_items_complete);

                                var num_data={data_store:'user_preferences',
                                              indexes:[{index:'id'},
                                                      {index:'value'},
                                                      {index:'name',exact:order_type+"_bill_num"}]};
                                read_json_rows('',num_data,function (bill_num_ids)
                                {
                                    if(bill_num_ids.length>0)
                                    {
                                        //////////////////////////////////////////////
                                        var sale_order_xml={data_store:'sale_orders',
                                                           indexes:[{index:'id',value:order_id},
                                                                   {index:'bill_id'},
                                                                   {index:'total_quantity'}]};
                                        read_json_rows('',sale_order_xml,function (sorders)
                                        {
                                            if(sorders.length>0)
                                            {
                                                var id_object_array=vUtil.jsonParse(sorders[0].bill_id);

                                                var id_object=new Object();
                                                id_object.bill_num=bill_num_ids[0].value;
                                                id_object.bill_id=bill_key;

                                                id_object.quantity=0;
                                                for(var j in order_items)
                                                {
                                                    id_object.quantity+=parseFloat(order_items[j].quantity);
                                                }
                                                id_object_array.push(id_object);

                                                var master_total_quantity=0;
                                                for(var k in id_object_array)
                                                {
                                                    master_total_quantity+=parseFloat(id_object_array[k].quantity);
                                                }

                                                var status='billed';
                                                var new_bill_id=JSON.stringify(id_object_array);

                                                var so_json={data_store:'sale_orders',
                                                    data:[{index:'id',value:order_id},
                                                        {index:'bill_id',value:new_bill_id},
                                                        {index:'status',value:status},
                                                        {index:'last_updated',value:get_my_time()}]};
                                                update_json(so_json,function ()
                                                {
                                                    form181_ini();
                                                });
                                            }
                                        });
                                        /////////////////////////////////////////////
                                        var bill_key_string=""+bill_key;

                                        var bill_json={data_store:'bills',
                                            data:[{index:'id',value:bill_key},
                                                {index:'customer_name',value:customer},
                                                {index:'bill_num',value:bill_num_ids[0].value},
                                                {index:'billing_type',value:order_type},
                                                {index:'bill_date',value:get_my_time()},
                                                {index:'amount',value:bill_amount},
                                                {index:'total',value:bill_total},
                                                {index:'discount',value:'0'},
                                                {index:'tax',value:bill_tax},
                                                {index:'transaction_id',value:bill_key},
                                                {index:'order_id',value:order_id},
                                                {index:'order_num',value:order_num},
                                                {index:'last_updated',value:get_my_time()}],
                                            log:'yes',
                                            log_data:{title:'Created',notes:'Billed order #'+order_num,link_to:'form92'}};

                                        var transaction_json={data_store:'transactions',
                                            data:[{index:'id',value:bill_key},
                                                {index:'trans_date',value:get_my_time()},
                                                {index:'amount',value:bill_total},
                                                {index:'receiver',value:customer},
                                                {index:'giver',value:'master'},
                                                {index:'tax',value:bill_tax},
                                                {index:'last_updated',value:get_my_time()}]};

                                        var pt_tran_id=get_new_key();

                                        var payment_json={data_store:'payments',
                                            data:[{index:'id',value:pt_tran_id},
                                                {index:'status',value:'pending'},
                                                {index:'type',value:'received'},
                                                {index:'date',value:get_my_time()},
                                                {index:'total_amount',value:bill_total},
                                                {index:'paid_amount',value:'0'},
                                                {index:'acc_name',value:customer},
                                                {index:'due_date',value:get_credit_period()},
                                                {index:'mode',value:get_payment_mode()},
                                                {index:'transaction_id',value:pt_tran_id},
                                                {index:'source_id',value:bill_key},
                                                {index:'source',value:'sale bill'},
                                                {index:'source_info',value:bill_num_ids[0].value},
                                                {index:'last_updated',value:get_my_time()}]};

                                        var pt_json={data_store:'transactions',
                                            data:[{index:'id',value:pt_tran_id},
                                                {index:'trans_date',value:get_my_time()},
                                                {index:'amount',value:bill_total},
                                                {index:'receiver',value:'master'},
                                                {index:'giver',value:customer},
                                                {index:'tax',value:'0'},
                                                {index:'last_updated',value:get_my_time()}]};

                                        var num_json={data_store:'user_preferences',
                                                data:[{index:'id',value:bill_num_ids[0].id},
                                                    {index:'value',value:(parseFloat(bill_num_ids[0].value)+1)},
                                                    {index:'last_updated',value:get_my_time()}]};

                                        create_json(transaction_json);
                                        create_json(pt_json);
                                        create_json(payment_json);
                                        update_json(num_json);
                                        create_json(bill_json);

                                        create_batch_json(bill_items_json);
                                        create_batch_json(bill_items_adjust_json);
                                    }
                                });
                                hide_loader();
                            }
                        },200);
                    });
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }


    </script>
</div>
