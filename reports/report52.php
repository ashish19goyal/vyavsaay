<div id='report52' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report52_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report52_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report52_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report52_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Item Keyword" class='floatlabel' name='key'></label>
				<label><input type='text' placeholder="Item" class='floatlabel' name='item_name'></label>
				<label><input type='text' placeholder="Brand" class='floatlabel' name='make'></label>
                <label><input type='text' placeholder="Supplier" class='floatlabel' name='supplier'></label>
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
				    <th>Supplier</th>
					<th>Quantity</th>
					<th>Amount</th>
                </tr>
			</thead>
			<tbody id='report52_body'>
			</tbody>
            <tfoot id='report52_foot'>
			</tfoot>
		</table>
	</div>

	<script>

        function report52_header_ini()
        {
            var form=document.getElementById('report52_header');
            var name_filter=form.elements['item_name'];
            var make_filter=form.elements['make'];
            var supplier_filter=form.elements['supplier'];
            var date_filter=form.elements['from'];
            var upto_date_filter=form.elements['to'];

            $(form).off('submit');
            $(form).on('submit',function(event)
            {
                event.preventDefault();
                report52_ini();
            });

            var name_data={data_store:'product_master',return_column:'name'};
            var make_data={data_store:'product_master',return_column:'make'};
            var supplier_data={data_store:'suppliers',return_column:'acc_name'};

            set_my_filter_json(name_data,name_filter);
            set_my_filter_json(make_data,make_filter);
            set_my_filter_json(supplier_data,supplier_filter);

            $(date_filter).datepicker();
            $(date_filter).val(vTime.date({addDays:-7}));
            $(upto_date_filter).datepicker();
            $(upto_date_filter).val(vTime.date());

			var paginator=$('#report52_body').paginator({'visible':false,'container':$('#report52_body')});
			vUtil.delay(function(){
				$('#report52').formcontrol();
			});
		}

        function report52_ini()
        {
            var form=document.getElementById('report52_header');
			var index=form.elements['key'].value;
            var name=form.elements['item_name'].value;
            var make=form.elements['make'].value;
            var supplier=form.elements['supplier'].value;
            var date=get_raw_time(form.elements['from'].value);
            var upto=get_raw_time(form.elements['to'].value)+86399999;

            show_loader();
            $('#report52_body').html('');

            var rowsHTML="";

            var bills_data={data_store:'supplier_bills',
                           indexes:[{index:'id'},
                                   {index:'supplier',value:supplier},
                                   {index:'bill_date',lowerbound:date,upperbound:upto}]};

            var returns_data={data_store:'supplier_returns',
                             indexes:[{index:'id'},
                                    {index:'supplier',value:supplier},
                                    {index:'return_date',lowerbound:date,upperbound:upto}]};

            read_json_rows('report52',bills_data,function(bills)
            {
                read_json_rows('report52',returns_data,function(returns)
                {
                    var bills_ids=[];
                    for(var i in bills)
                    {
                        bills_ids.push(bills[i].id);
                    }
                    var returns_ids=[];
                    for(var j in returns)
                    {
                        returns_ids.push(returns[j].id);
                    }

                    var bill_items_data={data_store:'supplier_bill_items',
                                        indexes:[{index:'bill_id',array:bills_ids},
                                                {index:'product_name',value:name},
                                                {index:'quantity'},{index:'amount'},
                                                {index:'last_updated',lowerbound:date,upperbound:upto}]};
                    var return_items_data={data_store:'supplier_return_items',
                                        indexes:[{index:'return_id',array:returns_ids},
                                                {index:'item_name',value:name},
                                                {index:'quantity'},{index:'refund_amount'},
                                                {index:'last_updated',lowerbound:date,upperbound:upto}]};
                    read_json_rows('report52',bill_items_data,function(bill_ids)
                    {
                        read_json_rows('report52',return_items_data,function(return_ids)
                        {
                            var product_string=[];
                            for(var j in bill_ids)
                            {
                                product_string.push(bill_ids[j].product_name);
                            }
                            for(var k in return_ids)
                            {
                                product_string.push(return_ids[k].item_name);
                            }

                            var make_data={data_store:'product_master',
                                          indexes:[{index:'name',array:product_string},
                                                  {index:'indexes',value:index},
												  {index:'make',value:make}]};

                            read_json_rows('report52',make_data,function(makes)
                            {
                                var total_amount=0;
								var total_quantity=0;
                                for(var k in bill_ids)
                                {
                                    for(var z in makes)
                                    {
                                        if(bill_ids[k].product_name==makes[z].name)
                                        {
                                            var supplier_name="";
											// console.log(bills);
                                            for(var m in bills)
                                            {
                                                if(bills[m].id==bill_ids[k].bill_id)
                                                {
                                                    supplier_name=bills[m].supplier;
                                                    break;
                                                }
                                            }

                                            total_amount+=parseFloat(bill_ids[k].amount);
											total_quantity+=parseFloat(bill_ids[k].quantity);

                                            rowsHTML+="<tr>";
                                                rowsHTML+="<td data-th='Item'><a onclick=\"show_object('product_master','"+bill_ids[k].product_name+"');\">";
                                                    rowsHTML+=bill_ids[k].product_name;
                                                rowsHTML+="</a></td>";
                                                rowsHTML+="<td data-th='Brand'>";
                                                    rowsHTML+=makes[z].make;
                                                rowsHTML+="</td>";
                                                rowsHTML+="<td data-th='Supplier'><a onclick=\"show_object('suppliers','"+supplier_name+"');\">";
                                                    rowsHTML+=supplier_name;
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
                                for(var k in return_ids)
                                {
                                    for(var z in makes)
                                    {
                                        if(return_ids[k].item_name==makes[z].name)
                                        {
                                            var supplier_name="";
                                            for(var m in returns)
                                            {
                                                if(returns[m].id==return_ids[k].return_id)
                                                {
                                                    supplier_name=bills[m].supplier;
                                                    break;
                                                }
                                            }

                                            total_amount-=parseFloat(return_ids[k].refund_amount);
											total_quantity-=parseFloat(return_ids[k].quantity);

                                            rowsHTML+="<tr>";
                                                rowsHTML+="<td data-th='Item'><a onclick=\"show_object('product_master','"+return_ids[k].product_name+"');\">";
                                                    rowsHTML+=return_ids[k].item_name;
                                                rowsHTML+="</a></td>";
                                                rowsHTML+="<td data-th='Brand'>";
                                                    rowsHTML+=makes[z].make;
                                                rowsHTML+="</td>";
                                                rowsHTML+="<td data-th='Supplier'><a onclick=\"show_object('suppliers','"+supplier_name+"');\">";
                                                    rowsHTML+=supplier_name;
                                                rowsHTML+="</a></td>";
                                                rowsHTML+="<td data-th='Quantity'>";
                                                    rowsHTML+="-"+return_ids[k].quantity;
                                                rowsHTML+="</td>";
                                                rowsHTML+="<td data-th='Amount'>";
                                                    rowsHTML+="Rs. -"+return_ids[k].refund_amount;
                                                rowsHTML+="</td>";
                                            rowsHTML+="</tr>";
                                            break;
                                        }
                                    }
                                }
                                $('#report52_body').html(rowsHTML);

                                var total_row="<tr><td colspan='3' data-th='Total'>Total</td><td data-th='Quantity'>"+total_quantity+"</td><td data-th='Amount'>Rs. "+total_amount+"</td></tr>";
                                $('#report52_foot').html(total_row);

								vExport.export_buttons({file:'Purchase Report',report_id:'report52',action:'static'});
                                hide_loader();
                            });
                        });
                    });
                });
            });
        };

	</script>
</div>
