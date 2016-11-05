<div id='report118' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report118_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report118_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='report118_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report118_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report118_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Item" class='floatlabel' required name='name'></label>
				<label><input type='text' placeholder="Start Date" class='floatlabel' required name='start'></label>
        		<label><input type='text' placeholder="End Date" class='floatlabel' required name='end'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Date</th>
					<th>Particulars</th>
					<th>Voucher Type</th>
					<th>Voucher No.</th>
					<th>Inwards</th>
					<th>Outwards</th>
					<th>Balance Quantity</th>
				</tr>
			</thead>
			<tbody id='report118_body'>
			</tbody>
		</table>
	</div>

	<script>
        function report118_header_ini()
        {
            var form=document.getElementById('report118_header');
            var item_filter=form.elements['name'];
            var start_filter=form.elements['start'];
            var end_filter=form.elements['end'];

            $(form).off('submit');
            $(form).on('submit',function(event)
            {
                event.preventDefault();
                report118_ini();
            });

            var item_data={data_store:'product_master',return_column:'name'};
            set_my_filter_json(item_data,item_filter);

            $(start_filter).datepicker();
            $(start_filter).val(get_my_past_date((get_my_time()-30*86400000)));
            $(end_filter).datepicker();
            $(end_filter).val(vTime.date());

			var paginator=$('#report118_body').paginator({'visible':false,'container':$('#report118_body')});

            setTimeout(function(){$('#report118').formcontrol();},500);
        }

        function report118_ini()
        {
            var form=document.getElementById('report118_header');
            var item=form.elements['name'].value;
            var start_date=vTime.unix({date:form.elements['start'].value});
            var end_date=vTime.unix({date:form.elements['end'].value});

            show_loader();
            $('#report118_body').html('');
			var all_transactions = [];
			var trans_counter=3;

			var bill_items_data={data_store:'bill_items',
                              indexes:[{index:'id'},
                                      {index:'item_name',exact:item},
                                      {index:'amount'},
                                      {index:'quantity'},
									  {index:'bill_id'}]};
            read_json_rows('report118',bill_items_data,function(bill_items)
            {
				var bill_ids_array=vUtil.arrayColumn(bill_items,'bill_id');
				var bills_data={data_store:'bills',
							indexes:[{index:'customer_name'},
							{index:'bill_num'},{index:'type'},{index:'id'},
							{index:'bill_date',upperbound:end_date},
							{index:'id',array:bill_ids_array}]};
				read_json_rows('report118',bills_data,function(bills)
				{
					bill_items.forEach(function(bill_item)
					{
						for(var i in bills)
						{
							if(bill_item.bill_id==bills[i].id)
							{
								bill_item.date = bills[i].bill_date;
								bill_item.particulars = bills[i].customer_name;
								bill_item.type = bills[i].type;
								bill_item.voucher_num = bills[i].bill_num;
								bill_item.product_name = bill_item.item_name;
								bill_item.link_id=bills[i].id;

								bill_item.link_form="form269";

								if(vUtil.isBlank(bill_item.type))
								{
									bill_item.type="Performa Invoice";
									bill_item.link_form="form283";
								}
								break;
							}
						}
						all_transactions.push(bill_item);
					});
					trans_counter-=1;
				});
			});


			var sbill_items_data={data_store:'supplier_bill_items',
                              indexes:[{index:'id'},
                                      {index:'product_name',exact:item},
                                      {index:'amount'},
                                      {index:'quantity'},
									  {index:'bill_id'}]};
            read_json_rows('report118',sbill_items_data,function(bill_items)
            {
				var bill_ids_array=vUtil.arrayColumn(bill_items,'bill_id');
				var bills_data={data_store:'supplier_bills',
							indexes:[{index:'supplier'},{index:'id'},
							{index:'bill_id'},
							{index:'bill_date',upperbound:end_date},
							{index:'id',array:bill_ids_array}]};
				read_json_rows('report118',bills_data,function(bills)
				{
					bill_items.forEach(function(bill_item)
					{
						for(var i in bills)
						{
							if(bill_item.bill_id==bills[i].id)
							{
								bill_item.date = bills[i].bill_date;
								bill_item.particulars = bills[i].supplier;
								bill_item.type = 'Purchase';
								bill_item.voucher_num = bills[i].bill_id;
								bill_item.link_id=bills[i].id;
								bill_item.link_form="form53";
								break;
							}
						}
						all_transactions.push(bill_item);
					});
					trans_counter-=1;
				});
			});

			var inventory_data={data_store:'inventory_adjust',
                              indexes:[{index:'id'},
                                      {index:'product_name',exact:item},
                                      {index:'source',exact:'Manual Entry'},
                                      {index:'quantity'},
									  {index:'item_desc'},
									  {index:'last_updated'}]};
            read_json_rows('report118',inventory_data,function(bill_items)
            {
				bill_items.forEach(function(bill_item)
				{
					bill_item.date = bill_item.last_updated;
					bill_item.particulars = bill_item.item_desc;
					bill_item.type = 'Manual Entry';
					bill_item.voucher_num = "";
					bill_item.link_id="";
					bill_item.link_form="";
					all_transactions.push(bill_item);

					// console.log(bill_item);
				});
				trans_counter-=1;
			});

			var trans_complete=setInterval(function()
			{
			   if(trans_counter===0)
			   {
					clearInterval(trans_complete);
					all_transactions.sort(function(a,b)
					{
					  	if(parseFloat(a.date)>parseFloat(b.date))
					  	{	return 1;}
						else
					  	{	return -1;}
					});
	              	var balance=0;

					for(var p=0;p<all_transactions.length;p++)
					{
					  if(parseFloat(all_transactions[p].date)<start_date)
					  {
					      if(all_transactions[p].type=='Purchase' || all_transactions[p].type=='Manual Entry')
					      {
					          balance+=parseFloat(all_transactions[p].quantity);
					      }
					      else
					      {
					          balance-=parseFloat(all_transactions[p].quantity);
					      }

					      all_transactions.splice(p,1);
					      p--;
					  }
					}

					all_transactions.forEach(function(tran)
					{
						var inwards="-";
						var outwards="-";

						if(tran.type=='Purchase')
						{
							balance+=parseFloat(tran.quantity);
						  	inwards="<span class='label label-sm label-success'>Quantity: "+tran.quantity+"<br>Value: Rs. "+tran.amount+"</span>";
						}
						else if(tran.type=='Manual Entry')
						{
							balance+=parseFloat(tran.quantity);
							if(tran.quantity>0)
							{
								inwards="<span class='label label-sm label-success'>Quantity: "+tran.quantity+"</span>";
							}
							else {
								tran.quantity=-tran.quantity;
						  		outwards="<span class='label label-sm label-warning'>Quantity: "+tran.quantity+"</span>";
							}
						}
						else
						{
							balance-=parseFloat(tran.quantity);
						  	outwards="<span class='label label-sm label-warning'>Quantity: "+tran.quantity+"<br>Value: Rs. "+tran.amount+"</span>";
						}

						var rowsHTML="<tr>";
						rowsHTML+="<td data-th='Date'>";
						  rowsHTML+=vTime.date({time:tran.date});
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Particulars' style='text-transform:capitalize;'>";
						  rowsHTML+=tran.particulars;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Voucher Type' class='capitalize'>";
						  rowsHTML+=tran.type;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Voucher Number'><a onclick=\"element_display('"+tran.link_id+"','"+tran.link_form+"');\">";
						  rowsHTML+=tran.voucher_num;
						rowsHTML+="</a></td>";
						rowsHTML+="<td data-th='Inwards'>";
						  rowsHTML+=inwards;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Outwards'>";
						  rowsHTML+=outwards;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Balance Quantity'>";
						  rowsHTML+=balance;
						rowsHTML+="</td>";
						rowsHTML+="</tr>";

						$('#report118_body').append(rowsHTML);
					});
					vExport.export_buttons({file:'Item Register',report_id:'report118',action:'static'});
					hide_loader();
				}
	        },500);
	    };
	</script>
</div>
