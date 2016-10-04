<div id='report9' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report9_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report9_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report9_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report9_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Item" class='floatlabel' name='item_name'></label>
				<label><input type='text' placeholder="Brand" class='floatlabel' name='make'></label>
                <label><input type='text' placeholder="Customer" class='floatlabel' name='customer'></label>
                <label><input type='text' placeholder="From Date" class='floatlabel' required name='from'></label>
                <label><input type='text' placeholder="To Date" class='floatlabel' required name='to'></label>
                <input type='submit' class='submit_hidden'>
            </fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Item</th>
					<th>Brand</th>
				    <th>Customer</th>
					<th>Quantity</th>
					<th>Amount</th>
                </tr>
			</thead>
			<tbody id='report9_body'>
			</tbody>
            <tfoot id='report9_foot'>
			</tfoot>
		</table>
	</div>

	<script>

        function report9_header_ini()
        {
            var form=document.getElementById('report9_header');
            var name_filter=form.elements['item_name'];
            var make_filter=form.elements['make'];
            var customer_filter=form.elements['customer'];
            var start_date_filter=form.elements['from'];
            var end_date_filter=form.elements['to'];

            $(form).off('submit');
            $(form).on('submit',function(event)
            {
                event.preventDefault();
                report9_ini();
            });

            var name_data={data_store:'product_master',return_column:'name'};
            var make_data={data_store:'product_master',return_column:'make'};
            var customer_data={data_store:'customers',return_column:'acc_name'};

            set_my_filter_json(name_data,name_filter);
            set_my_filter_json(make_data,make_filter);
            set_my_filter_json(customer_data,customer_filter);

            $(start_date_filter).datepicker();
            $(end_date_filter).datepicker();
            start_date_filter.value=get_my_past_date((get_my_time()-7*86400000));
            end_date_filter.value=vTime.date();
			var paginator=$('#report9_body').paginator({'visible':false,'container':$('#report9_body')});
			setTimeout(function(){$('#report9').formcontrol();},300);
        }

        function report9_ini()
        {
            var form=document.getElementById('report9_header');
            var name=form.elements['item_name'].value;
            var make=form.elements['make'].value;
            var customer=form.elements['customer'].value;
            var start_date=get_raw_time(form.elements['from'].value);
            var end_date=get_raw_time(form.elements['to'].value)+86399999;

            show_loader();
            $('#report9_body').html('');

            var rowsHTML="";

            var bills_data={data_store:'bills',
                           indexes:[{index:'id'},
                                   {index:'customer_name',value:customer},
                                   {index:'bill_date',lowerbound:start_date,upperbound:end_date}]};
            var bill_return_data={data_store:'customer_returns',
                           indexes:[{index:'id'},
                                   {index:'customer',value:customer},
                                   {index:'return_date',lowerbound:start_date,upperbound:end_date}]};
            read_json_rows('report9',bills_data,function(bills)
            {
                read_json_rows('report9',bill_return_data,function(bill_returns)
                {
                    var bills_string=[];
                    for(var i in bills)
                    {
                        bills_string.push(bills[i].id);
                    }
                    var returns_string=[];
                    for(var j in bill_returns)
                    {
                        returns_string.push(bill_returns[j].id);
                    }

                    var bill_items_data={data_store:'bill_items',
                                        indexes:[{index:'bill_id',array:bills_string},
                                                {index:'item_name',value:name},
                                                {index:'quantity'},
                                                {index:'amount'},
                                                {index:'last_updated',lowerbound:start_date,upperbound:end_date}]};
                    var return_items_data={data_store:'customer_return_items',
                                        indexes:[{index:'return_id',array:returns_string},
                                                {index:'item_name',value:name},
                                                {index:'quantity'},
                                                {index:'refund_amount'},
                                                {index:'exchange_batch'},
                                                {index:'last_updated',lowerbound:start_date,upperbound:end_date}]};

                    read_json_rows('report9',bill_items_data,function(bill_ids)
                    {
                        read_json_rows('report9',return_items_data,function(bill_return_ids)
                        {
                            var product_string=[];
                            for(var j in bill_ids)
                            {
                                product_string.push(bill_ids[j].item_name);
                            }
                            for(var k in bill_return_ids)
                            {
                                product_string.push(bill_return_ids[j].item_name);
                            }

                            var make_data={data_store:'product_master',
                                          indexes:[{index:'name',array:product_string},
                                                  {index:'make',value:make}]};

                            read_json_rows('report9',make_data,function(makes)
                            {
                                var total_quantity=0;
                                var total_amount=0;
                                for(var k in bill_ids)
                                {
                                    for(var z in makes)
                                    {
                                        if(bill_ids[k].item_name==makes[z].name)
                                        {
                                            var customer_name="";
                                            for(var m in bills)
                                            {
                                                if(bills[m].id==bill_ids[k].bill_id)
                                                {
                                                    customer_name=bills[m].customer_name;
                                                    break;
                                                }
                                            }
                                            total_quantity+=parseFloat(bill_ids[k].quantity);
                                            total_amount+=parseFloat(bill_ids[k].amount);
                                            rowsHTML+="<tr>";
                                                rowsHTML+="<td data-th='Item'><a onclick=\"show_object('product_master','"+bill_ids[k].item_name+"');\">";
                                                    rowsHTML+=bill_ids[k].item_name;
                                                rowsHTML+="</a></td>";
                                                rowsHTML+="<td data-th='Brand'>";
                                                    rowsHTML+=makes[z].make;
                                                rowsHTML+="</td>";
                                                rowsHTML+="<td data-th='Customer'><a onclick=\"show_object('customers','"+customer_name+"')\">";
                                                    rowsHTML+=customer_name;
                                                rowsHTML+="</a></td>";
                                                rowsHTML+="<td data-th='Quantity'>";
                                                    rowsHTML+=bill_ids[k].quantity;
                                                rowsHTML+="</td>";
                                                rowsHTML+="<td data-th='Amount'>";
                                                    rowsHTML+="Rs. "+bill_ids[k].amount;
                                                rowsHTML+="</td>";
                                            rowsHTML+="</tr>";
                                            break;
                                        }
                                    }
                                }
                                for(var k in bill_return_ids)
                                {
                                    if(bill_return_ids[k].exchange_batch=='null' || bill_return_ids[k].exchange_batch=='')
                                    {
                                        for(var z in makes)
                                        {
                                            if(bill_return_ids[k].item_name==makes[z].name)
                                            {
                                                var customer_name="";
                                                for(var m in bill_returns)
                                                {
                                                    if(bill_returns[m].id==bill_return_ids[k].return_id)
                                                    {
                                                        customer_name=bill_returns[m].customer;
                                                        break;
                                                    }
                                                }
                                                total_quantity-=parseFloat(bill_return_ids[k].quantity);
                                                total_amount-=parseFloat(bill_return_ids[k].refund_amount);
                                                rowsHTML+="<tr>";
                                                    rowsHTML+="<td data-th='Item'><a onclick=\"show_object('product_master','"+bill_return_ids[k].item_name+"');\">";
                                                    rowsHTML+=bill_return_ids[k].item_name;
                                                    rowsHTML+="</a></td>";
                                                    rowsHTML+="<td data-th='Brand'>";
                                                        rowsHTML+=makes[z].make;
                                                    rowsHTML+="</td>";
                                                    rowsHTML+="<td data-th='Customer'><a onclick=\"show_object('customers','"+customer_name+"')\">";
                                                        rowsHTML+=customer_name;
                                                    rowsHTML+="</a></td>";
                                                    rowsHTML+="<td data-th='Quantity'>";
                                                        rowsHTML+="-"+bill_return_ids[k].quantity;
                                                    rowsHTML+="</td>";
                                                    rowsHTML+="<td data-th='Amount'>";
                                                        rowsHTML+="Rs. -"+ bill_return_ids[k].refund_amount;
                                                    rowsHTML+="</td>";
                                                rowsHTML+="</tr>";
                                                break;
                                            }
                                        }
                                    }
                                }
                                $('#report9_body').html(rowsHTML);

                                var total_row="<tr><td colspan='3' data-th='Total'>Total</td><td data-th='Quantity'>"+total_quantity+"</td><td data-th='Amount'>Rs. "+Math.round(total_amount)+"</td></tr>";
                                $('#report9_foot').html(total_row);

                                initialize_static_tabular_report_buttons('Sales Report','report9');

                                hide_loader();
                            });
                        });
                    });
                });
            });
        };


	</script>
</div>
