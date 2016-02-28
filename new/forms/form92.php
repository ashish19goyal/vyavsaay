<div id='form92' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='form92_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='form92_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='form92_print'><i class='fa fa-print'></i> Print</a>
      </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form92_header'></form>
                    <th><input type='text' placeholder="Bill #" class='floatlabel' name='bill' form='form92_header'></th>
                    <th><input type='text' placeholder="Type" class='floatlabel' name='type' form='form92_header'></th>
                    <th><input type='text' placeholder="Customer" class='floatlabel' name='customer' form='form92_header'></th>
                    <th><input type='text' placeholder="Date" readonly='readonly' form='form92_header'></th>
                    <th><input type='text' placeholder="Amount" readonly='readonly' form='form92_header'></th>
                    <th><input type='submit' form='form92_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form92_body'>
			</tbody>
		</table>
	</div>

    <script>
    
    function form92_header_ini()
        {
            //console.log('92_header');
            var filter_fields=document.getElementById('form92_header');
            var bill_filter=filter_fields.elements['bill'];
            var type_filter=filter_fields.elements['type'];
            var name_filter=filter_fields.elements['customer'];

            var bill_data={data_store:'bills',return_column:'bill_num'};
            var type_data={data_store:'bill_types',return_column:'name'};
            var cust_data={data_store:'customers',return_column:'acc_name'};

            set_my_filter_json(bill_data,bill_filter);
            set_my_filter_json(type_data,type_filter);
            set_my_filter_json(cust_data,name_filter);

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form92_ini();
            });
        };

        function form92_ini()
        {
            //console.log('form92');
            show_loader();
            var fid=$("#form92_link").attr('data_id');
            if(fid==null)
                fid="";	

            $('#form92_body').html("");

            var filter_fields=document.getElementById('form92_header');
            var fnum=filter_fields.elements['bill'].value;
            var ftype=filter_fields.elements['type'].value;
            var fname=filter_fields.elements['customer'].value;

            var paginator=$('#form92_body').paginator();
			
			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='bills';

					columns.indexes=[{index:'id',value:fid},
									{index:'bill_num',value:fnum},
									{index:'customer_name',value:fname},
									{index:'billing_type',value:ftype},
									{index:'bill_date'},
                                    {index:'amount'},
                                    {index:'tax'},
                                    {index:'total'},
                                    {index:'order_id'},
                                    {index:'status'}];
			
            read_json_rows('form92',columns,function(results)
            {	
                results.forEach(function(result)
                {
                    var cancelled_bill="";
                    if(result.status=='cancelled')
                    {
                        cancelled_bill="style='opacity:0.5' title='This bill was cancelled'";
                    }	
                    var rowsHTML="<tr "+cancelled_bill+">";
                        rowsHTML+="<form id='form92_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Bill #'>";
                                rowsHTML+="<a><input type='text' readonly='readonly' form='form92_"+result.id+"' value='"+result.bill_num+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Type'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form92_"+result.id+"' value='"+result.billing_type+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Customer'>";
                                rowsHTML+="<a onclick=\"show_object('customers',"+result.customer_name+"');\"><textarea readonly='readonly' form='form92_"+result.id+"'>"+result.customer_name+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Date'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form92_"+result.id+"' value='"+get_my_past_date(result.bill_date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Amount'>";
                                rowsHTML+="<input type='text' readonly='readonly' title='Amount: Rs. "+result.amount+"\nTax: Rs. "+result.tax+"' form='form92_"+result.id+"' value='"+result.total+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form92_"+result.id+"' value='"+result.id+"'>";
                            if(result.status!='cancelled')
                            {					
                                rowsHTML+="<button type='button' class='btn red' form='form92_"+result.id+"' title='Cancel Bill' onclick='form92_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            }					
                                rowsHTML+="<input type='hidden' form='form92_"+result.id+"' value='"+result.order_id+"' name='order_id'>";
                            rowsHTML+="</td>";			
                    rowsHTML+="</tr>";

                    $('#form92_body').append(rowsHTML);
                    if(result.status!='cancelled')
                    {
                        var fields=document.getElementById('form92_'+result.id);
                        var bill_num=fields.elements[0];
                        $(bill_num).parent().on('click',function()
                        {
                            element_display(result.id,'form119',['form91','form130','form154','form225','form294']);
                        });
                    }
                });

                $('#form92').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(columns,'Sale Bills','form92',function (item)
                {
                    delete item.order_id;
                    item.bill_date=get_my_past_date(item.bill_date);
                });
				hide_loader();
            });
        }

        function form92_delete_item(button)
        {
            if(is_delete_access('form92'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var bill_filter=form.elements[0];
                    var bill_num=form.elements[0].value;
                    var customer_name=form.elements[2].value;
                    var data_id=form.elements[5].value;
                    var order_id=form.elements['order_id'].value;
                    var last_updated=get_my_time();
                    
                    var bill_json={data_store:'bills',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:'cancelled'},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Cancelled',notes:'Bill # '+bill_num,link_to:'form92'}};
 				
                    var transaction_json={data_store:'transactions',
	 				data:[{index:'id',value:data_id}]};

                    update_json(bill_json);
                    delete_json(transaction_json);

                    $(button).parent().parent().attr('style','opacity:0.5');
                    $(button).parent().parent().attr('title','This bill was cancelled');
                    $(button).hide();
                    $(bill_filter).parent().off('click');

                    var payment_xml={data_store:'payments',count:1,
                                    indexes:[{index:'id'},
                                            {index:'bill_id',exact:data_id},
                                            {index:'status',array:['pending','cancelled']},
                                            {index:'transaction_id'}]};
                    read_json_rows('',payment_xml,function(payments)
                    {
                        if(payments.length>0)
                        {
                            var pt_json={data_store:'transactions',
                                                data:[{index:'id',value:payments[0].transaction_id}]};
                            var pay_json={data_store:'payments',
                                                data:[{index:'id',value:payments[0].id}]};

                            delete_json(pay_json);
                            delete_json(pt_json);
                        }
                    });

                    var items_json={data_store:'bill_items',
                                data:[{index:'bill_id',value:data_id}]};
                    delete_json(items_json);
                    
                    var adjust_json={data_store:'inventory_adjust',
                                data:[{index:'source_id',value:data_id},{index:'source',value:'sale'}]};
                    delete_json(adjust_json);

                    var adjust_json={data_store:'inventory_adjust',
                                data:[{index:'source_id',value:data_id},{index:'source',value:'picking'}]};
                    delete_json(adjust_json);

                    //////////////////////////////////////////////
                    var sale_order_xml={data_store:'sale_orders',
                                       indexes:[{index:'id',value:order_id},
                                               {index:'bill_id'},
                                               {index:'status'},
                                               {index:'total_quantity'}]};
                    read_json_rows('',sale_order_xml,function (sorders) 
                    {
                        if(sorders.length>0)
                        {
                            var id_object_array=[];
                            if(sorders[0].bill_id!="" && sorders[0].bill_id!=0 && sorders[0].bill_id!="null")
                            {
                                id_object_array=JSON.parse(sorders[0].bill_id);
                            }

                            for(var k in id_object_array)
                            {
                                if(id_object_array[k].bill_id==data_id)
                                {
                                    id_object_array.splice(k,1);
                                    k-=1;
                                }
                            }

                            var master_total_quantity=0;
                            for(var k in id_object_array)
                            {
                                master_total_quantity+=parseFloat(id_object_array[k].quantity);
                            }

                            var status='partially billed';				
                            if(parseFloat(master_total_quantity)==parseFloat(sorders[0].total_quantity))
                            {
                                status='billed';
                            }

                            var new_bill_id=JSON.stringify(id_object_array);
                            var so_json={data_store:'sale_orders',
                            data:[{index:'id',value:order_id},
                                {index:'bill_id',value:new_bill_id},
                                {index:'status',value:status},
                                {index:'last_updated',value:last_updated}]};

                            update_json(so_json);
                        }
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