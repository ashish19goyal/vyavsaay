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
                                if(result.bill_id!="" && result.bill_id!=null && result.bill_id!="[]")
                                {
                                    rowsHTML+="<button type='button' class='btn default yellow-stripe' form='form181_"+result.id+"' name='view_bill'>View Bill</button>";
                                }
                                else
                                {
                                    rowsHTML+="<button type='button' class='btn default yellow-stripe' form='form181_"+result.id+"' name='create_bill'>Create Bill</button>";
                                }
                                if(result.challan_info!="" && result.challan_info!=null && result.challan_info!="[]")
                                {
                                    rowsHTML+="<button type='button' class='btn default purple-stripe' form='form181_"+result.id+"' name='view_challan'>View Challan</button>";
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
                        modal159_action(result.id,result.order_num,result.customer_name,result.billing_type,result.bill_id);
                    });

                    $(view_bill_button).on('click',function(event)
                    {
                        var bill_id_array=JSON.parse(result.bill_id);
                        element_display(bill_id_array[0].bill_id,'form225');
                    });
                    
                    $(create_challan_button).on('click',function(event)
                    {
                        
                    });

                    $(view_challan_button).on('click',function(event)
                    {
                        var bill_id_array=JSON.parse(result.challan_info);
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
                        order_item=JSON.parse($(this).attr('data-object'));
                        order_items.push(order_item);
                    }
                    actual_order_items.push(order_item);
                });

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

                                                var bill_item_amount=my_round((item_amount*batch_result.quantity/order_item.quantity),2);
                                                var bill_item_total=my_round((item_total*batch_result.quantity/order_item.quantity),2);
                                                var bill_item_tax=my_round((item_tax*batch_result.quantity/order_item.quantity),2);

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
                                                var id_object_array=[];
                                                if(sorders[0].bill_id!="" && sorders[0].bill_id!=0 && sorders[0].bill_id!="null")
                                                {
                                                    id_object_array=JSON.parse(sorders[0].bill_id);
                                                }

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
                                                    form181_ini();
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


        
        function form181_bill(order_id,bill_type,order_num,customer)
        {
            if(is_create_access('form181'))
            {
                show_loader();
                var bill_amount=0;
                var bill_total=0;
                var bill_tax=0;
                
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
                        order_item=JSON.parse($(this).attr('data-object'));
                        order_items.push(order_item);
                    }
                    actual_order_items.push(order_item);
                });

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

                                                var bill_item_amount=my_round((item_amount*batch_result.quantity/order_item.quantity),2);
                                                var bill_item_total=my_round((item_total*batch_result.quantity/order_item.quantity),2);
                                                var bill_item_tax=my_round((item_tax*batch_result.quantity/order_item.quantity),2);

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
                                                var id_object_array=[];
                                                if(sorders[0].bill_id!="" && sorders[0].bill_id!=0 && sorders[0].bill_id!="null")
                                                {
                                                    id_object_array=JSON.parse(sorders[0].bill_id);
                                                }

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
                                                    form181_ini();
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


    </script>
</div>