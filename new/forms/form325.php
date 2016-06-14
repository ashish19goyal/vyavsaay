<div id='form325' class='tab-pane'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form325_header'></form>
					<th>Order # <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form325_header'></th>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form325_header'></th>
					<th>Order Date </th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form325_header'></th>
					<th><input type="button" value='Add new order' class='add_icon' form='form325_header' onclick="element_display('','form69'); form69_new_form();">
						<input type='button' form='form325_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form325_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form325_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form325_prev' class='prev_icon' data-index='-25' onclick="$('#form325_index').attr('data-index',$(this).attr('data-index')); form325_ini();">
		<div style='display:hidden;' id='form325_index' data-index='0'></div>
		<img src='./images/next.png' id='form325_next' class='next_icon' data-index='25' onclick="$('#form325_index').attr('data-index',$(this).attr('data-index')); form325_ini();">
	</div>

    <script>
        function form325_header_ini()
        {
            var filter_fields=document.getElementById('form325_header');
            var order_filter=filter_fields.elements[0];
            var name_filter=filter_fields.elements[1];
            var status_filter=filter_fields.elements[2];

            var order_data="<sale_orders>" +
                    "<order_num></order_num>" +
                    "</sale_orders>";

            var cust_data="<customers>" +
                    "<acc_name></acc_name>" +
                    "</customers>";
            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form325_ini();
            });

            set_my_filter(order_data,order_filter);
            set_my_filter(cust_data,name_filter);
            set_static_filter('sale_orders','status',status_filter);
        };

        function form325_ini()
        {
            show_loader();
            var fid=$("#form325_link").attr('data_id');
            if(fid==null)
                fid="";

            var filter_fields=document.getElementById('form325_header');

            //populating form
            var	forder=filter_fields.elements[0].value;
            var fname=filter_fields.elements[1].value;
            var fstatus=filter_fields.elements[2].value;

            ////indexing///
            var index_element=document.getElementById('form325_index');
            var prev_element=document.getElementById('form325_prev');
            var next_element=document.getElementById('form325_next');
            var start_index=index_element.getAttribute('data-index');
            //////////////

            var columns="<sale_orders count='25' start_index='"+start_index+"'>" +
                    "<id>"+fid+"</id>" +
                    "<order_num>"+forder+"</order_num>" +
                    "<customer_name>"+fname+"</customer_name>" +
                    "<order_date></order_date>" +
                    "<status>"+fstatus+"</status>" +
                    "<billing_type></billing_type>"+
                    "<bill_id></bill_id>" +
                    "</sale_orders>";

            $('#form325_body').html("");

            fetch_requested_data('form325',columns,function(results)
            {
                results.forEach(function(result)
                {
                    var rowsHTML="";
                    rowsHTML+="<tr>";
                        rowsHTML+="<form id='form325_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Order #'>";
                                rowsHTML+="<input type='text' class='input_link' readonly='readonly' form='form325_"+result.id+"' onclick=\"element_display('"+result.id+"','form320');\" value='"+result.order_num+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Customer'>";
                                rowsHTML+="<textarea readonly='readonly' form='form325_"+result.id+"'>"+result.customer_name+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Order Date'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form325_"+result.id+"' value='"+get_my_past_date(result.order_date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Status'>";
                                rowsHTML+="<input type='text' readonly='readonly' class='dblclick_editable' form='form325_"+result.id+"' value='"+result.status+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form325_"+result.id+"' value='"+result.id+"'>";
                                rowsHTML+="<input type='submit' class='save_icon' form='form325_"+result.id+"' title='Save order'>";
                                rowsHTML+="<input type='button' class='delete_icon' form='form325_"+result.id+"' title='Delete order' onclick='form325_delete_item($(this));'>";
                            if(result.status!='closed' && result.status!='cancelled' && result.status!='billed' && result.status!='picked' && result.status!='packed' && result.status!='dispatched')
                            {
                                rowsHTML+="<br><input type='button' class='generic_icon' form='form325_"+result.id+"' name='create' value='Create Bill'>";
                            }
                            if(result.status!='pending')
                            {
                                rowsHTML+="<br><input type='button' class='generic_icon' form='form325_"+result.id+"' name='view' value='View Bill'>";
                            }
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form325_body').append(rowsHTML);
                    var fields=document.getElementById("form325_"+result.id);
                    var status_filter=fields.elements[3];
                    var create_bill_button=fields.elements['create'];
                    var view_bill_button=fields.elements['view'];

                    set_static_value_list('sale_orders','status',status_filter);
                    $(fields).on("submit",function(event)
                    {
                        event.preventDefault();
                        form325_update_item(fields);
                    });

                    $(create_bill_button).off('click');
                    $(create_bill_button).on('click',function(event)
                    {
                        modal159_action(result.id,result.order_num,result.customer_name,result.billing_type,result.bill_id);
                    });

                    $(view_bill_button).off('click');
                    $(view_bill_button).on('click',function(event)
                    {
                        modal154_action(result.bill_id);
                    });
                });

                ////indexing///
                var next_index=parseInt(start_index)+25;
                var prev_index=parseInt(start_index)-25;
                next_element.setAttribute('data-index',next_index);
                prev_element.setAttribute('data-index',prev_index);
                index_element.setAttribute('data-index','0');
                if(results.length<25)
                {
                    $(next_element).hide();
                }
                else
                {
                    $(next_element).show();
                }
                if(prev_index<0)
                {
                    $(prev_element).hide();
                }
                else
                {
                    $(prev_element).show();
                }
                /////////////

                longPressEditable($('.dblclick_editable'));
                $('textarea').autosize();

                var export_button=filter_fields.elements[4];
                $(export_button).off("click");
                $(export_button).on("click", function(event)
                {
                    get_export_data(columns,'sale_orders');
                });
                hide_loader();
            });
        };

        function form325_delete_item(button)
        {
            if(is_delete_access('form325'))
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
                    var data_xml="<sale_orders>" +
                                "<id>"+data_id+"</id>" +
                                "</sale_orders>";
                    var activity_xml="<activity>" +
                                "<data_id>"+data_id+"</data_id>" +
                                "<tablename>sale_orders</tablename>" +
                                "<link_to>form325</link_to>" +
                                "<title>Deleted</title>" +
                                "<notes>Sale Order # "+order_num+"</notes>" +
                                "<updated_by>"+get_name()+"</updated_by>" +
                                "</activity>";
                    var other_delete="<sale_order_items>" +
                            "<order_id>"+data_id+"</order_id>" +
                            "</sale_order_items>";
                    delete_row(data_xml,activity_xml);
                    delete_simple(other_delete);
                    $(button).parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }


        function form325_bill(order_id,bill_type,order_num,customer)
        {
            ///check following data is adequately updated
            //a. product batches
            //b. channel prices
            //c. pickup charges
            if(is_create_access('form325'))
            {
                console.log(bill_type);
                show_loader();
                var bill_amount=0;
                var bill_total=0;
                var bill_freight=0;
                var bill_tax=0;
                var bill_channel_charges=0;
                var bill_channel_tax=0;
                var bill_channel_payable=0;

                var pending_items_count=0;

                var actual_order_items=[];
                var order_items=[];
                var bill_key=get_new_key();

                $("#modal159_item_table tr").each(function(index)
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

                //console.log(order_items);
                //console.log(actual_order_items);

                if(!(order_items.length!=(actual_order_items.length-1) && get_session_var('allow_partial_billing')=='no'))
                {
                    if(order_items.length>0)
                    {
                        pending_items_count=order_items.length;
                        console.log(order_items);

                        var bill_items_xml_array=[];
                        var order_items_xml_array=[];

                        order_items.forEach(function(order_item)
                        {
                            var item_amount=order_item.amount;
                            var item_total=order_item.total;
                            var item_tax=order_item.tax;
                            var item_mrp=order_item.mrp;
                            var item_tax_rate=order_item.tax_rate;

                            var batch_data="<product_instances>" +
                                    "<batch></batch>" +
                                    "<product_name exact='yes'>"+order_item.item_name+"</product_name>" +
                                    "<last_updated></last_updated>" +
                                    "</product_instances>";
                            fetch_requested_data('',batch_data,function(batches_array)
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
                                    var unit_price=item_amount/parseFloat(order_item.quantity);

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
                                        var storage_xml="<area_utilization>"+
                                                        "<name></name>"+
                                                        "<item_name exact='yes'>"+order_item.item_name+"</item_name>"+
                                                        "<batch exact='yes'>"+batch_result.batch+"</batch>"+
                                                        "</area_utilization>";

                                        get_single_column_data(function (storages)
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

                                                var bill_item_amount=vUtil.round((item_amount*batch_result.quantity/order_item.quantity),2);
                                                var bill_item_total=vUtil.round((item_total*batch_result.quantity/order_item.quantity),2);
                                                var bill_item_tax=vUtil.round((item_tax*batch_result.quantity/order_item.quantity),2);

                                                var bill_item_id=get_new_key();
                                                var data_xml="<bill_items>" +
                                                        "<id>"+bill_item_id+"</id>" +
                                                        "<item_name>"+order_item.item_name+"</item_name>" +
                                                        "<batch>"+batch_result.batch+"</batch>" +
                                                        "<unit_price>"+unit_price+"</unit_price>" +
                                                        "<mrp>"+item_mrp+"</mrp>" +
                                                        "<quantity>"+batch_result.quantity+"</quantity>" +
                                                        "<amount>"+bill_item_amount+"</amount>" +
                                                        "<total>"+bill_item_total+"</total>" +
                                                        "<tax>"+bill_item_tax+"</tax>" +
                                                        "<tax_rate>"+item_tax_rate+"</tax_rate>" +
                                                        "<bill_id>"+bill_key+"</bill_id>" +
                                                        "<storage>"+item_storage+"</storage>"+
                                                        "<last_updated>"+get_my_time()+"</last_updated>" +
                                                        "</bill_items>";

                                                bill_items_xml_array.push(data_xml);

                                                bill_amount+=bill_item_amount;
                                                bill_total+=bill_item_total;
                                                bill_tax+=bill_item_tax;

                                                pending_items_count-=1;
                                            });

                                        },storage_xml);
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

                                var num_data="<user_preferences>"+
                                            "<id></id>"+
                                            "<value></value>"+
                                            "<name exact='yes'>"+bill_type+"_bill_num</name>"+
                                            "</user_preferences>";
                                fetch_requested_data('',num_data,function (bill_num_ids)
                                {
                                    if(bill_num_ids.length>0)
                                    {
                                        //////////////////////////////////////////////
                                        var sale_order_xml="<sale_orders>"+
                                                    "<id>"+order_id+"</id>" +
                                                    "<bill_id></bill_id>" +
                                                    "<total_quantity></total_quantity>"+
                                                    "</sale_orders>";
                                        fetch_requested_data('',sale_order_xml,function (sorders)
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

                                                var status='partially billed';
                                                if(master_total_quantity==parseFloat(sorders[0].total_quantity))
                                                {
                                                    status='billed';
                                                }

                                                var new_bill_id=JSON.stringify(id_object_array);
                                                //console.log(new_bill_id);
                                                var so_xml="<sale_orders>" +
                                                        "<id>"+order_id+"</id>" +
                                                        "<bill_id>"+new_bill_id+"</bill_id>" +
                                                        "<status>"+status+"</status>" +
                                                        "<last_updated>"+get_my_time()+"</last_updated>" +
                                                        "</sale_orders>";
                                                update_simple_func(so_xml,function ()
                                                {
                                                    form325_ini();
                                                });
                                            }
                                        });
                                        /////////////////////////////////////////////
                                        var bill_key_string=""+bill_key;

                                        var num_xml="<user_preferences>"+
                                                "<id>"+bill_num_ids[0].id+"</id>"+
                                                "<value>"+(parseInt(bill_num_ids[0].value)+1)+"</value>"+
                                                "<last_updated>"+get_my_time()+"</last_updated>"+
                                                "</user_preferences>";
                                        var bill_xml="<bills>" +
                                                "<id>"+bill_key+"</id>" +
                                                "<bill_num>"+bill_num_ids[0].value+"</bill_num>"+
                                                "<order_num>"+order_num+"</order_num>"+
                                                "<order_id>"+order_id+"</order_id>"+
                                                "<customer_name>"+customer+"</customer_name>" +
                                                "<bill_date>"+get_my_time()+"</bill_date>" +
                                                "<billing_type>"+bill_type+"</billing_type>" +
                                                "<amount>"+bill_amount+"</amount>" +
                                                "<total>"+bill_total+"</total>" +
                                                "<discount>0</discount>" +
                                                "<tax>"+bill_tax+"</tax>" +
                                                "<transaction_id>"+order_id+"</transaction_id>" +
                                                "<last_updated>"+get_my_time()+"</last_updated>" +
                                                "</bills>";
                                        var activity_xml="<activity>" +
                                                "<data_id>"+bill_key+"</data_id>" +
                                                "<tablename>bills</tablename>" +
                                                "<link_to>form42</link_to>" +
                                                "<title>Saved</title>" +
                                                "<notes>Billed order# "+order_num+"</notes>" +
                                                "<updated_by>"+get_name()+"</updated_by>" +
                                                "</activity>";
                                        var transaction_xml="<transactions>" +
                                                "<id>"+bill_key+"</id>" +
                                                "<trans_date>"+get_my_time()+"</trans_date>" +
                                                "<amount>"+bill_total+"</amount>" +
                                                "<receiver>"+customer+"</receiver>" +
                                                "<giver>master</giver>" +
                                                "<tax>"+bill_tax+"</tax>" +
                                                "<last_updated>"+get_my_time()+"</last_updated>" +
                                                "</transactions>";
                                        var pt_tran_id=get_new_key();
                                        var payment_xml="<payments>" +
                                                "<id>"+pt_tran_id+"</id>" +
                                                "<status>pending</status>" +
                                                "<type>received</type>" +
                                                "<date>"+get_my_time()+"</date>" +
                                                "<total_amount>"+bill_total+"</total_amount>" +
                                                "<paid_amount>0</paid_amount>" +
                                                "<acc_name>"+customer+"</acc_name>" +
                                                "<due_date>"+get_credit_period()+"</due_date>" +
                                                "<mode>"+get_payment_mode()+"</mode>" +
                                                "<transaction_id>"+pt_tran_id+"</transaction_id>" +
                                                "<source_id>"+order_id+"</source_id>" +
                                                "<source>sale bill</source>" +
                                                "<source_info>"+bill_num_ids[0].value+"</source_info>"+
                                                "<last_updated>"+get_my_time()+"</last_updated>" +
                                                "</payments>";
                                        var pt_xml="<transactions>" +
                                                "<id>"+pt_tran_id+"</id>" +
                                                "<trans_date>"+get_my_time()+"</trans_date>" +
                                                "<amount>"+bill_total+"</amount>" +
                                                "<receiver>master</receiver>" +
                                                "<giver>"+customer+"</giver>" +
                                                "<tax>0</tax>" +
                                                "<last_updated>"+get_my_time()+"</last_updated>" +
                                                "</transactions>";

                                        create_simple(transaction_xml);
                                        create_simple(pt_xml);
                                        create_simple(payment_xml);
                                        update_simple(num_xml);
                                        create_row(bill_xml,activity_xml);

                                        //console.log(bill_items_xml_array);
                                        //console.log(bill_xml);

                                        bill_items_xml_array.forEach(function (bill_item_xml)
                                        {
                                            create_simple(bill_item_xml);
                                        });
                                        order_items_xml_array.forEach(function (order_item_xml)
                                        {
                                            update_simple(order_item_xml);
                                        });
                                    }
                                });
                                hide_loader();
                            }
                        },200);
                    }
                    else
                    {
                        hide_loader();
                        $("#modal63_link").click();
                    }
                }
                else
                {
                    hide_loader();
                    $("#modal64_link").click();
                }
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form325_update_item(form)
        {
            if(is_update_access('form325'))
            {
                var order_num=form.elements[0].value;
                var customer_name=form.elements[1].value;
                var order_date=get_raw_time(form.elements[2].value);
                var status=form.elements[3].value;
                var data_id=form.elements[4].value;
                var last_updated=get_my_time();
                var data_xml="<sale_orders>" +
                            "<id>"+data_id+"</id>" +
                            "<customer_name>"+customer_name+"</customer_name>" +
                            "<order_date>"+order_date+"</order_date>" +
                            "<order_num>"+order_num+"</order_num>" +
                            "<status>"+status+"</status>" +
                            "<last_updated>"+last_updated+"</last_updated>" +
                            "</sale_orders>";
                var activity_xml="<activity>" +
                            "<data_id>"+data_id+"</data_id>" +
                            "<tablename>sale_orders</tablename>" +
                            "<link_to>form325</link_to>" +
                            "<title>Updated</title>" +
                            "<notes>Sale Order # "+order_num+"</notes>" +
                            "<updated_by>"+get_name()+"</updated_by>" +
                            "</activity>";
                update_row(data_xml,activity_xml);

                for(var i=0;i<4;i++)
                {
                    $(form.elements[i]).attr('readonly','readonly');
                }

                var sale_items_xml="<sale_order_items>"+
                            "<id></id>"+
                            "<order_id>"+data_id+"</order_id>"+
                            "</sale_order_items>";
                get_single_column_data(function (sale_items)
                {
                    for(var i=0;i<sale_items.length;i++)
                    {
                        var row_update_xml="<sale_order_items>"+
                                    "<id>"+sale_items[i]+"</id>"+
                                    "<bill_status>"+status+"</bill_status>"+
                                    "<last_updated>"+last_updated+"</last_updated>"+
                                    "</sale_order_items>";
                        update_simple(row_update_xml);
                    }
                },sale_items_xml);
            }
            else
            {
                $("#modal2_link").click();
            }
        }


    </script>
</div>
